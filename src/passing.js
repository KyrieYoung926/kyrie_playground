import { configurePhysics } from "./runtime.mjs";
import {
  rotation,
  inverseRotate,
  relativeRotation6d,
  sub,
  norm,
} from "./physics.mjs";
import { CatchMonitor } from "./catch.mjs";
import { installGym, configureGymDisplay } from "./gym.mjs";
import { disposeOverlay } from "./overlays.mjs";
const row = (a, i, n = 3) => Array.from(a.slice(i * n, (i + 1) * n));
const dot = (a, b) => a.reduce((v, x, i) => v + x * b[i], 0);
const smooth = (u) => {
  u = Math.max(0, Math.min(1, u));
  return u * u * (3 - 2 * u);
};
const rotate = (m, v) =>
  [0, 1, 2].map((i) => dot(m.slice(i * 3, i * 3 + 3), v));

export async function startPassing(task) {
  const $ = (s) => document.querySelector(s),
    base = import.meta.env.BASE_URL,
    rally = task.id === "rally-rubber";
  let cfg, engine, context, observer, overlay, lastError;
  const ui = {
    ready: false,
    running: false,
    done: false,
    started: false,
    time: 0,
    catches: 0,
    attempt: 1,
    events: [],
  };
  $("#parameters").innerHTML =
    `<div class="slider-field"><label for="distance">${rally ? "Initial throw distance" : "Target distance"} <output id="distance-value">1.10 m</output></label><input id="distance" type="range" min="${rally ? ".8" : ".6"}" max="1.5" step=".05" value="1.1"></div>${rally ? "" : '<div class="slider-field"><label for="yaw">Target direction <output id="yaw-value">0°</output></label><input id="yaw" type="range" min="-90" max="90" step="5" value="0"></div>'}<p class="control-hint">Football · 22 cm diameter · 420 g. Settings apply to a new attempt.</p><p class="control-hint">${rally ? "Catch, hold for 3 seconds, then pass back. Both robots share one physical ball." : "Turn toward the target, then physically throw with both hands. Green ring: target window."}</p>`;
  if (rally) {
    const value = Number(
      new URLSearchParams(location.search).get("distance") || 1.1,
    );
    $("#distance").value = Number.isFinite(value)
      ? Math.min(1.5, Math.max(0.8, value))
      : 1.1;
    $("#distance-value").textContent =
      Number($("#distance").value).toFixed(2) + " m";
  }
  $(".release-note").textContent =
    "The ball starts in the hands. No synthetic launch is applied.";
  const report = (t) => ($("#feedback").textContent = t);
  const phase = (t) => ($("#phase").textContent = t);
  function buttons() {
    $("#throw").disabled = !ui.ready;
    $("#reset").disabled = !ui.ready;
    $("#parameters").disabled = !ui.ready || ui.running;
    $("#throw-label").textContent = ui.running
      ? "Pause"
      : ui.done
        ? "New attempt"
        : ui.started
          ? "Resume"
          : rally
            ? "Start rally"
            : "Pass ball";
  }
  for (const key of ["distance", "yaw"])
    if ($("#" + key))
      $("#" + key).oninput = () => {
        $("#" + key + "-value").textContent =
          key === "distance"
            ? Number($("#" + key).value).toFixed(2) + " m"
            : $("#" + key).value + "°";
      };
  const id = (kind, name) => {
    const i = context.mujoco.mj_name2id(
      context.mjModel,
      context.mujoco.mjtObj[kind].value,
      name,
    );
    if (i < 0) throw Error("Missing scene element " + name);
    return i;
  };
  function stop(reason) {
    if (ui.done) return;
    ui.done = true;
    ui.running = false;
    ui.reason = reason;
    queueMicrotask(() => {
      engine.pause();
      phase(reason);
      report(
        `${rally ? ui.catches + " stable catches · " + Math.floor(ui.catches / 2) + " round trips. " : ""}${reason}. Start a new attempt to reset.`,
      );
      buttons();
    });
  }
  async function reset(freshScene = false) {
    // Rebuild the multi-robot runtime for a new episode. Skill swaps never use this.
    if (rally && ui.ready && freshScene !== true) {
      const url = new URL(location.href);
      url.searchParams.set("distance", $("#distance").value);
      location.assign(url.href);
      return;
    }
    if (!engine) return;
    engine.pause();
    await engine.runtime.stop();
    Object.assign(ui, {
      running: false,
      done: false,
      started: false,
      time: 0,
      catches: 0,
      events: [],
      reason: null,
      success: false,
    });
    ui.attempt++;
    $("#attempt").textContent = String(ui.attempt).padStart(2, "0");
    await engine.runtime.resetSimulationState();
    $("#sim-time").textContent = "0.00";
    $("#ball-speed").textContent = "0.0";
    phase("Ready");
    buttons();
    report("Ready. Adjust the settings and start.");
  }
  async function toggle() {
    if (!ui.ready) return;
    if (ui.running) {
      engine.pause();
      ui.running = false;
    } else {
      if (ui.done) {
        await reset();
        if (rally) return;
      }
      ui.started = true;
      ui.running = true;
      engine.play();
    }
    buttons();
  }
  function draw() {
    if (!observer || !context) return;
    disposeOverlay(overlay);
    const T = globalThis.__mjswanThree;
    overlay = new T.Group();
    overlay.name = "pass-overlays";
    const convert = (p) => new T.Vector3(p[0], p[2], -p[1]);
    const pts = observer.trail.slice(-500).map(convert);
    if (pts.length > 1)
      overlay.add(
        new T.Line(
          new T.BufferGeometry().setFromPoints(pts),
          new T.LineBasicMaterial({ color: 0x16d9f5, linewidth: 3 }),
        ),
      );
    const s = observer.pass[observer.holder],
      n = s.normal,
      target = s.target,
      points = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i * Math.PI) / 32;
      points.push(
        convert([
          target[0] - 0.2 * n[1] * Math.cos(a),
          target[1] + 0.2 * n[0] * Math.cos(a),
          target[2] + 0.2 * Math.sin(a),
        ]),
      );
    }
    overlay.add(
      new T.Line(
        new T.BufferGeometry().setFromPoints(points),
        new T.LineBasicMaterial({ color: 0x24cd89 }),
      ),
    );
    const marker = new T.Mesh(
      new T.SphereGeometry(0.018, 10, 8),
      new T.MeshBasicMaterial({ color: 0xff56bb }),
    );
    marker.position.copy(convert(observer.ball));
    overlay.add(marker);
    context.scene.add(overlay);
  }
  class Observation {
    constructor(runner) {
      this.runner = runner;
      observer = this;
    }
    get size() {
      return cfg.inputSize;
    }
    reset() {
      context = this.runner.getContext();
      configurePhysics(context);
      const { mjModel: m, mjData: d, mujoco: mj } = context;
      this.monitors?.forEach((x) => x.dispose());
      const bj = id("mjOBJ_JOINT", "ball/ball_freejoint");
      this.bq = m.jnt_qposadr[bj];
      this.bv = m.jnt_dofadr[bj];
      if (rally) {
        const dx = Number($("#distance").value) - cfg.initialDistance;
        d.qpos[cfg.robots[1].rootQ] += dx;
        d.qpos[this.bq] += dx;
      }
      mj.mj_forward(m, d);
      this.robots = cfg.robots.map((c) => ({
        ...c,
        wrists: c.wristBodies.map((n) => id("mjOBJ_BODY", n)),
      }));
      this.monitors = this.robots.map(
        (c) =>
          new CatchMonitor(
            context,
            {
              ...cfg,
              ...c,
              palmFrames: cfg.palmFrames.map((p, i) => ({
                ...p,
                body: c.palmBodies[i],
              })),
            },
            "gt-rubber",
          ),
      );
      this.samples = [];
      this.trail = [];
      this.ball = row(d.qpos, this.bq / 3);
      this.ball = Array.from(d.qpos.slice(this.bq, this.bq + 3));
      this.modes = rally ? ["wait", "pass"] : ["pass"];
      this.age = rally ? [0, 1] : [1];
      this.pass = this.robots.map(() => ({}));
      this.holder = rally ? 1 : 0;
      this.lastTime = null;
      this.legStart = 0;
      this.returnStart = this.robots.map(() => cfg.ready.slice());
      this.results = [];
      this.beginPass(this.holder, true);
      installGym(context);
      draw();
    }
    beginPass(i, initial = false) {
      const d = context.mjData,
        c = this.robots[i],
        root = Array.from(d.qpos.slice(c.rootQ, c.rootQ + 3)),
        R = rotation(Array.from(d.qpos.slice(c.rootQ + 3, c.rootQ + 7)));
      let target;
      if (rally) {
        const rc = this.robots[1 - i],
          rp = Array.from(d.qpos.slice(rc.rootQ, rc.rootQ + 3)),
          rr = rotation(Array.from(d.qpos.slice(rc.rootQ + 3, rc.rootQ + 7)));
        target = rp.map((v, k) => v + rotate(rr, [0.5, 0, 0])[k]);
        target[2] = 1.05;
      } else {
        const a =
            Math.atan2(R[3], R[0]) + (Number($("#yaw").value) * Math.PI) / 180,
          dist = Number($("#distance").value);
        target = [
          this.ball[0] + dist * Math.cos(a),
          this.ball[1] + dist * Math.sin(a),
          1.05,
        ];
      }
      const delta = sub(target, this.ball);
      delta[2] = 0;
      const len = norm(delta);
      this.pass[i] = {
        target,
        normal: delta.map((v) => v / len),
        elapsed: 0,
        aligned: 0,
        ready: false,
        released: false,
        ever: false,
        gap: 0,
        previous: this.ball.slice(),
        hit: false,
        crossed: false,
        valid: false,
        contactTimes: [0, 0],
        origin: root,
      };
      ui.events.push({
        event: "pass_start",
        robot: i,
        time: Number(d.time),
        distance: len,
      });
    }
    compute() {
      if (!context) this.reset();
      const { mjData: d } = context;
      const time = Number(d.time),
        dt =
          this.lastTime === null
            ? 0
            : Math.max(0, Math.min(0.02, time - this.lastTime));
      this.lastTime = time;
      this.ball = Array.from(d.qpos.slice(this.bq, this.bq + 3));
      const bv = Array.from(d.qvel.slice(this.bv, this.bv + 3));
      if (dt || this.samples.length === 0) {
        this.samples.push({ p: this.ball.slice(), t: time });
        if (this.samples.length > 5) this.samples.shift();
        this.trail.push(this.ball.slice());
      }
      this.results = this.monitors.map((m) => m.update(6));
      const states = this.robots.map((c) => {
        const root = Array.from(d.qpos.slice(c.rootQ, c.rootQ + 3)),
          R = rotation(Array.from(d.qpos.slice(c.rootQ + 3, c.rootQ + 7)));
        return {
          root,
          R,
          q: c.qposAddresses.map((i) => d.qpos[i]),
          dq: c.qvelAddresses.map((i) => d.qvel[i]),
          omega: Array.from(d.qvel.slice(c.rootV + 3, c.rootV + 6)),
          rv: Array.from(d.qvel.slice(c.rootV, c.rootV + 3)),
          wrists: c.wrists.flatMap((i) => [
            ...inverseRotate(R, sub(row(d.xpos, i), root)),
            ...relativeRotation6d(R, row(d.xmat, i, 9)),
          ]),
        };
      });
      this.age = this.age.map((x) => x + dt);
      this.modes = this.modes.map((m, i) =>
        m === "return" && this.age[i] >= 0.87 ? "wait" : m,
      );
      const h = this.holder,
        s = this.pass[h],
        r = states[h],
        hands = this.results[h].contacts;
      const a =
          Math.atan2(s.target[1] - r.root[1], s.target[0] - r.root[0]) -
          Math.atan2(r.R[3], r.R[0]),
        heading = Math.atan2(Math.sin(a), Math.cos(a));
      if (this.modes[h] === "pass") s.elapsed += dt;
      s.aligned =
        hands.every(Boolean) && Math.abs(heading) < Math.PI / 18 && !s.released
          ? s.aligned + dt
          : 0;
      s.ready ||= s.aligned >= 0.1 - 1e-6 && s.elapsed >= 0.16 - 1e-6;
      s.ever ||= hands.every(Boolean);
      hands.forEach((v, i) => {
        if (v) s.contactTimes[i] = s.elapsed;
      });
      if (!hands.some(Boolean) && s.gap === 0 && s.ever && !s.released) {
        s.releaseVelocity = bv.slice();
        s.releasePosition = this.ball.slice();
        s.releaseHeading = Math.abs(heading);
        s.releaseSkew = Math.abs(s.contactTimes[0] - s.contactTimes[1]);
      }
      s.gap = hands.some(Boolean) ? 0 : s.gap + dt;
      if (
        rally &&
        this.modes[1 - h] === "wait" &&
        s.ready &&
        dot(bv, s.normal) > 0.6
      ) {
        this.modes[1 - h] = "catch";
        this.age[1 - h] = 0;
        ui.events.push({ event: "catch_activate", robot: 1 - h, time });
      }
      if (!s.released && s.ever && s.gap >= 0.04 - 1e-6) {
        s.released = true;
        s.valid =
          s.ready &&
          dot(s.releaseVelocity, s.normal) > 0.6 &&
          s.releaseVelocity[2] > -0.2 &&
          s.releasePosition[2] >= 0.65 &&
          s.releasePosition[2] <= 1.6 &&
          s.releaseHeading < Math.PI / 12 &&
          s.releaseSkew <= 0.06 + 1e-6;
        this.modes[h] = "return";
        this.age[h] = 0;
        this.returnStart[h] = Array.from(
          this.runner.getLastActions().slice(h * 29 + 15, (h + 1) * 29),
        );
        ui.events.push({
          event: "release",
          robot: h,
          time,
          valid: s.valid,
          velocity: s.releaseVelocity,
        });
      }
      const before = dot(sub(s.previous, s.target), s.normal),
        after = dot(sub(this.ball, s.target), s.normal);
      if (s.released && !s.crossed && before < 0 && after >= 0) {
        s.crossed = true;
        const u = -before / (after - before),
          p = s.previous.map((v, k) => v + u * (this.ball[k] - v));
        s.error = norm(sub(p, s.target));
        s.hit =
          s.valid &&
          !s.recontact &&
          !s.failed &&
          s.error < 0.2 &&
          norm(bv) < 4.5;
        s.hitAt = time;
      }
      if (s.released && hands.some(Boolean)) s.recontact = true;
      const stance = norm(sub(r.root, s.origin).slice(0, 2));
      s.failed ||= stance > 0.35 || !!s.recontact || (s.crossed && !s.hit);
      s.previous = this.ball.slice();
      if (
        rally &&
        this.modes[1 - h] === "catch" &&
        this.results[1 - h].hold >= cfg.holdSeconds - 1e-6 &&
        norm(states[1 - h].rv.slice(0, 2)) < 0.3 &&
        norm(states[1 - h].omega) < 0.6
      ) {
        ui.catches++;
        ui.events.push({ event: "stable_catch", robot: 1 - h, time });
        this.holder = 1 - h;
        this.modes[1 - h] = "pass";
        this.age[1 - h] = 0;
        this.legStart = time;
        this.monitors[1 - h].hold = 0;
        this.beginPass(1 - h);
      }
      const ss = this.samples,
        last = ss.at(-1),
        tm = ss.reduce((a, v) => a + v.t, 0) / ss.length,
        den = ss.reduce((a, v) => a + (v.t - tm) ** 2, 0),
        vel = [0, 1, 2].map(
          (k) =>
            ss.reduce((a, v) => a + (v.t - tm) * (v.p[k] - last.p[k]), 0) /
            Math.max(den, 1e-10),
        );
      const padded = Array.from(
          { length: 5 },
          (_, i) => ss[Math.max(0, i - (5 - ss.length))],
        ),
        valid = padded.map((v, i) =>
          i === 0 || v.t !== padded[i - 1].t ? 1 : 0,
        );
      const inputs = states.flatMap((r, i) => {
        const s = this.pass[i],
          target = s.target || r.root,
          a =
            Math.atan2(target[1] - r.root[1], target[0] - r.root[0]) -
            Math.atan2(r.R[3], r.R[0]);
        const ptask = [
          ...inverseRotate(r.R, sub(target, r.root)),
          Math.sin(a),
          Math.cos(a),
          ...r.wrists,
          ...this.results[i].contacts.map(Number),
          Number(!!s.ready),
          Number(!!s.released),
          (s.elapsed || 0) / 5,
        ];
        const mode = { pass: 0, catch: 1, return: 2, wait: 3 }[this.modes[i]],
          permission = !rally || ["wait", "catch"].includes(this.modes[1 - i]);
        return [
          ...r.q,
          ...r.dq,
          ...r.omega,
          ...inverseRotate(r.R, [0, 0, -1]),
          ...r.wrists,
          ...padded.flatMap((v) => inverseRotate(r.R, sub(v.p, r.root))),
          ...inverseRotate(r.R, vel),
          ...valid,
          ...inverseRotate(r.R, sub(this.ball, r.root)),
          ...inverseRotate(r.R, sub(bv, r.rv)),
          cfg.ballMass,
          cfg.ballRadius,
          ...ptask,
          mode,
          smooth(this.age[i] / 0.5) * Number(permission),
          smooth((this.age[i] - 0.12) / 0.75),
          ...this.returnStart[i],
        ];
      });
      if (inputs.length !== cfg.inputSize || !inputs.every(Number.isFinite))
        throw Error("Invalid controller input");
      ui.time = time;
      ui.modes = this.modes.slice();
      ui.hold = this.results[rally ? 1 - this.holder : 0].hold;
      ui.finiteObservation = true;
      ui.ball = this.ball.slice();
      ui.target = this.pass[this.holder].target.slice();
      ui.hit = s.hit;
      if (Math.round(time / 0.02) % 5 === 0) {
        $("#sim-time").textContent = time.toFixed(2);
        $("#ball-speed").textContent = norm(bv).toFixed(1);
        for (const [i, k] of ["left", "right"].entries())
          $("#" + k + "-contact").classList.toggle(
            "touching",
            this.results[rally ? 1 - this.holder : 0].contacts[i],
          );
        if (!ui.done) {
          phase(
            rally
              ? `${ui.catches} catches · ${this.modes.join(" / ")}`
              : s.released
                ? "Released"
                : s.ready
                  ? "Pushing"
                  : "Aligning",
          );
          report(
            rally
              ? `${Math.floor(ui.catches / 2)} round trips · receiver hold ${ui.hold.toFixed(2)} / 3 s`
              : "Turn, push and release. Green ring: target.",
          );
        }
        draw();
      }
      if (ui.started && !ui.done) {
        if (this.results.some((x) => x.fall)) stop("Off balance");
        else if (!rally && s.failed) stop("Pass missed");
        else if (!rally && s.hit) {
          if (
            time - s.hitAt >= 0.3 &&
            norm(r.rv.slice(0, 2)) < 0.45 &&
            norm(r.omega) < 0.8
          ) {
            ui.success = true;
            stop("Success");
          }
        } else if (this.ball[2] < 0.13) stop("Ball dropped");
        else if (time - this.legStart > (rally ? 12 : 6)) stop("Timed out");
      }
      return Float32Array.from(inputs);
    }
  }
  try {
    const load = async (name, json = false) => {
      const res = await fetch(base + task.asset + "/" + name);
      if (!res.ok) throw Error("Could not load demo");
      return json ? res.json() : res.arrayBuffer();
    };
    cfg = await load("scene.json", true);
    const [model, onnx] = await Promise.all([
      load("scene.mjz"),
      load("controller.onnx"),
    ]);
    const { createEngine } = await import(
      /* @vite-ignore */ base + "vendor/mjswan/mjswan.js"
    );
    engine = await createEngine($("#viewport"), { multithreaded: false });
    engine.subscribe((s) => {
      if (s.loadingMessage)
        $("#loading-message").textContent = s.loadingMessage;
      if (s.error && s.error !== lastError) {
        lastError = s.error;
        $("#error").hidden = false;
        $("#error").textContent = s.error;
        engine.pause();
      }
    });
    await engine.loadScene({
      model,
      controlDt: 0.02,
      policy: {
        onnx,
        config: {
          policy_joint_names: cfg.jointNames,
          policy_num_actions: cfg.jointNames.length,
          default_joint_pos: cfg.defaults,
          initial_qpos: cfg.initialQpos,
          initial_qvel: cfg.initialQvel,
          in_keys: ["actor", "adapt_hx"],
          out_keys: ["action", ["next", "adapt_hx"]],
          observations: { actor: [{ name: "sensors" }] },
          actions: {
            joints: {
              type: "joint_position",
              actuator_names: [".*"],
              scale: 1,
              offset: 0,
              use_default_offset: false,
              stiffness: cfg.stiffness,
              damping: cfg.damping,
            },
          },
        },
        plugins: { observations: { sensors: Observation } },
      },
      viewer: {
        lookat: rally ? [0.9, 0, 0.9] : [0.6, 0, 0.9],
        distance: rally ? 3.6 : 3.4,
        elevation: -15,
        azimuth: 110,
        fovy: 45,
        originType: "WORLD",
        enableShadows: true,
        enableReflections: false,
      },
    });
    engine.pause();
    engine.interaction.setMode("view");
    configureGymDisplay(engine);
    await reset();
    ui.ready = true;
    $("#loader").hidden = true;
    buttons();
    phase("Ready");
    report("Ready. Start the simulation.");
    $("#throw").onclick = toggle;
    $("#reset").onclick = reset;
    document.addEventListener("keydown", (e) => {
      if (
        e.code === "Space" &&
        !["INPUT", "SELECT"].includes(e.target.tagName)
      ) {
        e.preventDefault();
        toggle();
      }
    });
    $("#fullscreen").onclick = () =>
      document.fullscreenElement
        ? document.exitFullscreen()
        : $(".stage").requestFullscreen();
    $("#about-button").onclick = () => $("#about").showModal();
    $(".dialog-close").onclick = () => $("#about").close();
    $("#credits-button").onclick = () => $("#about").showModal();
    window.catchLab = {
      get state() {
        return { ...ui, task: task.id };
      },
      get observation() {
        return observer;
      },
      get config() {
        return cfg;
      },
      startAudit() {
        ui.started = true;
      },
      reset,
    };
    if (new URLSearchParams(location.search).has("audit"))
      window.__catchEngine = engine;
  } catch (e) {
    console.error(e);
    $("#error").hidden = false;
    $("#error").textContent = e.message;
    phase("Could not load");
  }
}
