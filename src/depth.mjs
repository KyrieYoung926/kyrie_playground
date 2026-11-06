// Actual scene depth, never ball coordinates or a simulator segmentation mask.
// One offscreen pass per policy tick; metric depth -> validity -> nearest resize.
export class DepthCamera {
  constructor(context, settings, canvas) {
    const T = globalThis.__mjswanThree;
    this.T = T;
    this.ctx = context;
    this.cfg = settings;
    this.w=settings.inputWidth;this.h=settings.inputHeight;this.n=this.w*this.h;
    if(canvas){canvas.width=this.w;canvas.height=this.h;}
    this.canvas = canvas;
    this.scene = new T.Scene();
    this.bodies = [];
    this.renderer = new T.WebGLRenderer({ antialias: false, alpha: false });
    this.renderer.setSize(settings.width, settings.height);
    this.renderer.setClearColor(0, 1);
    this.renderer.autoClear = true;
    this.target = new T.WebGLRenderTarget(settings.width, settings.height, {
      minFilter: T.NearestFilter,
      magFilter: T.NearestFilter,
      depthBuffer: true,
    });
    this.material = new T.ShaderMaterial({
      vertexShader:
        "varying float dist; void main(){vec4 p=modelViewMatrix*vec4(position,1.0);dist=-p.z;gl_Position=projectionMatrix*p;}",
      fragmentShader:
        "varying float dist; void main(){float d=floor(dist*1000.0+0.5);gl_FragColor=vec4(floor(d/256.0)/255.0,mod(d,256.0)/255.0,0.0,1.0);}",
      side: T.DoubleSide,
    });
    context.scene.traverse((obj) => {
      if (obj.bodyID === undefined || !obj.isGroup) return;
      const group = new T.Group();
      let count = 0;
      for (const child of obj.children) {
        if (!child.isMesh || child.userData.geomId === undefined) continue;
        const id = child.userData.geomId;
        if (
          context.mjModel.geom_group[id] > 2 ||
          context.mjModel.geom_rgba[4 * id + 3] === 0
        )
          continue;
        const mesh = new T.Mesh(child.geometry, this.material);
        mesh.userData.geomId=id;
        mesh.position.copy(child.position);
        mesh.quaternion.copy(child.quaternion);
        mesh.scale.copy(child.scale);
        if (child.userData.isGroundPlane) {
          if (count) continue;
          mesh.geometry = new T.PlaneGeometry(100, 100);
          mesh.rotation.set(-Math.PI / 2, 0, 0);
        }
        group.add(mesh);
        count++;
      }
      if (count) {
        this.scene.add(group);
        this.bodies.push([obj.bodyID, group]);
      }
    });
    this.camera = new T.PerspectiveCamera(
      settings.fovy,
      settings.width / settings.height,
      0.01,
      settings.maxDepth,
    );
    this.body = context.mujoco.mj_name2id(
      context.mjModel,
      context.mujoco.mjtObj.mjOBJ_BODY.value,
      settings.body,
    );
    this.bytes = new Uint8Array(settings.width * settings.height * 4);
    this.r = new T.Matrix4();
    this.pose = new T.Matrix4();
    this.mount = new T.Matrix4().compose(
      new T.Vector3(...settings.position),
      new T.Quaternion(
        settings.rotation[1],
        settings.rotation[2],
        settings.rotation[3],
        settings.rotation[0],
      ),
      new T.Vector3(1, 1, 1),
    );
    this.reset();
  }
  reset() {
    this.pending = null;
    this.delivered = new Float32Array((this.n*2));
    this.metadata = [1, 0, 0];
    this.lastTime = null;
    if (this.canvas) this.canvas.getContext("2d").clearRect(0, 0, this.w, this.h);
  }
  capture(time) {
    if (time === this.lastTime)
      return { image: this.delivered, metadata: this.metadata };
    const { mjData: d } = this.ctx,
      T = this.T,
      c = this.cfg;
    for (const [id, b] of this.bodies) {
      b.position.set(d.xpos[3 * id], d.xpos[3 * id + 2], -d.xpos[3 * id + 1]);
      b.quaternion.set(
        d.xquat[4 * id + 1],
        d.xquat[4 * id + 3],
        -d.xquat[4 * id + 2],
        d.xquat[4 * id],
      );
    }
    const i = this.body;
    this.pose
      .compose(
        new T.Vector3(...d.xpos.slice(3 * i, 3 * i + 3)),
        new T.Quaternion(
          d.xquat[4 * i + 1],
          d.xquat[4 * i + 2],
          d.xquat[4 * i + 3],
          d.xquat[4 * i],
        ),
        new T.Vector3(1, 1, 1),
      )
      .multiply(this.mount);
    // MuJoCo Z-up -> browser Y-up; camera axes remain x-right/y-up/-z-forward.
    this.r
      .set(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1)
      .multiply(this.pose);
    this.r.decompose(
      this.camera.position,
      this.camera.quaternion,
      this.camera.scale,
    );
    this.camera.updateMatrixWorld(true);
    this.renderer.setRenderTarget(this.target);
    this.renderer.render(this.scene, this.camera);
    this.renderer.readRenderTargetPixels(
      this.target,
      0,
      0,
      c.width,
      c.height,
      this.bytes,
    );
    const acquired = new Float32Array((this.n*2));
    let valid = 0;
    for (let y = 0; y < this.h; y++)
      for (let x = 0; x < this.w; x++) {
        const j =
          ((c.height - 1 - Math.floor((y * c.height) / this.h)) * c.width +
            Math.floor((x * c.width) / this.w)) *
          4;
        const z = (this.bytes[j] * 256 + this.bytes[j + 1]) / 1000,
          k = y * this.w + x;
        if (z >= c.minDepth && z <= c.maxDepth) {
          acquired[k] = c.initializeWithFirstFrame ? z : T.DataUtils.fromHalfFloat(T.DataUtils.toHalfFloat(z));
          acquired[this.n + k] = 1;
        }
      }
    if(!this.pending && c.initializeWithFirstFrame)this.pending={image:acquired,time:time-.02};
    if (this.pending) {
      this.delivered = this.pending.image;
      this.metadata = [Math.min(1, time - this.pending.time), 1, 0];
    } else this.metadata = [1, 0, 0];
    for (let k = this.n; k < (this.n*2); k++) valid += this.delivered[k];
    this.metadata[2] = valid / this.n;
    this.pending = { image: acquired, time };
    this.lastTime = time;
    if (this.canvas) {
      const ctx = this.canvas.getContext("2d"),
        pixels = ctx.createImageData(this.w, this.h);
      for (let k = 0; k < this.n; k++) {
        const v = this.delivered[k],
          a = k * 4;
        pixels.data[a] = v ? Math.max(20, 230 - v * 28) : 8;
        pixels.data[a + 1] = v ? Math.max(35, 225 - v * 17) : 15;
        pixels.data[a + 2] = v ? Math.min(240, 95 + v * 25) : 17;
        pixels.data[a + 3] = 255;
      }
      ctx.putImageData(pixels, 0, 0);
    }
    return { image: this.delivered, metadata: this.metadata };
  }
  dispose() {
    this.material.dispose();
    this.target.dispose();
    this.renderer.dispose();
  }
}
