# Site Architecture

## Pages & Routes

```
/                           → Homepage
/trips                      → Trip listings (filterable by river, type, difficulty, duration)
/trips/[slug]               → Trip detail page (info, photos, pricing, open seats, book now)
/open-seats                 → Dynamic open seats across all trips (Arctic API)
/book/[tripId]              → Native booking UI (Arctic API, replaces iframe)
/blog                       → Blog listing
/blog/[slug]                → Blog post
/faq                        → FAQ page (CMS-driven, expandable)
/about                      → History, team, 60 years of authority
/gallery                    → Photo/video gallery
/contact                    → Contact form + info
/rivers/[slug]              → River-specific landing pages (Colorado, Green, etc.)
```

## Project Structure

```
src/
├── app/                    ← Next.js App Router pages
│   ├── api/                ← API routes (Arctic proxy, contact form, etc.)
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
│   └── sanity/             ← Sanity client, queries, types
├── sanity/
│   └── schemas/            ← Sanity content model definitions
└── styles/                 ← Global styles, Tailwind config
```

## Sanity CMS Content Models

- **Trip** — name, slug, river, difficulty, duration, description, photos, highlights, pricing notes, Arctic trip ID (links to API)
- **Blog Post** — title, slug, author, date, body (rich text), featured image, categories
- **FAQ** — question, answer, category (easy for staff to add new ones)
- **Story/History** — title, body, media, timeline position
- **Page** — generic page builder with reusable content blocks
- **Site Settings** — global info (phone, email, address, social links)
- **Gallery Item** — image/video, caption, trip reference, tags

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
- [[tech-stack]] — Technology choices
- [[arctic-api]] — Arctic Reservations integration details
- [[build-phases]] — How we build this incrementally
