# Blauw Viewer Toolkit

Open-source 3D viewer and (eventually) editor for the Blauw Films ecosystem. A streamlined alternative to Marmoset Viewer, designed for minimalist inline embedding in Webflow Rich Text and anywhere else the brand lives.

## What this is

A tiny JavaScript library that turns any `<div class="bview-embed">` on a page into an interactive 3D model viewer. Drop a single `<script type="module">` tag into your site head, then paste a `<div>` wherever a reader should see 3D content.

- **Built on Three.js** — the most mature WebGL library in the ecosystem.
- **Lazy-loaded** — the 3D engine doesn't download until a reader actually presses play.
- **Shadow DOM isolated** — the viewer's internal styles can't conflict with your site, and vice versa.
- **Brand-accurate** — Roboto type, `#f9f9f9`/`#ececec` surfaces, `#1451eb` accents, 1px radius, 300-weight titles.
- **Webflow-native** — designed for one-line install in Custom Code + content-editor-friendly Rich Text embeds.
- **Marmoset-compatible API** — `blauw.embed(url, options)` mirrors the shape of `marmoset.embed(url, options)` so anyone familiar with that tool is instantly productive.

## Status

| Phase | Scope                                                                 | Status     |
| ----- | --------------------------------------------------------------------- | ---------- |
| 1     | Runtime viewer, DOM scanner, Webflow embed, glTF/GLB loading          | ✅ done     |
| 2     | `.bview` file format, CLI packager (`npx @blauwfilms/pack`)           | ⏳ next     |
| 3     | Web editor at `viewer.blauwfilms.com` (client-side, multi-format)     | ⏳ planned  |
| 4     | Draco + KTX2 compression, animation controls, transparency polish     | ⏳ planned  |

## Installing

### For Webflow blog posts (the primary use case)

**Step 1** — add the loader, once, site-wide.

Webflow Dashboard → Project Settings → Custom Code → Head Code. Paste:

```html
<script type="module" src="https://cdn.blauwfilms.com/viewer/v1/blauw.mjs"></script>
```

Save and republish.

**Step 2** — add a viewer to a blog post.

In the Rich Text element, add an "HTML Embed" block wherever the viewer should appear, and paste:

```html
<div
  class="bview-embed"
  data-src="https://uploads-ssl.webflow.com/YOUR_ORG/your_model.glb"
  data-title="Your scene title"
  data-author="Artist name"
></div>
```

The `data-src` URL is the public URL of a `.glb` file you've uploaded to Webflow's Asset Library.

### For developers (anywhere else)

```bash
npm install @blauwfilms/viewer
```

```js
import { embed } from '@blauwfilms/viewer';

embed('https://example.com/model.glb', {
  container: document.getElementById('myContainer'),
  autoRotate: true,
  title: 'My model',
});
```

Or just use the CDN build directly:

```html
<script type="module">
  import { embed } from 'https://cdn.blauwfilms.com/viewer/v1/blauw.mjs';
  embed('model.glb', { autoRotate: true });
</script>
```

## Embed attributes

All optional except `data-src`.

| Attribute           | Type    | Default       | What it does                                                            |
| ------------------- | ------- | ------------- | ----------------------------------------------------------------------- |
| `data-src`          | URL     | *(required)*  | Path to a `.glb` or `.gltf` file.                                       |
| `data-title`        | string  | —             | Display title shown on the play overlay.                                |
| `data-author`       | string  | —             | Author/credit line shown under the title.                               |
| `data-thumbnail`    | URL     | —             | Override image for the play screen.                                     |
| `data-height`       | CSS len | responsive    | Explicit pixel/CSS height. Default is 16:10 responsive.                 |
| `data-width`        | CSS len | `100%`        | Explicit pixel/CSS width.                                               |
| `data-autoplay`     | bool    | `false`       | Start loading immediately — skip the play-to-load gate.                 |
| `data-auto-rotate`  | bool    | `false`       | Slowly orbit the camera once the model is loaded.                       |
| `data-no-ui`        | bool    | `false`       | Hide the control bar. Bare 3D view, no chrome.                          |
| `data-transparent`  | bool    | `false`       | Render with a transparent background instead of the brand `#ececec`.    |
| `data-full-frame`   | bool    | `false`       | Stretch the viewer to fill the containing window/iframe.                |

## Programmatic API

```ts
blauw.embed(url: string, options?: EmbedOptions): WebViewer
blauw.scan(root?: ParentNode): WebViewer[]
blauw.version: string
```

`scan()` is called automatically on `DOMContentLoaded`. Call it again manually if you inject `.bview-embed` divs into the page after that point (for example, from a client-side routing transition).

Each `WebViewer` instance exposes:

- `.start()` — begins loading and rendering.
- `.stop()` — pauses the render loop.
- `.destroy()` — tears down WebGL resources and removes the shadow DOM.
- `.isLoaded` — `true` once the model has rendered at least one frame.

## Architecture

```
Page
 └── <div class="bview-embed">
      └── Shadow Root                    ← full style isolation
           ├── <style>                   ← scoped Blauw brand CSS
           └── .viewer
                └── .frame               ← the bordered box
                     ├── <canvas>        ← 3D surface
                     ├── .overlay        ← thumbnail + play button (idle state)
                     ├── .loader         ← progress bar (loading state)
                     ├── .error          ← friendly error panel (failure state)
                     └── .controls       ← bottom-right control bar (hover-reveal)
```

**The main bundle (`blauw.mjs`) is small** — it contains the DOM scanner, the shadow-DOM UI builder, and the `WebViewer` shell. Three.js is **not** in this bundle.

**The engine chunk** is dynamically imported by `WebViewer.start()` the moment the first reader on the page clicks play. It contains Three.js, `GLTFLoader`, `OrbitControls`, and our rendering code. Once loaded, it's shared across every viewer on the page — the second and third embeds reuse the same Three.js instance.

This means a blog post with three embedded models downloads zero 3D code if nobody interacts with them, and only downloads Three.js once if they do.

## The `.bview` file format (Phase 2)

A zip archive containing:

```
scene.glb              the 3D model (binary glTF 2.0)
manifest.json          camera, lighting, UI config, metadata
thumbnail.jpg          pre-rendered play-screen image
environment.hdr        (optional) custom IBL lighting
```

Files are produced by the web editor (Phase 3) or the CLI packager (Phase 2). The viewer accepts both raw `.glb` files and packaged `.bview` files — using `.bview` just means the scene ships with baked camera positions, pre-rendered thumbnails, and the author's exact lighting choices.

## Developing

This repo is a minimal npm workspaces monorepo.

```bash
# Clone, install
git clone https://github.com/blauwfilms/viewer-toolkit
cd viewer-toolkit
npm install

# Dev server (opens examples/basic.html)
npm run dev

# Production build — emits packages/viewer/dist/blauw.mjs + engine-*.js
npm run build

# Type-check without emitting
npm run typecheck
```

Source layout:

```
packages/viewer/src/
├── index.ts        Main entry (window.blauw + auto-scan)
├── scanner.ts      DOM scanner for .bview-embed elements
├── viewer.ts       WebViewer class (lifecycle, shadow host)
├── ui.ts           Shadow DOM builder + style injection
├── engine.ts       Three.js setup (lazy-loaded chunk)
├── styles.css      Brand-accurate stylesheet for the shadow DOM
└── types.ts        Public EmbedOptions type
```

## Deploying

Tagged releases on the `main` branch trigger a GitHub Actions workflow that:

1. Builds `packages/viewer`
2. Publishes the built `dist/` to the `cdn` branch under a versioned directory
3. The `cdn` branch is served as static content from `cdn.blauwfilms.com` (see `/.github/workflows/deploy.yml`)

Production URL stays stable forever per major version:

- `https://cdn.blauwfilms.com/viewer/v1/blauw.mjs` — latest v1.x
- `https://cdn.blauwfilms.com/viewer/v1.2.3/blauw.mjs` — exact pin

## License

MIT — see LICENSE. Credit is appreciated but not required.

## Credits

Design language from Blauw Films. Engine built on [Three.js](https://threejs.org). API shape inspired by [Marmoset Viewer](https://marmoset.co/toolbag/viewer/).
