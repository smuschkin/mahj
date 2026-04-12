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
          Print this page (Ctrl/Cmd+P) and bring it to your first game.
          Designed for front &amp; back of one sheet.
        </p>
        <div className="text-center">
          <PrintButton />
        </div>
      </div>

      {/* Printable content */}
      <div className="cheatsheet mx-auto max-w-3xl px-6 pb-12 print:max-w-none print:px-0 print:pb-0">
        {/* ── SIDE 1: The essentials you need every turn ── */}
        <div className="side-one">
          <header className="mb-3 border-b-2 border-[var(--color-mid)] pb-2 text-center">
            <h2 className="font-serif text-xl font-black text-[var(--color-mid)]">
              MAHJ — Game Night Cheat Sheet
            </h2>
            <p className="text-[12px] uppercase tracking-wider text-zinc-500">
              American Mahjong Quick Reference · Not affiliated with NMJL
            </p>
          </header>

          <div className="grid grid-cols-1 gap-3 text-[13px] leading-snug text-zinc-800 sm:grid-cols-2">
            {/* YOUR TURN */}
            <Section title="Your Turn (repeat every turn)" accent>
              <ol className="ml-4 list-decimal space-y-0.5">
                <li><B>Draw</B> one tile from the wall (right end of your row)</li>
                <li><B>Look</B> at your hand — does this help any candidate hand?</li>
                <li><B>Discard</B> one tile face-up in the center, <B>name it out loud</B></li>
                <li><B>Pause 2–3 seconds</B> so others can call</li>
              </ol>
              <Tip>East starts with 14 tiles and discards first (no draw). Everyone else has 13.</Tip>
            </Section>

            {/* WHEN SOMEONE DISCARDS */}
            <Section title="When Someone Else Discards" accent>
              <ul className="ml-4 list-disc space-y-0.5">
                <li><B>Can you use it?</B> Check if it completes a group in your hand</li>
                <li>If yes → say <B>&quot;Call&quot;</B> (or <B>&quot;Mahjong!&quot;</B> to win)</li>
                <li>Expose the completed group face-up on your rack</li>
                <li>Then discard one tile to get back to the right count</li>
                <li>If no → do nothing, wait for your turn</li>
              </ul>
              <Warn>Concealed (C) hands: you can ONLY call for Mahjong, nothing else.</Warn>
            </Section>

            {/* READING THE CARD */}
            <Section title="Reading the Card (Notation Key)">
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                <div><B>F</B> = Flower (any of the 8)</div>
                <div><B>D</B> = Dragon (Red, Green, or Soap)</div>
                <div><B>N E S W</B> = Wind tiles</div>
                <div><B>0</B> = White Dragon (Soap)</div>
                <div><B>Numbers (1–9)</B> = tile values</div>
                <div><B>Same color</B> = same suit</div>
                <div><B>Diff color</B> = different suits</div>
                <div><B>C</B> = Concealed / <B>X</B> = Exposed</div>
              </div>
              <div className="mt-1.5 rounded border border-zinc-200 bg-zinc-50 px-2 py-1">
                <span className="text-[13px] font-bold text-zinc-500">GROUP SIZES: </span>
                <span className="text-[13px]">
                  Pair = 2 &nbsp;|&nbsp; Pung = 3 &nbsp;|&nbsp; Kong = 4 &nbsp;|&nbsp; Quint = 5
                </span>
              </div>
              <Tip>The card shows PATTERNS, not specific suits. You choose which suit goes where.</Tip>
            </Section>

            {/* CHARLESTON */}
            <Section title="The Charleston (before play starts)">
              <div className="mb-1 text-[13px] font-bold text-zinc-500">
                1ST CHARLESTON (mandatory):
              </div>
              <ol className="ml-4 list-decimal space-y-0">
                <li><B>Right</B> → pass 3 tiles</li>
                <li><B>Across</B> ↑ pass 3 tiles</li>
                <li><B>Left</B> ← pass 3 tiles (can &quot;blind pass&quot;)</li>
              </ol>
              <div className="mt-1 mb-1 text-[13px] font-bold text-zinc-500">
                2ND CHARLESTON (optional — any player can stop):
              </div>
              <ol className="ml-4 list-decimal space-y-0" start={4}>
                <li><B>Left</B> ← pass 3</li>
                <li><B>Across</B> ↑ pass 3</li>
                <li><B>Right</B> → pass 3</li>
              </ol>
              <div className="mt-1 text-[13px]">
                Then: <B>Courtesy pass</B> — trade 0–3 tiles with player across (both agree on count)
              </div>
              <Warn>NEVER pass a Joker.</Warn>
            </Section>

            {/* CALLING PRIORITY */}
            <Section title="Calling Priority (highest wins)">
              <ol className="ml-4 list-decimal space-y-0.5">
                <li><B>Mahjong</B> — always wins over any other call</li>
                <li><B>Kong / Pung</B> — out-of-turn call beats in-turn draw</li>
              </ol>
              <div className="mt-1.5 rounded border border-zinc-200 bg-zinc-50 px-2 py-1 text-[13px]">
                <B>Can I call this?</B> Only if the tile completes a group of 3+ identical tiles
                in your target hand. You cannot call to make a pair (except for Mahjong).
              </div>
            </Section>

            {/* JOKER RULES */}
            <Section title="Joker Rules">
              <ul className="ml-4 list-disc space-y-0.5">
                <li>Substitute in groups of <B>3+ identical tiles</B> only</li>
                <li><B>NEVER</B> in a pair or single tile</li>
                <li>Cannot be passed in the Charleston</li>
                <li>Cannot be called from the discard pile</li>
                <li><B>Joker exchange:</B> on your turn, you can swap a natural tile
                  for a Joker in any exposed group (yours or opponents&apos;)</li>
              </ul>
            </Section>
          </div>
        </div>

        {/* ── SIDE 2: Strategy, defense, and reference ── */}
        <div className="mt-8 side-two">
          <header className="mb-3 border-b-2 border-[var(--color-mid)] pb-2 text-center print-only-header">
            <h2 className="font-serif text-xl font-black text-[var(--color-mid)]">
              MAHJ — Cheat Sheet (side 2)
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-3 text-[13px] leading-snug text-zinc-800 sm:grid-cols-2">
            {/* HAND STRATEGY */}
            <Section title="Hand Strategy">
              <ul className="ml-4 list-disc space-y-0.5">
                <li>After the deal: pick <B>2–3 candidate hands</B> from the card</li>
                <li>After the Charleston: narrow to <B>2</B></li>
                <li>After 5–6 draws: commit to <B>1</B></li>
                <li>Save Jokers for the <B>hardest-to-find</B> tiles</li>
                <li>When in doubt, <B>don&apos;t call</B> — stay flexible</li>
              </ul>
              <Tip>Look for tiles you already have pairs/triples of, then find hands on the card that use them.</Tip>
            </Section>

            {/* DISCARD PRIORITY */}
            <Section title="What to Discard (safest first)">
              <ol className="ml-4 list-decimal space-y-0.5">
                <li>Tiles in <B>none</B> of your candidate hands</li>
                <li>Tiles already in the discard pile (<B>safe — nobody needs them</B>)</li>
                <li>Isolated honors (winds/dragons) you don&apos;t need</li>
                <li>Tiles from your weaker backup hand</li>
                <li>Last resort: tiles that might help opponents</li>
              </ol>
              <Warn>NEVER discard a Joker. NEVER discard a Flower unless your hand doesn&apos;t use them.</Warn>
            </Section>

            {/* DEFENSE */}
            <Section title="Defense — Read the Table">
              <ul className="ml-4 list-disc space-y-0.5">
                <li><B>3 copies visible</B> of a tile → 4th is 100% safe to discard</li>
                <li><B>Watch exposures:</B></li>
              </ul>
              <div className="ml-6 mt-0.5 grid grid-cols-2 gap-x-2 gap-y-0 text-[13px]">
                <div>0 exposures → normal play</div>
                <div>1 exposure → note their suit</div>
                <div>2 exposures → play carefully</div>
                <div>3+ exposures → FULL DEFENSE</div>
              </div>
              <div className="mt-1 text-[13px]">
                <B>Hot suit</B> = the suit nobody is discarding. Be very careful discarding it.
              </div>
            </Section>

            {/* PAYOUTS */}
            <Section title="Scoring & Payouts">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="border-b border-zinc-300">
                    <th className="py-0.5 text-left font-bold">Win type</th>
                    <th className="py-0.5 text-center font-bold">Discarder pays</th>
                    <th className="py-0.5 text-center font-bold">Others pay</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-100">
                    <td className="py-0.5">Discard win</td>
                    <td className="py-0.5 text-center"><B>2x</B> hand value</td>
                    <td className="py-0.5 text-center">1x</td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <td className="py-0.5">Self-draw win</td>
                    <td className="py-0.5 text-center" colSpan={2}><B>All pay 2x</B></td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <td className="py-0.5">Jokerless bonus</td>
                    <td className="py-0.5 text-center" colSpan={2}>Double everything above</td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Singles &amp; Pairs</td>
                    <td className="py-0.5 text-center" colSpan={2}>Bonus already built into value</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* ETIQUETTE */}
            <Section title="Table Etiquette">
              <ul className="ml-4 list-disc space-y-0.5">
                <li><B>Name every discard</B> (&quot;Four Bam&quot;, &quot;Red Dragon&quot;)</li>
                <li><B>Pause before racking</B> — give others time to call</li>
                <li>Don&apos;t touch other players&apos; racks</li>
                <li>Joker exchange: hand the tile to them, let <em>them</em> swap</li>
                <li>No comments about others&apos; hands during play</li>
              </ul>
              <Tip>Say &quot;I&apos;m learning&quot; at the start. Everyone will help you.</Tip>
            </Section>

            {/* TOP MISTAKES */}
            <Section title="Top 5 Beginner Mistakes">
              <ol className="ml-4 list-decimal space-y-0.5">
                <li>Passing a Joker in the Charleston</li>
                <li>Calling a tile that breaks your hand → <B>dead hand</B></li>
                <li>Using a Joker in a pair (illegal)</li>
                <li>Misnaming a discard → <B>you may pay for everyone</B></li>
                <li>Committing to one hand too early</li>
              </ol>
              <div className="mt-1 rounded border border-zinc-200 bg-zinc-50 px-2 py-1 text-[13px]">
                <B>Made a mistake?</B> Stop, speak up immediately, describe what happened.
                Self-reported mistakes are almost always forgiven.
              </div>
            </Section>
          </div>

          {/* Footer */}
          <div className="mt-4 border-t border-zinc-200 pt-2 text-center text-[8px] text-zinc-400">
            MAHJ is an independent educational tool. Not affiliated with, endorsed by, or
            sponsored by the National Mah Jongg League (NMJL). To play official American Mahjong,
            purchase the current year&apos;s card at nationalmahjonggleague.org.
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 1.5cm;
          }
          body {
            background: white !important;
            font-size: 10px !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          nav, footer, .print\\:hidden { display: none !important; }
          .cheatsheet {
            padding: 0 !important;
            max-width: 100% !important;
          }
          .side-one {
            page-break-after: always;
          }
          .side-two {
            margin-top: 0 !important;
          }
          .print-only-header {
            display: block !important;
          }
        }
        @media screen {
          .print-only-header {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

/* ── Tiny helper components ── */

function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-2.5 ${accent ? "border-[var(--color-accent)]/30 bg-[#E8F5EC]/30" : "border-zinc-200"}`}>
      <h3 className="mb-1 border-b border-zinc-100 pb-0.5 font-serif text-[12px] font-black text-[var(--color-mid)]">
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
    <p className="mt-1 rounded bg-[#E8F5EC] px-2 py-0.5 text-[13px] text-[var(--color-green)]">
      <strong>TIP:</strong> {children}
    </p>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 rounded bg-[#FDECEA] px-2 py-0.5 text-[13px] text-[var(--color-red)]">
      <strong>!</strong> {children}
    </p>
  );
}
