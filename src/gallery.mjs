import { resolveTask } from "./tasks.mjs";
export function mountGallery(tasks) {
  const grid = document.querySelector(".task-grid"),
    launch = document.querySelector("#launch-task"),
    help = document.querySelector("#selection-help");
  grid.id = "all-task-list";
  grid.insertAdjacentHTML(
    "beforebegin",
    `<div class="browse-bar"><p class="eyebrow">FIND YOUR SIMULATION</p><div class="browse-switch" role="group" aria-label="Task selection mode"><button id="select-mode" aria-pressed="true">Select</button><button id="all-mode" aria-pressed="false">All tasks <small>${tasks.length}</small></button></div></div><section id="task-builder" class="task-builder" aria-label="Configure a task"><div id="builder-questions"></div><div id="task-preview" class="task-preview" aria-live="polite"></div></section>`,
  );
  let selected,
    camera = "gemini",
    config = { skill: "catch", sense: null, hands: null, grip: null };
  const questions = document.querySelector("#builder-questions"),
    preview = document.querySelector("#task-preview");
  const cards = [...grid.querySelectorAll("[data-task]")];
  function pick(task) {
    selected = task;
    cards.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.task === task?.id)),
    );
    launch.disabled = !task;
    help.textContent = task
      ? `${task.title} · starts paused. Nothing downloads until you launch.`
      : "Complete your choices to find a demo. Nothing downloads until you launch.";
  }
  function row(key, label, options) {
    return `<fieldset class="choice-row"><legend>${label}</legend><div class="choice-options">${options.map(([value, title, note, disabled]) => `<button type="button" data-choice="${key}" data-value="${value}" aria-pressed="${config[key] === value}" ${disabled ? "disabled" : ""}><strong>${title}</strong>${note ? `<small>${note}</small>` : ""}</button>`).join("")}</div></fieldset>`;
  }
  function render() {
    let html = row("skill", "01 · What would you like to try?", [
      ["catch", "Catch", "Receive a throw"],
      ["pass", "Pass", "Aim and release"],
      ["rally", "Rally", "Two robots, back and forth"],
    ]);
    if (config.skill === "catch") {
      html += row("sense", "02 · How does the robot see the ball?", [
        ["gt", "State / GT", "Ball position"],
        ["depth", "Depth", "Onboard camera"],
      ]);
      if (config.sense)
        html += row("hands", "03 · One hand or two?", [
          ["single", "Single hand", "Dexterous reach"],
          ["both", "Bimanual", "Coordinated catch"],
        ]);
      if (config.hands === "both")
        html += row("grip", "04 · Choose the hands", [
          ["dex", "Dex3", "Articulated fingers"],
          ["rubber", "Rubber palms", "Fixed hands"],
        ]);
      if (config.hands === "single")
        html +=
          '<p class="choice-note">Single-hand demos use Dex3 fingers.</p>';
    } else
      html +=
        '<p class="choice-note">This demo uses ball state, two rubber palms and whole-body motion.</p>';
    questions.innerHTML = html;
    let id =
      config.skill === "pass"
        ? "pass-rubber"
        : config.skill === "rally"
          ? "rally-rubber"
          : config.sense && config.hands === "single"
            ? config.sense === "depth"
              ? "depth-single"
              : "single"
            : config.sense && config.hands === "both" && config.grip
              ? config.grip === "rubber"
                ? config.sense === "depth"
                  ? "depth-rubber"
                  : "gt-rubber"
                : config.sense === "depth"
                  ? "depth-dex"
                  : "dynamic-dex"
              : null;
    pick(resolveTask(id));
    preview.hidden = !selected;
    if (selected) {
      const card = cards.find((b) => b.dataset.task === selected.id);
      preview.innerHTML = `<article class="task-card result-card" style="--card-accent:${selected.accent}">${card.innerHTML}</article>`;
      preview.querySelector(".card-levels span").textContent =
        "Ready to launch";
      if (id === "depth-rubber") {
        preview.insertAdjacentHTML(
          "beforeend",
          `<label class="builder-camera" for="builder-camera">Depth camera<select id="builder-camera"><option value="gemini">Gemini 335L</option><option value="d455">RealSense D455</option></select></label>`,
        );
        const c = document.querySelector("#builder-camera");
        c.value = camera;
        c.onchange = () => (camera = c.value);
      }
    } else
      preview.innerHTML =
        '';
    questions.querySelectorAll("[data-choice]").forEach(
      (b) =>
        (b.onclick = () => {
          const key = b.dataset.choice;
          config[key] = b.dataset.value;
          if (key === "skill") {
            config.sense = null;
            config.hands = null;
            config.grip = null;
          }
          if (key === "hands") config.grip = null;
          render();
        }),
    );
  }
  function setMode(value) {
    grid.hidden = value !== "all";
    document.querySelector("#task-builder").hidden = value !== "select";
    document
      .querySelector("#select-mode")
      .setAttribute("aria-pressed", String(value === "select"));
    document
      .querySelector("#all-mode")
      .setAttribute("aria-pressed", String(value === "all"));
    if (value === "select") render();
    else pick(selected);
  }
  document.querySelector("#select-mode").onclick = () => setMode("select");
  document.querySelector("#all-mode").onclick = () => setMode("all");
  cards.forEach(
    (b) =>
      (b.onclick = () => {
        camera = "gemini";
        pick(resolveTask(b.dataset.task));
      }),
  );
  launch.onclick = () => {
    preview.hidden = !selected;
    if (selected) {
      const url = new URL(location.href);
      url.search = "";
      url.searchParams.set("task", selected.id);
      if (selected.id === "depth-rubber")
        url.searchParams.set("camera", camera);
      location.assign(url.href);
    }
  };
  setMode("select");
}
