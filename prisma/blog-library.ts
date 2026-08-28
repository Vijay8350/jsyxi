import { BLOG_POSTS_A } from "./blog-library-a";
import { BLOG_POSTS_B } from "./blog-library-b";
import { BLOG_POSTS_C } from "./blog-library-c";

export type BlogLibraryPost = {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  body: string;
};

export const BLOG_LIBRARY: readonly BlogLibraryPost[] = [
  ...BLOG_POSTS_A,
  ...BLOG_POSTS_B,
  ...BLOG_POSTS_C,
];
