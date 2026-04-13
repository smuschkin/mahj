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
  featured?: boolean;
};

/* ───── THE ESSENTIALS ───── */

const MUST_HAVE: GearItem[] = [
  {
    name: "NMJL Official Card (2026)",
    emoji: "\u{1F004}",
    description:
      "You need this to play. The National Mah Jongg League releases a new card every year with the official hands. This is the one thing you cannot play without.",
    price: "~$15",
    href: "https://www.amazon.com/dp/B0GWCVL23K?tag=welcome2mahj-20",
    tag: "Essential",
  },
];

const OUR_PICKS: GearItem[] = [
  {
    name: "GUSTARIA American Mahjong Set",
    emoji: "\u{2B50}",
    description:
      "Our top pick for beginners. A complete American Mahjong set with quality tiles, racks, dice, and a carrying case. Everything you need in one box — great reviews and great value.",
    price: "$30-50",
    href: "https://www.amazon.com/dp/B0D2RC4PWJ?tag=welcome2mahj-20",
    tag: "Our #1 Pick",
    featured: true,
  },
  {
    name: "Arrowbash Beginner Mahjong Set",
    emoji: "\u{1F331}",
    description:
      "Best for brand-new players. Melamine tiles with clear, easy-to-read markings while you're still learning. Affordable and beginner-friendly.",
    price: "$30-50",
    href: "https://www.amazon.com/dp/B0FS719Y7D?tag=welcome2mahj-20",
    tag: "Budget pick",
  },
  {
    name: "Yellow Mountain Imports Mahjong Set",
    emoji: "\u{26F0}\uFE0F",
    description:
      "From the most trusted name in mahjong gear. Premium quality tiles with a satisfying weight. For players who want the best and don't mind paying a bit more.",
    price: "$50-90",
    href: "https://www.amazon.com/dp/B07SJB92SM?tag=welcome2mahj-20",
    tag: "Premium pick",
  },
];

const MORE_SETS: GearItem[] = [
  {
    name: "Topmahjing American Mahjong Tile Set",
    emoji: "\u{1F3B4}",
    description:
      "Quality tiles with a complete American Mahjong setup. A solid alternative at a competitive price.",
    price: "$30-60",
    href: "https://www.amazon.com/dp/B0GL95VB3L?tag=welcome2mahj-20",
    tag: "Alternative",
  },
  {
    name: "Melamine American Mahjong Tiles",
    emoji: "\u{1F48E}",
    description:
      "Durable melamine tiles with a premium feel. Heavier and more satisfying than standard plastic.",
    price: "$30-60",
    href: "https://www.amazon.com/dp/B0GGHH7VH5?tag=welcome2mahj-20",
    tag: "Quality pick",
  },
  {
    name: "Marllifenney American Mahjong Set",
    emoji: "\u{1F3B2}",
    description:
      "A colorful set with a carrying case. Multiple color options — pick one that matches your style.",
    price: "$30-60",
    href: "https://www.amazon.com/dp/B0G13KW3L8?tag=welcome2mahj-20",
    tag: "Alternative",
  },
];

/* ───── ACCESSORIES ───── */

const ACCESSORIES: GearItem[] = [
  {
    name: "Chinoiserie Mahjong Table Mat",
    emoji: "\u{1F7E9}",
    description:
      "A beautiful 31.5\" square mat with traditional design. Keeps tiles from sliding, reduces noise, and makes the table look stunning.",
    price: "$20-40",
    href: "https://www.amazon.com/dp/B0GFDFX12V?tag=welcome2mahj-20",
    tag: "Recommended",
  },
  {
    name: "NMJL Card Protector",
    emoji: "\u{1F6E1}\uFE0F",
    description:
      "A transparent cover that protects your NMJL card from spills and wear. Your card costs $15/year — this keeps it perfect.",
    price: "$5-10",
    href: "https://www.amazon.com/dp/B0FKH1KV9T?tag=welcome2mahj-20",
    tag: "Smart buy",
  },
  {
    name: "Mahjong Card Holder / Reader",
    emoji: "\u{1F4D0}",
    description:
      "Holds your NMJL card upright so you can reference it without picking it up every turn. Small but handy.",
    price: "$5-10",
    href: "https://www.amazon.com/dp/B0FCRMXB9N?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Leather NMJL Card Case",
    emoji: "\u{1F45D}",
    description:
      "A premium leather case to store your NMJL card. Looks elegant and keeps it safe between game nights.",
    price: "$10-20",
    href: "https://www.amazon.com/dp/B0FSRMWLCP?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Waterproof Mahjong Bag",
    emoji: "\u{1F4BC}",
    description:
      "Protects your tiles from spills and rain on the way to game night. Designed specifically for American Mahjong sets.",
    price: "$15-30",
    href: "https://www.amazon.com/dp/B0FPCX6CRZ?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Empty Mahjong Case",
    emoji: "\u{1F9F3}",
    description:
      "A quality case for American Mahjong. Great if your set didn't come with one or you need an upgrade.",
    price: "$15-30",
    href: "https://www.amazon.com/dp/B0GH5W8X9C?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Tile Pushers / Rack Extensions",
    emoji: "\u{1F9F1}",
    description:
      "Longer racks that let you push your wall toward the center more easily. A quality-of-life upgrade experienced players swear by.",
    price: "$20-40",
    href: "https://www.amazon.com/s?k=mahjong+tile+pushers+rack&tag=welcome2mahj-20",
    tag: "Nice to have",
  },
];

/* ───── FUN / GIFT SETS ───── */

const FUN_SETS: GearItem[] = [
  {
    name: "Pet-Themed American Mahjong Set",
    emoji: "\u{1F43E}",
    description:
      "Adorable pet-themed tile illustrations. A conversation starter at game night and a fun gift for animal lovers.",
    price: "$40-60",
    href: "https://www.amazon.com/dp/B0FTRVMY6S?tag=welcome2mahj-20",
    tag: "Fun pick",
  },
  {
    name: "Vintage-Inspired Mahjong Set",
    emoji: "\u{2728}",
    description:
      "Beautiful vintage-inspired designs with meaningful illustrations. Feels like playing with a piece of art.",
    price: "$50-80",
    href: "https://www.amazon.com/dp/B0GC61TPLX?tag=welcome2mahj-20",
    tag: "Gift idea",
  },
  {
    name: "Turquoise Butterfly Mahjong Set",
    emoji: "\u{1F98B}",
    description:
      "A stunning turquoise set with butterfly-themed artwork. Eye-catching and unique.",
    price: "$40-70",
    href: "https://www.amazon.com/dp/B0F8M9RG13?tag=welcome2mahj-20",
    tag: "Fun pick",
  },
  {
    name: "Designer American Mahjong Set",
    emoji: "\u{1F48E}",
    description:
      "A beautifully designed set that stands out from the crowd. For players who appreciate style at the table.",
    price: "$40-70",
    href: "https://www.amazon.com/dp/B0FJ8TQ69B?tag=welcome2mahj-20",
    tag: "Gift idea",
  },
  {
    name: "ChamThingzeal Premium Tiles",
    emoji: "\u{1F3AF}",
    description:
      "Quality tiles with a premium feel. Good weight and durability for regular game nights.",
    price: "$30-60",
    href: "https://www.amazon.com/dp/B0G1K4MSVF?tag=welcome2mahj-20",
    tag: "Quality pick",
  },
  {
    name: "Stylish Mahjong Set with Case",
    emoji: "\u{1F45C}",
    description:
      "A complete set with a stylish carrying case. Looks great and travels well.",
    price: "$40-70",
    href: "https://www.amazon.com/dp/B0FHXGBRR1?tag=welcome2mahj-20",
    tag: "Fun pick",
  },
];

/* ───── BOOKS ───── */

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

/* ───── CARD COMPONENT ───── */

function GearCard({ item }: { item: GearItem }) {
  const isFeatured = item.featured;
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-xl border-2 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        isFeatured
          ? "border-[#C8A951] ring-2 ring-[#C8A951]/20"
          : "border-[#C8A951]/30"
      }`}
    >
      {isFeatured && (
        <div className="mb-3 rounded-lg bg-gradient-to-r from-[#C8A951] to-[#D4B85A] px-3 py-1.5 text-center text-[14px] font-black uppercase tracking-wider text-white">
          Recommended for beginners
        </div>
      )}
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-[13px] font-bold uppercase tracking-wider text-white ${
            isFeatured ? "bg-[#C8A951]" : "bg-[#1A4D2E]"
          }`}
        >
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
        <span
          className={`inline-block rounded-lg px-4 py-2 text-[14px] font-bold text-white transition ${
            isFeatured
              ? "bg-[#C8A951] hover:bg-[#B89840]"
              : "bg-[#1A4D2E] hover:bg-[#0F3320]"
          }`}
        >
          View on Amazon &rarr;
        </span>
      </div>
    </a>
  );
}

/* ───── PAGE ───── */

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

      {/* ── Must-Have ── */}
      <SectionHeader>You Need This</SectionHeader>
      <div className="space-y-4">
        {MUST_HAVE.map((item) => (
          <GearCard key={item.name} item={item} />
        ))}
      </div>

      {/* ── Our Picks ── */}
      <SectionHeader>Pick Your First Set</SectionHeader>
      <p className="mb-4 text-[15px] text-zinc-500">
        We tested the options so you don&apos;t have to. Here are our top 3:
      </p>
      <div className="space-y-4">
        {OUR_PICKS.map((item) => (
          <GearCard key={item.name} item={item} />
        ))}
      </div>

      {/* ── More Sets ── */}
      <SectionHeader>More Sets to Compare</SectionHeader>
      <div className="space-y-4">
        {MORE_SETS.map((item) => (
          <GearCard key={item.name} item={item} />
        ))}
      </div>

      {/* ── Accessories ── */}
      <SectionHeader>Accessories</SectionHeader>
      <div className="space-y-4">
        {ACCESSORIES.map((item) => (
          <GearCard key={item.name} item={item} />
        ))}
      </div>

      {/* ── Fun Sets ── */}
      <SectionHeader>Fun and Gift Sets</SectionHeader>
      <p className="mb-4 text-[15px] text-zinc-500">
        Looking for something special? These sets make great gifts.
      </p>
      <div className="space-y-4">
        {FUN_SETS.map((item) => (
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
