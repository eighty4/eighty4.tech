<script lang="ts">
    import {Tech} from './Tech'
    import TechButton from './TechButton.svelte'

    export let selected: Record<Tech, boolean>

    let value: string = ''
    let autocomplete: Array<Tech> = []

    $: if (value.length > 1 || (value.length === 1 && autocomplete.length)) {
        const query = value.toLowerCase()
        const matchingTech: Array<Tech> = []
        for (const tech of Object.keys(selected)) {
            if (tech.toLowerCase().startsWith(query)) {
                matchingTech.push(tech)
            }
        }
        autocomplete = matchingTech
    } else {
        autocomplete = []
    }

    function onKeyUp(e: KeyboardEvent) {
        console.log(e.key)
    }
</script>

<input type="search" bind:value on:keyup={onKeyUp}/>

<div class="autocomplete">
    {#each autocomplete as tech, i}
        <TechButton tech={tech} selected={selected[tech]} highlighted={i === 0} on:toggle-tech/>
    {/each}
</div>

<style>
    input {
        width: 100%;
    }
</style>
