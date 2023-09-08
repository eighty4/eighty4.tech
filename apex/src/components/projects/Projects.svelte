<script lang="ts">
    import {getProjectsWithTech, projects} from './Project'
    import TechButton from './TechButton.svelte'
    import ProjectCard from './ProjectCard.svelte'
    import {categorized, type Tech} from './Tech'

    let selectedTech: Array<Tech> = []

    function onToggleTechSelection(tech: Tech) {
        const index = selectedTech.indexOf(tech)
        if (index === -1) {
            selectedTech.push(tech)
        } else {
            selectedTech.splice(index, 1)
        }
        selectedTech = selectedTech
    }
</script>

<div>
    Selected:
    {#each selectedTech as tech}
        <span>{tech}</span>
    {/each}
</div>

{#each Object.entries(categorized) as [label, techs]}
    <div class="tech-list">
        <h3>{label}</h3>
        {#each techs as tech}
            <TechButton tech={tech} cb={onToggleTechSelection}/>
        {/each}
    </div>
{/each}

<div class="projects">
    {#if selectedTech.length === 0}
        {#each projects as project}
            <ProjectCard name={project.name} repository={project.repository}/>
        {/each}
    {:else }
        {#each getProjectsWithTech(selectedTech) as project}
            <ProjectCard name={project.name} repository={project.repository}/>
        {/each}
    {/if}
</div>

<style>
    .tech-list {
        margin-bottom: .5rem;
    }

    .tech-list h3 {
        font-weight: 500;
        font-size: 1rem;
        font-family: sans-serif;
        margin: 0 0 .2rem;
        padding: 0;
    }
</style>
