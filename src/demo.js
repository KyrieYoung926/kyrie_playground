import { configurePhysics } from "./runtime.mjs";
import {
  rotation,
  inverseRotate,
  relativeRotation6d,
  sub,
  norm,
} from "./physics.mjs";
import { CatchMonitor } from "./catch.mjs";
import { ballControls, applyBall } from "./ball.mjs";
import { configureGymDisplay, installGym, drawCatchRegions } from "./gym.mjs";
import { DepthCamera } from "./depth.mjs";

// Recurrent policy state stays inside the one per-task ONNX. These adapters only
// measure deployable proprioception and, for the visual tasks, actual image depth.
export async function startDemo(task) {
  const $ = (s) => document.querySelector(s),
    base = import.meta.env.BASE_URL;
  const ui = {
    ready: false,
    running: false,
    started: false,
    done: false,
    released: false,
    frames: 0,
    attempt: 1,
    time: 0,
    contacts: [false, false],
    hold: 0,
    maxHold: 0,
  };
  let engine,
    cfg,
    context,
    observer,
    flight,
    bank,
    line,
    ballQ,
    ballV,
    ballGeom,
    ballBody,
    lastError, regions, ballPicker;
  const report = (s) => ($("#feedback").textContent = s);
  const phase = (s) => {
    $("#phase").textContent = s;
    $("#phase").classList.toggle("live", ui.running);
  };
  const error = (e) => {
    $("#error").hidden = false;
    $("#error").textContent = e.message || String(e);
  };
  const named = (kind, name) => {
    const id = context.mujoco.mj_name2id(
      context.mjModel,
      context.mujoco.mjtObj[kind].value,
      name,
    );
    if (id < 0) throw Error(`Missing model element: ${name}`);
    return id;
  };
  const fetchData = async (path, json = false) => {
    const r = await fetch(base + task.asset + "/" + path);
    if (!r.ok) throw Error(`Could not load ${task.title}. Please reload.`);
    return json ? r.json() : r.arrayBuffer();
  };
  $("#parameters").innerHTML =
    `<p class="control-hint">Choose a challenge and a throw. Levels are specific to this task.</p><div class="level-field"><label for="level">Challenge</label><select id="level">${Array.from({ length: task.maxLevel + 1 }, (_, i) => `<option value="${i}">L${i}${i === 0 ? " · Gentle" : i === task.maxLevel ? " · Wide" : ""}</option>`).join("")}</select></div><div class="level-field"><label for="direction">Catch side</label><select id="direction"><option value="either">Either</option><option value="left">Left</option><option value="right">Right</option></select></div><button type="button" id="sample" class="sample-button">↝ New throw</button><p id="throw-info" class="control-hint"></p>${task.depth ? '<label class="depth-toggle"><input id="depth-toggle" type="checkbox" checked /> Show depth camera</label><p class="control-hint">The policy sees depth and its own body state. The inset shows its delayed camera input.</p>' : '<p class="control-hint">A small ball, caught with the right Dex3 hand.</p>'}`;
  $(".release-note").textContent =
    task.id === "depth-rubber"
      ? "The ball is released when the simulation starts."
      : task.id === "depth-dex"
        ? "A 2 s warm-up gives G1 time to prepare."
        : "A 0.6 s warm-up gives G1 time to prepare.";
  if (task.depth) {
    const panel = document.createElement("div");
    panel.className = "depth-panel";
    panel.innerHTML =
      '<div>ROBOT DEPTH <span id="image-age">Waiting</span></div><canvas id="depth-image" width="256" height="160"></canvas><small>Near → far · dark pixels: invalid</small>';
    $(".stage").append(panel);
    $("#depth-toggle").onchange = () =>
      (panel.hidden = !$("#depth-toggle").checked);
  }
  function buttons() {
    $("#parameters").disabled = !ui.ready || (ui.started && !ui.done);
    $("#throw").disabled = !ui.ready;
    $("#reset").disabled = !ui.ready;
    $("#throw-label").textContent = ui.running
      ? "Pause"
      : ui.done
        ? "Throw again"
        : ui.started
          ? "Resume"
          : "Throw ball";
    $("#throw-icon").textContent = ui.running ? "Ⅱ" : "↗";
  }
  function put(velocity = [0, 0, 0]) {
    if (!context) return;
    const { mjData: d, mjModel: m, mujoco: mj } = context;
    d.qpos.set([...flight.start, 1, 0, 0, 0], ballQ);
    d.qvel.set([...velocity, 0, 0, 0], ballV);
    mj.mj_forward(m, d);
  }
  function draw() {
    if (!context) return;
    const T = globalThis.__mjswanThree;
    if (line) {
      line.removeFromParent();
      line.geometry.dispose();
      line.material.dispose();
    }
    const vertices = [];
    for (let i = 0; i <= 48; i++) {
      const t = (flight.time * i) / 48,
        p = flight.start.map(
          (v, j) => v + flight.velocity[j] * t - (j === 2 ? 4.905 * t * t : 0),
        );
      vertices.push(p[0], p[2], -p[1]);
    }
    line = new T.Line(
      new T.BufferGeometry().setAttribute(
        "position",
        new T.Float32BufferAttribute(vertices, 3),
      ),
      new T.LineDashedMaterial({
        color: "#ac8354",
        dashSize: 0.06,
        gapSize: 0.05,
        transparent: true,
        opacity: 0.6,
      }),
    );
    line.computeLineDistances();
    context.scene.add(line);
    line.visible = !ui.started;
  }
  function worldFlight(flight) {
    const R = rotation(cfg.initialQpos.slice(3, 7)),
      yaw = cfg.launchYaw ?? Math.atan2(R[3], R[0]),
      co = Math.cos(yaw),
      si = Math.sin(yaw),
      turn = (v) => [co * v[0] - si * v[1], si * v[0] + co * v[1], v[2]];
    flight.velocity = turn(flight.velocity);
    for (const key of ["start", "target"])
      flight[key] = turn(flight[key]).map(
        (v, i) => v + (i < 2 ? cfg.initialQpos[i] : 0),
      );
    return flight;
  }
  function choose() {
    const level = Number($("#level").value),
      dir = $("#direction").value;
    let pool = bank.groups[level].throws.filter(
      (f) =>
        dir === "either" ||
        (dir === "left" ? f.target[1] >= 0 : f.target[1] < 0),
    );
    if (!pool.length) pool = bank.groups[level].throws;
    flight = structuredClone(pool[Math.floor(Math.random() * pool.length)]);
    flight = worldFlight(flight);
    $("#throw-info").textContent =
      `Release distance ${flight.start[0].toFixed(1)} m · flight ${flight.time.toFixed(2)} s · ball Ø ${((ballPicker?.value.radius ?? cfg.ballRadius) * 200).toFixed(0)} cm`;
  }
  function reset(newFlight = false) {
    if (!engine) return;
    engine.pause();
    Object.assign(ui, {
      running: false,
      started: false,
      done: false,
      success: false,
      released: false,
      frames: 0,
      time: 0,
      hold: 0,
      maxHold: 0,
      contacts: [false, false],
    });
    if (newFlight) {
      choose();
      ui.attempt++;
    }
    engine.reset();
    if(ballPicker && context) applyBall(context,cfg,ballPicker.value,observer?.depth);
    put();
    draw();
    phase("Ready");
    $("#attempt").textContent = String(ui.attempt).padStart(2, "0");
    $("#sim-time").textContent = "0.00";
    if (task.depth) $("#image-age").textContent = "Waiting";
    $("#ball-speed").textContent = "0.0";
    for (const side of ["left", "right"])
      $("#" + side + "-contact").classList.remove("touching");
    report("Choose a throw, then press Throw ball.");
    buttons();
  }
  function camera(view) {
    if (!engine) return;
    const r = context
        ? Array.from(context.mjData.qpos.slice(0, 3))
        : [0, 0, 0.793],
      center = [flight.start[0] / 2, flight.target[1] / 3, 0.95],
      distance = Math.max(4, flight.start[0] + 1.5);
    const views = {
      overview: {
        lookat: center,
        distance,
        elevation: -15,
        azimuth: 140,
        fovy: 45,
      },
      side: { lookat: center, distance, elevation: -8, azimuth: 90, fovy: 45 },
      hands: {
        lookat: [r[0] + 0.4, r[1], r[2] + 0.3],
        distance: 1.6,
        elevation: -10,
        azimuth: 140,
        fovy: 45,
      },
    };
    engine.camera.setTracking(false);
    engine.camera.set(views[view]);
    document
      .querySelectorAll("[data-camera]")
      .forEach((b) =>
        b.classList.toggle("selected", b.dataset.camera === view),
      );
  }
  class Observation {
    constructor(runner) {
      this.runner = runner;
      this.depth = null;
      observer = this;
    }
    get size() {
      return cfg.inputSize;
    }
    reset() {
      context = this.runner.getContext();
      configurePhysics(context);
      const j = named("mjOBJ_JOINT", "ball/ball_freejoint");
      ballQ = context.mjModel.jnt_qposadr[j];
      ballV = context.mjModel.jnt_dofadr[j];
      ballGeom = named("mjOBJ_GEOM", "ball/ball_geom");
      ballBody = named("mjOBJ_BODY", "ball/ball");
      this.samples = [];
      this.previousEE = null;
      this.previousTime = null;
      this.prevMid = null;
      this.monitor?.dispose();
      this.monitor=new CatchMonitor(context,cfg,task.id);
      this.depth?.reset();
      this.hands = new Map();
      this.ids =
        task.id === "depth-rubber"
          ? cfg.wristBodies.map((n) => named("mjOBJ_BODY", n))
          : ["left", "right"].map((s) =>
              named("mjOBJ_SITE", `robot/${s}_grasp_site`),
            );
      for (let i = 0; i < context.mjModel.ngeom; i++) {
        const n =
          context.mujoco.mj_id2name(
            context.mjModel,
            context.mujoco.mjtObj.mjOBJ_GEOM.value,
            i,
          ) || "";
        if (/robot\/(left|right)_(hand_|dex3_palm|rubber|wrist_yaw)/.test(n))
          this.hands.set(i, n.includes("/left_") ? 0 : 1);
      }
      const T = globalThis.__mjswanThree;
      installGym(context);
      regions=drawCatchRegions(context,cfg,Number($("#level").value),regions);
      put();
    }
    compute() {
      if (!context) this.reset();
      const { mjData: d } = context;
      if (ui.started && !ui.released) {
        const wait = task.id === "depth-rubber" ? flight.wait : Math.max(0.02, flight.wait);
        if (d.time + 1e-8 < wait) put();
        else {
          put(flight.velocity);
          ui.released = true;
          phase("In flight");
          report("The robot is tracking the ball.");
        }
      }
      const root = Array.from(d.qpos.slice(0, 3)),
        rot = rotation(Array.from(d.qpos.slice(3, 7))),
        omega = Array.from(d.qvel.slice(3, 6)),
        gravity = inverseRotate(rot, [0, 0, -1]),
        q = cfg.qposAddresses.map((i) => d.qpos[i]),
        dq = cfg.qvelAddresses.map((i) => d.qvel[i]);
      const pos = task.id === "depth-rubber" ? d.xpos : d.site_xpos,
        mat = task.id === "depth-rubber" ? d.xmat : d.site_xmat,
        wrists = this.ids.map((i) => ({
          position: Array.from(pos.slice(3 * i, 3 * i + 3)),
          matrix: Array.from(mat.slice(9 * i, 9 * i + 9)),
        }));
      const ball = Array.from(d.qpos.slice(ballQ, ballQ + 3)),
        bv = Array.from(d.qvel.slice(ballV, ballV + 3));
      let values;
      if (task.id === "single") {
        this.samples.push({
          p: inverseRotate(rot, sub(ball, root)),
          t: d.time,
        });
        if (this.samples.length > 8) this.samples.shift();
        const newest = Math.max(0, this.samples.length - 2),
          s = this.samples.slice(Math.max(0, newest - 4), newest + 1),
          last = s.at(-1),
          tt = s.map((v) => v.t - last.t),
          mean = tt.reduce((a, b) => a + b, 0) / tt.length,
          den = tt.reduce((a, v) => a + (v - mean) ** 2, 0);
        const vel = [0, 1, 2].map((k) =>
            s.length < 5
              ? (s.length<2 ? 0 : (last.p[k]-s.at(-2).p[k])/0.02)
              : s.reduce(
                  (a, v, i) => a + (tt[i] - mean) * (v.p[k] - last.p[k]),
                  0,
                ) / den,
          ),
          hist = [2, 1, 0].flatMap(
            (age) => s[Math.max(0, s.length - 1 - age)].p,
          ),
          ee = inverseRotate(rot, sub(wrists[1].position, root)),
          eevel =
            this.previousEE && d.time > this.previousTime
              ? sub(ee, this.previousEE).map(
                  (v) => v / (d.time - this.previousTime),
                )
              : [0, 0, 0];
        this.previousEE = ee;
        this.previousTime = d.time;
        const T = globalThis.__mjswanThree,
          M = wrists[1].matrix;
        const wristQ = new T.Quaternion().setFromRotationMatrix(
          new T.Matrix4().set(
            M[0],
            M[1],
            M[2],
            0,
            M[3],
            M[4],
            M[5],
            0,
            M[6],
            M[7],
            M[8],
            0,
            0,
            0,
            0,
            1,
          ),
        );
        const rootQ = new T.Quaternion(
          d.qpos[4],
          d.qpos[5],
          d.qpos[6],
          d.qpos[3],
        ).invert();
        rootQ.multiply(wristQ);
        values = [
          ...omega,
          ...gravity,
          ...q.slice(12, 27).map((v, i) => v - cfg.defaults[12 + i]),
          ...dq.slice(12, 27),
          ...q.slice(27).map((v, i) => v - cfg.defaults[27 + i]),
          ...dq.slice(27),
          ...ee,
          rootQ.w,
          rootQ.x,
          rootQ.y,
          rootQ.z,
          0,
          0,
          ...eevel,
          ...hist,
          ...vel,
          0,
          0,
          0,
          0,
          cfg.ballMass,
          cfg.ballRadius,
          ...Array(25).fill(0),
          ...q.slice(0, 27),
          ...dq.slice(0, 27),
        ];
      } else {
        if (!this.depth)
          this.depth = new DepthCamera(context, cfg.camera, $("#depth-image"));
        const frame = this.depth.capture(d.time);
        ui.validFraction = frame.metadata[2];
        ui.imageAge = frame.metadata[0];
        if (task.id === "depth-dex") {
          const yaw = Math.atan2(rot[3], rot[0]);
          values = [
            ...omega,
            ...gravity,
            ...q.map((v, i) => v - cfg.defaults[i]),
            ...dq.map((v) => v * 0.05),
            root[0],
            root[1],
            Math.sin(yaw),
            Math.cos(yaw),
            ...frame.metadata,
          ];
        } else
          values = [
            ...q,
            ...dq,
            ...omega,
            ...gravity,
            ...wrists.flatMap((w) => [
              ...inverseRotate(rot, sub(w.position, root)),
              ...relativeRotation6d(rot, w.matrix),
            ]),
            ...frame.metadata,
            cfg.ballMass,
            cfg.ballRadius,
          ];
        const flat = new Float32Array(cfg.inputSize);
        flat.set(values);
        flat.set(frame.image, values.length);
        values = flat;
      }
      if (values.length !== cfg.inputSize || !values.every(Number.isFinite))
        throw Error("Invalid simulation input. Reset to try again.");
      const result=this.monitor.update(Number($("#level").value));
      Object.assign(ui,result);
      const touching=result.contacts;
      ui.time = d.time;
      ui.rootHeight = root[2];
      ui.frames++;
      ui.finiteObservation = true;
      if (ui.frames % 5 === 0) {
        $("#sim-time").textContent = d.time.toFixed(2);
        $("#ball-speed").textContent = norm(bv).toFixed(1);
        ["left", "right"].forEach((s, i) =>
          $("#" + s + "-contact").classList.toggle("touching", touching[i]),
        );
        if (task.depth)
          $("#image-age").textContent = `${Math.round(ui.imageAge * 1000)} ms`;
      }
      if (ui.hold >= 0.3) {
        phase("Holding");
        report("Hand contact is maintained as the ball settles.");
      }
      if (
        ui.started &&
        !ui.done &&
        (ui.success || ui.fall || ui.outside || (ui.released && ui.dropped) || d.time >= (task.id === "depth-dex" ? 12 : task.id === "single" ? 4 : 5))
      ) {
        ui.done = true;
        ui.running = false;
        queueMicrotask(() => {
          engine.pause();
          phase(
            ui.success ? "Success" : ui.fall ? "Off balance" : ui.outside ? "Out of bounds" : "Missed",
          );
          report(ui.success ? "Success — stable contact and the required hold completed." : "Reset or choose another throw to try again.");
          buttons();
        });
      }
      return values instanceof Float32Array
        ? values
        : Float32Array.from(values);
    }
  }
  function toggle() {
    if (!ui.ready) return;
    if (ui.running) {
      engine.pause();
      ui.running = false;
      phase("Paused");
    } else {
      if (ui.done) reset();
      ui.started = true;
      ui.running = true;
      if (line) line.visible = false;
      phase(ui.released ? "In flight" : "Getting ready");
      engine.play();
    }
    buttons();
  }
  $("#throw").onclick = toggle;
  $("#reset").onclick = () => reset();
  $("#sample").onclick = () => {
    reset(true);
    camera("overview");
  };
  $("#level").onchange = () => {
    reset(true);
    camera("overview");
  };
  $("#direction").onchange = () => {
    reset(true);
    camera("overview");
  };
  document
    .querySelectorAll("[data-camera]")
    .forEach((b) => (b.onclick = () => camera(b.dataset.camera)));
  $("#fullscreen").onclick = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await $(".stage").requestFullscreen();
    } catch {
      report("Fullscreen is unavailable in this browser.");
    }
  };
  for (const id of ["about-button", "credits-button"])
    $("#" + id).onclick = () => $("#about").showModal();
  $(".dialog-close").onclick = () => $("#about").close();
  document.addEventListener("keydown", (e) => {
    if (
      e.code === "Space" &&
      !/INPUT|SELECT|BUTTON|TEXTAREA/.test(e.target.tagName) &&
      !$("#about").open
    ) {
      e.preventDefault();
      toggle();
    }
    if (e.code === "Escape" && ui.running) toggle();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && ui.running) toggle();
  });
  try {
    [cfg, bank] = await Promise.all([
      fetchData("scene.json", true),
      fetchData("flights.json", true),
    ]);
    $("#level").innerHTML=bank.groups.map((g,i)=>`<option value="${i}">${g.label}</option>`).join('');
    $("label[for=level]").textContent=task.id==='depth-rubber'?'Catch reach':'Throw distribution';
    $("#parameters .control-hint").textContent='Throws and ball ranges match this task. Change them between attempts.';
    $(".release-note").textContent=task.id==='depth-rubber'?'Immediate release.':'The ball waits briefly before its release.';
    if(task.id==='depth-rubber')$("#parameters").insertAdjacentHTML('beforeend','<p class="region-legend"><span>▱ Cyan: base workspace</span><span>▱ Green: hand catch window</span></p>');
    ballPicker=ballControls($("#parameters"),bank,()=>reset());
    choose();
    const { createEngine } = await import(
      /* @vite-ignore */ base + "vendor/mjswan/mjswan.js"
    );
    engine = await createEngine($("#viewport"), { multithreaded: false });
    engine.subscribe((state) => {
      if (state.error && state.error !== lastError) {
        lastError = state.error;
        error(Error(state.error));
        engine.pause();
        ui.running = false;
        phase("Stopped");
        buttons();
      }
      if (state.loadingMessage)
        $("#loading-message").textContent = state.loadingMessage;
    });
    const [model, onnx] = await Promise.all([
      fetchData("scene.mjz"),
      fetchData(cfg.controller),
    ]);
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
              ...(cfg.stiffness ? {stiffness:cfg.stiffness,damping:cfg.damping} : {}),
            },
          },
        },
        plugins: { observations: { sensors: Observation } },
      },
      viewer: {
        lookat: [1, 0, 1],
        distance: 4.5,
        elevation: -15,
        azimuth: 140,
        fovy: 45,
        originType: "WORLD",
        enableShadows: true,
        enableReflections: false,
      },
    });
    engine.pause();
    engine.interaction.setMode("view");
    configureGymDisplay(engine);
    ui.ready = true;
    $("#loader").hidden = true;
    reset();
    camera("overview");
    if(new URLSearchParams(location.search).has("audit")) window.__catchEngine=engine;
    window.catchLab = {
      get state() {
        return { ...ui, task: task.id, level: Number($("#level").value) };
      },
      ...(new URLSearchParams(location.search).has("audit") ? {setCase(f) {flight=worldFlight(structuredClone(f));reset();ui.started=true;},get config(){return cfg;}} : {}),
      get observation() {
        return observer;
      },
    };
  } catch (e) {
    console.error(e);
    phase("Could not load");
    error(e);
    $("#loading-message").textContent = "The demo could not load";
  }
}
