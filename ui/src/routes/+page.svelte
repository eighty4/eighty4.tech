<script lang="ts">
	import Header from '$lib/header/Header.svelte';
</script>

<Header />

<h1>Welcome to your library project</h1>
{#each { length: 50 } as _, i}
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{/each}
