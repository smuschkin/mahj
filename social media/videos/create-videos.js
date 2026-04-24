const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const outDir = __dirname;

// Phone viewport (TikTok vertical: 1080x1920)
const viewport = { width: 390, height: 844 };
// Record at 2x for crisp output
const videoSize = { width: 780, height: 1688 };

const videos = [
  {
    name: 'tt-01-pov-learn-mahjong',
    text: 'POV: you\\'re about to learn\\nAmerican Mahjong',
    subtext: 'welcome2mahj.com',
    actions: async (page) => {
      await page.goto('https://welcome2mahj.com', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      // Slow scroll through homepage
      for (let i = 0; i < 8; i++) {
        await page.mouse.wheel(0, 250);
        await page.waitForTimeout(800);
      }
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-02-152-tiles',
    text: '152 tiles.\\nCan you name them all?',
    subtext: 'Module 1 teaches you in 20 minutes',
    actions: async (page) => {
      await page.goto('https://welcome2mahj.com/module/1', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      for (let i = 0; i < 6; i++) {
        await page.mouse.wheel(0, 300);
        await page.waitForTimeout(900);
      }
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-03-charleston-explained',
    text: 'The Charleston explained\\nin 30 seconds',
    subtext: 'Right. Across. Left. Then back.',
    actions: async (page) => {
      await page.goto('https://welcome2mahj.com/module/4', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      for (let i = 0; i < 6; i++) {
        await page.mouse.wheel(0, 280);
        await page.waitForTimeout(900);
      }
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-04-cheat-sheet',
    text: 'Print this before\\nyour first game night',
    subtext: 'Free cheat sheet at welcome2mahj.com',
    actions: async (page) => {
      await page.goto('https://welcome2mahj.com/cheatsheet', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      for (let i = 0; i < 8; i++) {
        await page.mouse.wheel(0, 250);
        await page.waitForTimeout(800);
      }
      await page.waitForTimeout(1500);
    }
  },
  {
    name: 'tt-05-scoring-calculator',
    text: '"Who pays what?"\\nNever argue again.',
    subtext: 'Free scoring calculator',
    actions: async (page) => {
      await page.goto('https://welcome2mahj.com/calculator', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      for (let i = 0; i < 5; i++) {
        await page.mouse.wheel(0, 250);
        await page.waitForTimeout(900);
      }
      await page.waitForTimeout(1500);
    }
  },
];

async function createVideo(video, index) {
  console.log(`\n📹 Recording: ${video.name}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: outDir,
      size: videoSize,
    }
  });

  const page = await context.newPage();

  try {
    await video.actions(page);
  } catch (e) {
    console.log(`  Warning: ${e.message}`);
  }

  await page.close();
  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  // Rename the auto-generated video file
  const rawPath = path.join(outDir, `${video.name}-raw.webm`);
  fs.renameSync(videoPath, rawPath);

  // Use ffmpeg to:
  // 1. Scale to 1080x1920 (TikTok dimensions)
  // 2. Add text overlay
  // 3. Convert to mp4
  const finalPath = path.join(outDir, `${video.name}.mp4`);

  const textMain = video.text.replace(/'/g, "'\\''");
  const textSub = video.subtext.replace(/'/g, "'\\''");

  const ffmpegCmd = `ffmpeg -y -i "${rawPath}" -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black,drawtext=text='${textMain}':fontsize=48:fontcolor=white:borderw=3:bordercolor=black@0.6:x=(w-text_w)/2:y=120:font=Arial,drawtext=text='${textSub}':fontsize=28:fontcolor=white@0.8:borderw=2:bordercolor=black@0.4:x=(w-text_w)/2:y=1800:font=Arial" -c:v libx264 -preset fast -crf 23 -an "${finalPath}" 2>&1`;

  try {
    execSync(ffmpegCmd, { stdio: 'pipe' });
    console.log(`  ✓ Created: ${video.name}.mp4`);
    // Clean up raw file
    fs.unlinkSync(rawPath);
  } catch (e) {
    console.log(`  ✗ ffmpeg error, keeping raw file: ${rawPath}`);
    console.log(`  ${e.message.split('\n').slice(-3).join('\n')}`);
  }
}

async function main() {
  console.log('🎬 Creating TikTok videos...');
  console.log(`Output directory: ${outDir}\n`);

  // Create videos directory
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < videos.length; i++) {
    await createVideo(videos[i], i);
  }

  console.log('\n✅ Done! Videos are in the social media/videos/ folder.');
  console.log('Upload to TikTok and add a trending sound in the editor.');
}

main().catch(console.error);
