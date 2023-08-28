import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
    build: {
        assets: 'assets',
    },
    compressHTML: true,
    integrations: [mdx(), sitemap()],
    site: 'https://eighty4.tech',
})
