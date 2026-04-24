/**
 * DOM scanner — the entry point that makes inline Webflow embeds work.
 *
 * Content editors paste:
 *   <div class="bview-embed" data-src="https://.../scene.glb"></div>
 * anywhere on the page (inside a Rich Text HTML Embed, for example), and
 * this scanner upgrades each one into a live WebViewer.
 */
import { WebViewer } from './viewer';
/**
 * Scan a DOM root (default: the whole document) for .bview-embed elements
 * and instantiate a viewer for each one it hasn't seen before. Safe to
 * call repeatedly — already-upgraded elements are skipped.
 */
export declare function scan(root?: ParentNode): WebViewer[];
//# sourceMappingURL=scanner.d.ts.map