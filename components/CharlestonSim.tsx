"use client";

import { useCallback, useState } from "react";
import { Tile } from "@/components/Tile";
import { Callout } from "@/components/Callout";
import {
  buildDeck,
  shuffle,
  deal,
  sortHand,
  tileLabel,
  type TileData,
} from "@/lib/tiles";
import { analyzeHand, ratePass } from "@/lib/handAnalysis";

/* ────────────────────────────────────────────────────────────────
 * Pass definitions — the 7-pass Charleston + courtesy
 * ──────────────────────────────────────────────────────────────── */

type PassDef = {
  num: number;
  name: string;
  direction: string;
  isSecondCharleston: boolean;
};

const PASSES: PassDef[] = [
  { num: 1, name: "First Right", direction: "→ Right", isSecondCharleston: false },
  { num: 2, name: "First Across", direction: "↑ Across", isSecondCharleston: false },
  { num: 3, name: "First Left", direction: "← Left", isSecondCharleston: false },
  { num: 4, name: "Second Left", direction: "← Left", isSecondCharleston: true },
  { num: 5, name: "Second Across", direction: "↑ Across", isSecondCharleston: true },
  { num: 6, name: "Second Right", direction: "→ Right", isSecondCharleston: true },
];

/* ────────────────────────────────────────────────────────────────
 * State machine
 * ──────────────────────────────────────────────────────────────── */

type Phase =
  | "intro"
  | "picking"     // user selecting 3 tiles to pass
  | "received"    // showing what came back
  | "stop-check"  // after pass 3: continue second Charleston?
  | "courtesy"    // courtesy pass negotiation
  | "complete";

type SimState = {
  phase: Phase;
  hand: TileData[];
  /** Tiles selected for passing (by id) */
  selected: Set<number>;
  /** Current pass index (0–5 for the 6 passes) */
  passIndex: number;
  /** The 3 tiles just received (shown during "received" phase) */
  justReceived: TileData[];
  /** The pool of tiles the AI "opponents" draw from */
  pool: TileData[];
  /** Snapshot of the starting hand for the before/after comparison */
  startingHand: TileData[];
  /** Number of courtesy tiles agreed upon */
  courtesyCount: number;
  /** Whether second Charleston was skipped */
  skippedSecond: boolean;
  /** Feedback from the last pass */
  lastRating: { rating: "great" | "good" | "risky"; feedback: string; suggestion: string | null } | null;
  /** Patterns from before the last pass (for highlighting changes) */
  previousPatterns: string[];
};

/** Draw n tiles from the pool, skipping jokers (can't be passed in Charleston). */
function dealNoJokers(pool: TileData[], n: number): TileData[] {
  const result: TileData[] = [];
  let i = 0;
  while (result.length < n && i < pool.length) {
    if (pool[i].type !== "joker") {
      result.push(pool.splice(i, 1)[0]);
    } else {
      i++;
    }
  }
  return result;
}

function initState(initialHand?: TileData[], initialPool?: TileData[]): SimState {
  if (initialHand && initialPool) {
    // Embedded mode: use provided hand and pool
    // East has 14 tiles after deal but Charleston uses 13 (extra tile goes back)
    const hand = initialHand.length === 14
      ? sortHand(initialHand.slice(0, 13))
      : sortHand(initialHand);
    const pool = initialHand.length === 14
      ? [...initialPool, initialHand[13]]
      : [...initialPool];
    return {
      phase: "picking", // skip intro in embedded mode
      hand,
      selected: new Set(),
      passIndex: 0,
      justReceived: [],
      pool,
      startingHand: [...hand],
      courtesyCount: 0,
      skippedSecond: false,
      lastRating: null,
      previousPatterns: [],
    };
  }
  // Standalone mode: deal fresh
  const deck = shuffle(buildDeck());
  const hand = sortHand(deal(deck, 13));
  return {
    phase: "intro",
    hand,
    selected: new Set(),
    passIndex: 0,
    justReceived: [],
    pool: deck,
    startingHand: [...hand],
    courtesyCount: 0,
    skippedSecond: false,
    lastRating: null,
    previousPatterns: [],
  };
}

/* ────────────────────────────────────────────────────────────────
 * The component
 * ──────────────────────────────────────────────────────────────── */

type CharlestonSimProps = {
  /** "standalone" = self-contained with own deck; "embedded" = receives hand from game */
  mode?: "standalone" | "embedded";
  /** Pre-dealt hand (embedded mode) */
  initialHand?: TileData[];
  /** Remaining wall tiles (embedded mode) */
  initialPool?: TileData[];
  /** Called when Charleston completes (embedded mode) */
  onComplete?: (finalHand: TileData[], updatedPool: TileData[]) => void;
};

export function CharlestonSim({
  mode = "standalone",
  initialHand,
  initialPool,
  onComplete,
}: CharlestonSimProps = {}) {
  const [s, setS] = useState<SimState>(() =>
    initState(
      mode === "embedded" ? initialHand : undefined,
      mode === "embedded" ? initialPool : undefined,
    )
  );

  const restart = useCallback(() => setS(initState()), []);

  // Toggle tile selection
  const toggleTile = useCallback(
    (id: number) => {
      if (s.phase !== "picking" && s.phase !== "courtesy") return;
      // Never allow selecting a Joker
      const tile = s.hand.find((t) => t.id === id);
      if (tile?.type === "joker") return;

      const maxSel = s.phase === "courtesy" ? s.courtesyCount : 3;

      setS((prev) => {
        const next = new Set(prev.selected);
        if (next.has(id)) {
          next.delete(id);
        } else if (next.size < maxSel) {
          next.add(id);
        }
        return { ...prev, selected: next };
      });
    },
    [s.phase, s.hand, s.courtesyCount],
  );

  // Confirm the pass: remove selected tiles, receive 3 from pool
  const confirmPass = useCallback(() => {
    setS((prev) => {
      // Capture current patterns before the pass
      const beforePatterns = analyzeHand(prev.hand).patterns;

      // Rate the pass before making it
      const rating = ratePass(prev.hand, prev.selected);

      const passed = prev.hand.filter((t) => prev.selected.has(t.id));
      const kept = prev.hand.filter((t) => !prev.selected.has(t.id));
      const poolCopy = [...prev.pool];
      const received = dealNoJokers(poolCopy, 3);
      poolCopy.push(...passed);
      const newHand = sortHand([...kept, ...received]);
      return {
        ...prev,
        hand: newHand,
        pool: poolCopy,
        selected: new Set(),
        justReceived: received,
        phase: "received",
        lastRating: rating,
        previousPatterns: beforePatterns,
      };
    });
  }, []);

  // After seeing received tiles, advance to next pass or transition
  const nextPass = useCallback(() => {
    setS((prev) => {
      const nextIndex = prev.passIndex + 1;
      // After pass 3 (index 2), ask about second Charleston
      if (nextIndex === 3) {
        return { ...prev, phase: "stop-check", justReceived: [] };
      }
      // After pass 6 (index 5), go to courtesy
      if (nextIndex >= 6) {
        return { ...prev, phase: "courtesy", justReceived: [], passIndex: nextIndex };
      }
      return { ...prev, phase: "picking", passIndex: nextIndex, justReceived: [] };
    });
  }, []);

  // Continue or stop second Charleston
  const decideSecond = useCallback((continueIt: boolean) => {
    setS((prev) => {
      if (continueIt) {
        return { ...prev, phase: "picking", passIndex: 3, justReceived: [] };
      }
      return { ...prev, phase: "courtesy", skippedSecond: true, justReceived: [] };
    });
  }, []);

  // Courtesy pass
  const setCourtesyCount = useCallback((n: number) => {
    setS((prev) => ({ ...prev, courtesyCount: n }));
  }, []);

  const executeCourtesy = useCallback(() => {
    setS((prev) => {
      if (prev.courtesyCount === 0) {
        return { ...prev, phase: "complete" };
      }
      // Take the first N selected (or random if none selected)
      const count = prev.courtesyCount;
      let toPass: TileData[];
      const selectedArr = prev.hand.filter((t) => prev.selected.has(t.id));
      if (selectedArr.length === count) {
        toPass = selectedArr;
      } else {
        // Auto-select: take last N non-joker tiles
        const nonJokers = prev.hand.filter((t) => t.type !== "joker");
        toPass = nonJokers.slice(-count);
      }
      const passIds = new Set(toPass.map((t) => t.id));
      const kept = prev.hand.filter((t) => !passIds.has(t.id));
      const poolCopy = [...prev.pool];
      const received = dealNoJokers(poolCopy, count);
      poolCopy.push(...toPass);
      return {
        ...prev,
        hand: sortHand([...kept, ...received]),
        pool: poolCopy,
        selected: new Set(),
        justReceived: received,
        phase: "complete",
      };
    });
  }, []);

  const startPicking = useCallback(() => {
    setS((prev) => ({ ...prev, phase: "picking" }));
  }, []);

  // ── Derived values ──
  const currentPass: PassDef | undefined = PASSES[s.passIndex];
  const canConfirm = s.selected.size === 3;
  const courtesyCanConfirm =
    s.courtesyCount === 0 || s.selected.size === s.courtesyCount;

  return (
    <div className="my-6 rounded-xl border-2 border-[var(--color-accent)] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] sm:p-8">
      {/* ── INTRO ── */}
      {s.phase === "intro" && (
        <div className="text-center">
          <h3 className="mb-3 font-serif text-xl font-black text-[var(--color-mid)]">
            🔄 Charleston Simulator
          </h3>
          <p className="mb-5 text-sm text-zinc-600">
            Walk through a full Charleston — pick 3 tiles to pass each round
            and see what comes back.
          </p>
          <button
            type="button"
            onClick={startPicking}
            className="rounded-md bg-[var(--color-accent)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Start Charleston →
          </button>
        </div>
      )}

      {/* ── PICKING ── */}
      {s.phase === "picking" && currentPass && (
        <>
          <Header
            title={`Pass ${currentPass.num}: ${currentPass.name}`}
            subtitle={`Select 3 tiles to pass ${currentPass.direction}`}
            badge={currentPass.isSecondCharleston ? "2nd Charleston" : "1st Charleston"}
          />

          {/* Warn if hand has very few expendable tiles */}
          <NothingToPassHint hand={s.hand} />

          {/* Blind pass tip for last pass of each Charleston */}
          {(s.passIndex === 2 || s.passIndex === 5) && (
            <Callout variant="tip">
              This is the <strong>last pass</strong> of the{" "}
              {s.passIndex === 2 ? "first" : "second"} Charleston. At a real table,
              you can do a <strong>blind pass</strong> — pass your 3 tiles left
              before looking at what arrives from the right. This lets you pass junk
              without accidentally seeing something good you&apos;d want to keep!
            </Callout>
          )}

          {/* Hand pattern hints — previews hand after passing selected tiles */}
          <HandPatternHints hand={s.hand} excludeIds={s.selected} />

          <TileGrid
            hand={s.hand}
            selected={s.selected}
            onToggle={toggleTile}
            interactive
          />
          <p className="mt-2 text-center text-[12px] text-zinc-500">
            {s.selected.size}/3 selected
            {s.selected.size > 0 && (
              <>
                {" — "}
                {s.hand
                  .filter((t) => s.selected.has(t.id))
                  .map((t) => tileLabel(t))
                  .join(", ")}
              </>
            )}
          </p>
          {s.hand.some((t) => t.type === "joker") && (
            <p className="mt-1 text-center text-[13px] font-bold text-[var(--color-red)]">
              Jokers cannot be passed — they&apos;re disabled.
            </p>
          )}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={confirmPass}
              disabled={!canConfirm}
              className="rounded-md bg-[var(--color-mid)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              Pass {currentPass.direction} →
            </button>
          </div>
        </>
      )}

      {/* ── RECEIVED ── */}
      {s.phase === "received" && (
        <>
          <Header
            title={`Pass ${PASSES[s.passIndex].num} complete`}
            subtitle="Here's what you received back:"
          />

          {/* Pass rating feedback */}
          {s.lastRating && (
            <PassFeedback rating={s.lastRating} />
          )}

          <div className="my-4 rounded-lg border-2 border-dashed border-[var(--color-green)] bg-[#F4FBF6] p-4">
            <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-wider text-[var(--color-green)]">
              3 tiles received
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              {s.justReceived.map((t) => (
                <div key={t.id} className="rounded-md ring-2 ring-[var(--color-green)] ring-offset-2">
                  <Tile type={t.type} value={t.value} size="sm" showLabel />
                </div>
              ))}
            </div>
          </div>
          <p className="mb-1 text-center text-[13px] font-bold uppercase tracking-wider text-zinc-500">
            Your updated hand
          </p>
          <TileGrid hand={s.hand} selected={new Set()} interactive={false} />

          {/* Hand pattern hints — highlights new patterns from received tiles */}
          <HandPatternHints hand={s.hand} previousPatterns={s.previousPatterns} />
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={nextPass}
              className="rounded-md bg-[var(--color-mid)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              {s.passIndex < 2
                ? "Next pass →"
                : s.passIndex >= 5
                  ? "Courtesy pass →"
                  : "Continue →"}
            </button>
          </div>
        </>
      )}

      {/* ── STOP CHECK (after first Charleston) ── */}
      {s.phase === "stop-check" && (
        <>
          <Header
            title="First Charleston complete!"
            subtitle="The second Charleston is optional. Any player can stop it."
          />
          <TileGrid hand={s.hand} selected={new Set()} interactive={false} />
          <Callout variant="tip">
            If your hand is already shaping up nicely, stopping here is a smart
            move. If you still have junk to dump, continue.
          </Callout>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => decideSecond(true)}
              className="rounded-md bg-[var(--color-mid)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              Continue (2nd Charleston) →
            </button>
            <button
              type="button"
              onClick={() => decideSecond(false)}
              className="rounded-md border-2 border-[var(--color-mid)] bg-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-[var(--color-mid)] transition hover:-translate-y-0.5"
            >
              Stop here
            </button>
          </div>
        </>
      )}

      {/* ── COURTESY ── */}
      {s.phase === "courtesy" && (
        <>
          <Header
            title="Courtesy pass"
            subtitle="Trade 0–3 tiles with the player across. Both must agree on the count."
          />
          <div className="my-4 flex items-center justify-center gap-3">
            {[0, 1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setCourtesyCount(n);
                  setS((prev) => ({ ...prev, selected: new Set() }));
                }}
                className={`h-12 w-12 rounded-full font-serif text-lg font-black transition ${
                  s.courtesyCount === n
                    ? "bg-[var(--color-mid)] text-white scale-110"
                    : "border-2 border-zinc-300 bg-white text-zinc-500 hover:border-[var(--color-mid)]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          {s.courtesyCount > 0 && (
            <>
              <p className="mb-2 text-center text-[12px] text-zinc-600">
                Select <strong>{s.courtesyCount}</strong>{" "}tile
                {s.courtesyCount > 1 ? "s" : ""} to send across.
              </p>
              <TileGrid
                hand={s.hand}
                selected={s.selected}
                onToggle={toggleTile}
                interactive
                maxSelect={s.courtesyCount}
              />
              <p className="mt-2 text-center text-[12px] text-zinc-500">
                {s.selected.size}/{s.courtesyCount} selected
              </p>
            </>
          )}
          {s.courtesyCount === 0 && (
            <p className="text-center text-sm italic text-zinc-500">
              &quot;Zero&quot; is a perfectly fine answer.
            </p>
          )}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={executeCourtesy}
              disabled={!courtesyCanConfirm}
              className="rounded-md bg-[var(--color-mid)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {s.courtesyCount === 0 ? "Skip courtesy → Done" : "Trade across → Done"}
            </button>
          </div>
        </>
      )}

      {/* ── COMPLETE ── */}
      {s.phase === "complete" && mode === "embedded" && onComplete && (
        <>
          <div className="text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
              Charleston complete
            </p>
            <h3 className="mb-3 font-serif text-xl font-black text-[var(--color-mid)]">
              Your hand is ready!
            </h3>
          </div>
          <TileGrid hand={s.hand} selected={new Set()} interactive={false} />
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => onComplete(s.hand, s.pool)}
              className="rounded-md bg-[var(--color-mid)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              Pick a hand →
            </button>
          </div>
        </>
      )}

      {s.phase === "complete" && mode !== "embedded" && (
        <>
          <div className="text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
              Charleston complete
            </p>
            <h3 className="mb-4 font-serif text-2xl font-black text-[var(--color-mid)]">
              Your hand is ready for play!
            </h3>
          </div>

          {/* Before / After comparison */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-wider text-zinc-500">
                Before Charleston
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {sortHand(s.startingHand).map((t) => (
                  <Tile key={t.id} type={t.type} value={t.value} size="sm" />
                ))}
              </div>
            </div>
            <div className="rounded-lg border-2 border-[var(--color-green)] bg-[#F4FBF6] p-3">
              <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-wider text-[var(--color-green)]">
                After Charleston
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {s.hand.map((t) => (
                  <Tile key={t.id} type={t.type} value={t.value} size="sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 text-center text-[13px] text-zinc-600">
            <HandStats before={s.startingHand} after={s.hand} />
          </div>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={restart}
              className="rounded-md bg-[var(--color-mid)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              Deal again →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Sub-components
 * ──────────────────────────────────────────────────────────────── */

function Header({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <div className="mb-4">
      {badge && (
        <span className="mb-1 inline-block rounded bg-[var(--color-mid)] px-2 py-0.5 text-[13px] font-black uppercase tracking-wider text-white">
          {badge}
        </span>
      )}
      <h3 className="font-serif text-xl font-black text-[var(--color-mid)]">{title}</h3>
      <p className="text-sm text-zinc-600">{subtitle}</p>
    </div>
  );
}

function TileGrid({
  hand,
  selected,
  onToggle,
  interactive,
  maxSelect = 3,
}: {
  hand: TileData[];
  selected: Set<number>;
  onToggle?: (id: number) => void;
  interactive: boolean;
  maxSelect?: number;
}) {
  return (
    <div className="my-3 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-light)] p-4">
      <div className="flex flex-wrap items-end justify-center gap-1 sm:gap-2">
        {hand.map((t) => {
          const isSel = selected.has(t.id);
          const isJoker = t.type === "joker";
          const atMax = selected.size >= maxSelect && !isSel;
          const disabled = !interactive || (isJoker && interactive) || atMax;
          let ring = "";
          if (isSel) ring = "ring-3 ring-[var(--color-red)] ring-offset-2 ring-offset-[var(--color-light)]";
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onToggle?.(t.id)}
              disabled={disabled}
              className={`rounded-md transition ${ring} ${
                interactive && !disabled ? "hover:-translate-y-1 cursor-pointer" : ""
              } ${isJoker && interactive ? "opacity-60 cursor-not-allowed" : ""} ${
                !interactive ? "cursor-default" : ""
              }`}
              aria-label={tileLabel(t)}
            >
              <Tile type={t.type} value={t.value} size="sm" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Simple stat comparison for the completion screen. */
function HandStats({ before, after }: { before: TileData[]; after: TileData[] }) {
  const suitCount = (hand: TileData[]) => {
    const counts: Record<string, number> = {};
    for (const t of hand) {
      if (t.type === "bam" || t.type === "crack" || t.type === "dot") {
        counts[t.type] = (counts[t.type] ?? 0) + 1;
      }
    }
    return counts;
  };

  const jokerCount = (hand: TileData[]) => hand.filter((t) => t.type === "joker").length;

  const pairCount = (hand: TileData[]) => {
    const key = (t: TileData) => `${t.type}-${t.value ?? ""}`;
    const counts: Record<string, number> = {};
    for (const t of hand) {
      const k = key(t);
      counts[k] = (counts[k] ?? 0) + 1;
    }
    return Object.values(counts).filter((c) => c >= 2).length;
  };

  const bSuits = suitCount(before);
  const aSuits = suitCount(after);
  const bestSuitBefore = Object.entries(bSuits).sort((a, b) => b[1] - a[1])[0];
  const bestSuitAfter = Object.entries(aSuits).sort((a, b) => b[1] - a[1])[0];

  const bJokers = jokerCount(before);
  const aJokers = jokerCount(after);
  const bPairs = pairCount(before);
  const aPairs = pairCount(after);

  return (
    <div className="mt-2 grid grid-cols-3 gap-3 text-center">
      <div>
        <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
          Best suit
        </div>
        <div className="font-serif text-base font-black text-[var(--color-mid)]">
          {bestSuitAfter
            ? `${bestSuitAfter[1]} ${bestSuitAfter[0]}s`
            : "—"}
        </div>
        {bestSuitBefore && (
          <div className="text-[13px] text-zinc-400">
            was {bestSuitBefore[1]} {bestSuitBefore[0]}s
          </div>
        )}
      </div>
      <div>
        <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
          Jokers
        </div>
        <div className="font-serif text-base font-black text-[var(--color-mid)]">
          {aJokers}
        </div>
        <div className="text-[13px] text-zinc-400">was {bJokers}</div>
      </div>
      <div>
        <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
          Pairs+
        </div>
        <div className="font-serif text-base font-black text-[var(--color-mid)]">
          {aPairs}
        </div>
        <div className="text-[13px] text-zinc-400">was {bPairs}</div>
      </div>
    </div>
  );
}

/** Shows pass quality feedback */
function PassFeedback({
  rating,
}: {
  rating: { rating: "great" | "good" | "risky"; feedback: string; suggestion: string | null };
}) {
  const colors = {
    great: "border-[var(--color-green)] bg-[#F4FBF6] text-[var(--color-green)]",
    good: "border-[var(--color-accent)] bg-[#E8F5EC] text-[var(--color-accent)]",
    risky: "border-[var(--color-red)] bg-[#FFF6F4] text-[var(--color-red)]",
  };
  const icons = { great: "Nice!", good: "OK", risky: "Hmm..." };

  return (
    <div className={`my-3 rounded-lg border-l-4 p-3 ${colors[rating.rating]}`}>
      <p className="text-[13px] font-bold">
        {icons[rating.rating]} {rating.feedback}
      </p>
      {rating.suggestion && (
        <p className="mt-1 text-[12px] opacity-80">{rating.suggestion}</p>
      )}
    </div>
  );
}

/**
 * Warns when the player's hand has very few expendable tiles.
 * This is a common beginner frustration — "everything looks useful!"
 */
function NothingToPassHint({ hand }: { hand: TileData[] }) {
  const analysis = analyzeHand(hand);
  const bestSuit = analysis.bestSuit?.suit;

  // Count tiles that are clearly expendable
  let expendableCount = 0;
  const keyCounts: Record<string, number> = {};
  for (const t of hand) {
    const k = `${t.type}-${t.value ?? ""}`;
    keyCounts[k] = (keyCounts[k] ?? 0) + 1;
  }

  for (const t of hand) {
    if (t.type === "joker" || t.type === "flower" || t.type === "season") continue;
    const k = `${t.type}-${t.value ?? ""}`;
    const count = keyCounts[k] ?? 1;
    const isSuited = t.type === "bam" || t.type === "crack" || t.type === "dot";
    const isOffSuit = isSuited && t.type !== bestSuit;
    const isIsolatedHonor = (t.type === "wind" || t.type === "dragon") && count === 1;
    if ((isOffSuit && count === 1) || isIsolatedHonor) expendableCount++;
  }

  if (expendableCount >= 3) return null;

  return (
    <Callout variant="info">
      <strong>Tough hand to pass from!</strong> You don&apos;t have many obvious
      throwaway tiles. When this happens at the table, consider passing your{" "}
      <em>least useful</em> pairs (you only need one pair for your final hand) or
      tiles from your second-best suit. Don&apos;t agonize — even experienced
      players sometimes have to pass decent tiles.
    </Callout>
  );
}

/** Shows detected hand patterns as hints, with optional "after passing" preview */
function HandPatternHints({
  hand,
  excludeIds,
  previousPatterns,
}: {
  hand: TileData[];
  /** Tile IDs being passed — show hints for the hand without these */
  excludeIds?: Set<number>;
  /** Patterns from the previous state, to highlight what changed */
  previousPatterns?: string[];
}) {
  const effectiveHand =
    excludeIds && excludeIds.size > 0
      ? hand.filter((t) => !excludeIds.has(t.id))
      : hand;
  const analysis = analyzeHand(effectiveHand);
  if (analysis.patterns.length === 0) return null;

  const isPreview = excludeIds && excludeIds.size > 0;
  const prevSet = new Set(previousPatterns ?? []);
  const newPatterns = previousPatterns
    ? analysis.patterns.filter((p) => !prevSet.has(p))
    : [];
  const hasNewPatterns = newPatterns.length > 0;

  return (
    <div
      className={`my-3 rounded-lg border border-dashed px-3 py-2 transition-all ${
        isPreview
          ? "border-[#C8A951] bg-[#F5E6B8]/20"
          : hasNewPatterns
            ? "border-[var(--color-green)] bg-[#E8F5EC]"
            : "border-[var(--color-accent)] bg-[#E8F5EC]"
      }`}
    >
      <p
        className={`mb-1 text-[13px] font-bold uppercase tracking-wider ${
          isPreview
            ? "text-[#C8A951]"
            : hasNewPatterns
              ? "text-[var(--color-green)]"
              : "text-[var(--color-accent)]"
        }`}
      >
        {isPreview ? "After this pass" : hasNewPatterns ? "Updated hints" : "Hand hints"}
      </p>
      <ul className="space-y-0.5 text-[12px] text-zinc-600">
        {analysis.patterns.map((p, i) => {
          const isNew = previousPatterns && !prevSet.has(p);
          return (
            <li key={i} className={isNew ? "font-bold text-[var(--color-green)]" : ""}>
              {isNew ? "NEW " : ""}• {p}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
