import { describe, it, expect } from "vitest";
import { buildDeck, shuffle, deal, sortHand, tileKey, tileLabel } from "../tiles";
import type { TileData } from "../tiles";

describe("buildDeck", () => {
  const deck = buildDeck();

  it("produces exactly 152 tiles", () => {
    expect(deck).toHaveLength(152);
  });

  it("has unique IDs for every tile", () => {
    const ids = new Set(deck.map((t) => t.id));
    expect(ids.size).toBe(152);
  });

  it("has 108 suited tiles (bam + crack + dot)", () => {
    const suited = deck.filter(
      (t) => t.type === "bam" || t.type === "crack" || t.type === "dot"
    );
    expect(suited).toHaveLength(108);
  });

  it("has 36 tiles per suit", () => {
    for (const suit of ["bam", "crack", "dot"] as const) {
      expect(deck.filter((t) => t.type === suit)).toHaveLength(36);
    }
  });

  it("has 4 copies of each suit value", () => {
    for (const suit of ["bam", "crack", "dot"] as const) {
      for (let v = 1; v <= 9; v++) {
        const copies = deck.filter((t) => t.type === suit && t.value === v);
        expect(copies).toHaveLength(4);
      }
    }
  });

  it("has 16 wind tiles (4 winds × 4 copies)", () => {
    const winds = deck.filter((t) => t.type === "wind");
    expect(winds).toHaveLength(16);
    for (const w of ["E", "S", "W", "N"]) {
      expect(winds.filter((t) => t.value === w)).toHaveLength(4);
    }
  });

  it("has 12 dragon tiles (3 dragons × 4 copies)", () => {
    const dragons = deck.filter((t) => t.type === "dragon");
    expect(dragons).toHaveLength(12);
    for (const d of ["red", "green", "white"]) {
      expect(dragons.filter((t) => t.value === d)).toHaveLength(4);
    }
  });

  it("has 4 flowers and 4 seasons (1 copy each)", () => {
    expect(deck.filter((t) => t.type === "flower")).toHaveLength(4);
    expect(deck.filter((t) => t.type === "season")).toHaveLength(4);
  });

  it("has 8 jokers", () => {
    expect(deck.filter((t) => t.type === "joker")).toHaveLength(8);
  });
});

describe("shuffle", () => {
  it("returns the same array reference", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result).toBe(arr);
  });

  it("preserves all elements", () => {
    const deck = buildDeck();
    const ids = deck.map((t) => t.id).sort((a, b) => a - b);
    shuffle(deck);
    const shuffledIds = deck.map((t) => t.id).sort((a, b) => a - b);
    expect(shuffledIds).toEqual(ids);
  });
});

describe("deal", () => {
  it("removes tiles from the front of the deck", () => {
    const deck = buildDeck();
    const firstId = deck[0].id;
    const dealt = deal(deck, 14);
    expect(dealt).toHaveLength(14);
    expect(dealt[0].id).toBe(firstId);
    expect(deck).toHaveLength(138);
  });

  it("mutates the original deck", () => {
    const deck = buildDeck();
    deal(deck, 5);
    expect(deck).toHaveLength(147);
  });
});

describe("sortHand", () => {
  it("groups tiles by type in correct order: suits → honors → flowers → jokers", () => {
    const hand: TileData[] = [
      { id: 1, type: "joker" },
      { id: 2, type: "wind", value: "N" },
      { id: 3, type: "bam", value: 5 },
      { id: 4, type: "flower", value: 1 },
      { id: 5, type: "dot", value: 3 },
      { id: 6, type: "crack", value: 7 },
      { id: 7, type: "dragon", value: "red" },
    ];
    const sorted = sortHand(hand);
    const types = sorted.map((t) => t.type);
    expect(types).toEqual(["bam", "crack", "dot", "wind", "dragon", "flower", "joker"]);
  });

  it("sorts suited tiles by value within the same suit", () => {
    const hand: TileData[] = [
      { id: 1, type: "bam", value: 9 },
      { id: 2, type: "bam", value: 1 },
      { id: 3, type: "bam", value: 5 },
    ];
    const sorted = sortHand(hand);
    expect(sorted.map((t) => t.value)).toEqual([1, 5, 9]);
  });

  it("sorts winds in E-S-W-N order", () => {
    const hand: TileData[] = [
      { id: 1, type: "wind", value: "N" },
      { id: 2, type: "wind", value: "E" },
      { id: 3, type: "wind", value: "W" },
      { id: 4, type: "wind", value: "S" },
    ];
    const sorted = sortHand(hand);
    expect(sorted.map((t) => t.value)).toEqual(["E", "S", "W", "N"]);
  });

  it("does not mutate the original hand", () => {
    const hand: TileData[] = [
      { id: 1, type: "dot", value: 9 },
      { id: 2, type: "bam", value: 1 },
    ];
    const original = [...hand];
    sortHand(hand);
    expect(hand).toEqual(original);
  });
});

describe("tileKey", () => {
  it("produces consistent keys for same type+value", () => {
    const a: TileData = { id: 1, type: "bam", value: 3 };
    const b: TileData = { id: 99, type: "bam", value: 3 };
    expect(tileKey(a)).toBe(tileKey(b));
  });

  it("produces different keys for different tiles", () => {
    const a: TileData = { id: 1, type: "bam", value: 3 };
    const b: TileData = { id: 2, type: "crack", value: 3 };
    expect(tileKey(a)).not.toBe(tileKey(b));
  });

  it("handles jokers (no value)", () => {
    const j: TileData = { id: 1, type: "joker" };
    expect(tileKey(j)).toBe("joker-");
  });
});

describe("tileLabel", () => {
  it("labels suited tiles correctly", () => {
    expect(tileLabel({ id: 1, type: "bam", value: 7 })).toBe("7 Bam");
    expect(tileLabel({ id: 2, type: "crack", value: 1 })).toBe("1 Crack");
    expect(tileLabel({ id: 3, type: "dot", value: 9 })).toBe("9 Dot");
  });

  it("labels dragons with capitalized color", () => {
    expect(tileLabel({ id: 1, type: "dragon", value: "red" })).toBe("Red Dragon");
    expect(tileLabel({ id: 2, type: "dragon", value: "white" })).toBe("White Dragon");
  });

  it("labels winds", () => {
    expect(tileLabel({ id: 1, type: "wind", value: "E" })).toBe("E Wind");
  });

  it("labels jokers", () => {
    expect(tileLabel({ id: 1, type: "joker" })).toBe("Joker");
  });
});
