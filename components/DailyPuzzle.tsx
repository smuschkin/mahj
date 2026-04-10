"use client";

import { useState, useMemo } from "react";
import { Tile, TileType } from "@/components/Tile";

/* ── Minimal puzzle type (subset of Module 13's puzzles) ── */

type TileSpec = { type: TileType; value?: number | string };

type DailyPuzzleData = {
  prompt: string;
  context?: string;
  tiles?: TileSpec[];
  options: string[];
  correctIndex: number;
  explanation: string;
};

/**
 * A curated pool of daily puzzles. Kept separate from Module 13 so
 * the homepage doesn't import the full practice library.
 */
const POOL: DailyPuzzleData[] = [
  {
    prompt: "Which tile should you NEVER discard?",
    options: ["A lone wind tile", "A Joker", "A 9 Dot", "A flower"],
    correctIndex: 1,
    explanation: "Never discard a Joker. Discarded Jokers are dead — nobody can call them.",
  },
  {
    prompt: "Can you use a Joker to complete a pair?",
    options: ["Yes", "No — Jokers only work in groups of 3 or more", "Only on your turn", "Only in Singles & Pairs"],
    correctIndex: 1,
    explanation: "Jokers cannot substitute in a pair, ever. You need two real tiles.",
  },
  {
    prompt: "3 copies of the 5 Bam are already visible. Is the 4th safe to discard?",
    options: ["No — someone might still need it", "Yes — 100% safe, nobody can Pung or Kong it", "Only late game", "Only if you're folding"],
    correctIndex: 1,
    explanation: "Once 3 copies are visible, the 4th is completely safe. The 3-copies rule is your best friend.",
  },
  {
    prompt: "What's the first pass direction in the Charleston?",
    options: ["Left", "Across", "Right", "Any direction"],
    correctIndex: 2,
    explanation: "ROLLOR: Right first. The sequence is Right → Over (across) → Left, then Left → Over → Right.",
  },
  {
    prompt: "An opponent has 3 exposures. What's your strategy?",
    options: ["Keep building your hand", "Full defense — only safe tiles", "Call every tile you can", "Discard a Joker to distract them"],
    correctIndex: 1,
    explanation: "3+ exposures = one tile from Mahjong. Full defense: discard only tiles you KNOW they can't use.",
  },
  {
    prompt: "You self-drew Mahjong on a 25¢ hand (with Jokers). Each opponent pays…",
    options: ["25¢", "50¢", "$1.00", "$1.50"],
    correctIndex: 1,
    explanation: "Self-draw = all three pay double. 25¢ × 2 = 50¢ each. Jokerless bonus doesn't apply because you have Jokers.",
  },
  {
    prompt: 'What does saying "wait" do at the table?',
    options: ["Nothing", "Pauses the game so you can decide whether to call", "Ends the round", "Passes your turn"],
    correctIndex: 1,
    explanation: '"Wait" pauses the game so the next player doesn\'t draw. Take a few seconds to think, then call or pass.',
  },
  {
    prompt: "Nobody has discarded a single Crack all game. What does this mean?",
    options: ["Nothing", "Cracks are the hot suit — someone is collecting them", "Cracks are safe to discard", "The wall has all the Cracks"],
    correctIndex: 1,
    explanation: "The suit nobody discards is the hot suit. At least one player is hoarding Cracks. Avoid feeding them.",
  },
  {
    prompt: "You made a mistake at the table. What's the first thing to do?",
    options: ["Hope nobody noticed", "Stop everything and say so immediately", "Fix it silently", "Apologize 10 times"],
    correctIndex: 1,
    explanation: "Stop, speak up immediately, describe factually. Self-reported mistakes are almost always forgiven.",
  },
  {
    prompt: "How many tiles does each player start with?",
    options: ["12", "13 (East gets 14)", "14", "15"],
    correctIndex: 1,
    explanation: "Three players get 13 tiles. East (the dealer) gets 14 because East takes the first turn.",
  },
  {
    prompt: "Can you call a discard to complete a pair?",
    options: ["Yes, anytime", "Only for Mahjong — the one exception", "Never", "Only with permission"],
    correctIndex: 1,
    explanation: "Mahjong is the only time you can claim a discard for a pair or single — and only if it completes your entire hand.",
  },
  {
    prompt: "A discarded Joker sits in the center of the table. Can anyone grab it?",
    options: ["Yes — Jokers are always callable", "No — discarded Jokers are dead forever", "Only East", "Only on your turn"],
    correctIndex: 1,
    explanation: "A discarded Joker is dead. No one can call it, claim it, or use it. That's why nobody ever discards one.",
  },
  {
    prompt: "What should you do BEFORE racking your drawn tile?",
    options: ["Announce it", "Pause 2-3 seconds so others can call the previous discard", "Show it to the dealer", "Nothing"],
    correctIndex: 1,
    explanation: "The pause before racking gives other players time to call the previous discard. Once you rack, the window closes.",
  },
  {
    prompt: "After the deal, how many candidate hands should you keep in mind?",
    options: ["Just 1", "2 or 3", "All of them", "None — wait and see"],
    correctIndex: 1,
    explanation: "Keep 2–3 candidates. Narrow to 2 after the Charleston, then commit to 1 after 5–6 draws.",
  },
];

export function DailyPuzzle() {
  // Seed by date so everyone gets the same puzzle each day
  const todayIndex = useMemo(() => {
    const day = Math.floor(Date.now() / 86_400_000);
    return day % POOL.length;
  }, []);

  const puzzle = POOL[todayIndex];
  const [picked, setPicked] = useState<number | null>(null);
  const showFeedback = picked !== null;
  const correct = picked === puzzle.correctIndex;

  return (
    <div className="rounded-xl border-2 border-[var(--color-accent)] bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          Daily Puzzle
        </span>
        <span className="text-[10px] text-zinc-400">
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>

      <h3 className="mb-3 font-serif text-base font-black text-[var(--color-mid)]">
        {puzzle.prompt}
      </h3>

      <div className="space-y-1.5">
        {puzzle.options.map((opt, i) => {
          const isCorrect = i === puzzle.correctIndex;
          const isPicked = i === picked;
          let style =
            "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-[var(--color-mid)]";
          if (showFeedback) {
            if (isCorrect)
              style = "border-[var(--color-green)] bg-[#E8F5E9] text-[var(--color-green)] font-bold";
            else if (isPicked)
              style = "border-[var(--color-red)] bg-[#FDECEA] text-[var(--color-red)]";
            else style = "border-zinc-100 bg-zinc-50 text-zinc-300";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => setPicked((prev) => (prev !== null ? prev : i))}
              disabled={showFeedback}
              className={`w-full rounded-md border px-3 py-2 text-left text-[13px] transition disabled:cursor-default ${style}`}
            >
              {opt}
              {showFeedback && isCorrect && " ✓"}
              {showFeedback && isPicked && !isCorrect && " ✗"}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <p className="mt-3 rounded-md bg-[#F0F5FA] px-3 py-2 text-center text-[12px] text-zinc-600">
          {correct ? "✓ " : "✗ "}
          {puzzle.explanation}
        </p>
      )}
    </div>
  );
}
