<script lang="ts">
	export const overlapImage = 'Montgomery.jpg';
	export const text = '';
</script>

<div class="container">
	<div class="left">
		<img src="src/lib/images/showcase/MC_{overlapImage}" alt="Front Page Image" srcset="" />
	</div>
	<div class="right">
		<img src="src/lib/images/showcase/{overlapImage}" alt="Front Page Overlap" srcset="" />
	</div>
	<h1>{text}</h1>
</div>

<style lang="scss">
</style>
