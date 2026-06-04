# The Arena — Brand Playbook · Changelog

Interactive brand playbook for The Arena.
Live: https://nessim-higson.github.io/arena-guidelines/

**Versioning** — each release is tagged in git (`v1.0`, `v2.0`, …). Work in progress is
logged under the top **Unreleased** section and rolled into the next version when it is cut.
(The `?v=NN` query string on the assets is a separate cache-buster, not the product version.)

---

## Unreleased — v2.0 (in progress)

- **2026-06-04** — Opened v2 line: footer marked "v2 (in progress)"; began logging each iteration here.
- **2026-06-04** — **Arena Type Tool** (`type-tool.html`): standalone page to typeset in Arena, toggle black/white, and export **vector SVG** + high-res (~3500 px) transparent **PNG**/**JPG** for slides. Uses vendored `opentype.js` for true glyph outlines (self-hostable, no CDN). Embedded into the deck on the Type "Try it" slide (iframe) replacing the old preview-only editor, with an "Open full tool ↗" link.
- **2026-06-04** — Type tool, **type-in-viewport** rebuild: the whole canvas is now the input — click and type directly into the large Arena type and it expands, with the old auto-typing "invitation" demo when idle. Floating controls (White/Black + SVG/PNG/JPG). Export still vector via opentype.
- **2026-06-04** — Added scratch `comps.html` for the V.2 layout discussion (title-page alignment + Songtrust identity options); to be removed once direction is chosen.
- **2026-06-04** — Type anatomy: dots shrunk; word kept oversized; trimmed the forced full-height grey band.
- **2026-06-04** — **Structure pass (Cash-App direction).** Converted the five chapter intros (Type, Color, Imagery, Material, System) into **chapter landings**: eyebrow + big title + intro + a **clickable section index** so the long scroll reads as discrete, navigable chunks. Landings **alternate light/dark** (Type/Imagery/System on white) to break fatigue. New `landing` slide kind + `light` build flag.

### Still open for v2
- Songtrust-style **centered logo** treatments (Identity lockups).
- **Arena + IP** chapter (Metal Slug / Fatal Fury) — awaiting the 5 exported screens.
- Consider extending landings/section-index to Identity + a persistent index if the lighter pass isn't enough.

---

## v1.0 — 2026-06-04 · "V.1 Build"

First complete, client-ready build. Tagged `v1.0` (cache-bust `?v=37`).

### Structure
- **Cover** — cycling portal-ring GIF background behind the wordmark.
- **Identity** — elements overview · official four lockups with in-browser SVG/PNG/JPEG download · symbol construction · minimum size · scaling · Safe Area (clearspace) · Misuse (on white).
- **Type** — chapter intro · interactive Arena editor · Arena specimen · anatomy (small yellow dots pinned to letterform features) · Syne specimen (on white) · hierarchy · type scale.
- **Color** — palette with click-to-copy · usage do/don'ts · yellow-injection scale + live dial · image-sampled palette · tonal range.
- **Imagery** — hover-reveal pillars. **Material / System** — radius, spacing, primitives. Embedded live **Ring Tool**. **Appendix**.

### Brand
- Strict **black / white / yellow** (`#FAFF00`) palette; **Arena** (display) + **Syne** (text); the official **four-ring portal mark** only.
- Companion `arena-brand` Claude skill authored from these tokens (separate repo location).

### Craft
- Weighted smooth scroll (Lenis, graceful fallback to native), choreographed reveal stagger, branded `:focus-visible`, balanced/pretty `text-wrap`.
- Identity chapter divider: grayscale portal-video background.
- Section-header system (yellow-tick eyebrow + face-matched headline); two white "specimen" moments (Syne, Misuse) for rhythm.
- Tightened vertical rhythm across the deck.

### Engineering
- Zero-build static site (HTML / CSS / ES modules), served from GitHub Pages (main/root).
- Data-driven slides: `data/slides.js` → `js/app.js` renderers → `css/app.css` tokens.
