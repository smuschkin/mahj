import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mahj.learn",
  appName: "MAHJ",
  webDir: "out",
  server: {
    // Point to dev server for live testing
    url: "http://localhost:3000",
  },
  ios: {
    contentInset: "automatic",
    preferredContentMode: "mobile",
    scheme: "MAHJ",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#334155",
      showSpinner: false,
    },
  },
};

export default config;
