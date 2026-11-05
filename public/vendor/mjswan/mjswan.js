import { i as e, r as t, t as n } from "./assets/rolldown-runtime-5HNE8Q1r.js";
import { $ as r, A as i, At as a, B as o, Bt as s, C as c, Ct as l, D as u, Dt as d, E as f, Et as p, F as m, Ft as h, G as g, Gt as _, H as v, Ht as y, I as b, It as x, K as S, Kt as C, L as w, Lt as T, M as E, N as D, O, Ot as k, P as A, Pt as j, Q as M, R as N, Rt as P, S as F, St as I, T as L, Tt as R, Ut as z, V as B, Vt as ee, W as te, Wt as V, _ as ne, _t as re, a as H, at as ie, b as ae, bt as U, c as oe, ct as se, d as ce, dt as le, et as ue, f as de, ft as fe, gt as pe, h as me, ht as he, i as W, j as ge, jt as _e, k as ve, kt as ye, l as be, lt as xe, m as Se, mt as Ce, n as we, nt as Te, o as Ee, ot as De, p as Oe, pt as ke, qt as Ae, r as je, rt as Me, st as Ne, tt as Pe, u as Fe, ut as Ie, v as Le, vt as Re, w as ze, wt as Be, x as Ve, xt as He, yt as Ue } from "./assets/grounding-DCGUugSr.js";
//#region node_modules/three/examples/jsm/controls/OrbitControls.js
var We = { type: "change" }, Ge = { type: "start" }, Ke = { type: "end" }, qe = new R(), Je = new Re(), Ye = Math.cos(70 * ie.DEG2RAD), Xe = new z(), Ze = 2 * Math.PI, G = {
	NONE: -1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
}, Qe = 1e-6, $e = class extends O {
	constructor(e, t = null) {
		super(e, t), this.state = G.NONE, this.target = new z(), this.cursor = new z(), this.minDistance = 0, this.maxDistance = Infinity, this.minZoom = 0, this.maxZoom = Infinity, this.minTargetRadius = 0, this.maxTargetRadius = Infinity, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -Infinity, this.maxAzimuthAngle = Infinity, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
			LEFT: "ArrowLeft",
			UP: "ArrowUp",
			RIGHT: "ArrowRight",
			BOTTOM: "ArrowDown"
		}, this.mouseButtons = {
			LEFT: Me.ROTATE,
			MIDDLE: Me.DOLLY,
			RIGHT: Me.PAN
		}, this.touches = {
			ONE: x.ROTATE,
			TWO: x.DOLLY_PAN
		}, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new z(), this._lastQuaternion = new U(), this._lastTargetPosition = new z(), this._quat = new U().setFromUnitVectors(e.up, new z(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new h(), this._sphericalDelta = new h(), this._scale = 1, this._panOffset = new z(), this._rotateStart = new y(), this._rotateEnd = new y(), this._rotateDelta = new y(), this._panStart = new y(), this._panEnd = new y(), this._panDelta = new y(), this._dollyStart = new y(), this._dollyEnd = new y(), this._dollyDelta = new y(), this._dollyDirection = new z(), this._mouse = new y(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = tt.bind(this), this._onPointerDown = et.bind(this), this._onPointerUp = nt.bind(this), this._onContextMenu = lt.bind(this), this._onMouseWheel = at.bind(this), this._onKeyDown = ot.bind(this), this._onTouchStart = st.bind(this), this._onTouchMove = ct.bind(this), this._onMouseDown = rt.bind(this), this._onMouseMove = it.bind(this), this._interceptControlDown = ut.bind(this), this._interceptControlUp = dt.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
	}
	connect(e) {
		super.connect(e), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, {
			passive: !0,
			capture: !0
		}), this.domElement.style.touchAction = "none";
	}
	disconnect() {
		this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
	}
	dispose() {
		this.disconnect();
	}
	getPolarAngle() {
		return this._spherical.phi;
	}
	getAzimuthalAngle() {
		return this._spherical.theta;
	}
	getDistance() {
		return this.object.position.distanceTo(this.target);
	}
	listenToKeyEvents(e) {
		e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
	}
	stopListenToKeyEvents() {
		this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
	}
	saveState() {
		this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
	}
	reset() {
		this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(We), this.update(), this.state = G.NONE;
	}
	update(e = null) {
		let t = this.object.position;
		Xe.copy(t).sub(this.target), Xe.applyQuaternion(this._quat), this._spherical.setFromVector3(Xe), this.autoRotate && this.state === G.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
		let n = this.minAzimuthAngle, r = this.maxAzimuthAngle;
		isFinite(n) && isFinite(r) && (n < -Math.PI ? n += Ze : n > Math.PI && (n -= Ze), r < -Math.PI ? r += Ze : r > Math.PI && (r -= Ze), n <= r ? this._spherical.theta = Math.max(n, Math.min(r, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + r) / 2 ? Math.max(n, this._spherical.theta) : Math.min(r, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
		let i = !1;
		if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
		else {
			let e = this._spherical.radius;
			this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), i = e != this._spherical.radius;
		}
		if (Xe.setFromSpherical(this._spherical), Xe.applyQuaternion(this._quatInverse), t.copy(this.target).add(Xe), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
			let e = null;
			if (this.object.isPerspectiveCamera) {
				let t = Xe.length();
				e = this._clampDistance(t * this._scale);
				let n = t - e;
				this.object.position.addScaledVector(this._dollyDirection, n), this.object.updateMatrixWorld(), i = !!n;
			} else if (this.object.isOrthographicCamera) {
				let t = new z(this._mouse.x, this._mouse.y, 0);
				t.unproject(this.object);
				let n = this.object.zoom;
				this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), i = n !== this.object.zoom;
				let r = new z(this._mouse.x, this._mouse.y, 0);
				r.unproject(this.object), this.object.position.sub(r).add(t), this.object.updateMatrixWorld(), e = Xe.length();
			} else this.zoomToCursor = !1;
			e !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position) : (qe.origin.copy(this.object.position), qe.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(qe.direction)) < Ye ? this.object.lookAt(this.target) : (Je.setFromNormalAndCoplanarPoint(this.object.up, this.target), qe.intersectPlane(Je, this.target))));
		} else if (this.object.isOrthographicCamera) {
			let e = this.object.zoom;
			this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), e !== this.object.zoom && (this.object.updateProjectionMatrix(), i = !0);
		}
		return this._scale = 1, this._performCursorZoom = !1, i || this._lastPosition.distanceToSquared(this.object.position) > Qe || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Qe || this._lastTargetPosition.distanceToSquared(this.target) > Qe ? (this.dispatchEvent(We), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
	}
	_getAutoRotationAngle(e) {
		return e === null ? Ze / 60 / 60 * this.autoRotateSpeed : Ze / 60 * this.autoRotateSpeed * e;
	}
	_getZoomScale(e) {
		let t = Math.abs(e * .01);
		return .95 ** (this.zoomSpeed * t);
	}
	_rotateLeft(e) {
		this._sphericalDelta.theta -= e;
	}
	_rotateUp(e) {
		this._sphericalDelta.phi -= e;
	}
	_panLeft(e, t) {
		Xe.setFromMatrixColumn(t, 0), Xe.multiplyScalar(-e), this._panOffset.add(Xe);
	}
	_panUp(e, t) {
		this.screenSpacePanning === !0 ? Xe.setFromMatrixColumn(t, 1) : (Xe.setFromMatrixColumn(t, 0), Xe.crossVectors(this.object.up, Xe)), Xe.multiplyScalar(e), this._panOffset.add(Xe);
	}
	_pan(e, t) {
		let n = this.domElement;
		if (this.object.isPerspectiveCamera) {
			let r = this.object.position;
			Xe.copy(r).sub(this.target);
			let i = Xe.length();
			i *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * i / n.clientHeight, this.object.matrix), this._panUp(2 * t * i / n.clientHeight, this.object.matrix);
		} else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : this.enablePan = !1;
	}
	_dollyOut(e) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : this.enableZoom = !1;
	}
	_dollyIn(e) {
		this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : this.enableZoom = !1;
	}
	_updateZoomParameters(e, t) {
		if (!this.zoomToCursor) return;
		this._performCursorZoom = !0;
		let n = this.domElement.getBoundingClientRect(), r = e - n.left, i = t - n.top, a = n.width, o = n.height;
		this._mouse.x = r / a * 2 - 1, this._mouse.y = -(i / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
	}
	_clampDistance(e) {
		return Math.max(this.minDistance, Math.min(this.maxDistance, e));
	}
	_handleMouseDownRotate(e) {
		this._rotateStart.set(e.clientX, e.clientY);
	}
	_handleMouseDownDolly(e) {
		this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
	}
	_handleMouseDownPan(e) {
		this._panStart.set(e.clientX, e.clientY);
	}
	_handleMouseMoveRotate(e) {
		this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let t = this.domElement;
		this._rotateLeft(Ze * this._rotateDelta.x / t.clientHeight), this._rotateUp(Ze * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
	}
	_handleMouseMoveDolly(e) {
		this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
	}
	_handleMouseMovePan(e) {
		this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
	}
	_handleMouseWheel(e) {
		this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
	}
	_handleKeyDown(e) {
		let t = !1;
		switch (e.code) {
			case this.keys.UP:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(Ze * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
				break;
			case this.keys.BOTTOM:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-Ze * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
				break;
			case this.keys.LEFT:
				e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(Ze * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
				break;
			case this.keys.RIGHT: e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-Ze * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
		}
		t && (e.preventDefault(), this.update());
	}
	_handleTouchStartRotate(e) {
		if (this._pointers.length === 1) this._rotateStart.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._rotateStart.set(n, r);
		}
	}
	_handleTouchStartPan(e) {
		if (this._pointers.length === 1) this._panStart.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._panStart.set(n, r);
		}
	}
	_handleTouchStartDolly(e) {
		let t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, i = Math.sqrt(n * n + r * r);
		this._dollyStart.set(0, i);
	}
	_handleTouchStartDollyPan(e) {
		this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
	}
	_handleTouchStartDollyRotate(e) {
		this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
	}
	_handleTouchMoveRotate(e) {
		if (this._pointers.length == 1) this._rotateEnd.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._rotateEnd.set(n, r);
		}
		this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
		let t = this.domElement;
		this._rotateLeft(Ze * this._rotateDelta.x / t.clientHeight), this._rotateUp(Ze * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
	}
	_handleTouchMovePan(e) {
		if (this._pointers.length === 1) this._panEnd.set(e.pageX, e.pageY);
		else {
			let t = this._getSecondPointerPosition(e), n = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
			this._panEnd.set(n, r);
		}
		this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
	}
	_handleTouchMoveDolly(e) {
		let t = this._getSecondPointerPosition(e), n = e.pageX - t.x, r = e.pageY - t.y, i = Math.sqrt(n * n + r * r);
		this._dollyEnd.set(0, i), this._dollyDelta.set(0, (this._dollyEnd.y / this._dollyStart.y) ** +this.zoomSpeed), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
		let a = (e.pageX + t.x) * .5, o = (e.pageY + t.y) * .5;
		this._updateZoomParameters(a, o);
	}
	_handleTouchMoveDollyPan(e) {
		this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
	}
	_handleTouchMoveDollyRotate(e) {
		this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
	}
	_addPointer(e) {
		this._pointers.push(e.pointerId);
	}
	_removePointer(e) {
		delete this._pointerPositions[e.pointerId];
		for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) {
			this._pointers.splice(t, 1);
			return;
		}
	}
	_isTrackingPointer(e) {
		for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) return !0;
		return !1;
	}
	_trackPointer(e) {
		let t = this._pointerPositions[e.pointerId];
		t === void 0 && (t = new y(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
	}
	_getSecondPointerPosition(e) {
		let t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
		return this._pointerPositions[t];
	}
	_customWheelEvent(e) {
		let t = e.deltaMode, n = {
			clientX: e.clientX,
			clientY: e.clientY,
			deltaY: e.deltaY
		};
		switch (t) {
			case 1:
				n.deltaY *= 16;
				break;
			case 2: n.deltaY *= 100;
		}
		return e.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
	}
};
function et(e) {
	this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e)));
}
function tt(e) {
	this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function nt(e) {
	switch (this._removePointer(e), this._pointers.length) {
		case 0:
			this.domElement.releasePointerCapture(e.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Ke), this.state = G.NONE;
			break;
		case 1:
			let t = this._pointers[0], n = this._pointerPositions[t];
			this._onTouchStart({
				pointerId: t,
				pageX: n.x,
				pageY: n.y
			});
	}
}
function rt(e) {
	let t;
	switch (e.button) {
		case 0:
			t = this.mouseButtons.LEFT;
			break;
		case 1:
			t = this.mouseButtons.MIDDLE;
			break;
		case 2:
			t = this.mouseButtons.RIGHT;
			break;
		default: t = -1;
	}
	switch (t) {
		case Me.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseDownDolly(e), this.state = G.DOLLY;
			break;
		case Me.ROTATE:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = G.PAN;
			} else {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = G.ROTATE;
			}
			break;
		case Me.PAN:
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				if (this.enableRotate === !1) return;
				this._handleMouseDownRotate(e), this.state = G.ROTATE;
			} else {
				if (this.enablePan === !1) return;
				this._handleMouseDownPan(e), this.state = G.PAN;
			}
			break;
		default: this.state = G.NONE;
	}
	this.state !== G.NONE && this.dispatchEvent(Ge);
}
function it(e) {
	switch (this.state) {
		case G.ROTATE:
			if (this.enableRotate === !1) return;
			this._handleMouseMoveRotate(e);
			break;
		case G.DOLLY:
			if (this.enableZoom === !1) return;
			this._handleMouseMoveDolly(e);
			break;
		case G.PAN:
			if (this.enablePan === !1) return;
			this._handleMouseMovePan(e);
	}
}
function at(e) {
	this.enabled !== !1 && this.enableZoom !== !1 && this.state === G.NONE && (e.preventDefault(), this.dispatchEvent(Ge), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(Ke));
}
function ot(e) {
	this.enabled !== !1 && this._handleKeyDown(e);
}
function st(e) {
	switch (this._trackPointer(e), this._pointers.length) {
		case 1:
			switch (this.touches.ONE) {
				case x.ROTATE:
					if (this.enableRotate === !1) return;
					this._handleTouchStartRotate(e), this.state = G.TOUCH_ROTATE;
					break;
				case x.PAN:
					if (this.enablePan === !1) return;
					this._handleTouchStartPan(e), this.state = G.TOUCH_PAN;
					break;
				default: this.state = G.NONE;
			}
			break;
		case 2:
			switch (this.touches.TWO) {
				case x.DOLLY_PAN:
					if (this.enableZoom === !1 && this.enablePan === !1) return;
					this._handleTouchStartDollyPan(e), this.state = G.TOUCH_DOLLY_PAN;
					break;
				case x.DOLLY_ROTATE:
					if (this.enableZoom === !1 && this.enableRotate === !1) return;
					this._handleTouchStartDollyRotate(e), this.state = G.TOUCH_DOLLY_ROTATE;
					break;
				default: this.state = G.NONE;
			}
			break;
		default: this.state = G.NONE;
	}
	this.state !== G.NONE && this.dispatchEvent(Ge);
}
function ct(e) {
	switch (this._trackPointer(e), this.state) {
		case G.TOUCH_ROTATE:
			if (this.enableRotate === !1) return;
			this._handleTouchMoveRotate(e), this.update();
			break;
		case G.TOUCH_PAN:
			if (this.enablePan === !1) return;
			this._handleTouchMovePan(e), this.update();
			break;
		case G.TOUCH_DOLLY_PAN:
			if (this.enableZoom === !1 && this.enablePan === !1) return;
			this._handleTouchMoveDollyPan(e), this.update();
			break;
		case G.TOUCH_DOLLY_ROTATE:
			if (this.enableZoom === !1 && this.enableRotate === !1) return;
			this._handleTouchMoveDollyRotate(e), this.update();
			break;
		default: this.state = G.NONE;
	}
}
function lt(e) {
	this.enabled !== !1 && e.preventDefault();
}
function ut(e) {
	e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
function dt(e) {
	e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
		passive: !0,
		capture: !0
	}));
}
//#endregion
//#region node_modules/three/examples/jsm/webxr/XRHandPrimitiveModel.js
var ft = new se(), pt = new z(), mt = class {
	constructor(e, t, n, r, i) {
		this.controller = t, this.handModel = e, this.envMap = null;
		let a;
		!i || !i.primitive || i.primitive === "sphere" ? a = new j(1, 10, 10) : i.primitive === "box" && (a = new Ve(1, 1, 1));
		let o = new ke();
		this.handMesh = new S(a, o, 30), this.handMesh.frustumCulled = !1, this.handMesh.instanceMatrix.setUsage(m), this.handMesh.castShadow = !0, this.handMesh.receiveShadow = !0, this.handModel.add(this.handMesh), this.joints = [
			"wrist",
			"thumb-metacarpal",
			"thumb-phalanx-proximal",
			"thumb-phalanx-distal",
			"thumb-tip",
			"index-finger-metacarpal",
			"index-finger-phalanx-proximal",
			"index-finger-phalanx-intermediate",
			"index-finger-phalanx-distal",
			"index-finger-tip",
			"middle-finger-metacarpal",
			"middle-finger-phalanx-proximal",
			"middle-finger-phalanx-intermediate",
			"middle-finger-phalanx-distal",
			"middle-finger-tip",
			"ring-finger-metacarpal",
			"ring-finger-phalanx-proximal",
			"ring-finger-phalanx-intermediate",
			"ring-finger-phalanx-distal",
			"ring-finger-tip",
			"pinky-finger-metacarpal",
			"pinky-finger-phalanx-proximal",
			"pinky-finger-phalanx-intermediate",
			"pinky-finger-phalanx-distal",
			"pinky-finger-tip"
		];
	}
	updateMesh() {
		let e = this.controller.joints, t = 0;
		for (let n = 0; n < this.joints.length; n++) {
			let r = e[this.joints[n]];
			r.visible && (pt.setScalar(r.jointRadius || .008), ft.compose(r.position, r.quaternion, pt), this.handMesh.setMatrixAt(n, ft), t++);
		}
		this.handMesh.count = t, this.handMesh.instanceMatrix.needsUpdate = !0;
	}
}, ht = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/", gt = class {
	constructor(e, t, n, r, i = null, a = null) {
		this.controller = t, this.handModel = e, this.bones = [], i === null && (i = new Oe(), i.setPath(n || ht)), i.load(`${r}.glb`, (e) => {
			let t = e.scene.children[0];
			this.handModel.add(t);
			let n = t.getObjectByProperty("type", "SkinnedMesh");
			n.frustumCulled = !1, n.castShadow = !0, n.receiveShadow = !0, [
				"wrist",
				"thumb-metacarpal",
				"thumb-phalanx-proximal",
				"thumb-phalanx-distal",
				"thumb-tip",
				"index-finger-metacarpal",
				"index-finger-phalanx-proximal",
				"index-finger-phalanx-intermediate",
				"index-finger-phalanx-distal",
				"index-finger-tip",
				"middle-finger-metacarpal",
				"middle-finger-phalanx-proximal",
				"middle-finger-phalanx-intermediate",
				"middle-finger-phalanx-distal",
				"middle-finger-tip",
				"ring-finger-metacarpal",
				"ring-finger-phalanx-proximal",
				"ring-finger-phalanx-intermediate",
				"ring-finger-phalanx-distal",
				"ring-finger-tip",
				"pinky-finger-metacarpal",
				"pinky-finger-phalanx-proximal",
				"pinky-finger-phalanx-intermediate",
				"pinky-finger-phalanx-distal",
				"pinky-finger-tip"
			].forEach((e) => {
				let n = t.getObjectByName(e);
				n !== void 0 && (n.jointName = e), this.bones.push(n);
			}), a && a(t);
		});
	}
	updateMesh() {
		let e = this.controller.joints;
		for (let t = 0; t < this.bones.length; t++) {
			let n = this.bones[t];
			if (n) {
				let t = e[n.jointName];
				if (t.visible) {
					let e = t.position;
					n.position.copy(e), n.quaternion.copy(t.quaternion);
				}
			}
		}
	}
}, _t = class extends he {
	constructor(e) {
		super(), this.controller = e, this.motionController = null, this.envMap = null, this.mesh = null;
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e), this.motionController && this.motionController.updateMesh();
	}
}, vt = class {
	constructor(e = null, t = null) {
		this.gltfLoader = e, this.path = null, this.onLoad = t;
	}
	setPath(e) {
		return this.path = e, this;
	}
	createHandModel(e, t) {
		let n = new _t(e);
		return e.addEventListener("connected", (r) => {
			let i = r.data;
			i.hand && !n.motionController && (n.xrInputSource = i, t === void 0 || t === "spheres" ? n.motionController = new mt(n, e, this.path, i.handedness, { primitive: "sphere" }) : t === "boxes" ? n.motionController = new mt(n, e, this.path, i.handedness, { primitive: "box" }) : t === "mesh" && (n.motionController = new gt(n, e, this.path, i.handedness, this.gltfLoader, this.onLoad)));
		}), e.addEventListener("disconnected", () => {
			n.clear(), n.motionController = null;
		}), n;
	}
};
//#endregion
//#region src/core/scene/cubeMap.ts
function yt(e, t, n) {
	e.onBeforeCompile = (e) => {
		e.uniforms.mjCube = { value: t }, e.uniforms.mjCubeSize = { value: n }, e.vertexShader = e.vertexShader.replace("#include <common>", "#include <common>\nuniform vec3 mjCubeSize;\nvarying vec3 vMjCubeDir;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvMjCubeDir = vec3(position.x, -position.z, position.y) / mjCubeSize;"), e.fragmentShader = e.fragmentShader.replace("#include <common>", "#include <common>\nuniform samplerCube mjCube;\nvarying vec3 vMjCubeDir;").replace("#include <map_fragment>", "diffuseColor *= textureCube(mjCube, vMjCubeDir);");
	}, e.addEventListener("dispose", () => t.dispose());
}
//#endregion
//#region src/core/scene/textures.ts
function bt(e, t, n) {
	let r = t.length / 4;
	switch (n) {
		case 1:
			for (let n = 0; n < r; n++) {
				let r = e[n];
				t[n * 4 + 0] = r, t[n * 4 + 1] = r, t[n * 4 + 2] = r, t[n * 4 + 3] = 255;
			}
			break;
		case 2:
			for (let n = 0; n < r; n++) {
				let r = e[n * 2 + 0], i = e[n * 2 + 1];
				t[n * 4 + 0] = r, t[n * 4 + 1] = r, t[n * 4 + 2] = r, t[n * 4 + 3] = i;
			}
			break;
		case 3:
			for (let n = 0; n < r; n++) t[n * 4 + 0] = e[n * 3 + 0], t[n * 4 + 1] = e[n * 3 + 1], t[n * 4 + 2] = e[n * 3 + 2], t[n * 4 + 3] = 255;
			break;
		case 4:
			t.set(e);
			break;
		default: for (let n = 0; n < r; n++) {
			let r = n < e.length ? e[n] : 0;
			t[n * 4 + 0] = r, t[n * 4 + 1] = r, t[n * 4 + 2] = r, t[n * 4 + 3] = 255;
		}
	}
}
function xt(e, t) {
	let n = e.tex_width ? Number(e.tex_width[t]) : 0, r = e.tex_height ? Number(e.tex_height[t]) : 0;
	if (!n || !r) return null;
	let i = e.tex_adr ? Number(e.tex_adr[t]) : 0, a = e.tex_nchannel ? Number(e.tex_nchannel[t]) : 0;
	if (a < 1 || a > 4) return null;
	let o = n * r, c = o * a;
	if (!e.tex_data || e.tex_data.length < i + c) return null;
	let l = e.tex_data.subarray(i, i + c), u = new Uint8Array(o * 4);
	bt(l, u, a);
	let d = new A(u, n, r, He, s);
	return d.needsUpdate = !0, d.flipY = !1, d.anisotropy = 4, d.magFilter = M, d.minFilter = ue, d.generateMipmaps = !0, d;
}
function St(e, t, n = [
	3,
	2,
	0,
	1,
	4,
	5
]) {
	let r = e.tex_width ? Number(e.tex_width[t]) : 0, a = e.tex_height ? Number(e.tex_height[t]) : 0;
	if (!r || !a) return null;
	let o = r, s, c;
	if (a === r) c = !0, s = a;
	else if (a === 6 * r) c = !1, s = r;
	else return null;
	if (o !== s) return null;
	let l = e.tex_adr ? Number(e.tex_adr[t]) : 0, u = e.tex_nchannel ? Number(e.tex_nchannel[t]) : 0, d = o * s, f = d * u, p = [];
	for (let t = 0; t < 6; t++) {
		let n = l + (c ? 0 : t * f);
		if (!e.tex_data || e.tex_data.length < n + f) return null;
		let r = e.tex_data.subarray(n, n + f), i = new Uint8Array(d * 4);
		bt(r, i, u), p.push(i);
	}
	let m = n.map((e) => p[e]), h = new i();
	if (!document.createElement("canvas").getContext("2d")) return null;
	let g = [];
	for (let e = 0; e < m.length; e++) {
		let t = m[e], n = document.createElement("canvas");
		n.width = o, n.height = s;
		let r = n.getContext("2d");
		if (!r) return null;
		let i = r.createImageData(o, s);
		i.data.set(t), r.putImageData(i, 0, 0), g.push(n);
	}
	return h.image = g, h.image.some((e) => e === null) ? null : (h.needsUpdate = !0, h.format = He, h.flipY = !1, h.magFilter = M, h.minFilter = M, h.generateMipmaps = !1, h);
}
function Ct({ mujoco: e, mjModel: t, texId: n, cubeFaceOrder: r }) {
	if (!t || n < 0) return null;
	let i = t.tex_type ? Number(t.tex_type[n]) : e.mjtTexture.mjTEXTURE_2D.value;
	return i === e.mjtTexture.mjTEXTURE_2D.value ? xt(t, n) : i === e.mjtTexture.mjTEXTURE_CUBE.value ? St(t, n, r) : null;
}
function wt(e, t) {
	if (!t.tex_type) return null;
	for (let n = 0; n < t.ntex; n++) if (Number(t.tex_type[n]) === e.mjtTexture.mjTEXTURE_SKYBOX.value) {
		let e = St(t, n, [
			0,
			1,
			2,
			3,
			4,
			5
		]);
		if (e) {
			let t = e.image;
			for (let e = 0; e < t.length; e++) {
				let n = t[e], r = document.createElement("canvas");
				r.width = n.width, r.height = n.height;
				let i = r.getContext("2d");
				i.translate(n.width, 0), i.scale(-1, 1), i.drawImage(n, 0, 0), t[e] = r;
			}
			e.needsUpdate = !0;
		}
		return e;
	}
	return null;
}
//#endregion
//#region src/core/scene/tendons.ts
function Tt(e, t) {
	let n = new le();
	n.color = new f(.8, .3, .3);
	let r = Math.max(0, t.nwrap), i = Math.max(0, t.nwrap), a = new S(new ge(1, 1, 1), n, r);
	a.receiveShadow = !0, a.castShadow = !0, a.count = 0, a.instanceMatrix.setUsage(m), a.computeBoundingSphere(), e.add(a);
	let o = new S(new j(1, 10, 10), n, i);
	return o.receiveShadow = !0, o.castShadow = !0, o.count = 0, o.instanceMatrix.setUsage(m), o.computeBoundingSphere(), e.add(o), e.cylinders = a, e.spheres = o, {
		cylinders: a,
		spheres: o
	};
}
function Et(e, t, n, r) {
	if (!n.cylinders) return;
	let i = 0, a = r.matrix;
	for (let r = 0; r < e.ntendon; r++) {
		let o = t.ten_wrapadr[r], s = e.tendon_width[r];
		for (let e = o; e < o + t.ten_wrapnum[r] - 1; e++) {
			let r = Rt(t.wrap_xpos, e, new z()), o = Rt(t.wrap_xpos, e + 1, new z()), c = new z().addVectors(r, o).multiplyScalar(.5), l = r.length() > .01, u = o.length() > .01;
			l && n.spheres.setMatrixAt(i, a.compose(r, new U(), new z(s, s, s))), u && n.spheres.setMatrixAt(i + 1, a.compose(o, new U(), new z(s, s, s))), l && u && (a.compose(c, new U().setFromUnitVectors(new z(0, 1, 0), o.clone().sub(r).normalize()), new z(s, r.distanceTo(o), s)), n.cylinders.setMatrixAt(i, a), i++);
		}
	}
	r.numWraps = i;
}
function Dt(e, t) {
	if (!e.cylinders) return;
	let n = t.numWraps;
	e.cylinders.count = n, e.spheres.count = n > 0 ? n + 1 : 0, e.cylinders.instanceMatrix.needsUpdate = !0, e.spheres.instanceMatrix.needsUpdate = !0, n > 0 && (e.cylinders.computeBoundingSphere(), e.spheres.computeBoundingSphere());
}
function Ot() {
	return {
		numWraps: 0,
		matrix: new se()
	};
}
//#endregion
//#region src/core/scene/primitive.ts
function kt(e, t) {
	switch (e) {
		case "plane": {
			let e = new Ue(t[0] * 2, t[1] * 2);
			return e.rotateX(-Math.PI / 2), e;
		}
		case "sphere": return new j(t[0]);
		case "capsule": return new ze(t[0], t[1] * 2, 20, 20);
		case "ellipsoid": return new j(1);
		case "cylinder": return new ge(t[0], t[0], t[1] * 2);
		case "box": return new Ve(t[0] * 2, t[2] * 2, t[1] * 2);
	}
}
function At(e, t, n) {
	return e === "ellipsoid" ? n.set(t[0], t[2], t[1]) : n.set(1, 1, 1);
}
//#endregion
//#region src/core/scene/scene.ts
function jt(e, t, n = 1) {
	let r = t === -1 ? null : e, i = r?.mat_specular?.[t] ?? .5, a = r?.mat_shininess?.[t] ?? .5, o = r?.mat_metallic?.[t] ?? -1, s = r?.mat_roughness?.[t] ?? -1;
	return {
		specularIntensity: i * n,
		roughness: s >= 0 ? s : 1 - a,
		metalness: o >= 0 ? o : 0
	};
}
function Mt(e) {
	if (!e) return !1;
	let t = e.trim();
	return t.startsWith("<mujoco") || t.startsWith("<?xml");
}
function Nt(e) {
	if (!e) return "";
	let t = e.split("/"), n = [];
	for (let e of t) e && e !== "." && (e === ".." ? n.length && n.pop() : n.push(e));
	return n.join("/");
}
function Pt(e) {
	return new _e({
		uniforms: {
			uColor: { value: e.color },
			uOpacity: { value: e.opacity },
			uTexture: { value: e.texture },
			uHasTexture: { value: e.texture !== null },
			uUVScale: { value: new y(e.uvScaleX, e.uvScaleZ) },
			uPlaneY: { value: e.planeY },
			uCenterX: { value: e.centerX },
			uCenterZ: { value: e.centerZ },
			uInfiniteX: { value: e.infiniteX },
			uInfiniteZ: { value: e.infiniteZ },
			uHalfExtentX: { value: e.halfExtentX },
			uHalfExtentZ: { value: e.halfExtentZ },
			uProjInverse: { value: new se() },
			uCamWorldMatrix: { value: new se() }
		},
		vertexShader: "\n      varying vec2 vNDC;\n      void main() {\n        vNDC = position.xy;\n        gl_Position = vec4(position.xy, 1.0, 1.0);\n      }\n    ",
		fragmentShader: "\n      precision highp float;\n      varying vec2 vNDC;\n      uniform vec3 uColor;\n      uniform float uOpacity;\n      uniform sampler2D uTexture;\n      uniform bool uHasTexture;\n      uniform vec2 uUVScale;\n      uniform float uPlaneY;\n      uniform float uCenterX;\n      uniform float uCenterZ;\n      uniform bool uInfiniteX;\n      uniform bool uInfiniteZ;\n      uniform float uHalfExtentX;\n      uniform float uHalfExtentZ;\n      uniform mat4 uProjInverse;\n      uniform mat4 uCamWorldMatrix;\n\n      void main() {\n        // Unproject NDC to view-space ray\n        vec4 viewRay = uProjInverse * vec4(vNDC, 1.0, 1.0);\n        viewRay /= viewRay.w;\n\n        // Transform to world-space direction\n        vec3 worldDir = normalize((uCamWorldMatrix * vec4(viewRay.xyz, 0.0)).xyz);\n\n        // Ray-plane intersection at y = uPlaneY\n        float denom = worldDir.y;\n        if (abs(denom) < 1e-6) discard;\n\n        float t = (uPlaneY - cameraPosition.y) / denom;\n        if (t < 0.0) discard;\n\n        vec3 worldPos = cameraPosition + t * worldDir;\n\n        // Clip finite extents relative to geom center\n        if (!uInfiniteX && abs(worldPos.x - uCenterX) > uHalfExtentX) discard;\n        if (!uInfiniteZ && abs(worldPos.z - uCenterZ) > uHalfExtentZ) discard;\n\n        if (uHasTexture) {\n          // MuJoCo GL_OBJECT_PLANE formula:\n          //   infinite: S = worldPos * 0.5 * texrepeat\n          //   finite:   S = worldPos * 0.5 * texrepeat / halfSize\n          // Both cases are baked into uUVScale on the JS side.\n          vec2 uv = fract(worldPos.xz * uUVScale);\n          gl_FragColor = texture2D(uTexture, uv) * vec4(uColor, uOpacity);\n        } else {\n          gl_FragColor = vec4(uColor, uOpacity);\n        }\n      }\n    ",
		transparent: e.opacity < 1,
		depthTest: !0,
		depthWrite: !1,
		side: 2
	});
}
async function Ft(e, t, n) {
	let r;
	r = Mt(t) ? `/working/${`inline_model_${Math.abs(t.split("").reduce((e, t) => (e = (e << 5) - e + t.charCodeAt(0), e & e), 0))}.xml`}` : `/working/${Nt(String(t || "").trim().replace(/^(\.\/)+/, ""))}`;
	try {
		if (!e.FS.analyzePath(r, !1).exists) throw Error(`Scene XML not found at ${r}`);
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		throw Error(`Scene XML not accessible at ${r}: ${t}`);
	}
	let a = null;
	try {
		if (r.toLowerCase().endsWith(".mjb")) {
			let t = new e.MjVFS();
			try {
				a = e.MjModel.mj_loadModel(r, t);
			} finally {
				t.delete();
			}
		} else a = e.MjModel.mj_loadXML(r);
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		throw Error(`Failed to load MjModel from ${r}: ${t}`);
	}
	if (!a) throw Error(`MjModel loading returned null for ${r}`);
	let o = null;
	try {
		o = new e.MjData(a);
	} catch (e) {
		try {
			a.delete();
		} catch {}
		let t = e instanceof Error ? e.message : String(e);
		throw Error(`Failed to create MjData: ${t}`);
	}
	if (!o) {
		try {
			a.delete();
		} catch {}
		throw Error(`MjData constructor returned null for model loaded from ${r}`);
	}
	let s = a, c = o, l = new TextDecoder("utf-8"), u = new Uint8Array(s.names), p = new B();
	p.name = "MuJoCo Root", n.scene.add(p);
	let m = {}, h = {}, g = oe(s);
	for (let t = 0; t < s.ngeom; t++) {
		if (!(s.geom_group[t] < 3)) continue;
		let n = s.geom_bodyid[t], r = s.geom_type[t], a = [
			s.geom_size[t * 3 + 0],
			s.geom_size[t * 3 + 1],
			s.geom_size[t * 3 + 2]
		];
		if (!(n in m)) {
			m[n] = new B();
			let e = s.name_bodyadr[n], t = e;
			for (; t < u.length && u[t] !== 0;) t++;
			let r = u.subarray(e, t);
			m[n].name = l.decode(r), m[n].bodyID = n, m[n].has_custom_mesh = !1;
		}
		let o;
		switch (r) {
			case e.mjtGeom.mjGEOM_PLANE.value:
				o = a[0] === 0 || a[1] === 0 ? new Ue(2, 2) : kt("plane", a);
				break;
			case e.mjtGeom.mjGEOM_HFIELD.value:
				o = Lt(s, t);
				break;
			case e.mjtGeom.mjGEOM_SPHERE.value:
				o = kt("sphere", a);
				break;
			case e.mjtGeom.mjGEOM_CAPSULE.value:
				o = kt("capsule", a);
				break;
			case e.mjtGeom.mjGEOM_ELLIPSOID.value:
				o = kt("ellipsoid", a);
				break;
			case e.mjtGeom.mjGEOM_CYLINDER.value:
				o = kt("cylinder", a);
				break;
			case e.mjtGeom.mjGEOM_BOX.value:
				o = kt("box", a);
				break;
			case e.mjtGeom.mjGEOM_MESH.value: {
				let e = s.geom_dataid[t];
				e in h || (h[e] = It(s, e)), o = h[e], m[n].has_custom_mesh = !0;
				break;
			}
		}
		let c = [
			s.geom_rgba[t * 4 + 0],
			s.geom_rgba[t * 4 + 1],
			s.geom_rgba[t * 4 + 2],
			s.geom_rgba[t * 4 + 3]
		], p = null;
		if (s.geom_matid[t] !== -1) {
			let n = s.geom_matid[t];
			c = [
				s.mat_rgba[n * 4 + 0],
				s.mat_rgba[n * 4 + 1],
				s.mat_rgba[n * 4 + 2],
				s.mat_rgba[n * 4 + 3]
			];
			let i = e.mjtTextureRole.mjTEXROLE_RGB.value, a = s.mat_texid[n * e.mjtTextureRole.mjNTEXROLE.value + i];
			if (a !== -1 && (p = Ct({
				mujoco: e,
				mjModel: s,
				texId: a,
				cubeFaceOrder: r === e.mjtGeom.mjGEOM_BOX.value ? [
					0,
					1,
					2,
					3,
					4,
					5
				] : void 0
			}), p)) {
				let e = s.mat_texrepeat ? s.mat_texrepeat[n * 2 + 0] : 1, t = s.mat_texrepeat ? s.mat_texrepeat[n * 2 + 1] : 1;
				p.repeat.set(e, t), p.wrapS = d, p.wrapT = d;
			}
		}
		let _ = new fe({
			color: new f(c[0], c[1], c[2]),
			transparent: c[3] < 1,
			opacity: c[3],
			...jt(s, s.geom_matid[t], g)
		});
		if (p) {
			if (!(p instanceof i)) _.map = p;
			else if (r === e.mjtGeom.mjGEOM_BOX.value) {
				let e = s.mat_texuniform[s.geom_matid[t]];
				yt(_, p, e ? [
					1,
					1,
					1
				] : a);
			} else _.envMap = p, _.envMapIntensity = s.geom_matid[t] === -1 ? 0 : s.mat_reflectance?.[s.geom_matid[t]] ?? 0;
		}
		if (!o) continue;
		let v = new xe(o, _), y = m[n].name === "terrain";
		v.castShadow = !y && t !== 0, v.receiveShadow = r !== e.mjtGeom.mjGEOM_MESH.value, v.bodyID = n, v.userData.geomId = t, v.userData.ignoreDragForce = y, m[n].userData.ignoreDragForce = y, m[n].add(v), r === e.mjtGeom.mjGEOM_PLANE.value && (v.userData.isGroundPlane = !0), Rt(s.geom_pos, t, v.position);
		let b = r === e.mjtGeom.mjGEOM_PLANE.value && (a[0] === 0 || a[1] === 0);
		if (b || zt(s.geom_quat, t, v.quaternion), r === e.mjtGeom.mjGEOM_ELLIPSOID.value && At("ellipsoid", a, v.scale), b) {
			let e = _, t = e.map ?? null, n = t?.repeat.x ?? 1, r = t?.repeat.y ?? 1, i = a[0] > 0 ? n * .5 / a[0] : n * .5, o = a[1] > 0 ? r * .5 / a[1] : r * .5, s = Pt({
				color: e.color.clone(),
				opacity: e.opacity,
				texture: t,
				uvScaleX: i,
				uvScaleZ: o,
				planeY: v.position.y,
				centerX: v.position.x,
				centerZ: v.position.z,
				infiniteX: a[0] === 0,
				infiniteZ: a[1] === 0,
				halfExtentX: a[0],
				halfExtentZ: a[1]
			});
			v.material = s, v.frustumCulled = !1, v.renderOrder = 1, v.onBeforeRender = (e, t, n) => {
				s.uniforms.uProjInverse.value.copy(n.projectionMatrixInverse), s.uniforms.uCamWorldMatrix.value.copy(n.matrixWorld);
			};
		} else if (r === e.mjtGeom.mjGEOM_PLANE.value) {
			let e = _, r = e.clone();
			r.side = 1, r.transparent = !0, r.opacity = e.opacity * .35, r.depthWrite = !1;
			let i = new xe(o, r);
			i.userData.isGroundPlane = !0, i.userData.geomId = t, i.position.copy(v.position), i.quaternion.copy(v.quaternion), i.raycast = () => {}, m[n].add(i);
		}
	}
	Tt(p, s);
	let _ = Ee({
		mujoco: e,
		mjModel: s,
		mujocoRoot: p,
		bodies: m
	});
	for (let e = 0; e < s.nbody; e++) {
		if (!m[e]) {
			m[e] = new B();
			let t = s.name_bodyadr[e], n = t;
			for (; n < u.length && u[n] !== 0;) n++;
			m[e].name = l.decode(u.subarray(t, n)), m[e].bodyID = e, m[e].has_custom_mesh = !1;
		}
		e === 0 || !m[0] ? p.add(m[e]) : m[0].add(m[e]);
	}
	n.bodies = m, n.lights = _, n.meshes = h, n.mujocoRoot = p;
	let v = wt(e, s);
	if (n.scene.background = v, !s || "deleted" in s) throw Error("loadSceneFromURL: mjModel is invalid or already deleted");
	return [
		s,
		c,
		m,
		_
	];
}
function It(e, t) {
	let n = new c(), r = e.mesh_vert.slice(e.mesh_vertadr[t] * 3, (e.mesh_vertadr[t] + e.mesh_vertnum[t]) * 3);
	for (let e = 0; e < r.length; e += 3) {
		let t = r[e + 1];
		r[e + 1] = r[e + 2], r[e + 2] = -t;
	}
	let i = e.mesh_normal.slice(e.mesh_normaladr[t] * 3, (e.mesh_normaladr[t] + e.mesh_normalnum[t]) * 3);
	for (let e = 0; e < i.length; e += 3) {
		let t = i[e + 1];
		i[e + 1] = i[e + 2], i[e + 2] = -t;
	}
	let a = e.mesh_texcoord.subarray(e.mesh_texcoordadr[t] * 2, (e.mesh_texcoordadr[t] + e.mesh_texcoordnum[t]) * 2), o = e.mesh_face.subarray(e.mesh_faceadr[t] * 3, (e.mesh_faceadr[t] + e.mesh_facenum[t]) * 3), s = e.mesh_facetexcoord.subarray(e.mesh_faceadr[t] * 3, (e.mesh_faceadr[t] + e.mesh_facenum[t]) * 3), l = e.mesh_facenormal.subarray(e.mesh_faceadr[t] * 3, (e.mesh_faceadr[t] + e.mesh_facenum[t]) * 3), u = [], d = [], f = [], p = [], m = /* @__PURE__ */ new Map(), h = o.length / 3;
	for (let e = 0; e < h; e++) for (let t = 0; t < 3; t++) {
		let n = o[e * 3 + t], c = l[e * 3 + t], h = s[e * 3 + t], g = `${n}_${c}_${h}`, _ = m.get(g);
		_ === void 0 && (_ = u.length / 3, m.set(g, _), u.push(r[n * 3 + 0], r[n * 3 + 1], r[n * 3 + 2]), d.push(i[c * 3 + 0], i[c * 3 + 1], i[c * 3 + 2]), f.push(a[h * 2 + 0], a[h * 2 + 1])), p.push(_);
	}
	return n.setAttribute("position", new N(u, 3)), n.setAttribute("normal", new N(d, 3)), n.setAttribute("uv", new N(f, 2)), n.setIndex(p), n.computeVertexNormals(), n;
}
function Lt(e, t) {
	let n = e.geom_dataid[t];
	if (n < 0) return;
	let r = e.hfield_nrow[n], i = e.hfield_ncol[n];
	if (r < 2 || i < 2) return;
	let a = e.hfield_size[n * 4 + 0], o = e.hfield_size[n * 4 + 1], s = e.hfield_size[n * 4 + 2], l = e.hfield_adr[n], u = e.hfield_data.subarray(l, l + r * i), d = new Float32Array(r * i * 3), f = new Float32Array(r * i * 2), p = i > 1 ? 2 * a / (i - 1) : 0, m = r > 1 ? 2 * o / (r - 1) : 0, h = 0, g = 0;
	for (let e = 0; e < r; e++) {
		let t = m * e - o;
		for (let n = 0; n < i; n++) {
			let o = p * n - a, c = u[e * i + n] * s;
			d[h++] = o, d[h++] = c, d[h++] = -t, f[g++] = i > 1 ? n / (i - 1) : 0, f[g++] = r > 1 ? e / (r - 1) : 0;
		}
	}
	let _ = (r - 1) * (i - 1) * 6, v = _ > 65535 ? new Uint32Array(_) : new Uint16Array(_), y = 0;
	for (let e = 0; e < r - 1; e++) for (let t = 0; t < i - 1; t++) {
		let n = e * i + t, r = n + 1, a = n + i, o = a + 1;
		v[y++] = n, v[y++] = r, v[y++] = o, v[y++] = n, v[y++] = o, v[y++] = a;
	}
	let b = new c();
	return b.setAttribute("position", new F(d, 3)), b.setAttribute("uv", new F(f, 2)), b.setIndex(new F(v, 1)), b.computeVertexNormals(), b;
}
function Rt(e, t, n, r = !0) {
	return r ? n.set(e[t * 3 + 0], e[t * 3 + 2], -e[t * 3 + 1]) : n.set(e[t * 3 + 0], e[t * 3 + 1], e[t * 3 + 2]);
}
function zt(e, t, n, r = !0) {
	return r ? n.set(-e[t * 4 + 1], -e[t * 4 + 3], e[t * 4 + 2], -e[t * 4 + 0]) : n.set(e[t * 4 + 0], e[t * 4 + 1], e[t * 4 + 2], e[t * 4 + 3]);
}
//#endregion
//#region src/core/utils/mjzLoader.ts
var Bt = /* @__PURE__ */ e((/* @__PURE__ */ n(((e, n) => {
	(function(t) {
		typeof e == "object" && n !== void 0 ? n.exports = t() : typeof define == "function" && define.amd ? define([], t) : (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this).JSZip = t();
	})(function() {
		return function e(n, r, i) {
			function a(s, c) {
				if (!r[s]) {
					if (!n[s]) {
						var l = typeof t == "function" && t;
						if (!c && l) return l(s, !0);
						if (o) return o(s, !0);
						var u = /* @__PURE__ */ Error("Cannot find module '" + s + "'");
						throw u.code = "MODULE_NOT_FOUND", u;
					}
					var d = r[s] = { exports: {} };
					n[s][0].call(d.exports, function(e) {
						var t = n[s][1][e];
						return a(t || e);
					}, d, d.exports, e, n, r, i);
				}
				return r[s].exports;
			}
			for (var o = typeof t == "function" && t, s = 0; s < i.length; s++) a(i[s]);
			return a;
		}({
			1: [function(e, t, n) {
				var r = e("./utils"), i = e("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				n.encode = function(e) {
					for (var t, n, i, o, s, c, l, u = [], d = 0, f = e.length, p = f, m = r.getTypeOf(e) !== "string"; d < e.length;) p = f - d, i = m ? (t = e[d++], n = d < f ? e[d++] : 0, d < f ? e[d++] : 0) : (t = e.charCodeAt(d++), n = d < f ? e.charCodeAt(d++) : 0, d < f ? e.charCodeAt(d++) : 0), o = t >> 2, s = (3 & t) << 4 | n >> 4, c = 1 < p ? (15 & n) << 2 | i >> 6 : 64, l = 2 < p ? 63 & i : 64, u.push(a.charAt(o) + a.charAt(s) + a.charAt(c) + a.charAt(l));
					return u.join("");
				}, n.decode = function(e) {
					var t, n, r, o, s, c, l = 0, u = 0, d = "data:";
					if (e.substr(0, d.length) === d) throw Error("Invalid base64 input, it looks like a data url.");
					var f, p = 3 * (e = e.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
					if (e.charAt(e.length - 1) === a.charAt(64) && p--, e.charAt(e.length - 2) === a.charAt(64) && p--, p % 1 != 0) throw Error("Invalid base64 input, bad content length.");
					for (f = i.uint8array ? new Uint8Array(0 | p) : Array(0 | p); l < e.length;) t = a.indexOf(e.charAt(l++)) << 2 | (o = a.indexOf(e.charAt(l++))) >> 4, n = (15 & o) << 4 | (s = a.indexOf(e.charAt(l++))) >> 2, r = (3 & s) << 6 | (c = a.indexOf(e.charAt(l++))), f[u++] = t, s !== 64 && (f[u++] = n), c !== 64 && (f[u++] = r);
					return f;
				};
			}, {
				"./support": 30,
				"./utils": 32
			}],
			2: [function(e, t, n) {
				var r = e("./external"), i = e("./stream/DataWorker"), a = e("./stream/Crc32Probe"), o = e("./stream/DataLengthProbe");
				function s(e, t, n, r, i) {
					this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = i;
				}
				s.prototype = {
					getContentWorker: function() {
						var e = new i(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")), t = this;
						return e.on("end", function() {
							if (this.streamInfo.data_length !== t.uncompressedSize) throw Error("Bug : uncompressed data size mismatch");
						}), e;
					},
					getCompressedWorker: function() {
						return new i(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
					}
				}, s.createWorkerFrom = function(e, t, n) {
					return e.pipe(new a()).pipe(new o("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new o("compressedSize")).withStreamInfo("compression", t);
				}, t.exports = s;
			}, {
				"./external": 6,
				"./stream/Crc32Probe": 25,
				"./stream/DataLengthProbe": 26,
				"./stream/DataWorker": 27
			}],
			3: [function(e, t, n) {
				var r = e("./stream/GenericWorker");
				n.STORE = {
					magic: "\0\0",
					compressWorker: function() {
						return new r("STORE compression");
					},
					uncompressWorker: function() {
						return new r("STORE decompression");
					}
				}, n.DEFLATE = e("./flate");
			}, {
				"./flate": 7,
				"./stream/GenericWorker": 28
			}],
			4: [function(e, t, n) {
				var r = e("./utils"), i = function() {
					for (var e, t = [], n = 0; n < 256; n++) {
						e = n;
						for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
						t[n] = e;
					}
					return t;
				}();
				t.exports = function(e, t) {
					return e !== void 0 && e.length ? r.getTypeOf(e) === "string" ? function(e, t, n, r) {
						var a = i, o = r + n;
						e ^= -1;
						for (var s = r; s < o; s++) e = e >>> 8 ^ a[255 & (e ^ t.charCodeAt(s))];
						return -1 ^ e;
					}(0 | t, e, e.length, 0) : function(e, t, n, r) {
						var a = i, o = r + n;
						e ^= -1;
						for (var s = r; s < o; s++) e = e >>> 8 ^ a[255 & (e ^ t[s])];
						return -1 ^ e;
					}(0 | t, e, e.length, 0) : 0;
				};
			}, { "./utils": 32 }],
			5: [function(e, t, n) {
				n.base64 = !1, n.binary = !1, n.dir = !1, n.createFolders = !0, n.date = null, n.compression = null, n.compressionOptions = null, n.comment = null, n.unixPermissions = null, n.dosPermissions = null;
			}, {}],
			6: [function(e, t, n) {
				var r = null;
				r = typeof Promise < "u" ? Promise : e("lie"), t.exports = { Promise: r };
			}, { lie: 37 }],
			7: [function(e, t, n) {
				var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", i = e("pako"), a = e("./utils"), o = e("./stream/GenericWorker"), s = r ? "uint8array" : "array";
				function c(e, t) {
					o.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
				}
				n.magic = "\b\0", a.inherits(c, o), c.prototype.processChunk = function(e) {
					this.meta = e.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(s, e.data), !1);
				}, c.prototype.flush = function() {
					o.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
				}, c.prototype.cleanUp = function() {
					o.prototype.cleanUp.call(this), this._pako = null;
				}, c.prototype._createPako = function() {
					this._pako = new i[this._pakoAction]({
						raw: !0,
						level: this._pakoOptions.level || -1
					});
					var e = this;
					this._pako.onData = function(t) {
						e.push({
							data: t,
							meta: e.meta
						});
					};
				}, n.compressWorker = function(e) {
					return new c("Deflate", e);
				}, n.uncompressWorker = function() {
					return new c("Inflate", {});
				};
			}, {
				"./stream/GenericWorker": 28,
				"./utils": 32,
				pako: 38
			}],
			8: [function(e, t, n) {
				function r(e, t) {
					var n, r = "";
					for (n = 0; n < t; n++) r += String.fromCharCode(255 & e), e >>>= 8;
					return r;
				}
				function i(e, t, n, i, o, u) {
					var d, f, p = e.file, m = e.compression, h = u !== s.utf8encode, g = a.transformTo("string", u(p.name)), _ = a.transformTo("string", s.utf8encode(p.name)), v = p.comment, y = a.transformTo("string", u(v)), b = a.transformTo("string", s.utf8encode(v)), x = _.length !== p.name.length, S = b.length !== v.length, C = "", w = "", T = "", E = p.dir, D = p.date, O = {
						crc32: 0,
						compressedSize: 0,
						uncompressedSize: 0
					};
					t && !n || (O.crc32 = e.crc32, O.compressedSize = e.compressedSize, O.uncompressedSize = e.uncompressedSize);
					var k = 0;
					t && (k |= 8), h || !x && !S || (k |= 2048);
					var A = 0, j = 0;
					E && (A |= 16), o === "UNIX" ? (j = 798, A |= function(e, t) {
						var n = e;
						return e || (n = t ? 16893 : 33204), (65535 & n) << 16;
					}(p.unixPermissions, E)) : (j = 20, A |= function(e) {
						return 63 & (e || 0);
					}(p.dosPermissions)), d = D.getUTCHours(), d <<= 6, d |= D.getUTCMinutes(), d <<= 5, d |= D.getUTCSeconds() / 2, f = D.getUTCFullYear() - 1980, f <<= 4, f |= D.getUTCMonth() + 1, f <<= 5, f |= D.getUTCDate(), x && (w = r(1, 1) + r(c(g), 4) + _, C += "up" + r(w.length, 2) + w), S && (T = r(1, 1) + r(c(y), 4) + b, C += "uc" + r(T.length, 2) + T);
					var M = "";
					return M += "\n\0", M += r(k, 2), M += m.magic, M += r(d, 2), M += r(f, 2), M += r(O.crc32, 4), M += r(O.compressedSize, 4), M += r(O.uncompressedSize, 4), M += r(g.length, 2), M += r(C.length, 2), {
						fileRecord: l.LOCAL_FILE_HEADER + M + g + C,
						dirRecord: l.CENTRAL_FILE_HEADER + r(j, 2) + M + r(y.length, 2) + "\0\0\0\0" + r(A, 4) + r(i, 4) + g + C + y
					};
				}
				var a = e("../utils"), o = e("../stream/GenericWorker"), s = e("../utf8"), c = e("../crc32"), l = e("../signature");
				function u(e, t, n, r) {
					o.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
				}
				a.inherits(u, o), u.prototype.push = function(e) {
					var t = e.meta.percent || 0, n = this.entriesCount, r = this._sources.length;
					this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, o.prototype.push.call(this, {
						data: e.data,
						meta: {
							currentFile: this.currentFile,
							percent: n ? (t + 100 * (n - r - 1)) / n : 100
						}
					}));
				}, u.prototype.openedSource = function(e) {
					this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
					var t = this.streamFiles && !e.file.dir;
					if (t) {
						var n = i(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
						this.push({
							data: n.fileRecord,
							meta: { percent: 0 }
						});
					} else this.accumulate = !0;
				}, u.prototype.closedSource = function(e) {
					this.accumulate = !1;
					var t = this.streamFiles && !e.file.dir, n = i(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
					if (this.dirRecords.push(n.dirRecord), t) this.push({
						data: function(e) {
							return l.DATA_DESCRIPTOR + r(e.crc32, 4) + r(e.compressedSize, 4) + r(e.uncompressedSize, 4);
						}(e),
						meta: { percent: 100 }
					});
					else for (this.push({
						data: n.fileRecord,
						meta: { percent: 0 }
					}); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
					this.currentFile = null;
				}, u.prototype.flush = function() {
					for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({
						data: this.dirRecords[t],
						meta: { percent: 100 }
					});
					var n = this.bytesWritten - e, i = function(e, t, n, i, o) {
						var s = a.transformTo("string", o(i));
						return l.CENTRAL_DIRECTORY_END + "\0\0\0\0" + r(e, 2) + r(e, 2) + r(t, 4) + r(n, 4) + r(s.length, 2) + s;
					}(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
					this.push({
						data: i,
						meta: { percent: 100 }
					});
				}, u.prototype.prepareNextSource = function() {
					this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
				}, u.prototype.registerPrevious = function(e) {
					this._sources.push(e);
					var t = this;
					return e.on("data", function(e) {
						t.processChunk(e);
					}), e.on("end", function() {
						t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
					}), e.on("error", function(e) {
						t.error(e);
					}), this;
				}, u.prototype.resume = function() {
					return !!o.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
				}, u.prototype.error = function(e) {
					var t = this._sources;
					if (!o.prototype.error.call(this, e)) return !1;
					for (var n = 0; n < t.length; n++) try {
						t[n].error(e);
					} catch {}
					return !0;
				}, u.prototype.lock = function() {
					o.prototype.lock.call(this);
					for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
				}, t.exports = u;
			}, {
				"../crc32": 4,
				"../signature": 23,
				"../stream/GenericWorker": 28,
				"../utf8": 31,
				"../utils": 32
			}],
			9: [function(e, t, n) {
				var r = e("../compressions"), i = e("./ZipFileWorker");
				n.generateWorker = function(e, t, n) {
					var a = new i(t.streamFiles, n, t.platform, t.encodeFileName), o = 0;
					try {
						e.forEach(function(e, n) {
							o++;
							var i = function(e, t) {
								var n = e || t, i = r[n];
								if (!i) throw Error(n + " is not a valid compression method !");
								return i;
							}(n.options.compression, t.compression), s = n.options.compressionOptions || t.compressionOptions || {}, c = n.dir, l = n.date;
							n._compressWorker(i, s).withStreamInfo("file", {
								name: e,
								dir: c,
								date: l,
								comment: n.comment || "",
								unixPermissions: n.unixPermissions,
								dosPermissions: n.dosPermissions
							}).pipe(a);
						}), a.entriesCount = o;
					} catch (e) {
						a.error(e);
					}
					return a;
				};
			}, {
				"../compressions": 3,
				"./ZipFileWorker": 8
			}],
			10: [function(e, t, n) {
				function r() {
					if (!(this instanceof r)) return new r();
					if (arguments.length) throw Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
					this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function() {
						var e = new r();
						for (var t in this) typeof this[t] != "function" && (e[t] = this[t]);
						return e;
					};
				}
				(r.prototype = e("./object")).loadAsync = e("./load"), r.support = e("./support"), r.defaults = e("./defaults"), r.version = "3.10.1", r.loadAsync = function(e, t) {
					return new r().loadAsync(e, t);
				}, r.external = e("./external"), t.exports = r;
			}, {
				"./defaults": 5,
				"./external": 6,
				"./load": 11,
				"./object": 15,
				"./support": 30
			}],
			11: [function(e, t, n) {
				var r = e("./utils"), i = e("./external"), a = e("./utf8"), o = e("./zipEntries"), s = e("./stream/Crc32Probe"), c = e("./nodejsUtils");
				function l(e) {
					return new i.Promise(function(t, n) {
						var r = e.decompressed.getContentWorker().pipe(new s());
						r.on("error", function(e) {
							n(e);
						}).on("end", function() {
							r.streamInfo.crc32 === e.decompressed.crc32 ? t() : n(/* @__PURE__ */ Error("Corrupted zip : CRC32 mismatch"));
						}).resume();
					});
				}
				t.exports = function(e, t) {
					var n = this;
					return t = r.extend(t || {}, {
						base64: !1,
						checkCRC32: !1,
						optimizedBinaryString: !1,
						createFolders: !1,
						decodeFileName: a.utf8decode
					}), c.isNode && c.isStream(e) ? i.Promise.reject(/* @__PURE__ */ Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(e) {
						var n = new o(t);
						return n.load(e), n;
					}).then(function(e) {
						var n = [i.Promise.resolve(e)], r = e.files;
						if (t.checkCRC32) for (var a = 0; a < r.length; a++) n.push(l(r[a]));
						return i.Promise.all(n);
					}).then(function(e) {
						for (var i = e.shift(), a = i.files, o = 0; o < a.length; o++) {
							var s = a[o], c = s.fileNameStr, l = r.resolve(s.fileNameStr);
							n.file(l, s.decompressed, {
								binary: !0,
								optimizedBinaryString: !0,
								date: s.date,
								dir: s.dir,
								comment: s.fileCommentStr.length ? s.fileCommentStr : null,
								unixPermissions: s.unixPermissions,
								dosPermissions: s.dosPermissions,
								createFolders: t.createFolders
							}), s.dir || (n.file(l).unsafeOriginalName = c);
						}
						return i.zipComment.length && (n.comment = i.zipComment), n;
					});
				};
			}, {
				"./external": 6,
				"./nodejsUtils": 14,
				"./stream/Crc32Probe": 25,
				"./utf8": 31,
				"./utils": 32,
				"./zipEntries": 33
			}],
			12: [function(e, t, n) {
				var r = e("../utils"), i = e("../stream/GenericWorker");
				function a(e, t) {
					i.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
				}
				r.inherits(a, i), a.prototype._bindStream = function(e) {
					var t = this;
					(this._stream = e).pause(), e.on("data", function(e) {
						t.push({
							data: e,
							meta: { percent: 0 }
						});
					}).on("error", function(e) {
						t.isPaused ? this.generatedError = e : t.error(e);
					}).on("end", function() {
						t.isPaused ? t._upstreamEnded = !0 : t.end();
					});
				}, a.prototype.pause = function() {
					return !!i.prototype.pause.call(this) && (this._stream.pause(), !0);
				}, a.prototype.resume = function() {
					return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
				}, t.exports = a;
			}, {
				"../stream/GenericWorker": 28,
				"../utils": 32
			}],
			13: [function(e, t, n) {
				var r = e("readable-stream").Readable;
				function i(e, t, n) {
					r.call(this, t), this._helper = e;
					var i = this;
					e.on("data", function(e, t) {
						i.push(e) || i._helper.pause(), n && n(t);
					}).on("error", function(e) {
						i.emit("error", e);
					}).on("end", function() {
						i.push(null);
					});
				}
				e("../utils").inherits(i, r), i.prototype._read = function() {
					this._helper.resume();
				}, t.exports = i;
			}, {
				"../utils": 32,
				"readable-stream": 16
			}],
			14: [function(e, t, n) {
				t.exports = {
					isNode: typeof Buffer < "u",
					newBufferFrom: function(e, t) {
						if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, t);
						if (typeof e == "number") throw Error("The \"data\" argument must not be a number");
						return new Buffer(e, t);
					},
					allocBuffer: function(e) {
						if (Buffer.alloc) return Buffer.alloc(e);
						var t = new Buffer(e);
						return t.fill(0), t;
					},
					isBuffer: function(e) {
						return Buffer.isBuffer(e);
					},
					isStream: function(e) {
						return e && typeof e.on == "function" && typeof e.pause == "function" && typeof e.resume == "function";
					}
				};
			}, {}],
			15: [function(e, t, n) {
				function r(e, t, n) {
					var r, i = a.getTypeOf(t), s = a.extend(n || {}, c);
					s.date = s.date || /* @__PURE__ */ new Date(), s.compression !== null && (s.compression = s.compression.toUpperCase()), typeof s.unixPermissions == "string" && (s.unixPermissions = parseInt(s.unixPermissions, 8)), s.unixPermissions && 16384 & s.unixPermissions && (s.dir = !0), s.dosPermissions && 16 & s.dosPermissions && (s.dir = !0), s.dir && (e = h(e)), s.createFolders && (r = m(e)) && g.call(this, r, !0);
					var d = i === "string" && !1 === s.binary && !1 === s.base64;
					n && n.binary !== void 0 || (s.binary = !d), (t instanceof l && t.uncompressedSize === 0 || s.dir || !t || t.length === 0) && (s.base64 = !1, s.binary = !0, t = "", s.compression = "STORE", i = "string");
					var _ = null;
					_ = t instanceof l || t instanceof o ? t : f.isNode && f.isStream(t) ? new p(e, t) : a.prepareContent(e, t, s.binary, s.optimizedBinaryString, s.base64);
					var v = new u(e, _, s);
					this.files[e] = v;
				}
				var i = e("./utf8"), a = e("./utils"), o = e("./stream/GenericWorker"), s = e("./stream/StreamHelper"), c = e("./defaults"), l = e("./compressedObject"), u = e("./zipObject"), d = e("./generate"), f = e("./nodejsUtils"), p = e("./nodejs/NodejsStreamInputAdapter"), m = function(e) {
					e.slice(-1) === "/" && (e = e.substring(0, e.length - 1));
					var t = e.lastIndexOf("/");
					return 0 < t ? e.substring(0, t) : "";
				}, h = function(e) {
					return e.slice(-1) !== "/" && (e += "/"), e;
				}, g = function(e, t) {
					return t = t === void 0 ? c.createFolders : t, e = h(e), this.files[e] || r.call(this, e, null, {
						dir: !0,
						createFolders: t
					}), this.files[e];
				};
				function _(e) {
					return Object.prototype.toString.call(e) === "[object RegExp]";
				}
				t.exports = {
					load: function() {
						throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
					},
					forEach: function(e) {
						var t, n, r;
						for (t in this.files) r = this.files[t], (n = t.slice(this.root.length, t.length)) && t.slice(0, this.root.length) === this.root && e(n, r);
					},
					filter: function(e) {
						var t = [];
						return this.forEach(function(n, r) {
							e(n, r) && t.push(r);
						}), t;
					},
					file: function(e, t, n) {
						if (arguments.length !== 1) return e = this.root + e, r.call(this, e, t, n), this;
						if (_(e)) {
							var i = e;
							return this.filter(function(e, t) {
								return !t.dir && i.test(e);
							});
						}
						var a = this.files[this.root + e];
						return a && !a.dir ? a : null;
					},
					folder: function(e) {
						if (!e) return this;
						if (_(e)) return this.filter(function(t, n) {
							return n.dir && e.test(t);
						});
						var t = this.root + e, n = g.call(this, t), r = this.clone();
						return r.root = n.name, r;
					},
					remove: function(e) {
						e = this.root + e;
						var t = this.files[e];
						if (t ||= (e.slice(-1) !== "/" && (e += "/"), this.files[e]), t && !t.dir) delete this.files[e];
						else for (var n = this.filter(function(t, n) {
							return n.name.slice(0, e.length) === e;
						}), r = 0; r < n.length; r++) delete this.files[n[r].name];
						return this;
					},
					generate: function() {
						throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
					},
					generateInternalStream: function(e) {
						var t, n = {};
						try {
							if ((n = a.extend(e || {}, {
								streamFiles: !1,
								compression: "STORE",
								compressionOptions: null,
								type: "",
								platform: "DOS",
								comment: null,
								mimeType: "application/zip",
								encodeFileName: i.utf8encode
							})).type = n.type.toLowerCase(), n.compression = n.compression.toUpperCase(), n.type === "binarystring" && (n.type = "string"), !n.type) throw Error("No output type specified.");
							a.checkSupport(n.type), n.platform !== "darwin" && n.platform !== "freebsd" && n.platform !== "linux" && n.platform !== "sunos" || (n.platform = "UNIX"), n.platform === "win32" && (n.platform = "DOS");
							var r = n.comment || this.comment || "";
							t = d.generateWorker(this, n, r);
						} catch (e) {
							(t = new o("error")).error(e);
						}
						return new s(t, n.type || "string", n.mimeType);
					},
					generateAsync: function(e, t) {
						return this.generateInternalStream(e).accumulate(t);
					},
					generateNodeStream: function(e, t) {
						return (e ||= {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
					}
				};
			}, {
				"./compressedObject": 2,
				"./defaults": 5,
				"./generate": 9,
				"./nodejs/NodejsStreamInputAdapter": 12,
				"./nodejsUtils": 14,
				"./stream/GenericWorker": 28,
				"./stream/StreamHelper": 29,
				"./utf8": 31,
				"./utils": 32,
				"./zipObject": 35
			}],
			16: [function(e, t, n) {
				t.exports = e("stream");
			}, { stream: void 0 }],
			17: [function(e, t, n) {
				var r = e("./DataReader");
				function i(e) {
					r.call(this, e);
					for (var t = 0; t < this.data.length; t++) e[t] = 255 & e[t];
				}
				e("../utils").inherits(i, r), i.prototype.byteAt = function(e) {
					return this.data[this.zero + e];
				}, i.prototype.lastIndexOfSignature = function(e) {
					for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.length - 4; 0 <= a; --a) if (this.data[a] === t && this.data[a + 1] === n && this.data[a + 2] === r && this.data[a + 3] === i) return a - this.zero;
					return -1;
				}, i.prototype.readAndCheckSignature = function(e) {
					var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.readData(4);
					return t === a[0] && n === a[1] && r === a[2] && i === a[3];
				}, i.prototype.readData = function(e) {
					if (this.checkOffset(e), e === 0) return [];
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./DataReader": 18
			}],
			18: [function(e, t, n) {
				var r = e("../utils");
				function i(e) {
					this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
				}
				i.prototype = {
					checkOffset: function(e) {
						this.checkIndex(this.index + e);
					},
					checkIndex: function(e) {
						if (this.length < this.zero + e || e < 0) throw Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
					},
					setIndex: function(e) {
						this.checkIndex(e), this.index = e;
					},
					skip: function(e) {
						this.setIndex(this.index + e);
					},
					byteAt: function() {},
					readInt: function(e) {
						var t, n = 0;
						for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--) n = (n << 8) + this.byteAt(t);
						return this.index += e, n;
					},
					readString: function(e) {
						return r.transformTo("string", this.readData(e));
					},
					readData: function() {},
					lastIndexOfSignature: function() {},
					readAndCheckSignature: function() {},
					readDate: function() {
						var e = this.readInt(4);
						return new Date(Date.UTC(1980 + (e >> 25 & 127), (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1));
					}
				}, t.exports = i;
			}, { "../utils": 32 }],
			19: [function(e, t, n) {
				var r = e("./Uint8ArrayReader");
				function i(e) {
					r.call(this, e);
				}
				e("../utils").inherits(i, r), i.prototype.readData = function(e) {
					this.checkOffset(e);
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./Uint8ArrayReader": 21
			}],
			20: [function(e, t, n) {
				var r = e("./DataReader");
				function i(e) {
					r.call(this, e);
				}
				e("../utils").inherits(i, r), i.prototype.byteAt = function(e) {
					return this.data.charCodeAt(this.zero + e);
				}, i.prototype.lastIndexOfSignature = function(e) {
					return this.data.lastIndexOf(e) - this.zero;
				}, i.prototype.readAndCheckSignature = function(e) {
					return e === this.readData(4);
				}, i.prototype.readData = function(e) {
					this.checkOffset(e);
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./DataReader": 18
			}],
			21: [function(e, t, n) {
				var r = e("./ArrayReader");
				function i(e) {
					r.call(this, e);
				}
				e("../utils").inherits(i, r), i.prototype.readData = function(e) {
					if (this.checkOffset(e), e === 0) return /* @__PURE__ */ new Uint8Array();
					var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = i;
			}, {
				"../utils": 32,
				"./ArrayReader": 17
			}],
			22: [function(e, t, n) {
				var r = e("../utils"), i = e("../support"), a = e("./ArrayReader"), o = e("./StringReader"), s = e("./NodeBufferReader"), c = e("./Uint8ArrayReader");
				t.exports = function(e) {
					var t = r.getTypeOf(e);
					return r.checkSupport(t), t !== "string" || i.uint8array ? t === "nodebuffer" ? new s(e) : i.uint8array ? new c(r.transformTo("uint8array", e)) : new a(r.transformTo("array", e)) : new o(e);
				};
			}, {
				"../support": 30,
				"../utils": 32,
				"./ArrayReader": 17,
				"./NodeBufferReader": 19,
				"./StringReader": 20,
				"./Uint8ArrayReader": 21
			}],
			23: [function(e, t, n) {
				n.LOCAL_FILE_HEADER = "PK", n.CENTRAL_FILE_HEADER = "PK", n.CENTRAL_DIRECTORY_END = "PK", n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", n.ZIP64_CENTRAL_DIRECTORY_END = "PK", n.DATA_DESCRIPTOR = "PK\x07\b";
			}, {}],
			24: [function(e, t, n) {
				var r = e("./GenericWorker"), i = e("../utils");
				function a(e) {
					r.call(this, "ConvertWorker to " + e), this.destType = e;
				}
				i.inherits(a, r), a.prototype.processChunk = function(e) {
					this.push({
						data: i.transformTo(this.destType, e.data),
						meta: e.meta
					});
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			25: [function(e, t, n) {
				var r = e("./GenericWorker"), i = e("../crc32");
				function a() {
					r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
				}
				e("../utils").inherits(a, r), a.prototype.processChunk = function(e) {
					this.streamInfo.crc32 = i(e.data, this.streamInfo.crc32 || 0), this.push(e);
				}, t.exports = a;
			}, {
				"../crc32": 4,
				"../utils": 32,
				"./GenericWorker": 28
			}],
			26: [function(e, t, n) {
				var r = e("../utils"), i = e("./GenericWorker");
				function a(e) {
					i.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
				}
				r.inherits(a, i), a.prototype.processChunk = function(e) {
					if (e) {
						var t = this.streamInfo[this.propName] || 0;
						this.streamInfo[this.propName] = t + e.data.length;
					}
					i.prototype.processChunk.call(this, e);
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			27: [function(e, t, n) {
				var r = e("../utils"), i = e("./GenericWorker");
				function a(e) {
					i.call(this, "DataWorker");
					var t = this;
					this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(e) {
						t.dataIsReady = !0, t.data = e, t.max = e && e.length || 0, t.type = r.getTypeOf(e), t.isPaused || t._tickAndRepeat();
					}, function(e) {
						t.error(e);
					});
				}
				r.inherits(a, i), a.prototype.cleanUp = function() {
					i.prototype.cleanUp.call(this), this.data = null;
				}, a.prototype.resume = function() {
					return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, r.delay(this._tickAndRepeat, [], this)), !0);
				}, a.prototype._tickAndRepeat = function() {
					this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
				}, a.prototype._tick = function() {
					if (this.isPaused || this.isFinished) return !1;
					var e = null, t = Math.min(this.max, this.index + 16384);
					if (this.index >= this.max) return this.end();
					switch (this.type) {
						case "string":
							e = this.data.substring(this.index, t);
							break;
						case "uint8array":
							e = this.data.subarray(this.index, t);
							break;
						case "array":
						case "nodebuffer": e = this.data.slice(this.index, t);
					}
					return this.index = t, this.push({
						data: e,
						meta: { percent: this.max ? this.index / this.max * 100 : 0 }
					});
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			28: [function(e, t, n) {
				function r(e) {
					this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
						data: [],
						end: [],
						error: []
					}, this.previous = null;
				}
				r.prototype = {
					push: function(e) {
						this.emit("data", e);
					},
					end: function() {
						if (this.isFinished) return !1;
						this.flush();
						try {
							this.emit("end"), this.cleanUp(), this.isFinished = !0;
						} catch (e) {
							this.emit("error", e);
						}
						return !0;
					},
					error: function(e) {
						return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
					},
					on: function(e, t) {
						return this._listeners[e].push(t), this;
					},
					cleanUp: function() {
						this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
					},
					emit: function(e, t) {
						if (this._listeners[e]) for (var n = 0; n < this._listeners[e].length; n++) this._listeners[e][n].call(this, t);
					},
					pipe: function(e) {
						return e.registerPrevious(this);
					},
					registerPrevious: function(e) {
						if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
						this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
						var t = this;
						return e.on("data", function(e) {
							t.processChunk(e);
						}), e.on("end", function() {
							t.end();
						}), e.on("error", function(e) {
							t.error(e);
						}), this;
					},
					pause: function() {
						return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
					},
					resume: function() {
						if (!this.isPaused || this.isFinished) return !1;
						var e = this.isPaused = !1;
						return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
					},
					flush: function() {},
					processChunk: function(e) {
						this.push(e);
					},
					withStreamInfo: function(e, t) {
						return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
					},
					mergeStreamInfo: function() {
						for (var e in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
					},
					lock: function() {
						if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
						this.isLocked = !0, this.previous && this.previous.lock();
					},
					toString: function() {
						var e = "Worker " + this.name;
						return this.previous ? this.previous + " -> " + e : e;
					}
				}, t.exports = r;
			}, {}],
			29: [function(e, t, n) {
				var r = e("../utils"), i = e("./ConvertWorker"), a = e("./GenericWorker"), o = e("../base64"), s = e("../support"), c = e("../external"), l = null;
				if (s.nodestream) try {
					l = e("../nodejs/NodejsStreamOutputAdapter");
				} catch {}
				function u(e, t) {
					return new c.Promise(function(n, i) {
						var a = [], s = e._internalType, c = e._outputType, l = e._mimeType;
						e.on("data", function(e, n) {
							a.push(e), t && t(n);
						}).on("error", function(e) {
							a = [], i(e);
						}).on("end", function() {
							try {
								n(function(e, t, n) {
									switch (e) {
										case "blob": return r.newBlob(r.transformTo("arraybuffer", t), n);
										case "base64": return o.encode(t);
										default: return r.transformTo(e, t);
									}
								}(c, function(e, t) {
									var n, r = 0, i = null, a = 0;
									for (n = 0; n < t.length; n++) a += t[n].length;
									switch (e) {
										case "string": return t.join("");
										case "array": return Array.prototype.concat.apply([], t);
										case "uint8array":
											for (i = new Uint8Array(a), n = 0; n < t.length; n++) i.set(t[n], r), r += t[n].length;
											return i;
										case "nodebuffer": return Buffer.concat(t);
										default: throw Error("concat : unsupported type '" + e + "'");
									}
								}(s, a), l));
							} catch (e) {
								i(e);
							}
							a = [];
						}).resume();
					});
				}
				function d(e, t, n) {
					var o = t;
					switch (t) {
						case "blob":
						case "arraybuffer":
							o = "uint8array";
							break;
						case "base64": o = "string";
					}
					try {
						this._internalType = o, this._outputType = t, this._mimeType = n, r.checkSupport(o), this._worker = e.pipe(new i(o)), e.lock();
					} catch (e) {
						this._worker = new a("error"), this._worker.error(e);
					}
				}
				d.prototype = {
					accumulate: function(e) {
						return u(this, e);
					},
					on: function(e, t) {
						var n = this;
						return e === "data" ? this._worker.on(e, function(e) {
							t.call(n, e.data, e.meta);
						}) : this._worker.on(e, function() {
							r.delay(t, arguments, n);
						}), this;
					},
					resume: function() {
						return r.delay(this._worker.resume, [], this._worker), this;
					},
					pause: function() {
						return this._worker.pause(), this;
					},
					toNodejsStream: function(e) {
						if (r.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw Error(this._outputType + " is not supported by this method");
						return new l(this, { objectMode: this._outputType !== "nodebuffer" }, e);
					}
				}, t.exports = d;
			}, {
				"../base64": 1,
				"../external": 6,
				"../nodejs/NodejsStreamOutputAdapter": 13,
				"../support": 30,
				"../utils": 32,
				"./ConvertWorker": 24,
				"./GenericWorker": 28
			}],
			30: [function(e, t, n) {
				if (n.base64 = !0, n.array = !0, n.string = !0, n.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", n.nodebuffer = typeof Buffer < "u", n.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") n.blob = !1;
				else {
					var r = /* @__PURE__ */ new ArrayBuffer(0);
					try {
						n.blob = new Blob([r], { type: "application/zip" }).size === 0;
					} catch {
						try {
							var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
							i.append(r), n.blob = i.getBlob("application/zip").size === 0;
						} catch {
							n.blob = !1;
						}
					}
				}
				try {
					n.nodestream = !!e("readable-stream").Readable;
				} catch {
					n.nodestream = !1;
				}
			}, { "readable-stream": 16 }],
			31: [function(e, t, n) {
				for (var r = e("./utils"), i = e("./support"), a = e("./nodejsUtils"), o = e("./stream/GenericWorker"), s = Array(256), c = 0; c < 256; c++) s[c] = 252 <= c ? 6 : 248 <= c ? 5 : 240 <= c ? 4 : 224 <= c ? 3 : 192 <= c ? 2 : 1;
				s[254] = s[254] = 1;
				function l() {
					o.call(this, "utf-8 decode"), this.leftOver = null;
				}
				function u() {
					o.call(this, "utf-8 encode");
				}
				n.utf8encode = function(e) {
					return i.nodebuffer ? a.newBufferFrom(e, "utf-8") : function(e) {
						var t, n, r, a, o, s = e.length, c = 0;
						for (a = 0; a < s; a++) (64512 & (n = e.charCodeAt(a))) == 55296 && a + 1 < s && (64512 & (r = e.charCodeAt(a + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), a++), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
						for (t = i.uint8array ? new Uint8Array(c) : Array(c), a = o = 0; o < c; a++) (64512 & (n = e.charCodeAt(a))) == 55296 && a + 1 < s && (64512 & (r = e.charCodeAt(a + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), a++), n < 128 ? t[o++] = n : (n < 2048 ? t[o++] = 192 | n >>> 6 : (n < 65536 ? t[o++] = 224 | n >>> 12 : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63), t[o++] = 128 | n >>> 6 & 63), t[o++] = 128 | 63 & n);
						return t;
					}(e);
				}, n.utf8decode = function(e) {
					return i.nodebuffer ? r.transformTo("nodebuffer", e).toString("utf-8") : function(e) {
						var t, n, i, a, o = e.length, c = Array(2 * o);
						for (t = n = 0; t < o;) if ((i = e[t++]) < 128) c[n++] = i;
						else if (4 < (a = s[i])) c[n++] = 65533, t += a - 1;
						else {
							for (i &= a === 2 ? 31 : a === 3 ? 15 : 7; 1 < a && t < o;) i = i << 6 | 63 & e[t++], a--;
							1 < a ? c[n++] = 65533 : i < 65536 ? c[n++] = i : (i -= 65536, c[n++] = 55296 | i >> 10 & 1023, c[n++] = 56320 | 1023 & i);
						}
						return c.length !== n && (c.subarray ? c = c.subarray(0, n) : c.length = n), r.applyFromCharCode(c);
					}(e = r.transformTo(i.uint8array ? "uint8array" : "array", e));
				}, r.inherits(l, o), l.prototype.processChunk = function(e) {
					var t = r.transformTo(i.uint8array ? "uint8array" : "array", e.data);
					if (this.leftOver && this.leftOver.length) {
						if (i.uint8array) {
							var a = t;
							(t = new Uint8Array(a.length + this.leftOver.length)).set(this.leftOver, 0), t.set(a, this.leftOver.length);
						} else t = this.leftOver.concat(t);
						this.leftOver = null;
					}
					var o = function(e, t) {
						var n;
						for ((t ||= e.length) > e.length && (t = e.length), n = t - 1; 0 <= n && (192 & e[n]) == 128;) n--;
						return n < 0 || n === 0 ? t : n + s[e[n]] > t ? n : t;
					}(t), c = t;
					o !== t.length && (i.uint8array ? (c = t.subarray(0, o), this.leftOver = t.subarray(o, t.length)) : (c = t.slice(0, o), this.leftOver = t.slice(o, t.length))), this.push({
						data: n.utf8decode(c),
						meta: e.meta
					});
				}, l.prototype.flush = function() {
					this.leftOver && this.leftOver.length && (this.push({
						data: n.utf8decode(this.leftOver),
						meta: {}
					}), this.leftOver = null);
				}, n.Utf8DecodeWorker = l, r.inherits(u, o), u.prototype.processChunk = function(e) {
					this.push({
						data: n.utf8encode(e.data),
						meta: e.meta
					});
				}, n.Utf8EncodeWorker = u;
			}, {
				"./nodejsUtils": 14,
				"./stream/GenericWorker": 28,
				"./support": 30,
				"./utils": 32
			}],
			32: [function(e, t, n) {
				var r = e("./support"), i = e("./base64"), a = e("./nodejsUtils"), o = e("./external");
				function s(e) {
					return e;
				}
				function c(e, t) {
					for (var n = 0; n < e.length; ++n) t[n] = 255 & e.charCodeAt(n);
					return t;
				}
				e("setimmediate"), n.newBlob = function(e, t) {
					n.checkSupport("blob");
					try {
						return new Blob([e], { type: t });
					} catch {
						try {
							var r = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
							return r.append(e), r.getBlob(t);
						} catch {
							throw Error("Bug : can't construct the Blob.");
						}
					}
				};
				var l = {
					stringifyByChunk: function(e, t, n) {
						var r = [], i = 0, a = e.length;
						if (a <= n) return String.fromCharCode.apply(null, e);
						for (; i < a;) t === "array" || t === "nodebuffer" ? r.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + n, a)))) : r.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + n, a)))), i += n;
						return r.join("");
					},
					stringifyByChar: function(e) {
						for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
						return t;
					},
					applyCanBeUsed: {
						uint8array: function() {
							try {
								return r.uint8array && String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1)).length === 1;
							} catch {
								return !1;
							}
						}(),
						nodebuffer: function() {
							try {
								return r.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1;
							} catch {
								return !1;
							}
						}()
					}
				};
				function u(e) {
					var t = 65536, r = n.getTypeOf(e), i = !0;
					if (r === "uint8array" ? i = l.applyCanBeUsed.uint8array : r === "nodebuffer" && (i = l.applyCanBeUsed.nodebuffer), i) for (; 1 < t;) try {
						return l.stringifyByChunk(e, r, t);
					} catch {
						t = Math.floor(t / 2);
					}
					return l.stringifyByChar(e);
				}
				function d(e, t) {
					for (var n = 0; n < e.length; n++) t[n] = e[n];
					return t;
				}
				n.applyFromCharCode = u;
				var f = {};
				f.string = {
					string: s,
					array: function(e) {
						return c(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return f.string.uint8array(e).buffer;
					},
					uint8array: function(e) {
						return c(e, new Uint8Array(e.length));
					},
					nodebuffer: function(e) {
						return c(e, a.allocBuffer(e.length));
					}
				}, f.array = {
					string: u,
					array: s,
					arraybuffer: function(e) {
						return new Uint8Array(e).buffer;
					},
					uint8array: function(e) {
						return new Uint8Array(e);
					},
					nodebuffer: function(e) {
						return a.newBufferFrom(e);
					}
				}, f.arraybuffer = {
					string: function(e) {
						return u(new Uint8Array(e));
					},
					array: function(e) {
						return d(new Uint8Array(e), Array(e.byteLength));
					},
					arraybuffer: s,
					uint8array: function(e) {
						return new Uint8Array(e);
					},
					nodebuffer: function(e) {
						return a.newBufferFrom(new Uint8Array(e));
					}
				}, f.uint8array = {
					string: u,
					array: function(e) {
						return d(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return e.buffer;
					},
					uint8array: s,
					nodebuffer: function(e) {
						return a.newBufferFrom(e);
					}
				}, f.nodebuffer = {
					string: u,
					array: function(e) {
						return d(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return f.nodebuffer.uint8array(e).buffer;
					},
					uint8array: function(e) {
						return d(e, new Uint8Array(e.length));
					},
					nodebuffer: s
				}, n.transformTo = function(e, t) {
					return t ||= "", e ? (n.checkSupport(e), f[n.getTypeOf(t)][e](t)) : t;
				}, n.resolve = function(e) {
					for (var t = e.split("/"), n = [], r = 0; r < t.length; r++) {
						var i = t[r];
						i === "." || i === "" && r !== 0 && r !== t.length - 1 || (i === ".." ? n.pop() : n.push(i));
					}
					return n.join("/");
				}, n.getTypeOf = function(e) {
					return typeof e == "string" ? "string" : Object.prototype.toString.call(e) === "[object Array]" ? "array" : r.nodebuffer && a.isBuffer(e) ? "nodebuffer" : r.uint8array && e instanceof Uint8Array ? "uint8array" : r.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0;
				}, n.checkSupport = function(e) {
					if (!r[e.toLowerCase()]) throw Error(e + " is not supported by this platform");
				}, n.MAX_VALUE_16BITS = 65535, n.MAX_VALUE_32BITS = -1, n.pretty = function(e) {
					var t, n, r = "";
					for (n = 0; n < (e || "").length; n++) r += "\\x" + ((t = e.charCodeAt(n)) < 16 ? "0" : "") + t.toString(16).toUpperCase();
					return r;
				}, n.delay = function(e, t, n) {
					setImmediate(function() {
						e.apply(n || null, t || []);
					});
				}, n.inherits = function(e, t) {
					function n() {}
					n.prototype = t.prototype, e.prototype = new n();
				}, n.extend = function() {
					var e, t, n = {};
					for (e = 0; e < arguments.length; e++) for (t in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], t) && n[t] === void 0 && (n[t] = arguments[e][t]);
					return n;
				}, n.prepareContent = function(e, t, a, s, l) {
					return o.Promise.resolve(t).then(function(e) {
						return r.blob && (e instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(e)) !== -1) && typeof FileReader < "u" ? new o.Promise(function(t, n) {
							var r = new FileReader();
							r.onload = function(e) {
								t(e.target.result);
							}, r.onerror = function(e) {
								n(e.target.error);
							}, r.readAsArrayBuffer(e);
						}) : e;
					}).then(function(t) {
						var u = n.getTypeOf(t);
						return u ? (u === "arraybuffer" ? t = n.transformTo("uint8array", t) : u === "string" && (l ? t = i.decode(t) : a && !0 !== s && (t = function(e) {
							return c(e, r.uint8array ? new Uint8Array(e.length) : Array(e.length));
						}(t))), t) : o.Promise.reject(/* @__PURE__ */ Error("Can't read the data of '" + e + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
					});
				};
			}, {
				"./base64": 1,
				"./external": 6,
				"./nodejsUtils": 14,
				"./support": 30,
				setimmediate: 54
			}],
			33: [function(e, t, n) {
				var r = e("./reader/readerFor"), i = e("./utils"), a = e("./signature"), o = e("./zipEntry"), s = e("./support");
				function c(e) {
					this.files = [], this.loadOptions = e;
				}
				c.prototype = {
					checkSignature: function(e) {
						if (!this.reader.readAndCheckSignature(e)) {
							this.reader.index -= 4;
							var t = this.reader.readString(4);
							throw Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t) + ", expected " + i.pretty(e) + ")");
						}
					},
					isSignature: function(e, t) {
						var n = this.reader.index;
						this.reader.setIndex(e);
						var r = this.reader.readString(4) === t;
						return this.reader.setIndex(n), r;
					},
					readBlockEndOfCentral: function() {
						this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
						var e = this.reader.readData(this.zipCommentLength), t = s.uint8array ? "uint8array" : "array", n = i.transformTo(t, e);
						this.zipComment = this.loadOptions.decodeFileName(n);
					},
					readBlockZip64EndOfCentral: function() {
						this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
						for (var e, t, n, r = this.zip64EndOfCentralSize - 44; 0 < r;) e = this.reader.readInt(2), t = this.reader.readInt(4), n = this.reader.readData(t), this.zip64ExtensibleData[e] = {
							id: e,
							length: t,
							value: n
						};
					},
					readBlockZip64EndOfCentralLocator: function() {
						if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw Error("Multi-volumes zip are not supported");
					},
					readLocalFiles: function() {
						for (var e = 0, t; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
					},
					readCentralDir: function() {
						var e;
						for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);) (e = new o({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);
						if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
					},
					readEndOfCentral: function() {
						var e = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
						if (e < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? /* @__PURE__ */ Error("Corrupted zip: can't find end of central directory") : /* @__PURE__ */ Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
						this.reader.setIndex(e);
						var t = e;
						if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
							if (this.zip64 = !0, (e = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
							if (this.reader.setIndex(e), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw Error("Corrupted zip: can't find the ZIP64 end of central directory");
							this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
						}
						var n = this.centralDirOffset + this.centralDirSize;
						this.zip64 && (n += 20, n += 12 + this.zip64EndOfCentralSize);
						var r = t - n;
						if (0 < r) this.isSignature(t, a.CENTRAL_FILE_HEADER) || (this.reader.zero = r);
						else if (r < 0) throw Error("Corrupted zip: missing " + Math.abs(r) + " bytes.");
					},
					prepareReader: function(e) {
						this.reader = r(e);
					},
					load: function(e) {
						this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
					}
				}, t.exports = c;
			}, {
				"./reader/readerFor": 22,
				"./signature": 23,
				"./support": 30,
				"./utils": 32,
				"./zipEntry": 34
			}],
			34: [function(e, t, n) {
				var r = e("./reader/readerFor"), i = e("./utils"), a = e("./compressedObject"), o = e("./crc32"), s = e("./utf8"), c = e("./compressions"), l = e("./support");
				function u(e, t) {
					this.options = e, this.loadOptions = t;
				}
				u.prototype = {
					isEncrypted: function() {
						return (1 & this.bitFlag) == 1;
					},
					useUTF8: function() {
						return (2048 & this.bitFlag) == 2048;
					},
					readLocalPart: function(e) {
						var t, n;
						if (e.skip(22), this.fileNameLength = e.readInt(2), n = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1) throw Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
						if ((t = function(e) {
							for (var t in c) if (Object.prototype.hasOwnProperty.call(c, t) && c[t].magic === e) return c[t];
							return null;
						}(this.compressionMethod)) === null) throw Error("Corrupted zip : compression " + i.pretty(this.compressionMethod) + " unknown (inner file : " + i.transformTo("string", this.fileName) + ")");
						this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
					},
					readCentralPart: function(e) {
						this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
						var t = e.readInt(2);
						if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw Error("Encrypted zip are not supported");
						e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
					},
					processAttributes: function() {
						this.unixPermissions = null, this.dosPermissions = null;
						var e = this.versionMadeBy >> 8;
						this.dir = !!(16 & this.externalFileAttributes), e == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), e == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
					},
					parseZIP64ExtraField: function() {
						if (this.extraFields[1]) {
							var e = r(this.extraFields[1].value);
							this.uncompressedSize === i.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === i.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === i.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === i.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
						}
					},
					readExtraFields: function(e) {
						var t, n, r, i = e.index + this.extraFieldsLength;
						for (this.extraFields ||= {}; e.index + 4 < i;) t = e.readInt(2), n = e.readInt(2), r = e.readData(n), this.extraFields[t] = {
							id: t,
							length: n,
							value: r
						};
						e.setIndex(i);
					},
					handleUTF8: function() {
						var e = l.uint8array ? "uint8array" : "array";
						if (this.useUTF8()) this.fileNameStr = s.utf8decode(this.fileName), this.fileCommentStr = s.utf8decode(this.fileComment);
						else {
							var t = this.findExtraFieldUnicodePath();
							if (t !== null) this.fileNameStr = t;
							else {
								var n = i.transformTo(e, this.fileName);
								this.fileNameStr = this.loadOptions.decodeFileName(n);
							}
							var r = this.findExtraFieldUnicodeComment();
							if (r !== null) this.fileCommentStr = r;
							else {
								var a = i.transformTo(e, this.fileComment);
								this.fileCommentStr = this.loadOptions.decodeFileName(a);
							}
						}
					},
					findExtraFieldUnicodePath: function() {
						var e = this.extraFields[28789];
						if (e) {
							var t = r(e.value);
							return t.readInt(1) === 1 && o(this.fileName) === t.readInt(4) ? s.utf8decode(t.readData(e.length - 5)) : null;
						}
						return null;
					},
					findExtraFieldUnicodeComment: function() {
						var e = this.extraFields[25461];
						if (e) {
							var t = r(e.value);
							return t.readInt(1) === 1 && o(this.fileComment) === t.readInt(4) ? s.utf8decode(t.readData(e.length - 5)) : null;
						}
						return null;
					}
				}, t.exports = u;
			}, {
				"./compressedObject": 2,
				"./compressions": 3,
				"./crc32": 4,
				"./reader/readerFor": 22,
				"./support": 30,
				"./utf8": 31,
				"./utils": 32
			}],
			35: [function(e, t, n) {
				function r(e, t, n) {
					this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {
						compression: n.compression,
						compressionOptions: n.compressionOptions
					};
				}
				var i = e("./stream/StreamHelper"), a = e("./stream/DataWorker"), o = e("./utf8"), s = e("./compressedObject"), c = e("./stream/GenericWorker");
				r.prototype = {
					internalStream: function(e) {
						var t = null, n = "string";
						try {
							if (!e) throw Error("No output type specified.");
							var r = (n = e.toLowerCase()) === "string" || n === "text";
							n !== "binarystring" && n !== "text" || (n = "string"), t = this._decompressWorker();
							var a = !this._dataBinary;
							a && !r && (t = t.pipe(new o.Utf8EncodeWorker())), !a && r && (t = t.pipe(new o.Utf8DecodeWorker()));
						} catch (e) {
							(t = new c("error")).error(e);
						}
						return new i(t, n, "");
					},
					async: function(e, t) {
						return this.internalStream(e).accumulate(t);
					},
					nodeStream: function(e, t) {
						return this.internalStream(e || "nodebuffer").toNodejsStream(t);
					},
					_compressWorker: function(e, t) {
						if (this._data instanceof s && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
						var n = this._decompressWorker();
						return this._dataBinary || (n = n.pipe(new o.Utf8EncodeWorker())), s.createWorkerFrom(n, e, t);
					},
					_decompressWorker: function() {
						return this._data instanceof s ? this._data.getContentWorker() : this._data instanceof c ? this._data : new a(this._data);
					}
				};
				for (var l = [
					"asText",
					"asBinary",
					"asNodeBuffer",
					"asUint8Array",
					"asArrayBuffer"
				], u = function() {
					throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
				}, d = 0; d < l.length; d++) r.prototype[l[d]] = u;
				t.exports = r;
			}, {
				"./compressedObject": 2,
				"./stream/DataWorker": 27,
				"./stream/GenericWorker": 28,
				"./stream/StreamHelper": 29,
				"./utf8": 31
			}],
			36: [function(e, t, n) {
				(function(e) {
					var n, r, i = e.MutationObserver || e.WebKitMutationObserver;
					if (i) {
						var a = 0, o = new i(u), s = e.document.createTextNode("");
						o.observe(s, { characterData: !0 }), n = function() {
							s.data = a = ++a % 2;
						};
					} else if (e.setImmediate || e.MessageChannel === void 0) n = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
						var t = e.document.createElement("script");
						t.onreadystatechange = function() {
							u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
						}, e.document.documentElement.appendChild(t);
					} : function() {
						setTimeout(u, 0);
					};
					else {
						var c = new e.MessageChannel();
						c.port1.onmessage = u, n = function() {
							c.port2.postMessage(0);
						};
					}
					var l = [];
					function u() {
						var e, t;
						r = !0;
						for (var n = l.length; n;) {
							for (t = l, l = [], e = -1; ++e < n;) t[e]();
							n = l.length;
						}
						r = !1;
					}
					t.exports = function(e) {
						l.push(e) !== 1 || r || n();
					};
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, {}],
			37: [function(e, t, n) {
				var r = e("immediate");
				function i() {}
				var a = {}, o = ["REJECTED"], s = ["FULFILLED"], c = ["PENDING"];
				function l(e) {
					if (typeof e != "function") throw TypeError("resolver must be a function");
					this.state = c, this.queue = [], this.outcome = void 0, e !== i && p(this, e);
				}
				function u(e, t, n) {
					this.promise = e, typeof t == "function" && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), typeof n == "function" && (this.onRejected = n, this.callRejected = this.otherCallRejected);
				}
				function d(e, t, n) {
					r(function() {
						var r;
						try {
							r = t(n);
						} catch (t) {
							return a.reject(e, t);
						}
						r === e ? a.reject(e, /* @__PURE__ */ TypeError("Cannot resolve promise with itself")) : a.resolve(e, r);
					});
				}
				function f(e) {
					var t = e && e.then;
					if (e && (typeof e == "object" || typeof e == "function") && typeof t == "function") return function() {
						t.apply(e, arguments);
					};
				}
				function p(e, t) {
					var n = !1;
					function r(t) {
						n || (n = !0, a.reject(e, t));
					}
					function i(t) {
						n || (n = !0, a.resolve(e, t));
					}
					var o = m(function() {
						t(i, r);
					});
					o.status === "error" && r(o.value);
				}
				function m(e, t) {
					var n = {};
					try {
						n.value = e(t), n.status = "success";
					} catch (e) {
						n.status = "error", n.value = e;
					}
					return n;
				}
				(t.exports = l).prototype.finally = function(e) {
					if (typeof e != "function") return this;
					var t = this.constructor;
					return this.then(function(n) {
						return t.resolve(e()).then(function() {
							return n;
						});
					}, function(n) {
						return t.resolve(e()).then(function() {
							throw n;
						});
					});
				}, l.prototype.catch = function(e) {
					return this.then(null, e);
				}, l.prototype.then = function(e, t) {
					if (typeof e != "function" && this.state === s || typeof t != "function" && this.state === o) return this;
					var n = new this.constructor(i);
					return this.state === c ? this.queue.push(new u(n, e, t)) : d(n, this.state === s ? e : t, this.outcome), n;
				}, u.prototype.callFulfilled = function(e) {
					a.resolve(this.promise, e);
				}, u.prototype.otherCallFulfilled = function(e) {
					d(this.promise, this.onFulfilled, e);
				}, u.prototype.callRejected = function(e) {
					a.reject(this.promise, e);
				}, u.prototype.otherCallRejected = function(e) {
					d(this.promise, this.onRejected, e);
				}, a.resolve = function(e, t) {
					var n = m(f, t);
					if (n.status === "error") return a.reject(e, n.value);
					var r = n.value;
					if (r) p(e, r);
					else {
						e.state = s, e.outcome = t;
						for (var i = -1, o = e.queue.length; ++i < o;) e.queue[i].callFulfilled(t);
					}
					return e;
				}, a.reject = function(e, t) {
					e.state = o, e.outcome = t;
					for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
					return e;
				}, l.resolve = function(e) {
					return e instanceof this ? e : a.resolve(new this(i), e);
				}, l.reject = function(e) {
					var t = new this(i);
					return a.reject(t, e);
				}, l.all = function(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var n = e.length, r = !1;
					if (!n) return this.resolve([]);
					for (var o = Array(n), s = 0, c = -1, l = new this(i); ++c < n;) u(e[c], c);
					return l;
					function u(e, i) {
						t.resolve(e).then(function(e) {
							o[i] = e, ++s !== n || r || (r = !0, a.resolve(l, o));
						}, function(e) {
							r || (r = !0, a.reject(l, e));
						});
					}
				}, l.race = function(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var n = e.length, r = !1;
					if (!n) return this.resolve([]);
					for (var o = -1, s = new this(i); ++o < n;) c = e[o], t.resolve(c).then(function(e) {
						r || (r = !0, a.resolve(s, e));
					}, function(e) {
						r || (r = !0, a.reject(s, e));
					});
					var c;
					return s;
				};
			}, { immediate: 36 }],
			38: [function(e, t, n) {
				var r = {};
				(0, e("./lib/utils/common").assign)(r, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = r;
			}, {
				"./lib/deflate": 39,
				"./lib/inflate": 40,
				"./lib/utils/common": 41,
				"./lib/zlib/constants": 44
			}],
			39: [function(e, t, n) {
				var r = e("./zlib/deflate"), i = e("./utils/common"), a = e("./utils/strings"), o = e("./zlib/messages"), s = e("./zlib/zstream"), c = Object.prototype.toString, l = 0, u = -1, d = 0, f = 8;
				function p(e) {
					if (!(this instanceof p)) return new p(e);
					this.options = i.assign({
						level: u,
						method: f,
						chunkSize: 16384,
						windowBits: 15,
						memLevel: 8,
						strategy: d,
						to: ""
					}, e || {});
					var t = this.options;
					t.raw && 0 < t.windowBits ? t.windowBits = -t.windowBits : t.gzip && 0 < t.windowBits && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
					var n = r.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
					if (n !== l) throw Error(o[n]);
					if (t.header && r.deflateSetHeader(this.strm, t.header), t.dictionary) {
						var m = typeof t.dictionary == "string" ? a.string2buf(t.dictionary) : c.call(t.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(t.dictionary) : t.dictionary;
						if ((n = r.deflateSetDictionary(this.strm, m)) !== l) throw Error(o[n]);
						this._dict_set = !0;
					}
				}
				function m(e, t) {
					var n = new p(t);
					if (n.push(e, !0), n.err) throw n.msg || o[n.err];
					return n.result;
				}
				p.prototype.push = function(e, t) {
					var n, o, s = this.strm, u = this.options.chunkSize;
					if (this.ended) return !1;
					o = t === ~~t ? t : !0 === t ? 4 : 0, s.input = typeof e == "string" ? a.string2buf(e) : c.call(e) === "[object ArrayBuffer]" ? new Uint8Array(e) : e, s.next_in = 0, s.avail_in = s.input.length;
					do {
						if (s.avail_out === 0 && (s.output = new i.Buf8(u), s.next_out = 0, s.avail_out = u), (n = r.deflate(s, o)) !== 1 && n !== l) return this.onEnd(n), !(this.ended = !0);
						s.avail_out !== 0 && (s.avail_in !== 0 || o !== 4 && o !== 2) || (this.options.to === "string" ? this.onData(a.buf2binstring(i.shrinkBuf(s.output, s.next_out))) : this.onData(i.shrinkBuf(s.output, s.next_out)));
					} while ((0 < s.avail_in || s.avail_out === 0) && n !== 1);
					return o === 4 ? (n = r.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === l) : o !== 2 || (this.onEnd(l), !(s.avail_out = 0));
				}, p.prototype.onData = function(e) {
					this.chunks.push(e);
				}, p.prototype.onEnd = function(e) {
					e === l && (this.result = this.options.to === "string" ? this.chunks.join("") : i.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
				}, n.Deflate = p, n.deflate = m, n.deflateRaw = function(e, t) {
					return (t ||= {}).raw = !0, m(e, t);
				}, n.gzip = function(e, t) {
					return (t ||= {}).gzip = !0, m(e, t);
				};
			}, {
				"./utils/common": 41,
				"./utils/strings": 42,
				"./zlib/deflate": 46,
				"./zlib/messages": 51,
				"./zlib/zstream": 53
			}],
			40: [function(e, t, n) {
				var r = e("./zlib/inflate"), i = e("./utils/common"), a = e("./utils/strings"), o = e("./zlib/constants"), s = e("./zlib/messages"), c = e("./zlib/zstream"), l = e("./zlib/gzheader"), u = Object.prototype.toString;
				function d(e) {
					if (!(this instanceof d)) return new d(e);
					this.options = i.assign({
						chunkSize: 16384,
						windowBits: 0,
						to: ""
					}, e || {});
					var t = this.options;
					t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), 15 < t.windowBits && t.windowBits < 48 && !(15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new c(), this.strm.avail_out = 0;
					var n = r.inflateInit2(this.strm, t.windowBits);
					if (n !== o.Z_OK) throw Error(s[n]);
					this.header = new l(), r.inflateGetHeader(this.strm, this.header);
				}
				function f(e, t) {
					var n = new d(t);
					if (n.push(e, !0), n.err) throw n.msg || s[n.err];
					return n.result;
				}
				d.prototype.push = function(e, t) {
					var n, s, c, l, d, f, p = this.strm, m = this.options.chunkSize, h = this.options.dictionary, g = !1;
					if (this.ended) return !1;
					s = t === ~~t ? t : !0 === t ? o.Z_FINISH : o.Z_NO_FLUSH, p.input = typeof e == "string" ? a.binstring2buf(e) : u.call(e) === "[object ArrayBuffer]" ? new Uint8Array(e) : e, p.next_in = 0, p.avail_in = p.input.length;
					do {
						if (p.avail_out === 0 && (p.output = new i.Buf8(m), p.next_out = 0, p.avail_out = m), (n = r.inflate(p, o.Z_NO_FLUSH)) === o.Z_NEED_DICT && h && (f = typeof h == "string" ? a.string2buf(h) : u.call(h) === "[object ArrayBuffer]" ? new Uint8Array(h) : h, n = r.inflateSetDictionary(this.strm, f)), n === o.Z_BUF_ERROR && !0 === g && (n = o.Z_OK, g = !1), n !== o.Z_STREAM_END && n !== o.Z_OK) return this.onEnd(n), !(this.ended = !0);
						p.next_out && (p.avail_out !== 0 && n !== o.Z_STREAM_END && (p.avail_in !== 0 || s !== o.Z_FINISH && s !== o.Z_SYNC_FLUSH) || (this.options.to === "string" ? (c = a.utf8border(p.output, p.next_out), l = p.next_out - c, d = a.buf2string(p.output, c), p.next_out = l, p.avail_out = m - l, l && i.arraySet(p.output, p.output, c, l, 0), this.onData(d)) : this.onData(i.shrinkBuf(p.output, p.next_out)))), p.avail_in === 0 && p.avail_out === 0 && (g = !0);
					} while ((0 < p.avail_in || p.avail_out === 0) && n !== o.Z_STREAM_END);
					return n === o.Z_STREAM_END && (s = o.Z_FINISH), s === o.Z_FINISH ? (n = r.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === o.Z_OK) : s !== o.Z_SYNC_FLUSH || (this.onEnd(o.Z_OK), !(p.avail_out = 0));
				}, d.prototype.onData = function(e) {
					this.chunks.push(e);
				}, d.prototype.onEnd = function(e) {
					e === o.Z_OK && (this.result = this.options.to === "string" ? this.chunks.join("") : i.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
				}, n.Inflate = d, n.inflate = f, n.inflateRaw = function(e, t) {
					return (t ||= {}).raw = !0, f(e, t);
				}, n.ungzip = f;
			}, {
				"./utils/common": 41,
				"./utils/strings": 42,
				"./zlib/constants": 44,
				"./zlib/gzheader": 47,
				"./zlib/inflate": 49,
				"./zlib/messages": 51,
				"./zlib/zstream": 53
			}],
			41: [function(e, t, n) {
				var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
				n.assign = function(e) {
					for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
						var n = t.shift();
						if (n) {
							if (typeof n != "object") throw TypeError(n + "must be non-object");
							for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r]);
						}
					}
					return e;
				}, n.shrinkBuf = function(e, t) {
					return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e);
				};
				var i = {
					arraySet: function(e, t, n, r, i) {
						if (t.subarray && e.subarray) e.set(t.subarray(n, n + r), i);
						else for (var a = 0; a < r; a++) e[i + a] = t[n + a];
					},
					flattenChunks: function(e) {
						for (var t = r = 0, n = e.length, r, i, a, o; t < n; t++) r += e[t].length;
						for (o = new Uint8Array(r), t = i = 0, n = e.length; t < n; t++) a = e[t], o.set(a, i), i += a.length;
						return o;
					}
				}, a = {
					arraySet: function(e, t, n, r, i) {
						for (var a = 0; a < r; a++) e[i + a] = t[n + a];
					},
					flattenChunks: function(e) {
						return [].concat.apply([], e);
					}
				};
				n.setTyped = function(e) {
					e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, i)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, a));
				}, n.setTyped(r);
			}, {}],
			42: [function(e, t, n) {
				var r = e("./common"), i = !0, a = !0;
				try {
					String.fromCharCode.apply(null, [0]);
				} catch {
					i = !1;
				}
				try {
					String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1));
				} catch {
					a = !1;
				}
				for (var o = new r.Buf8(256), s = 0; s < 256; s++) o[s] = 252 <= s ? 6 : 248 <= s ? 5 : 240 <= s ? 4 : 224 <= s ? 3 : 192 <= s ? 2 : 1;
				function c(e, t) {
					if (t < 65537 && (e.subarray && a || !e.subarray && i)) return String.fromCharCode.apply(null, r.shrinkBuf(e, t));
					for (var n = "", o = 0; o < t; o++) n += String.fromCharCode(e[o]);
					return n;
				}
				o[254] = o[254] = 1, n.string2buf = function(e) {
					var t, n, i, a, o, s = e.length, c = 0;
					for (a = 0; a < s; a++) (64512 & (n = e.charCodeAt(a))) == 55296 && a + 1 < s && (64512 & (i = e.charCodeAt(a + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
					for (t = new r.Buf8(c), a = o = 0; o < c; a++) (64512 & (n = e.charCodeAt(a))) == 55296 && a + 1 < s && (64512 & (i = e.charCodeAt(a + 1))) == 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++), n < 128 ? t[o++] = n : (n < 2048 ? t[o++] = 192 | n >>> 6 : (n < 65536 ? t[o++] = 224 | n >>> 12 : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63), t[o++] = 128 | n >>> 6 & 63), t[o++] = 128 | 63 & n);
					return t;
				}, n.buf2binstring = function(e) {
					return c(e, e.length);
				}, n.binstring2buf = function(e) {
					for (var t = new r.Buf8(e.length), n = 0, i = t.length; n < i; n++) t[n] = e.charCodeAt(n);
					return t;
				}, n.buf2string = function(e, t) {
					var n, r, i, a, s = t || e.length, l = Array(2 * s);
					for (n = r = 0; n < s;) if ((i = e[n++]) < 128) l[r++] = i;
					else if (4 < (a = o[i])) l[r++] = 65533, n += a - 1;
					else {
						for (i &= a === 2 ? 31 : a === 3 ? 15 : 7; 1 < a && n < s;) i = i << 6 | 63 & e[n++], a--;
						1 < a ? l[r++] = 65533 : i < 65536 ? l[r++] = i : (i -= 65536, l[r++] = 55296 | i >> 10 & 1023, l[r++] = 56320 | 1023 & i);
					}
					return c(l, r);
				}, n.utf8border = function(e, t) {
					var n;
					for ((t ||= e.length) > e.length && (t = e.length), n = t - 1; 0 <= n && (192 & e[n]) == 128;) n--;
					return n < 0 || n === 0 ? t : n + o[e[n]] > t ? n : t;
				};
			}, { "./common": 41 }],
			43: [function(e, t, n) {
				t.exports = function(e, t, n, r) {
					for (var i = 65535 & e, a = e >>> 16 & 65535, o = 0; n !== 0;) {
						for (n -= o = 2e3 < n ? 2e3 : n; a = a + (i = i + t[r++] | 0) | 0, --o;);
						i %= 65521, a %= 65521;
					}
					return i | a << 16;
				};
			}, {}],
			44: [function(e, t, n) {
				t.exports = {
					Z_NO_FLUSH: 0,
					Z_PARTIAL_FLUSH: 1,
					Z_SYNC_FLUSH: 2,
					Z_FULL_FLUSH: 3,
					Z_FINISH: 4,
					Z_BLOCK: 5,
					Z_TREES: 6,
					Z_OK: 0,
					Z_STREAM_END: 1,
					Z_NEED_DICT: 2,
					Z_ERRNO: -1,
					Z_STREAM_ERROR: -2,
					Z_DATA_ERROR: -3,
					Z_BUF_ERROR: -5,
					Z_NO_COMPRESSION: 0,
					Z_BEST_SPEED: 1,
					Z_BEST_COMPRESSION: 9,
					Z_DEFAULT_COMPRESSION: -1,
					Z_FILTERED: 1,
					Z_HUFFMAN_ONLY: 2,
					Z_RLE: 3,
					Z_FIXED: 4,
					Z_DEFAULT_STRATEGY: 0,
					Z_BINARY: 0,
					Z_TEXT: 1,
					Z_UNKNOWN: 2,
					Z_DEFLATED: 8
				};
			}, {}],
			45: [function(e, t, n) {
				var r = function() {
					for (var e, t = [], n = 0; n < 256; n++) {
						e = n;
						for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
						t[n] = e;
					}
					return t;
				}();
				t.exports = function(e, t, n, i) {
					var a = r, o = i + n;
					e ^= -1;
					for (var s = i; s < o; s++) e = e >>> 8 ^ a[255 & (e ^ t[s])];
					return -1 ^ e;
				};
			}, {}],
			46: [function(e, t, n) {
				var r, i = e("../utils/common"), a = e("./trees"), o = e("./adler32"), s = e("./crc32"), c = e("./messages"), l = 0, u = 4, d = 0, f = -2, p = -1, m = 4, h = 2, g = 8, _ = 9, v = 286, y = 30, b = 19, x = 2 * v + 1, S = 15, C = 3, w = 258, T = w + C + 1, E = 42, D = 113, O = 1, k = 2, A = 3, j = 4;
				function M(e, t) {
					return e.msg = c[t], t;
				}
				function N(e) {
					return (e << 1) - (4 < e ? 9 : 0);
				}
				function P(e) {
					for (var t = e.length; 0 <= --t;) e[t] = 0;
				}
				function F(e) {
					var t = e.state, n = t.pending;
					n > e.avail_out && (n = e.avail_out), n !== 0 && (i.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
				}
				function I(e, t) {
					a._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, F(e.strm);
				}
				function L(e, t) {
					e.pending_buf[e.pending++] = t;
				}
				function R(e, t) {
					e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t;
				}
				function z(e, t) {
					var n, r, i = e.max_chain_length, a = e.strstart, o = e.prev_length, s = e.nice_match, c = e.strstart > e.w_size - T ? e.strstart - (e.w_size - T) : 0, l = e.window, u = e.w_mask, d = e.prev, f = e.strstart + w, p = l[a + o - 1], m = l[a + o];
					e.prev_length >= e.good_match && (i >>= 2), s > e.lookahead && (s = e.lookahead);
					do
						if (l[(n = t) + o] === m && l[n + o - 1] === p && l[n] === l[a] && l[++n] === l[a + 1]) {
							a += 2, n++;
							do;
							while (l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && a < f);
							if (r = w - (f - a), a = f - w, o < r) {
								if (e.match_start = t, s <= (o = r)) break;
								p = l[a + o - 1], m = l[a + o];
							}
						}
					while ((t = d[t & u]) > c && --i != 0);
					return o <= e.lookahead ? o : e.lookahead;
				}
				function B(e) {
					var t, n, r, a, c, l, u, d, f, p, m = e.w_size;
					do {
						if (a = e.window_size - e.lookahead - e.strstart, e.strstart >= m + (m - T)) {
							for (i.arraySet(e.window, e.window, m, m, 0), e.match_start -= m, e.strstart -= m, e.block_start -= m, t = n = e.hash_size; r = e.head[--t], e.head[t] = m <= r ? r - m : 0, --n;);
							for (t = n = m; r = e.prev[--t], e.prev[t] = m <= r ? r - m : 0, --n;);
							a += m;
						}
						if (e.strm.avail_in === 0) break;
						if (l = e.strm, u = e.window, d = e.strstart + e.lookahead, f = a, p = void 0, p = l.avail_in, f < p && (p = f), n = p === 0 ? 0 : (l.avail_in -= p, i.arraySet(u, l.input, l.next_in, p, d), l.state.wrap === 1 ? l.adler = o(l.adler, u, p, d) : l.state.wrap === 2 && (l.adler = s(l.adler, u, p, d)), l.next_in += p, l.total_in += p, p), e.lookahead += n, e.lookahead + e.insert >= C) for (c = e.strstart - e.insert, e.ins_h = e.window[c], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[c + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[c + C - 1]) & e.hash_mask, e.prev[c & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = c, c++, e.insert--, !(e.lookahead + e.insert < C)););
					} while (e.lookahead < T && e.strm.avail_in !== 0);
				}
				function ee(e, t) {
					for (var n, r;;) {
						if (e.lookahead < T) {
							if (B(e), e.lookahead < T && t === l) return O;
							if (e.lookahead === 0) break;
						}
						if (n = 0, e.lookahead >= C && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + C - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), n !== 0 && e.strstart - n <= e.w_size - T && (e.match_length = z(e, n)), e.match_length >= C) {
							if (r = a._tr_tally(e, e.strstart - e.match_start, e.match_length - C), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= C) {
								for (e.match_length--; e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + C - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart, --e.match_length != 0;);
								e.strstart++;
							} else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
						} else r = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
						if (r && (I(e, !1), e.strm.avail_out === 0)) return O;
					}
					return e.insert = e.strstart < C - 1 ? e.strstart : C - 1, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : e.last_lit && (I(e, !1), e.strm.avail_out === 0) ? O : k;
				}
				function te(e, t) {
					for (var n, r, i;;) {
						if (e.lookahead < T) {
							if (B(e), e.lookahead < T && t === l) return O;
							if (e.lookahead === 0) break;
						}
						if (n = 0, e.lookahead >= C && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + C - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = C - 1, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - T && (e.match_length = z(e, n), e.match_length <= 5 && (e.strategy === 1 || e.match_length === C && 4096 < e.strstart - e.match_start) && (e.match_length = C - 1)), e.prev_length >= C && e.match_length <= e.prev_length) {
							for (i = e.strstart + e.lookahead - C, r = a._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - C), e.lookahead -= e.prev_length - 1, e.prev_length -= 2; ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + C - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), --e.prev_length != 0;);
							if (e.match_available = 0, e.match_length = C - 1, e.strstart++, r && (I(e, !1), e.strm.avail_out === 0)) return O;
						} else if (e.match_available) {
							if ((r = a._tr_tally(e, 0, e.window[e.strstart - 1])) && I(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0) return O;
						} else e.match_available = 1, e.strstart++, e.lookahead--;
					}
					return e.match_available &&= (r = a._tr_tally(e, 0, e.window[e.strstart - 1]), 0), e.insert = e.strstart < C - 1 ? e.strstart : C - 1, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : e.last_lit && (I(e, !1), e.strm.avail_out === 0) ? O : k;
				}
				function V(e, t, n, r, i) {
					this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
				}
				function ne() {
					this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = g, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new i.Buf16(2 * x), this.dyn_dtree = new i.Buf16(2 * (2 * y + 1)), this.bl_tree = new i.Buf16(2 * (2 * b + 1)), P(this.dyn_ltree), P(this.dyn_dtree), P(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new i.Buf16(S + 1), this.heap = new i.Buf16(2 * v + 1), P(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new i.Buf16(2 * v + 1), P(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
				}
				function re(e) {
					var t;
					return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = h, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? E : D, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = l, a._tr_init(t), d) : M(e, f);
				}
				function H(e) {
					var t = re(e);
					return t === d && function(e) {
						e.window_size = 2 * e.w_size, P(e.head), e.max_lazy_match = r[e.level].max_lazy, e.good_match = r[e.level].good_length, e.nice_match = r[e.level].nice_length, e.max_chain_length = r[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = C - 1, e.match_available = 0, e.ins_h = 0;
					}(e.state), t;
				}
				function ie(e, t, n, r, a, o) {
					if (!e) return f;
					var s = 1;
					if (t === p && (t = 6), r < 0 ? (s = 0, r = -r) : 15 < r && (s = 2, r -= 16), a < 1 || _ < a || n !== g || r < 8 || 15 < r || t < 0 || 9 < t || o < 0 || m < o) return M(e, f);
					r === 8 && (r = 9);
					var c = new ne();
					return (e.state = c).strm = e, c.wrap = s, c.gzhead = null, c.w_bits = r, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.hash_bits = a + 7, c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + C - 1) / C), c.window = new i.Buf8(2 * c.w_size), c.head = new i.Buf16(c.hash_size), c.prev = new i.Buf16(c.w_size), c.lit_bufsize = 1 << a + 6, c.pending_buf_size = 4 * c.lit_bufsize, c.pending_buf = new i.Buf8(c.pending_buf_size), c.d_buf = 1 * c.lit_bufsize, c.l_buf = 3 * c.lit_bufsize, c.level = t, c.strategy = o, c.method = n, H(e);
				}
				r = [
					new V(0, 0, 0, 0, function(e, t) {
						var n = 65535;
						for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5);;) {
							if (e.lookahead <= 1) {
								if (B(e), e.lookahead === 0 && t === l) return O;
								if (e.lookahead === 0) break;
							}
							e.strstart += e.lookahead, e.lookahead = 0;
							var r = e.block_start + n;
							if ((e.strstart === 0 || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, I(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - T && (I(e, !1), e.strm.avail_out === 0)) return O;
						}
						return e.insert = 0, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : (e.strstart > e.block_start && (I(e, !1), e.strm.avail_out), O);
					}),
					new V(4, 4, 8, 4, ee),
					new V(4, 5, 16, 8, ee),
					new V(4, 6, 32, 32, ee),
					new V(4, 4, 16, 16, te),
					new V(8, 16, 32, 32, te),
					new V(8, 16, 128, 128, te),
					new V(8, 32, 128, 256, te),
					new V(32, 128, 258, 1024, te),
					new V(32, 258, 258, 4096, te)
				], n.deflateInit = function(e, t) {
					return ie(e, t, g, 15, 8, 0);
				}, n.deflateInit2 = ie, n.deflateReset = H, n.deflateResetKeep = re, n.deflateSetHeader = function(e, t) {
					return e && e.state && e.state.wrap === 2 ? (e.state.gzhead = t, d) : f;
				}, n.deflate = function(e, t) {
					var n, i, o, c;
					if (!e || !e.state || 5 < t || t < 0) return e ? M(e, f) : f;
					if (i = e.state, !e.output || !e.input && e.avail_in !== 0 || i.status === 666 && t !== u) return M(e, e.avail_out === 0 ? -5 : f);
					if (i.strm = e, n = i.last_flush, i.last_flush = t, i.status === E) {
						if (i.wrap === 2) e.adler = 0, L(i, 31), L(i, 139), L(i, 8), i.gzhead ? (L(i, +!!i.gzhead.text + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), L(i, 255 & i.gzhead.time), L(i, i.gzhead.time >> 8 & 255), L(i, i.gzhead.time >> 16 & 255), L(i, i.gzhead.time >> 24 & 255), L(i, i.level === 9 ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), L(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (L(i, 255 & i.gzhead.extra.length), L(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (e.adler = s(e.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69) : (L(i, 0), L(i, 0), L(i, 0), L(i, 0), L(i, 0), L(i, i.level === 9 ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), L(i, 3), i.status = D);
						else {
							var p = g + (i.w_bits - 8 << 4) << 8;
							p |= (2 <= i.strategy || i.level < 2 ? 0 : i.level < 6 ? 1 : i.level === 6 ? 2 : 3) << 6, i.strstart !== 0 && (p |= 32), p += 31 - p % 31, i.status = D, R(i, p), i.strstart !== 0 && (R(i, e.adler >>> 16), R(i, 65535 & e.adler)), e.adler = 1;
						}
					}
					if (i.status === 69) {
						if (i.gzhead.extra) {
							for (o = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), F(e), o = i.pending, i.pending !== i.pending_buf_size));) L(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;
							i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = 73);
						} else i.status = 73;
					}
					if (i.status === 73) {
						if (i.gzhead.name) {
							o = i.pending;
							do {
								if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), F(e), o = i.pending, i.pending === i.pending_buf_size)) {
									c = 1;
									break;
								}
								c = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, L(i, c);
							} while (c !== 0);
							i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), c === 0 && (i.gzindex = 0, i.status = 91);
						} else i.status = 91;
					}
					if (i.status === 91) {
						if (i.gzhead.comment) {
							o = i.pending;
							do {
								if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), F(e), o = i.pending, i.pending === i.pending_buf_size)) {
									c = 1;
									break;
								}
								c = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, L(i, c);
							} while (c !== 0);
							i.gzhead.hcrc && i.pending > o && (e.adler = s(e.adler, i.pending_buf, i.pending - o, o)), c === 0 && (i.status = 103);
						} else i.status = 103;
					}
					if (i.status === 103 && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && F(e), i.pending + 2 <= i.pending_buf_size && (L(i, 255 & e.adler), L(i, e.adler >> 8 & 255), e.adler = 0, i.status = D)) : i.status = D), i.pending !== 0) {
						if (F(e), e.avail_out === 0) return i.last_flush = -1, d;
					} else if (e.avail_in === 0 && N(t) <= N(n) && t !== u) return M(e, -5);
					if (i.status === 666 && e.avail_in !== 0) return M(e, -5);
					if (e.avail_in !== 0 || i.lookahead !== 0 || t !== l && i.status !== 666) {
						var m = i.strategy === 2 ? function(e, t) {
							for (var n;;) {
								if (e.lookahead === 0 && (B(e), e.lookahead === 0)) {
									if (t === l) return O;
									break;
								}
								if (e.match_length = 0, n = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (I(e, !1), e.strm.avail_out === 0)) return O;
							}
							return e.insert = 0, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : e.last_lit && (I(e, !1), e.strm.avail_out === 0) ? O : k;
						}(i, t) : i.strategy === 3 ? function(e, t) {
							for (var n, r, i, o, s = e.window;;) {
								if (e.lookahead <= w) {
									if (B(e), e.lookahead <= w && t === l) return O;
									if (e.lookahead === 0) break;
								}
								if (e.match_length = 0, e.lookahead >= C && 0 < e.strstart && (r = s[i = e.strstart - 1]) === s[++i] && r === s[++i] && r === s[++i]) {
									o = e.strstart + w;
									do;
									while (r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && i < o);
									e.match_length = w - (o - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
								}
								if (e.match_length >= C ? (n = a._tr_tally(e, 1, e.match_length - C), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = a._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (I(e, !1), e.strm.avail_out === 0)) return O;
							}
							return e.insert = 0, t === u ? (I(e, !0), e.strm.avail_out === 0 ? A : j) : e.last_lit && (I(e, !1), e.strm.avail_out === 0) ? O : k;
						}(i, t) : r[i.level].func(i, t);
						if (m !== A && m !== j || (i.status = 666), m === O || m === A) return e.avail_out === 0 && (i.last_flush = -1), d;
						if (m === k && (t === 1 ? a._tr_align(i) : t !== 5 && (a._tr_stored_block(i, 0, 0, !1), t === 3 && (P(i.head), i.lookahead === 0 && (i.strstart = 0, i.block_start = 0, i.insert = 0))), F(e), e.avail_out === 0)) return i.last_flush = -1, d;
					}
					return t === u ? i.wrap <= 0 ? 1 : (i.wrap === 2 ? (L(i, 255 & e.adler), L(i, e.adler >> 8 & 255), L(i, e.adler >> 16 & 255), L(i, e.adler >> 24 & 255), L(i, 255 & e.total_in), L(i, e.total_in >> 8 & 255), L(i, e.total_in >> 16 & 255), L(i, e.total_in >> 24 & 255)) : (R(i, e.adler >>> 16), R(i, 65535 & e.adler)), F(e), 0 < i.wrap && (i.wrap = -i.wrap), i.pending === 0 ? 1 : d) : d;
				}, n.deflateEnd = function(e) {
					var t;
					return e && e.state ? (t = e.state.status) !== E && t !== 69 && t !== 73 && t !== 91 && t !== 103 && t !== D && t !== 666 ? M(e, f) : (e.state = null, t === D ? M(e, -3) : d) : f;
				}, n.deflateSetDictionary = function(e, t) {
					var n, r, a, s, c, l, u, p, m = t.length;
					if (!e || !e.state || (s = (n = e.state).wrap) === 2 || s === 1 && n.status !== E || n.lookahead) return f;
					for (s === 1 && (e.adler = o(e.adler, t, m, 0)), n.wrap = 0, m >= n.w_size && (s === 0 && (P(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0), p = new i.Buf8(n.w_size), i.arraySet(p, t, m - n.w_size, n.w_size, 0), t = p, m = n.w_size), c = e.avail_in, l = e.next_in, u = e.input, e.avail_in = m, e.next_in = 0, e.input = t, B(n); n.lookahead >= C;) {
						for (r = n.strstart, a = n.lookahead - (C - 1); n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + C - 1]) & n.hash_mask, n.prev[r & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = r, r++, --a;);
						n.strstart = r, n.lookahead = C - 1, B(n);
					}
					return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = C - 1, n.match_available = 0, e.next_in = l, e.input = u, e.avail_in = c, n.wrap = s, d;
				}, n.deflateInfo = "pako deflate (from Nodeca project)";
			}, {
				"../utils/common": 41,
				"./adler32": 43,
				"./crc32": 45,
				"./messages": 51,
				"./trees": 52
			}],
			47: [function(e, t, n) {
				t.exports = function() {
					this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
				};
			}, {}],
			48: [function(e, t, n) {
				t.exports = function(e, t) {
					var n = e.state, r = e.next_in, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T = e.input, E;
					i = r + (e.avail_in - 5), a = e.next_out, E = e.output, o = a - (t - e.avail_out), s = a + (e.avail_out - 257), c = n.dmax, l = n.wsize, u = n.whave, d = n.wnext, f = n.window, p = n.hold, m = n.bits, h = n.lencode, g = n.distcode, _ = (1 << n.lenbits) - 1, v = (1 << n.distbits) - 1;
					e: do {
						m < 15 && (p += T[r++] << m, m += 8, p += T[r++] << m, m += 8), y = h[p & _];
						t: for (;;) {
							if (p >>>= b = y >>> 24, m -= b, (b = y >>> 16 & 255) == 0) E[a++] = 65535 & y;
							else {
								if (!(16 & b)) {
									if (!(64 & b)) {
										y = h[(65535 & y) + (p & (1 << b) - 1)];
										continue t;
									}
									if (32 & b) {
										n.mode = 12;
										break e;
									}
									e.msg = "invalid literal/length code", n.mode = 30;
									break e;
								}
								x = 65535 & y, (b &= 15) && (m < b && (p += T[r++] << m, m += 8), x += p & (1 << b) - 1, p >>>= b, m -= b), m < 15 && (p += T[r++] << m, m += 8, p += T[r++] << m, m += 8), y = g[p & v];
								r: for (;;) {
									if (p >>>= b = y >>> 24, m -= b, !(16 & (b = y >>> 16 & 255))) {
										if (!(64 & b)) {
											y = g[(65535 & y) + (p & (1 << b) - 1)];
											continue r;
										}
										e.msg = "invalid distance code", n.mode = 30;
										break e;
									}
									if (S = 65535 & y, m < (b &= 15) && (p += T[r++] << m, (m += 8) < b && (p += T[r++] << m, m += 8)), c < (S += p & (1 << b) - 1)) {
										e.msg = "invalid distance too far back", n.mode = 30;
										break e;
									}
									if (p >>>= b, m -= b, (b = a - o) < S) {
										if (u < (b = S - b) && n.sane) {
											e.msg = "invalid distance too far back", n.mode = 30;
											break e;
										}
										if (w = f, (C = 0) === d) {
											if (C += l - b, b < x) {
												for (x -= b; E[a++] = f[C++], --b;);
												C = a - S, w = E;
											}
										} else if (d < b) {
											if (C += l + d - b, (b -= d) < x) {
												for (x -= b; E[a++] = f[C++], --b;);
												if (C = 0, d < x) {
													for (x -= b = d; E[a++] = f[C++], --b;);
													C = a - S, w = E;
												}
											}
										} else if (C += d - b, b < x) {
											for (x -= b; E[a++] = f[C++], --b;);
											C = a - S, w = E;
										}
										for (; 2 < x;) E[a++] = w[C++], E[a++] = w[C++], E[a++] = w[C++], x -= 3;
										x && (E[a++] = w[C++], 1 < x && (E[a++] = w[C++]));
									} else {
										for (C = a - S; E[a++] = E[C++], E[a++] = E[C++], E[a++] = E[C++], 2 < (x -= 3););
										x && (E[a++] = E[C++], 1 < x && (E[a++] = E[C++]));
									}
									break;
								}
							}
							break;
						}
					} while (r < i && a < s);
					r -= x = m >> 3, p &= (1 << (m -= x << 3)) - 1, e.next_in = r, e.next_out = a, e.avail_in = r < i ? i - r + 5 : 5 - (r - i), e.avail_out = a < s ? s - a + 257 : 257 - (a - s), n.hold = p, n.bits = m;
				};
			}, {}],
			49: [function(e, t, n) {
				var r = e("../utils/common"), i = e("./adler32"), a = e("./crc32"), o = e("./inffast"), s = e("./inftrees"), c = 1, l = 2, u = 0, d = -2, f = 1, p = 852, m = 592;
				function h(e) {
					return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
				}
				function g() {
					this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
				}
				function _(e) {
					var t;
					return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = f, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new r.Buf32(p), t.distcode = t.distdyn = new r.Buf32(m), t.sane = 1, t.back = -1, u) : d;
				}
				function v(e) {
					var t;
					return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, _(e)) : d;
				}
				function y(e, t) {
					var n, r;
					return e && e.state ? (r = e.state, t < 0 ? (n = 0, t = -t) : (n = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? d : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, v(e))) : d;
				}
				function b(e, t) {
					var n, r;
					return e ? (r = new g(), (e.state = r).window = null, (n = y(e, t)) !== u && (e.state = null), n) : d;
				}
				var x, S, C = !0;
				function w(e) {
					if (C) {
						var t;
						for (x = new r.Buf32(512), S = new r.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
						for (; t < 256;) e.lens[t++] = 9;
						for (; t < 280;) e.lens[t++] = 7;
						for (; t < 288;) e.lens[t++] = 8;
						for (s(c, e.lens, 0, 288, x, 0, e.work, { bits: 9 }), t = 0; t < 32;) e.lens[t++] = 5;
						s(l, e.lens, 0, 32, S, 0, e.work, { bits: 5 }), C = !1;
					}
					e.lencode = x, e.lenbits = 9, e.distcode = S, e.distbits = 5;
				}
				function T(e, t, n, i) {
					var a, o = e.state;
					return o.window === null && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new r.Buf8(o.wsize)), i >= o.wsize ? (r.arraySet(o.window, t, n - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : (i < (a = o.wsize - o.wnext) && (a = i), r.arraySet(o.window, t, n - i, a, o.wnext), (i -= a) ? (r.arraySet(o.window, t, n - i, i, 0), o.wnext = i, o.whave = o.wsize) : (o.wnext += a, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += a))), 0;
				}
				n.inflateReset = v, n.inflateReset2 = y, n.inflateResetKeep = _, n.inflateInit = function(e) {
					return b(e, 15);
				}, n.inflateInit2 = b, n.inflate = function(e, t) {
					var n, p, m, g, _, v, y, b, x, S, C, E, D, O, k, A, j, M, N, P, F, I, L, R, z = 0, B = new r.Buf8(4), ee = [
						16,
						17,
						18,
						0,
						8,
						7,
						9,
						6,
						10,
						5,
						11,
						4,
						12,
						3,
						13,
						2,
						14,
						1,
						15
					];
					if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) return d;
					(n = e.state).mode === 12 && (n.mode = 13), _ = e.next_out, m = e.output, y = e.avail_out, g = e.next_in, p = e.input, v = e.avail_in, b = n.hold, x = n.bits, S = v, C = y, I = u;
					e: for (;;) switch (n.mode) {
						case f:
							if (n.wrap === 0) {
								n.mode = 13;
								break;
							}
							for (; x < 16;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (2 & n.wrap && b === 35615) {
								B[n.check = 0] = 255 & b, B[1] = b >>> 8 & 255, n.check = a(n.check, B, 2, 0), x = b = 0, n.mode = 2;
								break;
							}
							if (n.flags = 0, n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & b) << 8) + (b >> 8)) % 31) {
								e.msg = "incorrect header check", n.mode = 30;
								break;
							}
							if ((15 & b) != 8) {
								e.msg = "unknown compression method", n.mode = 30;
								break;
							}
							if (x -= 4, F = 8 + (15 & (b >>>= 4)), n.wbits === 0) n.wbits = F;
							else if (F > n.wbits) {
								e.msg = "invalid window size", n.mode = 30;
								break;
							}
							n.dmax = 1 << F, e.adler = n.check = 1, n.mode = 512 & b ? 10 : 12, x = b = 0;
							break;
						case 2:
							for (; x < 16;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (n.flags = b, (255 & n.flags) != 8) {
								e.msg = "unknown compression method", n.mode = 30;
								break;
							}
							if (57344 & n.flags) {
								e.msg = "unknown header flags set", n.mode = 30;
								break;
							}
							n.head && (n.head.text = b >> 8 & 1), 512 & n.flags && (B[0] = 255 & b, B[1] = b >>> 8 & 255, n.check = a(n.check, B, 2, 0)), x = b = 0, n.mode = 3;
						case 3:
							for (; x < 32;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							n.head && (n.head.time = b), 512 & n.flags && (B[0] = 255 & b, B[1] = b >>> 8 & 255, B[2] = b >>> 16 & 255, B[3] = b >>> 24 & 255, n.check = a(n.check, B, 4, 0)), x = b = 0, n.mode = 4;
						case 4:
							for (; x < 16;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							n.head && (n.head.xflags = 255 & b, n.head.os = b >> 8), 512 & n.flags && (B[0] = 255 & b, B[1] = b >>> 8 & 255, n.check = a(n.check, B, 2, 0)), x = b = 0, n.mode = 5;
						case 5:
							if (1024 & n.flags) {
								for (; x < 16;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								n.length = b, n.head && (n.head.extra_len = b), 512 & n.flags && (B[0] = 255 & b, B[1] = b >>> 8 & 255, n.check = a(n.check, B, 2, 0)), x = b = 0;
							} else n.head && (n.head.extra = null);
							n.mode = 6;
						case 6:
							if (1024 & n.flags && (v < (E = n.length) && (E = v), E && (n.head && (F = n.head.extra_len - n.length, n.head.extra || (n.head.extra = Array(n.head.extra_len)), r.arraySet(n.head.extra, p, g, E, F)), 512 & n.flags && (n.check = a(n.check, p, E, g)), v -= E, g += E, n.length -= E), n.length)) break e;
							n.length = 0, n.mode = 7;
						case 7:
							if (2048 & n.flags) {
								if (v === 0) break e;
								for (E = 0; F = p[g + E++], n.head && F && n.length < 65536 && (n.head.name += String.fromCharCode(F)), F && E < v;);
								if (512 & n.flags && (n.check = a(n.check, p, E, g)), v -= E, g += E, F) break e;
							} else n.head && (n.head.name = null);
							n.length = 0, n.mode = 8;
						case 8:
							if (4096 & n.flags) {
								if (v === 0) break e;
								for (E = 0; F = p[g + E++], n.head && F && n.length < 65536 && (n.head.comment += String.fromCharCode(F)), F && E < v;);
								if (512 & n.flags && (n.check = a(n.check, p, E, g)), v -= E, g += E, F) break e;
							} else n.head && (n.head.comment = null);
							n.mode = 9;
						case 9:
							if (512 & n.flags) {
								for (; x < 16;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								if (b !== (65535 & n.check)) {
									e.msg = "header crc mismatch", n.mode = 30;
									break;
								}
								x = b = 0;
							}
							n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = 12;
							break;
						case 10:
							for (; x < 32;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							e.adler = n.check = h(b), x = b = 0, n.mode = 11;
						case 11:
							if (n.havedict === 0) return e.next_out = _, e.avail_out = y, e.next_in = g, e.avail_in = v, n.hold = b, n.bits = x, 2;
							e.adler = n.check = 1, n.mode = 12;
						case 12: if (t === 5 || t === 6) break e;
						case 13:
							if (n.last) {
								b >>>= 7 & x, x -= 7 & x, n.mode = 27;
								break;
							}
							for (; x < 3;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							switch (n.last = 1 & b, --x, 3 & (b >>>= 1)) {
								case 0:
									n.mode = 14;
									break;
								case 1:
									if (w(n), n.mode = 20, t !== 6) break;
									b >>>= 2, x -= 2;
									break e;
								case 2:
									n.mode = 17;
									break;
								case 3: e.msg = "invalid block type", n.mode = 30;
							}
							b >>>= 2, x -= 2;
							break;
						case 14:
							for (b >>>= 7 & x, x -= 7 & x; x < 32;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if ((65535 & b) != (b >>> 16 ^ 65535)) {
								e.msg = "invalid stored block lengths", n.mode = 30;
								break;
							}
							if (n.length = 65535 & b, x = b = 0, n.mode = 15, t === 6) break e;
						case 15: n.mode = 16;
						case 16:
							if (E = n.length) {
								if (v < E && (E = v), y < E && (E = y), E === 0) break e;
								r.arraySet(m, p, g, E, _), v -= E, g += E, y -= E, _ += E, n.length -= E;
								break;
							}
							n.mode = 12;
							break;
						case 17:
							for (; x < 14;) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (n.nlen = 257 + (31 & b), b >>>= 5, x -= 5, n.ndist = 1 + (31 & b), b >>>= 5, x -= 5, n.ncode = 4 + (15 & b), b >>>= 4, x -= 4, 286 < n.nlen || 30 < n.ndist) {
								e.msg = "too many length or distance symbols", n.mode = 30;
								break;
							}
							n.have = 0, n.mode = 18;
						case 18:
							for (; n.have < n.ncode;) {
								for (; x < 3;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								n.lens[ee[n.have++]] = 7 & b, b >>>= 3, x -= 3;
							}
							for (; n.have < 19;) n.lens[ee[n.have++]] = 0;
							if (n.lencode = n.lendyn, n.lenbits = 7, L = { bits: n.lenbits }, I = s(0, n.lens, 0, 19, n.lencode, 0, n.work, L), n.lenbits = L.bits, I) {
								e.msg = "invalid code lengths set", n.mode = 30;
								break;
							}
							n.have = 0, n.mode = 19;
						case 19:
							for (; n.have < n.nlen + n.ndist;) {
								for (; A = (z = n.lencode[b & (1 << n.lenbits) - 1]) >>> 16 & 255, j = 65535 & z, !((k = z >>> 24) <= x);) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								if (j < 16) b >>>= k, x -= k, n.lens[n.have++] = j;
								else {
									if (j === 16) {
										for (R = k + 2; x < R;) {
											if (v === 0) break e;
											v--, b += p[g++] << x, x += 8;
										}
										if (b >>>= k, x -= k, n.have === 0) {
											e.msg = "invalid bit length repeat", n.mode = 30;
											break;
										}
										F = n.lens[n.have - 1], E = 3 + (3 & b), b >>>= 2, x -= 2;
									} else if (j === 17) {
										for (R = k + 3; x < R;) {
											if (v === 0) break e;
											v--, b += p[g++] << x, x += 8;
										}
										x -= k, F = 0, E = 3 + (7 & (b >>>= k)), b >>>= 3, x -= 3;
									} else {
										for (R = k + 7; x < R;) {
											if (v === 0) break e;
											v--, b += p[g++] << x, x += 8;
										}
										x -= k, F = 0, E = 11 + (127 & (b >>>= k)), b >>>= 7, x -= 7;
									}
									if (n.have + E > n.nlen + n.ndist) {
										e.msg = "invalid bit length repeat", n.mode = 30;
										break;
									}
									for (; E--;) n.lens[n.have++] = F;
								}
							}
							if (n.mode === 30) break;
							if (n.lens[256] === 0) {
								e.msg = "invalid code -- missing end-of-block", n.mode = 30;
								break;
							}
							if (n.lenbits = 9, L = { bits: n.lenbits }, I = s(c, n.lens, 0, n.nlen, n.lencode, 0, n.work, L), n.lenbits = L.bits, I) {
								e.msg = "invalid literal/lengths set", n.mode = 30;
								break;
							}
							if (n.distbits = 6, n.distcode = n.distdyn, L = { bits: n.distbits }, I = s(l, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, L), n.distbits = L.bits, I) {
								e.msg = "invalid distances set", n.mode = 30;
								break;
							}
							if (n.mode = 20, t === 6) break e;
						case 20: n.mode = 21;
						case 21:
							if (6 <= v && 258 <= y) {
								e.next_out = _, e.avail_out = y, e.next_in = g, e.avail_in = v, n.hold = b, n.bits = x, o(e, C), _ = e.next_out, m = e.output, y = e.avail_out, g = e.next_in, p = e.input, v = e.avail_in, b = n.hold, x = n.bits, n.mode === 12 && (n.back = -1);
								break;
							}
							for (n.back = 0; A = (z = n.lencode[b & (1 << n.lenbits) - 1]) >>> 16 & 255, j = 65535 & z, !((k = z >>> 24) <= x);) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (A && !(240 & A)) {
								for (M = k, N = A, P = j; A = (z = n.lencode[P + ((b & (1 << M + N) - 1) >> M)]) >>> 16 & 255, j = 65535 & z, !(M + (k = z >>> 24) <= x);) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								b >>>= M, x -= M, n.back += M;
							}
							if (b >>>= k, x -= k, n.back += k, n.length = j, A === 0) {
								n.mode = 26;
								break;
							}
							if (32 & A) {
								n.back = -1, n.mode = 12;
								break;
							}
							if (64 & A) {
								e.msg = "invalid literal/length code", n.mode = 30;
								break;
							}
							n.extra = 15 & A, n.mode = 22;
						case 22:
							if (n.extra) {
								for (R = n.extra; x < R;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								n.length += b & (1 << n.extra) - 1, b >>>= n.extra, x -= n.extra, n.back += n.extra;
							}
							n.was = n.length, n.mode = 23;
						case 23:
							for (; A = (z = n.distcode[b & (1 << n.distbits) - 1]) >>> 16 & 255, j = 65535 & z, !((k = z >>> 24) <= x);) {
								if (v === 0) break e;
								v--, b += p[g++] << x, x += 8;
							}
							if (!(240 & A)) {
								for (M = k, N = A, P = j; A = (z = n.distcode[P + ((b & (1 << M + N) - 1) >> M)]) >>> 16 & 255, j = 65535 & z, !(M + (k = z >>> 24) <= x);) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								b >>>= M, x -= M, n.back += M;
							}
							if (b >>>= k, x -= k, n.back += k, 64 & A) {
								e.msg = "invalid distance code", n.mode = 30;
								break;
							}
							n.offset = j, n.extra = 15 & A, n.mode = 24;
						case 24:
							if (n.extra) {
								for (R = n.extra; x < R;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								n.offset += b & (1 << n.extra) - 1, b >>>= n.extra, x -= n.extra, n.back += n.extra;
							}
							if (n.offset > n.dmax) {
								e.msg = "invalid distance too far back", n.mode = 30;
								break;
							}
							n.mode = 25;
						case 25:
							if (y === 0) break e;
							if (E = C - y, n.offset > E) {
								if ((E = n.offset - E) > n.whave && n.sane) {
									e.msg = "invalid distance too far back", n.mode = 30;
									break;
								}
								D = E > n.wnext ? (E -= n.wnext, n.wsize - E) : n.wnext - E, E > n.length && (E = n.length), O = n.window;
							} else O = m, D = _ - n.offset, E = n.length;
							for (y < E && (E = y), y -= E, n.length -= E; m[_++] = O[D++], --E;);
							n.length === 0 && (n.mode = 21);
							break;
						case 26:
							if (y === 0) break e;
							m[_++] = n.length, y--, n.mode = 21;
							break;
						case 27:
							if (n.wrap) {
								for (; x < 32;) {
									if (v === 0) break e;
									v--, b |= p[g++] << x, x += 8;
								}
								if (C -= y, e.total_out += C, n.total += C, C && (e.adler = n.check = n.flags ? a(n.check, m, C, _ - C) : i(n.check, m, C, _ - C)), C = y, (n.flags ? b : h(b)) !== n.check) {
									e.msg = "incorrect data check", n.mode = 30;
									break;
								}
								x = b = 0;
							}
							n.mode = 28;
						case 28:
							if (n.wrap && n.flags) {
								for (; x < 32;) {
									if (v === 0) break e;
									v--, b += p[g++] << x, x += 8;
								}
								if (b !== (0 | n.total)) {
									e.msg = "incorrect length check", n.mode = 30;
									break;
								}
								x = b = 0;
							}
							n.mode = 29;
						case 29:
							I = 1;
							break e;
						case 30:
							I = -3;
							break e;
						case 31: return -4;
						default: return d;
					}
					return e.next_out = _, e.avail_out = y, e.next_in = g, e.avail_in = v, n.hold = b, n.bits = x, (n.wsize || C !== e.avail_out && n.mode < 30 && (n.mode < 27 || t !== 4)) && T(e, e.output, e.next_out, C - e.avail_out) ? (n.mode = 31, -4) : (S -= e.avail_in, C -= e.avail_out, e.total_in += S, e.total_out += C, n.total += C, n.wrap && C && (e.adler = n.check = n.flags ? a(n.check, m, C, e.next_out - C) : i(n.check, m, C, e.next_out - C)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === 12 ? 128 : 0) + (n.mode === 20 || n.mode === 15 ? 256 : 0), (S == 0 && C === 0 || t === 4) && I === u && (I = -5), I);
				}, n.inflateEnd = function(e) {
					if (!e || !e.state) return d;
					var t = e.state;
					return t.window &&= null, e.state = null, u;
				}, n.inflateGetHeader = function(e, t) {
					var n;
					return e && e.state && 2 & (n = e.state).wrap ? ((n.head = t).done = !1, u) : d;
				}, n.inflateSetDictionary = function(e, t) {
					var n, r = t.length;
					return e && e.state ? (n = e.state).wrap !== 0 && n.mode !== 11 ? d : n.mode === 11 && i(1, t, r, 0) !== n.check ? -3 : T(e, t, r, r) ? (n.mode = 31, -4) : (n.havedict = 1, u) : d;
				}, n.inflateInfo = "pako inflate (from Nodeca project)";
			}, {
				"../utils/common": 41,
				"./adler32": 43,
				"./crc32": 45,
				"./inffast": 48,
				"./inftrees": 50
			}],
			50: [function(e, t, n) {
				var r = e("../utils/common"), i = [
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					13,
					15,
					17,
					19,
					23,
					27,
					31,
					35,
					43,
					51,
					59,
					67,
					83,
					99,
					115,
					131,
					163,
					195,
					227,
					258,
					0,
					0
				], a = [
					16,
					16,
					16,
					16,
					16,
					16,
					16,
					16,
					17,
					17,
					17,
					17,
					18,
					18,
					18,
					18,
					19,
					19,
					19,
					19,
					20,
					20,
					20,
					20,
					21,
					21,
					21,
					21,
					16,
					72,
					78
				], o = [
					1,
					2,
					3,
					4,
					5,
					7,
					9,
					13,
					17,
					25,
					33,
					49,
					65,
					97,
					129,
					193,
					257,
					385,
					513,
					769,
					1025,
					1537,
					2049,
					3073,
					4097,
					6145,
					8193,
					12289,
					16385,
					24577,
					0,
					0
				], s = [
					16,
					16,
					16,
					16,
					17,
					17,
					18,
					18,
					19,
					19,
					20,
					20,
					21,
					21,
					22,
					22,
					23,
					23,
					24,
					24,
					25,
					25,
					26,
					26,
					27,
					27,
					28,
					28,
					29,
					29,
					64,
					64
				];
				t.exports = function(e, t, n, c, l, u, d, f) {
					var p, m, h, g, _, v, y, b, x, S = f.bits, C = 0, w = 0, T = 0, E = 0, D = 0, O = 0, k = 0, A = 0, j = 0, M = 0, N = null, P = 0, F = new r.Buf16(16), I = new r.Buf16(16), L = null, R = 0;
					for (C = 0; C <= 15; C++) F[C] = 0;
					for (w = 0; w < c; w++) F[t[n + w]]++;
					for (D = S, E = 15; 1 <= E && F[E] === 0; E--);
					if (E < D && (D = E), E === 0) return l[u++] = 20971520, l[u++] = 20971520, f.bits = 1, 0;
					for (T = 1; T < E && F[T] === 0; T++);
					for (D < T && (D = T), C = A = 1; C <= 15; C++) if (A <<= 1, (A -= F[C]) < 0) return -1;
					if (0 < A && (e === 0 || E !== 1)) return -1;
					for (I[1] = 0, C = 1; C < 15; C++) I[C + 1] = I[C] + F[C];
					for (w = 0; w < c; w++) t[n + w] !== 0 && (d[I[t[n + w]]++] = w);
					if (v = e === 0 ? (N = L = d, 19) : e === 1 ? (N = i, P -= 257, L = a, R -= 257, 256) : (N = o, L = s, -1), C = T, _ = u, k = w = M = 0, h = -1, g = (j = 1 << (O = D)) - 1, e === 1 && 852 < j || e === 2 && 592 < j) return 1;
					for (;;) {
						for (y = C - k, x = d[w] < v ? (b = 0, d[w]) : d[w] > v ? (b = L[R + d[w]], N[P + d[w]]) : (b = 96, 0), p = 1 << C - k, T = m = 1 << O; l[_ + (M >> k) + (m -= p)] = y << 24 | b << 16 | x, m !== 0;);
						for (p = 1 << C - 1; M & p;) p >>= 1;
						if (p === 0 ? M = 0 : (M &= p - 1, M += p), w++, --F[C] == 0) {
							if (C === E) break;
							C = t[n + d[w]];
						}
						if (D < C && (M & g) !== h) {
							for (k === 0 && (k = D), _ += T, A = 1 << (O = C - k); O + k < E && !((A -= F[O + k]) <= 0);) O++, A <<= 1;
							if (j += 1 << O, e === 1 && 852 < j || e === 2 && 592 < j) return 1;
							l[h = M & g] = D << 24 | O << 16 | _ - u;
						}
					}
					return M !== 0 && (l[_ + M] = C - k << 24 | 4194304), f.bits = D, 0;
				};
			}, { "../utils/common": 41 }],
			51: [function(e, t, n) {
				t.exports = {
					2: "need dictionary",
					1: "stream end",
					0: "",
					"-1": "file error",
					"-2": "stream error",
					"-3": "data error",
					"-4": "insufficient memory",
					"-5": "buffer error",
					"-6": "incompatible version"
				};
			}, {}],
			52: [function(e, t, n) {
				var r = e("../utils/common"), i = 0, a = 1;
				function o(e) {
					for (var t = e.length; 0 <= --t;) e[t] = 0;
				}
				var s = 0, c = 29, l = 256, u = l + 1 + c, d = 30, f = 19, p = 2 * u + 1, m = 15, h = 16, g = 7, _ = 256, v = 16, y = 17, b = 18, x = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					2,
					2,
					2,
					2,
					3,
					3,
					3,
					3,
					4,
					4,
					4,
					4,
					5,
					5,
					5,
					5,
					0
				], S = [
					0,
					0,
					0,
					0,
					1,
					1,
					2,
					2,
					3,
					3,
					4,
					4,
					5,
					5,
					6,
					6,
					7,
					7,
					8,
					8,
					9,
					9,
					10,
					10,
					11,
					11,
					12,
					12,
					13,
					13
				], C = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					2,
					3,
					7
				], w = [
					16,
					17,
					18,
					0,
					8,
					7,
					9,
					6,
					10,
					5,
					11,
					4,
					12,
					3,
					13,
					2,
					14,
					1,
					15
				], T = Array(2 * (u + 2));
				o(T);
				var E = Array(2 * d);
				o(E);
				var D = Array(512);
				o(D);
				var O = Array(256);
				o(O);
				var k = Array(c);
				o(k);
				var A, j, M, N = Array(d);
				function P(e, t, n, r, i) {
					this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
				}
				function F(e, t) {
					this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
				}
				function I(e) {
					return e < 256 ? D[e] : D[256 + (e >>> 7)];
				}
				function L(e, t) {
					e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255;
				}
				function R(e, t, n) {
					e.bi_valid > h - n ? (e.bi_buf |= t << e.bi_valid & 65535, L(e, e.bi_buf), e.bi_buf = t >> h - e.bi_valid, e.bi_valid += n - h) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
				}
				function z(e, t, n) {
					R(e, n[2 * t], n[2 * t + 1]);
				}
				function B(e, t) {
					for (var n = 0; n |= 1 & e, e >>>= 1, n <<= 1, 0 < --t;);
					return n >>> 1;
				}
				function ee(e, t, n) {
					var r, i, a = Array(m + 1), o = 0;
					for (r = 1; r <= m; r++) a[r] = o = o + n[r - 1] << 1;
					for (i = 0; i <= t; i++) {
						var s = e[2 * i + 1];
						s !== 0 && (e[2 * i] = B(a[s]++, s));
					}
				}
				function te(e) {
					for (var t = 0; t < u; t++) e.dyn_ltree[2 * t] = 0;
					for (t = 0; t < d; t++) e.dyn_dtree[2 * t] = 0;
					for (t = 0; t < f; t++) e.bl_tree[2 * t] = 0;
					e.dyn_ltree[2 * _] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
				}
				function V(e) {
					8 < e.bi_valid ? L(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
				}
				function ne(e, t, n, r) {
					var i = 2 * t, a = 2 * n;
					return e[i] < e[a] || e[i] === e[a] && r[t] <= r[n];
				}
				function re(e, t, n) {
					for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && ne(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !ne(t, r, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
					e.heap[n] = r;
				}
				function H(e, t, n) {
					var r, i, a, o, s = 0;
					if (e.last_lit !== 0) for (; r = e.pending_buf[e.d_buf + 2 * s] << 8 | e.pending_buf[e.d_buf + 2 * s + 1], i = e.pending_buf[e.l_buf + s], s++, r === 0 ? z(e, i, t) : (z(e, (a = O[i]) + l + 1, t), (o = x[a]) !== 0 && R(e, i -= k[a], o), z(e, a = I(--r), n), (o = S[a]) !== 0 && R(e, r -= N[a], o)), s < e.last_lit;);
					z(e, _, t);
				}
				function ie(e, t) {
					var n, r, i, a = t.dyn_tree, o = t.stat_desc.static_tree, s = t.stat_desc.has_stree, c = t.stat_desc.elems, l = -1;
					for (e.heap_len = 0, e.heap_max = p, n = 0; n < c; n++) a[2 * n] === 0 ? a[2 * n + 1] = 0 : (e.heap[++e.heap_len] = l = n, e.depth[n] = 0);
					for (; e.heap_len < 2;) a[2 * (i = e.heap[++e.heap_len] = l < 2 ? ++l : 0)] = 1, e.depth[i] = 0, e.opt_len--, s && (e.static_len -= o[2 * i + 1]);
					for (t.max_code = l, n = e.heap_len >> 1; 1 <= n; n--) re(e, a, n);
					for (i = c; n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], re(e, a, 1), r = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = r, a[2 * i] = a[2 * n] + a[2 * r], e.depth[i] = (e.depth[n] >= e.depth[r] ? e.depth[n] : e.depth[r]) + 1, a[2 * n + 1] = a[2 * r + 1] = i, e.heap[1] = i++, re(e, a, 1), 2 <= e.heap_len;);
					e.heap[--e.heap_max] = e.heap[1], function(e, t) {
						var n, r, i, a, o, s, c = t.dyn_tree, l = t.max_code, u = t.stat_desc.static_tree, d = t.stat_desc.has_stree, f = t.stat_desc.extra_bits, h = t.stat_desc.extra_base, g = t.stat_desc.max_length, _ = 0;
						for (a = 0; a <= m; a++) e.bl_count[a] = 0;
						for (c[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < p; n++) g < (a = c[2 * c[2 * (r = e.heap[n]) + 1] + 1] + 1) && (a = g, _++), c[2 * r + 1] = a, l < r || (e.bl_count[a]++, o = 0, h <= r && (o = f[r - h]), s = c[2 * r], e.opt_len += s * (a + o), d && (e.static_len += s * (u[2 * r + 1] + o)));
						if (_ !== 0) {
							do {
								for (a = g - 1; e.bl_count[a] === 0;) a--;
								e.bl_count[a]--, e.bl_count[a + 1] += 2, e.bl_count[g]--, _ -= 2;
							} while (0 < _);
							for (a = g; a !== 0; a--) for (r = e.bl_count[a]; r !== 0;) l < (i = e.heap[--n]) || (c[2 * i + 1] !== a && (e.opt_len += (a - c[2 * i + 1]) * c[2 * i], c[2 * i + 1] = a), r--);
						}
					}(e, t), ee(a, l, e.bl_count);
				}
				function ae(e, t, n) {
					var r, i, a = -1, o = t[1], s = 0, c = 7, l = 4;
					for (o === 0 && (c = 138, l = 3), t[2 * (n + 1) + 1] = 65535, r = 0; r <= n; r++) i = o, o = t[2 * (r + 1) + 1], ++s < c && i === o || (s < l ? e.bl_tree[2 * i] += s : i === 0 ? s <= 10 ? e.bl_tree[2 * y]++ : e.bl_tree[2 * b]++ : (i !== a && e.bl_tree[2 * i]++, e.bl_tree[2 * v]++), a = i, l = (s = 0) === o ? (c = 138, 3) : i === o ? (c = 6, 3) : (c = 7, 4));
				}
				function U(e, t, n) {
					var r, i, a = -1, o = t[1], s = 0, c = 7, l = 4;
					for (o === 0 && (c = 138, l = 3), r = 0; r <= n; r++) if (i = o, o = t[2 * (r + 1) + 1], !(++s < c && i === o)) {
						if (s < l) for (; z(e, i, e.bl_tree), --s != 0;);
						else i === 0 ? s <= 10 ? (z(e, y, e.bl_tree), R(e, s - 3, 3)) : (z(e, b, e.bl_tree), R(e, s - 11, 7)) : (i !== a && (z(e, i, e.bl_tree), s--), z(e, v, e.bl_tree), R(e, s - 3, 2));
						a = i, l = (s = 0) === o ? (c = 138, 3) : i === o ? (c = 6, 3) : (c = 7, 4);
					}
				}
				o(N);
				var oe = !1;
				function se(e, t, n, i) {
					R(e, (s << 1) + +!!i, 3), function(e, t, n, i) {
						V(e), L(e, n), L(e, ~n), r.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n;
					}(e, t, n, !0);
				}
				n._tr_init = function(e) {
					oe ||= (function() {
						var e, t, n, r, i, a = Array(m + 1);
						for (r = n = 0; r < c - 1; r++) for (k[r] = n, e = 0; e < 1 << x[r]; e++) O[n++] = r;
						for (O[n - 1] = r, r = i = 0; r < 16; r++) for (N[r] = i, e = 0; e < 1 << S[r]; e++) D[i++] = r;
						for (i >>= 7; r < d; r++) for (N[r] = i << 7, e = 0; e < 1 << S[r] - 7; e++) D[256 + i++] = r;
						for (t = 0; t <= m; t++) a[t] = 0;
						for (e = 0; e <= 143;) T[2 * e + 1] = 8, e++, a[8]++;
						for (; e <= 255;) T[2 * e + 1] = 9, e++, a[9]++;
						for (; e <= 279;) T[2 * e + 1] = 7, e++, a[7]++;
						for (; e <= 287;) T[2 * e + 1] = 8, e++, a[8]++;
						for (ee(T, u + 1, a), e = 0; e < d; e++) E[2 * e + 1] = 5, E[2 * e] = B(e, 5);
						A = new P(T, x, l + 1, u, m), j = new P(E, S, 0, d, m), M = new P([], C, 0, f, g);
					}(), !0), e.l_desc = new F(e.dyn_ltree, A), e.d_desc = new F(e.dyn_dtree, j), e.bl_desc = new F(e.bl_tree, M), e.bi_buf = 0, e.bi_valid = 0, te(e);
				}, n._tr_stored_block = se, n._tr_flush_block = function(e, t, n, r) {
					var o, s, c = 0;
					0 < e.level ? (e.strm.data_type === 2 && (e.strm.data_type = function(e) {
						var t, n = 4093624447;
						for (t = 0; t <= 31; t++, n >>>= 1) if (1 & n && e.dyn_ltree[2 * t] !== 0) return i;
						if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0) return a;
						for (t = 32; t < l; t++) if (e.dyn_ltree[2 * t] !== 0) return a;
						return i;
					}(e)), ie(e, e.l_desc), ie(e, e.d_desc), c = function(e) {
						var t;
						for (ae(e, e.dyn_ltree, e.l_desc.max_code), ae(e, e.dyn_dtree, e.d_desc.max_code), ie(e, e.bl_desc), t = f - 1; 3 <= t && e.bl_tree[2 * w[t] + 1] === 0; t--);
						return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
					}(e), o = e.opt_len + 3 + 7 >>> 3, (s = e.static_len + 3 + 7 >>> 3) <= o && (o = s)) : o = s = n + 5, n + 4 <= o && t !== -1 ? se(e, t, n, r) : e.strategy === 4 || s === o ? (R(e, 2 + +!!r, 3), H(e, T, E)) : (R(e, 4 + +!!r, 3), function(e, t, n, r) {
						var i;
						for (R(e, t - 257, 5), R(e, n - 1, 5), R(e, r - 4, 4), i = 0; i < r; i++) R(e, e.bl_tree[2 * w[i] + 1], 3);
						U(e, e.dyn_ltree, t - 1), U(e, e.dyn_dtree, n - 1);
					}(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, c + 1), H(e, e.dyn_ltree, e.dyn_dtree)), te(e), r && V(e);
				}, n._tr_tally = function(e, t, n) {
					return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, t === 0 ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (O[n] + l + 1)]++, e.dyn_dtree[2 * I(t)]++), e.last_lit === e.lit_bufsize - 1;
				}, n._tr_align = function(e) {
					R(e, 2, 3), z(e, _, T), function(e) {
						e.bi_valid === 16 ? (L(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8);
					}(e);
				};
			}, { "../utils/common": 41 }],
			53: [function(e, t, n) {
				t.exports = function() {
					this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
				};
			}, {}],
			54: [function(e, t, n) {
				(function(e) {
					(function(e, t) {
						if (!e.setImmediate) {
							var n, r, i, a, o = 1, s = {}, c = !1, l = e.document, u = Object.getPrototypeOf && Object.getPrototypeOf(e);
							u = u && u.setTimeout ? u : e, n = {}.toString.call(e.process) === "[object process]" ? function(e) {
								process.nextTick(function() {
									f(e);
								});
							} : function() {
								if (e.postMessage && !e.importScripts) {
									var t = !0, n = e.onmessage;
									return e.onmessage = function() {
										t = !1;
									}, e.postMessage("", "*"), e.onmessage = n, t;
								}
							}() ? (a = "setImmediate$" + Math.random() + "$", e.addEventListener ? e.addEventListener("message", p, !1) : e.attachEvent("onmessage", p), function(t) {
								e.postMessage(a + t, "*");
							}) : e.MessageChannel ? ((i = new MessageChannel()).port1.onmessage = function(e) {
								f(e.data);
							}, function(e) {
								i.port2.postMessage(e);
							}) : l && "onreadystatechange" in l.createElement("script") ? (r = l.documentElement, function(e) {
								var t = l.createElement("script");
								t.onreadystatechange = function() {
									f(e), t.onreadystatechange = null, r.removeChild(t), t = null;
								}, r.appendChild(t);
							}) : function(e) {
								setTimeout(f, 0, e);
							}, u.setImmediate = function(e) {
								typeof e != "function" && (e = Function("" + e));
								for (var t = Array(arguments.length - 1), r = 0; r < t.length; r++) t[r] = arguments[r + 1];
								return s[o] = {
									callback: e,
									args: t
								}, n(o), o++;
							}, u.clearImmediate = d;
						}
						function d(e) {
							delete s[e];
						}
						function f(e) {
							if (c) setTimeout(f, 0, e);
							else {
								var n = s[e];
								if (n) {
									c = !0;
									try {
										(function(e) {
											var n = e.callback, r = e.args;
											switch (r.length) {
												case 0:
													n();
													break;
												case 1:
													n(r[0]);
													break;
												case 2:
													n(r[0], r[1]);
													break;
												case 3:
													n(r[0], r[1], r[2]);
													break;
												default: n.apply(t, r);
											}
										})(n);
									} finally {
										d(e), c = !1;
									}
								}
							}
						}
						function p(t) {
							t.source === e && typeof t.data == "string" && t.data.indexOf(a) === 0 && f(+t.data.slice(a.length));
						}
					})(typeof self > "u" ? e === void 0 ? this : e : self);
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, {}]
		}, {}, [10])(10);
	});
})))(), 1), Vt = (e) => !e.startsWith("/") && !e.includes("\\") && !/\p{Cc}/u.test(e) && e.split("/").every((e) => e !== "" && e !== "." && e !== ".."), Ht = (e) => {
	let t = e.lastIndexOf(".");
	return t === -1 ? "" : e.slice(t).toLowerCase();
};
function Ut(e, t) {
	return new Promise((n, r) => {
		let i = [], a = 0, o = e.internalStream("uint8array");
		o.on("data", (e) => {
			a += e.length, a > t ? (o.pause(), r(/* @__PURE__ */ RangeError(`inflates past ${t} bytes`))) : i.push(e);
		}).on("error", r).on("end", () => {
			let e = new Uint8Array(a), t = 0;
			for (let n of i) e.set(n, t), t += n.length;
			n(e);
		}).resume();
	});
}
async function Wt(e, t, n) {
	let r = await Bt.default.loadAsync(t), i = Object.entries(r.files).filter(([, e]) => !e.dir);
	if (n) {
		if (i.length > n.maxEntries) throw Error(`The .mjz holds ${i.length} files; this host opens at most ${n.maxEntries}.`);
		for (let [e] of i) if (!Vt(e) || !n.extensions.includes(Ht(e))) throw Error(`The .mjz holds "${e}", which this host does not open.`);
	}
	let a = null, o = n?.maxInflatedBytes ?? Infinity;
	for (let [t, r] of i) {
		let i = t.replace(/\\/g, "/").split("/").filter((e) => e && e !== ".." && e !== ".").join("/");
		if (!i) continue;
		let s;
		try {
			s = await Ut(r, o);
		} catch (e) {
			throw e instanceof RangeError && n ? Error(`The .mjz inflates to more than ${n.maxInflatedBytes / 1048576} MB, which this host does not open.`) : e;
		}
		o -= s.length;
		let c = `/working/${i}`, l = c.substring(0, c.lastIndexOf("/"));
		try {
			e.FS.mkdirTree(l, 511);
		} catch {}
		e.FS.writeFile(c, s), i.endsWith(".xml") && !i.includes("/") && (a = i);
	}
	if (!a) throw Error("No root XML found in .mjz archive");
	return a;
}
//#endregion
//#region node_modules/@sparkjsdev/spark/dist/spark.module.js
var Gt = new pe(-1, 1, 1, -1, 0, 1), Kt = new class extends c {
	constructor() {
		super(), this.setAttribute("position", new N([
			-1,
			3,
			0,
			-1,
			-1,
			0,
			3,
			-1,
			0
		], 3)), this.setAttribute("uv", new N([
			0,
			2,
			0,
			0,
			2,
			0
		], 2));
	}
}(), qt = class {
	constructor(e) {
		this._mesh = new xe(Kt, e);
	}
	dispose() {
		this._mesh.geometry.dispose();
	}
	render(e) {
		e.render(this._mesh, Gt);
	}
	get material() {
		return this._mesh.material;
	}
	set material(e) {
		this._mesh.material = e;
	}
}, Jt = Uint8Array, Yt = Uint16Array, Xt = Int32Array, Zt = new Jt([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]), Qt = new Jt([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]), $t = new Jt([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), en = function(e, t) {
	for (var n = new Yt(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new Xt(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return {
		b: n,
		r: i
	};
}, tn = en(Zt, 2), nn = tn.b, rn = tn.r;
nn[28] = 258, rn[258] = 28;
for (var an = en(Qt, 0).b, on = new Yt(32768), K = 0; K < 32768; ++K) {
	var sn = (K & 43690) >> 1 | (K & 21845) << 1;
	sn = (sn & 52428) >> 2 | (sn & 13107) << 2, sn = (sn & 61680) >> 4 | (sn & 3855) << 4, on[K] = ((sn & 65280) >> 8 | (sn & 255) << 8) >> 1;
}
for (var cn = function(e, t, n) {
	for (var r = e.length, i = 0, a = new Yt(t); i < r; ++i) e[i] && ++a[e[i] - 1];
	var o = new Yt(t);
	for (i = 1; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new Yt(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[on[d] >> c] = l;
	} else for (s = new Yt(r), i = 0; i < r; ++i) e[i] && (s[i] = on[o[e[i] - 1]++] >> 15 - e[i]);
	return s;
}, q = new Jt(288), K = 0; K < 144; ++K) q[K] = 8;
for (var K = 144; K < 256; ++K) q[K] = 9;
for (var K = 256; K < 280; ++K) q[K] = 7;
for (var K = 280; K < 288; ++K) q[K] = 8;
for (var ln = new Jt(32), K = 0; K < 32; ++K) ln[K] = 5;
var J = /* @__PURE__ */ cn(q, 9, 1), un = /* @__PURE__ */ cn(ln, 5, 1), dn = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, fn = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, pn = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, mn = function(e) {
	return (e + 7) / 8 | 0;
}, hn = function(e, t, n) {
	return (t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length), new Jt(e.subarray(t, n));
}, gn = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
], _n = function(e, t, n) {
	var r = Error(t || gn[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, _n), !n) throw r;
	return r;
}, vn = function(e, t, n, r) {
	var i = e.length, a = r ? r.length : 0;
	if (!i || t.f && !t.l) return n || new Jt(0);
	var o = !n, s = o || t.i != 2, c = t.i;
	o && (n = new Jt(i * 3));
	var l = function(e) {
		var t = n.length;
		if (e > t) {
			var r = new Jt(Math.max(t * 2, e));
			r.set(n), n = r;
		}
	}, u = t.f || 0, d = t.p || 0, f = t.b || 0, p = t.l, m = t.d, h = t.m, g = t.n, _ = i * 8;
	do {
		if (!p) {
			u = fn(e, d, 1);
			var v = fn(e, d + 1, 3);
			if (d += 3, !v) {
				var y = mn(d) + 4, b = e[y - 4] | e[y - 3] << 8, x = y + b;
				if (x > i) {
					c && _n(0);
					break;
				}
				s && l(f + b), n.set(e.subarray(y, x), f), t.b = f += b, t.p = d = x * 8, t.f = u;
				continue;
			}
			if (v == 1) p = J, m = un, h = 9, g = 5;
			else if (v == 2) {
				var S = fn(e, d, 31) + 257, C = fn(e, d + 10, 15) + 4, w = S + fn(e, d + 5, 31) + 1;
				d += 14;
				for (var T = new Jt(w), E = new Jt(19), D = 0; D < C; ++D) E[$t[D]] = fn(e, d + D * 3, 7);
				d += C * 3;
				for (var O = dn(E), k = (1 << O) - 1, A = cn(E, O, 1), D = 0; D < w;) {
					var j = A[fn(e, d, k)];
					d += j & 15;
					var y = j >> 4;
					if (y < 16) T[D++] = y;
					else {
						var M = 0, N = 0;
						for (y == 16 ? (N = 3 + fn(e, d, 3), d += 2, M = T[D - 1]) : y == 17 ? (N = 3 + fn(e, d, 7), d += 3) : y == 18 && (N = 11 + fn(e, d, 127), d += 7); N--;) T[D++] = M;
					}
				}
				var P = T.subarray(0, S), F = T.subarray(S);
				h = dn(P), g = dn(F), p = cn(P, h, 1), m = cn(F, g, 1);
			} else _n(1);
			if (d > _) {
				c && _n(0);
				break;
			}
		}
		s && l(f + 131072);
		for (var I = (1 << h) - 1, L = (1 << g) - 1, R = d;; R = d) {
			var M = p[pn(e, d) & I], z = M >> 4;
			if (d += M & 15, d > _) {
				c && _n(0);
				break;
			}
			if (M || _n(2), z < 256) n[f++] = z;
			else if (z == 256) {
				R = d, p = null;
				break;
			} else {
				var B = z - 254;
				if (z > 264) {
					var D = z - 257, ee = Zt[D];
					B = fn(e, d, (1 << ee) - 1) + nn[D], d += ee;
				}
				var te = m[pn(e, d) & L], V = te >> 4;
				te || _n(3), d += te & 15;
				var F = an[V];
				if (V > 3) {
					var ee = Qt[V];
					F += pn(e, d) & (1 << ee) - 1, d += ee;
				}
				if (d > _) {
					c && _n(0);
					break;
				}
				s && l(f + 131072);
				var ne = f + B;
				if (f < F) {
					var re = a - F, H = Math.min(F, ne);
					for (re + f < 0 && _n(3); f < H; ++f) n[f] = r[re + f];
				}
				for (; f < ne; ++f) n[f] = n[f - F];
			}
		}
		t.l = p, t.p = R, t.b = f, t.f = u, p && (u = 1, t.m = h, t.d = m, t.n = g);
	} while (!u);
	return f != n.length && o ? hn(n, 0, f) : n.subarray(0, f);
}, yn = /* @__PURE__ */ new Jt(0), bn = function(e, t) {
	return e[t] | e[t + 1] << 8;
}, xn = function(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}, Sn = function(e, t) {
	return xn(e, t) + xn(e, t + 4) * 4294967296;
}, Cn = function(e) {
	(e[0] != 31 || e[1] != 139 || e[2] != 8) && _n(6, "invalid gzip data");
	var t = e[3], n = 10;
	t & 4 && (n += (e[10] | e[11] << 8) + 2);
	for (var r = (t >> 3 & 1) + (t >> 4 & 1); r > 0; r -= !e[n++]);
	return n + (t & 2);
}, wn = /* @__PURE__ */ function() {
	function e(e, t) {
		typeof e == "function" && (t = e, e = {}), this.ondata = t;
		var n = e && e.dictionary && e.dictionary.subarray(-32768);
		this.s = {
			i: 0,
			b: n ? n.length : 0
		}, this.o = new Jt(32768), this.p = new Jt(0), n && this.o.set(n);
	}
	return e.prototype.e = function(e) {
		if (this.ondata || _n(5), this.d && _n(4), !this.p.length) this.p = e;
		else if (e.length) {
			var t = new Jt(this.p.length + e.length);
			t.set(this.p), t.set(e, this.p.length), this.p = t;
		}
	}, e.prototype.c = function(e) {
		this.s.i = +(this.d = e || !1);
		var t = this.s.b, n = vn(this.p, this.s, this.o);
		this.ondata(hn(n, t, this.s.b), this.d), this.o = hn(n, this.s.b - 32768), this.s.b = this.o.length, this.p = hn(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	}, e.prototype.push = function(e, t) {
		this.e(e), this.c(t);
	}, e;
}();
function Tn(e, t) {
	return vn(e, { i: 2 }, t && t.out, t && t.dictionary);
}
var En = /* @__PURE__ */ function() {
	function e(e, t) {
		this.v = 1, this.r = 0, wn.call(this, e, t);
	}
	return e.prototype.push = function(e, t) {
		if (wn.prototype.e.call(this, e), this.r += e.length, this.v) {
			var n = this.p.subarray(this.v - 1), r = n.length > 3 ? Cn(n) : 4;
			if (r > n.length) {
				if (!t) return;
			} else this.v > 1 && this.onmember && this.onmember(this.r - n.length);
			this.p = n.subarray(r), this.v = 0;
		}
		wn.prototype.c.call(this, t), this.s.f && !this.s.l && !t && (this.v = mn(this.s.p) + 9, this.s = { i: 0 }, this.o = new Jt(0), this.push(new Jt(0), t));
	}, e;
}(), Dn = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder();
try {
	Dn.decode(yn, { stream: !0 });
} catch {}
var On = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: hn(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function kn(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	}
	if (Dn) return Dn.decode(e);
	var i = On(e), a = i.s, n = i.r;
	return n.length && _n(8), a;
}
var An = function(e, t) {
	return t + 30 + bn(e, t + 26) + bn(e, t + 28);
}, jn = function(e, t, n) {
	var r = bn(e, t + 28), i = kn(e.subarray(t + 46, t + 46 + r), !(bn(e, t + 8) & 2048)), a = t + 46 + r, o = xn(e, t + 20), s = n && o == 4294967295 ? Mn(e, a) : [
		o,
		xn(e, t + 24),
		xn(e, t + 42)
	], c = s[0], l = s[1], u = s[2];
	return [
		bn(e, t + 10),
		c,
		l,
		i,
		a + bn(e, t + 30) + bn(e, t + 32),
		u
	];
}, Mn = function(e, t) {
	for (; bn(e, t) != 1; t += 4 + bn(e, t + 2));
	return [
		Sn(e, t + 12),
		Sn(e, t + 4),
		Sn(e, t + 20)
	];
};
function Nn(e, t) {
	for (var n = {}, r = e.length - 22; xn(e, r) != 101010256; --r) (!r || e.length - r > 65558) && _n(13);
	var i = bn(e, r + 8);
	if (!i) return {};
	var a = xn(e, r + 16), o = a == 4294967295 || i == 65535;
	if (o) {
		var s = xn(e, r - 12);
		o = xn(e, s) == 101075792, o && (i = xn(e, s + 32), a = xn(e, s + 48));
	}
	for (var c = t && t.filter, l = 0; l < i; ++l) {
		var u = jn(e, a, o), d = u[0], f = u[1], p = u[2], m = u[3], h = u[4], g = u[5], _ = An(e, g);
		a = h, (!c || c({
			name: m,
			size: f,
			originalSize: p,
			compression: d
		})) && (d ? d == 8 ? n[m] = Tn(e.subarray(_, _ + f), { out: new Jt(p) }) : _n(14, "unknown compression type " + d) : n[m] = hn(e, _, _ + f));
	}
	return n;
}
var Pn, Fn = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
	ignoreBOM: !0,
	fatal: !0
}) : { decode: () => {
	throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Fn.decode();
var In = null;
function Ln() {
	return (In === null || In.byteLength === 0) && (In = new Uint8Array(Pn.memory.buffer)), In;
}
function Rn(e, t) {
	return e >>>= 0, Fn.decode(Ln().subarray(e, e + t));
}
function zn(e, t, n, r, i, a, o, s, c, l, u, d, f) {
	return Pn.raycast_splats(e, t, n, r, i, a, o, s, c, l, u, d, f);
}
async function Bn(e, t) {
	if (typeof Response == "function" && e instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming == "function") try {
			return await WebAssembly.instantiateStreaming(e, t);
		} catch (t) {
			if (e.headers.get("Content-Type") == "application/wasm") throw t;
		}
		let n = await e.arrayBuffer();
		return await WebAssembly.instantiate(n, t);
	}
	{
		let n = await WebAssembly.instantiate(e, t);
		return n instanceof WebAssembly.Instance ? {
			instance: n,
			module: e
		} : n;
	}
}
function Vn() {
	let e = {};
	return e.wbg = {}, e.wbg.__wbg_buffer_609cc3eee51ed158 = function(e) {
		return e.buffer;
	}, e.wbg.__wbg_length_3b4f022188ae8db6 = function(e) {
		return e.length;
	}, e.wbg.__wbg_length_6ca527665d89694d = function(e) {
		return e.length;
	}, e.wbg.__wbg_length_8cfd2c6409af88ad = function(e) {
		return e.length;
	}, e.wbg.__wbg_new_9fee97a409b32b68 = function(e) {
		return new Uint16Array(e);
	}, e.wbg.__wbg_new_e3b321dcfef89fc7 = function(e) {
		return new Uint32Array(e);
	}, e.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354 = function(e, t, n) {
		return new Float32Array(e, t >>> 0, n >>> 0);
	}, e.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212 = function(e, t, n) {
		return new Uint32Array(e, t >>> 0, n >>> 0);
	}, e.wbg.__wbg_newwithlength_5a5efe313cfd59f1 = function(e) {
		return new Float32Array(e >>> 0);
	}, e.wbg.__wbg_set_10bad9bee0e9c58b = function(e, t, n) {
		e.set(t, n >>> 0);
	}, e.wbg.__wbg_set_d23661d19148b229 = function(e, t, n) {
		e.set(t, n >>> 0);
	}, e.wbg.__wbg_set_f4f1f0daa30696fc = function(e, t, n) {
		e.set(t, n >>> 0);
	}, e.wbg.__wbg_subarray_3aaeec89bb2544f0 = function(e, t, n) {
		return e.subarray(t >>> 0, n >>> 0);
	}, e.wbg.__wbg_subarray_769e1e0f81bb259b = function(e, t, n) {
		return e.subarray(t >>> 0, n >>> 0);
	}, e.wbg.__wbindgen_init_externref_table = function() {
		let e = Pn.__wbindgen_export_0, t = e.grow(4);
		e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
	}, e.wbg.__wbindgen_memory = function() {
		return Pn.memory;
	}, e.wbg.__wbindgen_throw = function(e, t) {
		throw Error(Rn(e, t));
	}, e;
}
function Hn(e, t) {
	return Pn = e.exports, Un.__wbindgen_wasm_module = t, In = null, Pn.__wbindgen_start(), Pn;
}
async function Un(e) {
	if (Pn !== void 0) return Pn;
	e !== void 0 && Object.getPrototypeOf(e) === Object.prototype && ({module_or_path: e} = e), e === void 0 && (e = new URL("./assets/mjswan-engine-CmckSge4.wasm", import.meta.url));
	let t = Vn();
	(typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
	let { instance: n, module: r } = await Bn(await e, t);
	return Hn(n, r);
}
var Wn = Math.exp(-30), Y = 2048, Gn = 2048, Kn = 1;
function qn(e) {
	return e === "bool" || e === "bvec2" || e === "bvec3" || e === "bvec4";
}
function Jn(e) {
	return e === "int" || e === "ivec2" || e === "ivec3" || e === "ivec4";
}
function Yn(e) {
	return e === "uint" || e === "uvec2" || e === "uvec3" || e === "uvec4";
}
function Xn(e) {
	return e === "float" || e === "vec2" || e === "vec3" || e === "vec4";
}
function Zn(e) {
	return e === "mat2" || e === "mat2x2" || e === "mat2x3" || e === "mat2x4" || e === "mat3" || e === "mat3x2" || e === "mat3x3" || e === "mat3x4" || e === "mat4" || e === "mat4x2" || e === "mat4x3" || e === "mat4x4";
}
function Qn(e) {
	return Xn(e) || Zn(e);
}
function $n(e) {
	return e === "mat2" || e === "mat2x2";
}
function er(e) {
	return e === "mat3" || e === "mat3x3";
}
function tr(e) {
	return e === "mat4" || e === "mat4x4";
}
function nr(e) {
	switch (e) {
		case "vec2": return "float";
		case "vec3": return "float";
		case "vec4": return "float";
		case "ivec2": return "int";
		case "ivec3": return "int";
		case "ivec4": return "int";
		case "uvec2": return "uint";
		case "uvec3": return "uint";
		case "uvec4": return "uint";
		default: throw Error(`Invalid vector type: ${e}`);
	}
}
function rr(e) {
	switch (e) {
		case "vec2":
		case "ivec2":
		case "uvec2": return 2;
		case "vec3":
		case "ivec3":
		case "uvec3": return 3;
		case "vec4":
		case "ivec4":
		case "uvec4": return 4;
		default: throw Error(`Invalid vector type: ${e}`);
	}
}
function ir(e) {
	return Math.trunc(e).toString();
}
function ar(e) {
	return `${Math.max(0, Math.trunc(e)).toString()}u`;
}
function X(e) {
	return e === Infinity ? "INFINITY" : e === -Infinity ? "-INFINITY" : Number.isInteger(e) ? e.toFixed(1) : e.toString();
}
function or(e) {
	return e instanceof sr ? e.type : e.dynoOut().type;
}
var sr = class {
	constructor(e) {
		this.__isDynoValue = !0, this.type = e;
	}
}, cr = class extends sr {
	constructor(e, t) {
		super(e.outTypes[t]), this.dyno = e, this.key = t;
	}
}, lr = class extends sr {
	constructor(e, t) {
		super(e), this.literal = t;
	}
	getLiteral() {
		return this.literal;
	}
}, ur = class extends lr {
	constructor(e, t) {
		super(e, ""), this.value = t;
	}
	getLiteral() {
		let { type: e, value: t } = this;
		switch (e) {
			case "bool": return t ? "true" : "false";
			case "uint": return ar(t);
			case "int": return ir(t);
			case "float": return X(t);
			case "bvec2": {
				let e = t;
				return `bvec2(${e[0]}, ${e[1]})`;
			}
			case "uvec2": {
				if (t instanceof y) return `uvec2(${ar(t.x)}, ${ar(t.y)})`;
				let e = t;
				return `uvec2(${ar(e[0])}, ${ar(e[1])})`;
			}
			case "ivec2": {
				if (t instanceof y) return `ivec2(${ir(t.x)}, ${ir(t.y)})`;
				let e = t;
				return `ivec2(${ir(e[0])}, ${ir(e[1])})`;
			}
			case "vec2": {
				if (t instanceof y) return `vec2(${X(t.x)}, ${X(t.y)})`;
				let e = t;
				return `vec2(${X(e[0])}, ${X(e[1])})`;
			}
			case "bvec3": {
				let e = t;
				return `bvec3(${e[0]}, ${e[1]}, ${e[2]})`;
			}
			case "uvec3": {
				if (t instanceof z) return `uvec3(${ar(t.x)}, ${ar(t.y)}, ${ar(t.z)})`;
				let e = t;
				return `uvec3(${ar(e[0])}, ${ar(e[1])}, ${ar(e[2])})`;
			}
			case "ivec3": {
				if (t instanceof z) return `ivec3(${ir(t.x)}, ${ir(t.y)}, ${ir(t.z)})`;
				let e = t;
				return `ivec3(${ir(e[0])}, ${ir(e[1])}, ${ir(e[2])})`;
			}
			case "vec3": {
				if (t instanceof z) return `vec3(${X(t.x)}, ${X(t.y)}, ${X(t.z)})`;
				let e = t;
				return `vec3(${X(e[0])}, ${X(e[1])}, ${X(e[2])})`;
			}
			case "bvec4": {
				let e = t;
				return `bvec4(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
			}
			case "uvec4": {
				if (t instanceof V) return `uvec4(${ar(t.x)}, ${ar(t.y)}, ${ar(t.z)}, ${ar(t.w)})`;
				let e = t;
				return `uvec4(${ar(e[0])}, ${ar(e[1])}, ${ar(e[2])}, ${ar(e[3])})`;
			}
			case "ivec4": {
				if (t instanceof V) return `ivec4(${ir(t.x)}, ${ir(t.y)}, ${ir(t.z)}, ${ir(t.w)})`;
				let e = t;
				return `ivec4(${ir(e[0])}, ${ir(e[1])}, ${ir(e[2])}, ${ir(e[3])})`;
			}
			case "vec4": {
				if (t instanceof V || t instanceof U) return `vec4(${X(t.x)}, ${X(t.y)}, ${X(t.z)}, ${X(t.w)})`;
				let e = t;
				return `vec4(${X(e[0])}, ${X(e[1])}, ${X(e[2])}, ${X(e[3])})`;
			}
			case "mat2":
			case "mat2x2": {
				let n = t, r = n instanceof De ? n.elements : t;
				return `${e}(${[
					,
					,
					,
					,
				].fill(0).map((e, t) => X(r[t])).join(", ")})`;
			}
			case "mat2x3": {
				let n = t;
				return `${e}(${[
					,
					,
					,
					,
					,
					,
				].fill(0).map((e, t) => X(n[t])).join(", ")})`;
			}
			case "mat2x4": {
				let n = t;
				return `${e}(${Array(8).fill(0).map((e, t) => X(n[t])).join(", ")})`;
			}
			case "mat3":
			case "mat3x3": {
				let n = t, r = n instanceof Ne ? n.elements : t;
				return `${e}(${Array(9).fill(0).map((e, t) => X(r[t])).join(", ")})`;
			}
			case "mat3x2": {
				let n = t;
				return `${e}(${[
					,
					,
					,
					,
					,
					,
				].fill(0).map((e, t) => X(n[t])).join(", ")})`;
			}
			case "mat3x4": {
				let n = t;
				return `${e}(${Array(12).fill(0).map((e, t) => X(n[t])).join(", ")})`;
			}
			case "mat4":
			case "mat4x4": {
				let n = t, r = n instanceof se ? n.elements : t;
				return `${e}(${Array(16).fill(0).map((e, t) => X(r[t])).join(", ")})`;
			}
			case "mat4x2": {
				let n = t;
				return `${e}(${Array(8).fill(0).map((e, t) => X(n[t])).join(", ")})`;
			}
			case "mat4x3": {
				let n = t;
				return `${e}(${Array(12).fill(0).map((e, t) => X(n[t])).join(", ")})`;
			}
			default: throw Error(`Type not implemented: ${String(e)}`);
		}
	}
};
function dr(e, t) {
	return new ur(e, t);
}
function fr(e) {
	let t = String(e);
	if (qn(e)) return `${t}(false)`;
	if (Qn(e)) return `${t}(0.0)`;
	if (Jn(e)) return `${t}(0)`;
	if (Yn(e)) return `${t}(0u)`;
	throw Error(`Type not implemented: ${t}`);
}
var pr = "    ", mr = class {
	constructor({ indent: e } = {}) {
		this.globals = /* @__PURE__ */ new Set(), this.statements = [], this.uniforms = {}, this.declares = /* @__PURE__ */ new Set(), this.updaters = [], this.sequence = 0, this.indent = pr, this.indent = e ?? pr;
	}
	nextSequence() {
		return this.sequence++;
	}
}, hr = class {
	constructor({ inTypes: e, outTypes: t, inputs: n, update: r, globals: i, statements: a, generate: o }) {
		this.inTypes = e ?? {}, this.outTypes = t ?? {}, this.inputs = n ?? {}, this.update = r, this.globals = i, this.statements = a, this.generate = o ?? (({ inputs: e, outputs: t, compile: n }) => ({
			globals: this.globals?.call(this, {
				inputs: e,
				outputs: t,
				compile: n
			}),
			statements: this.statements?.call(this, {
				inputs: e,
				outputs: t,
				compile: n
			})
		}));
	}
	get outputs() {
		let e = {};
		for (let t in this.outTypes) e[t] = new cr(this, t);
		return e;
	}
	apply(e) {
		return Object.assign(this.inputs, e), this.outputs;
	}
	compile({ inputs: e, outputs: t, compile: n }) {
		let r = [`// ${this.constructor.name}(${Object.values(e).join(", ")}) => (${Object.values(t).join(", ")})`], i = [];
		for (let e in t) {
			let r = t[e];
			r && !n.declares.has(r) && (n.declares.add(r), i.push(e));
		}
		let { globals: a, statements: o, uniforms: s } = this.generate({
			inputs: e,
			outputs: t,
			compile: n
		});
		for (let e of a ?? []) n.globals.add(e);
		for (let e in s) n.uniforms[e] = s[e];
		this.update && n.updaters.push(this.update);
		for (let e of i) {
			let i = t[e];
			i && (n.uniforms[i] || r.push(`${yr(i, this.outTypes[e])};`));
		}
		return o?.length && (r.push("{"), r.push(...o.map((e) => n.indent + e)), r.push("}")), r;
	}
}, gr = class extends hr {
	constructor({ inTypes: e, outTypes: t, inputs: n, update: r, globals: i, construct: a }) {
		super({
			inTypes: e,
			outTypes: t,
			inputs: n,
			update: r,
			globals: i,
			generate: (e) => this.generateBlock(e)
		}), this.construct = a;
	}
	generateBlock({ inputs: e, outputs: t, compile: n }) {
		let r = {}, i = {};
		for (let t in e) e[t] != null && (r[t] = new lr(this.inTypes[t], e[t]));
		for (let e in t) t[e] != null && (i[e] = new sr(this.outTypes[e]));
		let a = { roots: [] }, o = this.construct(r, i, a);
		for (let r of this.globals?.call(this, {
			inputs: e,
			outputs: t,
			compile: n
		}) ?? []) n.globals.add(r);
		let s = [], c = /* @__PURE__ */ new Map();
		function l(e, t, r) {
			let i = c.get(e);
			if (!i) {
				i = {
					sequence: n.nextSequence(),
					outNames: /* @__PURE__ */ new Map(),
					newOuts: /* @__PURE__ */ new Set()
				}, c.set(e, i);
				for (let t in e.inputs) {
					let n = e.inputs[t];
					for (; n;) {
						if (n instanceof sr) {
							n instanceof cr && l(n.dyno, n.key);
							break;
						}
						n = n.dynoOut();
					}
				}
				s.push(e);
			}
			t && (r || i.newOuts.add(t), i.outNames.set(t, r ?? `${t}_${i.sequence}`));
		}
		for (let e of a.roots) l(e);
		for (let e in i) {
			let n = o?.[e] ?? i[e];
			for (; n;) {
				if (n instanceof sr) {
					n instanceof cr && l(n.dyno, n.key, t[e]);
					break;
				}
				n = n.dynoOut();
			}
			i[e] = n;
		}
		let u = [];
		for (let e of s) {
			let t = {}, r = {};
			for (let n in e.inputs) {
				let r = e.inputs[n];
				for (; r;) {
					if (r instanceof sr) {
						if (r instanceof lr) t[n] = r.getLiteral();
						else if (r instanceof cr) {
							let e = c.get(r.dyno)?.outNames.get(r.key);
							if (!e) throw Error(`Source not found for ${r.dyno.constructor.name}.${r.key}`);
							t[n] = e;
						}
						break;
					}
					r = r.dynoOut();
				}
			}
			let i = c.get(e) ?? { outNames: /* @__PURE__ */ new Map() };
			for (let [e, t] of i.outNames.entries()) r[e] = t;
			let a = e.compile({
				inputs: t,
				outputs: r,
				compile: n
			});
			u.push(a);
		}
		let d = [];
		for (let e in t) i[e] instanceof lr && d.push(`${t[e]} = ${i[e].getLiteral()};`);
		return d.length > 0 && u.push(d), { statements: u.flatMap((e, t) => t === 0 ? e : ["", ...e]) };
	}
};
function _r(e, t, n, { update: r, globals: i } = {}) {
	return new gr({
		inTypes: e,
		outTypes: t,
		construct: n,
		update: r,
		globals: i
	});
}
function vr({ inTypes: e, outTypes: t, inputs: n, update: r, globals: i, statements: a, generate: o }) {
	return new hr({
		inTypes: e,
		outTypes: t,
		inputs: n,
		update: r,
		globals: i,
		statements: a,
		generate: o
	});
}
function yr(e, t, n) {
	let r = typeof t == "string" ? t : t.type;
	if (!r) throw Error(`Invalid DynoType: ${String(t)}`);
	return `${r} ${e}${n == null ? "" : `[${n}]`}`;
}
function br(e) {
	let t = !1, n = e.split("\n").map((e) => {
		let n = e.trimEnd();
		return t ? n : n.length > 0 ? (t = !0, n) : null;
	}).filter((e) => e != null);
	for (; n.length > 0 && n[n.length - 1].length === 0;) n.pop();
	if (n.length === 0) return [];
	let r = n[0].match(/^\s*/)?.[0];
	if (!r) return n;
	let i = RegExp(`^${r}`);
	return n.map((e) => e.replace(i, ""));
}
function xr(e) {
	return br(e).join("\n");
}
var Sr = class extends hr {
	constructor({ a: e, outKey: t, outTypeFunc: n }) {
		let r = { a: or(e) }, i = n(or(e));
		super({
			inTypes: r,
			outTypes: { [t]: i },
			inputs: { a: e }
		}), this.outKey = t;
	}
	dynoOut() {
		return new cr(this, this.outKey);
	}
}, Cr = class extends hr {
	constructor({ a: e, b: t, outKey: n, outTypeFunc: r }) {
		let i = {
			a: or(e),
			b: or(t)
		}, a = r(or(e), or(t));
		super({
			inTypes: i,
			outTypes: { [n]: a },
			inputs: {
				a: e,
				b: t
			}
		}), this.outKey = n;
	}
	dynoOut() {
		return new cr(this, this.outKey);
	}
}, wr = { type: "Gsplat" }, Tr = { type: "PackedSplats" }, Er = (e, t) => new Pr({
	packedSplats: e,
	index: t
}), Dr = (e, t, n, r) => new Fr({
	packedSplats: e,
	index: t,
	base: n,
	count: r
}), Or = (e) => new Ir({ gsplat: e }), kr = ({ gsplat: e, flags: t, index: n, center: r, scales: i, quaternion: a, rgba: o, rgb: s, opacity: c, x: l, y: u, z: d, r: f, g: p, b: m }) => new Lr({
	gsplat: e,
	flags: t,
	index: n,
	center: r,
	scales: i,
	quaternion: a,
	rgba: o,
	rgb: s,
	opacity: c,
	x: l,
	y: u,
	z: d,
	r: f,
	g: p,
	b: m
}), Ar = (e, { scale: t, rotate: n, translate: r, recolor: i }) => new Rr({
	gsplat: e,
	scale: t,
	rotate: n,
	translate: r,
	recolor: i
}), jr = xr("\n  struct Gsplat {\n    vec3 center;\n    uint flags;\n    vec3 scales;\n    int index;\n    vec4 quaternion;\n    vec4 rgba;\n  };\n  const uint GSPLAT_FLAG_ACTIVE = 1u << 0u;\n\n  bool isGsplatActive(uint flags) {\n    return (flags & GSPLAT_FLAG_ACTIVE) != 0u;\n  }\n"), Mr = xr("\n  struct PackedSplats {\n    usampler2DArray texture;\n    int numSplats;\n    vec4 rgbMinMaxLnScaleMinMax;\n  };\n"), Nr = xr("\n  bool readPackedSplat(usampler2DArray texture, int numSplats, vec4 rgbMinMaxLnScaleMinMax, int index, out Gsplat gsplat) {\n    if ((index >= 0) && (index < numSplats)) {\n      uvec4 packed = texelFetch(texture, splatTexCoord(index), 0);\n      unpackSplatEncoding(packed, gsplat.center, gsplat.scales, gsplat.quaternion, gsplat.rgba, rgbMinMaxLnScaleMinMax);\n      return true;\n    } else {\n      return false;\n    }\n  }\n"), Pr = class extends hr {
	constructor({ packedSplats: e, index: t }) {
		super({
			inTypes: {
				packedSplats: Tr,
				index: "int"
			},
			outTypes: { gsplat: wr },
			inputs: {
				packedSplats: e,
				index: t
			},
			globals: () => [
				jr,
				Mr,
				Nr
			],
			statements: ({ inputs: e, outputs: t }) => {
				let { gsplat: n } = t;
				if (!n) return [];
				let { packedSplats: r, index: i } = e, a;
				return a = r && i ? br(`
            if (readPackedSplat(${r}.texture, ${r}.numSplats, ${r}.rgbMinMaxLnScaleMinMax, ${i}, ${n})) {
              bool zeroSize = all(equal(${n}.scales, vec3(0.0, 0.0, 0.0)));
              ${n}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;
            } else {
              ${n}.flags = 0u;
            }
          `) : [`${n}.flags = 0u;`], a.push(`${n}.index = ${i ?? "0"};`), a;
			}
		});
	}
	dynoOut() {
		return new cr(this, "gsplat");
	}
}, Fr = class extends hr {
	constructor({ packedSplats: e, index: t, base: n, count: r }) {
		super({
			inTypes: {
				packedSplats: Tr,
				index: "int",
				base: "int",
				count: "int"
			},
			outTypes: { gsplat: wr },
			inputs: {
				packedSplats: e,
				index: t,
				base: n,
				count: r
			},
			globals: () => [
				jr,
				Mr,
				Nr
			],
			statements: ({ inputs: e, outputs: t }) => {
				let { gsplat: n } = t;
				if (!n) return [];
				let { packedSplats: r, index: i, base: a, count: o } = e, s;
				return s = r && i && a && o ? br(`
            ${n}.flags = 0u;
            if ((${i} >= ${a}) && (${i} < (${a} + ${o}))) {
              if (readPackedSplat(${r}.texture, ${r}.numSplats, ${r}.rgbMinMaxLnScaleMinMax, ${i}, ${n})) {
                bool zeroSize = all(equal(${n}.scales, vec3(0.0, 0.0, 0.0)));
                ${n}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;
              }
            }
          `) : [`${n}.flags = 0u;`], s.push(`${n}.index = ${i ?? "0"};`), s;
			}
		});
	}
	dynoOut() {
		return new cr(this, "gsplat");
	}
}, Ir = class extends hr {
	constructor({ gsplat: e }) {
		super({
			inTypes: { gsplat: wr },
			outTypes: {
				flags: "uint",
				active: "bool",
				index: "int",
				center: "vec3",
				scales: "vec3",
				quaternion: "vec4",
				rgba: "vec4",
				rgb: "vec3",
				opacity: "float",
				x: "float",
				y: "float",
				z: "float",
				r: "float",
				g: "float",
				b: "float"
			},
			inputs: { gsplat: e },
			globals: () => [jr],
			statements: ({ inputs: e, outputs: t }) => {
				let { gsplat: n } = e, { flags: r, active: i, index: a, center: o, scales: s, quaternion: c, rgba: l, rgb: u, opacity: d, x: f, y: p, z: m, r: h, g, b: _ } = t;
				return [
					r ? `${r} = ${n ? `${n}.flags` : "0u"};` : null,
					i ? `${i} = isGsplatActive(${n ? `${n}.flags` : "0u"});` : null,
					a ? `${a} = ${n ? `${n}.index` : "0"};` : null,
					o ? `${o} = ${n ? `${n}.center` : "vec3(0.0, 0.0, 0.0)"};` : null,
					s ? `${s} = ${n ? `${n}.scales` : "vec3(0.0, 0.0, 0.0)"};` : null,
					c ? `${c} = ${n ? `${n}.quaternion` : "vec4(0.0, 0.0, 0.0, 1.0)"};` : null,
					l ? `${l} = ${n ? `${n}.rgba` : "vec4(0.0, 0.0, 0.0, 0.0)"};` : null,
					u ? `${u} = ${n ? `${n}.rgba.rgb` : "vec3(0.0, 0.0, 0.0)"};` : null,
					d ? `${d} = ${n ? `${n}.rgba.a` : "0.0"};` : null,
					f ? `${f} = ${n ? `${n}.center.x` : "0.0"};` : null,
					p ? `${p} = ${n ? `${n}.center.y` : "0.0"};` : null,
					m ? `${m} = ${n ? `${n}.center.z` : "0.0"};` : null,
					h ? `${h} = ${n ? `${n}.rgba.r` : "0.0"};` : null,
					g ? `${g} = ${n ? `${n}.rgba.g` : "0.0"};` : null,
					_ ? `${_} = ${n ? `${n}.rgba.b` : "0.0"};` : null
				].filter(Boolean);
			}
		});
	}
}, Lr = class extends hr {
	constructor({ gsplat: e, flags: t, index: n, center: r, scales: i, quaternion: a, rgba: o, rgb: s, opacity: c, x: l, y: u, z: d, r: f, g: p, b: m }) {
		super({
			inTypes: {
				gsplat: wr,
				flags: "uint",
				index: "int",
				center: "vec3",
				scales: "vec3",
				quaternion: "vec4",
				rgba: "vec4",
				rgb: "vec3",
				opacity: "float",
				x: "float",
				y: "float",
				z: "float",
				r: "float",
				g: "float",
				b: "float"
			},
			outTypes: { gsplat: wr },
			inputs: {
				gsplat: e,
				flags: t,
				index: n,
				center: r,
				scales: i,
				quaternion: a,
				rgba: o,
				rgb: s,
				opacity: c,
				x: l,
				y: u,
				z: d,
				r: f,
				g: p,
				b: m
			},
			globals: () => [jr],
			statements: ({ inputs: e, outputs: t }) => {
				let { gsplat: n } = t;
				if (!n) return [];
				let { gsplat: r, flags: i, index: a, center: o, scales: s, quaternion: c, rgba: l, rgb: u, opacity: d, x: f, y: p, z: m, r: h, g, b: _ } = e;
				return [
					`${n}.flags = ${i ?? (r ? `${r}.flags` : "0u")};`,
					`${n}.index = ${a ?? (r ? `${r}.index` : "0")};`,
					`${n}.center = ${o ?? (r ? `${r}.center` : "vec3(0.0, 0.0, 0.0)")};`,
					`${n}.scales = ${s ?? (r ? `${r}.scales` : "vec3(0.0, 0.0, 0.0)")};`,
					`${n}.quaternion = ${c ?? (r ? `${r}.quaternion` : "vec4(0.0, 0.0, 0.0, 1.0)")};`,
					`${n}.rgba = ${l ?? (r ? `${r}.rgba` : "vec4(0.0, 0.0, 0.0, 0.0)")};`,
					u ? `${n}.rgba.rgb = ${u};` : null,
					d ? `${n}.rgba.a = ${d};` : null,
					f ? `${n}.center.x = ${f};` : null,
					p ? `${n}.center.y = ${p};` : null,
					m ? `${n}.center.z = ${m};` : null,
					h ? `${n}.rgba.r = ${h};` : null,
					g ? `${n}.rgba.g = ${g};` : null,
					_ ? `${n}.rgba.b = ${_};` : null
				].filter(Boolean);
			}
		});
	}
	dynoOut() {
		return new cr(this, "gsplat");
	}
};
xr("\n  vec3 gsplatNormal(vec3 scales, vec4 quaternion) {\n    float minScale = min(scales.x, min(scales.y, scales.z));\n    vec3 normal;\n    if (scales.z == minScale) {\n      normal = vec3(0.0, 0.0, 1.0);\n    } else if (scales.y == minScale) {\n      normal = vec3(0.0, 1.0, 0.0);\n    } else {\n      normal = vec3(1.0, 0.0, 0.0);\n    }\n    return quatVec(quaternion, normal);\n  }\n");
var Rr = class extends hr {
	constructor({ gsplat: e, scale: t, rotate: n, translate: r, recolor: i }) {
		super({
			inTypes: {
				gsplat: wr,
				scale: "float",
				rotate: "vec4",
				translate: "vec3",
				recolor: "vec4"
			},
			outTypes: { gsplat: wr },
			inputs: {
				gsplat: e,
				scale: t,
				rotate: n,
				translate: r,
				recolor: i
			},
			globals: () => [jr],
			statements: ({ inputs: e, outputs: t, compile: n }) => {
				let { gsplat: r } = t;
				if (!r || !e.gsplat) return [];
				let { scale: i, rotate: a, translate: o, recolor: s } = e, c = n.indent;
				return [
					`${r} = ${e.gsplat};`,
					`if (isGsplatActive(${r}.flags)) {`,
					i ? `${c}${r}.center *= ${i};` : null,
					a ? `${c}${r}.center = quatVec(${a}, ${r}.center);` : null,
					o ? `${c}${r}.center += ${o};` : null,
					i ? `${c}${r}.scales *= ${i};` : null,
					a ? `${c}${r}.quaternion = quatQuat(${a}, ${r}.quaternion);` : null,
					s ? `${c}${r}.rgba *= ${s};` : null,
					"}"
				].filter(Boolean);
			}
		});
	}
	dynoOut() {
		return new cr(this, "gsplat");
	}
}, zr = (e, t) => new Br({
	gsplat: e,
	rgbMinMaxLnScaleMinMax: t
}), Br = class extends hr {
	constructor({ gsplat: e, rgbMinMaxLnScaleMinMax: t }) {
		super({
			inTypes: {
				gsplat: wr,
				rgbMinMaxLnScaleMinMax: "vec4"
			},
			inputs: {
				gsplat: e,
				rgbMinMaxLnScaleMinMax: t
			},
			globals: () => [jr],
			statements: ({ inputs: e, outputs: t }) => {
				let { output: n } = t;
				if (!n) return [];
				let { gsplat: r, rgbMinMaxLnScaleMinMax: i } = e;
				return r ? br(`
            if (isGsplatActive(${r}.flags)) {
              ${n} = packSplatEncoding(${r}.center, ${r}.scales, ${r}.quaternion, ${r}.rgba, ${i});
            } else {
              ${n} = uvec4(0u, 0u, 0u, 0u);
            }
          `) : [`${n} = uvec4(0u, 0u, 0u, 0u);`];
			}
		});
	}
	dynoOut() {
		return new cr(this, "output");
	}
}, Vr = class extends hr {
	constructor({ rgba8: e }) {
		super({
			inTypes: { rgba8: "vec4" },
			inputs: { rgba8: e },
			statements: ({ inputs: e, outputs: t }) => [`target = ${e.rgba8 ?? "vec4(0.0, 0.0, 0.0, 0.0)"};`]
		});
	}
	dynoOut() {
		return new cr(this, "rgba8");
	}
}, Hr = class extends hr {
	constructor({ key: e, type: t, count: n, value: r, update: i, globals: a }) {
		e ??= "value", super({
			outTypes: { [e]: t },
			update: () => {
				if (i) {
					let e = i(this.value);
					e !== void 0 && (this.value = e);
				}
				this.uniform.value = this.value;
			},
			generate: ({ inputs: r, outputs: i }) => {
				let o = a?.({
					inputs: r,
					outputs: i
				}) ?? [], s = {}, c = i[e];
				return c && (o.push(`uniform ${yr(c, t, n)};`), s[c] = this.uniform), {
					globals: o,
					uniforms: s
				};
			}
		}), this.type = t, this.count = n, this.value = r, this.uniform = { value: r }, this.outKey = e;
	}
	dynoOut() {
		return new cr(this, this.outKey);
	}
}, Ur = class extends Hr {
	constructor({ key: e, value: t, update: n }) {
		super({
			key: e,
			type: "bool",
			value: t,
			update: n
		});
	}
}, Wr = class extends Hr {
	constructor({ key: e, value: t, update: n }) {
		super({
			key: e,
			type: "int",
			value: t,
			update: n
		});
	}
}, Gr = class extends Hr {
	constructor({ key: e, value: t, update: n }) {
		super({
			key: e,
			type: "float",
			value: t,
			update: n
		});
	}
}, Kr = class extends Hr {
	constructor({ key: e, value: t, update: n }) {
		super({
			key: e,
			type: "vec2",
			value: t,
			update: n
		});
	}
}, qr = class extends Hr {
	constructor({ key: e, value: t, update: n }) {
		super({
			key: e,
			type: "vec3",
			value: t,
			update: n
		});
	}
}, Jr = class extends Hr {
	constructor({ key: e, value: t, update: n }) {
		super({
			key: e,
			type: "vec4",
			value: t,
			update: n
		});
	}
}, Yr = class extends Hr {
	constructor({ key: e, value: t, update: n }) {
		super({
			key: e,
			type: "usampler2DArray",
			value: t,
			update: n
		});
	}
}, Xr = /* @__PURE__ */ new Float32Array(1), Zr = new Uint32Array(Xr.buffer), Qr = "Float16Array" in globalThis, $r = Qr ? new globalThis.Float16Array(1) : null, ei = new Uint16Array($r?.buffer), ti = Qr ? ri : ii, ni = Qr ? ai : oi;
function ri(e) {
	return $r[0] = e, ei[0];
}
function ii(e) {
	Xr[0] = e;
	let t = Zr[0], n = t >> 31 & 1, r = t >> 23 & 255, i = t & 8388607, a = n << 15;
	if (r === 255) return i === 0 ? a | 31744 : a | 32767;
	let o = r - 127 + 15;
	if (o >= 31) return a | 31744;
	if (o <= 0) return o < -10 ? a : a | (i | 8388608) >> 1 - o + 13;
	let s = i >> 13;
	return a | o << 10 | s;
}
function ai(e) {
	return ei[0] = e, $r[0];
}
function oi(e) {
	let t = e >> 15 & 1, n = e >> 10 & 31, r = e & 1023, i;
	if (n === 0) {
		if (r === 0) i = t << 31;
		else {
			let e = r, n = -14;
			for (; !(e & 1024);) e <<= 1, n--;
			e &= 1023;
			let a = n + 127, o = e << 13;
			i = t << 31 | a << 23 | o;
		}
	} else if (n === 31) i = r === 0 ? t << 31 | 2139095040 : t << 31 | 2143289344;
	else {
		let e = n - 15 + 127, a = r << 13;
		i = t << 31 | e << 23 | a;
	}
	return Zr[0] = i, Xr[0];
}
function si(e) {
	return Math.max(0, Math.min(255, Math.round(e * 255)));
}
function ci(e) {
	let t = [], n = /* @__PURE__ */ new Set();
	function r(e) {
		e && typeof e == "object" && !n.has(e) && (n.add(e), e instanceof ArrayBuffer ? t.push(e) : ArrayBuffer.isView(e) ? t.push(e.buffer) : Array.isArray(e) ? e.forEach(r) : Object.values(e).forEach(r));
	}
	return r(e), t;
}
var li = class {
	constructor({ allocate: e, dispose: t, valid: n }) {
		this.items = [], this.allocate = e, this.dispose = t, this.valid = n;
	}
	alloc(e) {
		for (;;) {
			let t = this.items.pop();
			if (!t) break;
			if (this.valid(t, e)) return t;
			this.dispose && this.dispose(t);
		}
		return this.allocate(e);
	}
	free(e) {
		this.items.push(e);
	}
	disposeAll() {
		let e;
		for (e = this.items.pop(); e;) this.dispose && this.dispose(e), e = this.items.pop();
	}
};
function ui(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
	let _ = g?.rgbMin ?? 0, v = (g?.rgbMax ?? 1) - _, y = si((p - _) / v), b = si((m - _) / v), x = si((h - _) / v), S = si(f), C = Ci(di.set(c, l, u, d)), w = C & 255, T = C >>> 8 & 255, E = C >>> 16 & 255, D = g?.lnScaleMin ?? -12, O = 254 / ((g?.lnScaleMax ?? 9) - D), k = a < Wn ? 0 : Math.min(255, Math.max(1, Math.round((Math.log(a) - D) * O) + 1)), A = o < Wn ? 0 : Math.min(255, Math.max(1, Math.round((Math.log(o) - D) * O) + 1)), j = s < Wn ? 0 : Math.min(255, Math.max(1, Math.round((Math.log(s) - D) * O) + 1)), M = ti(n), N = ti(r), P = ti(i), F = t * 4;
	e[F] = y | b << 8 | x << 16 | S << 24, e[F + 1] = M | N << 16, e[F + 2] = P | w << 16 | T << 24, e[F + 3] = k | A << 8 | j << 16 | E << 24;
}
var di = new U(), fi = {
	center: new z(),
	scales: new z(),
	quaternion: new U(),
	color: new f(),
	opacity: 0
};
function pi(e, t, n) {
	let r = fi, i = t * 4, a = e[i], o = e[i + 1], s = e[i + 2], c = e[i + 3], l = n?.rgbMin ?? 0, u = (n?.rgbMax ?? 1) - l;
	r.color.set(l + (a & 255) / 255 * u, l + (a >>> 8 & 255) / 255 * u, l + (a >>> 16 & 255) / 255 * u), r.opacity = (a >>> 24 & 255) / 255, r.center.set(ni(o & 65535), ni(o >>> 16 & 65535), ni(s & 65535));
	let d = n?.lnScaleMin ?? -12, f = ((n?.lnScaleMax ?? 9) - d) / 254, p = c & 255;
	r.scales.x = p === 0 ? 0 : Math.exp(d + (p - 1) * f);
	let m = c >>> 8 & 255;
	r.scales.y = m === 0 ? 0 : Math.exp(d + (m - 1) * f);
	let h = c >>> 16 & 255;
	return r.scales.z = h === 0 ? 0 : Math.exp(d + (h - 1) * f), wi(s >>> 16 & 65535 | c >>> 8 & 16711680, r.quaternion), r;
}
function mi(e) {
	let t = Y, n = Math.max(Kn, Math.min(Gn, Math.ceil(e / t))), r = Math.ceil(e / (t * n));
	return {
		width: t,
		height: n,
		depth: r,
		maxSplats: t * n * r
	};
}
function hi(e) {
	let t = new L(e.autoStart);
	return t.startTime = e.startTime, t.oldTime = e.oldTime, t.elapsedTime = e.elapsedTime, t.running = e.running, t;
}
var gi = xr("\n  precision highp float;\n\n  in vec3 position;\n\n  void main() {\n    gl_Position = vec4(position.xy, 0.0, 1.0);\n  }\n");
function _i(e) {
	let t = new z();
	for (let n of e) t.add(n);
	return t.divideScalar(e.length);
}
function vi(e) {
	if (e.length === 0) return new U();
	let t = e[0].clone();
	for (let n = 1; n < e.length; n++) e[n].dot(e[0]) < 0 ? (t.x -= e[n].x, t.y -= e[n].y, t.z -= e[n].z, t.w -= e[n].w) : (t.x += e[n].x, t.y += e[n].y, t.z += e[n].z, t.w += e[n].w);
	return t.normalize();
}
function yi(e, t) {
	let [n, r] = [new z(), new U()], [i, a] = [new z(), new U()];
	return e.decompose(n, r, new z()), t.decompose(i, a, new z()), {
		distance: n.distanceTo(i),
		coorient: Math.abs(r.dot(a))
	};
}
function bi({ matrix1: e, matrix2: t, maxDistance: n, minCoorient: r }) {
	let { distance: i, coorient: a } = yi(e, t);
	return i <= n && (r == null || a >= r);
}
var xi = new U(), Si = new z();
function Ci(e) {
	let t = xi.copy(e).normalize();
	t.w < 0 && t.set(-t.x, -t.y, -t.z, -t.w);
	let n = 2 * Math.acos(t.w), r = Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z), i = r < 1e-6 ? Si.set(1, 0, 0) : Si.set(t.x, t.y, t.z).divideScalar(r), a = Math.abs(i.x) + Math.abs(i.y) + Math.abs(i.z), o = i.x / a, s = i.y / a;
	if (i.z < 0) {
		let e = o;
		o = (1 - Math.abs(s)) * (o >= 0 ? 1 : -1), s = (1 - Math.abs(e)) * (s >= 0 ? 1 : -1);
	}
	let c = o * .5 + .5, l = s * .5 + .5, u = Math.round(c * 255), d = Math.round(l * 255);
	return Math.round(255 / Math.PI * n) << 16 | d << 8 | u;
}
function wi(e, t) {
	let n = e & 255, r = e >>> 8 & 255, i = e >>> 16 & 255, a = n / 255, o = r / 255, s = (a - .5) * 2, c = (o - .5) * 2, l = 1 - (Math.abs(s) + Math.abs(c)), u = Math.max(-l, 0);
	s += s >= 0 ? -u : u, c += c >= 0 ? -u : u;
	let d = Si.set(s, c, l).normalize(), f = i / 255 * Math.PI * .5, p = Math.sin(f), m = Math.cos(f);
	return t.set(d.x * p, d.y * p, d.z * p, m), t;
}
function Ti(e, t) {
	let n = [], r = 0, i = null, a = new En((e, a) => {
		if (n.push(e), r += e.length, a || r >= t) {
			let e = new Uint8Array(r), a = 0;
			for (let t of n) e.set(t, a), a += t.length;
			i = e.slice(0, t);
		}
	}), o = 1024, s = 0;
	for (; i == null && s < e.length;) {
		let t = e.slice(s, s + o);
		a.push(t, !1), s += o;
	}
	if (i == null && (a.push(/* @__PURE__ */ new Uint8Array(), !0), i == null)) throw Error("Failed to decompress partial gzip");
	return i;
}
var Ei = class {
	constructor({ graph: e, inputs: t, outputs: n, template: r }) {
		this.graph = e, this.template = r, this.inputs = t ?? {}, this.outputs = n ?? {};
		let i = new mr({ indent: this.template.indent });
		for (let e in this.outputs) this.outputs[e] && i.declares.add(this.outputs[e]);
		let a = e.compile({
			inputs: this.inputs,
			outputs: this.outputs,
			compile: i
		});
		this.shader = r.generate({
			globals: i.globals,
			statements: a
		}), this.uniforms = i.uniforms, this.updaters = i.updaters;
	}
	prepareMaterial() {
		return ki(this);
	}
	update() {
		for (let e of this.updaters) e();
	}
}, Di = class {
	constructor(e) {
		let t = e.match(/^([ \t]*)\{\{\s*GLOBALS\s*\}\}/m), n = e.match(/^([ \t]*)\{\{\s*STATEMENTS\s*\}\}/m);
		if (!t || !n) throw Error("Template must contain {{ GLOBALS }} and {{ STATEMENTS }}");
		this.before = e.substring(0, t.index), this.between = e.substring(t.index + t[0].length, n.index), this.after = e.substring(n.index + n[0].length), this.indent = n[1];
	}
	generate({ globals: e, statements: t }) {
		return this.before + Array.from(e).join("\n\n") + this.between + t.map((e) => this.indent + e).join("\n") + this.after;
	}
}, Oi = /* @__PURE__ */ new Map();
function ki(e) {
	let t = Oi.get(e);
	return t || (t = new Be({
		glslVersion: o,
		vertexShader: gi,
		fragmentShader: e.shader,
		uniforms: e.uniforms
	}), Oi.set(e, t), t);
}
function Ai(e, t, n = "add") {
	let r = () => {
		throw Error(`Invalid ${n} types: ${e}, ${t}`);
	};
	if (e === t) return e;
	if (e === "int") {
		if (Jn(t)) return t;
		r();
	}
	if (t === "int") {
		if (Jn(e)) return e;
		r();
	}
	if (e === "uint") {
		if (Yn(t)) return t;
		r();
	}
	if (t === "uint") {
		if (Yn(e)) return e;
		r();
	}
	if (e === "float") {
		if (Qn(t)) return t;
		r();
	}
	if (t === "float") {
		if (Qn(e)) return e;
		r();
	}
	throw Error(`Invalid ${n} types: ${e}, ${t}`);
}
function ji(e, t) {
	return Ai(e, t, "sub");
}
function Mi(e, t) {
	let n = () => {
		throw Error(`Invalid mul types: ${e}, ${t}`);
	}, r = (e) => e;
	if (e === "int") {
		if (Jn(t)) return r(t);
		n();
	}
	if (t === "int") {
		if (Jn(e)) return r(e);
		n();
	}
	if (e === "uint") {
		if (Yn(t)) return r(t);
		n();
	}
	if (t === "uint") {
		if (Yn(e)) return r(e);
		n();
	}
	if (e === "float") {
		if (Qn(t)) return r(t);
		n();
	}
	if (t === "float") {
		if (Qn(e)) return r(e);
		n();
	}
	if (Jn(e) || Yn(e) || Jn(t) || Yn(t)) {
		if (e === t) return r(e);
		n();
	}
	if (e === "vec2") {
		if (t === "vec2" || $n(t)) return r("vec2");
		if (t === "mat3x2") return r("vec3");
		if (t === "mat4x2") return r("vec4");
		n();
	}
	if (e === "vec3") {
		if (t === "mat2x3") return r("vec2");
		if (t === "vec3" || er(t)) return r("vec3");
		if (t === "mat4x3") return r("vec4");
		n();
	}
	if (e === "vec4") {
		if (t === "mat2x4") return r("vec2");
		if (t === "mat3x4") return r("vec3");
		if (t === "vec4" || tr(t)) return r("vec4");
		n();
	}
	if (t === "vec2") {
		if ($n(e)) return r("vec2");
		if (e === "mat2x3") return r("vec3");
		if (e === "mat2x4") return r("vec4");
		n();
	}
	if (t === "vec3") {
		if (e === "mat3x2") return r("vec2");
		if (er(e)) return r("vec3");
		if (e === "mat3x4") return r("vec4");
		n();
	}
	if (t === "vec4") {
		if (e === "mat4x2") return r("vec2");
		if (e === "mat4x3") return r("vec3");
		if (tr(e)) return r("vec4");
		n();
	}
	if ($n(e)) {
		if ($n(t)) return r("mat2");
		if (t === "mat3x2") return r("mat3x2");
		if (t === "mat4x2") return r("mat4x2");
		n();
	}
	if (e === "mat2x3") {
		if ($n(t)) return r("mat2x3");
		if (t === "mat3x2") return r("mat3");
		if (t === "mat4x2") return r("mat4x3");
		n();
	}
	if (e === "mat2x4") {
		if ($n(t)) return r("mat2x4");
		if (t === "mat3x2") return r("mat3x4");
		if (t === "mat4x2") return r("mat4");
		n();
	}
	if (e === "mat3x2") {
		if (t === "mat2x3") return r("mat2");
		if (er(t)) return r("mat3x2");
		if (t === "mat4x3") return r("mat4x2");
		n();
	}
	if (er(e)) {
		if (t === "mat2x3") return r("mat2x3");
		if (er(t)) return r("mat3");
		if (t === "mat4x3") return r("mat4x3");
		n();
	}
	if (e === "mat3x4") {
		if (t === "mat2x3") return r("mat2x4");
		if (er(t)) return r("mat3x4");
		if (t === "mat4x3") return r("mat4");
		n();
	}
	if (e === "mat4x2") {
		if (t === "mat2x4") return r("mat2");
		if (t === "mat3x4") return r("mat3x2");
		if (tr(t)) return r("mat4x2");
		n();
	}
	if (e === "mat4x3") {
		if (t === "mat2x4") return r("mat2x3");
		if (t === "mat3x4") return r("mat3");
		if (tr(t)) return r("mat4x3");
		n();
	}
	if (tr(e)) {
		if (t === "mat2x4") return r("mat2x4");
		if (t === "mat3x4") return r("mat3x4");
		if (tr(t)) return r("mat4");
		n();
	}
	throw Error(`Invalid mul types: ${e}, ${t}`);
}
var Ni = (e, t) => new Ii({
	a: e,
	b: t
}), Pi = (e, t) => new Li({
	a: e,
	b: t
}), Fi = (e, t) => new Ri({
	a: e,
	b: t
}), Ii = class extends Cr {
	constructor({ a: e, b: t }) {
		super({
			a: e,
			b: t,
			outKey: "sum",
			outTypeFunc: Ai
		}), this.statements = ({ inputs: e, outputs: t }) => [`${t.sum} = ${e.a} + ${e.b};`];
	}
}, Li = class extends Cr {
	constructor({ a: e, b: t }) {
		super({
			a: e,
			b: t,
			outKey: "difference",
			outTypeFunc: ji
		}), this.statements = ({ inputs: e, outputs: t }) => [`${t.difference} = ${e.a} - ${e.b};`];
	}
}, Ri = class extends Cr {
	constructor({ a: e, b: t }) {
		super({
			a: e,
			b: t,
			outKey: "product",
			outTypeFunc: Mi
		}), this.statements = ({ inputs: e, outputs: t }) => [`${t.product} = ${e.a} * ${e.b};`];
	}
}, zi = (e) => new Hi({ value: e }), Bi = (e) => new Ui({ value: e }), Vi = (e) => new Wi({ value: e }), Hi = class extends Sr {
	constructor({ value: e }) {
		super({
			a: e,
			outKey: "uint",
			outTypeFunc: () => "uint"
		}), this.statements = ({ inputs: e, outputs: t }) => [`${t.uint} = floatBitsToUint(${e.a});`];
	}
}, Ui = class extends Sr {
	constructor({ value: e }) {
		super({
			a: e,
			outKey: "uint",
			outTypeFunc: () => "uint"
		}), this.statements = ({ inputs: e, outputs: t }) => [`${t.uint} = packHalf2x16(${e.a});`];
	}
}, Wi = class extends Sr {
	constructor({ value: e }) {
		super({
			a: e,
			outKey: "rgba8",
			outTypeFunc: () => "vec4"
		}), this.statements = ({ inputs: e, outputs: t }) => [`uvec4 uRgba = uvec4(${e.a} & 0xffu, (${e.a} >> 8u) & 0xffu, (${e.a} >> 16u) & 0xffu, (${e.a} >> 24u) & 0xffu);`, `${t.rgba8} = vec4(uRgba) / 255.0;`];
	}
}, Gi = (e) => new Yi({ a: e }), Ki = (e) => new $i({ vector: e }), qi = ({ vector: e, vectorType: t, x: n, y: r, z: i, w: a, r: o, g: s, b: c, a: l }) => new ea({
	vector: e,
	vectorType: t,
	x: n,
	y: r,
	z: i,
	w: a,
	r: o,
	g: s,
	b: c,
	a: l
}), Ji = (e, t) => new Zi({
	a: e,
	b: t
}), Yi = class extends Sr {
	constructor({ a: e }) {
		super({
			a: e,
			outTypeFunc: (e) => e,
			outKey: "normalize"
		}), this.statements = ({ inputs: e, outputs: t }) => [`${t.normalize} = normalize(${e.a});`];
	}
};
function Xi(e) {
	if (e === "float") return "vec2";
	if (e === "vec2") return "vec3";
	if (e === "vec3") return "vec4";
	throw Error("Invalid type");
}
var Zi = class extends Cr {
	constructor({ a: e, b: t }) {
		let n = Xi(or(e));
		super({
			a: e,
			b: t,
			outKey: "extend",
			outTypeFunc: () => n
		}), this.statements = ({ inputs: e, outputs: t }) => [`${t.extend} = ${n}(${e.a}, ${e.b});`];
	}
};
function Qi(e) {
	let t = (e) => e;
	switch (e) {
		case "vec2": return t({
			x: "float",
			y: "float",
			r: "float",
			g: "float"
		});
		case "vec3": return t({
			x: "float",
			y: "float",
			z: "float",
			r: "float",
			g: "float",
			b: "float"
		});
		case "vec4": return t({
			x: "float",
			y: "float",
			z: "float",
			w: "float",
			r: "float",
			g: "float",
			b: "float",
			a: "float"
		});
		case "ivec2": return t({
			x: "int",
			y: "int",
			r: "int",
			g: "int"
		});
		case "ivec3": return t({
			x: "int",
			y: "int",
			z: "int",
			r: "int",
			g: "int",
			b: "int"
		});
		case "ivec4": return t({
			x: "int",
			y: "int",
			z: "int",
			w: "int",
			r: "int",
			g: "int",
			b: "int",
			a: "int"
		});
		case "uvec2": return t({
			x: "uint",
			y: "uint",
			r: "uint",
			g: "uint"
		});
		case "uvec3": return t({
			x: "uint",
			y: "uint",
			z: "uint",
			r: "uint",
			g: "uint",
			b: "uint"
		});
		case "uvec4": return t({
			x: "uint",
			y: "uint",
			z: "uint",
			w: "uint",
			r: "uint",
			g: "uint",
			b: "uint",
			a: "uint"
		});
		default: throw Error(`Invalid vector type: ${e}`);
	}
}
var $i = class extends hr {
	constructor({ vector: e }) {
		let t = { vector: or(e) }, n = Qi(t.vector);
		super({
			inTypes: t,
			outTypes: n,
			inputs: { vector: e }
		}), this.statements = ({ inputs: e, outputs: t }) => {
			let { x: n, y: r, z: i, w: a, r: o, g: s, b: c, a: l } = t, { vector: u } = e;
			return [
				n ? `${n} = ${u}.x;` : null,
				r ? `${r} = ${u}.y;` : null,
				i ? `${i} = ${u}.z;` : null,
				a ? `${a} = ${u}.w;` : null,
				o ? `${o} = ${u}.r;` : null,
				s ? `${s} = ${u}.g;` : null,
				c ? `${c} = ${u}.b;` : null,
				l ? `${l} = ${u}.a;` : null
			].filter(Boolean);
		};
	}
}, ea = class extends hr {
	constructor({ vector: e, vectorType: t, x: n, y: r, z: i, w: a, r: o, g: s, b: c, a: l }) {
		if (!e && !t) throw Error("Either vector or vectorType must be provided");
		let u = t ?? or(e), d = nr(u), f = rr(u), p = {
			vector: u,
			x: d,
			y: d,
			r: d,
			g: d
		}, m = {
			vector: e,
			x: n,
			y: r,
			r: o,
			g: s
		};
		f >= 3 && (Object.assign(p, {
			z: d,
			b: d
		}), Object.assign(m, {
			z: i,
			b: c
		})), f >= 4 && (Object.assign(p, {
			w: d,
			a: d
		}), Object.assign(m, {
			w: a,
			a: l
		})), super({
			inTypes: p,
			outTypes: { vector: u },
			inputs: m
		}), this.statements = ({ inputs: e, outputs: t }) => {
			let { vector: n } = t, { vector: r, x: i, y: a, z: o, w: s, r: c, g: l, b: u, a: p } = e, m = [`${n}.x = ${i ?? c ?? (r ? `${r}.x` : fr(d))};`, `${n}.y = ${a ?? l ?? (r ? `${r}.y` : fr(d))};`];
			return f >= 3 && m.push(`${n}.z = ${o ?? u ?? (r ? `${r}.z` : fr(d))};`), f >= 4 && m.push(`${n}.w = ${s ?? p ?? (r ? `${r}.w` : fr(d))};`), m;
		};
	}
	dynoOut() {
		return new cr(this, "vector");
	}
}, ta = (e, { scale: t, scales: n, rotate: r, translate: i }) => new ra({
	position: e,
	scale: t,
	scales: n,
	rotate: r,
	translate: i
}).outputs.position, na = (e, { scale: t, scales: n, rotate: r }) => new ia({
	dir: e,
	scale: t,
	scales: n,
	rotate: r
}).outputs.dir, ra = class extends hr {
	constructor({ position: e, scale: t, scales: n, rotate: r, translate: i }) {
		super({
			inTypes: {
				position: "vec3",
				scale: "float",
				scales: "vec3",
				rotate: "vec4",
				translate: "vec3"
			},
			outTypes: { position: "vec3" },
			inputs: {
				position: e,
				scale: t,
				scales: n,
				rotate: r,
				translate: i
			},
			statements: ({ inputs: e, outputs: t }) => {
				let { position: n } = t;
				if (!n) return [];
				let { scale: r, scales: i, rotate: a, translate: o } = e;
				return [
					`${n} = ${e.position ?? "vec3(0.0, 0.0, 0.0)"};`,
					r ? `${n} *= ${r};` : null,
					i ? `${n} *= ${i};` : null,
					a ? `${n} = quatVec(${a}, ${n});` : null,
					o ? `${n} += ${o};` : null
				].filter(Boolean);
			}
		});
	}
}, ia = class extends hr {
	constructor({ dir: e, scale: t, scales: n, rotate: r }) {
		super({
			inTypes: {
				dir: "vec3",
				scale: "float",
				scales: "vec3",
				rotate: "vec4"
			},
			outTypes: { dir: "vec3" },
			inputs: {
				dir: e,
				scale: t,
				scales: n,
				rotate: r
			},
			statements: ({ inputs: e, outputs: t }) => {
				let { dir: n } = t;
				if (!n) return [];
				let { scale: r, scales: i, rotate: a } = e;
				return [
					`${n} = ${e.dir ?? "vec3(0.0, 0.0, 0.0)"};`,
					r ? `${n} *= ${r};` : null,
					i ? `${n} *= ${i};` : null,
					a ? `${n} = quatVec(${a}, ${n});` : null
				].filter(Boolean);
			}
		});
	}
}, aa = "precision highp float;\nprecision highp int;\nprecision highp sampler2D;\nprecision highp usampler2D;\nprecision highp isampler2D;\nprecision highp sampler2DArray;\nprecision highp usampler2DArray;\nprecision highp isampler2DArray;\nprecision highp sampler3D;\nprecision highp usampler3D;\nprecision highp isampler3D;\n\n#include <splatDefines>\n\nuniform uint targetLayer;\nuniform int targetBase;\nuniform int targetCount;\n\nout vec4 target;\n\n{{ GLOBALS }}\n\nvoid computeReadback(int index) {\n    {{ STATEMENTS }}\n}\n\nvoid main() {\n    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);\n    int index = targetIndex - targetBase;\n\n    if ((index >= 0) && (index < targetCount)) {\n        computeReadback(index);\n    } else {\n        target = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}", oa = class e {
	constructor({ renderer: e } = {}) {
		this.renderer = e, this.capacity = 0, this.count = 0;
	}
	dispose() {
		this.target &&= (this.target.dispose(), void 0);
	}
	ensureBuffer(e, t) {
		let n = Math.ceil(Math.max(1, e) / Y) * Y * 4;
		if (t.byteLength >= n) return t;
		let r = new ArrayBuffer(n);
		if (t instanceof ArrayBuffer) return r;
		let i = t.constructor;
		return new i(r);
	}
	ensureCapacity(e) {
		let { width: t, height: n, depth: r, maxSplats: i } = mi(e);
		(!this.target || i > this.capacity) && (this.dispose(), this.capacity = i, this.target = new _(t, n, r, {
			depthBuffer: !1,
			stencilBuffer: !1,
			generateMipmaps: !1,
			magFilter: Ce,
			minFilter: Ce
		}), this.target.texture.format = He, this.target.texture.type = s, this.target.texture.internalFormat = "RGBA8", this.target.scissorTest = !0);
	}
	prepareProgramMaterial(t) {
		let n = e.readbackProgram.get(t);
		if (!n) {
			let r = _r({ index: "int" }, { rgba8: "vec4" }, ({ index: e }) => (t.inputs.index = e, { rgba8: new Vr({ rgba8: t.outputs.rgba8 }) }));
			e.programTemplate ||= new Di(aa), n = new Ei({
				graph: r,
				inputs: { index: "index" },
				outputs: { rgba8: "target" },
				template: e.programTemplate
			}), Object.assign(n.uniforms, {
				targetLayer: { value: 0 },
				targetBase: { value: 0 },
				targetCount: { value: 0 }
			}), e.readbackProgram.set(t, n);
		}
		let r = n.prepareMaterial();
		return e.fullScreenQuad.material = r, {
			program: n,
			material: r
		};
	}
	saveRenderState(e) {
		return {
			xrEnabled: e.xr.enabled,
			autoClear: e.autoClear
		};
	}
	resetRenderState(e, t) {
		e.setRenderTarget(null), e.xr.enabled = t.xrEnabled, e.autoClear = t.autoClear;
	}
	process({ count: t, material: n }) {
		let r = this.renderer;
		if (!r) throw Error("No renderer");
		if (!this.target) throw Error("No target");
		let i = Y * Gn;
		n.uniforms.targetBase.value = 0, n.uniforms.targetCount.value = t;
		let a = 0;
		for (; a < t;) {
			let o = Math.floor(a / i), s = o * i, c = Math.min(Gn, Math.ceil((t - s) / Y));
			n.uniforms.targetLayer.value = o, this.target.scissor.set(0, 0, Y, c), r.setRenderTarget(this.target, o), r.xr.enabled = !1, r.autoClear = !1, e.fullScreenQuad.render(r), a += Y * c;
		}
		this.count = t;
	}
	async read({ readback: e }) {
		let t = this.renderer;
		if (!t) throw Error("No renderer");
		if (!this.target) throw Error("No target");
		let n = Math.ceil(this.count / Y) * Y;
		if (e.byteLength < n * 4) throw Error(`Readback buffer too small: ${e.byteLength} < ${n * 4}`);
		let r = new Uint8Array(e instanceof ArrayBuffer ? e : e.buffer), i = Y * Gn, a = 0, o = [];
		for (; a < this.count;) {
			let e = Math.floor(a / i), n = e * i, s = Math.min(Gn, Math.ceil((this.count - n) / Y));
			t.setRenderTarget(this.target, e);
			let c = Y * s * 4, l = r.subarray(n * 4, n * 4 + c), u = t?.readRenderTargetPixelsAsync(this.target, 0, 0, Y, s, l);
			o.push(u), a += Y * s;
		}
		return Promise.all(o).then(() => e);
	}
	render({ reader: e, count: t, renderer: n }) {
		if (this.renderer = n || this.renderer, !this.renderer) throw Error("No renderer");
		this.ensureCapacity(t);
		let { program: r, material: i } = this.prepareProgramMaterial(e);
		r.update();
		let a = this.saveRenderState(this.renderer);
		this.process({
			count: t,
			material: i
		}), this.resetRenderState(this.renderer, a);
	}
	async readback({ readback: e }) {
		if (!this.renderer) throw Error("No renderer");
		let t = this.saveRenderState(this.renderer), n = this.read({ readback: e });
		return this.resetRenderState(this.renderer, t), n;
	}
	async renderReadback({ reader: e, count: t, renderer: n, readback: r }) {
		if (this.renderer = n || this.renderer, !this.renderer) throw Error("No renderer");
		this.ensureCapacity(t);
		let { program: i, material: a } = this.prepareProgramMaterial(e);
		i.update();
		let o = this.saveRenderState(this.renderer);
		this.process({
			count: t,
			material: a
		});
		let s = this.read({ readback: r });
		return this.resetRenderState(this.renderer, o), s;
	}
	getTexture() {
		return this.target?.texture;
	}
};
oa.programTemplate = null, oa.readbackProgram = /* @__PURE__ */ new Map(), oa.fullScreenQuad = new qt(new Be({ visible: !1 }));
var sa = oa, ca = class e {
	constructor(t = {}) {
		this.capacity = 0, this.count = 0, this.array = null, this.readback = null, this.source = null, this.needsUpdate = !0, this.dyno = new Hr({
			key: "rgbaArray",
			type: ua,
			globals: () => [da],
			value: {
				texture: e.getEmpty(),
				count: 0
			},
			update: (t) => (t.texture = this.readback?.getTexture() ?? this.source ?? e.getEmpty(), t.count = this.count, t)
		}), t.array ? (this.array = t.array, this.capacity = Math.floor(this.array.length / 4), this.capacity = Math.floor(this.capacity / Y) * Y, this.count = Math.min(this.capacity, t.count ?? Infinity)) : (this.capacity = t.capacity ?? 0, this.count = 0);
	}
	dispose() {
		this.readback &&= (this.readback.dispose(), null), this.source &&= (this.source.dispose(), null);
	}
	ensureCapacity(e) {
		if (!this.array || e > (this.array?.length ?? 0) / 4) {
			this.capacity = mi(e).maxSplats;
			let t = new Uint8Array(this.capacity * 4);
			this.array && t.set(this.array), this.array = t;
		}
		return this.array;
	}
	getTexture() {
		let t = this.readback?.getTexture();
		return (this.source || this.array) && (t = this.maybeUpdateSource()), t ?? e.getEmpty();
	}
	maybeUpdateSource() {
		if (!this.array) throw Error("No array");
		if (this.needsUpdate || !this.source) {
			if (this.needsUpdate = !1, this.source) {
				let { width: e, height: t, depth: n } = this.source.image;
				this.capacity !== e * t * n && (this.source.dispose(), this.source = null);
			}
			if (this.source) this.array.buffer !== this.source.image.data.buffer && (this.source.image.data = new Uint8Array(this.array.buffer));
			else {
				let { width: e, height: t, depth: n } = mi(this.capacity);
				this.source = new D(this.array, e, t, n), this.source.format = He, this.source.type = s, this.source.internalFormat = "RGBA8", this.source.needsUpdate = !0;
			}
			this.source.needsUpdate = !0;
		}
		return this.source;
	}
	render({ reader: e, count: t, renderer: n }) {
		this.readback ||= new sa({ renderer: n }), this.readback.render({
			reader: e,
			count: t,
			renderer: n
		}), this.capacity = this.readback.capacity, this.count = this.readback.count;
	}
	fromPackedSplats({ packedSplats: t, base: n, count: r, renderer: i }) {
		let { dynoSplats: a, dynoBase: o, dynoCount: s, reader: c } = e.makeDynos();
		return a.packedSplats = t, o.value = n, s.value = r, this.render({
			reader: c,
			count: r,
			renderer: i
		}), this;
	}
	async read() {
		if (!this.readback) throw Error("No readback");
		return (!this.array || this.array.length < this.count * 4) && (this.array = new Uint8Array(this.capacity * 4)), (await this.readback.readback({ readback: this.array })).subarray(0, this.count * 4);
	}
	static getEmpty() {
		return e.emptySource || (e.emptySource = new D(/* @__PURE__ */ new Uint8Array(4), 1, 1, 1), e.emptySource.format = He, e.emptySource.type = s, e.emptySource.internalFormat = "RGBA8", e.emptySource.needsUpdate = !0), e.emptySource;
	}
	static makeDynos() {
		if (!e.dynos) {
			let t = new Do(), n = new Wr({ value: 0 }), r = new Wr({ value: 0 }), i = _r({ index: "int" }, { rgba8: "vec4" }, ({ index: e }) => {
				if (!e) throw Error("index is undefined");
				return e = Ni(e, n), { rgba8: Or(Dr(t, e, n, r)).outputs.rgba };
			});
			e.dynos = {
				dynoSplats: t,
				dynoBase: n,
				dynoCount: r,
				reader: i
			};
		}
		return e.dynos;
	}
};
ca.emptySource = null, ca.dynos = null;
var la = ca, ua = { type: "RgbaArray" }, da = xr("\n  struct RgbaArray {\n    sampler2DArray texture;\n    int count;\n  };\n");
function fa(e, t) {
	return new hr({
		inTypes: {
			rgba: ua,
			index: "int"
		},
		outTypes: { rgba: "vec4" },
		inputs: {
			rgba: e,
			index: t
		},
		globals: () => [da],
		statements: ({ inputs: e, outputs: t }) => br(`
        if ((index >= 0) && (index < ${e.rgba}.count)) {
          ${t.rgba} = texelFetch(${e.rgba}.texture, splatTexCoord(index), 0);
        } else {
          ${t.rgba} = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `)
	}).outputs.rgba;
}
function pa(e) {
	switch (e) {
		case "all": return 0;
		case "plane": return 1;
		case "sphere": return 2;
		case "box": return 3;
		case "ellipsoid": return 4;
		case "cylinder": return 5;
		case "capsule": return 6;
		case "infinite_cone": return 7;
		default: throw Error(`Unknown SDF type: ${e}`);
	}
}
function ma(e) {
	switch (e) {
		case "multiply": return 0;
		case "set_rgb": return 1;
		case "add_rgba": return 2;
		default: throw Error(`Unknown blend mode: ${e}`);
	}
}
var ha = class extends he {
	constructor(e = {}) {
		super();
		let { type: t, invert: n, opacity: r, color: i, displace: a, radius: o } = e;
		this.type = t ?? "sphere", this.invert = n ?? !1, this.opacity = r ?? 1, this.color = i ?? new f(1, 1, 1), this.displace = a ?? new z(0, 0, 0), this.radius = o ?? 0;
	}
}, ga = class e extends he {
	constructor(t = {}) {
		let { name: n, rgbaBlendMode: r = "multiply", sdfSmooth: i = 0, softEdge: a = 0, invert: o = !1, sdfs: s = null } = t;
		super(), this.rgbaBlendMode = r, this.sdfSmooth = i, this.softEdge = a, this.invert = o, this.sdfs = s, this.ordering = e.nextOrdering++, this.name = n ?? `Edit ${this.ordering}`;
	}
	addSdf(e) {
		this.sdfs ??= [], this.sdfs.includes(e) || this.sdfs.push(e);
	}
	removeSdf(e) {
		this.sdfs != null && (this.sdfs = this.sdfs.filter((t) => t !== e));
	}
};
ga.nextOrdering = 1;
var _a = ga, va = class {
	constructor({ maxSdfs: e, maxEdits: t }) {
		this.maxSdfs = Math.max(16, e ?? 0), this.numSdfs = 0, this.sdfData = new Uint32Array(this.maxSdfs * 8 * 4), this.sdfFloatData = new Float32Array(this.sdfData.buffer), this.sdfTexture = this.newSdfTexture(this.sdfData, this.maxSdfs), this.dynoSdfArray = new Hr({
			key: "sdfArray",
			type: ya,
			globals: () => [ba],
			value: {
				numSdfs: 0,
				sdfTexture: this.sdfTexture
			},
			update: (e) => (e.numSdfs = this.numSdfs, e.sdfTexture = this.sdfTexture, e)
		}), this.maxEdits = Math.max(16, t ?? 0), this.numEdits = 0, this.editData = new Uint32Array(this.maxEdits * 4), this.editFloatData = new Float32Array(this.editData.buffer), this.dynoNumEdits = new Wr({ value: 0 }), this.dynoEdits = this.newEdits(this.editData, this.maxEdits);
	}
	newSdfTexture(e, t) {
		let n = new A(e, 8, t, I, ee);
		return n.internalFormat = "RGBA32UI", n.needsUpdate = !0, n;
	}
	newEdits(e, t) {
		return new Hr({
			key: "edits",
			type: "uvec4",
			count: t,
			globals: () => [xa],
			value: e
		});
	}
	ensureCapacity({ maxSdfs: e, maxEdits: t }) {
		let n = !1;
		return e > this.sdfTexture.image.height && (this.sdfTexture.dispose(), this.maxSdfs = Math.max(this.maxSdfs * 2, e), this.sdfData = new Uint32Array(this.maxSdfs * 8 * 4), this.sdfFloatData = new Float32Array(this.sdfData.buffer), this.sdfTexture = this.newSdfTexture(this.sdfData, this.maxSdfs)), t > (this.dynoEdits.count ?? 0) && (this.maxEdits = Math.max(this.maxEdits * 2, t), this.editData = new Uint32Array(this.maxEdits * 4), this.editFloatData = new Float32Array(this.editData.buffer), this.dynoEdits = this.newEdits(this.editData, this.maxEdits), n = !0), n;
	}
	updateEditData(e, t) {
		let n = this.editData[e] !== t;
		return this.editData[e] = t, n;
	}
	updateEditFloatData(e, t) {
		Ca[0] = t;
		let n = this.editFloatData[e] !== Ca[0];
		return n && (this.editFloatData[e] = Ca[0]), n;
	}
	encodeEdit(e, { sdfFirst: t, sdfCount: n, invert: r, rgbaBlendMode: i, softEdge: a, sdfSmooth: o }) {
		let s = e * 4, c = !1;
		return c = this.updateEditData(s + 0, i | (r ? 256 : 0)) || c, c = this.updateEditData(s + 1, t | n << 16) || c, c = this.updateEditFloatData(s + 2, a) || c, c = this.updateEditFloatData(s + 3, o) || c, c;
	}
	updateSdfData(e, t) {
		let n = this.sdfData[e] !== t;
		return this.sdfData[e] = t, n;
	}
	updateSdfFloatData(e, t) {
		Ca[0] = t;
		let n = this.sdfFloatData[e] !== Ca[0];
		return n && (this.sdfFloatData[e] = Ca[0]), n;
	}
	encodeSdf(e, { sdfType: t, invert: n, center: r, quaternion: i, scale: a, sizes: o }, s) {
		let c = e * 32, l = t | (n ? 256 : 0), u = !1;
		u = this.updateSdfFloatData(c + 0, r?.x ?? 0) || u, u = this.updateSdfFloatData(c + 1, r?.y ?? 0) || u, u = this.updateSdfFloatData(c + 2, r?.z ?? 0) || u, u = this.updateSdfData(c + 3, l) || u, u = this.updateSdfFloatData(c + 4, i?.x ?? 0) || u, u = this.updateSdfFloatData(c + 5, i?.y ?? 0) || u, u = this.updateSdfFloatData(c + 6, i?.z ?? 0) || u, u = this.updateSdfFloatData(c + 7, i?.w ?? 0) || u, u = this.updateSdfFloatData(c + 8, a?.x ?? 0) || u, u = this.updateSdfFloatData(c + 9, a?.y ?? 0) || u, u = this.updateSdfFloatData(c + 10, a?.z ?? 0) || u, u = this.updateSdfData(c + 11, 0) || u, u = this.updateSdfFloatData(c + 12, o?.x ?? 0) || u, u = this.updateSdfFloatData(c + 13, o?.y ?? 0) || u, u = this.updateSdfFloatData(c + 14, o?.z ?? 0) || u, u = this.updateSdfFloatData(c + 15, o?.w ?? 0) || u;
		let d = Math.min(4, s.length);
		for (let e = 0; e < d; ++e) {
			let t = c + 16 + e * 4;
			u = this.updateSdfFloatData(t + 0, s[e].x) || u, u = this.updateSdfFloatData(t + 1, s[e].y) || u, u = this.updateSdfFloatData(t + 2, s[e].z) || u, u = this.updateSdfFloatData(t + 3, s[e].w) || u;
		}
		return u;
	}
	update(e) {
		let t = e.reduce((e, { sdfs: t }) => e + t.length, 0), n = this.ensureCapacity({
			maxEdits: e.length,
			maxSdfs: t
		}), r = [new V(), new V()], i = new z(), a = new U(), o = new z(), s = new V(), c = 0, l = n;
		e.length !== this.dynoNumEdits.value && (this.dynoNumEdits.value = e.length, this.numEdits = e.length, l = !0);
		for (let [t, { edit: n, sdfs: u }] of e.entries()) {
			l = this.encodeEdit(t, {
				sdfFirst: c,
				sdfCount: u.length,
				invert: n.invert,
				rgbaBlendMode: ma(n.rgbaBlendMode),
				softEdge: n.softEdge,
				sdfSmooth: n.sdfSmooth
			}) || l;
			let e = !1;
			for (let t of u) s.set(t.scale.x, t.scale.y, t.scale.z, t.radius), t.scale.setScalar(1), t.updateMatrixWorld(), t.matrixWorld.clone().invert().decompose(i, a, o), t.scale.set(s.x, s.y, s.z), t.updateMatrixWorld(), r[0].set(t.color.r, t.color.g, t.color.b, t.opacity), r[1].set(t.displace.x, t.displace.y, t.displace.z, 1), e = this.encodeSdf(c, {
				sdfType: pa(t.type),
				invert: t.invert,
				center: i,
				quaternion: a,
				scale: o,
				sizes: s
			}, r) || e, c += 1;
			this.numSdfs = c, e && (this.sdfTexture.needsUpdate = !0), l ||= e;
		}
		return {
			updated: l,
			dynoUpdated: n
		};
	}
	modify(e) {
		return Sa(e, this.dynoSdfArray, this.dynoNumEdits, this.dynoEdits);
	}
}, ya = { type: "SdfArray" }, ba = xr("\n  struct SdfArray {\n    int numSdfs;\n    usampler2D sdfTexture;\n  };\n\n  void unpackSdfArray(\n    usampler2D sdfTexture, int sdfIndex, out uint flags,\n    out vec3 center, out vec4 quaternion, out vec3 scale, out vec4 sizes,\n    int numValues, out vec4 values[4]\n  ) {\n    uvec4 temp = texelFetch(sdfTexture, ivec2(0, sdfIndex), 0);\n    flags = temp.w;\n    center = vec3(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z));\n\n    temp = texelFetch(sdfTexture, ivec2(1, sdfIndex), 0);\n    quaternion = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));\n\n    temp = texelFetch(sdfTexture, ivec2(2, sdfIndex), 0);\n    scale = vec3(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z));\n\n    temp = texelFetch(sdfTexture, ivec2(3, sdfIndex), 0);\n    sizes = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));\n\n    for (int i = 0; i < numValues; ++i) {\n      temp = texelFetch(sdfTexture, ivec2(4 + i, sdfIndex), 0);\n      values[i] = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));\n    }\n  }\n\n  const uint SDF_FLAG_TYPE = 0xFFu;\n  const uint SDF_FLAG_INVERT = 1u << 8u;\n\n  const uint SDF_TYPE_ALL = 0u;\n  const uint SDF_TYPE_PLANE = 1u;\n  const uint SDF_TYPE_SPHERE = 2u;\n  const uint SDF_TYPE_BOX = 3u;\n  const uint SDF_TYPE_ELLIPSOID = 4u;\n  const uint SDF_TYPE_CYLINDER = 5u;\n  const uint SDF_TYPE_CAPSULE = 6u;\n  const uint SDF_TYPE_INFINITE_CONE = 7u;\n\n  float evaluateSdfArray(\n    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, vec3 pos,\n    float smoothK, int numValues, out vec4 outValues[4]\n  ) {\n    float distanceAccum = (smoothK == 0.0) ? 1.0 / 0.0 : 0.0;\n    float maxExp = -1.0 / 0.0;\n    for (int i = 0; i < numValues; ++i) {\n        outValues[i] = vec4(0.0);\n    }\n\n    uint flags;\n    vec3 center, scale;\n    vec4 quaternion, sizes;\n    vec4 values[4];\n\n    int sdfLast = min(sdfFirst + sdfCount, numSdfs);\n    for (int index = sdfFirst; index < sdfLast; ++index) {\n      unpackSdfArray(sdfTexture, index, flags, center, quaternion, scale, sizes, numValues, values);\n      uint sdfType = flags & SDF_FLAG_TYPE;\n      vec3 sdfPos = quatVec(quaternion, pos * scale) + center;\n\n      float distance;\n      switch (sdfType) {\n        case SDF_TYPE_ALL:\n          distance = -1.0 / 0.0;\n          break;\n        case SDF_TYPE_PLANE: {\n          distance = sdfPos.z;\n          break;\n        }\n        case SDF_TYPE_SPHERE: {\n          distance = length(sdfPos) - sizes.w;\n          break;\n        }\n        case SDF_TYPE_BOX: {\n          vec3 q = abs(sdfPos) - sizes.xyz + sizes.w;\n          distance = length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - sizes.w;\n          break;\n        }\n        case SDF_TYPE_ELLIPSOID: {\n          vec3 sizes = sizes.xyz;\n          float k0 = length(sdfPos / sizes);\n          float k1 = length(sdfPos / dot(sizes, sizes));\n          distance = k0 * (k0 - 1.0) / k1;\n          break;\n        }\n        case SDF_TYPE_CYLINDER: {\n          vec2 d = abs(vec2(length(sdfPos.xz), sdfPos.y)) - sizes.wy;\n          distance = min(max(d.x, d.y), 0.0) + length(max(d, 0.0));\n          break;\n        }\n        case SDF_TYPE_CAPSULE: {\n          sdfPos.y -= clamp(sdfPos.y, -0.5 * sizes.y, 0.5 * sizes.y);\n          distance = length(sdfPos) - sizes.w;\n          break;\n        }\n        case SDF_TYPE_INFINITE_CONE: {\n          float angle = 0.25 * PI * sizes.w;\n          vec2 c = vec2(sin(angle), cos(angle));\n          vec2 q = vec2(length(sdfPos.xy), -sdfPos.z);\n          float d = length(q - c * max(dot(q, c), 0.0));\n          distance = d * (((q.x * c.y - q.y * c.x) < 0.0) ? -1.0 : 1.0);\n          break;\n        }\n      }\n\n      if ((flags & SDF_FLAG_INVERT) != 0u) {\n        distance = -distance;\n      }\n\n      if (smoothK == 0.0) {\n        if (distance < distanceAccum) {\n          distanceAccum = distance;\n          for (int i = 0; i < numValues; ++i) {\n            outValues[i] = values[i];\n          }\n        }\n      } else {\n        float scaledDistance = -distance / smoothK;\n        if (scaledDistance > maxExp) {\n          float scale = exp(maxExp - scaledDistance);\n          distanceAccum *= scale;\n          for (int i = 0; i < numValues; ++i) {\n            outValues[i] *= scale;\n          }\n          maxExp = scaledDistance;\n        }\n\n        float weight = exp(scaledDistance - maxExp);\n        distanceAccum += weight;\n        for (int i = 0; i < numValues; ++i) {\n          outValues[i] += weight * values[i];\n        }\n      }\n    }\n\n    if (smoothK == 0.0) {\n      return distanceAccum;\n    } else {\n      // Very distant SDFs may result in 0 accumulation\n      if (distanceAccum == 0.0) {\n        return 1.0 / 0.0;\n      }\n      for (int i = 0; i < numValues; ++i) {\n        outValues[i] /= distanceAccum;\n      }\n      return (-log(distanceAccum) - maxExp) * smoothK;\n    }\n  }\n\n  float modulateSdfArray(\n    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, vec3 pos,\n    float smoothK, int numValues, out vec4 values[4],\n    float softEdge, bool invert\n  ) {\n    float distance = evaluateSdfArray(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, smoothK, numValues, values);\n    if (invert) {\n      distance = -distance;\n    }\n\n    return (softEdge == 0.0) ? ((distance < 0.0) ? 1.0 : 0.0)\n      : clamp(-distance / softEdge + 0.5, 0.0, 1.0);\n  }\n"), xa = xr("\n  const uint EDIT_FLAG_BLEND = 0xFFu;\n  const uint EDIT_BLEND_MULTIPLY = 0u;\n  const uint EDIT_BLEND_SET_RGB = 1u;\n  const uint EDIT_BLEND_ADD_RGBA = 2u;\n  const uint EDIT_FLAG_INVERT = 0x100u;\n\n  void decodeEdit(\n    uvec4 packedEdit, out int sdfFirst, out int sdfCount,\n    out bool invert, out uint rgbaBlendMode, out float softEdge, out float sdfSmooth\n  ) {\n    rgbaBlendMode = packedEdit.x & EDIT_FLAG_BLEND;\n    invert = (packedEdit.x & EDIT_FLAG_INVERT) != 0u;\n\n    sdfFirst = int(packedEdit.y & 0xFFFFu);\n    sdfCount = int(packedEdit.y >> 16u);\n\n    softEdge = uintBitsToFloat(packedEdit.z);\n    sdfSmooth = uintBitsToFloat(packedEdit.w);\n  }\n\n  void applyRgbaDisplaceEdit(\n    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, inout vec3 pos,\n    float smoothK, float softEdge, bool invert, uint rgbaBlendMode, inout vec4 rgba\n  ) {\n    vec4 values[4];\n    float modulate = modulateSdfArray(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, smoothK, 2, values, softEdge, invert);\n    // On Android, moving values[0] is necessary to work around a compiler bug.\n    vec4 sdfRgba = values[0];\n    vec4 sdfDisplaceScale = values[1];\n\n    vec4 target;\n    switch (rgbaBlendMode) {\n      case EDIT_BLEND_MULTIPLY:\n        target = rgba * sdfRgba;\n        break;\n      case EDIT_BLEND_SET_RGB:\n        target = vec4(sdfRgba.rgb, rgba.a * sdfRgba.a);\n        break;\n      case EDIT_BLEND_ADD_RGBA:\n        target = rgba + sdfRgba;\n        break;\n      default:\n        // Debug output if blend mode not set\n        target = vec4(fract(pos), 1.0);\n    }\n    rgba = mix(rgba, target, modulate);\n    pos += sdfDisplaceScale.xyz * modulate;\n  }\n\n  void applyPackedRgbaDisplaceEdit(uvec4 packedEdit, usampler2D sdfTexture, int numSdfs, inout vec3 pos, inout vec4 rgba) {\n    int sdfFirst, sdfCount;\n    bool invert;\n    uint rgbaBlendMode;\n    float softEdge, sdfSmooth;\n    decodeEdit(packedEdit, sdfFirst, sdfCount, invert, rgbaBlendMode, softEdge, sdfSmooth);\n    applyRgbaDisplaceEdit(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, sdfSmooth, softEdge, invert, rgbaBlendMode, rgba);\n  }\n");
function Sa(e, t, n, r) {
	return new hr({
		inTypes: {
			gsplat: wr,
			sdfArray: ya,
			numEdits: "int",
			rgbaDisplaceEdits: "uvec4"
		},
		outTypes: { gsplat: wr },
		globals: () => [ba, xa],
		inputs: {
			gsplat: e,
			sdfArray: t,
			numEdits: n,
			rgbaDisplaceEdits: r
		},
		statements: ({ inputs: e, outputs: t }) => {
			let { sdfArray: n, numEdits: r, rgbaDisplaceEdits: i } = e, { gsplat: a } = t;
			return br(`
        ${a} = ${e.gsplat};
        if (isGsplatActive(${a}.flags)) {
          for (int editIndex = 0; editIndex < ${r}; ++editIndex) {
            applyPackedRgbaDisplaceEdit(
              ${i}[editIndex], ${n}.sdfTexture, ${n}.numSdfs,
              ${a}.center, ${a}.rgba
            );
          }
        }
      `);
		}
	}).outputs.gsplat;
}
var Ca = /* @__PURE__ */ new Float32Array(1), wa = class {
	constructor(e) {
		this.modifier = e, this.cache = /* @__PURE__ */ new Map();
	}
	apply(e) {
		let t = this.cache.get(e);
		return t || (t = _r({ index: "int" }, { gsplat: wr }, ({ index: t }) => {
			let { gsplat: n } = e.apply({ index: t });
			return this.modifier.apply({ gsplat: n });
		}), this.cache.set(e, t)), t;
	}
}, Ta = class {
	constructor() {
		this.scale = new Gr({ value: -Infinity }), this.rotate = new Jr({ value: new U(Infinity, Infinity, Infinity, Infinity) }), this.translate = new qr({ value: new z(Infinity, Infinity, Infinity) });
	}
	apply(e) {
		return ta(e, {
			scale: this.scale,
			rotate: this.rotate,
			translate: this.translate
		});
	}
	applyDir(e) {
		return na(e, { rotate: this.rotate });
	}
	applyGsplat(e) {
		return Ar(e, {
			scale: this.scale,
			rotate: this.rotate,
			translate: this.translate
		});
	}
	updateFromMatrix(e) {
		let t = new z(), n = new U(), r = new z();
		e.decompose(r, n, t);
		let i = (t.x + t.y + t.z) / 3, a = !1;
		return i !== this.scale.value && (this.scale.value = i, a = !0), r.equals(this.translate.value) || (this.translate.value.copy(r), a = !0), n.equals(this.rotate.value) || (this.rotate.value.copy(n), a = !0), a;
	}
	update(e) {
		return e.updateMatrixWorld(), this.updateFromMatrix(e.matrixWorld);
	}
}, Ea = class extends he {
	constructor({ numSplats: e, generator: t, construct: n, update: r }) {
		if (super(), this.numSplats = e ?? 0, this.generator = t, this.frameUpdate = r, this.version = 0, n) {
			let e = n(this);
			Object.assign(this, e);
		}
	}
	updateVersion() {
		this.version += 1;
	}
	set needsUpdate(e) {
		e && this.updateVersion();
	}
}, Da = class e extends Ea {
	constructor(e = {}) {
		let t = {
			transform: new Ta(),
			viewToWorld: new Ta(),
			worldToView: new Ta(),
			viewToObject: new Ta(),
			recolor: new Jr({ value: new V(-Infinity, -Infinity, -Infinity, -Infinity) }),
			time: new Gr({ value: 0 }),
			deltaTime: new Gr({ value: 0 })
		};
		if (super({ update: ({ time: e, deltaTime: t, viewToWorld: n, globalEdits: r }) => this.update({
			time: e,
			deltaTime: t,
			viewToWorld: n,
			globalEdits: r
		}) }), this.isInitialized = !1, this.recolor = new f(1, 1, 1), this.opacity = 1, this.enableViewToObject = !1, this.enableViewToWorld = !1, this.enableWorldToView = !1, this.skinning = null, this.edits = null, this.rgbaDisplaceEdits = null, this.splatRgba = null, this.maxSh = 3, this.packedSplats = e.packedSplats ?? new Eo(), this.packedSplats.splatEncoding = e.splatEncoding ?? { ...wo }, this.numSplats = this.packedSplats.numSplats, this.editable = e.editable ?? !0, this.onFrame = e.onFrame, this.context = t, this.objectModifier = e.objectModifier, this.worldModifier = e.worldModifier, this.updateGenerator(), e.url || e.fileBytes || e.constructSplats || e.packedSplats && !e.packedSplats.isInitialized) this.initialized = this.asyncInitialize(e).then(async () => {
			if (this.updateGenerator(), this.isInitialized = !0, e.onLoad) {
				let t = e.onLoad(this);
				t instanceof Promise && await t;
			}
			return this;
		});
		else if (this.isInitialized = !0, this.initialized = Promise.resolve(this), e.onLoad) {
			let t = e.onLoad(this);
			t instanceof Promise && (this.initialized = t.then(() => this));
		}
		this.add(La());
	}
	async asyncInitialize(e) {
		let { url: t, fileBytes: n, fileType: r, fileName: i, maxSplats: a, constructSplats: o, splatEncoding: s } = e;
		if (t || n || o) {
			let e = {
				url: t,
				fileBytes: n,
				fileType: r,
				fileName: i,
				maxSplats: a,
				construct: o,
				splatEncoding: s
			};
			this.packedSplats.reinitialize(e);
		}
		this.packedSplats && (await this.packedSplats.initialized, this.numSplats = this.packedSplats.numSplats, this.updateGenerator());
	}
	static async staticInitialize() {
		await Un(), e.isStaticInitialized = !0;
	}
	pushSplat(e, t, n, r, i) {
		this.packedSplats.pushSplat(e, t, n, r, i);
	}
	forEachSplat(e) {
		this.packedSplats.forEachSplat(e);
	}
	dispose() {
		this.packedSplats.dispose();
	}
	getBoundingBox(e = !0) {
		if (!this.initialized) throw Error("Cannot get bounding box before SplatMesh is initialized");
		let t = new z(Infinity, Infinity, Infinity), n = new z(-Infinity, -Infinity, -Infinity), r = new z(), i = [-1, 1];
		return this.packedSplats.forEachSplat((a, o, s, c, l, u) => {
			if (e) t.min(o), n.max(o);
			else for (let e of i) for (let a of i) for (let l of i) r.set(e * s.x, a * s.y, l * s.z), r.applyQuaternion(c), r.add(o), t.min(r), n.max(r);
		}), new ae(t, n);
	}
	constructGenerator(e) {
		let { transform: t, viewToObject: n, recolor: r } = e, i = _r({ index: "int" }, { gsplat: wr }, ({ index: e }) => {
			if (!e) throw Error("index is undefined");
			let i = Er(this.packedSplats.dyno, e);
			if (this.maxSh >= 1) {
				let { sh1Texture: e, sh2Texture: t, sh3Texture: r } = this.ensureShTextures();
				if (e) {
					let a = function(e, t) {
						let { x: n, y: r } = Ki(t).outputs;
						return Ni(Fi(Ni(n, r), dr("float", .5)), Fi(e, Fi(Pi(r, n), dr("float", .5))));
					}, o = n.translate, { center: s } = Or(i).outputs, c = Gi(Pi(s, o)), l = a(Ma(i, e, c), this.packedSplats.dynoSh1MinMax);
					if (this.maxSh >= 2 && t) {
						let e = Na(i, t, c);
						l = Ni(l, a(e, this.packedSplats.dynoSh2MinMax));
					}
					if (this.maxSh >= 3 && r) {
						let e = Pa(i, r, c);
						l = Ni(l, a(e, this.packedSplats.dynoSh3MinMax));
					}
					let { rgba: u } = Or(i).outputs;
					u = Ni(u, Ji(l, dr("float", 0))), i = kr({
						gsplat: i,
						rgba: u
					});
				}
			}
			if (this.splatRgba) {
				let t = fa(this.splatRgba.dyno, e);
				i = kr({
					gsplat: i,
					rgba: t
				});
			}
			this.skinning && (i = this.skinning.modify(i)), this.objectModifier && (i = this.objectModifier.apply({ gsplat: i }).gsplat), i = t.applyGsplat(i);
			let a = Fi(r, Or(i).outputs.rgba);
			return i = kr({
				gsplat: i,
				rgba: a
			}), this.rgbaDisplaceEdits && (i = this.rgbaDisplaceEdits.modify(i)), this.worldModifier && (i = this.worldModifier.apply({ gsplat: i }).gsplat), { gsplat: i };
		});
		this.generator = i;
	}
	updateGenerator() {
		this.constructGenerator(this.context);
	}
	update({ time: t, viewToWorld: n, deltaTime: r, globalEdits: i }) {
		var a;
		this.numSplats = this.packedSplats.numSplats, this.context.time.value = t, this.context.deltaTime.value = r, e.dynoTime.value = t;
		let { transform: o, viewToObject: s, recolor: c } = this.context, l = o.update(this);
		this.context.viewToWorld.updateFromMatrix(n) && this.enableViewToWorld && (l = !0);
		let u = n.clone().invert();
		this.context.worldToView.updateFromMatrix(u) && this.enableWorldToView && (l = !0);
		let d = new se().compose(o.translate.value, o.rotate.value, new z().setScalar(o.scale.value)).invert().multiply(n);
		s.updateFromMatrix(d) && (this.enableViewToObject || this.packedSplats.extra.sh1) && (l = !0);
		let f = new V(this.recolor.r, this.recolor.g, this.recolor.b, this.opacity);
		f.equals(c.value) || (c.value.copy(f), l = !0);
		let p = this.editable ? (this.edits ?? []).concat(i) : [];
		this.editable && !this.edits && this.traverseVisible((e) => {
			e instanceof _a && p.push(e);
		}), p.sort((e, t) => e.ordering - t.ordering);
		let m = p.map((e) => {
			if (e.sdfs != null) return {
				edit: e,
				sdfs: e.sdfs
			};
			let t = [];
			return e.traverseVisible((e) => {
				e instanceof ha && t.push(e);
			}), {
				edit: e,
				sdfs: t
			};
		});
		if (m.length > 0 && !this.rgbaDisplaceEdits) {
			let e = m.length, t = m.reduce((e, t) => e + t.sdfs.length, 0);
			this.rgbaDisplaceEdits = new va({
				maxEdits: e,
				maxSdfs: t
			}), this.updateGenerator();
		}
		if (this.rgbaDisplaceEdits) {
			let e = this.rgbaDisplaceEdits.update(m);
			l ||= e.updated, e.dynoUpdated && this.updateGenerator();
		}
		l && this.updateVersion(), (a = this.onFrame) == null || a.call(this, {
			mesh: this,
			time: t,
			deltaTime: r
		});
	}
	raycast(e, t) {
		if (!this.packedSplats.packedArray || !this.packedSplats.numSplats) return;
		let { near: n, far: r, ray: i } = e, a = this.matrixWorld.clone().invert(), o = new Ne().setFromMatrix4(a), s = i.origin.clone().applyMatrix4(a), c = i.direction.clone().applyMatrix3(o), l = new z();
		a.decompose(new z(), new U(), l), (l.x * l.y * l.z) ** (1 / 3);
		let u = zn(s.x, s.y, s.z, c.x, c.y, c.z, n, r, this.packedSplats.numSplats, this.packedSplats.packedArray, !0, this.packedSplats.splatEncoding?.lnScaleMin ?? -12, this.packedSplats.splatEncoding?.lnScaleMax ?? 9);
		for (let e of u) {
			let n = i.direction.clone().multiplyScalar(e).add(i.origin);
			t.push({
				distance: e,
				point: n,
				object: this
			});
		}
	}
	ensureShTextures() {
		if (!this.packedSplats.extra.sh1) return {};
		let e = this.packedSplats.extra.sh1Texture;
		if (!e) {
			let t = this.packedSplats.extra.sh1, { width: n, height: r, depth: i, maxSplats: a } = mi(t.length / 2);
			if (t.length < a * 2) {
				let e = new Uint32Array(a * 2);
				e.set(t), this.packedSplats.extra.sh1 = e, t = e;
			}
			let o = new D(t, n, r, i);
			o.format = l, o.type = ee, o.internalFormat = "RG32UI", o.needsUpdate = !0, e = new Yr({
				value: o,
				key: "sh1"
			}), this.packedSplats.extra.sh1Texture = e;
		}
		if (!this.packedSplats.extra.sh2) return { sh1Texture: e };
		let t = this.packedSplats.extra.sh2Texture;
		if (!t) {
			let e = this.packedSplats.extra.sh2, { width: n, height: r, depth: i, maxSplats: a } = mi(e.length / 4);
			if (e.length < a * 4) {
				let t = new Uint32Array(a * 4);
				t.set(e), this.packedSplats.extra.sh2 = t, e = t;
			}
			let o = new D(e, n, r, i);
			o.format = I, o.type = ee, o.internalFormat = "RGBA32UI", o.needsUpdate = !0, t = new Yr({
				value: o,
				key: "sh2"
			}), this.packedSplats.extra.sh2Texture = t;
		}
		if (!this.packedSplats.extra.sh3) return {
			sh1Texture: e,
			sh2Texture: t
		};
		let n = this.packedSplats.extra.sh3Texture;
		if (!n) {
			let e = this.packedSplats.extra.sh3, { width: t, height: r, depth: i, maxSplats: a } = mi(e.length / 4);
			if (e.length < a * 4) {
				let t = new Uint32Array(a * 4);
				t.set(e), this.packedSplats.extra.sh3 = t, e = t;
			}
			let o = new D(e, t, r, i);
			o.format = I, o.type = ee, o.internalFormat = "RGBA32UI", o.needsUpdate = !0, n = new Yr({
				value: o,
				key: "sh3"
			}), this.packedSplats.extra.sh3Texture = n;
		}
		return {
			sh1Texture: e,
			sh2Texture: t,
			sh3Texture: n
		};
	}
};
Da.staticInitialized = Da.staticInitialize(), Da.isStaticInitialized = !1, Da.dynoTime = new Gr({ value: 0 });
var Oa = Da, ka = xr("\n  vec3 evaluateSH1(Gsplat gsplat, usampler2DArray sh1, vec3 viewDir) {\n    // Extract sint7 values packed into 2 x uint32\n    uvec2 packed = texelFetch(sh1, splatTexCoord(gsplat.index), 0).rg;\n    vec3 sh1_0 = vec3(ivec3(\n      int(packed.x << 25u) >> 25,\n      int(packed.x << 18u) >> 25,\n      int(packed.x << 11u) >> 25\n    )) / 63.0;\n    vec3 sh1_1 = vec3(ivec3(\n      int(packed.x << 4u) >> 25,\n      int((packed.x >> 3u) | (packed.y << 29u)) >> 25,\n      int(packed.y << 22u) >> 25\n    )) / 63.0;\n    vec3 sh1_2 = vec3(ivec3(\n      int(packed.y << 15u) >> 25,\n      int(packed.y << 8u) >> 25,\n      int(packed.y << 1u) >> 25\n    )) / 63.0;\n\n    return sh1_0 * (-0.4886025 * viewDir.y)\n      + sh1_1 * (0.4886025 * viewDir.z)\n      + sh1_2 * (-0.4886025 * viewDir.x);\n  }\n"), Aa = xr("\n  vec3 evaluateSH2(Gsplat gsplat, usampler2DArray sh2, vec3 viewDir) {\n    // Extract sint8 values packed into 4 x uint32\n    uvec4 packed = texelFetch(sh2, splatTexCoord(gsplat.index), 0);\n    vec3 sh2_0 = vec3(ivec3(\n      int(packed.x << 24u) >> 24,\n      int(packed.x << 16u) >> 24,\n      int(packed.x << 8u) >> 24\n    )) / 127.0;\n    vec3 sh2_1 = vec3(ivec3(\n      int(packed.x) >> 24,\n      int(packed.y << 24u) >> 24,\n      int(packed.y << 16u) >> 24\n    )) / 127.0;\n    vec3 sh2_2 = vec3(ivec3(\n      int(packed.y << 8u) >> 24,\n      int(packed.y) >> 24,\n      int(packed.z << 24u) >> 24\n    )) / 127.0;\n    vec3 sh2_3 = vec3(ivec3(\n      int(packed.z << 16u) >> 24,\n      int(packed.z << 8u) >> 24,\n      int(packed.z) >> 24\n    )) / 127.0;\n    vec3 sh2_4 = vec3(ivec3(\n      int(packed.w << 24u) >> 24,\n      int(packed.w << 16u) >> 24,\n      int(packed.w << 8u) >> 24\n    )) / 127.0;\n\n    return sh2_0 * (1.0925484 * viewDir.x * viewDir.y)\n      + sh2_1 * (-1.0925484 * viewDir.y * viewDir.z)\n      + sh2_2 * (0.3153915 * (2.0 * viewDir.z * viewDir.z - viewDir.x * viewDir.x - viewDir.y * viewDir.y))\n      + sh2_3 * (-1.0925484 * viewDir.x * viewDir.z)\n      + sh2_4 * (0.5462742 * (viewDir.x * viewDir.x - viewDir.y * viewDir.y));\n  }\n"), ja = xr("\n  vec3 evaluateSH3(Gsplat gsplat, usampler2DArray sh3, vec3 viewDir) {\n    // Extract sint6 values packed into 4 x uint32\n    uvec4 packed = texelFetch(sh3, splatTexCoord(gsplat.index), 0);\n    vec3 sh3_0 = vec3(ivec3(\n      int(packed.x << 26u) >> 26,\n      int(packed.x << 20u) >> 26,\n      int(packed.x << 14u) >> 26\n    )) / 31.0;\n    vec3 sh3_1 = vec3(ivec3(\n      int(packed.x << 8u) >> 26,\n      int(packed.x << 2u) >> 26,\n      int((packed.x >> 4u) | (packed.y << 28u)) >> 26\n    )) / 31.0;\n    vec3 sh3_2 = vec3(ivec3(\n      int(packed.y << 22u) >> 26,\n      int(packed.y << 16u) >> 26,\n      int(packed.y << 10u) >> 26\n    )) / 31.0;\n    vec3 sh3_3 = vec3(ivec3(\n      int(packed.y << 4u) >> 26,\n      int((packed.y >> 2u) | (packed.z << 30u)) >> 26,\n      int(packed.z << 24u) >> 26\n    )) / 31.0;\n    vec3 sh3_4 = vec3(ivec3(\n      int(packed.z << 18u) >> 26,\n      int(packed.z << 12u) >> 26,\n      int(packed.z << 6u) >> 26\n    )) / 31.0;\n    vec3 sh3_5 = vec3(ivec3(\n      int(packed.z) >> 26,\n      int(packed.w << 26u) >> 26,\n      int(packed.w << 20u) >> 26\n    )) / 31.0;\n    vec3 sh3_6 = vec3(ivec3(\n      int(packed.w << 14u) >> 26,\n      int(packed.w << 8u) >> 26,\n      int(packed.w << 2u) >> 26\n    )) / 31.0;\n\n    float xx = viewDir.x * viewDir.x;\n    float yy = viewDir.y * viewDir.y;\n    float zz = viewDir.z * viewDir.z;\n    float xy = viewDir.x * viewDir.y;\n    float yz = viewDir.y * viewDir.z;\n    float zx = viewDir.z * viewDir.x;\n\n    return sh3_0 * (-0.5900436 * viewDir.y * (3.0 * xx - yy))\n      + sh3_1 * (2.8906114 * xy * viewDir.z) +\n      + sh3_2 * (-0.4570458 * viewDir.y * (4.0 * zz - xx - yy))\n      + sh3_3 * (0.3731763 * viewDir.z * (2.0 * zz - 3.0 * xx - 3.0 * yy))\n      + sh3_4 * (-0.4570458 * viewDir.x * (4.0 * zz - xx - yy))\n      + sh3_5 * (1.4453057 * viewDir.z * (xx - yy))\n      + sh3_6 * (-0.5900436 * viewDir.x * (xx - 3.0 * yy));\n  }\n");
function Ma(e, t, n) {
	return vr({
		inTypes: {
			gsplat: wr,
			sh1: "usampler2DArray",
			viewDir: "vec3"
		},
		outTypes: { rgb: "vec3" },
		inputs: {
			gsplat: e,
			sh1: t,
			viewDir: n
		},
		globals: () => [jr, ka],
		statements: ({ inputs: e, outputs: t }) => br(`
        if (isGsplatActive(${e.gsplat}.flags)) {
          ${t.rgb} = evaluateSH1(${e.gsplat}, ${e.sh1}, ${e.viewDir});
        } else {
          ${t.rgb} = vec3(0.0);
        }
      `)
	}).outputs.rgb;
}
function Na(e, t, n) {
	return vr({
		inTypes: {
			gsplat: wr,
			sh2: "usampler2DArray",
			viewDir: "vec3"
		},
		outTypes: { rgb: "vec3" },
		inputs: {
			gsplat: e,
			sh2: t,
			viewDir: n
		},
		globals: () => [jr, Aa],
		statements: ({ inputs: e, outputs: t }) => br(`
        if (isGsplatActive(${e.gsplat}.flags)) {
          ${t.rgb} = evaluateSH2(${e.gsplat}, ${e.sh2}, ${e.viewDir});
        } else {
          ${t.rgb} = vec3(0.0);
        }
      `)
	}).outputs.rgb;
}
function Pa(e, t, n) {
	return vr({
		inTypes: {
			gsplat: wr,
			sh3: "usampler2DArray",
			viewDir: "vec3"
		},
		outTypes: { rgb: "vec3" },
		inputs: {
			gsplat: e,
			sh3: t,
			viewDir: n
		},
		globals: () => [jr, ja],
		statements: ({ inputs: e, outputs: t }) => br(`
        if (isGsplatActive(${e.gsplat}.flags)) {
          ${t.rgb} = evaluateSH3(${e.gsplat}, ${e.sh3}, ${e.viewDir});
        } else {
          ${t.rgb} = vec3(0.0);
        }
      `)
	}).outputs.rgb;
}
var Fa = new c(), Ia = new _e();
function La() {
	let e = new xe(Fa, Ia);
	return e.frustumCulled = !1, e.onBeforeRender = function(e, t) {
		if (!t.isScene) {
			this.removeFromParent();
			return;
		}
		let n = !1;
		t.traverse((e) => {
			e instanceof Uo && (n = !0);
		}), n || t.add(new Uo({ renderer: e })), this.removeFromParent();
	}, e;
}
var Ra = [
	"char",
	"uchar",
	"short",
	"ushort",
	"int",
	"uint",
	"float",
	"double"
], za = class e {
	constructor({ fileBytes: e }) {
		this.header = "", this.littleEndian = !0, this.elements = {}, this.comments = [], this.data = null, this.numSplats = 0, this.fileBytes = e instanceof ArrayBuffer ? new Uint8Array(e) : e;
	}
	async parseHeader() {
		let e = new ReadableStream({ start: (e) => {
			e.enqueue(this.fileBytes.slice(0, 65536)), e.close();
		} }).pipeThrough(new TextDecoderStream()).getReader();
		for (this.header = "";;) {
			let { value: t, done: n } = await e.read();
			if (n) throw Error("Failed to read header");
			this.header += t;
			let r = this.header.indexOf("end_header\n");
			if (r >= 0) {
				this.header = this.header.slice(0, r + 11);
				break;
			}
		}
		let t = new TextEncoder().encode(this.header).length;
		this.data = new DataView(this.fileBytes.buffer, t), this.elements = {};
		let n = null;
		this.comments = [], this.header.trim().split("\n").forEach((e, t) => {
			let r = e.trim();
			if (t === 0) {
				if (r !== "ply") throw Error("Invalid PLY header");
				return;
			}
			if (r.length === 0) return;
			let i = r.split(" ");
			switch (i[0]) {
				case "format":
					if (i[1] === "binary_little_endian") this.littleEndian = !0;
					else if (i[1] === "binary_big_endian") this.littleEndian = !1;
					else throw Error(`Unsupported PLY format: ${i[1]}`);
					if (i[2] !== "1.0") throw Error(`Unsupported PLY version: ${i[2]}`);
					break;
				case "end_header": break;
				case "comment":
					this.comments.push(r.slice(8));
					break;
				case "element": {
					let e = i[1];
					n = {
						name: e,
						count: Number.parseInt(i[2]),
						properties: {}
					}, this.elements[e] = n;
					break;
				}
				case "property":
					if (n == null) throw Error("Property must be inside an element");
					i[1] === "list" ? n.properties[i[4]] = {
						isList: !0,
						type: i[3],
						countType: i[2]
					} : n.properties[i[2]] = {
						isList: !1,
						type: i[1]
					};
			}
		}), this.elements.vertex && (this.numSplats = this.elements.vertex.count);
	}
	parseData(e) {
		let t = 0, n = this.data;
		if (n == null) throw Error("No data to parse");
		for (let r in this.elements) {
			let i = this.elements[r], { count: a, properties: o } = i, s = Ya(o), c = Xa(o, this.littleEndian), l = e(i) ?? (() => {});
			for (let e = 0; e < a; e++) t = c(n, t, s), l(e, s);
		}
	}
	parseSplats(t, n) {
		if (this.elements.vertex == null) throw Error("No vertex element found");
		let r = !1, i = [], a = 0, o = [], s = [], c = [], l, u, d;
		function f() {
			let e = qa[a];
			o = [
				,
				,
				,
			].fill(null).flatMap((t, n) => [
				0,
				1,
				2
			].map((t, r) => n + r * e / 3)), s = [
				,
				,
				,
				,
				,
			].fill(null).flatMap((t, n) => [
				0,
				1,
				2
			].map((t, r) => 3 + n + r * e / 3)), c = Array(7).fill(null).flatMap((t, n) => [
				0,
				1,
				2
			].map((t, r) => 8 + n + r * e / 3)), l = a >= 1 ? /* @__PURE__ */ new Float32Array(9) : void 0, u = a >= 2 ? /* @__PURE__ */ new Float32Array(15) : void 0, d = a >= 3 ? /* @__PURE__ */ new Float32Array(21) : void 0;
		}
		function p(e, t) {
			if (!l) throw Error("Missing sh1");
			let r = t.f_rest;
			for (let e = 0; e < o.length; e++) l[e] = r[o[e]] * 8 / 255 - 4;
			if (u) for (let e = 0; e < s.length; e++) u[e] = r[s[e]] * 8 / 255 - 4;
			if (d) for (let e = 0; e < c.length; e++) d[e] = r[c[e]] * 8 / 255 - 4;
			n?.(e, l, u, d);
		}
		function m(e) {
			let { min_x: t, min_y: n, min_z: a, max_x: o, max_y: s, max_z: c, min_scale_x: l, min_scale_y: u, min_scale_z: d, max_scale_x: f, max_scale_y: p, max_scale_z: m } = e.properties;
			if (!t || !n || !a || !o || !s || !c || !l || !u || !d || !f || !p || !m) throw Error("Missing PLY chunk properties");
			return r = !0, (e, t) => {
				let { min_x: n, min_y: r, min_z: a, max_x: o, max_y: s, max_z: c, min_scale_x: l, min_scale_y: u, min_scale_z: d, max_scale_x: f, max_scale_y: p, max_scale_z: m, min_r: h, min_g: g, min_b: _, max_r: v, max_g: y, max_b: b } = t;
				i.push({
					min_x: n,
					min_y: r,
					min_z: a,
					max_x: o,
					max_y: s,
					max_z: c,
					min_scale_x: l,
					min_scale_y: u,
					min_scale_z: d,
					max_scale_x: f,
					max_scale_y: p,
					max_scale_z: m,
					min_r: h,
					min_g: g,
					min_b: _,
					max_r: v,
					max_g: y,
					max_b: b
				});
			};
		}
		function h(e) {
			if (n && e.name === "sh") return a = no(e.properties), f(), p;
			if (e.name !== "vertex") return null;
			let { packed_position: r, packed_rotation: o, packed_scale: s, packed_color: c } = e.properties;
			if (!r || !o || !s || !c) throw Error("Missing PLY properties: packed_position, packed_rotation, packed_scale, packed_color");
			let l = Math.sqrt(2);
			return (e, n) => {
				let r = i[e >>> 8];
				if (r == null) throw Error("Missing PLY chunk");
				let { min_x: a, min_y: o, min_z: s, max_x: c, max_y: u, max_z: d, min_scale_x: f, min_scale_y: p, min_scale_z: m, max_scale_x: h, max_scale_y: g, max_scale_z: _, min_r: v, min_g: y, min_b: b, max_r: x, max_g: S, max_b: C } = r, { packed_position: w, packed_rotation: T, packed_scale: E, packed_color: D } = n, O = (w >>> 21 & 2047) / 2047 * (c - a) + a, k = (w >>> 11 & 1023) / 1023 * (u - o) + o, A = (w & 2047) / 2047 * (d - s) + s, j = ((T >>> 20 & 1023) / 1023 - .5) * l, M = ((T >>> 10 & 1023) / 1023 - .5) * l, N = ((T & 1023) / 1023 - .5) * l, P = Math.sqrt(Math.max(0, 1 - j * j - M * M - N * N)), F = T >>> 30, I = F === 0 ? j : F === 1 ? P : M, L = F <= 1 ? M : F === 2 ? P : N, R = F <= 2 ? N : P, z = F === 0 ? P : j, B = Math.exp((E >>> 21 & 2047) / 2047 * (h - f) + f), ee = Math.exp((E >>> 11 & 1023) / 1023 * (g - p) + p), te = Math.exp((E & 2047) / 2047 * (_ - m) + m), V = (D >>> 24 & 255) / 255 * ((x ?? 1) - (v ?? 0)) + (v ?? 0), ne = (D >>> 16 & 255) / 255 * ((S ?? 1) - (y ?? 0)) + (y ?? 0), re = (D >>> 8 & 255) / 255 * ((C ?? 1) - (b ?? 0)) + (b ?? 0);
				t(e, O, k, A, B, ee, te, I, L, R, z, (D & 255) / 255, V, ne, re);
			};
		}
		this.parseData((i) => {
			if (i.name === "chunk") return m(i);
			if (r) return h(i);
			if (i.name !== "vertex") return null;
			let { x: p, y: g, z: _, scale_0: v, scale_1: y, scale_2: b, rot_0: x, rot_1: S, rot_2: C, rot_3: w, opacity: T, f_dc_0: E, f_dc_1: D, f_dc_2: O, red: k, green: A, blue: j, alpha: M } = i.properties;
			if (!p || !g || !_) throw Error("Missing PLY properties: x, y, z");
			let N = v && y && b, P = x && S && C && w, F = M == null ? 1 : Ga[M.type], I = k == null ? 1 : Ga[k.type], L = A == null ? 1 : Ga[A.type], R = j == null ? 1 : Ga[j.type];
			return a = no(i.properties), f(), (r, i) => {
				let a = N ? Math.exp(i.scale_0) : e.defaultPointScale, f = N ? Math.exp(i.scale_1) : e.defaultPointScale, p = N ? Math.exp(i.scale_2) : e.defaultPointScale, m = P ? i.rot_1 : 0, h = P ? i.rot_2 : 0, g = P ? i.rot_3 : 0, _ = P ? i.rot_0 : 1, v = T == null ? M == null ? 1 : i.alpha / F : 1 / (1 + Math.exp(-i.opacity)), y = E == null ? k == null ? 1 : i.red / I : i.f_dc_0 * Va + .5, b = D == null ? A == null ? 1 : i.green / L : i.f_dc_1 * Va + .5, x = O == null ? j == null ? 1 : i.blue / R : i.f_dc_2 * Va + .5;
				if (t(r, i.x, i.y, i.z, a, f, p, m, h, g, _, v, y, b, x), n && l) {
					let e = i.f_rest;
					if (l) for (let t = 0; t < o.length; t++) l[t] = e[o[t]];
					if (u) for (let t = 0; t < s.length; t++) u[t] = e[s[t]];
					if (d) for (let t = 0; t < c.length; t++) d[t] = e[c[t]];
					n(r, l, u, d);
				}
			};
		});
	}
	injectRgba(e) {
		let t = 0, n = this.data;
		if (n == null) throw Error("No parsed data");
		if (e.length !== this.numSplats * 4) throw Error("Invalid RGBA array length");
		for (let r in this.elements) {
			let { count: i, properties: a } = this.elements[r], o = [], s = 0, c = r === "vertex";
			if (c) {
				for (let e of [
					"opacity",
					"f_dc_0",
					"f_dc_1",
					"f_dc_2"
				]) if (!a[e] || a[e].type !== "float") throw Error(`Can't injectRgba due to property: ${e}`);
			}
			for (let [r, i] of Object.entries(a)) if (i.isList) o.push(() => {
				let e = Ha[i.countType](n, t, this.littleEndian);
				t += Wa[i.countType], t += e * Wa[i.type];
			});
			else {
				if (c) {
					if (r === "f_dc_0" || r === "f_dc_1" || r === "f_dc_2") {
						let a = Number.parseInt(r.slice(5));
						o.push(() => {
							let r = (e[s + a] / 255 - .5) / Va;
							Ua[i.type](n, t, this.littleEndian, r);
						});
					} else r === "opacity" && o.push(() => {
						let r = Math.max(-100, Math.min(100, -Math.log(1 / (e[s + 3] / 255) - 1)));
						Ua[i.type](n, t, this.littleEndian, r);
					});
				}
				o.push(() => {
					t += Wa[i.type];
				});
			}
			for (let e = 0; e < i; e++) {
				for (let e of o) e();
				c && (s += 4);
			}
		}
	}
};
za.defaultPointScale = .001;
var Ba = za, Va = .28209479177387814, Ha = {
	char: (e, t, n) => e.getInt8(t),
	uchar: (e, t, n) => e.getUint8(t),
	short: (e, t, n) => e.getInt16(t, n),
	ushort: (e, t, n) => e.getUint16(t, n),
	int: (e, t, n) => e.getInt32(t, n),
	uint: (e, t, n) => e.getUint32(t, n),
	float: (e, t, n) => e.getFloat32(t, n),
	double: (e, t, n) => e.getFloat64(t, n)
}, Ua = {
	char: (e, t, n, r) => {
		e.setInt8(t, r);
	},
	uchar: (e, t, n, r) => {
		e.setUint8(t, r);
	},
	short: (e, t, n, r) => {
		e.setInt16(t, r, n);
	},
	ushort: (e, t, n, r) => {
		e.setUint16(t, r, n);
	},
	int: (e, t, n, r) => {
		e.setInt32(t, r, n);
	},
	uint: (e, t, n, r) => {
		e.setUint32(t, r, n);
	},
	float: (e, t, n, r) => {
		e.setFloat32(t, r, n);
	},
	double: (e, t, n, r) => {
		e.setFloat64(t, r, n);
	}
}, Wa = {
	char: 1,
	uchar: 1,
	short: 2,
	ushort: 2,
	int: 4,
	uint: 4,
	float: 4,
	double: 8
}, Ga = {
	char: 127,
	uchar: 255,
	short: 32767,
	ushort: 65535,
	int: 2147483647,
	uint: 4294967295,
	float: 1,
	double: 1
}, Ka = {
	0: 0,
	9: 1,
	24: 2,
	45: 3
}, qa = {
	0: 0,
	1: 9,
	2: 24,
	3: 45
}, Ja = /^f_rest_([0-9]{1,2})$/;
function Ya(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) Ja.test(n) ? t.f_rest = Array(no(e)) : t[n] = r.isList ? [] : 0;
	return t;
}
function Xa(e, t) {
	return $a(e) ? eo(e, t) : to(e, t);
}
var Za = (() => {
	try {
		Function("return 42;");
	} catch {
		return !1;
	}
	return !0;
})(), Qa = /^[a-zA-Z0-9_]+$/;
function $a(e) {
	if (!Za) return !1;
	for (let [t, n] of Object.entries(e)) if (!Qa.test(t) || n.isList && !Ra.includes(n.countType) || !Ra.includes(n.type)) return !1;
	return !0;
}
function eo(e, t) {
	let n = ["let list;"];
	for (let [r, i] of Object.entries(e)) {
		let e = r.match(Ja);
		if (e) {
			let r = +e[1];
			n.push(`
        item.f_rest[${r}] = PARSE_FIELD['${i.type}'](data, offset, ${t});
        offset += ${Wa[i.type]};
      `);
		} else i.isList ? n.push(`
        list = item['${r}'];
        list.length = PARSE_FIELD['${i.countType}'](data, offset, ${t});
        offset += ${Wa[i.countType]};
        for (let i = 0; i < list.length; i++) {
          list[i] = PARSE_FIELD['${i.type}'](data, offset, ${t});
          offset += ${Wa[i.type]};
        }
      `) : n.push(`
        item['${r}'] = PARSE_FIELD['${i.type}'](data, offset, ${t});
        offset += ${Wa[i.type]};
      `);
	}
	n.push("return offset;");
	let r = Function("data", "offset", "item", "PARSE_FIELD", n.join("\n"));
	return (e, t, n) => r(e, t, n, Ha);
}
function to(e, t) {
	let n = [];
	for (let [r, i] of Object.entries(e)) {
		let e = r.match(Ja);
		if (e) {
			let r = +e[1];
			n.push((e, n, a) => (a.f_rest[r] = Ha[i.type](e, n, t), n + Wa[i.type]));
		} else i.isList ? n.push((e, n, a) => {
			let o = a[r];
			o.length = Ha[i.countType](e, n, t);
			let s = n + Wa[i.countType];
			for (let n = 0; n < o.length; n++) o[n] = Ha[i.type](e, s, t), s += Wa[i.type];
			return s;
		}) : n.push((e, n, a) => (a[r] = Ha[i.type](e, n, t), n + Wa[i.type]));
	}
	return (e, t, r) => {
		let i = t;
		for (let t = 0; t < n.length; t++) i = n[t](e, i, r);
		return i;
	};
}
function no(e) {
	let t = 0;
	for (; e[`f_rest_${t}`];) t += 1;
	let n = Ka[t];
	if (n == null) throw Error(`Unsupported number of SH coefficients: ${t}`);
	return n;
}
var ro = "(function() {\n  \"use strict\";\n  let wasm;\n  const cachedTextDecoder = typeof TextDecoder !== \"undefined\" ? new TextDecoder(\"utf-8\", { ignoreBOM: true, fatal: true }) : { decode: () => {\n    throw Error(\"TextDecoder not available\");\n  } };\n  if (typeof TextDecoder !== \"undefined\") {\n    cachedTextDecoder.decode();\n  }\n  let cachedUint8ArrayMemory0 = null;\n  function getUint8ArrayMemory0() {\n    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {\n      cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8ArrayMemory0;\n  }\n  function getStringFromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));\n  }\n  function sort_splats(num_splats, readback, ordering) {\n    const ret = wasm.sort_splats(num_splats, readback, ordering);\n    return ret >>> 0;\n  }\n  function sort32_splats(num_splats, readback, ordering) {\n    const ret = wasm.sort32_splats(num_splats, readback, ordering);\n    return ret >>> 0;\n  }\n  async function __wbg_load(module, imports) {\n    if (typeof Response === \"function\" && module instanceof Response) {\n      if (typeof WebAssembly.instantiateStreaming === \"function\") {\n        try {\n          return await WebAssembly.instantiateStreaming(module, imports);\n        } catch (e) {\n          if (module.headers.get(\"Content-Type\") != \"application/wasm\") {\n            console.warn(\"`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n\", e);\n          } else {\n            throw e;\n          }\n        }\n      }\n      const bytes = await module.arrayBuffer();\n      return await WebAssembly.instantiate(bytes, imports);\n    } else {\n      const instance = await WebAssembly.instantiate(module, imports);\n      if (instance instanceof WebAssembly.Instance) {\n        return { instance, module };\n      } else {\n        return instance;\n      }\n    }\n  }\n  function __wbg_get_imports() {\n    const imports = {};\n    imports.wbg = {};\n    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {\n      const ret = arg0.buffer;\n      return ret;\n    };\n    imports.wbg.__wbg_length_3b4f022188ae8db6 = function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    };\n    imports.wbg.__wbg_length_6ca527665d89694d = function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    };\n    imports.wbg.__wbg_length_8cfd2c6409af88ad = function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    };\n    imports.wbg.__wbg_new_9fee97a409b32b68 = function(arg0) {\n      const ret = new Uint16Array(arg0);\n      return ret;\n    };\n    imports.wbg.__wbg_new_e3b321dcfef89fc7 = function(arg0) {\n      const ret = new Uint32Array(arg0);\n      return ret;\n    };\n    imports.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354 = function(arg0, arg1, arg2) {\n      const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212 = function(arg0, arg1, arg2) {\n      const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbg_newwithlength_5a5efe313cfd59f1 = function(arg0) {\n      const ret = new Float32Array(arg0 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbg_set_10bad9bee0e9c58b = function(arg0, arg1, arg2) {\n      arg0.set(arg1, arg2 >>> 0);\n    };\n    imports.wbg.__wbg_set_d23661d19148b229 = function(arg0, arg1, arg2) {\n      arg0.set(arg1, arg2 >>> 0);\n    };\n    imports.wbg.__wbg_set_f4f1f0daa30696fc = function(arg0, arg1, arg2) {\n      arg0.set(arg1, arg2 >>> 0);\n    };\n    imports.wbg.__wbg_subarray_3aaeec89bb2544f0 = function(arg0, arg1, arg2) {\n      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbg_subarray_769e1e0f81bb259b = function(arg0, arg1, arg2) {\n      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbindgen_init_externref_table = function() {\n      const table = wasm.__wbindgen_export_0;\n      const offset = table.grow(4);\n      table.set(0, void 0);\n      table.set(offset + 0, void 0);\n      table.set(offset + 1, null);\n      table.set(offset + 2, true);\n      table.set(offset + 3, false);\n    };\n    imports.wbg.__wbindgen_memory = function() {\n      const ret = wasm.memory;\n      return ret;\n    };\n    imports.wbg.__wbindgen_throw = function(arg0, arg1) {\n      throw new Error(getStringFromWasm0(arg0, arg1));\n    };\n    return imports;\n  }\n  function __wbg_finalize_init(instance, module) {\n    wasm = instance.exports;\n    __wbg_init.__wbindgen_wasm_module = module;\n    cachedUint8ArrayMemory0 = null;\n    wasm.__wbindgen_start();\n    return wasm;\n  }\n  async function __wbg_init(module_or_path) {\n    if (wasm !== void 0) return wasm;\n    if (typeof module_or_path !== \"undefined\") {\n      if (Object.getPrototypeOf(module_or_path) === Object.prototype) {\n        ({ module_or_path } = module_or_path);\n      } else {\n        console.warn(\"using deprecated parameters for the initialization function; pass a single object instead\");\n      }\n    }\n    if (typeof module_or_path === \"undefined\") {\n      module_or_path = new URL(\"data:application/wasm;base64,AGFzbQEAAAABzAEeYAJ/fwF/YAJ/fwBgA39/fwF/YAF/AX9gA39/fwBgAX8AYAV/f39/fwBgA29/fwFvYAV/f39/fwF/YAFvAW9gA29vfwBgAW8Bf2AAAX9gBH9/f38AYAAAYAR/f39/AX9gA39vbwF/YAF/AW9gAAFvYAF9AX1gBn9/f39/fwBgDX19fX19fX19f29/fX0Bb2AGf39/f39/AX9gBX9/fH9/AGAEf3x/fwBgBX9/fX9/AGAEf31/fwBgBX9/fn9/AGAEf35/fwBgAn19AX0C8gQRA3diZx1fX3diZ19idWZmZXJfNjA5Y2MzZWVlNTFlZDE1OAAJA3diZxpfX3diZ19uZXdfOWZlZTk3YTQwOWIzMmI2OAAJA3diZxpfX3diZ19zZXRfZjRmMWYwZGFhMzA2OTZmYwAKA3diZx1fX3diZ19sZW5ndGhfOGNmZDJjNjQwOWFmODhhZAALA3diZzFfX3diZ19uZXd3aXRoYnl0ZW9mZnNldGFuZGxlbmd0aF9mMWRlYWQ0NGQxZmM3MjEyAAcDd2JnGl9fd2JnX25ld19lM2IzMjFkY2ZlZjg5ZmM3AAkDd2JnGl9fd2JnX3NldF9kMjM2NjFkMTkxNDhiMjI5AAoDd2JnHV9fd2JnX2xlbmd0aF82Y2E1Mjc2NjVkODk2OTRkAAsDd2JnMV9fd2JnX25ld3dpdGhieXRlb2Zmc2V0YW5kbGVuZ3RoX2U2YjdlNjlhY2Q0YzczNTQABwN3YmcaX193Ymdfc2V0XzEwYmFkOWJlZTBlOWM1OGIACgN3YmcdX193YmdfbGVuZ3RoXzNiNGYwMjIxODhhZThkYjYACwN3YmcfX193Ymdfc3ViYXJyYXlfNzY5ZTFlMGY4MWJiMjU5YgAHA3diZx9fX3diZ19zdWJhcnJheV8zYWFlZWM4OWJiMjU0NGYwAAcDd2JnJF9fd2JnX25ld3dpdGhsZW5ndGhfNWE1ZWZlMzEzY2ZkNTlmMQARA3diZxBfX3diaW5kZ2VuX3Rocm93AAEDd2JnEV9fd2JpbmRnZW5fbWVtb3J5ABIDd2JnH19fd2JpbmRnZW5faW5pdF9leHRlcm5yZWZfdGFibGUADgNhYAMAAQIIBQQCEwEMAAEBAgAAAQwBBAYFBQQAAQYFFAENBAAGBQQEAQQOAgECAQAIBAAVARYGCBcZGwUNAhAQBR0FAQMPAAIDAwMADAAAAQEBAAAABAECAAEAAQAAAQEDAwQJAnABLi5vAIABBQMBABEGCQF/AUGAgMAACwdiBgZtZW1vcnkCAAtzb3J0X3NwbGF0cwBNDXNvcnQzMl9zcGxhdHMATg5yYXljYXN0X3NwbGF0cwBCE19fd2JpbmRnZW5fZXhwb3J0XzABARBfX3diaW5kZ2VuX3N0YXJ0ABAJMwEAQQELLVhZV1xBZ0YuRUZETEtFRUhHST5RN086IWlfXmE7YGpKMiQrbk88IGtsVVpiYwrF3wFghCQCCX8BfiMAQRBrIggkAAJ/AkACQAJAAkACQAJAIABB9QFPBEBBACAAQc3/e08NBxogAEELaiIBQXhxIQVB7JbAACgCACIJRQ0EQR8hB0EAIAVrIQQgAEH0//8HTQRAIAVBBiABQQh2ZyIAa3ZBAXEgAEEBdGtBPmohBwsgB0ECdEHQk8AAaigCACIBRQRAQQAhAAwCC0EAIQAgBUEZIAdBAXZrQQAgB0EfRxt0IQMDQAJAIAEoAgRBeHEiBiAFSQ0AIAYgBWsiBiAETw0AIAEhAiAGIgQNAEEAIQQgASEADAQLIAEoAhQiBiAAIAYgASADQR12QQRxakEQaigCACIBRxsgACAGGyEAIANBAXQhAyABDQALDAELQeiWwAAoAgAiAkEQIABBC2pB+ANxIABBC0kbIgVBA3YiAHYiAUEDcQRAAkAgAUF/c0EBcSAAaiIGQQN0IgBB4JTAAGoiAyAAQeiUwABqKAIAIgEoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQeiWwAAgAkF+IAZ3cTYCAAsgASAAQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIEIAFBCGoMBwsgBUHwlsAAKAIATQ0DAkACQCABRQRAQeyWwAAoAgAiAEUNBiAAaEECdEHQk8AAaigCACICKAIEQXhxIAVrIQQgAiEBA0ACQCACKAIQIgANACACKAIUIgANACABKAIYIQcCQAJAIAEgASgCDCIARgRAIAFBFEEQIAEoAhQiABtqKAIAIgINAUEAIQAMAgsgASgCCCICIAA2AgwgACACNgIIDAELIAFBFGogAUEQaiAAGyEDA0AgAyEGIAIiAEEUaiAAQRBqIAAoAhQiAhshAyAAQRRBECACG2ooAgAiAg0ACyAGQQA2AgALIAdFDQQgASABKAIcQQJ0QdCTwABqIgIoAgBHBEAgB0EQQRQgBygCECABRhtqIAA2AgAgAEUNBQwECyACIAA2AgAgAA0DQeyWwABB7JbAACgCAEF+IAEoAhx3cTYCAAwECyAAKAIEQXhxIAVrIgIgBCACIARJIgIbIQQgACABIAIbIQEgACECDAALAAsCQEECIAB0IgNBACADa3IgASAAdHFoIgZBA3QiAUHglMAAaiIDIAFB6JTAAGooAgAiACgCCCIERwRAIAQgAzYCDCADIAQ2AggMAQtB6JbAACACQX4gBndxNgIACyAAIAVBA3I2AgQgACAFaiIGIAEgBWsiA0EBcjYCBCAAIAFqIAM2AgBB8JbAACgCACIEBEAgBEF4cUHglMAAaiEBQfiWwAAoAgAhAgJ/QeiWwAAoAgAiBUEBIARBA3Z0IgRxRQRAQeiWwAAgBCAFcjYCACABDAELIAEoAggLIQQgASACNgIIIAQgAjYCDCACIAE2AgwgAiAENgIIC0H4lsAAIAY2AgBB8JbAACADNgIAIABBCGoMCAsgACAHNgIYIAEoAhAiAgRAIAAgAjYCECACIAA2AhgLIAEoAhQiAkUNACAAIAI2AhQgAiAANgIYCwJAAkAgBEEQTwRAIAEgBUEDcjYCBCABIAVqIgMgBEEBcjYCBCADIARqIAQ2AgBB8JbAACgCACIGRQ0BIAZBeHFB4JTAAGohAEH4lsAAKAIAIQICf0HolsAAKAIAIgVBASAGQQN2dCIGcUUEQEHolsAAIAUgBnI2AgAgAAwBCyAAKAIICyEGIAAgAjYCCCAGIAI2AgwgAiAANgIMIAIgBjYCCAwBCyABIAQgBWoiAEEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAwBC0H4lsAAIAM2AgBB8JbAACAENgIACyABQQhqDAYLIAAgAnJFBEBBACECQQIgB3QiAEEAIABrciAJcSIARQ0DIABoQQJ0QdCTwABqKAIAIQALIABFDQELA0AgACACIAAoAgRBeHEiAyAFayIGIARJIgcbIQkgACgCECIBRQRAIAAoAhQhAQsgAiAJIAMgBUkiABshAiAEIAYgBCAHGyAAGyEEIAEiAA0ACwsgAkUNACAFQfCWwAAoAgAiAE0gBCAAIAVrT3ENACACKAIYIQcCQAJAIAIgAigCDCIARgRAIAJBFEEQIAIoAhQiABtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAJBFGogAkEQaiAAGyEDA0AgAyEGIAEiAEEUaiAAQRBqIAAoAhQiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQIgAiACKAIcQQJ0QdCTwABqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNAwwCCyABIAA2AgAgAA0BQeyWwABB7JbAACgCAEF+IAIoAhx3cTYCAAwCCwJAAkACQAJAAkAgBUHwlsAAKAIAIgFLBEAgBUH0lsAAKAIAIgBPBEAgBUGvgARqQYCAfHEiAkEQdkAAIQAgCEEEaiIBQQA2AgggAUEAIAJBgIB8cSAAQX9GIgIbNgIEIAFBACAAQRB0IAIbNgIAQQAgCCgCBCIBRQ0JGiAIKAIMIQZBgJfAACAIKAIIIgRBgJfAACgCAGoiADYCAEGEl8AAQYSXwAAoAgAiAiAAIAAgAkkbNgIAAkACQEH8lsAAKAIAIgIEQEHQlMAAIQADQCABIAAoAgAiAyAAKAIEIgdqRg0CIAAoAggiAA0ACwwCC0GMl8AAKAIAIgBBACAAIAFNG0UEQEGMl8AAIAE2AgALQZCXwABB/x82AgBB3JTAACAGNgIAQdSUwAAgBDYCAEHQlMAAIAE2AgBB7JTAAEHglMAANgIAQfSUwABB6JTAADYCAEHolMAAQeCUwAA2AgBB/JTAAEHwlMAANgIAQfCUwABB6JTAADYCAEGElcAAQfiUwAA2AgBB+JTAAEHwlMAANgIAQYyVwABBgJXAADYCAEGAlcAAQfiUwAA2AgBBlJXAAEGIlcAANgIAQYiVwABBgJXAADYCAEGclcAAQZCVwAA2AgBBkJXAAEGIlcAANgIAQaSVwABBmJXAADYCAEGYlcAAQZCVwAA2AgBBrJXAAEGglcAANgIAQaCVwABBmJXAADYCAEGolcAAQaCVwAA2AgBBtJXAAEGolcAANgIAQbCVwABBqJXAADYCAEG8lcAAQbCVwAA2AgBBuJXAAEGwlcAANgIAQcSVwABBuJXAADYCAEHAlcAAQbiVwAA2AgBBzJXAAEHAlcAANgIAQciVwABBwJXAADYCAEHUlcAAQciVwAA2AgBB0JXAAEHIlcAANgIAQdyVwABB0JXAADYCAEHYlcAAQdCVwAA2AgBB5JXAAEHYlcAANgIAQeCVwABB2JXAADYCAEHslcAAQeCVwAA2AgBB9JXAAEHolcAANgIAQeiVwABB4JXAADYCAEH8lcAAQfCVwAA2AgBB8JXAAEHolcAANgIAQYSWwABB+JXAADYCAEH4lcAAQfCVwAA2AgBBjJbAAEGAlsAANgIAQYCWwABB+JXAADYCAEGUlsAAQYiWwAA2AgBBiJbAAEGAlsAANgIAQZyWwABBkJbAADYCAEGQlsAAQYiWwAA2AgBBpJbAAEGYlsAANgIAQZiWwABBkJbAADYCAEGslsAAQaCWwAA2AgBBoJbAAEGYlsAANgIAQbSWwABBqJbAADYCAEGolsAAQaCWwAA2AgBBvJbAAEGwlsAANgIAQbCWwABBqJbAADYCAEHElsAAQbiWwAA2AgBBuJbAAEGwlsAANgIAQcyWwABBwJbAADYCAEHAlsAAQbiWwAA2AgBB1JbAAEHIlsAANgIAQciWwABBwJbAADYCAEHclsAAQdCWwAA2AgBB0JbAAEHIlsAANgIAQeSWwABB2JbAADYCAEHYlsAAQdCWwAA2AgBB/JbAACABQQ9qQXhxIgBBCGsiAjYCAEHglsAAQdiWwAA2AgBB9JbAACAEQShrIgMgASAAa2pBCGoiADYCACACIABBAXI2AgQgASADakEoNgIEQYiXwABBgICAATYCAAwICyACIANJIAEgAk1yDQAgACgCDCIDQQFxDQAgA0EBdiAGRg0DC0GMl8AAQYyXwAAoAgAiACABIAAgAUkbNgIAIAEgBGohA0HQlMAAIQACQAJAA0AgAyAAKAIAIgdHBEAgACgCCCIADQEMAgsLIAAoAgwiA0EBcQ0AIANBAXYgBkYNAQtB0JTAACEAA0ACQCACIAAoAgAiA08EQCACIAMgACgCBGoiB0kNAQsgACgCCCEADAELC0H8lsAAIAFBD2pBeHEiAEEIayIDNgIAQfSWwAAgBEEoayIJIAEgAGtqQQhqIgA2AgAgAyAAQQFyNgIEIAEgCWpBKDYCBEGIl8AAQYCAgAE2AgAgAiAHQSBrQXhxQQhrIgAgACACQRBqSRsiA0EbNgIEQdCUwAApAgAhCiADQRBqQdiUwAApAgA3AgAgAyAKNwIIQdyUwAAgBjYCAEHUlMAAIAQ2AgBB0JTAACABNgIAQdiUwAAgA0EIajYCACADQRxqIQADQCAAQQc2AgAgAEEEaiIAIAdJDQALIAIgA0YNByADIAMoAgRBfnE2AgQgAiADIAJrIgBBAXI2AgQgAyAANgIAIABBgAJPBEAgAiAAECIMCAsgAEH4AXFB4JTAAGohAQJ/QeiWwAAoAgAiA0EBIABBA3Z0IgBxRQRAQeiWwAAgACADcjYCACABDAELIAEoAggLIQAgASACNgIIIAAgAjYCDCACIAE2AgwgAiAANgIIDAcLIAAgATYCACAAIAAoAgQgBGo2AgQgAUEPakF4cUEIayICIAVBA3I2AgQgB0EPakF4cUEIayIEIAIgBWoiAGshBSAEQfyWwAAoAgBGDQMgBEH4lsAAKAIARg0EIAQoAgQiAUEDcUEBRgRAIAQgAUF4cSIBEB4gASAFaiEFIAEgBGoiBCgCBCEBCyAEIAFBfnE2AgQgACAFQQFyNgIEIAAgBWogBTYCACAFQYACTwRAIAAgBRAiDAYLIAVB+AFxQeCUwABqIQECf0HolsAAKAIAIgNBASAFQQN2dCIEcUUEQEHolsAAIAMgBHI2AgAgAQwBCyABKAIICyEDIAEgADYCCCADIAA2AgwgACABNgIMIAAgAzYCCAwFC0H0lsAAIAAgBWsiATYCAEH8lsAAQfyWwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQgAEEIagwIC0H4lsAAKAIAIQACQCABIAVrIgJBD00EQEH4lsAAQQA2AgBB8JbAAEEANgIAIAAgAUEDcjYCBCAAIAFqIgEgASgCBEEBcjYCBAwBC0HwlsAAIAI2AgBB+JbAACAAIAVqIgM2AgAgAyACQQFyNgIEIAAgAWogAjYCACAAIAVBA3I2AgQLIABBCGoMBwsgACAEIAdqNgIEQfyWwABB/JbAACgCACIAQQ9qQXhxIgFBCGsiAjYCAEH0lsAAQfSWwAAoAgAgBGoiAyAAIAFrakEIaiIBNgIAIAIgAUEBcjYCBCAAIANqQSg2AgRBiJfAAEGAgIABNgIADAMLQfyWwAAgADYCAEH0lsAAQfSWwAAoAgAgBWoiATYCACAAIAFBAXI2AgQMAQtB+JbAACAANgIAQfCWwABB8JbAACgCACAFaiIBNgIAIAAgAUEBcjYCBCAAIAFqIAE2AgALIAJBCGoMAwtBAEH0lsAAKAIAIgAgBU0NAhpB9JbAACAAIAVrIgE2AgBB/JbAAEH8lsAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEIABBCGoMAgsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAIARBEE8EQCACIAVBA3I2AgQgAiAFaiIAIARBAXI2AgQgACAEaiAENgIAIARBgAJPBEAgACAEECIMAgsgBEH4AXFB4JTAAGohAQJ/QeiWwAAoAgAiA0EBIARBA3Z0IgRxRQRAQeiWwAAgAyAEcjYCACABDAELIAEoAggLIQMgASAANgIIIAMgADYCDCAAIAE2AgwgACADNgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqCyAIQRBqJAALxgYBCH8CQAJAIAEgAEEDakF8cSICIABrIghJDQAgASAIayIGQQRJDQAgBkEDcSEHQQAhAQJAIAAgAkYiCQ0AAkAgACACayIEQXxLBEBBACECDAELQQAhAgNAIAEgACACaiIDLAAAQb9/SmogA0EBaiwAAEG/f0pqIANBAmosAABBv39KaiADQQNqLAAAQb9/SmohASACQQRqIgINAAsLIAkNACAAIAJqIQMDQCABIAMsAABBv39KaiEBIANBAWohAyAEQQFqIgQNAAsLIAAgCGohAgJAIAdFDQAgAiAGQXxxaiIALAAAQb9/SiEFIAdBAUYNACAFIAAsAAFBv39KaiEFIAdBAkYNACAFIAAsAAJBv39KaiEFCyAGQQJ2IQYgASAFaiEEA0AgAiEAIAZFDQJBwAEgBiAGQcABTxsiBUEDcSEHIAVBAnQhCEEAIQMgBkEETwRAIAAgCEHwB3FqIQkgACEBA0AgASgCACICQX9zQQd2IAJBBnZyQYGChAhxIANqIAEoAgQiAkF/c0EHdiACQQZ2ckGBgoQIcWogASgCCCICQX9zQQd2IAJBBnZyQYGChAhxaiABKAIMIgJBf3NBB3YgAkEGdnJBgYKECHFqIQMgAUEQaiIBIAlHDQALCyAGIAVrIQYgACAIaiECIANBCHZB/4H8B3EgA0H/gfwHcWpBgYAEbEEQdiAEaiEEIAdFDQALAn8gACAFQfwBcUECdGoiACgCACIBQX9zQQd2IAFBBnZyQYGChAhxIgEgB0EBRg0AGiABIAAoAgQiAUF/c0EHdiABQQZ2ckGBgoQIcWoiASAHQQJGDQAaIAAoAggiAEF/c0EHdiAAQQZ2ckGBgoQIcSABagsiAUEIdkH/gRxxIAFB/4H8B3FqQYGABGxBEHYgBGoPCyABRQRAQQAPCyABQQNxIQICQCABQQRJBEAMAQsgAUF8cSEFA0AgBCAAIANqIgEsAABBv39KaiABQQFqLAAAQb9/SmogAUECaiwAAEG/f0pqIAFBA2osAABBv39KaiEEIAUgA0EEaiIDRw0ACwsgAkUNACAAIANqIQEDQCAEIAEsAABBv39KaiEEIAFBAWohASACQQFrIgINAAsLIAQL3QUBBX8gACgCCCIDIAFJBEAgASADIgJrIgQgACgCACACa0sEQCAAIAIgBEEEQQQQJiAAKAIIIQILIAAoAgQiBiACQQJ0aiEFIARBAk8EQCAFIANBf3MgAWpBAnQQKhogASACakECdCADQQJ0ayAGakEEayEFIAIgBGpBAWshAgsgBUEANgIAIAAgAkEBajYCCAsgACgCFCIDIAFJBEAgASADIgJrIgQgACgCDCACa0sEQCAAQQxqIAIgBEEEQQQQJiAAKAIUIQILIAAoAhAiBiACQQJ0aiEFIARBAk8EQCAFIANBf3MgAWpBAnQQKhogASACakECdCADQQJ0ayAGakEEayEFIAIgBGpBAWshAgsgBUEANgIAIAAgAkEBajYCFAsgACgCOCIDIAFJBEAgASADIgJrIgQgACgCMCACa0sEQCAAQTBqIAIgBEEEQQQQJiAAKAI4IQILIAAoAjQiBiACQQJ0aiEFIARBAk8EQCAFIANBf3MgAWpBAnQQKhogASACakECdCADQQJ0ayAGakEEayEFIAIgBGpBAWshAgsgBUEANgIAIAAgAkEBajYCOAsgACgCICIDQf//A00EQCADIQFBgIAEIANrIgIgACgCGCADa0sEQCAAQRhqIAMgAkEEQQQQJiAAKAIgIQELIAAoAhwiBSABQQJ0IgRqIQIgA0H//wNHBEAgAkH8/w8gA0ECdCICaxAqGiAEIAJrIAVqQfz/D2ohAiABIANrQf//A2ohAQsgAkEANgIAIAAgAUEBajYCIAsgACgCLCIDQf//A00EQCADIQFBgIAEIANrIgIgACgCJCADa0sEQCAAQSRqIAMgAkEEQQQQJiAAKAIsIQELIAAoAigiBSABQQJ0IgRqIQIgA0H//wNHBEAgAkH8/w8gA0ECdCICaxAqGiAEIAJrIAVqQfz/D2ohAiABIANrQf//A2ohAQsgAkEANgIAIAAgAUEBajYCLAsLqQUBB38CQCAAKAIIQQFxRSIEIAAoAgAiCUVxRQRAAkAgBA0AIAEgAmohBwJAIAAoAgwiBkUEQCABIQQMAQsgASEEA0AgBCIDIAdGDQICfyADQQFqIAMsAAAiCEEATg0AGiADQQJqIAhBYEkNABogA0EDaiAIQXBJDQAaIANBBGoLIgQgA2sgBWohBSAGQQFrIgYNAAsLIAQgB0YNACAELAAAGiAFIAICfwJAIAVFDQAgAiAFSwRAIAEgBWosAABBv39KDQFBAAwCCyACIAVGDQBBAAwBCyABCyIDGyECIAMgASADGyEBCyAJRQ0BIAAoAgQhBwJAIAJBEE8EQCABIAIQEiEDDAELIAJFBEBBACEDDAELIAJBA3EhBgJAIAJBBEkEQEEAIQNBACEFDAELIAJBDHEhCEEAIQNBACEFA0AgAyABIAVqIgQsAABBv39KaiAEQQFqLAAAQb9/SmogBEECaiwAAEG/f0pqIARBA2osAABBv39KaiEDIAggBUEEaiIFRw0ACwsgBkUNACABIAVqIQQDQCADIAQsAABBv39KaiEDIARBAWohBCAGQQFrIgYNAAsLAkAgAyAHSQRAIAcgA2shBEEAIQMCQAJAAkAgAC0AIEEBaw4CAAECCyAEIQNBACEEDAELIARBAXYhAyAEQQFqQQF2IQQLIANBAWohAyAAKAIQIQYgACgCGCEFIAAoAhQhAANAIANBAWsiA0UNAiAAIAYgBSgCEBEAAEUNAAtBAQ8LDAILIAAgASACIAUoAgwRAgAEQEEBDwtBACEDA0AgAyAERgRAQQAPCyADQQFqIQMgACAGIAUoAhARAABFDQALIANBAWsgBEkPCyAAKAIUIAEgAiAAKAIYKAIMEQIADwsgACgCFCABIAIgACgCGCgCDBECAAu/BQEIf0ErQYCAxAAgACgCHCIIQQFxIgYbIQwgBCAGaiEGAkAgCEEEcUUEQEEAIQEMAQsCQCACQRBPBEAgASACEBIhBQwBCyACRQRADAELIAJBA3EhCQJAIAJBBEkEQAwBCyACQQxxIQoDQCAFIAEgB2oiCywAAEG/f0pqIAtBAWosAABBv39KaiALQQJqLAAAQb9/SmogC0EDaiwAAEG/f0pqIQUgCiAHQQRqIgdHDQALCyAJRQ0AIAEgB2ohBwNAIAUgBywAAEG/f0pqIQUgB0EBaiEHIAlBAWsiCQ0ACwsgBSAGaiEGCyAAKAIARQRAIAAoAhQiBiAAKAIYIgAgDCABIAIQPwRAQQEPCyAGIAMgBCAAKAIMEQIADwsCQAJAAkAgBiAAKAIEIgdPBEAgACgCFCIGIAAoAhgiACAMIAEgAhA/RQ0BQQEPCyAIQQhxRQ0BIAAoAhAhCCAAQTA2AhAgAC0AICEKQQEhBSAAQQE6ACAgACgCFCIJIAAoAhgiCyAMIAEgAhA/DQIgByAGa0EBaiEFAkADQCAFQQFrIgVFDQEgCUEwIAsoAhARAABFDQALQQEPCyAJIAMgBCALKAIMEQIABEBBAQ8LIAAgCjoAICAAIAg2AhBBAA8LIAYgAyAEIAAoAgwRAgAhBQwBCyAHIAZrIQYCQAJAAkAgAC0AICIFQQFrDgMAAQACCyAGIQVBACEGDAELIAZBAXYhBSAGQQFqQQF2IQYLIAVBAWohBSAAKAIQIQogACgCGCEIIAAoAhQhAAJAA0AgBUEBayIFRQ0BIAAgCiAIKAIQEQAARQ0AC0EBDwtBASEFIAAgCCAMIAEgAhA/DQAgACADIAQgCCgCDBECAA0AQQAhBQNAIAUgBkYEQEEADwsgBUEBaiEFIAAgCiAIKAIQEQAARQ0ACyAFQQFrIAZJDwsgBQv+BQEFfyAAQQhrIgEgAEEEaygCACIDQXhxIgBqIQICQAJAIANBAXENACADQQJxRQ0BIAEoAgAiAyAAaiEAIAEgA2siAUH4lsAAKAIARgRAIAIoAgRBA3FBA0cNAUHwlsAAIAA2AgAgAiACKAIEQX5xNgIEIAEgAEEBcjYCBCACIAA2AgAPCyABIAMQHgsCQAJAAkACQAJAIAIoAgQiA0ECcUUEQCACQfyWwAAoAgBGDQIgAkH4lsAAKAIARg0DIAIgA0F4cSICEB4gASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFB+JbAACgCAEcNAUHwlsAAIAA2AgAPCyACIANBfnE2AgQgASAAQQFyNgIEIAAgAWogADYCAAsgAEGAAkkNAiABIAAQIkEAIQFBkJfAAEGQl8AAKAIAQQFrIgA2AgAgAA0EQdiUwAAoAgAiAARAA0AgAUEBaiEBIAAoAggiAA0ACwtBkJfAAEH/HyABIAFB/x9NGzYCAA8LQfyWwAAgATYCAEH0lsAAQfSWwAAoAgAgAGoiADYCACABIABBAXI2AgRB+JbAACgCACABRgRAQfCWwABBADYCAEH4lsAAQQA2AgALIABBiJfAACgCACIDTQ0DQfyWwAAoAgAiAkUNA0EAIQBB9JbAACgCACIEQSlJDQJB0JTAACEBA0AgAiABKAIAIgVPBEAgAiAFIAEoAgRqSQ0ECyABKAIIIQEMAAsAC0H4lsAAIAE2AgBB8JbAAEHwlsAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAA8LIABB+AFxQeCUwABqIQICf0HolsAAKAIAIgNBASAAQQN2dCIAcUUEQEHolsAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCA8LQdiUwAAoAgAiAQRAA0AgAEEBaiEAIAEoAggiAQ0ACwtBkJfAAEH/HyAAIABB/x9NGzYCACADIARPDQBBiJfAAEF/NgIACwvpBAEFfwJ/AkAgAkECTwRAIAEoAgQiBEH//wFxRQRAIARBEHQMAwsgBEH/B3EhBSAEQYCAAnEhAyAEQYD4AXEiBkGA+AFGBEAgA0EQdCEDIANBgICA/AdyIAVFDQMaIAMgBUENdHJBgICA/gdyDAMLIANBEHQhAyAGRQ0BIAZBDXRBgICA/ABxIAVBDXRyQYCAgMADaiADcgwCC0EBQQFB9IHAABA1AAsgBSAFZ0EQayIFQf//A3FBCGp0Qf///wNxIANBgICA2ANyIAVBF3RrcgshBQJ/IARBgIB8cSAEQRB2IgNB//8BcUUNABogA0H/B3EhBCADQYCAAnEhBiADQYD4AXEiB0GA+AFGBEAgBkEQdCEGIAZBgICA/AdyIARFDQEaIAYgA0ENdHJBgICA/gdyDAELIAZBEHQhAyAHQQ10QYCAgPwAcSAEQQ10ckGAgIDAA2ogA3IgBw0AGiAEIARnQRBrIgRB//8DcUEIanRB////A3EgA0GAgIDYA3IgBEEXdGtyCyEEIAACfwJAIAJBAkcEQCABKAIIIgJB//8BcUUEQCACQRB0DAMLIAJB/wdxIQEgAkGAgAJxIQMgAkGA+AFxIgJBgPgBRgRAIANBEHQhAiACQYCAgPwHciABRQ0DGiACIAFBDXRyQYCAgP4HcgwDCyADQRB0IQMgAkUNASACQQ10QYCAgPwAcSABQQ10ckGAgIDAA2ogA3IMAgtBAkECQYSCwAAQNQALIAEgAWdBEGsiAUH//wNxQQhqdEH///8DcSADQYCAgNgDciABQRd0a3ILNgIIIAAgBDYCBCAAIAU2AgAL6wQBCn8jAEEwayIDJAAgA0EDOgAsIANBIDYCHCADQQA2AiggAyABNgIkIAMgADYCICADQQA2AhQgA0EANgIMAn8CQAJAAkAgAigCECIKRQRAIAIoAgwiAEUNASACKAIIIgEgAEEDdGohBCAAQQFrQf////8BcUEBaiEHIAIoAgAhAANAIABBBGooAgAiBQRAIAMoAiAgACgCACAFIAMoAiQoAgwRAgANBAsgASgCACADQQxqIAEoAgQRAAANAyAAQQhqIQAgAUEIaiIBIARHDQALDAELIAIoAhQiAEUNACAAQQV0IQsgAEEBa0H///8/cUEBaiEHIAIoAgghBSACKAIAIQADQCAAQQRqKAIAIgEEQCADKAIgIAAoAgAgASADKAIkKAIMEQIADQMLIAMgCCAKaiIBQRBqKAIANgIcIAMgAUEcai0AADoALCADIAFBGGooAgA2AiggAUEMaigCACEEQQAhCUEAIQYCQAJAAkAgAUEIaigCAEEBaw4CAAIBCyAEQQN0IAVqIgwoAgANASAMKAIEIQQLQQEhBgsgAyAENgIQIAMgBjYCDCABQQRqKAIAIQQCQAJAAkAgASgCAEEBaw4CAAIBCyAEQQN0IAVqIgYoAgANASAGKAIEIQQLQQEhCQsgAyAENgIYIAMgCTYCFCAFIAFBFGooAgBBA3RqIgEoAgAgA0EMaiABKAIEEQAADQIgAEEIaiEAIAsgCEEgaiIIRw0ACwsgByACKAIETw0BIAMoAiAgAigCACAHQQN0aiIAKAIAIAAoAgQgAygCJCgCDBECAEUNAQtBAQwBC0EACyADQTBqJAALsgQCAn0EfyMAQRBrIQQgALwiBUEfdiEGAkACfSAAAn8CQAJAAkACQCAFQf////8HcSIDQdDYupUETwRAIANBgICA/AdLBEAgAA8LIAVBAEgiBUUgA0GX5MWVBEtxDQIgBUUNASAEQwAAgIAgAJU4AgggBCoCCBogA0G047+WBE0NAQwHCyADQZjkxfUDTQRAIANBgICAyANNDQNBACEDIAAMBgsgA0GSq5T8A00NAwsgAEM7qrg/lCAGQQJ0QYiSwABqKgIAkiIBQwAAAM9gIQRB/////wcCfyABi0MAAABPXQRAIAGoDAELQYCAgIB4C0GAgICAeCAEGyABQ////05eG0EAIAEgAVsbDAMLIABDAAAAf5QPCyAEIABDAAAAf5I4AgwgBCoCDBogAEMAAIA/kg8LIAZFIAZrCyIDsiIBQwByMb+UkiIAIAFDjr6/NZQiApMLIQEgACABIAEgASABlCIAIABDFVI1u5RDj6oqPpKUkyIAlEMAAABAIACTlSACk5JDAACAP5IhASADRQ0AAkACQAJAIANB/wBMBEAgA0GCf04NAyABQwAAgAyUIQEgA0Gbfk0NASADQeYAaiEDDAMLIAFDAAAAf5QhASADQf4BSw0BIANB/wBrIQMMAgsgAUMAAIAMlCEBQbZ9IAMgA0G2fU0bQcwBaiEDDAELIAFDAAAAf5QhAUH9AiADIANB/QJPG0H+AWshAwsgASADQRd0QYCAgPwDar6UIQELIAEL+QMBAn8gACABaiECAkACQCAAKAIEIgNBAXENACADQQJxRQ0BIAAoAgAiAyABaiEBIAAgA2siAEH4lsAAKAIARgRAIAIoAgRBA3FBA0cNAUHwlsAAIAE2AgAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCACIAE2AgAMAgsgACADEB4LAkACQAJAIAIoAgQiA0ECcUUEQCACQfyWwAAoAgBGDQIgAkH4lsAAKAIARg0DIAIgA0F4cSICEB4gACABIAJqIgFBAXI2AgQgACABaiABNgIAIABB+JbAACgCAEcNAUHwlsAAIAE2AgAPCyACIANBfnE2AgQgACABQQFyNgIEIAAgAWogATYCAAsgAUGAAk8EQCAAIAEQIg8LIAFB+AFxQeCUwABqIQICf0HolsAAKAIAIgNBASABQQN2dCIBcUUEQEHolsAAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQfyWwAAgADYCAEH0lsAAQfSWwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEH4lsAAKAIARw0BQfCWwABBADYCAEH4lsAAQQA2AgAPC0H4lsAAIAA2AgBB8JbAAEHwlsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsLggMBCX8jAEEgayIEJAAQIyIAKAIQIQUgACgCDCEIIABCADcCDCAAKAIEIQYgACgCCCEDIABCBDcCBCAAKAIAIQIgAEEANgIAAkAgAyAIRgRAAkAgAiADRgRA0G9BgAEgAiACQYABTRsiB/wPASIBQX9GDQMCQCAFRQRAIAEhBQwBCyACIAVqIAFHDQQLIAIgB2oiByACSSAHQf////8DS3INAyAHQQJ0IgFB/P///wdLDQMgBCACBH8gBCAGNgIUIAQgAkECdDYCHEEEBUEACzYCGCAEQQhqQQQgASAEQRRqEDAgBCgCCEEBRg0DIAQoAgwhBiACIQEgByECDAELIAIgAyIBTQ0CCyAGIAFBAnRqIANBAWo2AgAgAUEBaiEDCyADIAhNDQAgBiAIQQJ0aigCACEBIAAgBTYCECAAIAE2AgwgACADNgIIIAAoAgQhAyAAIAY2AgQgACgCACEBIAAgAjYCACABBEAgAyABQQJ0EGULIARBIGokACAFIAhqDwsAC+cCAQV/AkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEBEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQGgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEBoLIABBCGohAwsgAwv7AgEHfyMAQRBrIgQkAAJAAkACQAJAAkAgASgCBCICRQ0AIAEoAgAhByACQQNxIQUCQCACQQRJBEBBACECDAELIAdBHGohAyACQXxxIQhBACECA0AgAygCACADQQhrKAIAIANBEGsoAgAgA0EYaygCACACampqaiECIANBIGohAyAIIAZBBGoiBkcNAAsLIAUEQCAGQQN0IAdqQQRqIQMDQCADKAIAIAJqIQIgA0EIaiEDIAVBAWsiBQ0ACwsgASgCDARAIAJBAEgNASAHKAIERSACQRBJcQ0BIAJBAXQhAgtBACEFIAJBAEgNAyACDQELQQEhA0EAIQIMAQtBsZPAAC0AABpBASEFIAJBARBdIgNFDQELIARBADYCCCAEIAM2AgQgBCACNgIAIARBwIvAACABEBhFDQFBqIzAAEHWACAEQQ9qQZiMwABBkI3AABAzAAsgBSACEFIACyAAIAQpAgA3AgAgAEEIaiAEQQhqKAIANgIAIARBEGokAAvxAgEEfyAAKAIMIQICQAJAIAFBgAJPBEAgACgCGCEDAkACQCAAIAJGBEAgAEEUQRAgACgCFCICG2ooAgAiAQ0BQQAhAgwCCyAAKAIIIgEgAjYCDCACIAE2AggMAQsgAEEUaiAAQRBqIAIbIQQDQCAEIQUgASICQRRqIAJBEGogAigCFCIBGyEEIAJBFEEQIAEbaigCACIBDQALIAVBADYCAAsgA0UNAiAAIAAoAhxBAnRB0JPAAGoiASgCAEcEQCADQRBBFCADKAIQIABGG2ogAjYCACACRQ0DDAILIAEgAjYCACACDQFB7JbAAEHslsAAKAIAQX4gACgCHHdxNgIADAILIAAoAggiACACRwRAIAAgAjYCDCACIAA2AggPC0HolsAAQeiWwAAoAgBBfiABQQN2d3E2AgAPCyACIAM2AhggACgCECIBBEAgAiABNgIQIAEgAjYCGAsgACgCFCIARQ0AIAIgADYCFCAAIAI2AhgLC7YCAQd/AkAgAkEQSQRAIAAhAwwBCyAAQQAgAGtBA3EiBGohBSAEBEAgACEDIAEhBgNAIAMgBi0AADoAACAGQQFqIQYgA0EBaiIDIAVJDQALCyAFIAIgBGsiCEF8cSIHaiEDAkAgASAEaiIEQQNxBEAgB0EATA0BIARBA3QiAkEYcSEJIARBfHEiBkEEaiEBQQAgAmtBGHEhAiAGKAIAIQYDQCAFIAYgCXYgASgCACIGIAJ0cjYCACABQQRqIQEgBUEEaiIFIANJDQALDAELIAdBAEwNACAEIQEDQCAFIAEoAgA2AgAgAUEEaiEBIAVBBGoiBSADSQ0ACwsgCEEDcSECIAQgB2ohAQsgAgRAIAIgA2ohAgNAIAMgAS0AADoAACABQQFqIQEgA0EBaiIDIAJJDQALCyAAC78CAQN/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQA2AgwCfyABQYAQTwRAIAFBgIAETwRAIAJBDGpBA3IhBCACIAFBEnZB8AFyOgAMIAIgAUEGdkE/cUGAAXI6AA4gAiABQQx2QT9xQYABcjoADUEEDAILIAJBDGpBAnIhBCACIAFBDHZB4AFyOgAMIAIgAUEGdkE/cUGAAXI6AA1BAwwBCyACQQxqQQFyIQQgAiABQQZ2QcABcjoADEECCyEDIAQgAUE/cUGAAXI6AAAgAyAAKAIAIAAoAggiAWtLBEAgACABIAMQKSAAKAIIIQELIAAoAgQgAWogAkEMaiADEB8aIAAgASADajYCCAwBCyAAKAIIIgMgACgCAEYEQCAAECgLIAAgA0EBajYCCCAAKAIEIANqIAE6AAALIAJBEGokAEEAC70CAQJ/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQA2AgwCfyABQYAQTwRAIAFBgIAETwRAIAIgAUE/cUGAAXI6AA8gAiABQRJ2QfABcjoADCACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA1BBAwCCyACIAFBP3FBgAFyOgAOIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDDAELIAIgAUE/cUGAAXI6AA0gAiABQQZ2QcABcjoADEECCyEBIAEgACgCACAAKAIIIgNrSwRAIAAgAyABECUgACgCCCEDCyAAKAIEIANqIAJBDGogARAfGiAAIAEgA2o2AggMAQsgACgCCCIDIAAoAgBGBEAgABAoCyAAIANBAWo2AgggACgCBCADaiABOgAACyACQRBqJABBAAvEAgEEfyAAQgA3AhAgAAJ/QQAgAUGAAkkNABpBHyABQf///wdLDQAaIAFBBiABQQh2ZyIDa3ZBAXEgA0EBdGtBPmoLIgI2AhwgAkECdEHQk8AAaiEEQQEgAnQiA0HslsAAKAIAcUUEQCAEIAA2AgAgACAENgIYIAAgADYCDCAAIAA2AghB7JbAAEHslsAAKAIAIANyNgIADwsCQAJAIAEgBCgCACIDKAIEQXhxRgRAIAMhAgwBCyABQRkgAkEBdmtBACACQR9HG3QhBQNAIAMgBUEddkEEcWpBEGoiBCgCACICRQ0CIAVBAXQhBSACIQMgAigCBEF4cSABRw0ACwsgAigCCCIBIAA2AgwgAiAANgIIIABBADYCGCAAIAI2AgwgACABNgIIDwsgBCAANgIAIAAgAzYCGCAAIAA2AgwgACAANgIIC/MCAQR/IwBBMGsiACQAAkACQEGQksAAKAIARQRAQaiSwAAoAgAhAUGoksAAQQA2AgAgAUUNASAAQRhqIAERBQAgAEEQaiICIABBJGopAgA3AwAgACAAKQIcNwMIIAAoAhghAUGQksAAKAIAIgMNAgJAIANFDQBBlJLAACgCACICRQ0AQZiSwAAoAgAgAkECdBBlC0GUksAAIAE2AgBBkJLAAEEBNgIAQZiSwAAgACkDCDcCAEGgksAAIABBEGopAwA3AgALIABBMGokAEGUksAADwsgAEEANgIoIABBATYCHCAAQaCHwAA2AhggAEIENwIgIABBGGpBiIjAABBDAAsgAEEoaiACKQMANwIAIAAgACkDCDcCICAAIAE2AhwgAEEBNgIYAkAgAEEYaiIBKAIARQ0AIAEoAgQiAkUNACABKAIIIAJBAnQQZQsgAEEANgIoIABBATYCHCAAQaiIwAA2AhggAEIENwIgIAFBsIjAABBDAAuoAgIDfwF+IwBBQGoiAiQAIAEoAgBBgICAgHhGBEAgASgCDCEDIAJBJGoiBEEANgIAIAJCgICAgBA3AhwgAkEwaiADKAIAIgNBCGopAgA3AwAgAkE4aiADQRBqKQIANwMAIAIgAykCADcDKCACQRxqQcCIwAAgAkEoahAYGiACQRhqIAQoAgAiAzYCACACIAIpAhwiBTcDECABQQhqIAM2AgAgASAFNwIACyABKQIAIQUgAUKAgICAEDcCACACQQhqIgMgAUEIaiIBKAIANgIAIAFBADYCAEGxk8AALQAAGiACIAU3AwBBDEEEEF0iAUUEQEEEQQwQbQALIAEgAikDADcCACABQQhqIAMoAgA2AgAgAEHgisAANgIEIAAgATYCACACQUBrJAAL0gECBH8BfiMAQSBrIgMkACABIAEgAmoiAksEQEEAQQAQUgALQQggACgCACIEQQF0IgEgAiABIAJLGyICIAJBCEkbIgKtIgdCIIhQRQRAQQBBABBSAAsCQCAHpyIFQf////8HTQRAIAMgBAR/IAMgBDYCHCADIAAoAgQ2AhRBAQVBAAs2AhggA0EIakEBIAUgA0EUahAwIAMoAghBAUcNASADKAIMIQYgAygCECEBCyAGIAEQUgALIAMoAgwhASAAIAI2AgAgACABNgIEIANBIGokAAvrAQIEfwF+IwBBIGsiBSQAIAEgASACaiICSwRAQQBBABBSAAtBACEBIAMgBGpBAWtBACADa3GtQQQgACgCACIHQQF0IgYgAiACIAZJGyICIAJBBE0bIgKtfiIJQiCIUEUEQEEAQQAQUgALAkAgCaciBkGAgICAeCADa00EfyAFIAcEfyAFIAQgB2w2AhwgBSAAKAIENgIUIAMFQQALNgIYIAVBCGogAyAGIAVBFGoQMCAFKAIIQQFHDQEgBSgCECEIIAUoAgwFIAELIAgQUgALIAUoAgwhASAAIAI2AgAgACABNgIEIAVBIGokAAvTAQEFfyMAQSBrIgEkACAAKAIAIgJBf0YEQEEAQQAQUgALIAJBAXQiAyACQQFqIgUgAyAFSxsiA0H/////A0sEQEEAQQAQUgALAkBBBCADIANBBE0bIgNBAnQiBUH8////B00EfyABIAIEfyABIAJBAnQ2AhwgASAAKAIENgIUQQQFQQALNgIYIAFBCGpBBCAFIAFBFGoQMCABKAIIQQFHDQEgASgCECEEIAEoAgwFIAQLIAQQUgALIAEoAgwhAiAAIAM2AgAgACACNgIEIAFBIGokAAuyAQEEfyMAQSBrIgEkACAAKAIAIgJBf0YEQEEAQQAQUgALQQggAkEBdCIDIAJBAWoiBCADIARLGyIDIANBCE0bIgNBAEgEQEEAQQAQUgALIAEgAgR/IAEgAjYCHCABIAAoAgQ2AhRBAQVBAAs2AhggAUEIakEBIAMgAUEUahAwIAEoAghBAUYEQCABKAIMIAEoAhAQUgALIAEoAgwhAiAAIAM2AgAgACACNgIEIAFBIGokAAuyAQECfyMAQSBrIgMkACABIAEgAmoiAksEQEEAQQAQUgALQQggACgCACIBQQF0IgQgAiACIARJGyICIAJBCE0bIgRBAEgEQEEAQQAQUgALIAMgAQR/IAMgATYCHCADIAAoAgQ2AhRBAQVBAAs2AhggA0EIakEBIAQgA0EUahAwIAMoAghBAUYEQCADKAIMIAMoAhAQUgALIAMoAgwhASAAIAQ2AgAgACABNgIEIANBIGokAAudAQEDfwJAIAFBEEkEQCAAIQIMAQsgAEEAIABrQQNxIgRqIQMgBARAIAAhAgNAIAJBADoAACACQQFqIgIgA0kNAAsLIAMgASAEayIBQXxxIgRqIQIgBEEASgRAA0AgA0EANgIAIANBBGoiAyACSQ0ACwsgAUEDcSEBCyABBEAgASACaiEBA0AgAkEAOgAAIAJBAWoiAiABSQ0ACwsgAAvBAQIDfwF+IwBBMGsiAiQAIAEoAgBBgICAgHhGBEAgASgCDCEDIAJBFGoiBEEANgIAIAJCgICAgBA3AgwgAkEgaiADKAIAIgNBCGopAgA3AwAgAkEoaiADQRBqKQIANwMAIAIgAykCADcDGCACQQxqQcCIwAAgAkEYahAYGiACQQhqIAQoAgAiAzYCACACIAIpAgwiBTcDACABQQhqIAM2AgAgASAFNwIACyAAQeCKwAA2AgQgACABNgIAIAJBMGokAAuWAgECfyMAQSBrIgUkAEHMk8AAQcyTwAAoAgAiBkEBajYCAAJAAn9BACAGQQBIDQAaQQFBmJfAAC0AAA0AGkGYl8AAQQE6AABBlJfAAEGUl8AAKAIAQQFqNgIAQQILQf8BcSIGQQJHBEAgBkEBcUUNASAFQQhqIAAgASgCGBEBAAALQcCTwAAoAgAiBkEASA0AQcCTwAAgBkEBajYCAEHAk8AAQcSTwAAoAgAEfyAFIAAgASgCFBEBACAFIAQ6AB0gBSADOgAcIAUgAjYCGCAFIAUpAwA3AhBBxJPAACgCACAFQRBqQciTwAAoAgAoAhQRAQBBwJPAACgCAEEBawUgBgs2AgBBmJfAAEEAOgAAIANFDQAACwALrwEBBn8CQAJAIABBhAFJDQAgANBvJgEQIyIBKAIMIQUgASgCECECIAFCADcCDCABKAIIIQMgASgCBCEEIAFCBDcCBCABKAIAIQYgAUEANgIAIAAgAkkNASAAIAJrIgAgA08NASAEIABBAnRqIAU2AgAgASACNgIQIAEgADYCDCABIAM2AgggASgCBCABIAQ2AgQgASgCACEAIAEgBjYCACAARQ0AIABBAnQQZQsPCwALowEBAX8jAEEQayIGJAACQCABBEAgBkEEaiABIAMgBCAFIAIoAhARBgACQCAGKAIEIgIgBigCDCIBTQRAIAYoAgghBQwBCyACQQJ0IQIgBigCCCEDIAFFBEBBBCEFIAMgAhBlDAELIAMgAkEEIAFBAnQiAhBUIgVFDQILIAAgATYCBCAAIAU2AgAgBkEQaiQADwtBxIbAAEEyEGgAC0EEIAIQUgALrAEBA38gASgCDCECAkACQAJAAkACQAJAIAEoAgQOAgABAgsgAg0BQQEhA0EAIQFBASECDAMLIAJFDQELIAAgARAdDwsgASgCACICKAIEIgFBAEgNASACKAIAIQMgAUUEQEEBIQJBACEBDAELQbGTwAAtAAAaQQEhBCABQQEQXSICRQ0BCyACIAMgARAfIQIgACABNgIIIAAgAjYCBCAAIAE2AgAPCyAEIAEQUgALiQEBAX8CQCACQQBOBEACfyADKAIEBEACQCADKAIIIgRFBEAMAQsgAygCACAEIAEgAhBUDAILCyABIAJFDQAaQbGTwAAtAAAaIAIgARBdCyIDBEAgACACNgIIIAAgAzYCBCAAQQA2AgAPCyAAIAI2AgggACABNgIEDAELIABBADYCBAsgAEEBNgIAC5cBAgR/AW8jAEEgayIDJAAgACgCACIGEHAhACADIAI2AgQgAyAANgIAIAAgAkYEQBBbIgQQUyIFJQEgASACEAQhBxAbIgAgByYBIARBhAFPBEAgBBAtCyAFQYQBTwRAIAUQLQsgBiAAQQAQZCAAQYQBTwRAIAAQLQsgA0EgaiQADwsgA0EANgIIIAMgA0EEaiADQQhqEEAAC3kBAX8jAEEgayICJAACfyAAKAIAQYCAgIB4RwRAIAEgACgCBCAAKAIIEFYMAQsgAkEQaiAAKAIMKAIAIgBBCGopAgA3AwAgAkEYaiAAQRBqKQIANwMAIAIgACkCADcDCCABKAIUIAEoAhggAkEIahAYCyACQSBqJAALewEBfyMAQUBqIgUkACAFIAE2AgwgBSAANgIIIAUgAzYCFCAFIAI2AhAgBUECNgIcIAVBoI/AADYCGCAFQgI3AiQgBSAFQRBqrUKAgICAsAWENwM4IAUgBUEIaq1CgICAgMAFhDcDMCAFIAVBMGo2AiAgBUEYaiAEEEMAC24BAX8jAEEwayIBJAAgASAANgIAIAFBgAE2AgQgAUECNgIMIAFB2JHAADYCCCABQgI3AhQgASABQQRqrUKAgICA4ACENwMoIAEgAa1CgICAgOAAhDcDICABIAFBIGo2AhAgAUEIakHIj8AAEEMAC2kCAX8BfiMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQfyNwAA2AgggA0ICNwIUIANCgICAgOAAIgQgA62ENwMoIAMgBCADQQRqrYQ3AyAgAyADQSBqNgIQIANBCGogAhBDAAtpAgF/AX4jAEEwayIDJAAgAyAANgIAIAMgATYCBCADQQI2AgwgA0H4kcAANgIIIANCAjcCFCADQoCAgIDgACIEIANBBGqthDcDKCADIAQgA62ENwMgIAMgA0EgajYCECADQQhqIAIQQwALZgAjAEEwayIAJABBsJPAAC0AAARAIABBAjYCDCAAQbCKwAA2AgggAEIBNwIUIAAgATYCLCAAIABBLGqtQoCAgIDgAIQ3AyAgACAAQSBqNgIQIABBCGpB0IrAABBDAAsgAEEwaiQAC5QBAgN/AW8jAEEgayIDJAAgAyAAKAIAEHAiBDYCACADIAI2AgQgAiAERwRAIANBADYCCCADIANBBGogA0EIahBAAAsQWyIEEFMiBSUBEAUhBhAbIgIgBiYBIAVBhAFPBEAgBRAtCyACIAAoAgAgAUECdhBkIAJBhAFPBEAgAhAtCyAEQYQBTwRAIAQQLQsgA0EgaiQAC08BAX8jAEEwayIAJAAgAEEBNgIMIABBwI3AADYCCCAAQgE3AhQgACAAQS9qrUKAgICAoAWENwMgIAAgAEEgajYCECAAQQhqQcSBwAAQQwALQQEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhAlIAAoAgghAwsgACgCBCADaiABIAIQHxogACACIANqNgIIQQALTQECf0Gxk8AALQAAGiABKAIEIQIgASgCACEDQQhBBBBdIgFFBEBBBEEIEG0ACyABIAI2AgQgASADNgIAIABB8IrAADYCBCAAIAE2AgALQQEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhApIAAoAgghAwsgACgCBCADaiABIAIQHxogACACIANqNgIIQQALQQEBfyMAQSBrIgIkACACQQA2AhAgAkEBNgIEIAJCBDcCCCACQS42AhwgAiAANgIYIAIgAkEYajYCACACIAEQQwALswIBA38gACgCACECIAEoAhwiAEEQcUUEQCAAQSBxRQRAIAIgARBnDwtBACEAIwBBgAFrIgQkACACKAIAIQIDQCAAIARqQf8AaiACQQ9xIgNBMHIgA0E3aiADQQpJGzoAACAAQQFrIQAgAkEQSSACQQR2IQJFDQALIABBgAFqIgJBgQFPBEAgAhA0AAsgAUHYj8AAQQIgACAEakGAAWpBACAAaxAVIARBgAFqJAAPC0EAIQAjAEGAAWsiBCQAIAIoAgAhAgNAIAAgBGpB/wBqIAJBD3EiA0EwciADQdcAaiADQQpJGzoAACAAQQFrIQAgAkEQSSACQQR2IQJFDQALIABBgAFqIgJBgQFPBEAgAhA0AAsgAUHYj8AAQQIgACAEakGAAWpBACAAaxAVIARBgAFqJAALOAACQCACQYCAxABGDQAgACACIAEoAhARAABFDQBBAQ8LIANFBEBBAA8LIAAgAyAEIAEoAgwRAgAL0AIBAX8jAEEQayIDJAAgAyABNgIMIAMgADYCCCMAQfAAayIAJAAgAEG0hsAANgIMIAAgA0EIajYCCCAAQbSGwAA2AhQgACADQQxqNgIQIABBjI7AADYCGCAAQQI2AhwCQCACKAIARQRAIABBAzYCXCAAQciOwAA2AlggAEIDNwJkIAAgAEEQaq1CgICAgLAFhDcDSCAAIABBCGqtQoCAgICwBYQ3A0AMAQsgAEEwaiACQRBqKQIANwMAIABBKGogAkEIaikCADcDACAAIAIpAgA3AyAgAEEENgJcIABB/I7AADYCWCAAQgQ3AmQgACAAQRBqrUKAgICAsAWENwNQIAAgAEEIaq1CgICAgLAFhDcDSCAAIABBIGqtQoCAgIDQBYQ3A0ALIAAgAEEYaq1CgICAgMAFhDcDOCAAIABBOGo2AmAgAEHYAGpBpIbAABBDAAuyAQECfyMAQRBrIgAkACABKAIUQYCKwABBCyABKAIYKAIMEQIAIQMgAEEIaiICQQA6AAUgAiADOgAEIAIgATYCACACIgEtAAQhAiABLQAFBEAgAQJ/QQEgAkEBcQ0AGiABKAIAIgEtABxBBHFFBEAgASgCFEGxj8AAQQIgASgCGCgCDBECAAwBCyABKAIUQbCPwABBASABKAIYKAIMEQIACyICOgAECyACQQFxIABBEGokAAvrEgIYfxB9EBsiDiAJJgEjAEGAAWsiDSQAIA0gDjYCLCANIAg2AiggDSAHOAIkIA0gBjgCICANIAU4AhwgDSAEOAIYIA0gAzgCFCANIAI4AhAgDSABOAIMIA0gADgCCCANIApBAEc6ADMgDSALOAI0IA0gDDgCOCANQQA2AkQgDUKAgICAwAA3AjwgDSANQThqNgJ8IA0gDUE0ajYCeCANIA1BJGo2AnQgDSANQSBqNgJwIA0gDUEcajYCbCANIA1BGGo2AmggDSANQRRqNgJkIA0gDUEQajYCYCANIA1BDGo2AlwgDSANQQhqNgJYIA0gDUE8ajYCVCANIA1BM2o2AlAgDSANQSxqNgJMIA0gDUEoajYCSCANQcgAaiIYIQgjAEEgayIQJAACQEEAQYiAwAAoAgARAwAiEwRAIBMoAgBFBEAgCCgCNCEZIAgoAjAhGiAIKAIsIRsgCCgCKCEcIAgoAiQhHSAIKAIgIR4gCCgCHCEfIAgoAhghICAIKAIUISEgCCgCECEiIAgoAgwhESAIKAIIISMgCCgCBCEkIAgoAgAhFiATQX82AgAgEyAWKAIAIggEfyATQQxqKAIAIRcgE0EIaigCACEKQQAhDgNAIBAgJCAOQQJ0IA5BgIAEIAggDmsiCCAIQYCABE8bIghqIhRBAnQQZjYCDAJAAkAgFyAIQQJ0Ig5PBEAgEEEMaiAKIA4QOCAZKgIAIQAgGioCACEDIBsqAgAhLyAcKgIAITAgHSoCACEEIB4qAgAhBSAfKgIAIQYgICoCACExICEqAgAhMiAiKgIAITMgIy0AAA0BIAAgA5NDAAB+Q5UhACAGIAaUIAUgBZSSIAQgBJSSIQsgCiEIA0AgDkEEIA5BBEkiDxshEgJAIAgtAAOzQwAAf0OVQ83MzD1dDQAgEEEQaiAIIBIQFwJ9AkAgD0UEQCAQKgIYIQEgECoCFCECIBAqAhAhB0MAAAAAIQxDAAAAACElIAgoAgwiD0H/AXEEQCADIAAgD0EBa0H/AXGzlJIQGSElCyAPQQh2IhVB/wFxBEAgAyAAIBVBAWtB/wFxs5SSEBkhDAsgMSABkyEBIDIgApMhAiAzIAeTIQcgD0EQdiIPQf8BcQ0BQwAAAAAMAgtBAyASQZSCwAAQNQALIAMgACAPQQFrQf8BcbOUkhAZCyEpIAYgB5QgBSAClJIgBCABlJIiJiAmlCALIAcgB5QgAiAClJIgASABlJIgJSAMkiApkkMAAEBAlSIBIAGUk5STIgFDAAAAAF0NACAmjCABkZMgC5UiASAwYEUgASAvX0VyDQAgESgCCCIPIBEoAgBGBEAgERAnCyARKAIEIA9BAnRqIAE4AgAgESAPQQFqNgIICyAIIBJBAnRqIQggDiASayIODQALDAILIA4gF0GIg8AAEDYACyAAIAOTQwAAfkOVISwgCiEIA0AgDkEEIA5BBEkiDxshEgJAIAgtAAOzQwAAf0OVQ83MzD1dDQAgEEEQaiAIIBIQFwJ9AkAgD0UEQCAQKgIYIQAgECoCFCEBIBAqAhAhAkMAAAAAIQdDAAAAACELIAgoAgwiD0H/AXEEQCADICwgD0EBa0H/AXGzlJIQGSELCyAPQQh2IhVB/wFxBEAgAyAsIBVBAWtB/wFxs5SSEBkhBwsgMSAAkyEnIDIgAZMhLSAzIAKTIS4gD0EQdiIVQf8BcQ0BQwAAAAAMAgtBAyASQZSCwAAQNQALIAMgLCAVQQFrQf8BcbOUkhAZCyEMIAQgCCgCCCIVQRh1skMAAP5ClSIAIAUgD0EYdbJDAAD+QpUiAZQgBCAAlJMiKJQgFUEQdsCyQwAA/kKVIgIgBCAClCAGIAGUkyIqlJMgBiAAlCAFIAKUkyIrQwAAgD8gAiAClJMgACAAlJMgASABlJNDAAAAABBQkSIllJIiJiAmkpIhJiAFIAIgK5QgASAolJMgKiAllJIiKSApkpIhKSAGIAEgKpQgACArlJMgKCAllJIiKCAokpIhKCAnIAAgLSABlCAnIACUkyIqlCACICcgApQgLiABlJMiK5STIC4gAJQgLSAClJMiNCAllJIiJyAnkpIhJyAtIAIgNJQgASAqlJMgKyAllJIiAiACkpIhAiAuIAEgK5QgACA0lJMgKiAllJIiACAAkpIhAAJAIAwgCyAHEFAgDBBQQwrXIzyUIgFdRQRAIAEgB15FBEAgASALXkUEQEMAAIA/IAyVIgwgJ5QiASAMICaUIgyUQwAAgD8gC5UiCyAAlCIAIAsgKJQiC5RDAACAPyAHlSIHIAKUIgIgByAplCIHlJKSIiUgJZQgDCAMlCALIAuUIAcgB5SSkiIHIAEgAZQgACAAlCACIAKUkpJDAACAv5KUkyIAQwAAAABdDQQgJYwgAJGTIAeVIQAMAwsgKItDvTeGNV0NAyACICkgAIwgKJUiAJSSIAeVIgEgAZQgJyAmIACUkiAMlSIBIAGUkkMAAIA/XkUNAgwDCyApi0O9N4Y1XQ0CIAAgKCACjCAplSIAlJIgC5UiASABlCAnICYgAJSSIAyVIgEgAZSSQwAAgD9eDQIMAQsgJotDvTeGNV0NASAAICggJ4wgJpUiAJSSIAuVIgEgAZQgAiApIACUkiAHlSIBIAGUkkMAAIA/Xg0BCyAAIDBgRSAAIC9fRXINACARKAIIIg8gESgCAEYEQCARECcLIBEoAgQgD0ECdGogADgCACARIA9BAWo2AggLIAggEkECdGohCCAOIBJrIg4NAAsLIBAoAgwiCEGEAU8EQCAIEC0LIBYoAgAiCCAUIg5LDQALIBMoAgBBAWoFQQALNgIAIBBBIGokAAwCCxA5AAtBnIDAAEHGACAQQR9qQYyAwABBtIHAABAzAAsgDSgCRBANIQkQGyIIIAkmASANIAg2AkggDSgCQCERIA0oAkQhDiMAQSBrIgokACAYKAIAIhMlARAKIRQgCiAONgIEIAogFDYCAAJAIA4gFEYEQBBbIhQQUyIQJQEgESAOEAghCRAbIg4gCSYBIBRBhAFPBEAgFBAtCyAQQYQBTwRAIBAQLQsgEyUBIA4lAUEAEAkgDkGEAU8EQCAOEC0LIApBIGokAAwBCyAKQQA2AgggCiAKQQRqIApBCGoQQAALIA0oAjwiCgRAIA0oAkAgCkECdBBlCyANKAIsIgpBhAFPBEAgChAtCyANQYABaiQAIAglASAIEC0L+gECAn8BfiMAQRBrIgIkACACQQE7AQwgAiABNgIIIAIgADYCBCMAQRBrIgEkACACQQRqIgApAgAhBCABIAA2AgwgASAENwIEIwBBEGsiACQAIAFBBGoiASgCACICKAIMIQMCQAJAAkACQCACKAIEDgIAAQILIAMNAUEBIQJBACEDDAILIAMNACACKAIAIgIoAgQhAyACKAIAIQIMAQsgAEGAgICAeDYCACAAIAE2AgwgAEGci8AAIAEoAgQgASgCCCIALQAIIAAtAAkQLAALIAAgAzYCBCAAIAI2AgAgAEGAi8AAIAEoAgQgASgCCCIALQAIIAAtAAkQLAALJAAgAEUEQEHEhsAAQTIQaAALIAAgAiADIAQgBSABKAIQEQgACyIAIABFBEBBxIbAAEEyEGgACyAAIAIgAyAEIAEoAhARDQALIgAgAEUEQEHEhsAAQTIQaAALIAAgAiADIAQgASgCEBEPAAsiACAARQRAQcSGwABBMhBoAAsgACACIAMgBCABKAIQERgACyIAIABFBEBBxIbAAEEyEGgACyAAIAIgAyAEIAEoAhARGgALIgAgAEUEQEHEhsAAQTIQaAALIAAgAiADIAQgASgCEBEcAAslAQF/IAAoAgAiAUGAgICAeHJBgICAgHhHBEAgACgCBCABEGULCyAAIABFBEBBxIbAAEEyEGgACyAAIAIgAyABKAIQEQQACx4AIABFBEBBxIbAAEEyEGgACyAAIAIgASgCEBEAAAuvDwEPfxAbIgMgASYBEBsiBCACJgEjAEEgayIKJAAgCiAENgIIIAogAzYCBCAKIAA2AgAgCiAKQQRqIgAoAgAQbzYCDCAKIApBCGo2AhwgCiAKNgIYIAogADYCFCAKIApBDGo2AhAgCkEQaiEAIwBB0ABrIgckAAJAAkACQAJAQQBBgIDAACgCABEDACINBEAgDSgCAEUEQCAAKAIMIREgDUF/NgIAIAAoAgQgACgCCCEOIAAoAgAoAgAiBiANQQRqIgQoAggiA0sEQCAGIAMiAGsiCSAEKAIAIABrSwRAIAQgACAJQQJBAhAmIAQoAgghAAsgBCgCBCIMIABBAXRqIQUgCUECTwRAIAUgA0F/cyAGakEBdBAqGiAAIAZqQQF0IANBAXRrIAxqQQJrIQUgACAJakEBayEACyAFQQA7AQAgBCAAQQFqNgIICyAEKAIUIgMgBkkEQCAGIAMiAGsiCSAEKAIMIABrSwRAIARBDGogACAJQQRBBBAmIAQoAhQhAAsgBCgCECIMIABBAnRqIQUgCUECTwRAIAUgA0F/cyAGakECdBAqGiAAIAZqQQJ0IANBAnRrIAxqQQRrIQUgACAJakEBayEACyAFQQA2AgAgBCAAQQFqNgIUCyAEKAIgIgNBgPgBTQRAQYH4ASADIgBrIgUgBCgCGCAAa0sEQCAEQRhqIAAgBUEEQQQQJiAEKAIgIQALIAQoAhwiBiAAQQJ0IglqIQUgA0GA+AFHBH8gBUGA4AcgA0ECdCIFaxAqGiAAIANrQYD4AWohACAJIAVrIAZqQYDgB2oFIAULQQA2AgAgBCAAQQFqNgIgCygCACUBQQAgDigCACIJEAshARAbIgAgASYBIAcgADYCACAJIA0oAgwiAEsNAiANKAIIIQgjAEEgayIAJAAgACAHKAIAEG8iAzYCACAAIAk2AgQgAyAJRwRAIABBADYCCCAAIABBBGogAEEIahBAAAsQWyIFEFMiBiUBEAEhARAbIgMgASYBIAZBhAFPBEAgBhAtCyADJQEgBygCACUBIAhBAXYQAiADQYQBTwRAIAMQLQsgBUGEAU8EQCAFEC0LIABBIGokACAHQQRqIRBBACEAQQAhBSMAQTBrIgYkAAJAAkACQAJAIAkgBCgCCCIDTQRAIAQoAgQhAyAEQQA2AiAgBCgCGEGA+AFNBEAgBEEYakEAQYH4AUEEQQQQJiAEKAIgIQALIAQoAhwiDiAAQQJ0Ig9qQYDgBxAqIAQgAEGB+AFqIgw2AiBBgOAHakEANgIAAkAgCQRAIAlBAXQhCCADIQADQCAALwEAIgtBgPgBSQRAIAsgDE8NAyAOIAtBAnRqIgsgCygCAEEBajYCAAsgAEECaiEAIAhBAmsiCA0ACwsgBkEANgIEAkAgDEECSQ0AIA4gDEECdGpBCGsiACgCACEFIABBADYCACAGIAU2AgQgACAORg0AIA9B+N8HaiILQQJ2QQFqQQNxIggEQCAIQQJ0IQgDQCAAQQRrIgAoAgAhDyAAIAU2AgAgBiAFIA9qIgU2AgQgCEEEayIIDQALCyALQQxJDQAgAEEQayEAA0AgAEEMaiIIKAIAIQsgCCAFNgIAIAYgBSALaiIFNgIEIABBCGoiCCgCACELIAggBTYCACAGIAUgC2oiBTYCBCAAQQRqIggoAgAhCyAIIAU2AgAgBiAFIAtqIgU2AgQgACgCACEIIAAgBTYCACAGIAUgCGoiBTYCBCAAIA5GIABBEGshAEUNAAsLAkAgCQRAIAlBAXQhCCAEKAIQIQ8gBCgCFCEJQQAhAANAIAMvAQAiBEGA+AFJBEAgBCAMTw0DIAkgDiAEQQJ0aiIEKAIAIgtNBEAgCyAJQZiEwAAQNQALIA8gC0ECdGogADYCACAEIAQoAgBBAWo2AgALIANBAmohAyAAQQFqIQAgCEECayIIDQALCyAMRQ0FIA4oAgAgBUcNAyAQQYCAgIB4NgIAIBAgBTYCBAwECyAEIAxBiITAABA1AAsgCyAMQaiEwAAQNQALIAkgA0G4g8AAEDYACyAGQQI2AgwgBkH4g8AANgIIIAZCAjcCFCAGIA6tQoCAgIDgAIQ3AyggBiAGQQRqrUKAgICA4ACENwMgIAYgBkEgajYCECAQIAZBCGoQHQsgBkEwaiQADAELQQBBAEHIg8AAEDUACyAHKAIEQYCAgIB4Rw0DIAcoAggiAEUNBSAAIA0oAhgiA0sNBCANKAIUIQQgByARQQAgABBmIgM2AiggB0EoaiAEIAAQMSADQYQBSQ0FIAMQLQwFCxA5AAtBnIDAAEHGACAHQc8AakGMgMAAQbSBwAAQMwALIAkgAEHAgsAAEDYACyAHQRhqIAdBDGooAgA2AgAgByAHKQIENwMQIAdBATYCLCAHQeCCwAA2AiggB0IBNwI0IAcgB0EQaq1CgICAgMAAhDcDQCAHIAdBQGs2AjAgB0EcaiAHQShqEC8gBygCICAHKAIkEGgACyAAIANB0ILAABA2AAsgBygCACIDQYQBTwRAIAMQLQsgDSANKAIAQQFqNgIAIAdB0ABqJAAgCigCCCIDQYQBTwRAIAMQLQsgCigCBCIDQYQBTwRAIAMQLQsgCkEgaiQAIAALmA8BE38QGyIEIAEmARAbIg8gAiYBIwBBIGsiCiQAIAogDzYCCCAKIAQ2AgQgCiAANgIAIAogCkEEaiIAKAIAEHA2AgwgCiAKQQhqNgIcIAogCjYCGCAKIAA2AhQgCiAKQQxqNgIQIApBEGohACMAQdAAayIIJAACQAJAAkACQEEAQYSAwAAoAgARAwAiEARAIBAoAgBFBEAgACgCDCEUIBBBfzYCACAAKAIEIQQgACgCCCEPIBBBBGoiCSAAKAIAKAIAIgAQEyAIIARBACAPKAIAIgwQZjYCACAMIBAoAgwiBEsNAiAIIBAoAgggDBA4IwBBMGsiDSQAIAkgABATAkACQCAMIAkoAggiAE0EQCAJKAIEIQ8gCSgCHCEEIAkoAiAiDgRAIAQgDkECdBAqGgsgCSgCKCESIAkoAiwiEQRAIBIgEUECdBAqGgsgDARAIAxBAnQhBSAPIQADQAJAIAAoAgAiA0GAgID8B08NACAOIANBf3MiC0H//wNxIgNLBEAgBCADQQJ0aiIDIAMoAgBBAWo2AgAgESALQRB2IgNLBEAgEiADQQJ0aiIDIAMoAgBBAWo2AgAMAgsgAyARQbiFwAAQNQALIAMgDkGohcAAEDUACyAAQQRqIQAgBUEEayIFDQALCyAORQRAQQAhBQwDCyAOQQFrQf////8DcSIAQQFqIgVBB3EhAyAAQQdJBEBBACEFIAQhAAwCCyAFQfj///8HcSELQQAhBSAEIQADQCAAKAIAIQYgACAFNgIAIAAoAgQhByAAIAUgBmoiBTYCBCAAKAIIIQYgACAFIAdqIgU2AgggACgCDCEHIAAgBSAGaiIFNgIMIAAoAhAhBiAAIAUgB2oiBTYCECAAKAIUIQcgACAFIAZqIgU2AhQgACgCGCEGIAAgBSAHaiIFNgIYIAAoAhwhByAAIAUgBmoiBTYCHCAAQSBqIQAgBSAHaiEFIAtBCGsiCw0ACwwBCyAMIABBuITAABA2AAsgA0UNAANAIAAoAgAhCyAAIAU2AgAgAEEEaiEAIAUgC2ohBSADQQFrIgMNAAsLIA0gBTYCBCAMBEAgDEECdCELIAkoAjQhFSAJKAI4IQZBACEDIA8hAANAAkAgACgCACIHQYCAgPwHTw0AAkAgDiAHQX9zQf//A3EiB0sEQCAEIAdBAnRqIgcoAgAiEyAGTw0BIBUgE0ECdGogAzYCACAHIAcoAgBBAWo2AgAMAgsgByAOQYiFwAAQNQALIBMgBkGYhcAAEDUACyAAQQRqIQAgA0EBaiEDIAtBBGsiCw0ACwsgCEEEaiEOAkAgEUUNACARQQFrQf////8DcSIEQQFqIgZBB3EhC0EAIQMgEiEAIARBB08EQCAGQfj///8HcSEEA0AgACgCACEGIAAgAzYCACAAKAIEIQcgACADIAZqIgM2AgQgACgCCCEGIAAgAyAHaiIDNgIIIAAoAgwhByAAIAMgBmoiAzYCDCAAKAIQIQYgACADIAdqIgM2AhAgACgCFCEHIAAgAyAGaiIDNgIUIAAoAhghBiAAIAMgB2oiAzYCGCAAKAIcIQcgACADIAZqIgM2AhwgAEEgaiEAIAMgB2ohAyAEQQhrIgQNAAsLIAtFDQADQCAAKAIAIQQgACADNgIAIABBBGohACADIARqIQMgC0EBayILDQALCwJAIAVFDQAgCSgCNCEDIAkoAjhBAnQhACAJKAIQIRMgCSgCFCELIAUhBAJAAkADQCAARQ0DIAMoAgAiCSAMTw0CIBEgDyAJQQJ0aigCAEF/c0EQdiIGSwRAIBIgBkECdGoiBigCACIHIAtPDQIgA0EEaiEDIBMgB0ECdGogCTYCACAGIAYoAgBBAWo2AgAgAEEEayEAIARBAWsiBA0BDAQLCyAGIBFB6ITAABA1AAsgByALQfiEwAAQNQALIAkgDEHYhMAAEDUACwJAIBFB//8DSwRAAkAgBSASKAL8/w9GBEAgDkGAgICAeDYCACAOIAU2AgQMAQsgDUECNgIMIA1B+IPAADYCCCANQgI3AhQgDSASQfz/D2qtQoCAgIDgAIQ3AyggDSANQQRqrUKAgICA4ACENwMgIA0gDUEgajYCECAOIA1BCGoQHQsgDUEwaiQADAELQf//AyARQciEwAAQNQALIAgoAgRBgICAgHhHDQMgCCgCCCIARQ0FIAAgECgCGCIESw0EIBAoAhQhDyAIIBRBACAAEGYiBDYCKCAIQShqIA8gABAxIARBhAFJDQUgBBAtDAULEDkAC0GcgMAAQcYAIAhBzwBqQYyAwABBtIHAABAzAAsgDCAEQeiCwAAQNgALIAhBGGogCEEMaigCADYCACAIIAgpAgQ3AxAgCEEBNgIsIAhB4ILAADYCKCAIQgE3AjQgCCAIQRBqrUKAgICAwACENwNAIAggCEFAazYCMCAIQRxqIAhBKGoQLyAIKAIgIAgoAiQQaAALIAAgBEH4gsAAEDYACyAIKAIAIgRBhAFPBEAgBBAtCyAQIBAoAgBBAWo2AgAgCEHQAGokACAKKAIIIgRBhAFPBEAgBBAtCyAKKAIEIgRBhAFPBEAgBBAtCyAKQSBqJAAgAAsXAQF/IAAoAgAiAQRAIAAoAgQgARBlCwsUACABIAEgACAAIAFdGyAAIABcGwscACAAQQA2AhAgAEIANwIIIABCgICAgMAANwIAC0QAIABFBEAjAEEgayIAJAAgAEEANgIYIABBATYCDCAAQeyLwAA2AgggAEIENwIQIABBCGpBiIzAABBDAAsgACABEG0ACxYBAW8gACUBEAAhARAbIgAgASYBIAALzgYBBn8CfwJAAkACQAJAAkAgAEEEayIFKAIAIgZBeHEiBEEEQQggBkEDcSIHGyABak8EQCAHQQAgAUEnaiIJIARJGw0BAkACQCACQQlPBEAgAiADEBwiCA0BQQAMCQsgA0HM/3tLDQFBECADQQtqQXhxIANBC0kbIQECQCAHRQRAIAFBgAJJIAQgAUEEcklyIAQgAWtBgYAIT3INAQwJCyAAQQhrIgIgBGohBwJAAkACQAJAIAEgBEsEQCAHQfyWwAAoAgBGDQQgB0H4lsAAKAIARg0CIAcoAgQiBkECcQ0FIAZBeHEiBiAEaiIEIAFJDQUgByAGEB4gBCABayIDQRBJDQEgBSABIAUoAgBBAXFyQQJyNgIAIAEgAmoiASADQQNyNgIEIAIgBGoiAiACKAIEQQFyNgIEIAEgAxAaDA0LIAQgAWsiA0EPSw0CDAwLIAUgBCAFKAIAQQFxckECcjYCACACIARqIgEgASgCBEEBcjYCBAwLC0HwlsAAKAIAIARqIgQgAUkNAgJAIAQgAWsiA0EPTQRAIAUgBkEBcSAEckECcjYCACACIARqIgEgASgCBEEBcjYCBEEAIQNBACEBDAELIAUgASAGQQFxckECcjYCACABIAJqIgEgA0EBcjYCBCACIARqIgIgAzYCACACIAIoAgRBfnE2AgQLQfiWwAAgATYCAEHwlsAAIAM2AgAMCgsgBSABIAZBAXFyQQJyNgIAIAEgAmoiASADQQNyNgIEIAcgBygCBEEBcjYCBCABIAMQGgwJC0H0lsAAKAIAIARqIgQgAUsNBwsgAxARIgFFDQEgASAAQXxBeCAFKAIAIgFBA3EbIAFBeHFqIgEgAyABIANJGxAfIAAQFgwICyAIIAAgASADIAEgA0kbEB8aIAUoAgAiAkF4cSIDIAFBBEEIIAJBA3EiAhtqSQ0DIAJBACADIAlLGw0EIAAQFgsgCAwGC0GBicAAQbCJwAAQPQALQcCJwABB8InAABA9AAtBgYnAAEGwicAAED0AC0HAicAAQfCJwAAQPQALIAUgASAGQQFxckECcjYCACABIAJqIgIgBCABayIBQQFyNgIEQfSWwAAgATYCAEH8lsAAIAI2AgAgAAwBCyAACwsZACABKAIUQaCNwABBDiABKAIYKAIMEQIACxYAIAAoAhQgASACIAAoAhgoAgwRAgALhwIBA39BnJPAACgCAEUEQAJAAkACQAJAIABFDQAgACgCACAAQQA2AgBBAXFFDQAgACgCECECIAAoAgwhASAAKAIIIQMgACgCBCEADAELQQAhAEGxk8AALQAAGkGAgBAhAkGAgBAhAwJAQYCAwAAQESIBRQ0AIAFBBGstAABBA3FFDQAgAUGAgMAAECoaCyABRQ0BC0Gsk8AAIAI2AgBBoJPAACAANgIAQaiTwAAoAgAhAkGok8AAIAE2AgBBpJPAACgCACEAQaSTwAAgAzYCAEGck8AAKAIAQZyTwABBATYCAEUgAEVyRQRAIAIgAEECdBBlCwwBC0EEQYCAwAAQUgALC0Ggk8AAC/ICAQl/QaySwAAoAgBFBEACfwJAIABFDQAgACgCACAAQQA2AgBBAXFFDQAgACgCKCEBIAAoAiQhByAAKAIgIQIgACgCHCEDIAAoAhghCCAAKAIUIQQgACgCECEFIAAoAgwhCSAAKAIIIQYgACgCBAwBC0ECIQlBBCEHQQAhAUEEIQhBAAshAEHUksAAIAE2AgBByJLAACADNgIAQbySwAAgBTYCAEGwksAAIAA2AgBB0JLAACgCACEFQdCSwAAgBzYCAEHMksAAKAIAIQBBzJLAACACNgIAQcSSwAAoAgAhAUHEksAAIAg2AgBBwJLAACgCACECQcCSwAAgBDYCAEG4ksAAKAIAIQRBuJLAACAJNgIAQbSSwAAoAgAhA0G0ksAAIAY2AgBBrJLAACgCACEGQaySwABBATYCAAJAIAZFDQAgAwRAIAQgA0EBdBBlCyACBEAgASACQQJ0EGULIABFDQAgBSAAQQJ0EGULC0GwksAAC8QEARF/QdiSwAAoAgBFBEACQCAABEAgACgCQCEBIAAoAjwhAiAAKAI4IQMgACgCNCEEIAAoAjAhBSAAKAIsIQYgACgCKCEHIAAoAiQhCCAAKAIgIQkgACgCHCEKIAAoAhghCyAAKAIUIQwgACgCECENIAAoAgwhDiAAKAIIIQ8gACgCBCEQIAAoAgAgAEEANgIAQQFxDQELQQQhAkEAIQFBACEDQQAhBEEEIQVBACEGQQAhB0EEIQhBACEJQQAhCkEEIQtBACEMQQAhDUEEIQ5BACEPQQAhEAtBmJPAACABNgIAQYyTwAAgBDYCAEGAk8AAIAc2AgBB9JLAACAKNgIAQeiSwAAgDTYCAEHcksAAIBA2AgBBlJPAACgCACEHQZSTwAAgAjYCAEGQk8AAKAIAIQBBkJPAACADNgIAQYiTwAAoAgAhCkGIk8AAIAU2AgBBhJPAACgCACEBQYSTwAAgBjYCAEH8ksAAKAIAIQVB/JLAACAINgIAQfiSwAAoAgAhAkH4ksAAIAk2AgBB8JLAACgCACEGQfCSwAAgCzYCAEHsksAAKAIAIQNB7JLAACAMNgIAQeSSwAAoAgAhCEHkksAAIA42AgBB4JLAACgCACEEQeCSwAAgDzYCAEHYksAAKAIAIQlB2JLAAEEBNgIAAkAgCUUNACAEBEAgCCAEQQJ0EGULIAMEQCAGIANBAnQQZQsgAgRAIAUgAkECdBBlCyABBEAgCiABQQJ0EGULIABFDQAgByAAQQJ0EGULC0HcksAACxQAIAAoAgAgASAAKAIEKAIMEQAACxQCAW8BfxAPIQAQGyIBIAAmASABCxAAIAEgACgCBCAAKAIIEBQLGQACfyABQQlPBEAgASAAEBwMAQsgABARCwsiACAAQu26rbbNhdT14wA3AwggAEL4gpm9le7Gxbl/NwMACyAAIABC2KGkg7Hi0d18NwMIIABCldfdmMOXiowLNwMACxMAIABB8IrAADYCBCAAIAE2AgALEAAgASAAKAIAIAAoAgQQVgsQACABIAAoAgAgACgCBBAUCxAAIAEoAhQgASgCGCAAEBgLDgAgACUBIAElASACEAYLWwECfwJAAkAgAEEEaygCACICQXhxIgNBBEEIIAJBA3EiAhsgAWpPBEAgAkEAIAMgAUEnaksbDQEgABAWDAILQYGJwABBsInAABA9AAtBwInAAEHwicAAED0ACwsdAQFvIAAoAgAlASABIAIQDCEDEBsiACADJgEgAAvCAgEGfyAAKAIAIQIjAEEQayIEJABBCiEDAkAgAkGQzgBJBEAgAiEADAELA0AgBEEGaiADaiIGQQRrIAIgAkGQzgBuIgBBkM4AbGsiB0H//wNxQeQAbiIFQQF0QdqPwABqLwAAOwAAIAZBAmsgByAFQeQAbGtB//8DcUEBdEHaj8AAai8AADsAACADQQRrIQMgAkH/wdcvSyAAIQINAAsLAkAgAEHjAE0EQCAAIQIMAQsgA0ECayIDIARBBmpqIAAgAEH//wNxQeQAbiICQeQAbGtB//8DcUEBdEHaj8AAai8AADsAAAsCQCACQQpPBEAgA0ECayIDIARBBmpqIAJBAXRB2o/AAGovAAA7AAAMAQsgA0EBayIDIARBBmpqIAJBMHI6AAALIAFBAUEAIARBBmogA2pBCiADaxAVIARBEGokAAsJACAAIAEQDgALDQAgAEHAiMAAIAEQGAsMACAAIAEpAgA3AwALDQAgAEHAi8AAIAEQGAsNACABQbiLwABBBRBWCxkAIAAgAUG8k8AAKAIAIgBBFSAAGxEBAAALCQAgAEEANgIACwgAIAAlARADCwgAIAAlARAHCwueEgQAQYCAwAALCQEAAAACAAAAAwBBlIDAAAuBDAEAAAAFAAAAY2Fubm90IGFjY2VzcyBhIFRocmVhZCBMb2NhbCBTdG9yYWdlIHZhbHVlIGR1cmluZyBvciBhZnRlciBkZXN0cnVjdGlvbi9ydXN0Yy85MGIzNWE2MjM5YzNkOGJkYWJjNTMwYTZhMDgxNmY3ZmY4OWEwYWFmL2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMAAABiABAATwAAAAQBAAAaAAAAYgAQAE8AAAD4AQAAJgAAAHNwYXJrLWludGVybmFsLXJzL3NyYy9yYXljYXN0LnJz1AAQACAAAAB+AAAAHAAAANQAEAAgAAAAgAAAABwAAADUABAAIAAAAIUAAAAgAAAAc3BhcmstaW50ZXJuYWwtcnMvc3JjL2xpYi5ycyQBEAAcAAAAHQAAADMAAAAkARAAHAAAACgAAAAtAAAAAQAAAAAAAAAkARAAHAAAADoAAAAzAAAAJAEQABwAAABFAAAALQAAACQBEAAcAAAAXgAAACgAAABzcGFyay1pbnRlcm5hbC1ycy9zcmMvc29ydC5ycwAAAJgBEAAdAAAAGwAAAB0AAACYARAAHQAAADkAAAAPAAAARXhwZWN0ZWQgIGFjdGl2ZSBzcGxhdHMgYnV0IGdvdCDYARAACQAAAOEBEAAXAAAAmAEQAB0AAAAzAAAAHQAAAJgBEAAdAAAAMwAAABUAAACYARAAHQAAACQAAAAUAAAAmAEQAB0AAAB0AAAAGQAAAJgBEAAdAAAApwAAABMAAACYARAAHQAAAJ8AAAATAAAAmAEQAB0AAACiAAAAHQAAAJgBEAAdAAAAogAAABEAAACYARAAHQAAAJAAAAAgAAAAmAEQAB0AAACQAAAAFAAAAJgBEAAdAAAAfAAAABgAAACYARAAHQAAAH0AAAAYAAAAL1VzZXJzL2RtYXJjb3MvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9qcy1zeXMtMC4zLjc3L3NyYy9saWIucnPIAhAAXAAAAPsYAAABAAAAAAAAAAQAAAAEAAAAEwAAAGNsb3N1cmUgaW52b2tlZCByZWN1cnNpdmVseSBvciBhZnRlciBiZWluZyBkcm9wcGVkTGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkdgMQACoAAAAvVXNlcnMvZG1hcmNvcy8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL29uY2VfY2VsbC0xLjIxLjMvc3JjL2xpYi5ycwCoAxAAXwAAAAgDAAAZAAAAcmVlbnRyYW50IGluaXQAABgEEAAOAAAAqAMQAF8AAAB6AgAADQAAABYAAAAMAAAABAAAABcAAAAYAAAAGQAAAC9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZABYBBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAWAQQACkAAACuBAAADQAAAEFjY2Vzc0Vycm9ybWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAAAAAsFEAAVAAAAIAUQAA0AAABzdGQvc3JjL2FsbG9jLnJzQAUQABAAAABjAQAACQAAABYAAAAMAAAABAAAABoAAAAAAAAACAAAAAQAAAAbAAAAAAAAAAgAAAAEAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAQAAAABAAAACEAAAAiAAAAIwAAACQAAABFcnJvcgAAACUAAAAMAAAABAAAACYAAAAnAAAAKAAAAGNhcGFjaXR5IG92ZXJmbG93AAAA2AUQABEAAABhbGxvYy9zcmMvcmF3X3ZlYy5yc/QFEAAUAAAAGAAAAAUAQaCMwAAL8AUBAAAAKQAAAGEgZm9ybWF0dGluZyB0cmFpdCBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB3aGVuIHRoZSB1bmRlcmx5aW5nIHN0cmVhbSBkaWQgbm90YWxsb2Mvc3JjL2ZtdC5ycwAAfgYQABAAAAB+AgAADgAAAEJvcnJvd011dEVycm9yYWxyZWFkeSBib3Jyb3dlZDogrgYQABIAAABpbmRleCBvdXQgb2YgYm91bmRzOiB0aGUgbGVuIGlzICBidXQgdGhlIGluZGV4IGlzIAAAyAYQACAAAADoBhAAEgAAAD09IT1tYXRjaGVzYXNzZXJ0aW9uIGBsZWZ0ICByaWdodGAgZmFpbGVkCiAgbGVmdDogCiByaWdodDogABcHEAAQAAAAJwcQABcAAAA+BxAACQAAACByaWdodGAgZmFpbGVkOiAKICBsZWZ0OiAAAAAXBxAAEAAAAGAHEAAQAAAAcAcQAAkAAAA+BxAACQAAADogAAABAAAAAAAAAJwHEAACAAAAfSB9Y29yZS9zcmMvZm10L251bS5ycwAAswcQABMAAABmAAAAFwAAADB4MDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTlyYW5nZSBzdGFydCBpbmRleCAgb3V0IG9mIHJhbmdlIGZvciBzbGljZSBvZiBsZW5ndGggAACiCBAAEgAAALQIEAAiAAAAcmFuZ2UgZW5kIGluZGV4IOgIEAAQAAAAtAgQACIAAAAAAAA/AAAAvwBBqJLAAAsBFABwCXByb2R1Y2VycwIIbGFuZ3VhZ2UBBFJ1c3QADHByb2Nlc3NlZC1ieQMFcnVzdGMdMS44My4wICg5MGIzNWE2MjMgMjAyNC0xMS0yNikGd2FscnVzBjAuMjMuMwx3YXNtLWJpbmRnZW4HMC4yLjEwMABJD3RhcmdldF9mZWF0dXJlcwQrD211dGFibGUtZ2xvYmFscysIc2lnbi1leHQrD3JlZmVyZW5jZS10eXBlcysKbXVsdGl2YWx1ZQ==\", self.location.href);\n    }\n    const imports = __wbg_get_imports();\n    if (typeof module_or_path === \"string\" || typeof Request === \"function\" && module_or_path instanceof Request || typeof URL === \"function\" && module_or_path instanceof URL) {\n      module_or_path = fetch(module_or_path);\n    }\n    const { instance, module } = await __wbg_load(await module_or_path, imports);\n    return __wbg_finalize_init(instance, module);\n  }\n  var ch2 = {};\n  var wk = function(c, id, msg, transfer, cb) {\n    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([\n      c + ';addEventListener(\"error\",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'\n    ], { type: \"text/javascript\" }))));\n    w.onmessage = function(e) {\n      var d = e.data, ed = d.$e$;\n      if (ed) {\n        var err2 = new Error(ed[0]);\n        err2[\"code\"] = ed[1];\n        err2.stack = ed[2];\n        cb(err2, null);\n      } else\n        cb(null, d);\n    };\n    w.postMessage(msg, transfer);\n    return w;\n  };\n  var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;\n  var fleb = new u8([\n    0,\n    0,\n    0,\n    0,\n    0,\n    0,\n    0,\n    0,\n    1,\n    1,\n    1,\n    1,\n    2,\n    2,\n    2,\n    2,\n    3,\n    3,\n    3,\n    3,\n    4,\n    4,\n    4,\n    4,\n    5,\n    5,\n    5,\n    5,\n    0,\n    /* unused */\n    0,\n    0,\n    /* impossible */\n    0\n  ]);\n  var fdeb = new u8([\n    0,\n    0,\n    0,\n    0,\n    1,\n    1,\n    2,\n    2,\n    3,\n    3,\n    4,\n    4,\n    5,\n    5,\n    6,\n    6,\n    7,\n    7,\n    8,\n    8,\n    9,\n    9,\n    10,\n    10,\n    11,\n    11,\n    12,\n    12,\n    13,\n    13,\n    /* unused */\n    0,\n    0\n  ]);\n  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);\n  var freb = function(eb, start) {\n    var b = new u16(31);\n    for (var i2 = 0; i2 < 31; ++i2) {\n      b[i2] = start += 1 << eb[i2 - 1];\n    }\n    var r = new i32(b[30]);\n    for (var i2 = 1; i2 < 30; ++i2) {\n      for (var j = b[i2]; j < b[i2 + 1]; ++j) {\n        r[j] = j - b[i2] << 5 | i2;\n      }\n    }\n    return { b, r };\n  };\n  var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;\n  fl[28] = 258, revfl[258] = 28;\n  var _b = freb(fdeb, 0), fd = _b.b;\n  var rev = new u16(32768);\n  for (var i = 0; i < 32768; ++i) {\n    var x = (i & 43690) >> 1 | (i & 21845) << 1;\n    x = (x & 52428) >> 2 | (x & 13107) << 2;\n    x = (x & 61680) >> 4 | (x & 3855) << 4;\n    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;\n  }\n  var hMap = function(cd, mb, r) {\n    var s = cd.length;\n    var i2 = 0;\n    var l = new u16(mb);\n    for (; i2 < s; ++i2) {\n      if (cd[i2])\n        ++l[cd[i2] - 1];\n    }\n    var le = new u16(mb);\n    for (i2 = 1; i2 < mb; ++i2) {\n      le[i2] = le[i2 - 1] + l[i2 - 1] << 1;\n    }\n    var co;\n    if (r) {\n      co = new u16(1 << mb);\n      var rvb = 15 - mb;\n      for (i2 = 0; i2 < s; ++i2) {\n        if (cd[i2]) {\n          var sv = i2 << 4 | cd[i2];\n          var r_1 = mb - cd[i2];\n          var v = le[cd[i2] - 1]++ << r_1;\n          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {\n            co[rev[v] >> rvb] = sv;\n          }\n        }\n      }\n    } else {\n      co = new u16(s);\n      for (i2 = 0; i2 < s; ++i2) {\n        if (cd[i2]) {\n          co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];\n        }\n      }\n    }\n    return co;\n  };\n  var flt = new u8(288);\n  for (var i = 0; i < 144; ++i)\n    flt[i] = 8;\n  for (var i = 144; i < 256; ++i)\n    flt[i] = 9;\n  for (var i = 256; i < 280; ++i)\n    flt[i] = 7;\n  for (var i = 280; i < 288; ++i)\n    flt[i] = 8;\n  var fdt = new u8(32);\n  for (var i = 0; i < 32; ++i)\n    fdt[i] = 5;\n  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);\n  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);\n  var max = function(a) {\n    var m = a[0];\n    for (var i2 = 1; i2 < a.length; ++i2) {\n      if (a[i2] > m)\n        m = a[i2];\n    }\n    return m;\n  };\n  var bits = function(d, p, m) {\n    var o = p / 8 | 0;\n    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;\n  };\n  var bits16 = function(d, p) {\n    var o = p / 8 | 0;\n    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);\n  };\n  var shft = function(p) {\n    return (p + 7) / 8 | 0;\n  };\n  var slc = function(v, s, e) {\n    if (s == null || s < 0)\n      s = 0;\n    if (e == null || e > v.length)\n      e = v.length;\n    return new u8(v.subarray(s, e));\n  };\n  var ec = [\n    \"unexpected EOF\",\n    \"invalid block type\",\n    \"invalid length/literal\",\n    \"invalid distance\",\n    \"stream finished\",\n    \"no stream handler\",\n    ,\n    \"no callback\",\n    \"invalid UTF-8 data\",\n    \"extra field too long\",\n    \"date not in range 1980-2099\",\n    \"filename too long\",\n    \"stream finishing\",\n    \"invalid zip data\"\n    // determined by unknown compression method\n  ];\n  var err = function(ind, msg, nt) {\n    var e = new Error(msg || ec[ind]);\n    e.code = ind;\n    if (Error.captureStackTrace)\n      Error.captureStackTrace(e, err);\n    if (!nt)\n      throw e;\n    return e;\n  };\n  var inflt = function(dat, st, buf, dict) {\n    var sl = dat.length, dl = dict ? dict.length : 0;\n    if (!sl || st.f && !st.l)\n      return buf || new u8(0);\n    var noBuf = !buf;\n    var resize = noBuf || st.i != 2;\n    var noSt = st.i;\n    if (noBuf)\n      buf = new u8(sl * 3);\n    var cbuf = function(l2) {\n      var bl = buf.length;\n      if (l2 > bl) {\n        var nbuf = new u8(Math.max(bl * 2, l2));\n        nbuf.set(buf);\n        buf = nbuf;\n      }\n    };\n    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;\n    var tbts = sl * 8;\n    do {\n      if (!lm) {\n        final = bits(dat, pos, 1);\n        var type = bits(dat, pos + 1, 3);\n        pos += 3;\n        if (!type) {\n          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;\n          if (t > sl) {\n            if (noSt)\n              err(0);\n            break;\n          }\n          if (resize)\n            cbuf(bt + l);\n          buf.set(dat.subarray(s, t), bt);\n          st.b = bt += l, st.p = pos = t * 8, st.f = final;\n          continue;\n        } else if (type == 1)\n          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;\n        else if (type == 2) {\n          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;\n          var tl = hLit + bits(dat, pos + 5, 31) + 1;\n          pos += 14;\n          var ldt = new u8(tl);\n          var clt = new u8(19);\n          for (var i2 = 0; i2 < hcLen; ++i2) {\n            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);\n          }\n          pos += hcLen * 3;\n          var clb = max(clt), clbmsk = (1 << clb) - 1;\n          var clm = hMap(clt, clb, 1);\n          for (var i2 = 0; i2 < tl; ) {\n            var r = clm[bits(dat, pos, clbmsk)];\n            pos += r & 15;\n            var s = r >> 4;\n            if (s < 16) {\n              ldt[i2++] = s;\n            } else {\n              var c = 0, n = 0;\n              if (s == 16)\n                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];\n              else if (s == 17)\n                n = 3 + bits(dat, pos, 7), pos += 3;\n              else if (s == 18)\n                n = 11 + bits(dat, pos, 127), pos += 7;\n              while (n--)\n                ldt[i2++] = c;\n            }\n          }\n          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);\n          lbt = max(lt);\n          dbt = max(dt);\n          lm = hMap(lt, lbt, 1);\n          dm = hMap(dt, dbt, 1);\n        } else\n          err(1);\n        if (pos > tbts) {\n          if (noSt)\n            err(0);\n          break;\n        }\n      }\n      if (resize)\n        cbuf(bt + 131072);\n      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;\n      var lpos = pos;\n      for (; ; lpos = pos) {\n        var c = lm[bits16(dat, pos) & lms], sym = c >> 4;\n        pos += c & 15;\n        if (pos > tbts) {\n          if (noSt)\n            err(0);\n          break;\n        }\n        if (!c)\n          err(2);\n        if (sym < 256)\n          buf[bt++] = sym;\n        else if (sym == 256) {\n          lpos = pos, lm = null;\n          break;\n        } else {\n          var add = sym - 254;\n          if (sym > 264) {\n            var i2 = sym - 257, b = fleb[i2];\n            add = bits(dat, pos, (1 << b) - 1) + fl[i2];\n            pos += b;\n          }\n          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;\n          if (!d)\n            err(3);\n          pos += d & 15;\n          var dt = fd[dsym];\n          if (dsym > 3) {\n            var b = fdeb[dsym];\n            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;\n          }\n          if (pos > tbts) {\n            if (noSt)\n              err(0);\n            break;\n          }\n          if (resize)\n            cbuf(bt + 131072);\n          var end = bt + add;\n          if (bt < dt) {\n            var shift = dl - dt, dend = Math.min(dt, end);\n            if (shift + bt < 0)\n              err(3);\n            for (; bt < dend; ++bt)\n              buf[bt] = dict[shift + bt];\n          }\n          for (; bt < end; ++bt)\n            buf[bt] = buf[bt - dt];\n        }\n      }\n      st.l = lm, st.p = lpos, st.b = bt, st.f = final;\n      if (lm)\n        final = 1, st.m = lbt, st.d = dm, st.n = dbt;\n    } while (!final);\n    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);\n  };\n  var et = /* @__PURE__ */ new u8(0);\n  var mrg = function(a, b) {\n    var o = {};\n    for (var k in a)\n      o[k] = a[k];\n    for (var k in b)\n      o[k] = b[k];\n    return o;\n  };\n  var wcln = function(fn, fnStr, td2) {\n    var dt = fn();\n    var st = fn.toString();\n    var ks = st.slice(st.indexOf(\"[\") + 1, st.lastIndexOf(\"]\")).replace(/\\s+/g, \"\").split(\",\");\n    for (var i2 = 0; i2 < dt.length; ++i2) {\n      var v = dt[i2], k = ks[i2];\n      if (typeof v == \"function\") {\n        fnStr += \";\" + k + \"=\";\n        var st_1 = v.toString();\n        if (v.prototype) {\n          if (st_1.indexOf(\"[native code]\") != -1) {\n            var spInd = st_1.indexOf(\" \", 8) + 1;\n            fnStr += st_1.slice(spInd, st_1.indexOf(\"(\", spInd));\n          } else {\n            fnStr += st_1;\n            for (var t in v.prototype)\n              fnStr += \";\" + k + \".prototype.\" + t + \"=\" + v.prototype[t].toString();\n          }\n        } else\n          fnStr += st_1;\n      } else\n        td2[k] = v;\n    }\n    return fnStr;\n  };\n  var ch = [];\n  var cbfs = function(v) {\n    var tl = [];\n    for (var k in v) {\n      if (v[k].buffer) {\n        tl.push((v[k] = new v[k].constructor(v[k])).buffer);\n      }\n    }\n    return tl;\n  };\n  var wrkr = function(fns, init, id, cb) {\n    if (!ch[id]) {\n      var fnStr = \"\", td_1 = {}, m = fns.length - 1;\n      for (var i2 = 0; i2 < m; ++i2)\n        fnStr = wcln(fns[i2], fnStr, td_1);\n      ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };\n    }\n    var td2 = mrg({}, ch[id].e);\n    return wk(ch[id].c + \";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=\" + init.toString() + \"}\", id, td2, cbfs(td2), cb);\n  };\n  var bInflt = function() {\n    return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt];\n  };\n  var pbf = function(msg) {\n    return postMessage(msg, [msg.buffer]);\n  };\n  var gopt = function(o) {\n    return o && {\n      out: o.size && new u8(o.size),\n      dictionary: o.dictionary\n    };\n  };\n  var cbify = function(dat, opts, fns, init, id, cb) {\n    var w = wrkr(fns, init, id, function(err2, dat2) {\n      w.terminate();\n      cb(err2, dat2);\n    });\n    w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);\n    return function() {\n      w.terminate();\n    };\n  };\n  var b2 = function(d, b) {\n    return d[b] | d[b + 1] << 8;\n  };\n  var b4 = function(d, b) {\n    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;\n  };\n  var b8 = function(d, b) {\n    return b4(d, b) + b4(d, b + 4) * 4294967296;\n  };\n  var gzs = function(d) {\n    if (d[0] != 31 || d[1] != 139 || d[2] != 8)\n      err(6, \"invalid gzip data\");\n    var flg = d[3];\n    var st = 10;\n    if (flg & 4)\n      st += (d[10] | d[11] << 8) + 2;\n    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])\n      ;\n    return st + (flg & 2);\n  };\n  var Inflate = /* @__PURE__ */ function() {\n    function Inflate2(opts, cb) {\n      if (typeof opts == \"function\")\n        cb = opts, opts = {};\n      this.ondata = cb;\n      var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);\n      this.s = { i: 0, b: dict ? dict.length : 0 };\n      this.o = new u8(32768);\n      this.p = new u8(0);\n      if (dict)\n        this.o.set(dict);\n    }\n    Inflate2.prototype.e = function(c) {\n      if (!this.ondata)\n        err(5);\n      if (this.d)\n        err(4);\n      if (!this.p.length)\n        this.p = c;\n      else if (c.length) {\n        var n = new u8(this.p.length + c.length);\n        n.set(this.p), n.set(c, this.p.length), this.p = n;\n      }\n    };\n    Inflate2.prototype.c = function(final) {\n      this.s.i = +(this.d = final || false);\n      var bts = this.s.b;\n      var dt = inflt(this.p, this.s, this.o);\n      this.ondata(slc(dt, bts, this.s.b), this.d);\n      this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;\n      this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;\n    };\n    Inflate2.prototype.push = function(chunk, final) {\n      this.e(chunk), this.c(final);\n    };\n    return Inflate2;\n  }();\n  function inflate(data, opts, cb) {\n    if (!cb)\n      cb = opts, opts = {};\n    if (typeof cb != \"function\")\n      err(7);\n    return cbify(data, opts, [\n      bInflt\n    ], function(ev) {\n      return pbf(inflateSync(ev.data[0], gopt(ev.data[1])));\n    }, 1, cb);\n  }\n  function inflateSync(data, opts) {\n    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);\n  }\n  var Gunzip = /* @__PURE__ */ function() {\n    function Gunzip2(opts, cb) {\n      this.v = 1;\n      this.r = 0;\n      Inflate.call(this, opts, cb);\n    }\n    Gunzip2.prototype.push = function(chunk, final) {\n      Inflate.prototype.e.call(this, chunk);\n      this.r += chunk.length;\n      if (this.v) {\n        var p = this.p.subarray(this.v - 1);\n        var s = p.length > 3 ? gzs(p) : 4;\n        if (s > p.length) {\n          if (!final)\n            return;\n        } else if (this.v > 1 && this.onmember) {\n          this.onmember(this.r - p.length);\n        }\n        this.p = p.subarray(s), this.v = 0;\n      }\n      Inflate.prototype.c.call(this, final);\n      if (this.s.f && !this.s.l && !final) {\n        this.v = shft(this.s.p) + 9;\n        this.s = { i: 0 };\n        this.o = new u8(0);\n        this.push(new u8(0), final);\n      }\n    };\n    return Gunzip2;\n  }();\n  var td = typeof TextDecoder != \"undefined\" && /* @__PURE__ */ new TextDecoder();\n  try {\n    td.decode(et, { stream: true });\n  } catch (e) {\n  }\n  var dutf8 = function(d) {\n    for (var r = \"\", i2 = 0; ; ) {\n      var c = d[i2++];\n      var eb = (c > 127) + (c > 223) + (c > 239);\n      if (i2 + eb > d.length)\n        return { s: r, r: slc(d, i2 - 1) };\n      if (!eb)\n        r += String.fromCharCode(c);\n      else if (eb == 3) {\n        c = ((c & 15) << 18 | (d[i2++] & 63) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);\n      } else if (eb & 1)\n        r += String.fromCharCode((c & 31) << 6 | d[i2++] & 63);\n      else\n        r += String.fromCharCode((c & 15) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63);\n    }\n  };\n  function strFromU8(dat, latin1) {\n    if (latin1) {\n      var r = \"\";\n      for (var i2 = 0; i2 < dat.length; i2 += 16384)\n        r += String.fromCharCode.apply(null, dat.subarray(i2, i2 + 16384));\n      return r;\n    } else if (td) {\n      return td.decode(dat);\n    } else {\n      var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;\n      if (r.length)\n        err(8);\n      return s;\n    }\n  }\n  var slzh = function(d, b) {\n    return b + 30 + b2(d, b + 26) + b2(d, b + 28);\n  };\n  var zh = function(d, b, z) {\n    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);\n    var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];\n    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];\n  };\n  var z64e = function(d, b) {\n    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))\n      ;\n    return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];\n  };\n  var mt = typeof queueMicrotask == \"function\" ? queueMicrotask : typeof setTimeout == \"function\" ? setTimeout : function(fn) {\n    fn();\n  };\n  function unzip(data, opts, cb) {\n    if (!cb)\n      cb = opts, opts = {};\n    if (typeof cb != \"function\")\n      err(7);\n    var term = [];\n    var tAll = function() {\n      for (var i3 = 0; i3 < term.length; ++i3)\n        term[i3]();\n    };\n    var files = {};\n    var cbd = function(a, b) {\n      mt(function() {\n        cb(a, b);\n      });\n    };\n    mt(function() {\n      cbd = cb;\n    });\n    var e = data.length - 22;\n    for (; b4(data, e) != 101010256; --e) {\n      if (!e || data.length - e > 65558) {\n        cbd(err(13, 0, 1), null);\n        return tAll;\n      }\n    }\n    var lft = b2(data, e + 8);\n    if (lft) {\n      var c = lft;\n      var o = b4(data, e + 16);\n      var z = o == 4294967295 || c == 65535;\n      if (z) {\n        var ze = b4(data, e - 12);\n        z = b4(data, ze) == 101075792;\n        if (z) {\n          c = lft = b4(data, ze + 32);\n          o = b4(data, ze + 48);\n        }\n      }\n      var fltr = opts && opts.filter;\n      var _loop_3 = function(i3) {\n        var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);\n        o = no;\n        var cbl = function(e2, d) {\n          if (e2) {\n            tAll();\n            cbd(e2, null);\n          } else {\n            if (d)\n              files[fn] = d;\n            if (!--lft)\n              cbd(null, files);\n          }\n        };\n        if (!fltr || fltr({\n          name: fn,\n          size: sc,\n          originalSize: su,\n          compression: c_1\n        })) {\n          if (!c_1)\n            cbl(null, slc(data, b, b + sc));\n          else if (c_1 == 8) {\n            var infl = data.subarray(b, b + sc);\n            if (su < 524288 || sc > 0.8 * su) {\n              try {\n                cbl(null, inflateSync(infl, { out: new u8(su) }));\n              } catch (e2) {\n                cbl(e2, null);\n              }\n            } else\n              term.push(inflate(infl, { size: su }, cbl));\n          } else\n            cbl(err(14, \"unknown compression type \" + c_1, 1), null);\n        } else\n          cbl(null, null);\n      };\n      for (var i2 = 0; i2 < c; ++i2) {\n        _loop_3(i2);\n      }\n    } else\n      cbd(null, {});\n    return tAll;\n  }\n  function unzipSync(data, opts) {\n    var files = {};\n    var e = data.length - 22;\n    for (; b4(data, e) != 101010256; --e) {\n      if (!e || data.length - e > 65558)\n        err(13);\n    }\n    var c = b2(data, e + 8);\n    if (!c)\n      return {};\n    var o = b4(data, e + 16);\n    var z = o == 4294967295 || c == 65535;\n    if (z) {\n      var ze = b4(data, e - 12);\n      z = b4(data, ze) == 101075792;\n      if (z) {\n        c = b4(data, ze + 32);\n        o = b4(data, ze + 48);\n      }\n    }\n    var fltr = opts && opts.filter;\n    for (var i2 = 0; i2 < c; ++i2) {\n      var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);\n      o = no;\n      if (!fltr || fltr({\n        name: fn,\n        size: sc,\n        originalSize: su,\n        compression: c_2\n      })) {\n        if (!c_2)\n          files[fn] = slc(data, b, b + sc);\n        else if (c_2 == 8)\n          files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });\n        else\n          err(14, \"unknown compression type \" + c_2);\n      }\n    }\n    return files;\n  }\n  /**\n   * @license\n   * Copyright 2010-2025 Three.js Authors\n   * SPDX-License-Identifier: MIT\n   */\n  const REVISION = \"178\";\n  const NoColorSpace = \"\";\n  const SRGBColorSpace = \"srgb\";\n  const LinearSRGBColorSpace = \"srgb-linear\";\n  const LinearTransfer = \"linear\";\n  const SRGBTransfer = \"srgb\";\n  function clamp(value, min, max2) {\n    return Math.max(min, Math.min(max2, value));\n  }\n  function euclideanModulo(n, m) {\n    return (n % m + m) % m;\n  }\n  function lerp(x2, y, t) {\n    return (1 - t) * x2 + t * y;\n  }\n  class Quaternion {\n    /**\n     * Constructs a new quaternion.\n     *\n     * @param {number} [x=0] - The x value of this quaternion.\n     * @param {number} [y=0] - The y value of this quaternion.\n     * @param {number} [z=0] - The z value of this quaternion.\n     * @param {number} [w=1] - The w value of this quaternion.\n     */\n    constructor(x2 = 0, y = 0, z = 0, w = 1) {\n      this.isQuaternion = true;\n      this._x = x2;\n      this._y = y;\n      this._z = z;\n      this._w = w;\n    }\n    /**\n     * Interpolates between two quaternions via SLERP. This implementation assumes the\n     * quaternion data are managed  in flat arrays.\n     *\n     * @param {Array<number>} dst - The destination array.\n     * @param {number} dstOffset - An offset into the destination array.\n     * @param {Array<number>} src0 - The source array of the first quaternion.\n     * @param {number} srcOffset0 - An offset into the first source array.\n     * @param {Array<number>} src1 -  The source array of the second quaternion.\n     * @param {number} srcOffset1 - An offset into the second source array.\n     * @param {number} t - The interpolation factor in the range `[0,1]`.\n     * @see {@link Quaternion#slerp}\n     */\n    static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {\n      let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];\n      const x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];\n      if (t === 0) {\n        dst[dstOffset + 0] = x0;\n        dst[dstOffset + 1] = y0;\n        dst[dstOffset + 2] = z0;\n        dst[dstOffset + 3] = w0;\n        return;\n      }\n      if (t === 1) {\n        dst[dstOffset + 0] = x1;\n        dst[dstOffset + 1] = y1;\n        dst[dstOffset + 2] = z1;\n        dst[dstOffset + 3] = w1;\n        return;\n      }\n      if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {\n        let s = 1 - t;\n        const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1, dir = cos >= 0 ? 1 : -1, sqrSin = 1 - cos * cos;\n        if (sqrSin > Number.EPSILON) {\n          const sin = Math.sqrt(sqrSin), len = Math.atan2(sin, cos * dir);\n          s = Math.sin(s * len) / sin;\n          t = Math.sin(t * len) / sin;\n        }\n        const tDir = t * dir;\n        x0 = x0 * s + x1 * tDir;\n        y0 = y0 * s + y1 * tDir;\n        z0 = z0 * s + z1 * tDir;\n        w0 = w0 * s + w1 * tDir;\n        if (s === 1 - t) {\n          const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);\n          x0 *= f;\n          y0 *= f;\n          z0 *= f;\n          w0 *= f;\n        }\n      }\n      dst[dstOffset] = x0;\n      dst[dstOffset + 1] = y0;\n      dst[dstOffset + 2] = z0;\n      dst[dstOffset + 3] = w0;\n    }\n    /**\n     * Multiplies two quaternions. This implementation assumes the quaternion data are managed\n     * in flat arrays.\n     *\n     * @param {Array<number>} dst - The destination array.\n     * @param {number} dstOffset - An offset into the destination array.\n     * @param {Array<number>} src0 - The source array of the first quaternion.\n     * @param {number} srcOffset0 - An offset into the first source array.\n     * @param {Array<number>} src1 -  The source array of the second quaternion.\n     * @param {number} srcOffset1 - An offset into the second source array.\n     * @return {Array<number>} The destination array.\n     * @see {@link Quaternion#multiplyQuaternions}.\n     */\n    static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {\n      const x0 = src0[srcOffset0];\n      const y0 = src0[srcOffset0 + 1];\n      const z0 = src0[srcOffset0 + 2];\n      const w0 = src0[srcOffset0 + 3];\n      const x1 = src1[srcOffset1];\n      const y1 = src1[srcOffset1 + 1];\n      const z1 = src1[srcOffset1 + 2];\n      const w1 = src1[srcOffset1 + 3];\n      dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;\n      dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;\n      dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;\n      dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;\n      return dst;\n    }\n    /**\n     * The x value of this quaternion.\n     *\n     * @type {number}\n     * @default 0\n     */\n    get x() {\n      return this._x;\n    }\n    set x(value) {\n      this._x = value;\n      this._onChangeCallback();\n    }\n    /**\n     * The y value of this quaternion.\n     *\n     * @type {number}\n     * @default 0\n     */\n    get y() {\n      return this._y;\n    }\n    set y(value) {\n      this._y = value;\n      this._onChangeCallback();\n    }\n    /**\n     * The z value of this quaternion.\n     *\n     * @type {number}\n     * @default 0\n     */\n    get z() {\n      return this._z;\n    }\n    set z(value) {\n      this._z = value;\n      this._onChangeCallback();\n    }\n    /**\n     * The w value of this quaternion.\n     *\n     * @type {number}\n     * @default 1\n     */\n    get w() {\n      return this._w;\n    }\n    set w(value) {\n      this._w = value;\n      this._onChangeCallback();\n    }\n    /**\n     * Sets the quaternion components.\n     *\n     * @param {number} x - The x value of this quaternion.\n     * @param {number} y - The y value of this quaternion.\n     * @param {number} z - The z value of this quaternion.\n     * @param {number} w - The w value of this quaternion.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    set(x2, y, z, w) {\n      this._x = x2;\n      this._y = y;\n      this._z = z;\n      this._w = w;\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Returns a new quaternion with copied values from this instance.\n     *\n     * @return {Quaternion} A clone of this instance.\n     */\n    clone() {\n      return new this.constructor(this._x, this._y, this._z, this._w);\n    }\n    /**\n     * Copies the values of the given quaternion to this instance.\n     *\n     * @param {Quaternion} quaternion - The quaternion to copy.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    copy(quaternion) {\n      this._x = quaternion.x;\n      this._y = quaternion.y;\n      this._z = quaternion.z;\n      this._w = quaternion.w;\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Sets this quaternion from the rotation specified by the given\n     * Euler angles.\n     *\n     * @param {Euler} euler - The Euler angles.\n     * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    setFromEuler(euler, update = true) {\n      const x2 = euler._x, y = euler._y, z = euler._z, order = euler._order;\n      const cos = Math.cos;\n      const sin = Math.sin;\n      const c1 = cos(x2 / 2);\n      const c2 = cos(y / 2);\n      const c3 = cos(z / 2);\n      const s1 = sin(x2 / 2);\n      const s2 = sin(y / 2);\n      const s3 = sin(z / 2);\n      switch (order) {\n        case \"XYZ\":\n          this._x = s1 * c2 * c3 + c1 * s2 * s3;\n          this._y = c1 * s2 * c3 - s1 * c2 * s3;\n          this._z = c1 * c2 * s3 + s1 * s2 * c3;\n          this._w = c1 * c2 * c3 - s1 * s2 * s3;\n          break;\n        case \"YXZ\":\n          this._x = s1 * c2 * c3 + c1 * s2 * s3;\n          this._y = c1 * s2 * c3 - s1 * c2 * s3;\n          this._z = c1 * c2 * s3 - s1 * s2 * c3;\n          this._w = c1 * c2 * c3 + s1 * s2 * s3;\n          break;\n        case \"ZXY\":\n          this._x = s1 * c2 * c3 - c1 * s2 * s3;\n          this._y = c1 * s2 * c3 + s1 * c2 * s3;\n          this._z = c1 * c2 * s3 + s1 * s2 * c3;\n          this._w = c1 * c2 * c3 - s1 * s2 * s3;\n          break;\n        case \"ZYX\":\n          this._x = s1 * c2 * c3 - c1 * s2 * s3;\n          this._y = c1 * s2 * c3 + s1 * c2 * s3;\n          this._z = c1 * c2 * s3 - s1 * s2 * c3;\n          this._w = c1 * c2 * c3 + s1 * s2 * s3;\n          break;\n        case \"YZX\":\n          this._x = s1 * c2 * c3 + c1 * s2 * s3;\n          this._y = c1 * s2 * c3 + s1 * c2 * s3;\n          this._z = c1 * c2 * s3 - s1 * s2 * c3;\n          this._w = c1 * c2 * c3 - s1 * s2 * s3;\n          break;\n        case \"XZY\":\n          this._x = s1 * c2 * c3 - c1 * s2 * s3;\n          this._y = c1 * s2 * c3 - s1 * c2 * s3;\n          this._z = c1 * c2 * s3 + s1 * s2 * c3;\n          this._w = c1 * c2 * c3 + s1 * s2 * s3;\n          break;\n        default:\n          console.warn(\"THREE.Quaternion: .setFromEuler() encountered an unknown order: \" + order);\n      }\n      if (update === true) this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Sets this quaternion from the given axis and angle.\n     *\n     * @param {Vector3} axis - The normalized axis.\n     * @param {number} angle - The angle in radians.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    setFromAxisAngle(axis, angle) {\n      const halfAngle = angle / 2, s = Math.sin(halfAngle);\n      this._x = axis.x * s;\n      this._y = axis.y * s;\n      this._z = axis.z * s;\n      this._w = Math.cos(halfAngle);\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Sets this quaternion from the given rotation matrix.\n     *\n     * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    setFromRotationMatrix(m) {\n      const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;\n      if (trace > 0) {\n        const s = 0.5 / Math.sqrt(trace + 1);\n        this._w = 0.25 / s;\n        this._x = (m32 - m23) * s;\n        this._y = (m13 - m31) * s;\n        this._z = (m21 - m12) * s;\n      } else if (m11 > m22 && m11 > m33) {\n        const s = 2 * Math.sqrt(1 + m11 - m22 - m33);\n        this._w = (m32 - m23) / s;\n        this._x = 0.25 * s;\n        this._y = (m12 + m21) / s;\n        this._z = (m13 + m31) / s;\n      } else if (m22 > m33) {\n        const s = 2 * Math.sqrt(1 + m22 - m11 - m33);\n        this._w = (m13 - m31) / s;\n        this._x = (m12 + m21) / s;\n        this._y = 0.25 * s;\n        this._z = (m23 + m32) / s;\n      } else {\n        const s = 2 * Math.sqrt(1 + m33 - m11 - m22);\n        this._w = (m21 - m12) / s;\n        this._x = (m13 + m31) / s;\n        this._y = (m23 + m32) / s;\n        this._z = 0.25 * s;\n      }\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Sets this quaternion to the rotation required to rotate the direction vector\n     * `vFrom` to the direction vector `vTo`.\n     *\n     * @param {Vector3} vFrom - The first (normalized) direction vector.\n     * @param {Vector3} vTo - The second (normalized) direction vector.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    setFromUnitVectors(vFrom, vTo) {\n      let r = vFrom.dot(vTo) + 1;\n      if (r < 1e-8) {\n        r = 0;\n        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {\n          this._x = -vFrom.y;\n          this._y = vFrom.x;\n          this._z = 0;\n          this._w = r;\n        } else {\n          this._x = 0;\n          this._y = -vFrom.z;\n          this._z = vFrom.y;\n          this._w = r;\n        }\n      } else {\n        this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;\n        this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;\n        this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;\n        this._w = r;\n      }\n      return this.normalize();\n    }\n    /**\n     * Returns the angle between this quaternion and the given one in radians.\n     *\n     * @param {Quaternion} q - The quaternion to compute the angle with.\n     * @return {number} The angle in radians.\n     */\n    angleTo(q) {\n      return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));\n    }\n    /**\n     * Rotates this quaternion by a given angular step to the given quaternion.\n     * The method ensures that the final quaternion will not overshoot `q`.\n     *\n     * @param {Quaternion} q - The target quaternion.\n     * @param {number} step - The angular step in radians.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    rotateTowards(q, step) {\n      const angle = this.angleTo(q);\n      if (angle === 0) return this;\n      const t = Math.min(1, step / angle);\n      this.slerp(q, t);\n      return this;\n    }\n    /**\n     * Sets this quaternion to the identity quaternion; that is, to the\n     * quaternion that represents \"no rotation\".\n     *\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    identity() {\n      return this.set(0, 0, 0, 1);\n    }\n    /**\n     * Inverts this quaternion via {@link Quaternion#conjugate}. The\n     * quaternion is assumed to have unit length.\n     *\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    invert() {\n      return this.conjugate();\n    }\n    /**\n     * Returns the rotational conjugate of this quaternion. The conjugate of a\n     * quaternion represents the same rotation in the opposite direction about\n     * the rotational axis.\n     *\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    conjugate() {\n      this._x *= -1;\n      this._y *= -1;\n      this._z *= -1;\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Calculates the dot product of this quaternion and the given one.\n     *\n     * @param {Quaternion} v - The quaternion to compute the dot product with.\n     * @return {number} The result of the dot product.\n     */\n    dot(v) {\n      return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;\n    }\n    /**\n     * Computes the squared Euclidean length (straight-line length) of this quaternion,\n     * considered as a 4 dimensional vector. This can be useful if you are comparing the\n     * lengths of two quaternions, as this is a slightly more efficient calculation than\n     * {@link Quaternion#length}.\n     *\n     * @return {number} The squared Euclidean length.\n     */\n    lengthSq() {\n      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;\n    }\n    /**\n     * Computes the Euclidean length (straight-line length) of this quaternion,\n     * considered as a 4 dimensional vector.\n     *\n     * @return {number} The Euclidean length.\n     */\n    length() {\n      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);\n    }\n    /**\n     * Normalizes this quaternion - that is, calculated the quaternion that performs\n     * the same rotation as this one, but has a length equal to `1`.\n     *\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    normalize() {\n      let l = this.length();\n      if (l === 0) {\n        this._x = 0;\n        this._y = 0;\n        this._z = 0;\n        this._w = 1;\n      } else {\n        l = 1 / l;\n        this._x = this._x * l;\n        this._y = this._y * l;\n        this._z = this._z * l;\n        this._w = this._w * l;\n      }\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Multiplies this quaternion by the given one.\n     *\n     * @param {Quaternion} q - The quaternion.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    multiply(q) {\n      return this.multiplyQuaternions(this, q);\n    }\n    /**\n     * Pre-multiplies this quaternion by the given one.\n     *\n     * @param {Quaternion} q - The quaternion.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    premultiply(q) {\n      return this.multiplyQuaternions(q, this);\n    }\n    /**\n     * Multiplies the given quaternions and stores the result in this instance.\n     *\n     * @param {Quaternion} a - The first quaternion.\n     * @param {Quaternion} b - The second quaternion.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    multiplyQuaternions(a, b) {\n      const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;\n      const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;\n      this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;\n      this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;\n      this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;\n      this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Performs a spherical linear interpolation between quaternions.\n     *\n     * @param {Quaternion} qb - The target quaternion.\n     * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    slerp(qb, t) {\n      if (t === 0) return this;\n      if (t === 1) return this.copy(qb);\n      const x2 = this._x, y = this._y, z = this._z, w = this._w;\n      let cosHalfTheta = w * qb._w + x2 * qb._x + y * qb._y + z * qb._z;\n      if (cosHalfTheta < 0) {\n        this._w = -qb._w;\n        this._x = -qb._x;\n        this._y = -qb._y;\n        this._z = -qb._z;\n        cosHalfTheta = -cosHalfTheta;\n      } else {\n        this.copy(qb);\n      }\n      if (cosHalfTheta >= 1) {\n        this._w = w;\n        this._x = x2;\n        this._y = y;\n        this._z = z;\n        return this;\n      }\n      const sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;\n      if (sqrSinHalfTheta <= Number.EPSILON) {\n        const s = 1 - t;\n        this._w = s * w + t * this._w;\n        this._x = s * x2 + t * this._x;\n        this._y = s * y + t * this._y;\n        this._z = s * z + t * this._z;\n        this.normalize();\n        return this;\n      }\n      const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);\n      const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);\n      const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;\n      this._w = w * ratioA + this._w * ratioB;\n      this._x = x2 * ratioA + this._x * ratioB;\n      this._y = y * ratioA + this._y * ratioB;\n      this._z = z * ratioA + this._z * ratioB;\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Performs a spherical linear interpolation between the given quaternions\n     * and stores the result in this quaternion.\n     *\n     * @param {Quaternion} qa - The source quaternion.\n     * @param {Quaternion} qb - The target quaternion.\n     * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    slerpQuaternions(qa, qb, t) {\n      return this.copy(qa).slerp(qb, t);\n    }\n    /**\n     * Sets this quaternion to a uniformly random, normalized quaternion.\n     *\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    random() {\n      const theta1 = 2 * Math.PI * Math.random();\n      const theta2 = 2 * Math.PI * Math.random();\n      const x0 = Math.random();\n      const r1 = Math.sqrt(1 - x0);\n      const r2 = Math.sqrt(x0);\n      return this.set(\n        r1 * Math.sin(theta1),\n        r1 * Math.cos(theta1),\n        r2 * Math.sin(theta2),\n        r2 * Math.cos(theta2)\n      );\n    }\n    /**\n     * Returns `true` if this quaternion is equal with the given one.\n     *\n     * @param {Quaternion} quaternion - The quaternion to test for equality.\n     * @return {boolean} Whether this quaternion is equal with the given one.\n     */\n    equals(quaternion) {\n      return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;\n    }\n    /**\n     * Sets this quaternion's components from the given array.\n     *\n     * @param {Array<number>} array - An array holding the quaternion component values.\n     * @param {number} [offset=0] - The offset into the array.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    fromArray(array, offset = 0) {\n      this._x = array[offset];\n      this._y = array[offset + 1];\n      this._z = array[offset + 2];\n      this._w = array[offset + 3];\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * Writes the components of this quaternion to the given array. If no array is provided,\n     * the method returns a new instance.\n     *\n     * @param {Array<number>} [array=[]] - The target array holding the quaternion components.\n     * @param {number} [offset=0] - Index of the first element in the array.\n     * @return {Array<number>} The quaternion components.\n     */\n    toArray(array = [], offset = 0) {\n      array[offset] = this._x;\n      array[offset + 1] = this._y;\n      array[offset + 2] = this._z;\n      array[offset + 3] = this._w;\n      return array;\n    }\n    /**\n     * Sets the components of this quaternion from the given buffer attribute.\n     *\n     * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.\n     * @param {number} index - The index into the attribute.\n     * @return {Quaternion} A reference to this quaternion.\n     */\n    fromBufferAttribute(attribute, index) {\n      this._x = attribute.getX(index);\n      this._y = attribute.getY(index);\n      this._z = attribute.getZ(index);\n      this._w = attribute.getW(index);\n      this._onChangeCallback();\n      return this;\n    }\n    /**\n     * This methods defines the serialization result of this class. Returns the\n     * numerical elements of this quaternion in an array of format `[x, y, z, w]`.\n     *\n     * @return {Array<number>} The serialized quaternion.\n     */\n    toJSON() {\n      return this.toArray();\n    }\n    _onChange(callback) {\n      this._onChangeCallback = callback;\n      return this;\n    }\n    _onChangeCallback() {\n    }\n    *[Symbol.iterator]() {\n      yield this._x;\n      yield this._y;\n      yield this._z;\n      yield this._w;\n    }\n  }\n  class Vector3 {\n    /**\n     * Constructs a new 3D vector.\n     *\n     * @param {number} [x=0] - The x value of this vector.\n     * @param {number} [y=0] - The y value of this vector.\n     * @param {number} [z=0] - The z value of this vector.\n     */\n    constructor(x2 = 0, y = 0, z = 0) {\n      Vector3.prototype.isVector3 = true;\n      this.x = x2;\n      this.y = y;\n      this.z = z;\n    }\n    /**\n     * Sets the vector components.\n     *\n     * @param {number} x - The value of the x component.\n     * @param {number} y - The value of the y component.\n     * @param {number} z - The value of the z component.\n     * @return {Vector3} A reference to this vector.\n     */\n    set(x2, y, z) {\n      if (z === void 0) z = this.z;\n      this.x = x2;\n      this.y = y;\n      this.z = z;\n      return this;\n    }\n    /**\n     * Sets the vector components to the same value.\n     *\n     * @param {number} scalar - The value to set for all vector components.\n     * @return {Vector3} A reference to this vector.\n     */\n    setScalar(scalar) {\n      this.x = scalar;\n      this.y = scalar;\n      this.z = scalar;\n      return this;\n    }\n    /**\n     * Sets the vector's x component to the given value\n     *\n     * @param {number} x - The value to set.\n     * @return {Vector3} A reference to this vector.\n     */\n    setX(x2) {\n      this.x = x2;\n      return this;\n    }\n    /**\n     * Sets the vector's y component to the given value\n     *\n     * @param {number} y - The value to set.\n     * @return {Vector3} A reference to this vector.\n     */\n    setY(y) {\n      this.y = y;\n      return this;\n    }\n    /**\n     * Sets the vector's z component to the given value\n     *\n     * @param {number} z - The value to set.\n     * @return {Vector3} A reference to this vector.\n     */\n    setZ(z) {\n      this.z = z;\n      return this;\n    }\n    /**\n     * Allows to set a vector component with an index.\n     *\n     * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.\n     * @param {number} value - The value to set.\n     * @return {Vector3} A reference to this vector.\n     */\n    setComponent(index, value) {\n      switch (index) {\n        case 0:\n          this.x = value;\n          break;\n        case 1:\n          this.y = value;\n          break;\n        case 2:\n          this.z = value;\n          break;\n        default:\n          throw new Error(\"index is out of range: \" + index);\n      }\n      return this;\n    }\n    /**\n     * Returns the value of the vector component which matches the given index.\n     *\n     * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.\n     * @return {number} A vector component value.\n     */\n    getComponent(index) {\n      switch (index) {\n        case 0:\n          return this.x;\n        case 1:\n          return this.y;\n        case 2:\n          return this.z;\n        default:\n          throw new Error(\"index is out of range: \" + index);\n      }\n    }\n    /**\n     * Returns a new vector with copied values from this instance.\n     *\n     * @return {Vector3} A clone of this instance.\n     */\n    clone() {\n      return new this.constructor(this.x, this.y, this.z);\n    }\n    /**\n     * Copies the values of the given vector to this instance.\n     *\n     * @param {Vector3} v - The vector to copy.\n     * @return {Vector3} A reference to this vector.\n     */\n    copy(v) {\n      this.x = v.x;\n      this.y = v.y;\n      this.z = v.z;\n      return this;\n    }\n    /**\n     * Adds the given vector to this instance.\n     *\n     * @param {Vector3} v - The vector to add.\n     * @return {Vector3} A reference to this vector.\n     */\n    add(v) {\n      this.x += v.x;\n      this.y += v.y;\n      this.z += v.z;\n      return this;\n    }\n    /**\n     * Adds the given scalar value to all components of this instance.\n     *\n     * @param {number} s - The scalar to add.\n     * @return {Vector3} A reference to this vector.\n     */\n    addScalar(s) {\n      this.x += s;\n      this.y += s;\n      this.z += s;\n      return this;\n    }\n    /**\n     * Adds the given vectors and stores the result in this instance.\n     *\n     * @param {Vector3} a - The first vector.\n     * @param {Vector3} b - The second vector.\n     * @return {Vector3} A reference to this vector.\n     */\n    addVectors(a, b) {\n      this.x = a.x + b.x;\n      this.y = a.y + b.y;\n      this.z = a.z + b.z;\n      return this;\n    }\n    /**\n     * Adds the given vector scaled by the given factor to this instance.\n     *\n     * @param {Vector3|Vector4} v - The vector.\n     * @param {number} s - The factor that scales `v`.\n     * @return {Vector3} A reference to this vector.\n     */\n    addScaledVector(v, s) {\n      this.x += v.x * s;\n      this.y += v.y * s;\n      this.z += v.z * s;\n      return this;\n    }\n    /**\n     * Subtracts the given vector from this instance.\n     *\n     * @param {Vector3} v - The vector to subtract.\n     * @return {Vector3} A reference to this vector.\n     */\n    sub(v) {\n      this.x -= v.x;\n      this.y -= v.y;\n      this.z -= v.z;\n      return this;\n    }\n    /**\n     * Subtracts the given scalar value from all components of this instance.\n     *\n     * @param {number} s - The scalar to subtract.\n     * @return {Vector3} A reference to this vector.\n     */\n    subScalar(s) {\n      this.x -= s;\n      this.y -= s;\n      this.z -= s;\n      return this;\n    }\n    /**\n     * Subtracts the given vectors and stores the result in this instance.\n     *\n     * @param {Vector3} a - The first vector.\n     * @param {Vector3} b - The second vector.\n     * @return {Vector3} A reference to this vector.\n     */\n    subVectors(a, b) {\n      this.x = a.x - b.x;\n      this.y = a.y - b.y;\n      this.z = a.z - b.z;\n      return this;\n    }\n    /**\n     * Multiplies the given vector with this instance.\n     *\n     * @param {Vector3} v - The vector to multiply.\n     * @return {Vector3} A reference to this vector.\n     */\n    multiply(v) {\n      this.x *= v.x;\n      this.y *= v.y;\n      this.z *= v.z;\n      return this;\n    }\n    /**\n     * Multiplies the given scalar value with all components of this instance.\n     *\n     * @param {number} scalar - The scalar to multiply.\n     * @return {Vector3} A reference to this vector.\n     */\n    multiplyScalar(scalar) {\n      this.x *= scalar;\n      this.y *= scalar;\n      this.z *= scalar;\n      return this;\n    }\n    /**\n     * Multiplies the given vectors and stores the result in this instance.\n     *\n     * @param {Vector3} a - The first vector.\n     * @param {Vector3} b - The second vector.\n     * @return {Vector3} A reference to this vector.\n     */\n    multiplyVectors(a, b) {\n      this.x = a.x * b.x;\n      this.y = a.y * b.y;\n      this.z = a.z * b.z;\n      return this;\n    }\n    /**\n     * Applies the given Euler rotation to this vector.\n     *\n     * @param {Euler} euler - The Euler angles.\n     * @return {Vector3} A reference to this vector.\n     */\n    applyEuler(euler) {\n      return this.applyQuaternion(_quaternion$4.setFromEuler(euler));\n    }\n    /**\n     * Applies a rotation specified by an axis and an angle to this vector.\n     *\n     * @param {Vector3} axis - A normalized vector representing the rotation axis.\n     * @param {number} angle - The angle in radians.\n     * @return {Vector3} A reference to this vector.\n     */\n    applyAxisAngle(axis, angle) {\n      return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));\n    }\n    /**\n     * Multiplies this vector with the given 3x3 matrix.\n     *\n     * @param {Matrix3} m - The 3x3 matrix.\n     * @return {Vector3} A reference to this vector.\n     */\n    applyMatrix3(m) {\n      const x2 = this.x, y = this.y, z = this.z;\n      const e = m.elements;\n      this.x = e[0] * x2 + e[3] * y + e[6] * z;\n      this.y = e[1] * x2 + e[4] * y + e[7] * z;\n      this.z = e[2] * x2 + e[5] * y + e[8] * z;\n      return this;\n    }\n    /**\n     * Multiplies this vector by the given normal matrix and normalizes\n     * the result.\n     *\n     * @param {Matrix3} m - The normal matrix.\n     * @return {Vector3} A reference to this vector.\n     */\n    applyNormalMatrix(m) {\n      return this.applyMatrix3(m).normalize();\n    }\n    /**\n     * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and\n     * divides by perspective.\n     *\n     * @param {Matrix4} m - The matrix to apply.\n     * @return {Vector3} A reference to this vector.\n     */\n    applyMatrix4(m) {\n      const x2 = this.x, y = this.y, z = this.z;\n      const e = m.elements;\n      const w = 1 / (e[3] * x2 + e[7] * y + e[11] * z + e[15]);\n      this.x = (e[0] * x2 + e[4] * y + e[8] * z + e[12]) * w;\n      this.y = (e[1] * x2 + e[5] * y + e[9] * z + e[13]) * w;\n      this.z = (e[2] * x2 + e[6] * y + e[10] * z + e[14]) * w;\n      return this;\n    }\n    /**\n     * Applies the given Quaternion to this vector.\n     *\n     * @param {Quaternion} q - The Quaternion.\n     * @return {Vector3} A reference to this vector.\n     */\n    applyQuaternion(q) {\n      const vx = this.x, vy = this.y, vz = this.z;\n      const qx = q.x, qy = q.y, qz = q.z, qw = q.w;\n      const tx = 2 * (qy * vz - qz * vy);\n      const ty = 2 * (qz * vx - qx * vz);\n      const tz = 2 * (qx * vy - qy * vx);\n      this.x = vx + qw * tx + qy * tz - qz * ty;\n      this.y = vy + qw * ty + qz * tx - qx * tz;\n      this.z = vz + qw * tz + qx * ty - qy * tx;\n      return this;\n    }\n    /**\n     * Projects this vector from world space into the camera's normalized\n     * device coordinate (NDC) space.\n     *\n     * @param {Camera} camera - The camera.\n     * @return {Vector3} A reference to this vector.\n     */\n    project(camera) {\n      return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);\n    }\n    /**\n     * Unprojects this vector from the camera's normalized device coordinate (NDC)\n     * space into world space.\n     *\n     * @param {Camera} camera - The camera.\n     * @return {Vector3} A reference to this vector.\n     */\n    unproject(camera) {\n      return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);\n    }\n    /**\n     * Transforms the direction of this vector by a matrix (the upper left 3 x 3\n     * subset of the given 4x4 matrix and then normalizes the result.\n     *\n     * @param {Matrix4} m - The matrix.\n     * @return {Vector3} A reference to this vector.\n     */\n    transformDirection(m) {\n      const x2 = this.x, y = this.y, z = this.z;\n      const e = m.elements;\n      this.x = e[0] * x2 + e[4] * y + e[8] * z;\n      this.y = e[1] * x2 + e[5] * y + e[9] * z;\n      this.z = e[2] * x2 + e[6] * y + e[10] * z;\n      return this.normalize();\n    }\n    /**\n     * Divides this instance by the given vector.\n     *\n     * @param {Vector3} v - The vector to divide.\n     * @return {Vector3} A reference to this vector.\n     */\n    divide(v) {\n      this.x /= v.x;\n      this.y /= v.y;\n      this.z /= v.z;\n      return this;\n    }\n    /**\n     * Divides this vector by the given scalar.\n     *\n     * @param {number} scalar - The scalar to divide.\n     * @return {Vector3} A reference to this vector.\n     */\n    divideScalar(scalar) {\n      return this.multiplyScalar(1 / scalar);\n    }\n    /**\n     * If this vector's x, y or z value is greater than the given vector's x, y or z\n     * value, replace that value with the corresponding min value.\n     *\n     * @param {Vector3} v - The vector.\n     * @return {Vector3} A reference to this vector.\n     */\n    min(v) {\n      this.x = Math.min(this.x, v.x);\n      this.y = Math.min(this.y, v.y);\n      this.z = Math.min(this.z, v.z);\n      return this;\n    }\n    /**\n     * If this vector's x, y or z value is less than the given vector's x, y or z\n     * value, replace that value with the corresponding max value.\n     *\n     * @param {Vector3} v - The vector.\n     * @return {Vector3} A reference to this vector.\n     */\n    max(v) {\n      this.x = Math.max(this.x, v.x);\n      this.y = Math.max(this.y, v.y);\n      this.z = Math.max(this.z, v.z);\n      return this;\n    }\n    /**\n     * If this vector's x, y or z value is greater than the max vector's x, y or z\n     * value, it is replaced by the corresponding value.\n     * If this vector's x, y or z value is less than the min vector's x, y or z value,\n     * it is replaced by the corresponding value.\n     *\n     * @param {Vector3} min - The minimum x, y and z values.\n     * @param {Vector3} max - The maximum x, y and z values in the desired range.\n     * @return {Vector3} A reference to this vector.\n     */\n    clamp(min, max2) {\n      this.x = clamp(this.x, min.x, max2.x);\n      this.y = clamp(this.y, min.y, max2.y);\n      this.z = clamp(this.z, min.z, max2.z);\n      return this;\n    }\n    /**\n     * If this vector's x, y or z values are greater than the max value, they are\n     * replaced by the max value.\n     * If this vector's x, y or z values are less than the min value, they are\n     * replaced by the min value.\n     *\n     * @param {number} minVal - The minimum value the components will be clamped to.\n     * @param {number} maxVal - The maximum value the components will be clamped to.\n     * @return {Vector3} A reference to this vector.\n     */\n    clampScalar(minVal, maxVal) {\n      this.x = clamp(this.x, minVal, maxVal);\n      this.y = clamp(this.y, minVal, maxVal);\n      this.z = clamp(this.z, minVal, maxVal);\n      return this;\n    }\n    /**\n     * If this vector's length is greater than the max value, it is replaced by\n     * the max value.\n     * If this vector's length is less than the min value, it is replaced by the\n     * min value.\n     *\n     * @param {number} min - The minimum value the vector length will be clamped to.\n     * @param {number} max - The maximum value the vector length will be clamped to.\n     * @return {Vector3} A reference to this vector.\n     */\n    clampLength(min, max2) {\n      const length = this.length();\n      return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max2));\n    }\n    /**\n     * The components of this vector are rounded down to the nearest integer value.\n     *\n     * @return {Vector3} A reference to this vector.\n     */\n    floor() {\n      this.x = Math.floor(this.x);\n      this.y = Math.floor(this.y);\n      this.z = Math.floor(this.z);\n      return this;\n    }\n    /**\n     * The components of this vector are rounded up to the nearest integer value.\n     *\n     * @return {Vector3} A reference to this vector.\n     */\n    ceil() {\n      this.x = Math.ceil(this.x);\n      this.y = Math.ceil(this.y);\n      this.z = Math.ceil(this.z);\n      return this;\n    }\n    /**\n     * The components of this vector are rounded to the nearest integer value\n     *\n     * @return {Vector3} A reference to this vector.\n     */\n    round() {\n      this.x = Math.round(this.x);\n      this.y = Math.round(this.y);\n      this.z = Math.round(this.z);\n      return this;\n    }\n    /**\n     * The components of this vector are rounded towards zero (up if negative,\n     * down if positive) to an integer value.\n     *\n     * @return {Vector3} A reference to this vector.\n     */\n    roundToZero() {\n      this.x = Math.trunc(this.x);\n      this.y = Math.trunc(this.y);\n      this.z = Math.trunc(this.z);\n      return this;\n    }\n    /**\n     * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.\n     *\n     * @return {Vector3} A reference to this vector.\n     */\n    negate() {\n      this.x = -this.x;\n      this.y = -this.y;\n      this.z = -this.z;\n      return this;\n    }\n    /**\n     * Calculates the dot product of the given vector with this instance.\n     *\n     * @param {Vector3} v - The vector to compute the dot product with.\n     * @return {number} The result of the dot product.\n     */\n    dot(v) {\n      return this.x * v.x + this.y * v.y + this.z * v.z;\n    }\n    // TODO lengthSquared?\n    /**\n     * Computes the square of the Euclidean length (straight-line length) from\n     * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should\n     * compare the length squared instead as it is slightly more efficient to calculate.\n     *\n     * @return {number} The square length of this vector.\n     */\n    lengthSq() {\n      return this.x * this.x + this.y * this.y + this.z * this.z;\n    }\n    /**\n     * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).\n     *\n     * @return {number} The length of this vector.\n     */\n    length() {\n      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);\n    }\n    /**\n     * Computes the Manhattan length of this vector.\n     *\n     * @return {number} The length of this vector.\n     */\n    manhattanLength() {\n      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);\n    }\n    /**\n     * Converts this vector to a unit vector - that is, sets it equal to a vector\n     * with the same direction as this one, but with a vector length of `1`.\n     *\n     * @return {Vector3} A reference to this vector.\n     */\n    normalize() {\n      return this.divideScalar(this.length() || 1);\n    }\n    /**\n     * Sets this vector to a vector with the same direction as this one, but\n     * with the specified length.\n     *\n     * @param {number} length - The new length of this vector.\n     * @return {Vector3} A reference to this vector.\n     */\n    setLength(length) {\n      return this.normalize().multiplyScalar(length);\n    }\n    /**\n     * Linearly interpolates between the given vector and this instance, where\n     * alpha is the percent distance along the line - alpha = 0 will be this\n     * vector, and alpha = 1 will be the given one.\n     *\n     * @param {Vector3} v - The vector to interpolate towards.\n     * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.\n     * @return {Vector3} A reference to this vector.\n     */\n    lerp(v, alpha) {\n      this.x += (v.x - this.x) * alpha;\n      this.y += (v.y - this.y) * alpha;\n      this.z += (v.z - this.z) * alpha;\n      return this;\n    }\n    /**\n     * Linearly interpolates between the given vectors, where alpha is the percent\n     * distance along the line - alpha = 0 will be first vector, and alpha = 1 will\n     * be the second one. The result is stored in this instance.\n     *\n     * @param {Vector3} v1 - The first vector.\n     * @param {Vector3} v2 - The second vector.\n     * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.\n     * @return {Vector3} A reference to this vector.\n     */\n    lerpVectors(v1, v2, alpha) {\n      this.x = v1.x + (v2.x - v1.x) * alpha;\n      this.y = v1.y + (v2.y - v1.y) * alpha;\n      this.z = v1.z + (v2.z - v1.z) * alpha;\n      return this;\n    }\n    /**\n     * Calculates the cross product of the given vector with this instance.\n     *\n     * @param {Vector3} v - The vector to compute the cross product with.\n     * @return {Vector3} The result of the cross product.\n     */\n    cross(v) {\n      return this.crossVectors(this, v);\n    }\n    /**\n     * Calculates the cross product of the given vectors and stores the result\n     * in this instance.\n     *\n     * @param {Vector3} a - The first vector.\n     * @param {Vector3} b - The second vector.\n     * @return {Vector3} A reference to this vector.\n     */\n    crossVectors(a, b) {\n      const ax = a.x, ay = a.y, az = a.z;\n      const bx = b.x, by = b.y, bz = b.z;\n      this.x = ay * bz - az * by;\n      this.y = az * bx - ax * bz;\n      this.z = ax * by - ay * bx;\n      return this;\n    }\n    /**\n     * Projects this vector onto the given one.\n     *\n     * @param {Vector3} v - The vector to project to.\n     * @return {Vector3} A reference to this vector.\n     */\n    projectOnVector(v) {\n      const denominator = v.lengthSq();\n      if (denominator === 0) return this.set(0, 0, 0);\n      const scalar = v.dot(this) / denominator;\n      return this.copy(v).multiplyScalar(scalar);\n    }\n    /**\n     * Projects this vector onto a plane by subtracting this\n     * vector projected onto the plane's normal from this vector.\n     *\n     * @param {Vector3} planeNormal - The plane normal.\n     * @return {Vector3} A reference to this vector.\n     */\n    projectOnPlane(planeNormal) {\n      _vector$c.copy(this).projectOnVector(planeNormal);\n      return this.sub(_vector$c);\n    }\n    /**\n     * Reflects this vector off a plane orthogonal to the given normal vector.\n     *\n     * @param {Vector3} normal - The (normalized) normal vector.\n     * @return {Vector3} A reference to this vector.\n     */\n    reflect(normal) {\n      return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));\n    }\n    /**\n     * Returns the angle between the given vector and this instance in radians.\n     *\n     * @param {Vector3} v - The vector to compute the angle with.\n     * @return {number} The angle in radians.\n     */\n    angleTo(v) {\n      const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());\n      if (denominator === 0) return Math.PI / 2;\n      const theta = this.dot(v) / denominator;\n      return Math.acos(clamp(theta, -1, 1));\n    }\n    /**\n     * Computes the distance from the given vector to this instance.\n     *\n     * @param {Vector3} v - The vector to compute the distance to.\n     * @return {number} The distance.\n     */\n    distanceTo(v) {\n      return Math.sqrt(this.distanceToSquared(v));\n    }\n    /**\n     * Computes the squared distance from the given vector to this instance.\n     * If you are just comparing the distance with another distance, you should compare\n     * the distance squared instead as it is slightly more efficient to calculate.\n     *\n     * @param {Vector3} v - The vector to compute the squared distance to.\n     * @return {number} The squared distance.\n     */\n    distanceToSquared(v) {\n      const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;\n      return dx * dx + dy * dy + dz * dz;\n    }\n    /**\n     * Computes the Manhattan distance from the given vector to this instance.\n     *\n     * @param {Vector3} v - The vector to compute the Manhattan distance to.\n     * @return {number} The Manhattan distance.\n     */\n    manhattanDistanceTo(v) {\n      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);\n    }\n    /**\n     * Sets the vector components from the given spherical coordinates.\n     *\n     * @param {Spherical} s - The spherical coordinates.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromSpherical(s) {\n      return this.setFromSphericalCoords(s.radius, s.phi, s.theta);\n    }\n    /**\n     * Sets the vector components from the given spherical coordinates.\n     *\n     * @param {number} radius - The radius.\n     * @param {number} phi - The phi angle in radians.\n     * @param {number} theta - The theta angle in radians.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromSphericalCoords(radius, phi, theta) {\n      const sinPhiRadius = Math.sin(phi) * radius;\n      this.x = sinPhiRadius * Math.sin(theta);\n      this.y = Math.cos(phi) * radius;\n      this.z = sinPhiRadius * Math.cos(theta);\n      return this;\n    }\n    /**\n     * Sets the vector components from the given cylindrical coordinates.\n     *\n     * @param {Cylindrical} c - The cylindrical coordinates.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromCylindrical(c) {\n      return this.setFromCylindricalCoords(c.radius, c.theta, c.y);\n    }\n    /**\n     * Sets the vector components from the given cylindrical coordinates.\n     *\n     * @param {number} radius - The radius.\n     * @param {number} theta - The theta angle in radians.\n     * @param {number} y - The y value.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromCylindricalCoords(radius, theta, y) {\n      this.x = radius * Math.sin(theta);\n      this.y = y;\n      this.z = radius * Math.cos(theta);\n      return this;\n    }\n    /**\n     * Sets the vector components to the position elements of the\n     * given transformation matrix.\n     *\n     * @param {Matrix4} m - The 4x4 matrix.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromMatrixPosition(m) {\n      const e = m.elements;\n      this.x = e[12];\n      this.y = e[13];\n      this.z = e[14];\n      return this;\n    }\n    /**\n     * Sets the vector components to the scale elements of the\n     * given transformation matrix.\n     *\n     * @param {Matrix4} m - The 4x4 matrix.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromMatrixScale(m) {\n      const sx = this.setFromMatrixColumn(m, 0).length();\n      const sy = this.setFromMatrixColumn(m, 1).length();\n      const sz = this.setFromMatrixColumn(m, 2).length();\n      this.x = sx;\n      this.y = sy;\n      this.z = sz;\n      return this;\n    }\n    /**\n     * Sets the vector components from the specified matrix column.\n     *\n     * @param {Matrix4} m - The 4x4 matrix.\n     * @param {number} index - The column index.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromMatrixColumn(m, index) {\n      return this.fromArray(m.elements, index * 4);\n    }\n    /**\n     * Sets the vector components from the specified matrix column.\n     *\n     * @param {Matrix3} m - The 3x3 matrix.\n     * @param {number} index - The column index.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromMatrix3Column(m, index) {\n      return this.fromArray(m.elements, index * 3);\n    }\n    /**\n     * Sets the vector components from the given Euler angles.\n     *\n     * @param {Euler} e - The Euler angles to set.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromEuler(e) {\n      this.x = e._x;\n      this.y = e._y;\n      this.z = e._z;\n      return this;\n    }\n    /**\n     * Sets the vector components from the RGB components of the\n     * given color.\n     *\n     * @param {Color} c - The color to set.\n     * @return {Vector3} A reference to this vector.\n     */\n    setFromColor(c) {\n      this.x = c.r;\n      this.y = c.g;\n      this.z = c.b;\n      return this;\n    }\n    /**\n     * Returns `true` if this vector is equal with the given one.\n     *\n     * @param {Vector3} v - The vector to test for equality.\n     * @return {boolean} Whether this vector is equal with the given one.\n     */\n    equals(v) {\n      return v.x === this.x && v.y === this.y && v.z === this.z;\n    }\n    /**\n     * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`\n     * and z value to be `array[ offset + 2 ]`.\n     *\n     * @param {Array<number>} array - An array holding the vector component values.\n     * @param {number} [offset=0] - The offset into the array.\n     * @return {Vector3} A reference to this vector.\n     */\n    fromArray(array, offset = 0) {\n      this.x = array[offset];\n      this.y = array[offset + 1];\n      this.z = array[offset + 2];\n      return this;\n    }\n    /**\n     * Writes the components of this vector to the given array. If no array is provided,\n     * the method returns a new instance.\n     *\n     * @param {Array<number>} [array=[]] - The target array holding the vector components.\n     * @param {number} [offset=0] - Index of the first element in the array.\n     * @return {Array<number>} The vector components.\n     */\n    toArray(array = [], offset = 0) {\n      array[offset] = this.x;\n      array[offset + 1] = this.y;\n      array[offset + 2] = this.z;\n      return array;\n    }\n    /**\n     * Sets the components of this vector from the given buffer attribute.\n     *\n     * @param {BufferAttribute} attribute - The buffer attribute holding vector data.\n     * @param {number} index - The index into the attribute.\n     * @return {Vector3} A reference to this vector.\n     */\n    fromBufferAttribute(attribute, index) {\n      this.x = attribute.getX(index);\n      this.y = attribute.getY(index);\n      this.z = attribute.getZ(index);\n      return this;\n    }\n    /**\n     * Sets each component of this vector to a pseudo-random value between `0` and\n     * `1`, excluding `1`.\n     *\n     * @return {Vector3} A reference to this vector.\n     */\n    random() {\n      this.x = Math.random();\n      this.y = Math.random();\n      this.z = Math.random();\n      return this;\n    }\n    /**\n     * Sets this vector to a uniformly random point on a unit sphere.\n     *\n     * @return {Vector3} A reference to this vector.\n     */\n    randomDirection() {\n      const theta = Math.random() * Math.PI * 2;\n      const u = Math.random() * 2 - 1;\n      const c = Math.sqrt(1 - u * u);\n      this.x = c * Math.cos(theta);\n      this.y = u;\n      this.z = c * Math.sin(theta);\n      return this;\n    }\n    *[Symbol.iterator]() {\n      yield this.x;\n      yield this.y;\n      yield this.z;\n    }\n  }\n  const _vector$c = /* @__PURE__ */ new Vector3();\n  const _quaternion$4 = /* @__PURE__ */ new Quaternion();\n  class Matrix3 {\n    /**\n     * Constructs a new 3x3 matrix. The arguments are supposed to be\n     * in row-major order. If no arguments are provided, the constructor\n     * initializes the matrix as an identity matrix.\n     *\n     * @param {number} [n11] - 1-1 matrix element.\n     * @param {number} [n12] - 1-2 matrix element.\n     * @param {number} [n13] - 1-3 matrix element.\n     * @param {number} [n21] - 2-1 matrix element.\n     * @param {number} [n22] - 2-2 matrix element.\n     * @param {number} [n23] - 2-3 matrix element.\n     * @param {number} [n31] - 3-1 matrix element.\n     * @param {number} [n32] - 3-2 matrix element.\n     * @param {number} [n33] - 3-3 matrix element.\n     */\n    constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {\n      Matrix3.prototype.isMatrix3 = true;\n      this.elements = [\n        1,\n        0,\n        0,\n        0,\n        1,\n        0,\n        0,\n        0,\n        1\n      ];\n      if (n11 !== void 0) {\n        this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);\n      }\n    }\n    /**\n     * Sets the elements of the matrix.The arguments are supposed to be\n     * in row-major order.\n     *\n     * @param {number} [n11] - 1-1 matrix element.\n     * @param {number} [n12] - 1-2 matrix element.\n     * @param {number} [n13] - 1-3 matrix element.\n     * @param {number} [n21] - 2-1 matrix element.\n     * @param {number} [n22] - 2-2 matrix element.\n     * @param {number} [n23] - 2-3 matrix element.\n     * @param {number} [n31] - 3-1 matrix element.\n     * @param {number} [n32] - 3-2 matrix element.\n     * @param {number} [n33] - 3-3 matrix element.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {\n      const te = this.elements;\n      te[0] = n11;\n      te[1] = n21;\n      te[2] = n31;\n      te[3] = n12;\n      te[4] = n22;\n      te[5] = n32;\n      te[6] = n13;\n      te[7] = n23;\n      te[8] = n33;\n      return this;\n    }\n    /**\n     * Sets this matrix to the 3x3 identity matrix.\n     *\n     * @return {Matrix3} A reference to this matrix.\n     */\n    identity() {\n      this.set(\n        1,\n        0,\n        0,\n        0,\n        1,\n        0,\n        0,\n        0,\n        1\n      );\n      return this;\n    }\n    /**\n     * Copies the values of the given matrix to this instance.\n     *\n     * @param {Matrix3} m - The matrix to copy.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    copy(m) {\n      const te = this.elements;\n      const me = m.elements;\n      te[0] = me[0];\n      te[1] = me[1];\n      te[2] = me[2];\n      te[3] = me[3];\n      te[4] = me[4];\n      te[5] = me[5];\n      te[6] = me[6];\n      te[7] = me[7];\n      te[8] = me[8];\n      return this;\n    }\n    /**\n     * Extracts the basis of this matrix into the three axis vectors provided.\n     *\n     * @param {Vector3} xAxis - The basis's x axis.\n     * @param {Vector3} yAxis - The basis's y axis.\n     * @param {Vector3} zAxis - The basis's z axis.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    extractBasis(xAxis, yAxis, zAxis) {\n      xAxis.setFromMatrix3Column(this, 0);\n      yAxis.setFromMatrix3Column(this, 1);\n      zAxis.setFromMatrix3Column(this, 2);\n      return this;\n    }\n    /**\n     * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.\n     *\n     * @param {Matrix4} m - The 4x4 matrix.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    setFromMatrix4(m) {\n      const me = m.elements;\n      this.set(\n        me[0],\n        me[4],\n        me[8],\n        me[1],\n        me[5],\n        me[9],\n        me[2],\n        me[6],\n        me[10]\n      );\n      return this;\n    }\n    /**\n     * Post-multiplies this matrix by the given 3x3 matrix.\n     *\n     * @param {Matrix3} m - The matrix to multiply with.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    multiply(m) {\n      return this.multiplyMatrices(this, m);\n    }\n    /**\n     * Pre-multiplies this matrix by the given 3x3 matrix.\n     *\n     * @param {Matrix3} m - The matrix to multiply with.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    premultiply(m) {\n      return this.multiplyMatrices(m, this);\n    }\n    /**\n     * Multiples the given 3x3 matrices and stores the result\n     * in this matrix.\n     *\n     * @param {Matrix3} a - The first matrix.\n     * @param {Matrix3} b - The second matrix.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    multiplyMatrices(a, b) {\n      const ae = a.elements;\n      const be = b.elements;\n      const te = this.elements;\n      const a11 = ae[0], a12 = ae[3], a13 = ae[6];\n      const a21 = ae[1], a22 = ae[4], a23 = ae[7];\n      const a31 = ae[2], a32 = ae[5], a33 = ae[8];\n      const b11 = be[0], b12 = be[3], b13 = be[6];\n      const b21 = be[1], b22 = be[4], b23 = be[7];\n      const b31 = be[2], b32 = be[5], b33 = be[8];\n      te[0] = a11 * b11 + a12 * b21 + a13 * b31;\n      te[3] = a11 * b12 + a12 * b22 + a13 * b32;\n      te[6] = a11 * b13 + a12 * b23 + a13 * b33;\n      te[1] = a21 * b11 + a22 * b21 + a23 * b31;\n      te[4] = a21 * b12 + a22 * b22 + a23 * b32;\n      te[7] = a21 * b13 + a22 * b23 + a23 * b33;\n      te[2] = a31 * b11 + a32 * b21 + a33 * b31;\n      te[5] = a31 * b12 + a32 * b22 + a33 * b32;\n      te[8] = a31 * b13 + a32 * b23 + a33 * b33;\n      return this;\n    }\n    /**\n     * Multiplies every component of the matrix by the given scalar.\n     *\n     * @param {number} s - The scalar.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    multiplyScalar(s) {\n      const te = this.elements;\n      te[0] *= s;\n      te[3] *= s;\n      te[6] *= s;\n      te[1] *= s;\n      te[4] *= s;\n      te[7] *= s;\n      te[2] *= s;\n      te[5] *= s;\n      te[8] *= s;\n      return this;\n    }\n    /**\n     * Computes and returns the determinant of this matrix.\n     *\n     * @return {number} The determinant.\n     */\n    determinant() {\n      const te = this.elements;\n      const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i2 = te[8];\n      return a * e * i2 - a * f * h - b * d * i2 + b * f * g + c * d * h - c * e * g;\n    }\n    /**\n     * Inverts this matrix, using the [analytic method]{@link https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution}.\n     * You can not invert with a determinant of zero. If you attempt this, the method produces\n     * a zero matrix instead.\n     *\n     * @return {Matrix3} A reference to this matrix.\n     */\n    invert() {\n      const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;\n      if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);\n      const detInv = 1 / det;\n      te[0] = t11 * detInv;\n      te[1] = (n31 * n23 - n33 * n21) * detInv;\n      te[2] = (n32 * n21 - n31 * n22) * detInv;\n      te[3] = t12 * detInv;\n      te[4] = (n33 * n11 - n31 * n13) * detInv;\n      te[5] = (n31 * n12 - n32 * n11) * detInv;\n      te[6] = t13 * detInv;\n      te[7] = (n21 * n13 - n23 * n11) * detInv;\n      te[8] = (n22 * n11 - n21 * n12) * detInv;\n      return this;\n    }\n    /**\n     * Transposes this matrix in place.\n     *\n     * @return {Matrix3} A reference to this matrix.\n     */\n    transpose() {\n      let tmp;\n      const m = this.elements;\n      tmp = m[1];\n      m[1] = m[3];\n      m[3] = tmp;\n      tmp = m[2];\n      m[2] = m[6];\n      m[6] = tmp;\n      tmp = m[5];\n      m[5] = m[7];\n      m[7] = tmp;\n      return this;\n    }\n    /**\n     * Computes the normal matrix which is the inverse transpose of the upper\n     * left 3x3 portion of the given 4x4 matrix.\n     *\n     * @param {Matrix4} matrix4 - The 4x4 matrix.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    getNormalMatrix(matrix4) {\n      return this.setFromMatrix4(matrix4).invert().transpose();\n    }\n    /**\n     * Transposes this matrix into the supplied array, and returns itself unchanged.\n     *\n     * @param {Array<number>} r - An array to store the transposed matrix elements.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    transposeIntoArray(r) {\n      const m = this.elements;\n      r[0] = m[0];\n      r[1] = m[3];\n      r[2] = m[6];\n      r[3] = m[1];\n      r[4] = m[4];\n      r[5] = m[7];\n      r[6] = m[2];\n      r[7] = m[5];\n      r[8] = m[8];\n      return this;\n    }\n    /**\n     * Sets the UV transform matrix from offset, repeat, rotation, and center.\n     *\n     * @param {number} tx - Offset x.\n     * @param {number} ty - Offset y.\n     * @param {number} sx - Repeat x.\n     * @param {number} sy - Repeat y.\n     * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.\n     * @param {number} cx - Center x of rotation.\n     * @param {number} cy - Center y of rotation\n     * @return {Matrix3} A reference to this matrix.\n     */\n    setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {\n      const c = Math.cos(rotation);\n      const s = Math.sin(rotation);\n      this.set(\n        sx * c,\n        sx * s,\n        -sx * (c * cx + s * cy) + cx + tx,\n        -sy * s,\n        sy * c,\n        -sy * (-s * cx + c * cy) + cy + ty,\n        0,\n        0,\n        1\n      );\n      return this;\n    }\n    /**\n     * Scales this matrix with the given scalar values.\n     *\n     * @param {number} sx - The amount to scale in the X axis.\n     * @param {number} sy - The amount to scale in the Y axis.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    scale(sx, sy) {\n      this.premultiply(_m3.makeScale(sx, sy));\n      return this;\n    }\n    /**\n     * Rotates this matrix by the given angle.\n     *\n     * @param {number} theta - The rotation in radians.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    rotate(theta) {\n      this.premultiply(_m3.makeRotation(-theta));\n      return this;\n    }\n    /**\n     * Translates this matrix by the given scalar values.\n     *\n     * @param {number} tx - The amount to translate in the X axis.\n     * @param {number} ty - The amount to translate in the Y axis.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    translate(tx, ty) {\n      this.premultiply(_m3.makeTranslation(tx, ty));\n      return this;\n    }\n    // for 2D Transforms\n    /**\n     * Sets this matrix as a 2D translation transform.\n     *\n     * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.\n     * @param {number} y - The amount to translate in the Y axis.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    makeTranslation(x2, y) {\n      if (x2.isVector2) {\n        this.set(\n          1,\n          0,\n          x2.x,\n          0,\n          1,\n          x2.y,\n          0,\n          0,\n          1\n        );\n      } else {\n        this.set(\n          1,\n          0,\n          x2,\n          0,\n          1,\n          y,\n          0,\n          0,\n          1\n        );\n      }\n      return this;\n    }\n    /**\n     * Sets this matrix as a 2D rotational transformation.\n     *\n     * @param {number} theta - The rotation in radians.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    makeRotation(theta) {\n      const c = Math.cos(theta);\n      const s = Math.sin(theta);\n      this.set(\n        c,\n        -s,\n        0,\n        s,\n        c,\n        0,\n        0,\n        0,\n        1\n      );\n      return this;\n    }\n    /**\n     * Sets this matrix as a 2D scale transform.\n     *\n     * @param {number} x - The amount to scale in the X axis.\n     * @param {number} y - The amount to scale in the Y axis.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    makeScale(x2, y) {\n      this.set(\n        x2,\n        0,\n        0,\n        0,\n        y,\n        0,\n        0,\n        0,\n        1\n      );\n      return this;\n    }\n    /**\n     * Returns `true` if this matrix is equal with the given one.\n     *\n     * @param {Matrix3} matrix - The matrix to test for equality.\n     * @return {boolean} Whether this matrix is equal with the given one.\n     */\n    equals(matrix) {\n      const te = this.elements;\n      const me = matrix.elements;\n      for (let i2 = 0; i2 < 9; i2++) {\n        if (te[i2] !== me[i2]) return false;\n      }\n      return true;\n    }\n    /**\n     * Sets the elements of the matrix from the given array.\n     *\n     * @param {Array<number>} array - The matrix elements in column-major order.\n     * @param {number} [offset=0] - Index of the first element in the array.\n     * @return {Matrix3} A reference to this matrix.\n     */\n    fromArray(array, offset = 0) {\n      for (let i2 = 0; i2 < 9; i2++) {\n        this.elements[i2] = array[i2 + offset];\n      }\n      return this;\n    }\n    /**\n     * Writes the elements of this matrix to the given array. If no array is provided,\n     * the method returns a new instance.\n     *\n     * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.\n     * @param {number} [offset=0] - Index of the first element in the array.\n     * @return {Array<number>} The matrix elements in column-major order.\n     */\n    toArray(array = [], offset = 0) {\n      const te = this.elements;\n      array[offset] = te[0];\n      array[offset + 1] = te[1];\n      array[offset + 2] = te[2];\n      array[offset + 3] = te[3];\n      array[offset + 4] = te[4];\n      array[offset + 5] = te[5];\n      array[offset + 6] = te[6];\n      array[offset + 7] = te[7];\n      array[offset + 8] = te[8];\n      return array;\n    }\n    /**\n     * Returns a matrix with copied values from this instance.\n     *\n     * @return {Matrix3} A clone of this instance.\n     */\n    clone() {\n      return new this.constructor().fromArray(this.elements);\n    }\n  }\n  const _m3 = /* @__PURE__ */ new Matrix3();\n  const _cache = {};\n  function warnOnce(message) {\n    if (message in _cache) return;\n    _cache[message] = true;\n    console.warn(message);\n  }\n  const LINEAR_REC709_TO_XYZ = /* @__PURE__ */ new Matrix3().set(\n    0.4123908,\n    0.3575843,\n    0.1804808,\n    0.212639,\n    0.7151687,\n    0.0721923,\n    0.0193308,\n    0.1191948,\n    0.9505322\n  );\n  const XYZ_TO_LINEAR_REC709 = /* @__PURE__ */ new Matrix3().set(\n    3.2409699,\n    -1.5373832,\n    -0.4986108,\n    -0.9692436,\n    1.8759675,\n    0.0415551,\n    0.0556301,\n    -0.203977,\n    1.0569715\n  );\n  function createColorManagement() {\n    const ColorManagement2 = {\n      enabled: true,\n      workingColorSpace: LinearSRGBColorSpace,\n      /**\n       * Implementations of supported color spaces.\n       *\n       * Required:\n       *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]\n       *	- whitePoint: reference white [ x y ]\n       *	- transfer: transfer function (pre-defined)\n       *	- toXYZ: Matrix3 RGB to XYZ transform\n       *	- fromXYZ: Matrix3 XYZ to RGB transform\n       *	- luminanceCoefficients: RGB luminance coefficients\n       *\n       * Optional:\n       *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }\n       *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }\n       *\n       * Reference:\n       * - https://www.russellcottrell.com/photo/matrixCalculator.htm\n       */\n      spaces: {},\n      convert: function(color, sourceColorSpace, targetColorSpace) {\n        if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {\n          return color;\n        }\n        if (this.spaces[sourceColorSpace].transfer === SRGBTransfer) {\n          color.r = SRGBToLinear(color.r);\n          color.g = SRGBToLinear(color.g);\n          color.b = SRGBToLinear(color.b);\n        }\n        if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {\n          color.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);\n          color.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);\n        }\n        if (this.spaces[targetColorSpace].transfer === SRGBTransfer) {\n          color.r = LinearToSRGB(color.r);\n          color.g = LinearToSRGB(color.g);\n          color.b = LinearToSRGB(color.b);\n        }\n        return color;\n      },\n      workingToColorSpace: function(color, targetColorSpace) {\n        return this.convert(color, this.workingColorSpace, targetColorSpace);\n      },\n      colorSpaceToWorking: function(color, sourceColorSpace) {\n        return this.convert(color, sourceColorSpace, this.workingColorSpace);\n      },\n      getPrimaries: function(colorSpace) {\n        return this.spaces[colorSpace].primaries;\n      },\n      getTransfer: function(colorSpace) {\n        if (colorSpace === NoColorSpace) return LinearTransfer;\n        return this.spaces[colorSpace].transfer;\n      },\n      getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {\n        return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);\n      },\n      define: function(colorSpaces) {\n        Object.assign(this.spaces, colorSpaces);\n      },\n      // Internal APIs\n      _getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {\n        return targetMatrix.copy(this.spaces[sourceColorSpace].toXYZ).multiply(this.spaces[targetColorSpace].fromXYZ);\n      },\n      _getDrawingBufferColorSpace: function(colorSpace) {\n        return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;\n      },\n      _getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {\n        return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;\n      },\n      // Deprecated\n      fromWorkingColorSpace: function(color, targetColorSpace) {\n        warnOnce(\"THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().\");\n        return ColorManagement2.workingToColorSpace(color, targetColorSpace);\n      },\n      toWorkingColorSpace: function(color, sourceColorSpace) {\n        warnOnce(\"THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().\");\n        return ColorManagement2.colorSpaceToWorking(color, sourceColorSpace);\n      }\n    };\n    const REC709_PRIMARIES = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06];\n    const REC709_LUMINANCE_COEFFICIENTS = [0.2126, 0.7152, 0.0722];\n    const D65 = [0.3127, 0.329];\n    ColorManagement2.define({\n      [LinearSRGBColorSpace]: {\n        primaries: REC709_PRIMARIES,\n        whitePoint: D65,\n        transfer: LinearTransfer,\n        toXYZ: LINEAR_REC709_TO_XYZ,\n        fromXYZ: XYZ_TO_LINEAR_REC709,\n        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,\n        workingColorSpaceConfig: { unpackColorSpace: SRGBColorSpace },\n        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }\n      },\n      [SRGBColorSpace]: {\n        primaries: REC709_PRIMARIES,\n        whitePoint: D65,\n        transfer: SRGBTransfer,\n        toXYZ: LINEAR_REC709_TO_XYZ,\n        fromXYZ: XYZ_TO_LINEAR_REC709,\n        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,\n        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }\n      }\n    });\n    return ColorManagement2;\n  }\n  const ColorManagement = /* @__PURE__ */ createColorManagement();\n  function SRGBToLinear(c) {\n    return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);\n  }\n  function LinearToSRGB(c) {\n    return c < 31308e-7 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;\n  }\n  class Box3 {\n    /**\n     * Constructs a new bounding box.\n     *\n     * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.\n     * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.\n     */\n    constructor(min = new Vector3(Infinity, Infinity, Infinity), max2 = new Vector3(-Infinity, -Infinity, -Infinity)) {\n      this.isBox3 = true;\n      this.min = min;\n      this.max = max2;\n    }\n    /**\n     * Sets the lower and upper boundaries of this box.\n     * Please note that this method only copies the values from the given objects.\n     *\n     * @param {Vector3} min - The lower boundary of the box.\n     * @param {Vector3} max - The upper boundary of the box.\n     * @return {Box3} A reference to this bounding box.\n     */\n    set(min, max2) {\n      this.min.copy(min);\n      this.max.copy(max2);\n      return this;\n    }\n    /**\n     * Sets the upper and lower bounds of this box so it encloses the position data\n     * in the given array.\n     *\n     * @param {Array<number>} array - An array holding 3D position data.\n     * @return {Box3} A reference to this bounding box.\n     */\n    setFromArray(array) {\n      this.makeEmpty();\n      for (let i2 = 0, il = array.length; i2 < il; i2 += 3) {\n        this.expandByPoint(_vector$b.fromArray(array, i2));\n      }\n      return this;\n    }\n    /**\n     * Sets the upper and lower bounds of this box so it encloses the position data\n     * in the given buffer attribute.\n     *\n     * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.\n     * @return {Box3} A reference to this bounding box.\n     */\n    setFromBufferAttribute(attribute) {\n      this.makeEmpty();\n      for (let i2 = 0, il = attribute.count; i2 < il; i2++) {\n        this.expandByPoint(_vector$b.fromBufferAttribute(attribute, i2));\n      }\n      return this;\n    }\n    /**\n     * Sets the upper and lower bounds of this box so it encloses the position data\n     * in the given array.\n     *\n     * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.\n     * @return {Box3} A reference to this bounding box.\n     */\n    setFromPoints(points) {\n      this.makeEmpty();\n      for (let i2 = 0, il = points.length; i2 < il; i2++) {\n        this.expandByPoint(points[i2]);\n      }\n      return this;\n    }\n    /**\n     * Centers this box on the given center vector and sets this box's width, height and\n     * depth to the given size values.\n     *\n     * @param {Vector3} center - The center of the box.\n     * @param {Vector3} size - The x, y and z dimensions of the box.\n     * @return {Box3} A reference to this bounding box.\n     */\n    setFromCenterAndSize(center, size) {\n      const halfSize = _vector$b.copy(size).multiplyScalar(0.5);\n      this.min.copy(center).sub(halfSize);\n      this.max.copy(center).add(halfSize);\n      return this;\n    }\n    /**\n     * Computes the world-axis-aligned bounding box for the given 3D object\n     * (including its children), accounting for the object's, and children's,\n     * world transforms. The function may result in a larger box than strictly necessary.\n     *\n     * @param {Object3D} object - The 3D object to compute the bounding box for.\n     * @param {boolean} [precise=false] - If set to `true`, the method computes the smallest\n     * world-axis-aligned bounding box at the expense of more computation.\n     * @return {Box3} A reference to this bounding box.\n     */\n    setFromObject(object, precise = false) {\n      this.makeEmpty();\n      return this.expandByObject(object, precise);\n    }\n    /**\n     * Returns a new box with copied values from this instance.\n     *\n     * @return {Box3} A clone of this instance.\n     */\n    clone() {\n      return new this.constructor().copy(this);\n    }\n    /**\n     * Copies the values of the given box to this instance.\n     *\n     * @param {Box3} box - The box to copy.\n     * @return {Box3} A reference to this bounding box.\n     */\n    copy(box) {\n      this.min.copy(box.min);\n      this.max.copy(box.max);\n      return this;\n    }\n    /**\n     * Makes this box empty which means in encloses a zero space in 3D.\n     *\n     * @return {Box3} A reference to this bounding box.\n     */\n    makeEmpty() {\n      this.min.x = this.min.y = this.min.z = Infinity;\n      this.max.x = this.max.y = this.max.z = -Infinity;\n      return this;\n    }\n    /**\n     * Returns true if this box includes zero points within its bounds.\n     * Note that a box with equal lower and upper bounds still includes one\n     * point, the one both bounds share.\n     *\n     * @return {boolean} Whether this box is empty or not.\n     */\n    isEmpty() {\n      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;\n    }\n    /**\n     * Returns the center point of this box.\n     *\n     * @param {Vector3} target - The target vector that is used to store the method's result.\n     * @return {Vector3} The center point.\n     */\n    getCenter(target) {\n      return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);\n    }\n    /**\n     * Returns the dimensions of this box.\n     *\n     * @param {Vector3} target - The target vector that is used to store the method's result.\n     * @return {Vector3} The size.\n     */\n    getSize(target) {\n      return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);\n    }\n    /**\n     * Expands the boundaries of this box to include the given point.\n     *\n     * @param {Vector3} point - The point that should be included by the bounding box.\n     * @return {Box3} A reference to this bounding box.\n     */\n    expandByPoint(point) {\n      this.min.min(point);\n      this.max.max(point);\n      return this;\n    }\n    /**\n     * Expands this box equilaterally by the given vector. The width of this\n     * box will be expanded by the x component of the vector in both\n     * directions. The height of this box will be expanded by the y component of\n     * the vector in both directions. The depth of this box will be\n     * expanded by the z component of the vector in both directions.\n     *\n     * @param {Vector3} vector - The vector that should expand the bounding box.\n     * @return {Box3} A reference to this bounding box.\n     */\n    expandByVector(vector) {\n      this.min.sub(vector);\n      this.max.add(vector);\n      return this;\n    }\n    /**\n     * Expands each dimension of the box by the given scalar. If negative, the\n     * dimensions of the box will be contracted.\n     *\n     * @param {number} scalar - The scalar value that should expand the bounding box.\n     * @return {Box3} A reference to this bounding box.\n     */\n    expandByScalar(scalar) {\n      this.min.addScalar(-scalar);\n      this.max.addScalar(scalar);\n      return this;\n    }\n    /**\n     * Expands the boundaries of this box to include the given 3D object and\n     * its children, accounting for the object's, and children's, world\n     * transforms. The function may result in a larger box than strictly\n     * necessary (unless the precise parameter is set to true).\n     *\n     * @param {Object3D} object - The 3D object that should expand the bounding box.\n     * @param {boolean} precise - If set to `true`, the method expands the bounding box\n     * as little as necessary at the expense of more computation.\n     * @return {Box3} A reference to this bounding box.\n     */\n    expandByObject(object, precise = false) {\n      object.updateWorldMatrix(false, false);\n      const geometry = object.geometry;\n      if (geometry !== void 0) {\n        const positionAttribute = geometry.getAttribute(\"position\");\n        if (precise === true && positionAttribute !== void 0 && object.isInstancedMesh !== true) {\n          for (let i2 = 0, l = positionAttribute.count; i2 < l; i2++) {\n            if (object.isMesh === true) {\n              object.getVertexPosition(i2, _vector$b);\n            } else {\n              _vector$b.fromBufferAttribute(positionAttribute, i2);\n            }\n            _vector$b.applyMatrix4(object.matrixWorld);\n            this.expandByPoint(_vector$b);\n          }\n        } else {\n          if (object.boundingBox !== void 0) {\n            if (object.boundingBox === null) {\n              object.computeBoundingBox();\n            }\n            _box$4.copy(object.boundingBox);\n          } else {\n            if (geometry.boundingBox === null) {\n              geometry.computeBoundingBox();\n            }\n            _box$4.copy(geometry.boundingBox);\n          }\n          _box$4.applyMatrix4(object.matrixWorld);\n          this.union(_box$4);\n        }\n      }\n      const children = object.children;\n      for (let i2 = 0, l = children.length; i2 < l; i2++) {\n        this.expandByObject(children[i2], precise);\n      }\n      return this;\n    }\n    /**\n     * Returns `true` if the given point lies within or on the boundaries of this box.\n     *\n     * @param {Vector3} point - The point to test.\n     * @return {boolean} Whether the bounding box contains the given point or not.\n     */\n    containsPoint(point) {\n      return point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y && point.z >= this.min.z && point.z <= this.max.z;\n    }\n    /**\n     * Returns `true` if this bounding box includes the entirety of the given bounding box.\n     * If this box and the given one are identical, this function also returns `true`.\n     *\n     * @param {Box3} box - The bounding box to test.\n     * @return {boolean} Whether the bounding box contains the given bounding box or not.\n     */\n    containsBox(box) {\n      return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;\n    }\n    /**\n     * Returns a point as a proportion of this box's width, height and depth.\n     *\n     * @param {Vector3} point - A point in 3D space.\n     * @param {Vector3} target - The target vector that is used to store the method's result.\n     * @return {Vector3} A point as a proportion of this box's width, height and depth.\n     */\n    getParameter(point, target) {\n      return target.set(\n        (point.x - this.min.x) / (this.max.x - this.min.x),\n        (point.y - this.min.y) / (this.max.y - this.min.y),\n        (point.z - this.min.z) / (this.max.z - this.min.z)\n      );\n    }\n    /**\n     * Returns `true` if the given bounding box intersects with this bounding box.\n     *\n     * @param {Box3} box - The bounding box to test.\n     * @return {boolean} Whether the given bounding box intersects with this bounding box.\n     */\n    intersectsBox(box) {\n      return box.max.x >= this.min.x && box.min.x <= this.max.x && box.max.y >= this.min.y && box.min.y <= this.max.y && box.max.z >= this.min.z && box.min.z <= this.max.z;\n    }\n    /**\n     * Returns `true` if the given bounding sphere intersects with this bounding box.\n     *\n     * @param {Sphere} sphere - The bounding sphere to test.\n     * @return {boolean} Whether the given bounding sphere intersects with this bounding box.\n     */\n    intersectsSphere(sphere) {\n      this.clampPoint(sphere.center, _vector$b);\n      return _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;\n    }\n    /**\n     * Returns `true` if the given plane intersects with this bounding box.\n     *\n     * @param {Plane} plane - The plane to test.\n     * @return {boolean} Whether the given plane intersects with this bounding box.\n     */\n    intersectsPlane(plane) {\n      let min, max2;\n      if (plane.normal.x > 0) {\n        min = plane.normal.x * this.min.x;\n        max2 = plane.normal.x * this.max.x;\n      } else {\n        min = plane.normal.x * this.max.x;\n        max2 = plane.normal.x * this.min.x;\n      }\n      if (plane.normal.y > 0) {\n        min += plane.normal.y * this.min.y;\n        max2 += plane.normal.y * this.max.y;\n      } else {\n        min += plane.normal.y * this.max.y;\n        max2 += plane.normal.y * this.min.y;\n      }\n      if (plane.normal.z > 0) {\n        min += plane.normal.z * this.min.z;\n        max2 += plane.normal.z * this.max.z;\n      } else {\n        min += plane.normal.z * this.max.z;\n        max2 += plane.normal.z * this.min.z;\n      }\n      return min <= -plane.constant && max2 >= -plane.constant;\n    }\n    /**\n     * Returns `true` if the given triangle intersects with this bounding box.\n     *\n     * @param {Triangle} triangle - The triangle to test.\n     * @return {boolean} Whether the given triangle intersects with this bounding box.\n     */\n    intersectsTriangle(triangle) {\n      if (this.isEmpty()) {\n        return false;\n      }\n      this.getCenter(_center);\n      _extents.subVectors(this.max, _center);\n      _v0$2.subVectors(triangle.a, _center);\n      _v1$7.subVectors(triangle.b, _center);\n      _v2$4.subVectors(triangle.c, _center);\n      _f0.subVectors(_v1$7, _v0$2);\n      _f1.subVectors(_v2$4, _v1$7);\n      _f2.subVectors(_v0$2, _v2$4);\n      let axes = [\n        0,\n        -_f0.z,\n        _f0.y,\n        0,\n        -_f1.z,\n        _f1.y,\n        0,\n        -_f2.z,\n        _f2.y,\n        _f0.z,\n        0,\n        -_f0.x,\n        _f1.z,\n        0,\n        -_f1.x,\n        _f2.z,\n        0,\n        -_f2.x,\n        -_f0.y,\n        _f0.x,\n        0,\n        -_f1.y,\n        _f1.x,\n        0,\n        -_f2.y,\n        _f2.x,\n        0\n      ];\n      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {\n        return false;\n      }\n      axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];\n      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {\n        return false;\n      }\n      _triangleNormal.crossVectors(_f0, _f1);\n      axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];\n      return satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents);\n    }\n    /**\n     * Clamps the given point within the bounds of this box.\n     *\n     * @param {Vector3} point - The point to clamp.\n     * @param {Vector3} target - The target vector that is used to store the method's result.\n     * @return {Vector3} The clamped point.\n     */\n    clampPoint(point, target) {\n      return target.copy(point).clamp(this.min, this.max);\n    }\n    /**\n     * Returns the euclidean distance from any edge of this box to the specified point. If\n     * the given point lies inside of this box, the distance will be `0`.\n     *\n     * @param {Vector3} point - The point to compute the distance to.\n     * @return {number} The euclidean distance.\n     */\n    distanceToPoint(point) {\n      return this.clampPoint(point, _vector$b).distanceTo(point);\n    }\n    /**\n     * Returns a bounding sphere that encloses this bounding box.\n     *\n     * @param {Sphere} target - The target sphere that is used to store the method's result.\n     * @return {Sphere} The bounding sphere that encloses this bounding box.\n     */\n    getBoundingSphere(target) {\n      if (this.isEmpty()) {\n        target.makeEmpty();\n      } else {\n        this.getCenter(target.center);\n        target.radius = this.getSize(_vector$b).length() * 0.5;\n      }\n      return target;\n    }\n    /**\n     * Computes the intersection of this bounding box and the given one, setting the upper\n     * bound of this box to the lesser of the two boxes' upper bounds and the\n     * lower bound of this box to the greater of the two boxes' lower bounds. If\n     * there's no overlap, makes this box empty.\n     *\n     * @param {Box3} box - The bounding box to intersect with.\n     * @return {Box3} A reference to this bounding box.\n     */\n    intersect(box) {\n      this.min.max(box.min);\n      this.max.min(box.max);\n      if (this.isEmpty()) this.makeEmpty();\n      return this;\n    }\n    /**\n     * Computes the union of this box and another and the given one, setting the upper\n     * bound of this box to the greater of the two boxes' upper bounds and the\n     * lower bound of this box to the lesser of the two boxes' lower bounds.\n     *\n     * @param {Box3} box - The bounding box that will be unioned with this instance.\n     * @return {Box3} A reference to this bounding box.\n     */\n    union(box) {\n      this.min.min(box.min);\n      this.max.max(box.max);\n      return this;\n    }\n    /**\n     * Transforms this bounding box by the given 4x4 transformation matrix.\n     *\n     * @param {Matrix4} matrix - The transformation matrix.\n     * @return {Box3} A reference to this bounding box.\n     */\n    applyMatrix4(matrix) {\n      if (this.isEmpty()) return this;\n      _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);\n      _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);\n      _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);\n      _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);\n      _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);\n      _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);\n      _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);\n      _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);\n      this.setFromPoints(_points);\n      return this;\n    }\n    /**\n     * Adds the given offset to both the upper and lower bounds of this bounding box,\n     * effectively moving it in 3D space.\n     *\n     * @param {Vector3} offset - The offset that should be used to translate the bounding box.\n     * @return {Box3} A reference to this bounding box.\n     */\n    translate(offset) {\n      this.min.add(offset);\n      this.max.add(offset);\n      return this;\n    }\n    /**\n     * Returns `true` if this bounding box is equal with the given one.\n     *\n     * @param {Box3} box - The box to test for equality.\n     * @return {boolean} Whether this bounding box is equal with the given one.\n     */\n    equals(box) {\n      return box.min.equals(this.min) && box.max.equals(this.max);\n    }\n    /**\n     * Returns a serialized structure of the bounding box.\n     *\n     * @return {Object} Serialized structure with fields representing the object state.\n     */\n    toJSON() {\n      return {\n        min: this.min.toArray(),\n        max: this.max.toArray()\n      };\n    }\n    /**\n     * Returns a serialized structure of the bounding box.\n     *\n     * @param {Object} json - The serialized json to set the box from.\n     * @return {Box3} A reference to this bounding box.\n     */\n    fromJSON(json) {\n      this.min.fromArray(json.min);\n      this.max.fromArray(json.max);\n      return this;\n    }\n  }\n  const _points = [\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3()\n  ];\n  const _vector$b = /* @__PURE__ */ new Vector3();\n  const _box$4 = /* @__PURE__ */ new Box3();\n  const _v0$2 = /* @__PURE__ */ new Vector3();\n  const _v1$7 = /* @__PURE__ */ new Vector3();\n  const _v2$4 = /* @__PURE__ */ new Vector3();\n  const _f0 = /* @__PURE__ */ new Vector3();\n  const _f1 = /* @__PURE__ */ new Vector3();\n  const _f2 = /* @__PURE__ */ new Vector3();\n  const _center = /* @__PURE__ */ new Vector3();\n  const _extents = /* @__PURE__ */ new Vector3();\n  const _triangleNormal = /* @__PURE__ */ new Vector3();\n  const _testAxis = /* @__PURE__ */ new Vector3();\n  function satForAxes(axes, v0, v1, v2, extents) {\n    for (let i2 = 0, j = axes.length - 3; i2 <= j; i2 += 3) {\n      _testAxis.fromArray(axes, i2);\n      const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);\n      const p0 = v0.dot(_testAxis);\n      const p1 = v1.dot(_testAxis);\n      const p2 = v2.dot(_testAxis);\n      if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {\n        return false;\n      }\n    }\n    return true;\n  }\n  const _colorKeywords = {\n    \"aliceblue\": 15792383,\n    \"antiquewhite\": 16444375,\n    \"aqua\": 65535,\n    \"aquamarine\": 8388564,\n    \"azure\": 15794175,\n    \"beige\": 16119260,\n    \"bisque\": 16770244,\n    \"black\": 0,\n    \"blanchedalmond\": 16772045,\n    \"blue\": 255,\n    \"blueviolet\": 9055202,\n    \"brown\": 10824234,\n    \"burlywood\": 14596231,\n    \"cadetblue\": 6266528,\n    \"chartreuse\": 8388352,\n    \"chocolate\": 13789470,\n    \"coral\": 16744272,\n    \"cornflowerblue\": 6591981,\n    \"cornsilk\": 16775388,\n    \"crimson\": 14423100,\n    \"cyan\": 65535,\n    \"darkblue\": 139,\n    \"darkcyan\": 35723,\n    \"darkgoldenrod\": 12092939,\n    \"darkgray\": 11119017,\n    \"darkgreen\": 25600,\n    \"darkgrey\": 11119017,\n    \"darkkhaki\": 12433259,\n    \"darkmagenta\": 9109643,\n    \"darkolivegreen\": 5597999,\n    \"darkorange\": 16747520,\n    \"darkorchid\": 10040012,\n    \"darkred\": 9109504,\n    \"darksalmon\": 15308410,\n    \"darkseagreen\": 9419919,\n    \"darkslateblue\": 4734347,\n    \"darkslategray\": 3100495,\n    \"darkslategrey\": 3100495,\n    \"darkturquoise\": 52945,\n    \"darkviolet\": 9699539,\n    \"deeppink\": 16716947,\n    \"deepskyblue\": 49151,\n    \"dimgray\": 6908265,\n    \"dimgrey\": 6908265,\n    \"dodgerblue\": 2003199,\n    \"firebrick\": 11674146,\n    \"floralwhite\": 16775920,\n    \"forestgreen\": 2263842,\n    \"fuchsia\": 16711935,\n    \"gainsboro\": 14474460,\n    \"ghostwhite\": 16316671,\n    \"gold\": 16766720,\n    \"goldenrod\": 14329120,\n    \"gray\": 8421504,\n    \"green\": 32768,\n    \"greenyellow\": 11403055,\n    \"grey\": 8421504,\n    \"honeydew\": 15794160,\n    \"hotpink\": 16738740,\n    \"indianred\": 13458524,\n    \"indigo\": 4915330,\n    \"ivory\": 16777200,\n    \"khaki\": 15787660,\n    \"lavender\": 15132410,\n    \"lavenderblush\": 16773365,\n    \"lawngreen\": 8190976,\n    \"lemonchiffon\": 16775885,\n    \"lightblue\": 11393254,\n    \"lightcoral\": 15761536,\n    \"lightcyan\": 14745599,\n    \"lightgoldenrodyellow\": 16448210,\n    \"lightgray\": 13882323,\n    \"lightgreen\": 9498256,\n    \"lightgrey\": 13882323,\n    \"lightpink\": 16758465,\n    \"lightsalmon\": 16752762,\n    \"lightseagreen\": 2142890,\n    \"lightskyblue\": 8900346,\n    \"lightslategray\": 7833753,\n    \"lightslategrey\": 7833753,\n    \"lightsteelblue\": 11584734,\n    \"lightyellow\": 16777184,\n    \"lime\": 65280,\n    \"limegreen\": 3329330,\n    \"linen\": 16445670,\n    \"magenta\": 16711935,\n    \"maroon\": 8388608,\n    \"mediumaquamarine\": 6737322,\n    \"mediumblue\": 205,\n    \"mediumorchid\": 12211667,\n    \"mediumpurple\": 9662683,\n    \"mediumseagreen\": 3978097,\n    \"mediumslateblue\": 8087790,\n    \"mediumspringgreen\": 64154,\n    \"mediumturquoise\": 4772300,\n    \"mediumvioletred\": 13047173,\n    \"midnightblue\": 1644912,\n    \"mintcream\": 16121850,\n    \"mistyrose\": 16770273,\n    \"moccasin\": 16770229,\n    \"navajowhite\": 16768685,\n    \"navy\": 128,\n    \"oldlace\": 16643558,\n    \"olive\": 8421376,\n    \"olivedrab\": 7048739,\n    \"orange\": 16753920,\n    \"orangered\": 16729344,\n    \"orchid\": 14315734,\n    \"palegoldenrod\": 15657130,\n    \"palegreen\": 10025880,\n    \"paleturquoise\": 11529966,\n    \"palevioletred\": 14381203,\n    \"papayawhip\": 16773077,\n    \"peachpuff\": 16767673,\n    \"peru\": 13468991,\n    \"pink\": 16761035,\n    \"plum\": 14524637,\n    \"powderblue\": 11591910,\n    \"purple\": 8388736,\n    \"rebeccapurple\": 6697881,\n    \"red\": 16711680,\n    \"rosybrown\": 12357519,\n    \"royalblue\": 4286945,\n    \"saddlebrown\": 9127187,\n    \"salmon\": 16416882,\n    \"sandybrown\": 16032864,\n    \"seagreen\": 3050327,\n    \"seashell\": 16774638,\n    \"sienna\": 10506797,\n    \"silver\": 12632256,\n    \"skyblue\": 8900331,\n    \"slateblue\": 6970061,\n    \"slategray\": 7372944,\n    \"slategrey\": 7372944,\n    \"snow\": 16775930,\n    \"springgreen\": 65407,\n    \"steelblue\": 4620980,\n    \"tan\": 13808780,\n    \"teal\": 32896,\n    \"thistle\": 14204888,\n    \"tomato\": 16737095,\n    \"turquoise\": 4251856,\n    \"violet\": 15631086,\n    \"wheat\": 16113331,\n    \"white\": 16777215,\n    \"whitesmoke\": 16119285,\n    \"yellow\": 16776960,\n    \"yellowgreen\": 10145074\n  };\n  const _hslA = { h: 0, s: 0, l: 0 };\n  const _hslB = { h: 0, s: 0, l: 0 };\n  function hue2rgb(p, q, t) {\n    if (t < 0) t += 1;\n    if (t > 1) t -= 1;\n    if (t < 1 / 6) return p + (q - p) * 6 * t;\n    if (t < 1 / 2) return q;\n    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);\n    return p;\n  }\n  class Color {\n    /**\n     * Constructs a new color.\n     *\n     * Note that standard method of specifying color in three.js is with a hexadecimal triplet,\n     * and that method is used throughout the rest of the documentation.\n     *\n     * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are\n     * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.\n     * @param {number} [g] - The green component.\n     * @param {number} [b] - The blue component.\n     */\n    constructor(r, g, b) {\n      this.isColor = true;\n      this.r = 1;\n      this.g = 1;\n      this.b = 1;\n      return this.set(r, g, b);\n    }\n    /**\n     * Sets the colors's components from the given values.\n     *\n     * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are\n     * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.\n     * @param {number} [g] - The green component.\n     * @param {number} [b] - The blue component.\n     * @return {Color} A reference to this color.\n     */\n    set(r, g, b) {\n      if (g === void 0 && b === void 0) {\n        const value = r;\n        if (value && value.isColor) {\n          this.copy(value);\n        } else if (typeof value === \"number\") {\n          this.setHex(value);\n        } else if (typeof value === \"string\") {\n          this.setStyle(value);\n        }\n      } else {\n        this.setRGB(r, g, b);\n      }\n      return this;\n    }\n    /**\n     * Sets the colors's components to the given scalar value.\n     *\n     * @param {number} scalar - The scalar value.\n     * @return {Color} A reference to this color.\n     */\n    setScalar(scalar) {\n      this.r = scalar;\n      this.g = scalar;\n      this.b = scalar;\n      return this;\n    }\n    /**\n     * Sets this color from a hexadecimal value.\n     *\n     * @param {number} hex - The hexadecimal value.\n     * @param {string} [colorSpace=SRGBColorSpace] - The color space.\n     * @return {Color} A reference to this color.\n     */\n    setHex(hex, colorSpace = SRGBColorSpace) {\n      hex = Math.floor(hex);\n      this.r = (hex >> 16 & 255) / 255;\n      this.g = (hex >> 8 & 255) / 255;\n      this.b = (hex & 255) / 255;\n      ColorManagement.colorSpaceToWorking(this, colorSpace);\n      return this;\n    }\n    /**\n     * Sets this color from RGB values.\n     *\n     * @param {number} r - Red channel value between `0.0` and `1.0`.\n     * @param {number} g - Green channel value between `0.0` and `1.0`.\n     * @param {number} b - Blue channel value between `0.0` and `1.0`.\n     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.\n     * @return {Color} A reference to this color.\n     */\n    setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) {\n      this.r = r;\n      this.g = g;\n      this.b = b;\n      ColorManagement.colorSpaceToWorking(this, colorSpace);\n      return this;\n    }\n    /**\n     * Sets this color from RGB values.\n     *\n     * @param {number} h - Hue value between `0.0` and `1.0`.\n     * @param {number} s - Saturation value between `0.0` and `1.0`.\n     * @param {number} l - Lightness value between `0.0` and `1.0`.\n     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.\n     * @return {Color} A reference to this color.\n     */\n    setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {\n      h = euclideanModulo(h, 1);\n      s = clamp(s, 0, 1);\n      l = clamp(l, 0, 1);\n      if (s === 0) {\n        this.r = this.g = this.b = l;\n      } else {\n        const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;\n        const q = 2 * l - p;\n        this.r = hue2rgb(q, p, h + 1 / 3);\n        this.g = hue2rgb(q, p, h);\n        this.b = hue2rgb(q, p, h - 1 / 3);\n      }\n      ColorManagement.colorSpaceToWorking(this, colorSpace);\n      return this;\n    }\n    /**\n     * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,\n     * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or\n     * any [X11 color name]{@link https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart} -\n     * all 140 color names are supported).\n     *\n     * @param {string} style - Color as a CSS-style string.\n     * @param {string} [colorSpace=SRGBColorSpace] - The color space.\n     * @return {Color} A reference to this color.\n     */\n    setStyle(style, colorSpace = SRGBColorSpace) {\n      function handleAlpha(string) {\n        if (string === void 0) return;\n        if (parseFloat(string) < 1) {\n          console.warn(\"THREE.Color: Alpha component of \" + style + \" will be ignored.\");\n        }\n      }\n      let m;\n      if (m = /^(\\w+)\\(([^\\)]*)\\)/.exec(style)) {\n        let color;\n        const name = m[1];\n        const components = m[2];\n        switch (name) {\n          case \"rgb\":\n          case \"rgba\":\n            if (color = /^\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {\n              handleAlpha(color[4]);\n              return this.setRGB(\n                Math.min(255, parseInt(color[1], 10)) / 255,\n                Math.min(255, parseInt(color[2], 10)) / 255,\n                Math.min(255, parseInt(color[3], 10)) / 255,\n                colorSpace\n              );\n            }\n            if (color = /^\\s*(\\d+)\\%\\s*,\\s*(\\d+)\\%\\s*,\\s*(\\d+)\\%\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {\n              handleAlpha(color[4]);\n              return this.setRGB(\n                Math.min(100, parseInt(color[1], 10)) / 100,\n                Math.min(100, parseInt(color[2], 10)) / 100,\n                Math.min(100, parseInt(color[3], 10)) / 100,\n                colorSpace\n              );\n            }\n            break;\n          case \"hsl\":\n          case \"hsla\":\n            if (color = /^\\s*(\\d*\\.?\\d+)\\s*,\\s*(\\d*\\.?\\d+)\\%\\s*,\\s*(\\d*\\.?\\d+)\\%\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {\n              handleAlpha(color[4]);\n              return this.setHSL(\n                parseFloat(color[1]) / 360,\n                parseFloat(color[2]) / 100,\n                parseFloat(color[3]) / 100,\n                colorSpace\n              );\n            }\n            break;\n          default:\n            console.warn(\"THREE.Color: Unknown color model \" + style);\n        }\n      } else if (m = /^\\#([A-Fa-f\\d]+)$/.exec(style)) {\n        const hex = m[1];\n        const size = hex.length;\n        if (size === 3) {\n          return this.setRGB(\n            parseInt(hex.charAt(0), 16) / 15,\n            parseInt(hex.charAt(1), 16) / 15,\n            parseInt(hex.charAt(2), 16) / 15,\n            colorSpace\n          );\n        } else if (size === 6) {\n          return this.setHex(parseInt(hex, 16), colorSpace);\n        } else {\n          console.warn(\"THREE.Color: Invalid hex color \" + style);\n        }\n      } else if (style && style.length > 0) {\n        return this.setColorName(style, colorSpace);\n      }\n      return this;\n    }\n    /**\n     * Sets this color from a color name. Faster than {@link Color#setStyle} if\n     * you don't need the other CSS-style formats.\n     *\n     * For convenience, the list of names is exposed in `Color.NAMES` as a hash.\n     * ```js\n     * Color.NAMES.aliceblue // returns 0xF0F8FF\n     * ```\n     *\n     * @param {string} style - The color name.\n     * @param {string} [colorSpace=SRGBColorSpace] - The color space.\n     * @return {Color} A reference to this color.\n     */\n    setColorName(style, colorSpace = SRGBColorSpace) {\n      const hex = _colorKeywords[style.toLowerCase()];\n      if (hex !== void 0) {\n        this.setHex(hex, colorSpace);\n      } else {\n        console.warn(\"THREE.Color: Unknown color \" + style);\n      }\n      return this;\n    }\n    /**\n     * Returns a new color with copied values from this instance.\n     *\n     * @return {Color} A clone of this instance.\n     */\n    clone() {\n      return new this.constructor(this.r, this.g, this.b);\n    }\n    /**\n     * Copies the values of the given color to this instance.\n     *\n     * @param {Color} color - The color to copy.\n     * @return {Color} A reference to this color.\n     */\n    copy(color) {\n      this.r = color.r;\n      this.g = color.g;\n      this.b = color.b;\n      return this;\n    }\n    /**\n     * Copies the given color into this color, and then converts this color from\n     * `SRGBColorSpace` to `LinearSRGBColorSpace`.\n     *\n     * @param {Color} color - The color to copy/convert.\n     * @return {Color} A reference to this color.\n     */\n    copySRGBToLinear(color) {\n      this.r = SRGBToLinear(color.r);\n      this.g = SRGBToLinear(color.g);\n      this.b = SRGBToLinear(color.b);\n      return this;\n    }\n    /**\n     * Copies the given color into this color, and then converts this color from\n     * `LinearSRGBColorSpace` to `SRGBColorSpace`.\n     *\n     * @param {Color} color - The color to copy/convert.\n     * @return {Color} A reference to this color.\n     */\n    copyLinearToSRGB(color) {\n      this.r = LinearToSRGB(color.r);\n      this.g = LinearToSRGB(color.g);\n      this.b = LinearToSRGB(color.b);\n      return this;\n    }\n    /**\n     * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.\n     *\n     * @return {Color} A reference to this color.\n     */\n    convertSRGBToLinear() {\n      this.copySRGBToLinear(this);\n      return this;\n    }\n    /**\n     * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.\n     *\n     * @return {Color} A reference to this color.\n     */\n    convertLinearToSRGB() {\n      this.copyLinearToSRGB(this);\n      return this;\n    }\n    /**\n     * Returns the hexadecimal value of this color.\n     *\n     * @param {string} [colorSpace=SRGBColorSpace] - The color space.\n     * @return {number} The hexadecimal value.\n     */\n    getHex(colorSpace = SRGBColorSpace) {\n      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);\n      return Math.round(clamp(_color.r * 255, 0, 255)) * 65536 + Math.round(clamp(_color.g * 255, 0, 255)) * 256 + Math.round(clamp(_color.b * 255, 0, 255));\n    }\n    /**\n     * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').\n     *\n     * @param {string} [colorSpace=SRGBColorSpace] - The color space.\n     * @return {string} The hexadecimal value as a string.\n     */\n    getHexString(colorSpace = SRGBColorSpace) {\n      return (\"000000\" + this.getHex(colorSpace).toString(16)).slice(-6);\n    }\n    /**\n     * Converts the colors RGB values into the HSL format and stores them into the\n     * given target object.\n     *\n     * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.\n     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.\n     * @return {{h:number,s:number,l:number}} The HSL representation of this color.\n     */\n    getHSL(target, colorSpace = ColorManagement.workingColorSpace) {\n      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);\n      const r = _color.r, g = _color.g, b = _color.b;\n      const max2 = Math.max(r, g, b);\n      const min = Math.min(r, g, b);\n      let hue, saturation;\n      const lightness = (min + max2) / 2;\n      if (min === max2) {\n        hue = 0;\n        saturation = 0;\n      } else {\n        const delta = max2 - min;\n        saturation = lightness <= 0.5 ? delta / (max2 + min) : delta / (2 - max2 - min);\n        switch (max2) {\n          case r:\n            hue = (g - b) / delta + (g < b ? 6 : 0);\n            break;\n          case g:\n            hue = (b - r) / delta + 2;\n            break;\n          case b:\n            hue = (r - g) / delta + 4;\n            break;\n        }\n        hue /= 6;\n      }\n      target.h = hue;\n      target.s = saturation;\n      target.l = lightness;\n      return target;\n    }\n    /**\n     * Returns the RGB values of this color and stores them into the given target object.\n     *\n     * @param {Color} target - The target color that is used to store the method's result.\n     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.\n     * @return {Color} The RGB representation of this color.\n     */\n    getRGB(target, colorSpace = ColorManagement.workingColorSpace) {\n      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);\n      target.r = _color.r;\n      target.g = _color.g;\n      target.b = _color.b;\n      return target;\n    }\n    /**\n     * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.\n     *\n     * @param {string} [colorSpace=SRGBColorSpace] - The color space.\n     * @return {string} The CSS representation of this color.\n     */\n    getStyle(colorSpace = SRGBColorSpace) {\n      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);\n      const r = _color.r, g = _color.g, b = _color.b;\n      if (colorSpace !== SRGBColorSpace) {\n        return `color(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;\n      }\n      return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;\n    }\n    /**\n     * Adds the given HSL values to this color's values.\n     * Internally, this converts the color's RGB values to HSL, adds HSL\n     * and then converts the color back to RGB.\n     *\n     * @param {number} h - Hue value between `0.0` and `1.0`.\n     * @param {number} s - Saturation value between `0.0` and `1.0`.\n     * @param {number} l - Lightness value between `0.0` and `1.0`.\n     * @return {Color} A reference to this color.\n     */\n    offsetHSL(h, s, l) {\n      this.getHSL(_hslA);\n      return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);\n    }\n    /**\n     * Adds the RGB values of the given color to the RGB values of this color.\n     *\n     * @param {Color} color - The color to add.\n     * @return {Color} A reference to this color.\n     */\n    add(color) {\n      this.r += color.r;\n      this.g += color.g;\n      this.b += color.b;\n      return this;\n    }\n    /**\n     * Adds the RGB values of the given colors and stores the result in this instance.\n     *\n     * @param {Color} color1 - The first color.\n     * @param {Color} color2 - The second color.\n     * @return {Color} A reference to this color.\n     */\n    addColors(color1, color2) {\n      this.r = color1.r + color2.r;\n      this.g = color1.g + color2.g;\n      this.b = color1.b + color2.b;\n      return this;\n    }\n    /**\n     * Adds the given scalar value to the RGB values of this color.\n     *\n     * @param {number} s - The scalar to add.\n     * @return {Color} A reference to this color.\n     */\n    addScalar(s) {\n      this.r += s;\n      this.g += s;\n      this.b += s;\n      return this;\n    }\n    /**\n     * Subtracts the RGB values of the given color from the RGB values of this color.\n     *\n     * @param {Color} color - The color to subtract.\n     * @return {Color} A reference to this color.\n     */\n    sub(color) {\n      this.r = Math.max(0, this.r - color.r);\n      this.g = Math.max(0, this.g - color.g);\n      this.b = Math.max(0, this.b - color.b);\n      return this;\n    }\n    /**\n     * Multiplies the RGB values of the given color with the RGB values of this color.\n     *\n     * @param {Color} color - The color to multiply.\n     * @return {Color} A reference to this color.\n     */\n    multiply(color) {\n      this.r *= color.r;\n      this.g *= color.g;\n      this.b *= color.b;\n      return this;\n    }\n    /**\n     * Multiplies the given scalar value with the RGB values of this color.\n     *\n     * @param {number} s - The scalar to multiply.\n     * @return {Color} A reference to this color.\n     */\n    multiplyScalar(s) {\n      this.r *= s;\n      this.g *= s;\n      this.b *= s;\n      return this;\n    }\n    /**\n     * Linearly interpolates this color's RGB values toward the RGB values of the\n     * given color. The alpha argument can be thought of as the ratio between\n     * the two colors, where `0.0` is this color and `1.0` is the first argument.\n     *\n     * @param {Color} color - The color to converge on.\n     * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.\n     * @return {Color} A reference to this color.\n     */\n    lerp(color, alpha) {\n      this.r += (color.r - this.r) * alpha;\n      this.g += (color.g - this.g) * alpha;\n      this.b += (color.b - this.b) * alpha;\n      return this;\n    }\n    /**\n     * Linearly interpolates between the given colors and stores the result in this instance.\n     * The alpha argument can be thought of as the ratio between the two colors, where `0.0`\n     * is the first and `1.0` is the second color.\n     *\n     * @param {Color} color1 - The first color.\n     * @param {Color} color2 - The second color.\n     * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.\n     * @return {Color} A reference to this color.\n     */\n    lerpColors(color1, color2, alpha) {\n      this.r = color1.r + (color2.r - color1.r) * alpha;\n      this.g = color1.g + (color2.g - color1.g) * alpha;\n      this.b = color1.b + (color2.b - color1.b) * alpha;\n      return this;\n    }\n    /**\n     * Linearly interpolates this color's HSL values toward the HSL values of the\n     * given color. It differs from {@link Color#lerp} by not interpolating straight\n     * from one color to the other, but instead going through all the hues in between\n     * those two colors. The alpha argument can be thought of as the ratio between\n     * the two colors, where 0.0 is this color and 1.0 is the first argument.\n     *\n     * @param {Color} color - The color to converge on.\n     * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.\n     * @return {Color} A reference to this color.\n     */\n    lerpHSL(color, alpha) {\n      this.getHSL(_hslA);\n      color.getHSL(_hslB);\n      const h = lerp(_hslA.h, _hslB.h, alpha);\n      const s = lerp(_hslA.s, _hslB.s, alpha);\n      const l = lerp(_hslA.l, _hslB.l, alpha);\n      this.setHSL(h, s, l);\n      return this;\n    }\n    /**\n     * Sets the color's RGB components from the given 3D vector.\n     *\n     * @param {Vector3} v - The vector to set.\n     * @return {Color} A reference to this color.\n     */\n    setFromVector3(v) {\n      this.r = v.x;\n      this.g = v.y;\n      this.b = v.z;\n      return this;\n    }\n    /**\n     * Transforms this color with the given 3x3 matrix.\n     *\n     * @param {Matrix3} m - The matrix.\n     * @return {Color} A reference to this color.\n     */\n    applyMatrix3(m) {\n      const r = this.r, g = this.g, b = this.b;\n      const e = m.elements;\n      this.r = e[0] * r + e[3] * g + e[6] * b;\n      this.g = e[1] * r + e[4] * g + e[7] * b;\n      this.b = e[2] * r + e[5] * g + e[8] * b;\n      return this;\n    }\n    /**\n     * Returns `true` if this color is equal with the given one.\n     *\n     * @param {Color} c - The color to test for equality.\n     * @return {boolean} Whether this bounding color is equal with the given one.\n     */\n    equals(c) {\n      return c.r === this.r && c.g === this.g && c.b === this.b;\n    }\n    /**\n     * Sets this color's RGB components from the given array.\n     *\n     * @param {Array<number>} array - An array holding the RGB values.\n     * @param {number} [offset=0] - The offset into the array.\n     * @return {Color} A reference to this color.\n     */\n    fromArray(array, offset = 0) {\n      this.r = array[offset];\n      this.g = array[offset + 1];\n      this.b = array[offset + 2];\n      return this;\n    }\n    /**\n     * Writes the RGB components of this color to the given array. If no array is provided,\n     * the method returns a new instance.\n     *\n     * @param {Array<number>} [array=[]] - The target array holding the color components.\n     * @param {number} [offset=0] - Index of the first element in the array.\n     * @return {Array<number>} The color components.\n     */\n    toArray(array = [], offset = 0) {\n      array[offset] = this.r;\n      array[offset + 1] = this.g;\n      array[offset + 2] = this.b;\n      return array;\n    }\n    /**\n     * Sets the components of this color from the given buffer attribute.\n     *\n     * @param {BufferAttribute} attribute - The buffer attribute holding color data.\n     * @param {number} index - The index into the attribute.\n     * @return {Color} A reference to this color.\n     */\n    fromBufferAttribute(attribute, index) {\n      this.r = attribute.getX(index);\n      this.g = attribute.getY(index);\n      this.b = attribute.getZ(index);\n      return this;\n    }\n    /**\n     * This methods defines the serialization result of this class. Returns the color\n     * as a hexadecimal value.\n     *\n     * @return {number} The hexadecimal value.\n     */\n    toJSON() {\n      return this.getHex();\n    }\n    *[Symbol.iterator]() {\n      yield this.r;\n      yield this.g;\n      yield this.b;\n    }\n  }\n  const _color = /* @__PURE__ */ new Color();\n  Color.NAMES = _colorKeywords;\n  if (typeof __THREE_DEVTOOLS__ !== \"undefined\") {\n    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(\"register\", { detail: {\n      revision: REVISION\n    } }));\n  }\n  if (typeof window !== \"undefined\") {\n    if (window.__THREE__) {\n      console.warn(\"WARNING: Multiple instances of Three.js being imported.\");\n    } else {\n      window.__THREE__ = REVISION;\n    }\n  }\n  const LN_SCALE_MIN = -12;\n  const LN_SCALE_MAX = 9;\n  const LN_SCALE_ZERO = -30;\n  const SCALE_ZERO = Math.exp(LN_SCALE_ZERO);\n  const SPLAT_TEX_WIDTH_BITS = 11;\n  const SPLAT_TEX_HEIGHT_BITS = 11;\n  const SPLAT_TEX_WIDTH = 1 << SPLAT_TEX_WIDTH_BITS;\n  const SPLAT_TEX_HEIGHT = 1 << SPLAT_TEX_HEIGHT_BITS;\n  const SPLAT_TEX_MIN_HEIGHT = 1;\n  function unindentLines(s) {\n    var _a2;\n    let seenNonEmpty = false;\n    const lines = s.split(\"\\n\").map((line) => {\n      const trimmedLine = line.trimEnd();\n      if (seenNonEmpty) {\n        return trimmedLine;\n      }\n      if (trimmedLine.length > 0) {\n        seenNonEmpty = true;\n        return trimmedLine;\n      }\n      return null;\n    }).filter((line) => line != null);\n    while (lines.length > 0 && lines[lines.length - 1].length === 0) {\n      lines.pop();\n    }\n    if (lines.length === 0) {\n      return [];\n    }\n    const indent = (_a2 = lines[0].match(/^\\s*/)) == null ? void 0 : _a2[0];\n    if (!indent) {\n      return lines;\n    }\n    const regex = new RegExp(`^${indent}`);\n    return lines.map((line) => line.replace(regex, \"\"));\n  }\n  function unindent(s) {\n    return unindentLines(s).join(\"\\n\");\n  }\n  const f32buffer = new Float32Array(1);\n  const u32buffer = new Uint32Array(f32buffer.buffer);\n  const supportsFloat16Array = \"Float16Array\" in globalThis;\n  const f16buffer = supportsFloat16Array ? new globalThis[\"Float16Array\"](1) : null;\n  const u16buffer = new Uint16Array(f16buffer == null ? void 0 : f16buffer.buffer);\n  function normalize(vec) {\n    const norm = Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0));\n    return vec.map((v) => v / norm);\n  }\n  const toHalf = supportsFloat16Array ? toHalfNative : toHalfJS;\n  const fromHalf = supportsFloat16Array ? fromHalfNative : fromHalfJS;\n  function toHalfNative(f) {\n    f16buffer[0] = f;\n    return u16buffer[0];\n  }\n  function toHalfJS(f) {\n    f32buffer[0] = f;\n    const bits2 = u32buffer[0];\n    const sign = bits2 >> 31 & 1;\n    const exp = bits2 >> 23 & 255;\n    const frac = bits2 & 8388607;\n    const halfSign = sign << 15;\n    if (exp === 255) {\n      if (frac !== 0) {\n        return halfSign | 32767;\n      }\n      return halfSign | 31744;\n    }\n    const newExp = exp - 127 + 15;\n    if (newExp >= 31) {\n      return halfSign | 31744;\n    }\n    if (newExp <= 0) {\n      if (newExp < -10) {\n        return halfSign;\n      }\n      const subFrac = (frac | 8388608) >> 1 - newExp + 13;\n      return halfSign | subFrac;\n    }\n    const halfFrac = frac >> 13;\n    return halfSign | newExp << 10 | halfFrac;\n  }\n  function fromHalfNative(u) {\n    u16buffer[0] = u;\n    return f16buffer[0];\n  }\n  function fromHalfJS(h) {\n    const sign = h >> 15 & 1;\n    const exp = h >> 10 & 31;\n    const frac = h & 1023;\n    let f32bits;\n    if (exp === 0) {\n      if (frac === 0) {\n        f32bits = sign << 31;\n      } else {\n        let mant = frac;\n        let e = -14;\n        while ((mant & 1024) === 0) {\n          mant <<= 1;\n          e--;\n        }\n        mant &= 1023;\n        const newExp = e + 127;\n        const newFrac = mant << 13;\n        f32bits = sign << 31 | newExp << 23 | newFrac;\n      }\n    } else if (exp === 31) {\n      if (frac === 0) {\n        f32bits = sign << 31 | 2139095040;\n      } else {\n        f32bits = sign << 31 | 2143289344;\n      }\n    } else {\n      const newExp = exp - 15 + 127;\n      const newFrac = frac << 13;\n      f32bits = sign << 31 | newExp << 23 | newFrac;\n    }\n    u32buffer[0] = f32bits;\n    return f32buffer[0];\n  }\n  function floatToUint8(v) {\n    return Math.max(0, Math.min(255, Math.round(v * 255)));\n  }\n  function getArrayBuffers(ctx) {\n    const buffers = [];\n    const seen = /* @__PURE__ */ new Set();\n    function traverse(obj) {\n      if (obj && typeof obj === \"object\" && !seen.has(obj)) {\n        seen.add(obj);\n        if (obj instanceof ArrayBuffer) {\n          buffers.push(obj);\n        } else if (ArrayBuffer.isView(obj)) {\n          buffers.push(obj.buffer);\n        } else if (Array.isArray(obj)) {\n          obj.forEach(traverse);\n        } else {\n          Object.values(obj).forEach(traverse);\n        }\n      }\n    }\n    traverse(ctx);\n    return buffers;\n  }\n  function setPackedSplat(packedSplats, index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b, encoding) {\n    const rgbMin = (encoding == null ? void 0 : encoding.rgbMin) ?? 0;\n    const rgbMax = (encoding == null ? void 0 : encoding.rgbMax) ?? 1;\n    const rgbRange = rgbMax - rgbMin;\n    const uR = floatToUint8((r - rgbMin) / rgbRange);\n    const uG = floatToUint8((g - rgbMin) / rgbRange);\n    const uB = floatToUint8((b - rgbMin) / rgbRange);\n    const uA = floatToUint8(opacity);\n    const uQuat = encodeQuatOctXy88R8(\n      tempQuaternion.set(quatX, quatY, quatZ, quatW)\n    );\n    const uQuatX = uQuat & 255;\n    const uQuatY = uQuat >>> 8 & 255;\n    const uQuatZ = uQuat >>> 16 & 255;\n    const lnScaleMin = (encoding == null ? void 0 : encoding.lnScaleMin) ?? LN_SCALE_MIN;\n    const lnScaleMax = (encoding == null ? void 0 : encoding.lnScaleMax) ?? LN_SCALE_MAX;\n    const lnScaleScale = 254 / (lnScaleMax - lnScaleMin);\n    const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleX) - lnScaleMin) * lnScaleScale) + 1\n      )\n    );\n    const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleY) - lnScaleMin) * lnScaleScale) + 1\n      )\n    );\n    const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleZ) - lnScaleMin) * lnScaleScale) + 1\n      )\n    );\n    const uCenterX = toHalf(x2);\n    const uCenterY = toHalf(y);\n    const uCenterZ = toHalf(z);\n    const i4 = index * 4;\n    packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;\n    packedSplats[i4 + 1] = uCenterX | uCenterY << 16;\n    packedSplats[i4 + 2] = uCenterZ | uQuatX << 16 | uQuatY << 24;\n    packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | uQuatZ << 24;\n  }\n  function setPackedSplatCenter(packedSplats, index, x2, y, z) {\n    const uCenterX = toHalf(x2);\n    const uCenterY = toHalf(y);\n    const uCenterZ = toHalf(z);\n    const i4 = index * 4;\n    packedSplats[i4 + 1] = uCenterX | uCenterY << 16;\n    packedSplats[i4 + 2] = uCenterZ | packedSplats[i4 + 2] & 4294901760;\n  }\n  function setPackedSplatScales(packedSplats, index, scaleX, scaleY, scaleZ, encoding) {\n    const lnScaleMin = (encoding == null ? void 0 : encoding.lnScaleMin) ?? LN_SCALE_MIN;\n    const lnScaleMax = (encoding == null ? void 0 : encoding.lnScaleMax) ?? LN_SCALE_MAX;\n    const lnScaleScale = 254 / (lnScaleMax - lnScaleMin);\n    const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleX) - lnScaleMin) * lnScaleScale) + 1\n      )\n    );\n    const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleY) - lnScaleMin) * lnScaleScale) + 1\n      )\n    );\n    const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleZ) - lnScaleMin) * lnScaleScale) + 1\n      )\n    );\n    const i4 = index * 4;\n    packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | packedSplats[i4 + 3] & 4278190080;\n  }\n  const tempQuaternion = new Quaternion();\n  function setPackedSplatQuat(packedSplats, index, quatX, quatY, quatZ, quatW) {\n    const uQuat = encodeQuatOctXy88R8(\n      tempQuaternion.set(quatX, quatY, quatZ, quatW)\n    );\n    const uQuatX = uQuat & 255;\n    const uQuatY = uQuat >>> 8 & 255;\n    const uQuatZ = uQuat >>> 16 & 255;\n    const i4 = index * 4;\n    packedSplats[i4 + 2] = packedSplats[i4 + 2] & 65535 | uQuatX << 16 | uQuatY << 24;\n    packedSplats[i4 + 3] = packedSplats[i4 + 3] & 16777215 | uQuatZ << 24;\n  }\n  function setPackedSplatRgba(packedSplats, index, r, g, b, a, encoding) {\n    const rgbMin = (encoding == null ? void 0 : encoding.rgbMin) ?? 0;\n    const rgbMax = (encoding == null ? void 0 : encoding.rgbMax) ?? 1;\n    const rgbRange = rgbMax - rgbMin;\n    const uR = floatToUint8((r - rgbMin) / rgbRange);\n    const uG = floatToUint8((g - rgbMin) / rgbRange);\n    const uB = floatToUint8((b - rgbMin) / rgbRange);\n    const uA = floatToUint8(a);\n    const i4 = index * 4;\n    packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;\n  }\n  function setPackedSplatRgb(packedSplats, index, r, g, b, encoding) {\n    const rgbMin = (encoding == null ? void 0 : encoding.rgbMin) ?? 0;\n    const rgbMax = (encoding == null ? void 0 : encoding.rgbMax) ?? 1;\n    const rgbRange = rgbMax - rgbMin;\n    const uR = floatToUint8((r - rgbMin) / rgbRange);\n    const uG = floatToUint8((g - rgbMin) / rgbRange);\n    const uB = floatToUint8((b - rgbMin) / rgbRange);\n    const i4 = index * 4;\n    packedSplats[i4] = uR | uG << 8 | uB << 16 | packedSplats[i4] & 4278190080;\n  }\n  function setPackedSplatOpacity(packedSplats, index, opacity) {\n    const uA = floatToUint8(opacity);\n    const i4 = index * 4;\n    packedSplats[i4] = packedSplats[i4] & 16777215 | uA << 24;\n  }\n  new Vector3();\n  new Vector3();\n  new Color();\n  function getTextureSize(numSplats) {\n    const width = SPLAT_TEX_WIDTH;\n    const height = Math.max(\n      SPLAT_TEX_MIN_HEIGHT,\n      Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))\n    );\n    const depth = Math.ceil(numSplats / (width * height));\n    const maxSplats = width * height * depth;\n    return { width, height, depth, maxSplats };\n  }\n  function computeMaxSplats(numSplats) {\n    const width = SPLAT_TEX_WIDTH;\n    const height = Math.max(\n      SPLAT_TEX_MIN_HEIGHT,\n      Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))\n    );\n    const depth = Math.ceil(numSplats / (width * height));\n    return width * height * depth;\n  }\n  unindent(`\n  precision highp float;\n\n  in vec3 position;\n\n  void main() {\n    gl_Position = vec4(position.xy, 0.0, 1.0);\n  }\n`);\n  const tempNormalizedQuaternion = new Quaternion();\n  const tempAxis = new Vector3();\n  function encodeQuatOctXy88R8(q) {\n    const qnorm = tempNormalizedQuaternion.copy(q).normalize();\n    if (qnorm.w < 0) {\n      qnorm.set(-qnorm.x, -qnorm.y, -qnorm.z, -qnorm.w);\n    }\n    const theta = 2 * Math.acos(qnorm.w);\n    const xyz_norm = Math.sqrt(\n      qnorm.x * qnorm.x + qnorm.y * qnorm.y + qnorm.z * qnorm.z\n    );\n    const axis = xyz_norm < 1e-6 ? tempAxis.set(1, 0, 0) : tempAxis.set(qnorm.x, qnorm.y, qnorm.z).divideScalar(xyz_norm);\n    const sum = Math.abs(axis.x) + Math.abs(axis.y) + Math.abs(axis.z);\n    let p_x = axis.x / sum;\n    let p_y = axis.y / sum;\n    if (axis.z < 0) {\n      const tmp = p_x;\n      p_x = (1 - Math.abs(p_y)) * (p_x >= 0 ? 1 : -1);\n      p_y = (1 - Math.abs(tmp)) * (p_y >= 0 ? 1 : -1);\n    }\n    const u_f = p_x * 0.5 + 0.5;\n    const v_f = p_y * 0.5 + 0.5;\n    const quantU = Math.round(u_f * 255);\n    const quantV = Math.round(v_f * 255);\n    const angleInt = Math.round(theta * (255 / Math.PI));\n    return angleInt << 16 | quantV << 8 | quantU;\n  }\n  function packSint8Bytes(b0, b1, b22, b3) {\n    const clampedB0 = Math.max(-127, Math.min(127, b0 * 127));\n    const clampedB1 = Math.max(-127, Math.min(127, b1 * 127));\n    const clampedB2 = Math.max(-127, Math.min(127, b22 * 127));\n    const clampedB3 = Math.max(-127, Math.min(127, b3 * 127));\n    return clampedB0 & 255 | (clampedB1 & 255) << 8 | (clampedB2 & 255) << 16 | (clampedB3 & 255) << 24;\n  }\n  function encodeSh1Rgb(sh1Array, index, sh1Rgb, encoding) {\n    const sh1Min = (encoding == null ? void 0 : encoding.sh1Min) ?? -1;\n    const sh1Max = (encoding == null ? void 0 : encoding.sh1Max) ?? 1;\n    const sh1Mid = 0.5 * (sh1Min + sh1Max);\n    const sh1Scale = 126 / (sh1Max - sh1Min);\n    const base = index * 2;\n    for (let i2 = 0; i2 < 9; ++i2) {\n      const s = (sh1Rgb[i2] - sh1Mid) * sh1Scale;\n      const value = Math.round(Math.max(-63, Math.min(63, s))) & 127;\n      const bitStart = i2 * 7;\n      const bitEnd = bitStart + 7;\n      const wordStart = Math.floor(bitStart / 32);\n      const bitOffset = bitStart - wordStart * 32;\n      const firstWord = value << bitOffset & 4294967295;\n      sh1Array[base + wordStart] |= firstWord;\n      if (bitEnd > wordStart * 32 + 32) {\n        const secondWord = value >>> 32 - bitOffset & 4294967295;\n        sh1Array[base + wordStart + 1] |= secondWord;\n      }\n    }\n  }\n  function encodeSh2Rgb(sh2Array, index, sh2Rgb, encoding) {\n    const sh2Min = (encoding == null ? void 0 : encoding.sh2Min) ?? -1;\n    const sh2Max = (encoding == null ? void 0 : encoding.sh2Max) ?? 1;\n    const sh2Mid = 0.5 * (sh2Min + sh2Max);\n    const sh2Scale = 2 / (sh2Max - sh2Min);\n    sh2Array[index * 4 + 0] = packSint8Bytes(\n      (sh2Rgb[0] - sh2Mid) * sh2Scale,\n      (sh2Rgb[1] - sh2Mid) * sh2Scale,\n      (sh2Rgb[2] - sh2Mid) * sh2Scale,\n      (sh2Rgb[3] - sh2Mid) * sh2Scale\n    );\n    sh2Array[index * 4 + 1] = packSint8Bytes(\n      (sh2Rgb[4] - sh2Mid) * sh2Scale,\n      (sh2Rgb[5] - sh2Mid) * sh2Scale,\n      (sh2Rgb[6] - sh2Mid) * sh2Scale,\n      (sh2Rgb[7] - sh2Mid) * sh2Scale\n    );\n    sh2Array[index * 4 + 2] = packSint8Bytes(\n      (sh2Rgb[8] - sh2Mid) * sh2Scale,\n      (sh2Rgb[9] - sh2Mid) * sh2Scale,\n      (sh2Rgb[10] - sh2Mid) * sh2Scale,\n      (sh2Rgb[11] - sh2Mid) * sh2Scale\n    );\n    sh2Array[index * 4 + 3] = packSint8Bytes(\n      (sh2Rgb[12] - sh2Mid) * sh2Scale,\n      (sh2Rgb[13] - sh2Mid) * sh2Scale,\n      (sh2Rgb[14] - sh2Mid) * sh2Scale,\n      0\n    );\n  }\n  function encodeSh3Rgb(sh3Array, index, sh3Rgb, encoding) {\n    const sh3Min = (encoding == null ? void 0 : encoding.sh3Min) ?? -1;\n    const sh3Max = (encoding == null ? void 0 : encoding.sh3Max) ?? 1;\n    const sh3Mid = 0.5 * (sh3Min + sh3Max);\n    const sh3Scale = 62 / (sh3Max - sh3Min);\n    const base = index * 4;\n    for (let i2 = 0; i2 < 21; ++i2) {\n      const s = (sh3Rgb[i2] - sh3Mid) * sh3Scale;\n      const value = Math.round(Math.max(-31, Math.min(31, s))) & 63;\n      const bitStart = i2 * 6;\n      const bitEnd = bitStart + 6;\n      const wordStart = Math.floor(bitStart / 32);\n      const bitOffset = bitStart - wordStart * 32;\n      const firstWord = value << bitOffset & 4294967295;\n      sh3Array[base + wordStart] |= firstWord;\n      if (bitEnd > wordStart * 32 + 32) {\n        const secondWord = value >>> 32 - bitOffset & 4294967295;\n        sh3Array[base + wordStart + 1] |= secondWord;\n      }\n    }\n  }\n  function decompressPartialGzip(fileBytes, numBytes) {\n    const chunks = [];\n    let totalBytes = 0;\n    let result = null;\n    const gunzip = new Gunzip((data, final) => {\n      chunks.push(data);\n      totalBytes += data.length;\n      if (final || totalBytes >= numBytes) {\n        const allBytes = new Uint8Array(totalBytes);\n        let offset2 = 0;\n        for (const chunk of chunks) {\n          allBytes.set(chunk, offset2);\n          offset2 += chunk.length;\n        }\n        result = allBytes.slice(0, numBytes);\n      }\n    });\n    const CHUNK_SIZE = 1024;\n    let offset = 0;\n    while (result == null && offset < fileBytes.length) {\n      const chunk = fileBytes.slice(offset, offset + CHUNK_SIZE);\n      gunzip.push(chunk, false);\n      offset += CHUNK_SIZE;\n    }\n    if (result == null) {\n      gunzip.push(new Uint8Array(), true);\n      if (result == null) {\n        throw new Error(\"Failed to decompress partial gzip\");\n      }\n    }\n    return result;\n  }\n  class GunzipReader {\n    constructor({\n      fileBytes,\n      chunkBytes = 64 * 1024\n    }) {\n      this.fileBytes = fileBytes;\n      this.chunkBytes = chunkBytes;\n      this.chunks = [];\n      this.totalBytes = 0;\n      const ds = new DecompressionStream(\"gzip\");\n      const decompressionStream = new Blob([fileBytes]).stream().pipeThrough(ds);\n      this.reader = decompressionStream.getReader();\n    }\n    async read(numBytes) {\n      while (this.totalBytes < numBytes) {\n        const { value: chunk, done: readerDone } = await this.reader.read();\n        if (readerDone) {\n          break;\n        }\n        this.chunks.push(chunk);\n        this.totalBytes += chunk.length;\n      }\n      if (this.totalBytes < numBytes) {\n        throw new Error(\n          `Unexpected EOF: needed ${numBytes}, got ${this.totalBytes}`\n        );\n      }\n      const allBytes = new Uint8Array(this.totalBytes);\n      let outOffset = 0;\n      for (const chunk of this.chunks) {\n        allBytes.set(chunk, outOffset);\n        outOffset += chunk.length;\n      }\n      const result = allBytes.subarray(0, numBytes);\n      this.chunks = [allBytes.subarray(numBytes)];\n      this.totalBytes -= numBytes;\n      return result;\n    }\n  }\n  function decodeAntiSplat(fileBytes, initNumSplats, splatCallback) {\n    const numSplats = Math.floor(fileBytes.length / 32);\n    if (numSplats * 32 !== fileBytes.length) {\n      throw new Error(\"Invalid .splat file size\");\n    }\n    initNumSplats(numSplats);\n    const f32 = new Float32Array(fileBytes.buffer);\n    for (let i2 = 0; i2 < numSplats; ++i2) {\n      const i322 = i2 * 32;\n      const i8 = i2 * 8;\n      const x2 = f32[i8 + 0];\n      const y = f32[i8 + 1];\n      const z = f32[i8 + 2];\n      const scaleX = f32[i8 + 3];\n      const scaleY = f32[i8 + 4];\n      const scaleZ = f32[i8 + 5];\n      const r = fileBytes[i322 + 24] / 255;\n      const g = fileBytes[i322 + 25] / 255;\n      const b = fileBytes[i322 + 26] / 255;\n      const opacity = fileBytes[i322 + 27] / 255;\n      const quatW = (fileBytes[i322 + 28] - 128) / 128;\n      const quatX = (fileBytes[i322 + 29] - 128) / 128;\n      const quatY = (fileBytes[i322 + 30] - 128) / 128;\n      const quatZ = (fileBytes[i322 + 31] - 128) / 128;\n      splatCallback(\n        i2,\n        x2,\n        y,\n        z,\n        scaleX,\n        scaleY,\n        scaleZ,\n        quatX,\n        quatY,\n        quatZ,\n        quatW,\n        opacity,\n        r,\n        g,\n        b\n      );\n    }\n  }\n  function unpackAntiSplat(fileBytes, splatEncoding) {\n    let numSplats = 0;\n    let maxSplats = 0;\n    let packedArray = new Uint32Array(0);\n    decodeAntiSplat(\n      fileBytes,\n      (cbNumSplats) => {\n        numSplats = cbNumSplats;\n        maxSplats = computeMaxSplats(numSplats);\n        packedArray = new Uint32Array(maxSplats * 4);\n      },\n      (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n        setPackedSplat(\n          packedArray,\n          index,\n          x2,\n          y,\n          z,\n          scaleX,\n          scaleY,\n          scaleZ,\n          quatX,\n          quatY,\n          quatZ,\n          quatW,\n          opacity,\n          r,\n          g,\n          b,\n          splatEncoding\n        );\n      }\n    );\n    return { packedArray, numSplats };\n  }\n  const KSPLAT_COMPRESSION = {\n    0: {\n      bytesPerCenter: 12,\n      bytesPerScale: 12,\n      bytesPerRotation: 16,\n      bytesPerColor: 4,\n      bytesPerSphericalHarmonicsComponent: 4,\n      scaleOffsetBytes: 12,\n      rotationOffsetBytes: 24,\n      colorOffsetBytes: 40,\n      sphericalHarmonicsOffsetBytes: 44,\n      scaleRange: 1\n    },\n    1: {\n      bytesPerCenter: 6,\n      bytesPerScale: 6,\n      bytesPerRotation: 8,\n      bytesPerColor: 4,\n      bytesPerSphericalHarmonicsComponent: 2,\n      scaleOffsetBytes: 6,\n      rotationOffsetBytes: 12,\n      colorOffsetBytes: 20,\n      sphericalHarmonicsOffsetBytes: 24,\n      scaleRange: 32767\n    },\n    2: {\n      bytesPerCenter: 6,\n      bytesPerScale: 6,\n      bytesPerRotation: 8,\n      bytesPerColor: 4,\n      bytesPerSphericalHarmonicsComponent: 1,\n      scaleOffsetBytes: 6,\n      rotationOffsetBytes: 12,\n      colorOffsetBytes: 20,\n      sphericalHarmonicsOffsetBytes: 24,\n      scaleRange: 32767\n    }\n  };\n  const KSPLAT_SH_DEGREE_TO_COMPONENTS = {\n    0: 0,\n    1: 9,\n    2: 24,\n    3: 45\n  };\n  function decodeKsplat(fileBytes, initNumSplats, splatCallback, shCallback) {\n    var _a2;\n    const HEADER_BYTES = 4096;\n    const SECTION_BYTES = 1024;\n    let headerOffset = 0;\n    const header = new DataView(fileBytes.buffer, headerOffset, HEADER_BYTES);\n    headerOffset += HEADER_BYTES;\n    const versionMajor = header.getUint8(0);\n    const versionMinor = header.getUint8(1);\n    if (versionMajor !== 0 || versionMinor < 1) {\n      throw new Error(\n        `Unsupported .ksplat version: ${versionMajor}.${versionMinor}`\n      );\n    }\n    const maxSectionCount = header.getUint32(4, true);\n    header.getUint32(16, true);\n    const compressionLevel = header.getUint16(20, true);\n    if (compressionLevel < 0 || compressionLevel > 2) {\n      throw new Error(`Invalid .ksplat compression level: ${compressionLevel}`);\n    }\n    const minSphericalHarmonicsCoeff = header.getFloat32(36, true) || -1.5;\n    const maxSphericalHarmonicsCoeff = header.getFloat32(40, true) || 1.5;\n    let sectionBase = HEADER_BYTES + maxSectionCount * SECTION_BYTES;\n    for (let section = 0; section < maxSectionCount; ++section) {\n      let getSh = function(splatOffset, component) {\n        if (compressionLevel === 0) {\n          return data.getFloat32(\n            splatOffset + sphericalHarmonicsOffsetBytes + component * 4,\n            true\n          );\n        }\n        if (compressionLevel === 1) {\n          return fromHalf(\n            data.getUint16(\n              splatOffset + sphericalHarmonicsOffsetBytes + component * 2,\n              true\n            )\n          );\n        }\n        const t = data.getUint8(splatOffset + sphericalHarmonicsOffsetBytes + component) / 255;\n        return minSphericalHarmonicsCoeff + t * (maxSphericalHarmonicsCoeff - minSphericalHarmonicsCoeff);\n      };\n      const section2 = new DataView(fileBytes.buffer, headerOffset, SECTION_BYTES);\n      headerOffset += SECTION_BYTES;\n      const sectionSplatCount = section2.getUint32(0, true);\n      const sectionMaxSplatCount = section2.getUint32(4, true);\n      const bucketSize = section2.getUint32(8, true);\n      const bucketCount = section2.getUint32(12, true);\n      const bucketBlockSize = section2.getFloat32(16, true);\n      const bucketStorageSizeBytes = section2.getUint16(20, true);\n      const compressionScaleRange = (section2.getUint32(24, true) || ((_a2 = KSPLAT_COMPRESSION[compressionLevel]) == null ? void 0 : _a2.scaleRange)) ?? 1;\n      const fullBucketCount = section2.getUint32(32, true);\n      const fullBucketSplats = fullBucketCount * bucketSize;\n      const partiallyFilledBucketCount = section2.getUint32(36, true);\n      const bucketsMetaDataSizeBytes = partiallyFilledBucketCount * 4;\n      const bucketsStorageSizeBytes = bucketStorageSizeBytes * bucketCount + bucketsMetaDataSizeBytes;\n      const sphericalHarmonicsDegree = section2.getUint16(40, true);\n      const shComponents = KSPLAT_SH_DEGREE_TO_COMPONENTS[sphericalHarmonicsDegree];\n      const {\n        bytesPerCenter,\n        bytesPerScale,\n        bytesPerRotation,\n        bytesPerColor,\n        bytesPerSphericalHarmonicsComponent,\n        scaleOffsetBytes,\n        rotationOffsetBytes,\n        colorOffsetBytes,\n        sphericalHarmonicsOffsetBytes\n      } = KSPLAT_COMPRESSION[compressionLevel];\n      const bytesPerSplat = bytesPerCenter + bytesPerScale + bytesPerRotation + bytesPerColor + shComponents * bytesPerSphericalHarmonicsComponent;\n      const splatDataStorageSizeBytes = bytesPerSplat * sectionMaxSplatCount;\n      const storageSizeBytes = splatDataStorageSizeBytes + bucketsStorageSizeBytes;\n      const sh1Index = [0, 3, 6, 1, 4, 7, 2, 5, 8];\n      const sh2Index = [\n        9,\n        14,\n        19,\n        10,\n        15,\n        20,\n        11,\n        16,\n        21,\n        12,\n        17,\n        22,\n        13,\n        18,\n        23\n      ];\n      const sh3Index = [\n        24,\n        31,\n        38,\n        25,\n        32,\n        39,\n        26,\n        33,\n        40,\n        27,\n        34,\n        41,\n        28,\n        35,\n        42,\n        29,\n        36,\n        43,\n        30,\n        37,\n        44\n      ];\n      const sh1 = sphericalHarmonicsDegree >= 1 ? new Float32Array(3 * 3) : void 0;\n      const sh2 = sphericalHarmonicsDegree >= 2 ? new Float32Array(5 * 3) : void 0;\n      const sh3 = sphericalHarmonicsDegree >= 3 ? new Float32Array(7 * 3) : void 0;\n      const compressionScaleFactor = bucketBlockSize / 2 / compressionScaleRange;\n      const bucketsBase = sectionBase + bucketsMetaDataSizeBytes;\n      const dataBase = sectionBase + bucketsStorageSizeBytes;\n      const data = new DataView(\n        fileBytes.buffer,\n        dataBase,\n        splatDataStorageSizeBytes\n      );\n      const bucketArray = new Float32Array(\n        fileBytes.buffer,\n        bucketsBase,\n        bucketCount * 3\n      );\n      const partiallyFilledBucketLengths = new Uint32Array(\n        fileBytes.buffer,\n        sectionBase,\n        partiallyFilledBucketCount\n      );\n      let partialBucketIndex = fullBucketCount;\n      let partialBucketBase = fullBucketSplats;\n      for (let i2 = 0; i2 < sectionSplatCount; ++i2) {\n        const splatOffset = i2 * bytesPerSplat;\n        let bucketIndex;\n        if (i2 < fullBucketSplats) {\n          bucketIndex = Math.floor(i2 / bucketSize);\n        } else {\n          const bucketLength = partiallyFilledBucketLengths[partialBucketIndex - fullBucketCount];\n          if (i2 >= partialBucketBase + bucketLength) {\n            partialBucketIndex += 1;\n            partialBucketBase += bucketLength;\n          }\n          bucketIndex = partialBucketIndex;\n        }\n        const x2 = compressionLevel === 0 ? data.getFloat32(splatOffset + 0, true) : (data.getUint16(splatOffset + 0, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 0];\n        const y = compressionLevel === 0 ? data.getFloat32(splatOffset + 4, true) : (data.getUint16(splatOffset + 2, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 1];\n        const z = compressionLevel === 0 ? data.getFloat32(splatOffset + 8, true) : (data.getUint16(splatOffset + 4, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 2];\n        const scaleX = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 0, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 0, true));\n        const scaleY = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 4, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 2, true));\n        const scaleZ = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 8, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 4, true));\n        const quatW = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 0, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 0, true)\n        );\n        const quatX = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 4, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 2, true)\n        );\n        const quatY = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 8, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 4, true)\n        );\n        const quatZ = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 12, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 6, true)\n        );\n        const r = data.getUint8(splatOffset + colorOffsetBytes + 0) / 255;\n        const g = data.getUint8(splatOffset + colorOffsetBytes + 1) / 255;\n        const b = data.getUint8(splatOffset + colorOffsetBytes + 2) / 255;\n        const opacity = data.getUint8(splatOffset + colorOffsetBytes + 3) / 255;\n        splatCallback(\n          i2,\n          x2,\n          y,\n          z,\n          scaleX,\n          scaleY,\n          scaleZ,\n          quatX,\n          quatY,\n          quatZ,\n          quatW,\n          opacity,\n          r,\n          g,\n          b\n        );\n        if (sphericalHarmonicsDegree >= 1 && sh1) {\n          for (const [i22, key] of sh1Index.entries()) {\n            sh1[i22] = getSh(splatOffset, key);\n          }\n          if (sh2) {\n            for (const [i22, key] of sh2Index.entries()) {\n              sh2[i22] = getSh(splatOffset, key);\n            }\n          }\n          if (sh3) {\n            for (const [i22, key] of sh3Index.entries()) {\n              sh3[i22] = getSh(splatOffset, key);\n            }\n          }\n          shCallback == null ? void 0 : shCallback(i2, sh1, sh2, sh3);\n        }\n      }\n      sectionBase += storageSizeBytes;\n    }\n  }\n  function unpackKsplat(fileBytes, splatEncoding) {\n    var _a2;\n    const HEADER_BYTES = 4096;\n    const SECTION_BYTES = 1024;\n    let headerOffset = 0;\n    const header = new DataView(fileBytes.buffer, headerOffset, HEADER_BYTES);\n    headerOffset += HEADER_BYTES;\n    const versionMajor = header.getUint8(0);\n    const versionMinor = header.getUint8(1);\n    if (versionMajor !== 0 || versionMinor < 1) {\n      throw new Error(\n        `Unsupported .ksplat version: ${versionMajor}.${versionMinor}`\n      );\n    }\n    const maxSectionCount = header.getUint32(4, true);\n    const splatCount = header.getUint32(16, true);\n    const compressionLevel = header.getUint16(20, true);\n    if (compressionLevel < 0 || compressionLevel > 2) {\n      throw new Error(`Invalid .ksplat compression level: ${compressionLevel}`);\n    }\n    const minSphericalHarmonicsCoeff = header.getFloat32(36, true) || -1.5;\n    const maxSphericalHarmonicsCoeff = header.getFloat32(40, true) || 1.5;\n    const numSplats = splatCount;\n    const maxSplats = computeMaxSplats(numSplats);\n    const packedArray = new Uint32Array(maxSplats * 4);\n    const extra = {};\n    let sectionBase = HEADER_BYTES + maxSectionCount * SECTION_BYTES;\n    for (let section = 0; section < maxSectionCount; ++section) {\n      let getSh = function(splatOffset, component) {\n        if (compressionLevel === 0) {\n          return data.getFloat32(\n            splatOffset + sphericalHarmonicsOffsetBytes + component * 4,\n            true\n          );\n        }\n        if (compressionLevel === 1) {\n          return fromHalf(\n            data.getUint16(\n              splatOffset + sphericalHarmonicsOffsetBytes + component * 2,\n              true\n            )\n          );\n        }\n        const t = data.getUint8(splatOffset + sphericalHarmonicsOffsetBytes + component) / 255;\n        return minSphericalHarmonicsCoeff + t * (maxSphericalHarmonicsCoeff - minSphericalHarmonicsCoeff);\n      };\n      const section2 = new DataView(fileBytes.buffer, headerOffset, SECTION_BYTES);\n      headerOffset += SECTION_BYTES;\n      const sectionSplatCount = section2.getUint32(0, true);\n      const sectionMaxSplatCount = section2.getUint32(4, true);\n      const bucketSize = section2.getUint32(8, true);\n      const bucketCount = section2.getUint32(12, true);\n      const bucketBlockSize = section2.getFloat32(16, true);\n      const bucketStorageSizeBytes = section2.getUint16(20, true);\n      const compressionScaleRange = (section2.getUint32(24, true) || ((_a2 = KSPLAT_COMPRESSION[compressionLevel]) == null ? void 0 : _a2.scaleRange)) ?? 1;\n      const fullBucketCount = section2.getUint32(32, true);\n      const fullBucketSplats = fullBucketCount * bucketSize;\n      const partiallyFilledBucketCount = section2.getUint32(36, true);\n      const bucketsMetaDataSizeBytes = partiallyFilledBucketCount * 4;\n      const bucketsStorageSizeBytes = bucketStorageSizeBytes * bucketCount + bucketsMetaDataSizeBytes;\n      const sphericalHarmonicsDegree = section2.getUint16(40, true);\n      const shComponents = KSPLAT_SH_DEGREE_TO_COMPONENTS[sphericalHarmonicsDegree];\n      const {\n        bytesPerCenter,\n        bytesPerScale,\n        bytesPerRotation,\n        bytesPerColor,\n        bytesPerSphericalHarmonicsComponent,\n        scaleOffsetBytes,\n        rotationOffsetBytes,\n        colorOffsetBytes,\n        sphericalHarmonicsOffsetBytes\n      } = KSPLAT_COMPRESSION[compressionLevel];\n      const bytesPerSplat = bytesPerCenter + bytesPerScale + bytesPerRotation + bytesPerColor + shComponents * bytesPerSphericalHarmonicsComponent;\n      const splatDataStorageSizeBytes = bytesPerSplat * sectionMaxSplatCount;\n      const storageSizeBytes = splatDataStorageSizeBytes + bucketsStorageSizeBytes;\n      const sh1Index = [0, 3, 6, 1, 4, 7, 2, 5, 8];\n      const sh2Index = [\n        9,\n        14,\n        19,\n        10,\n        15,\n        20,\n        11,\n        16,\n        21,\n        12,\n        17,\n        22,\n        13,\n        18,\n        23\n      ];\n      const sh3Index = [\n        24,\n        31,\n        38,\n        25,\n        32,\n        39,\n        26,\n        33,\n        40,\n        27,\n        34,\n        41,\n        28,\n        35,\n        42,\n        29,\n        36,\n        43,\n        30,\n        37,\n        44\n      ];\n      const sh1 = sphericalHarmonicsDegree >= 1 ? new Float32Array(3 * 3) : void 0;\n      const sh2 = sphericalHarmonicsDegree >= 2 ? new Float32Array(5 * 3) : void 0;\n      const sh3 = sphericalHarmonicsDegree >= 3 ? new Float32Array(7 * 3) : void 0;\n      const compressionScaleFactor = bucketBlockSize / 2 / compressionScaleRange;\n      const bucketsBase = sectionBase + bucketsMetaDataSizeBytes;\n      const dataBase = sectionBase + bucketsStorageSizeBytes;\n      const data = new DataView(\n        fileBytes.buffer,\n        dataBase,\n        splatDataStorageSizeBytes\n      );\n      const bucketArray = new Float32Array(\n        fileBytes.buffer,\n        bucketsBase,\n        bucketCount * 3\n      );\n      const partiallyFilledBucketLengths = new Uint32Array(\n        fileBytes.buffer,\n        sectionBase,\n        partiallyFilledBucketCount\n      );\n      let partialBucketIndex = fullBucketCount;\n      let partialBucketBase = fullBucketSplats;\n      for (let i2 = 0; i2 < sectionSplatCount; ++i2) {\n        const splatOffset = i2 * bytesPerSplat;\n        let bucketIndex;\n        if (i2 < fullBucketSplats) {\n          bucketIndex = Math.floor(i2 / bucketSize);\n        } else {\n          const bucketLength = partiallyFilledBucketLengths[partialBucketIndex - fullBucketCount];\n          if (i2 >= partialBucketBase + bucketLength) {\n            partialBucketIndex += 1;\n            partialBucketBase += bucketLength;\n          }\n          bucketIndex = partialBucketIndex;\n        }\n        const x2 = compressionLevel === 0 ? data.getFloat32(splatOffset + 0, true) : (data.getUint16(splatOffset + 0, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 0];\n        const y = compressionLevel === 0 ? data.getFloat32(splatOffset + 4, true) : (data.getUint16(splatOffset + 2, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 1];\n        const z = compressionLevel === 0 ? data.getFloat32(splatOffset + 8, true) : (data.getUint16(splatOffset + 4, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 2];\n        const scaleX = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 0, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 0, true));\n        const scaleY = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 4, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 2, true));\n        const scaleZ = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 8, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 4, true));\n        const quatW = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 0, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 0, true)\n        );\n        const quatX = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 4, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 2, true)\n        );\n        const quatY = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 8, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 4, true)\n        );\n        const quatZ = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 12, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 6, true)\n        );\n        const r = data.getUint8(splatOffset + colorOffsetBytes + 0) / 255;\n        const g = data.getUint8(splatOffset + colorOffsetBytes + 1) / 255;\n        const b = data.getUint8(splatOffset + colorOffsetBytes + 2) / 255;\n        const opacity = data.getUint8(splatOffset + colorOffsetBytes + 3) / 255;\n        setPackedSplat(\n          packedArray,\n          i2,\n          x2,\n          y,\n          z,\n          scaleX,\n          scaleY,\n          scaleZ,\n          quatX,\n          quatY,\n          quatZ,\n          quatW,\n          opacity,\n          r,\n          g,\n          b,\n          splatEncoding\n        );\n        if (sphericalHarmonicsDegree >= 1) {\n          if (sh1) {\n            if (!extra.sh1) {\n              extra.sh1 = new Uint32Array(numSplats * 2);\n            }\n            for (const [i22, key] of sh1Index.entries()) {\n              sh1[i22] = getSh(splatOffset, key);\n            }\n            encodeSh1Rgb(extra.sh1, i2, sh1, splatEncoding);\n          }\n          if (sh2) {\n            if (!extra.sh2) {\n              extra.sh2 = new Uint32Array(numSplats * 4);\n            }\n            for (const [i22, key] of sh2Index.entries()) {\n              sh2[i22] = getSh(splatOffset, key);\n            }\n            encodeSh2Rgb(extra.sh2, i2, sh2, splatEncoding);\n          }\n          if (sh3) {\n            if (!extra.sh3) {\n              extra.sh3 = new Uint32Array(numSplats * 4);\n            }\n            for (const [i22, key] of sh3Index.entries()) {\n              sh3[i22] = getSh(splatOffset, key);\n            }\n            encodeSh3Rgb(extra.sh3, i2, sh3, splatEncoding);\n          }\n        }\n      }\n      sectionBase += storageSizeBytes;\n    }\n    return { packedArray, numSplats, extra };\n  }\n  const PLY_PROPERTY_TYPES = [\n    \"char\",\n    \"uchar\",\n    \"short\",\n    \"ushort\",\n    \"int\",\n    \"uint\",\n    \"float\",\n    \"double\"\n  ];\n  const _PlyReader = class _PlyReader {\n    // Create a PlyReader from a Uint8Array/ArrayBuffer, no parsing done yet\n    constructor({ fileBytes }) {\n      this.header = \"\";\n      this.littleEndian = true;\n      this.elements = {};\n      this.comments = [];\n      this.data = null;\n      this.numSplats = 0;\n      this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;\n    }\n    // Identify and parse the PLY text header (assumed to be <64KB in size).\n    // this.elements will contain all the elements in the file, typically\n    // \"vertex\" contains the Gsplat data.\n    async parseHeader() {\n      const bufferStream = new ReadableStream({\n        start: (controller) => {\n          controller.enqueue(this.fileBytes.slice(0, 65536));\n          controller.close();\n        }\n      });\n      const decoder = bufferStream.pipeThrough(new TextDecoderStream()).getReader();\n      this.header = \"\";\n      const headerTerminator = \"end_header\\n\";\n      while (true) {\n        const { value, done } = await decoder.read();\n        if (done) {\n          throw new Error(\"Failed to read header\");\n        }\n        this.header += value;\n        const endHeader = this.header.indexOf(headerTerminator);\n        if (endHeader >= 0) {\n          this.header = this.header.slice(0, endHeader + headerTerminator.length);\n          break;\n        }\n      }\n      const headerLen = new TextEncoder().encode(this.header).length;\n      this.data = new DataView(this.fileBytes.buffer, headerLen);\n      this.elements = {};\n      let curElement = null;\n      this.comments = [];\n      this.header.trim().split(\"\\n\").forEach((line, lineIndex) => {\n        const trimmedLine = line.trim();\n        if (lineIndex === 0) {\n          if (trimmedLine !== \"ply\") {\n            throw new Error(\"Invalid PLY header\");\n          }\n          return;\n        }\n        if (trimmedLine.length === 0) {\n          return;\n        }\n        const fields = trimmedLine.split(\" \");\n        switch (fields[0]) {\n          case \"format\":\n            if (fields[1] === \"binary_little_endian\") {\n              this.littleEndian = true;\n            } else if (fields[1] === \"binary_big_endian\") {\n              this.littleEndian = false;\n            } else {\n              throw new Error(`Unsupported PLY format: ${fields[1]}`);\n            }\n            if (fields[2] !== \"1.0\") {\n              throw new Error(`Unsupported PLY version: ${fields[2]}`);\n            }\n            break;\n          case \"end_header\":\n            break;\n          case \"comment\":\n            this.comments.push(trimmedLine.slice(\"comment \".length));\n            break;\n          case \"element\": {\n            const name = fields[1];\n            curElement = {\n              name,\n              count: Number.parseInt(fields[2]),\n              properties: {}\n            };\n            this.elements[name] = curElement;\n            break;\n          }\n          case \"property\":\n            if (curElement == null) {\n              throw new Error(\"Property must be inside an element\");\n            }\n            if (fields[1] === \"list\") {\n              curElement.properties[fields[4]] = {\n                isList: true,\n                type: fields[3],\n                countType: fields[2]\n              };\n            } else {\n              curElement.properties[fields[2]] = {\n                isList: false,\n                type: fields[1]\n              };\n            }\n            break;\n        }\n      });\n      if (this.elements.vertex) {\n        this.numSplats = this.elements.vertex.count;\n      }\n    }\n    parseData(elementCallback) {\n      let offset = 0;\n      const data = this.data;\n      if (data == null) {\n        throw new Error(\"No data to parse\");\n      }\n      for (const elementName in this.elements) {\n        const element = this.elements[elementName];\n        const { count, properties } = element;\n        const item = createEmptyItem(properties);\n        const parseFn = createParseFn(properties, this.littleEndian);\n        const callback = elementCallback(element) ?? (() => {\n        });\n        for (let index = 0; index < count; index++) {\n          offset = parseFn(data, offset, item);\n          callback(index, item);\n        }\n      }\n    }\n    // Parse all the Gsplat data in the PLY file in go, invoking the given\n    // callbacks for each Gsplat.\n    parseSplats(splatCallback, shCallback) {\n      if (this.elements.vertex == null) {\n        throw new Error(\"No vertex element found\");\n      }\n      let isSuperSplat = false;\n      const ssChunks = [];\n      let numSh = 0;\n      let sh1Props = [];\n      let sh2Props = [];\n      let sh3Props = [];\n      let sh1 = void 0;\n      let sh2 = void 0;\n      let sh3 = void 0;\n      function prepareSh() {\n        const num_f_rest = NUM_SH_TO_NUM_F_REST[numSh];\n        sh1Props = new Array(3).fill(null).flatMap((_, k) => [0, 1, 2].map((_2, d) => k + d * num_f_rest / 3));\n        sh2Props = new Array(5).fill(null).flatMap(\n          (_, k) => [0, 1, 2].map((_2, d) => 3 + k + d * num_f_rest / 3)\n        );\n        sh3Props = new Array(7).fill(null).flatMap(\n          (_, k) => [0, 1, 2].map((_2, d) => 8 + k + d * num_f_rest / 3)\n        );\n        sh1 = numSh >= 1 ? new Float32Array(3 * 3) : void 0;\n        sh2 = numSh >= 2 ? new Float32Array(5 * 3) : void 0;\n        sh3 = numSh >= 3 ? new Float32Array(7 * 3) : void 0;\n      }\n      function ssShCallback(index, item) {\n        if (!sh1) {\n          throw new Error(\"Missing sh1\");\n        }\n        const sh = item.f_rest;\n        for (let i2 = 0; i2 < sh1Props.length; i2++) {\n          sh1[i2] = sh[sh1Props[i2]] * 8 / 255 - 4;\n        }\n        if (sh2) {\n          for (let i2 = 0; i2 < sh2Props.length; i2++) {\n            sh2[i2] = sh[sh2Props[i2]] * 8 / 255 - 4;\n          }\n        }\n        if (sh3) {\n          for (let i2 = 0; i2 < sh3Props.length; i2++) {\n            sh3[i2] = sh[sh3Props[i2]] * 8 / 255 - 4;\n          }\n        }\n        shCallback == null ? void 0 : shCallback(index, sh1, sh2, sh3);\n      }\n      function initSuperSplat(element) {\n        const {\n          min_x,\n          min_y,\n          min_z,\n          max_x,\n          max_y,\n          max_z,\n          min_scale_x,\n          min_scale_y,\n          min_scale_z,\n          max_scale_x,\n          max_scale_y,\n          max_scale_z\n        } = element.properties;\n        if (!min_x || !min_y || !min_z || !max_x || !max_y || !max_z || !min_scale_x || !min_scale_y || !min_scale_z || !max_scale_x || !max_scale_y || !max_scale_z) {\n          throw new Error(\"Missing PLY chunk properties\");\n        }\n        isSuperSplat = true;\n        return (index, item) => {\n          const {\n            min_x: min_x2,\n            min_y: min_y2,\n            min_z: min_z2,\n            max_x: max_x2,\n            max_y: max_y2,\n            max_z: max_z2,\n            min_scale_x: min_scale_x2,\n            min_scale_y: min_scale_y2,\n            min_scale_z: min_scale_z2,\n            max_scale_x: max_scale_x2,\n            max_scale_y: max_scale_y2,\n            max_scale_z: max_scale_z2,\n            min_r,\n            min_g,\n            min_b,\n            max_r,\n            max_g,\n            max_b\n          } = item;\n          ssChunks.push({\n            min_x: min_x2,\n            min_y: min_y2,\n            min_z: min_z2,\n            max_x: max_x2,\n            max_y: max_y2,\n            max_z: max_z2,\n            min_scale_x: min_scale_x2,\n            min_scale_y: min_scale_y2,\n            min_scale_z: min_scale_z2,\n            max_scale_x: max_scale_x2,\n            max_scale_y: max_scale_y2,\n            max_scale_z: max_scale_z2,\n            min_r,\n            min_g,\n            min_b,\n            max_r,\n            max_g,\n            max_b\n          });\n        };\n      }\n      function decodeSuperSplat(element) {\n        if (shCallback && element.name === \"sh\") {\n          numSh = getNumSh(element.properties);\n          prepareSh();\n          return ssShCallback;\n        }\n        if (element.name !== \"vertex\") {\n          return null;\n        }\n        const { packed_position, packed_rotation, packed_scale, packed_color } = element.properties;\n        if (!packed_position || !packed_rotation || !packed_scale || !packed_color) {\n          throw new Error(\n            \"Missing PLY properties: packed_position, packed_rotation, packed_scale, packed_color\"\n          );\n        }\n        const SQRT2 = Math.sqrt(2);\n        return (index, item) => {\n          const chunk = ssChunks[index >>> 8];\n          if (chunk == null) {\n            throw new Error(\"Missing PLY chunk\");\n          }\n          const {\n            min_x,\n            min_y,\n            min_z,\n            max_x,\n            max_y,\n            max_z,\n            min_scale_x,\n            min_scale_y,\n            min_scale_z,\n            max_scale_x,\n            max_scale_y,\n            max_scale_z,\n            min_r,\n            min_g,\n            min_b,\n            max_r,\n            max_g,\n            max_b\n          } = chunk;\n          const { packed_position: packed_position2, packed_rotation: packed_rotation2, packed_scale: packed_scale2, packed_color: packed_color2 } = item;\n          const x2 = (packed_position2 >>> 21 & 2047) / 2047 * (max_x - min_x) + min_x;\n          const y = (packed_position2 >>> 11 & 1023) / 1023 * (max_y - min_y) + min_y;\n          const z = (packed_position2 & 2047) / 2047 * (max_z - min_z) + min_z;\n          const r0 = ((packed_rotation2 >>> 20 & 1023) / 1023 - 0.5) * SQRT2;\n          const r1 = ((packed_rotation2 >>> 10 & 1023) / 1023 - 0.5) * SQRT2;\n          const r2 = ((packed_rotation2 & 1023) / 1023 - 0.5) * SQRT2;\n          const rr = Math.sqrt(Math.max(0, 1 - r0 * r0 - r1 * r1 - r2 * r2));\n          const rOrder = packed_rotation2 >>> 30;\n          const quatX = rOrder === 0 ? r0 : rOrder === 1 ? rr : r1;\n          const quatY = rOrder <= 1 ? r1 : rOrder === 2 ? rr : r2;\n          const quatZ = rOrder <= 2 ? r2 : rr;\n          const quatW = rOrder === 0 ? rr : r0;\n          const scaleX = Math.exp(\n            (packed_scale2 >>> 21 & 2047) / 2047 * (max_scale_x - min_scale_x) + min_scale_x\n          );\n          const scaleY = Math.exp(\n            (packed_scale2 >>> 11 & 1023) / 1023 * (max_scale_y - min_scale_y) + min_scale_y\n          );\n          const scaleZ = Math.exp(\n            (packed_scale2 & 2047) / 2047 * (max_scale_z - min_scale_z) + min_scale_z\n          );\n          const r = (packed_color2 >>> 24 & 255) / 255 * ((max_r ?? 1) - (min_r ?? 0)) + (min_r ?? 0);\n          const g = (packed_color2 >>> 16 & 255) / 255 * ((max_g ?? 1) - (min_g ?? 0)) + (min_g ?? 0);\n          const b = (packed_color2 >>> 8 & 255) / 255 * ((max_b ?? 1) - (min_b ?? 0)) + (min_b ?? 0);\n          const opacity = (packed_color2 & 255) / 255;\n          splatCallback(\n            index,\n            x2,\n            y,\n            z,\n            scaleX,\n            scaleY,\n            scaleZ,\n            quatX,\n            quatY,\n            quatZ,\n            quatW,\n            opacity,\n            r,\n            g,\n            b\n          );\n        };\n      }\n      const elementCallback = (element) => {\n        if (element.name === \"chunk\") {\n          return initSuperSplat(element);\n        }\n        if (isSuperSplat) {\n          return decodeSuperSplat(element);\n        }\n        if (element.name !== \"vertex\") {\n          return null;\n        }\n        const {\n          x: x2,\n          y,\n          z,\n          scale_0,\n          scale_1,\n          scale_2,\n          rot_0,\n          rot_1,\n          rot_2,\n          rot_3,\n          opacity,\n          f_dc_0,\n          f_dc_1,\n          f_dc_2,\n          red,\n          green,\n          blue,\n          alpha\n        } = element.properties;\n        if (!x2 || !y || !z) {\n          throw new Error(\"Missing PLY properties: x, y, z\");\n        }\n        const hasScales = scale_0 && scale_1 && scale_2;\n        const hasRots = rot_0 && rot_1 && rot_2 && rot_3;\n        const alphaDiv = alpha != null ? FIELD_SCALE[alpha.type] : 1;\n        const redDiv = red != null ? FIELD_SCALE[red.type] : 1;\n        const greenDiv = green != null ? FIELD_SCALE[green.type] : 1;\n        const blueDiv = blue != null ? FIELD_SCALE[blue.type] : 1;\n        numSh = getNumSh(element.properties);\n        prepareSh();\n        return (index, item) => {\n          const scaleX = hasScales ? Math.exp(item.scale_0) : _PlyReader.defaultPointScale;\n          const scaleY = hasScales ? Math.exp(item.scale_1) : _PlyReader.defaultPointScale;\n          const scaleZ = hasScales ? Math.exp(item.scale_2) : _PlyReader.defaultPointScale;\n          const quatX = hasRots ? item.rot_1 : 0;\n          const quatY = hasRots ? item.rot_2 : 0;\n          const quatZ = hasRots ? item.rot_3 : 0;\n          const quatW = hasRots ? item.rot_0 : 1;\n          const op = opacity != null ? 1 / (1 + Math.exp(-item.opacity)) : alpha != null ? item.alpha / alphaDiv : 1;\n          const r = f_dc_0 != null ? item.f_dc_0 * SH_C0$1 + 0.5 : red != null ? item.red / redDiv : 1;\n          const g = f_dc_1 != null ? item.f_dc_1 * SH_C0$1 + 0.5 : green != null ? item.green / greenDiv : 1;\n          const b = f_dc_2 != null ? item.f_dc_2 * SH_C0$1 + 0.5 : blue != null ? item.blue / blueDiv : 1;\n          splatCallback(\n            index,\n            item.x,\n            item.y,\n            item.z,\n            scaleX,\n            scaleY,\n            scaleZ,\n            quatX,\n            quatY,\n            quatZ,\n            quatW,\n            op,\n            r,\n            g,\n            b\n          );\n          if (shCallback && sh1) {\n            const sh = item.f_rest;\n            if (sh1) {\n              for (let i2 = 0; i2 < sh1Props.length; i2++) {\n                sh1[i2] = sh[sh1Props[i2]];\n              }\n            }\n            if (sh2) {\n              for (let i2 = 0; i2 < sh2Props.length; i2++) {\n                sh2[i2] = sh[sh2Props[i2]];\n              }\n            }\n            if (sh3) {\n              for (let i2 = 0; i2 < sh3Props.length; i2++) {\n                sh3[i2] = sh[sh3Props[i2]];\n              }\n            }\n            shCallback(index, sh1, sh2, sh3);\n          }\n        };\n      };\n      this.parseData(elementCallback);\n    }\n    // Inject RGBA values into original PLY file, which can be used to modify\n    // the color/opacity of the Gsplats and write out the modified PLY file.\n    injectRgba(rgba) {\n      let offset = 0;\n      const data = this.data;\n      if (data == null) {\n        throw new Error(\"No parsed data\");\n      }\n      if (rgba.length !== this.numSplats * 4) {\n        throw new Error(\"Invalid RGBA array length\");\n      }\n      for (const elementName in this.elements) {\n        const element = this.elements[elementName];\n        const { count, properties } = element;\n        const parsers = [];\n        let rgbaOffset = 0;\n        const isVertex = elementName === \"vertex\";\n        if (isVertex) {\n          for (const name of [\"opacity\", \"f_dc_0\", \"f_dc_1\", \"f_dc_2\"]) {\n            if (!properties[name] || properties[name].type !== \"float\") {\n              throw new Error(`Can't injectRgba due to property: ${name}`);\n            }\n          }\n        }\n        for (const [propertyName, property] of Object.entries(properties)) {\n          if (!property.isList) {\n            if (isVertex) {\n              if (propertyName === \"f_dc_0\" || propertyName === \"f_dc_1\" || propertyName === \"f_dc_2\") {\n                const component = Number.parseInt(\n                  propertyName.slice(\"f_dc_\".length)\n                );\n                parsers.push(() => {\n                  const value = (rgba[rgbaOffset + component] / 255 - 0.5) / SH_C0$1;\n                  SET_FIELD[property.type](\n                    data,\n                    offset,\n                    this.littleEndian,\n                    value\n                  );\n                });\n              } else if (propertyName === \"opacity\") {\n                parsers.push(() => {\n                  const value = Math.max(\n                    -100,\n                    Math.min(\n                      100,\n                      -Math.log(1 / (rgba[rgbaOffset + 3] / 255) - 1)\n                    )\n                  );\n                  SET_FIELD[property.type](\n                    data,\n                    offset,\n                    this.littleEndian,\n                    value\n                  );\n                });\n              }\n            }\n            parsers.push(() => {\n              offset += FIELD_BYTES[property.type];\n            });\n          } else {\n            parsers.push(() => {\n              const length = PARSE_FIELD[property.countType](\n                data,\n                offset,\n                this.littleEndian\n              );\n              offset += FIELD_BYTES[property.countType];\n              offset += length * FIELD_BYTES[property.type];\n            });\n          }\n        }\n        for (let index = 0; index < count; index++) {\n          for (const parser of parsers) {\n            parser();\n          }\n          if (isVertex) {\n            rgbaOffset += 4;\n          }\n        }\n      }\n    }\n  };\n  _PlyReader.defaultPointScale = 1e-3;\n  let PlyReader = _PlyReader;\n  const SH_C0$1 = 0.28209479177387814;\n  const PARSE_FIELD = {\n    char: (data, offset, littleEndian) => {\n      return data.getInt8(offset);\n    },\n    uchar: (data, offset, littleEndian) => {\n      return data.getUint8(offset);\n    },\n    short: (data, offset, littleEndian) => {\n      return data.getInt16(offset, littleEndian);\n    },\n    ushort: (data, offset, littleEndian) => {\n      return data.getUint16(offset, littleEndian);\n    },\n    int: (data, offset, littleEndian) => {\n      return data.getInt32(offset, littleEndian);\n    },\n    uint: (data, offset, littleEndian) => {\n      return data.getUint32(offset, littleEndian);\n    },\n    float: (data, offset, littleEndian) => {\n      return data.getFloat32(offset, littleEndian);\n    },\n    double: (data, offset, littleEndian) => {\n      return data.getFloat64(offset, littleEndian);\n    }\n  };\n  const SET_FIELD = {\n    char: (data, offset, littleEndian, value) => {\n      data.setInt8(offset, value);\n    },\n    uchar: (data, offset, littleEndian, value) => {\n      data.setUint8(offset, value);\n    },\n    short: (data, offset, littleEndian, value) => {\n      data.setInt16(offset, value, littleEndian);\n    },\n    ushort: (data, offset, littleEndian, value) => {\n      data.setUint16(offset, value, littleEndian);\n    },\n    int: (data, offset, littleEndian, value) => {\n      data.setInt32(offset, value, littleEndian);\n    },\n    uint: (data, offset, littleEndian, value) => {\n      data.setUint32(offset, value, littleEndian);\n    },\n    float: (data, offset, littleEndian, value) => {\n      data.setFloat32(offset, value, littleEndian);\n    },\n    double: (data, offset, littleEndian, value) => {\n      data.setFloat64(offset, value, littleEndian);\n    }\n  };\n  const FIELD_BYTES = {\n    char: 1,\n    uchar: 1,\n    short: 2,\n    ushort: 2,\n    int: 4,\n    uint: 4,\n    float: 4,\n    double: 8\n  };\n  const FIELD_SCALE = {\n    char: 127,\n    uchar: 255,\n    short: 32767,\n    ushort: 65535,\n    int: 2147483647,\n    uint: 4294967295,\n    float: 1,\n    double: 1\n  };\n  const NUM_F_REST_TO_NUM_SH = {\n    0: 0,\n    9: 1,\n    24: 2,\n    45: 3\n  };\n  const NUM_SH_TO_NUM_F_REST = {\n    0: 0,\n    1: 9,\n    2: 24,\n    3: 45\n  };\n  const F_REST_REGEX = /^f_rest_([0-9]{1,2})$/;\n  function createEmptyItem(properties) {\n    const item = {};\n    for (const [propertyName, property] of Object.entries(properties)) {\n      if (F_REST_REGEX.test(propertyName)) {\n        item.f_rest = new Array(getNumSh(properties));\n      } else {\n        item[propertyName] = property.isList ? [] : 0;\n      }\n    }\n    return item;\n  }\n  function createParseFn(properties, littleEndian) {\n    if (safeToCompile(properties)) {\n      return createCompiledParserFn(properties, littleEndian);\n    }\n    return createDynamicParserFn(properties, littleEndian);\n  }\n  const UNSAFE_EVAL_ALLOWED = (() => {\n    try {\n      new Function(\"return 42;\");\n    } catch (e) {\n      return false;\n    }\n    return true;\n  })();\n  const PROPERTY_NAME_REGEX = /^[a-zA-Z0-9_]+$/;\n  function safeToCompile(properties) {\n    if (!UNSAFE_EVAL_ALLOWED) {\n      return false;\n    }\n    for (const [propertyName, property] of Object.entries(properties)) {\n      if (!PROPERTY_NAME_REGEX.test(propertyName)) {\n        return false;\n      }\n      if (property.isList && !PLY_PROPERTY_TYPES.includes(property.countType)) {\n        return false;\n      }\n      if (!PLY_PROPERTY_TYPES.includes(property.type)) {\n        return false;\n      }\n    }\n    return true;\n  }\n  function createCompiledParserFn(properties, littleEndian) {\n    const parserSrc = [\"let list;\"];\n    for (const [propertyName, property] of Object.entries(properties)) {\n      const fRestMatch = propertyName.match(F_REST_REGEX);\n      if (fRestMatch) {\n        const fRestIndex = +fRestMatch[1];\n        parserSrc.push(\n          /*js*/\n          `\n        item.f_rest[${fRestIndex}] = PARSE_FIELD['${property.type}'](data, offset, ${littleEndian});\n        offset += ${FIELD_BYTES[property.type]};\n      `\n        );\n      } else if (!property.isList) {\n        parserSrc.push(\n          /*js*/\n          `\n        item['${propertyName}'] = PARSE_FIELD['${property.type}'](data, offset, ${littleEndian});\n        offset += ${FIELD_BYTES[property.type]};\n      `\n        );\n      } else {\n        parserSrc.push(\n          /*js*/\n          `\n        list = item['${propertyName}'];\n        list.length = PARSE_FIELD['${property.countType}'](data, offset, ${littleEndian});\n        offset += ${FIELD_BYTES[property.countType]};\n        for (let i = 0; i < list.length; i++) {\n          list[i] = PARSE_FIELD['${property.type}'](data, offset, ${littleEndian});\n          offset += ${FIELD_BYTES[property.type]};\n        }\n      `\n        );\n      }\n    }\n    parserSrc.push(\"return offset;\");\n    const fn = new Function(\n      \"data\",\n      \"offset\",\n      \"item\",\n      \"PARSE_FIELD\",\n      parserSrc.join(\"\\n\")\n    );\n    return (data, offset, item) => fn(data, offset, item, PARSE_FIELD);\n  }\n  function createDynamicParserFn(properties, littleEndian) {\n    const parsers = [];\n    for (const [propertyName, property] of Object.entries(properties)) {\n      const fRestMatch = propertyName.match(F_REST_REGEX);\n      if (fRestMatch) {\n        const fRestIndex = +fRestMatch[1];\n        parsers.push(\n          (data, offset, item) => {\n            item.f_rest[fRestIndex] = PARSE_FIELD[property.type](\n              data,\n              offset,\n              littleEndian\n            );\n            return offset + FIELD_BYTES[property.type];\n          }\n        );\n      } else if (!property.isList) {\n        parsers.push(\n          (data, offset, item) => {\n            item[propertyName] = PARSE_FIELD[property.type](\n              data,\n              offset,\n              littleEndian\n            );\n            return offset + FIELD_BYTES[property.type];\n          }\n        );\n      } else {\n        parsers.push(\n          (data, offset, item) => {\n            const list = item[propertyName];\n            list.length = PARSE_FIELD[property.countType](\n              data,\n              offset,\n              littleEndian\n            );\n            let currentOffset = offset + FIELD_BYTES[property.countType];\n            for (let i2 = 0; i2 < list.length; i2++) {\n              list[i2] = PARSE_FIELD[property.type](\n                data,\n                currentOffset,\n                littleEndian\n              );\n              currentOffset += FIELD_BYTES[property.type];\n            }\n            return currentOffset;\n          }\n        );\n      }\n    }\n    return (data, offset, item) => {\n      let currentOffset = offset;\n      for (let parserIndex = 0; parserIndex < parsers.length; parserIndex++) {\n        currentOffset = parsers[parserIndex](data, currentOffset, item);\n      }\n      return currentOffset;\n    };\n  }\n  function getNumSh(properties) {\n    let num_f_rest = 0;\n    while (properties[`f_rest_${num_f_rest}`]) {\n      num_f_rest += 1;\n    }\n    const numSh = NUM_F_REST_TO_NUM_SH[num_f_rest];\n    if (numSh == null) {\n      throw new Error(`Unsupported number of SH coefficients: ${num_f_rest}`);\n    }\n    return numSh;\n  }\n  var SplatFileType = /* @__PURE__ */ ((SplatFileType2) => {\n    SplatFileType2[\"PLY\"] = \"ply\";\n    SplatFileType2[\"SPZ\"] = \"spz\";\n    SplatFileType2[\"SPLAT\"] = \"splat\";\n    SplatFileType2[\"KSPLAT\"] = \"ksplat\";\n    SplatFileType2[\"PCSOGS\"] = \"pcsogs\";\n    SplatFileType2[\"PCSOGSZIP\"] = \"pcsogszip\";\n    return SplatFileType2;\n  })(SplatFileType || {});\n  function getSplatFileType(fileBytes) {\n    const view = new DataView(fileBytes.buffer);\n    if ((view.getUint32(0, true) & 16777215) === 7957616) {\n      return \"ply\";\n    }\n    if ((view.getUint32(0, true) & 16777215) === 559903) {\n      const header = decompressPartialGzip(fileBytes, 4);\n      const gView = new DataView(header.buffer);\n      if (gView.getUint32(0, true) === 1347635022) {\n        return \"spz\";\n      }\n      return void 0;\n    }\n    if (view.getUint32(0, true) === 67324752) {\n      if (tryPcSogsZip(fileBytes)) {\n        return \"pcsogszip\";\n      }\n      return void 0;\n    }\n    return void 0;\n  }\n  function getFileExtension(pathOrUrl) {\n    const noTrailing = pathOrUrl.split(/[?#]/, 1)[0];\n    const lastSlash = Math.max(\n      noTrailing.lastIndexOf(\"/\"),\n      noTrailing.lastIndexOf(\"\\\\\")\n    );\n    const filename = noTrailing.slice(lastSlash + 1);\n    const lastDot = filename.lastIndexOf(\".\");\n    if (lastDot <= 0 || lastDot === filename.length - 1) {\n      return \"\";\n    }\n    return filename.slice(lastDot + 1).toLowerCase();\n  }\n  function getSplatFileTypeFromPath(pathOrUrl) {\n    const extension = getFileExtension(pathOrUrl);\n    if (extension === \"ply\") {\n      return \"ply\";\n    }\n    if (extension === \"spz\") {\n      return \"spz\";\n    }\n    if (extension === \"splat\") {\n      return \"splat\";\n    }\n    if (extension === \"ksplat\") {\n      return \"ksplat\";\n    }\n    if (extension === \"sog\") {\n      return \"pcsogszip\";\n    }\n    return void 0;\n  }\n  function tryPcSogs(input) {\n    try {\n      let text;\n      if (typeof input === \"string\") {\n        text = input;\n      } else {\n        const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;\n        if (fileBytes.length > 65536) {\n          return void 0;\n        }\n        text = new TextDecoder().decode(fileBytes);\n      }\n      const json = JSON.parse(text);\n      if (!json || typeof json !== \"object\" || Array.isArray(json)) {\n        return void 0;\n      }\n      const isVersion2 = json.version === 2;\n      for (const key of [\"means\", \"scales\", \"quats\", \"sh0\"]) {\n        if (!json[key] || typeof json[key] !== \"object\" || Array.isArray(json[key])) {\n          return void 0;\n        }\n        if (isVersion2) {\n          if (!json[key].files) {\n            return void 0;\n          }\n          if ((key === \"scales\" || key === \"sh0\") && !json[key].codebook) {\n            return void 0;\n          }\n          if (key === \"means\" && (!json[key].mins || !json[key].maxs)) {\n            return void 0;\n          }\n        } else {\n          if (!json[key].shape || !json[key].files) {\n            return void 0;\n          }\n          if (key !== \"quats\" && (!json[key].mins || !json[key].maxs)) {\n            return void 0;\n          }\n        }\n      }\n      return json;\n    } catch {\n      return void 0;\n    }\n  }\n  function tryPcSogsZip(input) {\n    try {\n      const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;\n      let metaFilename = null;\n      const unzipped = unzipSync(fileBytes, {\n        filter: ({ name }) => {\n          const filename = name.split(/[\\\\/]/).pop();\n          if (filename === \"meta.json\") {\n            metaFilename = name;\n            return true;\n          }\n          return false;\n        }\n      });\n      if (!metaFilename) {\n        return void 0;\n      }\n      const json = tryPcSogs(unzipped[metaFilename]);\n      if (!json) {\n        return void 0;\n      }\n      return { name: metaFilename, json };\n    } catch {\n      return void 0;\n    }\n  }\n  class SplatData {\n    constructor({ maxSplats = 1 } = {}) {\n      this.numSplats = 0;\n      this.maxSplats = getTextureSize(maxSplats).maxSplats;\n      this.centers = new Float32Array(this.maxSplats * 3);\n      this.scales = new Float32Array(this.maxSplats * 3);\n      this.quaternions = new Float32Array(this.maxSplats * 4);\n      this.opacities = new Float32Array(this.maxSplats);\n      this.colors = new Float32Array(this.maxSplats * 3);\n    }\n    pushSplat() {\n      const index = this.numSplats;\n      this.ensureIndex(index);\n      this.numSplats += 1;\n      return index;\n    }\n    unpushSplat(index) {\n      if (index === this.numSplats - 1) {\n        this.numSplats -= 1;\n      } else {\n        throw new Error(\"Cannot unpush splat from non-last position\");\n      }\n    }\n    ensureCapacity(numSplats) {\n      if (numSplats > this.maxSplats) {\n        const targetSplats = Math.max(numSplats, this.maxSplats * 2);\n        const newCenters = new Float32Array(targetSplats * 3);\n        const newScales = new Float32Array(targetSplats * 3);\n        const newQuaternions = new Float32Array(targetSplats * 4);\n        const newOpacities = new Float32Array(targetSplats);\n        const newColors = new Float32Array(targetSplats * 3);\n        newCenters.set(this.centers);\n        newScales.set(this.scales);\n        newQuaternions.set(this.quaternions);\n        newOpacities.set(this.opacities);\n        newColors.set(this.colors);\n        this.centers = newCenters;\n        this.scales = newScales;\n        this.quaternions = newQuaternions;\n        this.opacities = newOpacities;\n        this.colors = newColors;\n        if (this.sh1) {\n          const newSh1 = new Float32Array(targetSplats * 9);\n          newSh1.set(this.sh1);\n          this.sh1 = newSh1;\n        }\n        if (this.sh2) {\n          const newSh2 = new Float32Array(targetSplats * 15);\n          newSh2.set(this.sh2);\n          this.sh2 = newSh2;\n        }\n        if (this.sh3) {\n          const newSh3 = new Float32Array(targetSplats * 21);\n          newSh3.set(this.sh3);\n          this.sh3 = newSh3;\n        }\n        this.maxSplats = targetSplats;\n      }\n    }\n    ensureIndex(index) {\n      this.ensureCapacity(index + 1);\n    }\n    setCenter(index, x2, y, z) {\n      this.centers[index * 3] = x2;\n      this.centers[index * 3 + 1] = y;\n      this.centers[index * 3 + 2] = z;\n    }\n    setScale(index, scaleX, scaleY, scaleZ) {\n      this.scales[index * 3] = scaleX;\n      this.scales[index * 3 + 1] = scaleY;\n      this.scales[index * 3 + 2] = scaleZ;\n    }\n    setQuaternion(index, x2, y, z, w) {\n      this.quaternions[index * 4] = x2;\n      this.quaternions[index * 4 + 1] = y;\n      this.quaternions[index * 4 + 2] = z;\n      this.quaternions[index * 4 + 3] = w;\n    }\n    setOpacity(index, opacity) {\n      this.opacities[index] = opacity;\n    }\n    setColor(index, r, g, b) {\n      this.colors[index * 3] = r;\n      this.colors[index * 3 + 1] = g;\n      this.colors[index * 3 + 2] = b;\n    }\n    setSh1(index, sh1) {\n      if (!this.sh1) {\n        this.sh1 = new Float32Array(this.maxSplats * 9);\n      }\n      for (let j = 0; j < 9; ++j) {\n        this.sh1[index * 9 + j] = sh1[j];\n      }\n    }\n    setSh2(index, sh2) {\n      if (!this.sh2) {\n        this.sh2 = new Float32Array(this.maxSplats * 15);\n      }\n      for (let j = 0; j < 15; ++j) {\n        this.sh2[index * 15 + j] = sh2[j];\n      }\n    }\n    setSh3(index, sh3) {\n      if (!this.sh3) {\n        this.sh3 = new Float32Array(this.maxSplats * 21);\n      }\n      for (let j = 0; j < 21; ++j) {\n        this.sh3[index * 21 + j] = sh3[j];\n      }\n    }\n  }\n  async function unpackPcSogs(json, extraFiles, splatEncoding) {\n    const isVersion2 = \"version\" in json;\n    if (!isVersion2 && json.quats.encoding !== \"quaternion_packed\") {\n      throw new Error(\"Unsupported quaternion encoding\");\n    }\n    const numSplats = isVersion2 ? json.count : json.means.shape[0];\n    const maxSplats = computeMaxSplats(numSplats);\n    const packedArray = new Uint32Array(maxSplats * 4);\n    const extra = {};\n    const meansPromise = Promise.all([\n      decodeImageRgba(extraFiles[json.means.files[0]]),\n      decodeImageRgba(extraFiles[json.means.files[1]])\n    ]).then((means) => {\n      for (let i2 = 0; i2 < numSplats; ++i2) {\n        const i4 = i2 * 4;\n        const fx = (means[0][i4 + 0] + (means[1][i4 + 0] << 8)) / 65535;\n        const fy = (means[0][i4 + 1] + (means[1][i4 + 1] << 8)) / 65535;\n        const fz = (means[0][i4 + 2] + (means[1][i4 + 2] << 8)) / 65535;\n        let x2 = json.means.mins[0] + (json.means.maxs[0] - json.means.mins[0]) * fx;\n        let y = json.means.mins[1] + (json.means.maxs[1] - json.means.mins[1]) * fy;\n        let z = json.means.mins[2] + (json.means.maxs[2] - json.means.mins[2]) * fz;\n        x2 = Math.sign(x2) * (Math.exp(Math.abs(x2)) - 1);\n        y = Math.sign(y) * (Math.exp(Math.abs(y)) - 1);\n        z = Math.sign(z) * (Math.exp(Math.abs(z)) - 1);\n        setPackedSplatCenter(packedArray, i2, x2, y, z);\n      }\n    });\n    const scalesPromise = decodeImageRgba(extraFiles[json.scales.files[0]]).then(\n      (scales) => {\n        let xLookup;\n        let yLookup;\n        let zLookup;\n        if (isVersion2) {\n          xLookup = yLookup = zLookup = json.scales.codebook.map((x2) => Math.exp(x2));\n        } else {\n          xLookup = new Array(256).fill(0).map(\n            (_, i2) => json.scales.mins[0] + (json.scales.maxs[0] - json.scales.mins[0]) * (i2 / 255)\n          ).map((x2) => Math.exp(x2));\n          yLookup = new Array(256).fill(0).map(\n            (_, i2) => json.scales.mins[1] + (json.scales.maxs[1] - json.scales.mins[1]) * (i2 / 255)\n          ).map((x2) => Math.exp(x2));\n          zLookup = new Array(256).fill(0).map(\n            (_, i2) => json.scales.mins[2] + (json.scales.maxs[2] - json.scales.mins[2]) * (i2 / 255)\n          ).map((x2) => Math.exp(x2));\n        }\n        for (let i2 = 0; i2 < numSplats; ++i2) {\n          const i4 = i2 * 4;\n          setPackedSplatScales(\n            packedArray,\n            i2,\n            xLookup[scales[i4 + 0]],\n            yLookup[scales[i4 + 1]],\n            zLookup[scales[i4 + 2]],\n            splatEncoding\n          );\n        }\n      }\n    );\n    const quatsPromise = decodeImageRgba(extraFiles[json.quats.files[0]]).then(\n      (quats) => {\n        const SQRT2 = Math.sqrt(2);\n        const lookup = new Array(256).fill(0).map((_, i2) => (i2 / 255 - 0.5) * SQRT2);\n        for (let i2 = 0; i2 < numSplats; ++i2) {\n          const i4 = i2 * 4;\n          const r0 = lookup[quats[i4 + 0]];\n          const r1 = lookup[quats[i4 + 1]];\n          const r2 = lookup[quats[i4 + 2]];\n          const rr = Math.sqrt(Math.max(0, 1 - r0 * r0 - r1 * r1 - r2 * r2));\n          const rOrder = quats[i4 + 3] - 252;\n          const quatX = rOrder === 0 ? r0 : rOrder === 1 ? rr : r1;\n          const quatY = rOrder <= 1 ? r1 : rOrder === 2 ? rr : r2;\n          const quatZ = rOrder <= 2 ? r2 : rr;\n          const quatW = rOrder === 0 ? rr : r0;\n          setPackedSplatQuat(packedArray, i2, quatX, quatY, quatZ, quatW);\n        }\n      }\n    );\n    const sh0Promise = decodeImageRgba(extraFiles[json.sh0.files[0]]).then(\n      (sh0) => {\n        const SH_C02 = 0.28209479177387814;\n        let rLookup;\n        let gLookup;\n        let bLookup;\n        let aLookup;\n        if (isVersion2) {\n          rLookup = gLookup = bLookup = json.sh0.codebook.map((x2) => SH_C02 * x2 + 0.5);\n          aLookup = new Array(256).fill(0).map((_, i2) => i2 / 255);\n        } else {\n          rLookup = new Array(256).fill(0).map(\n            (_, i2) => json.sh0.mins[0] + (json.sh0.maxs[0] - json.sh0.mins[0]) * (i2 / 255)\n          ).map((x2) => SH_C02 * x2 + 0.5);\n          gLookup = new Array(256).fill(0).map(\n            (_, i2) => json.sh0.mins[1] + (json.sh0.maxs[1] - json.sh0.mins[1]) * (i2 / 255)\n          ).map((x2) => SH_C02 * x2 + 0.5);\n          bLookup = new Array(256).fill(0).map(\n            (_, i2) => json.sh0.mins[2] + (json.sh0.maxs[2] - json.sh0.mins[2]) * (i2 / 255)\n          ).map((x2) => SH_C02 * x2 + 0.5);\n          aLookup = new Array(256).fill(0).map(\n            (_, i2) => json.sh0.mins[3] + (json.sh0.maxs[3] - json.sh0.mins[3]) * (i2 / 255)\n          ).map((x2) => 1 / (1 + Math.exp(-x2)));\n        }\n        for (let i2 = 0; i2 < numSplats; ++i2) {\n          const i4 = i2 * 4;\n          setPackedSplatRgba(\n            packedArray,\n            i2,\n            rLookup[sh0[i4 + 0]],\n            gLookup[sh0[i4 + 1]],\n            bLookup[sh0[i4 + 2]],\n            aLookup[sh0[i4 + 3]],\n            splatEncoding\n          );\n        }\n      }\n    );\n    const promises = [meansPromise, scalesPromise, quatsPromise, sh0Promise];\n    if (json.shN) {\n      const useSH3 = isVersion2 ? json.shN.bands >= 3 : json.shN.shape[1] >= 48 - 3;\n      const useSH2 = isVersion2 ? json.shN.bands >= 2 : json.shN.shape[1] >= 27 - 3;\n      const useSH1 = isVersion2 ? json.shN.bands >= 1 : json.shN.shape[1] >= 12 - 3;\n      if (useSH1) extra.sh1 = new Uint32Array(numSplats * 2);\n      if (useSH2) extra.sh2 = new Uint32Array(numSplats * 4);\n      if (useSH3) extra.sh3 = new Uint32Array(numSplats * 4);\n      const sh1 = new Float32Array(9);\n      const sh2 = new Float32Array(15);\n      const sh3 = new Float32Array(21);\n      const shN = json.shN;\n      const shNPromise = Promise.all([\n        decodeImage(extraFiles[json.shN.files[0]]),\n        decodeImage(extraFiles[json.shN.files[1]])\n      ]).then(([centroids, labels]) => {\n        const lookup = \"codebook\" in shN ? shN.codebook : new Array(256).fill(0).map((_, i2) => shN.mins + (shN.maxs - shN.mins) * (i2 / 255));\n        for (let i2 = 0; i2 < numSplats; ++i2) {\n          const i4 = i2 * 4;\n          const label = labels.rgba[i4 + 0] + (labels.rgba[i4 + 1] << 8);\n          const col = (label & 63) * 15;\n          const row = label >>> 6;\n          const offset = row * centroids.width + col;\n          for (let d = 0; d < 3; ++d) {\n            if (useSH1) {\n              for (let k = 0; k < 3; ++k) {\n                sh1[k * 3 + d] = lookup[centroids.rgba[(offset + k) * 4 + d]];\n              }\n            }\n            if (useSH2) {\n              for (let k = 0; k < 5; ++k) {\n                sh2[k * 3 + d] = lookup[centroids.rgba[(offset + 3 + k) * 4 + d]];\n              }\n            }\n            if (useSH3) {\n              for (let k = 0; k < 7; ++k) {\n                sh3[k * 3 + d] = lookup[centroids.rgba[(offset + 8 + k) * 4 + d]];\n              }\n            }\n          }\n          if (useSH1)\n            encodeSh1Rgb(extra.sh1, i2, sh1, splatEncoding);\n          if (useSH2)\n            encodeSh2Rgb(extra.sh2, i2, sh2, splatEncoding);\n          if (useSH3)\n            encodeSh3Rgb(extra.sh3, i2, sh3, splatEncoding);\n        }\n      });\n      promises.push(shNPromise);\n    }\n    await Promise.all(promises);\n    return { packedArray, numSplats, extra };\n  }\n  let offscreenGlContext = null;\n  async function decodeImage(fileBytes) {\n    if (!offscreenGlContext) {\n      const canvas = new OffscreenCanvas(1, 1);\n      offscreenGlContext = canvas.getContext(\"webgl2\");\n      if (!offscreenGlContext) {\n        throw new Error(\"Failed to create WebGL2 context\");\n      }\n    }\n    const imageBlob = new Blob([fileBytes]);\n    const bitmap = await createImageBitmap(imageBlob, {\n      premultiplyAlpha: \"none\"\n    });\n    const gl = offscreenGlContext;\n    const texture = gl.createTexture();\n    gl.bindTexture(gl.TEXTURE_2D, texture);\n    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);\n    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\n    const framebuffer = gl.createFramebuffer();\n    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);\n    gl.framebufferTexture2D(\n      gl.FRAMEBUFFER,\n      gl.COLOR_ATTACHMENT0,\n      gl.TEXTURE_2D,\n      texture,\n      0\n    );\n    const data = new Uint8Array(bitmap.width * bitmap.height * 4);\n    gl.readPixels(\n      0,\n      0,\n      bitmap.width,\n      bitmap.height,\n      gl.RGBA,\n      gl.UNSIGNED_BYTE,\n      data\n    );\n    gl.deleteTexture(texture);\n    gl.deleteFramebuffer(framebuffer);\n    return { rgba: data, width: bitmap.width, height: bitmap.height };\n  }\n  async function decodeImageRgba(fileBytes) {\n    const { rgba } = await decodeImage(fileBytes);\n    return rgba;\n  }\n  async function unpackPcSogsZip(fileBytes, splatEncoding) {\n    var _a2;\n    const nameJson = tryPcSogsZip(fileBytes);\n    if (!nameJson) {\n      throw new Error(\"Invalid PC SOGS zip file\");\n    }\n    const { name, json } = nameJson;\n    const lastSlash = name.lastIndexOf(\"/\");\n    const lastBackslash = name.lastIndexOf(\"\\\\\");\n    const prefix = name.slice(0, Math.max(lastSlash, lastBackslash) + 1);\n    const fileMap = /* @__PURE__ */ new Map();\n    const refFiles = [\n      ...json.means.files,\n      ...json.scales.files,\n      ...json.quats.files,\n      ...json.sh0.files,\n      ...((_a2 = json.shN) == null ? void 0 : _a2.files) ?? []\n    ];\n    for (const file of refFiles) {\n      fileMap.set(prefix + file, file);\n    }\n    const unzipped = await new Promise(\n      (resolve, reject) => {\n        unzip(\n          fileBytes,\n          {\n            filter: ({ name: name2 }) => {\n              return fileMap.has(name2);\n            }\n          },\n          (err2, files) => {\n            if (err2) {\n              reject(err2);\n            } else {\n              resolve(files);\n            }\n          }\n        );\n      }\n    );\n    const extraFiles = {};\n    for (const [full, name2] of fileMap.entries()) {\n      extraFiles[name2] = unzipped[full];\n    }\n    return await unpackPcSogs(json, extraFiles, splatEncoding);\n  }\n  class SpzReader {\n    constructor({ fileBytes }) {\n      this.version = -1;\n      this.numSplats = 0;\n      this.shDegree = 0;\n      this.fractionalBits = 0;\n      this.flags = 0;\n      this.flagAntiAlias = false;\n      this.reserved = 0;\n      this.headerParsed = false;\n      this.parsed = false;\n      this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;\n      this.reader = new GunzipReader({ fileBytes: this.fileBytes });\n    }\n    async parseHeader() {\n      if (this.headerParsed) {\n        throw new Error(\"SPZ file header already parsed\");\n      }\n      const header = new DataView((await this.reader.read(16)).buffer);\n      if (header.getUint32(0, true) !== 1347635022) {\n        throw new Error(\"Invalid SPZ file\");\n      }\n      this.version = header.getUint32(4, true);\n      if (this.version < 1 || this.version > 3) {\n        throw new Error(`Unsupported SPZ version: ${this.version}`);\n      }\n      this.numSplats = header.getUint32(8, true);\n      this.shDegree = header.getUint8(12);\n      this.fractionalBits = header.getUint8(13);\n      this.flags = header.getUint8(14);\n      this.flagAntiAlias = (this.flags & 1) !== 0;\n      this.reserved = header.getUint8(15);\n      this.headerParsed = true;\n      this.parsed = false;\n    }\n    async parseSplats(centerCallback, alphaCallback, rgbCallback, scalesCallback, quatCallback, shCallback) {\n      if (!this.headerParsed) {\n        throw new Error(\"SPZ file header must be parsed first\");\n      }\n      if (this.parsed) {\n        throw new Error(\"SPZ file already parsed\");\n      }\n      this.parsed = true;\n      if (this.version === 1) {\n        const centerBytes = await this.reader.read(this.numSplats * 3 * 2);\n        const centerUint16 = new Uint16Array(centerBytes.buffer);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i3 = i2 * 3;\n          const x2 = fromHalf(centerUint16[i3]);\n          const y = fromHalf(centerUint16[i3 + 1]);\n          const z = fromHalf(centerUint16[i3 + 2]);\n          centerCallback == null ? void 0 : centerCallback(i2, x2, y, z);\n        }\n      } else if (this.version === 2 || this.version === 3) {\n        const fixed = 1 << this.fractionalBits;\n        const centerBytes = await this.reader.read(this.numSplats * 3 * 3);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i9 = i2 * 9;\n          const x2 = ((centerBytes[i9 + 2] << 24 | centerBytes[i9 + 1] << 16 | centerBytes[i9] << 8) >> 8) / fixed;\n          const y = ((centerBytes[i9 + 5] << 24 | centerBytes[i9 + 4] << 16 | centerBytes[i9 + 3] << 8) >> 8) / fixed;\n          const z = ((centerBytes[i9 + 8] << 24 | centerBytes[i9 + 7] << 16 | centerBytes[i9 + 6] << 8) >> 8) / fixed;\n          centerCallback == null ? void 0 : centerCallback(i2, x2, y, z);\n        }\n      } else {\n        throw new Error(\"Unreachable\");\n      }\n      {\n        const bytes = await this.reader.read(this.numSplats);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          alphaCallback == null ? void 0 : alphaCallback(i2, bytes[i2] / 255);\n        }\n      }\n      {\n        const rgbBytes = await this.reader.read(this.numSplats * 3);\n        const scale = SH_C0 / 0.15;\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i3 = i2 * 3;\n          const r = (rgbBytes[i3] / 255 - 0.5) * scale + 0.5;\n          const g = (rgbBytes[i3 + 1] / 255 - 0.5) * scale + 0.5;\n          const b = (rgbBytes[i3 + 2] / 255 - 0.5) * scale + 0.5;\n          rgbCallback == null ? void 0 : rgbCallback(i2, r, g, b);\n        }\n      }\n      {\n        const scalesBytes = await this.reader.read(this.numSplats * 3);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i3 = i2 * 3;\n          const scaleX = Math.exp(scalesBytes[i3] / 16 - 10);\n          const scaleY = Math.exp(scalesBytes[i3 + 1] / 16 - 10);\n          const scaleZ = Math.exp(scalesBytes[i3 + 2] / 16 - 10);\n          scalesCallback == null ? void 0 : scalesCallback(i2, scaleX, scaleY, scaleZ);\n        }\n      }\n      if (this.version === 3) {\n        const maxValue = 1 / Math.sqrt(2);\n        const quatBytes = await this.reader.read(this.numSplats * 4);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i3 = i2 * 4;\n          const quaternion = [0, 0, 0, 0];\n          const values = [\n            quatBytes[i3],\n            quatBytes[i3 + 1],\n            quatBytes[i3 + 2],\n            quatBytes[i3 + 3]\n          ];\n          const combinedValues = values[0] + (values[1] << 8) + (values[2] << 16) + (values[3] << 24);\n          const valueMask = (1 << 9) - 1;\n          const largestIndex = combinedValues >>> 30;\n          let remainingValues = combinedValues;\n          let sumSquares = 0;\n          for (let i22 = 3; i22 >= 0; --i22) {\n            if (i22 !== largestIndex) {\n              const value = remainingValues & valueMask;\n              const sign = remainingValues >>> 9 & 1;\n              remainingValues = remainingValues >>> 10;\n              quaternion[i22] = maxValue * (value / valueMask);\n              quaternion[i22] = sign === 0 ? quaternion[i22] : -quaternion[i22];\n              sumSquares += quaternion[i22] * quaternion[i22];\n            }\n          }\n          const square = 1 - sumSquares;\n          quaternion[largestIndex] = Math.sqrt(Math.max(square, 0));\n          quatCallback == null ? void 0 : quatCallback(\n            i2,\n            quaternion[0],\n            quaternion[1],\n            quaternion[2],\n            quaternion[3]\n          );\n        }\n      } else {\n        const quatBytes = await this.reader.read(this.numSplats * 3);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i3 = i2 * 3;\n          const quatX = quatBytes[i3] / 127.5 - 1;\n          const quatY = quatBytes[i3 + 1] / 127.5 - 1;\n          const quatZ = quatBytes[i3 + 2] / 127.5 - 1;\n          const quatW = Math.sqrt(\n            Math.max(0, 1 - quatX * quatX - quatY * quatY - quatZ * quatZ)\n          );\n          quatCallback == null ? void 0 : quatCallback(i2, quatX, quatY, quatZ, quatW);\n        }\n      }\n      if (shCallback && this.shDegree >= 1) {\n        const sh1 = new Float32Array(3 * 3);\n        const sh2 = this.shDegree >= 2 ? new Float32Array(5 * 3) : void 0;\n        const sh3 = this.shDegree >= 3 ? new Float32Array(7 * 3) : void 0;\n        const shBytes = await this.reader.read(\n          this.numSplats * SH_DEGREE_TO_VECS[this.shDegree] * 3\n        );\n        let offset = 0;\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          for (let j = 0; j < 9; ++j) {\n            sh1[j] = (shBytes[offset + j] - 128) / 128;\n          }\n          offset += 9;\n          if (sh2) {\n            for (let j = 0; j < 15; ++j) {\n              sh2[j] = (shBytes[offset + j] - 128) / 128;\n            }\n            offset += 15;\n          }\n          if (sh3) {\n            for (let j = 0; j < 21; ++j) {\n              sh3[j] = (shBytes[offset + j] - 128) / 128;\n            }\n            offset += 21;\n          }\n          shCallback == null ? void 0 : shCallback(i2, sh1, sh2, sh3);\n        }\n      }\n    }\n  }\n  const SH_DEGREE_TO_VECS = { 1: 3, 2: 8, 3: 15 };\n  const SH_C0 = 0.28209479177387814;\n  const SPZ_MAGIC = 1347635022;\n  const SPZ_VERSION = 3;\n  const FLAG_ANTIALIASED = 1;\n  class SpzWriter {\n    constructor({\n      numSplats,\n      shDegree,\n      fractionalBits = 12,\n      flagAntiAlias = true\n    }) {\n      this.clippedCount = 0;\n      const splatSize = 9 + // Position\n      1 + // Opacity\n      3 + // Scale\n      3 + // DC-rgb\n      4 + // Rotation\n      (shDegree >= 1 ? 9 : 0) + (shDegree >= 2 ? 15 : 0) + (shDegree >= 3 ? 21 : 0);\n      const bufferSize = 16 + numSplats * splatSize;\n      this.buffer = new ArrayBuffer(bufferSize);\n      this.view = new DataView(this.buffer);\n      this.view.setUint32(0, SPZ_MAGIC, true);\n      this.view.setUint32(4, SPZ_VERSION, true);\n      this.view.setUint32(8, numSplats, true);\n      this.view.setUint8(12, shDegree);\n      this.view.setUint8(13, fractionalBits);\n      this.view.setUint8(14, flagAntiAlias ? FLAG_ANTIALIASED : 0);\n      this.view.setUint8(15, 0);\n      this.numSplats = numSplats;\n      this.shDegree = shDegree;\n      this.fractionalBits = fractionalBits;\n      this.fraction = 1 << fractionalBits;\n      this.flagAntiAlias = flagAntiAlias;\n    }\n    setCenter(index, x2, y, z) {\n      const xRounded = Math.round(x2 * this.fraction);\n      const xInt = Math.max(-8388607, Math.min(8388607, xRounded));\n      const yRounded = Math.round(y * this.fraction);\n      const yInt = Math.max(-8388607, Math.min(8388607, yRounded));\n      const zRounded = Math.round(z * this.fraction);\n      const zInt = Math.max(-8388607, Math.min(8388607, zRounded));\n      const clipped = xRounded !== xInt || yRounded !== yInt || zRounded !== zInt;\n      if (clipped) {\n        this.clippedCount += 1;\n      }\n      const i9 = index * 9;\n      const base = 16 + i9;\n      this.view.setUint8(base, xInt & 255);\n      this.view.setUint8(base + 1, xInt >> 8 & 255);\n      this.view.setUint8(base + 2, xInt >> 16 & 255);\n      this.view.setUint8(base + 3, yInt & 255);\n      this.view.setUint8(base + 4, yInt >> 8 & 255);\n      this.view.setUint8(base + 5, yInt >> 16 & 255);\n      this.view.setUint8(base + 6, zInt & 255);\n      this.view.setUint8(base + 7, zInt >> 8 & 255);\n      this.view.setUint8(base + 8, zInt >> 16 & 255);\n    }\n    setAlpha(index, alpha) {\n      const base = 16 + this.numSplats * 9 + index;\n      this.view.setUint8(\n        base,\n        Math.max(0, Math.min(255, Math.round(alpha * 255)))\n      );\n    }\n    static scaleRgb(r) {\n      const v = ((r - 0.5) / (SH_C0 / 0.15) + 0.5) * 255;\n      return Math.max(0, Math.min(255, Math.round(v)));\n    }\n    setRgb(index, r, g, b) {\n      const base = 16 + this.numSplats * 10 + index * 3;\n      this.view.setUint8(base, SpzWriter.scaleRgb(r));\n      this.view.setUint8(base + 1, SpzWriter.scaleRgb(g));\n      this.view.setUint8(base + 2, SpzWriter.scaleRgb(b));\n    }\n    setScale(index, scaleX, scaleY, scaleZ) {\n      const base = 16 + this.numSplats * 13 + index * 3;\n      this.view.setUint8(\n        base,\n        Math.max(0, Math.min(255, Math.round((Math.log(scaleX) + 10) * 16)))\n      );\n      this.view.setUint8(\n        base + 1,\n        Math.max(0, Math.min(255, Math.round((Math.log(scaleY) + 10) * 16)))\n      );\n      this.view.setUint8(\n        base + 2,\n        Math.max(0, Math.min(255, Math.round((Math.log(scaleZ) + 10) * 16)))\n      );\n    }\n    setQuat(index, ...q) {\n      const base = 16 + this.numSplats * 16 + index * 4;\n      const quat = normalize(q);\n      let iLargest = 0;\n      for (let i2 = 1; i2 < 4; ++i2) {\n        if (Math.abs(quat[i2]) > Math.abs(quat[iLargest])) {\n          iLargest = i2;\n        }\n      }\n      const negate = quat[iLargest] < 0 ? 1 : 0;\n      let comp = iLargest;\n      for (let i2 = 0; i2 < 4; ++i2) {\n        if (i2 !== iLargest) {\n          const negbit = (quat[i2] < 0 ? 1 : 0) ^ negate;\n          const mag = Math.floor(\n            ((1 << 9) - 1) * (Math.abs(quat[i2]) / Math.SQRT1_2) + 0.5\n          );\n          comp = comp << 10 | negbit << 9 | mag;\n        }\n      }\n      this.view.setUint8(base, comp & 255);\n      this.view.setUint8(base + 1, comp >> 8 & 255);\n      this.view.setUint8(base + 2, comp >> 16 & 255);\n      this.view.setUint8(base + 3, comp >>> 24 & 255);\n    }\n    static quantizeSh(sh, bits2) {\n      const value = Math.round(sh * 128) + 128;\n      const bucketSize = 1 << 8 - bits2;\n      const quantized = Math.floor((value + bucketSize / 2) / bucketSize) * bucketSize;\n      return Math.max(0, Math.min(255, quantized));\n    }\n    setSh(index, sh1, sh2, sh3) {\n      const shVecs = SH_DEGREE_TO_VECS[this.shDegree] || 0;\n      const base1 = 16 + this.numSplats * 20 + index * shVecs * 3;\n      for (let j = 0; j < 9; ++j) {\n        this.view.setUint8(base1 + j, SpzWriter.quantizeSh(sh1[j], 5));\n      }\n      if (sh2) {\n        const base2 = base1 + 9;\n        for (let j = 0; j < 15; ++j) {\n          this.view.setUint8(base2 + j, SpzWriter.quantizeSh(sh2[j], 4));\n        }\n        if (sh3) {\n          const base3 = base2 + 15;\n          for (let j = 0; j < 21; ++j) {\n            this.view.setUint8(base3 + j, SpzWriter.quantizeSh(sh3[j], 4));\n          }\n        }\n      }\n    }\n    async finalize() {\n      const input = new Uint8Array(this.buffer);\n      const stream = new ReadableStream({\n        async start(controller) {\n          controller.enqueue(input);\n          controller.close();\n        }\n      });\n      const compressed = stream.pipeThrough(new CompressionStream(\"gzip\"));\n      const response = new Response(compressed);\n      const buffer = await response.arrayBuffer();\n      console.log(\n        \"Compressed\",\n        input.length,\n        \"bytes to\",\n        buffer.byteLength,\n        \"bytes\"\n      );\n      return new Uint8Array(buffer);\n    }\n  }\n  async function transcodeSpz(input) {\n    var _a2, _b2, _c;\n    const splats = new SplatData();\n    const {\n      inputs,\n      clipXyz,\n      maxSh,\n      fractionalBits = 12,\n      opacityThreshold\n    } = input;\n    for (const input2 of inputs) {\n      let transformPos = function(pos) {\n        pos.multiplyScalar(scale);\n        pos.applyQuaternion(quaternion);\n        pos.add(translate);\n        return pos;\n      }, transformScales = function(scales) {\n        scales.multiplyScalar(scale);\n        return scales;\n      }, transformQuaternion = function(quat) {\n        quat.premultiply(quaternion);\n        return quat;\n      }, withinClip = function(p) {\n        return !clip || clip.containsPoint(p);\n      }, withinOpacity = function(opacity) {\n        return opacityThreshold !== void 0 ? opacity >= opacityThreshold : true;\n      };\n      const scale = ((_a2 = input2.transform) == null ? void 0 : _a2.scale) ?? 1;\n      const quaternion = new Quaternion().fromArray(\n        ((_b2 = input2.transform) == null ? void 0 : _b2.quaternion) ?? [0, 0, 0, 1]\n      );\n      const translate = new Vector3().fromArray(\n        ((_c = input2.transform) == null ? void 0 : _c.translate) ?? [0, 0, 0]\n      );\n      const clip = clipXyz ? new Box3(\n        new Vector3().fromArray(clipXyz.min),\n        new Vector3().fromArray(clipXyz.max)\n      ) : void 0;\n      let fileType = input2.fileType;\n      if (!fileType) {\n        fileType = getSplatFileType(input2.fileBytes);\n        if (!fileType && input2.pathOrUrl) {\n          fileType = getSplatFileTypeFromPath(input2.pathOrUrl);\n        }\n      }\n      switch (fileType) {\n        case SplatFileType.PLY: {\n          const ply = new PlyReader({ fileBytes: input2.fileBytes });\n          await ply.parseHeader();\n          let lastIndex = null;\n          ply.parseSplats(\n            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n              const center = transformPos(new Vector3(x2, y, z));\n              if (withinClip(center) && withinOpacity(opacity)) {\n                lastIndex = splats.pushSplat();\n                splats.setCenter(lastIndex, center.x, center.y, center.z);\n                const scales = transformScales(\n                  new Vector3(scaleX, scaleY, scaleZ)\n                );\n                splats.setScale(lastIndex, scales.x, scales.y, scales.z);\n                const quaternion2 = transformQuaternion(\n                  new Quaternion(quatX, quatY, quatZ, quatW)\n                );\n                splats.setQuaternion(\n                  lastIndex,\n                  quaternion2.x,\n                  quaternion2.y,\n                  quaternion2.z,\n                  quaternion2.w\n                );\n                splats.setOpacity(lastIndex, opacity);\n                splats.setColor(lastIndex, r, g, b);\n              } else {\n                lastIndex = null;\n              }\n            },\n            (index, sh1, sh2, sh3) => {\n              if (sh1 && lastIndex !== null) {\n                splats.setSh1(lastIndex, sh1);\n              }\n              if (sh2 && lastIndex !== null) {\n                splats.setSh2(lastIndex, sh2);\n              }\n              if (sh3 && lastIndex !== null) {\n                splats.setSh3(lastIndex, sh3);\n              }\n            }\n          );\n          break;\n        }\n        case SplatFileType.SPZ: {\n          const spz2 = new SpzReader({ fileBytes: input2.fileBytes });\n          await spz2.parseHeader();\n          const mapping = new Int32Array(spz2.numSplats);\n          mapping.fill(-1);\n          const centers = new Float32Array(spz2.numSplats * 3);\n          const center = new Vector3();\n          spz2.parseSplats(\n            (index, x2, y, z) => {\n              const center2 = transformPos(new Vector3(x2, y, z));\n              centers[index * 3] = center2.x;\n              centers[index * 3 + 1] = center2.y;\n              centers[index * 3 + 2] = center2.z;\n            },\n            (index, alpha) => {\n              center.fromArray(centers, index * 3);\n              if (withinClip(center) && withinOpacity(alpha)) {\n                mapping[index] = splats.pushSplat();\n                splats.setCenter(mapping[index], center.x, center.y, center.z);\n                splats.setOpacity(mapping[index], alpha);\n              }\n            },\n            (index, r, g, b) => {\n              if (mapping[index] >= 0) {\n                splats.setColor(mapping[index], r, g, b);\n              }\n            },\n            (index, scaleX, scaleY, scaleZ) => {\n              if (mapping[index] >= 0) {\n                const scales = transformScales(\n                  new Vector3(scaleX, scaleY, scaleZ)\n                );\n                splats.setScale(mapping[index], scales.x, scales.y, scales.z);\n              }\n            },\n            (index, quatX, quatY, quatZ, quatW) => {\n              if (mapping[index] >= 0) {\n                const quaternion2 = transformQuaternion(\n                  new Quaternion(quatX, quatY, quatZ, quatW)\n                );\n                splats.setQuaternion(\n                  mapping[index],\n                  quaternion2.x,\n                  quaternion2.y,\n                  quaternion2.z,\n                  quaternion2.w\n                );\n              }\n            },\n            (index, sh1, sh2, sh3) => {\n              if (mapping[index] >= 0) {\n                splats.setSh1(mapping[index], sh1);\n                if (sh2) {\n                  splats.setSh2(mapping[index], sh2);\n                }\n                if (sh3) {\n                  splats.setSh3(mapping[index], sh3);\n                }\n              }\n            }\n          );\n          break;\n        }\n        case SplatFileType.SPLAT:\n          decodeAntiSplat(\n            input2.fileBytes,\n            (numSplats) => {\n            },\n            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n              const center = transformPos(new Vector3(x2, y, z));\n              if (withinClip(center) && withinOpacity(opacity)) {\n                const index2 = splats.pushSplat();\n                splats.setCenter(index2, center.x, center.y, center.z);\n                const scales = transformScales(\n                  new Vector3(scaleX, scaleY, scaleZ)\n                );\n                splats.setScale(index2, scales.x, scales.y, scales.z);\n                const quaternion2 = transformQuaternion(\n                  new Quaternion(quatX, quatY, quatZ, quatW)\n                );\n                splats.setQuaternion(\n                  index2,\n                  quaternion2.x,\n                  quaternion2.y,\n                  quaternion2.z,\n                  quaternion2.w\n                );\n                splats.setOpacity(index2, opacity);\n                splats.setColor(index2, r, g, b);\n              }\n            }\n          );\n          break;\n        case SplatFileType.KSPLAT: {\n          let lastIndex = null;\n          decodeKsplat(\n            input2.fileBytes,\n            (numSplats) => {\n            },\n            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n              const center = transformPos(new Vector3(x2, y, z));\n              if (withinClip(center) && withinOpacity(opacity)) {\n                lastIndex = splats.pushSplat();\n                splats.setCenter(lastIndex, center.x, center.y, center.z);\n                const scales = transformScales(\n                  new Vector3(scaleX, scaleY, scaleZ)\n                );\n                splats.setScale(lastIndex, scales.x, scales.y, scales.z);\n                const quaternion2 = transformQuaternion(\n                  new Quaternion(quatX, quatY, quatZ, quatW)\n                );\n                splats.setQuaternion(\n                  lastIndex,\n                  quaternion2.x,\n                  quaternion2.y,\n                  quaternion2.z,\n                  quaternion2.w\n                );\n                splats.setOpacity(lastIndex, opacity);\n                splats.setColor(lastIndex, r, g, b);\n              } else {\n                lastIndex = null;\n              }\n            },\n            (index, sh1, sh2, sh3) => {\n              if (lastIndex !== null) {\n                splats.setSh1(lastIndex, sh1);\n                if (sh2) {\n                  splats.setSh2(lastIndex, sh2);\n                }\n                if (sh3) {\n                  splats.setSh3(lastIndex, sh3);\n                }\n              }\n            }\n          );\n          break;\n        }\n        default:\n          throw new Error(`transcodeSpz not implemented for ${fileType}`);\n      }\n    }\n    const shDegree = Math.min(\n      maxSh ?? 3,\n      splats.sh3 ? 3 : splats.sh2 ? 2 : splats.sh1 ? 1 : 0\n    );\n    const spz = new SpzWriter({\n      numSplats: splats.numSplats,\n      shDegree,\n      fractionalBits,\n      flagAntiAlias: true\n    });\n    for (let i2 = 0; i2 < splats.numSplats; ++i2) {\n      const i3 = i2 * 3;\n      const i4 = i2 * 4;\n      spz.setCenter(\n        i2,\n        splats.centers[i3],\n        splats.centers[i3 + 1],\n        splats.centers[i3 + 2]\n      );\n      spz.setScale(\n        i2,\n        splats.scales[i3],\n        splats.scales[i3 + 1],\n        splats.scales[i3 + 2]\n      );\n      spz.setQuat(\n        i2,\n        splats.quaternions[i4],\n        splats.quaternions[i4 + 1],\n        splats.quaternions[i4 + 2],\n        splats.quaternions[i4 + 3]\n      );\n      spz.setAlpha(i2, splats.opacities[i2]);\n      spz.setRgb(\n        i2,\n        splats.colors[i3],\n        splats.colors[i3 + 1],\n        splats.colors[i3 + 2]\n      );\n      if (splats.sh1 && shDegree >= 1) {\n        spz.setSh(\n          i2,\n          splats.sh1.slice(i2 * 9, (i2 + 1) * 9),\n          shDegree >= 2 && splats.sh2 ? splats.sh2.slice(i2 * 15, (i2 + 1) * 15) : void 0,\n          shDegree >= 3 && splats.sh3 ? splats.sh3.slice(i2 * 21, (i2 + 1) * 21) : void 0\n        );\n      }\n    }\n    const spzBytes = await spz.finalize();\n    return { fileBytes: spzBytes, clippedCount: spz.clippedCount };\n  }\n  async function onMessage(event) {\n    const { name, args, id } = event.data;\n    let result = void 0;\n    let error = void 0;\n    try {\n      switch (name) {\n        case \"unpackPly\": {\n          const { packedArray, fileBytes, splatEncoding } = args;\n          const decoded = await unpackPly({\n            packedArray,\n            fileBytes,\n            splatEncoding\n          });\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case \"decodeSpz\": {\n          const { fileBytes, splatEncoding } = args;\n          const decoded = await unpackSpz(fileBytes, splatEncoding);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case \"decodeAntiSplat\": {\n          const { fileBytes, splatEncoding } = args;\n          const decoded = unpackAntiSplat(fileBytes, splatEncoding);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray\n          };\n          break;\n        }\n        case \"decodeKsplat\": {\n          const { fileBytes, splatEncoding } = args;\n          const decoded = unpackKsplat(fileBytes, splatEncoding);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case \"decodePcSogs\": {\n          const { fileBytes, extraFiles, splatEncoding } = args;\n          const json = JSON.parse(\n            new TextDecoder().decode(fileBytes)\n          );\n          const decoded = await unpackPcSogs(json, extraFiles, splatEncoding);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case \"decodePcSogsZip\": {\n          const { fileBytes, splatEncoding } = args;\n          const decoded = await unpackPcSogsZip(fileBytes, splatEncoding);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case \"sortSplats\": {\n          const { totalSplats, readback, ordering } = args;\n          result = {\n            id,\n            readback,\n            ...sortSplats({ totalSplats, readback, ordering })\n          };\n          break;\n        }\n        case \"sortDoubleSplats\": {\n          const { numSplats, readback, ordering } = args;\n          {\n            result = {\n              id,\n              readback,\n              ordering,\n              activeSplats: sort_splats(numSplats, readback, ordering)\n            };\n          }\n          break;\n        }\n        case \"sort32Splats\": {\n          const { numSplats, readback, ordering } = args;\n          {\n            result = {\n              id,\n              readback,\n              ordering,\n              activeSplats: sort32_splats(numSplats, readback, ordering)\n            };\n          }\n          break;\n        }\n        case \"transcodeSpz\": {\n          const input = args;\n          const spzBytes = await transcodeSpz(input);\n          result = {\n            id,\n            fileBytes: spzBytes,\n            input\n          };\n          break;\n        }\n        default: {\n          throw new Error(`Unknown name: ${name}`);\n        }\n      }\n    } catch (e) {\n      error = e;\n      console.error(error);\n    }\n    self.postMessage(\n      { id, result, error },\n      { transfer: getArrayBuffers(result) }\n    );\n  }\n  async function unpackPly({\n    packedArray,\n    fileBytes,\n    splatEncoding\n  }) {\n    const ply = new PlyReader({ fileBytes });\n    await ply.parseHeader();\n    const numSplats = ply.numSplats;\n    const extra = {};\n    ply.parseSplats(\n      (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n        setPackedSplat(\n          packedArray,\n          index,\n          x2,\n          y,\n          z,\n          scaleX,\n          scaleY,\n          scaleZ,\n          quatX,\n          quatY,\n          quatZ,\n          quatW,\n          opacity,\n          r,\n          g,\n          b,\n          splatEncoding\n        );\n      },\n      (index, sh1, sh2, sh3) => {\n        if (sh1) {\n          if (!extra.sh1) {\n            extra.sh1 = new Uint32Array(numSplats * 2);\n          }\n          encodeSh1Rgb(extra.sh1, index, sh1, splatEncoding);\n        }\n        if (sh2) {\n          if (!extra.sh2) {\n            extra.sh2 = new Uint32Array(numSplats * 4);\n          }\n          encodeSh2Rgb(extra.sh2, index, sh2, splatEncoding);\n        }\n        if (sh3) {\n          if (!extra.sh3) {\n            extra.sh3 = new Uint32Array(numSplats * 4);\n          }\n          encodeSh3Rgb(extra.sh3, index, sh3, splatEncoding);\n        }\n      }\n    );\n    return { packedArray, numSplats, extra };\n  }\n  async function unpackSpz(fileBytes, splatEncoding) {\n    const spz = new SpzReader({ fileBytes });\n    await spz.parseHeader();\n    const numSplats = spz.numSplats;\n    const maxSplats = computeMaxSplats(numSplats);\n    const packedArray = new Uint32Array(maxSplats * 4);\n    const extra = {};\n    await spz.parseSplats(\n      (index, x2, y, z) => {\n        setPackedSplatCenter(packedArray, index, x2, y, z);\n      },\n      (index, alpha) => {\n        setPackedSplatOpacity(packedArray, index, alpha);\n      },\n      (index, r, g, b) => {\n        setPackedSplatRgb(packedArray, index, r, g, b, splatEncoding);\n      },\n      (index, scaleX, scaleY, scaleZ) => {\n        setPackedSplatScales(\n          packedArray,\n          index,\n          scaleX,\n          scaleY,\n          scaleZ,\n          splatEncoding\n        );\n      },\n      (index, quatX, quatY, quatZ, quatW) => {\n        setPackedSplatQuat(packedArray, index, quatX, quatY, quatZ, quatW);\n      },\n      (index, sh1, sh2, sh3) => {\n        if (sh1) {\n          if (!extra.sh1) {\n            extra.sh1 = new Uint32Array(numSplats * 2);\n          }\n          encodeSh1Rgb(extra.sh1, index, sh1, splatEncoding);\n        }\n        if (sh2) {\n          if (!extra.sh2) {\n            extra.sh2 = new Uint32Array(numSplats * 4);\n          }\n          encodeSh2Rgb(extra.sh2, index, sh2, splatEncoding);\n        }\n        if (sh3) {\n          if (!extra.sh3) {\n            extra.sh3 = new Uint32Array(numSplats * 4);\n          }\n          encodeSh3Rgb(extra.sh3, index, sh3, splatEncoding);\n        }\n      }\n    );\n    return { packedArray, numSplats, extra };\n  }\n  const DEPTH_INFINITY_F16 = 31744;\n  const DEPTH_SIZE_16 = DEPTH_INFINITY_F16 + 1;\n  let depthArray16 = null;\n  function sortSplats({\n    totalSplats,\n    readback,\n    ordering\n  }) {\n    if (!depthArray16) {\n      depthArray16 = new Uint32Array(DEPTH_SIZE_16);\n    }\n    depthArray16.fill(0);\n    const readbackUint32 = readback.map((layer) => new Uint32Array(layer.buffer));\n    const layerSize = readbackUint32[0].length;\n    const numLayers = Math.ceil(totalSplats / layerSize);\n    let layerBase = 0;\n    for (let layer = 0; layer < numLayers; ++layer) {\n      const readbackLayer = readbackUint32[layer];\n      const layerSplats = Math.min(readbackLayer.length, totalSplats - layerBase);\n      for (let i2 = 0; i2 < layerSplats; ++i2) {\n        const pri = readbackLayer[i2] & 32767;\n        if (pri < DEPTH_INFINITY_F16) {\n          depthArray16[pri] += 1;\n        }\n      }\n      layerBase += layerSplats;\n    }\n    let activeSplats = 0;\n    for (let j = 0; j < DEPTH_SIZE_16; ++j) {\n      const nextIndex = activeSplats + depthArray16[j];\n      depthArray16[j] = activeSplats;\n      activeSplats = nextIndex;\n    }\n    layerBase = 0;\n    for (let layer = 0; layer < numLayers; ++layer) {\n      const readbackLayer = readbackUint32[layer];\n      const layerSplats = Math.min(readbackLayer.length, totalSplats - layerBase);\n      for (let i2 = 0; i2 < layerSplats; ++i2) {\n        const pri = readbackLayer[i2] & 32767;\n        if (pri < DEPTH_INFINITY_F16) {\n          ordering[depthArray16[pri]] = layerBase + i2;\n          depthArray16[pri] += 1;\n        }\n      }\n      layerBase += layerSplats;\n    }\n    if (depthArray16[DEPTH_SIZE_16 - 1] !== activeSplats) {\n      throw new Error(\n        `Expected ${activeSplats} active splats but got ${depthArray16[DEPTH_SIZE_16 - 1]}`\n      );\n    }\n    return { activeSplats, ordering };\n  }\n  const messageBuffer = [];\n  function bufferMessage(event) {\n    messageBuffer.push(event);\n  }\n  async function initialize() {\n    self.addEventListener(\"message\", bufferMessage);\n    await __wbg_init();\n    self.removeEventListener(\"message\", bufferMessage);\n    self.addEventListener(\"message\", onMessage);\n    for (const event of messageBuffer) {\n      onMessage(event);\n    }\n    messageBuffer.length = 0;\n  }\n  initialize().catch(console.error);\n})();\n//# sourceMappingURL=worker-CaMzlx2k.js.map\n", io = typeof self < "u" && self.Blob && new Blob([ro], { type: "text/javascript;charset=utf-8" });
function ao(e) {
	let t;
	try {
		if (t = io && (self.URL || self.webkitURL).createObjectURL(io), !t) throw "";
		let n = new Worker(t, { name: e?.name });
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(ro), { name: e?.name });
	} finally {
		t && (self.URL || self.webkitURL).revokeObjectURL(t);
	}
}
var oo = class {
	constructor() {
		this.messages = {}, this.messageIdNext = 0, this.worker = new ao(), this.worker.onmessage = (e) => this.onMessage(e);
	}
	makeMessageId() {
		return ++this.messageIdNext;
	}
	makeMessagePromiseId() {
		let e = this.makeMessageId();
		return {
			id: e,
			promise: new Promise((t, n) => {
				this.messages[e] = {
					resolve: t,
					reject: n
				};
			})
		};
	}
	onMessage(e) {
		let { id: t, result: n, error: r } = e.data, i = this.messages[t];
		i && (delete this.messages[t], r ? i.reject(r) : i.resolve(n));
	}
	async call(e, t) {
		let { id: n, promise: r } = this.makeMessagePromiseId();
		return this.worker.postMessage({
			name: e,
			args: t,
			id: n
		}, { transfer: ci(t) }), r;
	}
}, so = 4, co = 0, lo = [], uo = [];
async function fo() {
	let e = lo.shift();
	if (e) return e;
	if (co < so) {
		let e = new oo();
		return co += 1, e;
	}
	return new Promise((e) => {
		uo.push(e);
	});
}
function po(e) {
	if (co > so) {
		--co;
		return;
	}
	let t = uo.shift();
	t ? t(e) : lo.push(e);
}
async function mo(e) {
	let t = await fo();
	try {
		return await e(t);
	} finally {
		po(t);
	}
}
var ho = class extends Te {
	constructor(e) {
		super(e), this.fileLoader = new w(e);
	}
	load(e, t, n, r) {
		let i = this.manager.resolveURL((this.path ?? "") + (e ?? "")), a = new Headers(this.requestHeader), o = this.withCredentials ? "include" : "same-origin", s = new Request(i, {
			headers: a,
			credentials: o
		}), c = this.fileType;
		this.manager.itemStart(i), go(s, n).then(async (e) => {
			let r = [new ProgressEvent("progress", {
				lengthComputable: !0,
				loaded: e.byteLength,
				total: e.byteLength
			})];
			function s() {
				if (n) {
					let e = r.every((e) => e.lengthComputable || e.loaded === 0 && e.total === 0), t = r.reduce((e, t) => e + t.loaded, 0), i = r.reduce((e, t) => e + t.total, 0);
					n(new ProgressEvent("progress", {
						lengthComputable: e,
						loaded: t,
						total: i
					}));
				}
			}
			let l = {}, u = [], d = bo(e);
			if (c === "pcsogs" && d === void 0) throw Error("Invalid PC SOGS file");
			if (d !== void 0) {
				c = "pcsogs";
				for (let e of [
					"means",
					"scales",
					"quats",
					"sh0",
					"shN"
				]) {
					let t = d[e];
					if (t) for (let e of t.files) {
						let t = new URL(e, i).toString(), n = r.length;
						r.push(new ProgressEvent("progress")), this.manager.itemStart(t);
						let c = go(new Request(t, {
							headers: a,
							credentials: o
						}), (e) => {
							r[n] = e, s();
						}).then((t) => {
							l[e] = t;
						}).catch((e) => {
							throw this.manager.itemError(t), e;
						}).finally(() => {
							this.manager.itemEnd(t);
						});
						u.push(c);
					}
				}
			}
			if (await Promise.all(u), t) {
				let n = this.packedSplats?.splatEncoding ?? wo, r = await So({
					input: e,
					extraFiles: l,
					fileType: c,
					pathOrUrl: i,
					splatEncoding: n
				});
				this.packedSplats ? (this.packedSplats.initialize(r), t(this.packedSplats)) : t(new Eo(r));
			}
		}).catch((e) => {
			this.manager.itemError(i), r?.(e);
		}).finally(() => {
			this.manager.itemEnd(i);
		});
	}
	async loadAsync(e, t) {
		return new Promise((n, r) => {
			this.load(e, (e) => {
				n(e);
			}, t, r);
		});
	}
	parse(e) {
		return new Oa({ packedSplats: e });
	}
};
async function go(e, t) {
	let n = await fetch(e);
	if (!n.ok) throw Error(`${n.status} "${n.statusText}" fetching URL: ${e.url}`);
	if (!n.body) throw Error(`Response body is null for URL: ${e.url}`);
	let r = n.body.getReader(), i = Number.parseInt(n.headers.get("Content-Length") || "0"), a = Number.isNaN(i) ? 0 : i, o = 0, s = [];
	for (;;) {
		let { done: e, value: n } = await r.read();
		if (e) break;
		s.push(n), o += n.length, t && t(new ProgressEvent("progress", {
			lengthComputable: a !== 0,
			loaded: o,
			total: a
		}));
	}
	let c = new Uint8Array(o), l = 0;
	for (let e of s) c.set(e, l), l += e.length;
	return c.buffer;
}
function _o(e) {
	let t = new DataView(e.buffer);
	if ((t.getUint32(0, !0) & 16777215) == 7957616) return "ply";
	if ((t.getUint32(0, !0) & 16777215) == 559903) {
		let t = Ti(e, 4);
		return new DataView(t.buffer).getUint32(0, !0) === 1347635022 ? "spz" : void 0;
	}
	if (t.getUint32(0, !0) === 67324752) return xo(e) ? "pcsogszip" : void 0;
}
function vo(e) {
	let t = e.split(/[?#]/, 1)[0], n = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\")), r = t.slice(n + 1), i = r.lastIndexOf(".");
	return i <= 0 || i === r.length - 1 ? "" : r.slice(i + 1).toLowerCase();
}
function yo(e) {
	let t = vo(e);
	if (t === "ply") return "ply";
	if (t === "spz") return "spz";
	if (t === "splat") return "splat";
	if (t === "ksplat") return "ksplat";
	if (t === "sog") return "pcsogszip";
}
function bo(e) {
	try {
		let t;
		if (typeof e == "string") t = e;
		else {
			let n = e instanceof ArrayBuffer ? new Uint8Array(e) : e;
			if (n.length > 65536) return;
			t = new TextDecoder().decode(n);
		}
		let n = JSON.parse(t);
		if (!n || typeof n != "object" || Array.isArray(n)) return;
		let r = n.version === 2;
		for (let e of [
			"means",
			"scales",
			"quats",
			"sh0"
		]) {
			if (!n[e] || typeof n[e] != "object" || Array.isArray(n[e])) return;
			if (r) {
				if (!n[e].files || (e === "scales" || e === "sh0") && !n[e].codebook || e === "means" && (!n[e].mins || !n[e].maxs)) return;
			} else if (!n[e].shape || !n[e].files || e !== "quats" && (!n[e].mins || !n[e].maxs)) return;
		}
		return n;
	} catch {
		return;
	}
}
function xo(e) {
	try {
		let t = e instanceof ArrayBuffer ? new Uint8Array(e) : e, n = null, r = Nn(t, { filter: ({ name: e }) => e.split(/[\\/]/).pop() === "meta.json" && (n = e, !0) });
		if (!n) return;
		let i = bo(r[n]);
		return i ? {
			name: n,
			json: i
		} : void 0;
	} catch {
		return;
	}
}
async function So({ input: e, extraFiles: t, fileType: n, pathOrUrl: r, splatEncoding: i }) {
	let a = e instanceof ArrayBuffer ? new Uint8Array(e) : e, o = n;
	switch (n || (o = _o(a), !o && r && (o = yo(r))), o) {
		case "ply": {
			let e = new Ba({ fileBytes: a });
			await e.parseHeader();
			let t = e.numSplats, n = mi(t).maxSplats, r = {
				fileBytes: a,
				packedArray: new Uint32Array(n * 4),
				splatEncoding: i
			};
			return await mo(async (e) => {
				let { packedArray: t, numSplats: n, extra: i } = await e.call("unpackPly", r);
				return {
					packedArray: t,
					numSplats: n,
					extra: i
				};
			});
		}
		case "spz": return await mo(async (e) => {
			let { packedArray: t, numSplats: n, extra: r } = await e.call("decodeSpz", {
				fileBytes: a,
				splatEncoding: i
			});
			return {
				packedArray: t,
				numSplats: n,
				extra: r
			};
		});
		case "splat": return await mo(async (e) => {
			let { packedArray: t, numSplats: n } = await e.call("decodeAntiSplat", {
				fileBytes: a,
				splatEncoding: i
			});
			return {
				packedArray: t,
				numSplats: n
			};
		});
		case "ksplat": return await mo(async (e) => {
			let { packedArray: t, numSplats: n, extra: r } = await e.call("decodeKsplat", {
				fileBytes: a,
				splatEncoding: i
			});
			return {
				packedArray: t,
				numSplats: n,
				extra: r
			};
		});
		case "pcsogs": return await mo(async (e) => {
			let { packedArray: n, numSplats: r, extra: o } = await e.call("decodePcSogs", {
				fileBytes: a,
				extraFiles: t,
				splatEncoding: i
			});
			return {
				packedArray: n,
				numSplats: r,
				extra: o
			};
		});
		case "pcsogszip": return await mo(async (e) => {
			let { packedArray: t, numSplats: n, extra: r } = await e.call("decodePcSogsZip", {
				fileBytes: a,
				splatEncoding: i
			});
			return {
				packedArray: t,
				numSplats: n,
				extra: r
			};
		});
		default: throw Error(`Unknown splat file type: ${o}`);
	}
}
var Co = "precision highp float;\nprecision highp int;\nprecision highp sampler2D;\nprecision highp usampler2D;\nprecision highp isampler2D;\nprecision highp sampler2DArray;\nprecision highp usampler2DArray;\nprecision highp isampler2DArray;\nprecision highp sampler3D;\nprecision highp usampler3D;\nprecision highp isampler3D;\n\n#include <splatDefines>\n\nuniform uint targetLayer;\nuniform int targetBase;\nuniform int targetCount;\n\nout uvec4 target;\n\n{{ GLOBALS }}\n\nvoid produceSplat(int index) {\n    {{ STATEMENTS }}\n}\n\nvoid main() {\n    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);\n    int index = targetIndex - targetBase;\n\n    if ((index >= 0) && (index < targetCount)) {\n        produceSplat(index);\n    } else {\n        target = uvec4(0u, 0u, 0u, 0u);\n    }\n}", wo = {
	rgbMin: 0,
	rgbMax: 1,
	lnScaleMin: -12,
	lnScaleMax: 9,
	sh1Min: -1,
	sh1Max: 1,
	sh2Min: -1,
	sh2Max: 1,
	sh3Min: -1,
	sh3Max: 1
}, To = class e {
	constructor(e = {}) {
		this.maxSplats = 0, this.numSplats = 0, this.packedArray = null, this.isInitialized = !1, this.target = null, this.source = null, this.needsUpdate = !0, this.extra = {}, this.dyno = new Do({ packedSplats: this }), this.dynoRgbMinMaxLnScaleMinMax = new Jr({
			key: "rgbMinMaxLnScaleMinMax",
			value: new V(0, 1, -12, 9),
			update: (e) => (e.set(this.splatEncoding?.rgbMin ?? 0, this.splatEncoding?.rgbMax ?? 1, this.splatEncoding?.lnScaleMin ?? -12, this.splatEncoding?.lnScaleMax ?? 9), e)
		}), this.dynoSh1MinMax = new Kr({
			key: "sh1MinMax",
			value: new y(-1, 1),
			update: (e) => (e.set(this.splatEncoding?.sh1Min ?? -1, this.splatEncoding?.sh1Max ?? 1), e)
		}), this.dynoSh2MinMax = new Kr({
			key: "sh2MinMax",
			value: new y(-1, 1),
			update: (e) => (e.set(this.splatEncoding?.sh2Min ?? -1, this.splatEncoding?.sh2Max ?? 1), e)
		}), this.dynoSh3MinMax = new Kr({
			key: "sh3MinMax",
			value: new y(-1, 1),
			update: (e) => (e.set(this.splatEncoding?.sh3Min ?? -1, this.splatEncoding?.sh3Max ?? 1), e)
		}), this.initialized = Promise.resolve(this), this.reinitialize(e);
	}
	reinitialize(e) {
		this.isInitialized = !1, this.extra = {}, this.splatEncoding = e.splatEncoding, e.url || e.fileBytes || e.construct ? this.initialized = this.asyncInitialize(e).then(() => (this.isInitialized = !0, this)) : (this.initialize(e), this.isInitialized = !0, this.initialized = Promise.resolve(this));
	}
	initialize(e) {
		e.packedArray ? (this.packedArray = e.packedArray, this.maxSplats = Math.floor(this.packedArray.length / 4), this.maxSplats = Math.floor(this.maxSplats / Y) * Y, this.numSplats = Math.min(this.maxSplats, e.numSplats ?? Infinity)) : (this.maxSplats = e.maxSplats ?? 0, this.numSplats = 0), this.extra = e.extra ?? {};
	}
	async asyncInitialize(e) {
		let { url: t, fileBytes: n, construct: r } = e;
		if (t) {
			let e = new ho();
			e.packedSplats = this, await e.loadAsync(t);
		} else if (n) {
			let r = await So({
				input: n,
				fileType: e.fileType,
				pathOrUrl: e.fileName ?? t,
				splatEncoding: e.splatEncoding ?? wo
			});
			this.initialize(r);
		}
		if (r) {
			let e = r(this);
			e instanceof Promise && await e;
		}
	}
	dispose() {
		this.target &&= (this.target.dispose(), null), this.source &&= (this.source.dispose(), null);
	}
	ensureSplats(e) {
		let t = e <= this.maxSplats ? this.maxSplats : Math.max(e, 2 * this.maxSplats), n = this.packedArray ? this.packedArray.length / 4 : 0;
		if (!this.packedArray || t > n) {
			this.maxSplats = mi(t).maxSplats;
			let e = new Uint32Array(this.maxSplats * 4);
			this.packedArray && e.set(this.packedArray), this.packedArray = e;
		}
		return this.packedArray;
	}
	ensureSplatsSh(e, t) {
		let n, r;
		if (e === 0) return this.ensureSplats(t);
		if (e === 1) n = 2, r = "sh1";
		else if (e === 2) n = 4, r = "sh2";
		else if (e === 3) n = 4, r = "sh3";
		else throw Error(`Invalid level: ${e}`);
		let i = this.extra[r] ? this.extra[r].length / n : 0, a = t <= i ? i : Math.max(t, 2 * i);
		if (!this.extra[r] || a > i) {
			i = mi(a).maxSplats;
			let e = new Uint32Array(i * n);
			this.extra[r] && e.set(this.extra[r]), this.extra[r] = e;
		}
		return this.extra[r];
	}
	getSplat(e) {
		if (!this.packedArray || e >= this.numSplats) throw Error("Invalid index");
		return pi(this.packedArray, e, this.splatEncoding);
	}
	setSplat(e, t, n, r, i, a) {
		ui(this.ensureSplats(e + 1), e, t.x, t.y, t.z, n.x, n.y, n.z, r.x, r.y, r.z, r.w, i, a.r, a.g, a.b), this.numSplats = Math.max(this.numSplats, e + 1);
	}
	pushSplat(e, t, n, r, i) {
		ui(this.ensureSplats(this.numSplats + 1), this.numSplats, e.x, e.y, e.z, t.x, t.y, t.z, n.x, n.y, n.z, n.w, r, i.r, i.g, i.b), ++this.numSplats;
	}
	forEachSplat(e) {
		if (this.packedArray && this.numSplats) for (let t = 0; t < this.numSplats; ++t) {
			let n = pi(this.packedArray, t, this.splatEncoding);
			e(t, n.center, n.scales, n.quaternion, n.opacity, n.color);
		}
	}
	ensureGenerate(e) {
		if (this.target && (e ?? 1) <= this.maxSplats) return !1;
		this.dispose();
		let t = mi(e ?? 1), { width: n, height: r, depth: i } = t;
		return this.maxSplats = t.maxSplats, this.target = new _(n, r, i, {
			depthBuffer: !1,
			stencilBuffer: !1,
			generateMipmaps: !1,
			magFilter: Ce,
			minFilter: Ce
		}), this.target.texture.format = I, this.target.texture.type = ee, this.target.texture.internalFormat = "RGBA32UI", this.target.scissorTest = !0, !0;
	}
	generateMapping(e) {
		let t = 0, n = e.map((e) => {
			let n = t, r = Math.ceil(e / Y) * Y;
			return t += r, {
				base: n,
				count: e
			};
		});
		return {
			maxSplats: t,
			mapping: n
		};
	}
	getTexture() {
		return this.target ? this.target.texture : this.source || this.packedArray ? this.maybeUpdateSource() : e.getEmpty();
	}
	maybeUpdateSource() {
		if (!this.packedArray) throw Error("No packed splats");
		if (this.needsUpdate || !this.source) {
			if (this.needsUpdate = !1, this.source) {
				let { width: e, height: t, depth: n } = this.source.image;
				this.maxSplats !== e * t * n && (this.source.dispose(), this.source = null);
			}
			if (this.source) this.packedArray.buffer !== this.source.image.data.buffer && (this.source.image.data = new Uint8Array(this.packedArray.buffer));
			else {
				let { width: e, height: t, depth: n } = mi(this.maxSplats);
				this.source = new D(this.packedArray, e, t, n), this.source.format = I, this.source.type = ee, this.source.internalFormat = "RGBA32UI", this.source.needsUpdate = !0;
			}
			this.source.needsUpdate = !0;
		}
		return this.source;
	}
	static getEmpty() {
		if (!e.emptySource) {
			let { width: t, height: n, depth: r, maxSplats: i } = mi(1), a = new Uint32Array(i * 4);
			e.emptySource = new D(a, t, n, r), e.emptySource.format = I, e.emptySource.type = ee, e.emptySource.internalFormat = "RGBA32UI", e.emptySource.needsUpdate = !0;
		}
		return e.emptySource;
	}
	prepareProgramMaterial(t) {
		let n = e.generatorProgram.get(t);
		if (!n) {
			let r = _r({ index: "int" }, { output: "uvec4" }, ({ index: e }) => {
				t.inputs.index = e;
				let n = t.outputs.gsplat;
				return { output: zr(n, this.dynoRgbMinMaxLnScaleMinMax) };
			});
			e.programTemplate ||= new Di(Co), n = new Ei({
				graph: r,
				inputs: { index: "index" },
				outputs: { output: "target" },
				template: e.programTemplate
			}), Object.assign(n.uniforms, {
				targetLayer: { value: 0 },
				targetBase: { value: 0 },
				targetCount: { value: 0 }
			}), e.generatorProgram.set(t, n);
		}
		let r = n.prepareMaterial();
		return e.fullScreenQuad.material = r, {
			program: n,
			material: r
		};
	}
	saveRenderState(e) {
		return {
			xrEnabled: e.xr.enabled,
			autoClear: e.autoClear
		};
	}
	resetRenderState(e, t) {
		e.setRenderTarget(null), e.xr.enabled = t.xrEnabled, e.autoClear = t.autoClear;
	}
	generate({ generator: t, base: n, count: r, renderer: i }) {
		if (!this.target) throw Error("Target must be initialized with ensureSplats");
		if (n + r > this.maxSplats) throw Error("Base + count exceeds maxSplats");
		let { program: a, material: o } = this.prepareProgramMaterial(t);
		a.update();
		let s = this.saveRenderState(i), c = Math.ceil((n + r) / Y) * Y, l = Y * Gn;
		for (o.uniforms.targetBase.value = n, o.uniforms.targetCount.value = r; n < c;) {
			let t = Math.floor(n / l);
			o.uniforms.targetLayer.value = t;
			let r = t * l, a = Math.floor((n - r) / Y), s = Math.min(Gn, Math.ceil((c - r) / Y));
			this.target.scissor.set(0, a, Y, s - a), i.setRenderTarget(this.target, t), i.xr.enabled = !1, i.autoClear = !1, e.fullScreenQuad.render(i), n += Y * (s - a);
		}
		return this.resetRenderState(i, s), { nextBase: c };
	}
};
To.emptySource = null, To.programTemplate = null, To.generatorProgram = /* @__PURE__ */ new Map(), To.fullScreenQuad = new qt(new Be({ visible: !1 }));
var Eo = To, Do = class extends Hr {
	constructor({ packedSplats: e } = {}) {
		super({
			key: "packedSplats",
			type: Tr,
			globals: () => [Mr],
			value: {
				texture: Eo.getEmpty(),
				numSplats: 0,
				rgbMinMaxLnScaleMinMax: new V(0, 1, -12, 9)
			},
			update: (e) => (e.texture = this.packedSplats?.getTexture() ?? Eo.getEmpty(), e.numSplats = this.packedSplats?.numSplats ?? 0, e.rgbMinMaxLnScaleMinMax.set(this.packedSplats?.splatEncoding?.rgbMin ?? 0, this.packedSplats?.splatEncoding?.rgbMax ?? 1, this.packedSplats?.splatEncoding?.lnScaleMin ?? -12, this.packedSplats?.splatEncoding?.lnScaleMax ?? 9), e)
		}), this.packedSplats = e;
	}
}, Oo = class extends g {
	constructor(e, t) {
		super(), this.ordering = e, this.setAttribute("position", new F(ko, 3)), this.setIndex(new F(Ao, 1)), this._maxInstanceCount = e.length, this.instanceCount = t, this.attribute = new te(e, 1, !1, 1), this.attribute.setUsage(m), this.setAttribute("splatIndex", this.attribute);
	}
	update(e, t) {
		this.ordering = e, this.attribute.array = e, this.instanceCount = t, this.attribute.addUpdateRange(0, t), this.attribute.needsUpdate = !0;
	}
}, ko = new Float32Array([
	-1,
	-1,
	0,
	1,
	-1,
	0,
	1,
	1,
	0,
	-1,
	1,
	0
]), Ao = new Uint16Array([
	0,
	1,
	2,
	0,
	2,
	3
]), jo = class e {
	constructor(e) {
		if (this.lastTime = null, this.encodeLinear = !1, this.superXY = 1, this.display = null, this.sorting = null, this.pending = null, this.sortingCheck = !1, this.readback16 = /* @__PURE__ */ new Uint16Array(), this.readback32 = /* @__PURE__ */ new Uint32Array(), this.spark = e.spark, this.camera = e.camera, this.viewToWorld = e.viewToWorld ?? new se(), e.target) {
			let { width: t, height: n, doubleBuffer: r } = e.target, i = Math.max(1, Math.min(4, e.target.superXY ?? 1));
			if (this.superXY = i, t * i > 8192 || n * i > 8192) throw Error("Target size too large");
			this.target = new Ae(t * i, n * i, {
				format: He,
				type: s,
				colorSpace: ye
			}), r && (this.back = new Ae(t * i, n * i, {
				format: He,
				type: s,
				colorSpace: ye
			})), this.encodeLinear = !0;
		}
		this.onTextureUpdated = e.onTextureUpdated, this.sortRadial = e.sortRadial ?? !0, this.sortDistance = e.sortDistance, this.sortCoorient = e.sortCoorient, this.depthBias = e.depthBias, this.sort360 = e.sort360, this.sort32 = e.sort32, this.stochastic = e.stochastic ?? !1, this.orderingFreelist = new li({
			allocate: (e) => new Uint32Array(e),
			valid: (e, t) => e.length === t
		}), this.autoUpdate = !1, this.setAutoUpdate(e.autoUpdate ?? !1);
	}
	dispose() {
		this.setAutoUpdate(!1), this.target &&= (this.target.dispose(), void 0), this.back &&= (this.back.dispose(), void 0), this.display &&= (this.spark.releaseAccumulator(this.display.accumulator), this.display.geometry.dispose(), null), this.pending?.accumulator && (this.spark.releaseAccumulator(this.pending.accumulator), this.pending = null);
	}
	setAutoUpdate(e) {
		!this.autoUpdate && e ? this.spark.autoViewpoints.push(this) : this.autoUpdate && !e && (this.spark.autoViewpoints = this.spark.autoViewpoints.filter((e) => e !== this)), this.autoUpdate = e;
	}
	async prepare({ scene: e, camera: t, viewToWorld: n, update: r, forceOrigin: i }) {
		for (n ? this.viewToWorld = n : (this.camera = t ?? this.camera, this.camera && (this.camera.updateMatrixWorld(), this.viewToWorld = this.camera.matrixWorld.clone())); r ?? !0;) {
			let t = i ? this.viewToWorld : void 0;
			if (this.spark.updateInternal({
				scene: e,
				originToWorld: t
			})) break;
			await new Promise((e) => setTimeout(e, 10));
		}
		let a = this.spark.active;
		a !== this.display?.accumulator && (this.spark.active.refCount += 1), await this.sortUpdate({
			accumulator: a,
			viewToWorld: this.viewToWorld
		});
	}
	renderTarget({ scene: e, camera: t }) {
		var n;
		let r = this.back ?? this.target;
		if (!r) throw Error("Must initialize SparkViewpoint with target");
		if (t ??= this.camera, !t) throw Error("Must provide camera");
		if (t instanceof re) {
			let e = new re().copy(t, !1);
			e.aspect = r.width / r.height, e.updateProjectionMatrix(), t = e;
		}
		this.viewToWorld = t.matrixWorld.clone();
		try {
			this.spark.renderer.setRenderTarget(r), this.spark.prepareViewpoint(this), this.spark.renderer.render(e, t);
		} finally {
			this.spark.prepareViewpoint(this.spark.defaultView), this.spark.renderer.setRenderTarget(null);
		}
		r !== this.target && ([this.target, this.back] = [this.back, this.target]), (n = this.onTextureUpdated) == null || n.call(this, r.texture);
	}
	async readTarget() {
		if (!this.target) throw Error("Must initialize SparkViewpoint with target");
		let { width: e, height: t } = this.target, n = e * t * 4;
		(!this.superPixels || this.superPixels.length < n) && (this.superPixels = new Uint8Array(n)), await this.spark.renderer.readRenderTargetPixelsAsync(this.target, 0, 0, e, t, this.superPixels);
		let { superXY: r } = this;
		if (r === 1) return this.superPixels;
		let i = e / r, a = t / r, o = i * a * 4;
		(!this.pixels || this.pixels.length < o) && (this.pixels = new Uint8Array(o));
		let { superPixels: s, pixels: c } = this, l = r * r;
		for (let e = 0; e < a; e++) {
			let t = e * i;
			for (let n = 0; n < i; n++) {
				let i = n * r, a = 0, o = 0, u = 0, d = 0;
				for (let t = 0; t < r; t++) {
					let n = (e * r + t) * this.target.width;
					for (let e = 0; e < r; e++) {
						let t = (n + i + e) * 4;
						a += s[t], o += s[t + 1], u += s[t + 2], d += s[t + 3];
					}
				}
				let f = (t + n) * 4;
				c[f] = a / l, c[f + 1] = o / l, c[f + 2] = u / l, c[f + 3] = d / l;
			}
		}
		return c;
	}
	async prepareRenderPixels({ scene: e, camera: t, viewToWorld: n, update: r, forceOrigin: i }) {
		return await this.prepare({
			scene: e,
			camera: t,
			viewToWorld: n,
			update: r,
			forceOrigin: i
		}), this.renderTarget({
			scene: e,
			camera: t
		}), this.readTarget();
	}
	autoPoll({ accumulator: e }) {
		this.camera && (this.camera.updateMatrixWorld(), this.viewToWorld = this.camera.matrixWorld.clone());
		let t = !1, n = !1;
		if (!this.display) t = !0;
		else if (e) {
			t = !0;
			let { mappingVersion: r } = this.display.accumulator;
			e.mappingVersion === r && (e.refCount += 1, this.spark.releaseAccumulator(this.display.accumulator), this.display.accumulator = e, this.display.viewToWorld.copy(this.viewToWorld), n = !0, this.spark.viewpoint === this && this.spark.prepareViewpoint(this));
		}
		let r = this.sorting?.viewToWorld ?? this.display?.viewToWorld;
		r && !bi({
			matrix1: this.viewToWorld,
			matrix2: r,
			maxDistance: this.sortDistance ?? .01,
			minCoorient: this.sortCoorient ?? this.sortRadial ? .99 : .999
		}) && (t = !0), t && (e && (e.refCount += 1), this.pending?.accumulator && this.spark.releaseAccumulator(this.pending.accumulator), this.pending = {
			accumulator: e,
			viewToWorld: this.viewToWorld,
			displayed: n
		}, this.driveSort());
	}
	async driveSort() {
		for (;;) {
			if (this.sorting || !this.pending) return;
			let { viewToWorld: e, displayed: t } = this.pending, n = this.pending.accumulator;
			if (n || (n = this.display?.accumulator ?? this.spark.active, n.refCount += 1), this.pending = null, !n) throw Error("No accumulator to sort");
			this.sorting = { viewToWorld: e }, await this.sortUpdate({
				accumulator: n,
				viewToWorld: e,
				displayed: t
			}), this.sorting = null, this.spark.releaseAccumulator(n);
		}
	}
	async sortUpdate({ accumulator: t, viewToWorld: n, displayed: r = !1 }) {
		if (this.sortingCheck) throw Error("Only one sort at a time");
		this.sortingCheck = !0, t ??= this.spark.active;
		let { numSplats: i, maxSplats: a } = t.splats, o = 0, s = this.orderingFreelist.alloc(a);
		if (this.stochastic) {
			o = i;
			for (let e = 0; e < i; ++e) s[e] = e;
		} else if (i > 0) {
			let { reader: r, doubleSortReader: c, sort32Reader: l, dynoSortRadial: u, dynoOrigin: d, dynoDirection: f, dynoDepthBias: p, dynoSort360: m, dynoSplats: h } = e.makeSorter(), g = this.sort32 ?? !1, _;
			if (g) this.readback32 = r.ensureBuffer(a, this.readback32), _ = this.readback32;
			else {
				let e = Math.ceil(a / 2);
				this.readback16 = r.ensureBuffer(e, this.readback16), _ = this.readback16;
			}
			let v = t.toWorld.clone().invert(), y = n.clone().premultiply(v);
			u.value = this.sort360 ? !0 : this.sortRadial, d.value.set(0, 0, 0).applyMatrix4(y), f.value.set(0, 0, -1).applyMatrix4(y).sub(d.value).normalize(), p.value = this.depthBias ?? 1, m.value = this.sort360 ?? !1, h.packedSplats = t.splats;
			let b = g ? l : c, x = g ? i : Math.ceil(i / 2);
			await r.renderReadback({
				renderer: this.spark.renderer,
				reader: b,
				count: x,
				readback: _
			});
			let S = await mo(async (e) => {
				let t = g ? "sort32Splats" : "sortDoubleSplats";
				return e.call(t, {
					maxSplats: a,
					numSplats: i,
					readback: _,
					ordering: s
				});
			});
			g ? this.readback32 = S.readback : this.readback16 = S.readback, s = S.ordering, o = S.activeSplats;
		}
		this.updateDisplay({
			accumulator: t,
			viewToWorld: n,
			ordering: s,
			activeSplats: o,
			displayed: r
		}), this.sortingCheck = !1;
	}
	updateDisplay({ accumulator: e, viewToWorld: t, ordering: n, activeSplats: r, displayed: i = !1 }) {
		if (!this.display) e.refCount += 1, this.display = {
			accumulator: e,
			viewToWorld: t,
			geometry: new Oo(n, r)
		};
		else {
			!i && e !== this.display.accumulator && (e.refCount += 1, this.spark.releaseAccumulator(this.display.accumulator), this.display.accumulator = e), this.display.viewToWorld = t;
			let a = this.display.geometry.ordering;
			a.length === n.length ? this.display.geometry.update(n, r) : (this.display.geometry.dispose(), this.display.geometry = new Oo(n, r)), this.orderingFreelist.free(a);
		}
		this.spark.viewpoint === this && this.spark.prepareViewpoint(this);
	}
	static makeSorter() {
		if (!e.dynos) {
			let t = new Ur({ value: !0 }), n = new qr({ value: new z() }), r = new qr({ value: new z() }), i = new Gr({ value: 1 }), a = new Ur({ value: !1 }), o = new Do(), s = new sa(), c = _r({ index: "int" }, { rgba8: "vec4" }, ({ index: e }) => {
				if (!e) throw Error("No index");
				let s = {
					sortRadial: t,
					sortOrigin: n,
					sortDirection: r,
					sortDepthBias: i,
					sort360: a
				}, c = Fi(e, dr("int", 2));
				return { rgba8: Vi(Bi(qi({
					vectorType: "vec2",
					x: Po({
						gsplat: Er(o, c),
						...s
					}),
					y: Po({
						gsplat: Er(o, Ni(c, dr("int", 1))),
						...s
					})
				}))) };
			}), l = _r({ index: "int" }, { rgba8: "vec4" }, ({ index: e }) => {
				if (!e) throw Error("No index");
				let s = {
					sortRadial: t,
					sortOrigin: n,
					sortDirection: r,
					sortDepthBias: i,
					sort360: a
				};
				return { rgba8: Vi(zi(Po({
					gsplat: Er(o, e),
					...s
				}))) };
			});
			e.dynos = {
				dynoSortRadial: t,
				dynoOrigin: n,
				dynoDirection: r,
				dynoDepthBias: i,
				dynoSort360: a,
				dynoSplats: o,
				reader: s,
				doubleSortReader: c,
				sort32Reader: l
			};
		}
		return e.dynos;
	}
};
jo.EMPTY_TEXTURE = new T(), jo.dynos = null;
var Mo = jo, No = xr("\n  float computeSort(Gsplat gsplat, bool sortRadial, vec3 sortOrigin, vec3 sortDirection, float sortDepthBias, bool sort360) {\n    if (!isGsplatActive(gsplat.flags)) {\n      return INFINITY;\n    }\n\n    vec3 center = gsplat.center - sortOrigin;\n    float biasedDepth = dot(center, sortDirection) + sortDepthBias;\n    if (!sort360 && (biasedDepth <= 0.0)) {\n      return INFINITY;\n    }\n\n    return sortRadial ? length(center) : biasedDepth;\n  }\n");
function Po({ gsplat: e, sortRadial: t, sortOrigin: n, sortDirection: r, sortDepthBias: i, sort360: a }) {
	return vr({
		inTypes: {
			gsplat: wr,
			sortRadial: "bool",
			sortOrigin: "vec3",
			sortDirection: "vec3",
			sortDepthBias: "float",
			sort360: "bool"
		},
		outTypes: { metric: "float" },
		globals: () => [jr, No],
		inputs: {
			gsplat: e,
			sortRadial: t,
			sortOrigin: n,
			sortDirection: r,
			sortDepthBias: i,
			sort360: a
		},
		statements: ({ inputs: e, outputs: t }) => {
			let { gsplat: n, sortRadial: r, sortOrigin: i, sortDirection: a, sortDepthBias: o, sort360: s } = e;
			return br(`
        ${t.metric} = computeSort(${n}, ${r}, ${i}, ${a}, ${o}, ${s});
      `);
		}
	}).outputs.metric;
}
var Fo = class {
	constructor() {
		this.splats = new Eo(), this.toWorld = new se(), this.mapping = [], this.refCount = 0, this.splatsVersion = -1, this.mappingVersion = -1;
	}
	ensureGenerate(e) {
		this.splats.ensureGenerate(e) && (this.mapping = []);
	}
	generateSplats({ renderer: e, modifier: t, generators: n, forceUpdate: r, originToWorld: i }) {
		let a = this.mapping.reduce((e, t) => (e.set(t.node, t), e), /* @__PURE__ */ new Map()), o = 0, s = 0;
		for (let { node: i, generator: c, version: l, base: u, count: d } of n) {
			let n = a.get(i);
			if ((r || c !== n?.generator || l !== n?.version || u !== n?.base || d !== n?.count) && c && d > 0) {
				let n = t.apply(c);
				try {
					this.splats.generate({
						generator: n,
						base: u,
						count: d,
						renderer: e
					});
				} catch (e) {
					i.generator = void 0, i.generatorError = e;
				}
				o += 1;
			}
			s = Math.max(s, u + d);
		}
		return this.splats.numSplats = s, this.toWorld.copy(i), this.mapping = n, o !== 0;
	}
	hasCorrespondence(e) {
		return this.mapping.length === e.mapping.length && this.mapping.every(({ node: t, base: n, count: r }, i) => {
			let { node: a, base: o, count: s } = e.mapping[i];
			return t === a && n === o && r === s;
		});
	}
}, Io = "const float LN_SCALE_MIN = -12.0;\nconst float LN_SCALE_MAX = 9.0;\n\nconst uint SPLAT_TEX_WIDTH_BITS = 11u;\nconst uint SPLAT_TEX_HEIGHT_BITS = 11u;\nconst uint SPLAT_TEX_DEPTH_BITS = 11u;\nconst uint SPLAT_TEX_LAYER_BITS = SPLAT_TEX_WIDTH_BITS + SPLAT_TEX_HEIGHT_BITS;\n\nconst uint SPLAT_TEX_WIDTH = 1u << SPLAT_TEX_WIDTH_BITS;\nconst uint SPLAT_TEX_HEIGHT = 1u << SPLAT_TEX_HEIGHT_BITS;\nconst uint SPLAT_TEX_DEPTH = 1u << SPLAT_TEX_DEPTH_BITS;\n\nconst uint SPLAT_TEX_WIDTH_MASK = SPLAT_TEX_WIDTH - 1u;\nconst uint SPLAT_TEX_HEIGHT_MASK = SPLAT_TEX_HEIGHT - 1u;\nconst uint SPLAT_TEX_DEPTH_MASK = SPLAT_TEX_DEPTH - 1u;\n\nconst uint F16_INF = 0x7c00u;\nconst float PI = 3.1415926535897932384626433832795;\n\nconst float INFINITY = 1.0 / 0.0;\nconst float NEG_INFINITY = -INFINITY;\n\nfloat sqr(float x) {\n    return x * x;\n}\n\nfloat pow4(float x) {\n    float x2 = x * x;\n    return x2 * x2;\n}\n\nfloat pow8(float x) {\n    float x4 = pow4(x);\n    return x4 * x4;\n}\n\nvec3 srgbToLinear(vec3 rgb) {\n    return pow(rgb, vec3(2.2));\n}\n\nvec3 linearToSrgb(vec3 rgb) {\n    return pow(rgb, vec3(1.0 / 2.2));\n}\n\nuint encodeQuatOctXy88R8(vec4 q) {\n    \n    if (q.w < 0.0) {\n        q = -q;\n    }\n    \n    float theta = 2.0 * acos(q.w);\n    float halfTheta = theta * 0.5;\n    float s = sin(halfTheta);\n    \n    vec3 axis = (abs(s) < 1e-6) ? vec3(1.0, 0.0, 0.0) : q.xyz / s;\n    \n    \n    \n    float sum = abs(axis.x) + abs(axis.y) + abs(axis.z);\n    vec2 p = vec2(axis.x, axis.y) / sum;\n    \n    if (axis.z < 0.0) {\n        float oldPx = p.x;\n        p.x = (1.0 - abs(p.y)) * (p.x >= 0.0 ? 1.0 : -1.0);\n        p.y = (1.0 - abs(oldPx)) * (p.y >= 0.0 ? 1.0 : -1.0);\n    }\n    \n    float u_f = p.x * 0.5 + 0.5;\n    float v_f = p.y * 0.5 + 0.5;\n    \n    uint quantU = uint(clamp(round(u_f * 255.0), 0.0, 255.0));\n    uint quantV = uint(clamp(round(v_f * 255.0), 0.0, 255.0));\n    \n    \n    \n    uint angleInt = uint(clamp(round((theta / 3.14159265359) * 255.0), 0.0, 255.0));\n    \n    \n    return (angleInt << 16u) | (quantV << 8u) | quantU;\n}\n\nvec4 decodeQuatOctXy88R8(uint encoded) {\n    \n    uint quantU = encoded & uint(0xFFu);               \n    uint quantV = (encoded >> 8u) & uint(0xFFu);         \n    uint angleInt = encoded >> 16u;                      \n\n    \n    float u_f = float(quantU) / 255.0;\n    float v_f = float(quantV) / 255.0;\n    vec2 f = vec2(u_f * 2.0 - 1.0, v_f * 2.0 - 1.0);\n\n    vec3 axis = vec3(f.xy, 1.0 - abs(f.x) - abs(f.y));\n    float t = max(-axis.z, 0.0);\n    axis.x += (axis.x >= 0.0) ? -t : t;\n    axis.y += (axis.y >= 0.0) ? -t : t;\n    axis = normalize(axis);\n    \n    \n    float theta = (float(angleInt) / 255.0) * 3.14159265359;\n    float halfTheta = theta * 0.5;\n    float s = sin(halfTheta);\n    float w = cos(halfTheta);\n    \n    return vec4(axis * s, w);\n}\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\nuvec4 packSplatEncoding(\n    vec3 center, vec3 scales, vec4 quaternion, vec4 rgba, vec4 rgbMinMaxLnScaleMinMax\n) {\n    float rgbMin = rgbMinMaxLnScaleMinMax.x;\n    float rgbMax = rgbMinMaxLnScaleMinMax.y;\n    vec3 encRgb = (rgba.rgb - vec3(rgbMin)) / (rgbMax - rgbMin);\n    uvec4 uRgba = uvec4(round(clamp(vec4(encRgb, rgba.a) * 255.0, 0.0, 255.0)));\n\n    uint uQuat = encodeQuatOctXy88R8(quaternion);\n    \n    \n    uvec3 uQuat3 = uvec3(uQuat & 0xffu, (uQuat >> 8u) & 0xffu, (uQuat >> 16u) & 0xffu);\n\n    \n    float lnScaleMin = rgbMinMaxLnScaleMinMax.z;\n    float lnScaleMax = rgbMinMaxLnScaleMinMax.w;\n    float lnScaleScale = 254.0 / (lnScaleMax - lnScaleMin);\n    uvec3 uScales = uvec3(\n        (scales.x == 0.0) ? 0u : uint(round(clamp((log(scales.x) - lnScaleMin) * lnScaleScale, 0.0, 254.0))) + 1u,\n        (scales.y == 0.0) ? 0u : uint(round(clamp((log(scales.y) - lnScaleMin) * lnScaleScale, 0.0, 254.0))) + 1u,\n        (scales.z == 0.0) ? 0u : uint(round(clamp((log(scales.z) - lnScaleMin) * lnScaleScale, 0.0, 254.0))) + 1u\n    );\n\n    \n    uint word0 = uRgba.r | (uRgba.g << 8u) | (uRgba.b << 16u) | (uRgba.a << 24u);\n    uint word1 = packHalf2x16(center.xy);\n    uint word2 = packHalf2x16(vec2(center.z, 0.0)) | (uQuat3.x << 16u) | (uQuat3.y << 24u);\n    uint word3 = uScales.x | (uScales.y << 8u) | (uScales.z << 16u) | (uQuat3.z << 24u);\n    return uvec4(word0, word1, word2, word3);\n}\n\nuvec4 packSplat(vec3 center, vec3 scales, vec4 quaternion, vec4 rgba) {\n    return packSplatEncoding(center, scales, quaternion, rgba, vec4(0.0, 1.0, LN_SCALE_MIN, LN_SCALE_MAX));\n}\n\nvoid unpackSplatEncoding(uvec4 packed, out vec3 center, out vec3 scales, out vec4 quaternion, out vec4 rgba, vec4 rgbMinMaxLnScaleMinMax) {\n    uint word0 = packed.x, word1 = packed.y, word2 = packed.z, word3 = packed.w;\n\n    uvec4 uRgba = uvec4(word0 & 0xffu, (word0 >> 8u) & 0xffu, (word0 >> 16u) & 0xffu, (word0 >> 24u) & 0xffu);\n    float rgbMin = rgbMinMaxLnScaleMinMax.x;\n    float rgbMax = rgbMinMaxLnScaleMinMax.y;\n    rgba = (vec4(uRgba) / 255.0);\n    rgba.rgb = rgba.rgb * (rgbMax - rgbMin) + rgbMin;\n\n    center = vec4(\n        unpackHalf2x16(word1),\n        unpackHalf2x16(word2 & 0xffffu)\n    ).xyz;\n\n    uvec3 uScales = uvec3(word3 & 0xffu, (word3 >> 8u) & 0xffu, (word3 >> 16u) & 0xffu);\n    float lnScaleMin = rgbMinMaxLnScaleMinMax.z;\n    float lnScaleMax = rgbMinMaxLnScaleMinMax.w;\n    float lnScaleScale = (lnScaleMax - lnScaleMin) / 254.0;\n    scales = vec3(\n        (uScales.x == 0u) ? 0.0 : exp(lnScaleMin + float(uScales.x - 1u) * lnScaleScale),\n        (uScales.y == 0u) ? 0.0 : exp(lnScaleMin + float(uScales.y - 1u) * lnScaleScale),\n        (uScales.z == 0u) ? 0.0 : exp(lnScaleMin + float(uScales.z - 1u) * lnScaleScale)\n    );\n\n    uint uQuat = ((word2 >> 16u) & 0xFFFFu) | ((word3 >> 8u) & 0xFF0000u);\n    quaternion = decodeQuatOctXy88R8(uQuat);\n    \n    \n}\n\nvoid unpackSplat(uvec4 packed, out vec3 center, out vec3 scales, out vec4 quaternion, out vec4 rgba) {\n    unpackSplatEncoding(packed, center, scales, quaternion, rgba, vec4(0.0, 1.0, LN_SCALE_MIN, LN_SCALE_MAX));\n}\n\nvec3 quatVec(vec4 q, vec3 v) {\n    \n    vec3 t = 2.0 * cross(q.xyz, v);\n    return v + q.w * t + cross(q.xyz, t);\n}\n\nvec4 quatQuat(vec4 q1, vec4 q2) {\n    return vec4(\n        q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,\n        q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,\n        q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w,\n        q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z\n    );\n}\n\nmat3 scaleQuaternionToMatrix(vec3 s, vec4 q) {\n    \n    return mat3(\n        s.x * (1.0 - 2.0 * (q.y * q.y + q.z * q.z)),\n        s.x * (2.0 * (q.x * q.y + q.w * q.z)),\n        s.x * (2.0 * (q.x * q.z - q.w * q.y)),\n        s.y * (2.0 * (q.x * q.y - q.w * q.z)),\n        s.y * (1.0 - 2.0 * (q.x * q.x + q.z * q.z)),\n        s.y * (2.0 * (q.y * q.z + q.w * q.x)),\n        s.z * (2.0 * (q.x * q.z + q.w * q.y)),\n        s.z * (2.0 * (q.y * q.z - q.w * q.x)),\n        s.z * (1.0 - 2.0 * (q.x * q.x + q.y * q.y))\n    );\n}\n\nvec4 slerp(vec4 q1, vec4 q2, float t) {\n    \n    float cosHalfTheta = dot(q1, q2);\n\n    \n    if (abs(cosHalfTheta) >= 0.999) {\n        return q1;\n    }\n    \n    \n    \n    if (cosHalfTheta < 0.0) {\n        q2 = -q2;\n        cosHalfTheta = -cosHalfTheta;\n    }\n\n    \n    float halfTheta = acos(cosHalfTheta);\n    float sinHalfTheta = sqrt(1.0 - cosHalfTheta * cosHalfTheta);\n\n    \n    float ratioA = sin((1.0 - t) * halfTheta) / sinHalfTheta;\n    float ratioB = sin(t * halfTheta) / sinHalfTheta;\n\n    \n    return q1 * ratioA + q2 * ratioB;\n}\n\nivec3 splatTexCoord(int index) {\n    uint x = uint(index) & SPLAT_TEX_WIDTH_MASK;\n    uint y = (uint(index) >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK;\n    uint z = uint(index) >> SPLAT_TEX_LAYER_BITS;\n    return ivec3(x, y, z);\n}", Lo = "precision highp float;\nprecision highp int;\n\n#include <splatDefines>\n#include <logdepthbuf_pars_fragment>\n\nuniform float near;\nuniform float far;\nuniform bool encodeLinear;\nuniform float time;\nuniform bool debugFlag;\nuniform float maxStdDev;\nuniform float minAlpha;\nuniform bool stochastic;\nuniform bool disableFalloff;\nuniform float falloff;\n\nuniform bool splatTexEnable;\nuniform sampler3D splatTexture;\nuniform mat2 splatTexMul;\nuniform vec2 splatTexAdd;\nuniform float splatTexNear;\nuniform float splatTexFar;\nuniform float splatTexMid;\n\nout vec4 fragColor;\n\nin vec4 vRgba;\nin vec2 vSplatUv;\nin vec3 vNdc;\nflat in uint vSplatIndex;\n\nvoid main() {\n    vec4 rgba = vRgba;\n\n    float z = dot(vSplatUv, vSplatUv);\n    if (!splatTexEnable) {\n        if (z > (maxStdDev * maxStdDev)) {\n            discard;\n        }\n    } else {\n        vec2 uv = splatTexMul * vSplatUv + splatTexAdd;\n        float ndcZ = vNdc.z;\n        float depth = (2.0 * near * far) / (far + near - ndcZ * (far - near));\n        float clampedFar = max(splatTexFar, splatTexNear);\n        float clampedDepth = clamp(depth, splatTexNear, clampedFar);\n        float logDepth = log2(clampedDepth + 1.0);\n        float logNear = log2(splatTexNear + 1.0);\n        float logFar = log2(clampedFar + 1.0);\n\n        float texZ;\n        if (splatTexMid > 0.0) {\n            float clampedMid = clamp(splatTexMid, splatTexNear, clampedFar);\n            float logMid = log2(clampedMid + 1.0);\n            texZ = (clampedDepth <= clampedMid) ?\n                (0.5 * ((logDepth - logNear) / (logMid - logNear))) :\n                (0.5 * ((logDepth - logMid) / (logFar - logMid)) + 0.5);\n        } else {\n            texZ = (logDepth - logNear) / (logFar - logNear);\n        }\n\n        vec4 modulate = texture(splatTexture, vec3(uv, 1.0 - texZ));\n        rgba *= modulate;\n    }\n\n    rgba.a *= mix(1.0, exp(-0.5 * z), falloff);\n\n    if (rgba.a < minAlpha) {\n        discard;\n    }\n    if (encodeLinear) {\n        rgba.rgb = srgbToLinear(rgba.rgb);\n    }\n\n    if (stochastic) {\n        const bool STEADY = false;\n        uint uTime = STEADY ? 0u : floatBitsToUint(time);\n        uvec2 coord = uvec2(gl_FragCoord.xy);\n        uint state = uTime + 0x9e3779b9u * coord.x + 0x85ebca6bu * coord.y + 0xc2b2ae35u * uint(vSplatIndex);\n        state = state * 747796405u + 2891336453u;\n        uint hash = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;\n        hash = (hash >> 22u) ^ hash;\n        float rand = float(hash) / 4294967296.0;\n        if (rand < rgba.a) {\n            fragColor = vec4(rgba.rgb, 1.0);\n        } else {\n            discard;\n        }\n    } else {\n        #ifdef PREMULTIPLIED_ALPHA\n            fragColor = vec4(rgba.rgb * rgba.a, rgba.a);\n        #else\n            fragColor = rgba;\n        #endif\n    }\n    #include <logdepthbuf_fragment>\n}", Ro = "precision highp float;\nprecision highp int;\nprecision highp usampler2DArray;\n\n#include <splatDefines>\n#include <logdepthbuf_pars_vertex>\n\nattribute uint splatIndex;\n\nout vec4 vRgba;\nout vec2 vSplatUv;\nout vec3 vNdc;\nflat out uint vSplatIndex;\n\nuniform vec2 renderSize;\nuniform uint numSplats;\nuniform vec4 renderToViewQuat;\nuniform vec3 renderToViewPos;\nuniform float maxStdDev;\nuniform float minPixelRadius;\nuniform float maxPixelRadius;\nuniform float time;\nuniform float deltaTime;\nuniform bool debugFlag;\nuniform float minAlpha;\nuniform bool stochastic;\nuniform bool enable2DGS;\nuniform float blurAmount;\nuniform float preBlurAmount;\nuniform float focalDistance;\nuniform float apertureAngle;\nuniform float clipXY;\nuniform float focalAdjustment;\n\nuniform usampler2DArray packedSplats;\nuniform vec4 rgbMinMaxLnScaleMinMax;\n\n#ifdef USE_LOGDEPTHBUF\n    bool isPerspectiveMatrix( mat4 m ) {\n      return m[ 2 ][ 3 ] == - 1.0;\n    }\n#endif\n\nvoid main() {\n    \n    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);\n\n    if (uint(gl_InstanceID) >= numSplats) {\n        return;\n    }\n\n    ivec3 texCoord;\n    if (stochastic) {\n        texCoord = ivec3(\n            uint(gl_InstanceID) & SPLAT_TEX_WIDTH_MASK,\n            (uint(gl_InstanceID) >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK,\n            (uint(gl_InstanceID) >> SPLAT_TEX_LAYER_BITS)\n        );\n    } else {\n        if (splatIndex == 0xffffffffu) {\n            \n            return;\n        }\n        texCoord = ivec3(\n            splatIndex & SPLAT_TEX_WIDTH_MASK,\n            (splatIndex >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK,\n            splatIndex >> SPLAT_TEX_LAYER_BITS\n        );\n    }\n    uvec4 packed = texelFetch(packedSplats, texCoord, 0);\n\n    vec3 center, scales;\n    vec4 quaternion, rgba;\n    unpackSplatEncoding(packed, center, scales, quaternion, rgba, rgbMinMaxLnScaleMinMax);\n\n    if (rgba.a < minAlpha) {\n        return;\n    }\n    bvec3 zeroScales = equal(scales, vec3(0.0));\n    if (all(zeroScales)) {\n        return;\n    }\n\n    \n    vec3 viewCenter = quatVec(renderToViewQuat, center) + renderToViewPos;\n\n    \n    if (viewCenter.z >= 0.0) {\n        return;\n    }\n\n    \n    vec4 clipCenter = projectionMatrix * vec4(viewCenter, 1.0);\n\n    \n    if (abs(clipCenter.z) >= clipCenter.w) {\n        return;\n    }\n\n    \n    float clip = clipXY * clipCenter.w;\n    if (abs(clipCenter.x) > clip || abs(clipCenter.y) > clip) {\n        return;\n    }\n\n    \n    vSplatIndex = splatIndex;\n\n    \n    vec4 viewQuaternion = quatQuat(renderToViewQuat, quaternion);\n\n    if (enable2DGS && any(zeroScales)) {\n        vRgba = rgba;\n        vSplatUv = position.xy * maxStdDev;\n\n        vec3 offset;\n        if (zeroScales.z) {\n            offset = vec3(vSplatUv.xy * scales.xy, 0.0);\n        } else if (zeroScales.y) {\n            offset = vec3(vSplatUv.x * scales.x, 0.0, vSplatUv.y * scales.z);\n        } else {\n            offset = vec3(0.0, vSplatUv.xy * scales.yz);\n        }\n\n        vec3 viewPos = viewCenter + quatVec(viewQuaternion, offset);\n        gl_Position = projectionMatrix * vec4(viewPos, 1.0);\n        vNdc = gl_Position.xyz / gl_Position.w;\n        return;\n    }\n\n    \n    vec3 ndcCenter = clipCenter.xyz / clipCenter.w;\n\n    \n    mat3 RS = scaleQuaternionToMatrix(scales, viewQuaternion);\n    mat3 cov3D = RS * transpose(RS);\n\n    \n    vec2 scaledRenderSize = renderSize * focalAdjustment;\n    vec2 focal = 0.5 * scaledRenderSize * vec2(projectionMatrix[0][0], projectionMatrix[1][1]);\n\n    mat3 J;\n    if(isOrthographic) {\n        J = mat3(\n            focal.x, 0.0, 0.0,\n            0.0, focal.y, 0.0,\n            0.0, 0.0, 0.0\n        );\n    } else {\n        float invZ = 1.0 / viewCenter.z;\n        vec2 J1 = focal * invZ;\n        vec2 J2 = -(J1 * viewCenter.xy) * invZ;\n        J = mat3(\n            J1.x, 0.0, J2.x,\n            0.0, J1.y, J2.y,\n            0.0, 0.0, 0.0\n        );\n    }\n\n    \n    \n    \n    \n    \n    \n    \n    mat3 cov2D = transpose(J) * cov3D * J;\n    float a = cov2D[0][0];\n    float d = cov2D[1][1];\n    float b = cov2D[0][1];\n\n    \n    a += preBlurAmount;\n    d += preBlurAmount;\n\n    float fullBlurAmount = blurAmount;\n    if ((focalDistance > 0.0) && (apertureAngle > 0.0)) {\n        float focusRadius = maxPixelRadius;\n        if (viewCenter.z < 0.0) {\n            float focusBlur = abs((-viewCenter.z - focalDistance) / viewCenter.z);\n            float apertureRadius = focal.x * tan(0.5 * apertureAngle);\n            focusRadius = focusBlur * apertureRadius;\n        }\n        fullBlurAmount = clamp(sqr(focusRadius), blurAmount, sqr(maxPixelRadius));\n    }\n\n    \n    float detOrig = a * d - b * b;\n    a += fullBlurAmount;\n    d += fullBlurAmount;\n    float det = a * d - b * b;\n\n    \n    float blurAdjust = sqrt(max(0.0, detOrig / det));\n    rgba.a *= blurAdjust;\n    if (rgba.a < minAlpha) {\n        return;\n    }\n\n    \n    float eigenAvg = 0.5 * (a + d);\n    float eigenDelta = sqrt(max(0.0, eigenAvg * eigenAvg - det));\n    float eigen1 = eigenAvg + eigenDelta;\n    float eigen2 = eigenAvg - eigenDelta;\n\n    vec2 eigenVec1 = normalize(vec2((abs(b) < 0.001) ? 1.0 : b, eigen1 - a));\n    vec2 eigenVec2 = vec2(eigenVec1.y, -eigenVec1.x);\n\n    float scale1 = min(maxPixelRadius, maxStdDev * sqrt(eigen1));\n    float scale2 = min(maxPixelRadius, maxStdDev * sqrt(eigen2));\n    if (scale1 < minPixelRadius && scale2 < minPixelRadius) {\n        return;\n    }\n\n    \n    vec2 pixelOffset = position.x * eigenVec1 * scale1 + position.y * eigenVec2 * scale2;\n    vec2 ndcOffset = (2.0 / scaledRenderSize) * pixelOffset;\n    vec3 ndc = vec3(ndcCenter.xy + ndcOffset, ndcCenter.z);\n\n    vRgba = rgba;\n    vSplatUv = position.xy * maxStdDev;\n    vNdc = ndc;\n    gl_Position = vec4(ndc.xy * clipCenter.w, clipCenter.zw);\n    #include <logdepthbuf_vertex>\n}", zo = null;
function Bo() {
	return zo ||= (me.splatDefines = Io, {
		splatVertex: Ro,
		splatFragment: Lo
	}), zo;
}
var Vo = 5, Ho = class e extends xe {
	constructor(t) {
		let n = e.makeUniforms(), r = Bo(), i = t.premultipliedAlpha ?? !0, a = new _e({
			glslVersion: o,
			vertexShader: r.splatVertex,
			fragmentShader: r.splatFragment,
			uniforms: n,
			premultipliedAlpha: i,
			transparent: !0,
			depthTest: !0,
			depthWrite: !1,
			side: 2
		});
		super(Wo, a), this.splatTexture = null, this.autoViewpoints = [], this.rotateToAccumulator = new Jr({ value: new U() }), this.translateToAccumulator = new qr({ value: new z() }), this.lastFrame = -1, this.lastUpdateTime = null, this.defaultCameras = [], this.lastStochastic = null, this.pendingUpdate = {
			scene: null,
			originToWorld: new se(),
			timeoutId: -1
		}, this.envViewpoint = null, this.frustumCulled = !1, this.renderer = t.renderer, this.material = a, this.uniforms = n;
		let s = _r({ gsplat: wr }, { gsplat: wr }, ({ gsplat: e }) => {
			if (!e) throw Error("gsplat not defined");
			return e = Ar(e, {
				rotate: this.rotateToAccumulator,
				translate: this.translateToAccumulator
			}), { gsplat: e };
		});
		this.modifier = new wa(s), this.premultipliedAlpha = i, this.autoUpdate = t.autoUpdate ?? !0, this.preUpdate = t.preUpdate ?? !1, this.needsUpdate = !1, this.originDistance = t.originDistance ?? 1, this.maxStdDev = t.maxStdDev ?? Math.sqrt(8), this.minPixelRadius = t.minPixelRadius ?? 0, this.maxPixelRadius = t.maxPixelRadius ?? 512, this.minAlpha = t.minAlpha ?? 1 / 255 * .5, this.enable2DGS = t.enable2DGS ?? !1, this.preBlurAmount = t.preBlurAmount ?? 0, this.blurAmount = t.blurAmount ?? .3, this.focalDistance = t.focalDistance ?? 0, this.apertureAngle = t.apertureAngle ?? 0, this.falloff = t.falloff ?? 1, this.clipXY = t.clipXY ?? 1.4, this.focalAdjustment = t.focalAdjustment ?? 1, this.splatEncoding = t.splatEncoding ?? { ...wo }, this.active = new Fo(), this.active.refCount = 1, this.accumulatorCount = 1, this.freeAccumulators = [];
		for (let e = 0; e < 1; ++e) this.freeAccumulators.push(new Fo()), this.accumulatorCount += 1;
		this.defaultView = new Mo({
			...t.view,
			autoUpdate: !0,
			spark: this
		}), this.viewpoint = this.defaultView, this.prepareViewpoint(this.viewpoint), this.clock = t.clock ? hi(t.clock) : new L();
	}
	static makeUniforms() {
		return {
			renderSize: { value: new y() },
			near: { value: .1 },
			far: { value: 1e3 },
			numSplats: { value: 0 },
			renderToViewQuat: { value: new U() },
			renderToViewPos: { value: new z() },
			maxStdDev: { value: 1 },
			minPixelRadius: { value: 0 },
			maxPixelRadius: { value: 512 },
			minAlpha: { value: 1 / 255 * .5 },
			stochastic: { value: !1 },
			enable2DGS: { value: !1 },
			preBlurAmount: { value: 0 },
			blurAmount: { value: .3 },
			focalDistance: { value: 0 },
			apertureAngle: { value: 0 },
			falloff: { value: 1 },
			clipXY: { value: 1.4 },
			focalAdjustment: { value: 1 },
			splatTexEnable: { value: !1 },
			splatTexture: {
				type: "t",
				value: e.EMPTY_SPLAT_TEXTURE
			},
			splatTexMul: { value: new De() },
			splatTexAdd: { value: new y() },
			splatTexNear: { value: .1 },
			splatTexFar: { value: 1e3 },
			splatTexMid: { value: 0 },
			packedSplats: {
				type: "t",
				value: Eo.getEmpty()
			},
			rgbMinMaxLnScaleMinMax: { value: new V() },
			time: { value: 0 },
			deltaTime: { value: 0 },
			encodeLinear: { value: !1 },
			debugFlag: { value: !1 }
		};
	}
	canAllocAccumulator() {
		return this.freeAccumulators.length > 0 || this.accumulatorCount < Vo;
	}
	maybeAllocAccumulator() {
		let e = this.freeAccumulators.pop();
		if (e === void 0) {
			if (this.accumulatorCount >= Vo) return null;
			e = new Fo(), this.accumulatorCount += 1;
		}
		return e.refCount = 1, e;
	}
	releaseAccumulator(e) {
		--e.refCount, e.refCount === 0 && this.freeAccumulators.push(e);
	}
	newViewpoint(e) {
		return new Mo({
			...e,
			spark: this
		});
	}
	onBeforeRender(t, n, r) {
		let i = this.time ?? this.clock.getElapsedTime(), a = i - (this.viewpoint.lastTime ?? i);
		this.viewpoint.lastTime = i;
		let o = t.info.render.frame, s = o !== this.lastFrame;
		this.lastFrame = o;
		let c = this.viewpoint;
		if (c === this.defaultView) {
			if (s) {
				if (!t.xr.isPresenting) this.defaultView.viewToWorld = r.matrixWorld.clone(), this.defaultCameras = [this.defaultView.viewToWorld];
				else {
					let e = t.xr.getCamera().cameras;
					this.defaultCameras = e.map((e) => e.matrixWorld), this.defaultView.viewToWorld = Go(this.defaultCameras) ?? new se();
				}
			}
			this.autoUpdate && this.update({
				scene: n,
				viewToWorld: this.defaultView.viewToWorld
			});
		}
		if (s && (this.material.premultipliedAlpha !== this.premultipliedAlpha && (this.material.premultipliedAlpha = this.premultipliedAlpha, this.material.needsUpdate = !0), this.uniforms.time.value = i, this.uniforms.deltaTime.value = a, this.uniforms.debugFlag.value = performance.now() / 1e3 % 2 < 1, c.display && c.stochastic && (this.geometry.instanceCount = this.uniforms.numSplats.value)), c.target) this.uniforms.renderSize.value.set(c.target.width, c.target.height);
		else {
			let e = t.getDrawingBufferSize(this.uniforms.renderSize.value);
			if (e.x === 1 && e.y === 1) {
				let n = t.xr.getSession()?.renderState.baseLayer;
				n && (e.x = n.framebufferWidth, e.y = n.framebufferHeight);
			}
		}
		let l = r;
		if (this.uniforms.near.value = l.near, this.uniforms.far.value = l.far, this.uniforms.encodeLinear.value = c.encodeLinear, this.uniforms.maxStdDev.value = this.maxStdDev, this.uniforms.minPixelRadius.value = this.minPixelRadius, this.uniforms.maxPixelRadius.value = this.maxPixelRadius, this.uniforms.minAlpha.value = this.minAlpha, this.uniforms.stochastic.value = c.stochastic, this.uniforms.enable2DGS.value = this.enable2DGS, this.uniforms.preBlurAmount.value = this.preBlurAmount, this.uniforms.blurAmount.value = this.blurAmount, this.uniforms.focalDistance.value = this.focalDistance, this.uniforms.apertureAngle.value = this.apertureAngle, this.uniforms.falloff.value = this.falloff, this.uniforms.clipXY.value = this.clipXY, this.uniforms.focalAdjustment.value = this.focalAdjustment, this.lastStochastic !== !c.stochastic && (this.lastStochastic = !c.stochastic, this.material.transparent = !c.stochastic, this.material.depthWrite = c.stochastic, this.material.needsUpdate = !0), this.splatTexture) {
			let { enable: t, texture: n, multiply: r, add: i, near: a, far: o, mid: s } = this.splatTexture;
			t && n ? (this.uniforms.splatTexEnable.value = !0, this.uniforms.splatTexture.value = n, r ? this.uniforms.splatTexMul.value.fromArray(r.elements) : this.uniforms.splatTexMul.value.set(.5 / this.maxStdDev, 0, 0, .5 / this.maxStdDev), this.uniforms.splatTexAdd.value.set(i?.x ?? .5, i?.y ?? .5), this.uniforms.splatTexNear.value = a ?? this.uniforms.near.value, this.uniforms.splatTexFar.value = o ?? this.uniforms.far.value, this.uniforms.splatTexMid.value = s ?? 0) : (this.uniforms.splatTexEnable.value = !1, this.uniforms.splatTexture.value = e.EMPTY_SPLAT_TEXTURE);
		} else this.uniforms.splatTexEnable.value = !1, this.uniforms.splatTexture.value = e.EMPTY_SPLAT_TEXTURE;
		let u = c.display?.accumulator.toWorld ?? new se(), d = r.matrixWorld.clone().invert();
		u.clone().premultiply(d).decompose(this.uniforms.renderToViewPos.value, this.uniforms.renderToViewQuat.value, new z());
	}
	prepareViewpoint(e) {
		if (this.viewpoint = e ?? this.viewpoint, this.viewpoint.display) {
			let { accumulator: e, geometry: t } = this.viewpoint.display;
			this.uniforms.numSplats.value = e.splats.numSplats, this.uniforms.packedSplats.value = e.splats.getTexture(), this.uniforms.rgbMinMaxLnScaleMinMax.value.set(e.splats.splatEncoding?.rgbMin ?? 0, e.splats.splatEncoding?.rgbMax ?? 1, e.splats.splatEncoding?.lnScaleMin ?? -12, e.splats.splatEncoding?.lnScaleMax ?? 9), this.geometry = t, this.material.transparent = !this.viewpoint.stochastic, this.material.depthWrite = this.viewpoint.stochastic, this.material.needsUpdate = !0;
		} else this.uniforms.numSplats.value = 0, this.uniforms.packedSplats.value = Eo.getEmpty(), this.geometry = Wo;
	}
	update({ scene: e, viewToWorld: t }) {
		let n = this.matrixWorld;
		this.preUpdate ? this.updateInternal({
			scene: e,
			originToWorld: n.clone(),
			viewToWorld: t
		}) : (this.pendingUpdate.scene = e, this.pendingUpdate.originToWorld.copy(n), this.pendingUpdate.timeoutId === -1 && (this.pendingUpdate.timeoutId = setTimeout(() => {
			let { scene: e, originToWorld: n } = this.pendingUpdate;
			this.pendingUpdate.scene = null, this.pendingUpdate.timeoutId = -1, this.updateInternal({
				scene: e,
				originToWorld: n,
				viewToWorld: t
			}) && this.renderer.getContext().flush();
		}, 1)));
	}
	updateInternal({ scene: e, originToWorld: t, viewToWorld: n }) {
		var r;
		if (!this.canAllocAccumulator()) return !1;
		t ||= this.active.toWorld, n ??= t.clone();
		let i = this.time ?? this.clock.getElapsedTime(), a = i - (this.lastUpdateTime ?? i);
		this.lastUpdateTime = i;
		let o = this.active.mapping.reduce((e, t) => (e.set(t.node, t), e), /* @__PURE__ */ new Map()), { generators: s, visibleGenerators: c, globalEdits: l } = this.compileScene(e);
		for (let e of s) (r = e.frameUpdate) == null || r.call(e, {
			object: e,
			time: i,
			deltaTime: a,
			viewToWorld: n,
			globalEdits: l
		});
		let u = new Set(c.map((e) => e.uuid));
		for (let e of s) {
			let t = o.get(e), n = e.generator && u.has(e.uuid) ? e.numSplats : 0;
			(this.needsUpdate || e.generator !== t?.generator || n !== t?.count) && e.updateVersion();
		}
		let d = !bi({
			matrix1: t,
			matrix2: this.active.toWorld,
			maxDistance: this.originDistance
		}), f = this.needsUpdate || d || s.length !== o.size || s.some((e) => e.version !== o.get(e)?.version);
		this.needsUpdate = !1;
		let p = null;
		if (f) {
			if (p = this.maybeAllocAccumulator(), !p) throw Error("Unreachable");
			let e = !bi({
				matrix1: t,
				matrix2: p.toWorld,
				maxDistance: 1e-5,
				minCoorient: .99999
			}), n = c.map((e, t) => {
				let n = o.get(e);
				return n ? [
					e.version - n.version,
					n.base,
					e
				] : [
					Infinity,
					e.version,
					e
				];
			}).sort((e, t) => e[0] === t[0] ? e[1] - t[1] : e[0] - t[0]).map(([e, t, n]) => n), r = n.map((e) => e.numSplats), { maxSplats: i, mapping: a } = p.splats.generateMapping(r), s = n.map((e, t) => {
				let { base: n, count: r } = a[t];
				return {
					node: e,
					generator: e.generator,
					version: e.version,
					base: n,
					count: r
				};
			});
			t.clone().invert().decompose(this.translateToAccumulator.value, this.rotateToAccumulator.value, new z()), p.ensureGenerate(i), p.splats.splatEncoding = { ...this.splatEncoding }, p.generateSplats({
				renderer: this.renderer,
				modifier: this.modifier,
				generators: s,
				forceUpdate: e,
				originToWorld: t
			}), p.splatsVersion = this.active.splatsVersion + 1;
			let l = p.hasCorrespondence(this.active);
			p.mappingVersion = this.active.mappingVersion + +!l, this.releaseAccumulator(this.active), this.active = p, this.prepareViewpoint();
		}
		return setTimeout(() => {
			for (let e of this.autoViewpoints) e.autoPoll({ accumulator: p ?? void 0 });
		}, 1), !0;
	}
	compileScene(e) {
		let t = [];
		e.traverse((e) => {
			e instanceof Ea && t.push(e);
		});
		let n = [];
		e.traverseVisible((e) => {
			e instanceof Ea && n.push(e);
		});
		let r = /* @__PURE__ */ new Set();
		return e.traverseVisible((e) => {
			if (e instanceof _a) {
				let t = e.parent;
				for (; t != null && !(t instanceof Oa);) t = t.parent;
				t ?? r.add(e);
			}
		}), {
			generators: t,
			visibleGenerators: n,
			globalEdits: Array.from(r)
		};
	}
	async renderEnvMap({ renderer: t, scene: n, worldCenter: i, size: a = 256, near: o = .1, far: s = 1e3, hideObjects: c = [], update: l = !1 }) {
		if (this.envViewpoint ||= this.newViewpoint({ sort360: !0 }), !e.cubeRender || e.cubeRender.target.width !== a || e.cubeRender.near !== o || e.cubeRender.far !== s) {
			e.cubeRender && e.cubeRender.target.dispose();
			let t = new C(a, {
				format: He,
				generateMipmaps: !0,
				minFilter: r
			}), n = new ve(o, s, t);
			e.cubeRender = {
				target: t,
				camera: n,
				near: o,
				far: s
			};
		}
		e.pmrem ||= new Se(t ?? this.renderer);
		let u = new se().setPosition(i);
		await this.envViewpoint?.prepare({
			scene: n,
			viewToWorld: u,
			update: l
		});
		let { target: d, camera: f } = e.cubeRender;
		f.position.copy(i);
		let p = /* @__PURE__ */ new Map();
		for (let e of c) p.set(e, e.visible), e.visible = !1;
		this.prepareViewpoint(this.envViewpoint), f.update(t ?? this.renderer, n), this.prepareViewpoint(this.defaultView);
		for (let [e, t] of p.entries()) e.visible = t;
		return e.pmrem?.fromCubemap(d.texture).texture;
	}
	recurseSetEnvMap(e, t) {
		e.traverse((e) => {
			if (e instanceof xe) {
				if (Array.isArray(e.material)) for (let n of e.material) n instanceof ke && (n.envMap = t);
				else e.material instanceof ke && (e.material.envMap = t);
			}
		});
	}
	getRgba({ generator: e, rgba: t }) {
		let n = this.active.mapping.find(({ node: t }) => t === e);
		if (!n) throw Error("Generator not found");
		return t ??= new la(), t.fromPackedSplats({
			packedSplats: this.active.splats,
			base: n.base,
			count: n.count,
			renderer: this.renderer
		}), t;
	}
	async readRgba({ generator: e, rgba: t }) {
		return t = this.getRgba({
			generator: e,
			rgba: t
		}), t.read();
	}
};
Ho.cubeRender = null, Ho.pmrem = null, Ho.EMPTY_SPLAT_TEXTURE = new E();
var Uo = Ho, Wo = new Oo(/* @__PURE__ */ new Uint32Array(1), 0);
_r({
	packedSplats: Tr,
	index: "int"
}, { gsplat: wr }, ({ packedSplats: e, index: t }) => {
	if (!e || !t) throw Error("Invalid input");
	return { gsplat: Er(e, t) };
});
function Go(e) {
	if (e.length === 0) return null;
	let t = new z(), n = new U(), r = new z(), i = [], a = [];
	for (let o of e) o.decompose(t, n, r), i.push(t), a.push(n);
	return new se().compose(_i(i), vi(a), new z(1, 1, 1));
}
xr("\n  struct GsplatSkinning {\n    int numSplats;\n    int numBones;\n    usampler2DArray skinTexture;\n    sampler2D boneTexture;\n  };\n"), xr("\n  void applyGsplatSkinning(\n    int numSplats, int numBones,\n    usampler2DArray skinTexture, sampler2D boneTexture,\n    int splatIndex, inout vec3 center, inout vec4 quaternion\n  ) {\n    if ((splatIndex < 0) || (splatIndex >= numSplats)) {\n      return;\n    }\n\n    uvec4 skinData = texelFetch(skinTexture, splatTexCoord(splatIndex), 0);\n\n    float weights[4];\n    weights[0] = float(skinData.x & 0xffu) / 255.0;\n    weights[1] = float(skinData.y & 0xffu) / 255.0;\n    weights[2] = float(skinData.z & 0xffu) / 255.0;\n    weights[3] = float(skinData.w & 0xffu) / 255.0;\n\n    uint boneIndices[4];\n    boneIndices[0] = (skinData.x >> 8u) & 0xffu;\n    boneIndices[1] = (skinData.y >> 8u) & 0xffu;\n    boneIndices[2] = (skinData.z >> 8u) & 0xffu;\n    boneIndices[3] = (skinData.w >> 8u) & 0xffu;\n\n    vec4 quat = vec4(0.0);\n    vec4 dual = vec4(0.0);\n    for (int i = 0; i < 4; i++) {\n      if (weights[i] > 0.0) {\n        int boneIndex = int(boneIndices[i]);\n        vec4 boneQuat = vec4(0.0, 0.0, 0.0, 1.0);\n        vec4 boneDual = vec4(0.0);\n        if (boneIndex < numBones) {\n          boneQuat = texelFetch(boneTexture, ivec2(2, boneIndex), 0);\n          boneDual = texelFetch(boneTexture, ivec2(3, boneIndex), 0);\n        }\n\n        if ((i > 0) && (dot(quat, boneQuat) < 0.0)) {\n          // Flip sign if next blend is pointing in the opposite direction\n          boneQuat = -boneQuat;\n          boneDual = -boneDual;\n        }\n        quat += weights[i] * boneQuat;\n        dual += weights[i] * boneDual;\n      }\n    }\n\n    // Normalize dual quaternion\n    float norm = length(quat);\n    quat /= norm;\n    dual /= norm;\n    vec3 translate = vec3(\n      2.0 * (-dual.w * quat.x + dual.x * quat.w - dual.y * quat.z + dual.z * quat.y),\n      2.0 * (-dual.w * quat.y + dual.x * quat.z + dual.y * quat.w - dual.z * quat.x),\n      2.0 * (-dual.w * quat.z - dual.x * quat.y + dual.y * quat.x + dual.z * quat.w)\n    );\n\n    center = quatVec(quat, center) + translate;\n    quaternion = quatQuat(quat, quaternion);\n  }\n"), new ae(new z(-1, -1, -1), new z(1, 1, 1)), new z(-1, -3, 1).normalize(), new f(1, 1, 1), new f(.5, .5, 1), new z(1, 1, 1), new ae(new z(-2, -1, -2), new z(2, 5, 2)), new z(0, -1, 0), new f(1, 1, 1), new f(.25, .25, .5), new z(.1, 1, .1);
var Ko = class e {
	static createButton(t, n = {}) {
		let r = navigator.xr;
		if (!r) return null;
		let i = r, a = document.createElement("button");
		t.xr.enabled = !0, t.xr.setReferenceSpaceType("local");
		function o() {
			let e = null;
			async function r(n) {
				n.addEventListener("end", o), await t.xr.setSession(n), a.textContent = "EXIT VR", e = n;
			}
			function o() {
				e?.removeEventListener("end", o), a.textContent = "ENTER VR", e = null;
			}
			a.style.display = "", a.style.cursor = "pointer", a.style.left = "calc(50% - 100px)", a.style.width = "200px", a.style.height = "100px", a.textContent = "ENTER VR";
			let s = {
				...n,
				optionalFeatures: [...n.optionalFeatures || []]
			};
			a.onmouseenter = () => {
				a.style.opacity = "1.0";
			}, a.onmouseleave = () => {
				a.style.opacity = "0.5";
			}, a.onclick = () => {
				e === null ? i.requestSession("immersive-vr", s).then(r) : e.end();
			};
		}
		function s() {
			a.style.display = "none", a.style.cursor = "auto", a.style.left = "calc(50% - 75px)", a.style.width = "150px", a.onmouseenter = null, a.onmouseleave = null, a.onclick = null;
		}
		function c() {
			s(), a.textContent = "VR NOT SUPPORTED";
		}
		function l(e) {
			s(), a.textContent = "VR NOT ALLOWED";
		}
		function u(e) {
			e.style.position = "absolute", e.style.bottom = "20px", e.style.padding = "12px 6px", e.style.border = "1px solid #fff", e.style.borderRadius = "4px", e.style.background = "rgba(0,0,0,0.1)", e.style.color = "#fff", e.style.font = "normal 13px sans-serif", e.style.textAlign = "center", e.style.opacity = "0.5", e.style.outline = "none", e.style.zIndex = "999";
		}
		return a.id = "VRButton", a.style.display = "none", u(a), i.isSessionSupported("immersive-vr").then((t) => {
			t ? o() : c(), t && e.xrSessionIsGranted && a.click();
		}).catch(l), a;
	}
	static registerSessionGrantedListener() {
		let t = navigator.xr;
		if (!t) return null;
		let n = t;
		/WebXRViewer\//i.test(navigator.userAgent) || n.addEventListener("sessiongranted", () => {
			e.xrSessionIsGranted = !0;
		});
	}
};
Ko.xrSessionIsGranted = !1, Ko.registerSessionGrantedListener();
var qo = /* @__PURE__ */ ((e) => (e.w = "wrist", e.t0 = "thumb-metacarpal", e.t1 = "thumb-phalanx-proximal", e.t2 = "thumb-phalanx-distal", e.t3 = "thumb-tip", e.i0 = "index-finger-metacarpal", e.i1 = "index-finger-phalanx-proximal", e.i2 = "index-finger-phalanx-intermediate", e.i3 = "index-finger-phalanx-distal", e.i4 = "index-finger-tip", e.m0 = "middle-finger-metacarpal", e.m1 = "middle-finger-phalanx-proximal", e.m2 = "middle-finger-phalanx-intermediate", e.m3 = "middle-finger-phalanx-distal", e.m4 = "middle-finger-tip", e.r0 = "ring-finger-metacarpal", e.r1 = "ring-finger-phalanx-proximal", e.r2 = "ring-finger-phalanx-intermediate", e.r3 = "ring-finger-phalanx-distal", e.r4 = "ring-finger-tip", e.p0 = "pinky-finger-metacarpal", e.p1 = "pinky-finger-phalanx-proximal", e.p2 = "pinky-finger-phalanx-intermediate", e.p3 = "pinky-finger-phalanx-distal", e.p4 = "pinky-finger-tip", e))(qo || {});
Object.keys(qo).length;
var Jo = /* @__PURE__ */ ((e) => (e.left = "left", e.right = "right", e))(Jo || {});
Object.keys(Jo), new z(0, 0, -1), new z(0, 0, 1), new z(-1, 0, 0), new z(1, 0, 0), new z(0, 1, 0), new z(0, -1, 0), new z(0, 0, -1), new z(0, 0, 1), new z(-1, 0, 0), new z(1, 0, 0), new z(0, 1, 0), new z(0, -1, 0), new z(0, 0, 1), new z(0, 0, -1), new z(0, -1, 0), new z(0, 1, 0), new z(-1, 0, 0), new z(1, 0, 0);
//#endregion
//#region src/core/scene/splat.ts
var Yo = Math.PI / 180, Xo = new U().setFromEuler(new b(Math.PI, 0, 0));
function Zo(e, t) {
	let n = t.scale ?? 1, r = t.xOffset ?? 0, i = t.yOffset ?? 0, a = t.zOffset ?? 0, o = (t.roll ?? 0) * Yo, s = (t.pitch ?? 0) * Yo, c = (t.yaw ?? 0) * Yo;
	e.scale.setScalar(n);
	let l = new U().setFromEuler(new b(s, c, o));
	e.quaternion.copy(Xo.clone().multiply(l)), e.position.set(r * n, a * n, i * n);
}
function Qo(e, t, n) {
	let r = new Uint8Array(e), i = new Oa({
		fileBytes: r,
		fileType: _o(r)
	});
	return Zo(i, t), n.add(i), i;
}
function $o(e, t) {
	t.remove(e), e.dispose?.();
	for (let e of [...t.children]) e instanceof Uo && (t.remove(e), e.defaultView.dispose());
}
//#endregion
//#region src/core/scene/collider.ts
async function es(e, t) {
	let n = (await new Oe().parseAsync(e, "")).scene;
	return n.traverse((e) => {
		e.visible = !1;
	}), t.add(n), n;
}
function ts(e, t) {
	t.remove(e), e.traverse((e) => {
		let t = e;
		t.geometry?.dispose(), Array.isArray(t.material) ? t.material.forEach((e) => e.dispose()) : t.material?.dispose();
	});
}
//#endregion
//#region src/core/scene/seeThrough.ts
var ns = .4, rs = 2 ** 53 - 1;
function is(e) {
	let t = e.clone();
	return t.transparent = !0, t.opacity = ns, t.depthTest = !1, t.depthWrite = !1, t;
}
var as = class {
	constructor() {
		this.own = /* @__PURE__ */ new Map();
	}
	apply(e) {
		for (let t of e) t?.traverse((e) => {
			let t = e;
			t.isMesh && !this.own.has(t) && (this.own.set(t, {
				material: t.material,
				castShadow: t.castShadow,
				renderOrder: t.renderOrder
			}), t.material = Array.isArray(t.material) ? t.material.map(is) : is(t.material), t.castShadow = !1, t.renderOrder = rs);
		});
	}
	restore() {
		for (let [e, t] of this.own) {
			for (let t of [e.material].flat()) t.dispose();
			Object.assign(e, t);
		}
		this.own.clear();
	}
}, os = 16737095;
function ss(e) {
	e.userData.interactionGizmo = !0, e.traverse((e) => {
		e.userData.interactionGizmo = !0;
	});
}
var cs = class e {
	static {
		this.SHAFT_RADIUS = {
			rest: .002,
			full: .032
		};
	}
	static {
		this.HEAD_RADIUS = {
			rest: .01,
			full: .075
		};
	}
	static {
		this.HEAD_HEIGHT = {
			rest: .035,
			full: .25
		};
	}
	static {
		this.HALF_FORCE = 100;
	}
	static {
		this.UP = new z(0, 1, 0);
	}
	constructor(e) {
		this.group = new B(), this.scene = e, this.material = new ke({
			color: os,
			transparent: !0,
			opacity: .5,
			metalness: 0,
			roughness: .2
		}), this.shaft = new xe(new ge(1, 1, 1), this.material), this.head = new xe(new u(1, 1), this.material), this.group.add(this.shaft, this.head), this.group.visible = !1, ss(this.group), e.add(this.group);
	}
	show(t, n, r) {
		let i = n.clone().sub(t), a = i.length();
		if (a <= .001) {
			this.hide();
			return;
		}
		this.group.visible = !0, this.group.position.copy(t), this.group.quaternion.setFromUnitVectors(e.UP, i.normalize());
		let o = Number.isFinite(r) && r > 0 ? r : 0, s = o / (o + e.HALF_FORCE), c = ({ rest: e, full: t }) => e + (t - e) * s, l = c(e.SHAFT_RADIUS), u = c(e.HEAD_RADIUS), d = Math.max(.001, a - c(e.HEAD_HEIGHT)), f = a - d;
		this.shaft.scale.set(l, d, l), this.shaft.position.y = d / 2, this.head.scale.set(u, f, u), this.head.position.y = d + f / 2;
	}
	hide() {
		this.group.visible = !1;
	}
	dispose() {
		this.scene.remove(this.group), this.shaft.geometry.dispose(), this.head.geometry.dispose(), this.material.dispose();
	}
}, ls = class e {
	static {
		this.LIFETIME = .25;
	}
	static {
		this.RADIUS = .12;
	}
	constructor(t) {
		this.age = e.LIFETIME, this.scene = t, this.material = new Ie({
			color: os,
			transparent: !0,
			opacity: 0,
			side: 2,
			depthWrite: !1
		}), this.mesh = new xe(new k(.75, 1, 32), this.material), this.mesh.visible = !1, ss(this.mesh), t.add(this.mesh);
	}
	fire(e, t) {
		this.mesh.position.copy(e), t && this.mesh.quaternion.setFromUnitVectors(new z(0, 0, 1), t.clone().normalize()), this.age = 0, this.mesh.visible = !0;
	}
	hide() {
		this.age = e.LIFETIME, this.mesh.visible = !1;
	}
	update(t) {
		if (this.age >= e.LIFETIME) return;
		this.age = Math.min(e.LIFETIME, this.age + t);
		let n = this.age / e.LIFETIME, r = e.RADIUS * (.3 + n);
		this.mesh.scale.setScalar(r), this.material.opacity = .7 * (1 - n), this.age >= e.LIFETIME && (this.mesh.visible = !1);
	}
	dispose() {
		this.scene.remove(this.mesh), this.mesh.geometry.dispose(), this.material.dispose();
	}
}, us = [
	"view",
	"pull",
	"push",
	"weld"
], ds = [
	{
		id: "view",
		label: "View",
		params: []
	},
	{
		id: "pull",
		label: "Pull",
		params: [{
			name: "spring",
			label: "Spring",
			unit: "N/m",
			type: "slider",
			min: 0,
			max: 2e3,
			softMin: 0,
			softMax: 200,
			step: 1,
			default: 100
		}]
	},
	{
		id: "push",
		label: "Push",
		params: [{
			name: "impulse",
			label: "Impulse",
			unit: "N·s",
			type: "slider",
			min: .1,
			max: 500,
			softMin: .1,
			softMax: 50,
			step: .1,
			default: 10
		}]
	},
	{
		id: "weld",
		label: "Grab",
		params: [{
			name: "softness",
			label: "Softness",
			unit: "s",
			type: "slider",
			min: .004,
			max: .2,
			step: .002,
			default: .02
		}, {
			name: "torqueScale",
			label: "Hold rotation",
			unit: "",
			type: "checkbox",
			min: 0,
			max: 1,
			step: 1,
			default: 1
		}]
	}
], fs = "pull";
function ps(e) {
	let t = ds.find((t) => t.id === e);
	if (!t) throw Error(`Unknown interaction mode: ${e}`);
	return t;
}
function ms() {
	let e = {};
	for (let t of ds) {
		let n = {};
		for (let e of t.params) n[e.name] = e.default;
		e[t.id] = n;
	}
	return e;
}
function hs(e, t) {
	return Number.isFinite(t) ? e.type === "checkbox" ? +(t >= .5) : Math.min(e.max, Math.max(e.min, t)) : e.default;
}
//#endregion
//#region src/core/interaction/pointer.ts
var gs = class {
	constructor(e) {
		this.handlers = null, this.raycaster = new p(), this.ndc = new y(), this.ray = new z(), this.direction = new z(), this.pointerId = null, this.hit = null, this.downX = 0, this.downY = 0, this.travel = 0, this.onPointerDown = (e) => {
			if (this.pointerId !== null || !this.handlers || e.pointerType === "mouse" && e.button !== 0) return;
			this.updateNdc(e.clientX, e.clientY);
			let t = this.pick();
			if (!t) return;
			this.hit = t, this.downX = e.clientX, this.downY = e.clientY, this.travel = 0;
			let n = this.current(), r = n ? this.handlers.onDown(n) : "none";
			r === "none" ? this.hit = null : (this.pointerId = e.pointerId, r === "exclusive" && (this.controls.enabled = !1));
		}, this.onPointerMove = (e) => {
			if (e.pointerId !== this.pointerId) return;
			this.updateNdc(e.clientX, e.clientY), this.travel = Math.max(this.travel, Math.hypot(e.clientX - this.downX, e.clientY - this.downY));
			let t = this.current();
			t && this.handlers?.onMove(t);
		}, this.onPointerUp = (e) => {
			if (e.pointerId !== this.pointerId) return;
			this.updateNdc(e.clientX, e.clientY), this.travel = Math.max(this.travel, Math.hypot(e.clientX - this.downX, e.clientY - this.downY));
			let t = this.current();
			this.release(), t && this.handlers?.onUp(t);
		}, this.onPointerCancel = (e) => {
			e.pointerId === this.pointerId && this.cancel();
		}, this.scene = e.scene, this.renderer = e.renderer, this.container = e.container, this.controls = e.controls, this.camera = e.camera, this.actableBodyIds = e.actableBodyIds ?? null, this.raycaster.params.Line.threshold = .1, this.container.addEventListener("pointerdown", this.onPointerDown, !0), document.addEventListener("pointermove", this.onPointerMove, !0), document.addEventListener("pointerup", this.onPointerUp, !0), document.addEventListener("pointercancel", this.onPointerCancel, !0);
	}
	setHandlers(e) {
		this.pointerId !== null && this.release(), this.handlers = e;
	}
	setActableBodyIds(e) {
		this.actableBodyIds = e;
	}
	setCamera(e) {
		this.camera = e;
	}
	get active() {
		return this.pointerId !== null;
	}
	current() {
		return this.hit ? (this.raycaster.setFromCamera(this.ndc, this.camera), this.direction.copy(this.raycaster.ray.direction), this.ray.copy(this.raycaster.ray.origin).addScaledVector(this.direction, this.hit.distance), {
			hit: this.hit,
			ray: this.ray,
			direction: this.direction,
			travel: this.travel
		}) : null;
	}
	release() {
		this.pointerId = null, this.hit = null, this.travel = 0, this.controls.enabled = !0;
	}
	cancel() {
		this.pointerId !== null && (this.release(), this.handlers?.onCancel());
	}
	dispose() {
		this.container.removeEventListener("pointerdown", this.onPointerDown, !0), document.removeEventListener("pointermove", this.onPointerMove, !0), document.removeEventListener("pointerup", this.onPointerUp, !0), document.removeEventListener("pointercancel", this.onPointerCancel, !0), this.release(), this.handlers = null;
	}
	updateNdc(e, t) {
		let n = this.renderer.domElement.getBoundingClientRect();
		this.ndc.x = (e - n.left) / n.width * 2 - 1, this.ndc.y = -((t - n.top) / n.height) * 2 + 1, this.raycaster.setFromCamera(this.ndc, this.camera);
	}
	pick() {
		for (let e of this.raycaster.intersectObjects(this.scene.children, !0)) {
			let t = e.object;
			if (vs(t)) continue;
			let n = _s(t);
			if (n !== null && (!this.actableBodyIds || this.actableBodyIds.has(n))) return {
				bodyId: n,
				object: t,
				point: e.point.clone(),
				normal: ys(e, this.raycaster.ray.direction),
				distance: e.distance
			};
		}
		return null;
	}
};
function _s(e) {
	return !("bodyID" in e) || typeof e.bodyID != "number" ? null : e.bodyID > 0 ? e.bodyID : null;
}
function vs(e) {
	let t = e;
	for (; t;) {
		if (t.userData?.ignoreDragForce === !0 || t.userData?.interactionGizmo === !0) return !0;
		t = t.parent;
	}
	return !1;
}
function ys(e, t) {
	let n = e.face?.normal;
	if (!n) return null;
	let r = n.clone().applyNormalMatrix(new Ne().getNormalMatrix(e.object.matrixWorld)).normalize();
	return r.lengthSq() < 1e-12 ? null : r.dot(t) > 0 ? r.negate() : r;
}
function bs(e, t, n, r, i) {
	r.select = i.bodyId, r.active = e.mjtPertBit.mjPERT_TRANSLATE.value, r.localmass = i.forceScale / 100, r.localpos.set(i.localPoint), r.refselpos.set(i.targetPoint), e.mjv_applyPerturbForce(t, n, r);
}
var xs = 6, Ss = [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
];
function Cs(e, t, n, r, i) {
	let a = n * xs, o = t.xfrc_applied.subarray(a, a + xs), s = [
		0,
		1,
		2
	].map((e) => t.xipos[n * 3 + e]);
	e.mju_transformSpatial(o, [
		0,
		0,
		0,
		i[0],
		i[1],
		i[2]
	], 1, s, [
		r[0],
		r[1],
		r[2]
	], Ss);
	for (let e = 0; e < 3; e++) {
		let t = o[e];
		o[e] = o[e + 3], o[e + 3] = t;
	}
}
function ws(e, t) {
	let n = t * xs, r = e.xfrc_applied;
	return Math.hypot(r[n], r[n + 1], r[n + 2]);
}
function Ts(e, t) {
	let n = t * xs;
	if (!(n + xs > e.xfrc_applied.length)) for (let t = 0; t < xs; t++) e.xfrc_applied[n + t] = 0;
}
//#endregion
//#region src/core/interaction/wrench.ts
var Es = class {
	constructor() {
		this.written = /* @__PURE__ */ new Set();
	}
	begin(e) {
		for (let t of this.written) Ts(e, t);
		this.written.clear();
	}
	pull(e, t, n, r, i) {
		return bs(e, t, n, r, i), this.written.add(i.bodyId), ws(n, i.bodyId);
	}
	push(e, t, n, r, i) {
		Cs(e, t, n, r, i), this.written.add(n);
	}
	clear(e) {
		if (e) for (let t of this.written) Ts(e, t);
		this.written.clear();
	}
	forget() {
		this.written.clear();
	}
};
//#endregion
//#region src/core/observation/math.ts
function Ds(e, t) {
	let n = e[0] ?? 1, r = e[1] ?? 0, i = e[2] ?? 0, a = e[3] ?? 0, o = t[0] ?? 1, s = t[1] ?? 0, c = t[2] ?? 0, l = t[3] ?? 0;
	return [
		n * o - r * s - i * c - a * l,
		n * s + r * o + i * l - a * c,
		n * c - r * l + i * o + a * s,
		n * l + r * c - i * s + a * o
	];
}
function Os(e) {
	let t = e[0] ?? 1, n = e[1] ?? 0, r = e[2] ?? 0, i = e[3] ?? 0, a = t * t + n * n + r * r + i * i;
	if (a < 1e-9) return [
		1,
		0,
		0,
		0
	];
	let o = 1 / a;
	return [
		t * o,
		-n * o,
		-r * o,
		-i * o
	];
}
function ks(e, t) {
	let n = e[0] ?? 1, r = e[1] ?? 0, i = e[2] ?? 0, a = e[3] ?? 0, o = t[0] ?? 0, s = t[1] ?? 0, c = t[2] ?? 0, l = 2 * (i * c - a * s), u = 2 * (a * o - r * c), d = 2 * (r * s - i * o), f = i * d - a * u, p = a * l - r * d, m = r * u - i * l;
	return [
		o + n * l + f,
		s + n * u + p,
		c + n * d + m
	];
}
function As(e, t) {
	let n = e[0] ?? 1, r = e[1] ?? 0, i = e[2] ?? 0, a = e[3] ?? 0, o = t[0] ?? 0, s = t[1] ?? 0, c = t[2] ?? 0, l = 2 * (i * c - a * s), u = 2 * (a * o - r * c), d = 2 * (r * s - i * o), f = i * d - a * u, p = a * l - r * d, m = r * u - i * l;
	return [
		o - n * l + f,
		s - n * u + p,
		c - n * d + m
	];
}
function js(e) {
	let t = e[0] ?? 1, n = e[1] ?? 0, r = e[2] ?? 0, i = e[3] ?? 0, a = Math.atan2(2 * (t * i + n * r), 1 - 2 * (r * r + i * i));
	return [
		Math.cos(a / 2),
		0,
		0,
		Math.sin(a / 2)
	];
}
function Ms(e) {
	return e > 0 ? Math.sqrt(e) : 0;
}
function Ns(e) {
	let t = (t) => e[t] ?? 0, [n, r, i, a, o, s, c, l, u] = [
		t(0),
		t(1),
		t(2),
		t(3),
		t(4),
		t(5),
		t(6),
		t(7),
		t(8)
	], d = [
		Ms(1 + n + o + u),
		Ms(1 + n - o - u),
		Ms(1 - n + o - u),
		Ms(1 - n - o + u)
	], f = [
		[
			d[0] * d[0],
			l - s,
			i - c,
			a - r
		],
		[
			l - s,
			d[1] * d[1],
			a + r,
			i + c
		],
		[
			i - c,
			a + r,
			d[2] * d[2],
			s + l
		],
		[
			a - r,
			c + i,
			l + s,
			d[3] * d[3]
		]
	], p = 0;
	for (let e = 1; e < 4; e++) d[e] > d[p] && (p = e);
	let m = 2 * Math.max(d[p], .1);
	return f[p].map((e) => e / m);
}
//#endregion
//#region src/core/interaction/modes/mode.ts
function Ps(e, t, n) {
	let r = de(n), i = As([
		0,
		1,
		2,
		3
	].map((n) => e.xquat[t * 4 + n]), [
		r.x - e.xpos[t * 3 + 0],
		r.y - e.xpos[t * 3 + 1],
		r.z - e.xpos[t * 3 + 2]
	]);
	return [
		i[0],
		i[1],
		i[2]
	];
}
function Fs(e, t, n) {
	let r = ks([
		0,
		1,
		2,
		3
	].map((n) => e.xquat[t * 4 + n]), n);
	return ce([
		r[0] + e.xpos[t * 3 + 0],
		r[1] + e.xpos[t * 3 + 1],
		r[2] + e.xpos[t * 3 + 2]
	]);
}
function Is(e) {
	let t = de(e);
	return [
		t.x,
		t.y,
		t.z
	];
}
//#endregion
//#region src/core/interaction/modes/pull.ts
var Ls = class {
	constructor() {
		this.id = "pull", this.bodyId = 0, this.grab = [
			0,
			0,
			0
		];
	}
	onDown(e, t) {
		let { mjData: n } = t.sim();
		return !n || e.hit.bodyId <= 0 ? "none" : (this.bodyId = e.hit.bodyId, this.grab = Ps(n, this.bodyId, e.hit.point), "exclusive");
	}
	onUp(e, t) {
		this.onCancel(t);
	}
	onCancel(e) {
		this.bodyId = 0, e.arrow.hide();
	}
	preStep(e, t) {
		if (!e || this.bodyId <= 0) return;
		let { mujoco: n, mjModel: r, mjData: i } = t.sim();
		if (!r || !i) return;
		let a = t.wrench.pull(n, r, i, t.perturb(), {
			bodyId: this.bodyId,
			localPoint: this.grab,
			targetPoint: Is(e.ray),
			forceScale: t.params().spring
		});
		t.arrow.show(Fs(i, this.bodyId, this.grab), e.ray, a);
	}
}, Rs = class {
	constructor() {
		this.id = "push", this.pending = null;
	}
	onDown(e) {
		return e.hit.bodyId > 0 ? "shared" : "none";
	}
	onUp(e, t) {
		if (e.travel >= 8) return;
		let { hit: n } = e, r = n.normal ? n.normal.clone().negate() : e.direction.clone();
		r.lengthSq() < 1e-12 || (this.pending = {
			bodyId: n.bodyId,
			point: Is(n.point),
			direction: Is(r.normalize())
		}, t.ring.fire(n.point, n.normal));
	}
	onCancel(e) {
		this.pending = null, e.ring.hide();
	}
	preStep(e, t) {
		let { mujoco: n, mjData: r, controlDt: i } = t.sim();
		if (t.ring.update(i), !this.pending || !r) return;
		let a = t.params().impulse / Math.max(i, 1e-4), { direction: o } = this.pending;
		t.wrench.push(n, r, this.pending.bodyId, this.pending.point, [
			o[0] * a,
			o[1] * a,
			o[2] * a
		]), this.pending = null;
	}
}, zs = class {
	constructor() {
		this.id = "view";
	}
	onDown() {
		return "none";
	}
	onCancel() {}
	preStep() {}
};
//#endregion
//#region src/core/scene/mjcfInject.ts
function Bs(e, t) {
	let n = e.lastIndexOf("</mujoco>");
	if (n < 0) throw Error("appendToMjcf: scene XML has no closing </mujoco>");
	return `${e.slice(0, n)}${t}${e.slice(n)}`;
}
function Vs(e, t) {
	return new TextDecoder().decode(e.FS.readFile(t));
}
function Hs(e) {
	return /\bname\s*=\s*"[^"]*\/[^"]*"/.test(e);
}
//#endregion
//#region src/core/interaction/grabInject.ts
var Us = "mjswan_ptr_anchor", Ws = "mjswan_ptr_hold", Gs = `  <worldbody>\n    <body name="${Us}" mocap="true" pos="0 0 100"/>\n  </worldbody>\n  <equality>\n    <weld name="${Ws}" body1="${Us}" body2="world" active="false" torquescale="1" solref="0.02 1" solimp="0.95 0.99 0.001"/>\n  </equality>\n`;
function Ks(e) {
	return Bs(e, Gs);
}
//#endregion
//#region src/core/interaction/modes/weld.ts
var qs = [
	1,
	0,
	0,
	0
], Js = [
	0,
	0,
	100
], Ys = class {
	constructor() {
		this.id = "weld", this.held = 0;
	}
	unavailable(e) {
		return e.weld.has("mjswan_ptr_hold") ? null : "This scene was built without a grab anchor.";
	}
	onDown(e, t) {
		let { mujoco: n, mjModel: r, mjData: i } = t.sim();
		if (!r || !i || e.hit.bodyId <= 0) return "none";
		let a = n.mj_name2id(r, n.mjtObj.mjOBJ_BODY.value, Us);
		if (a < 0 || t.weld.holderOf(e.hit.bodyId) !== null) return "none";
		this.moveAnchor(t, Is(e.hit.point)), n.mj_forward(r, i);
		let o = t.params();
		return t.weld.hold(r, i, "mjswan_ptr_hold", a, e.hit.bodyId, {
			torqueScale: o.torqueScale,
			solrefTime: o.softness
		}) ? (this.held = e.hit.bodyId, t.setCursor("grabbing"), "exclusive") : "none";
	}
	onUp(e, t) {
		this.onCancel(t);
	}
	onCancel(e) {
		let { mjData: t } = e.sim();
		t ? (e.weld.release(t, Ws), this.moveAnchor(e, Js), this.held = 0, e.setCursor("")) : (this.held = 0, e.setCursor(""));
	}
	preStep(e, t) {
		let { mjData: n } = t.sim();
		e && this.held && n && this.moveAnchor(t, Is(e.ray));
	}
	moveAnchor(e, t) {
		let { mujoco: n, mjModel: r, mjData: i } = e.sim();
		if (!r || !i) return;
		let a = n.mj_name2id(r, n.mjtObj.mjOBJ_BODY.value, Us);
		if (a < 0) return;
		let o = r.body_mocapid[a];
		if (!(o < 0)) {
			for (let e = 0; e < 3; e++) i.mocap_pos[o * 3 + e] = t[e];
			for (let e = 0; e < 4; e++) i.mocap_quat[o * 4 + e] = qs[e];
		}
	}
}, Xs = class {
	constructor(e) {
		this.wrench = new Es(), this.modes = /* @__PURE__ */ new Map(), this.values = ms(), this.active = fs, this.perturbHandle = null, this.readSim = e.sim, this.weld = e.weld, this.canvas = e.renderer.domElement, this.arrow = new cs(e.scene), this.ring = new ls(e.scene);
		for (let e of [
			new zs(),
			new Ls(),
			new Rs(),
			new Ys()
		]) this.modes.set(e.id, e);
		this.pointer = new gs({
			scene: e.scene,
			renderer: e.renderer,
			camera: e.camera,
			container: e.container,
			controls: e.controls
		}), this.pointer.setHandlers({
			onDown: (e) => this.onDown(e),
			onMove: (e) => this.current()?.onMove?.(e, this.context()),
			onUp: (e) => this.current()?.onUp?.(e, this.context()),
			onCancel: () => this.current()?.onCancel(this.context())
		}), this.refreshPickable();
	}
	getMode() {
		return this.active;
	}
	setMode(e) {
		this.modes.has(e) && e !== this.active && (this.cancel(), this.active = e, this.refreshPickable());
	}
	getParams(e) {
		return this.values[e] ?? {};
	}
	setParam(e, t, n) {
		let r = ps(e).params.find((e) => e.name === t);
		r && (this.values[e][t] = hs(r, n));
	}
	report() {
		return ds.map((e) => {
			let t = this.modes.get(e.id)?.unavailable?.(this.context()) ?? null, n = this.modes.has(e.id);
			return {
				id: e.id,
				label: e.label,
				available: n && t === null,
				reason: n ? t ?? void 0 : "Not implemented yet."
			};
		});
	}
	cancel() {
		this.pointer.cancel(), this.current()?.onCancel(this.context()), this.wrench.clear(this.readSim().mjData), this.arrow.hide();
	}
	onReset() {
		let { mjModel: e, mjData: t } = this.readSim();
		this.current()?.onCancel(this.context()), e && this.weld.restore(e, t), this.wrench.clear(t), this.pointer.release(), this.arrow.hide();
	}
	onSceneLoaded() {
		this.pointer.release(), this.current()?.onCancel(this.context()), this.wrench.forget(), this.arrow.hide(), this.refreshPickable();
	}
	preStep() {
		let e = this.readSim();
		e.mjData && (this.wrench.begin(e.mjData), this.current()?.preStep(this.pointer.current(), this.context()));
	}
	dispose() {
		this.canvas.style.cursor = "", this.pointer.dispose(), this.arrow.dispose(), this.ring.dispose(), this.perturbHandle?.delete(), this.perturbHandle = null;
	}
	onDown(e) {
		let t = this.current();
		if (!t) return "none";
		let n = this.context();
		return t.unavailable?.(n) ? "none" : t.onDown(e, n);
	}
	current() {
		return this.modes.get(this.active);
	}
	refreshPickable() {
		this.pointer.setActableBodyIds(this.readSim().dynamicBodyIds);
	}
	context() {
		return {
			sim: this.readSim,
			params: () => this.values[this.active],
			wrench: this.wrench,
			perturb: () => this.getPerturb(),
			arrow: this.arrow,
			ring: this.ring,
			weld: this.weld,
			setCursor: (e) => {
				this.canvas.style.cursor = e;
			}
		};
	}
	getPerturb() {
		return this.perturbHandle ||= new (this.readSim()).mujoco.MjvPerturb(), this.perturbHandle;
	}
}, Zs = W([
	0,
	1,
	2
]), Qs = [
	"plane",
	"hfield",
	"sphere",
	"capsule",
	"ellipsoid",
	"cylinder",
	"box",
	"mesh",
	"sdf"
], $s = class {
	constructor(e) {
		this.mujoco = e, this.raycaster = new p(), this.ndc = new y(), this.rotation = new se(), this.turn = new U(), this.geomId = null, this.normal = null;
	}
	pick(e, t, n, r, i, a) {
		if (!r.width || !r.height) return null;
		this.ndc.set((i - r.left) / r.width * 2 - 1, -((a - r.top) / r.height) * 2 + 1), this.raycaster.setFromCamera(this.ndc, n);
		let o = de(this.raycaster.ray.origin), s = de(this.raycaster.ray.direction);
		this.geomId ??= new this.mujoco.IntBuffer(1), this.normal ??= new this.mujoco.DoubleBuffer(3);
		let c = this.mujoco.mj_ray(e, t, [
			o.x,
			o.y,
			o.z
		], [
			s.x,
			s.y,
			s.z
		], Zs, !0, -1, this.geomId, this.normal);
		if (c < 0) return null;
		let l = this.geomId.GetView()[0], u = this.normal.GetView(), d = u[0] * s.x + u[1] * s.y + u[2] * s.z > 0 ? -1 : 1, f = e.geom_matid[l], p = f >= 0 ? e.mat_rgba : e.geom_rgba, m = (f >= 0 ? f : l) * 4, h = t.geom_xmat, g = l * 9, _ = this.turn.setFromRotationMatrix(this.rotation.set(h[g], h[g + 1], h[g + 2], 0, h[g + 3], h[g + 4], h[g + 5], 0, h[g + 6], h[g + 7], h[g + 8], 0, 0, 0, 0, 1));
		return {
			point: [
				o.x + s.x * c,
				o.y + s.y * c,
				o.z + s.z * c
			],
			normal: [
				u[0] * d,
				u[1] * d,
				u[2] * d
			],
			geom: l,
			body: e.geom_bodyid[l],
			name: this.mujoco.mj_id2name(e, this.mujoco.mjtObj.mjOBJ_GEOM.value, l) ?? "",
			type: Qs[e.geom_type[l]],
			size: [
				e.geom_size[l * 3],
				e.geom_size[l * 3 + 1],
				e.geom_size[l * 3 + 2]
			],
			rgba: [
				p[m],
				p[m + 1],
				p[m + 2],
				p[m + 3]
			],
			pos: [
				t.geom_xpos[l * 3],
				t.geom_xpos[l * 3 + 1],
				t.geom_xpos[l * 3 + 2]
			],
			quat: [
				_.w,
				_.x,
				_.y,
				_.z
			]
		};
	}
	dispose() {
		this.geomId?.delete(), this.normal?.delete(), this.geomId = null, this.normal = null;
	}
}, ec = .005, tc = [
	new z(1, 0, 0),
	new z(0, 1, 0),
	new z(0, 0, 1)
];
function nc(e) {
	switch (e) {
		case "box":
		case "ellipsoid": return [
			{
				axis: 0,
				index: 0
			},
			{
				axis: 1,
				index: 1
			},
			{
				axis: 2,
				index: 2
			}
		];
		case "plane": return [{
			axis: 0,
			index: 0
		}, {
			axis: 1,
			index: 1
		}];
		case "sphere": return [{
			axis: 0,
			index: 0
		}];
		case "capsule":
		case "cylinder": return [{
			axis: 0,
			index: 0
		}, {
			axis: 2,
			index: 1
		}];
	}
}
function rc(e, t, n) {
	switch (e) {
		case "sphere": return t[0];
		case "capsule": return n === 2 ? t[0] + t[1] : t[0];
		case "cylinder": return n === 2 ? t[1] : t[0];
		case "plane": return n === 2 ? 0 : t[n];
		default: return t[n];
	}
}
var ic = (e) => new U(e[1], e[2], e[3], e[0]);
function ac(e, t) {
	return tc[t].clone().applyQuaternion(ic(e));
}
function oc(e, t, n, r) {
	let i = [...e.size], a = Math.max(ec, i[n] + r / 2) - i[n];
	i[n] += a;
	let o = new z().setComponent(t, a);
	return t !== 2 && (e.type === "sphere" || e.type === "capsule") && (o.z += a), o.applyQuaternion(ic(e.quat)), {
		...e,
		size: i,
		pos: e.pos.map((e, t) => e + o.getComponent(t))
	};
}
function sc(e, t, n) {
	return {
		...e,
		pos: e.pos.map((e, r) => r === t ? e + n : e)
	};
}
function cc(e, t, n) {
	let r = ic(e.quat).multiply(new U().setFromAxisAngle(tc[t], n));
	return {
		...e,
		quat: [
			r.w,
			r.x,
			r.y,
			r.z
		]
	};
}
var lc = {
	gap: 6,
	length: 56,
	head: 14,
	shaft: 1.5,
	headRadius: 5,
	hit: 10
}, uc = {
	radius: 64,
	tube: 1.5,
	hit: 8
}, dc = [
	[
		.93,
		.26,
		.3
	],
	[
		.38,
		.78,
		.22
	],
	[
		.2,
		.5,
		1
	]
], fc = .85, pc = .97, mc = new z(0, 1, 0), hc = new z(0, 0, 1), gc = class {
	constructor(e, t) {
		if (this.kind = e, this.type = t, this.group = new B(), this.parts = [], this.geometries = [], this.hitMaterial = new Ie({ visible: !1 }), e !== "turn") {
			let n = lc.gap + lc.length, r = new ge(lc.shaft, lc.shaft, lc.length - lc.head, 8);
			r.translate(0, lc.gap + (lc.length - lc.head) / 2, 0);
			let i = new u(lc.headRadius, lc.head, 16);
			i.translate(0, n - lc.head / 2, 0);
			let a = new ge(lc.hit, lc.hit, n, 8);
			a.translate(0, n / 2, 0), this.geometries.push(r, i, a);
			let o = e === "size" ? nc(t).map(({ axis: t, index: n }) => ({
				kind: e,
				axis: t,
				index: n
			})) : [
				0,
				1,
				2
			].map((t) => ({
				kind: e,
				axis: t
			}));
			for (let e of o) this.add(e, [r, i], a);
		} else {
			let t = new P(uc.radius, uc.tube, 6, 96), n = new P(uc.radius, uc.hit, 6, 48);
			this.geometries.push(t, n);
			for (let r of [
				0,
				1,
				2
			]) this.add({
				kind: e,
				axis: r
			}, [t], n);
		}
		this.group.userData.interactionGizmo = !0;
	}
	layout(e, t, n) {
		let r = ce(e.pos);
		for (let i of this.parts) {
			let { root: a, handle: o } = i, s = o.kind === "move" ? tc[o.axis] : ac(e.quat, o.axis), c = ce(s.toArray());
			if (a.scale.setScalar(t), o.kind !== "turn") {
				let t = o.kind === "size" ? rc(e.type, e.size, o.axis) : 0;
				a.position.copy(r).addScaledVector(c, t), a.quaternion.setFromUnitVectors(mc, c);
				let i = n.clone().sub(a.position).normalize();
				a.visible = Math.abs(i.dot(c)) < pc;
			} else a.position.copy(r), a.quaternion.setFromUnitVectors(hc, c);
		}
		this.group.updateMatrixWorld(!0);
	}
	hit(e) {
		let t = this.parts.filter((e) => e.root.visible).map((e) => e.hit), [n] = e.intersectObjects(t, !1);
		return n ? n.object.userData.handle : null;
	}
	highlight(e) {
		for (let t of this.parts) {
			let n = e !== null && e.kind === t.handle.kind && e.axis === t.handle.axis, [r, i, a] = dc[t.handle.axis], o = n ? .45 : 0;
			for (let e of t.materials) e.color.setRGB(r + (1 - r) * o, i + (1 - i) * o, a + (1 - a) * o), e.opacity = n ? 1 : fc;
		}
	}
	dispose() {
		this.group.removeFromParent();
		for (let e of this.geometries) e.dispose();
		for (let e of this.parts) for (let t of e.materials) t.dispose();
		this.hitMaterial.dispose();
	}
	add(e, t, n) {
		let r = new B(), [i, a, o] = dc[e.axis], s = t.map(() => new Ie({
			color: new f().setRGB(i, a, o),
			transparent: !0,
			opacity: fc,
			depthTest: !1,
			depthWrite: !1
		}));
		t.forEach((e, t) => {
			let n = new xe(e, s[t]);
			n.renderOrder = 1e3, r.add(n);
		});
		let c = new xe(n, this.hitMaterial);
		c.userData.handle = e, r.add(c), r.traverse((e) => {
			e.userData.interactionGizmo = !0;
		}), this.group.add(r), this.parts.push({
			handle: e,
			root: r,
			hit: c,
			materials: s
		});
	}
}, _c = [
	.5,
	.5,
	.5,
	1
], vc = [
	1,
	0,
	0,
	0
], yc = Math.PI / 12, bc = class {
	constructor(e, t, n) {
		this.scene = e, this.canvas = t, this.camera = n, this.mesh = null, this.shape = "", this.geom = null, this.handles = null, this.replaced = null, this.drag = null, this.hovered = null, this.listeners = /* @__PURE__ */ new Set(), this.raycaster = new p(), this.onPointerDown = (e) => {
			if (e.target !== this.canvas || this.drag || !this.geom || e.pointerType === "mouse" && e.button !== 0) return;
			let t = this.handleAt(e.clientX, e.clientY), n = t && this.startDrag(t, e);
			n && (e.stopImmediatePropagation(), e.preventDefault(), this.drag = n, this.setHovered(n.handle), this.canvas.style.cursor = "grabbing", this.window.addEventListener("pointermove", this.onDragMove, !0), this.window.addEventListener("pointerup", this.onDragEnd, !0), this.window.addEventListener("pointercancel", this.onDragEnd, !0));
		}, this.onDragMove = (e) => {
			let t = this.drag;
			if (!t || e.pointerId !== t.pointerId) return;
			e.stopImmediatePropagation();
			let n = this.dragTo(t, e);
			n && (this.geom = n, this.draw(), this.update(), this.emit(!1));
		}, this.onDragEnd = (e) => {
			this.drag && e.pointerId === this.drag.pointerId && (e.stopImmediatePropagation(), this.endDrag(), this.canvas.style.cursor = "grab", this.emit(!0));
		}, this.onHover = (e) => {
			this.drag || this.setHovered(this.handleAt(e.clientX, e.clientY));
		}, this.onLeave = () => {
			this.drag || this.setHovered(null);
		}, this.window = t.ownerDocument.defaultView, this.window.addEventListener("pointerdown", this.onPointerDown, !0), this.canvas.addEventListener("pointermove", this.onHover), this.canvas.addEventListener("pointerleave", this.onLeave);
	}
	show(e, t = 1) {
		if (!this.mesh) {
			let e = new fe(jt(null, -1, t));
			this.mesh = new xe(new c(), e), this.mesh.castShadow = !0, this.mesh.userData.interactionGizmo = !0, this.scene.add(this.mesh);
		}
		this.geom = {
			type: e.type,
			size: Array.from(e.size),
			pos: Array.from(e.pos),
			quat: Array.from(e.quat ?? vc),
			rgba: Array.from(e.rgba ?? _c)
		}, this.draw(), this.setHandles(e.handles), this.replace(e.replaces), this.update();
	}
	hide() {
		this.setHandles(void 0), this.replace(void 0), this.geom = null, this.mesh && (this.scene.remove(this.mesh), this.mesh.geometry.dispose(), this.mesh.material.dispose(), this.mesh = null, this.shape = "");
	}
	hit(e, t) {
		return this.mesh ? this.handleAt(e, t) ? !0 : (this.aim(e, t), this.mesh.updateMatrixWorld(), this.raycaster.intersectObject(this.mesh, !1).length > 0) : !1;
	}
	onChange(e) {
		return this.listeners.add(e), () => this.listeners.delete(e);
	}
	update() {
		if (!this.handles || !this.geom) return;
		let e = ce(this.geom.pos), t = this.camera.getWorldPosition(new z()), n = e.clone().sub(t).dot(this.camera.getWorldDirection(new z())), r = this.canvas.clientHeight;
		if (this.handles.group.visible = n > 0 && r > 0, !this.handles.group.visible) return;
		let i = 2 * n * Math.tan(ie.degToRad(this.camera.fov) / 2) / r;
		this.handles.layout(this.geom, i, t);
	}
	onSceneLoaded() {
		this.replaced = null;
	}
	dispose() {
		this.hide(), this.window.removeEventListener("pointerdown", this.onPointerDown, !0), this.canvas.removeEventListener("pointermove", this.onHover), this.canvas.removeEventListener("pointerleave", this.onLeave), this.listeners.clear();
	}
	draw() {
		let e = this.mesh, t = this.geom;
		if (!e || !t) return;
		let n = `${t.type} ${t.size.join(" ")}`;
		n !== this.shape && (e.geometry.dispose(), e.geometry = kt(t.type, t.size), this.shape = n);
		let [r, i, a, o] = t.rgba, s = e.material;
		s.color.setRGB(r, i, a), s.opacity = o, s.transparent !== o < 1 && (s.transparent = o < 1, s.needsUpdate = !0), e.position.copy(ce(t.pos)), zt(Float32Array.from(t.quat), 0, e.quaternion), At(t.type, t.size, e.scale);
	}
	setHandles(e) {
		let t = this.geom?.type;
		this.handles && this.handles.kind === e && this.handles.type === t || (this.endDrag(), this.handles?.dispose(), this.handles = null, this.setHovered(null), e && t && (this.handles = new gc(e, t), this.handles.highlight(null), this.scene.add(this.handles.group), this.update()));
	}
	replace(e) {
		if (this.replaced?.geom === e) return;
		for (let e of this.replaced?.meshes ?? []) e.visible = !0;
		if (this.replaced = null, e === void 0) return;
		let t = [];
		this.scene.traverse((n) => {
			n.userData.geomId === e && n.visible && !n.userData.interactionGizmo && t.push(n);
		});
		for (let e of t) e.visible = !1;
		this.replaced = {
			geom: e,
			meshes: t
		};
	}
	aim(e, t) {
		let n = this.canvas.getBoundingClientRect(), r = new y((e - n.left) / n.width * 2 - 1, -((t - n.top) / n.height) * 2 + 1);
		this.raycaster.setFromCamera(r, this.camera);
	}
	along(e, t, n, r) {
		this.aim(n, r);
		let i = de(this.raycaster.ray.origin), a = de(this.raycaster.ray.direction), o = t.dot(a), s = 1 - o * o;
		if (s < 1e-6) return null;
		let c = e.clone().sub(i);
		return (o * a.dot(c) - t.dot(c)) / s;
	}
	screenCentre(e) {
		let t = this.canvas.getBoundingClientRect(), n = ce(e.pos).project(this.camera);
		return {
			x: t.left + (n.x + 1) / 2 * t.width,
			y: t.top + (1 - n.y) / 2 * t.height
		};
	}
	startDrag(e, t) {
		let n = this.geom, { pointerId: r } = t;
		if (e.kind === "size") {
			let i = ac(n.quat, e.axis), a = new z(...n.pos).addScaledVector(i, rc(n.type, n.size, e.axis)), o = this.along(a, i, t.clientX, t.clientY);
			return o === null ? null : {
				pointerId: r,
				handle: e,
				start: n,
				kind: "size",
				axis: e.axis,
				index: e.index,
				base: a,
				along: i,
				from: o
			};
		}
		if (e.kind === "move") {
			let i = new z().setComponent(e.axis, 1), a = new z(...n.pos), o = this.along(a, i, t.clientX, t.clientY);
			return o === null ? null : {
				pointerId: r,
				handle: e,
				start: n,
				kind: "move",
				axis: e.axis,
				index: -1,
				base: a,
				along: i,
				from: o
			};
		}
		let { x: i, y: a } = this.screenCentre(n), o = ce(n.pos), s = ce(ac(n.quat, e.axis).toArray()), c = this.camera.getWorldPosition(new z()).sub(o).dot(s) > 0, l = Math.atan2(t.clientY - a, t.clientX - i);
		return {
			pointerId: r,
			handle: e,
			start: n,
			kind: "turn",
			axis: e.axis,
			x: i,
			y: a,
			last: l,
			swept: 0,
			sign: c ? 1 : -1
		};
	}
	dragTo(e, t) {
		if (e.kind !== "turn") {
			let n = this.along(e.base, e.along, t.clientX, t.clientY);
			return n === null ? null : e.kind === "move" ? sc(e.start, e.axis, n - e.from) : oc(e.start, e.axis, e.index, n - e.from);
		}
		let n = Math.atan2(t.clientY - e.y, t.clientX - e.x);
		e.swept += Math.atan2(Math.sin(n - e.last), Math.cos(n - e.last)), e.last = n;
		let r = -e.swept * e.sign;
		return t.shiftKey && (r = Math.round(r / yc) * yc), cc(e.start, e.axis, r);
	}
	emit(e) {
		let t = this.geom;
		if (t) for (let n of this.listeners) n({
			...t,
			size: [...t.size],
			pos: [...t.pos],
			quat: [...t.quat],
			rgba: [...t.rgba]
		}, e);
	}
	setHovered(e) {
		let t = this.hovered;
		(t?.kind !== e?.kind || t?.axis !== e?.axis) && (this.hovered = e, this.handles?.highlight(e), e ? this.canvas.style.cursor = "grab" : t && (this.canvas.style.cursor = ""));
	}
	endDrag() {
		this.drag && (this.drag = null, this.window.removeEventListener("pointermove", this.onDragMove, !0), this.window.removeEventListener("pointerup", this.onDragEnd, !0), this.window.removeEventListener("pointercancel", this.onDragEnd, !0));
	}
	handleAt(e, t) {
		return this.handles?.group.visible ? (this.aim(e, t), this.handles.hit(this.raycaster)) : null;
	}
}, xc = [
	"index",
	"middle",
	"ring",
	"pinky"
], Sc = [
	{
		radius: .01,
		length: .04
	},
	{
		radius: .009,
		length: .025
	},
	{
		radius: .008,
		length: .019
	}
], Cc = [
	{
		from: "wrist",
		to: "index-finger-phalanx-proximal",
		radius: .02,
		length: .095,
		role: "grip"
	},
	{
		from: "wrist",
		to: "pinky-finger-phalanx-proximal",
		radius: .02,
		length: .088,
		role: "grip"
	},
	{
		from: "thumb-metacarpal",
		to: "thumb-phalanx-proximal",
		radius: .014,
		length: .046,
		role: "wall"
	},
	{
		from: "thumb-phalanx-proximal",
		to: "thumb-tip",
		radius: .012,
		length: .058,
		role: "grip"
	},
	...xc.flatMap((e) => [
		{
			from: `${e}-finger-phalanx-proximal`,
			to: `${e}-finger-phalanx-intermediate`,
			...Sc[0],
			role: "wall"
		},
		{
			from: `${e}-finger-phalanx-intermediate`,
			to: `${e}-finger-phalanx-distal`,
			...Sc[1],
			role: "wall"
		},
		{
			from: `${e}-finger-phalanx-distal`,
			to: `${e}-finger-tip`,
			...Sc[2],
			role: "grip"
		}
	])
], wc = .05, Tc = .15, Ec = "contype=\"2\" conaffinity=\"1\"", Dc = `condim="6" friction="2 0.05 0.001" priority="1" solref="0.004 1" solimp="0.99 0.999 0.001" ${Ec}`, Oc = `condim="4" friction="1.5 0.02 0.001" ${Ec}`, kc = "solref=\"0.02 1\" solimp=\"0.95 0.99 0.001\"", Ac = "group=\"2\" rgba=\"1 1 1 0.1\"", jc = 100, Mc = .005, Nc = .05, Pc = 2, Fc = [
	1,
	0,
	0,
	0
], Ic = new z(0, 0, 1);
function Lc(e, t, n) {
	return `mjswan_xr${e}_${t.to}_${n}`;
}
function Rc(e) {
	return `mjswan_xr${e}_grab`;
}
function zc() {
	return Array.from({ length: Pc }, (e, t) => Rc(t));
}
function Bc(e, t) {
	return new z((e * Cc.length + t) * Nc, 0, jc);
}
function Vc(e) {
	let t = new U().setFromUnitVectors(Ic, e);
	return [
		t.w,
		t.x,
		t.y,
		t.z
	];
}
function Hc(e) {
	let t = [], n = [];
	for (let e = 0; e < Pc; e++) {
		for (let [r, i] of Cc.entries()) {
			let { x: a, y: o, z: s } = Bc(e, r), c = `${a} ${o} ${s}`, l = `<geom type="capsule" ${`size="${i.radius} ${i.length / 2}"`} ${Ac}`;
			if (i.role === "wall") {
				t.push(`    <body name="${Lc(e, i, "body")}" mocap="true" pos="${c}">\n      ${l} ${Oc}/>\n    </body>`);
				continue;
			}
			let u = i.from === "wrist" ? Tc : wc;
			t.push(`    <body name="${Lc(e, i, "target")}" mocap="true" pos="${c}"/>`), t.push(`    <body name="${Lc(e, i, "body")}" pos="${c}">\n      <freejoint/>\n      ${l} mass="${u}" ${Dc}/>\n    </body>`), n.push(`    <weld body1="${Lc(e, i, "target")}" body2="${Lc(e, i, "body")}" ${kc}/>`);
		}
		n.push(`    <weld name="${Rc(e)}" body1="${Lc(e, Cc[0], "body")}" body2="world" active="false" torquescale="1"/>`);
	}
	return Bs(e, `  <worldbody>\n${t.join("\n")}\n  </worldbody>\n  <equality>\n${n.join("\n")}\n  </equality>\n`);
}
var Uc = class {
	constructor(e, t) {
		this.bound = [], this.handOfGeom = /* @__PURE__ */ new Map(), this.from = new z(), this.to = new z(), this.hands = e, this.weld = t;
	}
	bodyIds() {
		return this.bound.flatMap((e) => e.segments.map((e) => e.bodyId));
	}
	clear() {
		this.bound = [], this.handOfGeom = /* @__PURE__ */ new Map();
	}
	bind(e, t) {
		let n = e.mjtObj.mjOBJ_BODY.value;
		this.bound = [], this.handOfGeom = /* @__PURE__ */ new Map();
		let r = /* @__PURE__ */ new Map();
		for (let [i] of this.hands.entries()) {
			let a = [];
			for (let [o, s] of Cc.entries()) {
				let c = e.mj_name2id(t, n, Lc(i, s, "body"));
				if (c < 0) continue;
				let l = s.role === "grip", u = l ? e.mj_name2id(t, n, Lc(i, s, "target")) : c;
				if (u < 0) continue;
				let d = l ? t.body_jntadr[c] : -1;
				a.push({
					segment: s,
					bodyId: c,
					geomAdr: t.body_geomadr[c],
					qposAdr: l ? t.jnt_qposadr[d] : -1,
					qvelAdr: l ? t.jnt_dofadr[d] : -1,
					mocapId: t.body_mocapid[u],
					parked: Bc(i, o),
					tracked: !1
				}), r.set(c, i);
			}
			this.bound.push({
				segments: a,
				palm: a.find((e) => e.segment === Cc[0]) ?? null,
				weld: Rc(i)
			});
		}
		for (let e = 0; e < t.ngeom; e++) {
			let n = r.get(t.geom_bodyid[e]);
			n !== void 0 && this.handOfGeom.set(e, n);
		}
		this.bound.every((e) => e.segments.length === 0);
	}
	update(e, t) {
		for (let [n, r] of this.bound.entries()) {
			let i = this.hands[n]?.joints;
			for (let n of r.segments) {
				let r = i?.[n.segment.from], a = i?.[n.segment.to];
				if (!r?.visible || !a?.visible) {
					n.tracked && this.parkSegment(t, n);
					continue;
				}
				r.getWorldPosition(this.from), a.getWorldPosition(this.to);
				let o = de(this.from), s = de(this.to), c = s.clone().sub(o), l = c.length();
				if (l < Mc) continue;
				e.geom_size[n.geomAdr * 3 + 1] = l / 2;
				let u = o.clone().add(s).multiplyScalar(.5), d = Vc(c.divideScalar(l));
				this.writeTarget(t, n, u, d), n.tracked ||= (this.writeBody(t, n, u, d), !0);
			}
		}
		this.settleGrabs(e, t);
	}
	park(e) {
		for (let t of this.bound) {
			for (let n of t.segments) this.parkSegment(e, n);
			this.weld.release(e, t.weld);
		}
	}
	parkSegment(e, t) {
		this.writeTarget(e, t, t.parked, Fc), this.writeBody(e, t, t.parked, Fc), t.tracked = !1;
	}
	writeTarget(e, t, n, r) {
		let i = t.mocapId * 3;
		e.mocap_pos[i + 0] = n.x, e.mocap_pos[i + 1] = n.y, e.mocap_pos[i + 2] = n.z;
		for (let n = 0; n < 4; n++) e.mocap_quat[t.mocapId * 4 + n] = r[n];
	}
	writeBody(e, t, n, r) {
		if (t.qposAdr < 0) return;
		let i = e.qpos;
		i[t.qposAdr + 0] = n.x, i[t.qposAdr + 1] = n.y, i[t.qposAdr + 2] = n.z;
		for (let e = 0; e < 4; e++) i[t.qposAdr + 3 + e] = r[e];
		for (let n = 0; n < 6; n++) e.qvel[t.qvelAdr + n] = 0;
	}
	settleGrabs(e, t) {
		let n = this.touchedBodies(e, t);
		for (let [r, i] of this.bound.entries()) {
			if (!this.weld.has(i.weld)) continue;
			let a = this.weld.heldBy(i.weld) !== null;
			if (!this.hands[r]?.inputState.pinching) {
				a && this.weld.release(t, i.weld);
				continue;
			}
			let o = n.get(r);
			!a && o !== void 0 && i.palm?.tracked && this.weld.hold(e, t, i.weld, i.palm.bodyId, o);
		}
	}
	touchedBodies(e, t) {
		let n = /* @__PURE__ */ new Map();
		for (let r = 0; r < t.ncon; r++) {
			let i = t.contact.get(r);
			if (!i) continue;
			let a = i.geom1, o = i.geom2;
			i.delete();
			let s = this.handOfGeom.get(a), c = this.handOfGeom.get(o), l = s !== void 0;
			if (l === (c !== void 0)) continue;
			let u = s ?? c, d = e.geom_bodyid[l ? o : a];
			if (d === 0) continue;
			let f = n.get(u) ?? /* @__PURE__ */ new Map();
			n.set(u, f);
			let p = f.get(d) ?? /* @__PURE__ */ new Set();
			f.set(d, p), p.add(l ? a : o);
		}
		return new Map([...n].map(([e, t]) => [e, [...t].reduce((e, t) => t[1].size > e[1].size ? t : e)[0]]));
	}
}, Wc = class {
	constructor() {
		this.neqData = 11, this.nRef = 2, this.slots = /* @__PURE__ */ new Map(), this.defaults = /* @__PURE__ */ new Map(), this.holding = /* @__PURE__ */ new Map();
	}
	bind(e, t, n) {
		this.neqData = e.mjNEQDATA, this.nRef = e.mjNREF, this.slots.clear(), this.defaults.clear(), this.holding.clear();
		let r = e.mjtObj.mjOBJ_EQUALITY.value;
		for (let i of n) {
			let n = e.mj_name2id(t, r, i);
			n < 0 || (this.slots.set(i, n), this.defaults.set(i, {
				obj1: t.eq_obj1id[n],
				obj2: t.eq_obj2id[n],
				data: Gc(t.eq_data, n, this.neqData),
				solref: Gc(t.eq_solref, n, this.nRef)
			}));
		}
	}
	has(e) {
		return this.slots.has(e);
	}
	holderOf(e) {
		for (let [t, n] of this.holding) if (n === e) return t;
		return null;
	}
	heldBy(e) {
		return this.holding.get(e) ?? null;
	}
	hold(e, t, n, r, i, a = {}) {
		let o = this.slots.get(n);
		if (o === void 0 || i <= 0 || r < 0) return !1;
		let s = this.holderOf(i);
		if (s !== null && s !== n) return !1;
		let c = [
			0,
			1,
			2,
			3
		].map((e) => t.xquat[r * 4 + e]), l = As(c, [
			0,
			1,
			2
		].map((e) => t.xpos[i * 3 + e] - t.xpos[r * 3 + e])), u = Ds(Os(c), [
			0,
			1,
			2,
			3
		].map((e) => t.xquat[i * 4 + e])), d = o * this.neqData;
		for (let t = 0; t < 3; t++) e.eq_data[d + t] = 0;
		for (let t = 0; t < 3; t++) e.eq_data[d + 3 + t] = l[t];
		for (let t = 0; t < 4; t++) e.eq_data[d + 6 + t] = u[t];
		return e.eq_data[d + 10] = a.torqueScale ?? 1, a.solrefTime !== void 0 && (e.eq_solref[o * this.nRef] = a.solrefTime), e.eq_obj1id[o] = r, e.eq_obj2id[o] = i, t.eq_active[o] = 1, this.holding.set(n, i), !0;
	}
	release(e, t) {
		let n = this.slots.get(t);
		n !== void 0 && (e.eq_active[n] = 0, this.holding.delete(t));
	}
	restore(e, t) {
		for (let [n, r] of this.slots) {
			let i = this.defaults.get(n);
			i && (e.eq_obj1id[r] = i.obj1, e.eq_obj2id[r] = i.obj2, Kc(e.eq_data, r, this.neqData, i.data), Kc(e.eq_solref, r, this.nRef, i.solref), t && (t.eq_active[r] = 0));
		}
		this.holding.clear();
	}
};
function Gc(e, t, n) {
	let r = [];
	for (let i = 0; i < n; i++) r.push(e[t * n + i]);
	return r;
}
function Kc(e, t, n, r) {
	for (let i = 0; i < n; i++) e[t * n + i] = r[i];
}
//#endregion
//#region src/core/xr/locomotion.ts
var qc = new z(0, 1, 0), Jc = .15, Yc = 1.5, Xc = 90, Zc = new z(), Qc = new z(), $c = new z(), el = new U();
function tl(e) {
	let t = e.axes, [n, r] = t.length >= 4 ? [t[2], t[3]] : [t[0], t[1]];
	return [nl(n ?? 0), nl(r ?? 0)];
}
function nl(e) {
	return Math.abs(e) < Jc ? 0 : e;
}
function rl(e, t, n, r) {
	if (!n || r <= 0) return;
	let i = null, a = 0;
	for (let e of n.inputSources) {
		if (!e.gamepad) continue;
		let [t, n] = tl(e.gamepad);
		e.handedness === "right" ? a = t : i = [t, n];
	}
	i && il(e, t, i[0], i[1], r), a !== 0 && al(e, t, a, r);
}
function il(e, t, n, r, i) {
	(n !== 0 || r !== 0) && (t.getWorldDirection(Zc), Zc.y = 0, !(Zc.lengthSq() < 1e-6) && (Zc.normalize(), Qc.crossVectors(Zc, qc).normalize(), e.position.addScaledVector(Zc, -r * Yc * i), e.position.addScaledVector(Qc, n * Yc * i)));
}
function al(e, t, n, r) {
	let i = -n * Xc * r * Math.PI / 180;
	el.setFromAxisAngle(qc, i), t.getWorldPosition($c), e.position.sub($c).applyQuaternion(el).add($c), e.quaternion.premultiply(el).normalize();
}
//#endregion
//#region src/core/xr/session.ts
var ol = ["vr", "ar"], sl = {
	vr: "immersive-vr",
	ar: "immersive-ar"
}, cl = {
	vr: {
		enter: "Enter VR",
		exit: "Exit VR"
	},
	ar: {
		enter: "Start AR",
		exit: "Stop AR"
	}
};
function ll(e, t) {
	return ol.filter((t) => e[t]).map((e) => ({
		id: e,
		label: t === e ? cl[e].exit : cl[e].enter,
		active: t === e
	}));
}
function ul(e, t) {
	let n = e === "vr" ? [
		"local-floor",
		"bounded-floor",
		"layers"
	] : ["local-floor"];
	return t && n.push("hand-tracking"), { optionalFeatures: n };
}
function dl(e) {
	return e.format === "mjb" ? "This scene was built as a compiled model, so hands cannot be added." : e.hasPolicy && !e.prefixed ? "Hands would change what this scene's policy reads." : null;
}
//#endregion
//#region src/core/xr/passthrough.ts
var fl = class {
	constructor(e) {
		this.background = null, this.active = !1, this.scene = e;
	}
	enter() {
		this.active || (this.active = !0, this.hide());
	}
	exit() {
		this.active && (this.active = !1, this.scene.background = this.background, this.background = null, this.setPlanes(!0));
	}
	refresh() {
		this.active && this.hide();
	}
	hide() {
		this.scene.background !== null && (this.background = this.scene.background), this.scene.background = null, this.setPlanes(!1);
	}
	setPlanes(e) {
		this.scene.traverse((t) => {
			t.userData.isGroundPlane === !0 && (t.visible = e);
		});
	}
}, pl = {
	lookat: [
		0,
		0,
		0
	],
	distance: 4,
	elevation: -30,
	azimuth: -135,
	fovy: 45
};
function ml(e, t, n, r) {
	let i = n * Math.PI / 180, a = r * Math.PI / 180, o = e[0] - t * Math.cos(i) * Math.cos(a), s = e[1] - t * Math.cos(i) * Math.sin(a), c = e[2] - t * Math.sin(i);
	return ce([
		o,
		s,
		c
	]);
}
function hl(e) {
	let t = e.length(), n = 180 / Math.PI;
	return {
		distance: t,
		azimuth: Math.atan2(-e.y, -e.x) * n,
		elevation: t > 1e-9 ? Math.asin(-e.z / t) * n : 0
	};
}
function gl(e, t, n, r, i, a = /* @__PURE__ */ new Set()) {
	let o = {
		trackBodyId: null,
		prevBodyPos: null
	};
	n.enabled = !0;
	let s = e?.lookat ?? pl.lookat, c = e?.distance ?? pl.distance, l = e?.elevation ?? pl.elevation, u = e?.azimuth ?? pl.azimuth;
	if (t.fov = e?.fovy ?? pl.fovy, t.updateProjectionMatrix(), t.position.copy(ml(s, c, l, u)), n.target.copy(ce(s)), n.update(), !e) return o;
	let d = e.originType ?? "AUTO";
	if (d === "ASSET_BODY" && e.bodyName && r) {
		let t = e.bodyName, n = e.entityName, i = n ? `${n}/${t}` : null;
		for (let e = 0; e < r.nbody; e++) {
			let n = r.body(e).name;
			if (n === t || n === i || n.endsWith(`/${t}`)) {
				o.trackBodyId = e;
				break;
			}
		}
		o.trackBodyId;
	} else if ((d === "AUTO" || d === "ASSET_ROOT") && r) {
		for (let e = 1; e < r.nbody; e++) if (!a.has(e)) {
			o.trackBodyId = e;
			break;
		}
	}
	if (o.trackBodyId !== null && i) {
		let e = ce(i.xpos.slice(o.trackBodyId * 3, o.trackBodyId * 3 + 3));
		t.position.add(e), n.target.add(e), o.prevBodyPos = e, n.update();
	}
	return o;
}
function _l(e, t, n, r, i = !1) {
	if (r.trackBodyId !== null) {
		let a = r.trackBodyId, o = ce(e.xpos.slice(a * 3, a * 3 + 3));
		if (r.prevBodyPos !== null) {
			let e = o.clone().sub(r.prevBodyPos);
			n.target.add(e), i || t.position.add(e);
		}
		r.prevBodyPos = o;
	}
}
//#endregion
//#region src/core/action/commandDelay.ts
var vl = class {
	constructor(e, t) {
		this.spec = e, this.rng = t, this.pointer = 0, this.lag = 0, this.stepCount = 0, this.phase = 0;
		let n = Math.max(e.maxLag, 0) + 1;
		this.history = Array.from({ length: n }, () => new Float32Array(e.indices.length)), this.reset();
	}
	reset() {
		for (let e of this.history) e.fill(0);
		this.lag = 0, this.stepCount = 0;
		let { updatePeriod: e, perEnvPhase: t } = this.spec;
		this.phase = e > 0 && t ? this.randint(0, e - 1) : 0, this.advance();
	}
	apply(e) {
		let { indices: t } = this.spec, n = this.history.length;
		this.pointer = (this.pointer + 1) % n;
		let r = this.history[this.pointer];
		for (let n = 0; n < t.length; n++) r[n] = e[t[n]];
		this.advance();
		let i = this.history[(this.pointer - this.lag + n) % n];
		for (let n = 0; n < t.length; n++) e[t[n]] = i[n];
	}
	advance() {
		let { minLag: e, maxLag: t, holdProb: n, updatePeriod: r } = this.spec, i = r > 0 ? (this.stepCount + this.phase) % r === 0 : !0, a = this.randint(e, t);
		n > 0 && (i = this.rng.next() >= n && i), i && (this.lag = a), this.stepCount += 1;
	}
	randint(e, t) {
		return e + Math.floor(this.rng.next() * (t - e + 1));
	}
};
function yl(e, t, n) {
	let r = [];
	for (let n of e ?? []) {
		let e = [];
		for (let r of n.joints ?? []) {
			let n = t.indexOf(r);
			n >= 0 && e.push(n);
		}
		if (e.length === 0) continue;
		let i = Math.max(0, Math.floor(n.min_lag ?? 0));
		r.push({
			indices: e,
			minLag: i,
			maxLag: Math.max(i, Math.floor(n.max_lag ?? i)),
			holdProb: n.hold_prob ?? 0,
			updatePeriod: Math.max(0, Math.floor(n.update_period ?? 0)),
			perEnvPhase: n.per_env_phase ?? !0
		});
	}
	return r;
}
//#endregion
//#region src/core/action/applyAction.ts
var bl = 10, xl = 8;
function Sl(e, t, n) {
	if (t < 0) return !1;
	let r = e.actuator_biastype[t];
	if (r === n.affine) return !0;
	if (r !== n.dcMotor) return !1;
	let i = e.actuator_gainprm[t * bl + xl];
	return i === 1 || i === 2;
}
function Cl(e, t, n, r) {
	return {
		rampFrom: e.interpolate === !0 ? new Float32Array(t.length) : null,
		holdS: typeof e.hold_s == "number" ? e.hold_s : null,
		holding: !1,
		delays: yl(e.delay, t, n).map((e) => new vl(e, r))
	};
}
function wl(e, t) {
	return e !== null && Math.fround(Math.fround(t.episodeLength) * Math.fround(t.stepDt)) < Math.fround(e);
}
function Tl(e, t, n) {
	e.holding = wl(e.holdS, n);
	let r = e.controlType === "joint_position_command" ? e.commandValue : t;
	if (e.active = !!r, !r) return;
	e.rampFrom?.set(e.processed);
	let { controlType: i, actionIndices: a, actionScale: o, actionOffset: s, clipLo: c, clipHi: l, processed: u } = e, d = u.length;
	if (i === "joint_position" || i === "joint_position_reference" || i === "joint_position_command") {
		let t = e.referenceJointPos ?? null;
		for (let n = 0; n < d; n++) {
			let i = t ? t[a[n]] ?? 0 : e.defaultJointPos[n];
			u[n] = jl(i + s[n] + o[n] * (r[a[n]] ?? 0), c[n], l[n]);
		}
	} else if (i === "joint_position_relative" || i === "joint_velocity" || i === "torque") for (let e = 0; e < d; e++) u[e] = jl(o[e] * (r[a[e]] ?? 0) + s[e], c[e], l[e]);
	else if (i === "muscle_activation") for (let t = 0; t < d; t++) {
		let n = jl((r[a[t]] ?? 0) * o[t] + s[t], c[t], l[t]);
		u[t] = e.muscleMode === "sigmoid" ? 1 / (1 + Math.exp(-5 * (n - .5))) : e.muscleMode === "direct" ? jl(n, e.muscleCtrlLo[t] ?? -1, e.muscleCtrlHi[t] ?? 1) : Al(n);
	}
	else e.active = !1;
}
function El(e, t, n = 0, r = 1) {
	let i = {
		ctrl: e.ctrl,
		qpos: e.qpos,
		qvel: e.qvel
	};
	i.ctrl.fill(0);
	for (let e of t) e.active && kl(i, e, n, r);
}
var Dl = /* @__PURE__ */ new WeakMap();
function Ol(e) {
	let t = Dl.get(e);
	return (!t || t.length !== e.processed.length) && (t = new Float32Array(e.processed.length), Dl.set(e, t)), t;
}
function kl({ ctrl: e, qpos: t, qvel: n }, r, i, a) {
	let { controlType: o, ctrlAdr: s, qposAdr: c, qvelAdr: l, processed: u, positionActuator: d, kp: f, kd: p } = r, m = u.length;
	if (o === "muscle_activation") {
		for (let t = 0; t < m; t++) s[t] >= 0 && (e[s[t]] = u[t]);
		return;
	}
	let h = Ol(r), g = o !== "joint_velocity" && o !== "torque";
	if (g) {
		let e = r.rampFrom, n = e ? (i + 1) / a : 1, s = o === "joint_position_relative";
		for (let i = 0; i < m; i++) {
			let a = e ? (1 - n) * e[i] + n * u[i] : u[i];
			r.holding ? h[i] = t[c[i]] : s ? h[i] = t[c[i]] + a : h[i] = a - r.encoderBias[i];
		}
	} else h.set(u);
	for (let e of r.delays) e.apply(h);
	for (let r = 0; r < m; r++) {
		let i = s[r];
		i < 0 || (e[i] = o === "torque" || d[r] ? h[r] : g ? f[r] * (h[r] - t[c[r]]) + p[r] * (0 - n[l[r]]) : p[r] * (h[r] - n[l[r]]));
	}
}
function Al(e) {
	return e < 0 ? 0 : e > 1 ? 1 : e;
}
function jl(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function Ml(e, t, n) {
	let r = new Float32Array(n).fill(-Infinity), i = new Float32Array(n).fill(Infinity);
	if (!e) return {
		clipLo: r,
		clipHi: i
	};
	for (let [a, o] of Object.entries(e)) {
		if (!Array.isArray(o) || o.length < 2) continue;
		let e = 0, s = RegExp(`^(?:${a})$`);
		for (let a = 0; a < Math.min(n, t.length); a++) s.test(t[a]) && (r[a] = o[0], i[a] = o[1], e++);
	}
	return {
		clipLo: r,
		clipHi: i
	};
}
function Nl(e) {
	return typeof e != "number" || !Number.isFinite(e) || e < 0 ? null : e;
}
function Pl(e, t) {
	if (t !== null) for (let n = 0; n < e.length; n++) e[n] = Math.min(t, Math.max(-t, e[n]));
}
function Fl(e, t, n, r, i, a, o) {
	for (let s = 0; s < i; s++) El(n, r, s, i), a?.(), e.mj_step(t, n), o?.();
}
//#endregion
//#region src/core/action/ActionManager.ts
var Il = class {
	constructor(e) {
		this.entries = e, this.lastError = /* @__PURE__ */ new Map(), this.terms = e.map((e) => e.term), this.byName = new Map(e.map((e) => [e.name, e]));
	}
	async process(e, t, { fresh: n = !0 } = {}) {
		for (let { name: r, term: i, traced: a } of this.entries) {
			if (!a) {
				Tl(i, e, t);
				continue;
			}
			if (i.holding = wl(i.holdS, t), i.rampFrom?.set(i.processed), !n) continue;
			let o = new Float32Array(i.actionIndices.length);
			for (let t = 0; t < o.length; t++) o[t] = e[i.actionIndices[t]] ?? 0;
			try {
				await a.process(o, i.processed, i.rampFrom) && (i.active = !0, this.lastError.delete(r));
			} catch (e) {
				let t = String(e);
				this.lastError.get(r) !== t && this.lastError.set(r, t);
			}
		}
	}
	async reset() {
		for (let { traced: e } of this.entries) await e?.reset();
	}
	resetActuators() {
		for (let e of this.terms) for (let t of e.delays) t.reset();
	}
	getStateField(e, t) {
		let n = this.byName.get(e);
		return n ? n.traced?.getStateField(t) || (t === "_processed_actions" ? Float32Array.from(n.term.processed) : null) : null;
	}
};
//#endregion
//#region src/core/event/entityWrite.ts
function Ll(e) {
	let t = new Uint8Array(e.names), n = new TextDecoder(), r = [];
	for (let i = 0; i < e.njnt; i++) {
		let a = e.name_jntadr[i], o = a;
		for (; o < t.length && t[o] !== 0;) o++;
		r.push(n.decode(t.subarray(a, o)));
	}
	return r;
}
function Rl(e, t, n) {
	if (!t) return n;
	let r = Ll(e), i = n.filter((e) => r[e].startsWith(`${t}/`));
	return i.length > 0 ? i : r.some((e) => e.includes("/")) ? [] : n;
}
function zl(e, t) {
	let n = [];
	for (let t = 0; t < e.njnt; t++) e.jnt_type[t] === 0 && n.push(t);
	return Rl(e, t, n)[0] ?? -1;
}
function Bl(e, t) {
	let n = [];
	for (let t = 0; t < e.njnt; t++) e.jnt_type[t] >= 2 && n.push(t);
	return Rl(e, t, n);
}
function Vl(e, t, n) {
	let r = e.fields?.indexOf(n) ?? -1;
	return t[(r >= 0 ? e.outputs?.[r] : void 0) ?? `${e.kind}__${n}`];
}
function Hl(e, t, n, r) {
	if (n.gate !== void 0 && !((r[n.gate]?.[0] ?? 0) > .5)) return !1;
	switch (n.kind) {
		case "joint_state": return Gl(e, t, n, r);
		case "root_pose": return Kl(e, t, n, Vl(n, r, "pose"));
		case "root_velocity": return Yl(e, t, n, Vl(n, r, "velocity"));
		case "root_velocity_b": return Xl(e, t, n, Vl(n, r, "velocity"));
		default: return !1;
	}
}
function Ul(e, t, n, r) {
	let i = 0;
	for (let a of n) Hl(e, t, a, r) && i++;
	return i;
}
function Wl(e, t) {
	let n = Bl(e, t.entity), r = t.joint_ids;
	return r == null || r === "all" ? n : r.map((e) => n[e] ?? -1);
}
function Gl(e, t, n, r) {
	let i = Vl(n, r, "position"), a = Vl(n, r, "velocity");
	if (!i && !a) return !1;
	let o = 0, s = Wl(e, n);
	for (let n = 0; n < s.length; n++) {
		let r = s[n];
		r < 0 || r >= e.njnt || (i && n < i.length && (t.qpos[e.jnt_qposadr[r]] = i[n], o++), a && n < a.length && (t.qvel[e.jnt_dofadr[r]] = a[n], o++));
	}
	return o > 0;
}
function Kl(e, t, n, r) {
	if (!r || r.length < 7) return !1;
	let i = zl(e, n.entity);
	if (i < 0) return !1;
	let a = e.jnt_qposadr[i];
	for (let e = 0; e < 7; e++) t.qpos[a + e] = r[e];
	return !0;
}
function ql(e, t, n, r) {
	return Jl(e, t, n, r, -1);
}
function Jl(e, t, n, r, i = 1) {
	let a = e[t], o = i * e[t + 1], s = i * e[t + 2], c = i * e[t + 3], l = n[r], u = n[r + 1], d = n[r + 2], f = 2 * (s * d - c * u), p = 2 * (c * l - o * d), m = 2 * (o * u - s * l);
	return [
		l + a * f + (s * m - c * p),
		u + a * p + (c * f - o * m),
		d + a * m + (o * p - s * f)
	];
}
function Yl(e, t, n, r) {
	if (!r || r.length < 6) return !1;
	let i = zl(e, n.entity);
	if (i < 0) return !1;
	let a = ql(t.qpos, e.jnt_qposadr[i] + 3, r, 3), o = e.jnt_dofadr[i];
	for (let e = 0; e < 3; e++) t.qvel[o + e] = r[e];
	for (let e = 0; e < 3; e++) t.qvel[o + 3 + e] = a[e];
	return !0;
}
function Xl(e, t, n, r) {
	if (!r || r.length < 6) return !1;
	let i = zl(e, n.entity);
	if (i < 0) return !1;
	let a = Jl(t.qpos, e.jnt_qposadr[i] + 3, r, 0), o = e.jnt_dofadr[i];
	for (let e = 0; e < 3; e++) t.qvel[o + e] = a[e];
	for (let e = 0; e < 3; e++) t.qvel[o + 3 + e] = r[3 + e];
	return !0;
}
//#endregion
//#region node_modules/onnxruntime-web/dist/ort.wasm.bundle.min.mjs
var Zl = Object.defineProperty, Ql = Object.getOwnPropertyDescriptor, $l = Object.getOwnPropertyNames, eu = Object.prototype.hasOwnProperty, tu = ((e) => typeof t < "u" ? t : typeof Proxy < "u" ? new Proxy(e, { get: (e, n) => (typeof t < "u" ? t : e)[n] }) : e)(function(e) {
	if (typeof t < "u") return t.apply(this, arguments);
	throw Error("Dynamic require of \"" + e + "\" is not supported");
}), Z = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, nu = (e, t) => {
	for (var n in t) Zl(e, n, {
		get: t[n],
		enumerable: !0
	});
}, ru = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (let i of $l(t)) !eu.call(e, i) && i !== n && Zl(e, i, {
		get: () => t[i],
		enumerable: !(r = Ql(t, i)) || r.enumerable
	});
	return e;
}, iu = (e) => ru(Zl({}, "__esModule", { value: !0 }), e), au, ou, su, cu, lu, uu = Z(() => {
	au = /* @__PURE__ */ new Map(), ou = [], su = (e, t, n) => {
		if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
			let r = au.get(e);
			if (r === void 0) au.set(e, {
				backend: t,
				priority: n
			});
			else {
				if (r.priority > n) return;
				if (r.priority === n && r.backend !== t) throw Error(`cannot register backend "${e}" using priority ${n}`);
			}
			if (n >= 0) {
				let t = ou.indexOf(e);
				t !== -1 && ou.splice(t, 1);
				for (let t = 0; t < ou.length; t++) if (au.get(ou[t]).priority <= n) {
					ou.splice(t, 0, e);
					return;
				}
				ou.push(e);
			}
		} else throw TypeError("not a valid backend");
	}, cu = async (e) => {
		let t = au.get(e);
		if (!t) return "backend not found.";
		if (t.initialized) return t.backend;
		if (t.aborted) return t.error;
		{
			let n = !!t.initPromise;
			try {
				return n || (t.initPromise = t.backend.init(e)), await t.initPromise, t.initialized = !0, t.backend;
			} catch (e) {
				return n || (t.error = `${e}`, t.aborted = !0), t.error;
			} finally {
				delete t.initPromise;
			}
		}
	}, lu = async (e) => {
		let t = e.executionProviders || [], n = t.map((e) => typeof e == "string" ? e : e.name), r = n.length === 0 ? ou : n, i, a = [], o = /* @__PURE__ */ new Set();
		for (let e of r) {
			let t = await cu(e);
			typeof t == "string" ? a.push({
				name: e,
				err: t
			}) : (i ||= t, i === t && o.add(e));
		}
		if (!i) throw Error(`no available backend found. ERR: ${a.map((e) => `[${e.name}] ${e.err}`).join(", ")}`);
		for (let { name: e, err: t } of a) n.includes(e);
		let s = t.filter((e) => o.has(typeof e == "string" ? e : e.name));
		return [i, new Proxy(e, { get: (e, t) => t === "executionProviders" ? s : Reflect.get(e, t) })];
	};
}), du = Z(() => {
	uu();
}), fu, pu = Z(() => {
	fu = "1.29.0";
}), mu, hu, gu = Z(() => {
	pu(), mu = "warning", hu = {
		wasm: {},
		webgl: {},
		webgpu: {},
		versions: { common: fu },
		set logLevel(e) {
			if (e !== void 0) {
				if (typeof e != "string" || [
					"verbose",
					"info",
					"warning",
					"error",
					"fatal"
				].indexOf(e) === -1) throw Error(`Unsupported logging level: ${e}`);
				mu = e;
			}
		},
		get logLevel() {
			return mu;
		}
	}, Object.defineProperty(hu, "logLevel", { enumerable: !0 });
}), Q, _u = Z(() => {
	gu(), Q = hu;
}), vu, yu, bu = Z(() => {
	vu = (e, t) => {
		let n = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
		n.width = e.dims[3], n.height = e.dims[2];
		let r = n.getContext("2d");
		if (r != null) {
			let i, a;
			t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (i = e.dims[2], a = e.dims[3]) : (i = e.dims[3], a = e.dims[2]);
			let o = t?.format === void 0 ? "RGB" : t.format, s = t?.norm, c, l;
			s === void 0 || s.mean === void 0 ? c = [
				255,
				255,
				255,
				255
			] : typeof s.mean == "number" ? c = [
				s.mean,
				s.mean,
				s.mean,
				s.mean
			] : (c = [
				s.mean[0],
				s.mean[1],
				s.mean[2],
				0
			], s.mean[3] !== void 0 && (c[3] = s.mean[3])), s === void 0 || s.bias === void 0 ? l = [
				0,
				0,
				0,
				0
			] : typeof s.bias == "number" ? l = [
				s.bias,
				s.bias,
				s.bias,
				s.bias
			] : (l = [
				s.bias[0],
				s.bias[1],
				s.bias[2],
				0
			], s.bias[3] !== void 0 && (l[3] = s.bias[3]));
			let u = a * i, d = 0, f = u, p = u * 2, m = -1;
			o === "RGBA" ? (d = 0, f = u, p = u * 2, m = u * 3) : o === "RGB" ? (d = 0, f = u, p = u * 2) : o === "RBG" && (d = 0, p = u, f = u * 2);
			for (let t = 0; t < a; t++) for (let n = 0; n < i; n++) {
				let i = (e.data[d++] - l[0]) * c[0], a = (e.data[f++] - l[1]) * c[1], o = (e.data[p++] - l[2]) * c[2], s = m === -1 ? 255 : (e.data[m++] - l[3]) * c[3];
				r.fillStyle = "rgba(" + i + "," + a + "," + o + "," + s + ")", r.fillRect(n, t, 1, 1);
			}
			if ("toDataURL" in n) return n.toDataURL();
			throw Error("toDataURL is not supported");
		}
		throw Error("Can not access image data");
	}, yu = (e, t) => {
		let n = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), r;
		if (n != null) {
			let i, a, o;
			t?.tensorLayout !== void 0 && t.tensorLayout === "NHWC" ? (i = e.dims[2], a = e.dims[1], o = e.dims[3]) : (i = e.dims[3], a = e.dims[2], o = e.dims[1]);
			let s = t !== void 0 && t.format !== void 0 ? t.format : "RGB", c = t?.norm, l, u;
			c === void 0 || c.mean === void 0 ? l = [
				255,
				255,
				255,
				255
			] : typeof c.mean == "number" ? l = [
				c.mean,
				c.mean,
				c.mean,
				c.mean
			] : (l = [
				c.mean[0],
				c.mean[1],
				c.mean[2],
				255
			], c.mean[3] !== void 0 && (l[3] = c.mean[3])), c === void 0 || c.bias === void 0 ? u = [
				0,
				0,
				0,
				0
			] : typeof c.bias == "number" ? u = [
				c.bias,
				c.bias,
				c.bias,
				c.bias
			] : (u = [
				c.bias[0],
				c.bias[1],
				c.bias[2],
				0
			], c.bias[3] !== void 0 && (u[3] = c.bias[3]));
			let d = a * i;
			if (t !== void 0 && (t.format !== void 0 && o === 4 && t.format !== "RGBA" || o === 3 && t.format !== "RGB" && t.format !== "BGR")) throw Error("Tensor format doesn't match input tensor dims");
			let f = 0, p = 1, m = 2, h = 3, g = 0, _ = d, v = d * 2, y = -1;
			s === "RGBA" ? (g = 0, _ = d, v = d * 2, y = d * 3) : s === "RGB" ? (g = 0, _ = d, v = d * 2) : s === "RBG" && (g = 0, v = d, _ = d * 2), r = n.createImageData(i, a);
			for (let t = 0; t < a * i; f += 4, p += 4, m += 4, h += 4, t++) r.data[f] = (e.data[g++] - u[0]) * l[0], r.data[p] = (e.data[_++] - u[1]) * l[1], r.data[m] = (e.data[v++] - u[2]) * l[2], r.data[h] = y === -1 ? 255 : (e.data[y++] - u[3]) * l[3];
		} else throw Error("Can not access image data");
		return r;
	};
}), xu, Su, Cu, wu, Tu, Eu, Du = Z(() => {
	Lu(), xu = (e, t) => {
		if (e === void 0) throw Error("Image buffer must be defined");
		if (t.height === void 0 || t.width === void 0) throw Error("Image height and width must be defined");
		if (t.tensorLayout === "NHWC") throw Error("NHWC Tensor layout is not supported yet");
		let { height: n, width: r } = t, i = t.norm ?? {
			mean: 255,
			bias: 0
		}, a, o;
		a = typeof i.mean == "number" ? [
			i.mean,
			i.mean,
			i.mean,
			i.mean
		] : [
			i.mean[0],
			i.mean[1],
			i.mean[2],
			i.mean[3] ?? 255
		], o = typeof i.bias == "number" ? [
			i.bias,
			i.bias,
			i.bias,
			i.bias
		] : [
			i.bias[0],
			i.bias[1],
			i.bias[2],
			i.bias[3] ?? 0
		];
		let s = t.format === void 0 ? "RGBA" : t.format, c = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", l = n * r, u = c === "RGBA" ? new Float32Array(l * 4) : new Float32Array(l * 3), d = 4, f = 0, p = 1, m = 2, h = 3, g = 0, _ = l, v = l * 2, y = -1;
		s === "RGB" && (d = 3, f = 0, p = 1, m = 2, h = -1), c === "RGBA" ? y = l * 3 : c === "RBG" ? (g = 0, v = l, _ = l * 2) : c === "BGR" && (v = 0, _ = l, g = l * 2);
		for (let t = 0; t < l; t++, f += d, m += d, p += d, h += d) u[g++] = (e[f] + o[0]) / a[0], u[_++] = (e[p] + o[1]) / a[1], u[v++] = (e[m] + o[2]) / a[2], y !== -1 && h !== -1 && (u[y++] = (e[h] + o[3]) / a[3]);
		return c === "RGBA" ? new Iu("float32", u, [
			1,
			4,
			n,
			r
		]) : new Iu("float32", u, [
			1,
			3,
			n,
			r
		]);
	}, Su = async (e, t) => {
		let n = typeof HTMLImageElement < "u" && e instanceof HTMLImageElement, r = typeof ImageData < "u" && e instanceof ImageData, i = typeof ImageBitmap < "u" && e instanceof ImageBitmap, a = typeof e == "string", o, s = t ?? {}, c = () => {
			if (typeof document < "u") return document.createElement("canvas");
			if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
			throw Error("Canvas is not supported");
		}, l = (e) => typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? e.getContext("2d") : null;
		if (n) {
			let n = c();
			n.width = e.width, n.height = e.height;
			let r = l(n);
			if (r != null) {
				let n = e.height, i = e.width;
				if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (n = t.resizedHeight, i = t.resizedWidth), t !== void 0) {
					if (s = t, t.tensorFormat !== void 0) throw Error("Image input config format must be RGBA for HTMLImageElement");
					s.tensorFormat = "RGBA", s.height = n, s.width = i;
				} else s.tensorFormat = "RGBA", s.height = n, s.width = i;
				r.drawImage(e, 0, 0), o = r.getImageData(0, 0, i, n).data;
			} else throw Error("Can not access image data");
		} else if (r) {
			let n, r;
			if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (n = t.resizedHeight, r = t.resizedWidth) : (n = e.height, r = e.width), t !== void 0 && (s = t), s.format = "RGBA", s.height = n, s.width = r, t !== void 0) {
				let t = c();
				t.width = r, t.height = n;
				let i = l(t);
				if (i != null) i.putImageData(e, 0, 0), o = i.getImageData(0, 0, r, n).data;
				else throw Error("Can not access image data");
			} else o = e.data;
		} else if (i) {
			if (t === void 0) throw Error("Please provide image config with format for Imagebitmap");
			let n = c();
			n.width = e.width, n.height = e.height;
			let r = l(n);
			if (r != null) {
				let t = e.height, n = e.width;
				return r.drawImage(e, 0, 0, n, t), o = r.getImageData(0, 0, n, t).data, s.height = t, s.width = n, xu(o, s);
			}
			throw Error("Can not access image data");
		} else {
			if (a) return new Promise((t, n) => {
				let r = c(), i = l(r);
				if (!e || !i) return n();
				let a = new Image();
				a.crossOrigin = "Anonymous", a.src = e, a.onload = () => {
					r.width = a.width, r.height = a.height, i.drawImage(a, 0, 0, r.width, r.height);
					let e = i.getImageData(0, 0, r.width, r.height);
					s.height = r.height, s.width = r.width, t(xu(e.data, s));
				};
			});
			throw Error("Input data provided is not supported - aborted tensor creation");
		}
		if (o !== void 0) return xu(o, s);
		throw Error("Input data provided is not supported - aborted tensor creation");
	}, Cu = (e, t) => {
		let { width: n, height: r, download: i, dispose: a } = t;
		return new Iu({
			location: "texture",
			type: "float32",
			texture: e,
			dims: [
				1,
				r,
				n,
				4
			],
			download: i,
			dispose: a
		});
	}, wu = (e, t) => {
		let { dataType: n, dims: r, download: i, dispose: a } = t;
		return new Iu({
			location: "gpu-buffer",
			type: n ?? "float32",
			gpuBuffer: e,
			dims: r,
			download: i,
			dispose: a
		});
	}, Tu = (e, t) => {
		let { dataType: n, dims: r, download: i, dispose: a } = t;
		return new Iu({
			location: "ml-tensor",
			type: n ?? "float32",
			mlTensor: e,
			dims: r,
			download: i,
			dispose: a
		});
	}, Eu = (e, t, n) => new Iu({
		location: "cpu-pinned",
		type: e,
		data: t,
		dims: n ?? [t.length]
	});
}), Ou, ku, Au, ju, Mu = Z(() => {
	Ou = /* @__PURE__ */ new Map([
		["float32", Float32Array],
		["uint8", Uint8Array],
		["int8", Int8Array],
		["uint16", Uint16Array],
		["int16", Int16Array],
		["int32", Int32Array],
		["bool", Uint8Array],
		["float64", Float64Array],
		["uint32", Uint32Array],
		["int4", Uint8Array],
		["uint4", Uint8Array]
	]), ku = /* @__PURE__ */ new Map([
		[Float32Array, "float32"],
		[Uint8Array, "uint8"],
		[Int8Array, "int8"],
		[Uint16Array, "uint16"],
		[Int16Array, "int16"],
		[Int32Array, "int32"],
		[Float64Array, "float64"],
		[Uint32Array, "uint32"]
	]), Au = !1, ju = () => {
		if (!Au) {
			Au = !0;
			let e = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, n = globalThis.Float16Array, r = typeof n < "u" && n.from;
			e && (Ou.set("int64", BigInt64Array), ku.set(BigInt64Array, "int64")), t && (Ou.set("uint64", BigUint64Array), ku.set(BigUint64Array, "uint64")), r ? (Ou.set("float16", n), ku.set(n, "float16")) : Ou.set("float16", Uint16Array);
		}
	};
}), Nu, Pu, Fu = Z(() => {
	Lu(), Nu = (e) => {
		let t = 1;
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r != "number" || !Number.isSafeInteger(r)) throw TypeError(`dims[${n}] must be an integer, got: ${r}`);
			if (r < 0) throw RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);
			t *= r;
		}
		return t;
	}, Pu = (e, t) => {
		switch (e.location) {
			case "cpu": return new Iu(e.type, e.data, t);
			case "cpu-pinned": return new Iu({
				location: "cpu-pinned",
				data: e.data,
				type: e.type,
				dims: t
			});
			case "texture": return new Iu({
				location: "texture",
				texture: e.texture,
				type: e.type,
				dims: t
			});
			case "gpu-buffer": return new Iu({
				location: "gpu-buffer",
				gpuBuffer: e.gpuBuffer,
				type: e.type,
				dims: t
			});
			case "ml-tensor": return new Iu({
				location: "ml-tensor",
				mlTensor: e.mlTensor,
				type: e.type,
				dims: t
			});
			default: throw Error(`tensorReshape: tensor location ${e.location} is not supported`);
		}
	};
}), Iu, Lu = Z(() => {
	bu(), Du(), Mu(), Fu(), Iu = class {
		constructor(e, t, n) {
			ju();
			let r, i;
			if (typeof e == "object" && "location" in e) switch (this.dataLocation = e.location, r = e.type, i = e.dims, e.location) {
				case "cpu-pinned": {
					let t = Ou.get(r);
					if (!t) throw TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);
					if (!(e.data instanceof t)) throw TypeError(`buffer should be of type ${t.name}`);
					this.cpuData = e.data;
					break;
				}
				case "texture":
					if (r !== "float32") throw TypeError(`unsupported type "${r}" to create tensor from texture`);
					this.gpuTextureData = e.texture, this.downloader = e.download, this.disposer = e.dispose;
					break;
				case "gpu-buffer":
					if (r !== "float32" && r !== "float16" && r !== "int32" && r !== "int64" && r !== "uint32" && r !== "uint8" && r !== "bool" && r !== "uint4" && r !== "int4") throw TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);
					this.gpuBufferData = e.gpuBuffer, this.downloader = e.download, this.disposer = e.dispose;
					break;
				case "ml-tensor":
					if (r !== "float32" && r !== "float16" && r !== "int32" && r !== "int64" && r !== "uint32" && r !== "uint64" && r !== "int8" && r !== "uint8" && r !== "bool" && r !== "uint4" && r !== "int4") throw TypeError(`unsupported type "${r}" to create tensor from MLTensor`);
					this.mlTensorData = e.mlTensor, this.downloader = e.download, this.disposer = e.dispose;
					break;
				default: throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
			}
			else {
				let a, o;
				if (typeof e == "string") {
					if (r = e, o = n, e === "string") {
						if (!Array.isArray(t)) throw TypeError("A string tensor's data must be a string array.");
						a = t;
					} else {
						let n = Ou.get(e);
						if (n === void 0) throw TypeError(`Unsupported tensor type: ${e}.`);
						if (Array.isArray(t)) {
							if (e === "float16" && n === Uint16Array || e === "uint4" || e === "int4") throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${n.name} as data.`);
							a = e === "uint64" || e === "int64" ? n.from(t, BigInt) : n.from(t);
						} else if (t instanceof n) a = t;
						else if (t instanceof Uint8ClampedArray) {
							if (e === "uint8") a = Uint8Array.from(t);
							else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
						} else if (e === "float16" && t instanceof Uint16Array && n !== Uint16Array) a = new globalThis.Float16Array(t.buffer, t.byteOffset, t.length);
						else throw TypeError(`A ${r} tensor's data must be type of ${n}`);
					}
				} else if (o = t, Array.isArray(e)) {
					if (e.length === 0) throw TypeError("Tensor type cannot be inferred from an empty array.");
					let t = typeof e[0];
					if (t === "string") r = "string", a = e;
					else if (t === "boolean") r = "bool", a = Uint8Array.from(e);
					else throw TypeError(`Invalid element type of data array: ${t}.`);
				} else if (e instanceof Uint8ClampedArray) r = "uint8", a = Uint8Array.from(e);
				else {
					let t = ku.get(e.constructor);
					if (t === void 0) throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);
					r = t, a = e;
				}
				if (o === void 0) o = [a.length];
				else if (!Array.isArray(o)) throw TypeError("A tensor's dims must be a number array");
				i = o, this.cpuData = a, this.dataLocation = "cpu";
			}
			let a = Nu(i);
			if (this.cpuData && a !== this.cpuData.length && (r !== "uint4" && r !== "int4" || Math.ceil(a / 2) !== this.cpuData.length)) throw Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);
			this.type = r, this.dims = i, this.size = a;
		}
		static async fromImage(e, t) {
			return Su(e, t);
		}
		static fromTexture(e, t) {
			return Cu(e, t);
		}
		static fromGpuBuffer(e, t) {
			return wu(e, t);
		}
		static fromMLTensor(e, t) {
			return Tu(e, t);
		}
		static fromPinnedBuffer(e, t, n) {
			return Eu(e, t, n);
		}
		toDataURL(e) {
			return vu(this, e);
		}
		toImageData(e) {
			return yu(this, e);
		}
		get data() {
			if (this.ensureValid(), !this.cpuData) throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
			return this.cpuData;
		}
		get location() {
			return this.dataLocation;
		}
		get texture() {
			if (this.ensureValid(), !this.gpuTextureData) throw Error("The data is not stored as a WebGL texture.");
			return this.gpuTextureData;
		}
		get gpuBuffer() {
			if (this.ensureValid(), !this.gpuBufferData) throw Error("The data is not stored as a WebGPU buffer.");
			return this.gpuBufferData;
		}
		get mlTensor() {
			if (this.ensureValid(), !this.mlTensorData) throw Error("The data is not stored as a WebNN MLTensor.");
			return this.mlTensorData;
		}
		async getData(e) {
			switch (this.ensureValid(), this.dataLocation) {
				case "cpu":
				case "cpu-pinned": return this.data;
				case "texture":
				case "gpu-buffer":
				case "ml-tensor":
					if (!this.downloader) throw Error("The current tensor is not created with a specified data downloader.");
					if (this.isDownloading) throw Error("The current tensor is being downloaded.");
					try {
						this.isDownloading = !0;
						let t = await this.downloader();
						return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = t, e && this.disposer && (this.disposer(), this.disposer = void 0), t;
					} finally {
						this.isDownloading = !1;
					}
				default: throw Error(`cannot get data from location: ${this.dataLocation}`);
			}
		}
		dispose() {
			if (this.isDownloading) throw Error("The current tensor is being downloaded.");
			this.disposer &&= (this.disposer(), void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
		}
		ensureValid() {
			if (this.dataLocation === "none") throw Error("The tensor is disposed.");
		}
		reshape(e) {
			if (this.ensureValid(), this.downloader || this.disposer) throw Error("Cannot reshape a tensor that owns GPU resource.");
			return Pu(this, e);
		}
	};
}), Ru, zu = Z(() => {
	Lu(), Ru = Iu;
}), Bu, Vu, Hu, Uu, Wu, Gu, Ku = Z(() => {
	gu(), Bu = (e, t) => {
		typeof hu.trace > "u" ? hu.wasm.trace : hu.trace;
	}, Vu = (e, t) => {
		let n = (/* @__PURE__ */ Error()).stack?.split(/\r\n|\r|\n/g) || [], r = !1;
		for (let i = 0; i < n.length; i++) {
			if (r && !n[i].includes("TRACE_FUNC")) {
				let r = `FUNC_${e}::${n[i].trim().split(" ")[1]}`;
				t && (r += `::${t}`), Bu("CPU", r);
				return;
			}
			n[i].includes("TRACE_FUNC") && (r = !0);
		}
	}, Hu = (e) => {
		(typeof hu.trace > "u" ? !hu.wasm.trace : !hu.trace) || Vu("BEGIN", e);
	}, Uu = (e) => {
		(typeof hu.trace > "u" ? !hu.wasm.trace : !hu.trace) || Vu("END", e);
	}, Wu = (e) => {
		typeof hu.trace > "u" ? hu.wasm.trace : hu.trace;
	}, Gu = (e) => {
		typeof hu.trace > "u" ? hu.wasm.trace : hu.trace;
	};
}), qu, Ju = Z(() => {
	uu(), zu(), Ku(), qu = class e {
		constructor(e) {
			this.handler = e;
		}
		async run(e, t, n) {
			Hu(), Wu("InferenceSession.run");
			let r = {}, i = {};
			if (typeof e != "object" || !e || e instanceof Ru || Array.isArray(e)) throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
			let a = !0;
			if (typeof t == "object") {
				if (t === null) throw TypeError("Unexpected argument[1]: cannot be null.");
				if (t instanceof Ru) throw TypeError("'fetches' cannot be a Tensor");
				if (Array.isArray(t)) {
					if (t.length === 0) throw TypeError("'fetches' cannot be an empty array.");
					a = !1;
					for (let e of t) {
						if (typeof e != "string") throw TypeError("'fetches' must be a string array or an object.");
						if (this.outputNames.indexOf(e) === -1) throw RangeError(`'fetches' contains invalid output name: ${e}.`);
						r[e] = null;
					}
					if (typeof n == "object" && n) i = n;
					else if (typeof n < "u") throw TypeError("'options' must be an object.");
				} else {
					let e = !1, o = Object.getOwnPropertyNames(t);
					for (let n of this.outputNames) if (o.indexOf(n) !== -1) {
						let i = t[n];
						(i === null || i instanceof Ru) && (e = !0, a = !1, r[n] = i);
					}
					if (e) {
						if (typeof n == "object" && n) i = n;
						else if (typeof n < "u") throw TypeError("'options' must be an object.");
					} else i = t;
				}
			} else if (typeof t < "u") throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
			for (let t of this.inputNames) if (typeof e[t] > "u") throw Error(`input '${t}' is missing in 'feeds'.`);
			if (a) for (let e of this.outputNames) r[e] = null;
			let o = await this.handler.run(e, r, i), s = {};
			for (let e in o) if (Object.hasOwnProperty.call(o, e)) {
				let t = o[e];
				s[e] = t instanceof Ru ? t : new Ru(t.type, t.data, t.dims);
			}
			return Gu("InferenceSession.run"), Uu(), s;
		}
		async release() {
			return this.handler.dispose();
		}
		static async create(t, n, r, i) {
			Hu(), Wu("InferenceSession.create");
			let a, o = {};
			if (typeof t == "string") {
				if (a = t, typeof n == "object" && n) o = n;
				else if (typeof n < "u") throw TypeError("'options' must be an object.");
			} else if (t instanceof Uint8Array) {
				if (a = t, typeof n == "object" && n) o = n;
				else if (typeof n < "u") throw TypeError("'options' must be an object.");
			} else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) {
				let e = t, s = 0, c = t.byteLength;
				if (typeof n == "object" && n) o = n;
				else if (typeof n == "number") {
					if (s = n, !Number.isSafeInteger(s)) throw RangeError("'byteOffset' must be an integer.");
					if (s < 0 || s >= e.byteLength) throw RangeError(`'byteOffset' is out of range [0, ${e.byteLength}).`);
					if (c = t.byteLength - s, typeof r == "number") {
						if (c = r, !Number.isSafeInteger(c)) throw RangeError("'byteLength' must be an integer.");
						if (c <= 0 || s + c > e.byteLength) throw RangeError(`'byteLength' is out of range (0, ${e.byteLength - s}].`);
						if (typeof i == "object" && i) o = i;
						else if (typeof i < "u") throw TypeError("'options' must be an object.");
					} else if (typeof r < "u") throw TypeError("'byteLength' must be a number.");
				} else if (typeof n < "u") throw TypeError("'options' must be an object.");
				a = new Uint8Array(e, s, c);
			} else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
			let [s, c] = await lu(o), l = await s.createInferenceSessionHandler(a, c);
			return Gu("InferenceSession.create"), Uu(), new e(l);
		}
		startProfiling() {
			this.handler.startProfiling();
		}
		endProfiling() {
			this.handler.endProfiling();
		}
		get inputNames() {
			return this.handler.inputNames;
		}
		get outputNames() {
			return this.handler.outputNames;
		}
		get inputMetadata() {
			return this.handler.inputMetadata;
		}
		get outputMetadata() {
			return this.handler.outputMetadata;
		}
	};
}), Yu, Xu = Z(() => {
	Ju(), Yu = qu;
}), Zu = Z(() => {}), Qu = Z(() => {}), $u = Z(() => {}), ed = Z(() => {});
nu({}, {
	InferenceSession: () => Yu,
	TRACE: () => Bu,
	TRACE_EVENT_BEGIN: () => Wu,
	TRACE_EVENT_END: () => Gu,
	TRACE_FUNC_BEGIN: () => Hu,
	TRACE_FUNC_END: () => Uu,
	Tensor: () => Ru,
	env: () => Q,
	registerBackend: () => su
});
var td = Z(() => {
	du(), _u(), Xu(), zu(), Zu(), Qu(), Ku(), $u(), ed();
}), nd = Z(() => {}), rd = {};
nu(rd, { default: () => od });
var id, ad, od, sd = Z(() => {
	xf(), Ld(), Dd(), id = "ort-wasm-proxy-worker", ad = globalThis.self?.name === id, ad && (self.onmessage = (e) => {
		let { type: t, in: n } = e.data;
		try {
			switch (t) {
				case "init-wasm":
					Fd(n.wasm).then(() => {
						lf(n).then(() => {
							postMessage({ type: t });
						}, (e) => {
							postMessage({
								type: t,
								err: e
							});
						});
					}, (e) => {
						postMessage({
							type: t,
							err: e
						});
					});
					break;
				case "init-ep": {
					let { epName: e, env: r } = n;
					uf(r, e).then(() => {
						postMessage({ type: t });
					}, (e) => {
						postMessage({
							type: t,
							err: e
						});
					});
					break;
				}
				case "copy-from": {
					let { buffer: e } = n, r = mf(e);
					postMessage({
						type: t,
						out: r
					});
					break;
				}
				case "create": {
					let { model: e, options: r } = n;
					hf(e, r).then((e) => {
						postMessage({
							type: t,
							out: e
						});
					}, (e) => {
						postMessage({
							type: t,
							err: e
						});
					});
					break;
				}
				case "release":
					gf(n), postMessage({ type: t });
					break;
				case "run": {
					let { sessionId: e, inputIndices: r, inputs: i, outputIndices: a, options: o } = n;
					vf(e, r, i, a, Array(a.length).fill(null), o).then((e) => {
						e.some((e) => e[3] !== "cpu") ? postMessage({
							type: t,
							err: "Proxy does not support non-cpu tensor location."
						}) : postMessage({
							type: t,
							out: e
						}, bf([...i, ...e]));
					}, (e) => {
						postMessage({
							type: t,
							err: e
						});
					});
					break;
				}
				case "end-profiling": yf(n), postMessage({ type: t });
			}
		} catch (e) {
			postMessage({
				type: t,
				err: e
			});
		}
	}), od = ad ? null : (e) => new Worker(e ?? gd, {
		type: "module",
		name: id
	});
}), cd = {};
nu(cd, { default: () => ud });
async function ld(e = {}) {
	var t = e, n = !!globalThis.window, r = !!globalThis.WorkerGlobalScope, i = r && self.name?.startsWith("em-pthread");
	t.mountExternalData = (e, n) => {
		e.startsWith("./") && (e = e.substring(2)), (t.Rb ||= /* @__PURE__ */ new Map()).set(e, n);
	}, t.unmountExternalData = () => {
		delete t.Rb, delete t.kc, delete t.jc, delete t.lc;
	}, globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({
		initial: 0,
		maximum: 0,
		shared: !0
	}).buffer.constructor;
	var a, o, s = (e, t) => {
		throw t;
	}, c = import.meta.url, l = "";
	if (n || r) {
		try {
			l = new URL(".", c).href;
		} catch {}
		r && (o = (e) => {
			var t = new XMLHttpRequest();
			return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
		}), a = async (e) => {
			if (x(e)) return new Promise((t, n) => {
				var r = new XMLHttpRequest();
				r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = () => {
					r.status == 200 || r.status == 0 && r.response ? t(r.response) : n(r.status);
				}, r.onerror = n, r.send(null);
			});
			var t = await fetch(e, { credentials: "same-origin" });
			if (t.ok) return t.arrayBuffer();
			throw Error(t.status + " : " + t.url);
		};
	}
	var u, d, f, p, m, h, g = console.log.bind(console), _ = console.error.bind(console), v = g, y = _, b = !1, x = (e) => e.startsWith("file://");
	function S() {
		me.buffer != w.buffer && P();
	}
	if (i) {
		let e = function(n) {
			try {
				var r = n.data, i = r.Pb;
				if (i === "load") {
					let n = [];
					self.onmessage = (e) => n.push(e), h = () => {
						postMessage({ Pb: "loaded" });
						for (let t of n) e(t);
						self.onmessage = e;
					};
					for (let e of r.Zb) t[e] && !t[e].proxy || (t[e] = (...t) => {
						postMessage({
							Pb: "callHandler",
							Yb: e,
							args: t
						});
					}, e == "print" && (v = t[e]), e == "printErr" && (y = t[e]));
					me = r.dc, P(), d = r.ec, R(), tr();
				} else if (i === "run") {
					(function(e) {
						var t = (S(), O)[e + 52 >>> 2 >>> 0];
						e = (S(), O)[e + 56 >>> 2 >>> 0], cn(t, t - e), q(t);
					})(r.Ob), $t(r.Ob, 0, 0, 1, 0, 0), de(), et(r.Ob), C ||= !0;
					try {
						ge(r.bc, r.Tb);
					} catch (e) {
						if (e != "unwind") throw e;
					}
				} else r.target !== "setimmediate" && (i === "checkMailbox" ? C && tt() : i && (y(`worker: received unknown command ${i}`), y(r)));
			} catch (e) {
				throw en(), e;
			}
		};
		var C = !1;
		self.onunhandledrejection = (e) => {
			throw e.reason || e;
		}, self.onmessage = e;
	}
	var w, T, E, D, O, k, A, j, M, N = !1;
	function P() {
		var e = me.buffer;
		t.HEAP8 = w = new Int8Array(e), E = new Int16Array(e), t.HEAPU8 = T = new Uint8Array(e), new Uint16Array(e), t.HEAP32 = D = new Int32Array(e), t.HEAPU32 = O = new Uint32Array(e), k = new Float32Array(e), A = new Float64Array(e), j = new BigInt64Array(e), new BigUint64Array(e);
	}
	function F() {
		N = !0, i ? h() : hn.Ta();
	}
	function I(e) {
		throw y(e = "Aborted(" + e + ")"), b = !0, e = new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info."), m?.(e), e;
	}
	function L() {
		return { a: {
			T: vn,
			f: ye,
			w: xe,
			e: Ee,
			k: De,
			h: Oe,
			L: ke,
			b: Ae,
			G: je,
			ta: Ne,
			j: Pe,
			M: Re,
			Ja: ze,
			pa: Be,
			ra: Ve,
			Ka: He,
			Ha: Ue,
			Aa: We,
			Ga: Ge,
			Z: Ke,
			qa: qe,
			na: Je,
			Ia: Ye,
			oa: Xe,
			Pa: Ze,
			Da: G,
			la: nt,
			ua: it,
			ia: at,
			U: ot,
			Ca: et,
			Ma: st,
			xa: ct,
			ya: ft,
			za: pt,
			va: mt,
			wa: ht,
			ja: vt,
			Ra: bt,
			Oa: Ct,
			W: Tt,
			V: Et,
			Na: xt,
			F: Dt,
			La: Ot,
			ma: kt,
			u: _t,
			H: At,
			R: It,
			ka: Lt,
			ba: Ft,
			Sa: Rt,
			Ea: Ht,
			Fa: Ut,
			sa: U,
			I: Wt,
			Y: Gt,
			Ba: Kt,
			X: Jt,
			$: $n,
			N: Jn,
			aa: Qn,
			O: qn,
			v: Rn,
			d: Sn,
			m: bn,
			n: yn,
			r: Mn,
			ca: Y,
			E: Wn,
			o: Tn,
			P: Gn,
			C: Yn,
			J: Un,
			da: Hn,
			ea: Vn,
			z: Nn,
			Q: Bn,
			fa: zn,
			y: In,
			D: Kn,
			c: xn,
			q: wn,
			i: Cn,
			_: er,
			l: Dn,
			p: On,
			s: En,
			t: kn,
			x: Pn,
			S: Ln,
			A: Xn,
			K: Fn,
			B: Zn,
			ga: jn,
			ha: An,
			g: Yt,
			a: me,
			Qa: ie
		} };
	}
	async function R() {
		function e(e, n) {
			return hn = e.exports, hn = (function() {
				var e = hn, t = (e) => () => e() >>> 0, n = (e) => (t) => e(t) >>> 0;
				return (e = Object.assign({}, e)).sb = t(e.sb), e.ub = n(e.ub), e.Ib = n(e.Ib), e.Jb = t(e.Jb), e.Nb = n(e.Nb), e;
			})(), ce.push(hn.vb), e = hn, t._OrtInit = e.Ua, t._OrtGetLastError = e.Va, t._OrtCreateSessionOptions = e.Wa, t._OrtAppendExecutionProvider = e.Xa, t._OrtAddFreeDimensionOverride = e.Ya, t._OrtAddSessionConfigEntry = e.Za, t._OrtReleaseSessionOptions = e._a, t._OrtCreateSession = e.$a, t._OrtReleaseSession = e.ab, t._OrtGetInputOutputCount = e.bb, t._OrtGetInputOutputMetadata = e.cb, t._OrtFree = e.db, t._OrtCreateTensor = e.eb, t._OrtGetTensorData = e.fb, t._OrtReleaseTensor = e.gb, t._OrtCreateRunOptions = e.hb, t._OrtAddRunConfigEntry = e.ib, t._OrtReleaseRunOptions = e.jb, t._OrtCreateBinding = e.kb, t._OrtBindInput = e.lb, t._OrtBindOutput = e.mb, t._OrtClearBoundOutputs = e.nb, t._OrtReleaseBinding = e.ob, t._OrtRunWithBinding = e.pb, t._OrtRun = e.qb, t._OrtEndProfiling = e.rb, Xt = e.sb, Zt = t._free = e.tb, Qt = t._malloc = e.ub, $t = e.xb, en = e.yb, tn = e.zb, nn = e.Ab, rn = e.Bb, an = e.Cb, on = e.Db, K = e.Eb, sn = e.Fb, cn = e.Gb, q = e.Hb, ln = e.Ib, J = e.Jb, un = e.Kb, dn = e.Lb, fn = e.Mb, pn = e.Nb, mn = e.wb, d = n, hn;
		}
		var n, r = L();
		return t.instantiateWasm ? new Promise((n) => {
			t.instantiateWasm(r, (t, r) => {
				n(e(t, r));
			});
		}) : i ? e(new WebAssembly.Instance(d, L()), d) : (M ??= t.locateFile ? t.locateFile ? t.locateFile("ort-wasm-simd-threaded.wasm", l) : l + "ort-wasm-simd-threaded.wasm" : new URL("./assets/ort-wasm-simd-threaded-DDx2apAW.wasm", import.meta.url).href, n = await (async function(e) {
			var t = M;
			if (!u && !x(t)) try {
				var n = fetch(t, { credentials: "same-origin" });
				return await WebAssembly.instantiateStreaming(n, e);
			} catch (e) {
				y(`wasm streaming compile failed: ${e}`), y("falling back to ArrayBuffer instantiation");
			}
			return (async function(e, t) {
				try {
					var n = await (async function(e) {
						if (!u) try {
							var t = await a(e);
							return new Uint8Array(t);
						} catch {}
						if (e == M && u) e = new Uint8Array(u);
						else {
							if (!o) throw "both async and sync fetching of the wasm failed";
							e = o(e);
						}
						return e;
					})(e);
					return await WebAssembly.instantiate(n, t);
				} catch (e) {
					y(`failed to asynchronously prepare wasm: ${e}`), I(e);
				}
			})(t, e);
		})(r), e(n.instance, n.module));
	}
	class z {
		name = "ExitStatus";
		constructor(e) {
			this.message = `Program terminated with exit(${e})`, this.status = e;
		}
	}
	var B = (e) => {
		e.terminate(), e.onmessage = () => {};
	}, ee = [], te = 0, V = null, ne = (e) => {
		oe.length == 0 && (pe(), fe(oe[0]));
		var t = oe.pop();
		if (!t) return 6;
		se.push(t), le[e.Ob] = t, t.Ob = e.Ob;
		var n = {
			Pb: "run",
			bc: e.ac,
			Tb: e.Tb,
			Ob: e.Ob
		};
		return t.postMessage(n, e.Xb), 0;
	}, re = 0, H = (e, t, ...n) => {
		var r, i = 16 * n.length, a = J(), o = ln(i), s = o >>> 3;
		for (r of n) typeof r == "bigint" ? ((S(), j)[s++ >>> 0] = 1n, (S(), j)[s++ >>> 0] = r) : ((S(), j)[s++ >>> 0] = 0n, (S(), A)[s++ >>> 0] = r);
		return e = tn(e, 0, i, o, t), q(a), e;
	};
	function ie(e) {
		if (i) return H(0, 1, e);
		if (f = e, !(0 < re)) {
			for (var t of se) B(t);
			for (t of oe) B(t);
			oe = [], se = [], le = {}, b = !0;
		}
		s(0, new z(e));
	}
	function ae(e) {
		if (i) return H(1, 0, e);
		U(e);
	}
	var U = (e) => {
		if (f = e, i) throw ae(e), "unwind";
		ie(e);
	}, oe = [], se = [], ce = [], le = {}, ue = (e) => {
		var t = e.Ob;
		delete le[t], oe.push(e), se.splice(se.indexOf(e), 1), e.Ob = 0, nn(t);
	};
	function de() {
		ce.forEach((e) => e());
	}
	var fe = (e) => new Promise((n) => {
		e.onmessage = (r) => {
			var i = r.data;
			if (r = i.Pb, i.Sb && i.Sb != Xt()) {
				var a = le[i.Sb];
				a ? a.postMessage(i, i.Xb) : y(`Internal error! Worker sent a message "${r}" to target pthread ${i.Sb}, but that thread no longer exists!`);
			} else r === "checkMailbox" ? tt() : r === "spawnThread" ? ne(i) : r === "cleanupThread" ? Qe(() => {
				ue(le[i.cc]);
			}) : r === "loaded" ? (e.loaded = !0, n(e)) : i.target === "setimmediate" ? e.postMessage(i) : r === "uncaughtException" ? e.onerror(i.error) : r === "callHandler" ? t[i.Yb](...i.args) : r && y(`worker sent an unknown command ${r}`);
		}, e.onerror = (e) => {
			throw y(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`), e;
		};
		var r, i = [];
		for (r of []) t.propertyIsEnumerable(r) && i.push(r);
		e.postMessage({
			Pb: "load",
			Zb: i,
			dc: me,
			ec: d
		});
	});
	function pe() {
		var e = new Worker((() => {
			let e = URL;
			return import.meta.url > "file:" && import.meta.url < "file;" ? new e("ort.wasm.bundle.min.mjs", import.meta.url) : new URL(import.meta.url);
		})(), {
			type: "module",
			workerData: "em-pthread",
			name: "em-pthread"
		});
		oe.push(e);
	}
	var me, he = [], W = (e) => {
		var t = he[e];
		return t || (he[e] = t = mn.get(e)), t;
	}, ge = (e, t) => {
		re = 0, e = W(e)(t), 0 < re ? f = e : rn(e);
	}, _e = [], ve = 0;
	function ye(e) {
		var t = new we(e >>>= 0);
		return (S(), w)[t.Qb + 12 >>> 0] == 0 && (Se(t, !0), ve--), Ce(t, !1), _e.push(t), pn(e);
	}
	var be = 0, xe = () => {
		K(0, 0);
		var e = _e.pop();
		un(e.Ub), be = 0;
	};
	function Se(e, t) {
		t = +!!t, (S(), w)[e.Qb + 12 >>> 0] = t;
	}
	function Ce(e, t) {
		t = +!!t, (S(), w)[e.Qb + 13 >>> 0] = t;
	}
	class we {
		constructor(e) {
			this.Ub = e, this.Qb = e - 24;
		}
	}
	var Te = (e) => {
		var t = be;
		if (!t) return sn(0), 0;
		var n = new we(t);
		(S(), O)[n.Qb + 16 >>> 2 >>> 0] = t;
		var r = (S(), O)[n.Qb + 4 >>> 2 >>> 0];
		if (!r) return sn(0), t;
		for (var i of e) {
			if (i === 0 || i === r) break;
			if (fn(i, r, n.Qb + 16)) return sn(i), t;
		}
		return sn(r), t;
	};
	function Ee() {
		return Te([]);
	}
	function De(e) {
		return Te([e >>> 0]);
	}
	function Oe(e, t, n, r) {
		return Te([
			e >>> 0,
			t >>> 0,
			n >>> 0,
			r >>> 0
		]);
	}
	var ke = () => {
		var e = _e.pop();
		e || I("no exception to throw");
		var t = e.Ub;
		throw (S(), w)[e.Qb + 13 >>> 0] == 0 && (_e.push(e), Ce(e, !0), Se(e, !1), ve++), dn(t), be = t;
	};
	function Ae(e, t, n) {
		var r = new we(e >>>= 0);
		throw t >>>= 0, n >>>= 0, (S(), O)[r.Qb + 16 >>> 2 >>> 0] = 0, (S(), O)[r.Qb + 4 >>> 2 >>> 0] = t, (S(), O)[r.Qb + 8 >>> 2 >>> 0] = n, dn(e), ve++, be = e;
	}
	var je = () => ve;
	function Me(e, t, n, r) {
		return i ? H(2, 1, e, t, n, r) : Ne(e, t, n, r);
	}
	function Ne(e, t, n, r) {
		if (e >>>= 0, t >>>= 0, n >>>= 0, r >>>= 0, !globalThis.SharedArrayBuffer) return 6;
		var a = [];
		return i && a.length === 0 ? Me(e, t, n, r) : (e = {
			ac: n,
			Ob: e,
			Tb: r,
			Xb: a
		}, i ? (e.Pb = "spawnThread", postMessage(e, a), 0) : ne(e));
	}
	function Pe(e) {
		throw be ||= e >>> 0, be;
	}
	var Fe = globalThis.TextDecoder && new TextDecoder(), Ie = (e, t = 0, n, r) => {
		var i = t >>>= 0;
		if (n = i + n, r) r = n;
		else {
			for (; e[i] && !(i >= n);) ++i;
			r = i;
		}
		if (16 < r - t && e.buffer && Fe) return Fe.decode(e.buffer instanceof ArrayBuffer ? e.subarray(t, r) : e.slice(t, r));
		for (i = ""; t < r;) if (128 & (n = e[t++])) {
			var a = 63 & e[t++];
			if ((224 & n) == 192) i += String.fromCharCode((31 & n) << 6 | a);
			else {
				var o = 63 & e[t++];
				65536 > (n = (240 & n) == 224 ? (15 & n) << 12 | a << 6 | o : (7 & n) << 18 | a << 12 | o << 6 | 63 & e[t++]) ? i += String.fromCharCode(n) : (n -= 65536, i += String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n));
			}
		} else i += String.fromCharCode(n);
		return i;
	}, Le = (e, t, n) => (e >>>= 0) ? Ie((S(), T), e, t, n) : "";
	function Re(e, t, n) {
		return i ? H(3, 1, e, t, n) : 0;
	}
	function ze(e, t) {
		if (i) return H(4, 1, e, t);
	}
	function Be(e, t) {
		if (i) return H(5, 1, e, t);
	}
	function Ve(e, t, n) {
		if (i) return H(6, 1, e, t, n);
	}
	function He(e, t, n) {
		return i ? H(7, 1, e, t, n) : 0;
	}
	function Ue(e, t) {
		if (i) return H(8, 1, e, t);
	}
	function We(e, t, n) {
		if (i) return H(9, 1, e, t, n);
	}
	function Ge(e, t, n, r) {
		if (i) return H(10, 1, e, t, n, r);
	}
	function Ke(e, t, n, r) {
		if (i) return H(11, 1, e, t, n, r);
	}
	function qe(e, t, n, r) {
		if (i) return H(12, 1, e, t, n, r);
	}
	function Je(e) {
		if (i) return H(13, 1, e);
	}
	function Ye(e, t) {
		if (i) return H(14, 1, e, t);
	}
	function Xe(e, t, n) {
		if (i) return H(15, 1, e, t, n);
	}
	var Ze = () => I("");
	function G(e) {
		$t(e >>> 0, !r, 1, !n, 131072, !1), de();
	}
	var Qe = (e) => {
		if (!b) try {
			if (e(), !(0 < re)) try {
				i ? Xt() && rn(f) : U(f);
			} catch (e) {
				e instanceof z || e == "unwind" || s(0, e);
			}
		} catch (e) {
			e instanceof z || e == "unwind" || s(0, e);
		}
	}, $e = !Atomics.waitAsync || globalThis.navigator?.userAgent && 91 > Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./) || [])[2]);
	function et(e) {
		e >>>= 0, $e || (Atomics.waitAsync((S(), D), e >>> 2, e).value.then(tt), e += 128, Atomics.store((S(), D), e >>> 2, 1));
	}
	var tt = () => Qe(() => {
		var e = Xt();
		e && (et(e), on());
	});
	function nt(e, t) {
		(e >>>= 0) == t >>> 0 ? setTimeout(tt) : i ? postMessage({
			Sb: e,
			Pb: "checkMailbox"
		}) : (e = le[e]) && e.postMessage({ Pb: "checkMailbox" });
	}
	var rt = [];
	function it(e, t, n, r, i) {
		for (t >>>= 0, i >>>= 0, rt.length = 0, n = i >>> 3, r = i + r >>> 3; n < r;) {
			var a = (S(), j)[n++ >>> 0] ? (S(), j)[n++ >>> 0] : (S(), A)[n++ >>> 0];
			rt.push(a);
		}
		return (t ? _n[t] : gn[e])(...rt);
	}
	var at = () => {
		re = 0;
	};
	function ot(e) {
		e >>>= 0, i ? postMessage({
			Pb: "cleanupThread",
			cc: e
		}) : ue(le[e]);
	}
	function st(e) {}
	function ct(e, t) {
		e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e), t >>>= 0, e = /* @__PURE__ */ new Date(1e3 * e), (S(), D)[t >>> 2 >>> 0] = e.getUTCSeconds(), (S(), D)[t + 4 >>> 2 >>> 0] = e.getUTCMinutes(), (S(), D)[t + 8 >>> 2 >>> 0] = e.getUTCHours(), (S(), D)[t + 12 >>> 2 >>> 0] = e.getUTCDate(), (S(), D)[t + 16 >>> 2 >>> 0] = e.getUTCMonth(), (S(), D)[t + 20 >>> 2 >>> 0] = e.getUTCFullYear() - 1900, (S(), D)[t + 24 >>> 2 >>> 0] = e.getUTCDay(), e = (e.getTime() - Date.UTC(e.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, (S(), D)[t + 28 >>> 2 >>> 0] = e;
	}
	var lt = (e) => e % 4 == 0 && (e % 100 != 0 || e % 400 == 0), ut = [
		0,
		31,
		60,
		91,
		121,
		152,
		182,
		213,
		244,
		274,
		305,
		335
	], dt = [
		0,
		31,
		59,
		90,
		120,
		151,
		181,
		212,
		243,
		273,
		304,
		334
	];
	function ft(e, t) {
		e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e), t >>>= 0, e = /* @__PURE__ */ new Date(1e3 * e), (S(), D)[t >>> 2 >>> 0] = e.getSeconds(), (S(), D)[t + 4 >>> 2 >>> 0] = e.getMinutes(), (S(), D)[t + 8 >>> 2 >>> 0] = e.getHours(), (S(), D)[t + 12 >>> 2 >>> 0] = e.getDate(), (S(), D)[t + 16 >>> 2 >>> 0] = e.getMonth(), (S(), D)[t + 20 >>> 2 >>> 0] = e.getFullYear() - 1900, (S(), D)[t + 24 >>> 2 >>> 0] = e.getDay();
		var n = (lt(e.getFullYear()) ? ut : dt)[e.getMonth()] + e.getDate() - 1 | 0;
		(S(), D)[t + 28 >>> 2 >>> 0] = n, (S(), D)[t + 36 >>> 2 >>> 0] = -60 * e.getTimezoneOffset(), n = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
		var r = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
		e = 0 | (n != r && e.getTimezoneOffset() == Math.min(r, n)), (S(), D)[t + 32 >>> 2 >>> 0] = e;
	}
	function pt(e) {
		e >>>= 0;
		var t = new Date((S(), D)[e + 20 >>> 2 >>> 0] + 1900, (S(), D)[e + 16 >>> 2 >>> 0], (S(), D)[e + 12 >>> 2 >>> 0], (S(), D)[e + 8 >>> 2 >>> 0], (S(), D)[e + 4 >>> 2 >>> 0], (S(), D)[e >>> 2 >>> 0], 0), n = (S(), D)[e + 32 >>> 2 >>> 0], r = t.getTimezoneOffset(), i = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(), a = new Date(t.getFullYear(), 0, 1).getTimezoneOffset(), o = Math.min(a, i);
		return 0 > n ? (S(), D)[e + 32 >>> 2 >>> 0] = +(i != a && o == r) : 0 < n != (o == r) && (i = Math.max(a, i), t.setTime(t.getTime() + 6e4 * ((0 < n ? o : i) - r))), (S(), D)[e + 24 >>> 2 >>> 0] = t.getDay(), n = (lt(t.getFullYear()) ? ut : dt)[t.getMonth()] + t.getDate() - 1 | 0, (S(), D)[e + 28 >>> 2 >>> 0] = n, (S(), D)[e >>> 2 >>> 0] = t.getSeconds(), (S(), D)[e + 4 >>> 2 >>> 0] = t.getMinutes(), (S(), D)[e + 8 >>> 2 >>> 0] = t.getHours(), (S(), D)[e + 12 >>> 2 >>> 0] = t.getDate(), (S(), D)[e + 16 >>> 2 >>> 0] = t.getMonth(), (S(), D)[e + 20 >>> 2 >>> 0] = t.getYear(), e = t.getTime(), BigInt(isNaN(e) ? -1 : e / 1e3);
	}
	function mt(e, t, n, r, a, o, s) {
		return i ? H(16, 1, e, t, n, r, a, o, s) : -52;
	}
	function ht(e, t, n, r, a, o) {
		if (i) return H(17, 1, e, t, n, r, a, o);
	}
	var gt = {}, _t = () => performance.timeOrigin + performance.now();
	function vt(e, t) {
		return i ? H(18, 1, e, t) : (gt[e] && (clearTimeout(gt[e].id), delete gt[e]), t && (gt[e] = {
			id: setTimeout(() => {
				delete gt[e], Qe(() => an(e, performance.timeOrigin + performance.now()));
			}, t),
			mc: t
		}), 0);
	}
	var yt = (e, t, n) => {
		var r = (S(), T);
		if (t >>>= 0, 0 < n) {
			var i = t;
			n = t + n - 1;
			for (var a = 0; a < e.length; ++a) {
				var o = e.codePointAt(a);
				if (127 >= o) {
					if (t >= n) break;
					r[t++ >>> 0] = o;
				} else if (2047 >= o) {
					if (t + 1 >= n) break;
					r[t++ >>> 0] = 192 | o >> 6, r[t++ >>> 0] = 128 | 63 & o;
				} else if (65535 >= o) {
					if (t + 2 >= n) break;
					r[t++ >>> 0] = 224 | o >> 12, r[t++ >>> 0] = 128 | o >> 6 & 63, r[t++ >>> 0] = 128 | 63 & o;
				} else {
					if (t + 3 >= n) break;
					r[t++ >>> 0] = 240 | o >> 18, r[t++ >>> 0] = 128 | o >> 12 & 63, r[t++ >>> 0] = 128 | o >> 6 & 63, r[t++ >>> 0] = 128 | 63 & o, a++;
				}
			}
			r[t >>> 0] = 0, e = t - i;
		} else e = 0;
		return e;
	};
	function bt(e, t, n, r) {
		e >>>= 0, t >>>= 0, n >>>= 0, r >>>= 0;
		var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1).getTimezoneOffset();
		i = new Date(i, 6, 1).getTimezoneOffset();
		var o = Math.max(a, i);
		(S(), O)[e >>> 2 >>> 0] = 60 * o, (S(), D)[t >>> 2 >>> 0] = +(a != i), e = (t = (e) => {
			var t = Math.abs(e);
			return `UTC${0 <= e ? "-" : "+"}${String(Math.floor(t / 60)).padStart(2, "0")}${String(t % 60).padStart(2, "0")}`;
		})(a), t = t(i), i < a ? (yt(e, n, 17), yt(t, r, 17)) : (yt(e, r, 17), yt(t, n, 17));
	}
	var xt = () => Date.now(), St = 1;
	function Ct(e, t, n) {
		if (n >>>= 0, !(0 <= e && 3 >= e)) return 28;
		if (e === 0) e = Date.now();
		else {
			if (!St) return 52;
			e = performance.timeOrigin + performance.now();
		}
		return e = Math.round(1e6 * e), (S(), j)[n >>> 3 >>> 0] = BigInt(e), 0;
	}
	var wt = [];
	function Tt(e, t, n) {
		e >>>= 0, t >>>= 0, n >>>= 0, wt.length = 0;
		for (var r; r = (S(), T)[t++ >>> 0];) {
			var i = r != 105;
			n += (i &= r != 112) && n % 8 ? 4 : 0, wt.push(r == 112 ? (S(), O)[n >>> 2 >>> 0] : r == 106 ? (S(), j)[n >>> 3 >>> 0] : r == 105 ? (S(), D)[n >>> 2 >>> 0] : (S(), A)[n >>> 3 >>> 0]), n += i ? 8 : 4;
		}
		return _n[e](...wt);
	}
	var Et = () => {};
	function Dt(e, t) {
		return y(Le(e >>> 0, t >>> 0));
	}
	var Ot = () => {
		throw re += 1, "unwind";
	};
	function kt() {
		return 4294901760;
	}
	var At = () => navigator.hardwareConcurrency, jt = {}, Mt = (e) => {
		for (var t = 0, n = 0; n < e.length; ++n) {
			var r = e.charCodeAt(n);
			127 >= r ? t++ : 2047 >= r ? t += 2 : 55296 <= r && 57343 >= r ? (t += 4, ++n) : t += 3;
		}
		return t;
	}, Nt = (e) => {
		var t;
		return (t = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e)) ? +t[1] : (t = /:(\d+):\d+(?:\)|$)/.exec(e)) ? 2147483648 | t[1] : 0;
	}, Pt = (e) => {
		for (var t of e) (e = Nt(t)) && (jt[e] = t);
	};
	function Ft() {
		var e = Error().stack.toString().split("\n");
		return e[0] == "Error" && e.shift(), Pt(e), jt.Vb = Nt(e[3]), jt.$b = e, jt.Vb;
	}
	function It(e) {
		if (!(e = jt[e >>> 0])) return 0;
		var t;
		if (t = /^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e)) e = t[1];
		else if (t = /^\s+at (.*) \(.*\)$/.exec(e)) e = t[1];
		else {
			if (!(t = /^(.+?)@/.exec(e))) return 0;
			e = t[1];
		}
		Zt(It.Wb ?? 0), t = Mt(e) + 1;
		var n = Qt(t);
		return n && yt(e, n, t), It.Wb = n, It.Wb;
	}
	function Lt(e) {
		e >>>= 0;
		var t = (S(), T).length;
		if (e <= t || 4294901760 < e) return !1;
		for (var n = 1; 4 >= n; n *= 2) {
			var r = t * (1 + .2 / n);
			r = Math.min(r, e + 100663296);
			e: {
				r = (Math.min(4294901760, 65536 * Math.ceil(Math.max(e, r) / 65536)) - me.buffer.byteLength + 65535) / 65536 | 0;
				try {
					me.grow(r), P();
					var i = 1;
					break e;
				} catch {}
				i = void 0;
			}
			if (i) return !0;
		}
		return !1;
	}
	function Rt(e, t, n) {
		if (e >>>= 0, t >>>= 0, jt.Vb == e) var r = jt.$b;
		else (r = Error().stack.toString().split("\n"))[0] == "Error" && r.shift(), Pt(r);
		for (var i = 3; r[i] && Nt(r[i]) != e;) ++i;
		for (e = 0; e < n && r[e + i]; ++e) (S(), D)[t + 4 * e >>> 2 >>> 0] = Nt(r[e + i]);
		return e;
	}
	var zt, Bt = {}, Vt = () => {
		if (!zt) {
			var e, t = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8",
				_: "./this.program"
			};
			for (e in Bt) Bt[e] === void 0 ? delete t[e] : t[e] = Bt[e];
			var n = [];
			for (e in t) n.push(`${e}=${t[e]}`);
			zt = n;
		}
		return zt;
	};
	function Ht(e, t) {
		if (i) return H(19, 1, e, t);
		e >>>= 0, t >>>= 0;
		var n, r = 0, a = 0;
		for (n of Vt()) {
			var o = t + r;
			(S(), O)[e + a >>> 2 >>> 0] = o, r += yt(n, o, 1 / 0) + 1, a += 4;
		}
		return 0;
	}
	function Ut(e, t) {
		if (i) return H(20, 1, e, t);
		e >>>= 0, t >>>= 0;
		var n = Vt();
		for (var r of ((S(), O)[e >>> 2 >>> 0] = n.length, e = 0, n)) e += Mt(r) + 1;
		return (S(), O)[t >>> 2 >>> 0] = e, 0;
	}
	function Wt(e) {
		return i ? H(21, 1, e) : 52;
	}
	function Gt(e, t, n, r) {
		return i ? H(22, 1, e, t, n, r) : 52;
	}
	function Kt(e, t, n, r) {
		return i ? H(23, 1, e, t, n, r) : 70;
	}
	var qt = [
		null,
		[],
		[]
	];
	function Jt(e, t, n, r) {
		if (i) return H(24, 1, e, t, n, r);
		t >>>= 0, n >>>= 0, r >>>= 0;
		for (var a = 0, o = 0; o < n; o++) {
			var s = (S(), O)[t >>> 2 >>> 0], c = (S(), O)[t + 4 >>> 2 >>> 0];
			t += 8;
			for (var l = 0; l < c; l++) {
				var u = e, d = (S(), T)[s + l >>> 0], f = qt[u];
				d === 0 || d === 10 ? ((u === 1 ? v : y)(Ie(f)), f.length = 0) : f.push(d);
			}
			a += c;
		}
		return (S(), O)[r >>> 2 >>> 0] = a, 0;
	}
	function Yt(e) {
		return e >>> 0;
	}
	i || (function() {
		for (var e = t.numThreads - 1; e--;) pe();
		ee.push(async () => {
			var e = (async function() {
				if (!i) return Promise.all(oe.map(fe));
			})();
			te++, await e, --te == 0 && V && (e = V, V = null, e());
		});
	})(), i || (me = new WebAssembly.Memory({
		initial: 256,
		maximum: 65536,
		shared: !0
	}), P()), t.wasmBinary && (u = t.wasmBinary), t.stackSave = () => J(), t.stackRestore = (e) => q(e), t.stackAlloc = (e) => ln(e), t.setValue = function(e, t, n = "i8") {
		switch (n.endsWith("*") && (n = "*"), n) {
			case "i1":
			case "i8":
				(S(), w)[e >>> 0] = t;
				break;
			case "i16":
				(S(), E)[e >>> 1 >>> 0] = t;
				break;
			case "i32":
				(S(), D)[e >>> 2 >>> 0] = t;
				break;
			case "i64":
				(S(), j)[e >>> 3 >>> 0] = BigInt(t);
				break;
			case "float":
				(S(), k)[e >>> 2 >>> 0] = t;
				break;
			case "double":
				(S(), A)[e >>> 3 >>> 0] = t;
				break;
			case "*":
				(S(), O)[e >>> 2 >>> 0] = t;
				break;
			default: I(`invalid type for setValue: ${n}`);
		}
	}, t.getValue = function(e, t = "i8") {
		switch (t.endsWith("*") && (t = "*"), t) {
			case "i1":
			case "i8": return (S(), w)[e >>> 0];
			case "i16": return (S(), E)[e >>> 1 >>> 0];
			case "i32": return (S(), D)[e >>> 2 >>> 0];
			case "i64": return (S(), j)[e >>> 3 >>> 0];
			case "float": return (S(), k)[e >>> 2 >>> 0];
			case "double": return (S(), A)[e >>> 3 >>> 0];
			case "*": return (S(), O)[e >>> 2 >>> 0];
			default: I(`invalid type for getValue: ${t}`);
		}
	}, t.UTF8ToString = Le, t.stringToUTF8 = yt, t.lengthBytesUTF8 = Mt;
	var Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, K, sn, cn, q, ln, J, un, dn, fn, pn, mn, hn, gn = [
		ie,
		ae,
		Me,
		Re,
		ze,
		Be,
		Ve,
		He,
		Ue,
		We,
		Ge,
		Ke,
		qe,
		Je,
		Ye,
		Xe,
		mt,
		ht,
		vt,
		Ht,
		Ut,
		Wt,
		Gt,
		Kt,
		Jt
	], _n = {
		1011284: (e, n, r, i, a) => {
			if (t === void 0 || !t.Rb) return 1;
			if ((e = Le(Number(e >>> 0))).startsWith("./") && (e = e.substring(2)), !(e = t.Rb.get(e))) return 2;
			if (n = Number(n >>> 0), r = Number(r >>> 0), i = Number(i >>> 0), n + r > e.byteLength) return 3;
			try {
				let o = e.subarray(n, n + r);
				switch (a) {
					case 0:
						(S(), T).set(o, i >>> 0);
						break;
					case 1:
						t.fc ? t.fc(i, o) : t.ic(i, o);
						break;
					default: return 4;
				}
				return 0;
			} catch {
				return 4;
			}
		},
		1012108: () => typeof wasmOffsetConverter < "u"
	};
	function vn() {
		return typeof wasmOffsetConverter < "u";
	}
	function yn(e, t, n, r) {
		var i = J();
		try {
			return W(e)(t, n, r);
		} catch (e) {
			if (q(i), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function bn(e, t, n) {
		var r = J();
		try {
			return W(e)(t, n);
		} catch (e) {
			if (q(r), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function xn(e) {
		var t = J();
		try {
			W(e)();
		} catch (e) {
			if (q(t), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Sn(e, t) {
		var n = J();
		try {
			return W(e)(t);
		} catch (e) {
			if (q(n), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Cn(e, t, n) {
		var r = J();
		try {
			W(e)(t, n);
		} catch (e) {
			if (q(r), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function wn(e, t) {
		var n = J();
		try {
			W(e)(t);
		} catch (e) {
			if (q(n), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Tn(e, t, n, r, i, a, o) {
		var s = J();
		try {
			return W(e)(t, n, r, i, a, o);
		} catch (e) {
			if (q(s), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function En(e, t, n, r, i, a) {
		var o = J();
		try {
			W(e)(t, n, r, i, a);
		} catch (e) {
			if (q(o), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Dn(e, t, n, r) {
		var i = J();
		try {
			W(e)(t, n, r);
		} catch (e) {
			if (q(i), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function On(e, t, n, r, i) {
		var a = J();
		try {
			W(e)(t, n, r, i);
		} catch (e) {
			if (q(a), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function kn(e, t, n, r, i, a, o) {
		var s = J();
		try {
			W(e)(t, n, r, i, a, o);
		} catch (e) {
			if (q(s), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function An(e, t, n, r, i, a, o) {
		var s = J();
		try {
			W(e)(t, n, r, i, a, o);
		} catch (e) {
			if (q(s), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function jn(e, t, n, r, i, a, o, s) {
		var c = J();
		try {
			W(e)(t, n, r, i, a, o, s);
		} catch (e) {
			if (q(c), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Mn(e, t, n, r, i) {
		var a = J();
		try {
			return W(e)(t, n, r, i);
		} catch (e) {
			if (q(a), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Nn(e, t, n) {
		var r = J();
		try {
			return W(e)(t, n);
		} catch (e) {
			if (q(r), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Pn(e, t, n, r, i, a, o, s) {
		var c = J();
		try {
			W(e)(t, n, r, i, a, o, s);
		} catch (e) {
			if (q(c), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Fn(e, t, n, r, i, a, o, s, c, l, u, d) {
		var f = J();
		try {
			W(e)(t, n, r, i, a, o, s, c, l, u, d);
		} catch (e) {
			if (q(f), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function In(e, t, n) {
		var r = J();
		try {
			return W(e)(t, n);
		} catch (e) {
			if (q(r), e !== e + 0) throw e;
			return K(1, 0), 0n;
		}
	}
	function Ln(e, t, n, r, i, a, o, s, c) {
		var l = J();
		try {
			W(e)(t, n, r, i, a, o, s, c);
		} catch (e) {
			if (q(l), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Rn(e) {
		var t = J();
		try {
			return W(e)();
		} catch (e) {
			if (q(t), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function zn(e, t) {
		var n = J();
		try {
			return W(e)(t);
		} catch (e) {
			if (q(n), e !== e + 0) throw e;
			return K(1, 0), 0n;
		}
	}
	function Bn(e) {
		var t = J();
		try {
			return W(e)();
		} catch (e) {
			if (q(t), e !== e + 0) throw e;
			return K(1, 0), 0n;
		}
	}
	function Vn(e, t, n, r) {
		var i = J();
		try {
			return W(e)(t, n, r);
		} catch (e) {
			if (q(i), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Hn(e, t, n, r, i) {
		var a = J();
		try {
			return W(e)(t, n, r, i);
		} catch (e) {
			if (q(a), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Un(e, t, n, r, i, a) {
		var o = J();
		try {
			return W(e)(t, n, r, i, a);
		} catch (e) {
			if (q(o), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Wn(e, t, n, r, i, a) {
		var o = J();
		try {
			return W(e)(t, n, r, i, a);
		} catch (e) {
			if (q(o), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Y(e, t, n, r, i, a) {
		var o = J();
		try {
			return W(e)(t, n, r, i, a);
		} catch (e) {
			if (q(o), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Gn(e, t, n, r, i, a, o, s) {
		var c = J();
		try {
			return W(e)(t, n, r, i, a, o, s);
		} catch (e) {
			if (q(c), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Kn(e, t, n, r, i) {
		var a = J();
		try {
			return W(e)(t, n, r, i);
		} catch (e) {
			if (q(a), e !== e + 0) throw e;
			return K(1, 0), 0n;
		}
	}
	function qn(e, t, n, r) {
		var i = J();
		try {
			return W(e)(t, n, r);
		} catch (e) {
			if (q(i), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Jn(e, t, n, r) {
		var i = J();
		try {
			return W(e)(t, n, r);
		} catch (e) {
			if (q(i), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Yn(e, t, n, r, i, a, o, s, c, l, u, d) {
		var f = J();
		try {
			return W(e)(t, n, r, i, a, o, s, c, l, u, d);
		} catch (e) {
			if (q(f), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Xn(e, t, n, r, i, a, o, s, c, l, u) {
		var d = J();
		try {
			W(e)(t, n, r, i, a, o, s, c, l, u);
		} catch (e) {
			if (q(d), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Zn(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		var g = J();
		try {
			W(e)(t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
		} catch (e) {
			if (q(g), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function Qn(e, t, n) {
		var r = J();
		try {
			return W(e)(t, n);
		} catch (e) {
			if (q(r), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function $n(e, t, n) {
		var r = J();
		try {
			return W(e)(t, n);
		} catch (e) {
			if (q(r), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function er(e, t, n, r) {
		var i = J();
		try {
			W(e)(t, n, r);
		} catch (e) {
			if (q(i), e !== e + 0) throw e;
			K(1, 0);
		}
	}
	function tr() {
		if (0 < te) V = tr;
		else if (i) p?.(t), F();
		else {
			for (var e = ee; 0 < e.length;) e.shift()(t);
			0 < te ? V = tr : (t.calledRun = !0, b || (F(), p?.(t)));
		}
	}
	return i || (hn = await R(), tr()), t.PTR_SIZE = 4, N ? t : new Promise((e, t) => {
		p = e, m = t;
	});
}
var ud, dd, fd = Z(() => {
	ud = ld, dd = globalThis.self?.name?.startsWith("em-pthread"), dd && ld();
}), pd, md, hd, gd, _d, vd, yd, bd, xd, Sd, Cd, wd, Td, Ed, Dd = Z(() => {
	nd(), pd = typeof location > "u" ? void 0 : location.origin, md = import.meta.url > "file:" && import.meta.url < "file;", hd = () => md ? new URL(new URL("ort.wasm.bundle.min.mjs", import.meta.url).href, pd).href : import.meta.url, gd = hd(), _d = () => {
		if (gd && !gd.startsWith("blob:")) return gd.substring(0, gd.lastIndexOf("/") + 1);
	}, vd = (e, t) => {
		try {
			let n = t ?? gd;
			return (n ? new URL(e, n) : new URL(e)).origin === pd;
		} catch {
			return !1;
		}
	}, yd = (e, t) => {
		let n = t ?? gd;
		try {
			return (n ? new URL(e, n) : new URL(e)).href;
		} catch {
			return;
		}
	}, bd = (e, t) => `${t ?? "./"}${e}`, xd = async (e) => {
		let t = await (await fetch(e, { credentials: "same-origin" })).blob();
		return URL.createObjectURL(t);
	}, Sd = async (e) => (await import(
		/*webpackIgnore:true*/
		/*@vite-ignore*/
		e
)).default, Cd = (sd(), iu(rd)).default, wd = async () => {
		if (!gd) throw Error("Failed to load proxy worker: cannot determine the script source URL.");
		if (vd(gd)) return [void 0, Cd()];
		let e = await xd(gd);
		return [e, Cd(e)];
	}, Td = (fd(), iu(cd)).default, Ed = async (e, t, n, r) => {
		let i = Td && !(e || t);
		if (i) {
			if (gd) i = vd(gd) || r && !n;
			else if (r && !n) i = !0;
			else throw Error("cannot determine the script source URL.");
		}
		if (i) return [void 0, Td];
		{
			let r = "ort-wasm-simd-threaded.mjs", i = e ?? yd(r, t), a = n && i && !vd(i, t), o = a ? await xd(i) : i ?? bd(r, t);
			return [a ? o : void 0, await Sd(o)];
		}
	};
}), Od, kd, Ad, jd, Md, Nd, Pd, Fd, Id, Ld = Z(() => {
	Dd(), kd = !1, Ad = !1, jd = !1, Md = () => {
		if (typeof SharedArrayBuffer > "u") return !1;
		try {
			return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([
				0,
				97,
				115,
				109,
				1,
				0,
				0,
				0,
				1,
				4,
				1,
				96,
				0,
				0,
				3,
				2,
				1,
				0,
				5,
				4,
				1,
				3,
				1,
				1,
				10,
				11,
				1,
				9,
				0,
				65,
				0,
				254,
				16,
				2,
				0,
				26,
				11
			]));
		} catch {
			return !1;
		}
	}, Nd = () => {
		try {
			return WebAssembly.validate(new Uint8Array([
				0,
				97,
				115,
				109,
				1,
				0,
				0,
				0,
				1,
				4,
				1,
				96,
				0,
				0,
				3,
				2,
				1,
				0,
				10,
				30,
				1,
				28,
				0,
				65,
				0,
				253,
				15,
				253,
				12,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				253,
				186,
				1,
				26,
				11
			]));
		} catch {
			return !1;
		}
	}, Pd = () => {
		try {
			return WebAssembly.validate(new Uint8Array([
				0,
				97,
				115,
				109,
				1,
				0,
				0,
				0,
				1,
				5,
				1,
				96,
				0,
				1,
				123,
				3,
				2,
				1,
				0,
				10,
				19,
				1,
				17,
				0,
				65,
				1,
				253,
				15,
				65,
				2,
				253,
				15,
				65,
				3,
				253,
				15,
				253,
				147,
				2,
				11
			]));
		} catch {
			return !1;
		}
	}, Fd = async (e) => {
		if (kd) return Promise.resolve();
		if (Ad) throw Error("multiple calls to 'initializeWebAssembly()' detected.");
		if (jd) throw Error("previous call to 'initializeWebAssembly()' failed.");
		Ad = !0;
		let t = e.initTimeout, n = e.numThreads;
		if (e.simd !== !1) {
			if (e.simd === "relaxed") {
				if (!Pd()) throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
			} else if (!Nd()) throw Error("WebAssembly SIMD is not supported in the current environment.");
		}
		let r = Md();
		n > 1 && !r && (typeof self < "u" && self.crossOriginIsolated, e.numThreads = n = 1);
		let i = e.wasmPaths, a = typeof i == "string" ? i : void 0, o = i?.mjs, s = o?.href ?? o, c = i?.wasm, l = c?.href ?? c, u = e.wasmBinary, [d, f] = await Ed(s, a, n > 1, !!u || !!l), p = !1, m = [];
		if (t > 0 && m.push(new Promise((e) => {
			setTimeout(() => {
				p = !0, e();
			}, t);
		})), m.push(new Promise((e, t) => {
			let r = { numThreads: n };
			if (u) r.wasmBinary = u, r.locateFile = (e) => e;
			else if (l || a) r.locateFile = (e) => l ?? a + e;
			else if (s && s.indexOf("blob:") !== 0) r.locateFile = (e) => new URL(e, s).href;
			else if (d) {
				let e = _d();
				e && (r.locateFile = (t) => e + t);
			}
			f(r).then((t) => {
				Ad = !1, kd = !0, Od = t, e(), d && URL.revokeObjectURL(d);
			}, (e) => {
				Ad = !1, jd = !0, t(e);
			});
		})), await Promise.race(m), p) throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`);
	}, Id = () => {
		if (kd && Od) return Od;
		throw Error("WebAssembly is not initialized yet.");
	};
}), Rd, zd, $, Bd = Z(() => {
	Ld(), Rd = (e, t) => {
		let n = Id(), r = n.lengthBytesUTF8(e) + 1, i = n._malloc(r);
		return n.stringToUTF8(e, i, r), t.push(i), i;
	}, zd = (e, t, n, r) => {
		if (typeof e == "object" && e) {
			if (n.has(e)) throw Error("Circular reference in options");
			n.add(e);
		}
		Object.entries(e).forEach(([e, i]) => {
			let a = t ? t + e : e;
			if (typeof i == "object") zd(i, a + ".", n, r);
			else if (typeof i == "string" || typeof i == "number") r(a, i.toString());
			else if (typeof i == "boolean") r(a, i ? "1" : "0");
			else throw Error(`Can't handle extra config type: ${typeof i}`);
		});
	}, $ = (e) => {
		let t = Id(), n = t.stackSave();
		try {
			let n = t.PTR_SIZE, r = t.stackAlloc(2 * n);
			t._OrtGetLastError(r, r + n);
			let i = Number(t.getValue(r, n === 4 ? "i32" : "i64")), a = t.getValue(r + n, "*"), o = a ? t.UTF8ToString(a) : "";
			throw Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${o}`);
		} finally {
			t.stackRestore(n);
		}
	};
}), Vd, Hd = Z(() => {
	Ld(), Bd(), Vd = (e) => {
		let t = Id(), n = 0, r = [], i = e || {};
		try {
			if (e?.logSeverityLevel === void 0) i.logSeverityLevel = 2;
			else if (typeof e.logSeverityLevel != "number" || !Number.isInteger(e.logSeverityLevel) || e.logSeverityLevel < 0 || e.logSeverityLevel > 4) throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);
			if (e?.logVerbosityLevel === void 0) i.logVerbosityLevel = 0;
			else if (typeof e.logVerbosityLevel != "number" || !Number.isInteger(e.logVerbosityLevel)) throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);
			e?.terminate === void 0 && (i.terminate = !1);
			let a = 0;
			return e?.tag !== void 0 && (a = Rd(e.tag, r)), n = t._OrtCreateRunOptions(i.logSeverityLevel, i.logVerbosityLevel, !!i.terminate, a), n === 0 && $("Can't create run options."), e?.extra !== void 0 && zd(e.extra, "", /* @__PURE__ */ new WeakSet(), (e, i) => {
				let a = Rd(e, r), o = Rd(i, r);
				t._OrtAddRunConfigEntry(n, a, o) !== 0 && $(`Can't set a run config entry: ${e} - ${i}.`);
			}), [n, r];
		} catch (e) {
			throw n !== 0 && t._OrtReleaseRunOptions(n), r.forEach((e) => t._free(e)), e;
		}
	};
}), Ud, Wd, Gd, Kd, qd, Jd, Yd = Z(() => {
	Ld(), Bd(), Ud = (e) => {
		switch (e) {
			case "disabled": return 0;
			case "basic": return 1;
			case "extended": return 2;
			case "layout": return 3;
			case "all": return 99;
			default: throw Error(`unsupported graph optimization level: ${e}`);
		}
	}, Wd = (e) => {
		switch (e) {
			case "sequential": return 0;
			case "parallel": return 1;
			default: throw Error(`unsupported execution mode: ${e}`);
		}
	}, Gd = (e) => {
		e.extra ||= {}, e.extra.session || (e.extra.session = {});
		let t = e.extra.session;
		t.use_ort_model_bytes_directly ||= "1", e.executionProviders && e.executionProviders.some((e) => (typeof e == "string" ? e : e.name) === "webgpu") && (e.enableMemPattern = !1);
	}, Kd = (e, t, n, r) => {
		let i = Rd(t, r), a = Rd(n, r);
		Id()._OrtAddSessionConfigEntry(e, i, a) !== 0 && $(`Can't set a session config entry: ${t} - ${n}.`);
	}, qd = async (e, t, n) => {
		let r = t.executionProviders;
		for (let t of r) {
			let r = typeof t == "string" ? t : t.name, i = [];
			switch (r) {
				case "webnn":
					if (r = "WEBNN", Kd(e, "session.disable_quant_qdq", "1", n), Kd(e, "session.disable_qdq_constant_folding", "1", n), typeof t != "string") {
						let r = t?.deviceType;
						r && Kd(e, "deviceType", r, n);
					}
					break;
				case "webgpu":
					if (r = "JS", typeof t != "string") {
						let r = t;
						if (r?.preferredLayout) {
							if (r.preferredLayout !== "NCHW" && r.preferredLayout !== "NHWC") throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${r.preferredLayout}`);
							Kd(e, "preferredLayout", r.preferredLayout, n);
						}
					}
					break;
				case "wasm":
				case "cpu": continue;
				default: throw Error(`not supported execution provider: ${r}`);
			}
			let a = Rd(r, n), o = i.length, s = 0, c = 0;
			if (o > 0) {
				s = Id()._malloc(o * Id().PTR_SIZE), n.push(s), c = Id()._malloc(o * Id().PTR_SIZE), n.push(c);
				for (let e = 0; e < o; e++) Id().setValue(s + e * Id().PTR_SIZE, i[e][0], "*"), Id().setValue(c + e * Id().PTR_SIZE, i[e][1], "*");
			}
			await Id()._OrtAppendExecutionProvider(e, a, s, c, o) !== 0 && $(`Can't append execution provider: ${r}.`);
		}
	}, Jd = async (e) => {
		let t = Id(), n = 0, r = [], i = e || {};
		Gd(i);
		try {
			let e = Ud(i.graphOptimizationLevel ?? "all"), a = Wd(i.executionMode ?? "sequential"), o = typeof i.logId == "string" ? Rd(i.logId, r) : 0, s = i.logSeverityLevel ?? 2;
			if (!Number.isInteger(s) || s < 0 || s > 4) throw Error(`log severity level is not valid: ${s}`);
			let c = i.logVerbosityLevel ?? 0;
			if (!Number.isInteger(c) || c < 0 || c > 4) throw Error(`log verbosity level is not valid: ${c}`);
			let l = typeof i.optimizedModelFilePath == "string" ? Rd(i.optimizedModelFilePath, r) : 0;
			if (n = t._OrtCreateSessionOptions(e, !!i.enableCpuMemArena, !!i.enableMemPattern, a, !!i.enableProfiling, 0, o, s, c, l), n === 0 && $("Can't create session options."), i.executionProviders && await qd(n, i, r), i.enableGraphCapture !== void 0) {
				if (typeof i.enableGraphCapture != "boolean") throw Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);
				Kd(n, "enableGraphCapture", i.enableGraphCapture.toString(), r);
			}
			if (i.freeDimensionOverrides) for (let [e, a] of Object.entries(i.freeDimensionOverrides)) {
				if (typeof e != "string") throw Error(`free dimension override name must be a string: ${e}`);
				if (typeof a != "number" || !Number.isInteger(a) || a < 0) throw Error(`free dimension override value must be a non-negative integer: ${a}`);
				let i = Rd(e, r);
				t._OrtAddFreeDimensionOverride(n, i, a) !== 0 && $(`Can't set a free dimension override: ${e} - ${a}.`);
			}
			return i.extra !== void 0 && zd(i.extra, "", /* @__PURE__ */ new WeakSet(), (e, t) => {
				Kd(n, e, t, r);
			}), [n, r];
		} catch (e) {
			throw n !== 0 && t._OrtReleaseSessionOptions(n) !== 0 && $("Can't release session options."), r.forEach((e) => t._free(e)), e;
		}
	};
}), Xd, Zd, Qd, $d, ef, tf, nf, rf, af = Z(() => {
	Xd = (e) => {
		switch (e) {
			case "int8": return 3;
			case "uint8": return 2;
			case "bool": return 9;
			case "int16": return 5;
			case "uint16": return 4;
			case "int32": return 6;
			case "uint32": return 12;
			case "float16": return 10;
			case "float32": return 1;
			case "float64": return 11;
			case "string": return 8;
			case "int64": return 7;
			case "uint64": return 13;
			case "int4": return 22;
			case "uint4": return 21;
			default: throw Error(`unsupported data type: ${e}`);
		}
	}, Zd = (e) => {
		switch (e) {
			case 3: return "int8";
			case 2: return "uint8";
			case 9: return "bool";
			case 5: return "int16";
			case 4: return "uint16";
			case 6: return "int32";
			case 12: return "uint32";
			case 10: return "float16";
			case 1: return "float32";
			case 11: return "float64";
			case 8: return "string";
			case 7: return "int64";
			case 13: return "uint64";
			case 22: return "int4";
			case 21: return "uint4";
			default: throw Error(`unsupported data type: ${e}`);
		}
	}, Qd = (e, t) => {
		let n = [
			-1,
			4,
			1,
			1,
			2,
			2,
			4,
			8,
			-1,
			1,
			2,
			8,
			4,
			8,
			-1,
			-1,
			-1,
			-1,
			-1,
			-1,
			-1,
			.5,
			.5
		][e], r = typeof t == "number" ? t : t.reduce((e, t) => e * t, 1);
		return n > 0 ? Math.ceil(r * n) : void 0;
	}, $d = (e) => {
		switch (e) {
			case "float16": return typeof Float16Array < "u" ? Float16Array : Uint16Array;
			case "float32": return Float32Array;
			case "uint8": return Uint8Array;
			case "int8": return Int8Array;
			case "uint16": return Uint16Array;
			case "int16": return Int16Array;
			case "int32": return Int32Array;
			case "bool": return Uint8Array;
			case "float64": return Float64Array;
			case "uint32": return Uint32Array;
			case "int64": return BigInt64Array;
			case "uint64": return BigUint64Array;
			default: throw Error(`unsupported type: ${e}`);
		}
	}, ef = (e) => {
		switch (e) {
			case "verbose": return 0;
			case "info": return 1;
			case "warning": return 2;
			case "error": return 3;
			case "fatal": return 4;
			default: throw Error(`unsupported logging level: ${e}`);
		}
	}, tf = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", nf = (e) => e === "float32" || e === "float16" || e === "int32" || e === "int64" || e === "uint32" || e === "uint64" || e === "int8" || e === "uint8" || e === "bool" || e === "uint4" || e === "int4", rf = (e) => {
		switch (e) {
			case "none": return 0;
			case "cpu": return 1;
			case "cpu-pinned": return 2;
			case "texture": return 3;
			case "gpu-buffer": return 4;
			case "ml-tensor": return 5;
			default: throw Error(`unsupported data location: ${e}`);
		}
	};
}), of, sf = Z(() => {
	nd(), of = async (e) => {
		if (typeof e == "string") {
			let t = await fetch(e);
			if (!t.ok) throw Error(`failed to load external data file: ${e}`);
			let n = t.headers.get("Content-Length"), r = n ? parseInt(n, 10) : 0;
			if (r < 1073741824) return new Uint8Array(await t.arrayBuffer());
			{
				if (!t.body) throw Error(`failed to load external data file: ${e}, no response body.`);
				let n = t.body.getReader(), i;
				try {
					i = new ArrayBuffer(r);
				} catch (e) {
					if (e instanceof RangeError) {
						let e = Math.ceil(r / 65536);
						i = new WebAssembly.Memory({
							initial: e,
							maximum: e
						}).buffer;
					} else throw e;
				}
				let a = 0;
				for (;;) {
					let { done: e, value: t } = await n.read();
					if (e) break;
					let r = t.byteLength;
					new Uint8Array(i, a, r).set(t), a += r;
				}
				return new Uint8Array(i, 0, r);
			}
		}
		return e instanceof Blob ? new Uint8Array(await e.arrayBuffer()) : e instanceof Uint8Array ? e : new Uint8Array(e);
	};
}), cf, lf, uf, df, ff, pf, mf, hf, gf, _f, vf, yf, bf, xf = Z(() => {
	td(), Hd(), Yd(), af(), Ld(), Bd(), sf(), cf = (e, t) => {
		Id()._OrtInit(e, t) !== 0 && $("Can't initialize onnxruntime.");
	}, lf = async (e) => {
		cf(e.wasm.numThreads, ef(e.logLevel));
	}, uf = async (e, t) => {
		Id().asyncInit?.();
		let n = e.webgpu.adapter;
		if (t === "webgpu") {
			if (typeof navigator > "u" || !navigator.gpu) throw Error("WebGPU is not supported in current environment");
			if (n) {
				if (typeof n.limits != "object" || typeof n.features != "object" || typeof n.requestDevice != "function") throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
			} else {
				let t = e.webgpu.powerPreference;
				if (t !== void 0 && t !== "low-power" && t !== "high-performance") throw Error(`Invalid powerPreference setting: "${t}"`);
				let r = e.webgpu.forceFallbackAdapter;
				if (r !== void 0 && typeof r != "boolean") throw Error(`Invalid forceFallbackAdapter setting: "${r}"`);
				if (n = await navigator.gpu.requestAdapter({
					powerPreference: t,
					forceFallbackAdapter: r
				}), !n) throw Error("Failed to get GPU adapter. You may need to enable flag \"--enable-unsafe-webgpu\" if you are using Chrome.");
			}
		}
		if (t === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw Error("WebNN is not supported in current environment");
	}, df = /* @__PURE__ */ new Map(), ff = (e) => {
		let t = Id(), n = t.stackSave();
		try {
			let n = t.PTR_SIZE, r = t.stackAlloc(2 * n);
			t._OrtGetInputOutputCount(e, r, r + n) !== 0 && $("Can't get session input/output count.");
			let i = n === 4 ? "i32" : "i64";
			return [Number(t.getValue(r, i)), Number(t.getValue(r + n, i))];
		} finally {
			t.stackRestore(n);
		}
	}, pf = (e, t) => {
		let n = Id(), r = n.stackSave(), i = 0;
		try {
			let r = n.PTR_SIZE, a = n.stackAlloc(2 * r);
			n._OrtGetInputOutputMetadata(e, t, a, a + r) !== 0 && $("Can't get session input/output metadata.");
			let o = Number(n.getValue(a, "*"));
			i = Number(n.getValue(a + r, "*"));
			let s = n.HEAP32[i / 4];
			if (s === 0) return [o, 0];
			let c = n.HEAPU32[i / 4 + 1], l = [];
			for (let e = 0; e < c; e++) {
				let t = Number(n.getValue(i + 8 + e * r, "*"));
				l.push(t === 0 ? Number(n.getValue(i + 8 + (e + c) * r, "*")) : n.UTF8ToString(t));
			}
			return [
				o,
				s,
				l
			];
		} finally {
			n.stackRestore(r), i !== 0 && n._OrtFree(i);
		}
	}, mf = (e) => {
		let t = Id(), n = t._malloc(e.byteLength);
		if (n === 0) throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);
		return t.HEAPU8.set(e, n), [n, e.byteLength];
	}, hf = async (e, t) => {
		let n, r, i = Id();
		Array.isArray(e) ? [n, r] = e : e.buffer === i.HEAPU8.buffer ? [n, r] = [e.byteOffset, e.byteLength] : [n, r] = mf(e);
		let a = 0, o = 0, s = [], c = [], l = [];
		try {
			if ([o, s] = await Jd(t), t?.externalData && i.mountExternalData) {
				let e = [];
				for (let n of t.externalData) {
					let t = typeof n == "string" ? n : n.path, r = typeof n == "string" ? n : n.data;
					e.push(of(r).then((e) => {
						i.mountExternalData(t, e);
					}));
				}
				await Promise.all(e);
			}
			for (let e of t?.executionProviders ?? []) if ((typeof e == "string" ? e : e.name) === "webnn") {
				if (i.shouldTransferToMLTensor = !1, typeof e != "string") {
					let t = e, n = t?.context, r = t?.gpuDevice, a = t?.deviceType, o = t?.powerPreference;
					i.currentContext = n || (r ? await i.webnnCreateMLContext(r) : await i.webnnCreateMLContext({
						deviceType: a,
						powerPreference: o
					}));
				} else i.currentContext = await i.webnnCreateMLContext();
				break;
			}
			a = await i._OrtCreateSession(n, r, o), i.webgpuOnCreateSession?.(a), a === 0 && $("Can't create a session."), i.jsepOnCreateSession?.(), i.currentContext && (i.webnnRegisterMLContext(a, i.currentContext), i.currentContext = void 0, i.shouldTransferToMLTensor = !0);
			let [e, u] = ff(a), d = !!t?.enableGraphCapture, f = [], p = [], m = [], h = [];
			for (let t = 0; t < e; t++) {
				let [e, n, r] = pf(a, t);
				e === 0 && $("Can't get an input name."), c.push(e);
				let o = i.UTF8ToString(e);
				f.push(o), m.push(n === 0 ? {
					name: o,
					isTensor: !1
				} : {
					name: o,
					isTensor: !0,
					type: Zd(n),
					shape: r
				});
			}
			for (let t = 0; t < u; t++) {
				let [n, r, o] = pf(a, t + e);
				n === 0 && $("Can't get an output name."), l.push(n);
				let s = i.UTF8ToString(n);
				p.push(s), h.push(r === 0 ? {
					name: s,
					isTensor: !1
				} : {
					name: s,
					isTensor: !0,
					type: Zd(r),
					shape: o
				});
			}
			return df.set(a, [
				a,
				c,
				l,
				null,
				d,
				!1
			]), [
				a,
				f,
				p,
				m,
				h
			];
		} catch (e) {
			throw c.forEach((e) => i._OrtFree(e)), l.forEach((e) => i._OrtFree(e)), a !== 0 && i._OrtReleaseSession(a) !== 0 && $("Can't release session."), e;
		} finally {
			i._free(n), o !== 0 && i._OrtReleaseSessionOptions(o) !== 0 && $("Can't release session options."), s.forEach((e) => i._free(e)), i.unmountExternalData?.();
		}
	}, gf = (e) => {
		let t = Id(), n = df.get(e);
		if (!n) throw Error(`cannot release session. invalid session id: ${e}`);
		let [r, i, a, o, s] = n;
		o && (s && t._OrtClearBoundOutputs(o.handle) !== 0 && $("Can't clear bound outputs."), t._OrtReleaseBinding(o.handle) !== 0 && $("Can't release IO binding.")), t.jsepOnReleaseSession?.(e), t.webnnOnReleaseSession?.(e), t.webgpuOnReleaseSession?.(e), i.forEach((e) => t._OrtFree(e)), a.forEach((e) => t._OrtFree(e)), t._OrtReleaseSession(r) !== 0 && $("Can't release session."), df.delete(e);
	}, _f = async (e, t, n, r, i, a, o = !1) => {
		if (!e) {
			t.push(0);
			return;
		}
		let s = Id(), c = s.PTR_SIZE, l = e[0], u = e[1], d = e[3], f = d, p, m;
		if (l === "string" && (d === "gpu-buffer" || d === "ml-tensor")) throw Error("String tensor is not supported on GPU.");
		if (o && d !== "gpu-buffer") throw Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);
		if (d === "gpu-buffer") {
			let t = e[2].gpuBuffer;
			m = Qd(Xd(l), u);
			{
				let e = s.jsepRegisterBuffer;
				if (!e) throw Error("Tensor location \"gpu-buffer\" is not supported without using WebGPU.");
				p = e(r, a, t, m);
			}
		} else if (d === "ml-tensor") {
			let t = e[2].mlTensor;
			m = Qd(Xd(l), u);
			let n = s.webnnRegisterMLTensor;
			if (!n) throw Error("Tensor location \"ml-tensor\" is not supported without using WebNN.");
			p = n(r, t, Xd(l), u);
		} else {
			let t = e[2];
			if (Array.isArray(t)) {
				m = c * t.length, p = s._malloc(m), n.push(p);
				for (let e = 0; e < t.length; e++) {
					if (typeof t[e] != "string") throw TypeError(`tensor data at index ${e} is not a string`);
					s.setValue(p + e * c, Rd(t[e], n), "*");
				}
			} else {
				let e = s.webnnIsGraphInput, a = s.webnnIsGraphOutput;
				if (l !== "string" && e && a) {
					let o = s.UTF8ToString(i);
					if (e(r, o) || a(r, o)) {
						let e = Xd(l);
						m = Qd(e, u), f = "ml-tensor";
						let n = s.webnnCreateTemporaryTensor, i = s.webnnUploadTensor;
						if (!n || !i) throw Error("Tensor location \"ml-tensor\" is not supported without using WebNN.");
						let a = await n(r, e, u);
						i(a, new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), p = a;
					} else m = t.byteLength, p = s._malloc(m), n.push(p), s.HEAPU8.set(new Uint8Array(t.buffer, t.byteOffset, m), p);
				} else m = t.byteLength, p = s._malloc(m), n.push(p), s.HEAPU8.set(new Uint8Array(t.buffer, t.byteOffset, m), p);
			}
		}
		let h = s.stackSave(), g = s.stackAlloc(4 * u.length);
		try {
			u.forEach((e, t) => s.setValue(g + t * c, e, c === 4 ? "i32" : "i64"));
			let e = s._OrtCreateTensor(Xd(l), p, m, g, u.length, rf(f));
			e === 0 && $(`Can't create tensor for input/output. session=${r}, index=${a}.`), t.push(e);
		} finally {
			s.stackRestore(h);
		}
	}, vf = async (e, t, n, r, i, a) => {
		let o = Id(), s = o.PTR_SIZE, c = df.get(e);
		if (!c) throw Error(`cannot run inference. invalid session id: ${e}`);
		let l = c[0], u = c[1], d = c[2], f = c[3], p = c[4];
		c[5];
		let m = t.length, h = r.length, g = 0, _ = [], v = [], y = [], b = [], x = [], S = o.stackSave(), C = o.stackAlloc(m * s), w = o.stackAlloc(m * s), T = o.stackAlloc(h * s), E = o.stackAlloc(h * s);
		try {
			[g, _] = Vd(a), Wu("wasm prepareInputOutputTensor");
			for (let r = 0; r < m; r++) await _f(n[r], v, b, e, u[t[r]], t[r], p);
			for (let t = 0; t < h; t++) await _f(i[t], y, b, e, d[r[t]], m + r[t], p);
			Gu("wasm prepareInputOutputTensor");
			for (let e = 0; e < m; e++) o.setValue(C + e * s, v[e], "*"), o.setValue(w + e * s, u[t[e]], "*");
			for (let e = 0; e < h; e++) o.setValue(T + e * s, y[e], "*"), o.setValue(E + e * s, d[r[e]], "*");
			o.jsepOnRunStart?.(l), o.webnnOnRunStart?.(l);
			let c;
			c = await o._OrtRun(l, w, C, m, E, h, T, g), c !== 0 && $("failed to call OrtRun().");
			let S = [], D = [];
			Wu("wasm ProcessOutputTensor");
			for (let t = 0; t < h; t++) {
				let n = Number(o.getValue(T + t * s, "*"));
				if (n === y[t] || x.includes(y[t])) {
					S.push(i[t]), n !== y[t] && o._OrtReleaseTensor(n) !== 0 && $("Can't release tensor.");
					continue;
				}
				let a = o.stackSave(), c = o.stackAlloc(4 * s), l = !1, u, d = 0;
				try {
					o._OrtGetTensorData(n, c, c + s, c + 2 * s, c + 3 * s) !== 0 && $(`Can't access output tensor data on index ${t}.`);
					let i = s === 4 ? "i32" : "i64", a = Number(o.getValue(c, i));
					d = o.getValue(c + s, "*");
					let p = o.getValue(c + s * 2, "*"), m = Number(o.getValue(c + s * 3, i)), h = [];
					for (let e = 0; e < m; e++) h.push(Number(o.getValue(p + e * s, i)));
					o._OrtFree(p) !== 0 && $("Can't free memory for tensor dims.");
					let g = h.reduce((e, t) => e * t, 1);
					u = Zd(a);
					let _ = f?.outputPreferredLocations[r[t]];
					if (u === "string") {
						if (_ === "gpu-buffer" || _ === "ml-tensor") throw Error("String tensor is not supported on GPU.");
						let e = [];
						for (let t = 0; t < g; t++) {
							let n = o.getValue(d + t * s, "*"), r = o.getValue(d + (t + 1) * s, "*"), i = t === g - 1 ? void 0 : r - n;
							e.push(o.UTF8ToString(n, i));
						}
						S.push([
							u,
							h,
							e,
							"cpu"
						]);
					} else if (_ === "gpu-buffer" && g > 0) {
						let e = o.jsepGetBuffer;
						if (!e) throw Error("preferredLocation \"gpu-buffer\" is not supported without using WebGPU.");
						let t = e(d), r = Qd(a, g);
						if (r === void 0 || !tf(u)) throw Error(`Unsupported data type: ${u}`);
						l = !0, S.push([
							u,
							h,
							{
								gpuBuffer: t,
								download: o.jsepCreateDownloader(t, r, u),
								dispose: () => {
									o._OrtReleaseTensor(n) !== 0 && $("Can't release tensor.");
								}
							},
							"gpu-buffer"
						]);
					} else if (_ === "ml-tensor" && g > 0) {
						let t = o.webnnEnsureTensor, r = o.webnnIsGraphInputOutputTypeSupported;
						if (!t || !r) throw Error("preferredLocation \"ml-tensor\" is not supported without using WebNN.");
						if (Qd(a, g) === void 0 || !nf(u)) throw Error(`Unsupported data type: ${u}`);
						if (!r(e, u, !1)) throw Error(`preferredLocation "ml-tensor" for ${u} output is not supported by current WebNN Context.`);
						let i = await t(e, d, a, h, !1);
						l = !0, S.push([
							u,
							h,
							{
								mlTensor: i,
								download: o.webnnCreateMLTensorDownloader(d, u),
								dispose: () => {
									o.webnnReleaseTensorId(d), o._OrtReleaseTensor(n);
								}
							},
							"ml-tensor"
						]);
					} else if (_ === "ml-tensor-cpu-output" && g > 0) {
						let e = o.webnnCreateMLTensorDownloader(d, u)(), t = S.length;
						l = !0, D.push((async () => {
							let r = [t, await e];
							return o.webnnReleaseTensorId(d), o._OrtReleaseTensor(n), r;
						})()), S.push([
							u,
							h,
							[],
							"cpu"
						]);
					} else {
						let e = new ($d(u))(g);
						new Uint8Array(e.buffer, e.byteOffset, e.byteLength).set(o.HEAPU8.subarray(d, d + e.byteLength)), S.push([
							u,
							h,
							e,
							"cpu"
						]);
					}
				} finally {
					o.stackRestore(a), u === "string" && d && o._free(d), l || o._OrtReleaseTensor(n);
				}
			}
			f && !p && (o._OrtClearBoundOutputs(f.handle) !== 0 && $("Can't clear bound outputs."), df.set(e, [
				l,
				u,
				d,
				f,
				p,
				!1
			]));
			for (let [e, t] of await Promise.all(D)) S[e][2] = t;
			return Gu("wasm ProcessOutputTensor"), S;
		} finally {
			o.webnnOnRunEnd?.(l), o.stackRestore(S), v.forEach((e) => o._OrtReleaseTensor(e)), y.forEach((e) => o._OrtReleaseTensor(e)), b.forEach((e) => o._free(e)), g !== 0 && o._OrtReleaseRunOptions(g), _.forEach((e) => o._free(e));
		}
	}, yf = (e) => {
		let t = Id(), n = df.get(e);
		if (!n) throw Error("invalid session id");
		let r = n[0], i = t._OrtEndProfiling(r);
		i === 0 && $("Can't get an profile file name."), t._OrtFree(i);
	}, bf = (e) => {
		let t = [];
		for (let n of e) {
			let e = n[2];
			!Array.isArray(e) && "buffer" in e && t.push(e.buffer);
		}
		return t;
	};
}), Sf, Cf, wf, Tf, Ef, Df, Of, kf, Af, jf, Mf, Nf, Pf, Ff, If, Lf, Rf, zf, Bf = Z(() => {
	td(), xf(), Ld(), Dd(), Sf = () => !!Q.wasm.proxy && typeof document < "u", wf = !1, Tf = !1, Ef = !1, kf = /* @__PURE__ */ new Map(), Af = (e, t) => {
		let n = kf.get(e);
		n ? n.push(t) : kf.set(e, [t]);
	}, jf = () => {
		if (wf || !Tf || Ef || !Cf) throw Error("worker not ready");
	}, Mf = (e) => {
		switch (e.data.type) {
			case "init-wasm":
				wf = !1, e.data.err ? (Ef = !0, Of[1](e.data.err)) : (Tf = !0, Of[0]()), Df &&= (URL.revokeObjectURL(Df), void 0);
				break;
			case "init-ep":
			case "copy-from":
			case "create":
			case "release":
			case "run":
			case "end-profiling": {
				let t = kf.get(e.data.type);
				e.data.err ? t.shift()[1](e.data.err) : t.shift()[0](e.data.out);
				break;
			}
		}
	}, Nf = async () => {
		if (!Tf) {
			if (wf) throw Error("multiple calls to 'initWasm()' detected.");
			if (Ef) throw Error("previous call to 'initWasm()' failed.");
			if (wf = !0, Sf()) return new Promise((e, t) => {
				Cf?.terminate(), wd().then(([n, r]) => {
					try {
						Cf = r, Cf.onerror = (e) => t(e), Cf.onmessage = Mf, Of = [e, t];
						let i = {
							type: "init-wasm",
							in: Q
						};
						!i.in.wasm.wasmPaths && (n || md) && (i.in.wasm.wasmPaths = { wasm: new URL("./assets/ort-wasm-simd-threaded-DDx2apAW.wasm", import.meta.url).href }), Cf.postMessage(i), Df = n;
					} catch (e) {
						t(e);
					}
				}, t);
			});
			try {
				await Fd(Q.wasm), await lf(Q), Tf = !0;
			} catch (e) {
				throw Ef = !0, e;
			} finally {
				wf = !1;
			}
		}
	}, Pf = async (e) => {
		if (Sf()) return jf(), new Promise((t, n) => {
			Af("init-ep", [t, n]);
			let r = {
				type: "init-ep",
				in: {
					epName: e,
					env: Q
				}
			};
			Cf.postMessage(r);
		});
		await uf(Q, e);
	}, Ff = async (e) => Sf() ? (jf(), new Promise((t, n) => {
		Af("copy-from", [t, n]);
		let r = {
			type: "copy-from",
			in: { buffer: e }
		};
		Cf.postMessage(r, [e.buffer]);
	})) : mf(e), If = async (e, t) => {
		if (Sf()) {
			if (t?.preferredOutputLocation) throw Error("session option \"preferredOutputLocation\" is not supported for proxy.");
			return jf(), new Promise((n, r) => {
				Af("create", [n, r]);
				let i = {
					type: "create",
					in: {
						model: e,
						options: { ...t }
					}
				}, a = [];
				e instanceof Uint8Array && a.push(e.buffer), Cf.postMessage(i, a);
			});
		}
		return hf(e, t);
	}, Lf = async (e) => {
		if (Sf()) return jf(), new Promise((t, n) => {
			Af("release", [t, n]);
			let r = {
				type: "release",
				in: e
			};
			Cf.postMessage(r);
		});
		gf(e);
	}, Rf = async (e, t, n, r, i, a) => {
		if (Sf()) {
			if (n.some((e) => e[3] !== "cpu")) throw Error("input tensor on GPU is not supported for proxy.");
			if (i.some((e) => e)) throw Error("pre-allocated output tensor is not supported for proxy.");
			return jf(), new Promise((i, o) => {
				Af("run", [i, o]);
				let s = n, c = {
					type: "run",
					in: {
						sessionId: e,
						inputIndices: t,
						inputs: s,
						outputIndices: r,
						options: a
					}
				};
				Cf.postMessage(c, bf(s));
			});
		}
		return vf(e, t, n, r, i, a);
	}, zf = async (e) => {
		if (Sf()) return jf(), new Promise((t, n) => {
			Af("end-profiling", [t, n]);
			let r = {
				type: "end-profiling",
				in: e
			};
			Cf.postMessage(r);
		});
		yf(e);
	};
}), Vf, Hf, Uf, Wf = Z(() => {
	td(), Bf(), af(), nd(), sf(), Vf = (e, t) => {
		switch (e.location) {
			case "cpu": return [
				e.type,
				e.dims,
				e.data,
				"cpu"
			];
			case "gpu-buffer": return [
				e.type,
				e.dims,
				{ gpuBuffer: e.gpuBuffer },
				"gpu-buffer"
			];
			case "ml-tensor": return [
				e.type,
				e.dims,
				{ mlTensor: e.mlTensor },
				"ml-tensor"
			];
			default: throw Error(`invalid data location: ${e.location} for ${t()}`);
		}
	}, Hf = (e) => {
		switch (e[3]) {
			case "cpu": return new Ru(e[0], e[2], e[1]);
			case "gpu-buffer": {
				let t = e[0];
				if (!tf(t)) throw Error(`not supported data type: ${t} for deserializing GPU tensor`);
				let { gpuBuffer: n, download: r, dispose: i } = e[2];
				return Ru.fromGpuBuffer(n, {
					dataType: t,
					dims: e[1],
					download: r,
					dispose: i
				});
			}
			case "ml-tensor": {
				let t = e[0];
				if (!nf(t)) throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);
				let { mlTensor: n, download: r, dispose: i } = e[2];
				return Ru.fromMLTensor(n, {
					dataType: t,
					dims: e[1],
					download: r,
					dispose: i
				});
			}
			default: throw Error(`invalid data location: ${e[3]}`);
		}
	}, Uf = class {
		async fetchModelAndCopyToWasmMemory(e) {
			return Ff(await of(e));
		}
		async loadModel(e, t) {
			Hu();
			let n;
			n = typeof e == "string" ? await this.fetchModelAndCopyToWasmMemory(e) : e, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await If(n, t), Uu();
		}
		async dispose() {
			return Lf(this.sessionId);
		}
		async run(e, t, n) {
			Hu();
			let r = [], i = [];
			Object.entries(e).forEach((e) => {
				let t = e[0], n = e[1], a = this.inputNames.indexOf(t);
				if (a === -1) throw Error(`invalid input '${t}'`);
				r.push(n), i.push(a);
			});
			let a = [], o = [];
			Object.entries(t).forEach((e) => {
				let t = e[0], n = e[1], r = this.outputNames.indexOf(t);
				if (r === -1) throw Error(`invalid output '${t}'`);
				a.push(n), o.push(r);
			});
			let s = r.map((e, t) => Vf(e, () => `input "${this.inputNames[i[t]]}"`)), c = a.map((e, t) => e ? Vf(e, () => `output "${this.outputNames[o[t]]}"`) : null), l = await Rf(this.sessionId, i, s, o, c, n), u = {};
			for (let e = 0; e < l.length; e++) u[this.outputNames[o[e]]] = a[e] ?? Hf(l[e]);
			return Uu(), u;
		}
		startProfiling() {}
		endProfiling() {
			zf(this.sessionId);
		}
	};
}), Gf = {};
nu(Gf, {
	OnnxruntimeWebAssemblyBackend: () => qf,
	initializeFlags: () => Kf,
	wasmBackend: () => Jf
});
var Kf, qf, Jf, Yf = Z(() => {
	td(), Bf(), Wf(), Kf = () => {
		(typeof Q.wasm.initTimeout != "number" || Q.wasm.initTimeout < 0) && (Q.wasm.initTimeout = 0);
		let e = Q.wasm.simd;
		if (typeof e != "boolean" && e !== void 0 && e !== "fixed" && e !== "relaxed" && (Q.wasm.simd = !1), typeof Q.wasm.proxy != "boolean" && (Q.wasm.proxy = !1), typeof Q.wasm.trace != "boolean" && (Q.wasm.trace = !1), typeof Q.wasm.numThreads != "number" || !Number.isInteger(Q.wasm.numThreads) || Q.wasm.numThreads <= 0) {
			if (typeof self < "u" && !self.crossOriginIsolated) Q.wasm.numThreads = 1;
			else {
				let e = typeof navigator > "u" ? tu("node:os").cpus().length : navigator.hardwareConcurrency;
				Q.wasm.numThreads = Math.min(4, Math.ceil((e || 1) / 2));
			}
		}
	}, qf = class {
		async init(e) {
			Kf(), await Nf(), await Pf(e);
		}
		async createInferenceSessionHandler(e, t) {
			let n = new Uf();
			return await n.loadModel(e, t), n;
		}
	}, Jf = new qf();
});
td(), td(), td();
var Xf = "1.29.0";
{
	let e = (Yf(), iu(Gf)).wasmBackend;
	su("cpu", e, 10), su("wasm", e, 10);
}
Object.defineProperty(Q.versions, "web", {
	value: Xf,
	enumerable: !0
}), Q.wasm.proxy = !1, Q.wasm.numThreads = 1;
{
	let e = import.meta.url;
	Q.wasm.wasmPaths = { wasm: new URL("./assets/ort-wasm-simd-threaded-DDx2apAW.wasm", e).href };
}
//#endregion
//#region src/core/onnx/runQueue.ts
var Zf = Promise.resolve();
function Qf(e) {
	let t = Zf.then(e, e);
	return Zf = t.catch(() => void 0), t;
}
//#endregion
//#region src/core/onnx/session.ts
function $f(e) {
	return e.input ? e.input : `${e.entity ?? "entity"}__${e.field ?? ""}`;
}
function ep(e, t) {
	let n = e.shape;
	return !n || n.length === 0 || n.slice(1).reduce((e, t) => e * t, 1) !== t ? [1, t] : [1, ...n.slice(1)];
}
function tp(e) {
	if (e instanceof Float32Array) return e;
	let t = new Float32Array(e.length);
	for (let n = 0; n < e.length; n++) t[n] = Number(e[n]);
	return t;
}
function np(e, t) {
	let n = {};
	for (let r of e ?? []) {
		let e = t?.(r) ?? null;
		if (!e) return {
			feeds: n,
			missing: $f(r)
		};
		n[$f(r)] = {
			data: e,
			dims: ep(r, e.length)
		};
	}
	return {
		feeds: n,
		missing: null
	};
}
function rp(e, t) {
	let n = e.inputNames;
	if (!n) return t;
	let r = new Set(n), i = {};
	for (let [e, n] of Object.entries(t)) r.has(e) && (i[e] = n);
	return i;
}
function ip(e) {
	return e.data instanceof Uint8Array ? new Ru("bool", e.data, e.dims) : e.data instanceof BigInt64Array ? new Ru("int64", e.data, e.dims) : new Ru("float32", e.data, e.dims);
}
function ap(e) {
	return e.type === "bool" || e.type, {
		data: e.data,
		dims: e.dims
	};
}
var op = class {
	constructor(e) {
		this.session = e;
	}
	get inputNames() {
		return this.session.inputNames;
	}
	async run(e) {
		let t = {};
		for (let [n, r] of Object.entries(e)) t[n] = ip(r);
		let n = await Qf(() => this.session.run(t)), r = {};
		for (let [e, t] of Object.entries(n)) r[e] = ap(t);
		return r;
	}
	async release() {
		await this.session.release();
	}
};
async function sp(e) {
	return new op(await Yu.create(e, {
		executionProviders: ["wasm"],
		graphOptimizationLevel: "all"
	}));
}
var cp = class {
	constructor(e = sp) {
		this.sessionFactory = e, this.sessions = /* @__PURE__ */ new Map();
	}
	async load(e) {
		await Promise.all(e.map(async (e) => {
			this.sessions.set(e.name, await this.sessionFactory(e.data));
		}));
	}
	get(e) {
		return this.sessions.get(e);
	}
	get size() {
		return this.sessions.size;
	}
	async clear() {
		let e = [...this.sessions.values()];
		this.sessions.clear(), e.length !== 0 && await Qf(async () => {
			for (let t of e) try {
				await t.release?.();
			} catch {}
		});
	}
}, lp = new z(0, 1, 0), up = .8, dp = 32;
function fp(e = [
	1,
	1,
	1
], t = 1) {
	return new ke({
		color: new f(e[0], e[1], e[2]),
		transparent: !0,
		opacity: t
	});
}
function pp() {
	return new ge(1, 1, 1, dp).translate(0, .5, 0);
}
function mp() {
	return new u(2, 1, dp).translate(0, .5, 0);
}
function hp() {
	return new v(1, 3);
}
function gp(e, t, n, r) {
	let i = new S(e, t, Math.max(n, 1));
	return i.name = r, i.count = 0, i.frustumCulled = !1, i;
}
var _p = class {
	constructor(e, t) {
		this.capacity = e, this.object = new B(), this.count = 0, this.matrix = new se(), this.quat = new U(), this.color = new f(), this.object.name = t;
		let n = fp();
		this.shafts = gp(pp(), n, e, `${t}-shafts`), this.heads = gp(mp(), n, e, `${t}-heads`), this.object.add(this.shafts, this.heads);
	}
	clear() {
		this.count = 0;
	}
	add(e, t, n, r) {
		let i = ce(e), a = ce(t).sub(i), o = a.length();
		if (o < 1e-6 || this.count >= this.capacity) return;
		a.divideScalar(o), this.quat.setFromUnitVectors(lp, a), this.color.setRGB(n[0], n[1], n[2]);
		let s = o * up;
		this.matrix.compose(i, this.quat, new z(r, s, r)), this.shafts.setMatrixAt(this.count, this.matrix), this.shafts.setColorAt(this.count, this.color);
		let c = i.clone().addScaledVector(a, s);
		this.matrix.compose(c, this.quat, new z(r, o - s, r)), this.heads.setMatrixAt(this.count, this.matrix), this.heads.setColorAt(this.count, this.color), this.count += 1;
	}
	commit() {
		for (let e of [this.shafts, this.heads]) e.count = this.count, e.instanceMatrix.needsUpdate = !0, e.instanceColor && (e.instanceColor.needsUpdate = !0);
	}
	dispose() {
		this.object.removeFromParent();
		for (let e of [this.shafts, this.heads]) e.geometry.dispose();
		this.shafts.material.dispose();
	}
}, vp = class {
	constructor(e, t, n) {
		this.capacity = e, this.count = 0, this.matrix = new se(), this.color = new f(), this.identity = new U(), this.object = gp(hp(), fp([
			1,
			1,
			1
		], n), e, t);
	}
	clear() {
		this.count = 0;
	}
	add(e, t, n) {
		this.count >= this.capacity || (this.matrix.compose(ce(e), this.identity, new z(t, t, t)), this.object.setMatrixAt(this.count, this.matrix), this.object.setColorAt(this.count, this.color.setRGB(n[0], n[1], n[2])), this.count += 1);
	}
	commit() {
		this.object.count = this.count, this.object.instanceMatrix.needsUpdate = !0, this.object.instanceColor && (this.object.instanceColor.needsUpdate = !0);
	}
	dispose() {
		this.object.removeFromParent(), this.object.geometry.dispose(), this.object.material.dispose();
	}
}, yp = [
	[
		.9,
		0,
		0,
		1
	],
	[
		0,
		.9,
		0,
		1
	],
	[
		0,
		0,
		.9,
		1
	]
];
function bp(e, t, n, r, i = yp, a = .01) {
	let [o, s, c, l] = [
		n[0],
		n[1],
		n[2],
		n[3]
	];
	[
		[
			1 - 2 * (c * c + l * l),
			2 * (s * c + o * l),
			2 * (s * l - o * c)
		],
		[
			2 * (s * c - o * l),
			1 - 2 * (s * s + l * l),
			2 * (c * l + o * s)
		],
		[
			2 * (s * l + o * c),
			2 * (c * l - o * s),
			1 - 2 * (s * s + c * c)
		]
	].forEach((n, o) => {
		let s = [
			t[0] + n[0] * r,
			t[1] + n[1] * r,
			t[2] + n[2] * r
		];
		e.add(t, s, i[o], a);
	});
}
//#endregion
//#region src/core/command/debugViz.ts
var xp = new z(0, 1, 0), Sp = .2;
function Cp(e, t, n) {
	let r = null;
	if (e.const ? r = e.const : e.state ? r = t(e.state) : e.field && (r = n?.({
		entity: e.entity ?? null,
		field: e.field
	}) ?? null), !r) return null;
	let i = e.scale ?? 1, a = /* @__PURE__ */ new Float32Array(3);
	for (let t = 0; t < 3; t++) {
		let n = e.components ? e.components[t] : t;
		n != null && (a[t] = (r[n] ?? 0) * i);
	}
	return a;
}
function wp(e, t, n) {
	if (!t) return ce(e);
	let r = n?.({
		entity: t.entity,
		field: t.pos_field
	}), i = n?.({
		entity: t.entity,
		field: t.quat_field
	});
	if (!r || !i) return null;
	let a = new z(e[0], e[1], e[2]).applyQuaternion(new U(i[1], i[2], i[3], i[0]));
	return ce([
		a.x + r[0],
		a.y + r[1],
		a.z + r[2]
	]);
}
function Tp(e) {
	let t = e.width ?? .015, n = fp(e.color), r = new xe(pp().scale(t, 1, t), n), i = new xe(mp().scale(t, 1, t), n), a = new B();
	return a.add(r, i), a;
}
function Ep(e) {
	let t = e.radius ?? .03;
	return new xe(hp().scale(t, t, t), fp(e.color, e.color[3] ?? 1));
}
var Dp = class {
	constructor(e, t, n) {
		this.primitives = t, this.root = n, this.objects = t.map((t, r) => {
			let i = t.shape === "arrow" ? Tp(t) : Ep(t);
			return i.name = `mjswan-command-${e}-viz-${r}`, i.visible = !1, n.add(i), i;
		});
	}
	update(e, t, n) {
		for (let r = 0; r < this.primitives.length; r++) {
			let i = this.primitives[r], a = this.objects[r];
			if (a.visible = !1, !e) continue;
			let o = Cp(i.origin, t, n);
			if (!o) continue;
			let s = wp(o, i.frame, n);
			if (!s) continue;
			if (i.shape !== "arrow") {
				a.position.copy(s), a.visible = !0;
				continue;
			}
			let c = i.vector && Cp(i.vector, t, n);
			if (!c) continue;
			let l = wp(Float32Array.from([
				o[0] + c[0],
				o[1] + c[1],
				o[2] + c[2]
			]), i.frame, n);
			if (!l) continue;
			let u = l.clone().sub(s), d = u.length();
			if (d < 1e-6) continue;
			let [f, p] = a.children;
			f.scale.set(1, d * .8, 1), p.scale.set(1, d * Sp, 1), p.position.y = d * .8, a.quaternion.setFromUnitVectors(xp, u.divideScalar(d)), a.position.copy(s), a.visible = !0;
		}
	}
	dispose() {
		for (let e of this.objects) this.root.remove(e), e.traverse((e) => {
			if (!(e instanceof xe)) return;
			e.geometry.dispose();
			let t = e.material;
			Array.isArray(t) ? t.forEach((e) => e.dispose()) : t.dispose();
		});
	}
};
//#endregion
//#region src/core/command/OnnxCommand.ts
function Op(e) {
	return e.reduce((e, t) => e * t, 1);
}
function kp(e) {
	let t = Op(e.shape), n = e.dtype === "bool" ? new Uint8Array(t) : new Float32Array(t), r = e.init;
	if (r) for (let e = 0; e < Math.min(t, r.length); e++) n[e] = Number(r[e]);
	return {
		data: n,
		dims: [...e.shape]
	};
}
var Ap = class {
	constructor(e, t, n, r) {
		this.state = /* @__PURE__ */ new Map(), this.timeLeft = 0, this.inFlight = null, this.pendingResample = !0, this.uiValues = /* @__PURE__ */ new Map(), this.cfg = t, this.deps = r, this.context = n;
		for (let e of t.state_fields) this.state.set(e.name, kp(e));
		let i = t.state_fields.find((e) => e.name === t.command_field);
		this.command = new Float32Array(i ? Op(i.shape) : 0), this.timeLeft = this.sampleResampleTime(), this.debugVisOn = t.debug_vis === !0;
		for (let e of t.ui?.inputs ?? []) e.type === "slider" ? this.uiValues.set(e.name, e.default) : e.type === "checkbox" && this.uiValues.set(e.name, +!!e.default);
		this.visuals = t.viz?.length && n ? new Dp(e, t.viz, n.mujocoRoot ?? n.scene) : null;
	}
	getCommand() {
		if (this.isUiEnabled()) {
			let e = (this.cfg.ui?.inputs ?? []).filter((e) => e.type === "slider"), t = Float32Array.from(this.command);
			for (let n = 0; n < e.length && n < t.length; n++) t[n] = this.uiValues.get(e[n].name) ?? t[n];
			return t;
		}
		return this.command;
	}
	getUiConfig() {
		return this.cfg.ui ?? null;
	}
	getStateField(e) {
		if (e === "command" || e === this.cfg.command_field) return Float32Array.from(this.getCommand());
		let t = this.state.get(e);
		return t ? Float32Array.from(tp(t.data)) : null;
	}
	update(e, t = !1) {
		if (t || (this.timeLeft -= e, this.timeLeft <= 0 && (this.pendingResample = !0, this.timeLeft += this.sampleResampleTime(), this.timeLeft <= 0 && (this.timeLeft = this.sampleResampleTime())), this.inFlight)) return;
		let n = this.pendingResample;
		this.pendingResample = !1, this.run(n).catch((e) => {});
	}
	async reset() {
		this.timeLeft = this.sampleResampleTime(), this.pendingResample = !1, await this.inFlight?.catch(() => {}), await this.run(!0, !0);
	}
	run(e, t = !1) {
		let n = this.step(e, t).finally(() => {
			this.inFlight === n && (this.inFlight = null);
		});
		return this.inFlight = n, n;
	}
	debugVisEnabled() {
		return !this.visuals || !this.cfg.debug_vis ? null : this.debugVisOn;
	}
	setDebugVisEnabled(e) {
		this.debugVisOn = e;
	}
	updateDebugVisuals(e = !0) {
		this.visuals?.update(e && this.debugVisEnabled() === !0, (e) => e === this.cfg.command_field ? this.getCommand() : this.getStateField(e), this.deps.readSlot);
	}
	dispose() {
		this.visuals?.dispose();
	}
	getUiValue(e) {
		return this.uiValues.get(e);
	}
	setValue(e, t) {
		return this.uiValues.set(e, t), t;
	}
	triggerButton(e) {
		if (e !== "zero") return !1;
		for (let e of this.cfg.ui?.inputs ?? []) e.type === "slider" && this.uiValues.set(e.name, 0);
		return !0;
	}
	async step(e, t = !1) {
		let { feeds: n } = np(this.cfg.input_slots, this.deps.readSlot);
		for (let e of this.cfg.state_fields) n[`prev_${e.name}`] = this.state.get(e.name);
		n.resample_mask = {
			data: new Uint8Array([+!!e]),
			dims: [1]
		}, n.reset_mask = {
			data: new Uint8Array([+!!t]),
			dims: [1]
		}, n.rand = {
			data: this.deps.rng.randVector(this.cfg.rand_dim, this.cfg.rand_ranges),
			dims: [this.cfg.rand_dim]
		};
		let r = await this.deps.session.run(rp(this.deps.session, n));
		for (let e of this.cfg.state_fields) {
			let t = r[`next_${e.name}`];
			t && this.state.set(e.name, t);
		}
		let i = this.state.get(this.cfg.command_field);
		i && (this.command = tp(i.data)), e && this.applyWrites(r);
	}
	applyWrites(e) {
		let t = this.cfg.write_targets ?? [];
		if (t.length === 0) return;
		let n = this.context?.mjModel, r = this.context?.mjData;
		if (!n || !r) return;
		let i = {};
		for (let [t, n] of Object.entries(e)) t.startsWith("next_") || (i[t] = tp(n.data));
		Ul(n, r, t, i);
	}
	isUiEnabled() {
		return (this.cfg.ui?.inputs ?? []).some((e) => e.type === "checkbox" && e.name === "enabled") && (this.uiValues.get("enabled") ?? 0) > .5;
	}
	sampleResampleTime() {
		let e = this.cfg.resampling_time_range;
		return e ? this.deps.rng.uniform(e[0], e[1]) : Infinity;
	}
}, jp = class {
	constructor(e, t, n, r) {
		this.name = e, this.config = t, this.resetConfig = n, this.deps = r, this.state = /* @__PURE__ */ new Map(), this.queue = Promise.resolve();
		for (let e of t.state_fields) this.state.set(e.name, kp(e));
	}
	async process(e, t, n) {
		let r = await this.run(this.deps.process, this.config, { raw: {
			data: e,
			dims: [1, e.length]
		} });
		if (!r) return !1;
		let i = r.processed;
		return i ? (Mp(t, tp(i.data)), n && r.processed_from && Mp(n, tp(r.processed_from.data)), !0) : !1;
	}
	async reset() {
		this.deps.reset && this.resetConfig && await this.run(this.deps.reset, this.resetConfig, {});
	}
	getStateField(e) {
		let t = this.state.get(e);
		return t ? Float32Array.from(tp(t.data)) : null;
	}
	run(e, t, n) {
		let r = this.queue.then(() => this.runNow(e, t, n));
		return this.queue = r.catch(() => {}), r;
	}
	async runNow(e, t, n) {
		let { feeds: r, missing: i } = np(t.input_slots, this.deps.readSlot);
		if (i) return null;
		Object.assign(r, n);
		for (let e of this.config.state_fields) r[`prev_${e.name}`] = this.state.get(e.name);
		let a = t.rand_dim ?? 0;
		a > 0 && (r.rand = {
			data: this.deps.rng.randVector(a, t.rand_ranges),
			dims: [a]
		});
		let o = await e.run(rp(e, r));
		for (let e of this.config.state_fields) {
			let t = o[`next_${e.name}`];
			t && this.state.set(e.name, t);
		}
		return o;
	}
};
function Mp(e, t) {
	t.length, e.length, e.set(t.subarray(0, Math.min(t.length, e.length)));
}
//#endregion
//#region src/core/engine/resetChain.ts
async function Np(e) {
	await e.events?.onReset(e.context), e.policy?.reset(e.buildState?.()), await e.actions?.reset(), await e.commands.resetTerms();
}
//#endregion
//#region src/core/engine/stepDeadline.ts
var Pp = 250;
function Fp(e, t, n) {
	let r = e + n;
	return t - r > Pp ? t : r;
}
//#endregion
//#region src/core/engine/yieldToBrowser.ts
var Ip = [], Lp = null;
function Rp() {
	let e = new MessageChannel();
	return e.port1.onmessage = () => Ip.shift()?.(), e.port1.unref?.(), e;
}
function zp(e) {
	return new Promise((t) => {
		Ip.push(t), e.port2.postMessage(0);
	});
}
async function Bp() {
	let e = Lp ??= Rp();
	await zp(e), await zp(e);
}
//#endregion
//#region src/core/termination/TerminationBase.ts
var Vp = class {
	constructor(e, t) {
		this.runner = e, this.config = t;
	}
};
//#endregion
//#region src/core/termination/FusedTermination.ts
function Hp(e) {
	return typeof e == "object" && !!e && typeof e.fused == "string" && Array.isArray(e.lanes);
}
function Up(e, t) {
	let n = e[t];
	return typeof n == "bigint" ? n !== 0n : !!n;
}
var Wp = class {
	constructor(e, t) {
		this.config = e, this.deps = t, this.verdicts = e.lanes.map(() => !1);
	}
	get lanes() {
		return this.config.lanes;
	}
	verdict(e) {
		return this.verdicts[e] ?? !1;
	}
	reset() {
		this.verdicts = this.config.lanes.map(() => !1);
	}
	async step() {
		try {
			let { feeds: e, missing: t } = np(this.config.input_slots, this.deps.readSlot);
			if (t) return;
			let n = await this.deps.session.run(e), r = Object.values(n)[0];
			if (!r) return;
			this.verdicts = this.config.lanes.map((e, t) => Up(r.data, t));
		} catch {}
	}
}, Gp = class extends Vp {
	constructor(e, t, n, r) {
		super(e, t), this.group = n, this.lane = r;
	}
	evaluate(e) {
		return this.group.verdict(this.lane);
	}
}, Kp = class extends Vp {
	constructor(e, t, n) {
		super(e, t), this.done = !1, this.onnxConfig = t, this.deps = n;
	}
	evaluate(e) {
		return this.done;
	}
	reset() {
		this.done = !1;
	}
	async step() {
		try {
			let { feeds: e, missing: t } = np(this.onnxConfig.input_slots, this.deps.readSlot);
			if (t) return;
			let n = await this.deps.session.run(e), r = Object.values(n)[0];
			if (!r) return;
			this.done = qp(r.data);
		} catch {}
	}
};
function qp(e) {
	for (let t = 0; t < e.length; t++) if (Number(e[t]) !== 0) return !0;
	return !1;
}
//#endregion
//#region src/core/termination/TimeOutTermination.ts
var Jp = class extends Vp {
	constructor(e, t, n, r) {
		super(e, t), this.episodeLength = n;
		let i = t.episode_length_s ?? 0;
		this.maxEpisodeLength = i > 0 && r > 0 ? Math.ceil(i / r) : Infinity;
	}
	evaluate(e) {
		return this.episodeLength() >= this.maxEpisodeLength;
	}
};
//#endregion
//#region src/core/termination/TerminationManager.ts
function Yp(e) {
	return typeof e.onnx == "string";
}
function Xp(e) {
	return typeof e.native == "string";
}
var Zp = class {
	constructor(e, t, n, r = {}) {
		this.terms = [], this.graphs = [];
		for (let [i, a] of Object.entries(e)) {
			if (Hp(a)) {
				this.addFusedGroup(a, n, r);
				continue;
			}
			if (Yp(a)) {
				let e = this.buildOnnxTermination(i, a, n, r);
				e && (this.graphs.push(e), this.terms.push({
					name: i,
					term: e,
					isTimeOut: a.time_out ?? !1
				}));
				continue;
			}
			if (Xp(a)) {
				this.terms.push({
					name: i,
					term: new Jp(n, {
						...a,
						name: i
					}, r.episodeLength ?? (() => 0), r.stepDt ?? 0),
					isTimeOut: a.time_out ?? !1
				});
				continue;
			}
			let e = t[a.name];
			if (!e) throw Error(`Unknown termination type: ${a.name}`);
			let o = {
				name: a.name,
				params: a.params,
				time_out: a.time_out
			};
			this.terms.push({
				name: i,
				term: new e(n, o),
				isTimeOut: a.time_out ?? !1
			});
		}
	}
	addFusedGroup(e, t, n) {
		let r = n.onnxSessions?.get(e.fused), i = n.readOnnxSlot;
		if (!r || !i) return;
		let a = new Wp(e, {
			session: r,
			readSlot: i
		});
		this.graphs.push(a), e.lanes.forEach((e, n) => {
			this.terms.push({
				name: e.name,
				term: new Gp(t, { name: e.name }, a, n),
				isTimeOut: e.time_out ?? !1
			});
		});
	}
	buildOnnxTermination(e, t, n, r) {
		let i = r.onnxSessions?.get(t.onnx), a = r.readOnnxSlot;
		return !i || !a ? null : new Kp(n, {
			...t,
			name: e
		}, {
			session: i,
			readSlot: a
		});
	}
	async evaluate(e) {
		await Promise.all(this.graphs.map((e) => e.step()));
		let t = !1, n = !1, r = [];
		for (let { name: i, term: a, isTimeOut: o } of this.terms) a.evaluate(e) && (r.push(i), o ? n = !0 : t = !0);
		return {
			done: t || n,
			terminated: t,
			truncated: n,
			reasons: r
		};
	}
	reset() {
		for (let e of this.graphs) e.reset();
		for (let { term: e } of this.terms) e.reset?.();
	}
	get size() {
		return this.terms.length;
	}
}, Qp = class {
	constructor(e, t) {
		this.runner = e, this.config = t;
	}
};
//#endregion
//#region src/core/observation/pipeline.ts
function $p(e, t) {
	let { clip: n, scale: r } = t;
	if (n) {
		let [t, r] = n;
		for (let n = 0; n < e.length; n++) e[n] = Math.min(r, Math.max(t, e[n]));
	}
	if (typeof r == "number") for (let t = 0; t < e.length; t++) e[t] *= r;
	else if (Array.isArray(r)) for (let t = 0; t < e.length && t < r.length; t++) e[t] *= r[t];
	return e;
}
function em(e, t) {
	if (e.length === t) return e;
	let n = new Float32Array(t);
	return n.set(e.subarray(0, Math.min(e.length, t))), n;
}
//#endregion
//#region src/core/observation/NativeObservation.ts
function tm(e) {
	let t = e.native;
	return t === "prev_action" || t === "command" || t === "constant";
}
function nm(e, t) {
	let n = t.action_offset;
	return n === void 0 ? e : e.subarray(n, n + (t.size ?? e.length - n));
}
function rm(e, t, n) {
	if (!n) throw Error(`Observation term "${t}" is native:"command" but carries no command_name, so there is nothing to read. The build always emits one (mjlab takes it as a required param), which makes this a malformed config rather than a scene without commands.`);
	let r = e.getContext()?.commandManager;
	if (!r) return;
	let i = r.termNames();
	if (!i.includes(n)) throw Error(`Observation term "${t}" reads the command "${n}", which this scene does not define. Available: ${i.length ? i.join(", ") : "(none)"}. Unchecked, this feeds the policy a zero block of the declared width — a silently wrong input vector — so the scene fails to load instead. A command slot the scene deliberately does not drive belongs as native:"constant".`);
}
var im = class extends Qp {
	constructor(e, t) {
		super(e, t), t.native === "command" && rm(e, t.name, t.command_name), this.constant = t.native === "constant" ? Float32Array.from(t.value ?? []) : null, this.cachedSize = t.size ?? this.constant?.length ?? null;
	}
	get size() {
		return this.cachedSize === null && (this.cachedSize = this.read().length), this.cachedSize;
	}
	compute(e) {
		let t = this.read();
		return $p(em(Float32Array.from(t), this.size), this.config);
	}
	read() {
		switch (this.config.native) {
			case "constant": return this.constant ?? /* @__PURE__ */ new Float32Array();
			case "prev_action": return nm(this.runner.getLastActions(), this.config);
			case "command": {
				let e = this.config.command_name, t = this.runner.getContext()?.commandManager;
				return !e || !t ? new Float32Array(this.cachedSize ?? 0) : t.getCommand(e);
			}
		}
	}
};
//#endregion
//#region src/core/observation/FusedObservation.ts
function am(e) {
	return typeof e == "object" && !!e && typeof e.fused == "string";
}
var om = class extends Qp {
	constructor(e, t, n) {
		super(e, t);
		for (let n of t.native_inputs ?? []) n.native === "command" && rm(e, `${t.name}.${n.name}`, n.command_name);
		for (let n of t.input_slots ?? []) n.command && rm(e, t.name, n.command);
		this.deps = n, this.last = new Float32Array(t.size);
	}
	get size() {
		return this.config.size;
	}
	async compute(e) {
		let { feeds: t, missing: n } = np(this.config.input_slots, this.deps.readSlot);
		if (n) return this.last;
		for (let e of this.config.native_inputs ?? []) {
			let n = this.readNative(e);
			t[e.input] = {
				data: n,
				dims: [1, n.length]
			};
		}
		let r = await this.deps.session.run(t), i = Object.values(r)[0];
		return i && (this.last = em(Float32Array.from(i.data), this.size)), this.last;
	}
	readNative(e) {
		let t = e.native === "prev_action" ? nm(this.runner.getLastActions(), e) : this.readCommand(e);
		return em(Float32Array.from(t), e.size);
	}
	readCommand(e) {
		let t = this.runner.getContext()?.commandManager;
		return !t || !e.command_name ? new Float32Array(e.size) : t.getCommand(e.command_name);
	}
};
//#endregion
//#region src/core/observation/HistoryObservation.ts
function sm(e, t, n, r, i) {
	for (let a = 0; a < n; a++) e[a * i + r] = t[a];
}
function cm(e) {
	let t = e.history_offsets;
	if (Array.isArray(t)) {
		let e = t.map((e) => Math.max(0, Math.trunc(Number(e) || 0)));
		return e.length > 0 ? e : null;
	}
	let n = Math.trunc(Number(e.history_length) || 0);
	return n <= 1 ? null : Array.from({ length: n }, (e, t) => n - 1 - t);
}
var lm = class extends Qp {
	constructor(e, t, n, r) {
		super(e, t), this.needsPrime = !0, this.base = n, this.offsets = r, this.interleaved = !!t.history_interleaved, this.frames = Array.from({ length: Math.max(...r) + 1 }, () => new Float32Array(n.size));
	}
	get size() {
		return this.base.size * this.offsets.length;
	}
	reset(e) {
		this.base.reset?.(e), this.needsPrime = !0;
	}
	update(e) {
		this.base.update?.(e);
	}
	preload() {
		return this.base.preload?.() ?? Promise.resolve();
	}
	async compute(e) {
		let t = Float32Array.from(await this.base.compute(e));
		if (this.needsPrime) {
			for (let e of this.frames) e.set(t.subarray(0, e.length));
			this.needsPrime = !1;
		} else {
			let e = this.frames.pop();
			e && (e.set(t.subarray(0, e.length)), this.frames.unshift(e));
		}
		return this.gather();
	}
	gather() {
		let e = this.base.size, t = new Float32Array(e * this.offsets.length);
		for (let n = 0; n < this.offsets.length; n++) {
			let r = this.frames[Math.min(this.offsets[n], this.frames.length - 1)];
			r && (this.interleaved ? sm(t, r, e, n, this.offsets.length) : t.set(r.subarray(0, e), n * e));
		}
		return t;
	}
};
//#endregion
//#region src/core/observation/OnnxObservation.ts
function um(e) {
	return typeof e.onnx == "string";
}
var dm = class extends Qp {
	constructor(e, t, n) {
		super(e, t);
		for (let n of t.input_slots ?? []) n.command && rm(e, t.name, n.command);
		this.deps = n, this.last = new Float32Array(t.size);
	}
	get size() {
		return this.config.size;
	}
	async compute(e) {
		let { feeds: t, missing: n } = np(this.config.input_slots, this.deps.readSlot);
		if (n) return this.last;
		let r = await this.deps.session.run(t), i = Object.values(r)[0];
		if (!i) return this.last;
		let a = tp(i.data);
		return this.last = $p(em(a, this.config.size), this.config), this.last;
	}
};
//#endregion
//#region src/core/utils/bytes.ts
function fm(e) {
	return typeof e == "function" ? e() : Promise.resolve(e);
}
//#endregion
//#region src/core/policy/PolicyRunner.ts
function pm(e, t, n) {
	let r = new Float32Array(e.length);
	for (let i = 0; i < n; i++) sm(r, e.subarray(i * t, (i + 1) * t), t, i, n);
	return r;
}
var mm = class {
	constructor(e, t = {}) {
		this.historyNeedsPrime = {}, this.motionCache = /* @__PURE__ */ new Map(), this.config = e, this.options = t, this.policyModule = null, this.obsGroups = {}, this.obsLayouts = {}, this.obsSizes = {}, this.historyConfig = {}, this.historyBuffers = {}, this.historyNeedsPrime = {}, this.defaultObsKey = null, this.context = null, this.policyJointNames = (e.policy_joint_names ?? []).slice(), this.numActions = e.policy_num_actions ?? this.policyJointNames.length, this.lastActions = new Float32Array(this.numActions), this.defaultJointPos = this.normalizeArray(e.default_joint_pos ?? [], this.numActions, 0), this.encoderBias = this.normalizeArray(e.encoder_bias ?? [], this.numActions, 0);
	}
	async init(e) {
		this.context = e, this.policyModule = await this.buildPolicyModule(e), this.buildObservationGroups();
	}
	reset(e) {
		this.lastActions.fill(0), this.policyModule?.reset();
		for (let t of Object.values(this.obsGroups)) for (let n of t) n.reset && n.reset(e);
		if (e) for (let [e, t] of Object.entries(this.historyConfig)) t.steps > 1 && (this.historyNeedsPrime[e] = !0);
	}
	update(e) {
		this.policyModule?.update();
		for (let t of Object.values(this.obsGroups)) for (let n of t) n.update && n.update(e);
	}
	async collectObservationsByKey(e) {
		this.update(e);
		let t = {};
		for (let [n, r] of Object.entries(this.obsGroups)) {
			let i = this.historyConfig[n];
			if (i && i.steps > 1) {
				let a = await this.buildFrame(r, e), o = this.historyBuffers[n];
				if (this.historyNeedsPrime[n]) {
					for (let e = 0; e < i.steps; e++) o.set(a, e * a.length);
					delete this.historyNeedsPrime[n];
				} else o.copyWithin(0, a.length), o.set(a, o.length - a.length);
				t[n] = i.interleaved ? pm(o, a.length, i.steps) : new Float32Array(o);
			} else t[n] = await this.buildFrame(r, e);
		}
		return t;
	}
	async collectObservations(e) {
		let t = await this.collectObservationsByKey(e);
		if (this.defaultObsKey && t[this.defaultObsKey]) return t[this.defaultObsKey];
		let n = Object.keys(t)[0];
		return n ? t[n] : /* @__PURE__ */ new Float32Array();
	}
	async preloadAll() {
		let e = [];
		for (let t of Object.values(this.obsGroups)) for (let n of t) typeof n.preload == "function" && e.push(n.preload());
		await Promise.all(e);
	}
	getObservationSize() {
		if (this.defaultObsKey && this.obsSizes[this.defaultObsKey] !== void 0) return this.obsSizes[this.defaultObsKey];
		let e = Object.keys(this.obsSizes)[0];
		return e ? this.obsSizes[e] : 0;
	}
	getObservationLayout() {
		if (this.defaultObsKey && this.obsLayouts[this.defaultObsKey]) return this.obsLayouts[this.defaultObsKey].map((e) => ({ ...e }));
		let e = Object.keys(this.obsLayouts)[0];
		return e ? this.obsLayouts[e].map((e) => ({ ...e })) : [];
	}
	getPolicyModuleContext() {
		return this.policyModule?.getContext() ?? {};
	}
	getPolicyModule() {
		return this.policyModule;
	}
	getContext() {
		return this.context;
	}
	getPolicyJointNames() {
		return this.policyJointNames.slice();
	}
	getNumActions() {
		return this.numActions;
	}
	getDefaultJointPos() {
		return new Float32Array(this.defaultJointPos);
	}
	getEncoderBias() {
		return new Float32Array(this.encoderBias);
	}
	getLastActions() {
		return new Float32Array(this.lastActions);
	}
	getConfig() {
		return this.config;
	}
	getMotionData(e) {
		let t = this.motionCache.get(e);
		if (t) return t;
		let n = this.options.motions?.find((t) => t.name === e), r = n ? fm(n.data) : Promise.resolve(null);
		return this.motionCache.set(e, r), r;
	}
	setLastActions(e) {
		e.length === this.lastActions.length ? this.lastActions.set(e) : this.lastActions = new Float32Array(e);
	}
	async buildPolicyModule(e) {
		let t = this.options.policyModules ?? {}, n = this.config.policy_module, r = n ? t[n] : t.default;
		if (n && !r) throw Error(`Unknown policy module: ${n}`);
		if (!r) return null;
		let i = new r(this.config);
		return await i.init(e), i;
	}
	buildObservationGroups() {
		let e = this.options.observations ?? {}, t = this.config.observations ?? {};
		this.obsGroups = {}, this.obsLayouts = {}, this.obsSizes = {}, this.historyConfig = {}, this.historyBuffers = {}, this.historyNeedsPrime = {}, this.defaultObsKey = null;
		let n = (t) => {
			if (um(t)) return this.buildOnnxObservation(t);
			if (tm(t)) return new im(this, t);
			let n = e[t.name];
			if (!n) throw Error(`Unknown observation type: ${t.name}`);
			return new n(this, t);
		}, r = (e) => {
			let t = n(e), r = um(e) || tm(e) ? cm(e) : null;
			return r ? new lm(this, e, t, r) : t;
		};
		for (let [e, n] of Object.entries(t)) if (am(n)) {
			let t = this.buildFusedObservation(e, n);
			this.registerGroup(e, [t], [{ name: e }], void 0, n.layout);
		} else if (Array.isArray(n)) {
			let t = n.map(r);
			this.registerGroup(e, t, n);
		} else if (n && typeof n == "object") {
			let t = n;
			if (Array.isArray(t.components)) {
				let n = t.components.map((e) => r({
					...e,
					history_steps: 1
				})), i = Math.max(1, Math.floor(t.history_steps ?? 1)), a = !!t.interleaved;
				this.registerGroup(e, n, t.components, {
					steps: i,
					interleaved: a
				});
			}
		}
		this.defaultObsKey = this.obsGroups.actor ? "actor" : Object.keys(this.obsGroups)[0] ?? null;
	}
	buildOnnxObservation(e) {
		let t = this.options.onnxSessions?.get(e.onnx), n = this.options.readOnnxSlot;
		if (!t || !n) throw Error(`Observation "${e.name}" needs the ONNX session "${e.onnx}" and a slot reader; pass onnxSessions/readOnnxSlot in PolicyRunnerOptions.`);
		return new dm(this, e, {
			session: t,
			readSlot: n
		});
	}
	buildFusedObservation(e, t) {
		let n = this.options.onnxSessions?.get(t.fused), r = this.options.readOnnxSlot;
		if (!n || !r) throw Error(`Observation group "${e}" needs the ONNX session "${t.fused}" and a slot reader; pass onnxSessions/readOnnxSlot in PolicyRunnerOptions.`);
		return new om(this, {
			...t,
			name: e
		}, {
			session: n,
			readSlot: r
		});
	}
	registerGroup(e, t, n, r, i) {
		this.obsGroups[e] = t, this.obsLayouts[e] = i ? i.map((e) => ({ ...e })) : t.map((e, t) => ({
			name: n[t]?.name ?? `obs_${t}`,
			size: e.size
		}));
		let a = this.obsLayouts[e].reduce((e, t) => e + t.size, 0);
		r && r.steps > 1 ? (this.historyConfig[e] = r, this.historyBuffers[e] = new Float32Array(a * r.steps), this.obsSizes[e] = a * r.steps) : this.obsSizes[e] = a;
	}
	async buildFrame(e, t) {
		let n = await Promise.all(e.map(async (e) => {
			let n = await e.compute(t), r = n instanceof Float32Array ? n : Float32Array.from(n);
			if (r.length !== e.size) throw Error(`Observation size mismatch: expected ${e.size}, got ${r.length}`);
			return r;
		})), r = n.reduce((e, t) => e + t.length, 0), i = new Float32Array(r), a = 0;
		for (let e of n) i.set(e, a), a += e.length;
		return i;
	}
	normalizeArray(e, t, n) {
		let r = new Float32Array(t);
		for (let i = 0; i < t; i++) r[i] = typeof e[i] == "number" ? e[i] : n;
		return r;
	}
}, hm = {
	in_keys: ["actor"],
	out_keys: ["action"]
}, gm = hm.in_keys, _m = hm.out_keys, vm = [1, 128], ym = class {
	constructor(e, t) {
		this.bytes = e, this.session = null;
		let n = t?.in_keys ?? [...gm], r = t?.out_keys ?? [..._m];
		this.configuredInKeys = n.map((e) => Array.isArray(e) ? e.join(",") : e), this.inKeys = [...this.configuredInKeys], this.outKeys = r.map((e) => Array.isArray(e) ? e.join(",") : e), this.isRecurrent = this.inKeys.includes("adapt_hx");
	}
	async init() {
		this.session = await Yu.create(this.bytes, {
			executionProviders: ["wasm"],
			graphOptimizationLevel: "all"
		}), this.inferInputKeys(), this.isRecurrent = this.inKeys.includes("adapt_hx");
	}
	initInput() {
		let e = {};
		if (this.isRecurrent) {
			let t = this.carryShape();
			e.is_init = new Ru("bool", [!0], [1]), e.adapt_hx = new Ru("float32", new Float32Array(t.reduce((e, t) => e * t, 1)), t);
		}
		return this.inKeys.includes("time_step") && (e.time_step = new Ru("float32", new Float32Array([0]), [1, 1])), e;
	}
	carryShape() {
		let e = this.inKeys.indexOf("adapt_hx"), t = e >= 0 ? this.session?.inputMetadata?.[e] : void 0;
		if (!t?.isTensor || t.shape.length === 0) return [...vm];
		let n = t.shape.map((e) => typeof e == "number" && e > 0 ? e : 1), r = t.shape[t.shape.length - 1];
		return (typeof r != "number" || r <= 0) && (n[n.length - 1] = vm[1]), n;
	}
	async runInference(e) {
		if (!this.session) throw Error("OnnxModule not initialized.");
		let t = {};
		for (let n = 0; n < this.inKeys.length; n++) {
			let r = this.inKeys[n], i = this.session.inputNames[n];
			if (!i || !e[r]) throw Error(`Missing ONNX input for key: ${r}`);
			t[i] = e[r];
		}
		let n = this.session, r = await Qf(() => n.run(t)), i = {};
		for (let e = 0; e < this.outKeys.length; e++) {
			let t = this.outKeys[e], a = n.outputNames[e];
			a && r[a] && (i[t] = r[a]);
		}
		let a = {};
		return this.isRecurrent && i["next,adapt_hx"] && (a.is_init = new Ru("bool", [!1], [1]), a.adapt_hx = i["next,adapt_hx"]), [i, a];
	}
	async dispose() {
		let e = this.session;
		this.session = null, e && await Qf(async () => {
			try {
				await e.release();
			} catch {}
		});
	}
	inferInputKeys() {
		if (!this.session) return;
		let e = this.session.inputNames;
		this.inKeys = e.length <= 1 || this.configuredInKeys.length === e.length ? [...this.configuredInKeys] : [...e];
	}
}, bm = class e {
	constructor(e, t, n, r) {
		this.mujoco = e, this.mjModel = t, this.mjData = n;
		let i = this.getJointNames(t);
		this.qposAdr = [], this.qvelAdr = [], this.jointIndices = [], this.ctrlAdr = null;
		for (let e of r) {
			let n = i.indexOf(e);
			if (n < 0) throw Error(`Joint "${e}" not found in MuJoCo model`);
			this.qposAdr.push(t.jnt_qposadr[n]), this.qvelAdr.push(t.jnt_dofadr[n]), this.jointIndices.push(n);
		}
		this.numActions = r.length, this.ctrlAdr = this.buildCtrlAdr();
	}
	build() {
		let e = this.mjData.qpos, t = this.mjData.qvel, n = new Float32Array(this.numActions), r = new Float32Array(this.numActions);
		for (let i = 0; i < this.numActions; i++) n[i] = e[this.qposAdr[i]], r[i] = t[this.qvelAdr[i]];
		return {
			jointPos: n,
			jointVel: r,
			rootPos: new Float32Array([
				e[0],
				e[1],
				e[2]
			]),
			rootQuat: new Float32Array([
				e[3],
				e[4],
				e[5],
				e[6]
			]),
			rootLinVel: new Float32Array([
				t[0],
				t[1],
				t[2]
			]),
			rootAngVel: new Float32Array([
				t[3],
				t[4],
				t[5]
			])
		};
	}
	getControlMapping() {
		return this.ctrlAdr ? {
			ctrlAdr: this.ctrlAdr.slice(),
			qposAdr: this.qposAdr.slice(),
			qvelAdr: this.qvelAdr.slice()
		} : null;
	}
	getControlMappingFor(e, t) {
		if (!this.ctrlAdr) return null;
		let n = e.map((e) => RegExp(`^(?:${e})$`)), r = (e) => n.some((t) => t.test(e)), i = [], a = [], o = [], s = [];
		for (let e = 0; e < t.length; e++) r(t[e]) && (i.push(this.ctrlAdr[e]), a.push(this.qposAdr[e]), o.push(this.qvelAdr[e]), s.push(e));
		return i.length === 0 ? null : {
			ctrlAdr: i,
			qposAdr: a,
			qvelAdr: o,
			actionIndices: s
		};
	}
	getModelControlMappingFor(t) {
		let n = t.map((e) => RegExp(`^(?:${e})$`)), r = this.mujoco.mjtTrn?.mjTRN_JOINT?.value, i = /* @__PURE__ */ new Set();
		for (let e = 0; e < this.mjModel.nu; e++) (r === void 0 || this.mjModel.actuator_trntype[e] === r) && i.add(this.mjModel.actuator_trnid[2 * e]);
		let a = this.getJointNames(this.mjModel).filter((e, t) => i.has(t) && n.some((t) => t.test(e)));
		if (a.length === 0) return null;
		let o = new e(this.mujoco, this.mjModel, this.mjData, a).getControlMapping();
		return o && {
			...o,
			actionIndices: a.map((e, t) => t),
			jointNames: a
		};
	}
	getCtrlMappingByActuatorNames(e) {
		let t = this.getActuatorNames(this.mjModel), n = e.map((e) => RegExp(`^(?:${e})$`)), r = (e) => n.some((t) => t.test(e)), i = [], a = [];
		for (let e = 0; e < t.length; e++) r(t[e]) && (i.push(e), a.push(i.length - 1));
		return i.length > 0 ? {
			ctrlAdr: i,
			actionIndices: a
		} : null;
	}
	getActuatorNames(e) {
		let t = new Uint8Array(e.names), n = new TextDecoder(), r = [];
		for (let i = 0; i < e.nu; i++) {
			let a = e.name_actuatoradr[i], o = a;
			for (; o < t.length && t[o] !== 0;) o++;
			r.push(n.decode(t.subarray(a, o)));
		}
		return r;
	}
	buildCtrlAdr() {
		if (this.mjModel.nu <= 0) return null;
		let e = this.mujoco.mjtTrn?.mjTRN_JOINT?.value, t = [];
		for (let n = 0; n < this.mjModel.nu; n++) {
			let r = this.mjModel.actuator_trntype[n];
			e === void 0 || r === e ? t.push(this.mjModel.actuator_trnid[2 * n]) : t.push(-1);
		}
		let n = [];
		for (let e of this.jointIndices) {
			let r = t.findIndex((t) => t === e);
			if (r < 0) return null;
			n.push(r);
		}
		return n;
	}
	getJointNames(e) {
		let t = new Uint8Array(e.names), n = new TextDecoder(), r = [];
		for (let i = 0; i < e.njnt; i++) {
			let a = e.name_jntadr[i], o = a;
			for (; o < t.length && t[o] !== 0;) o++;
			let s = n.decode(t.subarray(a, o));
			!s && i === 0 && (s = "floating_base_joint"), r.push(s);
		}
		return r;
	}
}, xm = class {
	constructor(e) {
		this.config = e, this.context = null;
	}
	init(e) {
		this.context = e;
	}
	reset() {}
	update() {}
	getContext() {
		return {};
	}
}, Sm = class {
	constructor(e) {
		this.policyJointNames = (e.policy_joint_names ?? []).slice(), this.datasetJointNames = (e.dataset_joint_names ?? []).slice(), this.nJoints = this.datasetJointNames.length || this.policyJointNames.length || 0, this.refJointPos = [], this.refRootPos = [], this.refRootQuat = [], this.refIdx = 0, this.refLen = 0, this.currentName = "default", this.currentDone = !0;
	}
	reset(e) {
		let t = e?.jointPos ?? new Float32Array(this.nJoints), n = e?.rootPos ?? new Float32Array([
			0,
			0,
			0
		]), r = e?.rootQuat ?? new Float32Array([
			1,
			0,
			0,
			0
		]);
		this.refJointPos = [Float32Array.from(t)], this.refRootPos = [Float32Array.from(n)], this.refRootQuat = [Float32Array.from(r)], this.refIdx = 0, this.refLen = 1, this.currentDone = !0, this.currentName = "default";
	}
	advance() {
		this.refLen <= 1 || this.refIdx < this.refLen - 1 && (this.refIdx += 1, this.refIdx === this.refLen - 1 && (this.currentDone = !0));
	}
	isReady() {
		return this.refLen > 0;
	}
}, Cm = class extends xm {
	constructor(e) {
		super(e), this.tracking = null;
	}
	async init(e) {
		await super.init(e);
		let t = this.config.policy_joint_names ?? [], n = {
			...this.config.tracking,
			policy_joint_names: t
		};
		this.tracking = new Sm(n);
	}
	reset(e) {
		this.tracking?.reset(e);
	}
	update() {
		this.tracking?.advance();
	}
	getContext() {
		return { tracking: this.tracking };
	}
}, wm = class {
	constructor(e) {
		this.policyJointNames = (e.policy_joint_names ?? []).slice(), this.datasetJointNames = (e.dataset_joint_names ?? []).slice(), this.nJoints = this.datasetJointNames.length || this.policyJointNames.length || 0, this.refJointPos = [], this.refRootPos = [], this.refRootQuat = [], this.refIdx = 0, this.refLen = 0, this.currentName = "default", this.currentDone = !0;
	}
	reset(e) {
		let t = e?.jointPos ?? new Float32Array(this.nJoints), n = e?.rootPos ?? new Float32Array([
			0,
			0,
			0
		]), r = e?.rootQuat ?? new Float32Array([
			1,
			0,
			0,
			0
		]);
		this.refJointPos = [Float32Array.from(t)], this.refRootPos = [Float32Array.from(n)], this.refRootQuat = [Float32Array.from(r)], this.refIdx = 0, this.refLen = 1, this.currentDone = !0, this.currentName = "default";
	}
	advance() {
		this.refLen <= 1 || this.refIdx < this.refLen - 1 && (this.refIdx += 1, this.refIdx === this.refLen - 1 && (this.currentDone = !0));
	}
	isReady() {
		return this.refLen > 0;
	}
}, Tm = class extends xm {
	constructor(e) {
		super(e), this.locomotion = null;
	}
	async init(e) {
		await super.init(e);
		let t = this.config.policy_joint_names ?? [], n = {
			...this.config.tracking,
			policy_joint_names: t
		};
		this.locomotion = new wm(n);
	}
	reset(e) {
		this.locomotion?.reset(e);
	}
	update() {
		this.locomotion?.advance();
	}
	getContext() {
		return { tracking: this.locomotion };
	}
};
//#endregion
//#region src/core/scene/npz.ts
async function Em(e) {
	let t = new DecompressionStream("deflate-raw"), n = t.writable.getWriter(), r = t.readable.getReader();
	n.write(e), n.close();
	let i = [], a = 0;
	for (;;) {
		let { done: e, value: t } = await r.read();
		if (e) break;
		i.push(t), a += t.byteLength;
	}
	let o = new Uint8Array(a), s = 0;
	for (let e of i) o.set(e, s), s += e.byteLength;
	return o;
}
function Dm(e) {
	let t = [
		147,
		78,
		85,
		77,
		80,
		89
	];
	for (let n = 0; n < t.length; n++) if (e[n] !== t[n]) throw Error("Invalid .npy magic number");
	let n = e[6], r, i;
	n === 1 ? (r = e[8] | e[9] << 8, i = 10) : (r = e[8] | e[9] << 8 | e[10] << 16 | e[11] << 24, i = 12);
	let a = e.slice(i, i + r), o = new TextDecoder().decode(a), s = o.match(/'descr'\s*:\s*'([^']+)'/), c = o.match(/'shape'\s*:\s*\(([^)]*)\)/), l = o.match(/'fortran_order'\s*:\s*(True|False)/);
	if (!s || !c) throw Error(`Cannot parse .npy header: ${o}`);
	let u = s[1];
	if (l && l[1] === "True") throw Error("Fortran-ordered arrays not supported");
	let d = c[1].split(",").map((e) => e.trim()).filter((e) => e.length > 0).map((e) => parseInt(e, 10)), f = i + r, p = e.slice(f), m = u[0], h = u.slice(1), g = m === ">" || m === "=" && !km(), _;
	if (h === "f4") _ = new Float32Array(p.buffer, p.byteOffset, p.byteLength / 4), g && (_ = Am(_));
	else if (h === "f8") {
		let e = new Float64Array(p.buffer, p.byteOffset, p.byteLength / 8);
		g && (e = jm(e)), _ = new Float32Array(e.length);
		for (let t = 0; t < e.length; t++) _[t] = e[t];
	} else if (h === "i4") {
		let e = new Int32Array(p.buffer, p.byteOffset, p.byteLength / 4);
		g && (e = Mm(e)), _ = new Float32Array(e.length);
		for (let t = 0; t < e.length; t++) _[t] = e[t];
	} else if (h === "i8") {
		let e = new BigInt64Array(p.buffer, p.byteOffset, p.byteLength / 8);
		g && (e = Nm(e)), _ = new Float32Array(e.length);
		for (let t = 0; t < e.length; t++) _[t] = Number(e[t]);
	} else {
		let e = u.match(/^S(\d+)$/);
		if (e) {
			let t = parseInt(e[1], 10), n = p.length / t, r = d.reduce((e, t) => e * t, 1);
			if (n !== r) throw Error(`npz: byte-string array size mismatch (shape ${d} expects ${r} elements, got ${n})`);
			let i = new TextDecoder("utf-8"), a = [];
			for (let e = 0; e < n; e++) {
				let n = p.slice(e * t, (e + 1) * t), r = n.indexOf(0);
				a.push(i.decode(r >= 0 ? n.slice(0, r) : n));
			}
			return {
				shape: d,
				data: /* @__PURE__ */ new Float32Array(),
				strings: a
			};
		}
		let t = h.match(/^U(\d+)$/);
		if (t) {
			let e = parseInt(t[1], 10), n = e * 4, r = p.length / n, i = d.reduce((e, t) => e * t, 1);
			if (r !== i) throw Error(`npz: unicode array size mismatch (shape ${d} expects ${i} elements, got ${r})`);
			let a = new DataView(p.buffer, p.byteOffset, p.byteLength), o = !g, s = [];
			for (let t = 0; t < r; t++) {
				let r = [];
				for (let i = 0; i < e; i++) {
					let e = a.getUint32(t * n + i * 4, o);
					if (e === 0) break;
					r.push(e);
				}
				s.push(String.fromCodePoint(...r));
			}
			return {
				shape: d,
				data: /* @__PURE__ */ new Float32Array(),
				strings: s
			};
		}
		throw Error(h === "O" ? Om : `Unsupported numpy dtype: ${u}`);
	}
	return {
		shape: d,
		data: _
	};
}
var Om = "npz: pickled python objects (|O dtype) cannot be loaded in the browser";
function km() {
	let e = /* @__PURE__ */ new ArrayBuffer(2);
	return new DataView(e).setInt16(0, 1, !0), new Int16Array(e)[0] === 1;
}
function Am(e) {
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = new Float32Array(e.length);
	for (let r = 0; r < e.length; r++) n[r] = t.getFloat32(r * 4, !0);
	return n;
}
function jm(e) {
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = new Float64Array(e.length);
	for (let r = 0; r < e.length; r++) n[r] = t.getFloat64(r * 8, !0);
	return n;
}
function Mm(e) {
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = new Int32Array(e.length);
	for (let r = 0; r < e.length; r++) n[r] = t.getInt32(r * 4, !0);
	return n;
}
function Nm(e) {
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = new BigInt64Array(e.length);
	for (let r = 0; r < e.length; r++) n[r] = t.getBigInt64(r * 8, !0);
	return n;
}
async function Pm(e) {
	let t = new Uint8Array(e), n = {}, r = 0;
	for (; r + 30 <= t.length && t[r] === 80 && t[r + 1] === 75 && t[r + 2] === 3 && t[r + 3] === 4;) {
		let e = t[r + 8] | t[r + 9] << 8, i = (t[r + 22] | t[r + 23] << 8 | t[r + 24] << 16 | t[r + 25] << 24) >>> 0, a = (t[r + 18] | t[r + 19] << 8 | t[r + 20] << 16 | t[r + 21] << 24) >>> 0, o = t[r + 26] | t[r + 27] << 8, s = t[r + 28] | t[r + 29] << 8, c = t.slice(r + 30, r + 30 + o), l = new TextDecoder().decode(c);
		if (a === 4294967295 || i === 4294967295) {
			let e = r + 30 + o, n = e;
			for (; n + 4 <= e + s;) {
				let e = t[n] | t[n + 1] << 8, r = t[n + 2] | t[n + 3] << 8;
				if (e === 1) {
					let e = n + 4;
					if (i === 4294967295 && e + 8 <= n + 4 + r && (e += 8), a === 4294967295 && e + 8 <= n + 4 + r) {
						let n = (t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24) >>> 0;
						a = ((t[e + 4] | t[e + 5] << 8 | t[e + 6] << 16 | t[e + 7] << 24) >>> 0) * 4294967296 + n;
					}
					break;
				}
				n += 4 + r;
			}
		}
		let u = r + 30 + o + s, d = t.slice(u, u + a);
		if (r = u + a, l.endsWith("/")) continue;
		l.endsWith(".npy") && (l = l.slice(0, -4));
		let f;
		if (e === 0) f = d;
		else if (e === 8) f = await Em(d);
		else continue;
		try {
			n[l] = Dm(f);
		} catch (e) {
			e instanceof Error && e.message;
		}
	}
	return n;
}
//#endregion
//#region src/core/onnx/slotReader/indexing.ts
var Fm = [
	7,
	4,
	1,
	1
], Im = [
	6,
	3,
	1,
	1
], Lm = 0;
function Rm(e, t, n) {
	let r = new Uint8Array(e.names), i = new TextDecoder(), a = [];
	for (let e = 0; e < t; e++) {
		let t = n[e], o = t;
		for (; o < r.length && r[o] !== 0;) o++;
		a.push(i.decode(r.subarray(t, o)));
	}
	return a;
}
function zm(e, t, n) {
	let r = e.map((e, t) => t);
	if (!t || !n) return r;
	let i = `${t}/`;
	return r.filter((t) => e[t].startsWith(i));
}
function Bm(e, t, n, r, i, a) {
	let o = e.map((e, t) => t);
	if (!r || !i) return o;
	let s = `${r}/`;
	return o.filter((r) => {
		if (e[r].startsWith(s)) return !0;
		let i = t?.[r] ?? -1;
		return n.has(i) || a && i === 0;
	});
}
function Vm(e) {
	let t = e.lastIndexOf("/");
	return t < 0 ? e : e.slice(t + 1);
}
function Hm(e, t, n) {
	return !t || !n ? [] : Rm(e, t, n);
}
function Um(e, t, n) {
	let r = Rm(e, e.njnt, e.name_jntadr), i = Rm(e, e.nbody, e.name_bodyadr), a = Hm(e, e.nsite, e.name_siteadr), o = Hm(e, e.ngeom, e.name_geomadr), s = Hm(e, e.ntendon, e.name_tendonadr), c = Hm(e, e.nu, e.name_actuatoradr), l = new Set([
		...r,
		...i,
		...a
	].filter((e) => e.includes("/")).map((e) => e.slice(0, e.indexOf("/")))), u = l.size > 0, d = l.size === 1 && l.has(t ?? ""), f = [], p = [], m = [];
	for (let i of zm(r, t, u)) {
		let t = e.jnt_type[i];
		if (t === Lm) continue;
		let a = Fm[t] ?? 1, o = Im[t] ?? 1, s = n?.(Vm(r[i])) ?? 0;
		for (let t = 0; t < a; t++) f.push(e.jnt_qposadr[i] + t), m.push(s);
		for (let t = 0; t < o; t++) p.push(e.jnt_dofadr[i] + t);
	}
	let h = zm(i, t, u).filter((e) => e !== 0), g = new Set(h), _ = new Float32Array(h.length * 4), v = e.body_iquat;
	for (let e = 0; e < h.length; e++) {
		let t = h[e] * 4;
		_[e * 4] = v?.[t] ?? 1, _[e * 4 + 1] = v?.[t + 1] ?? 0, _[e * 4 + 2] = v?.[t + 2] ?? 0, _[e * 4 + 3] = v?.[t + 3] ?? 0;
	}
	let y = Bm(o, e.geom_bodyid, g, t, u, d), b = Bm(a, e.site_bodyid, g, t, u, d);
	return {
		qposAdr: f,
		qvelAdr: p,
		jointBias: Float32Array.from(m),
		rootBodyId: h.length > 0 ? h[0] : -1,
		bodyIds: h,
		bodyIquat: _,
		geomIds: y,
		geomBodyIds: y.map((t) => e.geom_bodyid?.[t] ?? 0),
		siteIds: b,
		siteBodyIds: b.map((t) => e.site_bodyid?.[t] ?? 0),
		tendonIds: zm(s, t, u),
		ctrlIds: zm(c, t, u)
	};
}
//#endregion
//#region src/core/onnx/slotReader/model.ts
var Wm = {
	body: {
		count: "nbody",
		nameAdr: "name_bodyadr"
	},
	geom: {
		count: "ngeom",
		nameAdr: "name_geomadr"
	},
	site: {
		count: "nsite",
		nameAdr: "name_siteadr"
	},
	joint: {
		count: "njnt",
		nameAdr: "name_jntadr"
	},
	dof: { count: "nv" },
	qpos: { count: "nq" },
	actuator: {
		count: "nu",
		nameAdr: "name_actuatoradr"
	},
	tendon: {
		count: "ntendon",
		nameAdr: "name_tendonadr"
	},
	camera: {
		count: "ncam",
		nameAdr: "name_camadr"
	},
	light: {
		count: "nlight",
		nameAdr: "name_lightadr"
	},
	material: {
		count: "nmat",
		nameAdr: "name_matadr"
	},
	texture: {
		count: "ntex",
		nameAdr: "name_texadr"
	},
	pair: {
		count: "npair",
		nameAdr: "name_pairadr"
	},
	equality: {
		count: "neq",
		nameAdr: "name_eqadr"
	}
};
function Gm(e, t) {
	let n = e[t];
	if (n && typeof n.length == "number") return n;
}
function Km(e, t) {
	let n = e.indexOf(t);
	if (n >= 0) return n;
	let r = Vm(t);
	return e.findIndex((e) => Vm(e) === r);
}
function qm(e, t) {
	let n = Wm[t.element ?? ""], r = t.names ?? [];
	if (!n) return null;
	let i;
	if (t.element === "dof" || t.element === "qpos") {
		let n = Rm(e, e.njnt, e.name_jntadr), a = t.element === "dof" ? e.jnt_dofadr : e.jnt_qposadr;
		i = r.map((e, r) => {
			let i = Km(n, e);
			return i < 0 ? -1 : a[i] + (t.offsets?.[r] ?? 0);
		});
	} else {
		let t = e[n.nameAdr], a = Rm(e, e[n.count], t);
		i = r.map((e) => Km(a, e));
	}
	return i.some((e) => e < 0) ? null : i;
}
function Jm(e, t, n) {
	let r = Wm[n ?? ""], i = r ? e[r.count] : 0;
	return !i || t.length % i !== 0 ? null : t.length / i;
}
function Ym(e, t, n) {
	let r = t.model ?? "", i = t.default ? n?.base(r) : Gm(e, r);
	if (!i) return null;
	let a = qm(e, t), o = Jm(e, i, t.element);
	if (!a || o === null) return null;
	let s = (t.shape ?? []).slice(2).reduce((e, t) => e * t, 1);
	if (t.shape && s !== o) return null;
	let c = new Float32Array(a.length * o);
	for (let e = 0; e < a.length; e++) for (let t = 0; t < o; t++) c[e * o + t] = i[a[e] * o + t];
	return c;
}
//#endregion
//#region src/core/event/modelWrite.ts
function Xm(e) {
	return e.kind === "model";
}
var Zm = class {
	constructor(e) {
		this.mjModel = e, this.snapshots = /* @__PURE__ */ new Map();
	}
	base(e) {
		let t = this.snapshots.get(e);
		if (t) return t;
		let n = Gm(this.mjModel, e);
		if (!n) return;
		let r = Float64Array.from(n);
		return this.snapshots.set(e, r), r;
	}
	restore() {
		if (this.snapshots.size === 0) return !1;
		for (let [e, t] of this.snapshots) {
			let n = Gm(this.mjModel, e);
			if (n) for (let e = 0; e < t.length; e++) n[e] = t[e];
		}
		return !0;
	}
};
function Qm(e, t, n, r) {
	let i = Gm(e, t.field), a = n[t.outputs[0]], o = i ? qm(e, t) : null, s = i ? Jm(e, i, t.element) : null;
	if (!o || s === null || !a || a.length < t.cells.length || t.cells.some(([e, t]) => e >= o.length || t >= s)) return !1;
	r?.base(t.field);
	let c = i;
	return t.cells.forEach(([e, t], n) => {
		c[o[e] * s + t] = a[n];
	}), !0;
}
function $m(e, t, n) {
	let r = Float64Array.from(n.qpos);
	e.mj_setConst(t, n);
	let i = n.qpos;
	for (let e = 0; e < r.length; e++) i[e] = r[e];
}
//#endregion
//#region src/core/event/OnnxEvent.ts
function eh(e) {
	return typeof e == "object" && !!e && typeof e.onnx == "string" && typeof e.mode == "string";
}
var th = class {
	constructor(e, t) {
		this.config = e, this.deps = t, this.inFlight = !1, this.name = e.name, this.mode = e.mode;
	}
	get busy() {
		return this.inFlight;
	}
	async fire(e) {
		if (!this.inFlight) {
			this.inFlight = !0;
			try {
				let { feeds: t } = np(this.config.input_slots, this.deps.readSlot);
				t.rand = {
					data: this.deps.rng.randVector(this.config.rand_dim, this.config.rand_ranges),
					dims: [this.config.rand_dim]
				};
				let n = await this.deps.session.run(rp(this.deps.session, t));
				this.applyWrites(e, n);
			} finally {
				this.inFlight = !1;
			}
		}
	}
	applyWrites(e, t) {
		let n = this.config.write_targets ?? [];
		if (n.length === 0) return;
		let { mjModel: r, mjData: i } = e;
		if (!r || !i) return;
		let a = {};
		for (let [e, n] of Object.entries(t)) a[e] = tp(n.data);
		Ul(r, i, n.filter((e) => !Xm(e)), a);
		let o = !1;
		for (let t of n) Xm(t) && (o = Qm(r, t, a, e.modelDefaults) || o);
		o && this.config.set_const && e.mujoco && $m(e.mujoco, r, i);
	}
};
//#endregion
//#region src/core/command/TrackingCommand.ts
function nh(e) {
	let t = Math.hypot(e[0] ?? 1, e[1] ?? 0, e[2] ?? 0, e[3] ?? 0) || 1;
	return new Float32Array([
		(e[0] ?? 1) / t,
		(e[1] ?? 0) / t,
		(e[2] ?? 0) / t,
		(e[3] ?? 0) / t
	]);
}
function rh(e) {
	let t = e.shape[0] ?? 0, n = e.shape.length <= 1 ? 1 : e.shape.slice(1).reduce((e, t) => e * t, 1), r = [];
	for (let i = 0; i < t; i++) {
		let t = new Float32Array(n), a = i * n;
		for (let r = 0; r < n; r++) t[r] = e.data[a + r] ?? 0;
		r.push(t);
	}
	return r;
}
var ih = [
	.5,
	.7,
	.5,
	.5
], ah = .5, oh = [
	[
		1,
		.5,
		.5,
		1
	],
	[
		.5,
		1,
		.5,
		1
	],
	[
		.5,
		.5,
		1,
		1
	]
];
function sh(e) {
	return fp(e, ah);
}
function ch(e) {
	let t = !1;
	return e.traverse((e) => {
		e instanceof xe && (t = !0);
	}), t;
}
function lh(e, t, n, r, i) {
	let a = [
		r[0] ?? 0,
		r[1] ?? 0,
		t[2] ?? 0
	], o = js(Ds(i, Os(n))), s = new Float32Array(e.length);
	for (let n = 0; n + 2 < e.length; n += 3) {
		let r = ks(o, [
			e[n] - (t[0] ?? 0),
			e[n + 1] - (t[1] ?? 0),
			e[n + 2] - (t[2] ?? 0)
		]);
		for (let e = 0; e < 3; e++) s[n + e] = a[e] + r[e];
	}
	return s;
}
var uh = class {
	constructor(e, t, n) {
		this.bodyIds = /* @__PURE__ */ new Map(), this.context = n, this.motions = Array.isArray(t.motions) ? t.motions : [], this.loadedMotions = /* @__PURE__ */ new Map(), this.sampleHz = 50, this.selectedMotionName = this.motions.find((e) => e.default)?.name ?? this.motions[0]?.name ?? null, this.selectedMotion = null, this.selectedAnchorBodyIndex = 0, this.selectedRootBodyIndex = 0, this.datasetQposAdr = [], this.frameAccumulator = 0, this.holdResetFrame = t.hold_reset_frame === !0, this.looped = !1, this.debugVisOn = !0, this.samplingMode = typeof t.sampling_mode == "string" ? t.sampling_mode : "start", this.timeSteps = Array.isArray(t.time_steps) ? t.time_steps.map((e) => Math.trunc(Number(e) || 0)) : [0], this.resetJitter = this.buildResetJitter(t.reset_graph), this.refJointPos = [], this.refRootPos = [], this.refRootQuat = [], this.refIdx = 0, this.refLen = 0, this.nJoints = this.motions.find((e) => e.name === this.selectedMotionName)?.dataset_joint_names?.length ?? 0, this.ghostBodies = /* @__PURE__ */ new Map(), this.ghostData = n.mjModel ? new n.mujoco.MjData(n.mjModel) : null;
		let r = Array.isArray(t.ghost_color) ? t.ghost_color.map(Number) : ih, i = t.debug_vis !== !1, a = t.viz_mode === "frames";
		this.ghostRoot = i && !a ? this.createGhostRoot(r) : null, this.frames = i && a ? this.createFrames() : null, this.refBodyPosW = [], this.refBodyQuatW = [], this.refBodyLinVelW = [], this.refBodyAngVelW = [];
	}
	getCommand() {
		if (!this.selectedMotion || this.refLen === 0) return new Float32Array(this.nJoints * 2);
		if (this.selectedMotion.clip_format === "qpos") return /* @__PURE__ */ new Float32Array();
		let e = this.refJointPos[this.refIdx] ?? new Float32Array(this.nJoints), t = this.selectedMotion.jointVel[this.refIdx] ?? new Float32Array(this.nJoints), n = new Float32Array(e.length + t.length);
		return n.set(e, 0), n.set(t, e.length), n;
	}
	getUiConfig() {
		return null;
	}
	async setSelectedMotion(e) {
		if (e === null) return this.selectedMotionName = null, this.selectedMotion = null, this.refJointPos = [], this.refRootPos = [], this.refRootQuat = [], this.refBodyPosW = [], this.refBodyQuatW = [], this.refBodyLinVelW = [], this.refBodyAngVelW = [], this.refLen = 0, this.nJoints = 0, this.updateGhostPose(), !1;
		let t = this.motions.find((t) => t.name === e);
		if (!t) return !1;
		let n = this.loadedMotions.get(e) ?? await this.loadMotion(t);
		return this.loadedMotions.set(e, n), this.selectedMotionName = e, this.selectedMotion = n, this.selectedAnchorBodyIndex = Math.max(0, n.body_names.indexOf(n.anchor_body_name)), this.selectedRootBodyIndex = 0, this.datasetQposAdr = this.resolveQposAdr(n.dataset_joint_names ?? []), this.refLen = n.frameCount, this.refJointPos = n.jointPos, this.nJoints = n.jointPos[0]?.length ?? 0, this.looped = !1, this.updateReferenceState(), this.startEpisode(), !0;
	}
	reset() {
		this.updateReferenceState(), this.startEpisode();
	}
	startEpisode() {
		this.refIdx = this.sampleInitialFrame(this.refLen), this.frameAccumulator = 0, this.applyReferenceStateToSim(), !this.looped && !this.holdResetFrame && this.selectedMotion?.time_source !== "sim" && this.refIdx + 1 < this.refLen && (this.refIdx += 1), this.looped = !1, this.updateGhostPose();
	}
	update(e, t = !1) {
		if (t || !this.selectedMotion || this.refLen <= 1) return;
		if (this.selectedMotion.time_source === "sim") {
			let e = this.context.mjData?.time ?? 0;
			this.refIdx = this.sampleHz > 0 ? Math.floor(e * this.sampleHz) % this.refLen : 0, this.updateGhostPose();
			return;
		}
		let n = this.selectedMotion?.loop !== !1;
		this.frameAccumulator += e * this.sampleHz;
		let r = !1;
		for (; this.frameAccumulator >= 1;) {
			if (this.refIdx += 1, this.refIdx >= this.refLen) {
				if (!n) {
					this.refIdx = this.refLen - 1, this.frameAccumulator = 0;
					break;
				}
				this.refIdx = 0, r = !0;
			}
			--this.frameAccumulator;
		}
		r && this.context.requestReset && (this.looped = !0, this.context.requestReset()), this.updateGhostPose();
	}
	debugVisEnabled() {
		return this.ghostRoot || this.frames ? this.debugVisOn : null;
	}
	setDebugVisEnabled(e) {
		this.debugVisOn = e;
	}
	updateDebugVisuals(e = !0) {
		let t = e && this.debugVisOn && this.isReady();
		this.ghostRoot && (this.ghostRoot.visible = t), this.frames && (this.frames.clear(), t && this.drawFrames(this.frames), this.frames.commit());
	}
	drawFrames(e) {
		let t = this.getBodyNames(), n = this.refBodyPosW[this.refIdx], r = this.refBodyQuatW[this.refIdx], i = this.robotBodyField("xpos", 3, t), a = this.robotBodyField("xquat", 4, t);
		for (let o = 0; o < t.length; o++) {
			if (n && r) {
				let t = nh(r.subarray(o * 4, o * 4 + 4));
				bp(e, n.subarray(o * 3, o * 3 + 3), t, .08, oh);
			}
			i && a && bp(e, i.subarray(o * 3, o * 3 + 3), a.subarray(o * 4, o * 4 + 4), .12);
		}
		let o = this.getAnchorPos(), s = this.getAnchorQuat();
		o && s && bp(e, o, s, .1, oh);
		let c = [this.getAnchorBodyName() ?? ""], l = this.robotBodyField("xpos", 3, c), u = this.robotBodyField("xquat", 4, c);
		l && u && bp(e, l, u, .15);
	}
	createFrames() {
		let e = new _p(3 * (2 * Math.max(0, ...this.motions.map((e) => e.body_names?.length ?? 0)) + 2), "Tracking Frames");
		return (this.context.mujocoRoot ?? this.context.scene).add(e.object), e;
	}
	dispose() {
		this.ghostRoot && (this.ghostRoot.parent?.remove(this.ghostRoot), this.ghostRoot.traverse((e) => {
			if (e instanceof xe) {
				if (Array.isArray(e.material)) for (let t of e.material) t.dispose?.();
				else e.material?.dispose?.();
			}
		})), this.frames?.dispose(), this.ghostData?.delete?.();
	}
	isReady() {
		return this.selectedMotion !== null && this.refLen > 0;
	}
	getSelectedMotion() {
		return this.selectedMotion;
	}
	getSelectedMotionName() {
		return this.selectedMotionName;
	}
	getAnchorBodyName() {
		return this.selectedMotion?.anchor_body_name ?? this.motions.find((e) => e.name === this.selectedMotionName)?.anchor_body_name ?? null;
	}
	getBodyNames() {
		return this.selectedMotion?.body_names ?? this.motions.find((e) => e.name === this.selectedMotionName)?.body_names ?? [];
	}
	getAnchorBodyIndex() {
		return this.selectedAnchorBodyIndex;
	}
	getAnchorPos(e = this.refIdx) {
		if (!this.selectedMotion) return null;
		let t = this.refBodyPosW[e];
		if (!t) return null;
		let n = this.selectedAnchorBodyIndex * 3;
		return t.slice(n, n + 3);
	}
	getAnchorQuat(e = this.refIdx) {
		if (!this.selectedMotion) return null;
		let t = this.refBodyQuatW[e];
		if (!t) return null;
		let n = this.selectedAnchorBodyIndex * 4;
		return nh(t.slice(n, n + 4));
	}
	anchorVector(e) {
		let t = e[this.refIdx];
		if (!t) return null;
		let n = this.selectedAnchorBodyIndex * 3;
		return t.slice(n, n + 3);
	}
	anchorFrameVector(e) {
		let t = this.anchorVector(e), n = this.getAnchorQuat();
		return !t || !n ? null : Float32Array.from(As(n, t));
	}
	getBodyPosW(e = this.refIdx) {
		if (!this.selectedMotion) return null;
		let t = this.refBodyPosW[e];
		return t ? t.slice() : null;
	}
	getStateField(e) {
		switch (e) {
			case "command": return this.getCommand();
			case "is_ready": return new Float32Array([+!!this.isReady()]);
			case "ref_root_pos_w": return this.refWindow(this.refRootPos, 3);
			case "ref_root_quat_w": return this.refWindow(this.refRootQuat, 4, !0);
			case "ref_joint_pos": return this.refWindow(this.refJointPos, this.nJoints);
			case "anchor_pos_w": return this.getAnchorPos();
			case "anchor_quat_w": return this.getAnchorQuat();
			case "anchor_lin_vel_w": return this.anchorVector(this.refBodyLinVelW);
			case "anchor_ang_vel_w": return this.anchorVector(this.refBodyAngVelW);
			case "ref_base_height": {
				let e = this.getAnchorPos();
				return e ? new Float32Array([e[2]]) : null;
			}
			case "ref_base_lin_vel_b": return this.anchorFrameVector(this.refBodyLinVelW);
			case "ref_base_ang_vel_b": return this.anchorFrameVector(this.refBodyAngVelW);
			case "ref_gravity_b": {
				let e = this.getAnchorQuat();
				return e ? Float32Array.from(As(e, [
					0,
					0,
					-1
				])) : null;
			}
			case "joint_pos":
			case "tracked_joint_pos": return this.refJointPos[this.refIdx]?.slice() ?? null;
			case "body_pos_w": return this.getBodyPosW();
			case "robot_anchor_pos_w": return this.robotBodyField("xpos", 3, [this.getAnchorBodyName() ?? ""]);
			case "robot_anchor_quat_w": return this.robotBodyField("xquat", 4, [this.getAnchorBodyName() ?? ""]);
			case "robot_body_pos_w": return this.robotBodyField("xpos", 3, this.getBodyNames());
			case "body_pos_relative_w": return this.bodyPosRelativeW();
			default: return this.selectedMotion?.frameFields.get(e)?.[this.refIdx]?.slice() ?? null;
		}
	}
	refWindow(e, t, n = !1) {
		let r = new Float32Array(this.timeSteps.length * t);
		if (n) for (let e = 0; e < this.timeSteps.length; e++) r[e * t] = 1;
		if (!this.isReady()) return r;
		for (let i = 0; i < this.timeSteps.length; i++) {
			let a = e[Math.min(this.refLen - 1, Math.max(0, this.refIdx + this.timeSteps[i]))];
			if (!a) continue;
			let o = n ? nh(a) : a;
			for (let e = 0; e < t && e < o.length; e++) r[i * t + e] = o[e];
		}
		return r;
	}
	robotBodyField(e, t, n) {
		let r = this.context.mjData;
		if (!r || n.length === 0) return null;
		let i = new Float32Array(n.length * t);
		for (let a = 0; a < n.length; a++) {
			let o = this.resolveBodyId(n[a]);
			if (o < 0) return null;
			for (let n = 0; n < t; n++) i[a * t + n] = r[e][o * t + n] ?? 0;
		}
		return i;
	}
	bodyPosRelativeW() {
		let e = this.getAnchorPos(), t = this.getAnchorQuat(), n = this.getBodyPosW(), r = [this.getAnchorBodyName() ?? ""], i = this.robotBodyField("xpos", 3, r), a = this.robotBodyField("xquat", 4, r);
		return !e || !t || !n || !i || !a ? null : lh(n, e, t, i, a);
	}
	resolveBodyId(e) {
		let t = this.bodyIds.get(e);
		return t === void 0 && (t = this.findBodyIdByName(e), this.bodyIds.set(e, t)), t;
	}
	createGhostRoot(e) {
		let t = this.context.bodies ?? null, n = this.context.mjModel;
		if (!t || !n) return null;
		let r = new B();
		r.name = "Tracking Ghost", r.visible = !1;
		for (let [n, i] of Object.entries(t)) {
			let t = Number(n);
			if (!this.isDynamicBody(t)) continue;
			let a = i.clone(!0);
			a.traverse((t) => {
				t instanceof xe && (t.material = Array.isArray(t.material) ? t.material.map(() => sh(e)) : sh(e), t.castShadow = !1, t.receiveShadow = !1, t.renderOrder = 2);
			}), ch(a) && (this.ghostBodies.set(t, a), r.add(a));
		}
		return (this.context.mujocoRoot ?? this.context.scene).add(r), r;
	}
	isDynamicBody(e) {
		let t = this.context.mjModel;
		if (!t || e <= 0 || e >= t.nbody) return !1;
		let n = e;
		for (; n > 0;) {
			if (t.body_jntnum[n] > 0) return !0;
			n = t.body_parentid[n];
		}
		return !1;
	}
	async loadMotion(e) {
		this.sampleHz = e.fps;
		let t = await Pm(await fm(e.data)), n = [], r = /* @__PURE__ */ new Map();
		for (let n of e.frame_fields ?? []) {
			let e = t[n];
			if (!e) throw Error(`Motion asset is missing frame field '${n}'`);
			r.set(n, rh(e));
		}
		if (e.clip_format === "qpos") {
			if (!t.qpos) throw Error("Motion asset with clip_format='qpos' is missing 'qpos'");
			let i = rh(t.qpos);
			return {
				...e,
				jointPos: n,
				jointVel: n,
				bodyPosW: n,
				bodyQuatW: n,
				bodyLinVelW: n,
				bodyAngVelW: n,
				qposFrames: i,
				frameFields: r,
				frameCount: i.length
			};
		}
		for (let e of [
			"joint_pos",
			"joint_vel",
			"body_pos_w",
			"body_quat_w",
			"body_lin_vel_w",
			"body_ang_vel_w"
		]) if (!t[e]) throw Error(`Motion asset is missing '${e}'`);
		let i = rh(t.joint_pos), a = rh(t.joint_vel), o = t.body_names?.strings ?? null, s = this.selectMotionBodyFrames(rh(t.body_pos_w), e.body_names, 3, o), c = this.selectMotionBodyFrames(rh(t.body_quat_w), e.body_names, 4, o), l = this.selectMotionBodyFrames(rh(t.body_lin_vel_w), e.body_names, 3, o), u = this.selectMotionBodyFrames(rh(t.body_ang_vel_w), e.body_names, 3, o);
		return {
			...e,
			jointPos: i,
			jointVel: a,
			bodyPosW: s,
			bodyQuatW: c,
			bodyLinVelW: l,
			bodyAngVelW: u,
			frameFields: r,
			frameCount: i.length
		};
	}
	selectMotionBodyFrames(e, t, n, r = null) {
		let i = this.context.mjModel, a = e[0];
		if (!i || !a || t.length === 0) return e;
		let o = Math.floor(a.length / n);
		if (o === t.length) return e;
		let s;
		if (r !== null) s = t.map((e) => r.indexOf(e));
		else {
			let e = this.findBodyIdByName(t[0]);
			s = t.map((e) => this.findBodyIdByName(e)).map((t) => t - e);
		}
		return s.some((e) => e < 0 || e >= o) ? e : e.map((e) => {
			let r = new Float32Array(t.length * n);
			for (let t = 0; t < s.length; t++) {
				let i = s[t] * n, a = t * n;
				for (let t = 0; t < n; t++) r[a + t] = e[i + t] ?? 0;
			}
			return r;
		});
	}
	updateReferenceState() {
		let e = this.selectedMotion;
		!e || e.frameCount === 0 || e.clip_format === "qpos" ? (this.refRootPos = [], this.refRootQuat = [], this.refBodyPosW = [], this.refBodyQuatW = [], this.refBodyLinVelW = [], this.refBodyAngVelW = []) : (this.refBodyPosW = e.bodyPosW.map((e) => e.slice()), this.refBodyQuatW = e.bodyQuatW.map((e) => e.slice()), this.refBodyLinVelW = e.bodyLinVelW.map((e) => e.slice()), this.refBodyAngVelW = e.bodyAngVelW.map((e) => e.slice()), this.refRootPos = this.refBodyPosW.map((e) => e.slice(this.selectedRootBodyIndex * 3, this.selectedRootBodyIndex * 3 + 3)), this.refRootQuat = this.refBodyQuatW.map((e) => nh(e.slice(this.selectedRootBodyIndex * 4, this.selectedRootBodyIndex * 4 + 4))));
	}
	applyReferenceStateToSim() {
		let e = this.context.mjModel, t = this.context.mjData, n = this.selectedMotion;
		if (!e || !t || !n || this.refLen === 0 || n.clip_format === "qpos") return;
		let r = this.sampleRootPos(this.refIdx), i = this.sampleRootQuat(this.refIdx), a = this.findFreeJointIndex();
		if (r && i && a >= 0) {
			let n = e.jnt_qposadr[a], o = e.jnt_dofadr[a];
			t.qpos[n + 0] = r[0] ?? 0, t.qpos[n + 1] = r[1] ?? 0, t.qpos[n + 2] = r[2] ?? 0, t.qpos[n + 3] = i[0] ?? 1, t.qpos[n + 4] = i[1] ?? 0, t.qpos[n + 5] = i[2] ?? 0, t.qpos[n + 6] = i[3] ?? 0;
			let s = this.sampleRootVelocity(this.refIdx, this.refBodyLinVelW), c = this.sampleRootAngularVelocity(this.refIdx);
			if (s && c) {
				let e = As(i, c);
				t.qvel[o + 0] = s[0] ?? 0, t.qvel[o + 1] = s[1] ?? 0, t.qvel[o + 2] = s[2] ?? 0, t.qvel[o + 3] = e[0], t.qvel[o + 4] = e[1], t.qvel[o + 5] = e[2];
			}
		}
		let o = this.sampleJointPos(this.refIdx), s = n.jointVel[this.refIdx] ?? /* @__PURE__ */ new Float32Array();
		for (let e = 0; e < this.datasetQposAdr.length && e < o.length; e++) t.qpos[this.datasetQposAdr[e]] = o[e] ?? 0;
		for (let e = 0; e < this.datasetQposAdr.length && e < s.length; e++) {
			let n = this.resolveQvelAdrForQposAdr(this.datasetQposAdr[e]);
			n >= 0 && (t.qvel[n] = s[e] ?? 0);
		}
		this.context.mujoco.mj_forward(e, t), this.applyResetJitter();
	}
	applyResetJitter() {
		let e = this.resetJitter;
		e && e.fire({
			mjModel: this.context.mjModel,
			mjData: this.context.mjData,
			terrainData: null
		}).then(() => {
			let { mjModel: e, mjData: t } = this.context;
			e && t && this.context.mujoco.mj_forward(e, t);
		});
	}
	buildResetJitter(e) {
		if (!eh(e)) return null;
		let t = this.context.onnxSessions?.get(e.onnx), n = this.context.rng;
		return !t || !n ? null : new th(e, {
			session: t,
			rng: n,
			readSlot: this.context.readOnnxSlot
		});
	}
	sampleRootPos(e) {
		return this.refRootPos[e] ?? null;
	}
	sampleRootQuat(e) {
		return this.refRootQuat[e] ?? null;
	}
	sampleRootVelocity(e, t) {
		return t[e]?.slice(this.selectedRootBodyIndex * 3, this.selectedRootBodyIndex * 3 + 3) ?? null;
	}
	sampleRootAngularVelocity(e) {
		return this.sampleRootVelocity(e, this.refBodyAngVelW);
	}
	sampleInitialFrame(e) {
		if (e <= 1 || this.samplingMode === "start") return 0;
		if (this.samplingMode === "uniform") {
			let t = this.context.rng;
			return t ? Math.min(e - 1, Math.floor(t.next() * e)) : 0;
		}
		return 0;
	}
	sampleJointPos(e) {
		return this.refJointPos[e] ?? /* @__PURE__ */ new Float32Array();
	}
	resolveQposAdr(e) {
		let t = this.context.mjModel;
		if (!t || e.length === 0) return [];
		let n = [];
		for (let r of e) {
			let e = -1;
			for (let n = 0; n < t.njnt; n++) {
				let i = t.jnt(n).name;
				if (i === r || i.endsWith(`/${r}`)) {
					e = t.jnt_qposadr[n];
					break;
				}
			}
			e >= 0 && n.push(e);
		}
		return n;
	}
	resolveQvelAdrForQposAdr(e) {
		let t = this.context.mjModel;
		if (!t) return -1;
		for (let n = 0; n < t.njnt; n++) if (t.jnt_qposadr[n] === e) return t.jnt_dofadr[n];
		return -1;
	}
	findBodyIdByName(e) {
		let t = this.context.mjModel;
		if (!t) return -1;
		for (let n = 0; n < t.nbody; n++) {
			let r = t.body(n).name;
			if (r === e || r.endsWith(`/${e}`)) return n;
		}
		return -1;
	}
	updateGhostPose() {
		if (!this.ghostRoot || !this.ghostData || !this.context.mjModel || !this.selectedMotion || !this.refLen) return;
		if (this.selectedMotion.clip_format === "qpos" && this.selectedMotion.qposFrames) {
			let e = this.selectedMotion.qposFrames[this.refIdx];
			e && this.ghostData.qpos.set(e), this.context.mujoco.mj_forward(this.context.mjModel, this.ghostData);
			for (let [e, t] of this.ghostBodies) Rt(this.ghostData.xpos, e, t.position), zt(this.ghostData.xquat, e, t.quaternion);
			return;
		}
		let e = this.ghostData.qpos;
		e.set(this.context.mjModel.qpos0);
		let t = this.refRootPos[this.refIdx], n = this.refRootQuat[this.refIdx], r = this.findFreeJointIndex();
		if (r >= 0 && t && n) {
			let i = this.context.mjModel.jnt_qposadr[r];
			e[i + 0] = t[0] ?? 0, e[i + 1] = t[1] ?? 0, e[i + 2] = t[2] ?? 0, e[i + 3] = n[0] ?? 1, e[i + 4] = n[1] ?? 0, e[i + 5] = n[2] ?? 0, e[i + 6] = n[3] ?? 0;
		}
		let i = this.refJointPos[this.refIdx] ?? /* @__PURE__ */ new Float32Array();
		for (let t = 0; t < this.datasetQposAdr.length && t < i.length; t++) e[this.datasetQposAdr[t]] = i[t] ?? 0;
		this.context.mujoco.mj_forward(this.context.mjModel, this.ghostData);
		for (let [e, t] of this.ghostBodies) Rt(this.ghostData.xpos, e, t.position), zt(this.ghostData.xquat, e, t.quaternion);
	}
	findFreeJointIndex() {
		let e = this.context.mjModel;
		if (!e) return -1;
		for (let t = 0; t < e.njnt; t++) if (e.jnt_type[t] === 0) return t;
		return -1;
	}
};
//#endregion
//#region src/core/command/types.ts
function dh(e, t) {
	return `${e}:${t}`;
}
//#endregion
//#region src/core/command/CommandManager.ts
function fh(e) {
	return e.name === "OnnxCommand";
}
var ph = {
	UiCommand: class {
		constructor(e, t) {
			this.inputs = Array.isArray(t.ui?.inputs) ? t.ui.inputs : [], this.values = /* @__PURE__ */ new Map();
			for (let e of this.inputs) e.type === "slider" ? this.values.set(e.name, e.default) : e.type === "checkbox" && this.values.set(e.name, +!!e.default);
		}
		getCommand() {
			let e = this.inputs.filter((e) => e.type === "slider" || e.type === "checkbox"), t = new Float32Array(e.length);
			for (let n = 0; n < e.length; n++) {
				let r = e[n], i = r.type === "checkbox" ? +!!r.default : r.default;
				t[n] = this.values.get(r.name) ?? i ?? 0;
			}
			return t;
		}
		getUiConfig() {
			return { inputs: this.inputs };
		}
		getStateField(e) {
			return e === "command" ? this.getCommand() : null;
		}
		reset() {
			for (let e of this.inputs) e.type === "slider" ? this.values.set(e.name, e.default) : e.type === "checkbox" && this.values.set(e.name, +!!e.default);
		}
		getUiValue(e) {
			return this.values.get(e);
		}
		setValue(e, t) {
			let n = this.inputs.find((t) => (t.type === "slider" || t.type === "checkbox") && t.name === e);
			if (!n) return 0;
			if (n.type === "checkbox") {
				let e = +(t >= .5);
				return this.values.set(n.name, e), e;
			}
			let r = Math.max(n.min, Math.min(n.max, t));
			return this.values.set(n.name, r), r;
		}
		triggerButton(e) {
			if (e !== "zero") return !1;
			for (let e of this.inputs) e.type === "slider" && this.values.set(e.name, 0);
			return !0;
		}
	},
	TrackingCommand: uh
}, mh = class {
	constructor() {
		this.terms = /* @__PURE__ */ new Map(), this.commands = /* @__PURE__ */ new Map(), this.commandGroups = /* @__PURE__ */ new Map(), this.values = /* @__PURE__ */ new Map(), this.listeners = /* @__PURE__ */ new Set(), this.context = null, this.warnedButtons = /* @__PURE__ */ new Set();
	}
	initialize(e, t, n) {
		this.clear(), this.context = t;
		let r = {
			...ph,
			...n
		};
		for (let [n, i] of Object.entries(e)) {
			if (fh(i)) {
				let e = this.buildOnnxCommand(n, i, t);
				if (!e) continue;
				this.terms.set(n, e), this.registerUi(n, e);
				continue;
			}
			let e = r[i.name];
			if (!e) throw Error(`Unknown command term: ${i.name}`);
			let a = new e(n, i, t);
			this.terms.set(n, a), this.registerUi(n, a);
		}
	}
	buildOnnxCommand(e, t, n) {
		let r = n.onnxSessions?.get(t.onnx);
		return !r || !n.rng ? null : new Ap(e, t, n, {
			session: r,
			rng: n.rng,
			readSlot: n.readOnnxSlot
		});
	}
	update(e, t = !1) {
		for (let n of this.terms.values()) n.update?.(e, t);
	}
	updateDebugVisuals(e = !0) {
		for (let t of this.terms.values()) t.updateDebugVisuals?.(e);
	}
	getDebugVisTerms() {
		let e = [];
		for (let [t, n] of this.terms) {
			let r = n.debugVisEnabled?.();
			r != null && e.push({
				name: t,
				enabled: r
			});
		}
		return e;
	}
	setDebugVisEnabled(e, t) {
		let n = this.terms.get(e);
		n?.setDebugVisEnabled && (n.setDebugVisEnabled(t), this.emit({
			type: "debug_vis",
			commandId: e,
			groupName: e
		}));
	}
	async resetTerms() {
		for (let e of this.terms.values()) await e.reset?.();
		this.syncValuesFromTerms(), this.emit({
			type: "reset",
			commandId: "*"
		});
	}
	getCommandGroups() {
		return Array.from(this.commandGroups.keys());
	}
	getCommandsInGroup(e) {
		return (this.commandGroups.get(e) ?? []).map((e) => this.commands.get(e)).filter(Boolean);
	}
	getCommands() {
		return Array.from(this.commands.values());
	}
	getCommandById(e) {
		return this.commands.get(e);
	}
	getValue(e) {
		return this.values.get(e) ?? 0;
	}
	getValues() {
		let e = {};
		for (let [t, n] of this.values) e[t] = n;
		return e;
	}
	getCommand(e) {
		let t = this.terms.get(e);
		return t ? t.getCommand() : /* @__PURE__ */ new Float32Array();
	}
	termNames() {
		return Array.from(this.terms.keys());
	}
	getTerm(e) {
		return this.terms.get(e);
	}
	getContext() {
		return this.context;
	}
	setValue(e, t) {
		let n = this.commands.get(e);
		if (!n || n.config.type !== "slider" && n.config.type !== "checkbox") return;
		let r = this.terms.get(n.groupName), i = n.config.name, a = r?.setValue ? r.setValue(i, t) : void 0, o = typeof a == "number" ? a : t;
		this.values.set(e, o), this.emit({
			type: "change",
			commandId: e,
			groupName: n.groupName,
			value: o
		});
	}
	triggerButton(e) {
		let t = this.commands.get(e);
		if (!t || t.config.type !== "button") return;
		let n = this.terms.get(t.groupName)?.triggerButton?.(t.config.name);
		this.syncValuesFromTerms(), n === !1 && !this.warnedButtons.has(e) && this.warnedButtons.add(e), this.emit({
			type: "button",
			commandId: e,
			groupName: t.groupName
		});
	}
	resetToDefaults() {
		return this.resetTerms();
	}
	addEventListener(e) {
		this.listeners.add(e);
	}
	removeEventListener(e) {
		this.listeners.delete(e);
	}
	clear() {
		for (let e of this.terms.values()) e.dispose?.();
		this.terms.clear(), this.commands.clear(), this.commandGroups.clear(), this.values.clear(), this.warnedButtons.clear(), this.context = null, this.emit({
			type: "clear",
			commandId: ""
		});
	}
	hasCommands() {
		return this.commands.size > 0;
	}
	dispose() {
		for (let e of this.terms.values()) e.dispose?.();
		this.terms.clear(), this.commands.clear(), this.commandGroups.clear(), this.values.clear(), this.listeners.clear(), this.context = null;
	}
	registerUi(e, t) {
		let n = t.getUiConfig?.(), r = Array.isArray(n?.inputs) ? n.inputs : [];
		if (r.length !== 0) {
			this.commandGroups.set(e, []);
			for (let n of r) {
				let r = dh(e, n.name);
				if (this.commands.set(r, {
					id: r,
					groupName: e,
					config: n
				}), this.commandGroups.get(e).push(r), n.type === "slider" || n.type === "checkbox") {
					let e = n.type === "checkbox" ? +!!n.default : n.default;
					this.values.set(r, t.getUiValue?.(n.name) ?? e);
				}
			}
			this.emit({
				type: "group_registered",
				commandId: e,
				groupName: e
			});
		}
	}
	syncValuesFromTerms() {
		for (let [e, t] of this.commands) {
			if (t.config.type !== "slider" && t.config.type !== "checkbox") continue;
			let n = this.terms.get(t.groupName)?.getUiValue?.(t.config.name);
			n !== void 0 && this.values.set(e, n);
		}
	}
	emit(e) {
		for (let t of this.listeners) try {
			t(e);
		} catch {}
	}
}, hh = class {
	constructor(e, t, n, r, i) {
		this.config = t, this.caster = n, this.meansize = r, this.enabled = !0;
		let a = t.frames.length * t.local_offsets.length;
		this.arrows = new _p(a * 2, `mjswan-sensor-${e}-arrows`), this.spheres = new vp(a, `mjswan-sensor-${e}-hits`, t.viz.hit_sphere_color[3]), i.add(this.arrows.object, this.spheres.object);
	}
	update(e, t, n) {
		this.arrows.clear(), this.spheres.clear();
		let r = this.config.viz, i = e ? this.caster.trace(t, n, r.show_normals) : null;
		if (i) {
			let e = .1 * this.meansize, t = r.hit_sphere_radius * this.meansize, n = r.normal_length * this.meansize, a = Math.min(.5, this.config.max_distance * .05);
			for (let o = 0; o < i.distances.length; o++) {
				let s = i.origins.subarray(o * 3, o * 3 + 3), c = i.distances[o] >= 0, l = c ? i.hitPos.subarray(o * 3, o * 3 + 3) : [
					0,
					1,
					2
				].map((e) => s[e] + i.directions[o * 3 + e] * a);
				if (r.show_rays && this.arrows.add(s, l, c ? r.hit_color : r.miss_color, e), c && (this.spheres.add(l, t, r.hit_sphere_color), i.normals)) {
					let t = [
						0,
						1,
						2
					].map((e) => l[e] + i.normals[o * 3 + e] * n);
					this.arrows.add(l, t, r.normal_color, e);
				}
			}
		}
		this.arrows.commit(), this.spheres.commit();
	}
	dispose() {
		this.arrows.dispose(), this.spheres.dispose();
	}
};
function gh(e) {
	let t = e.map((e) => e.slice()), n = [
		[
			1,
			0,
			0
		],
		[
			0,
			1,
			0
		],
		[
			0,
			0,
			1
		]
	];
	for (let e = 0; e < 50 && !(t[0][1] ** 2 + t[0][2] ** 2 + t[1][2] ** 2 < 1e-30); e++) for (let [e, r] of [
		[0, 1],
		[0, 2],
		[1, 2]
	]) {
		if (Math.abs(t[e][r]) < 1e-300) continue;
		let i = (t[r][r] - t[e][e]) / (2 * t[e][r]), a = Math.sign(i || 1) / (Math.abs(i) + Math.sqrt(i * i + 1)), o = 1 / Math.sqrt(a * a + 1), s = a * o;
		for (let n = 0; n < 3; n++) {
			let i = t[n][e], a = t[n][r];
			t[n][e] = o * i - s * a, t[n][r] = s * i + o * a;
		}
		for (let n = 0; n < 3; n++) {
			let i = t[e][n], a = t[r][n];
			t[e][n] = o * i - s * a, t[r][n] = s * i + o * a;
		}
		for (let t = 0; t < 3; t++) {
			let i = n[t][e], a = n[t][r];
			n[t][e] = o * i - s * a, n[t][r] = s * i + o * a;
		}
	}
	let r = [
		0,
		1,
		2
	].sort((e, n) => t[e][e] - t[n][n]);
	return {
		values: r.map((e) => t[e][e]),
		vectors: r.map((e) => [
			n[0][e],
			n[1][e],
			n[2][e]
		])
	};
}
var _h = 1.1920928955078125e-7;
function vh(e, t) {
	let n = [
		0,
		0,
		1
	], r = t.length, i = 0, a = [
		0,
		0,
		0
	];
	for (let n = 0; n < r; n++) if (t[n]) {
		i += 1;
		for (let t = 0; t < 3; t++) a[t] += e[n * 3 + t];
	}
	if (i < 3) return n;
	for (let e = 0; e < 3; e++) a[e] /= i;
	let o = [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		]
	];
	for (let n = 0; n < r; n++) {
		if (!t[n]) continue;
		let r = [
			0,
			1,
			2
		].map((t) => e[n * 3 + t] - a[t]);
		for (let e = 0; e < 3; e++) for (let t = 0; t < 3; t++) o[e][t] += r[e] * r[t];
	}
	if (!o.flat().every(Number.isFinite)) return n;
	let { values: s, vectors: c } = gh(o), l = s[0] / Math.max(s[1], _h) < .1, u = s[1] > Math.max(s[2], _h) * 1e-6;
	if (!l || !u) return n;
	let d = c[0], f = Math.max(Math.hypot(d[0], d[1], d[2]), 1e-8), p = d[2] < 0 ? -1 : 1;
	return d.map((e) => p * e / f);
}
function yh(e, t = 32) {
	return e <= t ? Array.from({ length: e }, (e, t) => t) : Array.from({ length: t }, (n, r) => Math.trunc(r * (e - 1) / (t - 1)));
}
function bh(e, t) {
	let n = t.slice(t.lastIndexOf("/") + 1), r = -1;
	for (let i = 0; i < e.nbody; i++) {
		let a = e.body(i).name;
		if (a === t) return i;
		r < 0 && (a === n || a.endsWith(`/${n}`)) && (r = i);
	}
	return r;
}
var xh = [
	.8,
	.2,
	.8,
	.8
], Sh = [
	1,
	.5,
	0,
	.8
], Ch = class {
	constructor(e, t, n, r) {
		this.config = t, this.sensors = n, this.enabled = !0, this.ids = null, this.arrows = new _p(2, `mjswan-reward-${e}-arrows`), r.add(this.arrows.object);
	}
	bodies(e) {
		if (this.ids?.model !== e) {
			let t = bh(e, this.config.root_body), n = this.config.body ? bh(e, this.config.body) : t;
			this.ids = {
				model: e,
				root: t,
				body: n
			};
		}
		return this.ids;
	}
	update(e, t, n) {
		this.arrows.clear();
		let { root: r, body: i } = this.bodies(t);
		if (e && this.config.terrain_sensors && r >= 0 && i >= 0) {
			let e = [], a = [];
			for (let r of this.sensors) {
				let i = r.trace(t, n);
				if (i) for (let t of yh(i.distances.length)) e.push(i.hitPos[t * 3], i.hitPos[t * 3 + 1], i.hitPos[t * 3 + 2]), a.push(i.distances[t] >= 0);
			}
			let o = vh(e, a), s = n.xquat, [c, l, u, d] = [
				s[i * 4],
				s[i * 4 + 1],
				s[i * 4 + 2],
				s[i * 4 + 3]
			], f = [
				2 * (l * d + c * u),
				2 * (u * d - c * l),
				1 - 2 * (l * l + u * u)
			], p = n.xpos.subarray(r * 3, r * 3 + 3), m = [
				p[0],
				p[1] + .3,
				p[2]
			], h = (e) => m.map((t, n) => t + e[n] * .25);
			this.arrows.add(m, h(o), xh, .01), this.arrows.add(m, h(f), Sh, .01);
		}
		this.arrows.commit();
	}
	dispose() {
		this.arrows.dispose();
	}
};
//#endregion
//#region src/core/debugViz/DebugViz.ts
function wh(e) {
	return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
}
var Th = class {
	constructor(e, t) {
		this.commands = e, this.simulation = t, this.shown = !0, this.drawings = /* @__PURE__ */ new Map(), this.casters = [], this.switches = /* @__PURE__ */ new Map();
	}
	load(e, t, n) {
		if (this.clear(), !e) return;
		let r = /* @__PURE__ */ new Map();
		for (let [i, a] of Object.entries(e.sensors ?? {})) {
			let o = new je(t, a);
			r.set(i, o), this.casters.push(o), a.debug_vis && this.drawings.set(`sensor:${i}`, {
				label: i,
				drawing: new hh(i, a, o, e.meansize, n)
			});
		}
		for (let [t, i] of Object.entries(e.rewards ?? {})) {
			let e = (i.terrain_sensors ?? []).flatMap((e) => r.get(e) ?? []);
			this.drawings.set(`reward:${t}`, {
				label: t,
				drawing: new Ch(t, i, e, n)
			});
		}
	}
	addSwitch(e, t) {
		this.switches.set(e, t), t.apply(this.shown && t.enabled);
	}
	removeSwitch(e) {
		this.switches.delete(e);
	}
	clear() {
		for (let { drawing: e } of this.drawings.values()) e.dispose();
		this.drawings.clear();
		for (let e of this.casters) e.dispose();
		this.casters.length = 0;
	}
	entries() {
		let e = this.commands.getDebugVisTerms().map(({ name: e, enabled: t }) => ({
			id: `command:${e}`,
			label: wh(e),
			enabled: t
		})), t = [...this.drawings].map(([e, { label: t, drawing: n }]) => ({
			id: e,
			label: t,
			enabled: n.enabled
		})), n = [...this.switches].map(([e, t]) => ({
			id: e,
			label: t.label,
			enabled: t.enabled
		}));
		return [
			...e,
			...t,
			...n
		];
	}
	set(e, t) {
		let n = this.switches.get(e);
		if (n) n.enabled = t, n.apply(this.shown && t);
		else {
			if (e.startsWith("command:")) this.commands.setDebugVisEnabled(e.slice(8), t);
			else {
				let n = this.drawings.get(e);
				if (!n) return;
				n.drawing.enabled = t;
			}
			this.update();
		}
	}
	isShown() {
		return this.shown;
	}
	setShown(e) {
		this.shown = e;
		for (let t of this.switches.values()) t.apply(e && t.enabled);
		this.update();
	}
	update() {
		this.commands.updateDebugVisuals(this.shown);
		let { mjModel: e, mjData: t } = this.simulation();
		if (e && t) for (let { drawing: n } of this.drawings.values()) n.update(this.shown && n.enabled, e, t);
	}
}, Eh = 2, Dh = 3, Oh = 4, kh = 5, Ah = 6;
function jh(e) {
	return typeof e == "object" && !!e && e.kind === "model_field" && typeof e.field == "string";
}
function Mh(e, t, n) {
	let r = new Uint8Array(e.names), i = new TextDecoder(), a = [];
	for (let e = 0; e < t; e++) {
		let t = n[e], o = t;
		for (; o < r.length && r[o] !== 0;) o++;
		a.push(i.decode(r.subarray(t, o)));
	}
	return a;
}
function Nh(e, t) {
	return t === "geom" ? Mh(e, e.ngeom, e.name_geomadr) : t === "body" ? Mh(e, e.nbody, e.name_bodyadr) : Mh(e, e.nsite, e.name_siteadr);
}
function Ph(e, t, n, r) {
	return t === "log_uniform" ? Math.exp(e.uniform(Math.log(n), Math.log(r))) : t === "gaussian" ? n + r * Fh(e) : e.uniform(n, r);
}
function Fh(e) {
	let t = 1 - e.next(), n = e.next();
	return Math.sqrt(-2 * Math.log(t)) * Math.cos(2 * Math.PI * n);
}
function Ih(e, t, n) {
	return e === "add" ? t + n : e === "scale" ? t * n : n;
}
function Lh(e, t, n, r, i, a) {
	let o = t[r.field];
	if (!o) return !1;
	let s = r.uses_defaults ? a.base(r.field) ?? o : o, c = Nh(t, r.entity_type), l = r.entity_names.map((e) => {
		let t = c.indexOf(e);
		if (t >= 0) return t;
		let n = e.slice(e.lastIndexOf("/") + 1);
		return c.findIndex((e) => e === n || e.endsWith(`/${n}`));
	});
	if (l.some((e) => e < 0)) return !1;
	let u = {
		geom: t.ngeom,
		body: t.nbody,
		site: t.nsite
	}[r.entity_type], d = Math.max(1, Math.floor(o.length / u)), f = o, p = Object.keys(r.axis_ranges).map(Number).sort((e, t) => e - t);
	for (let e of p) {
		if (e >= d) continue;
		let [t, n] = r.axis_ranges[String(e)], a = r.shared_random ? Ph(i, r.distribution, t, n) : 0;
		for (let o of l) {
			let c = o * d + e, l = r.shared_random ? a : Ph(i, r.distribution, t, n);
			f[c] = Ih(r.operation, s[c], l);
		}
	}
	return r.recompute_bounds && Rh(t, r.name, l, a), r.set_const && e.mj_setConst(t, n), !0;
}
function Rh(e, t, n, r) {
	let i = e.geom_size, a = e.geom_type;
	r.base("geom_rbound"), r.base("geom_aabb");
	let o = e.geom_rbound, s = e.geom_aabb;
	if (i && a && o && s) for (let e of n) {
		let t = i[e * 3], n = i[e * 3 + 1], r = i[e * 3 + 2], c, l;
		switch (a[e]) {
			case Eh:
				c = t, l = [
					t,
					t,
					t
				];
				break;
			case Dh:
				c = t + n, l = [
					t,
					t,
					t + n
				];
				break;
			case Oh:
				c = Math.max(t, n, r), l = [
					t,
					n,
					r
				];
				break;
			case kh:
				c = Math.sqrt(t * t + n * n), l = [
					t,
					t,
					n
				];
				break;
			case Ah:
				c = Math.sqrt(t * t + n * n + r * r), l = [
					t,
					n,
					r
				];
				break;
			default: continue;
		}
		o[e] = c, s[e * 6 + 3] = l[0], s[e * 6 + 4] = l[1], s[e * 6 + 5] = l[2];
	}
}
//#endregion
//#region src/core/event/triggers.ts
var zh = class {
	constructor(e, t) {
		this.config = e, this.rng = t, this.armed = !0, this.timeLeft = this.sampleInterval();
	}
	tick(e) {
		return !this.armed || (this.timeLeft -= e, this.timeLeft > 0) ? !1 : (this.timeLeft += this.sampleInterval(), this.timeLeft <= 0 && (this.timeLeft = this.sampleInterval()), !0);
	}
	onReset() {
		this.config.isGlobalTime || (this.timeLeft = this.sampleInterval());
	}
	setArmed(e) {
		e !== this.armed && (this.armed = e, e && (this.timeLeft = this.sampleInterval()));
	}
	get isArmed() {
		return this.armed;
	}
	get secondsUntilNextFiring() {
		return this.timeLeft;
	}
	sampleInterval() {
		let [e, t] = this.config.intervalRangeS;
		return this.rng.uniform(e, t);
	}
}, Bh = class {
	constructor() {
		this.fired = !1;
	}
	take() {
		return !this.fired && (this.fired = !0, !0);
	}
	get hasFired() {
		return this.fired;
	}
}, Vh = class {
	constructor(e = {}) {
		this.config = e, this.stepsSinceFired = Infinity;
	}
	step() {
		this.stepsSinceFired !== Infinity && this.stepsSinceFired++;
	}
	take() {
		let e = this.config.minStepCountBetweenReset ?? 0;
		return this.stepsSinceFired < e ? !1 : (this.stepsSinceFired = 0, !0);
	}
}, Hh = class {
	constructor(e, t, n) {
		this.deps = n, this.resetTerms = [], this.intervalTerms = [], this.manualTerms = [], this.startupTerms = [], this.modelFieldTerms = [];
		for (let r of e) {
			if (jh(r)) {
				this.modelFieldTerms.push({
					config: r,
					trigger: new Bh()
				});
				continue;
			}
			if (eh(r)) {
				if (!n) continue;
				let e = n.sessions.get(r.onnx);
				if (!e) continue;
				let t = new th(r, {
					session: e,
					rng: n.rng,
					readSlot: n.readSlot
				});
				switch (r.mode) {
					case "manual":
						this.manualTerms.push(t);
						break;
					case "startup":
						this.startupTerms.push({
							term: t,
							trigger: new Bh()
						});
						break;
					case "interval":
						this.intervalTerms.push({
							term: t,
							trigger: new zh({
								intervalRangeS: r.interval_range_s ?? [1, 1],
								isGlobalTime: r.is_global_time
							}, n.rng)
						});
						break;
					default: this.resetTerms.push({
						kind: "onnx",
						term: t,
						trigger: new Vh({ minStepCountBetweenReset: r.min_step_count_between_reset })
					});
				}
				continue;
			}
			if (r.native) continue;
			let e = t[r.name];
			e && this.resetTerms.push({
				kind: "plugin",
				term: new e(r),
				trigger: new Vh()
			});
		}
	}
	async startup(e) {
		this.applyModelFieldTerms(e);
		for (let { term: t, trigger: n } of this.startupTerms) n.take() && await t.fire(e);
	}
	applyModelFieldTerms(e) {
		if (this.modelFieldTerms.length === 0) return;
		let { mujoco: t, mjModel: n, mjData: r } = e;
		if (!t || !n || !r || !this.deps?.rng) return;
		let i = e.modelDefaults ?? new Zm(n);
		for (let { config: e, trigger: a } of this.modelFieldTerms) a.take() && Lh(t, n, r, e, this.deps.rng, i);
	}
	async tick(e, t) {
		for (let { trigger: e } of this.resetTerms) e.step();
		for (let { term: n, trigger: r } of this.intervalTerms) r.tick(e) && await n.fire(t);
	}
	isGated(e) {
		let t = e.config.disabled_when;
		return t === void 0 ? !1 : this.intervalTerms.find(({ term: e }) => e.name === t)?.trigger.isArmed ?? !1;
	}
	async fire(e, t) {
		let n = this.manualTerms.find((t) => t.name === e);
		n && (this.isGated(n) || await n.fire(t));
	}
	setArmed(e, t) {
		let n = this.intervalTerms.find(({ term: t }) => t.name === e);
		return n ? (n.trigger.setArmed(t), !0) : !1;
	}
	controls() {
		return [...this.manualTerms.map((e) => ({
			name: e.name,
			label: e.config.label ?? e.name,
			kind: "manual",
			armed: !this.isGated(e)
		})), ...this.intervalTerms.map(({ term: e, trigger: t }) => ({
			name: e.name,
			label: e.config.label ?? e.name,
			kind: "interval",
			armed: t.isArmed
		}))];
	}
	async onReset(e) {
		for (let t of this.resetTerms) t.trigger.take() && (t.kind === "onnx" ? await t.term.fire(e) : t.term.onReset(e));
		for (let { trigger: e } of this.intervalTerms) e.onReset();
	}
	get size() {
		return this.resetTerms.length + this.intervalTerms.length + this.manualTerms.length + this.startupTerms.length + this.modelFieldTerms.length;
	}
}, Uh = class {
	constructor(e) {
		this.windows = /* @__PURE__ */ new Map(), this.history = /* @__PURE__ */ new Map(), this.model = null, this.descriptor = e;
	}
	current(e, t, n, r) {
		let i = this.descriptor.fields[e];
		if (!i) return null;
		let a = this.windowsFor(e, t, r);
		if (!a) return null;
		let o = new Float32Array(this.contactCount(e) * i.dim), s = 0;
		for (let e of a) for (let t = 0; t < e.dim; t++) o[s++] = n.sensordata[e.adr + t] ?? 0;
		return o;
	}
	historyOf(e) {
		return this.history.get(e) ?? null;
	}
	advance(e, t, n) {
		let r = this.descriptor.history_length;
		if (!(r <= 0)) for (let i of this.descriptor.history_fields) {
			let a = this.descriptor.fields[i];
			if (!a) continue;
			let o = this.current(i, e, t, n);
			if (!o) continue;
			let s = this.contactCount(i), c = this.history.get(i);
			(!c || c.length !== s * r * a.dim) && (c = new Float32Array(s * r * a.dim), this.history.set(i, c));
			for (let e = 0; e < s; e++) {
				let t = e * r * a.dim;
				for (let e = r - 1; e > 0; e--) c.copyWithin(t + e * a.dim, t + (e - 1) * a.dim, t + e * a.dim);
				for (let n = 0; n < a.dim; n++) c[t + n] = o[e * a.dim + n] ?? 0;
			}
		}
	}
	reset() {
		for (let e of this.history.values()) e.fill(0);
	}
	contactCount(e) {
		return (this.descriptor.fields[e]?.sensors.length ?? 0) * this.descriptor.num_slots;
	}
	windowsFor(e, t, n) {
		if (t !== this.model && (this.model = t, this.windows.clear()), !this.windows.has(e)) {
			let t = [];
			for (let r of this.descriptor.fields[e]?.sensors ?? []) {
				let i = n(r);
				if (!i) return this.windows.set(e, null), null;
				t.push(i);
			}
			this.windows.set(e, t);
		}
		return this.windows.get(e) ?? null;
	}
}, Wh = class {
	constructor(e = {}) {
		this.readers = /* @__PURE__ */ new Map();
		for (let [t, n] of Object.entries(e)) this.readers.set(t, new Uh(n));
	}
	get size() {
		return this.readers.size;
	}
	read(e, t, n, r, i) {
		let a = this.readers.get(e);
		if (!a) return null;
		let o = t.endsWith("_history") ? t.slice(0, -8) : null;
		return o === null ? a.current(t, n, r, i) : a.historyOf(o);
	}
	advance(e, t, n) {
		for (let r of this.readers.values()) r.advance(e, t, n);
	}
	reset() {
		for (let e of this.readers.values()) e.reset();
	}
};
//#endregion
//#region src/core/onnx/slotReader/fields/util.ts
function Gh(e, t, n) {
	let r = new Float32Array(n), i = t * n;
	for (let t = 0; t < n; t++) r[t] = e[i + t] ?? 0;
	return r;
}
function Kh(e, t) {
	return Gh(e, t, 3);
}
function qh(e, t) {
	let n = t * 4;
	return new Float32Array([
		e[n] ?? 1,
		e[n + 1] ?? 0,
		e[n + 2] ?? 0,
		e[n + 3] ?? 0
	]);
}
function Jh(...e) {
	let t = new Float32Array(e.reduce((e, t) => e + t.length, 0)), n = 0;
	for (let r of e) t.set(r, n), n += r.length;
	return t;
}
function Yh(e, t) {
	let n = new Float32Array(t.length);
	for (let r = 0; r < t.length; r++) n[r] = e[t[r]] ?? 0;
	return n;
}
function Xh(e, t, n) {
	let r = n[0] ?? 0, i = n[1] ?? 0, a = n[2] ?? 0, o = (t[0] ?? 0) - (e[0] ?? 0), s = (t[1] ?? 0) - (e[1] ?? 0), c = (t[2] ?? 0) - (e[2] ?? 0);
	return new Float32Array([
		(n[3] ?? 0) - (i * c - a * s),
		(n[4] ?? 0) - (a * o - r * c),
		(n[5] ?? 0) - (r * s - i * o),
		r,
		i,
		a
	]);
}
function Zh(e) {
	return (t, n) => t.rootBodyId < 0 ? null : e(t.rootBodyId, n, t);
}
function Qh(e, t, n) {
	return (r, i) => {
		let a = e(r), o = new Float32Array(a.length * t);
		for (let e = 0; e < a.length; e++) o.set(n(a[e], e, i, r), e * t);
		return o;
	};
}
function $h(e, t, n, r) {
	let i = r - n;
	return (a, o) => {
		let s = e(a, o);
		if (!s) return null;
		let c = s.length / t, l = new Float32Array(c * i);
		for (let e = 0; e < c; e++) l.set(s.subarray(e * t + n, e * t + r), e * i);
		return l;
	};
}
//#endregion
//#region src/core/onnx/slotReader/fields/body.ts
var eg = (e) => e.bodyIds, tg = Qh(eg, 7, (e, t, n) => Jh(Kh(n.xpos, e), qh(n.xquat, e))), ng = Qh(eg, 6, (e, t, n, r) => Xh(Kh(n.xpos, e), Kh(n.subtree_com, r.rootBodyId), Gh(n.cvel, e, 6))), rg = Qh(eg, 7, (e, t, n, r) => Jh(Kh(n.xipos, e), Ds(qh(n.xquat, e), r.bodyIquat.subarray(t * 4, t * 4 + 4)))), ig = Qh(eg, 6, (e, t, n, r) => Xh(Kh(n.xipos, e), Kh(n.subtree_com, r.rootBodyId), Gh(n.cvel, e, 6))), ag = Qh(eg, 6, (e, t, n) => Gh(n.xfrc_applied, e, 6)), og = Qh(eg, 3, (e, t, n) => Gh(n.cvel, e, 6).subarray(0, 3)), sg = {
	body_link_pose_w: tg,
	body_link_vel_w: ng,
	body_com_pose_w: rg,
	body_com_vel_w: ig,
	body_external_wrench: ag,
	body_link_pos_w: Qh(eg, 3, (e, t, n) => Kh(n.xpos, e)),
	body_link_quat_w: Qh(eg, 4, (e, t, n) => qh(n.xquat, e)),
	body_link_lin_vel_w: $h(ng, 6, 0, 3),
	body_link_ang_vel_w: og,
	body_com_pos_w: Qh(eg, 3, (e, t, n) => Kh(n.xipos, e)),
	body_com_quat_w: $h(rg, 7, 3, 7),
	body_com_lin_vel_w: $h(ig, 6, 0, 3),
	body_com_ang_vel_w: og,
	body_external_force: $h(ag, 6, 0, 3),
	body_external_torque: $h(ag, 6, 3, 6)
}, cg = [
	0,
	0,
	-1
], lg = [
	1,
	0,
	0
], ug = {
	gravity_vec_w: () => Float32Array.from(cg),
	projected_gravity_b: Zh((e, t) => Float32Array.from(As(qh(t.xquat, e), cg))),
	heading_w: Zh((e, t) => {
		let n = ks(qh(t.xquat, e), lg);
		return new Float32Array([Math.atan2(n[1], n[0])]);
	})
}, dg = {
	actuator_force: (e, t) => Yh(t.actuator_force, e.ctrlIds),
	qfrc_actuator: (e, t) => Yh(t.qfrc_actuator, e.qvelAdr),
	qfrc_external: (e, t) => {
		let n = Yh(t.qfrc_smooth, e.qvelAdr), r = Yh(t.qfrc_actuator, e.qvelAdr), i = Yh(t.qfrc_applied, e.qvelAdr), a = Yh(t.qfrc_passive, e.qvelAdr), o = Yh(t.qfrc_bias, e.qvelAdr), s = new Float32Array(n.length);
		for (let e = 0; e < s.length; e++) s[e] = n[e] - r[e] - i[e] - a[e] + o[e];
		return s;
	}
}, fg = (e) => e.geomIds, pg = Qh(fg, 7, (e, t, n) => Jh(Kh(n.geom_xpos, e), Ns(Gh(n.geom_xmat, e, 9)))), mg = Qh(fg, 6, (e, t, n, r) => Xh(Kh(n.geom_xpos, e), Kh(n.subtree_com, r.rootBodyId), Gh(n.cvel, r.geomBodyIds[t], 6))), hg = {
	geom_pose_w: pg,
	geom_vel_w: mg,
	geom_pos_w: Qh(fg, 3, (e, t, n) => Kh(n.geom_xpos, e)),
	geom_quat_w: $h(pg, 7, 3, 7),
	geom_lin_vel_w: $h(mg, 6, 0, 3),
	geom_ang_vel_w: Qh(fg, 3, (e, t, n, r) => Gh(n.cvel, r.geomBodyIds[t], 6).subarray(0, 3))
}, gg = {
	joint_pos: (e, t) => Yh(t.qpos, e.qposAdr),
	joint_pos_biased: (e, t) => {
		let n = Yh(t.qpos, e.qposAdr);
		for (let t = 0; t < n.length; t++) n[t] += e.jointBias[t] ?? 0;
		return n;
	},
	joint_vel: (e, t) => Yh(t.qvel, e.qvelAdr),
	joint_acc: (e, t) => Yh(t.qacc, e.qvelAdr)
}, _g = (e, t) => qh(t.xquat, e), vg = (e, t) => Xh(Kh(t.xpos, e), Kh(t.subtree_com, e), Gh(t.cvel, e, 6)), yg = (e, t) => Xh(Kh(t.xipos, e), Kh(t.subtree_com, e), Gh(t.cvel, e, 6)), bg = (e, t, n) => Float32Array.from(Ds(qh(t.xquat, e), n.bodyIquat.subarray(0, 4))), xg = (e, t) => Gh(t.cvel, e, 6).subarray(0, 3), Sg = (e) => Zh((t, n) => Float32Array.from(As(_g(t, n), e(t, n)))), Cg = {
	root_link_pose_w: Zh((e, t) => Jh(Kh(t.xpos, e), _g(e, t))),
	root_link_vel_w: Zh(vg),
	root_com_pose_w: Zh((e, t, n) => Jh(Kh(t.xipos, e), bg(e, t, n))),
	root_com_vel_w: Zh(yg),
	root_link_pos_w: Zh((e, t) => Kh(t.xpos, e)),
	root_link_quat_w: Zh(_g),
	root_link_lin_vel_w: Zh((e, t) => vg(e, t).subarray(0, 3)),
	root_link_ang_vel_w: Zh(xg),
	root_com_pos_w: Zh((e, t) => Kh(t.xipos, e)),
	root_com_quat_w: Zh(bg),
	root_com_lin_vel_w: Zh((e, t) => yg(e, t).subarray(0, 3)),
	root_com_ang_vel_w: Zh(xg),
	root_link_lin_vel_b: Sg((e, t) => vg(e, t).subarray(0, 3)),
	root_link_ang_vel_b: Sg(xg),
	root_com_lin_vel_b: Sg((e, t) => yg(e, t).subarray(0, 3)),
	root_com_ang_vel_b: Sg(xg)
}, wg = (e) => e.siteIds, Tg = Qh(wg, 7, (e, t, n) => Jh(Kh(n.site_xpos, e), Ns(Gh(n.site_xmat, e, 9)))), Eg = Qh(wg, 6, (e, t, n, r) => Xh(Kh(n.site_xpos, e), Kh(n.subtree_com, r.rootBodyId), Gh(n.cvel, r.siteBodyIds[t], 6))), Dg = {
	site_pose_w: Tg,
	site_vel_w: Eg,
	site_pos_w: Qh(wg, 3, (e, t, n) => Kh(n.site_xpos, e)),
	site_quat_w: $h(Tg, 7, 3, 7),
	site_lin_vel_w: $h(Eg, 6, 0, 3),
	site_ang_vel_w: Qh(wg, 3, (e, t, n, r) => Gh(n.cvel, r.siteBodyIds[t], 6).subarray(0, 3))
}, Og = {
	tendon_len: (e, t) => Yh(t.ten_length, e.tendonIds),
	tendon_vel: (e, t) => Yh(t.ten_velocity, e.tendonIds)
}, kg = {
	...Cg,
	...sg,
	...hg,
	...Dg,
	...gg,
	...dg,
	...Og,
	...ug
};
//#endregion
//#region src/core/onnx/slotReader/index.ts
function Ag(e, t, n, r) {
	let i = e[t];
	if (typeof i == "number") return new Float32Array([i]);
	if (!i || typeof i.length != "number") return null;
	let a = i;
	if (!n) return Float32Array.from(a);
	let o = (r ?? []).slice(2).reduce((e, t) => e * t, 1), s = new Float32Array(n.length * o);
	for (let e = 0; e < n.length; e++) {
		let t = n[e] * o;
		for (let n = 0; n < o; n++) s[e * o + n] = a[t + n] ?? 0;
	}
	return s;
}
function jg(e, t) {
	let n = Rm(e, e.nsensor, e.name_sensoradr), r = n.indexOf(t);
	if (r < 0) {
		let e = Vm(t);
		r = n.findIndex((t) => t === e || Vm(t) === e);
	}
	return r < 0 ? null : {
		adr: e.sensor_adr[r],
		dim: e.sensor_dim[r]
	};
}
function Mg(e) {
	return typeof e == "object" && !!e && typeof e.getStateField == "function";
}
function Ng(e, t) {
	let n = t.shape;
	if (!n || n.length < 2) return e;
	let r = n.slice(1).reduce((e, t) => e * t, 1);
	if (e.length === r) return e;
	let i = new Float32Array(r);
	return i.set(e.subarray(0, Math.min(e.length, r))), i;
}
function Pg(e) {
	return typeof e == "object" && !!e && typeof e.getCommand == "function";
}
function Fg(e, t = {}) {
	let n = null, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = (e) => {
		e !== n && (n = e, r.clear(), i.clear());
	}, o = (e, n, r) => {
		let { mjModel: o, mjData: s, mujoco: c } = r;
		if (!o || !s || !c) return null;
		if (a(o), !i.has(e)) {
			let n = t.raycastSensors?.()[e];
			i.set(e, n ? new je(c, n) : null);
		}
		let l = i.get(e);
		return !l || !H(n) ? null : l.read(n, o, s);
	}, s = (e, n) => {
		a(e);
		let i = n ?? "", o = r.get(i);
		return o || (o = Um(e, n, t.jointBias), r.set(i, o)), o;
	};
	return (n) => {
		let r = e();
		if (!r) return null;
		if (n.command) {
			let e = r.commandManager?.getTerm(n.command);
			return (Mg(e) ? e.getStateField(n.field ?? "") : null) || (n.field === "command" && Pg(e) ? Ng(Float32Array.from(e.getCommand()), n) : null);
		}
		if (n.env) return n.env !== "episode_length_buf" || r.episodeLength === void 0 ? null : new Float32Array([r.episodeLength]);
		if (n.action) return n.action === "action" ? r.lastActions?.() ?? null : null;
		if (n.action_term) return r.actionTermField?.(n.action_term, n.field ?? "") ?? null;
		let { mjModel: i, mjData: a } = r;
		if (!i || !a) return null;
		if (n.sim) return Ag(a, n.sim, n.rows, n.shape);
		if (n.model) return Ym(i, n, r.modelDefaults);
		if (n.sensor) {
			if (n.field) return (t.contactSensors?.())?.read(n.sensor, n.field, i, a, (e) => jg(i, e)) || o(n.sensor, n.field, r);
			let e = jg(i, n.sensor);
			if (!e) return null;
			let s = new Float32Array(e.dim);
			for (let t = 0; t < e.dim; t++) s[t] = a.sensordata[e.adr + t] ?? 0;
			return s;
		}
		let c = n.field ? kg[n.field] : void 0;
		return c ? c(s(i, n.entity), a) : null;
	};
}
//#endregion
//#region src/core/rng.ts
var Ig = class {
	constructor(e) {
		this.seed = e, this.s0 = 0, this.s1 = 0, this.s2 = 0, this.s3 = 0, this.warnedRangeless = !1;
		let t = e >>> 0, n = () => {
			t = t + 2654435769 >>> 0;
			let e = t;
			return e = Math.imul(e ^ e >>> 16, 569420461) >>> 0, e = Math.imul(e ^ e >>> 15, 1935289751) >>> 0, (e ^ e >>> 15) >>> 0;
		};
		this.s0 = n(), this.s1 = n(), this.s2 = n(), this.s3 = n(), (this.s0 | this.s1 | this.s2 | this.s3) === 0 && (this.s0 = 1);
	}
	nextUint32() {
		let e = Math.imul(Lg(Math.imul(this.s1, 5) >>> 0, 7), 9) >>> 0 >>> 0, t = this.s1 << 9 >>> 0;
		return this.s2 = (this.s2 ^ this.s0) >>> 0, this.s3 = (this.s3 ^ this.s1) >>> 0, this.s1 = (this.s1 ^ this.s2) >>> 0, this.s0 = (this.s0 ^ this.s3) >>> 0, this.s2 = (this.s2 ^ t) >>> 0, this.s3 = Lg(this.s3, 11), e;
	}
	next() {
		return this.nextUint32() / 4294967296;
	}
	uniform(e, t) {
		return e + this.next() * (t - e);
	}
	randVector(e, t) {
		e > 0 && (t?.length ?? 0) < e && !this.warnedRangeless && (this.warnedRangeless = !0);
		let n = new Float32Array(e);
		for (let r = 0; r < e; r++) {
			let e = t?.[r];
			n[r] = e ? this.uniform(e[0], e[1]) : this.next();
		}
		return n;
	}
	getState() {
		return [
			this.s0,
			this.s1,
			this.s2,
			this.s3
		];
	}
	setState(e) {
		this.s0 = e[0] >>> 0, this.s1 = e[1] >>> 0, this.s2 = e[2] >>> 0, this.s3 = e[3] >>> 0;
	}
};
function Lg(e, t) {
	return (e << t | e >>> 32 - t) >>> 0;
}
//#endregion
//#region src/core/engine/runtime.ts
var Rg = 24301, zg = "xray";
function Bg(e, t) {
	if (!t.userData.injected) {
		t.isMesh && e.expandByObject(t);
		for (let n of t.children) Bg(e, n);
	}
}
var Vg = /* @__PURE__ */ new Float32Array(), Hg = /* @__PURE__ */ new Float32Array(), Ug = /* @__PURE__ */ new Set([
	"joint_position",
	"joint_position_reference",
	"joint_position_command",
	"joint_position_relative",
	"joint_velocity",
	"torque",
	"muscle_activation"
]);
function Wg(e) {
	let t = e.mode;
	return t === "sigmoid" || t === "direct" || t === "excitation" ? t : e.normalize === !1 ? "excitation" : "sigmoid";
}
var Gg = .02, Kg = .1;
function qg(e) {
	let t = /* @__PURE__ */ new Map(), n = e.encoder_bias, r = e.policy_joint_names;
	if (!Array.isArray(n) || !Array.isArray(r)) return t;
	for (let e = 0; e < r.length && e < n.length; e++) n[e] && t.set(r[e], n[e]);
	return t;
}
function Jg(e) {
	let t = {}, n = {}, r = [...Object.values(e.observations ?? {}), ...Object.values(e.terminations ?? {})];
	for (let e of r) for (let [r, i] of Object.entries(e?.sensors ?? {})) i.kind === "contact" ? n[r] = i : t[r] = i;
	return {
		raycast: t,
		contact: n
	};
}
function Yg(e) {
	return typeof e == "object" && !!e && typeof e.setSelectedMotion == "function";
}
var Xg = class extends Error {
	constructor() {
		super("This scene cannot be loaded because it exceeds the browser's WebAssembly 2 GB memory limit. Try closing other browser tabs or reloading the page to free memory."), this.name = "WasmMemoryLimitError";
	}
};
function Zg(e) {
	let t = e instanceof Error ? e.message : String(e);
	return t.includes("MjModel loading returned null") || t.includes("Could not allocate memory") || t.includes("memory allocation failed") || t.includes("bad_alloc");
}
var Qg = class {
	constructor(e, t, n = Rg, r = !1, i) {
		this.weldHold = new Wc(), this.grabInjected = !1, this.injectedWithoutPolicy = !1, this.injectedBodyIds = /* @__PURE__ */ new Set(), this.sceneHasPolicy = !1, this.sceneLoadedWithPolicy = !1, this.lastInferenceError = null, this.episodeLength = 0, this.disposed = !1, this.modelHasHands = !1, this.xrSupported = {
			vr: !1,
			ar: !1
		}, this.xrCheck = 0, this.xrSession = null, this.activeXr = null, this.enteringXr = !1, this.onXrChange = null, this.sceneXml = null, this.modelFormat = null, this.scenePrefixed = !1, this.currentPolicy = null, this.xrClock = new L(!1), this.xrFirstFrame = !0, this.groundsRig = !1, this.skin = null, this.xraySwitch = {
			label: "Xray",
			enabled: !1,
			apply: (e) => {
				this.xray = e, this.drawRobotUnderSkin();
			}
		}, this.xray = !1, this.robotThrough = new as(), this.cameraTracking = !0, this.jointBias = /* @__PURE__ */ new Map(), this.clipActions = null, this.raycastSensors = {}, this.contactSensors = new Wh(), this.onXrDeviceChange = () => {
			this.checkXrSupport();
		}, this.onXrSessionStart = () => {
			this.interaction.cancel(), this.preXrCameraOffset = this.camera.position.clone().sub(this.controls.target), this.xrClock.start(), this.xrFirstFrame = !0;
			let e = this.renderer.xr.getEnvironmentBlendMode() !== "opaque";
			e && this.passthrough.enter(), this.groundsRig = !e, this.groundsRig && this.xrRig.position.set(this.camera.position.x, 0, this.camera.position.z);
		}, this.onXrSessionEnd = () => {
			this.passthrough.exit(), this.groundsRig = !1, this.xrClock.stop(), this.xrRig.position.set(0, 0, 0), this.xrRig.quaternion.identity(), this.preXrCameraOffset &&= (this.camera.position.copy(this.controls.target).add(this.preXrCameraOffset), null), this.controls.update();
		}, this.render = () => {
			this.debugVizSet.update();
			let e = this.renderer.xr.isPresenting;
			if (this.mjData && this.cameraTracking && _l(this.mjData, this.camera, this.controls, this.cameraState, e), e) {
				let e = Math.min(this.xrClock.getDelta(), Kg);
				this.xrFirstFrame ? this.xrFirstFrame = !1 : (rl(this.xrRig, this.camera, this.renderer.xr.getSession(), e), this.groundsRig && we(this.xrRig, this.camera, this.mujoco, this.mjModel, this.mjData, e));
			} else this.controls.update();
			if (this.mjModel && this.mjData && this.bodies) {
				be(this.camera, this.lights);
				for (let [e, t] of this.lastSimState.bodies) {
					let n = this.bodies[e];
					n && (n.position.copy(t.position), n.quaternion.copy(t.quaternion));
				}
				this.skin?.update(this.bodies, performance.now(), this.mjModel, this.mjData), this.resizeHandBoneMeshes(), Fe(this.mujoco, this.mjData, this.lights), this.mujocoRoot && this.mujocoRoot.cylinders && Dt({
					cylinders: this.mujocoRoot.cylinders,
					spheres: this.mujocoRoot.spheres
				}, this.lastSimState.tendons);
			}
			this.preview.update(), this.renderer.render(this.scene, this.camera);
		}, this.onWindowResize = () => {
			let { width: e, height: t } = this.getSize();
			this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t);
		}, this.mujoco = e, this.archive = i, this.container = t, this.termSeed = n, this.commandManager = new mh(), this.debugVizSet = new Th(this.commandManager, () => ({
			mjModel: this.mjModel,
			mjData: this.mjData
		})), this.scenePlugins = {}, this.policyPlugins = {}, this.policyGraphs = new cp(), this.modelFieldDefaults = null, this.termRng = new Ig(n);
		let o = () => this.policyRunner?.getLastActions() ?? null;
		this.readOnnxSlot = Fg(() => ({
			mujoco: this.mujoco,
			mjModel: this.mjModel,
			mjData: this.mjData,
			commandManager: this.commandManager,
			episodeLength: this.episodeLength,
			lastActions: o,
			actionTermField: (e, t) => this.actionManager?.getStateField(e, t) ?? null,
			modelDefaults: this.modelFieldDefaults
		}), {
			jointBias: (e) => this.jointBias.get(e) ?? 0,
			raycastSensors: () => this.raycastSensors,
			contactSensors: () => this.contactSensors
		});
		let s = "/working";
		try {
			this.mujoco.FS.mkdir(s);
		} catch (e) {
			e && typeof e == "object" && "code" in e && e.code;
		}
		try {
			this.mujoco.FS.mount(this.mujoco.MEMFS, { root: "." }, s);
		} catch (e) {
			e && typeof e == "object" && "code" in e && e.code !== "EEXIST" && e.code;
		}
		let { width: c, height: l } = this.getSize();
		this.scene = new a(), this.scene.name = "scene", this.camera = new re(45, c / l, .001, 1e3), this.camera.name = "PerspectiveCamera", this.camera.position.set(2, 1.7, 1.7), this.xrRig = new B(), this.xrRig.name = "XR Rig", this.xrRig.add(this.camera), this.scene.add(this.xrRig), this.renderer = new ne({ antialias: !0 }), this.renderer.xr.enabled = !0, this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(c, l), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = 2, this.renderer.outputColorSpace = Pe, this.renderer.toneMapping = 0, this.container.appendChild(this.renderer.domElement);
		let u = [0, 1].map((e) => this.renderer.xr.getHand(e)), d = new vt();
		for (let e of u) e.add(d.createHandModel(e, "spheres")), this.xrRig.add(e);
		this.handMocap = new Uc(u, this.weldHold), this.handTrackingEnabled = r, this.checkXrSupport(), navigator.xr?.addEventListener("devicechange", this.onXrDeviceChange), this.controls = new $e(this.camera, this.renderer.domElement), this.controls.target.set(0, .2, 0), this.controls.panSpeed = 2, this.controls.zoomSpeed = 1, this.controls.enableDamping = !0, this.controls.dampingFactor = .1, this.controls.screenSpacePanning = !0, this.controls.update(), this.interaction = new Xs({
			scene: this.scene,
			renderer: this.renderer,
			camera: this.camera,
			container: this.container,
			controls: this.controls,
			sim: () => this.interactionSim(),
			weld: this.weldHold
		}), this.passthrough = new fl(this.scene), this.preview = new bc(this.scene, this.renderer.domElement, this.camera), this.picker = new $s(e), this.preXrCameraOffset = null, this.renderer.xr.addEventListener("sessionstart", this.onXrSessionStart), this.renderer.xr.addEventListener("sessionend", this.onXrSessionEnd), this.renderer.setAnimationLoop(this.render), window.addEventListener("resize", this.onWindowResize), "ResizeObserver" in window ? (this.resizeObserver = new ResizeObserver(() => this.onWindowResize()), this.resizeObserver.observe(this.container)) : this.resizeObserver = null, this.lastSimState = {
			bodies: /* @__PURE__ */ new Map(),
			tendons: Ot()
		}, this.dynamicBodyIds = null, this.mjModel = null, this.mjData = null, this.bodies = null, this.lights = [], this.mujocoRoot = null, this.loopPromise = null, this.running = !1, this.timestep = .001, this.decimation = 1, this.controlDt = null, this.loadingScene = null, this.policyRunner = null, this.policyStateBuilder = null, this.initialQpos = null, this.initialQvel = null, this.actionManager = null, this.onnxModule = null, this.onnxInputDict = null, this.onnxInferencing = !1, this.onnxTimeStep = 0, this.clipActions = null, this.terminationManager = null, this.eventManager = null, this.terrainData = null, this.splatMesh = null, this.colliderMesh = null, this.currentSplatTransform = {}, this.cameraState = {
			trackBodyId: null,
			prevBodyPos: null
		};
	}
	async loadEnvironment(e) {
		await this.stop(), this.scenePlugins = e.plugins ?? {}, this.terrainData = e.terrainData ?? null, this.sceneHasPolicy = !!e.policy, this.sceneLoadedWithPolicy = !!e.policy, this.controlDt = e.controlDt && e.controlDt > 0 ? e.controlDt : null, this.termRng = new Ig(this.termSeed), this.eventManager = null, this.modelFieldDefaults = null, this.splatMesh &&= ($o(this.splatMesh, this.scene), null), this.colliderMesh &&= (ts(this.colliderMesh, this.scene), null), this.disposeSkin(), this.initializeCommands(), this.releaseModel(), this.bodies = null, this.lights = [], this.mujocoRoot = null, this.dynamicBodyIds = null, await this.buildSceneFromModel(e.model, e.modelFormat ?? "mjz"), this.mjModel && (this.modelFieldDefaults = new Zm(this.mjModel)), e.splat && await this.applySplat(e.splat), e.skin && await this.applySkin(e.skin), await this.loadPolicyConfig(e.policy ?? null), this.applyViewerConfig(e.viewer ?? null), this.running = !0, this.startLoop();
	}
	eventContext() {
		return {
			mujoco: this.mujoco,
			mjModel: this.mjModel,
			mjData: this.mjData,
			modelDefaults: this.modelFieldDefaults,
			terrainData: this.terrainData
		};
	}
	initializeCommands() {
		this.commandManager.clear();
	}
	initializeCommandsFromConfig(e, t) {
		this.commandManager.initialize(e, t, this.policyPlugins.commands);
	}
	resetSimulation() {
		this.resetSimulationState().catch((e) => {});
	}
	async setSelectedMotion(e) {
		let t = this.commandManager.getTerm("motion");
		if (!Yg(t)) return !1;
		let n = await t.setSelectedMotion(e);
		return n && this.resetSimulation(), n;
	}
	getSelectedMotionName() {
		let e = this.commandManager.getTerm("motion");
		return Yg(e) ? e.getSelectedMotionName?.() ?? null : null;
	}
	async buildScene(e) {
		this.loadingScene && await this.loadingScene, this.loadingScene = (async () => {
			let t = this.scene.getObjectByName("MuJoCo Root");
			t && this.scene.remove(t);
			let n = { scene: this.scene };
			if ([this.mjModel, this.mjData, this.bodies, this.lights] = await Ft(this.mujoco, e, n), !this.mjModel || !this.mjData) throw Error("Failed to load MuJoCo model.");
			this.mujocoRoot = this.scene.getObjectByName("MuJoCo Root"), this.passthrough.refresh(), this.mujoco.mj_forward(this.mjModel, this.mjData), Fe(this.mujoco, this.mjData, this.lights), be(this.camera, this.lights), this.dynamicBodyIds = this.computeDynamicBodyIds(this.mjModel), this.syncStaticBodiesFromData(), this.modelHasHands ? this.handMocap.bind(this.mujoco, this.mjModel) : this.handMocap.clear(), this.weldHold.bind(this.mujoco, this.mjModel, [...this.grabInjected ? [Ws] : [], ...this.modelHasHands ? zc() : []]), this.modelHasHands && this.handMocap.park(this.mjData), this.injectedBodyIds = this.collectInjectedBodyIds();
			for (let e of this.injectedBodyIds) this.bodies[e] && (this.bodies[e].userData.injected = !0);
			this.timestep = this.mjModel.opt.timestep || .001, this.decimation = Math.max(1, Math.round((this.controlDt ?? Gg) / this.timestep)), this.lastSimState.bodies.clear(), this.updateCachedState(), this.interaction.onSceneLoaded(), this.preview.onSceneLoaded(), this.loadingScene = null;
		})(), await this.loadingScene;
	}
	releaseModel() {
		this.mjData?.delete(), this.mjModel?.delete(), this.mjData = null, this.mjModel = null;
	}
	async buildSceneFromModel(e, t) {
		try {
			let n;
			if (this.modelFormat = t, t === "mjb") n = "scene.mjb", this.mujoco.FS.writeFile(`/working/${n}`, new Uint8Array(e)), this.sceneXml = null, this.scenePrefixed = !1, this.grabInjected = !1, this.injectedWithoutPolicy = !1, this.modelHasHands = !1;
			else {
				n = await Wt(this.mujoco, e, this.archive);
				let t = Vs(this.mujoco, `/working/${n}`);
				this.sceneXml = {
					file: n,
					text: t
				}, this.scenePrefixed = Hs(t), this.injectViewerBodies(this.wantsHands());
			}
			await this.buildScene(n);
		} catch (e) {
			throw this.loadingScene = null, Zg(e) ? new Xg() : e;
		}
	}
	injectViewerBodies(e) {
		if (!this.sceneXml) return;
		let { file: t, text: n } = this.sceneXml, r = n;
		this.modelHasHands = e, e && (r = Hc(r)), this.grabInjected = this.scenePrefixed || !this.policyScene, this.injectedWithoutPolicy = (this.grabInjected || e) && !this.scenePrefixed, this.grabInjected && (r = Ks(r)), this.mujoco.FS.writeFile(`/working/${t}`, r);
	}
	async startLoop() {
		if (this.disposed) this.running = !1;
		else return this.loopPromise ||= (this.running = !0, this.mainLoop()), this.loopPromise;
	}
	async setSplat(e) {
		this.splatMesh &&= ($o(this.splatMesh, this.scene), null), this.colliderMesh &&= (ts(this.colliderMesh, this.scene), null), e && await this.applySplat(e);
	}
	async applySplat(e) {
		this.currentSplatTransform = e.transform ?? {}, this.splatMesh = Qo(e.data, this.currentSplatTransform, this.scene), e.collider && (this.colliderMesh = await es(e.collider, this.scene));
	}
	async setSkin(e) {
		this.disposeSkin(), e && await this.applySkin(e);
	}
	async applySkin(e) {
		try {
			let { Skin: t } = await import("./assets/skin-Cs5S_Duy.js"), n = await t.load(e.data, e.config);
			if (this.disposed || !this.mjModel) {
				n.dispose();
				return;
			}
			n.bind(this.mujoco, this.mjModel), this.scene.add(n.root), this.skin = n, this.drawRobotUnderSkin(), n.hiddenBodies.length && this.debugVizSet.addSwitch(zg, this.xraySwitch);
		} catch {}
	}
	disposeSkin() {
		let e = this.skin;
		e && (this.skin = null, this.debugVizSet.removeSwitch(zg), this.robotThrough.restore(), this.drawRobot(e.hiddenBodies, !0), e.dispose());
	}
	drawRobotUnderSkin() {
		let e = this.skin;
		if (!e) return;
		let t = this.xray && !!this.bodies;
		t ? this.robotThrough.apply(e.hiddenBodies.map((e) => this.bodies[e])) : this.robotThrough.restore(), this.drawRobot(e.hiddenBodies, t);
	}
	drawRobot(e, t) {
		if (this.bodies) for (let n of e) this.bodies[n]?.traverse((e) => {
			if (!e.isMesh) return;
			let n = e.material;
			for (let e of Array.isArray(n) ? n : [n]) e.visible = t;
		});
	}
	calibrateSplat(e) {
		this.currentSplatTransform = e, this.splatMesh && Zo(this.splatMesh, e);
	}
	setSplatVisible(e) {
		this.splatMesh && (this.splatMesh.visible = e);
	}
	get commands() {
		return this.commandManager;
	}
	get debugViz() {
		return this.debugVizSet;
	}
	get seed() {
		return this.termSeed;
	}
	eventControls() {
		return this.eventManager?.controls() ?? [];
	}
	async fireEvent(e) {
		if (this.eventManager && this.mjModel && this.mjData) {
			try {
				await this.eventManager.fire(e, this.eventContext());
			} catch {
				return;
			}
			!this.running && this.mjModel && this.mjData && (this.mujoco.mj_forward(this.mjModel, this.mjData), this.updateCachedState());
		}
	}
	setEventArmed(e, t) {
		this.eventManager?.setArmed(e, t);
	}
	play() {
		this.running = !0, this.startLoop();
	}
	pause() {
		this.interaction.cancel(), this.stop();
	}
	getInteractionMode() {
		return this.interaction.getMode();
	}
	setInteractionMode(e) {
		this.interaction.setMode(e);
	}
	getInteractionParams(e) {
		return this.interaction.getParams(e);
	}
	setInteractionParam(e, t, n) {
		this.interaction.setParam(e, t, n);
	}
	interactionModes() {
		return this.interaction.report();
	}
	cancelInteraction() {
		this.interaction.cancel();
	}
	interactionSim() {
		return {
			mujoco: this.mujoco,
			mjModel: this.mjModel,
			mjData: this.mjData,
			dynamicBodyIds: this.dynamicBodyIds,
			controlDt: this.timestep * this.decimation
		};
	}
	xrSessions() {
		return ll(this.xrSupported, this.activeXr);
	}
	handTrackingReport() {
		if (!this.xrSupported.vr) return null;
		let e = this.handTrackingBlockerNow();
		return e === null ? {
			available: !0,
			enabled: this.handTrackingEnabled
		} : {
			available: !1,
			reason: e,
			enabled: this.handTrackingEnabled
		};
	}
	setHandTracking(e) {
		e !== this.handTrackingEnabled && (this.handTrackingEnabled = e, this.onXrChange?.());
	}
	async requestXr(e) {
		let t = navigator.xr;
		if (this.disposed || !t || !this.xrSupported[e] || this.enteringXr || this.xrSession) return null;
		this.enteringXr = !0;
		let n = this.wantsHands();
		try {
			let r = await t.requestSession(sl[e], ul(e, n));
			return this.xrSession = r, r.addEventListener("end", () => this.onXrSessionClosed(r), { once: !0 }), {
				id: e,
				session: r,
				hands: n
			};
		} catch (e) {
			throw this.enteringXr = !1, e;
		}
	}
	async startXr(e, t) {
		let { id: n, session: r } = e;
		try {
			if (this.disposed || this.xrSession !== r) {
				await r.end().catch(() => {});
				return;
			}
			let i = e.hands && this.wantsHands();
			try {
				if ((i !== this.modelHasHands || !this.mjModel) && this.sceneXml && (t?.(i), await this.rebuildModel(i)), this.xrSession !== r) return;
				this.renderer.xr.setReferenceSpaceType("local-floor"), await this.renderer.xr.setSession(r);
			} catch (e) {
				throw await r.end().catch(() => {}), e;
			}
			this.activeXr = n, this.onXrChange?.();
		} finally {
			this.enteringXr = !1;
		}
	}
	async exitXr() {
		await this.xrSession?.end();
	}
	onXrSessionClosed(e) {
		this.xrSession === e && (this.xrSession = null, this.activeXr = null, this.onXrChange?.());
	}
	wantsHands() {
		return this.handTrackingEnabled && this.xrSupported.vr && this.handTrackingBlockerNow() === null;
	}
	handTrackingBlockerNow() {
		return this.modelFormat === null ? null : dl({
			format: this.modelFormat,
			prefixed: this.scenePrefixed,
			hasPolicy: this.policyScene
		});
	}
	get policyScene() {
		return this.sceneHasPolicy || this.sceneLoadedWithPolicy;
	}
	async checkXrSupport() {
		let e = navigator.xr;
		if (!e) return;
		let t = ++this.xrCheck, n = await Promise.all(ol.map(async (t) => {
			try {
				return await e.isSessionSupported(sl[t]);
			} catch {
				return !1;
			}
		}));
		if (this.disposed || t !== this.xrCheck) return;
		let r = { ...this.xrSupported };
		ol.forEach((e, t) => {
			r[e] = n[t];
		});
		let i = ol.some((e) => r[e] !== this.xrSupported[e]);
		this.xrSupported = r, i && this.onXrChange?.();
	}
	async rebuildModel(e) {
		let t = this.running;
		await this.stop(), this.interaction.cancel();
		let n = this.getSelectedMotionName(), r = this.commandManager.getValues(), i = this.debugVizSet.entries(), a = this.eventManager?.controls().filter((e) => e.kind === "interval") ?? [], o = { module: this.onnxModule };
		this.commandManager.clear(), this.eventManager = null, this.onnxModule = null, this.modelFieldDefaults = null, this.robotThrough.restore(), this.releaseModel(), this.bodies = null, this.lights = [], this.mujocoRoot = null, this.dynamicBodyIds = null, this.injectViewerBodies(e);
		try {
			await this.buildScene(this.sceneXml.file);
		} catch (e) {
			throw this.loadingScene = null, this.releaseModel(), await o.module?.dispose(), Zg(e) ? new Xg() : e;
		}
		this.mjModel && (this.modelFieldDefaults = new Zm(this.mjModel)), this.drawRobotUnderSkin(), await this.loadPolicyConfig(this.currentPolicy, o), n !== null && await this.setSelectedMotion(n);
		for (let [e, t] of Object.entries(r)) this.commandManager.setValue(e, t);
		for (let { id: e, enabled: t } of i) this.debugVizSet.set(e, t);
		for (let { name: e, armed: t } of a) this.setEventArmed(e, t);
		t && (this.running = !0, this.startLoop());
	}
	get isRunning() {
		return this.running;
	}
	getCameraView() {
		let e = de(this.camera.position.clone().sub(this.controls.target)), t = de(this.controls.target.clone());
		return {
			lookat: [
				t.x,
				t.y,
				t.z
			],
			...hl(e),
			fovy: this.camera.fov
		};
	}
	get isCameraTracking() {
		return this.cameraTracking;
	}
	setCameraTracking(e) {
		if (e && !this.cameraTracking) {
			let e = this.cameraState.trackBodyId;
			if (e !== null && this.mjData) {
				let t = ce(this.mjData.xpos.slice(e * 3, e * 3 + 3));
				this.camera.position.add(t.clone().sub(this.controls.target)), this.controls.target.copy(t), this.controls.update();
			}
			this.cameraState.prevBodyPos = null;
		}
		this.cameraTracking = e;
	}
	setCameraView(e) {
		let t = this.getCameraView(), n = e.lookat ?? t.lookat, r = e.distance ?? t.distance, i = e.elevation ?? t.elevation, a = e.azimuth ?? t.azimuth;
		this.camera.fov = e.fovy ?? t.fovy, this.camera.updateProjectionMatrix(), this.camera.position.copy(ml(n, r, i, a)), this.controls.target.copy(ce(n)), this.controls.update();
	}
	showPreview(e) {
		this.preview.show(e, this.mjModel ? oe(this.mjModel) : 1);
	}
	hidePreview() {
		this.preview.hide();
	}
	previewHit(e, t) {
		return this.preview.hit(e, t);
	}
	onPreviewChange(e) {
		return this.preview.onChange(e);
	}
	pickSurface(e, t) {
		if (!this.mjModel || !this.mjData) return null;
		let n = this.renderer.domElement.getBoundingClientRect();
		return this.picker.pick(this.mjModel, this.mjData, this.camera, n, e, t);
	}
	frameCamera() {
		if (!this.mujocoRoot) return;
		let e = new ae();
		if (Bg(e, this.mujocoRoot), e.isEmpty()) return;
		let t = e.getCenter(new z()), n = e.getSize(new z()).length(), r = this.camera.fov * Math.PI / 180, i = n / (2 * Math.tan(r / 2)), a = this.getCameraView(), o = de(t);
		this.setCameraView({
			lookat: [
				o.x,
				o.y,
				o.z
			],
			distance: i > 0 ? i : a.distance
		});
	}
	async stop() {
		this.running = !1;
		let e = this.loopPromise;
		e && await e, this.loopPromise = null;
	}
	async mainLoop() {
		try {
			await this.runLoop();
		} catch {
			this.running = !1;
		} finally {
			this.loopPromise = null;
		}
	}
	async runLoop() {
		let e = performance.now();
		for (; this.running;) {
			let t = this.timestep * this.decimation;
			if (this.mjModel && this.mjData) {
				if (this.policyRunner && this.policyStateBuilder) {
					let e = this.policyStateBuilder.build(), t = await this.policyRunner.collectObservationsByKey(e), n = await this.runOnnxInference(t);
					await this.processActions(n);
				}
				this.executeSimulationSteps(), this.episodeLength += 1;
				let e = !1, n = this.terminationManager;
				if (n && this.policyStateBuilder) {
					let t = this.policyStateBuilder.build();
					if ((await n.evaluate(t)).done) {
						e = !0;
						try {
							await this.resetSimulationState({ forward: !1 });
						} catch {}
						n.reset();
					}
				}
				this.mujoco.mj_forward(this.mjModel, this.mjData), this.updateCachedState(), this.commandManager.update(t, e), this.debugVizSet.update();
				try {
					await this.eventManager?.tick(t, this.eventContext());
				} catch {}
			}
			let n = performance.now();
			e = Fp(e, n, t * 1e3), e > n ? await new Promise((t) => setTimeout(t, e - n)) : await Bp();
		}
	}
	async loadPolicyConfig(e, t) {
		let n = this.onnxModule;
		this.currentPolicy = e, this.sceneHasPolicy = e !== null, this.policyPlugins = e?.plugins ?? {}, this.policyRunner = null, this.policyStateBuilder = null, this.actionManager = null, this.onnxModule = null, this.onnxInputDict = null, this.onnxInferencing = !1, this.onnxTimeStep = 0, this.lastInferenceError = null, this.terminationManager = null, this.eventManager = null, this.commandManager.clear(), await n?.dispose(), t || await this.policyGraphs.clear(), this.jointBias.clear(), this.clipActions = null, this.raycastSensors = {}, this.contactSensors = new Wh(), this.debugVizSet.clear();
		let r = this.modelFieldDefaults?.restore() ?? !1;
		if (r && this.mjModel && this.mjData && this.mujoco.mj_setConst(this.mjModel, this.mjData), this.termRng = new Ig(this.termSeed), !e) r && this.mjModel && this.mjData && (this.mujoco.mj_forward(this.mjModel, this.mjData), this.updateCachedState());
		else if (this.mjModel && this.mjData) {
			this.injectedWithoutPolicy;
			try {
				let n = e.config;
				t || await this.policyGraphs.load(e.graphs ?? []), n.events && n.events.length > 0 && (this.eventManager = new Hh(n.events, {
					...this.scenePlugins.events,
					...this.policyPlugins.events
				}, {
					sessions: this.policyGraphs,
					rng: this.termRng,
					readSlot: this.readOnnxSlot
				}), await this.eventManager.startup(this.eventContext()), this.mujoco.mj_forward(this.mjModel, this.mjData)), this.jointBias = qg(n), this.clipActions = Nl(n.clip_actions);
				let r = Jg(n);
				if (this.raycastSensors = r.raycast, this.contactSensors = new Wh(r.contact), this.debugVizSet.load(n.debug_vis, this.mujoco, this.mujocoRoot ?? this.scene), Array.isArray(n.motions)) {
					let t = new Map(e.motions.map((e) => [e.name, e.data]));
					n.motions = n.motions.map((e) => ({
						...e,
						data: t.get(e.name)
					}));
				}
				if (n.commands?.motion && Array.isArray(n.motions) && (n.commands.motion = {
					...n.commands.motion,
					motions: n.motions
				}), this.initialQpos = Array.isArray(n.initial_qpos) ? n.initial_qpos : null, this.initialQvel = Array.isArray(n.initial_qvel) ? n.initial_qvel : null, await this.resetSimulationState(), n.commands && typeof n.commands == "object") {
					this.initializeCommandsFromConfig(n.commands, {
						mujoco: this.mujoco,
						mjModel: this.mjModel,
						mjData: this.mjData,
						scene: this.scene,
						bodies: this.bodies,
						mujocoRoot: this.mujocoRoot,
						requestReset: () => this.resetSimulation(),
						rng: this.termRng,
						onnxSessions: this.policyGraphs,
						readOnnxSlot: this.readOnnxSlot
					});
					let e = this.commandManager.getTerm("motion");
					Yg(e) && await e.setSelectedMotion(n.motions?.find((e) => e.default)?.name ?? n.motions?.[0]?.name ?? null), this.mujoco.mj_forward(this.mjModel, this.mjData), this.updateCachedState();
				}
				if (!n.policy_num_actions && (!n.policy_joint_names || n.policy_joint_names.length === 0)) throw Error("Policy config missing policy_joint_names.");
				let i = new mm(n, {
					policyModules: {
						tracking: Cm,
						locomotion: Tm
					},
					observations: { ...this.policyPlugins.observations },
					motions: e.motions,
					onnxSessions: this.policyGraphs,
					readOnnxSlot: this.readOnnxSlot
				});
				await i.init({
					mujoco: this.mujoco,
					mjModel: this.mjModel,
					mjData: this.mjData,
					scene: this.scene,
					commandManager: this.commandManager
				}), await i.preloadAll(), this.policyRunner = i, this.policyStateBuilder = new bm(this.mujoco, this.mjModel, this.mjData, i.getPolicyJointNames());
				let a = this.policyStateBuilder.build();
				this.policyRunner.reset(a);
				let o = this.buildActionManager(n, i, this.policyStateBuilder);
				await o?.reset(), this.actionManager = o, await this.commandManager.resetTerms(), this.mujoco.mj_forward(this.mjModel, this.mjData), this.updateCachedState(), n.terminations && Object.keys(n.terminations).length > 0 && (this.terminationManager = new Zp(n.terminations, { ...this.policyPlugins.terminations }, i, {
					onnxSessions: this.policyGraphs,
					readOnnxSlot: this.readOnnxSlot,
					episodeLength: () => this.episodeLength,
					stepDt: this.timestep * this.decimation
				}));
				let s = t?.module ?? new ym(e.onnx, {
					in_keys: n.in_keys,
					out_keys: n.out_keys
				});
				s !== t?.module && await s.init(), this.onnxModule = s, this.onnxInputDict = s.initInput();
			} catch (e) {
				throw await t?.module?.dispose(), this.policyRunner = null, this.policyStateBuilder = null, this.actionManager = null, this.onnxModule = null, this.onnxInputDict = null, this.terminationManager = null, this.eventManager = null, this.currentPolicy = null, this.sceneHasPolicy = !1, e;
			}
		}
	}
	buildActionManager(e, t, n) {
		let r = t.getPolicyJointNames(), i = this.targetActuatorTest(), a = (n, a, o, s, c) => {
			let l = o.qposAdr.length, u = o.jointNames ?? o.actionIndices.map((e) => r[e]), d = this.normalizeControlArray(s.scale, l, 1, u), f = this.normalizeControlArray(s.offset, l, 0, u), p = new Float32Array(l), m = new Float32Array(l);
			if (!o.jointNames) {
				let n = c ? t.getDefaultJointPos() : new Float32Array(r.length), i = Array.isArray(e.encoder_bias) ? Float32Array.from(e.encoder_bias) : new Float32Array(r.length);
				for (let e = 0; e < l; e++) p[e] = n[o.actionIndices[e]], m[e] = i[o.actionIndices[e]] ?? 0;
			}
			let h = this.normalizeControlArray(s.stiffness, l, 0, u), g = this.normalizeControlArray(s.damping, l, 0, u), { clipLo: _, clipHi: v } = Ml(s.clip, u, l), y = o.ctrlAdr.map(i);
			return y.some(Boolean), y.some((e) => !e) && a !== "torque" && (a === "joint_velocity" ? g : h).every((e) => e === 0), {
				controlType: a,
				ctrlAdr: o.ctrlAdr,
				qposAdr: o.qposAdr,
				qvelAdr: o.qvelAdr,
				actionIndices: o.actionIndices,
				actionScale: d,
				actionOffset: f,
				defaultJointPos: p,
				encoderBias: m,
				positionActuator: y,
				kp: h,
				kd: g,
				muscleMode: "sigmoid",
				muscleCtrlLo: Hg,
				muscleCtrlHi: Hg,
				clipLo: _,
				clipHi: v,
				processed: new Float32Array(l),
				active: !1,
				...Cl(s, u, n, this.termRng)
			};
		}, o = e.actions;
		if (!o || Object.keys(o).length === 0) {
			let t = e.control_type ?? "joint_position";
			if (t !== "joint_position" && t !== "torque") return null;
			let r = n.getControlMapping();
			return r ? new Il([{
				name: "legacy",
				term: a("legacy", t, {
					...r,
					actionIndices: Array.from({ length: r.qposAdr.length }, (e, t) => t)
				}, {
					type: t,
					scale: e.action_scale,
					stiffness: e.stiffness,
					damping: e.damping
				}, !0)
			}]) : null;
		}
		let s = [];
		for (let [e, t] of Object.entries(o)) {
			let i = t.type ?? "joint_position";
			if (!Ug.has(i)) continue;
			let o = t.actuator_names ?? [".*"];
			if (i === "muscle_activation") {
				let r = n.getCtrlMappingByActuatorNames(o);
				if (!r) continue;
				let a = r.ctrlAdr.length, c = this.normalizeControlArray(t.scale, a, 1), l = this.normalizeControlArray(t.offset, a, 0), u = Wg(t), d = this.mjModel?.actuator_ctrlrange, f = new Float32Array(a), p = new Float32Array(a);
				for (let e = 0; e < a; e++) {
					let t = r.ctrlAdr[e];
					f[e] = d?.[2 * t] ?? -1, p[e] = d?.[2 * t + 1] ?? 1;
				}
				s.push({
					name: e,
					term: {
						controlType: i,
						ctrlAdr: r.ctrlAdr,
						qposAdr: [],
						qvelAdr: [],
						actionIndices: r.actionIndices,
						actionScale: c,
						actionOffset: l,
						defaultJointPos: new Float32Array(a),
						encoderBias: new Float32Array(a),
						positionActuator: Array(a).fill(!1),
						kp: new Float32Array(a),
						kd: new Float32Array(a),
						muscleMode: u,
						muscleCtrlLo: f,
						muscleCtrlHi: p,
						...Ml(t.clip, r.ctrlAdr.map((e, t) => o[t] ?? ""), a),
						processed: new Float32Array(a),
						active: !1,
						rampFrom: null,
						holdS: null,
						holding: !1,
						delays: []
					}
				});
				continue;
			}
			let c = o.length === 1 && o[0] === ".*", l;
			if (i === "joint_position_command") {
				l = n.getModelControlMappingFor(o);
				let e = String(t.command_name), r = this.commandManager.getCommand(e).length;
				if (l && r !== l.qposAdr.length) continue;
			} else if (c) {
				let e = n.getControlMapping();
				if (!e) continue;
				l = {
					...e,
					actionIndices: Array.from({ length: e.qposAdr.length }, (e, t) => t)
				};
			} else l = n.getControlMappingFor(o, r);
			if (!l) continue;
			let u = i === "joint_velocity" ? !1 : i === "joint_position_reference" ? !0 : t.use_default_offset === void 0 ? i === "joint_position" : t.use_default_offset, d = a(e, i, l, t, u);
			(i === "joint_position_reference" || i === "joint_position_command") && (d.commandName = String(t.command_name ?? "motion"));
			let f = t.process ? this.buildTracedProcess(e, t) : null;
			(!t.process || f) && s.push({
				name: e,
				term: d,
				traced: f
			});
		}
		return s.length === 0 ? null : new Il(s);
	}
	targetActuatorTest() {
		let e = {
			affine: this.mujoco.mjtBias?.mjBIAS_AFFINE?.value ?? 1,
			dcMotor: this.mujoco.mjtBias?.mjBIAS_DCMOTOR?.value ?? 3
		};
		return (t) => this.mjModel ? Sl(this.mjModel, t, e) : !1;
	}
	buildTracedProcess(e, t) {
		let n = t.process, r = t.reset ?? null, i = this.policyGraphs.get(n.onnx), a = r ? this.policyGraphs.get(r.onnx) : null;
		return !i || r && !a ? null : new jp(e, n, r, {
			process: i,
			reset: a,
			rng: this.termRng,
			readSlot: this.readOnnxSlot
		});
	}
	normalizeControlArray(e, t, n, r) {
		let i = new Float32Array(t);
		if (i.fill(n), typeof e == "number") return i.fill(e), i;
		if (Array.isArray(e)) {
			for (let r = 0; r < t; r++) i[r] = typeof e[r] == "number" ? e[r] : n;
			return i;
		}
		if (typeof e == "object" && e && r) {
			for (let [n, a] of Object.entries(e)) {
				let e = r.indexOf(n);
				e >= 0 && e < t && (i[e] = a);
			}
			return i;
		}
		return i;
	}
	async resetSimulationState({ forward: e = !0 } = {}) {
		if (this.mjModel && this.mjData) {
			if (this.mjModel.nkey > 0 ? this.mujoco.mj_resetDataKeyframe(this.mjModel, this.mjData, 0) : this.mujoco.mj_resetData(this.mjModel, this.mjData), this.initialQpos) {
				let e = this.mjData.qpos;
				for (let t = 0; t < Math.min(this.initialQpos.length, this.mjModel.nq); t++) e[t] = this.initialQpos[t];
			}
			if (this.initialQvel) {
				let e = this.mjData.qvel;
				for (let t = 0; t < Math.min(this.initialQvel.length, this.mjModel.nv); t++) e[t] = this.initialQvel[t];
			}
			this.modelHasHands && this.handMocap.park(this.mjData), this.interaction.onReset(), this.contactSensors.reset(), this.actionManager?.resetActuators(), this.onnxModule && (this.onnxInputDict = this.onnxModule.initInput()), this.onnxTimeStep = 0, this.episodeLength = 0, this.lastSimState.bodies.clear(), await Np({
				events: this.eventManager,
				policy: this.policyRunner,
				actions: this.actionManager,
				commands: this.commandManager,
				context: this.eventContext(),
				buildState: () => this.policyStateBuilder?.build()
			}), e && this.mjModel && this.mjData && (this.mujoco.mj_forward(this.mjModel, this.mjData), this.updateCachedState());
		}
	}
	executeSimulationSteps() {
		this.mjModel && this.mjData && (this.interaction.preStep(), this.modelHasHands && this.handMocap.update(this.mjModel, this.mjData), Fl(this.mujoco, this.mjModel, this.mjData, this.actionManager?.terms ?? [], this.decimation, void 0, this.contactSensors.size > 0 ? () => this.advanceContactSensors() : void 0));
	}
	async processActions(e) {
		let t = this.actionManager;
		if (t) {
			this.refreshActionCommands(t);
			try {
				await t.process(this.policyRunner?.getLastActions() ?? Vg, {
					episodeLength: this.episodeLength,
					stepDt: this.timestep * this.decimation
				}, { fresh: e });
			} catch {}
		}
	}
	refreshActionCommands(e) {
		for (let t of e.terms) {
			if (t.commandName === void 0) continue;
			let e = this.commandManager.getTerm(t.commandName);
			t.controlType === "joint_position_command" ? t.commandValue = e?.getCommand() ?? null : t.referenceJointPos = e?.getStateField?.("tracked_joint_pos") ?? null;
		}
	}
	advanceContactSensors() {
		if (!this.mjModel || !this.mjData) return;
		let e = this.mjModel;
		this.contactSensors.advance(e, this.mjData, (t) => jg(e, t));
	}
	async runOnnxInference(e) {
		let t = this.onnxModule;
		if (!t || !this.policyRunner || this.onnxInferencing) return !1;
		this.onnxInferencing = !0;
		try {
			this.onnxInputDict ||= t.initInput();
			let n = { ...this.onnxInputDict };
			t.inKeys.includes("time_step") && (n.time_step = new Ru("float32", new Float32Array([this.onnxTimeStep]), [1, 1]));
			for (let [t, r] of Object.entries(e)) n[t] = new Ru("float32", r, [1, r.length]);
			for (let e of t.inKeys) if (!n[e]) return !1;
			let [r, i] = await t.runInference(n);
			if (this.onnxModule !== t) return !1;
			Object.keys(i).length > 0 && (this.onnxInputDict = {
				...this.onnxInputDict,
				...i
			}), t.inKeys.includes("time_step") && (this.onnxTimeStep += 1);
			let a = t.outKeys[0], o = r.action ?? (a ? r[a] : null) ?? r.policy ?? null;
			if (!o) return !1;
			let s = o.data, c = ArrayBuffer.isView(s) ? new Float32Array(s) : Float32Array.from(s), l = this.policyRunner?.getNumActions() ?? 0;
			return this.actionManager && c.length !== l ? !1 : (Pl(c, this.clipActions), this.policyRunner.setLastActions(c), this.lastInferenceError = null, !0);
		} catch (e) {
			let t = String(e);
			return t !== this.lastInferenceError && (this.lastInferenceError = t), !1;
		} finally {
			this.onnxInferencing = !1;
		}
	}
	updateCachedState() {
		if (!this.mjModel || !this.mjData || !this.bodies) return;
		let e = this.dynamicBodyIds;
		for (let t = 0; t < this.mjModel.nbody; t++) if ((!e || e.has(t)) && this.bodies[t]) {
			this.lastSimState.bodies.has(t) || this.lastSimState.bodies.set(t, {
				position: new z(),
				quaternion: new U()
			});
			let e = this.lastSimState.bodies.get(t);
			Rt(this.mjData.xpos, t, e.position), zt(this.mjData.xquat, t, e.quaternion);
		}
		this.mujocoRoot && this.mujocoRoot.cylinders && Et(this.mjModel, this.mjData, {
			cylinders: this.mujocoRoot.cylinders,
			spheres: this.mujocoRoot.spheres
		}, this.lastSimState.tendons);
	}
	applyViewerConfig(e) {
		this.cameraState = gl(e, this.camera, this.controls, this.mjModel, this.mjData, this.injectedBodyIds);
	}
	collectInjectedBodyIds() {
		let e = new Set(this.handMocap.bodyIds());
		if (this.mjModel && this.grabInjected) {
			let t = this.mujoco.mj_name2id(this.mjModel, this.mujoco.mjtObj.mjOBJ_BODY.value, Us);
			t > 0 && e.add(t);
		}
		return e;
	}
	computeDynamicBodyIds(e) {
		let t = /* @__PURE__ */ new Set();
		for (let n = 1; n < e.nbody; n++) {
			let r = n;
			for (; r > 0;) {
				if (e.body_jntnum[r] > 0) {
					t.add(n);
					break;
				}
				r = e.body_parentid[r];
			}
		}
		return t;
	}
	resizeHandBoneMeshes() {
		if (this.mjModel && this.bodies) for (let e of this.handMocap.bodyIds()) {
			let t = this.bodies[e]?.children[0], n = t?.userData.geomId;
			if (!t || n === void 0) continue;
			let r = this.mjModel.geom_size[n * 3 + 1];
			Math.abs(r - (t.userData.drawnHalf ?? 0)) < 5e-4 || (t.userData.drawnHalf = r, t.geometry.dispose(), t.geometry = new ze(this.mjModel.geom_size[n * 3], r * 2, 20, 20));
		}
	}
	syncStaticBodiesFromData() {
		if (!this.mjModel || !this.mjData || !this.bodies) return;
		let e = this.dynamicBodyIds;
		for (let t = 0; t < this.mjModel.nbody; t++) {
			if (e?.has(t)) continue;
			let n = this.bodies[t];
			n && (Rt(this.mjData.xpos, t, n.position), zt(this.mjData.xquat, t, n.quaternion));
		}
	}
	async captureThumbnail(e = {}) {
		let { maxDim: t = 1280, quality: n = .85 } = e, r = this.renderer.domElement;
		this.renderer.render(this.scene, this.camera);
		let i = r.width, a = r.height;
		if (!i || !a) throw Error("mjswan: canvas has zero size; nothing to capture.");
		let o = Math.min(1, t / Math.max(i, a)), s = Math.max(1, Math.round(i * o)), c = Math.max(1, Math.round(a * o)), l = document.createElement("canvas");
		l.width = s, l.height = c;
		let u = l.getContext("2d");
		if (!u) throw Error("mjswan: failed to get a 2D context for thumbnail capture.");
		return u.drawImage(r, 0, 0, s, c), await new Promise((e, t) => {
			l.toBlob((n) => n ? e(n) : t(/* @__PURE__ */ Error("mjswan: toBlob returned null.")), "image/jpeg", n);
		});
	}
	async dispose() {
		this.disposed = !0, navigator.xr?.removeEventListener("devicechange", this.onXrDeviceChange), this.xrSession?.end().catch(() => {}), await this.stop(), this.policyRunner = null, this.policyStateBuilder = null;
		let e = this.onnxModule;
		this.onnxModule = null, await e?.dispose(), this.onnxInputDict = null, this.onnxInferencing = !1, await this.policyGraphs.clear(), this.modelFieldDefaults = null, this.splatMesh &&= ($o(this.splatMesh, this.scene), null), this.colliderMesh &&= (ts(this.colliderMesh, this.scene), null), this.disposeSkin(), this.interaction.dispose(), this.preview.dispose(), this.picker.dispose(), this.releaseModel(), window.removeEventListener("resize", this.onWindowResize), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.renderer.xr.removeEventListener("sessionstart", this.onXrSessionStart), this.renderer.xr.removeEventListener("sessionend", this.onXrSessionEnd), this.controls.dispose(), this.renderer.setAnimationLoop(null), this.renderer.dispose(), this.renderer.domElement.parentElement && this.renderer.domElement.parentElement.removeChild(this.renderer.domElement), this.bodies = null, this.lights = [], this.mujocoRoot = null, this.dynamicBodyIds = null, this.lastSimState.bodies.clear(), this.debugVizSet.clear(), this.commandManager.dispose();
	}
	disposeThreeJSResources() {
		if (this.scene) for (this.scene.traverse((e) => {
			"geometry" in e && e.geometry && e.geometry.dispose(), "material" in e && e.material && (Array.isArray(e.material) ? e.material.forEach((e) => this.disposeMaterial(e)) : this.disposeMaterial(e.material));
		}); this.scene.children.length > 0;) this.scene.remove(this.scene.children[0]);
	}
	disposeMaterial(e) {
		let t = e;
		t.map && t.map.dispose(), t.aoMap && t.aoMap.dispose(), t.emissiveMap && t.emissiveMap.dispose(), t.metalnessMap && t.metalnessMap.dispose(), t.normalMap && t.normalMap.dispose(), t.roughnessMap && t.roughnessMap.dispose(), e.dispose();
	}
	getSize() {
		let e = this.container.clientWidth || window.innerWidth, t = this.container.clientHeight || window.innerHeight;
		return {
			width: Math.max(1, e),
			height: Math.max(1, t)
		};
	}
};
//#endregion
//#region src/engine/serial.ts
function $g() {
	let e = Promise.resolve();
	return (t) => {
		let n = e.then(t);
		return e = n.catch(() => void 0), n;
	};
}
//#endregion
//#region src/engine/createEngine.ts
function e_(e) {
	let t = e.config, n = {
		id: e.id,
		group: e.groupName,
		type: t.type,
		label: t.label
	};
	return t.type === "slider" ? {
		...n,
		min: t.min,
		max: t.max,
		step: t.step,
		enabledWhen: t.enabled_when,
		adjustableRange: t.adjustable_range
	} : t.type === "button" ? {
		...n,
		icon: t.icon
	} : n;
}
async function t_(e) {
	let t = Object.entries(e ?? {});
	return Promise.all(t.map(async ([e, t]) => ({
		name: e,
		data: await fm(t)
	})));
}
async function n_(e) {
	return {
		config: e.config,
		onnx: await fm(e.onnx),
		graphs: await t_(e.graphs),
		motions: (e.motions ?? []).map((e) => ({
			name: e.name,
			data: e.data,
			default: e.default
		})),
		plugins: e.plugins
	};
}
async function r_(e) {
	return {
		data: await fm(e.data),
		collider: e.collider ? await fm(e.collider) : null,
		transform: e.transform
	};
}
async function i_(e) {
	return {
		data: await fm(e.data),
		config: e.config
	};
}
function a_(e) {
	return e instanceof Error ? e : Error(String(e));
}
var o_ = class {
	constructor(e) {
		this.phase = "paused", this.loading = !1, this.loadingMessage = null, this.loads = 0, this.error = null, this.serial = $g(), this.disposed = !1, this.listeners = /* @__PURE__ */ new Set(), this.onCommandEvent = () => this.refresh(), this.runtime = e, this.state = this.buildState(), this.runtime.commands.addEventListener(this.onCommandEvent), this.runtime.onXrChange = () => this.refresh(), this.camera = {
			set: (e) => {
				this.runtime.setCameraView(e), this.refresh();
			},
			get: () => this.runtime.getCameraView(),
			frame: () => this.runtime.frameCamera(),
			setTracking: (e) => {
				this.runtime.setCameraTracking(e), this.refresh();
			}
		}, this.commands = {
			set: (e, t) => this.runtime.commands.setValue(e, t),
			trigger: (e) => this.runtime.commands.triggerButton(e)
		}, this.debugVis = {
			setEnabled: (e) => {
				this.runtime.debugViz.setShown(e), this.refresh();
			},
			set: (e, t) => {
				this.runtime.debugViz.set(e, t), this.refresh();
			}
		}, this.events = {
			fire: (e) => {
				this.runtime.fireEvent(e);
			},
			setArmed: (e, t) => {
				this.runtime.setEventArmed(e, t), this.refresh();
			}
		}, this.interaction = {
			setMode: (e) => {
				this.runtime.setInteractionMode(e), this.refresh();
			},
			getMode: () => this.runtime.getInteractionMode(),
			setParam: (e, t, n) => {
				this.runtime.setInteractionParam(e, t, n), this.refresh();
			},
			getParams: (e) => this.runtime.getInteractionParams(e),
			cancel: () => this.runtime.cancelInteraction()
		}, this.xr = {
			enter: (e) => this.enterXr(e),
			exit: () => this.runtime.exitXr(),
			setHandTracking: (e) => this.runtime.setHandTracking(e)
		}, this.preview = {
			show: (e) => this.runtime.showPreview(e),
			hide: () => this.runtime.hidePreview(),
			hit: (e, t) => !this.disposed && this.runtime.previewHit(e, t),
			onChange: (e) => this.runtime.onPreviewChange(e)
		};
	}
	pick(e, t) {
		return this.disposed ? null : this.runtime.pickSurface(e, t);
	}
	buildState() {
		let e = this.runtime.commands;
		return {
			phase: this.phase,
			loading: this.loading,
			loadingMessage: this.loadingMessage,
			error: this.error,
			commands: e.getCommands().map(e_),
			commandValues: e.getValues(),
			debugVis: this.runtime.debugViz.entries(),
			debugVisEnabled: this.runtime.debugViz.isShown(),
			camera: {
				tracking: this.runtime.isCameraTracking,
				fovy: this.runtime.getCameraView().fovy
			},
			events: this.runtime.eventControls(),
			interactions: this.runtime.interactionModes().map((e) => ({
				...e,
				params: ds.find((t) => t.id === e.id)?.params ?? []
			})),
			interactionMode: this.runtime.getInteractionMode(),
			interactionParams: us.reduce((e, t) => ({
				...e,
				[t]: this.runtime.getInteractionParams(t)
			}), {}),
			xrSessions: this.runtime.xrSessions(),
			handTracking: this.runtime.handTrackingReport(),
			termSeed: this.runtime.seed
		};
	}
	beginLoad(e) {
		this.loads += 1, this.loading = !0, this.loadingMessage = e, this.refresh();
	}
	endLoad() {
		--this.loads, this.loads === 0 && (this.loading = !1, this.loadingMessage = null), this.refresh();
	}
	exclusive(e, t) {
		return this.serial(() => this.disposed ? Promise.resolve(t) : e());
	}
	refresh() {
		if (!this.disposed) {
			this.state = this.buildState();
			for (let e of this.listeners) try {
				e(this.state);
			} catch {}
		}
	}
	async loadScene(e) {
		this.error = null, this.beginLoad("Loading scene…");
		try {
			let t = {
				model: await fm(e.model),
				modelFormat: e.modelFormat,
				policy: e.policy ? await n_(e.policy) : null,
				splat: e.splat ? await r_(e.splat) : null,
				skin: e.skin ? await i_(e.skin) : null,
				viewer: e.viewer ?? null,
				terrainData: e.terrainData ?? null,
				controlDt: e.controlDt ?? null,
				plugins: e.plugins
			};
			await this.exclusive(() => this.runtime.loadEnvironment(t), void 0), this.phase = this.runtime.isRunning ? "running" : "paused";
		} catch (e) {
			throw this.error = a_(e), e;
		} finally {
			this.endLoad();
		}
	}
	async enterXr(e) {
		if (this.disposed) return;
		let t = await this.runtime.requestXr(e);
		if (!t) return;
		let n = !1;
		try {
			await this.serial(() => this.runtime.startXr(t, (e) => {
				n = !0, this.beginLoad(e ? "Adding tracked hands…" : "Removing tracked hands…");
			}));
		} catch (e) {
			throw n && (this.error = a_(e)), e;
		} finally {
			n && (this.phase = this.runtime.isRunning ? "running" : "paused", this.endLoad());
		}
	}
	async setPolicy(e) {
		try {
			let t = e ? await n_(e) : null;
			await this.exclusive(() => this.runtime.loadPolicyConfig(t), void 0);
		} catch (e) {
			throw this.error = a_(e), e;
		} finally {
			this.refresh();
		}
	}
	async setSplat(e) {
		await this.runtime.setSplat(e ? await r_(e) : null);
	}
	async setSkin(e) {
		let t = e ? await i_(e) : null;
		await this.exclusive(() => this.runtime.setSkin(t), void 0), this.refresh();
	}
	setMotion(e) {
		return this.exclusive(() => this.runtime.setSelectedMotion(e), !1);
	}
	calibrateSplat(e) {
		this.runtime.calibrateSplat(e);
	}
	play() {
		this.runtime.play(), this.phase = "running", this.refresh();
	}
	pause() {
		this.runtime.pause(), this.phase = "paused", this.refresh();
	}
	reset() {
		this.runtime.resetSimulation();
	}
	getState() {
		return this.state;
	}
	subscribe(e) {
		return this.listeners.add(e), () => {
			this.listeners.delete(e);
		};
	}
	captureThumbnail(e) {
		return this.runtime.captureThumbnail(e);
	}
	dispose() {
		this.disposed = !0, this.runtime.onXrChange = null, this.runtime.commands.removeEventListener(this.onCommandEvent), this.listeners.clear(), this.serial(() => this.runtime.dispose());
	}
};
async function s_(e, t = {}) {
	return new o_(new Qg(await (t.multithreaded ? await import("./assets/mujoco-DfUIIrip.js") : await import("./assets/mujoco-BRiXxSd_.js")).default(), e, t.termSeed, t.handTracking, t.archive));
}
//#endregion
//#region src/core/onnx/graphRefs.ts
var c_ = [
	"observations",
	"actions",
	"terminations",
	"commands",
	"events"
];
function l_(e, t) {
	if (Array.isArray(e)) {
		for (let n of e) l_(n, t);
		return;
	}
	if (typeof e != "object" || !e) return;
	let n = e;
	for (let e of ["onnx", "fused"]) {
		let r = n[e];
		typeof r == "string" && t.add(r);
	}
	for (let e of Object.values(n)) l_(e, t);
}
function u_(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of c_) l_(e[n], t);
	return [...t].sort();
}
//#endregion
//#region src/engine/index.ts
globalThis.__mjswanThree = Le;
//#endregion
export { s_ as createEngine, s_ as default, u_ as policyGraphRefs };
