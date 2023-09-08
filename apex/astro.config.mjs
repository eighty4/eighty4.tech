import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
    build: {
        assets: 'assets',
    },
    compressHTML: true,
    integrations: [mdx(), react(), sitemap(), svelte()],
    site: 'https://eighty4.tech',
})
