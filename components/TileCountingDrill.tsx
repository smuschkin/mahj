"use client";

import { useState } from "react";
import { Tile, TileType } from "@/components/Tile";

/* ────────────────────────────────────────────────────────────────
 * Scenario data
 * ──────────────────────────────────────────────────────────────── */

type TileSpec = { type: TileType; value?: number | string };

type Scenario = {
  id: string;
  tag: string;
  /** The tile we're asking about */
  targetTile: TileSpec;
  targetLabel: string;
  /** Tiles visible in discards */
  discards: TileSpec[];
  /** Tiles visible in exposures */
  exposures: { player: string; tiles: TileSpec[] }[];
  /** Total copies that exist (usually 4; 8 for flowers/jokers) */
  totalCopies: number;
  /** How many are visible (discards + exposures) */
  visibleCount: number;
  /** How many remain unseen */
  remaining: number;
  /** Extra context */
  context?: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "tc1",
    tag: "Beginner",
    targetTile: { type: "bam", value: 5 },
    targetLabel: "5 Bam",
    discards: [
      { type: "bam", value: 5 },
      { type: "bam", value: 5 },
    ],
    exposures: [],
    totalCopies: 4,
    visibleCount: 2,
    remaining: 2,
    context: "Two 5 Bams are in the discard pile. No exposures contain 5 Bam.",
  },
  {
    id: "tc2",
    tag: "Beginner",
    targetTile: { type: "crack", value: 3 },
    targetLabel: "3 Crak",
    discards: [
      { type: "crack", value: 3 },
      { type: "crack", value: 3 },
      { type: "crack", value: 3 },
    ],
    exposures: [],
    totalCopies: 4,
    visibleCount: 3,
    remaining: 1,
    context: "Three 3 Craks are in the discard pile.",
  },
  {
    id: "tc3",
    tag: "Beginner",
    targetTile: { type: "dot", value: 7 },
    targetLabel: "7 Dot",
    discards: [],
    exposures: [
      {
        player: "Player A",
        tiles: [
          { type: "dot", value: 7 },
          { type: "dot", value: 7 },
          { type: "dot", value: 7 },
        ],
      },
    ],
    totalCopies: 4,
    visibleCount: 3,
    remaining: 1,
    context: "Player A has an exposed Pung of 7 Dot. None in the discard pile.",
  },
  {
    id: "tc4",
    tag: "Medium",
    targetTile: { type: "wind", value: "E" },
    targetLabel: "East Wind",
    discards: [{ type: "wind", value: "E" }],
    exposures: [
      {
        player: "Player B",
        tiles: [
          { type: "wind", value: "E" },
          { type: "wind", value: "E" },
          { type: "joker" },
        ],
      },
    ],
    totalCopies: 4,
    visibleCount: 3,
    remaining: 1,
    context:
      "One East Wind is in the discard pile. Player B has an exposed Pung with 2 real East Winds + 1 Joker.",
  },
  {
    id: "tc5",
    tag: "Medium",
    targetTile: { type: "dragon", value: "red" },
    targetLabel: "Red Dragon",
    discards: [
      { type: "dragon", value: "red" },
      { type: "dragon", value: "red" },
    ],
    exposures: [
      {
        player: "Player C",
        tiles: [
          { type: "dragon", value: "red" },
          { type: "dragon", value: "red" },
          { type: "dragon", value: "red" },
          { type: "joker" },
        ],
      },
    ],
    totalCopies: 4,
    visibleCount: 5,
    remaining: 0,
    context:
      "Two Red Dragons discarded + Player C has a Kong with 3 real Red Dragons + 1 Joker. But wait — that's 5 real Red Dragons, and only 4 exist. Trick question!",
  },
  {
    id: "tc6",
    tag: "Medium",
    targetTile: { type: "bam", value: 8 },
    targetLabel: "8 Bam",
    discards: [{ type: "bam", value: 8 }],
    exposures: [
      {
        player: "Player A",
        tiles: [
          { type: "bam", value: 8 },
          { type: "bam", value: 8 },
          { type: "bam", value: 8 },
        ],
      },
    ],
    totalCopies: 4,
    visibleCount: 4,
    remaining: 0,
    context:
      "One 8 Bam in the discard pile. Player A has an exposed Pung of 8 Bam (3 tiles). That's all 4.",
  },
  {
    id: "tc7",
    tag: "Medium",
    targetTile: { type: "dot", value: 2 },
    targetLabel: "2 Dot",
    discards: [],
    exposures: [
      {
        player: "Player A",
        tiles: [
          { type: "dot", value: 2 },
          { type: "dot", value: 2 },
          { type: "joker" },
        ],
      },
      {
        player: "Player C",
        tiles: [
          { type: "dot", value: 2 },
          { type: "dot", value: 2 },
          { type: "joker" },
        ],
      },
    ],
    totalCopies: 4,
    visibleCount: 4,
    remaining: 0,
    context:
      "Two players each have exposed Pungs of 2 Dot — each with 2 real tiles + 1 Joker. That's 4 real 2 Dots total.",
  },
  {
    id: "tc8",
    tag: "Advanced",
    targetTile: { type: "crack", value: 6 },
    targetLabel: "6 Crak",
    discards: [{ type: "crack", value: 6 }],
    exposures: [],
    totalCopies: 4,
    visibleCount: 1,
    remaining: 3,
    context:
      "Only one 6 Crak is visible (in the discard pile). You also have one in your own hand. How many are truly unaccounted for?",
  },
  {
    id: "tc9",
    tag: "Advanced",
    targetTile: { type: "bam", value: 1 },
    targetLabel: "1 Bam",
    discards: [
      { type: "bam", value: 1 },
    ],
    exposures: [
      {
        player: "Player B",
        tiles: [
          { type: "bam", value: 1 },
          { type: "bam", value: 1 },
          { type: "bam", value: 1 },
          { type: "bam", value: 1 },
        ],
      },
    ],
    totalCopies: 4,
    visibleCount: 5,
    remaining: 0,
    context:
      "Player B has an exposed Kong of 1 Bam (4 tiles) + 1 in the discard pile = 5. But only 4 exist! One of those Kong tiles must be a Joker rendered as a 1 Bam. Still: all 4 real copies are accounted for.",
  },
  {
    id: "tc10",
    tag: "Beginner",
    targetTile: { type: "dot", value: 4 },
    targetLabel: "4 Dot",
    discards: [],
    exposures: [],
    totalCopies: 4,
    visibleCount: 0,
    remaining: 4,
    context:
      "No 4 Dots are visible anywhere — not in discards, not in any exposure. All 4 are still live somewhere.",
  },
];

/* ────────────────────────────────────────────────────────────────
 * The component
 * ──────────────────────────────────────────────────────────────── */

type Phase = "intro" | "playing" | "complete";

export function TileCountingDrill() {
  const total = SCENARIOS.length;
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  function start() {
    setPhase("playing");
    setIndex(0);
    setPicked(null);
    setScore(0);
  }

  function pick(n: number) {
    if (picked !== null) return;
    setPicked(n);
    if (n === SCENARIOS[index].remaining) setScore((s) => s + 1);
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
          <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Interactive Drill
          </p>
          <h3 className="mb-3 font-serif text-2xl font-black text-[var(--color-mid)]">
            🧮 Tile Counting Trainer
          </h3>
          <p className="mb-2 text-sm text-zinc-600">
            See what&apos;s visible on the table — discards and exposures. Count
            how many copies of a specific tile are still <strong>unseen</strong>.
          </p>
          <p className="mb-5 text-xs italic text-zinc-500">
            {total} scenarios. Remember: most tiles have 4 copies total. Jokers
            in exposed groups count as the tile they represent, not as a real copy.
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[var(--color-mid)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Start counting →
          </button>
        </div>
      )}

      {phase === "playing" && (
        <CountingView
          scenario={SCENARIOS[index]}
          index={index}
          total={total}
          score={score}
          picked={picked}
          onPick={pick}
          onNext={next}
        />
      )}

      {phase === "complete" && (
        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Drill complete
          </p>
          <div className="mb-2 font-serif text-6xl font-black text-[var(--color-mid)]">
            {score} <span className="text-zinc-400">/ {total}</span>
          </div>
          <p className="mb-2 text-base">
            {score >= Math.ceil(total * 0.7)
              ? "🎉 Sharp counting — you track the wall like a veteran."
              : "Keep at it — tile counting is the single most important defensive skill."}
          </p>
          <button
            type="button"
            onClick={start}
            className="mt-3 rounded-md bg-[var(--color-mid)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

function CountingView({
  scenario: s,
  index,
  total,
  score,
  picked,
  onPick,
  onNext,
}: {
  scenario: Scenario;
  index: number;
  total: number;
  score: number;
  picked: number | null;
  onPick: (n: number) => void;
  onNext: () => void;
}) {
  const showFeedback = picked !== null;
  const correct = picked === s.remaining;

  // Generate answer options: 0 through 4 (covers all possible answers)
  const options = [0, 1, 2, 3, 4];

  return (
    <>
      <div className="mb-3 flex items-center justify-between text-[13px] uppercase tracking-wider">
        <span className="font-bold text-[var(--color-accent)]">
          Scenario {index + 1} of {total}
        </span>
        <span className="text-zinc-500">{s.tag} · Score: {score}</span>
      </div>

      {/* Target tile */}
      <div className="my-4 text-center">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
          How many {s.targetLabel}s are still unseen?
        </p>
        <div className="inline-block rounded-xl border-2 border-[var(--color-accent)] bg-[#E8F5EC] p-4 shadow-sm">
          <Tile type={s.targetTile.type} value={s.targetTile.value} size="md" showLabel />
        </div>
        <p className="mt-1 text-[13px] text-zinc-400">
          ({s.totalCopies} copies exist in the full set)
        </p>
      </div>

      {/* Context */}
      {s.context && (
        <p className="mb-4 rounded-md bg-[var(--color-light)] px-3 py-2 text-center text-[13px] italic text-zinc-600">
          {s.context}
        </p>
      )}

      {/* Visible in discards */}
      {s.discards.length > 0 && (
        <div className="mb-3 rounded-lg border border-zinc-200 bg-white p-3">
          <p className="mb-1.5 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
            In the discard pile ({s.discards.length})
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {s.discards.map((t, i) => (
              <Tile key={i} type={t.type} value={t.value} size="sm" />
            ))}
          </div>
        </div>
      )}

      {/* Visible in exposures */}
      {s.exposures.length > 0 && (
        <div className="mb-3 space-y-2">
          {s.exposures.map((exp, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="mb-1.5 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
                {exp.player}&apos;s exposure
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 rounded bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] p-2">
                {exp.tiles.map((t, j) => (
                  <Tile key={j} type={t.type} value={t.value} size="sm" highlighted />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {s.discards.length === 0 && s.exposures.length === 0 && (
        <p className="mb-4 text-center text-sm italic text-zinc-500">
          No {s.targetLabel}s are visible on the table.
        </p>
      )}

      {/* Answer buttons */}
      <p className="mb-2 text-center text-[12px] font-bold text-[var(--color-mid)]">
        How many {s.targetLabel}s are still unseen?
      </p>
      <div className="flex justify-center gap-2">
        {options.map((n) => {
          const isCorrect = n === s.remaining;
          const isPicked = n === picked;
          let style =
            "border-zinc-300 bg-white text-zinc-700 hover:border-[var(--color-mid)] hover:scale-105";
          if (showFeedback) {
            if (isCorrect)
              style = "border-[var(--color-green)] bg-[#E8F5E9] text-[var(--color-green)] font-black scale-110";
            else if (isPicked)
              style = "border-[var(--color-red)] bg-[#FDECEA] text-[var(--color-red)] font-black";
            else style = "border-zinc-200 bg-zinc-50 text-zinc-300";
          }
          return (
            <button
              key={n}
              type="button"
              onClick={() => onPick(n)}
              disabled={showFeedback}
              className={`h-12 w-12 rounded-full border-2 font-serif text-lg font-black transition disabled:cursor-default ${style}`}
            >
              {n}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mt-5">
          <p className="text-center text-base font-bold">
            {correct
              ? "✓ Correct!"
              : `✗ Not quite — ${s.remaining} remain.`}
          </p>
          <div className="mt-2 rounded-md bg-[#E8F5EC] p-3 text-center text-[13px] text-zinc-700">
            <strong>{s.totalCopies} total</strong>{" "}copies exist.{" "}
            <strong>{s.visibleCount}</strong>{" "}are visible (discards + exposures).{" "}
            <strong>{s.remaining}</strong>{" "}are still unseen in players&apos; hands
            or the wall.
            {s.remaining === 0 && (
              <span className="mt-1 block font-bold text-[var(--color-green)]">
                This tile is completely safe to discard — nobody can Pung or Kong it.
              </span>
            )}
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onNext}
              className="rounded-md bg-[var(--color-mid)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              {index + 1 >= total ? "See results →" : "Next →"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
