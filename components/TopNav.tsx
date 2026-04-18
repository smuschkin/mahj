"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const moduleMatch = pathname.match(/^\/module\/(\d+)/) || pathname.match(/^\/lesson\/(\d+)/);
  const moduleNum = moduleMatch ? parseInt(moduleMatch[1], 10) : null;

  return (
    <nav className="sticky top-0 z-40 border-b border-[#C8A951]/20 bg-[var(--color-ivory)]" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="mx-auto flex max-w-[820px] items-center justify-between px-3 py-2 sm:px-5 sm:py-2.5">
        {/* Left: Home link */}
        <Link
          href="/"
          className={`flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-bold transition hover:bg-white/60 ${
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

        {/* Center: Current location — hidden on very small screens */}
        <div className="hidden sm:block text-center text-[13px] font-bold uppercase tracking-wider text-zinc-400">
          {isHome && "Home"}
          {moduleNum !== null && `Lesson ${pathname.startsWith("/lesson/") ? moduleNum : moduleNum + 1}`}
          {pathname === "/play" && "Practice"}
          {pathname === "/calculator" && "Calculator"}
          {pathname === "/cheatsheet" && "Cheat Sheet"}
          {pathname === "/gear" && "Gear Guide"}
        </div>

        {/* Right: Quick links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {!isHome && (
            <Link
              href="/"
              className="rounded-md px-2 py-2 text-[13px] font-bold uppercase tracking-wider text-[var(--color-mid)] transition hover:bg-white/60 sm:px-2.5"
            >
              Lessons
            </Link>
          )}
          {pathname !== "/play" && (
            <Link
              href="/play"
              className="rounded-md px-2 py-2 text-[13px] font-bold uppercase tracking-wider text-zinc-500 transition hover:bg-white/60 sm:px-2.5"
            >
              Practice
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
