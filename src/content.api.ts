import { getCollection } from 'astro:content'

export type WritingContent = {
    title: string
    date: string
    draft?: boolean
}

async function getWriting(): Promise<Array<WritingContent>> {
    const content = await getCollection('content')
    if (import.meta.env.MODE === 'production') {
        return content.filter(piece => !piece.data.draft)
    } else {
        return content
    }
}

export async function getRecentWriting(
    count: number = 10,
): Promise<Array<WritingContent>> {
    return (await getWriting()).slice(0, count)
}

export const projectCategoryValues = ['app', 'devops', 'dx', 'webdev'] as const

export type ProjectCategory = (typeof ProjectCategoryValues)[number]

export type Project = {
    id: string
    name: string
    category: ProjectCategory
    repository: string
    website?: string
}

export async function getProjects(
    category: ProjectCategory,
): Promiise<Array<Project>> {
    return (await getCollection('projects'))
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
}
