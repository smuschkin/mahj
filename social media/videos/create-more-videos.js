const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const outDir = __dirname;
const BASE_URL = process.env.MAHJ_URL || 'http://192.168.1.72:3002';

const ALL_PROGRESS = JSON.stringify(
  Object.fromEntries(
    Array.from({ length: 16 }, (_, i) => [i, { status: "completed", completedAt: Date.now() }])
  )
);

// Smooth scroll helper
async function smooth(page, distance, duration) {
  const steps = Math.round(duration / 80);
  const step = distance / steps;
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(80);
  }
}

const videos = [
  // ── Module walkthroughs ──
  {
    name: 'tt-mod-00-welcome',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/0`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 8000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-mod-01-tiles',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/1`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 3000, 8000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-mod-02-reading-card',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/2`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 7000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-mod-03-setup',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/3`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 7000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-mod-05-jokers',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/5`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 7000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-mod-06-strategy',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/6`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 7000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-mod-08-etiquette',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/8`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 7000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-mod-09-scoring',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/9`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 7000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-mod-10-mistakes',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/10`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 7000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-mod-12-first-game',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/12`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 3000, 8000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Feature pages ──
  {
    name: 'tt-feat-play',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/play`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2000, 6000);
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-feat-gear',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/gear`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 7000);
      await page.waitForTimeout(1500);
    }
  },
];

async function createVideo(video) {
  const finalPath = path.join(outDir, `${video.name}.mp4`);
  if (fs.existsSync(finalPath)) {
    console.log(`⚠  ${video.name}.mp4 exists, skipping`);
    return;
  }

  console.log(`\n📹 Recording: ${video.name}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: outDir, size: { width: 390, height: 844 } },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  });

  const page = await context.newPage();

  try {
    // Navigate to homepage first to set localStorage
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate((pd) => {
      window.localStorage.setItem('mahj-progress-v1', pd);
    }, ALL_PROGRESS);
    await page.waitForTimeout(500);
    // Run video actions
    await video.actions(page);
  } catch (e) {
    console.log(`  Warning: ${e.message}`);
  }

  await page.close();
  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  // Scale up with sharpening
  const rawPath = path.join(outDir, `${video.name}-raw.webm`);
  fs.renameSync(videoPath, rawPath);

  try {
    execSync(`ffmpeg -y -i "${rawPath}" -vf "scale=1080:-2:flags=lanczos,crop=1080:1920:0:0,unsharp=3:3:1.5" -c:v libx264 -preset slow -crf 17 -an "${finalPath}" 2>/dev/null`);
    console.log(`  ✓ ${video.name}.mp4`);
    fs.unlinkSync(rawPath);
  } catch (e) {
    console.log(`  ✗ ffmpeg error, keeping raw: ${rawPath}`);
  }
}

async function main() {
  console.log('🎬 Creating more TikTok videos...');
  console.log(`Recording from: ${BASE_URL}`);
  console.log(`Output: ${outDir}\n`);

  for (const video of videos) {
    await createVideo(video);
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);
