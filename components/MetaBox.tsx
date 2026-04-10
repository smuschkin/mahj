export function MetaBox({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="mb-9 rounded-lg border-l-4 border-[var(--color-accent)] bg-white px-6 py-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      {items.map((item, i) => (
        <p key={i} className="my-1 text-sm text-zinc-600">
          <strong className="text-[var(--color-mid)]">{item.label}:</strong> {item.value}
        </p>
      ))}
    </div>
  );
}
