import type { BlogLibraryPost } from "./blog-library-types";

export const BLOG_POSTS_E: BlogLibraryPost[] = [
  {
    title: "How to Add a Store Locator for Multiple Branches",
    slug: "how-to-add-store-locator-multiple-branches",
    excerpt:
      "Help customers find the nearest branch: search, distance sorting, per-branch hours and directions, and the location data hygiene that makes it all work.",
    coverImage: "/blog-covers/how-to-add-store-locator-multiple-branches.webp",
    publishedAt: "2026-02-10T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Store locators that answer nearest, open, how do I get there",
      motif: "map",
      figure: {
        kind: "flow",
        title: "What a visitor needs, in order",
        items: [
          "Which branch is nearest",
          "Is it open right now",
          "What does it stock or do",
          "How do I get there",
        ],
        caption:
          "A locator that answers only the first question sends the visitor to the phone.",
      },
    },
    body: `Once a business has more than three locations, a single embedded map stops working. The pins overlap, the visitor cannot tell which branch is nearest, and nothing on the page says whether any of them is open right now.

A store locator answers four questions in sequence: which branch is nearest, is it open, does it have what I need, and how do I get there. This guide covers how to build one that answers all four.

## Step 1: Clean the location data first

A locator is a data product. Bad data produces confident, wrong answers. For each branch, record:

- Full postal address, formatted consistently
- Latitude and longitude, verified on a map rather than guessed
- Phone number specific to that branch
- Opening hours, including weekly offs and regional holidays
- Services or stock available there, if branches differ
- Parking, entrance, and accessibility notes
- A landmark line, because that is how people actually navigate

Verify the coordinates by dropping each pin and checking the building. A pin on the wrong side of a divided road can add fifteen minutes to a journey.

![Flow diagram showing the four questions a store locator must answer in order](/blog-figures/how-to-add-store-locator-multiple-branches.webp)

## Step 2: Sort by distance, not by alphabet

Visitors want the nearest branch, not the first one alphabetically. The [Store Locator widget](/tools/storelocator) pairs an interactive map with a synchronised list, so selecting a pin highlights the entry and vice versa.

Get these behaviours right:

- **Search by PIN code, city, or area name**, because most people know their PIN code but not their coordinates
- **Optional geolocation**, requested only when the visitor asks for "near me", never on page load
- **Distance shown per result**, so the ranking is explainable
- **A sensible default view** when nothing is searched - usually all branches, zoomed to fit

Never demand location permission before showing anything. A permission prompt on arrival is the fastest way to lose a visitor who was ready to walk in.

## Step 3: Put the decisive facts in the list item

Each result should carry enough information to decide without opening a detail page:

- Branch name and area
- Distance from the searched location
- Open or closed right now, with the next transition time
- Phone number as a tap-to-call link
- A directions action that opens the native maps app
- Any branch-specific note - service centre, pickup point, weekend-only

Pair the locator with a [Business Hours widget](/tools/hours) per branch so the open state stays accurate through holidays.

## Step 4: Give every branch its own page

A locator is a finding tool. A branch page is what search engines rank and what customers link to.

Each location page should carry:

- The address as selectable text, with the area and PIN code in the heading
- Hours, phone, and a directions action
- Photos of the actual storefront, so people recognise it from the road
- Staff or manager name if you want it to feel local
- Reviews specific to that branch
- A short paragraph of genuinely local content - parking advice, nearby landmarks, what this branch is known for

Thin duplicate pages with only the address swapped will not rank. Our [local SEO checklist](/blog/local-seo-checklist-for-india) covers what to publish per location.

## Step 5: Handle the awkward cases

Real branch networks are messy. Decide in advance what happens when:

- **A search returns nothing nearby.** Show the closest few anyway, with distance, plus an online alternative.
- **Two branches are equidistant.** Break the tie by opening status, then by services.
- **A branch is temporarily closed.** Say so on the pin, the list, and the branch page. Do not just hide it - people will search for it.
- **A branch moves.** Redirect the old page rather than deleting it.
- **Geolocation is denied.** Fall back to the search box without an error message.

## Step 6: Keep it fast

A locator loads map tiles, marker data, and a list. On a phone, in a shop doorway, on a weak connection, that has to be quick:

- Load the list from lightweight data first, then the map
- Lazy load the map if the locator is below the fold
- Reserve the map's space so the list does not jump when it arrives
- Cap results per page and let the visitor load more

See [protecting Core Web Vitals with widgets](/blog/core-web-vitals-lightweight-widgets) for the measurement approach.

## Common mistakes to avoid

- **Requesting location permission on page load.** Ask when the visitor taps "near me".
- **Listing branches alphabetically.** Nobody wants the branch that starts with A.
- **One phone number for every branch.** Local numbers get answered; central numbers get queued.
- **Hiding closed branches.** People search for a branch they know; tell them it is closed.
- **No directions action.** An address without a directions link makes the visitor do the work twice.

## Frequently asked questions

### How many locations before I need a store locator?

Around four. Up to three, a simple list with addresses, hours, and directions links is faster to use and faster to load. Beyond that, visitors need search and distance sorting.

### Should each store have its own page?

Yes, if you want local search visibility. Each page needs genuinely local content - hours, photos, parking, reviews - not just the address swapped into a template.

### Should the locator ask for the visitor's location automatically?

No. Provide a search box by default and offer a "use my location" action. Automatic permission prompts on arrival are dismissed by most visitors and can block the content behind them.

### What if a branch is temporarily closed?

Show it with a clear closed status and the expected reopening date on the pin, in the list, and on the branch page. Hiding it makes people think the business has shut down.

## Next steps

Audit your branch data for accurate coordinates and hours, publish it with the [Store Locator widget](/tools/storelocator), and give each branch its own page with genuinely local content.

[Start free](/signup) and get your locations findable.`,
  },
  {
    title: "How to Add a Cookie Consent Banner",
    slug: "how-to-add-cookie-consent-banner",
    excerpt:
      "Add a cookie banner that respects visitors and your obligations: what actually needs consent, how to design the choice fairly, and how to avoid the dark patterns.",
    coverImage: "/blog-covers/how-to-add-cookie-consent-banner.webp",
    publishedAt: "2026-02-13T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Consent banners that are honest and quick to dismiss",
      motif: "shield",
      figure: {
        kind: "compare",
        title: "Fair consent vs dark pattern",
        items: [
          "Accept and reject equally prominent",
          "Non-essential scripts held until consent",
          "Choice remembered and revocable",
          "Plain-language category descriptions",
        ],
        items2: [
          "A greyed-out reject link",
          "Trackers firing before the click",
          "The banner returning every page",
          "Legal jargon nobody reads",
        ],
        caption:
          "A banner that nags but does not gate anything is the worst of both worlds.",
      },
    },
    body: `Most cookie banners achieve nothing except annoyance. They appear after the trackers have already fired, they make "accept" a big button and "reject" a grey link, and they reappear on every page because nobody stored the choice.

A banner is only worth adding if it actually controls what runs. This guide covers how to do that without turning your homepage into a legal document.

## Step 1: Find out what you are actually setting

Before designing anything, audit what your site stores on a visitor's device. Open your browser's storage inspector on a clean profile and list:

- Cookies set by your own domain
- Cookies set by third parties - analytics, ad platforms, chat, embeds, video players
- Local storage and session storage entries
- Anything set before the visitor interacts with the page

Then classify each one:

- **Strictly necessary** - session, cart, login, security, load balancing. No consent needed.
- **Functional** - language, region, saved preferences. Usually a light touch.
- **Analytics** - measurement of usage.
- **Marketing** - advertising, retargeting, cross-site identity.

Most sites discover a handful of third-party cookies nobody remembers adding. Removing an unused tag is faster than obtaining consent for it, and it speeds the page up.

![Comparison panel contrasting a fair consent banner with common dark patterns](/blog-figures/how-to-add-cookie-consent-banner.webp)

## Step 2: Understand what your obligation actually is

Rules differ by jurisdiction, and they change. What is broadly consistent:

- Strictly necessary storage does not require consent
- Analytics and marketing storage generally does, in consent-based regimes
- Consent must be informed, specific, freely given, and as easy to withdraw as to give
- Pre-ticked boxes do not count as consent
- You must be able to show what a visitor consented to and when

India's Digital Personal Data Protection framework, the EU and UK regimes, and various other markets each have their own specifics. If you sell across borders, get advice on the combination that applies to you rather than copying a competitor's banner. Our [privacy compliance guide for websites](/blog/website-privacy-compliance-india) covers the wider picture. This article is practical guidance, not legal advice.

## Step 3: Design the choice fairly

The banner should present a genuine choice:

- **Equal prominence.** If "Accept all" is a filled button, "Reject all" must be a filled button too. Same size, same weight, same contrast.
- **Reject in one click.** Requiring a trip into a settings panel to decline is a pattern regulators have repeatedly criticised.
- **Plain language.** "We use cookies to measure how the site is used and to show relevant ads" beats a paragraph of statute references.
- **Category granularity.** Analytics and marketing as separate toggles, both off by default.
- **A link to the full policy** for people who want detail.

Keep the banner small. It should not cover the content on a phone, and it must never block the page for someone who wants to read your returns policy.

## Step 4: Actually gate the scripts

This is the part most implementations skip. If your analytics and ad tags load in the page head regardless of the banner, the banner is decoration.

- Hold non-essential scripts until consent is recorded
- Load them immediately on acceptance, without a page reload
- Do not load them at all on rejection
- Remove or expire previously set cookies when consent is withdrawn

The [Cookie Consent widget](/tools/cookie) stores the visitor's choice and remembers it across pages so the banner does not reappear on every navigation, which is the second most common complaint after the banner itself.

## Step 5: Store and honour the choice

- Persist the decision for a sensible period - many regimes expect re-consent within six to twelve months
- Record what was consented to, when, and against which banner version
- Provide a permanent way to change the choice, such as a footer link
- Re-ask when your categories or vendors change materially

A visitor who declines and then sees the banner again on the next page will assume you ignored them, and they will be right.

## Step 6: Keep it fast and accessible

- The banner must be keyboard-reachable, with focus moved into it when it appears
- Escape or the reject action should dismiss it
- It must meet contrast requirements
- It should not shift the layout of the page underneath
- It should not be the largest script on your site

See our [website accessibility checklist](/blog/website-accessibility-checklist-wcag) for the wider requirements.

## Common mistakes to avoid

- **A banner over trackers that already fired.** The most common and most pointless implementation.
- **Reject hidden behind "manage preferences".** Widely treated as invalid consent.
- **Pre-ticked category toggles.** Consent must be opt-in.
- **No way to change your mind.** Withdrawal must be as easy as consent.
- **A full-screen wall on mobile.** It blocks content and increases bounce without improving compliance.

## Frequently asked questions

### Do I need a cookie banner if I only use Google Analytics?

In consent-based regimes, analytics cookies generally require consent. The safest and simplest route is to hold analytics until consent, or to use a measurement approach that does not store identifiers on the visitor's device.

### Can I make the accept button bigger than reject?

Regulators in several markets have treated unequal prominence as invalid consent. Keep both actions visually equal and available in one click.

### How long should consent last?

Commonly six to twelve months, after which you re-ask. Also re-ask whenever you add a new vendor category or materially change what you collect.

### Does a cookie banner slow down my site?

A well-built one adds a small script and a rendered banner. A poorly built one loads a heavy consent platform, blocks rendering, and shifts layout. Keep it light and measure the difference.

## Next steps

Audit what your site actually stores, delete the tags nobody uses, and publish an honest banner with the [Cookie Consent widget](/tools/cookie) that genuinely holds non-essential scripts until the visitor chooses.

[Start free](/signup) and get consent handled properly.`,
  },
  {
    title: "How to Add an Age Verification Gate",
    slug: "how-to-add-age-verification-gate",
    excerpt:
      "Add an age gate that meets your obligations without destroying traffic: when it is required, how to design it, and how to keep search engines able to crawl.",
    coverImage: "/blog-covers/how-to-add-age-verification-gate.webp",
    publishedAt: "2026-02-17T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Age gates that comply without blocking everything",
      motif: "shield",
      figure: {
        kind: "checklist",
        title: "A workable age gate",
        items: [
          "Only on pages that need it",
          "Choice remembered, not re-asked",
          "Clear exit for under-age visitors",
          "Keyboard and screen-reader usable",
          "Content still crawlable",
        ],
        caption:
          "Gate the products, not the homepage, unless the law says otherwise.",
      },
    },
    body: `An age gate is a blunt instrument. It costs you traffic, it annoys returning customers, and it stops nobody who is determined. It is also a legal requirement in several categories, and a reasonable signal of good faith in others.

This guide covers how to implement one that meets your obligation with the least collateral damage.

## Step 1: Confirm whether you actually need one

Age verification requirements vary by product category and jurisdiction. Categories that commonly carry restrictions include alcohol, tobacco and vaping, gambling, adult content, certain supplements, weapons and knives, and some financial products.

Before adding a gate, establish:

- Which specific products or pages are restricted
- What the minimum age is in each market you serve
- Whether a self-declaration is sufficient or whether verified proof is required at purchase
- What your payment provider and marketplace terms require

Note the difference between a **gate** - a self-declared check at the door - and **verification** - a documented check, usually at checkout or delivery. A gate does not satisfy a verification requirement. This article is practical guidance, not legal advice; confirm your obligations for your category and markets.

![Checklist panel listing the requirements of a workable age gate](/blog-figures/how-to-add-age-verification-gate.webp)

## Step 2: Gate the narrowest surface that satisfies the rule

The instinct is to gate the homepage. That is usually the most expensive choice and often not required.

Prefer, in order:

1. **Gate only restricted product and category pages.** Everything else - about, contact, blog, delivery information - stays open.
2. **Gate at add-to-cart** if the rule allows it, so browsing is unrestricted.
3. **Gate the whole site** only when the category or jurisdiction genuinely requires it.

A site-wide gate blocks people looking for your phone number, your address, and your careers page, none of which needs protecting.

## Step 3: Design the gate itself

The [Age Verification widget](/tools/agegate) provides a configurable gate. Set it up carefully:

- **State why.** One line: "You must be 21 or over to view this section."
- **Ask once, clearly.** A date-of-birth entry or a yes/no confirmation, not a puzzle.
- **Give a real exit.** The "no" path must go somewhere sensible - a general page, or an explanation - not a dead end or a loop.
- **Do not pre-fill or default to yes.**
- **Match your brand** so it does not look like a phishing interstitial.
- **Keep it small** - it should not require scrolling on a phone.

Follow the [embed snippet guide](/help/installing-embed-snippet) to place it.

## Step 4: Remember the answer

Re-asking on every page turns a legal requirement into a usability disaster:

- Store the confirmation for a reasonable period
- Do not re-prompt within the same session
- Re-ask after a sensible expiry, or when the visitor changes region if age limits differ
- Make sure the stored flag survives navigation between category pages

If you set a cookie or storage entry for this, mention it in your cookie policy. Whether it counts as strictly necessary depends on your jurisdiction; a gate required by law is usually treated as necessary, but check.

## Step 5: Keep it accessible

A modal that blocks the page must be usable by everyone:

- Move focus into the dialog when it opens
- Trap focus inside it while open
- Label the dialog and its controls properly for screen readers
- Ensure it works at 200 per cent zoom and with a keyboard alone
- Never rely on colour alone to indicate the actions

An inaccessible gate does not just exclude people - it can create its own compliance problem. See our [accessibility checklist](/blog/website-accessibility-checklist-wcag).

## Step 6: Do not block search engines from your content

A badly implemented gate can make your site invisible:

- Server-rendered content should remain in the HTML, with the gate as an overlay, rather than the page being empty until confirmation
- Do not redirect crawlers to a gate page that contains no content
- Do not serve different content to crawlers than to users - that is cloaking
- Check the rendered page in a search console URL inspection tool after launch

If your product pages disappear from search after adding a gate, the gate is removing the content rather than overlaying it.

## Common mistakes to avoid

- **Gating the entire site by reflex.** Gate what the rule covers.
- **Re-asking on every page.** Store the answer.
- **A dead-end "no" path.** Send under-age visitors somewhere real.
- **Treating a self-declared gate as verification.** They are different obligations.
- **An overlay that traps keyboard focus incorrectly.** Test with the Tab key only.

## Frequently asked questions

### Does an age gate actually stop under-age visitors?

A self-declared gate does not prevent anyone determined. It documents that you asked, which is what most category rules require at the browsing stage. Genuine verification, where required, happens at checkout or delivery.

### Will an age gate hurt my SEO?

It will if it replaces your page content rather than overlaying it. Keep the content server-rendered in the HTML with the gate as an overlay, and verify with a URL inspection tool that the page still renders for crawlers.

### Should the age gate cover my whole site?

Only if your category and jurisdiction require it. Gating just the restricted product and category pages preserves traffic to your contact, delivery, and content pages.

### How long should the confirmation be remembered?

Long enough that a returning visitor is not re-prompted during normal browsing - typically the session at minimum, and often up to thirty days. Re-ask when the region or applicable age limit changes.

## Next steps

Confirm which pages your category actually requires you to gate, implement the narrowest gate with the [Age Verification widget](/tools/agegate), store the answer, and verify with a URL inspection that your product pages still render for search engines.

[Start free](/signup) and add a gate that does not cost you the rest of your traffic.`,
  },
  {
    title: "How to Add a Testimonial Slider to Your Site",
    slug: "how-to-add-testimonial-slider-to-your-site",
    excerpt:
      "Collect testimonials worth showing, present them so visitors believe them, and place the slider where it removes doubt instead of decorating a section.",
    coverImage: "/blog-covers/how-to-add-testimonial-slider-to-your-site.webp",
    publishedAt: "2026-02-20T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Testimonials people actually believe",
      motif: "stars",
      figure: {
        kind: "checklist",
        title: "What makes a testimonial credible",
        items: [
          "Full name and real role",
          "A specific problem and result",
          "Recent date shown",
          "The customer's own words",
          "Placed beside the matching claim",
        ],
        caption:
          "Anonymous praise reads as fabricated, however genuine it actually is.",
      },
    },
    body: `Nearly every website has a testimonials section, and nearly every one is ignored. Three anonymous quotes, all five stars, all saying "great service", rotating on a timer nobody can pause.

The problem is not the format. It is that the quotes carry no information. This guide covers how to collect testimonials that are worth reading and present them so visitors believe them.

## What makes a testimonial credible

A believable testimonial has four properties:

- **Attribution.** A full name, a role, and a company or city. "Priya S." is barely better than anonymous.
- **Specificity.** A named problem, what was done, and what changed. "They fixed our checkout in a week and card failures stopped" beats "excellent team".
- **Recency.** A date, visible. A glowing quote from four years ago raises questions.
- **Imperfection.** The occasional honest caveat - "the first draft missed the mark, but they turned it around" - makes the whole set more believable, not less.

Uniformly perfect five-star praise reads as curated at best and fabricated at worst.

![Checklist panel listing the properties that make a testimonial credible](/blog-figures/how-to-add-testimonial-slider-to-your-site.webp)

## Step 1: Ask at the right moment

Most testimonial requests fail because of timing. Ask when the value is fresh:

- Immediately after a successful delivery or a resolved support case
- After a positive review elsewhere - ask if you may quote it
- At a renewal or repeat purchase
- After a milestone the customer mentions themselves

Never ask during an open issue, and never ask twice.

## Step 2: Ask questions that produce useful answers

"Would you write us a testimonial?" produces "great service, highly recommended". Instead, ask three specific questions and let the customer answer in their own words:

1. What problem were you trying to solve before you found us?
2. What changed after?
3. What would you tell someone considering us?

Then offer to edit the answers into a short quote and send it back for approval. Most people will happily approve a quote they would never have written.

## Step 3: Get permission properly

- Ask explicitly whether you can use the name, role, company, and photo
- Confirm in writing, even informally
- Tell them where it will appear
- Honour removal requests promptly

Never invent, embellish, or attribute a quote to someone who did not say it. Fabricated testimonials are a consumer protection issue in most markets, and they are usually obvious.

## Step 4: Present them well

The [Testimonial and Reviews widget](/tools/reviews) supports grid, carousel, and list layouts. Choose deliberately:

- **Grid** when you want several quotes read at once - strongest on a landing page
- **List** when quotes are long and detailed - strongest on a service page
- **Carousel** when space is tight, with these rules: no autoplay, visible controls, pause on interaction, and a position indicator

Autoplaying carousels move the quote away mid-sentence. If you use rotation, make it slow and stoppable.

Add a photo where you have permission - a real face increases credibility more than a star rating does.

## Step 5: Place each testimonial next to the claim it supports

The biggest gain is not in the quotes; it is in the placement. A generic testimonial wall at the bottom of the homepage is decoration. A quote about fast delivery, placed next to your delivery promise, is evidence.

- Delivery quote beside the shipping information
- Support quote beside the support commitment
- Result quote beside the pricing or the enquiry form
- Product-specific quote on that product page

Our post on [social proof types and placement](/blog/social-proof-types-and-placement) covers which proof belongs where, and [product reviews and social proof](/blog/product-reviews-social-proof-placement-collection) covers the collection side in depth.

## Step 6: Keep the set fresh and honest

- Review quarterly and retire quotes older than about eighteen months unless they are exceptional
- Rotate in new ones as projects complete
- Keep a mix of customer types so different visitors see themselves
- Never delete a negative review from a public platform and replace it with a curated quote on your own site - visitors compare

## Common mistakes to avoid

- **Anonymous quotes.** They read as invented.
- **Autoplaying carousels with no pause.** They are an accessibility failure and a reading failure.
- **Only five-star praise.** Perfection is suspicious.
- **A testimonial wall far from any decision.** Proof works at the point of doubt.
- **Stock photos as customer faces.** If someone reverse-searches one image, the whole page loses credibility.

## Frequently asked questions

### How many testimonials should I show?

Three to six on a page, chosen to match the doubts on that page. A long wall of quotes is skimmed and ignored; a few specific, well-placed quotes are read.

### Should testimonials autoplay in a carousel?

No. Autoplay moves text away while people are reading it and causes accessibility problems. If you rotate, provide visible controls, pause on interaction, and keep the interval long.

### Can I edit a customer's testimonial?

You can tighten it for length and clarity, but you must not change its meaning, and you should send the edited version back for approval before publishing.

### What if I have no testimonials yet?

Use other evidence: completed project counts, before and after comparisons, named clients with permission, or a detailed case study. Do not invent quotes to fill the section.

## Next steps

Email your last five happy customers the three questions above, edit their answers into short quotes, get approval, and publish them with the [Reviews widget](/tools/reviews) beside the claims they support.

[Start free](/signup) and replace anonymous praise with real evidence.`,
  },
  {
    title: "What Belongs Above the Fold on a Homepage",
    slug: "what-belongs-above-the-fold-on-homepage",
    excerpt:
      "The first screen decides whether visitors stay. What to include, what to cut, and how to test whether your hero is doing its job on a real phone.",
    coverImage: "/blog-covers/what-belongs-above-the-fold-on-homepage.webp",
    publishedAt: "2026-02-24T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "The first screen has one job",
      motif: "grid",
      figure: {
        kind: "stack",
        title: "First screen, in priority order",
        items: [
          "What you sell, in plain words",
          "Who it is for",
          "One primary action",
          "One piece of proof",
          "A route to browse",
        ],
        caption:
          "Everything else can wait for the second screen. Almost nothing has to be in the first.",
      },
    },
    body: `The first screen is not where you win a customer. It is where you avoid losing one. A visitor arrives with a question - can this business do the thing I need? - and the first screen either answers it or sends them back to the results page.

This guide covers what earns a place above the fold, what does not, and how to check the difference honestly.

## The fold still exists, just not where you think

"Above the fold" no longer means a fixed pixel height. It means whatever a visitor sees before deciding to scroll, on their device, with their browser chrome, at their text size.

On a typical phone that is a surprisingly small area, and a sticky header, a cookie banner, and a promo bar can eat half of it. Measure your real first screen on a mid-range phone rather than on a large desktop monitor.

## The five things that earn the space

In priority order:

1. **What you sell, in plain words.** Not a slogan. A visitor should be able to describe your business after five seconds.
2. **Who it is for.** A qualifier removes the wrong visitors and reassures the right ones: "for Shopify stores", "for clinics in Pune", "for teams of 5 to 50".
3. **One primary action.** Buy, browse, enquire, book. One. A second competing button reduces the click rate of the first.
4. **One piece of proof.** A named client, a rating with a real count, a specific number. One line, not a logo wall.
5. **A route to browse.** Navigation or a category entry point, for people not ready for the primary action.

That is the whole list. Everything else is second-screen material.

![Priority stack showing what belongs on the first screen of a homepage](/blog-figures/what-belongs-above-the-fold-on-homepage.webp)

## What does not belong

- **A carousel of rotating banners.** Only the first slide is seen by most visitors, and rotation moves content away mid-read.
- **A full-screen video with no controls.** It is heavy, it distracts, and it delays the headline.
- **An immediate popup.** Interrupting before the visitor has read anything is the fastest way to a bounce. See [popups that convert without annoying visitors](/blog/popups-without-annoying-visitors).
- **A logo wall.** Move it below; one named reference above is stronger than twelve grey logos.
- **Award badges from 2019.** Old proof reads as no recent proof.
- **A mission statement.** Nobody arrives wanting your mission.

## Write the headline like a person

Most homepage headlines fail because they describe an aspiration rather than an offering. Test yours against three questions:

- Would a competitor's site work equally well with this headline? If yes, it says nothing.
- Does it contain a word your customers would not use? Replace it.
- Can someone unfamiliar with your industry understand it? If not, it filters the wrong people.

"Handmade cotton bedsheets, shipped across India in 3 days" beats "Redefining comfort". One is a business; the other is a mood.

Our guide to [landing page copy](/blog/landing-page-copy-converts) goes deeper on structure.

## Make the primary action unmistakable

- Label it with the action and the outcome: "Get a quote", "See pricing", "Book a fitting"
- One visually dominant button; make any secondary action visually quieter
- Keep it visible without scrolling on a phone
- Make it big enough for a thumb, with space around it
- Never place it where a sticky bar will cover it

If your primary action is an enquiry, a short [contact form](/tools/form) inline can outperform a button that leads to a separate page.

## Protect the load

A slow first screen is a broken first screen. The headline should be text, not an image. The hero image should be sized for the device and should not push the headline down while it loads.

- Reserve space for the hero image so nothing shifts
- Preload only the single image that appears first
- Do not let a chat widget, a promo bar, or a consent banner render before the headline
- Keep fonts from blocking text rendering

Our post on [Core Web Vitals with third-party widgets](/blog/core-web-vitals-lightweight-widgets) covers the mechanics.

## How to test whether it works

Two cheap tests, both better than an opinion:

**The five-second test.** Show the first screen to someone unfamiliar with your business for five seconds, then ask: what does this company sell, who is it for, and what would you do next? If they cannot answer all three, the screen has failed.

**The thumb test.** Load the homepage on a mid-range phone on a normal connection. Without scrolling, can you read the headline, see the action, and tap it comfortably?

Then measure: scroll depth past the first screen, click rate on the primary action, and bounce rate for new visitors from search.

## Common mistakes to avoid

- **Two equally weighted calls to action.** Choose.
- **A headline that only makes sense if you already know the brand.**
- **Sticky elements stacking up.** Header, promo bar, cookie banner, chat launcher - suddenly the content is a strip.
- **Testing only on desktop.** Most of your traffic is not on desktop.
- **Changing the hero every quarter without measuring.** You will never know what worked.

## Frequently asked questions

### How long should a homepage headline be?

One line that a stranger can read and understand in about three seconds - usually six to twelve words. If it needs a second line, that line should be a supporting sentence, not more headline.

### Should the homepage have one call to action or several?

One primary action, visually dominant. Secondary routes should exist but must be quieter. Two equally weighted buttons split attention and reduce total clicks.

### Is a hero carousel bad for conversion?

Usually. Most visitors see only the first slide, rotation moves content away while being read, and each additional slide adds weight. A single strong hero with one message performs better in most tests.

### What about the cookie banner and promo bar?

Count them as part of the first screen, because they occupy it. If a banner, a bar, and a header together push your headline off a phone screen, something has to go.

## Next steps

Load your homepage on a phone, screenshot the first screen exactly as it appears, and check it against the five items above. Cut anything that is not one of them, then run the five-second test on someone outside your team.

[Start free](/signup) and rebuild your first screen around one clear promise.`,
  },
  {
    title: "Product Page Optimization: A Practical Checklist",
    slug: "product-page-optimization-checklist",
    excerpt:
      "A working checklist for product pages: images, variants, delivery clarity, proof placement, and the objection handling that turns browsers into buyers.",
    coverImage: "/blog-covers/product-page-optimization-checklist.webp",
    publishedAt: "2026-02-27T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "The page where the decision is actually made",
      motif: "cart",
      figure: {
        kind: "checklist",
        title: "Product page essentials",
        items: [
          "Images that show scale and detail",
          "Variant state reflected everywhere",
          "Delivery cost and date before cart",
          "Proof beside the relevant claim",
          "Objections answered on the page",
        ],
        caption:
          "Read your product page in the order a cautious first-time buyer would.",
      },
    },
    body: `The product page is where the decision happens. Everything before it is traffic; everything after it is logistics. Yet most product pages are built as a template to be filled rather than as an argument to be made.

This checklist works through the page in the order a cautious first-time buyer reads it.

## 1. The images have to answer physical questions

A buyer cannot touch the product, so images do that work:

- **Scale.** Something recognisable for size, or the product in a real setting
- **Detail.** Close-ups of texture, stitching, finish, ports, joins
- **Use.** The product being used by a person, not floating on white
- **Variation.** Every colour and size option actually shown
- **Honesty.** The flaws visible too. A returned item costs more than a lost sale

Compress properly and reserve the aspect ratio so the page does not jump. See our [image optimization guide](/blog/image-optimization-for-websites).

## 2. Title and price must be unambiguous

- The title should include the attributes people search for: material, size, quantity, compatibility
- The price should be the price. If tax or delivery is added later, say so here
- Show the per-unit price for multipacks
- If a discount is shown, the reference price must be a price you actually charged

## 3. Variants must update everything

Selecting a variant should change the image, the price, the stock status, and ideally the URL. Common failures:

- The image stays on the default colour
- The price updates but the delivery estimate does not
- Unavailable combinations are selectable and fail at add-to-cart
- The variant is not reflected in the URL, so a shared link loses the selection

Label variants in customer language. "Charcoal" needs a swatch; "Size 3" needs a size guide.

![Checklist panel listing the essentials of a high-performing product page](/blog-figures/product-page-optimization-checklist.webp)

## 4. Answer delivery before the cart

Delivery uncertainty is one of the largest causes of abandonment, and the cheapest to fix:

- Show the delivery cost, or the threshold for free delivery
- Show an estimated delivery date, not a vague range
- Let the buyer check serviceability by PIN code if coverage varies
- State cash-on-delivery availability if you offer it
- Name the return window and who pays return shipping

Every one of these answered on the product page is a question that never becomes an abandoned cart. See [reducing cart abandonment without discounts](/blog/reduce-cart-abandonment-without-discounts).

## 5. Put proof beside the claim

Reviews at the bottom of the page are proof in the wrong place. Distribute it:

- A rating summary near the title
- A quote about fit beside the size guide
- A quote about durability beside the material description
- Customer photos in the gallery, clearly marked as customer photos

Use the [Reviews widget](/tools/reviews) and see [social proof types and placement](/blog/social-proof-types-and-placement) for the full mapping.

## 6. Handle objections on the page

List the reasons someone would not buy, then answer each one where it arises:

- "Will it fit?" - size guide, dimensions, comparison to a known object
- "Is it genuine?" - warranty, brand authorisation, invoice details
- "What if it is wrong?" - return process in two sentences
- "Is it worth the price?" - what is included, cost per use, comparison
- "Will it work with mine?" - compatibility list

A short [FAQ accordion](/tools/faq) with the five real objections outperforms a long description that answers none of them.

## 7. Make the add-to-cart action obvious and honest

- One primary action, visible without scrolling on a phone
- Stock status stated plainly - "In stock", "Ships in 3 days", "Sold out"
- Quantity control that is easy to use with a thumb
- Clear feedback when the item is added, without hijacking the page
- No surprise upsell modal that blocks the flow

If something is out of stock, offer a notify option rather than a dead button.

## 8. Give a route to a human

Some questions cannot be answered by a page. A [WhatsApp chat](/tools/whatsapp) button on high-consideration products lets a buyer ask "will this fit my model?" and get an answer while they are still on the page. See the [WhatsApp widget playbook](/blog/whatsapp-widget-playbook-online-stores).

## 9. Keep the page fast

Product pages accumulate scripts: reviews, chat, recommendations, analytics, ads. Audit them quarterly and remove anything that does not earn its weight. Our [widget performance guide](/blog/measure-widget-performance) shows how to measure the real cost.

## Common mistakes to avoid

- **Descriptions written for search engines.** Buyers read the description; write it for them.
- **Specifications hidden behind a tab nobody opens.**
- **Delivery information only in the footer policy page.**
- **Reviews sorted newest-first with no way to filter by rating or topic.**
- **A sticky bar covering the add-to-cart button on mobile.**

## Frequently asked questions

### How many product images should a page have?

Six to ten for most physical products: one hero, one scale reference, two or three detail shots, one in use, and one per major variant. Beyond that you add weight without adding information.

### Should product pages show reviews at the top or bottom?

Both. A compact rating summary near the title, with the full reviews further down. The summary answers "is this generally good"; the detail answers "is this good for someone like me".

### Where should delivery information appear?

On the product page, before the add-to-cart action. Cost, estimated date, and return window. Leaving these to checkout is one of the most common causes of abandonment.

### Does a longer product description convert better?

Length is not the variable. Coverage is. A description that answers every real objection converts better than a longer one that repeats marketing language.

## Next steps

Take your best-selling product page, read it as a first-time buyer, and write down every question you cannot answer from the page. Fix those in order, starting with delivery and returns.

[Start free](/signup) and add the proof and answers your product pages are missing.`,
  },
  {
    title: "Reduce Cart Abandonment Without Discounting",
    slug: "reduce-cart-abandonment-without-discounts",
    excerpt:
      "Most abandoned carts are caused by surprises, not price. Fix delivery clarity, payment friction, and trust gaps before you start giving away margin.",
    coverImage: "/blog-covers/reduce-cart-abandonment-without-discounts.webp",
    publishedAt: "2026-03-03T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "Fix the surprises before you cut the price",
      motif: "cart",
      figure: {
        kind: "funnel",
        title: "Where carts are actually lost",
        items: [
          "Unexpected delivery cost",
          "Delivery date too vague",
          "Forced account creation",
          "Payment method missing or failing",
          "No trust at the final step",
        ],
        caption:
          "Each of these is a fix, not a discount. Discounts only mask them.",
      },
    },
    body: `The standard response to abandoned carts is a discount code. It works, in the sense that some people come back, and it also trains customers to abandon deliberately and teaches your margin to shrink.

Most abandonment is not a price objection. It is a surprise, a friction, or a doubt. Fix those first.

## Diagnose before you treat

Before changing anything, find out where people are actually leaving:

- Cart view to checkout start
- Checkout start to address complete
- Address to payment
- Payment attempt to success

A drop between address and payment is a shipping-cost problem. A drop at payment attempt is a payment-method or failure-handling problem. A drop at cart view is usually a total-cost surprise. The remedy is different in each case.

Also read your own data qualitatively: failed payment logs, support messages, and the questions your WhatsApp queue receives at checkout time.

![Funnel diagram showing the common points where carts are abandoned](/blog-figures/reduce-cart-abandonment-without-discounts.webp)

## Fix 1: Kill the delivery surprise

The single largest cause of abandonment in most stores is a shipping cost that appears late.

- Show delivery cost on the product page, not at the final step
- If free delivery has a threshold, show progress toward it in the cart
- Give an estimated delivery date, not "3 to 7 working days"
- Let buyers check serviceability by PIN code before adding to cart
- Show cash-on-delivery availability and any fee, up front

If your delivery cost is genuinely high, saying so early loses the sale earlier and cheaper than losing it at payment.

## Fix 2: Remove forced account creation

Requiring an account before purchase is one of the highest-friction decisions a store can make. Offer guest checkout and invite account creation after the order is placed, when the customer has a reason to want order tracking.

If you need the account for loyalty or subscriptions, make it a one-tap creation from the order confirmation, not a prerequisite.

## Fix 3: Reduce the form to what you need

Checkout forms accumulate fields nobody uses:

- Ask for one contact route, not three
- Auto-fill city and state from the PIN code
- Do not ask for a company name on a consumer store
- Use correct input types so the right keyboard appears
- Support browser autofill with standard field names
- Never clear the form on a validation error

Our guide on [mobile checkout UX](/blog/mobile-checkout-ux-checklist) covers the field-by-field detail.

## Fix 4: Get payment right

Payment is where intent turns into revenue or evaporates:

- Offer the methods your customers actually use, including UPI, cards, net banking, wallets, and cash on delivery where relevant
- Show the available methods before the final step, so nobody discovers theirs is missing at the end
- Handle failures gracefully: keep the cart, explain what happened, and offer a retry with a different method
- Do not clear the address when a payment fails
- Confirm success immediately and unambiguously

A large share of "abandonment" in some markets is actually payment failure that the store never surfaces as a retry.

## Fix 5: Close the trust gap at the last step

The final step is where doubt peaks:

- Show the return policy in one line, near the pay button
- Show a support route - phone, [WhatsApp](/tools/whatsapp), or chat - so a stuck buyer asks instead of leaving
- Show security and payment badges that are real
- Repeat the delivery date so it is not a surprise
- Keep the order summary visible, with the itemised total

See [trust signals for online stores](/blog/trust-signals-indian-ecommerce) for what actually reassures and what is noise.

## Fix 6: Remove distractions from the cart and checkout

Every link in checkout is an exit:

- No navigation menu inside the checkout flow
- No social feed, no blog links, no chat widget that covers the pay button
- No coupon field so prominent that it sends everyone hunting for a code
- No last-minute upsell that blocks the flow

If you must offer a coupon field, keep it small and collapsed. A prominent empty box tells buyers a discount exists and sends them to a coupon site.

## Only then, recover

Once the structural problems are fixed, recovery is worth doing:

- Send the first reminder within a few hours, while the intent is warm
- Lead with the items and the delivery promise, not a discount
- Offer help before offering money: "Was something unclear about delivery?"
- Keep it to two messages
- Use a discount only for the second message, and only if margin allows

An honest [countdown](/tools/countdown) on a genuinely time-limited offer is fine. A fake timer that resets is not - see [honest urgency](/blog/countdown-timers-honest-urgency).

## Common mistakes to avoid

- **Discounting first.** It hides the real problem and trains abandonment.
- **Hiding costs until the last step.** The surprise is the abandonment.
- **Treating payment failure as abandonment.** Surface it and offer a retry.
- **A prominent coupon box.** It creates the very hunt that loses the sale.
- **No recovery at all.** Even one honest reminder recovers a meaningful share.

## Frequently asked questions

### What is a normal cart abandonment rate?

Published averages sit high across the industry, but the number matters less than the trend for your own store and the step where the drop happens. Track your funnel by step and compare against yourself.

### Should I send a discount in the abandoned cart email?

Not in the first one. Lead with the items and the delivery promise, and offer help. Save any discount for a later message, and only if your margin supports it - otherwise you teach customers to abandon on purpose.

### Does adding trust badges reduce abandonment?

Real, relevant ones can - a genuine payment security indicator, a clear return policy, a visible support route. Generic badges that link nowhere add clutter without adding reassurance.

### Is guest checkout worth it?

Almost always. Forced account creation is a well-documented abandonment cause. Offer guest checkout and invite account creation after the order, when tracking gives the customer a reason to say yes.

## Next steps

Measure your funnel step by step, find the largest single drop, and fix its cause before touching price. Start with delivery transparency on the product page - it is usually the cheapest win available.

[Start free](/signup) and close the gaps your checkout is leaking through.`,
  },
  {
    title: "Mobile Checkout UX: A Practical Checklist",
    slug: "mobile-checkout-ux-checklist",
    excerpt:
      "Most orders are placed one-handed on a phone. A checklist for keyboards, autofill, validation, payment failure, and the sticky bars that break checkout.",
    coverImage: "/blog-covers/mobile-checkout-ux-checklist.webp",
    publishedAt: "2026-03-06T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "Checkout, tested with one thumb",
      motif: "cart",
      figure: {
        kind: "checklist",
        title: "Mobile checkout essentials",
        items: [
          "Right keyboard per field",
          "Autofill actually works",
          "Errors beside the field",
          "Pay button never covered",
          "Failed payment keeps the cart",
        ],
        caption:
          "Test on a mid-range phone, on mobile data, with one hand. That is the real environment.",
      },
    },
    body: `Checkout is usually designed on a large monitor with a mouse, a fast connection, and a test card that always succeeds. It is then used one-handed, on a mid-range phone, on patchy mobile data, by someone whose payment might fail.

This checklist covers the details that decide whether that person completes the order.

## Set up an honest test

Before auditing, recreate the real conditions:

- A mid-range Android phone, not a flagship
- A throttled connection
- A fresh browser profile with no saved session
- Autofill enabled, as most real users have
- One hand, thumb only

Complete a real order end to end, including a deliberate payment failure. Almost every checkout has at least one problem that only appears under these conditions.

![Checklist panel listing the essentials of a mobile checkout that converts](/blog-figures/mobile-checkout-ux-checklist.webp)

## Layout and flow

- **One column.** Side-by-side fields break on narrow screens.
- **Show progress.** Two or three named steps, with the current one obvious.
- **Keep the order summary reachable** - collapsed by default, expandable, always showing the total.
- **Remove navigation.** No menu, no footer links, no social icons inside the flow.
- **Never open a new tab** during checkout.

## Fields and keyboards

Every field should trigger the right keyboard and accept the input people actually type:

- Email fields open the email keyboard with the @ key
- Phone fields open a numeric keypad
- PIN code fields open a numeric keypad and accept exactly the expected length
- Name fields do not force capitalisation rules
- Address fields accept multiple lines and long strings

Auto-fill city and state from the PIN code, and let the customer correct it. That removes two fields and two errors.

## Autofill

Browser autofill completes a checkout in seconds when it works, and does nothing when field names are non-standard:

- Use standard autocomplete attributes for name, email, phone, address, city, postal code
- Do not split a single logical field across multiple inputs in ways autofill cannot map
- Test with a real saved profile, not an empty one

If your checkout does not autofill, you are adding thirty seconds of thumb typing to every order.

## Labels and validation

- **Labels above fields**, always visible. Placeholder-only labels disappear as soon as typing starts and are a known accessibility failure.
- **Validate on blur**, not on every keystroke.
- **Errors beside the field**, in plain language, saying how to fix it.
- **Never clear entered data** on error.
- **Do not reject valid formats.** Phone numbers with spaces or country codes are valid. Clean them server-side.
- **Never signal errors with colour alone.**

## Touch targets and spacing

- Minimum comfortable tap size for every interactive element
- Enough vertical space between fields that a thumb does not hit the wrong one
- No critical action within the area a thumb naturally covers when scrolling
- Radio buttons and checkboxes with a tappable label, not just the box

## The sticky bar problem

The most common mobile checkout bug is an element covering the pay button:

- A sticky chat launcher over the bottom-right corner
- A cookie banner pinned to the bottom
- A promo bar that reappears on scroll
- The browser's own bottom chrome

Test with the keyboard open, because the viewport shrinks and a sticky footer can land directly on the submit button. If a visitor cannot tap pay, nothing else matters.

## Payment

- Show all available methods before the final step
- Put the most-used method first for your market
- Keep the cart and address intact if payment fails
- Explain the failure in plain language and offer a retry with a different method
- Confirm success immediately and unambiguously, with an order number

A silent failure is indistinguishable from a crash, and the customer will not try again.

## After the order

- Show a confirmation page with the order number, items, total, and delivery estimate
- Send a confirmation message on the channel the customer used
- Give a tracking route that does not require an account
- Offer support clearly, ideally a [WhatsApp route](/tools/whatsapp)

## Performance

Checkout should be the lightest part of your site:

- No analytics or marketing scripts that block rendering
- No third-party embeds that are not essential to payment
- Reserve space for anything that loads late so nothing shifts under a thumb
- Measure the real page weight - see [measuring widget performance](/blog/measure-widget-performance)

## Common mistakes to avoid

- **Placeholder-only labels.** They vanish exactly when needed.
- **A chat widget over the pay button.** Test with the keyboard open.
- **Clearing the form on error.** Customers do not retype an address twice.
- **Hiding the total until the last step.** Show it throughout.
- **Testing only with a successful payment.** Failures are where checkouts break.

## Frequently asked questions

### Should mobile checkout be one page or multiple steps?

Either works. Multiple short steps with clear progress usually feel lighter on a phone than one long scroll, provided the total is always visible and going back does not lose entered data.

### How many fields should a mobile checkout have?

Only those needed to fulfil and contact. Auto-derive city and state from the PIN code, skip company name for consumer stores, and ask for one contact route rather than two.

### Why do mobile carts convert worse than desktop?

Usually friction rather than intent: harder typing, broken autofill, covered buttons, and higher payment failure rates on mobile connections. Each is fixable, and fixing them closes most of the gap.

### Should I offer one-tap or wallet payments?

If your customers use them, yes. They remove the entire typing burden. Keep conventional methods available too, and show all options before the final step.

## Next steps

Run one real order on a mid-range phone with a deliberate payment failure, and write down everything that annoyed you. Fix the covered pay button first, then autofill, then the error messages.

[Start free](/signup) and remove the friction between intent and order.`,
  },
  {
    title: "Social Proof: Which Type Belongs Where",
    slug: "social-proof-types-and-placement",
    excerpt:
      "Reviews, ratings, logos, counters, case studies and testimonials each answer a different doubt. A map of which proof to use at which point in the journey.",
    coverImage: "/blog-covers/social-proof-types-and-placement.webp",
    publishedAt: "2026-03-10T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "Proof works where the doubt is",
      motif: "stars",
      figure: {
        kind: "flow",
        title: "Matching proof to the moment",
        items: [
          "Arrival: is this real",
          "Consideration: is it good",
          "Comparison: is it right for me",
          "Checkout: is it safe",
        ],
        caption:
          "Each stage has its own doubt. One testimonial wall cannot answer all four.",
      },
    },
    body: `Social proof is usually treated as a single ingredient: add testimonials, add logos, done. In practice each type of proof answers a different question, and proof placed away from its question does nothing.

This guide maps the types of proof to the moments where they work.

## The four doubts, in order

A visitor moves through four doubts:

1. **Is this business real?** - on arrival
2. **Is the product any good?** - during consideration
3. **Is it right for someone like me?** - during comparison
4. **Is it safe to pay?** - at checkout

Every piece of proof you own answers one of these. Placing it against the wrong doubt wastes it.

![Flow diagram matching types of social proof to the stage of the buying journey](/blog-figures/social-proof-types-and-placement.webp)

## Doubt 1: Is this business real?

Answered by presence and specificity, not by praise.

- A real address and phone number, visible - see [business hours](/tools/hours) and [maps](/tools/maps)
- A named team with faces, through a [Team Showcase](/tools/team)
- Recognisable client or partner logos, with permission
- A verified rating from an external platform, with the real count
- Activity: recent posts, recent reviews, recent orders

One named client is worth more than twelve anonymous grey logos. A [Logo Showcase](/tools/logos) works here, on the homepage and about page.

## Doubt 2: Is the product any good?

Answered by volume and average.

- Star rating with the review count, near the product title
- Review distribution, so the buyer can see the shape, not just the mean
- Photos submitted by customers
- Verified-purchase markers where you can support them

Show the count honestly. "4.6 from 218 reviews" is credible; "4.9" alone is not. A [Rating summary](/tools/reviews) near the title plus the full reviews below covers both scanning and reading.

## Doubt 3: Is it right for someone like me?

This is where most stores lose people, and where generic proof is useless. The buyer wants evidence from someone with their problem.

- Reviews filterable by attributes that matter - size bought, skin type, room size, use case
- Testimonials that state the starting problem, not just the outcome
- Case studies with named context: industry, size, constraint
- Before and after comparisons with the scope stated - see the [Before / After widget](/tools/beforeafter)
- Q&A where previous buyers answer new buyers

A single specific review from a customer with the same constraint outperforms fifty generic five-star ratings.

## Doubt 4: Is it safe to pay?

Answered by risk reversal and support presence.

- Return policy stated in one line at the payment step
- A visible support route - phone or [WhatsApp](/tools/whatsapp)
- Payment security indicators that are genuine
- Delivery date restated, so nothing is a surprise
- Order confirmation that arrives immediately

See [trust signals for online stores](/blog/trust-signals-indian-ecommerce) for what belongs here and what is decoration.

## Types of proof and what each is actually for

- **Star ratings** - fast quality signal. Needs a real count beside it.
- **Written reviews** - detail and objection handling. Needs filtering to be useful.
- **Customer photos** - realism. Powerful for anything visual or physical.
- **Testimonials** - narrative proof for services. Needs full attribution.
- **Case studies** - depth for high-consideration purchases.
- **Client logos** - credibility by association. Only with permission and only if recognisable.
- **Counters** - "12,000 orders shipped" works if it is true and current. See the [Stats Counter](/tools/counter).
- **Live activity** - "3 people viewing this" is only acceptable if it reflects real data. Fabricated activity is a consumer protection risk and is usually spotted.
- **Awards and certifications** - useful when recent and relevant; harmful when years old.

## Rules that apply to all of them

- **Never fabricate.** Invented reviews, fake counters, and stock-photo faces are detectable and, in many markets, unlawful.
- **Show dates.** Undated proof reads as old proof.
- **Include the count.** An average without a denominator means nothing.
- **Do not hide negatives.** A visible three-star review with a good response builds more trust than a wall of fives.
- **Keep it current.** Retire proof that no longer reflects the business.

## Common mistakes to avoid

- **One testimonial wall on the homepage.** It answers doubt 1 slightly and nothing else.
- **Reviews only at the very bottom of the product page.** The doubt arises much earlier.
- **Logos with no permission or no relevance.**
- **A five-star average from six reviews presented as authority.**
- **Live-visitor counters that are simulated.** Treat this as a line you do not cross.

## Frequently asked questions

### How many reviews do I need before showing a rating?

Enough that the average is not distorted by a handful of opinions - usually around twenty for a product. Below that, show the individual reviews without a headline average.

### Should I show negative reviews?

Yes. A visible mix with thoughtful responses is more persuasive than uniform praise, and buyers actively look for the critical reviews to judge whether the flaws matter to them.

### Where do client logos work best?

On the homepage and about page, answering "is this business real". They do almost nothing on a product page, where the buyer wants evidence about the product.

### Are live visitor counters a good idea?

Only if the number is real. A genuine [visitor counter](/tools/visitors) backed by your own analytics is honest; a simulated one is a fabricated claim and is usually recognised as one.

## Next steps

Write down the four doubts, list the proof you already own, and map each piece to the doubt it answers. Move anything that is in the wrong place, and identify which doubt you currently have no evidence for.

[Start free](/signup) and put your proof where the hesitation actually happens.`,
  },
  {
    title: "How to Set a Free Shipping Threshold",
    slug: "how-to-set-a-free-shipping-threshold",
    excerpt:
      "Free shipping thresholds lift average order value when the number is right and destroy margin when it is not. How to calculate, display, and test yours.",
    coverImage: "/blog-covers/how-to-set-a-free-shipping-threshold.webp",
    publishedAt: "2026-03-13T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "Pick the number with arithmetic, not instinct",
      motif: "chart",
      figure: {
        kind: "flow",
        title: "Setting the threshold",
        items: [
          "Find your true delivery cost",
          "Plot the order value distribution",
          "Set just above the common basket",
          "Show progress in the cart",
        ],
        caption:
          "A threshold nobody can reach is a shipping charge with extra steps.",
      },
    },
    body: `Free shipping is the most consistently effective offer in online retail, and the most consistently mispriced. Set the threshold too low and you give away margin on orders that would have converted anyway. Set it too high and you have simply advertised a charge nobody avoids.

This guide covers how to choose the number, how to display it, and how to test whether it worked.

## Step 1: Know your real delivery cost

Start with the number you actually pay, per order, not per shipment quote:

- Courier charge by weight band and zone
- Packaging materials
- Handling time, costed honestly
- Return shipping, averaged across the category's return rate
- Cash-on-delivery fees and the cost of RTO where it applies

Return-to-origin costs are the most commonly forgotten. If a category returns at a meaningful rate and you pay both legs, your true delivery cost per successful order is much higher than the outbound quote.

## Step 2: Plot the order value distribution

Export your last few months of orders and look at the distribution, not the average. The average is distorted by a few large orders and will lead you to a threshold most customers cannot reach.

Find:

- The median order value
- The most common basket size, by count
- The shape of the tail above the median
- How many single-item orders you get, and at what value

Most stores have a dense cluster of orders just above the price of one popular item. That cluster is what you are trying to move.

![Flow diagram showing how to calculate and display a free shipping threshold](/blog-figures/how-to-set-a-free-shipping-threshold.webp)

## Step 3: Set the threshold just above the common basket

The threshold should be reachable by adding one more reasonable item - not by doubling the order.

A practical starting point is roughly 15 to 30 per cent above the median order value, adjusted for your catalogue:

- If most orders are one item at Rs 800, a Rs 999 threshold is reachable with a small add-on
- A Rs 2,000 threshold in the same store is a shipping charge with extra steps
- If your cheapest add-on is Rs 400, do not set the gap smaller than that - the customer needs something to add

Check the margin arithmetic: at the threshold, does the gross margin cover the delivery cost you calculated in step 1? If not, the threshold is too low regardless of how good it looks.

## Step 4: Show progress, not just the rule

A threshold nobody sees does nothing. Communicate it at three points:

- **In the announcement bar** - "Free delivery over Rs 999" using an [announcement bar](/tools/popup)
- **On the product page** - how much more is needed for this item to qualify
- **In the cart** - a live progress line: "Add Rs 220 more for free delivery"

The cart progress line is the one that changes behaviour. It converts an abstract rule into a specific, small, achievable action.

Make the remaining amount specific and update it live as the cart changes. And when the threshold is met, say so clearly - the confirmation is part of the reward.

## Step 5: Suggest what to add

A progress line that says "add Rs 220 more" and shows nothing to add wastes the moment. Pair it with two or three genuinely relevant items in that price range - consumables, accessories, or refills.

Do not suggest an item that costs less than the gap; the customer will add it, miss the threshold, and feel misled.

## Step 6: Measure the right outcomes

A threshold can lift average order value and still lose money. Track together:

- Average order value, before and after
- Conversion rate, before and after
- Gross margin per order, after delivery cost
- Share of orders just below and just above the threshold
- Return rate on threshold-driven add-ons

The failure mode to watch for: average order value rises, conversion falls slightly, and margin per order falls because the add-ons are low-margin items that also get returned. That is a worse business than before.

## Step 7: Consider the alternatives

A single global threshold is not the only option:

- **Zone-based thresholds**, if your delivery cost varies sharply by region
- **Category thresholds**, if weight varies wildly across the catalogue
- **Free delivery for members**, as a loyalty benefit rather than a universal cost
- **Flat low-cost delivery**, which is often more honest and easier to communicate than a threshold nobody reaches

If your true delivery cost is high and your margins are thin, a clearly stated flat charge with an accurate delivery date can outperform a free-shipping promise the customer cannot access.

## Common mistakes to avoid

- **Copying a competitor's number.** Their costs, margins, and basket sizes are not yours.
- **Setting the threshold from the mean.** Use the distribution.
- **Hiding the rule until checkout.** The surprise is the abandonment - see [reducing cart abandonment](/blog/reduce-cart-abandonment-without-discounts).
- **No progress indicator.** The rule only works when the gap is visible and small.
- **Never revisiting it.** Courier rates and basket sizes change; review quarterly.

## Frequently asked questions

### What is a good free shipping threshold?

One that sits roughly 15 to 30 per cent above your median order value and is reachable by adding one ordinary item. There is no universal number - it depends on your basket distribution and your true delivery cost.

### Should the threshold be based on the average order value?

No. Use the median and the shape of the distribution. Averages are pulled up by a small number of large orders and produce thresholds most customers cannot reach.

### Does free shipping increase conversion?

Usually, when the threshold is reachable and clearly communicated. An unreachable threshold behaves like a shipping charge and can reduce conversion while adding confusion.

### Should I show shipping cost on the product page?

Yes. Delivery cost discovered late is one of the largest causes of abandonment. Show the cost, or the threshold and the gap, before the customer reaches the cart.

## Next steps

Calculate your true delivery cost per successful order including returns, plot your order value distribution, and set a threshold one ordinary add-on above the common basket. Then show the gap live in the cart and measure margin, not just order value.

[Start free](/signup) and put an honest delivery promise in front of every buyer.`,
  },
];
