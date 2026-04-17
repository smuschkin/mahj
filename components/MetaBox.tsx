export function MetaBox({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="mb-4 rounded-lg border-l-4 border-[var(--color-accent)] bg-white px-4 py-3 sm:px-6 sm:py-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      {items.map((item, i) => (
        <p key={i} className="my-1 text-sm text-zinc-600">
          <strong className="text-[var(--color-accent)]">{item.label}:</strong> {item.value}
        </p>
      ))}
    </div>
  );
}
