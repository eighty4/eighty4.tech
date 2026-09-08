import { join } from 'node:path'
import { defineCollection, reference } from 'astro:content'
import { file } from 'astro/loaders'
import z from 'astro/zod'

export const projectCategoryValues = [
    'app',
    'cicd',
    'cloud',
    'data',
    'dx',
    'webdev',
] as const

export type ProjectCategory = (typeof projectCategoryValues)[number]

const REPO_NAME = z.string().regex(/[a-z][a-z0-9_.\-]/)

export const projects = defineCollection({
    loader: file(join(import.meta.dirname, 'projects.json')),
    schema: z.object({
        id: REPO_NAME,
        name: z.string().optional(),
        categories: z.array(z.enum(projectCategoryValues)),
        repo: reference('repos'),
    }),
})

export const repos = defineCollection({
    loader: file(join(import.meta.dirname, 'repos.json')),
    schema: z.object({
        id: REPO_NAME,
        description: z.string().nullable(),
        url: z.url(),
        homepage: z.url().nullable(),
    }),
})

// const SEMVER_SPEC = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
const SEMVER_MMP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/

export const sites = defineCollection({
    loader: file(join(import.meta.dirname, 'sites.json')),
    schema: z.object({
        id: REPO_NAME,
        sites: z.array(
            z.object({
                version: z.string().regex(SEMVER_MMP),
            }),
        ),
    }),
})
