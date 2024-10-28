<script lang="ts">
	import { onMount } from 'svelte';
	import { drawIntoCanvas } from './Confetti';

	type Props = {
		color?: string | undefined;
		song?: string | undefined;
	};

	const { color, song }: Props = $props();

	onMount(() => setTimeout(() => drawIntoCanvas(color), 600));
</script>

<canvas></canvas>
{#if song}<audio autoplay src={song}></audio>{/if}

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
