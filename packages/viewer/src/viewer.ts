/**
 * WebViewer — one instance per embed on the page.
 *
 * Owns its shadow-DOM shell eagerly, but defers Three.js and the actual
 * 3D rendering until the user either presses play or (with autoStart)
 * the viewer scrolls into view.
 */

import { createUI, type UIHandles } from './ui';
import type { EmbedOptions, ViewerState, EngineLike } from './types';

type ResolvedOptions = Required<EmbedOptions>;

export class WebViewer {
  private options: ResolvedOptions;
  private host: HTMLElement;
  private shadow: ShadowRoot;
  private ui: UIHandles;
  private state: ViewerState = 'idle';
  private engine: EngineLike | null = null;
  private observer: IntersectionObserver | null = null;
  private fullscreenHandler?: () => void;

  /** Becomes true once the engine has successfully loaded the model. */
  public isLoaded = false;

  constructor(options: EmbedOptions) {
    this.options = resolveOptions(options);

    // Either use the provided container or create a detached one for
    // programmatic embed() calls.
    if (options.container) {
      this.host = options.container;
    } else {
      this.host = document.createElement('div');
      this.host.className = 'bview-embed';
      document.body.appendChild(this.host);
    }

    // Honour fullFrame mode on the host element itself so the surrounding
    // document doesn't fight our sizing.
    if (this.options.fullFrame) {
      Object.assign(this.host.style, {
        position: 'fixed',
        inset: '0',
        width: '100%',
        height: '100%',
      });
    }

    // Guard against double-initialisation if scan() is called twice.
    if (this.host.shadowRoot) {
      this.shadow = this.host.shadowRoot;
      this.shadow.innerHTML = '';
    } else {
      this.shadow = this.host.attachShadow({ mode: 'open' });
    }

    this.ui = createUI(this.shadow, this.options);
    this.bindEvents();

    if (this.options.autoStart) {
      // Start immediately — don't even show the play overlay.
      this.ui.showLoader();
      this.start();
    } else {
      this.setupLazyPreload();
    }
  }

  // ---------- Public API ----------

  public async start(): Promise<void> {
    if (this.state === 'loading' || this.state === 'loaded') return;

    this.state = 'loading';
    this.ui.showLoader();

    try {
      // Dynamic import — Vite code-splits this, so Three.js only loads
      // when a user actually engages with a viewer on the page.
      const mod = await import('./engine');
      const EngineCtor = mod.Engine;

      this.engine = new EngineCtor(this.ui.canvas, {
        transparent: this.options.transparentBackground,
        autoRotate: this.options.autoRotate,
      });

      await this.engine.load(this.options.src, (p) => this.ui.setProgress(p));
      this.engine.start();

      this.state = 'loaded';
      this.isLoaded = true;
      this.ui.showCanvas();
    } catch (err) {
      console.error('[blauw] Failed to load viewer:', err);
      this.state = 'error';
      this.ui.showError(
        'Unable to load 3D content',
        err instanceof Error && err.message
          ? err.message
          : 'The file could not be retrieved. Please try again later.',
      );
    }
  }

  public stop(): void {
    this.engine?.stop();
  }

  public destroy(): void {
    this.observer?.disconnect();
    this.engine?.destroy();
    this.engine = null;
    if (this.fullscreenHandler) {
      document.removeEventListener('fullscreenchange', this.fullscreenHandler);
      document.removeEventListener('webkitfullscreenchange', this.fullscreenHandler);
    }
    this.shadow.innerHTML = '';
    this.host.removeAttribute('data-bview-init');
  }

  // ---------- Internals ----------

  private bindEvents(): void {
    this.ui.playButton.addEventListener('click', () => this.start());

    // The whole overlay is a secondary click target for convenience.
    this.ui.overlay.addEventListener('click', (e) => {
      if (e.target === this.ui.playButton) return;
      this.start();
    });

    this.ui.resetButton?.addEventListener('click', () =>
      this.engine?.resetCamera(),
    );
    this.ui.rotateButton?.addEventListener('click', () => {
      if (!this.engine) return;
      const on = this.engine.toggleAutoRotate();
      this.ui.setRotateActive(on);
    });
    this.ui.fullscreenButton?.addEventListener('click', () =>
      this.toggleFullscreen(),
    );

    // Keep the fullscreen icon state in sync when the user hits Esc.
    // Browsers may report either the shadow host or the frame element as
    // the active fullscreen element; we accept either. iOS/iPad Safari uses
    // the webkit-prefixed event and property.
    this.fullscreenHandler = () => {
      const doc = document as Document & {
        webkitFullscreenElement?: Element | null;
      };
      const active = doc.fullscreenElement || doc.webkitFullscreenElement;
      const isFs = active === this.ui.frame || active === this.host;
      this.ui.setFullscreen(isFs);
    };
    document.addEventListener('fullscreenchange', this.fullscreenHandler);
    document.addEventListener('webkitfullscreenchange', this.fullscreenHandler);
  }

  private setupLazyPreload(): void {
    // We don't start the engine here; we just preload the thumbnail image
    // so the play overlay looks crisp the moment it scrolls into view.
    if (!this.options.thumbnailURL) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.ui.preloadThumbnail();
            this.observer?.disconnect();
            this.observer = null;
            break;
          }
        }
      },
      { rootMargin: '200px' },
    );
    this.observer.observe(this.host);
  }

  private async toggleFullscreen(): Promise<void> {
    const frame = this.ui.frame as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };
    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void> | void;
    };

    const isCurrentlyFullscreen =
      doc.fullscreenElement === frame || doc.webkitFullscreenElement === frame;

    try {
      if (isCurrentlyFullscreen) {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
      } else {
        if (frame.requestFullscreen) {
          await frame.requestFullscreen();
        } else if (frame.webkitRequestFullscreen) {
          await frame.webkitRequestFullscreen();
        }
      }
    } catch (err) {
      console.warn('[blauw] Fullscreen rejected:', err);
    }
  }
}

// ---------- Helpers ----------

function resolveOptions(o: EmbedOptions): ResolvedOptions {
  return {
    src: o.src,
    container: o.container ?? (undefined as unknown as HTMLElement),
    width: o.width ?? '100%',
    height: o.height ?? 'auto',
    autoStart: o.autoStart ?? false,
    fullFrame: o.fullFrame ?? false,
    thumbnailURL: o.thumbnailURL ?? '',
    noUserInterface: o.noUserInterface ?? false,
    transparentBackground: o.transparentBackground ?? false,
    title: o.title ?? '',
    world: o.world ?? '',
    author: o.author ?? '',
    autoRotate: o.autoRotate ?? false,
  };
}
