/**
 * Bot AI for American Mahjong practice rounds.
 *
 * Pattern-targeted strategy:
 * - Each bot picks a target hand pattern from the practice library
 * - Discards tiles that don't fit the target
 * - Calls only when the tile fits the target pattern
 * - Can switch target mid-game if key tiles are dead
 * - Never discard jokers or flowers/seasons (unless they don't fit target)
 */

import type { TileData } from "./tiles";
import { tileKey } from "./tiles";
import type { ExposedGroup, CallType } from "./calling";
import { countMatching, canCallPung, canCallKong, canCallQuint, canCallMahjong } from "./calling";
import {
  PRACTICE_PATTERNS,
  suggestPatterns,
  tileFitsPattern,
  patternProgress,
  type HandPattern,
} from "./patterns";

/* ───── Target selection ───── */

/**
 * Choose a target hand pattern for a bot based on their dealt tiles.
 * Picks from top suggestions with some randomness for variety.
 */
export function chooseBotTarget(
  hand: TileData[],
  exposedGroups: ExposedGroup[]
): HandPattern {
  const suggestions = suggestPatterns(hand, exposedGroups, 5);
  if (suggestions.length === 0) return PRACTICE_PATTERNS[0]; // fallback — should never happen

  // Pick from top 3 with weighted random (best = most likely)
  const top = suggestions.slice(0, 3);

  const weights = top.map((s, i) => s.score * (3 - i)); // favor higher scores
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * totalWeight;
  for (let i = 0; i < top.length; i++) {
    r -= weights[i];
    if (r <= 0) return top[i].pattern;
  }
  return top[0].pattern;
}

/**
 * Check if a bot should switch their target hand.
 * Returns new target or null to keep current.
 */
export function shouldBotSwitchTarget(
  hand: TileData[],
  exposedGroups: ExposedGroup[],
  currentTarget: HandPattern,
  turnCount: number
): HandPattern | null {
  // Only consider switching every 5 turns
  if (turnCount % 5 !== 0 || turnCount === 0) return null;

  const currentProgress = patternProgress(hand, exposedGroups, currentTarget);
  const suggestions = suggestPatterns(hand, exposedGroups, 3);

  // Switch if there's a clearly better option (>20% improvement)
  if (
    suggestions.length > 0 &&
    suggestions[0].pattern.id !== currentTarget.id &&
    suggestions[0].score > currentProgress.completion + 0.2
  ) {
    return suggestions[0].pattern;
  }

  return null;
}

/* ───── Discard strategy ───── */

/**
 * Choose which tile a bot should discard based on their target pattern.
 */
export function chooseBotDiscard(
  hand: TileData[],
  exposedGroups: ExposedGroup[],
  targetPattern: HandPattern | null
): TileData {
  // Never discard jokers
  const candidates = hand.filter((t) => t.type !== "joker");

  if (candidates.length === 0) {
    const nonJoker = hand.find((t) => t.type !== "joker");
    return nonJoker ?? hand[0];
  }

  // If no target, fall back to basic heuristics
  if (!targetPattern) {
    return basicDiscard(candidates, hand);
  }

  // Score each candidate: higher = more expendable
  let bestScore = -Infinity;
  let bestTile = candidates[0];

  // Count duplicates
  const keyCounts: Record<string, number> = {};
  for (const t of hand) {
    const k = tileKey(t);
    keyCounts[k] = (keyCounts[k] ?? 0) + 1;
  }

  for (const t of candidates) {
    let score = 0;
    const k = tileKey(t);
    const count = keyCounts[k] ?? 1;
    const fits = tileFitsPattern(t, targetPattern);

    // Primary signal: does it fit the target pattern?
    if (!fits) {
      score += 25; // doesn't fit = strong discard candidate
    } else {
      score -= 15; // fits pattern = want to keep

      // Extra value for duplicates (pairs/triples toward groups)
      if (count >= 3) score -= 12;
      else if (count >= 2) score -= 6;
    }

    // Flowers: keep if pattern uses flowers, discard if not
    if (t.type === "flower" || t.type === "season") {
      const patternUsesFlowers = targetPattern.groups.some(
        (g) => g.tile.type === "flower"
      );
      score = patternUsesFlowers ? -20 : 20;
    }

    // Small randomness to vary play
    score += Math.random() * 2;

    if (score > bestScore) {
      bestScore = score;
      bestTile = t;
    }
  }

  return bestTile;
}

/** Fallback discard when no target pattern (shouldn't happen, but just in case). */
function basicDiscard(candidates: TileData[], hand: TileData[]): TileData {
  const suitCounts = { bam: 0, crack: 0, dot: 0 };
  for (const t of hand) {
    if (t.type === "bam" || t.type === "crack" || t.type === "dot") {
      suitCounts[t.type]++;
    }
  }
  const bestSuit = (Object.entries(suitCounts) as [string, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  let bestScore = -Infinity;
  let bestTile = candidates[0];

  for (const t of candidates) {
    let score = 0;
    if (t.type === "bam" || t.type === "crack" || t.type === "dot") {
      score = t.type === bestSuit ? -10 : 10;
    } else if (t.type === "wind" || t.type === "dragon") {
      score = 5;
    }
    score += Math.random() * 2;
    if (score > bestScore) {
      bestScore = score;
      bestTile = t;
    }
  }
  return bestTile;
}

/* ───── Call decision ───── */

/**
 * Decide whether a bot should call a discarded tile.
 * Only calls if the tile fits their target pattern.
 */
export function shouldBotCall(
  hand: TileData[],
  discard: TileData,
  exposedGroups: ExposedGroup[],
  targetPattern: HandPattern | null,
  turnCount: number
): CallType | null {
  if (discard.type === "joker") return null;
  if (!targetPattern) return null;

  // Mahjong check first — always check regardless of pattern/closed status
  if (canCallMahjong(hand, discard, exposedGroups)) {
    return "mahjong";
  }

  // Check if tile fits the target pattern at all
  const fits = tileFitsPattern(discard, targetPattern);
  if (!fits) return null;

  // Closed patterns: cannot call pung/kong/quint
  const isClosed = targetPattern.exposure === "closed";

  // Check Quint first (highest value)
  if (!isClosed && canCallQuint(hand, discard)) {
    return "quint";
  }

  // Check Kong
  if (!isClosed && canCallKong(hand, discard)) {
    return "kong";
  }

  // Check Pung — be more selective
  if (!isClosed && canCallPung(hand, discard)) {
    const matchCount = countMatching(hand, discard);

    // Always call if we have a natural pair and it fits
    if (matchCount >= 2) return "pung";

    // Mid/late game — call more aggressively
    if (turnCount > 6) return "pung";

    return null;
  }

  return null;
}

/* ───── Bot insight generation ───── */

/**
 * Generate a coaching insight about what a bot is doing.
 * References their target pattern category for educational value.
 */
export function generateBotInsight(
  botName: string,
  discardTile: TileData,
  targetPattern: HandPattern | null
): string | null {
  if (!targetPattern) return null;

  const category = targetPattern.category;
  const categoryNames: Record<string, string> = {
    "2468": "even numbers",
    "13579": "odd numbers",
    "consecutive-run": "a consecutive run",
    "any-like-numbers": "like numbers",
    "369": "3-6-9 tiles",
    "winds-dragons": "winds and dragons",
    "singles-pairs": "singles and pairs",
    "quints": "quints",
    "addition": "an addition hand",
  };

  const categoryLabel = categoryNames[category] ?? category;

  // Insight based on what they discarded
  const isSuited =
    discardTile.type === "bam" || discardTile.type === "crack" || discardTile.type === "dot";
  const isHonor = discardTile.type === "wind" || discardTile.type === "dragon";

  if (isSuited && (category === "winds-dragons")) {
    return `${botName} is discarding suited tiles — they might be going for ${categoryLabel}.`;
  }

  if (isHonor && category !== "winds-dragons") {
    return `${botName} let go of an honor tile — they're probably focused on ${categoryLabel}.`;
  }

  if (isSuited) {
    const suitName = discardTile.type === "bam" ? "Bams" : discardTile.type === "crack" ? "Craks" : "Dots";
    return `${botName} discarded a ${suitName.slice(0, -1).toLowerCase()} — probably not collecting ${suitName}.`;
  }

  return null;
}
