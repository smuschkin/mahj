"use client";

import { BotPlayer, DiscardEntry } from "@/lib/playReducer";
import { TileData } from "@/lib/tiles";
import { Tile } from "@/components/Tile";

type GameTableProps = {
  bots: [BotPlayer, BotPlayer, BotPlayer];
  discardPile: TileData[];
  discardLog: DiscardEntry[];
  activeBotIndex: number | null;
  callingWindow: boolean;
  /** True when it's the player's turn (East) */
  playerActive?: boolean;
  /** Player's hand size (East), shown in the East seat indicator */
  playerHandSize?: number;
};

/**
 * Shows the 3 bots positioned around the table (South right, West top, North left)
 * with a central discard area. The player's seat (East) is at the bottom and rendered
 * separately in PlayRound.
 */
export function GameTable({
  bots,
  discardPile,
  discardLog,
  activeBotIndex,
  callingWindow,
  playerActive = false,
  playerHandSize = 0,
}: GameTableProps) {
  // bots[0] = South, bots[1] = West, bots[2] = North
  const south = bots[0];
  const west = bots[1];
  const north = bots[2];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1A4D2E] via-[#1F5A35] to-[#0F3320] p-3 shadow-lg sm:p-4">
      <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] gap-2 min-h-[300px]">
        {/* Top-left spacer */}
        <div />

        {/* Top: West */}
        <BotSeat
          bot={west}
          position="top"
          isActive={activeBotIndex === 2}
        />

        {/* Top-right spacer */}
        <div />

        {/* Left: North */}
        <BotSeat
          bot={north}
          position="left"
          isActive={activeBotIndex === 3}
        />

        {/* Center: Discard pool */}
        <div className="flex items-center justify-center">
          <DiscardCenter
            discardPile={discardPile}
            discardLog={discardLog}
            callingWindow={callingWindow}
          />
        </div>

        {/* Right: South */}
        <BotSeat
          bot={south}
          position="right"
          isActive={activeBotIndex === 1}
        />

        {/* Bottom: East (You) indicator */}
        <div />
        <EastSeat isActive={playerActive} handSize={playerHandSize} />
        <div />
      </div>
    </div>
  );
}

/* ───── East seat (the player — just a name badge since the real hand is below) ───── */

function EastSeat({ isActive, handSize }: { isActive: boolean; handSize: number }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black shadow-md ${
          isActive
            ? "bg-[#C8A951] text-[#0F3320] ring-2 ring-[#C8A951]/60"
            : "bg-black/30 text-[#C8A951]/90"
        }`}
      >
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#C8A951] text-[9px] font-black text-[#0F3320]">
          E
        </span>
        <span className="font-serif">You</span>
        <span className="rounded-full bg-[#0F3320]/30 px-1.5 py-0 text-[10px]">
          {handSize}
        </span>
        {isActive && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0F3320]" />}
      </div>
    </div>
  );
}

/* ───── Bot seat (shows rack back + exposed groups + name badge) ───── */

const SEAT_COLORS: Record<number, string> = {
  1: "bg-emerald-500/90 text-white",  // South
  2: "bg-sky-500/90 text-white",       // West
  3: "bg-rose-500/90 text-white",      // North
};

function BotSeat({
  bot,
  position,
  isActive,
}: {
  bot: BotPlayer;
  position: "top" | "left" | "right";
  isActive: boolean;
}) {
  const handSize = bot.hand.length;

  const seatIdx =
    bot.name === "South" ? 1 : bot.name === "West" ? 2 : 3;

  // Show tile backs matching hand size, capped at 13 for display
  const tilesShown = Math.min(handSize, 13);

  const orientation =
    position === "top" ? "horizontal" : position === "left" ? "vertical" : "vertical";

  return (
    <div
      className={`flex ${
        position === "top" ? "flex-col items-center" :
        position === "left" ? "flex-col items-start" :
        "flex-col items-end"
      } gap-1.5`}
    >
      {/* Name + hand count badge */}
      <div
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black shadow-md ${
          isActive ? SEAT_COLORS[seatIdx] + " ring-2 ring-[#C8A951]" : "bg-black/30 text-white/80"
        }`}
      >
        <span className="font-serif">{bot.name}</span>
        <span className="rounded-full bg-white/30 px-1.5 py-0 text-[10px] text-white">
          {handSize}
        </span>
        {isActive && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C8A951]" />}
      </div>

      {/* Rack of face-down tiles */}
      <div
        className={`flex rounded-md bg-[#0F3320] p-1 shadow-inner ${
          orientation === "horizontal" ? "flex-row gap-0.5" : "flex-col gap-0.5"
        }`}
      >
        {Array.from({ length: tilesShown }).map((_, i) => (
          <TileBack key={i} orientation={orientation} />
        ))}
      </div>

      {/* Exposed groups */}
      {bot.exposedGroups.length > 0 && (
        <div
          className={`flex gap-1 ${
            orientation === "vertical" ? "flex-col" : "flex-row"
          }`}
        >
          {bot.exposedGroups.map((group, gi) => (
            <div
              key={gi}
              className={`flex gap-px rounded bg-white/10 p-0.5 ${
                orientation === "vertical" ? "flex-col" : ""
              }`}
            >
              {group.tiles.map((tile) => (
                <Tile
                  key={tile.id}
                  type={tile.type}
                  value={tile.value}
                  size="sm"
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** A single face-down tile showing the back of a mahjong tile. */
function TileBack({ orientation }: { orientation: "horizontal" | "vertical" }) {
  const w = orientation === "horizontal" ? 14 : 10;
  const h = orientation === "horizontal" ? 20 : 14;
  return (
    <div
      className="rounded-sm shadow-sm"
      style={{
        width: w,
        height: h,
        background: "linear-gradient(135deg, #2D8B5E 0%, #1A4D2E 50%, #0F3320 100%)",
        border: "0.5px solid #0F3320",
      }}
    />
  );
}

/* ───── Discard center (all 4 seats' discards together in a grid) ───── */

function DiscardCenter({
  discardPile,
  discardLog,
  callingWindow,
}: {
  discardPile: TileData[];
  discardLog: DiscardEntry[];
  callingWindow: boolean;
}) {
  const lastIndex = discardPile.length - 1;

  if (discardPile.length === 0) {
    return (
      <div className="flex h-32 w-full items-center justify-center rounded-lg border border-white/10 bg-black/20">
        <p className="text-center text-[11px] italic text-white/40">
          No discards yet
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-white/10 bg-black/25 p-2 shadow-inner">
      <p className="mb-1 text-center text-[9px] font-bold uppercase tracking-wider text-white/50">
        Discard Pool &middot; {discardPile.length} {discardPile.length === 1 ? "tile" : "tiles"}
      </p>
      <div className="flex max-h-32 flex-wrap justify-center gap-0.5 overflow-y-auto">
        {discardPile.map((tile, i) => {
          const isLast = i === lastIndex;
          const entry = discardLog[i];
          const seatColor =
            entry?.by === 0 ? "ring-[#C8A951]" :
            entry?.by === 1 ? "ring-emerald-400" :
            entry?.by === 2 ? "ring-sky-400" :
            "ring-rose-400";
          return (
            <div
              key={`${tile.id}-${i}`}
              className={`rounded ${isLast && callingWindow ? "animate-pulse ring-2 ring-[#C8A951]" : ""} ${isLast ? `ring-1 ${seatColor}` : ""}`}
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
}
