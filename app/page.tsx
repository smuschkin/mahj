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
      <div className="mb-9">
        <DailyPuzzle />
      </div>

      {/* ── Quick Tools ── */}
      <SectionHeader>Quick Tools</SectionHeader>

      <div className="mb-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
      </div>

      {/* ── App Store — hidden in standalone/app mode via CSS ── */}
      <div className="mb-9 hidden-in-app rounded-xl border-2 border-[#C8A951]/30 bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] p-6 text-center shadow-sm">
        <p className="text-[13px] font-bold uppercase tracking-[3px] text-[#C8A951]">
          Also available on
        </p>
        <h3 className="mt-2 font-serif text-xl font-black text-white">
          Download MAHJ for iPhone
        </h3>
        <p className="mt-1 text-[14px] text-white/60">
          Take your lessons offline. Same app, native experience.
        </p>
        <a
          href="https://apps.apple.com/app/id6762031478"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="h-12"
          />
        </a>
      </div>

      <div className="mt-4 flex justify-center gap-4 text-center">
        <ResetProgressButton />
      </div>

      <p className="mt-6 mb-2 text-center text-[13px] text-zinc-400">
        Made with ♥
      </p>
    </PageWrap>
  );
}
