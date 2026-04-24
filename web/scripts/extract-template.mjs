/**
 * Extract background templates from surviving original posts.
 * Takes an original post and blanks out the text area, leaving
 * just the background gradient + tiles as a reusable template.
 */

import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const socialDir = join(root, "..", "social media");

const W = 1080;
const H = 1350;

// Use module-02 (dark) as source — it has the standard dark green template
// Use module-01 (light/beige) as source for the beige template

async function extractDarkTemplate() {
  // Load the original post
  const original = sharp(join(socialDir, "12-module-02.png"));

  // We need to paint over the text area with the background color
  // The text sits roughly in the center: y=350 to y=700, full width
  // We'll create a rectangle that matches the background gradient in that area

  // The center of the dark gradient is approximately #1f5c3a
  const coverSvg = `<svg width="${W}" height="${H}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="55%">
        <stop offset="0%" stop-color="#2a6e4a"/>
        <stop offset="55%" stop-color="#1a5535"/>
        <stop offset="100%" stop-color="#0F3320"/>
      </radialGradient>
    </defs>
    <!-- Cover just the text zone -->
    <rect x="0" y="300" width="${W}" height="500" fill="url(#bg)"/>
  </svg>`;

  const cover = await sharp(Buffer.from(coverSvg)).png().toBuffer();

  await original
    .composite([{ input: cover, left: 0, top: 0 }])
    .png()
    .toFile(join(socialDir, "_template-dark.png"));

  console.log("✓ _template-dark.png extracted from 12-module-02.png");
}

async function extractLightTemplate() {
  // Use module-01 (beige)
  const original = sharp(join(socialDir, "11-module-01.png"));

  const coverSvg = `<svg width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#EBE2C8"/>
        <stop offset="50%" stop-color="#E2D8B5"/>
        <stop offset="100%" stop-color="#CCBF8F"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="35%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.5"/>
        <stop offset="60%" stop-color="#FAF5E5" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#FAF5E5" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect x="0" y="250" width="${W}" height="550" fill="url(#bg)"/>
    <rect x="0" y="250" width="${W}" height="550" fill="url(#glow)"/>
  </svg>`;

  const cover = await sharp(Buffer.from(coverSvg)).png().toBuffer();

  await original
    .composite([{ input: cover, left: 0, top: 0 }])
    .png()
    .toFile(join(socialDir, "_template-light.png"));

  console.log("✓ _template-light.png extracted from 11-module-01.png");
}

await extractDarkTemplate();
await extractLightTemplate();
console.log("\nTemplates saved — use these as backgrounds for new posts");
