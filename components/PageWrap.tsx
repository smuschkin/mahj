export function PageWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[820px] px-4 sm:px-7 py-10 md:py-14">{children}</div>;
}
