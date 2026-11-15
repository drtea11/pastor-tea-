export type ProgramBenefit = {
  title: string;
  description: string;
};

export type ProgramSpeaker = {
  name: string;
  title: string;
  bio: string;
  image: string;
};

export type ProgramTestimonial = {
  quote: string;
  name?: string;
};

export type ProgramFaq = {
  question: string;
  answer: string;
};

export type ProgramPricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
};

export type ProgramPricing = {
  eyebrow: string;
  heading: string;
  description: string;
  savingLabel?: string;
  monthlyLabel?: string;
  annualLabel?: string;
  // Toggle mode (e.g. Inner Circle Monthly/Annual). Omit for single-price mode.
  monthly?: ProgramPricingPlan;
  annual?: ProgramPricingPlan;
  // Single-price mode (one plan card, no toggle).
  single?: ProgramPricingPlan;
};

export type ProgramFactBar = {
  format: string;
  duration: string;
  bestFor: string;
  outcome: string;
};

export type ProgramTier = "flagship" | "focused";

export type ProgramPage = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  tier: ProgramTier;
  heroHeadline: string;
  heroSubheadline: string;
  heroSecondaryCtaText?: string;
  ctaText: string;
  detailLine?: string;
  stat: string;
  heroImage: string;
  heroImageAlt: string;
  accentColor: string;
  factBar?: ProgramFactBar;
  benefits: ProgramBenefit[];
  outcomesHeading?: string;
  outcomesCopy?: string;
  experienceLabel?: string;
  builtFor?: string[];
  whyNowLabel?: string;
  guideHeading?: string;
  showTestimonials?: boolean;
  featureSection: {
    heading: string;
    body: string;
    supportingLine: string;
    images: string[];
  };
  leaderBlock: {
    heading: string;
    body: string[];
    image: string;
  };
  urgency: {
    heading: string;
    body: string;
    image: string;
  };
  gridFeatures: ProgramBenefit[];
  playbook: {
    heading: string;
    body: string;
    image: string;
  };
  ownershipCta: {
    heading: string;
    body: string;
    button: string;
  };
  speakers: ProgramSpeaker[];
  testimonials: ProgramTestimonial[];
  faqs: ProgramFaq[];
  pricing?: ProgramPricing;
};

const drTeaSpeaker: ProgramSpeaker = {
  name: "Dr. Temitope Ebenezer Arowele",
  title: "Purpose Mentor, Leadership Coach, Teacher, Author, and Speaker",
  bio: "Dr. TEA helps individuals and leaders gain clarity, grow spiritually, build capacity, and walk boldly in their God-ordained purpose.",
  image: "/images/pastor-tea-program-9-cleaned.png",
};

const sharedTestimonials: ProgramTestimonial[] = [
  {
    quote:
      "Every session gives me clarity, direction, and the courage to act on what God has placed in my heart.",
  },
  {
    quote:
      "The structure, wisdom, and accountability helped me move from confusion to focused action.",
  },
  {
    quote:
      "I found language for my purpose and practical steps for building with discipline and faith.",
  },
];

const sharedFaqs: ProgramFaq[] = [
  {
    question: "How do I know which program is right for me?",
    answer:
      "Start with the program that matches your current season. If you need clarity, begin with purpose discovery. If you need structure and accountability, choose coaching, mentoring, or the Inner Circle.",
  },
  {
    question: "Are the programs faith-based?",
    answer:
      "Yes. Dr. TEA's work is spiritually grounded while remaining practical, structured, and focused on real transformation.",
  },
  {
    question: "Can I schedule a consultation first?",
    answer:
      "Yes. You can schedule a consultation to discuss your goals, current challenges, and the best next step.",
  },
];

function cohortPricing(config: {
  slug: string;
  shortTitle: string;
  price: string;
  ctaHref?: string;
  features: string[];
}): ProgramPricing {
  const { slug, shortTitle, price, ctaHref = `/programs/${slug}/enroll`, features } = config;
  return {
    eyebrow: "Program Pricing",
    heading: "Reserve Your Place in the Cohort",
    description: `Join the next ${shortTitle} cohort and secure your spot today.`,
    single: {
      id: `${slug}-enrollment`,
      name: "Full Program Enrollment",
      price,
      period: "one-time",
      description: "One-time enrollment covering the complete program experience.",
      features,
      ctaLabel: "Enroll Now",
      ctaHref,
    },
  };
}

export const programPages: ProgramPage[] = [
  {
    slug: "purpose-discovery-clarity-coaching",
    title: "Purpose Discovery & Clarity Coaching",
    shortTitle: "Purpose Discovery",
    tier: "focused",
    factBar: {
      format: "1-on-1 Coaching",
      duration: "Guided Sessions",
      bestFor: "Anyone seeking clarity of purpose",
      outcome: "A clear sense of identity & next steps",
    },
    summary:
      "Discover why you were born and gain the clarity you need to walk boldly in your God-ordained purpose.",
    heroHeadline: "Find Your Purpose",
    heroSubheadline:
      "Stop guessing. Gain clarity on your identity, calling, and next steps.",
    ctaText: "Start Your Purpose Journey",
    detailLine: "Purpose Discovery & Clarity Coaching",
    stat: "Move From Confusion To Clarity With A Guided Path For Your Purpose.",
    heroImage: "/images/pastor-tea-program-2-cleaned.png",
    heroImageAlt: "Dr. TEA speaking on stage about purpose and clarity",
    accentColor: "#0394d7",
    benefits: [
      {
        title: "Clarify Your Assignment",
        description:
          "Uncover the core patterns, burdens, gifts, and convictions that point toward your God-ordained purpose.",
      },
      {
        title: "Gain Direction",
        description:
          "Turn scattered desires into a clearer life direction with practical next steps.",
      },
      {
        title: "Build Confidence",
        description:
          "Develop the courage to stop drifting and begin moving with spiritual and practical alignment.",
      },
      {
        title: "Walk Boldly",
        description:
          "Leave with language, clarity, and a stronger sense of how to obey what God is calling you to build.",
      },
    ],
    featureSection: {
      heading: "Go From Searching To Seeing Clearly",
      body:
        "Purpose Discovery & Clarity Coaching helps you make sense of your life patterns, strengths, spiritual burden, and current season so your next step becomes clearer.",
      supportingLine:
        "This is for people who know there is more, but need guidance to name it, organize it, and move with confidence.",
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    leaderBlock: {
      heading: "Built For People Who Need Direction, Not Noise",
      body: [
        "Clarity is not found in more content — it is found in structured reflection, the right questions, and honest guidance for your specific season.",
      ],
      image: "/images/pasttor tea hero.png",
    },
    urgency: {
      heading: "Now Is The Time To Stop Drifting",
      body:
        "Clarity rarely appears by accident. This is your invitation to pause, listen, and begin moving in the direction of your assignment.",
      image: "/images/pastor tea corporate image.png",
    },
    gridFeatures: [
      {
        title: "Purpose Language",
        description:
          "Find clearer words for what you carry, what you are called to solve, and who you are called to serve.",
      },
      {
        title: "Spiritual Alignment",
        description:
          "Process your goals through faith, wisdom, and the unique grace on your life.",
      },
      {
        title: "Practical Direction",
        description:
          "Turn discovery into focused actions, priorities, and commitments.",
      },
      {
        title: "Personal Confidence",
        description:
          "Build the courage to walk boldly in the purpose God has placed in you.",
      },
      {
        title: "Next Steps",
        description:
          "Leave with a clear, actionable plan for the immediate steps your season requires.",
      },
      {
        title: "Renewed Focus",
        description:
          "Remove distractions and redirect your energy toward what actually matters most.",
      },
      {
        title: "Identity Clarity",
        description:
          "Understand who you are at your core — your values, wiring, and God-given design.",
      },
      {
        title: "Assignment Awareness",
        description:
          "Move from vague potential to a specific understanding of what you are called to do.",
      },
      {
        title: "Overcoming Confusion",
        description:
          "Break free from the paralysis of overthinking and begin moving with focused intentionality.",
      },
      {
        title: "Lasting Transformation",
        description:
          "Clarity gained in this program is built to stay — not just inspire in the moment.",
      },
      {
        title: "Gifts Discovery",
        description:
          "Identify the specific gifts and strengths that set you apart and point toward your assignment.",
      },
      {
        title: "Season Awareness",
        description:
          "Understand the season you are in and what it requires of you right now.",
      },
    ],
    playbook: {
      heading: "This Is Your Clarity And Purpose Playbook",
      body:
        "Use this coaching pathway to identify what matters, remove confusion, and begin taking aligned steps with confidence.",
      image: "/images/mind shift.jpg",
    },
    ownershipCta: {
      heading: "Own Your Calling, Do Not Drift Through It",
      body: "Take the next step toward clarity, confidence, and purpose-led action.",
      button: "Start Your Discovery",
    },
    speakers: [drTeaSpeaker],
    testimonials: sharedTestimonials,
    faqs: sharedFaqs,
  },
  {
    slug: "inner-circle",
    title: "The Inner Circle",
    shortTitle: "Inner Circle",
    tier: "flagship",
    showTestimonials: true,
    factBar: {
      format: "Private Community",
      duration: "Monthly or Annual",
      bestFor: "Those serious about consistent growth",
      outcome: "Mentorship, structure & accountability",
    },
    summary:
      "A private, high-impact growth community for purpose, leadership, spiritual growth, and accountability.",
    heroHeadline: "Grow in the Right Circle",
    heroSubheadline:
      "A private community for purpose, spiritual growth, and consistent accountability.",
    ctaText: "Join the Inner Circle",
    detailLine: "The Inner Circle",
    stat: "Growth Becomes Easier In The Right Environment.",
    heroImage: "/images/pastor-tea-program-8-cleaned.png",
    heroImageAlt: "Purpose-driven leaders in a private mentoring conversation",
    accentColor: "#a5cd39",
    benefits: [
      {
        title: "Monthly Empowerment Sessions",
        description:
          "Learn directly from Dr. TEA through focused teaching, coaching, and strategic life guidance.",
      },
      {
        title: "Live Q&A And Mentoring",
        description:
          "Bring your questions, decisions, and growth challenges into a guided environment.",
      },
      {
        title: "Accountability And Structure",
        description:
          "Stay committed to your goals through a community that encourages consistent progress.",
      },
      {
        title: "Purpose-Driven Community",
        description:
          "Grow with people who are serious about leadership, transformation, and destiny.",
      },
    ],
    featureSection: {
      heading: "Go From Isolated Ambition To Supported Growth",
      body:
        "The Inner Circle gives you access to teaching, mentoring, accountability, and a community built for people who want to grow intentionally.",
      supportingLine:
        "A private environment for spiritual depth, leadership development, and consistent momentum.",
      images: [
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    leaderBlock: {
      heading: "Built For Consistent Growth",
      body: [
        "Inspiration fades. Structure stays. The Inner Circle gives you the environment, accountability, and mentoring to keep growing intentionally.",
      ],
      image: "/images/dr-tea-coaching-session-generated.png",
    },
    urgency: {
      heading: "Now Is The Time To Grow With The Right Environment",
      body:
        "If your next level requires wisdom, structure, and consistent accountability, do not keep trying to grow in isolation.",
      image: "/images/pastor tea footer image .png",
    },
    gridFeatures: [
      {
        title: "Community",
        description:
          "A private environment for people who are serious about purpose and growth.",
      },
      {
        title: "Mentoring",
        description:
          "Direct guidance from Dr. TEA through teaching, Q&A, and strategic insight.",
      },
      {
        title: "Resources",
        description:
          "Access to curated tools, recordings, and materials that support your development.",
      },
      {
        title: "Accountability",
        description:
          "Structure that helps you follow through on what you are called to build.",
      },
      {
        title: "Spiritual Growth",
        description:
          "Grow deeper in your faith, calling, and understanding of your God-given assignment.",
      },
      {
        title: "Consistent Progress",
        description:
          "Monthly sessions keep you moving — not in bursts, but in steady, sustainable growth.",
      },
      {
        title: "Live Teaching",
        description:
          "Receive focused monthly teaching from Dr. TEA on purpose, growth, and intentional living.",
      },
      {
        title: "Peer Environment",
        description:
          "Surround yourself with serious, growth-minded people who sharpen and encourage you.",
      },
      {
        title: "Purpose Alignment",
        description:
          "Stay connected to your calling through regular content and structured reflection.",
      },
      {
        title: "Long-Term Development",
        description:
          "This is not a quick fix — it is a sustained environment designed for lasting personal growth.",
      },
      {
        title: "Q&A Access",
        description:
          "Bring your real questions and receive direct, practical answers from Dr. TEA.",
      },
      {
        title: "Growth Library",
        description:
          "Access recordings, resources, and materials that support your development between sessions.",
      },
    ],
    playbook: {
      heading: "This Is Your Growth And Accountability Playbook",
      body:
        "Use the Inner Circle environment to stay aligned, supported, and consistently challenged toward growth.",
      image: "/images/dr-tea-coaching-session-generated.png",
    },
    ownershipCta: {
      heading: "Do Not Grow Alone",
      body: "Join a private community designed for purpose, leadership, and spiritual growth.",
      button: "Apply to Join",
    },
    speakers: [drTeaSpeaker],
    testimonials: sharedTestimonials,
    faqs: [
      {
        question: "What is the Inner Circle?",
        answer:
          "The Inner Circle is a private growth, mentoring, and accountability community created by Dr. Temitope Ebenezer Arowele for individuals who are serious about purpose, spiritual growth, leadership, discipline, and personal transformation.",
      },
      {
        question: "Who is the Inner Circle for?",
        answer:
          "It is for purpose-driven individuals, youths, professionals, leaders, authors, speakers, coaches, ministers, and anyone who wants to grow with clarity, structure, and accountability.",
      },
      {
        question: "How do I access my membership?",
        answer:
          "After subscribing, you will receive details on how to access the Inner Circle community, teachings, updates, and available member resources.",
      },
      {
        question: "What do I get as a member?",
        answer:
          "You get access to growth teachings, mentorship insights, accountability support, community conversations, purpose-driven resources, and sessions designed to help you grow spiritually, personally, and mentally.",
      },
      {
        question: "Are live sessions included?",
        answer:
          "Yes. Members will have access to scheduled live teachings, mentorship sessions, and growth conversations as part of the Inner Circle experience.",
      },
      {
        question: "Will replays be available?",
        answer:
          "Where applicable, replays may be made available for members who are unable to attend live sessions.",
      },
      {
        question: "How much does it cost?",
        answer:
          "The monthly membership is ₦5,000 per month, while the annual membership is ₦50,000 per year.",
      },
      {
        question: "Can I cancel anytime?",
        answer:
          "Yes. Members can cancel their subscription. Monthly members will keep access until the end of their current billing cycle, while annual members will keep access until the end of their yearly access period.",
      },
    ],
    pricing: {
      eyebrow: "Membership Pricing",
      heading: "Join a Community Designed for Growth",
      description:
        "Structure, accountability, and community for people serious about growing with purpose.",
      savingLabel: "Save 17%",
      monthly: {
        id: "inner-circle-monthly",
        name: "Monthly Growth Access",
        price: "₦5,000",
        period: "/month",
        description:
          "Flexible monthly access to mentorship, teachings, accountability, and the Inner Circle community.",
        features: [
          "Monthly live teaching and growth sessions",
          "Access to the private Inner Circle community",
          "Mentorship insights and practical guidance",
          "Accountability prompts to keep you focused",
          "Purpose, leadership, and spiritual growth resources",
          "Community conversations with growth-minded individuals",
        ],
        ctaLabel: "Subscribe for ₦5,000 / Month",
        ctaHref: "/inner-circle?plan=monthly",
      },
      annual: {
        id: "inner-circle-annual",
        name: "Annual Growth Access",
        price: "₦50,000",
        period: "/year",
        description:
          "A better-value option for individuals committed to long-term growth, consistency, and transformation.",
        features: [
          "Everything in the monthly membership",
          "Full-year access to the Inner Circle community",
          "Exclusive annual member updates and resources",
          "Ongoing mentorship, teachings, and accountability",
          "A better-value plan for consistent personal growth",
        ],
        ctaLabel: "Subscribe for ₦50,000 / Year",
        ctaHref: "/inner-circle?plan=annual",
        badge: "Best Value",
      },
    },
  },
  {
    slug: "goal-setting-performance-evaluation-coaching",
    title: "Goal Setting & Performance Evaluation Coaching",
    shortTitle: "Goal Setting",
    tier: "focused",
    factBar: {
      format: "Coaching Program",
      duration: "Structured Sessions",
      bestFor: "Doers who want measurable progress",
      outcome: "Clear goals tracked into real results",
    },
    summary:
      "Turn desires into clear goals, measurable actions, consistent progress, and stronger accountability.",
    heroHeadline: "Turn Goals into Progress",
    heroSubheadline:
      "Set the right goals, track your progress, and build the discipline to achieve them.",
    ctaText: "Build Your Growth Plan",
    detailLine: "Goal Setting & Performance Evaluation Coaching",
    stat: "Turn Unclear Goals Into Measurable Actions And Consistent Progress.",
    heroImage: "/images/pastor-tea-programs-3-cleaned.png",
    heroImageAlt: "Dr. TEA in an office setting for goal-setting guidance",
    accentColor: "#0394d7",
    benefits: [
      {
        title: "Goal Clarity",
        description:
          "Define what matters now and separate meaningful goals from vague intentions.",
      },
      {
        title: "Measurable Action",
        description:
          "Break goals into actions that can be tracked, evaluated, and improved.",
      },
      {
        title: "Performance Review",
        description:
          "Evaluate progress honestly so growth becomes visible and repeatable.",
      },
      {
        title: "Accountability Rhythm",
        description:
          "Create a practical structure for follow-through, discipline, and consistent improvement.",
      },
    ],
    featureSection: {
      heading: "Go From Intention To Execution",
      body:
        "This coaching experience helps you clarify your goals, identify the habits and actions required, and evaluate progress with structure.",
      supportingLine:
        "You will leave with clearer priorities, measurable next steps, and a stronger accountability framework.",
      images: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    leaderBlock: {
      heading: "Built For People Ready To Follow Through",
      body: [
        "Wishing for results is not enough — you need clear goals, a system to track them, and the discipline to follow through when it gets difficult.",
      ],
      image: "/images/Pastor Tea Office .jpg",
    },
    urgency: {
      heading: "Now Is The Time To Stop Postponing Progress",
      body:
        "If the same goals keep returning without measurable movement, it is time to build a better system for execution.",
      image: "/images/dr-tea-coaching-session-generated.png",
    },
    gridFeatures: [
      {
        title: "Clear Priorities",
        description: "Identify what deserves attention in this season.",
      },
      {
        title: "Action Plan",
        description: "Break large goals into focused and trackable steps.",
      },
      {
        title: "Evaluation Rhythm",
        description: "Review progress and adjust strategy with honesty.",
      },
      {
        title: "Stronger Accountability",
        description: "Stay consistent through structure and guided follow-up.",
      },
      {
        title: "Confidence In Execution",
        description: "Stop second-guessing and start moving with clarity and disciplined intention.",
      },
      {
        title: "Honest Assessment",
        description: "Get a clear picture of where you are so you can plan where you need to go.",
      },
      {
        title: "Measurable Milestones",
        description: "Set goals with specific outcomes you can actually track and celebrate.",
      },
      {
        title: "Decision Clarity",
        description: "Know what to say yes to, what to drop, and where to direct your focus each season.",
      },
      {
        title: "Reduced Overwhelm",
        description: "Simplify your workload by building a clear system that replaces scattered effort.",
      },
      {
        title: "Discipline Building",
        description: "Develop the consistency needed to follow through when motivation fades.",
      },
      {
        title: "Progress Reviews",
        description: "Regular checkpoints ensure you are moving in the right direction and adjusting as needed.",
      },
      {
        title: "Goal Prioritisation",
        description: "Focus on the goals that will produce the highest impact rather than chasing everything at once.",
      },
    ],
    playbook: {
      heading: "This Is Your Goals And Performance Playbook",
      body:
        "Use the coaching process to define your next level, track your progress, and build disciplined follow-through.",
      image: "/images/pastor-tea-office.jpg",
    },
    ownershipCta: {
      heading: "Own Your Goals, Do Not Just Announce Them",
      body: "Build the structure that turns desire into measurable movement.",
      button: "Book Goal Coaching",
    },
    speakers: [drTeaSpeaker],
    testimonials: sharedTestimonials,
    faqs: sharedFaqs,
  },
  {
    slug: "book-writing-boot-camp",
    title: "Book Writing Boot Camp",
    shortTitle: "Book Writing",
    tier: "focused",
    factBar: {
      format: "Group Boot Camp",
      duration: "30 Days",
      bestFor: "Aspiring authors with a message",
      outcome: "A structured, near-complete manuscript",
    },
    summary:
      "Move from book idea to structured manuscript with guidance, support, and practical writing systems.",
    heroHeadline: "Write Your Book",
    heroSubheadline:
      "Go from idea to structured manuscript with practical guidance and writing accountability.",
    ctaText: "Start Writing Your Book",
    detailLine: "Book Writing Boot Camp",
    stat: "Turn Your Message Into A Structured Manuscript With A Practical Writing System.",
    heroImage: "/images/pastor-tea-programs-5-cleaned.png",
    heroImageAlt: "Dr. TEA on stage for book writing and message development",
    accentColor: "#a5cd39",
    benefits: [
      {
        title: "Clarify Your Book Idea",
        description:
          "Refine the core message, audience, and transformation your book is designed to deliver.",
      },
      {
        title: "Structure Your Manuscript",
        description:
          "Build chapters, flow, and content architecture before writing becomes overwhelming.",
      },
      {
        title: "Write With Accountability",
        description:
          "Stay consistent through guided milestones, writing prompts, and practical support.",
      },
      {
        title: "Prepare To Publish",
        description:
          "Understand the next steps required to move from manuscript to a finished book.",
      },
    ],
    featureSection: {
      heading: "Go From Idea To Organized Writing",
      body:
        "Book Writing Boot Camp helps you organize your message, develop a structure, and make steady progress toward a manuscript.",
      supportingLine:
        "This is for people carrying a message who need a system, not just motivation.",
      images: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    leaderBlock: {
      heading: "Built For Authors With A Message To Steward",
      body: [
        "Your message deserves more than a good idea — it needs structure, discipline, and a clear process to move from thought to finished manuscript.",
      ],
      image: "/images/pastor tea footer image .png",
    },
    urgency: {
      heading: "Now Is The Time To Write What You Have Been Carrying",
      body:
        "If the message has been in your heart for years, this is your moment to give it structure and begin moving.",
      image: "/images/Pastor Tea Office .jpg",
    },
    gridFeatures: [
      {
        title: "Book Concept",
        description: "Clarify the promise, reader, and central message.",
      },
      {
        title: "Chapter Structure",
        description: "Create a practical manuscript outline before drafting.",
      },
      {
        title: "Writing Rhythm",
        description: "Build momentum through assignments and accountability.",
      },
      {
        title: "Publishing Readiness",
        description: "Prepare for the practical steps beyond the manuscript.",
      },
      {
        title: "Overcoming Writer's Block",
        description: "Break through fear, perfectionism, and delay with practical tools and accountability.",
      },
      {
        title: "Message Clarity",
        description: "Know exactly what you are saying, who it is for, and why it needs to exist.",
      },
      {
        title: "Target Reader Focus",
        description: "Write with a specific person in mind so every chapter carries weight and direction.",
      },
      {
        title: "Title And Positioning",
        description: "Develop a compelling title and book concept that communicates value immediately.",
      },
      {
        title: "Editing Readiness",
        description: "Understand what comes after the first draft and how to prepare your manuscript well.",
      },
      {
        title: "Author Confidence",
        description: "Step into the identity of an author — not one day, but now, with structure behind you.",
      },
      {
        title: "Launch Awareness",
        description: "Understand how to introduce your book to the world with intentionality and clarity.",
      },
      {
        title: "Writing Accountability",
        description: "Stay on track with assignments and check-ins that keep your manuscript moving forward.",
      },
    ],
    playbook: {
      heading: "This Is Your Book Writing Playbook",
      body:
        "Use this pathway to organize your idea, structure your chapters, and move toward a completed manuscript.",
      image: "/images/heal-your-past-change-your-future.jpg",
    },
    ownershipCta: {
      heading: "Own Your Message And Write The Book",
      body: "Move from idea to manuscript with structure, support, and accountability.",
      button: "Join the Boot Camp",
    },
    speakers: [drTeaSpeaker],
    testimonials: sharedTestimonials,
    pricing: cohortPricing({
      slug: "book-writing-boot-camp",
      shortTitle: "Book Writing",
      price: "₦45,000",
      features: [
        "Full 30-day boot camp access",
        "Book concept and chapter structuring",
        "Weekly writing assignments and accountability",
        "Publishing and launch fundamentals",
        "Group coaching with Dr. TEA",
      ],
    }),
    faqs: [
      {
        question: "Who is the Book Writing Boot Camp for?",
        answer:
          "It is for aspiring authors, leaders, coaches, ministers, speakers, professionals, and anyone who wants to write a book but needs clarity, structure, and accountability.",
      },
      {
        question: "Do I need to have a book idea before joining?",
        answer:
          "No. If you already have an idea, the boot camp will help you refine and structure it. If you do not have one yet, you will be guided to discover a strong book idea.",
      },
      {
        question: "Is this boot camp beginner-friendly?",
        answer:
          "Yes. The program is designed for beginners and aspiring authors who may not have written a book before.",
      },
      {
        question: "Will I complete my book in 30 days?",
        answer:
          "The goal is to help you make strong progress within 30 days. Depending on your consistency, you may complete your manuscript or finish with a clear structure and a near-completed draft.",
      },
      {
        question: "Will I learn how to publish my book?",
        answer:
          "Yes. You will be introduced to the basics of publishing and launching so you understand the next steps after writing.",
      },
      {
        question: "Will there be assignments?",
        answer:
          "Yes. Practical assignments are part of the boot camp. They are designed to help you write, not just learn.",
      },
      {
        question: "Do I need to be a professional writer?",
        answer:
          "No. You do not need to be a professional writer. The boot camp will help you write clearly, confidently, and consistently.",
      },
    ],
  },
  {
    slug: "leadership-academy-certification",
    title: "Leadership Academy Certification",
    shortTitle: "Leadership Academy",
    tier: "flagship",
    showTestimonials: true,
    factBar: {
      format: "Certification Program",
      duration: "Structured Cohort",
      bestFor: "Emerging & established leaders",
      outcome: "Become a certified, confident leader",
    },
    summary:
      "Build the mindset, communication, ethics, and spiritual maturity required to lead with excellence.",
    heroHeadline: "Lead with Impact",
    heroSubheadline:
      "Build the mindset, communication, and discipline to lead with clarity and lasting impact.",
    ctaText: "Start Your Leadership Journey",
    detailLine: "Leadership Academy Certification",
    stat: "Build The Leadership Capacity Required To Serve People And Steward Influence Well.",
    heroImage: "/images/pastor-tea-program-9-cleaned.png",
    heroImageAlt: "Dr. TEA teaching leadership principles on stage",
    accentColor: "#0394d7",
    benefits: [
      {
        title: "Leadership Mindset",
        description:
          "Develop the thinking, maturity, and responsibility required for influence.",
      },
      {
        title: "Communication Skill",
        description:
          "Grow in clarity, confidence, and the ability to lead conversations that matter.",
      },
      {
        title: "Ethical Leadership",
        description:
          "Strengthen character, service, and integrity as foundations for leadership.",
      },
      {
        title: "Spiritual Maturity",
        description:
          "Lead from depth, discipline, and alignment with your God-given assignment.",
      },
    ],
    featureSection: {
      heading: "Go From Influence To Intentional Leadership",
      body:
        "Leadership Academy Certification helps emerging and established leaders build the inner life, communication, and practical systems required to lead well.",
      supportingLine:
        "This pathway is for leaders who want their influence to be grounded in wisdom, excellence, and service.",
      images: [
        "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    leaderBlock: {
      heading: "Built For Today's Purpose-Driven Leaders",
      body: [
        "Real leadership is built from the inside — through discipline, character, and the capacity to carry responsibility without losing your integrity.",
      ],
      image: "/images/pasttor tea hero.png",
    },
    urgency: {
      heading: "Now Is The Time To Grow Into The Leader Your Assignment Requires",
      body:
        "If you are carrying influence, responsibility, or a desire to lead, you need structure for the person you are becoming.",
      image: "/images/dr-tea-coaching-session-generated.png",
    },
    gridFeatures: [
      {
        title: "Mindset",
        description: "Think with maturity, responsibility, and clarity.",
      },
      {
        title: "Communication",
        description: "Lead conversations, teams, and moments with confidence.",
      },
      {
        title: "Ethics",
        description: "Build influence on character, service, and integrity.",
      },
      {
        title: "Capacity",
        description: "Strengthen your ability to steward pressure and people.",
      },
      {
        title: "Influence",
        description: "Learn to inspire, align, and move people toward meaningful outcomes.",
      },
      {
        title: "Spiritual Foundation",
        description: "Build leadership that is rooted in purpose, faith, and a clear sense of assignment.",
      },
      {
        title: "Conflict Resolution",
        description: "Handle tension, disagreement, and difficult people with wisdom and emotional maturity.",
      },
      {
        title: "Team Development",
        description: "Learn how to identify, develop, and release the people around you into their potential.",
      },
      {
        title: "Vision Casting",
        description: "Communicate a compelling direction that draws people in and aligns effort with purpose.",
      },
      {
        title: "Servant Leadership",
        description: "Lead from a place of genuine care — making the people you serve better through your example.",
      },
      {
        title: "Accountability Structures",
        description: "Build personal systems that keep you disciplined, consistent, and growing as a leader.",
      },
      {
        title: "Leadership Identity",
        description: "Know clearly who you are as a leader so your decisions, words, and actions align.",
      },
    ],
    playbook: {
      heading: "This Is Your Leadership Development Playbook",
      body:
        "Use this academy pathway to build the mindset, communication, and character required for meaningful leadership.",
      image: "/images/leadership-academy-certification.jpg",
    },
    ownershipCta: {
      heading: "Own Your Leadership Assignment",
      body: "Grow in the capacity, character, and clarity required to lead well.",
      button: "Join the Academy",
    },
    speakers: [drTeaSpeaker],
    testimonials: sharedTestimonials,
    pricing: cohortPricing({
      slug: "leadership-academy-certification",
      shortTitle: "Leadership Academy",
      price: "₦55,000",
      features: [
        "Full Leadership Academy certification track",
        "Leadership mindset, communication, and ethics training",
        "Practical assignments and leadership assessments",
        "Certificate of completion",
        "Live teaching and guided cohort sessions",
      ],
    }),
    faqs: [
      {
        question: "What is the Leadership Academy Certification?",
        answer:
          "It is a structured certification program designed to train, equip, and develop purpose-driven leaders for impact in ministry, business, career, community, and personal life.",
      },
      {
        question: "Who can enrol in the academy?",
        answer:
          "Emerging leaders, established leaders, youths, professionals, ministry workers, entrepreneurs, team leaders, coaches, mentors, and anyone who wants to become a better leader.",
      },
      {
        question: "Is this program faith-based?",
        answer:
          "Yes. The academy combines biblical wisdom, spiritual insight, leadership principles, and practical leadership tools.",
      },
      {
        question: "Will I receive a certificate?",
        answer:
          "Yes. Participants who complete the training, assignments, and certification assessment will receive a certificate.",
      },
      {
        question: "Do I need to already be in a leadership position?",
        answer:
          "No. You do not need a title to begin. The academy is also for people preparing for leadership responsibility.",
      },
      {
        question: "What will I learn?",
        answer:
          "You will learn self-leadership, communication, influence, vision, execution, team building, decision-making, problem-solving, ethics, accountability, and leadership discipline.",
      },
      {
        question: "Will there be practical assignments?",
        answer:
          "Yes. The program includes assignments, exercises, leadership simulations, and assessments to help you apply what you learn.",
      },
      {
        question: "Can this help me lead better at work, ministry, or business?",
        answer:
          "Yes. The principles are designed to help you lead better in different spheres of life, including ministry, career, business, community, and personal leadership.",
      },
    ],
  },
  {
    slug: "purpose-reengineering-masterclass",
    title: "Purpose Reengineering Masterclass",
    shortTitle: "Purpose Reengineering",
    tier: "focused",
    factBar: {
      format: "Certification Masterclass",
      duration: "2 Weeks",
      bestFor: "Anyone stuck or in transition",
      outcome: "A redesigned purpose blueprint",
    },
    summary:
      "A focused masterclass to help you reassess, realign, and rebuild your life around purpose.",
    heroHeadline: "Realign with Purpose",
    heroSubheadline:
      "Reset your direction and build a practical blueprint for your next season.",
    ctaText: "Start Your Reset Journey",
    detailLine: "Purpose Reengineering Masterclass",
    stat: "Reset Your Direction And Rebuild Around What God Has Placed In You.",
    heroImage: "/images/pastor-program-and-card-1-cleaned.png",
    heroImageAlt: "Dr. TEA speaking about realignment and purposeful growth",
    accentColor: "#a5cd39",
    benefits: [
      {
        title: "Reassess Your Direction",
        description:
          "Review where you are, what has shifted, and what needs to be rebuilt.",
      },
      {
        title: "Realign Your Priorities",
        description:
          "Bring your decisions back into alignment with purpose and conviction.",
      },
      {
        title: "Rebuild Your Strategy",
        description:
          "Create a stronger structure for your next season of growth.",
      },
      {
        title: "Move With Clarity",
        description:
          "Leave with renewed direction and practical steps for purposeful action.",
      },
    ],
    featureSection: {
      heading: "Go From Misalignment To Renewed Direction",
      body:
        "Purpose Reengineering Masterclass helps you examine your current life direction and rebuild with clarity, conviction, and strategy.",
      supportingLine:
        "This is for people who sense a shift and need guidance to realign their next season.",
      images: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    leaderBlock: {
      heading: "Built For Seasons Of Transition",
      body: [
        "Some seasons demand more than small adjustments — they require you to stop, reassess everything, and rebuild your direction with clarity and conviction.",
      ],
      image: "/images/pastor tea footer image .png",
    },
    urgency: {
      heading: "Now Is The Time To Realign",
      body:
        "If your current direction no longer matches your conviction, it is time to reset before you keep building in the wrong direction.",
      image: "/images/pastor tea corporate image.png",
    },
    gridFeatures: [
      {
        title: "Diagnosis",
        description: "Identify what is working, what is stuck, and what must shift.",
      },
      {
        title: "Alignment",
        description: "Return your goals and decisions to purpose.",
      },
      {
        title: "Strategy",
        description: "Build a practical plan for your next season.",
      },
      {
        title: "Momentum",
        description: "Move forward with clarity, courage, and structure.",
      },
      {
        title: "Identity Reset",
        description: "Reconnect with who you are so your next steps are built on truth, not assumption.",
      },
      {
        title: "Bold Decision Making",
        description: "Stop delaying the decisions your next season requires and move with conviction.",
      },
      {
        title: "Pattern Recognition",
        description: "Identify the recurring habits, mindsets, and choices that have been holding you back.",
      },
      {
        title: "New Frameworks",
        description: "Replace outdated thinking with practical systems that fit who you are becoming.",
      },
      {
        title: "Emotional Clarity",
        description: "Process where you have been without letting it define where you are going.",
      },
      {
        title: "Rebuilding With Intention",
        description: "Reconstruct your goals, habits, and environment around your truest purpose.",
      },
      {
        title: "Letting Go",
        description: "Release the commitments, identities, and directions that no longer serve your assignment.",
      },
      {
        title: "Renewed Vision",
        description: "Walk away with a fresh, grounded picture of where you are going and why it matters.",
      },
    ],
    playbook: {
      heading: "This Is Your Purpose Reset Playbook",
      body:
        "Use the masterclass pathway to reassess your current season and rebuild around purpose.",
      image: "/images/receiving-sure-mercies.jpg",
    },
    ownershipCta: {
      heading: "Reset Your Direction With Purpose",
      body: "Stop carrying old patterns into a new assignment.",
      button: "Join the Masterclass",
    },
    speakers: [drTeaSpeaker],
    testimonials: sharedTestimonials,
    pricing: cohortPricing({
      slug: "purpose-reengineering-masterclass",
      shortTitle: "Purpose Reengineering",
      price: "₦75,000",
      features: [
        "Full 2-week masterclass access",
        "Purpose diagnosis and realignment framework",
        "A redesigned purpose blueprint",
        "Certificate of completion",
        "Live teaching and guided exercises",
      ],
    }),
    faqs: [
      {
        question: "What is the Purpose Reengineering Masterclass?",
        answer:
          "It is a 2-week certification program designed to help individuals reset their direction, correct purpose misalignment, rebuild focus, and create a clear roadmap for their next phase.",
      },
      {
        question: "Who is this masterclass for?",
        answer:
          "It is for individuals who feel stuck, misaligned, unfulfilled, confused, or ready for a fresh start. It is also suitable for leaders, professionals, and purpose-driven individuals going through transition.",
      },
      {
        question: "Is this program faith-based?",
        answer:
          "Yes. The masterclass is rooted in biblical wisdom, spiritual insight, and practical life application.",
      },
      {
        question: "How long does the program last?",
        answer:
          "The program runs for 2 weeks. Week 1 focuses on reflection and realignment, while Week 2 focuses on reconstruction and execution.",
      },
      {
        question: "Will I receive a certificate?",
        answer:
          "Yes. Participants who complete the program requirements and certification assessment will receive a certificate.",
      },
      {
        question: "Do I need to know my purpose before joining?",
        answer:
          "No. The masterclass is designed to help you gain clarity, rediscover your identity, and understand your next steps.",
      },
    ],
  },
  {
    slug: "intensive-mentoring-coaching-program",
    title: "Intensive Mentoring & Coaching Program",
    shortTitle: "Intensive Mentoring",
    tier: "flagship",
    showTestimonials: true,
    factBar: {
      format: "1-on-1 Mentoring",
      duration: "Personalised Track",
      bestFor: "Those ready for their next level",
      outcome: "Direction, discipline & measurable growth",
    },
    summary:
      "A deeper mentoring pathway for people who need personal guidance, growth structure, and accountability.",
    heroHeadline: "Accelerate Your Growth",
    heroSubheadline:
      "Personal mentoring, honest feedback, and accountability to help you grow and execute.",
    ctaText: "Apply for Mentoring",
    detailLine: "Intensive Mentoring & Coaching Program",
    stat: "Build A Guided Growth Rhythm For Your Life, Leadership, And Assignment.",
    heroImage: "/images/pastor-tea-programs-6-cleaned.png",
    heroImageAlt: "A focused mentoring and coaching conversation",
    accentColor: "#0394d7",
    benefits: [
      {
        title: "Personal Guidance",
        description:
          "Receive focused mentoring for your life, leadership, purpose, and next steps.",
      },
      {
        title: "Growth Structure",
        description:
          "Build rhythms and priorities that support long-term transformation.",
      },
      {
        title: "Accountability",
        description:
          "Stay consistent through guided check-ins and practical follow-through.",
      },
      {
        title: "Spiritual Depth",
        description:
          "Grow with wisdom that is rooted in faith, maturity, and practical obedience.",
      },
    ],
    featureSection: {
      heading: "Go From Scattered Growth To Guided Transformation",
      body:
        "The Intensive Mentoring & Coaching Program provides closer support for individuals who need direction, structure, and consistent accountability.",
      supportingLine:
        "This is a deeper pathway for people ready to grow with discipline and wisdom.",
      images: [
        "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1000&q=80",
      ],
    },
    leaderBlock: {
      heading: "Built For People Who Need Closer Support",
      body: [
        "There are seasons where information alone is not enough — you need a wise voice, direct accountability, and a structured space to grow with focus.",
      ],
      image: "/images/dr-tea-coaching-session-generated.png",
    },
    urgency: {
      heading: "Now Is The Time To Stop Carrying Growth Alone",
      body:
        "If you know your next season requires structure and accountability, this is your invitation to step into guided transformation.",
      image: "/images/Pastor Tea Office .jpg",
    },
    gridFeatures: [
      {
        title: "Mentoring",
        description: "Receive guidance for decisions, growth, and direction.",
      },
      {
        title: "Coaching",
        description: "Turn insight into action through structured support.",
      },
      {
        title: "Accountability",
        description: "Stay faithful to what you have decided to build.",
      },
      {
        title: "Formation",
        description: "Grow in maturity, discipline, and spiritual depth.",
      },
      {
        title: "Clarity On Priorities",
        description: "Identify what deserves your time and energy in this specific season of life.",
      },
      {
        title: "Sustained Momentum",
        description: "Keep moving with consistent support rather than starting and stopping in isolation.",
      },
      {
        title: "Blind Spot Removal",
        description: "Receive honest feedback that helps you see what you cannot see on your own.",
      },
      {
        title: "Spiritual Direction",
        description: "Navigate your season with wisdom that goes beyond practical advice into genuine discernment.",
      },
      {
        title: "Character Development",
        description: "Grow not just in skill or knowledge but in the depth of who you are becoming.",
      },
      {
        title: "Breakthrough Focus",
        description: "Target the one or two areas where focused attention will produce the greatest shift.",
      },
      {
        title: "Practical Application",
        description: "Every session produces something actionable — not just insight but a next step to take.",
      },
      {
        title: "Personal Investment",
        description: "This pathway is for people who are serious enough to invest in focused, personal growth.",
      },
    ],
    playbook: {
      heading: "This Is Your Mentoring And Coaching Playbook",
      body:
        "Use this intensive pathway to receive guidance, build structure, and sustain growth.",
      image: "/images/pastor-tea-office.jpg",
    },
    ownershipCta: {
      heading: "Step Into Guided Transformation",
      body: "Receive the mentoring, structure, and accountability your next season needs.",
      button: "Apply for Mentoring",
    },
    speakers: [drTeaSpeaker],
    testimonials: sharedTestimonials,
    pricing: cohortPricing({
      slug: "intensive-mentoring-coaching-program",
      shortTitle: "Intensive Mentoring",
      price: "₦155,000",
      features: [
        "Personalised 1-on-1 mentoring track",
        "Direct, honest feedback and guidance",
        "Custom growth structure and accountability",
        "Priority access to Dr. TEA",
        "Action steps and reflection between sessions",
      ],
    }),
    faqs: [
      {
        question: "What is the Intensive Mentoring & Coaching Program?",
        answer:
          "It is a personalised mentoring and coaching experience designed to help individuals gain clarity, receive guidance, stay accountable, and grow intentionally in life, purpose, leadership, and goals.",
      },
      {
        question: "Who is this program for?",
        answer:
          "It is for leaders, professionals, ministers, coaches, emerging influencers, purpose-driven individuals, and anyone who is serious about growth and ready for their next level.",
      },
      {
        question: "Is this a one-on-one program?",
        answer:
          "Yes. The program includes personalised mentoring and coaching support focused on your specific journey, goals, and growth needs.",
      },
      {
        question: "What areas can I receive mentoring on?",
        answer:
          "You can receive mentoring around purpose, personal growth, leadership, spiritual development, goal setting, decision-making, discipline, execution, and life direction.",
      },
      {
        question: "Is this program faith-based?",
        answer:
          "Yes. The program combines spiritual wisdom, practical coaching, mentorship, leadership principles, and accountability.",
      },
      {
        question: "Will I receive assignments or action steps?",
        answer:
          "Yes. You may receive practical action steps, reflection exercises, goals, and accountability tasks to help you apply what is discussed.",
      },
    ],
  },
  {
    slug: "certified-professional-coach-program",
    title: "Certified Professional Coach Program",
    shortTitle: "Certified Coach",
    tier: "flagship",
    showTestimonials: true,
    factBar: {
      format: "Certification Program",
      duration: "Hands-on Training",
      bestFor: "Aspiring & emerging coaches",
      outcome: "Become a certified, credible coach",
    },
    summary:
      "Learn how to coach with structure, clarity, ethics, confidence, and transformational impact.",
    heroHeadline: "Turn Your Passion into Practice",
    heroSubheadline:
      "Get the skills, structure, and certification to coach others with clarity and confidence.",
    ctaText: "Become a Certified Coach",
    detailLine: "Becoming a Certified Professional Coach",
    stat: "Learn To Coach With Clarity, Confidence, Structure, And Transformational Impact.",
    heroImage: "/images/past tea inner circle.png",
    heroImageAlt: "Dr. TEA in a focused profile portrait for the Certified Professional Coach Program",
    accentColor: "#a5cd39",
    benefits: [
      {
        title: "Coaching Foundations",
        description:
          "Learn the mindset, posture, and ethical responsibility of transformational coaching.",
      },
      {
        title: "Practical Frameworks",
        description:
          "Use structured methods for asking better questions, listening deeply, and guiding progress.",
      },
      {
        title: "Confidence To Serve",
        description:
          "Develop the skill and clarity to support people through growth and change.",
      },
      {
        title: "Certification Pathway",
        description:
          "Move through a focused process that prepares you to coach with excellence.",
      },
    ],
    featureSection: {
      heading: "Go From Helping Instinct To Coaching Structure",
      body:
        "This program space is built for people who already feel called to guide others and now need a clear, ethical, practical coaching framework. You learn how to structure sessions, listen with discernment, ask better questions, and help people move from insight to action.",
      supportingLine:
        "It is for purpose-driven people who want to coach with wisdom, responsibility, structure, and transformational impact.",
      images: [
        "/images/pasttor tea hero.png",
        "/images/pastor tea corporate image.png",
        "/images/Pastor Tea Office .jpg",
      ],
    },
    leaderBlock: {
      heading: "Built For Coaches Who Want To Serve With Excellence",
      body: [
        "Genuine coaching is a craft — it takes wisdom, ethics, and the skill to guide people toward their own breakthroughs without imposing your agenda.",
      ],
      image: "/images/pasttor tea hero.png",
    },
    urgency: {
      heading: "Now Is The Time To Develop Your Coaching Gift",
      body:
        "If people already come to you for guidance, build the skill and structure to serve them with greater excellence.",
      image: "/images/pastor tea corporate image.png",
    },
    gridFeatures: [
      {
        title: "Ethics",
        description: "Understand responsibility, boundaries, and trust.",
      },
      {
        title: "Frameworks",
        description: "Use practical structures for transformational conversations.",
      },
      {
        title: "Listening",
        description: "Develop deeper questions and stronger discernment.",
      },
      {
        title: "Impact",
        description: "Help clients move from insight to meaningful action.",
      },
      {
        title: "Confidence To Coach",
        description: "Step into coaching conversations with structure, clarity, and professional credibility.",
      },
      {
        title: "Building Your Practice",
        description: "Learn how to position yourself, communicate your value, and grow a coaching practice.",
      },
      {
        title: "Session Structure",
        description: "Run each coaching session with a clear flow that keeps the client focused and moving.",
      },
      {
        title: "Powerful Questions",
        description: "Master the art of asking questions that unlock insight rather than directing answers.",
      },
      {
        title: "Client Transformation",
        description: "Learn how to create the conditions where real, lasting change becomes possible.",
      },
      {
        title: "Certification Credential",
        description: "Complete the program with a recognized certification that validates your coaching practice.",
      },
      {
        title: "Niche Clarity",
        description: "Define who you are best positioned to coach and what specific transformation you offer.",
      },
      {
        title: "Ongoing Growth",
        description: "Leave with a framework for continuing to develop as a coach well beyond the program.",
      },
    ],
    playbook: {
      heading: "This Is Your Professional Coaching Playbook",
      body:
        "Use this certification pathway to develop coaching skill, structure, confidence, and ethical practice.",
      image: "/images/dr-tea-coaching-session-generated.png",
    },
    ownershipCta: {
      heading: "Become The Coach People Can Trust",
      body: "Build the skill, structure, and confidence to guide transformation.",
      button: "Start Certification",
    },
    speakers: [drTeaSpeaker],
    testimonials: sharedTestimonials,
    faqs: [
      {
        question: "What is the Certified Professional Coach Program?",
        answer:
          "It is a practical certification program designed to equip aspiring and emerging coaches with the skills, structure, confidence, and credibility needed to coach others effectively.",
      },
      {
        question: "Who is this program for?",
        answer:
          "It is for aspiring coaches, leaders, ministers, mentors, speakers, trainers, professionals, and individuals who are passionate about helping others grow.",
      },
      {
        question: "Do I need coaching experience before joining?",
        answer:
          "No. The program is beginner-friendly and also useful for people who already mentor, teach, lead, or guide others but want more structure.",
      },
      {
        question: "Will I receive a certificate?",
        answer:
          "Yes. Participants who complete the training requirements and assessments will receive a certification.",
      },
      {
        question: "Is this program faith-based?",
        answer:
          "Yes. The program combines spiritual depth, biblical wisdom, practical coaching skills, and professional coaching principles.",
      },
      {
        question: "Can this help me start a coaching business?",
        answer:
          "Yes. You will learn how to position your coaching brand, define your niche, communicate your value, and build a coaching structure you can use professionally.",
      },
    ],
  },
];

export function getProgramBySlug(slug: string) {
  return programPages.find((program) => program.slug === slug);
}
