/* ============================================================
   THE ARENA — PLAYBOOK CONTENT MODEL
   Every slide of the static playbook, in order.
   `kind` selects how it renders (see js/app.js).
   Edit copy/order here — no markup changes needed.
   Image slides reference faithful deck renders in assets/slides/.
   ============================================================ */

export const RING_TOOL_URL = "https://nessim-higson.github.io/the-arena/arena-rings-engine.html";

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
  { id: "ch04", ch: "identity", kind: "chapter", num: "04", title: "VISUAL\nIDENTITY" },

  { id: "logo", ch: "identity", kind: "statement", label: "Visual Identity", display: "LOGO",
    body: [
      "The Arena wordmark combines hard geometry with softened curves to create a symbol that feels both precise and cinematic.",
      "Our mark is simultaneously a stadium, screen, frame, and portal — reflecting Arena's role as a gateway into worlds of action and spectacle."
    ] },

  { id: "lockups", ch: "identity", kind: "image", img: img(3), label: "Logo Lockups",
    note: "Horizontal · stacked · wordmark" },

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

  // ---------- TYPE ----------
  { id: "typeface", ch: "type", kind: "statement", label: "Visual Identity", display: "TYPEFACE", bg: img(7),
    body: [
      "Arena is a cinematic display typeface built around modular precision, controlled aggression, and architectural clarity.",
      "Designed for title systems, motion, and entertainment branding, it balances muscular geometry with refined optical curves to create a bold but premium visual voice."
    ] },

  { id: "type-anatomy", ch: "type", kind: "image", img: img(8), label: "", dark: true },

  { id: "arena-type", ch: "type", kind: "arena-specimen", label: "Arena Typeface" },

  { id: "arena-examples", ch: "type", kind: "arena-examples", label: "Arena Typeface — Examples" },

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

  { id: "ip-metalslug", ch: "type", kind: "image", img: img(14), label: "Arena + IP" },
  { id: "ip-deathvalley", ch: "type", kind: "image", img: img(15), label: "Arena + IP" },

  // ---------- COLOR ----------
  { id: "color-intro", ch: "color", kind: "statement", label: "Visual Identity", display: "COLOR", soon: "Coming soon",
    body: ["Our color approach prioritizes elegance, restraint, and timelessness. The palette is intentionally neutral so that, like a gallery, it serves as a blank slate — creating a visual language that enhances our content rather than competes with it."] },

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

  // ---------- IMAGERY ----------
  { id: "imagery", ch: "imagery", kind: "statement", label: "Visual Identity", display: "IMAGERY",
    body: ["Although our IP and the imagery that comes from it is paramount, the following slides give guidance on the types of imagery we gravitate towards — defining our attitude, confidence and energy."] },

  { id: "portraits", ch: "imagery", kind: "gallery", label: "Arena Foundations", title: "Portraits",
    lead: "Our portraits carry presence.",
    body: "We look for faces with grit, individuality and emotional weight. Imperfection, texture and attitude matter more than polish — the image should feel lived-in, confident and unforgettable.",
    images: ["pg19-000", "pg19-002", "pg19-003"] },
  { id: "camera", ch: "imagery", kind: "gallery", label: "Arena Foundations", title: "Camera Angles",
    lead: "Our worlds are captured with intent.",
    body: "Dynamic framing, extreme perspectives and overhead compositions create tension, momentum and scale. The camera should never feel passive — it should feel pulled into the action.",
    images: ["pg20-000", "pg20-001", "pg20-002"] },
  { id: "anime", ch: "imagery", kind: "gallery", label: "Arena Foundations", title: "Anime",
    lead: "Anime is foundational to Arena's DNA.",
    body: "We gravitate toward imagery that feels sharp, kinetic and emotionally charged. High contrast, exaggerated motion and iconic character energy define our attitude and visual intensity.",
    images: ["pg21-000", "pg21-001", "pg21-002"] },
  { id: "swagger", ch: "imagery", kind: "gallery", label: "Arena Foundations", title: "Swagger",
    lead: "Swagger is earned through confidence, not performance.",
    body: "We gravitate toward imagery with attitude, tension and self-possession. Unexpected styling, cinematic composition and moments of controlled cool shape Arena's energy.",
    images: ["pg22-000", "pg22-001"] },
  { id: "humor", ch: "imagery", kind: "gallery", label: "Arena Foundations", title: "Humor",
    lead: "Arena embraces humor with edge.",
    body: "We gravitate toward imagery that feels unexpected, chaotic and self-aware without losing intensity. Absurdity, contrast and exaggeration can coexist with action and confidence. The goal is not parody — it is personality under pressure.",
    images: ["pg23-000", "pg23-001", "pg23-002"] },

  // ---------- MATERIAL ----------
  { id: "material", ch: "material", kind: "statement", label: "Visual Identity", display: "MATERIAL", bg: img(24),
    body: [
      "Arena's material language balances refinement with tension, pairing industrial surfaces and architectural forms with softer atmospheric treatments.",
      "Matte finishes, metal textures, thermal gradients, shadow, blur, and layered depth create a world that feels engineered, cinematic, and charged with energy."
    ] },

  { id: "mat-chrome", ch: "material", kind: "image", img: img(25), label: "Material" },
  { id: "mat-tunnels", ch: "material", kind: "image", img: img(26), label: "Material" },
  { id: "mat-sand", ch: "material", kind: "image", img: img(27), label: "Material" },
  { id: "mat-motion", ch: "material", kind: "image", img: img(28), label: "Material" },
  { id: "mat-treat1", ch: "material", kind: "image", img: img(29), label: "Material" },
  { id: "mat-treat2", ch: "material", kind: "image", img: img(30), label: "Material" },

  // ---------- SYSTEM + RING TOOL ----------
  { id: "system", ch: "system", kind: "statement", label: "Visual Identity", display: "SYSTEM",
    body: ["Arena is designed as a flexible visual system where typography, motion, color, imagery, and form work together to create a cohesive world that can expand across platforms, IP, and experiences while maintaining a distinct point of view."] },

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
  { id: "ch07", ch: "motion", kind: "chapter", num: "07", title: "MATERIALS", soon: "This chapter is coming soon" },

  // ---------- BOILERPLATE ----------
  { id: "boilerplate", ch: "appendix", kind: "boilerplate", label: "Boilerplate", heading: "About The Arena",
    body: [
      "The Arena is an independent studio creating global franchises inspired by the worlds of gaming, anime, and event action. With a world-class executive team, robust financing, and deep access to top-tier IP, it is uniquely equipped to build a modern fandom ecosystem.",
      "The Arena is a space for and by fans. It engages and expands committed fanbases through an always-on model of offerings — premium film and television, robust social media communities and content, experiential events, and consumer goods — committed to artistic ambition and excellence across its slate of blockbuster films and event series.",
      "Producing and financing projects alongside renowned filmmakers and breakout talents, it aims to blend prestige-level quality with franchise scale, doing justice to some of the world's most beloved properties and their fans."
    ] },

  // ---------- APPENDIX / PROOF OF CONCEPT ----------
  { id: "appendix", ch: "appendix", kind: "appendix", title: "APPENDIX", sub: "PROOF OF CONCEPT" },

  { id: "poc-grid", ch: "appendix", kind: "image", img: img(44), label: "Proof of Concept" },
  { id: "poc-frame", ch: "appendix", kind: "image", img: img(45), label: "Proof of Concept" },
  { id: "card-line", ch: "appendix", kind: "image", img: img(46), label: "Business Cards" },
  { id: "card-emboss", ch: "appendix", kind: "image", img: img(47), label: "Business Cards" },
  { id: "card-wordmark", ch: "appendix", kind: "image", img: img(48), label: "Business Cards" },
  { id: "card-hand", ch: "appendix", kind: "image", img: img(49), label: "Business Cards" },
  { id: "mkt-hithard", ch: "appendix", kind: "image", img: img(50), label: "Applications" },
  { id: "mkt-forged", ch: "appendix", kind: "image", img: img(51), label: "Applications" },
  { id: "treat-metal", ch: "appendix", kind: "image", img: img(52), label: "Treatments" },
  { id: "treat-flame", ch: "appendix", kind: "image", img: img(53), label: "Treatments" },
  { id: "treat-molten", ch: "appendix", kind: "image", img: img(54), label: "Treatments" },
  { id: "treat-stone", ch: "appendix", kind: "image", img: img(55), label: "Treatments" },
  { id: "treat-fabric", ch: "appendix", kind: "image", img: img(56), label: "Treatments" },
  { id: "poc-tunnels", ch: "appendix", kind: "image", img: img(57), label: "Proof of Concept" },
  { id: "poc-enter", ch: "appendix", kind: "image", img: img(58), label: "Proof of Concept" },
  { id: "poc-the", ch: "appendix", kind: "image", img: img(59), label: "Proof of Concept" },
  { id: "poc-fabric", ch: "appendix", kind: "image", img: img(60), label: "Proof of Concept" },
  { id: "poc-liquid", ch: "appendix", kind: "image", img: img(62), label: "Proof of Concept" },
  { id: "poc-thermal", ch: "appendix", kind: "image", img: img(63), label: "Proof of Concept" },
  { id: "poc-fabric2", ch: "appendix", kind: "image", img: img(64), label: "Proof of Concept" },
  { id: "ip-keyart", ch: "appendix", kind: "image", img: img(65), label: "Arena + IP" },
  { id: "ip-llamas", ch: "appendix", kind: "image", img: img(66), label: "Arena + IP" },
  { id: "ip-social", ch: "appendix", kind: "image", img: img(67), label: "Arena + IP" },
  { id: "ip-posters", ch: "appendix", kind: "image", img: img(68), label: "Arena + IP" }
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
