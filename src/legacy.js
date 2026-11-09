import { loadingStage } from "./loading.mjs";
import {flightPreview,disposeOverlay,flightCamera} from "./overlays.mjs";
import { configurePhysics } from "./runtime.mjs";
import "./style.css";
import { CatchMonitor } from "./catch.mjs";
import { ballControls, applyBall } from "./ball.mjs";
import { configureGymDisplay, installGym } from "./gym.mjs";
import { PhysicalObservation, solveThrow, norm, sub } from "./physics.mjs";
import {
  Color,
} from "three";

const $ = (selector) => document.querySelector(selector);
const base = import.meta.env.BASE_URL;
const ui = {
  ready: false,
  busy: false,
  mode: "target",
  arc: "low",
  profile: 0,
  attempt: 1,
  started: false,
  released: false,
  done: false,
  running: false,
  start: [3, 0, 1.4],
  velocity: [-5, 0, 1],
  plannedFlight: 0.5,
  context: null,
  frames: 0,
  contacts: [false, false],
  hold: 0,
  maxHold: 0,
  previousMidpoint: null,
};
let engine,
  contract,
  currentObservation,
  trajectory,
  lastEngineError,
  controllerBytes, library, ballPicker;
const feedback = (text) => {
  if ($("#feedback").textContent !== text) $("#feedback").textContent = text;
};
function showError(error) {
  $("#error").textContent =
    error instanceof Error ? error.message : String(error);
  $("#error").hidden = false;
}
function clearError() {
  $("#error").hidden = true;
}
function phase(text, live = false) {
  $("#phase").textContent = text;
  $("#phase").classList.toggle("live", live);
}
function params() {
  return Object.fromEntries(
    ["distance", "height", "yaw", "speed"].map((id) => [
      id,
      Number($("#" + id).value),
    ]),
  );
}
function updateSliders() {
  for (const id of ["distance", "height", "yaw", "speed"]) {
    const el = $("#" + id),
      v = Number(el.value),
      unit = id === "yaw" ? "°" : id === "speed" ? "m/s" : "m";
    const formatted =
      id === "yaw"
        ? v.toFixed(0)
        : v.toFixed(id === "height" && Math.round(v * 100) % 10 ? 2 : 1);
    $("#" + id + "-value").innerHTML = `${formatted} <small>${unit}</small>`;
    el.style.setProperty(
      "--value",
      `${(100 * (v - Number(el.min))) / (Number(el.max) - Number(el.min))}%`,
    );
  }
}
function planThrow() {
  const custom=!ui.libraryFlight||ui.mode==='free';
  for(const id of ['distance','height','yaw'])$('#'+id).closest('.slider-field').hidden=!custom;
  $('.presets').hidden=!custom||ui.mode==='free';
  $('#target-settings').hidden=!custom||ui.mode==='free';
  if($('#native-throw-info'))$('#native-throw-info').textContent=custom?'Custom throws may exceed the learned range.':`Flight ${ui.libraryFlight.time.toFixed(2)} s · release speed ${norm(ui.libraryFlight.velocity).toFixed(1)} m/s`;

  if(ui.libraryFlight && ui.mode!=="free"){ui.start=[...ui.libraryFlight.start];ui.velocity=[...ui.libraryFlight.velocity];ui.plannedFlight=ui.libraryFlight.time;ui.wait=ui.libraryFlight.wait;return;}
  ui.wait=.6;
  const p = params();
  const angle = (p.yaw * Math.PI) / 180;
  const target =
    ui.mode === "free"
      ? {
          start: [
            p.distance * Math.cos(angle),
            p.distance * Math.sin(angle),
            p.height,
          ],
          time: 1,
        }
      : solveThrow({ ...p, arc: ui.arc });
  if (ui.mode === "free") {
    const velocity = ["vx", "vy", "vz"].map((id) => Number($("#" + id).value));
    if (!velocity.every((v) => Number.isFinite(v) && Math.abs(v) <= 10))
      throw new Error("Use velocities between −10 and 10 m/s.");
    target.velocity = velocity;
  }
  ui.start = target.start;
  ui.velocity = target.velocity;
  ui.plannedFlight = target.time;
}
function namedId(context, kind, name) {
  const id = context.mujoco.mj_name2id(
    context.mjModel,
    context.mujoco.mjtObj[kind].value,
    name,
  );
  if (id < 0) throw new Error(`Required model element is missing: ${name}`);
  return id;
}
function putBall(velocity = [0, 0, 0]) {
  if (!ui.context) return;
  const { mjData: d, mjModel: m, mujoco: mj } = ui.context;
  d.qpos.set([...ui.start, 1, 0, 0, 0], ui.ballQpos);
  d.qvel.set([...velocity, 0, 0, 0], ui.ballQvel);
  mj.mj_forward(m, d);
}
function resetMetrics() {
  ui.released = false;
  ui.done = false;
  ui.success = false;
  ui.frames = 0;
  ui.hold = 0;
  ui.maxHold = 0;
  ui.contacts = [false, false];
  ui.previousMidpoint = null;
  ui.simTime = 0;
  ui.lastPhysical = null;
  ui.rootHeight = 0.793;
  $("#sim-time").textContent = "0.00";
  $("#ball-speed").textContent = "0.0";
  $("#left-contact").classList.remove("touching");
  $("#right-contact").classList.remove("touching");
}
function updateButtons() {
  $("#throw-label").textContent = ui.running
    ? "Pause"
    : ui.done
      ? "Throw again"
      : ui.started
        ? "Resume"
        : "Throw ball";
  $("#throw-icon").textContent = ui.running ? "Ⅱ" : "↗";
  $("#parameters").disabled = !ui.ready || ui.busy || (ui.started && !ui.done);
  $("#throw").disabled = !ui.ready || ui.busy;
  $("#reset").disabled = !ui.ready || ui.busy;
}
function reset({ increment = false } = {}) {
  if (!engine || ui.busy) return;
  engine.pause();
  ui.running = false;
  ui.started = false;
  if (increment) ui.attempt++;
  $("#attempt").textContent = String(ui.attempt).padStart(2, "0");
  resetMetrics();
  engine.reset();
  if(ballPicker && ui.context)applyBall(ui.context,contract,ballPicker.value);
  phase("Ready");
  feedback("Adjust the throw, then press Throw ball.");
  updateButtons();
}
function stagePreview() {
  clearError();
  try {
    planThrow();
  } catch (error) {
    showError(error);
    return false;
  }
  if (ui.done) reset();
  if (ui.ready && !ui.started) {
    putBall();
    currentObservation?.features.reset();
    drawTrajectory();
  }
  return true;
}
function drawTrajectory() {
  if (!ui.context?.scene) return;
  disposeOverlay(trajectory);
  trajectory=flightPreview(ui.context,{start:ui.start,velocity:ui.velocity,time:ui.plannedFlight});
  trajectory.visible=!ui.started;
  if ($('[data-camera="overview"]').classList.contains("selected"))
    camera("overview");
}

class CatchObservation {
  constructor(runner) {
    this.runner = runner;
    this.features = new PhysicalObservation(contract.defaults, 1);
    currentObservation = this;
  }
  get size() {
    return 160;
  }
  reset() {
    this.features.reset();
    ui.context = this.runner.getContext();
    configurePhysics(ui.context);
    const ctx = ui.context,
      joint = namedId(ctx, "mjOBJ_JOINT", "ball/ball_freejoint");
    ui.ballQpos = ctx.mjModel.jnt_qposadr[joint];
    ui.ballQvel = ctx.mjModel.jnt_dofadr[joint];
    ui.ballBody = namedId(ctx, "mjOBJ_BODY", "ball/ball");
    this.siteIds = ["left", "right"].map((side) =>
      namedId(ctx, "mjOBJ_SITE", `robot/${side}_grasp_site`),
    );
    this.ballGeom = namedId(ctx, "mjOBJ_GEOM", "ball/ball_geom");
    this.handGeoms = new Map();
    for (let i = 0; i < ctx.mjModel.ngeom; i++) {
      const name =
        ctx.mujoco.mj_id2name(
          ctx.mjModel,
          ctx.mujoco.mjtObj.mjOBJ_GEOM.value,
          i,
        ) || "";
      if (/robot\/(left|right)_(hand_|dex3_palm)/.test(name))
        this.handGeoms.set(i, name.includes("/left_") ? 0 : 1);
    }
    this.monitor?.dispose();
      this.monitor=new CatchMonitor(ctx,contract,"dynamic-dex");
    installGym(ctx);
    putBall();
  }
  compute() {
    if (!ui.context) this.reset();
    const { mjModel: m, mjData: d } = ui.context;
    // This callback runs once per control tick, before inference and its 10 physics substeps.
    if (ui.started && !ui.released) {
      if (d.time + 1e-8 < (ui.wait??.6)) putBall();
      else {
        putBall(ui.velocity);
        ui.released = true;
        phase("In flight", true);
        feedback("G1 is tracking the ball.");
      }
    }
    const bodyQ = contract.qposAddresses.slice(0, 27).map((i) => d.qpos[i]);
    const bodyDQ = contract.qvelAddresses.slice(0, 27).map((i) => d.qvel[i]);
    const sites = this.siteIds.map((i) => ({
      position: Array.from(d.site_xpos.slice(3 * i, 3 * i + 3)),
      matrix: Array.from(d.site_xmat.slice(9 * i, 9 * i + 9)),
    }));
    const ball = Array.from(d.qpos.slice(ui.ballQpos, ui.ballQpos + 3));
    const physical = this.features.build({
      qpos: Array.from(d.qpos),
      qvel: Array.from(d.qvel),
      bodyQ,
      bodyDQ,
      handQ: contract.qposAddresses.slice(27).map((i) => d.qpos[i]),
      handDQ: contract.qvelAddresses.slice(27).map((i) => d.qvel[i]),
      sites,
      ball,
      time: d.time,
      mass: m.body_mass[ui.ballBody],
      radius: m.geom_size[this.ballGeom * 3],
    });
    ui.frames++;
    Object.assign(ui,this.monitor.update());
    const touching=ui.contacts;
    const ballVelocity=Array.from(d.qvel.slice(ui.ballQvel,ui.ballQvel+3));
    if (ui.frames % 5 === 0) {
      $("#sim-time").textContent = d.time.toFixed(2);
      $("#ball-speed").textContent = norm(ballVelocity).toFixed(1);
      $("#left-contact").classList.toggle("touching", touching[0]);
      $("#right-contact").classList.toggle("touching", touching[1]);
    }
    // Contact cue; the separate physical monitor decides success.
    if (ui.released && ui.hold >= 0.3) {
      phase("Holding", true);
      feedback("Both hands are in contact and moving with the ball.");
    }
    if (ui.started && !ui.done && (ui.success || ui.fall || (ui.released && ui.dropped) || d.time >= 7)) {
      ui.done = true;
      ui.running = false;
      queueMicrotask(() => {
        engine.pause();
        phase(
          ui.success
            ? "Success"
            : ui.fall
              ? "Off balance"
              : "Missed",
        );
        feedback(
          ui.success
            ? "Success — a stable two-hand hold for over 2 seconds."
            : "Every pass is a new challenge. Adjust the throw and try again.",
        );
        updateButtons();
      });
    }
    // Exposed state is useful for deterministic browser smoke tests and local inspection.
    ui.lastPhysical = physical;
    ui.simTime = d.time;
    ui.rootHeight = d.qpos[2];
    const inputs = new Float32Array(160);
    inputs.set(physical);
    inputs[159] = ui.profile;
    return inputs;
  }
}

async function fetchBytes(path) {
  const response = await fetch(base + path);
  if (!response.ok)
    throw new Error(`Could not load ${path}. Please reload the page.`);
  return response.arrayBuffer();
}
async function policyInput() {
  if (!controllerBytes)
    controllerBytes = await fetchBytes("assets/" + contract.controller);
  return {
    onnx: controllerBytes,
    config: {
      policy_joint_names: contract.jointNames,
      policy_num_actions: 41,
      default_joint_pos: contract.defaults,
      initial_qpos: contract.initialQpos,
      initial_qvel: contract.initialQvel,
      in_keys: ["actor", "adapt_hx"],
      out_keys: ["action", ["next", "adapt_hx"]],
      observations: { actor: [{ name: "catch-state" }] },
      actions: {
        joints: {
          type: "joint_position",
          actuator_names: [".*"],
          scale: 1,
          offset: 0,
          use_default_offset: false,
        },
      },
    },
    plugins: { observations: { "catch-state": CatchObservation } },
  };
}

async function togglePlay() {
  if (!ui.ready || ui.busy) return;
  clearError();
  if (ui.running) {
    engine.pause();
    ui.running = false;
    phase("Paused");
    feedback("Paused. Resume or reset to change the throw.");
  } else {
    if (!ui.started || ui.done) {
      if (!stagePreview()) return;
      if (ui.hasThrown) ui.attempt++;
      ui.hasThrown = true;
      reset();
      ui.started = true;
      phase("Getting ready", true);
      feedback(`G1 is preparing. Release in ${(ui.wait??.6).toFixed(2)} seconds.`);
      if (trajectory) trajectory.visible = false;
    } else phase(ui.released ? "In flight" : "Getting ready", true);
    ui.running = true;
    engine.play();
  }
  updateButtons();
}
function camera(view) {
  if (!engine) return;
  const root = ui.context
    ? Array.from(ui.context.mjData.qpos.slice(0, 3))
    : [0, 0, 0.793];
  const aspect = $("#viewport").clientWidth / $("#viewport").clientHeight;
  const {center,distance}=flightCamera({start:ui.start,velocity:ui.velocity,time:ui.plannedFlight},root,aspect);
  const views = {
    overview: {
      lookat: center,
      distance,
      elevation: -16,
      azimuth: 145,
      fovy: 45,
    },
    side: { lookat: center, distance, elevation: -8, azimuth: 90, fovy: 45 },
    hands: {
      lookat: [root[0] + 0.45, root[1], root[2] + 0.35],
      distance: 1.8,
      elevation: -10,
      azimuth: 145,
      fovy: 45,
    },
  };
  engine.camera.setTracking(false);
  engine.camera.set(views[view]);
  document
    .querySelectorAll("[data-camera]")
    .forEach((b) => b.classList.toggle("selected", b.dataset.camera === view));
}
function preset(name) {
  ui.libraryFlight=null;$("#level").value="custom";
  const presets = {
    easy: [3, 1.4, 0, 5],
    wide: [3.2, 1.5, 18, 5.5],
    fast: [3, 1.4, 0, 7],
  };
  const values = presets[name] || [
    2.2 + Math.random() * 1.8,
    1.2 + Math.random() * 0.4,
    -18 + Math.random() * 36,
    5 + Math.random() * 1.5,
  ];
  ["distance", "height", "yaw", "speed"].forEach((id, i) => {
    $("#" + id).value = values[i];
  });
  ui.arc = "low";
  document.querySelectorAll("[data-arc]").forEach((b) => {
    const on = b.dataset.arc === "low";
    b.classList.toggle("selected", on);
    b.setAttribute("aria-pressed", on);
  });
  document
    .querySelectorAll("[data-preset]")
    .forEach((b) => b.classList.toggle("selected", b.dataset.preset === name));
  updateSliders();
  stagePreview();
}

const challenge = document.createElement("div");
challenge.className = "level-field";
challenge.innerHTML='<label for="level">Throw distribution</label><select id="level"><option value="custom">Custom throw</option></select><button type="button" id="sample" class="sample-button">↝ New throw</button><p id="native-throw-info" class="control-hint"></p>';
$("#parameters").prepend(challenge);
function sampleNative(){
 const group=library?.groups[Number($("#level").value)];
 ui.libraryFlight=group?structuredClone(group.throws[Math.floor(Math.random()*group.throws.length)]):null;
 $("#target-settings").hidden=!!ui.libraryFlight||ui.mode==='free';
 if(ui.done)reset();stagePreview();
}
$("#level").onchange=sampleNative;
$("#sample").onclick=sampleNative;
$("#throw").addEventListener("click", togglePlay);
$("#reset").addEventListener("click", () => {
  reset();
  stagePreview();
});
document
  .querySelectorAll("[data-camera]")
  .forEach((b) => b.addEventListener("click", () => camera(b.dataset.camera)));
document
  .querySelectorAll("[data-preset]")
  .forEach((b) => b.addEventListener("click", () => preset(b.dataset.preset)));
document.querySelectorAll("[data-mode]").forEach((b) =>
  b.addEventListener("click", () => {
    ui.mode = b.dataset.mode;
    if(ui.mode==="free"){ui.libraryFlight=null;$("#level").value="custom";}
    document.querySelectorAll("[data-mode]").forEach((el) => {
      const selected = el === b;
      el.classList.toggle("selected", selected);
      el.setAttribute("aria-pressed", selected);
    });
    $("#target-settings").hidden = ui.mode === "free";
    $("#free-settings").hidden = ui.mode !== "free";
    $("#mode-hint").textContent =
      ui.mode === "free"
        ? "Set the velocity yourself. X points forward from G1."
        : "Choose a release. The arc aims toward the hands.";
    stagePreview();
  }),
);
document.querySelectorAll("[data-arc]").forEach((b) =>
  b.addEventListener("click", () => {
    ui.arc = b.dataset.arc;
    document.querySelectorAll("[data-arc]").forEach((el) => {
      const selected = el === b;
      el.classList.toggle("selected", selected);
      el.setAttribute("aria-pressed", selected);
    });
    stagePreview();
  }),
);
$("#parameters").addEventListener("input", (event) => {
  if (["policy", "level", "ball-kind", "ball-radius", "ball-mass"].includes(event.target.id)) return;
  ui.libraryFlight=null;
  $("#level").value = "custom";
  updateSliders();
  document
    .querySelectorAll("[data-preset]")
    .forEach((b) => b.classList.remove("selected"));
  stagePreview();
});
$("#policy").addEventListener("change", () => {
  if (ui.busy) return;
  ui.profile = $("#policy").selectedIndex;
  ballPicker?.select(ui.profile);
  reset();
  stagePreview();
  feedback("Control profile changed. Set a throw and try it.");
});
$("#fullscreen").addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await $(".stage").requestFullscreen();
  } catch {
    feedback("Fullscreen is unavailable in this browser.");
  }
});
for (const id of ["about-button", "credits-button"])
  $("#" + id).addEventListener("click", () => $("#about").showModal());
$(".dialog-close").addEventListener("click", () => $("#about").close());
$("#about").addEventListener("click", (event) => {
  if (event.target === $("#about")) {
    const r = event.target.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      event.target.close();
  }
});
document.addEventListener("keydown", (event) => {
  if (
    event.code === "Space" &&
    !/INPUT|SELECT|BUTTON|TEXTAREA/.test(event.target.tagName) &&
    !$("#about").open
  ) {
    event.preventDefault();
    togglePlay();
  }
  if (event.code === "Escape" && ui.running) {
    engine.pause();
    ui.running = false;
    phase("Paused");
    updateButtons();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && ui.running) {
    engine.pause();
    ui.running = false;
    phase("Paused");
    feedback("Paused while this tab is in the background.");
    updateButtons();
  }
});
window.addEventListener("resize", () => {
  if (ui.ready && $('[data-camera="overview"]').classList.contains("selected"))
    camera("overview");
});

async function initialize() {
  try {
    updateSliders();
    planThrow();
    loadingStage(1, "Loading task settings");
    const response = await fetch(base + "assets/scene.json");
    if (!response.ok)
      throw new Error(
        "Demo assets are missing. Please reload or contact the site owner.",
      );
    contract = await response.json();
    library=await(await fetch(base+'assets/flights.json')).json();
    for(let i=0;i<library.groups.length;i++)$("#level").add(new Option(library.groups[i].label,String(i)));
    $("#level").value='0';ui.libraryFlight=structuredClone(library.groups[0].throws[0]);
    ballPicker=ballControls($("#parameters"),library,()=>{reset();stagePreview();},0);
    $("#target-settings").hidden=true;
    $("#mode-hint").textContent='Sample the original throw distribution, or choose Custom to design your own.';
    planThrow();
    for (const p of contract.profiles)
      $("#policy").add(new Option(p.id==='standard'?'Standard ball range':'Extended ball range', p.id));
    loadingStage(2, "Downloading the robot and policy");
    const { createEngine } = await import(
      /* @vite-ignore */ base + "vendor/mjswan/mjswan.js"
    );
    engine = await createEngine($("#viewport"), { multithreaded: false });
    engine.subscribe((state) => {
      if (state.error && state.error !== lastEngineError) {
        lastEngineError = state.error;
        ui.running = false;
        engine.pause();
        showError(state.error);
        phase("Stopped");
        updateButtons();
      }
      if (state.loadingMessage)
        $("#loading-message").textContent = state.loadingMessage;
    });
    $("#loading-message").textContent = "Loading the robot and policies";
    const [model, policy] = await Promise.all([fetchBytes("assets/scene.mjz"), policyInput()]);
    loadingStage(3, "Preparing physics and policy");
    await engine.loadScene({
      model,
      controlDt: 0.02,
      policy,
      viewer: {
        lookat: [1.15, 0, 0.92],
        distance: 4.7,
        elevation: -16,
        azimuth: 145,
        fovy: 45,
        originType: "WORLD",
        enableShadows: true,
        enableReflections: false,
      },
    });
    engine.pause();
    engine.interaction.setMode("view");
    configureGymDisplay(engine);
    camera("overview");
    applyBall(ui.context,contract,ballPicker.value);
    ui.ready = true;
    loadingStage(4, "Ready to play");
    $("#loader").hidden = true;
    phase("Ready");
    stagePreview();
    updateButtons();
    // Explicitly read-only diagnostics for verification; no backend or server connection.
    if(new URLSearchParams(location.search).has("audit")) window.__catchEngine=engine;
window.catchLab = {
      ...(new URLSearchParams(location.search).has("audit") ? {setCase(f) {ui.libraryFlight=structuredClone(f);ui.mode='target';planThrow();reset();ui.started=true;putBall();},get config(){return contract;},get observation(){return currentObservation;}} : {}),
      get state() {
        return {
          ready: ui.ready,
          running: ui.running,
          started: ui.started,
          done: ui.done,
          success: ui.success,fall:ui.fall,acquired:ui.acquired,everContact:ui.everContact,
          time: ui.simTime || 0,
          rootHeight: ui.rootHeight,
          frames: ui.frames,
          contacts: [...ui.contacts],
          maxHold: ui.maxHold,
          continuousHold:ui.continuousHold,hold:ui.hold,dropped:ui.dropped,outside:ui.outside,
          finiteObservation: ui.lastPhysical
            ? ui.lastPhysical.every(Number.isFinite)
            : true,
        };
      },
    };
  } catch (error) {
    console.error(error);
    phase("Could not load");
    $("#loading-message").textContent = "The demo could not load";
    $("#loader p").textContent =
      "Check the message in the control panel, then reload to retry.";
    showError(error);
  }
}
initialize();
