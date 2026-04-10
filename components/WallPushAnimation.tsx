"use client";

import { useState, useEffect } from "react";

/**
 * Animated diagram showing a player pushing their wall out toward the
 * center of the table. The left end stays as a pivot while the right
 * end swings forward diagonally. Loops automatically.
 */
export function WallPushAnimation() {
  const [phase, setPhase] = useState<"waiting" | "pushing" | "pushed" | "resetting">("waiting");
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "waiting") {
      t = setTimeout(() => setPhase("pushing"), 800);
    } else if (phase === "pushing") {
      t = setTimeout(() => setPhase("pushed"), 600);
    } else if (phase === "pushed") {
      t = setTimeout(() => setPhase("resetting"), 1500);
    } else if (phase === "resetting") {
      t = setTimeout(() => setPhase("waiting"), 500);
    }
    return () => clearTimeout(t);
  }, [phase, auto]);

  function play() {
    setPhase("pushing");
    setAuto(true);
  }

  function stop() {
    setAuto(false);
    setPhase("waiting");
  }

  // Wall rotation angle
  const angle =
    phase === "pushing" || phase === "pushed" ? -20 : 0;

  // Wall color
  const wallFill =
    phase === "pushing" || phase === "pushed" ? "#D0E8D6" : "#FAF7EC";
  const wallStroke =
    phase === "pushing" || phase === "pushed" ? "#5A9E72" : "#C9BC8A";

  // Hand position — follows the right end of the wall
  const handX = phase === "pushing" || phase === "pushed" ? 168 : 190;
  const handY = phase === "pushing" || phase === "pushed" ? 24 : 48;

  return (
    <div className="my-6 rounded-xl border-2 border-[var(--color-border)] bg-white p-4 sm:p-5 shadow-sm">
      <p className="mb-1 text-center text-[11px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
        Pushing Your Wall Out
      </p>
      <p className="mb-3 text-center text-[10px] italic text-zinc-500">
        When the current wall runs out, push yours toward the center
      </p>

      <svg viewBox="0 0 220 130" className="mx-auto w-full max-w-[360px]">
        {/* Table center indicator */}
        <rect x={10} y={0} width={200} height={30} rx={4} fill="#1A4D2E" opacity={0.08} />
        <text x={110} y={19} textAnchor="middle" fontSize="9" fill="#1A4D2E" fontFamily="sans-serif" fontStyle="italic">
          center of table
        </text>

        {/* Wall — rotates around left pivot */}
        <g
          style={{
            transition: "transform 0.6s ease-in-out",
            transformOrigin: "20px 60px",
            transform: `rotate(${angle}deg)`,
          }}
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={i}>
              {/* Bottom tile */}
              <rect
                x={16 + i * 13}
                y={48}
                width={11}
                height={16}
                rx={1.5}
                fill={i < 12 ? wallFill : "#FAF7EC"}
                stroke={i < 12 ? wallStroke : "#C9BC8A"}
                strokeWidth={i < 12 ? 1 : 0.6}
              />
              {/* Top tile */}
              <rect
                x={16 + i * 13}
                y={45}
                width={11}
                height={16}
                rx={1.5}
                fill={i < 12 ? wallFill : "#FAF7EC"}
                stroke={i < 12 ? wallStroke : "#C9BC8A"}
                strokeWidth={i < 12 ? 1 : 0.6}
              />
            </g>
          ))}
        </g>

        {/* Pivot dot at left end */}
        <circle
          cx={20}
          cy={58}
          r={3}
          fill="#5A9E72"
          style={{
            opacity: phase === "pushing" || phase === "pushed" ? 1 : 0.3,
            transition: "opacity 0.3s",
          }}
        />

        {/* Hand emoji pushing the right side */}
        <text
          fontSize="22"
          style={{
            transition: "all 0.6s ease-in-out",
            transform: `translate(${handX}px, ${handY}px)`,
          }}
          x={0}
          y={0}
        >
          🤚
        </text>

        {/* Rack — stays put */}
        <rect x={14} y={68} width={190} height={6} rx={2} fill="#8B5A2B" stroke="#5C3A1A" strokeWidth={0.5} />
        <text x={110} y={88} textAnchor="middle" fontSize="8" fill="#71717a" fontFamily="sans-serif">
          your rack (stays put)
        </text>

        {/* Arrow showing push direction */}
        {(phase === "pushing" || phase === "pushed") && (
          <g opacity={0.6}>
            <line x1={175} y1={55} x2={170} y2={30} stroke="#5A9E72" strokeWidth={1.5} markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#5A9E72" />
              </marker>
            </defs>
          </g>
        )}

        {/* Labels */}
        <text x={16} y={42} fontSize="7" fontWeight="bold" fill="#5A9E72" fontFamily="sans-serif">
          L (pivot)
        </text>
        <text
          x={192}
          y={42}
          fontSize="7"
          fontWeight="bold"
          fill="#5A9E72"
          fontFamily="sans-serif"
          style={{
            transition: "all 0.6s ease-in-out",
            opacity: phase === "waiting" || phase === "resetting" ? 1 : 0,
          }}
        >
          R
        </text>

        {/* Status text */}
        <text x={110} y={108} textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="sans-serif"
          fill={phase === "pushed" ? "#27AE60" : phase === "pushing" ? "#5A9E72" : "#71717a"}
        >
          {phase === "waiting" || phase === "resetting"
            ? "Wall sitting against your rack"
            : phase === "pushing"
              ? "Pushing out..."
              : "Ready to deal from!"}
        </text>
      </svg>

      {/* Controls */}
      <div className="mt-2 flex items-center justify-center gap-2">
        {!auto ? (
          <button
            type="button"
            onClick={play}
            className="rounded-md bg-[var(--color-accent)] px-5 py-2 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
          >
            Push it out
          </button>
        ) : (
          <button
            type="button"
            onClick={stop}
            className="rounded-md border-2 border-zinc-300 bg-white px-5 py-2 text-sm font-bold uppercase tracking-wider text-zinc-500 transition hover:-translate-y-0.5"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
