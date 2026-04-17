"use client";

import Link from "next/link";
import { useModuleProgress } from "@/lib/progress";

type NavLink = { href: string; name: string; moduleNum?: number };

export function ModuleNav({
  prev,
  next,
  currentModuleNum,
}: {
  prev?: NavLink;
  next?: NavLink;
  currentModuleNum?: number;
}) {
  const { progress, mounted } = useModuleProgress(currentModuleNum ?? -1);
  const isComplete = mounted && progress.status === "completed";
  const nextLocked = next && currentModuleNum !== undefined && !isComplete;

  return (
    <div className="mt-4 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="flex flex-1 flex-col gap-1 rounded-xl border-2 border-[#1A4D2E] bg-white px-4 py-3 sm:px-5 sm:py-4 text-[#1A4D2E] shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#C8A951]">
            &larr; Previous
          </span>
          <span className="font-serif text-lg font-black">{prev.name}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next && !nextLocked ? (
        <Link
          href={next.href}
          className="flex flex-1 flex-col gap-1 rounded-xl bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] px-4 py-3 sm:px-5 sm:py-4 text-right text-white shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#C8A951]">
            Next &rarr;
          </span>
          <span className="font-serif text-lg font-black">{next.name}</span>
        </Link>
      ) : next && nextLocked ? (
        <div className="flex flex-1 flex-col gap-1 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 sm:px-5 sm:py-4 text-right opacity-60">
          <span className="text-[13px] font-bold uppercase tracking-wider text-zinc-400">
            Next &rarr;
          </span>
          <span className="font-serif text-lg font-black text-zinc-400">
            {next.name}
          </span>
          <span className="text-[13px] text-zinc-400">
            Complete this lesson to unlock
          </span>
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
