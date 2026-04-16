"use client";

import { useState, useEffect } from "react";

export function PrintButton() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  const handleClick = async () => {
    if (isStandalone && navigator.share) {
      try {
        await navigator.share({
          title: "MAHJ — Game Night Cheat Sheet",
          text: "American Mahjong quick reference — setup, Charleston, turns, and more.",
          url: window.location.href,
        });
      } catch {
        // User cancelled share — do nothing
      }
    } else {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5"
    >
      {isStandalone ? "Share Cheat Sheet" : "Print Cheat Sheet"}
    </button>
  );
}
