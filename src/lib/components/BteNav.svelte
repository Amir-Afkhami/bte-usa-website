<script lang="ts">
	import { goto } from '$app/navigation';
	const navLinks: string[] = ['Join', 'Info', 'Map', 'Tutorial', 'Events'];
</script>

<div class="bte-nav">
	<div class="bte">
		<img src="" alt="" class="logo" />
		<a data-sveltekit-preload-data="tap" href="/">
      Build The Earth 1:1 USA
    </a>
		{#each navLinks as navLink}
			<a data-sveltekit-preload-data="tap" href="/{navLink.toLowerCase}">
				{navLink}
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.bte-nav {
		height: 80px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
