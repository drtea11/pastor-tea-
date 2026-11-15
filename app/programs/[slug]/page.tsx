import Image from "next/image";
import { notFound } from "next/navigation";

const AVATARS = [
  { src: "/images/avatar 1.png", alt: "Program participant" },
  { src: "/images/avatar 2.png", alt: "Program participant" },
  { src: "/images/avatar 3.png", alt: "Program participant" },
  { src: "/images/avatar 4.png", alt: "Program participant" },
  { src: "/images/avatar 5.png", alt: "Program participant" },
];

const programAvatarText: Record<string, string> = {
  "purpose-discovery-clarity-coaching":           "Hundreds have found clarity on who they are and why they are here",
  "inner-circle":                                  "Over a thousand people growing together with purpose and structure",
  "goal-setting-performance-evaluation-coaching":  "Hundreds now set goals they actually achieve",
  "book-writing-boot-camp":                        "Hundreds finally wrote the book they had been putting off",
  "leadership-academy-certification":              "Hundreds now lead with clarity, structure, and confidence",
  "purpose-reengineering-masterclass":             "Hundreds rebuilt their direction and moved forward with boldness",
  "intensive-mentoring-coaching-program":          "A focused group receiving direct mentorship from Dr. TEA",
  "certified-professional-coach-program":          "Hundreds are now certified and actively coaching others",
};
import {
  BadgeCheck,
  BookOpen,
  Brain,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Compass,
  FileText,
  Flame,
  HeartHandshake,
  Layers,
  Lightbulb,
  MessageCircle,
  PenLine,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/Button";
import { TestimonialsCarousel } from "@/components/Cards";
import { ProgramFeaturesList } from "@/components/ProgramFeaturesList";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PricingPlans } from "@/components/PricingPlans";
import { RevealProvider } from "@/components/RevealProvider";
import { getProgramBySlug, programPages } from "@/lib/programs";
import type { ProgramPage } from "@/lib/programs";

function getBenefitIcon(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("book") || t.includes("writing")) return BookOpen;
  if (t.includes("outline") || t.includes("manuscript")) return FileText;
  if (t.includes("chapter") || t.includes("content")) return PenLine;
  if (t.includes("publish") || t.includes("launch")) return TrendingUp;
  if (t.includes("blueprint") || t.includes("system")) return Layers;
  if (t.includes("strategy") || t.includes("execution")) return Route;
  if (t.includes("assignment") || t.includes("direction")) return Compass;
  if (t.includes("confidence") || t.includes("bold")) return Sparkles;
  if (t.includes("accountability") || t.includes("structure")) return CalendarCheck;
  if (t.includes("community") || t.includes("mentoring")) return Users;
  if (t.includes("goal") || t.includes("action")) return Target;
  if (t.includes("performance") || t.includes("growth")) return TrendingUp;
  if (t.includes("communication") || t.includes("q&a")) return MessageCircle;
  if (t.includes("ethic") || t.includes("certification")) return ShieldCheck;
  if (t.includes("spiritual") || t.includes("ignite")) return Flame;
  if (t.includes("personal") || t.includes("guidance")) return HeartHandshake;
  if (t.includes("clarity") || t.includes("framework")) return Lightbulb;
  if (t.includes("mindset") || t.includes("maturity")) return Brain;
  if (t.includes("assessment") || t.includes("review")) return ClipboardCheck;
  return BadgeCheck;
}

type OutcomeItem = { title: string; description: string };

const programOutcomeItems: Record<string, OutcomeItem[]> = {
  "purpose-discovery-clarity-coaching": [
    { title: "Discover Why You Were Born", description: "Discover why you were born and gain the clarity you need to walk boldly in your God-ordained purpose." },
    { title: "Understand Your Identity", description: "Understand your identity, gifts, strengths, calling, and next steps." },
    { title: "Stop Guessing", description: "Move from confusion to clarity so you can stop guessing and start living intentionally." },
    { title: "Walk Boldly", description: "Gain the clarity you need to walk boldly in your God-ordained purpose." },
  ],
  "inner-circle": [
    { title: "Discover Greater Clarity", description: "Gain direction for your life, purpose, goals, and next steps so you stop feeling confused and start moving intentionally." },
    { title: "Strengthen Spiritual Growth", description: "Grow deeper spiritually through consistent teachings, mentorship, accountability, and transformational conversations." },
    { title: "Build Discipline", description: "Learn how to stay committed to your growth, goals, assignments, and personal development journey." },
    { title: "Gain Accountability", description: "Receive guidance, correction, structure, and accountability that help you stay focused and make measurable progress." },
  ],
  "goal-setting-performance-evaluation-coaching": [
    { title: "Clear Goals", description: "Turn your desires into clear goals, measurable actions, and consistent progress." },
    { title: "Measurable Actions", description: "Set the right goals and turn them into measurable actions you can follow." },
    { title: "Track Performance", description: "Track your performance, evaluate your progress, and adjust with clarity." },
    { title: "Stay Accountable", description: "Stay accountable to the results you want to achieve." },
  ],
  "book-writing-boot-camp": [
    { title: "Refine Your Book Idea", description: "Identify the right book idea, clarify your message, and understand the purpose of your book before you start writing." },
    { title: "Structure Your Content", description: "Arrange your ideas into chapters, sections, and clear flows so your book is easy to read and impactful." },
    { title: "Write With Confidence", description: "Overcome fear, stop waiting for perfection, and build a simple writing rhythm that helps you make progress." },
    { title: "Publish And Launch", description: "Understand the basics of publishing, launching, and promoting your book so it can reach the people it was written for." },
  ],
  "leadership-academy-certification": [
    { title: "Drive Meaningful Change", description: "Develop the mindset, communication, discipline, and leadership capacity needed to influence people positively and create lasting impact." },
    { title: "Develop Leadership Clarity", description: "Understand your identity as a leader, strengthen your confidence, and gain clarity about your leadership assignment and influence." },
    { title: "Improve Communication", description: "Learn how to communicate clearly, connect with people effectively, and inspire meaningful action through your words and leadership presence." },
    { title: "Build Emotional Intelligence", description: "Develop stronger self-awareness, emotional control, maturity, and leadership discipline that help you lead people wisely and effectively." },
  ],
  "purpose-reengineering-masterclass": [
    { title: "Renewed Clarity", description: "By the end of the Purpose Reengineering Masterclass, you will have renewed clarity and direction." },
    { title: "Purpose Blueprint", description: "You will have a redesigned life and purpose blueprint." },
    { title: "Execution Strategy", description: "You will have practical strategies for execution." },
    { title: "Move Forward Boldly", description: "You will gain confidence to move forward boldly with a clearer understanding of your identity and assignment." },
  ],
  "intensive-mentoring-coaching-program": [
    { title: "Deep Clarity", description: "Gain clearer insight into your purpose, current season, next steps, and the areas where you need to focus." },
    { title: "Strategic Guidance", description: "Receive practical guidance for personal, spiritual, leadership, and purpose-driven growth." },
    { title: "Honest Feedback", description: "Get direct feedback that helps you identify blind spots, correct patterns, and make better decisions." },
    { title: "Structured Accountability", description: "Be supported with accountability that helps you stay consistent, disciplined, and committed to your growth." },
  ],
  "certified-professional-coach-program": [
    { title: "Certified Coach", description: "By the end of this program, you will be equipped to become a Certified Professional Coach." },
    { title: "Coaching Structure", description: "Build a clear coaching structure and system." },
    { title: "Guide With Confidence", description: "Guide individuals with clarity and confidence and run professional coaching sessions." },
    { title: "Grow Your Practice", description: "Communicate your value as a coach and start or scale your coaching practice." },
  ],
};

function BenefitsGrid({ program }: { program: ProgramPage }) {
  const items = programOutcomeItems[program.slug] ?? program.benefits.slice(0, 4);
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = getBenefitIcon(item.title);
        return (
          <article
            key={item.title}
            className="benefits-card flex flex-col overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] motion-reduce:hover:translate-y-0"
            style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}
          >
            {/* Icon area */}
            <div style={{ padding: "10px 10px 0 10px" }}>
              <div
                className="benefits-icon-area flex items-center justify-center"
                style={{ backgroundColor: "#F7F7F7", borderRadius: "12px", height: "clamp(140px, 12vw, 170px)" }}
              >
                <Icon size={36} strokeWidth={1.5} className="text-brand-ink" />
              </div>
            </div>
            {/* Text */}
            <div style={{ padding: "18px 22px 26px" }}>
              <h3 className="font-heading" style={{ fontWeight: 700, fontSize: "19px", color: "#111111", marginBottom: "8px", lineHeight: 1.3 }}>
                {item.title}
              </h3>
              <p className="font-body" style={{ fontWeight: 400, fontSize: "14px", color: "#555555", lineHeight: 1.65, margin: 0 }}>
                {item.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function generateStaticParams() {
  return programPages.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};
  return {
    title: `${program.title} | Dr. TEA`,
    description: program.heroSubheadline,
  };
}

type ProgramPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  // Where the "join" CTAs point:
  // - single-price (bank transfer) programs -> their enrollment/payment page
  // - Inner Circle (subscription) -> its existing booking flow, untouched
  // - programs without a price -> inert buttons that go nowhere (for now)
  const joinHref = program.pricing?.single
    ? `/programs/${slug}/enroll`
    : program.pricing?.monthly
      ? "/inner-circle"
      : undefined;

  const guide = program.speakers[0];
  const outcomesHeading = program.outcomesHeading ?? "What You Will Gain";
  const outcomesCopy =
    program.outcomesCopy ??
    "This pathway brings together structure, clarity, and accountability for lasting transformation.";
  const builtFor = program.builtFor ?? ["Clarity", "Structure", "Accountability"];
  const guideHeading =
    program.guideHeading ?? "Structured Guidance For The Person You Are Becoming.";

  return (
    <>
      <RevealProvider />
      <main className="min-h-screen bg-white text-brand-ink">
        {/* ── 1. Hero ── */}
        <section className="flex h-svh flex-col bg-brand-ink text-white">
          <Header transparent />
          <div className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <h1 className="hero-title font-heading font-bold uppercase leading-[0.9] text-white">
                {program.heroHeadline}
              </h1>
              <p className="hero-reveal mx-auto mt-6 max-w-xs font-body text-sm leading-7 text-white/55 sm:max-w-xl sm:text-base">
                {program.heroSubheadline}
              </p>
              <div className="hero-reveal mt-8 flex justify-center">
                <Button href={joinHref}>{program.ctaText}</Button>
              </div>

              {/* Avatar trust bar */}
              <div className="hero-reveal mt-8 flex flex-col items-center gap-2.5">
                <div className="flex items-center" aria-hidden="true">
                  {AVATARS.map((avatar, i) => (
                    <span
                      key={avatar.src}
                      className="relative block size-9 overflow-hidden rounded-full border-2 border-brand-ink"
                      style={{ marginLeft: i === 0 ? 0 : "-0.6rem", zIndex: AVATARS.length - i }}
                    >
                      <Image src={avatar.src} alt={avatar.alt} fill sizes="36px" className="object-cover" />
                    </span>
                  ))}
                </div>
                <p className="mx-auto w-[70%] font-body text-[0.75rem] text-white/55 sm:w-full">
                  {programAvatarText[program.slug] ?? "Join hundreds of people transforming their lives with Dr. TEA"}
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center pb-7">
            <a
              href="#outcomes"
              aria-label="Scroll to program details"
              className="flex flex-col items-center gap-2 text-white/80 transition hover:text-white"
            >
              <span className="flex h-9 w-[1.45rem] items-start justify-center rounded-full border-2 border-white/70 p-1.5">
                <span className="hero-scroll-wheel h-2 w-1.5 rounded-full bg-white/90" />
              </span>
            </a>
          </div>
        </section>

        {/* ── 2. Marquee strip ── */}
        <div className="overflow-hidden border-y border-black/8 bg-white py-4">
          <div
            className="flex w-max gap-0"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {[...Array(3)].flatMap((_, round) =>
              ["Discover Purpose", "Gain Clarity", "Grow Intentionally", "Lead with Impact", "Build Discipline", "Take Action", "Transform Your Life", "Walk in Your Calling"].map((word) => (
                <span
                  key={`${round}-${word}`}
                  className="flex items-center gap-4 px-6 font-heading text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-ink"
                >
                  {word}
                  <span className="size-1.5 shrink-0 rounded-full bg-brand-green" aria-hidden="true" />
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── 3. What You Will Gain ── */}
        <section id="outcomes" className="bg-brand-soft py-20 lg:py-28">
          <Container>
            <div className="reveal text-center">
              <h2 className="font-heading text-[1.75rem] font-medium capitalize leading-tight text-brand-ink lg:text-[2.5rem]">
                {outcomesHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-7 text-brand-muted">
                {outcomesCopy}
              </p>
            </div>
            <BenefitsGrid program={program} />
          </Container>
        </section>

        {/* ── 4. The Experience ── */}
        <section id="experience" className="relative overflow-hidden bg-brand-ink py-24 lg:py-32">
          {/* Diagonal line texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "repeating-linear-gradient(135deg, white 0px, white 1px, transparent 1px, transparent 40px)",
            }}
          />
          {/* Green glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(165,205,57,0.12),transparent)]" />

          <Container>
            <div className="reveal relative mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-[2rem] font-bold leading-tight text-white lg:text-[3rem]">
                {program.leaderBlock.heading}
              </h2>
              <div className="mt-6 space-y-3">
                {program.leaderBlock.body.map((paragraph) => (
                  <p key={paragraph} className="font-body text-base leading-7 text-white/60">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-10">
                <Button href={joinHref}>{program.ctaText}</Button>
              </div>
            </div>
          </Container>
        </section>


        {/* ── 6. Program Pathway ── */}
        <section id="pathway" className="bg-white py-20 lg:py-28">
          <Container>
            {/* Centered heading */}
            <div className="reveal mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-[1.75rem] font-bold leading-tight text-brand-ink lg:text-[2.5rem]">
                {program.playbook.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-7 text-brand-muted">
                {program.playbook.body}
              </p>
            </div>

            {/* Features list */}
            <div className="mt-14">
              <h3 className="mb-7 font-heading font-bold leading-tight text-brand-ink">
                What&apos;s Included
              </h3>
              <ProgramFeaturesList features={program.gridFeatures} />
            </div>

          </Container>
        </section>

        {/* ── 7. Dr. TEA ── */}
        {guide ? (
          <section id="guide" className="bg-white py-20 lg:py-28">
            <Container>
              <div className="flex flex-col items-center text-center">
                {/* Circle image */}
                <div className="image-reveal relative size-40 overflow-hidden rounded-full border-4 border-brand-soft lg:size-52">
                  <Image
                    src={guide.image}
                    alt={guide.name}
                    fill
                    sizes="208px"
                    className="object-cover object-top"
                  />
                </div>
                {/* Name & title */}
                <h2 className="mt-7 font-heading text-[2rem] font-bold leading-tight text-brand-ink lg:text-[2.6rem]">
                  {guide.name}
                </h2>
                <p className="mt-1 font-heading text-[0.85rem] uppercase tracking-[0.16em] text-brand-green">
                  {guide.title}
                </p>
                {/* Short bio */}
                <p className="mx-auto mt-5 max-w-xl font-body text-base leading-7 text-brand-muted">
                  {guide.bio}
                </p>
                <div className="mt-8">
                  <Button href={joinHref}>{program.ctaText}</Button>
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        {/* ── 8. Pricing ── */}
        {program.pricing ? (
          <section id="pricing" className="bg-brand-ink py-20 lg:py-28">
            <Container>
              <PricingPlans pricing={program.pricing} dark />
            </Container>
          </section>
        ) : null}


        {/* ── 10. Testimonials ── */}
        {program.showTestimonials && program.testimonials.length > 0 ? (
          <section id="testimonials" className="bg-brand-soft py-20 lg:py-28">
            <Container>
              <div className="reveal text-center">
                <h2 className="font-heading text-[1.75rem] font-medium capitalize leading-tight text-brand-ink lg:text-[2.5rem]">
                  What Others Are Saying
                </h2>
                <p className="mx-auto mt-4 max-w-xl font-body text-base text-brand-muted">
                  Stories from people gaining clarity, structure, and momentum.
                </p>
              </div>
              <div className="mt-10">
                <TestimonialsCarousel
                  testimonials={program.testimonials.map((t) => t.quote)}
                  context={program.shortTitle}
                />
              </div>
            </Container>
          </section>
        ) : null}

        {/* ── 11. FAQ ── */}
        {program.faqs.length > 0 ? (
          <section id="faq" className="bg-white py-20 lg:py-28">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
                <div className="reveal lg:sticky lg:top-28">
                  <h2 className="font-heading text-[1.75rem] font-medium capitalize leading-tight text-brand-ink lg:text-[2.5rem]">
                    Questions? We Have Clear Answers.
                  </h2>
                  <p className="mt-4 font-body text-base leading-7 text-brand-muted">
                    Everything you need to know before taking the next step.
                  </p>
                </div>
                <FAQAccordion items={program.faqs} />
              </div>
            </Container>
          </section>
        ) : null}


        <Footer />
      </main>
    </>
  );
}
