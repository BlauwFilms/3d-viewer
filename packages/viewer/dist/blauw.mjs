const _ = ':host{all:initial;display:block;font-family:Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#1a1a1a;box-sizing:border-box;contain:content;width:100%}*,*:before,*:after{box-sizing:border-box}button{font-family:inherit;font-size:inherit;color:inherit;background:transparent;border:0;padding:0;cursor:pointer}svg{display:block}.viewer{position:relative;width:100%;background:#f9f9f9}.frame{position:relative;width:100%;background:#ececec;border:1px solid #dadada;border-radius:1px;overflow:hidden;aspect-ratio:16 / 10}.frame--transparent{background:transparent}.frame--fullscreen{aspect-ratio:auto;border-radius:0;border:0}.canvas{display:block;width:100%;height:100%;touch-action:none;cursor:grab;outline:none}.canvas:active{cursor:grabbing}.title{font-family:Roboto,sans-serif;font-weight:300;font-size:1.5rem;line-height:1.15;letter-spacing:-.01em;color:#1a1a1a;margin:0}.label{font-family:Roboto,sans-serif;font-weight:400;font-size:.8125rem;line-height:1.4;color:#1a1a1a;margin:0}.label--muted{opacity:.6}.overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:28px 24px;background-color:#ececec;background-size:cover;background-position:center;background-repeat:no-repeat;cursor:pointer;transition:opacity .28s ease;z-index:2}.overlay--hidden{opacity:0;pointer-events:none}.overlay:before{content:"";position:absolute;inset:0 0 auto;height:40%;background:linear-gradient(180deg,#00000026,#0000);pointer-events:none}.overlay:after{content:"";position:absolute;inset:auto 0 0;height:30%;background:linear-gradient(180deg,#0000,#00000026);pointer-events:none}.meta{position:relative;z-index:1;color:#fff;text-align:center;pointer-events:none;display:flex;flex-direction:column;gap:4px;max-width:90%}.meta .title,.meta .label{color:#fff;margin:0;text-shadow:0 1px 2px rgba(0,0,0,.35)}.meta .label--world .label__prefix{opacity:.7}.meta .label--author{opacity:.85;margin-top:2px}.play{position:relative;z-index:1;width:64px;height:64px;border-radius:50%;background:#1451eb;display:inline-flex;align-items:center;justify-content:center;transition:background .16s ease,transform .16s ease,box-shadow .16s ease;box-shadow:0 8px 24px #1451eb38}.play:hover,.play:focus-visible{background:#112347;transform:scale(1.04);box-shadow:0 10px 28px #11234747;outline:none}.play svg{width:22px;height:22px;fill:#fff;margin-left:3px}.cta{position:relative;z-index:1;margin:0;font-family:Roboto,sans-serif;font-weight:400;font-size:.8125rem;letter-spacing:.04em;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.35);pointer-events:none}.overlay:not(:has(.meta)) .play{margin-top:auto}.overlay:not(:has(.cta)) .play{margin-bottom:auto}.loader{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#ececec;z-index:1}.loader--visible{display:flex}.loader__bar{width:160px;height:2px;background:#dadada;border-radius:1px;overflow:hidden}.loader__fill{height:100%;width:0;background:#1451eb;transition:width .18s ease}.loader__text{font-family:Roboto,sans-serif;font-weight:400;font-size:.75rem;letter-spacing:.05em;text-transform:uppercase;color:#1a1a1a;opacity:.55}.error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:32px;background:#ececec;text-align:center;z-index:1}.error--visible{display:flex}.error__title{font-family:Roboto,sans-serif;font-weight:400;font-size:.9375rem;color:#1a1a1a;margin:0}.error__detail{font-family:Roboto,sans-serif;font-weight:400;font-size:.8125rem;color:#1a1a1a;opacity:.55;margin:0;max-width:360px}.controls{position:absolute;bottom:10px;right:10px;z-index:3;display:flex;gap:4px;padding:4px;background:#1a1a1ab8;backdrop-filter:blur(14px) saturate(1.1);-webkit-backdrop-filter:blur(14px) saturate(1.1);border-radius:1px;opacity:0;transform:translateY(4px);transition:opacity .18s ease,transform .18s ease;pointer-events:none}.frame:hover .controls,.frame:focus-within .controls,.controls--pinned{opacity:1;transform:translateY(0);pointer-events:auto}.ctrl{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;color:#fff;border-radius:1px;transition:background .14s ease,color .14s ease}.ctrl:hover,.ctrl:focus-visible{background:#ffffff24;outline:none}.ctrl--active{background:#1451eb;color:#fff}.ctrl--active:hover,.ctrl--active:focus-visible{background:#112347}.ctrl svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.button{display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;font-family:Roboto,sans-serif;font-size:.875rem;font-weight:400;line-height:1;color:#fff;background:#1451eb;border-radius:1px;transition:background .15s ease}.button:hover,.button:focus-visible{background:#112347;outline:none}.input{width:100%;padding:10px 12px;font-family:Roboto,sans-serif;font-size:.875rem;color:#1a1a1a;background:#fff;border:1px solid #dadada;border-radius:1px;transition:border-color .14s ease}.input:focus{border-color:#1451eb;outline:none}@media (prefers-reduced-motion: reduce){*,*:before,*:after{transition-duration:1ms!important;animation-duration:1ms!important}}@media (max-width: 767px){.ctrl--fullscreen{display:none}}@media (max-width: 520px){.ctrl{width:36px;height:36px}.ctrl svg{width:17px;height:17px}.play{width:58px;height:58px}.play svg{width:20px;height:20px}.overlay{padding:22px 18px}.meta .title{font-size:1.25rem}.meta .label,.cta{font-size:.75rem}}', h = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  reset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/></svg>',
  rotate: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3L20 4"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 20"/><path d="M4 20v-5h5"/></svg>',
  fullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',
  fullscreenExit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/><path d="M15 20v-5h5"/></svg>'
};
function z(a, e) {
  const t = document.createElement("style");
  t.textContent = _, a.appendChild(t);
  const n = document.createElement("div");
  n.className = "viewer";
  const r = document.createElement("div");
  r.className = "frame", r.setAttribute("tabindex", "0"), r.setAttribute("aria-label", "3D model viewer"), e.transparentBackground && r.classList.add("frame--transparent"), e.height && e.height !== "auto" && (r.style.aspectRatio = "auto", r.style.height = typeof e.height == "number" ? `${e.height}px` : String(e.height));
  const p = document.createElement("canvas");
  p.className = "canvas";
  const s = document.createElement("div");
  if (s.className = "overlay", e.thumbnailURL && (s.style.backgroundImage = `url("${N(e.thumbnailURL)}")`), e.title || e.world || e.author) {
    const i = document.createElement("div");
    if (i.className = "meta", e.title) {
      const o = document.createElement("h4");
      o.className = "title", o.textContent = e.title, i.appendChild(o);
    }
    if (e.world) {
      const o = document.createElement("p");
      o.className = "label label--world";
      const E = document.createElement("span");
      E.className = "label__prefix", E.textContent = "World: ";
      const F = document.createElement("span");
      F.textContent = e.world, o.append(E, F), i.appendChild(o);
    }
    if (e.author) {
      const o = document.createElement("p");
      o.className = "label label--author", o.textContent = e.author, i.appendChild(o);
    }
    s.appendChild(i);
  }
  const l = document.createElement("button");
  if (l.className = "play", l.type = "button", l.setAttribute("aria-label", "Load 3D model"), l.innerHTML = h.play, s.appendChild(l), !e.noUserInterface) {
    const i = document.createElement("p");
    i.className = "cta", i.textContent = "View the 3D Model", s.appendChild(i);
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
  let k, m, u;
  if (!e.noUserInterface) {
    const i = document.createElement("div");
    i.className = "controls", k = L(h.reset, "Reset camera"), m = L(h.rotate, "Auto-rotate"), u = L(h.fullscreen, "Fullscreen"), u.classList.add("ctrl--fullscreen"), e.autoRotate && m.classList.add("ctrl--active"), i.append(k, m, u), r.appendChild(i);
  }
  return r.append(p, c, d, s), n.appendChild(r), a.appendChild(n), {
    root: n,
    frame: r,
    canvas: p,
    overlay: s,
    playButton: l,
    resetButton: k,
    rotateButton: m,
    fullscreenButton: u,
    preloadThumbnail() {
      if (!e.thumbnailURL) return;
      const i = new Image();
      i.decoding = "async", i.src = e.thumbnailURL;
    },
    showLoader() {
      s.classList.add("overlay--hidden"), c.classList.add("loader--visible"), d.classList.remove("error--visible");
    },
    setProgress(i) {
      const o = Math.max(0, Math.min(1, i)) * 100;
      v.style.width = `${o}%`;
    },
    showCanvas() {
      c.classList.remove("loader--visible"), s.classList.add("overlay--hidden"), d.classList.remove("error--visible");
    },
    showError(i, o) {
      c.classList.remove("loader--visible"), s.classList.add("overlay--hidden"), w.textContent = i, y.textContent = o, d.classList.add("error--visible");
    },
    setRotateActive(i) {
      m?.classList.toggle("ctrl--active", i);
    },
    setFullscreen(i) {
      r.classList.toggle("frame--fullscreen", i), u && (u.innerHTML = i ? h.fullscreenExit : h.fullscreen);
    }
  };
}
function L(a, e) {
  const t = document.createElement("button");
  return t.className = "ctrl", t.type = "button", t.setAttribute("aria-label", e), t.innerHTML = a, t;
}
function N(a) {
  return a.replace(/["\\]/g, "\\$&");
}
class R {
  constructor(e) {
    this.state = "idle", this.engine = null, this.observer = null, this.isLoaded = !1, this.options = B(e), e.container ? this.host = e.container : (this.host = document.createElement("div"), this.host.className = "bview-embed", document.body.appendChild(this.host)), this.options.fullFrame && Object.assign(this.host.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%"
    }), this.host.shadowRoot ? (this.shadow = this.host.shadowRoot, this.shadow.innerHTML = "") : this.shadow = this.host.attachShadow({ mode: "open" }), this.ui = z(this.shadow, this.options), this.bindEvents(), this.options.autoStart ? (this.ui.showLoader(), this.start()) : this.setupLazyPreload();
  }
  // ---------- Public API ----------
  async start() {
    if (!(this.state === "loading" || this.state === "loaded")) {
      this.state = "loading", this.ui.showLoader();
      try {
        const t = (await import("./engine-DVrHkKBG.js")).Engine;
        this.engine = new t(this.ui.canvas, {
          transparent: this.options.transparentBackground,
          autoRotate: this.options.autoRotate
        }), await this.engine.load(this.options.src, (n) => this.ui.setProgress(n)), this.engine.start(), this.state = "loaded", this.isLoaded = !0, this.ui.showCanvas();
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
    this.observer?.disconnect(), this.engine?.destroy(), this.engine = null, this.fullscreenHandler && (document.removeEventListener("fullscreenchange", this.fullscreenHandler), document.removeEventListener("webkitfullscreenchange", this.fullscreenHandler)), this.shadow.innerHTML = "", this.host.removeAttribute("data-bview-init");
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
      const e = document, t = e.fullscreenElement || e.webkitFullscreenElement, n = t === this.ui.frame || t === this.host;
      this.ui.setFullscreen(n);
    }, document.addEventListener("fullscreenchange", this.fullscreenHandler), document.addEventListener("webkitfullscreenchange", this.fullscreenHandler);
  }
  setupLazyPreload() {
    this.options.thumbnailURL && (this.observer = new IntersectionObserver(
      (e) => {
        for (const t of e)
          if (t.isIntersecting) {
            this.ui.preloadThumbnail(), this.observer?.disconnect(), this.observer = null;
            break;
          }
      },
      { rootMargin: "200px" }
    ), this.observer.observe(this.host));
  }
  async toggleFullscreen() {
    const e = this.ui.frame, t = document, n = t.fullscreenElement === e || t.webkitFullscreenElement === e;
    try {
      n ? t.exitFullscreen ? await t.exitFullscreen() : t.webkitExitFullscreen && await t.webkitExitFullscreen() : e.requestFullscreen ? await e.requestFullscreen() : e.webkitRequestFullscreen && await e.webkitRequestFullscreen();
    } catch (r) {
      console.warn("[blauw] Fullscreen rejected:", r);
    }
  }
}
function B(a) {
  return {
    src: a.src,
    container: a.container ?? void 0,
    width: a.width ?? "100%",
    height: a.height ?? "auto",
    autoStart: a.autoStart ?? !1,
    fullFrame: a.fullFrame ?? !1,
    thumbnailURL: a.thumbnailURL ?? "",
    noUserInterface: a.noUserInterface ?? !1,
    transparentBackground: a.transparentBackground ?? !1,
    title: a.title ?? "",
    world: a.world ?? "",
    author: a.author ?? "",
    autoRotate: a.autoRotate ?? !1
  };
}
const C = "data-bview-init", U = `.bview-embed:not([${C}])`;
function M(a = document) {
  const e = a.querySelectorAll(U), t = [];
  return e.forEach((n) => {
    if (!(n instanceof HTMLElement)) return;
    const r = n.getAttribute("data-src");
    if (!r) {
      console.warn(
        "[blauw] .bview-embed is missing data-src attribute; skipping.",
        n
      );
      return;
    }
    const p = {
      src: r,
      container: n,
      width: f(n, "data-width"),
      height: f(n, "data-height"),
      autoStart: b(n, "data-autoplay"),
      fullFrame: b(n, "data-full-frame"),
      thumbnailURL: f(n, "data-thumbnail"),
      noUserInterface: b(n, "data-no-ui"),
      transparentBackground: b(n, "data-transparent"),
      title: f(n, "data-title"),
      world: f(n, "data-world"),
      author: f(n, "data-author"),
      autoRotate: b(n, "data-auto-rotate")
    };
    n.setAttribute(C, "1");
    try {
      t.push(new R(p));
    } catch (s) {
      console.error("[blauw] Failed to initialise viewer:", s, n), n.removeAttribute(C);
    }
  }), t;
}
function f(a, e) {
  const t = a.getAttribute(e);
  return t === null ? void 0 : t;
}
function b(a, e) {
  const t = a.getAttribute(e);
  return t === null ? !1 : t === "" || t === "true" || t === "1";
}
const A = "0.1.1";
function H(a, e = {}) {
  return new R({ src: a, ...e });
}
if (typeof window < "u") {
  const a = window;
  a.blauw || (a.blauw = {
    embed: H,
    scan: M,
    WebViewer: R,
    version: A
  });
  const e = () => M();
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e, { once: !0 }) : e();
}
export {
  R as WebViewer,
  H as embed,
  M as scan,
  A as version
};
//# sourceMappingURL=blauw.mjs.map
