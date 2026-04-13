"use client";

import { useState } from "react";
import { Tile } from "./Tile";

type Suit = "bam" | "crack" | "dot";
type Question = { type: Suit; value: number };

const QUESTION_COUNT = 5;
const PASS_THRESHOLD = 4;
const SUITS: Suit[] = ["bam", "crack", "dot"];

function generateQuestions(): Question[] {
  return Array.from({ length: QUESTION_COUNT }, () => ({
    type: SUITS[Math.floor(Math.random() * SUITS.length)],
    value: Math.floor(Math.random() * 9) + 1,
  }));
}

type Phase = "intro" | "playing" | "complete";

export function SuitSorterDrill() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Suit | null>(null);
  const [score, setScore] = useState(0);

  function start() {
    setQuestions(generateQuestions());
    setIndex(0);
    setAnswer(null);
    setScore(0);
    setPhase("playing");
  }

  function pickAnswer(suit: Suit) {
    if (answer !== null) return;
    setAnswer(suit);
    if (suit === questions[index].type) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= QUESTION_COUNT) {
      setPhase("complete");
    } else {
      setIndex((i) => i + 1);
      setAnswer(null);
    }
  }

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <DrillShell>
        <div className="text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Practice Drill
          </p>
          <h3 className="mb-3 font-serif text-2xl font-black">🎯 Suit Sorter</h3>
          <p className="mb-5 text-sm text-zinc-300">
            We&apos;ll show you 5 tiles, one at a time. Tell us which suit each one is.
            Get 4 out of 5 to pass.
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

  // ── COMPLETE ──
  if (phase === "complete") {
    const passed = score >= PASS_THRESHOLD;
    return (
      <DrillShell>
        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Suit Sorter — Results
          </p>
          <div className="mb-2 font-serif text-6xl font-black text-[var(--color-accent)]">
            {score} <span className="text-zinc-500">/ {QUESTION_COUNT}</span>
          </div>
          <p className="mb-5 text-base">
            {passed
              ? "Nice — you've got the number suits down."
              : "Almost there. Give it another try!"}
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

  // ── PLAYING ──
  const current = questions[index];
  const showFeedback = answer !== null;
  const correct = answer === current.type;

  return (
    <DrillShell>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          Question {index + 1} of {QUESTION_COUNT}
        </span>
        <span className="text-xs text-zinc-400">Score: {score}</span>
      </div>

      <p className="mb-4 text-center text-sm text-zinc-300">What suit is this tile?</p>

      <div className="my-6 flex justify-center">
        <Tile type={current.type} value={current.value} size="lg" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {SUITS.map((suit) => {
          const isCorrect = suit === current.type;
          const isPicked = answer === suit;
          let style = "bg-white text-[var(--color-mid)] hover:-translate-y-0.5";
          if (showFeedback) {
            if (isCorrect) style = "bg-[var(--color-green)] text-white";
            else if (isPicked) style = "bg-[var(--color-red)] text-white";
            else style = "bg-zinc-600 text-zinc-400";
          }
          return (
            <button
              key={suit}
              type="button"
              onClick={() => pickAnswer(suit)}
              disabled={showFeedback}
              className={`rounded-md px-4 py-3 text-sm font-bold uppercase tracking-wider transition disabled:cursor-default ${style}`}
            >
              {suit}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mt-5 text-center">
          <p className="text-base font-bold">
            {correct ? "✓ Correct!" : `✗ That was a ${current.type}`}
          </p>
          <button
            type="button"
            onClick={next}
            className="mt-3 rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            {index + 1 >= QUESTION_COUNT ? "See results →" : "Next →"}
          </button>
        </div>
      )}
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
