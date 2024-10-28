import prettier from 'eslint-plugin-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
	{
		ignores: ['node_modules', 'build/', '.svelte-kit/', 'dist/']
	},
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	// prettier,
	...svelte.configs['flat/prettier'],
	{
		files: ['**/*.{js,ts,svelte}'],
		plugins: {
			prettier
		},
		rules: {
			'prettier/prettier': 'warn'
		}
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	}
);
