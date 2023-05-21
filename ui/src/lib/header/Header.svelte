<script lang="ts">
	import Eighty4Link from './Eighty4Link.svelte';
	import GitHubLogo from './GitHubLogoDark.svelte';
	import type MenuApp from './MenuApp';

	const apps: Array<MenuApp> = [
		{ name: 'blog', url: 'https://blog.eighty4.tech' },
		{ name: 'code', url: 'https://eighty4.tech' },
		{ name: 'colors', url: 'https://colors.eighty4.tech' },
		{ name: 'fonts', url: 'https://fonts.eighty4.tech' }
	];

	let menuOpen = false;
	let menuLink: HTMLElement;
	let menuPane: HTMLElement;

	function onAppLinkClick() {
		menuOpen = true;

		const handleNextClick = (e: MouseEvent) => {
			if (!menuPane.contains(e.target as Node)) {
				menuOpen = false;
				e.stopPropagation();
				document.removeEventListener('click', handleNextClick, true);
			}
		};
		document.addEventListener('click', handleNextClick, true);
	}

	function onAppLinkKeyUp(e: KeyboardEvent) {
		if (e.code !== 'Enter') {
			return;
		}
		menuLink.click();
	}
</script>

<header>
	<div>
		<Eighty4Link />
		<span class="slash">/</span>
		<span
			class="menu-trigger"
			on:click={onAppLinkClick}
			on:keyup={onAppLinkKeyUp}
			bind:this={menuLink}>colors</span
		>
		<ul class="menu-pane" class:menuOpen bind:this={menuPane}>
			{#each apps as app}
				<li class="menu-item">
					<a class="menu-link" href={app.url}>{app.name}</a>
				</li>
			{/each}
		</ul>
	</div>
	<div class="spacer"></div>
	<a class="github-link" href="https://github.com/eighty4">
		<GitHubLogo />
	</a>
</header>

<style>
	header {
		--background-header: #000;
		--text-primary-color: #fff;
		--border-size: 0.05rem;
		--header-height: 3.5rem;
		--header-padding: 2.25rem;
		--border-color: #333;
		--border-lite-highlight-color: #222;
		--border-hover-color: #aaa;
	}

	header {
		position: sticky;
		top: 0;

		height: var(--header-height);
		background: var(--background-header);
		border-bottom: var(--border-size) solid var(--border-color);

		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		padding-left: calc(3 * var(--header-padding));
		padding-right: var(--header-padding);

		font-size: 1.5rem;
		letter-spacing: 0.075rem;
		font-family: Quicksand, sans-serif;
		color: var(--text-primary-color);
		user-select: none;
	}

	.spacer {
		flex: 1;
	}

	.slash {
		margin-left: 0.5rem;
	}

	.menu-trigger {
		border: var(--border-size) solid transparent;
		cursor: pointer;
		transition: border 300ms linear;
		margin-left: 0.1rem;
		padding: 0.2rem 0.4rem;
		border-radius: 0.1rem;
	}

	header:hover .menu-trigger {
		border-color: var(--border-lite-highlight-color);
	}

	.menu-trigger:hover {
		border-color: var(--border-hover-color) !important;
	}

	.menu-pane {
		font-size: 1.5rem;
		letter-spacing: 0.075rem;
		font-family: Quicksand, sans-serif;
		user-select: none;
		position: absolute;
		top: 3.2rem;
		left: 18.5rem;
		background: #000;
		list-style-type: none;
		border: 1px solid transparent;
		border-radius: 0.2rem;
		opacity: 0;
		max-height: 0;
		visibility: hidden;
	}

	.menu-pane.menuOpen {
		display: block;
		border-color: var(--border-color);
		opacity: 1;
		max-height: 300px;
		visibility: visible;
		transition: visibility 0s, border-color 0.3s, opacity 0.3s, max-height 0.3s ease-in 0.1s;
	}

	.menu-pane .menu-item {
		margin: 0.5rem;
	}

	.menu-pane .menu-link {
		color: transparent;
		text-decoration: none;
		text-underline-offset: 0.175rem;
	}

	.menu-pane.menuOpen .menu-link {
		color: var(--text-primary-color);
		transition: color 0.25s 0.125s;
	}

	.menu-pane .menu-link:hover {
		text-decoration: underline;
		text-decoration-color: mediumvioletred;
	}
</style>
