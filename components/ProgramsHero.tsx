"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Header } from "./Header";
import { Button } from "./Button";

const AVATARS = [
  { src: "/images/avatar 1.png", alt: "Community member" },
  { src: "/images/avatar 2.png", alt: "Community member" },
  { src: "/images/avatar 3.png", alt: "Community member" },
  { src: "/images/avatar 4.png", alt: "Community member" },
  { src: "/images/avatar 5.png", alt: "Community member" },
];

export function ProgramsHero() {
  const line1Ref  = useRef<HTMLSpanElement>(null);
  const line2Ref  = useRef<HTMLSpanElement>(null);
  const line3Ref  = useRef<HTMLSpanElement>(null);
  const bodyRef   = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.13 }
      )
        .fromTo(bodyRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 },  "-=0.35")
        .fromTo(ctaRef.current,    { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.25")
        .fromTo(avatarRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 },  "-=0.2")
        .fromTo(scrollRef.current, { opacity: 0 },        { opacity: 1, duration: 0.6 },         "-=0.1");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-brand-ink">
      <div className="flex h-svh flex-col overflow-hidden">
        <Header transparent />

        {/* Centered content — flex-1 pushes scroll icon to bottom; py guarantees breathing room above the title */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-10">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold uppercase leading-[0.9] text-white">
              <span ref={line1Ref} className="block">You Were</span>
              <span ref={line2Ref} className="block text-brand-green">Made For</span>
              <span ref={line3Ref} className="block">More.</span>
            </h1>

            <p ref={bodyRef} className="mx-auto mt-6 max-w-xs font-body text-sm leading-7 text-white/55">
              Clarity, purpose, and transformation. Guided by Dr. TEA.
            </p>

            <div ref={ctaRef} className="mt-8 flex justify-center">
              <Button href="/book-a-call" variant="primary">
                Schedule Consultation
              </Button>
            </div>

            <div ref={avatarRef} className="mt-7 flex flex-col items-center gap-3">
              <div className="flex items-center" aria-hidden="true">
                {AVATARS.map((avatar, i) => (
                  <span
                    key={avatar.src}
                    className="relative block size-10 overflow-hidden rounded-full border-2 border-brand-ink"
                    style={{ marginLeft: i === 0 ? 0 : "-0.65rem", zIndex: AVATARS.length - i }}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <p className="font-body text-[0.78rem] text-white/45">
                Join <span className="font-semibold text-white/70">500+</span> leaders growing in purpose
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator — in flow at the bottom, never overlaps */}
        <div className="flex justify-center pb-7">
          <Link
            ref={scrollRef}
            href="#programs-list"
            aria-label="Scroll to programs"
            className="flex flex-col items-center gap-2 text-white/80 transition hover:text-white"
          >
            <span className="flex h-9 w-[1.45rem] items-start justify-center rounded-full border-2 border-white/70 p-1.5">
              <span className="hero-scroll-wheel h-2 w-1.5 rounded-full bg-white/90" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
