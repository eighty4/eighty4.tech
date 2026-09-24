import { defineCollection } from 'astro/content/config'
import { file, type Loader, type LoaderContext } from 'astro/loaders'
import z from 'astro/zod'
import { readManifest } from './manifest.ts'
import {
    DOCS_MANIFEST_FILENAME,
    readDocsDirs,
    SITES_JSON_PATH,
} from '../paths.ts'
import { REPO_NAME, SEMVER_MMP } from '../patterns.ts'

const docsSitesSchema = z.object({
    id: REPO_NAME,
    inactive: z.boolean().default(false),
    versions: z.array(
        z.object({
            version: SEMVER_MMP,
        }),
    ),
})

export function defineDocsSitesCollection() {
    return defineCollection({
        loader: useTestLoader() ? testSitesLoader() : file(SITES_JSON_PATH),
        schema: docsSitesSchema,
    })
}

function useTestLoader(): boolean {
    return import.meta.env.DOCS_TEST === 'true'
}

function testSitesLoader(): Loader {
    return {
        name: 'eighty4/docs/sites/test',
        async load(ctx: LoaderContext): Promise<void> {
            await Promise.all(
                (await readDocsDirs()).map(async docsDir => {
                    const { id } = await readManifest(docsDir)
                    if (!id)
                        throw TypeError(
                            `${DOCS_MANIFEST_FILENAME} in docs ${docsDir} is missing \`id\``,
                        )
                    const data: z.infer<typeof docsSitesSchema> = {
                        id,
                        inactive: false,
                        versions: [],
                    }
                    await ctx.parseData<z.infer<typeof docsSitesSchema>>({
                        id,
                        data,
                    })
                    ctx.store.set({
                        id,
                        data,
                    })
                }),
            )
        },
        schema: docsSitesSchema,
    }
}
