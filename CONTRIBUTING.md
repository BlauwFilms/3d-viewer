# Contributing & Operations

This document covers two audiences:

- **The Blauw Films team** — how to publish a new 3D viewer embed in a blog post or case study without thinking about code.
- **Developers** — how to work on the viewer source itself, build it, and cut a release.

If you're just here to embed a 3D model in a Webflow post, you only need the first section.

---

## For the Blauw Films editorial team

### Publishing a new 3D embed (4 steps)

**1. Upload the model to Cloudflare R2**

- Log into the Cloudflare dashboard.
- Open the **blauwfilms-3d-assets** bucket (R2 → Object Storage).
- Click **Upload** and select your `.glb` file.
- Recommended filename style: lowercase, hyphens, no spaces — for example `apple-rot-fresh.glb` rather than `Apple Rot Fresh.GLB`. URLs are case-sensitive, so consistency saves headaches.

**2. Copy the public URL**

- Click on the uploaded file in the bucket.
- Find the **Public URL** field.
- It looks like:
  ```
  https://pub-2d5dcf6a304b4a16a2851425c25fd83f.r2.dev/your-filename.glb
  ```
- Copy it. **Verify the URL ends in `.glb`** — the dashboard sometimes truncates display.

**3. Add the embed in Webflow**

- Open the blog post or case study in the Webflow Designer.
- Click into the **Rich Text** element where the viewer should appear.
- Place your cursor at the paragraph break where you want it, click the **+** in the floating toolbar, choose **HTML Embed**.
- Paste this snippet, replacing only the `data-src` URL with what you copied from Cloudflare:

  ```html
  <div
    class="bview-embed"
    data-src="PASTE_R2_URL_HERE"
    data-title="Your scene title"
    data-author="Artist or studio name"
    data-auto-rotate="true"
  ></div>
  ```

- Click **Save & Close**. The embed appears as a placeholder box in the Designer canvas — that's normal. The viewer only renders in Preview mode and on the published page.

**4. Preview, then publish**

- Click the **eye icon** (Preview mode) in the top-right of the Designer.
- Scroll to where you placed the embed and verify the play button works, the model loads, and it looks right.
- Exit Preview, then click **Publish** in the top-right.

That's it. The reader experience: they see a bordered box with a thumbnail and a play button. Clicking play loads the 3D model on demand — readers who don't engage pay zero bandwidth cost.

### Embed options

All optional except `data-src`. Add or remove attributes from the `<div>` as needed.

| Attribute            | What it does                                                              | Default       |
| -------------------- | ------------------------------------------------------------------------- | ------------- |
| `data-src`           | URL to the `.glb` file. **Required.**                                     | —             |
| `data-title`         | Title shown on the play screen.                                           | —             |
| `data-author`        | Credit line shown under the title.                                        | —             |
| `data-auto-rotate`   | `"true"` to slowly rotate the model after loading.                        | `false`       |
| `data-autoplay`      | `"true"` to load immediately (skips the play-to-load gate).               | `false`       |
| `data-no-ui`         | `"true"` to hide the bottom-right control bar.                            | `false`       |
| `data-transparent`   | `"true"` for a transparent background instead of the brand grey `#ececec`. | `false`      |
| `data-height`        | Custom CSS height (e.g. `"480"`, `"30rem"`). Default is responsive 16:10. | responsive    |
| `data-thumbnail`     | URL to a custom thumbnail image for the play screen.                      | —             |

### Asset guidance

- **Format:** `.glb` only. (`.bview` coming in a future phase.)
- **Size:** Under ~25 MB works comfortably. Larger files load slowly on mobile connections. If you have a 50–100 MB model, ask the developer team about Draco/KTX2 compression — it typically reduces file size 5–10× without visible quality loss.
- **Origin:** The model file must live on Cloudflare R2 (or another CORS-enabled host). It cannot be in Webflow's Asset Library — Webflow's library doesn't accept `.glb` files.
- **License:** Make sure you have rights to publish the model publicly. R2 is a public bucket — anything uploaded is reachable by URL.

### When something goes wrong

| Symptom                                              | Likely cause                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| Embed shows a blank box, no play button              | Site-wide loader script missing from Project Settings → Custom Code       |
| Play button shows but loading hangs forever          | The `.glb` URL is wrong, file not uploaded, or 404                        |
| "Unable to load 3D content" with a CORS error        | The R2 bucket's CORS policy is missing the domain you're publishing from  |
| Embed shows raw HTML instead of a viewer             | The `<div>` was pasted into the Rich Text directly instead of an HTML Embed block |
| Model loads but appears black or unlit               | The model has no embedded materials. Re-export from Blender/C4D with PBR materials. |

---

## For developers

### Tech stack

- **Three.js r160** — WebGL rendering engine.
- **TypeScript** — strict mode, full type safety.
- **Vite** — bundler and dev server.
- **GitHub Actions** — CI on every push, automated release on tags.
- **jsDelivr** — public CDN, serves the bundled output directly from this repo.
- **Cloudflare R2** — model file hosting (separate from the code).

### Architecture

- Each `.bview-embed` element on the page becomes a `WebViewer` instance with its own Shadow DOM. Style isolation in both directions.
- The main bundle (`blauw.mjs`, ~15 KB) only contains the DOM scanner, UI builder, and viewer shell. Three.js is **not** in the main bundle.
- Three.js + the rendering code live in a code-split chunk (`engine-[hash].js`, ~750 KB) that downloads only when a reader presses play. After first load, every viewer on the page reuses the same Three.js instance.
- See `README.md` for a more detailed architecture diagram.

### Local development

```bash
git clone https://github.com/BlauwFilms/3d-viewer
cd 3d-viewer
npm install

# Dev server with hot module reloading
npm run dev

# Type-check without building
npm run typecheck

# Production build (emits packages/viewer/dist/)
npm run build
```

The dev server opens `examples/basic.html` automatically. There are also `examples/multiple.html` and `examples/live-demo.html` for testing different configurations.

### Project structure

```
.
├── packages/viewer/            The viewer library (the only package right now)
│   ├── src/
│   │   ├── index.ts            Entry point — installs window.blauw, auto-scans
│   │   ├── scanner.ts          Finds .bview-embed elements, instantiates viewers
│   │   ├── viewer.ts           WebViewer class — lifecycle, shadow host
│   │   ├── ui.ts               Shadow DOM builder, control bar, overlays
│   │   ├── engine.ts           Three.js setup (lazy-loaded chunk)
│   │   ├── styles.css          Brand-accurate stylesheet, scoped to shadow DOM
│   │   └── types.ts            Public EmbedOptions type
│   ├── dist/                   Built bundle (committed; served by jsDelivr)
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
├── examples/                   Local test pages
│   ├── basic.html
│   ├── multiple.html
│   ├── live-demo.html
│   └── webflow-snippet.html    Reference snippet for the editorial team
├── .github/workflows/
│   └── ci.yml                  CI on push, release on tag
├── README.md
├── CONTRIBUTING.md             (this file)
└── LICENSE
```

### Cutting a release

Releases are tag-driven. Tag → CI builds → CI commits the fresh `dist/` back to main → CI re-tags that commit → jsDelivr picks it up automatically.

```bash
# Bump the version in packages/viewer/package.json first (e.g., 0.1.0 → 0.1.1)
# Then commit that change.

git tag v0.1.1
git push origin v0.1.1
```

Watch the run finish at https://github.com/BlauwFilms/3d-viewer/actions.

The CDN URL pattern is:

```
https://cdn.jsdelivr.net/gh/BlauwFilms/3d-viewer@vX.Y.Z/packages/viewer/dist/blauw.mjs
```

After releasing a new version, **manually update the version pin** in Webflow's Project Settings → Custom Code → Head Code. Old blog posts keep working because they reference the old version's URL — jsDelivr serves every tagged version permanently.

### CORS for new origins

If Blauw Films adds a new domain (a sub-brand, a new microsite, a new Webflow project), update the R2 bucket's CORS policy to include it. Cloudflare dashboard → R2 → bucket → Settings → CORS Policy. The current `AllowedOrigins` list already covers `blauwfilms.com`, `www.blauwfilms.com`, `*.webflow.io`, and localhost dev ports.

### Roadmap

- **Phase 2** — `.bview` packaged file format with baked camera, lighting, and thumbnails. CLI packager (`npx @blauwfilms/pack`).
- **Phase 3** — Web editor at `viewer.blauwfilms.com`. Drag-drop multi-format import (FBX/OBJ/3DS/DAE → glTF), visual scene config, one-click export.
- **Phase 4** — Draco mesh compression, KTX2 texture compression, animation controls, transparency polish, custom HDR environments.
- **Phase 5** — Optional custom CDN domain (`cdn.blauwfilms.com`) and assets domain (`models.blauwfilms.com`).

### License

MIT. See `LICENSE` for the full text. Contributions welcome — open an issue or PR on GitHub.
