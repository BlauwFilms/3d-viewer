/**
 * Shadow-DOM UI construction for the Blauw Viewer.
 *
 * This module has NO Three.js dependency — it's intentionally lightweight
 * so the initial script stub can render the play overlay for any number of
 * viewers on a page without loading the rendering engine.
 */
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
export declare function createUI(shadow: ShadowRoot, options: Required<EmbedOptions>): UIHandles;
//# sourceMappingURL=ui.d.ts.map