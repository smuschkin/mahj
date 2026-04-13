import { describe, it, expect } from "vitest";
import {
  countMatching,
  canCallPung,
  canCallKong,
  canCallQuint,
  canCallMahjong,
  checkSelfDrawWin,
  findJokerSwaps,
  formExposedGroup,
  getValidCalls,
  callFitsTarget,
  targetAllowsExposure,
} from "../calling";
import { PRACTICE_PATTERNS } from "../patterns";
import type { TileData } from "../tiles";

/* ───── Helpers ───── */

const bam = (v: number, id: number): TileData => ({ id, type: "bam", value: v });
const crack = (v: number, id: number): TileData => ({ id, type: "crack", value: v });
const dot = (v: number, id: number): TileData => ({ id, type: "dot", value: v });
const wind = (v: string, id: number): TileData => ({ id, type: "wind", value: v });
const dragon = (v: string, id: number): TileData => ({ id, type: "dragon", value: v });
const joker = (id: number): TileData => ({ id, type: "joker" });
const flower = (v: number, id: number): TileData => ({ id, type: "flower", value: v });

describe("countMatching", () => {
  it("counts tiles matching by type+value", () => {
    const hand = [bam(3, 1), bam(3, 2), bam(5, 3), crack(3, 4)];
    expect(countMatching(hand, bam(3, 99))).toBe(2);
  });

  it("returns 0 when no matches", () => {
    const hand = [bam(1, 1), crack(2, 2)];
    expect(countMatching(hand, dot(5, 99))).toBe(0);
  });
});

describe("canCallPung", () => {
  it("returns true with 2+ matching tiles in hand", () => {
    const hand = [bam(5, 1), bam(5, 2), crack(1, 3)];
    expect(canCallPung(hand, bam(5, 99))).toBe(true);
  });

  it("returns false with only 1 matching tile", () => {
    const hand = [bam(5, 1), crack(1, 2)];
    expect(canCallPung(hand, bam(5, 99))).toBe(false);
  });

  it("returns false for a discarded joker", () => {
    expect(canCallPung([joker(1), joker(2)], joker(99))).toBe(false);
  });
});

describe("canCallKong", () => {
  it("returns true with 3+ matching tiles", () => {
    const hand = [dot(7, 1), dot(7, 2), dot(7, 3)];
    expect(canCallKong(hand, dot(7, 99))).toBe(true);
  });

  it("returns false with only 2 matching tiles", () => {
    expect(canCallKong([dot(7, 1), dot(7, 2)], dot(7, 99))).toBe(false);
  });
});

describe("canCallQuint", () => {
  it("returns true with 4 matching natural tiles", () => {
    const hand = [bam(3, 1), bam(3, 2), bam(3, 3), bam(3, 4)];
    expect(canCallQuint(hand, bam(3, 99))).toBe(true);
  });

  it("returns true with 3 naturals + 1 joker", () => {
    const hand = [bam(3, 1), bam(3, 2), bam(3, 3), joker(4)];
    expect(canCallQuint(hand, bam(3, 99))).toBe(true);
  });

  it("returns false without enough tiles", () => {
    const hand = [bam(3, 1), bam(3, 2)];
    expect(canCallQuint(hand, bam(3, 99))).toBe(false);
  });
});

describe("canCallMahjong (pattern-based)", () => {
  it("detects win on four winds pattern", () => {
    // wd-a: DD NNN EEE SSS WWW
    const hand = [
      dragon("red", 1), dragon("red", 2),
      wind("N", 3), wind("N", 4), wind("N", 5),
      wind("E", 6), wind("E", 7), wind("E", 8),
      wind("S", 9), wind("S", 10), wind("S", 11),
      wind("W", 12), wind("W", 13),
    ];
    // Discard completes the last wind
    expect(canCallMahjong(hand, wind("W", 99), [])).toBe(true);
  });

  it("rejects random hand", () => {
    const hand = [
      bam(1, 1), crack(3, 2), dot(5, 3), wind("N", 4),
      bam(7, 5), crack(9, 6), dot(2, 7), wind("E", 8),
      bam(4, 9), crack(6, 10), dot(8, 11), dragon("red", 12),
      flower(1, 13),
    ];
    expect(canCallMahjong(hand, bam(3, 99), [])).toBe(false);
  });
});

describe("checkSelfDrawWin", () => {
  it("detects pattern-based self-draw win", () => {
    // wd-a: DD NNN EEE SSS WWW — 14 tiles
    const hand = [
      dragon("red", 1), dragon("red", 2),
      wind("N", 3), wind("N", 4), wind("N", 5),
      wind("E", 6), wind("E", 7), wind("E", 8),
      wind("S", 9), wind("S", 10), wind("S", 11),
      wind("W", 12), wind("W", 13), wind("W", 14),
    ];
    expect(checkSelfDrawWin(hand, [])).toBe(true);
  });

  it("rejects non-winning hand", () => {
    const hand = Array.from({ length: 14 }, (_, i) =>
      bam(i % 9 + 1, i)
    );
    expect(checkSelfDrawWin(hand, [])).toBe(false);
  });
});

describe("findJokerSwaps", () => {
  it("finds swaps when player has matching natural tile", () => {
    const hand = [bam(3, 1), crack(5, 2)];
    const groups = [{
      owner: 1,
      groups: [{
        tiles: [bam(3, 10), bam(3, 11), joker(12)],
        callType: "pung" as const,
        calledTile: bam(3, 10),
      }],
    }];
    const swaps = findJokerSwaps(hand, groups);
    expect(swaps).toHaveLength(1);
  });

  it("returns empty when no matching tiles", () => {
    const hand = [crack(5, 1)];
    const groups = [{
      owner: 1,
      groups: [{
        tiles: [bam(3, 10), bam(3, 11), joker(12)],
        callType: "pung" as const,
        calledTile: bam(3, 10),
      }],
    }];
    expect(findJokerSwaps(hand, groups)).toHaveLength(0);
  });
});

describe("formExposedGroup", () => {
  it("forms a pung", () => {
    const hand = [bam(3, 1), bam(3, 2), crack(7, 3)];
    const { group, remainingHand } = formExposedGroup(hand, bam(3, 99), "pung");
    expect(group.tiles).toHaveLength(3);
    expect(remainingHand).toHaveLength(1);
  });

  it("forms a kong", () => {
    const hand = [dot(5, 1), dot(5, 2), dot(5, 3), bam(1, 4)];
    const { group, remainingHand } = formExposedGroup(hand, dot(5, 99), "kong");
    expect(group.tiles).toHaveLength(4);
    expect(remainingHand).toHaveLength(1);
  });

  it("forms a quint using jokers", () => {
    const hand = [bam(3, 1), bam(3, 2), bam(3, 3), joker(4), dot(1, 5)];
    const { group, remainingHand } = formExposedGroup(hand, bam(3, 99), "quint");
    expect(group.tiles).toHaveLength(5);
    expect(remainingHand).toHaveLength(1);
  });
});

describe("getValidCalls", () => {
  it("returns pung when available and pattern is open", () => {
    const hand = [wind("E", 1), wind("E", 2), bam(1, 3)];
    const openPattern = PRACTICE_PATTERNS.find((p) => p.exposure === "open")!;
    const calls = getValidCalls(hand, wind("E", 99), [], openPattern);
    expect(calls).toContain("pung");
  });

  it("blocks pung/kong for closed patterns", () => {
    const hand = [wind("E", 1), wind("E", 2), bam(1, 3)];
    const closedPattern = PRACTICE_PATTERNS.find((p) => p.exposure === "closed")!;
    const calls = getValidCalls(hand, wind("E", 99), [], closedPattern);
    expect(calls).not.toContain("pung");
    expect(calls).not.toContain("kong");
  });
});

describe("callFitsTarget", () => {
  it("returns true when tile fits pattern", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    expect(callFitsTarget(bam(2, 1), pattern)).toBe(true);
  });

  it("returns false when tile doesn't fit", () => {
    const pattern = PRACTICE_PATTERNS.find((p) => p.id === "2468-a")!;
    expect(callFitsTarget(bam(1, 1), pattern)).toBe(false); // odd number
  });

  it("returns true when no target", () => {
    expect(callFitsTarget(bam(1, 1), null)).toBe(true);
  });
});

describe("targetAllowsExposure", () => {
  it("returns true for open patterns", () => {
    const open = PRACTICE_PATTERNS.find((p) => p.exposure === "open")!;
    expect(targetAllowsExposure(open)).toBe(true);
  });

  it("returns false for closed patterns", () => {
    const closed = PRACTICE_PATTERNS.find((p) => p.exposure === "closed")!;
    expect(targetAllowsExposure(closed)).toBe(false);
  });
});
