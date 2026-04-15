"use client";

import { useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
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
        suits. Module 6: discard tiles that fit none of your candidate hands first.
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

  // ── 3 — Safest discard (defense, multi-choice) ──
  {
    kind: "choice",
    id: "p3",
    tag: "Defense · Reading the table",
    prompt: "Which of these is the SAFEST tile to discard?",
    context: (
      <>
        <p>Mid-game. The table situation:</p>
        <ul className="ml-5 list-disc space-y-1 text-[13px] text-zinc-700">
          <li>
            <strong>Player across:</strong>{" "}Pung of 3 Bam + Pung of 6 Bam exposed
          </li>
          <li>
            <strong>Player on your right:</strong>{" "}Pung of West Wind exposed
          </li>
          <li>
            <strong>The discard pile</strong>{" "}already contains{" "}
            <strong>three Red Dragons</strong>{" "}from earlier turns
          </li>
        </ul>
      </>
    ),
    options: ["4 Bam", "Red Dragon", "East Wind", "5 Bam"],
    correctIndex: 1,
    explanation: (
      <>
        <strong>Red Dragon</strong>{" "}is completely safe. Three are already in the
        discard pile, so no one can ever Pung or Kong the 4th — Module 7&apos;s
        3-of-a-tile safe rule. The Bams are dangerous (player across is on Bams).
        East Wind is dangerous too (right player is on winds-and-dragons).
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
        <strong>can never</strong>{" "}be used in a pair, full stop. Module 5&apos;s pair
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

  // ── 6 — Joker pung legality ──
  {
    kind: "choice",
    id: "p6",
    tag: "Calling · Joker rules",
    prompt: "Is this a valid exposed Pung?",
    context: (
      <>
        <p>A player just called a discard and exposed this Pung:</p>
        <TileRow background="felt">
          <Tile type="bam" value={5} size="sm" highlighted />
          <Tile type="bam" value={5} size="sm" highlighted />
          <Tile type="joker" size="sm" highlighted />
        </TileRow>
      </>
    ),
    options: [
      "Yes — Jokers can substitute in any group of 3 or more",
      "No — you can't have a Joker in an exposed group",
      "No — you need 3 real tiles for a Pung",
      "Only if it's your turn",
    ],
    correctIndex: 0,
    explanation: (
      <>
        Yes — perfectly legal. A Pung is 3 of a kind, and Jokers can substitute in
        any group of 3+ identical tiles (Pungs, Kongs, Quints). Module 5. The only
        place a Joker <em>cannot</em>{" "}go is a pair or single.
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
        Module 5 + 6: calling commits you. Once the Pung is exposed, you can&apos;t
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
        Module 10&apos;s 4-step recovery: <strong>stop, speak up immediately, describe
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

  // ── 10 — Defense: reading two opponents ──
  {
    kind: "choice",
    id: "p10",
    tag: "Defense · Two threats",
    prompt: "Which discard is safest?",
    context: (
      <>
        <p>Late game. Two opponents have exposures:</p>
        <ul className="ml-5 list-disc space-y-1 text-[13px] text-zinc-700">
          <li><strong>Player A:</strong>{" "}Pung of 5 Crak + Pung of 5 Dot exposed</li>
          <li><strong>Player B:</strong>{" "}Pung of Green Dragon exposed</li>
          <li><strong>Discard pile:</strong>{" "}two 8 Bams already discarded</li>
        </ul>
      </>
    ),
    options: [
      "5 Bam (Player A probably wants it for like-numbers)",
      "Red Dragon (Player B might need it for dragons hand)",
      "8 Bam (two already discarded — only 2 remain)",
      "North Wind (nobody has shown interest in winds)",
    ],
    correctIndex: 3,
    explanation: (
      <>
        <strong>North Wind</strong>{" "}is safest. Player A is on a like-numbers 5s
        hand — 5 Bam is extremely dangerous. Player B has dragons exposed — Red
        Dragon could help them. 8 Bam has 2 discarded but 2 still live. North
        Wind hasn&apos;t appeared in any exposure or pattern. Module 7: read
        what&apos;s <em>not</em>{" "}being collected.
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
        9 Dot are both fine junk to pass. Module 4.
      </>
    ),
  },

  // ── 12 — Scoring: self-draw calculation ──
  {
    kind: "choice",
    id: "p12",
    tag: "Scoring · Self-draw",
    prompt: "You self-drew Mahjong on a hand worth 25¢ (with jokers in your hand). How much does EACH opponent pay?",
    options: ["25¢", "50¢", "75¢", "$1.00"],
    correctIndex: 1,
    explanation: (
      <>
        Self-draw = all three opponents pay <strong>double</strong>{" "}the hand value.
        25¢ × 2 = 50¢ each. Jokerless bonus does NOT apply because you have jokers.
        Module 9.
      </>
    ),
  },

  // ── 13 — Defense: 3-of-tile rule applied ──
  {
    kind: "tile-pick",
    id: "p13",
    tag: "Defense · Safe discard",
    prompt: "The discard pile has 3 of the 6 Dot. You're holding the 4th. Is it safe? Tap the safest discard.",
    context: (
      <p>
        Your hand — you must discard one. The 4th 6 Dot is guaranteed safe
        because 3 are already visible.
      </p>
    ),
    tiles: [
      { type: "bam", value: 3 },
      { type: "bam", value: 5 },
      { type: "bam", value: 7 },
      { type: "crack", value: 2 },
      { type: "crack", value: 4 },
      { type: "crack", value: 6 },
      { type: "dot", value: 1 },
      { type: "dot", value: 3 },
      { type: "dot", value: 5 },
      { type: "dot", value: 6 },
      { type: "dragon", value: "red" },
      { type: "dragon", value: "red" },
      { type: "joker" },
    ],
    correctIndex: 9,
    explanation: (
      <>
        The <strong>6 Dot</strong>{" "}is 100% safe. Three copies are already in the
        discard pile, so no one can ever Pung or Kong it. Module 7: once 3 of a
        tile are visible, the 4th is always safe.
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
        Hand the 8 Bam to the opponent and take the Joker. Module 5.
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
        tile you need now could mean never seeing it again. Module 5 + 6:
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
        Pungs. <strong>Never</strong>{" "}discard a Joker. Module 7.
      </>
    ),
  },

  // ── 17 — Which junk to drop first ──
  {
    kind: "choice",
    id: "p17",
    tag: "Discard · Junk tiles",
    prompt: "Your hand has 2 junk tiles — a lone Soap and a lone 8 Crak. Which do you discard first?",
    context: (
      <div className="flex flex-wrap items-end justify-center gap-1.5">
        <Tile type="bam" value={2} size="sm" />
        <Tile type="bam" value={2} size="sm" />
        <Tile type="bam" value={4} size="sm" />
        <Tile type="bam" value={4} size="sm" />
        <Tile type="bam" value={6} size="sm" />
        <Tile type="bam" value={6} size="sm" />
        <Tile type="dot" value={3} size="sm" />
        <Tile type="dot" value={3} size="sm" />
        <Tile type="dot" value={5} size="sm" />
        <Tile type="crack" value={8} size="sm" marked />
        <Tile type="dragon" value="white" size="sm" marked />
        <Tile type="joker" size="sm" />
        <Tile type="joker" size="sm" />
      </div>
    ),
    options: [
      "Soap first — lone honors are more dangerous to hold (someone might need it for a dragons hand)",
      "8 Crak first — middle numbers are hotter",
      "Either one — doesn't matter",
      "Neither — keep them both as defense",
    ],
    correctIndex: 0,
    explanation: (
      <>
        <strong>Soap first.</strong>{" "}Both are junk, but a lone honor is more
        dangerous to hold — someone building a winds-and-dragons hand could call
        it. The 8 Crak goes next turn. Both need to go, but order matters.
      </>
    ),
  },

  // ── 18 — Etiquette: racking timing ──
  {
    kind: "choice",
    id: "p18",
    tag: "Etiquette · Racking",
    prompt: "You just drew a tile from the wall. What should you do BEFORE placing it on your rack?",
    options: [
      "Look at it, then rack immediately",
      "Pause 2–3 seconds so other players can call the previous discard",
      "Show it to the player on your right",
      "Announce what you drew",
    ],
    correctIndex: 1,
    explanation: (
      <>
        The pause before racking is critical etiquette. Once your tile is
        racked, the previous discard can no longer be called. Counting to 3
        gives everyone time to react. Module 8.
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
        suit: everyone is dumping them, so they&apos;re safer. Module 7.
      </>
    ),
  },

  // ── 20 — Scoring: jokerless discard win ──
  {
    kind: "choice",
    id: "p20",
    tag: "Scoring · Jokerless bonus",
    prompt: "You win on a discard with a 25¢ hand and NO jokers. What does the discarder pay?",
    options: ["25¢", "50¢", "$1.00", "$2.00"],
    correctIndex: 2,
    explanation: (
      <>
        Discard win = discarder pays 2×. Jokerless = doubles again.
        25¢ × 2 (discard) × 2 (jokerless) = <strong>$1.00</strong>.
        The other two players pay 50¢ each (1× × 2 for jokerless). Module 9.
      </>
    ),
  },

  // ── 21 — Tile-pick: the Joker trap ──
  {
    kind: "tile-pick",
    id: "p21",
    tag: "Discard · Never discard",
    prompt: "You're frustrated and want to dump something. Which tile should you NEVER discard?",
    tiles: [
      { type: "crack", value: 1 },
      { type: "crack", value: 9 },
      { type: "dot", value: 2 },
      { type: "dot", value: 8 },
      { type: "wind", value: "W" },
      { type: "wind", value: "N" },
      { type: "dragon", value: "white" },
      { type: "bam", value: 4 },
      { type: "bam", value: 6 },
      { type: "bam", value: 7 },
      { type: "bam", value: 8 },
      { type: "bam", value: 9 },
      { type: "joker" },
    ],
    correctIndex: 12,
    explanation: (
      <>
        <strong>Never discard a Joker.</strong>{" "}A discarded Joker is dead —
        no one can call it, no one can use it. It&apos;s the most valuable tile
        in the game, always. Even when you&apos;re folding, even when you&apos;re
        frustrated. Module 5 + 6 discard priority: Jokers are permanently at
        the bottom of the list.
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
        if it&apos;s just completing a pair — you can call it. Module 5.
      </>
    ),
  },

  // ── 23 — Defense: counting exposures ──
  {
    kind: "choice",
    id: "p23",
    tag: "Defense · Threat level",
    prompt: "An opponent has exactly 1 exposure. How threatened should you feel?",
    options: [
      "Full defense — discard only safe tiles",
      "Moderate — they've committed to a direction. Avoid obviously matching tiles.",
      "Not at all — 1 exposure means nothing",
      "Panic and fold immediately",
    ],
    correctIndex: 1,
    explanation: (
      <>
        1 exposure = they&apos;ve committed to a direction. You can start reading
        their hand family (same-suit? like-numbers? dragons?). Avoid tiles that
        obviously match, but don&apos;t go full defense yet — that&apos;s for 3+
        exposures. Module 7.
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

  // ── 25 — Charleston: courtesy decision ──
  {
    kind: "choice",
    id: "p25",
    tag: "Charleston · Courtesy",
    prompt: "It's the courtesy pass. You're not sure what hand you're building yet. What do you say?",
    options: [
      "Three — trade as many as possible",
      "Two — compromise",
      "One — just in case",
      "Zero — you're not ready to trade strategically yet",
    ],
    correctIndex: 3,
    explanation: (
      <>
        <strong>Zero is the right default</strong>{" "}when you&apos;re unsure.
        The courtesy is a tool for when you&apos;re one specific tile away
        from a shape. If you don&apos;t know what you need, trading blindly
        could give away something you&apos;ll regret. Module 4.
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
        there&apos;s nothing left to build. Module 9 + 10.
      </>
    ),
  },

  // ── 27 — Tile-pick: advanced — sacrifice for defense ──
  {
    kind: "tile-pick",
    id: "p27",
    tag: "Defense · Advanced sacrifice",
    prompt: "Player across has 3 Bam exposures — one tile from Mahjong. You're folding. Which tile is safest to discard?",
    context: (
      <>
        <p>Their exposures are all Bams. You need to discard something safe.</p>
        <p className="mt-1 text-[12px] italic text-zinc-500">
          The discard pile already has: two 4 Craks and one 8 Dot.
        </p>
      </>
    ),
    tiles: [
      { type: "bam", value: 2 },
      { type: "bam", value: 6 },
      { type: "crack", value: 4 },
      { type: "crack", value: 7 },
      { type: "dot", value: 1 },
      { type: "dot", value: 3 },
      { type: "dot", value: 5 },
      { type: "dot", value: 8 },
      { type: "dragon", value: "green" },
      { type: "wind", value: "S" },
      { type: "wind", value: "W" },
      { type: "joker" },
      { type: "joker" },
    ],
    correctIndex: 2,
    explanation: (
      <>
        The <strong>4 Crak</strong>{" "}is the safest choice. Two are already in
        the discard pile (only 2 remain), and the threat player is on Bams —
        they have zero interest in Craks. Any Bam is extremely dangerous.
        The 8 Dot has only 1 copy discarded (3 still live). The honors are
        unknown. Module 7: combine &quot;already discarded&quot; with
        &quot;wrong suit for the threat.&quot;
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
        the #1 Joker mistake beginners make. Module 5.
      </>
    ),
  },
];

/* ────────────────────────────────────────────────────────────────
 * The component
 * ──────────────────────────────────────────────────────────────── */

type Phase = "intro" | "playing" | "complete";

export default function Module13Practice() {
  const adj = getAdjacentModules(13);
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
        eyebrow="MAHJ — Module 13"
        title="Practice Hands"
        highlight="Library"
        subtitle="Now you make the calls. Real puzzles, instant feedback."
      />

      <SectionHeader>Practice</SectionHeader>

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
        currentModuleNum={13}
        prev={
          adj.prev && {
            href: adj.prev.href,
            name: `Module ${adj.prev.num}: ${adj.prev.name}`,
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
