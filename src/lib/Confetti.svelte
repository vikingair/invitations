<script lang="ts">
	import { onMount } from 'svelte';
	import { drawIntoCanvas } from './Confetti';

	onMount(() => setTimeout(drawIntoCanvas, 600));
</script>

<canvas />

<style>
	canvas {
		position: absolute;
		margin: auto;
		width: 96vmin;
		height: 96dvh;
		top: 2vmin;
		bottom: 2vmin;
		left: 2vmin;
		right: 2vmin;
		z-index: 9999;
		pointer-events: none;
	}
</style>
