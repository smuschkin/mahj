# Codemagic Setup Guide for MAHJ

## 1. Sign up
- Go to https://codemagic.io/signup
- Click "Sign up with GitHub"
- Authorize Codemagic

## 2. Add the app
- Click "Add application" on the dashboard
- Source: GitHub
- Select `smuschkin/mahj`
- Codemagic will detect the `codemagic.yaml` in the repo

## 3. Create App Store Connect API key (do this at Apple first)
1. Go to https://appstoreconnect.apple.com/access/api
2. Click the "+" under "Keys"
3. Name: "Codemagic"
4. Access: "App Manager"
5. Click "Generate"
6. **Download the .p8 file** — you can only download it ONCE
7. Note the Key ID (10-char string) and Issuer ID (UUID)

## 4. Add the API key to Codemagic
1. In Codemagic, go to Team settings → Integrations
2. Click "App Store Connect" → Add key
3. Paste:
   - Key name: "App Store Connect"
   - Issuer ID: (from Apple portal)
   - Key ID: (from Apple portal)
   - API key file: upload the .p8

## 5. Set the App Store Connect app ID
1. Find your app's numeric ID in App Store Connect
2. Open your MAHJ app → App Information → scroll to "Apple ID" (it's a number)
3. Update `codemagic.yaml`:
   - Change `APP_STORE_APPLE_ID: 1234567890` to your actual ID

## 6. Trigger a build
- In Codemagic, click "Start new build" on your app
- Select the `ios-app-store` workflow
- It runs for ~15-20 minutes
- On success, it submits to TestFlight automatically
