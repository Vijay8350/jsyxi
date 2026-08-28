import { PrismaClient } from "../src/generated/prisma";
import { CASE_STUDY_LIBRARY } from "./case-study-library";

const prisma = new PrismaClient();

async function main() {
  const slugs = CASE_STUDY_LIBRARY.map((study) => study.slug);
  const existing = await prisma.contentItem.findMany({
    where: { slug: { in: slugs } },
    select: {
      id: true,
      slug: true,
      type: true,
      title: true,
      excerpt: true,
      body: true,
      coverImage: true,
      status: true,
      authorStaffId: true,
      publishedAt: true,
    },
  });
  const collisions = existing.filter((item) => item.type !== "case_study");

  if (collisions.length > 0) {
    throw new Error(
      [
        "Refusing to publish because these slugs belong to non-case-study content:",
        ...collisions.map(
          (item) => `  ${item.slug} (${item.type}: ${item.title})`,
        ),
      ].join("\n"),
    );
  }

  if (process.argv.includes("--check")) {
    console.log(
      `Preflight passed: ${CASE_STUDY_LIBRARY.length} case studies, ${existing.length} existing case-study records, no slug collisions.`,
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
  const existingBySlug = new Map(existing.map((item) => [item.slug, item]));
  const studiesToPublish = CASE_STUDY_LIBRARY.filter((study) => {
    const current = existingBySlug.get(study.slug);
    if (!current) return true;

    return !(
      current.type === "case_study" &&
      current.title === study.title &&
      current.excerpt === study.excerpt &&
      current.body === study.body &&
      current.coverImage === study.coverImage &&
      current.status === "published" &&
      current.authorStaffId === authorStaffId &&
      current.publishedAt?.getTime() === new Date(study.publishedAt).getTime()
    );
  });

  const published = studiesToPublish.length
    ? await prisma.$transaction(
        studiesToPublish.map((study) =>
          prisma.contentItem.upsert({
            where: { slug: study.slug },
            update: {
              type: "case_study",
              title: study.title,
              excerpt: study.excerpt,
              body: study.body,
              coverImage: study.coverImage,
              status: "published",
              authorStaffId,
              publishedAt: new Date(study.publishedAt),
            },
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
          }),
        ),
      )
    : [];

  console.log(
    `Published or updated ${published.length} case studies; ${CASE_STUDY_LIBRARY.length - published.length} already current.`,
  );
  for (const study of published) {
    console.log(`  /case-studies/${study.slug}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
