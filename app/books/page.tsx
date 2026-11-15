import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";

const AVATARS = [
  { src: "/images/avatar 1.png", alt: "Reader" },
  { src: "/images/avatar 2.png", alt: "Reader" },
  { src: "/images/avatar 3.png", alt: "Reader" },
  { src: "/images/avatar 4.png", alt: "Reader" },
  { src: "/images/avatar 5.png", alt: "Reader" },
];
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealProvider } from "@/components/RevealProvider";
import { books } from "@/lib/books";

export const metadata = {
  title: "Books | Dr. TEA",
  description:
    "Explore transformational books by Dr. Temitope Ebenezer Arowele on purpose, faith, healing, wisdom, revival, and advancement.",
};

const CARD_PALETTE = [
  { bg: "#edf2e4", text: "#2a3618", tag: "#d5e2be", tagText: "#3a4e22" },
  { bg: "#e4eef5", text: "#182535", tag: "#bdd4e5", tagText: "#223650" },
  { bg: "#f5ede4", text: "#352010", tag: "#e5d0bc", tagText: "#50301a" },
  { bg: "#ede8f5", text: "#251535", tag: "#d8cce8", tagText: "#362050" },
  { bg: "#e4f2ec", text: "#183025", tag: "#bde0d0", tagText: "#224838" },
  { bg: "#f5f0e4", text: "#352c10", tag: "#e5dbbe", tagText: "#50401a" },
  { bg: "#f5e4e6", text: "#350e12", tag: "#e5c0c4", tagText: "#50161c" },
  { bg: "#e8e4f5", text: "#1a1235", tag: "#cec8e8", tagText: "#281c50" },
];

export default function BooksPage() {
  return (
    <>
      <RevealProvider />
      <main className="min-h-screen bg-white text-brand-ink">

        {/* ── Hero — mirrors ProgramsHero ── */}
        <section className="flex h-svh flex-col bg-brand-ink text-white">
          <Header transparent />

          <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-10">
            <div className="max-w-3xl">
              <h1 className="font-heading font-bold uppercase leading-[1.05] text-white">
                <span className="block">Written To</span>
                <span className="block text-brand-green">Transform</span>
                <span className="block">You.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-xs font-body text-sm leading-7 text-white/55 sm:max-w-xl sm:text-base">
                Books by Dr. TEA on purpose, faith, healing, wisdom, and personal advancement.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="#book-library" variant="primary">
                  Explore Books
                </Button>
              </div>

              {/* Avatars */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex items-center" aria-hidden="true">
                  {AVATARS.map((avatar, i) => (
                    <span
                      key={avatar.src}
                      className="relative block size-10 overflow-hidden rounded-full border-2 border-brand-ink"
                      style={{ marginLeft: i === 0 ? 0 : "-0.65rem", zIndex: AVATARS.length - i }}
                    >
                      <Image
                        src={avatar.src}
                        alt={avatar.alt}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
                <p className="mx-auto w-[70%] font-body text-[0.78rem] text-white/45 sm:w-full">
                  Join <span className="font-semibold text-white/70">1,000+</span> readers transformed by Dr. TEA&apos;s books
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center pb-7">
            <a
              href="#book-library"
              aria-label="Scroll to books"
              className="flex flex-col items-center gap-2 text-white/80 transition hover:text-white"
            >
              <span className="flex h-9 w-[1.45rem] items-start justify-center rounded-full border-2 border-white/70 p-1.5">
                <span className="hero-scroll-wheel h-2 w-1.5 rounded-full bg-white/90" />
              </span>
            </a>
          </div>
        </section>

        {/* ── Book grid ── */}
        <section id="book-library" className="bg-white py-16 text-brand-ink lg:py-20">
          <Container>
            <div className="reveal mb-10 lg:mb-14">
              <h2 className="font-heading font-medium capitalize leading-tight text-brand-ink">
                Choose Your Book
              </h2>
              <p className="mt-4 max-w-xl font-body text-base leading-7 text-brand-muted">
                Each book was written to meet you where you are and take you further than you imagined.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book, i) => {
                const palette = CARD_PALETTE[i % CARD_PALETTE.length];
                return (
                  <Link
                    key={book.title}
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reveal-card group flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2"
                    style={{ backgroundColor: palette.bg }}
                  >
                    {/* Book cover */}
                    {book.image ? (
                      <div className="relative h-52 w-full overflow-hidden bg-black/8">
                        <Image
                          src={book.image}
                          alt={book.alt}
                          fill
                          sizes="(min-width: 1280px) 24vw, (min-width: 640px) 48vw, 95vw"
                          className="object-contain p-4 transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex h-52 items-center justify-center"
                        style={{ backgroundColor: palette.tag }}
                      >
                        <span
                          className="font-heading text-[0.7rem] font-semibold uppercase tracking-wide"
                          style={{ color: palette.tagText }}
                        >
                          Book
                        </span>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-5">
                      {/* Tag */}
                      <span
                        className="self-start px-3 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-wide"
                        style={{ backgroundColor: palette.tag, color: palette.tagText }}
                      >
                        Book
                      </span>

                      {/* Title */}
                      <h3
                        className="mt-4 font-heading text-[1.05rem] font-bold leading-snug"
                        style={{ color: palette.text }}
                      >
                        {book.title}
                      </h3>

                      {/* Summary */}
                      <p
                        className="mt-2 font-body text-sm leading-6 line-clamp-3"
                        style={{ color: palette.text, opacity: 0.7 }}
                      >
                        {book.summary}
                      </p>

                      <div className="flex-1" />

                      {/* Footer */}
                      <div
                        className="mt-5 flex items-center justify-between border-t pt-4"
                        style={{ borderColor: `${palette.text}18` }}
                      >
                        <span
                          className="font-heading text-[0.72rem] font-medium"
                          style={{ color: palette.text }}
                        >
                          Order via WhatsApp
                        </span>
                        <span
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-brand-ink px-3.5 font-heading text-[0.7rem] font-semibold text-white transition-colors duration-150 group-hover:bg-brand-green group-hover:text-brand-ink"
                        >
                          Get
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-brand-ink py-20 text-center text-white lg:py-28">
          <Container>
            <h2 className="mx-auto max-w-2xl font-heading font-medium capitalize leading-tight text-white">
              Not Sure Which Book To Start With?
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-body text-base leading-7 text-white/60">
              Book a clarity call and get a personalised recommendation based on where you are right now.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/book-a-call" variant="primary">
                Schedule Consultation
              </Button>
            </div>
          </Container>
        </section>

        <Footer />
      </main>
    </>
  );
}
