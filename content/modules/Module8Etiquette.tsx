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
  const adj = getAdjacentModules(8);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={8} coverProps={{ eyebrow: "MAHJ — Module 8", title: "Etiquette &", highlight: "Table Culture", subtitle: "The unwritten (and a few written) rules that make you welcome at any mahjong table" }} header={<><Cover
        eyebrow="MAHJ — Module 8"
        title="Etiquette &"
        highlight="Table Culture"
        subtitle="The unwritten (and a few written) rules that make you welcome at any mahjong table"
      />
      <SectionHeader>Lesson</SectionHeader>
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Learn the announcing rules, the official misnamed-tile penalty, the pause-before-racking convention, and the social customs that make mahjong fun for everyone.",
          },
          { label: "Estimated time", value: "6–8 minutes" },
          { label: "Prerequisite", value: "Module 7 (Defense & Wall Awareness)" },
          { label: "Unlocks", value: "Module 9 (Scoring & Payouts)" },
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
            American Mahjong is a deeply <strong>social</strong>{" "}game. People play in
            the same groups for years — sometimes decades. Etiquette isn&apos;t
            optional polish; it&apos;s the reason people enjoy the game enough to come
            back.
          </p>
          <p>
            A few of the things in this module are <strong>official NMJL rules</strong> with real penalties. Most are <strong>customs</strong>{" "}that vary slightly
            from group to group. We&apos;ll mark which is which.
          </p>
          <Callout variant="tip">
            <strong>Reframe:</strong>{" "}Etiquette in mahjong isn&apos;t about being
            formal. It&apos;s about not slowing down the game and not making other
            players uncomfortable. Both come naturally once you know the basics.
          </Callout>
        </LessonScreen>

        {/* ── 2. Naming your discard ── */}
        <LessonScreen title='🗣️ Name Every Discard Out Loud (NMJL Rule)'>
          <p>
            Every discard must be <strong>named out loud</strong>{" "}as you place it in
            the center of the table. This is an official rule, not just a politeness.
          </p>
          <p>
            Say the tile clearly: <strong>&quot;Four Bam.&quot;</strong>{" "}
            <strong>&quot;Red Dragon.&quot;</strong>{" "}
            <strong>&quot;West.&quot;</strong>{" "}Then place it face-up where everyone can
            see.
          </p>

          <DoDontRow
            doText='Say the tile by name before or as it touches the table — "Six Crak."'
            dontText="Slide a tile silently into the center. Other players may miss a tile they need."
          />
          <DoDontRow
            doText="Place discards in an orderly pile so the discard history is readable."
            dontText="Scatter discards or stack them where they can't be seen."
          />

          <Callout variant="info">
            <strong>Why it&apos;s a rule:</strong>{" "}Players who want to call need to
            hear what was thrown. A silent discard can rob someone of a legitimate
            call.
          </Callout>
        </LessonScreen>

        {/* ── 3. Misnamed discard rule ── */}
        <LessonScreen title="⚠️ The Misnamed-Discard Rule (Official Penalty)">
          <p>
            This is an actual NMJL rule with teeth. Read it twice — it&apos;s the
            etiquette rule with the biggest financial consequence in the entire game.
          </p>

          <div className="my-3 rounded-xl border-2 border-[var(--color-red)] bg-[#FFF6F4] p-4">
            <h4 className="mb-2 font-serif text-base font-black text-[var(--color-red)]">
              Article 67 — Misnamed Discards (NMJL)
            </h4>
            <ul className="ml-5 list-disc space-y-1 text-[13px] text-zinc-700">
              <li>
                <strong>A tile cannot be claimed until it is correctly named.</strong> If a player calls it based on the wrong name, the call is invalid.
              </li>
              <li>
                If another player makes an <strong>exposure</strong>{" "}(Pung/Kong) based
                on a misnamed tile, <strong>that player&apos;s hand is dead</strong>.
                The misnamer is <em>not</em>{" "}penalized — the error belongs to whoever
                called.
              </li>
              <li>
                If a player calls <strong>Mahjong</strong>{" "}on a misnamed tile, the
                Mahjong claim is <strong>still valid</strong> — and the misnamer pays
                the winner the <strong>full amount all three losers would
                have paid combined</strong>. The other two players don&apos;t pay
                anything.
              </li>
            </ul>
          </div>

          <Callout variant="warn">
            <strong>Translation for beginners:</strong>{" "}Slow down and name your
            discards correctly. Misnaming a tile that someone else uses to win the game
            is the single most expensive mistake in American Mahjong — you pay for
            everyone.
          </Callout>
          <Callout variant="tip">
            <strong>Beginner habit to build:</strong>{" "}Look at the tile, say its name,{" "}
            <em>then</em>{" "}let go. Never the other way around.
          </Callout>
        </LessonScreen>

        {/* ── 4. Pause before racking ── */}
        <LessonScreen title="⏸️ The Pause Before Racking">
          <p>
            When it&apos;s your turn, you draw a tile from the wall. Before you place
            it on the sloped part of your rack, <strong>pause</strong>. Count to three
            in your head.
          </p>
          <p>
            That pause is the window where any other player can call the{" "}
            <em>previous</em>{" "}player&apos;s discard. The official rule:{" "}
            <strong>once a tile is racked, the previous discard can no longer be
            called.</strong>{" "}Racking too quickly can rob a player of a legitimate call
            — and you&apos;ll annoy your table fast.
          </p>

          <Callout variant="info">
            <strong>The official definition:</strong>{" "}A tile is &quot;racked&quot; when
            it&apos;s placed on the sloped part of your rack with your other tiles.
            Just touching or tapping the rack doesn&apos;t count.
          </Callout>

          <DoDontRow
            doText="Draw → pause 2–3 seconds → look around → then rack. Give people time to call."
            dontText="Snatch a tile from the wall and slam it onto the rack. Calls die in your hand."
          />
          <DoDontRow
            doText="If a player is reaching for the discard and clearly thinking, wait."
            dontText="Race to rack to deny someone a call. This is rude and against the spirit of the game."
          />
        </LessonScreen>

        {/* ── 5. Calling Mahjong + the window ── */}
        <LessonScreen title='🏆 Calling Mahjong — The Window'>
          <p>
            When the tile that completes your hand is drawn or discarded, say{" "}
            <strong>&quot;wait&quot;</strong>{" "}first to pause the game so the next
            player doesn&apos;t draw. Take a second to verify your hand against the
            card, and then call <strong>&quot;Mahjong&quot;</strong>{" "}to claim the
            win.
          </p>
          <p>
            The window for claiming a discard is the same as for any other call: you
            must speak up <strong>before the next player has racked</strong>{" "}their
            drawn tile. Once that tile is racked, the discard is gone forever — so
            the &quot;wait&quot; needs to come out the moment you see the winning
            tile.
          </p>

          <DoDontRow
            doText='Say "wait" the instant you see your winning tile, verify, then call Mahjong and expose your hand.'
            dontText="Hesitate silently, second-guess, then try to claim it after the next player has racked. The win is forfeited."
          />

          <Callout variant="warn">
            <strong>Don&apos;t false-call.</strong>{" "}If you call &quot;Mahjong&quot; and
            your hand turns out not to be valid, your hand is dead — you keep
            playing but can&apos;t win. Some groups add an extra penalty, but
            per NMJL rules you just pay the eventual winner like any other
            loser. Always check before you call.
          </Callout>
          <Callout variant="info">
            <strong>Don&apos;t throw in your hand until Mahjong is verified.</strong>{" "}When someone calls Mahjong, keep your tiles on your rack until the table confirms the winning hand is valid. If the call was wrong, play continues — but only if everyone&apos;s hand is still intact.
          </Callout>
        </LessonScreen>

        {/* ── 6. Pace of play ── */}
        <LessonScreen title="⏱️ Pace of Play">
          <p>
            Mahjong has a rhythm. Beginners are usually slower than the table — that
            is normal and forgiven. What is <em>not</em>{" "}forgiven is people who never
            speed up.
          </p>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Charleston pace
          </h4>
          <p className="text-[14px] text-zinc-700">
            The Charleston is meant to be <strong>brisk</strong>. Pick your three
            tiles, pass them, repeat. Don&apos;t agonize. Each pass should take seconds,
            not minutes. The whole Charleston should be done in under 2 minutes.
          </p>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Turn pace
          </h4>
          <p className="text-[14px] text-zinc-700">
            Once play begins, your turn is: draw → think briefly → discard → name it.
            Aim for 5–10 seconds per turn once you have rhythm. If three other players
            are routinely waiting on you, you&apos;re too slow.
          </p>

          <Callout variant="tip">
            <strong>Permission to be slow at first:</strong>{" "}For your first 5 games,
            you will be the slow one. That&apos;s fine. Tell your group at the
            start — &quot;I&apos;m new, I&apos;ll be slow today&quot; — and almost
            every group will be patient. Most mahjong players love teaching beginners.
          </Callout>
        </LessonScreen>

        {/* ── 7. Hands, racks, walls ── */}
        <LessonScreen title="🙅 Hands Off Other People's Stuff">
          <p>
            A few physical-touch rules that everyone takes seriously, even when nobody
            states them out loud:
          </p>

          <DoDontRow
            doText="Keep your tiles on your own rack, hidden from other players."
            dontText="Lift your rack to show your hand, even to a partner. Even between rounds."
          />
          <DoDontRow
            doText="Reach into the wall only when it is your turn."
            dontText="Reach for your tile before the previous player has discarded and named it."
          />
          <DoDontRow
            doText="Hand a Joker exchange tile to the player whose rack it&apos;s on, and let them swap it."
            dontText="Reach across the table and place the swap tile on someone else's rack yourself. That's rude."
          />
          <DoDontRow
            doText="Push your wall forward when the dealer needs more tiles mid-deal."
            dontText="Touch another player's wall or rearrange the table without asking."
          />
        </LessonScreen>

        {/* ── 8. Social customs ── */}
        <LessonScreen title="☕ Social Customs (The Unwritten Rules)">
          <p>
            These vary by group, but they&apos;re close to universal. Following them
            will make you welcome at any new table.
          </p>

          <ul className="ml-6 list-disc space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>No comments on other players&apos; hands during play.</strong> Don&apos;t say &quot;ooh, you&apos;re close&quot; or &quot;why did you
              throw that?&quot; even helpfully.
            </li>
            <li>
              <strong>Phones away from the table.</strong>{" "}Most groups consider phones
              at the playing surface rude. Step away if you need to take a call.
            </li>
            <li>
              <strong>Food and drinks well clear of the tiles.</strong>{" "}Spilled coffee
              on a friend&apos;s NMJL card is a real way to lose friends. Use a side
              table.
            </li>
            <li>
              <strong>Say thank you for a courtesy.</strong>{" "}If someone gives you 1–3
              tiles in the courtesy pass, a quiet &quot;thanks&quot; is standard.
            </li>
            <li>
              <strong>No coaching mid-hand.</strong>{" "}Even teaching a beginner usually
              waits until between rounds. Mid-hand advice changes the game.
            </li>
            <li>
              <strong>Compliment a good hand.</strong>{" "}When someone wins a hard hand,{" "}
              <em>say so</em>. The social joy of mahjong is half the point.
            </li>
            <li>
              <strong>Don&apos;t gloat. Don&apos;t sulk.</strong>{" "}The game has lots of
              luck. The same player won&apos;t win every night, and everyone knows it.
            </li>
          </ul>

          <Callout variant="tip">
            <strong>The single best etiquette move</strong>{" "}for a new player: say{" "}
            <em>&quot;I&apos;m still learning — please tell me if I do something
            wrong.&quot;</em>{" "}at the start of your first game with any group. People
            will love you for it.
          </Callout>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="🎯 Confidence Check">
          <p className="text-sm text-zinc-600">
            5 quick questions. Get 4 right to pass.
          </p>
          <Quiz
            moduleNum={8}
            title="Module 8 Check"
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
        <LessonScreen title="🎉 Module 8 Complete">
          <p>
            You now know the table customs that separate a guest who gets invited back
            from one who doesn&apos;t. You know the official rules with teeth (naming
            discards, the misnamed-tile penalty, the racking window) and the social
            ones that just make the game pleasant.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Module 9 covers{" "}
            <strong>Scoring &amp; Payouts</strong> — how the money actually moves at
            the end of a hand: who pays whom, how doubles work, what concealed hands
            are worth, and the dead-hand penalty.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={8}
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
