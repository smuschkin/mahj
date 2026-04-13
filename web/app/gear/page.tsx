import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Recommended Gear — MAHJ",
  description:
    "Everything you need for American Mahjong game night — tiles, racks, cards, and more.",
};

type GearItem = {
  name: string;
  description: string;
  price: string;
  href: string;
  tag: string;
};

const ESSENTIALS: GearItem[] = [
  {
    name: "NMJL Official Card (2026)",
    description:
      "You need this to play. The National Mah Jongg League releases a new card every year with the official hands. This is the one thing you cannot play without.",
    price: "~$15",
    href: "https://www.amazon.com/s?k=NMJL+mah+jongg+card+2026&tag=welcome2mahj-20",
    tag: "Essential",
  },
  {
    name: "American Mahjong Tile Set (166 tiles)",
    description:
      "A full American Mahjong set with 166 tiles (152 game tiles + extras), 4 racks, dice, and a carrying case. Look for sets that include Jokers — not all sets do.",
    price: "$30-80",
    href: "https://www.amazon.com/s?k=american+mahjong+set+166+tiles&tag=welcome2mahj-20",
    tag: "Essential",
  },
];

const NICE_TO_HAVE: GearItem[] = [
  {
    name: "Mahjong Table Cover (felt mat)",
    description:
      "A felt mat that goes on top of any table. Keeps tiles from sliding, reduces noise, and makes the game feel official. Most experienced players have one.",
    price: "$15-30",
    href: "https://www.amazon.com/s?k=mahjong+table+cover+felt+mat&tag=welcome2mahj-20",
    tag: "Recommended",
  },
  {
    name: "Tile Pushers / Rack Extensions",
    description:
      "Longer racks that let you push your wall toward the center more easily. A quality-of-life upgrade that experienced players swear by.",
    price: "$20-40",
    href: "https://www.amazon.com/s?k=mahjong+tile+pushers+rack&tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Mahjong Carrying Case",
    description:
      "If your set didn't come with one, a good carrying case protects your tiles and makes it easy to bring to game night.",
    price: "$15-30",
    href: "https://www.amazon.com/s?k=mahjong+carrying+case&tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Card Holder / Card Stand",
    description:
      "A small stand that holds your NMJL card upright so you can reference it without picking it up every turn. Small but handy.",
    price: "$5-10",
    href: "https://www.amazon.com/s?k=mahjong+card+holder+stand&tag=welcome2mahj-20",
    tag: "Nice to have",
  },
];

const BOOKS: GearItem[] = [
  {
    name: "A Beginner's Guide to American Mah Jongg",
    description:
      "A popular book for learning the basics. Good companion to MAHJ if you like learning from physical books too.",
    price: "~$15",
    href: "https://www.amazon.com/s?k=beginners+guide+american+mah+jongg&tag=welcome2mahj-20",
    tag: "Book",
  },
  {
    name: "Mah Jongg: The Art of the Game",
    description:
      "A beautiful coffee-table book about the history and art of mahjong. Makes a great gift for any mahj player.",
    price: "~$25",
    href: "https://www.amazon.com/s?k=mah+jongg+art+of+the+game&tag=welcome2mahj-20",
    tag: "Gift idea",
  },
];

function GearCard({ item }: { item: GearItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border-2 border-[#C8A951]/30 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-[#1A4D2E] px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-white">
          {item.tag}
        </span>
        <span className="font-serif text-[15px] font-black text-[#C8A951]">
          {item.price}
        </span>
      </div>
      <h3 className="font-serif text-[17px] font-black text-[var(--color-dark)]">
        {item.name}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-zinc-600">
        {item.description}
      </p>
      <p className="mt-3 text-[13px] font-bold text-[var(--color-accent)]">
        View on Amazon &rarr;
      </p>
    </a>
  );
}

export default function GearPage() {
  return (
    <PageWrap>
      <Cover
        eyebrow="Game Night Essentials"
        title="Recommended"
        highlight="Gear"
        subtitle="Everything you need to play American Mahjong"
      />

      <div className="mb-6 rounded-lg border-l-4 border-[#2D8B5E] bg-white px-4 py-4 sm:px-6 sm:py-5 shadow-sm">
        <p className="text-[15px] leading-relaxed text-zinc-600">
          MAHJ teaches you how to play — but you still need tiles to play with!
          Here are our picks for getting started.{" "}
          <strong className="text-[var(--color-mid)]">
            We may earn a small commission from Amazon purchases.
          </strong>
        </p>
      </div>

      <SectionHeader>The Essentials</SectionHeader>
      <div className="space-y-4">
        {ESSENTIALS.map((item) => (
          <GearCard key={item.name} item={item} />
        ))}
      </div>

      <SectionHeader>Nice to Have</SectionHeader>
      <div className="space-y-4">
        {NICE_TO_HAVE.map((item) => (
          <GearCard key={item.name} item={item} />
        ))}
      </div>

      <SectionHeader>Books</SectionHeader>
      <div className="space-y-4">
        {BOOKS.map((item) => (
          <GearCard key={item.name} item={item} />
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-zinc-50 p-6 text-center">
        <p className="text-[13px] text-zinc-500">
          MAHJ is a participant in the Amazon Associates Program. As an Amazon
          Associate, we earn from qualifying purchases. This doesn&apos;t affect
          the price you pay.
        </p>
      </div>
    </PageWrap>
  );
}
