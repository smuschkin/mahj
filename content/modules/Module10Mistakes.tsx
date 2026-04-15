import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
import { LessonScreen } from "@/components/LessonScreen";
import { ScreenStepper } from "@/components/ScreenStepper";
import { ModuleNav } from "@/components/ModuleNav";
import { Quiz } from "@/components/Quiz";
import { getAdjacentModules } from "@/lib/modules";

/* ── Local helper ── */

function MistakeCard({
  num,
  title,
  what,
  cost,
  recover,
  costTone = "danger",
}: {
  num: number;
  title: string;
  what: React.ReactNode;
  cost: React.ReactNode;
  recover: React.ReactNode;
  costTone?: "danger" | "warn";
}) {
  const costColors =
    costTone === "warn"
      ? "border-[var(--color-accent)] bg-[#E8F5EC]"
      : "border-[var(--color-red)] bg-[#FFF6F4]";
  return (
    <div className="my-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-mid)] font-serif text-sm font-black text-white">
          {num}
        </span>
        <h4 className="font-serif text-base font-black text-[var(--color-mid)]">
          {title}
        </h4>
      </div>
      <div className="mb-2 text-[13px] text-zinc-700">
        <strong>What happens:</strong> {what}
      </div>
      <div className={`mb-2 rounded-md border-l-4 p-2 text-[13px] text-zinc-700 ${costColors}`}>
        <strong>Cost:</strong> {cost}
      </div>
      <div className="rounded-md border-l-4 border-[var(--color-green)] bg-[#F4FBF6] p-2 text-[13px] text-zinc-700">
        <strong>Recovery:</strong> {recover}
      </div>
    </div>
  );
}

export default function Module10Mistakes() {
  const adj = getAdjacentModules(12);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={12} coverProps={{ eyebrow: "MAHJ — Lesson 13", title: "Common Mistakes &", highlight: "Recovery", subtitle: "The dozen errors every beginner makes — and how to handle them gracefully" }} header={<><Cover
        eyebrow="MAHJ — Lesson 13"
        title="Common Mistakes &"
        highlight="Recovery"
        subtitle="The dozen errors every beginner makes — and how to handle them gracefully"
      />
      <SectionHeader>Lesson</SectionHeader>
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Recognize the most common beginner mistakes before they happen, and know exactly what to do when they happen anyway.",
          },
          { label: "Estimated time", value: "8–10 minutes" },
          { label: "Prerequisite", value: "Lesson 12 (Table Etiquette)" },
          { label: "Unlocks", value: "Lesson 14 (Scoring & Payouts)" },
          {
            label: "Why it matters",
            value:
              "Mistakes are inevitable. What separates a confident beginner from a flustered one is knowing the recovery move. After this you'll never freeze at the table.",
          },
        ]}
      /></>}>
        {/* ── 1. Reframe ── */}
        <LessonScreen title="🧘 Mistakes Are Normal">
          <p>
            Every beginner makes these mistakes. Knowing the consequences helps you recover calmly.
          </p>
        </LessonScreen>

        {/* ── 2. Mistakes 1–3 — counting & order ── */}
        <LessonScreen title="🔢 Counting and Turn-Order Mistakes">
          <MistakeCard
            num={1}
            title="Wrong number of tiles in your hand"
            what="13 tiles normally, 14 on your turn. More or less = problem."
            cost="Dead hand during play. During the Charleston, just redeal."
            recover="Count your tiles after each Charleston pass."
          />

          <MistakeCard
            num={2}
            title="Drawing out of turn (picking ahead)"
            what="You reached for the wall before the previous player finished."
            cost="Dead hand."
            recover="Wait for the previous discard to be named before reaching."
          />

          <MistakeCard
            num={3}
            title="Calling a tile too late"
            what="The next player already racked. The discard is gone."
            cost="You lose the tile — no other penalty."
            recover="Watch every discard the moment it lands."
            costTone="warn"
          />
        </LessonScreen>

        {/* ── 3. Mistakes 4–5 — calling errors ── */}
        <LessonScreen title="📣 Calling and Exposing Mistakes">
          <MistakeCard
            num={4}
            title="Calling a tile that breaks your hand"
            what="You called and exposed, but it doesn&apos;t fit any hand on the card."
            cost="Check if the exposure fits a different hand. If not, dead hand."
            recover="Always check before you call."
          />

          <MistakeCard
            num={5}
            title="Calling Mahjong when your hand isn&apos;t actually valid"
            what="You called Mahjong but your hand doesn&apos;t match the card."
            cost="Didn&apos;t expose yet? No penalty — take it back. Exposed your hand? Dead hand. If other players also exposed because of your call, you owe them."
            recover="Verify tile by tile before calling. Don&apos;t throw in hands until Mahjong is confirmed."
          />
        </LessonScreen>

        {/* ── 4. Mistakes 6–7 — joker errors ── */}
        <LessonScreen title="⭐ Joker Mistakes">
          <MistakeCard
            num={6}
            title="Discarding a Joker by accident"
            what="You accidentally threw a Joker."
            cost="It&apos;s dead. No one can call or exchange it."
            recover="Check every tile before letting go."
          />

          <MistakeCard
            num={7}
            title="Joker exchange done silently"
            what="You placed a tile without announcing the exchange."
            cost="The tile becomes a regular discard."
            recover="Always announce out loud and hand the tile to the player."
          />
        </LessonScreen>

        {/* ── 5. Mistakes 8–10 — naming, missing, charleston ── */}
        <LessonScreen title="🗣️ Naming, Missing, and Charleston Mistakes">
          <MistakeCard
            num={8}
            title="Misnaming a discard"
            what="You said the wrong tile name."
            cost="The tile can&apos;t be claimed until correctly named. If someone calls Mahjong on your misnamed tile, you pay for all three losers."
            recover="Look at the tile, say its name, then let go."
          />

          <MistakeCard
            num={9}
            title="Missing your own Mahjong"
            what="You had the winning tile but didn&apos;t notice."
            cost="The moment passes. Your hand is still alive."
            recover="Scan your hand against the card after every draw."
          />

          <MistakeCard
            num={10}
            title="Passing a Joker in the Charleston"
            what="Jokers can&apos;t be passed."
            cost="The pass must be redone."
            recover="Speak up immediately."
          />
        </LessonScreen>

        {/* ── 6. The "things you don't have to recover from" screen ── */}
        <LessonScreen title="🧊 Things That Feel Like Mistakes but Aren&apos;t">
          <ul className="ml-6 list-disc space-y-2 text-[14px] text-zinc-700">
            <li>Using zero on the courtesy pass</li>
            <li>Stopping the second Charleston</li>
            <li>Passing on a tile you could call</li>
            <li>Changing your target hand mid-game</li>
            <li>Asking for help between rounds</li>
            <li>A wall game (no winner) — just reshuffle</li>
          </ul>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={12}
            title="Lesson 13 Check"
            passThreshold={4}
            questions={[
              {
                question:
                  "You discover you have 12 tiles instead of 13 — but it's still during the Charleston. What happens?",
                options: [
                  "Your hand is dead",
                  "All tiles go back in and the hand is redealt — no penalty",
                  "You draw an extra tile from the wall",
                  "You pay a penalty",
                ],
                correct: 1,
                explanation:
                  "Dead-hand penalties don't apply during the Charleston. If a tile-count error is found before play begins, the entire hand is reshuffled and redealt.",
              },
              {
                question:
                  "You called on a discarded 4 Bam, exposed three 4 Bams — and then realized none of the hands on the card actually let you finish from here. What happens?",
                options: [
                  "Take the call back and pretend it didn't happen",
                  "Your hand is dead — you keep playing but can't win",
                  "The discarder pays you",
                  "The dealer rules on it",
                ],
                correct: 1,
                explanation:
                  "Once you've exposed, you can't take it back. Your hand is dead. You keep drawing and discarding and pay the eventual winner. The fix is preventative: always check before calling.",
              },
              {
                question:
                  "You drew the winning tile but didn't realize it and discarded instead. What happens?",
                options: [
                  "You can take the discard back",
                  "The next player owes you the win",
                  "That moment is gone — keep playing and look for another path",
                  "Everybody loses",
                ],
                correct: 2,
                explanation:
                  "Once you discard, your turn is over. You can't go back and claim Mahjong on a tile you already had. Your hand is still alive — keep playing for another win.",
              },
              {
                question:
                  "You're about to do a joker exchange with the player across from you. What's the right way to do it?",
                options: [
                  "Walk over and grab the joker yourself",
                  "Place your real tile on the table without saying anything",
                  "Verbally announce the exchange and hand your real tile to them — they swap it",
                  "Wait until the end of the round",
                ],
                correct: 2,
                explanation:
                  "Always announce the exchange clearly and hand your tile to the player whose rack holds the joker. A silent placement turns your tile into a regular discard that anyone can claim.",
              },
              {
                question:
                  "You realize you just made a mistake. What's the FIRST thing to do?",
                options: [
                  "Try to fix it silently and hope nobody noticed",
                  "Stop everything and say 'Hold on, I think I made a mistake'",
                  "Apologize 10 times",
                  "Throw your tiles in",
                ],
                correct: 1,
                explanation:
                  "Stop, speak up immediately, describe what happened factually, and let the table decide. Self-reported mistakes are almost always handled gracefully. Hidden ones are not.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 13 Complete">
          <p>
            You now know the most common errors that derail beginners — and exactly
            what happens when each one occurs.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 14 is the{" "}
            <strong>Glossary</strong> — every term you&apos;ve learned, defined and
            cross-linked, always one tap away from any screen in the app.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={12}
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
