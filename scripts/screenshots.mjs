/**
 * Capture App Store screenshots at all required iPhone sizes.
 *
 * Prereq: dev server running at http://localhost:3000
 * Usage: node scripts/screenshots.mjs
 *
 * Output: screenshots/<size>/NN-name.png
 */

import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = "./screenshots";

// Apple App Store screenshot sizes — all actual pixel dimensions
// https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications
const SIZES = [
  // 6.9" (iPhone 16 Pro Max) and 6.7" (iPhone 15 Pro Max) share the same size
  { name: "6.9-inch", cssWidth: 430, cssHeight: 932, scale: 3 }, // 1290x2796
  { name: "6.5-inch", cssWidth: 414, cssHeight: 896, scale: 3 }, // 1242x2688
  { name: "5.5-inch", cssWidth: 414, cssHeight: 736, scale: 3 }, // 1242x2208
  // iPad Pro 13" (6th gen) — 2064x2752
  { name: "13-inch", cssWidth: 1032, cssHeight: 1376, scale: 2 }, // 2064x2752
];

const SCREENS = [
  { name: "01-homepage", url: "/", wait: 1000 },
  { name: "02-tile-trainer", url: "/lesson/2", wait: 1500 },
  { name: "03-charleston", url: "/lesson/5", wait: 1500 },
  { name: "04-cheatsheet", url: "/cheatsheet", wait: 1000 },
  { name: "05-calculator", url: "/calculator", wait: 1000 },
  { name: "06-practice", url: "/play", wait: 1500 },
];

async function main() {
  const browser = await chromium.launch();

  for (const size of SIZES) {
    console.log(
      `\n=== ${size.name} (${size.cssWidth * size.scale}x${size.cssHeight * size.scale}) ===`
    );
    const dir = `${OUTPUT_DIR}/${size.name}`;
    await mkdir(dir, { recursive: true });

    const context = await browser.newContext({
      viewport: { width: size.cssWidth, height: size.cssHeight },
      deviceScaleFactor: size.scale,
      isMobile: true,
      hasTouch: true,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });

    const page = await context.newPage();

    // Unlock all lessons by setting progress in localStorage
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      const progress = {};
      for (let i = 0; i < 15; i++) {
        progress[i] = { status: "completed", completedAt: Date.now() };
      }
      localStorage.setItem("mahj-progress-v1", JSON.stringify(progress));
    });
    await page.waitForTimeout(500);

    for (const screen of SCREENS) {
      try {
        await page.goto(`${BASE_URL}${screen.url}`, { waitUntil: "load" });
        await page.waitForTimeout(screen.wait + 500);
        const path = `${dir}/${screen.name}.png`;
        await page.screenshot({ path, fullPage: false });
        console.log(`  ✓ ${screen.name}.png`);
      } catch (err) {
        console.log(`  ✗ ${screen.name} failed: ${err.message}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nDone! Screenshots saved to ${OUTPUT_DIR}/`);
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err.message);
  process.exit(1);
});
