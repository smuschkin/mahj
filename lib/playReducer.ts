import { TileData, buildDeck, shuffle, deal, sortHand, tileLabel } from "./tiles";
import {
  ExposedGroup,
  CallType,
  getValidCalls,
  formExposedGroup,
  checkSelfDrawWin,
  checkSelfDrawWinPattern,
  findJokerSwaps,
  JokerSwap,
} from "./calling";
import {
  chooseBotDiscard,
  shouldBotCall,
  chooseBotTarget,
  shouldBotSwitchTarget,
  generateBotInsight,
} from "./botAI";
import {
  suggestPatterns,
  patternProgress,
  matchesAnyPattern,
  type HandPattern,
  type ScoredPattern,
  type PatternProgress,
} from "./patterns";

/* ───── Types ───── */

export type PlayPhase =
  | "setup"
  | "charleston"
  | "pick-hand"
  | "player-discard"
  | "player-draw"
  | "bot-turn"
  | "calling-window"
  | "player-call-prompt"
  | "bot-call-announce"
  | "round-over";

export type BotPlayer = {
  name: string;
  hand: TileData[];
  exposedGroups: ExposedGroup[];
  seatWind: string;
  targetPattern: HandPattern | null;
};

export type LastDiscard = {
  tile: TileData;
  by: 0 | 1 | 2 | 3;
};

export type DiscardEntry = {
  tile: TileData;
  by: 0 | 1 | 2 | 3;
};

export type BotCallPending = {
  botIndex: 1 | 2 | 3;
  callType: CallType;
};

export type PlayState = {
  phase: PlayPhase;
  wall: TileData[];
  playerHand: TileData[];
  playerExposedGroups: ExposedGroup[];
  bots: [BotPlayer, BotPlayer, BotPlayer];
  discardPile: TileData[];
  discardLog: DiscardEntry[];
  currentTurn: 0 | 1 | 2 | 3;
  drawnTile: TileData | null;
  turnCount: number;
  selectedTileId: number | null;
  lastDiscard: LastDiscard | null;
  playerValidCalls: CallType[];
  botCallPending: BotCallPending | null;
  winner: 0 | 1 | 2 | 3 | null;
  winType: "discard" | "self-draw" | null;
  message: string | null;
  callingWindowId: number;
  canSelfDrawWin: boolean;
  availableJokerSwaps: JokerSwap[];
  botInsight: string | null;
  /** Player's chosen target hand pattern */
  playerTargetHand: HandPattern | null;
  /** Pattern suggestions shown during hand selection */
  patternSuggestions: ScoredPattern[];
  /** Live progress toward target pattern */
  playerProgress: PatternProgress | null;
  /** Which pattern was completed to win the game */
  completedPattern: HandPattern | null;
};

export type PlayAction =
  | { type: "START_ROUND"; preferredPattern?: HandPattern }
  | { type: "CHARLESTON_COMPLETE"; hand: TileData[]; pool: TileData[] }
  | { type: "SKIP_CHARLESTON" }
  | { type: "PICK_TARGET_HAND"; patternId: string }
  | { type: "CHANGE_TARGET_HAND" }
  | { type: "SELECT_TILE"; tileId: number }
  | { type: "CONFIRM_DISCARD" }
  | { type: "PLAYER_DRAW" }
  | { type: "BOT_TURN_COMPLETE"; botIndex: 1 | 2 | 3 }
  | { type: "ADVANCE_TO_PLAYER" }
  | { type: "CALL_PUNG" }
  | { type: "CALL_KONG" }
  | { type: "CALL_QUINT" }
  | { type: "CALL_MAHJONG" }
  | { type: "PASS_CALL" }
  | { type: "RESOLVE_CALLING_WINDOW" }
  | { type: "RESOLVE_BOT_CALL_ANNOUNCE" }
  | { type: "DECLARE_SELF_DRAW_WIN" }
  | { type: "JOKER_SWAP"; swap: JokerSwap }
  | { type: "RESET" };

/* ───── Initial state ───── */

const INITIAL_BOTS: [BotPlayer, BotPlayer, BotPlayer] = [
  { name: "South", hand: [], exposedGroups: [], seatWind: "S", targetPattern: null },
  { name: "West", hand: [], exposedGroups: [], seatWind: "W", targetPattern: null },
  { name: "North", hand: [], exposedGroups: [], seatWind: "N", targetPattern: null },
];

export const initialState: PlayState = {
  phase: "setup",
  wall: [],
  playerHand: [],
  playerExposedGroups: [],
  bots: INITIAL_BOTS,
  discardPile: [],
  discardLog: [],
  currentTurn: 0,
  drawnTile: null,
  turnCount: 0,
  selectedTileId: null,
  lastDiscard: null,
  playerValidCalls: [],
  botCallPending: null,
  winner: null,
  winType: null,
  message: null,
  callingWindowId: 0,
  canSelfDrawWin: false,
  availableJokerSwaps: [],
  botInsight: null,
  playerTargetHand: null,
  patternSuggestions: [],
  playerProgress: null,
  completedPattern: null,
};

/* ───── Init round ───── */

function initRound(): PlayState {
  const deck = shuffle(buildDeck());

  // East (player) gets 14, others get 13 — standard American Mahjong deal
  const playerHand = sortHand(deal(deck, 14));
  const bot1Hand = deal(deck, 13);
  const bot2Hand = deal(deck, 13);
  const bot3Hand = deal(deck, 13);

  // Bots choose their target hands immediately
  const bot1Target = chooseBotTarget(bot1Hand, []);
  const bot2Target = chooseBotTarget(bot2Hand, []);
  const bot3Target = chooseBotTarget(bot3Hand, []);

  return {
    ...initialState,
    phase: "charleston",
    wall: deck,
    playerHand,
    bots: [
      { name: "South", hand: bot1Hand, exposedGroups: [], seatWind: "S", targetPattern: bot1Target },
      { name: "West", hand: bot2Hand, exposedGroups: [], seatWind: "W", targetPattern: bot2Target },
      { name: "North", hand: bot3Hand, exposedGroups: [], seatWind: "N", targetPattern: bot3Target },
    ],
    message: null,
  };
}

/* ───── Helpers ───── */

function computePlayerJokerSwaps(state: PlayState): JokerSwap[] {
  const allExposed: { owner: number; groups: ExposedGroup[] }[] = [
    { owner: 0, groups: state.playerExposedGroups },
    { owner: 1, groups: state.bots[0].exposedGroups },
    { owner: 2, groups: state.bots[1].exposedGroups },
    { owner: 3, groups: state.bots[2].exposedGroups },
  ];
  return findJokerSwaps(state.playerHand, allExposed);
}

/* ───── Calling window evaluation ───── */

function evaluateCallingWindow(state: PlayState): PlayState {
  const ld = state.lastDiscard;
  if (!ld) return advanceToNextTurn(state);

  // Check bots for calls
  let bestBotCall: BotCallPending | null = null;

  for (let i = 0; i < 3; i++) {
    const botSeat = (i + 1) as 1 | 2 | 3;
    if (botSeat === ld.by) continue;

    const bot = state.bots[i];
    const callType = shouldBotCall(
      bot.hand,
      ld.tile,
      bot.exposedGroups,
      bot.targetPattern,
      state.turnCount
    );

    if (callType) {
      if (
        !bestBotCall ||
        callType === "mahjong" ||
        (bestBotCall.callType !== "mahjong" && callType === "quint") ||
        (bestBotCall.callType !== "mahjong" && bestBotCall.callType !== "quint" && callType === "kong")
      ) {
        bestBotCall = { botIndex: botSeat, callType };
      }
    }
  }

  // Check player for calls
  let playerCalls: CallType[] = [];
  if (ld.by !== 0) {
    playerCalls = getValidCalls(
      state.playerHand,
      ld.tile,
      state.playerExposedGroups,
      state.playerTargetHand
    );
  }

  // Priority: Mahjong > everything else; player wins ties
  if (playerCalls.includes("mahjong")) {
    return {
      ...state,
      phase: "player-call-prompt",
      playerValidCalls: playerCalls,
      botCallPending: bestBotCall,
      message: null,
    };
  }

  if (bestBotCall?.callType === "mahjong") {
    return beginBotCallAnnounce(state, bestBotCall);
  }

  if (playerCalls.length > 0) {
    return {
      ...state,
      phase: "player-call-prompt",
      playerValidCalls: playerCalls,
      botCallPending: bestBotCall,
      message: null,
    };
  }

  if (bestBotCall) {
    return beginBotCallAnnounce(state, bestBotCall);
  }

  return advanceToNextTurn(state);
}

function beginBotCallAnnounce(state: PlayState, call: BotCallPending): PlayState {
  const bot = state.bots[call.botIndex - 1];
  const callLabel =
    call.callType === "mahjong" ? "Mahjong"
    : call.callType === "quint" ? "Quint"
    : call.callType === "kong" ? "Kong"
    : "Pung";

  const categoryLabel = bot.targetPattern?.category ?? "unknown";
  const callInsight =
    call.callType === "mahjong"
      ? `${bot.name} completed their hand!`
      : `${bot.name} exposed a ${callLabel.toLowerCase()}. They may be working on a ${categoryLabel} hand.`;

  return {
    ...state,
    phase: "bot-call-announce",
    botCallPending: call,
    playerValidCalls: [],
    message: `${bot.name} calls ${callLabel} on ${tileLabel(state.lastDiscard!.tile)}!`,
    botInsight: callInsight,
  };
}

function executeBotCall(state: PlayState, call: BotCallPending): PlayState {
  const ld = state.lastDiscard!;
  const botIdx = call.botIndex - 1;
  const bot = state.bots[botIdx];

  if (call.callType === "mahjong") {
    const winPattern = matchesAnyPattern([...bot.hand, ld.tile], bot.exposedGroups);
    return {
      ...state,
      phase: "round-over",
      winner: call.botIndex,
      winType: "discard",
      message: `${bot.name} called Mahjong!`,
      discardPile: state.discardPile.slice(0, -1),
      discardLog: state.discardLog.slice(0, -1),
      botCallPending: null,
      completedPattern: winPattern,
    };
  }

  const callType = call.callType === "quint" ? "quint" : call.callType === "kong" ? "kong" : "pung";
  const { group, remainingHand } = formExposedGroup(bot.hand, ld.tile, callType);

  const newBots = [...state.bots] as [BotPlayer, BotPlayer, BotPlayer];
  newBots[botIdx] = {
    ...bot,
    hand: remainingHand,
    exposedGroups: [...bot.exposedGroups, group],
  };

  const newDiscardPile = state.discardPile.slice(0, -1);
  const newDiscardLog = state.discardLog.slice(0, -1);

  const discardTile = chooseBotDiscard(remainingHand, newBots[botIdx].exposedGroups, bot.targetPattern);
  const handAfterDiscard = remainingHand.filter((t) => t.id !== discardTile.id);
  newBots[botIdx] = { ...newBots[botIdx], hand: handAfterDiscard };

  const discardEntry: DiscardEntry = { tile: discardTile, by: call.botIndex };

  return {
    ...state,
    bots: newBots,
    discardPile: [...newDiscardPile, discardTile],
    discardLog: [...newDiscardLog, discardEntry],
    lastDiscard: { tile: discardTile, by: call.botIndex },
    botCallPending: null,
    playerValidCalls: [],
    message: `${bot.name} discards ${tileLabel(discardTile)}.`,
    phase: "calling-window",
    callingWindowId: state.callingWindowId + 1,
  };
}

function advanceToNextTurn(state: PlayState): PlayState {
  const ld = state.lastDiscard;
  if (!ld) return state;

  const nextSeat = ((ld.by + 1) % 4) as 0 | 1 | 2 | 3;

  if (state.wall.length === 0) {
    return {
      ...state,
      phase: "round-over",
      winner: null,
      message: "Wall is empty \u2014 draw game!",
    };
  }

  if (nextSeat === 0) {
    return {
      ...state,
      phase: "player-draw",
      currentTurn: 0,
      lastDiscard: null,
      playerValidCalls: [],
      botCallPending: null,
      message: null,
    };
  }

  return {
    ...state,
    phase: "bot-turn",
    currentTurn: nextSeat,
    lastDiscard: null,
    playerValidCalls: [],
    botCallPending: null,
    message: null,
  };
}

/* ───── Reducer ───── */

export function playReducer(state: PlayState, action: PlayAction): PlayState {
  switch (action.type) {
    case "START_ROUND": {
      const round = initRound();
      if (action.preferredPattern) {
        // Skip Charleston and hand selection — go straight to play with same pattern
        const progress = patternProgress(round.playerHand, [], action.preferredPattern);
        const canWin = checkSelfDrawWin(round.playerHand, []);
        return {
          ...round,
          phase: "player-discard",
          playerTargetHand: action.preferredPattern,
          playerProgress: progress,
          canSelfDrawWin: canWin,
          message: canWin ? "Your opening hand matches a pattern! Declare Mahjong!" : null,
        };
      }
      return round;
    }

    case "CHARLESTON_COMPLETE": {
      // Charleston uses 13 tiles; East needs 14 for play. Draw one from pool.
      const pool = [...action.pool];
      const extraTile = pool.shift();
      const fullHand = extraTile
        ? sortHand([...action.hand, extraTile])
        : sortHand(action.hand);
      const suggestions = suggestPatterns(fullHand, []);
      return {
        ...state,
        playerHand: fullHand,
        wall: pool,
        phase: "pick-hand",
        patternSuggestions: suggestions,
        message: null,
      };
    }

    case "SKIP_CHARLESTON": {
      const suggestions = suggestPatterns(state.playerHand, []);
      return {
        ...state,
        phase: "pick-hand",
        patternSuggestions: suggestions,
        message: null,
      };
    }

    case "PICK_TARGET_HAND": {
      const pattern = state.patternSuggestions.find(
        (s) => s.pattern.id === action.patternId
      )?.pattern ?? state.patternSuggestions[0]?.pattern ?? null;

      const progress = pattern
        ? patternProgress(state.playerHand, state.playerExposedGroups, pattern)
        : null;

      // Check if opening hand already wins
      const canWin = checkSelfDrawWin(state.playerHand, state.playerExposedGroups);

      return {
        ...state,
        phase: "player-discard",
        playerTargetHand: pattern,
        playerProgress: progress,
        canSelfDrawWin: canWin,
        message: canWin ? "Your opening hand matches a pattern! Declare Mahjong!" : null,
      };
    }

    case "CHANGE_TARGET_HAND": {
      const suggestions = suggestPatterns(
        state.playerHand,
        state.playerExposedGroups
      );
      return {
        ...state,
        phase: "pick-hand",
        patternSuggestions: suggestions,
        message: null,
      };
    }

    case "SELECT_TILE": {
      if (state.phase !== "player-discard") return state;
      const toggled =
        state.selectedTileId === action.tileId ? null : action.tileId;
      return { ...state, selectedTileId: toggled };
    }

    case "CONFIRM_DISCARD": {
      if (state.phase !== "player-discard" || state.selectedTileId === null)
        return state;
      const discarded = state.playerHand.find(
        (t) => t.id === state.selectedTileId
      );
      if (!discarded) return state;
      const newHand = sortHand(
        state.playerHand.filter((t) => t.id !== state.selectedTileId)
      );
      const entry: DiscardEntry = { tile: discarded, by: 0 };

      const progress = state.playerTargetHand
        ? patternProgress(newHand, state.playerExposedGroups, state.playerTargetHand)
        : null;

      return {
        ...state,
        playerHand: newHand,
        discardPile: [...state.discardPile, discarded],
        discardLog: [...state.discardLog, entry],
        selectedTileId: null,
        drawnTile: null,
        lastDiscard: { tile: discarded, by: 0 },
        phase: "calling-window",
        turnCount: state.turnCount + 1,
        message: null,
        callingWindowId: state.callingWindowId + 1,
        canSelfDrawWin: false,
        availableJokerSwaps: [],
        botInsight: null,
        playerProgress: progress,
      };
    }

    case "BOT_TURN_COMPLETE": {
      if (state.phase !== "bot-turn") return state;
      const botIdx = action.botIndex - 1;
      const bot = state.bots[botIdx];
      if (!bot || state.wall.length === 0) {
        return {
          ...state,
          phase: "round-over",
          winner: null,
          message: "Wall is empty \u2014 draw game!",
        };
      }

      // Bot draws from wall
      const newWall = [...state.wall];
      const drawn = newWall.shift()!;
      const newBotHand = [...bot.hand, drawn];

      // Check bot self-draw win
      const winPattern = checkSelfDrawWinPattern(newBotHand, bot.exposedGroups);
      if (winPattern) {
        const newBots = [...state.bots] as [BotPlayer, BotPlayer, BotPlayer];
        newBots[botIdx] = { ...bot, hand: newBotHand };
        return {
          ...state,
          wall: newWall,
          bots: newBots,
          phase: "round-over",
          winner: action.botIndex,
          winType: "self-draw",
          message: `${bot.name} drew their winning tile — Mahjong!`,
          botInsight: "Self-draw wins pay double — every other player pays 2\u00D7 the hand value!",
          completedPattern: winPattern,
        };
      }

      // Check if bot should switch target
      const activeTarget = bot.targetPattern
        ? (shouldBotSwitchTarget(
            newBotHand,
            bot.exposedGroups,
            bot.targetPattern,
            state.turnCount
          ) ?? bot.targetPattern)
        : bot.targetPattern;

      // Bot discards
      const discardTile = chooseBotDiscard(newBotHand, bot.exposedGroups, activeTarget);
      const handAfterDiscard = newBotHand.filter((t) => t.id !== discardTile.id);

      const newBots = [...state.bots] as [BotPlayer, BotPlayer, BotPlayer];
      newBots[botIdx] = {
        ...bot,
        hand: handAfterDiscard,
        targetPattern: activeTarget,
      };

      const entry: DiscardEntry = { tile: discardTile, by: action.botIndex };

      // Generate insight ~40% of the time
      const insight = Math.random() < 0.4
        ? generateBotInsight(newBots[botIdx].name, discardTile, activeTarget)
        : null;

      return {
        ...state,
        wall: newWall,
        bots: newBots,
        discardPile: [...state.discardPile, discardTile],
        discardLog: [...state.discardLog, entry],
        lastDiscard: { tile: discardTile, by: action.botIndex },
        phase: "calling-window",
        turnCount: state.turnCount + 1,
        message: `${bot.name} discards ${tileLabel(discardTile)}.`,
        callingWindowId: state.callingWindowId + 1,
        botInsight: insight,
      };
    }

    case "RESOLVE_CALLING_WINDOW": {
      if (state.phase !== "calling-window") return state;
      return evaluateCallingWindow(state);
    }

    case "RESOLVE_BOT_CALL_ANNOUNCE": {
      if (state.phase !== "bot-call-announce" || !state.botCallPending)
        return state;
      return executeBotCall(state, state.botCallPending);
    }

    case "CALL_PUNG":
    case "CALL_KONG":
    case "CALL_QUINT": {
      if (state.phase !== "player-call-prompt" || !state.lastDiscard)
        return state;

      const ld = state.lastDiscard;
      const callType =
        action.type === "CALL_QUINT" ? "quint" :
        action.type === "CALL_KONG" ? "kong" : "pung";

      const { group, remainingHand } = formExposedGroup(
        state.playerHand,
        ld.tile,
        callType
      );

      const newExposed = [...state.playerExposedGroups, group];
      const progress = state.playerTargetHand
        ? patternProgress(sortHand(remainingHand), newExposed, state.playerTargetHand)
        : null;

      return {
        ...state,
        playerHand: sortHand(remainingHand),
        playerExposedGroups: newExposed,
        discardPile: state.discardPile.slice(0, -1),
        discardLog: state.discardLog.slice(0, -1),
        phase: "player-discard",
        currentTurn: 0,
        lastDiscard: null,
        playerValidCalls: [],
        botCallPending: null,
        drawnTile: null,
        message: `You called ${callType.charAt(0).toUpperCase() + callType.slice(1)}! Now discard a tile.`,
        playerProgress: progress,
      };
    }

    case "CALL_MAHJONG": {
      if (state.phase !== "player-call-prompt" || !state.lastDiscard)
        return state;

      const fullHand = sortHand([...state.playerHand, state.lastDiscard.tile]);
      const winPattern = matchesAnyPattern(fullHand, state.playerExposedGroups);

      return {
        ...state,
        playerHand: fullHand,
        discardPile: state.discardPile.slice(0, -1),
        discardLog: state.discardLog.slice(0, -1),
        phase: "round-over",
        winner: 0,
        winType: "discard",
        lastDiscard: null,
        playerValidCalls: [],
        botCallPending: null,
        message: "Mahjong! You win!",
        completedPattern: winPattern,
      };
    }

    case "PASS_CALL": {
      if (state.phase !== "player-call-prompt") return state;

      if (state.botCallPending) {
        return beginBotCallAnnounce(
          { ...state, playerValidCalls: [] },
          state.botCallPending
        );
      }

      return advanceToNextTurn({
        ...state,
        playerValidCalls: [],
        botCallPending: null,
      });
    }

    case "ADVANCE_TO_PLAYER": {
      if (state.wall.length === 0) {
        return {
          ...state,
          phase: "round-over",
          winner: null,
          message: "Wall is empty \u2014 draw game!",
        };
      }
      return { ...state, phase: "player-draw", currentTurn: 0, message: null };
    }

    case "PLAYER_DRAW": {
      if (state.phase !== "player-draw" || state.wall.length === 0) {
        return {
          ...state,
          phase: "round-over",
          winner: null,
          message: "Wall is empty \u2014 draw game!",
        };
      }
      const newWall = [...state.wall];
      const drawn = newWall.shift()!;
      const newHand = sortHand([...state.playerHand, drawn]);

      const canWin = checkSelfDrawWin(newHand, state.playerExposedGroups);
      const tempState = { ...state, wall: newWall, playerHand: newHand };
      const jokerSwaps = computePlayerJokerSwaps(tempState);
      const progress = state.playerTargetHand
        ? patternProgress(newHand, state.playerExposedGroups, state.playerTargetHand)
        : null;

      return {
        ...state,
        wall: newWall,
        playerHand: newHand,
        drawnTile: drawn,
        phase: "player-discard",
        selectedTileId: null,
        message: canWin
          ? "You drew your winning tile! Declare Mahjong!"
          : jokerSwaps.length > 0
            ? "You can swap a natural tile for a joker from an exposed group!"
            : null,
        canSelfDrawWin: canWin,
        availableJokerSwaps: jokerSwaps,
        botInsight: null,
        playerProgress: progress,
      };
    }

    case "DECLARE_SELF_DRAW_WIN": {
      if (!state.canSelfDrawWin) return state;
      const winPattern = checkSelfDrawWinPattern(
        state.playerHand,
        state.playerExposedGroups
      );
      return {
        ...state,
        phase: "round-over",
        winner: 0,
        winType: "self-draw",
        message: "Mahjong! You self-drew your winning tile!",
        canSelfDrawWin: false,
        availableJokerSwaps: [],
        completedPattern: winPattern,
      };
    }

    case "JOKER_SWAP": {
      if (state.phase !== "player-discard") return state;
      const { swap } = action;

      const handWithoutNatural = state.playerHand.filter(
        (t) => t.id !== swap.naturalTile.id
      );
      const newPlayerHand = sortHand([...handWithoutNatural, swap.jokerTile]);

      if (swap.groupOwner === 0) {
        const newGroups = [...state.playerExposedGroups];
        const group = newGroups[swap.groupIndex];
        const newTiles = group.tiles.map((t) =>
          t.id === swap.jokerTile.id ? swap.naturalTile : t
        );
        newGroups[swap.groupIndex] = { ...group, tiles: newTiles };

        const newState = {
          ...state,
          playerHand: newPlayerHand,
          playerExposedGroups: newGroups,
          message: "You swapped a natural tile for a joker!",
        };
        const progress = state.playerTargetHand
          ? patternProgress(newPlayerHand, newGroups, state.playerTargetHand)
          : null;
        return {
          ...newState,
          canSelfDrawWin: checkSelfDrawWin(newPlayerHand, newGroups),
          availableJokerSwaps: computePlayerJokerSwaps(newState),
          playerProgress: progress,
        };
      } else {
        const botIdx = swap.groupOwner - 1;
        const newBots = [...state.bots] as [BotPlayer, BotPlayer, BotPlayer];
        const bot = newBots[botIdx];
        const newGroups = [...bot.exposedGroups];
        const group = newGroups[swap.groupIndex];
        const newTiles = group.tiles.map((t) =>
          t.id === swap.jokerTile.id ? swap.naturalTile : t
        );
        newGroups[swap.groupIndex] = { ...group, tiles: newTiles };
        newBots[botIdx] = { ...bot, exposedGroups: newGroups };

        const newState = {
          ...state,
          playerHand: newPlayerHand,
          bots: newBots,
          message: `You swapped a tile into ${bot.name}'s exposed group and took a joker!`,
        };
        const progress = state.playerTargetHand
          ? patternProgress(newPlayerHand, state.playerExposedGroups, state.playerTargetHand)
          : null;
        return {
          ...newState,
          canSelfDrawWin: checkSelfDrawWin(newPlayerHand, state.playerExposedGroups),
          availableJokerSwaps: computePlayerJokerSwaps(newState),
          playerProgress: progress,
        };
      }
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
