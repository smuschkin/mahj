"use client";

import { Children, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getModuleProgress,
  markModuleComplete,
  setModuleStep,
} from "@/lib/progress";
import { getAdjacentModules } from "@/lib/modules";

export function ScreenStepper({
  children,
  moduleNum,
}: {
  children: ReactNode;
  /** If provided, progress is tracked in localStorage under this module number. */
  moduleNum?: number;
}) {
  const screens = Children.toArray(children);
  const total = screens.length;
  const [current, setCurrent] = useState(0);
  const [restored, setRestored] = useState(false);
  const router = useRouter();
  const isFirst = current === 0;
  const isLast = current === total - 1;
  const nextModule = moduleNum !== undefined ? getAdjacentModules(moduleNum).next : undefined;

  // Restore saved step on mount
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

  // Save step + mark complete whenever step changes (after restore)
  useEffect(() => {
    if (moduleNum === undefined || !restored) return;
    setModuleStep(moduleNum, current);
    if (current === total - 1) {
      markModuleComplete(moduleNum);
    }
  }, [current, moduleNum, total, restored]);

  return (
    <div>
      {/* Progress dots */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {screens.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to step ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === current
                ? "w-8 bg-[var(--color-accent)]"
                : i < current
                  ? "w-2.5 bg-[var(--color-mid)]"
                  : "w-2.5 bg-[#D6CFB8]"
            }`}
          />
        ))}
      </div>

      {/* Step indicator */}
      <p className="mb-3 text-center text-xs uppercase tracking-[2px] text-zinc-500 font-bold">
        Step {current + 1} of {total}
      </p>

      {/* Active screen */}
      <div className="animate-fade-in">{screens[current]}</div>

      {/* Prev / Next */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={isFirst}
          className="rounded-md border-2 border-[var(--color-mid)] bg-white px-3 sm:px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-[var(--color-mid)] transition disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:-translate-y-0.5"
        >
          ← Back
        </button>
        <span className="text-xs text-zinc-400">
          {current + 1} / {total}
        </span>
        {isLast && nextModule ? (
          <button
            type="button"
            onClick={() => router.push(nextModule.href)}
            className="rounded-md border-2 border-[var(--color-mid)] bg-[var(--color-mid)] px-4 sm:px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] transition hover:-translate-y-0.5"
          >
            Next Module →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            disabled={isLast}
            className="rounded-md border-2 border-[var(--color-mid)] bg-[var(--color-mid)] px-4 sm:px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] transition disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:-translate-y-0.5"
          >
            {isLast ? "Done ✓" : "Next →"}
          </button>
        )}
      </div>
    </div>
  );
}
