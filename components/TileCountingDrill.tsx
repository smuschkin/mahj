"use client";

import { useState } from "react";
import { Tile, TileType } from "@/components/Tile";

/* ────────────────────────────────────────────────────────────────
 * Scenario data
 * ──────────────────────────────────────────────────────────────── */

type TileSpec = { type: TileType; value?: number | string };

type Safety = "safe" | "risky" | "dangerous";

type Scenario = {
  id: string;
  /** The tile you're thinking of discarding */
  targetTile: TileSpec;
  targetLabel: string;
  /** What's visible on the table */
  visible: string;
  /** The correct safety level */
  correct: Safety;
  /** Why */
  explanation: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    targetTile: { type: "bam", value: 5 },
    targetLabel: "5 Bam",
    visible: "Two 5 Bams in the discard pile.",
    correct: "risky",
    explanation: "2 of 4 copies visible. Someone could still have a pair and need yours for a Pung.",
  },
  {
    id: "s2",
    targetTile: { type: "crack", value: 3 },
    targetLabel: "3 Crak",
    visible: "Three 3 Craks already in the discard pile.",
    correct: "safe",
    explanation: "3 of 4 copies visible. Nobody can make a Pung with real tiles. Very safe.",
  },
  {
    id: "s3",
    targetTile: { type: "dot", value: 7 },
    targetLabel: "7 Dot",
    visible: "Player A has an exposed Pung of 7 Dot (3 tiles).",
    correct: "safe",
    explanation: "3 of 4 visible in the exposure. The 4th copy can't complete another group. Safe to throw.",
  },
  {
    id: "s4",
    targetTile: { type: "dot", value: 4 },
    targetLabel: "4 Dot",
    visible: "No 4 Dots visible anywhere — not in discards, not in any exposure.",
    correct: "dangerous",
    explanation: "0 of 4 copies visible. All 4 are hidden. Anyone could be collecting them.",
  },
  {
    id: "s5",
    targetTile: { type: "bam", value: 8 },
    targetLabel: "8 Bam",
    visible: "One 8 Bam discarded. Player A has an exposed Pung of 8 Bam (3 tiles).",
    correct: "safe",
    explanation: "All 4 copies accounted for (1 discard + 3 exposed). Completely safe.",
  },
  {
    id: "s6",
    targetTile: { type: "wind", value: "E" },
    targetLabel: "East Wind",
    visible: "One East Wind in the discard pile. No exposures.",
    correct: "risky",
    explanation: "Only 1 of 4 visible. Three are still hidden — someone could be building a Winds hand.",
  },
  {
    id: "s7",
    targetTile: { type: "dragon", value: "red" },
    targetLabel: "Red",
    visible: "No Red Dragons visible anywhere.",
    correct: "dangerous",
    explanation: "0 visible. All 4 are hidden. Very dangerous — someone could have a pair or triple waiting.",
  },
  {
    id: "s8",
    targetTile: { type: "crack", value: 6 },
    targetLabel: "6 Crak",
    visible: "One 6 Crak in the discard pile. You also have one in your hand.",
    correct: "risky",
    explanation: "2 of 4 accounted for (1 discard + 1 yours). 2 are still out there.",
  },
];

/* ────────────────────────────────────────────────────────────────
 * The component
 * ──────────────────────────────────────────────────────────────── */

type Phase = "intro" | "playing" | "complete";

const SAFETY_LABELS: Record<Safety, { label: string; color: string; bg: string; border: string }> = {
  safe: { label: "Safe", color: "text-[var(--color-green)]", bg: "bg-[#F4FBF6]", border: "border-[var(--color-green)]" },
  risky: { label: "Risky", color: "text-[#C8A951]", bg: "bg-[#FFFBEB]", border: "border-[#C8A951]" },
  dangerous: { label: "Dangerous", color: "text-[var(--color-red)]", bg: "bg-[#FFF6F4]", border: "border-[var(--color-red)]" },
};

export function TileCountingDrill() {
  const total = SCENARIOS.length;
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Safety | null>(null);
  const [score, setScore] = useState(0);

  function start() {
    setIndex(0);
    setScore(0);
    setPicked(null);
    setPhase("playing");
  }

  function answer(choice: Safety) {
    if (picked !== null) return;
    setPicked(choice);
    if (choice === SCENARIOS[index].correct) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= total) {
      setPhase("complete");
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  }

  return (
    <div className="my-6 rounded-xl border-2 border-[var(--color-accent)] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] sm:p-8">
      {phase === "intro" && (
        <div className="text-center">
          <h3 className="mb-3 font-serif text-xl font-black text-[var(--color-mid)]">
            🛡️ Is It Safe to Discard?
          </h3>
          <p className="mb-5 text-sm text-zinc-600">
            {total} tiles. Check what&apos;s visible and decide: Safe, Risky, or Dangerous?
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[var(--color-accent)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Start →
          </button>
        </div>
      )}

      {phase === "playing" && (() => {
        const s = SCENARIOS[index];
        const isCorrect = picked === s.correct;
        return (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
                Tile {index + 1} of {total}
              </span>
              <span className="text-xs text-zinc-400">Score: {score}</span>
            </div>

            <p className="mb-2 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-mid)]">
              Is it safe to discard this tile?
            </p>

            <div className="mb-3 flex justify-center">
              <Tile type={s.targetTile.type} value={s.targetTile.value} size="md" showLabel />
            </div>

            <p className="mb-4 text-center text-[13px] italic text-zinc-500">
              {s.visible}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {(["safe", "risky", "dangerous"] as Safety[]).map((choice) => {
                const style = SAFETY_LABELS[choice];
                let classes = `rounded-lg border-2 px-3 py-3 text-center text-sm font-bold transition ${style.border} ${style.bg}`;
                if (picked !== null) {
                  if (choice === s.correct) {
                    classes = `rounded-lg border-2 px-3 py-3 text-center text-sm font-bold ${style.border} ${style.bg} ring-2 ring-[var(--color-green)]`;
                  } else if (choice === picked) {
                    classes = "rounded-lg border-2 px-3 py-3 text-center text-sm font-bold border-zinc-300 bg-zinc-100 text-zinc-400";
                  } else {
                    classes = "rounded-lg border-2 px-3 py-3 text-center text-sm font-bold border-zinc-200 bg-zinc-50 text-zinc-300";
                  }
                }
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => answer(choice)}
                    disabled={picked !== null}
                    className={`${classes} disabled:cursor-default`}
                  >
                    <span className={picked === null ? style.color : ""}>
                      {style.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="mt-4 text-center">
                <p className="mb-2 font-bold">
                  {isCorrect ? "✓ Correct!" : `✗ It's ${SAFETY_LABELS[s.correct].label.toLowerCase()}.`}
                </p>
                <p className="mb-3 text-[13px] text-zinc-600">{s.explanation}</p>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
                >
                  {index + 1 >= total ? "See results →" : "Next →"}
                </button>
              </div>
            )}
          </>
        );
      })()}

      {phase === "complete" && (
        <div className="text-center">
          <h3 className="mb-2 font-serif text-xl font-black text-[var(--color-mid)]">
            Results
          </h3>
          <div className="mb-2 font-serif text-4xl font-black text-[var(--color-accent)]">
            {score} <span className="text-lg text-zinc-400">/ {total}</span>
          </div>
          <p className="mb-4 text-sm text-zinc-600">
            {score >= total - 1
              ? "Great defensive instincts!"
              : score >= Math.floor(total / 2)
                ? "Getting there — keep practicing!"
                : "Review the Safe/Risky/Dangerous framework and try again."}
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[var(--color-accent)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
