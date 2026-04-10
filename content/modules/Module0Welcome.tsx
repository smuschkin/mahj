import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
import { LessonScreen } from "@/components/LessonScreen";
import { ScreenStepper } from "@/components/ScreenStepper";
import { WinningHandTeaser } from "@/components/WinningHandTeaser";
import { ModuleNav } from "@/components/ModuleNav";
import { getAdjacentModules } from "@/lib/modules";

export default function Module0Welcome() {
  const adj = getAdjacentModules(0);
  return (
    <PageWrap>
      <Cover
        eyebrow="MAHJ — Module 0"
        title="Welcome to"
        highlight="MAHJ"
        subtitle="Your path from absolute beginner to your first real game"
      />

      <MetaBox
        items={[
          { label: "Goal", value: "Set expectations and get you ready for Module 1." },
          { label: "Estimated time", value: "3–4 minutes" },
          { label: "Prerequisite", value: "None — start here" },
          { label: "Unlocks", value: "Module 1 (Tile Trainer)" },
        ]}
      />

      <SectionHeader>Welcome</SectionHeader>

      <ScreenStepper moduleNum={0}>
        <LessonScreen title="👋 Welcome to MAHJ">
          <p>
            You&apos;re about to learn <strong>American Mahjong</strong> — a 4-player tile
            game that&apos;s part strategy, part luck, and all fun.
          </p>
          <p>
            By the end of this app, you&apos;ll be able to sit down at a real game and
            hold your own.
          </p>
          <p>
            <strong>No experience needed. We start from zero.</strong>
          </p>
        </LessonScreen>

        <LessonScreen title="🀄 What Is American Mahjong?">
          <p>
            American Mahjong is a <strong>tile game</strong> played by{" "}
            <strong>4 people</strong> around a table.
          </p>
          <p>
            Think of it like rummy — but with beautiful tiles instead of cards, a unique
            trading ritual, and <em>wild jokers</em> that make every hand exciting.
          </p>
          <p>
            Each game takes about <strong>15–30 minutes</strong>. You&apos;ll usually play
            several in an evening with friends.
          </p>
        </LessonScreen>

        <LessonScreen title="🏆 How You Win">
          <p>
            Your goal: be the first to build a complete <strong>&quot;hand&quot;</strong>{" "}
            of 14 tiles that matches one of the official winning patterns.
          </p>
          <p>
            You&apos;ll draw tiles, swap tiles, and watch what others discard — slowly
            working toward your target hand.
          </p>
          <p>
            When you complete it, you call <strong>&quot;Mahjong!&quot;</strong> and you
            win the round.
          </p>
          <WinningHandTeaser />
        </LessonScreen>

        <LessonScreen title="🛒 What You Need">
          <p className="text-sm text-zinc-600 italic mb-4">
            Don&apos;t have it all yet? No problem — start the lessons now and
            gather your gear later.
          </p>

          <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-red)]">
            Essentials
          </h4>
          <ul className="mb-5 space-y-2 text-[14px]">
            {([
              ["2–3 friends (3 or 4 players)", "4 players is standard, but you can play with 3 in a pinch. Until you have a group, the app's drills let you practice solo."],
              ["A 152-tile American Mahjong set", "A starter set runs $40–80. Look for one labeled \"American\" — it should include 8 jokers, 4 racks, and 2 dice."],
              ["The official NMJL card", "About $14/year from the National Mah Jongg League. Lists all legal winning hands, updated every spring."],
              ["A real table", "Card table or kitchen table. Coffee tables are too small for 4 walls + racks + a play area."],
              ["About 2 hours for your first session", "Setup is slow at first and you'll have lots of questions. Pace yourself."],
            ] as const).map(([title, body], i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-red)] text-[10px] font-black text-white">✓</span>
                <span><strong className="text-[var(--color-mid)]">{title}</strong> — <span className="text-zinc-600">{body}</span></span>
              </li>
            ))}
          </ul>

          <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-green)]">
            Optional but nice
          </h4>
          <ul className="space-y-2 text-[14px]">
            {([
              ["Coins, chips, or tokens", "For paying out hands. Quarters work great — each player starts with the same amount (e.g. $5). Poker chips work too. Some groups just keep score on paper."],
              ["A table cover or mat", "Protects the table and quiets the tile noise. Felt or neoprene mats are ideal."],
              ["A tile pusher", "A flat bar that helps you push your wall forward neatly."],
              ["Card holders / stands", "Small stands to prop up the NMJL card so your hands stay free."],
              ["Pencil and paper (or a scoring app)", "Someone has to track the score. A small notepad works fine."],
              ["Snacks & drinks", "On a side table, away from the tiles. Mahjong is a social game — food is traditional."],
              ["This app on your phone", "The scoring calculator, glossary, and cheat sheet are designed for game-night reference."],
            ] as const).map(([title, body], i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-black text-zinc-500">~</span>
                <span><strong className="text-[var(--color-mid)]">{title}</strong> — <span className="text-zinc-600">{body}</span></span>
              </li>
            ))}
          </ul>
        </LessonScreen>

        <LessonScreen title="🌱 What to Expect">
          <p className="text-sm text-zinc-600 italic mb-4">
            A little honesty about what your first few games will feel like.
          </p>
          <ul className="space-y-0">
            {[
              [
                "Your first few games will feel slow and confusing.",
                "That's completely normal. Mahjong has a longer learning curve than most card games — and it gets fun fast.",
              ],
              [
                "You probably won't win your first 3–5 games.",
                "That's not failure — that's the learning curve. Even experienced players lose plenty. Trust the process.",
              ],
              [
                "Don't try to memorize the card on day one.",
                "Nobody does. You'll pick it up by playing. Most regulars take a whole season to get fast at reading the card.",
              ],
              [
                "Mistakes are normal — and recoverable.",
                "Every experienced player has knocked over the wall, called wrong, and forgotten the rules. The table will help you. Don't be afraid to ask.",
              ],
              [
                "It's a social game first.",
                "American Mahjong is about the people at the table as much as the tiles. Bring your patience and your sense of humor.",
              ],
              [
                "This app teaches you the game, not the card.",
                "When you're ready for real play, you'll buy the official card separately.",
              ],
            ].map(([title, body], i, arr) => (
              <li
                key={i}
                className={`flex items-start gap-3 py-3 text-sm ${
                  i < arr.length - 1
                    ? "border-b border-dashed border-[var(--color-accent)]"
                    : ""
                }`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-black text-white">
                  ★
                </span>
                <div>
                  <strong className="text-[var(--color-mid)]">{title}</strong>
                  <span className="text-zinc-600"> — {body}</span>
                </div>
              </li>
            ))}
          </ul>
        </LessonScreen>

        <LessonScreen title="🎉 You're Ready">
          <p>
            That&apos;s everything you need to know before we start. Next up is{" "}
            <strong>Module 1</strong>, where you&apos;ll learn to recognize all 152 tiles
            in an American Mahjong set — organized into 5 simple groups.
          </p>
          <p>It takes about 6–8 minutes. Let&apos;s go.</p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
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
