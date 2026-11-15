"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Purpose Discovery",
    copy: "Gain clarity about who you are and the direction you are called to walk in.",
    image: "/images/pastor tea footer image .png",
    alt: "Dr. TEA portrait for purpose discovery"
  },
  {
    title: "Leadership Growth",
    copy: "Build the mindset, structure, and capacity to lead with impact.",
    image: "/images/Pastor Tea Office .jpg",
    alt: "Dr. TEA in a professional office setting"
  },
  {
    title: "Spiritual Guidance",
    copy: "Receive wisdom-led mentoring for purposeful and intentional living.",
    image: "/images/pasttor tea hero.png",
    alt: "Dr. TEA speaking on stage"
  }
];

export function HeroRotatingWidget() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleMotionChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }

    motionQuery.addEventListener("change", handleMotionChange);

    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const visibleIndex = reducedMotion ? 0 : activeIndex;

  return (
    <div className="w-full rounded-[0.95rem] border border-white/10 bg-black/86 p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="grid min-h-28 grid-cols-[7rem_minmax(0,1fr)] items-stretch gap-3">
        <div className="relative h-28 w-full overflow-hidden rounded-[0.75rem] bg-white/5">
          {slides.map((slide, index) => (
            <Image
              key={slide.title}
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="8rem"
              className={`object-cover object-center transition-opacity duration-700 ease-out ${
                visibleIndex === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/12" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5 pr-1">
          <div className="relative min-h-24">
            {slides.map((slide, index) => (
              <div
                key={slide.title}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  visibleIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="hero-widget-label font-heading uppercase tracking-[0.16em] text-brand-green">
                  Dr. TEA
                </p>
                <span className="hero-widget-title mt-1.5 block font-heading font-medium text-white">
                  {slide.title}
                </span>
                <p className="hero-widget-copy mt-2 max-w-[13.5rem] font-body text-white/66">
                  {slide.copy}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5" aria-hidden="true">
            {slides.map((slide, index) => (
              <span
                key={slide.title}
                className={`h-1 rounded-full transition-all duration-500 ${
                  visibleIndex === index ? "w-5 bg-brand-green" : "w-1.5 bg-white/22"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
