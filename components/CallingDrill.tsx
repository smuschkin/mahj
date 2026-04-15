"use client";

import { useCallback, useState } from "react";
import { Tile, TileType } from "@/components/Tile";

/* ────────────────────────────────────────────────────────────────
 * Scenario data
 * ──────────────────────────────────────────────────────────────── */

type TileSpec = { type: TileType; value?: number | string };

type CallOption = "call" | "pass" | "mahjong";

type Scenario = {
  id: string;
  /** The tile someone just discarded */
  discard: TileSpec;
  /** Your current hand (13 tiles) */
  hand: TileSpec[];
  /** Extra context shown above the hand */
  context?: string;
  /** The correct action */
  correct: CallOption;
  /** Why */
  explanation: React.ReactNode;
  /** Difficulty tag */
  tag: string;
};

const SCENARIOS: Scenario[] = [
  // ── 1. Easy Pung ──
  {
    id: "c1",
    tag: "Beginner",
    discard: { type: "bam", value: 5 },
    hand: [
      { type: "bam", value: 3 },
      { type: "bam", value: 3 },
      { type: "bam", value: 5 },
      { type: "bam", value: 5 },
      { type: "bam", value: 7 },
      { type: "bam", value: 7 },
      { type: "bam", value: 9 },
      { type: "bam", value: 9 },
      { type: "crack", value: 1 },
      { type: "crack", value: 2 },
      { type: "dot", value: 4 },
      { type: "dot", value: 6 },
      { type: "joker" },
    ],
    context: "Mid-game. You're building an all-Bam hand and need a third 5 Bam for a Pung.",
    correct: "call",
    explanation: (
      <>
        <strong>Call.</strong>{" "}You have two 5 Bams, you&apos;re committed to Bams,
        and this completes a Pung you need. Mid-game + committed = take it.
      </>
    ),
  },

  // ── 2. Too early — pass ──
  {
    id: "c2",
    tag: "Beginner",
    discard: { type: "crack", value: 8 },
    hand: [
      { type: "crack", value: 8 },
      { type: "crack", value: 8 },
      { type: "bam", value: 2 },
      { type: "bam", value: 4 },
      { type: "bam", value: 6 },
      { type: "dot", value: 1 },
      { type: "dot", value: 3 },
      { type: "dot", value: 5 },
      { type: "dot", value: 7 },
      { type: "wind", value: "E" },
      { type: "wind", value: "S" },
      { type: "dragon", value: "red" },
      { type: "joker" },
    ],
    context: "Turn 1. Your tiles are scattered across all three suits. You haven't committed to a hand yet.",
    correct: "pass",
    explanation: (
      <>
        <strong>Pass.</strong>{" "}It&apos;s Turn 1 and your hand is scattered across
        Bams, Dots, and Craks. Calling now would lock you into a Craks exposure
        before you know which hand to build. Stay flexible early.
      </>
    ),
  },

  // ── 3. Kong opportunity ──
  {
    id: "c3",
    tag: "Medium",
    discard: { type: "dot", value: 3 },
    hand: [
      { type: "dot", value: 3 },
      { type: "dot", value: 3 },
      { type: "dot", value: 3 },
      { type: "dot", value: 5 },
      { type: "dot", value: 5 },
      { type: "dot", value: 7 },
      { type: "dot", value: 7 },
      { type: "dot", value: 9 },
      { type: "dot", value: 9 },
      { type: "crack", value: 2 },
      { type: "wind", value: "N" },
      { type: "joker" },
      { type: "joker" },
    ],
    context: "Mid-game. You're going for an all-Dot hand and your card hand needs a Kong (4 of a kind) of 3 Dots.",
    correct: "call",
    explanation: (
      <>
        <strong>Call.</strong>{" "}You have three 3 Dots and the hand needs a Kong.
        This is the 4th copy — take it. You&apos;re committed to Dots and this
        directly fills a requirement.
      </>
    ),
  },

  // ── 4. Mahjong! ──
  {
    id: "c4",
    tag: "Beginner",
    discard: { type: "bam", value: 2 },
    hand: [
      { type: "bam", value: 1 },
      { type: "bam", value: 1 },
      { type: "bam", value: 1 },
      { type: "bam", value: 1 },
      { type: "bam", value: 2 },
      { type: "bam", value: 2 },
      { type: "bam", value: 2 },
      { type: "bam", value: 3 },
      { type: "bam", value: 3 },
      { type: "bam", value: 3 },
      { type: "bam", value: 4 },
      { type: "bam", value: 4 },
      { type: "bam", value: 4 },
    ],
    context: "You have 13 tiles. This 2 Bam completes your Kong and your entire hand.",
    correct: "mahjong",
    explanation: (
      <>
        <strong>Mahjong!</strong>{" "}The 2 Bam completes your Kong of 2s. Your hand
        is now 14 tiles matching a valid hand on the card. Say &quot;wait,&quot;
        verify, then call Mahjong. Don&apos;t hesitate.
      </>
    ),
  },

  // ── 5. Can't call — only 1 in hand ──
  {
    id: "c5",
    tag: "Beginner",
    discard: { type: "dragon", value: "green" },
    hand: [
      { type: "bam", value: 2 },
      { type: "bam", value: 4 },
      { type: "bam", value: 6 },
      { type: "bam", value: 8 },
      { type: "crack", value: 1 },
      { type: "crack", value: 3 },
      { type: "crack", value: 5 },
      { type: "dot", value: 2 },
      { type: "dot", value: 4 },
      { type: "dot", value: 6 },
      { type: "wind", value: "W" },
      { type: "dragon", value: "green" },
      { type: "joker" },
    ],
    context: "You have 1 Green Dragon and a Joker. Your hand is scattered across all three suits with no clear direction.",
    correct: "pass",
    explanation: (
      <>
        <strong>Pass.</strong>{" "}You could technically call using your Joker as the
        second Green Dragon — but your hand has no direction. Exposing a Pung
        of Green Dragons locks you in and wastes your Joker early. Stay
        flexible and keep the Joker for later.
      </>
    ),
  },

  // ── 6. Tempting but locks you in ──
  {
    id: "c6",
    tag: "Medium",
    discard: { type: "wind", value: "E" },
    hand: [
      { type: "bam", value: 3 },
      { type: "bam", value: 3 },
      { type: "bam", value: 5 },
      { type: "bam", value: 5 },
      { type: "bam", value: 7 },
      { type: "bam", value: 7 },
      { type: "crack", value: 4 },
      { type: "crack", value: 4 },
      { type: "dot", value: 6 },
      { type: "dot", value: 6 },
      { type: "wind", value: "E" },
      { type: "wind", value: "E" },
      { type: "joker" },
    ],
    context:
      "Turn 3. You're considering an all-Bam hand or a Winds & Dragons hand. You haven't committed yet.",
    correct: "pass",
    explanation: (
      <>
        <strong>Pass.</strong>{" "}Calling locks you into the winds-and-dragons
        direction, but your Bams are actually stronger (4 pairs vs 1 wind
        triple). Exposing the Winds now would kill your Bam option. Stay
        flexible until you&apos;ve committed.
      </>
    ),
  },

  // ── 7. Discarded Joker — can't call ──
  {
    id: "c7",
    tag: "Medium",
    discard: { type: "joker" },
    hand: [
      { type: "bam", value: 1 },
      { type: "bam", value: 3 },
      { type: "bam", value: 5 },
      { type: "bam", value: 7 },
      { type: "crack", value: 2 },
      { type: "crack", value: 4 },
      { type: "crack", value: 6 },
      { type: "dot", value: 1 },
      { type: "dot", value: 3 },
      { type: "dot", value: 5 },
      { type: "wind", value: "N" },
      { type: "dragon", value: "red" },
      { type: "dragon", value: "red" },
    ],
    context: "Someone just discarded a Joker. Can you grab it?",
    correct: "pass",
    explanation: (
      <>
        <strong>Pass — you have no choice.</strong>{" "}A discarded Joker is{" "}
        <strong>dead</strong>. No one can call it, no one can claim it. It sits
        in the discard pile forever. This is why nobody ever discards Jokers.
      </>
    ),
  },

  // ── 8. Late game — take the Pung ──
  {
    id: "c8",
    tag: "Medium",
    discard: { type: "crack", value: 6 },
    hand: [
      { type: "crack", value: 2 },
      { type: "crack", value: 2 },
      { type: "crack", value: 2 },
      { type: "crack", value: 4 },
      { type: "crack", value: 4 },
      { type: "crack", value: 4 },
      { type: "crack", value: 6 },
      { type: "crack", value: 6 },
      { type: "crack", value: 8 },
      { type: "crack", value: 8 },
      { type: "bam", value: 9 },
      { type: "joker" },
      { type: "joker" },
    ],
    context: "Turn 12 (late game). You need a third 6 Crak for a Pung. The wall is running low.",
    correct: "call",
    explanation: (
      <>
        <strong>Call.</strong>{" "}Late game, you&apos;re committed, and this is a tile
        you specifically need. The wall is running out — pass on this and you may
        never see another 6 Crak. Calling is the right move here.
      </>
    ),
  },

  // ── 9. Concealed hand — can't call ──
  {
    id: "c9",
    tag: "Advanced",
    discard: { type: "dot", value: 7 },
    hand: [
      { type: "dot", value: 1 },
      { type: "dot", value: 3 },
      { type: "dot", value: 3 },
      { type: "dot", value: 3 },
      { type: "dot", value: 5 },
      { type: "dot", value: 5 },
      { type: "dot", value: 5 },
      { type: "dot", value: 7 },
      { type: "dot", value: 7 },
      { type: "dot", value: 9 },
      { type: "dot", value: 9 },
      { type: "dot", value: 9 },
      { type: "joker" },
    ],
    context:
      'Your hand is marked "C" (concealed) on the card. You have two 7 Dots and need a third — but concealed means no calling.',
    correct: "pass",
    explanation: (
      <>
        <strong>Pass.</strong>{" "}Your hand is concealed (marked C on the card).
        You cannot call any tiles during play — every tile must come from the
        wall or the Charleston. The only exception: you <em>can</em>{" "}call a
        discarded tile if it completes Mahjong. But this 7 Dot only completes
        a Pung, not your entire hand.
      </>
    ),
  },

  // ── 10. Mahjong on a pair (special case) ──
  {
    id: "c10",
    tag: "Advanced",
    discard: { type: "bam", value: 9 },
    hand: [
      { type: "bam", value: 1 },
      { type: "bam", value: 1 },
      { type: "bam", value: 1 },
      { type: "bam", value: 3 },
      { type: "bam", value: 3 },
      { type: "bam", value: 3 },
      { type: "bam", value: 5 },
      { type: "bam", value: 5 },
      { type: "bam", value: 5 },
      { type: "bam", value: 7 },
      { type: "bam", value: 7 },
      { type: "bam", value: 7 },
      { type: "bam", value: 9 },
    ],
    context:
      "You have 13 tiles. You need ONE more 9 Bam to complete a pair and win. This discard is it.",
    correct: "mahjong",
    explanation: (
      <>
        <strong>Mahjong!</strong>{" "}This is the special case: Mahjong is the{" "}
        <em>only</em>{" "}time you can claim a discard for a pair (or even a single).
        The 9 Bam completes your pair and your entire 14-tile hand. Say
        &quot;wait,&quot; verify, then call Mahjong.
      </>
    ),
  },
];

/* ────────────────────────────────────────────────────────────────
 * The component
 * ──────────────────────────────────────────────────────────────── */

type Phase = "intro" | "playing" | "complete";

export function CallingDrill() {
  const total = SCENARIOS.length;
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<CallOption | null>(null);
  const [score, setScore] = useState(0);

  function start() {
    setPhase("playing");
    setIndex(0);
    setPicked(null);
    setScore(0);
  }

  function pick(opt: CallOption) {
    if (picked !== null) return;
    setPicked(opt);
    if (opt === SCENARIOS[index].correct) setScore((s) => s + 1);
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
      {/* ── INTRO ── */}
      {phase === "intro" && (
        <div className="text-center">
          <h3 className="mb-3 font-serif text-xl font-black text-[var(--color-mid)]">
            🔔 Can You Call This?
          </h3>
          <p className="mb-5 text-sm text-zinc-600">
            {total} scenarios. A tile hits the table — decide whether to
            Call, Mahjong, or Pass.
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

      {/* ── PLAYING ── */}
      {phase === "playing" && (
        <ScenarioView
          scenario={SCENARIOS[index]}
          index={index}
          total={total}
          score={score}
          picked={picked}
          onPick={pick}
          onNext={next}
        />
      )}

      {/* ── COMPLETE ── */}
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
              ? "🎉 Strong calling instincts — you know when to act and when to hold."
              : "Keep practicing — the difference between a good call and a bad one is timing + hand commitment."}
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

/* ── Scenario view ── */

function ScenarioView({
  scenario,
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
  picked: CallOption | null;
  onPick: (opt: CallOption) => void;
  onNext: () => void;
}) {
  const showFeedback = picked !== null;
  const correct = picked === scenario.correct;

  const btnStyle = (opt: CallOption) => {
    const isCorrect = opt === scenario.correct;
    const isPicked = opt === picked;
    if (!showFeedback) {
      if (opt === "call")
        return "border-[var(--color-accent)] bg-[#E8F5EC] text-[var(--color-accent)] hover:-translate-y-0.5";
      if (opt === "mahjong")
        return "border-[var(--color-red)] bg-[#FFF6F4] text-[var(--color-red)] hover:-translate-y-0.5";
      return "border-zinc-300 bg-white text-zinc-600 hover:-translate-y-0.5";
    }
    if (isCorrect)
      return "border-[var(--color-green)] bg-[#E8F5E9] text-[var(--color-green)] font-bold";
    if (isPicked)
      return "border-[var(--color-red)] bg-[#FDECEA] text-[var(--color-red)] font-bold";
    return "border-zinc-200 bg-zinc-50 text-zinc-400";
  };

  return (
    <>
      <div className="mb-3 flex items-center justify-between text-[13px] uppercase tracking-wider">
        <span className="font-bold text-[var(--color-accent)]">
          Scenario {index + 1} of {total}
        </span>
        <span className="text-zinc-500">
          {scenario.tag} · Score: {score}
        </span>
      </div>

      {/* Discarded tile */}
      <div className="my-4 text-center">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-wider text-[var(--color-red)]">
          Just discarded
        </p>
        <div className="inline-block rounded-xl border-2 border-[var(--color-red)] bg-[#FFF6F4] p-4 shadow-sm">
          <Tile type={scenario.discard.type} value={scenario.discard.value} size="md" showLabel />
        </div>
      </div>

      {/* Context */}
      {scenario.context && (
        <p className="mb-3 text-center text-[13px] italic text-zinc-600">
          {scenario.context}
        </p>
      )}

      {/* Your hand */}
      <p className="mb-1 text-center text-[13px] font-bold uppercase tracking-wider text-zinc-500">
        Your hand (13 tiles)
      </p>
      <div className="my-2 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-light)] p-3">
        <div className="flex flex-wrap items-end justify-center gap-1 sm:gap-1.5">
          {scenario.hand.map((t, i) => (
            <Tile key={i} type={t.type} value={t.value} size="sm" />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {(["call", "mahjong", "pass"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onPick(opt)}
            disabled={showFeedback}
            className={`rounded-lg border-2 px-5 py-3 text-sm font-bold uppercase tracking-wider transition disabled:cursor-default ${btnStyle(opt)}`}
          >
            {opt === "call" && "🔔 Call!"}
            {opt === "mahjong" && "🏆 Mahjong!"}
            {opt === "pass" && "👋 Pass"}
            {showFeedback && opt === scenario.correct && " ✓"}
            {showFeedback && opt === picked && opt !== scenario.correct && " ✗"}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="mt-5">
          <p className="text-center text-base font-bold">
            {correct ? "✓ Correct!" : "✗ Not quite."}
          </p>
          <div className="mt-2 rounded-md bg-[#E8F5EC] p-3 text-center text-[13px] text-zinc-700">
            {scenario.explanation}
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onNext}
              className="rounded-md bg-[var(--color-mid)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              {index + 1 >= total ? "See results →" : "Next scenario →"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
