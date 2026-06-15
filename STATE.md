# STATE — The Arena Interactive Brand Playbook

> Snapshot of where this project stands so work can be picked back up cold.
> Last updated: **2026-06-15** · Cache version in use: **`?v=56`** · Branch: **main**

---

## 1. What this is

An **interactive brand playbook** for **The Arena** (entertainment / IP studio, West Hollywood — enterthearena.com). A **zero-build static site** (HTML / CSS / ES modules) meant to (a) impress clients and (b) be handed off for self-hosting.

- **Live:** https://nessim-higson.github.io/arena-guidelines/ (GitHub Pages, `main` / root)
- **Repo:** https://github.com/nessim-higson/arena-guidelines
- **Standalone tools (shipped, embedded in the deck + linkable on their own):**
  - Type tool → https://nessim-higson.github.io/arena-guidelines/type-tool.html
  - Logo comps (scratch / review page) → https://nessim-higson.github.io/arena-guidelines/logo-comps.html

If a URL looks stale, append `?fresh=56` (the `?v=NN` cache-buster on assets is bumped on each change).

---

## 2. How to run / verify locally

```bash
cd arena-guidelines
python3 -m http.server 4200   # then open http://localhost:4200/index.html
```

**Headless preview is flaky** (Claude_Preview drifts to other localhost apps, screenshots go black on scroll, evals time out). The reliable path used throughout this project:

1. Serve the repo on a real port: `python3 -m http.server 4200`
2. Render with the gstack **browse** binary: `$HOME/.claude/skills/gstack/browse/dist/browse`
   - `browse viewport 1440x900` · `browse goto http://localhost:4200/...` · `browse wait --networkidle`
   - Scroll is **Lenis-smoothed** and intercepts `window.scrollTo` — to reach a slide, click its in-page anchor (`browse js "document.querySelector('a[href=\"#<id>\"]').click()"`) then **poll `window.pageYOffset` until it stops changing** before `browse screenshot --viewport`.
   - Reveal-on-scroll elements start hidden; force them visible first: `document.querySelectorAll('.reveal').forEach(n=>n.classList.add('in'))` (the IntersectionObserver class is **`in`**, not `is-visible`).

---

## 3. Architecture

Data-driven slides. Three layers:

- **`data/slides.js`** — `SLIDES` array (each `{ id, ch, kind, ... }`), plus `NAV`, `PORTAL_SVG`, `RING_TOOL_URL`, `TYPE_TOOL_URL`, `COVER_GIFS`. Also `data/logos.js` exports `LOGO_SVGS` (official marks, inline so `currentColor` themes them — keys: `icon`, `horizontal`, `left`, `center`).
- **`js/app.js`** — `const R = {}` object of **renderers keyed by `kind`**. Builds each `<section class="slide slide--<kind>">` into `#deck`. Helpers: `mark(key,cls)`, `labelEl(s)`, `secHead()/headSec()`, `esc()`, `paras()`. Build flags: `s.light` → `is-light` (white slide), `s.dark` → `is-light-slide`. Also wires Lenis smooth scroll (dynamic CDN import w/ graceful fallback), reveal IntersectionObserver, logo download/export (`wireDownloads` / `exportLogo` — SVG vector + PNG transparent + JPEG on contrast bg).
- **`css/app.css`** — design tokens + per-slide styles (`.slide--<kind>`).

**Cache-busting:** `?v=NN` on the imports in `index.html` (css + app.js) and inside `app.js` (slides.js + logos.js) and on `TYPE_TOOL_URL`. Bump **all of them together** on every change. Currently **v=56**. Bump with: `sed -i '' 's/v=56/v=57/g' index.html js/app.js` (and the `type-tool.html?v=` ref in `data/slides.js` if the tool changed).

**Deck structure (chapters → slides, in order):** Cover · **Identity** (landing → logo statement → lockups → safe-area → best-practices → icon statement → icon-mark → inspiration → elements-overview → symbol-construction → min-size → scaling) · **Type** (landing → arena-examples/embedded type tool → arena-specimen → anatomy → syne-specimen → hierarchy → type-scale → arena-IP statement + gallery) · **Color** (landing → palette → usage → inject-scale → inject-demo → flood → tonal-range → image-color) · **Imagery** (landing → 5 pillars: anime/swagger/humor/portraits/camera) · **Material** (landing → gallery) · **System** (landing → radius → spacing → primitives → mark images → ring tool → motif/hatch/posters/frames) · **Motion** (chapters ch05 MOTION + ch06 MNEMONIC, "coming soon") · **Appendix** (boilerplate → appendix → treatments/applications/cards galleries).

---

## 4. Brand constraints (always apply — non-negotiable)

- **Palette:** ONLY black `#000`, white `#fff`, yellow `#FAFF00`. **Never yellow on white.**
- **Type:** **Arena** (display — uppercase only, no italic cut, never below 39px) + **Syne** (everything readable: subheads, body, captions, lowercase).
- **Mark:** the official **four-ring portal mark** only — never altered, redrawn, stretched, contained, stroked, or outlined.
- An `arena-brand` Claude skill encodes these tokens (separate location) and should be used for any Arena artifact.

---

## 5. Recent work / decisions (newest first)

1. **Type tool — Left/Center/Right alignment** (`8fd1140`, v=56). New **Align** control in the bottom bar (icon segment, defaults Center). Drives both the live canvas (block position + ragged edge via `.stage.align-left/right` classes) **and the export** — `geometry()` offsets each line by its advance width so multi-line SVG/PNG/JPG match the chosen alignment.
2. **Logo section reverted to V.1** (`f975ef4`, v=56). After comparing on `logo-comps.html`, chose the **original V.1 dark 4-up grid** (Horizontal / Stacked-left / Stacked-centered / Icon on the dark ground, White default download) over the white "Songtrust-style" centered suite. Dropped the `.slide--lockups { background:#fff }` override; slide is back on the default dark ground and full-height so the grid centers.
3. **`logo-comps.html`** (`c09d041`) — scratch review page showing the logo suite four ways: **D** V.1 dark 4-up grid (the one now live), **A** white·centered, **B** black·centered, **C** white·left-justified.
4. **V.2 feedback pass** (`7eefd2c`, v=55) — 9 fixes: all section landings on white (`light:true`); Icon slide content-sized (removed from forced `min-height:100svh`); padding below Syne Bold and image-color; Type Hierarchy rebuilt as a left-aligned label+sample spec table; Aura/Swagger pillar `auto-fit→auto-fill` so 2-image rows match 3-image height; chapter titles `clamp(2.4rem,9vw,8rem)` + `nowrap` (longest = MNEMONIC fits); removed duplicate MATERIALS chapter.
5. Earlier: V.1 tagged `v1.0`; **V.3** (Cash-App/DevRev direction) prototyped then **rejected** — user said "I prefer V.2". `v3.html` and scratch `comps.html` removed.

Full history is in **`CHANGELOG.md`** (dated entries under "Unreleased — v2.0").

---

## 6. OPEN — next task (user is not happy with current deck templates)

> User request (current): *"use /design-review and /top-design to do a pass at making world-class deck templates. I'm not happy with those results."*

**Goal:** elevate the deck's slide **templates / layouts** to award-quality (Awwwards / top-agency level) while staying inside the strict black/white/yellow + Arena/Syne brand box. This is a **design-quality pass on the slide renderers/CSS**, not new content.

Suggested approach when resuming:
- Run **`/design-review`** (gstack — designer's-eye QA: spacing, hierarchy, AI-slop patterns) against the live deck slides, and **`/top-design`** (ux-design skill — dramatic typography, purposeful motion, scroll composition) for the elevation direction.
- Likely focus areas (candidates, confirm with user): the landing/divider template, the statement template, the pillar grids, type-scale, and overall vertical rhythm / scroll choreography.
- Keep the V.1 dark logo grid and the 9-item V.2 fixes intact unless the redesign explicitly supersedes them.
- Verify every visual change via the **browse-binary workflow in §2** (not Claude_Preview), then bump cache + update CHANGELOG.

---

## 7. Deploy / workflow notes

- **GitHub Pages**, served from `main` / root. After a deploying push, Pages rebuilds in ~1 min.
- **Pushing to `main` requires explicit user authorization** (the safety classifier blocks direct pushes to the default branch otherwise). Commit locally freely; ask before `git push`.
- Per user's standing preference: **after every deploying push, reply with the cache-busted live link** (`?fresh=<version>`).
- Commit message convention ends with: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

---

## 8. Key files quick-reference

| File | Role |
|---|---|
| `index.html` | shell — nav, `#deck`, footer ("Brand Playbook v2 (in progress)"), versioned imports |
| `data/slides.js` | `SLIDES` content + config constants |
| `data/logos.js` | `LOGO_SVGS` official marks (inline) |
| `js/app.js` | `R` renderers + interactions (scroll, reveal, downloads) |
| `css/app.css` | tokens + `.slide--<kind>` styles |
| `type-tool.html` | standalone Arena typesetter/exporter (now with align control); embedded via iframe on the Type "Try it" slide |
| `logo-comps.html` | scratch review page — 4 logo treatments (D is live) |
| `assets/` | fonts (`Arena-Regular.otf`), `vendor/opentype.min.js`, logo SVGs, imagery, MOVIES mp4s |
| `CHANGELOG.md` | dated change log (source of truth for iteration history) |
