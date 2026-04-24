const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const outDir = __dirname;
const framesDir = path.join(outDir, 'frames');

const viewport = { width: 430, height: 932 };
const deviceScaleFactor = 3;

// 12 fps, targeting ~20-25 seconds per video
// 12fps * 20s = 240 frames, 12fps * 25s = 300 frames

const videos = [
  {
    name: 'tt-01-pov-learn-mahjong',
    url: 'https://welcome2mahj.com',
    holdStart: 30,    // 2.5s pause at start
    scrollSteps: 35,  // more steps
    scrollAmount: 100, // smaller scroll = slower
    framesPerStep: 5,  // more frames per step = slower feel
    holdEnd: 30,       // 2.5s pause at end
  },
  {
    name: 'tt-02-tile-trainer',
    url: 'https://welcome2mahj.com/module/0',
    holdStart: 30,
    scrollSteps: 35,
    scrollAmount: 100,
    framesPerStep: 5,
    holdEnd: 30,
  },
  {
    name: 'tt-03-charleston',
    url: 'https://welcome2mahj.com/play',
    holdStart: 30,
    scrollSteps: 35,
    scrollAmount: 100,
    framesPerStep: 5,
    holdEnd: 30,
  },
  {
    name: 'tt-04-cheat-sheet',
    url: 'https://welcome2mahj.com/cheatsheet',
    holdStart: 30,
    scrollSteps: 35,
    scrollAmount: 100,
    framesPerStep: 5,
    holdEnd: 30,
  },
  {
    name: 'tt-05-scoring-calculator',
    url: 'https://welcome2mahj.com/calculator',
    holdStart: 30,
    scrollSteps: 30,
    scrollAmount: 100,
    framesPerStep: 5,
    holdEnd: 30,
  },
];

const overlays = [
  { video: 'tt-01', top: "POV: you're about to learn American Mahjong", bottom: "welcome2mahj.com — link in bio" },
  { video: 'tt-02', top: "What your first lesson looks like", bottom: "14 lessons from zero to game night" },
  { video: 'tt-03', top: "Learn the full setup before your first game", bottom: "Practice round walkthrough — link in bio" },
  { video: 'tt-04', top: "Print this before your first game night", bottom: "Free cheat sheet — link in bio" },
  { video: 'tt-05', top: '"Who pays what?" — never argue again', bottom: "Free scoring calculator — link in bio" },
];

async function captureAndStitch(video) {
  const videoFramesDir = path.join(framesDir, video.name);
  if (fs.existsSync(videoFramesDir)) fs.rmSync(videoFramesDir, { recursive: true });
  fs.mkdirSync(videoFramesDir, { recursive: true });

  console.log(`\n📸 ${video.name} (${video.url})...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  });

  const page = await context.newPage();
  await page.goto(video.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  let frameNum = 0;
  const snap = async () => {
    await page.screenshot({ path: path.join(videoFramesDir, `frame-${String(frameNum++).padStart(5, '0')}.png`), type: 'png' });
  };

  // Hold on first frame
  for (let i = 0; i < video.holdStart; i++) await snap();

  // Slow scroll
  for (let step = 0; step < video.scrollSteps; step++) {
    await page.evaluate((amt) => window.scrollBy(0, amt), video.scrollAmount);
    await page.waitForTimeout(50);
    for (let f = 0; f < video.framesPerStep; f++) await snap();
  }

  // Hold on last frame
  for (let i = 0; i < video.holdEnd; i++) await snap();

  await context.close();
  await browser.close();

  const totalSeconds = (frameNum / 12).toFixed(1);
  console.log(`  ✓ ${frameNum} frames (~${totalSeconds}s)`);

  // Stitch with ffmpeg
  const outputPath = path.join(outDir, `${video.name}.mp4`);
  const cmd = `ffmpeg -y -framerate 12 -i "${videoFramesDir}/frame-%05d.png" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p "${outputPath}" 2>&1`;

  try {
    execSync(cmd, { stdio: 'pipe', timeout: 120000 });
    const stats = fs.statSync(outputPath);
    console.log(`  ✓ ${video.name}.mp4 (${(stats.size / 1024 / 1024).toFixed(1)}MB)`);
  } catch (e) {
    console.log(`  ✗ ffmpeg error`);
  }
}

async function main() {
  console.log('🎬 Recording TikTok videos (slower, ~20-25s each)\n');

  for (const video of videos) {
    await captureAndStitch(video);
  }

  console.log('\n\n═══════════════════════════════════════════');
  console.log('TEXT OVERLAYS — Add in TikTok editor:');
  console.log('═══════════════════════════════════════════\n');

  overlays.forEach(o => {
    console.log(`${o.video}:`);
    console.log(`  TOP:    ${o.top}`);
    console.log(`  BOTTOM: ${o.bottom}\n`);
  });

  console.log('Add a trending sound + post!');
}

main().catch(console.error);
