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
import { DefenseDrill } from "@/components/DefenseDrill";
import { TileCountingDrill } from "@/components/TileCountingDrill";
import { getAdjacentModules } from "@/lib/modules";

/* ── Local helpers ── */

function ReadCard({
  title,
  exposure,
  tells,
}: {
  title: string;
  exposure: React.ReactNode;
  tells: React.ReactNode;
}) {
  return (
    <div className="my-3 rounded-xl border-2 border-[var(--color-border)] bg-white p-4 shadow-sm">
      <h4 className="mb-2 font-serif text-base font-black text-[var(--color-mid)]">
        {title}
      </h4>
      <div className="flex flex-wrap items-end justify-center gap-2 rounded-md bg-gradient-to-br from-[#1A4D2E] to-[#0F3320] p-3">
        {exposure}
      </div>
      <div className="mt-3 text-[13px] text-zinc-700">{tells}</div>
    </div>
  );
}

function ThreatStage({
  label,
  count,
  status,
  what,
  tone,
}: {
  label: string;
  count: string;
  status: string;
  what: string;
  tone: "calm" | "alert" | "alarm";
}) {
  const colors =
    tone === "alarm"
      ? "border-[var(--color-red)] bg-[#FFF6F4]"
      : tone === "alert"
        ? "border-[#C8A951] bg-[#FFFBEB]"
        : "border-[var(--color-green)] bg-[#F4FBF6]";
  const labelColor =
    tone === "alarm"
      ? "text-[var(--color-red)]"
      : tone === "alert"
        ? "text-[#C8A951]"
        : "text-[var(--color-green)]";
  return (
    <div className={`rounded-lg border-2 p-3 text-center ${colors}`}>
      <div className={`text-[13px] font-bold uppercase tracking-wider ${labelColor}`}>
        {label}
      </div>
      <div className="my-1 font-serif text-2xl font-black text-[var(--color-mid)]">
        {count}
      </div>
      <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
        {status}
      </div>
      <div className="mt-1 text-[12px] text-zinc-600">{what}</div>
    </div>
  );
}

export default function Module7Defense() {
  const adj = getAdjacentModules(10);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={10} coverProps={{ eyebrow: "MAHJ — Lesson 11", title: "Defense &", highlight: "Wall Awareness", subtitle: "Reading the table, tracking discards, and not feeding the win" }} header={<><Cover
        eyebrow="MAHJ — Lesson 11"
        title="Defense &"
        highlight="Wall Awareness"
        subtitle="Reading the table, tracking discards, and not feeding the win"
      />
      <SectionHeader>Lesson</SectionHeader>
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Learn to read opponents' exposures and discards, identify hot vs. safe tiles, and know when to switch from offense to defense.",
          },
          { label: "Estimated time", value: "9–11 minutes" },
          { label: "Prerequisite", value: "Lesson 10 (Hand Strategy)" },
          { label: "Unlocks", value: "Lesson 12 (Table Etiquette)" },
          {
            label: "Why it matters",
            value:
              "The hardest game to lose is the one where you hand the winning tile to your opponent. Defense is how you stop being that player.",
          },
        ]}
      /></>}>
        {/* ── 1. What is defense? ── */}
        <LessonScreen title="🛡️ What Is Defense?">
          <p>
            Opponents can call tiles <strong>you discard</strong>. Defense
            means making sure you don&apos;t throw the tile that wins
            someone else the game.
          </p>
          <Callout variant="tip">
            Defense isn&apos;t playing scared — it&apos;s{" "}
            <strong>not paying</strong>{" "}the player who wins because you
            fed them the winning tile.
          </Callout>
        </LessonScreen>

        {/* ── 2. Exposures are tells ── */}
        <LessonScreen title="👁️ Every Exposure Is a Tell">
          <p>
            Read every exposure like a sentence — it tells you their{" "}
            <strong>suit</strong>, their <strong>numbers</strong>, and
            which hands they&apos;re likely building.
          </p>

          <ReadCard
            title="Two pungs of Bams exposed"
            exposure={
              <>
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <Tile type="bam" value={3} size="sm" />
                <span className="mx-2 text-zinc-400">•</span>
                <Tile type="bam" value={6} size="sm" />
                <Tile type="bam" value={6} size="sm" />
                <Tile type="bam" value={6} size="sm" />
              </>
            }
            tells={
              <>
                <strong>Read:</strong>{" "}they&apos;re probably building a{" "}
                <em>same-suit Bams</em>{" "}hand (or a 369 hand). Other Bams — especially
                3, 6, and 9 — are now <strong>dangerous discards</strong>. Craks and
                Dots are likely safer.
              </>
            }
          />

          <ReadCard
            title="A Pung of Greens + a Pung of West"
            exposure={
              <>
                <Tile type="dragon" value="green" size="sm" />
                <Tile type="dragon" value="green" size="sm" />
                <Tile type="dragon" value="green" size="sm" />
                <span className="mx-2 text-zinc-400">•</span>
                <Tile type="wind" value="W" size="sm" />
                <Tile type="wind" value="W" size="sm" />
                <Tile type="wind" value="W" size="sm" />
              </>
            }
            tells={
              <>
                <strong>Read:</strong>{" "}they&apos;re building a{" "}
                <em>winds-and-dragons</em>{" "}hand. <strong>Stop discarding honors.</strong> Every Wind and every Dragon you throw could be the tile that wins them
                the game.
              </>
            }
          />

          <ReadCard
            title="Pung of 5 Crak + Pung of 5 Dot"
            exposure={
              <>
                <Tile type="crack" value={5} size="sm" />
                <Tile type="crack" value={5} size="sm" />
                <Tile type="crack" value={5} size="sm" />
                <span className="mx-2 text-zinc-400">•</span>
                <Tile type="dot" value={5} size="sm" />
                <Tile type="dot" value={5} size="sm" />
                <Tile type="dot" value={5} size="sm" />
              </>
            }
            tells={
              <>
                <strong>Read:</strong>{" "}two different suits, same number — almost
                certainly a <em>like-numbers</em>{" "}hand built around 5s. The third group
                is probably 5 Bams. <strong>Never discard a 5 Bam to this player.</strong>
              </>
            }
          />
        </LessonScreen>

        {/* ── 3. Read the discards too ── */}
        <LessonScreen title="🗑️ Reading the Discard Pile">
          <ul className="ml-6 list-disc space-y-1.5 text-[14px] text-zinc-700">
            <li><strong>Throwing lots of one suit?</strong>{" "}That suit is safe to throw at them.</li>
            <li><strong>Not throwing a suit at all?</strong>{" "}They&apos;re probably collecting it. Avoid feeding it.</li>
            <li><strong>Dumping Winds and Dragons early?</strong>{" "}They&apos;re not on a Winds/Dragons hand — safe to throw honors at them.</li>
          </ul>
          <Callout variant="tip">
            The best defensive question:{" "}
            <strong>&quot;What hasn&apos;t been discarded?&quot;</strong>
          </Callout>
        </LessonScreen>

        {/* ── 4. Reading the wall — when a tile becomes safe ── */}
        <LessonScreen title="🧮 Reading the Wall: When Does a Tile Become Safe?">
          <p>
            Every tile in American Mahjong exists in <strong>exactly 4 copies</strong>{" "}
            (with 8 Flowers and 8 Jokers being the exceptions). Once you can see where
            those 4 copies are, you know whether a tile is dangerous.
          </p>

          <div className="my-4 grid gap-3 sm:grid-cols-3">
            <ThreatStage
              label="0–1 visible"
              count="Live"
              status="Dangerous"
              what="3+ copies still hidden. Anyone could be collecting it."
              tone="alarm"
            />
            <ThreatStage
              label="2 visible"
              count="Watch"
              status="Risky"
              what="Only 2 copies left. Possible Pung but no Kong."
              tone="alert"
            />
            <ThreatStage
              label="3 visible"
              count="Safe"
              status="Throw it"
              what="No one can Pung with real tiles. Still possible with jokers, but very unlikely."
              tone="calm"
            />
          </div>

        </LessonScreen>

        {/* ── 5. Danger zone: middle suits and honors near pairs ── */}
        <LessonScreen title="🔥 Tiles That Are Usually Dangerous">
          <p className="text-[14px] text-zinc-600">
            &quot;Dangerous&quot; doesn&apos;t mean &quot;never throw.&quot;{" "}
            Defense is about <em>choosing the least dangerous option</em>,
            not freezing up.
          </p>

          <div className="my-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border-l-4 border-[var(--color-red)] bg-[#FFF6F4] p-4">
              <h4 className="mb-1 font-serif text-sm font-black text-[var(--color-mid)]">
                ⚠️ Usually dangerous
              </h4>
              <ul className="ml-5 list-disc space-y-0.5 text-[13px] text-zinc-700">
                <li>Middle numbers (4, 5, 6) — used in tons of hands</li>
                <li>Dragons — central to many same-suit and honors hands</li>
                <li>Winds, late game, if no one has discarded them</li>
                <li>Tiles in the &quot;hot&quot; suit nobody is throwing</li>
                <li>The year-hand digits, when those hands are popular</li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-[var(--color-green)] bg-[#F4FBF6] p-4">
              <h4 className="mb-1 font-serif text-sm font-black text-[var(--color-mid)]">
                ✅ Usually safer
              </h4>
              <ul className="ml-5 list-disc space-y-0.5 text-[13px] text-zinc-700">
                <li>Tiles already in the discard pile</li>
                <li>The 4th copy when 3 are visible (always safe)</li>
                <li>Tiles in a suit a player has been dumping</li>
                <li>Honors that were thrown early by everyone</li>
                <li>Edge numbers (1, 9) are generally safer</li>
              </ul>
            </div>
          </div>

        </LessonScreen>

        {/* ── 6. Threat levels: how many exposures? ── */}
        <LessonScreen title="🚨 How Dangerous Is Each Opponent?">
          <p>
            Not every opponent is equally close to winning. Use their{" "}
            <strong>number of exposures</strong>{" "}as a quick threat gauge.
          </p>

          <div className="my-4 space-y-2">
            <div className="rounded-lg border-2 border-[var(--color-green)] bg-[#F4FBF6] p-3">
              <div className="font-serif text-sm font-black text-[var(--color-green)]">
                0 exposures
              </div>
              <p className="text-[13px] text-zinc-600">
                They&apos;re still building or going for a concealed hand. Hard to
                read. Normal play.
              </p>
            </div>
            <div className="rounded-lg border-2 border-[#C8A951] bg-[#FFFBEB] p-3">
              <div className="font-serif text-sm font-black text-[#C8A951]">
                1 exposure
              </div>
              <p className="text-[13px] text-zinc-600">
                Committed to a direction. You can read their hand family. Avoid
                obviously matching tiles.
              </p>
            </div>
            <div className="rounded-lg border-2 border-[#E67E22] bg-[#FFF5EB] p-3">
              <div className="font-serif text-sm font-black text-[#E67E22]">
                2 exposures
              </div>
              <p className="text-[13px] text-zinc-600">
                Halfway to mahjong. Treat them as a serious threat. Start playing safe
                tiles toward them whenever possible.
              </p>
            </div>
            <div className="rounded-lg border-2 border-[var(--color-red)] bg-[#FFECEC] p-3">
              <div className="font-serif text-sm font-black text-[var(--color-red)]">
                3+ exposures
              </div>
              <p className="text-[13px] text-zinc-600">
                One tile from winning. <strong>Full defense.</strong>{" "}Only discard
                tiles you are <em>certain</em>{" "}they cannot use.
              </p>
            </div>
          </div>
        </LessonScreen>

        {/* ── 7. When to fold (courtesy-style) ── */}
        <LessonScreen title="🏳️ When to Fold (and What Folding Means)">
          <p>
            Folding in American Mahjong doesn&apos;t mean you stop playing — there are
            no bets to fold on, and you can still self-draw your way to a win. It means
            you <strong>shift from playing to win to playing not to lose</strong>.
          </p>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Signs it&apos;s time to fold
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>An opponent has 2+ exposures and you have 0 or 1</li>
            <li>Your hand is still 5+ tiles away from completion in the late game</li>
            <li>The wall is short (under 20 tiles left) and you don&apos;t see your win</li>
            <li>You&apos;ve been forced to break your own pairs to discard safely</li>
          </ul>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            How to fold
          </h4>
          <ol className="ml-6 list-decimal space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>Stop calling.</strong>{" "}Don&apos;t expose any more — you&apos;d
              just leak more information.
            </li>
            <li>
              <strong>Discard safest first.</strong> 4th-copy tiles, suits the threat
              has been dumping, dead honors.
            </li>
            <li>
              <strong>Break your own forming groups</strong>{" "}if needed to throw safe
              tiles. A pair you don&apos;t need anymore is a great safe discard source.
            </li>
            <li>
              <strong>Don&apos;t panic-discard a Joker.</strong>{" "}Even folding, your
              Joker stays in your hand. It&apos;s never a defensive sacrifice.
            </li>
          </ol>

          <Callout variant="warn">
            One opponent winning costs you a single payment. <em>You</em>{" "}being the one
            who discards their winning tile is much worse — in most house rules, the
            discarder pays <strong>double</strong>{" "}or pays for the whole table. Folding
            saves real money.
          </Callout>
        </LessonScreen>

        {/* ── 8. Worked example ── */}
        <LessonScreen title="🧠 Worked Example: Read the Table">
          <p>
            It&apos;s mid-game. Here&apos;s what you can see across the table from your
            three opponents:
          </p>

          <div className="my-3 space-y-3">
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <div className="mb-1 text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                Player on your right — 2 exposures
              </div>
              <TileRow background="felt">
                <Tile type="dot" value={2} size="sm" />
                <Tile type="dot" value={2} size="sm" />
                <Tile type="dot" value={2} size="sm" />
                <Tile type="dot" value={4} size="sm" />
                <Tile type="dot" value={4} size="sm" />
                <Tile type="dot" value={4} size="sm" />
              </TileRow>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <div className="mb-1 text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                Player across — 1 exposure
              </div>
              <TileRow background="felt">
                <Tile type="dragon" value="red" size="sm" />
                <Tile type="dragon" value="red" size="sm" />
                <Tile type="dragon" value="red" size="sm" />
              </TileRow>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-3">
              <div className="mb-1 text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                Player on your left — 0 exposures (concealed?)
              </div>
              <p className="text-[12px] italic text-zinc-500">
                Nothing to read. Discards have been mostly Craks.
              </p>
            </div>
          </div>

          <p>
            Now your turn. You have to discard one of these:
          </p>
          <TileRow caption="Pick your discard.">
            <Tile type="dot" value={6} size="sm" />
            <Tile type="dragon" value="red" size="sm" />
            <Tile type="crack" value={3} size="sm" marked />
          </TileRow>

          <h4 className="mt-3 font-serif text-base font-black text-[var(--color-mid)]">
            Walking through it
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>6 Dot</strong> — the player to your right has TWO Dot exposures
              and is one tile from a same-suit Dots hand. <strong>Hot. Don&apos;t.</strong>
            </li>
            <li>
              <strong>Red Dragon</strong> — the player across already has an exposed
              Pung of Red Dragons (3 out of 4). That means no one else can pung
              or kong it — they already have their group. The 4th Red Dragon is
              actually <strong>pretty safe</strong>{" "}to throw.
            </li>
            <li>
              <strong>3 Crak</strong> — the left player has been dumping Craks all
              game. The other two have no Crak exposures. <strong>Safe.</strong>{" "}Throw
              it.
            </li>
          </ul>

          <Callout variant="tip">
            <strong>Answer:</strong> 3 Crak is the safest — Craks are clearly
            unwanted. The Red Dragon is also a reasonable discard since 3 of the
            4 are already exposed. The 6 Dot is the one to avoid — it could
            complete someone&apos;s hand.
          </Callout>
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={10}
            title="Lesson 11 Check"
            passThreshold={4}
            questions={[
              {
                question: "When does a tile become 100% safe to discard?",
                options: [
                  "When you don't need it",
                  "When 3 copies are already visible (in discards or exposed groups)",
                  "When it's a flower",
                  "After turn 10",
                ],
                correct: 1,
                explanation:
                  "Once 3 of a tile are out of play, no one can ever make a Pung or Kong of it. The 4th copy is completely safe to throw.",
              },
              {
                question:
                  "An opponent has exposed two Pungs, both in the Bam suit. What should you do?",
                options: [
                  "Discard more Bams to confuse them",
                  "Avoid discarding Bams, especially low and middle ones",
                  "It doesn't matter",
                  "Discard a Joker",
                ],
                correct: 1,
                explanation:
                  "Two same-suit exposures = they're building a same-suit hand. Stop feeding them tiles in that suit.",
              },
              {
                question: "How many exposures usually means it's time to play full defense?",
                options: ["0", "1", "2", "3 or more"],
                correct: 3,
                explanation:
                  "3+ exposures means an opponent is one tile away from winning. Only discard tiles you are certain they cannot use.",
              },
              {
                question: "Which is the BEST defensive read?",
                options: [
                  "What tiles your opponents have discarded",
                  "What tiles your opponents have NOT discarded",
                  "What color the table is",
                  "How fast they're playing",
                ],
                correct: 1,
                explanation:
                  "What an opponent isn't throwing is more revealing than what they are. The 'hot' suit is the one nobody is dumping.",
              },
              {
                question: "What does it mean to 'fold' in American Mahjong?",
                options: [
                  "Throw your tiles in and stop playing",
                  "Show everyone your hand",
                  "Shift from playing to win to playing only safe tiles",
                  "Pay a penalty",
                ],
                correct: 2,
                explanation:
                  "Folding means you stop trying to win and start discarding only the safest tiles you can. You keep playing — you just don't want to be the one who feeds the winner.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 11 Complete">
          <p>
            You can now read the table — exposures, discards, and the wall. You know
            when a tile is safe, when an opponent is dangerous, and when to fold
            instead of fight. That makes you a real defensive player.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 12 covers{" "}
            <strong>Etiquette &amp; Table Culture</strong> — the unwritten rules that
            make you welcome at any mahjong table: how to call your discards, how to
            keep pace, and the social customs that turn a game into a tradition.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <SectionHeader>Practice</SectionHeader>
      <DefenseDrill />
      <TileCountingDrill />

      <ModuleNav
        currentModuleNum={10}
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
