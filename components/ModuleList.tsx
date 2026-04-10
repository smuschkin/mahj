"use client";

import Link from "next/link";
import { modules } from "@/lib/modules";
import { useProgress } from "@/lib/progress";
import { ModuleProgressBadge } from "@/components/ModuleProgressBadge";

export function ModuleList() {
  const { progress, mounted } = useProgress();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {modules.map((m) => {
        // Module 0 always unlocked, others need previous completed
        const unlocked =
          !mounted || m.num === 0 || progress[m.num - 1]?.status === "completed";

        if (!unlocked) {
          return (
            <div
              key={m.num}
              className="flex items-center gap-3 rounded-lg border-l-4 border-zinc-300 bg-zinc-100 px-4 py-3 text-sm opacity-60"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-300 text-xs font-black text-zinc-500">
                🔒
              </span>
              <span className="font-serif font-bold text-zinc-400">
                {m.name}
              </span>
              <span className="ml-auto text-[10px] text-zinc-400">
                Complete Module {m.num - 1} first
              </span>
            </div>
          );
        }

        return (
          <Link
            key={m.num}
            href={m.href}
            className="flex items-center gap-3 rounded-lg border-l-4 border-[var(--color-accent)] bg-white px-4 py-3 text-sm shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-mid)] text-xs font-black text-white">
              {m.num}
            </span>
            <span className="font-serif font-bold text-[var(--color-dark)]">
              {m.name}
            </span>
            <ModuleProgressBadge moduleNum={m.num} />
          </Link>
        );
      })}
    </div>
  );
}
