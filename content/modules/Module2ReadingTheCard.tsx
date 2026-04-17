import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
import { LessonScreen } from "@/components/LessonScreen";
import { ScreenStepper } from "@/components/ScreenStepper";
import { Callout } from "@/components/Callout";
import { ModuleNav } from "@/components/ModuleNav";
import { Tile } from "@/components/Tile";
import { TileRow } from "@/components/TileRow";
import { Quiz } from "@/components/Quiz";
import { getAdjacentModules } from "@/lib/modules";

/* ── Local helpers ── */

function SymbolRow({
  symbol,
  meaning,
}: {
  symbol: string;
  meaning: string;
}) {
  return (
    <tr>
      <td className="px-3 py-2 font-serif text-base font-black text-[var(--color-mid)]">
        {symbol}
      </td>
      <td className="px-3 py-2 text-[13px] text-zinc-700">{meaning}</td>
    </tr>
  );
}

function FakeHandLine({
  label,
  groups,
  value,
}: {
  label: string;
  groups: { text: string; color?: string }[] | string[];
  value?: string;
}) {
  const normalizedGroups = groups.map((g) =>
    typeof g === "string" ? { text: g, color: "var(--color-mid)" } : g
  );
  return (
    <div className="my-3 rounded-xl border-2 border-[var(--color-border)] bg-white p-4 shadow-sm">
      <div className="mb-2 text-center text-[13px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {normalizedGroups.map((g, i) => (
          <span
            key={i}
            className="rounded-md bg-[var(--color-light)] px-2 py-1 font-serif text-base font-black tracking-wider"
            style={{ color: g.color }}
          >
            {g.text}
          </span>
        ))}
        {value && (
          <span className="ml-auto font-serif text-sm font-black text-[var(--color-accent)]">
            {value}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Module2ReadingTheCard() {
  const adj = getAdjacentModules(2);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={2} coverProps={{ eyebrow: "MAHJ — Lesson 3", title: "Reading the", highlight: "Card", subtitle: "How to decode the NMJL card — the blueprint for every winning hand" }} header={<><Cover
        eyebrow="MAHJ — Lesson 3"
        title="Reading the"
        highlight="Card"
        subtitle="How to decode the NMJL card — the blueprint for every winning hand"
      />
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Understand every symbol, color, and pattern on the NMJL card so you can scan it confidently during a real game.",
          },
          { label: "Estimated time", value: "7–10 minutes" },
          { label: "Prerequisite", value: "Lesson 2 (Tile Trainer)" },
          { label: "Unlocks", value: "Lesson 4 (Setup & Dealing)" },
          {
            label: "Why it matters",
            value:
              "The card IS the game. Every decision you make — what to keep, what to pass, what to call — comes back to the hand you're building from the card.",
          },
        ]}
      /></>}>
        {/* ── 1. What is the card? ── */}
        <LessonScreen title="🃏 What Is the NMJL Card?">
          <p>
            Every year, the <strong>National Mah Jongg League</strong>{" "}publishes a
            small card that lists every legal winning hand for that year. To win a
            round of American Mahjong, your 14 tiles must{" "}
            <strong>exactly match</strong>{" "}one of the hands on the card.
          </p>
          <p>
            No card = no game. It&apos;s the single most important item at the
            table.
          </p>
          <Callout variant="info">
            <strong>The card changes every April</strong>
            {" (typically the second Tuesday). You'll buy a fresh card each spring from the NMJL for about $15. Think of it like a new season in a video game."}
          </Callout>
          <Callout variant="tip">
            You don&apos;t have to play the current year&apos;s card — but{" "}
            <strong>everyone at the table must be playing the same card</strong>.
            Most groups use the latest one.
          </Callout>
        </LessonScreen>

        {/* ── 2. Card layout overview ── */}
        <LessonScreen title="📋 Card Layout — The Big Picture">
          <p>
            The card is organized into <strong>categories</strong>{" "}running down the
            left side. Each category groups hands that share a theme:
          </p>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li><strong>2026</strong> — built around the digits of the current year</li>
            <li><strong>2468</strong> — even-numbered tiles only</li>
            <li><strong>Any Like Numbers</strong> — same number across suits</li>
            <li><strong>Quints</strong> — groups of 5 identical tiles</li>
            <li><strong>Consecutive Run</strong> — tiles in numerical order</li>
            <li><strong>13579</strong> — odd-numbered tiles only</li>
            <li><strong>Winds - Dragons</strong> — honor tiles</li>
            <li><strong>369</strong> — only 3s, 6s, and 9s</li>
            <li><strong>Singles and Pairs</strong> — no groups of 3 or more</li>
          </ul>
          <p className="mt-2 text-[14px] text-zinc-700">
            Within each category, you&apos;ll see one or more{" "}
            <strong>hand lines</strong> — each line is a different winning
            combination. The <strong>number on the right</strong>{" "}is the hand&apos;s
            point value (the payout in cents).
          </p>
          <Callout variant="tip">
            Categories change slightly from year to year, but the overall structure
            stays the same. Once you learn how to read one card, you can read any
            card.
          </Callout>
        </LessonScreen>

        {/* ── 3. Symbols reference ── */}
        <LessonScreen title="🔤 Symbol Reference">
          <p>
            Here&apos;s every symbol you&apos;ll see on the card and what it means:
          </p>

          <div className="my-3 overflow-x-auto rounded-lg border border-[var(--color-border)]">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[var(--color-light)]">
                <tr>
                  <th className="px-3 py-2 font-black text-[var(--color-mid)]">Symbol</th>
                  <th className="px-3 py-2 font-black text-[var(--color-mid)]">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                <SymbolRow symbol="1–9" meaning="A tile's face value in that suit" />
                <SymbolRow symbol="F" meaning="Flower — any of the 8 flower tiles (all interchangeable)" />
                <SymbolRow symbol="D" meaning="Dragon — Red, Green, or Soap (context tells you which)" />
                <SymbolRow symbol="O" meaning='White Dragon ("Soap") — the zero/blank tile' />
                <SymbolRow symbol="N E W S" meaning="Wind tiles — North, East, West, South" />
                <SymbolRow symbol="C" meaning="Concealed — no calling allowed except for Mahjong (the final winning tile)" />
                <SymbolRow symbol="X" meaning="Exposed — you may call tiles from other players' discards" />
              </tbody>
            </table>
          </div>

          <Callout variant="tip">
            <strong>C vs. X is critical.</strong>{" "}If a hand is marked C (concealed),
            you cannot call any tiles during play — except for Mahjong (the final
            winning tile). Concealed hands are harder but usually worth more.
          </Callout>
        </LessonScreen>

        {/* ── 4. Colors = suits ── */}
        <LessonScreen title="🎨 Colors = Suits">
          <p>
            Tiles on the card are printed in <strong>three colors</strong> — one
            color per suit (Bams, Craks, Dots). The specific color-to-suit
            assignment doesn&apos;t matter — <strong>you pick</strong>{" "}which suit
            goes with which color when you build the hand.
          </p>
          <p>What matters is whether the colors <em>match</em>{" "}or <em>differ</em>:</p>

          <div className="my-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border-l-4 border-[var(--color-green)] bg-[#F4FBF6] p-4">
              <h4 className="mb-1 font-serif text-sm font-black text-[var(--color-mid)]">
                All one color
              </h4>
              <p className="text-[13px] text-zinc-700">
                Every group in the hand must be the <strong>same suit</strong>. You
                choose which suit.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-[var(--color-accent)] bg-[#E8F5EC] p-4">
              <h4 className="mb-1 font-serif text-sm font-black text-[var(--color-mid)]">
                Multiple colors
              </h4>
              <p className="text-[13px] text-zinc-700">
                Groups printed in <strong>different colors</strong>{" "}must be in{" "}
                <strong>different suits</strong>. Groups that share a color share a
                suit.
              </p>
            </div>
          </div>

          {/* Visual example of color coding */}
          <div className="my-4 rounded-xl border-2 border-[var(--color-border)] bg-white p-4 shadow-sm">
            <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
              Example: how colors look on the card
            </p>

            {/* Mock card line */}
            <div className="mb-3 flex flex-wrap items-center justify-center gap-1 sm:gap-2 rounded-md bg-[#FAF7EC] px-3 py-3 font-mono text-base sm:text-lg font-black tracking-wider sm:tracking-widest">
              <span className="text-blue-600">FFF</span>
              <span className="text-zinc-300">·</span>
              <span className="text-blue-600">1111</span>
              <span className="text-zinc-300">·</span>
              <span className="text-red-600">1111</span>
              <span className="text-zinc-300">·</span>
              <span className="text-green-600">111</span>
            </div>

            <p className="mb-2 text-center text-[12px] italic text-zinc-500">
              This is NOT from any real NMJL card — it&apos;s a fictional example.
            </p>

            {/* Color legend */}
            <div className="grid grid-cols-3 gap-2 text-center text-[12px]">
              <div className="rounded-md bg-blue-50 p-2">
                <span className="font-black text-blue-600">Blue</span>
                <div className="text-zinc-600">= one suit (you pick)</div>
              </div>
              <div className="rounded-md bg-red-50 p-2">
                <span className="font-black text-red-600">Red</span>
                <div className="text-zinc-600">= a different suit</div>
              </div>
              <div className="rounded-md bg-green-50 p-2">
                <span className="font-black text-green-600">Green</span>
                <div className="text-zinc-600">= a third suit</div>
              </div>
            </div>

            <p className="mt-3 text-[13px] text-zinc-700">
              Reading this line: <strong>3 Flowers</strong>, then{" "}
              <strong>four 1s in one suit</strong>{" "}(blue),{" "}
              <strong>four 1s in a different suit</strong>{" "}(red), and{" "}
              <strong>three 1s in the third suit</strong>{" "}(green). You choose
              which real suit goes with which color — e.g. blue = Bams, red = Craks,
              green = Dots.
            </p>
          </div>

          <Callout variant="warn">
            <strong>The color on the card is NOT the actual tile color.</strong>{" "}A
            blue &quot;3&quot; on the card doesn&apos;t mean &quot;3 Bam.&quot; It
            means &quot;a 3 in whichever suit you assigned to blue.&quot; This trips
            up every beginner at first.
          </Callout>
        </LessonScreen>

        {/* ── 5. Groupings ── */}
        <LessonScreen title="🧩 Groupings — What the Clusters Mean">
          <p>
            Tiles printed <strong>next to each other</strong>{" "}on the card form a{" "}
            <strong>group</strong>. Count how many tiles are clustered together:
          </p>

          <div className="my-3 space-y-2">
            <div className="grid grid-cols-[80px_1fr] items-center gap-3 rounded-md bg-[var(--color-light)] p-3">
              <span className="font-serif text-lg font-black text-[var(--color-mid)]">1 tile</span>
              <span className="text-[14px] text-zinc-700">
                A <strong>single</strong> — one tile standing alone (used in Singles &amp; Pairs hands)
              </span>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-center gap-3 rounded-md bg-[var(--color-light)] p-3">
              <span className="font-serif text-lg font-black text-[var(--color-mid)]">2 tiles</span>
              <span className="text-[14px] text-zinc-700">
                A <strong>pair</strong> — two identical tiles
              </span>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-center gap-3 rounded-md bg-[var(--color-light)] p-3">
              <span className="font-serif text-lg font-black text-[var(--color-mid)]">3 tiles</span>
              <span className="text-[14px] text-zinc-700">
                A <strong>pung</strong> — three identical tiles
              </span>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-center gap-3 rounded-md bg-[var(--color-light)] p-3">
              <span className="font-serif text-lg font-black text-[var(--color-mid)]">4 tiles</span>
              <span className="text-[14px] text-zinc-700">
                A <strong>kong</strong> — four identical tiles
              </span>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-center gap-3 rounded-md bg-[var(--color-light)] p-3">
              <span className="font-serif text-lg font-black text-[var(--color-mid)]">5 tiles</span>
              <span className="text-[14px] text-zinc-700">
                A <strong>quint</strong> — five identical tiles (uses at least one joker)
              </span>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-center gap-3 rounded-md bg-[var(--color-light)] p-3">
              <span className="font-serif text-lg font-black text-[var(--color-mid)]">6 tiles</span>
              <span className="text-[14px] text-zinc-700">
                A <strong>sextet</strong> — six identical tiles (rare, needs multiple jokers)
              </span>
            </div>
          </div>

          <p>
            Spaces between clusters separate one group from the next. Add up
            every tile in every group and you should always get{" "}
            <strong>14</strong>.
          </p>

          <Callout variant="info">
            <strong>Jokers</strong>{" "}can substitute for any tile in a group of{" "}
            <strong>3 or more</strong>{" "}(pungs, kongs, quints, sextets). They{" "}
            <strong>cannot</strong>{" "}substitute in pairs or singles. You&apos;ll learn
            more about jokers in Lesson 6.
          </Callout>
        </LessonScreen>

        {/* ── 6. Parenthetical rules ── */}
        <LessonScreen title="📝 The Rules at the End of Each Hand">
          <p>
            Every hand line on the card ends with a short note in
            parentheses. <strong>This tells you exactly how to build
            that hand.</strong>{" "}Don&apos;t skip it — it&apos;s the most
            important part.
          </p>

          <h4 className="mt-3 mb-2 font-serif text-sm font-black text-[var(--color-mid)]">
            How many suits?
          </h4>
          <div className="space-y-1.5">
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;Any 1 Suit&quot;</strong> — all tiles from one suit (you pick which)
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;Any 2 Suits&quot;</strong> or{" "}
                <strong>&quot;Any 2 or 3 Suits&quot;</strong> — spread across multiple suits
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;Any 3 Suits&quot;</strong> — must use all three suits (Bams, Craks, Dots)
              </p>
            </div>
          </div>

          <h4 className="mt-3 mb-2 font-serif text-sm font-black text-[var(--color-mid)]">
            Which numbers?
          </h4>
          <div className="space-y-1.5">
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;These Nos. Only&quot;</strong> — use the exact numbers shown, no substituting
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;Any 3 Consec. Nos.&quot;</strong> or{" "}
                <strong>&quot;Any 4 Consec. Nos.&quot;</strong> — pick consecutive numbers (like 3-4-5)
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;Any Like Odd Nos.&quot;</strong> or{" "}
                <strong>&quot;Any Like Even Nos.&quot;</strong> — pick from odd (1,3,5,7,9) or even (2,4,6,8)
              </p>
            </div>
          </div>

          <h4 className="mt-3 mb-2 font-serif text-sm font-black text-[var(--color-mid)]">
            Dragons &amp; special rules
          </h4>
          <div className="space-y-1.5">
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;Any Dragon&quot;</strong> — use any dragon (Red, Green, or Soap)
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;Matching Dragons&quot;</strong> or{" "}
                <strong>&quot;w Matching Dragon&quot;</strong> — dragon must match
                the suit (Red→Craks, Green→Bams, Soap→Dots)
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;Opp. Dragon&quot;</strong> — use the dragon from
                the <em>opposite</em>{" "}suit
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <p className="text-[13px] text-zinc-700">
                <strong>&quot;Kongs Match Pair&quot;</strong> — the groups of 4
                must be the same suit as the pair
              </p>
            </div>
          </div>

          <Callout variant="tip">
            Always read the rules in parentheses <strong>before</strong>{" "}you
            start building the hand. It answers three questions: how many
            suits, which numbers, and any special rules.
          </Callout>
        </LessonScreen>

        {/* ── 7. Numbers are patterns ── */}
        <LessonScreen title="🔢 Numbers on the Card">
          <p>
            The numbers on the card don&apos;t always mean those exact tiles.
            In some categories, you can pick different numbers — the{" "}
            <strong>rules in parentheses</strong>{" "}next to each hand tell you
            what&apos;s allowed.
          </p>

          <p><strong>Categories where you can pick numbers:</strong></p>
          <ul className="my-2 ml-5 list-disc space-y-1 text-[14px] text-zinc-700">
            <li><strong>Like Numbers</strong> — card shows 111, but you can use any number (222, 555, 888, etc.)</li>
            <li><strong>Consecutive Run</strong> — card shows 1-2-3, but you can use any consecutive run (4-5-6, 7-8-9, etc.)</li>
            <li><strong>Singles &amp; Pairs</strong> — numbers can vary per the rules in parentheses</li>
            <li><strong>Quints</strong> — same idea, check the parentheses</li>
            <li><strong>Winds/Dragons</strong> — the numbers paired with them can vary (sometimes any number, sometimes even or odd only — check the parentheses)</li>
          </ul>

          <p><strong>Categories where you use exact numbers:</strong></p>
          <ul className="my-2 ml-5 list-disc space-y-1 text-[14px] text-zinc-700">
            <li><strong>Year hands (2026)</strong> — exactly 2, 0, 2, 6</li>
            <li><strong>&quot;These Nos. Only&quot;</strong> — no substituting</li>
          </ul>

          <Callout variant="tip">
            <strong>Always read the rules in parentheses first.</strong>{" "}They tell you
            which numbers you can use, how many suits, and any special rules.
          </Callout>
        </LessonScreen>

        {/* ── 8. Fake hand walkthrough ── */}
        <LessonScreen title="🧠 Walkthrough: Decoding a Hand Line">
          <p>
            Let&apos;s decode a <strong>made-up</strong>{" "}hand step by step. (We
            can&apos;t show real NMJL hands, but the reading skill is the same.)
          </p>

          <FakeHandLine
            label="Consecutive Run (example — not a real NMJL hand)"
            groups={["FF", "11", "222", "333", "4444"]}
          />

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            How to read it
          </h4>
          <ol className="ml-6 list-decimal space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>How many colors?</strong>{" "}One color = <strong>one suit</strong>.
            </li>
            <li>
              <strong>Check the parentheses</strong> — &quot;(Any 1 Suit,
              Any 3 Consec. Nos.)&quot; → one suit, pick any 3 consecutive numbers.
            </li>
            <li>
              <strong>FF</strong> = Flowers. The rest are consecutive
              number groups in your chosen suit.
            </li>
          </ol>

          <div className="my-4 rounded-lg bg-[var(--color-light)] border border-dashed border-[var(--color-border)] p-4">
            <p className="mb-3 text-center text-[12px] font-bold uppercase tracking-wider text-zinc-500">
              You choose the numbers
            </p>
            <div className="space-y-1.5 text-[14px] text-center">
              <div className="font-mono font-bold text-zinc-400">FF 11 222 333 4444</div>
              <div className="my-1 text-xs font-bold text-zinc-400">could be</div>
              <div className="font-mono font-bold text-[var(--color-accent)]">FF 55 666 777 8888</div>
              <div className="text-xs font-bold text-zinc-400">or</div>
              <div className="font-mono font-bold text-[var(--color-accent)]">FF 22 333 444 5555</div>
              <div className="text-xs text-zinc-400">...any consecutive numbers work</div>
            </div>
            <p className="mt-3 text-center text-[13px] text-zinc-600">
              You pick the suit too — this hand works in Bams, Craks, or Dots.
            </p>
          </div>

          <Callout variant="tip">
            Always count to 14: 2 + 2 + 3 + 3 + 4 = 14. ✓
          </Callout>
        </LessonScreen>

        {/* ── Multi-suit example ── */}
        <LessonScreen title="🎨 When Colors Mean Different Suits">
          <p>
            Some hands use <strong>multiple suits</strong>. Each color on the
            card represents a different suit — you choose which.
          </p>

          <FakeHandLine
            label="Like Numbers (example — not a real NMJL hand)"
            groups={[
              { text: "FF", color: "#16a34a" },
              { text: "111", color: "#2563eb" },
              { text: "111", color: "#dc2626" },
              { text: "111", color: "#16a34a" },
              { text: "11", color: "#2563eb" },
            ]}
          />

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            How to read it
          </h4>
          <ol className="ml-6 list-decimal space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>How many colors?</strong>{" "}Three colors = <strong>three suits</strong>.
            </li>
            <li>
              <strong>Same color = same suit.</strong>{" "}The two{" "}
              <strong className="text-[#2563eb]">blue</strong>{" "}groups
              use the same suit. You pick which.
            </li>
            <li>
              <strong>FF</strong> = Flowers. The rest are groups of the
              same number across different suits.
            </li>
          </ol>

          <div className="my-4 rounded-lg bg-[var(--color-light)] border border-dashed border-[var(--color-border)] p-4">
            <p className="mb-3 text-center text-[12px] font-bold uppercase tracking-wider text-zinc-500">
              You assign the suits
            </p>
            <div className="space-y-3 text-[13px]">
              <div className="rounded-md bg-white p-3">
                <div className="mb-3 text-center text-xs text-zinc-400">
                  <span className="font-bold text-[#2563eb]">Blue</span> = Bams,{" "}
                  <span className="font-bold text-[#dc2626]">Red</span> = Craks,{" "}
                  <span className="font-bold text-[#16a34a]">Green</span> = Dots
                </div>
                <div className="flex justify-center gap-3 font-mono text-[13px] font-bold">
                  <div className="text-center text-[#16a34a]">
                    <div>FF</div>
                    <div className="text-[10px] font-sans">Flower</div>
                  </div>
                  <div className="text-center text-[#2563eb]">
                    <div>555</div>
                    <div className="text-[10px] font-sans">Bam</div>
                  </div>
                  <div className="text-center text-[#dc2626]">
                    <div>555</div>
                    <div className="text-[10px] font-sans">Crak</div>
                  </div>
                  <div className="text-center text-[#16a34a]">
                    <div>555</div>
                    <div className="text-[10px] font-sans">Dot</div>
                  </div>
                  <div className="text-center text-[#2563eb]">
                    <div>55</div>
                    <div className="text-[10px] font-sans">Bam</div>
                  </div>
                </div>
              </div>
              <div className="text-center text-xs font-bold text-zinc-400">or swap the suits</div>

              <div className="rounded-md bg-white p-3">
                <div className="mb-3 text-center text-xs text-zinc-400">
                  <span className="font-bold text-[#2563eb]">Blue</span> = Dots,{" "}
                  <span className="font-bold text-[#dc2626]">Red</span> = Bams,{" "}
                  <span className="font-bold text-[#16a34a]">Green</span> = Craks
                </div>
                <div className="flex justify-center gap-3 font-mono text-[13px] font-bold">
                  <div className="text-center text-[#16a34a]">
                    <div>FF</div>
                    <div className="text-[10px] font-sans">Flower</div>
                  </div>
                  <div className="text-center text-[#2563eb]">
                    <div>333</div>
                    <div className="text-[10px] font-sans">Dot</div>
                  </div>
                  <div className="text-center text-[#dc2626]">
                    <div>333</div>
                    <div className="text-[10px] font-sans">Bam</div>
                  </div>
                  <div className="text-center text-[#16a34a]">
                    <div>333</div>
                    <div className="text-[10px] font-sans">Crak</div>
                  </div>
                  <div className="text-center text-[#2563eb]">
                    <div>33</div>
                    <div className="text-[10px] font-sans">Dot</div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-zinc-400">
                ...any combination works
              </p>
            </div>
          </div>

          <Callout variant="info">
            Flowers never belong to a suit — they&apos;re always wild and work
            with any hand regardless of suit.
          </Callout>
        </LessonScreen>

        {/* ── One line = many hands ── */}
        <LessonScreen title="🌀 One Line = Many Possible Hands">
          <p>
            Because you choose the numbers <em>and</em>{" "}the suits, a single
            line on the card can be built <strong>many different ways</strong>.
          </p>
          <p>
            This is what makes hand selection strategic — the same tiles in
            your rack might fit several different lines on the card.
          </p>

          <Callout variant="tip">
            <strong>Keep 2–3 candidate hands in mind</strong>{" "}as you play.
            You don&apos;t have to commit to one right away — more on this
            in Lesson 9 (Hand Strategy).
          </Callout>
        </LessonScreen>

        {/* ── C, X, and Hand Values ── */}
        <LessonScreen title="💰 C, X, and Hand Values">
          <p>
            Every hand on the card ends with a letter and a number —
            like <strong>X 25</strong> or <strong>C 30</strong>. Here&apos;s
            what they mean.
          </p>

          <div className="my-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border-l-4 border-[var(--color-green)] bg-white p-4">
              <h4 className="mb-1 font-serif text-lg font-black text-[var(--color-mid)]">
                X = Exposed
              </h4>
              <p className="text-[13px] text-zinc-700">
                You <strong>can call tiles</strong>{" "}from other players&apos;
                discards. Easier to complete because you have more ways to
                get the tiles you need.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-[var(--color-red)] bg-white p-4">
              <h4 className="mb-1 font-serif text-lg font-black text-[var(--color-mid)]">
                C = Concealed
              </h4>
              <p className="text-[13px] text-zinc-700">
                You <strong>cannot call any tiles except for Mahjong</strong> (the
                final winning tile). Every other tile must come from the wall
                or the Charleston. Harder — but worth more.
              </p>
            </div>
          </div>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            The number = the hand&apos;s value
          </h4>
          <p className="text-[14px] text-zinc-700">
            The number after C or X is how much the hand is worth in cents.
            Higher value = harder hand = bigger payout.
          </p>

          <div className="my-3 overflow-hidden rounded-lg border border-zinc-200">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-mid)] text-white">
                <tr>
                  <th className="px-3 py-2 text-left text-[13px] uppercase tracking-wider">Hand</th>
                  <th className="px-3 py-2 text-left text-[13px] uppercase tracking-wider">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 font-bold">X 25</td>
                  <td className="px-3 py-2 text-[13px] text-zinc-700">Exposed, 25¢ — most common, easiest</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 font-bold">X 30</td>
                  <td className="px-3 py-2 text-[13px] text-zinc-700">Exposed, 30¢</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 font-bold">X 40</td>
                  <td className="px-3 py-2 text-[13px] text-zinc-700">Exposed, 40¢ — Quints</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 font-bold">X 45</td>
                  <td className="px-3 py-2 text-[13px] text-zinc-700">Exposed, 45¢ — Quints</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 font-bold">C 30</td>
                  <td className="px-3 py-2 text-[13px] text-zinc-700">Concealed, 30¢ — no calling except for Mahjong</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="px-3 py-2 font-bold">C 50</td>
                  <td className="px-3 py-2 text-[13px] text-zinc-700">Concealed, 50¢ — Singles and Pairs</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold">C 75</td>
                  <td className="px-3 py-2 text-[13px] text-zinc-700">Concealed, 75¢ — hardest, biggest payout</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout variant="tip">
            As a beginner, start with <strong>X 25</strong>{" "}hands — they&apos;re
            the easiest to complete since you can call tiles. You&apos;ll
            learn more about payouts in Lesson 12 (Scoring).
          </Callout>
        </LessonScreen>

        {/* ── Common beginner misreads ── */}
        <LessonScreen title="⚠️ Common Beginner Misreads">
          <p>
            Almost every new player makes these mistakes. Knowing them in advance
            saves embarrassment at the table.
          </p>

          <div className="my-3 space-y-3">
            <div className="rounded-lg border-l-4 border-[var(--color-red)] bg-[#FFF6F4] p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-red)]">
                Ignoring the C
              </h4>
              <p className="text-[13px] text-zinc-700">
                You call a tile for a hand marked C (concealed) — and your hand is
                now dead. <strong>Always check C vs. X</strong>{" "}before you call.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-[var(--color-red)] bg-[#FFF6F4] p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-red)]">
                Treating pattern numbers as literal
              </h4>
              <p className="text-[13px] text-zinc-700">
                The card shows &quot;111 222&quot; and you think you <em>must</em> use 1s and 2s. You don&apos;t — those numbers represent a pattern.
                Read the category name to know if the numbers are flexible.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-[var(--color-red)] bg-[#FFF6F4] p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-red)]">
                Confusing a kong for two pairs
              </h4>
              <p className="text-[13px] text-zinc-700">
                Four tiles clustered together is a <strong>kong</strong>{" "}(one group of
                4), not two pairs. A space between them would mean two separate
                pairs. Spacing matters.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-[var(--color-red)] bg-[#FFF6F4] p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-red)]">
                Using a joker in a pair
              </h4>
              <p className="text-[13px] text-zinc-700">
                Jokers only work in groups of 3 or more. If the hand has a pair, you
                need <strong>two real tiles</strong> — no joker shortcut.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-[var(--color-red)] bg-[#FFF6F4] p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-red)]">
                Miscounting to 14
              </h4>
              <p className="text-[13px] text-zinc-700">
                If your tiles don&apos;t add up to 14, you&apos;ve misread a group.
                Re-check the spacing between clusters on the card.
              </p>
            </div>
          </div>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={2}
            title="Lesson 3 Check"
            passThreshold={4}
            questions={[
              {
                question:
                  "On the NMJL card, what does a \"C\" next to a hand mean?",
                options: [
                  "The hand uses Craks",
                  "The hand is concealed — no calling allowed",
                  "The hand is common and easy",
                  "The hand uses consecutive numbers",
                ],
                correct: 1,
                explanation:
                  "C means concealed. Every tile must come from the wall or Charleston — you cannot call any discards for this hand.",
              },
              {
                question:
                  "A hand line shows three groups printed in the same color. What does that mean?",
                options: [
                  "They must all be Bams",
                  "They must all be the same suit (you pick which)",
                  "They must all be different suits",
                  "The colors don't matter",
                ],
                correct: 1,
                explanation:
                  "Same color on the card means same suit. You pick which suit — but all groups in that color must match.",
              },
              {
                question:
                  "A consecutive run hand shows FF 11 222 333 4444 (Any 1 Suit, Any 3 Consec. Nos.). What numbers could you use?",
                options: [
                  "Only 1, 2, 3, and 4",
                  "Any four consecutive numbers (like 4, 5, 6, 7)",
                  "Any four numbers",
                  "Only even numbers",
                ],
                correct: 1,
                explanation:
                  "The rules in parentheses say \"Any 3 Consec. Nos.\" — meaning the numbers are a pattern. 1-2-3-4 could be 4-5-6-7, 5-6-7-8, or any other consecutive set. One suit only.",
              },
              {
                question:
                  "Four tiles clustered together with no space between them is a:",
                options: ["Two pairs", "A kong (4 of a kind)", "A pung + 1", "An error"],
                correct: 1,
                explanation:
                  "Four tiles together form a kong — one group of 4 identical tiles. Two pairs would be shown with a space between them (XX XX).",
              },
              {
                question: "Every hand on the card adds up to how many tiles?",
                options: ["13", "14", "15", "It varies"],
                correct: 1,
                explanation:
                  "Every winning hand is exactly 14 tiles. If your count doesn't add up to 14, re-check how you're reading the groups.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 3 Complete">
          <p>
            You can now pick up an NMJL card and actually read it — the colors, the
            symbols, the patterns, the groupings. That&apos;s a huge step.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 4 covers{" "}
            <strong>Setup &amp; Dealing</strong> — how to build the walls, pick the
            dealer, and deal tiles so you can start playing.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={2}
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
