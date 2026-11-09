// Coarse completed milestones, not a fabricated download percentage.
export function loadingStage(step, message) {
  const label = document.querySelector("#loading-step");
  if (label) label.textContent = `(${step}/4)`;
  const bar = document.querySelector("#loading-progress");
  if (bar) {
    bar.setAttribute("aria-valuenow", String(step));
    bar.setAttribute("aria-valuetext", `${step} of 4: ${message}`);
  }
  const fill = document.querySelector("#loading-fill");
  if (fill) fill.style.width = `${step * 25}%`;
  const detail = document.querySelector("#loading-message");
  if (detail) detail.textContent = message;
}
