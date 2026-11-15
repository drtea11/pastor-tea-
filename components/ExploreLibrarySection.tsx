"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PlaceholderBookCover } from "./Cards";
import { Container } from "./Container";
import type { Book } from "@/lib/books";

type Program = {
  title: string;
  description: string;
  image: string;
  alt: string;
  slug: string;
};

type ExploreLibrarySectionProps = {
  programs: Program[];
  books: Book[];
};

type ActiveTab = "programs" | "books";

const tabs: { id: ActiveTab; label: string }[] = [
  { id: "programs", label: "Programs" },
  { id: "books", label: "Books" }
];

const programMockups: Record<
  string,
  {
    label: string;
    title: string;
    subtitle: string;
    accent: string;
    accent2: string;
    glow: string;
    surface: string;
    code: string;
    edition: string;
    motif: "compass" | "circle" | "growth" | "manuscript" | "leadership" | "reset" | "mentoring" | "coach";
  }
> = {
  "purpose-discovery-clarity-coaching": {
    label: "Clarity Pathway",
    title: "Purpose Discovery",
    subtitle: "Identity. Calling. Direction.",
    accent: "#0394d7",
    accent2: "#d6eef9",
    glow: "rgba(3,148,215,0.32)",
    surface: "from-[#061520] via-[#0b2231] to-[#020506]",
    code: "PD",
    edition: "01",
    motif: "compass"
  },
  "inner-circle": {
    label: "Private Growth Circle",
    title: "The Inner Circle",
    subtitle: "Access. Alignment. Accountability.",
    accent: "#a5cd39",
    accent2: "#f1f7d7",
    glow: "rgba(165,205,57,0.3)",
    surface: "from-[#11130d] via-[#202614] to-[#050607]",
    code: "IC",
    edition: "02",
    motif: "circle"
  },
  "goal-setting-performance-evaluation-coaching": {
    label: "Execution System",
    title: "Goal Mastery",
    subtitle: "Measure what matters.",
    accent: "#0394d7",
    accent2: "#151515",
    glow: "rgba(3,148,215,0.28)",
    surface: "from-[#fbfbf8] via-[#edf4f6] to-[#ffffff]",
    code: "GS",
    edition: "03",
    motif: "growth"
  },
  "book-writing-boot-camp": {
    label: "Author Intensive",
    title: "Book Writing Boot Camp",
    subtitle: "From message to manuscript.",
    accent: "#a5cd39",
    accent2: "#f2dfbf",
    glow: "rgba(165,205,57,0.26)",
    surface: "from-[#15110c] via-[#241f16] to-[#060504]",
    code: "BW",
    edition: "04",
    motif: "manuscript"
  },
  "leadership-academy-certification": {
    label: "Certification Track",
    title: "Leadership Academy",
    subtitle: "Lead with structure and influence.",
    accent: "#0394d7",
    accent2: "#e5edf2",
    glow: "rgba(3,148,215,0.3)",
    surface: "from-[#07101e] via-[#111b2c] to-[#020306]",
    code: "LA",
    edition: "05",
    motif: "leadership"
  },
  "purpose-reengineering-masterclass": {
    label: "Masterclass",
    title: "Purpose Reengineering",
    subtitle: "Reset. Realign. Rebuild.",
    accent: "#a5cd39",
    accent2: "#101010",
    glow: "rgba(165,205,57,0.26)",
    surface: "from-[#fbfaf5] via-[#eef4e8] to-[#ffffff]",
    code: "PR",
    edition: "06",
    motif: "reset"
  },
  "intensive-mentoring-coaching-program": {
    label: "High-Touch Mentoring",
    title: "Intensive Mentoring",
    subtitle: "Closer guidance for serious growth.",
    accent: "#0394d7",
    accent2: "#c9b07c",
    glow: "rgba(3,148,215,0.28)",
    surface: "from-[#070707] via-[#161616] to-[#030303]",
    code: "IM",
    edition: "07",
    motif: "mentoring"
  },
  "certified-professional-coach-program": {
    label: "Professional Certification",
    title: "Certified Coach",
    subtitle: "Coach with structure and excellence.",
    accent: "#a5cd39",
    accent2: "#0f1720",
    glow: "rgba(165,205,57,0.25)",
    surface: "from-[#f9fbf8] via-[#ecf4ef] to-[#ffffff]",
    code: "CC",
    edition: "08",
    motif: "coach"
  }
};

export function ProgramLuxuryMockup({ program }: { program: Program }) {
  const mockup = programMockups[program.slug] ?? {
    label: "Signature Program",
    title: program.title,
    subtitle: "Purpose. Clarity. Growth.",
    accent: "#0394d7",
    accent2: "#d6eef9",
    glow: "rgba(3,148,215,0.28)",
    surface: "from-[#0a0a0a] via-[#151515] to-[#030303]",
    code: "DT",
    edition: "00",
    motif: "compass" as const
  };
  const isLight = mockup.surface.includes("#f");

  return (
    <div className="grid min-h-[30rem] place-items-center rounded-[0.76rem] bg-white px-12 py-10">
      <div
        className={`relative aspect-[2/3] w-full max-w-[13.5rem] overflow-hidden rounded-[0.35rem] bg-gradient-to-br ${mockup.surface} shadow-[0_22px_28px_rgba(0,0,0,0.16)] ${
          isLight ? "text-black" : "text-white"
        }`}
      >
        <div
          className="absolute left-1/2 top-20 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: mockup.glow }}
        />
        <div className="absolute inset-x-0 top-0 h-[43%] border-b border-current/10 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.2),transparent_42%)]" />
        <div className="absolute inset-5 rounded-[0.2rem] border border-current/10" />
        <div className="absolute left-0 top-[23%] h-px w-full bg-current/12" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-current/8" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_30%,rgba(255,255,255,0.1)_70%,transparent)]" />
        <div className="absolute inset-x-6 top-6 flex items-start justify-between gap-4">
          <span
            className="max-w-[6.5rem] font-body text-[0.45rem] uppercase leading-[1.2] tracking-[0.12em]"
            style={{ color: mockup.accent }}
          >
            {mockup.label}
          </span>
          <span className="font-heading text-[0.68rem] uppercase leading-none opacity-45">
            {mockup.edition}
          </span>
        </div>

        <div
          className="absolute right-5 top-[18%] font-heading text-[5.1rem] font-black uppercase leading-none opacity-[0.08]"
          aria-hidden="true"
        >
          {mockup.code}
        </div>

        <div className="absolute inset-x-0 top-[18%] grid place-items-center opacity-95">
          <MockupMotif
            motif={mockup.motif}
            accent={mockup.accent}
            accent2={mockup.accent2}
            isLight={isLight}
          />
        </div>

        <div className="absolute inset-x-6 bottom-7">
          <span
            className="mb-4 block h-px w-14"
            style={{ backgroundColor: mockup.accent }}
            aria-hidden="true"
          />
          <span className="block font-body text-[0.5rem] uppercase leading-none tracking-[0.16em] opacity-45">
            Signature Program
          </span>
          <h4 className="mt-2 max-w-[10.5rem] font-heading text-[1.35rem] font-black uppercase leading-[0.9] tracking-normal">
            {mockup.title}
          </h4>
          <span className="mt-3 block max-w-[10.5rem] text-[0.5rem] leading-[1.35] opacity-58">
            {mockup.subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}

function MockupMotif({
  motif,
  accent,
  accent2,
  isLight
}: {
  motif: "compass" | "circle" | "growth" | "manuscript" | "leadership" | "reset" | "mentoring" | "coach";
  accent: string;
  accent2: string;
  isLight: boolean;
}) {
  if (motif === "manuscript") {
    return (
      <div className="relative h-36 w-32">
        <span className="absolute left-1 top-3 h-28 w-20 rotate-[-7deg] rounded-[0.18rem] border border-current/12 bg-white/8 shadow-[0_18px_26px_rgba(0,0,0,0.16)]" />
        <span className="absolute right-0 top-0 h-32 w-[5.5rem] rounded-[0.18rem] border border-current/14 bg-current/5 shadow-[0_20px_30px_rgba(0,0,0,0.18)]" />
        {[18, 34, 50, 66, 82].map((top, index) => (
          <span
            key={top}
            className="absolute right-4 h-0.5 rounded-full bg-current/22"
            style={{ top, width: index % 2 === 0 ? 70 : 52 }}
          />
        ))}
        <span className="absolute bottom-2 left-5 h-8 w-8 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    );
  }

  if (motif === "growth") {
    return (
      <div className="relative h-36 w-36">
        <span className="absolute bottom-2 left-2 h-px w-32 bg-current/16" />
        <span className="absolute bottom-2 left-2 h-28 w-px bg-current/16" />
        {[28, 48, 74, 106].map((height, index) => (
          <span
            key={height}
            className="absolute bottom-2 w-5 rounded-t-full"
            style={{
              left: 20 + index * 26,
              height,
              backgroundColor: index === 3 ? accent : isLight ? "rgba(0,0,0,0.13)" : "rgba(255,255,255,0.16)"
            }}
          />
        ))}
        <span className="absolute right-2 top-4 h-12 w-12 rounded-full border" style={{ borderColor: accent }} />
      </div>
    );
  }

  if (motif === "leadership") {
    return (
      <div className="relative h-36 w-36">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="absolute bottom-3 rounded-t-[0.2rem] border border-current/12 bg-current/6"
            style={{
              left: 20 + index * 33,
              width: 24,
              height: 68 + index * 18
            }}
          />
        ))}
        <span className="absolute left-4 right-4 top-4 h-px bg-current/16" />
        <span className="absolute left-1/2 top-4 h-28 w-px -translate-x-1/2 bg-current/12" />
        <span className="absolute right-5 top-10 size-9 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    );
  }

  if (motif === "circle" || motif === "mentoring" || motif === "coach") {
    if (motif === "mentoring") {
      return (
        <div className="relative h-36 w-36">
          <span className="absolute left-3 top-5 size-12 rounded-full border" style={{ borderColor: accent }} />
          <span className="absolute right-4 bottom-7 size-14 rounded-full border border-current/18" />
          <span className="absolute left-12 top-17 h-px w-16 rotate-[28deg] bg-current/18" />
          <span className="absolute right-8 top-6 h-24 w-px rotate-[28deg] bg-current/12" />
          <span className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: accent2 }} />
        </div>
      );
    }

    if (motif === "coach") {
      return (
        <div className="relative h-36 w-36">
          <span className="absolute left-3 top-7 h-16 w-24 rounded-[1.5rem] border border-current/16" />
          <span className="absolute right-4 bottom-7 h-16 w-24 rounded-[1.5rem] border" style={{ borderColor: accent }} />
          <span className="absolute left-8 top-13 h-1 w-12 rounded-full bg-current/18" />
          <span className="absolute right-9 bottom-13 h-1 w-12 rounded-full" style={{ backgroundColor: accent2 }} />
          <span className="absolute bottom-5 right-12 h-5 w-5 rotate-45 border-b border-r" style={{ borderColor: accent }} />
        </div>
      );
    }

    return (
      <div className="relative h-32 w-32">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="absolute rounded-full border"
            style={{
              inset: `${index * 16}px`,
              borderColor: index === 1 ? accent : isLight ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.16)"
            }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    );
  }

  if (motif === "reset") {
    return (
      <div className="relative h-36 w-36">
        <span className="absolute inset-6 rounded-[1.4rem] border border-current/14" />
        <span className="absolute left-5 top-5 h-24 w-24 rotate-45 rounded-[1.1rem] border" style={{ borderColor: accent }} />
        <span className="absolute right-5 bottom-5 h-16 w-16 -rotate-12 rounded-full border border-current/16" />
        <span className="absolute left-1/2 top-1/2 h-[5.5rem] w-px -translate-x-1/2 -translate-y-1/2 bg-current/18" />
        <span className="absolute left-1/2 top-1/2 h-px w-[5.5rem] -translate-x-1/2 -translate-y-1/2 bg-current/18" />
        <span className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: accent2 }} />
      </div>
    );
  }

  return (
    <div className="relative h-36 w-36">
      <span className="absolute inset-1 rounded-full border border-current/14" />
      <span className="absolute inset-8 rounded-full border" style={{ borderColor: accent }} />
      <span className="absolute left-1/2 top-1/2 h-28 w-px -translate-x-1/2 -translate-y-1/2 bg-current/18" />
      <span className="absolute left-1/2 top-1/2 h-px w-28 -translate-x-1/2 -translate-y-1/2 bg-current/18" />
      <span className="absolute left-1/2 top-2 h-9 w-px -translate-x-1/2" style={{ backgroundColor: accent2 }} />
      <span className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: accent }} />
    </div>
  );
}

export function ExploreLibrarySection({ programs, books }: ExploreLibrarySectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("programs");
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorCount, setIndicatorCount] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollThumbWidth, setScrollThumbWidth] = useState(12);

  const activeItems = useMemo(
    () => (activeTab === "programs" ? programs : books),
    [activeTab, books, programs]
  );

  const getStep = useCallback(() => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>("[data-explore-card]");

    if (!scroller || !card) {
      return 336;
    }

    const styles = window.getComputedStyle(scroller);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");

    return card.offsetWidth + gap;
  }, []);

  const updateActiveIndex = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const step = getStep();
    const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    const nextCount =
      activeItems.length === 0
        ? 0
        : Math.min(activeItems.length, maxScrollLeft > 0 ? Math.floor(maxScrollLeft / step) + 2 : 1);
    const nextIndex = Math.round(scroller.scrollLeft / step);
    const clampedIndex = nextCount > 0 ? Math.min(Math.max(nextIndex, 0), nextCount - 1) : 0;
    const nextProgress = maxScrollLeft > 0 ? scroller.scrollLeft / maxScrollLeft : 0;
    const nextThumbWidth = scroller.scrollWidth > 0
      ? Math.min(100, Math.max(10, (scroller.clientWidth / scroller.scrollWidth) * 100))
      : 100;

    setIndicatorCount(nextCount);
    setActiveIndex(clampedIndex);
    setScrollProgress(Math.min(Math.max(nextProgress, 0), 1));
    setScrollThumbWidth(nextThumbWidth);
  }, [activeItems.length, getStep]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollTo({ left: 0 });
    setActiveIndex(0);
    updateActiveIndex();
  }, [activeTab, updateActiveIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    updateActiveIndex();
    scroller.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      scroller.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  function scrollToIndex(index: number) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);

    scroller.scrollTo({
      left: Math.min(getStep() * index, maxScrollLeft),
      behavior: "smooth"
    });
  }

  return (
    <section id="explore" className="overflow-hidden bg-brand-soft py-20 text-black">
      <Container>
        <div className="reveal">
          <h2 className="font-heading font-medium capitalize leading-tight text-black">
            Explore Products &amp; Programs
          </h2>
          <p className="mt-5 max-w-[44rem] text-base leading-8 text-black/70">
            Discover coaching pathways and transformational books designed to help you
            gain clarity, grow intentionally, and live with purpose.
          </p>
        </div>

        <div className="mt-14 border-b border-black/18 pb-1 max-sm:-mx-[2.5vw] max-sm:overflow-hidden">
          <div
            className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] max-sm:gap-3 max-sm:px-[5vw] max-sm:pb-2 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Explore programs and books"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-11 shrink-0 cursor-pointer border-b-2 px-1 pb-2 font-body font-medium leading-none transition duration-200 max-sm:min-h-12 ${
                    isActive
                      ? "border-brand-ink text-brand-ink"
                      : "border-transparent text-brand-muted hover:text-brand-ink"
                  }`}
                >
                  <span className="font-body text-base font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-8 [scrollbar-width:none] lg:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          {activeTab === "programs"
            ? programs.map((program) => (
                <Link
                  key={program.title}
                  href={`/programs/${program.slug}`}
                  data-explore-card
                  className="group block w-[82vw] max-w-[28rem] shrink-0 snap-start rounded-[0.76rem] bg-[#f5f5f5] p-3 transition duration-300 hover:-translate-y-1 hover:bg-[#f1f4f5] sm:w-[24rem] lg:w-[22.5rem]"
                >
                  <ProgramLuxuryMockup program={program} />
                  <div className="grid min-h-[9.5rem] content-end px-3 pb-4 pt-5">
                    <p className="explore-card-label font-body uppercase tracking-[0.18em] text-black/45">
                      Program
                    </p>
                    <h3 className="explore-card-title mt-2 font-heading text-[1.15rem] font-extrabold text-black">
                      {program.title}
                    </h3>
                    <div className="mt-4">
                      <p className="explore-card-copy line-clamp-3 max-w-[18rem] text-black/58">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : books.map((book) => (
                <Link
                  key={book.title}
                  href={book.href}
                  data-explore-card
                  className="group block w-[82vw] max-w-[28rem] shrink-0 snap-start rounded-[0.76rem] bg-[#f5f5f5] p-5 transition duration-300 hover:-translate-y-1 hover:bg-[#f1f4f5] sm:w-[24rem] lg:w-[22.5rem]"
                >
                  <div className="grid min-h-[30rem] place-items-center rounded-[0.76rem] bg-white px-12 py-10">
                    {book.image ? (
                      <div className="relative aspect-[2/3] w-full max-w-[13.5rem]">
                        <Image
                          src={book.image}
                          alt={book.alt}
                          fill
                          sizes="220px"
                          className="object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.18)]"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[2/3] w-full max-w-[13.5rem] overflow-hidden rounded-[0.35rem] shadow-[0_22px_28px_rgba(0,0,0,0.16)]">
                        <PlaceholderBookCover title={book.title} alt={book.alt} />
                      </div>
                    )}
                  </div>
                  <div className="grid min-h-[8.75rem] content-end px-1 pb-1 pt-5">
                    <p className="explore-card-label font-body uppercase tracking-[0.18em] text-black/45">
                      Book
                    </p>
                    <h3 className="explore-card-title mt-2 font-heading font-extrabold text-black">
                      {book.title}
                    </h3>
                    <div className="mt-4">
                      <p className="explore-card-copy line-clamp-2 max-w-[18rem] text-black/58">
                        {book.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        <div className="relative mt-2 h-3" aria-label="Explore carousel position">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-black/10" />
          <button
            type="button"
            aria-label={`Current ${activeTab} slide ${activeIndex + 1} of ${indicatorCount}`}
            onClick={() => scrollToIndex(activeIndex)}
            className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-black/28 transition-[left,width,background-color] duration-200 hover:bg-black/45"
            style={{
              left: `${scrollProgress * (100 - scrollThumbWidth)}%`,
              width: `${scrollThumbWidth}%`
            }}
          />
        </div>
      </Container>
    </section>
  );
}
