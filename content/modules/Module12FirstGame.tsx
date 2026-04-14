import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
import { LessonScreen } from "@/components/LessonScreen";
import { ScreenStepper } from "@/components/ScreenStepper";
import { Callout } from "@/components/Callout";
import { ModuleNav } from "@/components/ModuleNav";
import { Quiz } from "@/components/Quiz";
import { Tile } from "@/components/Tile";
import { TileRow } from "@/components/TileRow";
import { getAdjacentModules } from "@/lib/modules";

/* ── Local helpers ── */

function TurnBadge({ label }: { label: string }) {
  return (
    <span className="mr-2 inline-block rounded bg-[var(--color-mid)] px-2 py-0.5 text-[13px] font-black uppercase tracking-wider text-white">
      {label}
    </span>
  );
}

function HandState({
  exposed,
  rack,
  caption,
}: {
  exposed?: React.ReactNode;
  rack: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="my-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-light)] p-3">
      {exposed && (
        <>
          <div className="mb-1 text-center text-[13px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
            Exposed (face-up on her rack)
          </div>
          <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5 rounded bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] p-2">
            {exposed}
          </div>
        </>
      )}
      <div className="text-center text-[13px] font-bold uppercase tracking-wider text-zinc-500">
        Concealed (in her rack)
      </div>
      <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5">
        {rack}
      </div>
      {caption && (
        <p className="mt-2 text-center text-[12px] italic text-zinc-600">{caption}</p>
      )}
    </div>
  );
}

export default function Module12FirstGame() {
  const adj = getAdjacentModules(12);
  return (
    <PageWrap>
      <Cover
        eyebrow="MAHJ — Module 12"
        title="Your First"
        highlight="Game"
        subtitle="A complete guided walkthrough — from the deal to Mahjong"
      />

      <MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Watch a full hand of American Mahjong play out from start to finish, with every concept from Modules 0–11 applied at the right moment.",
          },
          { label: "Estimated time", value: "12–15 minutes" },
          { label: "Prerequisite", value: "Modules 0–11 (everything before this)" },
          { label: "Unlocks", value: "Module 13 (Practice Hands Library)" },
          {
            label: "Why it matters",
            value:
              "Knowing the rules and seeing the rules played are different things. This module bridges the gap.",
          },
        ]}
      />

      <SectionHeader>Walkthrough</SectionHeader>

      <ScreenStepper moduleNum={12}>
        {/* ── 1. Meet Sara ── */}
        <LessonScreen title="👋 Meet Sara">
          <p>
            Sara is sitting down for a hand of American Mahjong. She&apos;s done all
            the modules in this app, she has her card in front of her, and the wall is
            built. The dealer is about to deal.
          </p>
          <p>
            We&apos;re going to follow her through one complete hand — from the deal
            all the way to Mahjong! At each decision point we&apos;ll pause and show
            you what she&apos;s thinking and why.
          </p>
          <Callout variant="info">
            <strong>Sara&apos;s target hand</strong> — a practice hand built from all
            Bams: <strong>Kong of 1-Bam + Kong of 2-Bam + Pung of 3-Bam + Pung of
            4-Bam</strong>. That&apos;s 4 + 4 + 3 + 3 = 14 tiles, all in one suit.
            Fictional, used here for teaching only.
          </Callout>
        </LessonScreen>

        {/* ── 2. The deal ── */}
        <LessonScreen title="🎴 The Deal — Sara Picks Up 13 Tiles">
          <p>
            The wall is broken, the deal happens (counter-clockwise, 4-4-4-1 — see
            Module 3 if you need a refresher), and Sara picks up her 13 tiles. Here
            they are, sorted on her rack:
          </p>

          <TileRow caption="Sara's starting 13 tiles">
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={3} size="sm" />
            <Tile type="bam" value={3} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="crack" value={5} size="sm" />
            <Tile type="dot" value={9} size="sm" />
            <Tile type="wind" value="E" size="sm" />
            <Tile type="dragon" value="green" size="sm" />
          </TileRow>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            What Sara sees
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>Nine Bams</strong> — three 1-Bams, two 2-Bams, two 3-Bams, two
              4-Bams. That&apos;s a strong start toward an all-Bam hand.
            </li>
            <li>
              <strong>Four junk tiles</strong> — 5 Crak, 9 Dot, East Wind, Green
              Dragon. None of them fit her target.
            </li>
            <li>
              The all-Bam consecutive-runs hand on the card looks like a real candidate
              already. She&apos;ll narrow down further during the Charleston.
            </li>
          </ul>
        </LessonScreen>

        {/* ── 3. Charleston decision ── */}
        <LessonScreen title="🔄 Charleston: Which 3 to Pass Right?">
          <p>
            First Charleston pass — to the player on her physical right. Sara needs to
            pick the 3 tiles that hurt her hand the least. The dashed-red tiles below
            are the ones she chooses:
          </p>

          <TileRow caption="The 3 marked tiles are heading to her right.">
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={3} size="sm" />
            <Tile type="bam" value={3} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="crack" value={5} size="sm" marked />
            <Tile type="dot" value={9} size="sm" marked />
            <Tile type="dragon" value="green" size="sm" marked />
          </TileRow>

          <p className="text-[14px] text-zinc-700">
            She&apos;s keeping the East Wind <em>for now</em> — she has only one of
            them, but honors can occasionally pair up. If they don&apos;t, she&apos;ll
            ditch it on the next pass. (See Module 4 for the Charleston decision
            framework.)
          </p>

          <Callout variant="tip">
            Sara&apos;s rule of thumb from Module 6: pass tiles that fit{" "}
            <em>none</em>{" "}of your candidate hands first. The 5 Crak, 9 Dot, and Green
            Dragon don&apos;t fit any all-Bam hand on the card.
          </Callout>
        </LessonScreen>

        {/* ── 4. After the Charleston ── */}
        <LessonScreen title="✨ After the Full Charleston">
          <p>
            Sara does all 6 passes (right, across, left, then left, across, right).
            By the end of the Charleston she also dropped the East Wind, picked up an
            extra 4-Bam, gained a <strong>Joker</strong>{" "}(gold!), and ended up with
            two filler tiles she didn&apos;t want (a 6 Crak and a 7 Crak).
          </p>

          <TileRow caption="Sara's hand after the Charleston (13 tiles)">
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={3} size="sm" />
            <Tile type="bam" value={3} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="joker" size="sm" />
            <Tile type="crack" value={6} size="sm" />
            <Tile type="crack" value={7} size="sm" />
          </TileRow>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Sara's status check
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>1-Bam: 3 of 4 needed for the Kong (need 1 more)</li>
            <li>2-Bam: 2 of 4 needed for the Kong (need 2 more)</li>
            <li>3-Bam: 2 of 3 needed for the Pung (need 1 more)</li>
            <li>4-Bam: 3 of 3 needed for the Pung (✓ done!)</li>
            <li>Joker: can substitute for any 1 missing Bam in a Pung or Kong</li>
            <li>Junk: 6 Crak, 7 Crak (will be discarded over the next few turns)</li>
          </ul>

          <Callout variant="tip">
            <strong>She needs 4 more meaningful tiles + the Joker substitution.</strong> She&apos;s in great shape. Time to play.
          </Callout>
        </LessonScreen>

        {/* ── 5. Turn 1 — first draw ── */}
        <LessonScreen title="🎯 Turn 1: First Draw">
          <p>
            <TurnBadge label="Sara's turn 1" />
            Sara draws from the wall and gets a <strong>2 Bam</strong>. Beautiful — that&apos;s
            now <strong>three 2-Bams</strong>, getting closer to her Kong.
          </p>
          <p>
            She has 14 tiles now and must discard one. Easy choice: the 6 Crak — it
            fits no candidate hand.
          </p>

          <TileRow caption="Sara's hand after drawing — the 6 Crak is going.">
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={1} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={3} size="sm" />
            <Tile type="bam" value={3} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="joker" size="sm" />
            <Tile type="crack" value={6} size="sm" marked />
            <Tile type="crack" value={7} size="sm" />
          </TileRow>

          <p className="text-[14px] text-zinc-700">
            She announces clearly:{" "}
            <strong>&quot;Six Crak.&quot;</strong> — and places it face-up in the
            center. Then she pauses (Module 8) before her hand returns to her rack.
          </p>
        </LessonScreen>

        {/* ── 6. Turn 3 — the KONG call ── */}
        <LessonScreen title='📣 Turn 3: "Wait... Call!"'>
          <p>
            <TurnBadge label="Player to her left's turn" />
            On the next loop around the table, the player to Sara&apos;s left
            discards a <strong>1 Bam</strong>. Sara already has{" "}
            <strong>three 1-Bams</strong>. That fourth one would complete her Kong.
          </p>
          <p className="font-serif text-[16px] font-black text-[var(--color-red)]">
            Sara says: &quot;Wait.&quot;
          </p>
          <p>
            That single word pauses the game so the next player won&apos;t draw. Now
            she has a few seconds to do the mental check from Module 5:{" "}
            <em>&quot;If I take this and expose four 1-Bams, can my remaining tiles
            still complete a valid hand on the card?&quot;</em>{" "}Yes — her all-Bam hand
            is still very much alive. Safe to take.
          </p>
          <p>
            She decides — yes. She says <strong>&quot;Call!&quot;</strong>, takes
            the 1 Bam, and lays all four 1-Bams face-up at the front of her rack, and discards her remaining junk:{" "}
            <strong>7 Crak</strong>.
          </p>

          <HandState
            exposed={
              <>
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
              </>
            }
            rack={
              <>
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="joker" size="sm" />
              </>
            }
            caption="Sara is now all-in on her all-Bam hand. The Kong is committed."
          />

          <Callout variant="warn">
            <strong>The exposure is irreversible.</strong>{" "}From this moment on, Sara
            cannot switch to a different hand category. Every other player at the
            table can see she&apos;s building a Bam-heavy hand. They will start
            withholding Bams from her.
          </Callout>
        </LessonScreen>

        {/* ── 7. Turn 5 — joker exchange opportunity ── */}
        <LessonScreen title="🔄 Turn 5: A Joker Exchange Opportunity">
          <p>
            <TurnBadge label="Sara's turn 5" />
            Sara&apos;s turn comes around. Before she draws, she does what every
            experienced player does: she{" "}
            <strong>scans every exposed group on the table</strong>{" "}for jokers (the
            Module 5 habit).
          </p>
          <p>
            She spots one. The player across the table has an exposed Pung that looks
            like this:
          </p>

          <TileRow background="felt" caption="Across player's exposed Pung — Joker is on the right.">
            <Tile type="bam" value={3} size="sm" highlighted />
            <Tile type="bam" value={3} size="sm" highlighted />
            <Tile type="joker" size="sm" highlighted />
          </TileRow>

          <p>
            The Joker in their group is standing in for a <strong>3 Bam</strong>.
            Sara has two real 3-Bams in her rack. She could swap one for the Joker.
          </p>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Should she do it?
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              If she gives away a 3-Bam, she&apos;ll have only one real 3-Bam left.
              She still needs three for the Pung.
            </li>
            <li>
              But she gains a <strong>second Joker</strong>. With two Jokers, she now
              has flexible coverage for any of the missing Bams.
            </li>
            <li>
              Net result: she trades one specific tile (3-Bam) for one universal tile
              (Joker). For her late-game flexibility, that&apos;s a clear win.
            </li>
          </ul>

          <p>
            Sara announces clearly:{" "}
            <em>&quot;Joker exchange — I&apos;ll trade my 3 Bam for the Joker in
            your group.&quot;</em>{" "}She hands her real 3 Bam <strong>to the player
            whose rack holds the joker</strong>{" "}(Module 8 etiquette: never reach onto
            someone else&apos;s rack). They make the swap and hand her the Joker.
          </p>
          <p>
            Then she draws from the wall as her normal turn — and gets a useless 9
            Dot. She discards it cleanly: <strong>&quot;Nine Dot.&quot;</strong>
          </p>

          <HandState
            exposed={
              <>
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
              </>
            }
            rack={
              <>
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="joker" size="sm" />
                <Tile type="joker" size="sm" />
              </>
            }
            caption="Two jokers now. One real 3-Bam left in her rack."
          />
        </LessonScreen>

        {/* ── 8. Turn 7 — middle game ── */}
        <LessonScreen title="🎲 Turn 7: One More 2-Bam Needed">
          <p>
            <TurnBadge label="Sara's turn 7" />
            A few uneventful turns pass. The wall is shrinking. Sara still needs:
          </p>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>One more <strong>2 Bam</strong>{" "}for her Kong (she has 3 of 4)</li>
            <li>Two more <strong>3 Bams</strong>{" "}for her Pung — but she has 2 Jokers</li>
            <li>4-Bam Pung is already complete (3 of 3)</li>
            <li>1-Bam Kong is already exposed and complete</li>
          </ul>
          <p>
            With both Jokers in play as 3-Bams, she only actually needs to draw{" "}
            <strong>one more 2 Bam</strong>{" "}to complete the entire hand.
          </p>

          <p>
            On Turn 7 she draws — and gets a <strong>4 Bam</strong>. That&apos;s a
            fourth 4-Bam! She doesn&apos;t need it; her 4-Bam Pung only needs three.
            She could think about whether to keep it as a defensive tile, but
            it&apos;s a hot tile in the all-Bam suit, so she discards it cleanly:{" "}
            <strong>&quot;Four Bam.&quot;</strong>
          </p>

          <Callout variant="tip">
            Sara could have used the extra 4 Bam in a Quint (5 of a kind) on a
            different hand, but her current hand doesn&apos;t call for it. Module 6
            principle: <em>discard tiles that fit none of your committed hand</em>.
          </Callout>
        </LessonScreen>

        {/* ── 9. Turn 9 — one tile away ── */}
        <LessonScreen title="🔥 Turn 9: One Tile from Mahjong">
          <p>
            <TurnBadge label="Sara's turn 9" />
            Sara draws — nothing useful, a 9 Bam she doesn&apos;t need (her hand
            doesn&apos;t use 9s). She discards it. She is now <strong>exactly one
            tile</strong>{" "}from Mahjong.
          </p>

          <HandState
            exposed={
              <>
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
              </>
            }
            rack={
              <>
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="joker" size="sm" />
                <Tile type="joker" size="sm" />
              </>
            }
            caption="13 tiles. The only tile that finishes the hand is a 4th 2-Bam."
          />

          <p>
            She quietly checks her position against the card one more time:
          </p>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>Kong of 1-Bam ✓ (exposed)</li>
            <li>Kong of 2-Bam — needs <strong>one more 2-Bam</strong></li>
            <li>Pung of 3-Bam — Joker + Joker + real 3-Bam = ✓</li>
            <li>Pung of 4-Bam ✓ (concealed)</li>
          </ul>

          <p>
            <strong>That&apos;s it.</strong>{" "}Any 2 Bam — drawn or discarded — is the
            winning tile. She quietly mouths the words to make sure she&apos;ll be
            ready: <em>&quot;Mahjong.&quot;</em>
          </p>
        </LessonScreen>

        {/* ── 10. Turn 11 — MAHJONG ── */}
        <LessonScreen title="🏆 Turn 11: MAHJONG!">
          <p>
            <TurnBadge label="The next loop" />
            The player across from Sara discards a tile, names it clearly:{" "}
            <strong>&quot;Two Bam.&quot;</strong>
          </p>
          <p>
            Sara&apos;s eyes lock onto the tile. She says <strong>&quot;wait&quot;</strong> to pause the game, takes one more second to verify against the card —
            yes, every group is accounted for — and then:
          </p>
          <p className="font-serif text-2xl font-black text-[var(--color-red)]">
            &quot;MAHJONG!&quot;
          </p>
          <p>
            She takes the discarded 2 Bam and lays her complete hand face-up:
          </p>

          <HandState
            exposed={
              <>
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
                <Tile type="bam" value={1} size="sm" highlighted />
              </>
            }
            rack={
              <>
                <Tile type="bam" value={2} size="sm" highlighted />
                <Tile type="bam" value={2} size="sm" highlighted />
                <Tile type="bam" value={2} size="sm" highlighted />
                <Tile type="bam" value={2} size="sm" highlighted />
                <Tile type="bam" value={3} size="sm" highlighted />
                <Tile type="joker" size="sm" highlighted />
                <Tile type="joker" size="sm" highlighted />
                <Tile type="bam" value={4} size="sm" highlighted />
                <Tile type="bam" value={4} size="sm" highlighted />
                <Tile type="bam" value={4} size="sm" highlighted />
              </>
            }
            caption="14 tiles. Kong 1B + Kong 2B + Pung 3B (with two Jokers) + Pung 4B."
          />

          <p>The table verifies her hand against the card. It checks out:</p>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>Kong of 1 Bam</strong> — four real tiles, exposed
            </li>
            <li>
              <strong>Kong of 2 Bam</strong> — four real tiles (the 4th called from the
              discard)
            </li>
            <li>
              <strong>Pung of 3 Bam</strong> — one real 3 Bam + two Jokers (legal:
              Jokers can substitute in groups of 3+)
            </li>
            <li>
              <strong>Pung of 4 Bam</strong> — three real tiles, concealed
            </li>
          </ul>

          <p className="text-[14px] text-zinc-700">
            <strong>14 tiles. Hand complete. Mahjong confirmed.</strong>
          </p>
        </LessonScreen>

        {/* ── 11. The payout ── */}
        <LessonScreen title="💰 The Payout">
          <p>
            Time to do the math from Module 9. Suppose Sara&apos;s practice hand is
            worth <strong>30¢</strong>{" "}on the card (a moderate value).
          </p>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            What applies to this win
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>Win on a discard</strong> — yes. The discarder pays double.
            </li>
            <li>
              <strong>Self-draw bonus</strong> — no. She won by calling a discard.
            </li>
            <li>
              <strong>Jokerless bonus</strong> — no. Her hand contains 2 Jokers.
            </li>
          </ul>

          <p>So the payout is the standard discard-win pattern:</p>

          <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="rounded-md border-2 border-[var(--color-red)] bg-[#FFF6F4] p-2 text-center">
              <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
                Discarder
              </div>
              <div className="font-serif text-lg font-black text-[var(--color-red)]">
                60¢
              </div>
              <div className="text-[13px] italic text-zinc-500">2× hand value</div>
            </div>
            <div className="rounded-md border-2 border-[var(--color-mid)] bg-white p-2 text-center">
              <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
                Other player
              </div>
              <div className="font-serif text-lg font-black text-[var(--color-mid)]">
                30¢
              </div>
              <div className="text-[13px] italic text-zinc-500">1× hand value</div>
            </div>
            <div className="rounded-md border-2 border-[var(--color-mid)] bg-white p-2 text-center">
              <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
                Other player
              </div>
              <div className="font-serif text-lg font-black text-[var(--color-mid)]">
                30¢
              </div>
              <div className="text-[13px] italic text-zinc-500">1× hand value</div>
            </div>
          </div>

          <p className="text-center font-serif text-base font-black text-[var(--color-mid)]">
            Sara collects $1.20 total
          </p>

          <Callout variant="tip">
            <strong>What if Sara had self-drawn instead?</strong>{" "}All three other
            players would pay 60¢ each = $1.80 total. <strong>What if her hand had
            also been jokerless?</strong>{" "}Double again: $1.20 each × 3 = $3.60
            total. Sara&apos;s win is solid but not spectacular — and that&apos;s
            totally normal for a beginner game.
          </Callout>
        </LessonScreen>

        {/* ── 12. Key takeaways ── */}
        <LessonScreen title="🎓 What Sara Did Right">
          <p>
            Look back at the whole hand. Sara executed a near-textbook beginner game
            by doing five specific things:
          </p>

          <ol className="ml-6 list-decimal space-y-3 text-[14px] text-zinc-700">
            <li>
              <strong>Committed to a hand early.</strong>{" "}She picked her all-Bam
              candidate during the deal and never wavered. Module 6.
            </li>
            <li>
              <strong>Passed her junk in the Charleston.</strong>{" "}She got rid of
              tiles that fit zero of her candidates and held the East Wind one extra
              pass &quot;just in case,&quot; which is exactly the right caution level.
              Module 4.
            </li>
            <li>
              <strong>Said &quot;wait,&quot; thought it through, then called</strong> when the right tile came along — but not before doing the 2-second
              &quot;can I still finish a valid hand?&quot; check. Module 5.
            </li>
            <li>
              <strong>Spotted and executed the joker exchange.</strong>{" "}Most beginners
              forget exposed jokers exist. Sara scanned every turn. Modules 5 + 10.
            </li>
            <li>
              <strong>Named every discard out loud, paused before racking</strong>,
              and called &quot;Mahjong!&quot; the instant the winning tile appeared.
              Module 8.
            </li>
          </ol>

          <Callout variant="info">
            <strong>What about defense?</strong>{" "}This walkthrough focused on offense
            for clarity, but in a real game Sara would also have been reading the
            other players&apos; exposures. By Turn 7 she would have noted that the
            player to her right was building Craks (so Crak discards were safe to
            them) while the player across had a Dragons hand (so dragon discards were
            dangerous). Module 7.
          </Callout>

          <Callout variant="tip">
            <strong>Your turn next.</strong>{" "}The next module — Practice Hands Library
            — gives you puzzles where <em>you</em>{" "}make the calls Sara made here.
            That&apos;s where the real learning sticks.
          </Callout>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="🎯 Confidence Check">
          <p className="text-sm text-zinc-600">
            5 quick questions about Sara&apos;s game. Get 4 right to pass.
          </p>
          <Quiz
            moduleNum={12}
            title="Module 12 Check"
            passThreshold={4}
            questions={[
              {
                question:
                  "When Sara said 'wait' on Turn 3 to grab a tile for her Kong, what did she have to do mentally before committing?",
                options: [
                  "Calculate the payout",
                  'Check: "Can my remaining tiles still complete a valid hand on the card?"',
                  "Ask the dealer for permission",
                  "Show her hand to her partner",
                ],
                correct: 1,
                explanation:
                  "Always do the 2-second mental check before calling. A bad call kills your hand for the round. Module 5.",
              },
              {
                question:
                  "Sara had two real 3-Bams. She traded one for an opponent's exposed Joker. Was that a smart move?",
                options: [
                  "No — never give up real tiles",
                  "Yes — she traded a specific tile for a flexible one (the Joker covers any missing Bam)",
                  "Only if she was losing",
                  "Only on the dealer's turn",
                ],
                correct: 1,
                explanation:
                  "Joker exchanges trade specificity for flexibility. With a Joker she can fill in any missing tile in a group of 3+. Module 5 strategy.",
              },
              {
                question:
                  "Sara's winning hand contained 2 Jokers. The hand value was 30¢ and she won on a discard. What does the discarder pay her?",
                options: ["30¢", "60¢", "$1.20", "$2.40"],
                correct: 1,
                explanation:
                  "Standard discard win = 2× hand value. 30¢ × 2 = 60¢. Jokerless bonus does NOT apply because she had Jokers in her final hand. Module 9.",
              },
              {
                question:
                  "On Turn 7 Sara drew a 4-Bam she didn't need (her 4-Bam Pung was already complete). What did she do?",
                options: [
                  "Held it as a defensive tile",
                  "Discarded it cleanly, naming it out loud",
                  "Used it as a Joker substitute",
                  "Passed it to the player across",
                ],
                correct: 1,
                explanation:
                  "Module 6 priority: discard tiles that fit none of your committed hand. The extra 4-Bam had no value to her current hand, so it goes.",
              },
              {
                question:
                  "What was the single most important thing Sara did across the entire hand?",
                options: [
                  "Won quickly",
                  "Used Jokers cleverly",
                  "Committed to one hand early and stayed focused",
                  "Talked to the other players",
                ],
                correct: 2,
                explanation:
                  "Hand commitment is the foundation of every other decision. Without picking a target, the discard, call, and joker decisions become impossible. Module 6.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Module 12 Complete">
          <p>
            You just watched a full hand of American Mahjong play out — from the deal
            through the Charleston, through a Kong call, a joker exchange, and a
            winning discard. Every decision Sara made connects back to a specific
            module in this app.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Module 13 is the{" "}
            <strong>Practice Hands Library</strong>. Now you sit in Sara&apos;s seat.
            You get a hand, you make the calls, and the app tells you whether you
            chose the best move and why.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={12}
        prev={
          adj.prev && {
            href: adj.prev.href,
            name: `Module ${adj.prev.num}: ${adj.prev.name}`,
          }
        }
        next={
          adj.next && {
            href: adj.next.href,
            name: `Module ${adj.next.num}: ${adj.next.name}`,
          }
        }
      />
    </PageWrap>
  );
}
