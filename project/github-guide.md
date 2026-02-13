# GitHub Reference Guide

A quick-start guide for navigating the project board, viewing issues, and filing new ones. No technical background needed.

## Quick Links

- **Issues list:** [github.com/holiday-river-expeditions/website/issues](https://github.com/holiday-river-expeditions/website/issues)
- **Project board (kanban):** [github.com/orgs/holiday-river-expeditions/projects/1](https://github.com/orgs/holiday-river-expeditions/projects/1)
- **New issue:** [github.com/holiday-river-expeditions/website/issues/new/choose](https://github.com/holiday-river-expeditions/website/issues/new/choose)

## Viewing the Project Board

The project board gives a visual overview of all work. It's organized as a kanban board — cards move left to right as work progresses.

1. Open the [project board link](https://github.com/orgs/holiday-river-expeditions/projects/1).
2. Each column represents a status (e.g., Backlog, In Progress, Done). Cards move between columns as work advances.
3. Click any card to see the full issue details.

### Filtering the board

- **By milestone:** Click the "Filter" bar at the top, choose **Milestone**, then pick a phase (e.g., "Phase 1: Foundation").
- **By label:** Same filter bar — choose **Label**, then pick the label you want (e.g., `content`, `decision-needed`).
- You can combine filters to narrow things down further.

## Understanding Labels

Every issue is tagged with labels so you can quickly see what it's about.

### Phase labels

These tell you which build phase an issue belongs to:

| Label | Phase |
|-------|-------|
| `phase-1-foundation` | Project Foundation — layout, config, tooling |
| `phase-2-content` | Core Content Pages — homepage, trips, about, etc. |
| `phase-3-arctic-api` | Arctic API Integration — booking, availability |
| `phase-4-blog` | Blog & Content — blog, stories, gallery |
| `phase-5-reviews` | Reviews & Social Proof — TripAdvisor, Google Reviews |
| `phase-6-seo-analytics` | SEO, Analytics & Polish — GA4, performance, accessibility |

### Type labels

These describe the kind of work:

| Label | Meaning |
|-------|---------|
| `decision-needed` | Requires a decision before work can proceed |
| `setup` | Infrastructure, config, tooling |
| `feature` | New user-facing functionality |
| `content` | CMS content models, pages |
| `integration` | Third-party API integrations |

## Understanding Milestones

Milestones group issues into the six build phases. They're used to track overall progress toward each phase.

| Milestone | What it covers |
|-----------|---------------|
| Phase 1: Foundation | Core layout, Sanity setup, Vercel deploys, component library |
| Phase 2: Core Content Pages | Homepage, About, Trips, Rivers, FAQ, Contact |
| Phase 3: Arctic API Integration | Booking flow, availability, open seats |
| Phase 4: Blog & Content | Blog, stories, gallery |
| Phase 5: Reviews & Social Proof | TripAdvisor, Google Reviews, authority signals |
| Phase 6: SEO, Analytics & Polish | GA4, PostHog, Meta Pixel, performance, accessibility |

For full details on what's in each phase, see [[build-phases]].

## Creating a New Issue

All issues use one of two templates — **Bug Report** or **Feature Request**. Blank issues are disabled, so you'll always start from a template.

To create an issue:

1. Go to the [new issue page](https://github.com/holiday-river-expeditions/website/issues/new/choose).
2. Pick the template that fits your request.
3. Fill in the form fields (details below).
4. Click **Submit new issue**.

### Bug Report

Use this when something on the site isn't working correctly.

**Required fields:**

1. **Description** — A clear summary of the bug. What's wrong?
2. **Steps to reproduce** — The exact steps someone would follow to see the bug. For example:
   - Go to the homepage
   - Click the "View Trips" button
   - See error message
3. **Expected behavior** — What should have happened.
4. **Actual behavior** — What actually happened instead.

**Optional fields:**

5. **URL / page affected** — The page URL where you found the bug.
6. **Screenshots** — Attach images showing the problem (drag and drop into the field).

### Feature Request

Use this to suggest a new feature or improvement.

**Required fields:**

1. **Problem statement** — Describe the root problem. Who is affected? What's frustrating, missing, or broken?
2. **Area of the site** — Pick from the dropdown: Homepage, Trip listings, Trip detail pages, Booking/reservations, Navigation/header/footer, Blog/news, About/company pages, Contact, or Other.

**Optional fields:**

3. **Proposed solution** — If you have an idea for how to fix it, describe it here.
4. **Additional context** — Screenshots, examples, links, or anything else that helps explain the request.

## Related

- [[build-phases]] — Full breakdown of what's planned in each phase
- [[open-decisions]] — Open questions and decisions that need input
