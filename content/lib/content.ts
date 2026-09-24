import { join } from 'node:path'
import { reference } from 'astro:content'
import { defineCollection } from 'astro/content/config'
import { file } from 'astro/loaders'
import z from 'astro/zod'
import { REPO_NAME } from './patterns.ts'

export { defineDocsNavCollection } from './docs/nav.ts'
export { defineDocsPagesCollection } from './docs/pages.ts'
export { defineDocsSitesCollection } from './docs/sites.ts'

export const projectCategoryValues = [
    'app',
    'cicd',
    'cloud',
    'data',
    'dx',
    'webdev',
] as const

export type ProjectCategory = (typeof projectCategoryValues)[number]

export function defineProjectsCollection() {
    return defineCollection({
        loader: file(join(import.meta.dirname, 'projects.json')),
        schema: z.object({
            id: REPO_NAME,
            name: z.string().optional(),
            categories: z.array(z.enum(projectCategoryValues)),
            repo: reference('repos'),
        }),
    })
}

export function defineReposCollection() {
    return defineCollection({
        loader: file(join(import.meta.dirname, 'repos.json')),
        schema: z.object({
            id: REPO_NAME,
            description: z.string().nullable(),
            url: z.url(),
            homepage: z.url().nullable(),
        }),
    })
}
