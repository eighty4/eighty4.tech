import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineCollection } from 'astro/content/config'
import { glob } from 'astro/loaders'
import { docsProjectsRootDir } from '../paths.ts'

export function defineDocsPagesCollection() {
    const base = docsProjectsRootDir()
    return defineCollection({
        loader: glob({
            base,
            pattern: '*/docs/**/*.md',
            generateId: ({ base, entry }) => join(fileURLToPath(base), entry),
        }),
    })
}
