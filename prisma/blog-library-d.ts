import type { BlogLibraryPost } from "./blog-library-types";

export const BLOG_POSTS_D: BlogLibraryPost[] = [
  {
    title: "How to Add an FAQ Accordion to Your Website",
    slug: "how-to-add-faq-accordion-to-website",
    excerpt:
      "Add a fast, accessible FAQ accordion to any website in minutes, write answers that deflect support tickets, and structure them so Google can read them.",
    coverImage: "/blog-covers/how-to-add-faq-accordion-to-website.webp",
    publishedAt: "2026-01-06T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "FAQ accordions that answer the real questions",
      motif: "grid",
      figure: {
        kind: "flow",
        title: "From support inbox to published FAQ",
        items: [
          "Collect real questions",
          "Group by decision stage",
          "Write one clear answer",
          "Publish and measure",
        ],
        caption:
          "Every FAQ entry should start life as a question a customer actually asked.",
      },
    },
    body: `An FAQ accordion is one of the few page elements that helps three audiences at once: the visitor who is one answer away from buying, the support agent who answers the same question forty times a month, and the search engine trying to understand what your page covers.

This guide covers how to choose the right questions, write answers that actually resolve doubt, add the accordion without touching your theme, and keep it honest as your business changes.

## What an FAQ accordion is good at

An accordion collapses a long list of questions into scannable headings, so a visitor can find the one thing they care about without reading everything else. That makes it a good fit for:

- Pre-purchase objections on a product or service page
- Delivery, returns, warranty, and payment questions
- Onboarding or "how does this work" explanations
- Policy detail that would otherwise bury the main copy

It is a poor fit for content everyone must read. If ninety per cent of visitors need to know that you only ship within India, that belongs in visible copy, not behind a click.

## Step 1: Collect questions from real sources

Do not invent questions. Pull them from places where customers already ask:

- Support inbox, WhatsApp threads, and chat transcripts
- Order-related emails and cancellation reasons
- Site search queries that returned nothing useful
- Sales calls and quotation follow-ups
- Review text and post-purchase surveys

Write each question the way the customer phrased it. "Will this fit a 5-foot sofa?" is a better heading than "Product dimensions". Customer phrasing also happens to match how people search.

Sort the raw list by frequency, then by cost. A question asked ten times a week is worth answering. A question asked twice a month that ends in a refund is also worth answering.

![Flow diagram showing support questions grouped by decision stage and published as FAQ answers](/blog-figures/how-to-add-faq-accordion-to-website.webp)

## Step 2: Group by decision stage, not by department

Most FAQ sections are organised the way the company is organised: shipping, billing, technical. Customers do not think that way. They think in stages.

Group your questions into:

1. **Before choosing** - what it is, who it suits, what it does not do
2. **Before paying** - price, delivery time, payment methods, guarantees
3. **After buying** - tracking, installation, returns, support routes

Then order the accordion so the earliest-stage questions appear first. A visitor scanning from the top should move through their own decision in sequence.

## Step 3: Write answers that end the question

A useful answer is specific, complete, and honest about limits. Three rules help:

- **Lead with the direct answer.** "Yes, within 7 days of delivery" beats a paragraph of policy background.
- **Give the exact number.** Days, rupees, sizes, and conditions. Vague answers create a second question.
- **Say what happens next.** Link to the page, form, or contact route that completes the task.

Keep each answer to two to five sentences. If an answer genuinely needs more, publish a full page and link to it from the accordion.

Avoid marketing language inside answers. An FAQ is a trust surface. The moment it reads like a sales pitch, visitors stop believing it and go back to support.

## Step 4: Add the accordion without editing your theme

You do not need a developer or a theme change. With the [FAQ Accordion widget](/tools/faq) you configure the questions in a visual editor, publish, and paste one embed line where you want it to appear:

1. Create the widget and pick a template.
2. Add each question and answer, in decision-stage order.
3. Match the heading weight and accent colour to your site.
4. Publish, copy the embed snippet, and paste it into the page.

The [embed snippet guide](/help/installing-embed-snippet) walks through where the line goes on common platforms. Because the content lives in your workspace, editing a delivery promise later is a two-minute change everywhere the widget appears, not a redeploy.

## Step 5: Keep it accessible

An accordion is interactive, so it has to work for keyboard and screen-reader users:

- Every question must be reachable with the Tab key and toggle with Enter or Space
- Focus must stay visible on the active question
- The expanded state must be announced, not just implied by a rotating arrow
- Answer text must meet contrast requirements against the panel background

Test by unplugging your mouse and moving through the whole accordion. If you cannot open every answer, neither can a share of your visitors. Our [website accessibility checklist](/blog/website-accessibility-checklist-wcag) covers the wider audit.

## Step 6: Help search engines read it

Google can only surface FAQ content when it can parse a question-and-answer structure and the same content is visible on the page. Two things matter:

- The questions and answers must be present for every visitor, not loaded only after a click that fires a network request.
- The structured data must describe exactly what is on screen. Never mark up questions you do not display.

If you publish FAQs through a platform that emits the markup for you, verify it in Google's Rich Results Test after publishing. Our [schema markup guide](/blog/schema-markup-guide-small-business) explains which types are worth the effort for a small business.

## Common mistakes to avoid

- **Padding the list.** Twelve real questions beat forty invented ones. Empty entries dilute the page and waste scanning time.
- **Hiding critical information.** Shipping restrictions and non-returnable categories belong in visible copy as well.
- **Letting answers go stale.** An FAQ that still promises last year's delivery times destroys trust faster than no FAQ at all.
- **One giant global FAQ.** Product-specific questions belong on the product page, near the decision they affect.
- **Opening every panel by default.** That is just a long page with extra chrome.

## Measure whether it worked

An FAQ is a support and conversion tool, so measure both:

- Support contacts about the covered topics, before and after
- Time on page and scroll depth for the section
- Conversion rate for sessions that expanded at least one answer
- Which questions get opened most, so you know what to promote into visible copy

If one question is opened far more than the rest, that is no longer an FAQ item. That is a fact your page is failing to communicate, and it should be promoted into the main content.

## Frequently asked questions

### How many questions should an FAQ accordion have?

Between six and fifteen for a product or service page. Fewer than six usually means you have not mined support data properly. More than fifteen means the section has become a knowledge base and should be split into its own page with search.

### Do FAQ accordions hurt SEO because the text is hidden?

No. Content collapsed behind an accordion but present in the page is indexed normally. What causes problems is content that only exists after a user interaction triggers a fetch, because the crawler never sees it.

### Where should the FAQ go on the page?

Below the main decision content and above the footer. On a product page that means after description, specifications, and reviews. Visitors who reach it are usually looking for one last reassurance before acting.

### Can I use the same FAQ on every page?

You can, but a page-specific set performs better. A generic set answers the average visitor; a product-specific set answers the visitor in front of you. Reuse the widget and vary the questions.

## Next steps

Pull thirty real questions out of your support inbox this week, keep the ten that repeat, and publish them with the [FAQ Accordion widget](/tools/faq). Pair it with the [WhatsApp Chat widget](/tools/whatsapp) so the questions you have not answered yet still reach a human, and review the list every quarter against fresh support data.

Ready to build one? [Start free](/signup) and publish your first accordion today.`,
  },
  {
    title: "How to Add a Google Map to Your Website",
    slug: "how-to-add-google-map-to-website",
    excerpt:
      "Embed a map that loads fast, shows the right pin, and gives visitors one-tap directions, without slowing your page down or trapping their scroll.",
    coverImage: "/blog-covers/how-to-add-google-map-to-website.webp",
    publishedAt: "2026-01-09T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Maps that get people to your door",
      motif: "map",
      figure: {
        kind: "checklist",
        title: "A map embed that actually helps",
        items: [
          "Exact pin, verified on a phone",
          "One-tap directions action",
          "Address in selectable text",
          "Lazy loaded below the fold",
          "Landmark and parking notes",
        ],
        caption:
          "A map is a navigation tool, not decoration. Test it the way a customer would.",
      },
    },
    body: `A map on a contact page looks simple, but most implementations quietly fail the one job they have: getting a real person from their phone to your door. The pin sits on the wrong side of the road, the address is baked into an image so it cannot be copied, and the embed loads a heavy third-party frame on every page view.

This guide covers how to place a map that is accurate, fast, and genuinely useful on a phone.

## Decide what the map is for

Before embedding anything, decide which job the map does on this page:

- **Confirm you are real.** A visitor checking that a business has a physical presence.
- **Navigate.** A customer who has decided to visit and needs directions now.
- **Choose a branch.** A visitor picking between several locations.

The first job needs a small static map and a clear address. The second needs a directions link that opens the native maps app. The third needs a list synchronised with the map, which is a different widget entirely.

Trying to do all three with one giant interactive frame usually does all three badly.

## Get the location right first

An embed is only as good as the coordinates behind it. Before you publish:

1. Search your business name and address in Google Maps on a phone.
2. Check that the pin sits on the correct building, not the centroid of the street or a neighbouring plot.
3. Follow the driving directions from a main road and see where they actually end.
4. If the pin is wrong, fix it at the source in your Google Business Profile rather than nudging the embed.

Getting this right also improves local search, because the same profile powers map results. Our [Google Business Profile checklist](/blog/google-business-profile-optimization) covers the rest of that setup.

![Checklist panel listing the requirements for a useful map embed on a business website](/blog-figures/how-to-add-google-map-to-website.webp)

## Step 1: Add the map without editing your theme

With the [Maps widget](/tools/maps) you enter the address, choose the zoom level and style, and publish. You then paste a single embed line into your contact page, footer, or store page.

Configure these four things carefully:

- **Zoom level.** Close enough to identify the building, wide enough to show a recognisable landmark. Street level for a shop, wider for an industrial address.
- **Height.** Tall enough to be legible on a phone without pushing your address and phone number off the screen.
- **Marker label.** Your business name, not "Location".
- **Directions action.** A visible button, not just a draggable map.

Paste the snippet where the map belongs using the [embed snippet guide](/help/installing-embed-snippet). Changing the address later is an edit in your workspace, not a code change on every page.

## Step 2: Keep the address as real text

The single most common mistake is publishing the address only inside the map. Always print the full address as selectable text next to the map, including:

- Building name and number, street, area, city, state, PIN code
- A landmark line, because a lot of navigation still runs on landmarks
- Phone number as a tappable link
- Opening hours, or a link to them

Selectable text lets a visitor copy the address into their own app, lets a screen reader announce it, and gives search engines something to associate with your location. A simple [Custom Button](/tools/button) can carry the call and directions actions.

## Step 3: Protect page speed

A full interactive map is one of the heaviest things you can put on a page. It pulls scripts, tiles, and fonts from a third-party domain, and it usually sits on your contact page, which is a high-intent page you cannot afford to make slow.

Three practical protections:

- **Load below the fold and lazily.** The map should not compete with hero content for bandwidth.
- **Reserve the space.** Give the container a fixed aspect ratio so the page does not jump when the map arrives. Layout shift on a contact page is how phone numbers get mis-tapped.
- **Consider a static preview.** A lightweight image with a "View on map" action is enough for the "confirm you are real" job and costs a fraction of the payload.

Our guide on [protecting Core Web Vitals with third-party widgets](/blog/core-web-vitals-lightweight-widgets) covers the measurement side.

## Step 4: Make it work on a phone

Most people who need directions are already on a phone, often outside, often on a poor connection. Test the real journey:

- Tap the directions button. Does it open the native maps app with the destination pre-filled?
- Can you scroll past the map without the page trapping your finger inside it?
- Is the address legible at arm's length in daylight?
- Does the phone number dial in one tap?

A map that traps scroll is a bounce generator. If your embed does this, disable drag-to-pan and keep a clear "open in maps" action instead.

## Step 5: Handle multiple locations properly

Once you have more than three locations, a single embedded map stops working. Visitors need to filter, compare, and pick the nearest branch.

That is the job of a [Store Locator](/tools/storelocator): a searchable list synchronised with map pins, showing distance, hours, and a directions action per branch. Each location should also have its own page with its own address text if you want local visibility for that area.

## Common mistakes to avoid

- **A screenshot instead of a map.** It cannot be copied, tapped, or navigated.
- **The wrong pin, never verified on a phone.** Test it from outside your office, not from your desk.
- **An interactive map above the fold.** It is heavy and it hijacks scroll.
- **Hiding the address behind the map.** Always publish it as text.
- **Forgetting the hours.** People plan a visit around opening times; pair the map with a [Business Hours widget](/tools/hours).

## Frequently asked questions

### Does embedding a map slow down my website?

An interactive map embed is heavy, typically the largest third-party payload on a contact page. Load it lazily, reserve its space to avoid layout shift, and consider a static image preview with a directions link when the map is only there for reassurance.

### Do I need an API key to embed a map?

For a basic place embed, usually not. For custom styling, multiple markers, or programmatic behaviour you will need a key and should watch the usage quota. A no-code widget handles this for you and keeps the configuration out of your theme.

### Where should the map go on my contact page?

Below your address, phone number, and hours. Visitors want the facts first; the map confirms and navigates. Putting the map first pushes the information most people came for below the fold.

### How do I show directions rather than just a location?

Give the visitor an explicit directions action that opens their native maps app with your address as the destination. Do not rely on them tapping the pin and finding the option themselves.

## Next steps

Publish your address as text, add the [Maps widget](/tools/maps) below it, and test the directions button from a phone outside your building. If you run more than three branches, move to a [Store Locator](/tools/storelocator) and give each location its own page.

[Start free](/signup) and get your map live this afternoon.`,
  },
  {
    title: "How to Show Business Hours on Your Website",
    slug: "how-to-show-business-hours-on-website",
    excerpt:
      "Publish opening hours that stay accurate, show a live open or closed status, and handle holidays, so customers stop arriving at a closed shutter.",
    coverImage: "/blog-covers/how-to-show-business-hours-on-website.webp",
    publishedAt: "2026-01-13T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Opening hours customers can rely on",
      motif: "timer",
      figure: {
        kind: "compare",
        title: "Hours that work vs hours that fail",
        items: [
          "Live open / closed status",
          "Timezone stated explicitly",
          "Holiday overrides published",
          "Next opening time shown",
        ],
        items2: [
          "A static image of a table",
          "Hours only in the footer",
          "No mention of lunch breaks",
          "Festival closures never updated",
        ],
        caption: "The cost of wrong hours is a wasted trip and a lost customer.",
      },
    },
    body: `Opening hours look like the most boring content on a website until you consider what wrong hours cost: a customer who travelled across town to a closed shutter, a support call that should never have happened, and a one-star review that mentions none of your actual products.

This guide covers how to publish hours that stay true, show a live status, and handle the exceptions that break most implementations.

## Why static hours fail

Most sites publish hours once, as a block of text or an image in the footer, and never touch them again. That fails for predictable reasons:

- Festival and public-holiday closures are never added
- Seasonal timings change but the page does not
- Lunch breaks and weekly offs are omitted
- The visitor has no idea whether you are open right now
- Nothing states the timezone, which matters for online services

Every one of those gaps turns into a phone call, a message, or a wasted trip.

## Step 1: Write down the real schedule

Before touching the website, write the actual operating schedule, including the parts you usually leave implicit:

- Regular hours per day of the week, including any weekly off
- Mid-day breaks, if the counter genuinely closes
- Last order or last entry time, if it differs from closing
- Public holidays and festival closures for the next twelve months
- Separate schedules for different functions, such as showroom, service desk, and phone support

If your phone support runs longer than your showroom, publish both. One combined set of hours will disappoint whichever group is wrong.

![Comparison panel contrasting reliable published business hours with common failure patterns](/blog-figures/how-to-show-business-hours-on-website.webp)

## Step 2: Show a live open or closed status

A table of hours makes the visitor do arithmetic. A live status answers the question they actually have.

The [Business Hours widget](/tools/hours) shows a current open or closed state alongside the weekly schedule, so a visitor sees "Open now, closes at 8:00 PM" or "Closed, opens tomorrow at 10:00 AM" without reading the table at all.

Three details make this work:

- **State the timezone.** For a local shop it is obvious; for an online service or support desk it is not. Say "IST" explicitly.
- **Show the next transition.** Closing time when open, next opening time when closed. That single line prevents most "are you open?" messages.
- **Handle the edge minutes honestly.** If you stop taking walk-ins fifteen minutes before closing, say so rather than showing "open" until the last second.

## Step 3: Publish holiday overrides in advance

Exceptions are where hours go wrong. Add overrides for:

- National and state public holidays
- Festival closures, which vary by region and by year
- Annual maintenance or stock-taking shutdowns
- Half-days and special event timings

Set them a quarter ahead, not the night before. A customer planning a Saturday visit checks on Thursday.

If you run several branches with different regional holidays, keep a separate schedule per location and surface it on that location's page or through your [Store Locator](/tools/storelocator).

## Step 4: Put the hours where the decision happens

Hours in the footer are a reference. Hours next to a decision are useful. Place them:

- On the contact page, beside the address and the [map](/tools/maps)
- On each location page for multi-branch businesses
- Near a "Call us" or "Visit us" call to action
- Beside a booking or appointment form
- In an [announcement bar](/tools/popup) when today's timing is unusual

For a restaurant, hours beside the [menu](/tools/menu) answer "can I order now?" at exactly the right moment.

## Step 5: Keep the rest of the web in sync

Your website is not the only place people check. Update the same schedule in:

- Your Google Business Profile, including special hours for holidays
- Marketplace and delivery-platform listings
- Social profiles that display hours
- Any directory or aggregator listing you control

Conflicting hours across sources look careless and, for local search, weaken the consistency signals that help you rank. The [Google Business Profile checklist](/blog/google-business-profile-optimization) covers that side in detail.

## Step 6: Say what happens when you are closed

Closed is not the end of the conversation. A good closed state offers a next step:

- A [WhatsApp chat](/tools/whatsapp) route with an honest response-time expectation
- A [contact form](/tools/form) that promises a reply on the next working day
- An online ordering or booking link that works around the clock
- The next opening time, stated plainly

That turns a dead end into a captured lead. Our guide on [speed to lead](/blog/lead-response-time-speed-to-lead) explains why the follow-up window matters more than most teams assume.

## Common mistakes to avoid

- **Publishing hours as an image.** It cannot be read by assistive technology, translated, or updated quickly.
- **Omitting the weekly off.** Visitors assume seven days unless told otherwise.
- **Ignoring timezone for online services.** "9 to 6" means nothing to a customer two zones away.
- **Letting the widget drift from reality.** Assign one owner and review it monthly.
- **Different hours on different pages.** Publish once and embed everywhere.

## Frequently asked questions

### Should opening hours be in the footer or on the contact page?

Both. The footer is the reference location people look for by habit; the contact page is where the visit decision happens. Publish once through a widget and embed it in both places so they can never disagree.

### How do I handle festival and holiday closures?

Add dated overrides a quarter in advance and update your Google Business Profile special hours at the same time. Announce unusual timings for the current week in an announcement bar so returning visitors see them without hunting.

### What should the site show when we are closed?

The next opening time plus at least one asynchronous route - a form, a chat handoff, or online booking - with an honest expectation of when the customer will hear back.

### Do business hours affect local SEO?

Indirectly but meaningfully. Consistent, accurate hours across your website, Google Business Profile, and directory listings strengthen the trust signals local ranking depends on, and accurate hours reduce negative reviews caused by wasted trips.

## Next steps

Write out your real schedule including breaks and holidays, publish it with the [Business Hours widget](/tools/hours), and mirror it on your Google Business Profile. Then add a closed-state route so out-of-hours visitors still become leads.

[Start free](/signup) and publish accurate hours in ten minutes.`,
  },
  {
    title: "How to Add a Photo Gallery With a Lightbox",
    slug: "how-to-add-photo-gallery-with-lightbox",
    excerpt:
      "Build a fast, touch-friendly photo gallery with a lightbox, covering image sizing, alt text, layout choices, and the accessibility details most galleries miss.",
    coverImage: "/blog-covers/how-to-add-photo-gallery-with-lightbox.webp",
    publishedAt: "2026-01-16T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Galleries that load fast and sell the detail",
      motif: "media",
      figure: {
        kind: "stack",
        title: "Gallery priorities, in order",
        items: [
          "Right image, right moment",
          "Compressed and correctly sized",
          "Descriptive alt text",
          "Keyboard and swipe support",
          "Layout that never shifts",
        ],
        caption:
          "Optimise in this order. Presentation polish before payload discipline is wasted work.",
      },
    },
    body: `A photo gallery is how a visitor inspects something they cannot touch. For a hotel, a workshop, a salon, a manufacturer, or a fashion label, it is often the single most persuasive element on the page, and often the heaviest.

This guide covers how to build a gallery that answers the visitor's real question, opens into a usable lightbox, and does not destroy your page speed.

## Decide what the gallery must prove

Galleries fail when they are a dump of every photo the business owns. Start by naming the question the visitor is asking:

- **Scale and fit** - how big is this, will it work in my space?
- **Quality and finish** - what does it look like close up?
- **Context and use** - what does it look like in a real setting?
- **Range** - how many options are there?
- **Proof of work** - did you really do this project?

Then choose images that answer that question and cut the rest. A tight set of eight strong images outperforms forty repetitive ones, and loads far faster.

## Step 1: Prepare the images properly

Most gallery performance problems are created before the widget is involved. Prepare each image:

- **Crop to a consistent aspect ratio** so the grid does not look ragged and the layout does not shift.
- **Export at roughly twice the display size**, not at camera resolution. A thumbnail shown at 400px wide does not need a 4000px file.
- **Compress to a modern format.** WebP or AVIF at a sensible quality is usually a fraction of the JPEG size at the same visual quality.
- **Name the files descriptively.** Meaningful filenames help image search and help your own team find things later.

Our [image optimization guide](/blog/image-optimization-for-websites) has the full workflow, including how to choose quality settings without guessing.

![Layered priority diagram showing gallery optimisation order from content choice to layout stability](/blog-figures/how-to-add-photo-gallery-with-lightbox.webp)

## Step 2: Choose a layout that matches the content

Three layouts cover almost every case:

- **Uniform grid.** Best for catalogues, product ranges, and team photos where consistency matters more than composition.
- **Masonry.** Best for mixed orientations - interiors, events, editorial photography - where cropping to a single ratio would lose the shot.
- **Carousel.** Best when the images are sequential or vertical space is scarce, but weaker for browsing because it hides most of the set.

For a portfolio of completed projects with descriptions, a filterable [Portfolio widget](/tools/portfolio) fits better than a plain gallery. For a range of images on a product page, a grid plus lightbox is usually right.

## Step 3: Add the gallery without touching your theme

The [Photo Gallery widget](/tools/gallery) handles the grid, the lightbox, and the touch behaviour. Upload your prepared images, set columns and spacing, write the alt text, publish, and paste the embed line where the gallery belongs.

Configure these:

- Columns at desktop, tablet, and phone widths
- Gap size, kept consistent with the rest of your page rhythm
- Whether captions appear under thumbnails, in the lightbox, or both
- Lazy loading, so off-screen images do not download on first paint

Then follow the [embed snippet guide](/help/installing-embed-snippet) to place it.

## Step 4: Make the lightbox usable

A lightbox is a modal, and modals have rules. Yours should:

- **Close predictably** with a visible close button, the Escape key, and a tap outside the image
- **Support swipe** left and right on touch devices, and arrow keys on desktop
- **Trap focus** while open, so keyboard users cannot tab into the page behind it
- **Restore focus** to the thumbnail that opened it on close
- **Show position**, such as "4 of 12", so the visitor knows how much is left
- **Never autoplay** or rotate on its own

Test with a keyboard only. If you cannot open the fourth image, move to the fifth, and close back to where you started, the lightbox is not finished.

## Step 5: Write alt text that earns its place

Alt text is not a keyword slot. It describes what the image shows to someone who cannot see it, and it is what image search reads.

- Describe the subject and the relevant detail: "Walnut dining table with tapered legs, seating six".
- Skip "image of" and "photo of".
- Leave alt empty only for purely decorative images.
- Never repeat the same alt text across a whole gallery.

If a caption already describes the image on screen, the alt text can be shorter, but it should still identify the subject.

## Step 6: Protect page speed

A gallery is the easiest way to ruin a Largest Contentful Paint score. Protect it:

- Lazy load everything below the fold; eagerly load only the first row.
- Set explicit dimensions or an aspect ratio on every thumbnail so nothing shifts as images arrive.
- Serve responsive sizes so phones do not download desktop images.
- Cap the initial set and paginate or "load more" beyond it.

Then measure the real result rather than trusting the theory - our guide on [measuring widget performance](/blog/measure-widget-performance) shows how.

## Common mistakes to avoid

- **Uploading straight from the camera.** A 6MB hero image is a bounce, not a photograph.
- **Autoplaying carousels.** They move away from the image the visitor was reading.
- **Text baked into images.** It cannot be read, searched, translated, or resized.
- **Identical alt text everywhere.** It helps nobody and looks spammy.
- **No empty state.** If a category has no images yet, say so rather than showing a broken grid.

## Frequently asked questions

### How many images should a gallery have?

Enough to answer the visitor's question and no more - usually eight to twenty for a page-level gallery. Beyond that, split by category or add a "load more" control so the first paint stays light.

### Does a photo gallery hurt SEO?

Only when it is slow or unlabelled. Compressed, correctly sized images with descriptive alt text and stable layout help the page; huge unoptimised images that cause layout shift hurt it.

### What is the best image format for a web gallery?

WebP for broad support with good compression, AVIF where you want smaller files and can accept slightly narrower support. Keep a JPEG fallback if your platform needs one.

### Should the lightbox show captions?

Show a caption when it adds information the image cannot carry alone - dimensions, materials, location, or project name. Decorative captions just add clutter.

## Next steps

Choose the eight images that actually answer your visitor's question, compress and size them properly, and publish them with the [Photo Gallery widget](/tools/gallery). If you are showing completed projects, use the [Portfolio widget](/tools/portfolio) so each item can carry its own detail.

[Start free](/signup) and get a fast gallery live today.`,
  },
  {
    title: "How to Add an Instagram Feed to Your Website",
    slug: "how-to-add-instagram-feed-to-website",
    excerpt:
      "Show your Instagram content on your site without wrecking page speed: what to embed, where to place it, and how to keep social proof genuinely persuasive.",
    coverImage: "/blog-covers/how-to-add-instagram-feed-to-website.webp",
    publishedAt: "2026-01-20T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Social proof from the feed your customers already trust",
      motif: "media",
      figure: {
        kind: "flow",
        title: "Turning a feed into proof",
        items: [
          "Pick a purpose",
          "Curate, do not mirror",
          "Place near the decision",
          "Measure the click-through",
        ],
        caption: "An unfiltered feed is decoration. A curated one is evidence.",
      },
    },
    body: `An Instagram feed on a website is usually installed for the wrong reason: because the space looked empty. Used deliberately, it does something a product photo cannot - it shows real usage, recent activity, and a community that exists outside your marketing copy.

This guide covers how to embed a feed that supports a buying decision instead of just filling a section.

## Decide the job before you embed

A feed can do three different jobs. Pick one:

- **Proof of life.** Recent posts show the business is active. Useful on a homepage or about page.
- **Proof of use.** Customer photos and real-world context show the product in use. Useful on product and category pages.
- **Audience growth.** A follow prompt. Useful in a footer, and honestly not much else.

The mistake is placing a growth-oriented feed halfway through a purchase decision. At that point you are inviting the visitor to leave your site for an app engineered to keep them there.

## Step 1: Curate rather than mirror

A raw chronological mirror of your feed will eventually show a post that undercuts the page: an unrelated festival greeting, a hiring announcement, a giveaway that ended months ago.

Curate instead:

- Choose posts that show the product, the workshop, the team, or the result
- Prefer posts with visible customer usage over studio shots you already have
- Keep the set fresh - a feed whose newest item is eight months old is worse than no feed
- Match the tone of the page it sits on

With the [Instagram Feed widget](/tools/instagram) you control the set that appears, so a product page can carry the six posts that actually show that product.

![Flow diagram showing how a curated Instagram feed becomes proof rather than decoration](/blog-figures/how-to-add-instagram-feed-to-website.webp)

## Step 2: Place it where it supports a decision

Good placements:

- **Below the product description**, after specifications, where the visitor is looking for reassurance
- **On a category page**, showing the range in real settings
- **On a homepage**, low on the page as a recency signal
- **On an about or careers page**, showing culture

Poor placements:

- Above the fold, competing with your primary offer
- Inside checkout or cart, where any external link is a leak
- On a lead-capture landing page whose only job is one action

Our guide on [social proof placement](/blog/social-proof-types-and-placement) covers the wider question of which proof belongs where.

## Step 3: Keep it fast

Social embeds are notorious for weight. An unmanaged feed can pull large scripts, iframes, tracking, and full-resolution images. On a phone, that shows up as a slow page and a wobbling layout.

Protect the page:

- **Lazy load** the feed - it is almost always below the fold, so it should never block first paint
- **Reserve the space** with a fixed aspect ratio so nothing shifts when images arrive
- **Limit the number of posts** on first render; six to nine is plenty
- **Use thumbnails**, not full-size media, in the grid
- **Watch third-party requests.** Every extra domain is another connection to set up

Our guide on [protecting Core Web Vitals with widgets](/blog/core-web-vitals-lightweight-widgets) has the measurement approach.

## Step 4: Handle the outbound click deliberately

Every tile in the feed is a link out of your site. Decide what you want:

- If the job is proof, consider opening posts in a lightbox on your own page rather than sending the visitor to the app.
- If the job is growth, make the follow action explicit and keep the tiles non-clickable, so the visitor chooses to leave rather than leaving by accident.
- Always open external links in a new tab so the purchase journey survives.

On mobile, tapping a post often deep-links into the Instagram app, and the visitor rarely comes back. Treat that as a real cost.

## Step 5: Keep permissions and credit straight

If you display customer photos:

- Get permission before featuring someone's post, even when it tags you
- Credit the account visibly
- Remove content promptly if the person asks
- Do not crop out context that changes the meaning of the post

This is basic courtesy, and it also avoids the reputational cost of a public complaint about reposting.

## Step 6: Measure whether it earns its space

A feed occupies prime page area and adds weight, so hold it to a standard:

- Scroll depth to the section, and time spent there
- Outbound clicks - a high rate on a product page may be a leak, not engagement
- Conversion rate of sessions that reached the section versus those that did not
- Page performance before and after adding it

If the section adds weight and leaks traffic without lifting conversion, replace it with static curated images or a [Photo Gallery](/tools/gallery).

## Common mistakes to avoid

- **Mirroring everything.** One off-brand post undoes the effect.
- **A stale feed.** Nothing signals "abandoned business" like a six-month-old newest post.
- **Feeds inside checkout.** Any external link there costs revenue.
- **Ignoring the weight.** Social embeds are among the heaviest third-party elements on the web.
- **No fallback.** If the feed fails to load, the section should collapse cleanly, not leave a blank hole.

## Frequently asked questions

### Does an Instagram feed help SEO?

Not directly - embedded social content is generally not indexed as your own content. It can help indirectly by improving engagement and trust, but a slow embed that hurts Core Web Vitals is a net negative.

### How many posts should the feed show?

Six to nine on first render. More than that adds weight without adding persuasion, and most visitors never scroll a second row of social tiles.

### Should the feed link out to Instagram?

On awareness pages, yes. On product and checkout pages, prefer an on-site lightbox so the buying journey is not interrupted by an app designed to hold attention.

### What if we do not post often?

Then do not embed a live feed. Use a curated set of your best images through a gallery instead. An out-of-date feed damages credibility more than an absent one.

## Next steps

Decide which job the feed does on each page, curate a set that supports it, and publish it with the [Instagram Feed widget](/tools/instagram). Measure the section against the page's conversion goal after two weeks, and remove it if it only adds weight.

[Start free](/signup) and try a curated feed on one page first.`,
  },
  {
    title: "How to Add a Contact Form Without Code",
    slug: "how-to-add-contact-form-without-code",
    excerpt:
      "Build a contact form people actually finish: field choice, validation, spam control, routing into your CRM, and the follow-up that turns it into revenue.",
    coverImage: "/blog-covers/how-to-add-contact-form-without-code.webp",
    publishedAt: "2026-01-23T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Contact forms people actually finish",
      motif: "form",
      figure: {
        kind: "checklist",
        title: "The five-field rule",
        items: [
          "Ask only what you will use",
          "Label above the field, always",
          "Errors beside the field",
          "Honest expectation on submit",
          "Route straight into the CRM",
        ],
        caption: "Every extra field is a reason to leave. Earn each one.",
      },
    },
    body: `A contact form is the cheapest sales channel most businesses own, and the one they treat most carelessly. It asks for information nobody will use, rejects valid phone numbers, and sends submissions to an inbox that one person checks on Fridays.

This guide covers how to build a form people finish and a process that turns the submission into a conversation.

## Step 1: Decide what happens after submit, first

Design the follow-up before the form. Write down:

- Who receives the submission, by name
- How quickly they must respond
- What the first response says
- Where the record lives so it is not lost in an inbox
- What counts as a qualified enquiry versus noise

If you cannot answer those, adding more fields will not help. Speed of response is the single strongest predictor of whether a web enquiry converts - see [speed to lead](/blog/lead-response-time-speed-to-lead).

## Step 2: Ask for the minimum

Every field is a small negotiation. Ask only for what you need to take the next step:

- **Name** - so the reply is human
- **One contact route** - email or phone, whichever you will actually use
- **What they need** - one open field beats five dropdowns
- **One qualifier** - budget band, city, or timeline, only if it changes your response

That is four fields. Company size, industry, "how did you hear about us", and job title can all be found later or asked in the reply.

If sales genuinely needs a qualifier, ask for it - but ask because it changes routing or priority, not because a form template had the field.

![Checklist panel showing the five rules of a contact form that gets completed](/blog-figures/how-to-add-contact-form-without-code.webp)

## Step 3: Build it without a developer

With the [Form Builder widget](/tools/form) you define fields, validation, and the success message visually, then paste one embed line onto the page. Submissions can be captured as leads in your workspace rather than only landing in an inbox.

Set up:

- Field labels that describe the answer, not the database column
- Required flags only on fields you truly need
- Input types that trigger the right mobile keyboard - email, tel, number
- A submit button labelled with the action: "Request a quote", not "Submit"
- A success message that states what happens next and when

Then place it with the [embed snippet guide](/help/installing-embed-snippet).

## Step 4: Get the mobile details right

Most enquiry forms are completed on a phone, often one-handed:

- **Labels above fields**, never placeholder-only. Placeholders vanish the moment typing starts.
- **Large touch targets** with room between them.
- **Correct keyboards** - a numeric pad for phone numbers, an email keyboard with the @ key for email.
- **Autofill support** through standard field names, so browsers can complete name, email, and phone.
- **No horizontal scrolling**, and no zoom on focus.

Test on a real phone with autofill enabled and one thumb. That is how the form will actually be used.

## Step 5: Validate kindly

Validation should help, not punish:

- Validate on blur, not on every keystroke
- Put the error message beside the field it belongs to
- Say what is wrong and how to fix it: "Enter a 10-digit mobile number" rather than "Invalid input"
- Never clear the form on error
- Do not reject valid formats - phone numbers with spaces, plus signs, or country codes are still phone numbers
- Never rely on colour alone to indicate an error

Accept messy input and clean it up server-side. Rejecting a real customer because they typed a space is an own goal.

## Step 6: Control spam without punishing humans

Spam is real, and most defences hurt genuine users more than bots:

- Prefer invisible checks - a hidden honeypot field, a submission-time threshold, and server-side rate limiting
- Use a challenge only if you are actually being flooded, and choose an accessible one
- Never use a puzzle that requires precise mouse movement
- Filter on the server as well, so obvious junk never reaches your sales queue

A visible captcha on a low-traffic contact form usually costs more real enquiries than it blocks spam.

## Step 7: Route it into a process

An enquiry sitting in a shared inbox is a lead you have already half lost. Route submissions so that:

- Each one creates a record with a source, timestamp, and owner
- The owner is notified immediately, on a channel they actually watch
- The status is trackable - new, contacted, qualified, won, lost
- Nothing depends on one person remembering to forward an email

If enquiries arrive from several forms, tag them by source so you know which page produced revenue rather than which page produced volume. Our guide on [website to CRM workflows](/blog/website-to-crm-workflow) covers the plumbing.

## Step 8: Offer a faster alternative

Some visitors will not fill a form at any length. Offer a parallel route:

- A [WhatsApp chat](/tools/whatsapp) button for quick questions
- A phone number for high-value or urgent enquiries
- A calendar link if a call is the natural next step

Give them a choice and let them pick the channel they trust.

## Common mistakes to avoid

- **Fifteen fields on a first-contact form.** Qualify in the conversation, not in the form.
- **A success page with no expectation.** "Thank you" is not information. Say when they will hear back.
- **No confirmation to the visitor.** Send an email or message so they have a record.
- **Sending to one inbox with no owner.** Enquiries die in shared mailboxes.
- **Not testing the failure path.** Break the network and see what the form does. Silent failure loses real money.

## Frequently asked questions

### How many fields should a contact form have?

Three to five for a first enquiry: name, one contact route, what they need, and at most one qualifier that changes how you respond. Each additional field measurably reduces completion.

### Should a contact form ask for phone or email?

Ask for the channel you will actually use to reply. If your team calls, ask for a phone number and say you will call. Asking for both and using neither promptly is the worst option.

### How do I stop contact form spam without a captcha?

Combine a hidden honeypot field, a minimum time-to-submit threshold, server-side rate limiting, and content filtering. These are invisible to real users and stop most automated submissions.

### Where should the contact form go?

On a dedicated contact page, and inline on any page where an enquiry is the natural next step - service pages, pricing pages, and high-intent landing pages. Keep the form itself identical and vary only the surrounding context.

## Next steps

Cut your form to the fields you will genuinely use, publish it with the [Form Builder widget](/tools/form), and make sure every submission lands in a queue with an owner and a response-time commitment. Add a [WhatsApp route](/tools/whatsapp) for the visitors who will never fill a form.

[Start free](/signup) and rebuild your enquiry form this week.`,
  },
  {
    title: "How to Add a Price Calculator to Your Website",
    slug: "how-to-add-price-calculator-to-website",
    excerpt:
      "Give visitors an instant estimate instead of a quote form: how to design pricing inputs, show an honest range, and capture the lead without hiding the number.",
    coverImage: "/blog-covers/how-to-add-price-calculator-to-website.webp",
    publishedAt: "2026-01-27T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Instant estimates instead of quote forms",
      motif: "form",
      figure: {
        kind: "flow",
        title: "How an estimate becomes a qualified lead",
        items: [
          "Visitor picks options",
          "Live estimate appears",
          "Range and assumptions shown",
          "Optional save or send",
        ],
        caption: "Show the number first. Ask for contact details second.",
      },
    },
    body: `"Contact us for pricing" is where a large share of qualified interest quietly dies. The visitor wanted a number, got a form, and went to a competitor who published one.

A price calculator solves this without forcing you to publish a rigid price list. It gives an honest, conditional estimate based on what the visitor actually needs, and it qualifies the enquiry before your sales team spends an hour on it.

## When a calculator is the right tool

A calculator fits when price genuinely depends on a few knowable variables:

- Quantity, size, area, or weight
- Service tier or scope
- Duration or subscription length
- Add-ons and options
- Location, when delivery or travel affects cost

It does not fit when pricing depends on discovery you cannot automate - a bespoke software build, a complex migration, or anything where the honest answer is "it depends on things we have not discussed". In those cases, publish a starting price and a typical range instead, and be explicit that it is indicative.

## Step 1: Model the pricing the way you actually quote

Sit with whoever writes quotes and write down the real logic:

- The base price and what it includes
- Which variables move the number, and by how much
- Minimum order values or minimum project sizes
- Where discounts kick in
- Taxes, delivery, and any charges that surprise people later

If two people on your team would quote the same job differently, fix that before automating it. A calculator that disagrees with your sales team costs more trust than it earns.

![Flow diagram showing a visitor moving from options to an estimate to a captured lead](/blog-figures/how-to-add-price-calculator-to-website.webp)

## Step 2: Keep the inputs few and obvious

Every input is friction, and confusing inputs produce wrong estimates:

- Aim for three to six inputs
- Use the customer's vocabulary, not your internal terms
- Prefer choices over free text - sliders, steppers, and option cards
- Set sensible defaults so a result appears before anything is touched
- Explain any input that is not self-evident with a short helper line

A visitor who does not know their exact square footage will guess. Design for that: accept ranges, and say that the estimate assumes the value they entered.

## Step 3: Show an honest number, with its assumptions

The output is where credibility is won or lost:

- **Show a range** when a range is the truth. A single precise figure you cannot honour is worse than a wide honest one.
- **State what it includes** and, just as importantly, what it excludes.
- **Show the tax position.** Whether a figure is inclusive of GST is not a detail.
- **Update live** as inputs change, so the visitor understands which choice drives the cost.
- **Say it is an estimate**, and say what would change it.

Never inflate the displayed number to leave discount room. A visitor who compares your estimate with your final quote and finds a gap will not come back.

## Step 4: Build it without a developer

The [Price Calculator widget](/tools/calculator) lets you define inputs, rules, and the output format visually, then embed it on a page with one line. No formulas in code, no developer ticket every time a rate changes.

Practical setup:

- Group inputs in the order a customer thinks about them
- Show the running total near the inputs, visible without scrolling on a phone
- Add a clear next action beside the estimate
- Keep a version note so you know when rates last changed

Follow the [embed snippet guide](/help/installing-embed-snippet) to place it on your pricing or service page.

## Step 5: Capture the lead without holding the number hostage

The strongest pattern is: show the estimate, then offer to save or send it.

- Display the result immediately, with no gate
- Offer "Email me this estimate" or "Send on WhatsApp" as a convenience, not a toll
- Pre-fill the message with the selected options so the follow-up conversation starts with context
- Route the submission into your lead queue with the inputs attached

Gating the number behind a form does increase form fills and decrease qualified conversations. You collect more addresses and close fewer deals. Our guide on [lead capture best practices](/blog/lead-capture-form-best-practices) covers the trade-off in detail.

## Step 6: Use the data

A calculator generates something a quote form never does: a record of what people are trying to buy, including the ones who never contacted you.

Track:

- Most-selected option combinations
- Where visitors abandon the calculator
- The gap between calculated estimates and final quoted values
- Which inputs correlate with deals that close

If most visitors configure something you barely sell, that is a product signal. If estimates consistently land below your final quotes, your model is wrong and your sales team is absorbing the difference.

## Common mistakes to avoid

- **Hiding the result behind a form.** It converts worse and attracts unqualified contacts.
- **False precision.** A figure to the rupee on a project that will be re-scoped is not honest.
- **Stale rates.** Assign an owner and review quarterly, or after any cost change.
- **Ignoring minimums.** If you will not take a job under a threshold, say so in the result.
- **No route to a human.** Some estimates should end in a conversation; make that easy with a [WhatsApp chat](/tools/whatsapp) or a [contact form](/tools/form).

## Frequently asked questions

### Should I show prices if my competitors do not?

Usually yes. Publishing an honest range filters out enquiries you would have rejected and wins the visitors who refuse to contact a business that hides its pricing. You can show a range rather than a fixed price.

### What if my pricing is too complex for a calculator?

Then simplify what you show. Model the three or four variables that explain most of the variation, present the result as a range, and be explicit that a final quote follows a short conversation.

### Should the estimate require an email address?

No. Show the number, then offer to email or message it as a convenience. Gating results collects more addresses but fewer serious buyers.

### How often should I update the rates?

Review quarterly at minimum, and immediately after any input-cost change. Record the last-reviewed date internally so nobody has to guess whether the model is current.

## Next steps

Write down how your team actually quotes, reduce it to the three or four variables that explain most of the price, and publish it with the [Price Calculator widget](/tools/calculator). Show the number freely and offer to send it - the qualified conversations follow.

[Start free](/signup) and replace "contact us for pricing" this week.`,
  },
  {
    title: "How to Add an Event Calendar to Your Website",
    slug: "how-to-add-event-calendar-to-website",
    excerpt:
      "Publish events people actually attend: clear dates and timezones, add-to-calendar links, honest capacity, and a registration path that does not lose attendees.",
    coverImage: "/blog-covers/how-to-add-event-calendar-to-website.webp",
    publishedAt: "2026-01-30T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Events people can actually find and attend",
      motif: "timer",
      figure: {
        kind: "checklist",
        title: "Every event listing needs",
        items: [
          "Date, start time, timezone",
          "Location or joining link",
          "Who it is for, in one line",
          "Add-to-calendar action",
          "Clear registration next step",
        ],
        caption:
          "Missing any one of these turns interest into an email asking for it.",
      },
    },
    body: `Event listings fail in boring, expensive ways: the timezone is missing, the venue is a building name with no address, the "register" link goes to a homepage, and the whole thing is a poster image that a phone cannot read.

This guide covers how to publish events that people can find, understand, add to their calendar, and turn up to.

## Step 1: Write the listing a stranger can act on

Every event entry needs six facts, visible without a click:

1. **Title** that says what happens, not a clever slogan
2. **Date and start time**, with the timezone stated
3. **Duration or end time**
4. **Location** - full address for physical events, platform for online ones
5. **Who it is for**, in one line
6. **What the next step is** - register, book, or just turn up

If any of these is missing, your inbox will supply the gap. Write "Saturday, 14 March 2026, 6:00 PM IST" rather than "this Saturday evening". Relative dates break the moment the page is cached, shared, or found through search three weeks later.

## Step 2: Handle timezones honestly

For online events, timezone is not an optional detail:

- Always print the timezone abbreviation next to the time
- For an audience spread across zones, show one canonical time and let the add-to-calendar file do the conversion
- Never say "9 AM our time"
- If registration is region-specific, say so in the listing

![Checklist panel listing the six facts every event listing must show](/blog-figures/how-to-add-event-calendar-to-website.webp)

## Step 3: Publish it without touching your theme

The [Event Calendar widget](/tools/calendar) lets you list upcoming events with dates, locations, and add-to-calendar links, and embed the list on any page with one line.

Set up:

- Sorting by date, with past events dropping off automatically
- A visible "upcoming" versus "past" distinction if you keep an archive
- Consistent formatting for date, time, and location
- One primary action per event

Place it with the [embed snippet guide](/help/installing-embed-snippet). Because the listing lives in your workspace, adding next month's event is a two-minute job.

## Step 4: Give an add-to-calendar action

The gap between "interested" and "attended" is almost always the calendar. Offer a one-tap add that includes:

- Correct start and end times with timezone
- Title and a short description
- Location or joining link inside the event body
- A reminder set by default where the platform allows it

An event that lands in someone's calendar has a far better chance of being attended than one that lives only in an email.

## Step 5: Make registration short

If the event needs registration, keep the form to the minimum that lets you run it:

- Name and one contact route
- Attendance mode only if you run hybrid events
- Any genuine capacity constraint, such as dietary requirements for a catered session

Anything you can ask after registration should be asked after registration. Use the [Form Builder widget](/tools/form) so submissions land in your lead queue with the event as the source, and see [lead capture best practices](/blog/lead-capture-form-best-practices) for field discipline.

Confirm immediately. A registration with no confirmation message is indistinguishable from a failed one.

## Step 6: Be honest about capacity and urgency

Scarcity works only when it is true:

- Show remaining seats only if you actually track them
- If registration closes, close it and say so rather than leaving a dead form
- If a session is full, offer a waitlist instead of silence
- Never restart a countdown that has expired

A [Countdown Timer](/tools/countdown) can be useful for a genuine registration deadline. Our post on [honest urgency](/blog/countdown-timers-honest-urgency) covers where the line sits.

## Step 7: Plan what happens after the event

Most event pages are abandoned the day after. Decide the after-state in advance:

- Replace the registration button with a recording link, or with "This event has ended"
- Keep the page live if it holds useful content - it may rank and bring traffic to the next event
- Link the past event to the next upcoming one
- Publish a short recap so the URL keeps earning

Deleting the page throws away links and search history. Updating it compounds them.

## Common mistakes to avoid

- **A poster image with the details baked in.** It cannot be read by search engines, screen readers, or a phone at arm's length.
- **No timezone.** Guaranteed to produce no-shows for online events.
- **Registration that goes to a generic homepage.** Link to the specific action.
- **Past events left at the top of the list.** Sort by date and archive automatically.
- **No reminder.** Send one the day before and one an hour before for online sessions.

## Frequently asked questions

### Should past events stay on the website?

Yes, in an archive, especially if they have recordings or summaries. They demonstrate consistency, they can rank for topic searches, and they give first-time visitors a sense of what your events are like.

### How far in advance should events be published?

Publish as soon as date, time, and location are fixed - typically three to six weeks ahead for a workshop or webinar. Publishing early gives the page time to be found and gives attendees time to plan.

### Do I need registration for a free event?

Only if you need to control capacity, send joining links, or follow up afterwards. If none of those apply, an add-to-calendar action alone will get more attendance than a form.

### How do I reduce no-shows for online events?

Send a confirmation immediately, provide an add-to-calendar file containing the joining link, and send a reminder an hour before. Most no-shows are forgetfulness, not lost interest.

## Next steps

List your next three events with complete details and timezones, publish them with the [Event Calendar widget](/tools/calendar), and give every event an add-to-calendar action. Keep the past ones as an archive rather than deleting them.

[Start free](/signup) and get your events page live today.`,
  },
  {
    title: "How to Build a Careers Page With a Job Board",
    slug: "how-to-build-careers-page-with-job-board",
    excerpt:
      "Turn a neglected careers page into a hiring channel: listings that filter properly, honest descriptions, salary transparency, and an application path that works.",
    coverImage: "/blog-covers/how-to-build-careers-page-with-job-board.webp",
    publishedAt: "2026-02-03T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Careers pages that attract the right applications",
      motif: "form",
      figure: {
        kind: "compare",
        title: "Job listings that work",
        items: [
          "Specific title and level",
          "Location and work mode stated",
          "Salary range published",
          "Real day-to-day responsibilities",
        ],
        items2: [
          "Invented, unsearchable job titles",
          "Location left ambiguous",
          "Compensation withheld",
          "Copy-pasted requirement lists",
        ],
        caption:
          "Vague listings produce volume. Specific listings produce candidates.",
      },
    },
    body: `Most careers pages are a stock photo, a paragraph about culture, and an email address. They generate either nothing or a flood of irrelevant applications, and both outcomes waste the hiring manager's time.

A careers page is a landing page with a conversion goal. This guide covers how to build one that attracts the right people and filters out the rest before anyone reads a CV.

## Step 1: Write listings candidates can self-select against

The job of a listing is to help the right person say yes and the wrong person say no, quickly. Every listing needs:

- **A standard job title.** People search for "Backend Developer", not "Code Wizard". Non-standard titles are invisible in search.
- **Level.** Junior, mid, senior, or lead. Ambiguity wastes everyone's time.
- **Location and work mode.** On-site, hybrid with days specified, or remote with timezone expectations.
- **Employment type.** Full-time, contract, internship.
- **Compensation range.** The single strongest filter you can publish.
- **The actual work.** What this person will do in their first ninety days.
- **Genuine requirements.** Separate must-have from nice-to-have and be honest about which is which.

A ten-item requirement list copied from a template does not describe a job. Three real requirements do.

![Comparison panel contrasting specific job listings with vague ones](/blog-figures/how-to-build-careers-page-with-job-board.webp)

## Step 2: Publish salary ranges

Withholding compensation is the most expensive habit in hiring. It produces applications from people you cannot afford and from people you would underpay, and both discover the mismatch after several rounds of interviews.

Publishing a range:

- Filters out mismatches before anyone invests time
- Signals that you negotiate honestly
- Increases applications from experienced candidates who refuse to apply blind
- Reduces offer-stage dropouts

If you genuinely cannot publish a number, publish the band and what moves a candidate within it.

## Step 3: Build the board without a developer

The [Job Board widget](/tools/jobs) lets you list open roles with filters and apply links, and embed the board on your careers page with one line.

Configure:

- Filters that match how candidates search - department, location, work mode, type
- A visible count of open roles
- A consistent listing layout so roles are comparable at a glance
- A clear apply action per role, not one shared email address
- An honest empty state when nothing is open, with a route to register interest

Place it with the [embed snippet guide](/help/installing-embed-snippet). Because listings live in your workspace, closing a filled role takes seconds - and a stale listing is the fastest way to annoy candidates.

## Step 4: Make the application path short and honest

The application step loses more good candidates than the listing does:

- Ask for a CV and one contact route. Nothing else is required to start a conversation.
- Never make a candidate retype their entire CV into a form.
- If you need a portfolio or code sample, ask for a link, not an upload.
- State how long the process takes and how many stages there are.
- Confirm receipt immediately, and say when they will hear back.

If you promise a response by a date, respond by that date - including to the people you reject. Candidate experience is public now, and silence is the most-cited complaint.

Use the [Form Builder widget](/tools/form) so applications land in a tracked queue with the role as the source, rather than in a shared inbox.

## Step 5: Show what the company is actually like

Culture copy is worthless when it is generic. Replace adjectives with evidence:

- A [Team Showcase](/tools/team) with real people, roles, and how long they have been there
- A [Timeline](/tools/timeline) of company milestones
- Specific benefits with specific terms - leave policy, working hours, equipment, learning budget
- Honest description of the working pattern, including on-call or shift expectations
- Photographs of the actual office, not stock imagery

Candidates screen employers as carefully as employers screen candidates. Specifics are what they screen on.

## Step 6: Get the page found

A careers page can rank, and job listings can appear in search:

- Give each role its own URL rather than a single page with a modal
- Use the standard title in the page title and heading
- Include location in the title where it matters
- Keep listings live and marked closed rather than deleted, so links survive
- Mark up listings with job posting structured data if your platform supports it - see our [schema markup guide](/blog/schema-markup-guide-small-business)

## Common mistakes to avoid

- **Listings with no location.** Remote-or-not is the first thing every candidate checks.
- **Roles left open after filling.** It wastes candidate time and damages your reputation.
- **Applications to a generic email.** They get lost and nobody owns them.
- **A wall of requirements.** Long lists deter exactly the candidates who would have grown into the role.
- **No response to rejected applicants.** A two-line message costs nothing and is remembered.

## Frequently asked questions

### Should we publish salary ranges on job listings?

Yes. It filters mismatches early, increases applications from experienced candidates, and reduces offer-stage dropouts. If you cannot publish a precise number, publish a band and explain what moves a candidate within it.

### How long should a job description be?

Long enough to describe the actual work and honest requirements - usually 300 to 600 words. Beyond that you are writing a contract, not an advertisement.

### Should each job have its own page?

Yes. Separate URLs can be shared, bookmarked, indexed, and tracked individually, and they let you see which roles attract traffic and which do not.

### What should the careers page show when nothing is open?

Say so plainly and offer a way to register interest for future roles. An empty board with no explanation reads as a broken page.

## Next steps

Rewrite your open roles with a standard title, location, work mode, and salary range, then publish them with the [Job Board widget](/tools/jobs). Add a [Team Showcase](/tools/team) so candidates can see who they would work with, and commit to a response deadline you will actually meet.

[Start free](/signup) and build a careers page that earns applications.`,
  },
  {
    title: "How to Add a Before and After Image Slider",
    slug: "how-to-add-before-and-after-image-slider",
    excerpt:
      "Show transformations credibly with a draggable before and after comparison: shooting matched pairs, avoiding misleading edits, and keeping it fast and accessible.",
    coverImage: "/blog-covers/how-to-add-before-and-after-image-slider.webp",
    publishedAt: "2026-02-06T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Before and after comparisons that hold up",
      motif: "media",
      figure: {
        kind: "checklist",
        title: "A credible comparison pair",
        items: [
          "Same angle and framing",
          "Same lighting and white balance",
          "Same distance and lens",
          "No retouching between the two",
          "Context stated in the caption",
        ],
        caption:
          "If the two photos differ in anything but the result, the comparison proves nothing.",
      },
    },
    body: `A before and after slider is one of the most persuasive elements available to a service business - renovation, cleaning, dentistry, salons, restoration, photo editing, landscaping. It is also one of the easiest to make look dishonest.

This guide covers how to shoot pairs that hold up to scrutiny, present them credibly, and keep the widget fast and usable.

## Why the slider beats two side-by-side photos

Two photos placed next to each other ask the viewer to compare mentally. A slider makes the comparison physical: the same pixels, the same frame, one variable changed. The viewer controls the reveal, which makes the result feel discovered rather than claimed.

That is exactly why the pair has to be honest. A slider invites close inspection, and a mismatched pair is obvious.

## Step 1: Shoot a matched pair

The single rule: everything except the result must be identical.

- **Same position.** Mark the spot on the floor. Use a tripod if you have one.
- **Same framing and lens.** Note the focal length. A wider shot after a renovation exaggerates space.
- **Same lighting.** Shoot at the same time of day, with the same lights on and curtains in the same position.
- **Same white balance and exposure.** A warmer, brighter "after" is doing work the service did not do.
- **Same tidiness, except for the result.** Removing clutter between shots is a different claim.

If you cannot reshoot the before, say so. "Before photo supplied by the customer" is credible. A polished after next to a phone snapshot in bad light is not.

![Checklist panel listing the requirements of a credible before and after photo pair](/blog-figures/how-to-add-before-and-after-image-slider.webp)

## Step 2: Do not retouch across the pair

Editing is where credibility dies:

- Apply identical processing to both frames, or none
- Never sharpen, brighten, or colour-grade only the after
- Never remove objects from the after that were present before, unless removing them was the job
- Do not crop differently

If you would be uncomfortable showing the raw files, do not publish the comparison.

## Step 3: Add context in the caption

The images show what changed. The caption explains what it means:

- What the work was
- How long it took
- Any relevant constraints - budget band, room size, condition
- Whether results vary, and why

For regulated categories such as dental, cosmetic, or medical services, follow the advertising rules that apply in your market, including any required disclaimers about individual results. Our guide on [trust signals](/blog/trust-signals-indian-ecommerce) covers the general principle: claims and evidence must sit next to each other.

## Step 4: Add the slider without touching your theme

The [Before / After widget](/tools/beforeafter) provides the draggable comparison. Upload the pair, set the starting handle position, add labels, publish, and paste the embed line onto the page.

Configure:

- **Orientation.** Vertical handle for side-to-side changes, horizontal for top-to-bottom.
- **Start position.** Around 50 per cent, or slightly toward "before" so the improvement is discovered.
- **Labels.** Explicit "Before" and "After" markers, so the direction is never ambiguous.
- **Aspect ratio.** Identical for both images, and reserved in the layout so nothing shifts.

Place it with the [embed snippet guide](/help/installing-embed-snippet).

## Step 5: Make it work on touch and keyboard

A drag interaction has real accessibility risk:

- The handle must be draggable by touch with a generous target
- Dragging the handle must not scroll the page, and scrolling the page must not move the handle
- Keyboard users need arrow-key control with a visible focus state
- Provide a non-drag fallback, such as a tap to toggle, for anyone who cannot drag
- Give both images meaningful alt text describing each state

Test it one-handed on a phone while scrolling past. If the page gets stuck, visitors will leave rather than fight it.

## Step 6: Protect page speed

Two full-size images per comparison adds up quickly on a portfolio page:

- Compress both images and serve modern formats
- Size them for display, not for print
- Lazy load every comparison below the fold
- Reserve the aspect ratio so the layout never jumps
- Limit a page to a handful of comparisons and link to more

See our [image optimization guide](/blog/image-optimization-for-websites) for the workflow, and [Core Web Vitals with widgets](/blog/core-web-vitals-lightweight-widgets) for the measurement.

## Step 7: Place it where the doubt lives

A comparison answers "will this work for something like mine?". Put it where that doubt appears:

- On a service page, beside the description of that specific service
- In a portfolio entry, alongside scope and duration
- On a landing page, above the enquiry form
- Near a testimonial from the same customer, so the evidence compounds

Pair it with the [Portfolio widget](/tools/portfolio) when each project needs its own detail view, and with a [contact form](/tools/form) so the impressed visitor has somewhere to go.

## Common mistakes to avoid

- **Different angles.** The most common and most obvious tell.
- **Brighter after.** Lighting changes read as manipulation.
- **No context.** A result without scope, time, or cost is not evidence.
- **Huge uncompressed images.** Two heavy files per comparison, several comparisons per page.
- **Drag-only interaction.** It locks out keyboard users and frustrates people scrolling on a phone.

## Frequently asked questions

### How do I make before and after photos look credible?

Shoot from the same position with the same framing, lens, lighting, and processing, and change only the result. State the context in a caption. If the before photo came from the customer, say so.

### Can I edit before and after images?

Only identically, and only in ways that do not change what is being claimed. Any edit applied to one image and not the other makes the comparison misleading.

### Where should before and after sliders go on a page?

Immediately beside the claim they support - within the relevant service description or portfolio entry - and above the enquiry action, so a convinced visitor can act without hunting.

### Are before and after images allowed in regulated industries?

It depends on your market and category. Medical, dental, and cosmetic advertising often carry specific requirements about disclaimers, consent, and typicality of results. Check the rules that apply to you before publishing.

## Next steps

Reshoot one project pair properly - same spot, same light, same processing - and publish it with the [Before / After widget](/tools/beforeafter). Add a caption with scope and duration, and place it directly beside the service it proves.

[Start free](/signup) and show your work honestly.`,
  },
];
