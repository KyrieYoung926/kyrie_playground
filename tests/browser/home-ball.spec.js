import { test, expect } from '@playwright/test';

test('homepage ball can be thrown and task selection stays usable', async ({ page }) => {
  await page.goto('/');
  const ball = page.getByRole('button', { name: 'Drag and release to shoot the ball' });
  await expect(ball).toBeAttached();
  // Let the initial drop settle, then grab it in the clear page margin.
  await page.waitForTimeout(4500);
  const box = await ball.boundingBox();
  await page.mouse.move(box.x + 23, box.y + 23);
  await page.mouse.down();
  await page.mouse.move(box.x + 23, box.y - 110, { steps: 10 });
  await page.mouse.up();
  const thrown = await ball.boundingBox();
  expect(thrown.y).toBeLessThan(box.y - 30);
  await page.locator('#all-mode').click();
  await page.locator('.task-grid [data-task="single"]').click();
  await expect(page.locator('#launch-task')).toBeEnabled();
  // Observe launch cleanup without downloading the model.
  await page.route('**/?task=single', route => route.abort());
  await page.locator('#launch-task').click();
  await expect(ball).toHaveCount(0);
});

test('mobile reduced-motion homepage is static and still scrolls', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  const ball = page.locator('.home-ball');
  const before = await ball.boundingBox();
  await page.waitForTimeout(300);
  expect(await ball.boundingBox()).toEqual(before);
  expect(before.x + before.width).toBeLessThanOrEqual(390);
  await page.locator('#all-mode').click();
  await page.locator('.task-grid [data-task="single"]').scrollIntoViewIfNeeded();
  await page.locator('.task-grid [data-task="single"]').tap();
  await expect(page.locator('#launch-task')).toBeEnabled();
  await context.close();
});

test('touch can bounce the ball without disabling page scrolling', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto('/');
  await page.waitForTimeout(100);
  const ball = page.locator('.home-ball');
  const before = await ball.boundingBox();
  // The outer edge remains accessible even beside cards on narrow screens.
  await page.touchscreen.tap(before.x + before.width - 3, before.y + 23);
  await page.waitForTimeout(200);
  expect((await ball.boundingBox()).y).toBeLessThan(before.y - 40);
  await context.close();
});

test('homepage hoop scores a released ball but never a dragged crossing',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 const ball=page.locator('.home-ball'),hoop=page.locator('.home-hoop');
 const h=await hoop.boundingBox();let b=await ball.boundingBox();
 await page.mouse.move(b.x+23,b.y+23);await page.mouse.down();await page.mouse.move(h.x+70,h.y+45,{steps:8});await page.mouse.move(h.x+70,h.y+125,{steps:8});
 await expect(page.locator('.home-hoop-score')).toHaveText('Drag to shoot');
 // While still dragging, place above the rim and release without a throw impulse.
 await page.mouse.move(h.x+70,h.y-10,{steps:8});await page.waitForTimeout(150);await page.mouse.up();
 await expect(page.locator('.home-hoop-score')).toContainText('Nice shot!',{timeout:3000});
 await page.screenshot({path:'/tmp/home-hoop-score.png',fullPage:true});
 await page.locator('#all-mode').click();await page.locator('.task-grid [data-task="single"]').click();await page.route('**/?task=single',route=>route.abort());await page.locator('#launch-task').click();await expect(hoop).toHaveCount(0);await expect(ball).toHaveCount(0);
});
