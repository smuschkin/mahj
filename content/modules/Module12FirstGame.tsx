import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
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
  const adj = getAdjacentModules(14);
  return (
    <PageWrap>

      <ScreenStepper moduleNum={14} coverProps={{ eyebrow: "MAHJ — Lesson 15", title: "Your First", highlight: "Game", subtitle: "A complete guided walkthrough — from the deal to Mahjong" }} header={<><Cover
        eyebrow="MAHJ — Lesson 15"
        title="Your First"
        highlight="Game"
        subtitle="A complete guided walkthrough — from the deal to Mahjong"
      />
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Watch a full hand of American Mahjong play out from start to finish, with every concept from Lessons 1–14 applied at the right moment.",
          },
          { label: "Estimated time", value: "12–15 minutes" },
          { label: "Prerequisite", value: "Lesson 14 (Scoring & Payouts)" },
          {
            label: "Why it matters",
            value:
              "Knowing the rules and seeing the rules played are different things. This lesson bridges the gap.",
          },
        ]}
      /></>}>
        {/* ── 1. Meet Sara ── */}
        <LessonScreen title="👋 Meet Sara">
          <p>
            Sara is sitting down for a hand of American Mahjong. She&apos;s done all
            the lessons in this app, she has her card in front of her, and the wall is
            built. The dealer is about to deal.
          </p>
          <p>
            We&apos;re going to follow her through one complete hand — from the deal
            all the way to Mahjong! At each decision point we&apos;ll pause and show
            you what she&apos;s thinking and why.
          </p>
        </LessonScreen>

        {/* ── 2. The deal ── */}
        <LessonScreen title="🎴 The Deal — Sara Picks Up 13 Tiles">
          <p>
            The wall is broken, the deal happens (counter-clockwise, 4-4-4-1),
            and Sara picks up her 13 tiles. Here they are, sorted on her rack:
          </p>

          <TileRow caption="Sara's starting 13 tiles">
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5">
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={3} size="sm" />
              </div>
              <div className="flex gap-0.5">
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="crack" value={5} size="sm" />
                <Tile type="dot" value={9} size="sm" />
                <Tile type="wind" value="E" size="sm" />
                <Tile type="dragon" value="green" size="sm" />
              </div>
            </div>
          </TileRow>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            What Sara sees
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>9 of her 13 tiles are Bams</strong> — a strong start toward an all-Bam hand.
            </li>
            <li>
              <strong>4 junk tiles</strong> (5 Crak, 9 Dot, East Wind, Green Dragon) — none fit her target. These will go in the Charleston.
            </li>
          </ul>

          <p className="mt-3">
            She scans the card and picks her target (fictional, for teaching only):
          </p>
          <Callout variant="info">
            <strong>Sara&apos;s target hand:</strong>
            <ul className="mt-2 ml-4 list-disc space-y-0.5 text-[14px]">
              <li>Kong of 1-Bam (4 tiles)</li>
              <li>Kong of 2-Bam (4 tiles)</li>
              <li>Pung of 3-Bam (3 tiles)</li>
              <li>Pung of 4-Bam (3 tiles)</li>
            </ul>
            <p className="mt-1 text-[13px]">= 14 tiles, all Bams, one suit.</p>
            <div className="mt-3 rounded-md bg-white/80 px-3 py-2">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">How it might look on the card:</p>
              <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-base font-black tracking-widest text-blue-600">
                <span>1111</span>
                <span className="text-zinc-300">·</span>
                <span>2222</span>
                <span className="text-zinc-300">·</span>
                <span>333</span>
                <span className="text-zinc-300">·</span>
                <span>444</span>
              </div>
            </div>
          </Callout>
        </LessonScreen>

        {/* ── 3. Charleston decision ── */}
        <LessonScreen title="🔄 Charleston: Which 3 to Pass Right?">
          <p>
            First Charleston pass — to the player on her physical right. Sara needs to
            pick the 3 tiles that hurt her hand the least. The dashed-red tiles below
            are the ones she chooses:
          </p>

          <TileRow caption="The 3 marked tiles are heading to her right.">
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5">
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={3} size="sm" />
              </div>
              <div className="flex gap-0.5">
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="crack" value={5} size="sm" marked />
                <Tile type="dot" value={9} size="sm" marked />
                <Tile type="wind" value="E" size="sm" marked />
                <Tile type="dragon" value="green" size="sm" />
              </div>
            </div>
          </TileRow>

          <p className="text-[14px] text-zinc-700">
            She&apos;s keeping the Green Dragon <em>for now</em> — dragons
            pair with suits (Green goes with Bams), so it could fit an all-Bam
            hand. If it doesn&apos;t work out, she&apos;ll ditch it on the next pass.
          </p>

          <Callout variant="tip">
            Pass tiles that fit{" "}
            <em>none</em>{" "}of your candidate hands first. The 5 Crak, 9 Dot, and East
            don&apos;t fit any all-Bam hand on the card.
          </Callout>
        </LessonScreen>

        {/* ── 4. After the Charleston ── */}
        <LessonScreen title="✨ After the Full Charleston">
          <p>
            Sara does all 6 passes (right, across, left, then left, across, right).
            By the end of the Charleston she dropped the Green Dragon,
            picked up an extra 4-Bam and a 2-Bam, and ended up with two filler
            tiles she didn&apos;t want (a 6 Crak and a 7 Crak).
          </p>

          <TileRow caption="Sara's hand after the Charleston (13 tiles)">
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5">
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={3} size="sm" />
              </div>
              <div className="flex gap-0.5">
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="crack" value={6} size="sm" />
                <Tile type="crack" value={7} size="sm" />
              </div>
            </div>
          </TileRow>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Sara's status check
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>1-Bam: 3 of 4 needed for the Kong (need 1 more)</li>
            <li>2-Bam: 3 of 4 needed for the Kong (need 1 more)</li>
            <li>3-Bam: 2 of 3 needed for the Pung (need 1 more)</li>
            <li>4-Bam: 3 of 3 needed for the Pung (✓ done!)</li>
            <li>Junk: 6 Crak, 7 Crak (will be discarded over the next few turns)</li>
          </ul>

          <div className="mt-3 rounded-md bg-white border border-zinc-200 px-3 py-2">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">Her target on the card:</p>
            <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-base font-black tracking-widest text-blue-600">
              <span>1111</span>
              <span className="text-zinc-300">·</span>
              <span>2222</span>
              <span className="text-zinc-300">·</span>
              <span>333</span>
              <span className="text-zinc-300">·</span>
              <span>444</span>
            </div>
          </div>

          <Callout variant="tip">
            <strong>She needs 3 more Bam tiles.</strong>{" "}She&apos;s in great shape. Time to play.
          </Callout>
        </LessonScreen>

        {/* ── 5. Turn 1 — first draw ── */}
        <LessonScreen title="🎯 Turn 1: First Draw">
          <p>
            <TurnBadge label="Sara's turn 1" />
            The Dealer (East) discards first (they already have 14 tiles).
            Sara sits to the Dealer&apos;s right, so she goes next.
          </p>
          <p>
            She draws a <strong>3 Bam</strong> — completing her Pung of 3-Bams!
            She discards the <strong>6 Crak</strong>{" "}(junk) — places it face-up
            in the center and says &quot;Six Crak.&quot;
          </p>

          <TileRow caption="Sara's hand after drawing — the 6 Crak is her discard.">
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5">
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={1} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={2} size="sm" />
                <Tile type="bam" value={3} size="sm" />
              </div>
              <div className="flex gap-0.5">
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="crack" value={6} size="sm" marked />
                <Tile type="crack" value={7} size="sm" />
              </div>
            </div>
          </TileRow>

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
            Sara says: &quot;Wait!&quot;
          </p>
          <p>
            That 4th 1-Bam would complete her Kong. She quickly checks —
            does this exposure still fit a valid hand on the card? Yes, her
            all-Bam hand is still alive.
          </p>
          <p className="font-serif text-[16px] font-black text-[var(--color-red)]">
            &quot;Call!&quot;
          </p>
          <p>
            She takes the 1 Bam, lays all four 1-Bams face-up at the front of
            her rack (this is an <strong>exposure</strong>), and discards her
            remaining junk: <strong>7 Crak</strong>.
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
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
                <Tile type="bam" value={4} size="sm" />
              </>
            }
            caption="Sara is now all-in on her all-Bam hand. The Kong is committed."
          />

          <Callout variant="warn">
            <strong>The exposure is locked.</strong>{" "}Sara can still switch to a
            different hand — as long as it uses a Kong of 1-Bams. But now every
            other player can see she&apos;s building a Bam-heavy hand. They may
            start withholding Bams from her.
          </Callout>
        </LessonScreen>

        {/* ── 7. Turn 5 — joker exchange opportunity ── */}
        <LessonScreen title="🔄 Turn 5: A Joker Exchange Opportunity">
          <p>
            <TurnBadge label="Sara's turn 5" />
            Sara&apos;s turn comes around. Before she draws, she does what every
            experienced player does: she{" "}
            <strong>scans every exposed group on the table</strong>{" "}for jokers.
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

          <p>
            She trades one specific tile for one universal tile — clear win. She announces the exchange, hands her 3 Bam to the player, and receives the Joker.
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

        {/* ── 8. Turns 7–9 — getting close ── */}
        <LessonScreen title="🎲 Turns 7–9: Getting Close">
          <p>
            A few uneventful turns pass. The wall is shrinking. Sara still needs
            just <strong>one more 2 Bam</strong> for her Kong. She has 2 Jokers
            covering the 3-Bams, and her 4-Bam Pung is already complete.
          </p>
          <p>
            Along the way she draws tiles she doesn&apos;t need — including a fourth
            4-Bam and a 9 Bam — and discards them cleanly. Discard tiles that fit
            none of your committed hand.
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
            Time to do the math. Suppose Sara&apos;s practice hand is
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

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={14}
            title="Lesson 15 Check"
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
                  "Always do the 2-second mental check before calling. A bad call kills your hand for the round.",
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
                  "Joker exchanges trade specificity for flexibility. With a Joker she can fill in any missing tile in a group of 3+.",
              },
              {
                question:
                  "Sara's winning hand contained 2 Jokers. The hand value was 30¢ and she won on a discard. What does the discarder pay her?",
                options: ["30¢", "60¢", "$1.20", "$2.40"],
                correct: 1,
                explanation:
                  "Standard discard win = 2× hand value. 30¢ × 2 = 60¢. Jokerless bonus does NOT apply because she had Jokers in her final hand.",
              },
              {
                question:
                  "During Turns 7–9, Sara drew tiles she didn't need (like a 4th 4-Bam). What did she do?",
                options: [
                  "Held it as a defensive tile",
                  "Discarded it cleanly, naming it out loud",
                  "Used it as a Joker substitute",
                  "Passed it to the player across",
                ],
                correct: 1,
                explanation:
                  "Discard tiles that fit none of your committed hand. The extra 4-Bam had no value to her current hand, so it goes.",
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
                  "Hand commitment is the foundation of every other decision. Without picking a target, the discard, call, and joker decisions become impossible.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 You Did It!">
          <p>
            You just watched a full hand of American Mahjong play out — from the deal
            through the Charleston, through a Kong call, a joker exchange, and a
            winning discard.
          </p>
          <p>
            <strong>You&apos;ve completed all 15 lessons.</strong>{" "}You know
            the tiles, the card, the Charleston, calling, jokers, strategy,
            defense, etiquette, scoring, and now the full flow of a game.
          </p>
          <p>
            Ready to test yourself? Try the{" "}
            <Link href="/play" className="font-bold text-[var(--color-accent)] underline">
              Practice Hands Library
            </Link>{" "}
            — 16 real decision puzzles with instant feedback.
          </p>
          <Link
            href="/cheatsheet"
            className="mt-3 flex items-center gap-3 rounded-xl border-2 border-[var(--color-accent)] bg-[#E8F5EC] px-4 py-3 transition hover:-translate-y-0.5"
          >
            <span className="text-2xl">{"\u{1F5A8}\uFE0F"}</span>
            <div>
              <div className="font-serif text-sm font-black text-[var(--color-accent)]">Print Cheat Sheet</div>
              <div className="text-[13px] text-zinc-500">Bring it to your first game night</div>
            </div>
          </Link>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={14}
        prev={
          adj.prev && {
            href: adj.prev.href,
            name: `Lesson ${adj.prev.num + 1}: ${adj.prev.name}`,
          }
        }
        next={
          adj.next && {
            href: adj.next.href,
            name: `Lesson ${adj.next.num + 1}: ${adj.next.name}`,
          }
        }
      />
    </PageWrap>
  );
}
