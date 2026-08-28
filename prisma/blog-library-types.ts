// Shared shape for the checked-in blog library (prisma/blog-library-*.ts).
//
// `art` drives `npm run content:generate-blog-art`, which renders
// public/blog-covers/<slug>.webp and public/blog-figures/<slug>.webp from the
// spec below. Posts without `art` keep their hand-made cover files.
export type BlogArtMotif =
  | "stars"
  | "chat"
  | "form"
  | "chart"
  | "timer"
  | "map"
  | "media"
  | "cart"
  | "speed"
  | "shield"
  | "funnel"
  | "code"
  | "grid"
  | "search";

export type BlogArtFigure = {
  kind: "flow" | "checklist" | "compare" | "funnel" | "stack" | "bars";
  title: string;
  items: string[];
  items2?: string[];
  caption?: string;
};

export type BlogArt = {
  eyebrow: string;
  coverHeadline: string;
  motif: BlogArtMotif;
  figure: BlogArtFigure;
};

export type BlogLibraryPost = {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  body: string;
  art?: BlogArt;
};
