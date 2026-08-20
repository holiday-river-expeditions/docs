# Weekly Sync — 2026-08-20

## Agenda

- Review decisions and notes from last meeting
- Walk through docs site updates
- New navigation item for specialty trips

## Last meeting recap (Aug 12)

Status meeting — Justin, Lauren, Karen, Darius. See [[2026-08-12-status-meeting]] for the full note.

### Where we stood

Demoed the full site on production: homepage, Cataract Canyon as the exemplar trip page, live Arctic availability (`/open-seats` + trip pages), mobile, and a round-trip Sanity edit publishing in ~1 minute. Phases 1–2 done, Arctic read side live. **Native booking is built and tested but off in production**, pending Arctic checkout styling on Holiday's side.

The line that framed the timeline talk: **the code side has a predictable few weeks left; the launch date is set by how fast ~19 of ~23 trips get authored in Sanity.** Content is the critical path, and the pace is Holiday's.

### Decisions made last time

1. **Justin owns the Holiday trip page design.**
2. **Trip pages become one full page** with a button that jumps down to dates & rates — no separate sub-pages.
3. **Specialty trips get called out via a field on Dates & Availability**, plus parent pages per specialty family (Justin).
4. **Lauren writes the trip wizard / quiz questions.**
5. **Karen's redirect strategy:** one-to-one redirects where a page maps cleanly; everything else lands on a single purpose-built redirect page. Backlinks and stored content are part of the audit.
6. **Weekly sync established** — Darius owns notes and action items going forward.
7. **Project docs get a shared home:** https://docs-umber-seven.vercel.app

### Who owns what

- **Justin** — trip page design · specialty parent pages *(built since)* · blog format research (resources vs. standard)
- **Lauren** — wizard questions · specialty trips in nav vs. wizard vs. data · check whether open-seats shows 0-seat trips or only in-progress ones
- **Karen** — existing-site cleanup + redirect-chain mapping · backlink/stored-content inventory
- **Darius** — Arctic rates & dates list · content plan · project docs & running notes *(live)*

### Open coming into today

- **Launch window: Dec 1 vs. Oct/Nov.** Agreed to work backwards from a launch date; the date itself wasn't picked. Seasonality: bookings fall off June/July, pick up Oct/Nov, dip mid-January — an Oct/Nov launch rides the pickup, Dec 1 lands after it starts.
- **Blog format** — resources library vs. standard blog (Justin researching).
- **SEO / duplicate content** — and how it interacts with Karen's redirect work.
- **Open-seats zero-capacity question** (Lauren).
- **Still parked:** nav sign-off, blog migration scope (167 legacy posts), trip-finder priority, newsletter/contact email provider (forms store to Sanity — **no emails are sent**), catalog form, Getting Here pages.

### Shipped since the meeting

- **Specialty trip system:** `/specialty` hub + per-family parent pages, Specialty nav item, callout badges on specific departures, jump-to-dates button on trip pages. Waiting on Holiday to author the real specialty dates in the Studio.
- **Project docs overhauled:** every published doc audited against the codebase and corrected; docs site restyled to the current brand; live at docs-umber-seven.vercel.app.
- **One tracker again:** stale February GitHub Issues closed; [[build-phases]] and [[open-decisions]] in the vault are the source of truth.
- **Domain records reconciled:** docs now reflect **holidayriver.com** (purchased in April), with the cutover steps and the two blockers on retiring bikeraft.com (interim photos + Arctic booking links still point at it).

### Standing asks of Holiday

- **Author the ~19 remaining trips** (Cataract as template) — the launch critical path.
- Fill TripAdvisor + Google review URLs in Site Settings; curate homepage Featured Trips; supply raw footage for video loops.
- **Arctic admin (unblocks native booking):** paste the checkout styling header into Arctic, add the guest-site domain to the Adobe Fonts kit, audit Arctic pricing-level names.

## Notes

-

## Decisions made

<!-- Move anything decided here, then reflect it in [[open-decisions]] -->

-

## Action items

<!-- One line each: what, owner, due -->

- [ ] Task — **Owner**, due YYYY-MM-DD

## Parking lot / open questions

<!-- Tag items needing a decision with #decision-needed -->

-
