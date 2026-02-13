# Open Decisions

> **Tracking has moved to GitHub Issues.** Each decision item below is now tracked as an issue with the `decision-needed` label on the [website repo](https://github.com/holiday-river-expeditions/website/issues?q=is%3Aissue+label%3Adecision-needed). See the [project board](https://github.com/orgs/holiday-river-expeditions/projects/1) for a visual overview.

Items that need to be resolved before or during the build. Tag with #decision-needed.

## Domain ✅ Decided
**holidayriverexpeditions.com** — already owned, exact brand match, strong SEO, zero acquisition cost.
- bikeraft.com becomes a redirect to the new domain
- Once the new site is live, de-index bikeraft.com (301 redirect entire domain or robots.txt disallow) to prevent duplicate content in search

## Arctic API Credentials ✅ Resolved
Self-service via **Settings > API Access > Manage API Clients > "+ Create API Client"**. No need to contact support. Both Basic and OAuth 2.0 credentials are generated on creation. Passwords shown only once — save immediately. See [[arctic-api#Credential Setup]] for full steps.

## Payment Processing #decision-needed
Does Arctic handle payment end-to-end, or do we need Stripe or another payment gateway on our side?

## Brand Assets ✅ Resolved
Darius has current brand assets (logo, colors, fonts). No further action needed.

## Content Migration ✅ Resolved
Will migrate content manually — no automated migration from WordPress. Trip descriptions, photos, and blog posts will be reviewed and selectively carried over or rewritten as part of the content buildout phase.

## Reviews Strategy ✅ Resolved
Push visitors to third-party review platforms (TripAdvisor, Google) rather than hosting reviews on the site. May embed TripAdvisor/Google widgets but no self-hosted review system. No migration of WordPress reviews needed.

## Related
- [[arctic-api]] — API credential details
- [[build-phases]] — What's blocked by these decisions
