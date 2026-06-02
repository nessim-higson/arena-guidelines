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

  // ---------- IMAGERY ----------
  { id: "imagery", ch: "imagery", kind: "statement", label: "Visual Identity", display: "IMAGERY",
    body: ["Although our IP and the imagery that comes from it is paramount, the following slides give guidance on the types of imagery we gravitate towards — defining our attitude, confidence and energy."] },

  { id: "portraits", ch: "imagery", kind: "image", img: img(19), label: "Arena Foundations", caption: "Portraits — our portraits carry presence." },
  { id: "camera", ch: "imagery", kind: "image", img: img(20), label: "Arena Foundations", caption: "Camera Angles — captured with intent." },
  { id: "anime", ch: "imagery", kind: "image", img: img(21), label: "Arena Foundations", caption: "Anime — foundational to Arena's DNA." },
  { id: "swagger", ch: "imagery", kind: "image", img: img(22), label: "Arena Foundations", caption: "Swagger — confidence, not performance." },
  { id: "humor", ch: "imagery", kind: "image", img: img(23), label: "Arena Foundations", caption: "Humor — personality under pressure." },

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
