export type ModuleInfo = {
  num: number;
  slug: string;
  name: string;
  href: string;
};

export const modules: ModuleInfo[] = [
  { num: 0, slug: "welcome", name: "Welcome", href: "/module/0" },
  { num: 1, slug: "tile-trainer", name: "Tile Trainer", href: "/module/1" },
  { num: 2, slug: "reading-the-card", name: "Reading the Card", href: "/module/2" },
  { num: 3, slug: "setup-dealing", name: "Setup & Dealing", href: "/module/3" },
  { num: 4, slug: "charleston", name: "The Charleston", href: "/module/4" },
  { num: 5, slug: "jokers-calling", name: "Jokers & Calling", href: "/module/5" },
  { num: 6, slug: "hand-strategy", name: "Hand Strategy", href: "/module/6" },
  { num: 7, slug: "defense", name: "Defense", href: "/module/7" },
  { num: 8, slug: "etiquette", name: "Table Etiquette", href: "/module/8" },
  { num: 9, slug: "scoring", name: "Scoring & Payouts", href: "/module/9" },
  { num: 10, slug: "mistakes", name: "Common Mistakes", href: "/module/10" },
  { num: 11, slug: "glossary", name: "Glossary", href: "/module/11" },
  { num: 12, slug: "first-game", name: "Your First Full Game", href: "/module/12" },
  { num: 13, slug: "puzzles", name: "Practice Hands Library", href: "/module/13" },
];

export function getModule(num: number) {
  return modules.find((m) => m.num === num);
}

export function getAdjacentModules(num: number) {
  const idx = modules.findIndex((m) => m.num === num);
  return {
    prev: idx > 0 ? modules[idx - 1] : undefined,
    next: idx < modules.length - 1 ? modules[idx + 1] : undefined,
  };
}
