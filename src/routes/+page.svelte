<script lang="ts">
	import Confetti from '$lib/Confetti.svelte';
	import { page } from '$app/stores';

	type InvitationsParams = {
		content: string;
		img?: string;
		envelopeColor: string;
		confettiColor?: string;
		song?: string;
		imgPosition?: string;
	};
	const defaultQ: InvitationsParams = {
		content: 'Here could be your text',
		envelopeColor: '#ea899a',
		confettiColor: 'gold'
	};

	const getQueryParams = (): InvitationsParams | undefined => {
		try {
			return JSON.parse(atob($page.url.searchParams.get('q') || '') || 'null');
		} catch (e) {
			// nothing to do
		}
	};

	const q = { ...defaultQ, ...getQueryParams() };
	let open = false;

	document.body.style.setProperty('--envelope-color', q.envelopeColor);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="envlope-wrapper" on:click={() => (open = true)} role="button" tabindex="0">
	{#if q.img}<img style:object-position={q.imgPosition} src={q.img} alt="intro" />{/if}
	{#if open}<Confetti color={q.confettiColor} song={q.song} />{/if}

	<div class="envelope" class:open>
		<div class="front flap"></div>
		<div class="front pocket"></div>
		<div class="letter">
			<p>{q.content}</p>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'sass:math';

	$color-env: var(--envelope-color);
	$color-env2: color-mix(in srgb, $color-env 95%, black);
	$color-flap: color-mix(in srgb, $color-env 80%, black);
	$color-bg: color-mix(in srgb, $color-env 35%, white);

	$env-border-radius: 1vmin;
	$env-width: 96vmin;
	$env-height: 50vmin;
	$heart-width: 50px;

	:global(body) {
		background-color: $color-bg;
		margin: 0;
	}
	.envlope-wrapper {
		display: grid;
		place-items: end center;
		height: calc(100dvh - 2vmin);
		grid-template-rows: auto min-content;
		gap: 2vmin;

		img {
			width: 96vmin;
			height: 100%;
			object-fit: cover;
			overflow: hidden;
		}
	}
	.envelope {
		position: relative;
		width: $env-width;
		height: $env-height;
		border-bottom-left-radius: $env-border-radius;
		border-bottom-right-radius: $env-border-radius;
		background-color: $color-flap;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

		&:not(.open) {
			animation: envelope-shaking 2s infinite;
		}
	}
	.front {
		position: absolute;
		width: 0;
		height: 0;
		z-index: 3;
	}
	.flap {
		border-left: math.div($env-width, 2) solid transparent;
		border-right: math.div($env-width, 2) solid transparent;
		border-bottom: math.div($env-height, 2) - 8 solid transparent; /* a little smaller */
		border-top: math.div($env-height, 2) + 8 solid $color-flap; /* a little larger */
		transform-origin: top;
		pointer-events: none;
		z-index: 5;
	}
	.pocket {
		border-left: math.div($env-width, 2) solid $color-env;
		border-right: math.div($env-width, 2) solid $color-env;
		border-bottom: math.div($env-height, 2) solid $color-env2;
		border-top: math.div($env-height, 2) solid transparent;
		border-bottom-left-radius: $env-border-radius;
		border-bottom-right-radius: $env-border-radius;
	}
	.letter {
		position: relative;
		background-color: #fff;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		padding: 0 1rem;
		max-height: 90%;
		overflow: auto;
		top: 5%;
		border-radius: $env-border-radius;
		box-shadow: 0 2px 26px rgba(0, 0, 0, 0.12);
		z-index: 1;

		p {
			text-align: center;
			white-space: pre-wrap;
			font-size: 1.5rem;
		}
	}

	.open {
		.flap {
			animation: flap-opening 0.4s ease forwards;
		}
		.letter {
			animation: letter-opening 0.4s 0.6s ease forwards;
		}
	}
	@keyframes flap-opening {
		0% {
			transform: rotateX(0deg);
			z-index: 5;
		}
		100% {
			transform: rotateX(180deg);
			z-index: 1;
		}
	}
	@keyframes letter-opening {
		0% {
			translate: 0;
			z-index: 1;
		}
		100% {
			translate: 0 -100%;
			z-index: 2;
			max-height: calc(100dvh - 100% - 2vmin);
		}
	}
	@keyframes envelope-shaking {
		0% {
			rotate: 2deg;
		}
		5% {
			rotate: -2deg;
		}
		10% {
			rotate: 2deg;
		}
		15% {
			rotate: 0deg;
		}
		100% {
			rotate: 0deg;
		}
	}
</style>
