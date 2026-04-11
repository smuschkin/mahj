import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mahj.learn",
  appName: "MAHJ",
  webDir: "out",
  // Uncomment for live dev testing:
  // server: { url: "http://localhost:3000" },
  ios: {
    contentInset: "automatic",
    preferredContentMode: "mobile",
    scheme: "MAHJ",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#1A4D2E",
      showSpinner: false,
    },
  },
};

export default config;
