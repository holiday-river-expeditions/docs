# Arctic Reservations Integration

## Overview
Holiday River currently uses Arctic Reservations for booking, embedded as iframes in the WordPress site. The iframes are slow, bad for SEO, and provide a poor user experience. We're replacing them with a native UI built against the Arctic REST API.

## API Details

- **Base URL**: `/api/rest/`
- **Auth**: OAuth 2.0 — two options:
  - User-based OAuth 2.0 (authorization code flow)
  - Installation API keys (server-to-server — Client ID/Secret + API username/password)
- **Public (unauthenticated) API**: Trip search, availability queries, booking initiation — used by their JavaScript widget
- **Authenticated API**: Full CRUD on all objects

## Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/rest/trip` | Trip/tour management |
| `/api/rest/triptype` | Trip type definitions |
| `/api/rest/trippricing` | Trip pricing levels |
| `/api/rest/tripaddon` | Trip add-ons |
| `/api/rest/reservation` | Reservation management |
| `/api/rest/person` | Guest management (nested: emailaddress, phonenumber, notes) |
| `/api/rest/schedule` | Guide/trip schedules |
| `/api/rest/guide` | Guide management |
| `/api/rest/rental` | Rental equipment |
| `/api/rest/invoice` | Invoice management |
| `/api/rest/evaluation` | Evaluation/survey responses |
| `/api/rest/inquiry` | Inquiry management |
| `/api/rest/account` | Account information |

## Developer Resources

- GitHub org: https://github.com/arcticres
- PHP/JS wrapper: https://github.com/arcticres/arctic-api
- API docs (early stage): https://github.com/arcticres/arctic-api-docs
- Wiki: https://github.com/arcticres/arctic-api/wiki
- Packagist: https://packagist.org/packages/arctic/arctic2api (PHP, v1.0.0)
- Support: https://support.arcticreservations.com/

## Integration Approach

1. **Server-side API proxy** — Next.js API routes proxy Arctic API calls, keeping credentials secure
2. **Trip sync** — Pull trip data from Arctic on build + ISR (Incremental Static Regeneration) for freshness
3. **Open seats** — Server component fetches real-time availability, displays dynamically
4. **Booking flow** — Custom multi-step UI calling Arctic API via our proxy:
   - Step 1: Select dates & party size
   - Step 2: Choose add-ons
   - Step 3: Guest information
   - Step 4: Payment & confirmation
5. **Trip detail pages** — Link Arctic trip ID to Sanity content so CMS content + live availability display together

## Action Items

- [ ] Contact Arctic Reservations support to obtain API credentials (Client ID, Client Secret, API username/password) #decision-needed
- [ ] Confirm whether Arctic handles payment processing or if we need Stripe on our side #decision-needed
- [ ] Test public API endpoints to understand response shapes for TypeScript types
- [ ] Build typed API client in `src/lib/arctic/`

## Notes
- Documentation is early stage ("Stay tuned!" per their repo)
- PHP wrapper exists but we'll use the REST API directly from TypeScript
- Public/unauthenticated API can be used for initial development before credentials arrive
- Wiki has pages on caching, error handling, querying, and the public cart API

## Related
- [[architecture]] — How Arctic fits into the site data flow
- [[tech-stack]] — Overall technology decisions
