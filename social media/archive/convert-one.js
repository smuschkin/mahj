const { chromium } = require('playwright');
const fs = require('fs');

async function main() {
  const svgPath = '/Users/sunshinesara55/Desktop/MAHJ/social media/03-tiles-new.svg';
  const pngPath = '/Users/sunshinesara55/Desktop/MAHJ/social media/03-tiles.png';

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto('file://' + svgPath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: pngPath, type: 'png', fullPage: false });
  await browser.close();
  console.log('✓ 03-tiles.png replaced with Craks version');
}

main().catch(console.error);
