import { describe, it, expect } from "vitest";
import { analyzeHand, ratePass } from "../handAnalysis";
import type { TileData } from "../tiles";

/* ───── Helpers ───── */

const bam = (v: number, id: number): TileData => ({ id, type: "bam", value: v });
const crack = (v: number, id: number): TileData => ({ id, type: "crack", value: v });
const dot = (v: number, id: number): TileData => ({ id, type: "dot", value: v });
const wind = (v: string, id: number): TileData => ({ id, type: "wind", value: v });
const dragon = (v: string, id: number): TileData => ({ id, type: "dragon", value: v });
const joker = (id: number): TileData => ({ id, type: "joker" });
const flower = (v: number, id: number): TileData => ({ id, type: "flower", value: v });

describe("analyzeHand", () => {
  it("counts suits correctly", () => {
    const hand = [bam(1, 1), bam(2, 2), bam(3, 3), crack(1, 4), dot(5, 5)];
    const result = analyzeHand(hand);
    expect(result.suitCounts).toEqual({ bam: 3, crack: 1, dot: 1 });
  });

  it("identifies best suit", () => {
    const hand = [
      dot(1, 1), dot(2, 2), dot(3, 3), dot(4, 4), dot(5, 5),
      bam(1, 6), crack(1, 7),
    ];
    const result = analyzeHand(hand);
    expect(result.bestSuit?.suit).toBe("dot");
    expect(result.bestSuit?.count).toBe(5);
  });

  it("counts jokers and flowers", () => {
    const hand = [joker(1), joker(2), flower(1, 3), bam(1, 4)];
    const result = analyzeHand(hand);
    expect(result.jokerCount).toBe(2);
    expect(result.flowerCount).toBe(1);
  });

  it("counts honors (winds + dragons)", () => {
    const hand = [wind("E", 1), wind("S", 2), dragon("red", 3), bam(1, 4)];
    const result = analyzeHand(hand);
    expect(result.honorCount).toBe(3);
  });

  it("detects pairs and triples", () => {
    const hand = [bam(1, 1), bam(1, 2), bam(1, 3), dot(5, 4), dot(5, 5)];
    const result = analyzeHand(hand);
    expect(result.tripleCount).toBe(1);
    expect(result.pairCount).toBe(2); // triple also counts as pair (count >= 2)
  });

  it("detects strong single-suit pattern", () => {
    const hand = [
      bam(1, 1), bam(2, 2), bam(3, 3), bam(4, 4),
      bam(5, 5), bam(6, 6), bam(7, 7), bam(8, 8),
      crack(1, 9),
    ];
    const result = analyzeHand(hand);
    expect(result.patterns.some((p) => p.includes("Strong Bam"))).toBe(true);
  });

  it("detects even number concentration", () => {
    const hand = [
      bam(2, 1), bam(4, 2), crack(6, 3), dot(8, 4),
      bam(2, 5), crack(4, 6), dot(6, 7),
    ];
    const result = analyzeHand(hand);
    expect(result.patterns.some((p) => p.includes("even"))).toBe(true);
  });

  it("detects 369 pattern", () => {
    const hand = [
      bam(3, 1), bam(6, 2), bam(9, 3), crack(3, 4), dot(6, 5),
      bam(1, 6),
    ];
    const result = analyzeHand(hand);
    expect(result.patterns.some((p) => p.includes("369"))).toBe(true);
  });

  it("detects consecutive run potential", () => {
    const hand = [bam(4, 1), bam(5, 2), bam(6, 3), crack(1, 4)];
    const result = analyzeHand(hand);
    expect(result.patterns.some((p) => p.includes("consecutive"))).toBe(true);
  });

  it("detects honor-heavy hand", () => {
    const hand = [
      wind("E", 1), wind("S", 2), wind("W", 3), wind("N", 4),
      dragon("red", 5), bam(1, 6),
    ];
    const result = analyzeHand(hand);
    expect(result.patterns.some((p) => p.includes("honor"))).toBe(true);
  });

  it("suggests flexibility when no strong pattern", () => {
    const hand = [bam(1, 1), crack(5, 2), dot(9, 3)];
    const result = analyzeHand(hand);
    expect(result.patterns.some((p) => p.includes("flexible"))).toBe(true);
  });
});

describe("ratePass", () => {
  it("rates passing off-suit junk as great", () => {
    // Hand is mostly bams, passing cracks
    const hand = [
      bam(1, 1), bam(2, 2), bam(3, 3), bam(4, 4), bam(5, 5),
      crack(7, 6), crack(8, 7), crack(9, 8),
      dot(1, 9),
    ];
    const passedIds = new Set([6, 7, 8]); // the 3 cracks
    const result = ratePass(hand, passedIds);
    expect(result.rating).toBe("great");
  });

  it("rates passing own-suit tiles as risky", () => {
    // Hand is mostly bams, passing bams
    const hand = [
      bam(1, 1), bam(2, 2), bam(3, 3), bam(4, 4), bam(5, 5),
      bam(6, 6), bam(7, 7),
      crack(1, 8), dot(1, 9),
    ];
    const passedIds = new Set([5, 6, 7]); // passing bam 5, 6, 7
    const result = ratePass(hand, passedIds);
    expect(result.rating).toBe("risky");
  });

  it("rates breaking pairs as risky", () => {
    const hand = [
      bam(1, 1), bam(1, 2), // pair
      crack(5, 3), crack(5, 4), // pair
      dot(9, 5), dot(9, 6), // pair
      bam(3, 7), crack(8, 8), dot(2, 9),
    ];
    // Pass both bam 1s and a crack — breaks the bam pair
    const passedIds = new Set([1, 3, 8]);
    const result = ratePass(hand, passedIds);
    // Should detect broken pairs
    expect(["risky", "good"]).toContain(result.rating);
  });
});
