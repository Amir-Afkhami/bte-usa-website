<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import theme from '$lib/stores/theme';

	const navLinks: string[] = ['Join', 'Info', 'Map', 'Tutorial', 'Events'];
	$: index = 0;
	$: icon = 'fa-moon';

	afterNavigate(() => {
		for (const [i, navLink] of navLinks.entries()) {
			if ($page.url.pathname.startsWith(`/${navLink.toLowerCase()}`)) {
				index = i + 1;
				break;
			}

			// If current url is none of the links them set index to 0
			if (i === navLinks.length - 1 && !navLink.toLowerCase().startsWith($page.url.pathname)) {
				index = 0;
			}
		}
	});

	function changeTheme() {
		theme.set($theme === 'light' ? 'dark' : 'light');
	}
</script>

<div class="bte-nav">
	<div class="bte">
		<img
			src="https://buildtheearth.net/assets/img/site-logo-animated.gif?v=1587215843"
			alt="logo"
		/>
		<a data-sveltekit-preload-data="tap" href="/"> Build The Earth 1:1 USA </a>
	</div>
	<div class="links">
		{#each navLinks as navLink}
			<a data-sveltekit-preload-data="hover" href="/{navLink.toLowerCase()}">
				{navLink}
			</a>
		{/each}
		<div
			class="slider"
			style="left: calc({index - 1} * 4em);
		display: {index === 0 ? 'none' : 'initial'};"
		/>
	</div>
	<div class="sign-in">
		<a href="/sign-in">Sign In</a>
		<button class="fa {$theme === 'light' ? 'fa-moon' : 'fa-sun'}" on:click={changeTheme} />
	</div>
</div>

<style lang="scss">
	@use '$lib/scss/layout';
	.bte-nav {
		@include layout.flex-center;
		width: 100vw;
		height: 5em;
		background-color: var(--secondary);
		justify-content: space-between;
		img {
			max-height: 4em;
		}

		> div {
			@include layout.flex-center;
			gap: 1em;
		}

		a {
			text-decoration: none;
		}

		.bte {
			padding: 1em;
			a {
				font-size: 2rem;
			}
		}

		.links {
			font-size: 1.2rem;
			position: relative;
			height: 100%;
			gap: 0;

			a {
				@include layout.flex-center;
				width: 4em;
				height: 100%;
				transition: all 200ms ease;

				&::before {
					background-color: var(--tertiary);
					position: absolute;
					top: -5px;
					content: '';
					left: 0;
					right: 0;
					height: 6px;
				}

				&::after {
					background-color: var(--secondary);
					position: absolute;
					bottom: 0;
					content: '';
					left: 0;
					right: 0;
					height: 6px;
				}
			}

			a:hover {
				transform: translateY(5px);
			}

			.slider {
				position: absolute;
				transition: all 150ms ease-in;
				width: 4em;
				height: 5px;
				background-color: var(--accent);
				top: 0;
			}
		}

		.sign-in {
			padding: 1em;
			gap: 2em;

			button {
				font-size: 1.5rem;
				border: none;
				cursor: pointer;

				background-color: var(--secondary);
			}
		}
	}

	@media screen and (max-width: 1000px) {
	}
</style>
