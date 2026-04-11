/**
 * Capture App Store screenshots using Playwright.
 *
 * Usage: npx playwright test scripts/screenshots.mjs
 * Or:    node scripts/screenshots.mjs
 *
 * Captures 6 screenshots at iPhone 15 Pro Max resolution (1290x2796 @ 3x = 430x932 CSS pixels).
 * Output: screenshots/ directory
 */

import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const BASE_URL = "http://localhost:3200";
const OUTPUT_DIR = "./screenshots";

// iPhone 15 Pro Max — 6.7" display (required for App Store)
const VIEWPORT = { width: 430, height: 932 };
const DEVICE_SCALE = 3; // 3x retina → 1290x2796 actual pixels

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE,
    isMobile: true,
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
  });

  const page = await context.newPage();

  // Wait for fonts/styles to load
  async function goto(url) {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
  }

  async function screenshot(name) {
    const path = `${OUTPUT_DIR}/${name}.png`;
    await page.screenshot({ path, fullPage: false });
    console.log(`  ✓ ${name} (${VIEWPORT.width * DEVICE_SCALE}x${VIEWPORT.height * DEVICE_SCALE})`);
  }

  console.log("Capturing App Store screenshots...\n");

  // 1. Homepage — module list
  await goto(BASE_URL);
  await screenshot("01-homepage");

  // 2. Tile Trainer — Module 1
  await goto(`${BASE_URL}/module/1`);
  await screenshot("02-tile-trainer");

  // 3. Charleston — Module 4
  await goto(`${BASE_URL}/module/4`);
  await screenshot("03-charleston");

  // 4. Practice Game — start a game to get to the charleston/pick phase
  await goto(`${BASE_URL}/play?mode=game`);
  await page.waitForTimeout(1000);
  await screenshot("04-practice-game");

  // 5. Cheat Sheet
  await goto(`${BASE_URL}/cheatsheet`);
  await screenshot("05-cheat-sheet");

  // 6. Scoring Calculator
  await goto(`${BASE_URL}/calculator`);
  await screenshot("06-calculator");

  console.log(`\nDone! Screenshots saved to ${OUTPUT_DIR}/`);

  await browser.close();
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err.message);
  process.exit(1);
});
