import "./style.css";
import { tasks, resolveTask } from "./tasks.mjs";
const chosen = resolveTask(new URLSearchParams(location.search).get("task"));
async function main() {
  if (chosen) {
    document.title = `${chosen.title} · KyrieLab`;
    document.querySelector("h1").textContent = chosen.title;
    document.querySelector(".subtitle").textContent = chosen.description;
    document.querySelector(".experiment-number").classList.add("task-navigation");
    document.querySelector(".experiment-number").innerHTML =
      '<a class="all-tasks" href="./">← <span>All tasks</span></a>';
    document.querySelector(".brand-model").textContent = chosen.depth
      ? "DEPTH CATCHING"
      : "DEX CATCHING";
    document.querySelector("footer>span").textContent =
      chosen.tag.toLowerCase();
    if (chosen.id === "dynamic-dex") await import("./legacy.js");
    else {
      const { startDemo } = await import("./demo.js");
      await startDemo(chosen);
    }
  } else {
    document.querySelector(".brand-model").textContent = "G1 CATCHING";
    document.querySelector("main").innerHTML =
      `<div class="intro gallery-intro"><div><p class="eyebrow">KYRIELAB / ROBOTICS PLAYGROUND</p><h1>Agile Visual Ball Catching<br>with a Humanoid Robot<span>.</span></h1><div class="project-credit"><p class="project-author">Xun Kyrie Yang</p><p class="project-affiliation">Work carried out during my visit to the <a href="https://articulated.robots.ox.ac.uk/" target="_blank" rel="noopener noreferrer">Articulated Robots Group</a>,<br> <a href="https://ori.ox.ac.uk/" target="_blank" rel="noopener noreferrer">Oxford Robotics Institute</a>, <a href="https://www.ox.ac.uk/" target="_blank" rel="noopener noreferrer">University of Oxford</a>.</p><div class="project-links" aria-label="Project resources"><span class="project-link" aria-disabled="true">Paper <small>Coming soon</small></span><span class="project-link" aria-disabled="true">GitHub <small>Coming soon</small></span></div></div><p class="subtitle">Choose a task, then launch your own interactive simulation.</p></div><span class="experiment-number">04 TASKS ↙</span></div><section class="task-grid" aria-label="Choose a catching task">${tasks.map((t, i) => `<button class="task-card" data-task="${t.id}" aria-pressed="false" style="--card-accent:${t.accent}"><div class="task-art" aria-hidden="true"><span class="art-orbit"></span><span class="art-ball"></span>${t.id === "depth-rubber" ? '<span class="art-hand left">⌒</span><span class="art-hand right">⌒</span>' : `<svg class="dex-cover" viewBox="0 0 300 190"><g><path class="cover-arm" d="M62 194 Q64 146 112 136"/><path class="cover-fingers" d="M112 136 L112 119 L119 108 M112 136 L128 125 L132 112 M112 136 L132 137 L143 129"/></g>${t.id === "single" ? "" : '<g transform="translate(300 0) scale(-1 1)"><path class="cover-arm" d="M62 194 Q64 146 112 136"/><path class="cover-fingers" d="M112 136 L112 119 L119 108 M112 136 L128 125 L132 112 M112 136 L132 137 L143 129"/></g>'}</svg>`}${t.depth ? '<span class="art-camera"><i></i><i></i></span>' : ""}<span class="art-number">0${i + 1}</span></div><p class="eyebrow">${t.tag}</p><h2>${t.title}</h2><p>${t.description}</p><span class="card-levels">${t.rangeLabel}<span>Select task ↗</span></span></button>`).join("")}</section><div class="gallery-launch"><p id="selection-help" role="status">Select a task above to begin. Nothing downloads until you launch.</p><button id="launch-task" class="primary-button" disabled>Launch simulation <span>↗</span></button></div><footer><span>Independent simulations · runs on your device</span><a href="https://mjswan.readthedocs.io/en/latest/" target="_blank" rel="noreferrer" class="powered-by"><img src="./vendor/mjswan/logo.svg" width="21" height="21" alt="mjswan"/> Powered by mjswan ↗</a></footer>`;
    let selected;
    document.querySelectorAll("[data-task]").forEach((button) =>
      button.addEventListener("click", () => {
        selected = resolveTask(button.dataset.task);
        document
          .querySelectorAll("[data-task]")
          .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        document.querySelector("#launch-task").disabled = false;
        document.querySelector("#selection-help").textContent =
          selected.title + " selected. Your simulation starts paused.";
      }),
    );
    document.querySelector("#launch-task").addEventListener("click", () => {
      if (selected) location.assign("?task=" + selected.id);
    });
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
