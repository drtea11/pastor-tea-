import Link from "next/link";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { HomePricing } from "@/components/HomePricing";
import { ProgramsHero } from "@/components/ProgramsHero";
import { RevealProvider } from "@/components/RevealProvider";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { WhyWorkStepsPrograms } from "@/components/WhyWorkStepsPrograms";
import { programPages } from "@/lib/programs";

export const metadata = {
  title: "Programs | Dr. TEA",
  description:
    "Explore Dr. TEA's coaching, mentoring, leadership, writing, and certification programs.",
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

export default function ProgramsPage() {
  return (
    <>
      <RevealProvider />
      <main className="min-h-screen bg-white text-brand-ink">
        <ProgramsHero />

        <section id="programs-list" className="bg-white py-16 text-brand-ink lg:py-20">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {programPages.map((program, i) => {
                const palette = CARD_PALETTE[i % CARD_PALETTE.length];
                const tag = program.factBar?.format ?? (program.tier === "flagship" ? "Flagship Program" : "Coaching");
                return (
                  <Link
                    key={program.slug}
                    href={`/programs/${program.slug}`}
                    className="reveal-card group flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2"
                    style={{ backgroundColor: palette.bg }}
                  >
                    <div className="flex flex-col flex-1 p-5">
                      {/* Tag */}
                      <span
                        className="self-start px-3 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-wide"
                        style={{ backgroundColor: palette.tag, color: palette.tagText }}
                      >
                        {tag}
                      </span>

                      {/* Title */}
                      <h3
                        className="mt-5 font-heading text-[1.05rem] font-bold leading-snug"
                        style={{ color: palette.text }}
                      >
                        {program.title}
                      </h3>

                      {/* Summary */}
                      <p
                        className="mt-2 font-body text-[0.8rem] leading-5 line-clamp-2"
                        style={{ color: palette.text, opacity: 0.7 }}
                      >
                        {program.summary}
                      </p>

                      {/* Spacer */}
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
                          {program.shortTitle}
                        </span>
                        <span
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-brand-ink px-3.5 font-heading text-[0.7rem] font-semibold text-white transition-colors duration-150 group-hover:bg-brand-green group-hover:text-brand-ink group-focus-visible:bg-brand-green group-focus-visible:text-brand-ink"
                        >
                          View
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        <WhyWorkStepsPrograms />

        <HomePricing />

        {/* Testimonials */}
        <section className="overflow-hidden bg-white py-16 lg:py-24">
          <div className="px-6 text-center lg:px-10">
            <div className="reveal mb-2">
              <h2 className="font-heading font-bold leading-tight text-brand-ink">
                See What Others Are Saying.
              </h2>
            </div>
            <p className="reveal mx-auto mb-0 max-w-xl font-body text-sm leading-6 text-brand-muted">
              Stories from people gaining clarity, structure, and momentum through Dr. TEA&apos;s programs.
            </p>
          </div>
          <TestimonialsCarousel
            testimonials={[
              "This program gave me the clarity I had been praying for. I now understand my purpose and the steps I need to take.",
              "The mentoring sessions helped me move from confusion to confidence. I stopped overthinking and started taking action.",
              "The Book Writing Boot Camp helped me structure my ideas and finally begin the book I had delayed for years.",
              "The teachings are deep, practical, and transformational. I did not just feel inspired — I knew exactly what to do next.",
              "The Inner Circle gave me the accountability and environment I needed to grow consistently.",
              "Dr. TEA challenged the way I think. The coaching pushed me to build discipline, not just dream bigger.",
            ]}
            context="Program"
          />
        </section>

        <Footer />
      </main>
    </>
  );
}
