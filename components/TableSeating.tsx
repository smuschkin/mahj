type Seat = "east" | "south" | "west" | "north";

const LABELS: Record<Seat, { letter: string; full: string }> = {
  east: { letter: "E", full: "East · Dealer" },
  south: { letter: "S", full: "South" },
  west: { letter: "W", full: "West" },
  north: { letter: "N", full: "North" },
};

/**
 * Round mahjong table with 4 seats arranged in play order.
 *
 * Play goes counter-clockwise: East → South → West → North.
 * Seat positions (from East's perspective facing center):
 *   - South sits to East's PHYSICAL RIGHT (top of diagram)
 *   - West sits ACROSS (left of diagram)
 *   - North sits to East's PHYSICAL LEFT (bottom of diagram)
 */
export function TableSeating({
  highlight = "east",
  centerLabel,
}: {
  highlight?: Seat;
  centerLabel?: string;
}) {
  const positions: Record<Seat, string> = {
    south: "top-0 left-1/2 -translate-x-1/2",
    east: "top-[108px] right-0",
    north: "bottom-0 left-1/2 -translate-x-1/2",
    west: "top-[108px] left-0",
  };

  return (
    <div className="relative mx-auto my-6 h-[240px] w-[240px] sm:h-[280px] sm:w-[280px]">
      {/* Felt center */}
      <div
        className="absolute left-1/2 top-1/2 flex h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center font-serif text-[13px] tracking-wider text-[var(--color-accent)] shadow-[inset_0_0_20px_rgba(0,0,0,0.4),0_6px_14px_rgba(0,0,0,0.2)]"
        style={{
          background: "radial-gradient(circle at 50% 40%, #196F3D, #0E4F26)",
        }}
      >
        {centerLabel && <span>{centerLabel}</span>}
      </div>

      {/* Seats */}
      {(Object.keys(LABELS) as Seat[]).map((seat) => {
        const isHighlight = seat === highlight;
        return (
          <div
            key={seat}
            className={`absolute flex h-16 w-[74px] flex-col items-center justify-center rounded-xl border-2 shadow-[0_3px_8px_rgba(0,0,0,0.15)] ${positions[seat]} ${
              isHighlight
                ? "border-[var(--color-accent)] bg-[#E8F5EC]"
                : "border-[var(--color-mid)] bg-[#FAF7EC]"
            }`}
          >
            <div
              className={`font-serif text-2xl font-black leading-none ${
                isHighlight ? "text-[var(--color-accent)]" : "text-[var(--color-mid)]"
              }`}
            >
              {LABELS[seat].letter}
            </div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500">
              {LABELS[seat].full}
            </div>
          </div>
        );
      })}
    </div>
  );
}
