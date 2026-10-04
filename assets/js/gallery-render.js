/*
  gallery-render.js
  ------------------------------------------------------------------
  Reads data-category off #gallery, looks up that category's items
  in window.GALLERY_DATA, and builds the card grid. Each card:
    - shows a hand-tuned CSS gradient immediately (see gallery.css)
    - tries to load ../assets/images/<category>/<id>.jpg
    - if that file exists, the photo replaces the gradient
    - if not (onerror), the <img> is hidden and the gradient stays

  This means you never touch this file to add photos — just save
  an image at the path printed in the console for each card (open
  devtools once to see the full list) or check README.md.
*/

(function () {
  const container = document.getElementById('gallery');
  if (!container) return;

  const category = container.getAttribute('data-category');
  const items = (window.GALLERY_DATA && window.GALLERY_DATA[category]) || [];
  const countEl = document.getElementById('galleryCount');
  if (countEl) countEl.textContent = `${items.length} wallpaper${items.length === 1 ? '' : 's'}`;

  const frag = document.createDocumentFragment();

  items.forEach((item) => {
    const imagePath = `../assets/images/${category}/${item.id}.jpg`;

    const card = document.createElement('article');
    card.className = 'wp-card';
    card.id = item.id;

    const media = document.createElement('div');
    media.className = `card-media ${item.grad}`;

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = `${item.title} — ${item.place}`;
    img.src = imagePath;
    img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true });

    media.appendChild(img);

    const caption = document.createElement('div');
    caption.className = 'card-caption';
    caption.innerHTML = `
      <span class="glass-chip">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.place} — ${item.blurb}</p>
    `;

    card.appendChild(media);
    card.appendChild(caption);
    frag.appendChild(card);

    console.info(`[nature-wallpapers] ${item.id} expects an image at: assets/images/${category}/${item.id}.jpg`);
  });

  container.appendChild(frag);

  // If arriving from a search result (e.g. #iceland-glacier-lagoon),
  // scroll the matching card into view and give it a brief highlight.
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('wp-card-highlight');
        setTimeout(() => target.classList.remove('wp-card-highlight'), 2200);
      });
    }
  }
})();
