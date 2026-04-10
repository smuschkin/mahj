"use client";

import { useState, useRef, useEffect } from "react";
import { GLOSSARY_ENTRIES } from "@/lib/glossary";

/**
 * Inline glossary tooltip. Wrap any term:
 *   <GlossaryTip term="Pung">pung</GlossaryTip>
 *
 * Renders as a dotted-underline span. Tap/hover to see the definition.
 */
export function GlossaryTip({
  term,
  children,
}: {
  /** The glossary term to look up (case-insensitive match on term or aliases) */
  term: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const q = term.toLowerCase();
  const entry = GLOSSARY_ENTRIES.find(
    (e) =>
      e.term.toLowerCase() === q ||
      e.aliases?.some((a) => a.toLowerCase() === q)
  );

  if (!entry) {
    // No glossary match — render children without tooltip
    return <>{children}</>;
  }

  return (
    <span ref={ref} className="relative inline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="cursor-help border-b border-dotted border-[var(--color-accent)] text-inherit transition hover:border-solid"
        aria-expanded={open}
        aria-label={`Definition of ${entry.term}`}
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-[var(--color-border)] bg-white p-3 shadow-lg sm:w-72"
        >
          <span className="mb-1 block font-serif text-sm font-black text-[var(--color-mid)]">
            {entry.term}
          </span>
          <span className="block text-[12px] leading-relaxed text-zinc-600">
            {entry.definition}
          </span>
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-[var(--color-border)] bg-white" />
        </span>
      )}
    </span>
  );
}
