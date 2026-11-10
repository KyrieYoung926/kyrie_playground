import { test, expect } from "@playwright/test";
for (const task of ["pass-rubber", "rally-rubber", "shoot-rubber"])
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
      const heapStart = r.mjData.qpos.buffer.byteLength;
      for (
        let i = 0;
        i < 1700 &&
        !window.catchLab.state.done &&
        window.catchLab.state.catches < 6;
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
      return {
        ...window.catchLab.state,
        q0,
        q: Array.from(r.mjData.qpos),
        heapGrowth: r.mjData.qpos.buffer.byteLength - heapStart,
      };
    });
    const crossings=result.events.filter(e=>e.event==='target_crossing');
    expect(crossings.length).toBeGreaterThan(0);
    for(const e of crossings){
      const delta=e.point.map((x,i)=>x-e.center[i]);
      expect(delta.reduce((sum,x,i)=>sum+x*e.normal[i],0)).toBeCloseTo(0,8);
      expect(Math.hypot(...delta)).toBeCloseTo(e.distance,8);
    }
    expect(result.heapGrowth).toBeLessThan(128 * 1024 * 1024);
    console.log(
      "RESULT",
      task,
      JSON.stringify({
        success: result.success,
        catches: result.catches,
        reason: result.reason,
        events: result.events,
      }),
    );
    await page.screenshot({ path: "/tmp/" + task + "-web.png" });
    expect(result.finiteObservation).toBe(true);
    if (task !== "rally-rubber") expect(result.success).toBe(true);
    else {
      expect(result.catches).toBeGreaterThanOrEqual(6);
      const release = result.events.find((e) => e.event === "release");
      expect(release.time).toBeGreaterThan(0.15);
      expect(release.time).toBeLessThan(2);
      expect(release.valid).toBe(true);
    }
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
  expect(after[b.rootQ] - before.q[b.rootQ]).toBeCloseTo(-0.1, 7);
  expect(await page.locator("#distance").inputValue()).toBe("1.4");
});
