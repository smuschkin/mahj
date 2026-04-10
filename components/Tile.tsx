import { ReactNode } from "react";

export type TileSize = "sm" | "md" | "lg";
export type TileType =
  | "bam"
  | "crack"
  | "dot"
  | "wind"
  | "dragon"
  | "flower"
  | "season"
  | "joker";

type TileProps = {
  type: TileType;
  /** 1-9 for suits, 1-4 for flowers/seasons, "E"|"S"|"W"|"N" for winds, "red"|"green"|"white" for dragons */
  value?: number | string;
  size?: TileSize;
  /** marks the tile (e.g. "marked for pass") */
  marked?: boolean;
  /** highlight as a target (e.g. calling target) */
  highlighted?: boolean;
  /** show the short table-name label beneath the tile (e.g. "3 Bam") */
  showLabel?: boolean;
  /** callback when tile is tapped (for interactive modes) */
  onClick?: () => void;
  /** visual "selected for discard" state — tile lifts up with gold border */
  selected?: boolean;
  className?: string;
};

const SIZES: Record<TileSize, { w: number; h: number; pad: number; cornerSize: number }> = {
  sm: { w: 36, h: 48, pad: 3, cornerSize: 12 },
  md: { w: 60, h: 80, pad: 6, cornerSize: 17 },
  lg: { w: 90, h: 120, pad: 9, cornerSize: 22 },
};

/** Returns the small red Arabic number/letter that appears in the top-left of every tile */
function cornerLabelFor(type: TileType, value?: number | string): string | null {
  switch (type) {
    case "bam":
    case "crack":
    case "dot":
      return String(value);
    case "wind":
      return String(value); // N/E/W/S
    case "dragon":
      return null;
    case "flower":
    case "season":
      return null; // flowers have no corner label — every flower is just "Flower"
    case "joker":
      return null;
  }
}

const CRACK_CHARS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const WIND_LABELS: Record<string, { en: string; cn: string; full: string }> = {
  N: { en: "N", cn: "北", full: "North" },
  E: { en: "E", cn: "東", full: "East" },
  W: { en: "W", cn: "西", full: "West" },
  S: { en: "S", cn: "南", full: "South" },
};
const DRAGON_LABELS: Record<string, { glyph: string; color: string; label: string }> = {
  red: { glyph: "中", color: "#C0392B", label: "Red" },
  green: { glyph: "發", color: "#27AE60", label: "Green" },
  white: { glyph: "", color: "#2C3E50", label: "Soap" },
};
// In American Mahjong all 8 flower-group tiles are just "Flower" at the table.
// Each shows a different floral illustration but they are all functionally identical.

// Bam stalk arrangements per value
const BAM_LAYOUT: Record<number, number[]> = {
  2: [2],
  3: [3],
  4: [2, 2],
  5: [2, 1, 2],
  6: [3, 3],
  7: [3, 1, 3],
  8: [4, 4],
  9: [3, 3, 3],
};

// Dot grid positions per value (using 3x3 grid, each cell is row×col)
const DOT_LAYOUT: Record<number, [number, number][]> = {
  1: [[2, 2]],
  2: [[1, 1], [3, 3]],
  3: [[1, 1], [2, 2], [3, 3]],
  4: [[1, 1], [1, 3], [3, 1], [3, 3]],
  5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
  6: [[1, 1], [2, 1], [3, 1], [1, 3], [2, 3], [3, 3]],
  7: [[1, 1], [2, 1], [3, 1], [2, 2], [1, 3], [2, 3], [3, 3]],
  8: [[1, 1], [2, 1], [3, 1], [1, 2], [3, 2], [1, 3], [2, 3], [3, 3]],
  9: [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]],
};

export function Tile({
  type,
  value,
  size = "md",
  marked = false,
  highlighted = false,
  showLabel = false,
  onClick,
  selected = false,
  className = "",
}: TileProps) {
  const dim = SIZES[size];
  const isJoker = type === "joker";

  const baseClasses =
    "relative inline-flex shrink-0 flex-col items-center justify-center rounded-md border-[1.5px] shadow-[0_2px_5px_rgba(0,0,0,0.12)] overflow-hidden";

  let bg = "bg-[#FAF7EC]";
  let border = "border-[#C9BC8A]";

  if (isJoker) {
    border = "border-[#D4AC0D]";
  }

  if (selected) {
    border = "border-[#C8A951] border-2";
  } else if (highlighted) {
    border = "border-[var(--color-red)] border-2";
  }
  if (marked) {
    border = "border-[var(--color-red)] border-dashed border-2";
  }

  const corner = cornerLabelFor(type, value);

  const tile = (
    <div
      className={`${baseClasses} ${bg} ${border} ${marked ? "opacity-60" : ""}`}
      style={{ width: dim.w, height: dim.h, padding: dim.pad }}
      role="img"
      aria-label={tileLabel(type, value)}
    >
      {/* Red corner label — Arabic number/letter top-left, on every numbered tile */}
      {corner && (
        <span
          className="absolute font-serif font-black leading-none"
          style={{
            top: dim.pad - 2,
            left: dim.pad - 1,
            fontSize: dim.cornerSize,
            color: "#C0392B",
            textShadow: "0 0 3px #FAF7EC, 0 0 6px #FAF7EC, 0 0 9px #FAF7EC",
            zIndex: 2,
          }}
        >
          {corner}
        </span>
      )}
      <div
        className="flex flex-1 items-center justify-center w-full"
        style={{
          paddingTop: corner ? dim.cornerSize * 0.35 : 0,
        }}
      >
        {renderArt({ type, value, size: dim })}
      </div>
    </div>
  );

  const wrappedTile = onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer transition-transform duration-150 ${selected ? "-translate-y-2" : "hover:-translate-y-0.5"} ${className}`}
    >
      {tile}
    </button>
  ) : (
    <span className={className}>{tile}</span>
  );

  if (!showLabel) return wrappedTile;

  return (
    <div className={`flex flex-col items-center gap-1.5 ${onClick ? "" : className}`}>
      {onClick ? <button
        type="button"
        onClick={onClick}
        className={`cursor-pointer transition-transform duration-150 ${selected ? "-translate-y-2" : "hover:-translate-y-0.5"}`}
      >
        {tile}
      </button> : tile}
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 whitespace-nowrap">
        {shortLabel(type, value)}
      </span>
    </div>
  );
}

/** Short, table-style label like "3 Bam" or "Red Dragon" */
function shortLabel(type: TileType, value?: number | string): string {
  switch (type) {
    case "bam":
      return `${value} Bam`;
    case "crack":
      return `${value} Crack`;
    case "dot":
      return `${value} Dot`;
    case "wind":
      return WIND_LABELS[String(value)]?.full ?? String(value);
    case "dragon":
      return value === "white" ? "Soap" : `${DRAGON_LABELS[String(value)]?.label ?? ""} Dragon`;
    case "flower":
    case "season":
      return "Flower";
    case "joker":
      return "Joker";
  }
}

function renderArt({
  type,
  value,
  size,
}: {
  type: TileType;
  value?: number | string;
  size: { w: number; h: number; pad: number };
}): ReactNode {
  switch (type) {
    case "bam":
      return <BamArt value={Number(value)} size={size} />;
    case "crack":
      return <CrackArt value={Number(value)} size={size} />;
    case "dot":
      return <DotArt value={Number(value)} size={size} />;
    case "wind":
      return <WindArt value={String(value)} size={size} />;
    case "dragon":
      return <DragonArt value={String(value)} size={size} />;
    case "flower":
      return <FlowerArt index={Number(value) - 1} size={size} kind="flower" />;
    case "season":
      return <FlowerArt index={Number(value) - 1} size={size} kind="season" />;
    case "joker":
      return <JokerArt size={size} />;
  }
}

function tileLabel(type: TileType, value?: number | string): string {
  switch (type) {
    case "bam":
      return `${value} of Bamboo`;
    case "crack":
      return `${value} of Characters`;
    case "dot":
      return `${value} of Dots`;
    case "wind":
      return `${WIND_LABELS[String(value)]?.full ?? value} Wind`;
    case "dragon":
      return `${DRAGON_LABELS[String(value)]?.label ?? value} Dragon`;
    case "flower":
    case "season":
      return "Flower";
    case "joker":
      return "Joker";
  }
}

/* ───── Bam ───── */
// 1 Bam is the iconic phoenix/bird (red).
// 2–9 Bams are vertical bamboo stalks in dark forest green, with the center stalk
// in red on odd-count rows (matching the photo set's red-accent style).
function BamArt({ value, size }: { value: number; size: { w: number; h: number } }) {
  if (value === 1) return <BirdSVG size={size.w * 0.72} />;
  const layout = BAM_LAYOUT[value];
  if (!layout) return null;
  const stalkH = Math.max(7, (size.h - 24) / (layout.length * 1.5));
  const stalkW = Math.max(3, size.w / 16);
  // Each stalk has 3 segments separated by nodes, like real bamboo
  const segH = stalkH / 3.6;
  const nodeGap = stalkH * 0.06;
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {layout.map((count, ri) => (
        <div key={ri} className="flex gap-1">
          {Array.from({ length: count }).map((_, i) => {
            const isOddRow = count % 2 === 1 && count > 1;
            const isCenter = i === Math.floor(count / 2);
            const isRed = isOddRow && isCenter;
            const baseColor = isRed ? "#C0392B" : "#1E8449";
            const lightColor = isRed ? "#E74C3C" : "#27AE60";
            const darkColor = isRed ? "#922B21" : "#145A32";
            const nodeColor = isRed ? "#7A1F1A" : "#0D3B1F";
            return (
              <svg
                key={i}
                width={stalkW}
                height={stalkH}
                viewBox={`0 0 ${stalkW} ${stalkH}`}
              >
                {/* Top segment */}
                <rect
                  x={0} y={0}
                  width={stalkW} height={segH}
                  rx={1}
                  fill={lightColor}
                />
                {/* Top node */}
                <rect
                  x={-0.5} y={segH}
                  width={stalkW + 1} height={nodeGap + 1}
                  fill={nodeColor}
                />
                {/* Middle segment */}
                <rect
                  x={0} y={segH + nodeGap + 1}
                  width={stalkW} height={segH}
                  fill={baseColor}
                />
                {/* Bottom node */}
                <rect
                  x={-0.5} y={segH * 2 + nodeGap + 1}
                  width={stalkW + 1} height={nodeGap + 1}
                  fill={nodeColor}
                />
                {/* Bottom segment */}
                <rect
                  x={0} y={segH * 2 + nodeGap * 2 + 2}
                  width={stalkW} height={segH}
                  rx={1}
                  fill={darkColor}
                />
              </svg>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function BirdSVG({ size }: { size: number }) {
  // Multicolored phoenix — red body, green wing, blue tail accents,
  // gold eye, orange beak. Inspired by traditional 1 Bam illustrations
  // on American Mahjong sets.
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* ─── Long flowing tail feathers — red, blue, green ─── */}
      <path
        d="M 38 36 Q 52 30 60 16"
        stroke="#C0392B"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 38 38 Q 54 38 62 28"
        stroke="#2E86C1"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 38 40 Q 52 44 58 38"
        stroke="#1E8449"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tail tip ornaments */}
      <circle cx="60" cy="16" r="1.5" fill="#F1C40F" />
      <circle cx="62" cy="28" r="1.5" fill="#F1C40F" />
      <circle cx="58" cy="38" r="1.5" fill="#F1C40F" />

      {/* ─── Body — plump red oval ─── */}
      <ellipse cx="26" cy="36" rx="13" ry="10" fill="#C0392B" />
      {/* Belly highlight */}
      <ellipse cx="24" cy="40" rx="9" ry="5" fill="#E74C3C" />

      {/* ─── Wing — green with feather lines ─── */}
      <path
        d="M 16 28 Q 26 22 36 30 Q 30 40 18 38 Z"
        fill="#1E8449"
      />
      {/* Feather detail lines */}
      <path
        d="M 20 30 Q 26 28 32 30 M 22 33 Q 28 31 32 33"
        stroke="#27AE60"
        strokeWidth="0.6"
        fill="none"
      />
      {/* Blue accent feather tips on wing edge */}
      <path
        d="M 16 28 Q 14 32 18 38"
        stroke="#2E86C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* ─── Neck ─── */}
      <path
        d="M 36 28 Q 40 22 42 18"
        stroke="#C0392B"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* ─── Head ─── */}
      <circle cx="42" cy="16" r="6" fill="#C0392B" />
      <circle cx="40" cy="18" r="2" fill="#E74C3C" />

      {/* ─── Crest plumes — red, blue, green ─── */}
      <path
        d="M 40 10 Q 38 4 34 2"
        stroke="#1E8449"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 42 9 Q 42 2 38 0"
        stroke="#2E86C1"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 44 10 Q 46 4 44 0"
        stroke="#C0392B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Crest feather tips in gold */}
      <circle cx="34" cy="2" r="1.2" fill="#F1C40F" />
      <circle cx="38" cy="0" r="1.2" fill="#F1C40F" />
      <circle cx="44" cy="0" r="1.2" fill="#F1C40F" />

      {/* ─── Eye — gold with dark pupil ─── */}
      <circle cx="44" cy="15" r="1.8" fill="#F1C40F" />
      <circle cx="44.5" cy="15" r="0.9" fill="#1A1A2E" />

      {/* ─── Beak — orange ─── */}
      <path d="M 48 15 L 56 16 L 48 18 Z" fill="#F39C12" />
      <path d="M 48 16.5 L 55 16.5" stroke="#C0392B" strokeWidth="0.5" />

      {/* ─── Legs ─── */}
      <line x1="22" y1="46" x2="20" y2="58" stroke="#922B21" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="28" y1="46" x2="30" y2="58" stroke="#922B21" strokeWidth="2.2" strokeLinecap="round" />
      {/* Toes */}
      <path d="M 18 58 L 20 58 L 22 58 M 20 58 L 20 60" stroke="#922B21" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 28 58 L 30 58 L 32 58 M 30 58 L 30 60" stroke="#922B21" strokeWidth="1.4" strokeLinecap="round" />

      {/* ─── Perch ─── */}
      <line x1="14" y1="60" x2="36" y2="60" stroke="#7D3C0E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ───── Crack ───── */
// Cracks show: Chinese number character (top, black) + 萬 "wan/10,000" character (bottom, black).
// The red Arabic number is added separately by the universal corner label.
function CrackArt({ value, size }: { value: number; size: { w: number; h: number } }) {
  const top = Math.round(size.h * 0.28);
  const bot = Math.round(size.h * 0.32);
  return (
    <div className="flex flex-col items-center gap-0.5 font-serif font-black">
      <span style={{ fontSize: top, color: "#1A1A1A", lineHeight: 1 }}>
        {CRACK_CHARS[value]}
      </span>
      <span style={{ fontSize: bot, color: "#1A1A1A", lineHeight: 1 }}>
        萬
      </span>
    </div>
  );
}

/* ───── Dot ───── */
// Ornate medallion-style dots — red center inside a black ring, like the photo set.
// 1 Dot is special: a single LARGE decorated medallion with concentric rings.
function DotArt({ value, size }: { value: number; size: { w: number; h: number } }) {
  // Special case: 1 Dot = single oversized ornate medallion
  if (value === 1) {
    const big = Math.round(size.w * 0.55);
    return (
      <div
        className="rounded-full"
        style={{
          width: big,
          height: big,
          background: "#FAF7EC",
          border: "2.5px solid #1A1A1A",
          boxShadow: "0 0 0 3px #FAF7EC, 0 0 0 4.5px #C0392B",
          position: "relative",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: big * 0.45,
            height: big * 0.45,
            background:
              "radial-gradient(circle at 35% 35%, #E74C3C, #8B1F18)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }

  // 2-9: dice-pattern grid of small medallion dots
  const cells = DOT_LAYOUT[value] ?? [];
  const dotSize = Math.max(6, size.w / 7.5);
  const gap = Math.max(2, size.w / 14);
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(3, ${dotSize}px)`,
        gridTemplateRows: `repeat(3, ${dotSize}px)`,
        gap,
      }}
    >
      {cells.map(([row, col], i) => {
        const isGreen = i % 2 === 1;
        return (
          <span
            key={i}
            className="rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              background: isGreen
                ? "radial-gradient(circle at 35% 35%, #27AE60 0%, #145A32 60%, #1A1A1A 65%, #1A1A1A 100%)"
                : "radial-gradient(circle at 35% 35%, #E74C3C 0%, #8B1F18 60%, #1A1A1A 65%, #1A1A1A 100%)",
              gridRow: row,
              gridColumn: col,
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          />
        );
      })}
    </div>
  );
}

/* ───── Wind ───── */
// Winds show only the LARGE black Chinese character (北/東/西/南).
// The English letter (N/E/W/S) lives in the universal red corner label.
function WindArt({ value, size }: { value: string; size: { w: number; h: number } }) {
  const data = WIND_LABELS[value];
  if (!data) return null;
  const cn = Math.round(size.h * 0.42);
  return (
    <div className="flex items-center justify-center">
      <span
        className="font-serif font-black"
        style={{ fontSize: cn, color: "#1A1A1A", lineHeight: 1 }}
      >
        {data.cn}
      </span>
    </div>
  );
}

/* ───── Dragon ───── */
function DragonArt({ value, size }: { value: string; size: { w: number; h: number } }) {
  if (value === "white") {
    // The "Soap" tile — a tall rectangle with a clear border
    const w = Math.round(size.w * 0.7);
    const h = Math.round(size.h * 0.85);
    return (
      <svg viewBox="0 0 32 48" width={w} height={h} aria-hidden="true">
        {/* Outer border */}
        <rect x="1" y="1" width="30" height="46" rx="3" fill="none" stroke="#334155" strokeWidth="2.5" />
        {/* Inner border */}
        <rect x="5" y="5" width="22" height="38" rx="2" fill="none" stroke="#334155" strokeWidth="1" />
        {/* Corner ornaments */}
        <circle cx="5" cy="5" r="1.5" fill="#334155" />
        <circle cx="27" cy="5" r="1.5" fill="#334155" />
        <circle cx="5" cy="43" r="1.5" fill="#334155" />
        <circle cx="27" cy="43" r="1.5" fill="#334155" />
      </svg>
    );
  }

  const dragonW = Math.round(size.w * 0.7);
  const dragonH = Math.round(size.h * 0.9);

  return (
    <img
      src={value === "red" ? "/tiles/red-dragon.png" : "/tiles/green-dragon.png"}
      alt={value === "red" ? "Red Dragon" : "Green Dragon"}
      width={dragonW}
      height={dragonH}
      style={{ objectFit: "contain" }}
    />
  );
}

/* ───── Flower / Season ───── */
// All flower-group tiles are just "Flower" — no numbers, no corner labels.
// Each tile shows a unique illustration but is functionally identical.
function FlowerArt({
  index,
  size,
  kind,
}: {
  index: number;
  size: { w: number; h: number };
  kind: "flower" | "season";
}) {
  const SvgComp =
    kind === "flower" ? FLOWER_SVGS[index] : SEASON_SVGS[index];
  if (!SvgComp) return null;
  const svgSize = Math.round(size.h * 0.65);
  return (
    <div className="flex items-center justify-center">
      <SvgComp size={svgSize} />
    </div>
  );
}

/* ───── Flower SVGs ───── */

function PlumSVG({ size }: { size: number }) {
  // 梅 Plum blossom on a branch — 5-petal flowers with visible petal shapes
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Branch */}
      <path d="M4 58 Q18 44 32 32 Q42 24 50 18" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M24 40 Q18 48 14 54" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Large blossom — 5 petals with gaps */}
      <g fill="#F48FB1" stroke="#E91E63" strokeWidth="0.8">
        <ellipse cx="34" cy="22" rx="5" ry="7" transform="rotate(-15 34 22)" />
        <ellipse cx="42" cy="28" rx="5" ry="7" transform="rotate(55 42 28)" />
        <ellipse cx="40" cy="38" rx="5" ry="7" transform="rotate(125 40 38)" />
        <ellipse cx="28" cy="38" rx="5" ry="7" transform="rotate(-125 28 38)" />
        <ellipse cx="26" cy="28" rx="5" ry="7" transform="rotate(-55 26 28)" />
      </g>
      <circle cx="34" cy="30" r="3.5" fill="#FFD700" />
      {/* Small bud */}
      <circle cx="48" cy="20" r="3.5" fill="#F8BBD0" />
      <circle cx="48" cy="20" r="1.5" fill="#E91E63" />
      {/* Character */}
      <text x="54" y="60" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="900" fill="#C0392B">梅</text>
    </svg>
  );
}

function OrchidSVG({ size }: { size: number }) {
  // 蘭 Orchid — graceful filled petals on an arching stem with thin leaves
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Arching stem */}
      <path d="M12 58 Q16 40 28 30 Q36 24 40 18" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Long thin leaves */}
      <path d="M14 56 Q4 42 2 28" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M16 54 Q8 44 6 34" stroke="#43A047" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Orchid flower — filled petals */}
      <g>
        {/* Upper sepal — narrow upward petal */}
        <ellipse cx="36" cy="8" rx="3" ry="10" fill="#CE93D8" stroke="#9C27B0" strokeWidth="0.6" transform="rotate(-8 36 8)" />
        {/* Side petals — sweeping outward, filled */}
        <ellipse cx="22" cy="14" rx="3.5" ry="10" fill="#AB47BC" stroke="#9C27B0" strokeWidth="0.5" transform="rotate(-50 22 14)" />
        <ellipse cx="52" cy="14" rx="3.5" ry="10" fill="#AB47BC" stroke="#9C27B0" strokeWidth="0.5" transform="rotate(50 52 14)" />
        {/* Lower petals — drooping */}
        <ellipse cx="24" cy="30" rx="3" ry="9" fill="#CE93D8" stroke="#9C27B0" strokeWidth="0.5" transform="rotate(-30 24 30)" />
        <ellipse cx="50" cy="30" rx="3" ry="9" fill="#CE93D8" stroke="#9C27B0" strokeWidth="0.5" transform="rotate(30 50 30)" />
        {/* Lip (center petal) — the distinctive orchid lip */}
        <ellipse cx="38" cy="24" rx="5" ry="7" fill="#E1BEE7" stroke="#9C27B0" strokeWidth="0.8" />
        <circle cx="38" cy="22" r="2" fill="#FFD54F" />
      </g>
      {/* Character */}
      <text x="54" y="60" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="900" fill="#C0392B">蘭</text>
    </svg>
  );
}

function ChrysanthemumSVG({ size }: { size: number }) {
  // 菊 Chrysanthemum — layered radiating petals on a stem
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Stem */}
      <path d="M30 44 Q28 52 26 58" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Leaf */}
      <path d="M28 50 Q20 46 14 42" stroke="#388E3C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Outer petals — 12 radiating */}
      <g fill="#E67E22" stroke="#D35400" strokeWidth="0.4">
        <ellipse cx="30" cy="8" rx="3" ry="8" />
        <ellipse cx="40" cy="10" rx="3" ry="8" transform="rotate(30 40 10)" />
        <ellipse cx="48" cy="18" rx="3" ry="8" transform="rotate(60 48 18)" />
        <ellipse cx="50" cy="28" rx="3" ry="8" transform="rotate(90 50 28)" />
        <ellipse cx="48" cy="38" rx="3" ry="8" transform="rotate(120 48 38)" />
        <ellipse cx="40" cy="44" rx="3" ry="8" transform="rotate(150 40 44)" />
        <ellipse cx="30" cy="46" rx="3" ry="8" />
        <ellipse cx="20" cy="44" rx="3" ry="8" transform="rotate(-150 20 44)" />
        <ellipse cx="12" cy="38" rx="3" ry="8" transform="rotate(-120 12 38)" />
        <ellipse cx="10" cy="28" rx="3" ry="8" transform="rotate(-90 10 28)" />
        <ellipse cx="12" cy="18" rx="3" ry="8" transform="rotate(-60 12 18)" />
        <ellipse cx="20" cy="10" rx="3" ry="8" transform="rotate(-30 20 10)" />
      </g>
      {/* Inner petals — shorter, lighter */}
      <g fill="#F39C12">
        <ellipse cx="30" cy="16" rx="2.5" ry="5.5" />
        <ellipse cx="38" cy="20" rx="2.5" ry="5.5" transform="rotate(50 38 20)" />
        <ellipse cx="38" cy="34" rx="2.5" ry="5.5" transform="rotate(130 38 34)" />
        <ellipse cx="30" cy="38" rx="2.5" ry="5.5" />
        <ellipse cx="22" cy="34" rx="2.5" ry="5.5" transform="rotate(-130 22 34)" />
        <ellipse cx="22" cy="20" rx="2.5" ry="5.5" transform="rotate(-50 22 20)" />
      </g>
      {/* Center */}
      <circle cx="30" cy="27" r="4" fill="#F39C12" />
      <circle cx="30" cy="27" r="2" fill="#7D3C0E" />
      {/* Character */}
      <text x="54" y="60" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="900" fill="#C0392B">菊</text>
    </svg>
  );
}

function SunflowerSVG({ size }: { size: number }) {
  // 花 Sunflower on a stem
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Stem */}
      <path d="M30 40 Q28 50 26 58" stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M28 48 Q18 44 12 38" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M27 52 Q36 50 42 46" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Petals — 10 radiating */}
      <g fill="#F1C40F" stroke="#F9A825" strokeWidth="0.4">
        <ellipse cx="30" cy="6" rx="3.5" ry="8" />
        <ellipse cx="40" cy="9" rx="3.5" ry="8" transform="rotate(36 40 9)" />
        <ellipse cx="47" cy="18" rx="3.5" ry="8" transform="rotate(72 47 18)" />
        <ellipse cx="47" cy="30" rx="3.5" ry="8" transform="rotate(108 47 30)" />
        <ellipse cx="40" cy="37" rx="3.5" ry="8" transform="rotate(144 40 37)" />
        <ellipse cx="30" cy="40" rx="3.5" ry="8" />
        <ellipse cx="20" cy="37" rx="3.5" ry="8" transform="rotate(-144 20 37)" />
        <ellipse cx="13" cy="30" rx="3.5" ry="8" transform="rotate(-108 13 30)" />
        <ellipse cx="13" cy="18" rx="3.5" ry="8" transform="rotate(-72 13 18)" />
        <ellipse cx="20" cy="9" rx="3.5" ry="8" transform="rotate(-36 20 9)" />
      </g>
      {/* Seed head */}
      <circle cx="30" cy="23" r="8" fill="#7D3C0E" />
      <circle cx="30" cy="23" r="5" fill="#4E2509" />
      {/* Character */}
      <text x="54" y="60" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="900" fill="#C0392B">花</text>
    </svg>
  );
}

function SpringSVG({ size }: { size: number }) {
  // 春 Spring — cherry/plum blossoms on a branch
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Branch */}
      <path d="M8 52 Q18 44 32 32 Q42 24 50 18" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M24 40 Q18 48 14 54" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Smaller blossom — 5 petals */}
      <g fill="#F48FB1" stroke="#E91E63" strokeWidth="0.6">
        <ellipse cx="17" cy="32" rx="3" ry="4.5" transform="rotate(-15 17 32)" />
        <ellipse cx="22" cy="33" rx="3" ry="4.5" transform="rotate(55 22 33)" />
        <ellipse cx="22" cy="39" rx="3" ry="4.5" transform="rotate(125 22 39)" />
        <ellipse cx="16" cy="40" rx="3" ry="4.5" transform="rotate(-125 16 40)" />
        <ellipse cx="14" cy="34" rx="3" ry="4.5" transform="rotate(-55 14 34)" />
      </g>
      <circle cx="18" cy="36" r="2" fill="#FFD700" />
      {/* Larger blossom — 5 petals */}
      <g fill="#F8BBD0" stroke="#EC407A" strokeWidth="0.5">
        <ellipse cx="36" cy="22" rx="4.5" ry="6" transform="rotate(-15 36 22)" />
        <ellipse cx="42" cy="24" rx="4.5" ry="6" transform="rotate(55 42 24)" />
        <ellipse cx="40" cy="32" rx="4.5" ry="6" transform="rotate(125 40 32)" />
        <ellipse cx="30" cy="32" rx="4.5" ry="6" transform="rotate(-125 30 32)" />
        <ellipse cx="28" cy="24" rx="4.5" ry="6" transform="rotate(-55 28 24)" />
      </g>
      <circle cx="36" cy="27" r="3" fill="#FFD700" />
      {/* Small bud */}
      <circle cx="48" cy="20" r="3" fill="#F8BBD0" />
      <circle cx="48" cy="20" r="1.2" fill="#E91E63" />
      <text x="54" y="60" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="900" fill="#C0392B">春</text>
    </svg>
  );
}

function SummerSVG({ size }: { size: number }) {
  // 夏 Summer — lotus flower on a stem with a lily pad
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Stem */}
      <path d="M32 38 Q30 48 28 56" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Lily pad */}
      <ellipse cx="22" cy="52" rx="10" ry="4" fill="#388E3C" />
      <path d="M22 48 L22 52" stroke="#2E7D32" strokeWidth="0.6" />
      {/* Lotus — layered petals */}
      <g fill="#F8BBD0" stroke="#F06292" strokeWidth="0.5">
        <ellipse cx="20" cy="30" rx="5" ry="10" transform="rotate(-30 20 30)" />
        <ellipse cx="44" cy="30" rx="5" ry="10" transform="rotate(30 44 30)" />
      </g>
      <g fill="#F06292" stroke="#E91E63" strokeWidth="0.5">
        <ellipse cx="24" cy="22" rx="4.5" ry="12" transform="rotate(-12 24 22)" />
        <ellipse cx="40" cy="22" rx="4.5" ry="12" transform="rotate(12 40 22)" />
        <ellipse cx="32" cy="20" rx="4" ry="13" />
      </g>
      <circle cx="32" cy="28" r="3" fill="#FFD54F" />
      <text x="54" y="60" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="900" fill="#C0392B">夏</text>
    </svg>
  );
}

function AutumnSVG({ size }: { size: number }) {
  // 秋 Autumn — maple leaves on a branch
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Branch */}
      <path d="M8 54 Q24 40 40 26 Q50 18 56 12" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M30 36 Q26 44 22 50" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Maple leaves */}
      <path d="M30 22 L28 14 L32 18 L36 12 L34 20 L40 18 L36 24 L38 30 L32 26 L26 30 L28 24 L22 20 Z" fill="#E53935" />
      <path d="M46 16 L44 10 L48 13 L50 8 L49 14 L54 14 L50 18 L52 22 L47 19 L44 22 L45 18 L40 16 Z" fill="#FF7043" />
      <path d="M18 38 L16 32 L20 35 L22 30 L21 36 L26 36 L22 40 L24 44 L19 41 L16 44 L17 40 L12 38 Z" fill="#FFA726" />
      <path d="M40 36 L39 32 L42 34 L44 30 L43 35 L46 34 L44 38 L45 42 L41 39 L38 42 L39 38 L36 36 Z" fill="#EF5350" transform="rotate(20 40 36)" />
      <text x="54" y="60" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="900" fill="#C0392B">秋</text>
    </svg>
  );
}

function WinterSVG({ size }: { size: number }) {
  // 冬 Winter — bare branch with snow and a plum blossom
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Bare branch */}
      <path d="M6 54 Q20 42 34 30 Q46 20 56 12" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M26 38 Q22 46 16 52" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M42 22 Q48 26 52 34" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Snow on branches */}
      <ellipse cx="20" cy="42" rx="6" ry="2.5" fill="white" stroke="#B0BEC5" strokeWidth="0.5" />
      <ellipse cx="40" cy="24" rx="5" ry="2" fill="white" stroke="#B0BEC5" strokeWidth="0.5" />
      <ellipse cx="52" cy="14" rx="4" ry="1.5" fill="white" stroke="#B0BEC5" strokeWidth="0.5" />
      {/* Single plum blossom — winter bloomer */}
      <g fill="#F8BBD0" stroke="#E91E63" strokeWidth="0.5">
        <ellipse cx="32" cy="25" rx="3" ry="4.5" transform="rotate(-15 32 25)" />
        <ellipse cx="37" cy="28" rx="3" ry="4.5" transform="rotate(55 37 28)" />
        <ellipse cx="36" cy="34" rx="3" ry="4.5" transform="rotate(125 36 34)" />
        <ellipse cx="30" cy="34" rx="3" ry="4.5" transform="rotate(-125 30 34)" />
        <ellipse cx="29" cy="28" rx="3" ry="4.5" transform="rotate(-55 29 28)" />
      </g>
      <circle cx="33" cy="30" r="2" fill="#E91E63" />
      {/* Snowflakes */}
      <circle cx="10" cy="12" r="1.5" fill="#B0BEC5" opacity="0.6" />
      <circle cx="28" cy="8" r="1" fill="#B0BEC5" opacity="0.5" />
      <circle cx="48" cy="42" r="1.2" fill="#B0BEC5" opacity="0.5" />
      <text x="54" y="60" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="900" fill="#C0392B">冬</text>
    </svg>
  );
}

const FLOWER_SVGS = [PlumSVG, OrchidSVG, ChrysanthemumSVG, SunflowerSVG];
const SEASON_SVGS = [SpringSVG, SummerSVG, AutumnSVG, WinterSVG];

/* ───── Joker ───── */
// Joker = "JOKER" red wordmark on top + ornate "J" letter inside a starburst.
function JokerArt({ size }: { size: { w: number; h: number } }) {
  const wordH = Math.round(size.h * 0.18);
  const starSize = Math.round(size.w * 0.65);
  return (
    <div className="flex flex-col items-center justify-center" style={{ gap: 1 }}>
      {/* "JOKER" wordmark in red */}
      <svg
        viewBox="0 0 80 18"
        width={Math.round(size.w * 0.85)}
        height={wordH}
        aria-hidden="true"
      >
        <text
          x="40"
          y="14"
          textAnchor="middle"
          fontFamily="Playfair Display, serif"
          fontSize="16"
          fontWeight="900"
          fill="#C0392B"
          letterSpacing="1.5"
        >
          JOKER
        </text>
      </svg>

      {/* Ornate starburst with "J" in the center */}
      <svg
        viewBox="0 0 64 64"
        width={starSize}
        height={starSize}
        aria-hidden="true"
      >
        {/* 8-point star burst — outer rays */}
        <g fill="#C0392B">
          <polygon points="32,2 36,28 32,30 28,28" />
          <polygon points="62,32 36,36 34,32 36,28" />
          <polygon points="32,62 28,36 32,34 36,36" />
          <polygon points="2,32 28,28 30,32 28,36" />
          <polygon points="53,11 38,30 32,32 36,28" />
          <polygon points="53,53 34,38 32,32 36,36" />
          <polygon points="11,53 30,38 32,32 28,36" />
          <polygon points="11,11 30,30 32,32 28,28" />
        </g>
        {/* Inner gold circle */}
        <circle
          cx="32"
          cy="32"
          r="13"
          fill="#FAF7EC"
          stroke="#C0392B"
          strokeWidth="2"
        />
        {/* Ornate serif "J" */}
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fontFamily="Playfair Display, serif"
          fontSize="22"
          fontWeight="900"
          fill="#1A1A2E"
        >
          J
        </text>
      </svg>
    </div>
  );
}
