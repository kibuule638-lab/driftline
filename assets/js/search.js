/*
  search.js
  ------------------------------------------------------------------
  Builds a flat index from window.GALLERY_DATA once, then filters it
  as the visitor types into #siteSearchInput. Entirely client-side —
  fine at this scale (a few dozen items); if the catalog grows into
  the thousands, swap this for a real search service and keep the
  same #siteSearchInput / #siteSearchResults markup.

  Works from any page depth because gallery-render.js is the only
  thing that needs to know whether it's at the root or in /pages/ —
  this file always links to "pages/<category>.html", and each page
  declares its own base via <body data-base="..."> so root pages
  and /pages/ pages resolve links correctly.
*/

(function () {
  const input = document.getElementById('siteSearchInput');
  const results = document.getElementById('siteSearchResults');
  if (!input || !results || !window.GALLERY_DATA) return;

  const base = document.body.getAttribute('data-base') || '';

  const CATEGORY_LABELS = {
    countries: 'Countries & Landscapes',
    seasons: 'Seasons',
    'water-fields': 'Water & Green Fields',
    'flowers-wildlife': 'Flowers & Wildlife',
    'light-fog': 'Light & Fog',
    'modern-homes': 'Modern Homes in Nature',
    shorelines: 'Shorelines',
    'more-wonders': 'More Wonders',
  };

  const index = [];
  Object.keys(window.GALLERY_DATA).forEach((category) => {
    window.GALLERY_DATA[category].forEach((item) => {
      index.push({ ...item, category });
    });
  });

  function matches(item, q) {
    const hay = `${item.title} ${item.place} ${item.tag} ${item.blurb}`.toLowerCase();
    return hay.includes(q);
  }

  function render(list, q) {
    if (!q) { results.innerHTML = ''; results.hidden = true; return; }
    if (list.length === 0) {
      results.innerHTML = `<p class="search-empty">No wallpapers match "${q}".</p>`;
      results.hidden = false;
      return;
    }
    results.innerHTML = list.slice(0, 7).map((item) => `
      <a class="search-result" href="${base}pages/${item.category}.html#${item.id}">
        <span class="swatch ${item.grad}"></span>
        <span class="meta">
          <span class="title">${item.title}</span>
          <span class="sub">${item.place} · ${CATEGORY_LABELS[item.category]}</span>
        </span>
      </a>
    `).join('');
    results.hidden = false;
  }

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    render(q ? index.filter((item) => matches(item, q)) : [], q);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) results.hidden = false;
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) results.hidden = true;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { results.hidden = true; input.blur(); }
  });
})();
