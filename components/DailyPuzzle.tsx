"use client";

import { useState, useMemo } from "react";
import { Tile, TileType } from "@/components/Tile";

/* ── Minimal puzzle type ── */

type TileSpec = { type: TileType; value?: number | string };

type DailyPuzzleData = {
  prompt: string;
  context?: string;
  tiles?: TileSpec[];
  options: string[];
  correctIndex: number;
  explanation: string;
};

const POOL: DailyPuzzleData[] = [
  // ── Joker rules ──
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
    prompt: "A discarded Joker sits in the center of the table. Can anyone grab it?",
    options: ["Yes — Jokers are always callable", "No — discarded Jokers are dead forever", "Only East", "Only on your turn"],
    correctIndex: 1,
    explanation: "A discarded Joker is dead. No one can call it, claim it, or use it. That's why nobody ever discards one.",
  },
  {
    prompt: "You see a Joker in an opponent's exposed Pung. Can you take it?",
    options: ["No — exposed tiles are locked", "Yes — swap in the matching natural tile from your hand", "Only if it's your turn", "Only if you ask permission"],
    correctIndex: 1,
    explanation: "If you hold the natural tile that matches the group, you can swap it for the Joker on your turn. It's called a Joker exchange.",
  },
  {
    prompt: "How many Jokers are in an American Mahjong set?",
    options: ["4", "6", "8", "10"],
    correctIndex: 2,
    explanation: "There are 8 Jokers in an American Mahjong set. They're wild in groups of 3 or more.",
  },
  // ── Defense & table reading ──
  {
    prompt: "3 copies of the 5 Bam are already visible. Is the 4th safe to discard?",
    options: ["No — someone might still need it", "Yes — 100% safe, nobody can Pung or Kong it", "Only late game", "Only if you're folding"],
    correctIndex: 1,
    explanation: "Once 3 copies are visible, the 4th is completely safe. The 3-copies rule is your best friend.",
  },
  {
    prompt: "An opponent has 3 exposures. What's your strategy?",
    options: ["Keep building your hand", "Full defense — only safe tiles", "Call every tile you can", "Discard a Joker to distract them"],
    correctIndex: 1,
    explanation: "3+ exposures = one tile from Mahjong. Full defense: discard only tiles you KNOW they can't use.",
  },
  {
    prompt: "Nobody has discarded a single Crack all game. What does this mean?",
    options: ["Nothing", "Cracks are the hot suit — someone is collecting them", "Cracks are safe to discard", "The wall has all the Cracks"],
    correctIndex: 1,
    explanation: "The suit nobody discards is the hot suit. At least one player is hoarding Cracks. Avoid feeding them.",
  },
  {
    prompt: "An opponent exposes a Pung of East Winds. What do you know?",
    options: ["Nothing useful", "They're likely working on a Winds & Dragons hand", "They need more East Winds", "They're bluffing"],
    correctIndex: 1,
    explanation: "Exposed honor tiles signal a Winds & Dragons hand or a hand that uses honors. Watch what else they expose.",
  },
  {
    prompt: "Two opponents are both discarding Dots. What does that tell you?",
    options: ["Dots are safe to discard", "Dots are dangerous", "Both are collecting Dots", "Nothing"],
    correctIndex: 0,
    explanation: "If multiple players are dumping Dots, nobody wants them. Dots are likely safe to discard.",
  },
  {
    prompt: "When should you switch from offense to defense?",
    options: ["Never — always go for Mahjong", "When an opponent has 2+ exposures and you're far from winning", "Only in the last 10 tiles", "When you have Jokers"],
    correctIndex: 1,
    explanation: "If someone is close to winning and you're not, stop feeding them. Play safe tiles and minimize damage.",
  },
  // ── Charleston ──
  {
    prompt: "What's the first pass direction in the Charleston?",
    options: ["Left", "Across", "Right", "Any direction"],
    correctIndex: 2,
    explanation: "ROLLOR: Right first. The sequence is Right \u2192 Across \u2192 Left, then Left \u2192 Across \u2192 Right.",
  },
  {
    prompt: "Can you pass a Joker during the Charleston?",
    options: ["Yes", "No — never", "Only in the 2nd Charleston", "Only on the courtesy pass"],
    correctIndex: 1,
    explanation: "You can never pass a Joker during the Charleston. Keep every Joker you get.",
  },
  {
    prompt: "Who can stop the 2nd Charleston?",
    options: ["Only East", "Only the winner of the last game", "Any player", "Nobody — it's mandatory"],
    correctIndex: 2,
    explanation: "Any player can stop the 2nd Charleston. If someone stops it, you go straight to the optional courtesy pass.",
  },
  {
    prompt: "What is the courtesy pass?",
    options: ["A required 3-tile pass to the left", "An optional pass of 0\u20133 tiles with the player across", "A pass to the dealer", "A pass of your worst tiles"],
    correctIndex: 1,
    explanation: "The courtesy pass is optional. You and the player across exchange 0\u20133 tiles. Both must agree on how many.",
  },
  {
    prompt: "What's a blind pass?",
    options: ["Passing tiles without looking at what you received", "Passing tiles you just received without looking at them", "Passing random tiles face-down", "Passing to a random player"],
    correctIndex: 1,
    explanation: "A blind pass means passing tiles you just received (still face-down) without looking. It's allowed on the first Left and last Right passes.",
  },
  // ── Calling ──
  {
    prompt: "Can you call a discard to complete a pair?",
    options: ["Yes, anytime", "Only for Mahjong — the one exception", "Never", "Only with permission"],
    correctIndex: 1,
    explanation: "Mahjong is the only time you can claim a discard for a pair or single — and only if it completes your entire hand.",
  },
  {
    prompt: "Two players want the same discard. One calls Pung, one calls Mahjong. Who gets it?",
    options: ["The one closer to the discarder", "The one who called first", "Mahjong always wins", "They split the tile"],
    correctIndex: 2,
    explanation: "Mahjong always has priority over Pung or Kong, no matter the seating position.",
  },
  {
    prompt: "What happens to your hand when you call a Pung?",
    options: ["Nothing changes", "The 3 tiles go face-up in front of your rack", "You put them back in the wall", "You pass them to the discarder"],
    correctIndex: 1,
    explanation: "When you call, the group goes face-up (exposed) in front of your rack. Everyone can see it. You then discard to get back to 13 tiles.",
  },
  {
    prompt: "Can you call a tile if your hand is marked Concealed (C) on the card?",
    options: ["Yes, any call is fine", "Only for Mahjong", "Only Pung, not Kong", "No, never"],
    correctIndex: 1,
    explanation: "A Concealed hand means no exposures allowed — except the one call that wins you the game: Mahjong.",
  },
  // ── Scoring ──
  {
    prompt: "You self-drew Mahjong on a 25\u00A2 hand (with Jokers). Each opponent pays\u2026",
    options: ["25\u00A2", "50\u00A2", "$1.00", "$1.50"],
    correctIndex: 1,
    explanation: "Self-draw = all three pay double. 25\u00A2 \u00D7 2 = 50\u00A2 each. Jokerless bonus doesn't apply because you have Jokers.",
  },
  {
    prompt: "You win on someone's discard with a 50\u00A2 hand. Who pays what?",
    options: ["Everyone pays 50\u00A2", "Discarder pays $1.00, others pay 50\u00A2 each", "Discarder pays $1.50, others pay nothing", "Only the discarder pays"],
    correctIndex: 1,
    explanation: "Discard win: the discarder pays double (50\u00A2 \u00D7 2 = $1.00), the other two pay face value (50\u00A2 each).",
  },
  {
    prompt: "What's the Jokerless bonus?",
    options: ["Extra points for having no Jokers", "All payments are doubled if your winning hand has no Jokers", "You get to keep the Jokers", "Nothing — it's not a real rule"],
    correctIndex: 1,
    explanation: "If your winning hand uses zero Jokers, all payments double. It's a big reward for playing without the wild cards.",
  },
  {
    prompt: "Does the Jokerless bonus apply to Singles & Pairs hands?",
    options: ["Yes, it doubles payments", "No — Singles & Pairs already has the bonus built in", "Only if you self-drew", "Only for the discarder"],
    correctIndex: 1,
    explanation: "Singles & Pairs hands can't use Jokers by definition, so the Jokerless bonus is already baked into the hand's value.",
  },
  // ── Setup & dealing ──
  {
    prompt: "How many tiles does each player start with?",
    options: ["12", "13 (East gets 14)", "14", "15"],
    correctIndex: 1,
    explanation: "Three players get 13 tiles. East (the dealer) gets 14 because East takes the first turn.",
  },
  {
    prompt: "How many tiles are in an American Mahjong set?",
    options: ["136", "144", "148", "152"],
    correctIndex: 3,
    explanation: "152 tiles: 108 suited (3 suits \u00D7 9 values \u00D7 4 each), 16 Winds, 12 Dragons, 8 Flowers/Seasons, and 8 Jokers.",
  },
  {
    prompt: "How many stacks does each player build in their wall?",
    options: ["13", "17", "19", "21"],
    correctIndex: 2,
    explanation: "Each player builds 19 stacks of 2 tiles (38 tiles per wall). Four walls \u00D7 38 = 152 tiles total.",
  },
  {
    prompt: "Who deals first?",
    options: ["The youngest player", "The host", "East — determined by dice roll", "It doesn't matter"],
    correctIndex: 2,
    explanation: "East is the dealer. At the start of the game, players roll dice or draw winds to determine who sits East.",
  },
  // ── Etiquette ──
  {
    prompt: 'What does saying "wait" do at the table?',
    options: ["Nothing", "Pauses the game so you can decide whether to call", "Ends the round", "Passes your turn"],
    correctIndex: 1,
    explanation: '"Wait" pauses the game so the next player doesn\'t draw. Take a few seconds to think, then call or pass.',
  },
  {
    prompt: "You made a mistake at the table. What's the first thing to do?",
    options: ["Hope nobody noticed", "Stop everything and say so immediately", "Fix it silently", "Apologize 10 times"],
    correctIndex: 1,
    explanation: "Stop, speak up immediately, describe factually. Self-reported mistakes are almost always forgiven.",
  },
  {
    prompt: "What should you do BEFORE racking your drawn tile?",
    options: ["Announce it", "Pause 2\u20133 seconds so others can call the previous discard", "Show it to the dealer", "Nothing"],
    correctIndex: 1,
    explanation: "The pause before racking gives other players time to call the previous discard. Once you rack, the window closes.",
  },
  {
    prompt: "Is it okay to name the tile you're discarding?",
    options: ["No — keep it secret", "Yes — you must announce every discard clearly", "Only if someone asks", "Only for honors and flowers"],
    correctIndex: 1,
    explanation: "Always announce your discard clearly so everyone can hear. Say the tile name as you place it: '3 Bam,' 'Red Dragon,' etc.",
  },
  {
    prompt: "Can you look at tiles in the wall before they're dealt?",
    options: ["Yes, if they're yours", "No — all wall tiles stay face-down until drawn", "Only the bottom row", "Only East can look"],
    correctIndex: 1,
    explanation: "Wall tiles stay face-down. You only see a tile when you draw it. Peeking is a serious breach of etiquette.",
  },
  // ── Strategy ──
  {
    prompt: "After the deal, how many candidate hands should you keep in mind?",
    options: ["Just 1", "2 or 3", "All of them", "None — wait and see"],
    correctIndex: 1,
    explanation: "Keep 2\u20133 candidates. Narrow to 2 after the Charleston, then commit to 1 after 5\u20136 draws.",
  },
  {
    prompt: "You have 7 Bam tiles in your hand. What does this suggest?",
    options: ["Discard the Bams", "Look for an all-Bam hand on the card", "Switch to a different suit", "Nothing special"],
    correctIndex: 1,
    explanation: "Strong suit concentration is a big signal. Check the card for hands that use all one suit — you might be close.",
  },
  {
    prompt: "You have 4 even-numbered tiles and 2 Jokers. What section of the card should you check?",
    options: ["Consecutive Run", "2468", "Winds & Dragons", "Singles & Pairs"],
    correctIndex: 1,
    explanation: "Even-numbered tiles point toward 2468 hands. With Jokers to fill gaps, you might be closer than you think.",
  },
  {
    prompt: "Is it ever smart to break up a pair during the Charleston?",
    options: ["No — always keep pairs", "Yes — if the pair doesn't fit any of your candidate hands", "Only for honors", "Only if you have Jokers"],
    correctIndex: 1,
    explanation: "Pairs only matter if they fit a hand you're pursuing. A pair of 7 Dots is useless if you're going all-Bam.",
  },
  {
    prompt: "You're 1 tile away from Mahjong. An opponent has 3 exposures. What do you do?",
    options: ["Keep playing offense — you're almost there", "It depends on what tile you need and how safe it is to wait", "Immediately fold", "Call any tile you can"],
    correctIndex: 1,
    explanation: "Being 1 away is exciting, but consider: is your winning tile already dead? Is the opponent about to win? Balance risk and reward.",
  },
  // ── Tiles ──
  {
    prompt: "How many copies of each suited tile are in the set?",
    options: ["2", "3", "4", "It varies"],
    correctIndex: 2,
    explanation: "Every suited tile (1\u20139 of Bam, Crack, and Dot) has exactly 4 copies. Same for each Wind and Dragon.",
  },
  {
    prompt: "What makes Flowers and Seasons different from other tiles?",
    options: ["They're worth more points", "Each one is unique — only 1 copy of each", "They can substitute for any tile", "They're optional"],
    correctIndex: 1,
    explanation: "There's only 1 of each Flower and Season (8 total). Unlike suited tiles, you can't have duplicates.",
  },
  {
    prompt: "How many Dragons are there in the set?",
    options: ["3 (one of each)", "6 (two of each)", "12 (four of each)", "8"],
    correctIndex: 2,
    explanation: "Three types (Red, Green, White) \u00D7 4 copies each = 12 Dragon tiles total.",
  },
  // ── Dead hands & mistakes ──
  {
    prompt: "You accidentally expose a tile from your hand. What happens?",
    options: ["Nothing", "Your hand is dead — you pay all winners", "You skip a turn", "You put it back"],
    correctIndex: 1,
    explanation: "An accidental exposure kills your hand. You can't win, and you must pay as if you discarded the winning tile.",
  },
  {
    prompt: "What is a 'dead hand'?",
    options: ["A hand with no Jokers", "A hand that can no longer win due to an error", "A hand that's been folded", "A hand with too many tiles"],
    correctIndex: 1,
    explanation: "A dead hand can't win. This happens from wrong tile count, illegal exposure, or calling errors. You still play defense and must pay winners.",
  },
];

export function DailyPuzzle() {
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
        <span className="text-[13px] font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          Daily Puzzle
        </span>
        <span className="text-[13px] text-zinc-400">
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>

      <h3 className="mb-3 font-serif text-lg font-black text-[var(--color-mid)]">
        {puzzle.prompt}
      </h3>

      <div className="space-y-2">
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
              className={`w-full rounded-md border px-4 py-2.5 text-left text-[15px] transition disabled:cursor-default ${style}`}
            >
              {opt}
              {showFeedback && isCorrect && " \u2713"}
              {showFeedback && isPicked && !isCorrect && " \u2717"}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <p className="mt-3 rounded-md bg-[#E8F5EC] px-4 py-3 text-center text-[14px] leading-relaxed text-zinc-600">
          {correct ? "\u2713 " : "\u2717 "}
          {puzzle.explanation}
        </p>
      )}
    </div>
  );
}
