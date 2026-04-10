import type { Metadata } from "next";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "MAHJ — Game Night Cheat Sheet",
  description: "Print this one-page reference and bring it to your first game.",
};

export default function CheatSheet() {
  return (
    <>
      {/* Screen-only header */}
      <div className="mx-auto max-w-3xl px-6 py-10 print:hidden">
        <p className="mb-1 text-center text-xs font-bold uppercase tracking-[2px] text-[var(--color-accent)]">
          MAHJ Tool
        </p>
        <h1 className="mb-2 text-center font-serif text-3xl font-black text-[var(--color-mid)]">
          Game Night <span className="text-[var(--color-accent)]">Cheat Sheet</span>
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-600">
          Print this page (Ctrl/Cmd+P) — it&apos;s designed to fit on one sheet, front
          and back. Bring it to your first game.
        </p>
        <div className="text-center">
          <PrintButton />
        </div>
      </div>

      {/* Printable content */}
      <div className="cheatsheet mx-auto max-w-3xl px-6 pb-12 print:max-w-none print:px-0 print:pb-0">
        {/* ── SIDE 1 ── */}
        <div className="print:page-break-after-always">
          <header className="mb-4 border-b-2 border-[var(--color-mid)] pb-2 text-center">
            <h2 className="font-serif text-2xl font-black text-[var(--color-mid)]">
              MAHJ — Quick Reference
            </h2>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
              American Mahjong · Not affiliated with NMJL
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12px] leading-relaxed text-zinc-800">
            {/* Charleston */}
            <Section title="The Charleston (ROLLOR)">
              <ol className="ml-4 list-decimal space-y-0.5">
                <li><B>R</B>ight — pass 3 tiles →</li>
                <li><B>O</B>ver (across) — pass 3 tiles ↑</li>
                <li><B>L</B>eft — pass 3 tiles ←</li>
                <li><B>L</B>eft — (2nd Charleston, optional) ←</li>
                <li><B>O</B>ver — pass 3 tiles ↑</li>
                <li><B>R</B>ight — pass 3 tiles →</li>
                <li>Courtesy — 0–3 tiles with player across</li>
              </ol>
              <Tip>1st Charleston is mandatory. Any player can stop the 2nd.</Tip>
              <Warn>NEVER pass a Joker.</Warn>
            </Section>

            {/* Calling */}
            <Section title="Calling Rules">
              <ul className="ml-4 list-disc space-y-0.5">
                <li>Say <B>&quot;wait&quot;</B> to pause the game</li>
                <li>Then <B>&quot;Call!&quot;</B> for Pung/Kong, or <B>&quot;Mahjong!&quot;</B> to win</li>
                <li>Expose the group face-up on your rack</li>
                <li>Discard one tile to stay at 13</li>
              </ul>
              <Tip>Mahjong is the ONLY call that can complete a pair or single.</Tip>
              <Warn>Concealed (C) hands can&apos;t call — except for Mahjong.</Warn>
            </Section>

            {/* Discard Priority */}
            <Section title="Discard Priority (in order)">
              <ol className="ml-4 list-decimal space-y-0.5">
                <li>Tiles in <B>none</B> of your candidate hands</li>
                <li>Tiles already in the discard pile (<B>safer</B>)</li>
                <li>Honors you don&apos;t need</li>
                <li>Tiles from your weaker backup hand</li>
                <li>Last resort: tiles opponents might need</li>
              </ol>
              <Warn>NEVER discard a Joker.</Warn>
            </Section>

            {/* Joker Rules */}
            <Section title="Joker Rules">
              <ul className="ml-4 list-disc space-y-0.5">
                <li>Can substitute in groups of <B>3+ identical tiles</B></li>
                <li><B>NEVER</B> in a pair or single</li>
                <li>Cannot be passed in the Charleston</li>
                <li>Cannot be called from the discard pile</li>
                <li><B>Joker exchange:</B> on your turn, swap a real tile for a Joker in any exposed group</li>
              </ul>
            </Section>

            {/* Defense */}
            <Section title="Defense Quick Guide">
              <ul className="ml-4 list-disc space-y-0.5">
                <li><B>3 copies visible</B> → the 4th is 100% safe to discard</li>
                <li><B>0 exposures:</B> normal play</li>
                <li><B>1 exposure:</B> note their suit, avoid matching tiles</li>
                <li><B>2 exposures:</B> play cautiously</li>
                <li><B>3+ exposures:</B> FULL DEFENSE — only safe tiles</li>
                <li><B>Hot suit</B> = the suit nobody is discarding</li>
              </ul>
            </Section>

            {/* Strategy */}
            <Section title="Hand Strategy">
              <ul className="ml-4 list-disc space-y-0.5">
                <li>After the deal: <B>3 candidate hands</B></li>
                <li>After the Charleston: narrow to <B>2</B></li>
                <li>After 5–6 draws: commit to <B>1</B></li>
                <li>Save Jokers for the <B>hardest-to-find</B> tiles</li>
                <li>When in doubt, <B>don&apos;t call</B> — stay flexible</li>
              </ul>
            </Section>
          </div>
        </div>

        {/* ── SIDE 2 ── */}
        <div className="mt-8 print:mt-0">
          <header className="mb-4 border-b-2 border-[var(--color-mid)] pb-2 text-center print:block hidden">
            <h2 className="font-serif text-2xl font-black text-[var(--color-mid)]">
              MAHJ — Quick Reference (continued)
            </h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12px] leading-relaxed text-zinc-800">
            {/* Payouts */}
            <Section title="Payout Table">
              <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-zinc-300">
                    <th className="py-1 text-left font-bold">Win type</th>
                    <th className="py-1 text-center font-bold">Discarder</th>
                    <th className="py-1 text-center font-bold">Others</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-100">
                    <td className="py-1">Discard win</td>
                    <td className="py-1 text-center"><B>2×</B></td>
                    <td className="py-1 text-center">1×</td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <td className="py-1">Self-draw</td>
                    <td className="py-1 text-center" colSpan={2}><B>All pay 2×</B></td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <td className="py-1">+ Jokerless</td>
                    <td className="py-1 text-center" colSpan={2}>Double everything above</td>
                  </tr>
                  <tr>
                    <td className="py-1">Singles &amp; Pairs</td>
                    <td className="py-1 text-center" colSpan={2}>Bonus already baked in</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <Warn>Concealed hands are NOT a multiplier — higher value is in the printed number.</Warn>
            </Section>

            {/* Recovery */}
            <Section title="4-Step Recovery (when you make a mistake)">
              <ol className="ml-4 list-decimal space-y-1">
                <li><B>Stop everything.</B> Hands flat on the table.</li>
                <li><B>Speak up immediately.</B> &quot;Hold on — I think I made a mistake.&quot;</li>
                <li><B>Describe factually.</B> What happened, no excuses.</li>
                <li><B>Let the table decide.</B> Accept the ruling gracefully.</li>
              </ol>
              <Tip>Self-reported mistakes are almost always forgiven. Hidden ones are not.</Tip>
            </Section>

            {/* Etiquette */}
            <Section title="Table Etiquette">
              <ul className="ml-4 list-disc space-y-0.5">
                <li><B>Name every discard out loud</B> (&quot;Four Bam&quot;)</li>
                <li><B>Pause 2–3 seconds</B> before racking (gives others time to call)</li>
                <li>Don&apos;t touch other players&apos; racks</li>
                <li>Joker exchange: hand the tile to them, let <em>them</em> swap</li>
                <li>No comments on others&apos; hands mid-play</li>
                <li>Phones away from the table</li>
              </ul>
            </Section>

            {/* Common Mistakes */}
            <Section title="Top 5 Beginner Mistakes">
              <ol className="ml-4 list-decimal space-y-0.5">
                <li>Passing a Joker in the Charleston</li>
                <li>Calling a tile that breaks your hand → <B>dead hand</B></li>
                <li>Using a Joker in a pair (illegal)</li>
                <li>Misnaming a discard → <B>you pay for everyone</B></li>
                <li>Trying to play too many hands at once</li>
              </ol>
              <Tip>Say &quot;I&apos;m still learning&quot; at the start. Everyone will help.</Tip>
            </Section>
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-zinc-200 pt-3 text-center text-[9px] text-zinc-400">
            MAHJ is an independent educational tool. Not affiliated with, endorsed by, or
            sponsored by the National Mah Jongg League (NMJL). To play official games,
            purchase the current year&apos;s card from nationalmahjonggleague.org.
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; font-size: 11px !important; }
          nav, footer, .print\\:hidden { display: none !important; }
          .cheatsheet { padding: 0.5cm !important; max-width: 100% !important; }
          .print\\:page-break-after-always { page-break-after: always; }
          .print\\:block { display: block !important; }
          .print\\:mt-0 { margin-top: 0 !important; }
          @page { margin: 1cm; }
        }
      `}</style>
    </>
  );
}

/* ── Tiny helper components for the cheat sheet ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-3">
      <h3 className="mb-1.5 border-b border-zinc-100 pb-1 font-serif text-[13px] font-black text-[var(--color-mid)]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-black text-[var(--color-mid)]">{children}</strong>;
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 rounded bg-[#E8F5E9] px-2 py-1 text-[10px] text-[var(--color-green)]">
      <strong>TIP:</strong> {children}
    </p>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 rounded bg-[#FDECEA] px-2 py-1 text-[10px] text-[var(--color-red)]">
      <strong>!</strong> {children}
    </p>
  );
}

