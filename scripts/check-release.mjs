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
const directories = ["", "single/", "depth-dex/", "depth-rubber/"];
const allowedAssets = new Set([
  "CREDITS.txt",
  "UNITREE_LICENSE.txt",
  "OPENHOMIE_LICENSE.txt",
  "GROOT_LICENSE.txt",
  ...directories.flatMap((dir) =>
    [
      "controller.onnx",
      "scene.mjz",
      "scene.json",
      ...(dir ? ["flights.json"] : []),
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
    throw new Error("Release must contain exactly one approved ONNX per task.");
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
      "handNames",
      "wristBodies",
    ];
    if (
      Object.keys(c).some((k) => !keys.includes(k)) ||
      c.controller !== "controller.onnx"
    )
      throw Error("Unexpected task metadata.");
    const flights = JSON.parse(
      await readFile(
        path.join(directory, "assets", dir, "flights.json"),
        "utf8",
      ),
    );
    if (flights.length !== (dir === "single/" ? 7 : 6))
      throw Error("Invalid challenge levels.");
  }
  console.log(
    `Release verified: ${relative.length} files, one ONNX per task, no private artifacts.`,
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
