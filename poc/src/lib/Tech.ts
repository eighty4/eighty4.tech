export const technologies = [
    // apis
    'Plaid',
    // builds
    'Docker', 'Docker Compose', 'GitHub Actions', 'pnpm', 'Rush',
    // databases
    'Cassandra', 'ScyllaDB', 'CQL', 'Postgres', 'Elasticsearch',
    // frameworks
    'Flutter',
    // languages
    'Rust', 'Dart', 'Golang', 'JavaScript', 'TypeScript',
    // runtimes
    'Node.js',
    // programs
    'Git'
] as const

export type Tech = typeof technologies[number]

export const categorized: Record<string, Array<Tech>> = {
    // Apis: ['Plaid'],
    Builds: ['Docker', 'Docker Compose', 'GitHub Actions', 'pnpm', 'Rush'],
    Databases: ['Cassandra', 'ScyllaDB', 'CQL', 'Postgres', 'Elasticsearch'],
    Languages: ['Rust', 'Dart', 'Golang', 'JavaScript', 'TypeScript'],
    // Runtimes: ['Node.js'],
    // Programs: ['Git'],
}
