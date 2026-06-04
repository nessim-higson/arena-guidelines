# The Arena — Brand Playbook · Changelog

Interactive brand playbook for The Arena.
Live: https://nessim-higson.github.io/arena-guidelines/

**Versioning** — each release is tagged in git (`v1.0`, `v2.0`, …). Work in progress is
logged under the top **Unreleased** section and rolled into the next version when it is cut.
(The `?v=NN` query string on the assets is a separate cache-buster, not the product version.)

---

## Unreleased — v2.0 (in progress)

- **2026-06-04** — Opened v2 line: footer marked "v2 (in progress)"; began logging each iteration here.

_Next iterations are logged here as they land._

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
