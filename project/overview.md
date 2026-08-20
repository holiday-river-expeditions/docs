# Project Overview

## Company
**Holiday River Expeditions** is a guided white water rafting and outdoor experience company operating across Colorado and Utah for 60+ years.

- Current website: bikeraft.com (WordPress)
- New domain: **holidayriver.com** (purchased 2026-04-09; holidayriverexpeditions.com and bikeraft.com will redirect to it)

## Why We're Rebuilding
The current WordPress site at bikeraft.com has accumulated years of technical debt:
- Slow performance from plugin bloat and many hands on the codebase over the years
- SEO pollution from legacy content
- Booking via iframe-embedded Arctic Reservations — slow, bad for SEO, poor UX
- Poor mobile experience
- Domain name doesn't reflect the brand direction

## Brand Direction
- **Rafting-first**: Not ditching bike trips but orienting the brand around rafting
- Partial brand refresh: keep logo/identity, modernize visual style
- Display authority more prominently (60+ years, TripAdvisor reviews, certifications)

## Goals

_Status as of 2026-08-20 — see [[build-phases]] for detail._

1. Fast, modern, sleek website that reflects the quality of the experience — **largely built**
2. Native booking integration with Arctic Reservations (no iframes) — **built, behind the `BOOKING_NATIVE` flag; off in production pending sign-off**
3. Easy content management for non-technical staff (blog, FAQs, trip details) — **built** (Sanity Studio at `/studio`)
4. Strong SEO foundation — clean slate, no legacy content pollution — **not started**; no sitemap, robots.txt, Open Graph, or structured data yet
5. Dynamic open seats page generated from Arctic API — **built** (`/open-seats`, live 2026-08-10)
6. Reviews strategy: push to 3rd party platforms (TripAdvisor, Google) — **not started**
7. Analytics: Google Analytics + Meta Pixel at launch (PostHog added later for product analytics) — **not started**; no analytics of any kind is installed

## Key Links
- [[tech-stack]] — Technology choices
- [[architecture]] — Site structure and CMS models
- [[build-phases]] — Phased build plan
- [[arctic-api]] — Booking system integration
- [[open-decisions]] — Unresolved decisions
