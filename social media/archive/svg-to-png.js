const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const dir = '/Users/sunshinesara55/Desktop/MAHJ/social media';

async function convertSvgToPng(svgFile) {
  const svgPath = path.join(dir, svgFile);
  const pngFile = svgFile.replace('.svg', '.png');
  const pngPath = path.join(dir, pngFile);

  // Read SVG to get dimensions
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  const wMatch = svgContent.match(/width="(\d+)"/);
  const hMatch = svgContent.match(/height="(\d+)"/);
  const w = parseInt(wMatch[1]);
  const h = parseInt(hMatch[1]);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
  });

  await page.goto('file://' + svgPath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: pngPath, type: 'png', fullPage: false });
  await browser.close();

  const stats = fs.statSync(pngPath);
  console.log(`  ✓ ${pngFile} (${(stats.size / 1024).toFixed(0)}KB) — ${w}x${h}`);
}

async function main() {
  const svgFiles = fs.readdirSync(dir)
    .filter(f => f.endsWith('.svg') && (f.startsWith('27-') || f.startsWith('28-') || f.startsWith('29-') || f.startsWith('30-') || f.startsWith('31-') || f.startsWith('32-') || f.startsWith('33-') || f.startsWith('34-') || f.startsWith('35-') || f.startsWith('36-') || f.startsWith('37-') || f.startsWith('38-') || f.startsWith('tt-')))
    .sort();

  console.log(`Converting ${svgFiles.length} SVGs to PNG...\n`);

  for (const svgFile of svgFiles) {
    await convertSvgToPng(svgFile);
  }

  console.log(`\nDone! ${svgFiles.length} PNGs created.`);
}

main().catch(console.error);
