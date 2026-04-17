"use client";

import { useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { Callout } from "@/components/Callout";
import { ModuleNav } from "@/components/ModuleNav";
import { Tile, TileType } from "@/components/Tile";
import { TileRow } from "@/components/TileRow";
import { getAdjacentModules } from "@/lib/modules";

/* ────────────────────────────────────────────────────────────────
 * Puzzle types
 * ──────────────────────────────────────────────────────────────── */

type TileSpec = { type: TileType; value?: number | string };

type TilePickPuzzle = {
  kind: "tile-pick";
  id: string;
  tag: string;
  prompt: string;
  context?: React.ReactNode;
  tiles: TileSpec[];
  correctIndex: number;
  explanation: React.ReactNode;
};

type ChoicePuzzle = {
  kind: "choice";
  id: string;
  tag: string;
  prompt: string;
  context?: React.ReactNode;
  options: string[];
  correctIndex: number;
  explanation: React.ReactNode;
};

type Puzzle = TilePickPuzzle | ChoicePuzzle;

/* ────────────────────────────────────────────────────────────────
 * The puzzle library
 * ──────────────────────────────────────────────────────────────── */

const PUZZLES: Puzzle[] = [
  // ── 1 — Easy discard ──
  {
    kind: "tile-pick",
    id: "p1",
    tag: "Discard · Beginner",
    prompt: "Which tile do you discard?",
    context: (
      <p>
        You&apos;re on an early turn. You&apos;re building toward an all-suits hand
        — Bams or Craks look strongest. Pick the tile that fits the <em>least</em>.
      </p>
    ),
    tiles: [
      { type: "bam", value: 1 },
      { type: "bam", value: 2 },
      { type: "bam", value: 3 },
      { type: "bam", value: 4 },
      { type: "bam", value: 5 },
      { type: "bam", value: 6 },
      { type: "bam", value: 7 },
      { type: "crack", value: 1 },
      { type: "crack", value: 2 },
      { type: "crack", value: 3 },
      { type: "crack", value: 4 },
      { type: "crack", value: 5 },
      { type: "dot", value: 9 },
    ],
    correctIndex: 12,
    explanation: (
      <>
        The <strong>9 Dot</strong>{" "}is the only tile that fits neither of your forming
        suits. Discard tiles that fit none of your candidate hands first.
        It&apos;s isolated and useless to you.
      </>
    ),
  },

  // ── 2 — Dead honor discard ──
  {
    kind: "choice",
    id: "p2",
    tag: "Discard · Honor management",
    prompt: "You're committed to a Bam-focused hand. Which tiles are the first to go?",
    context: (
      <div className="flex flex-wrap items-end justify-center gap-1.5">
        <Tile type="bam" value={5} size="sm" />
        <Tile type="bam" value={5} size="sm" />
        <Tile type="bam" value={6} size="sm" />
        <Tile type="bam" value={7} size="sm" />
        <Tile type="bam" value={8} size="sm" />
        <Tile type="bam" value={9} size="sm" />
        <Tile type="dragon" value="green" size="sm" />
        <Tile type="dragon" value="green" size="sm" />
        <Tile type="crack" value={1} size="sm" marked />
        <Tile type="crack" value={2} size="sm" marked />
        <Tile type="crack" value={3} size="sm" marked />
        <Tile type="wind" value="E" size="sm" marked />
        <Tile type="joker" size="sm" />
      </div>
    ),
    options: [
      "The East Wind and the Craks — they don't fit a Bam hand",
      "The Green Dragons — they're honors, not Bams",
      "The Joker — it doesn't match anything",
      "The pair of 5 Bams — too common",
    ],
    correctIndex: 0,
    explanation: (
      <>
        The <strong>East Wind and 3 Craks</strong>{" "}are all dead weight — none fit
        a Bam hand. Discard the East Wind first (lone honors are dangerous to hold),
        then the Craks over the next turns. The Green Dragon pair has potential
        (dragons pair with suits). The Joker is <strong>never</strong>{" "}a discard.
      </>
    ),
  },

  // ── 4 — Joker placement (multi-choice) ──
  {
    kind: "choice",
    id: "p4",
    tag: "Jokers · The pair rule",
    prompt: "You just drew a Joker. Where CAN it legally go?",
    context: (
      <>
        <p>Your hand has these incomplete groups:</p>
        <div className="my-2 flex flex-wrap items-end justify-center gap-3">
          <div className="text-center">
            <div className="flex gap-1">
              <Tile type="crack" value={5} size="sm" />
              <Tile type="crack" value={5} size="sm" />
            </div>
            <div className="mt-1 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
              Pair of 5C
            </div>
          </div>
          <div className="text-center">
            <div className="flex gap-1">
              <Tile type="dot" value={4} size="sm" />
              <Tile type="dot" value={4} size="sm" />
            </div>
            <div className="mt-1 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
              Pair of 4D (need Pung)
            </div>
          </div>
          <div className="text-center">
            <div className="flex gap-1">
              <Tile type="bam" value={7} size="sm" />
              <Tile type="bam" value={7} size="sm" />
            </div>
            <div className="mt-1 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
              Pair of 7B (need Pung)
            </div>
          </div>
        </div>
      </>
    ),
    options: [
      "Into the pair of 5 Crak",
      "Into the 4 Dot group (becoming a Pung)",
      "Into the 7 Bam group (becoming a Pung)",
      "Either of the two Pung groups, but never the pair",
    ],
    correctIndex: 3,
    explanation: (
      <>
        Jokers can substitute in any group of <strong>3 or more identical tiles</strong>{" "}
        — so either of the Pungs-in-progress works, completing them at 3 tiles. Jokers{" "}
        <strong>can never</strong>{" "}be used in a pair, full stop. That&apos;s the pair
        rule.
      </>
    ),
  },

  // ── 5 — Best Charleston pass ──
  {
    kind: "choice",
    id: "p5",
    tag: "Charleston · First pass",
    prompt: "First Charleston pass — you need to pick 3 tiles to pass right. Which 3?",
    context: (
      <div className="flex flex-wrap items-end justify-center gap-1.5">
        <Tile type="bam" value={5} size="sm" />
        <Tile type="bam" value={5} size="sm" />
        <Tile type="bam" value={6} size="sm" />
        <Tile type="bam" value={7} size="sm" />
        <Tile type="bam" value={8} size="sm" />
        <Tile type="bam" value={9} size="sm" />
        <Tile type="dragon" value="green" size="sm" />
        <Tile type="dragon" value="green" size="sm" />
        <Tile type="crack" value={1} size="sm" marked />
        <Tile type="crack" value={2} size="sm" marked />
        <Tile type="crack" value={3} size="sm" marked />
        <Tile type="wind" value="E" size="sm" />
        <Tile type="joker" size="sm" />
      </div>
    ),
    options: [
      "East Wind + 2 Craks — pass the junk that doesn't fit your Bam direction",
      "The Joker + 2 Craks — get rid of the wild card early",
      "The Green Dragon pair + East Wind — honors aren't useful",
      "3 Bams — pass what you have the most of",
    ],
    correctIndex: 0,
    explanation: (
      <>
        <strong>East Wind + 2 Craks.</strong>{" "}The East Wind is a lone honor
        (dead weight) and the Craks don&apos;t fit your Bam direction. The
        Green Dragon pair has value (dragons pair with Bams). The Joker is{" "}
        <strong>never</strong>{" "}passed. Never pass Bams when you&apos;re building Bams.
      </>
    ),
  },

  // ── 7 — Call decision (early game) ──
  {
    kind: "choice",
    id: "p7",
    tag: "Calling · When NOT to call",
    prompt: "Should you call this tile?",
    context: (
      <p>
        It&apos;s <strong>Turn 2</strong> — very early. You have 2 of the 5 Crak in
        your rack and the player on your left just discarded a 5 Crak. You haven&apos;t
        committed to a single candidate hand yet — you&apos;re still flexible
        between two or three.
      </p>
    ),
    options: [
      "Yes — never miss a free Pung",
      "No — calling now exposes the group and locks you out of other hand options. Stay flexible.",
      "Yes, but only if you discard a Joker",
      "Only if it's the dealer's discard",
    ],
    correctIndex: 1,
    explanation: (
      <>
        Calling commits you. Once the Pung is exposed, you can&apos;t
        rebuild toward a hand that doesn&apos;t use 5 Crak. Early in the game,
        flexibility beats commitment. Wait until you&apos;ve narrowed down to one
        primary candidate before calling.
      </>
    ),
  },

  // ── 8 — Recovery ──
  {
    kind: "choice",
    id: "p8",
    tag: "Recovery · Mistakes",
    prompt: "What do you do?",
    context: (
      <p>
        You just announced &quot;Four Bam&quot; as you placed a discarded tile, but
        the moment you let go you realize you actually placed a <strong>Four
        Crak</strong>. The next player is reaching for the wall.
      </p>
    ),
    options: [
      "Stay quiet and hope nobody noticed",
      "Stop everything immediately and say 'Hold on — I misnamed that, it's actually 4 Crak'",
      "Pick the tile back up and re-name it",
      "Apologize over and over until the table forgets",
    ],
    correctIndex: 1,
    explanation: (
      <>
        The 4-step recovery: <strong>stop, speak up immediately, describe
        factually</strong>. If you correct it before any player acts on the wrong
        name, you usually escape clean. Hiding it risks the misnamed-discard
        penalty (NMJL Article 67) — the most expensive mistake in the game if Mahjong
        is called on it.
      </>
    ),
  },

  // ── 9 — Discard: suit commitment ──
  {
    kind: "choice",
    id: "p9",
    tag: "Discard · Suit commitment",
    prompt: "You've committed to an all-Bam hand. Your hand has 10 Bams, a Joker, a 3 Crak, and a 7 Dot. Which tiles do you discard first?",
    context: (
      <div className="flex flex-wrap items-end justify-center gap-1.5">
        <Tile type="bam" value={1} size="sm" />
        <Tile type="bam" value={1} size="sm" />
        <Tile type="bam" value={3} size="sm" />
        <Tile type="bam" value={5} size="sm" />
        <Tile type="bam" value={5} size="sm" />
        <Tile type="bam" value={7} size="sm" />
        <Tile type="bam" value={7} size="sm" />
        <Tile type="bam" value={9} size="sm" />
        <Tile type="bam" value={9} size="sm" />
        <Tile type="bam" value={9} size="sm" />
        <Tile type="joker" size="sm" />
        <Tile type="crack" value={3} size="sm" marked />
        <Tile type="dot" value={7} size="sm" marked />
      </div>
    ),
    options: [
      "The 3 Crak and 7 Dot — both are junk, discard them over the next two turns",
      "The Joker — it's not a Bam",
      "A pair of Bams to stay flexible",
      "The 3 Bam — it's a lonely single",
    ],
    correctIndex: 0,
    explanation: (
      <>
        <strong>Both the 3 Crak and 7 Dot</strong>{" "}are junk — neither fits your
        all-Bam hand. Discard them over your next two turns (the hotter tile
        first). Never discard a Joker, and don&apos;t break your Bam groups.
      </>
    ),
  },

  // ── 11 — Charleston: what NOT to pass ──
  {
    kind: "choice",
    id: "p11",
    tag: "Charleston · Never pass",
    prompt: "Your Charleston pass includes these 3 tiles. Which one should you NOT pass?",
    context: (
      <div className="flex flex-wrap items-end justify-center gap-2">
        <Tile type="wind" value="N" size="sm" />
        <Tile type="joker" size="sm" />
        <Tile type="dot" value={9} size="sm" />
      </div>
    ),
    options: [
      "North Wind",
      "Joker — never pass a Joker",
      "9 Dot",
      "They're all fine to pass",
    ],
    correctIndex: 1,
    explanation: (
      <>
        <strong>Never pass a Joker.</strong>{" "}Jokers are the most valuable tiles in
        the game and cannot legally be passed in the Charleston. The North Wind and
        9 Dot are both fine junk to pass.
      </>
    ),
  },

  // ── 14 — Joker exchange: can you swap? ──
  {
    kind: "choice",
    id: "p14",
    tag: "Jokers · Exchange legality",
    prompt: "Can you do this joker exchange?",
    context: (
      <>
        <p>
          An opponent has an exposed Pung of 8 Bam with a Joker. You have a
          real 8 Bam in your hand. It&apos;s your turn, and you just drew from
          the wall.
        </p>
        <TileRow background="felt" caption="Opponent's exposed group">
          <Tile type="bam" value={8} size="sm" highlighted />
          <Tile type="bam" value={8} size="sm" highlighted />
          <Tile type="joker" size="sm" highlighted />
        </TileRow>
      </>
    ),
    options: [
      "Yes — you have the real tile, it's your turn, and you haven't discarded yet",
      "No — you can only exchange before drawing",
      "No — you need two real tiles to exchange",
      "Only if the opponent agrees",
    ],
    correctIndex: 0,
    explanation: (
      <>
        Yes — all conditions are met: it&apos;s your turn, you have the exact
        real tile the Joker is standing for, and you haven&apos;t discarded yet.
        Hand the 8 Bam to the opponent and take the Joker.
      </>
    ),
  },

  // ── 15 — Calling: late game vs early game ──
  {
    kind: "choice",
    id: "p15",
    tag: "Calling · Timing",
    prompt: "It's Turn 14 (late game). You have 2 of the 3 Crak and need a Pung for your hand. Someone discards a 3 Crak. Call?",
    options: [
      "No — calling always exposes too much",
      "Yes — it's late, you need it, and your hand is committed. Take it.",
      "Only if the wall is empty",
      "Only if you have a Joker to trade later",
    ],
    correctIndex: 1,
    explanation: (
      <>
        Late-game calling is completely different from early-game. You&apos;re
        already committed to a hand and the wall is running out. Passing on a
        tile you need now could mean never seeing it again. The principle:
        <em> wide early, narrow late</em>.
      </>
    ),
  },

  // ── 16 — Discard: break a pair for defense ──
  {
    kind: "choice",
    id: "p16",
    tag: "Defense · Fold decision",
    prompt: "An opponent has 3 exposures (they're one tile from Mahjong). You're far from winning. What do you do?",
    options: [
      "Keep building your hand — you might catch up",
      "Switch to full defense: discard only tiles you KNOW they can't use, even if it means breaking your own pairs",
      "Discard a Joker to throw them off",
      "Call 'stop' to end the round",
    ],
    correctIndex: 1,
    explanation: (
      <>
        3 exposures = full defense mode. Stop trying to win and start
        discarding only guaranteed-safe tiles. Break your own forming groups
        if needed — your pairs are now a source of safe discards, not future
        Pungs. <strong>Never</strong>{" "}discard a Joker.
      </>
    ),
  },

  // ── 19 — Defense: reading the hot suit ──
  {
    kind: "choice",
    id: "p19",
    tag: "Defense · Hot suit",
    prompt: "Nobody at the table has discarded a single Dot all game. Three players have discarded Craks freely. What does this tell you?",
    options: [
      "Nothing — it's random",
      "Dots are the 'hot' suit — at least one player is hoarding them. Avoid discarding Dots.",
      "Craks are the hot suit",
      "You should collect Dots too",
    ],
    correctIndex: 1,
    explanation: (
      <>
        The suit nobody is discarding is the <strong>hot suit</strong> —
        someone is collecting it. Discarding Dots is risky because you could
        be feeding that player exactly what they need. Craks are the cold
        suit: everyone is dumping them, so they&apos;re safer.
      </>
    ),
  },

  // ── 22 — Calling: Mahjong on a pair ──
  {
    kind: "choice",
    id: "p22",
    tag: "Calling · Mahjong special case",
    prompt: "You need one more 7 Bam to complete a PAIR for Mahjong. Someone discards a 7 Bam. Can you call it?",
    options: [
      "No — you can only call for groups of 3 or more",
      "Yes — Mahjong is the ONLY time you can claim a discard for a pair or single",
      "Only if you have a Joker",
      "Only on your own turn",
    ],
    correctIndex: 1,
    explanation: (
      <>
        Mahjong is the one exception to the &quot;calls are for groups of 3+&quot;
        rule. If that one tile completes your <em>entire</em>{" "}winning hand — even
        if it&apos;s just completing a pair — you can call it.
      </>
    ),
  },

  // ── 24 — Mid-game commitment ──
  {
    kind: "choice",
    id: "p24",
    tag: "Strategy · Commit to a hand",
    prompt: "After 6 draws you're split between Bams and Craks. Which direction do you commit to, and what goes first?",
    context: (
      <div className="flex flex-wrap items-end justify-center gap-1.5">
        <Tile type="bam" value={3} size="sm" />
        <Tile type="bam" value={3} size="sm" />
        <Tile type="bam" value={3} size="sm" />
        <Tile type="bam" value={5} size="sm" />
        <Tile type="bam" value={5} size="sm" />
        <Tile type="bam" value={7} size="sm" />
        <Tile type="bam" value={7} size="sm" />
        <Tile type="crack" value={2} size="sm" />
        <Tile type="crack" value={4} size="sm" />
        <Tile type="crack" value={6} size="sm" />
        <Tile type="dragon" value="red" size="sm" />
        <Tile type="joker" size="sm" />
        <Tile type="joker" size="sm" />
      </div>
    ),
    options: [
      "Commit to Bams — drop the Red Dragon first, then the Craks over the next turns",
      "Commit to Craks — drop the Bam triples",
      "Stay flexible — keep everything",
      "Commit to Bams — drop the Jokers first since they're not Bams",
    ],
    correctIndex: 0,
    explanation: (
      <>
        <strong>Commit to Bams.</strong>{" "}You have a triple (3s), two pairs (5s
        and 7s), plus 2 Jokers — a strong foundation. The Craks are scattered
        singles with no pairs. Drop the <strong>Red Dragon first</strong>{" "}(lone
        honor, fits neither direction), then the Craks over the next turns.
        Jokers are <strong>never</strong>{" "}discarded.
      </>
    ),
  },

  // ── 26 — Dead hand: what happens next ──
  {
    kind: "choice",
    id: "p26",
    tag: "Mistakes · Dead hand",
    prompt: "Your hand just went dead (you made a bad call). What do you do for the rest of the round?",
    options: [
      "Leave the table",
      "Stop discarding to avoid helping anyone",
      "Keep drawing and discarding normally — you can't win, but you still pay the winner",
      "Shuffle your tiles back into the wall",
    ],
    correctIndex: 2,
    explanation: (
      <>
        Dead hands keep playing. You draw, you discard, you name your tiles.
        You just can&apos;t win. Many experienced players use dead hands for
        <strong> pure defense</strong> — discarding only safe tiles since
        there&apos;s nothing left to build.
      </>
    ),
  },

  // ── 28 — Joker: pair rule reinforcement ──
  {
    kind: "choice",
    id: "p28",
    tag: "Jokers · Pair rule",
    prompt: "Your hand needs a pair of 9 Dots to win. You have one real 9 Dot and one Joker. Is the pair complete?",
    options: [
      "Yes — the Joker fills in for the second 9 Dot",
      "No — Jokers CANNOT substitute in a pair. You need a second real 9 Dot.",
      "Only if you have two Jokers",
      "Only in a Singles & Pairs hand",
    ],
    correctIndex: 1,
    explanation: (
      <>
        <strong>No.</strong>{" "}The pair rule is absolute: Jokers can never
        substitute in a pair. You need <em>two real</em> 9 Dots. This is
        the #1 Joker mistake beginners make.
      </>
    ),
  },
];

/* ────────────────────────────────────────────────────────────────
 * The component
 * ──────────────────────────────────────────────────────────────── */

type Phase = "intro" | "playing" | "complete";

export default function Module13Practice() {
  const adj = getAdjacentModules(15);
  const total = PUZZLES.length;
  const passThreshold = Math.ceil(total * 0.7); // 70% to "pass"

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
    if (i === PUZZLES[index].correctIndex) setScore((s) => s + 1);
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
    <PageWrap>
      <Cover
        eyebrow="MAHJ — Lesson 16"
        title="Practice Hands"
        highlight="Library"
        subtitle="Now you make the calls. Real puzzles, instant feedback."
      />


      {phase === "intro" && (
        <PuzzleShell>
          <div className="text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
              Practice Library
            </p>
            <h3 className="mb-3 font-serif text-2xl font-black text-[var(--color-mid)]">
              🎯 {total} Live Puzzles
            </h3>
            <p className="mb-5 text-sm text-zinc-600">
              Each puzzle is a real decision point: discards, calling, joker rules,
              defense, recovery. Pick your answer, see why it&apos;s right (or
              isn&apos;t), and move on.
            </p>
            <p className="mb-5 text-xs italic text-zinc-500">
              Suggested target: get at least <strong>{passThreshold} of {total}</strong> right. You can replay anytime.
            </p>
            <button
              type="button"
              onClick={start}
              className="rounded-md bg-[var(--color-mid)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              Start practice →
            </button>
          </div>
        </PuzzleShell>
      )}

      {phase === "complete" && (
        <PuzzleShell>
          <div className="text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
              Practice complete
            </p>
            <div className="mb-2 font-serif text-6xl font-black text-[var(--color-mid)]">
              {score} <span className="text-zinc-400">/ {total}</span>
            </div>
            <p className="mb-2 text-base">
              {score >= passThreshold
                ? "🎉 Strong work — you're table-ready."
                : "Almost — review the modules you struggled with and try again."}
            </p>
            <p className="mb-5 text-sm italic text-zinc-500">
              {score >= passThreshold
                ? "Congratulations — you've completed the entire MAHJ curriculum."
                : "Practice is the only way these decisions become instincts."}
            </p>
            <button
              type="button"
              onClick={start}
              className="rounded-md bg-[var(--color-mid)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              Play again
            </button>
          </div>
        </PuzzleShell>
      )}

      {phase === "playing" && (
        <PuzzlePlaying
          puzzle={PUZZLES[index]}
          index={index}
          total={total}
          score={score}
          picked={picked}
          onPick={pick}
          onNext={next}
        />
      )}

      <Callout variant="info">
        <strong>This is the end of MAHJ&apos;s curriculum.</strong>{" "}When you can
        complete this library confidently, you&apos;re ready to sit down at a real
        table. From there, the only remaining teacher is playing actual games.
      </Callout>

      <ModuleNav
        currentModuleNum={15}
        prev={
          adj.prev && {
            href: adj.prev.href,
            name: `Lesson ${adj.prev.num + 1}: ${adj.prev.name}`,
          }
        }
      />
    </PageWrap>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Sub-components
 * ──────────────────────────────────────────────────────────────── */

function PuzzleShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border-2 border-[var(--color-accent)] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] sm:p-9">
      {children}
    </div>
  );
}

function PuzzlePlaying({
  puzzle,
  index,
  total,
  score,
  picked,
  onPick,
  onNext,
}: {
  puzzle: Puzzle;
  index: number;
  total: number;
  score: number;
  picked: number | null;
  onPick: (i: number) => void;
  onNext: () => void;
}) {
  const showFeedback = picked !== null;
  const correct = picked === puzzle.correctIndex;

  return (
    <PuzzleShell>
      <div className="mb-3 flex items-center justify-between text-[13px] uppercase tracking-wider">
        <span className="font-bold text-[var(--color-accent)]">
          Puzzle {index + 1} of {total}
        </span>
        <span className="text-zinc-500">
          {puzzle.tag} · Score: {score}
        </span>
      </div>

      <h4 className="mb-3 font-serif text-lg font-black text-[var(--color-mid)] md:text-xl">
        {puzzle.prompt}
      </h4>

      {puzzle.context && (
        <div className="mb-4 rounded-lg bg-[var(--color-light)] p-3 text-[14px] text-zinc-700">
          {puzzle.context}
        </div>
      )}

      {puzzle.kind === "tile-pick" ? (
        <TilePickBoard
          tiles={puzzle.tiles}
          correctIndex={puzzle.correctIndex}
          picked={picked}
          onPick={onPick}
        />
      ) : (
        <ChoiceBoard
          options={puzzle.options}
          correctIndex={puzzle.correctIndex}
          picked={picked}
          onPick={onPick}
        />
      )}

      {showFeedback && (
        <div className="mt-5">
          <p className="text-center text-base font-bold">
            {correct ? "✓ Correct!" : "✗ Not quite."}
          </p>
          <div className="mt-2 rounded-md bg-[#E8F5EC] p-3 text-center text-[13px] text-zinc-700">
            {puzzle.explanation}
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onNext}
              className="rounded-md bg-[var(--color-mid)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              {index + 1 >= total ? "See results →" : "Next puzzle →"}
            </button>
          </div>
        </div>
      )}
    </PuzzleShell>
  );
}

function TilePickBoard({
  tiles,
  correctIndex,
  picked,
  onPick,
}: {
  tiles: TileSpec[];
  correctIndex: number;
  picked: number | null;
  onPick: (i: number) => void;
}) {
  return (
    <div className="my-3 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-light)] p-4">
      <div className="flex flex-wrap items-end justify-center gap-2">
        {tiles.map((t, i) => {
          const isPicked = picked === i;
          const isCorrect = i === correctIndex;
          const showFeedback = picked !== null;
          let ring = "";
          if (showFeedback) {
            if (isCorrect)
              ring =
                "ring-4 ring-[var(--color-green)] ring-offset-2 ring-offset-[var(--color-light)]";
            else if (isPicked)
              ring =
                "ring-4 ring-[var(--color-red)] ring-offset-2 ring-offset-[var(--color-light)] opacity-60";
            else ring = "opacity-50";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => onPick(i)}
              disabled={showFeedback}
              className={`rounded-md transition disabled:cursor-default ${
                !showFeedback ? "hover:-translate-y-1" : ""
              } ${ring}`}
              aria-label={`Tile ${i + 1}`}
            >
              <Tile type={t.type} value={t.value} size="sm" />
            </button>
          );
        })}
      </div>
      {picked === null && (
        <p className="mt-3 text-center text-[12px] italic text-zinc-500">
          Tap the tile that answers the question.
        </p>
      )}
    </div>
  );
}

function ChoiceBoard({
  options,
  correctIndex,
  picked,
  onPick,
}: {
  options: string[];
  correctIndex: number;
  picked: number | null;
  onPick: (i: number) => void;
}) {
  const showFeedback = picked !== null;
  return (
    <div className="my-3 space-y-2">
      {options.map((opt, i) => {
        const isCorrect = i === correctIndex;
        const isPicked = picked === i;
        let style =
          "bg-white border-[#C9BC8A] text-[var(--color-mid)] hover:border-[var(--color-mid)] hover:-translate-y-0.5";
        if (showFeedback) {
          if (isCorrect)
            style =
              "bg-[#E8F5E9] border-[var(--color-green)] text-[var(--color-green)] font-bold";
          else if (isPicked)
            style =
              "bg-[#FDECEA] border-[var(--color-red)] text-[var(--color-red)] font-bold";
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
  );
}
