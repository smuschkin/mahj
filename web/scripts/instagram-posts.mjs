/**
 * Generate Instagram post images for MAHJ launch.
 * Creates 1080x1350 branded images with app screenshots.
 */

import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(process.env.HOME, "Desktop", "instagram-posts");
mkdirSync(outDir, { recursive: true });

const W = 1080;
const H = 1350;

// Create a branded Instagram post with text overlay and optional screenshot
async function createPost({ filename, headline, subtext, bgColor, screenshotPath }) {
  const textSvg = `
    <svg width="${W}" height="${H}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${bgColor || '#1A4D2E'}"/>
          <stop offset="100%" stop-color="${bgColor === '#FAF7EC' ? '#E8DEB5' : '#0A2616'}"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${headline ? `<text x="${W/2}" y="${screenshotPath ? 180 : H/2 - 40}" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="64" fill="${bgColor === '#FAF7EC' ? '#1A4D2E' : '#FAF7EC'}">${escapeXml(headline)}</text>` : ''}
      ${subtext ? `<text x="${W/2}" y="${screenshotPath ? 240 : H/2 + 40}" text-anchor="middle" font-family="Helvetica,sans-serif" font-size="32" fill="${bgColor === '#FAF7EC' ? '#666' : '#C8A951'}">${escapeXml(subtext)}</text>` : ''}
      ${!screenshotPath ? `<text x="${W/2}" y="${H - 80}" text-anchor="middle" font-family="Helvetica,sans-serif" font-size="28" fill="${bgColor === '#FAF7EC' ? '#999' : 'rgba(255,255,255,0.4)'}">welcome2mahj.com</text>` : ''}
    </svg>
  `;

  let pipeline = sharp(Buffer.from(textSvg)).resize(W, H);

  if (screenshotPath) {
    const screenshot = await sharp(screenshotPath)
      .resize(900, 900, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    pipeline = pipeline.composite([
      { input: screenshot, top: 320, left: 90 },
    ]);
  }

  await pipeline.png().toFile(join(outDir, filename));
  console.log(`  Created ${filename}`);
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const screenshotDir = join(root, "screenshots", "6.9-inch");

console.log("Creating Instagram posts...\n");

// Post 1: Hero / Welcome
await createPost({
  filename: "01-welcome.png",
  headline: "Learn American Mahjong",
  subtext: "From absolute beginner to game night",
  bgColor: "#1A4D2E",
});

// Post 2: Homepage screenshot
await createPost({
  filename: "02-homepage.png",
  headline: "14 Interactive Lessons",
  subtext: "Start at zero. Build to confidence.",
  bgColor: "#1A4D2E",
  screenshotPath: join(screenshotDir, "01-homepage.png"),
});

// Post 3: Tiles
await createPost({
  filename: "03-tiles.png",
  headline: "All 152 Tiles",
  subtext: "Bams, Cracks, Dots, Winds, Dragons, Jokers",
  bgColor: "#FAF7EC",
});

// Post 4: Charleston
await createPost({
  filename: "04-charleston.png",
  headline: "Master the Charleston",
  subtext: "The 6-pass tile trade, step by step",
  bgColor: "#1A4D2E",
  screenshotPath: join(screenshotDir, "03-charleston.png"),
});

// Post 5: Cheat Sheet
await createPost({
  filename: "05-cheatsheet.png",
  headline: "Bring to Game Night",
  subtext: "A printable cheat sheet for your first game",
  bgColor: "#FAF7EC",
});

// Post 6: Scoring calculator
await createPost({
  filename: "06-calculator.png",
  headline: "Who Pays What?",
  subtext: "Instant scoring with all the bonuses",
  bgColor: "#1A4D2E",
  screenshotPath: join(screenshotDir, "05-calculator.png"),
});

// Post 7: Daily Puzzle
await createPost({
  filename: "07-daily-puzzle.png",
  headline: "Daily Puzzle",
  subtext: "A new scenario every day",
  bgColor: "#FAF7EC",
});

// Post 8: Defense
await createPost({
  filename: "08-defense.png",
  headline: "Read the Table",
  subtext: "Learn defense so you stop feeding winners",
  bgColor: "#1A4D2E",
});

// Post 9: CTA
await createPost({
  filename: "09-free-app.png",
  headline: "100% Free",
  subtext: "No ads. No accounts. Just learn.",
  bgColor: "#1A4D2E",
});

console.log(`\nDone! Posts saved to ${outDir}`);
