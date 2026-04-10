import Link from "next/link";

type NavLink = { href: string; name: string };

export function ModuleNav({ prev, next }: { prev?: NavLink; next?: NavLink }) {
  return (
    <div className="mt-10 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="flex flex-1 flex-col gap-1 rounded-xl border-2 border-[var(--color-mid)] bg-white px-4 py-3 sm:px-5 sm:py-4 text-[var(--color-mid)] shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">
            ← Previous
          </span>
          <span className="font-serif text-lg font-black">{prev.name}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="flex flex-1 flex-col gap-1 rounded-xl border-2 border-[var(--color-mid)] bg-[var(--color-mid)] px-4 py-3 sm:px-5 sm:py-4 text-right text-[var(--color-accent)] shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">
            Next →
          </span>
          <span className="font-serif text-lg font-black">{next.name}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
