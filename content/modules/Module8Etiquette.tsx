import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
import { LessonScreen } from "@/components/LessonScreen";
import { ScreenStepper } from "@/components/ScreenStepper";
import { Callout } from "@/components/Callout";
import { ModuleNav } from "@/components/ModuleNav";
import { Quiz } from "@/components/Quiz";
import { getAdjacentModules } from "@/lib/modules";

/* ── Local helper ── */

function DoDontRow({
  doText,
  dontText,
}: {
  doText: React.ReactNode;
  dontText: React.ReactNode;
}) {
  return (
    <div className="my-2 grid gap-2 sm:grid-cols-2">
      <div className="rounded-md border-l-4 border-[var(--color-green)] bg-[#F4FBF6] p-3 text-[13px]">
        <div className="font-black text-[var(--color-green)]">✅ DO</div>
        <div className="text-zinc-700">{doText}</div>
      </div>
      <div className="rounded-md border-l-4 border-[var(--color-red)] bg-[#FFF6F4] p-3 text-[13px]">
        <div className="font-black text-[var(--color-red)]">❌ DON&apos;T</div>
        <div className="text-zinc-700">{dontText}</div>
      </div>
    </div>
  );
}

export default function Module8Etiquette() {
  const adj = getAdjacentModules(11);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={11} coverProps={{ eyebrow: "MAHJ — Lesson 12", title: "Etiquette &", highlight: "Table Culture", subtitle: "The unwritten (and a few written) rules that make you welcome at any mahjong table" }} header={<><Cover
        eyebrow="MAHJ — Lesson 12"
        title="Etiquette &"
        highlight="Table Culture"
        subtitle="The unwritten (and a few written) rules that make you welcome at any mahjong table"
      />
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Learn the announcing rules, the official misnamed-tile penalty, the pause-before-racking convention, and the social customs that make mahjong fun for everyone.",
          },
          { label: "Estimated time", value: "6–8 minutes" },
          { label: "Prerequisite", value: "Lesson 11 (Defense)" },
          { label: "Unlocks", value: "Lesson 13 (Common Mistakes)" },
          {
            label: "Why it matters",
            value:
              "Etiquette is the difference between being invited back and not. Most beginner missteps aren't strategy mistakes — they're table-culture mistakes.",
          },
        ]}
      /></>}>
        {/* ── 1. Why etiquette ── */}
        <LessonScreen title="🤝 Why Etiquette Matters">
          <p>
            Mahjong is a social game — etiquette isn&apos;t about being
            formal, it&apos;s about not slowing down the game and not
            making others uncomfortable.
          </p>
          <p>
            Some of these are <strong>official NMJL rules</strong>{" "}with
            real penalties. Others are <strong>customs</strong>{" "}that vary
            by group.
          </p>
        </LessonScreen>

        {/* ── 2. Naming your discard ── */}
        <LessonScreen title='🗣️ Name Every Discard Out Loud (NMJL Rule)'>
          <p>
            Every discard must be <strong>named out loud</strong>{" "}as you place it in
            the center of the table. This is an official rule, not just a politeness.
          </p>
          <p>
            Say the tile clearly: <strong>&quot;Four Bam.&quot;</strong>{" "}
            <strong>&quot;Red.&quot;</strong>{" "}
            <strong>&quot;West.&quot;</strong>{" "}Then place it face-up where everyone can
            see.
          </p>

          <Callout variant="warn">
            <strong>Never discard silently.</strong>{" "}Other players need to
            hear what was thrown to decide if they want to call it.
          </Callout>
        </LessonScreen>

        {/* ── 3. Misnamed discard rule ── */}
        <LessonScreen title="⚠️ The Misnamed-Discard Rule">
          <p>
            If you say the wrong name when discarding, there are real
            consequences (NMJL Article 67):
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>A tile can&apos;t be claimed</strong>{" "}until it&apos;s correctly named</li>
            <li>If someone <strong>calls based on the wrong name</strong>, their call is invalid</li>
            <li>If someone calls <strong>Mahjong</strong>{" "}on a misnamed tile, the misnamer pays for all three losers</li>
          </ul>
          <Callout variant="tip">
            <strong>Beginner habit:</strong>{" "}Look at the tile, say its name,{" "}
            <em>then</em>{" "}let go.
          </Callout>
        </LessonScreen>

        {/* ── 4. Pause before racking ── */}
        <LessonScreen title="⏸️ The Pause Before Racking">
          <p>
            After you draw from the wall,{" "}
            <strong>pause 2–3 seconds before racking</strong>. This
            gives other players time to call the previous discard.
          </p>
          <p>
            Once you rack your tile, the previous discard is gone —
            no one can call it anymore. Don&apos;t rush.
          </p>
        </LessonScreen>

        {/* ── 5. Calling Mahjong + the window ── */}
        <LessonScreen title="🏆 Calling Mahjong">
          <p>
            Say <strong>&quot;wait&quot;</strong>{" "}the instant you see
            your winning tile. Verify against the card, then call{" "}
            <strong>&quot;Mahjong.&quot;</strong>
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>Verify first</strong> — a false call makes your hand dead</li>
            <li><strong>Don&apos;t hesitate</strong> — once the next player racks, it&apos;s too late</li>
            <li><strong>Keep your tiles on the rack</strong>{" "}until the table confirms the win is valid</li>
          </ul>
        </LessonScreen>

        {/* ── 6. Pace of play ── */}
        <LessonScreen title="⏱️ Pace of Play">
          <p>
            Being slow as a beginner is normal. But try to keep up:
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>Charleston</strong> — each pass should take seconds, not minutes</li>
            <li><strong>Your turn</strong> — draw, think briefly, discard. Aim for 5–10 seconds.</li>
          </ul>
          <Callout variant="tip">
            Tell your group <strong>&quot;I&apos;m new&quot;</strong>{" "}—
            almost every table will be patient.
          </Callout>
        </LessonScreen>

        {/* ── 7. Hands, racks, walls ── */}
        <LessonScreen title="🙅 Hands Off Other People&apos;s Stuff">
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>Keep your tiles hidden</strong> — never show your hand, even between rounds</li>
            <li><strong>Only touch the wall on your turn</strong> — don&apos;t reach early</li>
            <li><strong>Joker exchange?</strong>{" "}Hand the tile to the player — don&apos;t touch their rack</li>
            <li><strong>Don&apos;t touch another player&apos;s wall</strong> — push your own when asked</li>
          </ul>
        </LessonScreen>

        {/* ── 8. Social customs ── */}
        <LessonScreen title="☕ Social Customs">
          <p>
            These vary by group but are close to universal:
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>No commenting on hands</strong> during play</li>
            <li><strong>Phones away</strong> from the table</li>
            <li><strong>Food and drinks</strong> on a side table, away from tiles</li>
            <li><strong>No coaching mid-hand</strong> — save advice for between rounds</li>
            <li><strong>Compliment a good hand</strong> — say so when someone wins</li>
            <li><strong>Don&apos;t gloat or sulk</strong> — the game has lots of luck</li>
          </ul>

        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={11}
            title="Lesson 12 Check"
            passThreshold={4}
            questions={[
              {
                question:
                  "What must you do every time you discard a tile?",
                options: [
                  "Nothing — just place it down",
                  "Name the tile out loud",
                  "Wait for permission",
                  "Show it to the player on your right",
                ],
                correct: 1,
                explanation:
                  "Naming your discard out loud is an NMJL rule, not optional politeness. Other players need to hear it in order to call.",
              },
              {
                question:
                  "If you misname a discard and someone calls Mahjong on it, what happens?",
                options: [
                  "The Mahjong call is invalid",
                  "You owe nothing — it's their mistake",
                  "The Mahjong is valid and YOU pay the winner the full amount all three losers would have paid combined",
                  "The hand is replayed",
                ],
                correct: 2,
                explanation:
                  "Per NMJL Article 67: a Mahjong claim on a misnamed tile is valid, and the misnamer pays the winner the full amount all three losers would have paid combined. The other two players don't pay anything. This is the most expensive mistake in the game.",
              },
              {
                question:
                  "When does the previous player's discard officially become uncallable?",
                options: [
                  "When the next player draws from the wall",
                  "When the next player racks their drawn tile",
                  "After 5 seconds",
                  "When the dealer says so",
                ],
                correct: 1,
                explanation:
                  "The discard is callable until the next player racks their drawn tile (places it on the sloped part of the rack). That's why pausing before racking is good etiquette — it gives people time to call.",
              },
              {
                question: "What is the right pace for the Charleston?",
                options: [
                  "Take all the time you need — minutes per pass",
                  "Brisk — seconds per pass, the whole thing in under ~2 minutes",
                  "Wait for everyone to be ready, no rush",
                  "Skip it if you're slow",
                ],
                correct: 1,
                explanation:
                  "The Charleston is meant to be quick. Each pass takes seconds. Beginners are forgiven for being slower, but the goal is to develop a fast rhythm.",
              },
              {
                question:
                  "An opponent has a Joker in an exposed group and you want to swap. What's the etiquette?",
                options: [
                  "Reach across and place your tile on their rack yourself",
                  "Hand them your real tile and let them swap it",
                  "Just take the joker — they'll figure it out",
                  "Ask the dealer to do it",
                ],
                correct: 1,
                explanation:
                  "You hand the real tile to the player whose rack holds the joker. They make the actual swap and hand you the joker. Reaching onto someone else's rack is considered rude.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 12 Complete">
          <p>
            You now know the table customs that separate a guest who gets invited back
            from one who doesn&apos;t. You know the official rules with teeth (naming
            discards, the misnamed-tile penalty, the racking window) and the social
            ones that just make the game pleasant.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 13 covers{" "}
            <strong>Common Mistakes</strong> — the errors every beginner
            makes, and how to recover from them gracefully.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={11}
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
