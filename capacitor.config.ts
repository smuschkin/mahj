import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mahj.learn",
  appName: "MAHJ",
  webDir: "out",
  server: {
    // In production, the app loads from the bundled files
    // During development, you can point to your dev server:
    // url: "http://localhost:3000",
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
