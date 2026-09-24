import { join } from 'node:path'
import { type CollectionConfig, defineCollection } from 'astro/content/config'
import type { Loader, LoaderContext } from 'astro/loaders'
import z from 'astro/zod'
import { readManifest } from './manifest.ts'
import { DOCS_MANIFEST_FILENAME, fileExists, readDocsDirs } from '../paths.ts'
import { REPO_NAME } from '../patterns.ts'

const pageSchema = z.object({
    title: z.string(),
    slug: z.string(),
    src: z.string().endsWith('.md'),
})

const sectionSchema = z.object({
    title: z.string(),
    slug: z.string(),
    pages: z.array(pageSchema),
})

const docsManifestSchema = z.object({
    id: REPO_NAME,
    sections: z.array(sectionSchema),
})

export function defineDocsNavCollection(): CollectionConfig<
    typeof docsManifestSchema,
    any
> {
    return defineCollection({
        loader: createDocsNavLoader(),
        schema: docsManifestSchema,
    })
}

function createDocsNavLoader(): Loader {
    return {
        name: 'eighty4/docs/nav',
        async load(ctx: LoaderContext): Promise<void> {
            await Promise.all(
                (await readDocsDirs()).map(async docsDir => {
                    const data = await readManifest(docsDir)
                    const id = data.id
                    if (!id)
                        throw TypeError(
                            `${DOCS_MANIFEST_FILENAME} in docs ${docsDir} is missing \`id\``,
                        )
                    await ctx.parseData<z.infer<typeof docsManifestSchema>>({
                        id,
                        data,
                    })
                    await validateAndNormalizePagePaths(docsDir, data.id, data)
                    ctx.store.set({
                        id,
                        data,
                    })
                }),
            )
        },
        schema: docsManifestSchema,
    }
}

async function validateAndNormalizePagePaths(
    docsDir: string,
    project: string,
    docs: z.infer<typeof docsManifestSchema>,
): Promise<void> {
    if (new Set(docs.sections.map(s => s.slug)).size < docs.sections.length) {
        throw new Error(
            `docs sections of project ${project} must have unique slugs`,
        )
    }
    for (const section of docs.sections) {
        if (
            new Set(section.pages.map(p => p.slug)).size < section.pages.length
        ) {
            throw new Error(
                `docs pages of project ${project} section ${section.slug} must have unique slugs`,
            )
        }
        await Promise.all(
            section.pages.map(async p => {
                const absSrc = join(docsDir, p.src)
                if (!(await fileExists(absSrc))) {
                    throw Error(
                        `docs page ${p.src} of project ${project} section ${section.slug} does not exist`,
                    )
                }
                p.src = absSrc
            }),
        )
    }
}
