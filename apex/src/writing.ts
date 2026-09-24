import {
    defineCollection,
    getCollection,
    type CollectionEntry,
} from 'astro:content'
import { glob } from 'astro/loaders'
import z from 'astro/zod'

export function defineWritingCollection() {
    return defineCollection({
        loader: glob({ pattern: '**/*.mdx', base: './src/writing' }),
        schema: z.object({
            title: z.string(),
            date: z.date(),
            draft: z.boolean().optional(),
        }),
    })
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
