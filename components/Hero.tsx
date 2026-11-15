import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";

const AVATARS = [
  { src: "/images/avatar 1.png", alt: "Community member" },
  { src: "/images/avatar 2.png", alt: "Community member" },
  { src: "/images/avatar 3.png", alt: "Community member" },
  { src: "/images/avatar 4.png", alt: "Community member" },
  { src: "/images/avatar 5.png", alt: "Community member" },
];

export function Hero() {
  return (
    <section className="w-full bg-black pb-4 text-white">
      <div className="relative min-h-[calc(100svh-4.5rem)] w-full overflow-hidden bg-brand-ink lg:min-h-[calc(100svh-5rem)]">
        <Image
          src="/images/past tea inner circle.png"
          alt="Dr. TEA in a focused profile portrait for the Certified Professional Coach Program"
          fill
          priority
          sizes="100vw"
          className="hero-zoom hidden size-full object-cover object-[56%_center] blur-[2px] scale-105 sm:block"
        />
        <Image
          src="/images/past tea inner circle.png"
          alt="Dr. TEA in a focused profile portrait for the Certified Professional Coach Program"
          fill
          priority
          sizes="100vw"
          className="hero-zoom size-full object-cover object-[54%_top] blur-[2px] scale-105 sm:hidden"
        />
        {/* Dark overlay + gradient for text legibility */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <div className="relative flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:px-10">
          <div className="max-w-4xl">
            <h1 className="hero-title mx-auto max-w-4xl font-heading font-medium capitalize text-white max-sm:max-w-[20rem]">
              <span className="block">Find Clarity.</span>
              <span className="block">Fulfil Purpose.</span>
            </h1>
            <p className="hero-reveal mx-auto mt-5 max-w-[20rem] text-sm leading-6 text-white/86 sm:max-w-2xl sm:text-base sm:leading-7 lg:max-w-[38rem] lg:leading-8">
              Discover who you are, why you are here, and how to live with impact.
            </p>
            <div className="hero-reveal mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                href="/book-a-call"
                variant="primary"
                className="shadow-[0_18px_36px_rgba(0,0,0,0.22)]"
              >
                Book a Clarity Call
              </Button>
            </div>

            {/* Avatar trust bar */}
            <div className="hero-reveal mt-8 flex flex-col items-center gap-2.5">
              <div className="flex items-center" aria-hidden="true">
                {AVATARS.map((avatar, i) => (
                  <span
                    key={avatar.src}
                    className="relative block size-9 overflow-hidden rounded-full border-2 border-black/40"
                    style={{ marginLeft: i === 0 ? 0 : "-0.6rem", zIndex: AVATARS.length - i }}
                  >
                    <Image src={avatar.src} alt={avatar.alt} fill sizes="36px" className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="font-body text-[0.75rem] text-white/55">
                Join <span className="font-semibold text-white/80">1,000+</span> people living with clarity and purpose
              </p>
            </div>
          </div>
        </div>
        <Link
          href="/#mission"
          aria-label="Scroll to explore"
          className="absolute inset-x-0 bottom-7 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-white/80 transition hover:text-white"
        >
          <span className="flex h-9 w-[1.45rem] items-start justify-center rounded-full border-2 border-white/70 p-1.5">
            <span className="hero-scroll-wheel h-2 w-1.5 rounded-full bg-white/90" />
          </span>
        </Link>
      </div>
    </section>
  );
}
