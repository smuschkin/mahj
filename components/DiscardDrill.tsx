"use client";

import { useCallback, useEffect, useState } from "react";
import { Tile } from "./Tile";

/* ───── Types ───── */

type Suit = "bam" | "crack" | "dot";
type TileSpec =
  | { type: Suit; value: number }
  | { type: "wind"; value: "N" | "E" | "W" | "S" }
  | { type: "dragon"; value: "red" | "green" | "white" }
  | { type: "flower"; value: number }
  | { type: "joker" };

type Scenario = {
  handHint: string;
  tiles: TileSpec[];
  /** Indices of ALL acceptable discards (any of these counts as correct) */
  goodDiscards: number[];
  /** The single "best" discard index — highlighted green even if others are acceptable */
  bestDiscard: number;
  /** Why these tiles should go */
  explanation: string;
  /** Beginner tip shown after every answer */
  tip: string;
};

/* ───── Scenarios ───── */

const SCENARIOS: Scenario[] = [
  {
    handHint: "You're working toward Even Bams (pairs + pungs of 2-4-6-8 Bam) or a Dragons hand",
    tiles: [
      { type: "bam", value: 2 }, { type: "bam", value: 2 },
      { type: "bam", value: 4 }, { type: "bam", value: 4 },
      { type: "bam", value: 6 }, { type: "bam", value: 6 },
      { type: "bam", value: 8 }, { type: "bam", value: 8 },
      { type: "dragon", value: "green" }, { type: "dragon", value: "green" },
      { type: "dragon", value: "red" },
      { type: "joker" },
      { type: "crack", value: 5 },
      { type: "wind", value: "N" },
    ],
    goodDiscards: [12, 13], // 5 Crak or North Wind
    bestDiscard: 12, // 5 Crak
    explanation:
      "The 5 Crak and North Wind both fit neither candidate hand — either one is a good discard. The 5 Crak is slightly better to dump first because middle-suit tiles are more useful to opponents.",
    tip: "Look for tiles that don't fit ANY of your candidate hands. Those go first.",
  },
  {
    handHint: "Going for Consecutive Bams (pungs of 3-4-5 Bam + flowers)",
    tiles: [
      { type: "bam", value: 3 }, { type: "bam", value: 3 }, { type: "bam", value: 3 },
      { type: "bam", value: 4 }, { type: "bam", value: 4 },
      { type: "bam", value: 5 }, { type: "bam", value: 5 }, { type: "bam", value: 5 },
      { type: "flower", value: 1 }, { type: "flower", value: 3 },
      { type: "joker" },
      { type: "dot", value: 9 },
      { type: "wind", value: "E" },
      { type: "crack", value: 1 },
    ],
    goodDiscards: [11, 12, 13], // 9 Dot, East Wind, 1 Crak
    bestDiscard: 11, // 9 Dot
    explanation:
      "The 9 Dot, East Wind, and 1 Crak all fit nothing in a Consecutive Bams hand. Any of them is a good discard. The 9 Dot is slightly riskier to hold since it's a suited tile opponents may want.",
    tip: "When multiple tiles are equally useless, dump suited tiles before honors — they're more dangerous to hold.",
  },
  {
    handHint: "Going for Winds & Dragons (pungs of winds + pair of dragons) or Like 7s (pungs of 7s across 3 suits)",
    tiles: [
      { type: "wind", value: "N" }, { type: "wind", value: "N" },
      { type: "wind", value: "S" }, { type: "wind", value: "S" },
      { type: "dragon", value: "red" }, { type: "dragon", value: "red" },
      { type: "crack", value: 7 }, { type: "crack", value: 7 },
      { type: "bam", value: 7 }, { type: "bam", value: 7 },
      { type: "dot", value: 7 },
      { type: "joker" },
      { type: "dot", value: 2 },
      { type: "bam", value: 9 },
    ],
    goodDiscards: [12, 13], // 2 Dot, 9 Bam
    bestDiscard: 12, // 2 Dot
    explanation:
      "The 2 Dot and 9 Bam fit neither candidate hand. Both are good discards. Everything else — the winds, dragons, 7s, and joker — could be useful.",
    tip: "Before discarding, ask: does this tile fit ANY of my candidate hands? If not, it can go.",
  },
  {
    handHint: "Going for 2468 Craks (kongs of even Craks + pair of flowers)",
    tiles: [
      { type: "crack", value: 2 }, { type: "crack", value: 2 }, { type: "crack", value: 2 },
      { type: "crack", value: 4 }, { type: "crack", value: 4 }, { type: "crack", value: 4 },
      { type: "crack", value: 6 }, { type: "crack", value: 6 },
      { type: "crack", value: 8 },
      { type: "flower", value: 2 }, { type: "flower", value: 4 },
      { type: "joker" },
      { type: "bam", value: 3 },
      { type: "wind", value: "W" },
    ],
    goodDiscards: [12, 13], // 3 Bam, West Wind
    bestDiscard: 12, // 3 Bam
    explanation:
      "The 3 Bam and West Wind both fit nothing in a 2468 Craks hand. Either is a good discard. The 3 Bam is a middle-suit tile that's more likely to help an opponent, so dump it first.",
    tip: "Odd-numbered tiles are useless for a 2468 hand. Wrong-suit tiles are useless too. Both can go.",
  },
  {
    handHint: "Going for 369 Dots (pungs of 3-6-9 Dot) or Quint of 3 Dots + pairs",
    tiles: [
      { type: "dot", value: 3 }, { type: "dot", value: 3 }, { type: "dot", value: 3 },
      { type: "dot", value: 6 }, { type: "dot", value: 6 },
      { type: "dot", value: 9 }, { type: "dot", value: 9 },
      { type: "flower", value: 1 },
      { type: "joker" }, { type: "joker" },
      { type: "crack", value: 7 },
      { type: "bam", value: 1 },
      { type: "wind", value: "S" },
      { type: "dragon", value: "white" },
    ],
    goodDiscards: [10, 11, 12, 13], // 7 Crak, 1 Bam, South, Soap
    bestDiscard: 10, // 7 Crak
    explanation:
      "The 7 Crak, 1 Bam, South Wind, and Soap all fit nothing in a 369 Dots hand. Any of them is correct! Dump suited tiles first since they're more dangerous to hold.",
    tip: "When you have 4 junk tiles and only need to discard 1, pick the one most likely to help an opponent.",
  },
  {
    handHint: "Going for Year Hand 2026 (needs 2s, Soaps (0), and 6s)",
    tiles: [
      { type: "bam", value: 2 }, { type: "bam", value: 2 },
      { type: "crack", value: 2 }, { type: "crack", value: 2 },
      { type: "dragon", value: "white" }, { type: "dragon", value: "white" },
      { type: "dot", value: 6 }, { type: "dot", value: 6 },
      { type: "bam", value: 6 },
      { type: "joker" },
      { type: "flower", value: 2 },
      { type: "crack", value: 8 },
      { type: "wind", value: "N" },
      { type: "bam", value: 5 },
    ],
    goodDiscards: [11, 12, 13], // 8 Crak, North Wind, 5 Bam
    bestDiscard: 13, // 5 Bam
    explanation:
      "The 8 Crak, North Wind, and 5 Bam don't match any digit in 2026 (which needs 2s, 0s, and 6s). Any of the three is a fine discard.",
    tip: "For a year hand, check each tile: is this number one of the year's digits? If not, it can go.",
  },
];

const ROUND_COUNT = 5;
const PASS_THRESHOLD = 3;

/* ───── Helpers ───── */

function nameOf(t: TileSpec): string {
  switch (t.type) {
    case "bam": return `${t.value} Bam`;
    case "crack": return `${t.value} Crak`;
    case "dot": return `${t.value} Dot`;
    case "wind": return ({ N: "North", E: "East", W: "West", S: "South" } as const)[t.value];
    case "dragon":
      return t.value === "red" ? "Red Dragon" : t.value === "green" ? "Green Dragon" : "Soap";
    case "flower": return "Flower";
    case "joker": return "Joker";
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickScenarios(n: number): Scenario[] {
  return shuffle(SCENARIOS).slice(0, n);
}

/* ───── Component ───── */

type Phase = "intro" | "playing" | "complete";

export function DiscardDrill() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  function start() {
    setScenarios(pickScenarios(ROUND_COUNT));
    setIndex(0);
    setScore(0);
    setPicked(null);
    setPhase("playing");
  }

  const answer = useCallback(
    (tileIndex: number) => {
      if (picked !== null) return;
      setPicked(tileIndex);
      const isGood = scenarios[index].goodDiscards.includes(tileIndex);
      if (isGood) setScore((s) => s + 1);
    },
    [picked, scenarios, index]
  );

  function next() {
    if (index + 1 >= ROUND_COUNT) {
      setPhase("complete");
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  }

  // Keyboard support
  useEffect(() => {
    if (phase !== "playing" || picked !== null) return;
    function handler(e: KeyboardEvent) {
      const map: Record<string, number> = {
        "1": 0, "2": 1, "3": 2, "4": 3, "5": 4,
        "6": 5, "7": 6, "8": 7, "9": 8, "0": 9,
        q: 10, w: 11, e: 12, r: 13,
      };
      const idx = map[e.key.toLowerCase()];
      if (idx !== undefined && idx < (scenarios[index]?.tiles.length ?? 0)) {
        e.preventDefault();
        answer(idx);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, picked, answer, scenarios, index]);

  /* ── INTRO ── */
  if (phase === "intro") {
    return (
      <DrillShell>
        <div className="text-center">
          <h3 className="mb-3 font-serif text-xl font-black">
            🤔 What Would You Discard?
          </h3>
          <p className="mb-2 text-sm text-zinc-300">
            {ROUND_COUNT}{" "}hands with 14 tiles each and a target hand.
            Tap the tile you&apos;d throw away.
          </p>
          <p className="mb-5 text-xs text-zinc-400">
            Most hands have more than one good answer — we&apos;ll accept
            any reasonable discard.
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[var(--color-accent)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Start →
          </button>
        </div>
      </DrillShell>
    );
  }

  /* ── COMPLETE ── */
  if (phase === "complete") {
    const passed = score >= PASS_THRESHOLD;
    return (
      <DrillShell>
        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Discard Drill — Results
          </p>
          <div className="mb-2 font-serif text-6xl font-black text-[var(--color-accent)]">
            {score} <span className="text-zinc-500">/ {ROUND_COUNT}</span>
          </div>
          <p className="mb-5 text-base">
            {passed
              ? "Nice — your discard instincts are developing!"
              : "Keep practicing. Remember: discard tiles that fit none of your candidate hands first."}
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[var(--color-accent)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Try again
          </button>
        </div>
      </DrillShell>
    );
  }

  /* ── PLAYING ── */
  const scenario = scenarios[index];
  const isGood = picked !== null && scenario.goodDiscards.includes(picked);
  const isBest = picked === scenario.bestDiscard;

  return (
    <DrillShell>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          Hand {index + 1} of {ROUND_COUNT}
        </span>
        <span className="text-xs text-zinc-400">Score: {score}</span>
      </div>

      {/* Hand hint */}
      <div className="mb-4 rounded-lg bg-white/10 p-3">
        <p className="text-[13px] font-bold text-[var(--color-accent)]">
          Your target hand
        </p>
        <p className="text-sm text-zinc-300">{scenario.handHint}</p>
      </div>

      {/* Tiles */}
      <p className="mb-2 text-center text-[12px] font-bold uppercase tracking-wider text-zinc-400">
        Tap the tile you&apos;d discard
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {scenario.tiles.map((t, i) => {
          let ring = "";
          if (picked !== null) {
            if (i === scenario.bestDiscard) {
              // Best answer always gets green
              ring = "ring-3 ring-[var(--color-green)] rounded-md";
            } else if (scenario.goodDiscards.includes(i) && i !== scenario.bestDiscard) {
              // Other good answers get a lighter green
              ring = "ring-2 ring-[var(--color-green)]/60 rounded-md";
            } else if (i === picked && !isGood) {
              // Wrong answer gets red
              ring = "ring-3 ring-[var(--color-red)] rounded-md";
            }
          }
          return (
            <button
              key={i}
              type="button"
              disabled={picked !== null}
              onClick={() => answer(i)}
              className={`rounded-md transition disabled:cursor-default ${
                picked === null ? "hover:-translate-y-1" : ""
              } ${ring}`}
              aria-label={`Tile ${i + 1}: ${nameOf(t)}`}
            >
              {t.type === "joker" ? (
                <Tile type="joker" size="sm" />
              ) : (
                <Tile type={t.type} value={t.value} size="sm" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {picked !== null && (
        <div className="mt-4">
          <div
            className={`rounded-lg p-3 text-sm ${
              isGood
                ? "bg-[var(--color-green)]/20 text-[var(--color-green)]"
                : "bg-[var(--color-red)]/20 text-[var(--color-red)]"
            }`}
          >
            <strong>
              {isBest
                ? "Great choice!"
                : isGood
                  ? `Good pick! ${nameOf(scenario.tiles[scenario.bestDiscard])} is also a strong choice.`
                  : `Not the best pick. ${scenario.goodDiscards.length > 1 ? "Good discards include" : "A better discard is"} ${scenario.goodDiscards.map((gi) => nameOf(scenario.tiles[gi])).join(", ")}.`}
            </strong>
          </div>
          <p className="mt-2 text-[13px] text-zinc-300">
            {scenario.explanation}
          </p>
          <div className="mt-2 rounded-md bg-white/5 px-3 py-2">
            <p className="text-[12px] text-zinc-400">
              <strong className="text-[var(--color-accent)]">Tip:</strong>{" "}
              {scenario.tip}
            </p>
          </div>
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={next}
              className="rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              {index + 1 >= ROUND_COUNT ? "See results" : "Next →"}
            </button>
          </div>
        </div>
      )}
    </DrillShell>
  );
}

function DrillShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] p-6 sm:p-9 text-white shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
      {children}
    </div>
  );
}
