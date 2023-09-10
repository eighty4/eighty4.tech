import {Tech} from './Tech'
import {LinkType, type Project} from './Project'

export const projects: Array<Project> = [
    {
        description: 'a Rust binary & library for migrating CQL',
        links: {
            [LinkType.repository]: 'https://github.com/eighty4/cquill',
        },
        name: 'cquill',
        technologies: [Tech.CQL, Tech.ScyllaDB, Tech.Rust, Tech.Docker, Tech.DockerCompose, Tech.GitHubActions],
    },
    {
        description: 'a Flutter widget library for rendering music tabs',
        name: 'libtab',
        links: {
            [LinkType.repository]: 'https://github.com/eighty4/libtab',
        },
        technologies: [Tech.Dart, Tech.Flutter, Tech.GitHubActions],
    },
    {
        description: 'a binary for developer workflows written in Golang',
        name: 'maestro',
        links: {
            [LinkType.repository]: 'https://github.com/eighty4/maestro',
            [LinkType.website]: 'https://maestro.eighty4.tech',
        },
        technologies: [Tech.Golang, Tech.Git, Tech.GitHubActions],
    },
    {
        description: 'a Node.js application for experimental web scraping using Playwright',
        name: 'qwerky',
        links: {
            [LinkType.repository]: 'https://github.com/eighty4/qwerky',
        },
        technologies: [Tech.TypeScript, Tech.NodeJS, Tech.Playwright, Tech.GitHubActions],
    },
    {
        description: 'a Plaid API development platform on Node.js',
        name: 'trousers',
        links: {
            [LinkType.repository]: 'https://github.com/eighty4/trousers',
        },
        technologies: [Tech.TypeScript, Tech.NodeJS, Tech.Plaid, Tech.GitHubActions],
    },
    {
        description: 'a Node.js utility for initializing Elasticsearch mappings and bootstrapping test data',
        name: 'velcro',
        links: {
            [LinkType.repository]: 'https://github.com/eighty4/velcro',
        },
        technologies: [Tech.NodeJS, Tech.Elasticsearch, Tech.DockerCompose, Tech.Docker, Tech.TypeScript, Tech.GitHubActions],
    },
]
