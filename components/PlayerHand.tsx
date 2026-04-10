"use client";

import { TileData } from "@/lib/tiles";
import { ExposedGroup } from "@/lib/calling";
import { Tile } from "@/components/Tile";

type PlayerHandProps = {
  hand: TileData[];
  selectedTileId: number | null;
  drawnTile: TileData | null;
  disabled: boolean;
  onSelect: (tileId: number) => void;
  exposedGroups?: ExposedGroup[];
};

export function PlayerHand({
  hand,
  selectedTileId,
  drawnTile,
  disabled,
  onSelect,
  exposedGroups = [],
}: PlayerHandProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div
        className="flex items-end gap-1 px-2"
        style={{ minWidth: "min-content" }}
      >
        {hand.map((tile) => (
          <Tile
            key={tile.id}
            type={tile.type}
            value={tile.value}
            size="sm"
            selected={tile.id === selectedTileId}
            highlighted={drawnTile?.id === tile.id}
            onClick={disabled ? undefined : () => onSelect(tile.id)}
          />
        ))}

        {exposedGroups.length > 0 && (
          <>
            <div className="mx-1 h-10 w-px bg-white/20" />
            {exposedGroups.map((group, gi) => (
              <div key={gi} className="flex gap-0.5 rounded bg-white/10 px-1 py-0.5">
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
          </>
        )}
      </div>
    </div>
  );
}
