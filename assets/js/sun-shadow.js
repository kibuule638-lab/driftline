/*
  sun-shadow.js
  ------------------------------------------------------------------
  Computes solar elevation + azimuth for the visitor's location and
  the current time, then writes CSS custom properties that every
  .neu-* shadow and .wp-card in the project reads:

    --shadow-dx / --shadow-dy / --shadow-blur
    --shadow-color / --shadow-color-light
    --sun-accent      (the clock's second hand + hub color)
    --sun-elevation    (raw degrees, exposed for the sun-status readout)
    --ambient          (0–1 brightness multiplier, unused by default
                         but available if you want to fade imagery
                         toward dusk)

  and toggles [data-daytime="day"|"night"] on <html>, which swaps the
  whole page between the light and dark token sets in variables.css.

  The position math is the standard NOAA simplified solar-position
  algorithm (public-domain astronomy — reference equations at
  https://gml.noaa.gov/grad/solcalc/solareqns.PDF), not a library.

  Location: tries navigator.geolocation first. If permission is
  denied or unavailable, falls back to a longitude estimated from
  the browser's UTC offset (accurate enough for a believable shadow
  direction, not for a real solar calculator) — Settings has a
  manual latitude/longitude field for anyone who wants it exact.

  Persistence: every preference (forced day/night, manual location,
  reduce-motion, reduce-transparency) is saved to localStorage under
  DRIFTLINE_STORAGE_KEY and re-applied here, before the first paint,
  on *every* page — not just settings.html. That's what makes a
  choice made in Settings still be in effect when you land on the
  home page or any gallery page. If localStorage is unavailable
  (private browsing, some sandboxed previews), everything still
  works — it just won't remember between visits.
*/

(function () {
  const STORAGE_KEY = 'driftline-prefs-v1';

  function loadStoredPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {}; // storage disabled/unavailable — just use in-memory defaults
    }
  }
  function saveStoredPrefs(patch) {
    try {
      const current = loadStoredPrefs();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...patch }));
    } catch (e) { /* storage unavailable — settings simply won't persist */ }
  }

  const stored = loadStoredPrefs();

  const state = {
    lat: 20,
    lon: 0,
    locationSource: 'estimated',
    simulatedDate: null, // set by Settings' "preview a time of day" slider
    forceDaytime: null,  // 'day' | 'night' | null (null = follow the sun)
  };

  function estimateLongitudeFromTimezone() {
    const offsetMinutes = new Date().getTimezoneOffset(); // minutes to ADD to local time to reach UTC
    return -(offsetMinutes / 60) * 15;
  }
  state.lon = estimateLongitudeFromTimezone();

  // ---- Apply anything saved from a previous visit, before first tick ----
  if (stored.forceDaytime === 'day' || stored.forceDaytime === 'night') {
    state.forceDaytime = stored.forceDaytime;
  }
  if (typeof stored.lat === 'number' && typeof stored.lon === 'number') {
    state.lat = stored.lat;
    state.lon = stored.lon;
    state.locationSource = stored.locationSource || 'manual';
  }
  if (stored.reduceMotion) document.documentElement.classList.add('force-reduce-motion');
  if (stored.reduceTransparency) document.documentElement.classList.add('reduce-transparency');

  function toRad(deg) { return (deg * Math.PI) / 180; }
  function toDeg(rad) { return (rad * 180) / Math.PI; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

  function dayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date - start) / 86400000);
  }

  /** Returns { elevation, azimuth } in degrees for a given Date/lat/lon. */
  function getSunPosition(date, lat, lon) {
    const n = dayOfYear(date);
    const hourUTC = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
    const gamma = ((2 * Math.PI) / 365) * (n - 1 + (hourUTC - 12) / 24);

    const eqtime = 229.18 * (
      0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma)
    );

    const decl = 0.006918 -
      0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) -
      0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma) -
      0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);

    const timeOffset = eqtime + 4 * lon; // minutes
    const trueSolarTime = hourUTC * 60 + timeOffset; // minutes
    let hourAngleDeg = trueSolarTime / 4 - 180;
    if (hourAngleDeg < -180) hourAngleDeg += 360;
    if (hourAngleDeg > 180) hourAngleDeg -= 360;
    const hourAngle = toRad(hourAngleDeg);

    const latRad = toRad(lat);
    const cosZenith = Math.sin(latRad) * Math.sin(decl) + Math.cos(latRad) * Math.cos(decl) * Math.cos(hourAngle);
    const zenith = Math.acos(clamp(cosZenith, -1, 1));
    const elevation = 90 - toDeg(zenith);

    let cosAzimuth = (Math.sin(decl) - Math.sin(latRad) * Math.cos(zenith)) / (Math.cos(latRad) * Math.sin(zenith) || 1e-6);
    cosAzimuth = clamp(cosAzimuth, -1, 1);
    let azimuth = toDeg(Math.acos(cosAzimuth));
    if (hourAngleDeg > 0) azimuth = 360 - azimuth;

    return { elevation, azimuth };
  }

  function hexToRgb(hex) {
    const v = hex.replace('#', '');
    return { r: parseInt(v.substring(0, 2), 16), g: parseInt(v.substring(2, 4), 16), b: parseInt(v.substring(4, 6), 16) };
  }
  function mixHex(hexA, hexB, t) {
    const a = hexToRgb(hexA), b = hexToRgb(hexB);
    return `rgb(${Math.round(lerp(a.r, b.r, t))}, ${Math.round(lerp(a.g, b.g, t))}, ${Math.round(lerp(a.b, b.b, t))})`;
  }

  const PALETTE = { night: '#6F7FE0', dawn: '#E2705A', day: '#E3A857' };

  function applySunState(elevation, azimuth) {
    const html = document.documentElement;
    const t = clamp((elevation + 8) / 58, 0, 1); // 0 at -8°, 1 by ~50°

    const computedDaytime = elevation > -6 ? 'day' : 'night';
    html.setAttribute('data-daytime', state.forceDaytime || computedDaytime);

    const shadowLen = lerp(20, 5, t);
    const blur = lerp(30, 14, t);
    const az = toRad(azimuth);
    const dx = Math.round(-Math.sin(az) * shadowLen);
    const dy = Math.round(Math.max(3, shadowLen * (1 - t) * 0.7 + 3));

    const isNightVisual = state.forceDaytime
      ? state.forceDaytime === 'night'
      : elevation <= -6;

    let shadowColor, highlightColor, sunAccent, ambient;
    if (isNightVisual) {
      shadowColor = 'rgba(0,0,0,0.55)';
      highlightColor = 'rgba(255,255,255,0.03)';
      sunAccent = PALETTE.night;
      ambient = 0.15;
    } else {
      const warmRgb = mixHex('#C98B5E', '#A3AABA', t).match(/\d+/g).join(',');
      shadowColor = `rgba(${warmRgb},${lerp(0.6, 0.4, t).toFixed(2)})`;
      highlightColor = `rgba(255,255,255,${lerp(0.7, 0.92, t).toFixed(2)})`;
      sunAccent = t < 0.35 ? mixHex(PALETTE.dawn, PALETTE.day, t / 0.35) : PALETTE.day;
      ambient = lerp(0.6, 1, t);
    }

    html.style.setProperty('--shadow-dx', dx + 'px');
    html.style.setProperty('--shadow-dy', dy + 'px');
    html.style.setProperty('--shadow-blur', blur.toFixed(0) + 'px');
    html.style.setProperty('--shadow-color', shadowColor);
    html.style.setProperty('--shadow-color-light', highlightColor);
    html.style.setProperty('--sun-accent', sunAccent);
    html.style.setProperty('--sun-elevation', elevation.toFixed(1));
    html.style.setProperty('--ambient', ambient.toFixed(2));

    document.dispatchEvent(new CustomEvent('sunposition', {
      detail: { elevation, azimuth, t, daytime: isNightVisual ? 'night' : 'day' },
    }));
  }

  function tick() {
    const date = state.simulatedDate || new Date();
    const { elevation, azimuth } = getSunPosition(date, state.lat, state.lon);
    applySunState(elevation, azimuth);
  }

  function setLocation(lat, lon, source) {
    state.lat = lat;
    state.lon = lon;
    state.locationSource = source || 'manual';
    saveStoredPrefs({ lat, lon, locationSource: state.locationSource });
    tick();
  }
  function setSimulatedTime(date) { state.simulatedDate = date; tick(); }
  function clearSimulatedTime() { state.simulatedDate = null; tick(); }
  function setForceDaytime(mode) {
    state.forceDaytime = mode === 'day' || mode === 'night' ? mode : null;
    saveStoredPrefs({ forceDaytime: state.forceDaytime });
    tick();
  }
  function setReduceMotion(on) {
    document.documentElement.classList.toggle('force-reduce-motion', on);
    saveStoredPrefs({ reduceMotion: !!on });
  }
  function setReduceTransparency(on) {
    document.documentElement.classList.toggle('reduce-transparency', on);
    saveStoredPrefs({ reduceTransparency: !!on });
  }

  function requestGeolocation() {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation(pos.coords.latitude, pos.coords.longitude, 'device'),
      () => { /* denied/unavailable — keep the timezone estimate */ },
      { maximumAge: 3600000, timeout: 8000 }
    );
  }

  window.SunShadow = {
    getSunPosition, tick, setLocation, setSimulatedTime, clearSimulatedTime,
    setForceDaytime, setReduceMotion, setReduceTransparency,
    requestGeolocation, getState: () => ({ ...state }),
  };

  tick();
  // Don't silently overwrite a location the visitor pinned manually —
  // only auto-detect if they haven't (device GPS or the timezone guess).
  if (state.locationSource !== 'manual') requestGeolocation();
  setInterval(() => { if (!state.simulatedDate) tick(); }, 60000);
})();
