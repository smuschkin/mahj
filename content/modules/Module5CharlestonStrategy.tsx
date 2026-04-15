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
          eyebrow: "MAHJ — Module 5",
          title: "Charleston",
          highlight: "Strategy",
          subtitle: "What to keep, what to pass, and reading what comes back",
        }}
        header={
          <>
            <Cover
              eyebrow="MAHJ — Module 5"
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
                { label: "Prerequisite", value: "Module 4 (The Charleston)" },
                { label: "Unlocks", value: "Module 6" },
              ]}
            />
          </>
        }
      >
        {/* ── 1. Strategy overview ── */}
        <LessonScreen title="🧠 Thinking Through the Charleston">
          <p>
            Module 4 taught you <em>how</em> the Charleston works — the
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

        {/* ── 2. Pass 1: First Right — decision-making ── */}
        <LessonScreen title="👉 Pass 1: First Right — What to Pass?">
          <p>
            The Charleston starts. You look at your 13 tiles and need to pick{" "}
            <strong>3 to give away</strong>. Here&apos;s how to think about it:
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            Step 1: Group your tiles
          </h4>
          <p>
            Sort your tiles mentally into groups: pairs, matching suits,
            consecutive numbers, and Lonely tiles that don&apos;t connect to
            anything.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            Step 2: Identify your junk
          </h4>
          <p>
            Look for tiles that are <strong>isolated</strong> — single tiles
            with no partner, no matching suit nearby, or numbers far from your
            other tiles in the same suit. Those are your pass candidates.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            Step 3: Worked example
          </h4>

          <TileRow caption="Dashed tiles below would be passed. Why those three?">
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={3} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="crack" value={5} size="sm" />
            <Tile type="crack" value={5} size="sm" />
            <Tile type="dot" value={7} size="sm" />
            <Tile type="dot" value={8} size="sm" />
            <Tile type="wind" value="E" size="sm" />
            <Tile type="wind" value="N" size="sm" />
            <Tile type="dragon" value="green" size="sm" />
            <Tile type="crack" value={1} size="sm" marked />
            <Tile type="dot" value={9} size="sm" marked />
            <Tile type="wind" value="W" size="sm" marked />
          </TileRow>

          <div className="my-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-md border-l-4 border-[var(--color-green)] bg-white p-3 text-[13px]">
              <div className="font-black text-[var(--color-mid)]">
                ✅ Keep — 2-3-4 Bam
              </div>
              These fit many &quot;consecutive number&quot; hands on the card.
              Keep tiles that work together.
            </div>
            <div className="rounded-md border-l-4 border-[var(--color-green)] bg-white p-3 text-[13px]">
              <div className="font-black text-[var(--color-mid)]">
                ✅ Keep — pair of 5 Craks
              </div>
              Pairs are valuable — they can grow into groups of 3 or stay as
              the final pair.
            </div>
            <div className="rounded-md border-l-4 border-[var(--color-red)] bg-white p-3 text-[13px]">
              <div className="font-black text-[var(--color-mid)]">
                ❌ Pass — Lone 1 Crak
              </div>
              Isolated, far from your other Craks. Hard to use.
            </div>
            <div className="rounded-md border-l-4 border-[var(--color-red)] bg-white p-3 text-[13px]">
              <div className="font-black text-[var(--color-mid)]">
                ❌ Pass — Lone 9 Dot
              </div>
              Sits at the edge of your 7-8 Dot pair. Sacrifice it.
            </div>
            <div className="rounded-md border-l-4 border-[var(--color-red)] bg-white p-3 text-[13px] sm:col-span-2">
              <div className="font-black text-[var(--color-mid)]">
                ❌ Pass — Lone West Wind
              </div>
              A single Wind or Dragon by itself is dead weight unless it pairs up.
            </div>
          </div>

          <Callout variant="warn">
            <strong>Never pass a Joker.</strong> Jokers are gold — you&apos;d be
            giving away your single most valuable tile.
          </Callout>
        </LessonScreen>

        {/* ── 3. Pass 2: First Across — strategy ── */}
        <LessonScreen title="↔️ Pass 2: First Across — Narrowing Your Focus">
          <p>
            You&apos;ve passed 3 tiles right and received 3 new ones. Now pass 3
            to the player <strong>across</strong> from you.
          </p>
          <p>
            This is where strategy starts to sharpen. After receiving your first
            set of new tiles, you should have a better sense of which suits and
            numbers are clustering in your hand.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            What to think about
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>Did the new tiles help?</strong> If you got tiles in the
              same suit you&apos;re collecting, great — double down on that
              direction.
            </li>
            <li>
              <strong>Still have orphans?</strong> Pass them. Tiles that didn&apos;t
              connect to anything before the first pass probably won&apos;t connect now.
            </li>
            <li>
              <strong>You can re-pass tiles you just received.</strong> If the
              tiles from the right don&apos;t help your hand, send them across.
              No rule against it.
            </li>
          </ul>

          <Callout variant="tip">
            By now you may be starting to see what hand-shape your tiles
            support. Start glancing at the card to find hands that match your
            strongest suit or number pattern.
          </Callout>
        </LessonScreen>

        {/* ── 4. Pass 3: First Left — strategy ── */}
        <LessonScreen title="👈 Pass 3: First Left — Last Chance to Clean Up">
          <p>
            Pass 3 to the player on your <strong>left</strong>. This completes
            the first Charleston.
          </p>
          <p>
            By now you should be committing to a direction. If you&apos;ve been
            collecting Bams, pass away your leftover Craks and Dots. If you have
            a strong pair-based hand, shed your Lonely singles.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            The &quot;two-hand&quot; trick
          </h4>
          <p>
            Try to keep tiles that fit <strong>at least two possible hands</strong>{" "}
            on the card. You don&apos;t need to lock in one specific hand yet —
            flexibility is power. Pass tiles that only work for hands you&apos;ve
            already abandoned.
          </p>

          <Callout variant="tip">
            Remember: the first left is one of the two passes where a{" "}
            <strong>blind pass</strong> is allowed. If you don&apos;t have 3
            tiles to spare, you can pass along some of the tiles you just
            received from the right without looking at them.
          </Callout>
        </LessonScreen>

        {/* ── 5. Reading the passes ── */}
        <LessonScreen title="👀 Reading What Comes Back">
          <p>
            The tiles you <em>receive</em> during the Charleston are clues about
            what other players don&apos;t want. Pay attention.
          </p>

          <div className="my-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-md border-l-4 border-[var(--color-green)] bg-white p-3 text-[13px]">
              <div className="font-black text-[var(--color-mid)]">
                📥 Getting lots of one suit?
              </div>
              Nobody else wants it — that&apos;s actually good news for you if
              it&apos;s the suit you&apos;re collecting.
            </div>
            <div className="rounded-md border-l-4 border-[var(--color-red)] bg-white p-3 text-[13px]">
              <div className="font-black text-[var(--color-mid)]">
                📥 Not seeing a suit at all?
              </div>
              Someone is hoarding it. Avoid building a hand that depends on
              those tiles — they&apos;re spoken for.
            </div>
            <div className="rounded-md border-l-4 border-[var(--color-border)] bg-white p-3 text-[13px] sm:col-span-2">
              <div className="font-black text-[var(--color-mid)]">
                📥 Receiving Winds and Dragons?
              </div>
              Honor tiles being passed around often means nobody is going for a
              Winds or Dragons hand. You can probably pass yours safely too.
            </div>
          </div>

          <Callout variant="info">
            <strong>Information goes both ways.</strong> Just as you&apos;re
            reading their passes, they&apos;re reading yours. Be aware that
            passing 3 tiles of the same suit tells your opponents exactly what
            you&apos;re <em>not</em> building.
          </Callout>
        </LessonScreen>

        {/* ── 6. Courtesy pass strategy ── */}
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
            title="Module 5 Check"
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
        <LessonScreen title="🎉 Module 5 Complete">
          <p>
            You now have a strategic framework for the Charleston. You know how
            to group your tiles, identify junk, read what comes back, and decide
            when the courtesy is worth it.
          </p>
          <p>
            <strong>What&apos;s next:</strong> Module 6 takes you deeper into
            the game itself — building your hand, reading the card, and making
            smart choices during play.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <SectionHeader>Practice</SectionHeader>
      <CharlestonSim />

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
