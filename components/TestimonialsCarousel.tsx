"use client";

import { Quote, UserRound } from "lucide-react";
import { useEffect, useRef } from "react";

function ReviewCard({ quote, memberLabel }: { quote: string; memberLabel: string }) {
  return (
    <blockquote className="review-card flex min-h-[13rem] w-[78vw] shrink-0 flex-col rounded-[0.9rem] border border-black/8 bg-white p-6 text-black shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:border-black/12 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:w-[25rem] lg:p-7">
      <Quote
        size={28}
        strokeWidth={2.2}
        aria-hidden="true"
        className="review-card-quote shrink-0 text-brand-green"
        fill="currentColor"
      />
      <p className="review-card-copy mt-4 flex-1 text-black">
        {quote}
      </p>
      <footer className="review-card-footer mt-6 flex items-center gap-3 border-t border-black/8 pt-5">
        <span
          className="review-card-avatar grid size-10 shrink-0 place-items-center rounded-full bg-brand-green/12 text-brand-green"
          aria-hidden="true"
        >
          <UserRound size={20} strokeWidth={2.2} />
        </span>
        <span className="review-card-name truncate font-heading text-sm font-semibold leading-tight text-brand-ink">
          {memberLabel}
        </span>
      </footer>
    </blockquote>
  );
}

type TestimonialsCarouselProps = {
  testimonials: string[];
  /** Context for attributions, e.g. "Inner Circle" → "Inner Circle Member". */
  context?: string;
};

// Seconds each card takes to travel one card-width. Keeps the pixel speed
// constant regardless of how many testimonials exist (more cards no longer
// means a faster scroll). Lower = faster.
const SECONDS_PER_CARD = 4;

export function TestimonialsCarousel({
  testimonials,
  context = "Dr. TEA"
}: TestimonialsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Varied, anonymous attributions so cards don't all read the same line.
  const memberLabels = [
    `${context} Member`,
    `${context} Mentee`,
    "Coaching Client",
    "Community Member",
    "Program Graduate",
    "Verified Member"
  ];

  // Spotlight: as each row scrolls, the card whose center crosses the
  // viewport's horizontal center lights up. Measured per frame, applied via a
  // class toggle (no React state) so the marquee stays smooth.
  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      return;
    }

    let frame = 0;

    const update = () => {
      const center = window.innerWidth / 2;
      const cards = carousel.querySelectorAll<HTMLElement>(".review-card");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const isActive = Math.abs(cardCenter - center) < rect.width / 2;
        card.classList.toggle("review-card-active", isActive);
      });

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame);
  }, []);

  const repeatedRow = [...testimonials, ...testimonials, ...testimonials];

  // Duration scales with the number of cards so the on-screen speed (px/sec)
  // stays the same no matter how many testimonials there are.
  const durationSeconds = testimonials.length * SECONDS_PER_CARD;

  return (
    <div ref={carouselRef} className="review-carousel mt-12 overflow-hidden">
      <div
        className="review-marquee review-marquee-left flex w-max gap-5 py-4 lg:gap-7"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {repeatedRow.map((quote, index) => (
          <ReviewCard
            key={`review-${quote}-${index}`}
            quote={quote}
            memberLabel={memberLabels[index % memberLabels.length]}
          />
        ))}
      </div>
    </div>
  );
}
