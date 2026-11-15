import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowUpRight, BookOpenText } from "lucide-react";

import { BlogNewsletterBar } from "@/components/BlogNewsletterBar";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealProvider } from "@/components/RevealProvider";
import { getBlogPosts } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

const garton = localFont({
  src: "../../public/fonts/gartonpro-bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "Blog | Dr. TEA",
  description:
    "Purpose-driven articles from Dr. TEA on clarity, spiritual growth, leadership, mentorship, and intentional living.",
};

function formatDate(date?: string) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <RevealProvider />
      <main className="min-h-screen bg-white text-black">
        <Header />

        <section className="relative bg-brand-soft">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-[5vw] pt-20 pb-10 text-center sm:pt-24 lg:pt-28">
            <span className="hero-reveal inline-flex items-center rounded-full bg-brand-green px-4 py-1.5 font-body text-sm font-semibold leading-none text-brand-ink">
              Blog &amp; Articles
            </span>
            <h1 className={`${garton.className} hero-reveal mt-7 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-brand-ink sm:text-[3.25rem] lg:text-[4rem]`}>
              Blog &amp; Articles
            </h1>
            <p className="hero-reveal mt-5 max-w-xl font-body text-base leading-7 text-brand-muted lg:text-lg lg:leading-8">
              Subscribe for purpose-driven insights on clarity, spiritual growth,
              and intentional living, delivered straight to your inbox.
            </p>
            <div className="hero-reveal mt-9 w-full">
              <BlogNewsletterBar />
            </div>
          </div>

          {/* Scroll indicator — in flow at the bottom, never overlaps */}
          <div className="flex justify-center pb-8">
            <Link
              href="#articles"
              aria-label="Scroll to articles"
              className="flex flex-col items-center gap-2 text-brand-ink/60 transition hover:text-brand-ink"
            >
              <span className="flex h-9 w-[1.45rem] items-start justify-center rounded-full border-2 border-brand-ink/40 p-1.5">
                <span className="hero-scroll-wheel h-2 w-1.5 rounded-full bg-brand-ink/70" />
              </span>
            </Link>
          </div>
        </section>

        <section id="articles" className="bg-white py-20">
          <Container>
            {posts.length ? (
              <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                  const imageUrl = post.mainImage?.asset
                    ? urlForImage(post.mainImage).width(900).height(600).fit("crop").url()
                    : null;
                  const postHref = `/blog/${post.slug}`;
                  const publishedDate = formatDate(post.publishedAt);
                  const author = post.author;
                  const authorImageUrl = author?.image?.asset
                    ? urlForImage(author.image).width(72).height(72).fit("crop").url()
                    : null;

                  return (
                    <article key={post._id} className="reveal-card group flex flex-col">
                      <Link
                        href={postHref}
                        aria-label={`Read ${post.title}`}
                        className="relative block aspect-[3/2] overflow-hidden rounded-xl bg-brand-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                      >
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={post.mainImage?.alt || post.title}
                            fill
                            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 95vw"
                            className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef6fa,#ffffff_42%,rgba(3,148,215,0.22))]" />
                        )}
                      </Link>

                      <div className="flex flex-1 flex-col pt-5">
                        <h3 className="font-heading text-[1.25rem] font-bold capitalize leading-[1.25] text-brand-ink">
                          <Link
                            href={postHref}
                            className="flex items-start justify-between gap-4 transition hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                          >
                            <span className="line-clamp-2">{post.title}</span>
                            <ArrowUpRight
                              size={22}
                              aria-hidden="true"
                              className="mt-1 shrink-0 text-brand-ink/35 transition group-hover:text-brand-blue"
                            />
                          </Link>
                        </h3>

                        {post.excerpt ? (
                          <p className="mt-3 font-body text-[0.9375rem] leading-7 text-brand-muted line-clamp-3">
                            {post.excerpt}
                          </p>
                        ) : null}

                        {author?.name || publishedDate ? (
                          <div className="mt-auto flex items-center gap-3 pt-6">
                            {author?.name ? (
                              <span className="relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-blue/10 font-body text-sm font-semibold text-brand-blue">
                                {authorImageUrl ? (
                                  <Image
                                    src={authorImageUrl}
                                    alt={author.image?.alt || author.name}
                                    fill
                                    sizes="36px"
                                    className="object-cover"
                                  />
                                ) : (
                                  author.name.charAt(0).toUpperCase()
                                )}
                              </span>
                            ) : null}
                            <p className="font-body text-sm leading-tight text-brand-muted">
                              {author?.name ? (
                                <span className="font-semibold text-brand-ink">
                                  {author.name}
                                </span>
                              ) : null}
                              {author?.name && publishedDate ? (
                                <span aria-hidden="true"> &middot; </span>
                              ) : null}
                              {publishedDate ? (
                                <time dateTime={post.publishedAt}>{publishedDate}</time>
                              ) : null}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mx-auto max-w-3xl rounded-[1.35rem] bg-[#F4F7FA] p-8 text-center lg:p-12">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <BookOpenText size={25} />
                </div>
                <p className="mt-5 font-heading text-[0.75rem] uppercase tracking-[0.18em] text-brand-blue">
                  Sanity Is Ready
                </p>
                <h2 className="mt-5 font-heading text-[1.5rem] font-semibold capitalize leading-tight text-brand-ink lg:text-[3rem]">
                  Connect Your Project To Publish Articles
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-brand-muted">
                  Add your Sanity project ID and dataset to `.env`, then create your first
                  blog post in Sanity. Published posts will appear here automatically.
                </p>
                <Button href="/book-a-call" className="mt-8">
                  Schedule Consultation
                </Button>
              </div>
            )}
          </Container>
        </section>

        <Footer />
      </main>
    </>
  );
}
