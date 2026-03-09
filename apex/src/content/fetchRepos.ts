import type { ProjectCategory } from '../content.api'

let fetching: Partial<
    Record<ProjectCategory, Promise<Record<string, FetchedGitHubRepo>> | null>
> = {}

export async function getFetchedGitHubRepos(
    category: ProjectCategory,
    repoUrls: Array<string>,
): Promise<Record<string, FetchedGitHubRepo>> {
    if (!fetching[category]) {
        return (fetching[category] = fetchGitHubRepos(repoUrls))
    } else if (
        new Set(repoUrls).difference(
            new Set(Object.keys(await fetching[category]!)),
        ).size > 0
    ) {
        fetching[category] = null
        return getFetchedGitHubRepos(category, repoUrls)
    } else {
        return fetching[category]!
    }
}

export type FetchedGitHubRepo = {
    description: string
}

async function fetchGitHubRepos(
    repoUrls: Array<string>,
): Promise<Record<string, FetchedGitHubRepo>> {
    const response = await queryGraphApi(buildGraphApiQuery(repoUrls))
    const result: Record<string, FetchedGitHubRepo> = {}
    for (const [subqueryTag, repoNode] of Object.entries(response.data)) {
        const i = parseInt(subqueryTag.substring(4), 10)
        if (isNaN(i)) throw Error('repo i not a number')
        const repoUrl = repoUrls[i]
        const repo: FetchedGitHubRepo = {
            description: (repoNode as any).description,
        }
        result[repoUrl] = repo
    }
    return result
}

function buildGraphApiQuery(repoUrls: Array<string>): string {
    const pattern = /^https:\/\/github.com\/(?<owner>.+)\/(?<name>.+)$/
    const q = repoUrls
        .map((repoUrl, i) => {
            const match = repoUrl.match(pattern)
            if (!match?.groups?.owner || !match?.groups?.name) {
                throw Error('bad github repo url')
            }
            const { owner, name } = match.groups
            return `\
repo${i}: repository(owner: "${owner}", name: "${name}") {
    description
}`
        })
        .join('\n')
    return `query GitHubRepos { ${q} }`
}

async function queryGraphApi(query: string): Promise<any> {
    const body = JSON.stringify({ query })
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + process.env.GH_TOKEN,
            'Content-Type': 'application/json',
        },
        body,
    })
    if (response.status !== 200) {
        throw Error(`unexpected gh graphql error status: ${response.status}`)
    }
    const result = await response.json()
    if (!result.data) {
        throw Error(
            `unexpected gh graphql error response: ${JSON.stringify(result, null, 4)}`,
        )
    }
    return result
}
