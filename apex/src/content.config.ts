import { projects, repos } from '@eighty4/www-astro-content'
import { defineCollection, getCollection } from 'astro:content'
import { file, glob } from 'astro/loaders'
import z from 'astro/zod'

const writing = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/writing' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        draft: z.boolean().optional(),
    }),
})

export const collections = {
    projects,
    repos,
    writing,
}
