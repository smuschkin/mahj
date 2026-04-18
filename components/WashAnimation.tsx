"use client";

import { useEffect, useRef, useState } from "react";

const CX = 160;
const CY = 120;
const TILE_COUNT = 40;

type TileState = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  angle: number;
  radius: number;
  scale: number;
};

function randomTiles(): TileState[] {
  return Array.from({ length: TILE_COUNT }, (_, i) => ({
    id: i,
    x: CX,
    y: CY,
    rotation: Math.random() * 360,
    speed: 0.15 + Math.random() * 0.4,
    angle: Math.random() * Math.PI * 2,
    radius: 15 + Math.random() * 55,
    scale: 0.85 + Math.random() * 0.3,
  }));
}

export function WashAnimation() {
  const [tiles, setTiles] = useState<TileState[]>([]);
  const [washing, setWashing] = useState(true);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [t, setT] = useState(0);

  useEffect(() => {
    setTiles(randomTiles());
  }, []);

  useEffect(() => {
    if (!washing) return;
    let lastTime = performance.now();

    function animate(now: number) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      timeRef.current += dt;
      setT(timeRef.current);

      setTiles((prev) =>
        prev.map((tile) => {
          const time = timeRef.current;
          const newAngle = tile.angle + tile.speed * dt;
          const wx = Math.sin(time * 1.2 + tile.id * 0.9) * 6;
          const wy = Math.cos(time * 0.9 + tile.id * 1.3) * 4;
          return {
            ...tile,
            angle: newAngle,
            x: CX + Math.cos(newAngle) * tile.radius + wx,
            y: CY + Math.sin(newAngle) * tile.radius * 0.65 + wy,
            rotation: tile.rotation + tile.speed * 30 * dt,
          };
        }),
      );

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [washing]);

  // 2 hands — your left and right, reaching from the bottom
  // Each follows a loose wandering path (combination of sine waves at different frequencies)
  const leftHandX = CX - 30 + Math.sin(t * 0.7) * 25 + Math.sin(t * 0.3) * 10;
  const leftHandY = CY + 10 + Math.cos(t * 0.5) * 20 + Math.sin(t * 0.8) * 8;
  const leftAngle = Math.sin(t * 0.6) * 25 - 10;

  const rightHandX = CX + 30 + Math.cos(t * 0.6) * 25 + Math.sin(t * 0.4) * 12;
  const rightHandY = CY - 5 + Math.sin(t * 0.45) * 22 + Math.cos(t * 0.7) * 6;
  const rightAngle = Math.cos(t * 0.55) * 25 + 10;

  return (
    <div className="my-4 rounded-xl border-2 border-[var(--color-border)] bg-white p-4">
      <div className="mb-2 flex items-center justify-end">
        <button
          type="button"
          onClick={() => setWashing((w) => !w)}
          className="rounded px-2 py-0.5 text-[13px] font-bold uppercase tracking-wider text-zinc-500 transition hover:bg-zinc-100"
        >
          {washing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      <div className="relative mx-auto" style={{ maxWidth: 340 }}>
        <svg viewBox="0 0 320 240" className="w-full">
          <defs>
            <radialGradient id="feltGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1A6B35" />
              <stop offset="70%" stopColor="#0E4F26" />
              <stop offset="100%" stopColor="#0A3A1B" />
            </radialGradient>
          </defs>

          {/* Table felt */}
          <rect x={0} y={0} width={320} height={240} rx={12} fill="url(#feltGrad)" />

          {/* 4 Racks */}
          <rect x={90} y={225} width={140} height={10} rx={2} fill="#8B5A2B" stroke="#5C3A1A" strokeWidth="0.5" />
          <rect x={90} y={5} width={140} height={10} rx={2} fill="#8B5A2B" stroke="#5C3A1A" strokeWidth="0.5" />
          <rect x={5} y={55} width={10} height={130} rx={2} fill="#8B5A2B" stroke="#5C3A1A" strokeWidth="0.5" />
          <rect x={305} y={55} width={10} height={130} rx={2} fill="#8B5A2B" stroke="#5C3A1A" strokeWidth="0.5" />

          {/* Tiles */}
          {tiles.map((tile) => (
            <rect
              key={tile.id}
              x={tile.x - 8 * tile.scale}
              y={tile.y - 11 * tile.scale}
              width={16 * tile.scale}
              height={22 * tile.scale}
              rx={2}
              fill="#FAF7EC"
              stroke="#C9BC8A"
              strokeWidth={0.8}
              transform={`rotate(${tile.rotation} ${tile.x} ${tile.y})`}
            />
          ))}
        </svg>

        {/* Left hand — your left hand reaching from bottom-left */}
        <div
          className="absolute"
          style={{
            left: `${(leftHandX / 320) * 100}%`,
            top: `${(leftHandY / 240) * 100}%`,
            transform: `translate(-50%, -50%) rotate(${leftAngle}deg) scaleX(-1)`,
            fontSize: 30,
            zIndex: 10,
            pointerEvents: "none",
            filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.3))",
          }}
        >
          🤚
        </div>

        {/* Right hand — your right hand reaching from bottom-right */}
        <div
          className="absolute"
          style={{
            left: `${(rightHandX / 320) * 100}%`,
            top: `${(rightHandY / 240) * 100}%`,
            transform: `translate(-50%, -50%) rotate(${rightAngle}deg)`,
            fontSize: 30,
            zIndex: 10,
            pointerEvents: "none",
            filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.3))",
          }}
        >
          🤚
        </div>
      </div>

      <p className="mt-2 text-center text-[12px] italic text-zinc-500">
        Everyone reaches in and mixes the tiles face-down.
      </p>
    </div>
  );
}
