<script lang="ts">
    import {Tech, TechCategory} from './Tech'
    import MenuTechGroup from './MenuTechGroup.svelte'

    export let technologies: Record<TechCategory, Array<Tech>>
    export let selected: Record<Tech, boolean>

    const categories = [TechCategory.Languages, TechCategory.Databases, TechCategory.Builds]
</script>

<div class="menu">
    {#each categories as category}
        {#if technologies[category] }
            <MenuTechGroup category={category} technologies={technologies[category]}
                           selected={selected} on:toggle-tech/>
        {/if}
    {/each}
</div>

<style>
    .menu {
        background: rgb(6, 6, 6);
        height: 100%;
    }

    :global(.light) .menu {
        background: rgb(222, 246, 249);
    }
</style>
