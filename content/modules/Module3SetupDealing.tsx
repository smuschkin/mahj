import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
import { LessonScreen } from "@/components/LessonScreen";
import { ScreenStepper } from "@/components/ScreenStepper";
import { Callout } from "@/components/Callout";
import { ModuleNav } from "@/components/ModuleNav";
import { Die, DicePair } from "@/components/Dice";
import { TableSeating } from "@/components/TableSeating";
import { Wall } from "@/components/Wall";
import { Quiz } from "@/components/Quiz";
import { DealingAnimation } from "@/components/DealingAnimation";
import { WallPushAnimation } from "@/components/WallPushAnimation";
import { WashAnimation } from "@/components/WashAnimation";
import { getAdjacentModules } from "@/lib/modules";

export default function Module3SetupDealing() {
  const adj = getAdjacentModules(3);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={3} coverProps={{ eyebrow: "MAHJ — Lesson 4", title: "Setup &", highlight: "Dealing" }} header={<><Cover
        eyebrow="MAHJ — Lesson 4"
        title="Setup &"
        highlight="Dealing"
        subtitle='From a pile of tiles to "Charleston, ready?"'
      />
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Confidently set up a fresh game from scratch — mix the tiles, build the wall, roll for East, take seats, break the wall, and deal.",
          },
          { label: "Estimated time", value: "7–9 minutes" },
          { label: "Prerequisite", value: "Lesson 3 (Reading the Card)" },
          { label: "Unlocks", value: "Lesson 5 (The Charleston)" },
          {
            label: "Why it matters",
            value:
              "Setup is where new players feel the most lost. After this lesson you'll be able to set up the table — something even some intermediate players get wrong.",
          },
        ]}
      /></>}>
        {/* ── 1. Overview ── */}
        <LessonScreen title="🪑 Where We're Going">
          <p>Before you can play a hand, four things have to happen:</p>
          <ol className="ml-6 list-decimal space-y-1 text-[15px]">
            <li>
              <strong>Mix</strong> — shuffle all 152 tiles face-down
            </li>
            <li>
              <strong>Build</strong> — arrange the tiles into 4 walls
            </li>
            <li>
              <strong>Pick the Dealer (East)</strong>{" "}(optional) — usually the host is
              the Dealer by default; otherwise roll dice
            </li>
            <li>
              <strong>Break &amp; Deal</strong> — open the wall and deal tiles (13 each, 14 for the Dealer)
            </li>
          </ol>
          <p>
            Sounds like a lot, but each step takes seconds once you&apos;ve done it.
            We&apos;ll walk through them one at a time.
          </p>
        </LessonScreen>

        {/* ── 2. Wash ── */}
        <LessonScreen title="🌀 Step 1: Mix the Tiles">
          <p>
            Put <strong>all 152 tiles face-down</strong>{" "}on the table and gently mix
            them around with your hands.
          </p>
          <p>
            Everyone helps. The goal is just to <strong>thoroughly mix them</strong> —
            this is your &quot;shuffle.&quot;
          </p>
          <p>
            You&apos;ll hear the satisfying clack of tiles. That sound is half the reason
            people love mahjong.
          </p>
          <WashAnimation />
          <Callout variant="tip">
            Don&apos;t flip tiles face-up while mixing — keep them all face-down so
            nobody sees what&apos;s coming.
          </Callout>
        </LessonScreen>

        {/* ── 3. Build the wall ── */}
        <LessonScreen title="🧱 Step 2: Build the Wall">
          <p>
            Each player builds a wall in front of themselves:{" "}
            <strong>19 tiles long</strong> and <strong>2 tiles high</strong>.
          </p>
          <p>
            4 players × 19 × 2 = <strong>152 tiles</strong> — exactly the whole set.
          </p>
          <p>
            The four walls form a square in the middle of the table. This is &quot;the
            wall&quot; you&apos;ll draw from throughout the game.
          </p>
          <Wall />
          <Callout variant="tip">
            Build the bottom row first (19 tiles in a row), then place the top row
            directly on top. Tiles should be touching, but not crooked.
          </Callout>
          <Callout variant="note">
            <strong>Coming from Riichi or Asian mahjong?</strong>{" "}American Mahjong
            has <strong>no dead wall</strong> — every tile in the wall is playable.
            You deal and draw until the wall is empty or someone wins.
          </Callout>
        </LessonScreen>

        {/* ── 4. Pick Dealer (East) — optional ── */}
        <LessonScreen title="🎲 Step 3: Pick the Dealer (Optional)">
          <p>
            The <strong>East seat is always the first Dealer</strong>{" "}when
            beginning to play. To decide who sits East, the{" "}
            <strong>NMJL standard</strong>{" "}is to{" "}
            <strong>roll dice</strong> — each player throws, and
            the highest roll takes the East seat and deals first (re-roll any ties).
          </p>
          <p>
            Some casual groups use a house shortcut: &quot;the host of the
            night is just East by default.&quot; That&apos;s not the official
            rule, but it&apos;s common at friendly tables. If you and your
            group prefer that, you can <strong>skip this step entirely</strong> and move on to taking your seats.
          </p>
          <div className="my-4 flex flex-wrap items-end justify-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <Die value={3} size="md" />
              <span className="text-[13px] uppercase tracking-wider text-zinc-500">
                Player 1
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Die value={5} size="md" />
              <span className="text-[13px] uppercase tracking-wider text-zinc-500">
                Player 2
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="rounded-lg border-2 border-[var(--color-accent)] bg-[#E8F5EC] p-1">
                <Die value={6} size="md" />
              </div>
              <span className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                ★ Becomes Dealer
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Die value={2} size="md" />
              <span className="text-[13px] uppercase tracking-wider text-zinc-500">
                Player 4
              </span>
            </div>
          </div>
          <p className="text-center text-[13px] italic text-zinc-600">
            Example: 4 players each rolled — Player 3 rolled the highest (6) and becomes
            the Dealer (East)
          </p>
          <Callout variant="tip">
            The Dealer (East) has the best odds of winning the first hand, so it&apos;s
            worth picking fairly when there&apos;s no natural host. After each{" "}
            <strong>hand</strong>, the Dealer position rotates{" "}
            <strong>clockwise</strong>{" "}to the next player — every hand,
            regardless of who wins.
          </Callout>
        </LessonScreen>

        {/* ── 5. Seats ── */}
        <LessonScreen title="🧭 Step 4: Take Your Seats">
          <p>
            Sit wherever you want. The only thing that matters is who&apos;s
            dealing — that person is called <strong>East</strong>.
          </p>
          <p>
            Turns go to the <strong>right</strong>{" "}around the table (the player
            on your right goes after you).
          </p>
          <TableSeating highlight="east" />
        </LessonScreen>

        {/* ── 6. Break the wall ── */}
        <LessonScreen title="🔨 Step 5: Break the Wall (Optional)">
          <p>
            Some groups have the Dealer roll dice and &quot;break&quot; the wall
            to randomize where the deal starts. <strong>This step is optional</strong>{" "}
            — many casual groups skip it entirely and just start dealing from the
            right end of the Dealer&apos;s wall.
          </p>
          <Callout variant="tip">
            <strong>First time playing?</strong>{" "}Skip the wall break. Just start
            dealing from the right end of the Dealer&apos;s wall. You can always
            add it later.
          </Callout>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            If your group breaks the wall
          </h4>
          <ol className="ml-6 list-decimal space-y-2 text-[15px]">
            <li>
              The Dealer <strong>rolls 2 dice</strong> and adds them up
              (example: 4 + 3 = 7).
            </li>
            <li>
              <strong>Count</strong>{" "}that many pairs of tiles (top + bottom) from the right end of the
              Dealer&apos;s wall.
            </li>
            <li>
              <strong>Keep the counted tiles against your rack</strong>, and
              push everything else out toward the center of the table
              (e.g. if you rolled 7, keep 7 positions against your rack and push out the rest).
            </li>
            <li>
              <strong>Deal</strong> starting from where you stopped counting
              (position 7), going left. The pushed-out tiles get dealt last.
            </li>
          </ol>

          <DicePair values={[4, 3]} />
          <p className="mt-2 text-center text-[13px] italic text-zinc-600">
            Example: rolled a 7. Count 7 positions from the right, push out
            everything after position 7, deal starting from position 7 going left.
          </p>

          <h4 className="mt-5 font-serif text-base font-black text-[var(--color-mid)]">
            Pushing your wall out
          </h4>
          <p>
            When it&apos;s time to deal from your wall, push it out{" "}
            <strong>diagonally</strong> — the left end stays closer to your
            rack, and the right end angles toward the center of the table.
            This makes it easy for the Dealer to reach the tiles they need.
          </p>

          <WallPushAnimation />
        </LessonScreen>

        {/* ── 7. Deal ── */}
        <LessonScreen title="🃏 Step 6: Deal the Tiles">
          <p>
            Starting from where you broke the wall, deal tiles{" "}
            <strong>counter-clockwise</strong>{" "}in groups of 4. From the Dealer&apos;s
            perspective, the order is:
          </p>
          <p className="my-3 text-center font-serif text-[15px] font-bold text-[var(--color-mid)]">
            Dealer → Right → Across → Left
          </p>
          <ul className="ml-6 list-disc space-y-1 text-[15px]">
            <li>
              <strong>Round 1:</strong> 4 tiles to the Dealer, then to the right,
              across, and left
            </li>
            <li>
              <strong>Round 2:</strong>{" "}Another 4 tiles to each
            </li>
            <li>
              <strong>Round 3:</strong>{" "}Another 4 to each — everyone now has{" "}
              <strong>12 tiles</strong>
            </li>
          </ul>

          <Callout variant="tip">
            <strong>You&apos;ll run out of tiles mid-deal — that&apos;s normal.</strong>{" "}
            When a wall runs out, the next player to the left pushes their wall
            toward the center. Keep dealing from there until the deal is done.
          </Callout>

          <DealingAnimation />

          <h4 className="mt-5 font-serif text-base font-black text-[var(--color-mid)]">
            🪄 The last round: Dealer takes 2 extra
          </h4>
          <p>
            After everyone has 12 tiles, there&apos;s one final round. The Dealer
            grabs the <strong>1st and 3rd</strong> top tiles from the wall
            (leapfrogging over the 2nd). Then each other player takes one tile.
          </p>
          <p>
            <strong>Result:</strong> the Dealer ends up with{" "}
            <strong>14 tiles</strong>, everyone else has <strong>13</strong>.
          </p>
          <Callout variant="tip">
            Don&apos;t worry about memorizing this — the Dealer just grabs two tiles
            instead of one in the last round. The diagram below shows exactly how.
          </Callout>

          {/* Inline 1st-and-3rd diagram — 3 stacks, dealer leapfrogs across stack 2 */}
          <div className="my-4 rounded-xl border-2 border-[var(--color-accent)] bg-[#E8F5EC] p-5">
            <p className="mb-1 text-center text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
              The 13th-tile round — who takes which
            </p>
            <p className="mb-4 text-center text-[13px] italic text-zinc-600">
              Numbers show the order tiles are dealt. The Dealer takes the top of positions
              1 and 3 (the leapfrog), then dealing continues to the other players.
            </p>
            <div className="flex flex-wrap items-start justify-center gap-3 sm:gap-4">
              {[
                {
                  col: 1,
                  top: { num: "1", who: "Dealer", kind: "dealer" as const },
                  bottom: { num: "3", who: "Right", kind: "other" as const },
                },
                {
                  col: 2,
                  top: { num: "4", who: "Across", kind: "other" as const },
                  bottom: { num: "5", who: "Left", kind: "other" as const },
                },
                {
                  col: 3,
                  top: { num: "2", who: "Dealer", kind: "dealer" as const },
                  bottom: { num: "—", who: "stays", kind: "stays" as const },
                },
              ].map((stack) => {
                const tileClass = (kind: "dealer" | "other" | "stays") => {
                  if (kind === "dealer")
                    return "border-[var(--color-accent)] bg-[#D0E8D6] text-[var(--color-accent)]";
                  if (kind === "stays")
                    return "border-zinc-300 bg-zinc-100 text-zinc-400";
                  return "border-[#C9BC8A] bg-[#FAF7EC] text-[var(--color-mid)]";
                };
                return (
                  <div
                    key={stack.col}
                    className="flex flex-col items-center gap-1.5"
                  >
                    {/* The 2-tile stack — top + bottom touching */}
                    <div className="flex flex-col">
                      <div
                        className={`flex h-16 w-14 flex-col items-center justify-center rounded-t-md border-2 font-serif font-black shadow-sm ${tileClass(stack.top.kind)}`}
                      >
                        <span className="text-lg leading-none">{stack.top.num}</span>
                        <span className="mt-0.5 text-center text-[13px] font-bold uppercase tracking-wider leading-tight">
                          {stack.top.who}
                        </span>
                      </div>
                      <div
                        className={`flex h-16 w-14 flex-col items-center justify-center rounded-b-md border-2 border-t-0 font-serif font-black shadow-sm ${tileClass(stack.bottom.kind)}`}
                      >
                        <span className="text-lg leading-none">{stack.bottom.num}</span>
                        <span className="mt-0.5 text-center text-[13px] font-bold uppercase tracking-tight leading-tight">
                          {stack.bottom.who}
                        </span>
                      </div>
                    </div>
                    <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                      Stack {stack.col}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-center text-[13px] italic text-zinc-600">
              <strong>1</strong> + <strong>2</strong> = the Dealer&apos;s two leapfrog
              tiles (top of positions 1 and 3). <strong>3</strong>, <strong>4</strong>,{" "}
              <strong>5</strong> = the other three players get one tile each. The
              bottom of position 3 stays in the wall.
            </p>
          </div>

          {/* Inline 4-rack deal pattern */}
          <div className="my-4 rounded-xl border-2 border-[var(--color-accent)] bg-[#E8F5EC] p-5">
            <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
              Final tile counts after the deal
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { seat: "N", count: 13, isEast: false },
                { seat: "E", count: 14, isEast: true },
                { seat: "S", count: 13, isEast: false },
                { seat: "W", count: 13, isEast: false },
              ].map((rack) => (
                <div
                  key={rack.seat}
                  className={`rounded-lg border-2 p-3 text-center shadow-sm ${
                    rack.isEast
                      ? "border-[var(--color-accent)] bg-[#F0F8F2]"
                      : "border-[var(--color-mid)] bg-white"
                  }`}
                >
                  <div
                    className={`mb-2 font-serif text-lg font-black ${
                      rack.isEast ? "text-[var(--color-accent)]" : "text-[var(--color-mid)]"
                    }`}
                  >
                    {rack.seat}
                  </div>
                  <div className="mb-2 grid grid-cols-7 justify-items-center gap-[2px]">
                    {Array.from({ length: rack.count }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-3 w-2 rounded-sm border ${
                          rack.isEast && i === rack.count - 1
                            ? "border-[var(--color-accent)] bg-[#8BB89A]"
                            : "border-[#C9BC8A] bg-[#FAF7EC]"
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 font-serif text-sm font-black ${
                      rack.isEast
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-mid)] text-white"
                    }`}
                  >
                    {rack.count}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[13px] italic text-zinc-600">
              East gets the highlighted &quot;extra&quot; tile because East starts the play
            </p>
          </div>

        </LessonScreen>

        {/* ── 8. You're set up ── */}
        <LessonScreen title="✨ You're Set Up">
          <p>
            The wall is built, seats are taken, tiles are dealt. Everyone is looking at
            their 13 (or 14) tiles, sorting them on the rack.
          </p>
          <p>
            Next comes the <strong>Charleston</strong> — the unique trading ritual that
            happens before any play begins. We&apos;ll cover that in Lesson 5.
          </p>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={3}
            title="Lesson 4 Check"
            passThreshold={5}
            questions={[
              {
                question: "How many tiles long is each player's wall?",
                options: ["13", "19", "24", "36"],
                correct: 1,
                explanation:
                  "Each wall is 19 tiles long and 2 tiles high. 4 walls × 19 × 2 = 152 tiles, exactly the whole set.",
              },
              {
                question: "How many tiles high is the wall?",
                options: ["1", "2", "3", "4"],
                correct: 1,
                explanation:
                  "2 tiles high. Build the bottom row first, then place the top row on top.",
              },
              {
                question: "Which direction does play and deal move around the table?",
                options: [
                  "Clockwise (to the left)",
                  "Counter-clockwise (to the right)",
                  "Alternating",
                  "It doesn't have a set direction",
                ],
                correct: 1,
                explanation:
                  "Both play and deal move to the right (counter-clockwise). The Dealer deals to themselves, then Right, Across, Left. Turns follow the same order. The next player is always the person on your right.",
              },
              {
                question: "How many tiles does the Dealer (East) start with?",
                options: ["13", "14", "15", "16"],
                correct: 1,
                explanation:
                  "Three players get 13 tiles; the Dealer (East) gets 14. In the final dealing round, the Dealer takes both the 1st and 3rd tiles (the \"leapfrog\") so they end up with one extra.",
              },
              {
                question: "Who decides where to break the wall?",
                options: [
                  "North",
                  "South",
                  "West",
                  "The Dealer (East) rolls the dice",
                ],
                correct: 3,
                explanation:
                  "The Dealer (East) rolls the dice. The total tells the Dealer where in their own wall to break.",
              },
              {
                question: "When a wall runs out of tiles during the deal, whose wall is next?",
                options: [
                  "The Dealer's wall again",
                  "The player across",
                  "The next player to the left",
                  "Any player can offer their wall",
                ],
                correct: 2,
                explanation:
                  "When a wall runs out, the next player to the left pushes their wall toward the center. Dealing continues from there.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 4 Complete">
          <p>
            You can now set up a fresh game of American Mahjong from scratch — something
            most apps don&apos;t even try to teach.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 5 covers the{" "}
            <strong>Charleston</strong> — the unique tile-trading ritual that happens{" "}
            <em>before</em>{" "}the game really starts.
          </p>
          <Link
            href="/play"
            className="mt-3 flex items-center gap-3 rounded-xl border-2 border-[var(--color-accent)] bg-[#E8F5EC] px-4 py-3 transition hover:-translate-y-0.5"
          >
            <span className="text-2xl">{"\u{1F3B2}"}</span>
            <div>
              <div className="font-serif text-sm font-black text-[var(--color-accent)]">Practice Table</div>
              <div className="text-[13px] text-zinc-500">Walk through setup step by step</div>
            </div>
          </Link>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={3}
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
