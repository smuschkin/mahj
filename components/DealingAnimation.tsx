"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Animated dealing with 4 walls + racks around the table.
 * Walls deplete as tiles are dealt. When a wall runs out,
 * the next wall (clockwise) pushes out and dealing continues.
 */

type Seat = "East" | "South" | "West" | "North";

const SEATS: Seat[] = ["East", "South", "West", "North"];
const SEAT_LABELS: Record<Seat, string> = {
  East: "Dealer",
  South: "Right",
  West: "Across",
  North: "Left",
};
const SEAT_COLORS: Record<Seat, string> = {
  East: "#2D8B5E",
  South: "#27AE60",
  West: "#E67E22",
  North: "#8E44AD",
};

type DealStep = { seat: Seat; count: number; label: string };

const DEAL_STEPS: DealStep[] = [
  { seat: "East", count: 4, label: "Round 1" },
  { seat: "South", count: 4, label: "Round 1" },
  { seat: "West", count: 4, label: "Round 1" },
  { seat: "North", count: 4, label: "Round 1" },
  { seat: "East", count: 4, label: "Round 2" },
  { seat: "South", count: 4, label: "Round 2" },
  { seat: "West", count: 4, label: "Round 2" },
  { seat: "North", count: 4, label: "Round 2" },
  { seat: "East", count: 4, label: "Round 3" },
  { seat: "South", count: 4, label: "Round 3" },
  { seat: "West", count: 4, label: "Round 3" },
  { seat: "North", count: 4, label: "Round 3" },
  { seat: "East", count: 1, label: "1st & 3rd — Stack 1 top → Dealer" },
  { seat: "East", count: 1, label: "1st & 3rd — Stack 3 top → Dealer (leapfrog!)" },
  { seat: "South", count: 1, label: "1st & 3rd — Stack 1 bottom → Right" },
  { seat: "West", count: 1, label: "1st & 3rd — Stack 2 top → Across" },
  { seat: "North", count: 1, label: "1st & 3rd — Stack 2 bottom → Left" },
];

/* Each wall has 19 stacks of 2 = 38 tiles. Total: 4 × 38 = 152.
   We deal from East's wall first (clockwise consumption: East → North → West → South). */
const STACKS_PER_WALL = 19;
const TILES_PER_WALL = 38;

/* Wall order (clockwise from East) for consumption */
const WALL_ORDER: Seat[] = ["East", "North", "West", "South"];

export function DealingAnimation() {
  const [stepIndex, setStepIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<"slow" | "fast">("slow");
  const [flyingStep, setFlyingStep] = useState<number | null>(null);
  const [flyPhase, setFlyPhase] = useState<"at-center" | "in-flight">("at-center");
  const advancing = useRef(false);

  const totalSteps = DEAL_STEPS.length;
  const isFinished = stepIndex >= totalSteps;

  // Count landed tiles per seat
  const counts: Record<Seat, number> = { East: 0, South: 0, West: 0, North: 0 };
  for (let i = 0; i < Math.min(stepIndex, totalSteps); i++) {
    if (i === flyingStep) continue;
    counts[DEAL_STEPS[i].seat] += DEAL_STEPS[i].count;
  }
  const tilesDealt = Object.values(counts).reduce((a, b) => a + b, 0);

  // Figure out how many tiles taken from each wall
  let remaining = tilesDealt;
  const wallUsed: Record<Seat, number> = { East: 0, North: 0, West: 0, South: 0 };
  for (const w of WALL_ORDER) {
    const take = Math.min(remaining, TILES_PER_WALL);
    wallUsed[w] = take;
    remaining -= take;
    if (remaining <= 0) break;
  }

  // Which wall is currently active (being dealt from)?
  let activeWall: Seat = "East";
  let usedSoFar = 0;
  for (const w of WALL_ORDER) {
    if (usedSoFar + TILES_PER_WALL > tilesDealt) {
      activeWall = w;
      break;
    }
    usedSoFar += TILES_PER_WALL;
  }

  // Stacks remaining per wall (each stack = 2 tiles)
  const wallStacks: Record<Seat, number> = {
    East: Math.max(0, Math.ceil((TILES_PER_WALL - wallUsed.East) / 2)),
    North: Math.max(0, Math.ceil((TILES_PER_WALL - wallUsed.North) / 2)),
    West: Math.max(0, Math.ceil((TILES_PER_WALL - wallUsed.West) / 2)),
    South: Math.max(0, Math.ceil((TILES_PER_WALL - wallUsed.South) / 2)),
  };

  // Is a wall "pushed out" (active or partially used)?
  const wallActive: Record<Seat, boolean> = {
    East: true, // always pushed out (dealer's wall)
    North: wallUsed.North > 0 || activeWall === "North",
    West: wallUsed.West > 0 || activeWall === "West",
    South: wallUsed.South > 0 || activeWall === "South",
  };

  function advance() {
    if (advancing.current) return;
    advancing.current = true;
    const next = stepIndex + 1;
    if (next >= totalSteps) {
      setStepIndex(totalSteps);
      setPlaying(false);
      setFlyingStep(null);
      advancing.current = false;
      return;
    }
    setStepIndex(next);
    setFlyingStep(next);
    setFlyPhase("at-center");
    requestAnimationFrame(() => setFlyPhase("in-flight"));
    const landMs = speed === "slow" ? 550 : 250;
    setTimeout(() => {
      setFlyingStep(null);
      setFlyPhase("at-center");
      advancing.current = false;
    }, landMs);
  }

  useEffect(() => {
    if (!playing || isFinished) return;
    const ms = speed === "slow" ? 950 : 420;
    const t = setTimeout(() => advance(), ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, stepIndex, speed, isFinished, flyingStep]);

  function reset() {
    setStepIndex(-1);
    setPlaying(false);
    setFlyingStep(null);
    advancing.current = false;
  }

  function play() {
    if (isFinished) {
      reset();
      setTimeout(() => { setPlaying(true); advance(); }, 60);
      return;
    }
    if (stepIndex === -1) { setPlaying(true); advance(); }
    else setPlaying(true);
  }

  const cur = stepIndex >= 0 && stepIndex < totalSteps ? DEAL_STEPS[stepIndex] : null;
  const dur = speed === "slow" ? "0.5s" : "0.2s";

  // Flying tile target
  const flyStep = flyingStep !== null ? DEAL_STEPS[flyingStep] : null;

  // SVG layout constants
  const W = 360;
  const H = 360;
  const CX = W / 2;
  const CY = H / 2;
  const WALL_LEN = 140; // wall length in pixels
  const WALL_DIST = 90; // distance from center to wall
  const RACK_DIST = 120; // distance from center to rack
  const TW = 7; // tile width in wall
  const TH = 10; // tile height in wall

  // Seat label positions (beyond the racks)
  const labelPos: Record<Seat, { x: number; y: number }> = {
    East: { x: CX, y: CY + RACK_DIST + 28 },
    North: { x: CX - RACK_DIST - 28, y: CY },
    West: { x: CX, y: CY - RACK_DIST - 28 },
    South: { x: CX + RACK_DIST + 28, y: CY },
  };

  return (
    <div className="my-3 rounded-xl border-2 border-[var(--color-border)] bg-white p-3 sm:p-5 shadow-sm">
      <p className="mb-1 text-center text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
        Dealing Flow
      </p>
      <p className="mb-3 text-center text-[13px] italic text-zinc-500">
        Walls deplete as tiles are dealt — watch the next wall push out
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-[340px]">
        {/* Felt background */}
        <rect x={CX - 100} y={CY - 100} width={200} height={200} rx={12} fill="#1A4D2E" opacity={0.08} />

        {/* ─── 4 Walls + Racks ─── */}
        {SEATS.map((seat) => {
          const stacks = wallStacks[seat];
          const pushed = wallActive[seat];
          const isActive = activeWall === seat && !isFinished;
          const col = SEAT_COLORS[seat];

          // Rotation for each seat: East=0 (bottom), North=90 (left), West=180 (top), South=270 (right)
          const rot = seat === "East" ? 0 : seat === "North" ? 90 : seat === "West" ? 180 : 270;

          return (
            <g key={seat} transform={`rotate(${rot} ${CX} ${CY})`}>
              {/* Rack — brown bar behind the wall */}
              <rect
                x={CX - WALL_LEN / 2 - 4}
                y={CY + RACK_DIST - 3}
                width={WALL_LEN + 8}
                height={7}
                rx={2}
                fill="#8B5A2B"
                stroke="#5C3A1A"
                strokeWidth={0.5}
              />

              {/* Wall — row of stacks, pushed out diagonally if active */}
              {/* Left end stays near rack, right end swings toward center */}
              <g
                style={{
                  transition: "transform 0.5s ease-out",
                  transformOrigin: `${CX - WALL_LEN / 2}px ${CY + WALL_DIST + TH / 2}px`,
                  transform: pushed
                    ? `rotate(${isActive ? -15 : -10}deg)`
                    : "rotate(0deg)",
                }}
              >
                {Array.from({ length: STACKS_PER_WALL }).map((_, i) => {
                  const visible = i < stacks;
                  if (!visible) return null;
                  const tx = CX - WALL_LEN / 2 + i * (WALL_LEN / STACKS_PER_WALL);
                  const ty = CY + WALL_DIST;
                  return (
                    <g key={i}>
                      {/* Bottom tile */}
                      <rect
                        x={tx}
                        y={ty + 2}
                        width={TW}
                        height={TH}
                        rx={1}
                        fill="#EDE8D0"
                        stroke={isActive ? col : "#C9BC8A"}
                        strokeWidth={isActive ? 0.8 : 0.5}
                      />
                      {/* Top tile */}
                      <rect
                        x={tx}
                        y={ty - 1}
                        width={TW}
                        height={TH}
                        rx={1}
                        fill="#FAF7EC"
                        stroke={isActive ? col : "#C9BC8A"}
                        strokeWidth={isActive ? 0.8 : 0.5}
                      />
                    </g>
                  );
                })}
              </g>

              {/* "Pushed out" indicator — positioned below the wall */}
              {pushed && isActive && stacks > 0 && (
                <text
                  x={CX}
                  y={CY + WALL_DIST + TH + 14}
                  textAnchor="middle"
                  fontSize="7"
                  fill={col}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  transform={`rotate(${-rot} ${CX} ${CY + WALL_DIST + TH + 14})`}
                >
                  ↑ dealing from here
                </text>
              )}
            </g>
          );
        })}

        {/* ─── Seat labels + tile counts + mini tiles ─── */}
        {SEATS.map((seat) => {
          const pos = labelPos[seat];
          const col = SEAT_COLORS[seat];
          const active = cur?.seat === seat && flyingStep !== null;
          const tileCount = counts[seat];
          // Show mini tiles in rows of 7
          const miniTileW = 4;
          const miniTileH = 5.5;
          const miniGap = 1;
          const tilesPerRow = 7;
          const rows = Math.ceil(tileCount / tilesPerRow);
          const boxW = Math.max(56, tilesPerRow * (miniTileW + miniGap) + 8);
          const boxH = 32 + rows * (miniTileH + 1.5);

          return (
            <g key={`label-${seat}`}>
              <rect
                x={pos.x - boxW / 2}
                y={pos.y - 16}
                width={boxW}
                height={boxH}
                rx={6}
                fill={active ? `${col}18` : "white"}
                stroke={active ? col : "#e4e4e7"}
                strokeWidth={active ? 2 : 1}
              />
              <text x={pos.x} y={pos.y - 4} textAnchor="middle" fontSize="7" fontWeight="bold" fill={col} fontFamily="sans-serif">
                {SEAT_LABELS[seat]}
              </text>
              <text x={pos.x} y={pos.y + 11} textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155" fontFamily="serif">
                {tileCount}
              </text>
              {/* Mini tile grid */}
              {Array.from({ length: tileCount }).map((_, ti) => {
                const row = Math.floor(ti / tilesPerRow);
                const colIdx = ti % tilesPerRow;
                const rowTiles = Math.min(tilesPerRow, tileCount - row * tilesPerRow);
                const rowW = rowTiles * (miniTileW + miniGap) - miniGap;
                const startX = pos.x - rowW / 2;
                return (
                  <rect
                    key={ti}
                    x={startX + colIdx * (miniTileW + miniGap)}
                    y={pos.y + 16 + row * (miniTileH + 1.5)}
                    width={miniTileW}
                    height={miniTileH}
                    rx={0.5}
                    fill="#FAF7EC"
                    stroke={col}
                    strokeWidth={0.5}
                  />
                );
              })}
            </g>
          );
        })}

        {/* ─── Center: wall count OR 1st-and-3rd stacks ─── */}
        {stepIndex >= 12 && !isFinished ? (
          /* Show 3 stacks in the center during the final round */
          (() => {
            // stepIndex 12=tile1, 13=tile2, 14=tile3, 15=tile4, 16=tile5
            const stacks = [
              {
                topNum: "1", topWho: "D", topColor: SEAT_COLORS.East,
                topTaken: stepIndex > 12, topActive: stepIndex === 12,
                botNum: "3", botWho: "R", botColor: SEAT_COLORS.South,
                botTaken: stepIndex > 14, botActive: stepIndex === 14,
              },
              {
                topNum: "4", topWho: "A", topColor: SEAT_COLORS.West,
                topTaken: stepIndex > 15, topActive: stepIndex === 15,
                botNum: "5", botWho: "L", botColor: SEAT_COLORS.North,
                botTaken: stepIndex > 16, botActive: stepIndex === 16,
              },
              {
                topNum: "2", topWho: "D", topColor: SEAT_COLORS.East,
                topTaken: stepIndex > 13, topActive: stepIndex === 13,
                botNum: "", botWho: "", botColor: "#a1a1aa",
                botTaken: false, botActive: false,
              },
            ];
            const sw = 16; // stack tile width
            const sh = 14; // stack tile height
            const gap = 8;
            const totalW = 3 * sw + 2 * gap;
            const startX = CX - totalW / 2;
            const startY = CY - sh - 1;

            return (
              <g>
                <text x={CX} y={startY - 6} textAnchor="middle" fontSize="6" fontWeight="bold" fill="#71717a" fontFamily="sans-serif">
                  1st &amp; 3rd PICK
                </text>
                {stacks.map((s, si) => {
                  const sx = startX + si * (sw + gap);
                  return (
                    <g key={si}>
                      {/* Top tile — glow if active */}
                      {s.topActive && (
                        <rect
                          x={sx - 2} y={startY - 2}
                          width={sw + 4} height={sh + 4} rx={3}
                          fill="none" stroke={s.topColor} strokeWidth={2.5}
                          opacity={0.6}
                        />
                      )}
                      <rect
                        x={sx} y={startY}
                        width={sw} height={sh} rx={2}
                        fill={s.topActive ? s.topColor : s.topTaken ? s.topColor : "#FAF7EC"}
                        stroke={s.topActive ? s.topColor : s.topTaken ? s.topColor : "#C9BC8A"}
                        strokeWidth={s.topActive ? 2 : s.topTaken ? 1.5 : 0.8}
                        opacity={s.topTaken ? 0.25 : 1}
                      />
                      <text x={sx + sw / 2} y={startY + 7} textAnchor="middle" fontSize="7" fontWeight="900" fill={s.topActive || s.topTaken ? "white" : "#2C3E50"} fontFamily="serif">
                        {s.topNum}
                      </text>
                      <text x={sx + sw / 2} y={startY + 12} textAnchor="middle" fontSize="4" fontWeight="bold" fill={s.topActive || s.topTaken ? "white" : "#71717a"} fontFamily="sans-serif">
                        {s.topWho}
                      </text>
                      {/* Bottom tile — glow if active */}
                      {s.botActive && (
                        <rect
                          x={sx - 2} y={startY + sh - 1}
                          width={sw + 4} height={sh + 4} rx={3}
                          fill="none" stroke={s.botColor} strokeWidth={2.5}
                          opacity={0.6}
                        />
                      )}
                      <rect
                        x={sx} y={startY + sh + 1}
                        width={sw} height={sh} rx={2}
                        fill={s.botActive ? s.botColor : s.botTaken ? s.botColor : s.botWho === "" ? "#e4e4e7" : "#FAF7EC"}
                        stroke={s.botActive ? s.botColor : s.botTaken ? s.botColor : s.botWho === "" ? "#d4d4d8" : "#C9BC8A"}
                        strokeWidth={s.botActive ? 2 : s.botTaken ? 1.5 : 0.8}
                        opacity={s.botTaken ? 0.25 : 1}
                      />
                      {s.botNum && (
                        <>
                          <text x={sx + sw / 2} y={startY + sh + 8} textAnchor="middle" fontSize="7" fontWeight="900" fill={s.botTaken ? "white" : "#2C3E50"} fontFamily="serif">
                            {s.botNum}
                          </text>
                          <text x={sx + sw / 2} y={startY + sh + 13} textAnchor="middle" fontSize="4" fontWeight="bold" fill={s.botTaken ? "white" : "#71717a"} fontFamily="sans-serif">
                            {s.botWho}
                          </text>
                        </>
                      )}
                      {/* Stack label */}
                      <text x={sx + sw / 2} y={startY + 2 * sh + 10} textAnchor="middle" fontSize="5" fill="#a1a1aa" fontFamily="sans-serif">
                        {si + 1}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })()
        ) : (
          /* Normal: show wall tile count */
          <>
            <text x={CX} y={CY - 3} textAnchor="middle" fontSize="8" fill="#71717a" fontFamily="sans-serif" fontWeight="bold">
              WALL
            </text>
            <text x={CX} y={CY + 11} textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155" fontFamily="serif">
              {Math.max(0, 152 - tilesDealt)}
            </text>
          </>
        )}

        {/* ─── Flying tiles ─── */}
        {flyStep && (() => {
          // Fly from the active wall toward the target seat label
          const targetPos = labelPos[flyStep.seat];
          const wallCenter = wallCenterPos(activeWall, CX, CY, WALL_DIST);
          const dx = flyPhase === "in-flight" ? targetPos.x - wallCenter.x : 0;
          const dy = flyPhase === "in-flight" ? targetPos.y - wallCenter.y : 0;
          const col = SEAT_COLORS[flyStep.seat];

          return (
            <g style={{ transition: `transform ${dur} ease-out`, transform: `translate(${dx}px, ${dy}px)` }}>
              {flyStep.count === 4 ? (
                // 2×2 block
                <>
                  <rect x={wallCenter.x - 8} y={wallCenter.y - 6 + 2} width={7} height={10} rx={1} fill="#EDE8D0" stroke={col} strokeWidth={0.8} />
                  <rect x={wallCenter.x - 8} y={wallCenter.y - 6 - 1} width={7} height={10} rx={1} fill="white" stroke={col} strokeWidth={1} />
                  <rect x={wallCenter.x} y={wallCenter.y - 6 + 2} width={7} height={10} rx={1} fill="#EDE8D0" stroke={col} strokeWidth={0.8} />
                  <rect x={wallCenter.x} y={wallCenter.y - 6 - 1} width={7} height={10} rx={1} fill="white" stroke={col} strokeWidth={1} />
                </>
              ) : (
                <rect x={wallCenter.x - 4} y={wallCenter.y - 5} width={7} height={10} rx={1} fill="white" stroke={col} strokeWidth={1.2} />
              )}
            </g>
          );
        })()}
      </svg>

      {/* Status */}
      <div className="mt-1 min-h-[48px] text-center">
        {cur && !isFinished && (
          <div>
            <p className="text-[12px] font-bold" style={{ color: SEAT_COLORS[cur.seat] }}>
              {cur.label}
            </p>
            {wallUsed[activeWall] > 0 && wallUsed[activeWall] < TILES_PER_WALL && (
              <p className="text-[13px] text-zinc-400">
                Dealing from {SEAT_LABELS[activeWall]}&apos;s wall ({TILES_PER_WALL - wallUsed[activeWall]} tiles left)
              </p>
            )}
            {tilesDealt > 0 && tilesDealt % TILES_PER_WALL === 0 && tilesDealt < 152 && (
              <p className="text-[13px] font-bold text-[var(--color-accent)]">
                Wall empty — next wall pushes out!
              </p>
            )}
          </div>
        )}
        {isFinished && (
          <p className="text-[13px] font-bold text-[var(--color-green)]">
            Done! Dealer has 14, everyone else has 13.
          </p>
        )}
        {stepIndex === -1 && (
          <p className="text-[12px] text-zinc-400">Press play to watch the deal</p>
        )}
      </div>


      {/* Controls */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {!playing ? (
          <button type="button" onClick={play} className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5">
            {isFinished ? "Replay" : stepIndex === -1 ? "Play" : "Resume"}
          </button>
        ) : (
          <button type="button" onClick={() => setPlaying(false)} className="rounded-md border-2 border-[var(--color-accent)] bg-white px-4 py-2 text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] transition hover:-translate-y-0.5">
            Pause
          </button>
        )}
        {!playing && stepIndex >= 0 && !isFinished && (
          <button type="button" onClick={() => advance()} className="rounded-md border-2 border-[var(--color-mid)] bg-white px-3 py-2 text-sm font-bold uppercase tracking-wider text-[var(--color-mid)] transition hover:-translate-y-0.5">
            Step →
          </button>
        )}
        <button type="button" onClick={reset} className="rounded-md border-2 border-zinc-300 bg-white px-3 py-2 text-sm font-bold uppercase tracking-wider text-zinc-400 transition hover:-translate-y-0.5">
          Reset
        </button>
        <button type="button" onClick={() => setSpeed((s) => (s === "slow" ? "fast" : "slow"))} className="rounded-md border-2 border-zinc-300 bg-white px-3 py-2 text-[13px] font-bold uppercase tracking-wider text-zinc-500 transition hover:-translate-y-0.5">
          {speed === "slow" ? "Fast" : "Slow"}
        </button>
      </div>
    </div>
  );
}

/** Get the center position of a wall for flying tile origin */
function wallCenterPos(seat: Seat, cx: number, cy: number, dist: number) {
  switch (seat) {
    case "East": return { x: cx, y: cy + dist };
    case "North": return { x: cx - dist, y: cy };
    case "West": return { x: cx, y: cy - dist };
    case "South": return { x: cx + dist, y: cy };
  }
}
