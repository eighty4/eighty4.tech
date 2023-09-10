export enum Tech {
    Cassandra = 'Cassandra',
    CQL = 'CQL',
    Dart = 'Dart',
    Docker = 'Docker',
    DockerCompose = 'Docker Compose',
    Elasticsearch = 'Elasticsearch',
    Flutter = 'Flutter',
    Git = 'Git',
    GitHubActions = 'GitHub Actions',
    Golang = 'Golang',
    JavaScript = 'JavaScript',
    NodeJS = 'Node.js',
    Plaid = 'Plaid',
    Playwright = 'Playwright',
    Postgres = 'Postgres',
    Redis = 'Redis',
    Rust = 'Rust',
    ScyllaDB = 'ScyllaDB',
    TypeScript = 'TypeScript',
}

export enum TechCategory {
    APIs = 'APIs',
    Builds = 'Builds',
    Databases = 'Databases',
    Frameworks = 'Frameworks',
    Languages = 'Languages',
    Libraries = 'Libraries',
    Programs = 'Programs',
    Runtimes = 'Runtimes',
}

export const techByCategory: Record<TechCategory, Array<Tech>> = {
    APIs: [
        Tech.Plaid,
    ],
    Builds: [
        Tech.Docker,
        Tech.DockerCompose,
        Tech.GitHubActions,
    ],
    Databases: [
        Tech.Cassandra,
        Tech.Elasticsearch,
        Tech.Postgres,
        Tech.Redis,
        Tech.ScyllaDB,
    ],
    Frameworks: [
        Tech.Flutter,
    ],
    Languages: [
        Tech.CQL,
        Tech.Dart,
        Tech.Golang,
        Tech.JavaScript,
        Tech.Rust,
        Tech.TypeScript,
    ],
    Libraries: [
        Tech.Playwright,
    ],
    Programs: [
        Tech.Git,
    ],
    Runtimes: [
        Tech.NodeJS,
    ],
}
