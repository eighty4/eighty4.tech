import {Tech, techByCategory} from './Tech'
import {TechCategory} from './Tech'

export enum LinkType {
    docs = 'docs',
    repository = 'repository',
    website = 'website',
}

export interface Project {
    description?: string
    examples?: Array<TechExample>
    instructions?: Array<Instruction>
    links?: Partial<Record<LinkType, string>>
    name: string
    technologies?: Array<Tech>
}

export interface Instruction {
    label: string
    sections: Array<CommandBlock>
}

export interface CommandBlock {
    afterward?: Array<string>
    commands?: Array<string>
    forward?: Array<string>
}

export interface TechExample {
    tech: Array<Tech>
    references: Array<TechReference>
}

export interface TechReference {
    url: string
    line: number
}

export function getTechnologiesFromProjects(projects: Array<Project>): Partial<Record<TechCategory, Array<Tech>>> {
    const count: Partial<Record<Tech, number>> = {}
    for (const tech of Object.keys(Tech)) {
        count[tech] = 0
    }
    for (const project of projects) {
        for (const tech of project.technologies) {
            count[tech]++
        }
    }
    const result: Partial<Record<TechCategory, Array<Tech>>> = {}
    for (const category of Object.keys(techByCategory)) {
        const categoryTech: Array<Tech> = []
        for (const tech of techByCategory[category]) {
            if (count[tech]) {
                categoryTech.push(tech)
            }
        }
        if (categoryTech.length) {
            result[category] = categoryTech.sort((a, b) => count[b] - count[a])
        }
    }
    return result
}
