# Build Phases

> **Tracking has moved to GitHub Issues.** Each item below is now tracked as an issue on the [website repo](https://github.com/holiday-river-expeditions/website/issues), organized into milestones by phase. See the [project board](https://github.com/orgs/holiday-river-expeditions/projects/1) for a visual overview.

## Phase 1: Project Foundation
- [x] Initialize Next.js 15 project with App Router and TypeScript (strict mode)
- [x] Configure ESLint + Prettier for consistent code style
- [ ] Set up Tailwind CSS with brand design tokens (colors, typography, spacing) — *Tailwind v4 configured; brand tokens still needed*
- [ ] Configure Sanity Studio project with initial content models (typed schemas)
- [x] Configure GitHub Actions CI pipeline (lint → type-check → test → build)
- [x] Set up Vercel project with Git-based deploys + PR preview deployments
- [x] Configure beta subdomain (`beta.holidayriverexpeditions.com`) on Vercel for stakeholder testing
- [x] Set up Vitest for unit/integration tests + Playwright for E2E tests
- [x] Create `CLAUDE.md` with project conventions
- [ ] Build core layout: header, footer, navigation (responsive)
- [ ] Establish component library basics (buttons, cards, section containers)
- [ ] Generate TypeScript types for Sanity schemas (sanity-typegen) and Arctic API responses

## Phase 2: Core Content Pages
- [ ] Homepage: hero section, featured trips, authority signals (60 years), testimonial highlights, CTAs
- [ ] About page: history timeline, team, brand story
- [ ] Trip listing page: filterable grid, trip cards with key info
- [ ] Trip detail page: full content from Sanity, photo gallery, pricing, CTA to book
- [ ] River landing pages: per-river content and trip filtering
- [ ] FAQ page: CMS-driven, categorized, accordion UI
- [ ] Contact page: form + company info

## Phase 3: Arctic API Integration
- [ ] Set up API proxy routes in Next.js
- [ ] Build open seats page with real-time availability
- [ ] Build native booking flow UI (replacing iframes)
- [ ] Connect trip detail pages to Arctic for live availability
- [ ] Trip-specific "View Open Seats" functionality
- [ ] Add-on selection during booking

## Phase 4: Blog & Content
- [ ] Sanity blog content model + studio customization
- [ ] Blog listing page with pagination/filtering
- [ ] Blog post pages with rich content rendering
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
