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
  groups: string[];
  value: string;
}) {
  return (
    <div className="my-3 rounded-xl border-2 border-[var(--color-border)] bg-white p-4 shadow-sm">
      <div className="mb-2 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {groups.map((g, i) => (
          <span
            key={i}
            className="rounded-md bg-[var(--color-light)] px-3 py-1.5 font-serif text-lg font-black tracking-wider text-[var(--color-mid)]"
          >
            {g}
          </span>
        ))}
        <span className="ml-auto font-serif text-sm font-black text-[var(--color-accent)]">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function Module2ReadingTheCard() {
  const adj = getAdjacentModules(2);
  return (
    <PageWrap>
      <Cover
        eyebrow="MAHJ — Module 2"
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
          { label: "Prerequisite", value: "Module 1 (Tile Trainer)" },
          { label: "Unlocks", value: "Module 3 (Setup & Dealing)" },
          {
            label: "Why it matters",
            value:
              "The card IS the game. Every decision you make — what to keep, what to pass, what to call — comes back to the hand you're building from the card.",
          },
        ]}
      />

      <SectionHeader>Lesson</SectionHeader>

      <ScreenStepper moduleNum={2}>
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
            {" (typically the second Tuesday). Last year's hands are no longer legal — you'll buy a fresh card each spring from the NMJL for about $14. Think of it like a new season in a video game."}
          </Callout>
        </LessonScreen>

        {/* ── 2. Card layout overview ── */}
        <LessonScreen title="📋 Card Layout — The Big Picture">
          <p>
            The card is organized into <strong>categories</strong>{" "}running down the
            left side. Each category groups hands that share a theme:
          </p>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li><strong>Year hand</strong> — built around the digits of the current year</li>
            <li><strong>2468</strong> — even-numbered tiles only</li>
            <li><strong>Any like numbers</strong> — same number across suits</li>
            <li><strong>Addition hands</strong> — tile numbers that add up</li>
            <li><strong>Quints</strong> — groups of 5 identical tiles</li>
            <li><strong>Consecutive run</strong> — tiles in numerical order</li>
            <li><strong>13579</strong> — odd-numbered tiles only</li>
            <li><strong>Winds &amp; Dragons</strong> — honor tiles</li>
            <li><strong>369</strong> — only 3s, 6s, and 9s</li>
            <li><strong>Singles &amp; Pairs</strong> — no groups of 3 or more</li>
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

        {/* ── 3. Colors = suits ── */}
        <LessonScreen title="🎨 Colors = Suits">
          <p>
            Tiles on the card are printed in <strong>three colors</strong> — one
            color per suit (Bams, Cracks, Dots). The specific color-to-suit
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
            <div className="mb-3 flex items-center justify-center gap-2 rounded-md bg-[#FAF7EC] px-4 py-3 font-mono text-lg font-black tracking-widest">
              <span className="text-blue-600">FFF</span>
              <span className="mx-1 text-zinc-300">·</span>
              <span className="text-blue-600">1111</span>
              <span className="mx-1 text-zinc-300">·</span>
              <span className="text-red-600">1111</span>
              <span className="mx-1 text-zinc-300">·</span>
              <span className="text-green-600">11</span>
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
              Reading this line: <strong>3 Flowers</strong>, then a{" "}
              <strong>kong of 1s in one suit</strong>{" "}(blue), a{" "}
              <strong>kong of 1s in a different suit</strong>{" "}(red), and a{" "}
              <strong>pair of 1s in the third suit</strong>{" "}(green). You choose
              which real suit goes with which color — e.g. blue = Bams, red = Cracks,
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

        {/* ── 4. Symbols reference ── */}
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
                <SymbolRow symbol="D" meaning="Dragon — Red, Green, or White (context tells you which)" />
                <SymbolRow symbol="0" meaning='White Dragon ("Soap") — the zero/blank tile' />
                <SymbolRow symbol="N E W S" meaning="Wind tiles — North, East, West, South" />
                <SymbolRow symbol="C" meaning="Concealed — no calling allowed; every tile must come from the wall or Charleston" />
                <SymbolRow symbol="X" meaning="Exposed — you may call tiles from other players' discards" />
              </tbody>
            </table>
          </div>

          <Callout variant="tip">
            <strong>C vs. X is critical.</strong>{" "}If a hand is marked C (concealed),
            you cannot call a single tile for it — everything must be self-drawn.
            Concealed hands are harder but usually worth more points.
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
            more about jokers in Module 5.
          </Callout>
        </LessonScreen>

        {/* ── 6. Numbers are patterns ── */}
        <LessonScreen title="🔢 Numbers Are Patterns, Not Always Exact">
          <p>
            This is the part that confuses beginners most. The numbers on the card
            don&apos;t always mean those <em>exact</em>{" "}tiles. Depending on the{" "}
            <strong>category</strong>, the numbers represent a{" "}
            <strong>pattern</strong>{" "}you fill in:
          </p>

          <div className="my-3 space-y-3">
            <div className="rounded-lg border-l-4 border-[var(--color-accent)] bg-white p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-mid)]">
                Like numbers
              </h4>
              <p className="text-[13px] text-zinc-700">
                Card shows <strong>111 222</strong> → means &quot;pung of one
                number + pung of another.&quot; Could be 555 + 888, or 333 + 777,
                etc. You pick the numbers.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-[var(--color-accent)] bg-white p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-mid)]">
                Consecutive run
              </h4>
              <p className="text-[13px] text-zinc-700">
                Card shows <strong>11 222 333 44</strong> → means a sequence of four
                consecutive numbers. Could be 22 333 444 55, or 55 666 777 88, etc.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-[var(--color-accent)] bg-white p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-mid)]">
                Even / Odd
              </h4>
              <p className="text-[13px] text-zinc-700">
                <strong>2468</strong>{" "}hands → pick from 2, 4, 6, or 8.{" "}
                <strong>13579</strong>{" "}hands → pick from 1, 3, 5, 7, or 9. The card
                shows one example, you plug in any valid even or odd numbers.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-[var(--color-accent)] bg-white p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-mid)]">
                Year hand
              </h4>
              <p className="text-[13px] text-zinc-700">
                These <strong>are</strong>{" "}literal. The 2026 year hand needs tiles
                matching the digits 2, 0, 2, and 6 — and 0 means the White Dragon
                (Soap).
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-[var(--color-accent)] bg-white p-3">
              <h4 className="font-serif text-sm font-black text-[var(--color-mid)]">
                369
              </h4>
              <p className="text-[13px] text-zinc-700">
                Only tiles numbered 3, 6, or 9. The card shows one arrangement, but
                you choose which 3s, 6s, and 9s to use and from which suits.
              </p>
            </div>
          </div>

          <Callout variant="warn">
            <strong>How do you know if numbers are literal or a pattern?</strong> The <em>category name</em>{" "}tells you. &quot;Consecutive run&quot; means
            the numbers represent a sequence you shift. &quot;Year hand&quot; means
            the numbers are exact. Read the category first, then the hand.
          </Callout>
        </LessonScreen>

        {/* ── 7. Fake hand walkthrough ── */}
        <LessonScreen title="🧠 Walkthrough: Decoding a Hand Line">
          <p>
            Let&apos;s decode a <strong>made-up</strong>{" "}hand step by step. (We
            can&apos;t show real NMJL hands, but the reading skill is the same.)
          </p>

          <FakeHandLine
            label="Consecutive Run (example — not a real NMJL hand)"
            groups={["FF", "111", "222", "3333"]}
            value="25¢"
          />

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Breaking it down
          </h4>
          <ol className="ml-6 list-decimal space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>FF</strong> — a pair of Flowers (2 tiles). Any two flower
              tiles work since all 8 are interchangeable.
            </li>
            <li>
              <strong>111</strong> — a pung of the first number (3 tiles). Since
              this is a &quot;consecutive run,&quot; the 1-2-3 is a pattern. If you
              pick 5-6-7, this group becomes three 5s.
            </li>
            <li>
              <strong>222</strong> — a pung of the next consecutive number (3 tiles).
              In our 5-6-7 example, this is three 6s.
            </li>
            <li>
              <strong>3333</strong> — a kong of the third consecutive number (4
              tiles). Three 7s + 1 joker, or four real 7s.
            </li>
            <li>
              <strong>25¢</strong> — the hand value. The discarder pays 50¢, the
              other two pay 25¢ each.
            </li>
          </ol>

          <p className="mt-3 text-[14px] text-zinc-700">
            <strong>Tile count check:</strong> 2 + 3 + 3 + 4 = 12. Wait — that&apos;s
            only 12, not 14. Some hands include additional groups, pairs, or single
            tiles that bring the total to 14. If our example also had a{" "}
            <strong>DD</strong>{" "}(pair of dragons), that would be 12 + 2 = 14. Always
            count to 14.
          </p>

          <Callout variant="tip">
            <strong>Practice this.</strong>{" "}Every time you look at a hand line, decode
            it: &quot;That&apos;s a pair + pung + pung + kong = 14. The category is
            consecutive run, so I need three numbers in a row. Got it.&quot;
          </Callout>
        </LessonScreen>

        {/* ── 8. One line = many hands ── */}
        <LessonScreen title="🌀 One Line on the Card = Many Possible Hands">
          <p>
            Because numbers are often patterns and you choose the suits, a single
            line on the card can represent <strong>dozens</strong>{" "}of valid tile
            combinations.
          </p>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Example: a &quot;like numbers&quot; hand
          </h4>
          <p className="text-[14px] text-zinc-700">
            Imagine the card shows a hand that needs{" "}
            <strong>a pung of one number in three different suits</strong>. The card
            might show &quot;111 111 111&quot; in three colors. That single line
            could be built as:
          </p>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>Three 5-Bams + three 5-Cracks + three 5-Dots</li>
            <li>Three 2-Bams + three 2-Cracks + three 2-Dots</li>
            <li>Three 9-Bams + three 9-Cracks + three 9-Dots</li>
            <li>...any number from 1–9 works</li>
          </ul>
          <p className="mt-2 text-[14px] text-zinc-700">
            That&apos;s <strong>9 different number choices</strong>{" "}from just one
            line. Add in different suit assignments and the combinations multiply
            further. This flexibility is what makes hand selection strategic — you&apos;re
            pattern-matching your tiles against these flexible templates.
          </p>

          <Callout variant="info">
            <strong>This is why you keep 2–3 candidate hands.</strong>{" "}The same tiles
            in your rack might fit different lines on the card. You don&apos;t have to
            pick one immediately — more on this in Module 6 (Hand Strategy).
          </Callout>
        </LessonScreen>

        {/* ── 9. How to scan the card ── */}
        <LessonScreen title="👀 How to Scan the Card with Your Tiles">
          <p>
            You&apos;ve just been dealt 13 tiles and you&apos;re staring at the
            card. Here&apos;s a practical scanning method:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Sort your rack by suit</strong> — group all your Bams together,
              all your Cracks, all your Dots. Put honors (winds, dragons) and
              flowers on one end.
            </li>
            <li>
              <strong>Look at your biggest cluster.</strong>{" "}Got four Bams? Start
              with categories that use a lot of one suit. Got mostly even numbers?
              Check 2468.
            </li>
            <li>
              <strong>Spot pairs and triples.</strong>{" "}Two of the same tile is
              a pair; three is a pung-in-progress. Hands that use those numbers are
              good candidates.
            </li>
            <li>
              <strong>Check the year hand.</strong>{" "}If you happen to have tiles
              matching this year&apos;s digits, it&apos;s often one of the easiest
              places to start.
            </li>
            <li>
              <strong>Pick 2–3 candidates</strong>{" "}and mentally note which tiles fit
              all of them and which fit none. The ones that fit none are your first
              discards.
            </li>
          </ol>

          <Callout variant="tip">
            <strong>Speed comes with practice.</strong>{" "}Your first few games,
            scanning the card will feel painfully slow. By game 10, you&apos;ll
            glance at your tiles and see candidates immediately. Don&apos;t rush
            yourself early on — the table will wait.
          </Callout>
        </LessonScreen>

        {/* ── 10. Common beginner misreads ── */}
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
        <LessonScreen title="🎯 Confidence Check">
          <p className="text-sm text-zinc-600">
            5 quick questions. Get 4 right to pass.
          </p>
          <Quiz
            moduleNum={2}
            title="Module 2 Check"
            passThreshold={4}
            questions={[
              {
                question:
                  "On the NMJL card, what does a \"C\" next to a hand mean?",
                options: [
                  "The hand uses Cracks",
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
                  "In a \"consecutive run\" category, the card shows 11 222 3333. What numbers could you actually use?",
                options: [
                  "Only 1, 2, and 3",
                  "Any three consecutive numbers (like 5, 6, 7)",
                  "Any three numbers",
                  "Only even numbers",
                ],
                correct: 1,
                explanation:
                  "In a consecutive run, the numbers on the card represent a pattern. 1-2-3 means \"three in a row\" — so 5-6-7, 3-4-5, or any other consecutive set works.",
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
        <LessonScreen title="🎉 Module 2 Complete">
          <p>
            You can now pick up an NMJL card and actually read it — the colors, the
            symbols, the patterns, the groupings. That&apos;s a huge step.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Module 3 covers{" "}
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
            name: `Module ${adj.prev.num}: ${adj.prev.name}`,
          }
        }
        next={
          adj.next && {
            href: adj.next.href,
            name: `Module ${adj.next.num}: ${adj.next.name}`,
          }
        }
      />
    </PageWrap>
  );
}
