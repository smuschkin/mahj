"use client";

import { useState, useRef } from "react";
import { TileData } from "@/lib/tiles";
import { ExposedGroup } from "@/lib/calling";
import { Tile } from "@/components/Tile";

type PlayerHandProps = {
  hand: TileData[];
  selectedTileId: number | null;
  drawnTile: TileData | null;
  disabled: boolean;
  onSelect: (tileId: number) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  exposedGroups?: ExposedGroup[];
};

export function PlayerHand({
  hand,
  selectedTileId,
  drawnTile,
  disabled,
  onSelect,
  onReorder,
  exposedGroups = [],
}: PlayerHandProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  // Track whether a drag actually moved the tile (vs just a click)
  const movedRef = useRef(false);

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    if (!onReorder) return;
    setDragIndex(index);
    movedRef.current = false;
    e.dataTransfer.effectAllowed = "move";
    // Firefox requires data to be set for drag to work
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (index: number) => (e: React.DragEvent) => {
    if (dragIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overIndex !== index) {
      setOverIndex(index);
      if (index !== dragIndex) movedRef.current = true;
    }
  };

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragIndex !== null && onReorder && dragIndex !== index) {
      onReorder(dragIndex, index);
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  // Touch support — track touch start and manually handle drag via touchmove
  const [touchStart, setTouchStart] = useState<{ index: number; x: number } | null>(null);

  const handleTouchStart = (index: number) => (e: React.TouchEvent) => {
    if (!onReorder) return;
    const touch = e.touches[0];
    setTouchStart({ index, x: touch.clientX });
    movedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStart.x;
    // Estimate tile width ~38px (sm tile + gap)
    const delta = Math.round(dx / 38);
    if (Math.abs(delta) >= 1) {
      const newIndex = Math.max(0, Math.min(hand.length - 1, touchStart.index + delta));
      if (newIndex !== touchStart.index) {
        setDragIndex(touchStart.index);
        setOverIndex(newIndex);
        movedRef.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchStart && dragIndex !== null && overIndex !== null && dragIndex !== overIndex && onReorder) {
      onReorder(dragIndex, overIndex);
    }
    setTouchStart(null);
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleTileClick = (tileId: number) => {
    // Don't fire select if the user was dragging
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    if (!disabled) onSelect(tileId);
  };

  return (
    <div
      className="w-full overflow-x-auto pb-2"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex items-end gap-1 px-2"
        style={{ minWidth: "min-content" }}
      >
        {hand.map((tile, index) => {
          const isDragging = dragIndex === index;
          const isOver = overIndex === index && dragIndex !== index;
          return (
            <div
              key={tile.id}
              draggable={!!onReorder}
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver(index)}
              onDrop={handleDrop(index)}
              onDragEnd={handleDragEnd}
              onTouchStart={handleTouchStart(index)}
              className={`transition-all ${
                isDragging ? "opacity-30 scale-95" : ""
              } ${isOver ? "-translate-x-1 border-l-2 border-[#C8A951]" : ""}`}
              style={{ touchAction: onReorder ? "none" : "auto" }}
            >
              <Tile
                type={tile.type}
                value={tile.value}
                size="sm"
                selected={tile.id === selectedTileId}
                highlighted={drawnTile?.id === tile.id}
                onClick={() => handleTileClick(tile.id)}
              />
            </div>
          );
        })}

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
