"use client";

import { useState } from "react";

/**
 * Charleston Big Picture — one pass at a time, user-paced.
 * Shows a big direction arrow, tile visual, and ROLLOR progress.
 */

type PassInfo = {
  num: number;
  label: string;
  arrow: string;
  half: 1 | 2 | "courtesy";
  desc: string;
  blind?: boolean;
};

const PASSES: PassInfo[] = [
  { num: 1, label: "Right", arrow: "→", half: 1, desc: "Pass 3 tiles to your right" },
  { num: 2, label: "Across", arrow: "↑", half: 1, desc: "Pass 3 tiles across" },
  { num: 3, label: "Left", arrow: "←", half: 1, desc: "Pass 3 tiles to your left" },
  { num: 4, label: "Left", arrow: "←", half: 2, desc: "Pass 3 to your left (blind pass OK)", blind: true },
  { num: 5, label: "Across", arrow: "↑", half: 2, desc: "Pass 3 tiles across" },
  { num: 6, label: "Right", arrow: "→", half: 2, desc: "Pass 3 tiles to your right" },
  { num: 7, label: "Courtesy", arrow: "↔", half: "courtesy", desc: "Trade 0–3 tiles with the player across" },
];

export function CharlestonBigPicture() {
  const [step, setStep] = useState(0);
  const cur = PASSES[step];
  const isFirst = step === 0;
  const isLast = step === PASSES.length - 1;

  const accentColor =
    cur.half === 1
      ? "var(--color-mid)"
      : cur.half === 2
        ? "var(--color-red)"
        : "var(--color-green)";

  return (
    <div className="my-4">
      {/* Main card */}
      <div
        className="rounded-xl border-2 p-5 text-center transition-colors"
        style={{ borderColor: accentColor, background: `color-mix(in srgb, ${accentColor} 5%, white)` }}
      >
        {/* Half label */}
        <div className="text-[13px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>
          {cur.half === 1 && "1st Charleston · mandatory"}
          {cur.half === 2 && "2nd Charleston · optional"}
          {cur.half === "courtesy" && "Courtesy · optional"}
        </div>

        {/* Big arrow */}
        <div className="my-2 text-5xl font-black leading-none" style={{ color: accentColor }}>
          {cur.arrow}
        </div>

        {/* Label */}
        <div className="font-serif text-xl font-black text-[var(--color-mid)]">
          {cur.label}
        </div>

        {/* Description */}
        <p className="mt-1 text-[13px] text-zinc-600">{cur.desc}</p>

        {/* Tile visual */}
        <div className="mt-3 flex justify-center">
          {cur.half === "courtesy" ? (
            /* Courtesy: 0–3 optional tiles */
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex h-7 w-5 items-center justify-center rounded-[3px] border-2 border-dashed text-[12px] font-bold"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  ?
                </div>
              ))}
            </div>
          ) : cur.blind ? (
            /* Blind pass: pyramid — 1 tile on top, 2 on bottom */
            <div className="flex flex-col items-center gap-[2px]">
              {/* Top: 1 tile centered */}
              <div className="h-7 w-5 rounded-[3px] border border-[#C9BC8A] bg-[#FAF7EC] shadow-sm" />
              {/* Bottom: 2 tiles side by side */}
              <div className="flex gap-[2px]">
                <div className="flex h-7 w-5 items-center justify-center rounded-[3px] border border-[#C9BC8A] bg-[#FAF7EC] text-[12px] font-black text-zinc-400 shadow-sm">
                  ?
                </div>
                <div className="flex h-7 w-5 items-center justify-center rounded-[3px] border border-[#C9BC8A] bg-[#FAF7EC] text-[12px] font-black text-zinc-400 shadow-sm">
                  ?
                </div>
              </div>
            </div>
          ) : (
            /* Normal: 3 face-down tiles */
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-7 w-5 rounded-[3px] border border-[#C9BC8A] bg-[#FAF7EC] shadow-sm"
                />
              ))}
            </div>
          )}
        </div>

        {/* Blind pass note */}
        {cur.blind && (
          <p className="mt-2 text-[13px] italic text-zinc-500">
            Stack your 3 tiles in a pyramid shape — 1 on top, 2 on the bottom.
            The bottom 2 can be tiles you received without looking (a blind pass).
          </p>
        )}

        {/* Courtesy note */}
        {cur.half === "courtesy" && (
          <p className="mt-2 text-[13px] italic text-zinc-500">
            Both players must agree on the count. Zero is fine!
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={isFirst}
          className="rounded-md border-2 border-[var(--color-mid)] bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-[var(--color-mid)] transition disabled:opacity-30 enabled:hover:-translate-y-0.5"
        >
          ← Back
        </button>

        {/* ROLLOR progress */}
        <div className="flex items-center gap-0.5">
          {["R", "O", "L", "·", "L", "O", "R"].map((letter, i) => {
            const passIdx = i < 3 ? i : i > 3 ? i - 1 : -1;
            const isCur = passIdx === step;
            const isDone = passIdx >= 0 && passIdx < step;
            return (
              <span
                key={i}
                className={`inline-flex h-5 w-5 items-center justify-center rounded text-[12px] font-black transition-all ${
                  letter === "·"
                    ? "text-zinc-300"
                    : isCur
                      ? i < 3
                        ? "bg-[var(--color-mid)] text-white scale-110"
                        : "bg-[var(--color-red)] text-white scale-110"
                      : isDone
                        ? "bg-zinc-300 text-white"
                        : i < 3
                          ? "bg-[var(--color-mid)]/10 text-[var(--color-mid)]/50"
                          : "bg-[var(--color-red)]/10 text-[var(--color-red)]/50"
                }`}
              >
                {letter}
              </span>
            );
          })}
          {/* Courtesy dot */}
          <span
            className={`ml-0.5 inline-flex h-5 w-5 items-center justify-center rounded text-[12px] font-black transition-all ${
              step === 6
                ? "bg-[var(--color-green)] text-white scale-110"
                : step > 6
                  ? "bg-zinc-300 text-white"
                  : "bg-[var(--color-green)]/10 text-[var(--color-green)]/50"
            }`}
          >
            C
          </span>
        </div>

        <button
          type="button"
          onClick={() => setStep((s) => Math.min(PASSES.length - 1, s + 1))}
          disabled={isLast}
          className="rounded-md border-2 border-[var(--color-mid)] bg-[var(--color-mid)] px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-white transition disabled:opacity-30 enabled:hover:-translate-y-0.5"
        >
          Next →
        </button>
      </div>

      {/* Step counter */}
      <p className="mt-1 text-center text-[13px] text-zinc-400">
        Pass {cur.num} of 7
      </p>
    </div>
  );
}
