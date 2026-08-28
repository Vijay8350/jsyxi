import type { BlogLibraryPost } from "./blog-library-types";

export const BLOG_POSTS_I: BlogLibraryPost[] = [
  {
    title: "How to Add a Restaurant Menu to Your Website",
    slug: "how-to-add-restaurant-menu-to-website",
    excerpt:
      "Replace the PDF menu nobody can read on a phone: how to structure categories, price honestly, mark dietary information, and keep the menu current.",
    coverImage: "/blog-covers/how-to-add-restaurant-menu-to-website.webp",
    publishedAt: "2026-05-29T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "The PDF menu is costing you covers",
      motif: "grid",
      figure: {
        kind: "compare",
        title: "Menu formats compared",
        items: [
          "Text menu, readable on a phone",
          "Prices beside every item",
          "Dietary and allergen markers",
          "Updated the day prices change",
        ],
        items2: [
          "A PDF that opens in a new app",
          "A photo of a printed menu",
          "Prices only on request",
          "Last updated two seasons ago",
        ],
        caption:
          "A menu is the most-visited page a restaurant owns. Treat it like a product page.",
      },
    },
    body: `The menu is the most-visited page on almost every restaurant website, and it is the page most often published as a PDF or a photograph of a printed card. Both fail on a phone, which is where nearly every hungry person is looking.

This guide covers how to publish a menu people can actually read, search, and act on.

## Why PDFs and images fail

A PDF menu forces the visitor to download a file, wait, then pinch and drag around a page designed for A4 paper. A photographed menu is worse: the text is not selectable, not searchable, not translatable, and invisible to screen readers and search engines.

Both also make updates painful. When a price changes, someone has to open a design file, re-export, and re-upload. In practice that means the published menu drifts from the real one, and staff spend their evenings correcting customers.

A text menu fixes all of it: it loads instantly, reflows to any screen, can be read aloud, can be indexed, and can be edited in two minutes.

## Step 1: Structure it the way people order

Group dishes the way a guest thinks about a meal, not the way your kitchen is organised:

- Starters, mains, sides, desserts, drinks
- Or by cuisine or counter if that is genuinely how you sell
- Keep the ordering consistent with your printed menu so regulars are not confused
- Put the section people came for near the top - for a bakery that is not the drinks list

Keep categories to a manageable number. Nine sections with four items each is harder to scan than four sections with nine.

![Comparison panel contrasting a readable text menu with PDF and photo menus](/blog-figures/how-to-add-restaurant-menu-to-website.webp)

## Step 2: Write item descriptions that do work

Each item needs a name, a short description, and a price. The description should answer what the guest cannot see:

- The main components, so nobody has to ask
- Portion or piece count where it affects the decision
- Spice level, in words a first-time guest understands
- Preparation, where it distinguishes the dish

Two lines is plenty. A paragraph of adjectives per item makes the menu unreadable on a phone.

## Step 3: Publish prices honestly

- Show a price for every item; "market price" should be rare and explained
- State whether taxes are included
- Disclose any service charge, packing charge, or minimum order clearly
- If delivery prices differ from dine-in prices, say so on the page rather than at checkout
- Mark items that are only available at certain times

Hidden charges discovered at the payment step are the single most common complaint in food ordering, and they are entirely avoidable on the menu page.

## Step 4: Mark dietary and allergen information

This is a safety issue as much as a service one:

- Mark vegetarian, vegan, and egg-containing items clearly
- Note common allergens - nuts, dairy, gluten, shellfish
- Use a text label or a labelled icon, never colour alone
- Add a line telling guests to inform staff about allergies, because kitchens share equipment
- Never guess. If you cannot verify an item, say the information is unavailable

## Step 5: Build it without touching your theme

The [Restaurant Menu widget](/tools/menu) gives you a categorised menu with dishes, descriptions, and prices that you edit in a visual editor and embed with one line.

Set up:

- Sections in service order
- Item name, description, price, and dietary markers
- An availability flag for seasonal or sold-out items
- A note field for the tax and service-charge line

Place it with the [embed snippet guide](/help/installing-embed-snippet). Because the menu lives in your workspace, a price change is a two-minute edit rather than a redesign.

## Step 6: Surround the menu with the decisions it triggers

A guest reading the menu is close to acting. Give them the next step on the same screen:

- Opening hours with a live open or closed state, using the [Business Hours widget](/tools/hours) - see our [guide to publishing hours](/blog/how-to-show-business-hours-on-website)
- A tap-to-call number for reservations
- A [WhatsApp route](/tools/whatsapp) for order enquiries
- Your address and a [map](/tools/maps) with directions
- Photos of the signature dishes through a [gallery](/tools/gallery)

## Step 7: Keep it current

- Assign one owner for the menu
- Update prices the day they change, not at the end of the month
- Mark seasonal items unavailable instead of deleting them, so returning guests are not confused
- Review the whole menu quarterly against what the kitchen actually serves
- Remove permanently discontinued dishes

An out-of-date menu creates disappointed guests at the table, which is the most expensive place to disappoint someone.

## Common mistakes to avoid

- **A PDF or photographed menu.** Unreadable on a phone, invisible to search.
- **Missing prices.** Guests assume the worst and leave.
- **Undeclared service charges.** They become a complaint at the bill.
- **Colour-only dietary markers.** Inaccessible and easy to misread.
- **No update owner.** The published menu drifts from the real one.

## Frequently asked questions

### Should a restaurant menu be a PDF or a web page?

A web page. PDFs require a download, do not reflow on a phone, cannot be read by screen readers, and are far harder to keep updated. A text menu loads instantly and can be edited in minutes.

### Should I show prices on my online menu?

Yes, for every item, with the tax position stated. Menus without prices lose bookings and orders, because guests assume the answer is expensive.

### How do I show dietary information on a menu?

Use clear text labels or labelled icons for vegetarian, vegan, and common allergens, never colour alone, and add a line asking guests to inform staff of allergies since kitchens share equipment.

### How often should I update the online menu?

The day anything changes. Assign one owner, and review the whole menu quarterly against what the kitchen actually serves.

## Next steps

Type your current menu out as text, publish it with the [Restaurant Menu widget](/tools/menu), and put your hours, phone number, and directions on the same screen.

[Start free](/signup) and replace the PDF this week.`,
  },
  {
    title: "How to Add a Portfolio to Your Website",
    slug: "how-to-add-portfolio-to-your-website",
    excerpt:
      "Show work that wins enquiries: which projects to include, what context each needs, how to filter a growing archive, and where to put the enquiry action.",
    coverImage: "/blog-covers/how-to-add-portfolio-to-your-website.webp",
    publishedAt: "2026-06-02T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Work that answers can you do mine",
      motif: "media",
      figure: {
        kind: "checklist",
        title: "What every project entry needs",
        items: [
          "The client's starting problem",
          "Scope, budget band, timeline",
          "What you actually did",
          "The measurable result",
          "Images that show the work",
        ],
        caption:
          "A picture without context is decoration. Context is what converts.",
      },
    },
    body: `A portfolio has one job: convince a stranger that you have solved a problem like theirs. Most portfolios do not do this. They show a grid of attractive images with no context, so the visitor cannot tell whether the work was a two-week job or a two-year one, or whether it worked.

This guide covers how to build a portfolio that produces enquiries rather than compliments.

## Step 1: Choose projects by what they prove

Do not publish everything. Choose projects that collectively cover:

- The **types of work** you actually want more of
- The **industries** your best clients come from
- The **budget bands** you want to attract
- The **constraints** you handle well - tight timelines, heritage buildings, regulated categories

If you want more of a certain kind of work, your portfolio must contain examples of it. A portfolio full of small jobs attracts small jobs.

Six well-documented projects beat thirty thumbnails.

## Step 2: Give each project real context

An image shows what it looks like. The context shows whether you can do it again. Each entry needs:

- **The starting problem** in the client's words where possible
- **Scope** - what was and was not included
- **Constraints** - budget band, timeline, site conditions, technical limits
- **What you did**, specifically, not "we delivered a solution"
- **The result**, measured if you can measure it
- **Duration**, because timeline is a real buying question

If a client will not let you name them, describe them generically - "a 40-seat cafe in a heritage building" - and say why the name is withheld.

![Checklist panel listing what every portfolio project entry needs](/blog-figures/how-to-add-portfolio-to-your-website.webp)

## Step 3: Photograph the work properly

- Shoot the finished work in good light, from angles that show scale
- Include detail shots of the parts that took skill
- Include a before image where the transformation is the point - see our [before and after guide](/blog/how-to-add-before-and-after-image-slider)
- Keep aspect ratios consistent so the grid does not look ragged
- Compress and size the images properly; a portfolio page is the easiest page to make slow

Our [image optimization guide](/blog/image-optimization-for-websites) covers the workflow.

## Step 4: Make the archive filterable

Once you pass about a dozen projects, visitors need to narrow. The [Portfolio widget](/tools/portfolio) gives you a filterable grid with a detail view for each project.

Filter by the dimensions clients actually think in:

- Type of work
- Industry or property type
- Scale or budget band
- Location, if you work regionally

Avoid filters nobody uses. Three good filters beat eight vanity ones. Always show a result count and a way to clear filters.

## Step 5: Put the enquiry action where conviction peaks

A visitor who has just read a project that resembles their own is as close to enquiring as they will get. Do not make them navigate to a contact page.

- Put a short enquiry action at the end of every project detail view
- Pre-fill the project name so the conversation starts with context
- Offer an alternative channel such as [WhatsApp](/tools/whatsapp) for quick questions
- Use the [Form Builder widget](/tools/form) so the enquiry lands in your lead queue with its source attached

See our [lead capture best practices](/blog/lead-capture-form-best-practices) for how short that form should be.

## Step 6: Support the portfolio with proof

Each project becomes stronger next to:

- A quote from that client, with a real name and role
- A [logo showcase](/tools/logos) of clients you can name
- A [timeline](/tools/timeline) of company milestones for credibility
- A named team, so the visitor knows who would do the work

## Step 7: Keep it current

- Add projects while the details are fresh, not annually
- Retire work that no longer represents your standard
- Update results where you have follow-up data
- Check that every image still loads and every client permission still stands

A portfolio whose newest project is three years old suggests you have not worked since.

## Common mistakes to avoid

- **Images with no context.** The visitor cannot judge relevance.
- **Everything you have ever done.** It dilutes the work you want more of.
- **Unnamed, undated projects.** They read as stock photography.
- **No enquiry route from the project page.** Conviction fades on the way to the contact page.
- **Huge unoptimised images.** Portfolio pages are the slowest pages on most agency sites.

## Frequently asked questions

### How many projects should a portfolio show?

Six to twelve well-documented projects for most service businesses. Beyond that, add filters so visitors can find work like theirs rather than scrolling an archive.

### What should each portfolio entry include?

The starting problem, scope and constraints, what you did, the result, the duration, and images that show the finished work. Context is what turns a picture into evidence.

### Can I show work if the client will not be named?

Yes. Describe the client generically, state why the name is withheld, and keep every other detail accurate. Never imply a named client approved something they did not.

### Where should the enquiry form go on a portfolio?

At the end of each project detail view, pre-filled with the project name. That is the moment a visitor is most convinced you can do their job.

## Next steps

Pick the six projects that best represent the work you want more of, write the context for each, and publish them with the [Portfolio widget](/tools/portfolio) with an enquiry action on every entry.

[Start free](/signup) and turn your work into enquiries.`,
  },
  {
    title: "How to Add a Team Page to Your Website",
    slug: "how-to-add-a-team-page-to-your-website",
    excerpt:
      "A team page is a trust page. Which people to include, what each profile needs, how to handle photos and privacy, and how to keep it from going stale.",
    coverImage: "/blog-covers/how-to-add-a-team-page-to-your-website.webp",
    publishedAt: "2026-06-05T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Real faces beat a stock photo of a handshake",
      motif: "grid",
      figure: {
        kind: "checklist",
        title: "What a profile needs",
        items: [
          "Real photo, consistent framing",
          "Full name and actual role",
          "What they are responsible for",
          "One credential that matters",
          "A contact route, where sensible",
        ],
        caption:
          "Visitors are checking whether real people work here. Give them the evidence.",
      },
    },
    body: `A team page is not an org chart. It is a trust page. A visitor deciding whether to hand over money, data, or a project is checking whether real, competent people work at this business.

That is why stock photography on a team page is worse than no team page at all.

## Who to include

Include the people a customer would actually deal with or benefit from knowing about:

- Founders and leadership, for credibility
- Client-facing staff, so enquiries feel personal
- Technical or professional staff whose qualifications matter - clinicians, engineers, architects, chefs
- Long-serving team members, because tenure signals stability

Do not list everyone by default. A page of forty faces reads as a directory; a page of eight relevant people reads as a team.

Also respect preferences. Some staff do not want their photograph or surname published, and that is a reasonable request to honour.

## What each profile needs

- **A real photograph**, taken in consistent light and framing
- **Full name**, unless the person has asked otherwise
- **Actual job title**, not an invented one
- **What they are responsible for**, in one line a customer understands
- **One credential that matters** - a qualification, a registration number, years in the trade
- **A contact route**, for roles where direct contact is appropriate

Skip the personality filler. "Loves coffee and cricket" adds nothing to a buying decision, and it makes a professional services page read as unserious.

![Checklist panel listing what a team profile needs](/blog-figures/how-to-add-a-team-page-to-your-website.webp)

## Get the photographs right

Consistency matters more than production value:

- Same background, same lighting, same crop for everyone
- Same distance and angle, so nobody looks more important by accident
- Neutral expression or a genuine one, not a forced pose
- Retake the whole set when it drifts, rather than adding one mismatched photo

If you cannot photograph everyone consistently, use a plain initial-based placeholder for the rest. A mixed set of selfies and studio portraits looks careless.

## Build it without editing your theme

The [Team Showcase widget](/tools/team) handles photos, roles, bios, and social links, and embeds with one line.

Configure:

- Grid columns for desktop, tablet, and phone
- Whether bios appear inline or in a detail view
- Which social or contact links appear per person
- Ordering - by seniority, by function, or alphabetically within groups

Place it with the [embed snippet guide](/help/installing-embed-snippet).

## Where a team page earns its place

- **About page**, as the main credibility surface
- **Service pages**, showing the specialist who does that work
- **Careers page**, so candidates see who they would work with - see our [careers page guide](/blog/how-to-build-careers-page-with-job-board)
- **Contact page**, so an enquiry feels addressed to a person

For professional services, a named specialist beside a service description does more than any amount of copy about expertise.

## Handle privacy properly

- Ask before publishing a name, photograph, or contact detail
- Let people opt out without explanation
- Remove a leaver's profile promptly, ideally the week they leave
- Do not publish personal phone numbers or home locations
- Be careful with staff in sensitive roles

See our [privacy compliance guide](/blog/website-privacy-compliance-india) for the wider obligations.

## Keep it from going stale

A team page dates faster than any other page:

- Review it monthly alongside the rest of your [maintenance checklist](/blog/website-maintenance-checklist-monthly)
- Remove leavers immediately - a departed employee still listed is a credibility problem and sometimes an awkward one
- Add new joiners within their first month
- Refresh photographs when the set drifts

## Common mistakes to avoid

- **Stock photos of models.** One reverse image search destroys the whole page.
- **Inconsistent photographs.** They make the team look assembled from strangers.
- **Invented titles.** "Chief Happiness Officer" undermines a professional service page.
- **Leavers left up for months.** It signals nobody maintains the site.
- **No roles.** A face without a responsibility tells the visitor nothing.

## Frequently asked questions

### Should a small business have a team page?

Yes, especially in services. For a business where trust decides the sale, showing real, named, qualified people is one of the strongest signals available, and it costs nothing but an afternoon.

### Do I need professional photographs?

No, but you need consistent ones. The same background, lighting, and crop across everyone matters more than production quality. A mixed set of selfies and studio portraits looks worse than plain consistent snapshots.

### What if some staff do not want to be listed?

Honour it without pressure. Include the people who consent, and use a plain placeholder or omit the rest. Never publish someone's photograph or surname against their wishes.

### How often should the team page be updated?

Monthly. Remove leavers immediately and add joiners within their first month; an outdated team page is one of the most visible signs of a neglected site.

## Next steps

Photograph your client-facing team consistently, write one line of responsibility for each, and publish them with the [Team Showcase widget](/tools/team) on your about and service pages.

[Start free](/signup) and put real faces on your site.`,
  },
  {
    title: "How to Add an Image Slider to Your Website",
    slug: "how-to-add-an-image-slider-to-your-website",
    excerpt:
      "Sliders are easy to add and easy to get wrong. When a slider is the right tool, how to configure it accessibly, and what to use instead when it is not.",
    coverImage: "/blog-covers/how-to-add-an-image-slider-to-your-website.webp",
    publishedAt: "2026-06-06T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Only the first slide gets seen",
      motif: "media",
      figure: {
        kind: "compare",
        title: "Slider rules",
        items: [
          "Manual advance by default",
          "Visible arrows and dots",
          "Space reserved, no layout shift",
          "Three to five slides maximum",
        ],
        items2: [
          "Autoplay with no pause",
          "Hidden swipe-only controls",
          "Content jumping as images load",
          "Twelve rotating banners",
        ],
        caption:
          "If the message matters, do not put it on slide four.",
      },
    },
    body: `An image slider is one of the most requested and most misused elements on a website. It looks like a way to fit several messages into one space. In practice it is a way to make sure only the first one is seen.

This guide covers when a slider genuinely helps, how to configure it so it does not hurt, and what to use instead when it does not.

## What the evidence generally shows

Across many published tests, the pattern is consistent:

- The first slide gets the overwhelming majority of interaction
- Later slides get a small fraction of it
- Rotating content is often ignored entirely, because it resembles advertising
- Autoplay moves content away while people are reading it
- Each additional slide adds weight and, usually, layout shift

That does not make sliders useless. It makes them a poor container for your most important message.

## When a slider is the right tool

Good uses:

- **Product image galleries**, where the visitor is deliberately browsing one item's photographs
- **Sequential content**, such as steps in a process
- **Testimonial rotation**, where each item is short and equivalent
- **Space-constrained mobile layouts**, where a grid genuinely will not fit

Poor uses:

- Your primary homepage message
- Several unrelated campaigns competing for one slot
- Anything with a call to action you actually need clicked
- Content that must be read to be understood

![Comparison panel contrasting good slider configuration with common mistakes](/blog-figures/how-to-add-an-image-slider-to-your-website.webp)

## Configure it properly

The [Image Slider widget](/tools/slider) covers banners, promotions, and hero content. Whatever you use, apply these rules:

- **Do not autoplay by default.** If you must, use a slow interval, pause on hover and on focus, and stop permanently after any manual interaction.
- **Show controls.** Visible arrows and position dots. Swipe-only is invisible on desktop and undiscoverable on mobile.
- **Indicate position.** "2 of 4" or filled dots, so people know how much is left.
- **Limit to three to five slides.** More is an archive, not a message.
- **Reserve the space.** Fix the aspect ratio so nothing shifts as images load.
- **Load the first slide eagerly, the rest lazily.** Only the first is needed for the first paint.

## Make it accessible

Sliders are a frequent accessibility failure:

- Controls must be reachable and operable by keyboard, with a visible focus state
- Slide changes should be announced politely to assistive technology
- Autoplay must be pausable, and must respect the reduced-motion preference
- Text must not be baked into images - it cannot be read, resized, or translated
- Every image needs meaningful alt text

Our [accessibility checklist](/blog/website-accessibility-checklist-wcag) covers the wider requirements.

## Protect page speed

A slider is several full-width images. That makes it the most common cause of a slow hero:

- Compress and size every slide for its display size
- Serve modern formats and responsive widths
- Preload only the first slide
- Avoid a slider library that ships more code than your entire page

See our [image optimization guide](/blog/image-optimization-for-websites) and [page speed guide](/blog/page-speed-optimization-guide).

## What to use instead

If the slider exists because several teams wanted homepage space, the answer is usually not a better slider:

- **One strong hero** with a single message and one action - see [what belongs above the fold](/blog/what-belongs-above-the-fold-on-homepage)
- **A static grid** of two or three cards, all visible at once
- **A [feature grid](/tools/gallery) or category tiles**, so nothing is hidden
- **An [announcement bar](/tools/popup)** for a time-limited promotion, separate from the hero

Three messages visible simultaneously outperform five that take turns.

## Common mistakes to avoid

- **Autoplay with no pause control.** It is an accessibility failure and a reading failure.
- **Important calls to action on later slides.** They are effectively unpublished.
- **Text inside the image file.** Unreadable, untranslatable, unresizable.
- **No reserved height.** The page jumps as each image arrives.
- **Twelve slides.** Nobody reaches slide five.

## Frequently asked questions

### Are image sliders bad for conversion?

For a primary homepage message, usually yes - the first slide takes almost all the interaction and rotation is often ignored. For product galleries and sequential content, a slider is appropriate.

### Should a slider autoplay?

Prefer manual advance. If you autoplay, use a slow interval, pause on hover and focus, respect reduced-motion preferences, and stop permanently once the visitor takes control.

### How many slides should a slider have?

Three to five. Beyond that you are storing content nobody will reach, while adding page weight and layout risk.

### Do sliders hurt SEO?

Not directly, but they commonly hurt Core Web Vitals through large images and layout shift, and text baked into slide images is not readable content. Both of those matter.

## Next steps

Check whether your homepage slider is carrying a message that needs to be seen. If it is, move that message into a single static hero and keep the [Image Slider widget](/tools/slider) for galleries and sequences.

[Start free](/signup) and configure one properly.`,
  },
  {
    title: "How to Add Animated Counters to Your Website",
    slug: "how-to-add-animated-counters-to-your-website",
    excerpt:
      "Count-up statistics build credibility when the numbers are real and defensible. Which numbers to show, how to label them honestly, and how to keep them current.",
    coverImage: "/blog-covers/how-to-add-animated-counters-to-your-website.webp",
    publishedAt: "2026-06-12T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Numbers you can defend in a meeting",
      motif: "chart",
      figure: {
        kind: "bars",
        title: "Which numbers earn a place",
        items: [
          "Orders shipped, all time",
          "Years in operation",
          "Cities served",
          "Average rating with count",
        ],
        caption:
          "Every counter needs a source, an as-at date, and an owner who updates it.",
      },
    },
    body: `An animated counter is a small piece of theatre: a number that ticks up as it scrolls into view. Used well, it compresses years of credibility into one line. Used badly, it is an unverifiable claim in a large font.

The difference is entirely in whether the numbers are true, specific, and current.

## Choose numbers that mean something

Good counters answer a question the visitor is already asking:

- **Scale** - orders shipped, customers served, projects completed
- **Longevity** - years in operation, since a year the visitor can verify
- **Reach** - cities, states, or countries served
- **Quality** - average rating, always with the review count beside it
- **Capacity** - team size, production volume, service coverage

Weak counters are the ones with no denominator or no definition: "10,000+ happy customers" where nobody can say what counted as happy, or "99% satisfaction" with no survey behind it.

## Define each number before you publish it

For every counter, write down:

- **The exact definition.** Does "customers" mean unique buyers, orders, or accounts?
- **The source.** Which system produces it?
- **The as-at date.** A number without a date decays silently.
- **The owner.** Who updates it, and how often?

If you cannot answer all four, do not publish the number. A statistic you cannot defend in a meeting is a statistic a customer can catch you on.

![Bar diagram showing which kinds of numbers earn a place in a counter row](/blog-figures/how-to-add-animated-counters-to-your-website.webp)

## Label them honestly

The label does more work than the number:

- Say what is being counted, precisely: "Orders delivered since 2019" beats "Happy customers"
- Show the period: all time, this year, or last twelve months
- Round sensibly, and do not round upward to a flattering threshold
- Use "+" only when the number genuinely keeps rising
- Never present a projection as an achievement

If a number is impressive only because it is ambiguous, the ambiguity is doing the work, and visitors notice.

## Build it without editing your theme

The [Animated Counter widget](/tools/counter) animates statistics when they scroll into view, and the [Stats Counter](/tools/counter) pattern works well as a row of three or four figures.

Configure:

- Three or four counters, not eight
- A short label under each number
- A prefix or suffix where it clarifies - a currency symbol, a plus, a per cent sign
- Animation that runs once, briefly, and is not distracting

Place it with the [embed snippet guide](/help/installing-embed-snippet).

## Respect motion preferences

Animation is the point of the widget, which makes accessibility a real consideration:

- Honour the reduced-motion preference by showing the final value immediately
- Keep the count-up short - under a second or so
- Ensure the final value is in the page text, not painted only by script
- Do not animate repeatedly as the visitor scrolls back and forth

A counter that keeps restarting is a distraction, and for some visitors it is a genuine barrier.

## Where counters work

- **Homepage**, below the hero, as a credibility band
- **About page**, alongside your [timeline](/tools/timeline)
- **Service pages**, with numbers specific to that service
- **Case study pages**, showing the result of that project

They do not work on checkout, in a cart, or anywhere the visitor is mid-task.

Pair them with the proof that supports them - a [logo showcase](/tools/logos), reviews with real counts, or named case studies. See [social proof types and placement](/blog/social-proof-types-and-placement).

## Keep them current

- Put a recurring reminder on the owner's calendar
- Update at least quarterly, and immediately after a milestone
- Change "since 2019" style labels rather than static year counts, so the page ages correctly
- Remove any counter you can no longer source

A counter that says "5 years in business" three years after it was written is worse than no counter.

## Common mistakes to avoid

- **Invented or unsourceable numbers.** They are a consumer protection risk and easy to challenge.
- **Percentages with no denominator.** "98% satisfaction" from twelve responses is not a statistic.
- **Eight counters in a row.** Nobody reads past the third.
- **Numbers that never change.** They advertise that nobody maintains the site.
- **Ignoring reduced-motion preferences.** Animation must be optional.

## Frequently asked questions

### What numbers should I show on my website?

Numbers you can source and define: orders delivered, years in operation, cities served, projects completed, or an average rating with its review count. Avoid vague claims like "happy customers" with no definition.

### Are animated counters good for conversion?

They can support credibility when the numbers are real, specific, and placed near a decision. They do nothing when the figures are vague, and they damage trust if a visitor can disprove them.

### How many counters should I display?

Three or four. A row of eight reads as filler, and attention drops sharply after the first few.

### How do I make counters accessible?

Respect the reduced-motion preference by showing the final value immediately, keep the animation short, run it once, and make sure the value exists in the page content rather than only being animated in.

## Next steps

Write down four numbers you can source, define, and date. Publish them with the [Animated Counter widget](/tools/counter) and put a quarterly update reminder on one person's calendar.

[Start free](/signup) and show numbers you can defend.`,
  },
  {
    title: "How to Add a Client Logo Showcase",
    slug: "how-to-add-a-client-logo-showcase",
    excerpt:
      "Client logos build credibility only when they are recognisable and permitted. How to choose them, get permission, and present them without slowing the page.",
    coverImage: "/blog-covers/how-to-add-a-client-logo-showcase.webp",
    publishedAt: "2026-06-13T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "One name they know beats twelve they do not",
      motif: "grid",
      figure: {
        kind: "checklist",
        title: "Before a logo goes on your site",
        items: [
          "Written permission on file",
          "The client is recognisable to visitors",
          "The engagement was real and recent",
          "Correct logo file and clear space",
          "A case study or quote to back it",
        ],
        caption:
          "A logo wall is a claim. Each logo should be one you could be asked to prove.",
      },
    },
    body: `A row of client logos is the fastest credibility signal on a business website - when the visitor recognises the names. When they do not, it is a row of grey shapes that occupies prime space and slows the page.

This guide covers how to build one that earns its place.

## Step 1: Get permission first

Using a company's logo implies a relationship and, in most jurisdictions, touches trademark rights. Before publishing:

- Ask the client explicitly whether you may name them and use their mark
- Get it in writing, even informally by email
- Check your contract - some agreements prohibit naming the client, and some require approval of the wording
- Ask for their brand guidelines and use the approved logo file
- Honour removal requests promptly

If a client will not permit naming, describe them generically in a case study instead - "a national pharmacy chain" - and leave the logo out.

## Step 2: Choose logos your visitors will recognise

Relevance beats prestige. Ask who this page is for:

- On a page selling to restaurants, restaurant clients matter more than a bank
- Local businesses recognise local names
- A single household name outperforms eight unknown ones
- Recency matters - a logo from a project seven years ago is stretching the truth

If most of your clients are small and unknown, a logo wall is the wrong tool. Use named testimonials or a [portfolio](/tools/portfolio) instead - specifics beat unrecognisable marks.

![Checklist panel listing what to confirm before publishing a client logo](/blog-figures/how-to-add-a-client-logo-showcase.webp)

## Step 3: Present them consistently

Logos come in wildly different shapes, and an unedited set looks chaotic:

- Normalise optical size, not bounding-box size - a wide wordmark and a square mark need different scaling to look equal
- Use one treatment throughout: all full colour, or all single colour
- Keep consistent clear space around each mark
- Align on a common baseline or centre
- Use vector files where possible so they stay sharp

Never stretch, recolour without permission, or place a logo on a background that breaks its contrast.

## Step 4: Build it without editing your theme

The [Logo Showcase widget](/tools/logos) displays client, partner, or press logos in a grid or a moving strip, and embeds with one line.

Configure:

- **Grid** when you have six to twelve logos and want them all read
- **Moving strip** only when you have many and space is tight - and then keep it slow, pause on hover, and never make it the only place a logo appears
- Columns per breakpoint, so phones do not show six tiny marks in a row
- Alt text with the company name, so the logos are readable to screen readers and search engines

Place it with the [embed snippet guide](/help/installing-embed-snippet).

## Step 5: Keep it light

A logo wall is a dozen image requests for content that is mostly decorative:

- Use SVG where you have it - usually a fraction of the size and always sharp
- Compress raster logos properly
- Lazy load the section, since it is almost always below the fold
- Reserve the space so the page does not shift as marks arrive

See our [image optimization guide](/blog/image-optimization-for-websites).

## Step 6: Back the claim up

A logo says "they worked with us". Visitors want to know what that meant:

- Link each logo to a case study where one exists
- Put a named quote from that client nearby
- State the nature of the work in a caption if it varies - a supplier is not the same as a client

Our post on [social proof types and placement](/blog/social-proof-types-and-placement) covers where this belongs in the journey. Logos answer "is this business real"; they do very little on a product page.

## Common mistakes to avoid

- **No permission.** It is a trademark and relationship risk, and clients do notice.
- **Logos from lapsed relationships.** Presenting a former client as current is misleading.
- **Inconsistent sizing.** It makes a considered team look careless.
- **Grey undifferentiated marks nobody recognises.** They add weight, not credibility.
- **A fast auto-scrolling strip.** Unreadable, and an accessibility problem.

## Frequently asked questions

### Do I need permission to use a client's logo on my website?

Yes. Using a company's mark implies endorsement and engages trademark rights. Ask, get it in writing, check your contract for naming restrictions, and use their approved logo file.

### How many client logos should I show?

Six to twelve, chosen for recognisability by the audience of that page. One name your visitor knows is worth more than a dozen they do not.

### Should logos scroll automatically?

Prefer a static grid. If you use a moving strip, keep it slow, pause on hover and focus, and respect reduced-motion preferences - otherwise it is unreadable and inaccessible.

### What if my clients are not well known?

Skip the logo wall. Use named testimonials, a portfolio with real project context, or case studies. Specific evidence beats unrecognisable marks.

## Next steps

List your last ten clients, confirm which have given permission, and publish only the ones your visitors would recognise using the [Logo Showcase widget](/tools/logos) - each linked to a case study where you have one.

[Start free](/signup) and make your credibility band earn its space.`,
  },
  {
    title: "How to Add a Company Timeline to Your Website",
    slug: "how-to-add-a-company-timeline-to-your-website",
    excerpt:
      "A timeline turns years in business into visible credibility. Which milestones to include, how to write entries, and how to keep it from becoming a graveyard.",
    coverImage: "/blog-covers/how-to-add-a-company-timeline-to-your-website.webp",
    publishedAt: "2026-06-16T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Longevity is a claim you can show",
      motif: "timer",
      figure: {
        kind: "flow",
        title: "A timeline that reads well",
        items: [
          "Founding, with the why",
          "Milestones that changed capability",
          "Proof points customers care about",
          "Where you are heading",
        ],
        caption:
          "Six meaningful entries beat twenty that record internal news.",
      },
    },
    body: `A timeline is one of the few ways to make longevity visible. For a business that has been operating for a decade, it converts an abstract claim - "established 2016" - into a sequence a visitor can scan and believe.

It also fails in a predictable way: as a list of internal announcements nobody outside the company cares about.

## What belongs on a timeline

Include entries that changed what a customer can expect from you:

- **Founding**, with a one-line reason it started
- **Capability milestones** - a second location, a new production line, a service you added
- **Scale milestones** - the thousandth order, the first export, the first enterprise client
- **Credibility milestones** - a certification, a registration, a recognised client
- **Team milestones**, where the person matters to customers
- **Where you are heading**, as the last entry

Leave out office moves nobody noticed, internal reorganisations, minor awards, and anniversaries of things already on the list.

## How to write each entry

- **Date** - year is usually enough; add the month only if it matters
- **A short title** - five or six words
- **One or two sentences** explaining why it mattered to customers
- **A number where you have one**, and can source it

Write in plain past tense. "Opened a second workshop in Pune, cutting delivery times for western India to two days" is a milestone. "Embarked on an exciting new chapter" is not.

![Flow diagram showing the shape of a timeline that reads well](/blog-figures/how-to-add-a-company-timeline-to-your-website.webp)

## How many entries

Six to twelve for most businesses. A timeline is a scan, not an archive.

If you have been operating for twenty years, group the quiet periods: one entry can cover several years of steady growth. Long runs of thin entries make the busy years look less significant.

## Build it without editing your theme

The [Timeline widget](/tools/timeline) presents milestones as an animated vertical sequence and embeds with one line.

Configure:

- Chronological order, oldest first, so it reads as a story
- Consistent date formatting throughout
- Optional image per entry, kept small and consistent
- Animation that respects reduced-motion preferences

Place it with the [embed snippet guide](/help/installing-embed-snippet).

## Where it belongs

- **About page**, as the spine of the story
- **Careers page**, showing candidates a business with direction - see our [careers page guide](/blog/how-to-build-careers-page-with-job-board)
- **Investor or partner pages**
- **A service page**, when the timeline is specific to that capability

It does not belong on a product page or anywhere a visitor is trying to buy something.

Pair it with a [team page](/tools/team) and, where you have the numbers, an [animated counter](/tools/counter) row.

## Keep it alive

The failure mode of a timeline is obvious to every visitor: the last entry is four years old.

- Add an entry whenever something genuinely changes
- Review annually, at minimum
- If nothing has happened in two years, either find the milestone you overlooked or remove the timeline
- Keep the forward-looking entry current, or drop it rather than leaving a stale ambition

## Make it accessible

- The sequence must read correctly in source order for screen readers, not only visually
- Do not rely on colour or position alone to convey chronology
- Ensure any scroll-triggered animation degrades to static content
- Keep date text as text, never inside an image

See our [accessibility checklist](/blog/website-accessibility-checklist-wcag).

## Common mistakes to avoid

- **Internal news nobody cares about.** Office moves and reorganisations are not milestones.
- **A stale final entry.** It dates the whole site.
- **Twenty entries.** It becomes an archive nobody scans.
- **Vague copy.** "A new chapter" says nothing; a number and an outcome say plenty.
- **Dates inside images.** Unreadable and unsearchable.

## Frequently asked questions

### What should go on a company timeline?

Milestones that changed what customers can expect: founding, new locations or capabilities, meaningful scale numbers, certifications, and recognisable clients. Leave internal news off.

### How many milestones should a timeline have?

Six to twelve. Group quiet periods into a single entry rather than padding the list with thin ones.

### Where should a timeline go on a website?

The about page, and the careers page where you want candidates to see direction. It has no place on product or checkout pages.

### What if we have not had a milestone in years?

Either you have overlooked one - a capability, a client, a certification - or the timeline is the wrong tool right now. A timeline ending four years ago is worse than none.

## Next steps

Write down the six moments that actually changed what you can do for customers, add a number to each where you have one, and publish them with the [Timeline widget](/tools/timeline) on your about page.

[Start free](/signup) and make your history work for you.`,
  },
  {
    title: "How to Add an Accessibility Toolbar",
    slug: "how-to-add-an-accessibility-toolbar",
    excerpt:
      "An accessibility toolbar helps some visitors and fixes nothing structural. What it can genuinely do, what it cannot, and why overlays are not compliance.",
    coverImage: "/blog-covers/how-to-add-an-accessibility-toolbar.webp",
    publishedAt: "2026-06-19T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "A convenience, not a compliance shortcut",
      motif: "shield",
      figure: {
        kind: "compare",
        title: "What a toolbar can and cannot do",
        items: [
          "Increase text size on request",
          "Raise contrast for readability",
          "Reduce motion and animation",
          "Add a readable-font option",
        ],
        items2: [
          "Fix missing alt text",
          "Repair broken keyboard access",
          "Create real form labels",
          "Make a site legally compliant",
        ],
        caption:
          "Fix the site first. A toolbar is a convenience layer on top of accessible markup.",
      },
    },
    body: `An accessibility toolbar lets a visitor adjust text size, contrast, and motion on your site without changing their whole system. That is genuinely useful for some people, particularly those who do not know their browser can already do it.

It is also marketed, frequently and misleadingly, as a way to make a website compliant. It is not, and treating it as one creates risk rather than removing it.

## What a toolbar can genuinely do

- **Increase text size** for visitors who find your default too small
- **Raise contrast** for readability in bright light or with low vision
- **Reduce motion**, disabling animation for visitors who find it uncomfortable
- **Offer a more readable font**, which some dyslexic readers prefer
- **Add a reading guide or larger cursor**, which some visitors find helpful
- **Increase link and heading emphasis**, making a page easier to scan

These are real conveniences. Many visitors do not know their browser and operating system already offer equivalents, so an on-page control gets used.

## What it cannot do

This is the important half:

- It cannot write **alt text** for images that have none
- It cannot repair **keyboard access** that is broken
- It cannot create real **form labels** where placeholders were used instead
- It cannot fix **heading structure** or missing landmarks
- It cannot make a **modal** trap and restore focus correctly
- It cannot make a drag-only **slider** operable by keyboard

Screen reader users, who are among the people most affected by inaccessible sites, generally do not use these overlays at all - they use their own software, which reads your markup directly. If the markup is wrong, the overlay changes nothing for them.

![Comparison panel contrasting what an accessibility toolbar can and cannot do](/blog-figures/how-to-add-an-accessibility-toolbar.webp)

## Overlays are not compliance

Vendors of automated accessibility overlays often promise legal compliance. Treat those claims with caution:

- Overlays have been widely criticised by disabled users and accessibility practitioners
- They have been cited in legal complaints rather than preventing them
- Automated detection cannot judge whether alt text is meaningful or whether a heading describes its section
- An overlay that interferes with a visitor's own assistive technology makes things worse

The honest position: fix your site, then add a toolbar as a convenience if you want one.

## Fix the site first

Before adding any widget, run the checks that find real barriers:

- Navigate the whole site with the keyboard alone
- Check contrast on body text, placeholders, and disabled states
- Confirm every meaningful image has alt text
- Confirm every form field has a visible, associated label
- Test at 200 per cent zoom
- Confirm errors are announced, not just coloured

Our [website accessibility checklist](/blog/website-accessibility-checklist-wcag) walks through all of it in an afternoon.

## Then add the toolbar, carefully

The [Accessibility Toolbar widget](/tools/accessibility) lets visitors adjust text size, contrast, and readability. If you add one:

- **The launcher must be keyboard reachable** and clearly labelled
- **It must not cover** your primary action or the checkout button
- **It must remember the choice** across pages, or it is useless
- **It must be dismissible**, and must not fight the visitor's own settings
- **It must respect system preferences** already set, such as reduced motion
- **It must not be heavy** - an accessibility widget that slows the page harms everyone

Place it with the [embed snippet guide](/help/installing-embed-snippet), and test the whole site again with the toolbar active. Contrast modes in particular can break layouts.

## Publish an accessibility statement

More useful than any widget, and often expected:

- What standard you work to, and where you currently fall short
- Known issues and when you plan to fix them
- How to report a problem, with a monitored contact route
- The date it was last reviewed

Honesty here is worth more than a badge claiming perfection.

## Common mistakes to avoid

- **Treating the toolbar as the accessibility project.** It is the last five per cent.
- **Believing a compliance guarantee.** No overlay can deliver one.
- **A launcher that covers the pay button on mobile.** Test with the keyboard open.
- **Settings that reset on every page.** The visitor will not set them twice.
- **Never testing with the toolbar on.** High-contrast modes break layouts.

## Frequently asked questions

### Does an accessibility toolbar make my website compliant?

No. It cannot fix missing alt text, broken keyboard access, unlabelled forms, or bad heading structure - the issues most standards and complaints centre on. Fix the markup; treat the toolbar as a convenience.

### Are accessibility overlays a good idea?

As an optional convenience layer on an already accessible site, they help some visitors. As a substitute for fixing the site, they are widely criticised and have featured in legal complaints rather than preventing them.

### What should I fix before adding a toolbar?

Keyboard access, text contrast, alt text, real form labels, heading structure, and zoom behaviour. Those account for most real-world barriers.

### Do screen reader users use accessibility toolbars?

Generally not. They use their own assistive software, which reads your markup directly - which is why the markup has to be right.

## Next steps

Run the five-check accessibility audit on your homepage, a product page, and your checkout. Fix keyboard access first, then add the [Accessibility Toolbar widget](/tools/accessibility) as a convenience and publish an honest accessibility statement.

[Start free](/signup) and build on top of markup that already works.`,
  },
  {
    title: "How to Add a Back to Top Button",
    slug: "how-to-add-a-back-to-top-button",
    excerpt:
      "A small control that matters on long pages. When it helps, where to place it so it does not cover anything, and the accessibility details usually missed.",
    coverImage: "/blog-covers/how-to-add-a-back-to-top-button.webp",
    publishedAt: "2026-06-20T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "The smallest useful control on a long page",
      motif: "speed",
      figure: {
        kind: "checklist",
        title: "Getting it right",
        items: [
          "Appears only after real scrolling",
          "Never covers the primary action",
          "Keyboard reachable and labelled",
          "Moves focus, not just the scroll",
          "Respects reduced-motion settings",
        ],
        caption:
          "It is a small element with a surprising number of ways to get it wrong.",
      },
    },
    body: `A back-to-top button is the least glamorous widget on any site and one of the easiest to justify. On a long article, a category page with a hundred products, or a documentation page, returning to the navigation is otherwise a long swipe.

It is also small enough that people add it without thinking, which is how it ends up covering the checkout button on a phone.

## When it is worth adding

A back-to-top control earns its place when:

- Pages regularly run several screens deep
- The primary navigation lives only at the top
- Visitors compare items far down a list and need to re-filter
- Long-form content has no sticky table of contents
- Mobile visitors are your majority, where scrolling costs the most

It is unnecessary on short pages, and on sites with a persistent sticky header that already carries navigation.

## Where to place it

Bottom-right is the conventional position on left-to-right sites, and convention is worth following for a utility control.

But bottom-right is crowded. Before placing it, list everything that already lives there:

- Chat launchers, including [WhatsApp](/tools/whatsapp)
- Cookie and consent notices
- Sticky add-to-cart or enquiry bars
- The accessibility toolbar launcher
- The browser's own bottom chrome on mobile

If two of those already occupy the corner, either move one or use bottom-left. Never stack them.

![Checklist panel listing how to implement a back-to-top button correctly](/blog-figures/how-to-add-a-back-to-top-button.webp)

## Configure the behaviour

The [Back to Top widget](/tools/backtotop) provides a floating button that scrolls smoothly to the top. Configure it with restraint:

- **Appear only after meaningful scrolling** - roughly one and a half to two screens, not fifty pixels
- **Hide again near the top**, so it is not permanently present
- **Keep it small.** It is a utility, not a call to action
- **Use a modest contrast level** - visible, but not competing with your primary button
- **Include a label or an accessible name**, not just an arrow glyph

Place it with the [embed snippet guide](/help/installing-embed-snippet).

## Get the accessibility details right

This is where most implementations fall short:

- **It must be reachable by keyboard** and show a visible focus ring
- **It must have an accessible name** such as "Back to top" - an arrow icon alone announces nothing
- **It must move focus**, not only the scroll position. Otherwise a keyboard user is returned visually to the top while their focus stays at the bottom, and the next Tab jumps them back down
- **It must respect reduced-motion preferences** by jumping instantly instead of animating
- **It must not be a scroll trap** or interfere with the browser's own scrolling

The focus point is the one almost always missed. Sending focus to the header or the skip-link target makes the control genuinely useful rather than visually decorative.

## Do not let it cost you a sale

On commerce sites, verify on a real phone:

- With the on-screen keyboard open, does it cover the pay or submit button?
- Does it overlap a sticky add-to-cart bar?
- Does it sit on top of a chat launcher?
- Is it still visible over a light product image, and over a dark one?

A tiny utility control that hides a primary action is a measurable revenue problem. Our [mobile checkout checklist](/blog/mobile-checkout-ux-checklist) covers the wider sticky-element audit.

## Consider the alternatives

Sometimes the better answer is not a button:

- A **sticky header** with navigation removes the need entirely
- A **table of contents** on long articles is more useful than returning to the top
- **Pagination or a load-more control** on very long listings, rather than infinite scroll plus a return button
- **Section jump links** on documentation

If your page is so long that visitors need a rescue control, the length itself may be the problem.

## Common mistakes to avoid

- **Appearing immediately.** It clutters the first screen for no reason.
- **Icon with no accessible name.** It announces nothing to a screen reader.
- **Scrolling without moving focus.** Keyboard users end up back where they started.
- **Covering the checkout button.** The most expensive small mistake available.
- **Animating for visitors who asked for reduced motion.**

## Frequently asked questions

### Does every website need a back-to-top button?

No. It helps on long pages where navigation lives only at the top. On short pages, or sites with a sticky header, it adds clutter without value.

### Where should the back-to-top button go?

Bottom-right by convention, unless a chat launcher, consent notice, or sticky action bar is already there. Never stack floating controls in the same corner.

### How do I make a back-to-top button accessible?

Give it a real accessible name, make it keyboard reachable with a visible focus ring, move focus to the top of the page rather than only scrolling, and skip the animation when reduced motion is preferred.

### When should the button appear?

After roughly one and a half to two screens of scrolling, and it should hide again as the visitor approaches the top.

## Next steps

Check what already occupies the bottom-right corner on your phone, then add the [Back to Top widget](/tools/backtotop) with a proper accessible name and a scroll threshold of about two screens.

[Start free](/signup) and add it without breaking anything else.`,
  },
  {
    title: "How to Add a Visitor Counter to Your Website",
    slug: "how-to-add-a-visitor-counter-to-your-website",
    excerpt:
      "Live view counts can nudge a decision or destroy trust. When a real counter helps, why fabricated numbers are a serious risk, and how to present them honestly.",
    coverImage: "/blog-covers/how-to-add-a-visitor-counter-to-your-website.webp",
    publishedAt: "2026-06-26T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "Real numbers only, or none at all",
      motif: "chart",
      figure: {
        kind: "compare",
        title: "Honest counters vs invented ones",
        items: [
          "Backed by your own analytics",
          "States the period being counted",
          "Shown only where volume is real",
          "Consistent across page reloads",
        ],
        items2: [
          "A random number generator",
          "\"14 people viewing\" on every page",
          "Counts that reset on refresh",
          "Numbers nobody can source",
        ],
        caption:
          "A fabricated activity number is an untrue claim about your business.",
      },
    },
    body: `A live visitor counter says: other people are here, this is worth your attention. On a busy page that is genuine social proof. On a quiet page it either exposes how quiet you are, or tempts you into making the number up.

Making it up is where this widget becomes a real problem.

## Why fabricated counters are a serious risk

Many "social proof" tools generate activity numbers at random: "17 people are viewing this", "3 sold in the last hour", regardless of what actually happened.

That is a false statement about your business presented as fact:

- In most markets it falls under consumer protection rules on misleading commercial practices
- It is trivially detectable - reload the page, open it in another browser, or watch the number behave impossibly
- Once a visitor catches one invented number, every other claim on the page becomes suspect
- Screenshots of implausible counters circulate; the reputational cost outlasts any conversion gain

The rule is simple: if the number is not measured, do not display it.

## When a real counter helps

A genuine counter works when the numbers are real and reasonably high:

- **Popular product pages** during a campaign, where concurrent interest is genuinely high
- **Event registration pages** approaching a real capacity limit
- **Limited-release drops**, where the pressure is honest
- **Content pages**, showing total reads as a credibility signal rather than urgency
- **Community or listing pages**, where activity is the point

![Comparison panel contrasting honest visitor counters with fabricated ones](/blog-figures/how-to-add-a-visitor-counter-to-your-website.webp)

## When to leave it off

- Any page where the honest number would be one or two
- Checkout, where nothing should distract from completing the order
- Pages where the number fluctuates wildly and looks unstable
- Anywhere you would be tempted to "adjust" the figure

A quiet page with no counter reads as normal. A quiet page showing "1 person viewing" reads as failing.

## Use first-party data

The [Visitor Counter widget](/tools/visitors) shows a live view count backed by your own first-party analytics rather than an invented figure. That matters for two reasons: the number is true, and it comes from data you own rather than a third-party tracker.

This also keeps working as cross-site tracking narrows - see our guide on [measuring without third-party cookies](/blog/first-party-analytics-without-third-party-cookies).

## Present it honestly

The label carries the honesty:

- **Say what is counted**: views, unique visitors, or people currently on the page
- **State the period**: "in the last 24 hours", "since launch", "right now"
- **Do not round upward** to a flattering threshold
- **Keep the presentation calm.** A pulsing red badge turns information into pressure
- **Be consistent.** The same number should not change dramatically between reloads

"1,284 views in the last 7 days" is information. "🔥 23 people looking right now!" on a page with four visitors a day is not.

## Consider the alternatives

Often a different number is both more honest and more persuasive:

- **Total orders or units sold**, which is stable and verifiable
- **Review count with average rating**, using the [Reviews widget](/tools/reviews)
- **Stock remaining**, if you actually track it
- **An [animated counter](/tools/counter)** of all-time figures - see our [counters guide](/blog/how-to-add-animated-counters-to-your-website)

Our post on [social proof types and placement](/blog/social-proof-types-and-placement) maps which proof answers which doubt, and [honest urgency](/blog/countdown-timers-honest-urgency) covers the same line for countdowns.

## Keep it light and accessible

- The counter should not block rendering or add a heavy third-party script
- Live updates must not be announced repeatedly to screen readers - use a polite live region or update quietly
- Do not animate constantly; motion in the corner of the eye is distracting
- Reserve its space so the number arriving does not shift the layout

## Common mistakes to avoid

- **Randomly generated activity numbers.** A misleading claim, and easy to catch.
- **A counter on a low-traffic page.** It advertises the quiet.
- **Counters in checkout.** Distraction where focus matters most.
- **Urgency styling on a neutral statistic.** Flames and pulsing badges signal manipulation.
- **No period stated.** A number without a timeframe means nothing.

## Frequently asked questions

### Are live visitor counters good for conversion?

They can help on genuinely busy pages, where the number is real and high. On quiet pages they reduce confidence, and fabricated numbers damage trust across the whole site.

### Is it illegal to fake visitor numbers?

Presenting invented activity as fact is a misleading commercial practice under consumer protection rules in many markets, and it is easy for a customer to disprove. Display only measured numbers.

### What should a visitor counter say?

What is counted and over what period - "1,284 views in the last 7 days" or "12 people viewing now" - presented calmly, without urgency styling on a neutral statistic.

### What can I show instead if traffic is low?

Stable, verifiable figures: total orders, review count with average rating, years in operation, or genuine remaining stock. These work regardless of how busy the page is today.

## Next steps

Check what your real numbers are before deciding. If a page is genuinely busy, publish the true figure with the [Visitor Counter widget](/tools/visitors) and label the period. If it is not, use a stable all-time number instead.

[Start free](/signup) and keep every number on your site defensible.`,
  },
];
