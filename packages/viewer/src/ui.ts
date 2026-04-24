/**
 * Shadow-DOM UI construction for the Blauw Viewer.
 *
 * This module has NO Three.js dependency — it's intentionally lightweight
 * so the initial script stub can render the play overlay for any number of
 * viewers on a page without loading the rendering engine.
 */

// Vite transforms `?inline` imports into a raw string at build time.
// @ts-ignore — ?inline query is a Vite feature
import stylesCss from './styles.css?inline';
import type { EmbedOptions } from './types';

/** Handles returned to the viewer core for imperative control. */
export interface UIHandles {
  root: HTMLDivElement;
  frame: HTMLDivElement;
  canvas: HTMLCanvasElement;
  overlay: HTMLDivElement;
  playButton: HTMLButtonElement;
  resetButton?: HTMLButtonElement;
  rotateButton?: HTMLButtonElement;
  fullscreenButton?: HTMLButtonElement;
  preloadThumbnail(): void;
  showLoader(): void;
  setProgress(fraction: number): void;
  showCanvas(): void;
  showError(title: string, detail: string): void;
  setRotateActive(on: boolean): void;
  setFullscreen(on: boolean): void;
}

// Minimal SVG icon set — inlined so we ship zero additional network requests.
const ICONS = {
  play:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  reset:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/></svg>',
  rotate:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3L20 4"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 20"/><path d="M4 20v-5h5"/></svg>',
  fullscreen:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',
  fullscreenExit:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/><path d="M15 20v-5h5"/></svg>',
};

export function createUI(
  shadow: ShadowRoot,
  options: Required<EmbedOptions>,
): UIHandles {
  // Inject scoped stylesheet
  const style = document.createElement('style');
  style.textContent = stylesCss;
  shadow.appendChild(style);

  // Root
  const root = document.createElement('div');
  root.className = 'viewer';

  // Frame (the bordered box)
  const frame = document.createElement('div');
  frame.className = 'frame';
  frame.setAttribute('tabindex', '0');
  frame.setAttribute('aria-label', '3D model viewer');

  if (options.transparentBackground) {
    frame.classList.add('frame--transparent');
  }

  // If a height was specified, honour it exactly; otherwise keep 16:10 aspect.
  if (options.height && options.height !== 'auto') {
    frame.style.aspectRatio = 'auto';
    frame.style.height =
      typeof options.height === 'number'
        ? `${options.height}px`
        : String(options.height);
  }

  // Canvas (the 3D surface)
  const canvas = document.createElement('canvas');
  canvas.className = 'canvas';

  // Overlay (thumbnail + play button)
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  if (options.thumbnailURL) {
    overlay.style.backgroundImage = `url("${escapeCssUrl(options.thumbnailURL)}")`;
  }

  const playButton = document.createElement('button');
  playButton.className = 'play';
  playButton.type = 'button';
  playButton.setAttribute('aria-label', 'Load 3D model');
  playButton.innerHTML = ICONS.play;
  overlay.appendChild(playButton);

  if (options.title || options.author) {
    const meta = document.createElement('div');
    meta.className = 'meta';
    if (options.title) {
      const h = document.createElement('h4');
      h.className = 'title';
      h.textContent = options.title;
      meta.appendChild(h);
    }
    if (options.author) {
      const p = document.createElement('p');
      p.className = 'label';
      p.textContent = options.author;
      meta.appendChild(p);
    }
    overlay.appendChild(meta);
  }

  // Loader
  const loader = document.createElement('div');
  loader.className = 'loader';
  const loaderBar = document.createElement('div');
  loaderBar.className = 'loader__bar';
  const loaderFill = document.createElement('div');
  loaderFill.className = 'loader__fill';
  loaderBar.appendChild(loaderFill);
  const loaderText = document.createElement('div');
  loaderText.className = 'loader__text';
  loaderText.textContent = 'Loading';
  loader.append(loaderBar, loaderText);

  // Error panel
  const errorBox = document.createElement('div');
  errorBox.className = 'error';
  const errorTitle = document.createElement('h4');
  errorTitle.className = 'error__title';
  const errorDetail = document.createElement('p');
  errorDetail.className = 'error__detail';
  errorBox.append(errorTitle, errorDetail);

  // Controls (bottom-right bar) — skipped entirely in noUserInterface mode
  let resetButton: HTMLButtonElement | undefined;
  let rotateButton: HTMLButtonElement | undefined;
  let fullscreenButton: HTMLButtonElement | undefined;

  if (!options.noUserInterface) {
    const controls = document.createElement('div');
    controls.className = 'controls';

    resetButton = makeCtrl(ICONS.reset, 'Reset camera');
    rotateButton = makeCtrl(ICONS.rotate, 'Auto-rotate');
    fullscreenButton = makeCtrl(ICONS.fullscreen, 'Fullscreen');

    if (options.autoRotate) rotateButton.classList.add('ctrl--active');

    controls.append(resetButton, rotateButton, fullscreenButton);
    frame.appendChild(controls);
  }

  // Canvas sits beneath overlay/loader/error so they can cover it cleanly.
  frame.append(canvas, loader, errorBox, overlay);
  root.appendChild(frame);
  shadow.appendChild(root);

  return {
    root,
    frame,
    canvas,
    overlay,
    playButton,
    resetButton,
    rotateButton,
    fullscreenButton,

    preloadThumbnail() {
      if (!options.thumbnailURL) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = options.thumbnailURL;
    },

    showLoader() {
      overlay.classList.add('overlay--hidden');
      loader.classList.add('loader--visible');
      errorBox.classList.remove('error--visible');
    },

    setProgress(fraction: number) {
      const pct = Math.max(0, Math.min(1, fraction)) * 100;
      loaderFill.style.width = `${pct}%`;
    },

    showCanvas() {
      loader.classList.remove('loader--visible');
      overlay.classList.add('overlay--hidden');
      errorBox.classList.remove('error--visible');
    },

    showError(titleText, detailText) {
      loader.classList.remove('loader--visible');
      overlay.classList.add('overlay--hidden');
      errorTitle.textContent = titleText;
      errorDetail.textContent = detailText;
      errorBox.classList.add('error--visible');
    },

    setRotateActive(on) {
      rotateButton?.classList.toggle('ctrl--active', on);
    },

    setFullscreen(on) {
      frame.classList.toggle('frame--fullscreen', on);
      if (fullscreenButton) {
        fullscreenButton.innerHTML = on ? ICONS.fullscreenExit : ICONS.fullscreen;
      }
    },
  };
}

function makeCtrl(svgMarkup: string, label: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'ctrl';
  btn.type = 'button';
  btn.setAttribute('aria-label', label);
  btn.innerHTML = svgMarkup;
  return btn;
}

// Defend against quotes in thumbnail URLs breaking the CSS declaration.
function escapeCssUrl(url: string): string {
  return url.replace(/["\\]/g, '\\$&');
}
