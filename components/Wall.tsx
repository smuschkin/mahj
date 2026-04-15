/**
 * Top-down view of a mahjong table mid-setup. Shows:
 *   - 4 walls (19 tiles each, arranged in a square around the play area)
 *   - 4 racks (the wooden trays where each player holds their tiles, sitting
 *     between the player and their wall)
 *
 * Layout:
 *   - South sits at the TOP of the diagram (one seat counter-clockwise from East)
 *   - East sits to the right
 *   - North sits at the bottom
 *   - West sits to the left
 *
 * Grid columns:  [W rack][W wall][   center   ][E wall][E rack]
 * Grid rows:     [S rack][S wall][   center   ][N wall][N rack]
 */
export function Wall() {
  return (
    <div
      className="my-5 overflow-x-auto rounded-xl p-3 sm:p-6"
      style={{ background: "linear-gradient(135deg, #1A4D2E, #0F3320)" }}
    >
      <div className="mx-auto" style={{ width: "fit-content", maxWidth: "100%" }}>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "14px 8px 200px 8px 14px",
            gridTemplateRows: "14px 8px 200px 8px 14px",
          }}
        >
          {/* Row 1: empty | empty | S rack | empty | empty */}
          <div />
          <div />
          <Rack orientation="horizontal" label="S" />
          <div />
          <div />

          {/* Row 2: empty | empty | S wall | empty | empty */}
          <div />
          <div />
          <div className="flex">
            {Array.from({ length: 19 }).map((_, i) => (
              <TileH key={i} />
            ))}
          </div>
          <div />
          <div />

          {/* Row 3: W rack | W wall | play area | E wall | E rack */}
          <Rack orientation="vertical" label="W" />
          <div className="flex flex-col">
            {Array.from({ length: 19 }).map((_, i) => (
              <TileV key={i} />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
              Play Area
            </span>
          </div>
          <div className="flex flex-col">
            {Array.from({ length: 19 }).map((_, i) => (
              <TileV key={i} />
            ))}
          </div>
          <Rack orientation="vertical" label="E" />

          {/* Row 4: empty | empty | N wall | empty | empty */}
          <div />
          <div />
          <div className="flex">
            {Array.from({ length: 19 }).map((_, i) => (
              <TileH key={i} />
            ))}
          </div>
          <div />
          <div />

          {/* Row 5: empty | empty | N rack | empty | empty */}
          <div />
          <div />
          <Rack orientation="horizontal" label="N" />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

function TileH() {
  // 14 wide × 10 tall — "lying flat" in horizontal walls
  return (
    <span className="block h-2.5 w-3.5 shrink-0 rounded-[1.5px] border border-[#C9BC8A] bg-[#FAF7EC] shadow-sm" />
  );
}

function TileV() {
  // 10 wide × 14 tall — "standing up" in vertical walls
  return (
    <span className="block h-3.5 w-2.5 shrink-0 rounded-[1.5px] border border-[#C9BC8A] bg-[#FAF7EC] shadow-sm" />
  );
}

function Rack({
  orientation,
  label,
}: {
  orientation: "horizontal" | "vertical";
  label: string;
}) {
  return (
    <div
      className="relative flex items-center justify-center rounded-[3px] shadow-[inset_0_0_4px_rgba(0,0,0,0.4)]"
      style={{
        background: "linear-gradient(135deg, #8B5A2B, #6B3F1A)",
        width: "100%",
        height: "100%",
        writingMode: orientation === "vertical" ? "vertical-rl" : undefined,
      }}
      aria-label={`${label} rack`}
    >
      <span
        className="font-serif text-[13px] font-black leading-none text-[var(--color-accent)]"
        style={{
          transform: orientation === "vertical" ? "rotate(180deg)" : undefined,
        }}
      >
        {label}
      </span>
    </div>
  );
}
