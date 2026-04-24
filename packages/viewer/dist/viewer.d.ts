/**
 * WebViewer — one instance per embed on the page.
 *
 * Owns its shadow-DOM shell eagerly, but defers Three.js and the actual
 * 3D rendering until the user either presses play or (with autoStart)
 * the viewer scrolls into view.
 */
import type { EmbedOptions } from './types';
export declare class WebViewer {
    private options;
    private host;
    private shadow;
    private ui;
    private state;
    private engine;
    private observer;
    private fullscreenHandler?;
    /** Becomes true once the engine has successfully loaded the model. */
    isLoaded: boolean;
    constructor(options: EmbedOptions);
    start(): Promise<void>;
    stop(): void;
    destroy(): void;
    private bindEvents;
    private setupLazyPreload;
    private toggleFullscreen;
}
//# sourceMappingURL=viewer.d.ts.map