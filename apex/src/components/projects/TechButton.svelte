<script lang="ts">
    import type {Tech} from './Tech'

    export let tech: Tech

    export let cb

    function onClick() {
        cb(tech)
    }
</script>

<button class="tech-button" on:click={onClick}>
    {tech}
</button>

<style>
    .tech-button {
        font-family: sans-serif;
        display: inline-block;
        border: 1px solid #333;
        padding: .25rem .45rem;
        border-radius: .1rem;
        font-size: .8rem;
        margin-right: .5rem;
        cursor: pointer;
    }

    button:focus {
        background: green;
    }
</style>
