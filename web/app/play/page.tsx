"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PracticeTable } from "@/components/PracticeTable";
import { PlayRound } from "@/components/PlayRound";

function PlayContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  if (mode === "game") {
    return <PlayRound />;
  }

  return <PracticeTable />;
}

export default function PlayPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-zinc-400">Loading...</div>}>
      <PlayContent />
    </Suspense>
  );
}
