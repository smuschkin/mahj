"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Service worker registration failed — not critical
      });
    }

    // Capgo OTA updates — notify app is ready
    async function initCapgo() {
      try {
        const { CapacitorUpdater } = await import("@capgo/capacitor-updater");
        await CapacitorUpdater.notifyAppReady();
      } catch {
        // Not in Capacitor or plugin not available — ignore
      }
    }
    initCapgo();
  }, []);
  return null;
}
