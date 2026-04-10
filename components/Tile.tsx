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
// Note: in American Mahjong all 8 flower-group tiles are called "Flowers" at the
// table, even the 4 traditionally-named "seasons." We label them sequentially 1–8.

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
  className = "",
}: TileProps) {
  const dim = SIZES[size];
  const isJoker = type === "joker";
  const isSeason = type === "season";

  const baseClasses =
    "relative inline-flex shrink-0 flex-col items-center justify-center rounded-md border-[1.5px] shadow-[0_2px_5px_rgba(0,0,0,0.12)] overflow-hidden";

  let bg = "bg-[#FAF7EC]";
  let border = "border-[#C9BC8A]";

  if (isJoker) {
    // Joker tile: hard-coded gold border (this is a *content* color from real mahjong sets,
    // independent of the brand accent color)
    bg = "bg-gradient-to-br from-[#FFFBEA] to-[#F5E9B8]";
    border = "border-[#D4AC0D]";
  } else if (isSeason) {
    bg = "bg-[#FFF6E0]";
  } else if (type === "dragon" && value === "white") {
    bg = "bg-white";
  }

  if (highlighted) {
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

  if (!showLabel) return <span className={className}>{tile}</span>;

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      {tile}
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
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {layout.map((count, ri) => (
        <div key={ri} className="flex gap-1">
          {Array.from({ length: count }).map((_, i) => {
            // Center stalk in red when row has an odd count > 1 — gives the
            // "red-accent" look of the photo set.
            const isOddRow = count % 2 === 1 && count > 1;
            const isCenter = i === Math.floor(count / 2);
            const isRed = isOddRow && isCenter;
            return (
              <span
                key={i}
                className="rounded-sm shadow-sm"
                style={{
                  width: stalkW,
                  height: stalkH,
                  background: isRed
                    ? "linear-gradient(180deg, #E74C3C, #922B21)"
                    : "linear-gradient(180deg, #1E8449, #145A32)",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function BirdSVG({ size }: { size: number }) {
  // Ornate red phoenix — body with spread wing, long flowing tail feathers,
  // crest of plume feathers on the head, gold eye, orange beak, perched on
  // a small branch. Inspired by traditional 1 Bam phoenix illustrations.
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* ─── Long flowing tail feathers (3 layers, two-tone red) ─── */}
      <path
        d="M 38 36 Q 52 30 60 16"
        stroke="#C0392B"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 38 38 Q 54 38 62 28"
        stroke="#E74C3C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 38 40 Q 52 44 58 38"
        stroke="#C0392B"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tail tip ornaments — small circles like feather eyes */}
      <circle cx="60" cy="16" r="1.5" fill="#F1C40F" />
      <circle cx="62" cy="28" r="1.5" fill="#F1C40F" />
      <circle cx="58" cy="38" r="1.5" fill="#F1C40F" />

      {/* ─── Body — plump oval ─── */}
      <ellipse cx="26" cy="36" rx="13" ry="10" fill="#C0392B" />
      {/* Belly highlight (lighter) */}
      <ellipse cx="24" cy="40" rx="9" ry="5" fill="#E74C3C" />

      {/* ─── Wing — folded against the body with feather lines ─── */}
      <path
        d="M 16 28 Q 26 22 36 30 Q 30 40 18 38 Z"
        fill="#922B21"
      />
      <path
        d="M 20 30 Q 26 28 32 30 M 22 33 Q 28 31 32 33"
        stroke="#E74C3C"
        strokeWidth="0.6"
        fill="none"
      />

      {/* ─── Neck connecting body to head ─── */}
      <path
        d="M 36 28 Q 40 22 42 18"
        stroke="#C0392B"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* ─── Head ─── */}
      <circle cx="42" cy="16" r="6" fill="#C0392B" />
      {/* Cheek highlight */}
      <circle cx="40" cy="18" r="2" fill="#E74C3C" />

      {/* ─── Crest plumes on top of the head ─── */}
      <path
        d="M 40 10 Q 38 4 34 2"
        stroke="#C0392B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 42 9 Q 42 2 38 0"
        stroke="#E74C3C"
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

      {/* ─── Beak — pointing right ─── */}
      <path d="M 48 15 L 56 16 L 48 18 Z" fill="#F39C12" />
      <path d="M 48 16.5 L 55 16.5" stroke="#C0392B" strokeWidth="0.5" />

      {/* ─── Legs ─── */}
      <line
        x1="22"
        y1="46"
        x2="20"
        y2="58"
        stroke="#922B21"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="46"
        x2="30"
        y2="58"
        stroke="#922B21"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Toes */}
      <path
        d="M 18 58 L 20 58 L 22 58 M 20 58 L 20 60"
        stroke="#922B21"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 28 58 L 30 58 L 32 58 M 30 58 L 30 60"
        stroke="#922B21"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* ─── Perch (small branch) ─── */}
      <line
        x1="14"
        y1="60"
        x2="36"
        y2="60"
        stroke="#7D3C0E"
        strokeWidth="2"
        strokeLinecap="round"
      />
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
      {cells.map(([row, col], i) => (
        <span
          key={i}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            // Red center inside a thin black ring
            background:
              "radial-gradient(circle at 35% 35%, #E74C3C 0%, #8B1F18 60%, #1A1A1A 65%, #1A1A1A 100%)",
            gridRow: row,
            gridColumn: col,
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        />
      ))}
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
    // The "Soap" tile — a clean rectangle outline with ornate border
    const w = Math.round(size.w * 0.65);
    const h = Math.round(size.h * 0.5);
    return (
      <svg viewBox="0 0 48 36" width={w} height={h} aria-hidden="true">
        <rect x="2" y="2" width="44" height="32" rx="3" fill="none" stroke="#1A1A1A" strokeWidth="2.5" />
        <rect x="6" y="6" width="36" height="24" rx="2" fill="none" stroke="#1A1A1A" strokeWidth="1" />
        {/* Corner ornaments */}
        <circle cx="6" cy="6" r="1.5" fill="#1A1A1A" />
        <circle cx="42" cy="6" r="1.5" fill="#1A1A1A" />
        <circle cx="6" cy="30" r="1.5" fill="#1A1A1A" />
        <circle cx="42" cy="30" r="1.5" fill="#1A1A1A" />
      </svg>
    );
  }

  const color = value === "red" ? "#C0392B" : "#1E8449";
  const dragonSize = Math.round(size.h * 0.6);

  return (
    <svg viewBox="0 0 64 64" width={dragonSize} height={dragonSize} aria-hidden="true">
      {/* ─── Coiling serpentine body ─── */}
      <path
        d="M 48 12 Q 56 18 52 28 Q 48 36 36 34 Q 24 32 18 40 Q 12 48 20 54 Q 30 60 40 56 Q 48 52 44 44"
        stroke={color}
        strokeWidth="6.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ─── Head (profile, facing right) ─── */}
      {/* Skull */}
      <path
        d="M 48 12 Q 54 8 58 4 Q 60 8 56 12 Q 54 14 50 14 Q 48 14 48 12"
        fill={color}
      />
      {/* Open jaw */}
      <path
        d="M 50 14 Q 56 16 60 14"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Eye */}
      <circle cx="53" cy="9" r="1.3" fill="#FAF7EC" />
      <circle cx="53.3" cy="9.2" r="0.6" fill="#1A1A2E" />

      {/* Horn */}
      <path
        d="M 50 6 Q 48 2 52 0"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Whisker / beard */}
      <path
        d="M 56 12 Q 60 16 62 14"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />

      {/* ─── Spine ridges ─── */}
      <path
        d="M 52 20 L 55 18 M 50 26 L 53 24 M 46 32 L 48 29"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ─── Front leg with claws ─── */}
      <path
        d="M 34 34 L 30 28 M 30 28 L 28 26 M 30 28 L 32 26"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ─── Rear leg with claws ─── */}
      <path
        d="M 26 50 L 22 56 M 22 56 L 20 58 M 22 56 L 24 58"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ─── Tail curl ─── */}
      <path
        d="M 44 44 Q 40 40 42 36"
        stroke={color}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Tail flame tip */}
      <path
        d="M 42 36 Q 40 32 42 30 Q 44 34 42 36"
        fill={color}
      />

      {/* ─── Scale texture ─── */}
      <path
        d="M 52 22 Q 50 24 48 22 M 44 30 Q 42 32 40 30 M 30 36 Q 28 38 26 36 M 22 44 Q 20 46 18 44 M 26 52 Q 28 54 30 52 M 36 56 Q 38 54 40 56"
        stroke={color}
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
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
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <g fill="#E91E63">
        <circle cx="32" cy="18" r="9" />
        <circle cx="48" cy="28" r="9" />
        <circle cx="42" cy="46" r="9" />
        <circle cx="22" cy="46" r="9" />
        <circle cx="16" cy="28" r="9" />
      </g>
      <circle cx="32" cy="32" r="6" fill="#FFD700" />
    </svg>
  );
}

function OrchidSVG({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <ellipse cx="32" cy="20" rx="8" ry="14" fill="#9B59B6" />
      <ellipse cx="18" cy="32" rx="14" ry="8" fill="#AF7AC5" />
      <ellipse cx="46" cy="32" rx="14" ry="8" fill="#AF7AC5" />
      <ellipse cx="32" cy="44" rx="8" ry="14" fill="#9B59B6" />
      <circle cx="32" cy="32" r="5" fill="#F1C40F" />
    </svg>
  );
}

function ChrysanthemumSVG({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <g fill="#E67E22">
        <ellipse cx="32" cy="10" rx="4" ry="10" />
        <ellipse cx="32" cy="54" rx="4" ry="10" />
        <ellipse cx="10" cy="32" rx="10" ry="4" />
        <ellipse cx="54" cy="32" rx="10" ry="4" />
        <ellipse cx="16" cy="16" rx="4" ry="9" transform="rotate(-45 16 16)" />
        <ellipse cx="48" cy="16" rx="4" ry="9" transform="rotate(45 48 16)" />
        <ellipse cx="16" cy="48" rx="4" ry="9" transform="rotate(45 16 48)" />
        <ellipse cx="48" cy="48" rx="4" ry="9" transform="rotate(-45 48 48)" />
      </g>
      <circle cx="32" cy="32" r="7" fill="#F39C12" />
      <circle cx="32" cy="32" r="3" fill="#7D3C0E" />
    </svg>
  );
}

function SunflowerSVG({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* 12 yellow petals radiating from center */}
      <g fill="#F1C40F">
        <ellipse cx="32" cy="8" rx="3.5" ry="8" />
        <ellipse cx="44" cy="11" rx="3.5" ry="8" transform="rotate(30 44 11)" />
        <ellipse cx="53" cy="20" rx="3.5" ry="8" transform="rotate(60 53 20)" />
        <ellipse cx="56" cy="32" rx="3.5" ry="8" transform="rotate(90 56 32)" />
        <ellipse cx="53" cy="44" rx="3.5" ry="8" transform="rotate(120 53 44)" />
        <ellipse cx="44" cy="53" rx="3.5" ry="8" transform="rotate(150 44 53)" />
        <ellipse cx="32" cy="56" rx="3.5" ry="8" />
        <ellipse cx="20" cy="53" rx="3.5" ry="8" transform="rotate(-150 20 53)" />
        <ellipse cx="11" cy="44" rx="3.5" ry="8" transform="rotate(-120 11 44)" />
        <ellipse cx="8" cy="32" rx="3.5" ry="8" transform="rotate(-90 8 32)" />
        <ellipse cx="11" cy="20" rx="3.5" ry="8" transform="rotate(-60 11 20)" />
        <ellipse cx="20" cy="11" rx="3.5" ry="8" transform="rotate(-30 20 11)" />
      </g>
      {/* Dark brown seed-head center */}
      <circle cx="32" cy="32" r="9" fill="#7D3C0E" />
      <circle cx="32" cy="32" r="6" fill="#4E2509" />
    </svg>
  );
}

function TulipSVG({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      {/* Tulip bud — closed 3-petal silhouette in magenta */}
      <path
        d="M22 38 Q22 14 32 10 Q42 14 42 38 Q42 46 32 46 Q22 46 22 38 Z"
        fill="#C2185B"
      />
      {/* Petal separation lines */}
      <path d="M32 10 L32 46" stroke="#7A0F37" strokeWidth="0.8" />
      <path
        d="M27 14 Q26 30 28 44"
        stroke="#7A0F37"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M37 14 Q38 30 36 44"
        stroke="#7A0F37"
        strokeWidth="0.5"
        fill="none"
      />
      {/* Stem */}
      <path
        d="M32 46 L32 60"
        stroke="#27AE60"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Leaf */}
      <path
        d="M32 52 Q22 52 18 44"
        stroke="#27AE60"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SummerSVG({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <circle cx="32" cy="32" r="13" fill="#F39C12" />
      <g stroke="#E67E22" strokeWidth="3" strokeLinecap="round">
        <line x1="32" y1="6" x2="32" y2="14" />
        <line x1="32" y1="50" x2="32" y2="58" />
        <line x1="6" y1="32" x2="14" y2="32" />
        <line x1="50" y1="32" x2="58" y2="32" />
        <line x1="13" y1="13" x2="19" y2="19" />
        <line x1="45" y1="45" x2="51" y2="51" />
        <line x1="13" y1="51" x2="19" y2="45" />
        <line x1="45" y1="19" x2="51" y2="13" />
      </g>
    </svg>
  );
}

function AutumnSVG({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path
        d="M32 8 L36 18 L46 14 L42 26 L54 28 L44 36 L52 46 L38 44 L36 56 L32 48 L28 56 L26 44 L12 46 L20 36 L10 28 L22 26 L18 14 L28 18 Z"
        fill="#C0392B"
      />
      <line x1="32" y1="32" x2="32" y2="56" stroke="#7D3C0E" strokeWidth="2" />
    </svg>
  );
}

function WinterSVG({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <g stroke="#3498DB" strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="32" y1="6" x2="32" y2="58" />
        <line x1="6" y1="32" x2="58" y2="32" />
        <line x1="13" y1="13" x2="51" y2="51" />
        <line x1="13" y1="51" x2="51" y2="13" />
        <line x1="32" y1="10" x2="28" y2="14" />
        <line x1="32" y1="10" x2="36" y2="14" />
        <line x1="32" y1="54" x2="28" y2="50" />
        <line x1="32" y1="54" x2="36" y2="50" />
        <line x1="10" y1="32" x2="14" y2="28" />
        <line x1="10" y1="32" x2="14" y2="36" />
        <line x1="54" y1="32" x2="50" y2="28" />
        <line x1="54" y1="32" x2="50" y2="36" />
      </g>
      <circle cx="32" cy="32" r="3" fill="#3498DB" />
    </svg>
  );
}

const FLOWER_SVGS = [PlumSVG, OrchidSVG, ChrysanthemumSVG, SunflowerSVG];
const SEASON_SVGS = [TulipSVG, SummerSVG, AutumnSVG, WinterSVG];

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
