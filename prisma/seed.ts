// Day-one seed (A1-12, R2V1-05, §5). Idempotent-ish: upserts by unique keys; demo data guarded.
// Run: npm run db:seed  (or prisma migrate reset re-runs it)

import { PrismaClient } from "../src/generated/prisma";
import { hashPassword } from "../src/lib/crypto";
import { newEmbedKey } from "../src/lib/ids";
import { TOOLS, CATEGORIES } from "../src/lib/tools/registry";
import { defaultsFromSchema } from "../src/lib/tools/types";
import { gstBreakdownInclusive } from "../src/lib/money";
import { financialYear, addMonths, dayKeyToColumnDate, localDateKey } from "../src/lib/time";
import { BLOG_LIBRARY } from "./blog-library";
import { CASE_STUDY_LIBRARY } from "./case-study-library";

const prisma = new PrismaClient();
const TZ = "Asia/Kolkata";

async function seedCategories() {
  const map = new Map<string, string>();
  for (const c of CATEGORIES) {
    const row = await prisma.toolCategory.upsert({
      where: { slug: c.slug },
      update: { name: c.name, sortOrder: c.sortOrder },
      create: { slug: c.slug, name: c.name, sortOrder: c.sortOrder },
    });
    map.set(c.slug, row.id);
  }
  return map;
}

async function seedTools(categoryMap: Map<string, string>) {
  const map = new Map<string, string>();
  let sort = 0;
  for (const t of TOOLS) {
    const categoryId = categoryMap.get(t.categorySlug)!;
    const tool = await prisma.tool.upsert({
      where: { key: t.key },
      update: {
        name: t.name,
        categoryId,
        badges: t.badges,
        description: t.description,
        configSchema: t.schema as object,
        isAi: t.isAi,
        sortOrder: sort,
        status: "published",
      },
      create: {
        key: t.key,
        name: t.name,
        categoryId,
        badges: t.badges,
        description: t.description,
        configSchema: t.schema as object,
        isAi: t.isAi,
        sortOrder: sort,
        status: "published",
      },
    });
    map.set(t.key, tool.id);
    sort += 1;

    // Templates (create once per tool if none exist).
    const existing = await prisma.template.count({ where: { toolId: tool.id } });
    if (existing === 0) {
      const base = defaultsFromSchema(t.schema);
      let tsort = 0;
      for (const tpl of t.templates) {
        await prisma.template.create({
          data: {
            toolId: tool.id,
            name: tpl.name,
            useCase: tpl.useCase,
            industry: tpl.industry,
            presetConfig: { ...base, ...tpl.preset } as object,
            status: "published",
            sortOrder: tsort++,
          },
        });
      }
    }
  }
  return map;
}

async function seedPlans() {
  const plans = [
    {
      slug: "free", name: "Free", isFree: true, priceAmount: null as number | null,
      maxWidgets: 1, maxMonthlyViews: 1000, maxProjects: 0, maxMembers: 1,
      brandingRemovable: false, prioritySupport: false, freeInstallation: false, sortOrder: 0,
    },
    {
      slug: "starter", name: "Starter", isFree: false, priceAmount: 49900,
      maxWidgets: 3, maxMonthlyViews: 10000, maxProjects: 1, maxMembers: 1,
      brandingRemovable: true, prioritySupport: false, freeInstallation: false, sortOrder: 1,
    },
    {
      slug: "pro", name: "Pro", isFree: false, priceAmount: 149900,
      maxWidgets: 10, maxMonthlyViews: 100000, maxProjects: 5, maxMembers: 3,
      brandingRemovable: true, prioritySupport: true, freeInstallation: true, sortOrder: 2,
    },
    {
      slug: "agency", name: "Agency", isFree: false, priceAmount: 499900,
      maxWidgets: 50, maxMonthlyViews: 1000000, maxProjects: 50, maxMembers: 10,
      brandingRemovable: true, prioritySupport: true, freeInstallation: true, sortOrder: 3,
    },
  ];
  const map = new Map<string, string>();
  for (const p of plans) {
    const annualDiscount = p.priceAmount ? p.priceAmount * 2 : 0; // ~2 months free
    const row = await prisma.plan.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name, isFree: p.isFree, priceAmount: p.priceAmount, annualDiscount,
        maxWidgets: p.maxWidgets, maxMonthlyViews: p.maxMonthlyViews, maxProjects: p.maxProjects,
        maxMembers: p.maxMembers, brandingRemovable: p.brandingRemovable,
        prioritySupport: p.prioritySupport, freeInstallation: p.freeInstallation, sortOrder: p.sortOrder,
      },
      create: {
        slug: p.slug, name: p.name, isFree: p.isFree, priceAmount: p.priceAmount, annualDiscount,
        purchaseMode: "all_access", priceCurrency: "INR", billingInterval: "monthly",
        maxWidgets: p.maxWidgets, maxMonthlyViews: p.maxMonthlyViews, maxProjects: p.maxProjects,
        maxMembers: p.maxMembers, brandingRemovable: p.brandingRemovable,
        prioritySupport: p.prioritySupport, freeInstallation: p.freeInstallation, sortOrder: p.sortOrder,
      },
    });
    map.set(p.slug, row.id);
  }
  return map;
}

async function seedStaff() {
  const pw = await hashPassword("jsyxi-admin");
  const staff = [
    { email: "admin@jsyxi.local", name: "Platform Admin", staffRole: "owner_admin" as const },
    { email: "marketing@jsyxi.local", name: "Maya Marketing", staffRole: "marketing" as const },
    { email: "sales@jsyxi.local", name: "Sam Sales", staffRole: "sales" as const },
    { email: "support@jsyxi.local", name: "Sunita Support", staffRole: "support" as const },
    { email: "content@jsyxi.local", name: "Chris Content", staffRole: "content" as const },
    { email: "finance@jsyxi.local", name: "Farah Finance", staffRole: "finance" as const },
  ];
  const map = new Map<string, string>();
  for (const s of staff) {
    const row = await prisma.staffUser.upsert({
      where: { email: s.email },
      update: { name: s.name, staffRole: s.staffRole, status: "active" },
      create: { email: s.email, name: s.name, staffRole: s.staffRole, passwordHash: pw, status: "active" },
    });
    map.set(s.staffRole, row.id);
  }
  return map;
}

async function seedQueues() {
  const queues = [
    { slug: "new-leads", name: "New leads", isDefault: true, serviceTopicMap: [] as string[], assignmentMode: "manual" as const, sortOrder: 0 },
    { slug: "upgrades", name: "Upgrades", isDefault: false, serviceTopicMap: ["request-upgrade"], assignmentMode: "manual" as const, sortOrder: 1 },
    { slug: "quotes", name: "Sales quotes", isDefault: false, serviceTopicMap: ["quote"], assignmentMode: "round_robin" as const, sortOrder: 2 },
    { slug: "consultations", name: "Consultations", isDefault: false, serviceTopicMap: ["consultation"], assignmentMode: "round_robin" as const, sortOrder: 3 },
  ];
  for (const q of queues) {
    await prisma.leadQueue.upsert({
      where: { slug: q.slug },
      update: { name: q.name, isDefault: q.isDefault, serviceTopicMap: q.serviceTopicMap, assignmentMode: q.assignmentMode, sortOrder: q.sortOrder },
      create: q,
    });
  }
}

async function seedIncentives() {
  const existing = await prisma.incentiveProgram.findFirst({ where: { kind: "referral" } });
  const program = existing
    ? existing
    : await prisma.incentiveProgram.create({
        data: {
          kind: "referral",
          name: "Refer a Friend",
          rules: { referrerReward: "₹500 account credit", friendReward: "20% off first paid plan" },
          trackingEnabled: true,
          status: "active",
        },
      });

  await prisma.coupon.upsert({
    where: { code: "LAUNCH20" },
    update: {},
    create: { code: "LAUNCH20", type: "promo", value: 2000, valueKind: "percent", status: "active" },
  });
  await prisma.coupon.upsert({
    where: { code: "FRIEND20" },
    update: { programId: program.id },
    create: { code: "FRIEND20", type: "refer_a_friend", value: 2000, valueKind: "percent", programId: program.id, status: "active" },
  });
  return program;
}

async function seedTestimonials() {
  if ((await prisma.siteTestimonial.count()) > 0) return;
  await prisma.siteTestimonial.createMany({
    data: [
      { authorName: "Neha Kapoor", authorRole: "Founder, Bloom Botanicals", rating: 5, body: "We added reviews and a countdown to our store in an afternoon. Conversions are up and support has been fantastic.", approved: true, featured: true, sortOrder: 0 },
      { authorName: "Arjun Verma", authorRole: "Marketing Lead, TenderLeaf", rating: 5, body: "The lead forms plug straight into our CRM. It replaced three separate tools for us.", approved: true, featured: true, sortOrder: 1 },
      { authorName: "Divya R.", authorRole: "Owner, Studio Craft", rating: 5, body: "No code, no fuss. The WhatsApp button alone paid for itself in a week.", approved: true, featured: true, sortOrder: 2 },
      { authorName: "Karan M.", authorRole: "Agency Partner", rating: 4, body: "Managing multiple client widgets from one place is a huge time saver.", approved: true, featured: false, sortOrder: 3 },
    ],
  });
}

// Per-tool reviews shown under each widget's live demo on /tools/[key]. Idempotent
// alongside the general testimonials above (guarded on tool-scoped rows existing).
async function seedToolTestimonials() {
  if ((await prisma.siteTestimonial.count({ where: { toolKey: { not: null } } })) > 0) return;
  const byTool: Record<string, { authorName: string; authorRole: string; rating: number; body: string }[]> = {
    reviews: [
      { authorName: "Priya S.", authorRole: "Owner, Saffron Kitchen", rating: 5, body: "Star ratings from real buyers now sit right on our product pages — average order value climbed within the first month." },
      { authorName: "Rahul Nair", authorRole: "D2C Founder", rating: 5, body: "Importing reviews took minutes and the layouts look native to our theme. Social proof that actually converts." },
      { authorName: "Meera J.", authorRole: "Marketing, Urban Roots", rating: 4, body: "Moderation and replies are handy. Would love a couple more layout presets, otherwise excellent." },
    ],
    countdown: [
      { authorName: "Aditya K.", authorRole: "Growth, PixelCart", rating: 5, body: "Our flash-sale countdown created real urgency — checkout completions jumped on sale days." },
      { authorName: "Sana M.", authorRole: "Founder, Bloom & Co", rating: 5, body: "Set it up for a launch in five minutes. The evergreen per-visitor timer is brilliant." },
    ],
    form: [
      { authorName: "Vikram D.", authorRole: "Ops Lead, TenderLeaf", rating: 5, body: "Every submission lands as a lead in our dashboard. Replaced a paid form tool entirely." },
      { authorName: "Nisha R.", authorRole: "Studio Craft", rating: 4, body: "Clean builder, good validation. Booking enquiries doubled after we embedded it." },
    ],
    whatsapp: [
      { authorName: "Imran S.", authorRole: "Retailer", rating: 5, body: "The floating WhatsApp button is the best add we made — customers message us before they bounce." },
      { authorName: "Kavya P.", authorRole: "Boutique owner", rating: 5, body: "Pre-filled messages and business hours make it feel professional. Paid for itself in a week." },
    ],
    faq: [
      { authorName: "Deepak V.", authorRole: "Support Lead", rating: 5, body: "Support tickets dropped noticeably once the FAQ accordion went live on our key pages." },
      { authorName: "Ananya T.", authorRole: "Founder", rating: 4, body: "Searchable, clean, and easy to update. Exactly what we needed." },
    ],
    popup: [
      { authorName: "Rohan G.", authorRole: "Ecommerce Manager", rating: 5, body: "Email captures via the exit popup grew our list fast without annoying visitors." },
      { authorName: "Sneha L.", authorRole: "Marketer", rating: 4, body: "Targeting rules are flexible — great for announcements and offers." },
    ],
    instagram: [
      { authorName: "Tara M.", authorRole: "Creator brand", rating: 5, body: "The Instagram feed keeps our homepage fresh automatically and looks gorgeous on mobile." },
    ],
    maps: [
      { authorName: "Harish B.", authorRole: "Café owner", rating: 5, body: "Customers find our store instantly now — directions in one tap, no more 'where are you?' calls." },
    ],
    gallery: [
      { authorName: "Fatima Z.", authorRole: "Photographer", rating: 5, body: "A stunning way to show my portfolio. The lightbox is smooth and fast." },
    ],
    slider: [
      { authorName: "Manish A.", authorRole: "Agency", rating: 4, body: "Perfect for hero banners and client testimonials. Easy to theme to each brand." },
    ],
  };
  const rows = Object.entries(byTool).flatMap(([toolKey, list]) =>
    list.map((r, i) => ({ ...r, approved: true, featured: false, sortOrder: i, toolKey })),
  );
  await prisma.siteTestimonial.createMany({ data: rows });
}

async function seedContent(staffMap: Map<string, string>) {
  if ((await prisma.contentItem.count()) > 0) return;
  const author = staffMap.get("content") ?? null;
  const now = new Date();
  await prisma.contentItem.createMany({
    data: [
      { type: "blog", title: "5 widgets every store should install in 2026", slug: "5-widgets-every-store-2026", excerpt: "From reviews to countdowns — the no-code additions that move the needle.", body: "Social proof, urgency, and easy contact are the three levers that lift conversion. Here's how to add all three without touching your theme's code...", status: "published", authorStaffId: author, publishedAt: now },
      { type: "blog", title: "How to collect more leads without a developer", slug: "collect-more-leads-no-developer", excerpt: "A practical guide to lead-gen forms that actually convert.", body: "The best lead form is short, focused, and routed to the right person instantly. In this guide we walk through building one...", status: "published", authorStaffId: author, publishedAt: now },
      { type: "case_study", title: "Bloom Botanicals grew repeat sales 32% with reviews + countdowns", slug: "bloom-botanicals-case-study", excerpt: "How a small skincare brand used social proof and urgency together.", body: "Bloom Botanicals wanted to build trust with first-time visitors while nudging returning customers to act...", status: "published", authorStaffId: author, publishedAt: now },
      { type: "help_article", title: "Installing your widget's embed snippet", slug: "installing-embed-snippet", excerpt: "Copy one line of code into your site — here's how, on every platform.", body: "Every widget you publish comes with a single embed snippet. Copy it from the builder and paste it before the closing </body> tag...", status: "published", authorStaffId: author, publishedAt: now },
      { type: "help_article", title: "Understanding views and your monthly limit", slug: "understanding-views-and-limits", excerpt: "What counts as a view, and what happens if you go over.", body: "A view is counted once per visitor per page load of a published widget, after excluding bots and duplicates within 30 minutes...", status: "published", authorStaffId: author, publishedAt: now },
    ],
  });
}

async function seedBlogLibrary(staffMap: Map<string, string>) {
  const authorStaffId = staffMap.get("content") ?? null;

  for (const post of BLOG_LIBRARY) {
    await prisma.contentItem.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        type: "blog",
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        coverImage: post.coverImage,
        status: "published",
        authorStaffId,
        publishedAt: new Date(post.publishedAt),
      },
    });
  }
}

async function seedCaseStudyLibrary(staffMap: Map<string, string>) {
  const authorStaffId = staffMap.get("content") ?? null;

  for (const study of CASE_STUDY_LIBRARY) {
    await prisma.contentItem.upsert({
      where: { slug: study.slug },
      update: {},
      create: {
        type: "case_study",
        title: study.title,
        slug: study.slug,
        excerpt: study.excerpt,
        body: study.body,
        coverImage: study.coverImage,
        status: "published",
        authorStaffId,
        publishedAt: new Date(study.publishedAt),
      },
    });
  }
}

async function seedDemoCustomer(planMap: Map<string, string>, toolMap: Map<string, string>) {
  const email = "demo@jsyxi.local";
  if (await prisma.user.findUnique({ where: { email } })) {
    console.log("  demo customer already present — skipping");
    return;
  }
  const now = new Date();
  const pw = await hashPassword("jsyxi-demo");
  const user = await prisma.user.create({
    data: { email, name: "Demo User", passwordHash: pw, status: "active", emailVerifiedAt: now },
  });

  // Workspace A — Demo Store (Free)
  const freePlan = planMap.get("free")!;
  const wsA = await prisma.workspace.create({
    data: {
      name: "Demo Store", slug: "demo-store", ownerUserId: user.id, planId: freePlan,
      purchaseMode: "all_access", billingCurrency: "INR", timezone: TZ, status: "active",
    },
  });
  await prisma.membership.create({ data: { userId: user.id, workspaceId: wsA.id, workspaceRole: "owner", status: "active" } });
  await prisma.subscription.create({
    data: { workspaceId: wsA.id, planId: freePlan, state: "free", currentPeriodStart: now, currentPeriodEnd: addMonths(now, 1, TZ) },
  });
  await prisma.workspaceUsageRolling.create({
    data: { workspaceId: wsA.id, currentPeriodViewTotal: 0, periodStart: now, periodEnd: addMonths(now, 1, TZ) },
  });

  // A published Countdown widget with a few days of sample views.
  const countdownTool = TOOLS.find((t) => t.key === "countdown")!;
  const cfg = {
    ...defaultsFromSchema(countdownTool.schema),
    heading: "Launch offer ends in",
    endAt: new Date(now.getTime() + 7 * 864e5).toISOString(),
    accentColor: "#dc2626",
  };
  const widget = await prisma.widget.create({
    data: {
      workspaceId: wsA.id, toolId: toolMap.get("countdown")!, name: "Homepage Countdown",
      embedKey: newEmbedKey(), draftConfig: cfg as object, publishedConfig: cfg as object,
      lifecycleState: "published_active", allowedDomains: [], configVersion: 1, publishedAt: now,
    },
  });

  // Sample views across the last 6 local days.
  let total = 0;
  for (let d = 6; d >= 0; d--) {
    const day = new Date(now.getTime() - d * 864e5);
    const key = localDateKey(day, TZ);
    const count = 40 + Math.round(60 * (1 - d / 7)); // gently increasing
    await prisma.viewDailyAggregate.create({
      data: { widgetId: widget.id, date: dayKeyToColumnDate(key), workspaceId: wsA.id, toolId: toolMap.get("countdown")!, viewCount: count },
    });
    total += count;
  }
  await prisma.workspaceUsageRolling.update({ where: { workspaceId: wsA.id }, data: { currentPeriodViewTotal: total } });

  // Workspace B — Acme Agency (Pro, paid_active + GST invoice)
  const proPlan = planMap.get("pro")!;
  const adminStaff = await prisma.staffUser.findUnique({ where: { email: "finance@jsyxi.local" } });
  const wsB = await prisma.workspace.create({
    data: {
      name: "Acme Agency", slug: "acme-agency", ownerUserId: user.id, planId: proPlan,
      purchaseMode: "all_access", billingCurrency: "INR", timezone: TZ, gstin: "27AABCU9603R1ZM", status: "active",
    },
  });
  await prisma.membership.create({ data: { userId: user.id, workspaceId: wsB.id, workspaceRole: "owner", status: "active" } });
  await prisma.subscription.create({
    data: {
      workspaceId: wsB.id, planId: proPlan, state: "paid_active", currentPeriodStart: now, currentPeriodEnd: addMonths(now, 1, TZ),
      assignedByAdminId: adminStaff?.id ?? null, manualPaymentRef: "NEFT-DEMO-0001",
    },
  });
  await prisma.workspaceUsageRolling.create({
    data: { workspaceId: wsB.id, currentPeriodViewTotal: 0, periodStart: now, periodEnd: addMonths(now, 1, TZ) },
  });

  // GST invoice for the Pro assignment (F-GST, gap-free per FY).
  const fy = financialYear(now, TZ);
  const rate = 0.18;
  const total_ = 149900;
  const { gstAmount, taxable } = gstBreakdownInclusive(total_, rate);
  await prisma.invoice.create({
    data: {
      workspaceId: wsB.id, invoiceNumber: `JSY/${fy}/0001`, financialYear: fy, sequence: 1,
      currency: "INR", subtotal: taxable, gstAmount, gstRate: rate as unknown as never, total: total_,
      gstin: "27AABCU9603R1ZM", status: "paid",
      lineItems: [{ description: "Pro plan — 1 month", qty: 1, unitAmount: total_, amount: total_ }] as object,
    },
  });

  // Set default workspace.
  await prisma.user.update({ where: { id: user.id }, data: { defaultWorkspaceId: wsA.id } });

  // A sample inbound lead + a request-upgrade lead into the Upgrades queue.
  const upgradesQueue = await prisma.leadQueue.findUnique({ where: { slug: "upgrades" } });
  const quotesQueue = await prisma.leadQueue.findUnique({ where: { slug: "quotes" } });
  await prisma.lead.create({
    data: {
      source: "quote", serviceTopic: "quote", contactName: "Ritika Shah", contactEmail: "ritika@example.com",
      contactPhone: "+919812345678", message: "Need a landing page + reviews widget for a product launch.",
      assignedQueueId: quotesQueue?.id, pipelineStage: "new",
    },
  });
  await prisma.lead.create({
    data: {
      source: "request_upgrade", serviceTopic: "request-upgrade", contactName: "Demo User", contactEmail: email,
      message: "Requesting upgrade to Agency for Demo Store.", assignedQueueId: upgradesQueue?.id,
      workspaceId: wsA.id, pipelineStage: "new",
    },
  });

  console.log(`  demo customer: ${email} / jsyxi-demo (2 workspaces, 1 widget, ${total} views)`);
}

async function seedServices() {
  if ((await prisma.service.count()) > 0) return;
  const services = [
    {
      slug: "shopify-development", title: "Shopify Development", icon: "store",
      tagline: "Stores that sell, built on Shopify.",
      summary: "Custom Shopify themes, apps, and storefronts engineered for speed and conversion.",
      description:
        "From a brand-new store to a full replatform, we design and build high-converting Shopify experiences — custom themes, private apps, headless storefronts, and deep third-party integrations. Every build is fast, mobile-first, and ready to scale with your catalog.\n\nWe sweat the details that move revenue: Core Web Vitals, checkout UX, upsells, and clean data flowing into your marketing stack.",
      features: ["Custom theme design & development", "Private & public app development", "Headless / Hydrogen storefronts", "Payment, shipping & ERP integrations", "Speed & Core Web Vitals tuning", "Migration from other platforms"],
    },
    {
      slug: "ecommerce-development", title: "E-commerce Development", icon: "cart",
      tagline: "Sell anywhere, on any platform.",
      summary: "End-to-end online stores on WooCommerce, Magento, or a fully custom stack.",
      description:
        "Not on Shopify? No problem. We build robust e-commerce platforms on WooCommerce, Magento, or a bespoke headless stack — with catalog management, secure checkout, and the integrations your operations need.\n\nWe design for conversion and build for scale, so your store stays fast whether you sell ten products or ten thousand.",
      features: ["WooCommerce & Magento builds", "Custom cart & checkout flows", "Product & inventory management", "Multi-currency & multi-region", "Payment gateway integration", "Analytics & conversion tracking"],
    },
    {
      slug: "software-development", title: "Software Development", icon: "code",
      tagline: "Custom software, built to fit.",
      summary: "Bespoke web platforms and internal tools tailored to your exact workflow.",
      description:
        "When off-the-shelf tools don't fit, we build software that does. From SaaS platforms to internal dashboards and automation, our team ships secure, maintainable code with modern architecture and thorough testing.\n\nYou get a technical partner who plans, builds, and iterates with you — not just a vendor.",
      features: ["Web & SaaS platform development", "API design & integrations", "Workflow & process automation", "Cloud-native architecture", "Automated testing & CI/CD", "Ongoing maintenance & support"],
    },
    {
      slug: "custom-crm-development", title: "Custom CRM Development", icon: "crm",
      tagline: "A CRM shaped around your sales process.",
      summary: "Tailor-made CRM systems that match how your team actually sells.",
      description:
        "Generic CRMs force you to work their way. We build CRM systems around your pipeline — custom stages, automation, lead routing, and reporting — so your team spends time selling, not fighting software.\n\nEverything integrates with your website, forms, and marketing tools for a single source of truth.",
      features: ["Custom pipelines & stages", "Lead capture & auto-routing", "Task & follow-up automation", "Role-based access control", "Dashboards & sales reporting", "Email, WhatsApp & telephony integration"],
    },
    {
      slug: "system-application-development", title: "System Application Development", icon: "app",
      tagline: "Enterprise systems that run your operation.",
      summary: "ERP, inventory, and operations software that ties your business together.",
      description:
        "We build the backbone systems that keep operations running — ERP modules, inventory and warehouse management, billing, and internal portals — engineered for reliability and real-time visibility.\n\nBuilt to integrate with your existing tools and to grow as your processes mature.",
      features: ["ERP & inventory systems", "Billing & invoicing modules", "Warehouse & logistics tools", "Real-time dashboards & reports", "Role & permission management", "Third-party system integration"],
    },
    {
      slug: "server-network-solutions", title: "Server & Network Solutions", icon: "server",
      tagline: "Infrastructure that stays up.",
      summary: "Cloud servers, deployment, security, and monitoring — set up and managed right.",
      description:
        "From provisioning cloud servers to hardening security and setting up CI/CD, we handle the infrastructure so your applications stay fast, secure, and always on.\n\nWe design for uptime and cost-efficiency, with monitoring and backups that let you sleep at night.",
      features: ["Cloud server setup (AWS, GCP, VPS)", "Deployment & CI/CD pipelines", "SSL, firewalls & hardening", "Load balancing & scaling", "Monitoring, alerts & backups", "Network architecture & DNS"],
    },
    {
      slug: "mobile-app-development", title: "Mobile App Development", icon: "mobile",
      tagline: "Apps your customers keep on the home screen.",
      summary: "Native and cross-platform mobile apps for iOS and Android.",
      description:
        "We design and build mobile apps that feel great and perform — native or cross-platform (React Native / Flutter) — with clean UX, offline support, and secure backends.\n\nFrom concept to App Store and Play Store launch, we handle the whole journey.",
      features: ["iOS & Android development", "React Native & Flutter", "UI/UX design", "Push notifications & offline mode", "Secure API & backend", "App Store & Play Store launch"],
    },
    {
      slug: "digital-marketing-seo", title: "Digital Marketing & SEO", icon: "seo",
      tagline: "Get found. Get clicks. Get customers.",
      summary: "SEO, performance marketing, and content that grows qualified traffic.",
      description:
        "Great products need to be found. We grow your organic and paid reach with technical SEO, content strategy, and performance campaigns — all measured against revenue, not vanity metrics.\n\nYou get a clear monthly report and a team obsessed with your pipeline.",
      features: ["Technical & on-page SEO", "Keyword & content strategy", "Google & Meta ad campaigns", "Local SEO & Google Business", "Conversion rate optimization", "Monthly reporting & insights"],
    },
  ];
  await prisma.service.createMany({
    data: services.map((s, i) => ({ ...s, sortOrder: i, status: "published" as const })),
  });
}

async function main() {
  console.log("Seeding jsyxi day-one state…");
  const categoryMap = await seedCategories();
  console.log(`  categories: ${categoryMap.size}`);
  const toolMap = await seedTools(categoryMap);
  console.log(`  tools: ${toolMap.size} (+ templates)`);
  const planMap = await seedPlans();
  console.log(`  plans: ${planMap.size}`);
  const staffMap = await seedStaff();
  console.log(`  staff: ${staffMap.size} (password: jsyxi-admin)`);
  await seedQueues();
  console.log("  lead queues: 4 (New leads default, Upgrades)");
  await seedIncentives();
  console.log("  incentive program: referral + 2 coupons");
  await seedTestimonials();
  await seedToolTestimonials();
  await seedContent(staffMap);
  await seedBlogLibrary(staffMap);
  await seedCaseStudyLibrary(staffMap);
  console.log("  marketing content + testimonials");
  await seedServices();
  console.log("  agency services: 8");
  await seedDemoCustomer(planMap, toolMap);
  console.log("Done.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
