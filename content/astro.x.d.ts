declare module 'astro:content' {
    export const reference: (...args: any[]) => any
}

interface ImportMeta {
    readonly env: {
        DOCS_PROJECTS?: string
        DOCS_TEST?: 'true' | string
    }
}
