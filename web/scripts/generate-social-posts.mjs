/**
 * Generate social media post images matching the original MAHJ style.
 * Uses sharp to composite green-tinted tiles in a circle on dark/light backgrounds.
 */

import sharp from "sharp";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const socialDir = join(root, "..", "social media");
const tileImgDir = join(socialDir, "tile-images");

const W = 1080;
const H = 1350;

// ── TILE CAPTURE IMAGES (captured from live app on #FAF7EC background) ──
const tileFiles = {
  dot5: join(tileImgDir, "5-of-dots.png"),
  dragon: join(tileImgDir, "red-dragon.png"),
  crack1: join(tileImgDir, "1-of-characters.png"),
  bam8: join(tileImgDir, "8-of-bamboo.png"),
  joker: join(tileImgDir, "joker.png"),
};

// ── CIRCLE POSITIONS ──
// 6 tiles arranged in a circle around center
function getCirclePositions(cx, cy, radius, tileW, tileH) {
  const angles = [-120, -45, 30, 85, 145, -160]; // degrees
  return angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: Math.round(cx + radius * Math.cos(rad) - tileW / 2),
      y: Math.round(cy + radius * Math.sin(rad) - tileH / 2),
      angle: Math.round(deg * 0.15), // gentle rotation
    };
  });
}

// ── TINT A TILE IMAGE ──
async function tintTile(tilePath, tintColor, tileW, tileH, angle) {
  // Resize tile to target size
  let tile = sharp(tilePath).resize(tileW, tileH, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });

  // Apply green or tan tint by overlaying a colored rectangle with multiply blend
  const tintOverlay = Buffer.from(
    `<svg width="${tileW}" height="${tileH}">
      <rect width="${tileW}" height="${tileH}" fill="${tintColor}" opacity="0.6"/>
    </svg>`
  );

  tile = tile.composite([{ input: tintOverlay, blend: "multiply" }]);

  // Rotate
  if (angle !== 0) {
    tile = tile.rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 0 } });
  }

  return tile.png().toBuffer();
}

// ── CREATE A POST ──
async function createPost({ filename, label, headline, subtitle, isDark, tileKeys }) {
  const bgColor = isDark ? "#1A4D2E" : "#EBE2C8";
  const bgColorEnd = isDark ? "#0A2616" : "#CCBF8F";
  const tintColor = isDark ? "#2a5e3a" : "#b5a888";
  const textColor = isDark ? "white" : "#0F3320";
  const labelColor = isDark ? "#C8A951" : "#1A4D2E";
  const subColor = isDark
    ? "rgba(255,255,255,0.55)"
    : "rgba(15,51,32,0.45)";
  const footerColor = isDark
    ? "rgba(255,255,255,0.25)"
    : "rgba(15,51,32,0.18)";

  // Wrap headline text
  const maxChars = 18;
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
  const headStartY = centerY - totalTextH / 2 + 20;
  const subY = centerY + totalTextH / 2 + lineHeight + 10;

  // Build headline tspans
  const headlineSvg = lines
    .map(
      (line, i) =>
        `<tspan x="${W / 2}" dy="${i === 0 ? 0 : lineHeight}">${escXml(line)}</tspan>`
    )
    .join("");

  // Create background + text SVG
  const bgSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="46%" r="55%">
          <stop offset="0%" stop-color="${isDark ? '#2a6e4a' : '#F0EACD'}"/>
          <stop offset="60%" stop-color="${isDark ? '#1a5535' : '#E2D8B5'}"/>
          <stop offset="100%" stop-color="${bgColorEnd}"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${label ? `<text x="${W / 2}" y="${labelY}" text-anchor="middle" font-family="Helvetica,sans-serif" font-size="24" font-weight="700" letter-spacing="5" fill="${labelColor}">${escXml(label)}</text>` : ""}
      <text x="${W / 2}" y="${headStartY}" text-anchor="middle" font-family="Georgia,serif" font-size="62" font-weight="900" fill="${textColor}">
        ${headlineSvg}
      </text>
      <text x="${W / 2}" y="${subY}" text-anchor="middle" font-family="Helvetica,sans-serif" font-size="28" font-weight="300" fill="${subColor}">${escXml(subtitle)}</text>
      <text x="${W / 2}" y="${H - 60}" text-anchor="middle" font-family="Helvetica,sans-serif" font-size="20" fill="${footerColor}">welcome2mahj.com</text>
    </svg>
  `;

  // Start with background
  let image = sharp(Buffer.from(bgSvg)).png();
  let bgBuffer = await image.toBuffer();

  // Composite tiles in a circle
  const tileW = 130;
  const tileH = 170;
  const positions = getCirclePositions(W / 2, H * 0.46, 420, tileW, tileH);
  const keys = tileKeys || ["dot5", "dragon", "crack1", "bam8", "joker", "dot5"];

  const composites = [];
  for (let i = 0; i < 6; i++) {
    const pos = positions[i];
    const key = keys[i % keys.length];
    const tilePath = tileFiles[key];
    if (!tilePath || !existsSync(tilePath)) continue;

    const tinted = await tintTile(tilePath, tintColor, tileW, tileH, pos.angle);
    composites.push({
      input: tinted,
      left: Math.max(0, pos.x),
      top: Math.max(0, pos.y),
    });
  }

  // Composite all tiles onto background
  const final = sharp(bgBuffer).composite(composites);
  await final.png().toFile(join(socialDir, filename));
  console.log(`  ✓ ${filename}`);
}

function escXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ── POSTS TO GENERATE ──

const posts = [
  // Community posts (new)
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
  // Fix 03-tiles with Craks
  { filename: "03-tiles.png", label: "", headline: "All 152 Tiles", subtitle: "Bams, Craks, Dots, Winds, Dragons, Jokers", isDark: true },
];

console.log("Generating social media posts with sharp...\n");

for (const post of posts) {
  await createPost(post);
}

console.log(`\nDone! ${posts.length} posts generated.`);
