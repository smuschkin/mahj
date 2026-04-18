export function Disclaimer() {
  return (
    <footer className="mt-2 border-t border-[#E0D9C0] bg-[var(--color-ivory)] px-6 py-3 text-center text-[11px] text-zinc-400" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}>
      Not affiliated with or endorsed by the NMJL®. Buy the official card at{" "}
      <a
        href="https://www.nationalmahjonggleague.org"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-zinc-600"
      >
        nationalmahjonggleague.org
      </a>
    </footer>
  );
}
