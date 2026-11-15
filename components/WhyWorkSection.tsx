import { Container } from "./Container";

const reasons = [
  {
    title: "Scripture-Rooted Wisdom",
    body: "Our approach is grounded in biblical truth and spiritual insight. Purpose is not just personal ambition — it is connected to God's design, assignment, and intention for your life.",
  },
  {
    title: "Practical Coaching Systems",
    body: "Clarity is powerful, but structure makes it useful. Our programs provide practical frameworks, exercises, tools, and action steps that help you move from inspiration to real execution.",
  },
  {
    title: "Experience-Backed Guidance",
    body: "You are not just learning theory. You are receiving guidance shaped by years of ministry, leadership, mentoring, youth development, teaching, and transformational impact.",
  },
  {
    title: "Accountability That Drives Growth",
    body: "Many people do not fail because they lack potential. They struggle because they lack structure and accountability. Our programs help you stay focused, disciplined, and committed.",
  },
  {
    title: "Transformation, Not Motivation Alone",
    body: "We do not only inspire you for a moment. We help you think deeper, gain clarity, take action, and build the kind of life that reflects your purpose and calling.",
  },
];

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.12" />
    <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true">
    <path d="M0 24V14.4C0 10.56 0.96 7.36 2.88 4.8C4.86667 2.24 7.68 0.64 11.328 0L12.864 2.784C10.4427 3.26133 8.512 4.32 7.072 5.952C5.69067 7.584 5.02933 9.472 5.088 11.616H9.6V24H0ZM19.2 24V14.4C19.2 10.56 20.16 7.36 22.08 4.8C24.0667 2.24 26.88 0.64 30.528 0L32.064 2.784C29.6427 3.26133 27.712 4.32 26.272 5.952C24.8907 7.584 24.2293 9.472 24.288 11.616H28.8V24H19.2Z" fill="currentColor" fillOpacity="0.25"/>
  </svg>
);

export function WhyWorkSection() {
  return (
    <section className="bg-black py-20 lg:py-28">
      <Container>
        {/* Heading */}
        <div className="mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-2.5 font-body text-[0.72rem] font-medium uppercase tracking-[0.18em] text-brand-green">
            <span className="block h-px w-8 bg-brand-green" aria-hidden="true" />
            Why Work With Us
          </span>
          <h2 className="mt-4 max-w-xl font-heading font-semibold capitalize leading-tight text-white">
            Guidance You Can Trust.<br />Growth You Can Measure.
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]">

          {/* ── Row 1 ── */}

          {/* Stat: 500+ Lives — large dark card */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl bg-brand-ink p-7 ring-1 ring-white/8 lg:col-span-4 lg:row-span-1">
            <span className="font-heading text-[3.8rem] font-bold leading-none text-white lg:text-[4.5rem]">
              500<span className="text-brand-green">+</span>
            </span>
            <div className="mt-6">
              <p className="font-heading text-[1rem] font-semibold text-white">Lives Impacted</p>
              <p className="mt-1.5 font-body text-[0.82rem] leading-5 text-white/50">
                Individuals coached, mentored, and transformed across programs.
              </p>
            </div>
          </div>

          {/* Reason 1: Scripture-Rooted Wisdom — spans wide */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#111315] p-7 ring-1 ring-white/8 lg:col-span-8">
            <div className="flex items-start gap-3 text-brand-green">
              <CheckIcon />
              <span className="font-heading text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-green">
                Scripture-Rooted Wisdom
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-heading text-[1.45rem] font-semibold leading-snug text-white lg:text-[1.65rem]">
                Purpose connected to God's design, assignment, and intention for your life.
              </h3>
              <p className="mt-3 max-w-lg font-body text-[0.9rem] leading-6 text-white/50">
                {reasons[0].body}
              </p>
            </div>
          </div>

          {/* ── Row 2 ── */}

          {/* Reason 2: Practical Systems */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#111315] p-7 ring-1 ring-white/8 lg:col-span-5">
            <div className="flex items-start gap-3">
              <span className="text-brand-blue"><CheckIcon /></span>
              <span className="font-heading text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Practical Coaching Systems
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-heading text-[1.1rem] font-semibold leading-snug text-white">
                From inspiration to real execution.
              </h3>
              <p className="mt-2 font-body text-[0.85rem] leading-6 text-white/50">
                {reasons[1].body}
              </p>
            </div>
          </div>

          {/* Stat: 10+ Years — green accent */}
          <div className="flex flex-col justify-between rounded-2xl bg-brand-green p-7 lg:col-span-3">
            <span className="font-heading text-[3.2rem] font-bold leading-none text-brand-ink lg:text-[3.8rem]">
              10+
            </span>
            <div className="mt-6">
              <p className="font-heading text-[0.95rem] font-semibold text-brand-ink">Years of Experience</p>
              <p className="mt-1 font-body text-[0.8rem] leading-5 text-brand-ink/60">
                Ministry, leadership, mentoring &amp; transformational coaching.
              </p>
            </div>
          </div>

          {/* Reason 3: Experience-Backed */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#111315] p-7 ring-1 ring-white/8 lg:col-span-4">
            <div className="flex items-start gap-3">
              <span className="text-white/40"><CheckIcon /></span>
              <span className="font-heading text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/50">
                Experience-Backed Guidance
              </span>
            </div>
            <div className="mt-6">
              <h3 className="font-heading text-[1.05rem] font-semibold leading-snug text-white">
                Not theory — real guidance from real impact.
              </h3>
              <p className="mt-2 font-body text-[0.82rem] leading-6 text-white/50">
                {reasons[2].body}
              </p>
            </div>
          </div>

          {/* ── Row 3 ── */}

          {/* Testimonial quote */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#0c0f12] p-7 ring-1 ring-white/8 lg:col-span-5">
            <QuoteIcon />
            <blockquote className="mt-6">
              <p className="font-heading text-[1.1rem] font-medium italic leading-7 text-white">
                &ldquo;The teachings are deep, practical, and transformational. I did not just feel inspired — I knew exactly what to do next.&rdquo;
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <span className="block h-px w-6 bg-brand-green" aria-hidden="true" />
                <cite className="font-body text-[0.78rem] not-italic text-white/40">Inner Circle Member</cite>
              </footer>
            </blockquote>
          </div>

          {/* Stat: 8 Programs */}
          <div className="flex flex-col justify-between rounded-2xl bg-brand-ink p-7 ring-1 ring-white/8 lg:col-span-3">
            <span className="font-heading text-[3.2rem] font-bold leading-none text-white lg:text-[3.8rem]">
              8
            </span>
            <div className="mt-6">
              <p className="font-heading text-[0.95rem] font-semibold text-white">Structured Programs</p>
              <p className="mt-1 font-body text-[0.8rem] leading-5 text-white/50">
                Purposeful pathways for every season of growth.
              </p>
            </div>
          </div>

          {/* Reason 4 + 5 stacked */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <div className="flex flex-1 flex-col justify-between rounded-2xl bg-[#111315] p-6 ring-1 ring-white/8">
              <div className="flex items-start gap-3">
                <span className="text-brand-green"><CheckIcon /></span>
                <span className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-green">
                  Accountability That Drives Growth
                </span>
              </div>
              <p className="mt-4 font-body text-[0.82rem] leading-6 text-white/55">
                {reasons[3].body}
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-2xl bg-[#111315] p-6 ring-1 ring-white/8">
              <div className="flex items-start gap-3">
                <span className="text-brand-blue"><CheckIcon /></span>
                <span className="font-heading text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                  Transformation, Not Motivation Alone
                </span>
              </div>
              <p className="mt-4 font-body text-[0.82rem] leading-6 text-white/55">
                {reasons[4].body}
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
