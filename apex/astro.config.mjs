import { defineConfig, passthroughImageService } from 'astro/config'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
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
    vite: {
        build: {
            cssMinify: 'esbuild',
        },
    },
})
