import {
    defineDocsSitesCollection,
    defineProjectsCollection,
    defineReposCollection,
} from '@eighty4/www-astro-content'
import { defineWritingCollection } from './writing.ts'

export const collections = {
    projects: defineProjectsCollection(),
    repos: defineReposCollection(),
    sites: defineDocsSitesCollection(),
    writing: defineWritingCollection(),
}
