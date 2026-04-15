import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { MetaBox } from "@/components/MetaBox";
import { SectionHeader } from "@/components/SectionHeader";
import { LessonScreen } from "@/components/LessonScreen";
import { ScreenStepper } from "@/components/ScreenStepper";
import { Callout } from "@/components/Callout";
import { ModuleNav } from "@/components/ModuleNav";
import { Quiz } from "@/components/Quiz";
import { getAdjacentModules } from "@/lib/modules";

/* ── Local helpers ── */

function PayCell({
  who,
  amount,
  highlight,
}: {
  who: string;
  amount: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-md border-2 p-2 text-center ${
        highlight
          ? "border-[var(--color-red)] bg-[#FFF6F4]"
          : "border-[var(--color-mid)] bg-white"
      }`}
    >
      <div className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
        {who}
      </div>
      <div
        className={`font-serif text-lg font-black ${
          highlight ? "text-[var(--color-red)]" : "text-[var(--color-mid)]"
        }`}
      >
        {amount}
      </div>
    </div>
  );
}

function PayoutBox({
  title,
  subtitle,
  cells,
  totalNote,
}: {
  title: string;
  subtitle: string;
  cells: { who: string; amount: string; highlight?: boolean }[];
  totalNote?: string;
}) {
  return (
    <div className="my-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-light)] p-4 shadow-sm">
      <h4 className="font-serif text-base font-black text-[var(--color-mid)]">
        {title}
      </h4>
      <p className="mb-3 text-[12px] italic text-zinc-600">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {cells.map((c) => (
          <PayCell key={c.who} {...c} />
        ))}
      </div>
      {totalNote && (
        <p className="mt-2 text-center text-[12px] font-bold text-[var(--color-mid)]">
          {totalNote}
        </p>
      )}
    </div>
  );
}

export default function Module9Scoring() {
  const adj = getAdjacentModules(11);
  return (
    <PageWrap>
      <ScreenStepper moduleNum={11} coverProps={{ eyebrow: "MAHJ — Lesson 12", title: "Scoring &", highlight: "Payouts", subtitle: "Who pays whom and how much — made simple" }} header={<><Cover
        eyebrow="MAHJ — Lesson 12"
        title="Scoring &"
        highlight="Payouts"
        subtitle="Who pays whom and how much — made simple"
      />
      <SectionHeader>Lesson</SectionHeader>
<MetaBox
        items={[
          {
            label: "Goal",
            value:
              "Know exactly who pays whom after every hand. Once you see the pattern, it's easy.",
          },
          { label: "Estimated time", value: "6–8 minutes" },
          { label: "Prerequisite", value: "Lesson 11 (Etiquette)" },
          { label: "Unlocks", value: "Lesson 13 (Common Mistakes & Recovery)" },
        ]}
      /></>}>
        {/* ── 1. The big picture ── */}
        <LessonScreen title="💰 How Scoring Works">
          <p>
            Every hand on the card has a <strong>value</strong>{" "}printed next to
            it — something like 25¢ or 30¢. When someone wins, the other three
            players pay them based on that value.
          </p>
          <p>
            There are only <strong>3 things</strong>{" "}that change what you pay:
          </p>
          <ol className="ml-6 list-decimal space-y-1 text-[14px] text-zinc-700">
            <li>
              <strong>Who threw the winning tile?</strong>{" "}(the discarder pays more)
            </li>
            <li>
              <strong>Did the winner draw it themselves?</strong>{" "}(everyone pays more)
            </li>
            <li>
              <strong>Did the winner use any jokers?</strong>{" "}(no jokers = everyone pays more)
            </li>
          </ol>
          <p className="mt-2 text-[14px] text-zinc-700">
            That&apos;s it. Let&apos;s look at each one.
          </p>
        </LessonScreen>

        {/* ── 2. Win on a discard ── */}
        <LessonScreen title="🗣️ Someone Threw the Winning Tile">
          <p>
            This is the most common way to win. You call Mahjong on someone
            else&apos;s discard.
          </p>
          <p className="font-bold text-[var(--color-mid)]">
            The person who threw it pays <strong>double</strong>. Everyone else
            pays the normal amount.
          </p>

          <PayoutBox
            title="Example: 25¢ hand, win on a discard"
            subtitle="The discarder pays 2×, others pay 1×"
            cells={[
              { who: "Discarder", amount: "50¢", highlight: true },
              { who: "Player 2", amount: "25¢" },
              { who: "Player 3", amount: "25¢" },
            ]}
            totalNote="You collect $1.00"
          />

          <Callout variant="info">
            This is why defense matters — throwing the winning tile costs you
            twice as much as just being at the table.
          </Callout>
        </LessonScreen>

        {/* ── 3. Self-draw ── */}
        <LessonScreen title="🎯 You Drew It Yourself">
          <p>
            If you draw your winning tile from the wall (nobody threw it),
            that&apos;s called a <strong>self-draw</strong>.
          </p>
          <p className="font-bold text-[var(--color-mid)]">
            All three players pay <strong>double</strong>.
          </p>

          <PayoutBox
            title="Example: 25¢ hand, self-draw"
            subtitle="Everyone pays 2× because there's no discarder"
            cells={[
              { who: "Player 1", amount: "50¢", highlight: true },
              { who: "Player 2", amount: "50¢", highlight: true },
              { who: "Player 3", amount: "50¢", highlight: true },
            ]}
            totalNote="You collect $1.50"
          />
        </LessonScreen>

        {/* ── 4. Jokerless ── */}
        <LessonScreen title="⭐ No Jokers? Everything Doubles Again">
          <p>
            If your winning hand has <strong>zero jokers</strong>, all payments
            double on top of whatever they already are.
          </p>

          <PayoutBox
            title="Example: 25¢ hand, discard win, no jokers"
            subtitle="Discarder pays 2× (for discard) × 2 (for jokerless) = 4×"
            cells={[
              { who: "Discarder", amount: "$1.00", highlight: true },
              { who: "Player 2", amount: "50¢" },
              { who: "Player 3", amount: "50¢" },
            ]}
            totalNote="You collect $2.00"
          />

          <PayoutBox
            title="Example: 25¢ hand, self-draw, no jokers"
            subtitle="Everyone pays 2× (self-draw) × 2 (jokerless) = 4×"
            cells={[
              { who: "Player 1", amount: "$1.00", highlight: true },
              { who: "Player 2", amount: "$1.00", highlight: true },
              { who: "Player 3", amount: "$1.00", highlight: true },
            ]}
            totalNote="You collect $3.00 — the jackpot!"
          />

          <Callout variant="warn">
            <strong>Singles &amp; Pairs exception:</strong>{" "}These hands can&apos;t
            use jokers at all, so the jokerless bonus is already included in the
            printed value. Don&apos;t double it again.
          </Callout>
        </LessonScreen>

        {/* ── 5. Quick reference ── */}
        <LessonScreen title="📋 Quick Reference Table">
          <p>
            Here&apos;s every scenario on a <strong>25¢ hand</strong>{" "}at a
            glance:
          </p>

          <div className="my-4 overflow-x-auto rounded-lg border border-[var(--color-border)]">
            <table className="w-full text-[13px]">
              <thead className="bg-[var(--color-light)]">
                <tr>
                  <th className="px-3 py-2 text-left font-black text-[var(--color-mid)]">How you won</th>
                  <th className="px-3 py-2 text-center font-black text-[var(--color-mid)]">Discarder pays</th>
                  <th className="px-3 py-2 text-center font-black text-[var(--color-mid)]">Others pay</th>
                  <th className="px-3 py-2 text-center font-black text-[var(--color-mid)]">You get</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                <tr>
                  <td className="px-3 py-2">Discard win</td>
                  <td className="px-3 py-2 text-center font-bold">50¢</td>
                  <td className="px-3 py-2 text-center">25¢ each</td>
                  <td className="px-3 py-2 text-center font-bold">$1.00</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Self-draw</td>
                  <td className="px-3 py-2 text-center">—</td>
                  <td className="px-3 py-2 text-center font-bold">50¢ each</td>
                  <td className="px-3 py-2 text-center font-bold">$1.50</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Discard + jokerless</td>
                  <td className="px-3 py-2 text-center font-bold">$1.00</td>
                  <td className="px-3 py-2 text-center">50¢ each</td>
                  <td className="px-3 py-2 text-center font-bold">$2.00</td>
                </tr>
                <tr className="bg-[#FFFBEC]">
                  <td className="px-3 py-2 font-bold">Self-draw + jokerless</td>
                  <td className="px-3 py-2 text-center">—</td>
                  <td className="px-3 py-2 text-center font-bold">$1.00 each</td>
                  <td className="px-3 py-2 text-center font-bold text-[var(--color-red)]">$3.00</td>
                </tr>
              </tbody>
            </table>
          </div>

        </LessonScreen>

        {/* ── 6. Concealed is NOT a multiplier ── */}
        <LessonScreen title="🔒 Concealed Hands: Not a Multiplier">
          <p>
            You might notice that concealed hands (marked C on the card) have
            higher printed values than exposed hands. That&apos;s because
            they&apos;re harder to complete.
          </p>
          <p>
            But <strong>concealed is NOT an extra multiplier at payout
            time</strong>. The higher value is already baked into the number on
            the card. Just use the printed number — don&apos;t double it again.
          </p>
        </LessonScreen>

        {/* ── 7. Dead hand ── */}
        <LessonScreen title="💀 Dead Hands">
          <p>
            If your hand is &quot;dead&quot; (you made a mistake that means you
            can&apos;t win), you still:
          </p>
          <ul className="ml-6 list-disc space-y-1 text-[14px] text-zinc-700">
            <li>Keep playing — draw and discard each turn</li>
            <li>Pay the winner at the end, just like everyone else</li>
          </ul>
          <p className="mt-2 text-[14px] text-zinc-700">
            You just can&apos;t win. Some groups add an extra penalty for dead
            hands, but per NMJL rules you simply pay the winner normally.
          </p>
        </LessonScreen>

        {/* ── 8. Other situations ── */}
        <LessonScreen title="🎲 Other Situations">
          <h4 className="font-serif text-base font-black text-[var(--color-mid)]">
            Wall game (nobody wins)
          </h4>
          <p className="text-[14px] text-zinc-700">
            If the wall runs out and nobody called Mahjong,{" "}
            <strong>nobody pays anything</strong>. Reshuffle and redeal. The
            Dealer position rotates clockwise to the next player as usual.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            Misnamed discard (Article 67)
          </h4>
          <p className="text-[14px] text-zinc-700">
            Same rule covered in Lesson 11: the win is valid and the misnamer alone pays for all three losers.
          </p>

          <h4 className="mt-4 font-serif text-base font-black text-[var(--color-mid)]">
            False Mahjong call
          </h4>
          <p className="text-[14px] text-zinc-700">
            If you say &quot;Mahjong&quot; but your hand isn&apos;t actually
            valid, your hand is dead for the rest of the round. You keep
            playing but can&apos;t win, and you pay the winner normally at the
            end.
          </p>
        </LessonScreen>

        {/* ── 9. Worked example ── */}
        <LessonScreen title="🧠 Worked Example">
          <p>
            Sara wins a <strong>30¢</strong>{" "}hand. She drew the winning tile
            herself (self-draw) and has no jokers.
          </p>

          <ol className="ml-6 list-decimal space-y-1 text-[14px] text-zinc-700">
            <li>Start with the hand value: <strong>30¢</strong></li>
            <li>Self-draw: everyone pays double → <strong>60¢ each</strong></li>
            <li>Jokerless: double again → <strong>$1.20 each</strong></li>
            <li>3 players × $1.20 = <strong>$3.60 total</strong></li>
          </ol>

          <PayoutBox
            title="Sara's payout"
            subtitle="30¢ hand · self-draw · no jokers"
            cells={[
              { who: "Player 1", amount: "$1.20", highlight: true },
              { who: "Player 2", amount: "$1.20", highlight: true },
              { who: "Player 3", amount: "$1.20", highlight: true },
            ]}
            totalNote="Sara collects $3.60"
          />
        </LessonScreen>

        {/* ── Quiz ── */}
        <LessonScreen title="">
          <Quiz
            moduleNum={11}
            title="Lesson 12 Check"
            passThreshold={4}
            questions={[
              {
                question:
                  "You threw the winning tile. The hand is worth 25¢, no bonuses. What do you pay?",
                options: ["25¢", "50¢", "75¢", "$1.00"],
                correct: 1,
                explanation:
                  "The discarder pays double: 25¢ × 2 = 50¢. The other two players each pay 25¢.",
              },
              {
                question:
                  "Someone self-draws the winning tile on a 25¢ hand. What does each other player pay?",
                options: ["25¢", "50¢", "75¢", "$1.00"],
                correct: 1,
                explanation:
                  "Self-draw means all three players pay double: 25¢ × 2 = 50¢ each.",
              },
              {
                question:
                  "You threw the winning tile. The hand is 25¢ and has no jokers. What do you pay?",
                options: ["25¢", "50¢", "$1.00", "$2.00"],
                correct: 2,
                explanation:
                  "Discarder pays double (×2), then jokerless doubles again (×2). 25¢ × 2 × 2 = $1.00.",
              },
              {
                question: "Your hand is dead. What happens?",
                options: [
                  "You leave the table",
                  "You keep playing but can't win, and still pay the winner",
                  "You pay everyone immediately",
                  "Nothing — keep playing normally",
                ],
                correct: 1,
                explanation:
                  "Dead hands keep playing (draw and discard each turn) but can't win. You still pay the winner at the end like any other loser.",
              },
              {
                question:
                  "A concealed hand is worth 35¢ on the card. Do you double it again at payout because it's concealed?",
                options: [
                  "Yes — always double concealed hands",
                  "No — the higher value is already in the printed number",
                  "Only if self-drawn",
                  "Only if jokerless",
                ],
                correct: 1,
                explanation:
                  "Concealed is NOT a multiplier. The card already gives concealed hands a higher printed value. Just use the number on the card.",
              },
            ]}
          />
        </LessonScreen>

        {/* ── Completion ── */}
        <LessonScreen title="🎉 Lesson 12 Complete">
          <p>
            You now know exactly who pays whom and how much. The pattern is
            simple: start with the hand value, double for discarder or
            self-draw, double again for jokerless. That covers 95% of
            situations.
          </p>
          <p>
            <strong>What&apos;s next:</strong>{" "}Lesson 13 covers{" "}
            <strong>Common Mistakes</strong> — the errors every beginner
            makes, and how to recover from them gracefully.
          </p>
        </LessonScreen>
      </ScreenStepper>

      <ModuleNav
        currentModuleNum={11}
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
