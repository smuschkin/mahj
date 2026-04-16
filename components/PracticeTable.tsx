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
    title: "The Round Flow",
    subtitle: "Walk through each step of setting up a game",
    coaching: "",
  },
  {
    id: "wash",
    title: "Step 1: Wash the Tiles",
    subtitle: "Everyone mixes the tiles face-down",
    coaching:
      "All 152 tiles start face-down in the center. Everyone swirls them around to shuffle.",
  },
  {
    id: "wall",
    title: "Step 2: Build Your Wall",
    subtitle: "Each player builds a wall in front of their rack",
    coaching:
      "Line up 19 stacks, 2 tiles high. That\u2019s 38 tiles per wall, 152 total.",
  },
  {
    id: "deal",
    title: "Step 3: The Deal",
    subtitle: "East deals tiles to each player",
    coaching:
      "East rolls the dice, breaks the wall, then deals in groups of 4. Everyone gets 13 tiles, East gets 14.",
  },
  {
    id: "charleston",
    title: "Step 4: The Charleston",
    subtitle: "Pass tiles you don\u2019t want",
    coaching:
      "Pass 3 tiles at a time: Right, Across, Left (1st Charleston), then reverse (2nd Charleston), then an optional courtesy across.",
  },
  {
    id: "done",
    title: "You\u2019re Ready!",
    subtitle: "Setup complete \u2014 time to play",
    coaching: "",
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
          className={`h-2.5 rounded-full transition-all outline-none focus:ring-0 ${
            i === current
              ? "w-8 bg-[#C8A951]"
              : i < current
                ? "w-2.5 bg-[#1A4D2E]"
                : "w-2.5 bg-[#D6CFB8]"
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
    <div className="mx-auto max-w-[820px] px-4 py-3 sm:px-7">
      <Cover
        eyebrow="Setup Walkthrough"
        title="Practice"
        highlight="Round"
        subtitle="Walk through the setup of a full round of American Mahjong"
      />

      {/* Progress dots */}
      <div className="-mt-4 mb-1">
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
      <div className="mb-4 animate-fade-in" key={step.id}>
        <h2 className="font-serif text-2xl font-black text-[var(--color-dark)] md:text-3xl">
          {step.title}
        </h2>
        <p className="mt-1 text-sm italic text-zinc-500">{step.subtitle}</p>
        {step.coaching && (
          <div className="mt-4 rounded-lg border-l-4 border-[#C8A951] bg-white px-5 py-4 shadow-sm">
            <p className="text-sm leading-relaxed text-zinc-600">
              {step.coaching}
            </p>
          </div>
        )}
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
    <div className="grid grid-cols-2 gap-3">
      {[
        { num: 1, emoji: "🌊", label: "Wash", desc: "Mix tiles face-down" },
        { num: 2, emoji: "🧱", label: "Wall", desc: "Build 19 stacks high" },
        { num: 3, emoji: "🎲", label: "Deal", desc: "East deals to everyone" },
        { num: 4, emoji: "🔄", label: "Charleston", desc: "Pass tiles you don\u2019t want" },
      ].map((s) => (
        <div
          key={s.label}
          className="rounded-lg border border-[#C8A951]/30 bg-white p-3 text-center shadow-sm"
        >
          <div className="text-2xl">{s.emoji}</div>
          <div className="mt-1 font-serif text-sm font-black text-[var(--color-mid)]">
            {s.num}. {s.label}
          </div>
          <div className="text-[12px] text-zinc-500">{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ───── Done card ───── */

function DoneCard({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1A4D2E] via-[#1F5A35] to-[#0F3320] p-6 text-center text-white shadow-lg">
      <div className="mb-3 text-4xl">🏆</div>
      <h3 className="font-serif text-xl font-black text-[#C8A951]">
        Nice Work!
      </h3>
      <p className="mt-2 text-sm text-white/70">
        You know the setup flow. Now go try it at a real table!
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl bg-[#C8A951] px-5 py-2.5 text-sm font-bold text-[#0F3320] shadow-lg transition hover:bg-[#B89840] active:scale-[0.98]"
        >
          Review Again
        </button>
        <Link
          href="/"
          className="rounded-xl border-2 border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Back to Lessons
        </Link>
      </div>
    </div>
  );
}
