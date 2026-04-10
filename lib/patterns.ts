/**
 * Practice hand pattern library for American Mahjong.
 *
 * IMPORTANT: These are ORIGINAL practice patterns created for educational
 * purposes. They do NOT reproduce any hands from the NMJL card. They are
 * designed to represent the general CATEGORIES of hands that appear on the
 * card so players can practice the mechanics of each type.
 *
 * See docs/LEGAL.md for full legal guardrails.
 */

import type { TileData, TileType } from "./tiles";
import { tileKey } from "./tiles";
import type { ExposedGroup } from "./calling";

/* ───── Types ───── */

export type HandCategory =
  | "2468"
  | "any-like-numbers"
  | "addition"
  | "quints"
  | "consecutive-run"
  | "13579"
  | "winds-dragons"
  | "369"
  | "singles-pairs";

/** Describes one group (pair, pung, kong, quint) within a hand pattern. */
export type GroupSpec = {
  kind: "single" | "pair" | "pung" | "kong" | "quint";
  /** What tiles can fill this group */
  tile: TileSpec;
  /** Can jokers substitute? (Never for pairs/singles per NMJL rules) */
  jokersAllowed: boolean;
};

/**
 * Describes what tile(s) satisfy a group.
 * - "suit" groups match a numbered tile in a specific or linked suit
 * - "wind" / "dragon" match honor tiles
 * - "flower" matches any flower or season tile
 */
export type TileSpec =
  | { type: "suit"; value: number; suitGroup: string }
  // suitGroup is a label like "A", "B", "C" — groups sharing the same
  // suitGroup must be the same suit. Different labels = different suits.
  // "any" means any suit, no linking.
  | { type: "wind"; value: "N" | "E" | "S" | "W" }
  | { type: "dragon"; value: "red" | "green" | "white" }
  | { type: "flower" }
  | { type: "anyTile"; id: string };
  // anyTile with unique id — each id must be a different tile (for S&P)

export type HandPattern = {
  id: string;
  name: string;
  category: HandCategory;
  groups: GroupSpec[];
  /** "open" = can expose groups; "closed" = must be concealed (no calling except Mahjong) */
  exposure: "open" | "closed";
  difficulty: 1 | 2 | 3;
  /** Point value for scoring */
  value: 25 | 30 | 35 | 50;
  /** Human-readable notation, e.g. "FF 22 44 6666 88" */
  displayNotation: string;
  /** Short description for the UI */
  description: string;
};

/* ───── Size helpers ───── */

const GROUP_SIZES: Record<GroupSpec["kind"], number> = {
  single: 1,
  pair: 2,
  pung: 3,
  kong: 4,
  quint: 5,
};

function groupSize(g: GroupSpec): number {
  return GROUP_SIZES[g.kind];
}

/** Total tiles a pattern requires (should be 14 for a valid hand). */
export function patternTileCount(p: HandPattern): number {
  return p.groups.reduce((sum, g) => sum + groupSize(g), 0);
}

/* ───── Pattern Library ───── */

// Helper constructors
const suit = (value: number, suitGroup: string): TileSpec => ({
  type: "suit", value, suitGroup,
});
const wind = (value: "N" | "E" | "S" | "W"): TileSpec => ({
  type: "wind", value,
});
const dragon = (value: "red" | "green" | "white"): TileSpec => ({
  type: "dragon", value,
});
const flower: TileSpec = { type: "flower" };
const anyTile = (id: string): TileSpec => ({ type: "anyTile", id });

const g = (kind: GroupSpec["kind"], tile: TileSpec, jokersAllowed = true): GroupSpec => ({
  kind,
  tile,
  jokersAllowed: kind === "pair" || kind === "single" ? false : jokersAllowed,
});

// Every hand must total exactly 14 tiles.
// Common structures: 2+3+3+3+3=14, 2+4+4+4=14, 3+3+4+4=14, 5+4+3+2=14, 2*7=14

export const PRACTICE_PATTERNS: HandPattern[] = [
  // 2468
  { id: "2468-a", name: "Even Pungs", category: "2468",
    groups: [g("pair",flower), g("pung",suit(2,"A")), g("pung",suit(4,"A")), g("pung",suit(6,"A")), g("pung",suit(8,"A"))],
    exposure: "open", difficulty: 1, value: 25, displayNotation: "FF 222 444 666 888",
    description: "Flowers plus four even pungs in one suit" },
  { id: "2468-b", name: "Even Kongs", category: "2468",
    groups: [g("pung",suit(2,"A")), g("pung",suit(4,"A")), g("kong",suit(6,"A")), g("kong",suit(8,"A"))],
    exposure: "open", difficulty: 2, value: 25, displayNotation: "222 444 6666 8888",
    description: "Two even pungs and two even kongs in one suit" },
  { id: "2468-c", name: "Even Three-Suit", category: "2468",
    groups: [g("pair",flower), g("kong",suit(2,"A")), g("kong",suit(4,"B")), g("kong",suit(6,"C"))],
    exposure: "open", difficulty: 2, value: 30, displayNotation: "FF 2222 4444 6666",
    description: "Three even kongs, each a different suit" },

  // 13579
  { id: "13579-a", name: "Odd Pungs", category: "13579",
    groups: [g("pair",suit(1,"A")), g("pung",suit(3,"A")), g("pung",suit(5,"A")), g("pung",suit(7,"A")), g("pung",suit(9,"A"))],
    exposure: "open", difficulty: 1, value: 25, displayNotation: "11 333 555 777 999",
    description: "Pair of 1s plus four odd pungs in one suit" },
  { id: "13579-b", name: "Lucky Odds", category: "13579",
    groups: [g("pung",suit(1,"A")), g("pung",suit(3,"A")), g("kong",suit(5,"A")), g("kong",suit(7,"A"))],
    exposure: "closed", difficulty: 3, value: 35, displayNotation: "111 333 5555 7777",
    description: "Concealed odd kongs and pungs in one suit" },
  { id: "13579-c", name: "High Odds Mixed", category: "13579",
    groups: [g("pair",flower), g("pung",suit(3,"A")), g("pung",suit(5,"B")), g("pung",suit(7,"C")), g("pung",suit(9,"A"))],
    exposure: "open", difficulty: 2, value: 30, displayNotation: "FF 333 555 777 999",
    description: "Odd numbers across multiple suits with flowers" },

  // Consecutive Run
  { id: "consec-a", name: "Run of Five", category: "consecutive-run",
    groups: [g("pair",suit(1,"A")), g("pung",suit(2,"A")), g("kong",suit(3,"A")), g("pung",suit(4,"A")), g("pair",suit(5,"A"))],
    exposure: "closed", difficulty: 3, value: 35, displayNotation: "11 222 3333 444 55",
    description: "Concealed consecutive run 1-2-3-4-5 in one suit" },
  { id: "consec-b", name: "Low Run Open", category: "consecutive-run",
    groups: [g("pair",flower), g("pung",suit(1,"A")), g("pung",suit(2,"A")), g("pung",suit(3,"A")), g("pung",suit(4,"A"))],
    exposure: "open", difficulty: 2, value: 25, displayNotation: "FF 111 222 333 444",
    description: "Consecutive low pungs with flowers" },
  { id: "consec-c", name: "Mid Run", category: "consecutive-run",
    groups: [g("pung",suit(4,"A")), g("kong",suit(5,"A")), g("kong",suit(6,"A")), g("pung",suit(7,"A"))],
    exposure: "open", difficulty: 2, value: 25, displayNotation: "444 5555 6666 777",
    description: "Mid-range consecutive kongs in one suit" },

  // Any Like Numbers
  { id: "like-a", name: "Triple Match", category: "any-like-numbers",
    // pung(A) + pung(B) + kong(C) + pair(D) + pair(E) = 3+3+4+2+2 = 14
    // D and E are separate suit groups so each pair can be any suit independently
    groups: [g("pung",suit(1,"A")), g("pung",suit(1,"B")), g("kong",suit(1,"C")), g("pair",suit(1,"D")), g("pair",suit(1,"E"))],
    exposure: "open", difficulty: 2, value: 30, displayNotation: "111 111 1111 11 11",
    description: "Same number across three suits — pungs, kong, and pairs" },
  { id: "like-b", name: "Double Match", category: "any-like-numbers",
    groups: [g("pair",flower), g("kong",suit(5,"A")), g("kong",suit(5,"B")), g("kong",suit(5,"C"))],
    exposure: "open", difficulty: 2, value: 30, displayNotation: "FF 5555 5555 5555",
    description: "Three kongs of the same number, different suits" },
  { id: "like-c", name: "Like Pungs", category: "any-like-numbers",
    // 3 suits × pung + pair of flowers + pung of a different number = 3+3+3+2+3 = 14
    groups: [g("pair",flower), g("pung",suit(3,"A")), g("pung",suit(3,"B")), g("pung",suit(3,"C")), g("pung",suit(7,"A"))],
    exposure: "open", difficulty: 2, value: 25, displayNotation: "FF 333 333 333 777",
    description: "Same number in all three suits plus flowers" },

  // 369
  { id: "369-a", name: "Mixed Threes", category: "369",
    groups: [g("pair",suit(3,"A")), g("pung",suit(6,"A")), g("pung",suit(9,"A")), g("pung",suit(3,"B")), g("pung",suit(6,"B"))],
    exposure: "open", difficulty: 2, value: 25, displayNotation: "33 666 999 333 666",
    description: "3s, 6s, and 9s across two suits" },
  { id: "369-b", name: "Pure 369", category: "369",
    groups: [g("pung",suit(3,"A")), g("kong",suit(6,"A")), g("kong",suit(9,"A")), g("pung",suit(3,"B"))],
    exposure: "open", difficulty: 2, value: 30, displayNotation: "333 6666 9999 333",
    description: "3-6-9 in two suits" },
  { id: "369-c", name: "Three-Suit 369", category: "369",
    groups: [g("pair",dragon("red")), g("kong",suit(3,"A")), g("kong",suit(6,"B")), g("kong",suit(9,"C"))],
    exposure: "open", difficulty: 3, value: 35, displayNotation: "DD 3333 6666 9999",
    description: "3, 6, 9 each in a different suit with dragon pair" },

  // Winds & Dragons
  { id: "wd-a", name: "Four Winds", category: "winds-dragons",
    groups: [g("pair",dragon("red")), g("pung",wind("N")), g("pung",wind("E")), g("pung",wind("S")), g("pung",wind("W"))],
    exposure: "open", difficulty: 2, value: 30, displayNotation: "DD NNN EEE SSS WWW",
    description: "All four wind pungs with a dragon pair" },
  { id: "wd-b", name: "Dragon Trio", category: "winds-dragons",
    groups: [g("pair",flower), g("pung",dragon("red")), g("pung",dragon("green")), g("kong",dragon("white")), g("pair",wind("N"))],
    exposure: "open", difficulty: 2, value: 30, displayNotation: "FF DDD DDD DDDD NN",
    description: "All three dragons with flowers and a wind pair" },
  { id: "wd-c", name: "Winds & Dragons Mix", category: "winds-dragons",
    groups: [g("pung",wind("N")), g("pung",wind("E")), g("pung",dragon("red")), g("pung",dragon("green")), g("pair",dragon("white"))],
    exposure: "open", difficulty: 3, value: 35, displayNotation: "NNN EEE DDD DDD DD",
    description: "Two wind pungs, two dragon pungs, dragon pair" },

  // Singles & Pairs
  { id: "sp-a", name: "Seven Pairs", category: "singles-pairs",
    groups: [g("pair",anyTile("a")), g("pair",anyTile("b")), g("pair",anyTile("c")), g("pair",anyTile("d")), g("pair",anyTile("e")), g("pair",anyTile("f")), g("pair",anyTile("g"))],
    exposure: "closed", difficulty: 2, value: 50, displayNotation: "xx xx xx xx xx xx xx",
    description: "Seven different pairs — no jokers, must be concealed" },

  // Quints
  { id: "quint-a", name: "Big Quint", category: "quints",
    // Quint needs all 4 naturals from one suit + joker, so kong/pung/pair must be different suits
    groups: [g("quint",suit(1,"A")), g("kong",suit(1,"B")), g("pung",suit(1,"C")), g("pair",suit(1,"D"))],
    exposure: "open", difficulty: 3, value: 50, displayNotation: "11111 1111 111 11",
    description: "Quint, kong, pung, and pair of the same number across different suits" },
  { id: "quint-b", name: "Quint & Flowers", category: "quints",
    // Same logic: quint exhausts one suit, so pung and kong must be other suits
    groups: [g("pair",flower), g("quint",suit(5,"A")), g("pung",suit(5,"B")), g("kong",suit(5,"C"))],
    exposure: "open", difficulty: 3, value: 50, displayNotation: "FF 55555 555 5555",
    description: "Flowers plus quint, pung, and kong of 5s across different suits" },

  // Addition
  { id: "add-a", name: "Add to Ten", category: "addition",
    groups: [g("pair",flower), g("kong",suit(1,"A")), g("kong",suit(9,"A")), g("kong",suit(5,"A"))],
    exposure: "open", difficulty: 2, value: 25, displayNotation: "FF 1111 9999 5555",
    description: "1+9=10, 5+5=10 — with flowers, one suit" },
  { id: "add-b", name: "Add to Eight", category: "addition",
    groups: [g("pung",suit(3,"A")), g("pung",suit(5,"A")), g("kong",suit(8,"A")), g("kong",suit(8,"B"))],
    exposure: "open", difficulty: 2, value: 25, displayNotation: "333 555 8888 8888",
    description: "3+5=8, two suits of 8s" },
  { id: "add-c", name: "Add to Seven Mixed", category: "addition",
    groups: [g("pair",dragon("green")), g("kong",suit(3,"A")), g("kong",suit(4,"B")), g("kong",suit(7,"C"))],
    exposure: "open", difficulty: 3, value: 35, displayNotation: "DD 3333 4444 7777",
    description: "3+4=7, three different suits with dragon pair" },
];

/* ───── Pattern Matching ───── */

type SuitAssignment = Record<string, TileType>;

/** Check if tiles match a specific pattern. */
export function matchesPattern(
  hand: TileData[],
  exposedGroups: ExposedGroup[],
  pattern: HandPattern
): boolean {
  // Check exposure constraint
  if (pattern.exposure === "closed" && exposedGroups.length > 0) return false;

  // Combine all tiles
  const allConcealed = [...hand];
  const allExposed = exposedGroups.flatMap((g) => g.tiles);
  const allTiles = [...allConcealed, ...allExposed];

  // Check total tile count
  if (allTiles.length !== 14) return false;

  // Separate tile types
  const flowers = allTiles.filter((t) => t.type === "flower" || t.type === "season");
  const jokers = allTiles.filter((t) => t.type === "joker");
  const naturals = allTiles.filter(
    (t) => t.type !== "joker" && t.type !== "flower" && t.type !== "season"
  );

  // Count required flowers
  const flowerGroupCount = pattern.groups.filter(
    (g) => g.tile.type === "flower"
  ).reduce((sum, g) => sum + groupSize(g), 0);

  if (flowers.length < flowerGroupCount) return false;

  // Get non-flower groups
  const nonFlowerGroups = pattern.groups.filter((g) => g.tile.type !== "flower");

  // Collect all suit group labels used
  const suitGroupLabels = new Set<string>();
  for (const g of nonFlowerGroups) {
    if (g.tile.type === "suit") suitGroupLabels.add(g.tile.suitGroup);
  }

  // Try all suit assignments
  const suits: TileType[] = ["bam", "crack", "dot"];
  const labels = Array.from(suitGroupLabels);

  // Generate all possible suit assignments for the labels
  const assignments = generateSuitAssignments(labels, suits);

  const jokersAvailable = jokers.length;

  for (const assignment of assignments) {
    if (tryMatchWithAssignment(naturals, jokersAvailable, nonFlowerGroups, assignment)) {
      return true;
    }
  }

  return false;
}

/** Generate all valid suit assignments. Labels can map to any suit, but different labels CAN map to the same suit. */
function generateSuitAssignments(
  labels: string[],
  suits: TileType[]
): SuitAssignment[] {
  if (labels.length === 0) return [{}];

  const results: SuitAssignment[] = [];
  const [first, ...rest] = labels;

  for (const s of suits) {
    const subAssignments = generateSuitAssignments(rest, suits);
    for (const sub of subAssignments) {
      results.push({ ...sub, [first]: s });
    }
  }

  return results;
}

/** Try to match natural tiles against non-flower groups with a given suit assignment. */
function tryMatchWithAssignment(
  naturals: TileData[],
  jokersAvailable: number,
  groups: GroupSpec[],
  assignment: SuitAssignment
): boolean {
  // Build a count map of natural tiles
  const counts: Record<string, number> = {};
  for (const t of naturals) {
    const k = tileKey(t);
    counts[k] = (counts[k] ?? 0) + 1;
  }

  let jokersNeeded = 0;

  for (const group of groups) {
    const size = groupSize(group);
    const spec = group.tile;

    let key: string;
    if (spec.type === "suit") {
      const assignedSuit = assignment[spec.suitGroup];
      if (!assignedSuit) return false;
      key = `${assignedSuit}-${spec.value}`;
    } else if (spec.type === "wind") {
      key = `wind-${spec.value}`;
    } else if (spec.type === "dragon") {
      key = `dragon-${spec.value}`;
    } else if (spec.type === "anyTile") {
      // Singles & Pairs: need any tile with enough copies
      // Handle this separately
      continue; // handled below
    } else {
      continue; // flower already handled
    }

    const available = counts[key] ?? 0;
    const naturalUsed = Math.min(available, size);
    const gap = size - naturalUsed;

    if (gap > 0 && !group.jokersAllowed) return false;

    jokersNeeded += gap;
    counts[key] = available - naturalUsed;
  }

  if (jokersNeeded > jokersAvailable) return false;

  // Handle anyTile groups (Singles & Pairs)
  const anyTileGroups = groups.filter((g) => g.tile.type === "anyTile");
  if (anyTileGroups.length > 0) {
    return matchAnyTileGroups(counts, jokersAvailable - jokersNeeded, anyTileGroups);
  }

  // Check no unmatched naturals remain (all tiles must be accounted for)
  const remaining = Object.values(counts).reduce((a, b) => a + b, 0);
  return remaining === 0;
}

/** Match "anyTile" groups (Singles & Pairs) — each group must use a different tile type. */
function matchAnyTileGroups(
  counts: Record<string, number>,
  jokersAvailable: number,
  groups: GroupSpec[]
): boolean {
  // For S&P hands, jokers are never allowed, so we just need exact matches
  // Each group needs `size` tiles of the same type, and each group must be different
  const needed = groups.map((g) => groupSize(g));
  const available = Object.entries(counts).filter(([, c]) => c > 0);

  // Sort by descending count to match larger groups first
  return backtrackAnyTile(needed, 0, available);
}

function backtrackAnyTile(
  needed: number[],
  idx: number,
  available: [string, number][]
): boolean {
  if (idx >= needed.length) {
    // All groups matched — verify no tiles remain
    return available.every(([, c]) => c === 0);
  }

  const need = needed[idx];
  for (let i = 0; i < available.length; i++) {
    const [key, count] = available[i];
    if (count >= need) {
      available[i] = [key, count - need];
      if (backtrackAnyTile(needed, idx + 1, available)) {
        available[i] = [key, count]; // restore
        return true;
      }
      available[i] = [key, count]; // restore
    }
  }

  return false;
}

/** Check if hand matches ANY practice pattern. Returns the matched pattern or null. */
export function matchesAnyPattern(
  hand: TileData[],
  exposedGroups: ExposedGroup[]
): HandPattern | null {
  for (const pattern of PRACTICE_PATTERNS) {
    if (matchesPattern(hand, exposedGroups, pattern)) {
      return pattern;
    }
  }
  return null;
}

/* ───── Pattern Suggestion ───── */

export type ScoredPattern = {
  pattern: HandPattern;
  /** 0-1 score, higher = better fit */
  score: number;
  /** How many tiles already match */
  tilesMatched: number;
  /** How many tiles still needed */
  tilesNeeded: number;
};

/** Score how well a hand fits a pattern, returning best suit assignment score. */
function scorePatternFit(
  hand: TileData[],
  exposedGroups: ExposedGroup[],
  pattern: HandPattern
): ScoredPattern {
  // Check exposure constraint
  if (pattern.exposure === "closed" && exposedGroups.length > 0) {
    return { pattern, score: 0, tilesMatched: 0, tilesNeeded: 14 };
  }

  const allTiles = [...hand, ...exposedGroups.flatMap((g) => g.tiles)];

  const flowers = allTiles.filter((t) => t.type === "flower" || t.type === "season");
  const jokers = allTiles.filter((t) => t.type === "joker");
  const naturals = allTiles.filter(
    (t) => t.type !== "joker" && t.type !== "flower" && t.type !== "season"
  );

  // Flower matching
  const flowerGroupTiles = pattern.groups
    .filter((g) => g.tile.type === "flower")
    .reduce((sum, g) => sum + groupSize(g), 0);
  const flowersMatched = Math.min(flowers.length, flowerGroupTiles);

  const nonFlowerGroups = pattern.groups.filter((g) => g.tile.type !== "flower");

  // Collect suit group labels
  const suitGroupLabels = new Set<string>();
  for (const g of nonFlowerGroups) {
    if (g.tile.type === "suit") suitGroupLabels.add(g.tile.suitGroup);
  }

  const suits: TileType[] = ["bam", "crack", "dot"];
  const labels = Array.from(suitGroupLabels);
  const assignments = generateSuitAssignments(labels, suits);

  let bestMatched = 0;
  let bestNeeded = 14;

  for (const assignment of assignments) {
    const { matched, needed } = scoreAssignment(naturals, jokers.length, nonFlowerGroups, assignment);
    const totalMatched = matched + flowersMatched;
    const totalNeeded = needed + Math.max(0, flowerGroupTiles - flowers.length);

    if (totalMatched > bestMatched || (totalMatched === bestMatched && totalNeeded < bestNeeded)) {
      bestMatched = totalMatched;
      bestNeeded = totalNeeded;
    }
  }

  const totalRequired = patternTileCount(pattern);
  const score = totalRequired > 0 ? bestMatched / totalRequired : 0;

  return { pattern, score, tilesMatched: bestMatched, tilesNeeded: bestNeeded };
}

function scoreAssignment(
  naturals: TileData[],
  jokersAvailable: number,
  groups: GroupSpec[],
  assignment: SuitAssignment
): { matched: number; needed: number } {
  const counts: Record<string, number> = {};
  for (const t of naturals) {
    const k = tileKey(t);
    counts[k] = (counts[k] ?? 0) + 1;
  }

  let matched = 0;
  let needed = 0;
  let jokersUsed = 0;

  for (const group of groups) {
    const size = groupSize(group);
    const spec = group.tile;

    if (spec.type === "anyTile") {
      // For S&P, count available pairs/singles
      // Simplified: count tiles with count >= size
      const availableKeys = Object.entries(counts).filter(([, c]) => c >= size);
      if (availableKeys.length > 0) {
        const [key, count] = availableKeys[0];
        matched += size;
        counts[key] = count - size;
      } else {
        needed += size;
      }
      continue;
    }

    let key: string;
    if (spec.type === "suit") {
      const assignedSuit = assignment[spec.suitGroup];
      if (!assignedSuit) { needed += size; continue; }
      key = `${assignedSuit}-${spec.value}`;
    } else if (spec.type === "wind") {
      key = `wind-${spec.value}`;
    } else if (spec.type === "dragon") {
      key = `dragon-${spec.value}`;
    } else {
      continue;
    }

    const available = counts[key] ?? 0;
    const naturalUsed = Math.min(available, size);
    const gap = size - naturalUsed;
    const jokersForGroup = group.jokersAllowed ? Math.min(gap, jokersAvailable - jokersUsed) : 0;

    matched += naturalUsed + jokersForGroup;
    needed += gap - jokersForGroup;
    jokersUsed += jokersForGroup;
    counts[key] = available - naturalUsed;
  }

  return { matched, needed };
}

/** Suggest the best patterns for a given hand. */
export function suggestPatterns(
  hand: TileData[],
  exposedGroups: ExposedGroup[],
  limit = 5
): ScoredPattern[] {
  const scored = PRACTICE_PATTERNS.map((p) =>
    scorePatternFit(hand, exposedGroups, p)
  );

  // Sort by score descending, then by difficulty ascending (easier first)
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.pattern.difficulty - b.pattern.difficulty;
  });

  return scored.slice(0, limit);
}

/* ───── Pattern Progress ───── */

export type PatternProgress = {
  pattern: HandPattern;
  /** Total tiles needed for the pattern */
  totalTiles: number;
  /** Tiles currently matched */
  tilesMatched: number;
  /** Tiles still needed */
  tilesNeeded: number;
  /** 0-1 completion percentage */
  completion: number;
  /** Per-group status */
  groupStatus: GroupStatus[];
};

export type GroupStatus = {
  group: GroupSpec;
  /** How many tiles are filled */
  filled: number;
  /** How many tiles total this group needs */
  required: number;
  /** Is this group complete? */
  complete: boolean;
};

/** Compute detailed progress toward a target pattern. */
export function patternProgress(
  hand: TileData[],
  exposedGroups: ExposedGroup[],
  pattern: HandPattern
): PatternProgress {
  const scored = scorePatternFit(hand, exposedGroups, pattern);
  const totalTiles = patternTileCount(pattern);

  // Simplified group status (best-effort per group)
  const groupStatus: GroupStatus[] = pattern.groups.map((g) => {
    const size = groupSize(g);
    // Estimate filled based on overall score ratio
    const estimateFilled = Math.min(
      size,
      Math.round(size * scored.score)
    );
    return {
      group: g,
      filled: estimateFilled,
      required: size,
      complete: estimateFilled >= size,
    };
  });

  return {
    pattern,
    totalTiles,
    tilesMatched: scored.tilesMatched,
    tilesNeeded: scored.tilesNeeded,
    completion: totalTiles > 0 ? scored.tilesMatched / totalTiles : 0,
    groupStatus,
  };
}

/** Check if a discard tile could potentially fill a group in a pattern. */
export function tileFitsPattern(
  tile: TileData,
  pattern: HandPattern
): boolean {
  if (tile.type === "joker") return true; // jokers fit anywhere (in groups of 3+)
  if (tile.type === "flower" || tile.type === "season") {
    return pattern.groups.some((g) => g.tile.type === "flower");
  }

  for (const group of pattern.groups) {
    const spec = group.tile;
    if (spec.type === "suit" && (tile.type === "bam" || tile.type === "crack" || tile.type === "dot")) {
      if (tile.value === spec.value) return true;
    }
    if (spec.type === "wind" && tile.type === "wind" && tile.value === spec.value) return true;
    if (spec.type === "dragon" && tile.type === "dragon" && tile.value === spec.value) return true;
    if (spec.type === "anyTile") return true;
  }

  return false;
}

/** Get all patterns in a given category. */
export function getPatternsByCategory(category: HandCategory): HandPattern[] {
  return PRACTICE_PATTERNS.filter((p) => p.category === category);
}

/** Get all categories with their patterns. */
export function getCategorySummary(): { category: HandCategory; label: string; count: number }[] {
  const LABELS: Record<HandCategory, string> = {
    "2468": "2468",
    "any-like-numbers": "Like Numbers",
    "addition": "Addition",
    "quints": "Quints",
    "consecutive-run": "Consecutive Run",
    "13579": "13579",
    "winds-dragons": "Winds & Dragons",
    "369": "369",
    "singles-pairs": "Singles & Pairs",
  };

  return Object.entries(LABELS).map(([cat, label]) => ({
    category: cat as HandCategory,
    label,
    count: getPatternsByCategory(cat as HandCategory).length,
  }));
}
