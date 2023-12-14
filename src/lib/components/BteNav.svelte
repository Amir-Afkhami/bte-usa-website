<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import theme from '$lib/stores/theme';

	const navLinks: string[] = ['Join', 'Info', 'Map', 'Tutorial', 'Events'];
	$: index = 0;
	$: isNavOpen = false;

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
			isNavOpen = false;
		}
	});

	function changeTheme() {
		theme.set($theme === 'light' ? 'dark' : 'light');
	}

	function toggleNav() {
		isNavOpen = !isNavOpen;
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
	<div class="links {isNavOpen ? 'open' : ''}">
		{#each navLinks as navLink}
			<a data-sveltekit-preload-data="hover" href="/{navLink.toLowerCase()}">
				{navLink}
			</a>
		{/each}
		<div
			class="slider {'slider-pos-' + index}"
			style="display: {index === 0 ? 'none' : 'initial'};"
		/>
	</div>
	<div class="sign-in {isNavOpen ? 'open' : ''}">
		<a href="/sign-in">Sign In</a>
		<button class="fa {$theme === 'light' ? 'fa-moon' : 'fa-sun'}" on:click={changeTheme} />
	</div>
	<button class="burger {isNavOpen ? 'open' : ''}" on:click={toggleNav}>
		<div class="line" />
		<div class="line" />
		<div class="line" />
	</button>
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
			position: relative;
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
			transition: all 300ms ease;

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
			transition: all 400ms ease;

			button {
				font-size: 1.5rem;
				border: none;
				cursor: pointer;

				background-color: var(--secondary);
			}
		}

		.burger {
			@include layout.flex-center;
			display: none;
			flex-direction: column;
			width: 60px;
			height: 100%;
			gap: 5px;
			background-color: var(--secondary);
			border: none;

			> .line {
				width: 30px;
				height: 3px;
				border-radius: 2px;
				background-color: var(--accent);
			}
		}
	}

	@for $i from 1 through 5 {
		.slider-pos-#{$i} {
			left: ($i - 1) * 4em;
		}
	}

	@media screen and (max-width: 1000px) {
		.bte-nav {
			.bte {
				z-index: 3;
				a {
					font-size: 1rem;
				}
			}

			.links {
				position: absolute;
				top: -39em;
				height: fit-content;
				padding: 0;
				left: 0;
				flex-direction: column;
				z-index: 1;

				a {
					background-color: var(--secondary);
					width: 25em;
					height: 7em;
					max-width: 100vw;

					&::before,
					&::after {
						display: none;
					}

					&:hover {
						transform: none;
					}
				}

				.slider {
					height: 7em;
					width: 5px;
					left: 0;
				}

				@for $i from 1 through 5 {
					.slider-pos-#{$i} {
						top: ($i - 1) * 7em;
					}
				}
			}

			.sign-in {
				font-size: 1.2rem;
				position: absolute;
				top: -39em;
				height: fit-content;
				left: 0;
				padding: 0;
				gap: 0;
				height: 7em;
				background-color: var(--secondary);
				z-index: 1;

				> * {
					@include layout.flex-center;
					width: 12.5em;
					max-width: 50vw;
					padding: 0;
				}

				button {
					font-size: inherit;
				}
			}

			.burger {
				display: flex;
			}

			.open {
				&.links {
					top: 4em;
				}

				&.sign-in {
					top: 39em;
				}

				&.burger {
					:nth-child(2) {
						visibility: hidden;
					}

					:nth-child(1) {
						transition: all 300ms ease;
						transform-origin: 1.5px 1.5px;
						transform: translateY(16px) rotateZ(-45deg) scaleX(70%);
					}

					:nth-child(3) {
						transition: all 300ms ease;
						transform-origin: 28.5px 1.5px;
						transform: rotateZ(45deg) scaleX(70%);
					}
				}
			}
		}
	}
</style>
