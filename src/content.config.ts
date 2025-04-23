import { defineCollection, z, getCollection } from 'astro:content'
import { glob, file } from 'astro/loaders'

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
        id: z.string(),
        name: z.string(),
        repository: z.string().url(),
        website: z.string().url().optional(),
        type: z.enum(['app', 'devtool']),
    }),
})

export const collections = { content, projects }
