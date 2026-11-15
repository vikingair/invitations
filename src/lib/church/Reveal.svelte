<script lang="ts">
	import { drawIntoCanvas } from '../Confetti';

	type Props = {
		content: string;
		img?: string;
		imgPosition?: string;
		colors: string[];
		showCard: boolean;
		reducedMotion: boolean;
	};

	const { content, img, imgPosition, colors, showCard, reducedMotion }: Props = $props();

	let canvas = $state<HTMLCanvasElement>();

	$effect(() => {
		if (!canvas || reducedMotion) return;
		return drawIntoCanvas(canvas, { mode: 'petals', colors });
	});
</script>

<div class="burst" class:reduced={reducedMotion}></div>

{#if showCard}
	<div class="card-wrapper">
		<article class="card" class:reduced={reducedMotion} aria-live="polite">
			{#if img}
				<div class="frame">
					<img src={img} style:object-position={imgPosition} alt="" />
				</div>
			{/if}
			<svg class="ornament" viewBox="0 0 120 16" aria-hidden="true">
				<line x1="4" y1="8" x2="48" y2="8" />
				<line x1="72" y1="8" x2="116" y2="8" />
				<rect x="58" y="1" width="4" height="14" rx="1" />
				<rect x="53" y="5" width="14" height="4" rx="1" />
			</svg>
			<div class="text">
				<p>{content}</p>
			</div>
		</article>
	</div>
	<canvas bind:this={canvas}></canvas>
{/if}

<style lang="scss">
	$stone: var(--church-color);
	$accent: var(--accent-color);
	$accent-light: color-mix(in srgb, $accent 45%, white);
	$accent-dark: color-mix(in srgb, $accent 60%, #1f2a3a);
	$light: #fff4d2;
	$text: #3b3328;

	.burst {
		position: fixed;
		inset: 0;
		z-index: 10;
		pointer-events: none;
		background: radial-gradient(
			circle at 50% 50%,
			#fffdf7 0%,
			$light 35%,
			color-mix(in srgb, $accent 18%, $light) 75%,
			color-mix(in srgb, $accent 35%, white) 100%
		);
		// the door centre is in the viewport centre after zooming
		animation: light-burst 1.4s 0.25s cubic-bezier(0.5, 0, 0.75, 0) both;

		&.reduced {
			animation: fade-in 0.6s ease both;
		}
	}

	.card-wrapper {
		position: fixed;
		inset: 0;
		z-index: 11;
		display: grid;
		place-items: center;
		padding: 3dvh 4vw;
		box-sizing: border-box;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2dvh;
		box-sizing: border-box;
		width: min(100%, 36rem);
		max-height: 94dvh;
		padding: 3dvh min(5vw, 2rem);
		overflow: hidden;
		background: color-mix(in srgb, white 88%, transparent);
		border: 1px solid $accent-light;
		border-radius: 1rem;
		box-shadow:
			0 0 0 0.4rem color-mix(in srgb, white 45%, transparent),
			0 1rem 3rem color-mix(in srgb, $accent-dark 25%, transparent);
		color: $text;
		font-family: 'Cormorant Garamond Variable', 'Cormorant Garamond', Georgia, serif;
		animation: card-rise 1s 0.2s cubic-bezier(0.2, 0.7, 0.2, 1) both;

		&.reduced {
			animation: fade-in 0.6s 0.2s ease both;
		}
	}

	// arched like the church door (half-circle top on a 10:13 frame)
	.frame {
		flex: none;
		height: min(40dvh, 62vw);
		aspect-ratio: 10 / 13;
		overflow: hidden;
		border: 0.5vmin solid $accent;
		border-radius: 50% 50% 0.4rem 0.4rem / 38.46% 38.46% 0.4rem 0.4rem;
		box-shadow:
			0 0 0 0.4vmin white,
			0 0 0 0.8vmin $accent-light,
			0 0.6rem 1.6rem color-mix(in srgb, $accent-dark 30%, transparent);
		background: $light;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.ornament {
		flex: none;
		width: min(40%, 10rem);
		fill: #c9a24a;
		stroke: #c9a24a;
		stroke-width: 1;
	}

	.text {
		min-height: 0;
		overflow-y: auto;
		width: 100%;

		p {
			margin: 0;
			text-align: center;
			white-space: pre-wrap;
			font-size: clamp(1.25rem, 1.8vmin + 0.9rem, 1.9rem);
			line-height: 1.35;
		}
	}

	canvas {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 12;
		pointer-events: none;
	}

	@keyframes light-burst {
		from {
			clip-path: circle(0% at 50% 50%);
			opacity: 0.6;
		}
		to {
			clip-path: circle(75% at 50% 50%);
			opacity: 1;
		}
	}
	@keyframes card-rise {
		from {
			opacity: 0;
			translate: 0 4dvh;
			scale: 0.96;
		}
		to {
			opacity: 1;
			translate: 0 0;
			scale: 1;
		}
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
