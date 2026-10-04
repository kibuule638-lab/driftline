/*
  gallery-data.js
  ------------------------------------------------------------------
  One entry per wallpaper card. `image` is the exact path
  gallery-render.js will request — drop a real photo at that path
  (relative to /pages/) and it replaces the gradient placeholder
  automatically, no code changes needed. See README.md for the
  full naming convention and recommended image specs.
*/

window.GALLERY_DATA = {

  countries: [
    { id: 'iceland-glacier-lagoon', title: 'Jökulsárlón Glacier Lagoon', place: 'Iceland', tag: 'Ice', blurb: 'Icebergs drifting toward black sand under a low arctic sun.', grad: 'grad-ice' },
    { id: 'yakushima-cedar-forest', title: 'Ancient Cedar Forest', place: 'Yakushima, Japan', tag: 'Forest', blurb: 'Moss-covered cedars older than most nations, wrapped in mist.', grad: 'grad-forest' },
    { id: 'maasai-mara-savanna', title: 'Maasai Mara at Dusk', place: 'Kenya', tag: 'Savanna', blurb: 'Acacia silhouettes against a wide golden horizon.', grad: 'grad-savanna' },
    { id: 'swiss-alpine-valley', title: 'Lauterbrunnen Valley', place: 'Switzerland', tag: 'Alpine', blurb: 'A glacial valley walled by ninety waterfalls.', grad: 'grad-alpine' },
    { id: 'milford-sound-fjord', title: 'Milford Sound', place: 'New Zealand', tag: 'Fjord', blurb: 'Rainforest cliffs dropping straight into still water.', grad: 'grad-fjord' },
    { id: 'sahara-dunes-morocco', title: 'Erg Chebbi Dunes', place: 'Morocco', tag: 'Desert', blurb: 'Wind-carved ridgelines lit low and long at sunset.', grad: 'grad-desert' },
    { id: 'norway-aurora-mountains', title: 'Aurora Over Lofoten', place: 'Norway', tag: 'Aurora', blurb: 'Green light rippling above snow-capped peaks.', grad: 'grad-aurora' },
    { id: 'patagonia-towers', title: 'Torres del Paine', place: 'Patagonia, Chile', tag: 'Peaks', blurb: 'Granite towers catching the first light of day.', grad: 'grad-peaks' },
  ],

  seasons: [
    { id: 'spring-cherry-orchard', title: 'Cherry Orchard in Bloom', place: 'Spring', tag: 'Spring', blurb: 'Petals drifting over rows of blossoming trees.', grad: 'grad-blossom' },
    { id: 'summer-golden-wheat', title: 'Wheat Field at Golden Hour', place: 'Summer', tag: 'Summer', blurb: 'Warm wind moving through a full-grown field.', grad: 'grad-wheat' },
    { id: 'autumn-maple-forest', title: 'Maple Forest in Fire', place: 'Autumn', tag: 'Autumn', blurb: 'A canopy turned entirely amber and red.', grad: 'grad-maple' },
    { id: 'winter-snow-pines', title: 'Snow-Laden Pine Forest', place: 'Winter', tag: 'Winter', blurb: 'Fresh snowfall bending branches under quiet light.', grad: 'grad-snow' },
    { id: 'summer-provence-lavender', title: 'Lavender Rows in Bloom', place: 'Provence, France', tag: 'Summer', blurb: 'Straight purple lines running to a stone farmhouse.', grad: 'grad-lavender' },
    { id: 'autumn-vineyard-harvest', title: 'Vineyard at Harvest', place: 'Autumn', tag: 'Autumn', blurb: 'Rows turning gold as the grapes come in.', grad: 'grad-vineyard' },
    { id: 'spring-misty-rainforest', title: 'Rainforest at First Light', place: 'Spring', tag: 'Spring', blurb: 'New growth emerging through low morning mist.', grad: 'grad-mist' },
    { id: 'winter-frosted-wetland', title: 'Frosted Wetland at Dawn', place: 'Winter', tag: 'Winter', blurb: 'Frozen reeds catching the first pink light.', grad: 'grad-wetland' },
  ],

  'water-fields': [
    { id: 'plitvice-turquoise-river', title: 'Plitvice Turquoise Falls', place: 'Croatia', tag: 'Water', blurb: 'Mineral-rich water cascading through travertine pools.', grad: 'grad-river' },
    { id: 'ireland-green-hills', title: 'Rolling Hills of Kerry', place: 'Ireland', tag: 'Fields', blurb: 'Stone walls dividing an impossibly green landscape.', grad: 'grad-hills' },
    { id: 'bali-rice-terraces', title: 'Tegallalang Rice Terraces', place: 'Bali, Indonesia', tag: 'Fields', blurb: 'Stepped paddies catching the last of the afternoon.', grad: 'grad-terrace' },
    { id: 'rainforest-waterfall', title: 'Hidden Rainforest Falls', place: 'Water', tag: 'Water', blurb: 'A single drop into a clear jungle pool.', grad: 'grad-waterfall' },
    { id: 'wildflower-green-meadow', title: 'Wildflower Meadow', place: 'Fields', tag: 'Fields', blurb: 'Clover and wild grass moving in an open field.', grad: 'grad-meadow' },
    { id: 'misty-lake-reflection', title: 'Still Lake at Dawn', place: 'Water', tag: 'Water', blurb: 'A perfect mirror before the wind picks up.', grad: 'grad-lake' },
    { id: 'emerald-fjord-water', title: 'Emerald Fjord', place: 'Norway', tag: 'Water', blurb: 'Glacial melt turning the water a deep jade green.', grad: 'grad-emerald' },
    { id: 'wetland-marsh-sunrise', title: 'Marsh at Sunrise', place: 'Fields', tag: 'Fields', blurb: 'Reed beds glowing as the sun clears the horizon.', grad: 'grad-marsh' },
  ],

  'flowers-wildlife': [
    { id: 'netherlands-tulip-fields', title: 'Tulip Fields in Rows', place: 'Netherlands', tag: 'Flowers', blurb: 'Color blocks running to the edge of sight.', grad: 'grad-tulip' },
    { id: 'japan-cherry-blossom-canopy', title: 'Cherry Blossom Canopy', place: 'Japan', tag: 'Flowers', blurb: 'A tunnel of pale pink over a quiet path.', grad: 'grad-cherry' },
    { id: 'kenya-elephants-waterhole', title: 'Elephants at the Waterhole', place: 'Kenya', tag: 'Wildlife', blurb: 'A family gathering as the heat of the day sets in.', grad: 'grad-elephant' },
    { id: 'arctic-fox-snow', title: 'Arctic Fox in Fresh Snow', place: 'Wildlife', tag: 'Wildlife', blurb: 'White coat nearly vanishing into the drift.', grad: 'grad-fox' },
    { id: 'alpine-wildflower-meadow', title: 'Alpine Wildflower Meadow', place: 'Flowers', tag: 'Flowers', blurb: 'A high meadow bursting with color after snowmelt.', grad: 'grad-alpinebloom' },
    { id: 'flamingos-lake-nakuru', title: 'Flamingos on Lake Nakuru', place: 'Kenya', tag: 'Wildlife', blurb: 'Thousands of pink wings against still water.', grad: 'grad-flamingo' },
    { id: 'wild-orchids-rainforest', title: 'Wild Orchids, Forest Floor', place: 'Flowers', tag: 'Flowers', blurb: 'Delicate color against deep green shade.', grad: 'grad-orchid' },
    { id: 'red-fox-autumn-field', title: 'Red Fox in an Autumn Field', place: 'Wildlife', tag: 'Wildlife', blurb: 'A quiet pause among tall amber grass.', grad: 'grad-redfox' },
  ],

  'light-fog': [
    { id: 'forest-canopy-godrays', title: 'Sunbeams Through the Canopy', place: 'Light', tag: 'Light', blurb: 'Shafts of light finding their way to the forest floor.', grad: 'grad-godrays' },
    { id: 'misty-valley-sunrise', title: 'Misty Valley at Sunrise', place: 'Fog', tag: 'Fog', blurb: 'Layers of ridgeline rising through morning cloud.', grad: 'grad-valley' },
    { id: 'foggy-coastal-lighthouse', title: 'Lighthouse in the Fog', place: 'Fog', tag: 'Fog', blurb: 'A single beam cutting through rolling sea mist.', grad: 'grad-lighthouse' },
    { id: 'golden-hour-wheat-field', title: 'Golden Hour Over Wheat', place: 'Light', tag: 'Light', blurb: 'The last warm light of the day skimming the field.', grad: 'grad-golden' },
    { id: 'aurora-mountains-sky', title: 'Aurora Above the Peaks', place: 'Light', tag: 'Light', blurb: 'Color moving slowly across a clear night sky.', grad: 'grad-aurorasky' },
    { id: 'moonlit-fog-lake', title: 'Moonlit Fog Over the Lake', place: 'Fog', tag: 'Fog', blurb: 'Soft blue light diffusing through low mist.', grad: 'grad-moonfog' },
    { id: 'crepuscular-rays-sea', title: 'Crepuscular Rays Over the Sea', place: 'Light', tag: 'Light', blurb: 'Sunlight breaking through clouds onto open water.', grad: 'grad-crepuscular' },
    { id: 'river-mist-dawn', title: 'Mist Rising Off the River', place: 'Fog', tag: 'Fog', blurb: 'Warm water meeting cold morning air.', grad: 'grad-rivermist' },
  ],

  'modern-homes': [
    { id: 'norway-glass-lake-cabin', title: 'Glass Cabin on the Water', place: 'Norway', tag: 'Architecture', blurb: 'A minimal structure floating above a still lake.', grad: 'grad-cabin' },
    { id: 'california-cliffside-villa', title: 'Cliffside Villa', place: 'California, USA', tag: 'Architecture', blurb: 'Clean concrete lines against the Pacific coast.', grad: 'grad-villa' },
    { id: 'scandinavian-forest-retreat', title: 'Forest Retreat', place: 'Scandinavia', tag: 'Architecture', blurb: 'Timber and glass set quietly among the pines.', grad: 'grad-retreat' },
    { id: 'joshua-tree-desert-home', title: 'Desert Modern House', place: 'Joshua Tree, USA', tag: 'Architecture', blurb: 'Low, wide lines echoing the desert horizon.', grad: 'grad-joshua' },
    { id: 'amsterdam-floating-house', title: 'Floating House on the Canal', place: 'Amsterdam, Netherlands', tag: 'Architecture', blurb: 'A modern home riding gently on the water.', grad: 'grad-floating' },
    { id: 'mountain-chalet-glass', title: 'Mountain Chalet', place: 'Architecture', tag: 'Architecture', blurb: 'A wall of glass framing the whole valley.', grad: 'grad-chalet' },
    { id: 'hillside-eco-home', title: 'Eco-Home in the Hillside', place: 'Architecture', tag: 'Architecture', blurb: 'A roofline that becomes the hill itself.', grad: 'grad-hillside' },
    { id: 'bamboo-courtyard-house', title: 'Courtyard House in Bamboo', place: 'Architecture', tag: 'Architecture', blurb: 'Open rooms wrapped by a living green screen.', grad: 'grad-courtyard' },
  ],

  shorelines: [
    { id: 'golden-sunrise-calm-bay', title: 'Sunrise Over a Calm Bay', place: 'Shorelines', tag: 'Sunrise', blurb: 'Still water catching the very first light.', grad: 'grad-bay' },
    { id: 'big-sur-sunset-cliffs', title: 'Sunset Cliffs, Big Sur', place: 'California, USA', tag: 'Sunset', blurb: 'Waves breaking far below a dramatic coastline.', grad: 'grad-cliffs' },
    { id: 'maldives-turquoise-shore', title: 'Turquoise Shallows', place: 'Maldives', tag: 'Shore', blurb: 'White sand fading into impossibly clear water.', grad: 'grad-maldives' },
    { id: 'footprints-sand-dusk', title: 'Footprints at Dusk', place: 'Shorelines', tag: 'Shore', blurb: 'A single trail disappearing down an empty beach.', grad: 'grad-footprints' },
    { id: 'rocky-coastline-waves', title: 'Rocky Coastline', place: 'Shorelines', tag: 'Shore', blurb: 'Waves crashing against dark, weathered stone.', grad: 'grad-rocky' },
    { id: 'palm-lined-tropical-beach', title: 'Palm-Lined Beach', place: 'Shorelines', tag: 'Shore', blurb: 'Leaning palms framing a quiet stretch of sand.', grad: 'grad-palms' },
    { id: 'tide-pools-low-tide', title: 'Tide Pools at Low Tide', place: 'Shorelines', tag: 'Shore', blurb: 'Small worlds left behind as the water retreats.', grad: 'grad-tidepool' },
    { id: 'driftwood-sunset-silhouette', title: 'Driftwood at Sunset', place: 'Shorelines', tag: 'Sunset', blurb: 'Weathered wood silhouetted against warm color.', grad: 'grad-driftwood' },
  ],

  'more-wonders': [
    { id: 'milky-way-over-mountains', title: 'Milky Way Over the Range', place: 'Night Sky', tag: 'Night', blurb: 'Thousands of stars above a dark ridgeline.', grad: 'grad-milkyway' },
    { id: 'bioluminescent-waves-night', title: 'Bioluminescent Waves', place: 'Night', tag: 'Night', blurb: 'Blue light glowing in the curl of every wave.', grad: 'grad-biolum' },
    { id: 'provence-lavender-sunset', title: 'Lavender at Sunset', place: 'Provence, France', tag: 'More', blurb: 'Rows glowing violet as the sun drops low.', grad: 'grad-provence' },
    { id: 'ancient-redwood-canopy', title: 'Ancient Redwood Canopy', place: 'California, USA', tag: 'More', blurb: 'Light filtering through trees a thousand years old.', grad: 'grad-redwood' },
    { id: 'volcanic-steam-vents-dusk', title: 'Volcanic Vents at Dusk', place: 'More', tag: 'More', blurb: 'Steam rising against a darkening orange sky.', grad: 'grad-volcanic' },
    { id: 'desert-stars-long-exposure', title: 'Desert Sky, Long Exposure', place: 'Night', tag: 'Night', blurb: 'Star trails circling above an empty dune sea.', grad: 'grad-desertstars' },
    { id: 'layered-canyon-formations', title: 'Layered Canyon Walls', place: 'More', tag: 'More', blurb: 'Millions of years of color stacked in stone.', grad: 'grad-canyon' },
    { id: 'cloud-inversion-peaks', title: 'Cloud Inversion Above the Peaks', place: 'More', tag: 'More', blurb: 'Summits breaking through a sea of low cloud.', grad: 'grad-inversion' },
  ],

};
