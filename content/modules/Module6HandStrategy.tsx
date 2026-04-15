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
import { DiscardDrill } from "@/components/DiscardDrill";
import { getAdjacentModules } from "@/lib/modules";

/* ── Local helpers ── */

function PriorityRow({
  rank,
  what,
  why,
  tone = "normal",
}: {
  rank: string;
  what: string;
  why: string;
  tone?: "normal" | "danger" | "never";
}) {
  const colors =
    tone === "never"
      ? "border-[var(--color-red)] bg-[#FFF6F4]"
      : tone === "danger"
        ? "border-[var(--color-accent)] bg-[#E8F5EC]"
        : "border-[var(--color-green)] bg-[#F4FBF6]";
  return (
    <div className={`grid grid-cols-[60px_1fr] gap-3 rounded-lg border-l-4 p-3 ${colors}`}>
      <div className="font-serif text-sm font-black uppercase tracking-wider text-[var(--color-mid)]">
        {rank}
      </div>
      <div>
        <div className="text-[14px] font-bold text-[var(--color-mid)]">{what}</div>
        <div className="text-[13px] text-zinc-600">{why}</div>
      </div>
    </div>
  );
}

function TreeStep({
  question,
  yes,
  no,
}: {
  question: string;
  yes: string;
  no: string;
}) {
  return (
    <div className="my-3 rounded-xl border-2 border-[var(--color-border)] bg-white p-4 shadow-sm">
      <div className="mb-3 text-center font-serif text-[14px] font-black text-[var(--color-mid)]">
        {question}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border-l-4 border-[var(--color-green)] bg-[#F4FBF6] p-2 text-[12px]">
          <div className="font-black text-[var(--color-green)]">YES →</div>
          {yes}
        </div>
        <div className="rounded-md border-l-4 border-[var(--color-red)] bg-[#FFF6F4] p-2 text-[12px]">
          <div className="font-black text-[var(--color-red)]">NO →</div>
          {no}
        </div>
      </div>
    </div>
  );
}

export default function Module6HandStrategy() {
  const adj = getAdjacentModules(8);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={8} coverProps={{ eyebrow: "MAHJ — Lesson 9", title: "Hand", highlight: "Strategy" }} header={<><Cover
        eyebrow="MAHJ — Lesson 9"
        title="Hand"
        highlight="Strategy"
        subtitle='Picking a hand, staying flexible, and the all-important "what would you discard?"'
      />
      <SectionHeader>Lesson</SectionHeader>
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Stay flexible early, commit later, manage jokers wisely, and make sharper discard decisions every turn.",
          },
          { label: "Estimated time", value: "8–10 minutes" },
          { label: "Prerequisite", value: "Lesson 8 (Scanning the Card)" },
          { label: "Unlocks", value: "Lesson 10 (Defense)" },
          {
            label: "Why it matters",
            value:
              "This is where Mahjong stops being mechanical and becomes a real game. Strategy is the skill that separates someone who knows the rules from someone who actually plays.",
          },
        ]}
      /></>}>
        {/* ── 1. From scanning to playing ── */}
        <LessonScreen title="📈 From Scanning to Playing">
          <p>
            In Lesson 8 you learned to scan your tiles and pick 2–3
            candidate hands. Now the game begins — and every turn is a
            decision: <strong>what to keep, what to discard, and where
            to use your jokers.</strong>
          </p>
          <Callout variant="tip">
            By the middle of the game, you need to{" "}
            <strong>commit to one hand</strong>. The other players are
            committing too — if you&apos;re still undecided on Turn 12,
            you&apos;ve already lost.
          </Callout>
        </LessonScreen>

        {/* ── 5. Joker strategy ── */}
        <LessonScreen title="⭐ Joker Strategy">
          <p>
            You know the joker rules — here&apos;s how to use them smartly.
          </p>
          <ul className="ml-6 list-disc space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Save jokers for hard-to-find tiles</strong> — not ones
              you&apos;ll easily draw
            </li>
            <li>
              <strong>Hold jokers as long as possible</strong> — once exposed,
              opponents can exchange them away
            </li>
            <li>
              <strong>Never use a joker for a pair</strong> — pairs require
              two real tiles
            </li>
            <li>
              <strong>Scan exposures every turn</strong> — look for jokers
              you can exchange for. Free value!
            </li>
          </ul>
        </LessonScreen>

        {/* ── 6. What to discard — decision tree ── */}
        <LessonScreen title="🤔 What Should I Discard?">
          <p>
            Deciding what to throw away is the <strong>core skill</strong>{" "}of American
            Mahjong. Follow this flowchart every turn until it becomes instinct.
          </p>

          {/* Single-card flowchart — enter at top, exit at the first YES */}
          <div className="my-4 mx-auto w-full max-w-sm overflow-hidden rounded-xl border-2 border-[var(--color-accent)] bg-white shadow-sm">
            {/* Header */}
            <div className="bg-[var(--color-mid)] px-3 py-2 text-center text-[13px] font-bold uppercase tracking-wider text-white">
              Pick up a tile — ask yourself:
            </div>

            {/* Question 1 */}
            <div className="border-b border-zinc-200 px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[13px] font-black text-white">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-[var(--color-mid)]">
                    Does it fit any of my hands?
                  </p>
                  <div className="mt-1.5 inline-block rounded-md border-2 border-[var(--color-green)] bg-[#E8F5E9] px-2.5 py-1 text-[13px] font-bold text-[var(--color-green)]">
                    YES → Keep it ✓
                  </div>
                </div>
              </div>
            </div>

            {/* "No" connector */}
            <div className="flex items-center gap-2 px-4 py-1 bg-zinc-50">
              <div className="h-px flex-1 bg-zinc-300" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-400">No? Keep going ↓</span>
              <div className="h-px flex-1 bg-zinc-300" />
            </div>

            {/* Question 2 */}
            <div className="border-b border-zinc-200 px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[13px] font-black text-white">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-[var(--color-mid)]">
                    Has it already been discarded?
                  </p>
                  <div className="mt-1.5 inline-block rounded-md border-2 border-[var(--color-green)] bg-[#E8F5E9] px-2.5 py-1 text-[13px] font-bold text-[var(--color-green)]">
                    YES → Safer to throw ✓
                  </div>
                </div>
              </div>
            </div>

            {/* "No" connector */}
            <div className="flex items-center gap-2 px-4 py-1 bg-zinc-50">
              <div className="h-px flex-1 bg-zinc-300" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-zinc-400">No? Keep going ↓</span>
              <div className="h-px flex-1 bg-zinc-300" />
            </div>

            {/* Question 3 */}
            <div className="px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[13px] font-black text-white">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-[var(--color-mid)]">
                    Are 3 copies already visible?
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <span className="inline-block rounded-md border-2 border-[var(--color-green)] bg-[#E8F5E9] px-2.5 py-1 text-[13px] font-bold text-[var(--color-green)]">
                      YES → 100% safe ✓
                    </span>
                    <span className="inline-block rounded-md border-2 border-[var(--color-accent)] bg-[#E8F5EC] px-2.5 py-1 text-[13px] font-bold text-[var(--color-accent)]">
                      NO → Risky ⚠ Be careful
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LessonScreen>

        {/* ── 7. Discard priority list ── */}
        <LessonScreen title="📜 What to Discard First">
          <p>
            When multiple tiles could go, discard in this order:
          </p>
          <ol className="ml-6 list-decimal space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>Tiles that fit none of your hands</strong> — dump first</li>
            <li><strong>Tiles already in the discard pile</strong> — safe</li>
            <li><strong>Winds/Dragons you don&apos;t need</strong> — usually safe</li>
            <li><strong>Tiles from your backup hand</strong> — time to commit</li>
            <li><strong>Tiles opponents seem to need</strong> — last resort</li>
            <li><strong>Jokers</strong> — never discard</li>
          </ol>

          <Callout variant="tip">
            If 3 copies of a tile are already visible (discards + exposures),
            it&apos;s <strong>completely safe</strong> to throw — no one can use it.
          </Callout>
        </LessonScreen>

        {/* ── 8. Worked example ── */}
        <LessonScreen title="🧠 Worked Example: What Would You Discard?">
          <p>
            You just drew your 14th tile. Your candidate hands are{" "}
            <strong>&quot;Even Bams&quot;</strong>{" "}(a practice hand: pairs and pungs of
            2-4-6-8 Bam) and a <strong>backup Dragons</strong>{" "}hand. Here&apos;s your
            rack:
          </p>

          <TileRow caption="Your 14 tiles after the draw. Which one goes?">
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={2} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={4} size="sm" />
            <Tile type="bam" value={6} size="sm" />
            <Tile type="bam" value={6} size="sm" />
            <Tile type="bam" value={8} size="sm" />
            <Tile type="bam" value={8} size="sm" />
            <Tile type="dragon" value="green" size="sm" />
            <Tile type="dragon" value="green" size="sm" />
            <Tile type="dragon" value="red" size="sm" />
            <Tile type="joker" size="sm" />
            <Tile type="crack" value={5} size="sm" marked />
            <Tile type="wind" value="N" size="sm" />
          </TileRow>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            Walking through the tree
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>5 Crak</strong> — fits neither candidate. Wrong suit for Even
              Bams, wrong tile for Dragons. <strong>Step 1 says discard.</strong>
            </li>
            <li>
              <strong>North Wind</strong> — also fits neither. Honors are
              usually a fine discard, but dump the 5 Crak first — middle-suit
              tiles are live for more opponents, so you want it gone before
              someone can call it.
            </li>
            <li>
              <strong>Red Dragon</strong> — this is the key trap. It&apos;s only 1 of 4
              and your backup hand needs it. Don&apos;t discard it yet — wait until
              you&apos;ve fully committed to Even Bams.
            </li>
            <li>
              <strong>Joker</strong> — never. Save it for the hardest tile to find.
            </li>
          </ul>

          <Callout variant="tip">
            <strong>The answer:</strong>{" "}discard the <strong>5 Crak</strong>. It fits
            no candidate hand, and it&apos;s the tile that costs you the least to lose.
            The marked tile in the rack above is the one to throw.
          </Callout>
        </LessonScreen>

        {/* ── 9. Interactive drill ── */}
        <LessonScreen title="">
          <DiscardDrill />
        </LessonScreen>

        {/* ── 10. Closing principles ── */}
        <LessonScreen title="🧭 Five Principles to Take with You">
          <ol className="ml-6 list-decimal space-y-2 text-[14px] text-zinc-700">
            <li>
              <strong>Target a hand, don&apos;t collect tiles.</strong>{" "}Every tile is
              either getting you closer to a specific hand on the card, or it&apos;s
              not.
            </li>
            <li>
              <strong>Wide early, narrow late.</strong> 3 → 2 → 1 candidates.
            </li>
            <li>
              <strong>Read the wall.</strong>{" "}Track which tiles are gone. Safe
              discards come from awareness.
            </li>
            <li>
              <strong>Jokers are for hard-to-find tiles.</strong>{" "}Not for tiles
              you&apos;ll naturally draw.
            </li>
            <li>
              <strong>When in doubt, don&apos;t call.</strong>{" "}Concealed flexibility
              beats exposed commitment.
            </li>
          </ol>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={8}
            title="Lesson 9 Check"
            passThreshold={4}
            questions={[
              {
                question:
                  "Right after the deal, how many candidate hands should you keep in mind?",
                options: ["Just 1", "2 or 3", "All of them", "None — wait and see"],
                correct: 1,
                explanation:
                  "Keep 2–3 candidates after the deal. Committing to 1 too early means every bad draw hurts you. Narrow down as the game progresses.",
              },
              {
                question:
                  "By the middle of the game (after 5–6 draws), what should you do?",
                options: [
                  "Stay open to all hands",
                  "Add more candidate hands",
                  "Commit to one primary hand",
                  "Pass all your tiles",
                ],
                correct: 2,
                explanation:
                  "Wide early, narrow late. By the mid-game you must commit to a single hand and start discarding tiles from your backup candidates.",
              },
              {
                question: "Which is the FIRST priority for what to discard?",
                options: [
                  "Tiles your opponents need",
                  "Honors you don't need",
                  "Tiles in NONE of your candidate hands",
                  "Jokers",
                ],
                correct: 2,
                explanation:
                  "Always start with tiles that have zero value to you — tiles in none of your candidate hands. Jokers are NEVER discarded.",
              },
              {
                question: 'What does it mean when a tile is "completely safe" to discard?',
                options: [
                  "You like the tile",
                  "It's a flower",
                  "3 of that tile are already in discards or exposed groups",
                  "Nobody has called yet this round",
                ],
                correct: 2,
                explanation:
                  "Once 3 of a tile are out of play (in discards or exposed groups), no one can ever make a Pung or Kong of it. That tile is now completely safe to discard. This is called 'reading the wall.'",
              },
              {
                question: "Where should you spend a joker?",
                options: [
                  "On a pair you're missing",
                  "On the tile that's hardest to find",
                  "On the first incomplete group you see",
                  "Save them — never spend jokers",
                ],
                correct: 1,
                explanation:
                  "Jokers are most valuable on rare tiles. Don't waste one on a common middle-suit tile you'll likely draw. And remember — jokers can never substitute in a pair.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 9 Complete">
          <p>
            You now know how to think like an American Mahjong player: stay flexible
            early, commit late, manage jokers, and use a discard framework instead of
            guessing.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 10 covers <strong>Defense</strong>{" "}
            — how to read the discards and exposures coming from your opponents, and
            how to avoid feeding them the tile that wins them the game.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={8}
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
