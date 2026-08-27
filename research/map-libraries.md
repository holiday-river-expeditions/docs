# Trips Map — Library & Tile Research

Research for the Aug 20 decision to replace the homepage trips carousel with a topographic, ideally interactive map of all trips across Utah/Colorado (~10–15 markers). Constraints: Next.js 16 App Router / React 19, Vercel, design-conscious brand, axe accessibility CI, small-business budget.

## Rendering libraries

| Option | Bundle (gz) | React 19 / App Router | Accessibility | Status 2026 |
|---|---|---|---|---|
| **MapLibre GL JS** + react-map-gl v8 | ~200 KB | Works (`react-map-gl/maplibre` entry, client-only via `next/dynamic` `ssr:false`) | WebGL canvas — needs HTML `<Marker>`s (real DOM) + text alternative to pass axe | BSD-3, very active; the open-source vector standard |
| **Leaflet 1.9** + react-leaflet v5 | ~42 KB | react-leaflet v5 *requires* React 19; same `ssr:false` | Best default: keyboard-operable maps/markers out of the box | BSD-2; 1.x maintenance mode, 2.0 still alpha |
| Mapbox GL JS | ~250 KB | Works | Same story as MapLibre | Proprietary since v2: token, telemetry, card on file — hard to justify over MapLibre |
| react-simple-maps | small | **Broken** — dead since 2023, peer deps cap at React 18 | — | Do not adopt; use `d3-geo` directly if SVG-from-GeoJSON is wanted |
| **Custom static SVG** (no library) | ~0 | SSRs perfectly, no dynamic import | Best possible: focusable SVG links, trivially axe-clean | Design effort, not code effort |

## Topographic tiles

The two genuinely free-for-commercial hosted options at our likely traffic (~200K–1M tiles/mo for a homepage map):

- **USGS National Map** (USGSTopo / Shaded Relief): public domain, no key, no limits, $0 forever. Classic USGS quad look; zero style control; gov server, no SLA.
- **Esri ArcGIS Location Platform** (Outdoor/Topographic): 2M tiles/mo free **with commercial use allowed**, API key + "Powered by Esri" attribution. Verify tile-vs-session billing at signup.

Paid upgrades when a more designed look is wanted: **MapTiler** Outdoor/Topo (prettiest ready-made styles, free tier is non-commercial — Flex $30/mo) or **Stadia** (Stamen Terrain heritage, free tier non-commercial — $20/mo). **OpenTopoMap is ruled out** (volunteer-run, not for commercial use). **Protomaps/PMTiles self-hosted** is ~$0/mo long-term and can look topographic with terrain-RGB hillshading, but has the highest setup effort.

Public-domain unlock: USGS 3DEP shaded relief can be exported, duotoned to the brand palette, and used freely as an art-directed background.

## Reference examples

- **NPS Park Tiles** — the paper-map-aesthetic gold standard; proof a branded topo look is a styling exercise.
- **AllTrails** — marker/terrain density reference.
- **OARS** — notably does *not* have a region-wide interactive topo trip map; a good one is a differentiator for Holiday.

## Recommendations

1. **Primary — MapLibre + react-map-gl + Esri Outdoor basemap (upgrade path: MapTiler). Effort M.** Lazy-mounted behind `next/dynamic` + IntersectionObserver with a server-rendered poster/trip-list fallback (zero CLS, crawler-safe). Markers as HTML `<a>` elements with labels; SSR'd trip list stays in the DOM as the text alternative. $0 on Esri's free tier; swapping to MapTiler later is a one-line style-URL change.
2. **Budget-zero fallback — Leaflet + react-leaflet + USGS tiles. Effort S.** 42 KB, best default a11y, $0, no key. Trade-off: locked to the USGS quad aesthetic (which has its own retro-outdoors charm).
3. **Maximum design control — custom SVG over duotoned USGS relief. Effort M–L (design time).** Hand-styled rivers and markers in brand red, fully server-rendered, ~0 KB JS, perfect axe scores, zero recurring cost. Strong contender given the actual requirement ("topographic in style, interactive is a plus"): a fixed-extent illustrated map satisfies both. Middle path: store marker coordinates in Sanity and project onto the SVG, so trips stay CMS-editable.

Full source list in the session research (progress/2026-08-27); key links: [MapLibre docs](https://maplibre.org/maplibre-gl-js/docs/) · [react-map-gl v8](https://github.com/visgl/react-map-gl/releases/tag/v8.0.0) · [react-leaflet v5](https://github.com/PaulLeCam/react-leaflet/releases) · [Leaflet a11y](https://leafletjs.com/examples/accessibility/) · [MapTiler pricing](https://www.maptiler.com/cloud/pricing/) · [Stadia pricing](https://stadiamaps.com/pricing/) · [USGS basemap services](https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer) · [ArcGIS Location Platform FAQ](https://location.arcgis.com/faq/) · [NPS Park Tiles](https://blog.mapbox.com/national-park-service-launches-park-tiles-3557e70b594d) · [Protomaps](https://docs.protomaps.com/basemaps/downloads)
