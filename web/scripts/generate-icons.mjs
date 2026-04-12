import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const svgPath = join(root, "public", "favicon.svg");
const svg = readFileSync(svgPath);

const tasks = [
  { size: 192, out: join(root, "public", "icons", "icon-192.png"), flatten: true },
  { size: 512, out: join(root, "public", "icons", "icon-512.png"), flatten: true },
  {
    size: 1024,
    out: join(
      root,
      "ios",
      "App",
      "App",
      "Assets.xcassets",
      "AppIcon.appiconset",
      "AppIcon-512@2x.png"
    ),
    flatten: true,
  },
];

for (const { size, out, flatten } of tasks) {
  let pipeline = sharp(svg).resize(size, size);
  if (flatten) {
    // App Store requires no alpha channel on the 1024x1024 icon
    pipeline = pipeline.flatten({ background: "#1A4D2E" });
  }
  await pipeline.png().toFile(out);
  console.log(`wrote ${out} (${size}x${size})`);
}
