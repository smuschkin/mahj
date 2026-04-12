import { describe, it, expect } from "vitest";
import {
  chooseBotDiscard,
  chooseBotTarget,
  shouldBotCall,
  shouldBotSwitchTarget,
  generateBotInsight,
} from "../botAI";
import { PRACTICE_PATTERNS } from "../patterns";
import type { TileData } from "../tiles";
import { tileKey } from "../tiles";

/* ───── Helpers ───── */

const bam = (v: number, id: number): TileData => ({ id, type: "bam", value: v });
const crack = (v: number, id: number): TileData => ({ id, type: "crack", value: v });
const dot = (v: number, id: number): TileData => ({ id, type: "dot", value: v });
const wind = (v: string, id: number): TileData => ({ id, type: "wind", value: v });
const dragon = (v: string, id: number): TileData => ({ id, type: "dragon", value: v });
const joker = (id: number): TileData => ({ id, type: "joker" });
const flower = (v: number, id: number): TileData => ({ id, type: "flower", value: v });

describe("chooseBotTarget", () => {
  it("returns a valid pattern", () => {
    const hand = [
      bam(2, 1), bam(2, 2), bam(4, 3), bam(4, 4),
      bam(6, 5), bam(6, 6), bam(8, 7), bam(8, 8),
      crack(1, 9), dot(3, 10), wind("N", 11), flower(1, 12), joker(13),
    ];
    const target = chooseBotTarget(hand, []);
    expect(target).toBeDefined();
    expect(target.id).toBeTruthy();
    expect(PRACTICE_PATTERNS.some((p) => p.id === target.id)).toBe(true);
  });
});

describe("chooseBotDiscard", () => {
  it("never discards a joker", () => {
    const target = PRACTICE_PATTERNS[0];
    const hand = [joker(1), joker(2), bam(1, 3), crack(5, 4)];
    for (let i = 0; i < 20; i++) {
      const discard = chooseBotDiscard(hand, [], target);
      expect(discard.type).not.toBe("joker");
    }
  });

  it("prefers discarding tiles that don't fit target pattern", () => {
    const target = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    const hand = [
      bam(2, 1), bam(2, 2), bam(4, 3), bam(4, 4),
      bam(6, 5), bam(6, 6), bam(8, 7), bam(8, 8),
      flower(1, 9), flower(2, 10),
      wind("N", 11), // doesn't fit 2468
      crack(1, 12),  // doesn't fit (odd)
      dragon("red", 13), // doesn't fit
    ];
    const discards = new Set<string>();
    for (let i = 0; i < 30; i++) {
      discards.add(tileKey(chooseBotDiscard(hand, [], target)));
    }
    // Should primarily discard the non-fitting tiles
    expect(
      discards.has("wind-N") || discards.has("crack-1") || discards.has("dragon-red")
    ).toBe(true);
  });
});

describe("shouldBotCall", () => {
  it("returns null for joker discard", () => {
    const target = PRACTICE_PATTERNS[0];
    const hand = [joker(1), joker(2), bam(1, 3)];
    expect(shouldBotCall(hand, joker(99), [], target, 5)).toBeNull();
  });

  it("returns null when no target", () => {
    const hand = [bam(3, 1), bam(3, 2), bam(1, 3)];
    expect(shouldBotCall(hand, bam(3, 99), [], null, 5)).toBeNull();
  });

  it("returns pung when tile fits target and bot has pair", () => {
    const target = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    const hand = [
      bam(2, 1), bam(2, 2), bam(4, 3), bam(6, 4),
      bam(8, 5), flower(1, 6), flower(2, 7),
    ];
    const result = shouldBotCall(hand, bam(2, 99), [], target, 3);
    expect(result).toBe("pung");
  });

  it("doesn't call pung/kong for closed patterns", () => {
    const closedTarget = PRACTICE_PATTERNS.find((p) => p.exposure === "closed")!;
    const hand = [bam(1, 1), bam(1, 2), bam(3, 3)];
    const result = shouldBotCall(hand, bam(1, 99), [], closedTarget, 5);
    expect(result).toBeNull();
  });
});

describe("shouldBotSwitchTarget", () => {
  it("returns null on non-switch turns", () => {
    const target = PRACTICE_PATTERNS[0];
    const hand = Array.from({ length: 13 }, (_, i) => bam(1, i));
    expect(shouldBotSwitchTarget(hand, [], target, 3)).toBeNull();
  });

  it("may switch on turn 5 if better option exists", () => {
    const target = PRACTICE_PATTERNS.find((p) => p.id === "wd-a")!; // winds pattern
    // Hand is all even bams — terrible for winds
    const hand = [
      bam(2, 1), bam(2, 2), bam(4, 3), bam(4, 4),
      bam(6, 5), bam(6, 6), bam(8, 7), bam(8, 8),
      flower(1, 9), flower(2, 10), bam(2, 11), bam(4, 12), bam(6, 13),
    ];
    const result = shouldBotSwitchTarget(hand, [], target, 5);
    // Should likely switch to 2468 or similar
    if (result) {
      expect(result.id).not.toBe(target.id);
    }
  });
});

describe("generateBotInsight", () => {
  it("returns an insight string", () => {
    const target = PRACTICE_PATTERNS.find((p) => p.id === "wd-a")!;
    const insight = generateBotInsight("South", bam(3, 1), target);
    expect(typeof insight).toBe("string");
    expect(insight!.length).toBeGreaterThan(0);
  });

  it("returns null when no target", () => {
    expect(generateBotInsight("South", bam(3, 1), null)).toBeNull();
  });
});
