import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, PenLine } from "lucide-react";
import { notFound } from "next/navigation";

import { BlogPortableText } from "@/components/BlogPortableText";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealProvider } from "@/components/RevealProvider";
import {
  getBlogPostBySlug,
  getBlogPostSlugs,
} from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date?: string) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function collectText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(collectText).join(" ");
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (record.text && typeof record.text === "string") return record.text;
    if (record.children) return collectText(record.children);
  }
  return "";
}

function estimateReadTime(body?: unknown[], excerpt?: string) {
  const text = body?.length ? collectText(body) : excerpt ?? "";
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(wordCount / 220));
  return `${minutes} min read`;
}

export async function generateStaticParams() {
  return getBlogPostSlugs();
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.seoTitle || post.title} | Dr. TEA`,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const heroImageUrl = post.mainImage?.asset
    ? urlForImage(post.mainImage).width(1400).height(800).fit("crop").url()
    : null;
  const publishedDate = formatDate(post.publishedAt);
  const readTime = estimateReadTime(post.body, post.excerpt);

  return (
    <>
      <RevealProvider />
      <main className="min-h-screen bg-brand-soft text-brand-ink">
        <Header />

        <article className="pb-24 pt-12">

          {/* ── Content column ── */}
          <div className="mx-auto max-w-[700px] px-5 sm:px-8">

            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-body text-[0.625rem] text-brand-muted transition hover:text-brand-ink"
            >
              <ArrowLeft size={13} />
              Back to Blog
            </Link>

            {/* Title */}
            <h1 className="mt-3 font-heading text-[clamp(1.6rem,4vw,2.5rem)] font-bold capitalize leading-[1.1] text-brand-ink">
              {post.title}
            </h1>

            {/* Byline */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-[0.82rem] text-brand-muted">
              <span className="inline-flex items-center gap-1.5">
                <PenLine size={13} className="text-brand-blue" />
                {post.author?.name ?? "Dr. TEA"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={13} className="text-brand-blue" />
                {publishedDate ?? "Coming Soon"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={13} className="text-brand-blue" />
                {readTime}
              </span>
            </div>

            {/* Hero image */}
            {heroImageUrl ? (
              <div className="mt-10 overflow-hidden rounded-xl">
                <Image
                  src={heroImageUrl}
                  alt={post.mainImage?.alt || post.title}
                  width={1400}
                  height={800}
                  priority
                  className="w-full object-cover"
                />
              </div>
            ) : null}

            {/* Excerpt */}
            {post.excerpt ? (
              <p className="mt-10 font-body text-lg leading-8 text-brand-ink/75">
                {post.excerpt}
              </p>
            ) : null}

            {/* Body */}
            <div className="mt-8">
              <BlogPortableText value={post.body} />
            </div>

          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}
