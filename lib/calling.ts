/**
 * Calling validation utilities for American Mahjong.
 *
 * Rules:
 * - Pung: need 2 matching tiles in hand to call a discard (forms group of 3)
 * - Kong: need 3 matching tiles in hand to call a discard (forms group of 4)
 * - Quint: need 4 matching tiles in hand to call a discard (forms group of 5)
 * - Mahjong: the discard completes your entire hand (matches a practice pattern)
 * - Cannot call a discarded joker
 * - Jokers can substitute in groups of 3+, but you still need at least
 *   2 natural (non-joker) matching tiles to call Pung, 3 for Kong, 4 for Quint
 *
 * Win validation uses the practice pattern library (lib/patterns.ts) instead
 * of the old generic "pungs + pair" Chinese Mahjong check.
 */

import type { TileData } from "./tiles";
import { tileKey } from "./tiles";
import { matchesAnyPattern, tileFitsPattern, type HandPattern } from "./patterns";

/* ───── Exposed group (called tiles face-up on rack) ───── */

export type ExposedGroup = {
  tiles: TileData[];
  callType: "pung" | "kong" | "quint";
  calledTile: TileData;
};

/* ───── Call types ───── */

export type CallType = "pung" | "kong" | "quint" | "mahjong";

/* ───── Helpers ───── */

/** Count how many tiles in `hand` match `tile` by type+value (excludes jokers). */
export function countMatching(hand: TileData[], tile: TileData): number {
  const key = tileKey(tile);
  return hand.filter((t) => tileKey(t) === key).length;
}

/* ───── Validation ───── */

export function canCallPung(hand: TileData[], discard: TileData): boolean {
  if (discard.type === "joker") return false;
  return countMatching(hand, discard) >= 2;
}

export function canCallKong(hand: TileData[], discard: TileData): boolean {
  if (discard.type === "joker") return false;
  return countMatching(hand, discard) >= 3;
}

export function canCallQuint(hand: TileData[], discard: TileData): boolean {
  if (discard.type === "joker") return false;
  // Need at least 3 natural matching tiles + jokers to fill to 4.
  // (discard is the 5th tile; 4 must come from hand)
  const naturalMatches = countMatching(hand, discard);
  if (naturalMatches < 3) return false;
  const jokerCount = hand.filter((t) => t.type === "joker").length;
  return naturalMatches + jokerCount >= 4;
}

/**
 * Pattern-based Mahjong check:
 * Adding the discard gives a full hand. Check if it matches ANY practice pattern.
 */
export function canCallMahjong(
  hand: TileData[],
  discard: TileData,
  exposedGroups: ExposedGroup[]
): boolean {
  if (discard.type === "joker") return false;

  const exposedTileCount = exposedGroups.reduce(
    (sum, g) => sum + g.tiles.length,
    0
  );
  const expectedHandSize = 13 - exposedTileCount;
  if (hand.length !== expectedHandSize) return false;

  const fullHand = [...hand, discard];
  return matchesAnyPattern(fullHand, exposedGroups) !== null;
}

/* ───── Self-draw win check ───── */

/**
 * Check if a hand is a winning hand after drawing (self-draw).
 * The hand should already include the drawn tile (14 tiles minus exposed).
 */
export function checkSelfDrawWin(
  hand: TileData[],
  exposedGroups: ExposedGroup[]
): boolean {
  const exposedTileCount = exposedGroups.reduce(
    (sum, g) => sum + g.tiles.length,
    0
  );
  const expectedSize = 14 - exposedTileCount;
  if (hand.length !== expectedSize) return false;
  return matchesAnyPattern(hand, exposedGroups) !== null;
}

/**
 * Check self-draw win and return which pattern was matched.
 */
export function checkSelfDrawWinPattern(
  hand: TileData[],
  exposedGroups: ExposedGroup[]
): HandPattern | null {
  const exposedTileCount = exposedGroups.reduce(
    (sum, g) => sum + g.tiles.length,
    0
  );
  const expectedSize = 14 - exposedTileCount;
  if (hand.length !== expectedSize) return null;
  return matchesAnyPattern(hand, exposedGroups);
}

/* ───── Joker swap/exchange ───── */

/**
 * In American Mahjong, if you hold the natural tile that matches a joker
 * in any player's exposed group, you can swap it to take the joker.
 *
 * Returns all valid swaps: which tile from hand, which group, which joker.
 */
export type JokerSwap = {
  naturalTile: TileData;
  groupOwner: number;
  groupIndex: number;
  jokerTile: TileData;
};

export function findJokerSwaps(
  hand: TileData[],
  allExposedGroups: { owner: number; groups: ExposedGroup[] }[]
): JokerSwap[] {
  const swaps: JokerSwap[] = [];

  for (const { owner, groups } of allExposedGroups) {
    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];
      const jokersInGroup = group.tiles.filter((t) => t.type === "joker");
      if (jokersInGroup.length === 0) continue;

      const naturalTile = group.tiles.find((t) => t.type !== "joker");
      if (!naturalTile) continue;

      const naturalKey = tileKey(naturalTile);

      for (const handTile of hand) {
        if (handTile.type === "joker") continue;
        if (tileKey(handTile) === naturalKey) {
          swaps.push({
            naturalTile: handTile,
            groupOwner: owner,
            groupIndex: gi,
            jokerTile: jokersInGroup[0],
          });
          break;
        }
      }
    }
  }

  return swaps;
}

/* ───── Target hand helpers ───── */

/**
 * Check if calling a discard makes sense for a target pattern.
 * Returns true if the discard tile fits the target pattern.
 */
export function callFitsTarget(
  discard: TileData,
  targetPattern: HandPattern | null
): boolean {
  if (!targetPattern) return true; // no target = anything goes
  return tileFitsPattern(discard, targetPattern);
}

/**
 * Check if a target pattern allows exposing groups (open hands).
 * Closed patterns cannot call pung/kong/quint — only Mahjong.
 */
export function targetAllowsExposure(
  targetPattern: HandPattern | null
): boolean {
  if (!targetPattern) return true;
  return targetPattern.exposure === "open";
}

/* ───── Group formation ───── */

/**
 * Form an exposed group by pulling matching tiles from the hand.
 * Returns the group and the remaining hand.
 */
export function formExposedGroup(
  hand: TileData[],
  discard: TileData,
  callType: "pung" | "kong" | "quint"
): { group: ExposedGroup; remainingHand: TileData[] } {
  const needed = callType === "pung" ? 2 : callType === "kong" ? 3 : 4;
  const key = tileKey(discard);
  const remaining = [...hand];
  const groupTiles: TileData[] = [discard];

  // Pull matching natural tiles first
  let pulled = 0;
  for (let i = remaining.length - 1; i >= 0 && pulled < needed; i--) {
    if (tileKey(remaining[i]) === key) {
      groupTiles.push(remaining[i]);
      remaining.splice(i, 1);
      pulled++;
    }
  }

  // For quints, fill remaining slots with jokers if needed
  if (callType === "quint" && pulled < needed) {
    for (let i = remaining.length - 1; i >= 0 && pulled < needed; i--) {
      if (remaining[i].type === "joker") {
        groupTiles.push(remaining[i]);
        remaining.splice(i, 1);
        pulled++;
      }
    }
  }

  return {
    group: { tiles: groupTiles, callType, calledTile: discard },
    remainingHand: remaining,
  };
}

/** Get all valid call types a player can make on a given discard. */
export function getValidCalls(
  hand: TileData[],
  discard: TileData,
  exposedGroups: ExposedGroup[],
  targetPattern?: HandPattern | null
): CallType[] {
  const calls: CallType[] = [];

  // Mahjong is always checked (you can win with any pattern, not just target)
  if (canCallMahjong(hand, discard, exposedGroups)) calls.push("mahjong");

  // For pung/kong/quint, check if the target allows exposure
  const canExpose = targetAllowsExposure(targetPattern ?? null);

  if (canExpose) {
    if (canCallQuint(hand, discard)) calls.push("quint");
    if (canCallKong(hand, discard)) calls.push("kong");
    if (canCallPung(hand, discard)) calls.push("pung");
  }

  return calls;
}
