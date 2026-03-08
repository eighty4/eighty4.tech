import { type Config } from 'prettier'

const config: Config = {
    plugins: ['prettier-plugin-astro'],
    arrowParens: 'avoid',
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    overrides: [
        {
            files: '*.{json,yaml,yml}',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
}

export default config
