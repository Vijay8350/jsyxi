export const SITE_URL = "https://jsyxi.com";
export const SITE_NAME = "jsyxi";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const MIN_INDEXABLE_CASE_STUDY_WORDS = 300;

export type CaseStudyCluster = "commerce" | "leads" | "software";

const CASE_STUDY_SEO_TITLES: Record<string, string> = {
  "skincare-store-trust-product-reviews": "D2C Skincare Reviews and Product Trust Case Study",
  "fashion-boutique-mobile-conversion": "Mobile Fashion Conversion Case Study",
  "home-decor-whatsapp-consultations": "Home Decor WhatsApp Consultations Case Study",
  "food-brand-product-launch-countdown": "Specialty Food Product Launch Funnel Case Study",
  "jewellery-store-social-proof": "Online Jewellery Social Proof Case Study",
  "subscription-brand-retention-journey": "Wellness Subscription Retention Case Study",
  "shopify-store-conversion-sprint": "Shopify Conversion Sprint Case Study",
  "saas-demo-request-routing": "B2B SaaS Demo Request Routing Case Study",
  "clinic-multi-location-discovery": "Multi-Location Clinic Discovery Case Study",
  "education-webinar-lead-funnel": "Education Webinar Lead Funnel Case Study",
  "real-estate-qualified-inquiries": "Real Estate Qualified Enquiries Case Study",
  "restaurant-digital-menu-hours": "Mobile Restaurant Discovery Case Study",
  "fitness-studio-class-inquiries": "Fitness Studio Class Enquiries Case Study",
  "travel-operator-whatsapp-inquiries": "Travel WhatsApp Enquiry Workflow Case Study",
  "manufacturer-quote-crm-workflow": "B2B Manufacturing Quote-to-CRM Case Study",
  "logistics-operations-dashboard": "Logistics Operations Dashboard Case Study",
  "retailer-store-locator-rollout": "Retail Store Locator Rollout Case Study",
  "professional-services-seo-funnel": "Professional Services SEO Funnel Case Study",
  "mobile-commerce-loyalty-app": "Mobile Commerce Loyalty App Case Study",
  "agency-multi-client-widget-ops": "Agency Widget Operations Case Study",
};

const COMMERCE_SLUGS = /^(skincare|fashion|home-decor|food-brand|jewellery|subscription|shopify|mobile-commerce)/;
const LEAD_SLUGS = /^(saas|clinic|education|real-estate|restaurant|fitness|travel|professional-services)/;

function truncateAtWord(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  const draft = value.slice(0, Math.max(0, maxLength - 3));
  const lastSpace = draft.lastIndexOf(" ");
  return `${(lastSpace > 30 ? draft.slice(0, lastSpace) : draft).trimEnd()}...`;
}

export function absoluteSiteUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  try {
    const url = new URL(path, SITE_URL);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function caseStudyPageUrl(slug: string): string {
  return `${SITE_URL}/case-studies/${encodeURIComponent(slug)}`;
}

export function contentWordCount(body: string): number {
  return body.trim() ? body.trim().split(/\s+/).length : 0;
}

export function isIndexableCaseStudy(body: string): boolean {
  return contentWordCount(body) >= MIN_INDEXABLE_CASE_STUDY_WORDS;
}

export function caseStudySeoTitle(slug: string, fallbackTitle: string): string {
  return CASE_STUDY_SEO_TITLES[slug] ?? fallbackTitle;
}

export function caseStudySeoDescription(excerpt: string | null | undefined): string | undefined {
  if (!excerpt) return undefined;
  const normalized = excerpt.replace(/\s+/g, " ").trim();
  const prefix = "Illustrative case study:";

  if (!normalized.toLowerCase().startsWith(prefix.toLowerCase())) {
    return truncateAtWord(normalized, 160);
  }

  const unlabelled = normalized.slice(prefix.length).trim();
  const core = unlabelled
    ? `${unlabelled.charAt(0).toUpperCase()}${unlabelled.slice(1)}`
    : "A practical implementation example";
  const suffix = " Illustrative scenario.";
  return `${truncateAtWord(core, 160 - suffix.length)}${suffix}`;
}

export function caseStudyCluster(slug: string): CaseStudyCluster {
  if (COMMERCE_SLUGS.test(slug)) return "commerce";
  if (LEAD_SLUGS.test(slug)) return "leads";
  return "software";
}

export function caseStudyClusterLabel(slug: string): string {
  switch (caseStudyCluster(slug)) {
    case "commerce":
      return "Ecommerce and conversion";
    case "leads":
      return "Lead generation and discovery";
    case "software":
      return "Software and operations";
  }
}
