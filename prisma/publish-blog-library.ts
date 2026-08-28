import { PrismaClient } from "../src/generated/prisma";
import { BLOG_LIBRARY } from "./blog-library";

const prisma = new PrismaClient();

async function main() {
  const slugs = BLOG_LIBRARY.map((post) => post.slug);
  const existing = await prisma.contentItem.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true, type: true, title: true },
  });
  const collisions = existing.filter((item) => item.type !== "blog");

  if (collisions.length > 0) {
    throw new Error(
      [
        "Refusing to publish because these slugs belong to non-blog content:",
        ...collisions.map(
          (item) => `  ${item.slug} (${item.type}: ${item.title})`,
        ),
      ].join("\n"),
    );
  }

  if (process.argv.includes("--check")) {
    console.log(
      `Preflight passed: ${BLOG_LIBRARY.length} posts, ${existing.length} existing blog records, no slug collisions.`,
    );
    return;
  }

  const author =
    (await prisma.staffUser.findFirst({
      where: { staffRole: "content", status: "active" },
      select: { id: true },
    })) ??
    (await prisma.staffUser.findFirst({
      where: { status: "active" },
      orderBy: { createdAt: "asc" },
      select: { id: true },
    }));

  const authorStaffId = author?.id ?? null;
  const published = await prisma.$transaction(
    BLOG_LIBRARY.map((post) =>
      prisma.contentItem.upsert({
        where: { slug: post.slug },
        update: {
          type: "blog",
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          coverImage: post.coverImage,
          status: "published",
          authorStaffId,
          publishedAt: new Date(post.publishedAt),
        },
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
      }),
    ),
  );

  console.log(`Published ${published.length} blog posts.`);
  for (const post of published) console.log(`  /blog/${post.slug}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
