import type { ToolDef } from "./types";

// Day-one Tool catalog (§5, §9.2). Full 8 flagship INC-1 Tools (R2V1-05). AI Chatbot [LATER] (RW-12).

export const CATEGORIES = [
  { slug: "social-proof", name: "Social Proof", sortOrder: 1 },
  { slug: "marketing", name: "Marketing", sortOrder: 2 },
  { slug: "forms-leads", name: "Forms & Leads", sortOrder: 3 },
  { slug: "contact-chat", name: "Contact & Chat", sortOrder: 4 },
  { slug: "content", name: "Content", sortOrder: 5 },
  { slug: "utility", name: "Utility", sortOrder: 6 },
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

  // 9 ── Business Hours ───────────────────────────────────────────────────────
  {
    key: "hours",
    name: "Business Hours",
    categorySlug: "contact-chat",
    badges: ["No-code"],
    description: "Show your opening hours with a live open / closed status.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Opening hours" },
        { key: "utcOffset", label: "Timezone (UTC offset)", type: "number", group: "content", default: 5.5, min: -12, max: 14, help: "e.g. 5.5 for IST — used to compute the open/closed status." },
        {
          key: "days", label: "Weekly schedule (Monday first)", type: "list", group: "content", addLabel: "Add day",
          default: [
            { label: "Monday", closed: false, from: "09:00", to: "18:00" },
            { label: "Tuesday", closed: false, from: "09:00", to: "18:00" },
            { label: "Wednesday", closed: false, from: "09:00", to: "18:00" },
            { label: "Thursday", closed: false, from: "09:00", to: "18:00" },
            { label: "Friday", closed: false, from: "09:00", to: "18:00" },
            { label: "Saturday", closed: false, from: "10:00", to: "16:00" },
            { label: "Sunday", closed: true, from: "", to: "" },
          ],
          itemFields: [
            { key: "label", label: "Day", type: "text", group: "content", default: "" },
            { key: "closed", label: "Closed", type: "toggle", group: "content", default: false },
            { key: "from", label: "Opens", type: "text", group: "content", default: "09:00", placeholder: "09:00" },
            { key: "to", label: "Closes", type: "text", group: "content", default: "18:00", placeholder: "18:00" },
          ],
        },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "table",
          options: [{ value: "table", label: "Table" }, { value: "compact", label: "Compact" }] },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
        { key: "showStatus", label: "Show open/closed badge", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Store Hours", useCase: "Retail", industry: "Retail", preset: {} },
      { name: "Clinic Hours", useCase: "Appointments", industry: "Healthcare", preset: { heading: "Clinic hours" } },
    ],
  },

  // 10 ── Animated Counter ────────────────────────────────────────────────────
  {
    key: "counter",
    name: "Animated Counter",
    categorySlug: "content",
    badges: ["Popular"],
    description: "Animated statistics that count up when they scroll into view.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "" },
        {
          key: "items", label: "Stats", type: "list", group: "content", addLabel: "Add stat",
          default: [
            { value: 12000, prefix: "", suffix: "+", label: "Happy customers", icon: "😀" },
            { value: 4500, prefix: "", suffix: "", label: "Projects delivered", icon: "🚀" },
            { value: 4.9, prefix: "", suffix: "/5", label: "Average rating", icon: "⭐" },
            { value: 99, prefix: "", suffix: "%", label: "Uptime", icon: "⚡" },
          ],
          itemFields: [
            { key: "value", label: "Target value", type: "number", group: "content", default: 100 },
            { key: "prefix", label: "Prefix", type: "text", group: "content", default: "" },
            { key: "suffix", label: "Suffix", type: "text", group: "content", default: "" },
            { key: "label", label: "Label", type: "text", group: "content", default: "" },
            { key: "icon", label: "Icon (emoji)", type: "text", group: "content", default: "" },
          ],
        },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 4, min: 1, max: 4 },
        { key: "accentColor", label: "Number colour", type: "color", group: "style", default: "#0d9488" },
        { key: "align", label: "Align", type: "select", group: "style", default: "center",
          options: [{ value: "center", label: "Center" }, { value: "left", label: "Left" }] },
        { key: "duration", label: "Count duration (ms)", type: "number", group: "behaviour", default: 1600, min: 200, max: 6000 },
        { key: "separator", label: "Thousands separator", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Company Stats", useCase: "About page", industry: "General", preset: {} },
      { name: "Impact Numbers", useCase: "Non-profit", industry: "Non-profit", preset: { heading: "Our impact" } },
    ],
  },

  // 11 ── Logo Showcase ───────────────────────────────────────────────────────
  {
    key: "logos",
    name: "Logo Showcase",
    categorySlug: "social-proof",
    badges: ["Social Proof"],
    description: "Display client, partner, or press logos in a grid or moving strip.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Trusted by leading brands" },
        {
          key: "logos", label: "Logos", type: "list", group: "content", addLabel: "Add logo",
          default: [
            { image: "", alt: "Acme", link: "" }, { image: "", alt: "Globex", link: "" },
            { image: "", alt: "Umbrella", link: "" }, { image: "", alt: "Initech", link: "" }, { image: "", alt: "Hooli", link: "" },
          ],
          itemFields: [
            { key: "image", label: "Logo image", type: "image", group: "content", default: "" },
            { key: "alt", label: "Name", type: "text", group: "content", default: "" },
            { key: "link", label: "Link", type: "url", group: "content", default: "" },
          ],
        },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "grid",
          options: [{ value: "grid", label: "Grid" }, { value: "ticker", label: "Moving strip" }] },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 5, min: 2, max: 6 },
        { key: "grayscale", label: "Greyscale (colour on hover)", type: "toggle", group: "style", default: true },
        { key: "speed", label: "Strip speed (s)", type: "number", group: "behaviour", default: 30, min: 5, max: 120 },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Client Logos", useCase: "Homepage", industry: "General", preset: {} },
      { name: "As Seen In", useCase: "Press", industry: "Media", preset: { heading: "As seen in", layout: "ticker" } },
    ],
  },

  // 12 ── Team Showcase ───────────────────────────────────────────────────────
  {
    key: "team",
    name: "Team Showcase",
    categorySlug: "content",
    badges: ["No-code"],
    description: "Introduce your team with photos, roles, bios, and social links.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Meet the team" },
        {
          key: "members", label: "Team members", type: "list", group: "content", addLabel: "Add member",
          default: [
            { photo: "", name: "Aarav Sharma", role: "Founder & CEO", bio: "Loves building products people enjoy using.", email: "", linkedin: "", twitter: "" },
            { photo: "", name: "Neha Verma", role: "Head of Design", bio: "Crafting delightful, accessible experiences.", email: "", linkedin: "", twitter: "" },
            { photo: "", name: "Rohan Gupta", role: "Lead Engineer", bio: "Turning ideas into reliable software.", email: "", linkedin: "", twitter: "" },
          ],
          itemFields: [
            { key: "photo", label: "Photo", type: "image", group: "content", default: "" },
            { key: "name", label: "Name", type: "text", group: "content", default: "" },
            { key: "role", label: "Role", type: "text", group: "content", default: "" },
            { key: "bio", label: "Bio", type: "textarea", group: "content", default: "" },
            { key: "email", label: "Email", type: "email", group: "content", default: "" },
            { key: "linkedin", label: "LinkedIn URL", type: "url", group: "content", default: "" },
            { key: "twitter", label: "Twitter / X URL", type: "url", group: "content", default: "" },
          ],
        },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "grid",
          options: [{ value: "grid", label: "Grid" }, { value: "list", label: "List" }] },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 3, min: 2, max: 4 },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
        { key: "round", label: "Circular photos", type: "toggle", group: "style", default: true },
        { key: "showBio", label: "Show bio", type: "toggle", group: "behaviour", default: true },
        { key: "showSocial", label: "Show social links", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Leadership", useCase: "About page", industry: "General", preset: {} },
      { name: "Full Team", useCase: "Careers page", industry: "General", preset: { columns: 4 } },
    ],
  },

  // 13 ── Timeline ────────────────────────────────────────────────────────────
  {
    key: "timeline",
    name: "Timeline",
    categorySlug: "content",
    badges: ["No-code"],
    description: "Tell your story or roadmap as an animated vertical timeline.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Our journey" },
        {
          key: "items", label: "Milestones", type: "list", group: "content", addLabel: "Add milestone",
          default: [
            { date: "2021", title: "Founded", text: "We started with a simple idea and a small team.", icon: "🌱" },
            { date: "2022", title: "First 1,000 customers", text: "Word spread and our community grew fast.", icon: "🚀" },
            { date: "2023", title: "Series A", text: "We raised funding to expand the product.", icon: "💰" },
            { date: "2024", title: "Global launch", text: "Now serving customers in 40+ countries.", icon: "🌍" },
          ],
          itemFields: [
            { key: "date", label: "Date / period", type: "text", group: "content", default: "" },
            { key: "title", label: "Title", type: "text", group: "content", default: "" },
            { key: "text", label: "Description", type: "textarea", group: "content", default: "" },
            { key: "icon", label: "Icon (emoji)", type: "text", group: "content", default: "" },
          ],
        },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "vertical",
          options: [{ value: "vertical", label: "Vertical" }, { value: "alternating", label: "Alternating" }] },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
        { key: "lineColor", label: "Line colour", type: "color", group: "style", default: "#e2e8f0" },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Company History", useCase: "About page", industry: "General", preset: {} },
      { name: "Product Roadmap", useCase: "Product page", industry: "SaaS", preset: { heading: "Roadmap", layout: "alternating" } },
    ],
  },

  // 14 ── Back to Top ─────────────────────────────────────────────────────────
  {
    key: "backtotop",
    name: "Back to Top",
    categorySlug: "utility",
    badges: ["No-code"],
    description: "A floating button that smoothly scrolls visitors back to the top.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "label", label: "Label (optional)", type: "text", group: "content", default: "" },
        { key: "position", label: "Position", type: "select", group: "layout", default: "bottom-right",
          options: [{ value: "bottom-right", label: "Bottom right" }, { value: "bottom-left", label: "Bottom left" }] },
        { key: "size", label: "Size (px)", type: "number", group: "layout", default: 48, min: 36, max: 72 },
        { key: "bgColor", label: "Background", type: "color", group: "style", default: "#0d9488" },
        { key: "iconColor", label: "Icon colour", type: "color", group: "style", default: "#ffffff" },
        { key: "shape", label: "Shape", type: "select", group: "style", default: "circle",
          options: [{ value: "circle", label: "Circle" }, { value: "rounded", label: "Rounded" }] },
        { key: "threshold", label: "Show after scroll (px)", type: "number", group: "behaviour", default: 300, min: 0, max: 3000 },
        { key: "showProgress", label: "Show scroll-progress ring", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Minimal", useCase: "Any site", industry: "General", preset: {} },
      { name: "With progress", useCase: "Long articles", industry: "Blog", preset: { showProgress: true, shape: "rounded", label: "Top" } },
    ],
  },

  // 15 ── Photo Gallery ───────────────────────────────────────────────────────
  {
    key: "gallery",
    name: "Photo Gallery",
    categorySlug: "content",
    badges: ["New"],
    description: "A responsive photo gallery with a touch-friendly lightbox.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "" },
        {
          key: "images", label: "Images", type: "list", group: "content", addLabel: "Add image",
          default: [
            { src: "", caption: "", alt: "" }, { src: "", caption: "", alt: "" }, { src: "", caption: "", alt: "" },
            { src: "", caption: "", alt: "" }, { src: "", caption: "", alt: "" }, { src: "", caption: "", alt: "" },
          ],
          itemFields: [
            { key: "src", label: "Image URL", type: "image", group: "content", default: "" },
            { key: "caption", label: "Caption", type: "text", group: "content", default: "" },
            { key: "alt", label: "Alt text", type: "text", group: "content", default: "" },
          ],
        },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "grid",
          options: [{ value: "grid", label: "Grid" }, { value: "masonry", label: "Masonry" }] },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 3, min: 2, max: 5 },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
        { key: "lightbox", label: "Open lightbox on click", type: "toggle", group: "behaviour", default: true },
        { key: "showCaptions", label: "Show captions", type: "toggle", group: "behaviour", default: false },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Portfolio Grid", useCase: "Creator page", industry: "Creator", preset: {} },
      { name: "Masonry Gallery", useCase: "Photography", industry: "Photography", preset: { layout: "masonry", columns: 4 } },
    ],
  },

  // 16 ── Custom Button ───────────────────────────────────────────────────────
  {
    key: "button",
    name: "Custom Button",
    categorySlug: "utility",
    badges: ["No-code"],
    description: "A flexible call-to-action button with link, call, email, scroll, and copy actions.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "label", label: "Button text", type: "text", group: "content", default: "Get started" },
        { key: "icon", label: "Icon (emoji)", type: "text", group: "content", default: "" },
        { key: "action", label: "Action", type: "select", group: "content", default: "url",
          options: [
            { value: "url", label: "Open link" }, { value: "tel", label: "Call phone" }, { value: "email", label: "Send email" },
            { value: "scroll", label: "Scroll to section" }, { value: "copy", label: "Copy text" },
          ] },
        { key: "target", label: "Destination", type: "text", group: "content", default: "https://example.com", help: "URL, phone, email, CSS selector (#section) or text to copy." },
        { key: "align", label: "Alignment", type: "select", group: "layout", default: "left",
          options: [{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }] },
        { key: "fullWidth", label: "Full width", type: "toggle", group: "layout", default: false },
        { key: "bgColor", label: "Background", type: "color", group: "style", default: "#0d9488" },
        { key: "textColor", label: "Text", type: "color", group: "style", default: "#ffffff" },
        { key: "size", label: "Size", type: "select", group: "style", default: "md",
          options: [{ value: "sm", label: "Small" }, { value: "md", label: "Medium" }, { value: "lg", label: "Large" }] },
        { key: "radius", label: "Corner radius (px)", type: "number", group: "style", default: 10, min: 0, max: 40 },
        { key: "variant", label: "Style", type: "select", group: "style", default: "solid",
          options: [{ value: "solid", label: "Solid" }, { value: "outline", label: "Outline" }] },
        { key: "newTab", label: "Open link in new tab", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Primary CTA", useCase: "Landing page", industry: "General", preset: {} },
      { name: "Call Button", useCase: "Contact", industry: "Services", preset: { label: "Call us now", action: "tel", target: "+919876543210", icon: "📞" } },
    ],
  },

  // 17 ── Before / After Comparison ───────────────────────────────────────────
  {
    key: "beforeafter",
    name: "Before / After",
    categorySlug: "content",
    badges: ["New"],
    description: "A draggable slider to compare two images — transformations, edits, renovations.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "" },
        { key: "beforeImage", label: "Before image", type: "image", group: "content", default: "" },
        { key: "afterImage", label: "After image", type: "image", group: "content", default: "" },
        { key: "beforeLabel", label: "Before label", type: "text", group: "content", default: "Before" },
        { key: "afterLabel", label: "After label", type: "text", group: "content", default: "After" },
        { key: "orientation", label: "Orientation", type: "select", group: "layout", default: "horizontal",
          options: [{ value: "horizontal", label: "Horizontal" }, { value: "vertical", label: "Vertical" }] },
        { key: "aspect", label: "Aspect ratio", type: "select", group: "layout", default: "16/9",
          options: [{ value: "16/9", label: "16:9" }, { value: "4/3", label: "4:3" }, { value: "1/1", label: "Square" }] },
        { key: "startPos", label: "Start position (%)", type: "number", group: "behaviour", default: 50, min: 0, max: 100 },
        { key: "handleColor", label: "Handle colour", type: "color", group: "style", default: "#0d9488" },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Photo Retouch", useCase: "Photography", industry: "Photography", preset: {} },
      { name: "Renovation", useCase: "Home services", industry: "Construction", preset: { beforeLabel: "Old", afterLabel: "New" } },
    ],
  },

  // 18 ── Image / Video Slider ────────────────────────────────────────────────
  {
    key: "slider",
    name: "Image Slider",
    categorySlug: "marketing",
    badges: ["Popular"],
    description: "A responsive slider for banners, promotions, and hero content.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        {
          key: "slides", label: "Slides", type: "list", group: "content", addLabel: "Add slide",
          default: [
            { image: "", title: "Summer Collection", text: "Fresh styles for the season.", ctaLabel: "Shop now", ctaUrl: "" },
            { image: "", title: "Free Shipping", text: "On all orders over ₹999.", ctaLabel: "Learn more", ctaUrl: "" },
            { image: "", title: "New Arrivals", text: "Just landed — be the first.", ctaLabel: "Explore", ctaUrl: "" },
          ],
          itemFields: [
            { key: "image", label: "Image", type: "image", group: "content", default: "" },
            { key: "title", label: "Title", type: "text", group: "content", default: "" },
            { key: "text", label: "Text", type: "textarea", group: "content", default: "" },
            { key: "ctaLabel", label: "Button label", type: "text", group: "content", default: "" },
            { key: "ctaUrl", label: "Button link", type: "url", group: "content", default: "" },
          ],
        },
        { key: "height", label: "Height (px)", type: "number", group: "layout", default: 360, min: 160, max: 720 },
        { key: "overlay", label: "Darken image for text", type: "toggle", group: "style", default: true },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
        { key: "autoplay", label: "Autoplay", type: "toggle", group: "behaviour", default: true },
        { key: "interval", label: "Autoplay interval (s)", type: "number", group: "behaviour", default: 5, min: 2, max: 30 },
        { key: "showArrows", label: "Show arrows", type: "toggle", group: "behaviour", default: true },
        { key: "showDots", label: "Show dots", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Hero Banner", useCase: "Homepage", industry: "E-commerce", preset: { height: 420 } },
      { name: "Promo Carousel", useCase: "Campaign", industry: "Retail", preset: {} },
    ],
  },

  // 19 ── Portfolio Showcase ──────────────────────────────────────────────────
  {
    key: "portfolio",
    name: "Portfolio",
    categorySlug: "content",
    badges: ["No-code"],
    description: "Showcase projects in a filterable grid with a detail lightbox.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Selected work" },
        {
          key: "projects", label: "Projects", type: "list", group: "content", addLabel: "Add project",
          default: [
            { image: "", title: "Brand Redesign", category: "Branding", description: "A complete visual identity refresh for a modern retail brand.", link: "" },
            { image: "", title: "Mobile App", category: "Product", description: "End-to-end design and build of an on-demand delivery app.", link: "" },
            { image: "", title: "Marketing Site", category: "Web", description: "A high-converting landing page and CMS.", link: "" },
            { image: "", title: "Packaging", category: "Branding", description: "Sustainable packaging design for a skincare line.", link: "" },
          ],
          itemFields: [
            { key: "image", label: "Cover image", type: "image", group: "content", default: "" },
            { key: "title", label: "Title", type: "text", group: "content", default: "" },
            { key: "category", label: "Category", type: "text", group: "content", default: "" },
            { key: "description", label: "Description", type: "textarea", group: "content", default: "" },
            { key: "link", label: "Link", type: "url", group: "content", default: "" },
          ],
        },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 3, min: 2, max: 4 },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
        { key: "showFilters", label: "Show category filters", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Design Portfolio", useCase: "Creative", industry: "Design", preset: {} },
      { name: "Agency Work", useCase: "Agency", industry: "Agency", preset: { columns: 4 } },
    ],
  },

  // 20 ── Restaurant Menu ─────────────────────────────────────────────────────
  {
    key: "menu",
    name: "Restaurant Menu",
    categorySlug: "content",
    badges: ["No-code"],
    description: "A clean, categorized menu with dishes, descriptions, and prices.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Our menu" },
        { key: "currency", label: "Currency symbol", type: "text", group: "content", default: "₹" },
        {
          key: "items", label: "Dishes", type: "list", group: "content", addLabel: "Add dish",
          default: [
            { section: "Starters", name: "Paneer Tikka", description: "Char-grilled cottage cheese with spices.", price: "260", tag: "Veg" },
            { section: "Starters", name: "Chicken 65", description: "Crispy, spicy South-Indian favourite.", price: "290", tag: "Spicy" },
            { section: "Mains", name: "Butter Chicken", description: "Creamy tomato gravy, tender chicken.", price: "380", tag: "" },
            { section: "Mains", name: "Dal Makhani", description: "Slow-cooked black lentils.", price: "290", tag: "Veg" },
            { section: "Desserts", name: "Gulab Jamun", description: "Warm, syrup-soaked dumplings.", price: "140", tag: "" },
          ],
          itemFields: [
            { key: "section", label: "Section", type: "text", group: "content", default: "" },
            { key: "name", label: "Dish", type: "text", group: "content", default: "" },
            { key: "description", label: "Description", type: "text", group: "content", default: "" },
            { key: "price", label: "Price", type: "text", group: "content", default: "" },
            { key: "tag", label: "Tag (Veg/Spicy…)", type: "text", group: "content", default: "" },
          ],
        },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 1, min: 1, max: 2 },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Dinner Menu", useCase: "Restaurant", industry: "Food", preset: {} },
      { name: "Cafe Menu", useCase: "Cafe", industry: "Food", preset: { heading: "Cafe menu", columns: 2 } },
    ],
  },

  // 21 ── Age Verification ────────────────────────────────────────────────────
  {
    key: "agegate",
    name: "Age Verification",
    categorySlug: "utility",
    badges: ["No-code"],
    description: "A configurable age gate before visitors can view your site.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Are you of legal age?" },
        { key: "message", label: "Message", type: "textarea", group: "content", default: "You must be of legal age to enter this website." },
        { key: "mode", label: "Verification", type: "select", group: "content", default: "yesno",
          options: [{ value: "yesno", label: "Yes / No" }, { value: "birthyear", label: "Enter birth year" }] },
        { key: "minAge", label: "Minimum age", type: "number", group: "content", default: 18, min: 13, max: 25 },
        { key: "confirmLabel", label: "Confirm button", type: "text", group: "content", default: "Yes, enter" },
        { key: "rejectLabel", label: "Reject button", type: "text", group: "content", default: "No, leave" },
        { key: "rejectMessage", label: "Rejection message", type: "text", group: "content", default: "Sorry, you are not old enough to view this content." },
        { key: "bgColor", label: "Background", type: "color", group: "style", default: "#0b1220" },
        { key: "accentColor", label: "Button colour", type: "color", group: "style", default: "#0d9488" },
        { key: "rejectUrl", label: "Redirect on reject (URL)", type: "url", group: "behaviour", default: "" },
        { key: "rememberDays", label: "Remember for (days)", type: "number", group: "behaviour", default: 30, min: 0, max: 365 },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Simple Gate", useCase: "18+ content", industry: "General", preset: {} },
      { name: "Birth Year", useCase: "Alcohol / tobacco", industry: "Beverages", preset: { mode: "birthyear", minAge: 21, heading: "Verify your age" } },
    ],
  },

  // 22 ── Cookie Consent ──────────────────────────────────────────────────────
  {
    key: "cookie",
    name: "Cookie Consent",
    categorySlug: "utility",
    badges: ["No-code"],
    description: "A cookie-consent banner that remembers the visitor's choice.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "message", label: "Message", type: "textarea", group: "content", default: "We use cookies to improve your experience. By continuing, you agree to our use of cookies." },
        { key: "acceptLabel", label: "Accept button", type: "text", group: "content", default: "Accept all" },
        { key: "rejectLabel", label: "Reject button", type: "text", group: "content", default: "Reject" },
        { key: "policyLabel", label: "Policy link text", type: "text", group: "content", default: "Cookie policy" },
        { key: "policyUrl", label: "Policy URL", type: "url", group: "content", default: "" },
        { key: "style", label: "Style", type: "select", group: "layout", default: "banner",
          options: [{ value: "banner", label: "Bottom banner" }, { value: "floating", label: "Floating card" }] },
        { key: "bgColor", label: "Background", type: "color", group: "style", default: "#0b1220" },
        { key: "textColor", label: "Text", type: "color", group: "style", default: "#e2e8f0" },
        { key: "accentColor", label: "Accept button", type: "color", group: "style", default: "#0d9488" },
        { key: "rememberDays", label: "Remember for (days)", type: "number", group: "behaviour", default: 180, min: 1, max: 365 },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Simple Banner", useCase: "Any site", industry: "General", preset: {} },
      { name: "Floating Card", useCase: "Any site", industry: "General", preset: { style: "floating" } },
    ],
  },
];

export function toolByKey(key: string): ToolDef | undefined {
  return TOOLS.find((t) => t.key === key);
}
