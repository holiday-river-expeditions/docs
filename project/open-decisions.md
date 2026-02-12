# Open Decisions

> **Tracking has moved to GitHub Issues.** Each decision item below is now tracked as an issue with the `decision-needed` label on the [website repo](https://github.com/holiday-river-expeditions/website/issues?q=is%3Aissue+label%3Adecision-needed). See the [project board](https://github.com/orgs/holiday-river-expeditions/projects/1) for a visual overview.

Items that need to be resolved before or during the build. Tag with #decision-needed.

## Domain
**Recommendation: holidayriverexpeditions.com** — already owned by Holiday (currently redirects to bikeraft.com). Exact brand match, strong SEO, zero acquisition cost. See [[domain-name]] for full research.
- holidayriver.com is likely registered by a third party and would require acquisition
- bikeraft.com can remain as a short redirect for print/merch

## Arctic API Credentials #decision-needed
Contact Arctic Reservations support to obtain:
- Client ID & Client Secret
- API Username & API Password
Required before Phase 3 (Arctic API integration) can begin.

## Payment Processing #decision-needed
Does Arctic handle payment end-to-end, or do we need Stripe or another payment gateway on our side?

## Brand Assets #decision-needed
Gather from Holiday River:
- Logo files (SVG preferred)
- Brand colors (current palette)
- Fonts in use
- Any existing brand guidelines

## Content Migration #decision-needed
Which specific content (if any) to carry forward from the old WordPress site vs. write fresh?
- Trip descriptions — rewrite or adapt existing?
- Photos — which to keep?
- Blog posts — starting fresh (confirmed), but any evergreen posts worth keeping?

## Reviews Strategy #decision-needed
Confirmed: push visitors to 3rd party platforms (TripAdvisor, Google) rather than self-hosted reviews.
Still open:
- Migrate any reviews from the WordPress database?
- TripAdvisor widget embed vs. API integration?
- Google Reviews display approach?

## Related
- [[arctic-api]] — API credential details
- [[build-phases]] — What's blocked by these decisions
