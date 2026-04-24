const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname);
const framesDir = path.join(outDir, 'frames');

const viewport = { width: 430, height: 932 };
const deviceScaleFactor = 3;

const videos = [
  {
    name: 'tt-02-tile-trainer',
    // Use Module 0 (unlocked) to show actual lesson content
    url: 'https://welcome2mahj.com/module/0',
    scrollSteps: 25,
    scrollAmount: 150,
  },
  {
    name: 'tt-03-charleston',
    // Use the play/practice walkthrough which has visible content
    url: 'https://welcome2mahj.com/play',
    scrollSteps: 25,
    scrollAmount: 150,
  },
];

async function captureAndStitch(video) {
  const videoFramesDir = path.join(framesDir, video.name);
  if (fs.existsSync(videoFramesDir)) fs.rmSync(videoFramesDir, { recursive: true });
  fs.mkdirSync(videoFramesDir, { recursive: true });

  console.log(`\n📸 Capturing: ${video.name} from ${video.url}...`);

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

  // Hold first frame
  for (let i = 0; i < 18; i++) {
    await page.screenshot({ path: path.join(videoFramesDir, `frame-${String(frameNum++).padStart(5, '0')}.png`), type: 'png' });
  }

  // Scroll
  for (let step = 0; step < video.scrollSteps; step++) {
    await page.evaluate((amt) => window.scrollBy(0, amt), video.scrollAmount);
    await page.waitForTimeout(80);
    for (let f = 0; f < 3; f++) {
      await page.screenshot({ path: path.join(videoFramesDir, `frame-${String(frameNum++).padStart(5, '0')}.png`), type: 'png' });
    }
  }

  // Hold last frame
  for (let i = 0; i < 18; i++) {
    await page.screenshot({ path: path.join(videoFramesDir, `frame-${String(frameNum++).padStart(5, '0')}.png`), type: 'png' });
  }

  await context.close();
  await browser.close();
  console.log(`  ✓ ${frameNum} frames captured`);

  const outputPath = path.join(outDir, `${video.name}.mp4`);
  const cmd = `ffmpeg -y -framerate 12 -i "${videoFramesDir}/frame-%05d.png" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p "${outputPath}" 2>&1`;

  try {
    execSync(cmd, { stdio: 'pipe', timeout: 60000 });
    const stats = fs.statSync(outputPath);
    console.log(`  ✓ ${video.name}.mp4 (${(stats.size / 1024 / 1024).toFixed(1)}MB)`);
  } catch (e) {
    console.log(`  ✗ ffmpeg error`);
  }
}

async function main() {
  for (const video of videos) {
    await captureAndStitch(video);
  }

  // Show all video sizes
  console.log('\n\n=== ALL VIDEOS ===');
  const files = fs.readdirSync(outDir).filter(f => f.endsWith('.mp4')).sort();
  for (const f of files) {
    const stats = fs.statSync(path.join(outDir, f));
    console.log(`  ${f} — ${(stats.size / 1024 / 1024).toFixed(1)}MB`);
  }
}

main().catch(console.error);
