# Sanity Editor Guide

A plain-English guide for Holiday's content editors. No coding involved. It covers how to learn Sanity, what everything in our Studio is, how publishing works on the test site, and how to upload photos so they look sharp.

**The short version:** all the words and photos on the new website live in Sanity. You edit them in a web app called the Studio at [website-phi-six-25.vercel.app/studio](https://website-phi-six-25.vercel.app/studio). Your edits save automatically as a private draft, and nothing changes on the site until you press **Publish**. Once you publish, the test site updates within seconds to a minute.

## 1. Learning Sanity

One thing to know up front: almost all of Sanity's official training (the courses at [sanity.io/learn](https://www.sanity.io/learn)) is for developers building a Studio, not for editors using one. You can skip all of it. Our Studio is already built and customized for Holiday, so the fastest way to learn is inside it:

1. Log in at [/studio](https://website-phi-six-25.vercel.app/studio) with the email you were invited with.
2. Open **Trips → Cataract Canyon**. It is the model trip, fully filled out. Click through its fields and compare them with the live page at [/trips/cataract-canyon](https://website-phi-six-25.vercel.app/trips/cataract-canyon) to see what maps to what.
3. Change something small (the Card Tagline is a good first edit), press **Publish**, and refresh the trip page. Seeing your own edit go live teaches more than any tutorial.
4. Then draft one trip you know cold, using Cataract as the template.

If you want background reading, Sanity's editor overview at [sanity.io/content-editors](https://www.sanity.io/content-editors) gives a feel for the editing features (some of what it shows, like Canvas and review workflows, we do not use). Everything specific to Holiday is in the cheat sheet below.

Two things in the Studio to ignore: the **Vision** tab (a developer query tool) and anything about schema or settings (Editors cannot break those, so click around freely).

## 2. Cheat sheet: what's what in our Studio

The Studio sidebar is grouped. **Trips** sits at the top on its own. **Pages & Posts** and **Taxonomy** are folders you open. **Homepage** and **Site Settings** are pinned because there is exactly one of each, and **Form Submissions** holds the read-only inboxes.

| Type | What it controls |
| --- | --- |
| **Homepage** | The homepage, organized in tabs: Hero, Featured Trips, Rafting Since 1966, Map, Learn & Get Inspired. Drag to reorder featured trips. The **Map** tab lists the Sections that appear as pins on the homepage map; order does not matter, and a new Section only shows once Darius has added its coordinates. |
| **Site Settings** | Phone, email, address, review links, and social links shown across the whole site. |
| **Trip Finder** | The "Find Your Trip" wizard: its questions, answer buttons, photos, and how much each question counts. See [[trip-finder]]. |
| **Trip** | The big one. Each Trip document is one trip page at `/trips/...`. Details below. |
| **Section** (under Taxonomy) | One per stretch of river or country — Westwater, Cataract, White Rim. **Section Name** is the stretch; **River Name** is the actual river ("Colorado River") and is what trip cards show. Powers the section pages at `/rivers/...`. |
| **Trip Type** (under Taxonomy) | Rafting, Biking, and Combo. Powers the `/rafting` and `/biking` landing pages and the coloured tag on every trip card. |
| **Specialty Type** (under Taxonomy) | Specialty families like Canyon Concerts or Stargazing. Powers the sections on the `/specialty` page — these no longer have pages of their own. |
| **Trip Info Section** (under Pages & Posts) | Shared panels that appear near the bottom of every trip page — Packing List, Getting Here, Before You Go. Write it once here and it updates on every trip that uses it. |
| **FAQ** | Question-and-answer entries with a category and a sort order. Trips reference these on their pages. |
| **Page** | Freeform pages like About and Trip Insurance, built from Hero and Content blocks. |
| **Blog Post** | Blog entries with a title, category, main image, and body. |
| **Contact Submission** and **Newsletter Subscriber** | Read-only inboxes. When someone uses the contact or newsletter form on the site, the entry lands here for you to read. You cannot edit these. |

### The Trip document

Trip fields are split into tabs across the top of the document, so you only see one group at a time. The required ones are **Trip Name**, **Slug**, **Section**, and **Trip Type**.

- **Basics**: name, slug, which Section the trip runs, and its Trip Type.
- **Card** (how the trip looks in grids): Card Tagline, Starting Price, Duration Label, and Photos — the first photo becomes the card image and the page banner.
- **Quick Facts** (the bar under the banner): Who's This Trip For, Meeting Place, Deposit, Minimum Age, Season.
- **Trip Details** (the page body): **Trip Description**, Highlights, What's Included, Video, Itinerary, Trip Info Sections, Featured Review, Trip FAQs, and Related Trips.
- **Trip Finder**: the facts the wizard matches on: Duration in days, Max Rapid Class, Season months, age overrides, craft types. Max Rapid Class also shows in the quick facts bar. What each one does to matching is in [[trip-finder]], section 2. The current values are placeholders that need Holiday's confirmation.
- **Specialty**: adding a Specialty Type flags the trip as specialty and lists it in that family's section on `/specialty`. Specialty Ribbon and Specialty Subtitle (under Card) control the red card treatment.

**Two fields are called Description, and they are not the same.** **Trip Description** (Trip Details tab) is this trip's own story and shows on `/trips/...`. **Section Description**, on the Section document, describes the stretch of river and shows on `/rivers/...`. Copy written for a trip page must go on the Trip.

### Things that are easy to get wrong

- **Slugs**: press the Generate button next to the slug field rather than typing one. Do not change a slug after a page is being shared, because the old link stops working.
- **Related Trips can stay empty.** If you leave it empty, the site automatically shows three trips from the same Section or of the same Trip Type. Only fill it when you want a specific hand-picked set.
- **The card ribbon has a fallback.** If a trip has no Specialty Ribbon of its own, it uses the Card Ribbon Label from its Specialty Type. You usually only need to set it in one place, on the Specialty Type.
- **Specialty Departure dates must match Arctic exactly.** When you call out a single departure (for example the September bluegrass date), the Departure Start Date has to be the exact start date in Arctic Reservations. If the date is off by a day, the callout silently does not appear.
- **Page slugs have reserved words.** A Page document cannot use slugs the site already owns, like `trips`, `contact`, `faq`, or `blog`. If a new Page does not show up, an unusual slug conflict is the first thing to check.

### The Trip Finder document

The wizard's questions are content too. Open **Trip Finder** in the sidebar to see them in order. Each question has its words, its background photo, a weight, optional "only ask when" and "skip when" rules, and its answer buttons. Each answer carries one number (a "dial") telling the matcher what it means, such as "Some splash" meaning Class 3. The one field to leave alone is **Kind**, which links a question to its matcher. Everything else, including adding and removing answers, is yours to change. The full walkthrough is in [[trip-finder]].

### What is not in Sanity

Departure dates, seat counts, and live pricing come from Arctic Reservations, not Sanity. Sanity owns the naming and the storytelling. Design and layout (fonts, colors, where sections sit) are code, so if something needs to move or look different, that is a request for Darius rather than a Studio edit.

## 3. Publishing on the test site

We have not moved any real URLs yet. There is one test site, and that is the whole world for now:

- **The site:** [website-phi-six-25.vercel.app](https://website-phi-six-25.vercel.app)
- **The Studio:** [website-phi-six-25.vercel.app/studio](https://website-phi-six-25.vercel.app/studio)

The current bikeraft.com site is completely untouched by anything you do here. Nothing you publish is visible to customers, so this is a safe place to work and to make mistakes.

How publishing works:

1. Edit any document in the Studio. Your changes save automatically as a **draft** only you and other editors can see. It is fine to leave things half-finished.
2. When a document is ready, press **Publish** (bottom right). Publishing puts it on the test site, usually within a few seconds and at most about a minute. Refresh the page to see it.
3. Changed your mind before publishing? Open the document menu (the three dots near the Publish button) and choose **Discard changes** to go back to the last published version.
4. Published something you regret? Every document keeps a full history. Open the document menu and use the history/revisions view to restore an earlier version, then publish again.

## 4. Photos: guidelines and what Sanity does with them

### What Sanity does for you

When you upload a photo, Sanity stores your original on its image service. The website never shows visitors that original file. For every spot on every page, the site asks Sanity for a copy at exactly the right size, cropped around your hotspot, converted to a modern lightweight format (WebP or AVIF), and cached on servers around the world. A 10 MB upload might reach a phone as a 150 KB file.

This has one big consequence: **upload the biggest, best original you have, and let Sanity do the shrinking.** Never resize, compress, or crop a photo yourself before uploading. A pre-shrunk upload cannot be made sharp again, but a huge upload costs nothing.

### Upload guidelines

- **Format**: JPEG is the right choice for photography. Export from your phone or photo library as JPEG (not HEIC). PNG is only for graphics like logos.
- **File size**: large files are fine. A 5 to 20 MB JPEG is normal for a good original.
- **Resolution**: for full-width banner spots (homepage hero, trip and section page heroes, the homepage map pins), the site pulls copies up to 2880 pixels wide, so originals should be at least ~3000 px on the long edge. Cards and gallery photos need less, ~1600 px, but the same photo often fills both a card and a banner, so the simple rule is: if the original is under ~2500 px wide, look for a better one.
- **Orientation**: landscape for hero, river, and trip photos (heroes crop very wide, cards crop roughly square). Portrait, about 3:4, for the story photos and the Learn cards.
- **No banner strips.** Do not reuse skinny pre-cropped headers from the old site (for example 2250×600 strips). They look grainy when the new site stretches them full-width. This is exactly what is wrong with several current river photos that are on the replace list in [[photo-upload-checklist]].
- **Set the hotspot** after uploading: click the crop tool on the image, drag the circle onto the subject. Different spots on the site crop the same photo to different shapes, and the hotspot is what keeps the subject in frame everywhere.
- **Write Alt Text** wherever the field appears: one sentence describing the scene, like "Rafts on a beach below red canyon walls." Screen readers speak it and Google reads it.
- **Captions** on trip photos are optional and currently not shown on the site.

## Related

- [[photo-upload-checklist]] — which photos still need replacing, and where the current ones came from
- [[sanity]] — technical reference for the Sanity setup
- [[sanity-revalidation-webhook]] — how publishes reach the site
- [[trip-finder]] — the Find Your Trip wizard and what you can edit in it
- [[demo-panel-guide]] — the hidden switches for previewing unreleased ideas on the test site
