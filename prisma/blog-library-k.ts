import type { BlogLibraryPost } from "./blog-library-types";

export const BLOG_POSTS_K: BlogLibraryPost[] = [
  {
    title: "Pricing Page Design: A Practical Guide",
    slug: "pricing-page-design-guide",
    excerpt:
      "How many plans, how to name them, what to show and hide, and how to handle the questions that stop people choosing. A guide to pricing pages that convert.",
    coverImage: "/blog-covers/pricing-page-design-guide.webp",
    publishedAt: "2026-07-28T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "Help them choose, do not just list plans",
      motif: "grid",
      figure: {
        kind: "checklist",
        title: "What a pricing page must do",
        items: [
          "Show a real number",
          "Recommend one plan",
          "Explain who each plan suits",
          "State what happens at the limit",
          "Answer billing questions on the page",
        ],
        caption:
          "Most pricing pages list options. The good ones make a recommendation.",
      },
    },
    body: `A pricing page is a decision page, not a specification sheet. The visitor arrived with one question - what will this cost me - and a secondary one they may not articulate: which of these am I?

Most pricing pages answer the first badly and the second not at all.

## Step 1: Show a real number

The most common failure is no price at all. "Contact us for pricing" removes you from consideration for a large share of visitors who will not start a sales conversation to learn a number.

If your pricing genuinely varies:

- Publish a starting price - "from Rs 12,000"
- Publish a typical range with what drives it
- Offer a [price calculator](/tools/calculator) for an instant estimate - see our [calculator guide](/blog/how-to-add-price-calculator-to-website)

Publishing a range also filters out enquiries you would have rejected, which saves your sales team more time than the enquiries you lose.

## Step 2: Limit the plans

Three plans is the practical sweet spot for most businesses. Two can feel like a false choice; five or more shifts the work of deciding onto the visitor.

If you genuinely have more, group them: three tiers on the page with a link to a full comparison for the rare visitor who needs it.

![Checklist panel listing what a pricing page must do](/blog-figures/pricing-page-design-guide.webp)

## Step 3: Name plans by who they are for

Plan names should help someone self-identify:

- "Starter", "Growth", "Agency" works because each names a stage
- "Bronze", "Silver", "Gold" tells the visitor nothing except which is expensive
- Adding a one-line audience description under each name does more than the name itself: "For a single store doing under 10,000 views a month"

## Step 4: Recommend one

Neutral presentation is not helpful. Mark one plan as recommended, and say why:

- "Most popular" only if it is true
- "Best for most stores" with a reason
- Make the recommended plan visually distinct without hiding the others

Visitors want guidance. A page that refuses to give any leaves the choice to guesswork, and guesswork often resolves as leaving.

## Step 5: Show what actually differs

- List features in the same order across all plans
- Put the differences first, not the twelve things every plan includes
- Use plain labels; internal feature names mean nothing to a buyer
- Show limits as numbers, not "unlimited*" with an asterisk
- If something is an add-on, say so and give its price

A [comparison table](/tools/faq) style breakdown below the plan cards works well: cards for scanning, table for the visitor who wants detail.

## Step 6: Answer what happens at the limits

This is the question that stops people choosing, and most pricing pages ignore it:

- What happens when I exceed the limit? Is it blocked, throttled, or billed?
- Can I upgrade mid-cycle, and how is it prorated?
- Can I downgrade, and what happens to my data?
- Is there a contract, and how do I cancel?
- What happens at the end of a trial?

A visitor who cannot predict the consequence of growing chooses the safest option, which is often no option.

## Step 7: Handle the billing questions inline

Put an [FAQ accordion](/tools/faq) directly on the pricing page covering:

- Taxes - whether prices include GST
- Payment methods accepted
- Refund policy
- Billing frequency and annual discounts
- What support is included at each tier

Answering these on the page removes the most common reason people leave to "think about it".

## Step 8: Give one primary action per plan

- The same action verb on every plan card
- "Start free" or "Choose Growth" rather than "Submit"
- A secondary route for people not ready - talk to sales, or a demo
- Do not make the enterprise tier's only route a twelve-field form

See our guide to [call-to-action buttons](/blog/how-to-add-a-cta-button-that-gets-clicked).

## Step 9: Put proof next to price

Price is where doubt peaks, so proof belongs here:

- A named customer quote about value
- A [logo showcase](/tools/logos) of comparable businesses
- A guarantee or trial with plain terms
- A [counter](/tools/counter) with a real, sourced number

Our post on [social proof placement](/blog/social-proof-types-and-placement) covers which evidence answers which doubt.

## Common mistakes to avoid

- **No price at all.** You are eliminated before the conversation starts.
- **Five plans with no recommendation.** The visitor does the work and often leaves.
- **"Unlimited" with an asterisk.** It reads as a trap.
- **Feature lists in different orders per plan.** Comparison becomes impossible.
- **No answer to what happens at the limit.** It is the question that blocks the decision.

## Frequently asked questions

### How many pricing plans should I show?

Three for most businesses. Two can feel like a false choice, and five or more moves the burden of deciding onto the visitor. Group extra tiers behind a full comparison link.

### Should I show prices if my pricing is complex?

Yes - a starting price, a typical range, or an instant calculator. Publishing nothing removes you from consideration for visitors who will not enquire just to learn a number.

### Should I highlight a recommended plan?

Yes, and say why. Neutral presentation leaves visitors guessing. Mark one plan as best for most customers, with a one-line reason.

### What should a pricing FAQ cover?

Tax treatment, payment methods, upgrade and downgrade behaviour, what happens at plan limits, refunds, and cancellation. These are the questions that otherwise end the visit.

## Next steps

Add a one-line audience description under each plan name, mark one as recommended with a reason, and publish an [FAQ accordion](/tools/faq) on the page answering the five billing questions you get most.

[Start free](/signup) and put a real number in front of your visitors.`,
  },
  {
    title: "Microcopy That Removes Friction",
    slug: "microcopy-that-removes-friction",
    excerpt:
      "The small words around buttons, fields, and errors decide whether people continue. A practical guide to writing labels, hints, and error messages that help.",
    coverImage: "/blog-covers/microcopy-that-removes-friction.webp",
    publishedAt: "2026-08-01T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "The smallest words do the most work",
      motif: "form",
      figure: {
        kind: "compare",
        title: "Microcopy that helps",
        items: [
          "Enter a 10-digit mobile number",
          "We reply by 6 PM on working days",
          "Free delivery over Rs 999",
          "Card not charged during the trial",
        ],
        items2: [
          "Invalid input",
          "Thank you for your submission",
          "Shipping calculated at checkout",
          "Start your free trial now!",
        ],
        caption:
          "Every anxious moment on a page can be answered in about eight words.",
      },
    },
    body: `Microcopy is the small text nobody assigns to a writer: field labels, helper lines, button labels, error messages, empty states, and confirmations. It is written last, usually by whoever is building the page, and it decides more outcomes than the headline above it.

The principle is simple: find the moments where a visitor hesitates, and answer the question in the fewest possible words, right there.

## Where microcopy earns its keep

### Field labels and hints

- **Label above the field, always.** Placeholder-only labels vanish the moment typing starts and are an accessibility failure.
- **Say what format you want** before the error: "10-digit mobile number", "DD/MM/YYYY".
- **Explain why you are asking** when the reason is not obvious: "For delivery updates only."
- **Mark optional fields**, rather than marking everything required.

### Error messages

- Say what went wrong and how to fix it: "Enter a 10-digit mobile number" not "Invalid input"
- Put the message beside the field, not at the top of the page
- Never blame the user - "That code has expired" not "You entered an invalid code"
- Never rely on colour alone
- Keep the entered data; never clear the form

### Buttons

- Say the outcome: "Get a quote", not "Submit"
- Match the label to the destination exactly
- Use a small line beneath for the caveat: "No card required" - see [CTA buttons](/blog/how-to-add-a-cta-button-that-gets-clicked)

![Comparison panel contrasting helpful microcopy with generic alternatives](/blog-figures/microcopy-that-removes-friction.webp)

## Answer the anxious question at the anxious moment

The highest-return microcopy sits next to a commitment:

- Beside the email field: "We send order updates only. No marketing without your consent."
- Beside a phone field: "We call between 10 AM and 6 PM."
- Beside a card field: "You will not be charged until the trial ends."
- Beside add-to-cart: "7-day returns. We pay return shipping on faults."
- Beside a submit button: "We reply by 6 PM on working days."

Each is one line, and each removes a specific reason to stop.

## Write success states that inform

"Thank you for your submission" is a dead end. A useful confirmation says:

- What was received
- What happens next
- When, specifically
- Who will do it
- What to do if they need it sooner

"We have your quote request. Rahul will call you before 6 PM today. Need it faster? Message us on WhatsApp."

## Write empty states that offer a way forward

Empty states appear at the worst moments - a search with no results, an empty cart, a filter that excludes everything:

- Say plainly what happened
- Explain why, if you can
- Offer the next step: broaden the filter, browse a category, contact support
- Never show a blank area or a spinner that never resolves

A no-results state that suggests three popular categories recovers visitors that a blank page loses.

## Set expectations before the action

- Before a long form: "Takes about 2 minutes."
- Before a download: "PDF, 400 KB."
- Before an external link: say where it goes.
- Before a destructive action: say exactly what will be lost, and make the confirm button name the action - "Delete 3 items", not "OK".

## Rules that apply everywhere

- **Shorter, but not cryptic.** Cutting words is good; cutting meaning is not.
- **The customer's vocabulary**, not your internal terms.
- **Active voice**, second person.
- **Numbers as numerals**, so they are scannable.
- **No exclamation marks** in transactional copy - they read as insincere.
- **Never confirmshame.** "No thanks, I hate saving money" damages more than it converts, and is increasingly treated as a dark pattern.

## Test it the cheap way

- Read every screen aloud; awkwardness is audible
- Watch someone unfamiliar complete the task without help
- Read your support inbox for questions the interface should have answered
- Check every error message by deliberately triggering it - most teams have never seen half of theirs

The errors you have never read are usually the worst copy on the site.

## Common mistakes to avoid

- **Placeholder text as the only label.** It disappears exactly when needed.
- **"Invalid input".** It tells the user nothing actionable.
- **Success messages with no next step.** The visitor is left guessing.
- **Jargon from your database.** "Entity", "record", "submission".
- **Never reading your own error states.** They are written once and never checked.

## Frequently asked questions

### What is microcopy?

The small functional text in an interface: field labels, hints, button labels, error messages, empty states, and confirmations. It guides action, unlike marketing copy which persuades.

### How do I write better error messages?

Say what went wrong and how to fix it, place the message beside the field, never blame the user, never rely on colour alone, and never clear the data they entered.

### Should placeholder text replace field labels?

No. Placeholders disappear as soon as typing begins, are often too low-contrast, and are not reliably announced by screen readers. Always use a visible label above the field.

### Where does microcopy matter most?

Immediately before a commitment - the email field, the card field, the submit button, and the add-to-cart action. One line answering the anxious question removes a specific reason to stop.

## Next steps

Walk your own checkout and enquiry form, write down every moment you would hesitate as a first-time visitor, and answer each one in a single line beside the element that caused it.

[Start free](/signup) and rewrite your form's helper text and success message today.`,
  },
  {
    title: "Email Marketing Basics for Small Stores",
    slug: "email-marketing-basics-for-small-stores",
    excerpt:
      "Build a list you own, send messages people open, and keep deliverability intact. The practical basics for a store without a marketing team.",
    coverImage: "/blog-covers/email-marketing-basics-for-small-stores.webp",
    publishedAt: "2026-08-02T05:30:00.000Z",
    art: {
      eyebrow: "Marketing",
      coverHeadline: "The channel you actually own",
      motif: "chat",
      figure: {
        kind: "stack",
        title: "Set these up in order",
        items: [
          "Consent and authentication",
          "Welcome sequence",
          "Order and delivery messages",
          "Replenishment and win-back",
          "Broadcast campaigns",
        ],
        caption:
          "Automated messages earn most of the revenue. Campaigns come last.",
      },
    },
    body: `Email is the only marketing channel a small store genuinely owns. Social reach is rented and changes without warning; search rankings move; an email list moves with you.

It is also the channel most easily ruined by a few months of careless sending.

## Step 1: Build the list with consent

- Use explicit opt-in. Never add customers to a marketing list because they bought something.
- Keep the transactional and marketing purposes separate, with separate consent
- Say what you will send and roughly how often, at the point of signup
- Never buy or scrape a list - deliverability damage from a purchased list is often permanent
- Keep a record of when and how each subscriber consented

Our [privacy compliance guide](/blog/website-privacy-compliance-india) covers the obligations in more detail.

## Step 2: Set up authentication before your first send

This is the technical step most small stores skip, and it decides whether your email reaches the inbox:

- **SPF** - lists which servers may send for your domain
- **DKIM** - signs your messages so they can be verified
- **DMARC** - tells receiving servers what to do when checks fail, and gives you reports

Send from your own domain, not a free mailbox address. Use a real reply-to address that a person monitors - "noreply@" tells customers you do not want to hear from them, and replies are a positive engagement signal.

![Priority stack showing the order to set up email marketing](/blog-figures/email-marketing-basics-for-small-stores.webp)

## Step 3: Get the automated messages right first

Automated messages consistently outperform broadcasts, because they arrive when the recipient is already thinking about you:

- **Welcome sequence** - one or two messages: what you sell, what makes you different, and the practical answers about delivery and returns
- **Order confirmation, dispatch, delivery** - see the [post-purchase checklist](/blog/post-purchase-experience-checklist)
- **Cart recovery** - three messages, help before discount, per our [abandoned cart guide](/blog/abandoned-cart-email-sequence)
- **Replenishment reminders** timed to actual consumption
- **Win-back**, triggered relative to your repurchase window - see the [retention playbook](/blog/customer-retention-repeat-purchase-playbook)

Build these before planning any campaign calendar.

## Step 4: Write emails people open and act on

- **Subject line** under about 45 characters, specific rather than clever
- **Preview text** that adds information instead of repeating the subject
- **One purpose per email**, with one primary action
- **Front-load the point.** Many readers see only the first screen
- **Single column**, large tap targets, readable at arm's length
- **Alt text on every image**, because images are frequently blocked
- **A plain-text version** that still works

Personalise with something that matters - what they bought, where they are - not just a first name in the greeting.

## Step 5: Send at a sustainable rhythm

- Pick a frequency you can maintain and state it at signup
- Weekly is fine if you have something to say; monthly is fine if you do not
- Do not go quiet for six months and then resume - re-engagement after silence produces complaints
- Watch how your sends interact with your automated messages; a customer should not receive four things in a day

## Step 6: Protect deliverability

Deliverability degrades quietly, then all at once:

- **Never send to purchased or scraped addresses**
- **Remove hard bounces immediately**
- **Suppress unengaged subscribers** - people who have not opened in six to twelve months
- **Make unsubscribing one click.** A hidden unsubscribe converts into a spam complaint, which costs far more
- **Watch complaint rates** and investigate any spike
- **Warm up** gradually if you move providers or start sending at higher volume

A smaller engaged list outperforms a larger indifferent one, and protects the inbox placement of your transactional messages too.

## Step 7: Measure what matters

- Revenue per email sent, not open rate alone
- Click-to-open rate, which reflects content quality
- Unsubscribe and complaint rate as guardrails
- Automated versus broadcast revenue split
- List growth net of unsubscribes and suppressions

Treat open rates with caution: privacy features on several mail clients inflate them by pre-loading images. Clicks and revenue are the honest signals.

## Step 8: Grow the list honestly

- A clear signup on your site with a real reason to subscribe
- Offer something useful - early access, a guide, restock alerts - rather than a discount that attracts one-time buyers
- A [popup](/tools/popup) with sensible frequency rules, per [popups that convert without annoying visitors](/blog/popups-without-annoying-visitors)
- At checkout, as a separate opt-in
- In person, with explicit consent

## Common mistakes to avoid

- **Skipping SPF, DKIM, and DMARC.** Your messages land in spam and you never know why.
- **Adding customers to marketing without consent.**
- **"noreply@" addresses.** They suppress replies, which are a positive signal.
- **Sending to unengaged addresses forever.** It damages placement for everyone else.
- **Judging success on open rate.** It is inflated and unreliable.

## Frequently asked questions

### How often should a small store send marketing emails?

At a rhythm you can sustain and that you stated at signup - weekly if you genuinely have something to say, monthly otherwise. Consistency matters more than frequency.

### Why do my emails go to spam?

Most commonly missing SPF, DKIM, and DMARC records, sending from a free mailbox rather than your domain, poor list hygiene, or a high complaint rate from a hidden unsubscribe link.

### Should I buy an email list?

Never. Purchased lists produce complaints and bounces that damage your sending reputation, often permanently, and in most markets they fail consent requirements outright.

### What email should I set up first?

Order and delivery messages, then a welcome sequence, then cart recovery. Automated messages tied to a customer action earn far more than broadcast campaigns.

## Next steps

Check that SPF, DKIM, and DMARC are configured for your sending domain, then build your order, welcome, and cart recovery messages before planning a single campaign.

[Start free](/signup) and capture signups with a [form](/tools/form) that states what subscribers will actually receive.`,
  },
  {
    title: "Driving Instagram Traffic to Your Website",
    slug: "driving-instagram-traffic-to-your-website",
    excerpt:
      "Turning social attention into site visits and orders: link strategy, landing pages that match the post, tracking that survives, and what to measure.",
    coverImage: "/blog-covers/driving-instagram-traffic-to-your-website.webp",
    publishedAt: "2026-08-07T05:30:00.000Z",
    art: {
      eyebrow: "Marketing",
      coverHeadline: "Attention there, orders here",
      motif: "media",
      figure: {
        kind: "flow",
        title: "Closing the gap",
        items: [
          "Post that earns a tap",
          "Link to the exact thing",
          "Page that matches the post",
          "One action, fast",
        ],
        caption:
          "Most social traffic is lost between the tap and the page.",
      },
    },
    body: `Social platforms are built to keep attention inside the app. Every link out is friction they did not design for, which means the small number of people who do tap through are unusually valuable - and unusually easy to lose.

Most stores lose them in the gap between the post and the page.

## Step 1: Send them somewhere specific

The most common mistake is a single profile link pointing at the homepage. Someone who tapped after seeing one product now has to find it again.

- Link to the **exact product or collection** shown in the post
- Keep a simple, fast link page if you must route several destinations, but treat it as a redirect layer, not a destination
- Make sure the top item on that page matches your most recent post
- Update it whenever the pinned content changes

Every extra tap between the post and the product loses a share of the people who were interested enough to leave the app.

## Step 2: Make the landing page match the post

This is message match, and it decides whether the visit survives:

- The same product, in the same colourway, visible immediately
- The same offer, in the same words
- The same photograph if possible - recognition confirms they are in the right place
- The price visible without scrolling

If the post showed a green kurta with a discount and the page shows a category grid at full price, the visitor concludes they were misled. See [reducing bounce on landing pages](/blog/reduce-bounce-rate-on-landing-pages).

![Flow diagram showing how to close the gap between a social post and an order](/blog-figures/driving-instagram-traffic-to-your-website.webp)

## Step 3: Make the page fast

Social traffic arrives inside an in-app browser, often on mobile data, often mid-scroll. The tolerance for a slow page is close to zero:

- Test the page in the in-app browser, not only in Chrome or Safari
- Compress the hero image properly - see [image optimization](/blog/image-optimization-for-websites)
- Reserve space so nothing shifts while the visitor is reading
- Delay non-essential scripts

An in-app browser also handles some things differently - certain payment sheets, some pop-ups, and cookie behaviour. Complete a full purchase from inside the app before running a campaign.

## Step 4: Post things that earn the tap

Not every post should sell. But posts that do should make the next step obvious:

- Show the product in use, at a scale people can judge
- Say the price in the caption where it is allowed - it filters and qualifies
- State the action plainly in the caption
- Answer the top objection in the caption itself - sizing, material, delivery time
- Use the platform's own product tagging where available, which shortens the path

## Step 5: Track it in a way that survives

Attribution from social is genuinely hard: in-app browsers, cross-device journeys, and privacy features all break the chain.

- Use campaign parameters on every link so you can at least see the source
- Store the **first-touch source** at the visitor's first session and carry it through to the order - see [website to CRM workflow](/blog/website-to-crm-workflow)
- Add a "How did you hear about us?" question at checkout; it catches what tracking cannot
- Compare periods with and without social activity rather than trusting last-click attribution

Our guide to [measuring without third-party cookies](/blog/first-party-analytics-without-third-party-cookies) covers the wider approach.

## Step 6: Bring the social proof onto your site

Traffic works in both directions. Content from your feed can support the buying decision on your own pages:

- A curated [Instagram feed widget](/tools/instagram) on product or category pages, showing real usage - see our [feed guide](/blog/how-to-add-instagram-feed-to-website)
- Customer photos in your [gallery](/tools/gallery) or reviews
- A [social icons](/tools/logos) row in the footer, not in the middle of checkout

Keep the feed off checkout entirely. Any external link there is a leak.

## Step 7: Capture something before they leave

A social visitor may not buy on the first visit:

- A short email or WhatsApp capture with a genuine reason to subscribe
- Restock or launch alerts, which suit social audiences well
- A [WhatsApp route](/tools/whatsapp) for questions, which many social visitors prefer to a form

Then follow up on a channel you own - see [email marketing basics](/blog/email-marketing-basics-for-small-stores).

## Step 8: Measure the right things

- Sessions and orders by campaign parameter
- Conversion rate of social traffic versus other sources - it is usually lower, which is normal
- Assisted conversions, since social often starts rather than finishes the journey
- Self-reported attribution at checkout
- Revenue per post for the posts you actively pushed

## Common mistakes to avoid

- **A profile link to the homepage.** The visitor has to search again.
- **No message match.** The page must show what the post showed.
- **Never testing the in-app browser.** Payment and popup behaviour differ.
- **Judging social on last-click alone.** It undercounts a channel that mostly starts journeys.
- **Social feeds inside checkout.** They leak traffic at the worst moment.

## Frequently asked questions

### Why does social traffic convert worse than search?

Because intent is different. Search visitors are looking for something; social visitors were interrupted. That makes message match, page speed, and a single clear action far more important.

### Where should my Instagram link point?

To the exact product or collection in your most recent post. A homepage link makes the visitor search again, and most will not.

### How do I track Instagram traffic properly?

Use campaign parameters on every link, store first-touch source through to the order, and add a self-reported "how did you hear about us" question at checkout to catch what in-app browsers and privacy features break.

### Should I put an Instagram feed on my website?

On product and category pages, curated, as proof of real usage. Never in cart or checkout, where an external link costs you the order.

## Next steps

Change your profile link to point at the product in your latest post, then open that page inside the in-app browser and complete a purchase. Fix whatever broke.

[Start free](/signup) and put a curated [feed](/tools/instagram) where it supports the decision.`,
  },
  {
    title: "A Google Ads Landing Page Checklist",
    slug: "google-ads-landing-page-checklist",
    excerpt:
      "Paid clicks are wasted on the wrong page. Message match, load speed, form length, and tracking - the checks to run before spending another rupee.",
    coverImage: "/blog-covers/google-ads-landing-page-checklist.webp",
    publishedAt: "2026-08-08T05:30:00.000Z",
    art: {
      eyebrow: "Marketing",
      coverHeadline: "You paid for the click. Do not waste the page.",
      motif: "search",
      figure: {
        kind: "checklist",
        title: "Before you increase the budget",
        items: [
          "Headline repeats the ad promise",
          "Landing page is the specific offer",
          "Loads fast on mobile data",
          "One action, above the fold",
          "Conversion tracking verified",
        ],
        caption:
          "Fixing the page is cheaper than raising the bid.",
      },
    },
    body: `Paid search is the one channel where every visitor has a known cost. That makes landing page problems expensive in a way organic traffic hides: a page that loses 60 per cent of arrivals is losing 60 per cent of your budget.

Run these checks before increasing a bid.

## 1. Message match: does the page repeat the ad?

Put the ad and the page side by side:

- Does the landing page headline contain the phrase from the ad?
- Is the specific product or service named, not a category?
- Is the offer identical, including any discount or condition?
- Is the price consistent with what the ad implied?

If someone searched for a specific product, clicked an ad naming it, and landed on a general category page, they have to search again. Most will not.

Send each ad group to the closest useful page, not to the homepage.

## 2. Is the offer visible without scrolling?

On a mid-range phone, the first screen must show:

- What is being offered, in plain words
- Who it is for
- The price or a price signal
- One action

Anything else - navigation, social feeds, unrelated promotions - is competing with the thing you paid for. See [what belongs above the fold](/blog/what-belongs-above-the-fold-on-homepage).

![Checklist panel listing the checks to run on a paid landing page](/blog-figures/google-ads-landing-page-checklist.webp)

## 3. How fast is it, really?

Test on a mid-range phone with a throttled connection, not on your desktop:

- Largest Contentful Paint under a couple of seconds
- Nothing shifting as the page loads
- Hero image compressed and correctly sized
- Consent banner and chat widget not blocking first render

Speed is also a component of ad quality signals in most platforms, so a slow page costs you twice: fewer conversions and a worse cost per click. See our [page speed guide](/blog/page-speed-optimization-guide).

## 4. Is there exactly one action?

Paid landing pages should be narrower than normal pages:

- One primary action, repeated as the page gets longer
- Remove or reduce navigation that lets visitors wander
- No unrelated promotions
- No popup interrupting a visitor you just paid for

If the page has three competing actions, you are splitting paid traffic across goals you cannot measure separately.

## 5. Is the form as short as it can be?

Every field costs completions on traffic you paid for:

- Name, one contact route, what they need, at most one qualifier
- Correct input types and working autofill
- Errors beside the field, in plain language
- A response-time promise beside the submit button

See [lead capture form best practices](/blog/lead-capture-form-best-practices) and [microcopy that removes friction](/blog/microcopy-that-removes-friction).

## 6. Are the obvious objections answered?

The visitor arrived from a search, not from your brand:

- Who you are and where you operate
- Price or a genuine range
- Delivery or turnaround time
- Return or cancellation terms
- Proof - a named testimonial, a rating with its count, recognisable clients

A short [FAQ accordion](/tools/faq) below the offer handles most of it without lengthening the page for people who do not need it.

## 7. Is conversion tracking actually working?

Verify rather than assume:

- Fire a real test conversion and confirm it records
- Check it does not double-count on page refresh or back navigation
- Confirm the conversion you optimise toward is a business outcome, not a button click
- Check consent handling - if measurement is held until consent, know what share you are missing
- Reconcile platform-reported conversions against your own order or enquiry records

Our guide on [conversion tracking setup](/blog/conversion-tracking-setup-guide) covers this end to end. If the numbers are wrong, every optimisation decision after it is wrong too.

## 8. Does the mobile experience actually work?

- Tap the primary action with one thumb
- Open the keyboard and check nothing covers the submit button
- Test with an ad blocker enabled
- Test the page in an in-app browser if you also run social ads

## 9. Is the post-click follow-up ready?

You paid for a lead. Losing it to a slow reply wastes the entire spend:

- An owner assigned automatically on submission
- A response-time commitment you meet
- An immediate honest acknowledgement
- The source captured on the record so you can measure cost per qualified lead

See [speed to lead](/blog/lead-response-time-speed-to-lead).

## 10. Are you measuring quality, not just volume?

- Cost per qualified lead, not cost per form fill
- Conversion rate from lead to customer, by campaign
- Revenue by campaign, using first-touch source carried into your CRM
- Loss reasons by campaign, which reveal which keywords attract the wrong people

## Common mistakes to avoid

- **Sending every ad to the homepage.** The visitor repeats their search.
- **A popup on paid traffic.** You paid for the click and then interrupted it.
- **Untested conversion tracking.** Wrong data optimises toward the wrong thing.
- **Long forms on expensive clicks.** Each field has a measurable price now.
- **Optimising bids before fixing the page.** The page is the cheaper lever.

## Frequently asked questions

### Should Google Ads point to the homepage?

Almost never. Send each ad group to the page that matches the search - the specific product, service, or offer named in the ad. Homepage traffic makes the visitor start their search again.

### Does landing page speed affect ad costs?

Yes, indirectly. Landing page experience feeds into ad quality signals, which influence cost per click, and slow pages lose conversions regardless. It is one of the cheapest levers available.

### How long should a paid landing page be?

Long enough to answer the objections that block the decision and no longer. Offer and action above the fold, proof and objection handling below, with the action repeated.

### What conversion should I optimise toward?

A real business outcome - a qualified enquiry or a purchase - not a button click or a pageview. Optimising toward a proxy trains the platform to find people who click but do not buy.

## Next steps

Take your highest-spend ad group, open its landing page on a mid-range phone, and check message match, load speed, and the single action. Fix those before touching a bid.

[Start free](/signup) and put an [FAQ accordion](/tools/faq) on the page to answer the objections that block conversion.`,
  },
  {
    title: "How to Choose an Ecommerce Platform",
    slug: "choosing-an-ecommerce-platform",
    excerpt:
      "Hosted, open-source, or marketplace-first? A decision framework covering total cost, payment and logistics fit, migration risk, and what actually locks you in.",
    coverImage: "/blog-covers/choosing-an-ecommerce-platform.webp",
    publishedAt: "2026-08-14T05:30:00.000Z",
    art: {
      eyebrow: "Ecommerce",
      coverHeadline: "Choose for the next three years, not this week",
      motif: "code",
      figure: {
        kind: "funnel",
        title: "Narrowing the choice",
        items: [
          "Payments and logistics that fit",
          "Catalogue and tax handling",
          "Total cost at your volume",
          "Who maintains it",
          "How you would leave",
        ],
        caption:
          "Ask how you would migrate away before you migrate in.",
      },
    },
    body: `Platform choice is usually made on demo quality and monthly price, then regretted eighteen months later over transaction fees, a payment gateway that does not fit, or a catalogue structure that cannot express what you sell.

This is the order the decision is better made in.

## Step 1: Write down your actual requirements

Not features - requirements. Specifically:

- **Catalogue shape.** How many products, how many variants each, do you need bundles, made-to-order, or subscriptions?
- **Payments.** Which methods do your customers use? UPI, cards, net banking, wallets, cash on delivery, EMI?
- **Tax.** Does the platform handle your GST requirements, including invoices in the required format?
- **Logistics.** Which couriers do you use, and does the platform integrate with them or your aggregator?
- **Channels.** Are you also selling on marketplaces or social, and does inventory need to stay in sync?
- **Volume.** Orders per month now, and a realistic figure in two years.
- **Team.** Who will run this day to day, and what can they do without a developer?

Mark each item must-have or nice-to-have. Most platform regret comes from a must-have that was assumed rather than checked.

![Funnel diagram showing how to narrow an ecommerce platform choice](/blog-figures/choosing-an-ecommerce-platform.webp)

## Step 2: Understand the three broad options

**Hosted platforms.** You rent the software; the vendor handles hosting, security, and updates. Fastest to launch, predictable to run, least flexible at the edges. Costs rise with apps and transaction fees.

**Open-source, self-hosted.** You control everything and pay for hosting, maintenance, security patching, and development. Cheapest in licence terms, most expensive in attention. Sensible when you have technical capacity or genuinely unusual requirements.

**Marketplace-first.** You sell primarily on established marketplaces with a light site of your own. Fast access to demand, weak ownership of the customer relationship, and commission on every order.

Many Indian businesses end up with a combination: a hosted own-brand store plus marketplace channels. If that is you, inventory synchronisation is a must-have, not a nice-to-have.

## Step 3: Calculate total cost, not the monthly price

Build a three-year figure for each option:

- Subscription or hosting
- Transaction fees charged by the platform, on top of gateway fees
- Payment gateway charges
- Apps or extensions you will actually need - reviews, shipping, marketing
- Theme or design work
- Developer time for setup and ongoing changes
- Migration cost, both in and eventually out

App and transaction costs are where hosted platforms surprise people. Four apps at a few thousand rupees a month each can exceed the platform subscription - see our [app bloat audit](/blog/shopify-app-bloat-audit).

## Step 4: Test the things that actually break

Demos show the happy path. Test the awkward parts with real data:

- Import a realistic sample of your catalogue, including your most complex product
- Place a real order end to end, including a failed payment and a retry
- Generate a compliant tax invoice
- Process a return and a partial refund
- Check what a staff member can change without a developer
- Test the admin on a phone, since that is where small teams work

## Step 5: Ask how you would leave

Before committing, establish the exit:

- Can you export products, customers, and orders in a usable format?
- Do you keep your customer data, including email consent status?
- Who owns the domain and the store account? It must be your business - see [choosing a development agency](/blog/choosing-shopify-development-agency)
- Are URLs structured so they could be redirected after a migration?
- Is your content portable, or locked into proprietary page builders?

A platform you cannot leave will eventually charge you what it likes.

## Step 6: Weigh the practical constraints

- **Performance.** Test a demo store on a mid-range phone; some themes are extremely heavy - see [page speed](/blog/page-speed-optimization-guide).
- **SEO control.** Can you set titles, descriptions, canonicals, and redirects? Can you control the URL structure?
- **Content.** Is there a usable blog or content system, or will you bolt one on?
- **Support.** What is the response time when checkout breaks on a Sunday?
- **Ecosystem.** Is there a local developer pool who know this platform?

## Step 7: Decide, then commit

Platform switching is expensive and disruptive. Once the analysis is done:

- Choose the option that meets your must-haves at a total cost you can sustain
- Plan the launch properly - see the [website launch checklist](/blog/website-launch-checklist)
- Map every existing URL to its new equivalent before you migrate
- Give it at least a year before reconsidering

## Common mistakes to avoid

- **Choosing on monthly price.** Apps and transaction fees dominate the real cost.
- **Assuming payment support.** Verify your specific methods with your specific gateway.
- **Not testing your hardest product.** Complex variants break platforms quietly.
- **No exit plan.** Data you cannot export is leverage against you.
- **Migrating without a redirect map.** It discards years of search history.

## Frequently asked questions

### What is the best ecommerce platform for a small business in India?

There is no single answer - it depends on catalogue complexity, the payment methods your customers use, GST invoicing needs, courier integrations, and who maintains the site. Score the shortlist against your must-haves rather than a feature list.

### Is a hosted platform or open-source better?

Hosted is usually right when you lack technical capacity: faster to launch and someone else handles security and updates. Open-source suits teams with development resources or genuinely unusual requirements.

### How much does an ecommerce platform really cost?

Add subscription, platform transaction fees, gateway charges, essential apps, theme work, and developer time over three years. Apps and transaction fees frequently exceed the headline subscription.

### How hard is it to change platforms later?

Expensive and disruptive: catalogue and customer migration, a full redirect map, design rebuild, and integration rework. Check the export path before you commit, not after.

## Next steps

Write your must-have list first, then test each shortlisted platform with your most complex product and a full order including a failed payment. Decide on total three-year cost, not the monthly price.

If you would rather have it scoped and built, see our [ecommerce development service](/services/ecommerce-development).`,
  },
  {
    title: "Redesigning a Website Without Losing Traffic",
    slug: "website-redesign-without-losing-traffic",
    excerpt:
      "Redesigns are the most common cause of sudden traffic loss. How to plan, migrate URLs, preserve content, and verify - before and after launch.",
    coverImage: "/blog-covers/website-redesign-without-losing-traffic.webp",
    publishedAt: "2026-08-15T05:30:00.000Z",
    art: {
      eyebrow: "SEO",
      coverHeadline: "The redirect map is the whole job",
      motif: "search",
      figure: {
        kind: "stack",
        title: "In this order",
        items: [
          "Benchmark what you have",
          "Map every old URL",
          "Preserve the content that ranks",
          "Launch and verify rendering",
          "Watch and fix for 60 days",
        ],
        caption:
          "Traffic loss after a redesign is almost always self-inflicted and reversible.",
      },
    },
    body: `A redesign is the most reliable way for a business to lose search traffic overnight. It happens the same way every time: new site, new URLs, no redirects, content trimmed for visual reasons, and a staging directive that came along for the ride.

All of it is preventable, and most of it is preventable in a spreadsheet.

## Before: benchmark what you have

You cannot detect a loss without a baseline. Record, for the 90 days before launch:

- Sessions and conversions by landing page
- Top pages by organic traffic and by revenue
- Queries you rank for, with average position
- Core Web Vitals field data
- Indexed page count
- Backlinks by target page - these are the pages that must not break

Export it and keep it. This is your evidence for what changed.

## Before: build the redirect map

This is the single most important task in any redesign.

- Export **every** URL from the old site - crawl it rather than trusting a sitemap
- Include pages that are not linked any more but still receive traffic or links
- Map each old URL to its closest equivalent
- Redirect permanently, in a single hop, never through a chain
- If there is genuinely no equivalent, map to the most relevant category, not the homepage

Redirecting everything to the homepage is treated as a soft error, and it discards the accumulated value of every page. Where content is genuinely gone with no successor, return a proper 404 or 410 rather than a fake success page.

![Priority stack showing the order of work in a safe redesign](/blog-figures/website-redesign-without-losing-traffic.webp)

## Before: keep the content that earns

Redesigns often trim copy for visual balance. That copy is frequently why the page ranks.

- Identify the pages driving organic traffic and revenue
- Preserve their substance - headings, the questions they answer, the depth
- Keep the H1 and title unless you have a specific reason to change them
- Do not move important content behind tabs or accordions that load only on interaction
- Keep internal links; navigation-only linking weakens deep pages, see [internal linking](/blog/internal-linking-strategy-guide)

If a page must be shortened, check first whether the removed section is what it ranks for.

## Before: check the technical basics on staging

- **Remove any noindex** from the staging environment - the most damaging and most common launch error
- Confirm robots.txt does not disallow anything important
- Self-referencing canonicals on every page
- Structured data carried across - see our [schema guide](/blog/schema-markup-guide-small-business)
- Titles and meta descriptions migrated, not regenerated as templates
- Image alt text preserved
- Performance measured on a mid-range phone, compared against the old site

Our [technical SEO checklist](/blog/technical-seo-checklist-small-business) covers the full list.

## Launch: verify rather than assume

On the day:

- Take a full backup of the old site, including the database
- Lower DNS time-to-live in advance
- Launch in your quietest window, never on a Friday
- Spot-check twenty important redirects manually
- Inspect several live URLs in Search Console and confirm they render as expected
- Confirm analytics is recording and firing once
- Submit the new sitemap

The full sequence is in our [website launch checklist](/blog/website-launch-checklist).

## After: the first 60 days

Some fluctuation is normal while search engines recrawl. A sustained drop is not.

**Week 1**

- Watch 404 logs daily and add redirects for anything with real traffic
- Check server error logs
- Verify forms are delivering, not silently failing
- Compare traffic and conversions with your benchmark

**Weeks 2 to 8**

- Watch the indexing report for pages excluded unexpectedly
- Compare rankings for your top queries against the benchmark
- Check Core Web Vitals field data as it accumulates
- Investigate any page that lost significant traffic individually - usually a missing redirect, thinner content, or a lost internal link

## When traffic does drop

Diagnose in this order:

1. **Indexing** - is the page indexed at all?
2. **Redirect** - does the old URL resolve in one hop to the right place?
3. **Content** - did the page lose the section it ranked for?
4. **Internal links** - is it still linked from somewhere meaningful?
5. **Speed** - did the new theme make it slower?

Most losses trace back to one of these five, and all five are fixable.

## Common mistakes to avoid

- **No redirect map.** The single largest cause of post-redesign loss.
- **Redirecting everything to the homepage.** It throws away every page's history.
- **Staging noindex left live.** It removes the site from search entirely.
- **Trimming the copy that ranks.** Visual balance is not worth the traffic.
- **No benchmark.** You cannot prove or diagnose what you did not measure.

## Frequently asked questions

### Why did my traffic drop after a website redesign?

Most commonly missing or incorrect redirects, a staging noindex left in production, content removed from pages that ranked for it, or internal links lost in the new navigation.

### How long should old URLs redirect after a redesign?

Indefinitely where practical, and at least a year at minimum. Links and bookmarks persist far longer than teams expect, and removing redirects later reintroduces the loss.

### Should I change URLs during a redesign?

Only where there is a clear reason. Every changed URL needs a redirect and loses a little value in transit. Keeping the existing structure is usually the safer choice.

### How long does it take to recover after a redesign?

Minor fluctuation settles within a few weeks. A drop caused by missing redirects or removed content recovers only once the underlying cause is fixed, then takes several weeks more to stabilise.

## Next steps

Before anything else, crawl your current site and build the redirect map. Benchmark your top pages and queries, and check the staging site for a noindex directive before launch day.

If you want it handled end to end, see our [digital marketing and SEO service](/services/digital-marketing-seo).`,
  },
  {
    title: "Refreshing Old Content for SEO",
    slug: "refreshing-old-content-for-seo",
    excerpt:
      "Updating what you already published usually beats writing something new. How to find the pages worth refreshing, what to change, and how to measure the result.",
    coverImage: "/blog-covers/refreshing-old-content-for-seo.webp",
    publishedAt: "2026-08-21T05:30:00.000Z",
    art: {
      eyebrow: "Content",
      coverHeadline: "The cheapest traffic is content you already own",
      motif: "chart",
      figure: {
        kind: "funnel",
        title: "Finding what to refresh",
        items: [
          "Pages ranking 8 to 20",
          "Pages losing traffic year on year",
          "Pages with stale facts",
          "Pages competing with each other",
        ],
        caption:
          "Improving one page that already ranks beats publishing three that do not.",
      },
    },
    body: `Content strategy defaults to publishing more. For most sites with an existing archive, the higher return is in the pages already published: they have history, links, and proven relevance, and they are usually one revision away from performing meaningfully better.

## Step 1: Find the candidates

Four groups, in order of return:

**Pages ranking between positions 8 and 20.** The topic is proven relevant and the page already ranks. Moving from position 12 to position 5 changes the traffic substantially, and it is far easier than ranking a new page.

**Pages losing traffic year on year.** Compare the last 90 days with the same period a year earlier. A steady decline usually means the content has aged or competitors improved.

**Pages with stale facts.** Prices, dates, product links, screenshots, statistics, and any reference to "this year".

**Pages competing with each other.** Two articles targeting the same intent split links and rankings and neither wins - see [keyword research](/blog/keyword-research-for-ecommerce).

Pull the first two lists from Search Console. It takes an afternoon and it is the highest-return content work available.

![Funnel diagram showing how to find content worth refreshing](/blog-figures/refreshing-old-content-for-seo.webp)

## Step 2: Diagnose before rewriting

For each candidate, look at what the page actually receives:

- Which queries does it appear for?
- Does the page genuinely answer those queries, or only touch them?
- Are there queries it ranks for that it barely mentions? That is the gap.
- What does the current first page of results contain that yours does not?
- Has the intent shifted - is the search now answered by a different format?

Do not rewrite on instinct. The queries tell you what is missing.

## Step 3: Make the changes that matter

In order of impact:

**Cover the gaps.** Add sections answering the queries the page ranks for but does not address. This is usually the single biggest lever.

**Fix the title and description.** A page with impressions but few clicks has a title problem, not a content problem. Rewrite it to match the searcher's phrasing and to promise what the page delivers.

**Update every fact.** Prices, dates, product names, links, screenshots, and statistics. One obviously outdated fact makes readers doubt everything else.

**Improve the opening.** Answer the question in the first two paragraphs rather than after a history of the industry.

**Add an FAQ section.** Cover the related questions people also ask, using a real [FAQ accordion](/tools/faq) where it suits the page.

**Fix the internal links.** Link to newer relevant content, and add links to this page from the relevant hub - see [internal linking](/blog/internal-linking-strategy-guide).

**Check speed and layout.** Old pages often carry heavy images and legacy embeds.

## Step 4: Merge competing pages

Where two pages target the same intent:

- Choose the stronger one - more links, better rankings, better URL
- Move the unique value from the weaker page into it
- Redirect the weaker URL permanently to the survivor
- Update internal links to point at the survivor directly

Merging two mediocre pages into one strong one is often the highest-return action in an entire content archive.

## Step 5: Be honest about dates

- Update the modified date only when the content genuinely changed
- Do not change the published date to fake freshness - it is a pattern that gets noticed
- Show both dates where it helps the reader
- Reflect real changes in your structured data - see our [schema guide](/blog/schema-markup-guide-small-business)

Rewriting an introduction and bumping the date is not a refresh; it is a claim you cannot support.

## Step 6: Know when to delete instead

Not everything deserves saving:

- Content about a product or service you no longer offer
- Event pages with no ongoing value
- Thin pages that never ranked and never will
- Duplicates with nothing unique

Redirect them to the closest relevant page if one exists. If nothing is relevant, let them return 404 or 410. A smaller archive of pages that all earn their place is stronger than a large one padded with pages nobody reads.

## Step 7: Measure the result

- Record position, impressions, clicks, and conversions before you change anything
- Change one page at a time so you can attribute the effect
- Allow four to eight weeks before judging
- Watch conversions, not only traffic - a page can gain visitors and lose customers

## Step 8: Make it routine

- Review your top 20 pages quarterly
- Add a "last reviewed" note in your own records, not necessarily on the page
- Include content checks in your [monthly maintenance routine](/blog/website-maintenance-checklist-monthly)
- Refresh before publishing new work when both compete for the same limited time

## Common mistakes to avoid

- **Bumping the date without changing anything.** It is a hollow signal.
- **Rewriting from scratch.** You risk losing what already worked.
- **Changing the URL unnecessarily.** It discards accumulated value.
- **Refreshing everything at once.** You cannot attribute the result.
- **Keeping every old page.** Some should be merged or removed.

## Frequently asked questions

### How often should I update old blog posts?

Review your top 20 pages quarterly and refresh the ones with stale facts, declining traffic, or rankings between positions 8 and 20. Not every page needs an annual rewrite.

### Does updating old content help SEO?

Yes, when the update genuinely improves coverage, accuracy, and clarity. Search engines respond to a better answer, not to a changed date.

### Should I change the published date when I update a post?

Update the modified date; leave the original published date alone. Faking freshness by resetting the publish date is a recognisable pattern and it misleads readers.

### Is it better to update old content or write new content?

For most sites with an existing archive, updating wins. A page already ranking on the second page needs far less work to reach the first than a new page needs to rank at all.

## Next steps

Export your Search Console queries, filter to pages ranking between positions 8 and 20, and improve the top three by covering the queries they rank for but do not answer.

If you want this run as a programme, see our [digital marketing and SEO service](/services/digital-marketing-seo).`,
  },
  {
    title: "Setting Up Conversion Tracking Properly",
    slug: "conversion-tracking-setup-guide",
    excerpt:
      "Wrong conversion data leads to confidently wrong decisions. How to define conversions, implement them reliably, handle consent, and verify the numbers.",
    coverImage: "/blog-covers/conversion-tracking-setup-guide.webp",
    publishedAt: "2026-08-22T05:30:00.000Z",
    art: {
      eyebrow: "Analytics",
      coverHeadline: "Wrong numbers are worse than no numbers",
      motif: "chart",
      figure: {
        kind: "checklist",
        title: "Before you trust a conversion number",
        items: [
          "It maps to a business outcome",
          "It fires once, not twice",
          "It survives refresh and back",
          "Consent handling is understood",
          "It reconciles with your orders",
        ],
        caption:
          "Reconcile against your order table. That is the only source of truth.",
      },
    },
    body: `Conversion tracking is treated as a setup task and then trusted forever. In practice it breaks quietly - a template change, a new consent banner, a duplicated tag - and the reports keep producing numbers that look plausible and are wrong.

Wrong conversion data is worse than none, because it produces confident decisions in the wrong direction.

## Step 1: Define conversions as business outcomes

Start by writing down what actually matters:

- **Primary** - a completed order, or a qualified enquiry
- **Secondary** - a started checkout, a quote request, a booking
- **Supporting** - a newsletter signup, a call tap, a WhatsApp click

The common failure is optimising toward a proxy. If you optimise ad spend toward "button click", the platform will reliably find people who click and do not buy. Optimise toward the outcome you actually want.

For lead businesses, the honest conversion is a **qualified** enquiry, not a form fill. That means the qualification result has to flow back - see [website to CRM workflow](/blog/website-to-crm-workflow).

## Step 2: Assign a value

A conversion without a value cannot be compared against cost:

- For commerce, use real order value, excluding tax and delivery if that is how you judge margin
- For leads, use an expected value: average deal value multiplied by your historical close rate for that source
- Review the assumed values quarterly

Without values, every channel report is a volume report.

![Checklist panel listing what to verify before trusting a conversion number](/blog-figures/conversion-tracking-setup-guide.webp)

## Step 3: Implement so it fires once

Most tracking bugs are duplication or omission:

- Fire the conversion at the point the outcome is confirmed, not when a button is pressed
- Guard against double-firing on page refresh and back navigation - use the order identifier for deduplication
- Do not fire on a thank-you page that can be revisited or bookmarked
- Check single-page navigation, where events commonly fire on every route change
- Confirm the tag exists on every relevant template, not just the one you tested

For your most important conversions, recording server-side is more reliable: it survives ad blockers, script failures, and the page being closed. Consent obligations still apply - it is a reliability improvement, not a way around consent.

## Step 4: Handle consent deliberately

If measurement is held until consent, you will measure fewer conversions than actually happen:

- Know roughly what share of visitors decline
- Understand which tools are held and which are not
- Do not compare a consent-gated period against an ungated one and call it a trend
- Never bypass consent to preserve numbers - the regulatory and reputational cost far exceeds the reporting benefit

See our [cookie consent guide](/blog/how-to-add-cookie-consent-banner) and [privacy compliance guide](/blog/website-privacy-compliance-india).

## Step 5: Verify, do not assume

Test properly before trusting anything:

1. Complete a real conversion end to end and confirm it records once
2. Refresh the confirmation page and confirm it does not record again
3. Navigate back and forward and check the same
4. Test on mobile, and with an ad blocker enabled
5. Test a failed payment and confirm it does not count
6. Check the value recorded matches the actual order value

Then **reconcile**: compare platform-recorded conversions against your own order or enquiry records for the same period. If analytics says 180 and your order table says 214, you have a measurement gap to explain before you use either number.

## Step 6: Expect the platforms to disagree

They will, permanently:

- Analytics undercounts, because of blockers, consent, and lost sessions
- Ad platforms overcount, partly through modelling and their own attribution windows
- Different attribution models credit different touchpoints
- Cross-device journeys are partly invisible

Do not spend weeks reconciling them. Use your own order and CRM data as the source of truth for revenue, and treat platform reports as directional. Our guide on [measuring without third-party cookies](/blog/first-party-analytics-without-third-party-cookies) covers the wider approach.

## Step 7: Watch it over time

Tracking degrades:

- Check weekly that conversions are still recording
- Set an alert for a sudden drop to zero, which usually means a broken tag, not a broken business
- Re-verify after every template change, theme update, or consent-tool change
- Include a tracking check in your [monthly maintenance routine](/blog/website-maintenance-checklist-monthly)
- Audit your tag manager quarterly and remove tags nobody owns

## Common mistakes to avoid

- **Optimising toward clicks.** You get clickers, not customers.
- **Double-firing on refresh.** It inflates everything downstream.
- **Never reconciling with your order table.** The only real check available.
- **Counting form fills as conversions for a lead business.** Volume is not qualification.
- **Comparing across consent changes.** The baseline moved, not the business.

## Frequently asked questions

### Why do my analytics and ad platform conversion numbers differ?

They measure and attribute differently, and one of them models conversions it cannot observe. Some gap is expected. Use your own order records as the reference and treat both as directional.

### What should I count as a conversion?

The business outcome you actually want - a completed order or a qualified enquiry - with a monetary value attached. Button clicks and pageviews are proxies that lead optimisation astray.

### How do I know my conversion tracking is working?

Complete a real conversion, confirm it records once, refresh and navigate back to check it does not duplicate, test with an ad blocker, and reconcile the totals against your own order or enquiry records.

### Does consent affect conversion tracking?

Yes. Where measurement is held until consent, some conversions go unrecorded. Know roughly what share that is so you interpret the numbers correctly, and never bypass consent to improve reporting.

## Next steps

Complete one real order on your own site and verify the conversion records exactly once with the correct value. Then reconcile last month's tracked conversions against your order table before making another spend decision.

[Start free](/signup) and capture the source on every enquiry so the loop closes.`,
  },
  {
    title: "Site Search Optimization for Online Stores",
    slug: "site-search-optimization-for-stores",
    excerpt:
      "Visitors who search convert far better than those who browse. How to fix no-result queries, handle synonyms and misspellings, and mine search data for gaps.",
    coverImage: "/blog-covers/site-search-optimization-for-stores.webp",
    publishedAt: "2026-08-27T05:30:00.000Z",
    art: {
      eyebrow: "Ecommerce",
      coverHeadline: "Your highest-intent visitors are typing",
      motif: "search",
      figure: {
        kind: "checklist",
        title: "A search box that works",
        items: [
          "Tolerates misspellings",
          "Understands your customers' words",
          "Never returns a dead end",
          "Filters and sorts the results",
          "Logs every query, including zeros",
        ],
        caption:
          "A no-results page is a customer telling you exactly what you are missing.",
      },
    },
    body: `Visitors who use site search are among the highest-intent people on a store: they know what they want and they are trying to find it. They also convert at a substantially higher rate than browsers on most sites.

Which makes it strange that site search is usually the least maintained feature on the whole site.

## Step 1: Turn on the logging

You cannot improve what you cannot see. Make sure your analytics records:

- Every search term
- The number of results returned
- Whether the visitor clicked a result
- Whether they searched again immediately
- Whether the session converted

The single most valuable report is **queries returning zero results**. Each one is a customer telling you, in their own words, what they expected to find and did not.

## Step 2: Fix the no-results queries first

Group them into four causes, each with a different fix:

- **You sell it, but call it something else.** Add the customer's word as a synonym.
- **You sell it, but the search cannot find it.** A matching or indexing problem.
- **You do not sell it, but should.** A product gap.
- **You do not sell it and will not.** Redirect to the closest alternative rather than a dead end.

Working through a month of zero-result queries usually takes an afternoon and fixes a surprising share of lost sessions.

![Checklist panel listing what a working site search needs](/blog-figures/site-search-optimization-for-stores.webp)

## Step 3: Handle misspellings and variants

People type quickly, on phones, sometimes in a second language:

- **Fuzzy matching** for near-miss spellings
- **Synonyms** mapping customer words to your product names - "cell phone" and "mobile", "kurti" and "kurta"
- **Singular and plural** treated the same
- **Transliteration**, where your customers type phonetically
- **Ignore case, punctuation, and extra spaces**
- **Partial word matching**, so "bluetooth speak" still finds speakers

Build the synonym list from your own zero-result log rather than guessing.

## Step 4: Never return a dead end

A blank "no results found" page loses the visitor. An empty state should always offer a route forward:

- Say plainly that nothing matched
- Suggest a corrected spelling where you have one
- Show popular or related products
- Offer the closest category
- Offer a human route - a [WhatsApp](/tools/whatsapp) link with the query pre-filled works well
- Never show a blank area or an endless spinner

See [microcopy that removes friction](/blog/microcopy-that-removes-friction) for how to write these states.

## Step 5: Make the results usable

Finding results is half the job; choosing between them is the other half:

- Show a result count
- Provide filters that match the query context - size, price, availability
- Offer sensible sorting, with relevance as the default
- Show price, key variant, availability, and a meaningful image on each result card
- Keep out-of-stock items visible but clearly marked, rather than hidden
- Preserve the query when the visitor goes back from a product

## Step 6: Use autocomplete carefully

Suggestions help when they are accurate and hurt when they are not:

- Suggest products and categories, not just raw query strings
- Show a thumbnail and price where you can
- Keep it to a handful of suggestions
- Make it keyboard navigable with arrow keys and Enter
- Ensure it is announced properly to screen readers
- Never let it cover the search field on a phone

## Step 7: Mine the data for more than search fixes

Search queries are the cheapest customer research you own:

- **Product gaps** - repeated searches for things you do not stock
- **Naming mismatches** - customers using words your catalogue does not
- **Content gaps** - questions typed into the search box, which belong in an [FAQ](/tools/faq) or an article
- **Merchandising signals** - what is being searched far more than it is being browsed to
- **Keyword research input** - real phrasing for your product pages, see [keyword research](/blog/keyword-research-for-ecommerce)

If a term is searched frequently, consider giving it a landing page and promoting it in navigation. Repeated searching for something already in your menu is a navigation problem.

## Step 8: Get the interface right

- The search box should be visible on every page, not hidden behind an icon on desktop
- Use the word "Search" or a labelled magnifier - an unlabelled icon is missed
- Make the field large enough to type into comfortably on a phone
- Keep the query visible after submitting, so it can be edited rather than retyped
- Ensure the whole flow works with a keyboard alone

## Common mistakes to avoid

- **Not logging queries.** You lose the best data on the site.
- **Blank no-results pages.** A guaranteed exit.
- **No synonyms.** Customers do not use your internal product names.
- **Hiding out-of-stock items entirely.** People search for them and conclude you do not stock them at all.
- **Search hidden behind an icon.** High-intent visitors cannot find the way to tell you what they want.

## Frequently asked questions

### Does site search affect conversion rate?

Substantially. Visitors who search typically convert at a much higher rate than those who only browse, because they arrive with specific intent. That makes failed searches unusually expensive.

### What should I do about zero-result searches?

Group them by cause: add synonyms where you sell the item under another name, fix indexing where the product exists but is not found, note genuine product gaps, and redirect the rest to the closest alternative.

### Should out-of-stock products appear in search results?

Yes, clearly marked, with a restock notification option. Hiding them makes customers think you never stocked the item, and you lose the demand signal.

### How do I handle misspellings in site search?

Use fuzzy matching for near misses, maintain a synonym list built from your own zero-result log, ignore case and punctuation, and support partial word matching.

## Next steps

Open your analytics, export last month's site search queries sorted by zero results, and fix the top twenty. It is usually an afternoon of work against your highest-intent traffic.

[Start free](/signup) and turn the questions people type into a [FAQ accordion](/tools/faq) on the pages where they ask them.`,
  },
];
