"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GLOSSARY_SORTED,
  CATEGORY_COLORS,
  type GlossaryEntry,
} from "@/lib/glossary";

export function GlossaryDrawer() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the search input when the drawer opens
  useEffect(() => {
    if (open) {
      // Small delay so the slide-in animation doesn't fight focus
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GLOSSARY_SORTED;
    return GLOSSARY_SORTED.filter((e) => {
      const haystack = [
        e.term.toLowerCase(),
        ...(e.aliases ?? []).map((a) => a.toLowerCase()),
      ];
      return haystack.some((h) => h.includes(q));
    });
  }, [query]);

  const toggle = useCallback(() => {
    setOpen((o) => !o);
    if (open) setQuery("");
  }, [open]);

  return (
    <>
      {/* ── Floating button ── */}
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close glossary" : "Open glossary"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-mid)] text-2xl text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition hover:scale-105 hover:shadow-[0_6px_24px_rgba(0,0,0,0.3)] active:scale-95"
      >
        {open ? "✕" : "📖"}
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 transition-opacity"
          onClick={toggle}
          aria-hidden
        />
      )}

      {/* ── Drawer panel ── */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full sm:max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        style={{ maxWidth: "100vw" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-5 py-4">
          <span className="text-xl">📖</span>
          <h2 className="flex-1 font-serif text-lg font-black text-[var(--color-mid)]">
            Glossary
          </h2>
          <button
            type="button"
            onClick={toggle}
            className="rounded-md p-1 text-zinc-400 hover:text-zinc-700"
            aria-label="Close glossary"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-zinc-100 px-5 py-3">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms…"
            className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm focus:border-[var(--color-accent)] focus:outline-none"
          />
          <p className="mt-1 text-[13px] text-zinc-400">
            {filtered.length} term{filtered.length === 1 ? "" : "s"}
            {query && ` matching "${query}"`}
          </p>
        </div>

        {/* Scrollable entry list */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm italic text-zinc-400">
              No terms match. Try a different search.
            </p>
          ) : (
            <div className="space-y-3">
              {filtered.map((entry) => (
                <EntryCard key={entry.term} entry={entry} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-100 px-5 py-2 text-center text-[13px] text-zinc-400">
          Full glossary available here
        </div>
      </div>
    </>
  );
}

function EntryCard({ entry }: { entry: GlossaryEntry }) {
  const colors = CATEGORY_COLORS[entry.category];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="mb-1 flex flex-wrap items-baseline gap-2">
        <h3 className="font-serif text-[15px] font-black text-[var(--color-mid)]">
          {entry.term}
        </h3>
        <span
          className={`rounded-full border px-1.5 py-0.5 text-[12px] font-bold uppercase tracking-wider ${colors}`}
        >
          {entry.category}
        </span>
      </div>
      <p className="text-[13px] leading-relaxed text-zinc-700">{entry.definition}</p>
      <div className="mt-1.5 flex flex-wrap gap-1 text-[13px] text-zinc-400">
        {entry.modules.map((m) => (
          <a
            key={m}
            href={`/module/${m}`}
            className="rounded border border-zinc-200 px-1 py-0.5 font-bold text-[var(--color-mid)] hover:border-[var(--color-mid)]"
          >
            M{m}
          </a>
        ))}
      </div>
    </div>
  );
}
