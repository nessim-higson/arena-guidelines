/* ============================================================
   THE ARENA — PLAYBOOK runtime
   Builds slides from data/slides.js and wires interactions.
   ============================================================ */
import { SLIDES, NAV, PORTAL_SVG, RING_TOOL_URL } from "../data/slides.js?v=4";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const E = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
const esc = (s) => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const paras = (arr) => (Array.isArray(arr) ? arr : [arr]).map(p => `<p>${esc(p)}</p>`).join("");

/* ---- official logo SVGs (fetched + inlined so currentColor themes them) ---- */
const LOGOS = {};
const LOGO_SRC = {
  icon: "assets/logo/icon.svg",
  horizontal: "assets/logo/lockup-horizontal.svg",
  center: "assets/logo/lockup-center.svg",
  left: "assets/logo/lockup-left.svg"
};
async function loadLogos() {
  await Promise.all(Object.entries(LOGO_SRC).map(async ([k, u]) => {
    try {
      let t = await (await fetch(u)).text();
      LOGOS[k] = t.replace(/<\?xml[^>]*\?>/, "").replace(/\s(width|height)="[^"]*"/g, "").trim();
    } catch (e) { LOGOS[k] = ""; }
  }));
}
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
    return `<div class="slide__inner cover">
      <div class="portal reveal">${mark("icon")}</div>
      <h1 class="display hero-type reveal">THE<br>ARENA</h1>
      <div class="reveal" style="margin-top:var(--s3)">
        <div class="label" style="color:var(--white)">Brand Playbook — Work in Progress</div>
        <p class="cap" style="margin-top:10px;font-size:.72rem">West Hollywood, CA &nbsp;·&nbsp; enterthearena.com &nbsp;·&nbsp; Interactive Guidelines</p>
      </div>
    </div>`;
  },

  chapter(s) {
    return labelEl(s) + `<div class="slide__inner chapter">
      <div class="chapter__num display display--oblique reveal">${esc(s.num)}</div>
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
    return labelEl(s) + `<div class="slide__inner col">
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
    return `<div class="slide__inner anatomy">
      <span class="anatomy__cross anatomy__cross--v"></span>
      <span class="anatomy__cross anatomy__cross--h"></span>
      <div class="anatomy__word is-arena">ARENA</div>
      <p class="anatomy__note anatomy__note--tr reveal">The typeface balances hard geometric construction with softened internal curves, creating a tension between precision and fluidity. Sharp terminals and structural lines give the system strength and momentum, while the rounded transitions introduce a more human, cinematic quality.</p>
      <p class="anatomy__note anatomy__note--bl reveal">This interplay between rigidity and softness gives the typeface its distinctive character. It feels engineered yet emotional — capable of expressing both impact and atmosphere within the same visual system.</p>
      <div class="anatomy__detail reveal">
        <div class="anatomy__mark">${mark("icon")}</div>
        <div class="anatomy__radii"><span class="anatomy__corner"></span></div>
        <p class="anatomy__caption"><b>Shared corner-curve.</b> The letterforms' rounded transitions echo the mark itself — the same nested rounded-rectangle radius language (≈10% of the shorter side) ties the type to the symbol.</p>
      </div>
    </div>`;
  },

  "syne-specimen"(s) {
    const set = (w, lbl) => `
      <div class="cap reveal" style="margin:var(--s3) 0 8px">${lbl}</div>
      <div class="reveal" style="font-family:var(--f-syne);font-weight:${w};line-height:1.05;font-size:clamp(1.2rem,3.4vw,2.6rem)">
        ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789
      </div>`;
    return labelEl(s) + `<div class="slide__inner col">
      <div class="rule reveal" style="margin-top:var(--s3)"></div>${set(400, "Syne Regular")}
      <div class="rule reveal" style="margin-top:var(--s4)"></div>${set(700, "Syne Bold")}
    </div>`;
  },

  hierarchy(s) {
    return labelEl(s) + `<div class="slide__inner col" style="justify-content:center;gap:var(--s2);max-width:1100px">
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

  /* ---- moving image gallery (imagery pillars + render clusters) ---- */
  gallery(s) {
    // a path with "/" is used as-is (deck renders); a bare name → extracted photo
    const imgs = s.images.map(n => (String(n).includes("/") ? n : `assets/extracted/${n}.png`));
    let base = imgs.slice(); while (base.length < 8) base = base.concat(imgs);
    const loop = base.concat(base); // duplicated for seamless -50% loop
    const dur = Math.max(34, base.length * 7);
    const shots = loop.map(src => `<button class="shot" data-full="${src}"><img loading="lazy" src="${src}" alt="${esc(s.title)} reference"></button>`).join("");
    return labelEl(s) + `<div class="slide__inner gallery">
      <div class="gallery__head reveal">
        <h2 class="gallery__title">${esc(s.title)}</h2>
        <div><p class="gallery__lead">${esc(s.lead)}</p><p class="gallery__body">${esc(s.body)}</p></div>
      </div>
      <div class="marquee reveal" style="--marquee-dur:${dur}s"><div class="marquee__track">${shots}</div></div>
      <div class="gallery__hint">
        <span class="cap">Hover to pause · tap to pause on mobile · click any frame to enlarge</span>
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
    const fn = R[s.kind];
    sec.innerHTML = fn ? fn(s) : `<div class="slide__inner"><p>${s.id}</p></div>`;
    main.appendChild(sec);
  });

  // lightbox for galleries
  const lb = E("div", "lightbox");
  lb.innerHTML = `<button class="lightbox__close">Close ✕</button><img alt="">`;
  document.body.appendChild(lb);

  wireColor();
  wireGallery(lb);
  wireTypeEditor();
  wireDownloads();
  wireReveal();
  wireSpy();
  wireProgress();
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

/* ---- gallery: tap-to-pause + click-to-enlarge ---- */
function wireGallery(lb) {
  const lbImg = $("img", lb), close = $(".lightbox__close", lb);
  const hide = () => lb.classList.remove("open");
  close.addEventListener("click", hide);
  lb.addEventListener("click", (e) => { if (e.target === lb) hide(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });

  $$(".shot").forEach(btn => btn.addEventListener("click", () => {
    lbImg.src = btn.dataset.full; lb.classList.add("open");
  }));
  // tap a marquee to toggle pause (touch devices have no hover)
  $$(".marquee").forEach(m => m.addEventListener("touchstart", () => m.classList.toggle("paused"), { passive: true }));
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

/* ---- reveal on scroll ---- */
function wireReveal() {
  const io = new IntersectionObserver((es) => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal").forEach(n => io.observe(n));
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

loadLogos().then(build);
