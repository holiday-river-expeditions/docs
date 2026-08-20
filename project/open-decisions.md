# Open Decisions

> **This document is the source of truth for decisions.** Maintained by Darius. (Tracking briefly moved to GitHub Issues in February 2026; the vault is authoritative again as of August 2026.)

Items that need to be resolved before or during the build. Tag with #decision-needed.

## Domain ✅ Decided
**holidayriverexpeditions.com** — already owned, exact brand match, strong SEO, zero acquisition cost.
- bikeraft.com becomes a redirect to the new domain
- Once the new site is live, de-index bikeraft.com (301 redirect entire domain or robots.txt disallow) to prevent duplicate content in search

## Arctic API Credentials ✅ Resolved
Self-service via **Settings > API Access > Manage API Clients > "+ Create API Client"**. No need to contact support. Both Basic and OAuth 2.0 credentials are generated on creation. Passwords shown only once — save immediately. See [[arctic-api#Credential Setup]] for full steps.

## Payment Processing ✅ Resolved
Arctic does **not** handle payment via API. The API cannot process payments. Checkout must hand off to Arctic — either via cart API + redirect to Arctic's checkout page, or via iframe. No Stripe or third-party payment gateway needed on our side. We're going with **cart + handoff**: build the cart via API, then redirect the guest to Arctic to complete checkout/payment. See [[arctic-api#Booking Flow Options]].

> **Update (2026-02-19):** Justin is researching other outfitter cart flows for UX comparison to help inform our checkout design. See [[2026-02-19-phase-1-update]].

## Brand Assets ✅ Resolved
Darius has current brand assets (logo, colors, fonts). No further action needed.

## Content Migration ✅ Resolved
Will migrate content manually — no automated migration from WordPress. Trip descriptions, photos, and blog posts will be reviewed and selectively carried over or rewritten as part of the content buildout phase.

## Reviews Strategy ✅ Resolved
Push visitors to third-party review platforms (TripAdvisor, Google) rather than hosting reviews on the site. May embed TripAdvisor/Google widgets but no self-hosted review system. No migration of WordPress reviews needed.

## Navigation Structure #decision-needed
We're proposing a simplified 6-item nav (down from 7 with overlapping categories). See [[page-plan#Proposed Navigation]] for details. Needs Holiday sign-off on:
- Whether the consolidated structure works for their customers
- Whether Mountain Biking needs its own top-level nav item
- Whether any trip categories must stay top-level (vs. becoming filters)

## Trip Finder / Quiz #decision-needed
Proposing an interactive "Help me choose" flow for new visitors. Is this a launch priority (Phase 1) or can it come later (Phase 2)? Significant build effort.

## Blog Migration Scope #decision-needed
Current site has **167 blog posts** across 5 categories. Options:
- Migrate all 167 at launch (more SEO value, more work)
- Launch with ~20-30 curated high-performers, migrate the rest over time
- Holiday to advise on which posts matter most

## Spanish-Language Content ✅ Decided
Confirmed needed per [[2026-02-19-phase-1-update]]. Phase TBD.

## Policy Pages Timing ✅ Decided
Cancellation & Insurance, Essential Eligibility Criteria, Code of Conduct — confirmed needed per [[2026-02-19-phase-1-update]]. Phase TBD.

## Catalog Requests #decision-needed
Current site has a "Request a Catalog" form. Still relevant, or replaced by digital marketing?

## Homepage Featured Trips — resolved (mechanism)
Featured trips are now curated in Sanity via the **Homepage** document's "Featured Trips" reference list (drag to reorder) — no code change needed to swap them. Seeded with 6: Cataract Canyon, Westwater Canyon, The Maze, Gates of Lodore, Desolation Canyon (specialty music trip), Yampa River. Final selection is the Holiday team's call in `/studio`.

## Trip Dates / Open Seats ✅ Resolved
The Arctic-powered `/open-seats` page is live (2026-08-10) — real-time availability
grouped by trip, replacing the current site's manually-updated "Trips by Date" page.
The footer "Trip Dates" link and `/book` now point there.

## Online Store ✅ Decided
The footer "Online Store" link goes directly to the external Square site
(holiday-river-expeditions.square.site), matching the current site. No local page.

## Newsletter & Contact Form Provider #decision-needed
The footer newsletter signup and /contact form now capture to Sanity
(`newsletterSubscriber` / `contactSubmission` documents, visible in /studio) as an
interim store — no emails are sent. Need to pick an email/CRM provider (Mailchimp,
ConvertKit, plain SMTP relay, etc.) and wire the API routes to it; existing Sanity
captures can be exported and imported at that point.

## Getting Here / Before You Go Pages #decision-needed
Current site has standalone pages per departure location (Green River, Vernal, San Juan). Should these remain standalone or fold into trip detail pages as sections?

## Email Domain Management with Vercel #decision-needed
Need to investigate how email domain management (MX records, SPF, DKIM) works when DNS is pointed at Vercel for hosting. Darius investigating. See [[2026-02-19-phase-1-update]].

## Related
- [[page-plan]] — Full page/feature proposal
- [[site-audit]] — Current site inventory
- [[arctic-api]] — API credential details
- [[build-phases]] — What's blocked by these decisions
