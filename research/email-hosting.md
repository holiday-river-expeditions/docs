# Email Hosting After SiteGround

> Where Holiday's mailboxes live once the site moves to Vercel and SiteGround is cancelled. First pass 2026-09-17. **Deferred** until Darius finishes checking the SiteGround account. Not yet discussed with Holiday.

## Status

- Darius has a SiteGround login, so the full DNS zones and mail setup can be read directly rather than guessed from public DNS.
- Working assumption: Holiday is on free Gmail, not Google Workspace. Their Google Meet calls have a hard time limit, which free accounts get and paid ones do not. Confirm with Lauren.
- Nothing here has been raised with Holiday. Pick it up once the SiteGround check is done and the questions below are narrowed.

## The short version

Vercel can hold the DNS for holidayriver.com, including the email records, but it does not host mailboxes. So the question is who hosts the mailboxes once SiteGround is gone.

## What public DNS shows (checked 2026-09-17)

- All four domains (holidayriver.com, holidayriverexpeditions.com, bikeraft.com, holidayexpeditions.com) use SiteGround nameservers and SiteGround's bundled mail. The domain is registered through SiteGround.
- None has Google mail records. The Gmail in use today is fed by SiteGround, either by forwarding or by fetch. Cancel the SiteGround plan and that path goes with it, along with any mail stored there.
- holidayexpeditions.com sends through Mailgun, and bikeraft.com through Amazon SES. Something at Holiday uses those, probably Arctic or a WordPress plugin. We need to know what before those domains move.

## Options

Two ways to keep Gmail and get off SiteGround:

1. **Google Workspace on holidayriver.com.** Real mailboxes at our domain, same Gmail interface, info@ plus one per person. Vercel has a one-click preset for the records. Old mail can be pulled in with Google's migration tool. About $7 per user per month on an annual plan. Current recommendation.
2. **Keep the free Gmail accounts and add a forwarder.** Forward Email or ImprovMX receives mail for info@holidayriver.com and passes it to the existing inbox. Receiving is free. Replying as info@ costs about $3 a month. This is what SiteGround does for us now, from a vendor that survives cancelling the hosting. Fine as a stopgap.

## Cutover sequence

Either way the order is the same: set up the mail provider, copy each domain's DNS into Vercel and verify it, flip the nameservers, launch the site, then cancel SiteGround. Email is only at risk at the nameserver flip, and only if a record was missed. See [[redirects]] for the site side of the same cutover.

## Site outgoing mail

For the site's own outgoing mail (contact form, newsletter confirmations) use Resend through the Vercel Marketplace on its own subdomain. That is separate from the mailbox choice and covers half of the newsletter provider decision in [[open-decisions]].

## Next steps (Darius)

- Log in to SiteGround and read the full DNS zone for each domain, the mailboxes and forwarders that exist, and where mail is stored.
- Find what sends through Mailgun and Amazon SES on the old domains.
- Confirm with Lauren whether the Gmail accounts are personal or a Workspace on another domain.

## Questions for Holiday, once the above is done

- Ready to go to Google Workspace, and who are the users? That is the one real decision. #decision-needed

## Related

- [[domain-name]], the domain decision
- [[environments]], hosting and DNS plan
- [[redirects]], domain cutover order
