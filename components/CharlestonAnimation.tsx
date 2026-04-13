"use client";

import { useCallback, useEffect, useState } from "react";

type PassDir = {
  label: string;
  shortLabel: string;
  from: "bottom" | "right" | "top" | "left";
  to: "bottom" | "right" | "top" | "left";
  half: 1 | 2;
};

const PASSES: PassDir[] = [
  { label: "1. Right",   shortLabel: "R", from: "bottom", to: "right",  half: 1 },
  { label: "2. Across",  shortLabel: "O", from: "bottom", to: "top",    half: 1 },
  { label: "3. Left",    shortLabel: "L", from: "bottom", to: "left",   half: 1 },
  { label: "4. Left",    shortLabel: "L", from: "bottom", to: "left",   half: 2 },
  { label: "5. Across",  shortLabel: "O", from: "bottom", to: "top",    half: 2 },
  { label: "6. Right",   shortLabel: "R", from: "bottom", to: "right",  half: 2 },
];

const SEATS: Record<string, { x: number; y: number }> = {
  bottom: { x: 50, y: 88 },
  right:  { x: 88, y: 50 },
  top:    { x: 50, y: 12 },
  left:   { x: 12, y: 50 },
};

export function CharlestonAnimation() {
  const [activePass, setActivePass] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  const jumpTo = useCallback((idx: number) => {
    setPaused(true);
    setAnimating(false);
    // Small delay so the reset takes effect, then trigger the animation
    setTimeout(() => {
      setActivePass(idx);
      setTimeout(() => {
        setAnimating(true);
        setTimeout(() => {
          setAnimating(false);
        }, 1000);
      }, 200);
    }, 50);
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = setTimeout(() => {
      setAnimating(true);
      const advanceTimer = setTimeout(() => {
        setAnimating(false);
        setActivePass((p) => (p + 1) % PASSES.length);
      }, 1200);
      return () => clearTimeout(advanceTimer);
    }, 800);

    return () => clearTimeout(timer);
  }, [activePass, paused]);

  const pass = PASSES[activePass];
  const from = SEATS[pass.from];
  const to = SEATS[pass.to];

  return (
    <div className="my-5 rounded-xl border-2 border-[var(--color-border)] bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          Charleston Flow
        </span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="rounded px-2 py-0.5 text-[13px] font-bold uppercase tracking-wider text-zinc-500 transition hover:bg-zinc-100"
        >
          {paused ? "▶ Play" : "⏸ Pause"}
        </button>
      </div>

      {/* The table */}
      <div className="relative mx-auto" style={{ width: "100%", maxWidth: 320, aspectRatio: "1" }}>
        {/* Felt background */}
        <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]" />

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-serif text-xs font-black text-white">
              {pass.half === 1 ? "1st" : "2nd"}
            </div>
            <div className="font-serif text-[13px] font-bold text-white/60">
              Charleston
            </div>
          </div>
        </div>

        {/* Seats */}
        <SeatBadge pos="bottom" label="DEALER" active />
        <SeatBadge pos="right" label="RIGHT" active={pass.to === "right" && animating} />
        <SeatBadge pos="top" label="ACROSS" active={pass.to === "top" && animating} />
        <SeatBadge pos="left" label="LEFT" active={pass.to === "left" && animating} />

        {/* 3 tiles moving together as a group */}
        <div
          className="absolute flex gap-[2px]"
          style={{
            left: `${animating ? to.x : from.x}%`,
            top: `${animating ? to.y : from.y}%`,
            transform: "translate(-50%, -50%)",
            transition: animating ? "all 0.9s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            zIndex: 15,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-5 w-3.5 rounded-[2px] border border-[#C9BC8A] bg-[#FAF7EC] shadow-sm"
              style={{ opacity: animating ? 1 : 0.7 }}
            />
          ))}
        </div>
      </div>

      {/* Clickable pass indicators */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {PASSES.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => jumpTo(i)}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-black transition hover:scale-110 ${
              i === activePass
                ? p.half === 1
                  ? "bg-[var(--color-mid)] text-white scale-110 shadow-md"
                  : "bg-[var(--color-red)] text-white scale-110 shadow-md"
                : i < activePass
                  ? "bg-zinc-200 text-zinc-500 hover:bg-zinc-300"
                  : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
            }`}
          >
            {p.shortLabel}
          </button>
        ))}
      </div>

      {/* Current pass label */}
      <p className="mt-2 text-center text-[12px] font-bold text-[var(--color-mid)]">
        Pass {pass.label}
        <span className="ml-1 text-[13px] font-normal text-zinc-500">
          ({pass.half === 1 ? "1st" : "2nd"} Charleston)
        </span>
      </p>
    </div>
  );
}

function SeatBadge({
  pos,
  label,
  active,
}: {
  pos: "bottom" | "right" | "top" | "left";
  label: string;
  active: boolean;
}) {
  const seat = SEATS[pos];
  const isYou = pos === "bottom";

  return (
    <div
      className={`absolute flex flex-col items-center justify-center rounded-lg border-2 px-2 py-1 text-center transition-all ${
        isYou
          ? "border-[#B03030] bg-[#FFF0F0]"
          : active
            ? "border-[var(--color-green)] bg-[#E8F5E9] scale-105"
            : "border-[var(--color-mid)] bg-[#FAF7EC]"
      }`}
      style={{
        left: `${seat.x}%`,
        top: `${seat.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 20,
        minWidth: 48,
      }}
    >
      <span
        className={`text-[13px] font-black uppercase tracking-wider ${
          isYou ? "text-[#B03030]" : active ? "text-[var(--color-green)]" : "text-[var(--color-mid)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
