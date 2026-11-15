import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

const showcaseTitles: Record<string, string> = {
  "Purpose Discovery & Clarity Coaching": "Purpose Clarity",
  "The Inner Circle": "Inner Circle",
  "Goal Setting & Performance Evaluation Coaching": "Goal Mastery",
  "Book Writing Boot Camp": "Book Writing Boot Camp",
  "Leadership Academy Certification": "Leadership Academy",
  "Purpose Reengineering Masterclass": "Purpose Reengineering",
  "Intensive Mentoring & Coaching Program": "Intensive Mentoring",
  "Certified Professional Coach Program": "Professional Coach"
};

const showcaseSubtitles: Record<string, string> = {
  "Purpose Discovery & Clarity Coaching": "Discover why you were born",
  "The Inner Circle": "Grow with serious-minded people",
  "Goal Setting & Performance Evaluation Coaching": "Turn desire into disciplined action",
  "Book Writing Boot Camp": "Move from idea to manuscript",
  "Leadership Academy Certification": "Lead with structure and influence",
  "Purpose Reengineering Masterclass": "Reset direction and rebuild focus",
  "Intensive Mentoring & Coaching Program": "Closer guidance. Deeper accountability.",
  "Certified Professional Coach Program": "Build a credible coaching practice"
};

type ProgramCardProps = {
  index: string;
  title: string;
  description: string;
  featured?: boolean;
};

export function ProgramCard({ index, title, description, featured = false }: ProgramCardProps) {
  return (
    <article
      className={`reveal-card group flex min-h-[300px] flex-col rounded-4xl border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-soft ${
        featured
          ? "border-black bg-brand-ink text-white"
          : "border-brand-line bg-white text-brand-ink"
      }`}
    >
      <span
        className={`grid size-11 place-items-center rounded-full text-sm font-black ${
          featured ? "bg-brand-green/15 text-brand-green" : "bg-sky-50 text-brand-blue"
        }`}
      >
        {index}
      </span>
      <h3 className="mt-8 font-heading text-[1rem] font-extrabold leading-tight lg:text-[1.5rem]">{title}</h3>
      <p className={`mt-4 leading-7 ${featured ? "text-white/70" : "text-brand-muted"}`}>
        {description}
      </p>
      <Link
        href="#contact"
        className="mt-auto pt-7 font-body text-sm font-medium text-brand-blue transition group-hover:translate-x-1"
      >
        Get Started
      </Link>
    </article>
  );
}

type ProgramShowcaseCardProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export function ProgramShowcaseCard({
  title,
  image,
  alt
}: ProgramShowcaseCardProps) {
  const displayTitle = showcaseTitles[title] ?? title;
  const subtitle = showcaseSubtitles[title];

  return (
    <article className="reveal-card image-reveal group relative h-[450px] w-full overflow-hidden rounded-[0.76rem] border border-white/10 bg-[#101214] text-white shadow-premium">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="300px"
        className="object-cover object-center transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.18)_34%,rgba(0,0,0,0.86))]" />
      <div className="absolute inset-x-0 bottom-0 grid justify-items-center px-5 pb-8 text-center">
        <p className="font-heading text-[1rem] uppercase tracking-[0.18em] text-white">
          Dr. TEA
        </p>
        <h3 className="mt-2 max-w-[16.25rem] font-heading text-[1.5rem] font-extrabold uppercase leading-[1.02] tracking-normal text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
          {displayTitle}
        </h3>
        {subtitle ? (
          <p className="mt-4 max-w-[16rem] text-[1rem] leading-[1.35] text-white/62">
            {subtitle}
          </p>
        ) : null}
      </div>
    </article>
  );
}

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  dark?: boolean;
};

export function FeatureCard({ icon: Icon, title, description, dark = false }: FeatureCardProps) {
  return (
    <article
      className={`reveal-card rounded-4xl border p-7 ${
        dark ? "border-white/10 bg-white/10" : "border-brand-line bg-white"
      }`}
    >
      <div
        className={`mb-6 grid size-11 place-items-center rounded-full ${
          dark ? "bg-brand-green/10 text-brand-green" : "bg-sky-50 text-brand-blue"
        }`}
      >
        <Icon size={21} />
      </div>
      <h3 className={`font-heading text-[1rem] font-extrabold lg:text-[1.5rem] ${dark ? "text-white" : "text-brand-ink"}`}>
        {title}
      </h3>
      <p className={`mt-4 leading-7 ${dark ? "text-white/70" : "text-brand-muted"}`}>
        {description}
      </p>
    </article>
  );
}

type BookCardProps = {
  title: string;
  image?: string;
  alt: string;
};

const placeholderCovers: Record<
  string,
  {
    authorClass: string;
    background: string;
    lines: string[];
    motif: "keys" | "shield" | "capsules" | "revival";
    subtitle: string;
    titleClass: string;
  }
> = {
  "85 Wisdom Keys for World Changers": {
    authorClass: "text-black/64",
    background:
      "bg-[radial-gradient(circle_at_50%_82%,rgba(255,255,255,0.82),transparent_30%),linear-gradient(180deg,#f7d857_0%,#fff2ad_46%,#f5ead2_100%)] text-[#a80909]",
    lines: ["85", "Wisdom", "Keys"],
    motif: "keys",
    subtitle: "For world changers",
    titleClass: "text-[3rem] leading-[0.86]"
  },
  "Overcoming the Forces Against Your Life": {
    authorClass: "text-white/68",
    background:
      "bg-[radial-gradient(circle_at_78%_22%,rgba(165,205,57,0.42),transparent_27%),linear-gradient(145deg,#050607_0%,#15181e_54%,#283923_100%)] text-white",
    lines: ["Overcoming", "The Forces", "Against", "Your Life"],
    motif: "shield",
    subtitle: "Break resistance. Rise with clarity.",
    titleClass: "text-[2.05rem] leading-[0.94]"
  },
  "Ignite Capsules": {
    authorClass: "text-white/68",
    background:
      "bg-[radial-gradient(circle_at_50%_76%,rgba(255,109,32,0.95),transparent_22%),radial-gradient(circle_at_72%_18%,rgba(255,209,84,0.35),transparent_20%),linear-gradient(180deg,#10151f_0%,#361308_62%,#050505_100%)] text-white",
    lines: ["Ignite", "Capsules"],
    motif: "capsules",
    subtitle: "Short wisdom for inner fire",
    titleClass: "text-[2.8rem] leading-[0.88]"
  },
  "Setting the Stage for a Revival": {
    authorClass: "text-white/70",
    background:
      "bg-[radial-gradient(circle_at_50%_76%,rgba(238,106,28,0.88),transparent_18%),radial-gradient(circle_at_52%_78%,rgba(255,213,87,0.7),transparent_10%),linear-gradient(180deg,#071423_0%,#0f2c3a_45%,#090909_100%)] text-white",
    lines: ["Setting", "The Stage", "For", "Revival"],
    motif: "revival",
    subtitle: "A call for revival fire and awakening",
    titleClass: "text-[2.05rem] leading-[0.92]"
  }
};

export function PlaceholderBookCover({ title, alt }: { title: string; alt: string }) {
  const cover = placeholderCovers[title] ?? {
    authorClass: "text-white/68",
    background: "bg-[linear-gradient(180deg,#101214_0%,#050607_100%)] text-white",
    lines: title.split(" "),
    motif: "shield" as const,
    subtitle: "Dr. TEA",
    titleClass: "text-[2.15rem] leading-[0.92]"
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative size-full overflow-hidden ${cover.background}`}
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-white/10" />
      <div className={`absolute inset-x-6 top-7 text-center font-body text-[0.68rem] uppercase tracking-[0.12em] ${cover.authorClass}`}>
        Dr. Temitope Arowele
      </div>
      <div className={`absolute inset-x-5 top-[22%] text-center font-heading font-extrabold uppercase text-current ${cover.titleClass}`}>
        {cover.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </div>
      {cover.motif === "keys" ? (
        <div className="absolute bottom-16 left-1/2 grid w-40 -translate-x-1/2 grid-cols-5 gap-2 opacity-55">
          {Array.from({ length: 15 }).map((_, index) => (
            <span key={index} className="h-6 rounded-full border border-[#a80909]/55" />
          ))}
        </div>
      ) : null}
      {cover.motif === "shield" ? (
        <div className="absolute bottom-20 left-1/2 size-28 -translate-x-1/2 rotate-45 border border-white/28 bg-white/8" />
      ) : null}
      {cover.motif === "capsules" ? (
        <div className="absolute bottom-16 left-1/2 flex w-40 -translate-x-1/2 flex-wrap justify-center gap-2 opacity-70">
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index} className="h-4 w-9 rounded-full bg-white/18" />
          ))}
        </div>
      ) : null}
      {cover.motif === "revival" ? (
        <div className="absolute bottom-12 left-1/2 h-28 w-20 -translate-x-1/2 rounded-t-full bg-[radial-gradient(circle_at_50%_70%,#ffe785_0%,#ef6a1c_42%,transparent_70%)] opacity-80" />
      ) : null}
      <div className="absolute inset-x-8 bottom-12 h-px bg-current/40" />
      <div className="absolute inset-x-7 bottom-6 text-center font-body text-[0.68rem] uppercase leading-[1.25] tracking-[0.1em] opacity-75">
        {cover.subtitle}
      </div>
    </div>
  );
}

export function BookCard({ title, image, alt }: BookCardProps) {
  return (
    <article className="reveal-card flex h-full flex-col text-black">
      <div className="image-reveal relative aspect-[2/3] w-full overflow-hidden rounded-[0.35rem] shadow-[0_18px_34px_rgba(0,0,0,0.16)]">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 280px, 74vw"
            className="bg-white object-contain"
          />
        ) : (
          <PlaceholderBookCover title={title} alt={alt} />
        )}
      </div>
      <h3 className="book-card-title mt-4 font-heading font-extrabold text-black">
        {title}
      </h3>
    </article>
  );
}

export { TestimonialsCarousel } from "./TestimonialsCarousel";
