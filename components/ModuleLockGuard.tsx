"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isModuleUnlocked } from "@/lib/progress";
import { PageWrap } from "@/components/PageWrap";
import { Cover } from "@/components/Cover";

export function ModuleLockGuard({
  moduleNum,
  moduleName,
  children,
}: {
  moduleNum: number;
  moduleName: string;
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState(false);
  const [unlocked, setUnlocked] = useState(true);

  useEffect(() => {
    setUnlocked(isModuleUnlocked(moduleNum));
    setChecked(true);
  }, [moduleNum]);

  // Don't flash locked state during SSR/hydration
  if (!checked) return <>{children}</>;

  if (!unlocked) {
    return (
      <PageWrap>
        <Cover
          eyebrow={`MAHJ — Lesson ${moduleNum + 1}`}
          title={moduleName}
          subtitle="This lesson is locked"
        />
        <div className="rounded-xl border-2 border-zinc-300 bg-white p-9 text-center shadow-sm">
          <span className="text-4xl">🔒</span>
          <h3 className="mt-3 font-serif text-xl font-black text-[var(--color-dark)]">
            Complete Lesson {moduleNum} First
          </h3>
          <p className="mt-2 text-sm text-zinc-600">
            Lessons unlock in order. Finish the previous lesson to access this one.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href={`/lesson/${moduleNum}`}
              className="rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
            >
              Go to Lesson {moduleNum} →
            </Link>
            <Link
              href="/"
              className="rounded-md border-2 border-[var(--color-accent)] bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] transition hover:-translate-y-0.5"
            >
              All Lessons
            </Link>
          </div>
        </div>
      </PageWrap>
    );
  }

  return <>{children}</>;
}
