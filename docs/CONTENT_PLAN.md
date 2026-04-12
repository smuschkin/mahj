# MAHJ — Content Plan

This document maps the existing source guide (`source-guide/American_Mahjong_Guide.html`) to the planned 12-module app curriculum, and lays out the readability improvements we'll apply when porting content into MAHJ.

---

## Readability principles for beginners

The source guide is content-rich but presented as a single ~2200-line flat document. When porting to MAHJ, every piece of content must follow these rules:

1. **Progressive disclosure** — never show a beginner everything at once. Each module is a self-contained 5-minute lesson.
2. **Define before you use** — any term ("pung," "rack," "tenpai") must be defined inline the first time it appears in a lesson, with a glossary link.
3. **Show, then tell** — lead with a visual or example, then explain. Not the other way around.
4. **One idea per screen** — break long paragraphs into short cards. Beginners skim.
5. **Active practice within 60 seconds** — every lesson ends with an interactive drill or quiz, never just reading.
6. **Plain language** — replace jargon with plain English on first use ("pung (a set of three identical tiles)").
7. **Confidence checkpoints** — after each lesson, a 2-question check the user can pass before moving on.
8. **A "minimum viable knowledge" path** — modules 1–4 should take a complete beginner from zero to "able to sit at a table" in under 30 minutes of focused use.
9. **Visual hierarchy** — generous whitespace, large tap targets, callout boxes for warnings/tips.
10. **No vocabulary dumps** — never list 20 terms at once. Introduce 2–3 at a time, in context.

---

## Source guide → app module mapping

The source guide has 17 sections. Here's how they map to MAHJ's 12 modules:

| Guide Section | Maps to Module(s) | Notes |
|---|---|---|
| 1. Overview (Players, Length, Skill, Scoring) | **Module 0: Welcome** (new) | Convert to a 60-second "what is American Mahjong?" intro |
| 2. Equipment (152 tiles, racks, dice, NMJL card, chips, pusher) | **Module 1** + **Module 2** | Tile content → Tile Trainer; rest → Dealing |
| 3. The Three Number Suits | **Module 1: Tile Trainer** | Core content |
| 4. Honor & Special Tiles | **Module 1: Tile Trainer** | Core content |
| 5. Jokers | **Module 1** intro + **Module 4: Joker Rules** | Brief intro in Tile Trainer, full rules in Module 4 |
| 6. Setup (washing, wall, East, seats, breaking) | **Module 2: Setup & Dealing Coach** | Interactive — animated wall, dice roller, "where to break?" quiz |
| 7. The Deal | **Module 2: Setup & Dealing Coach** | Continues from setup |
| 7b. The Charleston | **Module 3: Charleston Coach** | Full interactive simulator |
| 8. How to Read the Card | **Module 5: Hand Strategy** (general concepts only) | ⚠️ Rewrite as "How American Mahjong Cards Work (General)" — generic notation only, no NMJL layout |
| 9. Winning Hands — Examples | **Module 5: Hand Strategy** | ⚠️ Relabel "Year Hand (2025)" → "Year Hand (Example)" |
| 10. Scoring & Payment | **Module 8: Scoring & Payouts** | Core content |
| 11. Etiquette | **Module 7: Etiquette & Table Culture** | Core content |
| 12. Strategy Tips | **Module 5: Hand Strategy** + **Module 6: Defense** | Split between offense and defense |
| 13. Common Mistakes | **Module 9: Common Mistakes & Recovery** | Core content |
| 14. Glossary / Symbol Quick-Key | **Module 10: Glossary** | Always-accessible reference |
| 16. Sara Play-by-Play | **Module 11: Your First Game Walkthrough** | Convert to interactive guided game |
| 17. What to Discard / Discard Priority | **Module 12: Practice Hands Library** | Convert decision tree into interactive puzzles |

---

## Module-by-module build plan

### Module 0: Welcome (60 seconds)
- "What is American Mahjong?" — 4 players, tile game, build hands, social
- Sets expectations: this app teaches the *game*, you'll need to buy a card to play officially
- One-tap start: "Begin Module 1 →"

### Module 1: Tile Trainer
- **Lesson:** introduce 3 suits (Bams, Cracks, Dots) → honors (Winds, Dragons) → flowers → jokers, **2–3 tiles at a time**
- **Practice:** flashcard recognition, then speed-tap drill ("tap all the 3 Bams")
- **Check:** 5-question quiz to unlock Module 2

### Module 2: Setup & Dealing Coach ⭐ differentiator
- **Lesson:** washing → building the wall → roll for East → seats → break the wall → the deal
- **Interactive:** animated wall build, dice roller, "where do I break?" quiz
- **Check:** "Set up a fresh game" walkthrough

### Module 3: Charleston Coach
- **Lesson:** what it is, why it exists, the sequence (right, across, left, optional, courtesy)
- **Interactive:** given a hand, suggest what to pass and explain why; blind pass practice
- **Check:** complete a Charleston with a sample hand

### Module 4: Joker & Exposure Rules
- **Lesson:** when to call, what to expose, joker exchange
- **Interactive:** "Can you call this?" quiz
- **Check:** 5 calling scenarios

### Module 5: Hand Strategy Trainer
- **Lesson:** card-reading concepts (generic), picking 2–3 hands, flexibility, joker usage
- **Interactive:** input your tiles → app suggests practice-hand directions
- **Check:** "what would you discard?" puzzles

### Module 6: Defense & Wall Awareness
- **Lesson:** reading discards, tile counting, when to fold
- **Interactive:** "read the table" drills
- **Check:** identify danger discards in 5 scenarios

### Module 7: Etiquette & Table Culture
- **Lesson:** racking, pace, announcing discards, mahjong call timing
- **Interactive:** etiquette do/don't quiz
- **Check:** 5-question check

### Module 8: Scoring & Payouts
- **Lesson:** self-draw vs. discard, doubles, dead hand penalty
- **Interactive:** "who pays whom and how much?" calculator
- **Check:** 5 payout scenarios

### Module 9: Common Mistakes & Recovery
- **Lesson:** dead hands, miscalls, joker mistakes
- **Interactive:** "spot the mistake" scenarios
- **Check:** 5 recovery questions

### Module 10: Glossary & Quick Reference
- Always one tap away from any screen
- Searchable, alphabetized
- Each term has: short definition + "where you'll see this" + link to relevant lesson

### Module 11: Your First Game Walkthrough
- Sara's play-by-play, converted to a guided interactive game
- Pause-and-explain at every decision point
- Replayable with different starting hands

### Module 12: Practice Hands Library
- Curated decision puzzles tagged by concept
- "What would you discard?" daily challenge
- Spaced repetition

---

## Legally-required content changes when porting

When porting content from `source-guide/American_Mahjong_Guide.html`, apply these substitutions:

| Original | Replacement |
|---|---|
| "Year Hand (2025)" | "Year Hand (Example)" + note: *"The current year's hand changes annually — check your official card."* |
| "How to Read the Card" (as a standalone section) | "How American Mahjong Cards Work (General)" — frame as teaching the *concept*, not reproducing any specific card |
| Any phrase implying we publish the official hands | Reframe as generic categories with original example hands |
| First mention of NMJL in any module | Add inline disclaimer or footnote linking to LEGAL.md disclaimer |

All other content is safe to port directly with readability rewrites.

---

## App-build decisions captured during Phase 0

These are decisions made while drafting the HTML mockups (Modules 0–3) that should carry over when we build the real Next.js app.

### Module structure
- **Each module is split into sub-sessions of ~2–3 minutes each.** A module is not a single long scroll — it's a sequence of short sub-sessions with natural stopping points and progress indicators.
- **Module 3 (Charleston) sub-sessions:**
  1. *What is the Charleston?* — Screens 1–3 (overview + directions)
  2. *The 7 passes* — Screens 4–7 (mechanics)
  3. *The courtesy* — Screen 8 (deep dive on the optional final pass)
- Apply the same sub-sessioning pattern to every module of 6+ screens.

### The "courtesy-style" deep-dive pattern
For any teaching screen that involves *judgment* (when to call, when to fold, what to discard, what to pass), use this pattern:
1. **Rule** — what the rule is, in plain language
2. **Concrete example with visual** — a worked scenario with a mini-hand
3. **Rules to remember** — the 3–5 hard constraints
4. **When to skip / when not to** — explicit guidance for hesitant beginners
5. **Reassurance** — explicit permission to be cautious or do nothing

This is the gold standard. Modules 4 (calling), 5 (hand strategy), 6 (defense), 9 (mistakes), and 12 (practice puzzles) should all use it.

### Right/Left vs. Wind decoupling
For the Charleston (and any other "pass to your right/left" instruction), **never make the user translate from wind direction to physical direction**. Always say "your physical right" or "the player on your physical right." The wind names are for *seating*, not for *passing*.

### Visual reinforcement rules
- Any rule with a direction must have an arrow.
- Any "optional" or "branching" step in a sequence should have a visual marker (e.g. the "little hat" on Second Left in the Charleston).
- Any decision-judgment teaching needs a worked example with a mini-hand visual, not just prose.

### Build the boring stuff first
When porting modules into the React app:
1. Build all the easy/mechanical screens first (tile recognition, washing tiles, the deal pattern)
2. Stress-test the component library with that volume
3. *Then* come back and craft the hard judgment screens (Break the Wall, Charleston decisions, hand strategy) with the courtesy-style deep-dive pattern

This avoids over-engineering components for edge cases before we know what's actually needed.

### Reusable components needed (for Phase 1 scaffolding)
- `<Tile />` — a single tile, all variants (Bam, Crack, Dot, Wind, Dragon, Flower, Joker)
- `<Hand />` — a row/grid of tiles with optional "marked for pass/discard" state
- `<Wall />` — the 4-wall play diagram
- `<Dice />` — pip-rendered dice
- `<TableSeating />` — round table with 4 seats, optional East highlight
- `<Callout type="tip|warn|info" />` — colored callout box
- `<LessonScreen />` — wrapper card with tag/heading/CTA
- `<Drill />` — wrapper for interactive practice
- `<Quiz />` — multiple-choice confidence check
- `<DirectionArrow />` — left/right/across with optional label
- `<PassStep />` — single Charleston pass card (with optional "hat" marker)

## Phase plan

- **Phase 0 (now):** content audit, source consolidation, planning docs ✅
- **Phase 1:** Node 20 install → Next.js scaffold → Modules 0, 1, 2 + Glossary stub
- **Phase 2:** Modules 3, 4, 5
- **Phase 3:** Modules 6–9
- **Phase 4:** Modules 10–12 + polish + tile artwork
- **Phase 5:** Soft launch to r/Mahjong + Facebook groups, gather feedback
- **Phase 6:** Monetization (free tier + Pro subscription)
