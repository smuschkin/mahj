import { PracticeTable } from "@/components/PracticeTable";
import { PlayRound } from "@/components/PlayRound";

export default function PlayPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  return <PlayPageInner searchParamsPromise={searchParams} />;
}

async function PlayPageInner({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParamsPromise;

  if (mode === "game") {
    return <PlayRound />;
  }

  return <PracticeTable />;
}
