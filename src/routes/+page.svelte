<script lang="ts">
	import { page } from '$app/state';
	import { getTheme } from '../lib/params';
	import Envelope from '#lib/envelope/Envelope.svelte';
	import Church from '#lib/church/Church.svelte';

	const theme = getTheme(page.url);
</script>

{#if theme === 'c'}<Church />{:else}<Envelope />{/if}
