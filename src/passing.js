import {SpotChallenge} from './spot-challenge.mjs';
import {RobotPool,receiverPlan} from './relay-game.mjs';
import {HOOP,HOOP_NORMAL,ManualShot,ShotScores,shootingLimits} from './shooting-game.mjs';
import {installScoreboard,addManualOverlay,mountManualControls} from './shooting-display.mjs';
import {snapshotCamera,restoreCamera,saveReloadCamera,takeReloadCamera} from './view-camera.mjs';
import { HoopScore } from "./hoop-score.mjs";
import { celebrate } from "./celebration.mjs";
import { makeHoop } from "./shooting-hoop.mjs";
import { rotateFreePose, descendingCrossing } from "./passing-geometry.mjs";
import { loadingStage } from "./loading.mjs";
import { BallStream, random, proprioNoise } from "./rally-observation.mjs";
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
import { disposeOverlay, measuredFlight, crossingLabel } from "./overlays.mjs";
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
    rally = task.id === "rally-rubber",
    shooting = task.skill === "shot";
  $(".panel-heading h2").textContent = shooting ? "Take the shot" : rally ? "Start a rally" : "Make the pass";
  let cfg, engine, context, observer, overlay, lastError;
  let celebrationCleanup, resetTimer, resetting=false, scoreboard, challenge;
  const scores=new ShotScores();
  const mode=()=>shooting ? $("#shoot-mode").value : null;
  const ui = {
    baskets: 0,
    ready: false,
    resetRequested: false,
    running: false,
    done: false,
    started: false,
    time: 0,
    catches: 0,
    attempt: 1,
    events: [],
  };
  $("#parameters").innerHTML =
    `<div class="slider-field"><label for="distance">${rally ? "Initial throw distance" : shooting ? "Shooting distance" : "Target distance"} <output id="distance-value">${shooting ? "3.00" : "1.50"} m</output></label><input id="distance" type="range" min=".8" max="${rally ? 1.8 : shooting ? 5.5 : 2.75}" step=".05" value="${shooting ? 3 : 1.5}"></div><div class="slider-field"><label for="yaw">${rally ? "Opening direction" : shooting ? "Shooting position" : "Target direction"} <output id="yaw-value">0°</output></label><input id="yaw" type="range" min="${rally ? -45 : shooting ? -60 : -90}" max="${rally ? 45 : shooting ? 60 : 90}" step="5" value="0"><div class="presets"><button type="button" data-direction="${rally ? 45 : 60}">Left</button><button type="button" data-direction="0">Center</button><button type="button" data-direction="${rally ? -45 : -60}">Right</button></div></div><p class="control-hint">Football · 22 cm diameter · 420 g. Settings apply to a new attempt.</p><p class="control-hint">${rally ? "Hold for 3 seconds, then pass back. Automatically restarts when horizontal robot spacing exceeds 2.75 m." : shooting ? "Physical rim and backboard · 2.0 m high. The ball must pass down through the hoop and fully below the rim." : "Turn toward the target, then physically throw with both hands. Pink ring: target window."}</p>`;
  if (shooting) {
    $("#parameters").insertAdjacentHTML("afterbegin", '<div class="slider-field camera-model-field"><label for="shoot-mode">Challenge</label><select id="shoot-mode"><option value="manual">Free carry &amp; shoot</option><option value="challenge">Spot Challenge · five shots</option><option value="shot">Shoot from a held ball</option><option value="journey">Catch → carry → shoot · GT (experimental)</option></select></div>');
    $(".panel-heading").insertAdjacentHTML("afterend",'<p class="eyebrow" id="basket-count">0 / 0 · —</p>');
    const params=new URLSearchParams(location.search),requested=params.get("mode");
    $("#shoot-mode").value=requested==="free"?"manual":["manual","challenge","shot","journey"].includes(requested)?requested:params.get("journey")==="1"?"journey":"manual";
  }
  if (rally) {
    $("#parameters").insertAdjacentHTML("beforeend", '<div class="slider-field camera-model-field"><label for="receive-side">Receiver target</label><select id="receive-side"><option value="center">Center</option><option value="left">Receiver’s left</option><option value="right">Receiver’s right</option><option value="alternate">Alternate left / center / right</option></select></div>');
    const side=new URLSearchParams(location.search).get("side");
    if (["left","center","right","alternate"].includes(side)) $("#receive-side").value=side;
  }
  $("#parameters").insertAdjacentHTML("beforeend",'<p class="region-legend">Cyan: measured flight · Pink: target center · Amber: crossing and center distance</p>');
  for (const key of ["distance","yaw"]) {
    const el=$("#"+key),raw=new URLSearchParams(location.search).get(key);
    if(raw!==null && Number.isFinite(Number(raw))) el.value=Math.min(Number(el.max),Math.max(Number(el.min),Number(raw)));
    $("#"+key+"-value").textContent=key==="distance"?Number(el.value).toFixed(2)+" m":el.value+"°";
  }
  document.querySelectorAll('[data-direction]').forEach(b=>b.onclick=()=>{
    $("#yaw").value=b.dataset.direction;$("#yaw").dispatchEvent(new Event('input'));
  });
  $(".release-note").textContent =
    "The ball starts in the hands. No synthetic launch is applied.";
  function refreshScores(){
    if(!shooting)return;const m=observer?.settings.mode || mode();
    $("#basket-count").textContent=`Made / Shots · ${scores.text(m)}`;
    ui.score={...scores.rows[m]};scoreboard?.userData.update(m,scores.rows[m]);
  }
  function constrainSettings(){
    if(!shooting)return;
    const [min,max]=shootingLimits(mode()),el=$("#distance");el.min=min;el.max=max;el.value=Math.max(min,Math.min(max,Number(el.value)));
    $("#distance-value").textContent=Number(el.value).toFixed(2)+" m";
    manualControls.el.hidden=!['manual','challenge'].includes(mode());
    manualControls.el.querySelector('[data-pass]').hidden=mode()!=='manual';
    manualControls.el.querySelector('.challenge-status').hidden=mode()!=='challenge';
    for(const id of ['distance','yaw'])$("#"+id).closest('.slider-field').hidden=mode()==='challenge';
  }
  async function manualConfirm(){
    if(!observer?.manual || !ui.ready || resetting || ui.done)return;
    if(observer.relay || observer.manual.stage.startsWith('pass_'))return;
    if(challenge && !challenge.inside(Array.from(context.mjData.qpos.slice(observer.robots[observer.holder].rootQ,observer.robots[observer.holder].rootQ+3)))){report('Walk into the marked circle first.');return;}
    const target=observer.manual.confirm(Number(context.mjData.time));
    if(target && challenge)challenge.committed=true;
    if(target){observer.modes[observer.holder]="pass";observer.age[observer.holder]=0;observer.legStart=Number(context.mjData.time);observer.beginPass(observer.holder,false,target);}
    if(!ui.running){ui.started=true;ui.running=true;engine.play();buttons();}
  }
  function passConfirm(){
    if(mode()!=='manual'||!observer?.manual||!ui.ready||resetting||ui.done||observer.relay)return;
    const m=observer.manual;
    if(m.passConfirm(Number(context.mjData.time))){
      if(!observer.receiverPreview?.valid){report('No safe receiving spot: try a longer distance, move/turn, or Esc to retry.');return;}
      observer.pendingReceiver=structuredClone(observer.receiverPreview);m.stage='pass_preparing';
    }
    if(!ui.running){ui.started=true;ui.running=true;engine.play();buttons();}
  }
  async function nextChallenge(){
    if(!challenge || challenge.complete)return;
    await reset(false,true);
    if(!new URLSearchParams(location.search).has('audit')){ui.started=true;ui.running=true;engine.play();buttons();}
  }
  function manualPress(key){
    if(!observer?.manual || !ui.ready || ui.done || resetting || observer.manual.stage!=="move")return;
    observer.manual.keys.add(key);
    if(!ui.running){ui.started=true;ui.running=true;engine.play();buttons();}
  }
  const manualControls=shooting?mountManualControls({
    confirm:manualConfirm,pass:passConfirm,cancel:()=>observer?.manual?.cancel(),reset:()=>reset(),
    press:manualPress,release:key=>observer?.manual?.keys.delete(key),
  }):null;
  if(shooting){constrainSettings();$("#shoot-mode").onchange=async()=>{observer?.manual?.clear();constrainSettings();await reset();};}
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
            : shooting ? ['manual','challenge'].includes(mode())?'Start moving':'Shoot ball' : "Pass ball";
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
    observer?.manual?.clear();
    if(observer?.manual){observer.manual.stage='result';ui.manual={...ui.manual,stage:'result',command:[0,0,0]};manualControls.update(observer.manual);}
    if(!challenge && observer?.manual && ["Ball dropped","Off balance","Pass missed","Timed out"].includes(reason) && !new URLSearchParams(location.search).has('audit')){
      clearTimeout(resetTimer);resetTimer=setTimeout(()=>reset(),800);
    }
    ui.reason = reason;
    if(challenge){challenge.finish(!!observer.attemptMade);ui.challenge=challenge.summary;
      if(challenge.complete){ui.reason=`Challenge complete · ${challenge.made}/5`;manualControls.el.querySelector('.challenge-status').textContent=`${challenge.made}/5 · ${challenge.elapsed.toFixed(1)} s · ${challenge.retries} retries`;}
      else if(!new URLSearchParams(location.search).has('audit')){clearTimeout(resetTimer);resetTimer=setTimeout(nextChallenge,1000);}
    }
    queueMicrotask(() => {
      engine.pause();
      phase(ui.reason);
      report(
        `${rally ? ui.catches + " stable catches · " + Math.floor(ui.catches / 2) + " round trips. " : ""}${ui.reason}. ${challenge&&!challenge.complete?"Next spot loading…":"Start a new attempt to reset."}`,
      );
      buttons();
    });
  }
  async function reset(freshScene = false, keepChallenge=false) {
    if(resetting)return;
    clearTimeout(resetTimer);observer?.manual?.clear();
    if(mode()==='challenge'){if(!keepChallenge||!challenge)challenge=new SpotChallenge(Number(new URLSearchParams(location.search).get('seed'))||Date.now());}
    else challenge=null;
    const view=ui.ready ? snapshotCamera(engine) : takeReloadCamera(task.id);
    // Rebuild the multi-robot runtime for a new episode. Skill swaps never use this.
    if (rally && ui.ready && freshScene !== true) {
      const url = new URL(location.href);
      url.searchParams.set("distance", $("#distance").value);
      url.searchParams.set("yaw", $("#yaw").value);
      url.searchParams.set("side", $("#receive-side").value);
      url.searchParams.delete("autostart");
      saveReloadCamera(engine,task.id);location.assign(url.href);
      return;
    }
    if (!engine) return;
    resetting=true;
    celebrationCleanup?.();
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
    ui.resetRequested = false;
    ui.attempt++;
    $("#attempt").textContent = String(ui.attempt).padStart(2, "0");
    await engine.runtime.resetSimulationState();
    $("#sim-time").textContent = "0.00";
    $("#ball-speed").textContent = "0.0";
    if(view)restoreCamera(engine,view);else camera("overview");
    resetting=false;
    phase("Ready");
    buttons();
    report("Ready. Adjust the settings and start.");
  }
  async function toggle() {
    if (!ui.ready) return;
    if (ui.running) {
      engine.pause();
      ui.running = false;
      observer?.manual?.clear();
    } else {
      if (ui.done) {
        await reset();
        if (rally) return;
      }
      if (!ui.started && observer && (observer.settings.distance !== Number($("#distance").value) || observer.settings.yaw !== Number($("#yaw").value) || (rally && observer.settings.side !== $("#receive-side").value) || (shooting && observer.settings.mode !== mode()))) {
        if (rally) {
          const url=new URL(location.href);url.searchParams.set("distance",$("#distance").value);url.searchParams.set("yaw",$("#yaw").value);url.searchParams.set("side",$("#receive-side").value);url.searchParams.set("autostart","1");saveReloadCamera(engine,task.id);location.assign(url);return;
        }
        await reset();
      }
      ui.started = true;
      ui.running = true;
      engine.play();
    }
    buttons();
  }
  function camera(view = "overview") {
    if (!engine || !observer) return;
    const roots = observer.robots.filter((_,i)=>!observer.pool||observer.pool.active[i]).map(c => Array.from(context.mjData.qpos.slice(c.rootQ, c.rootQ+3)));
    const root = Array.from(context.mjData.qpos.slice(observer.robots[observer.holder].rootQ,observer.robots[observer.holder].rootQ+3)), target = shooting?HOOP:observer.pass[observer.holder].target;
    const points = roots.flatMap(p => [[p[0]-.4,p[1]-.4,0],[p[0]+.4,p[1]+.4,1.65]]);
    points.push(observer.ball, [target[0]-.7,target[1]-.7,0], [target[0]+.7,target[1]+.7,shooting ? 2.65 : 1.9]);
    const low=[0,1,2].map(k=>Math.min(...points.map(p=>p[k]))), high=[0,1,2].map(k=>Math.max(...points.map(p=>p[k])));
    const center=low.map((x,k)=>(x+high[k])/2), radius=Math.hypot(...high.map((x,k)=>(x-low[k])/2));
    const aspect=$("#viewport").clientWidth/$("#viewport").clientHeight;
    const halfFov=Math.min(Math.PI/8,Math.atan(Math.tan(Math.PI/8)*aspect));
    const distance=Math.max(4,1.06*radius/Math.sin(halfFov));
    const views={
      overview:{lookat:center,distance,elevation:-15,azimuth:shooting?140:110,fovy:45},
      side:{lookat:center,distance,elevation:-8,azimuth:90,fovy:45},
      hands:{lookat:[root[0],root[1],root[2]+.3],distance:1.6,elevation:-10,azimuth:140,fovy:45},
    };
    engine.camera.setTracking(false);engine.camera.set(views[view]);
    document.querySelectorAll("[data-camera]").forEach(b=>b.classList.toggle("selected",b.dataset.camera===view));
  }
  function draw() {
    if (!observer || !context) return;
    disposeOverlay(overlay);
    const T = globalThis.__mjswanThree;
    overlay = new T.Group();
    overlay.name = "pass-overlays";
    const convert = (p) => new T.Vector3(p[0], p[2], -p[1]);
    const pts = observer.trail.slice(-500).map(convert);
    overlay.add(measuredFlight(pts));
    const s = observer.pass[observer.holder],
      n = s.normal,
      target = s.target,
      points = [];
    // Static hoop and scoreboard live outside the frequently rebuilt trail overlay.
    if(observer.manual){const c=observer.robots[observer.holder],root=Array.from(context.mjData.qpos.slice(c.rootQ,c.rootQ+3));addManualOverlay(T,overlay,observer.manual,root,challenge,observer.receiverPreview);}
    if(observer.longTask){
      const disk=new T.Mesh(new T.RingGeometry(.10,.13,48),new T.MeshBasicMaterial({color:0x21b8c8,side:T.DoubleSide,transparent:true,opacity:.8}));
      disk.rotation.x=-Math.PI/2;disk.position.set(observer.carryGoal[0],.012,-observer.carryGoal[1]);overlay.add(disk);
    }
    for (let i = 0; (!shooting || s.skill==='pass') && i <= 64; i++) {
      const a = (i * Math.PI) / 32;
      points.push(
        convert([
          target[0] - 0.2 * n[1] * Math.cos(a),
          target[1] + 0.2 * n[0] * Math.cos(a),
          target[2] + 0.2 * Math.sin(a),
        ]),
      );
    }
    if (!shooting || s.skill==='pass') overlay.add(
      new T.Mesh(
        new T.TubeGeometry(new T.CatmullRomCurve3(points),96,.006,6,false),
        new T.MeshBasicMaterial({ color: 0xff58b8 }),
      ),
    );
    const marker = new T.Mesh(
      new T.SphereGeometry(0.018, 10, 8),
      new T.MeshBasicMaterial({ color: 0xff56bb }),
    );
    marker.position.copy(convert(target));
    overlay.add(marker);
    if (s.crossing) {
      const center=convert(shooting && s.skill==='shot'?HOOP:target),point=convert(s.crossing);
      const mark=new T.Mesh(new T.SphereGeometry(.028,16,10),new T.MeshBasicMaterial({color:0xffca62,depthTest:false}));mark.position.copy(point);mark.renderOrder=19;overlay.add(mark);
      const segment=new T.Line(new T.BufferGeometry().setFromPoints([center,point]),new T.LineBasicMaterial({color:0xffca62,depthTest:false}));segment.name="crossing-error-segment";segment.renderOrder=19;overlay.add(segment);
      const labelPosition=center.clone().add(point).multiplyScalar(.5);labelPosition.y=Math.max(center.y,point.y)+.15;
      overlay.add(crossingLabel(`${(s.error*100).toFixed(1)} cm from center`,labelPosition));
    }
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
      this.longTask=shooting && $("#shoot-mode").value === "journey";
      this.manual=shooting && ['manual','challenge'].includes(mode()) ? new ManualShot():null;
      if(mode()==='challenge'&&!challenge)challenge=new SpotChallenge();
      this.attemptMade=false;this.challengeReady=0;this.pool?.restore();this.relay=null;this.pendingReceiver=null;this.receiverPreview=null;this.cameraPan=null;ui.passStreak=0;
      this.settings={mode:mode(),distance:Number($("#distance").value),yaw:Number($("#yaw").value),side:rally ? $("#receive-side").value : "center"};
      const { mjModel: m, mjData: d, mujoco: mj } = context;
      this.monitors?.forEach((x) => x.dispose());
      const bj = id("mjOBJ_JOINT", "ball/ball_freejoint");
      this.bq = m.jnt_qposadr[bj];
      this.bv = m.jnt_dofadr[bj];
      if (this.longTask) {
        d.qpos.set(cfg.catchInitialQpos);d.qvel.set(cfg.catchInitialQvel);
        // One launch at episode initialization. No ball state writes during skill transitions.
        d.qpos.set([1.8,0,1.0,1,0,0,0],this.bq);
        d.qvel.set([-2,0,3.265,0,0,0],this.bv);
      }
      if (rally) {
        const dx = Number($("#distance").value) - cfg.initialDistance;
        d.qpos[cfg.robots[1].rootQ] += dx;
        d.qpos[this.bq] += dx;
        const angle=-Number($("#yaw").value)*Math.PI/180;
        const pivot=Array.from(d.qpos.slice(this.bq,this.bq+3));
        rotateFreePose(d.qpos,d.qvel,cfg.robots[1].rootQ,cfg.robots[1].rootV,pivot,angle);
        rotateFreePose(d.qpos,d.qvel,this.bq,this.bv,pivot,angle);
      }
      if(shooting){
        const c=cfg.robots[0],root=Array.from(d.qpos.slice(c.rootQ,c.rootQ+3)),ball=Array.from(d.qpos.slice(this.bq,this.bq+3));
        const R=rotation(Array.from(d.qpos.slice(c.rootQ+3,c.rootQ+7))),yaw=Math.atan2(R[3],R[0]);
        const bearing=challenge?Math.atan2(HOOP[1]-challenge.spot.spawn[1],HOOP[0]-challenge.spot.spawn[0]):-this.settings.yaw*Math.PI/180;
        const angle=this.longTask?bearing:bearing-yaw;
        // Preserve the original local launch/hold configuration, including all velocities.
        const oldTarget=this.longTask?[root[0]+.4+this.settings.distance+.35,root[1],2]:[ball[0]+this.settings.distance*Math.cos(yaw),ball[1]+this.settings.distance*Math.sin(yaw),2];
        const co=Math.cos(angle),si=Math.sin(angle);
        const shift=[HOOP[0]-co*oldTarget[0]+si*oldTarget[1],HOOP[1]-si*oldTarget[0]-co*oldTarget[1]];
        const transform=p=>[co*p[0]-si*p[1]+shift[0],si*p[0]+co*p[1]+shift[1],p[2]];
        if(challenge){shift[0]=challenge.spot.spawn[0]-co*root[0]+si*root[1];shift[1]=challenge.spot.spawn[1]-si*root[0]-co*root[1];}
        this.carryGoal=transform([root[0]+.4,root[1],root[2]]);
        for(const [q,v] of [[c.rootQ,c.rootV],[this.bq,this.bv]]){rotateFreePose(d.qpos,d.qvel,q,v,[0,0,0],angle);d.qpos[q]+=shift[0];d.qpos[q+1]+=shift[1];}
        const j=m.body_mocapid[id("mjOBJ_BODY","hoop")];d.mocap_pos.set(HOOP,j*3);d.mocap_quat.set([1,0,0,0],j*4);
      }
      mj.mj_forward(m, d);
      if(shooting&&cfg.robots.length===2){this.pool=new RobotPool(context,cfg);this.pool.park(1);}
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
      this.contactFrames = this.robots.map(() => []);
      this.noisy = rally && !new URLSearchParams(location.search).has("clean");
      this.rng = this.robots.map((_, i) =>
        random(
          Number(new URLSearchParams(location.search).get("seed") || 81109) +
            i * 100003,
        ),
      );
      this.streams = this.rng.map((r) => new BallStream(r, this.noisy));
      this.proprioErrors = this.robots.map(() => Array(64).fill(0));
      this.noiseTime = null;
      this.samples = [];
      this.trail = [];
      this.ball = row(d.qpos, this.bq / 3);
      this.ball = Array.from(d.qpos.slice(this.bq, this.bq + 3));
      this.modes = rally ? ["wait", "pass"] : this.robots.map((_,i)=>i===0?(this.longTask ? "catch" : this.manual?"carry":"pass"):"wait");
      this.age = rally ? [0, 1] : this.robots.map(()=>1);
      this.pass = this.robots.map(() => ({}));
      this.holder = rally ? 1 : 0;
      this.lastTime = null;
      this.legStart = 0;
      this.returnStart = this.robots.map(() => cfg.ready.slice());
      this.results = [];
      this.hoopTarget = shooting?HOOP.slice():null;
      this.journeyStage = this.longTask ? "catch" : null;
      ui.journeyStage=this.journeyStage;
      $(".release-note").textContent=this.longTask ? "One physical ball: catch, carry, stop and shoot. Skill transitions preserve the scene." : this.manual ? "Move with the ball, stop and aim. The hoop stays fixed." : "The ball starts in the hands. No synthetic launch is applied.";
      this.carryCommand=[0,0,0];this.settleTime=0;
      if(this.longTask)ui.events.push({event:"journey_phase",phase:"catch",time:0});
      if(this.pool)this.robots.forEach((_,i)=>this.beginPass(i,true));else this.beginPass(this.holder,true);
      installGym(context);
      if(shooting){
        if(!context.scene.getObjectByName('shooting-hoop'))context.scene.add(makeHoop(globalThis.__mjswanThree,HOOP,HOOP_NORMAL));
        scoreboard=installScoreboard(context);refreshScores();
      }
      if(this.manual)manualControls.update(this.manual,challenge);
      draw();
    }
    beginPass(i, initial = false, manualTarget = null, skill = shooting?"shot":"pass") {
      this.trail = [];
      ui.crossing = null;
      const d = context.mjData,
        c = this.robots[i],
        root = Array.from(d.qpos.slice(c.rootQ, c.rootQ + 3)),
        R = rotation(Array.from(d.qpos.slice(c.rootQ + 3, c.rootQ + 7)));
      let target;
      if (rally) {
        const rc = this.robots[1 - i],
          rp = Array.from(d.qpos.slice(rc.rootQ, rc.rootQ + 3)),
          rr = rotation(Array.from(d.qpos.slice(rc.rootQ + 3, rc.rootQ + 7)));
        const side = this.settings.side;
        const lateral = side === "alternate" ? [.18,0,-.18][ui.catches % 3] : side === "left" ? .18 : side === "right" ? -.18 : 0;
        target = rp.map((v, k) => v + rotate(rr, [0.5, lateral, 0])[k]);
        target[2] = 1.05;
      } else {
        const a =
            Math.atan2(R[3], R[0]) + (Number($("#yaw").value) * Math.PI) / 180,
          dist = Number($("#distance").value);
        target = [
          this.ball[0] + dist * Math.cos(a),
          this.ball[1] + dist * Math.sin(a),
          shooting ? 2 : 1.05,
        ];
      }
      if(shooting){target=manualTarget || HOOP.slice();this.scorer=new HoopScore(HOOP,cfg.ballRadius);}
      const delta = sub(target, this.ball);
      delta[2] = 0;
      const len = norm(delta);
      this.pass[i] = {
        target,
        skill,
        normal: delta.map((v) => v / Math.max(len,1e-8)),
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
    captureContacts() {
      this.monitors.forEach((m, i) => {
        const { mjModel: model, mjData: d, mujoco: mj } = context;
        const hand = [false, false];
        let bad = false;
        const contacts = d.contact;
        for (let k = 0; k < d.ncon; k++) {
          const c = contacts.get(k);
          const g =
            c.geom1 === m.ballGeom
              ? c.geom2
              : c.geom2 === m.ballGeom
                ? c.geom1
                : -1;
          c.delete();
          if (g < 0) continue;
          const name = m.names[g];
          if (!name.startsWith(m.prefix + "/")) continue;
          mj.mj_contactForce(model, d, k, m.force);
          const force = Math.hypot(...m.force.GetView().slice(0, 3));
          const allowed = /(?:_rubber_.*|_wrist_yaw_link)_collision$/.test(
            name,
          );
          const side = name.includes("/left_")
            ? 0
            : name.includes("/right_")
              ? 1
              : -1;
          if (allowed && side >= 0 && force > 0.1) hand[side] = true;
          if (!allowed && force > 1) bad = true;
        }
        contacts.delete();
        this.contactFrames[i].push({ hand, bad });
        if (this.contactFrames[i].length > 8) this.contactFrames[i].shift();
      });
    }
    passContacts(i) {
      if (!rally) return this.results[i].contacts;
      // Native world: catcher hand sensor retains 4 substeps; passer retains 8.
      const frames = this.contactFrames[i].slice(-(rally && i === 0 ? 4 : 8));
      return frames.length
        ? [0, 1].map((k) => frames.some((f) => f.hand[k]))
        : this.results[i].contacts;
    }
    updateRelay(states,time,dt){
      if(!this.pool)return;
      const p=this.relay;
      if(p?.stage==='prepare'){
        const r=states[p.receiver];p.stable=Math.hypot(...r.rv.slice(0,2))<.15&&norm(r.omega)<.4?p.stable+dt:0;
        if(time-p.start>=1 && p.stable>=.5){
          p.stage='flight';p.start=time;this.manual.stage='pass_flight';this.modes[p.sender]='pass';this.age[p.sender]=0;this.legStart=time;
          this.beginPass(p.sender,false,p.plan.target,'pass');
        }else if(time-p.start>5){this.pool.park(p.receiver);this.relay=null;this.manual.stage='move';report('Receiver was not ready. Try another direction.');}
      }
      if(p?.stage==='flight'){
        const s=this.pass[p.sender],r=states[p.receiver];
        if(s.valid && this.results[p.receiver].hold>=3-1e-6 && norm(r.rv.slice(0,2))<.3 && norm(r.omega)<.6){
          this.holder=p.receiver;ui.catches++;ui.passStreak++;ui.events.push({event:'relay_handoff',robot:p.receiver,time,streak:ui.passStreak});
          this.modes[p.receiver]='carry';this.age[p.receiver]=0;this.modes[p.sender]='wait';
          this.manual=new ManualShot();this.carryCommand=[0,0,0];p.stage='fade';p.start=time;this.beginPass(p.receiver);
          this.cameraPan={start:time,previous:0,delta:sub(r.root,states[p.sender].root)};
        }
      }
      if(p?.stage==='fade'){
        this.pool.visible(p.sender,Math.max(0,1-(time-p.start)/.5));
        if(time-p.start>=.5){this.pool.park(p.sender);this.relay=null;this.receiverPreview=null;}
      }
      if(this.cameraPan&&engine){const pan=this.cameraPan,u=smooth(Math.min(1,time-pan.start)),view=snapshotCamera(engine);view.lookat=view.lookat.map((v,k)=>v+pan.delta[k]*(u-pan.previous));restoreCamera(engine,view);pan.previous=u;if(u>=1)this.cameraPan=null;}
      ui.relay=this.relay?{stage:this.relay.stage,receiver:this.relay.receiver}:null;ui.holder=this.holder;
    }
    updateJourney(states,time,dt) {
      if(!this.longTask || this.journeyStage==="shoot")return;
      const r=states[0];
      const change=(phase)=>{this.journeyStage=phase;this.settleTime=0;ui.events.push({event:"journey_phase",phase,time});};
      if(this.journeyStage==="catch" && this.results[0].hold>=1.5 && norm(r.rv.slice(0,2))<.3){
        ui.catches++;this.modes[0]="carry";this.age[0]=0;change("carry");
      }
      if(this.journeyStage==="carry"){
        const delta=sub(this.carryGoal,r.root);delta[2]=0;
        const local=inverseRotate(r.R,delta),length=Math.hypot(local[0],local[1]);
        const speed=Math.min(.35,length*1.2);
        this.carryCommand=[local[0]/Math.max(length,1e-8)*speed,local[1]/Math.max(length,1e-8)*speed,0];
        if(length<.06){this.carryCommand=[0,0,0];change("settle");}
      }
      if(this.journeyStage==="settle"){
        this.settleTime=norm(r.rv.slice(0,2))<.10 && norm(r.omega)<.3 ? this.settleTime+dt : 0;
        if(this.settleTime>.6){
          this.modes[0]="pass";this.age[0]=0;this.legStart=time;change("shoot");this.beginPass(0);
        }
      }
      ui.journeyStage=this.journeyStage;ui.carryGoal=this.carryGoal.slice();
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
      if(this.pendingReceiver){
        const plan=this.pendingReceiver;this.pendingReceiver=null;const receiver=1-this.holder;
        this.pool.activate(receiver,plan);this.monitors[receiver].reset();this.streams[receiver].reset?.();this.contactFrames[receiver]=[];
        this.modes[receiver]='wait';this.age[receiver]=0;
        this.relay={stage:'prepare',sender:this.holder,receiver,plan,start:time,stable:0};
        ui.events.push({event:'receiver_spawn',robot:receiver,time,plan});
      }
      this.ball = Array.from(d.qpos.slice(this.bq, this.bq + 3));
      const bv = Array.from(d.qvel.slice(this.bv, this.bv + 3));
      if (dt || this.samples.length === 0) {
        this.samples.push({ p: this.ball.slice(), t: time });
        if (this.samples.length > 5) this.samples.shift();

        this.streams.forEach((s) => s.update(this.ball));
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
      this.states=states;
      if (this.noiseTime !== time) {
        this.proprioErrors = states.map((r, i) =>
          this.noisy
            ? proprioNoise(this.rng[i], inverseRotate(r.R, [0, 0, -1]))
            : Array(64).fill(0),
        );
        this.noiseTime = time;
      }
      this.age = this.age.map((x) => x + dt);
      this.modes = this.modes.map((m, i) =>
        m === "return" && this.age[i] >= 0.87 ? "wait" : m,
      );
      this.updateJourney(states,time,dt);
      this.updateRelay(states,time,dt);
      if(this.manual){
        this.manual.update(states[this.holder],this.ball,time,dt);
        if(challenge){
          if(ui.started&&!ui.done)challenge.elapsed+=dt;
          if(!challenge.inside(states[this.holder].root)&&['settle','direction','height','power'].includes(this.manual.stage))this.manual.cancel();
          this.challengeReady=challenge.inside(states[this.holder].root)&&norm(states[this.holder].rv.slice(0,2))<.1&&norm(states[this.holder].omega)<.3?this.challengeReady+dt:0;
          this.manual.challengeReady=this.challengeReady>=.6;
          ui.challenge=challenge.summary;
        }
        if(this.manual.stage==='pass_distance')this.receiverPreview=receiverPlan(this.ball,this.manual.theta,this.manual.distance,this.manual.offset);
        else if(!this.relay)this.receiverPreview=null;this.carryCommand=this.manual.command.slice();
        ui.manual={stage:this.manual.stage,command:this.carryCommand.slice(),inside:this.manual.inside,theta:this.manual.theta,height:this.manual.height,distance:this.manual.distance,receiver:this.receiverPreview,hoopDistance:this.manual.hoopDistance,target:this.manual.target};
      }
      const h = this.holder,
        s = this.pass[h],
        r = states[h],
        hands = this.passContacts(h);
      const a =
          Math.atan2(s.target[1] - r.root[1], s.target[0] - r.root[0]) -
          Math.atan2(r.R[3], r.R[0]),
        heading = Math.atan2(Math.sin(a), Math.cos(a));
      if ((!this.longTask || this.journeyStage === "shoot") && (!this.manual || ["shoot","result","pass_flight"].includes(this.manual.stage))) {
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
        (rally || this.relay?.stage==='flight') &&
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
        s.releaseTime = time;
        s.valid =
          s.ready &&
          dot(s.releaseVelocity, s.normal) > 0.6 &&
          s.releaseVelocity[2] > -0.2 &&
          s.releasePosition[2] >= 0.65 &&
          s.releasePosition[2] <= 1.6 &&
          s.releaseHeading < Math.PI / 12 &&
          s.releaseSkew <= 0.06 + 1e-6;
        if(shooting && s.skill==='shot'){scores.release(this.settings.mode,s.valid);refreshScores();}
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
      if (dt && s.released && (!rally || this.results[1-h].hold < .1)) {
        if (!this.trail.length) this.trail.push(s.previous.slice());
        if (norm(sub(this.ball,this.trail.at(-1))) > .0001) this.trail.push(this.ball.slice());
      }
      const before = dot(sub(s.previous, s.target), s.normal),
        after = dot(sub(this.ball, s.target), s.normal);
      if ((!shooting || s.skill==='pass') && s.released && !s.crossed && before < 0 && after >= 0) {
        s.crossed = true;
        const u = -before / (after - before),
          p = s.previous.map((v, k) => v + u * (this.ball[k] - v));
        s.error = norm(sub(p, s.target));
        s.crossing = p.slice();
        ui.crossing = {point:p.slice(),center:s.target.slice(),normal:s.normal.slice(),distance:s.error,time};
        ui.events.push({event:"target_crossing",robot:h,...ui.crossing});
        draw();
        s.hit =
          s.valid &&
          !s.recontact &&
          !s.failed &&
          s.error < 0.2;
        s.hitAt = time;
      }
      if (shooting && s.skill==='shot' && s.released) {
        const cross=descendingCrossing(s.previous,this.ball,HOOP,bv[2]);
        if(cross && !s.hit && !s.failed){
          s.crossed=true;s.error=cross.error;s.crossing=cross.point;
          ui.crossing={point:cross.point,center:HOOP.slice(),normal:[0,0,1],distance:s.error,time};
          ui.events.push({event:"target_crossing",robot:h,...ui.crossing});
        }
        const scored=this.scorer.update(s.previous,this.ball,bv[2],s.valid && !s.failed && !s.recontact && !this.results[h].fall);
        if(scored && !s.hit){
          s.hit=true;s.hitAt=time;this.attemptMade=true;ui.baskets++;scores.basket(this.settings.mode);refreshScores();ui.events.push({event:"basket",time,exit:scored.point});
          celebrationCleanup?.();celebrationCleanup=celebrate($(".stage"),()=>context.scene.getObjectByName("shooting-hoop"),scores.rows[this.settings.mode].made);
        }
      }
      if (s.released && hands.some(Boolean)) s.recontact = true;
      const stance = norm(sub(r.root, s.origin).slice(0, 2));
      s.failed ||= shooting && s.skill==='shot'
        ? stance>.35 || (this.ball[2]<.12 && !s.hit) || (s.released && !s.hit && time-s.releaseTime>2.5)
        : stance > 0.35 || !!s.recontact || (s.crossed && !s.hit);
      if(s.failed && s.failedAt===undefined)s.failedAt=time;
      s.previous = this.ball.slice();
      }
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
          ...this.passContacts(i).map(Number),
          Number(!!s.ready),
          Number(!!s.released),
          (s.elapsed || 0) / 5,
        ];
        const mode = shooting && s.skill==='pass' && this.modes[i]==='pass'?5:{ pass: 0, catch: 1, return: 2, wait: 3, carry: 4 }[this.modes[i]],
          permission = !rally || ["wait", "catch"].includes(this.modes[1 - i]);
        if(this.modes[i]==="carry") ptask.splice(0,3,...this.carryCommand);
        return [
          ...r.q,
          ...r.dq,
          ...r.omega,
          ...inverseRotate(r.R, [0, 0, -1]),
          ...r.wrists,
          ...(rally
            ? this.streams[i].features(r.R, r.root)
            : [
                ...padded.flatMap((v) => inverseRotate(r.R, sub(v.p, r.root))),
                ...inverseRotate(r.R, vel),
                ...valid,
              ]),
          ...inverseRotate(r.R, sub(this.ball, r.root)),
          ...inverseRotate(r.R, sub(bv, r.rv)),
          cfg.ballMass,
          cfg.ballRadius,
          ...ptask,
          mode,
          (shooting && s.skill==='shot' ? 1 : smooth(this.age[i] / 0.5)) * Number(permission),
          smooth((this.age[i] - 0.12) / 0.75),
          ...this.returnStart[i],
          ...(rally ? this.proprioErrors[i] : []),
          ...(this.pool?[this.pool.resetMemory[i]]:[]),
        ];
      });
      if(this.pool)this.pool.resetMemory.fill(0);
      if (inputs.length !== cfg.inputSize || !inputs.every(Number.isFinite))
        throw Error("Invalid controller input");
      ui.time = time;
      ui.modes = this.modes.slice();
      ui.hold = this.results[rally ? 1 - this.holder : this.holder].hold;
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
            this.results[rally ? 1 - this.holder : this.holder].contacts[i],
          );
        if (!ui.done) {
          phase(
            this.manual ? ({move:"Move",settle:"Stopping",direction:"Aim · direction",height:"Aim · height",power:"Aim · power",shoot:"Shoot",result:"Complete",pass_settle:"Stopping to pass",pass_distance:"Choose pass distance",pass_preparing:"Receiver getting ready",pass_flight:"Pass in flight"}[this.manual.stage]) : this.longTask ? ({catch:"Catch the ball",carry:"Carry to shooting spot",settle:"Settle",shoot:"Shoot"}[this.journeyStage]) : rally
              ? `${ui.catches} catches · ${this.modes.join(" / ")}`
              : s.released
                ? "Released"
                : s.ready
                  ? "Pushing"
                  : "Aligning",
          );
          report(
            this.manual ? `WASD move · Q/E turn · Space aim/confirm${challenge?"":" · J pass"} · Esc cancel · R reset` : rally
              ? `${Math.floor(ui.catches / 2)} round trips · receiver hold ${ui.hold.toFixed(2)} / 3 s`
              : this.longTask ? `Catch, carry 0.4 m, stop and shoot · ${this.journeyStage}` : shooting ? "Aim for a clean descending shot through the hoop." : "Turn, push and release. Pink ring: target.",
          );
        }
        if(this.manual)manualControls.update(this.manual,challenge);
        draw();
      }
      if (ui.started && !ui.done) {
        ui.baseDistance=rally ? norm(sub(states[0].root,states[1].root).slice(0,2)) : null;
        if(rally && ui.baseDistance>2.75 && !ui.resetRequested){
          ui.resetRequested=true;
          ui.events.push({event:"spacing_reset",time,distance:ui.baseDistance});
          stop("Spacing limit · restarting");
          if(!new URLSearchParams(location.search).has("audit")) setTimeout(()=>{
            const url=new URL(location.href);url.searchParams.set("distance",$("#distance").value);url.searchParams.set("yaw",$("#yaw").value);url.searchParams.set("side",$("#receive-side").value);url.searchParams.set("autostart","1");url.searchParams.set("cycle",String(Number(url.searchParams.get("cycle")||0)+1));saveReloadCamera(engine,task.id);location.replace(url);
          },700);
        }
        else if (this.results.some((x,i) => (!this.pool || this.pool.active[i]) && x.fall)) stop("Off balance");
        else if (!rally && !this.relay && s.failed && (!shooting || time-s.failedAt>=1.5)) stop(shooting ? "Shot missed" : "Pass missed");
        else if (!rally && !this.relay && s.hit) {
          if (
            time - s.hitAt >= (shooting ? .9 : .3) &&
            (!shooting || !s.recontact) &&
            (shooting || norm(r.rv.slice(0, 2)) < 0.45) &&
            (shooting || norm(r.omega) < 0.8)
          ) {
            ui.success = true;
            stop("Success");
          }
        } else if (this.ball[2] < 0.13 && !(shooting && s.skill==='shot' && (s.hit || s.failed))) stop("Ball dropped");
        else if ((!this.manual || this.manual.stage==="shoot" || this.manual.stage==='pass_flight') && time - this.legStart > (this.longTask ? 30 : (rally || this.relay) ? 10 : 8)) stop("Timed out");
      }
      return Float32Array.from(inputs);
    }
  }
  try {
    const load = async (name, json = false) => {
      const res = await fetch(base + task.asset + "/" + name + "?v=20261110-physical", { cache: "no-cache" });
      if (!res.ok) throw Error("Could not load demo");
      return json ? res.json() : res.arrayBuffer();
    };
    loadingStage(1, "Loading task settings");
    cfg = await load("scene.json", true);
    loadingStage(2, "Downloading the robot and policy");
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
    loadingStage(3, "Preparing physics and policy");
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
        lookat: rally ? [0.9, 0, 0.9] : shooting ? [1.0, 0, 1.1] : [0.9, 0, 0.9],
        distance: rally ? 4.2 : shooting ? 4.7 : 4.2,
        elevation: -15,
        azimuth: shooting ? 140 : 110,
        fovy: 45,
        originType: "WORLD",
        enableShadows: true,
        enableReflections: false,
      },
    });
    engine.pause();
    engine.interaction.setMode("view");
    configureGymDisplay(engine);
    // mjswan calls registered contact readers after every MuJoCo substep.
    engine.runtime.contactSensors.readers.set("rally_history", {
      advance: () => observer?.captureContacts(),
      reset: () => {
        if (observer) observer.contactFrames = observer.robots.map(() => []);
      },
    });
    await reset();
    loadingStage(4, "Preparing the scene");
    ui.ready = true;
    $("#loader").hidden = true;
    buttons();
    phase("Ready");
    report("Ready. Start the simulation.");
    if(rally && new URLSearchParams(location.search).get("autostart")==="1") await toggle();
    $("#throw").onclick = toggle;
    $("#reset").onclick = reset;
    const editable=e=>['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)||e.target.isContentEditable;
    document.addEventListener('keydown',e=>{
      if(editable(e)||!ui.ready||document.querySelector('dialog[open]'))return;
      if(observer?.manual){
        if(['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE','Space','Escape','KeyR','KeyJ'].includes(e.code))e.preventDefault();
        if(e.repeat)return;
        if(e.code==='Space')manualConfirm();
        else if(e.code==='KeyJ')passConfirm();
        else if(e.code==='Escape')observer.manual.cancel();
        else if(e.code==='KeyR')reset();
        else if(['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE'].includes(e.code))manualPress(e.code);
      }else if(e.code==='Space'&&!e.repeat){e.preventDefault();toggle();}
    });
    document.addEventListener('keyup',e=>observer?.manual?.keys.delete(e.code));
    const clearInput=()=>observer?.manual?.clear();
    window.addEventListener('blur',clearInput);
    document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInput();if(ui.running){engine.pause();ui.running=false;buttons();}}});
    $("#fullscreen").onclick = () =>
      document.fullscreenElement
        ? document.exitFullscreen()
        : $(".stage").requestFullscreen();
    document.querySelectorAll("[data-camera]").forEach(b=>b.onclick=()=>camera(b.dataset.camera));

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
      ...(new URLSearchParams(location.search).has("audit")?{manualConfirm,passConfirm,nextChallenge, get challenge(){return challenge;}, get scores(){return scores.rows;}}:{}),
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
