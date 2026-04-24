const fs = require('fs');
const path = require('path');

const dir = __dirname;
const tileDir = path.join(dir, 'tile-images');

// Load tile images as base64 — these are screenshots from the actual MAHJ app
function loadTile(name) {
  const p = path.join(tileDir, `${name}.png`);
  const buf = fs.readFileSync(p);
  return 'data:image/png;base64,' + buf.toString('base64');
}

const tileImages = {
  joker: loadTile('joker'),
  'red-dragon': loadTile('red-dragon'),
  'crack1': loadTile('1-of-characters'),
  'bam8': loadTile('8-of-bamboo'),
  'dot5': loadTile('5-of-dots'),
};

// Tile size in SVG
const tw = 135, th = 180;

// Load tinted tile images — dark (green) for dark bg, light (tan) for beige bg
function loadTileImg(sub, name) {
  return 'data:image/png;base64,' + fs.readFileSync(path.join(tileDir, sub, name)).toString('base64');
}
const darkTileImgs = {
  joker: loadTileImg('dark', 'joker.png'),
  'red-dragon': loadTileImg('dark', 'red-dragon.png'),
  crack1: loadTileImg('dark', '1-of-characters.png'),
  bam8: loadTileImg('dark', '8-of-bamboo.png'),
  dot5: loadTileImg('dark', '5-of-dots.png'),
};
const lightTileImgs = {
  joker: loadTileImg('light', 'joker.png'),
  'red-dragon': loadTileImg('light', 'red-dragon.png'),
  crack1: loadTileImg('light', '1-of-characters.png'),
  bam8: loadTileImg('light', '8-of-bamboo.png'),
  dot5: loadTileImg('light', '5-of-dots.png'),
};

// 4 tile layouts using 6 tiles each
// [x, y, rotation, tileKey]
// Tiles arranged in a CIRCLE around center, like clock positions
// Center of canvas: x=540, y=620 (slightly below middle)
// Ring radius: ~380px from center
// 6 tiles at: 10 o'clock, 2 o'clock, 4 o'clock, 5 o'clock, 7 o'clock, 11 o'clock
function circleLayout(tiles6) {
  const cx = 540, cy = 580, r = 440;
  const angles = [-120, -45, 30, 85, 145, -160]; // degrees, 0=right
  return tiles6.map((tileKey, i) => {
    const rad = angles[i] * Math.PI / 180;
    const x = Math.round(cx + r * Math.cos(rad) - tw/2);
    const y = Math.round(cy + r * Math.sin(rad) - th/2);
    const rot = Math.round(angles[i] * 0.15); // gentle rotation following the angle
    return [x, y, rot, tileKey];
  });
}

const tileArrangements = [
  circleLayout(['dot5', 'red-dragon', 'crack1', 'bam8', 'joker', 'dot5']),
  circleLayout(['joker', 'crack1', 'red-dragon', 'dot5', 'bam8', 'crack1']),
  circleLayout(['bam8', 'red-dragon', 'dot5', 'crack1', 'joker', 'bam8']),
  circleLayout(['dot5', 'joker', 'bam8', 'red-dragon', 'crack1', 'dot5']),
];

function makeTiles(h, layoutIdx, isDark) {
  const s = h / 1350;
  const layout = tileArrangements[layoutIdx % 4];
  const tiles = layout.map(([x, y, rot, tileKey]) => {
    const sy = Math.round(y * s);
    const cx = x + tw/2, cy = sy + th/2;
    const tileSet = isDark ? darkTileImgs : lightTileImgs;
    const dataUri = tileSet[tileKey];
    if (!dataUri) return '';

    const opacity = isDark ? 0.65 : 0.55;

    return `
      <g transform="rotate(${rot} ${cx} ${cy})" opacity="${opacity}">
        <image href="${dataUri}" x="${x}" y="${sy}" width="${tw}" height="${th}" preserveAspectRatio="xMidYMid meet"/>
      </g>`;
  }).join('');

  return `\n    <g>${tiles}\n    </g>`;
}

// ── TEXT HELPERS ──

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

function escXml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}

// ── SVG GENERATORS ──

function darkSVG(label, headline, subtitle, w, h, layoutIdx) {
  const headlineLines = wrapText(headline, 18);
  const lineHeight = 76;
  const totalHeadlineHeight = (headlineLines.length - 1) * lineHeight;
  const centerY = Math.round(h * 0.46);
  const labelY = centerY - totalHeadlineHeight/2 - 70;
  const headlineStartY = centerY - totalHeadlineHeight/2;
  const subtitleY = centerY + totalHeadlineHeight/2 + 55;

  const headlineText = headlineLines.map((line, i) =>
    `<tspan x="${w/2}" dy="${i === 0 ? 0 : lineHeight}">${escXml(line)}</tspan>`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <radialGradient id="bg" cx="50%" cy="46%" r="55%">
      <stop offset="0%" stop-color="#2a6e4a"/>
      <stop offset="60%" stop-color="#1a5535"/>
      <stop offset="100%" stop-color="#0F3320"/>
    </radialGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="3"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${makeTiles(h, layoutIdx, true)}
  <text x="${w/2}" y="${labelY}" text-anchor="middle" font-family="'Lato',Helvetica,Arial,sans-serif" font-size="24" font-weight="700" letter-spacing="5" fill="#C8A951">${escXml(label)}</text>
  <text x="${w/2}" y="${headlineStartY}" text-anchor="middle" font-family="'Playfair Display',Georgia,serif" font-size="62" font-weight="900" fill="white">
    ${headlineText}
  </text>
  <text x="${w/2}" y="${subtitleY}" text-anchor="middle" font-family="'Lato',Helvetica,Arial,sans-serif" font-size="28" font-weight="300" fill="rgba(255,255,255,0.55)">${escXml(subtitle)}</text>
  <text x="${w/2}" y="${h - 60}" text-anchor="middle" font-family="'Lato',Helvetica,Arial,sans-serif" font-size="20" font-weight="400" letter-spacing="2" fill="rgba(255,255,255,0.25)">welcome2mahj.com</text>
</svg>`;
}

function lightSVG(label, headline, subtitle, w, h, layoutIdx) {
  const headlineLines = wrapText(headline, 18);
  const lineHeight = 76;
  const totalHeadlineHeight = (headlineLines.length - 1) * lineHeight;
  const centerY = Math.round(h * 0.46);
  const labelY = centerY - totalHeadlineHeight/2 - 70;
  const headlineStartY = centerY - totalHeadlineHeight/2;
  const subtitleY = centerY + totalHeadlineHeight/2 + 55;

  const headlineText = headlineLines.map((line, i) =>
    `<tspan x="${w/2}" dy="${i === 0 ? 0 : lineHeight}">${escXml(line)}</tspan>`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EBE2C8"/>
      <stop offset="50%" stop-color="#E2D8B5"/>
      <stop offset="100%" stop-color="#CCBF8F"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="3"/></filter>
    <radialGradient id="glow" cx="50%" cy="40%" r="35%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#FAF5E5" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FAF5E5" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${makeTiles(h, layoutIdx, false)}
  <text x="${w/2}" y="${labelY}" text-anchor="middle" font-family="'Lato',Helvetica,Arial,sans-serif" font-size="24" font-weight="700" letter-spacing="5" fill="#1A4D2E">${escXml(label)}</text>
  <text x="${w/2}" y="${headlineStartY}" text-anchor="middle" font-family="'Playfair Display',Georgia,serif" font-size="62" font-weight="900" fill="#0F3320">
    ${headlineText}
  </text>
  <text x="${w/2}" y="${subtitleY}" text-anchor="middle" font-family="'Lato',Helvetica,Arial,sans-serif" font-size="28" font-weight="300" fill="rgba(15,51,32,0.45)">${escXml(subtitle)}</text>
  <text x="${w/2}" y="${h - 60}" text-anchor="middle" font-family="'Lato',Helvetica,Arial,sans-serif" font-size="20" font-weight="400" letter-spacing="2" fill="rgba(15,51,32,0.18)">welcome2mahj.com</text>
</svg>`;
}

// ── POST DATA ──

const igCommunity = [
  { theme:'dark', label:'REAL TALK', headline:'Your Next Hobby Is Waiting at a Table', subtitle:'Not a screen. A real table. With real people.' },
  { theme:'light', label:'COMMUNITY', headline:'Nobody Learns Mahjong Alone', subtitle:'That\'s the whole point.' },
  { theme:'dark', label:'DID YOU KNOW', headline:'Mahjong Groups Are Popping Up Everywhere', subtitle:'Libraries. Coffee shops. Living rooms.' },
  { theme:'light', label:'REAL TALK', headline:'Remember When We Used to Hang Out?', subtitle:'Like actually hang out. In person.' },
  { theme:'dark', label:'TRUTH', headline:'You Don\'t Need to Be Invited', subtitle:'Start the group yourself.' },
  { theme:'light', label:'HOW TO', headline:'Your First Mahj Night in 5 Steps', subtitle:'Easier than planning a dinner party.' },
  { theme:'dark', label:'REAL TALK', headline:'The Phone Goes Face Down', subtitle:'The unspoken rule at every Mahj table.' },
  { theme:'light', label:'COMMUNITY', headline:'4 Strangers Became Best Friends', subtitle:'All because one of them suggested Mahjong.' },
  { theme:'dark', label:'QUESTION', headline:'What If Your Favorite Hobby Doesn\'t Exist Yet?', subtitle:'Because you haven\'t tried it.' },
  { theme:'light', label:'PRO TIP', headline:'The Secret to a Great Game Night', subtitle:'It was never about the game.' },
  { theme:'dark', label:'DID YOU KNOW', headline:'100 Years of Bringing People Together', subtitle:'Your turn.' },
  { theme:'light', label:'REAL TALK', headline:'Stop Saying We Should Hang Out', subtitle:'Pick a night. Learn Mahjong. Actually do it.' },
];

const tiktok = [
  { theme:'dark', label:'DID YOU KNOW', headline:'Mahjong Night Is the New Girls\' Night', subtitle:'4 players. 1 table. Zero screens.' },
  { theme:'light', label:'PRO TIP', headline:'Start a Mahj Group', subtitle:'You just need 3 friends and one text message.' },
  { theme:'dark', label:'QUICK QUIZ', headline:'What\'s the Charleston?', subtitle:'Wrong answers welcome.' },
  { theme:'dark', label:'DID YOU KNOW', headline:'You Can Learn Mahjong in One Afternoon', subtitle:'Not months. Not years. One afternoon.' },
  { theme:'light', label:'PRO TIP', headline:'Ditch the Screen', subtitle:'The best nights happen around a table.' },
  { theme:'dark', label:'QUICK QUIZ', headline:'How Many Tiles in a Set?', subtitle:'Take a guess. Answer in comments.' },
  { theme:'dark', label:'DID YOU KNOW', headline:'Fastest Growing Hobby for Women 20-45', subtitle:'New groups are forming everywhere.' },
  { theme:'light', label:'PRO TIP', headline:'Host Your First Game Night', subtitle:'It\'s easier than you think.' },
  { theme:'dark', label:'DID YOU KNOW', headline:'Mahjong Has Its Own Language', subtitle:'Pung. Kong. Charleston. Exposure.' },
  { theme:'dark', label:'QUICK QUIZ', headline:'Is Mahjong Hard to Learn?', subtitle:'Honest answer in the caption.' },
];

// ── GENERATE ──

igCommunity.forEach((post, i) => {
  const num = 27 + i;
  const filename = `${String(num).padStart(2,'0')}-ig-${post.label.toLowerCase().replace(/\s+/g,'-')}-${i+1}.svg`;
  const svg = post.theme === 'dark'
    ? darkSVG(post.label, post.headline, post.subtitle, 1080, 1350, i)
    : lightSVG(post.label, post.headline, post.subtitle, 1080, 1350, i);
  fs.writeFileSync(path.join(dir, filename), svg);
  console.log(`IG  ${filename} (layout ${i % 4})`);
});

tiktok.forEach((post, i) => {
  const num = i + 1;
  const filename = `tt-${String(num).padStart(2,'0')}-${post.label.toLowerCase().replace(/\s+/g,'-')}-${i+1}.svg`;
  const svg = post.theme === 'dark'
    ? darkSVG(post.label, post.headline, post.subtitle, 1080, 1920, i)
    : lightSVG(post.label, post.headline, post.subtitle, 1080, 1920, i);
  fs.writeFileSync(path.join(dir, filename), svg);
  console.log(`TT  ${filename} (layout ${i % 4})`);
});

// Recreate 03-tiles.png with "Craks" instead of "Cracks"
const tiles03svg = darkSVG('', 'All 152 Tiles', 'Bams, Craks, Dots, Winds, Dragons, Jokers', 1080, 1350, 0);
fs.writeFileSync(path.join(dir, '03-tiles-new.svg'), tiles03svg);
console.log('IG  03-tiles-new.svg (replacement for 03-tiles.png)');

console.log('\n23 SVGs generated with real tile images. Converting to PNG...');
