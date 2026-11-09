# SwiftCatch · Catch Lab

**[Open the playground](https://play.kyrielab.com/)** — eight interactive humanoid
catching, passing and rally demos. Physics and policy inference run in your browser.

Use **Select** to choose a skill, sensing mode and hands, or **All tasks** to browse
all demos. Each task keeps its own ball sizes and throw distribution.

- **Catching:** state / GT or depth input, single or dual Dex3 hands, and rubber palms.
- **Depth Palm:** Gemini 335L or RealSense D455; switching cameras resets the scene
  and loads the matching policy. Depth Palm supports L0–L5; GT Palm includes L6.
- **Passing:** aim a held football at a target window.
- **Continuous Pass & Catch:** two robots share one physical ball and swap roles
  after a 3-second stable hold. Default distance: **1.5 m**. Still being optimized.

The homepage ball can be dragged and thrown, or tapped to bounce. It stops when
resting, pauses in hidden tabs, and disappears when launching a task. Reduced-motion
preferences disable automatic movement.

## Run locally

Node 24.19+ and npm 11.10+:

```bash
npm ci
npm run dev
```

## Build and check

```bash
npm test
npm run build
npx playwright install chromium
npm run preview -- --port 4173
# In another terminal:
npm run test:browser
```

Set `CHROMIUM_PATH` to use an existing Chromium installation. For physical rollout
checks, for example:

```bash
node scripts/evaluate.mjs --task depth-rubber --level 5 --episodes 16 --output evaluation.json
```

## Publish and maintain

- `src/`: UI, sensing and simulation adapters.
- `public/assets/`: policies, matching scenes, throw banks and shared court assets.
- `public/vendor/`: browser runtime dependencies.
- `public/app/` and `public/index.html`: generated output; **commit after building**.

Cloudflare Pages deploys `main` with output directory `public`. Each launched demo
uses one ONNX model; Depth Palm has separate camera variants. Keep checkpoints,
training metadata and conversion tools outside this repository. Replace models
with their matching scene contracts. The build checks asset privacy and size limits.

See the site's **Credits** and `public/assets/CREDITS.txt` for asset licenses.
