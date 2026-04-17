"use client";

type NavLink = { href: string; name: string; moduleNum?: number };

export function ModuleNav({
  prev,
  next,
  currentModuleNum,
}: {
  prev?: NavLink;
  next?: NavLink;
  currentModuleNum?: number;
}) {
  // Navigation is handled by the ScreenStepper — no need for extra nav cards
  return null;
}
