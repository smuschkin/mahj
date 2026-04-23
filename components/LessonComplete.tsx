"use client";

import { modules } from "@/lib/modules";

export function LessonComplete({ lessonNum }: { lessonNum: number }) {
  const total = modules.length;
  const pct = Math.round(((lessonNum + 1) / total) * 100);
  const next = lessonNum < total - 1 ? modules[lessonNum + 1] : null;

  return (
    <div className="mt-4 rounded-xl border-2 border-[var(--color-accent)] bg-[#E8F5EC] p-4">
      <p className="text-center text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
        Lesson {lessonNum + 1} complete!
      </p>
      <p className="mt-1 text-center font-serif text-lg font-black text-[var(--color-accent)]">
        {lessonNum + 1} of {total} lessons
      </p>

      {/* Progress bar */}
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2D8B5E] to-[#3DAA6D] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {next && (
        <p className="mt-2 text-center text-[13px] text-zinc-600">
          Next: <strong className="text-[var(--color-accent)]">Lesson {next.num + 1} — {next.name}</strong>
        </p>
      )}

      {!next && (
        <p className="mt-2 text-center text-[13px] font-bold text-[var(--color-accent)]">
          You finished all the lessons!
        </p>
      )}
    </div>
  );
}
