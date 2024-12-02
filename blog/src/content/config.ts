import {defineCollection, z} from 'astro:content'
import {file, glob} from 'astro/loaders'

const baseContentSchema = {
    title: z.string(),
    description: z.string(),
}

const articles = defineCollection({
    loader: glob({pattern: '**/*.mdx', base: './src/content/articles'}),
    schema: z.object({
        ...baseContentSchema,
    }),
})

const guides = defineCollection({
    loader: glob({pattern: '**/*.mdx', base: './src/content/guides'}),
    schema: z.object({
        ...baseContentSchema,
    })
})

const tags = defineCollection({
    loader: file('src/content/meta/tags.json'),
    schema: z.array(z.string()),
})

export const collections = {articles, guides, tags}
