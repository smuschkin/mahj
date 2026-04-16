import { redirect } from "next/navigation";
import { modules } from "@/lib/modules";

export function generateStaticParams() {
  return modules.map((m) => ({ num: String(m.num) }));
}

export default async function ModuleRedirect({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  const moduleNum = parseInt(num, 10);
  redirect(`/lesson/${moduleNum + 1}`);
}
