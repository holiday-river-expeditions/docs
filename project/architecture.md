# Site Architecture

## Pages & Routes

> Expanded based on [[site-audit]] and [[page-plan]]. Phase assignments are proposals pending Holiday sign-off.

### Phase 1 — Launch

```
/                           → Homepage (hero + CTA, featured trips, brand story, reviews)
/trips                      → Trip listings (filterable by river, activity, duration, difficulty, price, date)
/trips/[slug]               → Trip detail (info, photos, native booking UI via Arctic API, itinerary, reviews)
/open-seats                 → Real-time availability across all trips (Arctic API)
/book/[tripId]              → Native booking UI (Arctic API cart + handoff)
/rivers/[slug]              → River landing pages (Colorado, Green, San Juan, Yampa)
/activities/[slug]          → Activity landing pages (rafting, mountain-biking, multi-sport)
/about                      → Our Story, The Holiday Way, team overview
/faq                        → FAQ page (CMS-driven, searchable, expandable)
/contact                    → Contact form + company info
/trip-finder                → Interactive quiz ("Help me choose") — phase TBD, see open-decisions
```

### Phase 2

```
/guides                     → Meet the Guides (profiles)
/trips/category/[slug]      → Trip category pages (family, stargazing, concerts, adult-only, etc.)
/destinations/[slug]        → Destination landing pages (utah, colorado, idaho, grand-canyon)
/reviews                    → Aggregated reviews from external platforms
/blog                       → Blog listing (category-filtered)
/blog/[slug]                → Blog post
/deals                      → Ways to Save / specials
/getting-here/[slug]        → Per-departure-location logistics guides
```

### Phase 3

```
/compare                    → Trip comparison tool
/employment                 → Job listings
/outside-for-all            → Mission/cause page
/gallery                    → Photo/video gallery
/[slug]                     → Generic CMS pages (policy, legal, misc)
```

## Project Structure

```
src/
├── app/                    ← Next.js App Router pages
│   ├── api/                ← API routes (Arctic proxy, contact form, etc.)
│   ├── studio/[[...tool]]/ ← Embedded Sanity Studio at /studio
│   ├── trips/
│   ├── blog/
│   ├── book/
│   └── ...
├── components/             ← React components organized by feature
│   ├── layout/             ← Header, footer, navigation
│   ├── trips/              ← Trip cards, filters, listing
│   ├── booking/            ← Booking flow steps
│   ├── blog/               ← Blog cards, post content
│   └── ui/                 ← Shared UI primitives (buttons, cards, accordion)
├── lib/
│   ├── arctic/             ← Arctic Reservations API client
│   └── sanity/             ← Sanity client, queries, image helper, fetch utils
├── sanity/
│   ├── env.ts              ← Centralized Sanity env var access
│   ├── types.ts            ← Generated types (from `pnpm typegen`)
│   └── schemas/            ← Sanity content model definitions
│       └── blocks/         ← Reusable content block object types
└── styles/                 ← Global styles, Tailwind config
```

## Sanity CMS Content Models

### Implemented (Phase 1)

- **River** — name, slug, description, image (Colorado, Green, San Juan, Yampa)
- **Activity** — name, slug, description, image (Rafting, Mountain Biking, Multi-Sport)
- **Trip Category** — name, slug, description (Family, Stargazing, Canyon Concerts, etc.)
- **Trip** — name, slug, river (reference), activities (references), categories (references), difficulty, duration, description (Portable Text), photos, highlights, pricing notes, Arctic trip ID (links to API)
- **FAQ** — question, answer (Portable Text), category, sort order
- **Site Settings** — phone, email, address, social links (singleton)
- **Page** — title, slug, content blocks (hero block, content block)
- **Hero Block** — heading, subheading, background image, CTA text/link (object type)
- **Content Block** — heading, body with rich text and images (object type)

### Planned (later phases)

- **Blog Post** — title, slug, author, date, body (rich text), featured image, categories _(Phase 4)_
- **Author** — name, bio, image _(Phase 4)_
- **Story/History** — title, body, media, timeline position _(Phase 4)_
- **Gallery Item** — image/video, caption, trip reference, tags _(Phase 4)_

## Data Flow

```
Sanity CMS ──→ Content (trips, blog, FAQs, pages)
                  ↓
              Next.js ──→ Server Components render pages
                  ↑
Arctic API ──→ Live data (availability, open seats, booking)
                  ↑
              API Routes ──→ Proxy Arctic calls (credentials stay server-side)
```

## Related

- [[site-audit]] — Full inventory of current bikeraft.com
- [[page-plan]] — Proposed page structure for the new site
- [[tech-stack]] — Technology choices
- [[arctic-api]] — Arctic Reservations integration details
- [[build-phases]] — How we build this incrementally
