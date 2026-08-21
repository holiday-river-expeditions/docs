# 2026-08-20 Weekly Sync

## Agenda

- Review new specialty navigation item
- Add Justin and Riley to Sanity, quick demo of how to edit with at the `/studio` url on the website
- Walk through docs site updates
- New navigation item for specialty trips
- Review & discuss Justin's website feedback list

## Last meeting recap (Aug 12)

Status meeting where we reviewed and discussed the initial home page build, trips skeletons, Arctic integration and new booking workflow, SEO and redirect strategy, and design suggestions such as a bolder logo treatment. See [[2026-08-12-status-meeting]] for the full note.

### Updates I made ahead of the meeting

- **Specialty trip system added:** a `/specialty` hub with per-family parent pages, a Specialty item in the nav, callout badges on specific departures, and a jump-to-dates button on trip pages. Waiting on Holiday to author the real specialty dates in the Studio.
- **Project docs overhauled:** I let these go stale, so I did a sweep and corrected everything. Also noticed it had the old branding/font, so updated that, as well as the style guide to be current. Also fixed the incorrect domain decision Lauren pointed out last meeting.

## Notes

Design feedback session. Justin walked through mockups and most of the meeting was homepage and trip-page direction.

> **Source of record:** Justin's write-up, [Trip Pages Suggested Build Out](https://docs.google.com/document/d/1M-ajj522OX3uXlUM_TwV_qSUodRl2-uoaM5bHTBDOf0/edit) (Google Doc, requires Drive access). It goes harder than these notes ever could and the doc should take precedence.

### Homepage

- Replace the bolder logo with the original one from the mockup
- Hero: put **phone and email in the hero image**. Explore a Holiday "history" video story as the hero (Justin is looping in Ezra to research video content).
- **"Find Your Trip"** section is where the trip wizard will live in the future. Need a sample question wizard to get started on design for that.
- **Replace the trips carousel with a map** of all trips, spanning Utah/Colorado to show our range. It should be topographic in style, and interactive is a plus. Map libraries need research (Darius).
- **Change Book Now CTA to go to Open Seats**, with the phone number and other trips added to that page, instead of the intermediate landing page with the open seats link and phone number.

### Navigation

- **Add a Contact link to the nav.** Potentially consider putting it next to book now (Darius thought post-meeting).
- Idea: floating **trip-finder link peppered throughout the site** as an escape hatch for overwhelmed customers when browsing trips.
- Getting Here / Before You Go pages: perhaps in the hamburger menu, backed by a reusable Sanity component (put in the parking lot below, for now).

### Trip pages

- **Maps on trip pages**, with photos of river areas tied to locations on the trip map.
- The top info bar pattern is liked, with changes: swap Difficulty for **"Who's this trip for"**, add **meeting place** and **deposit**. If it gets crowded, go vertical and possibly a side-by-side layout with a map.
- **Taller header**, maybe as tall as the hero.
- **Book Now buttons jump to the Dates & Availability section** (the jump button is already built).
- **Floating section menu that travels with scroll**, with three stops:
	- *Trip Details*: highlights (the current design's sidebar content), itinerary, rates/dates
	- *FAQs*: see ARTA's interactive widget for inspiration, with tabs Justin can customize
	- *Rates & Dates*: the Book Now target
- **Reviews widget**: carousel plus links out to the review platforms.
- Details from Justin's doc we didn't note here: the Trip Details section's full content list (highlights, copy, photo slideshow/video, what's included, itinerary), **Packing List / Getting Here / Before You Go as collapsible widgets on the trip page**, and Rates & Dates positioned **last** on the page. The floating menu carries Trip Details, Rates & Dates/Book Now, and Packing List, while Reviews and Related Trips stay on the page but **out** of the menu.

### Trip cards & classification

- Cards should show the **river** (e.g. "Colorado River") where "Challenging" sits today.
- The difficulty classification system is in question. Rapid classes (Class I-V) may be a better data point. Parked for a decision. (Justin's doc leans the same way: "Exclude difficulty and replace with Class?")
- From Justin's doc: **combo trips fold in with the biking trips**, marked with a new "combo" tag in a unique color, like the rafting/biking tags.

### Specialty trips

- **Remove the per-family specialty parent pages.** Specialty categories instead get copy, photos, and a floating-menu jump link.
- Justin suggests specialty appears as **one card that opens the specialty page**. We discussed exploring a way to have specialty trips collapse into one card, or other ways to achieve the goal of not overwhelming the other trip types with the high number of specialty trips. Could be issues with Sanity trip structure doing this, and there might be a better way to solve the same problem. More research and thinking to be done.
- **"View all trips" renders all the cards in place** rather than navigating to a new page, and it comes off the parent pages.

## Decisions made

- **Go back to the original logo** (the mockup's logo font is out).
- **Add a Contact link to the navigation.**
- **Book Now CTA lands on Open Seats**, with the phone number and other trips added to that page.
- **Phone and email go in the homepage hero.**
- **The future trip wizard lives in a homepage "Find Your Trip" section.**
- **Replace the trips carousel with a topographic map** of all trips across Utah/Colorado, interactive if we can find the right library.
- **Trip page redesign direction set** (Justin): maps and river photos, a "Who's this trip for" info bar with meeting place and deposit, a taller header, Book Now jumping to dates, a floating scroll menu (Trip Details / FAQs / Rates & Dates), and a reviews carousel.
- **Trip cards show the river instead of the difficulty label.**
- **Specialty v1 revised:** the per-family parent pages are coming out, and specialty categories become sections on the specialty page with copy, photos, and jump links. "View all trips" expands in place. How specialty trips collapse in the trip grids still needs research (see notes).
- **Floating trip-finder link** sprinkled site-wide.

## Action items

| Action                                                             | Owner             | Due                  |
| ------------------------------------------------------------------ | ----------------- | -------------------- |
| Research map libraries (topographic, interactive)                  | **Darius**        | Aug 27               |
| Mock up different trip page options                                | **Darius**        | Aug 27               |
| Photo guidelines and format, and what Sanity does for image optimization | **Darius**        | Aug 27               |
| Research email hosting options                                     | **Darius**        | TBD                  |
| Start filling out trips and photos in the Studio                   | **Justin**        | TBD, time permitting |
| Research video content and a Holiday "history" video for the hero  | **Justin, then Ezra** | TBD, time permitting |

## Parking lot / open questions

- Difficulty classification: keep easy/moderate/challenging/expert or move to rapid classes (Class I-V)? Leaning rapid classes. #decision-needed
- Getting Here / Before You Go: standalone pages in the hamburger menu with a reusable Sanity component? #decision-needed
- Launch window (Dec 1 vs. Oct/Nov), carried over from Aug 12 and still unset. #decision-needed
