/*
  clock.js
  ------------------------------------------------------------------
  Draws the 60 tick marks into #clockFace once, then rotates the
  hour/minute/second hands every second. If Settings' "preview a
  time of day" slider is active (window.SunShadow's simulatedDate),
  the hands follow that instead of the real clock, so you can see
  the whole day/night cycle without waiting for it.
*/

(function () {
  const face = document.getElementById('clockFace');
  if (!face) return; // this page has no clock

  const hourHand = document.getElementById('handHour');
  const minuteHand = document.getElementById('handMinute');
  const secondHand = document.getElementById('handSecond');
  const digital = document.getElementById('clockDigital');
  const dateLine = document.getElementById('clockDate');
  const sunStatus = document.getElementById('sunStatusText');

  for (let i = 0; i < 60; i++) {
    const tick = document.createElement('div');
    tick.className = 'clock-tick' + (i % 5 === 0 ? ' major' : '');
    tick.style.transform = `rotate(${i * 6}deg)`;
    face.appendChild(tick);
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function render() {
    const s = window.SunShadow ? window.SunShadow.getState() : null;
    const now = s && s.simulatedDate ? s.simulatedDate : new Date();

    const h = now.getHours(), m = now.getMinutes(), sec = now.getSeconds();
    hourHand.style.transform = `rotate(${(h % 12) * 30 + m * 0.5}deg)`;
    minuteHand.style.transform = `rotate(${m * 6 + sec * 0.1}deg)`;
    secondHand.style.transform = `rotate(${sec * 6}deg)`;

    if (digital) digital.textContent = `${pad(h)}:${pad(m)}:${pad(sec)}`;
    if (dateLine) {
      dateLine.textContent = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    }
  }

  document.addEventListener('sunposition', (e) => {
    if (!sunStatus) return;
    const { elevation, daytime } = e.detail;
    sunStatus.textContent = daytime === 'day'
      ? `Sun ${Math.round(elevation)}\u00B0 above the horizon`
      : `Sun ${Math.round(Math.abs(elevation))}\u00B0 below the horizon`;
  });

  render();
  setInterval(render, 1000);
})();
