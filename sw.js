// Decrypts a password-protected guideline book on enterthearena.com/playbook/<book>/ (tools/playbook/build.mjs).
// Every file here except index.html (the gate), sw.js and og.png is AES-GCM ciphertext: 12-byte IV, then data.
// The key lives in IndexedDB, put there by the gate; without it requests pass through and the gate shows.
const SCOPE = new URL("./", self.location).pathname;
const PLAIN = new Set(["sw.js", "og.png"]);
const TYPES = { html: "text/html; charset=utf-8", js: "text/javascript; charset=utf-8", css: "text/css; charset=utf-8",
  json: "application/json", svg: "image/svg+xml", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
  webp: "image/webp", gif: "image/gif", mp4: "video/mp4", webm: "video/webm", woff2: "font/woff2", otf: "font/otf",
  ttf: "font/ttf", pdf: "application/pdf", zip: "application/zip", ai: "application/postscript" };

const idb = mode => new Promise((ok, no) => {
  const r = indexedDB.open("arena-playbook", 1);
  r.onupgradeneeded = () => r.result.createObjectStore("k");
  r.onsuccess = () => ok(r.result.transaction("k", mode).objectStore("k"));
  r.onerror = () => no(r.error);
});
const req = r => new Promise((ok, no) => { r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); });
let key = null;
const getKey = async () => key || (key = await req((await idb("readonly")).get("key")).catch(() => null));
const forget = async () => { key = null; await req((await idb("readwrite")).delete("key")).catch(() => {}); };

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("message", e => { if (e.data === "reset") key = null; });

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
  const rel = decodeURIComponent(url.pathname.slice(SCOPE.length));
  if (PLAIN.has(rel.split("/").pop())) return;
  // a folder without its slash (/playbook/kof): add it, so the page's relative links resolve
  if (e.request.mode === "navigate" && rel && !rel.endsWith("/") && !/\.[a-z0-9]+$/i.test(rel))
    return e.respondWith(Response.redirect(url.pathname + "/" + url.search, 301));
  e.respondWith(serve(e.request, rel));
});

async function serve(request, rel) {
  const k = await getKey();
  if (!k) return fetch(request);
  // Any folder's page (the playbook or a book under it) is that folder's book.bin, so one worker at /playbook/ serves them all.
  const page = rel === "" || rel.endsWith("/") || rel === "index.html" || rel.endsWith("/index.html");
  const r = await fetch(SCOPE + (page ? rel.replace(/index\.html$/, "") + "book.bin" : rel), { cache: "no-cache" });
  if (!r.ok) return page ? fetch(request) : r;   // never strand a reader on an error page: fall back to the gate
  const buf = await r.arrayBuffer();
  let body;
  try {
    body = await crypto.subtle.decrypt({ name: "AES-GCM", iv: buf.slice(0, 12) }, k, buf.slice(12));
  } catch {
    // a sealed page that will not open means the password changed since this browser unlocked: drop the key, show the gate
    if (page) { await forget(); return fetch(request, { cache: "no-cache" }); }
    return new Response(buf, { status: r.status, headers: r.headers });   // a plain file (sw.js, og.png, a gate) passes through
  }
  const ext = (page ? "html" : rel.split(".").pop() || "").toLowerCase();
  const headers = { "content-type": TYPES[ext] || "application/octet-stream", "accept-ranges": "bytes" };
  // Safari only plays video that answers byte ranges
  const range = /bytes=(\d*)-(\d*)/.exec(request.headers.get("range") || "");
  if (range) {
    const size = body.byteLength, start = range[1] ? +range[1] : Math.max(0, size - +range[2]),
      end = range[1] && range[2] ? Math.min(+range[2], size - 1) : size - 1;
    return new Response(body.slice(start, end + 1), { status: 206,
      headers: { ...headers, "content-range": `bytes ${start}-${end}/${size}`, "content-length": String(end - start + 1) } });
  }
  return new Response(body, { headers });
}
