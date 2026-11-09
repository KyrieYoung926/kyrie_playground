import "./style.css";
import { tasks, resolveTask } from "./tasks.mjs";
import { mountGallery } from "./gallery.mjs";
const params = new URLSearchParams(location.search);
const chosen = resolveTask(params.get("task"), params.get("camera"));
async function main() {
  if (chosen) {
    document.title = `${chosen.title} · KyrieLab`;
    document.querySelector("h1").textContent = chosen.title;
    if (chosen.status) document.querySelector("h1").insertAdjacentHTML("afterend", `<span class="optimization-badge">${chosen.status}</span>`);
    document.querySelector(".subtitle").textContent = chosen.description;
    document.querySelector(".experiment-number").classList.add("task-navigation");
    document.querySelector(".experiment-number").innerHTML =
      '<a class="all-tasks" href="./">← <span>All tasks</span></a>';
    document.querySelector(".brand-model").textContent = chosen.depth
      ? "DEPTH CATCHING"
      : "DEX CATCHING";
    document.querySelector("footer>span").textContent =
      chosen.tag.toLowerCase();
    if (chosen.skill) {
      document.querySelector(".brand-model").textContent = chosen.skill === "rally" ? "CONTINUOUS RALLY" : "PALM PASSING";
      const { startPassing } = await import("./passing.js");
      await startPassing(chosen);
    } else if (chosen.id === "dynamic-dex") await import("./legacy.js");
    else {
      const { startDemo } = await import("./demo.js");
      await startDemo(chosen);
    }
  } else {
    document.querySelector(".brand-model").textContent = "G1 CATCHING";
    document.querySelector("main").innerHTML =
      `<div class="intro gallery-intro"><div><p class="eyebrow">KYRIELAB / ROBOTICS PLAYGROUND</p><h1>SwiftCatch: Egocentric Agile Whole-Body Ball Catching for Humanoid Robots</h1><p class="project-status">Work in progress</p><div class="project-credit"><p class="project-author">Xun Kyrie Yang</p><p class="project-affiliation">Work carried out during my visit to the <a href="https://articulated.robots.ox.ac.uk/" target="_blank" rel="noopener noreferrer">Articulated Robots Group</a>,<br> <a href="https://ori.ox.ac.uk/" target="_blank" rel="noopener noreferrer">Oxford Robotics Institute</a>, <a href="https://www.ox.ac.uk/" target="_blank" rel="noopener noreferrer">University of Oxford</a>.</p><div class="project-links" aria-label="Project resources"><span class="project-link" aria-disabled="true">Paper <small>Coming soon</small></span><span class="project-link" aria-disabled="true">GitHub <small>Coming soon</small></span></div></div><p class="subtitle">Choose a task, then launch your own interactive simulation.</p></div><span class="experiment-number">${String(tasks.length).padStart(2,"0")} TASKS ↙</span></div><section class="task-grid" aria-label="Choose a catching task">${tasks.map((t, i) => `<button class="task-card" data-task="${t.id}" aria-pressed="false" style="--card-accent:${t.accent}"><div class="task-art" aria-hidden="true"><span class="art-orbit"></span><span class="art-ball"></span>${t.id.endsWith("rubber") ? '<span class="art-hand left">⌒</span><span class="art-hand right">⌒</span>' : `<svg class="dex-cover" viewBox="0 0 300 190"><g><path class="cover-arm" d="M62 194 Q64 146 112 136"/><path class="cover-fingers" d="M112 136 L112 119 L119 108 M112 136 L128 125 L132 112 M112 136 L132 137 L143 129"/></g>${["single","depth-single"].includes(t.id) ? "" : '<g transform="translate(300 0) scale(-1 1)"><path class="cover-arm" d="M62 194 Q64 146 112 136"/><path class="cover-fingers" d="M112 136 L112 119 L119 108 M112 136 L128 125 L132 112 M112 136 L132 137 L143 129"/></g>'}</svg>`}${t.depth ? '<span class="art-camera"><i></i><i></i></span>' : ""}<span class="art-number">0${i + 1}</span></div><p class="eyebrow">${t.tag}</p><h2>${t.title}</h2>${t.status ? `<span class="optimization-badge">${t.status}</span>` : ""}<p>${t.description}</p><span class="card-levels">${t.rangeLabel}<span>Select task ↗</span></span></button>`).join("")}</section><div class="gallery-launch"><p id="selection-help" role="status">Select a task above to begin. Nothing downloads until you launch.</p><button id="launch-task" class="primary-button" disabled>Launch simulation <span>↗</span></button></div><footer><span>Independent simulations · runs on your device</span><a href="https://mjswan.readthedocs.io/en/latest/" target="_blank" rel="noreferrer" class="powered-by"><img src="./vendor/mjswan/logo.svg" width="21" height="21" alt="mjswan"/> Powered by mjswan ↗</a></footer>`;
    mountGallery(tasks);
    document
      .querySelector("#about-button")
      .addEventListener("click", () =>
        document.querySelector("#about").showModal(),
      );
    document
      .querySelector(".dialog-close")
      .addEventListener("click", () =>
        document.querySelector("#about").close(),
      );
  }
}
main().catch(console.error);
