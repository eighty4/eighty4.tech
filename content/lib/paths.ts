import { access, readdir } from 'node:fs/promises'
import { isAbsolute, join } from 'node:path'

export const DOCS_MANIFEST_FILENAME = 'contents.json'

export const SITES_JSON_PATH = join(
    import.meta.dirname,
    '../../docs/src/pages/assets/sites.json',
)

let _DOCS_PROJECTS: string | null = null

export function docsProjectsRootDir(): string {
    if (_DOCS_PROJECTS !== null) {
        return _DOCS_PROJECTS
    }
    if (
        'env' in import.meta &&
        'DOCS_PROJECTS' in import.meta.env &&
        typeof import.meta.env.DOCS_PROJECTS === 'string' &&
        import.meta.env.DOCS_PROJECTS.length > 0 &&
        isAbsolute(import.meta.env.DOCS_PROJECTS)
    ) {
        _DOCS_PROJECTS = import.meta.env.DOCS_PROJECTS
        console.log(
            '@eighty4/www-astro-content DOCS_PROJECTS=' + _DOCS_PROJECTS,
        )
        return _DOCS_PROJECTS
    }
    throw TypeError(
        "must set DOCS_PROJECTS in your webapp's .env to an absolute path" +
            new Error().stack,
    )
}

export async function fileExists(p: string): Promise<boolean> {
    try {
        await access(p)
        return true
    } catch {
        return false
    }
}

export async function readDocsDirs(): Promise<Array<string>> {
    const rootDir = docsProjectsRootDir()
    const rootDirEntries = await readdir(rootDir, { withFileTypes: true })
    const docsDirs = await Promise.all(
        rootDirEntries.map(async dirEntry => {
            if (dirEntry.isDirectory()) {
                const docsDir = join(rootDir, dirEntry.name, 'docs')
                if (await fileExists(join(docsDir, DOCS_MANIFEST_FILENAME))) {
                    return join(rootDir, dirEntry.name, 'docs')
                }
            }
            return null
        }),
    )
    return docsDirs.filter(dir => !!dir)
}
