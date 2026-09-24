import { getCollection, type CollectionEntry } from 'astro:content'

export type { ProjectCategory } from '@eighty4/www-astro-content'

export type Projects = {
    apps: Array<CollectionEntry<'projects'>>
    hasDocsSite: Set<string>
    other: Array<CollectionEntry<'projects'>>
}

export async function getProjects(): Promise<Projects> {
    const projects = (await getCollection('projects')).sort(
        compareProjectsByRepoName,
    )
    return {
        apps: projects.filter(isAppPredicate(true)),
        hasDocsSite: await getActiveDocsSiteProjectNames(),
        other: projects.filter(isAppPredicate(false)),
    }
}

async function getActiveDocsSiteProjectNames(): Promise<Set<string>> {
    return new Set(
        (await getCollection('sites'))
            .filter(site => !site.data.inactive)
            .map(site => site.id),
    )
}

function isAppPredicate(
    isApp: boolean,
): (p: CollectionEntry<'projects'>) => boolean {
    return p => p.data.categories.includes('app') === isApp
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
