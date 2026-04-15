export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-6 border-b-[3px] border-[#C8A951] pb-2 font-serif text-2xl md:text-[26px] font-bold text-[var(--color-dark)]">
      {children}
    </h2>
  );
}
