import { join } from 'node:path'
import {
    defineConfig,
    devices,
    type PlaywrightTestConfig,
} from '@playwright/test'

const PORT_ROOT = '4421'
const PORT_SUBPATHS = Object.freeze({
    'modern-lang': '4422',
})

function makeBaseURL(port: string): string {
    return `http://localhost:${port}`
}

function makeProjects(): PlaywrightTestConfig['projects'] {
    const deviceIds: Array<keyof typeof devices> = [
        'Desktop Chrome',
        'Desktop Firefox',
        'Desktop Safari',
    ]
    const webapps = { root: PORT_ROOT, ...PORT_SUBPATHS }
    return deviceIds.flatMap(deviceId => {
        const device = devices[deviceId]
        const browser = device.defaultBrowserType
        return Object.entries(webapps).map(([label, port]) => {
            return {
                grep: label === 'root' ? /@root/ : /@subpath/,
                name: `${label}-${browser}`,
                use: {
                    ...device,
                    baseURL: makeBaseURL(port),
                },
            }
        })
    })
}

function makeWebServerCommand(mode: 'root' | 'subpath', port: string): string {
    return `pnpm dev --mode ${mode} --ignore-lock --port ${port}`
}

function makeWebServers(): PlaywrightTestConfig['webServer'] {
    const DOCS_PROJECTS = join(import.meta.dirname, 'tests')
    return [
        {
            command: makeWebServerCommand('root', PORT_ROOT),
            url: makeBaseURL(PORT_ROOT),
            reuseExistingServer: !process.env.CI,
            env: {
                DOCS_PROJECTS,
                DOCS_TEST: 'true',
            },
        },
        ...Object.entries(PORT_SUBPATHS).map(([project, port]) => {
            return {
                command: makeWebServerCommand('subpath', port),
                url: makeBaseURL(port),
                reuseExistingServer: !process.env.CI,
                env: {
                    DOCS_BUILD: project,
                    DOCS_PROJECTS,
                    DOCS_TEST: 'true',
                },
            }
        }),
    ]
}

// https://playwright.dev/docs/test-configuration
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        [process.env.CI ? 'github' : 'list'],
        ['html', { open: 'never' }],
    ],
    use: {
        baseURL: PORT_ROOT,
        trace: 'on-first-retry',
    },
    projects: makeProjects(),
    webServer: makeWebServers(),
})
