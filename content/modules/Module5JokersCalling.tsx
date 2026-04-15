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
      <SectionHeader>Lesson</SectionHeader>
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Know when you can grab a discarded tile, what you must do when you grab one, and how jokers really work — including the joker exchange.",
          },
          { label: "Estimated time", value: "8–10 minutes" },
          { label: "Prerequisite", value: "Module 5 (Charleston Strategy)" },
          { label: "Unlocks", value: "Module 7 (Scanning the Card)" },
          {
            label: "Why it matters",
            value:
              "Calling and joker rules are where most beginners get embarrassed at the table. After this module, you'll know when to speak up and when to stay quiet.",
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

          <div className="my-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <CallCard num="3" title="PUNG">
              You have 2 of a tile. Someone discards a 3rd.
            </CallCard>
            <CallCard num="4" title="KONG">
              You have 3 of a tile. Someone discards a 4th.
            </CallCard>
            <CallCard num="5" title="QUINT">
              You have 4 of a tile (using jokers). Someone discards a 5th.
            </CallCard>
            <CallCard num="6" title="SEXTET">
              You have 5 of a tile (using jokers). Someone discards a 6th. Rare!
            </CallCard>
            <CallCard num="14" title="MAHJONG" highlight>
              The discard completes your <em>entire</em>{" "}hand — you win the round.
            </CallCard>
          </div>

          <Callout variant="tip">
            Just say <strong>&quot;Call!&quot;</strong>{" "}(or{" "}
            <strong>&quot;Mahjong!&quot;</strong>{" "}if it wins). Anyone can
            call on anyone&apos;s turn — but you must call{" "}
            <strong>before</strong>{" "}the next player picks up a tile, or
            it&apos;s too late.
          </Callout>
          <Callout variant="info">
            <strong>Mahjong is the only time</strong>{" "}you can claim a
            discard for a pair or single tile. All other calls require
            groups of 3 or more.
          </Callout>
        </LessonScreen>

        {/* ── 3. How a call works ── */}
        <LessonScreen title="🗣️ How a Call Works">
          <ol className="ml-6 list-decimal space-y-2 text-[15px]">
            <li>
              Say <strong>&quot;wait&quot;</strong> to pause the game
            </li>
            <li>
              Say <strong>&quot;Call!&quot;</strong> (or <strong>&quot;Mahjong!&quot;</strong>)
              and take the tile
            </li>
            <li>
              <strong>Expose</strong> the group face-up on your rack
            </li>
            <li>
              <strong>Discard</strong> one tile, play continues to your right
            </li>
          </ol>
          <Callout variant="tip">
            <strong>&quot;Wait&quot;</strong>{" "}is the most useful word at the
            table. You don&apos;t have to commit instantly — pause, think,
            then decide.
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
            You met jokers in Module 1 — the gold wild-card tiles. Now let&apos;s get
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
        <LessonScreen title="🔄 The Joker Exchange (The Magic Move)">
          <p>
            Here&apos;s a rule unique to American Mahjong — and one of its coolest
            features.
          </p>
          <p>
            If <em>any player</em>{" "}(including you) has an exposed group containing a
            joker, and <em>you</em>{" "}have the real tile that joker is standing in for,
            you can <strong>swap</strong>{" "}your real tile for their joker. This happens
            on <em>your turn</em>, after you draw from the wall and before you
            discard. You can do multiple exchanges in a single turn.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            Walk-through
          </h4>

          <div className="my-3 rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-light)] p-5">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1">
                  <Tile type="bam" value={3} size="sm" />
                  <Tile type="bam" value={3} size="sm" />
                  <Tile type="joker" size="sm" />
                </div>
                <span className="text-[13px] font-bold uppercase tracking-wider text-zinc-600">
                  Their exposed Pung
                </span>
              </div>
              <span className="text-3xl font-black text-[var(--color-red)]">⇄</span>
              <div className="flex flex-col items-center gap-2">
                <Tile type="bam" value={3} size="sm" />
                <span className="text-[13px] font-bold uppercase tracking-wider text-zinc-600">
                  Your real 3 Bam
                </span>
              </div>
            </div>
          </div>

          <p className="text-[14px] text-zinc-600">
            You hand them your <strong>real 3 Bam</strong>. They give you their{" "}
            <strong>Joker</strong>. Now you have a Joker in your hand to use however you
            want, and their Pung is now made of 3 real tiles.
          </p>

          <Callout variant="tip">
            <strong>Why this is awesome:</strong>{" "}Jokers are the most powerful tile in
            the game. Stealing one from another player is one of the best moves you can
            make.
          </Callout>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            How to exchange
          </h4>
          <ol className="ml-6 list-decimal space-y-1 text-[14px] text-zinc-700">
            <li>Draw from the wall (it must be <strong>your turn</strong>)</li>
            <li>Place a <strong>real matching tile</strong> on the exposed group</li>
            <li>Take the <strong>Joker</strong> into your hand</li>
            <li>Discard as normal</li>
          </ol>
          <Callout variant="info">
            You can exchange from <strong>any</strong>{" "}player&apos;s exposed
            group — even your own. Multiple exchanges per turn are allowed.
            You must give a real tile, never another joker.
          </Callout>
        </LessonScreen>

        {/* ── 7. When to call — courtesy-style judgment ── */}
        <LessonScreen title="🤔 When SHOULD You Call? (The Judgment Call)">
          <p>
            Just because you <em>can</em>{" "}call doesn&apos;t mean you should. Calling
            has real costs.
          </p>

          <DecisionBox title="✅ Good reasons to call">
            <ul className="ml-5 list-disc space-y-1">
              <li>The tile completes a group you actually need for your target hand</li>
              <li>It&apos;s late in the game and you&apos;re racing to finish</li>
              <li>
                You&apos;re calling for Mahjong — the discard wins you the
                game (always call!)
              </li>
            </ul>
          </DecisionBox>

          <DecisionBox title="❌ Bad reasons to call" bad>
            <ul className="ml-5 list-disc space-y-1">
              <li>You &quot;might&quot; need it eventually — wait until you&apos;re committed</li>
              <li>It commits you to a hand you&apos;re not sure about (exposing locks you in and lets opponents read what you&apos;re building)</li>
              <li>You&apos;re early in the game and still flexible — keep your options open</li>
              <li>Your hand is <strong>concealed (C)</strong> — concealed hands cannot call at all (except for Mahjong on the final tile)</li>
            </ul>
          </DecisionBox>

          <Callout variant="warn">
            <strong>The hidden cost of calling:</strong>{" "}Once you expose tiles, you
            can&apos;t change which hand you&apos;re building toward. Some hands require{" "}
            <em>concealed</em>{" "}tiles (no calls). Calling early can lock you out of
            better options later.
          </Callout>
          <Callout variant="tip">
            <strong>Permission to be cautious:</strong>{" "}When in doubt, don&apos;t call.
            Beginners almost always over-call. Pass on the tile, draw next turn, and
            keep your options open.
          </Callout>
        </LessonScreen>

        {/* ── 8. Three rules beginners forget ── */}
        <LessonScreen title="🚨 Rules to Remember">
          <ul className="space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Bad call = dead hand.</strong>{" "}If your call doesn&apos;t
              lead to a valid hand, you can&apos;t win the round.
            </li>
            <li>
              <strong>Discarded Jokers are dead.</strong>{" "}No one can call them.
            </li>
            <li>
              <strong>Expose immediately.</strong>{" "}Tiles go face-up on your rack
              right away.
            </li>
            <li>
              <strong>Can&apos;t call a Joker for Mahjong.</strong>{" "}Any other
              tile is fair game.
            </li>
            <li>
              <strong>NEWS, year, and 1122 tiles</strong>{" "}can only be called
              for Mahjong, not regular exposures.
            </li>
            <li>
              <strong>You can fix an exposure</strong>{" "}until you discard — then
              it&apos;s locked.
            </li>
          </ul>
        </LessonScreen>

        {/* ── Practice ── */}
        <LessonScreen title="🔔 Practice: Can You Call This?">
          <CallingDrill />
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={6}
            title="Module 6 Check"
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
                  "What happens if you call a Pung but can't complete a valid hand?",
                options: [
                  "You lose the tile",
                  "Nothing",
                  "Your hand is 'dead' — keep playing but you can't win",
                  "You start over",
                ],
                correct: 2,
                explanation:
                  "A bad call kills your hand. You finish the round, can't win, and still pay the winner at the end. Always check before you call.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Module 6 Complete">
          <p>
            You now know the trickiest mechanical rules in American Mahjong: calling,
            exposing, and the joker exchange. These are the rules that separate
            confident players from nervous ones.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Module 7 covers{" "}
            <strong>Scanning the Card</strong> — picking which hand to build toward,
            staying flexible, and the all-important &quot;what would you discard?&quot;
            thinking.
          </p>
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
