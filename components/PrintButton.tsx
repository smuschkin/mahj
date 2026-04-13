"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-[var(--color-mid)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
    >
      Print Cheat Sheet
    </button>
  );
}
