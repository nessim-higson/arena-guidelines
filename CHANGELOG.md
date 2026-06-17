# The Arena — Brand Playbook · Changelog

Interactive brand playbook for The Arena.
Live: https://nessim-higson.github.io/arena-guidelines/

**Versioning** — each release is tagged in git (`v1.0`, `v2.0`, …). Work in progress is
logged under the top **Unreleased** section and rolled into the next version when it is cut.
(The `?v=NN` query string on the assets is a separate cache-buster, not the product version.)

---

## Unreleased — v2.0 (in progress)

- **2026-06-17** — **Type tool: drop the global tracking slider (cache `?v=61`).** Per request, removed the Tracking control and kept only the per-pair manual **Kern** feature. `kernUnits` is now `font kern + manual` (no global term); bar is Background · Align · Kern. Export math unchanged otherwise.
- **2026-06-17** — **Type tool: manual kerning + tracking (cache `?v=60`).** Two new spacing controls in the bottom bar, both baked into the SVG/PNG/JPG export (not just on screen):
  - **Tracking** slider — global letter spacing, live as you type.
  - **Kern** toggle — per-pair manual kerning. Turn it on and the type splits into individual letters; click a gap (or Tab) to select a pair, then **← / →** tighten / loosen it (Shift = bigger step), with a HUD showing the active pair and value plus −/+ buttons. Font's own kern is preserved and the manual value layers on top.
  - Rebuilt the export `geometry()` to lay out glyph-by-glyph (font kern + tracking + manual per gap), so exports match the canvas exactly. Editing the text resets manual pairs (tracking persists). Verified: tightening a pair shrinks the exported SVG width by exactly the kern delta.
- **2026-06-17** — **Arena kerning fine-tune (cache `?v=59`).** Tightened two loose pairs in the font's GPOS `kern` feature: **L→T −100 → −220** (e.g. CULTURE) and **P→A −120 → −260** (e.g. EXPAND). These are "open"/interlocking pairs (L's empty top-right tucks under T's crossbar; A's apex under P's bowl), so bounding boxes overlap well before they look right — sized by rendering CULTURE/EXPAND and matching the neighbor rhythm. Applies everywhere the font is read: deck CSS (font-kerning), type-tool live canvas, and the opentype.js exports. All other kern pairs untouched.
- **2026-06-17** — **Arena typeface refresh — latest cut (cache `?v=58`).** Dropped in the newest `Arena-Regular.otf` (same family `Arena`, same uppercase-only glyph set — A–Z, digits, punctuation; refined outlines). Clean swap, no markup changes; bumped the font cache-buster to `?v=58` (CSS `@font-face` + both type-tool refs) and the global asset version to 58. Verified the deck specimen + nav wordmark and the type tool (live + export) render the new outlines, no fallback.
- **2026-06-17** — **Updated Arena typeface (cache `?v=57`).** Dropped in the new `Arena-Regular.otf` (uppercase-only display cut — A–Z, digits, punctuation; no lowercase, which is fine since every Arena usage on the site and in the type tool is `text-transform:uppercase` / `.toUpperCase()`). Same family name `Arena`, so a clean swap — no markup changes. Added `?v=57` to the `@font-face` src in `css/app.css` and to both font references in `type-tool.html` (CSS + `opentype.load`) so browsers re-fetch the new outlines. Verified the deck specimen, nav wordmark, and the type tool (live + export) all render the new glyphs with no fallback.
- **2026-06-05** — **Type tool: Left / Center / Right alignment.** Added an **Align** control to the tool's bottom bar (icon segment, defaults to Center). It drives both the live canvas (block position + ragged edge) *and* the exported file — `geometry()` now offsets each line by its advance width so multi-line SVG/PNG/JPG exports match the chosen alignment. Bar re-centered to hold both Background + Align. Embedded iframe cache-bust → `?v=56`.
- **2026-06-05** — **Logo section reverted to V.1 (cache `?v=56`).** After comparing treatments on `logo-comps.html`, chose the **original V.1 dark 4-up grid** over the white Songtrust-style suite. Restored the `lockups` renderer (2×2 grid: Horizontal / Stacked-left / Stacked-centered / Icon on the dark ground, White default download), dropped the white-background override on `.slide--lockups`, and put the slide back to full-height so the grid centers. Added the V.1 grid as Option D on the comps page for reference.
- **2026-06-05** — **V.2 feedback pass (cache `?v=55`).** Nine-item polish on the chosen V.2 direction:
  (1/6) every section landing now renders on **white** — added `light: true` to the Identity ("VISUAL IDENTITY") and Color landings so all dividers match.
  (2) **Logo-section comps** added at `logo-comps.html` — the logo suite in three treatments (white·centered / black·centered / white·left-justified) for the client to pick.
  (3) **Padding pass** — pulled `.slide--iconmark` (and the logo suite) out of the forced `min-height:100svh` so the Icon slide sizes to content instead of floating in an empty screen; tightened general rhythm.
  (4) More **breathing room below "Syne Bold"** on the Syne specimen.
  (5) **Type Hierarchy** rebuilt — was a narrow centered column with labels flung to the far right; now a clean left-aligned label + sample spec table (`hier-list`/`hier-row` grid).
  (7) More padding below the **"Image directs the palette"** color slide.
  (8) **Aura / Swagger** pillar: switched `.pillar__grid` from `auto-fit` to `auto-fill` so the 2-image pillar keeps the same card height as the 3-image rows above instead of stretching taller.
  (9) **Responsive chapter titles** — `.chapter__title` now `clamp(2.4rem,9vw,8rem)` + `white-space:nowrap` so the longest header (MNEMONIC) sets the size and no title wraps; removed the duplicate **MATERIALS** chapter (Material lives as a landing).
- **2026-06-04** — Opened v2 line: footer marked "v2 (in progress)"; began logging each iteration here.
- **2026-06-04** — **Arena Type Tool** (`type-tool.html`): standalone page to typeset in Arena, toggle black/white, and export **vector SVG** + high-res (~3500 px) transparent **PNG**/**JPG** for slides. Uses vendored `opentype.js` for true glyph outlines (self-hostable, no CDN). Embedded into the deck on the Type "Try it" slide (iframe) replacing the old preview-only editor, with an "Open full tool ↗" link.
- **2026-06-04** — Type tool, **type-in-viewport** rebuild: the whole canvas is now the input — click and type directly into the large Arena type and it expands, with the old auto-typing "invitation" demo when idle. Floating controls (White/Black + SVG/PNG/JPG). Export still vector via opentype.
- **2026-06-04** — Type tool polish: (1) clear pulsing **"Click anywhere & start typing"** prompt; (2) type **auto-scales** huge→small to fit as you type; (3) tuned as an embeddable **module**; (4) explicit **Background** toggle (Black/White swatches) with the type flipping in response.
- **2026-06-04** — Type tool: a **thin blinking hairline caret** now appears when you click into the empty canvas (3px wide, mode-coloured); native caret hidden while empty so there's no double cursor; empty state uses a moderate type size so the caret reads as a proper cursor.
- **2026-06-04** — Type tool: demo typing speed split to ~115ms; **download buttons (PNG·SVG·JPG) now sit directly under the type** and appear as you type (bottom bar keeps just the Background toggle); the idle demo caret and the click caret are now the same 3px hairline.
- **2026-06-04** — Type tool: type + downloads now **vertically centered** as a content-sized group (decoupled the fit area from the layout box); demo phrases break to **two lines** so the canvas reads balanced rather than a thin wide strip.
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
