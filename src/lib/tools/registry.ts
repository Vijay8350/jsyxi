import type { ToolDef } from "./types";

// Day-one Tool catalog (§5, §9.2). Full 8 flagship INC-1 Tools (R2V1-05). AI Chatbot [LATER] (RW-12).

export const CATEGORIES = [
  { slug: "social-proof", name: "Social Proof", sortOrder: 1 },
  { slug: "marketing", name: "Marketing", sortOrder: 2 },
  { slug: "forms-leads", name: "Forms & Leads", sortOrder: 3 },
  { slug: "contact-chat", name: "Contact & Chat", sortOrder: 4 },
  { slug: "content", name: "Content", sortOrder: 5 },
] as const;

const TABS = {
  content: { key: "content", label: "Content" },
  layout: { key: "layout", label: "Layout" },
  style: { key: "style", label: "Style" },
  behaviour: { key: "behaviour", label: "Behaviour" },
};

export const TOOLS: ToolDef[] = [
  // 1 ── All-in-One Reviews ──────────────────────────────────────────────────
  {
    key: "reviews",
    name: "All-in-One Reviews",
    categorySlug: "social-proof",
    badges: ["Popular", "Social Proof"],
    description: "Showcase customer reviews and star ratings in a grid, carousel, or list.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "What our customers say" },
        {
          key: "reviews", label: "Reviews", type: "list", group: "content", addLabel: "Add review",
          default: [
            { author: "Aarti S.", rating: 5, text: "Absolutely love it — setup took two minutes.", date: "2 weeks ago" },
            { author: "Rahul M.", rating: 5, text: "Great support and it just works on our store.", date: "1 month ago" },
            { author: "Priya K.", rating: 4, text: "Clean design and easy to customize.", date: "1 month ago" },
          ],
          itemFields: [
            { key: "author", label: "Author", type: "text", group: "content", default: "" },
            { key: "rating", label: "Rating", type: "number", group: "content", default: 5, min: 1, max: 5 },
            { key: "text", label: "Review", type: "textarea", group: "content", default: "" },
            { key: "date", label: "Date label", type: "text", group: "content", default: "" },
            { key: "avatar", label: "Avatar", type: "image", group: "content", default: "" },
          ],
        },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "grid",
          options: [{ value: "grid", label: "Grid" }, { value: "carousel", label: "Carousel" }, { value: "list", label: "List" }] },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 3, min: 1, max: 4 },
        { key: "accentColor", label: "Star colour", type: "color", group: "style", default: "#f59e0b" },
        { key: "cardBackground", label: "Card background", type: "color", group: "style", default: "#ffffff" },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
        { key: "showHeading", label: "Show heading", type: "toggle", group: "behaviour", default: true },
        { key: "showRating", label: "Show star ratings", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Product Reviews Grid", useCase: "Store product page", industry: "E-commerce", preset: { layout: "grid", columns: 3 } },
      { name: "Service Testimonials", useCase: "Agency landing page", industry: "Services", preset: { layout: "carousel", columns: 1, heading: "Trusted by teams like yours" } },
    ],
  },

  // 2 ── WhatsApp Chat (non-AI) ──────────────────────────────────────────────
  {
    key: "whatsapp",
    name: "WhatsApp Chat",
    categorySlug: "contact-chat",
    badges: ["Popular", "No-code"],
    description: "A floating WhatsApp button that opens a chat with a pre-filled message.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "phone", label: "WhatsApp number (with country code)", type: "tel", group: "content", default: "", placeholder: "919876543210" },
        { key: "greeting", label: "Header title", type: "text", group: "content", default: "Chat with us" },
        { key: "agentName", label: "Agent name", type: "text", group: "content", default: "Support Team" },
        { key: "agentTitle", label: "Agent subtitle", type: "text", group: "content", default: "Typically replies within an hour" },
        { key: "prefilledMessage", label: "Pre-filled message", type: "textarea", group: "content", default: "Hi! I have a question about your products." },
        { key: "avatar", label: "Agent avatar", type: "image", group: "content", default: "" },
        { key: "position", label: "Position", type: "select", group: "layout", default: "bottom-right",
          options: [{ value: "bottom-right", label: "Bottom right" }, { value: "bottom-left", label: "Bottom left" }] },
        { key: "buttonColor", label: "Button colour", type: "color", group: "style", default: "#25D366" },
        { key: "buttonLabel", label: "Button label", type: "text", group: "style", default: "Chat on WhatsApp" },
        { key: "showOnMobile", label: "Show on mobile", type: "toggle", group: "behaviour", default: true },
        { key: "delaySeconds", label: "Show after (seconds)", type: "number", group: "behaviour", default: 0, min: 0, max: 60 },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Store Support", useCase: "Customer support", industry: "E-commerce", preset: { greeting: "Need help with your order?" } },
      { name: "Sales Enquiry", useCase: "Lead capture", industry: "Services", preset: { greeting: "Talk to sales", prefilledMessage: "Hi! I'd like a quote." } },
    ],
  },

  // 3 ── Form Builder / Lead-gen Forms ───────────────────────────────────────
  {
    key: "form",
    name: "Form Builder",
    categorySlug: "forms-leads",
    badges: ["Conversion"],
    description: "Collect leads with a customizable form that posts submissions to your CRM.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Get in touch" },
        { key: "description", label: "Description", type: "textarea", group: "content", default: "Fill in the form and we'll get back to you shortly." },
        {
          key: "fields", label: "Form fields", type: "list", group: "content", addLabel: "Add field",
          default: [
            { label: "Name", name: "name", type: "text", required: true, placeholder: "Your name" },
            { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
            { label: "Message", name: "message", type: "textarea", required: false, placeholder: "How can we help?" },
          ],
          itemFields: [
            { key: "label", label: "Label", type: "text", group: "content", default: "" },
            { key: "name", label: "Field name", type: "text", group: "content", default: "" },
            { key: "type", label: "Type", type: "select", group: "content", default: "text",
              options: [
                { value: "text", label: "Text" }, { value: "email", label: "Email" }, { value: "tel", label: "Phone" },
                { value: "textarea", label: "Paragraph" },
              ] },
            { key: "required", label: "Required", type: "toggle", group: "content", default: false },
            { key: "placeholder", label: "Placeholder", type: "text", group: "content", default: "" },
          ],
        },
        { key: "submitLabel", label: "Submit button", type: "text", group: "content", default: "Send message" },
        { key: "successMessage", label: "Success message", type: "textarea", group: "content", default: "Thanks! We'll be in touch soon." },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "stacked",
          options: [{ value: "stacked", label: "Stacked" }, { value: "inline", label: "Inline" }] },
        { key: "accentColor", label: "Accent colour", type: "color", group: "style", default: "#0d9488" },
        { key: "captureAsLead", label: "Save submissions as leads", type: "toggle", group: "behaviour", default: true },
        { key: "serviceTopic", label: "Route to topic", type: "text", group: "behaviour", default: "", help: "Maps to a CRM lead queue." },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Contact Form", useCase: "Contact page", industry: "General", preset: {} },
      { name: "Quote Request", useCase: "Lead generation", industry: "Services", preset: { heading: "Request a quote", serviceTopic: "quote" } },
    ],
  },

  // 4 ── Popup / Announcement Bar ────────────────────────────────────────────
  {
    key: "popup",
    name: "Popup & Announcement Bar",
    categorySlug: "marketing",
    badges: ["Conversion"],
    description: "Announce offers with a sticky bar or a timed modal popup.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "mode", label: "Style", type: "select", group: "content", default: "bar",
          options: [{ value: "bar", label: "Announcement bar" }, { value: "modal", label: "Popup modal" }] },
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Summer Sale — 20% off everything" },
        { key: "message", label: "Message", type: "textarea", group: "content", default: "Use code SUMMER20 at checkout. Limited time only." },
        { key: "ctaLabel", label: "Button label", type: "text", group: "content", default: "Shop now" },
        { key: "ctaUrl", label: "Button link", type: "url", group: "content", default: "" },
        { key: "position", label: "Bar position", type: "select", group: "layout", default: "top",
          options: [{ value: "top", label: "Top" }, { value: "bottom", label: "Bottom" }] },
        { key: "backgroundColor", label: "Background", type: "color", group: "style", default: "#111827" },
        { key: "textColor", label: "Text", type: "color", group: "style", default: "#ffffff" },
        { key: "ctaColor", label: "Button", type: "color", group: "style", default: "#f59e0b" },
        { key: "delaySeconds", label: "Show after (seconds)", type: "number", group: "behaviour", default: 2, min: 0, max: 60 },
        { key: "showOnce", label: "Show once per visitor", type: "toggle", group: "behaviour", default: true },
        { key: "dismissible", label: "Allow dismiss", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Sale Bar", useCase: "Promotions", industry: "E-commerce", preset: { mode: "bar" } },
      { name: "Newsletter Popup", useCase: "List building", industry: "General", preset: { mode: "modal", heading: "Join our newsletter", ctaLabel: "Subscribe" } },
    ],
  },

  // 5 ── Countdown Timer ─────────────────────────────────────────────────────
  {
    key: "countdown",
    name: "Countdown Timer",
    categorySlug: "marketing",
    badges: ["Popular", "Conversion"],
    description: "Create urgency with a live countdown to a deadline.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Hurry! Offer ends in" },
        { key: "endAt", label: "Ends at", type: "datetime", group: "content", default: "" },
        { key: "expiredMessage", label: "Expired message", type: "text", group: "content", default: "This offer has ended." },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "boxes",
          options: [{ value: "boxes", label: "Boxes" }, { value: "inline", label: "Inline" }] },
        { key: "showLabels", label: "Show day/hr/min labels", type: "toggle", group: "layout", default: true },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#dc2626" },
        { key: "textColor", label: "Number colour", type: "color", group: "style", default: "#111827" },
        { key: "backgroundColor", label: "Box background", type: "color", group: "style", default: "#f3f4f6" },
        { key: "hideOnExpire", label: "Hide when expired", type: "toggle", group: "behaviour", default: false },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Flash Sale", useCase: "Limited offer", industry: "E-commerce", preset: { heading: "Flash sale ends in", accentColor: "#dc2626" } },
      { name: "Launch Countdown", useCase: "Product launch", industry: "SaaS", preset: { heading: "Launching in", accentColor: "#0d9488" } },
    ],
  },

  // 6 ── Instagram Feed ──────────────────────────────────────────────────────
  {
    key: "instagram",
    name: "Instagram Feed",
    categorySlug: "social-proof",
    badges: ["New"],
    description: "Display a gallery of Instagram-style posts to build social proof.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "username", label: "Handle", type: "text", group: "content", default: "@yourbrand" },
        {
          key: "posts", label: "Posts", type: "list", group: "content", addLabel: "Add post",
          default: [
            { image: "", caption: "New arrivals ✨", link: "" },
            { image: "", caption: "Behind the scenes", link: "" },
            { image: "", caption: "Customer love ❤️", link: "" },
            { image: "", caption: "Weekend vibes", link: "" },
          ],
          itemFields: [
            { key: "image", label: "Image", type: "image", group: "content", default: "" },
            { key: "caption", label: "Caption", type: "text", group: "content", default: "" },
            { key: "link", label: "Link", type: "url", group: "content", default: "" },
          ],
        },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "grid",
          options: [{ value: "grid", label: "Grid" }, { value: "carousel", label: "Carousel" }] },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 4, min: 2, max: 6 },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
        { key: "showCaptions", label: "Show captions", type: "toggle", group: "behaviour", default: false },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Shop the Feed", useCase: "Storefront", industry: "E-commerce", preset: { columns: 4 } },
      { name: "Portfolio Grid", useCase: "Creator page", industry: "Creator", preset: { columns: 3, showCaptions: true } },
    ],
  },

  // 7 ── FAQ / Accordion ─────────────────────────────────────────────────────
  {
    key: "faq",
    name: "FAQ Accordion",
    categorySlug: "content",
    badges: ["No-code"],
    description: "Answer common questions in a clean, collapsible accordion.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Frequently asked questions" },
        {
          key: "items", label: "Questions", type: "list", group: "content", addLabel: "Add question",
          default: [
            { question: "How do I install the widget?", answer: "Copy the one-line embed snippet and paste it into your site's HTML. That's it." },
            { question: "Can I customize the design?", answer: "Yes — every colour, layout, and text field is editable in the builder with a live preview." },
            { question: "Is there a free plan?", answer: "Yes, you can start free and upgrade any time." },
          ],
          itemFields: [
            { key: "question", label: "Question", type: "text", group: "content", default: "" },
            { key: "answer", label: "Answer", type: "textarea", group: "content", default: "" },
          ],
        },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "accordion",
          options: [{ value: "accordion", label: "Accordion" }, { value: "list", label: "Open list" }] },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0ea5e9" },
        { key: "borderColor", label: "Divider colour", type: "color", group: "style", default: "#e5e7eb" },
        { key: "openFirst", label: "Open first item", type: "toggle", group: "behaviour", default: true },
        { key: "allowMultiple", label: "Allow multiple open", type: "toggle", group: "behaviour", default: false },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Support FAQ", useCase: "Help centre", industry: "General", preset: {} },
      { name: "Pricing FAQ", useCase: "Pricing page", industry: "SaaS", preset: { heading: "Pricing questions" } },
    ],
  },

  // 8 ── Google Maps / Store Locator ─────────────────────────────────────────
  {
    key: "maps",
    name: "Maps & Store Locator",
    categorySlug: "contact-chat",
    badges: ["No-code"],
    description: "Show your location(s) on an embedded map with directions.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Find us" },
        { key: "query", label: "Address or place", type: "text", group: "content", default: "India Gate, New Delhi", help: "Used to place the map pin." },
        { key: "height", label: "Map height (px)", type: "number", group: "layout", default: 360, min: 160, max: 800 },
        { key: "zoom", label: "Zoom", type: "number", group: "layout", default: 14, min: 1, max: 20 },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#16a34a" },
        { key: "showDirectionsLink", label: "Show directions link", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Single Store", useCase: "Contact page", industry: "Retail", preset: {} },
      { name: "Office Location", useCase: "About page", industry: "Services", preset: { heading: "Visit our office" } },
    ],
  },
];

export function toolByKey(key: string): ToolDef | undefined {
  return TOOLS.find((t) => t.key === key);
}
