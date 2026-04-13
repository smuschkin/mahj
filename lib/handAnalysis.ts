import type { TileData, TileType } from "./tiles";
import { tileKey } from "./tiles";

/** Suit counts in a hand */
export type SuitCounts = { bam: number; crack: number; dot: number };

/** Hand analysis result */
export type HandAnalysis = {
  suitCounts: SuitCounts;
  bestSuit: { suit: string; count: number } | null;
  suitConcentration: number; // 0–1, how focused on one suit
  jokerCount: number;
  flowerCount: number;
  pairCount: number;
  tripleCount: number;
  honorCount: number; // winds + dragons
  patterns: string[]; // detected hand pattern hints
};

/** Analyze a hand and return stats + pattern hints */
export function analyzeHand(hand: TileData[]): HandAnalysis {
  const suitCounts: SuitCounts = { bam: 0, crack: 0, dot: 0 };
  let jokerCount = 0;
  let flowerCount = 0;
  let honorCount = 0;

  // Count by key for pairs/triples
  const keyCounts: Record<string, number> = {};

  for (const t of hand) {
    const k = tileKey(t);
    keyCounts[k] = (keyCounts[k] ?? 0) + 1;

    if (t.type === "bam") suitCounts.bam++;
    else if (t.type === "crack") suitCounts.crack++;
    else if (t.type === "dot") suitCounts.dot++;
    else if (t.type === "joker") jokerCount++;
    else if (t.type === "flower" || t.type === "season") flowerCount++;
    else if (t.type === "wind" || t.type === "dragon") honorCount++;
  }

  const suitEntries = Object.entries(suitCounts) as [string, number][];
  const bestSuit = suitEntries.sort((a, b) => b[1] - a[1])[0];
  const totalSuited = suitCounts.bam + suitCounts.crack + suitCounts.dot;
  const suitConcentration = totalSuited > 0 ? bestSuit[1] / totalSuited : 0;

  const pairCount = Object.values(keyCounts).filter((c) => c >= 2).length;
  const tripleCount = Object.values(keyCounts).filter((c) => c >= 3).length;

  // Detect patterns
  const patterns: string[] = [];

  // All one suit
  if (bestSuit[1] >= 8) {
    patterns.push(`Strong ${capitalize(bestSuit[0])} hand — ${bestSuit[1]} tiles in one suit`);
  } else if (bestSuit[1] >= 6) {
    patterns.push(`Leaning ${capitalize(bestSuit[0])} — ${bestSuit[1]} tiles, could become a same-suit hand`);
  }

  // Even/odd
  const suitedTiles = hand.filter(
    (t) => t.type === "bam" || t.type === "crack" || t.type === "dot"
  );
  const evenCount = suitedTiles.filter(
    (t) => typeof t.value === "number" && t.value % 2 === 0
  ).length;
  const oddCount = suitedTiles.filter(
    (t) => typeof t.value === "number" && t.value % 2 === 1
  ).length;
  if (evenCount >= 7) patterns.push(`Lots of even numbers (${evenCount}) — look at 2468 hands`);
  if (oddCount >= 7) patterns.push(`Lots of odd numbers (${oddCount}) — look at 13579 hands`);

  // Winds & Dragons
  if (honorCount >= 5) {
    patterns.push(`${honorCount} honor tiles — check Winds & Dragons hands`);
  }

  // Consecutive potential
  for (const suit of ["bam", "crack", "dot"] as const) {
    const vals = hand
      .filter((t) => t.type === suit && typeof t.value === "number")
      .map((t) => t.value as number);
    const unique = [...new Set(vals)].sort((a, b) => a - b);
    for (let i = 0; i < unique.length - 2; i++) {
      if (unique[i + 1] === unique[i] + 1 && unique[i + 2] === unique[i] + 2) {
        patterns.push(
          `${unique[i]}-${unique[i + 1]}-${unique[i + 2]} ${capitalize(suit)} — consecutive run potential`
        );
        break;
      }
    }
  }

  // 369
  const threeNineCounts = suitedTiles.filter(
    (t) => typeof t.value === "number" && [3, 6, 9].includes(t.value)
  ).length;
  if (threeNineCounts >= 5) {
    patterns.push(`${threeNineCounts} tiles are 3s, 6s, or 9s — look at 369 hands`);
  }

  // Pairs/triples
  if (tripleCount >= 2) patterns.push(`${tripleCount} triples — strong pung foundation`);
  if (pairCount >= 4) patterns.push(`${pairCount} pairs — could support a Singles & Pairs hand`);

  if (patterns.length === 0) {
    patterns.push("No strong pattern yet — stay flexible and keep 2–3 candidates");
  }

  return {
    suitCounts,
    bestSuit: bestSuit ? { suit: bestSuit[0], count: bestSuit[1] } : null,
    suitConcentration,
    jokerCount,
    flowerCount,
    pairCount,
    tripleCount,
    honorCount,
    patterns,
  };
}

/** Rate the quality of a pass (which tiles were selected to pass) */
export function ratePass(
  hand: TileData[],
  passedIds: Set<number>
): { rating: "great" | "good" | "risky"; feedback: string; suggestion: string | null } {
  const passed = hand.filter((t) => passedIds.has(t.id));
  const kept = hand.filter((t) => !passedIds.has(t.id));

  const analysis = analyzeHand(kept);
  const bestSuit = analysis.bestSuit;

  // Check if passed tiles were off-suit junk
  let offSuitCount = 0;
  let onSuitCount = 0;
  let passedHonors = 0;
  let passedUseful = 0;

  for (const t of passed) {
    if (t.type === "wind" || t.type === "dragon") {
      passedHonors++;
    } else if (
      bestSuit &&
      (t.type === "bam" || t.type === "crack" || t.type === "dot")
    ) {
      if (t.type === bestSuit.suit) {
        onSuitCount++;
        passedUseful++;
      } else {
        offSuitCount++;
      }
    }
  }

  // Check if passed tiles break up pairs/triples
  const keptKeys: Record<string, number> = {};
  for (const t of kept) {
    const k = tileKey(t);
    keptKeys[k] = (keptKeys[k] ?? 0) + 1;
  }
  const handKeys: Record<string, number> = {};
  for (const t of hand) {
    const k = tileKey(t);
    handKeys[k] = (handKeys[k] ?? 0) + 1;
  }
  let brokenPairs = 0;
  for (const t of passed) {
    const k = tileKey(t);
    if ((handKeys[k] ?? 0) >= 2 && (keptKeys[k] ?? 0) < 2) {
      brokenPairs++;
    }
  }

  // Suggest better passes
  let suggestion: string | null = null;

  if (onSuitCount >= 2) {
    suggestion = `You passed ${onSuitCount} tiles from your strongest suit (${capitalize(bestSuit!.suit)}). Try to keep those and pass off-suit tiles instead.`;
    return { rating: "risky", feedback: "You passed tiles you might need!", suggestion };
  }

  if (brokenPairs >= 2) {
    suggestion = "You broke up pairs that could have become pungs. Try to keep pairs together.";
    return { rating: "risky", feedback: "You split up useful pairs.", suggestion };
  }

  if (offSuitCount >= 2 && passedUseful === 0) {
    return {
      rating: "great",
      feedback: "Smart pass — you dumped off-suit tiles and kept your strongest groups.",
      suggestion: null,
    };
  }

  if (offSuitCount >= 1 && passedHonors >= 1) {
    return {
      rating: "good",
      feedback: "Solid pass — mix of off-suit tiles and unneeded honors.",
      suggestion: analysis.honorCount >= 4
        ? "You have several honors — consider if a Winds & Dragons hand might work before passing them all."
        : null,
    };
  }

  return {
    rating: "good",
    feedback: "Reasonable pass. Keep refining as you see what comes back.",
    suggestion: null,
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
