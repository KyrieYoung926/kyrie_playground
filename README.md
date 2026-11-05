# KyrieLab Robotics Playground

Interactive G1 + Dex3 catching in the browser, hosted at <https://play.kyrielab.com/>.
Physics, rendering and inference run on the visitor's device. Hosting only serves
static files; no simulation server or server GPU is required.

## Cloudflare Pages

The complete, generated website is committed in `public/`, preserving the existing
Cloudflare Pages deployment settings:

- Production branch: `main`
- Output directory: `public`
- Build command: leave empty to serve the committed site, or use `npm run build`
- Runtime for source builds: Node 24.19+ and npm 11.10+

No Cloudflare account identifiers, credentials or project configuration are stored
in this repository. The existing custom domain is managed in Cloudflare.

## Develop and build

```bash
npm ci
npm run dev
```

The development server listens on loopback. To regenerate the published files:

```bash
npm run build
npm test
npm run preview -- --port 4173
```

Browser verification, with the preview running:

```bash
npx playwright install chromium
npm run test:browser
```

## Release files

`public/assets/controller.onnx` is the only inference model. Both control profiles
use the same file; changing profiles resets the simulation without fetching another
model. All weights are embedded in this ONNX file.

`scene.mjz` contains the robot geometry and physics scene. `scene.json` contains only
the runtime configuration needed by the browser. `public/vendor/` contains the
same-origin mjswan runtime and its WASM dependencies; `public/app/` is the generated
application bundle. Keep these directories when deploying.

Training code, checkpoints, conversion scripts and provenance belong outside this
repository. To update the runtime, replace the exported controller and matching
scene assets, then build and run the tests. The release checker verifies one ONNX,
rejects checkpoint files and training provenance, and checks Pages' per-file limit.
Source maps are disabled.

Required third-party credits are available in the website's About dialog and
`public/assets/CREDITS.txt`. The code and model materials retain their respective
licenses; see `LICENSE` and the bundled notices.
