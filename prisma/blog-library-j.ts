import type { BlogLibraryPost } from "./blog-library-types";

export const BLOG_POSTS_J: BlogLibraryPost[] = [
  {
    title: "How to Add a CTA Button That Gets Clicked",
    slug: "how-to-add-a-cta-button-that-gets-clicked",
    excerpt:
      "Button copy, placement, size, and contrast decide whether an action happens. A practical guide to designing call-to-action buttons that people actually press.",
    coverImage: "/blog-covers/how-to-add-a-cta-button-that-gets-clicked.webp",
    publishedAt: "2026-06-27T05:30:00.000Z",
    art: {
      eyebrow: "Conversion",
      coverHeadline: "One action, stated in the visitor's words",
      motif: "funnel",
      figure: {
        kind: "compare",
        title: "Button copy that works",
        items: [
          "Get a quote in 24 hours",
          "See pricing",
          "Book a fitting",
          "Download the checklist",
        ],
        items2: [
          "Submit",
          "Click here",
          "Learn more",
          "Get started",
        ],
        caption:
          "A label should say what happens next, from the visitor's point of view.",
      },
    },
    body: `A call-to-action button is the smallest element on a page carrying the largest share of the outcome. Most of them are labelled "Submit" or "Learn more", styled to match five other buttons on the page, and placed below the fold on a phone.

This guide covers the four things that decide whether a button gets pressed: what it says, where it sits, how it looks, and what it promises.

## 1. Write the label as an outcome

The label should complete the sentence "I want to...".

- **"Get a quote in 24 hours"** beats "Submit"
- **"See pricing"** beats "Learn more"
- **"Book a fitting"** beats "Contact us"
- **"Download the checklist"** beats "Click here"

Two rules make labels better:

- **Use the visitor's verb, not your process.** They are not "submitting an enquiry"; they are asking for a price.
- **Name the value, not the effort.** "Start free" is better than "Register account".

Keep it to two to four words where you can. If the label needs a qualifier - "no card required", "takes 2 minutes" - put it as a small line beneath the button rather than inside it.

## 2. Have one primary action per screen

The most common failure is not a weak button; it is three equally weighted ones.

- One visually dominant primary button per screen
- Secondary routes styled as outlined buttons or text links
- Never place two filled buttons of the same colour side by side
- If a page genuinely has two audiences, split them clearly rather than competing

Two equally weighted buttons split attention and reduce total clicks on both. See [what belongs above the fold](/blog/what-belongs-above-the-fold-on-homepage).

![Comparison panel contrasting outcome-based button copy with generic labels](/blog-figures/how-to-add-a-cta-button-that-gets-clicked.webp)

## 3. Place it where the decision is made

A button works where conviction peaks, which is not always at the bottom:

- **After the offer is explained**, not before
- **Repeated on long pages** - once in the hero, once after the proof, once at the end
- **Beside the objection it answers** - a "See delivery options" action next to shipping information
- **Never covered by a sticky bar** on mobile

Test with the on-screen keyboard open. A chat launcher or consent banner sitting on the primary action is a silent revenue leak - see our [mobile checkout checklist](/blog/mobile-checkout-ux-checklist).

## 4. Make it look pressable

- **Contrast.** The primary button should be the highest-contrast interactive element on the screen, and must still meet contrast requirements against its background.
- **Size.** Large enough for a thumb, with clear space around it so nothing else is hit by accident.
- **Shape consistency.** Use the same shape language for the same level of action across the site.
- **Obvious affordance.** A filled rectangle reads as pressable; a bare word does not.
- **Never rely on colour alone** to signal which action is primary - weight and size should carry it too.

## 5. Build it without editing your theme

The [Custom Button widget](/tools/button) supports link, call, email, scroll, and copy actions, which covers most cases without a developer:

- **Link** for navigation to a page or offer
- **Call** for tap-to-dial, which outperforms a form for urgent services
- **Email** where a direct message is the natural route
- **Scroll** to jump to a form further down a long page
- **Copy** for coupon or reference codes

Place it with the [embed snippet guide](/help/installing-embed-snippet).

## 6. Make the destination match the promise

The most damaging button problem is not the label - it is a mismatch:

- "See pricing" must land on prices, not a contact form
- "Book a fitting" must open a booking step, not a generic enquiry page
- "Download the checklist" must download, not gate behind five fields

If the label promises one thing and the next screen does another, you have spent the click and lost the trust. Our [lead capture best practices](/blog/lead-capture-form-best-practices) covers how much to ask for at that point.

## 7. Measure the button, not the page

- Click rate on each button instance, separated by position
- Completion rate after the click, which is the number that matters
- Device split, since mobile placement problems hide in an average
- Whether repeated buttons on long pages get used, and which position wins

A button with a high click rate and a low completion rate is a promise the next screen is not keeping.

## Common mistakes to avoid

- **"Submit".** It describes your database, not their goal.
- **Two primary buttons.** Attention splits, clicks fall.
- **Below the fold on mobile with no repeat.** Most visitors never see it.
- **Label and destination mismatch.** The most expensive kind of click.
- **Low contrast for aesthetic reasons.** A button nobody notices is a button nobody presses.

## Frequently asked questions

### What makes a good call-to-action button?

An outcome-based label in the visitor's words, one primary action per screen, high contrast, a comfortable tap size, and a destination that delivers exactly what the label promised.

### What colour should a CTA button be?

Whichever colour has the strongest contrast against its surroundings while meeting accessibility requirements. There is no universally best colour - what matters is that it is clearly the most prominent interactive element.

### How many CTAs should a page have?

One primary action, repeated as often as the page is long. Secondary routes should exist but must be visually quieter so they do not compete.

### Should a CTA button say "Submit"?

No. Replace it with what the visitor gets: "Get a quote", "Book a call", "See pricing". Generic labels measurably underperform outcome-based ones.

## Next steps

Rewrite the label on your single most important button as an outcome, make sure nothing covers it on a phone, and check that the next screen delivers exactly what it promised.

[Start free](/signup) and publish one with the [Custom Button widget](/tools/button).`,
  },
  {
    title: "How to Use an Announcement Bar Well",
    slug: "how-to-use-an-announcement-bar-well",
    excerpt:
      "An announcement bar is the least intrusive way to say one thing site-wide. What belongs there, how long to leave it up, and how to avoid stacking banners.",
    coverImage: "/blog-covers/how-to-use-an-announcement-bar-well.webp",
    publishedAt: "2026-06-30T05:30:00.000Z",
    art: {
      eyebrow: "Widget guides",
      coverHeadline: "One message, site-wide, easy to dismiss",
      motif: "chat",
      figure: {
        kind: "checklist",
        title: "A bar that earns its strip",
        items: [
          "One message, not three rotating",
          "Specific and time-bound",
          "Dismissible, and it stays dismissed",
          "Removed the day it expires",
          "Never stacked with other banners",
        ],
        caption:
          "The bar costs you vertical space on every page. Charge it rent.",
      },
    },
    body: `An announcement bar is the gentlest interruption available: a thin strip at the top or bottom of every page carrying one message. Unlike a popup, it does not block anything. Unlike a hero banner, it does not compete for the main message.

That makes it easy to abuse. Most sites end up with a bar nobody reads, announcing something that ended two months ago.

## What belongs in an announcement bar

Things that are true site-wide, time-bound, and useful:

- A live offer with clear terms - "Free delivery over Rs 999 until 31 August"
- A genuine delivery cut-off before a festival
- Temporary changes to hours or service
- A service disruption or delay notice
- A new launch, for a short period after launch
- A regulatory or safety notice you are required to display

What does not belong:

- Your value proposition, which is the hero's job
- A permanent "Sign up for our newsletter"
- Three messages rotating on a timer
- Anything so important it needs a whole page

## Write it as one sentence

The bar is one line on a phone. Discipline is forced on you:

- **State the offer or fact**, not the excitement about it
- **Include the condition** - threshold, deadline, region
- **Include one action**, linked
- **Skip the exclamation marks.** They make a genuine offer read as spam

"Free delivery over Rs 999. Ends Sunday." with a link works. "🎉 HUGE SALE NOW ON!!! 🎉" does not, and it damages the surrounding page.

![Checklist panel listing what makes an announcement bar worth its space](/blog-figures/how-to-use-an-announcement-bar-well.webp)

## Do not rotate messages

A rotating bar is a slider in a smaller box, and it inherits the same problem: only the first message is read, and rotation moves text away mid-sentence.

If you have three things to announce, you have a prioritisation problem, not a display problem. Pick one. Put the others where they belong - the second on the relevant category page, the third in the footer.

## Build it without editing your theme

The [Popup and Announcement Bar widget](/tools/popup) runs in bar mode, at the top or bottom, with a heading, message, and call to action.

Configure:

- **Position.** Top for offers and notices; bottom competes with chat launchers and sticky actions.
- **Dismissible**, always, with a visible close control - and remember the dismissal for at least the session.
- **Delay.** None. A bar should be there on first paint or not at all.
- **Colour.** Distinct from your header, but not a colour that means "error" elsewhere on the site.

Place it with the [embed snippet guide](/help/installing-embed-snippet).

## Watch the stacking problem

The top of a mobile screen fills fast. Count what is already there:

- Browser chrome
- Your sticky header
- A cookie or consent notice
- The announcement bar
- Sometimes a shipping notice from the platform

Four of those and your page content starts below the fold. Before adding a bar, screenshot the first screen on a real phone. If the headline is pushed off, something has to go - see [what belongs above the fold](/blog/what-belongs-above-the-fold-on-homepage).

Also reserve the bar's height so it does not push the page down after load. Layout shift at the top of the page is the worst kind.

## Set an expiry before you publish

The single most common failure is a live bar advertising a finished sale.

- Decide the end date and time before publishing
- Put a calendar reminder on one person for the removal
- Where the bar carries a deadline, pair it with a real [countdown](/tools/countdown) that expires correctly - see [honest urgency](/blog/countdown-timers-honest-urgency)
- Include the removal in your [monthly maintenance checklist](/blog/website-maintenance-checklist-monthly)

A stale bar tells every visitor that nobody is minding the site, and it makes your next genuine offer less believable.

## Measure whether it works

- Click rate on the bar's action
- Conversion rate of sessions that clicked, versus those that did not
- Dismissal rate - a high one means the message is not relevant
- Whether the offer it advertises actually gets used

If the bar is dismissed by most visitors and clicked by almost none, it is costing vertical space on every page for nothing.

## Common mistakes to avoid

- **Rotating messages.** Only the first is read.
- **No dismiss control**, or one that forgets the choice on the next page.
- **Leaving it up after the offer ends.** The most common and most damaging.
- **Stacking it under a consent banner and a sticky header.** The content disappears.
- **Using it for your value proposition.** That belongs in the hero.

## Frequently asked questions

### What should an announcement bar say?

One time-bound, site-wide fact with its condition and a single action: a delivery threshold, a cut-off date, a service change. Not your value proposition, and not three messages in rotation.

### Should the announcement bar be at the top or bottom?

Top for offers and notices, where it is read first. The bottom of a mobile screen is already crowded with chat launchers, sticky actions, and browser chrome.

### Should visitors be able to dismiss it?

Yes, with a visible close control, and the dismissal should persist across pages. A bar that reappears on every navigation reads as if you ignored the visitor.

### How long should an announcement bar stay up?

Only as long as the message is true. Set the end date before publishing and put a reminder on one person to remove it - a bar advertising a finished sale damages trust in every other claim on the site.

## Next steps

Pick the one message that is genuinely true site-wide this week, publish it with the [Popup and Announcement Bar widget](/tools/popup) in bar mode, and set a calendar reminder for the day it expires.

[Start free](/signup) and keep the strip honest.`,
  },
  {
    title: "How to Write Product Descriptions That Sell",
    slug: "how-to-write-product-descriptions-that-sell",
    excerpt:
      "Descriptions that answer real questions instead of listing adjectives: structure, specifications, objection handling, and writing for both buyers and search.",
    coverImage: "/blog-covers/how-to-write-product-descriptions-that-sell.webp",
    publishedAt: "2026-07-03T05:30:00.000Z",
    art: {
      eyebrow: "Ecommerce",
      coverHeadline: "Answer the question that stops the purchase",
      motif: "cart",
      figure: {
        kind: "flow",
        title: "The description that converts",
        items: [
          "What it is, in one line",
          "Who it suits, and who it does not",
          "Specifications that decide fit",
          "The objection, answered",
        ],
        caption:
          "Buyers do not read descriptions. They search them for one specific answer.",
      },
    },
    body: `Most product descriptions are written as if the buyer will read them start to finish. They will not. They scan for the one fact that resolves their doubt - will it fit, will it last, will it work with what I already have - and if they cannot find it in a few seconds, they leave or they message support.

Write for scanning, and write for the doubt.

## Step 1: Find out what the doubt actually is

You already have the data:

- Pre-purchase questions in support, chat, and WhatsApp
- Return reasons, which are unanswered questions with a refund attached
- Review text where buyers explain what surprised them
- Site search terms on that product
- Questions your sales staff answer in the shop

Each recurring question is a line the description is missing. Fix the top three before touching the prose.

## Step 2: Open with what it is, plainly

The first line should let someone who arrived from search confirm they are in the right place:

- What the product is, in ordinary words
- The defining attribute - material, size, capacity, compatibility
- Who it is for

"A 1.2-litre borosilicate glass teapot with a stainless steel infuser, for loose-leaf tea." No adjectives required. A buyer now knows whether to keep reading.

![Flow diagram showing the structure of a product description that converts](/blog-figures/how-to-write-product-descriptions-that-sell.webp)

## Step 3: Say who it is not for

Counter-intuitive and one of the highest-return lines you can write:

- "Not suitable for induction hobs"
- "Runs small - size up if you are between sizes"
- "Designed for indoor use only"

Every buyer you turn away here is a return you do not process, a support ticket you do not answer, and a one-star review you do not receive. Honesty about limits also makes the positive claims more believable.

## Step 4: Give specifications that decide the purchase

Bullet the facts a buyer needs to compare:

- Dimensions and weight, in the units your market uses
- Materials and finish
- Capacity, output, or coverage
- Compatibility and requirements
- Care instructions
- What is in the box
- Warranty period

Put these in a scannable list, not a paragraph. If a specification varies by variant, make sure it updates when the variant changes - a common and expensive product page bug covered in our [product page checklist](/blog/product-page-optimization-checklist).

## Step 5: Translate features into consequences

A feature is a fact; a benefit is what it means:

- "Borosilicate glass" → "handles boiling water without cracking, and goes in the dishwasher"
- "1,200 mAh battery" → "about two weeks of typical use between charges"
- "GSM 280 cotton" → "heavy enough to hold its shape after repeated washing"

Keep the feature next to the consequence. Buyers who know the category want the number; buyers who do not want the meaning.

## Step 6: Handle the last objections on the page

Before the add-to-cart action, close the remaining doubts:

- Delivery cost and estimated date
- Return window and who pays return shipping
- Whether it is genuine, and the warranty route
- A size guide or compatibility list

A short [FAQ accordion](/tools/faq) with the five real objections outperforms three more paragraphs of description. Add a [WhatsApp route](/tools/whatsapp) for the compatibility questions no page can anticipate.

## Step 7: Write for search without writing for robots

- Use the words buyers search with - including the everyday name, not only your internal one
- Put the important attributes in the title and the first line
- Cover the variations naturally rather than repeating a phrase
- Write a unique description per product; duplicated manufacturer copy competes with every other seller using it

See our [keyword research guide](/blog/keyword-research-for-ecommerce) for how to find the phrasing customers actually use.

## Step 8: Format for scanning

- Short paragraphs, two or three sentences
- Bulleted specifications
- Subheadings for description, specifications, care, and delivery
- Bold only the words that carry a decision
- No wall of text, and no essential fact hidden behind a collapsed tab nobody opens

## Common mistakes to avoid

- **Manufacturer copy pasted in.** It is duplicated across every competitor.
- **Adjectives instead of facts.** "Premium quality" tells a buyer nothing.
- **No dimensions.** The most common cause of size-related returns.
- **Specifications that do not update with the variant.**
- **Never revisiting.** Return reasons are free instructions for improving the page.

## Frequently asked questions

### How long should a product description be?

Long enough to answer every real objection and no longer. A simple accessory may need 80 words; a technical product may need 400. Coverage matters, not length.

### Should I use the manufacturer's product description?

No, or not alone. It is duplicated across every retailer selling the item, so it neither differentiates you nor helps you rank. Rewrite it around the questions your own buyers ask.

### What information reduces returns most?

Accurate dimensions, honest fit guidance, clear material and compatibility details, and an explicit statement of who the product is not for.

### Where do I find out what to write about?

Support and chat questions, return reasons, review text, and site search terms on that product. Every recurring question is a missing line.

## Next steps

Take your highest-return product, list the last twenty return reasons and support questions, and rewrite the description so every one of them is answered above the add-to-cart button.

[Start free](/signup) and add a [FAQ accordion](/tools/faq) with the five objections that remain.`,
  },
  {
    title: "A Return Policy That Builds Trust",
    slug: "return-policy-that-builds-trust",
    excerpt:
      "A clear return policy sells more than it costs. How to write one customers understand, where to show it, and how to reduce returns without hiding the terms.",
    coverImage: "/blog-covers/return-policy-that-builds-trust.webp",
    publishedAt: "2026-07-04T05:30:00.000Z",
    art: {
      eyebrow: "Ecommerce",
      coverHeadline: "The policy is a sales page, not a legal one",
      motif: "shield",
      figure: {
        kind: "checklist",
        title: "What a customer needs to know",
        items: [
          "How many days, from when",
          "Who pays return shipping",
          "Condition the item must be in",
          "How long the refund takes",
          "What is excluded, and why",
        ],
        caption:
          "Five answers. If your policy page does not give all five, expect the tickets.",
      },
    },
    body: `A return policy is read before the purchase far more often than after it. For a first-time buyer, it is the answer to the last question standing between them and the pay button: what happens if this is wrong?

Written well, it removes that hesitation. Written as legal boilerplate and buried in the footer, it creates it.

## The five things a customer needs

Every policy must answer these plainly, near the top:

1. **How long** they have, and from which date - delivery, not order
2. **Who pays return shipping**, for a change of mind and for a fault
3. **What condition** the item must be in - unused, tags attached, original packaging
4. **How long the refund takes**, and to which method it returns
5. **What is excluded**, and the reason

If a customer cannot answer all five in thirty seconds, your support inbox will supply the difference.

## Write it in plain language

Legal accuracy and plain language are not in conflict. Write the customer-facing version first:

- Short sentences, ordinary words
- Second person: "You have 7 days from delivery"
- Numbers as numerals
- One idea per paragraph
- A summary box at the top, with the detail below

Keep any formal terms your lawyer requires further down the page, under a clear heading. The summary is what gets read.

![Checklist panel listing the five things a return policy must answer](/blog-figures/return-policy-that-builds-trust.webp)

## Be honest about exclusions

Exclusions are legitimate. Hiding them is not.

- Hygiene and personal-care items
- Custom or personalised goods
- Perishables
- Software or digital goods once accessed
- Clearance items, if genuinely excluded

State each exclusion with a one-line reason. "Earrings cannot be returned for hygiene reasons" is accepted; discovering it at the return request is not.

Also check the consumer protection rules in your market. Statutory rights for faulty goods generally sit above your policy, and a policy implying otherwise creates legal exposure as well as bad will.

## Show it where the doubt happens

The policy page is not where the question is asked. Put the answer next to the decision:

- **On the product page**, one line above the add-to-cart button: "7-day returns. We pay return shipping on faults."
- **In the cart**, as a short reassurance line
- **At checkout**, near the pay button - see our [cart abandonment guide](/blog/reduce-cart-abandonment-without-discounts)
- **In the order confirmation**, so the customer has it on record
- **In a [FAQ accordion](/tools/faq)** on the product page

Our post on [trust signals](/blog/trust-signals-indian-ecommerce) covers the wider set of reassurances that belong at the final step.

## Make the process easy to start

A policy is only as good as the process behind it:

- One obvious route to start a return - a form, a link in the order email, or a chat handoff
- No requirement to phone during working hours only
- A clear list of what you need from the customer
- An acknowledgement within one working day
- Status updates as it progresses
- Refunds processed on the day the item is received and checked, not the end of the month

The most-cited complaint is not the policy terms. It is silence after the return was posted.

## Reduce returns at the source

The right way to lower return rates is to prevent the mismatch, not to make returns harder:

- Accurate dimensions and honest fit guidance - see [writing product descriptions](/blog/how-to-write-product-descriptions-that-sell)
- Images that show scale, texture, and true colour
- A size guide that matches the actual garment
- Explicit compatibility lists
- Customer photos in reviews
- A [WhatsApp route](/tools/whatsapp) so pre-purchase doubts get answered before the order

Track your top return reasons monthly. Each one points at a specific line missing from a specific page.

## Consider what a longer window does

A generous window feels expensive and often is not:

- It removes hesitation at the point of purchase
- Return rates do not usually rise in proportion to window length
- Longer windows can reduce impulsive returns, because the pressure to decide immediately is gone

Test it if you can measure it. If you cannot, at least make sure the window you offer is stated everywhere identically.

## Common mistakes to avoid

- **Policy only in the footer.** The question is asked on the product page.
- **Legal language nobody parses.** Write the plain summary first.
- **Silent exclusions.** They become disputes and chargebacks.
- **A returns process that requires a phone call.** It reads as deliberate friction.
- **Different terms on different pages.** Publish once, reference everywhere.

## Frequently asked questions

### How long should a return window be?

Long enough to remove hesitation - commonly 7 to 30 days from delivery depending on category. What matters more than the number is that it is stated consistently everywhere and honoured without argument.

### Should I offer free returns?

Free returns on faults are expected and often required. For change-of-mind returns, decide based on margin and category, and state the position clearly on the product page rather than at the return request.

### Where should the return policy appear?

Summarised on the product page above the add-to-cart action, repeated at checkout, included in the order confirmation, and in full on its own page. The footer link alone is not enough.

### How do I reduce returns without making them harder?

Fix the mismatch: accurate dimensions, honest fit guidance, true-colour images, compatibility lists, customer photos, and a pre-purchase question route. Track return reasons monthly and fix the page that caused each one.

## Next steps

Rewrite your policy as five plain answers, put a one-line summary above the add-to-cart button on your best-selling product, and check your last twenty return reasons for the pages that caused them.

[Start free](/signup) and publish the summary as a [FAQ accordion](/tools/faq) where buyers actually look.`,
  },
  {
    title: "How to Reduce RTO and COD Losses",
    slug: "reduce-rto-and-cod-losses",
    excerpt:
      "Return-to-origin quietly eats margin on cash-on-delivery orders. Practical steps at checkout, confirmation, and dispatch that cut failed deliveries.",
    coverImage: "/blog-covers/reduce-rto-and-cod-losses.webp",
    publishedAt: "2026-07-10T05:30:00.000Z",
    art: {
      eyebrow: "Ecommerce",
      coverHeadline: "The order that costs you twice",
      motif: "cart",
      figure: {
        kind: "funnel",
        title: "Where RTO is created",
        items: [
          "Address captured badly",
          "Order never confirmed",
          "Buyer unreachable at delivery",
          "Buyer changed their mind in transit",
          "Parcel returns, both legs paid",
        ],
        caption:
          "Almost every fix sits before dispatch, not after the failed delivery.",
      },
    },
    body: `Return to origin is the quietest margin problem in Indian ecommerce. The order is placed, the parcel ships, the delivery fails, and the parcel comes back. You paid forward shipping, return shipping, packaging, and handling, and you sold nothing.

On cash-on-delivery orders the rate is materially higher, because the buyer has committed nothing at the point of purchase.

Almost every fix is upstream of dispatch.

## Step 1: Measure it properly

Before changing anything, separate the causes. Ask your courier for reason codes and group them:

- **Address incorrect or incomplete** - a data capture problem
- **Customer not available** - a scheduling problem
- **Customer refused** - an expectation or intent problem
- **Customer unreachable** - a contact data problem
- **Out of delivery area** - a serviceability problem

Then split by payment method, price band, category, city, and courier. The remedy for a bad-address problem is nothing like the remedy for a refusal problem, and an aggregate RTO percentage tells you which to fix.

![Funnel diagram showing where return-to-origin losses are created](/blog-figures/reduce-rto-and-cod-losses.webp)

## Step 2: Capture the address properly

A large share of failures are created in thirty seconds at checkout:

- **Auto-fill city and state from the PIN code**, and validate the PIN against your serviceable list
- **Ask for a landmark** as an optional field - it is how delivery actually works in much of India
- **Require a mobile number** and validate its length and format
- **Offer address type** - home or office - which changes the delivery window
- **Do not silently truncate** long address lines
- **Confirm serviceability before payment**, not after

Our [mobile checkout checklist](/blog/mobile-checkout-ux-checklist) covers the field-level detail.

## Step 3: Confirm the order actively

An unconfirmed COD order is a guess. Confirm it before dispatch:

- Send an immediate confirmation on the channel the customer used
- For COD above a threshold, ask for an explicit confirmation - a reply, a link click, or a [WhatsApp](/tools/whatsapp) confirmation
- Restate the total amount payable, including any COD fee
- Restate the delivery window
- Give an easy cancellation route before dispatch

A cancellation before dispatch costs you nothing. A refusal at the door costs you both legs.

## Step 4: Reduce the reasons to refuse

Refusals usually mean the customer's expectation was not met:

- **Delivery took longer than promised.** Under-promise the date, and update proactively if it slips.
- **They ordered the same thing elsewhere.** Faster, clearer delivery dates reduce this.
- **The amount was a surprise.** Show COD fees and the exact payable total up front.
- **They forgot they ordered.** Send a dispatch notice and a day-before reminder.
- **Buyer's remorse.** Long gaps between order and delivery increase this; so does urgency marketing that pushed a decision.

Honest delivery dates are the highest-return fix here. See [reducing cart abandonment](/blog/reduce-cart-abandonment-without-discounts) for the related work at checkout.

## Step 5: Make prepaid the easier path

Do not remove COD if your customers rely on it. Make prepaid more attractive instead:

- A small prepaid discount or free delivery on prepaid
- UPI as the first, most prominent option
- A COD fee that reflects its real cost, disclosed clearly
- Prepaid-only for high-value orders, or for repeat-RTO addresses
- Loyalty benefits on prepaid orders

Measure the shift in mix and the change in RTO together. A prepaid discount that costs less than your average RTO is a straightforward win.

## Step 6: Use your own order history

Your data already flags risk:

- Addresses with previous failed deliveries
- Customers with a history of refusals
- Pin codes with consistently poor delivery performance
- High-value first orders from new customers

For flagged orders, confirm actively before dispatch, or require prepayment. Be careful and consistent about the rules - and keep them internal, not stated as an accusation to the customer.

## Step 7: Fix the dispatch and delivery loop

- Choose couriers by measured performance per region, not by headline rate
- Send tracking that actually works, with a route to reschedule
- Make sure the customer's phone number reaches the delivery agent
- Attempt redelivery before returning, and tell the customer it is coming
- Reconcile courier RTO claims against your own records monthly - billing errors here are common

## Common mistakes to avoid

- **Treating RTO as a courier problem.** Most of it is created at checkout.
- **Removing COD abruptly.** In many categories it removes the customers too.
- **No confirmation step on high-value COD.**
- **Optimistic delivery dates.** They convert better and refuse more.
- **Never reading reason codes.** Without them you are guessing at the fix.

## Frequently asked questions

### What causes high RTO rates?

Bad address capture, unconfirmed cash-on-delivery orders, delivery dates that slip past what was promised, unreachable customers, and buyer's remorse during long transit times. Courier performance matters, but most causes are upstream.

### How do I reduce COD returns without removing COD?

Confirm high-value COD orders actively before dispatch, disclose the exact payable amount including any fee, make prepaid slightly more attractive, and flag addresses with previous failed deliveries for confirmation.

### Should I charge a COD fee?

A modest, clearly disclosed fee reflects a real cost and nudges some customers to prepay. Hiding it until the doorstep causes refusals, which is exactly what you are trying to avoid.

### How do I capture better delivery addresses?

Auto-fill city and state from the PIN code, validate serviceability before payment, ask for a landmark, require a validated mobile number, and never truncate long address lines.

## Next steps

Pull last month's RTO reason codes, split them by payment method and city, and fix the largest single cause first. If it is address quality, that is a checkout change you can ship this week.

[Start free](/signup) and add a [WhatsApp confirmation route](/tools/whatsapp) for high-value COD orders.`,
  },
  {
    title: "Building an Abandoned Cart Email Sequence",
    slug: "abandoned-cart-email-sequence",
    excerpt:
      "What to send, when to send it, and what to say. A three-message recovery sequence that leads with help rather than discounts, plus the consent rules that apply.",
    coverImage: "/blog-covers/abandoned-cart-email-sequence.webp",
    publishedAt: "2026-07-11T05:30:00.000Z",
    art: {
      eyebrow: "Ecommerce",
      coverHeadline: "Help first, discount last",
      motif: "funnel",
      figure: {
        kind: "flow",
        title: "A three-message sequence",
        items: [
          "1 hour: the cart, no pressure",
          "24 hours: answer the objection",
          "72 hours: a reason to decide",
          "Then stop",
        ],
        caption:
          "Three messages recover most of what is recoverable. The fourth annoys.",
      },
    },
    body: `Cart recovery is one of the few marketing programmes with an obvious audience: people who chose a product, entered their details, and stopped. They are not strangers.

Most sequences waste that by opening with a discount, which trains customers to abandon on purpose and gives away margin to people who would have returned anyway.

## Fix the structural problems first

Before building a sequence, remember that recovery is treating a symptom. If your abandonment is caused by a late shipping charge or a broken payment retry, an email will not fix it - see [reducing cart abandonment without discounts](/blog/reduce-cart-abandonment-without-discounts).

Recovery is worth doing once the checkout itself is sound.

## Get consent right

You need a lawful basis to email someone who did not complete a purchase:

- Capture the email address early in checkout, and be clear it will be used to contact them about the order
- Keep transactional recovery separate from marketing consent
- Include an unsubscribe route in every message
- Do not add abandoners to your general marketing list without explicit consent
- Keep a record of when and how consent was given

Our [privacy compliance guide](/blog/website-privacy-compliance-india) covers the wider obligations.

![Flow diagram showing a three-message cart recovery sequence](/blog-figures/abandoned-cart-email-sequence.webp)

## Message 1: about one hour later

Purpose: remove friction, assume nothing went wrong.

- Subject line that states the fact: "Your cart is saved"
- Show the items with images, variant, and price
- One button that returns them to the exact cart, not the homepage
- Restate delivery cost and estimated date
- One line of reassurance: return window, or a support route
- No discount, no urgency, no pressure

A large share of recoveries come from this message alone, because most abandonment is interruption, not rejection.

## Message 2: about 24 hours later

Purpose: answer the objection that stopped them.

- Lead with the most common reason people hesitate on that product
- Sizing or compatibility guidance, if that is your category
- Delivery detail, if that is your usual objection
- A relevant review from a customer with the same use case
- An offer to answer one question on [WhatsApp](/tools/whatsapp) or by reply

Personalise by cart contents where you can. A message about fit for a clothing cart and about compatibility for an electronics cart will outperform one generic message for both.

## Message 3: about 72 hours later

Purpose: give a reason to decide now, honestly.

Only at this point consider an incentive, and only if margin supports it:

- A genuine, time-limited offer with real terms
- Or free delivery, which often outperforms a percentage discount
- Or simply a stock note, if the item is genuinely low
- Never a countdown that restarts, and never invented scarcity - see [honest urgency](/blog/countdown-timers-honest-urgency)

Then stop. A fourth and fifth message recover very little and generate unsubscribes and spam complaints that cost you the rest of the list.

## Write for the phone

- Subject line under about 45 characters, so it is not truncated
- Preview text that adds information rather than repeating the subject
- Single-column layout
- One primary button, large enough for a thumb
- Alt text on every image, since many clients block images by default
- Plain-text fallback that still contains the cart link

## Segment where it matters

Not every abandoner deserves the same sequence:

- **First-time versus returning customers** - returning buyers rarely need reassurance, only a reminder
- **Cart value** - a high-value cart may justify a personal message or a call
- **Stage reached** - someone who reached payment and failed needs a different message from someone who left at the cart
- **Payment failure** - this is not abandonment. Say what happened and offer a retry with another method

Payment-failure recovery is often the highest-return segment and the most commonly missed.

## Measure honestly

- Open, click, and recovery rate per message
- Revenue recovered, net of any discount given
- Unsubscribe and complaint rate, which caps how aggressive you can be
- Incremental recovery: hold back a small control group that receives nothing, and compare

Without a holdout you will credit the sequence for customers who were always coming back. That is the number most cart-recovery reporting gets wrong.

## Add a non-email route

Not everyone gives an email address, and not everyone reads it:

- An on-site reminder when they return, showing the saved cart
- A [WhatsApp](/tools/whatsapp) follow-up where you have consent
- A browser notification, only with explicit permission

Keep the total number of contacts across all channels within the same limit. Three messages means three, not three per channel.

## Common mistakes to avoid

- **Opening with a discount.** It trains deliberate abandonment.
- **Linking to the homepage.** The cart must be one tap away.
- **Six-message sequences.** They generate complaints, not revenue.
- **Treating payment failure as abandonment.** It needs a different message.
- **No holdout group.** You will overstate the programme's value.

## Frequently asked questions

### When should the first abandoned cart email be sent?

About an hour after abandonment, while the intent is still warm and the decision is fresh. Sending within minutes can feel intrusive; waiting a day loses the easiest recoveries.

### How many abandoned cart emails should I send?

Three. A reminder, an objection-handling message, and a final one with a reason to decide. Beyond three, recovery drops sharply and unsubscribes rise.

### Should abandoned cart emails include a discount?

Not in the first message. Lead with the cart and the delivery promise, then answer the likely objection. Reserve any incentive for the final message, and only if your margin supports it.

### Do I need consent to send cart recovery emails?

You need a lawful basis. Capture the address in checkout with a clear statement of how it will be used, keep recovery separate from general marketing consent, and include an unsubscribe route in every message.

## Next steps

Build the three-message sequence with a holdout group so you can measure real incremental revenue, and separate payment-failure recovery into its own message.

[Start free](/signup) and make sure the cart link goes straight back to the cart.`,
  },
  {
    title: "The Post-Purchase Experience Checklist",
    slug: "post-purchase-experience-checklist",
    excerpt:
      "The period between payment and delivery decides repeat purchases and support volume. What to send, when, and how to handle delays without losing the customer.",
    coverImage: "/blog-covers/post-purchase-experience-checklist.webp",
    publishedAt: "2026-07-17T05:30:00.000Z",
    art: {
      eyebrow: "Ecommerce",
      coverHeadline: "The order is not the end of the sale",
      motif: "grid",
      figure: {
        kind: "flow",
        title: "The messages that matter",
        items: [
          "Order confirmed, immediately",
          "Dispatched, with real tracking",
          "Out for delivery",
          "Delivered, then asked",
        ],
        caption:
          "Silence between payment and delivery is where support tickets are created.",
      },
    },
    body: `Most stores optimise everything up to the payment button and nothing after it. Yet the period between payment and delivery generates the majority of support contacts, most negative reviews, and every decision about whether the customer buys again.

It is also the cheapest part of the experience to improve, because it is mostly communication.

## The four messages that must exist

### 1. Order confirmation - immediately

Sent within seconds, on the channel the customer used:

- Order number, prominent
- Items, variants, quantities, and the total paid
- Delivery address as entered, so mistakes are caught while they can still be fixed
- Estimated delivery date, not a vague range
- A tracking route that does not require an account
- A support route and the return window

A confirmation that arrives an hour later has already generated a "did my order go through" message.

### 2. Dispatch notice - when it actually ships

- Confirmation that it is on its way
- A tracking link that works when sent, not one that shows nothing for a day
- The courier name
- Updated delivery estimate
- What to do if nobody is home

### 3. Out for delivery - on the day

- A same-day heads-up so someone is available
- The payable amount for cash on delivery, restated
- A reschedule route
- The delivery agent's contact route where the courier provides one

This single message materially reduces failed deliveries - see [reducing RTO and COD losses](/blog/reduce-rto-and-cod-losses).

### 4. Delivered - then ask

- Confirmation it was delivered
- How to start a return, plainly
- Care or setup instructions where relevant
- A review request, timed after they have actually used the product

![Flow diagram showing the four post-purchase messages](/blog-figures/post-purchase-experience-checklist.webp)

## Handle delays before the customer notices

Delays are inevitable. Silence is what turns them into complaints.

- Notify proactively as soon as you know, not when the promised date passes
- Say what happened in one honest line
- Give a new date you are confident about
- Offer a choice: wait, cancel, or swap
- Do not send a cheerful marketing email to someone whose order is late

A customer told about a delay before they noticed usually stays. One who discovers it themselves usually does not.

## Make tracking actually work

- Every order page reachable without a login
- Status in customer language: "Packed", "With courier", "Out for delivery" - not internal codes
- A visible last-updated timestamp
- A support route on the same page
- No dead-end "no information available" states without an explanation

## Time the review request correctly

- After the product has been used, not on delivery day - a few days for consumables, longer for durables
- One request, one reminder at most
- Make it one tap, with the product pre-selected
- Never incentivise a positive review; ask for an honest one
- Route unhappy responses to support before they become public

See [how to get more Google reviews](/blog/how-to-get-more-google-reviews) and our guide to [collecting product reviews](/blog/product-reviews-social-proof-placement-collection).

## Set up the returns path properly

The return experience is the strongest predictor of whether someone orders again:

- One obvious route to start a return, linked from the delivery message
- Acknowledgement within one working day
- Status updates while it is in transit
- Refund on receipt and check, not at month end

Our [return policy guide](/blog/return-policy-that-builds-trust) covers the terms themselves.

## Then, and only then, market

Once the order has arrived and the return window has passed:

- A genuinely relevant accessory or refill suggestion
- A replenishment reminder timed to consumption
- An invitation to a loyalty programme
- Content that helps them use what they bought

Marketing sent while an order is late or a return is unresolved is the fastest way to an unsubscribe.

## Measure the right things

- Support contacts per hundred orders, by topic
- "Where is my order" contacts as a share of the total - this is the metric that reveals communication gaps
- On-time delivery against the date you promised, not the courier's
- Review submission rate
- Repeat purchase rate within 90 days

## Common mistakes to avoid

- **No dispatch notice.** The customer assumes nothing happened.
- **Tracking links that show nothing for a day.** Worse than no link.
- **Reacting to delays instead of announcing them.**
- **Review requests on delivery day.** They have not used it yet.
- **Marketing to a customer with an open complaint.**

## Frequently asked questions

### What emails should be sent after an order?

Four: immediate confirmation, dispatch with working tracking, out-for-delivery on the day, and delivered with return instructions and a later review request.

### How do I reduce "where is my order" support contacts?

Send proactive dispatch and out-for-delivery messages, provide tracking that works without a login and uses plain status language, and announce delays before the promised date passes.

### When should I ask for a review?

After the customer has actually used the product - a few days for consumables, a week or more for durables. One request and at most one reminder.

### What should I do when an order is delayed?

Tell the customer as soon as you know, explain briefly, give a new date you are confident about, and offer the choice to wait, cancel, or swap. Do not wait for them to ask.

## Next steps

Place a test order through your own store and record every message you receive and when. The gaps in that timeline are your support volume.

[Start free](/signup) and publish your delivery and returns answers where buyers ask them.`,
  },
  {
    title: "A Customer Retention and Repeat Purchase Playbook",
    slug: "customer-retention-repeat-purchase-playbook",
    excerpt:
      "Acquiring a customer is the expensive part. How to measure repeat rate properly, find the repurchase window, and build the few programmes that actually work.",
    coverImage: "/blog-covers/customer-retention-repeat-purchase-playbook.webp",
    publishedAt: "2026-07-18T05:30:00.000Z",
    art: {
      eyebrow: "Growth",
      coverHeadline: "The second order is where profit starts",
      motif: "funnel",
      figure: {
        kind: "stack",
        title: "Retention work, in order of return",
        items: [
          "Deliver what you promised",
          "Fix the second-order gap",
          "Time replenishment correctly",
          "Reward behaviour, not signup",
          "Win back before they are cold",
        ],
        caption:
          "Most retention problems are fulfilment problems wearing a marketing costume.",
      },
    },
    body: `Retention gets discussed as a loyalty programme. It is usually a fulfilment question first: customers come back to businesses that delivered what they promised, and no points scheme rescues one that did not.

Once the basics hold, a small number of programmes reliably increase repeat purchases. This is the order to work in.

## Step 1: Measure repeat rate properly

Most retention reporting is wrong because it mixes cohorts. Measure by acquisition cohort:

- Take all customers who first purchased in a given month
- Track what share purchased again within 30, 60, 90, and 180 days
- Compare cohorts against each other, not against a moving site-wide average

Then find your **repurchase window** - the typical gap between first and second order. That number drives the timing of everything else. For a consumable it may be five weeks; for a durable it may be a year.

Also separate:

- Repeat rate - the share who buy again
- Purchase frequency - how often repeat buyers order
- Average order value on repeat orders, which is usually higher

## Step 2: Fix the second-order gap first

The largest drop in any customer lifecycle is between the first and second order. Before adding programmes, find out why yours are not returning:

- Did the first order arrive on time and intact?
- Was the product what the page described?
- Was a support issue resolved?
- Do they know what else you sell?
- Is reordering easy, or does it require re-entering everything?

Ask thirty first-time customers who did not return. Their answers will be more useful than any benchmark.

![Priority stack showing retention work in order of return](/blog-figures/customer-retention-repeat-purchase-playbook.webp)

## Step 3: Get the post-purchase experience right

Retention starts before the first delivery:

- Proactive dispatch and delivery messages
- Honest handling of delays
- An easy return path
- A review request timed after real use

Our [post-purchase checklist](/blog/post-purchase-experience-checklist) covers the sequence, and it is the single highest-return retention work for most stores.

## Step 4: Time replenishment to consumption

For consumables, the highest-return programme is a reminder that arrives when the product is running out:

- Estimate consumption from pack size and typical usage
- Send the reminder slightly before it runs out, not after
- Make reordering one tap, with the previous variant pre-selected
- Offer a subscription only once the manual repeat is working

Do not send the same reminder to everyone at the same interval. A customer who bought a three-month supply and receives a reminder at four weeks learns to ignore your messages.

## Step 5: Reward behaviour, not signup

Most loyalty programmes reward registration and then stop mattering:

- Reward the behaviour you want repeated - a second order, a larger basket, a referral
- Keep the value obvious and immediate; complex points systems are ignored
- Show progress toward the next reward on the account and in emails
- Make redemption easy and honour it without conditions the customer did not see
- Consider free delivery as the benefit - it is often more motivating than a discount

A programme nobody can explain in one sentence will not change behaviour.

## Step 6: Win back before they go cold

Define lapsed relative to your repurchase window, not by a generic 90 days:

- If your window is five weeks, someone at ten weeks is lapsing
- Reach out before they are months gone
- Lead with what is new or relevant, not a discount
- Ask a question - "did the last order work out?" - which sometimes surfaces an unresolved problem
- Stop after two attempts and stop emailing people who never engage

## Step 7: Make repeat ordering effortless

Friction removal beats incentives:

- Saved addresses and payment methods, with guest-friendly reorder
- An order history with a one-tap reorder
- A clear route to ask a question - [WhatsApp](/tools/whatsapp) works well for repeat customers
- Fast-loading account pages; nobody logs in twice to buy toothpaste

## Step 8: Use segmentation you will actually maintain

Three segments beat twelve:

- **New** - first order, in the first repurchase window
- **Active** - purchased within the window
- **Lapsing** - past the window, not yet cold

Each gets different messaging. That is enough for most small businesses, and it survives contact with a busy week.

## Common mistakes to avoid

- **Launching loyalty before fixing fulfilment.** Points do not fix a late delivery.
- **One reminder interval for every product.** Timing must match consumption.
- **Discounting to repeat customers by default.** You are paying for orders you would have received.
- **Measuring repeat rate site-wide.** Cohorts, or the number is meaningless.
- **Win-back campaigns sent months too late.**

## Frequently asked questions

### What is a good repeat purchase rate?

It varies enormously by category - consumables run far higher than durables. Compare your own cohorts over time rather than to an industry figure, and focus on the first-to-second-order conversion.

### How do I increase repeat purchases?

Deliver reliably, communicate through fulfilment, time replenishment reminders to actual consumption, make reordering effortless, and reach out before customers go cold rather than after.

### Are loyalty programmes worth it for a small store?

Only after fulfilment and post-purchase communication are solid, and only if the value is simple enough to explain in one sentence. Reward repeat behaviour rather than signup.

### When is a customer considered lapsed?

Relative to your own repurchase window. If most repeat orders come at five weeks, someone at ten weeks is lapsing - waiting for a generic 90-day threshold means contacting them long after they moved on.

## Next steps

Calculate your first-to-second-order rate by cohort and find your repurchase window. Then fix the post-purchase experience before building any programme on top of it.

[Start free](/signup) and make it easy for returning customers to reach a human.`,
  },
  {
    title: "A Customer Support Playbook for Small Stores",
    slug: "customer-support-playbook-for-small-stores",
    excerpt:
      "Which channels to run, what to promise, how to write replies that end the conversation, and how to turn repeat questions into pages that prevent them.",
    coverImage: "/blog-covers/customer-support-playbook-for-small-stores.webp",
    publishedAt: "2026-07-24T05:30:00.000Z",
    art: {
      eyebrow: "Operations",
      coverHeadline: "Fewer channels, kept properly",
      motif: "chat",
      figure: {
        kind: "checklist",
        title: "Support that scales without hiring",
        items: [
          "Two channels, staffed and stated",
          "Published response times you meet",
          "Top ten answers written once",
          "Every repeat question becomes a page",
          "One owner for the queue",
        ],
        caption:
          "An unanswered channel is worse than a channel you never offered.",
      },
    },
    body: `Small stores tend to offer every support channel and staff none of them properly: an email address nobody owns, a chat widget answered twice a week, a phone number that rings out, and a social inbox where the real questions arrive.

Two channels, genuinely staffed, beat five that are nominally available.

## Step 1: Choose the channels you can actually staff

Pick based on your customers and your capacity:

- **WhatsApp or chat** - fast, informal, and the default in many markets. Best for pre-purchase questions.
- **Email or a form** - for anything needing a record, attachments, or a considered answer.
- **Phone** - high value per contact, but expensive to staff. Worth it for high-consideration or urgent categories.
- **Social messages** - do not ignore them, but route them into the same queue rather than treating them separately.

Then publish the channels you offer and the hours they are staffed, using a [Business Hours widget](/tools/hours). An advertised channel nobody answers costs more trust than not offering it.

## Step 2: Promise a response time you will meet

- State it on the contact page and on the form itself
- Under-promise: "within one working day" you always meet beats "within an hour" you sometimes do
- Say what happens outside hours, and give a route that works overnight
- Acknowledge immediately and automatically, but do not pretend the acknowledgement is a person

Speed matters more than polish, particularly before a purchase - see [speed to lead](/blog/lead-response-time-speed-to-lead).

![Checklist panel listing what small-store support needs to work](/blog-figures/customer-support-playbook-for-small-stores.webp)

## Step 3: Give the queue one owner

Most support failures are ownership failures:

- One named person owns the queue each day, including weekends if you are open
- Every conversation has an owner from the moment it arrives
- A defined escalation route when the owner is unavailable
- A daily check that nothing is older than your promised response time

A shared inbox with no owner is where messages go to be forgotten.

## Step 4: Write the top ten answers once

List the questions you answer most, then write the best version of each answer:

- Where is my order
- How long does delivery take to my area
- What is your return policy
- Is this item genuine and does it have a warranty
- Will this fit or work with mine
- How do I cancel or change an order
- Do you offer cash on delivery
- What are the charges
- How do I get an invoice
- Do you have this in another size or colour

Store them as templates, but always personalise the first line. A visibly canned reply to a specific question reads as dismissal.

## Step 5: Turn repeat questions into pages

Every question you answer more than a few times a week is a missing line on your site:

- Delivery questions → a delivery information section on the product page
- Fit questions → a size guide and honest description, see [writing product descriptions](/blog/how-to-write-product-descriptions-that-sell)
- Return questions → a summary above the add-to-cart button
- General repeats → a [FAQ accordion](/tools/faq) on the relevant page

This is the only support strategy that reduces volume rather than absorbing it. Track your top contact reasons monthly and fix the page that caused each one.

## Step 6: Write replies that end the conversation

- **Answer first**, context second
- **Be specific** - dates, amounts, and next steps, not "shortly"
- **Say what you will do**, and by when
- **Answer the question they will ask next**, pre-emptively
- **Skip the apology paragraph** in favour of the fix
- **One message, complete**, rather than three partial ones

A reply that requires a follow-up question has doubled your workload and halved their patience.

## Step 7: Handle complaints without escalating them

- Acknowledge the specific problem, not "any inconvenience caused"
- Do not argue about policy before establishing the facts
- Offer a concrete remedy and a timeline
- Move public complaints to a private channel, then return publicly to confirm resolution
- Record the root cause - most complaints are process failures, not customer failures

## Step 8: Measure what points at fixes

- Contacts per hundred orders, which is the real workload number
- Contacts by reason, so you know which page to fix
- First response time and resolution time
- Reopen rate, which reveals incomplete answers
- The share of contacts that are "where is my order" - usually a communication gap, see the [post-purchase checklist](/blog/post-purchase-experience-checklist)

## Common mistakes to avoid

- **Offering channels you cannot staff.** Silence is worse than absence.
- **No published hours.** Chat implies instant.
- **Answering the same question forever.** Fix the page instead.
- **Canned replies with no personalisation.** They read as dismissal.
- **No owner on the queue.** Messages age quietly.

## Frequently asked questions

### Which support channels should a small store offer?

Two you can genuinely staff - usually a chat or WhatsApp route for quick pre-purchase questions and email or a form for anything needing a record. Publish the hours for each.

### What is a reasonable response time to promise?

Whatever you can meet consistently. "Within one working day", always honoured, builds more trust than "within an hour" that sometimes takes six.

### How do I reduce support volume?

Turn every repeat question into content on the page where it is asked: delivery information on product pages, a return summary above the add-to-cart button, and an FAQ for the rest.

### Should I use canned responses?

Yes, as a base for accuracy and speed, but always personalise the opening line and confirm the specifics. A visibly generic reply to a specific question damages the interaction.

## Next steps

List your top ten contact reasons from last month, write the best answer to each, and publish the three most common as content on the pages where they are asked.

[Start free](/signup) and put a [WhatsApp route](/tools/whatsapp) with honest hours on your product pages.`,
  },
  {
    title: "How to Get More Google Reviews",
    slug: "how-to-get-more-google-reviews",
    excerpt:
      "Reviews decide local choices. How to ask consistently without breaking platform rules, make leaving one effortless, and respond in a way future customers read.",
    coverImage: "/blog-covers/how-to-get-more-google-reviews.webp",
    publishedAt: "2026-07-25T05:30:00.000Z",
    art: {
      eyebrow: "SEO",
      coverHeadline: "Ask everyone, incentivise no one",
      motif: "stars",
      figure: {
        kind: "flow",
        title: "A review programme that lasts",
        items: [
          "Pick the moment of satisfaction",
          "Ask with a one-tap link",
          "Respond to every review",
          "Fix what the reviews reveal",
        ],
        caption:
          "Steady asking beats campaigns. A burst of reviews looks manipulated.",
      },
    },
    body: `For a local business, reviews are usually the deciding factor between two options a customer has never used. Count, recency, rating, and your responses all feed into local visibility, and all four are things you influence.

The one thing you must not do is pay for them.

## Step 1: Know the rules before you start

Most review platforms prohibit, and can penalise:

- Offering discounts, entries, or gifts in exchange for reviews
- Asking only your happy customers - selective solicitation
- Writing reviews for customers, or asking staff and family to
- Buying reviews from any service
- Setting up a device in-store that filters out negative feedback before it reaches the platform

These are detectable, and the consequences range from removed reviews to a suspended profile. They also fail on their own terms: a wall of implausible five-star reviews reads as fake.

Ask everyone, ask honestly, and accept what you get.

## Step 2: Choose the moment

Ask when the value is fresh and obvious:

- Immediately after a service is completed and the customer is visibly happy
- At handover or collection
- A few days after delivery, once the product has been used
- After a support issue is resolved well - these often produce the most persuasive reviews
- At a renewal or repeat purchase

Do not ask while an issue is open, and never ask twice.

![Flow diagram showing a sustainable review programme](/blog-figures/how-to-get-more-google-reviews.webp)

## Step 3: Make it one tap

Every extra step loses a large share of willing reviewers:

- Use your profile's short review link, not "search for us and scroll down"
- Put a QR code at the counter, on the invoice, and on the delivery note
- Send the link by the channel the customer already uses - WhatsApp or SMS beat email in many markets
- On mobile, the link should open the review form directly

Test the whole journey on a phone that is not signed into your own account.

## Step 4: Ask like a person

- Keep it to two sentences
- Say why it helps: it helps other people find you
- Do not script the content or suggest what to write
- Do not mention stars or ask for a "5-star review" - that is soliciting a rating, not a review
- Make it clear it is optional

"If you have a minute, a short Google review really helps other people find us. Here's the link." is enough.

## Step 5: Respond to every review

Responses are read by future customers far more than by the reviewer:

- Reply within a few days
- Keep it short and specific - reference what they actually mentioned
- Thank positive reviewers without gushing
- For negative reviews: acknowledge the specific issue, say what you are doing, and offer to continue privately
- Never argue, never blame the customer, and never disclose their details
- Do not use identical copy-pasted replies on every review

A calm, specific response to a critical review persuades more readers than several five-star ratings.

## Step 6: Use what reviews tell you

Reviews are free product and operations research:

- Group them by theme - delivery, quality, staff, value, communication
- Track themes over time; a new complaint appearing repeatedly is a process change gone wrong
- Feed positive phrasing back into your product pages
- Feed recurring questions into your [FAQ accordion](/tools/faq)

## Step 7: Show reviews on your own site too

Your profile serves search; your website serves the visitor already there:

- Display genuine reviews with the [Reviews widget](/tools/reviews)
- Show the count and the average, not just the average
- Place reviews beside the claims they support - see [social proof types and placement](/blog/social-proof-types-and-placement)
- Never edit a review's meaning, and never publish one you did not receive

Our guide to [collecting and placing product reviews](/blog/product-reviews-social-proof-placement-collection) covers the on-site side, and [local SEO](/blog/local-seo-checklist-for-india) covers how reviews feed local ranking.

## Step 8: Make it a habit, not a campaign

A sudden burst of reviews looks manipulated and can be filtered:

- Build the ask into the normal end of a transaction
- Give staff a simple, consistent script and the QR code
- Track how many are asked versus how many are received
- Aim for a steady trickle rather than monthly pushes

## Common mistakes to avoid

- **Incentivising reviews.** Against policy, detectable, and it corrupts the signal.
- **Asking only happy customers.** Selective solicitation is prohibited on most platforms.
- **A review link that requires searching.** Most people give up.
- **Ignoring negative reviews.** Silence is read as indifference.
- **Identical replies on every review.** It signals nobody is actually reading them.

## Frequently asked questions

### How do I ask customers for a Google review?

At the moment of satisfaction, with a short personal message and a one-tap review link or QR code. Do not script the content, do not ask for a specific rating, and do not offer anything in return.

### Can I offer a discount for a review?

No. Incentivising reviews violates the policies of most major platforms, can lead to removed reviews or profile suspension, and undermines the credibility of every review you have.

### Should I respond to negative reviews?

Always. Acknowledge the specific problem, say what you are doing about it, and offer to continue privately. Future customers judge you on the response far more than on the complaint.

### How many reviews do I need?

Enough that the average is stable and recent - the trend matters more than a target. Steady, ongoing reviews signal an active business; a sudden burst looks manipulated.

## Next steps

Create your short review link, print a QR code for the counter and the delivery note, and add the ask to the end of your normal handover script. Then reply to every review you already have.

[Start free](/signup) and show the genuine ones on your site with the [Reviews widget](/tools/reviews).`,
  },
];
