# Build Phases

> **This document is the source of truth for build status.** (Tracking briefly moved to GitHub Issues in February 2026; those issues went stale and were closed in August 2026 — the vault is authoritative again.)

## Phase 1: Project Foundation

> **Note (2026-02-19):** Remaining Phase 1 work proceeding in parallel with Phase 3 (Arctic API integration). See [[2026-02-19-phase-1-update]].

- [x] Initialize Next.js project with App Router and TypeScript (strict mode) — _started on 15, now on 16.3_
- [x] Configure ESLint + Prettier for consistent code style
- [x] Set up Tailwind CSS with brand design tokens (colors, typography, spacing) — _Done (2026-03-02). Tailwind v4 `@theme inline` with 7 brand colors, 2 fonts; type scale has since grown to 8 steps (see [[tailwind-tokens]])._
- [x] Configure Sanity Studio project with initial content models (typed schemas) — _Done (2026-02-28). Sanity Studio embedded at `/studio`, typegen configured. Now on Sanity v5 with **14 schema types** (12 documents + 2 page-builder blocks) — see [[architecture]] for the current model list._
- [x] Configure GitHub Actions CI pipeline (lint → type-check → test → build)
- [x] Set up Vercel project with Git-based deploys + PR preview deployments
- [ ] Configure beta subdomain on Vercel for stakeholder testing — _`vercel.json` has the noindex host rule, but no DNS is pointed at it yet; target is now `beta.holidayriver.com` (see [[environments]])._
- [x] Set up Vitest for unit/integration tests + Playwright for E2E tests
- [x] Create `CLAUDE.md` with project conventions
- [x] Build core layout: header, footer, navigation (responsive) — _Done (2026-03-04). Header with logo + desktop/mobile nav, footer with 4-column grid._
- [x] Establish component library basics (buttons, cards, section containers) — _Done (2026-03-04). Button (3 variants), Section (3 backgrounds), Card (image + meta + description)._
- [x] Generate TypeScript types for Sanity schemas (sanity-typegen) and Arctic API responses — _Sanity types generated (2026-02-28); Arctic responses typed via Zod schemas in `src/lib/arctic/types.ts` (2026-08-10)._

## Phase 2: Core Content Pages

> **Note (2026-02-19):** Phase 2 content coordination will be ad-hoc between Justin and Darius. See [[2026-02-19-phase-1-update]].

- [x] Homepage: hero section, featured trips, authority signals (60 years), testimonial highlights, CTAs — _Done (2026-05-29). Sanity-driven, Figma-matched._
- [x] About page: history timeline, team, brand story — _Done (2026-08-10). Rendered via the `page` builder (`app/[slug]` catch-all); seeded from bikeraft.com copy._
- [ ] Trip listing page: filterable grid, trip cards with key info — _Grid done (2026-07-21); **filtering still not built**._
- [x] Trip detail page: full content from Sanity, photo gallery, pricing, CTA to book — _Done (2026-07-21)._
- [x] River landing pages: per-river content and trip filtering — _Done (2026-07-21)._
- [x] FAQ page: CMS-driven, categorized, accordion UI — _Done (2026-08-10). 16 seeded FAQs across 5 categories._
- [x] Contact page: form + company info — _Done (2026-08-10). Form captures to Sanity (`contactSubmission`) pending an email/CRM provider decision._
- [x] Activity landing pages (/rafting, /biking): hero + trip grid — _Done (2026-08-10)._
- [x] Policy page: Cancellation & Trip Insurance — _Done (2026-08-10) via the `page` builder._

## Phase 3: Arctic API Integration

> Credential blocker resolved — self-service via Settings > API Access (see [[arctic-api#Credential Setup]])

- [x] Create API client in Arctic admin (`hre-website`, User level access) — _Done (2026-08-10, Darius)._
- [ ] Store credentials in Vercel env vars (`ARCTIC_*`) — _local `.env.local` done; Vercel pending (paste raw values, no escaping)._
- [x] Build typed API client in `src/lib/arctic/` with Zod validation — _Done (2026-08-10). Token cache, retry/backoff, 403 re-auth, graceful unconfigured fallback._
- [x] Set up API proxy routes in Next.js — _Not needed for reads (server components call the client directly). Built for writes (2026-08-11): `/api/book`, `/api/cart`, `/api/book/pricing/[triptypeid]`. Credentials never reach the browser._
- [x] Read-only endpoints first: trip sync, availability display — _Done (2026-08-10), verified against live data._
- [x] Build open seats page with real-time availability — _Done (2026-08-10): `/open-seats`, grouped by trip, charter-filtered via `orenable`. Moved to `/book` ("Book Your Trip") 2026-08-27 with per-trip identity cards and a server-side month filter bar; `/open-seats` now redirects there preserving `?month`._
- [x] Connect trip detail pages to Arctic for live availability — _Done (2026-08-10): Dates & Availability section with seat badges + interim Book links (Arctic `onlinebookingurl`)._
- [x] Trip-specific "View Open Seats" functionality — _Covered by the trip-detail availability section._
- [x] Build native trip browsing & selection UI (dates, party size) — _Done (2026-08-11). `DepartureList` + `BookingRow` + `PartySizeSelector`, gated behind the `BOOKING_NATIVE` flag (on locally, **off in production**). Add-ons not built — see below._
- [x] Cart-building flow: add selected items to Arctic cart via API — _Done (2026-08-11). `POST /api/book` adds a departure; `GET`/`DELETE /api/cart` list and remove. Cart handle persisted in an httpOnly `hre_cart` cookie (2h), count mirrored in `hre_cart_count` for the header `MiniCart`._
- [x] Arctic checkout handoff — _Done (2026-08-11). Redirects to Arctic's hosted `{guest-site}/cart/checkout?sessid=…`; we never collect payment. Styling template ready at [[arctic-custom-header]] but **not yet confirmed pasted into Arctic admin**._
- [ ] Add-on selection during booking
- [ ] Flip `BOOKING_NATIVE=true` in Vercel to enable native booking in production
- [ ] Paste [[arctic-custom-header]] into Arctic admin (Settings → Guest-facing Sites → Custom HTML Header) and add `holidayriver-guest-site-1.arcticres.com` to the Adobe Fonts kit `guz5fen` allowed domains

> **Known caveat:** carted seats do **not** hold inventory. Arctic only enforces availability at checkout, so the pre-add availability check in `/api/book` is friendly early messaging, not a reservation.

## Phase 4: Blog & Content

- [x] Sanity blog content model + studio customization — _`post` schema done (2026-08-10)._
- [x] Blog listing page with pagination/filtering — _Index done (2026-08-10), 4 starter posts seeded; pagination/filtering deferred until Holiday decides migration scope._
- [x] Blog post pages with rich content rendering — _Done (2026-08-10)._
- [ ] Stories/history content section
- [ ] Gallery page with lightbox and filtering

## Phase 5: Reviews, Authority & Social Proof

- [ ] TripAdvisor review integration (embed or API)
- [ ] Google Reviews display
- [ ] Authority badges/callouts (60 years, awards, certifications)
- [ ] Push visitors to leave reviews on 3rd party platforms

## Phase 6: Analytics, SEO & Polish

> **Verified 2026-08-20: none of the analytics or SEO infrastructure exists yet.** No analytics SDK is installed, `next/script` is never used, and there is no `sitemap.ts`, `robots.ts`, `metadataBase`, Open Graph metadata, or JSON-LD anywhere in the codebase. What does exist is basic per-route `Metadata` (title/description) and a favicon set in `src/app/layout.tsx`. This is the largest remaining gap before launch.

- [ ] Google Analytics 4 setup
- [ ] PostHog integration
- [ ] Meta Pixel for retargeting
- [ ] SEO: meta tags, Open Graph, structured data (JSON-LD for tours/activities) — _titles/descriptions done per route; OG, `metadataBase`, canonicals, and JSON-LD all missing_
- [ ] Sitemap generation — _no `sitemap.ts`; note `NEXT_PUBLIC_SITE_URL` is currently empty and its only consumer is `/arctic-template`_
- [ ] `robots.txt` for production
- [ ] Performance optimization (image optimization, lazy loading, Core Web Vitals)
- [ ] Responsive design QA across devices
- [x] Accessibility audit (WCAG 2.1 AA) — _First pass done (2026-08-11): axe-core Playwright suite (`e2e/a11y.spec.ts`) scans 5 routes; real contrast failures found and fixed. Not yet a full-site audit; alt text on trip photos is still outstanding ([[photo-upload-checklist]])._

## Shipped Outside the Phases (Aug 20–27, 2026)

Work from the Aug 20 sync feedback and the exploration week that no phase checkbox covers — all on `main` unless noted:

- **Per-browser demo flags** — localStorage-backed system for demoing design ideas on production without exposing them to real visitors (`/admin` arms the overlay). Full description in [[architecture]].
- **Logo treatments** — default reverted to the original horizontal SVG lockup (Aug 20 decision); five alternate treatments live behind mutually exclusive demo flags, awaiting a pick.
- **Specialty restructure** — per-family parent pages removed; families are now anchored sections on `/specialty` with in-place catalog expansion.
- **Floating section menu** — `SectionNav` pill bar on trip pages and the specialty hub.
- **Live river flow (CFS)** — USGS-driven flow chip + 7-day sparkline on trip and river pages, behind the `river-flow` flag until Holiday signs off.
- **Booking IA** — `/book` "Book Your Trip" page with month filter (see Phase 3 note above); Book Now CTA and footer Trip Dates both point there.
- **Trips map** — MapLibre map of trips over USGS topo/relief tiles, replacing the river-selector carousel; Relief + Region chosen as default. Graduating from demo flag to permanent homepage section in PR #70 (in review as of 2026-08-27); outpost data (incl. the Vernal HQ addition) pending Holiday confirmation.
- **Find Your Trip wizard** — `/trip-finder`, merged behind the default-OFF `trip-finder` flag; scorer fields seeded with placeholder values pending Holiday confirmation.

## Known Gaps Not Yet Phased

- No `generateStaticParams` anywhere — every dynamic route is ISR-on-demand (60s), nothing is prebuilt
- No tests on any `/api/*` route handler or `cart-cookie.ts` — the booking path is the least-covered code
- `/rivers` index does not exist (only `/rivers/[slug]`); `/store` and `/trip-dates` are reserved slugs that 404
- ~12 bookable Arctic products still have no Sanity trip page ([[arctic-api]])
- 167 legacy blog posts remain unmigrated pending the migration-scope decision ([[open-decisions]])

## Related

- [[tech-stack]] — Technology choices
- [[architecture]] — Site structure
- [[open-decisions]] — Blockers and unresolved questions
