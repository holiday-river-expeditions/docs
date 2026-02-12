# Design Direction

## Approach
Partial brand refresh — keep the existing logo and brand identity, modernize the visual style for the web.

## Principles
- **Photography-forward**: Big hero images of river and canyon landscapes. Let the experience sell itself.
- **Clean and modern**: Generous whitespace, clear typography, uncluttered layouts
- **Mobile-first**: Responsive design starting from mobile, scaling up
- **Fast**: Contrast with the current slow WordPress site — every interaction should feel snappy
- **Trustworthy**: Authority and social proof prominent throughout (60+ years, reviews, certifications)

## Color Palette

| Swatch | Name          | Hex       | RGB                |
| ------ | ------------- | --------- | ------------------ |
| 🔴     | Brand Red     | `#A30D11` | rgb(163, 13, 17)   |
| ⬛      | Taupe Gray    | `#4E4D48` | rgb(78, 77, 72)    |
| ⬛      | Dark Charcoal | `#212121` | rgb(33, 33, 33)    |
| ⬜      | White         | `#FFFFFF` | rgb(255, 255, 255) |
| ⬜      | Off-White     | `#F4F4F4` | rgb(244, 244, 244) |
| 🔘     | Light Gray    | `#A6ADB4` | rgb(166, 173, 180) |
| 🔵     | Light Blue    | `#1863DC` | rgb(24, 99, 220)   |
| 🟢     | Teal          | `#5C9CA1` | rgb(92, 156, 161)  |

## Typography

### Font Families
- **Stardos Stencil** — Main headings (H1, H2)
- **Open Sans** — Body text, subheadings, UI elements
- **Arial** — Fallback

### Heading Styles

**H1, H2:**
- Font: `'Stardos Stencil', 'Open Sans', Arial, sans-serif`
- Size: 50px | Weight: 700
- Color: `#A30D11` (Brand Red)
- Line Height: 46px | Letter Spacing: -1.5px

**H3:**
- Font: `'Open Sans', Arial, sans-serif`
- Size: 26px | Weight: 800
- Color: `#FFFFFF` (White)
- Line Height: 28px

### Body Text

**Paragraph:**
- Font: `'Open Sans', Arial, sans-serif`
- Size: 18px | Weight: 700
- Color: `#4E4D48` (Taupe Gray)
- Line Height: 24px

**Default Body:**
- Font: `'Open Sans', Arial, sans-serif`
- Size: 16px | Weight: 400
- Color: `#4E4D48` (Taupe Gray)
- Line Height: 22.4px

**Links:**
- Font: `'Open Sans', Arial, sans-serif`
- Size: 12px | Weight: 600
- Color: `#4E4D48` (Taupe Gray)

## Logo & Brand Assets

Logo files stored in `design/assets/`:
- `HRE_LOGO_WHITE.svg` — Full logo (icon + wordmark), white on transparent
- `cropped-android-chrome-512x512-1-192x192.png` — App icon (river mark, red bg)
- `favicon-32x32.png` — Favicon
- `safari-pinned-tab.svg` — Safari pinned tab icon
- `touch.png` — Touch icon

**Deployment note:** Logos will be uploaded to Sanity CMS (Site Settings) and served via Sanity's CDN. Favicons/app icons go in the website `public/` folder.

## Key UI Patterns
- Hero sections with full-bleed photography
- Trip cards with key info at a glance (river, duration, difficulty, price)
- Accordion UI for FAQs
- Multi-step booking flow with clear progress indication
- Sticky header with prominent "Book Now" CTA
- Authority badges (60 years, awards) in strategic locations

## Reference
- The current bikeraft.com has a solid design foundation — the layout and information hierarchy are decent, the execution and performance need modernizing

## Related
- [[overview]] — Brand direction decisions
- [[open-decisions]] — Brand assets still needed
