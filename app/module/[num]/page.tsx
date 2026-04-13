import { notFound } from "next/navigation";
import { getModule, getAdjacentModules, modules } from "@/lib/modules";
import { ModuleLockGuard } from "@/components/ModuleLockGuard";

export function generateStaticParams() {
  return modules.map((m) => ({ num: String(m.num) }));
}
import Module0Welcome from "@/content/modules/Module0Welcome";
import Module1TileTrainer from "@/content/modules/Module1TileTrainer";
import Module2ReadingTheCard from "@/content/modules/Module2ReadingTheCard";
import Module3SetupDealing from "@/content/modules/Module3SetupDealing";
import Module4Charleston from "@/content/modules/Module4Charleston";
import Module5JokersCalling from "@/content/modules/Module5JokersCalling";
import Module6HandStrategy from "@/content/modules/Module6HandStrategy";
import Module7Defense from "@/content/modules/Module7Defense";
import Module8Etiquette from "@/content/modules/Module8Etiquette";
import Module9Scoring from "@/content/modules/Module9Scoring";
import Module10Mistakes from "@/content/modules/Module10Mistakes";
import Module11Glossary from "@/content/modules/Module11Glossary";
import Module12FirstGame from "@/content/modules/Module12FirstGame";
import Module13Practice from "@/content/modules/Module13Practice";

const moduleComponents: Record<number, () => React.ReactNode> = {
  0: Module0Welcome,
  1: Module1TileTrainer,
  2: Module2ReadingTheCard,
  3: Module3SetupDealing,
  4: Module4Charleston,
  5: Module5JokersCalling,
  6: Module6HandStrategy,
  7: Module7Defense,
  8: Module8Etiquette,
  9: Module9Scoring,
  10: Module10Mistakes,
  11: Module11Glossary,
  12: Module12FirstGame,
  13: Module13Practice,
};

export default async function ModulePage({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  const moduleNum = parseInt(num, 10);
  const mod = getModule(moduleNum);
  if (!mod) notFound();

  const Component = moduleComponents[moduleNum];
  if (!Component) {
    const adj = getAdjacentModules(moduleNum);
    return <ComingSoon name={mod.name} num={moduleNum} prev={adj.prev} />;
  }

  return (
    <ModuleLockGuard moduleNum={moduleNum} moduleName={mod.name}>
      <Component />
    </ModuleLockGuard>
  );
}

import Link from "next/link";
import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";
import { ModuleNav } from "@/components/ModuleNav";
import { ModuleInfo } from "@/lib/modules";

function ComingSoon({
  name,
  num,
  prev,
}: {
  name: string;
  num: number;
  prev?: ModuleInfo;
}) {
  const adj = getAdjacentModules(num);
  return (
    <PageWrap>
      <Cover
        eyebrow={`MAHJ — Module ${num}`}
        title={name}
        subtitle="Coming soon"
      />
      <div className="rounded-xl border border-[#EFE8D6] bg-white p-9 text-center shadow-sm">
        <h3 className="mb-3 font-serif text-2xl font-black text-[var(--color-mid)]">
          This module is coming soon
        </h3>
        <p className="text-sm text-zinc-600">
          We&apos;re hard at work building this module. In the meantime, explore the
          modules we&apos;ve already published.
        </p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-md bg-[var(--color-mid)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--color-accent)]"
        >
          ← Back to all modules
        </Link>
      </div>
      <ModuleNav currentModuleNum={num} prev={adj.prev && { href: adj.prev.href, name: `Module ${adj.prev.num}: ${adj.prev.name}` }} next={adj.next && { href: adj.next.href, name: `Module ${adj.next.num}: ${adj.next.name}` }} />
    </PageWrap>
  );
}
