# Site Architecture

> **Reconciled against the codebase 2026-08-27.** The "As Built" section below is verified against `website/src/app/` on `main`. The sections after it are still proposals from [[page-plan]] and have not been built.

## Routes — As Built

Every dynamic route is **ISR with `revalidate = 60`**. There is no `generateStaticParams` anywhere, so nothing is prebuilt — pages render on demand and are then cached.

### Pages

```
/                           → Homepage (hero, featured trips, brand story, trips map). The interactive Relief-style trips map (MapLibre + USGS tiles, photo medallions, verified outposts, Style/Scale/Fly-to controls, oar borders) replaced the river-selector carousel 2026-08-27 (PR #70, graduated from the trips-map demo flag); it lazy-mounts via IntersectionObserver so MapLibre stays off the critical path. Marker coords live in src/lib/trip-map-data.ts — moving them onto river documents is the follow-up
/trips                      → Trip listing grid (filtering NOT built yet)
/trip-finder                → "Find Your Trip" wizard: five-question guided matcher, fully server-rendered with all state in URL query params (every option is a link — shareable, back-button-native, works without JS). Weighted scorer in src/lib/trip-finder.ts; unknown trip data scores neutral so a thin catalog never disqualifies. Hidden behind the default-OFF trip-finder demo flag, but the route is publicly reachable by URL while unlinked
/trips/[slug]               → Trip detail + Dates & Availability (live Arctic data)
/rivers/[slug]              → River landing pages
/specialty                  → Specialty hub: per-family sections (copy, photo, trips) navigated by the floating section menu; "View All Trips" expands the catalog in place. The per-family parent pages were removed 2026-08-26 (Aug 20 decision); specialty callout badges deep-link to /specialty#<slug>
/rafting                    → Rafting activity landing page
/biking                     → Biking activity landing page
/open-seats                 → Redirects to /book (2026-08-27; preserves ?month)
/blog                       → Blog listing
/blog/[slug]                → Blog post
/faq                        → FAQ page (CMS-driven, accordion)
/contact                    → Contact form + company info
/book                       → "Book Your Trip": real-time availability across all trips (Arctic API) with per-trip identity cards (photo, tagline, price, details link) for Sanity-mapped groups, and a floating filter bar — month chips filter server-side via ?month=YYYY-MM plus a jump-to-trip select scoped to visible groups. The canonical target for the Book Now CTA and the footer's Trip Dates link
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

⚠️ `/arctic-template` duplicates the site nav as hardcoded absolute URLs, so **nav changes must be made in two places**. It is also the only consumer of `NEXT_PUBLIC_SITE_URL`.

### Navigation as shipped

Header: centered logo lockup, desktop nav (**Rafting · Biking · Specialty · About Us · Blog · Contact**), mobile hamburger drawer, `MiniCart`, and a "Book Now" button to `/book`. The homepage hero carries the phone number and email (from Site Settings) under the CTA, and trip cards show the river name (verbatim from the Sanity river doc) where the difficulty label used to sit — difficulty remains on the trip detail page only.

The logo (header and footer) defaults to the original horizontal SVG brand lockup (`/logo-horizontal-red.svg`), per the 2026-08-20 decision to return to the delivered logotype. The bold live-text lockup from the August design batch is kept behind the `logo-bold` demo flag, and a single-line live-text lockup behind `logo-line` (see Per-browser demo flags below).

Content-heavy pages carry a **floating section menu** (`SectionNav` in `components/ui/`): a fixed pill bar at the bottom center with plain anchors per section and the in-view section highlighted. Trip pages show Trip Details / FAQs (when the trip has them) / Rates & Dates and reveal the bar on scroll; the specialty hub always shows it with the family list. The FAQ page keeps its own sticky category nav. Smooth scrolling comes from `motion-safe:scroll-smooth` on `<html>`.

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
│   ├── demo-flags.ts       ← per-browser demo flag registry + init script
│   ├── departures.ts       ← month filtering + specialty callout map helpers
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

## Sanity CMS Content Models

**14 types as of 2026-08-27** — 12 documents + 2 object types.

### Taxonomy
- **River** — name, slug, `riverName`, `usgsSiteId`, `flowLinkUrl`, description, image. Documents are named by *section* (Cataract, Westwater, Desolation, Gates of Lodore, Maze, White Rim, San Juan, San Rafael, Yampa); `riverName` carries the actual river ("Colorado River", "Green River") and trip cards render `coalesce(riverName, name)`, so biking areas with no river leave it empty and fall back to the section name. `usgsSiteId` drives the live River Flow (CFS) chip on trip and river pages via the USGS Instantaneous Values API (`src/lib/usgs.ts`, fetch cached 30 min; comma-separated site numbers are summed — Cataract = Colorado near Cisco + Green at Green River, UT); `flowLinkUrl` is where the chip links (the CBRFC forecast graphs Holiday shares in pre-trip emails), defaulting to the USGS gauge page. Missing gauge or reading = no chip
- **Activity** — name, slug, description, image
- **Trip Category** — name, slug, description
- **Specialty Type** — name, slug, tagline, description (Portable Text), image, `ribbonLabel`, `order`. A specialty *family* (Canyon Concerts, Dark Sky Stargazing, Women's, Youth & Family, Affinity). Backs the family sections on `/specialty` (the slug doubles as the section's anchor id), flags trips, and supplies the card ribbon. The per-family parent routes were removed 2026-08-26.

### Core content
- **Trip** — name, slug, river (ref), activities/categories (refs), difficulty (easy/moderate/challenging/expert), duration, description (Portable Text), highlights, minAge, season, `featuredReview`, `itinerary` (array of itineraryDay objects), and **`arcticTripId`** — the comma-separated Arctic trip-type id(s) linking a Sanity trip to live departures.
  - Trip-finder fields (added 2026-08-27 for the `/trip-finder` wizard scorer): `maxRapidClass` (I–V; the working example of the parked difficulty-vs-rapid-class decision), `seasonMonths`, `minAgeOverrides`, `craftTypes`. **Seeded with placeholder values pending Holiday's confirmation** (min ages and seasons especially).
  - `specialtyTypes` (refs) flags the trip as specialty; the card ribbon falls back to the family's `ribbonLabel` via `coalesce()` in GROQ, so the per-trip `ribbon`/`subtitle` fields stay as overrides.
  - `specialtyDepartures` (array of `{startDate, specialtyType, label, note}`) calls out individual dates in Dates & Availability. **Joined to Arctic on the start date, not the departure id** — editors know "Sept 12 is the bluegrass trip" and Arctic reissues ids each season. Two consequences: a date typo silently renders no callout, and two departures sharing a start date cannot be told apart (first entry wins). `buildCalloutMap()` in `src/lib/departures.ts` owns this and is unit-tested
- **FAQ** — question, answer (Portable Text), category, sort order
- **Page** — title, slug, content blocks; rendered by `/[slug]`
- **Post** — blog post: title, slug, excerpt, mainImage, publishedAt, category, Portable Text body

### Singletons
- **Homepage** — hero, featuredTrips (refs), story block, rivers (refs), `learnContent` cards
- **Site Settings** — phone, email, address, third-party review links, social links

### Form captures (written by API routes, triaged in Studio)
- **Contact Submission** — name, email, message, submittedAt
- **Newsletter Subscriber** — email, subscribedAt (idempotent `_id` from email)

### Object types (page-builder blocks)
- **Hero Block** — heading, subheading, background image, CTA text/link
- **Content Block** — heading, background (white/sand/opal/evergreen), Portable Text body with images

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
- **Current flags:** the logo treatments render as a radio group in the panel (mutually exclusive; CSS precedence legacy > fresh > secondary > line > bold > classic default): `logo-bold` (stacked live-text), `logo-line` (single line, medium weight), `logo-secondary` (the brand package's Secondary Horizontal, `public/logo-secondary-red.svg`), `logo-fresh` (HOLIDAY-dominant hierarchy exploration), `logo-legacy` (the pre-rebrand bikeraft.com lockup, `public/logo-legacy-red.svg` — guidelines forbid mixing old logos, demo only). Checkbox flags: `bars-on-scroll` (floating bars appear on scroll vs always), `sticky-header` (persistent header), `river-flow` (CFS chip + sparkline, hidden from real visitors until approved), `trips-map` (MapLibre topo map prototype replacing the river carousel — outposts, hover context cards, oar borders, expand toggle; marker/outpost data in `src/lib/trip-map-data.ts`; **graduating**: PR #70 makes the map the permanent public homepage section and retires this flag), `badge-live` (one-time stamp-in animation on the hero seal), `trip-finder` (the "Find Your Trip" wizard at `/trip-finder`, hidden until Holiday signs off). Client components read flags live via `useDemoFlag` (`src/lib/use-demo-flag.ts`).
- **Caveat:** `/arctic-template` carries its own hardcoded logo markup and does not participate in demo flags.

## Related

- [[site-audit]] — Full inventory of the current bikeraft.com site
- [[page-plan]] — Proposed page structure (historical)
- [[tech-stack]] — Technology choices
- [[arctic-api]] — Arctic Reservations integration details
- [[build-phases]] — Current build status
