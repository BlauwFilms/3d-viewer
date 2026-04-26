/**
 * DOM scanner — the entry point that makes inline Webflow embeds work.
 *
 * Content editors paste:
 *   <div class="bview-embed" data-src="https://.../scene.glb"></div>
 * anywhere on the page (inside a Rich Text HTML Embed, for example), and
 * this scanner upgrades each one into a live WebViewer.
 */

import { WebViewer } from './viewer';
import type { EmbedOptions } from './types';

const INIT_FLAG = 'data-bview-init';
const SELECTOR = `.bview-embed:not([${INIT_FLAG}])`;

/**
 * Scan a DOM root (default: the whole document) for .bview-embed elements
 * and instantiate a viewer for each one it hasn't seen before. Safe to
 * call repeatedly — already-upgraded elements are skipped.
 */
export function scan(root: ParentNode = document): WebViewer[] {
  const elements = root.querySelectorAll(SELECTOR);
  const viewers: WebViewer[] = [];

  elements.forEach((el) => {
    if (!(el instanceof HTMLElement)) return;

    const src = el.getAttribute('data-src');
    if (!src) {
      console.warn(
        '[blauw] .bview-embed is missing data-src attribute; skipping.',
        el,
      );
      return;
    }

    const options: EmbedOptions = {
      src,
      container: el,
      width: attr(el, 'data-width'),
      height: attr(el, 'data-height'),
      autoStart: bool(el, 'data-autoplay'),
      fullFrame: bool(el, 'data-full-frame'),
      thumbnailURL: attr(el, 'data-thumbnail'),
      noUserInterface: bool(el, 'data-no-ui'),
      transparentBackground: bool(el, 'data-transparent'),
      title: attr(el, 'data-title'),
      world: attr(el, 'data-world'),
      author: attr(el, 'data-author'),
      autoRotate: bool(el, 'data-auto-rotate'),
    };

    // Mark the element so repeat scans skip it.
    el.setAttribute(INIT_FLAG, '1');

    try {
      viewers.push(new WebViewer(options));
    } catch (err) {
      console.error('[blauw] Failed to initialise viewer:', err, el);
      el.removeAttribute(INIT_FLAG);
    }
  });

  return viewers;
}

// ---------- helpers ----------

function attr(el: HTMLElement, name: string): string | undefined {
  const v = el.getAttribute(name);
  return v === null ? undefined : v;
}

function bool(el: HTMLElement, name: string): boolean {
  const v = el.getAttribute(name);
  if (v === null) return false;
  return v === '' || v === 'true' || v === '1';
}
