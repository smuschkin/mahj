"use client";

import { resetProgress, useProgress } from "@/lib/progress";

export function ResetProgressButton() {
  const { progress, mounted } = useProgress();
  if (!mounted) return null;

  const hasAnyProgress = Object.keys(progress).length > 0;
  if (!hasAnyProgress) return null;

  function handleClick() {
    if (
      window.confirm(
        "Reset all progress? This will clear which modules you've completed and where you left off. This cannot be undone."
      )
    ) {
      resetProgress();
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-xs text-zinc-500 underline underline-offset-2 hover:text-[var(--color-red)]"
    >
      Reset all progress
    </button>
  );
}
