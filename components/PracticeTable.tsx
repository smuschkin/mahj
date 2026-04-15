"use client";

import { useState } from "react";
import Link from "next/link";
import { Cover } from "@/components/Cover";
import { WashAnimation } from "@/components/WashAnimation";
import { WallPushAnimation } from "@/components/WallPushAnimation";
import { DealingAnimation } from "@/components/DealingAnimation";
import { CharlestonSim } from "@/components/CharlestonSim";

/* ───── Step definitions ───── */

type Step = {
  id: string;
  title: string;
  subtitle: string;
  coaching: string;
};

const STEPS: Step[] = [
  {
    id: "intro",
    title: "Welcome to the Table",
    subtitle: "Let\u2019s walk through a full round of American Mahjong",
    coaching:
      "A round has a clear rhythm: wash the tiles, build your walls, deal, pass tiles in the Charleston, then play. We\u2019ll walk through each step so you know exactly what to expect when you sit down at a real table.",
  },
  {
    id: "wash",
    title: "Step 1: Wash the Tiles",
    subtitle: "Everyone mixes the tiles face-down",
    coaching:
      "All 152 tiles start face-down in the center of the table. Everyone reaches in and swirls them around to shuffle. This is called \u201Cwashing.\u201D It\u2019s noisy, fun, and the sound of tiles clacking is part of the experience.",
  },
  {
    id: "wall",
    title: "Step 2: Build Your Wall",
    subtitle: "Each player builds a wall of tiles in front of their rack",
    coaching:
      "Each player picks up tiles (still face-down) and lines them up in a row of 19 stacks, 2 tiles high \u2014 that\u2019s 38 tiles per wall, 152 total. The wall sits against your rack. When it\u2019s time to deal from your wall, you\u2019ll push it toward the center.",
  },
  {
    id: "deal",
    title: "Step 3: The Deal",
    subtitle: "East rolls the dice and deals tiles to each player",
    coaching:
      "East (the dealer) rolls the dice to determine where to break the wall. Then tiles are dealt in groups of 4, going around the table 3 times (that\u2019s 12 tiles each). Finally, East picks 2 more tiles and everyone else picks 1 \u2014 so East starts with 14 and everyone else has 13.",
  },
  {
    id: "charleston",
    title: "Step 4: The Charleston",
    subtitle: "Pass tiles you don\u2019t want \u2014 get tiles you might need",
    coaching:
      "This is unique to American Mahjong! Before play begins, you pass 3 tiles at a time in a specific pattern: Right, Across, Left (1st Charleston), then Left, Across, Right (2nd Charleston), then an optional courtesy pass across. This is your chance to dump tiles that don\u2019t fit your hand and hopefully get ones that do.",
  },
  {
    id: "done",
    title: "You\u2019re Ready!",
    subtitle: "You just walked through the setup of a full round",
    coaching:
      "After the Charleston, play begins \u2014 East discards first, then players take turns drawing and discarding. But the setup you just practiced is what trips up most beginners. Now you know the flow: wash, wall, deal, Charleston. Go try it at a real table!",
  },
];

/* ───── Progress dots ───── */

function StepDots({
  current,
  total,
  onJump,
}: {
  current: number;
  total: number;
  onJump: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onJump(i)}
          className={`h-2 rounded-full transition-all ${
            i === current
              ? "w-6 bg-[#C8A951]"
              : i < current
                ? "w-2 bg-[#2D8B5E]"
                : "w-2 bg-white/20"
          }`}
          aria-label={`Go to step ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ───── Main component ───── */

export function PracticeTable() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];

  const canGoBack = stepIndex > 0;
  const canGoForward = stepIndex < STEPS.length - 1;
  const isCharleston = step.id === "charleston";

  return (
    <div className="mx-auto max-w-[820px] px-4 py-8 sm:px-7">
      <Cover
        eyebrow="Setup Walkthrough"
        title="Practice"
        highlight="Round"
        subtitle="Walk through the setup of a full round of American Mahjong"
      />

      {/* Progress dots */}
      <div className="mb-4">
        <StepDots
          current={stepIndex}
          total={STEPS.length}
          onJump={setStepIndex}
        />
        <p className="mt-1 text-center text-[13px] text-zinc-400">
          Step {stepIndex + 1} of {STEPS.length}
        </p>
      </div>

      {/* Step title + coaching */}
      <div className="mb-6 animate-fade-in" key={step.id}>
        <h2 className="font-serif text-2xl font-black text-[var(--color-dark)] md:text-3xl">
          {step.title}
        </h2>
        <p className="mt-1 text-sm italic text-zinc-500">{step.subtitle}</p>
        <div className="mt-4 rounded-lg border-l-4 border-[#C8A951] bg-white px-5 py-4 shadow-sm">
          <p className="text-sm leading-relaxed text-zinc-600">
            {step.coaching}
          </p>
        </div>
      </div>

      {/* Interactive content area */}
      <div className="mb-8">
        {step.id === "intro" && <IntroCard />}
        {step.id === "wash" && <WashAnimation />}
        {step.id === "wall" && <WallPushAnimation />}
        {step.id === "deal" && <DealingAnimation />}
        {step.id === "charleston" && <CharlestonSim />}
        {step.id === "done" && <DoneCard onRestart={() => setStepIndex(0)} />}
      </div>

      {/* Navigation buttons */}
      {!isCharleston && (
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStepIndex((i) => i - 1)}
            disabled={!canGoBack}
            className="rounded-xl border-2 border-[var(--color-mid)] px-5 py-2.5 text-sm font-bold text-[var(--color-mid)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            &larr; Back
          </button>

          {canGoForward && (
            <button
              type="button"
              onClick={() => setStepIndex((i) => i + 1)}
              className="rounded-xl bg-[#2D8B5E] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#247A50] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Next Step &rarr;
            </button>
          )}
        </div>
      )}

      {/* Charleston has its own internal flow — show nav hint */}
      {isCharleston && (
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStepIndex((i) => i - 1)}
            className="rounded-xl border-2 border-[var(--color-mid)] px-5 py-2.5 text-sm font-bold text-[var(--color-mid)] transition hover:-translate-y-0.5"
          >
            &larr; Back
          </button>
          <button
            type="button"
            onClick={() => setStepIndex((i) => i + 1)}
            className="rounded-xl border-2 border-[#2D8B5E] px-5 py-2.5 text-sm font-bold text-[#2D8B5E] transition hover:-translate-y-0.5"
          >
            Skip to finish &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

/* ───── Intro card ───── */

function IntroCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1A4D2E] via-[#1F5A35] to-[#0F3320] p-6 text-center text-white shadow-lg">
      {/* Decorative mini tiles */}
      <div className="mb-4 flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-8 w-5 rounded-sm bg-[#FAF7EC]/20 shadow-inner"
            style={{ transform: `rotate(${(i - 3) * 5}deg)` }}
          />
        ))}
      </div>
      <h3 className="font-serif text-xl font-black text-[#C8A951]">
        Your First Round
      </h3>
      <p className="mt-2 text-sm text-emerald-200/70">
        We&apos;ll walk you through every step of setting up and starting an
        American Mahjong round &mdash; from washing the tiles to completing the
        Charleston.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-[13px] font-bold uppercase tracking-wider text-white/50">
        <span>Wash</span>
        <span>&rarr;</span>
        <span>Wall</span>
        <span>&rarr;</span>
        <span>Deal</span>
        <span>&rarr;</span>
        <span>Charleston</span>
      </div>
    </div>
  );
}

/* ───── Done card ───── */

function DoneCard({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1A4D2E] via-[#1F5A35] to-[#0F3320] p-6 text-center text-white shadow-lg">
      <div className="mb-3 text-4xl">&#127942;</div>
      <h3 className="font-serif text-xl font-black text-[#C8A951]">
        Nice Work!
      </h3>
      <p className="mt-2 text-sm text-emerald-200/70">
        You walked through the full setup of an American Mahjong round.
        Ready to play a practice game with bots?
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Link
          href="/play?mode=game"
          className="rounded-xl bg-[#C8A951] px-5 py-2.5 text-sm font-bold text-[#0F3320] shadow-lg transition hover:bg-[#B89840] active:scale-[0.98]"
        >
          Play a Practice Game
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border-2 border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Review Setup Again
        </button>
        <Link
          href="/"
          className="rounded-xl border-2 border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Back to Modules
        </Link>
      </div>
    </div>
  );
}
