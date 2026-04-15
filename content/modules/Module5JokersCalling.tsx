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
      <ScreenStepper moduleNum={6} coverProps={{ eyebrow: "MAHJ — Module 6", title: "Jokers &", highlight: "Calling", subtitle: "Grabbing tiles, exposing groups, and using your wild cards" }} header={<><Cover
        eyebrow="MAHJ — Module 6"
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
            For all of these, just say <strong>&quot;Call!&quot;</strong>{" "}(or{" "}
            <strong>&quot;Mahjong!&quot;</strong>{" "}if it wins). You don&apos;t
            need to say &quot;Pung&quot; or &quot;Kong&quot; — the exposure
            shows what you made.
          </Callout>

          <Callout variant="warn">
            <strong>Anyone</strong>{" "}can call a Pung or Kong, no matter whose turn it
            is — calling skips the turn order. But you must call <em>before</em>{" "}the
            next player picks up a tile from the wall, or it&apos;s too late.
          </Callout>
          <Callout variant="tip">
            <strong>One special case:</strong>{" "}a <strong>Mahjong</strong>{" "}call is the
            <em>only</em>{" "}time you can claim a discard for a <strong>pair</strong>{" "}or a{" "}
            <strong>single</strong> — and only if that one tile completes your entire
            winning hand. Otherwise, calls are always for groups of 3 or more.
          </Callout>
        </LessonScreen>

        {/* ── 3. How a call works ── */}
        <LessonScreen title="🗣️ How a Call Works">
          <p>A call has a few quick steps:</p>
          <ol className="ml-6 list-decimal space-y-2 text-[15px]">
            <li>
              <strong>Say &quot;wait.&quot;</strong>{" "}The instant a discard hits the
              table that you might want, just say <strong>&quot;wait&quot;</strong> —
              that pauses the game so the next player doesn&apos;t draw. Take a few
              seconds to think it through.
            </li>
            <li>
              <strong>Then call if you want it.</strong>{" "}If you decide to take the
              tile, take it and say <strong>&quot;Call!&quot;</strong>{" "}(or{" "}
              <strong>&quot;Mahjong!&quot;</strong>{" "}if it completes your hand). You
              don&apos;t need to say &quot;Pung&quot; or &quot;Kong&quot; — the
              exposure shows what you made. If you decide you don&apos;t want it
              after all, just say so and play continues.
            </li>
            <li>
              <strong>Expose your group.</strong>{" "}If you took it for a Pung or Kong,
              lay all the matching tiles face-up at the front of your rack so
              everyone can see them.
            </li>
            <li>
              <strong>Discard one tile</strong>{" "}from your hand to keep your tile count
              correct. Then play continues with the player to your right.
            </li>
          </ol>
          <Callout variant="tip">
            <strong>&quot;Wait&quot; is the most useful word at the table.</strong> You don&apos;t have to commit the instant a tile lands. Pause the game,
            think, and then decide. Nobody will rush you as long as you said
            &quot;wait&quot; first.
          </Callout>
        </LessonScreen>

        {/* ── 4. Exposing ── */}
        <LessonScreen title="👀 Exposing: Showing Your Tiles">
          <p>
            When you call a Pung or Kong, you have to <strong>expose</strong>{" "}the
            group — lay all the matching tiles face-up at the front of your rack.
          </p>
          <p>
            This means your opponents can see exactly what you took. It&apos;s a
            trade-off: you got the tile you needed, but now everyone knows part of your
            hand.
          </p>

          <TileRow
            background="felt"
            caption="Example: an exposed Pung of 5 Bam — laid face-up where everyone can see it"
          >
            <Tile type="bam" value={5} size="md" highlighted />
            <Tile type="bam" value={5} size="md" highlighted />
            <Tile type="bam" value={5} size="md" highlighted />
          </TileRow>

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
            of 5 Craks, you need <em>two real</em> 5 Craks. A joker won&apos;t work.
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
            Rules for the exchange
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              Only on <strong>your turn</strong> — after drawing from the wall
              and before you discard
            </li>
            <li>
              You can exchange with <strong>any player&apos;s exposed group</strong>,
              including your own
            </li>
            <li>You must give a <strong>real tile</strong> — not another joker</li>
            <li>
              You can do <strong>multiple exchanges</strong>{" "}on the same turn if you
              have the right tiles
            </li>
            <li>
              You <strong>cannot</strong>{" "}exchange with tiles still in someone&apos;s
              hand — only exposed groups
            </li>
            <li>
              If you <em>called</em>{" "}a discard this turn, the called exposure itself
              must be completed from tiles already in your hand —{" "}
              <strong>you can&apos;t use a joker exchange to make the call legal</strong>.
              You can still do an exchange afterward, though.
            </li>
          </ul>
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
        <LessonScreen title="🚨 Rules Beginners Forget">
          <p>
            These are the calling/joker mistakes that trip up almost everyone in their
            first 10 games. Burn them in:
          </p>

          <DecisionBox title="1. You can't call a tile you don't actually need" bad>
            If you call but realize you can&apos;t actually complete a valid
            hand, your hand becomes <strong>&quot;dead&quot;</strong> — you keep
            playing (you must still discard each turn) but you can&apos;t win.
            You still pay the winner at the end like any other loser. Some
            groups add an extra penalty, but that&apos;s a house rule.{" "}
            <strong>Always</strong>{" "}check before you call.
          </DecisionBox>

          <DecisionBox title="2. Jokers CANNOT be called from the discard pile" bad>
            If someone (foolishly) discards a joker, no one can grab it. The joker is
            dead. This is why nobody discards jokers. When you discard a joker, you can name it &quot;Joker,&quot; &quot;same,&quot; or the name of the previous discard.
          </DecisionBox>

          <DecisionBox title="3. You have to expose your call IMMEDIATELY" bad>
            Don&apos;t grab the tile and slide it into your rack — that&apos;s not
            allowed. The whole group goes face-up at the front of your rack right away.
          </DecisionBox>

          <DecisionBox title="4. Any tile EXCEPT a Joker can be called for Mahjong" bad>
            You can call any discarded tile to complete your winning hand — except a Joker. Jokers in the discard pile are always dead.
          </DecisionBox>

          <DecisionBox title="5. Some tiles can ONLY be called for Mahjong" bad>
            Tiles in groupings like NEWS, 1122, or year digits (e.g. 2-0-2-6) can only be called to complete Mahjong — not for regular exposures.
          </DecisionBox>

          <DecisionBox title="6. You can change an exposure until you discard" bad>
            If you called a tile and exposed a group, you can still change the number and type of tiles in that exposure — but only before you discard. Once you discard, it&apos;s locked in.
          </DecisionBox>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="🎯 Confidence Check">
          <p className="text-sm text-zinc-600">
            5 quick questions. Get 4 right to pass.
          </p>
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

      <SectionHeader>Practice</SectionHeader>
      <CallingDrill />

      <ModuleNav
        currentModuleNum={6}
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
