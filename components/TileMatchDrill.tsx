"use client";

import { useCallback, useEffect, useState } from "react";
import { Tile } from "./Tile";

/* ───── Types & data ───── */

type Suit = "bam" | "crack" | "dot";
type TileSpec =
  | { type: Suit; value: number }
  | { type: "wind"; value: "N" | "E" | "W" | "S" }
  | { type: "dragon"; value: "red" | "green" | "white" }
  | { type: "flower" | "season"; value: number }
  | { type: "joker" };

type MatchCard = {
  tile: TileSpec;
  claimedName: string;
  isMatch: boolean;
};

const CARD_COUNT = 10;
const PASS_THRESHOLD = 8;

function nameOf(tile: TileSpec): string {
  switch (tile.type) {
    case "bam":
      return `${tile.value} Bam`;
    case "crack":
      return `${tile.value} Crak`;
    case "dot":
      return `${tile.value} Dot`;
    case "wind":
      return { N: "North", E: "East", W: "West", S: "South" }[tile.value];
    case "dragon":
      return tile.value === "red"
        ? "Red"
        : tile.value === "green"
          ? "Green"
          : "Soap (White Dragon)";
    case "flower":
    case "season":
      return "Flower";
    case "joker":
      return "Joker";
  }
}

function randomTile(): TileSpec {
  const r = Math.random();
  if (r < 0.4) {
    const suits: Suit[] = ["bam", "crack", "dot"];
    return {
      type: suits[Math.floor(Math.random() * 3)],
      value: Math.floor(Math.random() * 9) + 1,
    };
  } else if (r < 0.55) {
    const winds = ["N", "E", "W", "S"] as const;
    return { type: "wind", value: winds[Math.floor(Math.random() * 4)] };
  } else if (r < 0.7) {
    const dragons = ["red", "green", "white"] as const;
    return { type: "dragon", value: dragons[Math.floor(Math.random() * 3)] };
  } else if (r < 0.85) {
    return { type: "flower", value: Math.floor(Math.random() * 4) + 1 };
  } else if (r < 0.95) {
    return { type: "season", value: Math.floor(Math.random() * 4) + 1 };
  } else {
    return { type: "joker" };
  }
}

function generateCards(n: number): MatchCard[] {
  return Array.from({ length: n }, () => {
    const tile = randomTile();
    const correctName = nameOf(tile);
    const isMatch = Math.random() < 0.5;
    if (isMatch) {
      return { tile, claimedName: correctName, isMatch: true };
    }
    // Mismatch — pick a random other tile's name
    let wrongName = correctName;
    let attempts = 0;
    while (wrongName === correctName && attempts < 10) {
      wrongName = nameOf(randomTile());
      attempts++;
    }
    return { tile, claimedName: wrongName, isMatch: false };
  });
}

function renderTile(spec: TileSpec) {
  if (spec.type === "joker") return <Tile type="joker" size="lg" />;
  return <Tile type={spec.type} value={spec.value} size="lg" />;
}

/* ───── Component ───── */

type Phase = "intro" | "playing" | "complete";
type Feedback = "correct" | "wrong" | null;

export function TileMatchDrill() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);

  function start() {
    setCards(generateCards(CARD_COUNT));
    setIndex(0);
    setScore(0);
    setFeedback(null);
    setPhase("playing");
  }

  const answer = useCallback(
    (saidMatch: boolean) => {
      if (feedback !== null) return;
      const card = cards[index];
      const correct = saidMatch === card.isMatch;
      setFeedback(correct ? "correct" : "wrong");
      if (correct) setScore((s) => s + 1);
      setTimeout(() => {
        if (index + 1 >= CARD_COUNT) {
          setPhase("complete");
        } else {
          setIndex((i) => i + 1);
          setFeedback(null);
        }
      }, correct ? 900 : 2000);
    },
    [cards, index, feedback]
  );

  // Keyboard support: ← = no match, → = match
  useEffect(() => {
    if (phase !== "playing") return;
    function handler(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        answer(false);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        answer(true);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, answer]);

  /* ── INTRO ── */
  if (phase === "intro") {
    return (
      <DrillShell>
        <div className="text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
            Practice Drill
          </p>
          <h3 className="mb-3 font-serif text-2xl font-black">🃏 Tile Match</h3>
          <p className="mb-2 text-sm text-zinc-300">
            We&apos;ll show you 10 tiles, each with a name. Tell us if the name
            matches the tile.
          </p>
          <p className="mb-5 hidden sm:block text-xs text-zinc-400">
            You can also use{" "}
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">←</kbd>{" "}
            and{" "}
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[13px]">→</kbd>{" "}
            on your keyboard.
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
            Tile Match — Results
          </p>
          <div className="mb-2 font-serif text-6xl font-black text-[var(--color-accent)]">
            {score} <span className="text-zinc-500">/ {CARD_COUNT}</span>
          </div>
          <p className="mb-5 text-base">
            {passed
              ? "🎉 Excellent — your tile recognition is sharp!"
              : "Almost there. Try again to push your speed."}
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
  const card = cards[index];

  return (
    <DrillShell>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          Card {index + 1} of {CARD_COUNT}
        </span>
        <span className="text-xs text-zinc-400">Score: {score}</span>
      </div>

      {/* Card */}
      <div
        className={`relative mx-auto max-w-xs rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition ${
          feedback === "correct"
            ? "ring-4 ring-[var(--color-green)]"
            : feedback === "wrong"
              ? "ring-4 ring-[var(--color-red)]"
              : ""
        }`}
      >
        <p className="mb-1 text-center font-serif text-2xl font-black text-[var(--color-mid)]">
          &ldquo;{card.claimedName}&rdquo;
        </p>
        <p className="mb-4 text-center text-[13px] font-bold uppercase tracking-wider text-zinc-500">
          Does this match?
        </p>
        <div className="flex justify-center">{renderTile(card.tile)}</div>

        {/* Feedback badge in corner */}
        {feedback && (
          <div
            className={`absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full text-3xl font-black text-white shadow-lg ${
              feedback === "correct" ? "bg-[var(--color-green)]" : "bg-[var(--color-red)]"
            }`}
          >
            {feedback === "correct" ? "✓" : "✗"}
          </div>
        )}
      </div>

      {/* "Actually: X" hint when the card was a mismatch */}
      <div className="mt-3 h-6 text-center text-sm font-bold text-[var(--color-accent)]">
        {feedback && !card.isMatch && (
          <>
            Actually:{" "}
            <span className="font-serif text-white">{nameOf(card.tile)}</span>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={feedback !== null}
          onClick={() => answer(false)}
          className="rounded-md border-2 border-[var(--color-red)] bg-white px-4 py-4 text-sm font-bold uppercase tracking-wider text-[var(--color-red)] transition disabled:opacity-50 enabled:hover:-translate-y-0.5"
        >
          ← No match
        </button>
        <button
          type="button"
          disabled={feedback !== null}
          onClick={() => answer(true)}
          className="rounded-md border-2 border-[var(--color-green)] bg-white px-4 py-4 text-sm font-bold uppercase tracking-wider text-[var(--color-green)] transition disabled:opacity-50 enabled:hover:-translate-y-0.5"
        >
          Match →
        </button>
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
