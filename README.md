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
