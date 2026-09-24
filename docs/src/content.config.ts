import {
    defineDocsNavCollection,
    defineDocsPagesCollection,
    defineDocsSitesCollection,
    defineProjectsCollection,
    defineReposCollection,
} from '@eighty4/www-astro-content'

export const collections = {
    nav: defineDocsNavCollection(),
    pages: defineDocsPagesCollection(),
    sites: defineDocsSitesCollection(),
    projects: defineProjectsCollection(),
    repos: defineReposCollection(),
}
