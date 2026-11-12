export const tasks = Object.freeze([
  {
    id: "dynamic-dex",
    title: "Dynamic Dex Catching",
    tag: "STATE INPUT · DUAL DEX3",
    description:
      "The original demo. Set a throw and explore coordinated catching with two dexterous hands.",
    asset: "assets",
    rangeLabel: "Mixed · Mobile · Fast",
    maxLevel: 0,
    depth: false,
    accent: "#df6138",
  },
  {
    id: "single",
    title: "Single-Hand Catching",
    tag: "STATE INPUT · LEFT / RIGHT DEX3",
    description:
      "A smaller ball, either hand. Switch between the right policy and its mirrored left-hand controller.",
    asset: "assets/single",
    rangeLabel: "Original throws · Ø 7–9 cm",
    maxLevel: 0,
    depth: false,
    accent: "#526b50",
  },
  {
    id: "gt-rubber",
    title: "GT Palm Catching",
    tag: "STATE INPUT · RUBBER HANDS",
    description:
      "Track the ball from its measured state, step sideways and catch with fixed palms.",
    asset: "assets/gt-rubber",
    rangeLabel: "L0–L6 · Original reaction throws",
    maxLevel: 6,
    depth: false,
    accent: "#69699a",
  },
  {
    id: "depth-dex",
    title: "Depth Dex Catching",
    tag: "EGOCENTRIC DEPTH · DUAL DEX3",
    description:
      "Catch using a chest-mounted depth camera. See the image the robot receives as the ball approaches.",
    asset: "assets/depth-dex",
    rangeLabel: "Field throws · Football / basketball",
    maxLevel: 0,
    depth: true,
    accent: "#527b8b",
  },
  {
    id: "depth-single",
    title: "Depth Single-Hand Catching",
    tag: "EGOCENTRIC DEPTH · RIGHT DEX3",
    description:
      "Reach and catch a small ball using a head-mounted depth view and one dexterous hand.",
    asset: "assets/depth-single",
    rangeLabel: "Camera-aware throws · Ø 7–9 cm",
    maxLevel: 0,
    depth: true,
    accent: "#417f79",
  },
  {
    id: "depth-rubber",
    title: "Depth Palm Catching",
    tag: "EGOCENTRIC DEPTH · RUBBER HANDS",
    description:
      "Move, reach and catch with fixed rubber hands, guided by an onboard depth view.",
    asset: "assets/depth-rubber",
    rangeLabel: "L0–L5 · Front-facing throws",
    maxLevel: 5,
    depth: true,
    accent: "#927052",
  },
  {
    id: "pass-rubber",
    title: "Palm Passing",
    tag: "STATE INPUT · TURN & PASS",
    description:
      "Turn toward a target and throw a football with both fixed palms.",
    asset: "assets/pass-rubber",
    rangeLabel: "0.8–2.75 m · ±90° aiming",
    maxLevel: 0,
    depth: false,
    accent: "#bf7952",
    skill: "pass",
  },
  {
    id: "rally-rubber",
    title: "Continuous Pass & Catch",
    status: "Still being optimized",
    tag: "TWO ROBOTS · ONE PHYSICAL BALL",
    description:
      "Catch, settle and pass back. Two robots exchange roles. A fresh rally starts when their spacing exceeds 2.75 m.",
    asset: "assets/rally-rubber",
    rangeLabel: "Adjustable distance · Continuous rally",
    maxLevel: 0,
    depth: false,
    accent: "#427f85",
    skill: "rally",
  },
  {
    id: "shoot-rubber",
    title: "Shooting",
    tag: "STATE INPUT · AIM HIGH",
    description: "Shoot from 0.8–5.5 m at a two-metre hoop, or catch, carry and shoot in one continuous challenge.",
    asset: "assets/shoot-rubber",
    rangeLabel: "0.8–2.0 m · 2 m physical hoop",
    maxLevel: 0,
    depth: false,
    accent: "#ba7047",
    skill: "shot",
  },
]);
export function resolveTask(id, camera = "gemini") {
  const task = tasks.find((task) => task.id === id);
  if (id === "depth-rubber") return {...task, camera: camera === "d455" ? "d455" : "gemini", asset: camera === "d455" ? "assets/depth-rubber-d455" : task.asset};
  return task;
}
