# Tsion Surprise

A small Next.js app (personal surprise site) with audio playback features.

## Quick start

Requirements

- Node.js 18+ recommended
- npm

Install

```bash
cd tsion-surprise
npm ci
```

Run locally (dev)

```bash
npm run dev
# open http://localhost:3000 (or the port shown)
```

Build (production)

```bash
npm run build
npm start
```

Deploy

- Vercel: connect the repository and deploy the `main` branch. If you see build differences between local and Vercel, add this to `package.json` to pin Node version:

```json
"engines": { "node": ">=18" }
```

Audio notes

- Add audio files into `public/audio`.
- The `MezmurPlayer` component uses client-side audio playback and will list files configured in `components/MezmurPlayer.js`.
- The `BackgroundMusic` component looks for `public/audio/background.mp3`; drop a `background.mp3` file there to enable the toggle.

Accessibility & client-only code

- Components that use browser-only APIs include `"use client"` at the top (e.g., `MezmurPlayer`, `BackgroundMusic`, `ThreeScene`).

Troubleshooting

- If Vercel build fails with `Module not found` for `@/...` imports, use relative imports or ensure path aliases are configured in the project settings. This repo uses relative imports in `app/page.js`.
- If audio playback is blocked in browsers, the user must interact (click) to allow autoplay.

Contact

If you want changes (uploader, auto-sync with cloud storage, or automatic background music), tell me which feature to add next.
