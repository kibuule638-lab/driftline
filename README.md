# Driftline — Nature Wallpapers

A multi-page wallpaper site built around one idea: the home page clock computes
the real position of the sun, and every neumorphic shadow on the site — the
clock itself, buttons, toggles, wallpaper cards — is generated from that
number. Morning visits get long, warm, low-angle shadows swinging from the
east; midday visits get short, cool, nearly-vertical ones; after dusk, the
whole site swaps into a dark theme with soft indigo shadows.

No build step, no framework, no dependencies. Open `index.html` in a server
(see **Running it** below) and it works.

---

## 1. Project structure

```
nature-wallpapers/
├── index.html                  Home page: hero, sun-clock, category grid
├── settings.html                Appearance / location / time-preview / a11y
├── pages/
│   ├── countries.html           Countries & Landscapes
│   ├── seasons.html             Seasons
│   ├── water-fields.html        Water & Green Fields
│   ├── flowers-wildlife.html    Flowers & Wildlife
│   ├── light-fog.html           Light & Fog
│   ├── modern-homes.html        Modern Homes in Nature
│   ├── shorelines.html          Shorelines
│   └── more-wonders.html        More Wonders (the catch-all)
├── assets/
│   ├── css/
│   │   ├── variables.css        Design tokens (color, type, spacing)
│   │   ├── base.css             Reset, accessibility helpers
│   │   ├── neumorphism.css      .neu-surface / .neu-btn / .neu-toggle / clock
│   │   ├── glass.css            The only two glassmorphic surfaces on the site
│   │   ├── layout.css           Nav, hero, category grid, footer, search UI
│   │   ├── gallery.css          Wallpaper card grid + all placeholder gradients
│   │   └── settings.css         Settings page layout
│   ├── js/
│   │   ├── sun-shadow.js        THE ENGINE — solar position → CSS variables
│   │   ├── clock.js             Draws/rotates the analog clock hands
│   │   ├── nav.js               Mobile menu toggle
│   │   ├── gallery-data.js      Every wallpaper's title/caption/image path
│   │   ├── gallery-render.js    Builds each category page's card grid
│   │   ├── search.js            Site-wide client-side search
│   │   └── settings.js          Wires up the settings page controls
│   └── images/
│       ├── countries/  seasons/  water-fields/  flowers-wildlife/
│       ├── light-fog/  modern-homes/  shorelines/  more-wonders/
│       ├── hero/        For a future social-share image (see SEO below)
│       └── ui/          Anything you want for icons/favicons later
└── build/
    └── generate_pages.py     One-time script used to generate the 7 category
                               pages from countries.html as a template. You
                               won't need to run this again unless you're
                               adding a 9th category — see §4.
```

## 2. Running it

Opening `index.html` by double-clicking will mostly work, but the built-in
search and a couple of `fetch`-adjacent browser behaviors are happier over a
real (even local) server. Easiest options:

```bash
# Python (already on most machines)
cd nature-wallpapers && python3 -m http.server 8000

# or Node, if you have it
npx serve nature-wallpapers
```

Then visit `http://localhost:8000`.

## 3. Adding your own photos

Every wallpaper card already has a real `<img>` pointing at an exact path —
it's just that the file doesn't exist yet, so you see a hand-tuned CSS
gradient instead (see `assets/css/gallery.css`, one `.grad-*` class per item).
**Nothing in the code needs to change.** Just save a photo at the path the
card expects and it replaces the gradient automatically on next load.

The path pattern is:

```
assets/images/<category-folder>/<item-id>.jpg
```

Every `<item-id>` and its folder are listed in `assets/js/gallery-data.js` —
open that file, and each entry looks like:

```js
{ id: 'iceland-glacier-lagoon', title: 'Jökulsárlón Glacier Lagoon', place: 'Iceland', ... }
```

That entry expects a file at `assets/images/countries/iceland-glacier-lagoon.jpg`.
If you'd rather see the full list per page without opening the data file,
open any category page's browser console (F12) — `gallery-render.js` prints
the exact expected path for every card as it renders.

**Recommended image specs:**
- **Aspect ratio:** 4:5 (portrait) — matches the card shape (`aspect-ratio: 4/5`
  in `gallery.css`). A landscape photo will just get cropped by `object-fit:
  cover`, which usually looks fine, but 4:5 crops give you control.
- **Size:** ~1200×1500px is plenty; the cards render far smaller than that.
  Compress to keep pages fast — aim under ~300KB per photo.
- **Format:** `.jpg` for photos (as coded). If you'd rather use `.webp`,
  change the `.jpg` in the `imagePath` line of `gallery-render.js` — one line.
- **Alt text:** already generated for you from `title` + `place` in
  `gallery-data.js` — keep those fields accurate and you never have to think
  about alt text again.

**What kind of photo fits each category** (the brief this project started
from, in case you're sourcing or shooting to match):
| Category | Look for |
|---|---|
| Countries & Landscapes | Wide, place-specific shots — a landmark or terrain that reads as "this exact country" |
| Seasons | The same kind of scene (forest, field) shot in each of the four seasons |
| Water & Green Fields | Rivers, terraces, waterfalls, open meadow — anything green-and-wet |
| Flowers & Wildlife | Close-to-medium shots of blooms or animals in their habitat |
| Light & Fog | Shots where the *light itself* is the subject — god rays, mist, golden hour |
| Modern Homes in Nature | Architecture photography — clean lines against a wild backdrop |
| Shorelines | Coastlines, beaches, tide pools, sunrise/sunset over water |
| More Wonders | Anything spectacular that doesn't fit the other seven — night skies, canyons, volcanoes |

The homepage's social-share image (`og:image` in `index.html`'s `<head>`)
points at `assets/images/hero/social-preview.jpg` (1200×630px is the standard
Open Graph size) — add one there whenever you're ready to share the site.

## 4. Adding a 9th category

1. Add a new key to `assets/js/gallery-data.js` (an array of items, same
   shape as the others).
2. Add a matching folder under `assets/images/`.
3. Add a new gradient class per item to `assets/css/gallery.css` (or reuse
   an existing one).
4. Copy `pages/countries.html` → `pages/your-key.html` and update the title,
   meta description, canonical URL, JSON-LD, `<h1>`, hero paragraph, and the
   `data-category` attribute on the `#gallery` div — or extend
   `build/generate_pages.py` with one more entry in the `categories` list and
   re-run it (`python3 build/generate_pages.py`).
5. Add the new page to the pill nav (`.category-pills`) on every existing
   page, and to the footer's collections list, and to the home page's
   category grid.

## 5. How the sun-shadow system works

`assets/js/sun-shadow.js` implements the standard NOAA simplified
solar-position equations (public-domain astronomy — see
https://gml.noaa.gov/grad/solcalc/solareqns.PDF) to compute solar
**elevation** (how high the sun is) and **azimuth** (which direction it's in)
for a given date/time/latitude/longitude. Every minute, it:

1. Recomputes elevation + azimuth.
2. Maps elevation to shadow length + blur (long/soft near the horizon,
   short/crisp near solar noon) and to a color (warm near sunrise/sunset,
   neutral grey near noon, deep indigo once the sun is below -6°).
3. Maps azimuth to a direction, so the shadow always falls opposite the sun.
4. Writes all of this to CSS custom properties on `<html>`
   (`--shadow-dx`, `--shadow-dy`, `--shadow-blur`, `--shadow-color`,
   `--shadow-color-light`, `--sun-accent`, `--sun-elevation`) and toggles
   `[data-daytime="day"|"night"]`.

Every `.neu-surface`, `.neu-btn`, `.neu-toggle`, and `.wp-card` in the CSS
reads those variables inside its `box-shadow` — nothing is hard-coded, so
adding a new neumorphic component anywhere on the site just means using the
same variables and it inherits the current light automatically.

Location comes from `navigator.geolocation` if the visitor allows it,
otherwise from a rough estimate based on the browser's timezone offset.
Settings → Location has a manual latitude/longitude field for anyone who
wants it exact.

## 6. Settings & persistence

Every setting (`assets/js/sun-shadow.js`, function `saveStoredPrefs`) is
written to `localStorage` under the key `driftline-prefs-v1` and re-applied
on every page load — not just on `settings.html`. Change "Always night" on
the Settings page, then visit Home: it's still in effect. This works because
`sun-shadow.js` (which loads on every page) reads and applies stored
preferences before its very first paint, rather than settings only being
read/applied by `settings.js` (which only runs on `settings.html`).

What's stored: forced day/night mode, manual latitude/longitude (and how it
was set — device GPS vs. typed in), reduce-motion, and reduce-transparency.
The "preview a time of day" slider is intentionally **not** persisted — it's
a one-off preview tool, not a setting you'd want stuck on next visit.

If `localStorage` is unavailable (private browsing, or a sandboxed preview
that blocks it), everything above still works for the current session — it
just won't be remembered on the next visit. No errors, no broken UI; the
`try/catch` around every storage call in `sun-shadow.js` guarantees that.

## 7. SEO

Every page already has the full block: a unique `<title>`, `<meta
name="description">`, canonical `<link>`, Open Graph tags, and a JSON-LD
`CollectionPage`/`WebSite` schema. To finish the job when you have a real
domain:

- Replace every `https://driftline.example/` with your real domain
  (search-and-replace across all `.html` files).
- Fill in `sitemap.xml` and `robots.txt` (both included, at the project
  root) with the same domain.
- Add the `og:image` (see §3) so shared links show a preview photo.
- Keep each page's `<meta name="description">` under ~155 characters —
  they're already written that way.
- `settings.html` is set to `noindex, follow` on purpose — it's a utility
  page, not content search engines should surface.

## 8. Accessibility notes

- Skip link on every page (Tab once on load).
- All interactive controls are real `<button>`/`<input>` elements with
  `aria-*` states, not styled `<div>`s.
- `prefers-reduced-motion` is respected automatically; Settings also offers
  an in-app override for anyone whose OS-level setting isn't on.
- The two glass surfaces (nav bar, photo captions) stay low-blur by design
  and have a "reduce transparency" override in Settings that flattens them
  to solid, high-contrast panels.
- Every wallpaper card's `alt` text is generated from its title + place —
  keep `gallery-data.js` accurate and this stays correct for free.
