/**
 * Engine — the Three.js side of the viewer.
 *
 * This file is only imported dynamically by WebViewer.start(), which means
 * Vite code-splits it into a separate chunk. A page that embeds three
 * viewers but where nobody clicks play will never download Three.js at all.
 */
export interface EngineOptions {
    transparent: boolean;
    autoRotate: boolean;
}
export declare class Engine {
    private canvas;
    private renderer;
    private scene;
    private camera;
    private controls;
    private mixer?;
    private clock;
    private rafId;
    private running;
    private resizeObserver?;
    private model?;
    private initialCamera?;
    constructor(canvas: HTMLCanvasElement, options: EngineOptions);
    private resize;
    load(url: string, onProgress?: (fraction: number) => void): Promise<void>;
    /** Auto-frame the camera so the whole model is nicely visible. */
    private frameModel;
    start(): void;
    stop(): void;
    resetCamera(): void;
    toggleAutoRotate(): boolean;
    destroy(): void;
}
//# sourceMappingURL=engine.d.ts.map