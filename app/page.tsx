import Link from "next/link";
import { Cover } from "@/components/Cover";
import { PageWrap } from "@/components/PageWrap";
import { SectionHeader } from "@/components/SectionHeader";
import { ResetProgressButton } from "@/components/ResetProgressButton";
import { DailyPuzzle } from "@/components/DailyPuzzle";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { ModuleList } from "@/components/ModuleList";

export default function Home() {
  return (
    <PageWrap>
      <Cover
        eyebrow="Learn American Mahjong"
        title="Welcome to"
        highlight="MAHJ"
        subtitle="Your path from beginner to your first real game"
      />

      <ProgressDashboard />

      <SectionHeader>Pick Your Lesson</SectionHeader>

      <ModuleList />

      {/* ── Daily Puzzle ── */}
      <SectionHeader>Daily Challenge</SectionHeader>
      <div className="mb-6">
        <DailyPuzzle />
      </div>

      {/* ── Quick Tools ── */}
      <SectionHeader>Quick Tools</SectionHeader>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Link
          href="/cheatsheet"
          className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-[#C8A951]/30 bg-white px-4 py-4 text-center shadow-sm transition hover:-translate-y-0.5"
        >
          <span className="text-2xl">{"\u{1F5A8}\uFE0F"}</span>
          <span className="font-serif text-sm font-black text-[var(--color-accent)]">
            Print Cheat Sheet
          </span>
          <span className="text-[13px] text-zinc-500">Bring to game night</span>
        </Link>
        <Link
          href="/play"
          className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-[#C8A951]/30 bg-white px-4 py-4 text-center shadow-sm transition hover:-translate-y-0.5"
        >
          <span className="text-2xl">{"\u{1F3B2}"}</span>
          <span className="font-serif text-sm font-black text-[var(--color-accent)]">
            Practice Table
          </span>
          <span className="text-[13px] text-zinc-500">Learn the flow</span>
        </Link>
        <Link
          href="/calculator"
          className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-[#C8A951]/30 bg-white px-4 py-4 text-center shadow-sm transition hover:-translate-y-0.5"
        >
          <span className="text-2xl">{"\u{1F4B0}"}</span>
          <span className="font-serif text-sm font-black text-[var(--color-accent)]">
            Scoring Calculator
          </span>
          <span className="text-[13px] text-zinc-500">Who pays what?</span>
        </Link>
        <Link
          href="/gear"
          className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-[#C8A951]/30 bg-white px-4 py-4 text-center shadow-sm transition hover:-translate-y-0.5"
        >
          <span className="text-2xl">{"\u{1F3B0}"}</span>
          <span className="font-serif text-sm font-black text-[var(--color-accent)]">
            Gear Guide
          </span>
          <span className="text-[13px] text-zinc-500">What to buy</span>
        </Link>
      </div>



      <div className="mt-2 flex justify-center gap-4 text-center">
        <ResetProgressButton />
      </div>

      <p className="mt-2 text-center text-[13px] text-zinc-400">
        Made with ♥
      </p>
    </PageWrap>
  );
}
