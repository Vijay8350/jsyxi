// Day-one seed (A1-12, R2V1-05, §5). Idempotent-ish: upserts by unique keys; demo data guarded.
// Run: npm run db:seed  (or prisma migrate reset re-runs it)

import { PrismaClient } from "../src/generated/prisma";
import { hashPassword } from "../src/lib/crypto";
import { newEmbedKey } from "../src/lib/ids";
import { TOOLS, CATEGORIES } from "../src/lib/tools/registry";
import { defaultsFromSchema } from "../src/lib/tools/types";
import { gstBreakdownInclusive } from "../src/lib/money";
import { financialYear, addMonths, dayKeyToColumnDate, localDateKey } from "../src/lib/time";

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
  await seedContent(staffMap);
  console.log("  marketing content + testimonials");
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
