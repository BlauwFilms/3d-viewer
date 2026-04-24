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

/** Build-time injected via Vite `define`. */
declare const __BLAUW_VERSION__: string;

export const version =
  typeof __BLAUW_VERSION__ !== 'undefined' ? __BLAUW_VERSION__ : '0.0.0-dev';

/**
 * Programmatic embed — mirrors Marmoset's `marmoset.embed()` shape so the
 * API feels familiar to anyone migrating.
 */
export function embed(src: string, options: Partial<EmbedOptions> = {}): WebViewer {
  return new WebViewer({ src, ...options });
}

export { scan, WebViewer };
export type { EmbedOptions } from './types';

// ---------- Auto-install on script load ----------

if (typeof window !== 'undefined') {
  const w = window as unknown as {
    blauw?: unknown;
  };

  // Expose the namespace. Avoid clobbering if the host page happens to
  // define something at `window.blauw` already.
  if (!w.blauw) {
    w.blauw = {
      embed,
      scan,
      WebViewer,
      version,
    };
  }

  const run = () => scan();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    // Script was injected after DOMContentLoaded — scan immediately.
    run();
  }
}
