"use client";

import { useEffect, useState } from "react";

const KEY = "mahj-progress-v1";

export type ModuleStatus = "not-started" | "in-progress" | "completed";

export type ModuleProgress = {
  status: ModuleStatus;
  currentStep?: number;
  bestQuizScore?: number;
  completedAt?: number;
};

export type AllProgress = Record<number, ModuleProgress>;

/* ───── Read / write helpers ───── */

export function readProgress(): AllProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AllProgress;
  } catch {
    return {};
  }
}

function writeProgress(p: AllProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event("mahj-progress-change"));
  } catch {
    // localStorage may be unavailable (private mode, full storage) — fail silently
  }
}

export function getModuleProgress(num: number): ModuleProgress {
  return readProgress()[num] ?? { status: "not-started" };
}

export function setModuleStep(num: number, step: number): void {
  const p = readProgress();
  const existing = p[num] ?? { status: "not-started" as ModuleStatus };
  // Don't downgrade a completed module — but do update the step pointer
  const status: ModuleStatus =
    existing.status === "completed" ? "completed" : "in-progress";
  p[num] = { ...existing, status, currentStep: step };
  writeProgress(p);
}

export function markModuleComplete(num: number): void {
  const p = readProgress();
  p[num] = {
    ...(p[num] ?? {}),
    status: "completed",
    completedAt: Date.now(),
  };
  writeProgress(p);
}

export function setQuizScore(num: number, score: number): void {
  const p = readProgress();
  const existing = p[num] ?? { status: "in-progress" as ModuleStatus };
  const best = Math.max(existing.bestQuizScore ?? 0, score);
  p[num] = { ...existing, bestQuizScore: best };
  writeProgress(p);
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("mahj-progress-change"));
  } catch {
    // ignore
  }
}

export function unlockAllModules(): void {
  if (typeof window === "undefined") return;
  try {
    const p = readProgress();
    // Mark modules 0-14 as completed
    for (let i = 0; i <= 14; i++) {
      p[i] = { ...(p[i] ?? {}), status: "completed", completedAt: Date.now() };
    }
    writeProgress(p);
  } catch {
    // ignore
  }
}

/* ───── Module locking ───── */

/** Module 0 is always unlocked. Every other module requires the previous one to be completed. */
export function isModuleUnlocked(num: number): boolean {
  if (num === 0) return true;
  const p = readProgress();
  return p[num - 1]?.status === "completed";
}

/* ───── React hooks ───── */

/**
 * Returns all module progress + a `mounted` flag.
 * `mounted` is false during SSR / first render to avoid hydration mismatches.
 */
export function useProgress(): { progress: AllProgress; mounted: boolean } {
  const [progress, setProgress] = useState<AllProgress>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setMounted(true);

    const handler = () => setProgress(readProgress());
    window.addEventListener("mahj-progress-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("mahj-progress-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { progress, mounted };
}

export function useModuleProgress(num: number): {
  progress: ModuleProgress;
  mounted: boolean;
} {
  const { progress, mounted } = useProgress();
  return {
    progress: progress[num] ?? { status: "not-started" },
    mounted,
  };
}
