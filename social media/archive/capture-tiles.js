const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = '/Users/sunshinesara55/Desktop/MAHJ/social media/tile-images';

async function main() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Delete all old tiles
  fs.readdirSync(outDir).filter(f => f.endsWith('.png')).forEach(f => fs.unlinkSync(path.join(outDir, f)));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 800, height: 600 },
    deviceScaleFactor: 4
  });

  await page.goto('https://welcome2mahj.com/module/0', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  const captured = new Set();

  for (let step = 0; step < 20; step++) {
    // Set page background to match tile color EXACTLY so edges blend
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach(el => {
        if (el.getAttribute('role') === 'img') return;
        if (el.closest('[role="img"]')) return;
        el.style.backgroundColor = '#FAF7EC';
        el.style.background = '#FAF7EC';
      });
    });
    await page.waitForTimeout(200);

    const tiles = await page.$$('[role="img"]');

    for (let i = 0; i < tiles.length; i++) {
      const label = await tiles[i].getAttribute('aria-label');
      if (!label || captured.has(label)) continue;
      captured.add(label);

      const safeName = label.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

      try {
        await tiles[i].screenshot({
          path: path.join(outDir, `${safeName}.png`),
          type: 'png',
        });
        console.log(`  ✓ ${safeName}.png — ${label}`);
      } catch(e) {}
    }

    const nextBtn = await page.$('button:has-text("Next Step")');
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForTimeout(800);
      await page.evaluate(() => window.scrollTo(0, 200));
      await page.waitForTimeout(300);
    } else break;
  }

  await browser.close();
  console.log(`\n${captured.size} tiles — all captured the same way on #FAF7EC background`);
}

main().catch(console.error);
