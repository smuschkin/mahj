const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const outDir = __dirname;
// Record at viewport size, then scale up with ffmpeg
const viewport = { width: 390, height: 844 };
const videoSize = { width: 390, height: 844 };

// Use local dev server for latest app version
const BASE_URL = process.env.MAHJ_URL || 'http://192.168.1.72:3002';

// Unlock all modules by setting progress in localStorage
const ALL_PROGRESS = JSON.stringify(
  Object.fromEntries(
    Array.from({ length: 16 }, (_, i) => [i, { status: "completed", completedAt: Date.now() }])
  )
);

async function unlockAllModules(page) {
  await page.evaluate((progressData) => {
    window.localStorage.setItem('mahj-progress-v1', progressData);
  }, ALL_PROGRESS);
}

const videos = [
  // ── 1. App reveal — scroll through homepage, show all features ──
  {
    name: 'tt-new-01-app-reveal',
    text: "This free app taught me\\na hobby that actually stuck",
    subtext: 'MAHJ — free on the App Store',
    actions: async (page) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500);
      // Slow scroll through entire homepage
      for (let i = 0; i < 12; i++) {
        await page.mouse.wheel(0, 200);
        await page.waitForTimeout(700);
      }
      await page.waitForTimeout(2000);
    }
  },

  // ── 2. Tile trainer — show learning all the tiles ──
  {
    name: 'tt-new-02-152-tiles',
    text: "152 tiles. 20 minutes.\\nWatch me learn them all.",
    subtext: 'Module 1 — free at welcome2mahj.com',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/1`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      // Scroll through tile lessons
      for (let i = 0; i < 10; i++) {
        await page.mouse.wheel(0, 280);
        await page.waitForTimeout(600);
      }
      // Look for a drill button and click it
      try {
        const drillBtn = await page.$('button:has-text("Start"), button:has-text("Practice"), button:has-text("Drill"), button:has-text("Try")');
        if (drillBtn) {
          await drillBtn.click();
          await page.waitForTimeout(3000);
          // Try clicking some tiles in the drill
          for (let i = 0; i < 5; i++) {
            const tile = await page.$('[role="img"], .tile, button:has([role="img"])');
            if (tile) {
              await tile.click();
              await page.waitForTimeout(800);
            }
          }
        }
      } catch (e) { /* drill interaction optional */ }
      await page.waitForTimeout(2000);
    }
  },

  // ── 3. Charleston module — show the unique tile trade ──
  {
    name: 'tt-new-03-charleston',
    text: "The Charleston explained\\nin 30 seconds",
    subtext: "Only in American Mahjong",
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/4`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      // Scroll through Charleston lesson
      for (let i = 0; i < 8; i++) {
        await page.mouse.wheel(0, 260);
        await page.waitForTimeout(800);
      }
      await page.waitForTimeout(2000);
    }
  },

  // ── 4. Cheat sheet — show the printable reference ──
  {
    name: 'tt-new-04-cheatsheet',
    text: "Bring this to\\nyour first game night",
    subtext: "Free printable cheat sheet",
    actions: async (page) => {
      await page.goto(`${BASE_URL}/cheatsheet`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      for (let i = 0; i < 10; i++) {
        await page.mouse.wheel(0, 220);
        await page.waitForTimeout(700);
      }
      await page.waitForTimeout(2000);
    }
  },

  // ── 5. Scoring calculator — quick demo ──
  {
    name: 'tt-new-05-calculator',
    text: '"Who pays what?"\\nThis calculator ends the argument.',
    subtext: 'Free at welcome2mahj.com',
    actions: async (page) => {
      await page.goto(`${BASE_URL}/calculator`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      // Try interacting with calculator inputs
      try {
        const inputs = await page.$$('input, select, button');
        for (const input of inputs.slice(0, 4)) {
          await input.click();
          await page.waitForTimeout(500);
        }
      } catch (e) { /* interaction optional */ }
      await page.waitForTimeout(2000);
      for (let i = 0; i < 4; i++) {
        await page.mouse.wheel(0, 250);
        await page.waitForTimeout(700);
      }
      await page.waitForTimeout(1500);
    }
  },

  // ── 6. Defense module — strategy content ──
  {
    name: 'tt-new-06-defense',
    text: "Stop feeding winners.\\nLearn defense.",
    subtext: "Module 7 — the most underrated skill",
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/7`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      for (let i = 0; i < 8; i++) {
        await page.mouse.wheel(0, 270);
        await page.waitForTimeout(800);
      }
      await page.waitForTimeout(2000);
    }
  },

  // ── 7. Full journey — homepage → module 0 → module 1 tiles ──
  {
    name: 'tt-new-07-full-journey',
    text: "POV: You just discovered\\nAmerican Mahjong",
    subtext: "From zero to game night in a week",
    actions: async (page) => {
      // Start at homepage
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await page.mouse.wheel(0, 300);
      await page.waitForTimeout(1000);

      // Go to Module 0
      await page.goto(`${BASE_URL}/module/0`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      for (let i = 0; i < 4; i++) {
        await page.mouse.wheel(0, 300);
        await page.waitForTimeout(600);
      }

      // Go to Module 1
      await page.goto(`${BASE_URL}/module/1`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      for (let i = 0; i < 5; i++) {
        await page.mouse.wheel(0, 300);
        await page.waitForTimeout(600);
      }

      await page.waitForTimeout(2000);
    }
  },

  // ── 8. Glossary — all the wild terms ──
  {
    name: 'tt-new-08-glossary',
    text: "Mahjong has its own\\nlanguage. Seriously.",
    subtext: "Pung. Kong. Charleston. Exposure.",
    actions: async (page) => {
      await page.goto(`${BASE_URL}/module/12`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      // Slow scroll through glossary terms
      for (let i = 0; i < 12; i++) {
        await page.mouse.wheel(0, 200);
        await page.waitForTimeout(600);
      }
      await page.waitForTimeout(2000);
    }
  },
];

async function createVideo(video) {
  console.log(`\n📹 Recording: ${video.name}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: outDir, size: videoSize },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  const page = await context.newPage();

  try {
    // First navigate to homepage to set localStorage, then unlock
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await unlockAllModules(page);
    await page.waitForTimeout(500);
    // Now run the video actions with all modules unlocked
    await video.actions(page);
  } catch (e) {
    console.log(`  Warning: ${e.message}`);
  }

  await page.close();
  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  // Rename raw file
  const rawPath = path.join(outDir, `${video.name}-raw.webm`);
  fs.renameSync(videoPath, rawPath);

  // ffmpeg: scale to 1080x1920, add text overlay, convert to mp4
  const finalPath = path.join(outDir, `${video.name}.mp4`);
  const textMain = video.text.replace(/'/g, "'\\''");
  const textSub = video.subtext.replace(/'/g, "'\\''");

  // Scale/pad to 1080x1920 TikTok size — same as original working videos
  const ffmpegCmd = `ffmpeg -y -i "${rawPath}" -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black" -c:v libx264 -preset fast -crf 23 -an "${finalPath}" 2>&1`;

  try {
    execSync(ffmpegCmd, { stdio: 'pipe' });
    console.log(`  ✓ ${video.name}.mp4`);
    fs.unlinkSync(rawPath);
  } catch (e) {
    console.log(`  ✗ ffmpeg error, keeping raw: ${rawPath}`);
  }
}

async function main() {
  console.log('🎬 Creating TikTok videos...');
  console.log(`Output: ${outDir}\n`);

  for (const video of videos) {
    const finalPath = path.join(outDir, `${video.name}.mp4`);
    if (fs.existsSync(finalPath)) {
      console.log(`⚠  ${video.name}.mp4 exists, skipping`);
      continue;
    }
    await createVideo(video);
  }

  console.log('\n✅ Done!');
  console.log('Upload to TikTok and add trending audio in the editor.');
}

main().catch(console.error);
