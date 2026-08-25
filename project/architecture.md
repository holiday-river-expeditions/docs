# Site Architecture

> **Reconciled against the codebase 2026-08-20.** The "As Built" section below is verified against `website/src/app/`. The sections after it are still proposals from [[page-plan]] and have not been built.

## Routes — As Built

Every dynamic route is **ISR with `revalidate = 60`**. There is no `generateStaticParams` anywhere, so nothing is prebuilt — pages render on demand and are then cached.

### Pages

```
/                           → Homepage (hero, featured trips, brand story, river selector)
/trips                      → Trip listing grid (filtering NOT built yet)
/trips/[slug]               → Trip detail + Dates & Availability (live Arctic data)
/rivers/[slug]              → River landing pages
/specialty                  → Specialty trip hub (nav item), families + their trips
/specialty/[slug]           → Specialty family parent page (Canyon Concerts, Stargazing, ...)
/rafting                    → Rafting activity landing page
/biking                     → Biking activity landing page
/open-seats                 → Real-time availability across all trips (Arctic API)
/blog                       → Blog listing
/blog/[slug]                → Blog post
/faq                        → FAQ page (CMS-driven, accordion)
/contact                    → Contact form + company info
/book                       → Static placeholder: phone CTA + link to /open-seats
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

Header: centered logo lockup, desktop nav (**Rafting · Biking · Specialty · About Us · Blog**), mobile hamburger drawer, `MiniCart`, and a "Book Now" button to `/book`.

Footer, four columns: Newsletter signup · Follow Us (Instagram/Facebook/YouTube, TikTok if set) · Resources (Trip Dates → `/open-seats`, F.A.Q., Trip Insurance, Online Store → external Square site) · Find Us (Contact, address, phone).

## Routes — Proposed, Not Built

From [[page-plan]], pending sign-off. Nothing below exists:

```
/trip-finder                → Interactive "Help me choose" quiz — still #decision-needed
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
│   ├── trips/ rivers/ blog/ rafting/ biking/ open-seats/ faq/ contact/ book/
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

**14 types as of 2026-08-20** — 12 documents + 2 object types.

### Taxonomy
- **River** — name, slug, description, image (Colorado, Green, San Juan, Yampa)
- **Activity** — name, slug, description, image
- **Trip Category** — name, slug, description
- **Specialty Type** — name, slug, tagline, description (Portable Text), image, `ribbonLabel`, `order`. A specialty *family* (Canyon Concerts, Dark Sky Stargazing, Women's, Youth & Family, Affinity) — the replacement for the legacy site's specialty URL parents. Backs `/specialty` and `/specialty/[slug]`, flags trips, and supplies the card ribbon.

### Core content
- **Trip** — name, slug, river (ref), activities/categories (refs), difficulty (easy/moderate/challenging/expert), duration, description (Portable Text), highlights, minAge, season, `featuredReview`, `itinerary` (array of itineraryDay objects), and **`arcticTripId`** — the comma-separated Arctic trip-type id(s) linking a Sanity trip to live departures.
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

## Related

- [[site-audit]] — Full inventory of the current bikeraft.com site
- [[page-plan]] — Proposed page structure (historical)
- [[tech-stack]] — Technology choices
- [[arctic-api]] — Arctic Reservations integration details
- [[build-phases]] — Current build status
