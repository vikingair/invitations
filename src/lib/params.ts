export type Theme = 'e' | 'c';

/** Accepts both `URL` and the read-only `page.url` of SvelteKit. */
type UrlLike = { readonly searchParams: Pick<URLSearchParams, 'get'> };

/** Reads the top-level `t` search param. Missing or unknown values fall back to the envelope. */
export const getTheme = (url: UrlLike): Theme => (url.searchParams.get('t') === 'c' ? 'c' : 'e');

/**
 * Decodes base64 as UTF-8 (needed for non-Latin-1 text like umlauts). Falls back to the plain
 * `atob` result, so links created with a plain `btoa` keep working.
 */
const decodeBase64 = (value: string): string => {
	// "+" turns into a space when the param was not URI-encoded
	const binary = atob(value.replace(/ /g, '+'));
	try {
		const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
		return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
	} catch {
		return binary;
	}
};

/** Reads the `q` search param, which contains `base64(JSON)` encoded options. */
export const getQueryParams = <T extends object>(url: UrlLike): Partial<T> => {
	try {
		const raw = url.searchParams.get('q');
		if (!raw) return {};
		const parsed: unknown = JSON.parse(decodeBase64(raw));
		if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed as Partial<T>;
	} catch {
		// nothing to do
	}
	return {};
};
