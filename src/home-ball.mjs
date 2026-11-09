// Homepage-only decoration; no simulation assets or physics engine required.
export function mountHomeBall() {
  const ball = document.createElement('button');
  ball.className = 'home-ball';
  ball.type = 'button';
  ball.setAttribute('aria-label', 'Bounce the ball. Drag and release to throw.');
  ball.title = 'Drag to throw · tap to bounce';
  document.body.classList.add('has-home-ball');
  document.body.append(ball);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const radius = 23;
  let x = innerWidth - radius - 8, y = reduced.matches ? innerHeight - 39 : 105;
  let vx = 0, vy = 0, frame = 0, last = 0, drag = null, disposed = false;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function paint() {
    x = clamp(x, radius + 8, innerWidth - radius - 8);
    y = clamp(y, radius + 8, innerHeight - radius - 16);
    ball.style.transform = `translate3d(${x-radius}px,${y-radius}px,0)`;
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; last = 0; }
  function wake() {
    if (!disposed && !frame && !document.hidden && !drag && !reduced.matches)
      frame = requestAnimationFrame(tick);
  }
  function tick(now) {
    frame = 0;
    const dt = Math.min((now - (last || now)) / 1000, 0.025);
    last = now;
    vy += 1350 * dt;
    x += vx * dt; y += vy * dt;
    const floor = innerHeight - radius - 16;
    if (x < radius + 8 || x > innerWidth - radius - 8) vx *= -0.72;
    if (y < radius + 8) vy = Math.abs(vy) * 0.72;
    if (y >= floor) {
      y = floor; vy = -Math.abs(vy) * 0.67; vx *= 0.78;
      if (Math.abs(vy) < 45) { vy = 0; vx *= 0.8; }
    }
    paint();
    if (y >= floor && Math.abs(vx) < 3 && vy === 0) { last = 0; return; }
    wake();
  }
  ball.onpointerdown = e => {
    if (e.button !== 0 || drag) return;
    stop();
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, time: performance.now(), moved: false };
    vx = vy = 0;
    ball.setPointerCapture(e.pointerId);
    ball.classList.add('grabbed');
  };
  ball.onpointermove = e => {
    if (!drag || e.pointerId !== drag.id) return;
    const now = performance.now(), dt = Math.max((now - drag.time) / 1000, .008);
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    drag.moved ||= Math.abs(dx) + Math.abs(dy) > 3;
    vx = clamp(dx / dt, -1300, 1300); vy = clamp(dy / dt, -1500, 1500);
    x += dx; y += dy;
    Object.assign(drag, { x: e.clientX, y: e.clientY, time: now });
    paint();
  };
  function release(e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (e.type === 'pointercancel') vx = vy = 0;
    else if (!drag.moved) vy = -650;
    else if (performance.now() - drag.time > 120) vx = vy = 0;
    drag = null; ball.classList.remove('grabbed'); wake();
  }
  ball.onpointerup = release;
  ball.onpointercancel = release;
  ball.onlostpointercapture = release;
  ball.onclick = e => { if (e.detail === 0) { vy = -650; wake(); } };
  function visibility() { if (document.hidden) stop(); else wake(); }
  function resize() { paint(); wake(); }
  function motion() { stop(); if (reduced.matches) { y = innerHeight-radius-16; paint(); } else wake(); }
  function destroy() {
    disposed = true; stop(); ball.remove();
    document.body.classList.remove('has-home-ball');
    removeEventListener('resize', resize);
    removeEventListener('pagehide', destroy);
    document.removeEventListener('visibilitychange', visibility);
    reduced.removeEventListener('change', motion);
  }
  addEventListener('resize', resize);
  addEventListener('pagehide', destroy);
  document.addEventListener('visibilitychange', visibility);
  reduced.addEventListener('change', motion);
  document.querySelector('#launch-task').addEventListener('click', destroy, { once: true });
  // A restored back-forward-cache page needs its decoration mounted again.
  addEventListener('pageshow', function restore(e) {
    if (e.persisted && disposed) { removeEventListener('pageshow', restore); mountHomeBall(); }
  });
  paint(); wake();
  return destroy;
}
