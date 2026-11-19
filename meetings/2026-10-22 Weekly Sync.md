# 2026-10-22 Weekly Sync

**Attendees:**

## Agenda

- Catch up on what shipped since [[2026-09-17 Weekly Sync]]
- Walk the trip content and the latest site updates
- Test the menu variants on phones
- Pick the homepage hero
- Share Hilary's Gates of Lodore tracing
- Go through what's waiting on Holiday
- Plan back from a January launch

## Last meeting recap (Sep 17)

Every action item from Sep 10 and Sep 17 is done.

- The trip page now reads trip info, then highlights, then the map. It also has the land acknowledgement box, What's Included and the "FAQs" name. This went live Oct 11.
- The store links out to Square at launch. An on-site store through Square's API is for after launch (decided Oct 11).
- Hilary sent the detailed Gates of Lodore tracing.

## What shipped

### Every current trip has a page (Oct 11 and Oct 21)

- The site has 12 trip pages. Each one uses the old site's text word for word, with `[Holiday to write]` placeholders where new copy is needed.
- The original seven are Cataract, Desolation, Gates of Lodore, San Juan, The Maze, Westwater and Yampa.
- The five new pages are White Rim, San Rafael Swell, Labyrinth (plus a Labyrinth river page), White Rim & Cataract, and Moab & Westwater.
- The fall hiker didn't get its own page. It's now the 8 and 12 day options on Cataract. Westwater also offers the 4 day Ruby trip.
- Prices now come from Arctic. Minimum ages are fixed (Maze 12, Westwater 8, Yampa 8), Desolation is 5/6 days, and San Juan links Upper, Lower and Full at 3/4/5 days.
- Any copy that had been reworded is back to the old site's text. That covers Cataract's intro and itinerary, the Desolation and San Juan itineraries, and Lodore's highlights. I removed the made-up What's Included lists.
- The 11 public 2027 specialty dates are tagged: Dark Sky Stargazing, Canyon Concerts and the Women's River & Yoga trip. Private charters are hidden from the site.
- New photos from the Holiday Drive went in for the specialty families and dates, The Maze, San Rafael, White Rim, White Rim & Cataract, and the biking page.

### Site updates (Oct 21 and 22)

- **Book page.** You can filter by month, length and trip, and it shows the whole season. Before this it stopped at April and May.
- **Specialty page.** Every specialty date is listed with a photo, seats left and the fare. View Trip jumps straight to that date on the trip page. Trip pages also show their specialty dates near the top.
- **Section menu.** On phones it's a bottom bar with See dates. On desktop it's a row of tabs. It no longer covers the Book buttons or Find Your Trip, and Find Your Trip is now dark green everywhere.
- **Arctic checkout.** The header and footer now match the site.
- **Header nav.** It no longer wraps at laptop widths.
- **SEO.** The site has a sitemap and link previews for sharing. Search engines stay blocked until we move to holidayriver.com.

## To review together

### Menu variants on phones

Arm each phone with `/admin` (see [[demo-panel-guide]]). Compare the default menu against the trip bar, with the next dates strip and the end of page block turned on. Try the hiding header as a side check.

Tasks to give them:

- Find the first June date with room for four.
- Find out what a normal day is like and whether a 9 year old can go.
- Find a calmer trip.
- Get to the biking trips.

Watch whether people scroll to the top anyway, and whether they mix up the two menu buttons.

### Homepage hero

The options are in the demo panel under "Homepage hero photo": a draft video and three photos with a Holiday raft. If they pick the video, Ezra should cut the final one. It should run 10 to 15 seconds, silent, with a Holiday raft in it, and loop without a visible jump.

### Gates of Lodore map

I'll share Hilary's tracing. Next I'll build the detailed map on Lodore as the proof of concept. From Sep 17, the ideas were rapids by class, campgrounds with a photo each, and the itinerary by section with mileage. I need to know which of those matter most for the first version, and whether they want pins on the current image, a flat map, or labels drawn in code.

### Known issue

Yampa's dates are bookable on its own page, but Yampa doesn't show up on the Book page. The Book page only lists trip types that are switched on for online reservations in Arctic, so the likely cause is that setting on the two Yampa trip types (Arctic ids 59 and 60). If someone has Arctic open, it's worth checking.

## Waiting on Holiday

### In Arctic

- Switch off online booking for the eight 2027 charters. The site already hides them, but Arctic should mark them private too. I'll send Karen or Lauren the list.
- Decide where four named 2027 trips belong, since the site has no specialty group for them: the Desolation Kayak Workshop, Labyrinth Extended Hiking, Lodore "Mt. Springs" and the Westwater/Ruby BIPOC trip.
	- BIPOC = affinity
	- Mt Springs is a charter
	- Kayak Workshop - no type, other

### Content (Justin)

- Fill in the `[Holiday to write]` placeholders, which are live now. Search the Studio for "Holiday to write". Most are taglines, "who it's for" and itinerary day titles.
- Write the shared What's Included list in Site Settings. It's empty, so no trip page shows that section.
- Add alt text to the new specialty and bike photos.
- Choose real photos for Labyrinth and Moab & Westwater, which still show photos from the old site.
- Confirm the trip finder values for the new trips.
- Send map photo points for each section, more guest reviews, and the packing list, getting here and before you go content.

### Decisions

- Difficulty labels or rapid classes (Class I to V)? #decision-needed
- Newsletter and contact form provider. Both forms save to the Studio today and send no email. #decision-needed
- How many of the 167 blog posts to bring over. #decision-needed
- Sign off on the navigation. #decision-needed
- Getting Here and Before You Go: their own pages or part of each trip page? #decision-needed
- Keep the Request a Catalog form? #decision-needed
- Logo treatment and the live river flow chip are theirs to decide when ready.

## Road to launch

We're aiming for January with no hard date yet. I'd like a target date to plan back from.

What's left on my side:

- Point the Book links at Arctic's own booking site. They still go through bikeraft.com, which is the last thing blocking the move to holidayriver.com (see [[redirect-map]]).
- Point beta.holidayriver.com at the new site.
- Set up analytics.
- Do a performance and mobile pass.
- Turn on booking on our own site.
- Finish the email hosting check (see [[email-hosting]]).

## Notes

- Add some pieces of art like big horn sheep and birds and stuff
	- 3 or 4 little elements
	- Upper stretch of Lodore a lot of osprey
	- Big horn sheep around jones hole
- Specialty trip page
	- Create unique trip pages for each specialty trip page
	- Perhaps add copy to the whitespace on specialty trips page and change to book
	- Add more content to the dates and availability
	- See old site individual pages: https://www.bikeraft.com/music-river-rafting-trips-in-ut-co/pompe-n-honey-on-the-yampa-river/#reservation
	- Some of the specialty trips change rivers
- River trip page
	- May not want the specialty trips at the top
	- Updating the names to indicate concert or trip type
- Hero video
	- Ezra stitching together new and old videos
- Give holiday the list of charters that are showing up in arctic
- Images in sanity are labeled as untitled
- There is a darkened filter on top of the images, remove it or make it more subtle
- Cookie consent?
	- Compliance law for this?
	- Make it super easy and unobtrusive

## Decisions made

<!-- Move anything decided here, then reflect it in [[open-decisions]] -->

-

## Action items

<!-- One line each: what, owner, due -->

| Action | Owner | Due |
| --- | --- | --- |
| Task | **Owner** | YYYY-MM-DD |

## Parking lot / open questions

<!-- Tag items needing a decision with #decision-needed -->

-
