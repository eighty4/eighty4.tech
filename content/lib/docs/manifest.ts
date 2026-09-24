import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { DOCS_MANIFEST_FILENAME } from '../paths.ts'

export async function readManifest(docsDir: string): Promise<any> {
    const manifestPath = join(docsDir, DOCS_MANIFEST_FILENAME)
    let json: string
    try {
        json = await readFile(manifestPath, 'utf8')
    } catch (e) {
        throw Error(`failed reading docs manifest ${docsDir}`, { cause: e })
    }
    try {
        return JSON.parse(json)
    } catch (e) {
        throw Error(`failed parsing json from docs manifest ${docsDir}`, {
            cause: e,
        })
    }
}
