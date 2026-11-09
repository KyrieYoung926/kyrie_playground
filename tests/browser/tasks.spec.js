import { test, expect } from "@playwright/test";

test("gallery defers models until launch and supports keyboard selection", async ({
  page,
}) => {
  const models = [];
  page.on("request", (r) => {
    if (r.url().endsWith(".onnx")) models.push(r.url());
  });
  await page.goto("/");
  await expect(page.locator("[data-task]")).toHaveCount(8);
  await expect(page.locator("#launch-task")).toBeDisabled();
  await page.locator('[data-task="depth-rubber"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#launch-task")).toBeEnabled();
  expect(models).toEqual([]);
  await page.screenshot({
    path: "/tmp/catch-gallery-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.screenshot({
    path: "/tmp/catch-gallery-mobile.png",
    fullPage: true,
  });
});

for (const task of ["single", "depth-dex", "depth-rubber", "gt-rubber", "depth-single"])
  test(`${task}: real inference, finite physics, camera and reset`, async ({
    page,
  }) => {
    test.setTimeout(240000);
    const errors = [],
      models = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => {
      if (r.url().endsWith(".onnx")) models.push(r.url());
    });
    // Reproducible throw; this test checks transport and execution, not success rate.
    await page.addInitScript(() => {
      Math.random = () => 0.37;
    });
    await page.goto("/?task=" + task);
    await expect(page.locator("#throw")).toBeEnabled({ timeout: 90000 });
    await expect(page.locator("#level option")).toHaveCount(
      task === "depth-rubber" ? 6 : task === "gt-rubber" ? 7 : 1,
    );
    await page.locator("#throw").click();
    await page.waitForFunction(
      () => window.catchLab.state.time >= 0.4 || window.catchLab.state.done,
      null,
      { timeout: 120000 },
    );
    const state = await page.evaluate(() => window.catchLab.state);
    expect(state.finiteObservation).toBe(true);
    expect(state.rootHeight).toBeGreaterThan(0.45);
    expect(state.frames).toBeGreaterThanOrEqual(20);
    if (task.startsWith("depth")) {
      expect(state.validFraction).toBeGreaterThan(0);
      expect(state.imageAge).toBeCloseTo(0.02, 5);
      await expect(page.locator("#depth-image")).toBeVisible();
    }
    await page.locator("#throw").click();
    await page.waitForTimeout(200);
    const t = await page.evaluate(() => window.catchLab.state.time);
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => window.catchLab.state.time)).toBe(t);
    await page.locator("#reset").click();
    await expect(page.locator("#sim-time")).toHaveText("0.00");
    expect(await page.evaluate(() => window.catchLab.state.frames)).toBe(0);
    if(task.endsWith("rubber"))await page.locator("#level").selectOption(task==='gt-rubber'?"6":"5");
    await expect(page.locator("#throw")).toBeEnabled();
    await page.locator('[data-camera="hands"]').click();
    await page.screenshot({
      path: `/tmp/catch-${task}-ui.png`,
      fullPage: true,
    });
    await expect(page.locator("#error")).toBeHidden();
    expect(errors).toEqual([]);
    expect(models).toHaveLength(1);
  });

test('single hand selector reloads the mirrored physical hand with one shared model',async({page})=>{
 test.setTimeout(180000);
 await page.goto('/?task=single&audit');await page.waitForFunction(()=>window.catchLab?.state.ready);
 await page.locator('#hand').selectOption('left');await page.waitForURL(/hand=left/);await page.waitForFunction(()=>window.catchLab?.state.ready);
 expect(await page.evaluate(()=>window.catchLab.config.handSide)).toBe('left');
 expect(await page.evaluate(()=>window.catchLab.config.jointNames.filter(n=>n.includes('hand_')).every(n=>n.includes('left_')))).toBe(true);
 await page.screenshot({path:'/tmp/catch-single-left-ui.png',fullPage:true});
});
