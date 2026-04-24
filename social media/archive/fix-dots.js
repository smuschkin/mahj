const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = '/Users/sunshinesara55/Desktop/MAHJ/social media/tile-images';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 800, height: 600 },
    deviceScaleFactor: 4
  });

  await page.goto('https://welcome2mahj.com/module/0', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  for (let step = 0; step < 20; step++) {
    // Make page background transparent but DON'T touch elements with role=img
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach(el => {
        if (el.getAttribute('role') === 'img') return;
        // Skip children of tile elements too
        if (el.closest('[role="img"]')) return;
        el.style.backgroundColor = 'transparent';
        el.style.background = 'transparent';
      });
    });
    await page.waitForTimeout(200);

    const tiles = await page.$$('[role="img"]');
    for (let i = 0; i < tiles.length; i++) {
      const label = await tiles[i].getAttribute('aria-label');
      if (label === '5 of Dots') {
        // Make sure the tile's own shadow doesn't have a colored background
        await tiles[i].evaluate(el => {
          // The tile itself keeps its background
          // But remove any box-shadow that might pick up colors
          el.style.boxShadow = 'none';
        });

        await tiles[i].screenshot({
          path: path.join(outDir, '5-of-dots.png'),
          type: 'png',
          omitBackground: true,
        });
        console.log('✓ 5-of-dots.png');
        await browser.close();
        return;
      }
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
}

main().catch(console.error);
