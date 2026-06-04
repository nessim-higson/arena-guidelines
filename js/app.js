/* ============================================================
   THE ARENA — PLAYBOOK runtime
   Builds slides from data/slides.js and wires interactions.
   ============================================================ */
import { SLIDES, NAV, PORTAL_SVG, RING_TOOL_URL, COVER_GIFS } from "../data/slides.js?v=41";
import { LOGO_SVGS } from "../data/logos.js?v=41";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const E = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
const esc = (s) => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const paras = (arr) => (Array.isArray(arr) ? arr : [arr]).map(p => `<p>${esc(p)}</p>`).join("");

/* ---- official logo SVGs (embedded — inline so currentColor themes them, no fetch) ---- */
const LOGOS = LOGO_SVGS;
function mark(key = "icon", cls = "portal-mark") {
  const svg = LOGOS[key] || PORTAL_SVG; // PORTAL_SVG = fallback
  return svg.replace("<svg ", `<svg class="${cls}" `);
}

/* ---- line icons for the inspiration slide ------------------ */
const ICONS = {
  Arena: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="3"><ellipse cx="60" cy="40" rx="54" ry="32"/><ellipse cx="60" cy="40" rx="34" ry="18"/><line x1="6" y1="40" x2="26" y2="40"/><line x1="94" y1="40" x2="114" y2="40"/></svg>`,
  Screen: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="3"><rect x="8" y="8" width="104" height="58" rx="10"/><path d="M86 50l10 10"/><circle cx="98" cy="62" r="3" fill="currentColor" stroke="none"/></svg>`,
  Frame: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="3"><path d="M14 26V14h12M106 26V14H94M14 54v12h12M106 54v12H94"/><circle cx="60" cy="40" r="11"/><path d="M60 33v14M53 40h14"/></svg>`,
  Portal: PORTAL_SVG
};

/* ============================================================
   SLIDE RENDERERS
   ============================================================ */
function labelEl(s) {
  if (!s.label && !s.soon) return "";
  return `<div class="slide__top reveal">
    ${s.label ? `<div class="label">${esc(s.label)}</div>` : "<span></span>"}
    ${s.soon ? `<span class="tag-soon"><span>${esc(s.soon)}</span></span>` : ""}
  </div>`;
}

const R = {
  cover(s) {
    const frames = COVER_GIFS.map((src, i) => `<img class="cover__frame${i === 0 ? " is-on" : ""}" src="${src}" alt="" aria-hidden="true">`).join("");
    return `<div class="cover__bg" id="coverBg">${frames}</div>
    <div class="cover__scrim"></div>
    <div class="slide__inner cover">
      <div class="cover__logo reveal" id="coverLogo">${mark("left", "cover-lockup")}</div>
      <div class="reveal" style="margin-top:0">
        <div class="label" style="color:var(--white)">Brand Playbook — Work in Progress</div>
        <p class="cap" style="margin-top:10px;font-size:.72rem">West Hollywood, CA &nbsp;·&nbsp; enterthearena.com &nbsp;·&nbsp; Interactive Guidelines</p>
      </div>
    </div>`;
  },

  chapter(s) {
    const vid = s.video ? `<div class="chap-bg">
      <video class="bg-video" autoplay muted loop playsinline preload="auto" poster="${s.poster || ""}" aria-hidden="true">
        <source src="${s.video}" type="video/mp4">
      </video>
    </div><div class="chap-scrim"></div>` : "";
    return vid + labelEl(s) + `<div class="slide__inner chapter">
      <h2 class="chapter__title display display--oblique reveal">${esc(s.title).replace(/\n/g, "<br>")}</h2>
    </div>`;
  },

  statement(s) {
    const bg = s.bg ? `<img class="stmt-bg" src="${s.bg}" alt="" aria-hidden="true">` : "";
    return bg + labelEl(s) + `<div class="slide__inner statement">
      <h2 class="display d1 reveal">${esc(s.display)}</h2>
      <div class="statement__body body reveal">${paras(s.body)}</div>
    </div>`;
  },

  // Chapter landing: a discrete divider that announces the chapter and lists
  // its sections as a clickable index — so the deck reads as chunks, not one
  // overwhelming scroll. Some landings are light (white) to break fatigue.
  landing(s) {
    const items = (s.index || []).map(it =>
      `<a class="lx__item reveal" href="#${it.to}"><span class="lx__n">${esc(it.n)}</span><span class="lx__name">${esc(it.name)}</span><span class="lx__go" aria-hidden="true">→</span></a>`
    ).join("");
    return labelEl(s) + `<div class="slide__inner landing">
      <div class="landing__head">
        ${s.eyebrow ? `<div class="eyebrow reveal">${esc(s.eyebrow)}</div>` : ""}
        <h2 class="display d1 reveal">${esc(s.display)}</h2>
        ${s.body ? `<div class="landing__body body reveal">${paras(s.body)}</div>` : ""}
      </div>
      ${items ? `<nav class="lx reveal" aria-label="Sections in ${esc(s.display)}">${items}</nav>` : ""}
    </div>`;
  },

  image(s) {
    // Each deck render is a complete, self-contained slide (label/title/body
    // already baked in) — so show only the image, no duplicate overlays.
    const soon = s.soon ? `<div class="slide__soon reveal"><span class="tag-soon"><span>${esc(s.soon)}</span></span></div>` : "";
    return soon + `<div class="slide__inner media">
      <div class="media__frame reveal"><img loading="lazy" src="${s.img}" alt="${esc(s.caption || s.label || "")}"></div>
    </div>`;
  },

  iconmark(s) {
    return labelEl(s) + `<div class="slide__inner center">
      <div class="reveal" style="width:min(46vw,520px)">${mark("icon")}</div>
    </div>`;
  },

  lockups(s) {
    const item = (key, name) => `<div class="lockup reveal" data-logo="${key}">
      <div class="lockup__art">${mark(key, "lk")}</div>
      <div class="lockup__meta">
        <span class="cap">${esc(name)}</span>
        <div class="dl">
          <button class="dl__c is-on" data-color="white">White</button>
          <button class="dl__c" data-color="black">Black</button>
          <span class="dl__sep"></span>
          <button class="dl__f" data-fmt="svg">SVG</button>
          <button class="dl__f" data-fmt="png">PNG</button>
          <button class="dl__f" data-fmt="jpeg">JPEG</button>
        </div>
      </div>
    </div>`;
    return labelEl(s) + `<div class="slide__inner col" style="justify-content:center">
      <div class="lockups-grid">
        ${item("horizontal", "Primary — horizontal · used often")}
        ${item("left", "Stacked — left")}
        ${item("center", "Stacked — centered")}
        ${item("icon", "Icon — standalone")}
      </div>
      <p class="cap" style="margin-top:var(--s4)">Pick a color, then a format — files generate and download in your browser. SVG is vector; PNG is transparent; JPEG ships on a contrasting background.</p>
    </div>`;
  },

  "elements-overview"(s) {
    const items = [
      { name: "Symbol", art: mark("icon", "el-mark") },
      { name: "Wordmark", art: `<div class="el-word is-arena">THE&nbsp;ARENA</div>` },
      { name: "Horizontal lockup", art: mark("horizontal", "el-mark") },
      { name: "Stacked lockup", art: mark("left", "el-mark") }
    ];
    const tiles = items.map((it, i) => `<div class="el-tile reveal">
      <span class="el-tile__no">${String(i + 1).padStart(2, "0")}</span>
      <div class="el-tile__art">${it.art}</div>
      <span class="el-tile__name cap">${esc(it.name)}</span></div>`).join("");
    return `<div class="slide__inner foundation">${headSec(s)}<div class="el-grid">${tiles}</div></div>`;
  },

  "best-practices"(s) {
    const items = [
      { mod: "distort", cap: "Do not stretch or distort the logo" },
      { mod: "shape", cap: "Do not contain the logo within a shape" },
      { mod: "effect", cap: "Do not apply effects to the logo" },
      { mod: "stroke", cap: "Do not add a stroke to the logo" },
      { mod: "outline", cap: "Do not convert the logo to outlines" }
    ];
    const cards = items.map(it => `<div class="bp reveal">
      <div class="bp__card bp__card--${it.mod}"><div class="bp__inner">${mark("horizontal", "bp__logo")}</div></div>
      <div class="bp__cap"><span class="bp__x">✕</span><span>${esc(it.cap)}</span></div>
    </div>`).join("");
    return `<div class="slide__inner safe-wrap">
      <div class="safe-head">
        <div class="spec2head reveal"><h2 class="pillar__cat is-arena">${esc(s.category)}</h2><div class="pillar__sub is-arena">${esc(s.sub)}</div></div>
        <p class="pillar__body reveal" style="margin-top:var(--s4)">${esc(s.intro)}</p>
      </div>
      <div class="bp-grid">${cards}</div>
    </div>`;
  },

  "safe-area"(s) {
    const variants = [
      { key: "horizontal", label: "Symbol / Wordmark" },
      { key: "left", label: "Symbol / Wordmark Left Justified" },
      { key: "center", label: "Symbol / Wordmark Stacked" }
    ];
    const diag = (v) => `<div class="safe reveal">
      <div class="safe__label"><span class="safe__rule"></span><span class="cap">${esc(v.label)}</span></div>
      <div class="safe__box">
        <span class="safe__corner safe__corner--tl"></span><span class="safe__corner safe__corner--br"></span>
        <div class="safe__inner">${mark(v.key, "safe__logo")}</div>
      </div>
    </div>`;
    return `<div class="slide__inner safe-wrap">
      <div class="safe-head">
        <div class="spec2head reveal"><h2 class="pillar__cat is-arena">${esc(s.category)}</h2><div class="pillar__sub is-arena">${esc(s.sub)}</div></div>
        <p class="pillar__body reveal" style="margin-top:var(--s4)">${esc(s.intro)}</p>
      </div>
      <div class="safe-grid">${variants.map(diag).join("")}</div>
    </div>`;
  },

  "symbol-construction"(s) {
    return `<div class="slide__inner foundation">${headSec(s)}
      <div class="construct reveal">
        <div class="construct__stage construct__stage--mark">
          <span class="g-cross g-cross--v"></span>
          <span class="g-cross g-cross--h"></span>
          <div class="construct__markwrap"><div class="construct__mark">${mark("icon", "cm-svg")}</div></div>
        </div>
        <ul class="rules">
          <li><b>Concentric.</b> Nested rounded rectangles, sharing one center.</li>
          <li><b>Radius.</b> Corner radius ≈ 10% of the shorter side; inner radii always smaller than outer.</li>
          <li><b>Rhythm.</b> Band weight equals the gap between rings — four rings, always.</li>
          <li><b>Fixed.</b> Use the supplied artwork as-is — never redraw, add or remove rings.</li>
        </ul>
      </div>`;
  },

  clearspace(s) {
    return `<div class="slide__inner foundation">${headSec(s)}
      <div class="construct reveal">
        <div class="cs-box">
          <div class="cs-zone"></div>
          <div class="cs-mark">${mark("horizontal", "cs-svg")}</div>
          <span class="cs-x cs-x--t">X</span><span class="cs-x cs-x--b">X</span>
          <span class="cs-x cs-x--l">X</span><span class="cs-x cs-x--r">X</span>
        </div>
        <ul class="rules">
          <li><b>Exclusion zone.</b> Keep clear space of at least <b>X</b> on every side.</li>
          <li><b>The unit.</b> X = the height of the symbol — the mark defines its own breathing room.</li>
          <li>Nothing — type, image edge or other marks — enters the zone.</li>
        </ul>
      </div>`;
  },

  "min-size"(s) {
    const item = (art, w, label) => `<div class="ms-item"><div class="ms-art" style="width:${w}px">${art}</div><span class="cap">${esc(label)}</span></div>`;
    return `<div class="slide__inner foundation">${headSec(s)}
      <div class="minsize reveal">
        ${item(mark("horizontal", "ms-svg"), 132, "Horizontal lockup — 132px / 28mm min")}
        ${item(mark("left", "ms-svg"), 96, "Stacked lockup — 96px / 20mm min")}
        ${item(mark("icon", "ms-svg"), 24, "Symbol — 24px / 6mm min")}
      </div>
      <p class="rules-inline reveal">Below these sizes legibility breaks down. When the mark must go smaller, use the symbol alone.</p>`;
  },

  scaling(s) {
    const sizes = [{ px: 200, label: "Large" }, { px: 120, label: "" }, { px: 72, label: "" }, { px: 44, label: "Minimum" }];
    const items = sizes.map(z => `<div class="scale-item"><div class="scale-art" style="width:${z.px}px">${mark("icon", "scale-svg")}</div><span class="cap">${z.px}px${z.label ? " · " + esc(z.label) : ""}</span></div>`).join("");
    return `<div class="slide__inner foundation">${headSec(s)}
      <div class="scale-row reveal">${items}</div>
      <p class="rules-inline reveal"><b>One mark, scaled as a locked unit.</b> The symbol is always the four-ring mark, exactly as supplied. Scale it uniformly — never stretch, recolor, redraw, or change the number of rings. Below the minimum, use it only where it stays clearly legible.</p>`;
  },

  inspiration(s) {
    const items = s.items.map(it => `
      <div class="insp__item reveal">
        ${it.t === "Portal" ? mark("icon") : (ICONS[it.t] || "")}
        <h4>${esc(it.t)}</h4>
        <p>${esc(it.d)}${it.b ? `<br><br><strong style="color:#fff">${esc(it.b)}</strong>` : ""}</p>
      </div>`).join("");
    return labelEl(s) + `<div class="slide__inner col">
      <p class="body reveal" style="max-width:58ch;margin-bottom:var(--s4)">${esc(s.intro)}</p>
      <div class="insp">${items}</div>
    </div>`;
  },

  "arena-specimen"(s) {
    return `<div class="slide__inner col">
      ${secHead("Type — Primary · Display", "Arena", { face: "arena", desc: "The display face: uppercase-only, engineered and wide. Arena carries every headline and the wordmark — and never sets below 39px." })}
      <div class="rule reveal" style="margin:var(--s3) 0 6px"></div>
      <div class="cap reveal" style="margin-bottom:var(--s3)">Arena Regular</div>
      <div class="glyphs reveal" style="font-size:clamp(1.6rem,5.5vw,4.4rem)">
        ABCDEFGHIJKLM<br>NOPQRSTUVWXYZ<br>0123456789<br>.,;?!“”@’-&amp;
      </div>
      <div class="reveal" style="margin-top:var(--s4)"><span class="tag-soon"><span>WIP — working typeface</span></span></div>
    </div>`;
  },

  "arena-examples"(s) {
    return labelEl(s) + `<div class="slide__inner col" style="justify-content:center;gap:var(--s3)">
      <div class="eyebrow reveal">Interactive — type to preview</div>
      <div class="type-editor reveal" id="typeEditor" contenteditable="true" spellcheck="false"
           role="textbox" aria-label="Type to preview the Arena typeface" data-placeholder="TYPE SOMETHING"></div>
      <div class="cap reveal" id="typeEditorHint">Click and type — Arena is display-only &amp; uppercase. Try “ENTER THE ARENA”.</div>
    </div>`;
  },

  "type-anatomy"(s) {
    // Each pin sits ON a real feature of the word "ARENA". x/y are percentages
    // of the word's own box, so the dots stay locked to the glyphs as the type
    // scales. Tuned to the hero render.
    // Tuned to features on the visible left letters of the oversized word —
    // apex + leg on the A, bowl + inner-corner on the R.
    const pins = [
      { x: 8, y: 4,  title: "Sharp terminals",
        body: "Where a stroke ends, Arena slices it flat on a hard angle — like this chiselled apex on the A. The same cut edges every terminal in the face." },
      { x: 4, y: 70, title: "Monolinear weight",
        body: "Stems hold a near-constant width — like the A's leg here — so a line of caps reads as one solid architectural wall." },
      { x: 29, y: 22, title: "Rounded counters", left: true,
        body: "Inside the letters it softens — the R's bowl rounds off at every corner, a calm negative space held within the rigid outline." },
      { x: 25, y: 43, title: "Shared corner-curve", mark: true, left: true, up: true,
        body: "That bowl's inner radius is the mark's radius — the same nested rounded-rectangle curve (≈10% of the shorter side) ties type to symbol." }
    ];
    const pin = (p) => {
      const flip = (p.left ? " apin--left" : "") + (p.up ? " apin--up" : "");
      return `<button class="apin${flip}" style="left:${p.x}%;top:${p.y}%" tabindex="0" aria-label="${esc(p.title)}">
        <span class="apin__dot" aria-hidden="true"></span>
        <span class="apin__panel">
          <span class="apin__t">${p.mark ? `<span class="apin__ring">${mark("icon")}</span>` : ""}${esc(p.title)}</span>
          <span class="apin__b">${esc(p.body)}</span>
        </span>
      </button>`;
    };
    return `<div class="slide__inner anatomy">
      <div class="anatomy__hint reveal"><span class="anatomy__hdot"></span>Hover the dots — each marks a feature of the letterforms</div>
      <div class="anatomy__type reveal">
        <span class="anatomy__word is-arena">ARENA</span>
        ${pins.map(pin).join("")}
      </div>
    </div>`;
  },

  "syne-specimen"(s) {
    const set = (w, lbl) => `
      <div class="cap reveal" style="margin:var(--s3) 0 8px">${lbl}</div>
      <div class="reveal" style="font-family:var(--f-syne);font-weight:${w};line-height:1.05;font-size:clamp(1.2rem,3.4vw,2.6rem)">
        ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789
      </div>`;
    return `<div class="slide__inner col">
      ${secHead("Type — Secondary · Text", "Syne", { face: "syne", desc: "The workhorse. Where Arena makes the statement, Syne carries everything you actually read — subheads, body, captions, and every lowercase need." })}
      <div class="rule reveal" style="margin-top:var(--s3)"></div>${set(400, "Syne Regular")}
      <div class="rule reveal" style="margin-top:var(--s4)"></div>${set(700, "Syne Bold")}
    </div>`;
  },

  hierarchy(s) {
    return `<div class="slide__inner col" style="gap:var(--s2);max-width:1100px">
      ${secHead("Type — Hierarchy", "", { desc: "One message across the scale — Arena sets the statement, Syne carries everything beneath it." })}
      <div class="hier-row reveal"><h3 class="display display--oblique" style="font-size:clamp(2rem,6.5vw,5rem)">ENTER THE ARENA</h3><span class="cap">Arena Regular</span></div>
      <div class="rule reveal"></div>
      <div class="hier-row reveal"><h4 style="font-family:var(--f-syne);font-weight:700;text-transform:uppercase;letter-spacing:.01em;font-size:clamp(1.2rem,3vw,2rem);margin:0">Where stories are forged</h4><span class="cap">Syne Bold</span></div>
      <div class="rule reveal"></div>
      <div class="hier-row reveal"><p class="body" style="max-width:60ch;margin:0">A stage for transformation. Open to all with the courage to step inside. It's where stories are forged, and characters tested, shaped, and pushed to the edge to discover what they're capable of.</p><span class="cap">Syne Regular</span></div>
    </div>`;
  },

  color(s) {
    const rows = s.colors.map(c => `
      <div class="swatch" data-hex="${c.hex}">
        <div class="swatch__chip" style="background:${c.hex}"></div>
        <span class="nm">${esc(c.name)}<br><span style="color:var(--body);font-weight:400">${c.hex}</span></span>
        <span>PMS<br>${esc(c.pms)}</span>
        <span>CMYK<br>${esc(c.cmyk)}</span>
        <span>RGB<br>${esc(c.rgb)}</span>
        <span class="copy">Click to copy</span>
      </div>`).join("");
    return labelEl(s) + `<div class="slide__inner col" style="justify-content:center">
      <div class="swatches">${rows}</div>
    </div>`;
  },

  ringtool(s) {
    return labelEl(s) + `<div class="slide__inner ringtool">
      <div class="ringtool__stage reveal">
        <iframe src="${RING_TOOL_URL}" title="The Arena Ring Tool" loading="lazy"
          referrerpolicy="no-referrer" allow="clipboard-write"></iframe>
      </div>
      <div class="ringtool__bar">
        <div><strong class="display" style="font-size:1.4rem">${esc(s.title)}</strong>
          <p class="body" style="font-size:.85rem;margin:4px 0 0;max-width:52ch">${esc(s.body)}</p></div>
        <a class="tag-soon" href="${RING_TOOL_URL}" target="_blank" rel="noopener"><span>Open full tool ↗</span></a>
      </div>
    </div>`;
  },

  boilerplate(s) {
    return labelEl(s) + `<div class="slide__inner center">
      <div class="xerox reveal">
        <h3>${esc(s.heading)}</h3>
        ${paras(s.body)}
        <div class="xerox__foot"><span>THE ARENA</span><span>BRAND PLAYBOOK</span></div>
      </div>
    </div>`;
  },

  appendix(s) {
    return `<div class="slide__inner center col" style="text-align:center;gap:10px">
      <h2 class="reveal" style="font-family:var(--f-syne);font-weight:600;letter-spacing:.04em;font-size:clamp(1.6rem,4vw,3rem);margin:0">${esc(s.title)}</h2>
      <h3 class="reveal" style="font-family:var(--f-syne);font-weight:600;letter-spacing:.04em;font-size:clamp(1.6rem,4vw,3rem);margin:0;color:var(--body)">${esc(s.sub)}</h3>
    </div>`;
  },

  /* ---- imagery pillar: header + lead/body + image collage with callouts ---- */
  pillar(s) {
    const cards = s.items.map((it, i) => `<figure class="pcard reveal">
      <img loading="lazy" src="${it.img}" alt="${esc(s.sub)} reference">
      <span class="pcard__no">${String(i + 1).padStart(2, "0")}</span>
      <figcaption class="pcard__desc">${it.lines.map(l => `<span>${esc(l)}</span>`).join("")}</figcaption>
    </figure>`).join("");
    return `<div class="slide__inner pillar">
      <div class="pillar__head">
        <h2 class="pillar__cat is-arena reveal">${esc(s.category)}</h2>
        <div class="pillar__sub is-arena reveal">${esc(s.sub)}</div>
        <p class="pillar__lead reveal">${esc(s.lead)}</p>
        <p class="pillar__body reveal">${esc(s.body)}</p>
      </div>
      <div class="pillar__main">
        <div class="pillar__ex reveal"><span class="cap">Examples</span><span class="pillar__hint cap">Hover to reveal</span><span class="pillar__rule"></span></div>
        <div class="pillar__grid">${cards}</div>
      </div>
    </div>`;
  },

  /* ---- controllable image gallery (drag · arrows · scroll · autoplay) ---- */
  gallery(s) {
    // a path with "/" is used as-is (deck renders); a bare name → extracted photo
    const imgs = s.images.map(n => (String(n).includes("/") ? n : `assets/extracted/${n}.png`));
    const shots = imgs.map(src => `<button class="shot" data-full="${src}"><img loading="lazy" src="${src}" alt="${esc(s.title)} reference"></button>`).join("");
    return labelEl(s) + `<div class="slide__inner gallery">
      <div class="gallery__head reveal">
        <h2 class="gallery__title">${esc(s.title)}</h2>
        <div><p class="gallery__lead">${esc(s.lead)}</p><p class="gallery__body">${esc(s.body)}</p></div>
      </div>
      <div class="gallery__viewport reveal">
        <button class="gallery__nav gallery__nav--prev" aria-label="Previous">‹</button>
        <div class="gallery__track" data-lenis-prevent>${shots}</div>
        <button class="gallery__nav gallery__nav--next" aria-label="Next">›</button>
      </div>
      <div class="gallery__hint">
        <span class="cap">Drag, scroll or use the arrows · click any frame to enlarge</span>
        <span class="gallery__count">${s.images.length} reference${s.images.length > 1 ? "s" : ""}</span>
      </div>
    </div>`;
  },

  /* ---- design-system foundations ---- */
  "type-scale"(s) {
    const rows = s.rows.map(r => `
      <div class="type-row reveal">
        <div class="tok"><b>${esc(r.tok)}</b><span>${esc(r.spec)}</span></div>
        <div class="spec ${r.cls}" style="font-size:${r.size}px;line-height:${r.lh};letter-spacing:${r.ls}">${esc(r.t)}</div>
      </div>`).join("");
    return `<div class="slide__inner foundation">${headSec(s)}${rows}</div>`;
  },

  "color-usage"(s) {
    const cells = s.cells.map(c => `
      <div class="usage__cell">
        <div class="usage__demo" style="background:${c.bg};color:${c.fg};${c.border ? "box-shadow:inset 0 0 0 1px var(--rule)" : ""}">${esc(c.demo)}</div>
        <span class="cap" style="padding-top:12px">${esc(c.cap)}</span>
        <p>${esc(c.note)}</p>
      </div>`).join("");
    const prop = s.proportion.map(p => `<span style="flex:${p.pct};background:${p.c};color:${p.fg}">${esc(p.label)}</span>`).join("");
    const li = (arr) => arr.map(x => `<li>${esc(x)}</li>`).join("");
    return `<div class="slide__inner foundation">${headSec(s)}
      <div class="usage reveal">${cells}</div>
      <div class="proportion reveal">${prop}</div>
      <div class="dodont reveal">
        <div class="col do"><h4>Do</h4><ul>${li(s.do)}</ul></div>
        <div class="col dont"><h4>Don't</h4><ul>${li(s.dont)}</ul></div>
      </div>
    </div>`;
  },

  "inject-scale"(s) {
    const levels = [
      { demo: `<span class="ij-hair"></span>`, name: "Hairline", when: "A 1–2px rule or tick. The quietest signal — structure, not shout." },
      { demo: `<span class="tag-soon"><span>Signal</span></span>`, name: "Marker / tag", when: "The highlighter note. Flags status or a single call-out." },
      { demo: `<span class="ij-underline">FORGED</span>`, name: "Underline", when: "A struck word inside a headline. One emphasis per line, maximum." },
      { demo: `<span class="ij-block">Claim your seat</span>`, name: "Block", when: "A solid yellow control — a button or chip. Black type only." },
      { demo: `<span class="ij-floodchip is-arena">ARENA</span>`, name: "Flood", when: "Yellow becomes the surface. Rare, loud, black type — one beat per sequence." }
    ];
    const rows = levels.map(l => `<div class="ij-row reveal"><div class="ij-row__demo">${l.demo}</div><div class="ij-row__name">${esc(l.name)}</div><div class="ij-row__when">${esc(l.when)}</div></div>`).join("");
    return `<div class="slide__inner foundation">${headSec(s)}<div class="ij-scale">${rows}</div></div>`;
  },

  "inject-demo"(s) {
    return `<div class="slide__inner foundation">${headSec(s)}
      <div class="inject reveal">
        <div class="inject__stage" id="injectStage" data-level="0">
          <span class="ij-eyebrow">Visual Identity</span>
          <h3 class="ij-head is-arena">ENTER THE ARENA</h3>
          <p class="ij-body">A stage for transformation. Open to all with the courage to step inside — where stories are forged.</p>
          <div class="ij-rowflex"><button class="ij-cta">Claim your seat</button><span class="ij-tag">Signal</span></div>
        </div>
        <div class="inject__control">
          <input type="range" id="injectRange" min="0" max="3" step="1" value="0" aria-label="Yellow injection level">
          <div class="inject__labels" id="injectLabels"><span class="is-on">Restrained</span><span>Accent</span><span>Bold</span><span>Flood</span></div>
        </div>
      </div>`;
  },

  flood(s) {
    return `<div class="slide__inner flood">
      <span class="flood__label label">${esc(s.label)}</span>
      <h2 class="display d1 reveal">${esc(s.display).replace(/\n/g, "<br>")}</h2>
      <p class="flood__note reveal">${esc(s.note)}</p>
    </div>`;
  },

  "tonal-range"(s) {
    const bands = s.bands.map(b => `<div class="band${b.light ? " is-light" : ""}" style="--bc:${b.hex}">
      <span class="band__lab"><b>${esc(b.name)}</b><span>${b.hex}</span></span></div>`).join("");
    return `<div class="slide__inner foundation">${headSec(s)}<div class="bands reveal">${bands}</div></div>`;
  },

  "image-color"(s) {
    const chips = s.sources.map((src, i) => `<button class="srcchip${i === 0 ? " is-on" : ""}" data-i="${i}" aria-label="${esc(src.name)}"><img loading="lazy" src="${src.img}" alt=""></button>`).join("");
    return `<div class="slide__inner foundation">${headSec(s)}
      <div class="imgcolor reveal">
        <div class="imgcolor__stage" id="imgStage">
          <div class="imgcolor__left">
            <div class="imgcolor__name is-arena" id="imgName">${esc(s.sources[0].name)}</div>
            <div class="imgcolor__swatches" id="imgSwatches"></div>
            <div class="imgcolor__note" id="imgNote">${esc(s.sources[0].note)}</div>
          </div>
          <div class="imgcolor__right"><img class="imgcolor__photo" id="imgPhoto" crossorigin="anonymous" src="${s.sources[0].img}" alt=""></div>
          <div class="imgcolor__glow"></div>
        </div>
        <div class="srcchips" id="srcChips">${chips}</div>
      </div>
    </div>`;
  },

  radius(s) {
    const chips = s.chips.map(c => `
      <div class="chip-card"><div class="chip-demo" style="border-radius:${c.r}px"></div>
      <div class="tok"><b>${esc(c.name)}</b>${esc(c.use)}</div></div>`).join("");
    return `<div class="slide__inner foundation">${headSec(s)}
      <div class="cards reveal">${chips}</div>
      <div class="mark-echo reveal">
        <div class="nested" style="border-radius:0"><div style="border-radius:28px"></div><div style="border-radius:20px"></div><div style="border-radius:14px"></div><div style="border-radius:8px"></div></div>
        <p class="note"><b>Mark-echo rule.</b> ${esc(s.note.replace("Mark-echo rule. ", ""))}</p>
      </div>
    </div>`;
  },

  spacing(s) {
    const rows = s.steps.map(st => `
      <div class="space-row"><div class="lab"><b>${esc(st.n)}</b> · ${st.px}px</div><div class="space-bar" style="width:${st.px}px"></div></div>`).join("");
    return `<div class="slide__inner foundation">${headSec(s)}<div class="reveal">${rows}</div></div>`;
  },

  primitives(s) {
    return `<div class="slide__inner foundation">${headSec(s)}
      <div class="proto reveal">
        <div class="proto-cell"><div class="eyebrow">Button</div>
          <button class="btn-d btn-primary">ENTER THE ARENA</button><div style="height:12px"></div>
          <button class="btn-d btn-secondary">SECONDARY</button></div>
        <div class="proto-cell"><div class="eyebrow">Input</div>
          <div class="field"><label>Email</label><input type="email" placeholder="you@enterthearena.com"></div></div>
        <div class="proto-cell"><div class="eyebrow">Frame — brand gesture</div>
          <div class="frame-demo"><span>Portal</span></div></div>
      </div>
    </div>`;
  }
};

/* shared foundation section header (eyebrow + Arena title + intro) */
function headSec(s) {
  return `<div class="sec-head reveal">
    <div class="eyebrow">${esc(s.eyebrow)}</div>
    <h2>${esc(s.title)}</h2>
    ${s.intro ? `<p>${esc(s.intro)}</p>` : ""}
  </div>`;
}

/* Section header for the mid-chapter sections that used to lead with only a
   tiny label (so they blended together). The yellow-tick eyebrow anchors the
   section; the headline is set IN the relevant typeface (face: 'arena'|'syne')
   so each typeface section reads as its own owned moment. Title/desc optional. */
function secHead(eyebrow, title, opts = {}) {
  const face = opts.face === "syne" ? "sh__title--syne" : "sh__title--arena";
  const h = title ? `<h2 class="sh__title ${face} reveal">${esc(title)}</h2>` : "";
  const desc = opts.desc ? `<p class="sh__desc reveal">${esc(opts.desc)}</p>` : "";
  return `<header class="sh">
    <div class="eyebrow reveal">${esc(eyebrow)}</div>
    ${h}${desc}
  </header>`;
}

/* ============================================================
   BUILD
   ============================================================ */
function build() {
  // nav
  const navWrap = $("#navChapters");
  navWrap.innerHTML = NAV.map(n => `<a href="#${n.target}" data-target="${n.target}">${esc(n.label)}</a>`).join("");
  $("#navBrand").innerHTML = mark("horizontal", "nav-lockup");

  // slides
  const main = $("#deck");
  SLIDES.forEach(s => {
    const sec = E("section", "slide slide--" + s.kind);
    sec.id = s.id;
    sec.dataset.ch = s.ch;
    if (s.dark) sec.classList.add("is-light-slide");
    if (s.light) sec.classList.add("is-light");
    const fn = R[s.kind];
    sec.innerHTML = fn ? fn(s) : `<div class="slide__inner"><p>${s.id}</p></div>`;
    main.appendChild(sec);
  });

  // lightbox for galleries
  const lb = E("div", "lightbox");
  lb.innerHTML = `<button class="lightbox__close">Close ✕</button><img alt="">`;
  document.body.appendChild(lb);

  wireCover();
  wireHeaderLogo();
  wireColor();
  wireGallery(lb);
  wireTypeEditor();
  wireDownloads();
  wireImageColor();
  wireInject();
  wirePillars();
  wireAnatomy();
  wireReveal();
  wireSpy();
  wireProgress();
  wireSmoothScroll();
}

/* ---- interactive type editor (types out, then editable) ---- */
function wireTypeEditor() {
  const el = $("#typeEditor"); if (!el) return;
  const phrases = ["ENTER THE ARENA", "WHERE STORIES ARE FORGED", "STORIES THAT HIT HARD", "CLAIM YOUR SEAT"];
  let pi = 0, ci = 0, deleting = false, timer = null, auto = true;
  const render = (txt) => { el.innerHTML = esc(txt) + '<span class="te-caret"></span>'; };
  function tick() {
    const p = phrases[pi];
    if (!deleting) {
      ci++; render(p.slice(0, ci));
      if (ci >= p.length) { deleting = true; timer = setTimeout(tick, 1500); return; }
      timer = setTimeout(tick, 90);
    } else {
      ci--; render(p.slice(0, ci));
      if (ci <= 0) { deleting = false; pi = (pi + 1) % phrases.length; timer = setTimeout(tick, 350); return; }
      timer = setTimeout(tick, 40);
    }
  }
  function stopAuto() { if (!auto) return; auto = false; clearTimeout(timer); el.textContent = ""; }
  el.addEventListener("focus", stopAuto);
  el.addEventListener("pointerdown", stopAuto);
  el.addEventListener("input", () => { if (auto) stopAuto(); });
  timer = setTimeout(tick, 650);
}

/* ---- client-side logo export (SVG / PNG / JPEG · black / white) ---- */
function wireDownloads() {
  const HEX = { white: "#ffffff", black: "#000000" };
  $$(".lockup").forEach(card => {
    const key = card.dataset.logo, svg = $(".lk", card);
    let color = "white";
    $$(".dl__c", card).forEach(b => b.addEventListener("click", () => {
      color = b.dataset.color;
      $$(".dl__c", card).forEach(x => x.classList.toggle("is-on", x === b));
      card.classList.toggle("on-light", color === "black");
    }));
    $$(".dl__f", card).forEach(b => b.addEventListener("click", () => exportLogo(svg, key, b.dataset.fmt, HEX[color], color)));
  });
}
function exportLogo(svg, key, fmt, hex, colorName) {
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("fill", hex);
  clone.querySelectorAll("[fill]").forEach(p => p.setAttribute("fill", hex));
  const xml = new XMLSerializer().serializeToString(clone);
  const base = `the-arena-${key}-${colorName}`;
  if (fmt === "svg") { saveBlob(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }), base + ".svg"); return; }
  const vb = svg.viewBox.baseVal, scale = 6;
  const w = Math.round((vb && vb.width ? vb.width : 300) * scale);
  const h = Math.round((vb && vb.height ? vb.height : 200) * scale);
  const img = new Image();
  img.onload = () => {
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const ctx = c.getContext("2d");
    if (fmt === "jpeg") { ctx.fillStyle = (hex === "#000000" ? "#ffffff" : "#000000"); ctx.fillRect(0, 0, w, h); }
    ctx.drawImage(img, 0, 0, w, h);
    c.toBlob(bl => saveBlob(bl, base + (fmt === "jpeg" ? ".jpg" : ".png")), fmt === "jpeg" ? "image/jpeg" : "image/png", 0.95);
  };
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
}
function saveBlob(blob, name) {
  const u = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = u; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 1500);
}

/* ---- imagery pillars: tap-to-reveal descriptor on touch devices ---- */
function wirePillars() {
  if (!matchMedia("(hover: none)").matches) return;
  $$(".pcard").forEach(c => c.addEventListener("click", () => {
    const open = c.classList.contains("is-open");
    $$(".pcard").forEach(x => x.classList.remove("is-open"));
    if (!open) c.classList.add("is-open");
  }));
}

/* ---- type anatomy: tap to toggle corner callouts on touch ---- */
function wireAnatomy() {
  if (!matchMedia("(hover: none)").matches) return;
  $$(".apin").forEach(c => c.addEventListener("click", (e) => {
    e.preventDefault();
    const open = c.classList.contains("is-open");
    $$(".apin").forEach(x => x.classList.remove("is-open"));
    if (!open) c.classList.add("is-open");
  }));
}

/* ---- yellow injection demo: dial the signal level ---- */
function wireInject() {
  const stage = $("#injectStage"), range = $("#injectRange"); if (!stage || !range) return;
  const labels = $$("#injectLabels span");
  const set = (v) => { stage.dataset.level = v; labels.forEach((l, i) => l.classList.toggle("is-on", i == v)); };
  range.addEventListener("input", () => set(range.value));
  labels.forEach((l, i) => l.addEventListener("click", () => { range.value = i; set(i); }));
}

/* ---- Image directs the palette: sample colors live from the imagery ---- */
const _hex = (a) => "#" + a.map(v => Math.max(0, Math.min(255, v | 0)).toString(16).padStart(2, "0")).join("");
const _lum = (a) => 0.299 * a[0] + 0.587 * a[1] + 0.114 * a[2];
function samplePalette(img) {
  const c = document.createElement("canvas"), n = 48; c.width = c.height = n;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, n, n);
  let d; try { d = ctx.getImageData(0, 0, n, n).data; } catch (e) { return null; }
  let r = 0, g = 0, b = 0, cnt = 0, dark = [255, 255, 255], dl = 1e9, light = [0, 0, 0], ll = -1, acc = [128, 128, 128], as = -1;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 128) continue;
    const R = d[i], G = d[i + 1], B = d[i + 2]; r += R; g += G; b += B; cnt++;
    const L = _lum([R, G, B]); if (L < dl) { dl = L; dark = [R, G, B]; } if (L > ll) { ll = L; light = [R, G, B]; }
    const S = Math.max(R, G, B) - Math.min(R, G, B); if (S > as && L > 40 && L < 225) { as = S; acc = [R, G, B]; }
  }
  if (!cnt) return null;
  return { avg: [r / cnt, g / cnt, b / cnt], dark, light, accent: acc };
}
function wireImageColor() {
  const stage = $("#imgStage"); if (!stage) return;
  const slide = SLIDES.find(x => x.kind === "image-color");
  const sources = slide ? slide.sources : [];
  const photo = $("#imgPhoto"), nameEl = $("#imgName"), noteEl = $("#imgNote"), swWrap = $("#imgSwatches");

  const paint = (pal, fb) => {
    const tone = pal ? _hex(pal.avg) : fb.tone;
    const acc = pal ? _hex(pal.accent) : fb.acc;
    const ink = pal ? (_lum(pal.avg) > 140 ? "#000000" : "#ffffff") : fb.ink;
    stage.style.setProperty("--tone", tone);
    stage.style.setProperty("--toneink", ink);
    stage.style.setProperty("--toneacc", acc);
    const sw = pal ? [_hex(pal.dark), _hex(pal.avg), _hex(pal.accent), _hex(pal.light)] : [fb.tone, fb.tone, fb.acc, fb.tone];
    swWrap.innerHTML = sw.map(h => `<div class="sw" style="background:${h}"><span>${h.toUpperCase()}</span></div>`).join("");
  };
  const load = (src) => {
    nameEl.textContent = src.name.toUpperCase(); noteEl.textContent = src.note;
    photo.src = src.img;
    const im = new Image(); im.crossOrigin = "anonymous";
    im.onload = () => paint(samplePalette(im), src.fallback);
    im.onerror = () => paint(null, src.fallback);
    im.src = src.img;
    paint(null, src.fallback); // instant fallback while sampling
  };
  $$("#srcChips .srcchip").forEach(ch => ch.addEventListener("click", () => {
    $$("#srcChips .srcchip").forEach(x => x.classList.toggle("is-on", x === ch));
    load(sources[+ch.dataset.i]);
  }));
  const move = (e) => {
    const r = stage.getBoundingClientRect();
    stage.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
    stage.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
  };
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerleave", () => { stage.style.setProperty("--mx", "70%"); stage.style.setProperty("--my", "30%"); });
  if (sources[0]) load(sources[0]);
}

/* ---- header logo: slides into the nav as the cover logo scrolls away ---- */
function wireHeaderLogo() {
  const navBrand = $("#navBrand"), coverLogo = $("#coverLogo");
  if (!navBrand) return;
  if (!coverLogo) { navBrand.classList.add("is-in"); return; }
  const onScroll = () => navBrand.classList.toggle("is-in", coverLogo.getBoundingClientRect().bottom < 58);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---- cover: crossfade-cycle the animated gifs ---- */
function wireCover() {
  // reduced-motion: hold any background video on its poster frame instead of playing
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$(".bg-video").forEach(v => { v.removeAttribute("autoplay"); try { v.pause(); } catch {} });
  }
  const frames = $$("#coverBg .cover__frame"); if (frames.length < 2) return;
  let i = 0;
  setInterval(() => {
    frames[i].classList.remove("is-on");
    i = (i + 1) % frames.length;
    frames[i].classList.add("is-on");
  }, 7000);
}

/* ---- gallery: drag · arrows · scroll · autoplay · click-to-enlarge ---- */
function wireGallery(lb) {
  const lbImg = $("img", lb), close = $(".lightbox__close", lb);
  const hide = () => lb.classList.remove("open");
  close.addEventListener("click", hide);
  lb.addEventListener("click", (e) => { if (e.target === lb) hide(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });

  $$(".gallery__viewport").forEach(vp => {
    const track = $(".gallery__track", vp);
    const step = () => Math.min(track.clientWidth * 0.78, 560);
    $(".gallery__nav--prev", vp).addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    $(".gallery__nav--next", vp).addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));

    // drag-to-scroll
    let down = false, sx = 0, sl = 0, moved = 0;
    track.addEventListener("pointerdown", (e) => { down = true; moved = 0; sx = e.clientX; sl = track.scrollLeft; track.classList.add("dragging"); });
    track.addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); track.scrollLeft = sl - dx; });
    const end = () => { down = false; track.classList.remove("dragging"); };
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
    track.addEventListener("pointerleave", end);
    // swallow the click that ends a drag (so it doesn't open the lightbox)
    track.addEventListener("click", (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);

    // autoplay (faster), pause while hovering/interacting
    let timer = null;
    const tick = () => {
      if (down) return;
      const max = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: "smooth" });
      else track.scrollBy({ left: step() * 0.7, behavior: "smooth" });
    };
    const play = () => { if (!timer) timer = setInterval(tick, 3200); };
    const stop = () => { clearInterval(timer); timer = null; };
    vp.addEventListener("pointerenter", stop);
    vp.addEventListener("pointerleave", play);
    play();
  });

  $$(".shot").forEach(btn => btn.addEventListener("click", () => {
    lbImg.src = btn.dataset.full; lb.classList.add("open");
  }));
}

/* ---- color copy ---- */
function wireColor() {
  $$(".swatch").forEach(sw => sw.addEventListener("click", () => {
    const hex = sw.dataset.hex;
    navigator.clipboard?.writeText(hex);
    const tag = $(".copy", sw); const prev = tag.textContent;
    tag.textContent = "Copied " + hex + " ✓"; tag.style.color = "var(--yellow)";
    setTimeout(() => { tag.textContent = prev; tag.style.color = ""; }, 1200);
  }));
}

/* ---- reveal on scroll (fail-safe: never leaves content stuck hidden) ---- */
function wireReveal() {
  const els = $$(".reveal");
  const show = (n) => n.classList.add("in");
  if (!("IntersectionObserver" in window)) { els.forEach(show); return; }
  // Choreograph: elements that cross into view together cascade top-to-bottom
  // with a small stagger, instead of popping in as a flat block. Solo arrivals
  // get no delay, so scrolling to a single element still feels immediate.
  const io = new IntersectionObserver((es) => {
    const entering = es.filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    entering.forEach((e, i) => {
      e.target.style.transitionDelay = (Math.min(i, 6) * 70) + "ms";
      show(e.target); io.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
  els.forEach(n => io.observe(n));
  // safety net: reveal anything in/near the viewport shortly after load even
  // if the observer never fires (so type can never be left invisible)
  setTimeout(() => els.forEach(n => { const r = n.getBoundingClientRect(); if (r.top < innerHeight * 1.15) show(n); }), 1200);
}

/* ---- nav scroll-spy (by chapter) ---- */
function wireSpy() {
  const links = $$("#navChapters a");
  const byTarget = new Map(links.map(a => [a.dataset.target, a]));
  const chToLink = new Map(NAV.map(n => [SLIDES.find(s => s.id === n.target)?.ch, n.target]));
  const io = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const ch = e.target.dataset.ch;
      const target = chToLink.get(ch);
      links.forEach(a => a.classList.toggle("is-active", a.dataset.target === target));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$(".slide").forEach(s => io.observe(s));
}

/* ---- weighted smooth scroll (Lenis) ----------------------------------------
   Gives the deck the physical, weighted scroll of an award-grade brand site.
   Loaded dynamically from a CDN: if it ever fails to load, the site silently
   falls back to native scroll — the import never blocks the rest of app.js.
   Skipped entirely for reduced-motion users. */
async function wireSmoothScroll() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let Lenis;
  try {
    Lenis = (await import("https://cdn.jsdelivr.net/npm/lenis@1.1.20/+esm")).default;
  } catch { return; } // CDN blocked/offline → native scroll, everything else works
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  // keep in-page anchor jumps weighted, and clear the fixed nav
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 56;
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const el = $(id);
    if (!el) return;
    e.preventDefault();
    try {
      lenis.scrollTo(el, { offset: -(navH + 10) });
    } catch {
      // belt-and-suspenders: navigation must work even if Lenis misbehaves
      const y = el.getBoundingClientRect().top + window.scrollY - (navH + 10);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    history.replaceState(null, "", id);
  });
}

/* ---- progress bar ---- */
function wireProgress() {
  const bar = $("#navProgress");
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    bar.style.width = (p * 100) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

build();
