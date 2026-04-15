"use client";

import { useState } from "react";
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
  /** Indices of the best 3 tiles to pass (order doesn't matter) */
  bestPasses: number[];
  explanation: string;
};

/* ───── Scenarios ───── */

const SCENARIOS: Scenario[] = [
  {
    handHint: "You're aiming for an all-Bam hand (pungs and kongs of Bams + pair of flowers)",
    tiles: [
      { type: "bam", value: 2 }, { type: "bam", value: 2 }, { type: "bam", value: 4 },
      { type: "bam", value: 4 }, { type: "bam", value: 6 }, { type: "bam", value: 6 },
      { type: "bam", value: 8 }, { type: "flower", value: 1 }, { type: "flower", value: 3 },
      { type: "crack", value: 7 }, { type: "dot", value: 3 }, { type: "wind", value: "N" },
      { type: "dragon", value: "white" },
    ],
    bestPasses: [9, 10, 11, 12], // 7 Crak, 3 Dot, North, Soap
    explanation:
      "The 7 Crak, 3 Dot, North Wind, and Soap all fit nothing in an all-Bam hand. Any 3 of those 4 are a good pass.",
  },
  {
    handHint: "Going for Winds & Dragons (pungs of winds + pair of Red Dragons)",
    tiles: [
      { type: "wind", value: "N" }, { type: "wind", value: "N" }, { type: "wind", value: "S" },
      { type: "wind", value: "S" }, { type: "wind", value: "E" },
      { type: "dragon", value: "red" }, { type: "dragon", value: "red" },
      { type: "joker" },
      { type: "bam", value: 3 }, { type: "bam", value: 7 },
      { type: "crack", value: 5 }, { type: "dot", value: 9 }, { type: "dot", value: 2 },
    ],
    bestPasses: [8, 9, 10, 11, 12], // Any 3 of: 3 Bam, 7 Bam, 5 Crak, 9 Dot, 2 Dot
    explanation:
      "All 5 suited tiles (3 Bam, 7 Bam, 5 Crak, 9 Dot, 2 Dot) are useless for a Winds & Dragons hand. Pass any 3 of them — keep the winds, dragons, and joker.",
  },
  {
    handHint: "Eyeing a 2468 Dots hand (pairs and pungs of even Dots)",
    tiles: [
      { type: "dot", value: 2 }, { type: "dot", value: 2 }, { type: "dot", value: 4 },
      { type: "dot", value: 4 }, { type: "dot", value: 6 }, { type: "dot", value: 8 },
      { type: "dot", value: 8 }, { type: "joker" },
      { type: "bam", value: 1 }, { type: "bam", value: 5 },
      { type: "crack", value: 9 }, { type: "wind", value: "W" },
      { type: "dragon", value: "green" },
    ],
    bestPasses: [8, 9, 10], // 1 Bam, 5 Bam, 9 Crak
    explanation:
      "The odd-numbered suited tiles (1 Bam, 5 Bam, 9 Crak) are completely useless for a 2468 Dots hand. The West Wind and Green Dragon also don't fit, but honors are less dangerous to hold for one more pass.",
  },
  {
    handHint: "Building a consecutive run in Craks (pungs of 3-4-5 Crak + flowers)",
    tiles: [
      { type: "crack", value: 3 }, { type: "crack", value: 3 }, { type: "crack", value: 4 },
      { type: "crack", value: 4 }, { type: "crack", value: 5 }, { type: "crack", value: 5 },
      { type: "flower", value: 2 }, { type: "flower", value: 4 },
      { type: "joker" },
      { type: "bam", value: 9 }, { type: "dot", value: 1 },
      { type: "wind", value: "E" }, { type: "wind", value: "S" },
    ],
    bestPasses: [9, 10, 11], // 9 Bam, 1 Dot, East
    explanation:
      "The 9 Bam, 1 Dot, East Wind, and South Wind are all useless for a consecutive Craks hand. Any 3 of those 4 are a good pass — keep your Craks, flowers, and joker.",
  },
  {
    handHint: "Year hand 2026 — need 2s, Soaps (0), and 6s",
    tiles: [
      { type: "bam", value: 2 }, { type: "crack", value: 2 }, { type: "crack", value: 2 },
      { type: "dragon", value: "white" }, { type: "dragon", value: "white" },
      { type: "dot", value: 6 }, { type: "dot", value: 6 }, { type: "bam", value: 6 },
      { type: "joker" },
      { type: "crack", value: 7 }, { type: "bam", value: 3 },
      { type: "dot", value: 9 }, { type: "wind", value: "N" },
    ],
    bestPasses: [9, 10, 11, 12], // 7 Crak, 3 Bam, 9 Dot, North Wind
    explanation:
      "The 7 Crak, 3 Bam, 9 Dot, and North Wind don't match any digit in 2026. Any 3 of those 4 are a good pass — keep your 2s, Soaps, 6s, and joker.",
  },
];

const ROUND_COUNT = 4;
const PASS_THRESHOLD = 2;

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

/* ───── Component ───── */

type Phase = "intro" | "playing" | "complete";

export function CharlestonDrill() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function start() {
    setScenarios(shuffle(SCENARIOS).slice(0, ROUND_COUNT));
    setIndex(0);
    setScore(0);
    setSelected([]);
    setSubmitted(false);
    setPhase("playing");
  }

  function toggleTile(i: number) {
    if (submitted) return;
    setSelected((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i);
      if (prev.length >= 3) return prev;
      return [...prev, i];
    });
  }

  function submit() {
    if (selected.length !== 3 || submitted) return;
    setSubmitted(true);
    const scenario = scenarios[index];
    // Score: how many of the selected tiles match the best passes?
    const matches = selected.filter((i) => scenario.bestPasses.includes(i)).length;
    if (matches >= 2) setScore((s) => s + 1); // 2 or 3 correct = pass
  }

  function next() {
    if (index + 1 >= ROUND_COUNT) {
      setPhase("complete");
    } else {
      setIndex((i) => i + 1);
      setSelected([]);
      setSubmitted(false);
    }
  }

  /* ── INTRO ── */
  if (phase === "intro") {
    return (
      <DrillShell>
        <div className="text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Practice Drill
          </p>
          <h3 className="mb-3 font-serif text-2xl font-black">
            🔄 Charleston Pass Picker
          </h3>
          <p className="mb-2 text-sm text-zinc-300">
            We&apos;ll show you {ROUND_COUNT}{" "}hands with 13 tiles each and a
            target hand. Pick the 3 tiles you&apos;d pass in the Charleston.
          </p>
          <p className="mb-5 text-xs text-zinc-400">
            Get {PASS_THRESHOLD} out of {ROUND_COUNT} right to pass. You need at
            least 2 of 3 correct picks per round.
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
            Charleston Drill — Results
          </p>
          <div className="mb-2 font-serif text-6xl font-black text-[var(--color-accent)]">
            {score} <span className="text-zinc-500">/ {ROUND_COUNT}</span>
          </div>
          <p className="mb-5 text-base">
            {passed
              ? "Sharp — you know what to pass!"
              : "Keep at it. Review what fits your target hand and what doesn't."}
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
  const matches = selected.filter((i) => scenario.bestPasses.includes(i)).length;
  const roundPass = matches >= 2;

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
          Target hand
        </p>
        <p className="text-sm text-zinc-300">{scenario.handHint}</p>
      </div>

      {/* Instructions */}
      <p className="mb-2 text-center text-[12px] font-bold uppercase tracking-wider text-zinc-400">
        {submitted
          ? `${matches} of 3 correct`
          : `Tap 3 tiles to pass (${selected.length}/3 selected)`}
      </p>

      {/* Tiles */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {scenario.tiles.map((t, i) => {
          const isSelected = selected.includes(i);
          const isBest = scenario.bestPasses.includes(i);
          let ring = "";
          if (isSelected && !submitted) {
            ring = "ring-3 ring-[var(--color-accent)] rounded-md";
          } else if (submitted && isBest) {
            ring = "ring-3 ring-[var(--color-green)] rounded-md";
          } else if (submitted && isSelected && !isBest) {
            ring = "ring-3 ring-[var(--color-red)] rounded-md";
          }

          return (
            <button
              key={i}
              type="button"
              disabled={submitted}
              onClick={() => toggleTile(i)}
              className={`rounded-md transition disabled:cursor-default ${
                !submitted ? "hover:-translate-y-1" : ""
              } ${ring}`}
              aria-label={`Tile ${i + 1}: ${nameOf(t)}${isSelected ? " (selected)" : ""}`}
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

      {/* Submit / feedback */}
      {!submitted && (
        <div className="mt-4 text-center">
          <button
            type="button"
            disabled={selected.length !== 3}
            onClick={submit}
            className="rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5 disabled:opacity-40"
          >
            Pass these 3 →
          </button>
        </div>
      )}

      {submitted && (
        <div className="mt-4">
          <div
            className={`rounded-lg p-3 text-sm ${
              roundPass
                ? "bg-[var(--color-green)]/20 text-[var(--color-green)]"
                : "bg-[var(--color-red)]/20 text-[var(--color-red)]"
            }`}
          >
            <strong>
              {roundPass
                ? `Nice — ${matches}/3 correct!`
                : `${matches}/3 correct. The green-ringed tiles are the best passes.`}
            </strong>
          </div>
          <p className="mt-2 text-[13px] text-zinc-300">
            {scenario.explanation}
          </p>
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
