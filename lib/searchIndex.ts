import { books } from "./books";
import { programPages } from "./programs";

export type SearchEntryType = "Page" | "Program" | "Book" | "Article";

export type SearchEntry = {
  type: SearchEntryType;
  title: string;
  description: string;
  href: string;
  image?: string;
};

const pageEntries: SearchEntry[] = [
  {
    type: "Page",
    title: "Home",
    description: "Dr. TEA — purpose mentor, leadership coach, teacher, author, and speaker.",
    href: "/"
  },
  {
    type: "Page",
    title: "About Dr. TEA",
    description: "The story, mission, and assignment behind Dr. TEA's work.",
    href: "/#about"
  },
  {
    type: "Page",
    title: "Programs",
    description: "Coaching and mentorship programs for purpose, clarity, and leadership.",
    href: "/programs"
  },
  {
    type: "Page",
    title: "Books",
    description: "Books and writings on purpose, faith, leadership, and transformation.",
    href: "/books"
  },
  {
    type: "Page",
    title: "Blog",
    description: "Purpose-driven articles on clarity, spiritual growth, and intentional living.",
    href: "/blog"
  },
  {
    type: "Page",
    title: "Contact",
    description: "Get in touch with Dr. TEA for speaking, coaching, and enquiries.",
    href: "/contact"
  },
  {
    type: "Page",
    title: "Book a Call",
    description: "Schedule a clarity call with Dr. TEA.",
    href: "/book-a-call"
  }
];

const programEntries: SearchEntry[] = programPages.map((program) => ({
  type: "Program",
  title: program.title,
  description: program.summary,
  href: `/programs/${program.slug}`,
  image: program.heroImage
}));

const bookEntries: SearchEntry[] = books.map((book) => ({
  type: "Book",
  title: book.title,
  description: book.summary,
  href: "/books",
  image: book.image
}));

/** Static, client-available entries (pages, programs, books). Blog articles are
 *  loaded on demand from /api/search since they live in Sanity. */
export const staticSearchIndex: SearchEntry[] = [
  ...pageEntries,
  ...programEntries,
  ...bookEntries
];

/** Rank entries against a query: title matches outrank description matches, and
 *  earlier matches outrank later ones. Returns the trimmed, sorted result list. */
export function searchEntries(
  query: string,
  entries: SearchEntry[],
  limit = 8
): SearchEntry[] {
  const term = query.trim().toLowerCase();

  if (!term) {
    return [];
  }

  const scored = entries
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const description = entry.description.toLowerCase();
      const titleIndex = title.indexOf(term);
      const descriptionIndex = description.indexOf(term);

      if (titleIndex === -1 && descriptionIndex === -1) {
        return null;
      }

      // Lower score = better match.
      const score =
        titleIndex !== -1 ? titleIndex : 1000 + descriptionIndex;

      return { entry, score };
    })
    .filter((value): value is { entry: SearchEntry; score: number } => value !== null)
    .sort((a, b) => a.score - b.score);

  return scored.slice(0, limit).map((value) => value.entry);
}
