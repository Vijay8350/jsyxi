import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_URL, isIndexableCaseStudy } from "@/lib/seo";

// Content is managed in the database, so the sitemap must reflect publishing
// changes immediately instead of being frozen at build time.
export const dynamic = "force-dynamic";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/shopify", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/help", changeFrequency: "monthly", priority: 0.6 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [content, services, tools] = await Promise.all([
    prisma.contentItem.findMany({
      where: {
        status: "published",
        type: { in: ["blog", "case_study", "help_article"] },
      },
      select: {
        type: true,
        slug: true,
        coverImage: true,
        body: true,
        updatedAt: true,
      },
    }),
    prisma.service.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.tool.findMany({
      where: { status: "published" },
      select: { key: true, createdAt: true },
    }),
  ]);

  const indexableContent = content.filter(
    (item) => item.type !== "case_study" || isIndexableCaseStudy(item.body),
  );
  const newestUpdateFor = (type: "blog" | "case_study") =>
    indexableContent
      .filter((item) => item.type === type)
      .reduce<Date | undefined>(
        (latest, item) =>
          !latest || item.updatedAt > latest ? item.updatedAt : latest,
        undefined,
      );
  const blogLastModified = newestUpdateFor("blog");
  const caseStudiesLastModified = newestUpdateFor("case_study");

  const contentRoutes: MetadataRoute.Sitemap = indexableContent.map((item) => {
    const prefix =
      item.type === "blog"
        ? "/blog"
        : item.type === "case_study"
          ? "/case-studies"
          : "/help";
    const coverImage = item.coverImage
      ? item.coverImage.startsWith("/")
        ? `${SITE_URL}${item.coverImage}`
        : item.coverImage
      : null;

    return {
      url: `${SITE_URL}${prefix}/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: item.type === "blog" ? "monthly" : "yearly",
      priority: item.type === "blog" ? 0.7 : 0.5,
      ...(coverImage ? { images: [coverImage] } : {}),
    };
  });

  return [
    ...STATIC_ROUTES.map((route) => {
      const lastModified =
        route.path === "/blog"
          ? blogLastModified
          : route.path === "/case-studies"
            ? caseStudiesLastModified
            : undefined;
      return {
        url: `${SITE_URL}${route.path}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        ...(lastModified ? { lastModified } : {}),
      };
    }),
    ...tools.map((tool) => ({
      url: `${SITE_URL}/tools/${tool.key}`,
      lastModified: tool.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...contentRoutes,
  ];
}
