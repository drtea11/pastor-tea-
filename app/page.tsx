import Image from "next/image";
import Link from "next/link";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsCarousel } from "@/components/Cards";
import { Container } from "@/components/Container";
import { ExploreLibrarySection } from "@/components/ExploreLibrarySection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MissionSection } from "@/components/MissionSection";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { RevealProvider } from "@/components/RevealProvider";
import { WhyWorkStepsHome } from "@/components/WhyWorkStepsHome";
import { books } from "@/lib/books";
import { programPages } from "@/lib/programs";

const programs = programPages.map((program) => ({
  title: program.title,
  description: program.summary,
  image: program.heroImage,
  alt: program.heroImageAlt,
  slug: program.slug
}));

const whyWork = [
  {
    title: "Wisdom"
  },
  {
    title: "Clarity"
  },
  {
    title: "Systems"
  },
  {
    title: "Mentorship"
  },
  {
    title: "Discipline"
  },
  {
    title: "Accountability"
  },
  {
    title: "Transformation"
  }
];

const testimonials = [
  "This program gave me the clarity I had been praying for. I now understand my purpose and the steps I need to take.",
  "The mentoring sessions helped me move from confusion to confidence. I stopped overthinking and started taking action.",
  "The Book Writing Boot Camp helped me structure my ideas and finally begin the book I had delayed for years.",
  "The teachings are deep, practical, and transformational. I did not just feel inspired; I knew exactly what to do next.",
  "The Inner Circle gave me the accountability and environment I needed to grow consistently."
];

const faqs = [
  {
    question: "Who are these programs for?",
    answer:
      "They are for individuals who want clarity, growth, structure, leadership development, spiritual direction, coaching skills, or personal transformation."
  },
  {
    question: "Do I need to already know my purpose before joining?",
    answer:
      "No. Some programs are designed specifically for people who are still trying to discover their purpose."
  },
  {
    question: "Are the programs faith-based?",
    answer:
      "Yes. The programs are rooted in biblical wisdom, spiritual insight, and practical life application."
  },
  {
    question: "Can I book a one-on-one session?",
    answer:
      "Yes. You can schedule a clarity session or apply for the Intensive Mentoring & Coaching Program."
  },
  {
    question: "How do I know which program is right for me?",
    answer:
      "Start by scheduling a free consultation to identify where you are, what you need, and the best program for your current season."
  },
  {
    question: "Is the Book Writing Boot Camp for beginners?",
    answer:
      "Yes. The boot camp is beginner-friendly and helps you move from idea to structure, writing, and publishing direction."
  }
];

export default function Home() {
  return (
    <div className="bg-black">
      <RevealProvider />
      <Header transparent />
      <main>
        <Hero />

        <MissionSection />

        {/* ── About / Pillars ── */}
        <section id="about" className="bg-white">
          <div className="lg:flex lg:min-h-screen">
            {/* Left — stacked words */}
            <div className="flex flex-col justify-center px-6 py-14 text-center sm:px-10 lg:flex-1 lg:px-16 lg:py-32 lg:text-left">
              <div>
                {["Clarity", "Purpose", "Wisdom", "Discipline", "Accountability", "Impact"].map((word) => (
                  <p
                    key={word}
                    className="pillar-word font-heading font-bold leading-[1.1] text-[2rem] lg:text-[3rem]"
                    style={{ color: "rgba(11,13,16,0.15)" }}
                  >
                    {word}
                  </p>
                ))}
              </div>
            </div>

            {/* Right — sticky image (desktop only) */}
            <div className="relative hidden lg:sticky lg:top-0 lg:block lg:h-screen lg:w-[46%] lg:shrink-0">
              <Image
                src="/images/pastor-tea-programs-3-cleaned.png"
                alt="Dr. TEA coaching session"
                fill
                sizes="46vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </section>

        <WhyWorkStepsHome />

        <section className="overflow-hidden bg-white py-16 lg:py-24">
          <div className="px-6 text-center lg:px-10">
            <div className="reveal mb-2">
              <h2 className="font-heading font-bold leading-tight text-brand-ink">
                See What Others Are Saying.
              </h2>
            </div>
            <p className="reveal mx-auto mb-0 max-w-xl font-body text-sm leading-6 text-brand-muted">
              Stories from people gaining clarity, structure, and momentum.
            </p>
          </div>
          <TestimonialsCarousel testimonials={testimonials} context="Inner Circle" />
        </section>

        <AboutSection />

        <ExploreLibrarySection programs={programs} books={books} />

        <section className="bg-white py-20">
          <Container>
            <NewsletterSignup />
          </Container>
        </section>

        <section className="bg-white py-20">
          <Container>
            <div className="grid gap-16 lg:grid-cols-[42rem_minmax(0,1fr)] lg:items-start lg:gap-32 xl:gap-44">
              <div className="reveal lg:sticky lg:top-32">
                <h2 className="font-heading font-medium capitalize leading-tight text-black">
                  <span className="block">Questions?</span>
                  <span className="block lg:whitespace-nowrap">We&apos;ve Got Clear Answers</span>
                </h2>
              </div>

              <div>
                <FAQAccordion items={faqs} />
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
