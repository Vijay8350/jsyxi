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

  // 23 ── Price Calculator ────────────────────────────────────────────────────
  {
    key: "calculator",
    name: "Price Calculator",
    categorySlug: "forms-leads",
    badges: ["Conversion"],
    description: "An instant quote / pricing calculator — no formulas or code to write.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Estimate your price" },
        { key: "currency", label: "Currency symbol", type: "text", group: "content", default: "₹" },
        { key: "baseAmount", label: "Base amount", type: "number", group: "content", default: 0, min: 0, help: "Fixed starting amount before inputs." },
        {
          key: "fields", label: "Inputs", type: "list", group: "content", addLabel: "Add input",
          default: [
            { label: "Quantity", type: "number", coefficient: 500, default: 1, min: 1, max: 100, step: 1 },
            { label: "Extra add-ons", type: "slider", coefficient: 250, default: 0, min: 0, max: 10, step: 1 },
          ],
          itemFields: [
            { key: "label", label: "Label", type: "text", group: "content", default: "" },
            { key: "type", label: "Type", type: "select", group: "content", default: "number",
              options: [{ value: "number", label: "Number" }, { value: "slider", label: "Slider" }] },
            { key: "coefficient", label: "Price per unit", type: "number", group: "content", default: 1 },
            { key: "default", label: "Default value", type: "number", group: "content", default: 1 },
            { key: "min", label: "Min", type: "number", group: "content", default: 0 },
            { key: "max", label: "Max", type: "number", group: "content", default: 100 },
            { key: "step", label: "Step", type: "number", group: "content", default: 1 },
          ],
        },
        { key: "discountPercent", label: "Discount (%)", type: "number", group: "behaviour", default: 0, min: 0, max: 100 },
        { key: "taxPercent", label: "Tax (%)", type: "number", group: "behaviour", default: 0, min: 0, max: 100 },
        { key: "resultLabel", label: "Result label", type: "text", group: "content", default: "Estimated total" },
        { key: "showBreakdown", label: "Show breakdown", type: "toggle", group: "behaviour", default: true },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Quote Calculator", useCase: "Service pricing", industry: "Services", preset: {} },
      { name: "Product Estimate", useCase: "Store", industry: "E-commerce", preset: { heading: "Build your bundle", taxPercent: 18 } },
    ],
  },

  // 24 ── Event Calendar ──────────────────────────────────────────────────────
  {
    key: "calendar",
    name: "Event Calendar",
    categorySlug: "content",
    badges: ["No-code"],
    description: "List upcoming events with dates, locations, and add-to-calendar links.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Upcoming events" },
        {
          key: "events", label: "Events", type: "list", group: "content", addLabel: "Add event",
          default: [
            { date: "2026-08-15", time: "10:00 AM", title: "Product Launch Webinar", location: "Online", category: "Webinar", link: "" },
            { date: "2026-09-05", time: "6:00 PM", title: "Community Meetup", location: "Bengaluru", category: "Meetup", link: "" },
            { date: "2026-10-12", time: "9:00 AM", title: "Annual Conference", location: "Mumbai", category: "Conference", link: "" },
          ],
          itemFields: [
            { key: "date", label: "Date (YYYY-MM-DD)", type: "text", group: "content", default: "", placeholder: "2026-08-15" },
            { key: "time", label: "Time", type: "text", group: "content", default: "" },
            { key: "title", label: "Title", type: "text", group: "content", default: "" },
            { key: "location", label: "Location", type: "text", group: "content", default: "" },
            { key: "category", label: "Category", type: "text", group: "content", default: "" },
            { key: "link", label: "Details / tickets link", type: "url", group: "content", default: "" },
          ],
        },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "list",
          options: [{ value: "list", label: "List" }, { value: "cards", label: "Cards" }] },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
        { key: "showAddToCalendar", label: "Show 'add to calendar'", type: "toggle", group: "behaviour", default: true },
        { key: "hidePast", label: "Hide past events", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Event List", useCase: "Events page", industry: "General", preset: {} },
      { name: "Webinar Schedule", useCase: "SaaS", industry: "SaaS", preset: { heading: "Upcoming webinars", layout: "cards" } },
    ],
  },

  // 25 ── Job Board ───────────────────────────────────────────────────────────
  {
    key: "jobs",
    name: "Job Board",
    categorySlug: "forms-leads",
    badges: ["No-code"],
    description: "List open roles with filters and apply links.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Open positions" },
        {
          key: "jobs", label: "Roles", type: "list", group: "content", addLabel: "Add role",
          default: [
            { title: "Senior Frontend Engineer", department: "Engineering", location: "Remote", type: "Full-time", salary: "₹25–40 LPA", description: "Build delightful, accessible interfaces with React and TypeScript. You'll own features end-to-end.", applyUrl: "" },
            { title: "Product Designer", department: "Design", location: "Bengaluru", type: "Full-time", salary: "₹18–30 LPA", description: "Shape the product experience from research to polished UI. Strong portfolio required.", applyUrl: "" },
            { title: "Growth Marketer", department: "Marketing", location: "Remote", type: "Contract", salary: "₹12–20 LPA", description: "Run experiments across channels and turn data into growth.", applyUrl: "" },
          ],
          itemFields: [
            { key: "title", label: "Title", type: "text", group: "content", default: "" },
            { key: "department", label: "Department", type: "text", group: "content", default: "" },
            { key: "location", label: "Location", type: "text", group: "content", default: "" },
            { key: "type", label: "Type", type: "text", group: "content", default: "Full-time" },
            { key: "salary", label: "Salary", type: "text", group: "content", default: "" },
            { key: "description", label: "Description", type: "textarea", group: "content", default: "" },
            { key: "applyUrl", label: "Apply link", type: "url", group: "content", default: "" },
          ],
        },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
        { key: "showFilters", label: "Show department filters", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Careers Page", useCase: "Hiring", industry: "General", preset: {} },
      { name: "Remote Jobs", useCase: "Distributed team", industry: "Tech", preset: {} },
    ],
  },

  // 26 ── Accessibility Toolbar ───────────────────────────────────────────────
  {
    key: "accessibility",
    name: "Accessibility Toolbar",
    categorySlug: "utility",
    badges: ["No-code"],
    description: "Let visitors adjust text size, contrast, and readability on your site.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "title", label: "Panel title", type: "text", group: "content", default: "Accessibility" },
        { key: "position", label: "Position", type: "select", group: "layout", default: "bottom-right",
          options: [{ value: "bottom-right", label: "Bottom right" }, { value: "bottom-left", label: "Bottom left" }] },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
        { key: "featBiggerText", label: "Bigger text", type: "toggle", group: "behaviour", default: true },
        { key: "featContrast", label: "High contrast", type: "toggle", group: "behaviour", default: true },
        { key: "featReadable", label: "Readable font", type: "toggle", group: "behaviour", default: true },
        { key: "featLinks", label: "Highlight links", type: "toggle", group: "behaviour", default: true },
        { key: "featGrayscale", label: "Greyscale", type: "toggle", group: "behaviour", default: true },
        { key: "featSpacing", label: "Letter spacing", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Full Toolbar", useCase: "Any site", industry: "General", preset: {} },
      { name: "Essential", useCase: "Any site", industry: "General", preset: { featGrayscale: false, featSpacing: false } },
    ],
  },

  // 27 ── Store Locator ───────────────────────────────────────────────────────
  {
    key: "storelocator",
    name: "Store Locator",
    categorySlug: "contact-chat",
    badges: ["No-code"],
    description: "An interactive map with a synchronized list of your locations.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Find a store near you" },
        {
          key: "stores", label: "Locations", type: "list", group: "content", addLabel: "Add location",
          default: [
            { name: "Connaught Place", address: "Connaught Place, New Delhi", phone: "+91 98765 43210", hours: "10am – 9pm" },
            { name: "Bandra West", address: "Linking Road, Bandra West, Mumbai", phone: "+91 98765 11223", hours: "11am – 10pm" },
            { name: "Koramangala", address: "80 Feet Road, Koramangala, Bengaluru", phone: "+91 98765 33445", hours: "10am – 9pm" },
          ],
          itemFields: [
            { key: "name", label: "Name", type: "text", group: "content", default: "" },
            { key: "address", label: "Address", type: "text", group: "content", default: "" },
            { key: "phone", label: "Phone", type: "tel", group: "content", default: "" },
            { key: "hours", label: "Hours", type: "text", group: "content", default: "" },
          ],
        },
        { key: "mapSide", label: "Map position", type: "select", group: "layout", default: "right",
          options: [{ value: "right", label: "Right" }, { value: "left", label: "Left" }] },
        { key: "mapHeight", label: "Height (px)", type: "number", group: "layout", default: 420, min: 240, max: 720 },
        { key: "accentColor", label: "Accent", type: "color", group: "style", default: "#0d9488" },
        { key: "showDirections", label: "Show directions links", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Retail Chain", useCase: "Multi-location", industry: "Retail", preset: {} },
      { name: "Clinics", useCase: "Healthcare", industry: "Healthcare", preset: { heading: "Our clinics" } },
    ],
  },

  // 28 ── Visitor Counter ─────────────────────────────────────────────────────
  {
    key: "visitors",
    name: "Visitor Counter",
    categorySlug: "social-proof",
    badges: ["Social Proof"],
    description: "Show a live view count backed by your real first-party analytics.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "" },
        { key: "label", label: "Label", type: "text", group: "content", default: "Total visitors" },
        { key: "icon", label: "Icon (emoji)", type: "text", group: "content", default: "👁️" },
        { key: "metric", label: "Metric", type: "select", group: "content", default: "total",
          options: [{ value: "total", label: "Total views" }, { value: "today", label: "Today's views" }] },
        { key: "startOffset", label: "Starting offset", type: "number", group: "content", default: 0, min: 0, help: "Added to the real measured count — a display adjustment, not measured data." },
        { key: "layout", label: "Style", type: "select", group: "layout", default: "card",
          options: [{ value: "card", label: "Card" }, { value: "badge", label: "Badge" }] },
        { key: "accentColor", label: "Number colour", type: "color", group: "style", default: "#0d9488" },
        { key: "separator", label: "Thousands separator", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Total Views", useCase: "Social proof", industry: "General", preset: {} },
      { name: "Today's Views", useCase: "Live badge", industry: "General", preset: { metric: "today", label: "Views today", layout: "badge" } },
    ],
  },

  // 29 ── Pricing Table ───────────────────────────────────────────────────────
  {
    key: "pricing",
    name: "Pricing Table",
    categorySlug: "marketing",
    badges: ["Conversion"],
    description: "Show pricing plans side by side with features and call-to-action buttons.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Simple, transparent pricing" },
        {
          key: "plans", label: "Plans", type: "list", group: "content", addLabel: "Add plan",
          default: [
            { name: "Starter", price: "₹0", period: "/mo", features: "1 widget\nBasic support\nCommunity access", cta: "Get started", url: "#", featured: false },
            { name: "Pro", price: "₹999", period: "/mo", features: "Unlimited widgets\nPriority support\nRemove branding", cta: "Start Pro", url: "#", featured: true },
            { name: "Agency", price: "₹2999", period: "/mo", features: "Everything in Pro\nClient workspaces\nDedicated manager", cta: "Contact us", url: "#", featured: false },
          ],
          itemFields: [
            { key: "name", label: "Plan name", type: "text", group: "content", default: "" },
            { key: "price", label: "Price", type: "text", group: "content", default: "" },
            { key: "period", label: "Period", type: "text", group: "content", default: "/mo" },
            { key: "features", label: "Features (one per line)", type: "textarea", group: "content", default: "" },
            { key: "cta", label: "Button label", type: "text", group: "content", default: "Choose" },
            { key: "url", label: "Button URL", type: "url", group: "content", default: "#" },
            { key: "featured", label: "Highlight this plan", type: "toggle", group: "content", default: false },
          ],
        },
        { key: "accentColor", label: "Accent colour", type: "color", group: "style", default: "#0d9488" },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
        { key: "showHeading", label: "Show heading", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "SaaS Pricing", useCase: "Plans page", industry: "SaaS", preset: {} },
      { name: "Service Packages", useCase: "Agency", industry: "Services", preset: { heading: "Choose a package" } },
    ],
  },

  // 30 ── Announcement Bar ────────────────────────────────────────────────────
  {
    key: "announcement",
    name: "Announcement Bar",
    categorySlug: "marketing",
    badges: ["Marketing"],
    description: "A dismissible top or bottom bar to announce offers, news, or free shipping.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "text", label: "Message", type: "text", group: "content", default: "🎉 Free shipping on all orders over ₹999!" },
        { key: "linkLabel", label: "Link label", type: "text", group: "content", default: "Shop now" },
        { key: "linkUrl", label: "Link URL", type: "url", group: "content", default: "#" },
        { key: "position", label: "Position", type: "select", group: "layout", default: "top",
          options: [{ value: "top", label: "Top" }, { value: "bottom", label: "Bottom" }] },
        { key: "bgColor", label: "Background", type: "color", group: "style", default: "#0d9488" },
        { key: "textColor", label: "Text colour", type: "color", group: "style", default: "#ffffff" },
        { key: "dismissible", label: "Allow dismiss", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Free Shipping", useCase: "Ecommerce", industry: "E-commerce", preset: {} },
      { name: "Launch Notice", useCase: "Announcement", industry: "General", preset: { text: "🚀 We just launched! Check out what's new.", linkLabel: "See more" } },
    ],
  },

  // 31 ── Social Media Icons ──────────────────────────────────────────────────
  {
    key: "socialicons",
    name: "Social Media Icons",
    categorySlug: "contact-chat",
    badges: ["No-code"],
    description: "Link visitors to all your social profiles with clean, branded icons.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Follow us" },
        {
          key: "links", label: "Profiles", type: "list", group: "content", addLabel: "Add profile",
          default: [
            { network: "facebook", url: "https://facebook.com/" },
            { network: "instagram", url: "https://instagram.com/" },
            { network: "twitter", url: "https://x.com/" },
            { network: "linkedin", url: "https://linkedin.com/" },
            { network: "youtube", url: "https://youtube.com/" },
          ],
          itemFields: [
            { key: "network", label: "Network", type: "select", group: "content", default: "facebook",
              options: [
                { value: "facebook", label: "Facebook" }, { value: "instagram", label: "Instagram" }, { value: "twitter", label: "X / Twitter" },
                { value: "linkedin", label: "LinkedIn" }, { value: "youtube", label: "YouTube" }, { value: "whatsapp", label: "WhatsApp" },
                { value: "telegram", label: "Telegram" }, { value: "tiktok", label: "TikTok" }, { value: "pinterest", label: "Pinterest" }, { value: "email", label: "Email" },
              ] },
            { key: "url", label: "URL", type: "url", group: "content", default: "" },
          ],
        },
        { key: "shape", label: "Shape", type: "select", group: "layout", default: "circle",
          options: [{ value: "circle", label: "Circle" }, { value: "square", label: "Rounded square" }] },
        { key: "size", label: "Icon size (px)", type: "number", group: "layout", default: 44, min: 28, max: 72 },
        { key: "align", label: "Alignment", type: "select", group: "layout", default: "center",
          options: [{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }] },
        { key: "colorStyle", label: "Colour style", type: "select", group: "style", default: "brand",
          options: [{ value: "brand", label: "Brand colours" }, { value: "mono", label: "Monochrome" }] },
        { key: "monoColor", label: "Monochrome colour", type: "color", group: "style", default: "#0f172a" },
        { key: "showHeading", label: "Show heading", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Footer Icons", useCase: "Site footer", industry: "General", preset: { shape: "circle" } },
      { name: "Monochrome Row", useCase: "Minimal", industry: "General", preset: { colorStyle: "mono" } },
    ],
  },

  // 32 ── Feature Grid ────────────────────────────────────────────────────────
  {
    key: "features",
    name: "Feature Grid",
    categorySlug: "content",
    badges: ["Content"],
    description: "Highlight product features or benefits in a clean icon grid.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Why choose us" },
        {
          key: "items", label: "Features", type: "list", group: "content", addLabel: "Add feature",
          default: [
            { icon: "⚡", title: "Fast setup", text: "Launch in minutes with no code." },
            { icon: "🎨", title: "Fully customizable", text: "Match your brand in a few clicks." },
            { icon: "🔒", title: "Secure by default", text: "Bot and spam protection built in." },
            { icon: "📈", title: "Grows with you", text: "From first sale to full scale." },
          ],
          itemFields: [
            { key: "icon", label: "Icon (emoji)", type: "text", group: "content", default: "⭐" },
            { key: "title", label: "Title", type: "text", group: "content", default: "" },
            { key: "text", label: "Description", type: "textarea", group: "content", default: "" },
          ],
        },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 3, min: 1, max: 4 },
        { key: "align", label: "Text align", type: "select", group: "layout", default: "center",
          options: [{ value: "center", label: "Center" }, { value: "left", label: "Left" }] },
        { key: "accentColor", label: "Icon background", type: "color", group: "style", default: "#ccfbf1" },
        { key: "showHeading", label: "Show heading", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Product Features", useCase: "Landing page", industry: "SaaS", preset: {} },
      { name: "Service Benefits", useCase: "Agency", industry: "Services", preset: { columns: 4 } },
    ],
  },

  // 33 ── Tabs ────────────────────────────────────────────────────────────────
  {
    key: "tabs",
    name: "Tabs",
    categorySlug: "content",
    badges: ["Content"],
    description: "Organize content into clean, clickable tabbed sections.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        {
          key: "items", label: "Tabs", type: "list", group: "content", addLabel: "Add tab",
          default: [
            { title: "Overview", body: "Write an overview of your product or service here." },
            { title: "Features", body: "List the key features your customers care about." },
            { title: "FAQ", body: "Answer the most common questions in this tab." },
          ],
          itemFields: [
            { key: "title", label: "Tab title", type: "text", group: "content", default: "" },
            { key: "body", label: "Tab content", type: "textarea", group: "content", default: "" },
          ],
        },
        { key: "align", label: "Tab alignment", type: "select", group: "layout", default: "left",
          options: [{ value: "left", label: "Left" }, { value: "center", label: "Center" }] },
        { key: "accentColor", label: "Active colour", type: "color", group: "style", default: "#0d9488" },
        { key: "rounded", label: "Rounded", type: "toggle", group: "style", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Product Tabs", useCase: "Product page", industry: "E-commerce", preset: {} },
      { name: "Info Tabs", useCase: "Content", industry: "General", preset: { align: "center" } },
    ],
  },

  // 34 ── Video Popup ─────────────────────────────────────────────────────────
  {
    key: "video",
    name: "Video Popup",
    categorySlug: "content",
    badges: ["Content"],
    description: "Embed a YouTube or Vimeo video inline or as a click-to-play popup.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "videoUrl", label: "Video URL (YouTube or Vimeo)", type: "url", group: "content", default: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
        { key: "title", label: "Title", type: "text", group: "content", default: "Watch our story" },
        { key: "thumbnail", label: "Custom thumbnail (optional)", type: "image", group: "content", default: "" },
        { key: "mode", label: "Display", type: "select", group: "layout", default: "popup",
          options: [{ value: "popup", label: "Click-to-play popup" }, { value: "inline", label: "Inline embed" }] },
        { key: "ratio", label: "Aspect ratio", type: "select", group: "layout", default: "16:9",
          options: [{ value: "16:9", label: "16:9" }, { value: "4:3", label: "4:3" }, { value: "1:1", label: "1:1" }] },
        { key: "accentColor", label: "Play button colour", type: "color", group: "style", default: "#0d9488" },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
        { key: "showTitle", label: "Show title", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Hero Video", useCase: "Landing page", industry: "General", preset: { mode: "popup" } },
      { name: "Inline Explainer", useCase: "Product page", industry: "SaaS", preset: { mode: "inline" } },
    ],
  },

  // 35 ── Coupon Code ─────────────────────────────────────────────────────────
  {
    key: "coupon",
    name: "Coupon Code",
    categorySlug: "marketing",
    badges: ["Conversion"],
    description: "Show a promo code visitors can copy with one click.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Get 10% off your first order" },
        { key: "description", label: "Description", type: "textarea", group: "content", default: "Use this code at checkout." },
        { key: "code", label: "Coupon code", type: "text", group: "content", default: "WELCOME10" },
        { key: "copyLabel", label: "Copy button label", type: "text", group: "content", default: "Copy code" },
        { key: "successLabel", label: "Copied label", type: "text", group: "content", default: "Copied!" },
        { key: "accentColor", label: "Accent colour", type: "color", group: "style", default: "#0d9488" },
        { key: "bgColor", label: "Background", type: "color", group: "style", default: "#f0fdfa" },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Welcome Offer", useCase: "New visitors", industry: "E-commerce", preset: {} },
      { name: "Flash Sale", useCase: "Promotion", industry: "Retail", preset: { heading: "Flash sale — 25% off", code: "FLASH25" } },
    ],
  },

  // 36 ── Stats Counter ───────────────────────────────────────────────────────
  {
    key: "stats",
    name: "Stats Counter",
    categorySlug: "social-proof",
    badges: ["Social Proof"],
    description: "Show off key numbers with an animated count-up effect.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "" },
        {
          key: "items", label: "Stats", type: "list", group: "content", addLabel: "Add stat",
          default: [
            { value: 12000, prefix: "", suffix: "+", label: "Happy customers" },
            { value: 4.9, prefix: "", suffix: "/5", label: "Average rating" },
            { value: 50, prefix: "", suffix: "+", label: "Countries" },
            { value: 99, prefix: "", suffix: "%", label: "Uptime" },
          ],
          itemFields: [
            { key: "value", label: "Number", type: "number", group: "content", default: 0 },
            { key: "prefix", label: "Prefix", type: "text", group: "content", default: "" },
            { key: "suffix", label: "Suffix", type: "text", group: "content", default: "" },
            { key: "label", label: "Label", type: "text", group: "content", default: "" },
          ],
        },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 4, min: 1, max: 4 },
        { key: "accentColor", label: "Number colour", type: "color", group: "style", default: "#0d9488" },
        { key: "animate", label: "Count-up animation", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Company Stats", useCase: "About page", industry: "General", preset: {} },
      { name: "Trust Numbers", useCase: "Landing page", industry: "SaaS", preset: { columns: 3 } },
    ],
  },

  // 37 ── Reading Progress Bar ────────────────────────────────────────────────
  {
    key: "progressbar",
    name: "Reading Progress Bar",
    categorySlug: "utility",
    badges: ["Utility"],
    description: "A slim bar that fills as visitors scroll down the page.",
    isAi: false,
    schema: {
      tabs: [TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "position", label: "Position", type: "select", group: "layout", default: "top",
          options: [{ value: "top", label: "Top of page" }, { value: "bottom", label: "Bottom of page" }] },
        { key: "color", label: "Bar colour", type: "color", group: "style", default: "#0d9488" },
        { key: "trackColor", label: "Track colour", type: "color", group: "style", default: "#e5e7eb" },
        { key: "height", label: "Height (px)", type: "number", group: "style", default: 5, min: 2, max: 16 },
        { key: "showTrack", label: "Show track", type: "toggle", group: "behaviour", default: false },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Blog Progress", useCase: "Article pages", industry: "Content", preset: {} },
      { name: "Bottom Bar", useCase: "Long pages", industry: "General", preset: { position: "bottom" } },
    ],
  },

  // 38 ── Marquee Ticker ──────────────────────────────────────────────────────
  {
    key: "marquee",
    name: "Marquee Ticker",
    categorySlug: "content",
    badges: ["Content"],
    description: "A smooth scrolling ticker for announcements, offers, or highlights.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        {
          key: "items", label: "Items", type: "list", group: "content", addLabel: "Add item",
          default: [
            { text: "🚚 Free shipping over ₹999" },
            { text: "⭐ 4.9/5 from 12,000+ customers" },
            { text: "🔒 Secure checkout" },
            { text: "↩️ 30-day easy returns" },
          ],
          itemFields: [
            { key: "text", label: "Text", type: "text", group: "content", default: "" },
          ],
        },
        { key: "speed", label: "Speed (seconds per loop)", type: "number", group: "layout", default: 20, min: 5, max: 120 },
        { key: "direction", label: "Direction", type: "select", group: "layout", default: "left",
          options: [{ value: "left", label: "Left" }, { value: "right", label: "Right" }] },
        { key: "bgColor", label: "Background", type: "color", group: "style", default: "#0f172a" },
        { key: "textColor", label: "Text colour", type: "color", group: "style", default: "#ffffff" },
        { key: "fontSize", label: "Font size (px)", type: "number", group: "style", default: 15, min: 11, max: 28 },
        { key: "pauseOnHover", label: "Pause on hover", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Promo Ticker", useCase: "Store header", industry: "E-commerce", preset: {} },
      { name: "News Ticker", useCase: "Announcements", industry: "General", preset: { bgColor: "#0d9488" } },
    ],
  },

  // 39 ── Testimonial Slider ──────────────────────────────────────────────────
  {
    key: "testimonialslider",
    name: "Testimonial Slider",
    categorySlug: "social-proof",
    badges: ["Social Proof"],
    description: "Rotate customer quotes in an auto-playing carousel with ratings.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "What our customers say" },
        {
          key: "items", label: "Testimonials", type: "list", group: "content", addLabel: "Add testimonial",
          default: [
            { quote: "This is the easiest widget tool we've ever used. Live in minutes.", author: "Neha K.", role: "Founder, Bloom", rating: 5, avatar: "" },
            { quote: "Support is fantastic and it just works on our store.", author: "Rahul M.", role: "Owner, TenderLeaf", rating: 5, avatar: "" },
            { quote: "Clean, fast, and easy to customize to our brand.", author: "Divya R.", role: "Studio Craft", rating: 5, avatar: "" },
          ],
          itemFields: [
            { key: "quote", label: "Quote", type: "textarea", group: "content", default: "" },
            { key: "author", label: "Author", type: "text", group: "content", default: "" },
            { key: "role", label: "Role", type: "text", group: "content", default: "" },
            { key: "rating", label: "Rating", type: "number", group: "content", default: 5, min: 1, max: 5 },
            { key: "avatar", label: "Avatar", type: "image", group: "content", default: "" },
          ],
        },
        { key: "accentColor", label: "Accent colour", type: "color", group: "style", default: "#0d9488" },
        { key: "cardBackground", label: "Card background", type: "color", group: "style", default: "#ffffff" },
        { key: "autoplay", label: "Auto-advance", type: "toggle", group: "behaviour", default: true },
        { key: "interval", label: "Interval (seconds)", type: "number", group: "behaviour", default: 5, min: 2, max: 30 },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Homepage Quotes", useCase: "Landing page", industry: "General", preset: {} },
      { name: "Manual Slider", useCase: "Reviews", industry: "General", preset: { autoplay: false } },
    ],
  },

  // 40 ── Typing Effect ───────────────────────────────────────────────────────
  {
    key: "typewriter",
    name: "Typing Effect",
    categorySlug: "content",
    badges: ["Content"],
    description: "An animated headline that types and deletes rotating phrases.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "prefix", label: "Static prefix", type: "text", group: "content", default: "We help you " },
        {
          key: "phrases", label: "Rotating phrases", type: "list", group: "content", addLabel: "Add phrase",
          default: [
            { text: "grow sales." },
            { text: "capture leads." },
            { text: "delight customers." },
          ],
          itemFields: [{ key: "text", label: "Phrase", type: "text", group: "content", default: "" }],
        },
        { key: "align", label: "Alignment", type: "select", group: "layout", default: "center",
          options: [{ value: "left", label: "Left" }, { value: "center", label: "Center" }] },
        { key: "fontSize", label: "Font size (px)", type: "number", group: "style", default: 34, min: 16, max: 72 },
        { key: "textColor", label: "Text colour", type: "color", group: "style", default: "#0f172a" },
        { key: "accentColor", label: "Phrase colour", type: "color", group: "style", default: "#0d9488" },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Hero Headline", useCase: "Landing page", industry: "General", preset: {} },
      { name: "Left Aligned", useCase: "Section header", industry: "General", preset: { align: "left" } },
    ],
  },

  // 41 ── Flip Cards ──────────────────────────────────────────────────────────
  {
    key: "flipcard",
    name: "Flip Cards",
    categorySlug: "content",
    badges: ["Content"],
    description: "Cards that flip to reveal more detail on hover or click.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        {
          key: "items", label: "Cards", type: "list", group: "content", addLabel: "Add card",
          default: [
            { icon: "🚀", front: "Fast", back: "Launch your widget in under five minutes with zero code." },
            { icon: "🎯", front: "Focused", back: "Purpose-built tools that do one job really well." },
            { icon: "💬", front: "Supported", back: "Friendly humans ready to help whenever you need it." },
          ],
          itemFields: [
            { key: "icon", label: "Icon (emoji)", type: "text", group: "content", default: "⭐" },
            { key: "front", label: "Front title", type: "text", group: "content", default: "" },
            { key: "back", label: "Back text", type: "textarea", group: "content", default: "" },
          ],
        },
        { key: "columns", label: "Columns", type: "number", group: "layout", default: 3, min: 1, max: 4 },
        { key: "trigger", label: "Flip on", type: "select", group: "behaviour", default: "hover",
          options: [{ value: "hover", label: "Hover" }, { value: "click", label: "Click / tap" }] },
        { key: "frontColor", label: "Front background", type: "color", group: "style", default: "#0d9488" },
        { key: "backColor", label: "Back background", type: "color", group: "style", default: "#0f172a" },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Feature Flips", useCase: "Landing page", industry: "General", preset: {} },
      { name: "Tap Cards", useCase: "Mobile", industry: "General", preset: { trigger: "click" } },
    ],
  },

  // 42 ── Promo Banner ────────────────────────────────────────────────────────
  {
    key: "banner",
    name: "Promo Banner",
    categorySlug: "marketing",
    badges: ["Conversion"],
    description: "A bold call-to-action band with a heading, subtext, and button.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Ready to grow your store?" },
        { key: "subtext", label: "Subtext", type: "textarea", group: "content", default: "Start free today — no credit card required." },
        { key: "ctaLabel", label: "Button label", type: "text", group: "content", default: "Get started" },
        { key: "ctaUrl", label: "Button URL", type: "url", group: "content", default: "#" },
        { key: "bgImage", label: "Background image (optional)", type: "image", group: "content", default: "" },
        { key: "align", label: "Alignment", type: "select", group: "layout", default: "center",
          options: [{ value: "left", label: "Left" }, { value: "center", label: "Center" }] },
        { key: "bgColor", label: "Background", type: "color", group: "style", default: "#0d9488" },
        { key: "textColor", label: "Text colour", type: "color", group: "style", default: "#ffffff" },
        { key: "buttonColor", label: "Button colour", type: "color", group: "style", default: "#ffffff" },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Sign-up CTA", useCase: "Landing page", industry: "SaaS", preset: {} },
      { name: "Sale Banner", useCase: "Promotion", industry: "E-commerce", preset: { heading: "Mega sale is live", ctaLabel: "Shop now" } },
    ],
  },

  // 43 ── Comparison Table ────────────────────────────────────────────────────
  {
    key: "comparison",
    name: "Comparison Table",
    categorySlug: "content",
    badges: ["Content"],
    description: "Compare plans or products across features in a clean matrix.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Compare plans" },
        { key: "col1", label: "Column 1 header", type: "text", group: "content", default: "Starter" },
        { key: "col2", label: "Column 2 header", type: "text", group: "content", default: "Pro" },
        { key: "col3", label: "Column 3 header", type: "text", group: "content", default: "Agency" },
        {
          key: "rows", label: "Rows", type: "list", group: "content", addLabel: "Add row",
          default: [
            { feature: "Widgets", v1: "1", v2: "Unlimited", v3: "Unlimited" },
            { feature: "Remove branding", v1: "no", v2: "yes", v3: "yes" },
            { feature: "Priority support", v1: "no", v2: "yes", v3: "yes" },
            { feature: "Client workspaces", v1: "no", v2: "no", v3: "yes" },
          ],
          itemFields: [
            { key: "feature", label: "Feature", type: "text", group: "content", default: "" },
            { key: "v1", label: "Column 1 value", type: "text", group: "content", default: "" },
            { key: "v2", label: "Column 2 value", type: "text", group: "content", default: "" },
            { key: "v3", label: "Column 3 value", type: "text", group: "content", default: "" },
          ],
        },
        { key: "highlight", label: "Highlight column", type: "select", group: "layout", default: "2",
          options: [{ value: "0", label: "None" }, { value: "1", label: "Column 1" }, { value: "2", label: "Column 2" }, { value: "3", label: "Column 3" }] },
        { key: "accentColor", label: "Accent colour", type: "color", group: "style", default: "#0d9488" },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Plan Comparison", useCase: "Pricing page", industry: "SaaS", preset: {} },
      { name: "Product Compare", useCase: "Store", industry: "E-commerce", preset: { col1: "Basic", col2: "Plus", col3: "Max" } },
    ],
  },

  // 44 ── Share Buttons ───────────────────────────────────────────────────────
  {
    key: "socialshare",
    name: "Share Buttons",
    categorySlug: "marketing",
    badges: ["Marketing"],
    description: "Let visitors share your page to social networks in one click.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "heading", label: "Heading", type: "text", group: "content", default: "Share this" },
        { key: "shareUrl", label: "URL to share (blank = current page)", type: "url", group: "content", default: "" },
        { key: "shareText", label: "Share text", type: "text", group: "content", default: "Check this out!" },
        {
          key: "networks", label: "Networks", type: "list", group: "content", addLabel: "Add network",
          default: [{ network: "facebook" }, { network: "twitter" }, { network: "linkedin" }, { network: "whatsapp" }, { network: "telegram" }, { network: "email" }, { network: "copy" }],
          itemFields: [
            { key: "network", label: "Network", type: "select", group: "content", default: "facebook",
              options: [
                { value: "facebook", label: "Facebook" }, { value: "twitter", label: "X / Twitter" }, { value: "linkedin", label: "LinkedIn" },
                { value: "whatsapp", label: "WhatsApp" }, { value: "telegram", label: "Telegram" }, { value: "email", label: "Email" },
                { value: "pinterest", label: "Pinterest" }, { value: "reddit", label: "Reddit" }, { value: "copy", label: "Copy link" },
              ] },
          ],
        },
        { key: "shape", label: "Shape", type: "select", group: "layout", default: "circle",
          options: [{ value: "circle", label: "Circle" }, { value: "square", label: "Rounded square" }] },
        { key: "size", label: "Icon size (px)", type: "number", group: "layout", default: 44, min: 28, max: 64 },
        { key: "align", label: "Alignment", type: "select", group: "layout", default: "left",
          options: [{ value: "left", label: "Left" }, { value: "center", label: "Center" }] },
        { key: "colorStyle", label: "Colour style", type: "select", group: "style", default: "brand",
          options: [{ value: "brand", label: "Brand colours" }, { value: "mono", label: "Monochrome" }] },
        { key: "monoColor", label: "Monochrome colour", type: "color", group: "style", default: "#0f172a" },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Blog Share", useCase: "Article pages", industry: "Content", preset: {} },
      { name: "Product Share", useCase: "Store", industry: "E-commerce", preset: { shape: "square" } },
    ],
  },

  // 45 ── Audio Player ────────────────────────────────────────────────────────
  {
    key: "audio",
    name: "Audio Player",
    categorySlug: "content",
    badges: ["Content"],
    description: "A clean audio player for podcasts, music, or voice notes.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.style, TABS.behaviour],
      fields: [
        { key: "title", label: "Title", type: "text", group: "content", default: "Episode 1 — Getting started" },
        { key: "artist", label: "Subtitle / artist", type: "text", group: "content", default: "The Growth Podcast" },
        { key: "audioUrl", label: "Audio file URL (mp3)", type: "url", group: "content", default: "" },
        { key: "artwork", label: "Artwork image", type: "image", group: "content", default: "" },
        { key: "accentColor", label: "Accent colour", type: "color", group: "style", default: "#0d9488" },
        { key: "bgColor", label: "Background", type: "color", group: "style", default: "#0f172a" },
        { key: "loop", label: "Loop", type: "toggle", group: "behaviour", default: false },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Podcast Episode", useCase: "Podcast page", industry: "Media", preset: {} },
      { name: "Music Track", useCase: "Artist site", industry: "Music", preset: {} },
    ],
  },

  // 46 ── Image Hotspots ──────────────────────────────────────────────────────
  {
    key: "imagehotspots",
    name: "Image Hotspots",
    categorySlug: "content",
    badges: ["Content"],
    description: "Add interactive pins to an image that reveal details on tap.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.style, TABS.behaviour],
      fields: [
        { key: "image", label: "Image", type: "image", group: "content", default: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200" },
        {
          key: "points", label: "Hotspots", type: "list", group: "content", addLabel: "Add hotspot",
          default: [
            { x: 30, y: 40, title: "Feature one", text: "Describe what this part does." },
            { x: 65, y: 60, title: "Feature two", text: "Add detail for this hotspot." },
          ],
          itemFields: [
            { key: "x", label: "X position (%)", type: "number", group: "content", default: 50, min: 0, max: 100 },
            { key: "y", label: "Y position (%)", type: "number", group: "content", default: 50, min: 0, max: 100 },
            { key: "title", label: "Title", type: "text", group: "content", default: "" },
            { key: "text", label: "Text", type: "textarea", group: "content", default: "" },
          ],
        },
        { key: "pinColor", label: "Pin colour", type: "color", group: "style", default: "#0d9488" },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Product Tour", useCase: "Product page", industry: "E-commerce", preset: {} },
      { name: "Diagram", useCase: "Explainer", industry: "General", preset: {} },
    ],
  },

  // 47 ── Rating Badge ────────────────────────────────────────────────────────
  {
    key: "rating",
    name: "Rating Badge",
    categorySlug: "social-proof",
    badges: ["Social Proof"],
    description: "Display an average star rating and review count as a trust badge.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "rating", label: "Rating (0–5)", type: "number", group: "content", default: 4.8, min: 0, max: 5 },
        { key: "count", label: "Number of reviews", type: "number", group: "content", default: 1240, min: 0 },
        { key: "label", label: "Label", type: "text", group: "content", default: "Rated by our customers" },
        { key: "source", label: "Source (optional)", type: "text", group: "content", default: "" },
        { key: "layout", label: "Layout", type: "select", group: "layout", default: "card",
          options: [{ value: "card", label: "Card" }, { value: "inline", label: "Inline badge" }] },
        { key: "starColor", label: "Star colour", type: "color", group: "style", default: "#f59e0b" },
        { key: "showCount", label: "Show review count", type: "toggle", group: "behaviour", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Trust Badge", useCase: "Product page", industry: "E-commerce", preset: {} },
      { name: "Inline Rating", useCase: "Header", industry: "General", preset: { layout: "inline" } },
    ],
  },

  // 48 ── Contact Card ────────────────────────────────────────────────────────
  {
    key: "contactcard",
    name: "Contact Card",
    categorySlug: "contact-chat",
    badges: ["No-code"],
    description: "A tidy business card with call, email, and directions buttons.",
    isAi: false,
    schema: {
      tabs: [TABS.content, TABS.style, TABS.behaviour],
      fields: [
        { key: "name", label: "Name", type: "text", group: "content", default: "Priya Sharma" },
        { key: "role", label: "Role", type: "text", group: "content", default: "Customer Success Lead" },
        { key: "company", label: "Company", type: "text", group: "content", default: "Acme Co." },
        { key: "avatar", label: "Photo", type: "image", group: "content", default: "" },
        { key: "phone", label: "Phone", type: "tel", group: "content", default: "" },
        { key: "email", label: "Email", type: "email", group: "content", default: "" },
        { key: "address", label: "Address", type: "text", group: "content", default: "" },
        { key: "website", label: "Website", type: "url", group: "content", default: "" },
        { key: "accentColor", label: "Accent colour", type: "color", group: "style", default: "#0d9488" },
        { key: "rounded", label: "Rounded corners", type: "toggle", group: "style", default: true },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Team Member", useCase: "About page", industry: "General", preset: {} },
      { name: "Store Contact", useCase: "Contact page", industry: "Retail", preset: {} },
    ],
  },

  // 49 ── AI Assistant (Chatbot) ──────────────────────────────────────────────
  {
    key: "chatbot",
    name: "AI Assistant",
    categorySlug: "contact-chat",
    badges: ["New", "AI"],
    description: "A floating chat assistant that answers visitor questions from your own knowledge base — powered by AI you can train.",
    isAi: true,
    schema: {
      tabs: [TABS.content, TABS.layout, TABS.style, TABS.behaviour],
      fields: [
        { key: "botName", label: "Assistant name", type: "text", group: "content", default: "Assistant" },
        { key: "welcomeMessage", label: "Welcome message", type: "textarea", group: "content", default: "Hi 👋 I'm here to help. Ask me anything about our products, shipping, or returns." },
        { key: "inputPlaceholder", label: "Input placeholder", type: "text", group: "content", default: "Type your message…" },
        { key: "businessInfo", label: "About your business (AI context)", type: "textarea", group: "content", default: "We are an online store offering quality products with fast shipping across India and friendly customer support.", help: "The assistant uses this plus the Q&A below to answer. This is your training data — expand it any time." },
        {
          key: "knowledge", label: "Knowledge base (Q&A)", type: "list", group: "content", addLabel: "Add Q&A",
          default: [
            { question: "What are your shipping times?", answer: "We ship within 24 hours and delivery usually takes 3–5 business days across India." },
            { question: "What is your return policy?", answer: "You can return any item within 30 days for a full refund." },
            { question: "How do I track my order?", answer: "You'll receive a tracking link by SMS and email as soon as your order ships." },
            { question: "Do you offer cash on delivery?", answer: "Yes, cash on delivery is available on most orders." },
          ],
          itemFields: [
            { key: "question", label: "Question", type: "text", group: "content", default: "" },
            { key: "answer", label: "Answer", type: "textarea", group: "content", default: "" },
          ],
        },
        { key: "knowledgeBase", label: "Knowledge base (detailed info)", type: "textarea", group: "content", default: "Shipping: We ship pan-India within 24 hours. Standard delivery is 3–5 business days; metro cities are often faster. We currently ship only within India.\n\nReturns & refunds: Items can be returned within 30 days of delivery for a full refund, as long as they're unused and in original packaging. Refunds are processed to the original payment method within 5–7 business days.\n\nPayments: We accept UPI, major credit/debit cards, net banking, and cash on delivery (COD) on most orders.\n\nOrder tracking: A tracking link is sent by SMS and email as soon as your order ships. You can reply to that message any time for an update.\n\nContact: Our support team is available Mon–Sat, 10am–7pm IST and typically replies within a few hours.", help: "Paste detailed information (shipping, returns, policies, product details…). The assistant automatically pulls the most relevant parts for each question — so you can add a lot here. One topic per paragraph works best." },
        {
          key: "suggestions", label: "Quick replies", type: "list", group: "content", addLabel: "Add quick reply",
          default: [{ text: "Shipping times" }, { text: "Return policy" }, { text: "Track my order" }],
          itemFields: [{ key: "text", label: "Text", type: "text", group: "content", default: "" }],
        },
        { key: "fallbackMessage", label: "Fallback reply", type: "textarea", group: "content", default: "I'm not fully sure about that — let me connect you with our team. You can also drop us a message and we'll reply shortly." },
        { key: "position", label: "Position", type: "select", group: "layout", default: "bottom-right",
          options: [{ value: "bottom-right", label: "Bottom right" }, { value: "bottom-left", label: "Bottom left" }] },
        { key: "launcherLabel", label: "Launcher label (optional)", type: "text", group: "layout", default: "Chat with us" },
        { key: "launcherIcon", label: "Launcher icon (emoji)", type: "text", group: "style", default: "💬" },
        { key: "avatar", label: "Assistant avatar", type: "image", group: "style", default: "" },
        { key: "primaryColor", label: "Primary colour", type: "color", group: "style", default: "#0d9488" },
        { key: "aiEnabled", label: "Use AI (DeepSeek)", type: "toggle", group: "behaviour", default: true, help: "When on, replies are generated by AI from your knowledge base. When off (or no AI key configured), the assistant answers from the Q&A above." },
        { key: "openByDefault", label: "Open on load", type: "toggle", group: "behaviour", default: false },
      ],
    },
    defaultConfig: {},
    templates: [
      { name: "Support Assistant", useCase: "Customer support", industry: "E-commerce", preset: {} },
      { name: "Sales Helper", useCase: "Lead capture", industry: "Services", preset: { botName: "Sales Assistant", welcomeMessage: "Hi! Looking for the right plan? I can help you decide." } },
    ],
  },
];

export function toolByKey(key: string): ToolDef | undefined {
  return TOOLS.find((t) => t.key === key);
}
