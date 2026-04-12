import { Tile } from "./Tile";

export function WinningHandTeaser() {
  const groups: { tiles: number[]; label: string }[] = [
    { tiles: [1, 1, 1], label: "Group of 3" },
    { tiles: [2, 2, 2], label: "Group of 3" },
    { tiles: [3, 3, 3], label: "Group of 3" },
    { tiles: [4, 4, 4], label: "Group of 3" },
    { tiles: [5, 5], label: "Pair" },
  ];

  return (
    <div className="my-6 rounded-2xl border-2 border-[var(--color-accent)] bg-gradient-to-br from-[#E8F5EC] to-[#D0E8D6] p-7 shadow-[0_6px_18px_rgba(45,139,94,0.15)]">
      <h3 className="font-serif text-xl md:text-2xl font-black text-[var(--color-mid)]">
        🏆 What a winning hand looks like
      </h3>
      <p className="mt-1 mb-4 text-sm text-zinc-600">
        You don&apos;t need to understand this yet — just so you have a target in mind. A
        winning hand is <strong>14 tiles</strong>{" "}arranged in groups. Here&apos;s one
        example:
      </p>

      <div className="flex flex-wrap items-end justify-center gap-3 my-4">
        {groups.map((group, gi) => (
          <div
            key={gi}
            className="flex flex-col items-center gap-2 rounded-md bg-white/60 p-2"
          >
            <div className="flex gap-1">
              {group.tiles.map((value, ti) => (
                <Tile key={ti} type="bam" value={value} size="sm" />
              ))}
            </div>
            <span className="text-[13px] uppercase tracking-wider text-[#7D6608] font-bold">
              {group.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-xs italic text-[#7D6608]">
        Four groups of three identical tiles, plus one pair. We&apos;ll dive into the
        details in Module 6.
      </p>
    </div>
  );
}
