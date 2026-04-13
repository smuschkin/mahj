import { ReactNode } from "react";

export function LessonScreen({
  tag,
  title,
  children,
  cta,
}: {
  tag?: string;
  title: string;
  children: ReactNode;
  cta?: string;
}) {
  return (
    <div className="mb-6 rounded-xl border border-[#EFE8D6] bg-white p-8 md:p-9 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      {tag && (
        <span className="mb-3 inline-block rounded bg-[var(--color-mid)] px-3 py-1 text-[13px] font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          {tag}
        </span>
      )}
      <h3 className="mb-3 font-serif text-2xl md:text-[26px] font-black text-[var(--color-dark)]">
        {title}
      </h3>
      <div className="space-y-3 text-[15px]">{children}</div>
      {cta && (
        <span className="mt-4 inline-block rounded-md bg-[var(--color-mid)] px-6 py-3 text-[14px] font-bold uppercase tracking-[1px] text-[var(--color-accent)]">
          {cta}
        </span>
      )}
    </div>
  );
}
