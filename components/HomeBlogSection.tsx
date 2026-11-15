import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { getRecentBlogPosts } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

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

export async function HomeBlogSection() {
  const posts = await getRecentBlogPosts(3);

  if (!posts.length) {
    return null;
  }

  return (
    <section id="blog-preview" className="bg-brand-soft py-20 text-brand-ink">
      <Container>
        <div className="flex items-start justify-between gap-8">
          <h2 className="reveal font-heading font-medium capitalize leading-tight text-brand-ink">
            Our Blog
          </h2>

          <Link
            href="/blog"
            className="hidden min-h-14 items-center justify-center rounded-[0.76rem] bg-brand-ink px-9 font-body text-[1rem] font-semibold leading-none text-white transition hover:-translate-y-0.5 hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue lg:inline-flex"
          >
            Read All Stories
          </Link>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => {
            const href = `/blog/${post.slug}`;
            const imageUrl = post.mainImage?.asset
              ? urlForImage(post.mainImage).width(900).height(680).fit("crop").url()
              : null;
            const publishedDate = formatDate(post.publishedAt);

            return (
              <article key={post._id} className="reveal-card group">
                <Link
                  href={href}
                  aria-label={`Read ${post.title}`}
                  className="relative block aspect-[1.33] overflow-hidden bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.mainImage?.alt || post.title}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 47vw, 95vw"
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef7fb,#ffffff_45%,rgba(165,205,57,0.2))]" />
                  )}
                </Link>

                <div className="pt-3">
                  {publishedDate ? (
                    <time
                      dateTime={post.publishedAt}
                      className="block font-body text-sm leading-none text-brand-muted"
                    >
                      {publishedDate}
                    </time>
                  ) : null}

                  <h3 className="home-blog-title mt-2 font-heading font-extrabold capitalize text-brand-ink">
                    <Link
                      href={href}
                      className="home-blog-title-link transition hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {post.excerpt ? (
                    <p className="home-blog-excerpt mt-3 max-w-[18rem] font-body text-brand-muted">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
