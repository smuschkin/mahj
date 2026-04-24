/**
 * Master script to generate ALL MAHJ social media post images.
 * Uses sharp for image processing — same tool that made the originals.
 *
 * Usage: node scripts/generate-social-posts.mjs
 *
 * To regenerate a single post, edit the `posts` array at the bottom.
 */

import sharp from "sharp";
import { readFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const socialDir = join(root, "..", "social media");
const tileDir = join(socialDir, "tile-images");

const W = 1080;
const H = 1350;

// ── TILE IMAGES ──
// Green-tinted tiles for dark background, tan-tinted for light background
const darkTileDir = join(tileDir, "dark");
const lightTileDir = join(tileDir, "light");

const tileNames = {
  dot5: "5-of-dots.png",
  dragon: "red-dragon.png",
  crack1: "1-of-characters.png",
  bam8: "8-of-bamboo.png",
  joker: "joker.png",
};

// ── CIRCLE LAYOUT ──
function getCirclePositions(tileW, tileH) {
  const cx = W / 2;
  const cy = H * 0.40;
  const radius = 420;
  // 6 positions around circle — avoiding text zone in center
  const angles = [-125, -45, 30, 85, 150, -165];

  return angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: Math.round(cx + radius * Math.cos(rad) - tileW / 2),
      y: Math.round(cy + radius * Math.sin(rad) - tileH / 2),
      rotation: Math.round(deg * 0.18),
    };
  });
}

// ── PREPARE A TILE ──
async function prepareTile(tilePath, tileW, tileH, rotation) {
  let buf = await sharp(tilePath)
    .resize(tileW, tileH, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  if (rotation !== 0) {
    buf = await sharp(buf)
      .rotate(rotation, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }

  return buf;
}

// ── DARK GREEN BACKGROUND SVG ──
function darkBgSvg() {
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="55%">
        <stop offset="0%" stop-color="#2a6e4a"/>
        <stop offset="55%" stop-color="#1a5535"/>
        <stop offset="100%" stop-color="#0F3320"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
  </svg>`;
}

// ── BEIGE BACKGROUND SVG ──
function lightBgSvg() {
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#EBE2C8"/>
        <stop offset="50%" stop-color="#E2D8B5"/>
        <stop offset="100%" stop-color="#CCBF8F"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="35%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
        <stop offset="60%" stop-color="#FAF5E5" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#FAF5E5" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
  </svg>`;
}

// ── TEXT OVERLAY SVG ──
function textSvg({ label, headline, subtitle, isDark }) {
  const textColor = isDark ? "white" : "#0F3320";
  const labelColor = isDark ? "#C8A951" : "#1A4D2E";
  const subColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(15,51,32,0.45)";
  const footerColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(15,51,32,0.18)";

  // Wrap headline
  const maxChars = 20;
  const words = headline.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current.trim());

  const lineHeight = 76;
  const totalTextH = (lines.length - 1) * lineHeight;
  const centerY = Math.round(H * 0.46);
  const labelY = centerY - totalTextH / 2 - 50;
  const headY = centerY - totalTextH / 2 + 20;
  const subY = centerY + totalTextH / 2 + lineHeight + 10;

  const tspans = lines
    .map((line, i) => `<tspan x="${W/2}" dy="${i === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`)
    .join("");

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    ${label ? `<text x="${W/2}" y="${labelY}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="24" font-weight="700" letter-spacing="5" fill="${labelColor}">${esc(label)}</text>` : ""}
    <text x="${W/2}" y="${headY}" text-anchor="middle" font-family="Georgia,serif" font-size="62" font-weight="900" fill="${textColor}">
      ${tspans}
    </text>
    <text x="${W/2}" y="${subY}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="28" font-weight="300" fill="${subColor}">${esc(subtitle)}</text>
    <text x="${W/2}" y="${H - 60}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="20" fill="${footerColor}">welcome2mahj.com</text>
  </svg>`;
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
}

// ── CREATE A POST ──
async function createPost(post) {
  const { filename, label, headline, subtitle, isDark, tileKeys, screenshotPath } = post;

  // 1. Create background
  const bgBuffer = await sharp(Buffer.from(isDark ? darkBgSvg() : lightBgSvg()))
    .png()
    .toBuffer();

  // 2. Prepare tile composites
  const tileW = 120;
  const tileH = 160;
  const positions = getCirclePositions(tileW, tileH);
  const keys = tileKeys || ["dot5", "dragon", "crack1", "bam8", "joker", "dot5"];
  const tileSrcDir = isDark ? darkTileDir : lightTileDir;

  const composites = [];

  for (let i = 0; i < 6; i++) {
    const key = keys[i % keys.length];
    const tilePath = join(tileSrcDir, tileNames[key]);
    if (!existsSync(tilePath)) {
      console.log(`    Warning: tile not found: ${tilePath}`);
      continue;
    }

    const pos = positions[i];
    const tileBuf = await prepareTile(tilePath, tileW, tileH, pos.rotation);

    // Get the actual size after rotation (rotation changes dimensions)
    const meta = await sharp(tileBuf).metadata();
    const finalX = Math.max(0, Math.min(pos.x, W - meta.width));
    const finalY = Math.max(0, Math.min(pos.y, H - meta.height));

    composites.push({ input: tileBuf, left: finalX, top: finalY });
  }

  // 3. Add text overlay
  const textBuf = await sharp(Buffer.from(textSvg({ label, headline, subtitle, isDark })))
    .png()
    .toBuffer();

  composites.push({ input: textBuf, left: 0, top: 0 });

  // 4. Add screenshot if provided
  if (screenshotPath && existsSync(screenshotPath)) {
    const screenshot = await sharp(screenshotPath)
      .resize(860, 860, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    composites.push({ input: screenshot, left: 110, top: 340 });
  }

  // 5. Composite everything
  await sharp(bgBuffer)
    .composite(composites)
    .png()
    .toFile(join(socialDir, filename));

  console.log(`  ✓ ${filename}`);
}

// ── ALL POSTS ──
const screenshotDir = join(root, "screenshots", "6.9-inch");

const posts = [
  // Original launch posts (01-26)
  { filename: "01-welcome.png", label: "", headline: "Welcome to MAHJ", subtitle: "Learn American Mahjong from scratch", isDark: true },
  { filename: "02-homepage.png", label: "", headline: "14 Interactive Lessons", subtitle: "Start at zero. Build to confidence.", isDark: false, screenshotPath: join(screenshotDir, "01-homepage.png") },
  { filename: "03-tiles.png", label: "", headline: "All 152 Tiles", subtitle: "Bams, Craks, Dots, Winds, Dragons, Jokers", isDark: true },
  { filename: "04-charleston.png", label: "", headline: "Master the Charleston", subtitle: "The 6-pass tile trade, step by step", isDark: false, screenshotPath: join(screenshotDir, "03-charleston.png") },
  { filename: "05-cheatsheet.png", label: "", headline: "Bring to Game Night", subtitle: "A printable cheat sheet for your first game", isDark: true },
  { filename: "06-calculator.png", label: "", headline: "Who Pays What?", subtitle: "Instant scoring with all the bonuses", isDark: false, screenshotPath: join(screenshotDir, "05-calculator.png") },
  { filename: "07-daily-puzzle.png", label: "", headline: "Daily Puzzle", subtitle: "A new scenario every day", isDark: true },
  { filename: "08-defense.png", label: "", headline: "Read the Table", subtitle: "Learn defense so you stop feeding winners", isDark: false },
  { filename: "09-free-app.png", label: "", headline: "100% Free", subtitle: "No ads. No accounts. Just learn.", isDark: false },

  // Community posts (27-38)
  { filename: "27-ig-real-talk-1.png", label: "REAL TALK", headline: "Your Next Hobby Is Waiting at a Table", subtitle: "Not a screen. A real table. With real people.", isDark: true },
  { filename: "28-ig-community-2.png", label: "COMMUNITY", headline: "Nobody Learns Mahjong Alone", subtitle: "That's the whole point.", isDark: false },
  { filename: "29-ig-did-you-know-3.png", label: "DID YOU KNOW", headline: "Mahjong Groups Are Popping Up Everywhere", subtitle: "Libraries. Coffee shops. Living rooms.", isDark: true },
  { filename: "30-ig-real-talk-4.png", label: "REAL TALK", headline: "Remember When We Used to Hang Out?", subtitle: "Like actually hang out. In person.", isDark: false },
  { filename: "31-ig-truth-5.png", label: "TRUTH", headline: "You Don't Need to Be Invited", subtitle: "Start the group yourself.", isDark: true },
  { filename: "32-ig-how-to-6.png", label: "HOW TO", headline: "Your First Mahj Night in 5 Steps", subtitle: "Easier than planning a dinner party.", isDark: false },
  { filename: "33-ig-real-talk-7.png", label: "REAL TALK", headline: "The Phone Goes Face Down", subtitle: "The unspoken rule at every Mahj table.", isDark: true },
  { filename: "34-ig-community-8.png", label: "COMMUNITY", headline: "4 Strangers Became Best Friends", subtitle: "All because one of them suggested Mahjong.", isDark: false },
  { filename: "35-ig-question-9.png", label: "QUESTION", headline: "What If Your Favorite Hobby Doesn't Exist Yet?", subtitle: "Because you haven't tried it.", isDark: true },
  { filename: "36-ig-pro-tip-10.png", label: "PRO TIP", headline: "The Secret to a Great Game Night", subtitle: "It was never about the game.", isDark: false },
  { filename: "37-ig-did-you-know-11.png", label: "DID YOU KNOW", headline: "100 Years of Bringing People Together", subtitle: "Your turn.", isDark: true },
  { filename: "38-ig-real-talk-12.png", label: "REAL TALK", headline: "Stop Saying We Should Hang Out", subtitle: "Pick a night. Learn Mahjong. Actually do it.", isDark: false },
];

// ── RUN ──
// To regenerate specific posts, comment out the ones you don't need

const args = process.argv.slice(2);
let toGenerate = posts;

if (args.length > 0) {
  // If filenames passed as args, only generate those
  toGenerate = posts.filter(p => args.some(a => p.filename.includes(a)));
}

console.log(`Generating ${toGenerate.length} posts...\n`);

for (const post of toGenerate) {
  await createPost(post);
}

console.log(`\nDone!`);
