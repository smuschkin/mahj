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

import { CharlestonSim } from "@/components/CharlestonSim";

import { CharlestonAnimation } from "@/components/CharlestonAnimation";
import { getAdjacentModules } from "@/lib/modules";

/* ─── Local helpers (only used by this module) ─── */

function PassStep({
  num,
  title,
  children,
  hat,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
  hat?: string;
}) {
  return (
    <div
      className={`relative rounded-xl border-l-4 p-4 ${
        hat
          ? "border-[var(--color-red)] bg-[#FFF8F5]"
          : "border-[var(--color-border)] bg-[var(--color-light)]"
      }`}
    >
      {hat && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--color-red)] px-2.5 py-1 text-[13px] font-black uppercase tracking-wider text-white shadow">
          {hat}
        </span>
      )}
      <span className="mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-mid)] text-xs font-black text-white">
        {num}
      </span>
      <h4 className="font-serif text-base font-black text-[var(--color-mid)]">
        {title}
      </h4>
      <p className="mt-1 text-[13px] text-zinc-600">{children}</p>
    </div>
  );
}

function DirCell({
  arrow,
  name,
  who,
  tone,
}: {
  arrow: string;
  name: string;
  who: string;
  tone: "right" | "across" | "left";
}) {
  const toneClass =
    tone === "right"
      ? "border-[var(--color-red)] bg-[#FFF6F4]"
      : tone === "left"
        ? "border-[var(--color-green)] bg-[#F4FBF6]"
        : "border-[var(--color-border)] bg-[#FFFBEC]";
  return (
    <div className={`rounded-lg border-2 p-3 text-center ${toneClass}`}>
      <div className="text-2xl font-black text-[var(--color-red)]">{arrow}</div>
      <div className="font-serif text-sm font-black uppercase tracking-wider text-[var(--color-mid)]">
        {name}
      </div>
      <div className="mt-1 text-[13px] text-zinc-500">{who}</div>
    </div>
  );
}

/** Face-down (unseen) tile — used to depict blind-pass tiles. */
function BlindTile() {
  return (
    <div
      className="flex h-12 w-9 items-center justify-center rounded-md border-2 border-[var(--color-border)] font-black text-white shadow-sm"
      style={{
        background:
          "repeating-linear-gradient(45deg, #8B6914 0, #8B6914 4px, #A0791A 4px, #A0791A 8px)",
      }}
      aria-label="face-down tile"
    >
      ?
    </div>
  );
}

export default function Module4Charleston() {
  const adj = getAdjacentModules(4);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={4} coverProps={{ eyebrow: "MAHJ — Module 4", title: "The", highlight: "Charleston", subtitle: "The trading ritual that makes American Mahjong unique" }} header={<><Cover
        eyebrow="MAHJ — Module 4"
        title="The"
        highlight="Charleston"
        subtitle="The trading ritual that makes American Mahjong unique"
      />
      <SectionHeader>Lesson</SectionHeader>
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Understand the full Charleston sequence — directions, blind passes, courtesy mechanics, and when you can declare Mahjong mid-Charleston.",
          },
          { label: "Estimated time", value: "5–7 minutes" },
          { label: "Prerequisite", value: "Module 3 (Setup & Dealing)" },
          { label: "Unlocks", value: "Module 5 (Charleston Strategy)" },
          {
            label: "Why it matters",
            value:
              "The Charleston is unique to American Mahjong and confuses every newcomer. Master it here and you'll feel ready at any table.",
          },
        ]}
      /></>}>
        {/* ── 1. What is the Charleston? ── */}
        <LessonScreen title="🔄 What Is the Charleston?">
          <p>
            Right after the deal — but <em>before</em>{" "}the game starts — players do
            something unique to American Mahjong: they{" "}
            <strong>trade tiles with each other</strong>.
          </p>
          <p>
            This is the <strong>Charleston</strong>. You pass tiles you don&apos;t want,
            and receive tiles other players don&apos;t want. The idea is that everyone
            has a chance to improve their starting hand before play begins.
          </p>
          <p>
            It&apos;s the most distinctive ritual in American Mahjong. It&apos;s also
            the part that confuses brand-new players the most — so we&apos;ll go slow.
          </p>
        </LessonScreen>

        {/* ── 2. Passing directions + animation ── */}
        <LessonScreen title="👁️ The Big Picture">
          <p>
            Each pass: pick <strong>3 tiles</strong>{" "}you don&apos;t want, slide
            them face-down to another player, get 3 back. There are only{" "}
            <strong>3 directions</strong>:
          </p>

          <p className="mt-2 text-[13px] font-bold uppercase tracking-wider text-zinc-400">
            1st Charleston (mandatory)
          </p>
          <div className="my-2 grid grid-cols-3 gap-1.5 sm:gap-3">
            <DirCell arrow="→" name="Right" who="Pass 1" tone="right" />
            <DirCell arrow="↑" name="Across" who="Pass 2" tone="across" />
            <DirCell arrow="←" name="Left" who="Pass 3" tone="left" />
          </div>

          <p className="mt-3 text-[13px] font-bold uppercase tracking-wider text-zinc-400">
            2nd Charleston (can be stopped before it starts)
          </p>
          <div className="my-2 grid grid-cols-3 gap-1.5 sm:gap-3">
            <DirCell arrow="←" name="Left" who="Pass 4" tone="left" />
            <DirCell arrow="↑" name="Across" who="Pass 5" tone="across" />
            <DirCell arrow="→" name="Right" who="Pass 6" tone="right" />
          </div>

          <p className="mt-3">
            Watch how tiles flow around the table:
          </p>

          <CharlestonAnimation />

          <Callout variant="warn">
            <strong>&quot;Right&quot; and &quot;left&quot; mean your physical right
            and left</strong> — the same as in everyday life. If you raise your right
            hand, the player it&apos;s pointing at is &quot;right.&quot;
          </Callout>
        </LessonScreen>

        {/* ── 4. How each pass works ── */}
        <LessonScreen title="👉 How Each Pass Works">
          <p>
            Each pass is the same mechanic: pick{" "}
            <strong>3 tiles you don&apos;t want</strong>, slide them{" "}
            <strong>face-down</strong>{" "}to the designated player, and receive 3
            face-down tiles in return. Add them to your hand.
          </p>
          <p>
            You can pass any tiles <em>except</em>{" "}jokers. You can also re-pass tiles
            you just received from someone else.
          </p>
          <Callout variant="info">
            <strong>What should you keep vs. pass?</strong>{" "}You&apos;ll learn the
            strategy for making smart passing decisions in Module 5.
          </Callout>
          <Callout variant="warn">
            <strong>Never pass a Joker.</strong>{" "}Jokers are gold — you&apos;d be giving
            away your single most valuable tile.
          </Callout>
        </LessonScreen>

        {/* ── 7. Second Charleston ── */}
        <LessonScreen title="🔁 The Second Charleston (Optional)">
          <p>
            After the first 3 passes, the table decides:{" "}
            <strong>do we continue?</strong>
          </p>
          <p>
            If <strong>any one player says &quot;stop,&quot;</strong>{" "}the second
            Charleston doesn&apos;t happen and play begins. Otherwise, you do the
            second Charleston in reverse order:
          </p>
          <ol className="ml-6 list-decimal space-y-1 text-[15px]">
            <li><strong>Second Left</strong> — pass 3 to your left</li>
            <li><strong>Second Across</strong> — pass 3 across</li>
            <li><strong>Second Right</strong> — pass 3 to your right</li>
          </ol>
          <Callout variant="warn">
            <strong>Once the second Charleston starts, you must finish all 3
            passes.</strong>{" "}The only chance to stop is <em>before</em>{" "}it begins —
            between the first and second Charlestons. You can&apos;t quit mid-way
            through.
          </Callout>
          <Callout variant="tip">
            If your hand is already shaping up nicely, calling &quot;stop&quot; after
            the first Charleston is a smart move — you don&apos;t want to give other
            players more chances to improve.
          </Callout>
        </LessonScreen>

        {/* ── 8. Blind pass ── */}
        <LessonScreen title="🙈 The Blind Pass">
          <p>
            Sometimes by the late passes you don&apos;t have 3 tiles you want to
            give up. A <strong>blind pass</strong>{" "}lets you pass along tiles you
            just received from another player <em>without looking at them</em>.
          </p>

          <Callout variant="warn">
            <strong>When can you blind pass?</strong>{" "}Only on two specific passes:
            <ul className="mt-1 ml-5 list-disc space-y-0.5">
              <li>The <strong>first left</strong>{" "}(pass 3 — the last pass of the first Charleston)</li>
              <li>The <strong>last right</strong>{" "}(pass 6 — the last pass of the second Charleston)</li>
            </ul>
            You <strong>cannot</strong>{" "}blind pass on any other pass, including the courtesy.
          </Callout>

          <p>Here&apos;s how it works:</p>
          <ol className="ml-6 list-decimal space-y-1 text-[14px] text-zinc-700">
            <li>
              When you receive tiles from another player, <strong>don&apos;t look
              at them yet</strong>
            </li>
            <li>
              Decide how many of your <em>own</em>{" "}tiles you want to pass (0, 1,
              2, or 3)
            </li>
            <li>
              Pass your chosen tiles plus enough unseen tiles to make 3 total
            </li>
            <li>
              <em>Then</em>{" "}look at whatever unseen tiles you kept
            </li>
          </ol>

          <Callout variant="info">
            <strong>No peeking.</strong>{" "}You must decide before looking. Peeking
            at the incoming tiles and then deciding to pass them is cheating.
          </Callout>

          <div className="my-4 rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-light)] p-5">
            <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-wider text-zinc-600">
              Three valid blind-pass examples
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-white p-3 text-center">
                <div className="mb-1 flex items-end justify-center gap-1">
                  <Tile type="bam" value={2} size="sm" />
                  <Tile type="crack" value={5} size="sm" />
                  <BlindTile />
                </div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                  2 yours + 1 blind
                </p>
              </div>
              <div className="rounded-md bg-white p-3 text-center">
                <div className="mb-1 flex items-end justify-center gap-1">
                  <Tile type="dot" value={7} size="sm" />
                  <BlindTile />
                  <BlindTile />
                </div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                  1 yours + 2 blind
                </p>
              </div>
              <div className="rounded-md bg-white p-3 text-center">
                <div className="mb-1 flex items-end justify-center gap-1">
                  <BlindTile />
                  <BlindTile />
                  <BlindTile />
                </div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                  all 3 blind
                </p>
              </div>
            </div>
            <p className="mt-3 text-center text-[13px] italic text-zinc-600">
              All three are legal — you can pass anywhere from 1 to 3 tiles blind.
            </p>
          </div>

          <Callout variant="tip">
            Blind passes are a normal, accepted move. You&apos;re not
            &quot;cheating&quot; — everyone does it eventually.
          </Callout>
        </LessonScreen>

        {/* ── 9. The Courtesy — courtesy-style deep dive ── */}
        <LessonScreen title="🤝 The Courtesy Pass (Optional)">
          <p>
            After both Charlestons, you and the player <strong>across</strong>{" "}from
            you can do one last optional trade. This is the <strong>courtesy</strong>{" "}
            — and it&apos;s the only &quot;private&quot; trade in the entire game.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            How it works
          </h4>
          <ol className="ml-6 list-decimal space-y-1 text-[14px]">
            <li>
              Turn to the player across and ask:{" "}
              <em>&quot;How many can you do?&quot;</em>{" "}(or just{" "}
              <em>&quot;Courtesy?&quot;</em>)
            </li>
            <li>
              You both agree on a number: <strong>0, 1, 2, or 3</strong>. It
              has to be the same number — if they want 2 and you want 0, you
              do 0.
            </li>
            <li>
              You each select that many tiles, slide them face-down to each
              other, and pick up your new tiles.
            </li>
            <li>Done. Play begins.</li>
          </ol>

          <Callout variant="tip">
            <strong>&quot;Zero&quot; is a perfectly fine answer.</strong>{" "}Most beginners
            say zero on their first few games and that&apos;s totally normal. The
            courtesy is a tool, not a requirement.
          </Callout>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            Rules to remember
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>Both players must agree</strong>{" "}on the count. If they want 2 and
              you want 0, you do 0.
            </li>
            <li><strong>No jokers</strong> — same as every other Charleston pass.</li>
            <li>
              You <strong>can&apos;t see</strong>{" "}what they&apos;re sending you until
              you&apos;ve sent yours. It&apos;s a blind trade.
            </li>
            <li>
              The courtesy is <strong>only with the player across</strong> — never with
              the player to your left or right.
            </li>
          </ul>

          <Callout variant="info">
            <strong>When should you use it?</strong>{" "}Module 5 covers courtesy
            strategy — including when to trade, when to say zero, and worked examples.
          </Callout>
        </LessonScreen>

        {/* ── Mahjong during the Charleston ── */}
        <LessonScreen title="🏆 Mahjong During the Charleston">
          <p>
            Rare, but it happens: if the tiles you were dealt (or that you
            receive on a Charleston pass) already form a complete winning hand
            on the card, you may <strong>declare Mahjong right there</strong>.
          </p>
          <p>
            The Charleston stops immediately and you win the hand — no further
            passes, no play phase.
          </p>
          <Callout variant="tip">
            Don&apos;t pass tiles before checking your hand against the card.
            A free Mahjong is the easiest win in the game.
          </Callout>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="🎯 Confidence Check">
          <p className="text-sm text-zinc-600">
            5 quick questions. Get 4 right to pass.
          </p>
          <Quiz
            moduleNum={4}
            title="Module 4 Check"
            passThreshold={4}
            questions={[
              {
                question: "How many tiles do you pass in each Charleston pass?",
                options: ["1", "2", "3", "4"],
                correct: 2,
                explanation:
                  "Every Charleston pass is exactly 3 tiles, traded face-down with another player.",
              },
              {
                question: "What's the order of the FIRST Charleston?",
                options: [
                  "Left, across, right",
                  "Right, across, left",
                  "Across, right, left",
                  "Random",
                ],
                correct: 1,
                explanation:
                  "First Charleston goes right → across → left. The second Charleston reverses it: left → across → right.",
              },
              {
                question: "Can you pass a joker?",
                options: [
                  "Yes, anytime",
                  "Only on the last pass",
                  "Never",
                  "Only with permission",
                ],
                correct: 2,
                explanation:
                  "Never. Jokers can never be passed in the Charleston — they're your most valuable tiles.",
              },
              {
                question: 'What is a "blind pass"?',
                options: [
                  "Passing with your eyes closed",
                  "Passing tiles you didn't choose",
                  "Passing tiles you received without looking at them",
                  "Skipping a pass",
                ],
                correct: 2,
                explanation:
                  "A blind pass is when you pass along tiles you just received without looking at them. Per NMJL rules, blind passes are only legal on the first left (pass 3) and the last right (pass 6) — the final pass of each Charleston. Not on the courtesy. You can pass 1, 2, or all 3 tiles blind.",
              },
              {
                question: "Can the second Charleston be skipped?",
                options: [
                  "No, never",
                  "Only by East",
                  'Yes, if any one player says "stop" after the first Charleston',
                  "Only if everyone agrees to skip",
                ],
                correct: 2,
                explanation:
                  "Any single player can stop the Charleston after the first three passes. It only takes one.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Module 4 Complete">
          <p>
            You now understand the Charleston — the trading ritual that makes American
            Mahjong unique. You know the directions, blind passes, the courtesy, and
            when you can stop.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Module 5 covers{" "}
            <strong>Charleston Strategy</strong> — what to keep, what to pass, and how
            to use each pass to shape your hand.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <SectionHeader>Practice</SectionHeader>
      <CharlestonSim />

      <ModuleNav
        currentModuleNum={4}
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
