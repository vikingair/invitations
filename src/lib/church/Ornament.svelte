<script lang="ts">
	import type { OrnamentIcon } from './types';

	type Props = { icon: OrnamentIcon };

	const { icon }: Props = $props();

	// three-lobed ivy leaf pointing up; base at (0, 0), tip at (0, -11)
	const ivyLeaf =
		'M0 -1 Q-3 1.5 -5 0 Q-8 -2 -7 -5 Q-4 -5 -3.5 -6.5 Q-2 -10 0 -11 Q2 -10 3.5 -6.5 Q4 -5 7 -5 Q8 -2 5 0 Q3 1.5 0 -1 Z';
	const ivyVeins = 'M0 -1 V-9 M0 -2 L-5 -3 M0 -2 L5 -3';

	// dove and ark are wider than the cross, so the rules leave more space for them
	// outermost band first
	const rainbow = [
		{ r: 11.6, color: '#e57373' },
		{ r: 10.7, color: '#ffb74d' },
		{ r: 9.8, color: '#81c784' },
		{ r: 8.9, color: '#64b5f6' }
	];

	const ruleGap = $derived(icon === 'p' || icon === 'a' ? [43, 77] : [48, 72]);
</script>

{#snippet leaf(transform: string)}
	<g {transform}>
		<path class="leaf" d={ivyLeaf} />
		<path class="vein" d={ivyVeins} />
	</g>
{/snippet}

{#snippet vine()}
	<path class="stem" d="M4 10 Q12 7 20 10 T36 10 T52 10" />
	{@render leaf('translate(14 8.6) rotate(-60) scale(0.45)')}
	{@render leaf('translate(28 11.2) rotate(120) scale(0.45)')}
	{@render leaf('translate(44 8.6) rotate(-60) scale(0.5)')}
{/snippet}

<svg class="ornament {icon}" viewBox="0 0 120 20" aria-hidden="true">
	{#if icon === 'i'}
		{@render vine()}
		<g transform="matrix(-1 0 0 1 120 0)">{@render vine()}</g>
		{@render leaf('translate(60 16.5)')}
	{:else}
		<line class="rule" x1="4" y1="10" x2={ruleGap[0]} y2="10" />
		<line class="rule" x1={ruleGap[1]} y1="10" x2="116" y2="10" />
		{#if icon === 'p'}
			<!-- drawn on a 100 x 62 grid, scaled down into the centre -->
			<g class="dove" transform="translate(45.4 1.2) scale(0.28)">
				<path class="far-wing" d="M64 36 C68 22 66 10 58 0 C58 12 54 22 56 34 Z" />
				<path d="M24 52 L4 44 L9 51 L2 56 L10 59 L4 64 L24 58 Z" />
				<path
					d="M22 52 C35 44 50 40 62 38 C66 30 72 24 80 24 C86 24 89 28 89 32 L96 34 L89 36 C87 44 80 50 70 54 C58 60 40 62 22 58 Z"
				/>
				<path
					d="M60 40 C62 22 50 8 30 2 L34 10 L26 12 L33 20 L26 22 L35 29 L30 32 L40 37 L36 40 L44 46 Z"
				/>
				<circle class="eye" cx="82" cy="29.5" r="2" />
				<path class="branch" d="M93 35 Q99 40 101 50" />
				<ellipse
					class="olive-leaf"
					cx="99"
					cy="38.5"
					rx="4"
					ry="1.8"
					transform="rotate(30 99 38.5)"
				/>
				<ellipse class="olive-leaf" cx="96" cy="44" rx="4" ry="1.8" transform="rotate(-50 96 44)" />
				<ellipse
					class="olive-leaf"
					cx="104"
					cy="47"
					rx="4"
					ry="1.8"
					transform="rotate(60 104 47)"
				/>
			</g>
		{:else if icon === 'a'}
			<!-- rainbow behind the ark, its arcs end at the deck (y 12.6) -->
			<g class="rainbow">
				{#each rainbow as { r, color } (r)}
					<path d="M{60 - r} 12.6 A{r} {r} 0 0 1 {60 + r} 12.6" stroke={color} />
				{/each}
			</g>
			<!-- shrunk towards the bottom centre to make room for the rainbow -->
			<g class="ark" transform="translate(60 19) scale(0.8) translate(-60 -19)">
				<path class="waves" d="M46 18 q2 -1.4 4 0 t4 0 t4 0 t4 0 t4 0 t4 0 t4 0" />
				<path class="hull" d="M46 11 L74 11 L70.5 16.5 Q60 18 49.5 16.5 Z" />
				<line class="plank" x1="48" y1="13.6" x2="72" y2="13.6" />
				<rect class="cabin" x="52" y="6.5" width="16" height="4.5" />
				<polygon class="roof" points="50.5,6.5 60,2.5 69.5,6.5" />
				{#each [54.5, 59, 63.5] as x (x)}
					<rect class="window" {x} y="7.9" width="2" height="1.7" rx="0.3" />
				{/each}
			</g>
		{:else}
			<g class="cross">
				<rect x="58" y="3" width="4" height="14" rx="1" />
				<rect x="53" y="7" width="14" height="4" rx="1" />
			</g>
		{/if}
	{/if}
</svg>

<style lang="scss">
	$gold: #c9a24a;
	$ivy: #5f8a4a;
	$ivy-dark: #3f6334;

	.ornament {
		flex: none;
		width: min(40%, 10rem);
	}

	.rule {
		stroke: $gold;
		stroke-width: 1;
	}

	.cross {
		fill: $gold;
	}

	.stem {
		fill: none;
		stroke: $ivy-dark;
		stroke-width: 0.9;
		stroke-linecap: round;
	}
	.leaf {
		fill: $ivy;
		stroke: $ivy-dark;
		stroke-width: 0.6;
		stroke-linejoin: round;
	}
	.vein {
		fill: none;
		stroke: color-mix(in srgb, $ivy 50%, white);
		stroke-width: 0.5;
		stroke-linecap: round;
	}

	.rainbow {
		fill: none;
		stroke-width: 0.9;
		opacity: 0.85;
	}

	// stroke widths in the ark's own (scaled by 0.8) units
	.ark {
		stroke: #222;
		stroke-width: 0.75;
		stroke-linejoin: round;
		stroke-linecap: round;

		.waves {
			fill: none;
			stroke: #5b8fc7;
			stroke-width: 1;
		}
		.hull {
			fill: #a0703f;
		}
		.plank {
			stroke-width: 0.5;
		}
		.cabin {
			fill: #c99a63;
		}
		.roof {
			fill: #7a4b2a;
		}
		.window {
			fill: #222;
			stroke: none;
		}
	}

	.dove {
		fill: white;
		stroke: #222;
		// in the dove's own (scaled) units
		stroke-width: 2.4;
		stroke-linejoin: round;
		stroke-linecap: round;

		.far-wing {
			fill: #f2f2f2;
		}
		.eye {
			fill: #222;
			stroke: none;
		}
		.branch {
			fill: none;
			stroke-width: 1.8;
		}
		.olive-leaf {
			fill: #8a9a5b;
			stroke-width: 1.4;
		}
	}
</style>
