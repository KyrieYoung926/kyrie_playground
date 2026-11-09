import { test, expect } from "@playwright/test";
test("configuration is the default and resolves catching, passing and rally without downloads", async ({
  page,
}) => {
  const models = [];
  page.on("request", (r) => {
    if (r.url().endsWith(".onnx")) models.push(r.url());
  });
  await page.goto("/");
  await expect(page.locator("#task-builder")).toBeVisible();
  await expect(page.locator(".task-grid")).toBeHidden();
  await page.locator("[data-choice=sense][data-value=depth]").click();
  await page.locator("[data-choice=hands][data-value=both]").click();
  await page.locator("[data-choice=grip][data-value=rubber]").click();
  await expect(page.locator("#task-preview h2")).toHaveText(
    "Depth Palm Catching",
  );
  await page.locator("#builder-camera").selectOption("d455");
  await expect(page.locator("#launch-task")).toBeEnabled();
  await page.screenshot({
    path: "/tmp/catch-config-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.screenshot({
    path: "/tmp/catch-config-mobile.png",
    fullPage: true,
  });
  await page.locator("[data-choice=skill][data-value=pass]").click();
  await expect(page.locator("#task-preview h2")).toHaveText("Palm Passing");
  await page.locator("[data-choice=skill][data-value=rally]").click();
  await expect(page.locator("#task-preview h2")).toHaveText(
    "Continuous Pass & Catch",
  );
  await page.locator("#all-mode").click();
  await expect(page.locator(".task-grid")).toBeVisible();
  await expect(page.locator(".task-grid [data-task]")).toHaveCount(8);
  await page.locator("#select-mode").click();
  await expect(page.locator("#task-builder")).toBeVisible();
  expect(models).toEqual([]);
});
test("D455 switch resets physics, history and policy; switching back restores Gemini", async ({
  page,
}) => {
  test.setTimeout(240000);
  const models = [];
  page.on("request", (r) => {
    if (r.url().endsWith(".onnx")) models.push(r.url());
  });
  await page.goto("/?task=depth-rubber&audit");
  await page.waitForFunction(() => window.catchLab?.state.ready, null, {
    timeout: 90000,
  });
  await page.locator("#throw").click();
  await page.waitForFunction(() => window.catchLab.state.time > 0.1);
  await page.locator("#camera-model").selectOption("d455");
  await page.waitForURL(/camera=d455/);
  await page.waitForFunction(() => window.catchLab?.state.ready, null, {
    timeout: 90000,
  });
  const state = await page.evaluate(() => ({
    s: window.catchLab.state,
    c: window.catchLab.config,
  }));
  expect(state.s.camera).toBe("d455");
  expect(state.s.started).toBe(false);
  expect(state.s.time).toBe(0);
  expect(state.c.camera.fovy).toBe(58);
  expect(state.c.camera.resizeHeight).toBe(144);
  expect(state.c.camera.minDepth).toBe(0.35);
  expect(
    models.filter((x) => x.includes("depth-rubber-d455/controller.onnx")),
  ).toHaveLength(1);
  const physical = await page.evaluate(async () => {
    const bank = await (
      await fetch("./assets/depth-rubber-d455/flights.json")
    ).json();
    window.catchLab.setCase(bank.groups[0].throws[0]);
    await new Promise((resolve) => setTimeout(resolve, 50));
    const r = window.__catchEngine.runtime;
    for (let i = 0; i < 260 && !window.catchLab.state.done; i++) {
      const obs = await r.policyRunner.collectObservationsByKey(
        r.policyStateBuilder.build(),
      );
      await r.processActions(await r.runOnnxInference(obs));
      r.executeSimulationSteps();
      r.episodeLength++;
      r.mujoco.mj_forward(r.mjModel, r.mjData);
      r.updateCachedState();
    }
    const image = window.catchLab.observation.depth.delivered;
    const padding = [0, 40960].every(
      (offset) =>
        image.slice(offset, offset + 8 * 256).every((x) => x === 0) &&
        image
          .slice(offset + 152 * 256, offset + 160 * 256)
          .every((x) => x === 0),
    );
    return {
      success: window.catchLab.state.success,
      padding,
      finite: Array.from(r.mjData.qpos).every(Number.isFinite),
    };
  });
  expect(physical).toEqual({ success: true, padding: true, finite: true });
  await page.screenshot({ path: "/tmp/catch-d455-ui.png", fullPage: true });
  await page.locator("#camera-model").selectOption("gemini");
  await page.waitForURL(/camera=gemini/);
  await page.waitForFunction(() => window.catchLab?.state.ready, null, {
    timeout: 90000,
  });
  expect(await page.evaluate(() => window.catchLab.config.camera.fovy)).toBe(
    65,
  );
  expect(await page.evaluate(() => window.catchLab.state.started)).toBe(false);
});
test("loader reports real numbered milestones during a delayed asset fetch", async ({
  page,
}) => {
  await page.route("**/assets/single/controller.onnx", async (route) => {
    await new Promise((r) => setTimeout(r, 1800));
    await route.continue();
  });
  await page.goto("/?task=single");
  await expect(page.locator("#loading-step")).toHaveText("(2/4)", {
    timeout: 90000,
  });
  await expect(page.locator("#loading-progress")).toHaveAttribute(
    "aria-valuenow",
    "2",
  );
  await page.waitForFunction(() => window.catchLab?.state.ready, null, {
    timeout: 90000,
  });
  await expect(page.locator("#loader")).toBeHidden();
  await expect(page.locator("#loading-progress")).toHaveAttribute(
    "aria-valuenow",
    "4",
  );
});
