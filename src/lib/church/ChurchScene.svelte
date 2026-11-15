<script lang="ts">
	import type { Phase } from './types';

	type Props = {
		phase: Phase;
		reducedMotion: boolean;
		onOpen: () => void;
	};

	const { phase, reducedMotion, onOpen }: Props = $props();

	const zoomed = $derived(phase !== 'idle' && !reducedMotion);
	const open = $derived((phase === 'opening' || phase === 'revealed') && !reducedMotion);
</script>

{#snippet leafDecoration()}
	<svg viewBox="0 0 45 190" aria-hidden="true">
		<rect class="strap" x="0" y="34" width="24" height="3" rx="1" />
		<rect class="strap" x="0" y="156" width="24" height="3" rx="1" />
		<path class="panel" d="M8 82 V45 A37 37 0 0 1 37 8.9 V82 Z" />
		<rect class="panel" x="8" y="94" width="29" height="44" rx="1.5" />
		<rect class="panel" x="8" y="148" width="29" height="34" rx="1.5" />
		<circle class="handle-plate" cx="39.5" cy="114" r="2" />
		<circle class="handle-ring" cx="39.5" cy="119" r="3.4" />
	</svg>
{/snippet}

<div class="church" class:zoomed>
	<svg class="facade" viewBox="0 0 400 640" aria-hidden="true">
		<ellipse class="shadow" cx="200" cy="626" rx="196" ry="12" />

		<!-- tower -->
		<rect class="stone-shade" x="160" y="126" width="80" height="200" />
		<rect class="stone-dark" x="154" y="122" width="92" height="8" />
		<clipPath id="belfry-clip">
			<path d="M184 204 V176 a16 16 0 0 1 32 0 V204 Z" />
		</clipPath>
		<path class="opening" d="M184 204 V176 a16 16 0 0 1 32 0 V204 Z" />
		<!-- bell hanging from a wooden beam, pivoting at (200, 170), clipped to the belfry opening -->
		<g clip-path="url(#belfry-clip)">
			<g class="bell">
				<g class="clapper">
					<line class="clapper-rod" x1="200" y1="178" x2="200" y2="187" />
					<circle class="gold" cx="200" cy="188.5" r="1.8" />
				</g>
				<rect class="gold" x="198.5" y="171" width="3" height="4" rx="0.5" />
				<path class="gold" d="M193.5 182 c0 -11 13 -11 13 0 l2 5 h-17 z" />
			</g>
			<rect class="beam" x="185" y="167" width="30" height="4.5" rx="1" />
			<circle class="beam-pin" cx="200" cy="169.25" r="1" />
		</g>

		<!-- spire with cross -->
		<polygon class="roof" points="148,126 200,30 252,126" />
		<polygon class="roof-dark" points="200,30 252,126 200,126" />
		<rect class="gold" x="197" y="2" width="6" height="32" rx="1" />
		<rect class="gold" x="187" y="11" width="26" height="6" rx="1" />

		<!-- nave -->
		<rect class="stone" x="70" y="300" width="260" height="292" />
		<rect class="stone-shade" x="70" y="300" width="14" height="292" />
		<rect class="stone-shade" x="316" y="300" width="14" height="292" />
		<rect class="stone-dark" x="64" y="580" width="272" height="12" />

		<!-- gable -->
		<polygon class="roof" points="50,314 200,212 350,314" />
		<polygon class="roof-dark" points="200,212 350,314 200,314" />
		<polygon class="stone" points="80,306 200,228 320,306" />
		<rect class="stone-dark" x="62" y="304" width="276" height="7" />

		<!-- rose window -->
		<circle class="stone-dark" cx="200" cy="268" r="25" />
		<circle class="glass" cx="200" cy="268" r="21" />
		<g class="tracery">
			{#each [0, 45, 90, 135] as angle (angle)}
				<line x1="200" y1="247" x2="200" y2="289" transform="rotate({angle} 200 268)" />
			{/each}
			{#each [0, 45, 90, 135, 180, 225, 270, 315] as angle (angle)}
				<circle cx="200" cy="254" r="5" transform="rotate({angle + 22.5} 200 268)" />
			{/each}
		</g>
		<circle class="stone-dark" cx="200" cy="268" r="5" />

		<!-- side windows -->
		{#each [100, 270] as x (x)}
			<path class="window" d="M{x} 462 V392 a15 15 0 0 1 30 0 V462 Z" />
			<line class="mullion" x1={x + 15} y1="377" x2={x + 15} y2="462" />
			<line class="mullion" x1={x} y1="420" x2={x + 30} y2="420" />
			<rect class="stone-dark" x={x - 4} y="462" width="38" height="5" />
		{/each}

		<!-- portal -->
		<path class="stone-dark" d="M141 592 V445 a59 59 0 0 1 118 0 V592 Z" />
		<path class="stone-light" d="M147 592 V445 a53 53 0 0 1 106 0 V592 Z" />
		<path class="stone-shade" d="M151 592 V445 a49 49 0 0 1 98 0 V592 Z" />
		<path class="doorway" d="M155 592 V445 a45 45 0 0 1 90 0 V592 Z" />
		<polygon class="stone-light" points="193,383 207,383 204,397 196,397" />

		<!-- steps -->
		<rect class="stone-light" x="135" y="590" width="130" height="10" />
		<rect class="stone-shade" x="135" y="598" width="130" height="2" />
		<rect class="stone-light" x="120" y="600" width="160" height="11" />
		<rect class="stone-shade" x="120" y="609" width="160" height="2" />
		<rect class="stone-light" x="105" y="611" width="190" height="12" />
		<rect class="stone-shade" x="105" y="621" width="190" height="2" />
	</svg>

	<button
		class="door"
		class:open
		class:idle={phase === 'idle'}
		aria-label="Open the church door"
		disabled={phase !== 'idle'}
		onclick={onOpen}
	>
		<span class="inside"></span>
		<span class="leaf left">{@render leafDecoration()}</span>
		<span class="leaf right">{@render leafDecoration()}</span>
		<span class="gap"></span>
	</button>
</div>

<style lang="scss">
	$stone: var(--church-color);
	$stone-light: color-mix(in srgb, $stone 70%, white);
	$stone-shade: color-mix(in srgb, $stone 86%, #5a4a3a);
	$stone-dark: color-mix(in srgb, $stone 68%, #3a2f25);
	$accent: var(--accent-color);
	$accent-dark: color-mix(in srgb, $accent 72%, #1f2a3a);
	$roof: color-mix(in srgb, $accent 85%, #2a3442);
	$glass: color-mix(in srgb, $accent 55%, #fff3c4);
	$wood: color-mix(in srgb, $accent 45%, #4a3322);
	$wood-dark: color-mix(in srgb, $wood 70%, black);
	$gold: #d9b45a;
	$light: #fff4d2;

	// doorway in the SVG: x 155-245, y 400-590 of a 400 x 640 viewBox
	$door-left: 38.75%;
	$door-top: 62.5%;
	$door-width: 22.5%;
	$door-height: 29.6875%;
	$door-center-y: 77.344%;
	// the arch radius (45) relative to the door height (190)
	$arch-y: 23.684%;

	.church {
		position: relative;
		height: min(94dvh, 141vw);
		aspect-ratio: 400 / 640;
		transform-origin: 50% $door-center-y;
		transition: transform 1.2s cubic-bezier(0.65, 0, 0.3, 1);

		&.zoomed {
			// move the door centre into the viewport centre and fill the screen with it
			transform: translateY(50% - $door-center-y) scale(3);
		}
	}

	.facade {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.shadow {
		fill: rgba(40, 30, 20, 0.15);
	}
	.stone {
		fill: $stone;
	}
	.stone-light {
		fill: $stone-light;
	}
	.stone-shade {
		fill: $stone-shade;
	}
	.stone-dark {
		fill: $stone-dark;
	}
	.roof {
		fill: $roof;
	}
	.roof-dark {
		fill: $accent-dark;
	}
	.gold {
		fill: $gold;
	}
	.glass {
		fill: $glass;
	}
	.beam {
		fill: #6b4628;
		stroke: #3f2816;
		stroke-width: 0.8;
	}
	.beam-pin {
		fill: #3f2816;
	}
	.bell,
	.clapper {
		transform-box: view-box;
		animation: bell-swing 1.8s ease-in-out infinite;
	}
	.bell {
		transform-origin: 200px 170px;
	}
	.clapper {
		// lags behind the bell so it visibly strikes the rim at each turn
		transform-origin: 200px 178px;
		animation-name: clapper-swing;
	}
	.clapper-rod {
		stroke: color-mix(in srgb, $gold 70%, #3a2f25);
		stroke-width: 1;
	}
	.opening,
	.doorway {
		fill: #2c241d;
	}
	.tracery {
		fill: none;
		stroke: $stone-dark;
		stroke-width: 2;
	}
	.window {
		fill: $glass;
		stroke: $stone-dark;
		stroke-width: 4;
	}
	.mullion {
		stroke: $stone-dark;
		stroke-width: 2;
	}

	.door {
		position: absolute;
		left: $door-left;
		top: $door-top;
		width: $door-width;
		height: $door-height;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		perspective: 600px;
		overflow: hidden;
		border-radius: 50% 50% 0 0 #{'/'} $arch-y $arch-y 0 0;
		-webkit-tap-highlight-color: transparent;

		&:disabled {
			cursor: default;
		}
		&:focus-visible {
			outline: 0.6vmin solid $gold;
			outline-offset: 0.6vmin;
		}
	}

	.inside {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 50% 60%, #fff 0%, $light 45%, #ffd88a 100%);
		opacity: 0;
		transition: opacity 0.6s ease-in;

		.open & {
			opacity: 1;
		}
	}

	.leaf {
		position: absolute;
		top: 0;
		width: 50%;
		height: 100%;
		background:
			repeating-linear-gradient(
				90deg,
				transparent 0 24%,
				color-mix(in srgb, $wood-dark 40%, transparent) 24% 25%
			),
			linear-gradient(90deg, $wood, color-mix(in srgb, $wood 85%, black));
		box-shadow: inset 0 0 0.8vmin rgba(0, 0, 0, 0.35);
		transition: transform 0.9s cubic-bezier(0.45, 0, 0.2, 1);

		svg {
			display: block;
			width: 100%;
			height: 100%;
		}

		&.left {
			left: 0;
			transform-origin: left center;
			border-top-left-radius: 100% $arch-y;
		}
		&.right {
			right: 0;
			transform-origin: right center;
			border-top-right-radius: 100% $arch-y;

			svg {
				transform: scaleX(-1);
			}
		}

		.idle & {
			animation: door-rumble 3.2s 1s infinite;
		}
		.idle &.right {
			animation-delay: 1.05s;
		}

		// inward-opening doors
		.open &.left {
			transform: rotateY(105deg);
		}
		.open &.right {
			transform: rotateY(-105deg);
		}
	}

	.leaf {
		.panel {
			fill: color-mix(in srgb, $wood 85%, white);
			fill-opacity: 0.25;
			stroke: $wood-dark;
			stroke-width: 1.4;
		}
		.strap {
			fill: #2a2420;
		}
		.handle-plate {
			fill: $gold;
		}
		.handle-ring {
			fill: none;
			stroke: $gold;
			stroke-width: 1.2;
		}
	}

	.gap {
		position: absolute;
		left: 50%;
		top: 4%;
		bottom: 0;
		width: 2px;
		translate: -50% 0;
		background: linear-gradient(to bottom, transparent, $light 15%, #ffe6a8 85%, $light);
		box-shadow: 0 0 6px 1px #ffe6a8;
		opacity: 0.15;
		pointer-events: none;

		.idle & {
			animation: light-flicker 3.2s 1s infinite;
		}
		.door:not(.idle) & {
			opacity: 0;
			transition: opacity 0.3s;
		}
	}

	@keyframes door-rumble {
		0% {
			rotate: 0deg;
			translate: 0 0;
		}
		3% {
			rotate: -0.8deg;
			translate: -1px 0;
		}
		6% {
			rotate: 0.8deg;
			translate: 1px 0;
		}
		9% {
			rotate: -0.5deg;
			translate: -0.5px 0;
		}
		12% {
			rotate: 0.4deg;
			translate: 0.5px 0;
		}
		15% {
			rotate: 0deg;
			translate: 0 0;
		}
		100% {
			rotate: 0deg;
			translate: 0 0;
		}
	}
	@keyframes bell-swing {
		0%,
		100% {
			rotate: -22deg;
		}
		50% {
			rotate: 22deg;
		}
	}
	@keyframes clapper-swing {
		0%,
		100% {
			rotate: 14deg;
		}
		50% {
			rotate: -14deg;
		}
	}
	@keyframes light-flicker {
		0% {
			opacity: 0.15;
		}
		4% {
			opacity: 0.9;
		}
		7% {
			opacity: 0.4;
		}
		10% {
			opacity: 1;
		}
		16% {
			opacity: 0.6;
		}
		30% {
			opacity: 0.15;
		}
		100% {
			opacity: 0.15;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.church {
			transition: none;
		}
		.leaf,
		.gap,
		.bell,
		.clapper {
			animation: none !important;
		}
	}
</style>
