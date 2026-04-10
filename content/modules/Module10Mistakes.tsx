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
  const adj = getAdjacentModules(10);
  return (
    <PageWrap>
      <Cover
        eyebrow="MAHJ — Module 10"
        title="Common Mistakes &"
        highlight="Recovery"
        subtitle="The dozen errors every beginner makes — and how to handle them gracefully"
      />

      <MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Recognize the most common beginner mistakes before they happen, and know exactly what to do when they happen anyway.",
          },
          { label: "Estimated time", value: "8–10 minutes" },
          { label: "Prerequisite", value: "Module 9 (Scoring & Payouts)" },
          { label: "Unlocks", value: "Module 11 (Glossary)" },
          {
            label: "Why it matters",
            value:
              "Mistakes are inevitable. What separates a confident beginner from a flustered one is knowing the recovery move. After this you'll never freeze at the table.",
          },
        ]}
      />

      <SectionHeader>Lesson</SectionHeader>

      <ScreenStepper moduleNum={10}>
        {/* ── 1. Reframe ── */}
        <LessonScreen title="🧘 Mistakes Are Normal — Recovery Is the Skill">
          <p>
            You will make every single mistake in this module. Probably more than
            once. So will every player at your table — even the ones who&apos;ve been
            playing for 30 years.
          </p>
          <p>
            What separates a relaxed beginner from a stressed-out one is{" "}
            <strong>knowing what happens next</strong>. Most mahjong errors have a
            specific, well-defined consequence in the rules. When you know the rule,
            you can recover calmly. When you don&apos;t, you panic.
          </p>
          <Callout variant="tip">
            <strong>The single most useful sentence at the table:</strong>{" "}
            <em>&quot;Hold on — I think I made a mistake. Can we pause?&quot;</em> Saying this <em>before</em>{" "}the next player draws is the difference
            between a fixable hiccup and a dead hand. We&apos;ll come back to it on
            the last screen.
          </Callout>
        </LessonScreen>

        {/* ── 2. Mistakes 1–3 — counting & order ── */}
        <LessonScreen title="🔢 Counting and Turn-Order Mistakes">
          <MistakeCard
            num={1}
            title="Wrong number of tiles in your hand"
            what={
              <>
                You should have <strong>13 tiles</strong>{" "}at all times, and{" "}
                <strong>14 tiles</strong>{" "}only when it&apos;s your turn (after drawing,
                before discarding). If you ever notice you&apos;ve got 12 or 15, you
                miscounted.
              </>
            }
            cost={
              <>
                <strong>Dead hand</strong>{" "}if it&apos;s noticed during play. You
                can&apos;t win the round but you keep playing and still pay the eventual
                winner.
              </>
            }
            recover={
              <>
                <strong>During the Charleston:</strong>{" "}the entire hand is{" "}
                <strong>thrown back in and redealt</strong> — no penalty. (Dead-hand
                penalties don&apos;t apply during the Charleston.) <strong>During
                play:</strong>{" "}if you catch it before anyone else, say so immediately
                and ask the table to pause. Some groups will let you fix it; many will
                rule the hand dead. Either way, owning it fast is the right move.
              </>
            }
          />

          <MistakeCard
            num={2}
            title="Drawing out of turn (picking ahead)"
            what={
              <>
                You reach into the wall before the player to your left has finished
                their turn — usually because you&apos;re excited or distracted.
              </>
            }
            cost={
              <>
                <strong>Dead hand.</strong>{" "}Picking a tile out of turn is treated as a
                serious error in NMJL rules.
              </>
            }
            recover={
              <>
                <strong>If your fingers are still on the wall</strong>, freeze and ask
                immediately — most groups will let you put the tile back without
                penalty. <strong>If you&apos;ve already racked it,</strong>{" "}the hand is
                dead. The fix: wait for the previous player to fully discard{" "}
                <em>and</em>{" "}name their tile before you reach.
              </>
            }
          />

          <MistakeCard
            num={3}
            title="Calling a tile too late"
            what={
              <>
                The tile you needed was just discarded, but the next player has already
                drawn from the wall and racked their tile. Once that happens, the
                discard is gone forever.
              </>
            }
            cost={<>You lose the tile. No further penalty.</>}
            recover={
              <>
                Nothing to recover — the call window has closed. The fix is
                preventative: <strong>always look at every discard the moment it
                lands</strong>, and call <em>before</em>{" "}the next player&apos;s tile
                touches their rack.
              </>
            }
            costTone="warn"
          />
        </LessonScreen>

        {/* ── 3. Mistakes 4–5 — calling errors ── */}
        <LessonScreen title="📣 Calling and Exposing Mistakes">
          <MistakeCard
            num={4}
            title="Calling a tile that breaks your hand"
            what={
              <>
                You say &quot;Call!&quot; on a discard, expose your group, and then
                realize the resulting tiles can&apos;t complete <em>any</em>{" "}valid hand
                on the card.
              </>
            }
            cost={
              <>
                <strong>Dead hand.</strong>{" "}Once the group is exposed, you cannot take
                it back.
              </>
            }
            recover={
              <>
                <strong>None after exposure.</strong>{" "}The fix is preventative: before
                you call, mentally check, &quot;If I take this tile and expose it, can
                my remaining tiles still complete <em>some</em>{" "}hand on the card?&quot;
                If you can&apos;t answer yes in 2 seconds, don&apos;t call.
              </>
            }
          />

          <MistakeCard
            num={5}
            title="Calling Mahjong when your hand isn't actually valid"
            what={
              <>
                You shout &quot;Mahjong!&quot;, expose your tiles in triumph, and then
                someone counts and notices it doesn&apos;t match any hand on the card.
              </>
            }
            cost={
              <>
                Your hand is <strong>dead</strong>{" "}for the rest of the round.
                You keep playing (draw and discard) but can&apos;t win, and you
                pay the winner normally at the end. Some groups add an extra
                penalty, but that&apos;s a house rule.
              </>
            }
            recover={
              <>
                <strong>None — pay up gracefully.</strong>{" "}The fix: before you call
                Mahjong, check your tiles against the specific hand on the card,{" "}
                <em>tile by tile</em>. When in doubt, keep playing — you&apos;ll
                usually get another chance.
              </>
            }
          />
        </LessonScreen>

        {/* ── 4. Mistakes 6–7 — joker errors ── */}
        <LessonScreen title="⭐ Joker Mistakes">
          <MistakeCard
            num={6}
            title="Discarding a Joker by accident"
            what={
              <>
                You meant to discard a different tile but the Joker slipped into your
                hand and you tossed it. Or you panicked and threw it as a defensive
                discard.
              </>
            }
            cost={
              <>
                The Joker is <strong>dead</strong>. No one can call it, no one can
                exchange for it, and you&apos;ve lost the most powerful tile in the
                game.
              </>
            }
            recover={
              <>
                <strong>None.</strong>{" "}A discarded Joker is gone. Beginners discard
                Jokers more often than they think — develop the muscle-memory rule:{" "}
                <em>look for the joker pattern every single time before you let go of
                a tile</em>.
              </>
            }
          />

          <MistakeCard
            num={7}
            title="Joker exchange done silently"
            what={
              <>
                You want to swap your real tile for a joker in someone&apos;s exposed
                group, but you put your tile on the table without verbalizing the
                exchange.
              </>
            }
            cost={
              <>
                Per NMJL guidance, the tile you placed becomes a regular discard —
                <strong> dead for exchanging</strong>{" "}and now available for any other
                player to call as a Pung or Kong. Worst case, an opponent calls it and
                gets a free exposure.
              </>
            }
            recover={
              <>
                Always announce the exchange clearly: <em>&quot;Joker exchange — I&apos;ll
                trade my [tile] for the Joker in your exposed group.&quot;</em>{" "}Hand
                the tile <strong>to the player whose rack holds the joker</strong>{" "}and
                let them do the swap. Never reach onto someone else&apos;s rack.
              </>
            }
          />
        </LessonScreen>

        {/* ── 5. Mistakes 8–10 — naming, missing, charleston ── */}
        <LessonScreen title="🗣️ Naming, Missing, and Charleston Mistakes">
          <MistakeCard
            num={8}
            title="Misnaming a discard"
            what={
              <>
                You announced a tile by the wrong name as you placed it. (Covered in
                full in Module 8 — NMJL Article 67.)
              </>
            }
            cost={
              <>
                If another player calls Mahjong on the misnamed tile, the Mahjong is
                valid and <strong>you alone pay the winner the full amount all three
                losers would have paid combined</strong>. If they call it for an
                exposure instead, <em>their</em>{" "}hand is dead but you owe nothing.
              </>
            }
            recover={
              <>
                The instant you realize the misname, <strong>say so immediately</strong>{" "}
                — &quot;Sorry, I misspoke, that&apos;s actually [correct name].&quot; If
                you correct it before any player acts on the wrong name, you escape
                clean. Slow down and look at the tile <em>before</em>{" "}you say its name.
              </>
            }
          />

          <MistakeCard
            num={9}
            title="Missing your own Mahjong"
            what={
              <>
                You drew the winning tile but didn&apos;t realize it. Instead of
                calling Mahjong, you discarded — and now it&apos;s too late.
                Or: someone discarded your winning tile, but you didn&apos;t
                notice before the next player racked.
              </>
            }
            cost={
              <>
                <strong>That moment is gone.</strong>{" "}Once you discard (or the
                next player racks a discard you needed), you can&apos;t go back.
              </>
            }
            recover={
              <>
                <strong>Your hand is still alive</strong> — keep playing and look
                for another path to Mahjong. The fix is preventative: every time
                you draw a tile, check your hand against the card{" "}
                <em>before</em>{" "}you discard.
              </>
            }
          />

          <MistakeCard
            num={10}
            title="Passing a Joker in the Charleston"
            what={
              <>
                You passed a Joker to another player because you weren&apos;t sure what
                to do with it.
              </>
            }
            cost={
              <>
                <strong>Technically a rule violation</strong>{" "}(Jokers cannot be passed
                in the Charleston). If noticed before the receiving player picks up
                the pass, the pass can usually be redone. If noticed later, results
                vary by group — some declare a dead hand for the passer.
              </>
            }
            recover={
              <>
                Speak up the instant you realize: <em>&quot;Stop — I passed a Joker by
                mistake.&quot;</em>{" "}Most groups will allow you to swap it back. The
                rule is simple and absolute: <strong>never pass a Joker</strong>,
                ever, regardless of how confused you are.
              </>
            }
          />
        </LessonScreen>

        {/* ── 6. The recovery checklist ── */}
        <LessonScreen title="🛟 The 4-Step Recovery Checklist">
          <p>
            When something feels wrong, do these four things in order. Memorize the
            sequence — it works for almost every mistake in this module.
          </p>

          <ol className="ml-6 list-decimal space-y-3 text-[14px] text-zinc-700">
            <li>
              <strong>Stop everything.</strong>{" "}Don&apos;t draw, don&apos;t discard,
              don&apos;t rack. Put your hands flat on the table.
            </li>
            <li>
              <strong>Speak up immediately.</strong>{" "}Say out loud: &quot;Hold on — I
              think I made a mistake.&quot; Don&apos;t try to fix it silently, and
              don&apos;t hope nobody noticed. Both of those make things worse.
            </li>
            <li>
              <strong>Describe what happened factually.</strong> &quot;I think I drew
              out of turn,&quot; or &quot;I just said 4 Bam but it&apos;s actually 4
              Crack.&quot; No excuses, no panic — just the facts.
            </li>
            <li>
              <strong>Let the table decide.</strong>{" "}Most groups are forgiving with
              beginners, especially when you catch and report errors before they
              affect anyone else. Accept whatever the group decides without arguing.
            </li>
          </ol>

          <Callout variant="tip">
            <strong>The honesty rule:</strong>{" "}A mistake you reported yourself will
            almost always be handled gracefully. A mistake you tried to hide and got
            caught on will not. Mahjong groups remember which one you are.
          </Callout>
          <Callout variant="warn">
            <strong>One thing NOT to do:</strong>{" "}Don&apos;t apologize ten times.
            One brief &quot;sorry, my fault&quot; is plenty. Excessive apologizing
            slows the game down more than the original mistake did.
          </Callout>
        </LessonScreen>

        {/* ── 7. The "things you don't have to recover from" screen ── */}
        <LessonScreen title="🧊 Things That Feel Like Mistakes but Aren't">
          <p>
            For balance — here are some moves that feel like errors to nervous
            beginners but are actually perfectly fine:
          </p>

          <ul className="ml-6 list-disc space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Saying &quot;zero&quot; on the courtesy.</strong>{" "}Not optional —
              encouraged for beginners. The courtesy is a tool, not a requirement.
            </li>
            <li>
              <strong>Stopping the second Charleston.</strong>{" "}You don&apos;t need a
              reason. &quot;Stop&quot; is a complete sentence.
            </li>
            <li>
              <strong>Passing on a tile you could call.</strong>{" "}Just because you{" "}
              <em>can</em>{" "}call doesn&apos;t mean you should. Module 5 covered this.
            </li>
            <li>
              <strong>Changing your target hand mid-game.</strong>{" "}Flexibility is
              skill, not failure. Switching from a hand you can&apos;t finish to one
              you can is exactly the right move.
            </li>
            <li>
              <strong>Asking the table to confirm what was just discarded.</strong> No shame. People mishear all the time.
            </li>
            <li>
              <strong>Not winning a hand.</strong>{" "}Wall games happen all the time.
              Many hands have no winner.
            </li>
          </ul>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="🎯 Confidence Check">
          <p className="text-sm text-zinc-600">
            5 quick questions. Get 4 right to pass.
          </p>
          <Quiz
            moduleNum={10}
            title="Module 10 Check"
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
        <LessonScreen title="🎉 Module 10 Complete">
          <p>
            You now know the most common errors that derail beginners — and exactly
            what happens when each one occurs. More importantly, you know the 4-step
            recovery sequence: stop, speak up, describe factually, let the table
            decide.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Module 11 is the{" "}
            <strong>Glossary</strong> — every term you&apos;ve learned, defined and
            cross-linked, always one tap away from any screen in the app.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={10}
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
