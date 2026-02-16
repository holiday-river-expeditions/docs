# Open Decisions

> **Tracking has moved to GitHub Issues.** Each decision item below is now tracked as an issue with the `decision-needed` label on the [website repo](https://github.com/holiday-river-expeditions/website/issues?q=is%3Aissue+label%3Adecision-needed). See the [project board](https://github.com/orgs/holiday-river-expeditions/projects/1) for a visual overview.

Items that need to be resolved before or during the build. Tag with #decision-needed.

## Domain ✅ Decided
**holidayriverexpeditions.com** — already owned, exact brand match, strong SEO, zero acquisition cost.
- bikeraft.com becomes a redirect to the new domain
- Once the new site is live, de-index bikeraft.com (301 redirect entire domain or robots.txt disallow) to prevent duplicate content in search

## Arctic API Credentials ✅ Resolved
Self-service via **Settings > API Access > Manage API Clients > "+ Create API Client"**. No need to contact support. Both Basic and OAuth 2.0 credentials are generated on creation. Passwords shown only once — save immediately. See [[arctic-api#Credential Setup]] for full steps.

## Payment Processing ✅ Resolved
Arctic does **not** handle payment via API. The API cannot process payments. Checkout must hand off to Arctic — either via cart API + redirect to Arctic's checkout page, or via iframe. No Stripe or third-party payment gateway needed on our side. We're going with **cart + handoff**: build the cart via API, then redirect the guest to Arctic to complete checkout/payment. See [[arctic-api#Booking Flow Options]].

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

## Spanish-Language Content #decision-needed
Current site has a "Formas y Información del Viaje" page. Ask Lauren if this is still actively used and needed on the new site.

## Policy Pages Timing #decision-needed
Cancellation & Insurance, Essential Eligibility Criteria, Code of Conduct — are these legally required at launch (Phase 1) or can they come in Phase 2/3?

## Catalog Requests #decision-needed
Current site has a "Request a Catalog" form. Still relevant, or replaced by digital marketing?

## Homepage Featured Trips #decision-needed
Which trips should be the "signature" trips featured on the homepage? Current site shows 8.

## Getting Here / Before You Go Pages #decision-needed
Current site has standalone pages per departure location (Green River, Vernal, San Juan). Should these remain standalone or fold into trip detail pages as sections?

## Related
- [[page-plan]] — Full page/feature proposal
- [[site-audit]] — Current site inventory
- [[arctic-api]] — API credential details
- [[build-phases]] — What's blocked by these decisions
