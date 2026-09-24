import { defineConfig, envField } from 'astro/config'
import mdx from '@astrojs/mdx'

type Mode = 'root' | 'subpath'

const mode = (function readAstroModeFromCliArgs(): Mode {
    const modeIndex = process.argv.indexOf('--mode')
    if (modeIndex !== -1) {
        const nextArg = process.argv.at(modeIndex + 1)
        if (nextArg) {
            switch (nextArg) {
                case 'root':
                case 'subpath':
                    return nextArg
                default:
                    throw TypeError('--mode must be `root` or `subpath`')
            }
        }
    }
    return 'root'
})()

const srcDir = `./sites/${mode}`

console.log('@eighty4/www-docs srcDir=' + srcDir)

// https://astro.build/config
export default defineConfig({
    build: {
        format: 'file',
    },
    env: {
        schema: {
            DOCS_BUILD: envField.string({
                context: 'server',
                access: 'public',
                optional: mode === 'root',
            }),
            DOCS_PROJECTS: envField.string({
                context: 'server',
                access: 'public',
                optional: mode === 'root',
            }),
            DOCS_TEST: envField.string({
                context: 'server',
                access: 'public',
                default: 'false',
            }),
        },
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
        port: 8405,
    },
    site: 'https://man.eighty4.tech',
    srcDir,
})
