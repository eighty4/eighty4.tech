import { defineCollection, getCollection, z } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { projectCategoryValues } from './content.api.ts'

const apps = defineCollection({
    loader: file('./src/content/apps.json'),
    schema: z.object({
        id: z.string().regex(/[a-z][a-z0-9_.\-]/),
        name: z.string(),
        description: z.string().optional(),
        repository: z.string().url().optional(),
        website: z.string().url().optional(),
    }),
})

const projects = defineCollection({
    loader: file('./src/content/projects.json'),
    schema: z.object({
        id: z.string().regex(/[a-z][a-z0-9_.\-]/),
        name: z.string(),
        secondaryName: z.string().optional(),
        description: z.string().optional(),
        repository: z.string().url(),
        website: z.string().url().optional(),
        category: z.enum(projectCategoryValues),
    }),
})

const writing = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        draft: z.boolean().optional(),
    }),
})

export const collections = { apps, projects, writing }
