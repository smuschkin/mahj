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

export default function Module8StartingTheGame() {
  const adj = getAdjacentModules(8);
  return (
    <PageWrap>
      <ScreenStepper
        moduleNum={8}
        coverProps={{
          eyebrow: "MAHJ — Lesson 9",
          title: "Starting the",
          highlight: "Game",
          subtitle: "What happens each turn once play begins",
        }}
        header={
          <>
            <Cover
              eyebrow="MAHJ — Lesson 9"
              title="Starting the"
              highlight="Game"
              subtitle="What happens each turn once play begins"
            />
            <MetaBox
              items={[
                {
                  label: "Goal",
                  value:
                    "Understand the turn-by-turn flow of play so you know exactly what to do when it's your turn.",
                },
                { label: "Estimated time", value: "3–5 minutes" },
                { label: "Prerequisite", value: "Lesson 8 (Scanning the Card)" },
                { label: "Unlocks", value: "Lesson 10 (Hand Strategy)" },
              ]}
            />
          </>
        }
      >
        {/* ── 1. Play begins ── */}
        <LessonScreen title="🎬 Play Begins">
          <p>
            The Charleston is done. Everyone has their tiles sorted and
            has scanned the card. Now it&apos;s time to play.
          </p>
          <p>
            <strong>East (the Dealer) goes first.</strong>{" "}They already
            have 14 tiles, so they skip the draw and just discard one
            tile to start the game.
          </p>
          <Callout variant="tip">
            After East discards, play moves to the{" "}
            <strong>right</strong>{" "}(counter-clockwise) — unless someone
            calls the discarded tile.
          </Callout>
        </LessonScreen>

        {/* ── 2. Your turn ── */}
        <LessonScreen title="🔄 Your Turn: Draw, Decide, Discard">
          <p>
            Every turn follows the same 3 steps:
          </p>
          <ol className="ml-6 list-decimal space-y-2 text-[15px]">
            <li>
              <strong>Draw</strong> — take the next tile from the wall
              and add it to your rack (this is called <strong>racking</strong>)
            </li>
            <li>
              <strong>Decide</strong> — does this tile help any of your
              candidate hands? Look at what you have.
            </li>
            <li>
              <strong>Discard</strong> — pick one tile to throw away,
              say its name out loud, and place it face-up in the center
            </li>
          </ol>
          <p className="mt-3">
            That&apos;s it. Draw, decide, discard. Every single turn.
          </p>
        </LessonScreen>

        {/* ── 3. Naming your discard ── */}
        <LessonScreen title="🗣️ Name Every Discard">
          <p>
            When you discard, <strong>say the tile&apos;s name out
            loud</strong>{" "}before or as you place it down. This is an
            official NMJL rule.
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li>&quot;Six Crak.&quot;</li>
            <li>&quot;North.&quot;</li>
            <li>&quot;Soap.&quot;</li>
          </ul>
          <p className="mt-3">
            This gives other players a chance to call the tile before the
            next person draws. If you don&apos;t name it, someone might
            miss a tile they need.
          </p>
        </LessonScreen>

        {/* ── 4. When someone calls ── */}
        <LessonScreen title="🔔 When Someone Calls">
          <p>
            After a discard is named, any player can say{" "}
            <strong>&quot;wait&quot;</strong>{" "}or{" "}
            <strong>&quot;call&quot;</strong>{" "}to claim it.
          </p>
          <p>
            When that happens:
          </p>
          <ol className="ml-6 list-decimal space-y-1.5 text-[14px] text-zinc-700">
            <li>Play pauses</li>
            <li>The caller takes the tile and exposes their group</li>
            <li>The caller discards one tile</li>
            <li>Play continues to the <strong>caller&apos;s right</strong></li>
          </ol>
          <Callout variant="info">
            Calling skips the normal turn order. If it&apos;s not your
            turn but you need the tile, you can still call it.
          </Callout>
        </LessonScreen>

        {/* ── 5. The pause before racking ── */}
        <LessonScreen title="⏸️ The Pause">
          <p>
            After each discard, <strong>pause for 2–3 seconds</strong>{" "}
            before the next player draws. This gives everyone time to
            decide if they want to call.
          </p>
          <p>
            Once the next player picks up a tile from the wall and
            racks it, the discard is gone — no one can call it anymore.
          </p>
          <Callout variant="tip">
            Don&apos;t rush. A quick grab from the wall can steal
            someone&apos;s chance to call. Be patient.
          </Callout>
        </LessonScreen>

        {/* ── 6. How the game ends ── */}
        <LessonScreen title="🏆 How the Game Ends">
          <p>
            The game ends one of two ways:
          </p>
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li>
              <strong>Someone calls Mahjong</strong> — they complete a
              valid 14-tile hand from the card. They win, everyone pays.
            </li>
            <li>
              <strong>The wall runs out</strong> — no tiles left to draw
              and nobody won. This is called a{" "}
              <strong>wall game</strong>. Nobody pays, reshuffle and
              start a new hand.
            </li>
          </ul>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-accent)]">
            When someone calls Mahjong:
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>The winner <strong>exposes their entire hand</strong> face-up on their rack</li>
            <li>Everyone verifies the hand matches a line on the card</li>
            <li>The winner should have <strong>no discards left</strong> — all 14 tiles should be on the rack</li>
            <li>Don&apos;t throw in your hand until Mahjong is confirmed</li>
          </ul>

          <Callout variant="warn">
            <strong>If the hand doesn&apos;t match the card</strong>, it&apos;s
            a false Mahjong — the caller&apos;s hand is dead for the rest
            of the round.
          </Callout>
        </LessonScreen>

        {/* ── Between hands ── */}
        <LessonScreen title="🔄 Between Hands">
          <p>After a hand ends (someone wins or the wall runs out):</p>
          <ol className="ml-6 list-decimal space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>Pay up</strong> — settle the score for that hand</li>
            <li><strong>Dealer rotates to the left</strong> — the player to the Dealer&apos;s left becomes the new East</li>
            <li><strong>Mix the tiles</strong> — everyone pushes all tiles face-down to the center and mixes</li>
            <li><strong>Build new walls</strong> and deal again</li>
          </ol>
          <Callout variant="tip">
            <strong>Exception:</strong> if the Dealer (East) wins or the hand
            ends in a wall game, the Dealer stays East for the next hand.
          </Callout>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={8}
            title="Lesson 9 Check"
            passThreshold={3}
            questions={[
              {
                question: "Who goes first when play begins?",
                options: [
                  "The player with the most tiles",
                  "East (the Dealer) — they discard to start",
                  "The player to East's right",
                  "Anyone can go first",
                ],
                correct: 1,
                explanation:
                  "East already has 14 tiles, so they discard one to start the game. Play then moves to the right.",
              },
              {
                question: "What are the 3 steps of every turn?",
                options: [
                  "Call, expose, discard",
                  "Draw, decide, discard",
                  "Sort, scan, discard",
                  "Draw, call, expose",
                ],
                correct: 1,
                explanation:
                  "Every turn: draw a tile from the wall, decide what to keep, discard one tile face-up.",
              },
              {
                question:
                  "When you discard a tile, what must you do?",
                options: [
                  "Place it silently",
                  "Show it to the player on your right first",
                  "Say its name out loud and place it face-up in the center",
                  "Flip it face-down",
                ],
                correct: 2,
                explanation:
                  "Name every discard out loud and place it face-up in the middle of the table. This is an official NMJL rule — it gives other players a chance to call.",
              },
              {
                question:
                  "What happens when the wall runs out and nobody has won?",
                options: [
                  "The player with the best hand wins",
                  "East wins automatically",
                  "Nobody pays — reshuffle and start a new hand",
                  "Everyone pays East",
                ],
                correct: 2,
                explanation:
                  "A wall game means nobody won. No payments, just reshuffle and deal again.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 9 Complete">
          <p>
            You now know the basic flow of play — draw, decide, discard,
            repeat. That&apos;s the heartbeat of every game of American
            Mahjong.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 10 teaches you{" "}
            <strong>hand strategy</strong> — how to decide what to keep,
            what to throw, and where to use your jokers.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={8}
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
