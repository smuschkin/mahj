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
        subtitle="Your path from absolute beginner to your first real game"
      />

      <div className="mb-9 rounded-lg border-l-4 border-[var(--color-accent)] bg-white px-6 py-5 shadow-sm">
        <p className="text-sm text-zinc-600">
          MAHJ teaches American Mahjong from scratch — tiles, setup, the Charleston,
          calling, jokers, strategy, etiquette, and more.{" "}
          <strong className="text-[var(--color-mid)]">No experience needed.</strong>
        </p>
      </div>

      <ProgressDashboard />

      <SectionHeader>Pick Your Lesson</SectionHeader>

      <ModuleList />

      {/* ── Daily Puzzle ── */}
      <div className="mt-9 mb-9">
        <DailyPuzzle />
      </div>

      {/* ── Quick Tools ── */}
      <div className="mb-9 grid grid-cols-2 gap-3">
        <Link
          href="/calculator"
          className="flex flex-col items-center gap-1 rounded-xl border-2 border-[var(--color-accent)] bg-[#F0F5FA] px-4 py-4 text-center transition hover:-translate-y-0.5"
        >
          <span className="text-2xl">💰</span>
          <span className="font-serif text-sm font-black text-[var(--color-mid)]">
            Scoring Calculator
          </span>
          <span className="text-[10px] text-zinc-500">Who pays what?</span>
        </Link>
        <Link
          href="/cheatsheet"
          className="flex flex-col items-center gap-1 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-light)] px-4 py-4 text-center transition hover:-translate-y-0.5"
        >
          <span className="text-2xl">🖨️</span>
          <span className="font-serif text-sm font-black text-[var(--color-mid)]">
            Print Cheat Sheet
          </span>
          <span className="text-[10px] text-zinc-500">Bring to game night</span>
        </Link>
      </div>

      <div className="mt-8 text-center">
        <ResetProgressButton />
      </div>
    </PageWrap>
  );
}
