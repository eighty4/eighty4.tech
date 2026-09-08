import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const URL = 'https://api.github.com/users/eighty4/repos'
const response = await fetch(`${URL}?per_page=100`)
if (response.status !== 200) {
    console.error(
        'gh fetch /users/eighty4/repos was',
        response.status,
        'instead of 200',
    )
    process.exit(1)
}

const ghReposJson = await response.json()

const projectsJsonPath = join(import.meta.dirname, '../lib/projects.json')
const projectsJson = JSON.parse(await readFile(projectsJsonPath, 'utf8'))

type Project = { id: string }
const projectRepoNames = projectsJson.map((p: Project) => p.id)

type Repo = {
    id: string
    description: string | null
    url: string
    homepage: string | null
}
const reposJson: Array<Repo> = []

for (const { name, description, homepage, html_url: url } of ghReposJson) {
    if (projectRepoNames.includes(name)) {
        reposJson.push({
            id: name,
            description,
            homepage:
                typeof homepage === 'string' && homepage.length > 0
                    ? homepage
                    : null,
            url,
        })
    }
}

reposJson.sort((r1: Repo, r2: Repo) => {
    if (r1.id < r2.id) {
        return -1
    } else if (r1.id === r2.id) {
        return 0
    } else {
        return 1
    }
})

const reposJsonPath = join(import.meta.dirname, '../lib/repos.json')
await writeFile(reposJsonPath, JSON.stringify(reposJson, null, 4))
