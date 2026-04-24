const M = ':host{all:initial;display:block;font-family:Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#1a1a1a;box-sizing:border-box;contain:content;width:100%}*,*:before,*:after{box-sizing:border-box}button{font-family:inherit;font-size:inherit;color:inherit;background:transparent;border:0;padding:0;cursor:pointer}svg{display:block}.viewer{position:relative;width:100%;background:#f9f9f9}.frame{position:relative;width:100%;background:#ececec;border:1px solid #dadada;border-radius:1px;overflow:hidden;aspect-ratio:16 / 10}.frame--transparent{background:transparent}.frame--fullscreen{aspect-ratio:auto;border-radius:0;border:0}.canvas{display:block;width:100%;height:100%;touch-action:none;cursor:grab;outline:none}.canvas:active{cursor:grabbing}.title{font-family:Roboto,sans-serif;font-weight:300;font-size:1.5rem;line-height:1.15;letter-spacing:-.01em;color:#1a1a1a;margin:0}.label{font-family:Roboto,sans-serif;font-weight:400;font-size:.8125rem;line-height:1.4;color:#1a1a1a;margin:0}.label--muted{opacity:.6}.overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background-color:#ececec;background-size:cover;background-position:center;background-repeat:no-repeat;cursor:pointer;transition:opacity .28s ease;z-index:2}.overlay--hidden{opacity:0;pointer-events:none}.overlay:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,#0000 45%,#00000047);pointer-events:none}.play{position:relative;z-index:1;width:64px;height:64px;border-radius:50%;background:#1451eb;display:inline-flex;align-items:center;justify-content:center;transition:background .16s ease,transform .16s ease,box-shadow .16s ease;box-shadow:0 8px 24px #1451eb38}.play:hover,.play:focus-visible{background:#112347;transform:scale(1.04);box-shadow:0 10px 28px #11234747;outline:none}.play svg{width:22px;height:22px;fill:#fff;margin-left:3px}.meta{position:absolute;left:20px;right:20px;bottom:18px;z-index:1;color:#fff;pointer-events:none}.meta .title{color:#fff;margin-bottom:2px;text-shadow:0 1px 2px rgba(0,0,0,.25)}.meta .label{color:#fff;opacity:.88;text-shadow:0 1px 2px rgba(0,0,0,.25)}.loader{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#ececec;z-index:1}.loader--visible{display:flex}.loader__bar{width:160px;height:2px;background:#dadada;border-radius:1px;overflow:hidden}.loader__fill{height:100%;width:0;background:#1451eb;transition:width .18s ease}.loader__text{font-family:Roboto,sans-serif;font-weight:400;font-size:.75rem;letter-spacing:.05em;text-transform:uppercase;color:#1a1a1a;opacity:.55}.error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:32px;background:#ececec;text-align:center;z-index:1}.error--visible{display:flex}.error__title{font-family:Roboto,sans-serif;font-weight:400;font-size:.9375rem;color:#1a1a1a;margin:0}.error__detail{font-family:Roboto,sans-serif;font-weight:400;font-size:.8125rem;color:#1a1a1a;opacity:.55;margin:0;max-width:360px}.controls{position:absolute;bottom:10px;right:10px;z-index:3;display:flex;gap:4px;padding:4px;background:#1a1a1ab8;backdrop-filter:blur(14px) saturate(1.1);-webkit-backdrop-filter:blur(14px) saturate(1.1);border-radius:1px;opacity:0;transform:translateY(4px);transition:opacity .18s ease,transform .18s ease;pointer-events:none}.frame:hover .controls,.frame:focus-within .controls,.controls--pinned{opacity:1;transform:translateY(0);pointer-events:auto}.ctrl{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;color:#fff;border-radius:1px;transition:background .14s ease,color .14s ease}.ctrl:hover,.ctrl:focus-visible{background:#ffffff24;outline:none}.ctrl--active{background:#1451eb;color:#fff}.ctrl--active:hover,.ctrl--active:focus-visible{background:#112347}.ctrl svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.button{display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;font-family:Roboto,sans-serif;font-size:.875rem;font-weight:400;line-height:1;color:#fff;background:#1451eb;border-radius:1px;transition:background .15s ease}.button:hover,.button:focus-visible{background:#112347;outline:none}.input{width:100%;padding:10px 12px;font-family:Roboto,sans-serif;font-size:.875rem;color:#1a1a1a;background:#fff;border:1px solid #dadada;border-radius:1px;transition:border-color .14s ease}.input:focus{border-color:#1451eb;outline:none}@media (prefers-reduced-motion: reduce){*,*:before,*:after{transition-duration:1ms!important;animation-duration:1ms!important}}@media (max-width: 520px){.ctrl{width:36px;height:36px}.ctrl svg{width:17px;height:17px}.play{width:58px;height:58px}.play svg{width:20px;height:20px}}', u = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/></svg>',
  rotate: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3L20 4"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 20"/><path d="M4 20v-5h5"/></svg>',
  fullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',
  fullscreenExit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/><path d="M15 20v-5h5"/></svg>'
};
function B(t, e) {
  const n = document.createElement("style");
  n.textContent = M, t.appendChild(n);
  const a = document.createElement("div");
  a.className = "viewer";
  const r = document.createElement("div");
  r.className = "frame", r.setAttribute("tabindex", "0"), r.setAttribute("aria-label", "3D model viewer"), e.transparentBackground && r.classList.add("frame--transparent"), e.height && e.height !== "auto" && (r.style.aspectRatio = "auto", r.style.height = typeof e.height == "number" ? `${e.height}px` : String(e.height));
  const h = document.createElement("canvas");
  h.className = "canvas";
  const o = document.createElement("div");
  o.className = "overlay", e.thumbnailURL && (o.style.backgroundImage = `url("${_(e.thumbnailURL)}")`);
  const l = document.createElement("button");
  if (l.className = "play", l.type = "button", l.setAttribute("aria-label", "Load 3D model"), l.innerHTML = u.play, o.appendChild(l), e.title || e.author) {
    const i = document.createElement("div");
    if (i.className = "meta", e.title) {
      const s = document.createElement("h4");
      s.className = "title", s.textContent = e.title, i.appendChild(s);
    }
    if (e.author) {
      const s = document.createElement("p");
      s.className = "label", s.textContent = e.author, i.appendChild(s);
    }
    o.appendChild(i);
  }
  const c = document.createElement("div");
  c.className = "loader";
  const g = document.createElement("div");
  g.className = "loader__bar";
  const v = document.createElement("div");
  v.className = "loader__fill", g.appendChild(v);
  const x = document.createElement("div");
  x.className = "loader__text", x.textContent = "Loading", c.append(g, x);
  const d = document.createElement("div");
  d.className = "error";
  const w = document.createElement("h4");
  w.className = "error__title";
  const y = document.createElement("p");
  y.className = "error__detail", d.append(w, y);
  let k, f, p;
  if (!e.noUserInterface) {
    const i = document.createElement("div");
    i.className = "controls", k = L(u.reset, "Reset camera"), f = L(u.rotate, "Auto-rotate"), p = L(u.fullscreen, "Fullscreen"), e.autoRotate && f.classList.add("ctrl--active"), i.append(k, f, p), r.appendChild(i);
  }
  return r.append(h, c, d, o), a.appendChild(r), t.appendChild(a), {
    root: a,
    frame: r,
    canvas: h,
    overlay: o,
    playButton: l,
    resetButton: k,
    rotateButton: f,
    fullscreenButton: p,
    preloadThumbnail() {
      if (!e.thumbnailURL) return;
      const i = new Image();
      i.decoding = "async", i.src = e.thumbnailURL;
    },
    showLoader() {
      o.classList.add("overlay--hidden"), c.classList.add("loader--visible"), d.classList.remove("error--visible");
    },
    setProgress(i) {
      const s = Math.max(0, Math.min(1, i)) * 100;
      v.style.width = `${s}%`;
    },
    showCanvas() {
      c.classList.remove("loader--visible"), o.classList.add("overlay--hidden"), d.classList.remove("error--visible");
    },
    showError(i, s) {
      c.classList.remove("loader--visible"), o.classList.add("overlay--hidden"), w.textContent = i, y.textContent = s, d.classList.add("error--visible");
    },
    setRotateActive(i) {
      f?.classList.toggle("ctrl--active", i);
    },
    setFullscreen(i) {
      r.classList.toggle("frame--fullscreen", i), p && (p.innerHTML = i ? u.fullscreenExit : u.fullscreen);
    }
  };
}
function L(t, e) {
  const n = document.createElement("button");
  return n.className = "ctrl", n.type = "button", n.setAttribute("aria-label", e), n.innerHTML = t, n;
}
function _(t) {
  return t.replace(/["\\]/g, "\\$&");
}
class R {
  constructor(e) {
    this.state = "idle", this.engine = null, this.observer = null, this.isLoaded = !1, this.options = z(e), e.container ? this.host = e.container : (this.host = document.createElement("div"), this.host.className = "bview-embed", document.body.appendChild(this.host)), this.options.fullFrame && Object.assign(this.host.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%"
    }), this.host.shadowRoot ? (this.shadow = this.host.shadowRoot, this.shadow.innerHTML = "") : this.shadow = this.host.attachShadow({ mode: "open" }), this.ui = B(this.shadow, this.options), this.bindEvents(), this.options.autoStart ? (this.ui.showLoader(), this.start()) : this.setupLazyPreload();
  }
  // ---------- Public API ----------
  async start() {
    if (!(this.state === "loading" || this.state === "loaded")) {
      this.state = "loading", this.ui.showLoader();
      try {
        const n = (await import("./engine-DVrHkKBG.js")).Engine;
        this.engine = new n(this.ui.canvas, {
          transparent: this.options.transparentBackground,
          autoRotate: this.options.autoRotate
        }), await this.engine.load(this.options.src, (a) => this.ui.setProgress(a)), this.engine.start(), this.state = "loaded", this.isLoaded = !0, this.ui.showCanvas();
      } catch (e) {
        console.error("[blauw] Failed to load viewer:", e), this.state = "error", this.ui.showError(
          "Unable to load 3D content",
          e instanceof Error && e.message ? e.message : "The file could not be retrieved. Please try again later."
        );
      }
    }
  }
  stop() {
    this.engine?.stop();
  }
  destroy() {
    this.observer?.disconnect(), this.engine?.destroy(), this.engine = null, this.fullscreenHandler && document.removeEventListener("fullscreenchange", this.fullscreenHandler), this.shadow.innerHTML = "", this.host.removeAttribute("data-bview-init");
  }
  // ---------- Internals ----------
  bindEvents() {
    this.ui.playButton.addEventListener("click", () => this.start()), this.ui.overlay.addEventListener("click", (e) => {
      e.target !== this.ui.playButton && this.start();
    }), this.ui.resetButton?.addEventListener(
      "click",
      () => this.engine?.resetCamera()
    ), this.ui.rotateButton?.addEventListener("click", () => {
      if (!this.engine) return;
      const e = this.engine.toggleAutoRotate();
      this.ui.setRotateActive(e);
    }), this.ui.fullscreenButton?.addEventListener(
      "click",
      () => this.toggleFullscreen()
    ), this.fullscreenHandler = () => {
      const e = document.fullscreenElement === this.ui.frame || document.fullscreenElement === this.host;
      this.ui.setFullscreen(e);
    }, document.addEventListener("fullscreenchange", this.fullscreenHandler);
  }
  setupLazyPreload() {
    this.options.thumbnailURL && (this.observer = new IntersectionObserver(
      (e) => {
        for (const n of e)
          if (n.isIntersecting) {
            this.ui.preloadThumbnail(), this.observer?.disconnect(), this.observer = null;
            break;
          }
      },
      { rootMargin: "200px" }
    ), this.observer.observe(this.host));
  }
  async toggleFullscreen() {
    try {
      document.fullscreenElement === this.ui.frame || document.fullscreenElement === this.host ? await document.exitFullscreen() : await this.ui.frame.requestFullscreen();
    } catch (e) {
      console.warn("[blauw] Fullscreen rejected:", e);
    }
  }
}
function z(t) {
  return {
    src: t.src,
    container: t.container ?? void 0,
    width: t.width ?? "100%",
    height: t.height ?? "auto",
    autoStart: t.autoStart ?? !1,
    fullFrame: t.fullFrame ?? !1,
    thumbnailURL: t.thumbnailURL ?? "",
    noUserInterface: t.noUserInterface ?? !1,
    transparentBackground: t.transparentBackground ?? !1,
    title: t.title ?? "",
    author: t.author ?? "",
    autoRotate: t.autoRotate ?? !1
  };
}
const E = "data-bview-init", N = `.bview-embed:not([${E}])`;
function C(t = document) {
  const e = t.querySelectorAll(N), n = [];
  return e.forEach((a) => {
    if (!(a instanceof HTMLElement)) return;
    const r = a.getAttribute("data-src");
    if (!r) {
      console.warn(
        "[blauw] .bview-embed is missing data-src attribute; skipping.",
        a
      );
      return;
    }
    const h = {
      src: r,
      container: a,
      width: m(a, "data-width"),
      height: m(a, "data-height"),
      autoStart: b(a, "data-autoplay"),
      fullFrame: b(a, "data-full-frame"),
      thumbnailURL: m(a, "data-thumbnail"),
      noUserInterface: b(a, "data-no-ui"),
      transparentBackground: b(a, "data-transparent"),
      title: m(a, "data-title"),
      author: m(a, "data-author"),
      autoRotate: b(a, "data-auto-rotate")
    };
    a.setAttribute(E, "1");
    try {
      n.push(new R(h));
    } catch (o) {
      console.error("[blauw] Failed to initialise viewer:", o, a), a.removeAttribute(E);
    }
  }), n;
}
function m(t, e) {
  const n = t.getAttribute(e);
  return n === null ? void 0 : n;
}
function b(t, e) {
  const n = t.getAttribute(e);
  return n === null ? !1 : n === "" || n === "true" || n === "1";
}
const F = "0.1.0";
function A(t, e = {}) {
  return new R({ src: t, ...e });
}
if (typeof window < "u") {
  const t = window;
  t.blauw || (t.blauw = {
    embed: A,
    scan: C,
    WebViewer: R,
    version: F
  });
  const e = () => C();
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e, { once: !0 }) : e();
}
export {
  R as WebViewer,
  A as embed,
  C as scan,
  F as version
};
//# sourceMappingURL=blauw.mjs.map
