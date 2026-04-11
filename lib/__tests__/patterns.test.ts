import { describe, it, expect } from "vitest";
import {
  PRACTICE_PATTERNS,
  patternTileCount,
  matchesPattern,
  matchesAnyPattern,
  suggestPatterns,
  patternProgress,
  tileFitsPattern,
  getPatternsByCategory,
} from "../patterns";
import type { TileData } from "../tiles";

/* ───── Helpers ───── */

const bam = (v: number, id: number): TileData => ({ id, type: "bam", value: v });
const crack = (v: number, id: number): TileData => ({ id, type: "crack", value: v });
const dot = (v: number, id: number): TileData => ({ id, type: "dot", value: v });
const wind = (v: string, id: number): TileData => ({ id, type: "wind", value: v });
const dragon = (v: string, id: number): TileData => ({ id, type: "dragon", value: v });
const joker = (id: number): TileData => ({ id, type: "joker" });
const flower = (v: number, id: number): TileData => ({ id, type: "flower", value: v });
const season = (v: number, id: number): TileData => ({ id, type: "season", value: v });

describe("PRACTICE_PATTERNS", () => {
  it("all patterns have exactly 14 tiles", () => {
    for (const p of PRACTICE_PATTERNS) {
      expect(patternTileCount(p)).toBe(14);
    }
  });

  it("has at least 20 patterns", () => {
    expect(PRACTICE_PATTERNS.length).toBeGreaterThanOrEqual(20);
  });

  it("covers all 9 categories", () => {
    const categories = new Set(PRACTICE_PATTERNS.map((p) => p.category));
    expect(categories.size).toBe(9);
  });

  it("each pattern has a unique ID", () => {
    const ids = PRACTICE_PATTERNS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("displayNotation tile count matches group structure", () => {
    for (const p of PRACTICE_PATTERNS) {
      // Count characters in notation (excluding spaces)
      const notationCount = p.displayNotation.replace(/ /g, "").length;
      const groupCount = patternTileCount(p);
      expect(notationCount).toBe(groupCount);
    }
  });

  it("no suit group needs more than 4 natural tiles of one value", () => {
    for (const p of PRACTICE_PATTERNS) {
      // For each suit group label, sum the group sizes that share it
      const suitGroupTotals: Record<string, number> = {};
      for (const g of p.groups) {
        if (g.tile.type === "suit") {
          const key = `${g.tile.suitGroup}-${g.tile.value}`;
          const size = g.kind === "pair" ? 2 : g.kind === "pung" ? 3 : g.kind === "kong" ? 4 : g.kind === "quint" ? 5 : 1;
          suitGroupTotals[key] = (suitGroupTotals[key] ?? 0) + size;
        }
      }
      for (const [key, total] of Object.entries(suitGroupTotals)) {
        // Pairs can't use jokers, so if a pair shares a suit group, max natural is 4
        // Groups of 3+ can use jokers, so >4 is OK if jokers fill the gap
        // But pairs needing >4 is impossible
        const hasPairInGroup = p.groups.some(
          (g) => g.kind === "pair" && g.tile.type === "suit" &&
            `${g.tile.suitGroup}-${g.tile.value}` === key
        );
        if (hasPairInGroup && total > 4) {
          throw new Error(
            `Pattern ${p.id}: suit group ${key} needs ${total} natural tiles (has pair, max 4)`
          );
        }
      }
    }
  });
});

describe("matchesPattern", () => {
  it("matches 2468-a: FF 222 444 666 888 (all bam)", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    const hand: TileData[] = [
      flower(1, 1), flower(2, 2), // FF
      bam(2, 3), bam(2, 4), bam(2, 5), // 222
      bam(4, 6), bam(4, 7), bam(4, 8), // 444
      bam(6, 9), bam(6, 10), bam(6, 11), // 666
      bam(8, 12), bam(8, 13), bam(8, 14), // 888
    ];
    expect(matchesPattern(hand, [], pattern)).toBe(true);
  });

  it("matches 2468-a with cracks instead of bams", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    const hand: TileData[] = [
      flower(1, 1), season(2, 2),
      crack(2, 3), crack(2, 4), crack(2, 5),
      crack(4, 6), crack(4, 7), crack(4, 8),
      crack(6, 9), crack(6, 10), crack(6, 11),
      crack(8, 12), crack(8, 13), crack(8, 14),
    ];
    expect(matchesPattern(hand, [], pattern)).toBe(true);
  });

  it("rejects when wrong values", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    const hand: TileData[] = [
      flower(1, 1), flower(2, 2),
      bam(1, 3), bam(1, 4), bam(1, 5), // wrong: 1 instead of 2
      bam(4, 6), bam(4, 7), bam(4, 8),
      bam(6, 9), bam(6, 10), bam(6, 11),
      bam(8, 12), bam(8, 13), bam(8, 14),
    ];
    expect(matchesPattern(hand, [], pattern)).toBe(false);
  });

  it("matches wd-a: DD NNN EEE SSS WWW (four winds with dragon pair)", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "wd-a")!;
    const hand: TileData[] = [
      dragon("red", 1), dragon("red", 2),
      wind("N", 3), wind("N", 4), wind("N", 5),
      wind("E", 6), wind("E", 7), wind("E", 8),
      wind("S", 9), wind("S", 10), wind("S", 11),
      wind("W", 12), wind("W", 13), wind("W", 14),
    ];
    expect(matchesPattern(hand, [], pattern)).toBe(true);
  });

  it("rejects closed pattern with exposed groups", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "consec-a")!;
    expect(pattern.exposure).toBe("closed");
    const hand: TileData[] = Array.from({ length: 11 }, (_, i) =>
      bam(1, i + 1)
    );
    const exposed = [{
      tiles: [bam(2, 100), bam(2, 101), bam(2, 102)],
      callType: "pung" as const,
      calledTile: bam(2, 102),
    }];
    expect(matchesPattern(hand, exposed, pattern)).toBe(false);
  });

  it("matches with jokers substituting in pungs", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    const hand: TileData[] = [
      flower(1, 1), flower(2, 2),
      bam(2, 3), bam(2, 4), joker(5), // pung of 2 with joker
      bam(4, 6), bam(4, 7), bam(4, 8),
      bam(6, 9), bam(6, 10), bam(6, 11),
      bam(8, 12), bam(8, 13), bam(8, 14),
    ];
    expect(matchesPattern(hand, [], pattern)).toBe(true);
  });

  it("three-suit pattern rejects all-one-suit hand", () => {
    // "Even Three-Suit" pattern requires 3 different suits (labels A, B, C)
    // A hand with all bams should NOT match this pattern
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-c")!;
    const hand: TileData[] = [
      flower(1, 1), flower(2, 2),
      bam(2, 3), bam(2, 4), bam(2, 5), bam(2, 6),
      bam(4, 7), bam(4, 8), bam(4, 9), bam(4, 10),
      bam(6, 11), bam(6, 12), bam(6, 13), bam(6, 14),
    ];
    // This has 4 bam-2, 4 bam-4, 4 bam-6 — perfect if A=B=C=bam
    // But pattern says different suits, so it should FAIL
    expect(matchesPattern(hand, [], pattern)).toBe(false);
  });

  it("three-suit pattern matches when suits are actually different", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-c")!;
    const hand: TileData[] = [
      flower(1, 1), flower(2, 2),
      bam(2, 3), bam(2, 4), bam(2, 5), bam(2, 6),
      crack(4, 7), crack(4, 8), crack(4, 9), crack(4, 10),
      dot(6, 11), dot(6, 12), dot(6, 13), dot(6, 14),
    ];
    expect(matchesPattern(hand, [], pattern)).toBe(true);
  });

  it("matches seven pairs (S&P)", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "sp-a")!;
    const hand: TileData[] = [
      bam(1, 1), bam(1, 2),
      crack(3, 3), crack(3, 4),
      dot(5, 5), dot(5, 6),
      wind("N", 7), wind("N", 8),
      dragon("red", 9), dragon("red", 10),
      bam(7, 11), bam(7, 12),
      crack(9, 13), crack(9, 14),
    ];
    expect(matchesPattern(hand, [], pattern)).toBe(true);
  });
});

describe("matchesAnyPattern", () => {
  it("returns pattern when hand matches", () => {
    const hand: TileData[] = [
      dragon("red", 1), dragon("red", 2),
      wind("N", 3), wind("N", 4), wind("N", 5),
      wind("E", 6), wind("E", 7), wind("E", 8),
      wind("S", 9), wind("S", 10), wind("S", 11),
      wind("W", 12), wind("W", 13), wind("W", 14),
    ];
    const result = matchesAnyPattern(hand, []);
    expect(result).not.toBeNull();
    expect(result!.category).toBe("winds-dragons");
  });

  it("returns null for random hand", () => {
    const hand: TileData[] = [
      bam(1, 1), crack(2, 2), dot(3, 3), wind("N", 4),
      dragon("red", 5), flower(1, 6), bam(7, 7), crack(8, 8),
      dot(9, 9), wind("E", 10), bam(3, 11), crack(5, 12),
      dot(7, 13), bam(9, 14),
    ];
    expect(matchesAnyPattern(hand, [])).toBeNull();
  });
});

describe("suggestPatterns", () => {
  it("returns scored suggestions", () => {
    const hand: TileData[] = [
      bam(2, 1), bam(2, 2), bam(4, 3), bam(4, 4),
      bam(6, 5), bam(6, 6), bam(8, 7), bam(8, 8),
      flower(1, 9), crack(1, 10), dot(3, 11), wind("N", 12),
      dragon("red", 13), joker(14),
    ];
    const suggestions = suggestPatterns(hand, []);
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0].score).toBeGreaterThan(0);
    // With lots of even bams + flowers, 2468-a should score well
    const has2468 = suggestions.some((s) => s.pattern.category === "2468");
    expect(has2468).toBe(true);
  });

  it("returns up to 5 suggestions by default", () => {
    const hand = Array.from({ length: 14 }, (_, i) => bam(1, i));
    const suggestions = suggestPatterns(hand, []);
    expect(suggestions.length).toBeLessThanOrEqual(5);
  });
});

describe("patternProgress", () => {
  it("returns completion data", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    const hand: TileData[] = [
      flower(1, 1), flower(2, 2),
      bam(2, 3), bam(2, 4), bam(2, 5),
      bam(4, 6), bam(4, 7), bam(4, 8),
      bam(6, 9), bam(6, 10), bam(6, 11),
      bam(8, 12), bam(8, 13), bam(8, 14),
    ];
    const progress = patternProgress(hand, [], pattern);
    expect(progress.completion).toBe(1); // perfect match
    expect(progress.tilesNeeded).toBe(0);
  });

  it("shows partial progress", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    const hand: TileData[] = [
      flower(1, 1), bam(2, 3), bam(2, 4),
      bam(4, 5), crack(1, 6), crack(3, 7),
      dot(5, 8), dot(7, 9), wind("N", 10),
      dragon("red", 11), bam(9, 12), crack(9, 13), dot(9, 14),
    ];
    const progress = patternProgress(hand, [], pattern);
    expect(progress.completion).toBeGreaterThan(0);
    expect(progress.completion).toBeLessThan(1);
    expect(progress.tilesNeeded).toBeGreaterThan(0);
  });
});

describe("tileFitsPattern", () => {
  it("returns true for tiles matching pattern values", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    expect(tileFitsPattern(bam(2, 1), pattern)).toBe(true);
    expect(tileFitsPattern(crack(4, 1), pattern)).toBe(true);
    expect(tileFitsPattern(flower(1, 1), pattern)).toBe(true);
    expect(tileFitsPattern(joker(1), pattern)).toBe(true);
  });

  it("returns false for tiles not in pattern", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    expect(tileFitsPattern(bam(1, 1), pattern)).toBe(false); // odd number
    expect(tileFitsPattern(wind("N", 1), pattern)).toBe(false); // no winds
  });
});

describe("getPatternsByCategory", () => {
  it("returns patterns for a given category", () => {
    const patterns = getPatternsByCategory("2468");
    expect(patterns.length).toBeGreaterThan(0);
    patterns.forEach((p) => expect(p.category).toBe("2468"));
  });
});
