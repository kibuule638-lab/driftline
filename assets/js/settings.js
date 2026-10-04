/*
  settings.js
  ------------------------------------------------------------------
  Wires up the settings page to window.SunShadow. All of the actual
  persistence lives in sun-shadow.js (localStorage, read on every
  page) — this file just reflects the current/restored state into
  the controls on load, and calls SunShadow's setters on change.
*/

(function () {
  const ss = window.SunShadow;
  if (!ss) return;

  /* ---- Appearance: auto / day / night ---- */
  const appearanceSeg = document.getElementById('appearanceSegmented');
  if (appearanceSeg) {
    // Reflect whatever was restored (or the default) before wiring clicks
    const current = ss.getState().forceDaytime || 'auto';
    [...appearanceSeg.querySelectorAll('button')].forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.mode === current));
    });

    appearanceSeg.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-mode]');
      if (!btn) return;
      [...appearanceSeg.querySelectorAll('button')].forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      ss.setForceDaytime(btn.dataset.mode === 'auto' ? null : btn.dataset.mode);
    });
  }

  /* ---- Accessibility toggles ---- */
  function setupToggle(id, isOnNow, onChange) {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute('aria-checked', String(isOnNow));
    el.addEventListener('click', () => {
      const next = el.getAttribute('aria-checked') !== 'true';
      el.setAttribute('aria-checked', String(next));
      onChange(next);
    });
  }
  setupToggle(
    'reduceMotionToggle',
    document.documentElement.classList.contains('force-reduce-motion'),
    (on) => ss.setReduceMotion(on)
  );
  setupToggle(
    'reduceTransparencyToggle',
    document.documentElement.classList.contains('reduce-transparency'),
    (on) => ss.setReduceTransparency(on)
  );

  /* ---- Location ---- */
  const latInput = document.getElementById('latInput');
  const lonInput = document.getElementById('lonInput');
  const locationReadout = document.getElementById('locationReadout');

  function paintLocationReadout() {
    if (!locationReadout) return;
    const s = ss.getState();
    const src = { device: 'from your device', manual: 'set manually', estimated: 'estimated from your timezone' }[s.locationSource] || s.locationSource;
    locationReadout.textContent = `Using ${s.lat.toFixed(2)}°, ${s.lon.toFixed(2)}° (${src})`;
    if (latInput) latInput.value = s.lat.toFixed(2);
    if (lonInput) lonInput.value = s.lon.toFixed(2);
  }

  const useDeviceBtn = document.getElementById('useDeviceLocationBtn');
  if (useDeviceBtn) {
    useDeviceBtn.addEventListener('click', () => {
      ss.requestGeolocation();
      setTimeout(paintLocationReadout, 1200);
    });
  }
  const applyLocationBtn = document.getElementById('applyLocationBtn');
  if (applyLocationBtn) {
    applyLocationBtn.addEventListener('click', () => {
      const lat = parseFloat(latInput.value);
      const lon = parseFloat(lonInput.value);
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        ss.setLocation(lat, lon, 'manual');
        paintLocationReadout();
      }
    });
  }
  paintLocationReadout();

  /* ---- Preview a time of day ---- */
  const timeSlider = document.getElementById('timeSimSlider');
  const timeReadout = document.getElementById('timeSimReadout');
  const realTimeBtn = document.getElementById('useRealTimeBtn');

  function minutesToLabel(mins) {
    const h = Math.floor(mins / 60), m = mins % 60;
    const period = h < 12 ? 'AM' : 'PM';
    const h12 = ((h + 11) % 12) + 1;
    return `${h12}:${String(m).padStart(2, '0')} ${period}`;
  }

  if (timeSlider) {
    timeSlider.addEventListener('input', () => {
      const mins = parseInt(timeSlider.value, 10);
      const d = new Date();
      d.setHours(Math.floor(mins / 60), mins % 60, 0, 0);
      ss.setSimulatedTime(d);
      if (timeReadout) timeReadout.textContent = `Previewing ${minutesToLabel(mins)}`;
    });
  }
  if (realTimeBtn) {
    realTimeBtn.addEventListener('click', () => {
      ss.clearSimulatedTime();
      if (timeReadout) timeReadout.textContent = 'Following real time';
      const now = new Date();
      if (timeSlider) timeSlider.value = String(now.getHours() * 60 + now.getMinutes());
    });
  }
})();
