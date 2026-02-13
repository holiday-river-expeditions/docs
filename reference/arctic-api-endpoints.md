# Arctic Reservations API — Endpoint Reference

## Base
All endpoints under `/api/rest/`

## Authentication
OAuth 2.0 — exchange Client ID/Secret + API username/password for access token.

Public (unauthenticated) API available for trip search, availability, and booking initiation.

## Access Scopes

Endpoint access depends on the API client's access level. With **Administrator (System-Wide)**, all endpoints are full CRUD. With **Read-only with Financial Data**, most endpoints are read-only except persons, reservations, tasks, and inquiries which retain read/write.

The "Scope" column below reflects the Read-only with Financial Data level. Administrator level has full CRUD on all endpoints.

## Endpoints

### Trips & Scheduling
| Endpoint | Methods (Admin) | Scope (Read-only) | Description |
|----------|----------------|-------------------|-------------|
| `/api/rest/trip` | CRUD | Read | Trip/tour management |
| `/api/rest/triptype` | CRUD | Read | Trip type definitions |
| `/api/rest/trippricing` | CRUD | Read | Trip pricing levels |
| `/api/rest/tripaddon` | CRUD | Read | Trip add-ons |
| `/api/rest/schedule` | CRUD | Read | Guide/trip schedules |

### Reservations & Guests
| Endpoint | Methods (Admin) | Scope (Read-only) | Description |
|----------|----------------|-------------------|-------------|
| `/api/rest/reservation` | CRUD | Read/Write | Reservation management |
| `/api/rest/person` | CRUD | Read/Write | Person/guest management |
| `/api/rest/person/<id>/emailaddress` | CRUD | Read/Write | Nested: guest email addresses |
| `/api/rest/person/<id>/phonenumber` | CRUD | Read/Write | Nested: guest phone numbers |
| `/api/rest/person/<id>/notes` | CRUD | Read/Write | Nested: guest notes |
| `/api/rest/inquiry` | CRUD | Read/Write | Inquiry management |

### Operations
| Endpoint | Methods (Admin) | Scope (Read-only) | Description |
|----------|----------------|-------------------|-------------|
| `/api/rest/guide` | CRUD | Read | Guide management |
| `/api/rest/rental` | CRUD | Read | Rental equipment |
| `/api/rest/rentalitem` | CRUD | Read | Rental item details |
| `/api/rest/rentalprice` | CRUD | Read | Rental pricing |
| `/api/rest/invoice` | CRUD | Read | Invoice management |

### Other
| Endpoint | Methods (Admin) | Scope (Read-only) | Description |
|----------|----------------|-------------------|-------------|
| `/api/rest/businessgroup` | CRUD | Read | Business group management |
| `/api/rest/evaluation` | CRUD | Read | Evaluation/survey responses |
| `/api/rest/tripformresponse` | CRUD | Read | Trip form responses |
| `/api/rest/task` | CRUD | Read/Write | Task management |
| `/api/rest/activity` | CRUD | Read | Activity logging |
| `/api/rest/account` | CRUD | Read | Account information |

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
