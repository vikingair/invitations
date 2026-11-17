export type Phase = 'idle' | 'zooming' | 'opening' | 'revealed';

/**
 * Ornament icon on the invitation card: `c` = cross, `i` = ivy, `p` = pigeon (white dove), `a` = ark.
 */
export type OrnamentIcon = 'c' | 'i' | 'p' | 'a';
export const ORNAMENT_ICONS: readonly OrnamentIcon[] = ['c', 'i', 'p', 'a'];
