import { Tile } from "@/components/Tile";

const DECO_TILES: { type: "bam" | "crack" | "dot" | "wind" | "dragon" | "joker"; value?: number | string }[] = [
  { type: "crack", value: 1 },
  { type: "bam", value: 8 },
  { type: "dragon", value: "red" },
  { type: "dot", value: 5 },
  { type: "joker" },
];

export function Cover({
  eyebrow,
  title,
  highlight,
  subtitle,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <header className="relative -mt-4 mb-2 overflow-hidden rounded-xl bg-gradient-to-br from-[#1A4D2E] via-[#1F5A35] to-[#0F3320] px-4 py-2.5 sm:px-6 sm:py-3 text-center text-white shadow-sm">
        {eyebrow && (
          <div className="mb-1 text-[11px] sm:text-[12px] font-bold uppercase tracking-[3px] text-[#C8A951]">
            {eyebrow}
          </div>
        )}
        <h1 className="font-serif text-xl sm:text-2xl font-black">
          {title} {highlight && <span className="text-[#C8A951]">{highlight}</span>}
        </h1>
      </header>
    );
  }
  return (
    <header className="relative mb-8 sm:mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A4D2E] via-[#1F5A35] to-[#0F3320] px-4 py-8 sm:px-6 sm:py-14 md:py-16 text-center text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
      {/* Subtle radial glow for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,169,81,0.08), transparent 70%)",
        }}
      />

      {/* Decorative mini tiles */}
      <div className="relative z-10 mb-3 sm:mb-4 flex items-center justify-center gap-1 sm:gap-1.5">
        {DECO_TILES.map((t, i) => (
          <div
            key={i}
            style={{ transform: `rotate(${(i - 2) * 5}deg)` }}
          >
            <Tile type={t.type} value={t.value} size="sm" />
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {eyebrow && (
          <div className="mb-2 sm:mb-3 text-[12px] sm:text-[13px] font-bold uppercase tracking-[3px] sm:tracking-[5px] text-[#C8A951]">
            {eyebrow}
          </div>
        )}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black">
          {title} {highlight && <span className="text-[#C8A951]">{highlight}</span>}
        </h1>
        {/* Decorative gold divider */}
        <div className="mx-auto mt-3 sm:mt-4 h-px w-20 sm:w-24 bg-[#C8A951]/30" />
        {subtitle && (
          <p className="mt-2 sm:mt-3 text-[14px] sm:text-[15px] italic text-white/70">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
