"use client";

import Link from "next/link";
import { modules } from "@/lib/modules";
import { useProgress } from "@/lib/progress";
import { ModuleProgressBadge } from "@/components/ModuleProgressBadge";

const MODULE_ICONS: Record<number, string> = {
  0: "\u{1F44B}",
  1: "\u{1F004}",
  2: "\u{1F4CB}",
  3: "\u{1F3B2}",
  4: "\u{1F500}",
  5: "\u{1F0CF}",
  6: "\u{1F9E0}",
  7: "\u{1F6E1}\uFE0F",
  8: "\u{1F91D}",
  9: "\u{1F4B0}",
  10: "\u{26A0}\uFE0F",
  11: "\u{1F4D6}",
  12: "\u{1F3C6}",
  13: "\u{1F9E9}",
};

export function ModuleList() {
  const { progress, mounted } = useProgress();

  return (
    <div className="grid grid-cols-1 gap-3">
      {modules.map((m) => {
        const unlocked =
          !mounted || m.num === 0 || progress[m.num - 1]?.status === "completed";

        if (!unlocked) {
          return (
            <div
              key={m.num}
              className="flex items-center gap-3 rounded-lg border-l-4 border-zinc-200 bg-zinc-50 px-4 py-4 opacity-50"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm">
                {MODULE_ICONS[m.num] ?? m.num}
              </span>
              <div className="min-w-0 flex-1">
                <span className="font-serif text-[15px] font-bold text-zinc-400">
                  {m.name}
                </span>
                <p className="text-[13px] text-zinc-400">{m.hook}</p>
              </div>
              <span className="shrink-0 text-[13px] text-zinc-400">
                Complete Module {m.num - 1} first
              </span>
            </div>
          );
        }

        return (
          <Link
            key={m.num}
            href={m.href}
            className="flex items-center gap-3 rounded-lg border-l-4 border-[#C8A951] bg-white px-4 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(200,169,81,0.15)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-mid)] text-sm">
              {MODULE_ICONS[m.num] ?? m.num}
            </span>
            <div className="min-w-0 flex-1">
              <span className="font-serif text-[15px] font-bold text-[var(--color-dark)]">
                {m.name}
              </span>
              <p className="text-[13px] text-zinc-500">{m.hook}</p>
            </div>
            <ModuleProgressBadge moduleNum={m.num} />
          </Link>
        );
      })}
    </div>
  );
}
