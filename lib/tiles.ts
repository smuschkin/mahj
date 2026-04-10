/**
 * Core tile data model for American Mahjong.
 * 152 tiles: 3 suits × 9 values × 4 copies + 4 winds × 4 + 3 dragons × 4
 *            + 4 flowers × 1 + 4 seasons × 1 + 8 jokers = 152
 *
 * Note: In American Mahjong, all 8 flower-group tiles are interchangeable
 * at the table ("Flowers"), but we model them as flower 1-4 + season 1-4
 * to match the Tile component.
 */

export type TileType =
  | "bam"
  | "crack"
  | "dot"
  | "wind"
  | "dragon"
  | "flower"
  | "season"
  | "joker";

export type TileData = {
  id: number;
  type: TileType;
  value?: number | string;
};

/** Build the full 152-tile deck. Each tile gets a unique id. */
export function buildDeck(): TileData[] {
  const deck: TileData[] = [];
  let id = 0;

  // 3 suits × 9 values × 4 copies = 108
  for (const suit of ["bam", "crack", "dot"] as const) {
    for (let val = 1; val <= 9; val++) {
      for (let copy = 0; copy < 4; copy++) {
        deck.push({ id: id++, type: suit, value: val });
      }
    }
  }

  // 4 winds × 4 copies = 16
  for (const w of ["E", "S", "W", "N"] as const) {
    for (let copy = 0; copy < 4; copy++) {
      deck.push({ id: id++, type: "wind", value: w });
    }
  }

  // 3 dragons × 4 copies = 12
  for (const d of ["red", "green", "white"] as const) {
    for (let copy = 0; copy < 4; copy++) {
      deck.push({ id: id++, type: "dragon", value: d });
    }
  }

  // 4 flowers (unique) = 4
  for (let f = 1; f <= 4; f++) {
    deck.push({ id: id++, type: "flower", value: f });
  }

  // 4 seasons (unique) = 4
  for (let s = 1; s <= 4; s++) {
    deck.push({ id: id++, type: "season", value: s });
  }

  // 8 jokers
  for (let j = 0; j < 8; j++) {
    deck.push({ id: id++, type: "joker" });
  }

  // Total should be 152
  return deck;
}

/** Fisher-Yates shuffle (in-place, returns same array). */
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Deal `count` tiles from the front of the deck, mutating it. */
export function deal(deck: TileData[], count: number): TileData[] {
  return deck.splice(0, count);
}

/** Sort tiles for display: suits grouped, then honors, then flowers, then jokers. */
export function sortHand(hand: TileData[]): TileData[] {
  const ORDER: Record<TileType, number> = {
    bam: 0,
    crack: 1,
    dot: 2,
    wind: 3,
    dragon: 4,
    flower: 5,
    season: 6,
    joker: 7,
  };
  const WIND_ORDER: Record<string, number> = { E: 0, S: 1, W: 2, N: 3 };
  const DRAGON_ORDER: Record<string, number> = { red: 0, green: 1, white: 2 };

  return [...hand].sort((a, b) => {
    if (ORDER[a.type] !== ORDER[b.type]) return ORDER[a.type] - ORDER[b.type];
    // Same type — sort by value
    if (a.type === "wind" && b.type === "wind") {
      return (WIND_ORDER[a.value as string] ?? 0) - (WIND_ORDER[b.value as string] ?? 0);
    }
    if (a.type === "dragon" && b.type === "dragon") {
      return (DRAGON_ORDER[a.value as string] ?? 0) - (DRAGON_ORDER[b.value as string] ?? 0);
    }
    if (typeof a.value === "number" && typeof b.value === "number") {
      return a.value - b.value;
    }
    return 0;
  });
}

/** Unique key for matching tiles by type+value (not instance ID). */
export function tileKey(t: TileData): string {
  return `${t.type}-${t.value ?? ""}`;
}

/** Human-readable label for a tile. */
export function tileLabel(t: TileData): string {
  switch (t.type) {
    case "bam":
      return `${t.value} Bam`;
    case "crack":
      return `${t.value} Crack`;
    case "dot":
      return `${t.value} Dot`;
    case "wind":
      return `${t.value} Wind`;
    case "dragon":
      return `${String(t.value).charAt(0).toUpperCase()}${String(t.value).slice(1)} Dragon`;
    case "flower":
    case "season":
      return "Flower";
    case "joker":
      return "Joker";
  }
}
