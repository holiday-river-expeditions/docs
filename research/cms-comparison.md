# CMS Comparison

## Requirements
- Non-technical staff can edit content (blog posts, FAQs, trip details)
- Developer controls design via code templates
- Custom fields support (replacing WordPress custom fields)
- Real-time preview of content changes
- Works well with Next.js
- Mobile editing capability

## Options Considered

### Sanity (Selected)
- Visual editing studio with real-time preview
- Structured content with custom fields — direct replacement for WP custom fields
- Excellent Next.js integration (official support)
- `sanity-typegen` auto-generates TypeScript types from schemas
- Generous free tier (3 users, 500K API requests/mo)
- Content stored in Sanity's cloud, queried via GROQ
- Portable — not locked into any framework

### Payload CMS
- Self-hosted, full control over data
- Good admin UI and custom fields
- More complex setup — requires hosting the CMS server
- TypeScript-first
- Overkill for this project's content needs

### Strapi
- Open source, self-hosted
- REST and GraphQL APIs
- Admin panel is usable but less polished than Sanity
- Requires hosting infrastructure
- Plugin ecosystem less mature

### Contentful
- Established headless CMS
- Good UI but more enterprise-oriented pricing
- Less flexible content modeling than Sanity
- Free tier more restrictive

## Decision
**Sanity** — best balance of developer experience, editing experience for non-technical staff, Next.js integration, and cost. The visual editing studio and custom fields directly address the WordPress custom fields workflow the team is used to.

## Related
- [[tech-stack]] — Full technology decisions
- [[architecture]] — How Sanity fits into the data flow
