**Subject:** New Website — Status Update & A Few Things I Need From You

Hi everyone,

Thanks for meeting last week and for being open to building a new website! I am super excited about the opportunity to do something for Holiday. All of you have done a lot for me and made my life much more enjoyable with your trips. 

Anyway, quick update on where the new website stands, plus a few things I'll need from you. I've set up a documentation site where you can read the full details on everything mentioned here:

**[Project docs](https://docs-drab-eight-97.vercel.app/)**

---

### Where We Are

The foundation for the new site is built and deployed. Here's what's in place:

- The site framework is up and running
- Every change is tested automatically and then deployed
- We have a **beta site** for testing and a **production site**
- Project is organized with 6 build phases and 42 issues (3 done)

**Links:**

|                                                                                       |                                  |
| ------------------------------------------------------------------------------------- | -------------------------------- |
| [Beta site (preview)](https://website-env-beta-holiday-river-expeditions.vercel.app)  | Work-in-progress preview         |
| [Production site](https://website-holiday-river-expeditions.vercel.app)               | Will become the live public site |
| [Project docs](https://docs-drab-eight-97.vercel.app/)                                | Full project documentation       |
| [Project board & tasks](https://github.com/orgs/holiday-river-expeditions/projects/1) | Tracked across 6 build phases    |

> These URLs will change to `holidayriverexpeditions.com` (or whatever domain you choose) and `beta.holidayriverexpeditions.com` once we connect the domain.

Next up: setting up the content management system (where you'll edit trip info, blog posts, FAQs, etc.) and building out the main pages.

---

### A Few Decisions & Topics

**Domain name**
- You already own **holidayriverexpeditions.com** and it redirects to bikeraft.com. 
- This feels like the best brand match and is used across other sites you're listed on like TripAdvisor, Google, Facebook, etc.
- I researched other options worth considering 
- See [domain name research](https://docs-drab-eight-97.vercel.app/research/domain-name/).
- I need **login access to your domain provider** so I can update DNS settings when we're ready to go live.

**Content management (CMS)**
- **Sanity** seems to suit your needs best.
- It has a clean, modern editing interface with real-time preview.
- It was built for the NextJs framework we're using for coding .
- Free tier offers 3 users and 500K requests/month. 
- I analyzed some other options and landed on this one
- See [CMS comparison](https://docs-drab-eight-97.vercel.app/research/cms-comparison/)

**Arctic Reservations integration**
- One of the biggest improvements with the new site is replacing the iframe booking with a native experience that's faster and works well on mobile. 
- I need API credentials from Arctic. 
- Lauren, I know you mentioned making an intro to their support team — whenever that's ready, I'll need some things from them: a Client ID, Client Secret, API Username, and API Password. 
- Full details on the [integration plan](https://docs-drab-eight-97.vercel.app/project/arctic-api/).

**Payment processing**
- Related question: does Arctic handle payment collection end-to-end when someone books a trip, or does Holiday use a separate payment processor? 
- This is something we can also clarify with Arctic during that intro.

**Design**
- Riley did an amazing job with the first redesign. He and I will be tag-teaming the design as we build — he'll bring the creative direction and I'll make sure it translates cleanly into the new platform. We'll want to set up a meeting to walk through design ideas and make sure everyone's on the same page before we get too far into the build. For now I can build stuff with the same branding assets used on the current site.

**Hosting costs** — The site is hosted on **Vercel** ($20/month on the Pro plan). We're on a free trial right now, so someone on the Holiday side will need to add a payment method before it expires.

---

### What I Need From You

1. **Accept your GitHub and Vercel invites** — you should have emails from both. This gives you access to the codebase and hosting dashboard.
2. **Review the domain options** and confirm we're good with `holidayriverexpeditions.com` — [domain research](https://docs-drab-eight-97.vercel.app/research/domain-name/)
3. **Share domain provider access** so I can manage DNS when it's time to connect the domain
4. **Intro to Arctic support** (Lauren) — so I can request API credentials and confirm how payment processing works
5. **Add a payment method on Vercel** — $20/mo Pro plan, currently on free trial
6. **Schedule a design meeting** — Riley and I want to walk through design direction with the team before we start building out the pages

Happy to jump on a call if any of this would be easier to walk through together. Let me know if you have questions!

Darius
