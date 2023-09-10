<script lang="ts">
    import {projects} from './data'
    import Menu from './Menu.svelte'
    import type {Project} from './Project'
    import {getTechnologiesFromProjects} from './Project'
    import ProjectCard from './ProjectCard.svelte'
    import {Tech, TechCategory} from './Tech'
    // import Search from './Search.svelte'

    let projectsDisplaying: Array<Project> = projects
    let technologies: Record<TechCategory, Array<Tech>> = getTechnologiesFromProjects(projects)
    let techSelected: Record<Tech, boolean> = (function () {
        const result = {}
        for (const techs of Object.values(technologies)) {
            for (const tech of techs) {
                result[tech as Tech] = false
            }
        }
        return result
    })()

    function onToggleTech({detail: tech}: CustomEvent<Tech>) {
        techSelected = {
            ...techSelected,
            [tech]: !techSelected[tech],
        }
    }

    $: {
        const tech = Object.keys(techSelected).filter(t => techSelected[t])
        projectsDisplaying = tech.length === 0
            ? projects
            : projects.filter(project => tech.every(t => project.technologies.indexOf(t) !== -1))
    }
</script>

<div class="grid">
    <div class="menu">
        <Menu technologies={technologies} selected={techSelected} on:toggle-tech={onToggleTech}/>
    </div>
    <div class="projects">
<!--        <Search selected={techSelected} on:toggle-tech={onToggleTech}/>-->
        {#if projectsDisplaying.length}
            {#each projectsDisplaying as project (project)}
                <ProjectCard project={project}/>
            {/each}
        {:else}
            <div class="empty">
                <p>You're over filtered. Remove technology filters to see project details here.</p>
            </div>
        {/if}
    </div>
</div>

<style>
    .grid {
        --grid-padding: 3rem;
        --project-padding: 2rem;
        --menu-width: 12rem;
        display: grid;
        grid-template-columns: var(--menu-width) 1fr;
        grid-template-rows: 1fr;
        height: 100%;
    }
    .menu {
        grid-area: 1 / 1 / 6 / 2;
    }
    .projects {
        grid-area: 1 / 2 / 2 / 3;
        padding: var(--grid-padding);
        display: flex;
        flex-direction: column;
        gap: var(--project-padding);
    }
    .empty {
        height: 50%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
