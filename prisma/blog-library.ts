import { BLOG_POSTS_A } from "./blog-library-a";
import { BLOG_POSTS_B } from "./blog-library-b";
import { BLOG_POSTS_C } from "./blog-library-c";
import { BLOG_POSTS_D } from "./blog-library-d";
import { BLOG_POSTS_E } from "./blog-library-e";
import { BLOG_POSTS_F } from "./blog-library-f";
import { BLOG_POSTS_G } from "./blog-library-g";
import { BLOG_POSTS_H } from "./blog-library-h";
import { BLOG_POSTS_I } from "./blog-library-i";
import { BLOG_POSTS_J } from "./blog-library-j";
import { BLOG_POSTS_K } from "./blog-library-k";
import type { BlogLibraryPost } from "./blog-library-types";

export type {
  BlogArt,
  BlogArtFigure,
  BlogArtMotif,
  BlogLibraryPost,
} from "./blog-library-types";

export const BLOG_LIBRARY: readonly BlogLibraryPost[] = [
  ...BLOG_POSTS_A,
  ...BLOG_POSTS_B,
  ...BLOG_POSTS_C,
  ...BLOG_POSTS_D,
  ...BLOG_POSTS_E,
  ...BLOG_POSTS_F,
  ...BLOG_POSTS_G,
  ...BLOG_POSTS_H,
  ...BLOG_POSTS_I,
  ...BLOG_POSTS_J,
  ...BLOG_POSTS_K,
];
