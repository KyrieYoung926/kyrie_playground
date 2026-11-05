import "./style.css";
import { tasks, resolveTask } from "./tasks.mjs";
const chosen = resolveTask(new URLSearchParams(location.search).get("task"));
async function main() {
  if (chosen) {
    document.title = `${chosen.title} · KyrieLab`;
    document.querySelector("h1").textContent = chosen.title;
    document.querySelector(".subtitle").textContent = chosen.description;
    document.querySelector(".experiment-number").innerHTML =
      '<a href="./">← All tasks</a>';
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
      `<div class="intro gallery-intro"><div><p class="eyebrow">KYRIELAB / ROBOTICS PLAYGROUND</p><h1>Different hands.<br>One good catch<span>.</span></h1><p class="subtitle">Choose a task, then launch your own interactive simulation.</p></div><span class="experiment-number">04 TASKS ↙</span></div><section class="task-grid" aria-label="Choose a catching task">${tasks.map((t, i) => `<button class="task-card" data-task="${t.id}" aria-pressed="false" style="--card-accent:${t.accent}"><div class="task-art" aria-hidden="true"><span class="art-orbit"></span><span class="art-ball"></span><span class="art-hand left">⌒</span>${i === 1 ? "" : '<span class="art-hand right">⌒</span>'}<span class="art-number">0${i + 1}</span></div><p class="eyebrow">${t.tag}</p><h2>${t.title}</h2><p>${t.description}</p><span class="card-levels">L0–L${t.maxLevel}<span>Select task ↗</span></span></button>`).join("")}</section><div class="gallery-launch"><p id="selection-help" role="status">Select a task above to begin. Nothing downloads until you launch.</p><button id="launch-task" class="primary-button" disabled>Launch simulation <span>↗</span></button></div><footer><span>Independent simulations · runs on your device</span><a href="https://mjswan.readthedocs.io/en/latest/" target="_blank" rel="noreferrer" class="powered-by"><img src="./vendor/mjswan/logo.svg" width="21" height="21" alt="mjswan"/> Powered by mjswan ↗</a></footer>`;
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
