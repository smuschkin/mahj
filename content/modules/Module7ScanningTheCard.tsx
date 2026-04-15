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
            <SectionHeader>Lesson</SectionHeader>
            <MetaBox
              items={[
                {
                  label: "Goal",
                  value:
                    "Learn to quickly scan your tiles against the card and identify 2\u20133 candidate hands.",
                },
                { label: "Estimated time", value: "5\u20137 minutes" },
                { label: "Prerequisite", value: "Lesson 7 (Jokers & Calling)" },
                { label: "Unlocks", value: "Lesson 9 (Hand Strategy)" },
              ]}
            />
          </>
        }
      >
        {/* ── 1. The moment after the deal ── */}
        <LessonScreen title="🃏 The Moment After the Deal">
          <p>
            You&apos;ve just been dealt 13 tiles. The card is sitting in front
            of you with dozens of possible hands. Where do you even start?
          </p>
          <p>
            This module teaches you a <strong>repeatable scanning method</strong>{" "}
            — a step-by-step way to look at your tiles, look at the card, and
            quickly narrow down which hands are realistic. This is the single
            most important skill for getting faster at American Mahjong.
          </p>
          <Callout variant="info">
            <strong>Bring your own card.</strong>{" "}MAHJ teaches you the{" "}
            <em>thinking</em>; it doesn&apos;t reproduce any year&apos;s
            official hands. To play a real game you&apos;ll need the current
            card from nationalmahjonggleague.org.
          </Callout>
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
        <LessonScreen title="🎲 Step 5: Pick 2–3 Candidate Hands">
          <p>
            After sorting, spotting clusters, and checking pairs and triples,
            you should be able to identify <strong>2 or 3 hands on the card</strong>{" "}
            that your tiles are closest to. These are your <em>candidates</em>.
          </p>
          <p>
            For each candidate, mentally note:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>How many tiles do I already have?</strong>{" "}The more
              tiles you already hold, the stronger the candidate.
            </li>
            <li>
              <strong>How many tiles do I still need?</strong>{" "}Fewer is
              better. A hand where you need 4 tiles is much more realistic
              than one where you need 9.
            </li>
            <li>
              <strong>Which tiles overlap?</strong>{" "}If two candidate hands
              both use your pair of 6 Bams, you can keep that pair no matter
              which hand you commit to. Overlapping tiles are your friends.
            </li>
          </ol>
          <Callout variant="tip">
            <strong>Tiles that fit none of your candidates</strong>{" "}are your
            first discards. Mentally tag them now — you&apos;ll throw them
            during the Charleston or your first few turns.
          </Callout>
        </LessonScreen>

        {/* ── 8. Don't commit too early ── */}
        <LessonScreen title="⚠️ Don&apos;t Commit Too Early">
          <p>
            One of the most common beginner mistakes is locking into a single
            hand right after the deal. Here&apos;s why that hurts you:
          </p>
          <ul className="ml-6 list-disc space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Every bad draw stings.</strong>{" "}If you&apos;re only
              targeting one hand and you draw a tile that doesn&apos;t fit,
              you&apos;ve wasted a turn. With 2–3 candidates, almost every
              tile is useful for <em>something</em>.
            </li>
            <li>
              <strong>The Charleston changes everything.</strong>{" "}You&apos;re
              about to pass 9 tiles and receive 9 new ones. Your hand will
              look completely different afterward. Don&apos;t decide before
              the Charleston.
            </li>
            <li>
              <strong>Flexibility is power.</strong>{" "}The longer you stay
              flexible, the more options you have. Commit too early and
              you&apos;re stuck. Commit too late and you never finish.
            </li>
          </ul>

          <div className="my-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border-2 border-[var(--color-green)] bg-[#F4FBF6] p-3 text-center">
              <div className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-green)]">
                After the deal
              </div>
              <div className="my-1 font-serif text-2xl font-black text-[var(--color-mid)]">
                3 hands
              </div>
              <div className="text-[12px] text-zinc-600">
                Stay open. Pass tiles that fit none of them.
              </div>
            </div>
            <div className="rounded-lg border-2 border-[var(--color-accent)] bg-[#E8F5EC] p-3 text-center">
              <div className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                After Charleston
              </div>
              <div className="my-1 font-serif text-2xl font-black text-[var(--color-mid)]">
                2 hands
              </div>
              <div className="text-[12px] text-zinc-600">
                Drop the weakest candidate. Keep one backup.
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
                Commit. Discard tiles from your other candidate.
              </div>
            </div>
          </div>

          <Callout variant="tip">
            <strong>Speed comes with practice.</strong>{" "}Your first few games,
            scanning the card will feel painfully slow. By game 10, you&apos;ll
            glance at your tiles and see candidates immediately. Don&apos;t
            rush yourself early on — the table will wait.
          </Callout>
        </LessonScreen>

        {/* ── 9. Putting it all together ── */}
        <LessonScreen title="🧩 Putting It All Together">
          <p>
            Here&apos;s the full scanning method in one quick checklist. Run
            through these steps every time you&apos;re dealt in:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Sort your rack by suit</strong> — Bams, Craks, Dots,
              honors, flowers, jokers.
            </li>
            <li>
              <strong>Find your biggest cluster</strong> — which suit or number
              range dominates?
            </li>
            <li>
              <strong>Spot pairs and triples</strong> — duplicates are your
              strongest leads.
            </li>
            <li>
              <strong>Check the year hand</strong> — do your tiles match this
              year&apos;s digits?
            </li>
            <li>
              <strong>Pick 2–3 candidates</strong> — note which tiles overlap
              and which fit nothing.
            </li>
            <li>
              <strong>Tag your dead tiles</strong> — tiles that fit no candidate
              are your first discards.
            </li>
          </ol>
          <Callout variant="info">
            <strong>This gets faster.</strong>{" "}Right now, each step might
            take a minute. After a few games, the whole process takes 30
            seconds. Your brain starts pattern-matching before you even finish
            sorting.
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
                  "What is the very first thing you should do after being dealt your 13 tiles?",
                options: [
                  "Pick a hand from the card immediately",
                  "Sort your rack by suit",
                  "Start discarding tiles",
                  "Count your jokers",
                ],
                correct: 1,
                explanation:
                  "Always sort first — group Bams, Craks, Dots, honors, and flowers. This makes patterns visible so you can scan the card effectively.",
              },
              {
                question:
                  "Why should you pick 2\u20133 candidate hands instead of committing to just 1?",
                options: [
                  "It makes the game more fun",
                  "The rules require it",
                  "Almost every tile you draw will be useful for at least one candidate",
                  "You can show off to other players",
                ],
                correct: 2,
                explanation:
                  "With 2\u20133 candidates, most tiles you draw are useful for something. Committing to 1 hand too early means every bad draw is a wasted turn.",
              },
              {
                question:
                  "When you find tiles that fit NONE of your candidate hands, what should you do with them?",
                options: [
                  "Hold them in case they become useful",
                  "Trade them for jokers",
                  "They become your first discards",
                  "Put them at the front of your rack",
                ],
                correct: 2,
                explanation:
                  "Tiles that fit none of your candidates have zero value to you. Tag them as your first discards \u2014 pass them in the Charleston or throw them early.",
              },
              {
                question:
                  "What is the strongest signal that a hand on the card is a good candidate for you?",
                options: [
                  "It\u2019s worth the most points",
                  "You already hold pairs or triples that the hand uses",
                  "It\u2019s at the top of the card",
                  "Another player is going for it too",
                ],
                correct: 1,
                explanation:
                  "Pairs and triples you already hold are the strongest signals. A hand that uses tiles you already have is far more realistic than one where you need to find everything.",
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
            <strong>Hand Strategy</strong> — how to narrow your candidates as
            the game progresses, when to commit, and how to make smart discard
            decisions every turn.
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
