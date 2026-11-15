import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, isPreview, mode }) => {
	const isDev = command === 'serve' && !isPreview;
	// also picks up BASE_PATH from the process environment (e.g. set by CI)
	const { BASE_PATH } = loadEnv(mode, '.', 'BASE_PATH');

	return {
		plugins: [
			sveltekit({
				preprocess: vitePreprocess(),
				adapter: adapter({
					pages: 'build',
					assets: 'build',
					fallback: undefined,
					precompress: false,
					strict: true
				}),
				paths: {
					base: isDev ? '' : (BASE_PATH as '' | `/${string}` | undefined)
				}
			})
		]
	};
});
