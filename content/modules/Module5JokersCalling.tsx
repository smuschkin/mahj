import { LessonComplete } from "@/components/LessonComplete";
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
import { CallingDrill } from "@/components/CallingDrill";
import { getAdjacentModules } from "@/lib/modules";

/* ── Local helpers ── */

function CallCard({
  num,
  title,
  children,
  highlight,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border-2 p-4 text-center shadow-sm ${
        highlight
          ? "border-[var(--color-red)] bg-[#FFF6F4]"
          : "border-[var(--color-mid)] bg-white"
      }`}
    >
      <div
        className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full font-serif text-lg font-black ${
          highlight
            ? "bg-[var(--color-red)] text-white"
            : "bg-[var(--color-mid)] text-white"
        }`}
      >
        {num}
      </div>
      <h4 className="font-serif text-base font-black text-[var(--color-mid)]">{title}</h4>
      <p className="mt-1 text-[13px] text-zinc-600">{children}</p>
    </div>
  );
}

function DecisionBox({
  title,
  bad,
  children,
}: {
  title: string;
  bad?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`my-3 rounded-lg border-l-4 bg-white p-4 shadow-sm ${
        bad ? "border-[var(--color-red)]" : "border-[var(--color-green)]"
      }`}
    >
      <h4 className="mb-1 font-serif text-base font-black text-[var(--color-mid)]">
        {title}
      </h4>
      <div className="text-[14px] text-zinc-600">{children}</div>
    </div>
  );
}

export default function Module5JokersCalling() {
  const adj = getAdjacentModules(6);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={6} coverProps={{ eyebrow: "MAHJ — Lesson 7", title: "Jokers &", highlight: "Calling", subtitle: "Grabbing tiles, exposing groups, and using your wild cards" }} header={<><Cover
        eyebrow="MAHJ — Lesson 7"
        title="Jokers &"
        highlight="Calling"
        subtitle="Grabbing tiles, exposing groups, and using your wild cards"
      />
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Know when you can grab a discarded tile, what you must do when you grab one, and how jokers really work — including the joker exchange.",
          },
          { label: "Estimated time", value: "8–10 minutes" },
          { label: "Prerequisite", value: "Lesson 6 (Charleston Strategy)" },
          { label: "Unlocks", value: "Lesson 8 (Scanning the Card)" },
          {
            label: "Why it matters",
            value:
              "Calling and joker rules are where most beginners get embarrassed at the table. After this lesson, you'll know when to speak up and when to stay quiet.",
          },
        ]}
      /></>}>
        {/* ── 1. What is calling? ── */}
        <LessonScreen title='📣 What Does "Calling" Mean?'>
          <p>
            During the game, players take turns drawing tiles and discarding ones they
            don&apos;t want. Normally, a discarded tile is gone — it sits in the middle
            of the table.
          </p>
          <p>
            But sometimes, a discarded tile is exactly what <em>you</em>{" "}need. When that
            happens, you can <strong>call</strong>{" "}for it — say it out loud and grab it
            before the next player draws.
          </p>
          <p>
            Calling is how you complete groups faster than just drawing from the wall.
            It&apos;s also one of the most exciting parts of the game.
          </p>
        </LessonScreen>

        {/* ── 2. What you can call ── */}
        <LessonScreen title="🔔 What You Can Call">
          <p>
            In American Mahjong, you can only call for <strong>groups of
            matching tiles</strong> — never a sequence like 1-2-3.
          </p>

          <ul className="my-3 ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>Pung (3)</strong> — you have 2, someone discards a 3rd</li>
            <li><strong>Kong (4)</strong> — you have 3, someone discards a 4th</li>
            <li><strong>Quint (5)</strong> — you have 4 (with jokers), someone discards a 5th</li>
            <li><strong>Sextet (6)</strong> — you have 5 (with jokers), someone discards a 6th</li>
            <li><strong>Mahjong!</strong> — the discard completes your entire winning hand (this is the one exception — you can call any tile, even for a pair, single, or non-identical group)</li>
          </ul>

        </LessonScreen>

        {/* ── 3. How a call works ── */}
        <LessonScreen title="🗣️ How a Call Works">
          <ol className="ml-6 list-decimal space-y-2 text-[15px]">
            <li>
              Say <strong>&quot;wait&quot;</strong>{" "}to pause the game
            </li>
            <li>
              Say <strong>&quot;Call!&quot;</strong>{" "}(or <strong>&quot;Mahjong!&quot;</strong>)
              and take the tile — you now have <strong>14 tiles</strong>
            </li>
            <li>
              <strong>Expose</strong>{" "}the group face-up on your rack
            </li>
            <li>
              <strong>Discard</strong>{" "}one tile to get back to{" "}
              <strong>13</strong>{" "}(you must always have 13 unless
              it&apos;s Mahjong)
            </li>
          </ol>
          <Callout variant="tip">
            You can only call the <strong>most recently discarded
            tile</strong>. You must call <strong>before</strong>{" "}the next
            player racks their tile (places it on their rack), or it&apos;s
            too late.
          </Callout>
        </LessonScreen>

        {/* ── Calling details ── */}
        <LessonScreen title="⚡ The Calling Rule">
          <p>
            You can only call a tile if it <strong>immediately completes a
            group of 3 or more identical tiles</strong> that you can expose
            right now.
          </p>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-accent)]">
            For a Pung (3 of a kind):
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>You need at least 2 in your hand to call the 3rd</li>
            <li>Or 1 real + 1 Joker to call the 3rd</li>
          </ul>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-accent)]">
            For a Kong (4 of a kind):
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>You need at least 3 in your hand to call the 4th</li>
            <li>Or 2 real + 1 Joker to call the 4th</li>
            <li>Or 1 real + 2 Jokers to call the 4th</li>
          </ul>

          <p className="mt-3">
            You <strong>can&apos;t call a tile just to save it for later</strong> —
            it has to complete a group the moment you take it. When you call,
            you immediately expose that group face-up on your rack.
          </p>
        </LessonScreen>

        {/* ── Non-identical groups ── */}
        <LessonScreen title="🚫 What You Can&apos;t Call">
          <p>
            The calling rule only applies to groups of <strong>identical
            tiles</strong>. You can&apos;t call for non-identical groups.
          </p>
          <ul className="my-3 ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>Can call:</strong>{" "}3 of the same tile (Pung) or 4 of the same tile (Kong)</li>
            <li><strong>Can&apos;t call:</strong>{" "}singles or pairs</li>
            <li><strong>Can&apos;t call:</strong>{" "}mixed groups like N-E-W-S or 2-0-2-6 — the tiles aren&apos;t identical</li>
          </ul>
          <p>
            If the tiles aren&apos;t identical, you have to draw them from
            the wall. No shortcuts.
          </p>

          <Callout variant="warn">
            <strong>Exception — Mahjong:</strong>{" "}if the tile is the very
            last one you need to win, you CAN call it. You can call any tile
            for Mahjong — singles, pairs, anything.
          </Callout>
        </LessonScreen>

        {/* ── Tips for non-identical groups ── */}
        <LessonScreen title="💡 Tips for Non-Identical Groups">
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li>
              Hands with NEWS or year groups are <strong>harder to
              complete</strong>{" "}because you&apos;re relying entirely on the wall
            </li>
            <li>
              If you don&apos;t already have most of those tiles after the
              Charleston, consider pivoting to a different hand
            </li>
            <li>
              Keep 2–3 candidate hands in mind so you have flexibility
            </li>
          </ul>

          <Callout variant="tip">
            Don&apos;t get discouraged — calling is the #1 thing beginners
            struggle with. Once it clicks, it clicks for good.
          </Callout>
        </LessonScreen>

        {/* ── 4. Exposing ── */}
        <LessonScreen title="👀 Exposing: Showing Your Tiles">
          <p>
            When you call a tile, you have to <strong>expose</strong>{" "}the
            group — lay all the matching tiles face-up at the front of your rack.
          </p>
          <p>
            This means your opponents can see exactly what you took. It&apos;s a
            trade-off: you got the tile you needed, but now everyone knows part of your
            hand.
          </p>

          <div className="my-4 rounded-lg border-2 border-[#C9BC8A] bg-[var(--color-light)] p-4">
            <p className="mb-2 text-center text-[12px] font-bold uppercase tracking-wider text-zinc-500">
              Exposed on your rack
            </p>
            <div className="flex items-end justify-center gap-1.5">
              <Tile type="bam" value={5} size="md" highlighted />
              <Tile type="bam" value={5} size="md" highlighted />
              <Tile type="bam" value={5} size="md" highlighted />
            </div>
            <div className="mt-2 h-2 rounded-sm bg-gradient-to-r from-[#8B5A2B] to-[#6B3F1A]" />
            <p className="mt-2 text-center text-[13px] italic text-zinc-600">
              3 tiles of 5 Bam — face-up so everyone can see
            </p>
          </div>

          <Callout variant="warn">
            Once a group is exposed, you <strong>can&apos;t take it back</strong>. Make
            sure you actually want the tile before you call.
          </Callout>
        </LessonScreen>

        {/* ── 5. Jokers — where they CAN go ── */}
        <LessonScreen title="⭐ Jokers: Where They CAN Go">
          <p>
            You met jokers in Lesson 2 — the gold wild-card tiles. Now let&apos;s get
            specific about what they can and can&apos;t do.
          </p>

          <div className="my-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border-l-4 border-[var(--color-green)] bg-[#F4FBF6] p-4">
              <h4 className="mb-1 font-serif text-sm font-black text-[var(--color-mid)]">
                ✅ Jokers CAN substitute in:
              </h4>
              <ul className="ml-5 list-disc space-y-0.5 text-[13px] text-zinc-700">
                <li><strong>Pungs</strong>{" "}(3 of a kind)</li>
                <li><strong>Kongs</strong>{" "}(4 of a kind)</li>
                <li><strong>Quints</strong>{" "}(5 of a kind)</li>
                <li><strong>Sextets</strong>{" "}(6 of a kind)</li>
                <li>Any group of <strong>3 or more identical tiles</strong></li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-[var(--color-red)] bg-[#FFF6F4] p-4">
              <h4 className="mb-1 font-serif text-sm font-black text-[var(--color-mid)]">
                ❌ Jokers CANNOT substitute in:
              </h4>
              <ul className="ml-5 list-disc space-y-0.5 text-[13px] text-zinc-700">
                <li><strong>Pairs</strong>{" "}(2 of a kind)</li>
                <li><strong>Singles</strong>{" "}(1 specific tile)</li>
                <li>Any &quot;Singles &amp; Pairs&quot; hand (no jokers anywhere)</li>
                <li>Hands like <strong>NEWS</strong>{" "}(N-E-W-S singles)</li>
                <li><strong>Year hands</strong>{" "}that use single digits (e.g. 2-0-2-6)</li>
              </ul>
            </div>
          </div>

          <TileRow caption="Example: 2 real 7 Bams + 1 Joker = a valid Pung of three 7 Bams">
            <Tile type="bam" value={7} size="sm" />
            <Tile type="bam" value={7} size="sm" />
            <Tile type="joker" size="sm" />
          </TileRow>

          <Callout variant="warn">
            <strong>The pair rule trips everyone up.</strong>{" "}If your hand needs a pair
            of 5 Craks, you need <em>two real</em>{" "}5 Craks. A joker won&apos;t work.
          </Callout>
        </LessonScreen>

        {/* ── 6. Joker Exchange ── */}
        <LessonScreen title="🔄 The Joker Exchange">
          <p>
            See a Joker in someone&apos;s exposed group? If you have the
            real tile it&apos;s replacing, you can <strong>swap</strong>{" "}
            and take the Joker for yourself.
          </p>

          <div className="my-3 rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-light)] p-5">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1">
                  <Tile type="bam" value={3} size="sm" />
                  <Tile type="bam" value={3} size="sm" />
                  <Tile type="joker" size="sm" />
                </div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                  Their exposed group
                </span>
              </div>
              <span className="text-2xl font-black text-[var(--color-accent)]">⇄</span>
              <div className="flex flex-col items-center gap-2">
                <Tile type="bam" value={3} size="sm" />
                <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                  Your real 3 Bam
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-[13px] text-zinc-600">
              You give the real tile, you get the Joker.
            </p>
          </div>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            How to exchange
          </h4>
          <ol className="ml-6 list-decimal space-y-1 text-[14px] text-zinc-700">
            <li>Draw from the wall (it must be <strong>your turn</strong>)</li>
            <li><strong>Announce</strong>{" "}the exchange out loud</li>
            <li>Hand your <strong>real matching tile</strong>{" "}to the player — they swap it into their exposure and give you the <strong>Joker</strong></li>
            <li>Discard one tile — you must always have 13 tiles in your hand (14 only when you have Mahjong)</li>
          </ol>
          <Callout variant="info">
            You can exchange from <strong>any</strong>{" "}player&apos;s exposed
            group — even your own. Multiple exchanges per turn are allowed.
            You must give a real tile, never another joker.
          </Callout>
        </LessonScreen>

        {/* ── 7. When to call — courtesy-style judgment ── */}
        <LessonScreen title="🤔 When to Call">
          <p>
            Just because you <em>can </em>call doesn&apos;t mean you should.
          </p>

          <h4 className="mt-3 font-serif text-sm font-black text-[var(--color-accent)]">
            ✅ Call when:
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>The tile completes a group you need for your target hand</li>
            <li>It&apos;s late in the game and you&apos;re racing to finish</li>
            <li>It&apos;s Mahjong — always call!</li>
          </ul>

          <h4 className="mt-3 font-serif text-sm font-black text-[var(--color-red)]">
            ❌ Don&apos;t call when:
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>You&apos;re not committed to a hand yet — stay flexible</li>
            <li>Exposing would reveal your strategy to opponents</li>
            <li>Your hand is <strong>concealed (C)</strong> — no calling allowed except for Mahjong</li>
          </ul>

          <Callout variant="tip">
            When in doubt, don&apos;t call. Beginners almost always over-call.
          </Callout>
        </LessonScreen>

        {/* ── 8. Three rules beginners forget ── */}
        <LessonScreen title="🚨 Rules to Remember">
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>Bad call can = dead hand</strong> — but check if your exposure fits another hand on the card first</li>
            <li><strong>Discarded Jokers are dead</strong> — no one can call or pick them up</li>
            <li><strong>Expose immediately after you call</strong> — the group goes face-up on your rack right away</li>
            <li><strong>Can&apos;t call a Joker</strong> — Jokers in the discard pile are always dead</li>
            <li><strong>Calls are for groups of 3+</strong> — the only exception is Mahjong, where you can call any tile that completes your hand</li>
            <li><strong>Exposures are permanent</strong> — once you call and expose, you can&apos;t change it</li>
          </ul>

          <Callout variant="warn">
            <strong>What&apos;s a dead hand?</strong>{" "}If you make an illegal
            call or exposure that doesn&apos;t fit any hand on the card, your
            hand is &quot;dead.&quot; You keep playing — drawing and
            discarding every turn — but you can&apos;t win. You still pay
            the winner at the end. It&apos;s not the end of the world — it
            happens to everyone.
          </Callout>
        </LessonScreen>

        {/* ── Practice ── */}
        <LessonScreen title="">
          <CallingDrill />
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={6}
            title="Lesson 7 Check"
            passThreshold={4}
            questions={[
              {
                question: "Which of these CAN you call in American Mahjong?",
                options: [
                  "Sequences (1-2-3)",
                  "Pungs, Kongs, Quints, Sextets, and Mahjong",
                  "Only Mahjong",
                  "Anything you want",
                ],
                correct: 1,
                explanation:
                  "You can call for any group of matching tiles: Pung (3), Kong (4), Quint (5), Sextet (6), or Mahjong (winning hand). You cannot call sequences.",
              },
              {
                question: "Where CAN you use a joker?",
                options: [
                  "In a pair",
                  "As a single",
                  "In a group of 3 or more identical tiles",
                  "Anywhere",
                ],
                correct: 2,
                explanation:
                  "Jokers substitute only in pungs, kongs, quints — groups of 3+. They can never be used in pairs or singles.",
              },
              {
                question: "Can you call a joker from the discard pile?",
                options: [
                  "Yes, anytime",
                  "Only on your turn",
                  "No, never",
                  "Only with permission",
                ],
                correct: 2,
                explanation:
                  "Discarded jokers are dead. They cannot be called or claimed by anyone — which is why no one ever discards them.",
              },
              {
                question: "When can you do a Joker Exchange?",
                options: [
                  "Anytime, even on someone else's turn",
                  "Only after a Pung",
                  "On your turn — after drawing and before discarding",
                  "Only when an opponent is winning",
                ],
                correct: 2,
                explanation:
                  "Joker exchanges happen only on your own turn, after drawing from the wall and before you discard. Give a real tile, take the joker from any exposed group.",
              },
              {
                question:
                  "You called a Pung but realize it doesn't fit your target hand. What do you do?",
                options: [
                  "Your hand is automatically dead",
                  "Check if the exposure fits a different hand on the card",
                  "Put the tiles back and pretend it didn't happen",
                  "You start over",
                ],
                correct: 1,
                explanation:
                  "Don't panic — your exposure might fit a different hand on the card. Your hand is only dead if the exposed group doesn't work for ANY valid hand. Always look for alternatives before giving up.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 7 Complete">
          <p>
            You now know the trickiest mechanical rules in American Mahjong: calling,
            exposing, and the joker exchange. These are the rules that separate
            confident players from nervous ones.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 8 covers{" "}
            <strong>Scanning the Card</strong> — picking which hand to build toward,
            staying flexible, and the all-important &quot;what would you discard?&quot;
            thinking.
          </p>
          <LessonComplete lessonNum={6} />
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={6}
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
