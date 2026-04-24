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

// Smooth scroll — small increments for natural feel
async function smooth(page, distance, duration) {
  const steps = Math.round(duration / 80);
  const step = distance / steps;
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(80);
  }
}

// Try clicking a button by text
async function tryClick(page, texts, waitAfter = 2000) {
  for (const text of texts) {
    try {
      const btn = await page.$(`button:has-text("${text}"), a:has-text("${text}")`);
      if (btn) {
        await btn.click();
        await page.waitForTimeout(waitAfter);
        return true;
      }
    } catch (e) {}
  }
  return false;
}

const videos = [
  // ── Homepage ──
  {
    name: 'tt-01-homepage',
    actions: async (page) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 0: Welcome ──
  {
    name: 'tt-02-welcome',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/0`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 1: Tile Trainer ──
  {
    name: 'tt-03-tiles',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/1`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 3000, 14000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 2: Reading the Card ──
  {
    name: 'tt-04-reading-card',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/2`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 3: Setup & Dealing ──
  {
    name: 'tt-05-setup',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/3`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 4: Charleston ──
  {
    name: 'tt-06-charleston',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/4`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 5: Jokers & Calling ──
  {
    name: 'tt-07-jokers',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/5`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 6: Hand Strategy ──
  {
    name: 'tt-08-strategy',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/6`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 7: Defense ──
  {
    name: 'tt-09-defense',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/7`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 8: Etiquette ──
  {
    name: 'tt-10-etiquette',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/8`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 9: Scoring ──
  {
    name: 'tt-11-scoring',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/9`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 10: Common Mistakes ──
  {
    name: 'tt-12-mistakes',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/10`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 11: Glossary ──
  {
    name: 'tt-13-glossary',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/11`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 3000, 14000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 12: First Full Game ──
  {
    name: 'tt-14-first-game',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/12`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 3000, 14000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Module 13: Practice Hands ──
  {
    name: 'tt-15-practice-hands',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/13`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Cheat Sheet ──
  {
    name: 'tt-16-cheatsheet',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/cheatsheet`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 3000, 14000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Scoring Calculator ──
  {
    name: 'tt-17-calculator',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/calculator`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 1500, 8000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Practice / Play Mode ──
  {
    name: 'tt-18-play',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/play`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 500, 3000);
      await page.waitForTimeout(1000);
      // Try clicking through steps
      for (let i = 0; i < 5; i++) {
        await tryClick(page, ['Next', 'Start', 'Begin', 'Continue']);
        await smooth(page, 200, 1500);
      }
      await page.waitForTimeout(1500);
    }
  },
  // ── Gear Guide ──
  {
    name: 'tt-19-gear',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/gear`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await smooth(page, 2500, 12000);
      await page.waitForTimeout(1500);
    }
  },
  // ── Full Journey: Homepage → Module 0 → Module 1 ──
  {
    name: 'tt-20-full-journey',
    actions: async (page) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      await smooth(page, 400, 3000);
      await page.waitForTimeout(800);
      await page.goto(`${BASE_URL}/module/0`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      await smooth(page, 600, 4000);
      await page.goto(`${BASE_URL}/module/1`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      await smooth(page, 800, 5000);
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

  console.log(`📹 ${video.name}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: outDir, size: { width: 390, height: 844 } },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  });

  const page = await context.newPage();

  try {
    // Navigate first to unlock all modules
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate((pd) => {
      window.localStorage.setItem('mahj-progress-v1', pd);
    }, ALL_PROGRESS);
    await page.waitForTimeout(300);
    await video.actions(page);
  } catch (e) {
    console.log(`  ⚠ ${e.message}`);
  }

  await page.close();
  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  const rawPath = path.join(outDir, `${video.name}-raw.webm`);
  fs.renameSync(videoPath, rawPath);

  try {
    // Scale up with lanczos + sharpen
    execSync(`ffmpeg -y -i "${rawPath}" -vf "scale=1080:-2:flags=lanczos,crop=1080:1920:0:0,unsharp=5:5:1.5,eq=contrast=1.05" -c:v libx264 -preset veryslow -crf 15 -an "${finalPath}" 2>/dev/null`);
    console.log(`  ✓ ${video.name}.mp4`);
    fs.unlinkSync(rawPath);
  } catch (e) {
    console.log(`  ✗ ffmpeg error, raw kept: ${rawPath}`);
  }
}

async function main() {
  console.log('🎬 Creating all TikTok videos');
  console.log(`From: ${BASE_URL}\n`);
  for (const v of videos) await createVideo(v);
  console.log('\n✅ All done!');
}

main().catch(console.error);
