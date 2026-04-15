"use client";

import { useState } from "react";
import { Tile, TileType } from "@/components/Tile";

/* ────────────────────────────────────────────────────────────────
 * Scenario data
 * ──────────────────────────────────────────────────────────────── */

type TileSpec = { type: TileType; value?: number | string };

type Exposure = {
  player: string;
  tiles: TileSpec[];
};

type Scenario = {
  id: string;
  tag: string;
  prompt: string;
  exposures: Exposure[];
  discardInfo?: string;
  options: string[];
  correctIndex: number;
  explanation: React.ReactNode;
};

const SCENARIOS: Scenario[] = [
  // ── 1. Basic: 3-copies safe ──
  {
    id: "d1",
    tag: "Beginner",
    prompt: "Which tile is 100% safe to discard?",
    exposures: [
      {
        player: "Player A",
        tiles: [
          { type: "bam", value: 3 },
          { type: "bam", value: 3 },
          { type: "bam", value: 3 },
        ],
      },
    ],
    discardInfo: "Discard pile: two 6 Dots, one 9 Crak, one West Wind.",
    options: ["5 Bam", "6 Dot", "9 Crak", "West Wind"],
    correctIndex: 1,
    explanation: (
      <>
        <strong>6 Dot</strong> is safest — 2 copies are already in the discard
        pile, so fewer remain. Player A is building Bams, so avoid Bams.
        The 9 Crak and West Wind only have 1 copy visible each.
      </>
    ),
  },

  // ── 2. Same-suit read ──
  {
    id: "d2",
    tag: "Beginner",
    prompt: "Player A has two Bam exposures. Which discard is safest?",
    exposures: [
      {
        player: "Player A",
        tiles: [
          { type: "bam", value: 2 },
          { type: "bam", value: 2 },
          { type: "bam", value: 2 },
        ],
      },
      {
        player: "Player A",
        tiles: [
          { type: "bam", value: 8 },
          { type: "bam", value: 8 },
          { type: "bam", value: 8 },
        ],
      },
    ],
    options: ["4 Bam", "7 Crak", "6 Bam", "1 Bam"],
    correctIndex: 1,
    explanation: (
      <>
        <strong>7 Crak</strong> — Player A is clearly on an all-Bam hand.
        Every Bam you throw is a gift. Craks are a different suit entirely
        and no one has shown interest in them.
      </>
    ),
  },

  // ── 3. Winds-and-dragons read ──
  {
    id: "d3",
    tag: "Medium",
    prompt: "Which discard is safest?",
    exposures: [
      {
        player: "Player B",
        tiles: [
          { type: "dragon", value: "red" },
          { type: "dragon", value: "red" },
          { type: "dragon", value: "red" },
        ],
      },
      {
        player: "Player B",
        tiles: [
          { type: "wind", value: "N" },
          { type: "wind", value: "N" },
          { type: "wind", value: "N" },
        ],
      },
    ],
    discardInfo: "Player B has discarded several Bams and Dots early.",
    options: ["South Wind", "Green Dragon", "3 Bam", "5 Dot"],
    correctIndex: 2,
    explanation: (
      <>
        <strong>3 Bam</strong> — Player B is on a winds-and-dragons hand (Red
        Dragon + North Wind exposed). They&apos;ve been dumping Bams and Dots —
        those suits are cold for them. South Wind and Green Dragon are
        extremely dangerous (they likely need more honors).
      </>
    ),
  },

  // ── 4. Like-numbers read ──
  {
    id: "d4",
    tag: "Medium",
    prompt: "Player C exposed Pung of 5 Crak and Pung of 5 Dot. Which tile is the most dangerous to discard?",
    exposures: [
      {
        player: "Player C",
        tiles: [
          { type: "crack", value: 5 },
          { type: "crack", value: 5 },
          { type: "crack", value: 5 },
        ],
      },
      {
        player: "Player C",
        tiles: [
          { type: "dot", value: 5 },
          { type: "dot", value: 5 },
          { type: "dot", value: 5 },
        ],
      },
    ],
    options: ["5 Bam", "2 Crak", "8 Dot", "East Wind"],
    correctIndex: 0,
    explanation: (
      <>
        <strong>5 Bam</strong>{" "}is extremely dangerous. Player C has Pungs of 5
        Crak and 5 Dot — they&apos;re almost certainly on a like-numbers hand
        built around 5s. The missing group is probably 5 Bam. Feeding them
        a 5 Bam could hand them Mahjong.
      </>
    ),
  },

  // ── 5. Full defense — 3 exposures ──
  {
    id: "d5",
    tag: "Medium",
    prompt: "Player A has 3 exposures. You're far from winning. What's your strategy?",
    exposures: [
      {
        player: "Player A",
        tiles: [
          { type: "dot", value: 1 },
          { type: "dot", value: 1 },
          { type: "dot", value: 1 },
        ],
      },
      {
        player: "Player A",
        tiles: [
          { type: "dot", value: 3 },
          { type: "dot", value: 3 },
          { type: "dot", value: 3 },
        ],
      },
      {
        player: "Player A",
        tiles: [
          { type: "dot", value: 5 },
          { type: "dot", value: 5 },
          { type: "dot", value: 5 },
          { type: "joker" },
        ],
      },
    ],
    options: [
      "Keep building your hand — you might catch up",
      "Full defense: discard only tiles guaranteed safe for Player A. Break your own pairs if needed.",
      "Discard all your Dots to clear them out",
      "Call the next tile you can to speed up",
    ],
    correctIndex: 1,
    explanation: (
      <>
        <strong>Full defense.</strong> 3 exposures means Player A is one tile
        from Mahjong. They&apos;re all-Dots. Stop building your hand — discard
        only Bams, Craks, and honors you&apos;re sure they can&apos;t use.
        Break your own pairs if needed. Surviving without paying is a win.
      </>
    ),
  },

  // ── 6. Two opponents, cross-read ──
  {
    id: "d6",
    tag: "Advanced",
    prompt: "Two opponents with exposures. Which discard is safest?",
    exposures: [
      {
        player: "Player A (Bams)",
        tiles: [
          { type: "bam", value: 4 },
          { type: "bam", value: 4 },
          { type: "bam", value: 4 },
        ],
      },
      {
        player: "Player B (Craks)",
        tiles: [
          { type: "crack", value: 7 },
          { type: "crack", value: 7 },
          { type: "crack", value: 7 },
        ],
      },
    ],
    discardInfo:
      "Discard pile: three 2 Dots already discarded. You hold the 4th.",
    options: ["6 Bam", "3 Crak", "2 Dot (the 4th copy)", "Red Dragon"],
    correctIndex: 2,
    explanation: (
      <>
        <strong>2 Dot</strong> — the 4th copy is 100% safe because 3 are
        already in the discard pile. Nobody can ever Pung or Kong it. Bams
        are dangerous for Player A, Craks for Player B, and Red Dragon is
        unknown. When in doubt, use the 3-copies rule.
      </>
    ),
  },

  // ── 7. Hot suit detection ──
  {
    id: "d7",
    tag: "Medium",
    prompt: "Nobody has discarded a single Crak all game. Several Bams and Dots have been discarded. What does this tell you?",
    exposures: [],
    discardInfo:
      "Discards so far: 3B, 5B, 7B, 2D, 4D, 8D, NW, EW. Zero Craks.",
    options: [
      "Nothing — it's early",
      "Craks are the hot suit — someone is hoarding them. Avoid discarding Craks.",
      "Everyone must have Craks in their hand, so discard yours",
      "Bams and Dots are the hot suits",
    ],
    correctIndex: 1,
    explanation: (
      <>
        <strong>Craks are hot.</strong>{" "}The complete absence of Crak discards
        means at least one player is collecting them. Any Crak you throw could
        be called instantly. Bams and Dots are cold — everyone is dumping them.
      </>
    ),
  },

  // ── 8. 0 exposures — concealed hand read ──
  {
    id: "d8",
    tag: "Advanced",
    prompt: "Player C has 0 exposures but hasn't discarded any Dots all game. They just drew and smiled. What should you avoid discarding?",
    exposures: [],
    discardInfo:
      "Player C's discards: EW, SW, NW, GD, RD, 1B, 5B, 7C. Zero Dots.",
    options: [
      "Bams — they discarded some",
      "Dots — they've discarded zero, likely hoarding them (possibly concealed hand)",
      "Winds — they already dumped theirs",
      "It doesn't matter — 0 exposures means no info",
    ],
    correctIndex: 1,
    explanation: (
      <>
        <strong>Avoid Dots.</strong> 0 exposures doesn&apos;t mean no info —
        their <em>discards</em>{" "}are a tell. They&apos;ve dumped every suit
        except Dots, plus all their honors. They&apos;re almost certainly on
        a concealed Dots hand. The smile confirms it. Track what&apos;s{" "}
        <em>not</em>{" "}being thrown.
      </>
    ),
  },

  // ── 9. Fold vs fight ──
  {
    id: "d9",
    tag: "Medium",
    prompt: "You're 4 tiles away from Mahjong. Player B has 2 exposures. The wall is about half gone. What do you do?",
    exposures: [
      {
        player: "Player B",
        tiles: [
          { type: "crack", value: 3 },
          { type: "crack", value: 3 },
          { type: "crack", value: 3 },
        ],
      },
      {
        player: "Player B",
        tiles: [
          { type: "crack", value: 6 },
          { type: "crack", value: 6 },
          { type: "crack", value: 6 },
        ],
      },
    ],
    options: [
      "Full defense — fold immediately",
      "Keep building but play defensively: avoid discarding Craks, use safe tiles when possible",
      "Ignore them and play full offense",
      "Call every tile you can to race them",
    ],
    correctIndex: 1,
    explanation: (
      <>
        <strong>Build + defend.</strong> 2 exposures is serious but not
        &quot;fold everything.&quot; You&apos;re 4 tiles away with half the
        wall left — still viable. The key: avoid Craks (Player B&apos;s suit)
        and use safe tiles where you have options. Full fold comes at 3+
        exposures or when the wall gets short.
      </>
    ),
  },

  // ── 10. The Joker in their exposure ──
  {
    id: "d10",
    tag: "Advanced",
    prompt: "Player A has a Pung with a Joker in it. You have the real tile. Should you exchange before focusing on defense?",
    exposures: [
      {
        player: "Player A",
        tiles: [
          { type: "dot", value: 7 },
          { type: "dot", value: 7 },
          { type: "joker" },
        ],
      },
    ],
    discardInfo: "You have a real 7 Dot in your hand. It's your turn.",
    options: [
      "No — exchanging helps them by giving them a real tile",
      "Yes — you gain a Joker (hugely valuable) and their Pung was already complete anyway",
      "Only if you're winning",
      "Never exchange when an opponent has exposures",
    ],
    correctIndex: 1,
    explanation: (
      <>
        <strong>Yes, exchange.</strong>{" "}Their Pung is already complete with or
        without the Joker — swapping changes nothing for them. But you gain
        a Joker, which is the most flexible tile in the game. Even if
        you&apos;re playing defense, a Joker in hand gives you options.
        Always scan for exchange opportunities.
      </>
    ),
  },
];

/* ────────────────────────────────────────────────────────────────
 * The component
 * ──────────────────────────────────────────────────────────────── */

type Phase = "intro" | "playing" | "complete";

export function DefenseDrill() {
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

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === SCENARIOS[index].correctIndex) setScore((s) => s + 1);
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
            🛡️ Read the Table
          </h3>
          <p className="mb-5 text-sm text-zinc-600">
            {total} scenarios. Read exposures and discards, then pick the
            safest tile to throw — or fold.
          </p>
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-[var(--color-mid)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Start drill →
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
              ? "🎉 Solid defensive instincts — you read exposures, track discards, and know when to fold."
              : "Defense takes practice. Re-read Module 7 and try again — the patterns will click."}
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
  picked: number | null;
  onPick: (i: number) => void;
  onNext: () => void;
}) {
  const showFeedback = picked !== null;

  return (
    <>
      <div className="mb-3 flex items-center justify-between text-[13px] uppercase tracking-wider">
        <span className="font-bold text-[var(--color-accent)]">
          Scenario {index + 1} of {total}
        </span>
        <span className="text-zinc-500">{scenario.tag} · Score: {score}</span>
      </div>

      <h4 className="mb-4 font-serif text-lg font-black text-[var(--color-mid)]">
        {scenario.prompt}
      </h4>

      {/* Exposures */}
      {scenario.exposures.length > 0 && (
        <div className="mb-4 space-y-3">
          {scenario.exposures.map((exp, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 bg-white p-3">
              <div className="mb-1.5 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
                {exp.player}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 rounded bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] p-2">
                {exp.tiles.map((t, j) => (
                  <Tile key={j} type={t.type} value={t.value} size="sm" highlighted />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discard info */}
      {scenario.discardInfo && (
        <p className="mb-4 rounded-md bg-[var(--color-light)] px-3 py-2 text-[13px] italic text-zinc-600">
          {scenario.discardInfo}
        </p>
      )}

      {/* Options */}
      <div className="space-y-2">
        {scenario.options.map((opt, i) => {
          const isCorrect = i === scenario.correctIndex;
          const isPicked = picked === i;
          let style =
            "bg-white border-zinc-300 text-[var(--color-mid)] hover:border-[var(--color-mid)] hover:-translate-y-0.5";
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
              onClick={() => onPick(i)}
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
            {picked === scenario.correctIndex ? "✓ Correct!" : "✗ Not quite."}
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
