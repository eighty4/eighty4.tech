<script lang="ts">
    import type {Tech, TechCategory} from './Tech'
    import TechButton from './TechButton.svelte'
    import AccordionIcon from './AccordionIcon.svelte'

    const foldPosition = 3

    export let category: TechCategory
    export let technologies: Array<Tech>
    export let selected: Record<Tech, boolean>

    const afterFold = technologies.slice(foldPosition)
    const usesFold = technologies.length > foldPosition
    let closed: boolean = false
    let hover: boolean = false

    $: foldedCount = afterFold.length - afterFold.filter(tech => selected[tech]).length
    $: folded = !closed && foldedCount > 0
    $: open = (!usesFold || hover || !folded) && !closed

    function onTitleToggleMode() {
        closed = !closed
    }

    function onTitleKeyUp(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            onTitleToggleMode()
        }
    }

    const onMouseEnter = usesFold ? () => hover = true : undefined
    const onMouseLeave = usesFold ? () => hover = false : undefined
</script>

<div class="container" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave} role="columnheader" tabindex="0">
    <div class="title" on:click={onTitleToggleMode} on:keyup={onTitleKeyUp} role="button" tabindex="0">
        <div class="rotate" class:folded class:open>
            <AccordionIcon size="1rem"/>
        </div>
        <h3>{category}</h3>
    </div>
    {#if !closed}
        <div class="tech-buttons above-fold">
            {#each technologies as tech, i (tech)}
                {#if i < foldPosition || hover || selected[tech]}
                    <TechButton tech={tech} selected={selected[tech]} on:toggle-tech animated={i >= foldPosition} --animate-delay={`${i*.015}s`}/>
                {/if}
            {/each}
            {#if !hover && foldedCount > 0}
                <div class="folded-count">
                    {foldedCount} more
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        --button-padding: .1rem;
    }

    .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .75rem;
        padding-left: .75rem;
        cursor: pointer;
        user-select: none;
    }

    h3 {
        font-size: .95rem;
        font-weight: 500;
        letter-spacing: .0175rem;
    }

    .tech-buttons {
        padding-left: 2.25rem;
        display: flex;
        flex-direction: column;
        gap: var(--button-padding);
        align-items: flex-start;
    }

    .folded-count {
        padding-left: .5rem;
        margin-top: .5rem;
        font-size: .6rem;
        opacity: .7;
    }

    .rotate {
        transition: transform ease-in-out 175ms;
    }

    .rotate.folded {
        transform: rotate(45deg);
    }

    .rotate.open {
        transform: rotate(90deg);
    }
</style>
