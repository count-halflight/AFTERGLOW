# Afterglow

Pull back, let go, and fling a little ember up a cave that never ends. Made by Halflight.

**Website:** https://count-halflight.github.io/AFTERGLOW/

| Device | How it installs |
| --- | --- |
| Android phones and tablets | `Afterglow.apk` from the latest release (Android 7.0+) |
| Windows 10 / 11 | `Afterglow-Setup.exe` installer, or `Afterglow-Portable.exe` with no install |
| iPhone and iPad | Safari, then Share, then **Add to Home Screen** (Apple does not allow APKs or apps from outside the App Store) |
| Mac, Linux, Chromebook | Safari **File > Add to Dock**, or the install button in Chrome / Edge |

Every platform runs the same game, `web/play.html`, and plays offline.

## Layout

```
web/        The website and the game (deployed to GitHub Pages)
  index.html            landing page with per-device downloads
  play.html             the game, a single self-contained file
  manifest.webmanifest  makes the game installable as an app (iPhone, iPad, Mac, Chrome)
  sw.js                 offline cache for the installed web app
android/    Native Android app: a full-screen WebView with play.html bundled inside
desktop/    Windows app built with Electron, with play.html bundled inside
.github/workflows/release.yml   builds everything and publishes releases and the site
```

To update the game, replace `web/play.html` and push to `main`. The workflow rebuilds the APK and
the Windows installers, publishes them as a new release (`v1.0.<run number>`), and redeploys the site.
The download buttons always point at the latest release.

## One-time GitHub setup

1. **Turn on Pages:** Settings > Pages > Build and deployment > Source: **GitHub Actions**.
2. **(Recommended) Add an Android signing key** so players can install updates over the old version.
   Without it, each build is signed with a fresh debug key and players must uninstall before updating.
   Create a key once and keep it safe:

   ```sh
   keytool -genkeypair -v -keystore afterglow.jks -alias afterglow -keyalg RSA -keysize 2048 -validity 10000
   base64 -w0 afterglow.jks   # macOS: base64 -i afterglow.jks
   ```

   Then add these repository secrets (Settings > Secrets and variables > Actions):
   `ANDROID_KEYSTORE_BASE64` (the base64 text), `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS` (`afterglow`),
   and `ANDROID_KEY_PASSWORD`.

The Windows build is not code-signed, so Windows SmartScreen shows "Windows protected your PC" the
first time; players click **More info > Run anyway**. The website explains this.

## Building locally

- **Android:** `cd android && ./gradlew assembleRelease` (needs the Android SDK; output in `app/build/outputs/apk/release/`).
- **Windows:** `cd desktop && npm ci && npm run dist` on Windows (output in `desktop/dist/`). `npm start` runs it on any OS.
- **Website:** serve `web/` with any static server, for example `npx http-server web`.

## Copyright

Copyright © 2026 Halflight. All rights reserved. The code is public so the game can be built and
played, but it is not open source: you may not copy, modify, redistribute or sell any part of it
without written permission. See [LICENSE](LICENSE).
