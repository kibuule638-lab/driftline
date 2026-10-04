import re, pathlib

root = pathlib.Path("/home/claude/nature-wallpapers/pages")
template = (root / "countries.html").read_text()

categories = [
    {
        "key": "seasons",
        "amp": "Seasons",
        "meta_desc": "Eight wallpapers across the four seasons — blossom, harvest gold, autumn fire, and winter frost.",
        "hero_desc": "Blossom, harvest, fire, and frost — the same land photographed as each season insists on being seen.",
    },
    {
        "key": "water-fields",
        "amp": "Water &amp; Green Fields",
        "meta_desc": "Eight wallpapers of rivers, rice terraces, waterfalls, and open green meadow.",
        "hero_desc": "Rivers, rice terraces, waterfalls, and the green fields that surround them.",
    },
    {
        "key": "flowers-wildlife",
        "amp": "Flowers &amp; Wildlife",
        "meta_desc": "Eight wallpapers of bloom fields and the wildlife that lives among them.",
        "hero_desc": "Bloom fields, migratory wings, and the quiet animals that share them.",
    },
    {
        "key": "light-fog",
        "amp": "Light &amp; Fog",
        "meta_desc": "Eight wallpapers built almost entirely from light — sunbeams, mist, aurora, and golden hour.",
        "hero_desc": "Sunbeams through canopy, mist over water, and the hour just before the sun fully sets.",
    },
    {
        "key": "modern-homes",
        "amp": "Modern Homes in Nature",
        "meta_desc": "Eight wallpapers of quiet modern architecture set inside natural landscapes.",
        "hero_desc": "Glass, timber, and concrete, placed carefully inside land that was there first.",
    },
    {
        "key": "shorelines",
        "amp": "Shorelines",
        "meta_desc": "Eight coastal wallpapers — sand, tide pools, cliffs, and sunset over open water.",
        "hero_desc": "Sand, tide pools, and the exact moment the sun meets the water.",
    },
    {
        "key": "more-wonders",
        "amp": "More Wonders",
        "meta_desc": "Eight wallpapers that didn't fit anywhere else — starlight, canyons, and volcanic dusk.",
        "hero_desc": "Everything beautiful that refused to fit in the other seven collections.",
    },
]

for cat in categories:
    html = template
    plain = cat["amp"].replace("&amp;", "&")

    html = html.replace(
        "<title>Countries &amp; Landscapes Wallpapers — Driftline</title>",
        f"<title>{cat['amp']} Wallpapers — Driftline</title>",
    )
    html = html.replace(
        "Eight landscape wallpapers from Iceland to Patagonia — glaciers, savanna, fjords, and desert dunes, in high resolution.",
        cat["meta_desc"],
    )
    html = html.replace("pages/countries.html", f"pages/{cat['key']}.html")
    html = html.replace(
        'content="Countries & Landscapes Wallpapers — Driftline"',
        f'content="{plain} Wallpapers — Driftline"',
    )
    html = html.replace(
        "Eight landscape wallpapers from Iceland to Patagonia.",
        cat["meta_desc"],
    )
    html = html.replace(
        '"name": "Countries & Landscapes Wallpapers"',
        f'"name": "{plain} Wallpapers"',
    )
    html = html.replace(
        "<h1>Countries &amp; Landscapes</h1>",
        f"<h1>{cat['amp']}</h1>",
    )
    html = html.replace(
        "Eight places, eight moods — glacial lagoons, ancient forest, open savanna, and granite peaks, arranged the way morning light finds each of them.",
        cat["hero_desc"],
    )

    pill_block = re.search(r'<nav class="category-pills".*?</nav>', html, re.S).group(0)
    new_pill_block = pill_block.replace(
        '<a href="countries.html" aria-current="page">Countries &amp; Landscapes</a>',
        '<a href="countries.html">Countries &amp; Landscapes</a>',
    ).replace(
        f'<a href="{cat["key"]}.html">{cat["amp"]}</a>',
        f'<a href="{cat["key"]}.html" aria-current="page">{cat["amp"]}</a>',
    )
    html = html.replace(pill_block, new_pill_block)

    html = html.replace('data-category="countries"', f'data-category="{cat["key"]}"')

    (root / f"{cat['key']}.html").write_text(html)
    print("wrote", cat["key"] + ".html")
