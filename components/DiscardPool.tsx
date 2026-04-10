"use client";

import { TileData } from "@/lib/tiles";
import { DiscardEntry } from "@/lib/playReducer";
import { Tile } from "@/components/Tile";

const SEAT_NAMES: Record<number, string> = {
  0: "You",
  1: "South",
  2: "West",
  3: "North",
};
const SEAT_LABELS: Record<number, string> = {
  0: "E",
  1: "S",
  2: "W",
  3: "N",
};
const SEAT_COLORS: Record<number, string> = {
  0: "text-[#C8A951]",
  1: "text-emerald-300",
  2: "text-sky-300",
  3: "text-rose-300",
};
const SEAT_BG_COLORS: Record<number, string> = {
  0: "border-[#C8A951]/30",
  1: "border-emerald-300/30",
  2: "border-sky-300/30",
  3: "border-rose-300/30",
};

type DiscardPoolProps = {
  tiles: TileData[];
  discardLog?: DiscardEntry[];
  callingWindow?: boolean;
};

export function DiscardPool({
  tiles,
  discardLog = [],
  callingWindow = false,
}: DiscardPoolProps) {
  if (tiles.length === 0) {
    return (
      <div className="flex h-24 items-center justify-center rounded-lg border border-white/10 bg-white/5">
        <p className="text-sm italic text-white/40">No discards yet</p>
      </div>
    );
  }

  // Group discards by seat for the organized view
  const bySeat: Record<number, { tile: TileData; index: number }[]> = { 0: [], 1: [], 2: [], 3: [] };
  discardLog.forEach((entry, i) => {
    bySeat[entry.by]?.push({ tile: tiles[i], index: i });
  });

  const lastIndex = tiles.length - 1;

  return (
    <div className="max-h-52 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-2">
      {/* Grouped by seat */}
      <div className="space-y-1.5">
        {([0, 1, 2, 3] as const).map((seat) => {
          const entries = bySeat[seat];
          if (entries.length === 0) return null;
          return (
            <div key={seat} className={`rounded-md border-l-2 ${SEAT_BG_COLORS[seat]} py-1 pl-2`}>
              <div className="mb-0.5 flex items-center gap-1">
                <span className={`text-[13px] font-black uppercase tracking-wider ${SEAT_COLORS[seat]}`}>
                  {SEAT_NAMES[seat]} ({SEAT_LABELS[seat]})
                </span>
                <span className="text-[13px] text-white/30">
                  {entries.length} tile{entries.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-0.5">
                {entries.map(({ tile, index }) => {
                  const isLast = index === lastIndex;
                  return (
                    <div
                      key={`${tile.id}-${index}`}
                      className={
                        isLast && callingWindow
                          ? "animate-pulse rounded ring-2 ring-[#C8A951]"
                          : ""
                      }
                    >
                      <Tile
                        type={tile.type}
                        value={tile.value}
                        size="sm"
                        highlighted={isLast}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
