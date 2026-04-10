"use client";

import { BotPlayer } from "@/lib/playReducer";
import { Tile } from "@/components/Tile";

type BotIndicatorProps = {
  bots: [BotPlayer, BotPlayer, BotPlayer];
  activeBotIndex: number | null;
};

export function BotIndicator({ bots, activeBotIndex }: BotIndicatorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {bots.map((bot, i) => {
        const isActive = activeBotIndex === i + 1;
        return (
          <div key={bot.seatWind} className="flex flex-col items-center gap-1">
            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                isActive
                  ? "bg-[#C8A951]/20 text-[#C8A951] ring-1 ring-[#C8A951]/40"
                  : "bg-white/10 text-white/70"
              }`}
            >
              <span className="font-serif font-bold">{bot.name}</span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
                  isActive
                    ? "bg-[#C8A951] text-[#0F3320]"
                    : "bg-white/20 text-white/80"
                }`}
              >
                {bot.hand.length}
              </span>
              {bot.exposedGroups.length > 0 && (
                <span className="text-[10px] text-white/50">
                  +{bot.exposedGroups.length}
                </span>
              )}
              {isActive && (
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C8A951]" />
              )}
            </div>
            {/* Show bot exposed groups */}
            {bot.exposedGroups.length > 0 && (
              <div className="flex gap-1">
                {bot.exposedGroups.map((group, gi) => (
                  <div
                    key={gi}
                    className="flex gap-px rounded bg-white/10 px-0.5 py-0.5"
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
      })}
    </div>
  );
}
