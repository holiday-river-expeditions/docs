# Photo Upload Checklist (Studio)

The site renders every image slot from Sanity. Some slots currently hold
**interim photos** rescued from the old bikeraft.com site; the rest are empty
(grey placeholder on the page). The team fills/replaces them in `/studio` —
upload, then **Publish**; changes go live in seconds.

## Empty slots — need a photo (14)

**Homepage** (Studio → Homepage):
- [ ] Rafting Since 1966 → *Story Photo — Left (vintage)* — old-days rafting shot
- [ ] Rafting Since 1966 → *Story Photo — Dee Holladay Portrait* — B&W; the
      signature/arrow overlay points at this
- [ ] Learn & Get Inspired → card image ×4 (River Cooking 101, Triple Rig
      History, Packing For Your Trip, Stargazing On The River)

**Trips** (Studio → Trip → *Photos* — first photo is the card/banner):
- [ ] Westwater Canyon
- [ ] The Maze
- [ ] Gates of Lodore

**Rivers** (Studio → River → *Image*):
- [ ] Gates of Lodore
- [ ] Westwater
- [ ] White Rim
- [ ] Maze
- [ ] San Rafael

## Interim photos — replace with final photography whenever (8)

Filenames start with `interim-` in the Studio media library.

- Homepage hero
- Trips: Cataract Canyon, Desolation Canyon (bluegrass), Yampa River
  (also add more photos per trip — the trip page shows a gallery of up to 6)
- Rivers: Desolation, Yampa, Cataract, San Juan

## Guidelines

- Landscape orientation for hero/river/trip photos (hero crops ~2.4:1 wide,
  cards ~square); portrait 3:4 for the two story photos and learn cards.
- Upload high-res originals — Sanity generates optimized sizes; the crop
  follows the **hotspot** you set in Studio.
- Add **Alt Text** on trip photos (accessibility + SEO).

## Related

- [[sanity-revalidation-webhook]] — how publishes go live instantly
- `website/scripts/seed-interim-photos.mjs` — script that seeded the interim
  set (safe to re-run; never overwrites team uploads)
