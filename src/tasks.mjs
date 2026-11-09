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
    rangeLabel: "0.6–1.5 m · ±90° aiming",
    maxLevel: 0,
    depth: false,
    accent: "#bf7952",
    skill: "pass",
  },
  {
    id: "rally-rubber",
    title: "Continuous Pass & Catch",
    tag: "TWO ROBOTS · ONE PHYSICAL BALL",
    description:
      "Catch, settle and pass back. Two robots exchange roles without resetting the ball.",
    asset: "assets/rally-rubber",
    rangeLabel: "Adjustable distance · Continuous rally",
    maxLevel: 0,
    depth: false,
    accent: "#427f85",
    skill: "rally",
  },
]);
export function resolveTask(id) {
  return tasks.find((task) => task.id === id);
}
