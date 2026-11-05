//#region src/core/utils/bytes.ts
function e(e) {
	return typeof e == "function" ? e() : Promise.resolve(e);
}
//#endregion
//#region src/core/onnx/graphRefs.ts
var t = [
	"observations",
	"actions",
	"terminations",
	"commands",
	"events"
];
function n(e, t) {
	if (Array.isArray(e)) {
		for (let r of e) n(r, t);
		return;
	}
	if (typeof e != "object" || !e) return;
	let r = e;
	for (let e of ["onnx", "fused"]) {
		let n = r[e];
		typeof n == "string" && t.add(n);
	}
	for (let e of Object.values(r)) n(e, t);
}
function r(e) {
	let r = /* @__PURE__ */ new Set();
	for (let i of t) n(e[i], r);
	return [...r].sort();
}
//#endregion
//#region src/manifest/index.ts
function i(e) {
	return e.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
var a = 8;
function o(e) {
	let t = e.format;
	if (t === void 0) throw Error("mjswan/manifest: this build predates document format 1 (a root assets/config.json rather than manifest.json). Rebuild it with a current mjswan.");
	if (!Number.isInteger(t) || t < 1) throw Error(`mjswan/manifest: document format ${JSON.stringify(t)} is not a format number.`);
	if (t > 8) throw Error(`mjswan/manifest: this document is format ${t} (written by mjswan ${e.version}), but this engine reads up to format 8. Update the engine.`);
}
function s(e, t) {
	return `${e}${t}`.replace(/\/+/g, "/");
}
function c(t, n, r) {
	let i = (n) => async () => new TextDecoder().decode(await e(r(s(t, n))));
	return {
		spdx: n.spdx,
		restriction: n.restriction,
		copyright: n.copyright,
		license: n.license ? i(n.license) : void 0,
		notice: n.notice ? i(n.notice) : void 0
	};
}
function l(e, t, n) {
	let r = t.vrm && {
		name: t.vrm.name,
		authors: t.vrm.authors,
		license: t.vrm.license,
		otherLicenseUrl: t.vrm.other_license_url
	};
	return {
		...c(e, t, n),
		component: t.component,
		skin: t.skin,
		vrm: r
	};
}
function u(e) {
	return async () => {
		let t = await fetch(e);
		if (!t.ok) throw Error(`mjswan/manifest: failed to fetch ${e}: ${t.status}`);
		return t.arrayBuffer();
	};
}
function d(e, t) {
	if (!e) return;
	let n = {};
	return e.lookat !== void 0 && (n.lookat = e.lookat), e.distance !== void 0 && (n.distance = e.distance), e.fovy !== void 0 && (n.fovy = e.fovy), e.elevation !== void 0 && (n.elevation = e.elevation), e.azimuth !== void 0 && (n.azimuth = t < 3 ? e.azimuth + 180 : e.azimuth), e.origin_type !== void 0 && (n.originType = e.origin_type), e.entity_name !== void 0 && (n.entityName = e.entity_name), e.body_name !== void 0 && (n.bodyName = e.body_name), e.enable_reflections !== void 0 && (n.enableReflections = e.enable_reflections), e.enable_shadows !== void 0 && (n.enableShadows = e.enable_shadows), e.height !== void 0 && (n.height = e.height), e.width !== void 0 && (n.width = e.width), n;
}
function f(e) {
	return {
		scale: e.scale,
		xOffset: e.x_offset,
		yOffset: e.y_offset,
		zOffset: e.z_offset,
		roll: e.roll,
		pitch: e.pitch,
		yaw: e.yaw
	};
}
function p(e, t, n) {
	return {
		data: t.path ? n(s(e, t.path)) : u(t.url),
		collider: t.collider_url ? /^[a-z]+:\/\//i.test(t.collider_url) ? u(t.collider_url) : n(s(e, t.collider_url)) : void 0,
		transform: f(t)
	};
}
function m(e, t, n) {
	let r = {};
	for (let i of e) r[i] = n(s(t, i));
	return r;
}
function h(e, t) {
	let n = e.mdps.find((e) => e.id === t.mdp);
	if (!n) throw Error(`mjswan/manifest: policy "${t.name}" refers to mdp "${t.mdp}", which scene "${e.name}" does not declare.`);
	let r = Object.fromEntries(Object.entries(t).filter(([e]) => ![
		"id",
		"mdp",
		"onnx"
	].includes(e))), i = Object.fromEntries(Object.entries(n).filter(([e]) => e !== "id"));
	return {
		...r,
		...i
	};
}
function g(e, t, n, i) {
	let a = h(t, n), o = (n.motions ?? []).map((t) => ({
		name: t.name,
		data: i(s(e, t.path)),
		default: t.default
	}));
	return {
		config: a,
		onnx: i(s(e, n.onnx)),
		graphs: m(r(a), e, i),
		motions: o
	};
}
function _(e, t, n, r) {
	let i = `${e.id}/${t.id}/`, a = t.policies.map((e) => ({
		id: e.id,
		name: e.name,
		default: e.default ?? !1,
		motions: (e.motions ?? []).map((e) => ({
			name: e.name,
			default: e.default ?? !1,
			group: e.group
		})),
		build: async () => g(i, t, e, n)
	})), o = (t.splats ?? []).map((e) => ({
		id: e.id,
		name: e.name,
		control: e.control ?? !1,
		transform: f(e),
		build: async () => p(i, e, n)
	})), c = (e) => ({
		data: n(s(i, e.path)),
		config: e
	}), u = (t.skins ?? []).map((e) => ({
		id: e.id,
		name: e.name,
		build: async () => c(e)
	}));
	return {
		id: t.id,
		name: t.name,
		camera: d(t.camera, r),
		splatSection: t.splat_section ?? !1,
		policies: a,
		splats: o,
		skins: u,
		credits: (t.credits ?? []).map((e) => l(i, e, n)),
		buildScene: async (e) => {
			let a = e?.policy, o = a == null ? t.policies.find((e) => e.default) ?? t.policies[0] : t.policies.find((e) => e.id === a), l = e?.splat, u = l == null ? void 0 : t.splats?.find((e) => e.id === l), f = e?.skin, m = f == null ? void 0 : t.skins?.find((e) => e.id === f);
			return {
				model: n(s(i, t.scene)),
				modelFormat: t.scene.endsWith(".mjb") ? "mjb" : "mjz",
				policy: o ? g(i, t, o, n) : null,
				splat: u ? p(i, u, n) : null,
				skin: m ? c(m) : null,
				viewer: d(t.camera, r),
				terrainData: t.terrain_data,
				controlDt: t.control_dt
			};
		}
	};
}
function v(e, t) {
	let n = typeof e == "string" ? JSON.parse(e) : e;
	if (o(n), !n.projects?.length) throw Error("mjswan/manifest: manifest.json has no projects.");
	let r = n.projects.find((e) => e.default) ?? n.projects[0];
	return {
		projects: [r, ...n.projects.filter((e) => e !== r)].map((e) => ({
			id: e.id,
			name: e.name,
			default: e === r,
			work: e.work && c(`${e.id}/`, e.work, t),
			scenes: e.scenes.map((r) => _(e, r, t, n.format))
		})),
		pluginsPath: n.plugins,
		viewerGui: n.viewer_gui
	};
}
//#endregion
export { a as MAX_DOCUMENT_FORMAT, v as parseManifest, i as sanitizeName };
