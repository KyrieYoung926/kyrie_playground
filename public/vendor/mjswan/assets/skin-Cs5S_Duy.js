import { C as e, E as t, F as n, Ht as r, I as i, J as a, Mt as o, Nt as s, S as c, U as l, Ut as u, V as d, X as f, Y as p, Z as m, at as h, bt as g, ct as _, f as v, g as y, ht as b, it as ee, jt as te, lt as x, p as S, q as ne, s as re, st as C, t as ie, ut as ae, y as oe, z as se, zt as ce } from "./grounding-DCGUugSr.js";
//#region src/core/skin/springs.ts
var le = 1 / 60, w = 1 / 240, ue = .8 / w, de = .02, T = .01, fe = .002, pe = 2, me = .25, E = 1e3, D = (e) => String(Number(e.toPrecision(7))), O = (e) => `${D(e.x)} ${D(e.y)} ${D(e.z)}`, he = (e) => `${D(e.w)} ${D(e.x)} ${D(e.y)} ${D(e.z)}`;
function k(e) {
	return !!e && "shape" in e && "colliderMatrix" in e;
}
var ge = class e {
	constructor(e, t, n, r, i) {
		this.mujoco = e, this.model = t, this.data = n, this.anchors = r, this.links = i, this.position = new u(), this.quaternion = new g(), this.scale = new u(), this.target = new g(), this.turn = new g(), this.ball = new g(), this.spin = new u();
	}
	get jointCount() {
		return this.links.length;
	}
	static build(t, n, r) {
		let { xml: i, anchors: a, links: o } = e.describe(n, r);
		if (!o.length) return null;
		let s = t.MjModel.from_xml_string(i), c = new t.MjData(s), l = (e) => s.jnt_qposadr[s.body_jntadr[e]];
		return new e(t, s, c, a.map(({ node: e, body: t }) => ({
			node: e,
			body: t,
			qposAdr: l(t),
			dofAdr: s.jnt_dofadr[s.body_jntadr[t]],
			fromPos: new u(),
			fromQuat: new g(),
			toPos: new u(),
			toQuat: new g()
		})), o.map(({ bone: e, body: t }) => ({
			bone: e,
			qposAdr: l(t),
			rest: e.quaternion.clone()
		})));
	}
	static describe(t, n) {
		n.updateMatrixWorld(!0);
		let r = new _().copy(n.matrixWorld).invert(), i = (e) => {
			let t = new u(), n = new g();
			return new _().multiplyMatrices(r, e.matrixWorld).decompose(t, n, new u()), {
				pos: t,
				quat: n
			};
		}, a = (e, t) => e.localToWorld(t.clone()).applyMatrix4(r), o = /* @__PURE__ */ new Map();
		for (let e of t.joints) !k(e.bone) && !o.has(e.bone) && o.set(e.bone, e);
		let s = /* @__PURE__ */ new Map(), c = [], l = (e) => {
			let t = s.get(e);
			if (t) return t;
			let n = o.get(e);
			return t = {
				node: e,
				joint: n,
				children: [],
				geoms: [],
				...i(e)
			}, s.set(e, t), n && e.parent ? l(e.parent).children.push(t) : c.push(t), t;
		}, d = /* @__PURE__ */ new Map();
		for (let e of o.values()) for (let t of e.colliderGroups) d.has(t) || d.set(t, 1 << d.size % 30);
		let f = /* @__PURE__ */ new Map();
		for (let [e, t] of d) for (let n of e.colliders) f.set(n, (f.get(n) ?? 0) | t);
		let p = 0;
		for (let [t, n] of o) {
			let r = l(t);
			r.tail = a(t, n.initialLocalChildPosition).sub(r.pos).applyQuaternion(r.quat.clone().invert()), r.mass = de * Math.max(r.tail.length(), T), p = Math.max(p, e.gravityOf(n));
		}
		for (let [e, t] of f) {
			let n = e.parent, r = e.shape;
			if (!n || r.inside || r.type !== "sphere" && r.type !== "capsule") continue;
			let i = l(n), o = (e) => a(n, e).sub(i.pos).applyQuaternion(i.quat.clone().invert()), s = D(Math.max(r.radius ?? 0, fe)), c = o(r.offset ?? new u()), d = `contype="${t}" conaffinity="0"`;
			i.geoms.push(r.type === "sphere" ? `<geom type="sphere" pos="${O(c)}" size="${s}" ${d}/>` : `<geom type="capsule" fromto="${O(c)} ${O(o(r.tail ?? new u()))}" size="${s}" ${d}/>`);
		}
		let m = [], h = [], v = 1, y = (t, n) => {
			let r = v++, i = t.joint, a = t.pos, o = t.quat;
			if (n) {
				let e = n.quat.clone().invert();
				a = t.pos.clone().sub(n.pos).applyQuaternion(e), o = e.multiply(t.quat);
			}
			let s = [];
			i ? (h.push({
				bone: t.node,
				body: r
			}), s.push(...e.jointXml(t, i, d))) : (m.push({
				node: t.node,
				body: r
			}), s.push("<freejoint/>", `<inertial pos="0 0 0" mass="${E}" diaginertia="${E} ${E} ${E}"/>`)), s.push(...t.geoms);
			for (let e of t.children) s.push(y(e, t));
			let c = p > 0 ? ` gravcomp="${D(i ? 1 - e.gravityOf(i) / p : 1)}"` : "";
			return `<body pos="${O(a)}" quat="${he(o)}"${c}>\n${s.join("\n")}\n</body>`;
		}, b = c.map((e) => y(e, null)).join("\n"), ee = f.size > 0;
		return {
			xml: `<mujoco model="skin springs">
<option timestep="${D(w)}" gravity="0 ${D(-p)} 0" integrator="implicitfast" jacobian="sparse">
<flag filterparent="disable"${ee ? "" : " contact=\"disable\""}/>
</option>
<default><geom condim="1" solref="${D(2 * w)} 1" solimp="0.95 0.99 0.001"/></default>
<worldbody>
${b}
</worldbody>
</mujoco>`,
			anchors: m,
			links: h
		};
	}
	static gravityOf(e) {
		let t = Math.max(0, -e.settings.gravityDir.y);
		return e.settings.gravityPower * t / le;
	}
	static jointXml(t, n, r) {
		let i = t.tail, a = Math.max(i.length(), T), o = e.carriedInertia(t), s = me * o, c = o + s, l = Math.min(Math.sqrt(n.settings.stiffness / (le * a)), ue), u = Math.max(-Math.log(1 - Math.min(Math.max(n.settings.dragForce, 0), .95)) / le, pe), d = 0;
		for (let e of n.colliderGroups) d |= r.get(e) ?? 0;
		let f = t.mass, p = .1 * f * a * a;
		return [
			`<joint type="ball" stiffness="${D(c * l * l)}" damping="${D(c * u)}" armature="${D(s)}"/>`,
			`<inertial pos="${O(i)}" mass="${D(f)}" diaginertia="${D(p)} ${D(p)} ${D(p)}"/>`,
			`<geom type="sphere" pos="${O(i)}" size="${D(Math.max(n.settings.hitRadius, fe))}" contype="0" conaffinity="${d}"/>`
		];
	}
	static carriedInertia(e) {
		let t = e.pos, n = 0, r = (e) => {
			if (e.tail && e.mass) {
				let r = e.tail.clone().applyQuaternion(e.quat).add(e.pos), i = Math.max(e.tail.length(), T);
				n += e.mass * r.distanceToSquared(t) + .1 * e.mass * i * i;
			}
			for (let t of e.children) t.joint && r(t);
		};
		return r(e), Math.max(n, 1e-9);
	}
	reset() {
		this.mujoco.mj_resetData(this.model, this.data);
		let e = this.data.qpos;
		for (let t of this.anchors) this.readPose(t.node, t.toPos, t.toQuat), t.fromPos.copy(t.toPos), t.fromQuat.copy(t.toQuat), e.set([
			t.toPos.x,
			t.toPos.y,
			t.toPos.z
		], t.qposAdr), e.set([
			t.toQuat.w,
			t.toQuat.x,
			t.toQuat.y,
			t.toQuat.z
		], t.qposAdr + 3);
		this.writeBones();
	}
	step(e) {
		for (let e of this.anchors) this.readPose(e.node, e.toPos, e.toQuat);
		let t = Math.max(1, Math.ceil(e / w - 1e-6)), n = e / t;
		this.model.opt.timestep = n;
		for (let e = 1; e <= t; e++) {
			let r = e / t;
			for (let e of this.anchors) this.drive(e, r, n);
			this.mujoco.mj_step(this.model, this.data);
		}
		for (let e of this.anchors) e.fromPos.copy(e.toPos), e.fromQuat.copy(e.toQuat);
		this.writeBones();
	}
	drive(e, t, n) {
		let r = this.data.qpos, i = this.data.qvel, a = this.data.xfrc_applied, o = this.position.lerpVectors(e.fromPos, e.toPos, t), s = this.quaternion.set(r[e.qposAdr + 4], r[e.qposAdr + 5], r[e.qposAdr + 6], r[e.qposAdr + 3]), c = e.body * 6;
		for (let t = 0; t < 3; t++) {
			let s = (o.getComponent(t) - r[e.qposAdr + t]) / n;
			a[c + t] = E * (s - i[e.dofAdr + t]) / n;
		}
		this.target.slerpQuaternions(e.fromQuat, e.toQuat, t);
		let l = this.turn.copy(s).invert().multiply(this.target);
		l.w < 0 && l.set(-l.x, -l.y, -l.z, -l.w);
		let u = Math.hypot(l.x, l.y, l.z), d = 2 * Math.atan2(u, l.w), f = u > 1e-12 ? this.spin.set(l.x, l.y, l.z).multiplyScalar(d / u / n) : this.spin.set(0, 0, 0);
		f.set(E * (f.x - i[e.dofAdr + 3]) / n, E * (f.y - i[e.dofAdr + 4]) / n, E * (f.z - i[e.dofAdr + 5]) / n).applyQuaternion(s), a[c + 3] = f.x, a[c + 4] = f.y, a[c + 5] = f.z;
	}
	readPose(e, t, n) {
		e.matrixWorld.decompose(t, n, this.scale);
	}
	writeBones() {
		let e = this.data.qpos;
		for (let t of this.links) {
			let n = t.qposAdr;
			this.ball.set(e[n + 1], e[n + 2], e[n + 3], e[n]), t.bone.quaternion.copy(t.rest).multiply(this.ball), t.bone.updateMatrix();
		}
	}
	dispose() {
		this.data.delete(), this.model.delete();
	}
}, _e = new g().setFromAxisAngle(new u(0, 1, 0), Math.PI / 2);
function ve(e) {
	return e === "0" ? new g(0, 1, 0, 0) : new g();
}
function ye(e, t, n) {
	return n.set(e[t * 4 + 1], e[t * 4 + 3], -e[t * 4 + 2], e[t * 4]);
}
function be(e, t) {
	let n = [], r = new g();
	for (let i = 0; i < e.nbody; i++) {
		let a = new g();
		if (n.push(a), i === 0) continue;
		let o = e.body_jntadr[i];
		e.body_jntnum[i] > 0 && e.jnt_type[o] === t || a.copy(n[e.body_parentid[i]]).multiply(ye(e.body_quat, i, r));
	}
	return n;
}
function xe(e, t, n) {
	let r = [];
	for (let t = n; t > 0; t = e.body_parentid[t]) r.unshift(t);
	let i = new u(), a = new u();
	for (let n of r) {
		let r = e.body_pos;
		a.set(r[n * 3], r[n * 3 + 2], -r[n * 3 + 1]), i.add(a.applyQuaternion(t[e.body_parentid[n]]));
	}
	return i.y;
}
function Se(e, t, n, r) {
	let i = [...e].sort((e, t) => e.ancestors.length - t.ancestors.length), a = new Map(i.map((e, t) => [e.name, t]));
	return {
		facing: _e.clone(),
		frame: r.clone(),
		bones: i.map((e) => {
			let r = e.ancestors.find((e) => a.has(e)), i = n[e.name];
			return {
				name: e.name,
				bodyId: e.bodyId,
				parent: r === void 0 ? null : a.get(r),
				restInverse: t[e.bodyId].clone().invert(),
				offset: i ? new g(i[0], i[1], i[2], i[3]).normalize() : new g()
			};
		})
	};
}
var Ce = new g(), we = new g(), Te = new g(), Ee = new g();
function De(e, t, n, r) {
	Ce.copy(e.facing).invert(), we.copy(e.frame).invert(), e.bones.forEach((i, a) => {
		n[a].copy(t(i.bodyId)).multiply(i.restInverse).premultiply(Ce).multiply(e.facing).multiply(i.offset);
		let o = r[a].copy(n[a]);
		i.parent !== null && o.premultiply(Te.copy(n[i.parent]).invert()), o.premultiply(we).multiply(e.frame);
	});
}
function Oe(e, t, n, r, i) {
	return Ee.copy(e.facing).multiply(e.frame).invert(), i.set(t.x, r + (t.y - r) * n, t.z).applyQuaternion(Ee);
}
var A = new u(), j = new u(), M = new u(), N = new u(), ke = new u(), P = new u(), Ae = new u(), je = new u(), F = new u(), Me = new u(), Ne = new g(), Pe = new g(), Fe = new g(), Ie = new g(), Le = new g(), Re = new g(), ze = new g(), Be = new g(), Ve = 1e-4;
function He(e, t, n, r, i, a) {
	e.getWorldPosition(A), t.getWorldPosition(j), n.getWorldPosition(M), e.getWorldQuaternion(Ne), t.getWorldQuaternion(Pe), n.getWorldQuaternion(Fe);
	let o = A.distanceTo(j), s = j.distanceTo(M), c = h.clamp(A.distanceTo(r), Math.abs(o - s) + Ve, o + s - Ve);
	N.subVectors(M, A), ke.subVectors(j, A), P.subVectors(r, A);
	let l = (e) => h.clamp(e, -1, 1), u = N.angleTo(ke), d = Ae.subVectors(A, j).angleTo(je.subVectors(M, j)), f = Math.acos(l((s * s - o * o - c * c) / (-2 * o * c))), p = Math.acos(l((c * c - o * o - s * s) / (-2 * o * s)));
	F.crossVectors(N, ke), F.lengthSq() > 1e-12 ? i.copy(F.normalize()) : F.copy(i), Re.setFromAxisAngle(F, f - u), ze.setFromAxisAngle(F, p - d), Me.crossVectors(N, P), Me.lengthSq() > 1e-12 ? Be.setFromAxisAngle(Me.normalize(), N.angleTo(P)) : Be.identity(), Ne.premultiply(Re).premultiply(Be), Pe.premultiply(Re).premultiply(ze).premultiply(Be), e.parent.getWorldQuaternion(Ie), e.quaternion.copy(Ie.invert().multiply(Ne)), t.quaternion.copy(Le.copy(Ne).invert().multiply(Pe)), n.quaternion.copy(Pe.invert().multiply(a ?? Fe)), e.updateMatrixWorld(!0);
}
function Ue(e, t, n, r) {
	e.getWorldPosition(A), t.getWorldPosition(j), n.getWorldPosition(M);
	let i = A.distanceTo(j) + j.distanceTo(M) - Ve;
	P.subVectors(r, A);
	let a = P.lengthSq() - i * i, o = -P.y, s = o * o - a;
	return a <= 0 || s < 0 ? 0 : Math.max(0, o - Math.sqrt(s));
}
//#endregion
//#region node_modules/@pixiv/three-vrm/lib/three-vrm.module.js
var We = (e, t, n) => new Promise((r, i) => {
	var a = (e) => {
		try {
			s(n.next(e));
		} catch (e) {
			i(e);
		}
	}, o = (e) => {
		try {
			s(n.throw(e));
		} catch (e) {
			i(e);
		}
	}, s = (e) => e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
	s((n = n.apply(e, t)).next());
}), I = (e, t, n) => new Promise((r, i) => {
	var a = (e) => {
		try {
			s(n.next(e));
		} catch (e) {
			i(e);
		}
	}, o = (e) => {
		try {
			s(n.throw(e));
		} catch (e) {
			i(e);
		}
	}, s = (e) => e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
	s((n = n.apply(e, t)).next());
}), Ge = class extends b {
	constructor(e) {
		super(), this.weight = 0, this.isBinary = !1, this.overrideBlink = "none", this.overrideLookAt = "none", this.overrideMouth = "none", this._binds = [], this.name = `VRMExpression_${e}`, this.expressionName = e, this.type = "VRMExpression", this.visible = !1;
	}
	get binds() {
		return this._binds;
	}
	get overrideBlinkAmount() {
		return this.overrideBlink === "block" ? +(0 < this.outputWeight) : this.overrideBlink === "blend" ? this.outputWeight : 0;
	}
	get overrideLookAtAmount() {
		return this.overrideLookAt === "block" ? +(0 < this.outputWeight) : this.overrideLookAt === "blend" ? this.outputWeight : 0;
	}
	get overrideMouthAmount() {
		return this.overrideMouth === "block" ? +(0 < this.outputWeight) : this.overrideMouth === "blend" ? this.outputWeight : 0;
	}
	get outputWeight() {
		return this.isBinary ? +(this.weight > .5) : this.weight;
	}
	addBind(e) {
		this._binds.push(e);
	}
	deleteBind(e) {
		let t = this._binds.indexOf(e);
		t >= 0 && this._binds.splice(t, 1);
	}
	applyWeight(e) {
		let t = this.outputWeight;
		t *= e?.multiplier ?? 1, this.isBinary && t < 1 && (t = 0), this._binds.forEach((e) => e.applyWeight(t));
	}
	clearAppliedWeight() {
		this._binds.forEach((e) => e.clearAppliedWeight());
	}
};
function Ke(e, t, n) {
	let r = e.parser.json, i = r.nodes?.[t];
	if (i == null) return null;
	let a = i.mesh;
	if (a == null) return null;
	let o = r.meshes?.[a];
	if (o == null) return null;
	let s = o.primitives.length, c = [];
	return n.traverse((e) => {
		c.length < s && e.isMesh && c.push(e);
	}), c;
}
function qe(e, t) {
	return I(this, null, function* () {
		return Ke(e, t, yield e.parser.getDependency("node", t));
	});
}
function Je(e) {
	return I(this, null, function* () {
		let t = yield e.parser.getDependencies("node"), n = /* @__PURE__ */ new Map();
		return t.forEach((t, r) => {
			let i = Ke(e, r, t);
			i != null && n.set(r, i);
		}), n;
	});
}
var Ye = {
	Aa: "aa",
	Ih: "ih",
	Ou: "ou",
	Ee: "ee",
	Oh: "oh",
	Blink: "blink",
	Happy: "happy",
	Angry: "angry",
	Sad: "sad",
	Relaxed: "relaxed",
	LookUp: "lookUp",
	Surprised: "surprised",
	LookDown: "lookDown",
	LookLeft: "lookLeft",
	LookRight: "lookRight",
	BlinkLeft: "blinkLeft",
	BlinkRight: "blinkRight",
	Neutral: "neutral"
};
function Xe(e) {
	return Math.max(Math.min(e, 1), 0);
}
var Ze = class e {
	constructor() {
		this.blinkExpressionNames = [
			"blink",
			"blinkLeft",
			"blinkRight"
		], this.lookAtExpressionNames = [
			"lookLeft",
			"lookRight",
			"lookUp",
			"lookDown"
		], this.mouthExpressionNames = [
			"aa",
			"ee",
			"ih",
			"oh",
			"ou"
		], this._expressions = [], this._expressionMap = {};
	}
	get expressions() {
		return this._expressions.concat();
	}
	get expressionMap() {
		return Object.assign({}, this._expressionMap);
	}
	get presetExpressionMap() {
		let e = {}, t = new Set(Object.values(Ye));
		return Object.entries(this._expressionMap).forEach(([n, r]) => {
			t.has(n) && (e[n] = r);
		}), e;
	}
	get customExpressionMap() {
		let e = {}, t = new Set(Object.values(Ye));
		return Object.entries(this._expressionMap).forEach(([n, r]) => {
			t.has(n) || (e[n] = r);
		}), e;
	}
	copy(e) {
		return this._expressions.concat().forEach((e) => {
			this.unregisterExpression(e);
		}), e._expressions.forEach((e) => {
			this.registerExpression(e);
		}), this.blinkExpressionNames = e.blinkExpressionNames.concat(), this.lookAtExpressionNames = e.lookAtExpressionNames.concat(), this.mouthExpressionNames = e.mouthExpressionNames.concat(), this;
	}
	clone() {
		return new e().copy(this);
	}
	getExpression(e) {
		return this._expressionMap[e] ?? null;
	}
	registerExpression(e) {
		this._expressions.push(e), this._expressionMap[e.expressionName] = e;
	}
	unregisterExpression(e) {
		let t = this._expressions.indexOf(e);
		this._expressions.splice(t, 1), delete this._expressionMap[e.expressionName];
	}
	getValue(e) {
		return this.getExpression(e)?.weight ?? null;
	}
	setValue(e, t) {
		let n = this.getExpression(e);
		n && (n.weight = Xe(t));
	}
	resetValues() {
		this._expressions.forEach((e) => {
			e.weight = 0;
		});
	}
	getExpressionTrackName(e) {
		let t = this.getExpression(e);
		return t ? `${t.name}.weight` : null;
	}
	update() {
		let e = this._calculateWeightMultipliers();
		this._expressions.forEach((e) => {
			e.clearAppliedWeight();
		}), this._expressions.forEach((t) => {
			let n = 1, r = t.expressionName;
			this.blinkExpressionNames.indexOf(r) !== -1 && (n *= e.blink), this.lookAtExpressionNames.indexOf(r) !== -1 && (n *= e.lookAt), this.mouthExpressionNames.indexOf(r) !== -1 && (n *= e.mouth), t.applyWeight({ multiplier: n });
		});
	}
	_calculateWeightMultipliers() {
		let e = 1, t = 1, n = 1;
		return this._expressions.forEach((r) => {
			e -= r.overrideBlinkAmount, t -= r.overrideLookAtAmount, n -= r.overrideMouthAmount;
		}), e = Math.max(0, e), t = Math.max(0, t), n = Math.max(0, n), {
			blink: e,
			lookAt: t,
			mouth: n
		};
	}
}, Qe = {
	Color: "color",
	EmissionColor: "emissionColor",
	ShadeColor: "shadeColor",
	MatcapColor: "matcapColor",
	RimColor: "rimColor",
	OutlineColor: "outlineColor"
}, $e = {
	_Color: Qe.Color,
	_EmissionColor: Qe.EmissionColor,
	_ShadeColor: Qe.ShadeColor,
	_RimColor: Qe.RimColor,
	_OutlineColor: Qe.OutlineColor
}, et = new t(), tt = class e {
	constructor({ material: e, type: t, targetValue: n, targetAlpha: r }) {
		this.material = e, this.type = t, this.targetValue = n, this.targetAlpha = r ?? 1;
		let i = this._initColorBindState(), a = this._initAlphaBindState();
		this._state = {
			color: i,
			alpha: a
		};
	}
	applyWeight(e) {
		let { color: t, alpha: n } = this._state;
		if (t != null) {
			let { propertyName: n, deltaValue: r } = t;
			this.material[n]?.add(et.copy(r).multiplyScalar(e));
		}
		if (n != null) {
			let { propertyName: t, deltaValue: r } = n;
			this.material[t] != null && (this.material[t] += r * e);
		}
	}
	clearAppliedWeight() {
		let { color: e, alpha: t } = this._state;
		if (e != null) {
			let { propertyName: t, initialValue: n } = e;
			this.material[t]?.copy(n);
		}
		if (t != null) {
			let { propertyName: e, initialValue: n } = t;
			this.material[e] != null && (this.material[e] = n);
		}
	}
	_initColorBindState() {
		let { material: e, type: n, targetValue: r } = this, i = this._getPropertyNameMap()?.[n]?.[0] ?? null;
		if (i == null) return null;
		let a = e[i].clone();
		return {
			propertyName: i,
			initialValue: a,
			deltaValue: new t(r.r - a.r, r.g - a.g, r.b - a.b)
		};
	}
	_initAlphaBindState() {
		let { material: e, type: t, targetAlpha: n } = this, r = this._getPropertyNameMap()?.[t]?.[1] ?? null;
		if (r == null && n !== 1 || r == null) return null;
		let i = e[r];
		return {
			propertyName: r,
			initialValue: i,
			deltaValue: n - i
		};
	}
	_getPropertyNameMap() {
		return Object.entries(e._propertyNameMapMap).find(([e]) => this.material[e] === !0)?.[1] ?? null;
	}
};
tt._propertyNameMapMap = {
	isMeshStandardMaterial: {
		color: ["color", "opacity"],
		emissionColor: ["emissive", null]
	},
	isMeshBasicMaterial: { color: ["color", "opacity"] },
	isMToonMaterial: {
		color: ["color", "opacity"],
		emissionColor: ["emissive", null],
		outlineColor: ["outlineColorFactor", null],
		matcapColor: ["matcapFactor", null],
		rimColor: ["parametricRimColorFactor", null],
		shadeColor: ["shadeColorFactor", null]
	}
};
var nt = tt, rt = class {
	constructor({ primitives: e, index: t, weight: n }) {
		this.primitives = e, this.index = t, this.weight = n;
	}
	applyWeight(e) {
		this.primitives.forEach((t) => {
			t.morphTargetInfluences?.[this.index] != null && (t.morphTargetInfluences[this.index] += this.weight * e);
		});
	}
	clearAppliedWeight() {
		this.primitives.forEach((e) => {
			e.morphTargetInfluences?.[this.index] != null && (e.morphTargetInfluences[this.index] = 0);
		});
	}
}, it = new r(), at = class e {
	constructor({ material: t, scale: n, offset: r }) {
		this.material = t, this.scale = n, this.offset = r;
		let i = Object.entries(e._propertyNamesMap).find(([e]) => t[e] === !0)?.[1];
		i == null ? this._properties = [] : (this._properties = [], i.forEach((e) => {
			let i = t[e]?.clone();
			if (!i) return null;
			t[e] = i;
			let a = i.offset.clone(), o = i.repeat.clone(), s = r.clone().sub(a), c = n.clone().sub(o);
			this._properties.push({
				name: e,
				initialOffset: a,
				deltaOffset: s,
				initialScale: o,
				deltaScale: c
			});
		}));
	}
	applyWeight(e) {
		this._properties.forEach((t) => {
			let n = this.material[t.name];
			n !== void 0 && (n.offset.add(it.copy(t.deltaOffset).multiplyScalar(e)), n.repeat.add(it.copy(t.deltaScale).multiplyScalar(e)));
		});
	}
	clearAppliedWeight() {
		this._properties.forEach((e) => {
			let t = this.material[e.name];
			t !== void 0 && (t.offset.copy(e.initialOffset), t.repeat.copy(e.initialScale));
		});
	}
};
at._propertyNamesMap = {
	isMeshStandardMaterial: [
		"map",
		"emissiveMap",
		"bumpMap",
		"normalMap",
		"displacementMap",
		"roughnessMap",
		"metalnessMap",
		"alphaMap"
	],
	isMeshBasicMaterial: [
		"map",
		"specularMap",
		"alphaMap"
	],
	isMToonMaterial: [
		"map",
		"normalMap",
		"emissiveMap",
		"shadeMultiplyTexture",
		"rimMultiplyTexture",
		"outlineWidthMultiplyTexture",
		"uvAnimationMaskTexture"
	]
};
var ot = at, st = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]), ct = class e {
	get name() {
		return "VRMExpressionLoaderPlugin";
	}
	constructor(e) {
		this.parser = e;
	}
	afterRoot(e) {
		return I(this, null, function* () {
			e.userData.vrmExpressionManager = yield this._import(e);
		});
	}
	_import(e) {
		return I(this, null, function* () {
			return (yield this._v1Import(e)) || (yield this._v0Import(e)) || null;
		});
	}
	_v1Import(e) {
		return I(this, null, function* () {
			let n = this.parser.json;
			if (n.extensionsUsed?.indexOf("VRMC_vrm") === -1) return null;
			let i = n.extensions?.VRMC_vrm;
			if (!i) return null;
			let a = i.specVersion;
			if (!st.has(a)) return null;
			let o = i.expressions;
			if (!o) return null;
			let s = new Set(Object.values(Ye)), c = /* @__PURE__ */ new Map();
			o.preset != null && Object.entries(o.preset).forEach(([e, t]) => {
				t != null && s.has(e) && c.set(e, t);
			}), o.custom != null && Object.entries(o.custom).forEach(([e, t]) => {
				s.has(e) || c.set(e, t);
			});
			let l = new Ze();
			return yield Promise.all(Array.from(c.entries()).map((n) => I(this, [n], function* ([n, i]) {
				var a, o, s;
				let c = new Ge(n);
				if (e.scene.add(c), c.isBinary = i.isBinary ?? !1, c.overrideBlink = i.overrideBlink ?? "none", c.overrideLookAt = i.overrideLookAt ?? "none", c.overrideMouth = i.overrideMouth ?? "none", (a = i.morphTargetBinds) == null || a.forEach((t) => I(this, null, function* () {
					if (t.node === void 0 || t.index === void 0) return;
					let n = yield qe(e, t.node), r = t.index;
					n.every((e) => Array.isArray(e.morphTargetInfluences) && r < e.morphTargetInfluences.length) && c.addBind(new rt({
						primitives: n,
						index: r,
						weight: t.weight ?? 1
					}));
				})), i.materialColorBinds || i.textureTransformBinds) {
					let n = [];
					e.scene.traverse((e) => {
						let t = e.material;
						t && (Array.isArray(t) ? n.push(...t) : n.push(t));
					}), (o = i.materialColorBinds) == null || o.forEach((e) => I(this, null, function* () {
						n.filter((t) => {
							let n = this.parser.associations.get(t)?.materials;
							return e.material === n;
						}).forEach((n) => {
							c.addBind(new nt({
								material: n,
								type: e.type,
								targetValue: new t().fromArray(e.targetValue),
								targetAlpha: e.targetValue[3]
							}));
						});
					})), (s = i.textureTransformBinds) == null || s.forEach((e) => I(this, null, function* () {
						n.filter((t) => {
							let n = this.parser.associations.get(t)?.materials;
							return e.material === n;
						}).forEach((t) => {
							c.addBind(new ot({
								material: t,
								offset: new r().fromArray(e.offset ?? [0, 0]),
								scale: new r().fromArray(e.scale ?? [1, 1])
							}));
						});
					}));
				}
				l.registerExpression(c);
			}))), l;
		});
	}
	_v0Import(n) {
		return I(this, null, function* () {
			let i = this.parser.json, a = i.extensions?.VRM;
			if (!a) return null;
			let o = a.blendShapeMaster;
			if (!o) return null;
			let s = new Ze(), c = o.blendShapeGroups;
			if (!c) return s;
			let l = /* @__PURE__ */ new Set();
			return yield Promise.all(c.map((a) => I(this, null, function* () {
				let o = a.presetName, c = (o != null && e.v0v1PresetNameMap[o] || null) ?? a.name;
				if (c == null || l.has(c)) return;
				l.add(c);
				let u = new Ge(c);
				n.scene.add(u), u.isBinary = a.isBinary ?? !1, a.binds && a.binds.forEach((e) => I(this, null, function* () {
					var t;
					if (e.mesh === void 0 || e.index === void 0) return;
					let r = [];
					if ((t = i.nodes) == null || t.forEach((t, n) => {
						t.mesh === e.mesh && r.push(n);
					}), r.length === 0) return;
					let a = e.index;
					yield Promise.all(r.map((t) => I(this, null, function* () {
						let r = yield qe(n, t);
						r.every((e) => Array.isArray(e.morphTargetInfluences) && a < e.morphTargetInfluences.length) && u.addBind(new rt({
							primitives: r,
							index: a,
							weight: .01 * (e.weight ?? 100)
						}));
					})));
				}));
				let d = a.materialValues;
				d && d.length !== 0 && d.forEach((e) => {
					if (e.materialName === void 0 || e.propertyName === void 0 || e.targetValue === void 0) return;
					let i = [];
					n.scene.traverse((t) => {
						if (t.material) {
							let n = t.material;
							Array.isArray(n) ? i.push(...n.filter((t) => (t.name === e.materialName || t.name === e.materialName + " (Outline)") && i.indexOf(t) === -1)) : n.name === e.materialName && i.indexOf(n) === -1 && i.push(n);
						}
					});
					let a = e.propertyName;
					i.forEach((n) => {
						if (a === "_MainTex_ST") {
							let t = new r(e.targetValue[0], e.targetValue[1]), i = new r(e.targetValue[2], e.targetValue[3]);
							i.y = 1 - i.y - t.y, u.addBind(new ot({
								material: n,
								scale: t,
								offset: i
							}));
							return;
						}
						let i = $e[a];
						i && u.addBind(new nt({
							material: n,
							type: i,
							targetValue: new t().fromArray(e.targetValue),
							targetAlpha: e.targetValue[3]
						}));
					});
				}), s.registerExpression(u);
			}))), s;
		});
	}
};
ct.v0v1PresetNameMap = {
	a: "aa",
	e: "ee",
	i: "ih",
	o: "oh",
	u: "ou",
	blink: "blink",
	joy: "happy",
	angry: "angry",
	sorrow: "sad",
	fun: "relaxed",
	lookup: "lookUp",
	lookdown: "lookDown",
	lookleft: "lookLeft",
	lookright: "lookRight",
	blink_l: "blinkLeft",
	blink_r: "blinkRight",
	neutral: "neutral"
};
var lt = ct, ut = class e {
	constructor(t, n) {
		this._firstPersonOnlyLayer = e.DEFAULT_FIRSTPERSON_ONLY_LAYER, this._thirdPersonOnlyLayer = e.DEFAULT_THIRDPERSON_ONLY_LAYER, this._initializedLayers = !1, this.humanoid = t, this.meshAnnotations = n;
	}
	copy(e) {
		if (this.humanoid !== e.humanoid) throw Error("VRMFirstPerson: humanoid must be same in order to copy");
		return this.meshAnnotations = e.meshAnnotations.map((e) => ({
			meshes: e.meshes.concat(),
			type: e.type
		})), this;
	}
	clone() {
		return new e(this.humanoid, this.meshAnnotations).copy(this);
	}
	get firstPersonOnlyLayer() {
		return this._firstPersonOnlyLayer;
	}
	get thirdPersonOnlyLayer() {
		return this._thirdPersonOnlyLayer;
	}
	setup({ firstPersonOnlyLayer: t = e.DEFAULT_FIRSTPERSON_ONLY_LAYER, thirdPersonOnlyLayer: n = e.DEFAULT_THIRDPERSON_ONLY_LAYER } = {}) {
		this._initializedLayers ||= (this._firstPersonOnlyLayer = t, this._thirdPersonOnlyLayer = n, this.meshAnnotations.forEach((e) => {
			e.meshes.forEach((t) => {
				e.type === "firstPersonOnly" ? (t.layers.set(this._firstPersonOnlyLayer), t.traverse((e) => e.layers.set(this._firstPersonOnlyLayer))) : e.type === "thirdPersonOnly" ? (t.layers.set(this._thirdPersonOnlyLayer), t.traverse((e) => e.layers.set(this._thirdPersonOnlyLayer))) : e.type === "auto" && this._createHeadlessModel(t);
			});
		}), !0);
	}
	_excludeTriangles(e, t, n, r) {
		let i = 0;
		if (t != null && t.length > 0) for (let a = 0; a < e.length; a += 3) {
			let o = e[a], s = e[a + 1], c = e[a + 2], l = t[o], u = n[o];
			if (l[0] > 0 && r.includes(u[0]) || l[1] > 0 && r.includes(u[1]) || l[2] > 0 && r.includes(u[2]) || l[3] > 0 && r.includes(u[3])) continue;
			let d = t[s], f = n[s];
			if (d[0] > 0 && r.includes(f[0]) || d[1] > 0 && r.includes(f[1]) || d[2] > 0 && r.includes(f[2]) || d[3] > 0 && r.includes(f[3])) continue;
			let p = t[c], m = n[c];
			p[0] > 0 && r.includes(m[0]) || p[1] > 0 && r.includes(m[1]) || p[2] > 0 && r.includes(m[2]) || p[3] > 0 && r.includes(m[3]) || (e[i++] = o, e[i++] = s, e[i++] = c);
		}
		return i;
	}
	_createErasedMesh(e, t) {
		let n = new s(e.geometry.clone(), e.material);
		n.name = `${e.name}(erase)`, n.frustumCulled = e.frustumCulled, n.layers.set(this._firstPersonOnlyLayer);
		let r = n.geometry, i = r.getAttribute("skinIndex"), a = i instanceof se ? [] : i.array, c = [];
		for (let e = 0; e < a.length; e += 4) c.push([
			a[e],
			a[e + 1],
			a[e + 2],
			a[e + 3]
		]);
		let l = r.getAttribute("skinWeight"), u = l instanceof se ? [] : l.array, d = [];
		for (let e = 0; e < u.length; e += 4) d.push([
			u[e],
			u[e + 1],
			u[e + 2],
			u[e + 3]
		]);
		let f = r.getIndex();
		if (!f) throw Error("The geometry doesn't have an index buffer");
		let p = Array.from(f.array), m = this._excludeTriangles(p, d, c, t), h = [];
		for (let e = 0; e < m; e++) h[e] = p[e];
		return r.setIndex(h), e.onBeforeRender && (n.onBeforeRender = e.onBeforeRender), n.bind(new o(e.skeleton.bones, e.skeleton.boneInverses), new _()), n;
	}
	_createHeadlessModelForSkinnedMesh(e, t) {
		let n = [];
		if (t.skeleton.bones.forEach((e, t) => {
			this._isEraseTarget(e) && n.push(t);
		}), !n.length) {
			t.layers.enable(this._thirdPersonOnlyLayer), t.layers.enable(this._firstPersonOnlyLayer);
			return;
		}
		t.layers.set(this._thirdPersonOnlyLayer);
		let r = this._createErasedMesh(t, n);
		e.add(r);
	}
	_createHeadlessModel(e) {
		if (e.type === "Group") {
			if (e.layers.set(this._thirdPersonOnlyLayer), this._isEraseTarget(e)) e.traverse((e) => e.layers.set(this._thirdPersonOnlyLayer));
			else {
				let t = new d();
				t.name = `_headless_${e.name}`, t.layers.set(this._firstPersonOnlyLayer), e.parent.add(t), e.children.filter((e) => e.type === "SkinnedMesh").forEach((e) => {
					let n = e;
					this._createHeadlessModelForSkinnedMesh(t, n);
				});
			}
		} else if (e.type === "SkinnedMesh") {
			let t = e;
			this._createHeadlessModelForSkinnedMesh(e.parent, t);
		} else this._isEraseTarget(e) && (e.layers.set(this._thirdPersonOnlyLayer), e.traverse((e) => e.layers.set(this._thirdPersonOnlyLayer)));
	}
	_isEraseTarget(e) {
		return e === this.humanoid.getRawBoneNode("head") ? !0 : e.parent ? this._isEraseTarget(e.parent) : !1;
	}
};
ut.DEFAULT_FIRSTPERSON_ONLY_LAYER = 9, ut.DEFAULT_THIRDPERSON_ONLY_LAYER = 10;
var dt = ut, ft = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]), pt = class {
	get name() {
		return "VRMFirstPersonLoaderPlugin";
	}
	constructor(e) {
		this.parser = e;
	}
	afterRoot(e) {
		return I(this, null, function* () {
			let t = e.userData.vrmHumanoid;
			if (t !== null) {
				if (t === void 0) throw Error("VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");
				e.userData.vrmFirstPerson = yield this._import(e, t);
			}
		});
	}
	_import(e, t) {
		return I(this, null, function* () {
			return t == null ? null : (yield this._v1Import(e, t)) || (yield this._v0Import(e, t)) || null;
		});
	}
	_v1Import(e, t) {
		return I(this, null, function* () {
			let n = this.parser.json;
			if (n.extensionsUsed?.indexOf("VRMC_vrm") === -1) return null;
			let r = n.extensions?.VRMC_vrm;
			if (!r) return null;
			let i = r.specVersion;
			if (!ft.has(i)) return null;
			let a = r.firstPerson, o = [], s = yield Je(e);
			return Array.from(s.entries()).forEach(([e, t]) => {
				let n = (a?.meshAnnotations)?.find((t) => t.node === e);
				o.push({
					meshes: t,
					type: n?.type ?? "auto"
				});
			}), new dt(t, o);
		});
	}
	_v0Import(e, t) {
		return I(this, null, function* () {
			let n = this.parser.json, r = n.extensions?.VRM;
			if (!r) return null;
			let i = r.firstPerson;
			if (!i) return null;
			let a = [], o = yield Je(e);
			return Array.from(o.entries()).forEach(([e, t]) => {
				let r = n.nodes[e], o = i.meshAnnotations ? i.meshAnnotations.find((e) => e.mesh === r.mesh) : void 0;
				a.push({
					meshes: t,
					type: this._convertV0FlagToV1Type(o?.firstPersonFlag)
				});
			}), new dt(t, a);
		});
	}
	_convertV0FlagToV1Type(e) {
		return e === "FirstPersonOnly" ? "firstPersonOnly" : e === "ThirdPersonOnly" ? "thirdPersonOnly" : e === "Both" ? "both" : "auto";
	}
}, mt = new u(), ht = new u(), gt = new g(), _t = class extends d {
	constructor(e) {
		super(), this.vrmHumanoid = e, this._boneAxesMap = /* @__PURE__ */ new Map(), Object.values(e.humanBones).forEach((e) => {
			let t = new oe(1);
			t.matrixAutoUpdate = !1, t.material.depthTest = !1, t.material.depthWrite = !1, this.add(t), this._boneAxesMap.set(e, t);
		});
	}
	dispose() {
		Array.from(this._boneAxesMap.values()).forEach((e) => {
			e.geometry.dispose(), e.material.dispose();
		});
	}
	updateMatrixWorld(e) {
		Array.from(this._boneAxesMap.entries()).forEach(([e, t]) => {
			e.node.updateWorldMatrix(!0, !1), e.node.matrixWorld.decompose(mt, gt, ht);
			let n = mt.set(.1, .1, .1).divide(ht);
			t.matrix.copy(e.node.matrixWorld).scale(n);
		}), super.updateMatrixWorld(e);
	}
}, vt = /* @__PURE__ */ "hips.spine.chest.upperChest.neck.head.leftEye.rightEye.jaw.leftUpperLeg.leftLowerLeg.leftFoot.leftToes.rightUpperLeg.rightLowerLeg.rightFoot.rightToes.leftShoulder.leftUpperArm.leftLowerArm.leftHand.rightShoulder.rightUpperArm.rightLowerArm.rightHand.leftThumbMetacarpal.leftThumbProximal.leftThumbDistal.leftIndexProximal.leftIndexIntermediate.leftIndexDistal.leftMiddleProximal.leftMiddleIntermediate.leftMiddleDistal.leftRingProximal.leftRingIntermediate.leftRingDistal.leftLittleProximal.leftLittleIntermediate.leftLittleDistal.rightThumbMetacarpal.rightThumbProximal.rightThumbDistal.rightIndexProximal.rightIndexIntermediate.rightIndexDistal.rightMiddleProximal.rightMiddleIntermediate.rightMiddleDistal.rightRingProximal.rightRingIntermediate.rightRingDistal.rightLittleProximal.rightLittleIntermediate.rightLittleDistal".split("."), yt = {
	hips: null,
	spine: "hips",
	chest: "spine",
	upperChest: "chest",
	neck: "upperChest",
	head: "neck",
	leftEye: "head",
	rightEye: "head",
	jaw: "head",
	leftUpperLeg: "hips",
	leftLowerLeg: "leftUpperLeg",
	leftFoot: "leftLowerLeg",
	leftToes: "leftFoot",
	rightUpperLeg: "hips",
	rightLowerLeg: "rightUpperLeg",
	rightFoot: "rightLowerLeg",
	rightToes: "rightFoot",
	leftShoulder: "upperChest",
	leftUpperArm: "leftShoulder",
	leftLowerArm: "leftUpperArm",
	leftHand: "leftLowerArm",
	rightShoulder: "upperChest",
	rightUpperArm: "rightShoulder",
	rightLowerArm: "rightUpperArm",
	rightHand: "rightLowerArm",
	leftThumbMetacarpal: "leftHand",
	leftThumbProximal: "leftThumbMetacarpal",
	leftThumbDistal: "leftThumbProximal",
	leftIndexProximal: "leftHand",
	leftIndexIntermediate: "leftIndexProximal",
	leftIndexDistal: "leftIndexIntermediate",
	leftMiddleProximal: "leftHand",
	leftMiddleIntermediate: "leftMiddleProximal",
	leftMiddleDistal: "leftMiddleIntermediate",
	leftRingProximal: "leftHand",
	leftRingIntermediate: "leftRingProximal",
	leftRingDistal: "leftRingIntermediate",
	leftLittleProximal: "leftHand",
	leftLittleIntermediate: "leftLittleProximal",
	leftLittleDistal: "leftLittleIntermediate",
	rightThumbMetacarpal: "rightHand",
	rightThumbProximal: "rightThumbMetacarpal",
	rightThumbDistal: "rightThumbProximal",
	rightIndexProximal: "rightHand",
	rightIndexIntermediate: "rightIndexProximal",
	rightIndexDistal: "rightIndexIntermediate",
	rightMiddleProximal: "rightHand",
	rightMiddleIntermediate: "rightMiddleProximal",
	rightMiddleDistal: "rightMiddleIntermediate",
	rightRingProximal: "rightHand",
	rightRingIntermediate: "rightRingProximal",
	rightRingDistal: "rightRingIntermediate",
	rightLittleProximal: "rightHand",
	rightLittleIntermediate: "rightLittleProximal",
	rightLittleDistal: "rightLittleIntermediate"
};
function bt(e) {
	return e.invert ? e.invert() : e.inverse(), e;
}
var L = new u(), R = new g(), xt = class {
	constructor(e) {
		this.humanBones = e, this.restPose = this.getAbsolutePose();
	}
	getAbsolutePose() {
		let e = {};
		return Object.keys(this.humanBones).forEach((t) => {
			let n = t, r = this.getBoneNode(n);
			r && (L.copy(r.position), R.copy(r.quaternion), e[n] = {
				position: L.toArray(),
				rotation: R.toArray()
			});
		}), e;
	}
	getPose() {
		let e = {};
		return Object.keys(this.humanBones).forEach((t) => {
			let n = t, r = this.getBoneNode(n);
			if (!r) return;
			L.set(0, 0, 0), R.identity();
			let i = this.restPose[n];
			i?.position && L.fromArray(i.position).negate(), i?.rotation && bt(R.fromArray(i.rotation)), L.add(r.position), R.premultiply(r.quaternion), e[n] = {
				position: L.toArray(),
				rotation: R.toArray()
			};
		}), e;
	}
	setPose(e) {
		Object.entries(e).forEach(([e, t]) => {
			let n = e, r = this.getBoneNode(n);
			if (!r) return;
			let i = this.restPose[n];
			i && (t?.position && (r.position.fromArray(t.position), i.position && r.position.add(L.fromArray(i.position))), t?.rotation && (r.quaternion.fromArray(t.rotation), i.rotation && r.quaternion.multiply(R.fromArray(i.rotation))));
		});
	}
	resetPose() {
		Object.entries(this.restPose).forEach(([e, t]) => {
			let n = this.getBoneNode(e);
			n && (t?.position && n.position.fromArray(t.position), t?.rotation && n.quaternion.fromArray(t.rotation));
		});
	}
	getBone(e) {
		return this.humanBones[e] ?? void 0;
	}
	getBoneNode(e) {
		return this.humanBones[e]?.node ?? null;
	}
}, St = new u(), Ct = new g(), wt = new u(), Tt = class e extends xt {
	static _setupTransforms(e) {
		let t = new b();
		t.name = "VRMHumanoidRig";
		let n = {}, r = {}, i = {}, a = {};
		vt.forEach((t) => {
			var o;
			let s = e.getBoneNode(t);
			if (s) {
				let e = new u(), c = new g();
				s.updateWorldMatrix(!0, !1), s.matrixWorld.decompose(e, c, St), n[t] = e, r[t] = c, i[t] = s.quaternion.clone();
				let l = new g();
				(o = s.parent) == null || o.matrixWorld.decompose(St, l, St), a[t] = l;
			}
		});
		let o = {};
		return vt.forEach((r) => {
			let i = e.getBoneNode(r);
			if (i) {
				let e = n[r], a = r, s;
				for (; s == null && (a = yt[a], a != null);) s = n[a];
				let c = new b();
				c.name = "Normalized_" + i.name, (a ? o[a]?.node : t).add(c), c.position.copy(e), s && c.position.sub(s), o[r] = { node: c };
			}
		}), {
			rigBones: o,
			root: t,
			parentWorldRotations: a,
			boneRotations: i
		};
	}
	constructor(t) {
		let { rigBones: n, root: r, parentWorldRotations: i, boneRotations: a } = e._setupTransforms(t);
		super(n), this.original = t, this.root = r, this._parentWorldRotations = i, this._boneRotations = a;
	}
	update() {
		vt.forEach((e) => {
			let t = this.original.getBoneNode(e);
			if (t != null) {
				let n = this.getBoneNode(e), r = this._parentWorldRotations[e], i = Ct.copy(r).invert(), a = this._boneRotations[e];
				if (t.quaternion.copy(n.quaternion).multiply(r).premultiply(i).multiply(a), e === "hips") {
					let e = n.getWorldPosition(wt);
					t.parent.updateWorldMatrix(!0, !1);
					let r = t.parent.matrixWorld, i = e.applyMatrix4(r.invert());
					t.position.copy(i);
				}
			}
		});
	}
}, Et = class e {
	get restPose() {
		return this.rawRestPose;
	}
	get rawRestPose() {
		return this._rawHumanBones.restPose;
	}
	get normalizedRestPose() {
		return this._normalizedHumanBones.restPose;
	}
	get humanBones() {
		return this._rawHumanBones.humanBones;
	}
	get rawHumanBones() {
		return this._rawHumanBones.humanBones;
	}
	get normalizedHumanBones() {
		return this._normalizedHumanBones.humanBones;
	}
	get normalizedHumanBonesRoot() {
		return this._normalizedHumanBones.root;
	}
	constructor(e, t) {
		this.autoUpdateHumanBones = t?.autoUpdateHumanBones ?? !0, this._rawHumanBones = new xt(e), this._normalizedHumanBones = new Tt(this._rawHumanBones);
	}
	copy(e) {
		return this.autoUpdateHumanBones = e.autoUpdateHumanBones, this._rawHumanBones = new xt(e.humanBones), this._normalizedHumanBones = new Tt(this._rawHumanBones), this;
	}
	clone() {
		return new e(this.humanBones, { autoUpdateHumanBones: this.autoUpdateHumanBones }).copy(this);
	}
	getAbsolutePose() {
		return this.getRawAbsolutePose();
	}
	getRawAbsolutePose() {
		return this._rawHumanBones.getAbsolutePose();
	}
	getNormalizedAbsolutePose() {
		return this._normalizedHumanBones.getAbsolutePose();
	}
	getPose() {
		return this.getRawPose();
	}
	getRawPose() {
		return this._rawHumanBones.getPose();
	}
	getNormalizedPose() {
		return this._normalizedHumanBones.getPose();
	}
	setPose(e) {
		return this.setRawPose(e);
	}
	setRawPose(e) {
		return this._rawHumanBones.setPose(e);
	}
	setNormalizedPose(e) {
		return this._normalizedHumanBones.setPose(e);
	}
	resetPose() {
		return this.resetRawPose();
	}
	resetRawPose() {
		return this._rawHumanBones.resetPose();
	}
	resetNormalizedPose() {
		return this._normalizedHumanBones.resetPose();
	}
	getBone(e) {
		return this.getRawBone(e);
	}
	getRawBone(e) {
		return this._rawHumanBones.getBone(e);
	}
	getNormalizedBone(e) {
		return this._normalizedHumanBones.getBone(e);
	}
	getBoneNode(e) {
		return this.getRawBoneNode(e);
	}
	getRawBoneNode(e) {
		return this._rawHumanBones.getBoneNode(e);
	}
	getNormalizedBoneNode(e) {
		return this._normalizedHumanBones.getBoneNode(e);
	}
	update() {
		this.autoUpdateHumanBones && this._normalizedHumanBones.update();
	}
}, Dt = {
	Hips: "hips",
	Spine: "spine",
	Head: "head",
	LeftUpperLeg: "leftUpperLeg",
	LeftLowerLeg: "leftLowerLeg",
	LeftFoot: "leftFoot",
	RightUpperLeg: "rightUpperLeg",
	RightLowerLeg: "rightLowerLeg",
	RightFoot: "rightFoot",
	LeftUpperArm: "leftUpperArm",
	LeftLowerArm: "leftLowerArm",
	LeftHand: "leftHand",
	RightUpperArm: "rightUpperArm",
	RightLowerArm: "rightLowerArm",
	RightHand: "rightHand"
}, Ot = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]), kt = {
	leftThumbProximal: "leftThumbMetacarpal",
	leftThumbIntermediate: "leftThumbProximal",
	rightThumbProximal: "rightThumbMetacarpal",
	rightThumbIntermediate: "rightThumbProximal"
}, At = class {
	get name() {
		return "VRMHumanoidLoaderPlugin";
	}
	constructor(e, t) {
		this.parser = e, this.helperRoot = t?.helperRoot, this.autoUpdateHumanBones = t?.autoUpdateHumanBones;
	}
	afterRoot(e) {
		return I(this, null, function* () {
			e.userData.vrmHumanoid = yield this._import(e);
		});
	}
	_import(e) {
		return I(this, null, function* () {
			return (yield this._v1Import(e)) || (yield this._v0Import(e)) || null;
		});
	}
	_v1Import(e) {
		return I(this, null, function* () {
			let t = this.parser.json;
			if (t.extensionsUsed?.indexOf("VRMC_vrm") === -1) return null;
			let n = t.extensions?.VRMC_vrm;
			if (!n) return null;
			let r = n.specVersion;
			if (!Ot.has(r)) return null;
			let i = n.humanoid;
			if (!i) return null;
			let a = i.humanBones.leftThumbIntermediate != null || i.humanBones.rightThumbIntermediate != null, o = {};
			i.humanBones != null && (yield Promise.all(Object.entries(i.humanBones).map((e) => I(this, [e], function* ([e, t]) {
				let n = e, r = t.node;
				if (a) {
					let e = kt[n];
					e != null && (n = e);
				}
				let i = yield this.parser.getDependency("node", r);
				i != null && (o[n] = { node: i });
			}))));
			let s = new Et(this._ensureRequiredBonesExist(o), { autoUpdateHumanBones: this.autoUpdateHumanBones });
			if (e.scene.add(s.normalizedHumanBonesRoot), this.helperRoot) {
				let e = new _t(s);
				this.helperRoot.add(e), e.renderOrder = this.helperRoot.renderOrder;
			}
			return s;
		});
	}
	_v0Import(e) {
		return I(this, null, function* () {
			let t = this.parser.json.extensions?.VRM;
			if (!t) return null;
			let n = t.humanoid;
			if (!n) return null;
			let r = {};
			n.humanBones != null && (yield Promise.all(n.humanBones.map((e) => I(this, null, function* () {
				let t = e.bone, n = e.node;
				if (t == null || n == null || n < 0) return;
				let i = yield this.parser.getDependency("node", n);
				if (i == null) return;
				let a = kt[t] ?? t;
				r[a] ?? (r[a] = { node: i });
			}))));
			let i = new Et(this._ensureRequiredBonesExist(r), { autoUpdateHumanBones: this.autoUpdateHumanBones });
			if (e.scene.add(i.normalizedHumanBonesRoot), this.helperRoot) {
				let e = new _t(i);
				this.helperRoot.add(e), e.renderOrder = this.helperRoot.renderOrder;
			}
			return i;
		});
	}
	_ensureRequiredBonesExist(e) {
		let t = Object.values(Dt).filter((t) => e[t] == null);
		if (t.length > 0) throw Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${t.join(", ")}`);
		return e;
	}
}, jt = class extends e {
	constructor() {
		super(), this._currentTheta = 0, this._currentRadius = 0, this.theta = 0, this.radius = 0, this._currentTheta = 0, this._currentRadius = 0, this._attrPos = new c(/* @__PURE__ */ new Float32Array(195), 3), this.setAttribute("position", this._attrPos), this._attrIndex = new c(/* @__PURE__ */ new Uint16Array(189), 1), this.setIndex(this._attrIndex), this._buildIndex(), this.update();
	}
	update() {
		let e = !1;
		this._currentTheta !== this.theta && (this._currentTheta = this.theta, e = !0), this._currentRadius !== this.radius && (this._currentRadius = this.radius, e = !0), e && this._buildPosition();
	}
	_buildPosition() {
		this._attrPos.setXYZ(0, 0, 0, 0);
		for (let e = 0; e < 64; e++) {
			let t = e / 63 * this._currentTheta;
			this._attrPos.setXYZ(e + 1, this._currentRadius * Math.sin(t), 0, this._currentRadius * Math.cos(t));
		}
		this._attrPos.needsUpdate = !0;
	}
	_buildIndex() {
		for (let e = 0; e < 63; e++) this._attrIndex.setXYZ(e * 3, 0, e + 1, e + 2);
		this._attrIndex.needsUpdate = !0;
	}
}, Mt = class extends e {
	constructor() {
		super(), this.radius = 0, this._currentRadius = 0, this.tail = new u(), this._currentTail = new u(), this._attrPos = new c(/* @__PURE__ */ new Float32Array(294), 3), this.setAttribute("position", this._attrPos), this._attrIndex = new c(/* @__PURE__ */ new Uint16Array(194), 1), this.setIndex(this._attrIndex), this._buildIndex(), this.update();
	}
	update() {
		let e = !1;
		this._currentRadius !== this.radius && (this._currentRadius = this.radius, e = !0), this._currentTail.equals(this.tail) || (this._currentTail.copy(this.tail), e = !0), e && this._buildPosition();
	}
	_buildPosition() {
		for (let e = 0; e < 32; e++) {
			let t = e / 16 * Math.PI;
			this._attrPos.setXYZ(e, Math.cos(t), Math.sin(t), 0), this._attrPos.setXYZ(32 + e, 0, Math.cos(t), Math.sin(t)), this._attrPos.setXYZ(64 + e, Math.sin(t), 0, Math.cos(t));
		}
		this.scale(this._currentRadius, this._currentRadius, this._currentRadius), this.translate(this._currentTail.x, this._currentTail.y, this._currentTail.z), this._attrPos.setXYZ(96, 0, 0, 0), this._attrPos.setXYZ(97, this._currentTail.x, this._currentTail.y, this._currentTail.z), this._attrPos.needsUpdate = !0;
	}
	_buildIndex() {
		for (let e = 0; e < 32; e++) {
			let t = (e + 1) % 32;
			this._attrIndex.setXY(e * 2, e, t), this._attrIndex.setXY(64 + e * 2, 32 + e, 32 + t), this._attrIndex.setXY(128 + e * 2, 64 + e, 64 + t);
		}
		this._attrIndex.setXY(192, 96, 97), this._attrIndex.needsUpdate = !0;
	}
}, Nt = new g(), Pt = new g(), z = new u(), Ft = new u(), It = Math.sqrt(2) / 2, Lt = new g(0, 0, -It, It), Rt = new u(0, 1, 0), zt = class extends d {
	constructor(e) {
		super(), this.matrixAutoUpdate = !1, this.vrmLookAt = e;
		{
			let e = new jt();
			e.radius = .5;
			let t = new ae({
				color: 65280,
				transparent: !0,
				opacity: .5,
				side: 2,
				depthTest: !1,
				depthWrite: !1
			});
			this._meshPitch = new x(e, t), this.add(this._meshPitch);
		}
		{
			let e = new jt();
			e.radius = .5;
			let t = new ae({
				color: 16711680,
				transparent: !0,
				opacity: .5,
				side: 2,
				depthTest: !1,
				depthWrite: !1
			});
			this._meshYaw = new x(e, t), this.add(this._meshYaw);
		}
		{
			let e = new Mt();
			e.radius = .1;
			let t = new f({
				color: 16777215,
				depthTest: !1,
				depthWrite: !1
			});
			this._lineTarget = new m(e, t), this._lineTarget.frustumCulled = !1, this.add(this._lineTarget);
		}
	}
	dispose() {
		this._meshYaw.geometry.dispose(), this._meshYaw.material.dispose(), this._meshPitch.geometry.dispose(), this._meshPitch.material.dispose(), this._lineTarget.geometry.dispose(), this._lineTarget.material.dispose();
	}
	updateMatrixWorld(e) {
		let t = h.DEG2RAD * this.vrmLookAt.yaw;
		this._meshYaw.geometry.theta = t, this._meshYaw.geometry.update();
		let n = h.DEG2RAD * this.vrmLookAt.pitch;
		this._meshPitch.geometry.theta = n, this._meshPitch.geometry.update(), this.vrmLookAt.getLookAtWorldPosition(z), this.vrmLookAt.getLookAtWorldQuaternion(Nt), Nt.multiply(this.vrmLookAt.getFaceFrontQuaternion(Pt)), this._meshYaw.position.copy(z), this._meshYaw.quaternion.copy(Nt), this._meshPitch.position.copy(z), this._meshPitch.quaternion.copy(Nt), this._meshPitch.quaternion.multiply(Pt.setFromAxisAngle(Rt, t)), this._meshPitch.quaternion.multiply(Lt);
		let { target: r, autoUpdate: i } = this.vrmLookAt;
		r != null && i && (r.getWorldPosition(Ft).sub(z), this._lineTarget.geometry.tail.copy(Ft), this._lineTarget.geometry.update(), this._lineTarget.position.copy(z)), super.updateMatrixWorld(e);
	}
}, Bt = new u(), Vt = new u();
function Ht(e, t) {
	return e.matrixWorld.decompose(Bt, t, Vt), t;
}
function Ut(e) {
	return [Math.atan2(-e.z, e.x), Math.atan2(e.y, Math.sqrt(e.x * e.x + e.z * e.z))];
}
function Wt(e) {
	let t = Math.round(e / 2 / Math.PI);
	return e - 2 * Math.PI * t;
}
var Gt = new u(0, 0, 1), Kt = new u(), qt = new u(), Jt = new u(), Yt = new g(), Xt = new g(), Zt = new g(), Qt = new g(), $t = new i(), en = class e {
	constructor(e, t) {
		this.offsetFromHeadBone = new u(), this.autoUpdate = !0, this.faceFront = new u(0, 0, 1), this.humanoid = e, this.applier = t, this._yaw = 0, this._pitch = 0, this._needsUpdate = !0, this._restHeadWorldQuaternion = this.getLookAtWorldQuaternion(new g());
	}
	get yaw() {
		return this._yaw;
	}
	set yaw(e) {
		this._yaw = e, this._needsUpdate = !0;
	}
	get pitch() {
		return this._pitch;
	}
	set pitch(e) {
		this._pitch = e, this._needsUpdate = !0;
	}
	get euler() {
		return this.getEuler(new i());
	}
	getEuler(e) {
		return e.set(h.DEG2RAD * this._pitch, h.DEG2RAD * this._yaw, 0, "YXZ");
	}
	copy(e) {
		if (this.humanoid !== e.humanoid) throw Error("VRMLookAt: humanoid must be same in order to copy");
		return this.offsetFromHeadBone.copy(e.offsetFromHeadBone), this.applier = e.applier, this.autoUpdate = e.autoUpdate, this.target = e.target, this.faceFront.copy(e.faceFront), this;
	}
	clone() {
		return new e(this.humanoid, this.applier).copy(this);
	}
	reset() {
		this._yaw = 0, this._pitch = 0, this._needsUpdate = !0;
	}
	getLookAtWorldPosition(e) {
		let t = this.humanoid.getRawBoneNode("head");
		return e.copy(this.offsetFromHeadBone).applyMatrix4(t.matrixWorld);
	}
	getLookAtWorldQuaternion(e) {
		return Ht(this.humanoid.getRawBoneNode("head"), e);
	}
	getFaceFrontQuaternion(e) {
		if (this.faceFront.distanceToSquared(Gt) < .01) return e.copy(this._restHeadWorldQuaternion).invert();
		let [t, n] = Ut(this.faceFront);
		return $t.set(0, .5 * Math.PI + t, n, "YZX"), e.setFromEuler($t).premultiply(Qt.copy(this._restHeadWorldQuaternion).invert());
	}
	getLookAtWorldDirection(e) {
		return this.getLookAtWorldQuaternion(Xt), this.getFaceFrontQuaternion(Zt), e.copy(Gt).applyQuaternion(Xt).applyQuaternion(Zt).applyEuler(this.getEuler($t));
	}
	lookAt(e) {
		let t = Yt.copy(this._restHeadWorldQuaternion).multiply(bt(this.getLookAtWorldQuaternion(Xt))), n = this.getLookAtWorldPosition(qt), r = Jt.copy(e).sub(n).applyQuaternion(t).normalize(), [i, a] = Ut(this.faceFront), [o, s] = Ut(r), c = Wt(o - i), l = Wt(a - s);
		this._yaw = h.RAD2DEG * c, this._pitch = h.RAD2DEG * l, this._needsUpdate = !0;
	}
	update(e) {
		this.target != null && this.autoUpdate && this.lookAt(this.target.getWorldPosition(Kt)), this._needsUpdate && (this._needsUpdate = !1, this.applier.applyYawPitch(this._yaw, this._pitch));
	}
};
en.EULER_ORDER = "YXZ";
var tn = en, nn = new u(0, 0, 1), B = new g(), V = new g(), H = new i(0, 0, 0, "YXZ"), rn = class {
	constructor(e, t, n, r, i) {
		this.humanoid = e, this.rangeMapHorizontalInner = t, this.rangeMapHorizontalOuter = n, this.rangeMapVerticalDown = r, this.rangeMapVerticalUp = i, this.faceFront = new u(0, 0, 1), this._restQuatLeftEye = new g(), this._restQuatRightEye = new g(), this._restLeftEyeParentWorldQuat = new g(), this._restRightEyeParentWorldQuat = new g();
		let a = this.humanoid.getRawBoneNode("leftEye"), o = this.humanoid.getRawBoneNode("rightEye");
		a && (this._restQuatLeftEye.copy(a.quaternion), Ht(a.parent, this._restLeftEyeParentWorldQuat)), o && (this._restQuatRightEye.copy(o.quaternion), Ht(o.parent, this._restRightEyeParentWorldQuat));
	}
	applyYawPitch(e, t) {
		let n = this.humanoid.getRawBoneNode("leftEye"), r = this.humanoid.getRawBoneNode("rightEye"), i = this.humanoid.getNormalizedBoneNode("leftEye"), a = this.humanoid.getNormalizedBoneNode("rightEye");
		n && (H.x = t < 0 ? -h.DEG2RAD * this.rangeMapVerticalDown.map(-t) : h.DEG2RAD * this.rangeMapVerticalUp.map(t), H.y = e < 0 ? -h.DEG2RAD * this.rangeMapHorizontalInner.map(-e) : h.DEG2RAD * this.rangeMapHorizontalOuter.map(e), B.setFromEuler(H), this._getWorldFaceFrontQuat(V), i.quaternion.copy(V).multiply(B).multiply(V.invert()), B.copy(this._restLeftEyeParentWorldQuat), n.quaternion.copy(i.quaternion).multiply(B).premultiply(B.invert()).multiply(this._restQuatLeftEye)), r && (H.x = t < 0 ? -h.DEG2RAD * this.rangeMapVerticalDown.map(-t) : h.DEG2RAD * this.rangeMapVerticalUp.map(t), H.y = e < 0 ? -h.DEG2RAD * this.rangeMapHorizontalOuter.map(-e) : h.DEG2RAD * this.rangeMapHorizontalInner.map(e), B.setFromEuler(H), this._getWorldFaceFrontQuat(V), a.quaternion.copy(V).multiply(B).multiply(V.invert()), B.copy(this._restRightEyeParentWorldQuat), r.quaternion.copy(a.quaternion).multiply(B).premultiply(B.invert()).multiply(this._restQuatRightEye));
	}
	lookAt(e) {
		let t = h.RAD2DEG * e.y, n = h.RAD2DEG * e.x;
		this.applyYawPitch(t, n);
	}
	_getWorldFaceFrontQuat(e) {
		if (this.faceFront.distanceToSquared(nn) < .01) return e.identity();
		let [t, n] = Ut(this.faceFront);
		return H.set(0, .5 * Math.PI + t, n, "YZX"), e.setFromEuler(H);
	}
};
rn.type = "bone";
var an = class {
	constructor(e, t, n, r, i) {
		this.expressions = e, this.rangeMapHorizontalInner = t, this.rangeMapHorizontalOuter = n, this.rangeMapVerticalDown = r, this.rangeMapVerticalUp = i;
	}
	applyYawPitch(e, t) {
		t < 0 ? (this.expressions.setValue("lookDown", 0), this.expressions.setValue("lookUp", this.rangeMapVerticalUp.map(-t))) : (this.expressions.setValue("lookUp", 0), this.expressions.setValue("lookDown", this.rangeMapVerticalDown.map(t))), e < 0 ? (this.expressions.setValue("lookLeft", 0), this.expressions.setValue("lookRight", this.rangeMapHorizontalOuter.map(-e))) : (this.expressions.setValue("lookRight", 0), this.expressions.setValue("lookLeft", this.rangeMapHorizontalOuter.map(e)));
	}
	lookAt(e) {
		let t = h.RAD2DEG * e.y, n = h.RAD2DEG * e.x;
		this.applyYawPitch(t, n);
	}
};
an.type = "expression";
var on = class {
	constructor(e, t) {
		this.inputMaxValue = e, this.outputScale = t;
	}
	map(e) {
		return this.outputScale * Xe(e / this.inputMaxValue);
	}
}, sn = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]), cn = .01, ln = class {
	get name() {
		return "VRMLookAtLoaderPlugin";
	}
	constructor(e, t) {
		this.parser = e, this.helperRoot = t?.helperRoot;
	}
	afterRoot(e) {
		return I(this, null, function* () {
			let t = e.userData.vrmHumanoid;
			if (t === null) return;
			if (t === void 0) throw Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");
			let n = e.userData.vrmExpressionManager;
			if (n !== null) {
				if (n === void 0) throw Error("VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first");
				e.userData.vrmLookAt = yield this._import(e, t, n);
			}
		});
	}
	_import(e, t, n) {
		return I(this, null, function* () {
			return t == null || n == null ? null : (yield this._v1Import(e, t, n)) || (yield this._v0Import(e, t, n)) || null;
		});
	}
	_v1Import(e, t, n) {
		return I(this, null, function* () {
			let e = this.parser.json;
			if (e.extensionsUsed?.indexOf("VRMC_vrm") === -1) return null;
			let r = e.extensions?.VRMC_vrm;
			if (!r) return null;
			let i = r.specVersion;
			if (!sn.has(i)) return null;
			let a = r.lookAt;
			if (!a) return null;
			let o = a.type === "expression" ? 1 : 10, s = this._v1ImportRangeMap(a.rangeMapHorizontalInner, o), c = this._v1ImportRangeMap(a.rangeMapHorizontalOuter, o), l = this._v1ImportRangeMap(a.rangeMapVerticalDown, o), u = this._v1ImportRangeMap(a.rangeMapVerticalUp, o), d;
			d = a.type === "expression" ? new an(n, s, c, l, u) : new rn(t, s, c, l, u);
			let f = this._importLookAt(t, d);
			return f.offsetFromHeadBone.fromArray(a.offsetFromHeadBone ?? [
				0,
				.06,
				0
			]), f;
		});
	}
	_v1ImportRangeMap(e, t) {
		let n = e?.inputMaxValue ?? 90, r = e?.outputScale ?? t;
		return n < cn && (n = cn), new on(n, r);
	}
	_v0Import(e, t, n) {
		return I(this, null, function* () {
			let e = this.parser.json.extensions?.VRM;
			if (!e) return null;
			let r = e.firstPerson;
			if (!r) return null;
			let i = r.lookAtTypeName === "BlendShape" ? 1 : 10, a = this._v0ImportDegreeMap(r.lookAtHorizontalInner, i), o = this._v0ImportDegreeMap(r.lookAtHorizontalOuter, i), s = this._v0ImportDegreeMap(r.lookAtVerticalDown, i), c = this._v0ImportDegreeMap(r.lookAtVerticalUp, i), l;
			l = r.lookAtTypeName === "BlendShape" ? new an(n, a, o, s, c) : new rn(t, a, o, s, c);
			let u = this._importLookAt(t, l);
			return r.firstPersonBoneOffset ? u.offsetFromHeadBone.set(r.firstPersonBoneOffset.x ?? 0, r.firstPersonBoneOffset.y ?? .06, -(r.firstPersonBoneOffset.z ?? 0)) : u.offsetFromHeadBone.set(0, .06, 0), u.faceFront.set(0, 0, -1), l instanceof rn && l.faceFront.set(0, 0, -1), u;
		});
	}
	_v0ImportDegreeMap(e, t) {
		let n = e?.curve;
		JSON.stringify(n);
		let r = e?.xRange ?? 90, i = e?.yRange ?? t;
		return r < cn && (r = cn), new on(r, i);
	}
	_importLookAt(e, t) {
		let n = new tn(e, t);
		if (this.helperRoot) {
			let e = new zt(n);
			this.helperRoot.add(e), e.renderOrder = this.helperRoot.renderOrder;
		}
		return n;
	}
};
function un(e, t) {
	return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
}
var dn = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]), fn = class {
	get name() {
		return "VRMMetaLoaderPlugin";
	}
	constructor(e, t) {
		this.parser = e, this.needThumbnailImage = t?.needThumbnailImage ?? !1, this.acceptLicenseUrls = t?.acceptLicenseUrls ?? ["https://vrm.dev/licenses/1.0/"], this.acceptV0Meta = t?.acceptV0Meta ?? !0;
	}
	afterRoot(e) {
		return I(this, null, function* () {
			e.userData.vrmMeta = yield this._import(e);
		});
	}
	_import(e) {
		return I(this, null, function* () {
			return (yield this._v1Import(e)) ?? (yield this._v0Import(e)) ?? null;
		});
	}
	_v1Import(e) {
		return I(this, null, function* () {
			let e = this.parser.json;
			if (e.extensionsUsed?.indexOf("VRMC_vrm") === -1) return null;
			let t = e.extensions?.VRMC_vrm;
			if (t == null) return null;
			let n = t.specVersion;
			if (!dn.has(n)) return null;
			let r = t.meta;
			if (!r) return null;
			let i = r.licenseUrl;
			if (!new Set(this.acceptLicenseUrls).has(i)) throw Error(`VRMMetaLoaderPlugin: The license url "${i}" is not accepted`);
			let a;
			return this.needThumbnailImage && r.thumbnailImage != null && (a = (yield this._extractGLTFImage(r.thumbnailImage)) ?? void 0), {
				metaVersion: "1",
				name: r.name,
				version: r.version,
				authors: r.authors,
				copyrightInformation: r.copyrightInformation,
				contactInformation: r.contactInformation,
				references: r.references,
				thirdPartyLicenses: r.thirdPartyLicenses,
				thumbnailImage: a,
				licenseUrl: r.licenseUrl,
				avatarPermission: r.avatarPermission,
				allowExcessivelyViolentUsage: r.allowExcessivelyViolentUsage,
				allowExcessivelySexualUsage: r.allowExcessivelySexualUsage,
				commercialUsage: r.commercialUsage,
				allowPoliticalOrReligiousUsage: r.allowPoliticalOrReligiousUsage,
				allowAntisocialOrHateUsage: r.allowAntisocialOrHateUsage,
				creditNotation: r.creditNotation,
				allowRedistribution: r.allowRedistribution,
				modification: r.modification,
				otherLicenseUrl: r.otherLicenseUrl
			};
		});
	}
	_v0Import(e) {
		return I(this, null, function* () {
			let e = this.parser.json.extensions?.VRM;
			if (!e) return null;
			let t = e.meta;
			if (!t) return null;
			if (!this.acceptV0Meta) throw Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");
			let n;
			return this.needThumbnailImage && t.texture != null && t.texture !== -1 && (n = yield this.parser.getDependency("texture", t.texture)), {
				metaVersion: "0",
				allowedUserName: t.allowedUserName,
				author: t.author,
				commercialUssageName: t.commercialUssageName,
				contactInformation: t.contactInformation,
				licenseName: t.licenseName,
				otherLicenseUrl: t.otherLicenseUrl,
				otherPermissionUrl: t.otherPermissionUrl,
				reference: t.reference,
				sexualUssageName: t.sexualUssageName,
				texture: n ?? void 0,
				title: t.title,
				version: t.version,
				violentUssageName: t.violentUssageName
			};
		});
	}
	_extractGLTFImage(e) {
		return I(this, null, function* () {
			let t = this.parser.json.images?.[e];
			if (t == null) return null;
			let n = t.uri;
			if (t.bufferView != null) {
				let e = yield this.parser.getDependency("bufferView", t.bufferView), r = new Blob([e], { type: t.mimeType });
				n = URL.createObjectURL(r);
			}
			return n == null ? null : yield new l().loadAsync(un(n, this.parser.options.path)).catch((e) => null);
		});
	}
}, pn = class {
	constructor(e) {
		this.scene = e.scene, this.meta = e.meta, this.humanoid = e.humanoid, this.expressionManager = e.expressionManager, this.firstPerson = e.firstPerson, this.lookAt = e.lookAt;
	}
	update(e) {
		this.humanoid.update(), this.lookAt && this.lookAt.update(e), this.expressionManager && this.expressionManager.update();
	}
}, mn = class extends pn {
	constructor(e) {
		super(e), this.materials = e.materials, this.springBoneManager = e.springBoneManager, this.nodeConstraintManager = e.nodeConstraintManager;
	}
	update(e) {
		super.update(e), this.nodeConstraintManager && this.nodeConstraintManager.update(), this.springBoneManager && this.springBoneManager.update(e), this.materials && this.materials.forEach((t) => {
			t.update && t.update(e);
		});
	}
}, hn = Object.defineProperty, gn = Object.getOwnPropertySymbols, _n = Object.prototype.hasOwnProperty, vn = Object.prototype.propertyIsEnumerable, yn = (e, t, n) => t in e ? hn(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, bn = (e, t) => {
	for (var n in t ||= {}) _n.call(t, n) && yn(e, n, t[n]);
	if (gn) for (var n of gn(t)) vn.call(t, n) && yn(e, n, t[n]);
	return e;
}, U = (e, t, n) => new Promise((r, i) => {
	var a = (e) => {
		try {
			s(n.next(e));
		} catch (e) {
			i(e);
		}
	}, o = (e) => {
		try {
			s(n.throw(e));
		} catch (e) {
			i(e);
		}
	}, s = (e) => e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
	s((n = n.apply(e, t)).next());
});
function xn(e, t) {
	e.colorSpace = t;
}
var Sn = class {
	get pending() {
		return Promise.all(this._pendings);
	}
	constructor(e, t) {
		this._parser = e, this._materialParams = t, this._pendings = [];
	}
	assignPrimitive(e, t) {
		t != null && (this._materialParams[e] = t);
	}
	assignColor(e, n, r) {
		if (n != null) {
			let i = new t().fromArray(n);
			r && i.convertSRGBToLinear(), this._materialParams[e] = i;
		}
	}
	assignTexture(e, t, n) {
		return U(this, null, function* () {
			let r = U(this, null, function* () {
				if (t != null) {
					let r = yield this._parser.assignTexture(this._materialParams, e, t);
					if (r == null) return;
					n && xn(r, "srgb");
				}
			});
			return this._pendings.push(r), r;
		});
	}
	assignTextureByIndex(e, t, n) {
		return U(this, null, function* () {
			return this.assignTexture(e, t == null ? void 0 : { index: t }, n);
		});
	}
}, Cn = "// #define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#include <common>\n\n// #include <uv_pars_vertex>\n#ifdef MTOON_USE_UV\n  varying vec2 vUv;\n\n  // COMPAT: pre-r151 uses a common uvTransform\n  #if THREE_VRM_THREE_REVISION < 151\n    uniform mat3 uvTransform;\n  #endif\n#endif\n\n// #include <uv2_pars_vertex>\n// COMAPT: pre-r151 uses uv2 for lightMap and aoMap\n#if THREE_VRM_THREE_REVISION < 151\n  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n    attribute vec2 uv2;\n    varying vec2 vUv2;\n    uniform mat3 uv2Transform;\n  #endif\n#endif\n\n// #include <displacementmap_pars_vertex>\n// #include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE\n  uniform sampler2D outlineWidthMultiplyTexture;\n  uniform mat3 outlineWidthMultiplyTextureUvTransform;\n#endif\n\nuniform float outlineWidthFactor;\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #ifdef MTOON_USE_UV\n    // COMPAT: pre-r151 uses a common uvTransform\n    #if THREE_VRM_THREE_REVISION >= 151\n      vUv = uv;\n    #else\n      vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n    #endif\n  #endif\n\n  // #include <uv2_vertex>\n  // COMAPT: pre-r151 uses uv2 for lightMap and aoMap\n  #if THREE_VRM_THREE_REVISION < 151\n    #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n      vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n    #endif\n  #endif\n\n  #include <color_vertex>\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n\n  // we need this to compute the outline properly\n  objectNormal = normalize( objectNormal );\n\n  #include <defaultnormal_vertex>\n\n  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n    vNormal = normalize( transformedNormal );\n  #endif\n\n  #include <begin_vertex>\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  // #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  vViewPosition = - mvPosition.xyz;\n\n  #ifdef OUTLINE\n    float worldNormalLength = length( transformedNormal );\n    vec3 outlineOffset = outlineWidthFactor * worldNormalLength * objectNormal;\n\n    #ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE\n      vec2 outlineWidthMultiplyTextureUv = ( outlineWidthMultiplyTextureUvTransform * vec3( vUv, 1 ) ).xy;\n      float outlineTex = texture2D( outlineWidthMultiplyTexture, outlineWidthMultiplyTextureUv ).g;\n      outlineOffset *= outlineTex;\n    #endif\n\n    #ifdef OUTLINE_WIDTH_SCREEN\n      outlineOffset *= vViewPosition.z / projectionMatrix[ 1 ].y;\n    #endif\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );\n\n    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic\n  #endif\n\n  #include <worldpos_vertex>\n  // #include <envmap_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n\n}", wn = "// #define PHONG\n\nuniform vec3 litFactor;\n\nuniform float opacity;\n\nuniform vec3 shadeColorFactor;\n#ifdef USE_SHADEMULTIPLYTEXTURE\n  uniform sampler2D shadeMultiplyTexture;\n  uniform mat3 shadeMultiplyTextureUvTransform;\n#endif\n\nuniform float shadingShiftFactor;\nuniform float shadingToonyFactor;\n\n#ifdef USE_SHADINGSHIFTTEXTURE\n  uniform sampler2D shadingShiftTexture;\n  uniform mat3 shadingShiftTextureUvTransform;\n  uniform float shadingShiftTextureScale;\n#endif\n\nuniform float giEqualizationFactor;\n\nuniform vec3 parametricRimColorFactor;\n#ifdef USE_RIMMULTIPLYTEXTURE\n  uniform sampler2D rimMultiplyTexture;\n  uniform mat3 rimMultiplyTextureUvTransform;\n#endif\nuniform float rimLightingMixFactor;\nuniform float parametricRimFresnelPowerFactor;\nuniform float parametricRimLiftFactor;\n\n#ifdef USE_MATCAPTEXTURE\n  uniform vec3 matcapFactor;\n  uniform sampler2D matcapTexture;\n  uniform mat3 matcapTextureUvTransform;\n#endif\n\nuniform vec3 emissive;\nuniform float emissiveIntensity;\n\nuniform vec3 outlineColorFactor;\nuniform float outlineLightingMixFactor;\n\n#ifdef USE_UVANIMATIONMASKTEXTURE\n  uniform sampler2D uvAnimationMaskTexture;\n  uniform mat3 uvAnimationMaskTextureUvTransform;\n#endif\n\nuniform float uvAnimationScrollXOffset;\nuniform float uvAnimationScrollYOffset;\nuniform float uvAnimationRotationPhase;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n\n// #include <uv_pars_fragment>\n#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n  varying vec2 vUv;\n#endif\n\n// #include <uv2_pars_fragment>\n// COMAPT: pre-r151 uses uv2 for lightMap and aoMap\n#if THREE_VRM_THREE_REVISION < 151\n  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n    varying vec2 vUv2;\n  #endif\n#endif\n\n#include <map_pars_fragment>\n\n#ifdef USE_MAP\n  uniform mat3 mapUvTransform;\n#endif\n\n// #include <alphamap_pars_fragment>\n\n#include <alphatest_pars_fragment>\n\n#include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n\n#ifdef USE_EMISSIVEMAP\n  uniform mat3 emissiveMapUvTransform;\n#endif\n\n// #include <envmap_common_pars_fragment>\n// #include <envmap_pars_fragment>\n// #include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n\n// #include <bsdfs>\n// COMPAT: pre-r151 doesn't have BRDF_Lambert in <common>\n#if THREE_VRM_THREE_REVISION < 151\n  vec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n    return RECIPROCAL_PI * diffuseColor;\n  }\n#endif\n\n#include <lights_pars_begin>\n\n#include <normal_pars_fragment>\n\n// #include <lights_phong_pars_fragment>\nvarying vec3 vViewPosition;\n\nstruct MToonMaterial {\n  vec3 diffuseColor;\n  vec3 shadeColor;\n  float shadingShift;\n};\n\nfloat linearstep( float a, float b, float t ) {\n  return clamp( ( t - a ) / ( b - a ), 0.0, 1.0 );\n}\n\n/**\n * Convert NdotL into toon shading factor using shadingShift and shadingToony\n */\nfloat getShading(\n  const in float dotNL,\n  const in float shadow,\n  const in float shadingShift\n) {\n  float shading = dotNL;\n  shading = shading + shadingShift;\n  shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );\n  shading *= shadow;\n  return shading;\n}\n\n/**\n * Mix diffuseColor and shadeColor using shading factor and light color\n */\nvec3 getDiffuse(\n  const in MToonMaterial material,\n  const in float shading,\n  in vec3 lightColor\n) {\n  #ifdef DEBUG_LITSHADERATE\n    return vec3( BRDF_Lambert( shading * lightColor ) );\n  #endif\n\n  vec3 col = lightColor * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, shading ) );\n\n  // The \"comment out if you want to PBR absolutely\" line\n  #ifdef V0_COMPAT_SHADE\n    col = min( col, material.diffuseColor );\n  #endif\n\n  return col;\n}\n\n// COMPAT: pre-r156 uses a struct GeometricContext\n#if THREE_VRM_THREE_REVISION >= 157\n  void RE_Direct_MToon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {\n    float dotNL = clamp( dot( geometryNormal, directLight.direction ), -1.0, 1.0 );\n    vec3 irradiance = directLight.color;\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n\n    irradiance *= dotNL;\n\n    float shading = getShading( dotNL, shadow, material.shadingShift );\n\n    // toon shaded diffuse\n    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );\n  }\n\n  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {\n    // indirect diffuse will use diffuseColor, no shadeColor involved\n    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n  }\n#else\n  void RE_Direct_MToon( const in IncidentLight directLight, const in GeometricContext geometry, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {\n    float dotNL = clamp( dot( geometry.normal, directLight.direction ), -1.0, 1.0 );\n    vec3 irradiance = directLight.color;\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n\n    irradiance *= dotNL;\n\n    float shading = getShading( dotNL, shadow, material.shadingShift );\n\n    // toon shaded diffuse\n    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );\n  }\n\n  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in GeometricContext geometry, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {\n    // indirect diffuse will use diffuseColor, no shadeColor involved\n    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n    // directSpecular will be used for rim lighting, not an actual specular\n    reflectedLight.directSpecular += irradiance;\n  }\n#endif\n\n#define RE_Direct RE_Direct_MToon\n#define RE_IndirectDiffuse RE_IndirectDiffuse_MToon\n#define Material_LightProbeLOD( material ) (0)\n\n#include <shadowmap_pars_fragment>\n// #include <bumpmap_pars_fragment>\n\n// #include <normalmap_pars_fragment>\n#ifdef USE_NORMALMAP\n\n  uniform sampler2D normalMap;\n  uniform mat3 normalMapUvTransform;\n  uniform vec2 normalScale;\n\n#endif\n\n// COMPAT: pre-r151\n// USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151\n#if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )\n\n  uniform mat3 normalMatrix;\n\n#endif\n\n// COMPAT: pre-r151\n// USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( TANGENTSPACE_NORMALMAP ) )\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n  // three-vrm specific change: it requires `uv` as an input in order to support uv scrolls\n\n  // Temporary compat against shader change @ Three.js r126, r151\n  #if THREE_VRM_THREE_REVISION >= 151\n\n    mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\n      vec3 q0 = dFdx( eye_pos.xyz );\n      vec3 q1 = dFdy( eye_pos.xyz );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      vec3 N = surf_norm;\n\n      vec3 q1perp = cross( q1, N );\n      vec3 q0perp = cross( N, q0 );\n\n      vec3 T = q1perp * st0.x + q0perp * st1.x;\n      vec3 B = q1perp * st0.y + q0perp * st1.y;\n\n      float det = max( dot( T, T ), dot( B, B ) );\n      float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\n      return mat3( T * scale, B * scale, N );\n\n    }\n\n  #else\n\n    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\n      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      vec3 N = normalize( surf_norm );\n\n      vec3 q1perp = cross( q1, N );\n      vec3 q0perp = cross( N, q0 );\n\n      vec3 T = q1perp * st0.x + q0perp * st1.x;\n      vec3 B = q1perp * st0.y + q0perp * st1.y;\n\n      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n      // TODO: Is this still required? Or shall I make a PR about it?\n      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {\n        return surf_norm;\n      }\n\n      float det = max( dot( T, T ), dot( B, B ) );\n      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\n      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\n    }\n\n  #endif\n\n#endif\n\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == post correction ==========================================================\nvoid postCorrection() {\n  #include <tonemapping_fragment>\n  #include <colorspace_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec2 uv = vec2(0.5, 0.5);\n\n  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n    uv = vUv;\n\n    float uvAnimMask = 1.0;\n    #ifdef USE_UVANIMATIONMASKTEXTURE\n      vec2 uvAnimationMaskTextureUv = ( uvAnimationMaskTextureUvTransform * vec3( uv, 1 ) ).xy;\n      uvAnimMask = texture2D( uvAnimationMaskTexture, uvAnimationMaskTextureUv ).b;\n    #endif\n\n    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );\n    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );\n    uv = mat2( uvRotCos, -uvRotSin, uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;\n    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;\n  #endif\n\n  #ifdef DEBUG_UV\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n      gl_FragColor = vec4( uv, 0.0, 1.0 );\n    #endif\n    return;\n  #endif\n\n  vec4 diffuseColor = vec4( litFactor, opacity );\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissive * emissiveIntensity;\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    vec2 mapUv = ( mapUvTransform * vec3( uv, 1 ) ).xy;\n    vec4 sampledDiffuseColor = texture2D( map, mapUv );\n    #ifdef DECODE_VIDEO_TEXTURE\n      sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n    #endif\n    diffuseColor *= sampledDiffuseColor;\n  #endif\n\n  // #include <color_fragment>\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    diffuseColor.rgb *= vColor;\n  #endif\n\n  // #include <alphamap_fragment>\n\n  #include <alphatest_fragment>\n\n  // #include <specularmap_fragment>\n\n  // #include <normal_fragment_begin>\n  float faceDirection = gl_FrontFacing ? 1.0 : -1.0;\n\n  #ifdef FLAT_SHADED\n\n    vec3 fdx = dFdx( vViewPosition );\n    vec3 fdy = dFdy( vViewPosition );\n    vec3 normal = normalize( cross( fdx, fdy ) );\n\n  #else\n\n    vec3 normal = normalize( vNormal );\n\n    #ifdef DOUBLE_SIDED\n\n      normal *= faceDirection;\n\n    #endif\n\n  #endif\n\n  #ifdef USE_NORMALMAP\n\n    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;\n\n  #endif\n\n  #ifdef USE_NORMALMAP_TANGENTSPACE\n\n    #ifdef USE_TANGENT\n\n      mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n    #else\n\n      mat3 tbn = getTangentFrame( - vViewPosition, normal, normalMapUv );\n\n    #endif\n\n    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n      tbn[0] *= faceDirection;\n      tbn[1] *= faceDirection;\n\n    #endif\n\n  #endif\n\n  #ifdef USE_CLEARCOAT_NORMALMAP\n\n    #ifdef USE_TANGENT\n\n      mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n    #else\n\n      mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\n    #endif\n\n    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n      tbn2[0] *= faceDirection;\n      tbn2[1] *= faceDirection;\n\n    #endif\n\n  #endif\n\n  // non perturbed normal for clearcoat among others\n\n  vec3 nonPerturbedNormal = normal;\n\n  #ifdef OUTLINE\n    normal *= -1.0;\n  #endif\n\n  // #include <normal_fragment_maps>\n\n  // COMPAT: pre-r151\n  // USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151\n  #if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )\n\n    normal = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n    #ifdef FLIP_SIDED\n\n      normal = - normal;\n\n    #endif\n\n    #ifdef DOUBLE_SIDED\n\n      normal = normal * faceDirection;\n\n    #endif\n\n    normal = normalize( normalMatrix * normal );\n\n  // COMPAT: pre-r151\n  // USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151\n  #elif defined( USE_NORMALMAP_TANGENTSPACE ) || defined( TANGENTSPACE_NORMALMAP )\n\n    vec3 mapN = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0;\n    mapN.xy *= normalScale;\n\n    // COMPAT: pre-r151\n    #if THREE_VRM_THREE_REVISION >= 151 || defined( USE_TANGENT )\n\n      normal = normalize( tbn * mapN );\n\n    #else\n\n      normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );\n\n    #endif\n\n  #endif\n\n  // #include <emissivemap_fragment>\n  #ifdef USE_EMISSIVEMAP\n    vec2 emissiveMapUv = ( emissiveMapUvTransform * vec3( uv, 1 ) ).xy;\n    totalEmissiveRadiance *= texture2D( emissiveMap, emissiveMapUv ).rgb;\n  #endif\n\n  #ifdef DEBUG_NORMAL\n    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );\n    return;\n  #endif\n\n  // -- MToon: lighting --------------------------------------------------------\n  // accumulation\n  // #include <lights_phong_fragment>\n  MToonMaterial material;\n\n  material.diffuseColor = diffuseColor.rgb;\n\n  material.shadeColor = shadeColorFactor;\n  #ifdef USE_SHADEMULTIPLYTEXTURE\n    vec2 shadeMultiplyTextureUv = ( shadeMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;\n    material.shadeColor *= texture2D( shadeMultiplyTexture, shadeMultiplyTextureUv ).rgb;\n  #endif\n\n  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )\n    material.shadeColor.rgb *= vColor;\n  #endif\n\n  material.shadingShift = shadingShiftFactor;\n  #ifdef USE_SHADINGSHIFTTEXTURE\n    vec2 shadingShiftTextureUv = ( shadingShiftTextureUvTransform * vec3( uv, 1 ) ).xy;\n    material.shadingShift += texture2D( shadingShiftTexture, shadingShiftTextureUv ).r * shadingShiftTextureScale;\n  #endif\n\n  // #include <lights_fragment_begin>\n\n  // MToon Specific changes:\n  // Since we want to take shadows into account of shading instead of irradiance,\n  // we had to modify the codes that multiplies the results of shadowmap into color of direct lights.\n\n  // COMPAT: pre-r156 uses a struct GeometricContext\n  #if THREE_VRM_THREE_REVISION >= 157\n    vec3 geometryPosition = - vViewPosition;\n    vec3 geometryNormal = normal;\n    vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n    vec3 geometryClearcoatNormal;\n\n    #ifdef USE_CLEARCOAT\n\n      geometryClearcoatNormal = clearcoatNormal;\n\n    #endif\n  #else\n    GeometricContext geometry;\n\n    geometry.position = - vViewPosition;\n    geometry.normal = normal;\n    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n    #ifdef USE_CLEARCOAT\n\n      geometry.clearcoatNormal = clearcoatNormal;\n\n    #endif\n  #endif\n\n  IncidentLight directLight;\n\n  // since these variables will be used in unrolled loop, we have to define in prior\n  float shadow;\n\n  #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    PointLight pointLight;\n    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n    PointLightShadow pointLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n      pointLight = pointLights[ i ];\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        getPointLightInfo( pointLight, geometryPosition, directLight );\n      #else\n        getPointLightInfo( pointLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n      pointLightShadow = pointLightShadows[ i ];\n      // COMPAT: pre-r166\n      // r166 introduced shadowIntensity\n      #if THREE_VRM_THREE_REVISION >= 166\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n      #else\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n      #endif\n      #endif\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );\n      #else\n        RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n      #endif\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n    SpotLight spotLight;\n    // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS, r144+ uses NUM_SPOT_LIGHT_COORDS\n    #if THREE_VRM_THREE_REVISION >= 144\n      #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_COORDS > 0\n      SpotLightShadow spotLightShadow;\n      #endif\n    #elif defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n    SpotLightShadow spotLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n      spotLight = spotLights[ i ];\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        getSpotLightInfo( spotLight, geometryPosition, directLight );\n      #else\n        getSpotLightInfo( spotLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS and vSpotShadowCoord, r144+ uses NUM_SPOT_LIGHT_COORDS and vSpotLightCoord\n      // COMPAT: pre-r166 does not have shadowIntensity, r166+ has shadowIntensity\n      #if THREE_VRM_THREE_REVISION >= 166\n        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )\n        spotLightShadow = spotLightShadows[ i ];\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n        #endif\n      #elif THREE_VRM_THREE_REVISION >= 144\n        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )\n        spotLightShadow = spotLightShadows[ i ];\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n        #endif\n      #elif defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n      spotLightShadow = spotLightShadows[ i ];\n      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );\n      #else\n        RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n      #endif\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  #if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n    DirectionalLight directionalLight;\n    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n    DirectionalLightShadow directionalLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n      directionalLight = directionalLights[ i ];\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        getDirectionalLightInfo( directionalLight, directLight );\n      #else\n        getDirectionalLightInfo( directionalLight, geometry, directLight );\n      #endif\n\n      shadow = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n      directionalLightShadow = directionalLightShadows[ i ];\n      // COMPAT: pre-r166\n      // r166 introduced shadowIntensity\n      #if THREE_VRM_THREE_REVISION >= 166\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #else\n        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #endif\n      #endif\n\n      // COMPAT: pre-r156 uses a struct GeometricContext\n      #if THREE_VRM_THREE_REVISION >= 157\n        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );\n      #else\n        RE_Direct( directLight, geometry, material, shadow, reflectedLight );\n      #endif\n\n    }\n    #pragma unroll_loop_end\n\n  #endif\n\n  // #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n  //   RectAreaLight rectAreaLight;\n\n  //   #pragma unroll_loop_start\n  //   for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n  //     rectAreaLight = rectAreaLights[ i ];\n  //     RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n  //   }\n  //   #pragma unroll_loop_end\n\n  // #endif\n\n  #if defined( RE_IndirectDiffuse )\n\n    vec3 iblIrradiance = vec3( 0.0 );\n\n    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n    // COMPAT: pre-r156 uses a struct GeometricContext\n    // COMPAT: pre-r156 doesn't have a define USE_LIGHT_PROBES\n    #if THREE_VRM_THREE_REVISION >= 157\n      #if defined( USE_LIGHT_PROBES )\n        irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n      #endif\n    #else\n      irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n    #endif\n\n    #if ( NUM_HEMI_LIGHTS > 0 )\n\n      #pragma unroll_loop_start\n      for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n        // COMPAT: pre-r156 uses a struct GeometricContext\n        #if THREE_VRM_THREE_REVISION >= 157\n          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n        #else\n          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n        #endif\n\n      }\n      #pragma unroll_loop_end\n\n    #endif\n\n  #endif\n\n  // #if defined( RE_IndirectSpecular )\n\n  //   vec3 radiance = vec3( 0.0 );\n  //   vec3 clearcoatRadiance = vec3( 0.0 );\n\n  // #endif\n\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\n  #ifdef DEBUG_LITSHADERATE\n    gl_FragColor = vec4( col, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // -- MToon: rim lighting -----------------------------------------\n  vec3 viewDir = normalize( vViewPosition );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n    reflectedLight.directSpecular /= PI;\n  #endif\n  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, rimLightingMixFactor );\n\n  vec3 rim = parametricRimColorFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + parametricRimLiftFactor ), parametricRimFresnelPowerFactor );\n\n  #ifdef USE_MATCAPTEXTURE\n    {\n      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );\n      vec3 y = cross( viewDir, x ); // guaranteed to be normalized\n      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );\n      sphereUv = ( matcapTextureUvTransform * vec3( sphereUv, 1 ) ).xy;\n      vec3 matcap = texture2D( matcapTexture, sphereUv ).rgb;\n      rim += matcapFactor * matcap;\n    }\n  #endif\n\n  #ifdef USE_RIMMULTIPLYTEXTURE\n    vec2 rimMultiplyTextureUv = ( rimMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;\n    rim *= texture2D( rimMultiplyTexture, rimMultiplyTextureUv ).rgb;\n  #endif\n\n  col += rimMix * rim;\n\n  // -- MToon: Emission --------------------------------------------------------\n  col += totalEmissiveRadiance;\n\n  // #include <envmap_fragment>\n\n  // -- Almost done! -----------------------------------------------------------\n  #if defined( OUTLINE )\n    col = outlineColorFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor );\n  #endif\n\n  #ifdef OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  gl_FragColor = vec4( col, diffuseColor.a );\n  postCorrection();\n}\n", Tn = {
	None: "none",
	Normal: "normal",
	LitShadeRate: "litShadeRate",
	UV: "uv"
}, En = {
	None: "none",
	WorldCoordinates: "worldCoordinates",
	ScreenCoordinates: "screenCoordinates"
};
function Dn(e) {
	return e.colorSpace;
}
var On = class extends te {
	constructor(e = {}) {
		super({
			vertexShader: Cn,
			fragmentShader: wn
		}), this.uvAnimationScrollXSpeedFactor = 0, this.uvAnimationScrollYSpeedFactor = 0, this.uvAnimationRotationSpeedFactor = 0, this.fog = !0, this.normalMapType = 0, this._ignoreVertexColor = !0, this._v0CompatShade = !1, this._debugMode = Tn.None, this._outlineWidthMode = En.None, this._isOutline = !1, e.transparentWithZWrite && (e.depthWrite = !0), delete e.transparentWithZWrite, e.fog = !0, e.lights = !0, e.clipping = !0, this.uniforms = ce.merge([
			y.common,
			y.normalmap,
			y.emissivemap,
			y.fog,
			y.lights,
			{
				litFactor: { value: new t(1, 1, 1) },
				mapUvTransform: { value: new C() },
				colorAlpha: { value: 1 },
				normalMapUvTransform: { value: new C() },
				shadeColorFactor: { value: new t(0, 0, 0) },
				shadeMultiplyTexture: { value: null },
				shadeMultiplyTextureUvTransform: { value: new C() },
				shadingShiftFactor: { value: 0 },
				shadingShiftTexture: { value: null },
				shadingShiftTextureUvTransform: { value: new C() },
				shadingShiftTextureScale: { value: 1 },
				shadingToonyFactor: { value: .9 },
				giEqualizationFactor: { value: .9 },
				matcapFactor: { value: new t(1, 1, 1) },
				matcapTexture: { value: null },
				matcapTextureUvTransform: { value: new C() },
				parametricRimColorFactor: { value: new t(0, 0, 0) },
				rimMultiplyTexture: { value: null },
				rimMultiplyTextureUvTransform: { value: new C() },
				rimLightingMixFactor: { value: 1 },
				parametricRimFresnelPowerFactor: { value: 5 },
				parametricRimLiftFactor: { value: 0 },
				emissive: { value: new t(0, 0, 0) },
				emissiveIntensity: { value: 1 },
				emissiveMapUvTransform: { value: new C() },
				outlineWidthMultiplyTexture: { value: null },
				outlineWidthMultiplyTextureUvTransform: { value: new C() },
				outlineWidthFactor: { value: 0 },
				outlineColorFactor: { value: new t(0, 0, 0) },
				outlineLightingMixFactor: { value: 1 },
				uvAnimationMaskTexture: { value: null },
				uvAnimationMaskTextureUvTransform: { value: new C() },
				uvAnimationScrollXOffset: { value: 0 },
				uvAnimationScrollYOffset: { value: 0 },
				uvAnimationRotationPhase: { value: 0 }
			},
			e.uniforms ?? {}
		]), this.setValues(e), this._uploadUniformsWorkaround(), this.customProgramCacheKey = () => [
			...Object.entries(this._generateDefines()).map(([e, t]) => `${e}:${t}`),
			this.matcapTexture ? `matcapTextureColorSpace:${Dn(this.matcapTexture)}` : "",
			this.shadeMultiplyTexture ? `shadeMultiplyTextureColorSpace:${Dn(this.shadeMultiplyTexture)}` : "",
			this.rimMultiplyTexture ? `rimMultiplyTextureColorSpace:${Dn(this.rimMultiplyTexture)}` : ""
		].join(","), this.onBeforeCompile = (e) => {
			let t = Object.entries(bn(bn({}, this._generateDefines()), this.defines)).filter(([e, t]) => !!t).map(([e, t]) => `#define ${e} ${t}`).join("\n") + "\n";
			e.vertexShader = t + e.vertexShader, e.fragmentShader = t + e.fragmentShader;
		};
	}
	get color() {
		return this.uniforms.litFactor.value;
	}
	set color(e) {
		this.uniforms.litFactor.value = e;
	}
	get map() {
		return this.uniforms.map.value;
	}
	set map(e) {
		this.uniforms.map.value = e;
	}
	get normalMap() {
		return this.uniforms.normalMap.value;
	}
	set normalMap(e) {
		this.uniforms.normalMap.value = e;
	}
	get normalScale() {
		return this.uniforms.normalScale.value;
	}
	set normalScale(e) {
		this.uniforms.normalScale.value = e;
	}
	get emissive() {
		return this.uniforms.emissive.value;
	}
	set emissive(e) {
		this.uniforms.emissive.value = e;
	}
	get emissiveIntensity() {
		return this.uniforms.emissiveIntensity.value;
	}
	set emissiveIntensity(e) {
		this.uniforms.emissiveIntensity.value = e;
	}
	get emissiveMap() {
		return this.uniforms.emissiveMap.value;
	}
	set emissiveMap(e) {
		this.uniforms.emissiveMap.value = e;
	}
	get shadeColorFactor() {
		return this.uniforms.shadeColorFactor.value;
	}
	set shadeColorFactor(e) {
		this.uniforms.shadeColorFactor.value = e;
	}
	get shadeMultiplyTexture() {
		return this.uniforms.shadeMultiplyTexture.value;
	}
	set shadeMultiplyTexture(e) {
		this.uniforms.shadeMultiplyTexture.value = e;
	}
	get shadingShiftFactor() {
		return this.uniforms.shadingShiftFactor.value;
	}
	set shadingShiftFactor(e) {
		this.uniforms.shadingShiftFactor.value = e;
	}
	get shadingShiftTexture() {
		return this.uniforms.shadingShiftTexture.value;
	}
	set shadingShiftTexture(e) {
		this.uniforms.shadingShiftTexture.value = e;
	}
	get shadingShiftTextureScale() {
		return this.uniforms.shadingShiftTextureScale.value;
	}
	set shadingShiftTextureScale(e) {
		this.uniforms.shadingShiftTextureScale.value = e;
	}
	get shadingToonyFactor() {
		return this.uniforms.shadingToonyFactor.value;
	}
	set shadingToonyFactor(e) {
		this.uniforms.shadingToonyFactor.value = e;
	}
	get giEqualizationFactor() {
		return this.uniforms.giEqualizationFactor.value;
	}
	set giEqualizationFactor(e) {
		this.uniforms.giEqualizationFactor.value = e;
	}
	get matcapFactor() {
		return this.uniforms.matcapFactor.value;
	}
	set matcapFactor(e) {
		this.uniforms.matcapFactor.value = e;
	}
	get matcapTexture() {
		return this.uniforms.matcapTexture.value;
	}
	set matcapTexture(e) {
		this.uniforms.matcapTexture.value = e;
	}
	get parametricRimColorFactor() {
		return this.uniforms.parametricRimColorFactor.value;
	}
	set parametricRimColorFactor(e) {
		this.uniforms.parametricRimColorFactor.value = e;
	}
	get rimMultiplyTexture() {
		return this.uniforms.rimMultiplyTexture.value;
	}
	set rimMultiplyTexture(e) {
		this.uniforms.rimMultiplyTexture.value = e;
	}
	get rimLightingMixFactor() {
		return this.uniforms.rimLightingMixFactor.value;
	}
	set rimLightingMixFactor(e) {
		this.uniforms.rimLightingMixFactor.value = e;
	}
	get parametricRimFresnelPowerFactor() {
		return this.uniforms.parametricRimFresnelPowerFactor.value;
	}
	set parametricRimFresnelPowerFactor(e) {
		this.uniforms.parametricRimFresnelPowerFactor.value = e;
	}
	get parametricRimLiftFactor() {
		return this.uniforms.parametricRimLiftFactor.value;
	}
	set parametricRimLiftFactor(e) {
		this.uniforms.parametricRimLiftFactor.value = e;
	}
	get outlineWidthMultiplyTexture() {
		return this.uniforms.outlineWidthMultiplyTexture.value;
	}
	set outlineWidthMultiplyTexture(e) {
		this.uniforms.outlineWidthMultiplyTexture.value = e;
	}
	get outlineWidthFactor() {
		return this.uniforms.outlineWidthFactor.value;
	}
	set outlineWidthFactor(e) {
		this.uniforms.outlineWidthFactor.value = e;
	}
	get outlineColorFactor() {
		return this.uniforms.outlineColorFactor.value;
	}
	set outlineColorFactor(e) {
		this.uniforms.outlineColorFactor.value = e;
	}
	get outlineLightingMixFactor() {
		return this.uniforms.outlineLightingMixFactor.value;
	}
	set outlineLightingMixFactor(e) {
		this.uniforms.outlineLightingMixFactor.value = e;
	}
	get uvAnimationMaskTexture() {
		return this.uniforms.uvAnimationMaskTexture.value;
	}
	set uvAnimationMaskTexture(e) {
		this.uniforms.uvAnimationMaskTexture.value = e;
	}
	get uvAnimationScrollXOffset() {
		return this.uniforms.uvAnimationScrollXOffset.value;
	}
	set uvAnimationScrollXOffset(e) {
		this.uniforms.uvAnimationScrollXOffset.value = e;
	}
	get uvAnimationScrollYOffset() {
		return this.uniforms.uvAnimationScrollYOffset.value;
	}
	set uvAnimationScrollYOffset(e) {
		this.uniforms.uvAnimationScrollYOffset.value = e;
	}
	get uvAnimationRotationPhase() {
		return this.uniforms.uvAnimationRotationPhase.value;
	}
	set uvAnimationRotationPhase(e) {
		this.uniforms.uvAnimationRotationPhase.value = e;
	}
	get ignoreVertexColor() {
		return this._ignoreVertexColor;
	}
	set ignoreVertexColor(e) {
		this._ignoreVertexColor = e, this.needsUpdate = !0;
	}
	get v0CompatShade() {
		return this._v0CompatShade;
	}
	set v0CompatShade(e) {
		this._v0CompatShade = e, this.needsUpdate = !0;
	}
	get debugMode() {
		return this._debugMode;
	}
	set debugMode(e) {
		this._debugMode = e, this.needsUpdate = !0;
	}
	get outlineWidthMode() {
		return this._outlineWidthMode;
	}
	set outlineWidthMode(e) {
		this._outlineWidthMode = e, this.needsUpdate = !0;
	}
	get isOutline() {
		return this._isOutline;
	}
	set isOutline(e) {
		this._isOutline = e, this.needsUpdate = !0;
	}
	get isMToonMaterial() {
		return !0;
	}
	update(e) {
		this._uploadUniformsWorkaround(), this._updateUVAnimation(e);
	}
	copy(e) {
		return super.copy(e), this.map = e.map, this.normalMap = e.normalMap, this.emissiveMap = e.emissiveMap, this.shadeMultiplyTexture = e.shadeMultiplyTexture, this.shadingShiftTexture = e.shadingShiftTexture, this.matcapTexture = e.matcapTexture, this.rimMultiplyTexture = e.rimMultiplyTexture, this.outlineWidthMultiplyTexture = e.outlineWidthMultiplyTexture, this.uvAnimationMaskTexture = e.uvAnimationMaskTexture, this.normalMapType = e.normalMapType, this.uvAnimationScrollXSpeedFactor = e.uvAnimationScrollXSpeedFactor, this.uvAnimationScrollYSpeedFactor = e.uvAnimationScrollYSpeedFactor, this.uvAnimationRotationSpeedFactor = e.uvAnimationRotationSpeedFactor, this.ignoreVertexColor = e.ignoreVertexColor, this.v0CompatShade = e.v0CompatShade, this.debugMode = e.debugMode, this.outlineWidthMode = e.outlineWidthMode, this.isOutline = e.isOutline, this.needsUpdate = !0, this;
	}
	_updateUVAnimation(e) {
		this.uniforms.uvAnimationScrollXOffset.value += e * this.uvAnimationScrollXSpeedFactor, this.uniforms.uvAnimationScrollYOffset.value += e * this.uvAnimationScrollYSpeedFactor, this.uniforms.uvAnimationRotationPhase.value += e * this.uvAnimationRotationSpeedFactor, this.uniforms.alphaTest.value = this.alphaTest, this.uniformsNeedUpdate = !0;
	}
	_uploadUniformsWorkaround() {
		this.uniforms.opacity.value = this.opacity, this._updateTextureMatrix(this.uniforms.map, this.uniforms.mapUvTransform), this._updateTextureMatrix(this.uniforms.normalMap, this.uniforms.normalMapUvTransform), this._updateTextureMatrix(this.uniforms.emissiveMap, this.uniforms.emissiveMapUvTransform), this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture, this.uniforms.shadeMultiplyTextureUvTransform), this._updateTextureMatrix(this.uniforms.shadingShiftTexture, this.uniforms.shadingShiftTextureUvTransform), this._updateTextureMatrix(this.uniforms.matcapTexture, this.uniforms.matcapTextureUvTransform), this._updateTextureMatrix(this.uniforms.rimMultiplyTexture, this.uniforms.rimMultiplyTextureUvTransform), this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture, this.uniforms.outlineWidthMultiplyTextureUvTransform), this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture, this.uniforms.uvAnimationMaskTextureUvTransform), this.uniformsNeedUpdate = !0;
	}
	_generateDefines() {
		let e = this.outlineWidthMultiplyTexture !== null, t = this.map !== null || this.normalMap !== null || this.emissiveMap !== null || this.shadeMultiplyTexture !== null || this.shadingShiftTexture !== null || this.rimMultiplyTexture !== null || this.uvAnimationMaskTexture !== null;
		return {
			THREE_VRM_THREE_REVISION: 181,
			OUTLINE: this._isOutline,
			MTOON_USE_UV: e || t,
			MTOON_UVS_VERTEX_ONLY: e && !t,
			V0_COMPAT_SHADE: this._v0CompatShade,
			USE_SHADEMULTIPLYTEXTURE: this.shadeMultiplyTexture !== null,
			USE_SHADINGSHIFTTEXTURE: this.shadingShiftTexture !== null,
			USE_MATCAPTEXTURE: this.matcapTexture !== null,
			USE_RIMMULTIPLYTEXTURE: this.rimMultiplyTexture !== null,
			USE_OUTLINEWIDTHMULTIPLYTEXTURE: this._isOutline && this.outlineWidthMultiplyTexture !== null,
			USE_UVANIMATIONMASKTEXTURE: this.uvAnimationMaskTexture !== null,
			IGNORE_VERTEX_COLOR: this._ignoreVertexColor === !0,
			DEBUG_NORMAL: this._debugMode === "normal",
			DEBUG_LITSHADERATE: this._debugMode === "litShadeRate",
			DEBUG_UV: this._debugMode === "uv",
			OUTLINE_WIDTH_SCREEN: this._isOutline && this._outlineWidthMode === En.ScreenCoordinates
		};
	}
	_updateTextureMatrix(e, t) {
		e.value && (e.value.matrixAutoUpdate && e.value.updateMatrix(), t.value.copy(e.value.matrix));
	}
}, kn = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]), An = class e {
	get name() {
		return e.EXTENSION_NAME;
	}
	constructor(e, t = {}) {
		this.parser = e, this.materialType = t.materialType ?? On, this.renderOrderOffset = t.renderOrderOffset ?? 0, this.v0CompatShade = t.v0CompatShade ?? !1, this.debugMode = t.debugMode ?? "none", this._mToonMaterialSet = /* @__PURE__ */ new Set();
	}
	beforeRoot() {
		return U(this, null, function* () {
			this._removeUnlitExtensionIfMToonExists();
		});
	}
	afterRoot(e) {
		return U(this, null, function* () {
			e.userData.vrmMToonMaterials = Array.from(this._mToonMaterialSet);
		});
	}
	getMaterialType(e) {
		return this._getMToonExtension(e) ? this.materialType : null;
	}
	extendMaterialParams(e, t) {
		let n = this._getMToonExtension(e);
		return n ? this._extendMaterialParams(n, t) : null;
	}
	loadMesh(e) {
		return U(this, null, function* () {
			let t = this.parser, n = t.json.meshes?.[e];
			if (n == null) throw Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${e}] of glTF but the mesh doesn't exist`);
			let r = n.primitives, i = yield t.loadMesh(e);
			if (r.length === 1) {
				let e = i, t = r[0].material;
				t != null && this._setupPrimitive(e, t);
			} else {
				let e = i;
				for (let t = 0; t < r.length; t++) {
					let n = e.children[t], i = r[t].material;
					i != null && this._setupPrimitive(n, i);
				}
			}
			return i;
		});
	}
	_removeUnlitExtensionIfMToonExists() {
		this.parser.json.materials?.map((e, t) => {
			this._getMToonExtension(t) && e.extensions?.KHR_materials_unlit && delete e.extensions.KHR_materials_unlit;
		});
	}
	_getMToonExtension(t) {
		let n = this.parser.json.materials?.[t];
		if (n == null) return;
		let r = n.extensions?.[e.EXTENSION_NAME];
		if (r == null) return;
		let i = r.specVersion;
		if (kn.has(i)) return r;
	}
	_extendMaterialParams(e, t) {
		return U(this, null, function* () {
			delete t.metalness, delete t.roughness;
			let n = new Sn(this.parser, t);
			n.assignPrimitive("transparentWithZWrite", e.transparentWithZWrite), n.assignColor("shadeColorFactor", e.shadeColorFactor), n.assignTexture("shadeMultiplyTexture", e.shadeMultiplyTexture, !0), n.assignPrimitive("shadingShiftFactor", e.shadingShiftFactor), n.assignTexture("shadingShiftTexture", e.shadingShiftTexture, !0), n.assignPrimitive("shadingShiftTextureScale", e.shadingShiftTexture?.scale), n.assignPrimitive("shadingToonyFactor", e.shadingToonyFactor), n.assignPrimitive("giEqualizationFactor", e.giEqualizationFactor), n.assignColor("matcapFactor", e.matcapFactor), n.assignTexture("matcapTexture", e.matcapTexture, !0), n.assignColor("parametricRimColorFactor", e.parametricRimColorFactor), n.assignTexture("rimMultiplyTexture", e.rimMultiplyTexture, !0), n.assignPrimitive("rimLightingMixFactor", e.rimLightingMixFactor), n.assignPrimitive("parametricRimFresnelPowerFactor", e.parametricRimFresnelPowerFactor), n.assignPrimitive("parametricRimLiftFactor", e.parametricRimLiftFactor), n.assignPrimitive("outlineWidthMode", e.outlineWidthMode), n.assignPrimitive("outlineWidthFactor", e.outlineWidthFactor), n.assignTexture("outlineWidthMultiplyTexture", e.outlineWidthMultiplyTexture, !1), n.assignColor("outlineColorFactor", e.outlineColorFactor), n.assignPrimitive("outlineLightingMixFactor", e.outlineLightingMixFactor), n.assignTexture("uvAnimationMaskTexture", e.uvAnimationMaskTexture, !1), n.assignPrimitive("uvAnimationScrollXSpeedFactor", e.uvAnimationScrollXSpeedFactor), n.assignPrimitive("uvAnimationScrollYSpeedFactor", e.uvAnimationScrollYSpeedFactor), n.assignPrimitive("uvAnimationRotationSpeedFactor", e.uvAnimationRotationSpeedFactor), n.assignPrimitive("v0CompatShade", this.v0CompatShade), n.assignPrimitive("debugMode", this.debugMode), yield n.pending;
		});
	}
	_setupPrimitive(e, t) {
		let n = this._getMToonExtension(t);
		n && (e.renderOrder = this._parseRenderOrder(n) + this.renderOrderOffset, this._generateOutline(e), this._addToMaterialSet(e));
	}
	_shouldGenerateOutline(e) {
		return typeof e.outlineWidthMode == "string" && e.outlineWidthMode !== "none" && typeof e.outlineWidthFactor == "number" && e.outlineWidthFactor > 0;
	}
	_generateOutline(e) {
		let t = e.material;
		if (!(t instanceof ee) || !this._shouldGenerateOutline(t)) return;
		e.material = [t];
		let n = t.clone();
		n.name += " (Outline)", n.isOutline = !0, n.side = 1, e.material.push(n);
		let r = e.geometry, i = r.index ? r.index.count : r.attributes.position.count / 3;
		r.addGroup(0, i, 0), r.addGroup(0, i, 1);
	}
	_addToMaterialSet(e) {
		let t = e.material, n = /* @__PURE__ */ new Set();
		Array.isArray(t) ? t.forEach((e) => n.add(e)) : n.add(t);
		for (let e of n) this._mToonMaterialSet.add(e);
	}
	_parseRenderOrder(e) {
		return (e.transparentWithZWrite ? 0 : 19) + (e.renderQueueOffsetNumber ?? 0);
	}
};
An.EXTENSION_NAME = "VRMC_materials_mtoon";
var jn = An, Mn = (e, t, n) => new Promise((r, i) => {
	var a = (e) => {
		try {
			s(n.next(e));
		} catch (e) {
			i(e);
		}
	}, o = (e) => {
		try {
			s(n.throw(e));
		} catch (e) {
			i(e);
		}
	}, s = (e) => e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
	s((n = n.apply(e, t)).next());
}), Nn = class e {
	get name() {
		return e.EXTENSION_NAME;
	}
	constructor(e) {
		this.parser = e;
	}
	extendMaterialParams(e, t) {
		return Mn(this, null, function* () {
			let n = this._getHDREmissiveMultiplierExtension(e);
			n != null && (t.emissiveIntensity = n.emissiveMultiplier);
		});
	}
	_getHDREmissiveMultiplierExtension(t) {
		let n = this.parser.json.materials?.[t];
		if (n == null) return;
		let r = n.extensions?.[e.EXTENSION_NAME];
		if (r != null) return r;
	}
};
Nn.EXTENSION_NAME = "VRMC_materials_hdr_emissiveMultiplier";
var Pn = Nn, Fn = Object.defineProperty, In = Object.defineProperties, Ln = Object.getOwnPropertyDescriptors, Rn = Object.getOwnPropertySymbols, zn = Object.prototype.hasOwnProperty, Bn = Object.prototype.propertyIsEnumerable, Vn = (e, t, n) => t in e ? Fn(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, W = (e, t) => {
	for (var n in t ||= {}) zn.call(t, n) && Vn(e, n, t[n]);
	if (Rn) for (var n of Rn(t)) Bn.call(t, n) && Vn(e, n, t[n]);
	return e;
}, Hn = (e, t) => In(e, Ln(t)), Un = (e, t, n) => new Promise((r, i) => {
	var a = (e) => {
		try {
			s(n.next(e));
		} catch (e) {
			i(e);
		}
	}, o = (e) => {
		try {
			s(n.throw(e));
		} catch (e) {
			i(e);
		}
	}, s = (e) => e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
	s((n = n.apply(e, t)).next());
});
function G(e) {
	return e ** 2.2;
}
var Wn = class {
	get name() {
		return "VRMMaterialsV0CompatPlugin";
	}
	constructor(e) {
		this.parser = e, this._renderQueueMapTransparent = /* @__PURE__ */ new Map(), this._renderQueueMapTransparentZWrite = /* @__PURE__ */ new Map();
		let t = this.parser.json;
		t.extensionsUsed = t.extensionsUsed ?? [], t.extensionsUsed.indexOf("KHR_texture_transform") === -1 && t.extensionsUsed.push("KHR_texture_transform");
	}
	beforeRoot() {
		return Un(this, null, function* () {
			let e = this.parser.json, t = e.extensions?.VRM?.materialProperties;
			t && (this._populateRenderQueueMap(t), t.forEach((t, n) => {
				let r = e.materials?.[n];
				if (r != null) {
					if (t.shader === "VRM/MToon") {
						let i = this._parseV0MToonProperties(t, r);
						e.materials[n] = i;
					} else if (t.shader?.startsWith("VRM/Unlit")) {
						let i = this._parseV0UnlitProperties(t, r);
						e.materials[n] = i;
					} else t.shader;
				}
			}));
		});
	}
	_parseV0MToonProperties(e, t) {
		let n = e.keywordMap?._ALPHABLEND_ON ?? !1, r = e.floatProperties?._ZWrite === 1 && n, i = this._v0ParseRenderQueue(e), a = e.keywordMap?._ALPHATEST_ON ?? !1, o = n ? "BLEND" : a ? "MASK" : "OPAQUE", s = a ? e.floatProperties?._Cutoff ?? .5 : void 0, c = (e.floatProperties?._CullMode ?? 2) === 0, l = this._portTextureTransform(e), u = (e.vectorProperties?._Color ?? [
			1,
			1,
			1,
			1
		]).map((e, t) => t === 3 ? e : G(e)), d = e.textureProperties?._MainTex, f = d == null ? void 0 : {
			index: d,
			extensions: W({}, l)
		}, p = e.floatProperties?._BumpScale ?? 1, m = e.textureProperties?._BumpMap, g = m == null ? void 0 : {
			index: m,
			scale: p,
			extensions: W({}, l)
		}, _ = (e.vectorProperties?._EmissionColor ?? [
			0,
			0,
			0,
			1
		]).map(G), v = e.textureProperties?._EmissionMap, y = v == null ? void 0 : {
			index: v,
			extensions: W({}, l)
		}, b = (e.vectorProperties?._ShadeColor ?? [
			.97,
			.81,
			.86,
			1
		]).map(G), ee = e.textureProperties?._ShadeTexture, te = ee == null ? void 0 : {
			index: ee,
			extensions: W({}, l)
		}, x = e.floatProperties?._ShadeShift ?? 0, S = e.floatProperties?._ShadeToony ?? .9;
		S = h.lerp(S, 1, .5 + .5 * x), x = -x - (1 - S);
		let ne = e.floatProperties?._IndirectLightIntensity ?? .1, re = ne ? 1 - ne : void 0, C = e.textureProperties?._SphereAdd, ie = C == null ? void 0 : [
			1,
			1,
			1
		], ae = C == null ? void 0 : { index: C }, oe = e.floatProperties?._RimLightingMix ?? 0, se = e.textureProperties?._RimTexture, ce = se == null ? void 0 : {
			index: se,
			extensions: W({}, l)
		}, le = (e.vectorProperties?._RimColor ?? [
			0,
			0,
			0,
			1
		]).map(G), w = e.floatProperties?._RimFresnelPower ?? 1, ue = e.floatProperties?._RimLift ?? 0, de = [
			"none",
			"worldCoordinates",
			"screenCoordinates"
		][e.floatProperties?._OutlineWidthMode ?? 0], T = e.floatProperties?._OutlineWidth ?? 0;
		T = .01 * T;
		let fe = e.textureProperties?._OutlineWidthTexture, pe = fe == null ? void 0 : {
			index: fe,
			extensions: W({}, l)
		}, me = (e.vectorProperties?._OutlineColor ?? [
			0,
			0,
			0
		]).map(G), E = (e.floatProperties?._OutlineColorMode ?? 0) === 1 ? e.floatProperties?._OutlineLightingMix ?? 1 : 0, D = e.textureProperties?._UvAnimMaskTexture, O = D == null ? void 0 : {
			index: D,
			extensions: W({}, l)
		}, he = e.floatProperties?._UvAnimScrollX ?? 0, k = e.floatProperties?._UvAnimScrollY ?? 0;
		k != null && (k = -k);
		let ge = e.floatProperties?._UvAnimRotation ?? 0, _e = {
			specVersion: "1.0",
			transparentWithZWrite: r,
			renderQueueOffsetNumber: i,
			shadeColorFactor: b,
			shadeMultiplyTexture: te,
			shadingShiftFactor: x,
			shadingToonyFactor: S,
			giEqualizationFactor: re,
			matcapFactor: ie,
			matcapTexture: ae,
			rimLightingMixFactor: oe,
			rimMultiplyTexture: ce,
			parametricRimColorFactor: le,
			parametricRimFresnelPowerFactor: w,
			parametricRimLiftFactor: ue,
			outlineWidthMode: de,
			outlineWidthFactor: T,
			outlineWidthMultiplyTexture: pe,
			outlineColorFactor: me,
			outlineLightingMixFactor: E,
			uvAnimationMaskTexture: O,
			uvAnimationScrollXSpeedFactor: he,
			uvAnimationScrollYSpeedFactor: k,
			uvAnimationRotationSpeedFactor: ge
		};
		return Hn(W({}, t), {
			pbrMetallicRoughness: {
				baseColorFactor: u,
				baseColorTexture: f
			},
			normalTexture: g,
			emissiveTexture: y,
			emissiveFactor: _,
			alphaMode: o,
			alphaCutoff: s,
			doubleSided: c,
			extensions: { VRMC_materials_mtoon: _e }
		});
	}
	_parseV0UnlitProperties(e, t) {
		let n = e.shader === "VRM/UnlitTransparentZWrite", r = e.shader === "VRM/UnlitTransparent" || n, i = this._v0ParseRenderQueue(e), a = e.shader === "VRM/UnlitCutout", o = r ? "BLEND" : a ? "MASK" : "OPAQUE", s = a ? e.floatProperties?._Cutoff ?? .5 : void 0, c = this._portTextureTransform(e), l = (e.vectorProperties?._Color ?? [
			1,
			1,
			1,
			1
		]).map(G), u = e.textureProperties?._MainTex, d = u == null ? void 0 : {
			index: u,
			extensions: W({}, c)
		}, f = {
			specVersion: "1.0",
			transparentWithZWrite: n,
			renderQueueOffsetNumber: i,
			shadeColorFactor: l,
			shadeMultiplyTexture: d
		};
		return Hn(W({}, t), {
			pbrMetallicRoughness: {
				baseColorFactor: l,
				baseColorTexture: d
			},
			alphaMode: o,
			alphaCutoff: s,
			extensions: { VRMC_materials_mtoon: f }
		});
	}
	_portTextureTransform(e) {
		let t = e.vectorProperties?._MainTex;
		if (t == null) return {};
		let n = [t?.[0] ?? 0, t?.[1] ?? 0], r = [t?.[2] ?? 1, t?.[3] ?? 1];
		return n[1] = 1 - r[1] - n[1], { KHR_texture_transform: {
			offset: n,
			scale: r
		} };
	}
	_v0ParseRenderQueue(e) {
		let t = e.shader === "VRM/UnlitTransparentZWrite", n = e.keywordMap?._ALPHABLEND_ON != null || e.shader === "VRM/UnlitTransparent" || t, r = e.floatProperties?._ZWrite === 1 || t, i = 0;
		if (n) {
			let t = e.renderQueue;
			t != null && (i = r ? this._renderQueueMapTransparentZWrite.get(t) : this._renderQueueMapTransparent.get(t));
		}
		return i;
	}
	_populateRenderQueueMap(e) {
		let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		e.forEach((e) => {
			let r = e.shader === "VRM/UnlitTransparentZWrite", i = e.keywordMap?._ALPHABLEND_ON != null || e.shader === "VRM/UnlitTransparent" || r, a = e.floatProperties?._ZWrite === 1 || r;
			if (i) {
				let r = e.renderQueue;
				r != null && (a ? n.add(r) : t.add(r));
			}
		}), t.size, n.size, Array.from(t).sort().forEach((e, n) => {
			let r = Math.min(Math.max(n - t.size + 1, -9), 0);
			this._renderQueueMapTransparent.set(e, r);
		}), Array.from(n).sort().forEach((e, t) => {
			let n = Math.min(Math.max(t, 0), 9);
			this._renderQueueMapTransparentZWrite.set(e, n);
		});
	}
}, Gn = (e, t, n) => new Promise((r, i) => {
	var a = (e) => {
		try {
			s(n.next(e));
		} catch (e) {
			i(e);
		}
	}, o = (e) => {
		try {
			s(n.throw(e));
		} catch (e) {
			i(e);
		}
	}, s = (e) => e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
	s((n = n.apply(e, t)).next());
}), K = new u(), Kn = class extends d {
	constructor(t) {
		super(), this._attrPosition = new c(new Float32Array([
			0,
			0,
			0,
			0,
			0,
			0
		]), 3), this._attrPosition.setUsage(n);
		let r = new e();
		r.setAttribute("position", this._attrPosition);
		let i = new f({
			color: 16711935,
			depthTest: !1,
			depthWrite: !1
		});
		this._line = new p(r, i), this.add(this._line), this.constraint = t;
	}
	updateMatrixWorld(e) {
		K.setFromMatrixPosition(this.constraint.destination.matrixWorld), this._attrPosition.setXYZ(0, K.x, K.y, K.z), this.constraint.source && K.setFromMatrixPosition(this.constraint.source.matrixWorld), this._attrPosition.setXYZ(1, K.x, K.y, K.z), this._attrPosition.needsUpdate = !0, super.updateMatrixWorld(e);
	}
};
function qn(e, t) {
	return t.set(e.elements[12], e.elements[13], e.elements[14]);
}
var Jn = new u(), Yn = new u();
function Xn(e, t) {
	return e.decompose(Jn, t, Yn), t;
}
function Zn(e) {
	return e.invert ? e.invert() : e.inverse(), e;
}
var Qn = class {
	constructor(e, t) {
		this.destination = e, this.source = t, this.weight = 1;
	}
}, $n = new u(), er = new u(), tr = new u(), nr = new g(), rr = new g(), ir = new g(), ar = class extends Qn {
	get aimAxis() {
		return this._aimAxis;
	}
	set aimAxis(e) {
		this._aimAxis = e, this._v3AimAxis.set(e === "PositiveX" ? 1 : e === "NegativeX" ? -1 : 0, e === "PositiveY" ? 1 : e === "NegativeY" ? -1 : 0, e === "PositiveZ" ? 1 : e === "NegativeZ" ? -1 : 0);
	}
	get dependencies() {
		let e = /* @__PURE__ */ new Set([this.source]);
		return this.destination.parent && e.add(this.destination.parent), e;
	}
	constructor(e, t) {
		super(e, t), this._aimAxis = "PositiveX", this._v3AimAxis = new u(1, 0, 0), this._dstRestQuat = new g();
	}
	setInitState() {
		this._dstRestQuat.copy(this.destination.quaternion);
	}
	update() {
		this.destination.updateWorldMatrix(!0, !1), this.source.updateWorldMatrix(!0, !1);
		let e = nr.identity(), t = rr.identity();
		this.destination.parent && (Xn(this.destination.parent.matrixWorld, e), Zn(t.copy(e)));
		let n = $n.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(e), r = qn(this.source.matrixWorld, er).sub(qn(this.destination.matrixWorld, tr)).normalize(), i = ir.setFromUnitVectors(n, r).premultiply(t).multiply(e).multiply(this._dstRestQuat);
		this.destination.quaternion.copy(this._dstRestQuat).slerp(i, this.weight);
	}
};
function or(e, t) {
	let n = [e], r = e.parent;
	for (; r !== null;) n.unshift(r), r = r.parent;
	n.forEach((e) => {
		t(e);
	});
}
var sr = class {
	constructor() {
		this._constraints = /* @__PURE__ */ new Set(), this._objectConstraintsMap = /* @__PURE__ */ new Map();
	}
	get constraints() {
		return this._constraints;
	}
	addConstraint(e) {
		this._constraints.add(e);
		let t = this._objectConstraintsMap.get(e.destination);
		t ?? (t = /* @__PURE__ */ new Set(), this._objectConstraintsMap.set(e.destination, t)), t.add(e);
	}
	deleteConstraint(e) {
		this._constraints.delete(e), this._objectConstraintsMap.get(e.destination).delete(e);
	}
	setInitState() {
		let e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
		for (let n of this._constraints) this._processConstraint(n, e, t, (e) => e.setInitState());
	}
	update() {
		let e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
		for (let n of this._constraints) this._processConstraint(n, e, t, (e) => e.update());
	}
	_processConstraint(e, t, n, r) {
		if (n.has(e)) return;
		if (t.has(e)) throw Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");
		t.add(e);
		let i = e.dependencies;
		for (let e of i) or(e, (e) => {
			let i = this._objectConstraintsMap.get(e);
			if (i) for (let e of i) this._processConstraint(e, t, n, r);
		});
		r(e), n.add(e);
	}
}, cr = new g(), lr = new g(), ur = class extends Qn {
	get dependencies() {
		return /* @__PURE__ */ new Set([this.source]);
	}
	constructor(e, t) {
		super(e, t), this._dstRestQuat = new g(), this._invSrcRestQuat = new g();
	}
	setInitState() {
		this._dstRestQuat.copy(this.destination.quaternion), Zn(this._invSrcRestQuat.copy(this.source.quaternion));
	}
	update() {
		let e = cr.copy(this._invSrcRestQuat).multiply(this.source.quaternion), t = lr.copy(this._dstRestQuat).multiply(e);
		this.destination.quaternion.copy(this._dstRestQuat).slerp(t, this.weight);
	}
}, dr = new u(), fr = new g(), pr = new g(), mr = class extends Qn {
	get rollAxis() {
		return this._rollAxis;
	}
	set rollAxis(e) {
		this._rollAxis = e, this._v3RollAxis.set(+(e === "X"), +(e === "Y"), +(e === "Z"));
	}
	get dependencies() {
		return /* @__PURE__ */ new Set([this.source]);
	}
	constructor(e, t) {
		super(e, t), this._rollAxis = "X", this._v3RollAxis = new u(1, 0, 0), this._dstRestQuat = new g(), this._invDstRestQuat = new g(), this._invSrcRestQuatMulDstRestQuat = new g();
	}
	setInitState() {
		this._dstRestQuat.copy(this.destination.quaternion), Zn(this._invDstRestQuat.copy(this._dstRestQuat)), Zn(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat);
	}
	update() {
		let e = fr.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat), t = dr.copy(this._v3RollAxis).applyQuaternion(e), n = pr.setFromUnitVectors(t, this._v3RollAxis).premultiply(this._dstRestQuat).multiply(e);
		this.destination.quaternion.copy(this._dstRestQuat).slerp(n, this.weight);
	}
}, hr = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]), gr = class e {
	get name() {
		return e.EXTENSION_NAME;
	}
	constructor(e, t) {
		this.parser = e, this.helperRoot = t?.helperRoot;
	}
	afterRoot(e) {
		return Gn(this, null, function* () {
			e.userData.vrmNodeConstraintManager = yield this._import(e);
		});
	}
	_import(t) {
		return Gn(this, null, function* () {
			let n = this.parser.json;
			if (n.extensionsUsed?.indexOf(e.EXTENSION_NAME) === -1) return null;
			let r = new sr(), i = yield this.parser.getDependencies("node");
			return i.forEach((t, a) => {
				let o = n.nodes[a]?.extensions?.[e.EXTENSION_NAME];
				if (o == null) return;
				let s = o.specVersion;
				if (!hr.has(s)) return;
				let c = o.constraint;
				if (c.roll != null) {
					let e = this._importRollConstraint(t, i, c.roll);
					r.addConstraint(e);
				} else if (c.aim != null) {
					let e = this._importAimConstraint(t, i, c.aim);
					r.addConstraint(e);
				} else if (c.rotation != null) {
					let e = this._importRotationConstraint(t, i, c.rotation);
					r.addConstraint(e);
				}
			}), t.scene.updateMatrixWorld(), r.setInitState(), r;
		});
	}
	_importRollConstraint(e, t, n) {
		let { source: r, rollAxis: i, weight: a } = n, o = t[r], s = new mr(e, o);
		if (i != null && (s.rollAxis = i), a != null && (s.weight = a), this.helperRoot) {
			let e = new Kn(s);
			this.helperRoot.add(e);
		}
		return s;
	}
	_importAimConstraint(e, t, n) {
		let { source: r, aimAxis: i, weight: a } = n, o = t[r], s = new ar(e, o);
		if (i != null && (s.aimAxis = i), a != null && (s.weight = a), this.helperRoot) {
			let e = new Kn(s);
			this.helperRoot.add(e);
		}
		return s;
	}
	_importRotationConstraint(e, t, n) {
		let { source: r, weight: i } = n, a = t[r], o = new ur(e, a);
		if (i != null && (o.weight = i), this.helperRoot) {
			let e = new Kn(o);
			this.helperRoot.add(e);
		}
		return o;
	}
};
gr.EXTENSION_NAME = "VRMC_node_constraint";
var _r = gr, vr = (e, t, n) => new Promise((r, i) => {
	var a = (e) => {
		try {
			s(n.next(e));
		} catch (e) {
			i(e);
		}
	}, o = (e) => {
		try {
			s(n.throw(e));
		} catch (e) {
			i(e);
		}
	}, s = (e) => e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
	s((n = n.apply(e, t)).next());
}), yr = class {}, br = new u(), q = new u(), xr = class extends yr {
	get type() {
		return "capsule";
	}
	constructor(e) {
		super(), this.offset = e?.offset ?? new u(0, 0, 0), this.tail = e?.tail ?? new u(0, 0, 0), this.radius = e?.radius ?? 0, this.inside = e?.inside ?? !1;
	}
	calculateCollision(e, t, n, r) {
		br.setFromMatrixPosition(e), q.subVectors(this.tail, this.offset).applyMatrix4(e), q.sub(br);
		let i = q.lengthSq();
		r.copy(t).sub(br);
		let a = q.dot(r);
		a <= 0 || (i <= a || q.multiplyScalar(a / i), r.sub(q));
		let o = r.length(), s = this.inside ? this.radius - n - o : o - n - this.radius;
		return s < 0 && (r.multiplyScalar(1 / o), this.inside && r.negate()), s;
	}
}, Sr = new u(), Cr = new C(), wr = class extends yr {
	get type() {
		return "plane";
	}
	constructor(e) {
		super(), this.offset = e?.offset ?? new u(0, 0, 0), this.normal = e?.normal ?? new u(0, 0, 1);
	}
	calculateCollision(e, t, n, r) {
		r.setFromMatrixPosition(e), r.negate().add(t), Cr.getNormalMatrix(e), Sr.copy(this.normal).applyNormalMatrix(Cr).normalize();
		let i = r.dot(Sr) - n;
		return r.copy(Sr), i;
	}
}, Tr = new u(), Er = class extends yr {
	get type() {
		return "sphere";
	}
	constructor(e) {
		super(), this.offset = e?.offset ?? new u(0, 0, 0), this.radius = e?.radius ?? 0, this.inside = e?.inside ?? !1;
	}
	calculateCollision(e, t, n, r) {
		r.subVectors(t, Tr.setFromMatrixPosition(e));
		let i = r.length(), a = this.inside ? this.radius - n - i : i - n - this.radius;
		return a < 0 && (r.multiplyScalar(1 / i), this.inside && r.negate()), a;
	}
}, J = new u(), Dr = class extends e {
	constructor(e) {
		super(), this.worldScale = 1, this._currentRadius = 0, this._currentOffset = new u(), this._currentTail = new u(), this._shape = e, this._attrPos = new c(/* @__PURE__ */ new Float32Array(396), 3), this.setAttribute("position", this._attrPos), this._attrIndex = new c(/* @__PURE__ */ new Uint16Array(264), 1), this.setIndex(this._attrIndex), this._buildIndex(), this.update();
	}
	update() {
		let e = !1, t = this._shape.radius / this.worldScale;
		this._currentRadius !== t && (this._currentRadius = t, e = !0), this._currentOffset.equals(this._shape.offset) || (this._currentOffset.copy(this._shape.offset), e = !0);
		let n = J.copy(this._shape.tail).divideScalar(this.worldScale);
		this._currentTail.distanceToSquared(n) > 1e-10 && (this._currentTail.copy(n), e = !0), e && this._buildPosition();
	}
	_buildPosition() {
		J.copy(this._currentTail).sub(this._currentOffset);
		let e = J.length() / this._currentRadius;
		for (let t = 0; t <= 16; t++) {
			let n = t / 16 * Math.PI;
			this._attrPos.setXYZ(t, -Math.sin(n), -Math.cos(n), 0), this._attrPos.setXYZ(17 + t, e + Math.sin(n), Math.cos(n), 0), this._attrPos.setXYZ(34 + t, -Math.sin(n), 0, -Math.cos(n)), this._attrPos.setXYZ(51 + t, e + Math.sin(n), 0, Math.cos(n));
		}
		for (let t = 0; t < 32; t++) {
			let n = t / 16 * Math.PI;
			this._attrPos.setXYZ(68 + t, 0, Math.sin(n), Math.cos(n)), this._attrPos.setXYZ(100 + t, e, Math.sin(n), Math.cos(n));
		}
		let t = Math.atan2(J.y, Math.sqrt(J.x * J.x + J.z * J.z)), n = -Math.atan2(J.z, J.x);
		this.rotateZ(t), this.rotateY(n), this.scale(this._currentRadius, this._currentRadius, this._currentRadius), this.translate(this._currentOffset.x, this._currentOffset.y, this._currentOffset.z), this._attrPos.needsUpdate = !0;
	}
	_buildIndex() {
		for (let e = 0; e < 34; e++) {
			let t = (e + 1) % 34;
			this._attrIndex.setXY(e * 2, e, t), this._attrIndex.setXY(68 + e * 2, 34 + e, 34 + t);
		}
		for (let e = 0; e < 32; e++) {
			let t = (e + 1) % 32;
			this._attrIndex.setXY(136 + e * 2, 68 + e, 68 + t), this._attrIndex.setXY(200 + e * 2, 100 + e, 100 + t);
		}
		this._attrIndex.needsUpdate = !0;
	}
}, Or = class extends e {
	constructor(e) {
		super(), this.worldScale = 1, this._currentOffset = new u(), this._currentNormal = new u(), this._shape = e, this._attrPos = new c(/* @__PURE__ */ new Float32Array(18), 3), this.setAttribute("position", this._attrPos), this._attrIndex = new c(/* @__PURE__ */ new Uint16Array(10), 1), this.setIndex(this._attrIndex), this._buildIndex(), this.update();
	}
	update() {
		let e = !1;
		this._currentOffset.equals(this._shape.offset) || (this._currentOffset.copy(this._shape.offset), e = !0), this._currentNormal.equals(this._shape.normal) || (this._currentNormal.copy(this._shape.normal), e = !0), e && this._buildPosition();
	}
	_buildPosition() {
		this._attrPos.setXYZ(0, -.5, -.5, 0), this._attrPos.setXYZ(1, .5, -.5, 0), this._attrPos.setXYZ(2, .5, .5, 0), this._attrPos.setXYZ(3, -.5, .5, 0), this._attrPos.setXYZ(4, 0, 0, 0), this._attrPos.setXYZ(5, 0, 0, .25), this.translate(this._currentOffset.x, this._currentOffset.y, this._currentOffset.z), this.lookAt(this._currentNormal), this._attrPos.needsUpdate = !0;
	}
	_buildIndex() {
		this._attrIndex.setXY(0, 0, 1), this._attrIndex.setXY(2, 1, 2), this._attrIndex.setXY(4, 2, 3), this._attrIndex.setXY(6, 3, 0), this._attrIndex.setXY(8, 4, 5), this._attrIndex.needsUpdate = !0;
	}
}, kr = class extends e {
	constructor(e) {
		super(), this.worldScale = 1, this._currentRadius = 0, this._currentOffset = new u(), this._shape = e, this._attrPos = new c(/* @__PURE__ */ new Float32Array(288), 3), this.setAttribute("position", this._attrPos), this._attrIndex = new c(/* @__PURE__ */ new Uint16Array(192), 1), this.setIndex(this._attrIndex), this._buildIndex(), this.update();
	}
	update() {
		let e = !1, t = this._shape.radius / this.worldScale;
		this._currentRadius !== t && (this._currentRadius = t, e = !0), this._currentOffset.equals(this._shape.offset) || (this._currentOffset.copy(this._shape.offset), e = !0), e && this._buildPosition();
	}
	_buildPosition() {
		for (let e = 0; e < 32; e++) {
			let t = e / 16 * Math.PI;
			this._attrPos.setXYZ(e, Math.cos(t), Math.sin(t), 0), this._attrPos.setXYZ(32 + e, 0, Math.cos(t), Math.sin(t)), this._attrPos.setXYZ(64 + e, Math.sin(t), 0, Math.cos(t));
		}
		this.scale(this._currentRadius, this._currentRadius, this._currentRadius), this.translate(this._currentOffset.x, this._currentOffset.y, this._currentOffset.z), this._attrPos.needsUpdate = !0;
	}
	_buildIndex() {
		for (let e = 0; e < 32; e++) {
			let t = (e + 1) % 32;
			this._attrIndex.setXY(e * 2, e, t), this._attrIndex.setXY(64 + e * 2, 32 + e, 32 + t), this._attrIndex.setXY(128 + e * 2, 64 + e, 64 + t);
		}
		this._attrIndex.needsUpdate = !0;
	}
}, Ar = new u(), jr = class extends d {
	constructor(e) {
		if (super(), this.matrixAutoUpdate = !1, this.collider = e, this.collider.shape instanceof Er) this._geometry = new kr(this.collider.shape);
		else if (this.collider.shape instanceof xr) this._geometry = new Dr(this.collider.shape);
		else if (this.collider.shape instanceof wr) this._geometry = new Or(this.collider.shape);
		else throw Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");
		let t = new f({
			color: 16711935,
			depthTest: !1,
			depthWrite: !1
		});
		this._line = new m(this._geometry, t), this.add(this._line);
	}
	dispose() {
		this._geometry.dispose();
	}
	updateMatrixWorld(e) {
		this.collider.updateWorldMatrix(!0, !1), this.matrix.copy(this.collider.matrixWorld);
		let t = this.matrix.elements;
		this._geometry.worldScale = Ar.set(t[0], t[1], t[2]).length(), this._geometry.update(), super.updateMatrixWorld(e);
	}
}, Mr = class extends e {
	constructor(e) {
		super(), this.worldScale = 1, this._currentRadius = 0, this._currentTail = new u(), this._springBone = e, this._attrPos = new c(/* @__PURE__ */ new Float32Array(294), 3), this.setAttribute("position", this._attrPos), this._attrIndex = new c(/* @__PURE__ */ new Uint16Array(194), 1), this.setIndex(this._attrIndex), this._buildIndex(), this.update();
	}
	update() {
		let e = !1, t = this._springBone.settings.hitRadius / this.worldScale;
		this._currentRadius !== t && (this._currentRadius = t, e = !0), this._currentTail.equals(this._springBone.initialLocalChildPosition) || (this._currentTail.copy(this._springBone.initialLocalChildPosition), e = !0), e && this._buildPosition();
	}
	_buildPosition() {
		for (let e = 0; e < 32; e++) {
			let t = e / 16 * Math.PI;
			this._attrPos.setXYZ(e, Math.cos(t), Math.sin(t), 0), this._attrPos.setXYZ(32 + e, 0, Math.cos(t), Math.sin(t)), this._attrPos.setXYZ(64 + e, Math.sin(t), 0, Math.cos(t));
		}
		this.scale(this._currentRadius, this._currentRadius, this._currentRadius), this.translate(this._currentTail.x, this._currentTail.y, this._currentTail.z), this._attrPos.setXYZ(96, 0, 0, 0), this._attrPos.setXYZ(97, this._currentTail.x, this._currentTail.y, this._currentTail.z), this._attrPos.needsUpdate = !0;
	}
	_buildIndex() {
		for (let e = 0; e < 32; e++) {
			let t = (e + 1) % 32;
			this._attrIndex.setXY(e * 2, e, t), this._attrIndex.setXY(64 + e * 2, 32 + e, 32 + t), this._attrIndex.setXY(128 + e * 2, 64 + e, 64 + t);
		}
		this._attrIndex.setXY(192, 96, 97), this._attrIndex.needsUpdate = !0;
	}
}, Nr = new u(), Pr = class extends d {
	constructor(e) {
		super(), this.matrixAutoUpdate = !1, this.springBone = e, this._geometry = new Mr(this.springBone);
		let t = new f({
			color: 16776960,
			depthTest: !1,
			depthWrite: !1
		});
		this._line = new m(this._geometry, t), this.add(this._line);
	}
	dispose() {
		this._geometry.dispose();
	}
	updateMatrixWorld(e) {
		this.springBone.bone.updateWorldMatrix(!0, !1), this.matrix.copy(this.springBone.bone.matrixWorld);
		let t = this.matrix.elements;
		this._geometry.worldScale = Nr.set(t[0], t[1], t[2]).length(), this._geometry.update(), super.updateMatrixWorld(e);
	}
}, Fr = class extends b {
	constructor(e) {
		super(), this.colliderMatrix = new _(), this.shape = e;
	}
	updateWorldMatrix(e, t) {
		super.updateWorldMatrix(e, t), Ir(this.colliderMatrix, this.matrixWorld, this.shape.offset);
	}
};
function Ir(e, t, n) {
	let r = t.elements;
	e.copy(t), n && (e.elements[12] = r[0] * n.x + r[4] * n.y + r[8] * n.z + r[12], e.elements[13] = r[1] * n.x + r[5] * n.y + r[9] * n.z + r[13], e.elements[14] = r[2] * n.x + r[6] * n.y + r[10] * n.z + r[14]);
}
var Lr = new _();
function Rr(e) {
	return e.invert ? e.invert() : e.getInverse(Lr.copy(e)), e;
}
var zr = class {
	constructor(e) {
		this._inverseCache = new _(), this._shouldUpdateInverse = !0, this.matrix = e;
		let t = { set: (e, t, n) => (this._shouldUpdateInverse = !0, e[t] = n, !0) };
		this._originalElements = e.elements, e.elements = new Proxy(e.elements, t);
	}
	get inverse() {
		return this._shouldUpdateInverse &&= (Rr(this._inverseCache.copy(this.matrix)), !1), this._inverseCache;
	}
	revert() {
		this.matrix.elements = this._originalElements;
	}
}, Br = new _(), Y = new u(), X = new u(), Z = new u(), Q = new u(), Vr = new _(), Hr = class {
	constructor(e, t, n = {}, r = []) {
		this._currentTail = new u(), this._prevTail = new u(), this._boneAxis = new u(), this._worldSpaceBoneLength = 0, this._center = null, this._initialLocalMatrix = new _(), this._initialLocalRotation = new g(), this._initialLocalChildPosition = new u(), this.bone = e, this.bone.matrixAutoUpdate = !1, this.child = t, this.settings = {
			hitRadius: n.hitRadius ?? 0,
			stiffness: n.stiffness ?? 1,
			gravityPower: n.gravityPower ?? 0,
			gravityDir: n.gravityDir?.clone() ?? new u(0, -1, 0),
			dragForce: n.dragForce ?? .4
		}, this.colliderGroups = r;
	}
	get dependencies() {
		let e = /* @__PURE__ */ new Set(), t = this.bone.parent;
		t && e.add(t);
		for (let t = 0; t < this.colliderGroups.length; t++) for (let n = 0; n < this.colliderGroups[t].colliders.length; n++) e.add(this.colliderGroups[t].colliders[n]);
		return e;
	}
	get center() {
		return this._center;
	}
	set center(e) {
		this._center?.userData.inverseCacheProxy && (this._center.userData.inverseCacheProxy.revert(), delete this._center.userData.inverseCacheProxy), this._center = e, this._center && (this._center.userData.inverseCacheProxy || (this._center.userData.inverseCacheProxy = new zr(this._center.matrixWorld)));
	}
	get initialLocalChildPosition() {
		return this._initialLocalChildPosition;
	}
	get _parentMatrixWorld() {
		return this.bone.parent ? this.bone.parent.matrixWorld : Br;
	}
	setInitState() {
		this._initialLocalMatrix.copy(this.bone.matrix), this._initialLocalRotation.copy(this.bone.quaternion), this.child ? this._initialLocalChildPosition.copy(this.child.position) : this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);
		let e = this._getMatrixWorldToCenter();
		this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(e), this._prevTail.copy(this._currentTail), this._boneAxis.copy(this._initialLocalChildPosition).normalize();
	}
	reset() {
		this.bone.quaternion.copy(this._initialLocalRotation), this.bone.updateMatrix(), this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);
		let e = this._getMatrixWorldToCenter();
		this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(e), this._prevTail.copy(this._currentTail);
	}
	update(e) {
		if (e <= 0) return;
		this._calcWorldSpaceBoneLength();
		let t = X.copy(this._boneAxis).transformDirection(this._initialLocalMatrix).transformDirection(this._parentMatrixWorld);
		Q.copy(this._currentTail).add(Y.subVectors(this._currentTail, this._prevTail).multiplyScalar(1 - this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(t, this.settings.stiffness * e).addScaledVector(this.settings.gravityDir, this.settings.gravityPower * e), Z.setFromMatrixPosition(this.bone.matrixWorld), Q.sub(Z).normalize().multiplyScalar(this._worldSpaceBoneLength).add(Z), this._collision(Q), this._prevTail.copy(this._currentTail), this._currentTail.copy(Q).applyMatrix4(this._getMatrixWorldToCenter());
		let n = Vr.multiplyMatrices(this._parentMatrixWorld, this._initialLocalMatrix).invert();
		this.bone.quaternion.setFromUnitVectors(this._boneAxis, Y.copy(Q).applyMatrix4(n).normalize()).premultiply(this._initialLocalRotation), this.bone.updateMatrix(), this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld, this.bone.matrix);
	}
	_collision(e) {
		for (let t = 0; t < this.colliderGroups.length; t++) for (let n = 0; n < this.colliderGroups[t].colliders.length; n++) {
			let r = this.colliderGroups[t].colliders[n], i = r.shape.calculateCollision(r.colliderMatrix, e, this.settings.hitRadius, Y);
			if (i < 0) {
				e.addScaledVector(Y, -i), e.sub(Z);
				let t = e.length();
				e.multiplyScalar(this._worldSpaceBoneLength / t).add(Z);
			}
		}
	}
	_calcWorldSpaceBoneLength() {
		Y.setFromMatrixPosition(this.bone.matrixWorld), this.child ? X.setFromMatrixPosition(this.child.matrixWorld) : (X.copy(this._initialLocalChildPosition), X.applyMatrix4(this.bone.matrixWorld)), this._worldSpaceBoneLength = Y.sub(X).length();
	}
	_getMatrixCenterToWorld() {
		return this._center ? this._center.matrixWorld : Br;
	}
	_getMatrixWorldToCenter() {
		return this._center ? this._center.userData.inverseCacheProxy.inverse : Br;
	}
};
function Ur(e, t) {
	let n = [], r = e;
	for (; r !== null;) n.unshift(r), r = r.parent;
	n.forEach((e) => {
		t(e);
	});
}
function Wr(e, t) {
	e.children.forEach((e) => {
		t(e) || Wr(e, t);
	});
}
function Gr(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let r = n;
		do {
			let n = (t.get(r) ?? 0) + 1;
			if (n === e.size) return r;
			t.set(r, n), r = r.parent;
		} while (r !== null);
	}
	return null;
}
var Kr = class {
	constructor() {
		this._joints = /* @__PURE__ */ new Set(), this._sortedJoints = [], this._hasWarnedCircularDependency = !1, this._ancestors = [], this._objectSpringBonesMap = /* @__PURE__ */ new Map(), this._isSortedJointsDirty = !1, this._relevantChildrenUpdated = this._relevantChildrenUpdated.bind(this);
	}
	get joints() {
		return this._joints;
	}
	get springBones() {
		return this._joints;
	}
	get colliderGroups() {
		let e = /* @__PURE__ */ new Set();
		return this._joints.forEach((t) => {
			t.colliderGroups.forEach((t) => {
				e.add(t);
			});
		}), Array.from(e);
	}
	get colliders() {
		let e = /* @__PURE__ */ new Set();
		return this.colliderGroups.forEach((t) => {
			t.colliders.forEach((t) => {
				e.add(t);
			});
		}), Array.from(e);
	}
	addJoint(e) {
		this._joints.add(e);
		let t = this._objectSpringBonesMap.get(e.bone);
		t ?? (t = /* @__PURE__ */ new Set(), this._objectSpringBonesMap.set(e.bone, t)), t.add(e), this._isSortedJointsDirty = !0;
	}
	addSpringBone(e) {
		this.addJoint(e);
	}
	deleteJoint(e) {
		this._joints.delete(e), this._objectSpringBonesMap.get(e.bone).delete(e), this._isSortedJointsDirty = !0;
	}
	deleteSpringBone(e) {
		this.deleteJoint(e);
	}
	setInitState() {
		this._sortJoints();
		for (let e = 0; e < this._sortedJoints.length; e++) {
			let t = this._sortedJoints[e];
			t.bone.updateMatrix(), t.bone.updateWorldMatrix(!1, !1), t.setInitState();
		}
	}
	reset() {
		this._sortJoints();
		for (let e = 0; e < this._sortedJoints.length; e++) {
			let t = this._sortedJoints[e];
			t.bone.updateMatrix(), t.bone.updateWorldMatrix(!1, !1), t.reset();
		}
	}
	update(e) {
		this._sortJoints();
		for (let e = 0; e < this._ancestors.length; e++) this._ancestors[e].updateWorldMatrix(e === 0, !1);
		for (let t = 0; t < this._sortedJoints.length; t++) {
			let n = this._sortedJoints[t];
			n.bone.updateMatrix(), n.bone.updateWorldMatrix(!1, !1), n.update(e), Wr(n.bone, this._relevantChildrenUpdated);
		}
	}
	_sortJoints() {
		if (!this._isSortedJointsDirty) return;
		let e = [], t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
		for (let i of this._joints) this._insertJointSort(i, t, n, e, r);
		this._sortedJoints = e;
		let i = Gr(r);
		this._ancestors = [], i && (this._ancestors.push(i), Wr(i, (e) => (this._objectSpringBonesMap.get(e)?.size ?? 0) > 0 || (this._ancestors.push(e), !1))), this._isSortedJointsDirty = !1;
	}
	_insertJointSort(e, t, n, r, i) {
		if (n.has(e)) return;
		if (t.has(e)) {
			this._hasWarnedCircularDependency ||= !0;
			return;
		}
		t.add(e);
		let a = e.dependencies;
		for (let e of a) {
			let a = !1, o = null;
			Ur(e, (e) => {
				let s = this._objectSpringBonesMap.get(e);
				if (s) for (let e of s) a = !0, this._insertJointSort(e, t, n, r, i);
				else a || (o = e);
			}), o && i.add(o);
		}
		r.push(e), n.add(e);
	}
	_relevantChildrenUpdated(e) {
		return (this._objectSpringBonesMap.get(e)?.size ?? 0) > 0 || (e.updateWorldMatrix(!1, !1), !1);
	}
}, qr = "VRMC_springBone_extended_collider", Jr = /* @__PURE__ */ new Set(["1.0", "1.0-beta"]), Yr = /* @__PURE__ */ new Set(["1.0"]), Xr = class e {
	get name() {
		return e.EXTENSION_NAME;
	}
	constructor(e, t) {
		this.parser = e, this.jointHelperRoot = t?.jointHelperRoot, this.colliderHelperRoot = t?.colliderHelperRoot, this.useExtendedColliders = t?.useExtendedColliders ?? !0;
	}
	afterRoot(e) {
		return vr(this, null, function* () {
			e.userData.vrmSpringBoneManager = yield this._import(e);
		});
	}
	_import(e) {
		return vr(this, null, function* () {
			return (yield this._v1Import(e)) ?? (yield this._v0Import(e)) ?? null;
		});
	}
	_v1Import(t) {
		return vr(this, null, function* () {
			var n;
			let r = t.parser.json;
			if (r.extensionsUsed?.indexOf(e.EXTENSION_NAME) === -1) return null;
			let i = new Kr(), a = yield t.parser.getDependencies("node"), o = r.extensions?.[e.EXTENSION_NAME];
			if (!o) return null;
			let s = o.specVersion;
			if (!Jr.has(s)) return null;
			let c = o.colliders?.map((e, t) => {
				let n = a[e.node];
				if (n == null) return null;
				let r = e.shape, i = e.extensions?.[qr];
				if (this.useExtendedColliders && i != null) {
					let e = i.specVersion;
					if (Yr.has(e)) {
						let e = i.shape;
						if (e.sphere) return this._importSphereCollider(n, {
							offset: new u().fromArray(e.sphere.offset ?? [
								0,
								0,
								0
							]),
							radius: e.sphere.radius ?? 0,
							inside: e.sphere.inside ?? !1
						});
						if (e.capsule) return this._importCapsuleCollider(n, {
							offset: new u().fromArray(e.capsule.offset ?? [
								0,
								0,
								0
							]),
							radius: e.capsule.radius ?? 0,
							tail: new u().fromArray(e.capsule.tail ?? [
								0,
								0,
								0
							]),
							inside: e.capsule.inside ?? !1
						});
						if (e.plane) return this._importPlaneCollider(n, {
							offset: new u().fromArray(e.plane.offset ?? [
								0,
								0,
								0
							]),
							normal: new u().fromArray(e.plane.normal ?? [
								0,
								0,
								1
							])
						});
					}
				}
				if (r.sphere) return this._importSphereCollider(n, {
					offset: new u().fromArray(r.sphere.offset ?? [
						0,
						0,
						0
					]),
					radius: r.sphere.radius ?? 0,
					inside: !1
				});
				if (r.capsule) return this._importCapsuleCollider(n, {
					offset: new u().fromArray(r.capsule.offset ?? [
						0,
						0,
						0
					]),
					radius: r.capsule.radius ?? 0,
					tail: new u().fromArray(r.capsule.tail ?? [
						0,
						0,
						0
					]),
					inside: !1
				});
			}), l = o.colliderGroups?.map((e, t) => ({
				colliders: (e.colliders ?? []).map((e) => c?.[e] ?? null).filter((e) => e != null),
				name: e.name
			}));
			return (n = o.springs) == null || n.forEach((e, t) => {
				let n = e.joints, r = e.colliderGroups?.map((e) => l?.[e] ?? null).filter((e) => e != null), o = e.center == null ? void 0 : a[e.center], s;
				n.forEach((e) => {
					if (s) {
						let t = s.node, n = a[t], c = e.node, l = a[c], d = {
							hitRadius: s.hitRadius,
							dragForce: s.dragForce,
							gravityPower: s.gravityPower,
							stiffness: s.stiffness,
							gravityDir: s.gravityDir == null ? void 0 : new u().fromArray(s.gravityDir)
						}, f = this._importJoint(n, l, d, r);
						o && (f.center = o), i.addJoint(f);
					}
					s = e;
				});
			}), i.setInitState(), i;
		});
	}
	_v0Import(e) {
		return vr(this, null, function* () {
			let t = e.parser.json;
			if (t.extensionsUsed?.indexOf("VRM") === -1) return null;
			let n = t.extensions?.VRM?.secondaryAnimation;
			if (!n) return null;
			let r = n?.boneGroups;
			if (!r) return null;
			let i = new Kr(), a = yield e.parser.getDependencies("node"), o = n.colliderGroups?.map((e, t) => {
				let n = a[e.node];
				return n == null ? null : { colliders: (e.colliders ?? []).map((e, t) => {
					let r = new u(0, 0, 0);
					return e.offset && r.set(e.offset.x ?? 0, e.offset.y ?? 0, e.offset.z ? -e.offset.z : 0), this._importSphereCollider(n, {
						offset: r,
						radius: e.radius ?? 0,
						inside: !1
					});
				}) };
			});
			return r?.forEach((e, t) => {
				let n = e.bones;
				n && n.forEach((t) => {
					let n = a[t];
					if (n == null) return;
					let r = new u();
					e.gravityDir ? r.set(e.gravityDir.x ?? 0, e.gravityDir.y ?? 0, e.gravityDir.z ?? 0) : r.set(0, -1, 0);
					let s = e.center == null ? void 0 : a[e.center], c = {
						hitRadius: e.hitRadius,
						dragForce: e.dragForce,
						gravityPower: e.gravityPower,
						stiffness: e.stiffiness,
						gravityDir: r
					}, l = e.colliderGroups?.map((e) => o?.[e] ?? null).filter((e) => e != null);
					n.traverse((e) => {
						let t = e.children[0] ?? null, n = this._importJoint(e, t, c, l);
						s && (n.center = s), i.addJoint(n);
					});
				});
			}), e.scene.updateMatrixWorld(), i.setInitState(), i;
		});
	}
	_importJoint(e, t, n, r) {
		let i = new Hr(e, t, n, r);
		if (this.jointHelperRoot) {
			let e = new Pr(i);
			this.jointHelperRoot.add(e), e.renderOrder = this.jointHelperRoot.renderOrder;
		}
		return i;
	}
	_importSphereCollider(e, t) {
		let n = new Fr(new Er(t));
		if (e.add(n), this.colliderHelperRoot) {
			let e = new jr(n);
			this.colliderHelperRoot.add(e), e.renderOrder = this.colliderHelperRoot.renderOrder;
		}
		return n;
	}
	_importCapsuleCollider(e, t) {
		let n = new Fr(new xr(t));
		if (e.add(n), this.colliderHelperRoot) {
			let e = new jr(n);
			this.colliderHelperRoot.add(e), e.renderOrder = this.colliderHelperRoot.renderOrder;
		}
		return n;
	}
	_importPlaneCollider(e, t) {
		let n = new Fr(new wr(t));
		if (e.add(n), this.colliderHelperRoot) {
			let e = new jr(n);
			this.colliderHelperRoot.add(e), e.renderOrder = this.colliderHelperRoot.renderOrder;
		}
		return n;
	}
};
Xr.EXTENSION_NAME = "VRMC_springBone";
var Zr = Xr, Qr = class {
	get name() {
		return "VRMLoaderPlugin";
	}
	constructor(e, t) {
		this.parser = e;
		let n = t?.helperRoot, r = t?.autoUpdateHumanBones;
		this.expressionPlugin = t?.expressionPlugin ?? new lt(e), this.firstPersonPlugin = t?.firstPersonPlugin ?? new pt(e), this.humanoidPlugin = t?.humanoidPlugin ?? new At(e, {
			helperRoot: n,
			autoUpdateHumanBones: r
		}), this.lookAtPlugin = t?.lookAtPlugin ?? new ln(e, { helperRoot: n }), this.metaPlugin = t?.metaPlugin ?? new fn(e), this.mtoonMaterialPlugin = t?.mtoonMaterialPlugin ?? new jn(e), this.materialsHDREmissiveMultiplierPlugin = t?.materialsHDREmissiveMultiplierPlugin ?? new Pn(e), this.materialsV0CompatPlugin = t?.materialsV0CompatPlugin ?? new Wn(e), this.springBonePlugin = t?.springBonePlugin ?? new Zr(e, {
			colliderHelperRoot: n,
			jointHelperRoot: n
		}), this.nodeConstraintPlugin = t?.nodeConstraintPlugin ?? new _r(e, { helperRoot: n });
	}
	beforeRoot() {
		return We(this, null, function* () {
			yield this.materialsV0CompatPlugin.beforeRoot(), yield this.mtoonMaterialPlugin.beforeRoot();
		});
	}
	loadMesh(e) {
		return We(this, null, function* () {
			return yield this.mtoonMaterialPlugin.loadMesh(e);
		});
	}
	getMaterialType(e) {
		return this.mtoonMaterialPlugin.getMaterialType(e) ?? null;
	}
	extendMaterialParams(e, t) {
		return We(this, null, function* () {
			yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(e, t), yield this.mtoonMaterialPlugin.extendMaterialParams(e, t);
		});
	}
	afterRoot(e) {
		return We(this, null, function* () {
			yield this.metaPlugin.afterRoot(e), yield this.humanoidPlugin.afterRoot(e), yield this.expressionPlugin.afterRoot(e), yield this.lookAtPlugin.afterRoot(e), yield this.firstPersonPlugin.afterRoot(e), yield this.springBonePlugin.afterRoot(e), yield this.nodeConstraintPlugin.afterRoot(e), yield this.mtoonMaterialPlugin.afterRoot(e);
			let t = e.userData.vrmMeta, n = e.userData.vrmHumanoid;
			if (t && n) {
				let r = new mn({
					scene: e.scene,
					expressionManager: e.userData.vrmExpressionManager,
					firstPerson: e.userData.vrmFirstPerson,
					humanoid: n,
					lookAt: e.userData.vrmLookAt,
					meta: t,
					materials: e.userData.vrmMToonMaterials,
					springBoneManager: e.userData.vrmSpringBoneManager,
					nodeConstraintManager: e.userData.vrmNodeConstraintManager
				});
				e.userData.vrm = r;
			}
		});
	}
};
function $r(e) {
	let t = /* @__PURE__ */ new Set();
	return e.traverse((e) => {
		if (!e.isMesh) return;
		let n = e;
		t.add(n);
	}), t;
}
function ei(e, t, n) {
	if (t.size === 1) {
		let n = t.values().next().value;
		if (n.weight === 1) return e[n.index];
	}
	let r = new Float32Array(e[0].count * 3), i = 0;
	if (n) i = 1;
	else for (let e of t) i += e.weight;
	for (let n of t) {
		let t = e[n.index], a = n.weight / i;
		for (let e = 0; e < t.count; e++) r[e * 3 + 0] += t.getX(e) * a, r[e * 3 + 1] += t.getY(e) * a, r[e * 3 + 2] += t.getZ(e) * a;
	}
	return new c(r, 3);
}
function ti(e) {
	let t = $r(e.scene), n = /* @__PURE__ */ new Map(), r = e.expressionManager?.expressionMap;
	if (r != null) for (let [e, t] of Object.entries(r)) {
		let r = /* @__PURE__ */ new Set();
		for (let i of t.binds) if (i instanceof rt) {
			if (i.weight !== 0) for (let t of i.primitives) {
				let r = n.get(t);
				r ?? (r = /* @__PURE__ */ new Map(), n.set(t, r));
				let a = r.get(e);
				a ?? (a = /* @__PURE__ */ new Set(), r.set(e, a)), a.add(i);
			}
			r.add(i);
		}
		for (let e of r) t.deleteBind(e);
	}
	for (let e of t) {
		let t = n.get(e);
		if (t == null) continue;
		let i = e.geometry.morphAttributes;
		e.geometry.morphAttributes = {};
		let a = e.geometry.clone();
		e.geometry = a;
		let o = a.morphTargetsRelative, s = i.position != null, c = i.normal != null, l = {}, u = {}, d = [];
		if (s || c) {
			s && (l.position = []), c && (l.normal = []);
			let n = 0;
			for (let [a, f] of t) s && (l.position[n] = ei(i.position, f, o)), c && (l.normal[n] = ei(i.normal, f, o)), r?.[a].addBind(new rt({
				index: n,
				weight: 1,
				primitives: [e]
			})), u[a] = n, d.push(0), n++;
		}
		a.morphAttributes = l, e.morphTargetDictionary = u, e.morphTargetInfluences = d;
	}
}
function ni(e, t, n) {
	if (e.getComponent) return e.getComponent(t, n);
	{
		let r = e.array[t * e.itemSize + n];
		return e.normalized && (r = h.denormalize(r, e.array)), r;
	}
}
function ri(e, t, n, r) {
	e.setComponent ? e.setComponent(t, n, r) : (e.normalized && (r = h.normalize(r, e.array)), e.array[t * e.itemSize + n] = r);
}
function ii(e) {
	let t = ai(e), n = /* @__PURE__ */ new Set();
	for (let e of t) n.has(e.geometry) && (e.geometry = fi(e.geometry)), n.add(e.geometry);
	let r = /* @__PURE__ */ new Map();
	for (let e of n) {
		let t = e.getAttribute("skinIndex"), n = r.get(t) ?? /* @__PURE__ */ new Map();
		r.set(t, n);
		let i = e.getAttribute("skinWeight"), a = oi(t, i);
		n.set(i, a);
	}
	let i = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = si(e, r);
		i.set(e, t);
	}
	let a = [];
	for (let [e, t] of i) {
		let n = !1;
		for (let r of a) if (ci(t, r.boneInverseMap)) {
			n = !0, r.meshes.add(e);
			for (let [e, n] of t) r.boneInverseMap.set(e, n);
			break;
		}
		n || a.push({
			boneInverseMap: t,
			meshes: /* @__PURE__ */ new Set([e])
		});
	}
	let s = /* @__PURE__ */ new Map(), c = new di(), l = new di(), u = new di();
	for (let e of a) {
		let { boneInverseMap: t, meshes: n } = e, r = Array.from(t.keys()), i = Array.from(t.values()), a = new o(r, i), d = l.getOrCreate(a);
		for (let e of n) {
			let t = e.geometry.getAttribute("skinIndex"), n = c.getOrCreate(t), i = e.skeleton.bones, a = `${n};${d};${i.map((e) => u.getOrCreate(e)).join(",")}`, o = s.get(a);
			o ?? (o = t.clone(), li(o, i, r), s.set(a, o)), e.geometry.setAttribute("skinIndex", o);
		}
		for (let e of n) e.bind(a, new _());
	}
}
function ai(e) {
	let t = /* @__PURE__ */ new Set();
	return e.traverse((e) => {
		if (!e.isSkinnedMesh) return;
		let n = e;
		t.add(n);
	}), t;
}
function oi(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r = 0; r < e.count; r++) for (let i = 0; i < e.itemSize; i++) {
		let a = ni(e, r, i);
		ni(t, r, i) !== 0 && n.add(a);
	}
	return n;
}
function si(e, t) {
	let n = /* @__PURE__ */ new Map(), r = e.skeleton, i = e.geometry, a = i.getAttribute("skinIndex"), o = i.getAttribute("skinWeight"), s = t.get(a)?.get(o);
	if (!s) throw Error("Unreachable. attributeUsedIndexSetMap does not know the skin index attribute or the skin weight attribute.");
	for (let e of s) n.set(r.bones[e], r.boneInverses[e]);
	return n;
}
function ci(e, t) {
	for (let [n, r] of e.entries()) {
		let e = t.get(n);
		if (e != null && !ui(r, e)) return !1;
	}
	return !0;
}
function li(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let e of t) r.set(e, r.size);
	let i = /* @__PURE__ */ new Map();
	for (let [e, t] of n.entries()) {
		let n = r.get(t);
		i.set(n, e);
	}
	for (let t = 0; t < e.count; t++) for (let n = 0; n < e.itemSize; n++) {
		let r = ni(e, t, n), a = i.get(r);
		ri(e, t, n, a);
	}
	e.needsUpdate = !0;
}
function ui(e, t, n) {
	if (n ||= 1e-4, e.elements.length != t.elements.length) return !1;
	for (let r = 0, i = e.elements.length; r < i; r++) if (Math.abs(e.elements[r] - t.elements[r]) > n) return !1;
	return !0;
}
var di = class {
	constructor() {
		this._objectIndexMap = /* @__PURE__ */ new Map(), this._index = 0;
	}
	get(e) {
		return this._objectIndexMap.get(e);
	}
	getOrCreate(e) {
		let t = this._objectIndexMap.get(e);
		return t ?? (t = this._index, this._objectIndexMap.set(e, t), this._index++), t;
	}
};
function fi(t) {
	let n = new e();
	n.name = t.name, n.setIndex(t.index);
	for (let [e, r] of Object.entries(t.attributes)) n.setAttribute(e, r);
	for (let [e, r] of Object.entries(t.morphAttributes)) {
		let t = e;
		n.morphAttributes[t] = r.concat();
	}
	n.morphTargetsRelative = t.morphTargetsRelative, n.groups = [];
	for (let e of t.groups) n.addGroup(e.start, e.count, e.materialIndex);
	return n.boundingSphere = t.boundingSphere?.clone() ?? null, n.boundingBox = t.boundingBox?.clone() ?? null, n.drawRange.start = t.drawRange.start, n.drawRange.count = t.drawRange.count, n.userData = t.userData, n;
}
function pi(e) {
	if (Object.values(e).forEach((e) => {
		e?.isTexture && e.dispose();
	}), e.isShaderMaterial) {
		let t = e.uniforms;
		t && Object.values(t).forEach((e) => {
			let t = e.value;
			t?.isTexture && t.dispose();
		});
	}
	e.dispose();
}
function mi(e) {
	let t = e.geometry;
	t && t.dispose();
	let n = e.skeleton;
	n && n.dispose();
	let r = e.material;
	r && (Array.isArray(r) ? r.forEach((e) => pi(e)) : r && pi(r));
}
function hi(e) {
	e.traverse(mi);
}
function gi(e, t) {
	let n = t?.experimentalSameBoneCounts ?? !1, r = [];
	e.traverse((e) => {
		e.type === "SkinnedMesh" && r.push(e);
	});
	let i = /* @__PURE__ */ new Map(), a = 0;
	for (let e of r) {
		let t = e.geometry.getAttribute("skinIndex");
		if (i.has(t)) continue;
		let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
		for (let e = 0; e < t.count; e++) for (let i = 0; i < t.itemSize; i++) {
			let a = ni(t, e, i), o = n.get(a);
			o ?? (o = n.size, n.set(a, o), r.set(o, a)), ri(t, e, i, o);
		}
		t.needsUpdate = !0, i.set(t, r), a = Math.max(a, n.size);
	}
	for (let e of r) {
		let t = e.geometry.getAttribute("skinIndex"), r = i.get(t), s = [], c = [], l = n ? a : r.size;
		for (let t = 0; t < l; t++) {
			let n = r.get(t) ?? 0;
			s.push(e.skeleton.bones[n]), c.push(e.skeleton.boneInverses[n]);
		}
		let u = new o(s, c);
		e.bind(u, new _());
	}
}
function _i(e, t) {
	let n = e.position.count, r = Array(n), i = 0, a = t.array;
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		r[t] || (r[t] = !0, i++);
	}
	return {
		isVertexUsed: r,
		vertexCount: n,
		verticesUsed: i
	};
}
function vi(e) {
	let t = [], n = [], r = 0;
	for (let i = 0; i < e.length; i++) if (e[i]) {
		let e = r++;
		t[i] = e, n[e] = i;
	}
	return {
		originalIndexNewIndexMap: t,
		newIndexOriginalIndexMap: n
	};
}
function yi(e, t) {
	t.name = e.name, t.morphTargetsRelative = e.morphTargetsRelative, e.groups.forEach((e) => {
		t.addGroup(e.start, e.count, e.materialIndex);
	}), t.boundingBox = e.boundingBox?.clone() ?? null, t.boundingSphere = e.boundingSphere?.clone() ?? null, t.setDrawRange(e.drawRange.start, e.drawRange.count), t.userData = e.userData;
}
function bi(e, t, n) {
	let r = t.array, i = new r.constructor(r.length);
	for (let e = 0; e < r.length; e++) {
		let t = r[e];
		i[e] = n[t];
	}
	e.setIndex(new c(i, t.itemSize, t.normalized));
}
function xi(e, t, n) {
	let r = e.constructor, i = new r(t.length * n), a = !0;
	for (let r = 0; r < t.length; r++) {
		let o = t[r] * n, s = r * n;
		for (let t = 0; t < n; t++) {
			let n = e[o + t];
			i[s + t] = n, a &&= n === 0;
		}
	}
	return [i, a];
}
function Si(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	for (let [r, i] of Object.entries(e)) if (i.isInterleavedBufferAttribute) {
		let e = i, n = e.data, a = t.get(n) ?? [];
		t.set(n, a), a.push([r, e]);
	} else {
		let e = i;
		n.push([r, e]);
	}
	return [t, n];
}
function Ci(e, t, n) {
	let [r, i] = Si(t);
	for (let [t, i] of r) {
		let r = t.array, { stride: o } = t, [s, c] = xi(r, n, o), l = new ne(s, o);
		l.setUsage(t.usage);
		for (let [t, n] of i) {
			let { itemSize: r, offset: i, normalized: o } = n, s = new a(l, r, i, o);
			e.setAttribute(t, s);
		}
	}
	for (let [t, r] of i) {
		let i = r.array, { itemSize: a, normalized: o } = r, [s, l] = xi(i, n, a);
		e.setAttribute(t, new c(s, a, o));
	}
}
function wi(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	for (let [r, i] of Object.entries(e)) {
		let e = r;
		for (let r = 0; r < i.length; r++) {
			let a = i[r];
			if (a.isInterleavedBufferAttribute) {
				let n = a, i = n.data, o = t.get(i) ?? [];
				t.set(i, o), o.push([
					e,
					r,
					n
				]);
			} else {
				let t = a;
				n.push([
					e,
					r,
					t
				]);
			}
		}
	}
	return [t, n];
}
function Ti(e, t, n) {
	let r = !0, [i, o] = wi(t), s = {};
	for (let [e, t] of i) {
		let i = e.array, { stride: o } = e, [c, l] = xi(i, n, o);
		r &&= l;
		let u = new ne(c, o);
		u.setUsage(e.usage);
		for (let [e, n, r] of t) {
			let { itemSize: t, offset: i, normalized: o } = r, c = new a(u, t, i, o);
			s[e] ?? (s[e] = []), s[e][n] = c;
		}
	}
	for (let [e, t, i] of o) {
		let a = i, o = a.array, { itemSize: l, normalized: u } = a, [d, f] = xi(o, n, l);
		r &&= f, s[e] ?? (s[e] = []), s[e][t] = new c(d, l, u);
	}
	e.morphAttributes = r ? {} : s;
}
function Ei(t) {
	let n = /* @__PURE__ */ new Map();
	t.traverse((t) => {
		if (!t.isMesh) return;
		let r = t, i = r.geometry, a = i.index;
		if (a == null) return;
		let o = n.get(i);
		if (o != null) {
			r.geometry = o;
			return;
		}
		let { isVertexUsed: s, vertexCount: c, verticesUsed: l } = _i(i.attributes, a);
		if (l === c) return;
		let { originalIndexNewIndexMap: u, newIndexOriginalIndexMap: d } = vi(s), f = new e();
		yi(i, f), n.set(i, f), bi(f, a, u), Ci(f, i.attributes, d), Ti(f, i.morphAttributes, d), r.geometry = f;
	}), Array.from(n.keys()).forEach((e) => {
		e.dispose();
	});
}
function Di(e) {
	e.meta?.metaVersion === "0" && (e.scene.rotation.y = Math.PI);
}
var $ = class {
	constructor() {}
};
$.combineMorphs = ti, $.combineSkeletons = ii, $.deepDispose = hi, $.removeUnnecessaryJoints = gi, $.removeUnnecessaryVertices = Ei, $.rotateVRM0 = Di;
//#endregion
//#region src/core/skin/rig.ts
function Oi(e) {
	return {
		root: "hips",
		get autoUpdate() {
			return e.autoUpdateHumanBones;
		},
		set autoUpdate(t) {
			e.autoUpdateHumanBones = t;
		},
		node: (t) => e.getNormalizedBoneNode(t),
		rawNode: (t) => e.getRawBoneNode(t),
		ancestors: (e) => {
			let t = [];
			for (let n = yt[e]; n; n = yt[n]) t.push(n);
			return t;
		},
		update: () => e.update(),
		resetRawPose: () => e.resetRawPose()
	};
}
var ki = new u(), Ai = new u(), ji = new u(), Mi = class {
	constructor(e) {
		this.normalizedRoot = new b(), this.autoUpdate = !0, this.bones = /* @__PURE__ */ new Map();
		let t = new Map(Object.entries(e).map(([e, t]) => [t, e])), n = (e) => {
			let n = [];
			for (let r = e.parent; r; r = r.parent) {
				let e = t.get(r);
				e !== void 0 && n.push(e);
			}
			return n;
		}, r = Object.entries(e).map(([e, t]) => ({
			bone: e,
			node: t,
			ancestors: n(t)
		})).sort((e, t) => e.ancestors.length - t.ancestors.length), i = /* @__PURE__ */ new Map();
		for (let { bone: e, node: t, ancestors: n } of r) {
			t.updateWorldMatrix(!0, !1);
			let r = new u().setFromMatrixPosition(t.matrixWorld);
			i.set(e, r);
			let a = new g();
			t.parent?.matrixWorld.decompose(ji, a, Ai);
			let o = new b();
			o.name = `Normalized_${t.name}`, (n.length ? this.bones.get(n[0]).normalized : this.normalizedRoot).add(o), o.position.copy(r), n.length && o.position.sub(i.get(n[0])), this.bones.set(e, {
				raw: t,
				normalized: o,
				ancestors: n,
				parentTurn: a,
				parentTurnInverse: a.clone().invert(),
				turn: t.quaternion.clone(),
				position: t.position.clone()
			});
		}
		this.root = r.find((e) => !e.ancestors.length)?.bone ?? "";
	}
	node(e) {
		return this.bones.get(e)?.normalized ?? null;
	}
	rawNode(e) {
		return this.bones.get(e)?.raw ?? null;
	}
	ancestors(e) {
		return [...this.bones.get(e)?.ancestors ?? []];
	}
	update() {
		if (!this.autoUpdate) return;
		for (let e of this.bones.values()) e.raw.quaternion.copy(e.normalized.quaternion).multiply(e.parentTurn).premultiply(e.parentTurnInverse).multiply(e.turn);
		let e = this.bones.get(this.root), t = e?.raw.parent;
		e && t && (e.normalized.getWorldPosition(ki), t.updateWorldMatrix(!0, !1), e.raw.position.copy(t.worldToLocal(ki)));
	}
	resetRawPose() {
		for (let e of this.bones.values()) e.raw.quaternion.copy(e.turn), e.raw.position.copy(e.position);
	}
}, Ni = {
	"+z": 0,
	"+x": Math.PI / 2,
	"-z": Math.PI,
	"-x": -Math.PI / 2
}, Pi = new u(0, 1, 0);
async function Fi(e, t) {
	let n = new S();
	t.format === "vrm" && n.register((e) => new Qr(e));
	let r = await n.parseAsync(e, "");
	return Ii(r.scene), t.format === "vrm" ? Li(r) : Ri(r, t);
}
function Ii(e) {
	let n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
	e.traverse((e) => {
		let { material: t, geometry: i } = e;
		for (let e of t ? [t].flat() : []) n.add(e);
		i && r.add(i);
	});
	for (let e of n) {
		let { uniforms: t } = e, n = t ? Object.values(t).map((e) => e.value) : Object.values(e);
		for (let e of n) {
			let t = e, n = e;
			t?.isTexture && t.colorSpace === "srgb" ? (t.colorSpace = "", t.needsUpdate = !0) : n?.isColor && n.convertLinearToSRGB();
		}
	}
	let i = new t();
	for (let e of r) {
		let t = e.getAttribute("color");
		if (t) {
			for (let e = 0; e < t.count; e++) i.setRGB(t.getX(e), t.getY(e), t.getZ(e)).convertLinearToSRGB(), t.setXYZ(e, i.r, i.g, i.b);
			t.needsUpdate = !0;
		}
	}
}
function Li(e) {
	let t = e.userData.vrm;
	if (!t) throw Error("not a VRM file (no VRM or VRMC_vrm extension)");
	return $.removeUnnecessaryVertices(e.scene), $.combineSkeletons(e.scene), {
		scene: t.scene,
		rig: Oi(t.humanoid),
		springBoneManager: t.springBoneManager ?? null,
		frame: ve(t.meta?.metaVersion),
		update(e) {
			t.humanoid.update(), t.lookAt?.update(e), t.expressionManager?.update(), t.nodeConstraintManager?.update();
			for (let n of t.materials ?? []) n.update?.(e);
		},
		dispose: () => $.deepDispose(t.scene)
	};
}
async function Ri(e, t) {
	let n = (t) => e.parser.getDependency("node", t);
	e.scene.scale.setScalar(t.scale ?? 1);
	let r = new d();
	r.add(e.scene), r.updateMatrixWorld(!0);
	for (let [e, r] of t.reparent ?? []) (await n(r)).attach(await n(e));
	let i = {};
	for (let [e, r] of Object.entries(t.nodes ?? {})) i[e] = await n(r);
	let a = new Mi(i);
	r.add(a.normalizedRoot);
	let o = t.springs?.length ? await Bi(t.springs, n) : null;
	return t.material?.toon && Hi(e.scene, t.material.toon), {
		scene: r,
		rig: a,
		springBoneManager: o,
		frame: new g().setFromAxisAngle(Pi, -Ni[t.facing ?? "+z"]),
		update: () => a.update(),
		dispose: () => $.deepDispose(r)
	};
}
function zi(e) {
	return 1 / e.getWorldScale(new u()).x;
}
async function Bi(e, t) {
	let n = new Kr(), r = (e, t) => new u(...e).multiplyScalar(t);
	for (let i of e) {
		let e = await Promise.all(i.colliders.map(async ({ node: e, radius: n, offset: i, tail: a }) => {
			let o = await t(e), s = zi(o), c = new Fr(a ? new xr({
				radius: n,
				offset: r(i, s),
				tail: r(a, s)
			}) : new Er({
				radius: n,
				offset: r(i, s)
			}));
			return o.add(c), c;
		})), a = {
			hitRadius: i.hit_radius,
			stiffness: i.stiffness,
			dragForce: i.drag,
			gravityPower: i.gravity,
			gravityDir: new u(...i.gravity_dir)
		}, o = [{ colliders: e }], s = await Promise.all(i.joints.map(t));
		i.tip !== void 0 && s.push(Vi(s[s.length - 1], i.tip));
		for (let e = 0; e + 1 < s.length; e++) n.addJoint(new Hr(s[e], s[e + 1], a, o));
	}
	return n.setInitState(), n;
}
function Vi(e, t) {
	let n = new b();
	return n.position.copy(e.position).setLength(t * zi(e)), e.add(n), n;
}
function Hi(e, t) {
	let n = /* @__PURE__ */ new Map(), r = (e) => {
		let r = e;
		if (!r.isMeshStandardMaterial) return e;
		let i = n.get(r);
		return i || (i = new On({
			color: r.color.clone(),
			map: r.map ?? void 0,
			shadeColorFactor: r.color.clone().multiplyScalar(t.shade),
			shadeMultiplyTexture: r.map ?? void 0,
			shadingToonyFactor: t.toony,
			shadingShiftFactor: t.shift,
			transparent: r.transparent,
			alphaTest: r.alphaTest,
			side: r.side,
			vertexColors: r.vertexColors
		}), n.set(r, i), r.dispose()), i;
	};
	e.traverse((e) => {
		let t = e;
		t.isMesh && (t.material = Array.isArray(t.material) ? t.material.map(r) : r(t.material));
	});
}
//#endregion
//#region src/core/skin/skin.ts
var Ui = 1 / 120, Wi = 1 / 30, Gi = .25, Ki = .3, qi = [
	0,
	0,
	-1
], Ji = 8, Yi = .25, Xi = new u(1, 1, 1), Zi = new _(), Qi = new u(), $i = new u(), ea = /* @__PURE__ */ new Int32Array(1);
function ta(e, t, n, r) {
	let i = t.geom_type[r], a = e.mjtGeom, [o, s, c] = [
		6,
		7,
		8
	].map((e) => n.geom_xmat[r * 9 + e]), [l, u, d] = [
		0,
		1,
		2
	].map((e) => t.geom_size[r * 3 + e]), f = n.geom_xpos[r * 3 + 2];
	if (i === a.mjGEOM_SPHERE.value) return f - l;
	if (i === a.mjGEOM_CAPSULE.value) return f - Math.abs(c) * u - l;
	if (i === a.mjGEOM_CYLINDER.value) return f - Math.abs(c) * u - l * Math.sqrt(Math.max(0, 1 - c * c));
	if (i === a.mjGEOM_ELLIPSOID.value) return f - Math.hypot(o * l, s * u, c * d);
	if (i === a.mjGEOM_BOX.value) return f - Math.abs(o) * l - Math.abs(s) * u - Math.abs(c) * d;
	if (i === a.mjGEOM_PLANE.value || i === a.mjGEOM_HFIELD.value) return Infinity;
	let [p, m, h, g, _, v] = [
		0,
		1,
		2,
		3,
		4,
		5
	].map((e) => t.geom_aabb[r * 6 + e]);
	return f + o * p + s * m + c * h - Math.abs(o) * g - Math.abs(s) * _ - Math.abs(c) * v;
}
function na(e, t) {
	let n = -1, r = 0;
	for (let i = 0; i < e.nbody; i++) {
		let a = e.body(i).name;
		if (a === t) return i;
		a.endsWith(`/${t}`) && (n = i, r += 1);
	}
	return r === 1 ? n : -1;
}
var ra = class e {
	constructor(e, t) {
		this.model = e, this.config = t, this.root = new d(), this.hiddenBodies = [], this.rig = null, this.nodes = [], this.world = [], this.local = [], this.rootBone = null, this.rootBody = -1, this.robotRoot = -1, this.heightRatio = 1, this.mujoco = null, this.poses = /* @__PURE__ */ new Map(), this.hipsOffset = new u(), this.rootFrom = new u(), this.rootTo = new u(), this.rootNow = new u(), this.groundFrom = 0, this.groundTo = 0, this.lastTime = null, this.toon = [], this.springs = null, this.springsBuilt = !1, this.attached = [], this.limbs = [], this.root.name = "Skin", this.root.add(e.scene);
		let n = /* @__PURE__ */ new Set();
		e.scene.traverse((e) => {
			e.frustumCulled = !1, e.raycast = () => {};
			let t = e;
			if (t.isMesh) {
				t.castShadow = !0;
				for (let e of Array.isArray(t.material) ? t.material : [t.material]) n.add(e);
			}
		});
		for (let e of n) {
			let t = e;
			t.isMToonMaterial && this.toon.push({
				material: t,
				lit: t.color.clone(),
				shade: t.shadeColorFactor.clone()
			});
		}
		this.root.updateMatrixWorld(!0);
		let r = e.rig.node(e.rig.root), i = this.lowestVertex(), a = Number.isFinite(i) ? i : 0;
		this.restHeight = r ? r.getWorldPosition(new u()).y - a : 0;
	}
	static async load(t, n) {
		return new e(await Fi(t, n), n);
	}
	bind(e, t) {
		this.springsBuilt || (this.springsBuilt = !0, this.springs = this.buildSprings(e)), this.normalizeToon(t), this.mujoco = e;
		let n = this.model.rig, r = [];
		for (let [e, i] of Object.entries(this.config.bones)) {
			let a = n.node(e), o = na(t, i);
			!a || o < 0 || r.push({
				name: e,
				bodyId: o,
				ancestors: n.ancestors(e)
			});
		}
		let i = this.model.frame, a = be(t, e.mjtJoint.mjJNT_FREE.value);
		this.rig = Se(r, a, this.config.rest_offsets ?? {}, i), this.nodes = this.rig.bones.map((e) => n.node(e.name)), this.world = this.rig.bones.map(() => new g()), this.local = this.rig.bones.map(() => new g()), this.poses = new Map(this.rig.bones.map((e) => [e.bodyId, {
			from: new g(),
			to: new g(),
			now: new g(),
			fromAt: new u(),
			toAt: new u(),
			nowAt: new u()
		}]));
		let o = this.rig.bones.find((e) => e.name === n.root);
		if (this.rootBone = o ? n.node(o.name) : null, this.rootBody = o?.bodyId ?? -1, this.robotRoot = this.rootBody >= 0 ? t.body_rootid[this.rootBody] : -1, this.hiddenBodies = [], this.config.hide_robot !== !1 && this.rootBody >= 0) for (let e = 1; e < t.nbody; e++) t.body_rootid[e] === this.robotRoot && this.hiddenBodies.push(e);
		let s = this.config.hips_offset ?? [
			0,
			0,
			0
		];
		this.hipsOffset.set(s[0], s[2], -s[1]);
		let c = this.rootBody >= 0 ? this.hipsOffset.clone().applyQuaternion(a[this.rootBody]).y : 0, l = (this.config.root_height ?? xe(t, a, this.rootBody)) + c;
		this.heightRatio = this.config.height_ratio ?? (this.restHeight > 0 && l > 0 ? this.restHeight / l : 1);
		let d = this.config.offset ?? [
			0,
			0,
			0
		];
		this.root.position.set(d[0], d[2], -d[1]), this.root.quaternion.copy(this.rig.facing).multiply(i);
		let f = this.config.retarget ?? "hybrid", p = f === "position" || f === "hybrid" && this.config.limbs?.length ? this.attach(e, t, f === "hybrid") : [];
		this.attached = f === "position" ? p : [], this.limbs = f === "hybrid" ? this.limbsOf(p) : [], n.autoUpdate = f !== "position", this.lastTime = null;
	}
	limbsOf(e) {
		let t = this.model.rig, n = new Set(this.rig.bones.map((e) => e.name));
		return (this.config.limbs ?? []).flatMap((r) => {
			let i = e.find((e) => e.name === r[2]);
			if (!i || !r.every((e) => n.has(e))) return [];
			let [a, o, s] = r.map((e) => t.node(e)), [c, l, d] = [
				a,
				o,
				s
			].map((e) => e.getWorldPosition(new u()));
			return [{
				upper: a,
				lower: o,
				end: s,
				target: i,
				bend: new u(1, 0, 0),
				length: c.distanceTo(l) + l.distanceTo(d),
				at: new u(),
				turn: new g()
			}];
		});
	}
	attach(e, t, n) {
		let r = this.rig, i = this.model.rig, a = new e.MjData(t);
		try {
			t.nkey > 0 && e.mj_resetDataKeyframe(t, a, 0), e.mj_kinematics(t, a);
			let o = (e) => new u(a.xpos[e * 3], a.xpos[e * 3 + 2], -a.xpos[e * 3 + 1]), s = (e) => ye(a.xquat, e, new g());
			i.autoUpdate = !0, i.resetRawPose(), De(r, s, this.world, this.local);
			for (let e = 0; e < this.nodes.length; e++) this.nodes[e].quaternion.copy(this.local[e]);
			this.rootBone && Oe(r, this.hipsOffset.clone().applyQuaternion(s(this.rootBody)).add(o(this.rootBody)), this.heightRatio, 0, this.rootBone.position), i.update();
			let c = this.root.position.clone();
			this.root.position.set(0, 0, 0), this.root.updateMatrixWorld(!0);
			let l = this.robotBottom(e, t, a) - this.lowestVertex();
			this.root.position.y = Number.isFinite(l) ? l : 0, this.root.updateMatrixWorld(!0);
			let d = new _(), f = r.bones.flatMap((e) => {
				let t = n ? i.node(e.name) : i.rawNode(e.name);
				if (!t) return [];
				d.compose(o(e.bodyId), s(e.bodyId), Xi).invert();
				let r = d.clone().multiply(t.matrixWorld);
				return [{
					name: e.name,
					bone: t,
					bodyId: e.bodyId,
					inBody: r
				}];
			});
			this.root.position.copy(c), this.root.updateMatrixWorld(!0);
			let p = (e) => {
				let t = 0;
				for (let n = e.parent; n; n = n.parent) t++;
				return t;
			};
			return f.sort((e, t) => p(e.bone) - p(t.bone));
		} finally {
			a.delete();
		}
	}
	robotBottom(e, t, n) {
		let r = Infinity;
		for (let i = 0; i < t.ngeom; i++) t.body_rootid[t.geom_bodyid[i]] === this.robotRoot && (t.geom_contype[i] || t.geom_conaffinity[i]) && (r = Math.min(r, ta(e, t, n, i)));
		return r;
	}
	lowestVertex() {
		let e = Infinity, t = new u();
		return this.model.scene.traverse((n) => {
			let r = n;
			if (!r.isMesh) return;
			let i = r.geometry.getAttribute("position")?.count ?? 0;
			for (let n = 0; n < i; n++) e = Math.min(e, r.getVertexPosition(n, t).applyMatrix4(r.matrixWorld).y);
		}), e;
	}
	buildSprings(e) {
		let t = this.model.springBoneManager;
		if (!this.config.mujoco_springs || !t) return null;
		try {
			return ge.build(e, t, this.model.scene);
		} catch {
			return null;
		}
	}
	normalizeToon(e) {
		let t = (this.config.brightness ?? 1) / Math.max(re(e), 1);
		for (let { material: e, lit: n, shade: r } of this.toon) e.color.copy(n).multiplyScalar(t), e.shadeColorFactor.copy(r).multiplyScalar(t);
	}
	update(e, t, n, r) {
		let i = this.rig;
		if (!i) return;
		let a = this.lastTime === null ? 0 : (t - this.lastTime) / 1e3, o = Math.min(a, Wi);
		this.lastTime = t;
		for (let [t, n] of this.poses) n.to.copy(e[t].quaternion), n.toAt.copy(e[t].position);
		if (this.rootBody >= 0) {
			let t = e[this.rootBody];
			this.rootTo.copy(this.hipsOffset).applyQuaternion(t.quaternion).add(t.position), n && r && !this.attached.length && (this.groundTo = this.groundUnder(this.rootTo, n, r) ?? this.groundTo);
		}
		let s = o === 0 || a > Gi || this.rootTo.distanceTo(this.rootFrom) > Ki;
		if (s && this.settle(), this.springs) {
			this.pose(i, 1), this.model.update(o), this.root.updateMatrixWorld(!0), s ? this.springs.reset() : this.springs.step(o), this.settle();
			return;
		}
		let c = this.model.springBoneManager, l = s ? 1 : Math.ceil(o / Ui);
		for (let e = 1; e <= l; e++) this.pose(i, e / l), s && (this.model.rig.update(), this.root.updateMatrixWorld(!0), c?.reset()), this.model.update(o / l), c?.update(o / l);
		this.settle();
	}
	settle() {
		for (let e of this.poses.values()) e.from.copy(e.to), e.fromAt.copy(e.toAt);
		this.rootFrom.copy(this.rootTo), this.groundFrom = this.groundTo;
	}
	groundUnder(e, t, n) {
		let r = this.mujoco, i = v(e).toArray();
		for (let e = 0; e < Ji; e++) {
			let e = r.mj_ray(t, n, i, qi, ie, !0, -1, ea, null);
			if (e < 0) return null;
			if (i[2] -= e, t.body_rootid[t.geom_bodyid[ea[0]]] !== this.robotRoot) return i[2];
			i[2] -= 1e-6;
		}
		return null;
	}
	get simulatedSpringJoints() {
		return this.springs?.jointCount ?? 0;
	}
	pose(e, t) {
		for (let e of this.poses.values()) e.now.slerpQuaternions(e.from, e.to, t), e.nowAt.lerpVectors(e.fromAt, e.toAt, t);
		if (this.attached.length) this.fix();
		else {
			De(e, (e) => this.poses.get(e).now, this.world, this.local);
			for (let e = 0; e < this.nodes.length; e++) this.nodes[e].quaternion.copy(this.local[e]);
			if (this.rootBone) {
				this.rootNow.lerpVectors(this.rootFrom, this.rootTo, t);
				let n = h.lerp(this.groundFrom, this.groundTo, t);
				Oe(e, this.rootNow, this.heightRatio, n, this.rootBone.position);
			}
			this.limbs.length && this.reach();
		}
	}
	reach() {
		this.root.updateMatrixWorld(!0);
		let e = Infinity;
		for (let t of this.limbs) {
			let n = this.poses.get(t.target.bodyId);
			Zi.compose(Qi.copy(n.nowAt).add(this.root.position), n.now, Xi).multiply(t.target.inBody), Zi.decompose(t.at, t.turn, $i), e = Math.min(e, t.at.y);
		}
		let t = 0;
		for (let n of this.limbs) {
			let r = 1 - (n.at.y - e) / (Yi * n.length);
			r > 0 && (t = Math.max(t, r * Ue(n.upper, n.lower, n.end, n.at)));
		}
		t > 0 && this.rootBone && (this.rootBone.getWorldPosition(Qi), Qi.y -= t, this.rootBone.position.copy(this.rootBone.parent.worldToLocal(Qi)), this.rootBone.updateMatrixWorld(!0));
		for (let e of this.limbs) He(e.upper, e.lower, e.end, e.at, e.bend, e.turn);
	}
	fix() {
		this.root.updateMatrixWorld(!0);
		for (let { bone: e, bodyId: t, inBody: n } of this.attached) {
			let r = this.poses.get(t);
			Zi.compose(Qi.copy(r.nowAt).add(this.root.position), r.now, Xi).multiply(n), e.matrix.copy(e.parent.matrixWorld).invert().multiply(Zi), e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0);
		}
	}
	dispose() {
		this.springs?.dispose(), this.springs = null, this.root.removeFromParent(), this.model.dispose();
	}
};
//#endregion
export { ra as Skin };
