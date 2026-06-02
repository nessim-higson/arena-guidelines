# The Arena — Interactive Brand Playbook

A living, interactive version of The Arena brand playbook. Black / white / yellow,
Arena + Syne type, the nested **portal** mark, and the live **Ring Tool**.

**Zero build. No frameworks. No compile step.** Plain HTML, CSS, and ES modules —
drop these files on any web server and it runs.

## Run locally

```bash
python3 -m http.server 4180
# open http://localhost:4180
```

(or any static server — `npx serve`, VS Code Live Server, etc.)

## Structure

```
index.html            # shell + nav
css/app.css           # design system — ALL tokens (color, type, spacing) live at the top
data/slides.js        # every slide's content, in order — edit copy here
js/app.js             # renderer + interactions (color copy, scroll-spy, reveal)
assets/
  slides/             # faithful 1:1 renders of each playbook page (p-01…p-68)
  svg/                # portal mark + wordmark (vector)
  fonts/              # Arena custom display face (WIP)
```

## How to edit

- **Colors / type / spacing** → top of [`css/app.css`](css/app.css) (`:root` tokens). Change once, cascades everywhere.
- **Copy, slide order, new slides** → [`data/slides.js`](data/slides.js). Each entry has a `kind` (`statement`, `image`, `color`, `chapter`, `ringtool`, …).
- **Swap a deck image for a higher-res / cleared version** → replace the file in `assets/slides/` (keep the name) or point a slide's `img` at a new path.

## The Ring Tool

The "A Generator" slide embeds the live engine via iframe:

```
https://nessim-higson.github.io/the-arena/arena-rings-engine.html
```

It always reflects the latest deployed engine. To point at a different build,
edit `RING_TOOL_URL` at the top of [`data/slides.js`](data/slides.js).

## Deploy

Static files only — host anywhere (GitHub Pages, Netlify, S3, your own server).
`.nojekyll` is included so GitHub Pages serves the files verbatim.

## Notes

- **Type**: **Arena** (custom display, WIP) + **Syne** (Google Fonts, loaded via CDN).
- **Imagery**: the `assets/slides/` renders are taken from the working playbook deck.
  Some are third-party film/anime/game stills used as mood reference — replace with
  owned/licensed art before any public/commercial use.
- Marked **WIP** throughout to match the source deck.
