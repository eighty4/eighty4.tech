import { defineCollection, getCollection, z } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { projectCategoryValues } from './content.api.ts'

const content = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        draft: z.boolean().optional(),
    }),
})

const projects = defineCollection({
    loader: file('./src/content/projects.json'),
    schema: z.object({
        id: z.string().regex(/[a-z][a-z0-9_.\-]/),
        name: z.string(),
        repository: z.string().url().optional(),
        website: z.string().url().optional(),
        category: z.enum(projectCategoryValues),
    }),
})

export const collections = { content, projects }
