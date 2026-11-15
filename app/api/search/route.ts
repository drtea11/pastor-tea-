import { NextResponse } from "next/server";

import { getBlogPosts } from "@/lib/sanity/queries";
import type { SearchEntry } from "@/lib/searchIndex";

// Cache for an hour — blog content changes infrequently and search hits this often.
export const revalidate = 3600;

export async function GET() {
  try {
    const posts = await getBlogPosts();

    const articles: SearchEntry[] = posts.map((post) => ({
      type: "Article",
      title: post.title,
      description: post.excerpt ?? "Read this article on the Dr. TEA blog.",
      href: `/blog/${post.slug}`
    }));

    return NextResponse.json({ articles });
  } catch {
    // No Sanity config / fetch failure — search still works on static content.
    return NextResponse.json({ articles: [] });
  }
}
