export function Cover({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-10 rounded-2xl bg-gradient-to-br from-[#334155] via-[#3B4F6B] to-[#4A6485] px-6 py-14 md:py-16 text-center text-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
      {eyebrow && (
        <div className="mb-3 text-[12px] font-bold uppercase tracking-[4px] text-[#A8D4F0]">
          {eyebrow}
        </div>
      )}
      <h1 className="font-serif text-4xl md:text-5xl font-black">
        {title} {highlight && <span className="text-[#A8D4F0]">{highlight}</span>}
      </h1>
      {subtitle && (
        <p className="mt-3 text-[15px] italic text-zinc-300">{subtitle}</p>
      )}
    </header>
  );
}
