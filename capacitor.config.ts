import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mahj.learn',
  appName: 'MAHJ',
  webDir: 'out',
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'MAHJ',
    backgroundColor: '#FDF6E3'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#1A4D2E',
      showSpinner: false
    },
    CapacitorUpdater: {
      appId: 'com.mahj.learn'
    }
  }
};

export default config;
