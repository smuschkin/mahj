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
  emoji: string;
  description: string;
  price: string;
  href: string;
  tag: string;
};

const ESSENTIALS: GearItem[] = [
  {
    name: "NMJL Official Card (2026)",
    emoji: "\u{1F4CB}",
    description:
      "You need this to play. The National Mah Jongg League releases a new card every year with the official hands. This is the one thing you cannot play without.",
    price: "~$15",
    href: "https://www.amazon.com/dp/B0GWCVL23K?tag=welcome2mahj-20",
    tag: "Essential",
  },
  {
    name: "GUSTARIA American Mahjong Set",
    emoji: "\u{1F004}",
    description:
      "A complete American Mahjong set with tiles, racks, dice, and a carrying case. Great starter set with everything you need.",
    price: "$30-50",
    href: "https://www.amazon.com/dp/B0D2RC4PWJ?tag=welcome2mahj-20",
    tag: "Essential",
  },
  {
    name: "Topmahjing American Mahjong Tile Set",
    emoji: "\u{1F3B4}",
    description:
      "Another great option with quality tiles and a complete American Mahjong setup. Compare prices and reviews to find the set that fits your budget.",
    price: "$30-60",
    href: "https://www.amazon.com/dp/B0GL95VB3L?tag=welcome2mahj-20",
    tag: "Alternative",
  },
  {
    name: "Yellow Mountain Imports Mahjong Set",
    emoji: "\u{26F0}\uFE0F",
    description:
      "From one of the most trusted names in mahjong gear. Yellow Mountain Imports is known for quality tiles and complete sets. A reliable choice.",
    price: "$50-90",
    href: "https://www.amazon.com/dp/B07SJB92SM?tag=welcome2mahj-20",
    tag: "Top brand",
  },
  {
    name: "Melamine American Mahjong Tiles",
    emoji: "\u{1F48E}",
    description:
      "Durable melamine tiles with a premium feel. Melamine is heavier and more satisfying to play with than standard plastic tiles.",
    price: "$30-60",
    href: "https://www.amazon.com/dp/B0GGHH7VH5?tag=welcome2mahj-20",
    tag: "Quality pick",
  },
  {
    name: "Marllifenney American Mahjong Set",
    emoji: "\u{1F3B2}",
    description:
      "A colorful American Mahjong set with a carrying case. Multiple color options available — pick one that matches your style.",
    price: "$30-60",
    href: "https://www.amazon.com/dp/B0G13KW3L8?tag=welcome2mahj-20",
    tag: "Alternative",
  },
  {
    name: "Arrowbash Beginner Mahjong Set",
    emoji: "\u{1F331}",
    description:
      "Designed specifically for beginners. Melamine tiles with clear markings that are easy to read while you're still learning. Great first set.",
    price: "$30-50",
    href: "https://www.amazon.com/dp/B0FS719Y7D?tag=welcome2mahj-20",
    tag: "Best for beginners",
  },
];

const NICE_TO_HAVE: GearItem[] = [
  {
    name: "Chinoiserie Mahjong Table Mat",
    emoji: "\u{1F7E9}",
    description:
      "A beautiful 31.5\" square mat with traditional chinoiserie design. Keeps tiles from sliding, reduces noise, and makes the table look stunning.",
    price: "$20-40",
    href: "https://www.amazon.com/dp/B0GFDFX12V?tag=welcome2mahj-20",
    tag: "Recommended",
  },
  {
    name: "NMJL Card Protector (transparent cover)",
    emoji: "\u{1F6E1}\uFE0F",
    description:
      "A durable transparent cover that protects your NMJL card from spills, smudges, and wear. Your card costs $15/year — this keeps it in perfect shape.",
    price: "$5-10",
    href: "https://www.amazon.com/dp/B0FKH1KV9T?tag=welcome2mahj-20",
    tag: "Smart buy",
  },
  {
    name: "Leather NMJL Card Case",
    emoji: "\u{1F45D}",
    description:
      "A premium leather case to store and protect your NMJL card. Looks elegant and keeps your card safe between game nights.",
    price: "$10-20",
    href: "https://www.amazon.com/dp/B0FSRMWLCP?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Tile Pushers / Rack Extensions",
    emoji: "\u{1F9F1}",
    description:
      "Longer racks that let you push your wall toward the center more easily. A quality-of-life upgrade that experienced players swear by.",
    price: "$20-40",
    href: "https://www.amazon.com/s?k=mahjong+tile+pushers+rack&tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Waterproof Mahjong Bag",
    emoji: "\u{1F4BC}",
    description:
      "A waterproof bag designed specifically for American Mahjong sets. Protects your tiles from spills and rain on the way to game night.",
    price: "$15-30",
    href: "https://www.amazon.com/dp/B0FPCX6CRZ?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Empty Mahjong Case",
    emoji: "\u{1F9F3}",
    description:
      "A quality empty case perfect for American Mahjong. Great if your set didn't come with one or you need an upgrade.",
    price: "$15-30",
    href: "https://www.amazon.com/dp/B0GH5W8X9C?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Card Holder / Card Stand",
    emoji: "\u{1F4D0}",
    description:
      "A small stand that holds your NMJL card upright so you can reference it without picking it up every turn. Small but handy.",
    price: "$5-10",
    href: "https://www.amazon.com/dp/B0FCRMXB9N?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
];

const FUN_SETS: GearItem[] = [
  {
    name: "Pet-Themed American Mahjong Set",
    emoji: "\u{1F43E}",
    description:
      "Adorable pet-themed tile illustrations make this set a conversation starter at game night. A fun gift for any animal-loving mahj player.",
    price: "$40-60",
    href: "https://www.amazon.com/dp/B0FTRVMY6S?tag=welcome2mahj-20",
    tag: "Fun pick",
  },
  {
    name: "Vintage-Inspired American Mahjong Set",
    emoji: "\u{2728}",
    description:
      "Beautiful vintage-inspired designs with meaningful illustrations. Feels like playing with a piece of art. Makes an incredible gift.",
    price: "$50-80",
    href: "https://www.amazon.com/dp/B0GC61TPLX?tag=welcome2mahj-20",
    tag: "Gift idea",
  },
  {
    name: "Turquoise Mahjong Set with Butterfly Artwork",
    emoji: "\u{1F98B}",
    description:
      "A stunning turquoise set with butterfly-themed artwork. Eye-catching and unique — perfect for players who want something different.",
    price: "$40-70",
    href: "https://www.amazon.com/dp/B0F8M9RG13?tag=welcome2mahj-20",
    tag: "Fun pick",
  },
  {
    name: "Designer American Mahjong Set",
    emoji: "\u{1F48E}",
    description:
      "A beautifully designed American Mahjong set that stands out from the crowd. Great for players who appreciate style at the table.",
    price: "$40-70",
    href: "https://www.amazon.com/dp/B0FJ8TQ69B?tag=welcome2mahj-20",
    tag: "Gift idea",
  },
  {
    name: "ChamThingzeal Premium Mahjong Tiles",
    emoji: "\u{1F3AF}",
    description:
      "Quality American Mahjong tiles with a premium feel. Good weight and durability for regular game nights.",
    price: "$30-60",
    href: "https://www.amazon.com/dp/B0G1K4MSVF?tag=welcome2mahj-20",
    tag: "Quality pick",
  },
  {
    name: "Stylish American Mahjong Set with Case",
    emoji: "\u{1F45C}",
    description:
      "A complete American Mahjong set with a stylish carrying case. Looks great and travels well — bring it to game night in style.",
    price: "$40-70",
    href: "https://www.amazon.com/dp/B0FHXGBRR1?tag=welcome2mahj-20",
    tag: "Fun pick",
  },
];

const BOOKS: GearItem[] = [
  {
    name: "A Beginner's Guide to American Mah Jongg",
    emoji: "\u{1F4D7}",
    description:
      "A popular book for learning the basics. Good companion to MAHJ if you like learning from physical books too.",
    price: "~$15",
    href: "https://www.amazon.com/s?k=beginners+guide+american+mah+jongg&tag=welcome2mahj-20",
    tag: "Book",
  },
  {
    name: "Mah Jongg: The Art of the Game",
    emoji: "\u{1F381}",
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
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-[#1A4D2E] px-3 py-1 text-[13px] font-bold uppercase tracking-wider text-white">
          {item.tag}
        </span>
        <span className="font-serif text-[17px] font-black text-[#C8A951]">
          {item.price}
        </span>
      </div>
      <div className="flex gap-3">
        <span className="text-3xl">{item.emoji}</span>
        <div className="flex-1">
          <h3 className="font-serif text-[18px] font-black text-[var(--color-dark)]">
            {item.name}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
            {item.description}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <span className="inline-block rounded-lg bg-[#1A4D2E] px-4 py-2 text-[14px] font-bold text-white transition hover:bg-[#0F3320]">
          View on Amazon &rarr;
        </span>
      </div>
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

      <SectionHeader>Fun and Gift Sets</SectionHeader>
      <div className="space-y-4">
        {FUN_SETS.map((item) => (
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
        <p className="text-[14px] text-zinc-500">
          MAHJ is a participant in the Amazon Associates Program. As an Amazon
          Associate, we earn from qualifying purchases. This doesn&apos;t affect
          the price you pay.
        </p>
      </div>
    </PageWrap>
  );
}
