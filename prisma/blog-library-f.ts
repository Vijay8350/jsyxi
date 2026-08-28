import type { BlogLibraryPost } from "./blog-library-types";

export const BLOG_POSTS_F: BlogLibraryPost[] = [
  {
    title: "Exit-Intent Offers That Are Worth Showing",
    slug: "exit-intent-offers-that-convert",
    excerpt:
      "Exit-intent popups interrupt someone who is already leaving. How to earn that interruption with a relevant offer, honest copy, and rules that respect the visitor.",
    coverImage: "/blog-covers/exit-intent-offers-that-convert.webp",
    publishedAt: "2026-03-17T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "The last interruption you get to make",
      motif: "grid",
      figure: {
        kind: "compare",
        title: "Exit offers that work",
        items: [
          "Matches the page they are leaving",
          "Solves the reason they are leaving",
          "One field, one action",
          "Shown once, then never again",
        ],
        items2: [
          "A generic newsletter signup",
          "Fires on every page",
          "Blocks the whole screen on mobile",
          "No visible close control",
        ],
        caption: "An exit offer is a last question, not a second advertisement.",
      },
    },
    body: `Exit intent is the most aggressive timing available to a popup: you interrupt someone at the exact moment they have decided to leave. That can be worth doing, but only if the offer answers the reason they were leaving.

Most exit popups do not. They show a newsletter signup to someone who was comparing delivery costs.

## What exit intent actually detects

On desktop, exit intent is usually a cursor moving quickly toward the top of the viewport - a reasonable proxy for reaching the address bar or a tab. It is a guess, and it is wrong often enough that you should not treat it as certainty.

On mobile there is no equivalent signal. Cursor tracking does not exist, and the substitutes - fast upward scroll, back-button interception, an inactivity timer - are far less reliable and far more annoying. A back-button trap is a pattern visitors recognise and resent.

The honest position: use exit intent on desktop, and use time or scroll-based rules on mobile, with a much higher bar for interrupting.

![Comparison panel contrasting exit offers that work with ones that annoy](/blog-figures/exit-intent-offers-that-convert.webp)

## Match the offer to the page

The single biggest improvement is relevance. Ask what the visitor on this specific page was trying to do, and offer the thing that unblocks it:

- **Product page** - a size guide, a delivery estimate by PIN code, or an answer to the most common objection
- **Pricing page** - a comparison sheet, or an offer to answer one question on [WhatsApp](/tools/whatsapp)
- **Cart** - free delivery threshold progress, or a clear return policy line
- **Blog post** - the next article in the sequence, or a checklist version of what they just read
- **Service page** - an example project, or a short enquiry form

A generic "10% off, join our list" on all five pages is one offer pretending to be five.

## Write it like a question, not an advertisement

Exit copy works when it acknowledges the moment:

- "Before you go - not sure about sizing?" beats "Wait! Special offer!"
- Say what they get, in one line
- Ask for one thing only - an email, a phone number, or a click
- Make the decline option a real, visible control, not a grey line of small text

Never use a confirmshaming decline label such as "No thanks, I hate saving money". It damages brand perception and is increasingly treated as a dark pattern.

## Set rules that respect the visitor

Configure the [Popup widget](/tools/popup) with restraint:

- **Show once per visitor**, and remember the dismissal for at least thirty days
- **Never show to someone who already converted** or who is mid-checkout
- **Never show in the first few seconds** of a session
- **One popup per session**, across all rules
- **Suppress on the pages where interruption costs most** - cart, checkout, and any form in progress

Also suppress it for returning customers who have already given you their email. Asking again signals you are not paying attention.

## Get the mechanics right

- The dialog must be dismissible with a visible close button and the Escape key
- Focus must move into it when it opens and return when it closes
- It must never cover the whole viewport on a phone
- It must not shift the page layout underneath
- It must not load before the page content

Our post on [popups that convert without annoying visitors](/blog/popups-without-annoying-visitors) covers the wider timing and frequency rules.

## Measure honestly

Exit popups make it easy to fool yourself. A three per cent capture rate looks like free leads; it is only free if it costs nothing elsewhere.

Track together:

- Capture rate on the popup
- Conversion rate of sessions that saw it versus comparable sessions that did not
- Bounce and exit rate on the pages where it fires
- Downstream value of the captured contacts, not just the count
- Unsubscribe rate on the list it feeds

If captured emails never buy, you have added an interruption and a list-cleaning cost with no revenue.

## When not to use exit intent at all

- On checkout and cart pages where the visitor is mid-payment
- On any page where a form is partly filled
- On mobile, unless you have a genuinely valuable, page-specific offer
- When your only offer is a discount you cannot afford to give
- When the visitor has already seen the same offer this month

## Common mistakes to avoid

- **One generic offer everywhere.** Relevance is the whole mechanism.
- **Firing on mobile with a back-button trap.** It is recognised and resented.
- **Confirmshaming.** It converts marginally better and damages brand meaningfully.
- **No frequency cap.** The second showing is worse than the first.
- **Counting captures without counting cost.** Measure conversion, not just leads.

## Frequently asked questions

### Do exit-intent popups actually work?

They can, on desktop, when the offer matches the page the visitor is leaving. A generic offer shown site-wide usually adds annoyance without adding revenue. Always compare conversion for sessions that saw it against those that did not.

### Can exit intent work on mobile?

Not reliably. There is no cursor to track, and the substitutes - scroll speed, back-button interception, inactivity - are guesses that interrupt people who were not leaving. Use time or scroll rules with a much higher relevance bar instead.

### How often should the same visitor see an exit popup?

Once, then not again for at least thirty days, and never after they have converted or already given you the same information.

### Should an exit offer always be a discount?

No. Information often converts better and costs nothing: a size guide, a delivery estimate, a comparison sheet, or a direct route to ask one question.

## Next steps

Pick your three highest-exit pages, write one page-specific offer for each that solves the actual reason people leave, and set a strict frequency cap with the [Popup widget](/tools/popup). Then compare conversion, not capture rate.

[Start free](/signup) and make your last interruption count.`,
  },
  {
    title: "A/B Testing When You Do Not Have Much Traffic",
    slug: "ab-testing-low-traffic-stores",
    excerpt:
      "Most small sites cannot run valid split tests. What to do instead: sequential changes, qualitative research, and the few tests that are still worth running.",
    coverImage: "/blog-covers/ab-testing-low-traffic-stores.webp",
    publishedAt: "2026-03-20T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "What to do when the maths does not work",
      motif: "chart",
      figure: {
        kind: "stack",
        title: "Better than a test you cannot power",
        items: [
          "Fix outright defects first",
          "Watch five real sessions",
          "Ship one clear change at a time",
          "Compare against a stable baseline",
          "Test only large, cheap swings",
        ],
        caption:
          "Low traffic is not a reason to guess. It is a reason to use different evidence.",
      },
    },
    body: `Split testing is presented as the responsible way to make website decisions. For most small and mid-sized sites it is not available: the traffic required to detect a realistic improvement is far higher than people assume, and running an underpowered test produces confident, random answers.

This guide covers how to know whether you can test, and what to do when you cannot.

## The arithmetic, briefly

To detect a change you need enough conversions in each variant, not enough visitors. The smaller the effect you want to detect, the more you need, and the relationship is steep. Roughly halving the effect size quadruples the sample required.

A store with a few hundred orders a month can realistically detect only very large changes - the kind you would notice anyway. Detecting a modest lift would take many months, over which season, campaigns, and product mix all change, which invalidates the comparison.

Before running any test, calculate the required sample from your actual conversion rate and the smallest effect worth acting on. If the answer is longer than about four weeks, do not run the test.

![Priority stack of alternatives to underpowered A/B testing](/blog-figures/ab-testing-low-traffic-stores.webp)

## What to do instead, in order

### 1. Fix the outright defects

Before optimising anything, remove the things that are simply broken. These do not need a test:

- A pay button covered by a sticky element on mobile
- Delivery costs revealed only at the final step
- Forms that reject valid phone numbers
- Images that push the price below the fold
- Pages that shift while loading

Nobody needs an experiment to justify fixing a broken checkout. Our [product page checklist](/blog/product-page-optimization-checklist) and [mobile checkout checklist](/blog/mobile-checkout-ux-checklist) list the usual suspects.

### 2. Watch real people

Five session recordings of real visitors tell you more than an underpowered test ever will. Watch for hesitation, repeated scrolling, rage clicks, and abandonment points.

Add:

- Site search queries that returned nothing
- Support questions that repeat
- The questions your sales team answers on every call

These are direct evidence of confusion, and confusion is the thing you are trying to remove.

### 3. Ship one coherent change at a time

Sequential testing - change one thing, watch a stable metric, keep or revert - is weaker than a split test but far better than nothing, provided you are disciplined:

- Change one thing at a time
- Establish a baseline over a comparable period first
- Avoid periods with sales, festivals, or campaign spikes
- Compare like with like: same traffic sources, same day-of-week pattern
- Write down the prediction before you ship

If you cannot state what you expect to happen and by roughly how much, you are not testing; you are redecorating.

### 4. Use bigger swings

If you can only detect large effects, only attempt large changes. A button colour test is exactly the kind of small-effect experiment low traffic cannot resolve. A restructured product page, a new pricing presentation, or removing a required step are big enough to show up.

### 5. Test on the aggregate, not the page

If a single page has too little traffic, test a change applied across all product pages, or all category pages. You gain sample by pooling similar surfaces.

## When a test is worth running

Run a proper split test when all of these hold:

- The change is expensive or risky to get wrong
- You can reach the required sample within about four weeks
- The metric is a real business outcome, not a proxy like clicks
- You can run both variants simultaneously, so seasonality affects both equally
- You have agreed in advance what result would make you revert

Otherwise, ship the better-reasoned version and monitor.

## Guardrails to watch either way

Whatever method you use, watch the metrics that reveal a "win" that is actually a loss:

- Refunds and returns
- Support contacts
- Page performance
- Order quality and margin, not just order count
- Unsubscribe rate, if the change involves capture

A change that lifts conversion by pushing people into the wrong purchase shows up here.

## Common mistakes to avoid

- **Stopping a test when it first looks significant.** Peeking inflates false positives dramatically.
- **Running two tests on the same journey.** You will not be able to attribute the result.
- **Testing during a sale.** The traffic mix is not representative.
- **Declaring a winner from a handful of conversions.** That is noise with a number attached.
- **Never writing down the hypothesis.** Post-hoc explanations always sound convincing.

## Frequently asked questions

### How much traffic do I need for an A/B test?

It depends on your conversion rate and the smallest effect worth detecting, but most small sites need far more than they have. Calculate the required sample first; if it exceeds about four weeks of traffic, choose a different method.

### Can I run an A/B test with 100 visitors a day?

Only for very large effects. At that volume, a realistic test of a modest improvement would run for months, during which seasonality and product mix would invalidate the comparison.

### Is sequential testing valid?

It is weaker than a split test because time-based factors are not controlled. It is still useful if you change one thing at a time, compare against a stable baseline, avoid campaign periods, and treat the result as directional rather than proof.

### What should I optimise first with low traffic?

Defects and clarity: broken mobile interactions, hidden costs, confusing forms, and unanswered objections. These have large effects and need no statistical justification.

## Next steps

Calculate the sample your current conversion rate would require for a realistic lift. If it is out of reach, spend that effort on watching five real sessions and fixing what makes them hesitate.

[Start free](/signup) and remove the friction you can already see.`,
  },
  {
    title: "How to Reduce Bounce Rate on Landing Pages",
    slug: "reduce-bounce-rate-on-landing-pages",
    excerpt:
      "High bounce is usually a mismatch between promise and page. How to diagnose the real cause and fix message match, speed, and clarity in the first screen.",
    coverImage: "/blog-covers/reduce-bounce-rate-on-landing-pages.webp",
    publishedAt: "2026-03-24T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "Bounce is a symptom, not a diagnosis",
      motif: "chart",
      figure: {
        kind: "flow",
        title: "Diagnosing a bouncing page",
        items: [
          "Segment by source and device",
          "Check speed on a real phone",
          "Compare ad promise to headline",
          "Find the missing next step",
        ],
        caption:
          "Fix the cause you can prove, not the one that is easiest to change.",
      },
    },
    body: `Bounce rate is one of the most misread metrics in analytics. A high number can mean the page failed, or that it answered the question so completely that nothing else was needed.

Before trying to reduce it, work out which situation you are in.

## First, know what your tool is measuring

Definitions differ. Some tools count any session with a single pageview as a bounce, regardless of how long it lasted or what the visitor did. Others count a session with no qualifying engagement - no meaningful time on page, no scroll, no event.

That distinction matters. Under an older definition, a visitor who read your entire article for four minutes and left satisfied is a bounce. Under an engagement-based definition, they are not.

Check your tool's definition before drawing conclusions, and never compare bounce rates across differently configured properties.

## Segment before diagnosing

An overall bounce rate is an average of very different behaviours. Break it down by:

- **Source** - paid social bounces higher than branded search, always
- **Device** - a mobile-only spike usually means a layout or speed problem
- **Landing page** - one broken page can move the site average
- **New versus returning** - returning visitors bounce differently
- **Geography** - a spike from one region often means a speed or serviceability issue

The useful question is never "why is our bounce rate high" but "why does this page bounce for this segment".

![Flow diagram showing how to diagnose a landing page with high bounce](/blog-figures/reduce-bounce-rate-on-landing-pages.webp)

## Cause 1: The page is slow

Speed is the most common cause of mobile bounce, and it is measurable. A visitor on mobile data will not wait through a hero image, three fonts, a chat widget, and a consent script.

Check:

- Largest Contentful Paint on a mid-range phone with a throttled connection
- Whether the headline is text or trapped inside an image
- How many third-party scripts load before content
- Whether anything shifts while loading

See our [page speed guide](/blog/page-speed-optimization-guide) and [Core Web Vitals with widgets](/blog/core-web-vitals-lightweight-widgets).

## Cause 2: The promise does not match the page

This is the largest cause of paid-traffic bounce. The ad promised one thing; the page talks about another.

Compare, side by side:

- The ad or search snippet headline
- The landing page headline
- The product or offer named in each
- The price implied in each

If a visitor clicked an ad for a specific product and lands on a category page, they have to repeat their search. Most will not. Send campaign traffic to the closest useful destination and keep the wording consistent from ad to headline to button.

## Cause 3: The first screen does not answer the question

A visitor decides in a few seconds. If the first screen does not say what this is, who it is for, and what to do next, they leave.

Our guide on [what belongs above the fold](/blog/what-belongs-above-the-fold-on-homepage) covers the full list. The frequent failures:

- A slogan instead of a description
- A carousel where only the first slide is seen
- An immediate popup before the visitor has read anything
- A cookie banner, promo bar, and header consuming the whole screen on a phone

## Cause 4: There is no obvious next step

Sometimes the page communicates well and offers nowhere to go. Every landing page needs one primary action, visible without scrolling, plus a secondary route for people not ready.

For content pages, the next step is usually another piece of content. Related links, a next-in-series link, or a relevant offer keep a satisfied reader on the site.

## Cause 5: Something is broken

Do not skip this. Check on a real phone:

- Does the page render at all on older browsers?
- Does a sticky element cover the primary action?
- Do the fonts load, or does text stay invisible?
- Does an autoplaying video block interaction?
- Does the page work on a slow connection and with an ad blocker?

## When high bounce is fine

- A contact page where the visitor got the phone number and called
- A blog post that answered the question completely
- A store locator where they got directions and left for the shop
- A specification page consulted mid-purchase

For these, add engagement measurement - scroll depth, time, and outbound clicks like tap-to-call - so success is visible rather than counted as failure.

## Common mistakes to avoid

- **Chasing the site-wide number.** Fix pages, not averages.
- **Comparing bounce across tools or properties.** Definitions differ.
- **Adding an interstitial to "engage" visitors.** It increases exits.
- **Ignoring device segmentation.** Most bounce problems are mobile problems.
- **Optimising bounce instead of revenue.** A page can bounce less and sell less.

## Frequently asked questions

### What is a good bounce rate?

There is no universal figure. It varies enormously by page type, traffic source, and tool definition. Compare a page against its own history and against similar pages on your own site, not against an industry number.

### Does bounce rate affect SEO rankings?

Not as a direct ranking factor. What matters is whether the page satisfies the search intent. A page that fails visitors will tend to underperform for other reasons, but the bounce metric itself is not the mechanism.

### Why is mobile bounce rate higher than desktop?

Usually speed, layout, and interruption: heavier pages on slower connections, hidden or covered actions, and popups or banners that occupy most of a small screen.

### How do I reduce bounce on paid landing pages?

Match the ad promise to the page headline closely, send traffic to the specific product or offer rather than a generic page, and make sure the first screen loads fast and states the offer plainly.

## Next steps

Segment bounce by source and device, pick the worst page, and check it in order: speed on a real phone, promise match, first-screen clarity, then next step. Fix one cause at a time so you know what worked.

[Start free](/signup) and make your landing pages answer the promise that brought people there.`,
  },
  {
    title: "The Festive Sale Website Checklist",
    slug: "festive-sale-website-checklist",
    excerpt:
      "A four-week plan for festive and seasonal sale traffic: capacity, honest offers, checkout resilience, support coverage, and a wind-down that keeps trust intact.",
    coverImage: "/blog-covers/festive-sale-website-checklist.webp",
    publishedAt: "2026-03-27T05:30:00.000Z",
    art: {
      eyebrow: "Ecommerce",
      coverHeadline: "Prepare the site before you buy the traffic",
      motif: "timer",
      figure: {
        kind: "flow",
        title: "Four weeks to a sale you survive",
        items: [
          "Week 4: audit and load",
          "Week 3: offers and pages",
          "Week 2: support and stock",
          "Week 1: freeze and rehearse",
        ],
        caption:
          "Everything that breaks during a sale was breakable the week before.",
      },
    },
    body: `A festive sale multiplies whatever your site already is. If checkout is fragile, it fails under load. If delivery promises are vague, support drowns. If your offer is confusing, the discount is spent on refunds.

This is a four-week plan for arriving at the sale with a site that holds.

## Four weeks out: audit and load

**Performance.** Measure the pages that will take the traffic - home, top categories, best-selling products, cart, checkout - on a mid-range phone with a throttled connection. Remove any script that is not earning its weight. Our [page speed guide](/blog/page-speed-optimization-guide) covers the method.

**Capacity.** Confirm with your hosting and payment providers what your ceiling is. Ask specifically about concurrent checkout throughput, not just page views.

**Third parties.** Every widget, tag, and embed is a dependency that can fail under load. List them and decide which you would disable if the site slowed down. Write the list now, not during the sale.

**Inventory data.** Confirm stock counts are accurate. Overselling during a festive sale creates cancellations, refunds, and reviews that outlast the campaign.

![Flow diagram showing a four-week festive sale preparation timeline](/blog-figures/festive-sale-website-checklist.webp)

## Three weeks out: offers and pages

**Make the offer unambiguous.** Write the exact terms:

- What is discounted and what is excluded
- Whether it stacks with other offers
- Minimum order value, if any
- Start and end date and time, with the timezone
- Whether it applies to already-reduced items

Ambiguity here becomes support volume later.

**Price honestly.** If you show a reference price, it must be a price you actually charged recently. Inflating a "was" price to make a discount look bigger is a consumer protection issue in most markets and is easy for customers to check.

**Build the sale pages early.** Category pages, landing pages, and banners should be built and reviewed now, published later. Set them up so switching them on is a configuration change, not a build.

**Prepare the countdown honestly.** A [Countdown Timer](/tools/countdown) to a real deadline creates legitimate urgency. It must expire into the correct state and must never restart. See [honest urgency](/blog/countdown-timers-honest-urgency).

## Two weeks out: support and logistics

**Delivery promises.** Publish realistic cut-off dates for delivery before the festival. Under-promise. A customer who receives an order early is delighted; one who receives it late writes a review.

**Support coverage.** Decide who is on duty, on which channel, at what hours. Publish those hours with a [Business Hours widget](/tools/hours) so expectations are set, and give an out-of-hours route.

**Prepare the answers.** Write canned responses for the ten questions you will definitely receive: offer terms, delivery dates, payment failures, order changes, cancellation, returns during sale, cash-on-delivery availability, stock queries, invoice requests, and exchange rules.

**Set up the FAQ.** Publish those same answers on the sale page with an [FAQ Accordion](/tools/faq). Every question answered on the page is a support contact avoided.

**Returns policy for sale items.** Decide and publish it. Silence here produces disputes.

## One week out: freeze and rehearse

**Code freeze.** Stop shipping changes that are not sale-critical. Most sale-day incidents come from a change made two days before.

**Rehearse the full journey.** On a real phone:

- Browse, add to cart, apply the offer, check out, pay
- Deliberately fail a payment and retry
- Test cash on delivery if you offer it
- Test with an ad blocker enabled
- Test as a guest, not just as a logged-in admin

**Check the sticky elements.** Promo bars, chat launchers, cookie banners, and announcement bars stack up during campaigns. Confirm nothing covers the pay button with the keyboard open. See our [mobile checkout checklist](/blog/mobile-checkout-ux-checklist).

**Set up monitoring.** Know within minutes if checkout errors spike, payment success rates fall, or the site slows. Decide who is watching and how they will be alerted.

**Prepare a rollback.** Know how to turn the sale off, revert prices, and disable heavy widgets quickly.

## During the sale

- Watch payment success rate as your primary health metric, not traffic
- Keep the offer terms visible on the sale page, not only in the ad
- Update stock status promptly; a sold-out item shown as available generates cancellations
- Answer support quickly - during a sale, response time is the experience
- Resist adding new offers mid-campaign; it confuses customers and your own team

## After the sale

The wind-down decides whether the sale built or spent trust:

- **Expire everything cleanly.** Timers, banners, and prices must revert together. A dead countdown or a stale banner is a credibility cost.
- **Honour the promises.** Ship within the stated window, or communicate early if you cannot.
- **Keep support staffed** for the return and exchange wave, which arrives one to three weeks later.
- **Write down what broke.** The list is the plan for next time.
- **Measure the real outcome** - margin after discounts, returns, and support cost, not gross sales.

## Common mistakes to avoid

- **Shipping changes during the sale.** Freeze early.
- **Inflated reference prices.** Customers check, and so do regulators.
- **Vague delivery promises.** They become the top support topic.
- **Leaving banners live after the sale ends.** It signals nobody is minding the site.
- **Measuring gross revenue only.** A sale can grow revenue and shrink profit.

## Frequently asked questions

### When should festive sale preparation start?

About four weeks out for a small store: audit and performance first, then offers and pages, then support and logistics, then a freeze and rehearsal in the final week.

### How do I stop my site from slowing down during a sale?

Reduce third-party scripts before the sale, confirm capacity with your host and payment provider, cache aggressively, and keep a list of non-essential widgets you can disable if performance degrades.

### Can I use a countdown timer for a festive sale?

Yes, for a real deadline. It must count to an actual end time, expire into the correct state, and never restart. Fake urgency is noticed and remembered.

### What should happen the day after the sale ends?

Prices, banners, and timers revert together; delivery promises are honoured or updated proactively; support stays staffed for returns; and you write down every failure while it is fresh.

## Next steps

Put the four-week plan in a calendar, assign an owner to each block, and rehearse a full purchase on a real phone including a failed payment. The rehearsal finds more problems than the audit.

[Start free](/signup) and get your sale pages ready before the traffic arrives.`,
  },
  {
    title: "A Technical SEO Checklist for Small Businesses",
    slug: "technical-seo-checklist-small-business",
    excerpt:
      "The technical work that actually matters for a small site: crawlability, indexing, canonicals, sitemaps, speed, and the mistakes that quietly hide your pages.",
    coverImage: "/blog-covers/technical-seo-checklist-small-business.webp",
    publishedAt: "2026-03-31T05:30:00.000Z",
    art: {
      eyebrow: "SEO",
      coverHeadline: "The technical work that actually matters",
      motif: "code",
      figure: {
        kind: "checklist",
        title: "Technical SEO essentials",
        items: [
          "One canonical version of every URL",
          "Sitemap that matches reality",
          "Nothing important blocked in robots",
          "Titles and descriptions written",
          "Fast, stable pages on mobile",
        ],
        caption:
          "Most small-site SEO problems are self-inflicted and quickly reversible.",
      },
    },
    body: `Technical SEO for a small business is not an exotic discipline. It is a short list of things that must be true, most of which break silently.

This checklist covers the work that actually affects whether your pages can be found, in the order worth doing it.

## 1. Make sure your pages can be crawled

Start with what is blocking access:

- **robots.txt** - confirm it does not disallow anything important. The classic disaster is a staging rule copied to production that blocks the whole site.
- **noindex tags** - check your key pages do not carry one. Another common leftover from a staging environment.
- **Login walls and age gates** - if content is only visible after interaction, crawlers may never see it.
- **Server errors** - repeated 5xx responses reduce crawling.

Verify by inspecting a live URL in Google Search Console rather than trusting the source code. What matters is what the crawler renders.

## 2. Have one canonical version of each page

Duplicate URLs split signals and confuse indexing. Pick one version and enforce it:

- HTTPS, not HTTP
- One host - either with or without www, consistently
- Consistent trailing slash behaviour
- Lowercase URLs
- Parameters that do not create endless variants

Then redirect the alternatives with permanent redirects, and set a self-referencing canonical tag on each page. For paginated or filtered listings, canonicalise deliberately rather than by accident.

![Checklist panel listing the essentials of technical SEO for a small site](/blog-figures/technical-seo-checklist-small-business.webp)

## 3. Publish a sitemap that reflects reality

A sitemap should list the URLs you want indexed, and nothing else:

- Only canonical, indexable, live URLs
- Accurate last-modified dates that actually change when content changes
- No redirects, no 404s, no noindex pages
- Submitted in Search Console and referenced from robots.txt

A sitemap full of stale or redirecting URLs wastes crawl budget and signals carelessness.

## 4. Write titles and descriptions deliberately

These are still the cheapest wins available:

- **Title** - unique per page, describing the page in words people search, with the important part first. Keep it short enough not to be truncated.
- **Meta description** - a sentence or two that earns the click. It is not a ranking factor, but it affects click-through.
- **One H1 per page**, matching the page's actual subject.
- **Heading hierarchy** that reflects structure, not visual size.

Auto-generated titles across a whole catalogue are a wasted opportunity on your top pages. Write those by hand.

## 5. Fix your URL structure once

- Short, readable, hyphen-separated, lowercase
- Words a human would recognise
- Stable - changing URLs later costs you links unless redirected properly
- No session identifiers or tracking parameters in indexable URLs

If you must change a URL, redirect the old one permanently and update internal links to point at the new destination directly rather than through the redirect.

## 6. Make the site fast and stable on mobile

Core Web Vitals are part of page experience, and more importantly they are what your visitors feel:

- Largest Contentful Paint on a mid-range phone, not a desktop
- No layout shift from images, fonts, ads, or late-loading widgets
- Interaction that responds promptly

See our [page speed guide](/blog/page-speed-optimization-guide) and [Core Web Vitals with third-party widgets](/blog/core-web-vitals-lightweight-widgets).

## 7. Add structured data where it applies

Structured data does not rank a page, but it can change how it appears. Worth doing for:

- Organisation and local business details
- Products with price and availability
- Articles and blog posts
- FAQ content that is actually visible on the page
- Job postings and events

Never mark up content that is not on the page. Our [schema markup guide](/blog/schema-markup-guide-small-business) covers which types are worth the effort.

## 8. Link internally with intent

Internal links tell search engines what matters and help visitors go deeper. Check that:

- Every important page is reachable in a few clicks from the home page
- Anchor text describes the destination
- Orphan pages - reachable only from a sitemap - are linked from somewhere real
- Navigation uses real HTML links, not script-only interactions

Our [internal linking guide](/blog/internal-linking-strategy-guide) covers the strategy.

## 9. Handle errors properly

- 404 pages return a real 404 status, with a helpful page and a route back
- Removed content that has an equivalent gets a permanent redirect; content that does not, returns 404 or 410
- Redirect chains are collapsed to a single hop
- Soft 404s - empty pages returning a success status - are eliminated

## 10. Monitor rather than audit once

Set up Search Console and check monthly:

- Indexing report for pages excluded unexpectedly
- Core Web Vitals report
- Queries where you appear but get few clicks - usually a title problem
- Manual actions and security issues

## Common mistakes to avoid

- **A staging noindex left on production.** The single most damaging and most common error.
- **Blocking CSS or JavaScript in robots.txt.** Crawlers need to render the page.
- **Both www and non-www serving content.** Pick one.
- **Sitemaps generated once and never updated.**
- **Rewriting URLs without redirects.** It discards accumulated links.

## Frequently asked questions

### How often should I run a technical SEO audit?

A full audit once or twice a year, plus a monthly check of Search Console indexing and Core Web Vitals reports. Most damage is done by changes, so audit after any redesign or platform migration.

### Do I need an XML sitemap for a small site?

It helps, especially for new sites and pages with few internal links. Keep it accurate - only canonical, indexable URLs - and it costs nothing to maintain.

### Does site speed affect rankings?

Page experience, including Core Web Vitals, is part of how search engines evaluate pages, but relevance matters more. Speed is worth fixing primarily because slow pages lose visitors regardless of ranking.

### What is the most common technical SEO mistake?

A noindex tag or robots.txt disallow left over from staging, which removes the site from search entirely. Check both after every launch or migration.

## Next steps

Inspect three important URLs in Search Console, confirm they are indexed and canonical, and check robots.txt for anything blocking. Fix what you find before touching content.

If you would rather have this handled, our [digital marketing and SEO service](/services/digital-marketing-seo) covers the audit and the fixes.`,
  },
  {
    title: "Schema Markup: A Practical Guide for Small Sites",
    slug: "schema-markup-guide-small-business",
    excerpt:
      "Which structured data types are worth adding to a small business website, how to implement them safely, and the mistakes that trigger manual actions.",
    coverImage: "/blog-covers/schema-markup-guide-small-business.webp",
    publishedAt: "2026-04-03T05:30:00.000Z",
    art: {
      eyebrow: "SEO",
      coverHeadline: "Structured data, without the cargo cult",
      motif: "code",
      figure: {
        kind: "stack",
        title: "Worth adding, in order",
        items: [
          "Organisation and LocalBusiness",
          "Product with price and stock",
          "Article for blog content",
          "FAQ that is visible on the page",
          "Event, JobPosting, Breadcrumb",
        ],
        caption: "Mark up what is on the page. Never mark up what is not.",
      },
    },
    body: `Structured data is a way of telling search engines what a page contains in a format they can parse reliably. It does not make a page rank higher by itself. What it can do is change how the page is presented in results, and give search engines confident facts about your business.

This guide covers which types are worth the effort for a small site, and how to avoid the mistakes that turn structured data into a liability.

## The one rule that matters

**Mark up only what a visitor can see on the page.**

Every structured data guideline reduces to this. Marking up reviews you do not display, FAQs that are not on the page, or prices that differ from the visible price is a policy violation, and it can trigger a manual action that removes rich results across the site.

## Use JSON-LD

Three formats exist. Use JSON-LD - a script block in the page - because:

- It is the recommended format
- It is separate from your HTML, so redesigns do not break it
- It is far easier to validate and debug
- It can describe several entities in one block

## The types worth adding

### Organisation and LocalBusiness

The foundation. It tells search engines who you are:

- Legal name and the name customers use
- Logo, website, and social profiles
- Address, phone, and opening hours for a physical business
- Service area, for businesses that travel to customers

For a business with premises, use the most specific LocalBusiness subtype that fits. Keep it consistent with your Google Business Profile and your visible contact page - see the [local SEO checklist](/blog/local-seo-checklist-for-india).

![Priority stack of structured data types worth adding to a small business site](/blog-figures/schema-markup-guide-small-business.webp)

### Product

For any page selling a specific item:

- Name, description, image, brand
- Offer with price, currency, and availability
- Condition, if relevant
- Aggregate rating and reviews, **only if they are displayed on the page**

The price in the markup must match the visible price, including how tax is presented. Stale availability - marking something in stock when it is not - is a common cause of trust problems.

### Article

For blog posts and guides:

- Headline, description, and primary image
- Published and modified dates that are accurate
- Author, ideally a person with a real profile page
- Publisher, linked to your Organisation entity

Accurate modified dates matter. Bumping the date without changing the content is a pattern that gets noticed.

### FAQPage

For genuine question-and-answer content visible on the page. Use it when:

- The questions and answers are both rendered for every visitor
- The content is genuinely a set of questions, not marketing copy shaped into questions
- The page is not primarily a forum or a support ticket

Note that FAQ rich results are shown selectively and their visibility has changed over time. Add the markup because it describes your page accurately, not because it guarantees a result. Our [FAQ accordion guide](/blog/how-to-add-faq-accordion-to-website) covers the content side.

### BreadcrumbList

Cheap and useful. It helps search engines understand your hierarchy and can improve how the URL line appears in results. Add it wherever you show a breadcrumb trail - and show one on deep pages.

### Event and JobPosting

Worth adding if you publish either. Both can produce distinctive listings:

- **Event** - name, start and end times with timezone, location or virtual location, offers
- **JobPosting** - title, description, employment type, location, and salary range where you publish one

Keep both current. Expired events and filled roles left marked up are a common source of quality problems. See our [event calendar](/blog/how-to-add-event-calendar-to-website) and [careers page](/blog/how-to-build-careers-page-with-job-board) guides.

## What is usually not worth it

- **HowTo** on pages that are not step-by-step instructions
- **Review markup applied to your own business by yourself**, which is self-serving and against guidelines
- **Speakable, Course, and niche types** for a site that does not publish that content
- **Anything describing content you plan to add later**

## Implementation and validation

1. Add one type at a time.
2. Validate with the Rich Results Test for eligibility and the Schema Markup Validator for syntax.
3. Check Search Console's enhancement reports after a week for errors and warnings.
4. Fix errors; warnings are usually optional fields worth adding when you have them.
5. Re-check after any template change - redesigns break markup silently.

Connect your entities with identifiers so search engines understand they are the same thing: your Article's publisher should point to the same Organisation entity your homepage declares.

## Common mistakes to avoid

- **Marking up invisible content.** The most serious and most common violation.
- **Prices that do not match the page.** Especially after a sale ends.
- **Leaving expired events and filled jobs marked up.**
- **Multiple conflicting Organisation blocks** across templates.
- **Assuming markup will lift rankings.** It changes presentation, not relevance.

## Frequently asked questions

### Does schema markup improve rankings?

Not directly. It helps search engines understand your content and can make your result more prominent through rich results, which affects click-through. Relevance and quality still determine ranking.

### Which schema types should a small business add first?

Organisation or LocalBusiness on the site, BreadcrumbList on deep pages, Product on commerce pages, and Article on blog posts. Add FAQPage only where a genuine, visible FAQ exists.

### Can incorrect schema markup hurt my site?

Yes. Marking up content that is not visible, or prices and ratings that do not match the page, can trigger a manual action that removes rich results for the whole site until it is fixed.

### Do I need a developer to add structured data?

Not always. Many platforms emit basic markup automatically. What you do need is someone to validate it and check that it matches what the page actually shows.

## Next steps

Validate your homepage and one product page in the Rich Results Test, add Organisation and Breadcrumb markup if they are missing, and check Search Console's enhancement reports a week later.

If you want it implemented and monitored, our [digital marketing and SEO service](/services/digital-marketing-seo) covers structured data as part of a technical audit.`,
  },
  {
    title: "Local SEO Checklist for Indian Businesses",
    slug: "local-seo-checklist-for-india",
    excerpt:
      "Get found in local search: profile completeness, consistent business data, location pages that are not duplicates, reviews, and the signals that move rankings.",
    coverImage: "/blog-covers/local-seo-checklist-for-india.webp",
    publishedAt: "2026-04-07T05:30:00.000Z",
    art: {
      eyebrow: "SEO",
      coverHeadline: "Getting found by people two kilometres away",
      motif: "map",
      figure: {
        kind: "checklist",
        title: "Local search fundamentals",
        items: [
          "Verified, complete business profile",
          "Identical name, address, phone",
          "A real page per location",
          "Steady flow of genuine reviews",
          "Locally relevant content",
        ],
        caption:
          "Local ranking rewards consistency and proximity far more than clever tactics.",
      },
    },
    body: `Local search is where most small businesses get their highest-intent traffic. Someone searching for a service near them is usually ready to act today.

The work is unglamorous: getting your details right, keeping them consistent, and giving search engines a reason to trust that you exist where you say you do.

## 1. Claim and complete your business profile

Your Google Business Profile does more for local visibility than your website in many categories. Complete every field:

- Exact business name as it appears on your signage - no keyword stuffing
- Primary category chosen precisely, plus relevant secondary categories
- Full address, or a service area if you travel to customers
- Local phone number, not a national call centre number where a local one exists
- Website URL pointing to the relevant location page, not always the homepage
- Opening hours, plus special hours for holidays
- Attributes that apply - parking, accessibility, payment methods
- Photos of the actual premises, exterior and interior, updated periodically

Our [Google Business Profile guide](/blog/google-business-profile-optimization) covers the ongoing work in more detail.

## 2. Make your business details identical everywhere

Name, address, phone. These three must match exactly across:

- Your website's contact page and footer
- Your business profile
- Directories, marketplaces, and aggregators
- Social profiles
- Any listing you paid for

"Shop 4, MG Road" on one and "Shop No. 4, M.G. Road" on another are different strings. Consistency is a trust signal, and inconsistency dilutes it. Pick one canonical format, write it down, and use it everywhere.

![Checklist panel listing local SEO fundamentals for an Indian business](/blog-figures/local-seo-checklist-for-india.webp)

## 3. Build a real page per location

Multi-location businesses need more than a store list. Each location deserves a page carrying:

- The address as selectable text, with area and PIN code in the heading
- That branch's phone number and hours
- Photos of that specific branch
- Directions and parking guidance, with landmarks
- Services or stock specific to that branch
- Reviews from that location
- Genuinely local content - the neighbourhoods served, nearby landmarks, local delivery notes

Thin pages that differ only by the city name in the template will not rank. If you cannot write two paragraphs of genuinely local content for a branch, you probably do not need a page for it yet.

Use a [Store Locator](/tools/storelocator) to route visitors to those pages, and see our [store locator guide](/blog/how-to-add-store-locator-multiple-branches).

## 4. Earn reviews steadily

Review count, recency, and rating all matter for local visibility, and reviews are also the deciding factor for many customers.

- Ask every satisfied customer, in a consistent way, at the right moment
- Make it one tap - a short link or a QR code at the counter
- Never offer an incentive for a positive review; it violates platform policies
- Respond to every review, positive and negative, briefly and without defensiveness
- Watch for review velocity: a sudden burst looks manipulated

Display genuine reviews on your own site with the [Reviews widget](/tools/reviews) as well - see [product reviews and social proof](/blog/product-reviews-social-proof-placement-collection).

## 5. Get the on-page basics right

For each location page and your main service pages:

- Title that includes the service and the place, written naturally
- One H1 that matches
- Address in the page as text, not only in an image or map
- LocalBusiness structured data matching the visible details - see our [schema guide](/blog/schema-markup-guide-small-business)
- Internal links from your homepage and services to each location page

## 6. Publish content that is actually local

Generic service pages compete with everyone. Local content competes with far fewer:

- Service and area pages that name real neighbourhoods you serve
- Projects or case studies with the location stated
- Answers to questions specific to your area - delivery timelines, local regulations, seasonal issues
- Involvement in local events, if genuine

Avoid mass-produced pages naming every locality in the city. They are thin, they compete with each other, and they read as spam.

## 7. Build citations that matter

A handful of quality listings beats hundreds of low-value ones:

- Major national directories relevant to your industry
- Industry-specific bodies and associations
- Local chamber or trade listings
- Marketplaces where you actually sell

Ensure each carries identical business details and a link where allowed. Then stop - directory spamming has diminishing and sometimes negative returns.

## 8. Keep everything current

Local data decays. Set a quarterly review of:

- Hours, including upcoming festival closures
- Phone numbers still answered
- Photos still representative
- Services listed still offered
- Any branch that moved or closed

An out-of-date profile causes wasted trips, which cause bad reviews, which cost visibility.

## Common mistakes to avoid

- **Keyword-stuffed business names.** Against platform guidelines and a common cause of suspension.
- **A shared national phone number on every branch.** Local numbers perform better and get answered faster.
- **Duplicate location pages.** They compete with each other and rank for nothing.
- **Buying reviews.** Detectable, against policy, and reputationally fatal when discovered.
- **Ignoring negative reviews.** A calm, specific response is read by every future customer.

## Frequently asked questions

### How long does local SEO take to show results?

Profile completeness and consistency can show effects within weeks. Review accumulation and content-driven improvements typically take a few months. Competitive urban categories take longer.

### Do I need a separate page for each location?

Yes, if you want each location to rank in its own area, and only if you can give each page genuinely distinct content. A single thin duplicate per city helps nobody.

### How important are reviews for local ranking?

Very. Count, recency, rating, and your responses all contribute, and reviews are usually the deciding factor for the customer choosing between two nearby options.

### Should my business name include keywords?

No. Use the name on your signage and registration. Adding keywords to the profile name violates guidelines and is a frequent cause of suspension or edits by other users.

## Next steps

Audit your business details across every listing you can find and make them identical, then complete every field on your business profile and set a quarterly reminder to review hours and photos.

If you want this run for you, our [digital marketing and SEO service](/services/digital-marketing-seo) covers local search as part of the engagement.`,
  },
  {
    title: "Page Speed Optimization: What Actually Helps",
    slug: "page-speed-optimization-guide",
    excerpt:
      "Skip the score chasing. The changes that reliably make pages faster: images, fonts, third-party scripts, render blocking, and how to measure the real experience.",
    coverImage: "/blog-covers/page-speed-optimization-guide.webp",
    publishedAt: "2026-04-10T05:30:00.000Z",
    art: {
      eyebrow: "Performance",
      coverHeadline: "Fix the payload before chasing the score",
      motif: "speed",
      figure: {
        kind: "stack",
        title: "Highest impact first",
        items: [
          "Oversized images",
          "Third-party scripts",
          "Render-blocking CSS and fonts",
          "Layout shift from late content",
          "Server response time",
        ],
        caption:
          "Almost every slow page is slow for one of these five reasons.",
      },
    },
    body: `Page speed work goes wrong when it becomes score chasing. A tool gives a number, the number becomes the goal, and hours are spent on micro-optimisations while a four-megabyte hero image sits untouched.

This guide covers the changes that reliably make real pages faster for real visitors, in order of impact.

## Measure the right thing first

There are two kinds of measurement and you need both:

- **Lab data** - a synthetic test in a controlled environment. Useful for debugging and comparing changes, but it is not your visitors.
- **Field data** - what actual visitors experienced, aggregated over time. This is what matters and what page experience signals are based on.

If field data shows a problem that lab tests do not, trust the field. Your visitors are on mid-range phones, on mobile data, with browser extensions and background apps - not on a fast test machine.

Test on a mid-range Android device with a throttled connection. That is your median user in most markets.

## The five usual causes

### 1. Oversized images

Still the most common cause of slow pages by a wide margin:

- Serve images sized for their display size, with responsive variants
- Use modern formats - WebP or AVIF
- Compress with intent; visually lossless is usually far smaller than the default export
- Lazy load everything below the fold, and never lazy load the hero
- Always set width and height or an aspect ratio so nothing shifts

See our [image optimization guide](/blog/image-optimization-for-websites) for the full workflow.

![Priority stack showing the five most common causes of slow pages](/blog-figures/page-speed-optimization-guide.webp)

### 2. Third-party scripts

Analytics, chat, reviews, ads, heatmaps, consent platforms, social embeds, tag managers. Each one is a separate connection, a separate download, and a separate chance to block the main thread.

- Inventory everything currently loading. Most sites find tags nobody remembers adding.
- Remove anything without a named owner and a stated purpose
- Load what remains asynchronously, after content
- Defer non-essential scripts until interaction where possible
- Watch tag managers, which hide the real cost behind a single innocuous-looking tag

Our post on [measuring widget performance](/blog/measure-widget-performance) explains how to attribute cost to individual scripts.

### 3. Render-blocking CSS and fonts

- Inline the small amount of CSS needed for the first screen; load the rest asynchronously
- Remove unused CSS from large frameworks
- Limit web fonts to what you actually use - two families, two weights each, is plenty
- Use a font-display strategy that shows text immediately rather than hiding it
- Preload only the fonts used in the first screen
- Subset fonts to the character sets you need

Invisible text while a font loads is a self-inflicted delay.

### 4. Layout shift

Shifting layout is not only a metric problem - it causes mis-taps and lost sales:

- Reserve space for every image, video, iframe, and advert
- Reserve space for anything injected late: banners, consent notices, chat launchers
- Avoid inserting content above existing content after load
- Load fonts so the fallback and the final font have similar metrics

### 5. Server response time

If the server takes a long time to send the first byte, nothing else can start:

- Cache aggressively - full pages where possible, fragments otherwise
- Use a CDN so assets are served near the visitor
- Check database queries on the slowest templates
- Watch for shared hosting contention during peak periods

## What usually does not matter much

- Micro-tuning image quality from 82 to 80
- Removing a few kilobytes of unused CSS after the big wins are done
- Chasing a perfect lab score while field data is fine
- Switching frameworks for performance reasons alone

Do the five things above properly before spending time here.

## Build a habit, not a project

Performance regresses. Every new campaign adds a tag; every redesign adds a font.

- Set a performance budget - a page weight and script count you will not exceed
- Check field data monthly
- Review third-party scripts quarterly and remove the unused
- Test the key journeys on a real phone before every launch

## Common mistakes to avoid

- **Optimising the homepage only.** Most visitors land elsewhere.
- **Lazy loading the hero image.** It delays exactly the thing being measured.
- **Adding a tag manager and forgetting what is in it.**
- **Ignoring the consent banner's weight.** It often blocks first render.
- **Treating the score as the goal.** The goal is a page that feels instant on a normal phone.

## Frequently asked questions

### What is a good page load time?

Aim for the largest visible element to render within about two and a half seconds on a mid-range mobile connection, and for the page to respond promptly to the first interaction. Compare against your own field data over time rather than a single lab score.

### Do I need a CDN for a small site?

It helps if your visitors are geographically spread or your host is far from your audience. For a purely local business on a nearby server, caching and image discipline usually matter more.

### How much do third-party scripts slow a site?

Often more than everything else combined. Each adds a connection, a download, and main-thread work. Auditing and removing unused tags is usually the fastest available win after images.

### Should I focus on the score or the real experience?

The real experience. Use lab scores to debug and compare changes, but judge success by field data from actual visitors on actual devices.

## Next steps

Run one key page through a throttled mobile test, find the largest image and the heaviest third-party script, and fix those two things first. Then set a page weight budget so the gains do not evaporate.

[Start free](/signup) and keep your widgets light while you do it.`,
  },
  {
    title: "Image Optimization for Websites: A Complete Guide",
    slug: "image-optimization-for-websites",
    excerpt:
      "Formats, sizing, compression, responsive delivery, lazy loading, and alt text - a practical workflow that makes images fast without making them look bad.",
    coverImage: "/blog-covers/image-optimization-for-websites.webp",
    publishedAt: "2026-04-14T05:30:00.000Z",
    art: {
      eyebrow: "Performance",
      coverHeadline: "Images are most of your page weight",
      motif: "speed",
      figure: {
        kind: "flow",
        title: "The image workflow",
        items: [
          "Crop to purpose",
          "Resize to display size",
          "Convert and compress",
          "Deliver responsively",
        ],
        caption:
          "Do these four in order and most image performance problems disappear.",
      },
    },
    body: `Images are usually the largest part of a web page by bytes, and the easiest thing to get badly wrong. A photo straight from a phone camera can be several megabytes; the same photo, correctly prepared, can be under a hundred kilobytes and look identical on screen.

This is the workflow.

## Step 1: Crop to purpose

Before any technical work, decide what the image is for and crop accordingly:

- A product thumbnail needs the product filling the frame
- A hero needs a safe area where text will sit
- A team photo needs consistent framing across everyone
- A blog cover needs to survive being cropped to different ratios

Cropping is also compression: removing irrelevant background reduces both file size and cognitive load.

Standardise aspect ratios per use. Consistent ratios prevent ragged grids and make layout reservation trivial.

## Step 2: Resize to display size

The most common mistake is uploading at camera resolution and letting CSS shrink it. The browser still downloads every pixel.

- Determine the largest size the image is actually displayed at
- Export at roughly twice that for high-density screens
- Do not exceed that; a thumbnail shown at 400px does not need 4000px
- Generate a small set of widths for responsive delivery rather than one huge file

![Flow diagram showing the four-step image optimisation workflow](/blog-figures/image-optimization-for-websites.webp)

## Step 3: Choose the right format

- **WebP** - the sensible default for photos and graphics. Broad support, substantially smaller than JPEG at equivalent quality.
- **AVIF** - smaller still, with slightly narrower support and slower encoding. Good for large hero images where the saving is worth it.
- **JPEG** - the universal fallback for photographs.
- **PNG** - only when you need lossless output or genuine transparency in a non-photographic image.
- **SVG** - for logos, icons, and diagrams. Resolution-independent and usually tiny. Sanitise any SVG you did not create.

Avoid GIF for anything but the smallest animations; a short video file is dramatically smaller.

## Step 4: Compress with judgement

Quality settings are not linear. For most photographs, a WebP quality setting in the mid-seventies to mid-eighties is visually indistinguishable from the original at typical viewing sizes, at a fraction of the bytes.

- Compare at the actual display size, not zoomed to 400 per cent
- Push harder on background and decorative images
- Be gentler on product detail shots where texture is the point
- Strip metadata - camera information can be tens of kilobytes per image
- Watch for banding in gradients, which is where over-compression shows first

## Step 5: Deliver responsively

Serve a phone a phone-sized image:

- Provide multiple widths and let the browser choose
- Describe the layout accurately so the browser picks correctly
- Use art direction where the crop should change between phone and desktop, not just the size
- Serve modern formats with a fallback for older browsers

Most platforms and image CDNs do this automatically. Confirm it is actually happening by inspecting what a phone downloads.

## Step 6: Load at the right time

- **Lazy load** everything below the fold
- **Never lazy load** the largest element in the first screen; it delays exactly what is being measured
- **Preload** only the single hero image, if any
- **Decode asynchronously** so image decoding does not block interaction

## Step 7: Reserve the space

Always set explicit dimensions or an aspect ratio. This single practice prevents most layout shift:

- The browser can allocate the space before the image arrives
- The page does not jump under a reader's thumb
- Grids stay aligned while loading

## Step 8: Write alt text

Alt text is an accessibility requirement and an image-search input:

- Describe the subject and the relevant detail
- Skip "image of" and "photo of"
- Keep it reasonably short - roughly a sentence
- Use an empty alt attribute for decorative images so screen readers skip them
- Never stuff keywords; it reads badly when announced aloud

For product images, describe what distinguishes this image from the others in the set.

## Step 9: Name files sensibly

Descriptive, hyphenated filenames help image search and help your team:

- "walnut-dining-table-six-seater.webp" beats "IMG_20260114_113245.webp"
- Keep them lowercase and hyphen-separated
- Do not rename files after publishing unless you redirect them

## Step 10: Audit periodically

Image discipline decays as more people upload content:

- Check the heaviest pages quarterly
- Look for uploads that bypassed your pipeline
- Confirm responsive variants are actually being served
- Watch total page weight against your budget

## Common mistakes to avoid

- **Uploading at full camera resolution.** The single biggest cause of slow pages.
- **Using PNG for photographs.** It is many times larger with no visible benefit.
- **Lazy loading the hero.** It delays the metric you are trying to improve.
- **No width and height attributes.** Guaranteed layout shift.
- **Keyword-stuffed alt text.** Bad for users, and not effective anyway.

## Frequently asked questions

### What is the best image format for the web?

WebP is the sensible default for photos and graphics. AVIF is smaller still where support and encoding time allow. Keep JPEG as a fallback and use SVG for logos, icons, and diagrams.

### How much should I compress images?

Enough that the file is small and the difference is invisible at display size - for most photos that is a WebP quality setting in the mid-seventies to mid-eighties. Compare at actual size, not zoomed in.

### Should all images be lazy loaded?

No. Lazy load everything below the fold, but never the largest element in the first screen. Lazy loading the hero delays exactly the content the browser should prioritise.

### Does image alt text help SEO?

It helps image search and, more importantly, it is an accessibility requirement. Describe the image accurately; do not use it as a keyword slot.

## Next steps

Take your three heaviest pages, find the largest image on each, and run it through crop, resize, convert, compress. Then add width and height attributes everywhere so the layout stops shifting.

[Start free](/signup) and keep the widgets on those pages light too.`,
  },
  {
    title: "Internal Linking: A Practical Strategy Guide",
    slug: "internal-linking-strategy-guide",
    excerpt:
      "Internal links decide what search engines think your site is about and how deep visitors go. How to build a structure that helps both, without link spam.",
    coverImage: "/blog-covers/internal-linking-strategy-guide.webp",
    publishedAt: "2026-04-17T05:30:00.000Z",
    art: {
      eyebrow: "SEO",
      coverHeadline: "The links you control completely",
      motif: "search",
      figure: {
        kind: "flow",
        title: "Building the structure",
        items: [
          "Group pages into topics",
          "Pick a hub for each",
          "Link hub to detail and back",
          "Fix orphans and dead ends",
        ],
        caption:
          "Internal links are the only links you fully control. Use them deliberately.",
      },
    },
    body: `Internal links are the only links on the web you control completely. They decide which of your pages search engines treat as important, how easily crawlers reach your content, and whether a visitor who finished one page has a reason to read another.

Most sites do this by accident, through navigation and whatever the author remembered to link.

## What internal links actually do

Three jobs:

1. **Discovery.** A page with no internal links pointing to it may never be crawled properly, whatever your sitemap says.
2. **Importance.** Pages linked from many places, especially from prominent places, are treated as more important than pages linked from nowhere.
3. **Context.** The anchor text and surrounding words tell search engines what the destination page is about.

For visitors, they do a fourth job: they turn a single-page visit into a session.

## Step 1: Group your pages into topics

Before linking anything, map what you have. Group pages into topics that reflect how customers think:

- For a store: category, subcategory, product, buying guide
- For a service business: service, sub-service, location, case study
- For a content site: topic hub, individual guides, reference pages

Within each group, identify the one page you most want to rank for the broad term. That page is the hub.

![Flow diagram showing how to build an internal linking structure around topic hubs](/blog-figures/internal-linking-strategy-guide.webp)

## Step 2: Build hub and spoke

For each topic:

- The **hub** links to every detail page in the group, with descriptive anchor text
- Each **detail page** links back to the hub
- Detail pages link to each other where genuinely relevant, not exhaustively

This gives search engines a clear picture of which page covers the broad topic and which cover the specifics, and gives readers an obvious path in both directions.

Do not link every page to every other page. A page with sixty internal links in the body distributes almost nothing and reads badly.

## Step 3: Write anchor text that describes the destination

Anchor text is a strong hint about what the linked page is about:

- Use descriptive phrases: "our page speed guide" rather than "click here"
- Vary the wording naturally across links; identical anchors everywhere looks automated
- Do not stuff the exact target keyword into every anchor
- Make sure the link makes sense read aloud, out of context - screen reader users often navigate by link list

Avoid "read more" and "learn more" as the entire anchor. They tell nobody anything.

## Step 4: Link from within the content

Links in body copy are worth more, to both readers and crawlers, than links in a footer or sidebar template:

- Link at the point where the reader would naturally want the extra detail
- Two to five contextual links per article is usually right
- Prefer linking early in the page for the most important destination
- Do not interrupt a critical action - avoid links inside checkout flows

## Step 5: Find and fix the structural problems

Crawl your own site and look for:

- **Orphan pages** - pages with no internal links pointing to them. Link them from a relevant hub or accept they should be removed.
- **Deep pages** - anything more than three or four clicks from the homepage
- **Broken internal links** - they waste crawl budget and frustrate readers
- **Redirect chains** - update internal links to point at the final destination
- **Dead ends** - pages with no onward link

A simple site crawler will surface all five in an afternoon.

## Step 6: Use navigation deliberately

Navigation is internal linking at scale:

- Keep the main navigation focused on the pages that matter commercially
- Use real HTML links; script-only menus may not be followed
- Add breadcrumbs on deep pages - they help users and produce useful structured data, see our [schema guide](/blog/schema-markup-guide-small-business)
- Keep footer links purposeful; a footer with two hundred links dilutes everything

## Step 7: Maintain it

Internal linking decays as content grows:

- When publishing a new page, add links to it from at least two existing relevant pages
- When updating an old page, check whether newer content should be linked from it
- Review orphans quarterly
- Remove links to retired pages rather than leaving them redirecting

## Common mistakes to avoid

- **Linking only from navigation.** Contextual links carry more weight and more usefulness.
- **Identical exact-match anchor text everywhere.** It reads as manipulation.
- **Sixty links in a body paragraph.** Each one is worth less and none is noticed.
- **Publishing without inbound links.** The new page starts invisible.
- **Ignoring the reader.** A link that does not help the person reading is not worth the crawl benefit.

## Frequently asked questions

### How many internal links should a page have?

In body content, two to five contextual links for a typical article, more for a long guide. Template links in navigation and footer are separate. The test is whether each link helps the reader.

### Does anchor text matter for internal links?

Yes. It is a strong signal about the destination's topic, and it is what screen reader users hear when navigating by links. Use descriptive phrases and vary them naturally.

### What is an orphan page?

A page with no internal links pointing to it. It may be in your sitemap but is hard for crawlers to discover and impossible for visitors to find by browsing. Either link it from a relevant page or remove it.

### Should I link to the same page multiple times from one article?

Once is usually enough, at the most relevant point. Repeated links to the same destination add clutter without adding value.

## Next steps

Crawl your site, list every page with no inbound internal links, and link each from the most relevant hub. Then check that each of your top commercial pages is reachable within three clicks of the homepage.

If you want this mapped and executed, our [digital marketing and SEO service](/services/digital-marketing-seo) includes site structure work.`,
  },
];
