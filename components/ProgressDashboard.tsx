"use client";

import { useProgress } from "@/lib/progress";
import { modules } from "@/lib/modules";

export function ProgressDashboard() {
  const { progress, mounted } = useProgress();

  if (!mounted) {
    return (
      <div className="mb-6 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-light)] p-5">
        <div className="h-16 animate-pulse rounded-lg bg-zinc-200" />
      </div>
    );
  }

  const total = modules.length;
  const completed = modules.filter(
    (m) => progress[m.num]?.status === "completed"
  ).length;
  const inProgress = modules.filter(
    (m) => progress[m.num]?.status === "in-progress"
  ).length;
  const pct = Math.round((completed / total) * 100);

  // Find the next incomplete module
  const nextModule = modules.find(
    (m) => progress[m.num]?.status !== "completed"
  );

  if (completed === 0 && inProgress === 0) return null;

  return (
    <div className="mb-6 rounded-xl border-2 border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
            Your progress
          </p>
          <p className="font-serif text-2xl font-black text-[var(--color-mid)]">
            {completed} <span className="text-base text-zinc-400">/ {total} modules</span>
          </p>
        </div>
        <div className="font-serif text-3xl font-black text-[var(--color-accent)]">
          {pct}%
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-[var(--color-light)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-green)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex gap-1">
        {modules.map((m) => {
          const s = progress[m.num]?.status;
          const bg =
            s === "completed"
              ? "bg-[var(--color-green)]"
              : s === "in-progress"
                ? "bg-[var(--color-accent)]"
                : "bg-zinc-200";
          return (
            <div
              key={m.num}
              className={`h-2 flex-1 rounded-full ${bg} transition-colors`}
              title={`Module ${m.num}: ${m.name} — ${s ?? "not started"}`}
            />
          );
        })}
      </div>

      {/* Next up */}
      {nextModule && completed < total && (
        <p className="mt-3 text-[12px] text-zinc-500">
          Up next:{" "}
          <span className="font-bold text-[var(--color-mid)]">
            Module {nextModule.num}: {nextModule.name}
          </span>
        </p>
      )}

      {completed === total && (
        <p className="mt-3 text-center text-sm font-bold text-[var(--color-green)]">
          You completed every module — nice work!
        </p>
      )}
    </div>
  );
}
