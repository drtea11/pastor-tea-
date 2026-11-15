import { BookOpen, ShieldCheck, TrendingUp, Users, Target, Lightbulb } from "lucide-react";
import { Container } from "./Container";

const benefits = [
  {
    icon: BookOpen,
    title: "Scripture-Rooted Wisdom",
    body: "Purpose is connected to God's design and assignment. Every program is grounded in biblical truth and spiritual insight.",
  },
  {
    icon: ShieldCheck,
    title: "Experience-Backed Guidance",
    body: "Shaped by years of ministry, leadership, mentoring, and transformational impact across individuals and organisations.",
  },
  {
    icon: TrendingUp,
    title: "Transformation, Not Just Motivation",
    body: "We help you think deeper, gain clarity, take action, and build a life that reflects your purpose and calling.",
  },
  {
    icon: Target,
    title: "Structured & Accountable",
    body: "Every pathway is built with clear milestones and accountability so growth feels intentional, not overwhelming.",
  },
  {
    icon: Users,
    title: "Community of Serious Leaders",
    body: "You grow faster in the right environment. Connect with purpose-driven individuals committed to the same journey.",
  },
  {
    icon: Lightbulb,
    title: "Clarity at Every Stage",
    body: "Whether you are discovering your purpose or scaling your impact, there is a program designed for exactly where you are.",
  },
];

export function WhyWorkSteps() {
  return (
    <section id="why-work" className="bg-brand-soft py-20 text-black lg:py-28">
      <Container>

        {/* Heading */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="font-body text-sm italic text-brand-blue">Why Dr. TEA</p>
          <h2 className="mt-3 font-heading text-[1.75rem] font-medium leading-[1.2] text-brand-ink sm:text-[2.1rem] lg:text-[2.6rem]">
            Growth should feel{" "}
            <span className="text-brand-green">intentional,</span>{" "}
            not overwhelming.
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-base leading-7 text-brand-muted lg:text-[1.05rem] lg:leading-8">
            Here is what makes every program built by Dr. TEA different from everything else you have tried.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="reveal-card flex flex-col gap-5 bg-white p-7"
              >
                <span className="flex size-11 items-center justify-center bg-brand-ink">
                  <Icon size={18} strokeWidth={1.8} className="text-white" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-[1rem] font-semibold leading-tight text-brand-ink lg:text-[1.1rem]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 font-body text-[0.88rem] leading-6 text-brand-muted">
                    {benefit.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
