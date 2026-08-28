// Configuration + knowledge base for the site-wide AI assistant shown on every
// marketing page. Plain data (no server imports) so it can be used both by the
// client component that renders the chatbot UI and by the /api/assistant route
// that answers via DeepSeek. This is the assistant's "training" — edit freely.

export const SITE_ASSISTANT_CONFIG = {
  botName: "Jsyxi Assistant",
  welcomeMessage: "Hi 👋 I'm the Jsyxi assistant. Ask me about our widgets, pricing, or how to add one to your website.",
  inputPlaceholder: "Ask about widgets, pricing, embedding…",
  businessInfo:
    "Jsyxi is a no-code platform for embeddable website widgets. You create a widget, customize it with a live preview, publish it, and add it to any website with one line of embed code. There are 49+ widgets across categories like social proof (reviews, ratings, stats), marketing (popups, announcement bars, countdowns, coupons, banners), forms & lead capture, contact & chat (WhatsApp, social icons, contact cards, AI assistant), content (galleries, sliders, tabs, FAQ, video, pricing tables) and utilities. Jsyxi also offers an agency service that can set widgets up for you. It works on any website or CMS — Shopify, WordPress, Wix, custom sites — because the embed is a single script tag.",
  knowledge: [
    { question: "What is Jsyxi?", answer: "Jsyxi is a no-code platform for embeddable website widgets — create, customize, publish, and add them to any site with one line of code. There are 49+ widgets to choose from." },
    { question: "How do I add a widget to my website?", answer: "Pick a widget, customize it, hit Publish, then copy the one-line embed snippet and paste it into your site's HTML. It works on Shopify, WordPress, Wix, and custom sites." },
    { question: "Do you have a free plan?", answer: "Yes — you can start for free and publish a widget with Jsyxi branding. Paid plans remove branding and raise limits." },
    { question: "How much does it cost / pricing?", answer: "There's a free plan to get started, plus paid plans with more widgets, higher view limits, and branding removal. See the Pricing page for current details." },
    { question: "What widgets do you have?", answer: "49+ widgets including reviews, ratings, countdowns, popups, announcement bars, forms, WhatsApp chat, an AI assistant, galleries, sliders, tabs, FAQ, pricing tables, stats counters, coupons, maps, and more." },
    { question: "Do I need to know how to code?", answer: "No. Everything is configured in a simple form with a live preview. The only code is the single embed line you paste once." },
    { question: "Can you build it for me?", answer: "Yes — our agency service can design and set up widgets for you. Reach out via the Contact page and we'll help." },
    { question: "How do I sign up?", answer: "Click Sign up to create a free account, then head to the catalog to build your first widget." },
    { question: "Does it work on Shopify or WordPress?", answer: "Yes. The embed is a single script tag, so it works on Shopify, WordPress, Wix, Webflow, and any custom website." },
    { question: "Is there an AI chatbot widget?", answer: "Yes — the AI Assistant widget is a floating chat bubble you can train with your own Q&A and business info, powered by AI. You can add it to your own site too." },
  ],
  suggestions: [
    { text: "What is Jsyxi?" },
    { text: "Pricing" },
    { text: "How do I embed a widget?" },
    { text: "Do you have a free plan?" },
  ],
  fallbackMessage:
    "I'm not fully sure about that — you can explore our tools, check the Pricing page, or contact our team and we'll help you out.",
  position: "bottom-right",
  launcherLabel: "Ask Jsyxi",
  launcherIcon: "🤖",
  avatar: "",
  primaryColor: "#0d9488",
  aiEnabled: true,
  openByDefault: false,
} as const;

export const SITE_ASSISTANT_FALLBACK = SITE_ASSISTANT_CONFIG.fallbackMessage;
