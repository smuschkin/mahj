export type ModuleInfo = {
  num: number;
  slug: string;
  name: string;
  hook: string;
  href: string;
};

export const modules: ModuleInfo[] = [
  { num: 0, slug: "welcome", name: "Welcome", hook: "What is American Mahjong and what makes it special", href: "/module/0" },
  { num: 1, slug: "tile-trainer", name: "Tile Trainer", hook: "Learn to recognize all 152 tiles by sight", href: "/module/1" },
  { num: 2, slug: "reading-the-card", name: "Reading the Card", hook: "How to read the hands on the NMJL card", href: "/module/2" },
  { num: 3, slug: "setup-dealing", name: "Setup & Dealing", hook: "Washing, building walls, and the deal", href: "/module/3" },
  { num: 4, slug: "charleston", name: "The Charleston", hook: "How the tile-trading ritual works", href: "/module/4" },
  { num: 5, slug: "charleston-strategy", name: "Charleston Strategy", hook: "What to keep, what to pass, and why", href: "/module/5" },
  { num: 6, slug: "jokers-calling", name: "Jokers & Calling", hook: "When and how to use jokers and call tiles", href: "/module/6" },
  { num: 7, slug: "scanning-the-card", name: "Scanning the Card", hook: "How to match your tiles to hands on the card", href: "/module/7" },
  { num: 8, slug: "starting-the-game", name: "Starting the Game", hook: "What happens each turn once play begins", href: "/module/8" },
  { num: 9, slug: "hand-strategy", name: "Hand Strategy", hook: "Pick the right hand and know what to keep", href: "/module/9" },
  { num: 10, slug: "defense", name: "Defense", hook: "Read the table and avoid feeding other players", href: "/module/10" },
  { num: 11, slug: "etiquette", name: "Table Etiquette", hook: "The unwritten rules every player should know", href: "/module/11" },
  { num: 12, slug: "mistakes", name: "Common Mistakes", hook: "What to do when something goes wrong", href: "/module/12" },
  { num: 13, slug: "scoring", name: "Scoring & Payouts", hook: "Who pays whom and how much", href: "/module/13" },
  { num: 14, slug: "first-game", name: "Your First Full Game", hook: "A complete walkthrough from start to finish", href: "/module/14" },
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
