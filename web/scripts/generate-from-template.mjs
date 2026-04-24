/**
 * Generate new posts using surviving originals as templates.
 * Uses the ACTUAL original background+tiles and just replaces the text.
 *
 * Dark template: 12-module-02.png (has all 6 tiles in circle)
 * Light template: 11-module-01.png (has light tiles)
 *
 * IMPORTANT: Never overwrites original files (10-26). Only writes to
 * new filenames or files that were already overwritten today.
 */

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const socialDir = join(root, "..", "social media");

const W = 1080;
const H = 1350;

// Templates — these are surviving originals
const DARK_TEMPLATE = join(socialDir, "12-module-02.png");
const LIGHT_TEMPLATE = join(socialDir, "25-tip.png");

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
}

async function createPost({ filename, label, headline, subtitle, isDark }) {
  const template = isDark ? DARK_TEMPLATE : LIGHT_TEMPLATE;
  const textColor = isDark ? "white" : "#0F3320";
  const labelColor = isDark ? "#C8A951" : "#1A4D2E";
  const subColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(15,51,32,0.45)";

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
  const centerY = Math.round(H * 0.44);
  const labelY = centerY - totalTextH / 2 - 55;
  const headY = centerY - totalTextH / 2 + 15;
  const subY = centerY + totalTextH / 2 + lineHeight + 5;

  const tspans = lines
    .map((line, i) => `<tspan x="${W/2}" dy="${i === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`)
    .join("");

  // Create a cover rectangle that matches the background in the text zone
  // to hide the old text, then put new text on top
  const bgCenterColor = isDark ? "#235a3d" : "#E0D6B5";

  // Build composites array
  const composites = [];

  // For beige: extract a strip from the LEFT edge (pure bg, no text/circle)
  // and stretch it across the text zone to perfectly cover old text
  if (!isDark) {
    // BEIGE: Build from scratch — clean gradient bg + tiles from original edges + new text
    const bgSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fdfbf0"/>
          <stop offset="15%" stop-color="#f3f2e6"/>
          <stop offset="40%" stop-color="#eeecd8"/>
          <stop offset="65%" stop-color="#eae7cf"/>
          <stop offset="85%" stop-color="#e5e0c2"/>
          <stop offset="100%" stop-color="#e0dabb"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
    </svg>`;
    const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer();

    // Top tiles strip from original
    const topStrip = await sharp(template)
      .extract({ left: 0, top: 0, width: W, height: 180 })
      .png().toBuffer();

    // Bottom tiles strip with fade-in
    const bottomStrip = await sharp(template)
      .extract({ left: 0, top: 1000, width: W, height: 350 })
      .png().toBuffer();
    const fadeSvg = `<svg width="${W}" height="350" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="white" stop-opacity="0"/>
        <stop offset="30%" stop-color="white" stop-opacity="1"/>
        <stop offset="100%" stop-color="white" stop-opacity="1"/>
      </linearGradient></defs>
      <rect width="${W}" height="350" fill="url(#f)"/>
    </svg>`;
    const fadedBottom = await sharp(bottomStrip)
      .composite([{ input: await sharp(Buffer.from(fadeSvg)).png().toBuffer(), blend: 'dest-in' }])
      .png().toBuffer();

    // Text
    const textSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      ${label ? `<text x="${W/2}" y="${labelY}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="${labelColor}">${esc(label)}</text>` : ""}
      <text x="${W/2}" y="${headY}" text-anchor="middle" font-family="Georgia,serif" font-size="62" font-weight="900" fill="${textColor}">
        ${tspans}
      </text>
      <text x="${W/2}" y="${subY}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="26" font-weight="300" fill="${subColor}">${esc(subtitle)}</text>
    </svg>`;

    await sharp(bg)
      .composite([
        { input: topStrip, left: 0, top: 0 },
        { input: fadedBottom, left: 0, top: 1000 },
        { input: await sharp(Buffer.from(textSvg)).png().toBuffer(), left: 0, top: 0 },
      ])
      .png()
      .toFile(join(socialDir, filename));

    console.log(`  ✓ ${filename}`);
    return;
  }

  // DARK: Use template directly with cover + new text
  const darkCover = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cover" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1e4b2b"/>
        <stop offset="100%" stop-color="#1a4427"/>
      </radialGradient>
    </defs>
    <rect x="0" y="250" width="${W}" height="650" fill="url(#cover)"/>
  </svg>`;
  composites.push({ input: await sharp(Buffer.from(darkCover)).png().toBuffer(), left: 0, top: 0 });

  const textOverlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    ${label ? `<text x="${W/2}" y="${labelY}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="${labelColor}">${esc(label)}</text>` : ""}
    <text x="${W/2}" y="${headY}" text-anchor="middle" font-family="Georgia,serif" font-size="62" font-weight="900" fill="${textColor}">
      ${tspans}
    </text>
    <text x="${W/2}" y="${subY}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="26" font-weight="300" fill="${subColor}">${esc(subtitle)}</text>
  </svg>`;
  composites.push({ input: await sharp(Buffer.from(textOverlay)).png().toBuffer(), left: 0, top: 0 });

  await sharp(template)
    .composite(composites)
    .png()
    .toFile(join(socialDir, filename));

  console.log(`  ✓ ${filename}`);
}

// ── POSTS TO GENERATE ──
// Only posts that need (re)generating — never touch originals 10-26

const posts = [
  // Overwritten originals that need rebuilding (01-09)
  { filename: "01-welcome.png", label: "", headline: "Welcome to MAHJ", subtitle: "Learn American Mahjong from scratch", isDark: true },
  { filename: "03-tiles.png", label: "", headline: "All 152 Tiles", subtitle: "Bams, Craks, Dots, Winds, Dragons, Jokers", isDark: true },
  { filename: "05-cheatsheet.png", label: "", headline: "Bring to Game Night", subtitle: "A printable cheat sheet for your first game", isDark: true },
  { filename: "07-daily-puzzle.png", label: "", headline: "Daily Puzzle", subtitle: "A new scenario every day", isDark: true },
  { filename: "08-defense.png", label: "", headline: "Read the Table", subtitle: "Learn defense so you stop feeding winners", isDark: false },
  { filename: "09-free-app.png", label: "", headline: "100% Free", subtitle: "No ads. No accounts. Just learn.", isDark: false },

  // New community posts (27-38)
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

console.log("Generating posts from original templates...\n");
console.log("Dark template: 12-module-02.png");
console.log("Light template: 11-module-01.png\n");

for (const post of posts) {
  await createPost(post);
}

console.log(`\nDone! ${posts.length} posts generated.`);
console.log("Original files 10-26 were NOT touched.");
