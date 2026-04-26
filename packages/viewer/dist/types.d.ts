/**
 * Public types for the Blauw Viewer runtime.
 */
export interface EmbedOptions {
    /** URL to a .glb, .gltf, or (in v2+) .bview file. */
    src: string;
    /** Host element. If omitted, a new div is appended to document.body. */
    container?: HTMLElement;
    /** CSS width value. Default: '100%'. */
    width?: string | number;
    /** CSS height value. Default: responsive 16:10 aspect ratio. */
    height?: string | number;
    /** Begin downloading + rendering immediately (no play-to-load). Default: false. */
    autoStart?: boolean;
    /** Stretch to fill the containing window/iframe. Default: false. */
    fullFrame?: boolean;
    /** URL for the pre-load thumbnail. Default: none. */
    thumbnailURL?: string;
    /** Hide all viewer controls (bare 3D view). Default: false. */
    noUserInterface?: boolean;
    /** Render with a transparent background. Default: false. */
    transparentBackground?: boolean;
    /** Optional display title (shown at top of overlay). */
    title?: string;
    /** Optional "world" label — the project, universe, or collection this scene belongs to. Rendered below the title as "World: <value>". */
    world?: string;
    /** Optional author / credit label (shown below the world line). */
    author?: string;
    /** Auto-rotate the camera when loaded. Default: false. */
    autoRotate?: boolean;
}
/** Internal runtime state. */
export type ViewerState = 'idle' | 'loading' | 'loaded' | 'error';
/** Callbacks an engine reports back to the viewer shell. */
export interface EngineCallbacks {
    onProgress?: (fraction: number) => void;
}
/** Shape of the engine module (lazy-loaded). */
export interface EngineLike {
    load(url: string, onProgress?: (p: number) => void): Promise<void>;
    start(): void;
    stop(): void;
    resetCamera(): void;
    toggleAutoRotate(): boolean;
    destroy(): void;
}
//# sourceMappingURL=types.d.ts.map