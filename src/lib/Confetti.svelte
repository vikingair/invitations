<script lang="ts">
	import { onMount } from 'svelte';
	import { drawIntoCanvas } from './Confetti';

	export let color: string | undefined = undefined;
	export let song: string | undefined = undefined;

	onMount(() => setTimeout(() => drawIntoCanvas(color), 600));
</script>

<canvas />
{#if song}<audio autoplay src={song} />{/if}

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
