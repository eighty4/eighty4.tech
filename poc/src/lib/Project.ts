import type {Tech} from './Tech'

export interface Project {
    name: string
    repository: string
    technologies: Array<Tech>
}

export const projects: Array<Project> = [
    {
        name: 'cquill',
        repository: 'https://github.com/eighty4/cquill',
        technologies: ['CQL', 'ScyllaDB', 'Rust', 'Docker', 'Docker Compose', 'GitHub Actions'],
    },
    {
        name: 'libtab',
        repository: 'https://github.com/eighty4/libtab',
        technologies: ['Dart', 'Flutter', 'GitHub Actions'],
    },
    {
        name: 'maestro',
        repository: 'https://github.com/eighty4/maetsro',
        technologies: ['Golang', 'Git', 'GitHub Actions'],
    },
    {
        name: 'qwerky',
        repository: 'https://github.com/eighty4/qwerky',
        technologies: ['JavaScript', 'Node.js', 'Plaid'],
    },
    {
        name: 'trousers',
        repository: 'https://github.com/eighty4/trousers',
        technologies: ['JavaScript', 'Node.js', 'Plaid'],
    },
    {
        name: 'velcro',
        repository: 'https://github.com/eighty4/velcro',
        technologies: ['JavaScript', 'Node.js', 'Elasticsearch', 'pnpm', 'Docker Compose', 'Docker', 'TypeScript'],
    },
]

export function getProjectsWithTech(tech: Array<Tech>): Array<Project> {
    return projects.filter(project => tech.every(t => project.technologies.indexOf(t) !== -1))
}
