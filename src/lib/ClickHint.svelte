<script lang="ts">
	type Props = {
		/** horizontal position of the fingertip inside the (positioned) parent */
		x?: string;
		/** vertical position of the fingertip inside the (positioned) parent */
		y?: string;
		/** time in ms until the hint shows up */
		delay?: number;
	};

	const { x = '50%', y = '50%', delay = 10_000 }: Props = $props();
</script>

<!-- purely decorative: the clickable element itself carries the accessible label -->
<div class="click-hint" style:left={x} style:top={y} style:--delay="{delay}ms" aria-hidden="true">
	<span class="ripple"></span>
	<svg class="hand" viewBox="0 0 64 80">
		<path
			class="skin"
			d="M16 34 V10 a6 6 0 0 1 12 0 V30 a5 5 0 0 1 10 0 V32 a5 5 0 0 1 10 0 V34 a4.5 4.5 0 0 1 9 0 V50 c0 10 -6 16 -12 18 V74 H24 V68 L8 48 a4.5 4.5 0 0 1 7 -5 L16 46 Z"
		/>
		<path class="line" d="M28 30 V40 M38 32 V41 M48 34 V42 M24 68 H45" />
	</svg>
</div>

<style lang="scss">
	@use 'sass:math';

	// the fingertip within the 64 x 80 viewBox
	$tip-x: math.div(22, 64);
	$tip-y: math.div(4, 80);
	$cycle: 1.8s;

	.click-hint {
		position: absolute;
		width: 0;
		height: 0;
		z-index: 10;
		pointer-events: none;
		opacity: 0;
		animation: hint-appear 0.6s var(--delay) ease forwards;
	}

	.hand {
		--width: clamp(3rem, 12vmin, 5rem);
		--height: calc(var(--width) * 1.25);
		position: absolute;
		width: var(--width);
		height: var(--height);
		left: calc(var(--width) * #{-$tip-x});
		top: calc(var(--height) * #{-$tip-y});
		transform-origin: math.percentage($tip-x) math.percentage($tip-y);
		filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
		animation: hand-tap $cycle var(--delay) ease-in-out infinite;
	}
	.skin {
		fill: #fff;
		stroke: #3a3a3a;
		stroke-width: 2.5;
		stroke-linejoin: round;
	}
	.line {
		fill: none;
		stroke: #3a3a3a;
		stroke-width: 2;
		stroke-linecap: round;
	}

	.ripple {
		position: absolute;
		width: 3rem;
		height: 3rem;
		left: -1.5rem;
		top: -1.5rem;
		border-radius: 50%;
		border: 3px solid rgba(255, 255, 255, 0.9);
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
		opacity: 0;
		animation: ripple $cycle var(--delay) ease-out infinite;
	}

	@keyframes hint-appear {
		to {
			opacity: 1;
		}
	}
	@keyframes hand-tap {
		0%,
		100% {
			translate: 0.8rem 1rem;
			scale: 1;
		}
		40%,
		55% {
			translate: 0 0;
			scale: 0.9;
		}
	}
	@keyframes ripple {
		0%,
		42% {
			opacity: 0;
			scale: 0.3;
		}
		48% {
			opacity: 1;
			scale: 0.4;
		}
		100% {
			opacity: 0;
			scale: 1.6;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hand,
		.ripple {
			animation: none;
		}
	}
</style>
