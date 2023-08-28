<script lang="ts">
    export let name: string
    export let repository: string
</script>

<div>
    <h3>{name}</h3>
    {repository}
</div>

<style>
    h3 {
        margin: 0;
        padding: 0;
    }
</style>
