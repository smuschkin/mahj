"use client";

import { useEffect, useState } from "react";
import { setQuizScore } from "@/lib/progress";

export type QuizQuestion = {
  question: string;
  options: string[];
  /** Index of the correct option in `options` */
  correct: number;
  /** Optional 1-line explanation shown after answering */
  explanation?: string;
};

type Phase = "intro" | "playing" | "complete";

export function Quiz({
  questions,
  passThreshold,
  title = "Confidence Check",
  moduleNum,
}: {
  questions: QuizQuestion[];
  /** Default: must get >= ceil(80%) correct */
  passThreshold?: number;
  title?: string;
  /** If provided, the best score is saved to localStorage under this module number. */
  moduleNum?: number;
}) {
  const total = questions.length;
  const threshold = passThreshold ?? Math.ceil(total * 0.8);

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  // Save the score to localStorage when the user finishes the quiz
  useEffect(() => {
    if (phase === "complete" && moduleNum !== undefined) {
      setQuizScore(moduleNum, score);
    }
  }, [phase, moduleNum, score]);

  function start() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setPhase("playing");
  }

  function pickAnswer(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === questions[index].correct) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= total) {
      setPhase("complete");
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  }

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <QuizShell>
        <div className="text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Quiz
          </p>
          <h3 className="mb-3 font-serif text-2xl font-black text-[var(--color-mid)]">
            🎯 {title}
          </h3>
          <p className="mb-5 text-sm text-zinc-600">
            {total} multiple-choice questions. You need <strong>{threshold}/{total}</strong>{" "}
            to pass. No pressure — you can retake it anytime.
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[var(--color-accent)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Start →
          </button>
        </div>
      </QuizShell>
    );
  }

  // ── COMPLETE ──
  if (phase === "complete") {
    const passed = score >= threshold;
    return (
      <QuizShell>
        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            {title} — Results
          </p>
          <div className="mb-2 font-serif text-6xl font-black text-[var(--color-mid)]">
            {score} <span className="text-zinc-400">/ {total}</span>
          </div>
          <p className="mb-2 text-base">
            {passed
              ? "🎉 Passed! You're ready for the next module."
              : `Almost — you need ${threshold} to pass. Give it another try.`}
          </p>
          <p className="mb-5 text-sm text-zinc-500 italic">
            {passed
              ? "Click 'Next →' on the stepper to continue."
              : "Reading the lesson screens again before retrying often helps."}
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[var(--color-accent)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            {passed ? "Retake quiz" : "Try again"}
          </button>
        </div>
      </QuizShell>
    );
  }

  // ── PLAYING ──
  const current = questions[index];
  const showFeedback = picked !== null;
  const correct = picked === current.correct;

  return (
    <QuizShell>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          Question {index + 1} of {total}
        </span>
        <span className="text-xs text-zinc-500">Score: {score}</span>
      </div>

      <h4 className="mb-5 font-serif text-lg md:text-xl font-black text-[var(--color-mid)]">
        {current.question}
      </h4>

      <div className="space-y-2">
        {current.options.map((opt, i) => {
          const isCorrect = i === current.correct;
          const isPicked = picked === i;
          let style =
            "bg-white border-[#C9BC8A] text-[var(--color-mid)] hover:border-[var(--color-mid)] hover:-translate-y-0.5";
          if (showFeedback) {
            if (isCorrect)
              style = "bg-[#E8F5E9] border-[var(--color-green)] text-[var(--color-green)] font-bold";
            else if (isPicked)
              style = "bg-[#FDECEA] border-[var(--color-red)] text-[var(--color-red)] font-bold";
            else style = "bg-zinc-50 border-zinc-200 text-zinc-400";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => pickAnswer(i)}
              disabled={showFeedback}
              className={`w-full rounded-lg border-2 px-4 py-3 text-left text-sm transition disabled:cursor-default ${style}`}
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {showFeedback && isCorrect && <span className="ml-2">✓</span>}
              {showFeedback && isPicked && !isCorrect && <span className="ml-2">✗</span>}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mt-5">
          <p className="text-center text-base font-bold">
            {correct ? "✓ Correct!" : "✗ Not quite."}
          </p>
          {current.explanation && (
            <p className="mt-2 text-center text-sm text-zinc-600 italic">
              {current.explanation}
            </p>
          )}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={next}
              className="rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              {index + 1 >= total ? "See results →" : "Next question →"}
            </button>
          </div>
        </div>
      )}
    </QuizShell>
  );
}

function QuizShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border-2 border-[var(--color-accent)] bg-white p-6 sm:p-9 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      {children}
    </div>
  );
}
