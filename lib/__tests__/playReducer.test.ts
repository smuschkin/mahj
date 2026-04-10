import { describe, it, expect } from "vitest";
import { playReducer, initialState } from "../playReducer";
import { PRACTICE_PATTERNS } from "../patterns";

describe("playReducer", () => {
  describe("START_ROUND", () => {
    it("initializes a new round in charleston phase", () => {
      const state = playReducer(initialState, { type: "START_ROUND" });
      expect(state.phase).toBe("charleston");
      expect(state.playerHand).toHaveLength(14);
      expect(state.bots[0].hand).toHaveLength(13);
      expect(state.bots[1].hand).toHaveLength(13);
      expect(state.bots[2].hand).toHaveLength(13);
      expect(state.wall.length).toBeGreaterThan(0);
    });

    it("bots have target patterns assigned", () => {
      const state = playReducer(initialState, { type: "START_ROUND" });
      expect(state.bots[0].targetPattern).not.toBeNull();
      expect(state.bots[1].targetPattern).not.toBeNull();
      expect(state.bots[2].targetPattern).not.toBeNull();
    });

    it("with preferredPattern skips charleston and pick-hand", () => {
      const pattern = PRACTICE_PATTERNS[0];
      const state = playReducer(initialState, {
        type: "START_ROUND",
        preferredPattern: pattern,
      });
      expect(state.phase).toBe("player-discard");
      expect(state.playerTargetHand).toBe(pattern);
      expect(state.playerProgress).not.toBeNull();
    });
  });

  describe("SKIP_CHARLESTON", () => {
    it("goes to pick-hand phase with suggestions", () => {
      const round = playReducer(initialState, { type: "START_ROUND" });
      const state = playReducer(round, { type: "SKIP_CHARLESTON" });
      expect(state.phase).toBe("pick-hand");
      expect(state.patternSuggestions.length).toBeGreaterThan(0);
      expect(state.playerHand).toHaveLength(14);
    });
  });

  describe("PICK_TARGET_HAND", () => {
    it("sets target and transitions to player-discard", () => {
      const round = playReducer(initialState, { type: "START_ROUND" });
      const skipped = playReducer(round, { type: "SKIP_CHARLESTON" });
      const patternId = skipped.patternSuggestions[0].pattern.id;

      const state = playReducer(skipped, {
        type: "PICK_TARGET_HAND",
        patternId,
      });
      expect(state.phase).toBe("player-discard");
      expect(state.playerTargetHand?.id).toBe(patternId);
      expect(state.playerProgress).not.toBeNull();
    });

    it("falls back to first suggestion if patternId not found", () => {
      const round = playReducer(initialState, { type: "START_ROUND" });
      const skipped = playReducer(round, { type: "SKIP_CHARLESTON" });

      const state = playReducer(skipped, {
        type: "PICK_TARGET_HAND",
        patternId: "nonexistent-id",
      });
      expect(state.phase).toBe("player-discard");
      expect(state.playerTargetHand).not.toBeNull();
    });
  });

  describe("CHANGE_TARGET_HAND", () => {
    it("returns to pick-hand phase with fresh suggestions", () => {
      const round = playReducer(initialState, { type: "START_ROUND" });
      const skipped = playReducer(round, { type: "SKIP_CHARLESTON" });
      const picked = playReducer(skipped, {
        type: "PICK_TARGET_HAND",
        patternId: skipped.patternSuggestions[0].pattern.id,
      });

      const state = playReducer(picked, { type: "CHANGE_TARGET_HAND" });
      expect(state.phase).toBe("pick-hand");
      expect(state.patternSuggestions.length).toBeGreaterThan(0);
    });
  });

  describe("SELECT_TILE and CONFIRM_DISCARD", () => {
    function getPlayState() {
      const round = playReducer(initialState, {
        type: "START_ROUND",
        preferredPattern: PRACTICE_PATTERNS[0],
      });
      return round;
    }

    it("selects and deselects a tile", () => {
      const state = getPlayState();
      const tileId = state.playerHand[0].id;

      const selected = playReducer(state, { type: "SELECT_TILE", tileId });
      expect(selected.selectedTileId).toBe(tileId);

      const deselected = playReducer(selected, { type: "SELECT_TILE", tileId });
      expect(deselected.selectedTileId).toBeNull();
    });

    it("discards selected tile and enters calling window", () => {
      const state = getPlayState();
      const tileId = state.playerHand[0].id;
      const handSize = state.playerHand.length;

      const selected = playReducer(state, { type: "SELECT_TILE", tileId });
      const discarded = playReducer(selected, { type: "CONFIRM_DISCARD" });

      expect(discarded.phase).toBe("calling-window");
      expect(discarded.playerHand).toHaveLength(handSize - 1);
      expect(discarded.discardPile).toHaveLength(1);
      expect(discarded.selectedTileId).toBeNull();
      expect(discarded.canSelfDrawWin).toBe(false);
    });
  });

  describe("PLAYER_DRAW", () => {
    function getDrawState() {
      const round = playReducer(initialState, {
        type: "START_ROUND",
        preferredPattern: PRACTICE_PATTERNS[0],
      });
      // Discard a tile to advance, then manually set to player-draw
      const tileId = round.playerHand[0].id;
      const selected = playReducer(round, { type: "SELECT_TILE", tileId });
      const discarded = playReducer(selected, { type: "CONFIRM_DISCARD" });
      // Force to player-draw phase for testing
      return { ...discarded, phase: "player-draw" as const, currentTurn: 0 as const, lastDiscard: null };
    }

    it("draws a tile and enters player-discard", () => {
      const state = getDrawState();
      const wallBefore = state.wall.length;
      const handBefore = state.playerHand.length;

      const drawn = playReducer(state, { type: "PLAYER_DRAW" });
      expect(drawn.phase).toBe("player-discard");
      expect(drawn.playerHand).toHaveLength(handBefore + 1);
      expect(drawn.wall).toHaveLength(wallBefore - 1);
      expect(drawn.drawnTile).not.toBeNull();
    });

    it("ends game when wall is empty", () => {
      const state = { ...getDrawState(), wall: [] };
      const result = playReducer(state, { type: "PLAYER_DRAW" });
      expect(result.phase).toBe("round-over");
      expect(result.winner).toBeNull();
    });
  });

  describe("RESET", () => {
    it("returns to initial state", () => {
      const round = playReducer(initialState, { type: "START_ROUND" });
      const reset = playReducer(round, { type: "RESET" });
      expect(reset.phase).toBe("setup");
      expect(reset.playerHand).toHaveLength(0);
    });
  });
});
