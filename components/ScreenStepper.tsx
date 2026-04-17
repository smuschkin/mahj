"use client";

import { Children, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getModuleProgress,
  markModuleComplete,
  setModuleStep,
} from "@/lib/progress";
import { getAdjacentModules } from "@/lib/modules";
import { Cover } from "@/components/Cover";

type CoverProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
};

export function ScreenStepper({
  children,
  moduleNum,
  header,
  coverProps,
}: {
  children: ReactNode;
  moduleNum?: number;
  header?: ReactNode;
  coverProps?: CoverProps;
}) {
  const screens = Children.toArray(children);
  const total = screens.length;
  const [current, setCurrent] = useState(0);
  const [restored, setRestored] = useState(false);
  const router = useRouter();
  const isFirst = current === 0;
  const isLast = current === total - 1;
  const nextModule = moduleNum !== undefined ? getAdjacentModules(moduleNum).next : undefined;

  useEffect(() => {
    if (moduleNum === undefined) {
      setRestored(true);
      return;
    }
    const saved = getModuleProgress(moduleNum);
    if (
      saved.status !== "completed" &&
      saved.currentStep !== undefined &&
      saved.currentStep > 0 &&
      saved.currentStep < total
    ) {
      setCurrent(saved.currentStep);
    }
    setRestored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleNum]);

  useEffect(() => {
    if (moduleNum === undefined || !restored) return;
    setModuleStep(moduleNum, current);
    if (current === total - 1) {
      markModuleComplete(moduleNum);
    }
  }, [current, moduleNum, total, restored]);

  return (
    <div>
      {/* Step 1: full header (Cover + SectionHeader + MetaBox) */}
      {header && current === 0 && <div className="mb-3">{header}</div>}

      {/* Steps 2+: compact cover */}
      {coverProps && current > 0 && (
        <Cover {...coverProps} compact />
      )}

      {/* Progress dots */}
      <div className="mb-1 flex items-center justify-center gap-1">
        {screens.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to step ${i + 1}`}
            onClick={() => setCurrent(i)}
            className="flex items-center justify-center py-3"
          >
            <span
              className={`block h-2.5 rounded-full transition-all ${
                i === current
                  ? "w-8 bg-[#C8A951]"
                  : i < current
                    ? "w-2.5 bg-[#1A4D2E]"
                    : "w-2.5 bg-[#D6CFB8]"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Step indicator */}
      <p className="mb-3 text-center text-[13px] uppercase tracking-[2px] text-zinc-500 font-bold">
        Step {current + 1} of {total}
      </p>

      {/* Active screen */}
      <div className="animate-fade-in">{screens[current]}</div>

      {/* Prev / Next */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={isFirst}
          className="rounded-xl border-2 border-[#1A4D2E] bg-white px-4 py-3 sm:px-5 text-[15px] font-bold uppercase tracking-wider text-[#1A4D2E] transition disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:-translate-y-0.5"
        >
          &larr; Back
        </button>
        <span className="text-[13px] text-zinc-400">
          {current + 1} / {total}
        </span>
        {isLast && nextModule ? (
          <button
            type="button"
            onClick={() => router.push(nextModule.href)}
            className="rounded-xl bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] px-5 py-3 sm:px-6 text-[15px] font-bold uppercase tracking-wider text-[#C8A951] shadow-sm transition hover:-translate-y-0.5"
          >
            Next Lesson &rarr;
          </button>
        ) : isLast ? (
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-xl bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] px-5 py-3 sm:px-6 text-[15px] font-bold uppercase tracking-wider text-[#C8A951] shadow-sm transition hover:-translate-y-0.5"
          >
            Done &mdash; Back to Home
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            className="rounded-xl bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] px-5 py-3 sm:px-6 text-[15px] font-bold uppercase tracking-wider text-white shadow-sm transition hover:-translate-y-0.5"
          >
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
