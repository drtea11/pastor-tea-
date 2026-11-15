"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "./Container";
import { ProgramShowcaseCard } from "./Cards";

type Program = {
  title: string;
  description: string;
  image: string;
  alt: string;
  slug: string;
};

type ProgramShowcaseSectionProps = {
  programs: Program[];
};

export function ProgramShowcaseSection({ programs }: ProgramShowcaseSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeProgramIndex, setActiveProgramIndex] = useState(0);
  const [programIndicatorCount, setProgramIndicatorCount] = useState(1);

  const getProgramStep = useCallback(() => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>("[data-program-card]");

    if (!scroller || !card) {
      return 312;
    }

    const styles = window.getComputedStyle(scroller);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");

    return card.offsetWidth + gap;
  }, []);

  const updateActiveProgram = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const step = getProgramStep();
    const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    const nextIndicatorCount =
      programs.length === 0
        ? 0
        : Math.min(programs.length, maxScrollLeft > 0 ? Math.floor(maxScrollLeft / step) + 2 : 1);
    const nextIndex = Math.round(scroller.scrollLeft / step);
    const clampedIndex = nextIndicatorCount > 0
      ? Math.min(Math.max(nextIndex, 0), nextIndicatorCount - 1)
      : 0;

    setProgramIndicatorCount(nextIndicatorCount);
    setActiveProgramIndex(clampedIndex);
  }, [getProgramStep, programs.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    updateActiveProgram();
    scroller.addEventListener("scroll", updateActiveProgram, { passive: true });
    window.addEventListener("resize", updateActiveProgram);

    return () => {
      scroller.removeEventListener("scroll", updateActiveProgram);
      window.removeEventListener("resize", updateActiveProgram);
    };
  }, [updateActiveProgram]);

  function scrollPrograms(direction: "previous" | "next") {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const step = getProgramStep();

    scroller.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth"
    });
  }

  function scrollToProgram(index: number) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);

    scroller.scrollTo({
      left: Math.min(getProgramStep() * index, maxScrollLeft),
      behavior: "smooth"
    });
  }

  return (
    <section id="programs" className="overflow-hidden bg-black py-20 text-white">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-3">
            <h2 className="max-w-[40rem] font-heading text-[1.5rem] font-extrabold capitalize leading-tight tracking-tight text-white lg:text-[3rem]">
              Explore Our Products
              <br />
              And Programs.
            </h2>
          </div>

          <div className="hidden items-center gap-1.5 lg:flex" aria-label="Program carousel controls">
            <button
              type="button"
              aria-label="Previous programs"
              onClick={() => scrollPrograms("previous")}
              className="grid size-11 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/18"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next programs"
              onClick={() => scrollPrograms("next")}
              className="grid size-11 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/18"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-12 flex gap-3 overflow-x-auto scroll-smooth pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {programs.map((program) => (
            <Link
              key={program.title}
              href={`/programs/${program.slug}`}
              data-program-card
              className="block w-[300px] max-w-[82vw] shrink-0"
            >
              <ProgramShowcaseCard
                title={program.title}
                description={program.description}
                image={program.image}
                alt={program.alt}
              />
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-3" aria-label="Program carousel position">
          {Array.from({ length: programIndicatorCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show program slide ${index + 1}`}
              aria-current={activeProgramIndex === index ? "true" : undefined}
              onClick={() => scrollToProgram(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeProgramIndex === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
