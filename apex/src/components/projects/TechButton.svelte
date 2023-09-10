<script lang="ts">
    import type {Tech} from './Tech'
    import {createEventDispatcher} from 'svelte'

    export let tech: Tech
    export let highlighted: boolean = false
    export let selected: boolean = false
    export let animated: boolean = false

    const dispatch = createEventDispatcher<{'toggle-tech': Tech}>()
    function onClick() {
        dispatch('toggle-tech', tech)
    }
</script>

<button on:click={onClick} class:animated class:highlighted class:selected>
    {tech}
</button>

<style>
    button {
        display: block;
        border: 1px solid #333;
        padding: .25rem .45rem;
        border-radius: .1rem;
        font-size: .8rem;
        margin-right: .5rem;
        cursor: pointer;
    }

    .animated {
        animation-delay: var(--animate-delay, 0.1s);
        animation-duration: 0.15s;
        animation-fill-mode: both;
        animation-name: tech-button-fade-in;
    }

    button.selected {
        background: darkgreen;
        border-color: green;
    }

    button.highlighted {
        border-color: yellow;
    }

    @keyframes tech-button-fade-in {
        0% {
            opacity: 0;
            transform: scale(0%);
        }
        25% {
            transform: scale(0%);
        }
        100% {
            opacity: 1;
            transform: scale(100%);
        }
    }
</style>
