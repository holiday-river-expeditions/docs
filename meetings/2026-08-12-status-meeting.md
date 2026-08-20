# 2026-08-12 — Status Meeting (Justin, 10am, Google Meet)

Goals per Justin: catch up on where the site is, timeline forward, and what
Holiday's workload looks like to get everything completed.

Live site: https://website-phi-six-25.vercel.app
Studio: https://website-phi-six-25.vercel.app/studio

## Run of show (~45 min)

### 1. Where we're at — demo (15 min)

One-line status: **Phases 1–2 done; Phase 3 (Arctic) done for everything
read-only, with native booking built and tested but not yet enabled in prod;
what remains is content, reviews/analytics polish, and launch mechanics.**
See [[build-phases]].

Demo order (all on prod — no local server needed):

1. **Homepage** — rafting-first hero, story band, featured trips, new
   material-grain texture language.
2. **Cataract Canyon trip page** — the exemplar every trip will follow. Walk
   top to bottom: hero, difficulty chip, featured review, Season/Min-Age
   facts, itinerary accordions, per-trip FAQs, TrustStrip, Keep Exploring.
3. **Availability** — `/open-seats` + a trip's departure list (month
   grouping, "Next available" pills, 5-Day/6-Day filters). Talking point:
   **live from Arctic Reservations — nobody maintains this by hand.**
4. **Mobile** — narrow the window; the 375px header work just landed.
5. **Studio round-trip edit (the closer)** — open Cataract, change the
   tagline, Publish, refresh the public page (~60s revalidation). Narrate:
   "edits go live within about a minute, no developer involved." Have the
   trip page open in a second tab beforehand.

Not demoable from prod (talking points instead):

- **Native booking is OFF in prod** (`BOOKING_NATIVE` unset in Vercel). Prod
  shows the external reserve / call-to-book path. Backup: `pnpm dev` running
  before the call; the inline flow (party size → live price → Arctic cart →
  checkout handoff) works locally. Carted seats hold no inventory — safe to
  demo, but remove the item after.
- **Itinerary video band not live** — the encoded Deso loop isn't uploaded to
  Sanity yet. Local-only route: `localhost:3000/demo-itinerary-video`.

### 2. Timeline forward (10 min)

Present as an ordered sequence; let the meeting attach dates.

1. **Near-term, Darius (days):** flip `BOOKING_NATIVE` in Vercel once Arctic
   checkout styling is done (blocked on Holiday's Arctic admin — bucket C
   below); upload the Deso video loop + poster.
2. **The long pole: content authoring (weeks, mostly Holiday).** ~19 of ~23
   trips still need authoring in Sanity. **This is the critical path to
   launch and the pace is theirs.**
3. **Remaining build, Darius, in parallel:** gallery + stories section,
   TripAdvisor/Google review surfaces, analytics/SEO/performance pass
   (phases 4–6).
4. **Launch mechanics:** Vercel Pro team, private repos,
   holidayriverexpeditions.com DNS, bikeraft.com 301 redirect. See
   [[environments]].

Framing line: *"The code side has a predictable few weeks left; the launch
date is really set by how fast we get 19 trips authored — so let's talk
about who's writing what."*

### 3. Holiday's workload (15 min) — screenshare this list

**A. Content in Sanity (the big one)**

- [ ] Author the ~19 remaining trips, Cataract as the template (itinerary,
      highlights, photos, FAQs, featured review per trip)
- [ ] Review/correct the seeded Cataract copy; resolve the Deso/Pickpockets
      document conflation
- [ ] Fill TripAdvisor + Google review URLs in Site Settings
- [ ] Curate homepage Featured Trips (drag-to-reorder — quick live demo)
- [ ] Supply raw footage (not edited social reels) for per-trip ambient
      video loops

**B. Decisions needed** (GitHub issues tagged `decision-needed`; see
[[open-decisions]])

- [ ] Navigation structure sign-off (6-item proposal; Mountain Biking
      top-level?)
- [ ] Blog migration scope — all 167 posts vs. ~20–30 curated at launch
- [ ] Trip Finder quiz — launch priority or later?
- [ ] Newsletter/contact email provider (forms currently capture to Sanity
      only — **no emails are sent**)
- [ ] Catalog request form — keep or kill?
- [ ] Getting Here pages — standalone or folded into trip pages?

**C. Arctic admin (Holiday side, unblocks native booking)**

- [ ] Paste [[arctic-custom-header|docs/reference/arctic-custom-header.html]]
      into Arctic → Settings → Guest-facing Sites → Custom HTML Header
- [ ] Add the guest-site domain to the Adobe Fonts kit allowlist
- [ ] Audit Arctic pricing-level names (customer-facing in the booking
      widget)

### 4. Close: Studio access (5 min)

Invite editors live on the call: sanity.io/manage → project `jau3o5v4` →
Members → invite email with **Editor** role (can create/edit/publish
content; can't touch schema or settings). They log in at
`/studio` on the site. Free plan has a seat cap — invite only the people
who'll actually edit.

Assign a concrete first task: *"Pick one trip you know cold and draft it
this week in the Studio — Cataract is your model."*

What they can edit: trips, homepage (hero/story/featured trips/learn
cards), site settings (contact, socials, review URLs), rivers/activities/
categories, FAQs, pages, blog posts; contact + newsletter submissions land
in the Studio for triage.
What they can't: departures, seat counts, live pricing (Arctic owns
inventory and money; Sanity owns naming and storytelling), and
design/layout (code).

## Notes (during the call)

- Work on the Arctic rates and dates list

- Justin
	- Parent pages for specialty trips
	- Fill out all the information in one trip page and have a button that jumps down to dates and rates
- Lauren
	- Specialty trips in the nav versus the wizard versus data
	- Callout a specialty trip via a field on the Dates and Availability
		- Call out for specialty trips
	- For open seats check on if it shows trips with 0 people on it, or just ones that are already in progress
- Blog?
	- Resources or standard style blog?
	- Justin will look into it.
- Next steps
	- Feedback on the site
	- Working on the content plan
	- Work on trip page details?
- SEO, do we worry about duplicate content?
- Karen
	- Clean up existing website and redirect chains?
		- One to one page redirects where applicable
		- Generalized redirect to a purpose-built page for standard redirects
		- Backlinks and stored content out there may be an important consideration
- Timeline
	- Work backwards from Launch and decide where we're getting to
	- On pace to launch it during our prime booking season?
		- Booking season falls off in June/July and picks up in October/November
		- Bookings fall off a bit mid-January
		- Launching December 1st versus October/November
- Holiday trip page design will be owned by Justin
- Trip wizard and quiz
	- Lauren can come up with questions for the wizard
- Set up weekly sync
- HRE projects docs
	- URL 
	- Running notes docs

## Decisions made

-

## Action items

-
