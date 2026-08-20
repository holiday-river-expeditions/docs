# UI Patterns

> **Superseded in part:** These are early, pre-build notes — written before the official [[brand-guidelines]] landed and before the Figma homepage mockup shipped (2026-05-29). Treat the principles as still-valid intent, but check the pattern list below against what was actually built; the annotated items diverged. See [[design-upgrade-plan]] for the implemented homepage and [[tailwind-tokens]] for current tokens.

## Design Principles
- **Photography-forward**: Big hero images of river and canyon landscapes. Let the experience sell itself.
- **Clean and modern**: Generous whitespace, clear typography, uncluttered layouts
- **Mobile-first**: Responsive design starting from mobile, scaling up
- **Fast**: Contrast with the current slow WordPress site — every interaction should feel snappy
- **Trustworthy**: Authority and social proof prominent throughout (60+ years, reviews, certifications)

## Key UI Patterns
- Hero sections with full-bleed photography
- Trip cards with key info at a glance (river, duration, difficulty, price)
- Accordion UI for FAQs
- ~~Multi-step booking flow with clear progress indication~~
  - _Not built this way._ Booking is **inline on departure rows** (`DepartureList` / `BookingRow` / `PartySizeSelector`), gated behind the `BOOKING_NATIVE` flag, with checkout handed off to Arctic's hosted cart. There is no multi-step wizard. See [[build-phases]].
- Sticky header with prominent "Book Now" CTA
  - _Unverified._ The header carries a Book Now CTA; whether it is sticky has not been confirmed against the built `Header`.
- Authority badges (60 years, awards) in strategic locations
  - _Position unsettled._ This conflicts with the "sleek trust bar" recommendation in [[design-review]], and no `TrustBar` was built. What ships today is the 60-years hero seal and the NPS "Authorized Concessioner" badge in the footer; a general authority-badge pattern is still undecided.

## Reference
- The current bikeraft.com has a solid design foundation — the layout and information hierarchy are decent, the execution and performance need modernizing

## Related
- [[brand-guidelines]] — Colors, typography, logos
- [[overview]] — Project overview
