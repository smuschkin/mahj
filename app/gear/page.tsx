import Link from "next/link";
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
  href: string;
  tag: string;
  featured?: boolean;
};

/* ───── THE ESSENTIALS ───── */

const MUST_HAVE: GearItem[] = [
  {
    name: "NMJL Official Card (2026)",
    description:
      "You need this to play. The National Mah Jongg League releases a new card every year with the official hands. This is the one thing you cannot play without. Buy directly from the NMJL.",
    href: "https://www.nationalmahjonggleague.org/store.aspx",
    tag: "Essential",
  },
];

const OUR_PICKS: GearItem[] = [
  {
    name: "GUSTARIA American Mahjong Set",
    description:
      "Our top pick for beginners. A complete American Mahjong set with quality tiles, racks, dice, and a carrying case. Everything you need in one box.",
    href: "https://www.amazon.com/dp/B0D2RC4PWJ?tag=welcome2mahj-20",
    tag: "Our #1 Pick",
    featured: true,
  },
  {
    name: "Arrowbash Beginner Mahjong Set",
    description:
      "Best for brand-new players. Melamine tiles with clear, easy-to-read markings while you're still learning. Affordable and beginner-friendly.",
    href: "https://www.amazon.com/dp/B0FS719Y7D?tag=welcome2mahj-20",
    tag: "Budget pick",
  },
  {
    name: "Yellow Mountain Imports Mahjong Set",
    description:
      "From the most trusted name in mahjong gear. Premium quality tiles with a satisfying weight. For players who want the best.",
    href: "https://www.amazon.com/dp/B07SJB92SM?tag=welcome2mahj-20",
    tag: "Premium pick",
  },
];


/* ───── ACCESSORIES ───── */

const ACCESSORIES: GearItem[] = [
  {
    name: "Chinoiserie Mahjong Table Mat",
    description:
      "Keeps tiles from sliding, reduces noise, and makes the table look stunning. A 31.5\" square mat with traditional design.",
    href: "https://www.amazon.com/dp/B0GFDFX12V?tag=welcome2mahj-20",
    tag: "Recommended",
  },
  {
    name: "NMJL Card Protector",
    description:
      "A transparent cover that protects your NMJL card from spills and wear. Your card costs $15/year — this keeps it perfect.",
    href: "https://www.amazon.com/dp/B0FKH1KV9T?tag=welcome2mahj-20",
    tag: "Smart buy",
  },
  {
    name: "Mahjong Card Holder / Reader",
    description:
      "Holds your NMJL card upright so you can reference it hands-free every turn. Small but handy.",
    href: "https://www.amazon.com/dp/B0FCRMXB9N?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
  {
    name: "Waterproof Mahjong Bag",
    description:
      "Protects your tiles on the way to game night. Designed specifically for American Mahjong sets.",
    href: "https://www.amazon.com/dp/B0FPCX6CRZ?tag=welcome2mahj-20",
    tag: "Nice to have",
  },
];

/* ───── FUN / GIFT SETS ───── */

const FUN_SETS: GearItem[] = [
  {
    name: "Pet-Themed American Mahjong Set",
    description:
      "Adorable pet-themed tile illustrations. A conversation starter at game night and a great gift for animal lovers.",
    href: "https://www.amazon.com/dp/B0FTRVMY6S?tag=welcome2mahj-20",
    tag: "Fun pick",
  },
  {
    name: "Vintage-Inspired Mahjong Set",
    description:
      "Beautiful vintage-inspired designs with meaningful illustrations. Feels like playing with a piece of art.",
    href: "https://www.amazon.com/dp/B0GC61TPLX?tag=welcome2mahj-20",
    tag: "Gift idea",
  },
  {
    name: "Turquoise Butterfly Mahjong Set",
    description:
      "A stunning turquoise set with butterfly-themed artwork. Eye-catching and unique.",
    href: "https://www.amazon.com/dp/B0F8M9RG13?tag=welcome2mahj-20",
    tag: "Fun pick",
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
      <div className="mb-2">
        <span
          className={`rounded-full px-3 py-1 text-[13px] font-bold uppercase tracking-wider text-white ${
            isFeatured ? "bg-[#C8A951]" : "bg-[var(--color-accent)]"
          }`}
        >
          {item.tag}
        </span>
      </div>
      <h3 className="font-serif text-[18px] font-black text-[var(--color-accent)]">
        {item.name}
      </h3>
      <p className="mt-1 text-[15px] leading-relaxed text-zinc-600">
        {item.description}
      </p>
      <div className="mt-3 text-[13px] font-bold text-[var(--color-accent)]">
        Shop now &rarr;
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

      <p className="mb-6 text-[15px] leading-relaxed text-zinc-500">
        MAHJ teaches you how to play — but you still need tiles and the card to
        play with! Here are our picks for getting started.
      </p>

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

      <div className="mt-8 rounded-xl bg-zinc-50 p-6 text-center">
        <p className="text-[14px] text-zinc-500">
          MAHJ is a participant in the Amazon Associates Program. As an Amazon
          Associate, we earn from qualifying purchases. This doesn&apos;t affect
          the price you pay.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm font-bold text-[var(--color-accent)] hover:underline">
          ← Back to Home
        </Link>
      </div>
    </PageWrap>
  );
}
