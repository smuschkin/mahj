"use client";

import { useState } from "react";
import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { Callout } from "@/components/Callout";

type WinType = "discard" | "self-draw";

const COMMON_VALUES = [25, 30, 50, 75];

export default function ScoringCalculator() {
  const [handValue, setHandValue] = useState(25);
  const [customValue, setCustomValue] = useState("");
  const [winType, setWinType] = useState<WinType>("discard");
  const [jokerless, setJokerless] = useState(false);
  const [singlesAndPairs, setSinglesAndPairs] = useState(false);

  const baseValue = customValue ? parseInt(customValue, 10) || 0 : handValue;

  // Jokerless bonus: doubles everything UNLESS Singles & Pairs (already baked in)
  const jokerMultiplier = jokerless && !singlesAndPairs ? 2 : 1;

  let discarderPays = 0;
  let otherPays = 0;
  let totalCollected = 0;

  if (winType === "discard") {
    discarderPays = baseValue * 2 * jokerMultiplier;
    otherPays = baseValue * 1 * jokerMultiplier;
    totalCollected = discarderPays + otherPays * 2;
  } else {
    // Self-draw: all three pay double
    const perPlayer = baseValue * 2 * jokerMultiplier;
    discarderPays = 0;
    otherPays = perPlayer;
    totalCollected = perPlayer * 3;
  }

  const fmt = (cents: number) => {
    if (cents >= 100) return `$${(cents / 100).toFixed(2)}`;
    return `${cents}¢`;
  };

  return (
    <PageWrap>
      <Cover
        eyebrow="MAHJ Tool"
        title="Scoring"
        highlight="Calculator"
        subtitle="Pick the hand value and how you won. See who pays what."
      />

      <div className="rounded-xl border-2 border-[var(--color-border)] bg-white p-6 shadow-sm sm:p-8">
        {/* ── Hand value ── */}
        <fieldset className="mb-6">
          <legend className="mb-2 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
            Hand value
          </legend>
          <div className="flex flex-wrap gap-2">
            {COMMON_VALUES.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setHandValue(v);
                  setCustomValue("");
                }}
                className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold transition ${
                  !customValue && handValue === v
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                    : "border-zinc-300 bg-white text-zinc-600 hover:border-[var(--color-accent)]"
                }`}
              >
                {fmt(v)}
              </button>
            ))}
            <input
              type="number"
              placeholder="Other ¢"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="w-24 rounded-full border-2 border-zinc-300 px-3 py-1.5 text-center text-sm focus:border-[var(--color-accent)] focus:outline-none"
            />
          </div>
        </fieldset>

        {/* ── Win type ── */}
        <fieldset className="mb-6">
          <legend className="mb-2 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
            How did you win?
          </legend>
          <div className="flex gap-3">
            {(
              [
                { value: "discard" as const, label: "Won on a discard", icon: "🗣️" },
                { value: "self-draw" as const, label: "Self-drew from the wall", icon: "🎯" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setWinType(opt.value)}
                className={`flex-1 rounded-lg border-2 px-4 py-3 text-center text-sm font-bold transition ${
                  winType === opt.value
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                    : "border-zinc-300 bg-white text-zinc-600 hover:border-[var(--color-accent)]"
                }`}
              >
                <span className="mr-1">{opt.icon}</span> {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* ── Bonuses ── */}
        <fieldset className="mb-6">
          <legend className="mb-2 text-[13px] font-bold uppercase tracking-wider text-zinc-500">
            Bonuses
          </legend>
          <div className="space-y-2">
            <label className="flex items-center gap-3 rounded-lg border-2 border-zinc-200 px-4 py-3 transition hover:border-[var(--color-accent)]">
              <input
                type="checkbox"
                checked={jokerless}
                onChange={(e) => {
                  setJokerless(e.target.checked);
                  if (e.target.checked) setSinglesAndPairs(false);
                }}
                className="h-5 w-5 rounded accent-[var(--color-accent)]"
              />
              <div>
                <div className="text-sm font-bold text-[var(--color-mid)]">
                  Jokerless hand
                </div>
                <div className="text-[13px] text-zinc-500">
                  No jokers in the winning hand — all payments double
                </div>
              </div>
            </label>
            <label className="flex items-center gap-3 rounded-lg border-2 border-zinc-200 px-4 py-3 transition hover:border-[var(--color-accent)]">
              <input
                type="checkbox"
                checked={singlesAndPairs}
                onChange={(e) => {
                  setSinglesAndPairs(e.target.checked);
                  if (e.target.checked) setJokerless(false);
                }}
                className="h-5 w-5 rounded accent-[var(--color-accent)]"
              />
              <div>
                <div className="text-sm font-bold text-[var(--color-mid)]">
                  Singles &amp; Pairs hand
                </div>
                <div className="text-[13px] text-zinc-500">
                  Jokerless bonus already baked in — no extra doubling
                </div>
              </div>
            </label>
          </div>
        </fieldset>

        {/* ── Results ── */}
        <div className="rounded-xl border-2 border-[var(--color-accent)] bg-[#E8F5EC] p-5">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
            Payout breakdown
          </p>

          {winType === "discard" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <PayoutCard
                who="Discarder"
                amount={fmt(discarderPays)}
                note="2× value"
                highlight
              />
              <PayoutCard
                who="Other player"
                amount={fmt(otherPays)}
                note="1× value"
              />
              <PayoutCard
                who="Other player"
                amount={fmt(otherPays)}
                note="1× value"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <PayoutCard
                who="Player A"
                amount={fmt(otherPays)}
                note="2× value"
                highlight
              />
              <PayoutCard
                who="Player B"
                amount={fmt(otherPays)}
                note="2× value"
                highlight
              />
              <PayoutCard
                who="Player C"
                amount={fmt(otherPays)}
                note="2× value"
                highlight
              />
            </div>
          )}

          {jokerless && !singlesAndPairs && (
            <p className="mt-2 text-center text-[13px] font-bold text-[var(--color-green)]">
              Jokerless bonus applied — all amounts ×2
            </p>
          )}

          <div className="mt-4 rounded-lg bg-white p-3 text-center">
            <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
              Winner collects
            </div>
            <div className="font-serif text-3xl font-black text-[var(--color-accent)]">
              {fmt(totalCollected)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a href="/" className="text-sm font-bold text-[var(--color-accent)] hover:underline">
          ← Back to Home
        </a>
      </div>

    </PageWrap>
  );
}

function PayoutCard({
  who,
  amount,
  note,
  highlight,
}: {
  who: string;
  amount: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border-2 p-3 text-center ${
        highlight
          ? "border-[var(--color-red)] bg-[#FFF6F4]"
          : "border-[var(--color-mid)] bg-white"
      }`}
    >
      <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
        {who}
      </div>
      <div
        className={`font-serif text-xl font-black ${
          highlight ? "text-[var(--color-red)]" : "text-[var(--color-mid)]"
        }`}
      >
        {amount}
      </div>
      <div className="text-[13px] italic text-zinc-400">{note}</div>
    </div>
  );
}

