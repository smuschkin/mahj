"use client";

import { useModuleProgress } from "@/lib/progress";

export function ModuleProgressBadge({ moduleNum }: { moduleNum: number }) {
  const { progress, mounted } = useModuleProgress(moduleNum);
  if (!mounted) return <span className="ml-auto h-5 w-5 shrink-0" />; // placeholder

  if (progress.status === "completed") {
    return (
      <span
        className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-green)] text-[11px] font-black text-white"
        aria-label="Completed"
        title="Completed"
      >
        ✓
      </span>
    );
  }

  if (progress.status === "in-progress") {
    return (
      <span
        className="ml-auto flex shrink-0 items-center gap-1"
        aria-label={`In progress, step ${(progress.currentStep ?? 0) + 1}`}
        title={`In progress · Step ${(progress.currentStep ?? 0) + 1}`}
      >
        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
          In progress
        </span>
      </span>
    );
  }

  return <span className="ml-auto h-5 w-5 shrink-0" />;
}
