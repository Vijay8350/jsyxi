import { CASE_STUDIES_A } from "./case-study-library-a";
import { CASE_STUDIES_B } from "./case-study-library-b";
import { CASE_STUDIES_C } from "./case-study-library-c";

export type CaseStudyLibraryItem = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string;
  publishedAt: string;
};

export const CASE_STUDY_LIBRARY_FIRST_PUBLISHED_AT =
  "2026-07-31T10:49:53.994Z";

const CASE_STUDY_LIBRARY_SOURCE = [
  ...CASE_STUDIES_A,
  ...CASE_STUDIES_B,
  ...CASE_STUDIES_C,
] satisfies readonly CaseStudyLibraryItem[];

// These stories first became public together. Keeping the true first-publication
// date avoids presenting content-library ordering as a historical publish date.
export const CASE_STUDY_LIBRARY = CASE_STUDY_LIBRARY_SOURCE.map((study) => ({
  ...study,
  publishedAt: CASE_STUDY_LIBRARY_FIRST_PUBLISHED_AT,
})) satisfies readonly CaseStudyLibraryItem[];
