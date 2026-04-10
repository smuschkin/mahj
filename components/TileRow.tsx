import { ReactNode } from "react";

export function TileRow({
  children,
  caption,
  background = "ivory",
}: {
  children: ReactNode;
  caption?: string;
  background?: "ivory" | "felt";
}) {
  const bg =
    background === "felt"
      ? "bg-gradient-to-br from-[#1A4D2E] to-[#0F3320]"
      : "bg-[var(--color-light)] border border-dashed border-[var(--color-border)]";
  return (
    <div className={`my-4 rounded-lg ${bg} p-4`}>
      <div className="flex flex-wrap items-end justify-center gap-3">{children}</div>
      {caption && (
        <p className="mt-3 text-center text-[13px] italic text-zinc-600">{caption}</p>
      )}
    </div>
  );
}
