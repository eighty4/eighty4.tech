import { defineConfig, envField, passthroughImageService } from 'astro/config'
import mdx from '@astrojs/mdx'

const APEX_SITE = 'https://eighty4.tech'
const DOCS_SITE = 'https://man.eighty4.tech'

// https://astro.build/config
export default defineConfig({
    env: {
        schema: {
            DOCS_SITE: envField.string({
                context: 'server',
                access: 'public',
                default: DOCS_SITE,
            }),
        },
    },
    image: {
        service: passthroughImageService(),
    },
    integrations: [mdx()],
    markdown: {
        shikiConfig: {
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
        },
    },
    server: {
        port: 8404,
    },
    site: APEX_SITE,
    vite: {
        build: {
            cssMinify: 'esbuild',
        },
    },
})
