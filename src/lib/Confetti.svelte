<script lang="ts">
	import { onMount } from 'svelte';
	import { drawIntoCanvas } from './Confetti';

	type Props = {
		color?: string | undefined;
		song?: string | undefined;
	};

	const { color, song }: Props = $props();

	let canvas = $state<HTMLCanvasElement>();

	onMount(() => {
		let stop: (() => void) | undefined;
		const timeout = setTimeout(() => {
			if (canvas) stop = drawIntoCanvas(canvas, { colors: color ? [color] : undefined });
		}, 600);
		return () => {
			clearTimeout(timeout);
			stop?.();
		};
	});
</script>

<canvas bind:this={canvas}></canvas>
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
