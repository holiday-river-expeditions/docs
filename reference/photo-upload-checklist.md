# Photo Checklist (Studio)

**Every image slot on the site is now filled** — no grey placeholders remain.
Photos came from two sources; the team refines them in `/studio` (upload →
set hotspot → **Publish**; live in seconds).

## Where the current photos came from

**Figma-mapped from Google Drive (design-intended — these are "final" unless
the designer says otherwise):**
- Homepage hero — `SRO_1126.jpg`
- Story vintage photo — `Folder006_00012A.jpg`
- Dee Holladay portrait — `Folder003_00002A.jpg`

**Picked from the Drive photo library by subject (good candidates, but nobody
art-directed them — re-curate freely):**
- Learn cards: `canyon kitchen`, `Dee Triple Rig 2`, `Impeccable-Gear`,
  `Stargazing Trips in Canyonlands`
- Trips: Westwater (`2010-08-01-Westwater-968`), The Maze
  (`Holiday Maze 2023_full-66`), Gates of Lodore (`Lodore_7`)
- Rivers: Westwater, Maze, Lodore, White Rim, San Rafael

**Interim from the old bikeraft.com site (replace with Drive photography):**
- Trips: Cataract Canyon, Desolation Canyon (bluegrass), Yampa River
- Rivers: Desolation, Yampa, Cataract, San Juan
- (Filenames start with `interim-` in the Studio media library.)

> ⚠️ **These 7 photos are a launch blocker, not just a nice-to-have.** They are served from `www.bikeraft.com` (whitelisted as a `next/image` remote host in `website/next.config.ts`), and the domain decision has bikeraft.com becoming a 301 redirect to **holidayriver.com**. When that redirect goes in, these images break. They must be replaced with real photography before cutover — see [[environments#Blockers on retiring bikeraft.com]].

## Mock-photo hunt results (2026-07-22)

Extracted the mock's actual card photos via the Figma API (image fills) and
matched them against Drive visually + by exact byte size:

**Found & applied:**
- Specialty card → **`Pickpockets Lodore 2023-23.jpg`** (the mock's band shot
  is an Instagram screenshot of this same session; the Drive original is
  higher quality and rights-clean)
- Cataract card → **`NoahWetzel_CataractCanyon2021_809.jpg`** (mock uses a
  frame from this exact shoot; its precise frame wasn't in the selects
  folder — 809 is the same-day equivalent)
- Triple Rig learn card → **`Dee Triple Rig 4.jpg`** (byte-exact mock match)
- NPS footer badge → high-res artwork (426×480) pulled from the mock itself

**Not in Drive (searched thoroughly — likely video stills / IG / other
sources). Mock shows:**
- *Westwater card:* sunset camp scene, beached `holiday` rafts + rainbow
  (one raft labeled "Mark Crumbo O'Neill")
- *Yampa card:* red packrafts on calm water beneath huge sandstone walls
- *Maze card:* bikers around the BikeRaft van at dusk camp
- *River Cooking card:* guide in HRE tee seasoning steaks on a grill, red
  cliffs behind
- *Packing card:* frame from the warehouse orientation video (map mural
  behind) — grab from the video file
- *Stargazing card:* man at telescope in beanie (small web-res image; only
  ~600px exists in the mock itself)

## Remaining team tasks

- [ ] Replace the 7 `interim-` photos with real Drive photography
- [ ] Review the subject-picked photos above; swap any that don't fit
- [ ] Add 2–6 gallery photos per **Trip** (trip pages show a gallery; most
      trips currently have just the one card photo)
- [ ] Desolation specialty card: use an actual **Pickpockets Bluegrass** band
      photo when one exists
- [ ] Set **Alt Text** on trip photos (accessibility + SEO)

## Guidelines

- Landscape for hero/river/trip photos (hero crops ~2.4:1, cards ~square);
  portrait 3:4 for story photos and learn cards.
- Upload high-res originals — Sanity optimizes; crops follow the **hotspot**.

## Related

- [[sanity-editor-guide]] — upload guidelines, formats, and what Sanity does for image optimization
- [[sanity-revalidation-webhook]] — how publishes go live instantly
