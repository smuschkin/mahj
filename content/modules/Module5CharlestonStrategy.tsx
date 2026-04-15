import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
import { LessonScreen } from "@/components/LessonScreen";
import { ScreenStepper } from "@/components/ScreenStepper";
import { Callout } from "@/components/Callout";
import { ModuleNav } from "@/components/ModuleNav";
import { Quiz } from "@/components/Quiz";
import { Tile } from "@/components/Tile";
import { TileRow } from "@/components/TileRow";
import { CharlestonDrill } from "@/components/CharlestonDrill";
import { CharlestonSim } from "@/components/CharlestonSim";
import { getAdjacentModules } from "@/lib/modules";

export default function Module5CharlestonStrategy() {
  const adj = getAdjacentModules(5);
  return (
    <PageWrap>
      <ScreenStepper
        moduleNum={5}
        coverProps={{
          eyebrow: "MAHJ — Lesson 6",
          title: "Charleston",
          highlight: "Strategy",
          subtitle: "What to keep, what to pass, and reading what comes back",
        }}
        header={
          <>
            <Cover
              eyebrow="MAHJ — Lesson 6"
              title="Charleston"
              highlight="Strategy"
              subtitle="What to keep, what to pass, and reading what comes back"
            />
            <SectionHeader>Lesson</SectionHeader>
            <MetaBox
              items={[
                {
                  label: "Goal",
                  value:
                    "Learn how to decide what to keep, what to pass, and how to use each Charleston pass strategically.",
                },
                { label: "Estimated time", value: "5–7 minutes" },
                { label: "Prerequisite", value: "Lesson 5 (The Charleston)" },
                { label: "Unlocks", value: "Lesson 7" },
              ]}
            />
          </>
        }
      >
        {/* ── 1. Strategy overview ── */}
        <LessonScreen title="🧠 Thinking Through the Charleston">
          <p>
            Lesson 5 taught you <em>how </em>the Charleston works — the
            directions, the rules, the blind pass. Now we&apos;ll focus on the
            part that wins games:{" "}
            <strong>what to keep, what to pass, and why</strong>.
          </p>
          <p>
            Every pass is a decision. The tiles you choose to give away (and the
            tiles you choose to hold) shape whether you&apos;ll have a fighting
            chance when play begins.
          </p>
          <Callout variant="info">
            <strong>The golden rule:</strong> Keep tiles that work together. Pass
            tiles that are isolated and hard to use.
          </Callout>
        </LessonScreen>

        {/* ── 2. Organizing your tiles ── */}
        <LessonScreen title="🗂️ Organize Your Tiles First">
          <p>
            Before you pass anything, <strong>sort your rack</strong>. This
            takes 10 seconds and makes every decision easier.
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Group by suit</strong> — put all your Bams together,
              Craks together, Dots together
            </li>
            <li>
              <strong>Order by number</strong> within each suit — low to high
            </li>
            <li>
              <strong>Put Winds, Dragons, and Flowers</strong> on one end
            </li>
            <li>
              <strong>Jokers</strong> on the other end — keep them visible
            </li>
          </ol>
          <p className="mt-3">
            Now you can see at a glance: which suit do I have the most of?
            Do I have pairs? Are any tiles completely isolated?
          </p>
          <Callout variant="tip">
            Get in the habit of sorting <strong>every time</strong> you pick
            up tiles — after the deal, after each Charleston pass, and
            during play. It becomes automatic fast.
          </Callout>
        </LessonScreen>

        {/* ── 3. Pass 1: First Right — decision-making ── */}
        <LessonScreen title="👉 Pass 1: First Right">
          <p>
            Your tiles are sorted. Now pick <strong>3 to pass</strong>.
            The rule is simple: <strong>tiles that have friends stay.
            Tiles that are alone go.</strong>
          </p>

          <TileRow caption="Your sorted rack (13 tiles) — which 3 would you pass?">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-wrap justify-center gap-1">
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="crack" value={1} size="sm" marked />
                <Tile type="crack" value={5} size="sm" />
                <Tile type="crack" value={5} size="sm" />
                <Tile type="dot" value={7} size="sm" />
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                <Tile type="dot" value={8} size="sm" />
                <Tile type="dot" value={9} size="sm" marked />
                <Tile type="wind" value="W" size="sm" marked />
                <Tile type="dragon" value="green" size="sm" />
                <Tile type="joker" size="sm" />
                <Tile type="flower" value={1} size="sm" />
              </div>
            </div>
          </TileRow>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-accent)]">
            Tiles with friends (keep)
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li><strong>2-3-4 Bam</strong> — three in a row, fits consecutive hands</li>
            <li><strong>5-5 Crak</strong> — a pair, always useful</li>
            <li><strong>7-8 Dot</strong> — two in a row, could become a group</li>
            <li><strong>Green Dragon</strong> — matches with your Bams (Green → Bams)</li>
          </ul>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-red)]">
            Tiles alone (pass these)
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li><strong>1 Crak</strong> — far from your 5-5 Crak pair, no connection</li>
            <li><strong>9 Dot</strong> — doesn&apos;t connect, 7-8 work together without it</li>
            <li><strong>West Wind</strong> — a lone wind with no pair is dead weight</li>
          </ul>


          <Callout variant="warn">
            <strong>Never pass a Joker or Flower.</strong>{" "}Jokers are your
            most valuable tile, and Flowers fit into many hands.
          </Callout>
        </LessonScreen>

        {/* ── 3. Pass 2: First Across — strategy ── */}
        <LessonScreen title="↔️ Pass 2: First Across">
          <p>
            You got 3 new tiles from the right. Re-sort, then pass 3{" "}
            <strong>across</strong>. Your hand should be getting clearer now.
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li>
              <strong>Did the new tiles help?</strong>{" "}Double down on that suit.
            </li>
            <li>
              <strong>Still have loners?</strong>{" "}Pass them — they won&apos;t
              magically connect.
            </li>
            <li>
              <strong>You can re-pass received tiles.</strong>{" "}If they
              don&apos;t help your hand, send them across.
            </li>
            <li>
              <strong>Start glancing at the card</strong>{" "}— which hands match
              your strongest suit?
            </li>
          </ul>
        </LessonScreen>

        {/* ── 4. Pass 3: First Left — strategy ── */}
        <LessonScreen title="👈 Pass 3: First Left">
          <p>
            Last pass of the first Charleston — pass 3 to your{" "}
            <strong>left</strong>. Time to commit to a direction.
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li>
              <strong>Dump your weakest suit.</strong>{" "}If you&apos;re building
              Bams, pass leftover Craks and Dots.
            </li>
            <li>
              <strong>Stay flexible.</strong>{" "}Keep tiles that fit 2+ hands
              on the card — don&apos;t lock in yet.
            </li>
            <li>
              <strong>Blind pass is allowed here.</strong>{" "}If you don&apos;t
              have 3 tiles to spare, pass some received tiles without looking.
            </li>
          </ul>
        </LessonScreen>

        {/* ── 5. Second Charleston strategy ── */}
        <LessonScreen title="🔁 Second Charleston: Left, Across, Last Right">
          <p>
            If the table agrees to continue, the second Charleston goes in{" "}
            <strong>reverse</strong>: left → across → last right.
          </p>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            How to pass each one
          </h4>
          <ol className="ml-6 list-decimal space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Second Left</strong> — pass 3 face down in a{" "}
              <strong>pyramid</strong>{" "}(1 on top, 2 on bottom) to your left.
              This signals it&apos;s the second Charleston.
            </li>
            <li>
              <strong>Second Across</strong> — pass 3 face down in a row across.
            </li>
            <li>
              <strong>Last Right</strong> — pass 3 face down in a row to your
              right. Blind pass is allowed on this one.
            </li>
          </ol>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Strategy tips
          </h4>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li>
              <strong>By now you should be committed</strong>{" "}to 1-2 hands on
              the card. Pass everything that doesn&apos;t fit.
            </li>
            <li>
              <strong>Be more aggressive.</strong>{" "}You&apos;ve had 3 passes to
              shape your hand — dump your remaining junk fast.
            </li>
            <li>
              <strong>If your hand is strong, say &quot;stop&quot;</strong>{" "}
              before the second Charleston starts. Don&apos;t give opponents
              more chances to improve.
            </li>
          </ul>
        </LessonScreen>

        {/* ── 6. Reading the passes ── */}
        <LessonScreen title="👀 Reading What Comes Back">
          <p>
            The tiles you <em>receive </em>during the Charleston are clues
            about what others don&apos;t want.
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li>
              <strong>Getting lots of one suit?</strong>{" "}Nobody wants it —
              good news if it&apos;s the suit you&apos;re collecting.
            </li>
            <li>
              <strong>Not seeing a suit at all?</strong>{" "}Someone is hoarding
              it. Don&apos;t build a hand that needs those tiles.
            </li>
            <li>
              <strong>Receiving Winds and Dragons?</strong>{" "}Nobody is going
              for a Winds/Dragons hand. You can safely pass yours too.
            </li>
            <li>
              <strong>It goes both ways.</strong>{" "}They&apos;re reading your
              passes too — avoid passing 3 tiles of the same suit.
            </li>
          </ul>
        </LessonScreen>

        {/* ── 7. Courtesy pass strategy ── */}
        <LessonScreen title="🤝 Courtesy Pass Strategy">
          <p>
            After both Charlestons, you and the player across can do one last
            optional trade: the <strong>courtesy</strong>. Here&apos;s how to
            think about whether to use it.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            When to say yes
          </h4>
          <p>
            The courtesy is powerful when you&apos;re{" "}
            <strong>one tile away</strong> from a specific shape:
          </p>

          <TileRow caption="Going for even-numbered Bams. You just need one more 8 Bam.">
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={6} size="sm" />
            <Tile type="bam" value={6} size="sm" />
            <Tile type="bam" value={8} size="sm" />
            <Tile type="crack" value={2} size="sm" />
            <Tile type="crack" value={4} size="sm" marked />
            <Tile type="dot" value={6} size="sm" />
            <Tile type="dragon" value="green" size="sm" />
            <Tile type="dragon" value="green" size="sm" />
            <Tile type="wind" value="E" size="sm" />
          </TileRow>

          <p className="text-[14px] text-zinc-600">
            The player across has been discarding Craks all Charleston — they
            probably don&apos;t want yours either. Ask for a 1-tile courtesy:
            trade your useless 4 Crak for whatever they don&apos;t want. You
            might get lucky.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            When to skip it
          </h4>
          <p>
            Say <strong>&quot;zero&quot;</strong> if:
          </p>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>You&apos;re not sure what hand you&apos;re building yet</li>
            <li>You don&apos;t have any obvious junk left to trade</li>
            <li>
              The player across seems to know your hand too well (they&apos;ve
              been passing you exactly what you need — suspicious)
            </li>
            <li>
              You&apos;re new and overwhelmed — there&apos;s no shame in zero
            </li>
          </ul>

          <Callout variant="tip">
            <strong>Permission to be cautious:</strong> &quot;Zero&quot; is the
            right default for your first 5–10 games. You will not lose by
            skipping the courtesy. You <em>can</em> lose by trading away a tile
            you didn&apos;t realize you needed.
          </Callout>
        </LessonScreen>

        {/* ── 7. Practice drill ── */}
        <LessonScreen title="🔄 Practice: Pick Your Passes">
          <p>
            Time to practice. We&apos;ll show you 4 hands with a target — pick
            the 3 tiles you&apos;d pass in the Charleston.
          </p>
          <CharlestonDrill />
        </LessonScreen>

        {/* ── 8. Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={5}
            title="Lesson 6 Check"
            passThreshold={4}
            questions={[
              {
                question:
                  "You have a pair of 5 Craks and a Lone 1 Crak. What should you do with the 1 Crak?",
                options: [
                  "Keep it — same suit as the pair",
                  "Pass it — it's too far from the 5s to be useful",
                  "Only keep it if you have other Craks",
                  "Always pass singles first",
                ],
                correct: 1,
                explanation:
                  "A Lone 1 Crak is far from a pair of 5 Craks. It's isolated and unlikely to help. Pass it and keep tiles that connect.",
              },
              {
                question:
                  "During the Charleston, you keep receiving Dot tiles from other players. What does this tell you?",
                options: [
                  "Everyone is collecting Dots",
                  "Nobody wants Dots — good news if you're collecting them",
                  "You should pass Dots too",
                  "Nothing useful",
                ],
                correct: 1,
                explanation:
                  "If other players are passing Dots, they're not collecting them. That's good news for you if Dots are part of your plan.",
              },
              {
                question:
                  "You pass 3 Bam tiles in the first right pass. What information did you just give your opponents?",
                options: [
                  "Nothing — passes are face-down",
                  "That you probably aren't building a Bam hand",
                  "That you have too many Bams",
                  "It depends on which Bams",
                ],
                correct: 1,
                explanation:
                  "The player who receives your tiles sees them. Passing 3 of the same suit signals you're not collecting that suit. Information goes both ways.",
              },
              {
                question:
                  "When should you consider saying \"zero\" to the courtesy pass?",
                options: [
                  "When you're ahead",
                  "When you don't have any clear junk to trade",
                  "Only if the other player says zero first",
                  "Never — always do the courtesy",
                ],
                correct: 1,
                explanation:
                  "If you don't have obvious tiles to give away, or you're unsure what you're building, \"zero\" is the smart, safe answer.",
              },
              {
                question:
                  "What's the best approach when choosing tiles to keep during the Charleston?",
                options: [
                  "Keep the highest-value tiles",
                  "Keep tiles that fit at least two possible hands on the card",
                  "Keep one tile of each suit",
                  "Keep only pairs",
                ],
                correct: 1,
                explanation:
                  "Flexibility is power. Keeping tiles that could work for multiple hands on the card gives you the best chance of finding a winning path.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── 9. Completion ── */}
        <LessonScreen title="🎉 Lesson 6 Complete">
          <p>
            You now have a strategic framework for the Charleston. You know how
            to group your tiles, identify junk, read what comes back, and decide
            when the courtesy is worth it.
          </p>
          <p>
            <strong>What&apos;s next:</strong> Lesson 7 takes you deeper into
            the game itself — building your hand, reading the card, and making
            smart choices during play.
          </p>
        </LessonScreen>

        <LessonScreen title="">
          <CharlestonSim />
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={5}
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
