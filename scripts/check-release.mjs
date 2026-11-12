import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { unzipSync, strFromU8 } from "fflate";
import { fileURLToPath } from "node:url";

const defaultDirectory = fileURLToPath(new URL("../public", import.meta.url));
const forbiddenContent = [
  /\/(?:home|Users)\//,
  /(?:actor|critic)_state_dict/,
  /\b[\w-]+\.p(?:t|th)\b/i,
  /model_\d+\b/i,
  /(?:checkpoint|run)[_-]?(?:file|path|name)/i,
  /(?:training|export|provenance)[_-](?:params|config|metadata)/i,
];
const forbiddenFile = /(?:\.(?:pt|pth|ckpt|map)|\.onnx\.data)$/i;
const directories = ["", "single/", "depth-dex/", "depth-rubber/", "depth-rubber-d455/", "gt-rubber/", "depth-single/", "pass-rubber/", "rally-rubber/", "shoot-rubber/"];
const allowedAssets = new Set([
  "single/scene-left.json", "single/scene-left.mjz",
  "CREDITS.txt",
  "UNITREE_LICENSE.txt",
  "OPENHOMIE_LICENSE.txt",
  "GROOT_LICENSE.txt",
  "gym/ori_court.png",
  ...["court","floor","wall","ceiling"].map(n=>"gym/"+n+".webp"),
  ...directories.flatMap((dir) =>
    [
      "controller.onnx",
      "scene.mjz",
      "scene.json",
      "flights.json",
    ].map((file) => dir + file),
  ),
]);

export async function checkRelease(directory = defaultDirectory) {
  const files = [];
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const filename = path.join(current, entry.name);
      if (entry.isSymbolicLink())
        throw new Error("Release assets must not be symlinks.");
      if (entry.isDirectory()) await visit(filename);
      else files.push(filename);
    }
  }
  await visit(directory);
  const relative = files.map((file) =>
    path.relative(directory, file).replaceAll(path.sep, "/"),
  );
  const models = relative.filter((file) => file.endsWith(".onnx"));
  const expected = directories.map(
    (dir) => "assets/" + dir + "controller.onnx",
  );
  if (
    models.length !== expected.length ||
    !expected.every((p) => models.includes(p))
  )
    throw new Error("Release must contain exactly one approved ONNX per task / camera variant.");
  for (let i = 0; i < files.length; i++) {
    const name = relative[i];
    if (name.startsWith("assets/") && !allowedAssets.has(name.slice(7)))
      throw new Error(`Unexpected release asset: ${name}`);
    if (
      forbiddenFile.test(name) ||
      /^(?:logs|checkpoints|\.openai)\//.test(name)
    )
      throw new Error(`Private artifact in release: ${name}`);
    if ((await stat(files[i])).size > 25 * 1024 * 1024)
      throw new Error(`Cloudflare Pages file-size limit exceeded: ${name}`);
    if (name.startsWith("vendor/")) continue;
    const data = await readFile(files[i]);
    let text = data.toString(name.endsWith(".onnx") ? "latin1" : "utf8");
    if (name.endsWith(".mjz")) {
      const entries = unzipSync(data);
      for (const key of Object.keys(entries))
        if (key.includes("..") || key.startsWith("/") || key.includes("home/"))
          throw Error("Unsafe scene asset path");
      text = Object.entries(entries)
        .filter(([key]) => /\.(xml|json|txt)$/.test(key))
        .map(([, value]) => strFromU8(value))
        .join("\n");
    }
    for (const expression of forbiddenContent)
      if (expression.test(text))
        throw new Error(`Training metadata found in ${name}`);
  }
  const manifest = JSON.parse(
    await readFile(path.join(directory, "assets/scene.json"), "utf8"),
  );
  const allowed = [
    "schema",
    "controlDt",
    "controller",
    "profiles",
    "jointNames",
    "defaults",
    "qposAddresses",
    "qvelAddresses",
    "initialQpos",
    "initialQvel",
  ];
  if (Object.keys(manifest).some((key) => !allowed.includes(key)))
    throw new Error("Unexpected scene metadata.");
  if (
    manifest.controller !== "controller.onnx" ||
    manifest.profiles.length !== 2
  )
    throw new Error("Invalid controller configuration.");
  if (
    !relative.includes("index.html") ||
    !relative.includes("assets/scene.mjz")
  )
    throw new Error("Static entrypoint or scene is missing.");
  for (const dir of directories.filter(Boolean)) {
    const c = JSON.parse(
      await readFile(path.join(directory, "assets", dir, "scene.json"), "utf8"),
    );
    const keys = [
      "schema",
      "kind",
      "controlDt",
      "controller",
      "jointNames",
      "defaults",
      "qposAddresses",
      "qvelAddresses",
      "initialQpos",
      "initialQvel",
      "inputSize",
      "ballRadius",
      "ballMass",
      "camera",
      "handNames", "handSide",
      "wristBodies",
      "stiffness","damping","effortLimits", "palmFrames", "launchYaw",
      "memorySize", "robots", "ready", "initialDistance", "holdSeconds",
      ...(dir === "gt-rubber/" ? ["execution", "episodeSeconds"] : []),
      ...(dir === "shoot-rubber/" ? ["catchInitialQpos", "catchInitialQvel"] : []),
    ];
    if (
      Object.keys(c).some((k) => !keys.includes(k)) ||
      c.controller !== "controller.onnx"
    )
      throw Error("Unexpected task metadata.");
    if (["pass-rubber/", "rally-rubber/", "shoot-rubber/"].includes(dir)) {
      const n = dir === "pass-rubber/" ? 1 : 2;
      const stride=dir === "shoot-rubber/"?159:n===2?222:158, memory=dir === "rally-rubber/"?1370:dir === "shoot-rubber/"?980:960;
      if (c.robots.length !== n || c.jointNames.length !== 29*n || c.inputSize !== stride*n || c.memorySize !== memory*n) throw Error("Invalid passing controller contract");
      if(dir === "shoot-rubber/") for(const [name,initial] of [["catchInitialQpos","initialQpos"],["catchInitialQvel","initialQvel"]]) {
        if(!Array.isArray(c[name]) || c[name].length !== c[initial].length || !c[name].every(Number.isFinite)) throw Error("Invalid GT challenge initial state");
      }
      continue;
    }
    const flights = JSON.parse(
      await readFile(
        path.join(directory, "assets", dir, "flights.json"),
        "utf8",
      ),
    );
    if (!Number.isFinite(flights.inertiaFactor) || flights.inertiaFactor <= 0)
      throw Error("Invalid ball inertia.");
    if (flights.groups.length !== (["depth-rubber/", "depth-rubber-d455/"].includes(dir) ? 6 : dir === "gt-rubber/" ? 7 : 1))
      throw Error("Invalid challenge levels.");
  }
  console.log(
    `Release verified: ${relative.length} files, one ONNX per task/camera variant, no private artifacts.`,
  );
  return relative;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await checkRelease(
    process.argv[2] ? path.resolve(process.argv[2]) : defaultDirectory,
  );
}
