import type { BlogLibraryPost } from "./blog-library-types";

export const BLOG_POSTS_H: BlogLibraryPost[] = [
  {
    title: "How to Choose a Shopify Development Agency",
    slug: "choosing-shopify-development-agency",
    excerpt:
      "What to ask before hiring, how to read a proposal, which red flags matter, and how to structure the engagement so you keep control of your own store.",
    coverImage: "/blog-covers/choosing-shopify-development-agency.webp",
    publishedAt: "2026-05-26T05:30:00.000Z",
    art: {
      eyebrow: "Agency",
      coverHeadline: "Hire for the outcome, not the deck",
      motif: "code",
      figure: {
        kind: "compare",
        title: "Signals worth reading",
        items: [
          "Live stores you can visit",
          "Named scope and acceptance criteria",
          "You own the code and accounts",
          "Handover and training included",
        ],
        items2: [
          "Screenshots instead of live URLs",
          "Fixed price, undefined scope",
          "Agency-owned repositories",
          "No documentation at handover",
        ],
        caption:
          "The contract details decide whether you can leave. Read those first.",
      },
    },
    body: `Choosing a development partner is mostly a risk decision. The upside between a good agency and an excellent one is real but modest; the downside between a good one and a bad one is a store you cannot maintain, a theme nobody can edit, and a year of lost time.

This guide covers how to reduce that risk before you sign.

## Step 1: Write down what you actually need

Most bad engagements start with a vague brief. Before contacting anyone, write:

- The business outcome you want, in one sentence
- The specific problems with the current store, with examples
- What must not change - integrations, workflows, existing URLs
- Your realistic budget band and timeline
- Who on your side will make decisions and be available

An agency cannot quote sensibly against "we want a better website". It can quote against "our mobile conversion is weak, our product pages do not answer sizing questions, and our theme takes four seconds to load on a phone".

## Step 2: Judge the portfolio properly

Screenshots prove nothing. Ask for live URLs and then:

- Open each on a mid-range phone and time it
- Complete a purchase journey to the payment step
- Check whether the store is still live and still using their work
- Look for stores in a comparable category and scale
- Ask which parts of that store they actually built

A portfolio of beautiful, slow stores tells you where the agency's priorities sit.

![Comparison panel contrasting good and poor signals when choosing an agency](/blog-figures/choosing-shopify-development-agency.webp)

## Step 3: Ask the questions that reveal how they work

- How do you handle work outside the agreed scope?
- What does your handover include - code, documentation, training, credentials?
- Who owns the repository and the accounts?
- What is your approach to theme updates and app dependencies?
- How do you test on real devices?
- What happens if performance regresses after launch?
- Who is actually doing the work, and will that change mid-project?
- How do you measure whether the project succeeded?

The last one separates agencies who ship deliverables from agencies who care about outcomes.

## Step 4: Read the proposal for scope, not for price

A proposal is a risk document. Look for:

- **Deliverables named specifically**, not "conversion optimisation"
- **Acceptance criteria** - how you will both agree it is done
- **Assumptions stated**, so you know what would change the price
- **A change process** with rates
- **Milestones with payments** tied to delivered work
- **Post-launch support terms** and what is included

A fixed price against an undefined scope is not protection. It is a guarantee of an argument later.

## Step 5: Protect your ownership

This is where engagements go wrong long after they end:

- **You own the code.** Get it in writing, and get access to the repository from day one.
- **You own the accounts.** Store admin, domain, analytics, payment gateway, and any third-party services must be in your name, with the agency added as a user.
- **You get the documentation.** How things work, what was customised, what depends on what.
- **You get a handover session**, recorded, with your team present.

Never let an agency register your domain or hold your production credentials as the sole owner. It is the most common cause of expensive, avoidable disputes.

## Step 6: Watch for the real red flags

- Guaranteed rankings or guaranteed conversion percentages
- A price quoted before any discussion of scope
- No questions asked about your business
- Pressure to sign this week
- Portfolio stores that are no longer live
- Reluctance to name the people doing the work
- Unwillingness to give you repository access
- Custom code where a standard feature exists

## Step 7: Start small

A small paid discovery or a single well-defined piece of work tells you more than any reference call:

- How they communicate under a deadline
- Whether estimates hold
- Code quality, if you have someone who can review it
- Whether they push back sensibly on bad ideas

If the first small project goes well, expand. If it does not, you have lost weeks rather than a quarter.

## Step 8: Define what happens after launch

Most of a store's life is after launch. Agree in advance:

- Who fixes bugs found in the first thirty days, and at what cost
- Response times for a broken checkout versus a cosmetic issue
- Whether ongoing support is retained or ad hoc
- How theme and app updates are handled
- What documentation gets updated when changes are made

Our [Shopify development service](/services/shopify-development) covers the full build-and-support cycle, and our post on [Shopify conversion without a redesign](/blog/shopify-conversion-no-redesign) covers what you can improve before commissioning one.

## Frequently asked questions

### How much should a Shopify project cost?

It depends entirely on scope, from a small theme customisation to a full custom build with integrations. Judge value by defined deliverables and acceptance criteria rather than by the headline number; an undefined fixed price usually costs more in the end.

### Should I hire a freelancer or an agency?

A freelancer can be excellent value for well-defined work. An agency is worth the premium when you need several skills, continuity if someone is unavailable, and accountability across a longer engagement.

### Who should own the Shopify store and domain?

You, always. Register the domain and the store in your business name and add the agency as a user. Never accept an arrangement where your production accounts are owned by the agency.

### What should be included in a handover?

Repository access, documentation of what was customised and why, admin credentials in your name, a recorded walkthrough with your team, and a list of any third-party dependencies with their renewal dates.

## Next steps

Write a one-page brief describing the outcome and the constraints, ask three agencies for live URLs rather than screenshots, and start with one small, well-defined piece of work.

If you want to talk through scope first, our [Shopify development service](/services/shopify-development) starts with a discovery conversation rather than a quote.`,
  },
  {
    title: "Custom Software or SaaS: How to Decide",
    slug: "custom-software-vs-saas-for-small-business",
    excerpt:
      "When an off-the-shelf tool is genuinely enough, when a custom build pays for itself, and how to avoid the expensive middle ground of heavily customised software.",
    coverImage: "/blog-covers/custom-software-vs-saas-for-small-business.webp",
    publishedAt: "2026-06-09T05:30:00.000Z",
    art: {
      eyebrow: "Software",
      coverHeadline: "Buy the ordinary, build the differentiating",
      motif: "code",
      figure: {
        kind: "funnel",
        title: "The decision sequence",
        items: [
          "Can a standard tool do this",
          "Can we change our process instead",
          "Is this how we actually compete",
          "Can we fund it for five years",
        ],
        caption:
          "Build only what makes you different. Buy everything else.",
      },
    },
    body: `The build-or-buy decision is usually made emotionally: a team is frustrated with a tool and concludes that custom software would fit perfectly. Two years later they own a system that does what they needed in 2026, and nobody is left who understands it.

The decision deserves a sequence, not an instinct.

## The rule of thumb

**Buy the ordinary. Build what makes you different.**

Accounting, payroll, email, helpdesk, and basic CRM are solved problems. Someone else has spent a decade and thousands of customers refining them. Your version will be worse and will cost more.

The thing you do differently from every competitor - the workflow that is your actual advantage - is where a custom build can pay for itself.

## Question 1: Can a standard tool do this?

Before scoping anything, evaluate properly:

- List your requirements and mark each as must-have or nice-to-have
- Trial two or three tools with real data and real users
- Check integrations against what you already run
- Check the export path - can you leave?
- Count how many must-haves are genuinely unmet

If a standard tool meets your must-haves and misses only conveniences, buy it.

![Funnel diagram showing the sequence for deciding between buying and building software](/blog-figures/custom-software-vs-saas-for-small-business.webp)

## Question 2: Can you change the process instead?

Many "requirements" are habits. Before funding a build, ask whether the process itself is the problem:

- Is this step necessary, or historical?
- Would a standard workflow be acceptable if we retrained?
- Are we recreating a spreadsheet's quirks in software?
- Is one person's preference driving this?

Adopting a standard process is almost always cheaper than encoding a bespoke one. Reserve custom work for processes that genuinely create value.

## Question 3: Is this how you actually compete?

Build when:

- The workflow is your differentiator, not an overhead
- Off-the-shelf options force a process that costs you money or customers
- Integration between systems is the bottleneck and no connector exists
- Data volume or specificity exceeds what standard tools handle
- Licence costs at your scale exceed the build and run cost
- You need control over data residency or handling that vendors cannot provide

## Question 4: Can you fund it for five years?

The build cost is the smallest part. Budget honestly for:

- Hosting, monitoring, and backups
- Security patching and dependency updates
- Bug fixes and small changes
- Feature work as the business changes
- Documentation and onboarding for new staff
- The risk of the original developer becoming unavailable

A rough planning assumption is that ongoing cost over several years exceeds the initial build. If you cannot fund that, do not start.

## Avoid the expensive middle

The worst outcome is a standard product customised so heavily that:

- Upgrades break your customisations
- You are locked to one implementation partner
- You pay licence fees and maintenance costs
- Nobody can say where the product ends and your code begins

If you find yourself planning extensive customisation, step back. Either accept the standard behaviour or build the specific piece separately and integrate it.

## The hybrid that usually works

Most small businesses land well here:

- Standard tools for accounting, email, helpdesk, and storage
- A standard commerce platform, extended where necessary
- One custom piece for the workflow that is genuinely yours
- Clean integration between them, with your data exportable throughout

That gives you leverage from other people's product investment and control where it matters. Our [custom software development](/services/software-development) and [custom CRM development](/services/custom-crm-development) services are usually scoped exactly this way.

## If you build, build defensively

- Start with the smallest version that delivers value
- Own the code and the repository from day one
- Insist on documentation as a deliverable, not an afterthought
- Use boring, well-supported technology
- Plan the data export before the first line of code
- Have more than one person who understands it

## Common mistakes to avoid

- **Building because a tool annoyed someone.** Frustration is not a business case.
- **Ignoring run costs.** The build is the cheap part.
- **Customising a product until it is unrecognisable.** You pay twice and can upgrade neither.
- **One developer with no documentation.** A single point of failure with a notice period.
- **Building your differentiator last.** Build that first; buy the rest immediately.

## Frequently asked questions

### When is custom software worth it for a small business?

When the workflow is genuinely how you compete, when standard tools force a process that costs you money, or when integration is the bottleneck and no connector exists. Not because an existing tool is mildly irritating.

### How much does custom software cost to maintain?

Plan for meaningful ongoing cost - hosting, security updates, dependency upgrades, bug fixes, and changes as the business evolves. Over several years this typically exceeds the original build cost.

### Is it cheaper to customise an existing product?

Sometimes, but heavy customisation is the most expensive option long term: you pay licence fees, maintain custom code, and often cannot upgrade. Prefer light configuration, or a separate integrated component.

### What should I build first if I do build?

The smallest piece that delivers real value and that is genuinely specific to your business. Buy everything ordinary around it, and make sure your data can be exported from day one.

## Next steps

List your systems and mark each as ordinary or differentiating. Buy the ordinary ones this quarter, and scope a small first version of the one that is genuinely yours.

If you want that scoped honestly, our [software development service](/services/software-development) starts by trying to talk you out of building what you can buy.`,
  },
  {
    title: "Auditing Shopify App Bloat",
    slug: "shopify-app-bloat-audit",
    excerpt:
      "Every app adds scripts, cost, and risk. A structured audit to find what each one contributes, remove the leftovers, and clean up the code they leave behind.",
    coverImage: "/blog-covers/shopify-app-bloat-audit.webp",
    publishedAt: "2026-06-23T05:30:00.000Z",
    art: {
      eyebrow: "Ecommerce",
      coverHeadline: "Every app is a subscription and a script",
      motif: "speed",
      figure: {
        kind: "flow",
        title: "The audit loop",
        items: [
          "List apps, cost, and owner",
          "Measure each one's page cost",
          "Remove and clean leftovers",
          "Re-measure and record",
        ],
        caption:
          "Uninstalling an app rarely removes its code. Check the theme afterwards.",
      },
    },
    body: `App stores make it trivially easy to add functionality and surprisingly hard to remove it. A store two years old typically runs a dozen or more apps, several of which nobody uses, all of which charge monthly, and many of which have left code behind in the theme.

This is a structured audit you can run in an afternoon.

## Step 1: List everything, with cost and owner

Build a simple table:

- App name
- Monthly cost
- What business job it does
- Who asked for it and who uses it now
- When it was installed
- Where it appears on the storefront

The exercise itself usually finds two or three apps nobody can justify. If nobody can name the person who uses an app, that is your answer.

## Step 2: Measure what each one costs the page

Cost is not only the subscription. Measure the storefront impact:

- Open a product page with developer tools and record total requests, transferred bytes, and main-thread time
- Note which third-party domains are contacted
- Check whether scripts load on every page or only where needed
- Look for apps loading on checkout, where weight is most expensive

Then, where you can, disable one app at a time and re-measure. Our guide on [measuring widget performance](/blog/measure-widget-performance) covers the method, and [page speed optimization](/blog/page-speed-optimization-guide) covers what to do with the findings.

![Flow diagram showing the four-step app audit loop](/blog-figures/shopify-app-bloat-audit.webp)

## Step 3: Categorise ruthlessly

Sort each app into one of four buckets:

- **Essential** - directly enables revenue or fulfilment. Keep.
- **Valuable** - measurably improves a metric you track. Keep, but review the cost.
- **Redundant** - duplicates something another app or the platform already does. Remove.
- **Forgotten** - installed for a campaign, a trial, or a person who has left. Remove.

Redundancy is common: two review apps, three popup tools, an analytics app duplicating what your main analytics already reports.

## Step 4: Remove properly

Uninstalling is not the whole job. Apps commonly leave behind:

- Script tags injected into the theme
- Liquid snippets and sections
- Metafields and metaobjects
- Webhooks
- CSS and asset files
- Blocks in the theme editor

After uninstalling:

1. Duplicate the live theme as a backup before editing anything.
2. Search the theme for the app's name and domain.
3. Remove leftover snippets and references.
4. Check for broken includes that would error on a page.
5. Preview thoroughly before publishing, including checkout.

Leftover code is the most common cause of "we removed the app and the site got slower" - the requests are still firing, but now they fail.

## Step 5: Re-measure and record

- Re-run the page measurements
- Record the before and after numbers
- Note the monthly saving
- Write down what was removed and when, so nobody reinstalls it in six months

Keep this document. It becomes the reference the next time someone proposes an app.

## Step 6: Prevent the next accumulation

Set a simple policy:

- Every app needs a named owner and a stated purpose
- Trial apps get a calendar reminder before the trial ends
- Uninstall as soon as an app is no longer used, not "later"
- Prefer one app that does three jobs over three that each do one
- Quarterly review of the list

## What to consider replacing

Common candidates for consolidation:

- Several separate widgets - reviews, FAQ, countdown, popups - can often come from one lightweight source, published from a single workspace with one script
- Two analytics tools reporting the same thing
- A popup app and an email tool with a built-in popup
- An FAQ app where the platform's own page templates would do

Our [widget catalogue](/tools) covers the common storefront elements from one embed, which is usually lighter than four separate apps each loading its own framework.

## Common mistakes to avoid

- **Uninstalling without cleaning the theme.** The requests keep firing.
- **Editing the live theme directly.** Always duplicate first.
- **Judging apps by subscription cost only.** The page cost is often larger.
- **Removing several apps at once.** You cannot attribute a regression.
- **No record of what was removed.** It gets reinstalled.

## Frequently asked questions

### How many apps is too many for a Shopify store?

There is no fixed number. The test is whether each app has a named owner, a stated purpose, and a measurable contribution. Ten well-chosen apps can be lighter than four badly built ones.

### Does uninstalling an app remove its code?

Often not completely. Script tags, snippets, metafields, and theme blocks are commonly left behind. Duplicate your theme, search for the app's name and domain, and remove leftovers manually.

### How do I measure an app's performance impact?

Record requests, transferred bytes, and main-thread time on a key page, then disable the app and measure again. Do this one app at a time so you can attribute the difference.

### Should I replace multiple widget apps with one tool?

Usually yes, if one tool covers the jobs properly. Fewer scripts and fewer third-party domains means fewer connections and less main-thread work, and one subscription instead of several.

## Next steps

List every app with its cost and owner, remove anything nobody can justify, and clean the theme afterwards. Then put a quarterly review in the calendar so the list stays short.

For a deeper cleanup, our [Shopify development service](/services/shopify-development) includes theme and app audits.`,
  },
  {
    title: "The Website Launch Checklist",
    slug: "website-launch-checklist",
    excerpt:
      "Everything to verify before and after going live: redirects, indexing, analytics, forms, performance, legal pages, and the checks people always forget.",
    coverImage: "/blog-covers/website-launch-checklist.webp",
    publishedAt: "2026-07-07T05:30:00.000Z",
    art: {
      eyebrow: "Operations",
      coverHeadline: "The checks that prevent a bad first week",
      motif: "grid",
      figure: {
        kind: "checklist",
        title: "Before you flip the switch",
        items: [
          "Remove staging noindex",
          "Map every old URL to a new one",
          "Test every form end to end",
          "Verify analytics fires once",
          "Check on a real mid-range phone",
        ],
        caption:
          "Two of these five are forgotten on most launches. Usually the first two.",
      },
    },
    body: `Most launch failures are not dramatic. The site goes live, looks fine, and quietly loses half its search traffic because a staging directive came with it, or because nobody mapped the old URLs.

This checklist covers what to verify before and after going live.

## Two weeks before

**Content and legal**

- All placeholder text removed - search the site for "lorem" and "TODO"
- Contact details correct everywhere, including the footer
- Privacy policy, terms, and refund or returns policy published and accurate
- Cookie or consent notice in place if required - see our [privacy compliance guide](/blog/website-privacy-compliance-india)
- Copyright year and company registration details correct

**Redirect map**

- Export every URL from the old site
- Map each to its closest equivalent on the new site
- Redirect permanently, one hop, never through a chain
- Never redirect everything to the homepage - it is treated as a soft error and discards the page's history
- Include old sitemaps, feeds, and any linked PDFs

This is the single most valuable pre-launch task for an existing site.

![Checklist panel listing the essential pre-launch verifications](/blog-figures/website-launch-checklist.webp)

## One week before

**Technical**

- Remove any noindex directive from the staging environment
- Check robots.txt does not disallow anything important
- HTTPS working, with the certificate valid and auto-renewing
- One canonical host, with the alternative redirecting
- Self-referencing canonical tags present
- 404 page returns a real 404 status and offers a route back
- Sitemap generated, accurate, and referenced in robots.txt

**Performance**

- Test key pages on a mid-range phone with a throttled connection
- Images compressed, sized, and with dimensions set
- No render-blocking scripts before content
- Fonts limited and loading without hiding text
- Third-party scripts inventoried and justified - see [page speed](/blog/page-speed-optimization-guide)

**Functionality**

- Every form submitted end to end, with the notification received and the record created
- Payment tested with a real transaction, including a deliberate failure
- Search returns sensible results, including for misspellings
- All widgets render and behave correctly - see the [embed snippet guide](/help/installing-embed-snippet)
- Every external link opens correctly

## Launch day

- Take a full backup of the old site, including the database
- Lower DNS time-to-live in advance so changes propagate quickly
- Deploy during your quietest hours
- Verify the site loads from a different network and device
- Check pages render for search engines using a URL inspection tool
- Confirm analytics is recording, and firing once rather than twice
- Submit the sitemap in Search Console
- Spot-check twenty of your most important redirects manually

## The first 48 hours

- Watch server error logs for 500s
- Watch 404 logs and add redirects for anything with real traffic
- Check Search Console for coverage errors and manual actions
- Confirm form submissions are arriving, not silently failing
- Compare traffic and conversion with the same period before launch
- Test checkout again from a fresh device

## The first two weeks

- Review indexing status; expect fluctuation, but investigate large drops
- Check Core Web Vitals field data as it accumulates
- Review the top landing pages against expectations
- Collect the issues everyone noticed but did not report
- Fix in order of revenue impact, not annoyance

## The checks people forget

- **The email that forms send.** Test that it arrives and is not filtered as spam.
- **Favicon and social share images.** Share a link in a chat app and see what appears.
- **The 404 page itself.** It is often unstyled.
- **Print styles**, if customers print invoices or menus.
- **The site with an ad blocker enabled.**
- **Old email campaign links** pointing at pages that no longer exist.
- **QR codes on printed material** pointing at old URLs.

## Common mistakes to avoid

- **A staging noindex left in production.** The most damaging launch error there is.
- **Redirecting everything to the homepage.** It throws away the value of every old page.
- **Launching on a Friday.** Nobody is available when something breaks.
- **No backup of the old site.** Rollback becomes impossible.
- **Testing only on the machine that built it.** Test on a real phone on mobile data.

## Frequently asked questions

### What is the most important pre-launch check?

Removing any staging noindex directive and verifying your redirect map. Those two account for the majority of serious post-launch traffic losses.

### Will my traffic drop after a redesign?

Some fluctuation is normal for a few weeks while search engines recrawl. A large sustained drop usually means missing redirects, a blocking directive, or content that was removed rather than migrated.

### How long should old URLs redirect?

Indefinitely where practical, and for at least a year at minimum. Links and bookmarks persist far longer than most teams expect, and removing redirects later reintroduces the loss.

### Should I launch a redesign all at once?

For a small site, yes, with a rehearsed plan. For a large or complex site, a phased rollout by section reduces risk and makes problems easier to attribute.

## Next steps

Build your redirect map first - it is the task most often skipped and most expensive to skip. Then rehearse the full purchase or enquiry journey on a real phone before you go live.

[Start free](/signup) and check every widget renders on the new site before launch day.`,
  },
  {
    title: "A Monthly Website Maintenance Checklist",
    slug: "website-maintenance-checklist-monthly",
    excerpt:
      "Websites decay quietly. A monthly routine that catches broken links, stale content, security updates, performance regressions, and dead forms before customers do.",
    coverImage: "/blog-covers/website-maintenance-checklist-monthly.webp",
    publishedAt: "2026-07-14T05:30:00.000Z",
    art: {
      eyebrow: "Operations",
      coverHeadline: "An hour a month beats a crisis a year",
      motif: "grid",
      figure: {
        kind: "stack",
        title: "The monthly routine",
        items: [
          "Security and backups verified",
          "Forms and payments tested",
          "Broken links and 404s fixed",
          "Content and hours updated",
          "Performance re-measured",
        ],
        caption:
          "Do these in order. The first two are the ones that cost real money.",
      },
    },
    body: `Websites do not fail suddenly. They decay: a form stops delivering, a plugin goes unpatched, a phone number changes, an expired banner sits for months, and the page that used to load in two seconds now takes six.

This is an hour a month, in priority order.

## 1. Security and backups

Do this first, every time:

- Apply platform, plugin, theme, and dependency updates - test on staging where you have one
- Check for known vulnerabilities in what you run
- Confirm backups ran, and **restore one to verify it works**. An untested backup is a hope, not a backup.
- Review admin users and remove anyone who has left
- Confirm two-factor authentication is enabled for every admin
- Check SSL certificate expiry and auto-renewal
- Review any API keys and tokens still in use

The restore test is the step everyone skips and the one that matters most.

## 2. The things that take money

Test the revenue path yourself, on a real phone:

- Submit every form and confirm the notification and the record both arrive
- Place a real low-value order end to end
- Deliberately fail a payment and check the retry path
- Verify the confirmation email or message arrives and is not filtered as spam
- Check your [chat](/tools/whatsapp) and callback routes are answered

A silently broken contact form can cost weeks of enquiries before anyone notices the quiet.

![Priority stack showing the monthly website maintenance routine](/blog-figures/website-maintenance-checklist-monthly.webp)

## 3. Links and errors

- Run a link checker across the site and fix broken internal links
- Review 404 logs and redirect anything with real traffic
- Check for redirect chains and collapse them
- Review server error logs for recurring 500s
- Check that external links still go where you think they do

## 4. Content accuracy

The content most likely to be wrong is the content nobody owns:

- Prices, offers, and shipping thresholds
- Opening hours, including upcoming holidays - see our [business hours guide](/blog/how-to-show-business-hours-on-website)
- Team page, after joiners and leavers
- Expired banners, countdowns, and promotional bars
- Contact details in the footer and on the contact page
- Stock status on featured products
- Copyright year

Anything with a date on it deserves a monthly glance.

## 5. Performance

- Re-measure key pages on a mid-range phone
- Compare against last month; investigate any regression
- Check field data in Search Console
- Review any new third-party script added this month, and whether it is justified
- Check total page weight against your budget

Performance regresses through accumulation, which is why monthly beats annually. See [page speed optimization](/blog/page-speed-optimization-guide).

## 6. Search visibility

- Check Search Console for coverage errors and manual actions
- Look for pages that dropped out of the index
- Review queries with impressions but few clicks - usually a title problem
- Confirm the sitemap is current
- Check that recent pages have been indexed

## 7. Analytics sanity check

- Confirm tracking is firing, and firing once
- Check that conversions are recording
- Compare traffic against the same month last year, not last month
- Investigate any unexplained spike or collapse - it is often a tracking fault, not a business change

## 8. Third-party review

- List all widgets, embeds, and scripts currently loading
- Remove anything with no owner or purpose
- Check subscription renewals and cancel what is unused
- Verify vendor status pages for anything you depend on

## Quarterly, not monthly

Some tasks do not need this cadence:

- Full accessibility audit - see our [accessibility checklist](/blog/website-accessibility-checklist-wcag)
- Content refresh of the top ten pages
- Competitor comparison
- Full technical SEO audit - see the [technical SEO checklist](/blog/technical-seo-checklist-small-business)
- Review of legal pages against current obligations
- Backup and disaster recovery drill

## Make it stick

- Put it in the calendar, same day each month
- Give it one named owner
- Keep a simple log of what was checked and what was found
- Note anything deferred, with a date
- Review the log quarterly for recurring problems

The log matters more than the checklist. Recurring issues point at a structural problem worth fixing once.

## Common mistakes to avoid

- **Never testing a restore.** Backups fail silently.
- **Updating without a staging check** on a business-critical site.
- **Assuming forms work** because they worked at launch.
- **Deferring updates indefinitely.** Security debt compounds.
- **No owner.** Maintenance that belongs to everyone belongs to nobody.

## Frequently asked questions

### How often should a small business website be maintained?

A monthly routine covering security, backups, forms, links, content accuracy, and performance, plus a deeper quarterly review of accessibility, content, and technical SEO.

### What is the most commonly missed maintenance task?

Testing that a backup actually restores, and testing that contact forms still deliver. Both fail silently and both are expensive when discovered late.

### Do I need to update plugins immediately?

Security updates, yes, as soon as practical. Feature updates can wait for a scheduled window with a staging check. Deferring security patches is the most common route to a compromised site.

### How do I know if my website is slowing down?

Measure the same key pages on the same device profile every month and record the numbers. Field data in Search Console shows what real visitors experienced over time.

## Next steps

Put a recurring hour in the calendar, start with a backup restore test and a form test, and keep a log of what you find. Two months of logs will show you what keeps breaking.

[Start free](/signup) and manage your site widgets from one place so the monthly review is quicker.`,
  },
  {
    title: "Website Privacy Compliance: A Practical Guide",
    slug: "website-privacy-compliance-india",
    excerpt:
      "What a small website actually has to do about personal data: what you collect, consent, notices, retention, and vendor obligations - explained without legalese.",
    coverImage: "/blog-covers/website-privacy-compliance-india.webp",
    publishedAt: "2026-07-21T05:30:00.000Z",
    art: {
      eyebrow: "Compliance",
      coverHeadline: "Know what you collect before you write a policy",
      motif: "shield",
      figure: {
        kind: "flow",
        title: "The order of work",
        items: [
          "Inventory what you collect",
          "Delete what you do not need",
          "Write the notice honestly",
          "Handle requests and breaches",
        ],
        caption:
          "Most compliance work is deletion. Data you never collected cannot leak.",
      },
    },
    body: `Privacy compliance is usually approached backwards: someone copies a privacy policy from another site, publishes it, and considers the job done. The policy then describes practices the business does not follow, which is worse than having no policy.

The work runs in the other direction. Find out what you actually collect, stop collecting what you do not need, then describe honestly what remains.

This is practical guidance, not legal advice. For your specific obligations, take advice on the markets you serve.

## Step 1: Inventory what you collect

Walk your own site and list every point where personal data enters:

- Contact and enquiry forms
- Newsletter signups
- Account registration and login
- Checkout and payment
- Chat, WhatsApp handoffs, and callback requests
- Analytics, advertising, and heatmap tools
- Cookies and browser storage set by you and by third parties
- Server logs, including IP addresses
- Uploaded files, such as CVs on a careers page

For each, record: what is collected, why, where it is stored, who can access it, how long it is kept, and which vendors receive it.

This inventory is the foundation. Everything else depends on it.

![Flow diagram showing the order of privacy compliance work](/blog-figures/website-privacy-compliance-india.webp)

## Step 2: Delete what you do not need

The cheapest compliance measure is collecting less:

- Remove form fields nobody uses
- Turn off analytics features you never look at
- Remove tracking tags with no owner
- Set retention periods and actually delete old records
- Stop storing card details you have no reason to hold
- Avoid collecting sensitive categories unless genuinely necessary

Data you never collected cannot leak, cannot be requested, and does not need protecting.

## Step 3: Understand the principles you are working to

Frameworks differ in detail, but the principles are broadly consistent across India's data protection regime, the EU and UK rules, and most others:

- **Purpose limitation.** Collect for a stated purpose and do not repurpose silently.
- **Data minimisation.** Collect only what the purpose requires.
- **Notice.** Tell people what you collect and why, in clear language.
- **Consent or another lawful basis.** For many marketing uses, consent must be explicit, informed, and withdrawable.
- **Accuracy.** Keep it correct and let people correct it.
- **Retention limits.** Do not keep it indefinitely.
- **Security.** Protect it proportionately.
- **Rights.** People can ask what you hold, correct it, and often have it deleted.

If you serve customers across borders, more than one regime may apply.

## Step 4: Write a notice that matches reality

A privacy notice should be readable by a customer, not only by a lawyer:

- What you collect, in plain categories
- Why, for each category
- Who you share it with, naming the types of vendor
- How long you keep it
- What rights people have and how to exercise them
- How to contact you about data, with a route that is monitored
- The date it was last updated

Never publish a policy describing practices you do not follow. A copied policy that mentions data you do not collect, or omits data you do, is a liability rather than a protection.

## Step 5: Handle consent honestly

- Marketing consent must be opt-in, never pre-ticked
- Separate transactional messages from marketing
- Record what was consented to and when
- Make withdrawal as easy as giving consent
- Re-ask when the purpose materially changes

For cookies and similar storage, see our [cookie consent guide](/blog/how-to-add-cookie-consent-banner). The key point: a banner that does not actually hold non-essential scripts until consent is decoration.

## Step 6: Manage your vendors

Every tool that receives customer data is your responsibility to the customer:

- List every vendor and what data each receives
- Check the contract terms cover data processing
- Know where data is stored, and whether it crosses borders
- Confirm their security posture is proportionate
- Have a plan for what happens if a vendor is breached
- Remove vendors you no longer use, and confirm deletion

## Step 7: Prepare for requests and incidents

**Requests.** Decide in advance how you will verify identity, who handles the request, and how you will respond within the expected timeframe. Practise once with a test request.

**Incidents.** Write a short plan covering who is notified, how you assess scope, what you tell affected people, and any regulatory notification obligation. Deciding this during an incident is how businesses make things worse.

## Step 8: Get the basics of security right

Compliance without security is paperwork:

- HTTPS everywhere
- Two-factor authentication on every admin account
- Least-privilege access, reviewed when people leave
- Encrypted backups, with a tested restore
- Patching on a schedule - see our [maintenance checklist](/blog/website-maintenance-checklist-monthly)
- No production data in test environments

## Common mistakes to avoid

- **Copying another site's privacy policy.** It describes their practices, not yours.
- **Collecting data "in case it is useful".** It is a liability with no owner.
- **A consent banner that gates nothing.**
- **No retention policy.** Data accumulates forever and so does the risk.
- **An unmonitored privacy contact address.**

## Frequently asked questions

### Does a small business website need a privacy policy?

If it collects any personal data - including through a contact form, analytics, or cookies - then yes. The notice should describe what you actually do, not what a template says.

### What is the difference between a privacy policy and a cookie banner?

The policy is the full explanation of what you collect and why. The banner is the mechanism for obtaining consent for non-essential storage before it is set. You generally need both, and the banner must actually control what loads.

### How long should I keep customer data?

Only as long as the stated purpose requires, plus any period a legal or tax obligation demands. Write the periods down, and actually delete records when they expire.

### What should I do if there is a data breach?

Follow a written plan: contain it, assess what was affected, notify affected people and any regulator within the required timeframe, and document what happened and what you changed.

## Next steps

Build the inventory first - every form, tag, and vendor. Delete the fields and tools nobody uses, then rewrite your notice to match what remains.

[Start free](/signup) and keep your consent banner and forms consistent from one place.`,
  },
  {
    title: "Measuring Your Site Without Third-Party Cookies",
    slug: "first-party-analytics-without-third-party-cookies",
    excerpt:
      "Third-party tracking keeps shrinking. How to keep measuring what matters using first-party data, server-side events, and metrics that survive consent choices.",
    coverImage: "/blog-covers/first-party-analytics-without-third-party-cookies.webp",
    publishedAt: "2026-08-04T05:30:00.000Z",
    art: {
      eyebrow: "Analytics",
      coverHeadline: "Measure what you own",
      motif: "chart",
      figure: {
        kind: "stack",
        title: "What still works",
        items: [
          "Your own server and event data",
          "First-party session context",
          "Self-reported attribution",
          "Cohort and holdout comparison",
          "Business outcomes, not proxies",
        ],
        caption:
          "The measurement that survives is the measurement you own end to end.",
      },
    },
    body: `Cross-site tracking has been narrowing for years: browser restrictions, platform privacy changes, consent requirements, and ad blockers all reduce what third-party tools can see. Teams that built their reporting on that foundation are watching their numbers degrade and calling it a data problem.

It is not a data problem. It is a dependency problem. The measurement that survives is the measurement you own.

## What actually changed

- Third-party cookies are restricted or blocked by default in most browsers
- Storage lifetimes for scripted first-party cookies are limited in some browsers
- Consent requirements mean a share of visitors are never measured at all
- Ad blockers remove common analytics and advertising scripts entirely
- Platform-reported conversions increasingly rely on modelling rather than observation

The practical consequence: your analytics undercounts, your platform-reported conversions overcount, and the two will never reconcile. Stop trying to make them agree.

![Priority stack showing which measurement approaches survive tracking restrictions](/blog-figures/first-party-analytics-without-third-party-cookies.webp)

## Start from your own systems

Your most reliable data is not in an analytics tool at all:

- Orders, revenue, and margin from your commerce platform
- Enquiries and their outcomes from your CRM
- Support contacts by topic
- Returns and refunds
- Repeat purchase rate and customer lifetime value

None of this depends on a browser cookie. It is complete, it is yours, and it describes the outcomes you actually care about. Start every report here and work outwards.

## Capture context at the source

The one thing your commerce and CRM systems lack is where the customer came from. Capture that yourself, at the moment of submission:

- First-touch source stored in a first-party context on the visitor's first session
- Campaign parameters preserved through navigation
- Source page recorded on every form submission
- Calculator or configurator inputs attached to the enquiry

That gives you attribution inside your own systems rather than inside a vendor's. Our guide on [wiring your website into your CRM](/blog/website-to-crm-workflow) covers the implementation, and consent still applies - see our [privacy guide](/blog/website-privacy-compliance-india).

## Ask people directly

Self-reported attribution is underrated. A single optional question at checkout or on an enquiry form - "How did you hear about us?" - captures channels no tracker sees: word of mouth, a podcast, a shop sign, a friend's recommendation.

- Keep it optional and to one question
- Offer a short list plus a free-text option
- Compare it against your tracked data; the gaps are informative
- Do not use it as your only source, and do not expect precision

At small volumes it is often more useful than a tracking report, because it captures the offline half of the journey.

## Move measurement server-side where it matters

For your most important events - purchases, qualified enquiries - recording them on your server is more reliable than recording them in a browser:

- Not blocked by extensions
- Not lost to script failures
- Not dependent on the page staying open
- Still subject to consent obligations, which you must honour

Server-side measurement is not a way around consent. It is a way to make consented measurement reliable.

## Use methods that do not need individual tracking

When you cannot follow individuals, compare groups:

- **Holdout tests.** Withhold a campaign from one region or segment and compare outcomes.
- **Geographic splits.** Run a channel in some areas and not others.
- **Before and after with a control.** Compare against a segment that did not receive the change.
- **Cohort analysis.** Group customers by acquisition month and follow them forward.

These answer the question that matters - did this spend produce revenue - without needing to identify anyone.

## Pick metrics that survive

Prefer:

- Revenue, margin, and order count from your own systems
- Qualified enquiries and their conversion rate
- Repeat purchase rate and customer lifetime value
- Self-reported source distribution
- Landing page performance from server logs

Treat as directional only:

- Session counts and user counts
- Last-click channel attribution
- Platform-reported conversions
- Any funnel that spans multiple domains

## Set expectations internally

The hardest part is organisational. Explain, in advance:

- Analytics undercounts; platforms overcount; neither is lying
- The gap will not close, and reconciling them is wasted effort
- Trends matter more than absolute numbers
- Your commerce and CRM totals are the source of truth for revenue

A team that understands this stops chasing discrepancies and starts making decisions.

## Common mistakes to avoid

- **Treating platform-reported conversions as observed fact.** Much of it is modelled.
- **Ignoring consent to preserve numbers.** The regulatory and reputational cost is far higher than the reporting benefit.
- **Adding more tracking tools.** More scripts, same blind spots, slower site.
- **Reporting sessions as the headline metric.** Report revenue and qualified enquiries.
- **Never reconciling against your own systems.** Your order table is the truth.

## Frequently asked questions

### Is web analytics still accurate without third-party cookies?

Not for cross-site tracking or precise individual journeys. It remains useful for on-site behaviour and trends. For revenue and enquiry outcomes, use your own commerce and CRM data as the source of truth.

### What is first-party analytics?

Measurement based on data you collect and store yourself - your server logs, your own event records, and context captured at submission - rather than data collected by a third party across many sites.

### Does server-side tracking avoid consent requirements?

No. Consent obligations follow the personal data, not the technical method. Server-side measurement makes consented tracking more reliable; it does not remove the obligation.

### Why do my analytics and ad platform numbers never match?

They measure differently, attribute differently, and one of them models conversions it cannot observe. The gap is expected. Use your own order and enquiry data as the reference and treat both platforms as directional.

## Next steps

Build one report from your own order and enquiry data, add a "how did you hear about us" question, and capture first-touch source on every submission. Then stop trying to reconcile the platforms.

[Start free](/signup) and use a [visitor counter](/tools/visitors) backed by your own first-party data rather than an invented number.`,
  },
  {
    title: "Building a Multi-Language Website for India",
    slug: "multi-language-website-india",
    excerpt:
      "Which languages to add, how to structure URLs, what actually needs translating, and the technical details that decide whether the effort pays off.",
    coverImage: "/blog-covers/multi-language-website-india.webp",
    publishedAt: "2026-08-11T05:30:00.000Z",
    art: {
      eyebrow: "Growth",
      coverHeadline: "Translate the journey, not just the homepage",
      motif: "grid",
      figure: {
        kind: "checklist",
        title: "Before adding a language",
        items: [
          "Evidence of real demand",
          "A plan to translate checkout too",
          "Support staffed in that language",
          "A maintenance owner named",
          "Correct URL and language markup",
        ],
        caption:
          "A half-translated journey is worse than one honest language.",
      },
    },
    body: `Adding languages to a website is often proposed as an obvious growth move and then implemented as a machine-translated homepage that dead-ends into an English checkout. That combination performs worse than a single well-written English site, because it promises something it cannot deliver.

This guide covers how to decide, and how to do it properly if you do.

## Step 1: Establish there is real demand

Before translating anything, look for evidence:

- Browser language settings in your analytics
- Regional traffic concentrations
- Search queries in other languages that reach you
- Support requests arriving in another language
- Sales feedback about language being a barrier
- Competitors serving that audience successfully

Absence of traffic in a language is weak evidence either way - you may simply be invisible to those searches. Test with a small campaign or a single translated landing page before committing to the whole site.

## Step 2: Understand the true cost

Each language multiplies ongoing work:

- Initial translation of pages, products, and policies
- Translation of every future change
- Support in that language, or an honest statement that support is in English
- Testing every journey again
- Structured data and metadata per language
- Someone who can review quality

If you cannot fund the ongoing half, do not start. A language that goes stale is a visible signal of neglect.

![Checklist panel listing what to confirm before adding a language](/blog-figures/multi-language-website-india.webp)

## Step 3: Translate the whole journey or none of it

The most common failure is translating marketing pages and leaving the transaction in English. A visitor who reads a Hindi product page and then hits an English checkout with English error messages has been misled.

Translate, at minimum:

- Navigation and category names
- Product titles, descriptions, and attributes
- Cart and checkout, including validation and error messages
- Order confirmation and transactional messages
- Delivery, returns, and privacy pages
- Form labels, helper text, and success messages
- Widget content - [FAQs](/tools/faq), popups, and announcements

If you cannot translate checkout, translate nothing and instead invest in clearer English.

## Step 4: Get the URL structure right

Choose one approach and apply it consistently:

- **Subdirectories** - example.com/hi/ - simplest to manage, keeps authority on one domain, and is the usual right answer for a single business
- **Subdomains** - hi.example.com - more separation, more setup
- **Country domains** - a separate registration per market, expensive and rarely justified for language variants

Whichever you choose:

- Keep the same structure across languages so URLs are predictable
- Never mix languages within one page
- Never use a parameter alone to switch language
- Redirect consistently, and never redirect based only on browser language without offering a choice

## Step 5: Mark up the language relationships

Search engines need to know which page is which:

- Declare the page language in the HTML
- Provide alternate-language annotations linking equivalent pages, including a self-reference
- Include a default fallback for unmatched languages
- Keep the annotations bidirectional - every page must point back
- Ensure each language version has its own canonical, pointing to itself

Getting this wrong is why many multilingual sites end up with only one language indexed.

## Step 6: Make the switcher usable

- Show it in a consistent place, usually the header
- Label each language in its own script - "हिन्दी", not "Hindi"
- Do not use flags; languages are not countries
- Switching should stay on the equivalent page, not jump to the homepage
- Remember the choice for the session
- Never auto-redirect without offering a way back

## Step 7: Do not rely on machine translation alone

Machine translation is a useful first draft and a poor final product:

- Product names, units, and technical terms are frequently mangled
- Tone is often wrong for commerce
- Legal and policy text must be accurate, not approximate
- Errors in checkout copy cost orders directly

Have a native speaker review at least navigation, product, checkout, and policy content. Machine output is acceptable for long-tail content only if it is clearly labelled and reviewed over time.

## Step 8: Handle the practical details

- **Text expansion.** Translations are often longer; test buttons and navigation for overflow.
- **Fonts.** Confirm your fonts support the scripts you serve, and check the weight of the additional font files.
- **Numbers and dates.** Format for the locale, including the numbering conventions your audience uses.
- **Currency.** State it explicitly.
- **Search.** Your site search must handle the language, including transliteration if your audience types phonetically.
- **Sitemaps.** Include every language version.

## Common mistakes to avoid

- **Translating only the homepage.** It promises a journey that does not exist.
- **Auto-redirecting by browser language with no override.** Frustrating and sometimes wrong.
- **Flags as language labels.** Languages cross borders.
- **Unreviewed machine translation in checkout.** It costs orders directly.
- **No maintenance owner.** Translations go stale within one product cycle.

## Frequently asked questions

### Should my Indian business website be in multiple languages?

Only with evidence of demand and the budget to maintain it, including support. Many audiences transact comfortably in English; a badly maintained second language performs worse than one good one.

### What URL structure is best for multilingual sites?

Subdirectories such as example.com/hi/ for most businesses. They are simpler to manage, keep authority consolidated, and are straightforward to mark up correctly.

### Is machine translation good enough?

As a first draft, yes. For navigation, product, checkout, and policy content it needs native review - errors there cost orders and create legal exposure.

### Should I auto-detect the visitor's language?

You can suggest, but never force. Offer a switcher, remember the choice, and make sure a visitor can always get back to the language they want.

## Next steps

Test demand with one translated landing page and a small campaign before committing. If it works, plan the full journey - including checkout and support - and name an owner for keeping it current.

[Start free](/signup) and keep your widget content translatable from one place.`,
  },
  {
    title: "A B2B Website Lead Generation Playbook",
    slug: "b2b-website-lead-generation-playbook",
    excerpt:
      "B2B buyers research quietly and decide as a group. How to structure a site for long cycles, multiple stakeholders, and enquiries that sales actually wants.",
    coverImage: "/blog-covers/b2b-website-lead-generation-playbook.webp",
    publishedAt: "2026-08-18T05:30:00.000Z",
    art: {
      eyebrow: "B2B",
      coverHeadline: "Built for a committee, not a click",
      motif: "funnel",
      figure: {
        kind: "funnel",
        title: "What a B2B site must serve",
        items: [
          "The researcher, anonymously",
          "The evaluator, in detail",
          "The finance approver, on price",
          "The technical reviewer, on fit",
        ],
        caption:
          "Four different readers, one site. Most B2B sites are written for none of them.",
      },
    },
    body: `B2B websites are usually built like consumer sites with longer forms. That mismatch explains most of their poor performance: the buyer is a group, the cycle is months long, and most of the research happens before anyone identifies themselves.

This playbook covers what a B2B site actually has to do.

## Understand who is reading

A typical B2B purchase involves several people with different questions:

- **The researcher** - scoping options, anonymously, early. Wants to understand the category and shortlist quickly.
- **The evaluator** - comparing shortlisted vendors in detail. Wants specifics, integrations, and proof.
- **The finance approver** - wants price, terms, and total cost.
- **The technical reviewer** - wants architecture, security, and compatibility.

Each needs different content. A homepage written only for the researcher leaves the other three unable to do their part, which stalls the deal inside the buyer's organisation.

![Funnel diagram showing the four B2B stakeholders a website must serve](/blog-figures/b2b-website-lead-generation-playbook.webp)

## Publish enough to be shortlisted

B2B buyers eliminate vendors before contacting anyone. To survive that stage you must publish:

- **What you do, specifically.** Not "digital transformation partner" - the actual services, deliverables, and scope.
- **Who you serve.** Industry, company size, geography. Being specific attracts better fits and repels poor ones.
- **Pricing information.** At minimum a starting point, a typical range, or the model. "Contact us" removes you from many shortlists automatically. A [price calculator](/tools/calculator) can give an honest estimate without a rigid price list - see our [calculator guide](/blog/how-to-add-price-calculator-to-website).
- **Proof.** Named clients where permitted, case studies with real numbers, and specifics rather than adjectives.
- **How you work.** Process, timelines, and what you need from the client.
- **Who you are.** Real people with real credentials - a [team page](/tools/team) does more in B2B than in consumer.

## Build pages for each stakeholder

- **Service pages** that go deep on one offering rather than listing everything
- **Case studies** with context, constraint, approach, and outcome, written for the evaluator
- **A pricing or engagement page** for the approver
- **Technical documentation** - integrations, security posture, data handling - for the reviewer
- **A comparison page** if you are regularly evaluated against known alternatives, written honestly

Honest comparisons that concede where a competitor is stronger are more persuasive than pages claiming to win on everything.

## Make the enquiry match the commitment

B2B forms are usually far too long. The visitor is starting a conversation, not signing a contract:

- Name, work email, company, and what they need
- One qualifier if it genuinely changes routing
- A clear statement of what happens next and when

Then qualify properly in the conversation. See our [lead capture best practices](/blog/lead-capture-form-best-practices) and [qualification framework](/blog/lead-qualification-scoring-framework).

Offer more than one route: a form, a direct email, a phone number, and a calendar link. Different roles prefer different channels, and a procurement lead will often just call.

## Respond like the deal matters

In B2B the cost of a slow response is enormous, because each enquiry represents a long cycle and a large value:

- Assign an owner automatically and immediately
- Reply within the hour during working hours
- Make the first reply specific to what they asked, using the context captured on the form
- Have a plan for enquiries arriving outside hours

See [speed to lead](/blog/lead-response-time-speed-to-lead).

## Support the internal sell

Your buyer has to convince colleagues when you are not in the room. Give them ammunition:

- A downloadable one-page summary of the offering
- Case studies that can be forwarded
- Clear pricing they can put in a budget request
- Answers to the objections their finance and technical colleagues will raise
- Anything that makes their internal argument easier to make

The best B2B content is written for the person defending the decision, not for the person making it.

## Measure the right things

B2B cycles break most standard analytics:

- Track qualified enquiries, not form fills
- Track pipeline value by source, not session counts
- Expect long lags between first visit and enquiry - preserve first-touch source through to closure, see [website to CRM](/blog/website-to-crm-workflow)
- Ask "how did you hear about us" to capture what tracking misses
- Report by cohort, since this quarter's revenue came from last quarter's traffic

## Common mistakes to avoid

- **Hiding pricing entirely.** It removes you from shortlists before you know you existed.
- **Vague positioning.** "Innovative solutions" describes nothing.
- **Twelve-field forms on first contact.** Qualify in conversation.
- **Case studies without numbers.** Unquantified stories are anecdotes.
- **No content for the technical or finance reviewer.** The deal stalls where you cannot see it.

## Frequently asked questions

### Should a B2B website show pricing?

Show something - a starting price, a typical range, or the pricing model. Buyers eliminate vendors who publish nothing, often without ever contacting them. A calculator or an honest range preserves flexibility.

### How long should a B2B lead form be?

Four or five fields for first contact. Name, work email, company, what they need, and at most one routing qualifier. Longer forms reduce enquiries more than they improve quality.

### What content do B2B buyers actually want?

Specifics: what you do, who you serve, what it costs, how you work, and evidence that you have done it before for someone like them. Plus material the buyer can forward to colleagues.

### How do I measure B2B website performance?

By qualified enquiries and pipeline value by source, not by sessions or form fills, with first-touch source preserved through to closed revenue. Expect long lags and report by cohort.

## Next steps

Read your service pages as a finance approver and as a technical reviewer, and write down every question you cannot answer. Publish those answers, then cut your enquiry form to five fields.

For a site built around this, see our [software development](/services/software-development) and [digital marketing and SEO](/services/digital-marketing-seo) services.`,
  },
  {
    title: "No-Code or Custom Development: Choosing Well",
    slug: "no-code-vs-custom-development",
    excerpt:
      "No-code tools are the right answer more often than developers admit and less often than vendors claim. A practical framework for deciding, and for combining both.",
    coverImage: "/blog-covers/no-code-vs-custom-development.webp",
    publishedAt: "2026-08-25T05:30:00.000Z",
    art: {
      eyebrow: "Software",
      coverHeadline: "The question is not which is better",
      motif: "code",
      figure: {
        kind: "compare",
        title: "Where each one wins",
        items: [
          "No-code: standard problems, fast",
          "No-code: changes without a developer",
          "Custom: your actual differentiator",
          "Custom: constraints tools cannot meet",
        ],
        items2: [
          "Custom code for a contact form",
          "No-code for your core product logic",
          "Rebuilding what a tool already does",
          "Choosing by preference, not by need",
        ],
        caption:
          "Most businesses need both. The skill is drawing the line in the right place.",
      },
    },
    body: `The no-code versus custom debate is usually argued as an identity question - developers defend code, vendors defend platforms - when it is really a question about where a specific piece of work sits.

Most businesses need both. The useful skill is knowing where to draw the line.

## Where no-code genuinely wins

For standard problems with standard shapes, a good tool is almost always the better choice:

- **Speed.** Live this afternoon rather than in three weeks.
- **Cost.** A subscription against a build plus ongoing maintenance.
- **Independence.** Marketing can change a form, a banner, or an FAQ without a developer ticket.
- **Maintenance.** Browser changes, security patches, and accessibility fixes are the vendor's problem.
- **Proven behaviour.** Edge cases have been found by thousands of other users.

Typical fits: contact and enquiry forms, FAQs, reviews, popups, countdowns, galleries, maps, booking links, landing pages, newsletters, and most storefront widgets. Building these from scratch is nearly always a poor use of developer time.

That is exactly the space [our widget catalogue](/tools) covers: standard storefront elements, configured visually, published with one embed line.

![Comparison panel showing where no-code and custom development each win](/blog-figures/no-code-vs-custom-development.webp)

## Where custom development wins

Custom is right when the thing is genuinely yours:

- **Your differentiating workflow.** The process that is your competitive advantage.
- **Deep integration.** Systems that must talk to each other in ways no connector supports.
- **Performance or scale constraints** that platforms cannot meet.
- **Data handling requirements** - residency, retention, or security - that vendors cannot satisfy.
- **Cost inversion at scale.** When per-seat or per-conversation pricing exceeds the build and run cost.
- **Product logic**, if software is what you sell.

See our guide on [custom software versus SaaS](/blog/custom-software-vs-saas-for-small-business) for the fuller decision.

## The questions that decide it

For each piece of work, ask in order:

1. **Is this problem standard?** If thousands of businesses have it, buy the solution.
2. **Does a tool meet the must-haves?** Not the nice-to-haves.
3. **Would changing our process remove the need?** Often the cheapest answer.
4. **Is this how we compete?** If yes, consider building.
5. **Can we fund it for five years?** If no, do not build.
6. **What happens if the vendor disappears?** Can you export and move?

Most work stops at question one or two.

## The hybrid that usually wins

The pattern that works for most small and mid-sized businesses:

- **No-code for the storefront layer.** Forms, FAQs, reviews, popups, galleries, and announcements - changeable by the people who own the content.
- **A standard platform for commerce or the core system**, extended lightly.
- **Custom for the one workflow that is genuinely yours**, integrated cleanly.

This gives non-technical staff control over what changes weekly, and reserves engineering effort for what actually differentiates you.

## Watch the failure modes on both sides

**No-code failure modes:**

- Tool sprawl - eight subscriptions doing overlapping jobs, each loading its own scripts
- Performance cost from many separate third-party embeds
- Lock-in with no export path
- Hitting a hard limit halfway through an important project
- Nobody owning the configuration

**Custom failure modes:**

- Rebuilding a solved problem badly
- One developer, no documentation, and a notice period
- Maintenance nobody budgeted for
- Building the differentiator last, after everything ordinary
- Technology chosen for novelty rather than support

## Practical guardrails

Whichever side a piece of work lands on:

- **Own your data.** Check the export path before you commit, on both sides.
- **Own your accounts and domains**, always in your business name.
- **Name an owner** for every tool and every custom component.
- **Document the boundary** - what is configured, what is built, and how they connect.
- **Review annually.** A tool that fit two years ago may not fit now, and a custom component may now be available off the shelf.

## Common mistakes to avoid

- **Building a contact form.** It is a solved problem with accessibility and spam edge cases you will get wrong.
- **Running core business logic in a no-code tool** that cannot be tested or version-controlled.
- **Choosing by preference.** Developers over-build; vendors over-sell. Decide per piece of work.
- **Ignoring the accumulated weight** of many separate no-code embeds on page speed.
- **Never reviewing.** Both sides of the line move over time.

## Frequently asked questions

### Is no-code good enough for a business website?

For the standard parts - forms, FAQs, reviews, galleries, popups, landing pages - yes, and it is usually the better choice. Reserve custom development for the workflow that genuinely differentiates you.

### When should I move from no-code to custom?

When a tool blocks something that costs you real money, when per-unit pricing at your scale exceeds the build and run cost, or when the workflow has become your competitive advantage.

### Do no-code widgets slow down a website?

Many separate embeds do, because each adds a domain, a download, and main-thread work. Consolidating widgets into one lightweight source keeps the benefit without the accumulation - see [Core Web Vitals with widgets](/blog/core-web-vitals-lightweight-widgets).

### Can I combine no-code and custom development?

That is usually the right answer: no-code for the content and storefront layer that changes weekly, custom for the workflow that is genuinely yours, with clean integration between them.

## Next steps

List your current and planned work, and mark each item as standard or differentiating. Buy the standard ones this week and reserve your engineering budget for the rest.

[Start free](/signup) for the storefront layer, or talk to us about our [software development service](/services/software-development) for the part that is genuinely yours.`,
  },
];
