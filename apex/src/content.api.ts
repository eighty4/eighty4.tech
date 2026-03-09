import { getCollection, type CollectionEntry } from 'astro:content'
import { getFetchedGitHubRepos } from './content/fetchRepos'

if (!process.env.GH_TOKEN) {
    console.log('\nenv var GH_TOKEN must be set\n')
    process.exit(1)
}

async function getWriting(): Promise<Array<CollectionEntry<'writing'>>> {
    const content = await getCollection('writing')
    if (import.meta.env.MODE === 'production') {
        return content.filter(piece => !piece.data.draft)
    } else {
        return content
    }
}

export async function getRecentWriting(
    count: number = 10,
): Promise<Array<CollectionEntry<'writing'>>> {
    return (await getWriting()).slice(0, count)
}

export const projectCategoryValues = [
    'cicd',
    'cloud',
    'data',
    'dx',
    'webdev',
] as const

export type ProjectCategory = (typeof projectCategoryValues)[number]

export type Project = CollectionEntry<'projects'>

export async function getProjects(
    category: ProjectCategory,
): Promise<Array<Project>> {
    const collected = (await getCollection('projects'))
        .filter(p => p.data.category === category)
        .sort((p1, p2) => {
            if (p1.id < p2.id) {
                return -1
            } else if (p1.id > p2.id) {
                return 1
            } else {
                return 0
            }
        })
    const fetchedGitHubRepos = await getFetchedGitHubRepos(
        category,
        collected.map(project => project.data.repository),
    )
    for (const project of collected) {
        project.data.description =
            fetchedGitHubRepos[project.data.repository].description
    }
    return collected
}
