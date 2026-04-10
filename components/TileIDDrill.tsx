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

type Question = {
  tile: TileSpec;
  correctName: string;
  options: string[];
};

/* ───── Data ───── */

const ROUND_COUNT = 20;
const PASS_THRESHOLD = 16; // 80%

function nameOf(tile: TileSpec): string {
  switch (tile.type) {
    case "bam": return `${tile.value} Bam`;
    case "crack": return `${tile.value} Crack`;
    case "dot": return `${tile.value} Dot`;
    case "wind":
      return ({ N: "North", E: "East", W: "West", S: "South" } as const)[tile.value];
    case "dragon":
      return tile.value === "red" ? "Red Dragon" : tile.value === "green" ? "Green Dragon" : "Soap";
    case "flower": return "Flower";
    case "joker": return "Joker";
  }
}

/** All possible tiles (one of each kind) */
const ALL_TILES: TileSpec[] = [
  // Suits 1-9
  ...([1,2,3,4,5,6,7,8,9] as const).flatMap((v) =>
    (["bam", "crack", "dot"] as Suit[]).map((t) => ({ type: t, value: v }))
  ),
  // Winds
  { type: "wind", value: "N" }, { type: "wind", value: "E" },
  { type: "wind", value: "W" }, { type: "wind", value: "S" },
  // Dragons
  { type: "dragon", value: "red" }, { type: "dragon", value: "green" },
  { type: "dragon", value: "white" },
  // Flower + Joker
  { type: "flower", value: 1 },
  { type: "joker" },
];

/** All possible tile names for wrong-answer generation */
const ALL_NAMES = ALL_TILES.map(nameOf);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Generate plausible wrong answers for a tile */
function wrongAnswers(correct: string, tile: TileSpec): string[] {
  const wrongs: string[] = [];

  if (tile.type === "bam" || tile.type === "crack" || tile.type === "dot") {
    // Same number, different suits
    const suits: Suit[] = ["bam", "crack", "dot"];
    for (const s of suits) {
      const name = `${tile.value} ${s.charAt(0).toUpperCase() + s.slice(1)}`;
      if (name !== correct) wrongs.push(name);
    }
    // Same suit, nearby numbers
    const v = tile.value as number;
    if (v > 1) wrongs.push(`${v - 1} ${tile.type.charAt(0).toUpperCase() + tile.type.slice(1)}`);
    if (v < 9) wrongs.push(`${v + 1} ${tile.type.charAt(0).toUpperCase() + tile.type.slice(1)}`);
  } else if (tile.type === "wind") {
    wrongs.push("North", "East", "West", "South");
  } else if (tile.type === "dragon") {
    wrongs.push("Red Dragon", "Green Dragon", "Soap");
  } else {
    // Flower or joker — mix in other special tiles
    wrongs.push("Flower", "Joker", "Soap", "North");
  }

  // Filter out the correct answer and deduplicate
  const unique = [...new Set(wrongs.filter((w) => w !== correct))];
  return shuffle(unique);
}

function generateQuestions(n: number): Question[] {
  const tiles = shuffle(ALL_TILES).slice(0, n);
  return tiles.map((tile) => {
    const correctName = nameOf(tile);
    const wrongs = wrongAnswers(correctName, tile).slice(0, 3);
    const options = shuffle([correctName, ...wrongs]);
    return { tile, correctName, options };
  });
}

/* ───── Component ───── */

type Phase = "intro" | "playing" | "complete";

export function TileIDDrill() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  function start() {
    setQuestions(generateQuestions(ROUND_COUNT));
    setIndex(0);
    setScore(0);
    setPicked(null);
    setStreak(0);
    setBestStreak(0);
    setPhase("playing");
  }

  const answer = useCallback(
    (name: string) => {
      if (picked !== null) return;
      setPicked(name);
      const correct = name === questions[index].correctName;
      if (correct) {
        setScore((s) => s + 1);
        setStreak((s) => {
          const next = s + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
      } else {
        setStreak(0);
      }
    },
    [picked, questions, index]
  );

  function next() {
    if (index + 1 >= ROUND_COUNT) {
      setPhase("complete");
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  }

  // Keyboard: 1-4 for options
  useEffect(() => {
    if (phase !== "playing" || picked !== null) return;
    function handler(e: KeyboardEvent) {
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx < (questions[index]?.options.length ?? 0)) {
        e.preventDefault();
        answer(questions[index].options[idx]);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, picked, answer, questions, index]);

  // Auto-advance after correct answer
  useEffect(() => {
    if (picked === null) return;
    const correct = picked === questions[index]?.correctName;
    if (correct) {
      const t = setTimeout(next, 600);
      return () => clearTimeout(t);
    }
    // Wrong answer: wait for manual click
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  /* ── INTRO ── */
  if (phase === "intro") {
    return (
      <DrillShell>
        <div className="text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Practice Drill
          </p>
          <h3 className="mb-3 font-serif text-2xl font-black">
            🀄 Name That Tile
          </h3>
          <p className="mb-2 text-sm text-zinc-300">
            We&apos;ll show you {ROUND_COUNT} tiles one at a time. Pick the
            correct name from 4 choices.
          </p>
          <p className="mb-2 text-xs text-zinc-400">
            Correct answers advance automatically. Wrong answers show the right
            name so you can learn.
          </p>
          <p className="mb-5 text-xs text-zinc-500">
            Get {PASS_THRESHOLD} out of {ROUND_COUNT} right to pass.
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
    const pct = Math.round((score / ROUND_COUNT) * 100);
    return (
      <DrillShell>
        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Name That Tile — Results
          </p>
          <div className="mb-1 font-serif text-6xl font-black text-[var(--color-accent)]">
            {score} <span className="text-zinc-500">/ {ROUND_COUNT}</span>
          </div>
          <p className="mb-1 text-sm text-zinc-400">{pct}% correct</p>
          {bestStreak >= 5 && (
            <p className="mb-2 text-xs text-[var(--color-accent)]">
              Best streak: {bestStreak} in a row!
            </p>
          )}
          <p className="mb-5 text-base">
            {pct === 100
              ? "Perfect! You know every tile."
              : passed
                ? "Nice — you know your tiles well!"
                : "Keep practicing. Focus on the ones you missed — they'll click soon."}
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[var(--color-accent)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Play again
          </button>
        </div>
      </DrillShell>
    );
  }

  /* ── PLAYING ── */
  const q = questions[index];
  const isCorrect = picked === q.correctName;
  const isWrong = picked !== null && !isCorrect;

  return (
    <DrillShell>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          Tile {index + 1} of {ROUND_COUNT}
        </span>
        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <span className="text-xs font-bold text-[var(--color-accent)]">
              {streak} streak!
            </span>
          )}
          <span className="text-xs text-zinc-400">Score: {score}</span>
        </div>
      </div>

      {/* The tile — big and centered */}
      <div className="mb-5 flex justify-center">
        <div
          className={`rounded-lg p-2 transition-all duration-300 ${
            isCorrect
              ? "ring-4 ring-[var(--color-green)]"
              : isWrong
                ? "ring-4 ring-[var(--color-red)]"
                : ""
          }`}
        >
          {q.tile.type === "joker" ? (
            <Tile type="joker" size="lg" />
          ) : (
            <Tile type={q.tile.type} value={q.tile.value} size="lg" />
          )}
        </div>
      </div>

      {/* Question */}
      <p className="mb-3 text-center text-sm font-bold text-zinc-300">
        What is this tile?
      </p>

      {/* 4 answer buttons */}
      <div className="grid grid-cols-2 gap-2">
        {q.options.map((opt, i) => {
          let bg = "border-zinc-500 bg-white/10 text-white hover:bg-white/20";
          if (picked !== null) {
            if (opt === q.correctName) {
              bg = "border-[var(--color-green)] bg-[var(--color-green)]/20 text-[var(--color-green)]";
            } else if (opt === picked) {
              bg = "border-[var(--color-red)] bg-[var(--color-red)]/20 text-[var(--color-red)]";
            } else {
              bg = "border-zinc-700 bg-white/5 text-zinc-600";
            }
          }

          return (
            <button
              key={opt}
              type="button"
              disabled={picked !== null}
              onClick={() => answer(opt)}
              className={`rounded-lg border-2 px-3 py-3 text-sm font-bold transition disabled:cursor-default ${bg}`}
            >
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-black">
                {i + 1}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Wrong answer: show correct + next button */}
      {isWrong && (
        <div className="mt-4 text-center">
          <p className="mb-3 text-[13px] text-zinc-300">
            This is <strong className="text-[var(--color-green)]">{q.correctName}</strong>.
            {q.tile.type === "bam" && " Bams have green bamboo stalks."}
            {q.tile.type === "crack" && " Cracks have Chinese characters."}
            {q.tile.type === "dot" && " Dots have circle patterns."}
            {q.tile.type === "wind" && " Wind tiles show a single Chinese character."}
            {q.tile.type === "dragon" && q.tile.value === "white" && " The blank/framed tile is Soap (White Dragon)."}
          </p>
          <button
            type="button"
            onClick={next}
            className="rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            {index + 1 >= ROUND_COUNT ? "See results" : "Next →"}
          </button>
        </div>
      )}

      {/* Progress bar */}
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300"
          style={{ width: `${((index + 1) / ROUND_COUNT) * 100}%` }}
        />
      </div>
    </DrillShell>
  );
}

function DrillShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl bg-gradient-to-br from-[#475569] to-[#334155] p-6 sm:p-9 text-white shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
      {children}
    </div>
  );
}
