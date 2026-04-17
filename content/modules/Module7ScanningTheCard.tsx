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

export default function Module7ScanningTheCard() {
  const adj = getAdjacentModules(7);
  return (
    <PageWrap>
      <ScreenStepper
        moduleNum={7}
        coverProps={{
          eyebrow: "MAHJ — Lesson 8",
          title: "Scanning the",
          highlight: "Card",
        }}
        header={
          <>
            <Cover
              eyebrow="MAHJ — Lesson 8"
              title="Scanning the"
              highlight="Card"
              subtitle="How to match your tiles to hands on the card"
            />
            <MetaBox
              items={[
                {
                  label: "Goal",
                  value:
                    "Learn to quickly scan your tiles against the card and identify 2\u20133 candidate hands.",
                },
                { label: "Estimated time", value: "5\u20137 minutes" },
                { label: "Prerequisite", value: "Lesson 7 (Jokers & Calling)" },
                { label: "Unlocks", value: "Lesson 9 (Starting the Game)" },
              ]}
            />
          </>
        }
      >
        {/* ── 1. The moment after the deal ── */}
        <LessonScreen title="🃏 After the Charleston">
          <p>
            The Charleston is done. You have your final 13 tiles, sorted on
            your rack. Now it&apos;s time to look at the card and figure out
            which hands you&apos;re going for.
          </p>
          <p>
            This lesson teaches you a <strong>simple scanning method</strong>{" "}
            — a step-by-step way to match your tiles to hands on the card.
          </p>
        </LessonScreen>

        {/* ── 2. The card is the game ── */}
        <LessonScreen title="🎯 Quick Recap: The Card Is the Game">
          <p>
            American Mahjong is a <strong>target-matching</strong>{" "}game. Your
            job every turn is to ask:{" "}
            <em>
              which hand on the card am I building, and is this tile getting me
              closer or farther?
            </em>
          </p>
          <p>
            You aren&apos;t collecting pretty tiles or chasing vague patterns.
            Every tile on your rack either fits a specific hand on the card — or
            it doesn&apos;t. Scanning is how you figure out which is which.
          </p>
        </LessonScreen>

        {/* ── 3. Step 1 — Sort your rack ── */}
        <LessonScreen title="📐 Step 1: Sort Your Rack">
          <p>
            You learned this in Lesson 6 — sort by suit, then by number
            within each suit. Winds, Dragons, Flowers, and Jokers on the ends.
          </p>
          <p>
            Your rack should already be sorted from the Charleston. If not,
            take 10 seconds to organize before scanning the card.
          </p>
        </LessonScreen>

        {/* ── 4. Step 2 — Find your biggest cluster ── */}
        <LessonScreen title="🔍 Step 2: Find Your Biggest Cluster">
          <p>
            Now look at what you&apos;ve got. Which suit has the most tiles?
            That&apos;s your biggest cluster, and it&apos;s your starting point.
          </p>
          <ul className="ml-6 list-disc space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Heavy in one suit?</strong>{" "}Start with card categories
              that use a lot of that suit. If you have five Bams, look at
              hands that are Bam-heavy.
            </li>
            <li>
              <strong>Mostly even numbers?</strong>{" "}Check hands in the 2468
              section of the card.
            </li>
            <li>
              <strong>Mostly odd numbers?</strong>{" "}Check hands in the 1357
              or 13579 sections.
            </li>
            <li>
              <strong>Lots of honors?</strong>{" "}Head straight to the
              winds/dragons categories.
            </li>
          </ul>
          <p>
            The cluster tells you where on the card to <em>start looking</em>.
            You don&apos;t need to read every single hand — just the sections
            that match what you already hold.
          </p>
        </LessonScreen>

        {/* ── 5. Step 3 — Spot pairs and triples ── */}
        <LessonScreen title="👀 Step 3: Spot Pairs and Triples">
          <p>
            Now look for <strong>duplicates</strong> in your sorted rack:
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>2 of the same = a pair</strong> — head start on any hand needing that tile</li>
            <li><strong>3 of the same = a group</strong> — look for hands that use this number</li>
            <li><strong>4 of the same = a kong</strong> — narrows your search to hands with kongs</li>
          </ul>
          <Callout variant="tip">
            Duplicates are your strongest signals. Start with hands that
            already use tiles you have.
          </Callout>
        </LessonScreen>

        {/* ── 6. Step 4 — Check the year hand ── */}
        <LessonScreen title="📅 Step 4: Check the Year Hand">
          <p>
            Quick check: do you have tiles matching this year&apos;s digits
            (2, 0, 2, 6)? Remember, 0 = Soap (White Dragon).
          </p>
          <p>
            Year hands are popular but competitive — lots of players go for
            them. Keep it as a candidate, not your only option.
          </p>
        </LessonScreen>

        {/* ── 7. Step 5 — Pick 2–3 candidates ── */}
        <LessonScreen title="🎲 Step 5: Pick 2–3 Candidates">
          <p>
            Find <strong>2 or 3 hands</strong>{" "}on the card that your tiles
            are closest to. For each one, ask:
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>How many tiles do I already have</strong>{" "}for this hand?</li>
            <li><strong>How many do I still need?</strong>{" "}Fewer = better.</li>
            <li><strong>Do my candidates share tiles?</strong>{" "}Overlapping tiles let you stay flexible longer.</li>
          </ul>
          <p className="mt-3 text-[14px] text-zinc-700">
            Tiles that fit <strong>none</strong>{" "}of your candidates are your
            first discards.
          </p>
        </LessonScreen>

        {/* ── 8. When to narrow down ── */}
        <LessonScreen title="⚠️ When to Narrow Down">
          <p>
            You&apos;ve picked 2–3 candidates. Now the question is:{" "}
            <strong>when do you commit to one?</strong>
          </p>

          <div className="my-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border-2 border-[var(--color-accent)] bg-[#E8F5EC] p-3 text-center">
              <div className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                Right now
              </div>
              <div className="my-1 font-serif text-2xl font-black text-[var(--color-mid)]">
                2–3 hands
              </div>
              <div className="text-[12px] text-zinc-600">
                Stay flexible. Discard tiles that fit none.
              </div>
            </div>
            <div className="rounded-lg border-2 border-[var(--color-red)] bg-[#FFF6F4] p-3 text-center">
              <div className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-red)]">
                After 5–6 draws
              </div>
              <div className="my-1 font-serif text-2xl font-black text-[var(--color-mid)]">
                1 hand
              </div>
              <div className="text-[12px] text-zinc-600">
                Commit. Dump tiles from your other candidates.
              </div>
            </div>
          </div>

          <Callout variant="tip">
            Scanning gets faster with practice. Your first few games will
            feel slow — that&apos;s normal. The table will wait.
          </Callout>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={7}
            title="Lesson 8 Check"
            passThreshold={3}
            questions={[
              {
                question:
                  "After the Charleston, what's the first step when scanning the card?",
                options: [
                  "Pick a hand immediately",
                  "Make sure your rack is sorted by suit",
                  "Start discarding tiles",
                  "Count your jokers",
                ],
                correct: 1,
                explanation:
                  "Make sure your rack is sorted — Bams, Craks, Dots grouped together, ordered by number. This makes patterns visible.",
              },
              {
                question:
                  "Why pick 2\u20133 candidate hands instead of just 1?",
                options: [
                  "The rules require it",
                  "Almost every tile you draw will be useful for at least one candidate",
                  "It makes the game more fun",
                  "So you can change your mind later",
                ],
                correct: 1,
                explanation:
                  "With 2\u20133 candidates, most tiles you draw are useful for something. Committing to 1 hand too early means every bad draw is a wasted turn.",
              },
              {
                question:
                  "Tiles that fit NONE of your candidates should be:",
                options: [
                  "Held in case they become useful",
                  "Your first discards",
                  "Traded for jokers",
                  "Kept on your rack for safety",
                ],
                correct: 1,
                explanation:
                  "Tiles that fit none of your candidates have zero value. Discard them first.",
              },
              {
                question:
                  "What's the strongest signal that a hand is a good candidate for you?",
                options: [
                  "It's worth the most points",
                  "You already hold pairs or triples that the hand uses",
                  "It's at the top of the card",
                  "Another player is going for it too",
                ],
                correct: 1,
                explanation:
                  "Pairs and triples you already hold are the strongest signals. A hand that uses tiles you have is far more realistic.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 8 Complete">
          <p>
            You now have a repeatable method for scanning your tiles against
            the card. Sort, cluster, spot duplicates, check the year hand,
            and pick 2–3 candidates. With practice, this will become second
            nature.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 9 covers{" "}
            <strong>Starting the Game</strong> — what happens after the
            Charleston ends and actual play begins.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={7}
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
