"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const moduleMatch = pathname.match(/^\/module\/(\d+)/);
  const moduleNum = moduleMatch ? parseInt(moduleMatch[1], 10) : null;

  return (
    <nav className="sticky top-0 z-30 border-b border-[#C8A951]/20 bg-[var(--color-ivory)]/98 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[820px] items-center justify-between px-5 py-2.5">
        {/* Left: Home link */}
        <Link
          href="/"
          className={`flex items-center gap-2 rounded-md px-2 py-1 text-sm font-bold transition hover:bg-white/60 ${
            isHome
              ? "text-[var(--color-mid)]"
              : "text-[var(--color-accent)]"
          }`}
        >
          <span className="text-base">{"\u{1F004}"}</span>
          <span className="font-serif text-base font-black tracking-wide text-[var(--color-mid)]">
            MAHJ
          </span>
        </Link>

        {/* Center: Current location */}
        <div className="text-center text-[13px] font-bold uppercase tracking-wider text-zinc-400">
          {isHome && "Home"}
          {moduleNum !== null && `Module ${moduleNum}`}
          {pathname === "/play" && "Practice Table"}
          {pathname === "/calculator" && "Scoring Calculator"}
          {pathname === "/cheatsheet" && "Cheat Sheet"}
        </div>

        {/* Right: Quick links */}
        <div className="flex items-center gap-1">
          {!isHome && (
            <Link
              href="/"
              className="rounded-md px-2.5 py-1.5 text-[13px] font-bold uppercase tracking-wider text-[var(--color-mid)] transition hover:bg-white/60"
            >
              Modules
            </Link>
          )}
          <Link
            href="/play"
            className={`rounded-md px-2.5 py-1.5 text-[13px] font-bold uppercase tracking-wider transition hover:bg-white/60 ${
              pathname === "/play"
                ? "text-[var(--color-mid)]"
                : "text-zinc-500"
            }`}
          >
            Practice
          </Link>
          <Link
            href="/calculator"
            className={`rounded-md px-2.5 py-1.5 text-[13px] font-bold uppercase tracking-wider transition hover:bg-white/60 ${
              pathname === "/calculator"
                ? "text-[var(--color-mid)]"
                : "text-zinc-500"
            }`}
          >
            Calculator
          </Link>
        </div>
      </div>
    </nav>
  );
}
