import { sanityClient, hasSanityConfig } from "./client";

export type SanityImage = {
  asset?: {
    _ref?: string;
    url?: string;
  };
  alt?: string;
};

export type BlogAuthor = {
  name: string;
  slug?: string;
  image?: SanityImage;
  bio?: string;
};

export type BlogCategory = {
  title: string;
  slug?: string;
};

export type BlogPostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  author?: BlogAuthor;
  categories?: BlogCategory[];
};

export type BlogPost = BlogPostListItem & {
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
};

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage{
    ...,
    alt,
    asset->
  },
  author->{
    name,
    "slug": slug.current,
    image{
      ...,
      alt,
      asset->
    },
    bio
  },
  categories[]->{
    title,
    "slug": slug.current
  }
`;

async function fetchFromSanity<T>(fallback: T, query: string, params = {}) {
  if (!hasSanityConfig) {
    return fallback;
  }

  try {
    return await sanityClient.fetch<T>(
      query,
      params,
      { next: { revalidate: 60 } }
    );
  } catch (error) {
    console.warn("Sanity fetch failed; using fallback content.", error);
    return fallback;
  }
}

export async function getBlogPosts(): Promise<BlogPostListItem[]> {
  return fetchFromSanity<BlogPostListItem[]>(
    [],
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      ${postFields}
    }`
  );
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPostListItem[]> {
  return fetchFromSanity<BlogPostListItem[]>(
    [],
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit] {
      ${postFields}
    }`,
    { limit }
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return fetchFromSanity<BlogPost | null>(
    null,
    `*[_type == "post" && slug.current == $slug][0] {
      ${postFields},
      body,
      seoTitle,
      seoDescription
    }`,
    { slug }
  );
}

export async function getBlogPostSlugs(): Promise<{ slug: string }[]> {
  return fetchFromSanity<{ slug: string }[]>(
    [],
    `*[_type == "post" && defined(slug.current)] { "slug": slug.current }`
  );
}
