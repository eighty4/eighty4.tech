import { getCollection, type CollectionEntry } from 'astro:content'

export type { ProjectCategory } from '@eighty4/www-astro-content'

export type Projects = {
    apps: Array<CollectionEntry<'projects'>>
    other: Array<CollectionEntry<'projects'>>
}

export type RecentWriting = {
    content: Array<CollectionEntry<'writing'>>
    hasMore: boolean
}

export async function getWriting(): Promise<Array<CollectionEntry<'writing'>>> {
    const content = await getCollection('writing')
    if (import.meta.env.MODE === 'production') {
        return content.filter(piece => !piece.data.draft)
    } else {
        return content
    }
}

export async function getRecentWriting(
    count: number = 10,
): Promise<RecentWriting> {
    const writing = await getWriting()
    const content = writing.slice(0, count)
    return {
        content,
        hasMore: writing.length > content.length,
    }
}

export async function getProjects(): Promise<Projects> {
    const projects = await getCollection('projects')
    const apps = projects
        .filter(p => p.data.categories.includes('app'))
        .sort(compareProjectsByRepoName)
    const other = projects
        .filter(p => !p.data.categories.includes('app'))
        .sort(compareProjectsByRepoName)
    return { apps, other }
}

function compareProjectsByRepoName(
    p1: CollectionEntry<'projects'>,
    p2: CollectionEntry<'projects'>,
): 1 | 0 | -1 {
    if (p1.id < p2.id) {
        return -1
    } else if (p1.id > p2.id) {
        return 1
    } else {
        return 0
    }
}
