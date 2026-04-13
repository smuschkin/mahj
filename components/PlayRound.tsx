"use client";

import { useReducer, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { tileLabel } from "@/lib/tiles";
import { playReducer, initialState } from "@/lib/playReducer";
import { callFitsTarget } from "@/lib/calling";
import { PlayerHand } from "@/components/PlayerHand";
import { GameTable } from "@/components/GameTable";
import { CallPrompt } from "@/components/CallPrompt";
import { CharlestonSim } from "@/components/CharlestonSim";

const SEAT_NAMES: Record<number, string> = {
  1: "South",
  2: "West",
  3: "North",
};

const CATEGORY_LABELS: Record<string, string> = {
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

export function PlayRound() {
  const [state, dispatch] = useReducer(playReducer, initialState);
  const dispatchRef = useRef(dispatch);
  useEffect(() => { dispatchRef.current = dispatch; });

  // Start a round on mount
  useEffect(() => {
    dispatch({ type: "START_ROUND" });
  }, []);

  // Auto-resolve calling windows
  useEffect(() => {
    if (state.phase !== "calling-window") return;
    const timer = setTimeout(() => {
      dispatchRef.current({ type: "RESOLVE_CALLING_WINDOW" });
    }, 600);
    return () => clearTimeout(timer);
  }, [state.phase, state.callingWindowId]);

  // Auto-resolve bot-call-announce
  useEffect(() => {
    if (state.phase !== "bot-call-announce") return;
    const timer = setTimeout(() => {
      dispatchRef.current({ type: "RESOLVE_BOT_CALL_ANNOUNCE" });
    }, 1500);
    return () => clearTimeout(timer);
  }, [state.phase, state.callingWindowId]);

  // Auto-advance bot turns
  useEffect(() => {
    if (state.phase !== "bot-turn") return;
    const botIndex = state.currentTurn as 1 | 2 | 3;
    const timer = setTimeout(() => {
      dispatchRef.current({ type: "BOT_TURN_COMPLETE", botIndex });
    }, 800);
    return () => clearTimeout(timer);
  }, [state.phase, state.currentTurn]);

  const handlePass = useCallback(() => {
    dispatch({ type: "PASS_CALL" });
  }, []);

  const isCallingPrompt = state.phase === "player-call-prompt";
  const isRoundOver = state.phase === "round-over";
  const isBotActive =
    state.phase === "bot-turn" ||
    state.phase === "calling-window" ||
    state.phase === "bot-call-announce";
  const isPlaying =
    state.phase === "player-discard" ||
    state.phase === "player-draw" ||
    state.phase === "bot-turn" ||
    state.phase === "calling-window" ||
    state.phase === "player-call-prompt" ||
    state.phase === "bot-call-announce";

  /* ── CHARLESTON PHASE ── */
  if (state.phase === "charleston") {
    return (
      <div className="mx-auto max-w-[820px] px-4 py-6 sm:px-7">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="rounded-md px-2 py-1 text-sm font-bold text-[#2D8B5E] transition hover:underline">
            &larr; Home
          </Link>
          <span className="text-[13px] font-black uppercase tracking-[3px] text-[#C8A951]">
            Practice Game
          </span>
          <button
            type="button"
            onClick={() => dispatch({ type: "SKIP_CHARLESTON" })}
            className="rounded-md px-2 py-1 text-[13px] font-bold text-zinc-600 transition hover:text-zinc-800"
          >
            Skip Charleston
          </button>
        </div>
        <CharlestonSim
          mode="embedded"
          initialHand={state.playerHand}
          initialPool={state.wall}
          onComplete={(hand, pool) =>
            dispatch({ type: "CHARLESTON_COMPLETE", hand, pool })
          }
        />
      </div>
    );
  }

  /* ── HAND SELECTION PHASE ── */
  if (state.phase === "pick-hand") {
    return (
      <div className="mx-auto max-w-[820px] px-4 py-6 sm:px-7">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="rounded-md px-2 py-1 text-sm font-bold text-[#2D8B5E] transition hover:underline">
            &larr; Home
          </Link>
          <span className="text-[13px] font-black uppercase tracking-[3px] text-[#C8A951]">
            Pick Your Hand
          </span>
          <span />
        </div>

        <div className="mb-4 text-center">
          <h2 className="font-serif text-xl font-black text-[var(--color-mid)]">
            Choose a target hand
          </h2>
          <p className="mt-1 text-sm text-zinc-700">
            Pick the pattern that best fits your tiles. You can change later.
          </p>
        </div>

        {/* Show current hand */}
        <div className="mb-5 rounded-xl bg-gradient-to-b from-[#1A4D2E] to-[#0F3320] p-4 shadow-lg">
          <p className="mb-2 text-center text-[13px] font-black uppercase tracking-[2px] text-[#C8A951]">
            Your Hand
          </p>
          <PlayerHand
            hand={state.playerHand}
            selectedTileId={null}
            drawnTile={null}
            disabled
            onSelect={() => {}}
            onReorder={(from, to) => dispatch({ type: "REORDER_HAND", fromIndex: from, toIndex: to })}
          />
          <p className="mt-1 text-center text-[10px] italic text-emerald-200/70">
            Drag tiles to rearrange your hand
          </p>
        </div>

        {/* Pattern suggestions */}
        <div className="space-y-3">
          {state.patternSuggestions.length === 0 && (
            <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 text-center">
              <p className="text-sm text-zinc-700">No pattern suggestions available for this hand.</p>
              <button
                type="button"
                onClick={() => dispatch({ type: "START_ROUND" })}
                className="mt-3 rounded-md bg-[var(--color-mid)] px-5 py-2 text-sm font-bold text-white"
              >
                Deal again
              </button>
            </div>
          )}
          {state.patternSuggestions.map((suggestion) => {
            const p = suggestion.pattern;
            const pct = Math.round(suggestion.score * 100);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => dispatch({ type: "PICK_TARGET_HAND", patternId: p.id })}
                className="w-full rounded-xl border-2 border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#2D8B5E] hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded bg-[#2D8B5E]/15 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-[#2D8B5E]">
                      {CATEGORY_LABELS[p.category] ?? p.category}
                    </span>
                    <h3 className="mt-1 font-serif text-base font-black text-[var(--color-mid)]">
                      {p.name}
                    </h3>
                    <p className="mt-0.5 text-[13px] text-zinc-600">{p.description}</p>
                  </div>
                  <div className="ml-3 text-right">
                    <div className="text-lg font-black text-[#2D8B5E]">{pct}%</div>
                    <div className="text-[11px] font-bold text-zinc-500">fit</div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <code className="rounded bg-zinc-100 px-2 py-1 font-mono text-[12px] font-bold text-zinc-800">
                    {p.displayNotation}
                  </code>
                  <span className="text-[11px] font-bold text-zinc-600">
                    {p.exposure === "closed" ? "Concealed" : "Open"} &middot; {p.value} pts &middot;{" "}
                    {"*".repeat(p.difficulty)}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200">
                  <div
                    className="h-full rounded-full bg-[#2D8B5E] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── MAIN GAME PHASE ── */
  return (
    <div className="mx-auto max-w-[820px] px-4 py-4 sm:px-7">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <Link
          href="/"
          className="rounded-md px-2 py-1 text-sm font-bold text-[#2D8B5E] transition hover:underline"
        >
          &larr; Home
        </Link>
        <span className="text-[12px] font-black uppercase tracking-[3px] text-[#C8A951]">
          Practice Game
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[12px] font-black ${
              state.wall.length > 40
                ? "bg-[#2D8B5E]/15 text-[#2D8B5E]"
                : state.wall.length > 20
                  ? "bg-[#C8A951]/20 text-[#8B6914]"
                  : "animate-pulse bg-[#DC5044]/15 text-[#DC5044]"
            }`}
          >
            Wall: {state.wall.length}
            {state.wall.length <= 20 && state.wall.length > 0 && " · LOW"}
            {state.wall.length === 0 && " · EMPTY"}
          </span>
        </div>
      </div>

      {/* Target hand display */}
      {state.playerTargetHand && isPlaying && (
        <div className="mb-3 flex items-center gap-3 rounded-lg border border-[#2D8B5E]/30 bg-[#E8F5EC] px-3 py-2 shadow-sm">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#2D8B5E]">
                Target
              </span>
              <span className="rounded bg-[#2D8B5E]/15 px-1.5 py-0.5 text-[11px] font-black text-[#2D8B5E]">
                {CATEGORY_LABELS[state.playerTargetHand.category] ?? state.playerTargetHand.category}
              </span>
              <span className="text-[11px] font-bold text-zinc-700">
                {state.playerTargetHand.name}
              </span>
            </div>
            <code className="mt-0.5 block text-[13px] font-black text-[var(--color-mid)]">
              {state.playerTargetHand.displayNotation}
            </code>
            {state.playerProgress && (
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#2D8B5E]/20">
                  <div
                    className="h-full rounded-full bg-[#2D8B5E] transition-all duration-300"
                    style={{ width: `${Math.round(state.playerProgress.completion * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-black text-[#2D8B5E]">
                  {Math.round(state.playerProgress.completion * 100)}%
                </span>
              </div>
            )}
          </div>
          {state.phase === "player-discard" && (
            <button
              type="button"
              onClick={() => dispatch({ type: "CHANGE_TARGET_HAND" })}
              className="rounded bg-white px-2.5 py-1 text-[11px] font-black text-[#2D8B5E] shadow-sm transition hover:bg-[#2D8B5E] hover:text-white"
            >
              Change
            </button>
          )}
        </div>
      )}

      {/* Phase indicator — big and prominent */}
      <div className="mb-3 rounded-lg bg-white px-4 py-2 text-center shadow-sm">
        <span className="text-[11px] font-black uppercase tracking-[2px] text-zinc-500">
          {state.phase === "player-draw" && "Your Turn — Draw a Tile"}
          {state.phase === "player-discard" && "Your Turn — Select a Tile to Discard"}
          {state.phase === "bot-turn" &&
            `${state.bots[(state.currentTurn as number) - 1]?.name ?? "Bot"} is thinking\u2026`}
          {state.phase === "calling-window" && "Checking for calls\u2026"}
          {state.phase === "bot-call-announce" && "Call!"}
          {state.phase === "player-call-prompt" && "You Can Call!"}
          {state.phase === "round-over" && "Round Over"}
        </span>
      </div>

      {/* Status message — styling varies by importance */}
      {state.message && (() => {
        const isMahjong = state.message.toLowerCase().includes("mahjong");
        const isCall =
          state.message.toLowerCase().includes("call") ||
          state.message.toLowerCase().includes("pung") ||
          state.message.toLowerCase().includes("kong") ||
          state.message.toLowerCase().includes("quint");
        const isImportant = isMahjong || isCall;
        return (
          <div
            className={`mb-3 animate-fade-in rounded-lg border-l-4 px-4 shadow-sm ${
              isMahjong
                ? "border-[#C8A951] bg-gradient-to-r from-[#FFFBEA] to-white py-3 ring-1 ring-[#C8A951]/30"
                : isCall
                  ? "border-[#2D8B5E] bg-[#E8F5EC] py-3"
                  : "border-[#C8A951] bg-white py-2.5"
            }`}
            key={state.message + state.callingWindowId}
          >
            <p
              className={`font-bold text-zinc-800 ${
                isImportant ? "text-[15px] font-black" : "text-[14px]"
              }`}
            >
              {state.message}
            </p>
          </div>
        );
      })()}

      {/* Bot insight */}
      {state.botInsight && !isRoundOver && (
        <div
          className="mb-3 animate-fade-in rounded-lg border-l-4 border-[#2D8B5E] bg-[#E8F5EC] px-4 py-2 shadow-sm"
          key={state.botInsight}
        >
          <p className="text-[10px] font-black uppercase tracking-wider text-[#2D8B5E]">
            Table Read
          </p>
          <p className="text-[13px] font-medium text-zinc-800">{state.botInsight}</p>
        </div>
      )}

      {/* GAME TABLE — 3 bots + central discard pool + East (You) */}
      <div className="mb-3">
        <GameTable
          bots={state.bots}
          discardPile={state.discardPile}
          discardLog={state.discardLog}
          activeBotIndex={isBotActive ? state.currentTurn : null}
          callingWindow={
            state.phase === "calling-window" ||
            state.phase === "player-call-prompt" ||
            state.phase === "bot-call-announce"
          }
          playerActive={
            state.phase === "player-draw" ||
            state.phase === "player-discard" ||
            state.phase === "player-call-prompt"
          }
          playerHandSize={state.playerHand.length}
        />
      </div>

      {/* Call prompt */}
      {isCallingPrompt && state.lastDiscard && (
        <div className="mb-3">
          {state.playerTargetHand && (
            <div className="mb-2 rounded-lg bg-white px-3 py-2 text-center text-[13px] shadow-sm">
              {callFitsTarget(state.lastDiscard.tile, state.playerTargetHand) ? (
                <span className="font-bold text-[#2D8B5E]">
                  This tile fits your target hand!
                </span>
              ) : (
                <span className="font-bold text-[#8B6914]">
                  This tile doesn&apos;t match your target pattern.
                </span>
              )}
              {state.playerTargetHand.exposure === "closed" &&
                state.playerValidCalls.some((c) => c !== "mahjong") && (
                <span className="ml-1 font-bold text-[#DC5044]">
                  (Your target is concealed — calling would expose tiles!)
                </span>
              )}
            </div>
          )}
          <CallPrompt
            discardedTile={state.lastDiscard.tile}
            discardedBy={SEAT_NAMES[state.lastDiscard.by] ?? "Unknown"}
            validCalls={state.playerValidCalls}
            onCall={(callType) => {
              if (callType === "pung") dispatch({ type: "CALL_PUNG" });
              else if (callType === "kong") dispatch({ type: "CALL_KONG" });
              else if (callType === "quint") dispatch({ type: "CALL_QUINT" });
              else if (callType === "mahjong") dispatch({ type: "CALL_MAHJONG" });
            }}
            onPass={handlePass}
          />
        </div>
      )}

      {/* Player (East) area — hand + actions */}
      <div className="rounded-xl bg-gradient-to-b from-[#1A4D2E] to-[#0F3320] p-3 shadow-lg sm:p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[12px] font-black uppercase tracking-[2px] text-[#C8A951]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#C8A951] text-[9px] font-black text-[#0F3320]">
              E
            </span>
            Your Hand ({state.playerHand.length} tiles)
          </span>
          {state.playerExposedGroups.length > 0 && (
            <span className="text-[11px] font-bold text-emerald-200">
              {state.playerExposedGroups.length} exposed
            </span>
          )}
        </div>

        <PlayerHand
          hand={state.playerHand}
          selectedTileId={state.selectedTileId}
          drawnTile={state.drawnTile}
          disabled={state.phase !== "player-discard"}
          onSelect={(id) => dispatch({ type: "SELECT_TILE", tileId: id })}
          onReorder={(from, to) => dispatch({ type: "REORDER_HAND", fromIndex: from, toIndex: to })}
          exposedGroups={state.playerExposedGroups}
        />

        <p className="mt-1 text-center text-[10px] italic text-emerald-200/70">
          Drag tiles to rearrange &middot; tap to select
        </p>

        {/* Action buttons */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          {state.phase === "player-draw" && (
            <button
              type="button"
              onClick={() => dispatch({ type: "PLAYER_DRAW" })}
              className="animate-pulse rounded-xl bg-[#2D8B5E] px-6 py-2.5 text-sm font-black text-white shadow-lg ring-2 ring-[#2D8B5E]/50 transition hover:bg-[#247A50] active:scale-[0.98]"
            >
              Draw Tile
            </button>
          )}

          {state.canSelfDrawWin && state.phase === "player-discard" && (
            <button
              type="button"
              onClick={() => dispatch({ type: "DECLARE_SELF_DRAW_WIN" })}
              className="animate-pulse rounded-xl bg-[#C8A951] px-6 py-2.5 text-sm font-black text-[#0F3320] shadow-lg ring-2 ring-[#C8A951] ring-offset-2 ring-offset-[#1A4D2E] transition hover:bg-[#B89840] active:scale-[0.98]"
            >
              Mahjong!
            </button>
          )}

          {state.phase === "player-discard" && state.selectedTileId !== null && (
            <button
              type="button"
              onClick={() => dispatch({ type: "CONFIRM_DISCARD" })}
              className="rounded-xl bg-[#C8A951] px-6 py-2.5 text-sm font-black text-[#0F3320] shadow-lg transition hover:bg-[#B89840] active:scale-[0.98]"
            >
              Discard{" "}
              {(() => {
                const t = state.playerHand.find(
                  (t) => t.id === state.selectedTileId
                );
                return t ? tileLabel(t) : "";
              })()}
            </button>
          )}
        </div>

        {/* Joker swap buttons */}
        {state.availableJokerSwaps.length > 0 && state.phase === "player-discard" && (
          <div className="mt-3 rounded-lg bg-[#C8A951]/15 px-3 py-2">
            <p className="mb-1.5 text-center text-[11px] font-black uppercase tracking-wider text-[#C8A951]">
              Joker Swap Available
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {state.availableJokerSwaps.map((swap, i) => {
                const ownerName =
                  swap.groupOwner === 0
                    ? "your"
                    : state.bots[swap.groupOwner - 1].name + "'s";
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => dispatch({ type: "JOKER_SWAP", swap })}
                    className="rounded-lg border border-[#C8A951]/40 bg-[#0F3320] px-3 py-1.5 text-[12px] font-bold text-[#C8A951] transition hover:bg-[#1A4D2E] active:scale-[0.98]"
                  >
                    Swap {tileLabel(swap.naturalTile)} &rarr; {ownerName} group
                  </button>
                );
              })}
            </div>
            <p className="mt-1 text-center text-[11px] text-emerald-200">
              Trade a natural tile for a joker from an exposed group
            </p>
          </div>
        )}
      </div>

      {/* Round over */}
      {isRoundOver && (
        <div className="mt-6 animate-fade-in rounded-2xl bg-gradient-to-br from-[#1A4D2E] via-[#1F5A35] to-[#0F3320] p-6 text-center text-white shadow-lg">
          <h3 className="font-serif text-2xl font-black text-[#C8A951]">
            {state.winner === 0
              ? "You Win!"
              : state.winner !== null
                ? `${state.bots[state.winner - 1].name} Wins`
                : "Draw Game"}
          </h3>

          {state.completedPattern && (
            <div className="mt-2 inline-block rounded-lg bg-white/15 px-3 py-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#C8A951]">
                {CATEGORY_LABELS[state.completedPattern.category]}
              </span>
              <p className="font-mono text-sm font-bold text-white">
                {state.completedPattern.displayNotation}
              </p>
              <p className="text-[12px] text-emerald-200">
                {state.completedPattern.name} &mdash; {state.completedPattern.value} pts
              </p>
            </div>
          )}

          <p className="mt-2 text-[14px] text-emerald-100">
            {state.winner === 0 && state.winType === "discard"
              ? "You called Mahjong on a discard! The discarder pays 2\u00D7, others pay 1\u00D7."
              : state.winner === 0 && state.winType === "self-draw"
                ? "You self-drew Mahjong! All other players pay you 2\u00D7 the hand value."
                : state.winner !== null && state.winType === "self-draw"
                  ? `${state.bots[state.winner - 1].name} self-drew their winning tile. Everyone pays 2\u00D7!`
                  : state.winner !== null
                    ? "Better luck next time. Keep practicing!"
                    : "The wall ran out. Nobody won this round."}
          </p>

          {state.winner !== null && (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {state.bots.map((bot) => (
                bot.targetPattern && (
                  <div key={bot.seatWind} className="rounded-md bg-white/15 px-2 py-1 text-[12px]">
                    <span className="text-emerald-200">{bot.name}: </span>
                    <span className="font-bold text-white">
                      {CATEGORY_LABELS[bot.targetPattern.category]} &mdash; {bot.targetPattern.name}
                    </span>
                  </div>
                )
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {state.playerTargetHand && (
              <button
                type="button"
                onClick={() => dispatch({ type: "START_ROUND", preferredPattern: state.playerTargetHand! })}
                className="rounded-xl bg-[#C8A951] px-5 py-2.5 text-sm font-black text-[#0F3320] shadow-lg transition hover:bg-[#B89840] active:scale-[0.98]"
              >
                Same Pattern
              </button>
            )}
            <button
              type="button"
              onClick={() => dispatch({ type: "START_ROUND" })}
              className="rounded-xl border-2 border-[#C8A951] px-5 py-2.5 text-sm font-black text-[#C8A951] transition hover:bg-[#C8A951]/15 active:scale-[0.98]"
            >
              New Hand
            </button>
            <Link
              href="/"
              className="rounded-xl border-2 border-white/40 px-5 py-2.5 text-sm font-black text-white transition hover:bg-white/10"
            >
              Back to Modules
            </Link>
          </div>
        </div>
      )}

      {/* Turn counter */}
      <div className="mt-3 text-center text-[11px] font-bold text-zinc-500">
        Turn {state.turnCount}
      </div>
    </div>
  );
}
