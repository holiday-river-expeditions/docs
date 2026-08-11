# Build Phases

> **Tracking has moved to GitHub Issues.** Each item below is now tracked as an issue on the [website repo](https://github.com/holiday-river-expeditions/website/issues), organized into milestones by phase. See the [project board](https://github.com/orgs/holiday-river-expeditions/projects/1) for a visual overview.

## Phase 1: Project Foundation

> **Note (2026-02-19):** Remaining Phase 1 work proceeding in parallel with Phase 3 (Arctic API integration). See [[2026-02-19-phase-1-update]].

- [x] Initialize Next.js 15 project with App Router and TypeScript (strict mode)
- [x] Configure ESLint + Prettier for consistent code style
- [x] Set up Tailwind CSS with brand design tokens (colors, typography, spacing) — _Done (2026-03-02). Tailwind v4 `@theme inline` with 7 brand colors, 2 fonts, 5-step typography scale._
- [x] Configure Sanity Studio project with initial content models (typed schemas) — _Done (2026-02-28). Sanity v3 Studio embedded at `/studio`, 9 schemas defined, typegen configured._
- [x] Configure GitHub Actions CI pipeline (lint → type-check → test → build)
- [x] Set up Vercel project with Git-based deploys + PR preview deployments
- [x] Configure beta subdomain on Vercel for stakeholder testing
- [x] Set up Vitest for unit/integration tests + Playwright for E2E tests
- [x] Create `CLAUDE.md` with project conventions
- [x] Build core layout: header, footer, navigation (responsive) — _Done (2026-03-04). Header with logo + desktop/mobile nav, footer with 4-column grid._
- [x] Establish component library basics (buttons, cards, section containers) — _Done (2026-03-04). Button (3 variants), Section (3 backgrounds), Card (image + meta + description)._
- [ ] Generate TypeScript types for Sanity schemas (sanity-typegen) and Arctic API responses — _Sanity types generated (2026-02-28); Arctic types pending Phase 3_

## Phase 2: Core Content Pages

> **Note (2026-02-19):** Phase 2 content coordination will be ad-hoc between Justin and Darius. See [[2026-02-19-phase-1-update]].

- [x] Homepage: hero section, featured trips, authority signals (60 years), testimonial highlights, CTAs — _Done (2026-05-29). Sanity-driven, Figma-matched._
- [x] About page: history timeline, team, brand story — _Done (2026-08-10). Rendered via the `page` builder (`app/[slug]` catch-all); seeded from bikeraft.com copy._
- [x] Trip listing page: filterable grid, trip cards with key info — _Grid done (2026-07-21); filtering still pending._
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
- [x] ~~Set up API proxy routes in Next.js~~ — _Not needed for reads: server components call the client directly; credentials never reach the browser. Proxy routes come with the cart phase._
- [x] Read-only endpoints first: trip sync, availability display — _Done (2026-08-10), verified against live data._
- [x] Build open seats page with real-time availability — _Done (2026-08-10): `/open-seats`, grouped by trip, charter-filtered via `orenable`._
- [x] Connect trip detail pages to Arctic for live availability — _Done (2026-08-10): Dates & Availability section with seat badges + interim Book links (Arctic `onlinebookingurl`)._
- [x] Trip-specific "View Open Seats" functionality — _Covered by the trip-detail availability section._
- [ ] Build native trip browsing & selection UI (dates, party size, add-ons)
- [ ] Cart-building flow: add selected items to Arctic cart via API
- [ ] Arctic checkout handoff (popup/new window styled via Custom HTML Header)

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

- [ ] Google Analytics 4 setup
- [ ] PostHog integration
- [ ] Meta Pixel for retargeting
- [ ] SEO: meta tags, Open Graph, structured data (JSON-LD for tours/activities)
- [ ] Sitemap generation
- [ ] Performance optimization (image optimization, lazy loading, Core Web Vitals)
- [ ] Responsive design QA across devices
- [ ] Accessibility audit (WCAG 2.1 AA)

## Related

- [[tech-stack]] — Technology choices
- [[architecture]] — Site structure
- [[open-decisions]] — Blockers and unresolved questions
