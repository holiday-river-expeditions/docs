# Site Architecture

> **Reconciled against the codebase 2026-08-27.** The "As Built" section below is verified against `website/src/app/` on `main`. The sections after it are still proposals from [[page-plan]] and have not been built.

## Routes — As Built

Every dynamic route is **ISR with `revalidate = 60`**. There is no `generateStaticParams` anywhere, so nothing is prebuilt — pages render on demand and are then cached.

### Pages

```
/                           → Homepage (hero, featured trips, brand story, trips map). The interactive Relief-style trips map (MapLibre + USGS tiles, photo medallions, verified outposts, oar borders. Markers render in two passes (photos, then every label above them) with click-through MapLibre wrappers and link boxes, so a click goes to whatever is visible on top. `hangBelow` on a marker's coords hangs it below its point where a neighbour's label would cover it (Yampa, under Gates of Lodore). The Style, Scale and Fly to comparison panel is on for everyone (it folds behind a "Map options" button on phones) until the new map design replaces it) replaced the river-selector carousel 2026-08-27 (PR #70, graduated from the trips-map demo flag); it lazy-mounts via IntersectionObserver so MapLibre stays off the critical path. Marker coords live in src/lib/trip-map-data.ts — moving them onto river documents is the follow-up. Since 2026-09-10 the map also draws every river stretch Holiday runs (real geometry from the USGS National Hydrography Dataset, one colour per river with a key), the White Rim bike route dashed, and a rough dashed Colorado Plateau outline (Sep 3 feedback)
/trips                      → Trip listing grid (filtering NOT built yet)
/trip-finder                → "Find Your Trip" wizard: guided matcher, fully server-rendered with all state in URL query params (every option is a link — shareable, back-button-native, works without JS). Questions, answers, dials, weights and photos come from the Sanity Trip Finder singleton (2026-09-04; in-code default as fallback); weighted scorer in src/lib/trip-finder.ts; unknown trip data scores neutral so a thin catalog never disqualifies. Live for every visitor since 2026-09-04 (homepage entry band, floating pill; the hero button follows the Homepage document's CTA link). Full write-up in [[trip-finder]]
/trips/[slug]               → Trip detail. Order since 2026-09-22 (Riley, Sep 17: trip info, then highlights, then map): hero-height banner; the info bar across the top (price, duration, rapid class or who-it's-for, season, min age, meeting place, deposit, river, live flow; 12px labels at 1.3 line height with a rule above, per Justin) with Book Now; description with the boxed land acknowledgement under it, beside highlights and the What's Included checklist; the interactive trip map of the section's stretch with the Section's photo points, full width; itinerary; video; photo slideshow; FAQs (headed "FAQs", Lauren's call on 2026-09-22, not "Good to Know"); Packing List / Getting Here / Before You Go panels; Dates & Availability (live Arctic data) last; then the "What Guests Say" reviews carousel with the platform links, and related trips
/rivers/[slug]              → River landing pages
/specialty                  → Specialty hub: per-family sections (copy, photo, dated departures, and cards for whole-trip specialty trips) navigated by the floating section menu; "View All Trips" expands the catalog in place. The per-family parent pages were removed 2026-08-26 (Aug 20 decision); specialty callout badges link to each date's own page
/specialty/[slug]           → One specialty date (2026-11-19): its write-up and photo, booking for that date, and the facts, description, highlights and itinerary of the river trip it runs on
/rafting                    → Rafting landing page; "View All Trips" expands the rest of the catalog in place (2026-09-10)
/biking                     → Biking landing page (same in-place expansion)
/open-seats                 → Redirects to /book (2026-08-27; preserves ?month)
/blog                       → Blog listing
/blog/[slug]                → Blog post
/faq                        → FAQ page (CMS-driven, accordion)
/contact                    → Contact form + company info
/book                       → "Book Your Trip": real-time availability across all trips (Arctic API), one card per trip (full-height photo panel, length tags, price and date count, details link). From lg up a long date list scrolls inside the card. Phones show the next 4 dates and link to the trip on its own (?trip=) for the rest. Filters for month, trip length and trip are URL params (?month=YYYY-MM, ?days=, ?trip=<slug>) in a sticky sidebar on desktop and a Filters disclosure below lg, with per-option counts and removable active-filter chips. The canonical target for the Book Now CTA and the footer's Trip Dates link
/admin                      → Arms the per-browser demo-flags overlay, then redirects home (noindex)
/[slug]                     → Generic CMS pages from the `page` builder
/studio/[[...tool]]         → Embedded Sanity Studio
```

**Notes on the catch-all.** `/about` and `/trip-insurance` are linked from the nav and footer but have **no route files** — they resolve only through `/[slug]` against seeded Sanity `page` documents. `/[slug]` also maintains a `RESERVED_SLUGS` set that 404s shadowed slugs; `store` and `trip-dates` are reserved but have no route, so they currently 404. There is **no `/rivers` index** — only `/rivers/[slug]`. `/specialty` **is** a real index page, unlike rivers and blog categories.

### Route handlers

```
POST   /api/book                        → Add a departure to the Arctic cart (Zod-validated)
GET    /api/book/pricing/[triptypeid]   → Public pricing levels for the booking widget
GET    /api/cart                        → List cart items
DELETE /api/cart                        → Remove a cart item
POST   /api/contact                     → Writes contactSubmission to Sanity
POST   /api/newsletter                  → Writes newsletterSubscriber to Sanity
POST   /api/revalidate                  → Sanity webhook, signature-verified, full-layout purge
GET    /api/arctic-health               → Ops diagnostic, bearer-gated, 404s otherwise
GET    /arctic-template                 → Hand-written HTML for Arctic's "Import Design" scrape
```

`/arctic-template` builds its nav from `navItems` in `Nav.tsx` and its footer links from `src/components/layout/footer-links.ts`, the same lists the site Header and Footer use, so link changes reach it automatically. It reads phone, address and social links from Site Settings and falls back to the defaults if Sanity is down. It leaves out the newsletter signup, which needs a form and JavaScript. ⚠️ **Arctic keeps its own copy.** After a template change reaches production, someone has to re-import it in the Arctic admin, or Arctic's checkout keeps the old chrome. The path is Settings → Guest-Facing Sites → pencil on Manage Guest-Facing Sites → Reimport next to the design, using `{site}/arctic-template` as the URL ([Arctic help 30.4](https://support.arcticreservations.com/index.php?pg=kb.page&id=115)). Arctic's help says to back up the current design first and check it with Preview Design before making it live.

### Navigation as shipped

Header: centered logo lockup, desktop nav (**Rafting · Biking · Specialty · About Us · Blog · Contact**), mobile hamburger drawer, `MiniCart`, and a "Book Now" button to `/book`. The homepage hero carries the phone number and email (from Site Settings) under the CTA, and trip cards show the river name (verbatim from the Sanity river doc) where the difficulty label used to sit — difficulty remains on the trip detail page only.

The root layout hands the header, footer and floating chrome to `SiteFrame` (`components/layout/SiteFrame.tsx`), a small client component that renders them around every page except `/studio`. The Studio is a full-viewport app, and inside the site chrome it had a second scrollbar that hid its Publish button (fixed 2026-09-22). There is still one root layout, so the 404 page keeps the site chrome.

The logo (header and footer) is the original horizontal SVG brand lockup (`/logo-horizontal-red.svg`), per the 2026-08-20 decision to return to the delivered logotype. The four alternates that were behind demo flags were removed on 2026-11-06, along with their SVGs (`logo-secondary-red.svg`, `logo-legacy-red.svg`), once Darius settled on the default.

The header is **sticky** for everyone since 2026-11-06 (it was the `sticky-header` flag): persistent nav and logo while scrolling. `HeaderHeight` (client, in `components/layout/`) keeps `--site-header-h` on `<html>` at the header's real height (80px on phones, 94px on desktop) so the trip bar sits flush under it. The `header-reveal` flag (hide on scroll down, back on scroll up) was removed at the same time, since it only applied when the header was not sticky. `globals.css` sets `html { scroll-padding-top: var(--site-header-h) }` (plus 3.25rem for the trip bar on pages that have it), so anchor jumps, `scrollIntoView` and keyboard focus never land under the sticky chrome (WCAG 2.2 Focus Not Obscured). Sections add only `scroll-mt-6` for breathing room.

**Phone logo** (Darius, 2026-11-07: it read too small at 26px, where "EXPEDITIONS" was about 8px tall). Below `md` the header is 86px with a 46px logo on arrival and condenses to 56px with a 32px logo once the page scrolls. `HeaderHeight` stamps `data-header-condensed` on `<html>` past 40px of scroll and removes it above 8px (the gap stops it flickering). The header row has explicit heights in both states, and the header gains a 30px bottom margin while condensed, equal to the height it loses. The row, logo and margin share one 200ms ease-out, so the header's total height in the page flow never changes and the page below doesn't move (measured layout shift 0.0001 per change). `--site-header-h` follows through the ResizeObserver, so the trip bar tracks it. Desktop keeps a fixed 94px header with a 48px logo. Options considered: centred like desktop (capped at about 40px), icon only (loses the name), and the vertical lockup (smaller wordmark).

Content-heavy pages carry a **section menu**: the trip bar (`TripBar` in `components/ui/`), the default since 2026-11-06. It replaced `SectionNav` (a bottom dock on phones and a fixed tab row from `lg`), which was deleted then. The bar came out of an Oct 2026 NN/g review and IDEO-style pass of a "header turns into the bar" idea, which found the morph risked change blindness and could not fit price and date at phone widths. Trip pages and the specialty hub render one bar in the page flow under the banner, sticky from there under the sticky header (`top: var(--site-header-h)`) and never hidden. Left to right: the section in view as a bordered button that opens the section sheet (below `lg`, or `xl` on the specialty hub where five family names need the room) or inline tabs, then "From $X · Next open May 3" (from `md`, but not `lg` to `xl`), then See dates. Inside Dates & Availability, See dates swaps to an outlined Call us of the same width. The specialty hub has no CTA and shows Find Your Trip instead. The sheet lists the sections, then up to three similar trips on trip pages (the same ones as Keep Exploring, from the former `sheet-trips` flag), then Find Your Trip and the phone number. It is an HTML `popover`, so it opens and closes without JS. The bar's old ☰ site menu, which only showed while the header was off screen, was removed with it, since the sticky header never leaves.

The active section is shown with an underline or side rule, never a red fill, so red stays for booking. `lib/use-section-spy.ts` works it out from section positions on each scroll frame: the last section whose top has passed a line 40% down the screen. Nothing is active above the first section or below the last. An IntersectionObserver was dropped because jumps skipped sections without it noticing. Trip pages list Trip Details / FAQs (when the trip has them) / Before You Go (when the trip has info sections) / Dates & Availability, the menu label matching the section heading. The specialty hub lists its families. `globals.css` adds the bar's 3.25rem to the header's `scroll-padding-top` on pages that have it. The FAQ page keeps its own sticky category nav. Smooth scrolling comes from `motion-safe:scroll-smooth` on `<html>`.

The trip page reads departures itself for the bar and the next-dates strip under the trip facts (on for everyone since 2026-11-06, with the "What next?" end block, both former flags). `getUpcomingDepartures` is wrapped in React `cache()`, so the page and `AvailabilitySection` share one Arctic request per render, and `openDepartures` in `lib/departures.ts` is the one "has seats" rule behind both `nextAvailable` and the strip.

**Find Your Trip is evergreen** (Oct 22), through a new `evergreen` variant in `Button.tsx`, so red reads as booking. That covers the floating pill, the hero button when its Studio link points at `/trip-finder`, and the Find Your Trip link in the trip bar. The floating pill hides below `lg` on pages with the trip bar, because its sheet carries Find Your Trip.

Footer, four columns: Newsletter signup · Follow Us (Instagram/Facebook/YouTube, TikTok if set) · Resources (Trip Dates → `/book`, F.A.Q., Trip Insurance, Online Store → external Square site) · Find Us (Contact, address, phone).

## Routes — Proposed, Not Built

From [[page-plan]], pending sign-off. Nothing below exists:

```
/guides                     → Meet the Guides
/trips/category/[slug]      → Trip category pages
/destinations/[slug]        → Destination landing pages
/reviews                    → Aggregated external reviews
/deals                      → Ways to Save / specials
/getting-here/[slug]        → Per-departure-location logistics — still #decision-needed
/compare                    → Trip comparison tool
/employment                 → Job listings
/outside-for-all            → Mission/cause page
/gallery                    → Photo/video gallery
```

Note the earlier plan proposed `/activities/[slug]` and `/book/[tripId]`; both were dropped in favor of flat `/rafting` + `/biking` routes and inline per-departure booking.

## Project Structure

```
src/
├── app/                    ← Next.js App Router pages
│   ├── api/                ← Route handlers (Arctic proxy, forms, revalidate, health)
│   ├── studio/[[...tool]]/ ← Embedded Sanity Studio at /studio
│   ├── trips/ rivers/ blog/ rafting/ biking/ open-seats/ faq/ contact/ book/ trip-finder/ admin/
│   ├── arctic-template/    ← Design-import target for Arctic
│   └── [slug]/             ← CMS page-builder catch-all
├── components/
│   ├── layout/             ← Header, Nav, MobileNav, Footer
│   └── ui/                 ← Shared primitives + booking UI (DepartureList,
│                              BookingRow, PartySizeSelector, MiniCart,
│                              AvailabilitySection, ItinerarySection)
├── lib/
│   ├── arctic/             ← config, client, types, trips, booking
│   ├── sanity/             ← client, queries, image helper
│   ├── contact-defaults.ts ← phone/email fallbacks when Site Settings is empty
│   ├── demo-flags.ts       ← per-browser demo flag registry + init script
│   ├── departures.ts       ← month filtering + specialty callout, date and row helpers
│   ├── map-style.ts        ← USGS basemap styles, river key colours, plateau outline
│   ├── maplibre-worker.ts  ← points MapLibre at its worker copy in public/maplibre/
│   ├── river-stretches.json← NHD river geometry per section (scripts/fetch-river-stretches.mjs)
│   ├── trip-finder.ts      ← weighted scorer behind /trip-finder
│   ├── trip-map-data.ts    ← trips map marker/outpost data
│   ├── usgs.ts             ← USGS flow (CFS) fetchers for the river-flow chip
│   └── cart-cookie.ts      ← hre_cart / hre_cart_count cookie handling
├── sanity/
│   ├── env.ts              ← Centralized Sanity env var access
│   ├── types.ts            ← Generated types (from `pnpm typegen`)
│   └── schemas/            ← Content models
│       └── blocks/         ← Reusable content block object types
└── styles/                 ← Global styles, Tailwind v4 @theme tokens
```

Note: the earlier plan assumed `components/trips/`, `components/booking/`, and `components/blog/` directories. In practice everything lives in `components/ui/` and `components/layout/`.

**Maps.** Both maps (`TripsMap` on the homepage, `TripMap` on trip pages) are MapLibre over public-domain USGS tiles, lazy-mounted via `next/dynamic` + IntersectionObserver, and share `MapLayers` (the river stretches and plateau outline) and `src/lib/map-style.ts`. One gotcha worth knowing: MapLibre 6 locates its web worker relative to its own module URL, which Turbopack breaks, and without the worker every GeoJSON layer silently never renders (raster tiles don't need it, so the map *looks* fine). `scripts/copy-maplibre-worker.mjs` copies the worker bundle into the gitignored `public/maplibre/` on install, dev and build, and `src/lib/maplibre-worker.ts` calls `setWorkerUrl()` before the first map mounts. Stretch geometry is fetched once from the National Hydrography Dataset by `scripts/fetch-river-stretches.mjs` (put-in → take-out envelopes defined in the script) and committed as `src/lib/river-stretches.json`; re-run it only when a stretch definition changes.

**Page banners.** Every inner page that opens on a photo — trip, section, rafting/biking landing, blog post, and the Page builder's hero block — renders through `PageBanner` (`components/ui/`), which shared the homepage hero's proportions (1440:523 on desktop, 75vh cap, 460px on mobile) from 2026-09-12 so no inner page read shorter than home. Crop requests use `PAGE_BANNER_WIDTH × PAGE_BANNER_HEIGHT` (2880×1046). Text-only headers (/trips, /specialty, /blog, /faq, /contact, /book) are unchanged.

**Homepage hero.** Since 2026-11-06 the homepage hero is taller than the inner banners: 1440:600 on desktop with a 65vh cap, so the Studio photo can hold the canyon wall and the camp and rafts on the beach below it (Darius). It is art-directed. Desktop gets a `HERO_WIDTH × HERO_HEIGHT` (2880×1200) crop and phones get a portrait `HERO_PHONE_WIDTH × HERO_PHONE_HEIGHT` (1170×1380) crop, both centred by Sanity on the Studio hotspot, in one `<picture>` built from `getImageProps`. Each crop is preloaded only at its own breakpoint. Before this, phones got a 390px-wide copy of the wide crop stretched to 1,104px, because a fixed 460px-tall box shows only a third of a wide image. `PageBanner` still has that problem on phones.

The **hero video** is the default since 2026-11-06 (it was the `hero-video` flag): a 14 second muted loop (`public/hero/westwater-loop.mp4`, 8.4 MB) of five steady shots joined with dissolves: aerials from the Desolation flight-in, the Westwater rapid and rafts from one locked-off camera (raw 2022 clip C0153), and a camp food spread (C0112). The Studio photo is the fallback and the first paint. `HeroVideo` (client) mounts the video only after hydration and fades it in once it is actually playing, so the photo stays the page's largest paint. It keeps the photo, with a play button, for visitors who prefer reduced motion or have Data Saver or a 2G connection, and renders nothing where the browser cannot play MP4. A pause button covers WCAG 2.2.2. The headline has a soft text shadow because the contact line can land on a white raft tube. The three branded raft photos that were the other hero options were removed with their flags. The video should move to a video host with adaptive streaming (or Sanity) before launch rather than live in the repo. The anniversary seal's stamp-in animation is also on for everyone (motion-safe), from the former `badge-live` flag.

**Anniversary seal.** `AnniversaryBadge` renders the hero seal as an SVG that pulls the artwork from `public/badge-60-years.svg` via `<use href="…#seal">` (so the ~20 KB of path data stays one cached file instead of shipping inline on every page), with the year count computed from 1966 (Sep 3 feedback). The original "60" numerals always stay; once the count passes 60 a small Alternate Gothic plus is added at the top-right of the zero so it reads "60+" (Darius's call: a plus rather than a live number, so the artwork stays the artwork).

**Carousels.** `Carousel` is a scroll-snap strip with Previous/Next and an "n of N" readout (no auto-advance; the track itself is keyboard-focusable); `ReviewsSection` (guest quotes + rating + TripAdvisor/Google links, replacing the old `FeaturedReview` band and `TrustStrip`; with no quotes yet it collapses to the compact rating strip with no heading) and `PhotoGallery` (the trip-page slideshow) are built on it.

**Shared hooks and helpers** added 2026-09-12 so the two maps and the two floating bars can't drift: `lib/use-hover-card.ts` (the WCAG 1.4.13 hover/focus card contract), `lib/use-in-view.ts` (the IntersectionObserver lazy-mount), `lib/floating-bar.ts` (position, docking under the `bars-top` flag, and chrome for `DepartureFilterBar`. `SectionNav` stopped using it in Oct 2026), `lib/contact-defaults.ts` (`contactPhone`/`contactEmail` with the Site Settings fallbacks), and `components/ui/TripCatalogDisclosure.tsx` (the in-place "View All Trips" on the specialty hub and the rafting/biking landings).

## Sanity CMS Content Models

**17 types as of 2026-09-04** — 13 documents + 4 object types. Activity and Trip Category were merged into a single **Trip Type** on 2026-08-28; **Trip Info Section** was added the same day; the **Trip Finder** singleton and its three object types were added 2026-09-04.

### Taxonomy
- **River** (titled **Section** in the Studio; the internal type stays `river` because the route is `/rivers/[slug]`) — name, slug, `riverName`, `usgsSiteId`, `flowLinkUrl`, description, image, and `mapPoints[]` (title, geopoint, photo, caption — the photo pins on every trip-page map for that section, added 2026-09-10). Documents are named by *section* (Cataract, Westwater, Desolation, Gates of Lodore, Maze, White Rim, San Juan, San Rafael, Yampa); `riverName` carries the actual river ("Colorado River", "Green River") and every projection renders `coalesce(riverName, name)`, so biking areas with no river leave it empty and fall back to the section name. Until 2026-08-28 `riverBySlugQuery` projected bare `name`, so a card reading "Colorado River" linked to a page headed "Westwater"; the section page now shows both. `usgsSiteId` drives the live River Flow (CFS) chip on trip and river pages via the USGS Instantaneous Values API (`src/lib/usgs.ts`, fetch cached 30 min; comma-separated site numbers are summed — Cataract = Colorado near Cisco + Green at Green River, UT); `flowLinkUrl` is where the chip links (the CBRFC forecast graphs Holiday shares in pre-trip emails), defaulting to the USGS gauge page. Missing gauge or reading = no chip
- **Trip Type** — name, slug, `cardLabel`, `tagColor`, `listsWith`, description, image, `order`. The single rafting-vs-biking axis (Rafting, Biking, Combo). Replaced **Activity** and **Trip Category** on 2026-08-28: those two split every trip identically under different names, with Activity driving `/rafting`, `/biking` and the wizard while Trip Category supplied the card tag, and nothing keeping them in step. One document now owns the landing route, the tag label and the tag colour — `TripCard` used to pick the colour by running `/bik/i` over the category string. `listsWith` lets Combo trips appear on the Biking landing page (Aug 20 decision) while keeping their own tag.
- **Specialty Type** — name, slug, tagline, description (Portable Text), image, `ribbonLabel`, `order`. A specialty *family* (Canyon Concerts, Dark Sky Stargazing, Women's, Youth & Family, Affinity). Backs the family sections on `/specialty` (the slug doubles as the section's anchor id), flags trips, and supplies the card ribbon. The per-family parent routes were removed 2026-08-26.

### Core content
- **Trip** — name, slug, river (ref), `tripType` (ref, required), duration, description (Portable Text), highlights, `whatsIncluded` (an override; empty means the shared list on Site Settings), `landAcknowledgement` (Portable Text, one per trip, added 2026-09-22), `videoUrl`, minAge, season, `featuredReview` (titled Lead Review) plus `reviews[]` (More Reviews; together they feed the trip-page carousel), `itinerary` (array of itineraryDay objects), `infoSections`, and **`arcticTripId`** — the comma-separated Arctic trip-type id(s) linking a Sanity trip to live departures. Lengths of one trip are separate Arctic types on the same page (Cataract is `37,38,63,62` for 5, 6, 8 and 12 days). `startingPrice` is a backup: cards and the info bar show Arctic's price (see [[arctic-api]], Starting prices). Fields are grouped in the Studio (Basics, Card, Trip Details, Quick Facts, Booking, Trip Finder, Specialty); before 2026-08-28 all 44 sat in one flat column.
  - Quick-facts fields from Justin's build-out doc (added 2026-08-28): `whoIsThisFor`, `meetingPlace`, `deposit`. **`difficulty` was removed** — the fact bar shows Max Rapid Class, falling back to `whoIsThisFor` on trips with no whitewater, which closes the parked difficulty-vs-rapid-class decision.
  - `infoSections` references **Trip Info Section** documents with an optional per-trip `overrideBody`, so Packing List / Getting Here / Before You Go are written once and reused.
  - Trip-finder fields (added 2026-08-27 for the `/trip-finder` wizard scorer): `maxRapidClass` (I–V; now the only difficulty signal), `seasonMonths`, `minAgeOverrides`, `craftTypes`. **Seeded with placeholder values pending Holiday's confirmation** (min ages and seasons especially). What each does to matching: [[trip-finder]].
  - `specialtyTypes` (refs) flags the trip as specialty; the card ribbon falls back to the family's `ribbonLabel` via `coalesce()` in GROQ, so the per-trip `ribbon`/`subtitle` fields stay as overrides.
  - `specialtyDepartures` (array of `{startDate, specialtyType, label, note, phoneOnly, minAge, priceText, lengthText, body, slug, image}`) calls out individual dates in Dates & Availability. **Joined to Arctic on the start date, not the departure id** — editors know "Sept 12 is the bluegrass trip" and Arctic reissues ids each season. Two consequences: a date typo silently renders no callout, and two departures sharing a start date cannot be told apart (first entry wins). `buildCalloutMap()` in `src/lib/departures.ts` owns this and is unit-tested.
  - Specialty dates show in three places (2026-10-21). Nearly every specialty trip is a date on a regular river trip, so listing only trips hid them at the bottom of the trip page. (1) `/specialty` lists each family's upcoming dates (`buildSpecialtyDateRows()`), matched to Arctic by trip-type id and date for seats, length and that length's fare, with a link to the date on the trip page. Each row has a thumbnail: the date's own `image` when it has an upload, otherwise the trip's first photo. It fetches per trip with `getUpcomingDepartures`, not `getAllUpcomingDepartures`, because of Arctic's 50-row cap (see [[arctic-api]]). (2) The trip page shows a Specialty Dates box under the info bar (`upcomingSpecialtyDates()`, same rules as the callout map). (3) Dates & Availability gives the first row on each specialty date the id `departure-YYYY-MM-DD`. `DepartureHashTarget` opens the collapsed list when needed and tints the row a link lands on. A date with no row falls back to the top of the section. The hub's trip cards now come only from `specialtyTypes`; before, `references()` also pulled in every river trip with a specialty date, as a plain card with no date on it
  - Each specialty date has its own page at `/specialty/[slug]` (2026-11-19, from the Oct 22 sync). The model is the old site's music trip pages. `specialtyDateSlug()` in `src/lib/departures.ts` gives the slug: the entry's `slug` field when an editor has pinned one, otherwise the slugified label, the trip slug and the start date (`pompe-and-honey-yampa-2027-05-15`). A derived slug is unique because a trip holds one entry per date, and it changes if the label or date is edited. A pinned slug must be lowercase letters, numbers and hyphens (`SPECIALTY_SLUG_FORMAT`), and the code ignores one that isn't. The Studio blocks a pin already used by another date, on the same trip or another. GROQ can't compute slugs, so the page reads `specialtyDateIndexQuery` (every trip's entries), and `specialtyDatePages()` turns that into one page per slug, first entry wins. The route and the sitemap both use that list, then the route loads the trip with `getTripBySlug`. The page shows the banner (the entry's photo, else the trip's), a Book This Date block with the one matching Arctic departure rendered by `DepartureList`, the facts strip with that departure's own length and fare, the entry's `body` write-up, then the trip's tagline, description, land acknowledgement, highlights and itinerary. A date with no Arctic match, a past date, or an Arctic outage each shows its own line and the phone number where the booking row would be. Past dates keep their page and drop out of the sitemap.
  - This changed the three places above. The Specialty Dates box under the trip page info bar is gone (`SpecialtyDatesCallout` was deleted). The badge in Dates & Availability now reads family then label ("Canyon Concerts: Pompe & Honey", from `specialtyDateTitle()`) and links to the date's page, and `/book` does the same. On `/specialty` each row's name and photo link to the date's page. When the date has open seats and an online booking link, the row's Book button opens Arctic for that departure directly, one click as in a trip page's dates list. With `BOOKING_NATIVE` on, Book opens the party-size panel (`BookingRow`) under the row, the same component the dates list uses. `BookingRow` takes an `actionsClassName` for the host grid's alignment, and its panel is `col-span-full` so it spans a two or three column row. A full or unlisted date shows View Trip to the page. The `departure-YYYY-MM-DD` row ids stay, and the date page's "See every date" link uses them.
  - A date can carry its own facts (2026-11-19), for trips that differ from the river trip they run on, such as the adults-only, sliding-scale BIPOC trip on Westwater. `minAge`, `priceText` and `lengthText` always win when filled in (`specialtyDateFacts()` in `components/ui/TripFacts.tsx`, and the same rule in the `/specialty` rows). Arctic's fare can't be trusted for these dates because it belongs to the trip type, not the departure. `phoneOnly` marks a date that is booked by phone. Such a date is never matched to an Arctic departure, because the match is by trip type and start date and another departure of the trip can start the same day (Westwater has a 3 day trip starting 2027-08-13). Its page shows the phone number, its row says View Trip, and it gets no badge in the trip's dates list or on `/book`.
  - The facts strip is shared: `tripFacts()` and `TripFacts` in `components/ui/TripFacts.tsx` serve the trip page and the specialty date page.
- **Trip Info Section** — title, slug, body (Portable Text), `order`. Shared trip-page panels (Packing List, Getting Here, Before You Go), referenced from Trip and overridable per trip.
- **FAQ** — question, answer (Portable Text), category, sort order
- **Page** — title, slug, content blocks; rendered by `/[slug]`
- **Post** — blog post: title, slug, excerpt, mainImage, publishedAt, category, Portable Text body

### Singletons
- **Homepage** — hero, featuredTrips (refs), story block, rivers (refs), `learnContent` cards
- **Site Settings** — phone, email, address, third-party review links, social links, `whatsIncluded` (the checklist every trip page shows under Highlights; a trip's own list replaces it)
- **Trip Finder** (`tripFinderSpec`, added 2026-09-04) — `questions[]` of `tripFinderQuestion` (kind, copy, image, weight, `onlyWhen`/`skipWhen` conditions, `options[]` of `tripFinderOption` with one kind-specific dial each), plus `minConfidentScore`, `resultsShown`, and `fallbackTrip` (the go-to trip that leads the results when the visitor has answered fewer than two questions — Gates of Lodore as of 2026-09-11; empty = call-us line only). Read through `src/lib/trip-finder-spec.ts`, which Zod-validates it and falls back to `DEFAULT_TRIP_FINDER_SPEC` in code. Seeded from that default by `scripts/seed-trip-finder-spec.mjs`. See [[trip-finder]]

### Form captures (written by API routes, triaged in Studio)
- **Contact Submission** — name, email, message, submittedAt
- **Newsletter Subscriber** — email, subscribedAt (idempotent `_id` from email)

### Object types (page-builder blocks)
- **Hero Block** — heading, subheading, background image, CTA text/link
- **Content Block** — heading, background (white/sand/opal/evergreen), Portable Text body with images
- **Divider** — the horizontal rule editors insert in any rich text field (trip description, FAQ answers, trip info sections, specialty descriptions, posts, content blocks). `richTextOf` in `schemas/blocks/divider.ts` is the shared `of` list for those fields, and `components/ui/RichText.tsx` exports the matching `richTextComponents` every `PortableText` render passes, since an unmapped block type renders nothing
- **Trip Finder Question / Answer / Condition** (`tripFinderQuestion`, `tripFinderOption`, `tripFinderCondition`) — the objects inside the Trip Finder singleton. An answer's dial field is shown and required according to the owning question's `kind`, resolved by walking the document since Sanity callbacks only see the immediate parent

### Not built
- **Author** — no author model; posts carry no byline reference
- **Story/History**, **Gallery Item** — still Phase 4 proposals

## Data Flow

```
Sanity CMS ──→ Content (trips, blog, FAQs, pages, homepage)
                  ↓
              Next.js ──→ Server Components render pages (ISR 60s)
                  ↑
Arctic API ──→ Reads: trip types, departures, availability
                  ↑
              src/lib/arctic ──→ Server-side only; credentials never reach the browser
                  ↓
              Writes: /api/book, /api/cart → Arctic guest site → hosted checkout
```

Sanity publishes trigger `POST /api/revalidate` (HMAC-verified), which purges the full layout cache.

**Graceful degradation:** if any of the five `ARCTIC_*` env vars is missing, `getArcticConfig()` returns null and every fetcher short-circuits — pages render a "call us" fallback rather than erroring.

## Per-Browser Demo Flags

A way to demo design ideas on production without exposing them to real visitors. Flags live in the visitor's own `localStorage` (`hre_demo`) — no server storage, no Sanity, no effect on the ISR cache.

- **Registry:** `src/lib/demo-flags.ts` — the single source of truth. Each flag has an id, label, and description; every flag defaults to OFF, and OFF must equal current production behavior. Missing or malformed storage collapses to the defaults (zod-parsed, same convention as the cart cookie).
- **No-flash mechanism:** the root layout inlines a blocking script (generated from the registry) that stamps `data-demo-<id>='on'` attributes on `<html>` before first paint. Components render **both** variants server-side and Tailwind arbitrary variants (`[[data-demo-logo-bold=on]_&]:…`) pick one, so pages stay static and ISR-cacheable. `<html>` carries `suppressHydrationWarning` for this reason.
- **Overlay:** visiting `/admin` arms the browser and redirects home; an armed browser gets a floating "Demo" pill (bottom-right, `DemoFlagsPanel`) that expands to per-flag checkboxes, Reset all, and Disarm. Toggles apply live, no reload. `/admin` is unauthenticated by design — flags only ever affect the visitor's own browser — and is noindexed and in `RESERVED_SLUGS`.
- **Current flags:** `finder-logic` only (the `TripFinderLogicPanel` explainer under the wizard and its results: full ranking with per-question breakdown, data sources, missing facts; added 2026-09-04). On 2026-11-06 Darius graduated or dropped the rest: the five logo treatments and three branded hero photos were dropped (defaults kept), and `hero-video`, `sticky-header`, `river-flow`, `badge-live`, `trip-bar`, `facts-dates`, `end-cap`, `sheet-trips` and `map-controls` became the defaults. `header-reveal` went too, since it only applied to a non-sticky header. The panel still supports radio groups (`DEMO_FLAG_GROUPS`), though none is live. A browser armed before then keeps its other choices: `parseDemoState` drops retired flag keys instead of rejecting the stored state. Client components read flags live via `useDemoFlag` (`src/lib/use-demo-flag.ts`). The stakeholder-facing guide is [[demo-panel-guide]].
- **Caveat:** `/arctic-template` always uses the classic horizontal logo (`public/logo-horizontal-red.svg`) and does not participate in demo flags.

## Related

- [[site-audit]] — Full inventory of the current bikeraft.com site
- [[page-plan]] — Proposed page structure (historical)
- [[tech-stack]] — Technology choices
- [[arctic-api]] — Arctic Reservations integration details
- [[build-phases]] — Current build status
- [[trip-finder]] — The Find Your Trip wizard: what is editable, how it picks, where its data comes from
- [[demo-panel-guide]] — Plain-English guide to the demo flags panel
