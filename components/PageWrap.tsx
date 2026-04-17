export function PageWrap({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[820px] px-4 sm:px-7 pt-4 pb-2 md:pt-6 md:pb-3">{children}</div>;
}
