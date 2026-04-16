"use client";

import { resetProgress, unlockAllModules, useProgress } from "@/lib/progress";

export function ResetProgressButton() {
  const { progress, mounted } = useProgress();
  if (!mounted) return null;

  const hasAnyProgress = Object.keys(progress).length > 0;
  const allComplete = Object.keys(progress).length >= 15 &&
    Object.values(progress).every((p) => p.status === "completed");

  function handleReset() {
    if (
      window.confirm(
        "Reset all progress? This cannot be undone."
      )
    ) {
      resetProgress();
    }
  }

  function handleUnlock() {
    unlockAllModules();
  }

  return (
    <div className="flex gap-4">
      {!allComplete && (
        <button
          type="button"
          onClick={handleUnlock}
          className="text-xs text-zinc-500 underline underline-offset-2 hover:text-[var(--color-accent)]"
        >
          Unlock all lessons
        </button>
      )}
      {hasAnyProgress && (
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-zinc-500 underline underline-offset-2 hover:text-[var(--color-red)]"
        >
          Reset progress
        </button>
      )}
    </div>
  );
}
