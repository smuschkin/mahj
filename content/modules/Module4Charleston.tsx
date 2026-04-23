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


import { CharlestonAnimation } from "@/components/CharlestonAnimation";
import { getAdjacentModules } from "@/lib/modules";

function FaceDownTile() {
  return (
    <div className="relative" style={{ width: 40, height: 56 }}>
      {/* Bottom edge — gives thickness */}
      <div
        className="absolute rounded-md"
        style={{
          width: 40, height: 56,
          top: 3, left: 0,
          background: "#B5985A",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      />
      {/* Tile back */}
      <div
        className="absolute rounded-md"
        style={{
          width: 40, height: 56,
          top: 0, left: 0,
          background: "linear-gradient(135deg, #1E6B3A, #145A32)",
          border: "1.5px solid #C9BC8A",
        }}
      >
        <div className="flex h-full items-center justify-center">
          <div
            className="rounded-sm"
            style={{
              width: 26, height: 40,
              border: "1px solid rgba(200,169,81,0.25)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.05))",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PyramidTiles() {
  return (
    <svg viewBox="0 0 200 160" width={200} height={160} aria-hidden="true">
      {/* Bottom-left tile */}
      <g transform="translate(35, 60)">
        {/* Thickness */}
        <rect x="0" y="5" width="70" height="90" rx="6" fill="#B5985A" />
        {/* Back */}
        <rect x="0" y="0" width="70" height="90" rx="6" fill="url(#tileBack)" stroke="#C9BC8A" strokeWidth="1.5" />
        {/* Inner pattern */}
        <rect x="12" y="12" width="46" height="66" rx="3" fill="none" stroke="rgba(200,169,81,0.25)" strokeWidth="1" />
      </g>
      {/* Bottom-right tile */}
      <g transform="translate(95, 60)">
        <rect x="0" y="5" width="70" height="90" rx="6" fill="#B5985A" />
        <rect x="0" y="0" width="70" height="90" rx="6" fill="url(#tileBack)" stroke="#C9BC8A" strokeWidth="1.5" />
        <rect x="12" y="12" width="46" height="66" rx="3" fill="none" stroke="rgba(200,169,81,0.25)" strokeWidth="1" />
      </g>
      {/* Top tile — centered, overlapping */}
      <g transform="translate(65, 0)">
        <rect x="0" y="5" width="70" height="90" rx="6" fill="#B5985A" />
        <rect x="0" y="0" width="70" height="90" rx="6" fill="url(#tileBackTop)" stroke="#C9BC8A" strokeWidth="1.5" />
        <rect x="12" y="12" width="46" height="66" rx="3" fill="none" stroke="rgba(200,169,81,0.3)" strokeWidth="1" />
      </g>
      <defs>
        <linearGradient id="tileBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E6B3A" />
          <stop offset="100%" stopColor="#145A32" />
        </linearGradient>
        <linearGradient id="tileBackTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22804A" />
          <stop offset="100%" stopColor="#1A6B3A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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
      <ScreenStepper moduleNum={4} coverProps={{ eyebrow: "MAHJ — Lesson 5", title: "The", highlight: "Charleston", subtitle: "The trading ritual that makes American Mahjong unique" }} header={<><Cover
        eyebrow="MAHJ — Lesson 5"
        title="The"
        highlight="Charleston"
        subtitle="The trading ritual that makes American Mahjong unique"
      />
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Understand the full Charleston sequence — directions, blind passes, courtesy mechanics, and when you can declare Mahjong mid-Charleston.",
          },
          { label: "Estimated time", value: "5–7 minutes" },
          { label: "Prerequisite", value: "Lesson 4 (Setup & Dealing)" },
          { label: "Unlocks", value: "Lesson 6 (Charleston Strategy)" },
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
            Each pass is the same: pick <strong>3 tiles</strong>, place them{" "}
            <strong>face-down in a row</strong>, and slide them to the
            designated player. You receive 3 face-down tiles back.
          </p>

          <div className="my-4 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <FaceDownTile key={i} />
            ))}
          </div>
          <p className="text-center text-[12px] italic text-zinc-500">
            3 tiles, face-down, in a row
          </p>

          <p className="mt-3">
            You can pass any tiles <em>except</em>{" "}jokers. You can also
            re-pass tiles you just received from someone else.
          </p>
          <Callout variant="info">
            <strong>What should you keep vs. pass?</strong>{" "}You&apos;ll learn
            passing strategy in Lesson 6 (Charleston Strategy).
          </Callout>
          <Callout variant="tip">
            <strong>Wrong tile count?</strong>{" "}If anyone notices a wrong
            number of tiles during the Charleston, all tiles go back in
            and the hand is redealt — no penalty.
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
          <ol className="ml-6 list-decimal space-y-3 text-[15px]">
            <li>
              <strong>Second Left</strong> — pass 3 face down in a{" "}
              <strong>pyramid</strong>{" "}to your left — this signals
              it&apos;s the second Charleston
            </li>
          </ol>

          <div className="my-3 rounded-lg bg-[var(--color-light)] border border-dashed border-[var(--color-border)] p-4">
            <p className="mb-3 text-center text-[12px] font-bold uppercase tracking-wider text-zinc-500">
              Pyramid pass (second Charleston)
            </p>
            <div className="flex justify-center">
              <div className="relative" style={{ width: 90, height: 110 }}>
                {/* Bottom-left tile */}
                <div className="absolute" style={{ left: 0, top: 40 }}>
                  <FaceDownTile />
                </div>
                {/* Bottom-right tile */}
                <div className="absolute" style={{ left: 44, top: 40 }}>
                  <FaceDownTile />
                </div>
                {/* Top tile — overlapping, centered */}
                <div className="absolute" style={{ left: 22, top: 0, zIndex: 1 }}>
                  <FaceDownTile />
                </div>
              </div>
            </div>
            <p className="mt-2 text-center text-[12px] italic text-zinc-500">
              1 on top, 2 on bottom — face down
            </p>
          </div>

          <ol className="ml-6 list-decimal space-y-3 text-[15px]" start={2}>
            <li><strong>Second Across</strong> — pass 3 face down in a row across</li>
            <li><strong>Last Right</strong> — pass 3 face down in a row to your right</li>
          </ol>
          <Callout variant="warn">
            <strong>Once the second Charleston starts, you must finish all 3
            passes.</strong>{" "}The only chance to stop is <em>before</em>{" "}it
            begins. If your hand is shaping up nicely, say &quot;stop&quot;
            after the first Charleston.
          </Callout>
        </LessonScreen>

        {/* ── 8. The Courtesy ── */}
        <LessonScreen title="🤝 The Courtesy Pass (Optional)">
          <p>
            After both Charlestons, you and the player <strong>across</strong>{" "}from
            you can do one last optional trade. This is the <strong>courtesy</strong>{" "}
            — and it&apos;s the only &quot;private&quot; trade in the entire game.
          </p>

          <ol className="ml-6 list-decimal space-y-1 text-[14px]">
            <li>
              Ask the player across: <em>&quot;Courtesy?&quot;</em>
            </li>
            <li>
              Agree on <strong>0, 1, 2, or 3</strong> tiles — lowest number wins
            </li>
            <li>
              Slide tiles face-down to each other. Pick up your new tiles.
            </li>
            <li>Done — play begins.</li>
          </ol>

          <div className="mt-3 rounded-lg bg-[var(--color-light)] border border-dashed border-[var(--color-border)] p-4">
            <ul className="ml-5 list-disc space-y-1 text-[14px] text-zinc-700">
              <li><strong>Only with the player across</strong> — not left or right</li>
              <li><strong>No jokers</strong> — same as every pass</li>
              <li>It&apos;s a <strong>blind trade</strong> — you can&apos;t see what they send until yours is sent</li>
              <li><strong>&quot;Zero&quot; is fine</strong> — most beginners say zero their first few games</li>
              <li><strong>Always available</strong> — even if someone stopped the Charleston after the first round, you can still do the courtesy</li>
            </ul>
          </div>
        </LessonScreen>

        {/* ── 9. Blind pass (advanced) ── */}
        <LessonScreen title="🙈 The Blind Pass (Advanced)">
          <p>
            This is a more advanced move — don&apos;t worry about it for your
            first few games.
          </p>
          <p>
            Sometimes by the late passes you don&apos;t have 3 tiles you want to
            give up. A <strong>blind pass</strong>{" "}lets you pass along tiles you
            just received from another player <em>without looking at them</em>.
          </p>

          <Callout variant="warn">
            <strong>When can you blind pass?</strong>{" "}Only on two specific passes:
            <ul className="mt-1 ml-5 list-disc space-y-0.5">
              <li>The <strong>first left</strong>{" "}(last pass of the first Charleston)</li>
              <li>The <strong>last right</strong>{" "}(last pass of the second Charleston)</li>
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

          <Callout variant="tip">
            <strong>No peeking.</strong>{" "}You must decide before looking.
            Blind passes are a normal, accepted move — everyone does it eventually.
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
        <LessonScreen title="">
          <Quiz
            moduleNum={4}
            title="Lesson 5 Check"
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
                question: "What is the full order of passes in the Charleston?",
                options: [
                  "Right, across, left — then left, across, right",
                  "Left, across, right — then right, across, left",
                  "Across, right, left — then left, right, across",
                  "Right, left, across — then across, left, right",
                ],
                correct: 0,
                explanation:
                  "First Charleston: right → across → left. Second Charleston (optional): left → across → last right. Then the courtesy pass with the player across.",
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
        <LessonScreen title="🎉 Lesson 5 Complete">
          <p>
            You now understand the Charleston — the trading ritual that makes American
            Mahjong unique. You know the directions, blind passes, the courtesy, and
            when you can stop.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 6 covers{" "}
            <strong>Charleston Strategy</strong> — what to keep, what to pass, and how
            to use each pass to shape your hand.
          </p>
          <LessonComplete lessonNum={4} />
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={4}
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
