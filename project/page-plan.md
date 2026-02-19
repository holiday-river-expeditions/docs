# Page & Feature Plan — Proposal

> **Status: Draft for Holiday review.**
> Based on the [[site-audit]] of bikeraft.com. All recommendations below are proposals — nothing is final until Holiday signs off.

## Related

- [[site-audit]] — Full inventory of current bikeraft.com pages
- [[build-phases]] — Technical build phases
- [[architecture]] — Site structure and routes

---

## Proposed Navigation

Simplifies the current 7-item nav (with overlapping categories) down to 6 clear items. #needs-holiday-input

| Nav Item | Proposed Contents |
|----------|-------------------|
| **Trips** | All Trips (filterable), By River, By Activity, Specialty & Events |
| **Destinations** | Utah, Colorado, Idaho, Grand Canyon, National Parks |
| **About** | Our Story, The Holiday Way, Meet the Guides, Team, Reviews, Employment |
| **Blog** | All Posts, Trip Prep, Conservation, Culture & History |
| **Contact** | Contact form, Getting Here guides, FAQ |
| **Open Seats** | *(CTA button — real-time via Arctic API)* |

**Key change:** Current site has "Rivers", "Destinations", and "Trip Type" as separate nav items that all lead to overlapping content. This proposal collapses them into "Trips" (filterable) + "Destinations" (by region). The Trip Type categories (Family, Stargazing, Canyon Concerts, etc.) become filters/tags within the trip listing rather than top-level nav.

**Needs Holiday input:**
- Is this nav structure intuitive for their customers?
- Are there categories that *must* stay top-level? (e.g., Mountain Biking might warrant its own nav item)
- What should "Open Seats" be labeled? Currently it's a CTA button in the nav.

---

## Proposed Page Structure by Phase

### Phase 1 — Launch-Critical

These are the pages we recommend having ready at launch.

| # | Page | Notes |
|---|------|-------|
| 1 | **Homepage** | Hero with CTA, trip finder teaser, featured trips (with live availability), brand story snippet, reviews, newsletter |
| 2 | **Trip Listing** | Filterable grid (river, activity, duration, difficulty, price, date range, group type) |
| 3 | **Trip Detail** | Hero, overview sidebar, native booking UI (Arctic API), itinerary, gallery, reviews, related trips |
| 4 | **Open Seats** | Real-time availability from Arctic API (replaces current manually-updated list) |
| 5 | **River Landing Pages** | Colorado, Green, San Juan, Yampa — each with map, description, trip cards |
| 6 | **Activity Landing Pages** | River Rafting, Mountain Biking, Multi-Sport |
| 7 | **Contact** | Form, phone, email, both HQ addresses |
| 8 | **FAQ** | Searchable/expandable, CMS-driven |
| 9 | **About / Our Story** | History, The Holiday Way, team overview |
| 10 | **Trip Finder / Quiz** | Guided flow: days? rafting or biking? skill level? who's coming? → recommendations |

**Needs Holiday input:**
- Is Trip Finder / Quiz a launch priority or can it wait? It's a significant build item.
- Which trips are "signature" / featured on the homepage?
- Is the Open Seats page still important if we show availability on trip detail pages?

### Phase 2 — Important, Not Blocking Launch

| # | Page | Notes |
|---|------|-------|
| 11 | **Meet the Guides** | Guide profiles with photos and bios |
| 12 | **Trip Category Pages** | Family, Stargazing, Canyon Concerts, Adult Only, Youth Group, Private, Affinity, Specialty, Women's |
| 13 | **Destination Landing Pages** | Utah Rafting, Colorado Rafting, Idaho, Grand Canyon, National Parks |
| 14 | **Reviews** | Aggregated display from TripAdvisor, Google, Yelp |
| 15 | **Blog Listing + Posts** | Category-filtered. Suggest launching with ~20-30 curated high-performing posts, migrating the rest over time |
| 16 | **Ways to Save** | Deals/specials page |
| 17 | **Getting Here / Before You Go** | Per-departure-location guides (Green River, Vernal, San Juan, etc.) |
| 18 | **Insider Guides / Things to Do** | Evergreen content moved out of blog into a dedicated page for SEO/UX. See [[2026-02-19-phase-1-update]]. |

**Needs Holiday input:**
- How many blog posts should launch with the new site? All 167? A curated set?
- Are the "Getting Here" / "Before You Go" pages heavily used? Could they be sections within trip detail pages instead?
- Which trip categories are most important to Holiday's business?

### Phase 3 — Nice to Have

| # | Page | Notes |
|---|------|-------|
| 19 | **Trip Comparison** | Side-by-side comparison tool |
| 20 | **Online Store** | External link to Square site (holiday-river-expeditions.square.site) |
| 21 | **Request a Catalog** | Form |
| 22 | **Employment** | Job listings |
| 23 | **Spanish-Language Info** | Formas y Información del Viaje — ✅ confirmed needed ([[2026-02-19-phase-1-update]]), consider moving to Phase 2 |
| 24 | **Policy Pages** | Essential Eligibility Criteria, Cancellation & Insurance, Code of Conduct — ✅ confirmed needed ([[2026-02-19-phase-1-update]]), consider moving to Phase 2 |
| 25 | **Outside for All Fund** | Cause/mission page |
| 26 | **Wilderness First Aid Training** | Info page |
| 27 | **Newsletter Archive** | Canyon Currents |
| 28 | **Remaining Blog Posts** | Migrate remaining ~130+ posts from current site |
| 29 | **Awards** | Awards & recognition page |
| 30 | **Mediakit / Travel Agents** | Industry-facing pages |

**Needs Holiday input:**
- ~~Is the Spanish-language page still actively used/needed?~~ ✅ Confirmed needed.
- ~~Should policy pages (Cancellation, Eligibility) be Phase 1 for legal reasons?~~ ✅ Confirmed needed. Consider moving to Phase 2.
- Is the catalog request still relevant, or has it been replaced by digital marketing?
- Wilderness First Aid Training — is this a revenue source or just informational?

---

## Suggested New Features

These don't exist on the current site and would be new additions. All are proposals.

| Feature | Description | Suggested Phase |
|---------|-------------|-----------------|
| **Trip Finder / Quiz** | Guided "Help me choose" flow for new visitors | Phase 1 (propose) |
| **Real-time availability badges** | "X seats left" shown on trip cards sitewide | Phase 1 |
| **Native booking flow** | Browse → select date → add to cart → handoff to Arctic for payment | Phase 1 |
| **Filterable trip listing** | Filter by date, duration, price, difficulty, activity, river | Phase 1 |
| **Mobile-first responsive design** | Current site is responsive but not mobile-optimized | Phase 1 |
| **Blog ↔ trip linking** | Blog posts about specific trips include booking CTAs | Phase 2 |
| **Trip comparison** | Side-by-side comparison tool | Phase 3 |

---

## Suggested UX Improvements

Carrying forward from the [[site-audit#UX Problems to Fix]]:

| Problem                                | Proposed Fix                                                   |
| -------------------------------------- | -------------------------------------------------------------- |
| Hero has no CTA                        | Add "Find Your Trip" or "Browse Trips" button                  |
| Overlapping nav categories             | Consolidate into Trips + Destinations (see proposed nav above) |
| Trip Type dropdown too long (11 items) | Make categories filters/tags, not nav items                    |
| "Resources" label is unclear           | Rename to "Blog" or "Stories"                                  |
| No trip finder/filtering               | Filterable trip listing + optional quiz flow                   |
| Open Seats manually updated            | Real-time via Arctic API                                       |
| Arctic booking widget is iframe        | Native booking UI with cart + handoff                          |
| No urgency/scarcity signals            | Show "X seats left" on trip cards                              |
| Blog disconnected from trips           | Cross-link blog posts to relevant trip pages                   |

---

## Open Questions for Holiday #needs-holiday-input

1. **Nav structure** — Does the proposed simplified nav work? Any categories that must stay top-level?
2. **Trip Finder / Quiz** — Launch priority or Phase 2?
3. **Blog migration** — All 167 posts at launch, or start with a curated set?
4. ~~**Spanish content** — Is the Formas y Información del Viaje page still used?~~ ✅ Confirmed needed. Phase TBD.
5. **Catalog requests** — Still relevant?
6. ~~**Policy pages** — Phase 1 for legal reasons or can they wait?~~ ✅ Confirmed needed. Phase TBD.
7. **Homepage featured trips** — Which trips are the "signature" ones to feature?
8. **Getting Here pages** — Standalone pages or fold into trip detail pages?
9. **Wilderness First Aid** — How prominent should this be?
10. **Trip categories** — Which are highest priority? (Family, Stargazing, Canyon Concerts, etc.)
