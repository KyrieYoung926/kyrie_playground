# KyrieLab Catch Playground

Choose a task at **https://play.kyrielab.com/**, then launch. Physics, rendering
and inference run locally in the browser. Each launch downloads one ONNX model.

**Select** is the default: choose Catch, Pass or Rally. Catch then asks for
State / GT or Depth, one or two hands, and the hand type. **All tasks** shows the
eight original cards. Launching reports four loading stages.

| Task | Throws | Ball radius / mass |
| --- | --- | --- |
| Dynamic Dex Catching | Original mixture, varied arcs, mobile catches, fast passes; custom target/free throws also available | Standard 10.2–12.5 cm or extended 8–16 cm; 250–700 g |
| Single-Hand Catching | Original single-hand distribution; left or right hand | 3.5–4.5 cm; 50–150 g |
| Depth Dex Catching | Field throws | Football 9.5–10.5 cm, 380–420 g; basketball 12–13 cm, 590–650 g |
| Depth Palm Catching | Front-facing L0–L5; lateral reach up to ±1.2 m | Fixed 11 cm, 420 g |
| GT Palm Catching | Original reaction L0–L6; lateral reach up to ±1.5 m | Fixed 11 cm, 420 g |
| Depth Single-Hand Catching | Original camera-aware short throws | 3.5–4.5 cm; 50–150 g |

Throw banks come from each controller's own distribution. Levels apply only to
the two Palm demos. Ball controls stay within each task's supported ranges. Custom throws
can exceed the trained distribution and are not guaranteed to succeed.

Single-Hand’s hand selector loads the matching physical hand and mirrors observations and actions inside the same ONNX. Switching hands resets the attempt.

All demos use the same basketball-court scenery. Bright cyan curves show the planned free-flight path; pink markers show its endpoint. Both Palm demos show the base
workspace on the floor (cyan) and the hand catch window (magenta). These decorations
are viewer-only and do not alter the physical scene or the depth sensor.

**Results use physical contact and stability checks.** Dynamic Dex ends after
more than 2 seconds of continuous stable holding. Single-Hand requires 0.8 s;
Both Palm demos require 1.5 s with bilateral enclosure; Depth Dex requires 5 s holding
and 1 s quiet. Dropping, falling, leaving a task's workspace or timing out ends an
attempt. Reset clears controller history and restores the complete initial state.
Use **All tasks** to return to the gallery.

Depth Dex and the Gemini option in Depth Palm use an actual torso camera render at 424×265, resized to 256×160:
metric depth plus validity mask, 0.25–6 m valid range, and one 20 ms delivery delay.
Depth Palm also offers **RealSense D455**, with its own policy and physical camera
housing: 424×240, 58° vertical FOV, 0.35–6 m; nearest resize to 256×144,
then eight invalid rows above and below for the same 256×160 input. It uses a
camera-specific L0–L5 throw bank. Switch cameras on the task page to reload the
matching policy and reset physics, observation history and recurrent state.
The other camera model is not downloaded until selected.

Depth Single-Hand uses the archived head-mounted D455 configuration: 160×96, 58° vertical FOV, 0.4–6 m, one 20 ms delay and six frames of proprioception. The inset shows the delivered image. Actors receive no ball coordinates or
segmentation labels. This is a nominal sensor simulation, not a full hardware
noise model. Slower devices may run below real time; simulation timing is unchanged.

## Develop and test

Node 24.19+ and npm 11.10+:

```bash
npm ci
npm run dev
```

```bash
npm run build
npm test
npx playwright install chromium
npm run preview -- --port 4173
# Another terminal:
npm run test:browser
node scripts/evaluate.mjs --task depth-rubber --level 5 --episodes 16 --output evaluation.json
node scripts/evaluate.mjs --task depth-rubber --camera d455 --level 5 --episodes 16 --output d455.json
node scripts/evaluate.mjs --task single --hand left --episodes 32 --output left.json
node scripts/evaluate.mjs --task gt-rubber --level 6 --episodes 32 --output palm.json
```

Optionally set `CHROMIUM_PATH`. Evaluation runs fixed numbered throws through the
real browser controller and reports physical successes and falls. `--ball 1`
selects the Depth Dex basketball. CPU contact solving uses 100 Newton iterations
and 50 line-search iterations; timestep, gains and effort limits match the task.
Do not replace catch evaluation with a finite-tensor smoke test.

## Nominal compatibility check

Fixed numbered throws, deterministic inference, nominal ball properties and no
sensor randomization (32 attempts per row):

| Demo | Browser | Native simulator |
| --- | ---: | ---: |
| Single-Hand, right | 30/32 | 30/32 |
| Single-Hand, left | 30/32 | 30/32 |
| GT Palm L0 / L1 / L2 | 32 / 24 / 24 | 32 / 25 / 25 |
| GT Palm L3 / L4 / L5 / L6 | 28 / 28 / 22 / 17 | 28 / 27 / 21 / 17 |
| Depth Single-Hand | 16/32 | 17/32 |

No falls occurred in these browser batches. The archived visual single-hand
controller has a lower native success rate; its demo preserves that behavior.
These small paired batches check browser compatibility, not hardware performance.

D455 Depth Palm integration check: four fixed throws per level, L0–L5.
Browser and native successes were both **4 / 4 / 4 / 4 / 3 / 4** (23/24),
with no falls and the same missed L4 throw. Native episode reset poses can vary;
this checks matching throws and nominal operation, not bit-identical rollouts or
a statistically precise overall success estimate.

## Assets and publishing

- `src/tasks.mjs`: gallery; `src/demo.js` and `src/legacy.js`: runtime adapters.
- `public/assets/`: Dynamic Dex; subfolders `single/`, `depth-dex/`, `depth-rubber/`, `depth-rubber-d455/`, `gt-rubber/`, `depth-single/`:
  one `controller.onnx`, matching `scene.mjz`, `scene.json`, and `flights.json` each.
  Single-Hand also has `scene-left.mjz` / `scene-left.json`, sharing its controller.
- `public/assets/gym/`: shared scenery; `public/vendor/`: same-origin runtime.
- `public/app/` and `public/index.html`: generated by `npm run build`.

Keep checkpoints, conversion tools and training provenance outside this repo.
Replace a model together with its scene contract. Release checks enforce nine
ONNX files total (eight tasks, two Depth Palm camera variants), allowed assets, no private metadata and a 25 MiB per-file limit.

Commit generated `public/` for the existing Cloudflare Pages setup: branch
**main**, output **public**, build command empty or `npm run build`. Pushing main
uses the existing deployment hook. No hosting secrets are stored here.

See **Credits** and `public/assets/CREDITS.txt` for model and asset licenses.


## Passing and continuous rally

Task 7 (**Palm Passing**) starts with a held football. Set a target 0.6–1.5 m
away and a direction within ±90°. A valid physical release must cross the 20 cm
target window, with the robot staying stable afterward. Nine fixed held-state
cases (0.8/1.1/1.4 m × −45/0/+45°) passed in both native and browser simulations.

Task 8 (**Continuous Pass & Catch**) places two robots and one physical football
in the same simulation. After a 3 s stable catch, roles swap with a smooth
transition; the thrower returns to a ready posture while waiting for the return.
The initial throw distance slider covers 0.8–1.5 m and applies to a **new rally**.
A new rally rebuilds the scene; skill swaps never reset physics or policy memory.
At the default 1.1 m, the browser acceptance case completed a full round trip.
Later throws can miss. Failure pauses the demo instead of replacing the ball.

Both use a 22 cm diameter, 420 g football. Cyan traces are measured physical
positions with the same cyan core and dark outline as the catching previews.
The pink ring and point identify the target window and its center. When the
released ball center crosses that plane, an amber point, center-to-crossing
segment and label show the distance in centimeters. The crossing is interpolated
between adjacent 20 ms policy samples. Each rally leg clears the previous trace
and annotation. They share the existing court, lighting and camera style.
Each demo contains one self-contained ONNX, including its lower-body controller;
`rally-rubber/controller.onnx` includes both skills shared by the two robots.

`src/passing.js` is the shared adapter. The new `pass-rubber/` and
`rally-rubber/` asset folders contain a controller, scene and scene contract;
they do not contain prerecorded launch trajectories.

### Rally observation and contact parity

The rally catcher uses the native playback observation profile: 20–40 ms ball
measurement latency, 5 mm white noise plus correlated bias, burst dropouts,
and small proprioception noise. Its observation history is separate from the
passer's clean state history and from the lower-body controller. The physical
ball itself is unchanged. `?task=rally-rubber&clean` disables these perturbations;
`&seed=81110` changes their reproducible random stream (not the held-state bank).

Passer support/release decisions aggregate contact over native sensor history
windows, rather than sampling only the final physics frame. Native contact
vectors are released after reading, preventing WASM memory growth in long runs.
The default regression now requires **four stable catches**, while other noise
seeds can fail sooner. This is a finite physical rally demo, not guaranteed
indefinite play. Browser and GPU native dynamics are not bit-identical.
