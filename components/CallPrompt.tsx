"use client";

import { useEffect, useRef, useState } from "react";
import { TileData, tileLabel } from "@/lib/tiles";
import { CallType } from "@/lib/calling";
import { Tile } from "@/components/Tile";

type CallPromptProps = {
  discardedTile: TileData;
  discardedBy: string;
  validCalls: CallType[];
  onCall: (callType: CallType) => void;
  onPass: () => void;
  timeoutMs?: number;
};

export function CallPrompt({
  discardedTile,
  discardedBy,
  validCalls,
  onCall,
  onPass,
  timeoutMs = 8000,
}: CallPromptProps) {
  const [remaining, setRemaining] = useState(timeoutMs);
  const onPassRef = useRef(onPass);
  const actedRef = useRef(false);
  useEffect(() => { onPassRef.current = onPass; });

  useEffect(() => {
    actedRef.current = false;
    setRemaining(timeoutMs);

    const interval = setInterval(() => {
      setRemaining((r) => {
        if (r <= 100) {
          clearInterval(interval);
          if (!actedRef.current) {
            actedRef.current = true;
            onPassRef.current();
          }
          return 0;
        }
        return r - 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [timeoutMs, discardedTile.id]);

  const pct = (remaining / timeoutMs) * 100;

  function handleCall(ct: CallType) {
    if (actedRef.current) return;
    actedRef.current = true;
    onCall(ct);
  }

  function handlePass() {
    if (actedRef.current) return;
    actedRef.current = true;
    onPass();
  }

  return (
    <div className="animate-fade-in rounded-2xl border-2 border-[#C8A951] bg-gradient-to-b from-[#1A4D2E] to-[#0F3320] p-5 shadow-xl">
      {/* Timer bar */}
      <div className="mb-4 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#C8A951] transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mb-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#C8A951]">
          Call Opportunity
        </p>
        <p className="mt-1 text-[12px] text-emerald-200/60">
          {discardedBy} discarded {tileLabel(discardedTile)}
        </p>
      </div>

      {/* Show the tile */}
      <div className="mb-4 flex justify-center">
        <div className="rounded-lg bg-white/10 p-2">
          <Tile
            type={discardedTile.type}
            value={discardedTile.value}
            size="md"
            highlighted
          />
        </div>
      </div>

      {/* Call buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {validCalls.includes("mahjong") && (
          <button
            type="button"
            onClick={() => handleCall("mahjong")}
            className="rounded-xl bg-[#C8A951] px-5 py-2.5 text-sm font-black text-[#0F3320] shadow-lg transition hover:bg-[#B89840] active:scale-[0.98]"
          >
            Mahjong!
          </button>
        )}
        {validCalls.includes("quint") && (
          <button
            type="button"
            onClick={() => handleCall("quint")}
            className="rounded-xl bg-[#2D8B5E] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#247A50] active:scale-[0.98]"
          >
            Quint
          </button>
        )}
        {validCalls.includes("kong") && (
          <button
            type="button"
            onClick={() => handleCall("kong")}
            className="rounded-xl bg-[#2D8B5E] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#247A50] active:scale-[0.98]"
          >
            Kong
          </button>
        )}
        {validCalls.includes("pung") && (
          <button
            type="button"
            onClick={() => handleCall("pung")}
            className="rounded-xl bg-[#2D8B5E] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#247A50] active:scale-[0.98]"
          >
            Pung
          </button>
        )}
        <button
          type="button"
          onClick={handlePass}
          className="rounded-xl border-2 border-white/30 px-5 py-2.5 text-sm font-bold text-white/70 transition hover:bg-white/10 active:scale-[0.98]"
        >
          Pass
        </button>
      </div>

      {/* Coaching hint */}
      <p className="mt-3 text-center text-[11px] text-emerald-200/50">
        {validCalls.includes("mahjong")
          ? "This tile completes a winning pattern!"
          : validCalls.includes("quint")
            ? "You have 4 matching tiles — call Quint to lock all 5!"
            : validCalls.includes("kong")
              ? "You have 3 matching tiles — call Kong to lock all 4."
              : "You have 2 matching tiles — call Pung to lock a group of 3."}
      </p>
    </div>
  );
}
