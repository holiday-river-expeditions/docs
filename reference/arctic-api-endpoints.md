# Arctic Reservations API — Endpoint Reference

## Base
All endpoints under `/api/rest/`

## Authentication
OAuth 2.0 — exchange Client ID/Secret + API username/password for access token.

Public (unauthenticated) API available for trip search, availability, and booking initiation.

## Endpoints

### Trips & Scheduling
| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/rest/trip` | CRUD | Trip/tour management |
| `/api/rest/triptype` | CRUD | Trip type definitions |
| `/api/rest/trippricing` | CRUD | Trip pricing levels |
| `/api/rest/tripaddon` | CRUD | Trip add-ons |
| `/api/rest/schedule` | CRUD | Guide/trip schedules |

### Reservations & Guests
| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/rest/reservation` | CRUD | Reservation management |
| `/api/rest/person` | CRUD | Person/guest management |
| `/api/rest/person/<id>/emailaddress` | CRUD | Nested: guest email addresses |
| `/api/rest/person/<id>/phonenumber` | CRUD | Nested: guest phone numbers |
| `/api/rest/person/<id>/notes` | CRUD | Nested: guest notes |
| `/api/rest/inquiry` | CRUD | Inquiry management |

### Operations
| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/rest/guide` | CRUD | Guide management |
| `/api/rest/rental` | CRUD | Rental equipment |
| `/api/rest/rentalitem` | CRUD | Rental item details |
| `/api/rest/rentalprice` | CRUD | Rental pricing |
| `/api/rest/invoice` | CRUD | Invoice management |

### Other
| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/rest/businessgroup` | CRUD | Business group management |
| `/api/rest/evaluation` | CRUD | Evaluation/survey responses |
| `/api/rest/tripformresponse` | CRUD | Trip form responses |
| `/api/rest/task` | CRUD | Task management |
| `/api/rest/activity` | CRUD | Activity logging |
| `/api/rest/account` | CRUD | Account information |

## CRUD Operations
- **Create** (INSERT)
- **Read** (LOAD / BROWSE)
- **Update**
- **Delete**

## Query Support
- Filtering and querying objects supported (see wiki: Querying Objects)
- Nested resources supported (e.g., person → emailaddress)

## Response Format
JSON (inferred — not explicitly documented)

## Resources
- Wiki — Querying Objects: https://github.com/arcticres/arctic-api/wiki
- Wiki — Caching: https://github.com/arcticres/arctic-api/wiki
- Wiki — Error Handling: https://github.com/arcticres/arctic-api/wiki
- Wiki — Public Cart API: https://github.com/arcticres/arctic-api/wiki
