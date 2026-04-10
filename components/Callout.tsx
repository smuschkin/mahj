import { ReactNode } from "react";

type Variant = "tip" | "warn" | "info";

const styles: Record<Variant, { bg: string; border: string; icon: string }> = {
  tip: { bg: "bg-[#E8F5E9]", border: "border-[var(--color-green)]", icon: "💡" },
  warn: { bg: "bg-[#FDECEA]", border: "border-[var(--color-red)]", icon: "⚠️" },
  info: { bg: "bg-[#F0F5FA]", border: "border-[var(--color-accent)]", icon: "ℹ️" },
};

export function Callout({
  variant = "info",
  children,
  showIcon = true,
}: {
  variant?: Variant;
  children: ReactNode;
  showIcon?: boolean;
}) {
  const s = styles[variant];
  return (
    <div className={`my-4 rounded-md border-l-4 ${s.border} ${s.bg} px-4 py-3 text-sm`}>
      {showIcon && <span className="mr-1">{s.icon}</span>}
      {children}
    </div>
  );
}
