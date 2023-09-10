<script lang="ts">
    import {LinkType, type Project} from './Project'

    export let project: Project
</script>

<div class="card">
    <h3>{project.name}</h3>
    <p class="description">{project.description}</p>
    {#if project.instructions && project.instructions.length}
        {#each project.instructions as instruction}
            <div class="instructions">
                <h4>{instruction.label}</h4>
                {#if instruction.sections}
                    {#each instruction.sections as section}
                        <div class="instructions">
                            <h4>{instruction.label}</h4>
                        </div>
                        {#if section.forward}
                            {#each section.forward as forward}
                                <p>{forward}</p>
                            {/each}
                        {/if}
                        {#if section.commands}
                            {#each instruction.commands as command}
                                <pre><code>{command}</code></pre>
                            {/each}
                        {/if}
                        {#if section.afterward}
                            {#each section.afterward as afterward}
                                <p>{afterward}</p>
                            {/each}
                        {/if}
                    {/each}
                {/if}
            </div>
        {/each}
    {/if}
    {#if project.links && Object.keys(project.links).length}
        {#each Object.values(LinkType) as linkType}
            {#if project.links[linkType]}
                <div class="link">
                    <a href={project.links[linkType]}>{linkType}</a>
                </div>
            {/if}
        {/each}
    {/if}
    {#if project.technologies && project.technologies.length}
        <div class="technologies">
            {#each project.technologies as tech}
                <span>{tech}</span>
            {/each}
        </div>
    {/if}
</div>

<style>
    .card {
        background: rgb(6, 6, 6);
    }

    :global(.light) .card {
        background: rgba(222, 222, 222, .75);
    }

    h3 {
        margin: 0;
        padding: 0;
    }

    .description {
        font-size: .9rem;
    }

    .link {
        font-size: .8rem;
    }

    .technologies {
        display: flex;
        flex-wrap: wrap;
        gap: .7rem;
        font-size: .7rem;
    }
</style>
