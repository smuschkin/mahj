"use client";

import { useMemo, useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
import { Callout } from "@/components/Callout";
import { ModuleNav } from "@/components/ModuleNav";
import { getAdjacentModules } from "@/lib/modules";

type Category =
  | "Tiles"
  | "Setup"
  | "Charleston"
  | "Calling"
  | "Strategy"
  | "Etiquette"
  | "Scoring"
  | "Mistakes";

type Entry = {
  term: string;
  category: Category;
  /** Comma-separated module numbers where it's introduced or used */
  modules: number[];
  definition: React.ReactNode;
  /** Optional alternative spellings / synonyms used for search */
  aliases?: string[];
};

/* ────────────────────────────────────────────────────────────────
 * The glossary data
 * ──────────────────────────────────────────────────────────────── */

const ENTRIES: Entry[] = [
  // ── A ──
  {
    term: "Article 67",
    category: "Etiquette",
    modules: [10],
    definition: (
      <>
        The official NMJL rule covering misnamed discards. If a player calls Mahjong
        on a misnamed tile, the Mahjong is valid and the misnamer alone pays the
        winner the full amount all three losers would have paid combined. The
        other two players pay nothing.
      </>
    ),
  },
  {
    term: "Jokerless bonus rule",
    category: "Scoring",
    modules: [11],
    definition: (
      <>
        The official NMJL rule covering the jokerless bonus: a winning hand
        with no jokers pays double the normal value. (The exact article number
        varies by rulebook edition — check your current NMJL card.)
      </>
    ),
    aliases: ["jokerless", "article 151"],
  },

  // ── B ──
  {
    term: "Bam (Bamboo)",
    category: "Tiles",
    modules: [1],
    definition: (
      <>
        One of the three suits, depicted with bamboo stalks. Numbered 1–9, 4 copies of
        each in the set.
      </>
    ),
    aliases: ["bamboo"],
  },
  {
    term: "Bettor",
    category: "Etiquette",
    modules: [10, 11],
    definition: (
      <>
        An optional fifth player who sits out a hand and bets on which of the four
        active players will win. If their pick wins, the bettor and the winner share
        the payouts. Uncommon in beginner groups.
      </>
    ),
  },
  {
    term: "Blind pass",
    category: "Charleston",
    modules: [4],
    definition: (
      <>
        A move on the first left (pass 3) or the last right (pass 6) where
        you push along 1, 2, or 3 tiles you just received{" "}
        <em>without looking at them</em>. Not allowed on the courtesy pass.
        Peeking before deciding is considered cheating.
      </>
    ),
  },
  {
    term: "Break the wall",
    category: "Setup",
    modules: [3],
    definition: (
      <>
        The Dealer (East) rolls the dice and breaks their own wall. The dice
        total tells you how many stacks in from the right end to split. The
        opening point is where the first tile is dealt.
      </>
    ),
  },

  // ── C ──
  {
    term: "Calling",
    category: "Calling",
    modules: [6],
    definition: (
      <>
        Claiming another player&apos;s discarded tile to complete a Pung, Kong, or
        Mahjong. You must say it out loud (&quot;Call!&quot; or &quot;Mahjong!&quot;)
        before the next player racks.
      </>
    ),
    aliases: ["call"],
  },
  {
    term: "Candidate hand",
    category: "Strategy",
    modules: [8],
    definition: (
      <>
        One of the 2–3 hands on the card you&apos;re building toward early in the
        game. The flexibility curve narrows from 3 → 2 → 1 candidates as the game
        progresses.
      </>
    ),
  },
  {
    term: "Card (NMJL Card)",
    category: "Strategy",
    modules: [8],
    definition: (
      <>
        The annual card published by the National Mah Jongg League listing every
        legal winning hand for that year, with its value, suit restrictions, and
        whether it&apos;s exposed (X) or concealed (C). Required to play officially.
      </>
    ),
  },
  {
    term: "Charleston",
    category: "Charleston",
    modules: [4],
    definition: (
      <>
        The unique 7-pass tile-trading ritual at the start of every American Mahjong
        hand. First Charleston (right → across → left) is mandatory; second
        Charleston (left → across → right) is optional. Followed by an optional
        courtesy pass.
      </>
    ),
  },
  {
    term: "Concealed hand (C)",
    category: "Calling",
    modules: [6, 11],
    definition: (
      <>
        A hand marked &quot;C&quot; on the card. You cannot call any tiles during
        play (you can still claim a discarded tile to win on Mahjong, but not
        before). Concealed hands are listed at higher base values than equivalent
        exposed hands — but the higher value is already in the printed number, NOT a
        payout multiplier.
      </>
    ),
    aliases: ["closed", "C"],
  },
  {
    term: "Courtesy pass",
    category: "Charleston",
    modules: [4],
    definition: (
      <>
        After both Charlestons, you and the player across may agree to trade 0–3
        tiles. Both players must agree on the same number. No jokers. Saying
        &quot;zero&quot; is always acceptable.
      </>
    ),
  },
  {
    term: "Curtsy (Curtsying the wall)",
    category: "Setup",
    modules: [3],
    definition: (
      <>
        Pushing the next wall forward and slightly diagonal so it can be dealt
        from when the current wall runs out. Used in Lesson 4.
      </>
    ),
    aliases: ["curtsying"],
  },
  {
    term: "Crak (Character)",
    category: "Tiles",
    modules: [1],
    definition: (
      <>
        One of the three suits, marked with the Chinese character for the number.
        Numbered 1–9, 4 copies of each in the set.
      </>
    ),
    aliases: ["character"],
  },

  // ── D ──
  {
    term: "Dead hand",
    category: "Mistakes",
    modules: [6, 11, 12],
    definition: (
      <>
        A hand that can no longer reach a valid winning position (because of an
        illegal call, wrong tile count, or other rule violation). The player keeps
        drawing and discarding normally but cannot win, and still pays the eventual
        winner.
      </>
    ),
  },
  {
    term: "Dealer",
    category: "Setup",
    modules: [3],
    definition: (
      <>
        The player who deals the round. The dealer is always East, gets 14 tiles
        (everyone else gets 13), and stays East as long as they keep winning or
        the hand ends in a wall game.
      </>
    ),
  },
  {
    term: "Discard",
    category: "Calling",
    modules: [6, 10],
    definition: (
      <>
        A tile placed face-up in the center of the table at the end of a turn. You
        must <strong>name it out loud</strong>{" "}as you place it. Other players may
        call it before the next player racks.
      </>
    ),
  },
  {
    term: "Discarder pays double",
    category: "Scoring",
    modules: [11],
    definition: (
      <>
        When a player wins on a discard, the discarder pays the winner 2× the hand
        value, while the other two players pay only 1×.
      </>
    ),
  },
  {
    term: "Dot (Circle)",
    category: "Tiles",
    modules: [1],
    definition: (
      <>
        One of the three suits, depicted as round circles or coins. Numbered 1–9,
        4 copies of each in the set.
      </>
    ),
    aliases: ["circle"],
  },
  {
    term: "Dragon",
    category: "Tiles",
    modules: [1],
    definition: (
      <>
        Honor tile. Three types: Red Dragon (中), Green Dragon (發), and White Dragon
        / Soap (blank or framed). 4 copies of each.
      </>
    ),
  },

  // ── E ──
  {
    term: "East",
    category: "Setup",
    modules: [3],
    definition: (
      <>
        The dealer position. Sits at the &quot;head&quot; of the play order; everyone
        else sits counter-clockwise from East (E → S → W → N).
      </>
    ),
  },
  {
    term: "Expose (Exposure)",
    category: "Calling",
    modules: [6],
    definition: (
      <>
        Laying a called group face-up at the front of your rack so all players can
        see it. Required when you call a Pung or Kong. Exposures cannot be taken
        back, and they reveal information to opponents — every exposure is a tell.
      </>
    ),
  },
  {
    term: "Exposed hand (X)",
    category: "Calling",
    modules: [6, 11],
    definition: (
      <>
        A hand marked &quot;X&quot; on the card. You may call tiles and expose groups
        during play. Easier to build than concealed hands, and worth less.
      </>
    ),
    aliases: ["X"],
  },

  // ── F ──
  {
    term: "False Mahjong",
    category: "Mistakes",
    modules: [11, 12],
    definition: (
      <>
        Calling Mahjong when your hand isn&apos;t actually valid. Per NMJL rules,
        your hand is dead — you keep playing but can&apos;t win, and you pay the
        winner normally. Some groups add an extra penalty, but that&apos;s a
        house rule.
      </>
    ),
  },
  {
    term: "First Charleston",
    category: "Charleston",
    modules: [4],
    definition: (
      <>
        The mandatory first three passes: right → across → left. Everyone must do all
        three. Cannot be skipped.
      </>
    ),
  },
  {
    term: "Flower",
    category: "Tiles",
    modules: [1],
    definition: (
      <>
        Special bonus tiles. There are 8 in the set (sometimes called 4 flowers + 4
        seasons, but at the American table they&apos;re all just &quot;Flowers&quot;).
        Used in specific hands on the card.
      </>
    ),
    aliases: ["season"],
  },
  {
    term: "Fold (Folding)",
    category: "Strategy",
    modules: [9],
    definition: (
      <>
        Shifting from playing to win to playing to <em>not lose</em>. You keep
        playing — drawing and discarding — but choose only the safest possible
        discards because an opponent is dangerously close to winning.
      </>
    ),
  },

  // ── H ──
  {
    term: "Honor tile",
    category: "Tiles",
    modules: [1],
    definition: (
      <>
        The non-suit tiles: Winds (E/S/W/N) and Dragons (Red/Green/Soap). They have
        no number and cannot form sequences — only Pungs, Kongs, or Pairs.
      </>
    ),
  },
  {
    term: "Hot suit",
    category: "Strategy",
    modules: [9],
    definition: (
      <>
        A suit that nobody at the table is discarding. Usually means at least one
        opponent is hoarding it. Avoid feeding the hot suit.
      </>
    ),
  },

  // ── J ──
  {
    term: "Joker",
    category: "Tiles",
    modules: [1, 6],
    definition: (
      <>
        The wild-card tile. There are 8 in the set. Jokers may substitute in any
        group of 3+ identical tiles (Pungs, Kongs, Quints), but{" "}
        <strong>never</strong>{" "}in a pair or single. Cannot be passed in the
        Charleston, cannot be called from the discard pile.
      </>
    ),
  },
  {
    term: "Joker exchange",
    category: "Calling",
    modules: [6, 12],
    definition: (
      <>
        On your turn, if any exposed group contains a joker and you have the real
        tile that joker stands for, you can swap your real tile for the joker. Hand
        the tile to the player whose rack holds the joker — never reach onto their
        rack yourself.
      </>
    ),
  },
  {
    term: "Jokerless bonus",
    category: "Scoring",
    modules: [11],
    definition: (
      <>
        A winning hand with no jokers pays double. Stacks with the discarder /
        self-draw bonus. <strong>Exception:</strong>{" "}Singles &amp; Pairs hands
        already have the bonus baked into the printed value — don&apos;t double them
        again.
      </>
    ),
  },

  // ── K ──
  {
    term: "Kong",
    category: "Calling",
    modules: [6],
    definition: (
      <>
        Four identical tiles. Can be made by drawing all four yourself, or by calling
        a discarded 4th when you already hold three. Jokers can substitute in a Kong.
      </>
    ),
  },

  // ── L ──
  {
    term: "Like-numbers hand",
    category: "Strategy",
    modules: [8, 9],
    definition: (
      <>
        A hand category built around the same number across multiple suits (e.g.
        groups of 5 Crak, 5 Bam, 5 Dot). Usually visible on the card under
        &quot;Like Numbers.&quot;
      </>
    ),
  },

  // ── M ──
  {
    term: "Mahjong (call)",
    category: "Calling",
    modules: [6, 10],
    definition: (
      <>
        The win declaration. You say &quot;Mahjong!&quot; the moment your 14 tiles
        match a hand on the card. Must be called <em>before</em>{" "}the next player
        racks their drawn tile.
      </>
    ),
  },
  {
    term: "Misnamed discard",
    category: "Etiquette",
    modules: [10, 12],
    definition: (
      <>
        Announcing a discarded tile by the wrong name. Covered by NMJL Article 67 —
        if Mahjong is called on a misnamed tile, the misnamer alone pays the winner
        the full amount all three losers would have paid combined. If an exposure
        is called on a misnamed tile, the caller&apos;s hand is dead instead.
      </>
    ),
  },

  // ── N ──
  {
    term: "Name your discard",
    category: "Etiquette",
    modules: [10],
    definition: (
      <>
        Official NMJL rule: every discard must be announced out loud as it&apos;s
        placed. Other players need to hear the tile name in order to call it.
      </>
    ),
  },
  {
    term: "NMJL",
    category: "Strategy",
    modules: [0, 8],
    definition: (
      <>
        The National Mah Jongg League — the organization that publishes the official
        annual card and standardized American Mahjong rules.
      </>
    ),
  },

  // ── P ──
  {
    term: "Pair",
    category: "Calling",
    modules: [6],
    definition: (
      <>
        Two identical tiles. Cannot be formed by calling (except as the final tile of
        a Mahjong claim). <strong>Jokers cannot substitute in a pair</strong>, ever.
      </>
    ),
  },
  {
    term: "Pause before racking",
    category: "Etiquette",
    modules: [10],
    definition: (
      <>
        Etiquette convention: after you draw a tile, count to about 3 before placing
        it on the sloped part of your rack. That pause is the window where any other
        player can call the previous discard. Racking too quickly can rob a
        legitimate call.
      </>
    ),
  },
  {
    term: "Picking ahead",
    category: "Mistakes",
    modules: [12],
    definition: (
      <>
        Drawing a tile from the wall before it&apos;s your turn. Treated as a serious
        error in NMJL rules — usually results in a dead hand if not caught
        immediately.
      </>
    ),
    aliases: ["drawing out of turn", "out of turn"],
  },
  {
    term: "Pung",
    category: "Calling",
    modules: [6],
    definition: (
      <>
        Three identical tiles. Can be made by drawing them yourself or by calling a
        discarded 3rd when you already hold a pair. Jokers can substitute in a Pung.
      </>
    ),
  },

  // ── Q ──
  {
    term: "Quint",
    category: "Calling",
    modules: [6],
    definition: (
      <>
        Five identical tiles — yes, that exists in some hands on the card. Built with
        a combination of real tiles and jokers, since only 4 of any tile exist
        naturally.
      </>
    ),
  },

  // ── R ──
  {
    term: "Rack",
    category: "Tiles",
    modules: [1, 10],
    definition: (
      <>
        The wooden tile holder in front of each player. Has a sloped front face
        (where your hand sits, hidden from others) and a flat top edge (where
        exposed groups go).
      </>
    ),
  },
  {
    term: "Reading the wall",
    category: "Strategy",
    modules: [8, 9],
    definition: (
      <>
        Tracking which tiles have been discarded or exposed so you know what&apos;s
        still &quot;live.&quot; Once 3 of a tile are visible, the 4th is completely
        safe to discard.
      </>
    ),
  },
  {
    term: "ROLLOR",
    category: "Charleston",
    modules: [4],
    definition: (
      <>
        Mnemonic for the Charleston sequence: <strong>R</strong>ight → <strong>O</strong>ver (across) → <strong>L</strong>eft → <strong>L</strong>eft → <strong>O</strong>ver → <strong>R</strong>ight → optional courtesy. The two halves mirror each other around the &quot;LL&quot; in the middle.
      </>
    ),
  },

  // ── S ──
  {
    term: "Same-suit hand",
    category: "Strategy",
    modules: [8, 9],
    definition: (
      <>
        A hand category that requires all groups to be in a single suit (all Bams,
        all Craks, or all Dots). Listed on the card as &quot;Same Color&quot; or
        similar.
      </>
    ),
  },
  {
    term: "Second Charleston",
    category: "Charleston",
    modules: [4],
    definition: (
      <>
        The optional second round of three passes (left → across → right) that
        happens after the first Charleston. <strong>Any single player</strong>{" "}can
        call &quot;stop&quot; to skip it without explanation.
      </>
    ),
  },
  {
    term: "Self-draw (Self-pick)",
    category: "Scoring",
    modules: [11],
    definition: (
      <>
        Drawing your winning tile from the wall yourself, with no discard involved.
        All three other players pay double. Also called a &quot;wall hand.&quot;
      </>
    ),
    aliases: ["self pick", "wall hand"],
  },
  {
    term: "Sextet",
    category: "Calling",
    modules: [6],
    definition: (
      <>
        Six of a kind. Appears on some NMJL hand patterns. Like Quints, jokers
        may substitute.
      </>
    ),
  },
  {
    term: "Singles & Pairs",
    category: "Strategy",
    modules: [6, 8, 11],
    definition: (
      <>
        A hand category made entirely of pairs and single tiles. <strong>Jokers
        cannot be used anywhere</strong>{" "}in a Singles &amp; Pairs hand. The
        jokerless bonus is already baked into the printed value, so don&apos;t
        double these at payout.
      </>
    ),
  },

  // ── T ──
  {
    term: "Tells (Reading exposures)",
    category: "Strategy",
    modules: [9],
    definition: (
      <>
        The information leak when an opponent calls and exposes. Every exposure tells
        you their suit focus, number focus, and likely hand category. Your defense
        depends on reading them.
      </>
    ),
  },

  // ── W ──
  {
    term: "Wall",
    category: "Setup",
    modules: [3],
    definition: (
      <>
        The 4-sided structure of stacked tiles in the middle of the table at the
        start of the game. Each side is built by one player: 19 tiles long, 2 high.
      </>
    ),
  },
  {
    term: "Wall game",
    category: "Scoring",
    modules: [11],
    definition: (
      <>
        A hand where the wall runs out before anyone calls Mahjong. <strong>No
        payments are made.</strong>{" "}Reshuffle and redeal.
      </>
    ),
  },
  {
    term: "Wash",
    category: "Setup",
    modules: [3],
    definition: (
      <>
        The shuffle. All 152 tiles are placed face-down and mixed by hand before
        building the wall.
      </>
    ),
  },
  {
    term: "Wind",
    category: "Tiles",
    modules: [1],
    definition: (
      <>
        Honor tile. Four types — East (東), South (南), West (西), North (北) — with
        4 copies of each. Used in specific hands on the card and to mark seating
        positions.
      </>
    ),
  },

  // ── Y ──
  {
    term: "Year hand",
    category: "Strategy",
    modules: [8],
    definition: (
      <>
        A hand built around the digits of the current year (e.g. 2-0-2-6 for 2026).
        Often the easiest place for a beginner to start, since the digits are usually
        easy to spot in your starting tiles.
      </>
    ),
  },
];

const CATEGORY_COLORS: Record<Category, string> = {
  Tiles: "bg-[#F4FBF6] text-[var(--color-green)] border-[var(--color-green)]",
  Setup: "bg-[#E8F5EC] text-[var(--color-accent)] border-[var(--color-accent)]",
  Charleston: "bg-[#FFFBEC] text-[var(--color-accent)] border-[var(--color-border)]",
  Calling: "bg-[#FFF6F4] text-[var(--color-red)] border-[var(--color-red)]",
  Strategy: "bg-[#E8F5EC] text-[var(--color-accent)] border-[var(--color-accent)]",
  Etiquette: "bg-[#FFFBEC] text-[var(--color-accent)] border-[var(--color-border)]",
  Scoring: "bg-[#F4FBF6] text-[var(--color-green)] border-[var(--color-green)]",
  Mistakes: "bg-[#FFF6F4] text-[var(--color-red)] border-[var(--color-red)]",
};

/* ────────────────────────────────────────────────────────────────
 * The component
 * ──────────────────────────────────────────────────────────────── */

export default function Module11Glossary() {
  const adj = getAdjacentModules(13);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const sorted = useMemo(
    () =>
      [...ENTRIES].sort((a, b) =>
        a.term.toLowerCase().localeCompare(b.term.toLowerCase()),
      ),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((e) => {
      if (activeCategory !== "All" && e.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = [
        e.term.toLowerCase(),
        ...(e.aliases ?? []).map((a) => a.toLowerCase()),
      ];
      return haystack.some((h) => h.includes(q));
    });
  }, [sorted, query, activeCategory]);

  // Group filtered by first letter for the alphabet headers
  const grouped = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const e of filtered) {
      const letter = e.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(e);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const categories: (Category | "All")[] = [
    "All",
    "Tiles",
    "Setup",
    "Charleston",
    "Calling",
    "Strategy",
    "Etiquette",
    "Scoring",
    "Mistakes",
  ];

  return (
    <PageWrap>
      <Cover
        eyebrow="MAHJ — Lesson 14"
        title="Glossary &"
        highlight="Quick Reference"
        subtitle="Every term, defined and cross-linked. Always one tap away."
      />

      <SectionHeader>Search & Browse</SectionHeader>

      {/* ── Search box ── */}
      <div className="my-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms (e.g. joker, charleston, dead hand)…"
          className="w-full rounded-lg border-2 border-[var(--color-border)] bg-white px-4 py-3 text-[15px] shadow-sm focus:border-[var(--color-accent)] focus:outline-none"
        />
      </div>

      {/* ── Category chips ── */}
      <div className="my-4 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border-2 px-3 py-1 text-[12px] font-bold uppercase tracking-wider transition ${
                active
                  ? "border-[var(--color-mid)] bg-[var(--color-mid)] text-white"
                  : "border-zinc-300 bg-white text-zinc-600 hover:border-[var(--color-mid)]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Result count ── */}
      <p className="text-[12px] italic text-zinc-500">
        {filtered.length} of {ENTRIES.length} term{filtered.length === 1 ? "" : "s"}
        {query && ` matching "${query}"`}
        {activeCategory !== "All" && ` in ${activeCategory}`}
      </p>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <Callout variant="info">
          No terms match. Try a different search or clear the filter.
        </Callout>
      )}

      {/* ── Grouped entries ── */}
      <div className="my-6 space-y-6">
        {grouped.map(([letter, entries]) => (
          <div key={letter}>
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-mid)] font-serif text-lg font-black text-white">
                {letter}
              </span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
            <div className="space-y-3">
              {entries.map((e) => (
                <article
                  key={e.term}
                  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <header className="mb-1 flex flex-wrap items-baseline gap-2">
                    <h3 className="font-serif text-lg font-black text-[var(--color-mid)]">
                      {e.term}
                    </h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[13px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[e.category]}`}
                    >
                      {e.category}
                    </span>
                  </header>
                  <p className="text-[14px] text-zinc-700">{e.definition}</p>
                  <footer className="mt-2 flex flex-wrap gap-1.5 text-[13px] text-zinc-500">
                    <span className="font-bold uppercase tracking-wider">
                      See:
                    </span>
                    {e.modules.map((m) => (
                      <a
                        key={m}
                        href={`/module/${m}`}
                        className="rounded border border-zinc-300 bg-zinc-50 px-1.5 py-0.5 font-bold text-[var(--color-mid)] hover:border-[var(--color-mid)]"
                      >
                        Module {m}
                      </a>
                    ))}
                  </footer>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ModuleNav
        currentModuleNum={13}
        prev={
          adj.prev && {
            href: adj.prev.href,
            name: `Lesson ${adj.prev.num + 1}: ${adj.prev.name}`,
          }
        }
        next={
          adj.next && {
            href: adj.next.href,
            name: `Lesson ${adj.next.num + 1}: ${adj.next.name}`,
          }
        }
      />
    </PageWrap>
  );
}
