# Sanity Revalidation Webhook

Publishing in the Studio goes live on the site in **1–2 seconds** via a webhook
that hits `/api/revalidate`. Without it, pages still refresh on their own within
~60 seconds (ISR fallback) — the webhook just makes it feel instant.

## How it works

- `website/src/app/api/revalidate/route.ts` receives a POST from Sanity on
  every publish/unpublish/delete.
- The request is HMAC-signed with a shared secret (`SANITY_REVALIDATE_SECRET`);
  invalid signatures are rejected with 401.
- On a valid call it revalidates the whole route tree (`revalidatePath('/',
  'layout')`). Full purge is deliberate: the site is small, publishes are
  infrequent, and it can never miss a dependent page. Make it granular
  per-type later only if traffic warrants.

## One-time setup

1. **Secret** — generate a long random string (e.g. `openssl rand -hex 32`).
   Set it as `SANITY_REVALIDATE_SECRET`:
   - locally in `website/.env.local`
   - on Vercel: Project → Settings → Environment Variables (all environments)
2. **Webhook** — in [sanity.io/manage](https://www.sanity.io/manage) →
   project `jau3o5v4` → **API** → **Webhooks** → *Create webhook*:
   - **Name:** `Vercel revalidate`
   - **URL:** `https://<production-domain>/api/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** leave empty (all document types)
   - **Projection:** `{_type}`
   - **HTTP method:** POST
   - **Secret:** the same value as `SANITY_REVALIDATE_SECRET`
3. **Verify** — publish any small edit in the Studio; the change should appear
   on the live site within a couple of seconds. Webhook delivery logs (with
   response codes) are visible on the webhook's page in sanity.io/manage.

## Related

- [[2026-05-29]] — session where this was added
