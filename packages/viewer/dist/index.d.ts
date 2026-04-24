/**
 * Blauw Viewer — main entry point.
 *
 * When built as an IIFE, this file installs a single global:
 *   window.blauw = { embed, scan, WebViewer, version }
 *
 * On DOM ready it auto-scans for `.bview-embed` elements so content editors
 * in Webflow never have to touch JavaScript — they just paste a div into a
 * Rich Text HTML Embed and the one site-wide <script> tag handles the rest.
 */
import { WebViewer } from './viewer';
import { scan } from './scanner';
import type { EmbedOptions } from './types';
export declare const version: string;
/**
 * Programmatic embed — mirrors Marmoset's `marmoset.embed()` shape so the
 * API feels familiar to anyone migrating.
 */
export declare function embed(src: string, options?: Partial<EmbedOptions>): WebViewer;
export { scan, WebViewer };
export type { EmbedOptions } from './types';
//# sourceMappingURL=index.d.ts.map