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

> These photos are copies in Sanity, served from `cdn.sanity.io`, so they keep working after bikeraft.com redirects to **holidayriver.com** (checked 2026-10-21). Replacing them with Drive photography is about quality, not the cutover. See [[environments#Blockers on retiring bikeraft.com]].

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

## Drive photo hunt (2026-10-21)

Two agents searched the Drive library for specialty and biking photos. Darius picked from the candidates, and the picks went into Sanity the same day. Each uploaded asset records its Drive file in `source` (`name: google-drive`, `id`, `url`).

**Applied:**
- Specialty family images: Canyon Concerts (`Pickpockets Lodore 2023-7.jpg`), Dark Sky Stargazing (`Deso_Stars.jpg`), Women's Trips (`ImageReborn-080523-RiverRetreatMoab-1401.jpg`), Youth & Family (`Lodore Holiday 0026.JPG`), Affinity & Custom Groups (`LGBTQ Flags Westwater Canyon.jpg`).
- Specialty date photos: Pompe & Honey (`IMG_9745.HEIC`, a phone shot from a 2024 Lodore trip), Del Sol Quartet (`Photo Dec 24 2018, 1 47 49 PM.jpg`, actually 2023 Lodore), The Pickpockets (`Pickpockets Lodore 2023-7.jpg`), The Last Wild Buffalo (`AJM_1700.jpg`, 2026 Westwater), and the five Stargazing Specials (`Lodore Holiday 0060.JPG` for Yampa, `Lodore Holiday 0024.JPG`, `Cat_Stars.jpg`, `Deso_Stars.jpg`, `Deso_CowSwimMW.jpg` for Labyrinth).
- The Maze leads with `Maze Bikepacking 10_24-165.jpg` (a rider climbing under red walls), then the van shot `-169`, then the old hiking lead. The Maze river uses `-157`.
- The `/biking` hero (the Biking trip type's Image) is `20231007_0059.jpg` from the 2023 Sam Watson White Rim shoot: a rider dropping onto the rim road above the Green River. A photo credit is burned into its bottom-right corner, so the Sanity crop trims the bottom 4%. It replaced `-157`, which was too dark under the banner's gradient.
- River images: San Rafael (`IMG_2918.JPG`, replacing the photo with text printed on it) and White Rim (`Noble_MTB033 (1).jpg`).
- White Rim Trail & Cataract Canyon leads with `Noble_MTB413 (1).jpg`, hotspot on the riders. The old river-camp lead was dropped.
- San Rafael Swell leads with `IMG_2918.JPG` (rider under a striped spire, hotspot on the rider). In its gallery, `IMG_2752.JPG` (two riders by an old mine entrance) replaced the 600×400 group-jump photo.
- White Rim Trail leads with `5C4A1841.jpg` from the 2020 Chris Whitaker shoot (a rider on the sandstone bench with the spires behind), so it no longer shares a lead with White Rim & Cataract. `Noble_MTB193 (1).jpg` replaced the three 600×400 gallery photos.
- Second round, after a full pass through the 2020 Lodore women's yoga shoot: River & Yoga uses `Ladore_Womens_brighter200709_Duhaime-4.jpg` (group stretch on a sunny beach), and Theoretical Blonde uses `image_50419969.JPG` (a guitar jam on a ledge above the river, not tied to a band).

**Still open:** none of the new photos have alt text yet.

**Where things are in Drive:** Specialty Trips (`1y9N9pXVyxvQvnmLfi_Ivud-fesPtSHyS`) holds the Music, Stargazing, Women's and Affinity folders. The bike shoots sit in the trip library (`1l56cSxyrFx28vy1Jatc6KtZgIJLI5T_A`): 2024 Josie Moe Maze, 2008 Chris Noble White Rim, 2019 Jack Stauss and 2025 Amanda Placide Swell. The Drive connector can't download files over 10 MB. Files that are shared by link download in full from `https://drive.usercontent.google.com/download?id=<id>&export=download&confirm=t`, and Drive's `https://drive.google.com/thumbnail?id=<id>&sz=w800` gives a preview. The 2023 Sam Starr Lodore stargazing shoot and the Noble TIFs are still unreviewed.

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
