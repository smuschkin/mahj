#!/usr/bin/env node
/**
 * MAHJ Social Media Posts — Series 2 (v7)
 *
 * - Tiles frame the border with VARIED sizes + opacities for depth
 * - Each post has a unique tile arrangement (no two identical layouts)
 * - Dark green only (gold was too washed out)
 * - Medium feature tile option for some posts (not a giant hero)
 * - Tiles feel integrated into the felt table, not pasted on
 *
 * Usage:  node web/scripts/generate-social-v2.mjs
 * NEVER overwrites existing files.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const socialDir = join(root, "..", "social media");
const tilesDir = join(root, "public", "tiles");

const W = 1080;
const H = 1350;
const TW = 160;
const TH = 215;
const CX = W / 2;

/* ═══ DRAGON IMAGES ═══ */
const RED_DRAGON_URI = `data:image/png;base64,${readFileSync(join(tilesDir, "red-dragon.png")).toString("base64")}`;
const GREEN_DRAGON_URI = `data:image/png;base64,${readFileSync(join(tilesDir, "green-dragon.png")).toString("base64")}`;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
}

/* ═══ SVG DEFS ═══ */
const DEFS = `<defs>
  <!-- Dark green felt -->
  <radialGradient id="dkBg" cx="50%" cy="42%" r="60%">
    <stop offset="0%" stop-color="#2D7A4E"/>
    <stop offset="45%" stop-color="#1A5535"/>
    <stop offset="100%" stop-color="#0C2E1A"/>
  </radialGradient>
  <radialGradient id="hgGreen" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#3A8C5C" stop-opacity="0.3"/>
    <stop offset="100%" stop-color="#1A5535" stop-opacity="0"/>
  </radialGradient>
  <!-- Warm cream/sand -->
  <radialGradient id="beigeBg" cx="50%" cy="42%" r="60%">
    <stop offset="0%" stop-color="#E8DFC8"/>
    <stop offset="45%" stop-color="#DDD2B4"/>
    <stop offset="100%" stop-color="#C8BA96"/>
  </radialGradient>
  <radialGradient id="hgBeige" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#F0E8D4" stop-opacity="0.35"/>
    <stop offset="100%" stop-color="#DDD2B4" stop-opacity="0"/>
  </radialGradient>
  <filter id="ts" x="-25%" y="-20%" width="160%" height="150%">
    <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000" flood-opacity="0.3"/>
  </filter>
  <!-- Stronger shadow for beige backgrounds -->
  <filter id="tsB" x="-25%" y="-20%" width="160%" height="150%">
    <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#000" flood-opacity="0.45"/>
  </filter>
  <radialGradient id="dot1ball" cx="0.35" cy="0.35" r="0.65">
    <stop offset="0%" stop-color="#E74C3C"/>
    <stop offset="100%" stop-color="#8B1F18"/>
  </radialGradient>
  <radialGradient id="rdot" cx="0.35" cy="0.35" r="0.55">
    <stop offset="0%" stop-color="#E74C3C"/><stop offset="58%" stop-color="#8B1F18"/>
    <stop offset="65%" stop-color="#1A1A1A"/><stop offset="100%" stop-color="#1A1A1A"/>
  </radialGradient>
  <radialGradient id="gdot" cx="0.35" cy="0.35" r="0.55">
    <stop offset="0%" stop-color="#27AE60"/><stop offset="58%" stop-color="#145A32"/>
    <stop offset="65%" stop-color="#1A1A1A"/><stop offset="100%" stop-color="#1A1A1A"/>
  </radialGradient>
</defs>`;

const BG_GREEN = `<rect width="${W}" height="${H}" fill="url(#dkBg)"/>`;
const BG_BEIGE = `<rect width="${W}" height="${H}" fill="url(#beigeBg)"/>`;

/* ═══ TILE FACE ART ═══ */
const CF = "'Songti SC','Noto Serif CJK SC','STSong',serif";

const TILE_ART = {
  "1dot": () =>
    `<text x="16" y="34" font-family="Georgia,serif" font-size="28" font-weight="900" fill="#C0392B">1</text>` +
    `<svg x="15" y="38" width="130" height="130" viewBox="0 0 100 100">` +
    `<circle cx="50" cy="50" r="48" fill="#C0392B"/><circle cx="50" cy="50" r="42" fill="#FAF7EC"/>` +
    `<circle cx="50" cy="50" r="36" fill="#1A1A1A"/><circle cx="50" cy="50" r="30" fill="#FAF7EC"/>` +
    `<circle cx="50" cy="50" r="16" fill="url(#dot1ball)"/></svg>`,

  "1bam": () =>
    `<text x="16" y="34" font-family="Georgia,serif" font-size="28" font-weight="900" fill="#C0392B">1</text>` +
    `<svg x="8" y="28" width="144" height="175" viewBox="0 0 64 64">` +
    `<path d="M 38 36 Q 52 30 60 16" stroke="#C0392B" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    `<path d="M 38 38 Q 54 38 62 28" stroke="#2E86C1" stroke-width="2.5" stroke-linecap="round" fill="none"/>` +
    `<path d="M 38 40 Q 52 44 58 38" stroke="#1E8449" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    `<circle cx="60" cy="16" r="1.5" fill="#F1C40F"/><circle cx="62" cy="28" r="1.5" fill="#F1C40F"/><circle cx="58" cy="38" r="1.5" fill="#F1C40F"/>` +
    `<ellipse cx="26" cy="36" rx="13" ry="10" fill="#C0392B"/><ellipse cx="24" cy="40" rx="9" ry="5" fill="#E74C3C"/>` +
    `<path d="M 16 28 Q 26 22 36 30 Q 30 40 18 38 Z" fill="#1E8449"/>` +
    `<path d="M 20 30 Q 26 28 32 30 M 22 33 Q 28 31 32 33" stroke="#27AE60" stroke-width="0.6" fill="none"/>` +
    `<path d="M 16 28 Q 14 32 18 38" stroke="#2E86C1" stroke-width="1.5" stroke-linecap="round" fill="none"/>` +
    `<path d="M 36 28 Q 40 22 42 18" stroke="#C0392B" stroke-width="5" stroke-linecap="round" fill="none"/>` +
    `<circle cx="42" cy="16" r="6" fill="#C0392B"/><circle cx="40" cy="18" r="2" fill="#E74C3C"/>` +
    `<path d="M 40 10 Q 38 4 34 2" stroke="#1E8449" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<path d="M 42 9 Q 42 2 38 0" stroke="#2E86C1" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<path d="M 44 10 Q 46 4 44 0" stroke="#C0392B" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<circle cx="34" cy="2" r="1.2" fill="#F1C40F"/><circle cx="38" cy="0" r="1.2" fill="#F1C40F"/><circle cx="44" cy="0" r="1.2" fill="#F1C40F"/>` +
    `<circle cx="44" cy="15" r="1.8" fill="#F1C40F"/><circle cx="44.5" cy="15" r="0.9" fill="#1A1A2E"/>` +
    `<path d="M 48 15 L 56 16 L 48 18 Z" fill="#F39C12"/><path d="M 48 16.5 L 55 16.5" stroke="#C0392B" stroke-width="0.5"/>` +
    `<line x1="22" y1="46" x2="20" y2="58" stroke="#922B21" stroke-width="2.2" stroke-linecap="round"/>` +
    `<line x1="28" y1="46" x2="30" y2="58" stroke="#922B21" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M 18 58 L 20 58 L 22 58 M 20 58 L 20 60" stroke="#922B21" stroke-width="1.4" stroke-linecap="round"/>` +
    `<path d="M 28 58 L 30 58 L 32 58 M 30 58 L 30 60" stroke="#922B21" stroke-width="1.4" stroke-linecap="round"/>` +
    `<line x1="14" y1="60" x2="36" y2="60" stroke="#7D3C0E" stroke-width="2" stroke-linecap="round"/></svg>`,

  "redDragon": () =>
    `<image href="${RED_DRAGON_URI}" x="10" y="12" width="140" height="190" preserveAspectRatio="xMidYMid meet"/>`,

  "greenDragon": () =>
    `<image href="${GREEN_DRAGON_URI}" x="10" y="12" width="140" height="190" preserveAspectRatio="xMidYMid meet"/>`,

  "joker": () =>
    // "JOKER" wordmark — uses nested SVG for precise centering
    `<svg x="10" y="40" width="140" height="30" viewBox="0 0 80 18">` +
      `<text x="40" y="14" text-anchor="middle" font-family="Georgia,'Playfair Display',serif" font-size="16" font-weight="900" fill="#C0392B" letter-spacing="1.5">JOKER</text>` +
    `</svg>` +
    // 8-point starburst with J — ported from app's JokerArt
    `<svg x="25" y="68" width="110" height="110" viewBox="0 0 64 64">` +
      `<g fill="#C0392B">` +
        `<polygon points="32,2 36,28 32,30 28,28"/>` +
        `<polygon points="62,32 36,36 34,32 36,28"/>` +
        `<polygon points="32,62 28,36 32,34 36,36"/>` +
        `<polygon points="2,32 28,28 30,32 28,36"/>` +
        `<polygon points="53,11 38,30 32,32 36,28"/>` +
        `<polygon points="53,53 34,38 32,32 36,36"/>` +
        `<polygon points="11,53 30,38 32,32 28,36"/>` +
        `<polygon points="11,11 30,30 32,32 28,28"/>` +
      `</g>` +
      `<circle cx="32" cy="32" r="13" fill="#FAF7EC" stroke="#C0392B" stroke-width="2"/>` +
      `<text x="32" y="38" text-anchor="middle" font-family="Georgia,'Playfair Display',serif" font-size="22" font-weight="900" fill="#1A1A2E">J</text>` +
    `</svg>`,

  "5crak": () =>
    `<text x="16" y="34" font-family="Georgia,serif" font-size="28" font-weight="900" fill="#C0392B">5</text>` +
    `<text x="80" y="108" text-anchor="middle" font-family="${CF}" font-size="68" fill="#2C3E50">五</text>` +
    `<text x="80" y="175" text-anchor="middle" font-family="${CF}" font-size="52" fill="#C0392B">萬</text>`,

  "northWind": () =>
    `<text x="16" y="34" font-family="Georgia,serif" font-size="28" font-weight="900" fill="#C0392B">N</text>` +
    `<text x="80" y="148" text-anchor="middle" font-family="${CF}" font-size="105" font-weight="900" fill="#2C3E50">北</text>`,

  "eastWind": () =>
    `<text x="16" y="34" font-family="Georgia,serif" font-size="28" font-weight="900" fill="#C0392B">E</text>` +
    `<text x="80" y="148" text-anchor="middle" font-family="${CF}" font-size="105" font-weight="900" fill="#2C3E50">東</text>`,

  "8bam": () => {
    const xs = [28, 55, 82, 109];
    let s = `<text x="16" y="34" font-family="Georgia,serif" font-size="28" font-weight="900" fill="#C0392B">8</text>`;
    for (let row = 0; row < 2; row++) {
      const yB = 42 + row * 72;
      for (const x of xs) {
        s += `<rect x="${x}" y="${yB}" width="12" height="20" rx="3" fill="#1E8449"/>`;
        s += `<rect x="${x-1}" y="${yB+19}" width="14" height="3" rx="1.5" fill="#145A32"/>`;
        s += `<rect x="${x}" y="${yB+21}" width="12" height="20" rx="3" fill="#27AE60"/>`;
        s += `<rect x="${x-1}" y="${yB+40}" width="14" height="3" rx="1.5" fill="#145A32"/>`;
        s += `<rect x="${x}" y="${yB+42}" width="12" height="20" rx="3" fill="#1E8449"/>`;
      }
    }
    return s;
  },

  "3dot": () =>
    `<text x="16" y="34" font-family="Georgia,serif" font-size="28" font-weight="900" fill="#C0392B">3</text>` +
    `<circle cx="50" cy="70" r="20" fill="url(#rdot)"/><circle cx="80" cy="115" r="20" fill="url(#gdot)"/>` +
    `<circle cx="110" cy="160" r="20" fill="url(#rdot)"/>`,

  "flower": () =>
    `<svg x="10" y="15" width="140" height="185" viewBox="0 0 64 64">` +
    `<path d="M4 58 Q18 44 32 32 Q42 24 50 18" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round" fill="none"/>` +
    `<path d="M24 40 Q18 48 14 54" stroke="#5D4037" stroke-width="1.5" stroke-linecap="round" fill="none"/>` +
    `<g fill="#F48FB1" stroke="#E91E63" stroke-width="0.8">` +
    `<ellipse cx="34" cy="22" rx="5" ry="7" transform="rotate(-15 34 22)"/>` +
    `<ellipse cx="42" cy="28" rx="5" ry="7" transform="rotate(55 42 28)"/>` +
    `<ellipse cx="40" cy="38" rx="5" ry="7" transform="rotate(125 40 38)"/>` +
    `<ellipse cx="28" cy="38" rx="5" ry="7" transform="rotate(-125 28 38)"/>` +
    `<ellipse cx="26" cy="28" rx="5" ry="7" transform="rotate(-55 26 28)"/></g>` +
    `<circle cx="34" cy="30" r="3.5" fill="#FFD700"/>` +
    `<circle cx="48" cy="20" r="3.5" fill="#F8BBD0"/><circle cx="48" cy="20" r="1.5" fill="#E91E63"/>` +
    `<text x="54" y="60" text-anchor="middle" font-family="serif" font-size="12" font-weight="900" fill="#C0392B">梅</text></svg>`,
};

/* ═══ TILE RENDERER ═══ */

function renderTile(type, x, y, rot, scale, opacity, onBeige) {
  const s = scale || 1;
  const op = opacity || 1;
  const isJoker = type === "joker";
  const stroke = onBeige ? "#8C7840" : "#C9BC8A";
  const filter = onBeige ? "url(#tsB)" : "url(#ts)";
  const finalOp = onBeige ? Math.min(op + 0.15, 0.65) : op;
  const art = TILE_ART[type]();
  return (
    `<g transform="translate(${x},${y}) scale(${s}) rotate(${rot},${TW/2},${TH/2})" filter="${filter}" opacity="${finalOp}">` +
    `<rect width="${TW}" height="${TH}" rx="12" fill="#FAF7EC" stroke="${stroke}" stroke-width="2.5"/>` +
    art +
    `</g>`
  );
}

/* ═══ TEXT ═══ */

function renderText(label, headlines, subtitle, isBeige) {
  // Calculate total block height, then center vertically in the safe zone
  // Safe zone: y=480 (below side tiles) to y=1020 (above bottom tiles)
  const safeTop = 480;
  const safeBot = 1020;
  const safeMid = (safeTop + safeBot) / 2;

  const labelH = label ? 95 : 0;
  const headH = headlines.length * 95;
  const subH = 50;
  const totalH = labelH + headH + subH;
  const startY = safeMid - totalH / 2;

  let y = startY;
  let svg = "";

  if (label) {
    const labelColor = isBeige ? "#1A4D2E" : "#C8A951";
    svg += `<text x="${CX}" y="${y}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="28" font-weight="700" letter-spacing="6" fill="${labelColor}">${esc(label)}</text>`;
    y += 95;
  }

  for (const line of headlines) {
    const headColor = isBeige ? "#0F3320" : "#FFFFFF";
    svg += `<text x="${CX}" y="${y}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="78" font-weight="900" fill="${headColor}">${esc(line)}</text>`;
    y += 95;
  }

  y += 20;
  const subColor = isBeige ? "rgba(15,51,32,0.5)" : "rgba(255,255,255,0.55)";
  const footColor = isBeige ? "rgba(15,51,32,0.2)" : "rgba(255,255,255,0.22)";
  svg += `<text x="${CX}" y="${y}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="36" font-weight="300" fill="${subColor}">${esc(subtitle)}</text>`;

  svg += `<text x="${CX}" y="${y + 80}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="20" fill="${footColor}">welcome2mahj.com</text>`;

  return svg;
}

/* ═══ ASSEMBLE ═══ */

function buildSvg(post) {
  const isBeige = post.color === "beige";
  const bg = isBeige ? BG_BEIGE : BG_GREEN;
  const glow = isBeige ? "url(#hgBeige)" : "url(#hgGreen)";
  const glowSvg = `<circle cx="${CX}" cy="380" r="300" fill="${glow}"/>`;

  const tiles = post.tiles
    .map((t) => renderTile(t.type, t.x, t.y, t.rot, t.s, t.op, isBeige))
    .join("\n");

  const text = renderText(post.label, post.headlines, post.subtitle, isBeige);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    DEFS, bg, glowSvg, tiles, text,
    `</svg>`,
  ].join("\n");
}

/* ═══════════════════════════════════════════════════════════
   POST DEFINITIONS — 12 posts, all dark green

   Each tile has: type, x, y, rot, s (scale), op (opacity)
   - Varied scales: 0.6–1.2 for depth (closer = bigger + more opaque)
   - Varied opacities: 0.2–0.55 (ghostly far tiles vs present near tiles)
   - Each post has UNIQUE tile positions
   ═══════════════════════════════════════════════════════════ */

/*
 * Auto-tile placement: 9 tiles per post, all clear of text zone.
 * Uses a seeded shuffle to give each post a unique but consistent arrangement.
 */
const S = 0.9;

// All available tile types
const ALL_TILES = ["1dot","1bam","redDragon","greenDragon","joker","5crak","northWind","eastWind","8bam","3dot","flower"];

// 5 layout templates — rotated across posts for variety
const LAYOUTS = [
  // A: 4 top, 1 right, 3 bottom, 1 left
  [
    { x: -20, y: 20,  rot: -14 }, { x: 280, y: -5,  rot: -4 },
    { x: 580, y: -15, rot: 3 },   { x: 910, y: 25,  rot: 13 },
    { x: 940, y: 270, rot: 8 },
    { x: 860, y: 1050, rot: 10 }, { x: 390, y: 1080, rot: 2 }, { x: -15, y: 1030, rot: -9 },
    { x: -30, y: 260, rot: -12 },
  ],
  // B: 3 top, 1 right, 4 bottom, 1 left
  [
    { x: -25, y: 25,  rot: -12 }, { x: 400, y: -10, rot: 2 },
    { x: 900, y: 20,  rot: 14 },
    { x: 935, y: 280, rot: 7 },
    { x: 880, y: 1040, rot: 12 }, { x: 550, y: 1070, rot: -3 },
    { x: 200, y: 1085, rot: 5 },  { x: -20, y: 1045, rot: -10 },
    { x: -35, y: 250, rot: -10 },
  ],
  // C: 5 top (dense), 0 sides, 4 bottom
  [
    { x: -25, y: 15,  rot: -15 }, { x: 180, y: -10, rot: -6 },
    { x: 420, y: -20, rot: 2 },   { x: 660, y: -10, rot: -3 },
    { x: 910, y: 20,  rot: 12 },
    { x: 870, y: 1045, rot: 10 }, { x: 560, y: 1075, rot: -2 },
    { x: 230, y: 1085, rot: 4 },  { x: -20, y: 1040, rot: -11 },
  ],
  // D: 2 top corners, 1 right, 1 left, 5 bottom (dense bottom edge)
  [
    { x: -25, y: 20,  rot: -13 }, { x: 910, y: 25,  rot: 14 },
    { x: 940, y: 260, rot: 8 },
    { x: -30, y: 250, rot: -10 },
    { x: 900, y: 1035, rot: 11 }, { x: 650, y: 1060, rot: -3 },
    { x: 400, y: 1080, rot: 4 },  { x: 150, y: 1055, rot: -6 },
    { x: -20, y: 1040, rot: -9 },
  ],
  // E: 5 top (dense), 1 right, 2 bottom, 1 left
  [
    { x: -25, y: 15,  rot: -14 }, { x: 180, y: -10, rot: -6 },
    { x: 420, y: -20, rot: 3 },   { x: 660, y: -5,  rot: -4 },
    { x: 910, y: 25,  rot: 12 },
    { x: 940, y: 260, rot: 7 },
    { x: 860, y: 1050, rot: 10 }, { x: -15, y: 1035, rot: -9 },
    { x: -30, y: 255, rot: -11 },
  ],
];

// Seeded random for consistent but varied tile positions
function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
}

// Generate tiles for a post: pick 9 tiles, jitter positions slightly
function autoTiles(seed, postIndex) {
  const rng = seededRandom(seed);
  const layout = LAYOUTS[postIndex % LAYOUTS.length];
  const shuffled = [...ALL_TILES].sort(() => rng() - 0.5);
  const picked = shuffled.slice(0, 9);
  return picked.map((type, i) => {
    const slot = layout[i];
    // Slight jitter so posts aren't identical
    const jx = Math.round((rng() - 0.5) * 30);
    const jy = Math.round((rng() - 0.5) * 20);
    const jr = Math.round((rng() - 0.5) * 6);
    // Opacity: 0.25-0.45 range, varies per slot
    const op = 0.25 + (rng() * 0.2);
    return {
      type,
      x: slot.x + jx,
      y: slot.y + jy,
      rot: slot.rot + jr,
      s: S,
      op: Math.round(op * 100) / 100,
    };
  });
}

// Post content — tiles auto-generated from seed
const postDefs = [
  // ── Original feature posts ──
  { fn: "39-welcome",          c: "green", l: "WELCOME",     h: ["Welcome to", "MAHJ"],                       sub: "Learn American Mahjong from scratch." },
  { fn: "40-lessons",          c: "beige", l: "MAHJ APP",    h: ["15 Lessons.", "Zero Experience."],            sub: "From 'what are these tiles?' to game night confident." },
  { fn: "41-tiles",            c: "green", l: "DID YOU KNOW", h: ["152 Tiles.", "20 Minutes."],                 sub: "That's all it takes to learn them all." },
  { fn: "42-charleston",       c: "beige", l: "DID YOU KNOW", h: ["The Charleston Isn't", "a Dance Move"],      sub: "It's a 6-pass tile trade. And it's addictive." },
  { fn: "43-cheatsheet",       c: "green", l: "PRO TIP",     h: ["Bring This to", "Game Night"],                sub: "A printable cheat sheet. You're welcome." },
  { fn: "44-calculator",       c: "beige", l: "APP FEATURE", h: ["Who Pays What?", "We Did the Math."],         sub: "Instant scoring with all the bonuses." },
  { fn: "45-puzzle",           c: "green", l: "DAILY",       h: ["A New Puzzle.", "Every Day."],                 sub: "Open the app. Test yourself. Stay sharp." },
  { fn: "46-defense",          c: "beige", l: "STRATEGY",    h: ["Read the Table.", "Stop Feeding Winners."],    sub: "Defense is the most underrated skill in Mahj." },
  // ── Series 2 — strong hooks ──
  { fn: "47-hobby-wifi",       c: "green", l: "NEW HOBBY",   h: ["Your Next Hobby", "Doesn't Need WiFi"],       sub: "Just tiles, snacks, and actual conversation." },
  { fn: "48-gamenight",        c: "beige", l: "GAME NIGHT",  h: ["4 Players. 1 Table.", "Zero Screens."],       sub: "The weekly tradition you didn't know you needed." },
  { fn: "49-phone-down",       c: "green", l: "REAL TALK",   h: ["Put the Phone Down.", "Pick Up Tiles."],       sub: "Your hands are literally too full to scroll." },
  { fn: "50-quiz-joker",       c: "beige", l: "QUICK QUIZ",  h: ["Can You Use a Joker", "in a Pair?"],          sub: "Drop your answer. Then check the comments." },
  { fn: "51-text-friends",     c: "green", l: "START HERE",  h: ["Text 3 Friends.", "Learn Together."],          sub: "Nobody needs to already know how to play." },
  { fn: "52-hobby-stick",      c: "beige", l: "TRUTH",       h: ["The Hobby You'll", "Actually Stick With"],     sub: "Easy to learn. Impossible to get bored." },
  { fn: "53-stop-scrolling",   c: "green", l: "REAL TALK",   h: ["Stop Scrolling.", "Start Playing."],           sub: "152 tiles > infinite scroll." },
  // ── Community posts ──
  { fn: "54-not-alone",        c: "beige", l: "COMMUNITY",   h: ["Nobody Learns", "Mahjong Alone"],             sub: "That's the whole point." },
  { fn: "55-popping-up",       c: "green", l: "DID YOU KNOW", h: ["Mahjong Groups Are", "Popping Up Everywhere"], sub: "Libraries. Coffee shops. Living rooms." },
  { fn: "56-hang-out",         c: "beige", l: "REAL TALK",   h: ["Remember When We", "Used to Hang Out?"],       sub: "Like actually hang out. In person." },
  { fn: "57-not-invited",      c: "green", l: "TRUTH",       h: ["You Don't Need", "to Be Invited"],             sub: "Start the group yourself." },
  { fn: "58-5-steps",          c: "beige", l: "HOW TO",      h: ["Your First Mahj Night", "in 5 Steps"],         sub: "Easier than planning a dinner party." },
  { fn: "59-phone-face-down",  c: "green", l: "REAL TALK",   h: ["The Phone Goes", "Face Down"],                 sub: "The unspoken rule at every Mahj table." },
  { fn: "60-strangers",        c: "beige", l: "COMMUNITY",   h: ["4 Strangers Became", "Best Friends"],          sub: "All because one of them suggested Mahjong." },
  { fn: "61-favorite-hobby",   c: "green", l: "QUESTION",    h: ["What If Your", "Favorite Hobby"],              sub: "Doesn't exist yet? Because you haven't tried it." },
  { fn: "62-secret",           c: "beige", l: "PRO TIP",     h: ["The Secret to a", "Great Game Night"],         sub: "It was never about the game." },
  { fn: "63-100-years",        c: "green", l: "DID YOU KNOW", h: ["100 Years of Bringing", "People Together"],    sub: "Your turn." },
  { fn: "64-stop-saying",      c: "beige", l: "REAL TALK",   h: ["Stop Saying", "'We Should Hang Out'"],         sub: "Pick a night. Learn Mahjong. Actually do it." },
  { fn: "65-best-friend",      c: "green", l: "COMMUNITY",   h: ["Your Next Best Friend", "Is at a Mahj Table"], sub: "All it takes is one text and 3 yeses." },
  { fn: "66-new-girls-night",  c: "beige", l: "DID YOU KNOW", h: ["Mahjong Night Is", "the New Girls' Night"],   sub: "4 players. 1 table. Zero screens." },
  { fn: "67-one-afternoon",    c: "green", l: "TRUTH",       h: ["You Can Learn", "in One Afternoon"],           sub: "Not months. Not years. One afternoon." },
  { fn: "68-fastest-growing",  c: "beige", l: "DID YOU KNOW", h: ["The Fastest Growing", "Hobby for Women 20-45"], sub: "And new groups are forming everywhere." },
  // ── New posts ──
  { fn: "69-what-is-mahj",    c: "green", l: "WAIT, WHAT?",  h: ["What Is", "American Mahjong?"],               sub: "4 players. 152 tiles. Zero screens. All fun." },
  { fn: "70-what-is-mahj-2",  c: "beige", l: "THE SHORT VERSION", h: ["Poker + Chess +", "a Dinner Party"],      sub: "That's Mahjong. And you can learn it in a week." },
];

// Generate tiles automatically for each post
const posts = postDefs.map((p, i) => ({
  filename: p.fn,
  color: p.c,
  label: p.l,
  headlines: p.h,
  subtitle: p.sub,
  tiles: autoTiles(i * 7919 + 42, i), // unique seed + layout rotation
}));

/* ═══ GENERATE ═══ */

let generated = 0;
for (const post of posts) {
  const svgPath = join(socialDir, post.filename + ".svg");
  if (existsSync(svgPath)) { console.log(`⚠  ${post.filename}.svg exists`); continue; }
  writeFileSync(svgPath, buildSvg(post));
  console.log(`✓  ${post.filename}.svg`);
  generated++;
}
console.log(`\n${generated} SVGs generated.`);

async function convertPngs() {
  try {
    const { default: sharp } = await import("sharp");
    console.log("\nConverting to PNG...");
    for (const post of posts) {
      const pngPath = join(socialDir, post.filename + ".png");
      if (existsSync(pngPath)) { console.log(`⚠  ${post.filename}.png exists`); continue; }
      await sharp(Buffer.from(buildSvg(post))).png().toFile(pngPath);
      console.log(`✓  ${post.filename}.png`);
    }
    console.log("\nDone!");
  } catch (e) {
    console.log("\nSharp error:", e.message);
  }
}
await convertPngs();

/* ═══ BLANK TEMPLATES ═══ */
// Generate 5 blank templates (tiles + background, no text) for future posts

function buildTemplateSvg(layoutIndex, color) {
  const isBeige = color === "beige";
  const bg = isBeige ? BG_BEIGE : BG_GREEN;
  const glow = isBeige ? "url(#hgBeige)" : "url(#hgGreen)";
  const glowSvg = `<circle cx="${CX}" cy="380" r="300" fill="${glow}"/>`;

  // Use the layout with fixed tiles (no random — consistent template)
  const layout = LAYOUTS[layoutIndex];
  const tileTypes = ALL_TILES.slice(0, 9);
  const tiles = tileTypes.map((type, i) => {
    const slot = layout[i];
    return renderTile(type, slot.x, slot.y, slot.rot, S, 0.35, isBeige);
  }).join("\n");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    DEFS, bg, glowSvg, tiles,
    // Footer only
    `<text x="${CX}" y="${H - 55}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="20" fill="${isBeige ? 'rgba(15,51,32,0.2)' : 'rgba(255,255,255,0.22)'}">welcome2mahj.com</text>`,
    `</svg>`,
  ].join("\n");
}

async function generateTemplates() {
  const templates = [
    { fn: "template-A-green", layout: 0, color: "green" },
    { fn: "template-B-beige", layout: 1, color: "beige" },
    { fn: "template-C-green", layout: 2, color: "green" },
    { fn: "template-D-beige", layout: 3, color: "beige" },
    { fn: "template-E-green", layout: 4, color: "green" },
    { fn: "template-A-beige", layout: 0, color: "beige" },
    { fn: "template-B-green", layout: 1, color: "green" },
    { fn: "template-C-beige", layout: 2, color: "beige" },
    { fn: "template-D-green", layout: 3, color: "green" },
    { fn: "template-E-beige", layout: 4, color: "beige" },
  ];

  const templateDir = join(socialDir, "templates");
  if (!existsSync(templateDir)) {
    mkdirSync(templateDir);
  }

  console.log("\nGenerating blank templates...");
  try {
    const { default: sharp } = await import("sharp");
    for (const t of templates) {
      const pngPath = join(templateDir, t.fn + ".png");
      if (existsSync(pngPath)) { console.log(`⚠  ${t.fn}.png exists`); continue; }
      const svg = buildTemplateSvg(t.layout, t.color);
      writeFileSync(join(templateDir, t.fn + ".svg"), svg);
      await sharp(Buffer.from(svg)).png().toFile(pngPath);
      console.log(`✓  ${t.fn}.png`);
    }
    console.log("\nTemplates done!");
  } catch (e) {
    console.log("Template error:", e.message);
  }
}

await generateTemplates();

/* ═══ TIKTOK TEMPLATES (1080x1920) ═══ */

async function generateTikTokTemplates() {
  const TK_H = 1920;
  const templateDir = join(socialDir, "templates");

  // Adjusted layouts for taller canvas
  const tkLayouts = [
    // More spread vertically for 1920 height
    [
      { x: -20, y: 30, rot: -14 },  { x: 280, y: 5, rot: -4 },
      { x: 580, y: -10, rot: 3 },   { x: 910, y: 35, rot: 13 },
      { x: 940, y: 350, rot: 8 },   { x: -30, y: 340, rot: -12 },
      { x: 860, y: 1620, rot: 10 }, { x: 390, y: 1650, rot: 2 },
      { x: -15, y: 1600, rot: -9 },
    ],
  ];

  const colors = ["green", "beige"];

  console.log("\nGenerating TikTok templates (1080x1920)...");
  try {
    const { default: sharp } = await import("sharp");
    for (const color of colors) {
      const fn = "tiktok-template-" + color;
      const pngPath = join(templateDir, fn + ".png");
      if (existsSync(pngPath)) { console.log("⚠  " + fn + " exists"); continue; }

      const isBeige = color === "beige";
      const bg = isBeige
        ? `<rect width="${W}" height="${TK_H}" fill="url(#beigeBg)"/>`
        : `<rect width="${W}" height="${TK_H}" fill="url(#dkBg)"/>`;
      const glow = isBeige ? "url(#hgBeige)" : "url(#hgGreen)";

      const layout = tkLayouts[0];
      const tileTypes = ALL_TILES.slice(0, 9);
      const tiles = tileTypes.map((type, i) => {
        const slot = layout[i];
        return renderTile(type, slot.x, slot.y, slot.rot, S, 0.35, isBeige);
      }).join("\n");

      const footFill = isBeige ? "rgba(15,51,32,0.2)" : "rgba(255,255,255,0.22)";
      const svg = [
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${TK_H}" viewBox="0 0 ${W} ${TK_H}">`,
        DEFS, bg,
        `<circle cx="${CX}" cy="500" r="350" fill="${glow}"/>`,
        tiles,
        `<text x="${CX}" y="${TK_H - 80}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="20" fill="${footFill}">welcome2mahj.com</text>`,
        `</svg>`,
      ].join("\n");

      writeFileSync(join(templateDir, fn + ".svg"), svg);
      await sharp(Buffer.from(svg)).png().toFile(pngPath);
      console.log("✓  " + fn + ".png");
    }
    console.log("\nTikTok templates done!");
  } catch (e) {
    console.log("TikTok template error:", e.message);
  }
}

await generateTikTokTemplates();

/* ═══ TIKTOK POSTS (1080x1920) ═══ */
// Same content as Instagram posts but taller canvas

const TK_H = 1920;

// TikTok-specific layouts — more tiles for taller canvas (13 positions)
// Extra side tiles fill the gaps between top/bottom and text
const TK_LAYOUTS = [
  // TK-A: 4 top, 2 upper-sides, 2 lower-sides, 1 right, 1 left, 3 bottom
  [
    { x: -20, y: 20, rot: -14 },  { x: 280, y: -5, rot: -4 },
    { x: 580, y: -15, rot: 3 },   { x: 910, y: 25, rot: 13 },
    { x: 940, y: 300, rot: 8 },   { x: -30, y: 290, rot: -12 },
    { x: 935, y: 1300, rot: 7 },  { x: -35, y: 1280, rot: -9 },
    { x: 860, y: 1620, rot: 10 }, { x: 390, y: 1650, rot: 2 },
    { x: -15, y: 1600, rot: -9 },
  ],
  // TK-B: 3 top, 2 upper-sides, 2 lower-sides, 4 bottom
  [
    { x: -25, y: 25, rot: -12 },  { x: 400, y: -10, rot: 2 },
    { x: 900, y: 20, rot: 14 },
    { x: 935, y: 310, rot: 7 },   { x: -35, y: 280, rot: -10 },
    { x: 940, y: 1290, rot: 6 },  { x: -30, y: 1310, rot: -8 },
    { x: 880, y: 1610, rot: 12 }, { x: 550, y: 1640, rot: -3 },
    { x: 200, y: 1655, rot: 5 },  { x: -20, y: 1615, rot: -10 },
  ],
  // TK-C: 5 top, 2 lower-sides, 4 bottom
  [
    { x: -25, y: 15, rot: -15 },  { x: 180, y: -10, rot: -6 },
    { x: 420, y: -20, rot: 2 },   { x: 660, y: -10, rot: -3 },
    { x: 910, y: 20, rot: 12 },
    { x: 935, y: 1300, rot: 8 },  { x: -30, y: 1280, rot: -10 },
    { x: 870, y: 1615, rot: 10 }, { x: 560, y: 1645, rot: -2 },
    { x: 230, y: 1655, rot: 4 },  { x: -20, y: 1610, rot: -11 },
  ],
  // TK-D: 2 top, 2 upper-sides, 2 lower-sides, 5 bottom
  [
    { x: -25, y: 20, rot: -13 },  { x: 910, y: 25, rot: 14 },
    { x: 940, y: 290, rot: 8 },   { x: -30, y: 280, rot: -10 },
    { x: 935, y: 1310, rot: 6 },  { x: -35, y: 1290, rot: -8 },
    { x: 900, y: 1605, rot: 11 }, { x: 650, y: 1630, rot: -3 },
    { x: 400, y: 1650, rot: 4 },  { x: 150, y: 1625, rot: -6 },
    { x: -20, y: 1610, rot: -9 },
  ],
  // TK-E: 5 top, 2 upper-sides, 2 lower-sides, 2 bottom
  [
    { x: -25, y: 15, rot: -14 },  { x: 180, y: -10, rot: -6 },
    { x: 420, y: -20, rot: 3 },   { x: 660, y: -5, rot: -4 },
    { x: 910, y: 25, rot: 12 },
    { x: 940, y: 290, rot: 7 },   { x: -30, y: 285, rot: -11 },
    { x: 935, y: 1300, rot: 6 },  { x: -35, y: 1290, rot: -9 },
    { x: 860, y: 1620, rot: 10 }, { x: -15, y: 1605, rot: -9 },
  ],
];

function renderTikTokText(label, headlines, subtitle, isBeige) {
  const safeTop = 480;
  const safeBot = 1520; // taller safe zone
  const safeMid = (safeTop + safeBot) / 2;

  const labelH = label ? 95 : 0;
  const headH = headlines.length * 95;
  const subH = 50;
  const totalH = labelH + headH + subH;
  const startY = safeMid - totalH / 2;

  let y = startY;
  let svg = "";

  if (label) {
    const labelColor = isBeige ? "#1A4D2E" : "#C8A951";
    svg += `<text x="${CX}" y="${y}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="28" font-weight="700" letter-spacing="6" fill="${labelColor}">${esc(label)}</text>`;
    y += 95;
  }

  for (const line of headlines) {
    const headColor = isBeige ? "#0F3320" : "#FFFFFF";
    svg += `<text x="${CX}" y="${y}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="78" font-weight="900" fill="${headColor}">${esc(line)}</text>`;
    y += 95;
  }

  y += 20;
  const subColor = isBeige ? "rgba(15,51,32,0.5)" : "rgba(255,255,255,0.55)";
  const footColor = isBeige ? "rgba(15,51,32,0.2)" : "rgba(255,255,255,0.22)";
  svg += `<text x="${CX}" y="${y}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="36" font-weight="300" fill="${subColor}">${esc(subtitle)}</text>`;
  svg += `<text x="${CX}" y="${y + 80}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="20" fill="${footColor}">welcome2mahj.com</text>`;

  return svg;
}

function buildTikTokSvg(post, tkLayout) {
  const isBeige = post.color === "beige";
  const bg = isBeige
    ? `<rect width="${W}" height="${TK_H}" fill="url(#beigeBg)"/>`
    : `<rect width="${W}" height="${TK_H}" fill="url(#dkBg)"/>`;
  const glow = isBeige ? "url(#hgBeige)" : "url(#hgGreen)";
  const glowSvg = `<circle cx="${CX}" cy="500" r="350" fill="${glow}"/>`;

  // Pick tiles for TikTok — need more than 9 for the taller canvas
  const rng = seededRandom(post.filename.length * 7919 + 99);
  const shuffled = [...ALL_TILES].sort(() => rng() - 0.5);
  const tkTiles = tkLayout.map((slot, i) => {
    const type = shuffled[i % shuffled.length];
    const op = 0.25 + (rng() * 0.2);
    const jx = Math.round((rng() - 0.5) * 20);
    const jy = Math.round((rng() - 0.5) * 15);
    return renderTile(type, slot.x + jx, slot.y + jy, slot.rot, S, Math.round(op * 100) / 100, isBeige);
  }).join("\n");

  const text = renderTikTokText(post.label, post.headlines, post.subtitle, isBeige);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${TK_H}" viewBox="0 0 ${W} ${TK_H}">`,
    DEFS, bg, glowSvg, tkTiles, text,
    `</svg>`,
  ].join("\n");
}

async function generateTikTokPosts() {
  const tkDir = join(socialDir, "tiktok");
  if (!existsSync(tkDir)) mkdirSync(tkDir);

  console.log("\nGenerating TikTok posts (1080x1920)...");
  try {
    const { default: sharp } = await import("sharp");
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const fn = "tk-" + post.filename;
      const pngPath = join(tkDir, fn + ".png");
      if (existsSync(pngPath)) { console.log("⚠  " + fn + " exists"); continue; }

      const layoutIdx = i % TK_LAYOUTS.length;
      const svg = buildTikTokSvg(post, TK_LAYOUTS[layoutIdx]);
      writeFileSync(join(tkDir, fn + ".svg"), svg);
      await sharp(Buffer.from(svg)).png().toFile(pngPath);
      console.log("✓  " + fn + ".png");
    }
    console.log("\nTikTok posts done!");
  } catch (e) {
    console.log("TikTok error:", e.message);
  }
}

await generateTikTokPosts();
