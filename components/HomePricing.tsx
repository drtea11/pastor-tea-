import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "./Container";

const tiers = [
  {
    name: "Clarity Call",
    price: "Paid",
    period: "",
    description: "A focused 30-minute session to help you identify where you are and what you need.",
    cta: "Book a Call",
    href: "/book-a-call",
    featured: false,
    features: [
      "30-minute one-on-one session",
      "Purpose and direction assessment",
      "Program recommendation",
      "Next-step action plan",
    ],
  },
  {
    name: "Inner Circle",
    price: "By Application",
    period: "",
    description: "Dr. TEA's private community for serious-minded leaders growing with accountability and structure.",
    cta: "Apply Now",
    href: "/programs/inner-circle",
    featured: true,
    features: [
      "Monthly group mentoring sessions",
      "Access to Dr. TEA's resource library",
      "Peer accountability community",
      "Exclusive teachings and workshops",
      "Priority program enrollment",
    ],
  },
  {
    name: "Intensive Mentoring",
    price: "Custom",
    period: "",
    description: "Closer, deeper, and more personalised coaching for leaders who are ready to move fast.",
    cta: "Get Started",
    href: "/programs/intensive-mentoring-coaching-program",
    featured: false,
    features: [
      "Weekly one-on-one sessions",
      "Personalised growth roadmap",
      "Direct access to Dr. TEA",
      "Goal setting and accountability",
      "Spiritual and strategic alignment",
    ],
  },
];

export function HomePricing() {
  return (
    <section className="bg-brand-ink py-20 text-white lg:py-28">
      <Container>
        {/* Heading */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="font-body text-sm italic text-brand-green">
            Work With Dr. TEA
          </p>
          <h2 className="mt-3 font-heading font-medium capitalize leading-tight text-white">
            Find the Right Level of Support
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-base leading-7 text-white/60 lg:text-[1.05rem] lg:leading-8">
            From a clarity call to deep intensive mentoring, there is a pathway designed for exactly where you are.
          </p>
        </div>

        {/* Tier cards */}
        <div className="pricing-grid mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`pricing-card relative flex flex-col overflow-hidden border p-8 transition duration-300 lg:p-9 ${
                tier.featured
                  ? "border-brand-green bg-brand-green/[0.07]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {tier.featured && (
                <div className="absolute inset-x-0 top-0 h-[3px] bg-brand-green" />
              )}

              {tier.featured && (
                <span className="mb-6 inline-flex w-fit bg-brand-green px-3 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-black">
                  Most Popular
                </span>
              )}

              <h3 className="font-heading text-[1.2rem] font-semibold text-white">
                {tier.name}
              </h3>

              <div className="mt-4 flex items-end gap-1.5">
                <span className="font-heading text-[2.2rem] font-bold leading-none text-white">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="mb-1 font-body text-sm text-white/50">
                    {tier.period}
                  </span>
                )}
              </div>

              <p className="mt-4 font-body text-[0.9rem] leading-6 text-white/55">
                {tier.description}
              </p>

              <Link
                href={tier.href}
                className={`mt-8 inline-flex min-h-[52px] w-full items-center justify-center border-2 font-body text-sm font-semibold uppercase leading-none transition duration-200 ${
                  tier.featured
                    ? "border-brand-green bg-brand-green text-black hover:bg-white hover:border-white"
                    : "border-white/20 bg-transparent text-white hover:border-white hover:bg-white hover:text-brand-ink"
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="mt-8 grid gap-3.5 border-t border-white/10 pt-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid size-5 shrink-0 place-items-center bg-brand-green/15 text-brand-green"
                      aria-hidden="true"
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="font-body text-[0.88rem] leading-6 text-white/65">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mx-auto mt-10 w-[70%] text-center font-body text-xs text-white/35 lg:w-full">
          Not sure where to start? <Link href="/book-a-call" className="text-brand-green underline underline-offset-2 hover:text-white transition">Book a clarity call</Link> and we will guide you.
        </p>
      </Container>
    </section>
  );
}
