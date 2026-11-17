<script lang="ts">
	import { onDestroy } from 'svelte';
	import { page } from '$app/state';
	import { getQueryParams } from '../params';
	import ChurchScene from './ChurchScene.svelte';
	import Reveal from './Reveal.svelte';
	import { ORNAMENT_ICONS, type OrnamentIcon, type Phase } from './types';

	type ChurchParams = {
		content: string;
		img?: string;
		imgPosition?: string;
		song?: string;
		churchColor: string;
		accentColor: string;
		petalColor?: string;
		/** ornament icon, see {@link OrnamentIcon} */
		oi: OrnamentIcon;
	};
	const defaultQ: ChurchParams = {
		content: 'Here could be your text',
		churchColor: '#efe6d6',
		accentColor: '#8fb3d9',
		oi: 'i'
	};

	const q = { ...defaultQ, ...getQueryParams<ChurchParams>(page.url) };
	const ornamentIcon = ORNAMENT_ICONS.includes(q.oi) ? q.oi : defaultQ.oi;

	// keep in sync with the transition durations in ChurchScene.svelte
	const ZOOM_MS = 1200;
	const OPEN_MS = 900;

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	let phase = $state<Phase>('idle');
	let timeout: ReturnType<typeof setTimeout> | undefined;

	const open = () => {
		if (phase !== 'idle') return;
		if (reducedMotion) {
			phase = 'revealed';
			return;
		}
		phase = 'zooming';
		timeout = setTimeout(() => {
			phase = 'opening';
			timeout = setTimeout(() => (phase = 'revealed'), OPEN_MS);
		}, ZOOM_MS);
	};

	onDestroy(() => clearTimeout(timeout));

	const petalColors = q.petalColor ? [q.petalColor] : ['#ffffff', '#fffaf2', q.accentColor];
</script>

<!-- the whole screen opens the door; the door button remains as the keyboard target -->
<svelte:window onclick={open} />

<div
	class="church-page"
	class:idle={phase === 'idle'}
	style:--church-color={q.churchColor}
	style:--accent-color={q.accentColor}
>
	<ChurchScene {phase} {reducedMotion} onOpen={open} />
	{#if phase === 'opening' || phase === 'revealed'}
		<Reveal
			content={q.content}
			img={q.img}
			imgPosition={q.imgPosition}
			colors={petalColors}
			{ornamentIcon}
			showCard={phase === 'revealed'}
			{reducedMotion}
		/>
	{/if}
	{#if phase !== 'idle' && q.song}<audio autoplay src={q.song}></audio>{/if}
</div>

<style lang="scss">
	$stone: var(--church-color);
	$accent: var(--accent-color);

	.church-page {
		position: fixed;
		inset: 0;
		overflow: hidden;
		display: grid;
		place-items: center;
		background:
			radial-gradient(
				ellipse at 50% 15%,
				color-mix(in srgb, #fff6dc 70%, transparent) 0%,
				transparent 55%
			),
			linear-gradient(
				to bottom,
				color-mix(in srgb, $accent 45%, white) 0%,
				color-mix(in srgb, $accent 15%, white) 70%,
				color-mix(in srgb, $stone 70%, #b9c9a4) 100%
			);

		&.idle {
			cursor: pointer;
		}
	}
</style>
