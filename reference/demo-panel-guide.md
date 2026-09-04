# Demo Panel Guide

A plain-English guide to the demo panel on the test site: what it is for, how to turn it on, and what each switch does. No coding involved.

**The short version:** the test site has a hidden set of switches for previewing ideas that are not approved yet, such as alternate logos, the Find Your Trip wizard, and the live river-flow reading. Each switch only affects the browser you turn it on in. Nobody else sees a thing, and nothing you toggle changes the site for anyone else.

## 1. Turning it on

1. Visit [website-phi-six-25.vercel.app/admin](https://website-phi-six-25.vercel.app/admin). The page arms your browser and sends you to the homepage.
2. A small red **Demo** pill appears in the bottom-right corner of every page. Click it to open the panel.
3. Tick or untick switches. They take effect immediately, no reload needed.
4. Click **Collapse** (or press Ctrl+Shift+D) to tuck the panel away. The pill stays.

To switch everything back off, open the panel and click **Reset all**. To remove the panel entirely, click **Disarm**. Visiting `/admin` again brings it back with your previous choices intact.

Your choices are stored in your own browser, so they follow you from page to page but not to another device or another browser. If the panel disappears, you are probably in a different browser or a private window: visit `/admin` again.

## 2. What each switch does

Switches come and go as ideas are tried and either adopted or dropped. Here is the list as of 2026-09-04.

### Logo treatment (pick one)

The logo in the header and footer. The default is the original horizontal lockup, per the 2026-08-20 decision. The others are alternatives for comparison:

- **Bold live-text lockup.** Stacked Alternate Gothic lockup from the August batch.
- **Single line.** HOLIDAY RIVER EXPEDITIONS as live text on one line.
- **Official secondary lockup.** The brand package's Secondary Horizontal: bigger mark, squarer.
- **Fresh hierarchy.** HOLIDAY dominant, RIVER EXPEDITIONS letterspaced beneath.
- **Legacy (old website).** The flag-and-waves lockup from bikeraft.com. The 2026 brand guidelines say not to mix old logos, so this is for comparison only.

### Layout and behaviour

- **Floating bars appear on scroll.** The floating section menu and the booking filter bar stay hidden until you scroll. Off, they are always visible.
- **Sticky header.** The header with the logo and navigation stays at the top while scrolling.
- **Live river flow (CFS).** A current flow reading with a seven-day sparkline on trip and section pages, from USGS gauges.
- **Animated anniversary badge.** The 60-year seal on the homepage hero stamps into place on load.

### Find Your Trip

The wizard itself is live for everyone as of 2026-09-04, so there is no longer a switch for it. One switch remains:

- **Trip finder logic panel.** Adds an explainer under the wizard and its results showing where the questions came from, what has been answered, how every trip scored and why, and which trips are missing facts. Meant for reviewing the wizard, not for visitors. See [[trip-finder]], section 6.

## 3. Things worth knowing

- **Nothing is deployed by flipping a switch.** Every variant is already built into the site and hidden. A switch just reveals it in your browser. Making one the default for everybody is a code change and a request for Darius.
- **The `/admin` page has no password.** That is on purpose: the switches only ever change the visitor's own browser, so there is nothing to protect. The page is kept out of search engines.
- **Switches only hide things.** A page or feature behind a switch is still on the site, just not linked to. Anyone who knows its address can open it. That is inherent to how per-browser switches work and is fine on the unlisted test site.
- **Demoing to someone else.** Have them visit `/admin` on their own device and tick the same switches. There is no way to turn a switch on for someone else remotely.

## Related

- [[trip-finder]] — the wizard and its logic panel
- [[sanity-editor-guide]] — editing the content behind the site
- [[architecture]] — the technical notes on how the flags work (section "Per-Browser Demo Flags")
