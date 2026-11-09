import { test, expect } from "@playwright/test";
for (const task of ["pass-rubber", "rally-rubber"])
  test(`${task} physical smoke`, async ({ page }) => {
    test.setTimeout(240000);
    page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
    await page.goto("/?task=" + task + "&audit");
    await page.waitForFunction(() => window.catchLab?.state.ready, null, {
      timeout: 90000,
    });
    const result = await page.evaluate(async () => {
      const e = window.__catchEngine,
        r = e.runtime;
      e.pause();
      window.catchLab.startAudit();
      const q0 = Array.from(r.mjData.qpos);
      for (
        let i = 0;
        i < 1100 &&
        !window.catchLab.state.done &&
        window.catchLab.state.catches < 4;
        i++
      ) {
        const obs = await r.policyRunner.collectObservationsByKey(
          r.policyStateBuilder.build(),
        );
        const a = await r.runOnnxInference(obs);
        await r.processActions(a);
        r.executeSimulationSteps();
        r.episodeLength++;
        r.mujoco.mj_forward(r.mjModel, r.mjData);
        r.updateCachedState();
        if (i % 50 === 0)
          await new Promise((resolve) => setTimeout(resolve, 0));
      }
      return { ...window.catchLab.state, q0, q: Array.from(r.mjData.qpos) };
    });
    console.log("RESULT", task, JSON.stringify({success:result.success,catches:result.catches,reason:result.reason,events:result.events}));
    await page.screenshot({ path: "/tmp/" + task + "-web.png" });
    expect(result.finiteObservation).toBe(true);
    if (task === "pass-rubber") expect(result.success).toBe(true);
    else expect(result.catches).toBeGreaterThanOrEqual(2);
  });

test("rally distance resets only the next episode, preserving the first robot", async ({
  page,
}) => {
  await page.goto("/?task=rally-rubber&audit");
  await page.waitForFunction(() => window.catchLab?.state.ready, null, {
    timeout: 90000,
  });
  const before = await page.evaluate(() => ({
    q: Array.from(window.__catchEngine.runtime.mjData.qpos),
    config: window.catchLab.config,
  }));
  await page.locator("#distance").fill("1.4");
  const untouched = await page.evaluate(() =>
    Array.from(window.__catchEngine.runtime.mjData.qpos),
  );
  expect(untouched).toEqual(before.q);
  await page.locator("#reset").click();
  await page.waitForURL(/distance=1.4/);
  await page.waitForFunction(() => window.catchLab?.state.ready, null, {
    timeout: 90000,
  });
  const after = await page.evaluate(() =>
    Array.from(window.__catchEngine.runtime.mjData.qpos),
  );
  const [a, b] = before.config.robots;
  expect(after[a.rootQ]).toBeCloseTo(before.q[a.rootQ], 8);
  expect(after[b.rootQ] - before.q[b.rootQ]).toBeCloseTo(0.3, 7);
  expect(await page.locator("#distance").inputValue()).toBe("1.4");
});
