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
import { SuitSorterDrill } from "@/components/SuitSorterDrill";
import { TileMatchDrill } from "@/components/TileMatchDrill";
import { TileIDDrill } from "@/components/TileIDDrill";
import { Quiz } from "@/components/Quiz";
import { getAdjacentModules } from "@/lib/modules";

export default function Module1TileTrainer() {
  const adj = getAdjacentModules(1);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={1} coverProps={{ eyebrow: "MAHJ — Module 1", title: "Tile", highlight: "Trainer", subtitle: "Recognize all 152 tiles in an American Mahjong set" }} header={<><Cover
        eyebrow="MAHJ — Module 1"
        title="Tile"
        highlight="Trainer"
        subtitle="Recognize all 152 tiles in an American Mahjong set"
      />
      <SectionHeader>Lesson</SectionHeader>
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Recognize all 152 tiles and name each category confidently.",
          },
          { label: "Estimated time", value: "6–8 minutes" },
          { label: "Prerequisite", value: "Module 0 (Welcome)" },
          { label: "Unlocks", value: "Module 2 (Reading the Card)" },
        ]}
      /></>}>
        {/* ── Intro ── */}
        <LessonScreen title="Meet the Tiles">
          <p>
            An American Mahjong set has <strong>152 tiles</strong>.
          </p>
          <p>
            That sounds like a lot — but they&apos;re organized into{" "}
            <strong>just a few simple groups</strong>. Once you know the groups, you know
            them all.
          </p>
          <Callout variant="tip">
            You don&apos;t need to memorize anything. Just look and recognize. We&apos;ll
            quiz you gently at the end.
          </Callout>
        </LessonScreen>

        {/* ── 3 number suits intro ── */}
        <LessonScreen title="The 3 Number Suits">
          <p>
            Most of the tiles are <strong>numbered 1 through 9</strong>, in three different
            &quot;suits.&quot;
          </p>
          <p>
            Think of suits like the colors in a deck of cards (♠ ♥ ♦ ♣) — same numbers,
            different look.
          </p>
          <p>
            The three suits are: <strong>Bams, Craks, Dots.</strong>
          </p>
        </LessonScreen>

        {/* ── Bams ── */}
        <LessonScreen title="🎋 Bams (Bamboo)">
          <p>
            <strong>Bams</strong>{" "}look like little stalks of bamboo.
          </p>
          <p>
            There are <strong>9 of them</strong>{" "}(numbered 1 through 9), and{" "}
            <strong>4 of each</strong>{" "}in the set — so <strong>36 Bam tiles</strong>{" "}total.
          </p>
          <TileRow caption="All 9 Bams (1 through 9). Note the bird!">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <Tile key={n} type="bam" value={n} size="sm" showLabel />
            ))}
          </TileRow>
          <Callout variant="warn">
            The <strong>1 Bam</strong>{" "}is special — it&apos;s almost always drawn as a{" "}
            <strong>bird</strong>{" "}instead of a bamboo stalk. Don&apos;t let it fool you.
          </Callout>
        </LessonScreen>

        {/* ── Cracks ── */}
        <LessonScreen title="🈶 Craks (Characters)">
          <p>
            <strong>Craks</strong>{" "}(pronounced &quot;cracks&quot;) have a <strong>small red number in the top corner</strong> and <strong>black Chinese characters</strong>{" "}stacked in the middle.
          </p>
          <p>
            Their full name is &quot;Characters,&quot; but everyone at the table calls
            them &quot;Craks.&quot;
          </p>
          <p>
            Same as Bams: numbered <strong>1 through 9</strong>, with{" "}
            <strong>4 of each</strong> = <strong>36 Crak tiles</strong>.
          </p>
          <TileRow caption="All 9 Craks (1 through 9)">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <Tile key={n} type="crack" value={n} size="sm" showLabel />
            ))}
          </TileRow>
          <Callout variant="tip">
            You don&apos;t need to read the Chinese characters — just look at the small
            <strong> red digit in the top-left corner</strong>{" "}and you&apos;ll know which
            Crak it is.
          </Callout>
        </LessonScreen>

        {/* ── Dots ── */}
        <LessonScreen title="🔵 Dots (Circles)">
          <p>
            <strong>Dots</strong>{" "}are exactly what they sound like: circles arranged in
            patterns.
          </p>
          <p>
            A 1 Dot has one circle, a 2 Dot has two, all the way up to 9 Dot. Numbered{" "}
            <strong>1 through 9</strong>, <strong>4 of each</strong> ={" "}
            <strong>36 Dot tiles</strong>.
          </p>
          <TileRow caption="All 9 Dots (1 through 9)">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <Tile key={n} type="dot" value={n} size="sm" showLabel />
            ))}
          </TileRow>
          <Callout variant="tip">
            That&apos;s all 3 number suits. Bams + Craks + Dots ={" "}
            <strong>108 tiles total</strong>.
          </Callout>
        </LessonScreen>

        {/* ── Drill: Suit Sorter ── */}
        <LessonScreen title="Quick Check: Suit Sorter">
          <p>
            You&apos;ve met all 3 number suits. Let&apos;s make sure you can tell them
            apart at a glance.
          </p>
          <SuitSorterDrill />
        </LessonScreen>

        {/* ── Winds ── */}
        <LessonScreen title="🌬️ Honor Tiles, Part 1: Winds">
          <p>
            <strong>Honor tiles</strong>{" "}are special — they don&apos;t have numbers.
          </p>
          <p>
            There are <strong>4 winds</strong>:{" "}
            <strong>North, East, West, and South</strong>. With{" "}
            <strong>4 of each</strong>{" "}in the set, that&apos;s{" "}
            <strong>16 Wind tiles</strong>{" "}total.
          </p>
          <TileRow>
            <Tile type="wind" value="N" size="md" showLabel />
            <Tile type="wind" value="E" size="md" showLabel />
            <Tile type="wind" value="W" size="md" showLabel />
            <Tile type="wind" value="S" size="md" showLabel />
          </TileRow>
          <Callout variant="tip">
            Easy to remember as <strong>NEWS</strong>. The Dealer is always{" "}
            <strong>East</strong>.
          </Callout>
        </LessonScreen>

        {/* ── Dragons ── */}
        <LessonScreen title="🐉 Honor Tiles, Part 2: Dragons">
          <p>
            There are <strong>3 dragons</strong>:
          </p>
          <ul className="ml-5 list-disc space-y-1 text-[15px]">
            <li>
              <strong>Red Dragon</strong> — connected to the <strong>Crak</strong>{" "}suit
            </li>
            <li>
              <strong>Green Dragon</strong> — connected to the <strong>Bam</strong>{" "}suit
            </li>
            <li>
              <strong>White Dragon</strong>{" "}(also called &quot;
              <strong>Soap</strong>&quot;) — connected to the <strong>Dot</strong>{" "}suit
            </li>
          </ul>
          <p>
            <strong>4 of each</strong> = <strong>12 Dragon tiles</strong>.
          </p>
          <TileRow>
            <Tile type="dragon" value="red" size="md" showLabel />
            <Tile type="dragon" value="green" size="md" showLabel />
            <Tile type="dragon" value="white" size="md" showLabel />
          </TileRow>
          <Callout variant="tip">
            <strong>How to remember which dragon goes with which suit:</strong>
            <ul className="mt-1 ml-5 list-disc space-y-0.5">
              <li><strong>Green</strong> → <strong>Bams</strong> — think green bamboo</li>
              <li><strong>Soap</strong> → <strong>Dots</strong> — both are shapes (square and circles)</li>
              <li><strong>Red</strong> → <strong>Craks</strong> — think red blood from a crack</li>
            </ul>
          </Callout>
          <p>
            At the table, players just call them Red, Green, and Soap. Each is
            paired with a suit — knowing which helps you spot patterns on the
            card faster.
          </p>
        </LessonScreen>

        {/* ── Mini quiz: Dragon-suit pairings ── */}
        <LessonScreen title="🎯 Quick Check: Dragons & Suits">
          <p className="text-sm text-zinc-600">
            3 quick questions before we move on. Match each dragon to its suit.
          </p>
          <Quiz
            title="Dragon-Suit Check"
            passThreshold={2}
            questions={[
              {
                question: "Which suit is the Red Dragon connected to?",
                options: ["Bams", "Craks", "Dots", "Winds"],
                correct: 1,
                explanation: "Red Dragon goes with Craks.",
              },
              {
                question: "Which suit is the Green Dragon connected to?",
                options: ["Dots", "Craks", "Bams", "Flowers"],
                correct: 2,
                explanation: "Green Dragon goes with Bams.",
              },
              {
                question: "Which suit is the White Dragon (Soap) connected to?",
                options: ["Bams", "Craks", "Dots", "None"],
                correct: 2,
                explanation: "White Dragon (Soap) goes with Dots.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Flowers ── */}
        <LessonScreen title="🌸 Flowers">
          <p>
            There are <strong>8 Flower tiles</strong>, each with a unique design.
            They&apos;re all interchangeable — at the table, everyone just calls
            them &quot;Flowers.&quot; Ignore any numbers printed on them.
          </p>
          <TileRow caption="The 8 Flowers">
            <Tile type="flower" value={1} size="md" />
            <Tile type="flower" value={2} size="md" />
            <Tile type="flower" value={3} size="md" />
            <Tile type="flower" value={4} size="md" />
            <Tile type="season" value={1} size="md" />
            <Tile type="season" value={2} size="md" />
            <Tile type="season" value={3} size="md" />
            <Tile type="season" value={4} size="md" />
          </TileRow>
        </LessonScreen>

        {/* ── Jokers ── */}
        <LessonScreen title="⭐ Jokers — The Wild Card">
          <p>
            There are <strong>8 Jokers</strong>. They can substitute for any tile
            in a group of 3 or more — but never in pairs. You&apos;ll learn the
            full joker rules in Module 5.
          </p>
          <TileRow caption="The 8 Jokers">
            <div className="flex flex-wrap justify-center gap-2">
              <Tile type="joker" size="md" />
              <Tile type="joker" size="md" />
              <Tile type="joker" size="md" />
              <Tile type="joker" size="md" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Tile type="joker" size="md" />
              <Tile type="joker" size="md" />
              <Tile type="joker" size="md" />
              <Tile type="joker" size="md" />
            </div>
          </TileRow>
        </LessonScreen>

        {/* ── Drill: Tile Match (after Jokers) ── */}
        <LessonScreen title="🃏 Tile Match">
          <p>
            You&apos;ve now seen every tile type. Let&apos;s see if you can
            recognize them fast — we&apos;ll show you 10 tiles with names,
            decide if each name matches.
          </p>
          <TileMatchDrill />
        </LessonScreen>

        {/* ── Family tree summary ── */}
        <LessonScreen title="🌳 The Whole Family at a Glance">
          <p>Now that you&apos;ve met them all, here&apos;s the full set in one view:</p>
          <div className="my-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🎋", name: "Bams", count: "9 × 4 = 36" },
              { icon: "🈶", name: "Craks", count: "9 × 4 = 36" },
              { icon: "🔵", name: "Dots", count: "9 × 4 = 36" },
              { icon: "🌬️", name: "Winds", count: "4 × 4 = 16" },
              { icon: "🐉", name: "Dragons", count: "3 × 4 = 12" },
              { icon: "🌸", name: "Flowers", count: "8 unique = 8" },
              { icon: "⭐", name: "Jokers", count: "8 wild" },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#C9BC8A] bg-white p-3 text-center"
              >
                <div className="text-2xl leading-none">{f.icon}</div>
                <div className="mt-1 font-serif text-sm font-black text-[var(--color-mid)]">
                  {f.name}
                </div>
                <div className="mt-0.5 text-[13px] font-bold text-[var(--color-accent)]">
                  {f.count}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-white p-3 text-center font-serif text-xl font-black text-[var(--color-mid)]">
            Total: <span className="text-3xl text-[var(--color-accent)]">152</span> tiles
          </div>
        </LessonScreen>

        {/* ── Pronunciation ── */}
        <LessonScreen title="🗣️ How to Say It">
          <p className="text-sm text-zinc-600 italic">
            Real talk — beginners are nervous about saying things wrong at the table.
            Here&apos;s a cheat sheet so you can walk in feeling confident.
          </p>
          <div className="mt-3 overflow-x-auto rounded-lg border border-[#EFE8D6]">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-mid)] text-[var(--color-accent)]">
                <tr>
                  <th className="px-3 py-2 text-left text-[13px] uppercase tracking-wider">
                    Term
                  </th>
                  <th className="px-3 py-2 text-left text-[13px] uppercase tracking-wider">
                    Say it like
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Mahjong", `"mah-zhong"`, `Soft "j" — like the "s" in "treasure"`],
                  ["Bam", `"bam"`, "What everyone calls Bamboo"],
                  ["Crak", `"crack"`, `Table name for "Character" tiles — spelled "Crak," pronounced "crack"`],
                  ["Pung", `"puhng"`, "Three of a kind. Rhymes with 'lung'"],
                  ["Kong", `"kahng"`, "Four of a kind. Rhymes with 'song'"],
                  ["Joker", `"JOH-ker"`, "Same as in cards"],
                  ["Charleston", `"CHAR-uls-tuhn"`, "Like the city in South Carolina"],
                  ["Soap", `"sope"`, "Slang for the White Dragon"],
                ].map(([term, say, note], i) => (
                  <tr key={i} className="border-b border-[#EFE8D6] last:border-0">
                    <td className="px-3 py-2 font-serif font-bold text-[var(--color-mid)]">
                      {term}
                    </td>
                    <td className="px-3 py-2">
                      <span className="font-mono text-[var(--color-red)] font-bold">
                        {say}
                      </span>
                      <div className="text-xs text-zinc-500">{note}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout variant="tip">
            If you&apos;re not sure how to say something at a real table, just point at the
            tile and ask. Every experienced player remembers being a beginner — they&apos;ll
            happily help.
          </Callout>
        </LessonScreen>

        {/* ── Extended practice: Name That Tile ── */}
        <LessonScreen title="🀄 Practice: Name That Tile">
          <p>
            Ready for a bigger challenge? 20 tiles, 4 choices each. See how many
            you can name correctly.
          </p>
          <TileIDDrill />
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={1}
            title="Module 1 Check"
            passThreshold={4}
            questions={[
              {
                question: "How many tiles are in an American Mahjong set?",
                options: ["144", "152", "136", "160"],
                correct: 1,
                explanation:
                  "108 number suits + 28 honors + 8 flowers + 8 jokers = 152 tiles.",
              },
              {
                question: "Which of these is NOT a suit?",
                options: ["Bams", "Craks", "Dots", "Stars"],
                correct: 3,
                explanation:
                  "The three number suits are Bams (bamboo), Craks (characters), and Dots (circles).",
              },
              {
                question: "The 1 Bam tile looks like…",
                options: ["A bamboo stalk", "A bird", "A flower", "A dragon"],
                correct: 1,
                explanation:
                  "The 1 Bam is the famous 'bird' tile — almost every set draws it as a bird instead of a stalk.",
              },
              {
                question: "How many Jokers are in the set?",
                options: ["4", "8", "12", "16"],
                correct: 1,
                explanation:
                  "There are 8 Jokers, and they're the most powerful tiles in the game.",
              },
              {
                question: "How many Flower tiles are in the set?",
                options: ["4", "6", "8", "12"],
                correct: 2,
                explanation:
                  "There are 8 Flowers — each unique, but all interchangeable at the table.",
              },
              {
                question: "Which dragon is connected to the Bam suit?",
                options: [
                  "Red Dragon",
                  "White Dragon (Soap)",
                  "Green Dragon",
                  "None — dragons aren't connected to suits",
                ],
                correct: 2,
                explanation:
                  "Green Dragon goes with Bams, Red Dragon goes with Craks, and White Dragon (Soap) goes with Dots. You'll see these pairings on the card.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Module 1 Complete">
          <p>
            You can now recognize all 152 tiles in an American Mahjong set. That&apos;s the
            foundation everything else is built on.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}in Module 2, you&apos;ll learn how to{" "}
            <strong>read the NMJL card</strong> — the blueprint for every winning hand,
            including the symbols, colors, and patterns you&apos;ll use every game.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={1}
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
