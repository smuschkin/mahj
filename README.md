<<<<<<< HEAD
# MAHJ

**An independent educational app for learning American Mahjong.**

MAHJ teaches the fundamentals of American Mahjong — tiles, setup, dealing, the Charleston, calling, jokers, scoring, etiquette, and strategy — through short lessons, interactive practice, and progressive scaffolding designed for absolute beginners.

> **MAHJ is not affiliated with, endorsed by, or sponsored by the National Mah Jongg League (NMJL).** To play official games, you'll need to purchase the current year's official card from [nationalmahjonggleague.org](https://www.nationalmahjonggleague.org). MAHJ teaches you *how to play the game* — bring your own card.

---

## Project status

🚧 **Phase 0** — content audit, planning, and source consolidation. See [`docs/CONTENT_PLAN.md`](docs/CONTENT_PLAN.md).

## Repo layout

```
MAHJ/
├── source-guide/         # Original content source: American Mahjong Guide (HTML + PDF)
├── docs/
│   ├── CONTENT_PLAN.md   # Module map, readability plan, guide → app section mapping
│   └── LEGAL.md          # Legal guardrails and disclaimer text
├── README.md             # This file
└── (app/ — coming in Phase 1 once Node 20+ is installed)
```

## Tech stack (planned)

- **Next.js 14+** (App Router) + **TypeScript** + **Tailwind CSS**
- Deployed as a **PWA** (web + installable on iOS/Android)
- Hosted on **Vercel** (free tier to start)
- No backend for v0 — local storage for progress

## Curriculum (12 modules)

1. **Tile Trainer** — recognize all tiles
2. **Setup & Dealing Coach** — wall, dice, breaking the wall, the deal
3. **Charleston Coach** — passing rules + strategy
4. **Joker & Exposure Rules** — calling, exposing, joker exchange
5. **Hand Strategy Trainer** — flexible thinking, what-to-discard drills
6. **Defense & Wall Awareness** — reading the table
7. **Etiquette & Table Culture** — racking, pace, "mahjong!" calls
8. **Scoring & Payouts** — how money moves
9. **Common Mistakes & Recovery** — dead hands, misnames, fixing errors
10. **Glossary & Quick Reference** — searchable terms
11. **Your First Game Walkthrough** — guided slowed-down full game
12. **Practice Hands Library** — "what would you discard?" puzzles

See [`docs/CONTENT_PLAN.md`](docs/CONTENT_PLAN.md) for the detailed plan.

## Legal guardrails

See [`docs/LEGAL.md`](docs/LEGAL.md) for the full list. Summary:

- Never reproduce the NMJL card (hands, layout, notation, color coding)
- Never use "NMJL" or "National Mah Jongg League" as branding
- All example/practice hands are original and labeled "Practice Hand"
- All tile artwork is original or properly licensed
- Disclaimer visible on every page of the app

## Credits

Original written content adapted from `source-guide/American_Mahjong_Guide.html` (authored by the project owner), rewritten for progressive disclosure and beginner readability.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> mahj/main
