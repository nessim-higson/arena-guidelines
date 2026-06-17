/* ============================================================
   THE ARENA — PLAYBOOK CONTENT MODEL
   Every slide of the static playbook, in order.
   `kind` selects how it renders (see js/app.js).
   Edit copy/order here — no markup changes needed.
   Image slides reference faithful deck renders in assets/slides/.
   ============================================================ */

export const RING_TOOL_URL = "https://nessim-higson.github.io/the-arena/arena-rings-engine.html";

// standalone Arena type tool (typeset + export SVG/PNG/JPG) — embedded + linked
export const TYPE_TOOL_URL = "./type-tool.html?v=58";

// cover background — animated gifs cycled behind the wordmark (add more freely)
export const COVER_GIFS = ["assets/cover/cover-1.gif", "assets/cover/cover-2.gif", "assets/cover/cover-3.gif"];

// nested rounded-rectangle "portal" mark, stroked (stadium / screen / frame / portal)
export const PORTAL_SVG = `
<svg class="portal-mark" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="4"  y="4"  width="192" height="112" rx="26" stroke="currentColor" stroke-width="8"/>
  <rect x="34" y="28" width="132" height="64"  rx="18" stroke="currentColor" stroke-width="8"/>
  <rect x="68" y="46" width="64"  height="28"  rx="9"  stroke="currentColor" stroke-width="8"/>
</svg>`;

const img = (n) => `assets/slides/p-${String(n).padStart(2, "0")}.png`;

export const SLIDES = [
  // ---------- COVER ----------
  { id: "cover", ch: "cover", kind: "cover" },

  // ---------- 04 VISUAL IDENTITY ----------
  { id: "ch04", ch: "identity", kind: "landing", eyebrow: "01 — Identity", display: "VISUAL IDENTITY", light: true,
    body: ["The Arena identity is a small, disciplined set of parts — the symbol, the wordmark, and their lockups. Everything else is built from these."],
    index: [
      { n: "01", name: "The logo", to: "lockups" },
      { n: "02", name: "Clearspace", to: "safe-area" },
      { n: "03", name: "Misuse", to: "best-practices" },
      { n: "04", name: "The symbol", to: "icon-mark" },
      { n: "05", name: "Construction", to: "symbol-construction" },
      { n: "06", name: "Minimum size", to: "min-size" },
      { n: "07", name: "Scaling", to: "scaling" }
    ] },

  { id: "logo", ch: "identity", kind: "statement", label: "Visual Identity", display: "LOGO",
    body: [
      "The Arena wordmark combines hard geometry with softened curves to create a symbol that feels both precise and cinematic.",
      "Our mark is simultaneously a stadium, screen, frame, and portal — reflecting Arena's role as a gateway into worlds of action and spectacle."
    ] },

  { id: "lockups", ch: "identity", kind: "lockups", label: "Logo Lockups" },

  { id: "safe-area", ch: "identity", kind: "safe-area", category: "LOGO", sub: "SAFE AREA",
    intro: "Always leave clear space on all sides of the logo, unoccupied by other elements, as shown." },

  { id: "best-practices", ch: "identity", kind: "best-practices", category: "LOGO", sub: "MISUSE",
    intro: "The logo is fixed artwork. Avoid the following — each example breaks its integrity." },

  { id: "icon", ch: "identity", kind: "statement", label: "Visual Identity", display: "ICON",
    body: [
      "The Arena mark transforms a simple rounded rectangle into a multi-layered symbol that simultaneously evokes a stadium, a screen, a cinematic frame, and a portal.",
      "Its nested forms create a sense of depth, motion, and immersion — reflecting Arena's ambition to transport audiences into worlds of action and spectacle."
    ] },

  { id: "icon-mark", ch: "identity", kind: "iconmark", label: "Arena Icon" },

  { id: "inspiration", ch: "identity", kind: "inspiration", label: "Logo Inspiration",
    intro: "The Arena logo is deceptively simple: a rounded rectangle, repeated, nested, and layered. Yet it carries multiple meanings.",
    items: [
      { t: "Arena",  d: "A bird's-eye view of a stadium. Concentric rings of seating surrounding a central field of play, where competition unfolds and potential is tested." },
      { t: "Screen", d: "A universal frame. The shape of the devices, broadcasts, and platforms through which modern audiences experience content." },
      { t: "Frame",  d: "A cinematic language of focus, composition, and capture. A nod to the craft and production values behind everything Arena creates." },
      { t: "Portal", d: "The mark functions as a portal. Its nested forms create depth, movement, and the sensation of being pulled into another world.", b: "A visual expression of action entertainment in motion." }
    ] },

  // ---------- IDENTITY SYSTEM (elements + scaling, Herman-Miller-tight) ----------
  { id: "elements-overview", ch: "identity", kind: "elements-overview",
    eyebrow: "9.1 — Identity Elements", title: "ELEMENTS OVERVIEW",
    intro: "The identity is a small, disciplined set of parts: the symbol, the wordmark, and their lockups. Everything else is built from these — and the symbol is always the supplied four-ring mark." },

  { id: "symbol-construction", ch: "identity", kind: "symbol-construction",
    eyebrow: "9.2 — Identity Elements", title: "SYMBOL CONSTRUCTION",
    intro: "The symbol is drawn, not decorated. Concentric rounded rectangles on a shared center, with a fixed relationship between radius, band and gap." },

  { id: "min-size", ch: "identity", kind: "min-size",
    eyebrow: "9.6 — Identity Elements", title: "MINIMUM SIZE",
    intro: "Floors that protect legibility in print and on screen. Shown here at actual size." },

  { id: "scaling", ch: "identity", kind: "scaling",
    eyebrow: "9.10 — Identity Elements", title: "SCALING PRINCIPLES",
    intro: "The mark scales as one locked unit — the same four-ring symbol at every size, from billboard to favicon. It is never stretched, redrawn, or altered." },

  // ---------- TYPE ----------
  { id: "typeface", ch: "type", kind: "landing", eyebrow: "02 — Type", display: "TYPEFACE", light: true,
    body: [
      "Arena is a cinematic display typeface built around modular precision, controlled aggression, and architectural clarity. Designed for title systems, motion, and entertainment branding, it balances muscular geometry with refined optical curves to create a bold but premium voice."
    ],
    index: [
      { n: "01", name: "Try it", to: "arena-examples" },
      { n: "02", name: "Arena", to: "arena-type" },
      { n: "03", name: "Anatomy", to: "type-anatomy" },
      { n: "04", name: "Syne", to: "syne-type" },
      { n: "05", name: "Hierarchy", to: "hierarchy" },
      { n: "06", name: "Type scale", to: "type-scale" },
      { n: "07", name: "Arena + IP", to: "arena-ip" }
    ] },

  { id: "arena-examples", ch: "type", kind: "arena-examples", label: "Arena Typeface — Interactive" },

  { id: "arena-type", ch: "type", kind: "arena-specimen", label: "Arena Typeface" },

  { id: "type-anatomy", ch: "type", kind: "type-anatomy", label: "Arena Typeface — Anatomy" },

  { id: "syne-type", ch: "type", kind: "syne-specimen", label: "Syne Typeface" },

  { id: "hierarchy", ch: "type", kind: "hierarchy", label: "Typeface Hierarchy" },

  { id: "type-scale", ch: "type", kind: "type-scale", eyebrow: "01 — Typography", title: "TYPE SCALE",
    intro: "Modular scale at 1.25 off a 16px base. Arena is display-only and uppercase-only — there are no lowercase glyphs in the cut, and it never sets below 39px. Syne carries every heading, body and lowercase need.",
    rows: [
      { tok: "display-xl", spec: "Arena · 97.6px · LH .95", cls: "is-arena", size: 97.6, lh: 0.95, ls: "-0.02em", t: "ARENA" },
      { tok: "display-l",  spec: "Arena · 78.1px · LH .98", cls: "is-arena", size: 78.1, lh: 0.98, ls: "-0.02em", t: "ENTER" },
      { tok: "display-m",  spec: "Arena · 48.8px",          cls: "is-arena", size: 48.8, lh: 1,    ls: "-0.01em", t: "WHERE STORIES" },
      { tok: "display-s",  spec: "Arena · 39px · min safe",  cls: "is-arena", size: 39,   lh: 1.05, ls: "-0.01em", t: "ARE FORGED" },
      { tok: "head-l",     spec: "Syne Bold · 31.3px",       cls: "is-syne-b", size: 31.3, lh: 1.1,  ls: "0", t: "Where stories are forged" },
      { tok: "head-m",     spec: "Syne Bold · 25px",         cls: "is-syne-b", size: 25,   lh: 1.15, ls: "0", t: "Section heading" },
      { tok: "head-s",     spec: "Syne Bold · 20px",         cls: "is-syne-b", size: 20,   lh: 1.2,  ls: "0", t: "Strong label" },
      { tok: "body-l",     spec: "Syne Reg · 18px",          cls: "is-syne-r", size: 18,   lh: 1.5,  ls: "0", t: "A stage for transformation. Open to all with the courage to step inside." },
      { tok: "body-m",     spec: "Syne Reg · 16px",          cls: "is-syne-r", size: 16,   lh: 1.55, ls: "0", t: "It is where stories are forged, and characters tested, shaped, and pushed to the edge." },
      { tok: "body-s",     spec: "Syne Reg · 14px",          cls: "is-syne-r", size: 14,   lh: 1.5,  ls: "0.005em", t: "Captions and secondary information sit here, quietly supporting the work." },
      { tok: "mono-xs",    spec: "Syne Reg · 12px · tracked", cls: "is-syne-r is-track", size: 12, lh: 1.4, ls: "0.04em", t: "VISUAL IDENTITY — METADATA LABEL" }
    ] },

  { id: "arena-ip", ch: "type", kind: "statement", label: "Visual Identity", display: "ARENA + IP", soon: "More to come",
    body: ["Co-branding lockups pair The Arena with partner IP — balancing each property's equity with Arena's system."] },

  { id: "arena-ip-gallery", ch: "type", kind: "gallery", label: "Arena + IP",
    title: "Arena + IP", lead: "Co-branding with partner properties.",
    body: "Lockups pair The Arena with partner IP — balancing each property's equity with Arena's system. Key art, posters and social, shown here with Metal Slug.",
    images: [img(65), img(14), img(66), img(15), img(68), img(67)] },

  // ---------- COLOR ----------
  { id: "color-intro", ch: "color", kind: "landing", eyebrow: "03 — Color", display: "COLOR", light: true,
    body: ["Our color approach prioritizes elegance, restraint, and timelessness. The palette is intentionally neutral so that, like a gallery, it serves as a blank slate — creating a visual language that enhances our content rather than competes with it."],
    index: [
      { n: "01", name: "Palette", to: "color" },
      { n: "02", name: "Using color", to: "color-usage" },
      { n: "03", name: "How yellow injects", to: "inject-scale" },
      { n: "04", name: "Dial the signal", to: "inject-demo" },
      { n: "05", name: "Signal flood", to: "flood" },
      { n: "06", name: "Tonal range", to: "tonal-range" },
      { n: "07", name: "Image-led palette", to: "image-color" }
    ] },

  { id: "color", ch: "color", kind: "color", label: "Brand Color",
    colors: [
      { name: "Black",  hex: "#000000", pms: "Black C",  cmyk: "93, 88, 89, 80", rgb: "0, 0, 0",       fg: "#ffffff" },
      { name: "White",  hex: "#FFFFFF", pms: "000 C",    cmyk: "0, 0, 0, 0",     rgb: "255, 255, 255", fg: "#000000" },
      { name: "Yellow", hex: "#FAFF00", pms: "3945 C",   cmyk: "10, 0, 100, 0",  rgb: "250, 255, 0",   fg: "#000000" }
    ] },

  { id: "color-usage", ch: "color", kind: "color-usage", eyebrow: "04 — Color", title: "USING COLOR",
    intro: "The system is monochrome by design — black and white do the work so the content leads. Yellow is the single signal: one accent moment per view, never a surface, never on white.",
    cells: [
      { bg: "#000000", fg: "#ffffff", border: true, demo: "Aa", cap: "Black — surface", note: "The default canvas. Lets imagery and type carry every page." },
      { bg: "#ffffff", fg: "#000000", demo: "Aa", cap: "White — type & marks", note: "Primary text, wordmark and the portal mark. Maximum contrast." },
      { bg: "#faff00", fg: "#000000", demo: "Aa", cap: "Yellow — signal only", note: "One highlight per view: a tag, a focus state, a single call-out. Black text on yellow only." }
    ],
    proportion: [
      { c: "#000000", pct: 78, label: "Black 78", fg: "#fff" },
      { c: "#ffffff", pct: 19, label: "White 19", fg: "#000" },
      { c: "#faff00", pct: 3, label: "Yellow 3", fg: "#000" }
    ],
    do: [
      "Default to black surfaces — let imagery and type lead.",
      "Use white for text, marks and structure.",
      "Reserve yellow for a single signal moment per view.",
      "Put black text on yellow, never white.",
      "Lean on negative space instead of adding color."
    ],
    dont: [
      "Fill surfaces or large areas with yellow.",
      "Place yellow on white (fails contrast and brand).",
      "Introduce a second accent or tinted greys.",
      "Use more than one yellow moment in a single view.",
      "Stack borders, shadows and fills as separation at once."
    ] },

  { id: "inject-scale", ch: "color", kind: "inject-scale",
    eyebrow: "04 — Color", title: "HOW YELLOW INJECTS",
    intro: "Yellow is the only voice that interrupts the black and white — so how it enters matters. It works as a deliberate scale, from the quietest hairline to a full surface. Use the smallest level that does the job." },

  { id: "inject-demo", ch: "color", kind: "inject-demo",
    eyebrow: "04 — Color", title: "DIAL THE SIGNAL",
    intro: "One module, four levels of injection. Drag from restrained to dominant — the system holds either way. Black stays the foundation; yellow earns its moment." },

  { id: "flood", ch: "color", kind: "flood", label: "Color — Signal", display: "YELLOW IS\nA SIGNAL",
    note: "As a surface, yellow is loud by design. Reserve the flood for one high-impact beat — a divider, a launch, a call to act — and always set type in black." },

  { id: "tonal-range", ch: "color", kind: "tonal-range", label: "Color",
    eyebrow: "04 — Color", title: "TONAL RANGE",
    intro: "The core is grounded in black and white with a neutral ramp between them, plus yellow as the single signal. Scrub across the range — each band reveals its name and value.",
    bands: [
      { name: "Black",    hex: "#000000" },
      { name: "Carbon",   hex: "#0C0C10" },
      { name: "Graphite", hex: "#1F1F24" },
      { name: "Iron",     hex: "#2C2C33" },
      { name: "Slate",    hex: "#4A4A52" },
      { name: "Ash",      hex: "#6B6B73" },
      { name: "Mist",     hex: "#9A9AA2" },
      { name: "Fog",      hex: "#C9C9D0", light: true },
      { name: "White",    hex: "#FFFFFF", light: true },
      { name: "Yellow",   hex: "#FAFF00", light: true }
    ] },

  { id: "image-color", ch: "color", kind: "image-color", label: "Color in Context",
    eyebrow: "04 — Color", title: "IMAGE DIRECTS THE PALETTE",
    intro: "On its own the system is monochrome — but its secondary color comes from the work. Colors are pulled straight from the IP's imagery, never overpowering it. Pick a source: the field floods with the tone sampled from its pixels, and the swatches below are read live from the image.",
    sources: [
      { name: "Metal Slug", img: img(65),         note: "Desert ops — pulled from the key art", fallback: { tone: "#9a7d4e", ink: "#000000", acc: "#caa24a" } },
      { name: "Portrait",   img: "assets/extracted/pg19-002.png", note: "Grit & presence — pulled from skin and blood", fallback: { tone: "#5a3b34", ink: "#ffffff", acc: "#b54a3a" } },
      { name: "Anime",      img: "assets/extracted/pg21-001.png", note: "Kinetic fire — pulled from the embers", fallback: { tone: "#6b3a1e", ink: "#ffffff", acc: "#ff7a2a" } },
      { name: "Swagger",    img: "assets/extracted/pg22-000.png", note: "Street warmth — pulled from the scene", fallback: { tone: "#7a5a3a", ink: "#ffffff", acc: "#c98a4a" } }
    ] },

  // ---------- IMAGERY ----------
  { id: "imagery", ch: "imagery", kind: "landing", eyebrow: "04 — Imagery", display: "IMAGERY", light: true,
    body: ["Although our IP and the imagery that comes from it is paramount, the following slides give guidance on the types of imagery we gravitate towards — defining our attitude, confidence and energy."],
    index: [
      { n: "01", name: "Anime", to: "anime" },
      { n: "02", name: "Swagger", to: "swagger" },
      { n: "03", name: "Humor", to: "humor" },
      { n: "04", name: "Portraits", to: "portraits" },
      { n: "05", name: "Camera", to: "camera" }
    ] },

  { id: "anime", ch: "imagery", kind: "pillar", category: "EDGE", sub: "ANIME",
    lead: "Anime is foundational to Arena's DNA.",
    body: "Anime embodies heightened emotion, kinetic action and unapologetic intensity. It reminds us that stories become memorable when they push beyond realism into feeling. We draw from anime's visual language to bring urgency, contrast and expressive energy into the Arena world.",
    items: [
      { img: "assets/extracted/pg21-000.png", pos: "top", lines: ["Extreme emotion and physicality.", "Characters pushed to their breaking point.", "Intensity over restraint."] },
      { img: "assets/extracted/pg21-002.png", pos: "bottom", lines: ["Style fused with attitude.", "Individuality expressed through silhouette and composition.", "Coolness that feels effortless rather than manufactured."] },
      { img: "assets/extracted/pg21-001.png", pos: "top", lines: ["Scale, momentum and spectacle.", "High-stakes action viewed through a cinematic lens.", "Relentless forward motion."] }
    ] },

  { id: "swagger", ch: "imagery", kind: "pillar", category: "AURA", sub: "SWAGGER",
    lead: "Swagger is confidence without effort.",
    body: "Arena embraces imagery with self-possession, tension and attitude. The best images feel cool because they are unconcerned with appearing cool. They project confidence through composition, character and unexpected choices.",
    items: [
      { img: "assets/extracted/pg22-000.png", pos: "bottom", lines: ["Contradiction creates intrigue.", "Calm presence amid chaos.", "Confidence through individuality."] },
      { img: "assets/extracted/pg22-001.png", pos: "bottom", lines: ["Mastery performed casually.", "Precision made to look easy.", "Confidence backed by skill."] }
    ] },

  { id: "humor", ch: "imagery", kind: "pillar", category: "TONALITY", sub: "HUMOR",
    lead: "Humor keeps Arena human.",
    body: "We embrace humor that emerges from confidence, contrast and surprise. It should feel sharp, unexpected and self-aware rather than comedic for its own sake. The goal is personality, not parody.",
    items: [
      { img: "assets/extracted/pg23-000.png", pos: "bottom", lines: ["Serious stakes meeting absurd situations.", "Humor born from contrast.", "Self-awareness without losing intensity."] },
      { img: "assets/extracted/pg23-001.png", pos: "top", lines: ["Exaggeration pushed to its limit.", "Chaotic, confident and unforgettable.", "Entertainment can be fun without becoming frivolous."] },
      { img: "assets/extracted/pg23-002.png", pos: "bottom", lines: ["Unexpected visual collision.", "Action and absurdity existing simultaneously.", "Memorable because it shouldn't work."] }
    ] },

  { id: "portraits", ch: "imagery", kind: "pillar", category: "ATTITUDE / AESTHETIC", sub: "PORTRAITS",
    lead: "Our portraits carry presence.",
    body: "We seek faces with character, individuality and emotional weight. Texture, imperfection and lived experience matter more than polish. These images should feel confident, distinctive and impossible to overlook.",
    items: [
      { img: "assets/extracted/pg19-000.png", pos: "top", lines: ["Unfiltered personality.", "Fashion, humor and confidence coexist.", "Feels contemporary and self-aware."] },
      { img: "assets/extracted/pg19-003.png", pos: "bottom", lines: ["Defiance and individuality.", "Raw energy captured honestly.", "A person impossible to ignore."] },
      { img: "assets/extracted/pg19-002.png", pos: "top", lines: ["Texture and vulnerability.", "Beauty found in imperfection.", "Emotional presence over perfection."] }
    ] },

  { id: "camera", ch: "imagery", kind: "pillar", category: "CRAFT", sub: "CAMERA ANGLES",
    lead: "Our worlds are captured with intent.",
    body: "Arena favors dynamic perspectives that create tension, momentum and scale. Extreme framing, unconventional viewpoints and immersive compositions make the audience feel like participants rather than observers.",
    items: [
      { img: "assets/extracted/pg20-000.png", pos: "bottom", lines: ["Places the viewer inside the moment.", "Physical proximity creates intensity.", "Action experienced rather than witnessed."] },
      { img: "assets/extracted/pg20-002.png", pos: "bottom", lines: ["Unexpected perspective.", "Reveals scale, geometry and spectacle.", "Turns a familiar scene into something iconic."] },
      { img: "assets/extracted/pg20-001.png", pos: "top", lines: ["Momentum directed toward the viewer.", "Creates urgency and movement.", "Feels immediate and cinematic."] }
    ] },

  // ---------- MATERIAL ----------
  { id: "material", ch: "material", kind: "landing", eyebrow: "05 — Material", display: "MATERIAL", light: true,
    body: [
      "Arena's material language balances refinement with tension, pairing industrial surfaces and architectural forms with softer atmospheric treatments. Matte finishes, metal textures, thermal gradients, shadow, blur, and layered depth create a world that feels engineered, cinematic, and charged with energy."
    ],
    index: [
      { n: "01", name: "Material studies", to: "material-gallery" }
    ] },

  { id: "material-gallery", ch: "material", kind: "gallery", label: "Material",
    title: "Material Studies", lead: "Engineered, cinematic, charged with energy.",
    body: "Industrial surfaces and architectural forms meet softer atmospheric treatments — matte finishes, metal textures, thermal gradients, shadow, blur and layered depth.",
    images: [img(26), img(25), img(28), img(27), img(57)] },

  // ---------- SYSTEM + RING TOOL ----------
  { id: "system", ch: "system", kind: "landing", eyebrow: "06 — System", display: "SYSTEM", light: true,
    body: ["Arena is designed as a flexible visual system where typography, motion, color, imagery, and form work together to create a cohesive world that can expand across platforms, IP, and experiences while maintaining a distinct point of view."],
    index: [
      { n: "01", name: "Radius", to: "radius" },
      { n: "02", name: "Spacing", to: "spacing" },
      { n: "03", name: "Primitives", to: "primitives" },
      { n: "04", name: "Mark scale", to: "mark-scale" },
      { n: "05", name: "Mark build", to: "mark-build" },
      { n: "06", name: "Ring tool", to: "ringtool" },
      { n: "07", name: "Motif", to: "motif" },
      { n: "08", name: "Hatch", to: "hatch" },
      { n: "09", name: "Posters", to: "posters" },
      { n: "10", name: "Frames", to: "frames" }
    ] },

  { id: "radius", ch: "system", kind: "radius", eyebrow: "02 — Radius", title: "CORNER SYSTEM",
    intro: "The most brand-native scale: the mark is nested rounded rectangles, so radius is a primary token tier. Corners are always rounded; sharp 0px is reserved for full-bleed media only.",
    chips: [
      { r: 4,  name: "radius-xs · 4px",  use: "inputs, tags" },
      { r: 8,  name: "radius-s · 8px",   use: "buttons" },
      { r: 14, name: "radius-m · 14px",  use: "cards" },
      { r: 24, name: "radius-l · 24px",  use: "modals, hero" }
    ],
    note: "Mark-echo rule. For elements meant to read as an Arena frame, corner radius ≈ 10% of the shorter side (clamp(14px, 10%, 48px)), nested concentrically. Inner radius always smaller than outer so curves stay parallel — never crossing." },

  { id: "spacing", ch: "system", kind: "spacing", eyebrow: "03 — Spacing & Grid", title: "SPATIAL SCALE",
    intro: "8px base with a 4px half-step. Larger steps grow non-linearly so big architectural gaps feel intentional. 12-column grid, 24px gutter, 40px minimum margin. Negative space is a structural element.",
    steps: [
      { n: "3xs", px: 4 }, { n: "2xs", px: 8 }, { n: "xs", px: 12 }, { n: "s", px: 16 },
      { n: "m", px: 24 }, { n: "l", px: 40 }, { n: "xl", px: 64 }, { n: "2xl", px: 104 }, { n: "3xl", px: 168 }
    ] },

  { id: "primitives", ch: "system", kind: "primitives", eyebrow: "05 — Primitives", title: "COMPONENTS",
    intro: "Live primitives in Arena's register. Hover the buttons, focus the field — note the single sanctioned yellow moment on focus." },

  { id: "mark-scale", ch: "system", kind: "image", img: img(32), label: "System" },
  { id: "mark-build", ch: "system", kind: "image", img: img(33), label: "System" },

  { id: "ringtool", ch: "system", kind: "ringtool", label: "A Generator",
    title: "The Ring Tool",
    body: "A dynamic engine to create different variations of our logo mark as a key design element." },

  { id: "motif", ch: "system", kind: "image", img: img(35), label: "System" },
  { id: "hatch", ch: "system", kind: "image", img: img(36), label: "System" },
  { id: "posters", ch: "system", kind: "image", img: img(37), label: "System" },
  { id: "frames", ch: "system", kind: "image", img: img(38), label: "System" },

  // ---------- COMING-SOON CHAPTERS ----------
  { id: "ch05", ch: "motion", kind: "chapter", num: "05", title: "MOTION", soon: "This chapter is coming soon" },
  { id: "ch06", ch: "motion", kind: "chapter", num: "06", title: "MNEMONIC", soon: "This chapter is coming soon" },

  // ---------- BOILERPLATE ----------
  { id: "boilerplate", ch: "appendix", kind: "boilerplate", label: "Boilerplate", heading: "About The Arena",
    body: [
      "The Arena is an independent studio creating global franchises inspired by the worlds of gaming, anime, and event action. With a world-class executive team, robust financing, and deep access to top-tier IP, it is uniquely equipped to build a modern fandom ecosystem.",
      "The Arena is a space for and by fans. It engages and expands committed fanbases through an always-on model of offerings — premium film and television, robust social media communities and content, experiential events, and consumer goods — committed to artistic ambition and excellence across its slate of blockbuster films and event series.",
      "Producing and financing projects alongside renowned filmmakers and breakout talents, it aims to blend prestige-level quality with franchise scale, doing justice to some of the world's most beloved properties and their fans."
    ] },

  // ---------- APPENDIX / PROOF OF CONCEPT ----------
  { id: "appendix", ch: "appendix", kind: "appendix", title: "APPENDIX", sub: "PROOF OF CONCEPT" },

  { id: "treatments", ch: "appendix", kind: "gallery", label: "Proof of Concept",
    title: "Logo Treatments", lead: "One mark, many materials.",
    body: "The mark and wordmark rendered across the material language — cast iron, oxidised metal, molten, chrome, stone, thermal and fabric emboss. Expressive range without losing the form.",
    images: [img(52), img(29), img(54), img(53), img(30), img(62), img(55), img(56), img(63), img(58), img(59), img(60), img(64)] },

  { id: "applications", ch: "appendix", kind: "gallery", label: "Proof of Concept",
    title: "Applications", lead: "The system in the world.",
    body: "Key marketing layouts and environments — big Arena display, gritty imagery, the portal pattern as structure.",
    images: [img(50), img(51), img(44), img(45)] },

  { id: "cards", ch: "appendix", kind: "gallery", label: "Business Cards",
    title: "Business Cards", lead: "Black stock, blind deboss, signal restraint.",
    body: "The portal mark embossed and line-etched on black — front and back. Markus Gerdemann, President, Brand & Marketing · enterthearena.com.",
    images: [img(49), img(46), img(47), img(48)] }
];

// chapters for the top nav (label -> first slide id to scroll to)
export const NAV = [
  { label: "Cover", target: "cover" },
  { label: "Identity", target: "ch04" },
  { label: "Type", target: "typeface" },
  { label: "Color", target: "color-intro" },
  { label: "Imagery", target: "imagery" },
  { label: "Material", target: "material" },
  { label: "System", target: "system" },
  { label: "Ring Tool", target: "ringtool" },
  { label: "Appendix", target: "appendix" }
];
