#!/bin/bash
# Capture App Store screenshots using Chrome headless mode.
# No extra dependencies needed — uses your installed Chrome.
#
# Usage: bash scripts/screenshots.sh
#
# iPhone 15 Pro Max: 1290x2796 @ 3x = 430x932 CSS pixels
# We capture at 430x932 with device-scale-factor=3 for full retina resolution.

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:3200"
OUT="./screenshots"
WIDTH=430
HEIGHT=932
SCALE=3

mkdir -p "$OUT"

echo "Capturing App Store screenshots (${WIDTH}x${HEIGHT} @${SCALE}x = $((WIDTH*SCALE))x$((HEIGHT*SCALE)))..."
echo ""

capture() {
  local name=$1
  local url=$2
  local delay=${3:-2}

  echo "  Capturing $name..."
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --no-sandbox \
    --hide-scrollbars \
    --window-size=${WIDTH},${HEIGHT} \
    --force-device-scale-factor=${SCALE} \
    --screenshot="$OUT/$name.png" \
    --virtual-time-budget=$((delay * 1000)) \
    "$url" 2>/dev/null

  if [ -f "$OUT/$name.png" ]; then
    local size=$(identify -format "%wx%h" "$OUT/$name.png" 2>/dev/null || echo "unknown")
    echo "    ✓ $name.png ($size)"
  else
    echo "    ✗ Failed to capture $name"
  fi
}

# 1. Homepage
capture "01-homepage" "$BASE"

# 2. Tile Trainer module
capture "02-tile-trainer" "$BASE/module/1"

# 3. Charleston module
capture "03-charleston" "$BASE/module/4"

# 4. Practice Game
capture "04-practice-game" "$BASE/play?mode=game" 3

# 5. Cheat Sheet
capture "05-cheat-sheet" "$BASE/cheatsheet"

# 6. Scoring Calculator
capture "06-calculator" "$BASE/calculator"

echo ""
echo "Done! Screenshots saved to $OUT/"
echo "These are at iPhone 15 Pro Max resolution (1290x2796) for App Store submission."
