type DieValue = 1 | 2 | 3 | 4 | 5 | 6;
type DieSize = "sm" | "md" | "lg";

const SIZE: Record<DieSize, { box: number; pip: number; gap: number }> = {
  sm: { box: 36, pip: 6, gap: 4 },
  md: { box: 56, pip: 9, gap: 6 },
  lg: { box: 72, pip: 12, gap: 8 },
};

// Pip positions per die value (3x3 grid: row, col)
const PIPS: Record<DieValue, [number, number][]> = {
  1: [[2, 2]],
  2: [[1, 1], [3, 3]],
  3: [[1, 1], [2, 2], [3, 3]],
  4: [[1, 1], [1, 3], [3, 1], [3, 3]],
  5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
  6: [[1, 1], [2, 1], [3, 1], [1, 3], [2, 3], [3, 3]],
};

export function Die({ value, size = "md" }: { value: DieValue; size?: DieSize }) {
  const cfg = SIZE[size];
  const pips = PIPS[value];
  return (
    <div
      role="img"
      aria-label={`Die showing ${value}`}
      className="relative shrink-0 rounded-lg border-2 border-[var(--color-mid)] bg-white shadow-[0_3px_8px_rgba(0,0,0,0.2)]"
      style={{ width: cfg.box, height: cfg.box, padding: cfg.gap }}
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(3, 1fr)`,
          gridTemplateRows: `repeat(3, 1fr)`,
        }}
      >
        {pips.map(([row, col], i) => (
          <span
            key={i}
            className="rounded-full bg-[var(--color-dark)]"
            style={{
              gridRow: row,
              gridColumn: col,
              width: cfg.pip,
              height: cfg.pip,
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function DicePair({
  values,
  size = "md",
  showSum = true,
}: {
  values: [DieValue, DieValue];
  size?: DieSize;
  showSum?: boolean;
}) {
  const sum = values[0] + values[1];
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <Die value={values[0]} size={size} />
      <span className="font-serif text-xl font-black text-[var(--color-mid)]">+</span>
      <Die value={values[1]} size={size} />
      {showSum && (
        <>
          <span className="font-serif text-xl font-black text-[var(--color-mid)]">=</span>
          <span className="font-serif text-2xl font-black text-[var(--color-accent)]">
            {sum}
          </span>
        </>
      )}
    </div>
  );
}
