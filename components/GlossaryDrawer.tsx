"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  GLOSSARY_SORTED,
  CATEGORY_COLORS,
  type GlossaryEntry,
} from "@/lib/glossary";

export function GlossaryDrawer() {
  const pathname = usePathname();
  const isLesson = pathname.startsWith("/lesson/") || pathname.startsWith("/module/");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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

  if (!open) {
    // Only show the open button (hidden inside lessons)
    if (isLesson) return null;
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label="Open glossary"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A4D2E] text-2xl text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] active:scale-95"
      >
        📖
      </button>
    );
  }

  // When open: full-screen takeover — no fixed positioning tricks
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid #e4e4e7",
          padding: "16px 20px",
          paddingTop: `calc(env(safe-area-inset-top, 0px) + 16px)`,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: "20px" }}>📖</span>
        <h2
          style={{
            flex: 1,
            fontFamily: "var(--font-playfair), serif",
            fontSize: "18px",
            fontWeight: 900,
            color: "var(--color-accent)",
            margin: 0,
          }}
        >
          Glossary
        </h2>
        <button
          type="button"
          onClick={toggle}
          style={{
            padding: "8px 12px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#71717a",
            background: "#f4f4f5",
            border: "1px solid #d4d4d8",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          aria-label="Close glossary"
        >
          ✕ Close
        </button>
      </div>

      {/* Search */}
      <div style={{ borderBottom: "1px solid #f4f4f5", padding: "12px 20px", flexShrink: 0 }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms…"
          style={{
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #d4d4d8",
            backgroundColor: "#fafafa",
            padding: "8px 12px",
            fontSize: "16px",
            outline: "none",
            WebkitAppearance: "none",
          }}
        />
        <p style={{ marginTop: "4px", fontSize: "13px", color: "#a1a1aa" }}>
          {filtered.length} term{filtered.length === 1 ? "" : "s"}
          {query && ` matching "${query}"`}
        </p>
      </div>

      {/* Scrollable entry list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          padding: "12px 20px",
          paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 12px)`,
        }}
      >
        {filtered.length === 0 ? (
          <p style={{ padding: "32px 0", textAlign: "center", fontSize: "14px", fontStyle: "italic", color: "#a1a1aa" }}>
            No terms match. Try a different search.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((entry) => (
              <EntryCard key={entry.term} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EntryCard({ entry }: { entry: GlossaryEntry }) {
  const colors = CATEGORY_COLORS[entry.category];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="mb-1 flex flex-wrap items-baseline gap-2">
        <h3 className="font-serif text-[15px] font-black text-[var(--color-accent)]">
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
            href={`/lesson/${m + 1}`}
            className="rounded border border-zinc-200 px-1 py-0.5 font-bold text-[var(--color-mid)] hover:border-[var(--color-mid)]"
          >
            {m + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
