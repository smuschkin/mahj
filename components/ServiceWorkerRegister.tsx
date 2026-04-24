"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Service worker registration failed — not critical
      });
    }

    // Capgo OTA updates — notify app is ready via the Capacitor bridge
    try {
      const win = window as any;
      if (win.Capacitor?.isNativePlatform?.()) {
        // Use the Capacitor bridge directly
        win.Capacitor.Plugins?.CapacitorUpdater?.notifyAppReady?.();
      }
    } catch {
      // Not in Capacitor — ignore
    }
  }, []);
  return null;
}
