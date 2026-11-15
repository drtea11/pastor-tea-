"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, FormEvent } from "react";
import { Container } from "./Container";
import { programPages } from "@/lib/programs";

/* ── Social icons ── */
function InstagramIcon() {
  return (
    <svg aria-hidden="true" className="size-[1.1rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="size-[1.05rem]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.747v8.202h3.318z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg aria-hidden="true" className="size-[1.15rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45a2.78 2.78 0 0 0-1.95 1.97A29.25 29.25 0 0 0 1 12a29.25 29.25 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.97A29.25 29.25 0 0 0 23 12a29.25 29.25 0 0 0-.46-5.58Z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}
const socialLinks = [
  { label: "Facebook",  href: "https://www.facebook.com/share/1BN9P6S6bL/?mibextid=wwXIfr", icon: FacebookIcon  },
  { label: "Instagram", href: "https://www.instagram.com/temitope_arowele",                icon: InstagramIcon },
  { label: "YouTube",   href: "https://www.youtube.com/@temitopearowele",                  icon: YouTubeIcon   },
];

/* ── Nav data — trimmed for clarity ── */
const companyLinks = [
  { label: "Home",     href: "/"             },
  { label: "About",    href: "/#about-dr-tea" },
  { label: "Programs", href: "/programs"      },
  { label: "Books",    href: "/books"         },
  { label: "Blog",     href: "/blog"          },
];

const programLinks = programPages.slice(0, 5).map((p) => ({
  label: p.shortTitle,
  href: `/programs/${p.slug}`,
}));

const connectLinks = [
  { label: "Schedule Consultation",  href: "/book-a-call"              },
  { label: "Book Dr. TEA To Speak",  href: "/speaking"                 },
  { label: "Join The Inner Circle",  href: "/programs/inner-circle"    },
];

/* ── Newsletter form ── */
function NewsletterForm() {
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error();
      (e.currentTarget as HTMLFormElement).reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-full" aria-label="Newsletter signup">
      <div className="flex w-full items-stretch gap-2">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          disabled={status === "submitting"}
          className="min-h-[44px] min-w-0 flex-1 border border-white/20 bg-white/10 px-4 font-body text-sm text-white outline-none placeholder:text-white/35 focus:border-white/40 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 min-h-[44px] cursor-pointer items-center gap-2 bg-brand-green px-4 font-body text-sm font-semibold text-black transition duration-150 hover:bg-white hover:text-brand-ink disabled:opacity-50"
        >
          {status === "submitting" ? "…" : "Subscribe"}
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

/* ── Footer ── */
export function Footer() {
  return (
    <div className="bg-[#111111]">

      {/* ── CTA card ── */}
      <div>
        <div className="cta-card-reveal relative overflow-hidden px-8 py-16 text-center text-white lg:px-16 lg:py-20" style={{ background: "#0d2a1a" }}>
          {/* Animated blob 1 — green, drifts slowly, oversized to always cover edges */}
          <div
            className="pointer-events-none absolute -inset-[30%]"
            style={{
              background: "radial-gradient(ellipse 55% 55% at 30% 65%, rgba(165,205,57,0.82) 0%, transparent 65%)",
              animation: "ctaBlob1 9s ease-in-out infinite alternate",
            }}
          />
          {/* Animated blob 2 — blue, drifts opposite, oversized */}
          <div
            className="pointer-events-none absolute -inset-[30%]"
            style={{
              background: "radial-gradient(ellipse 55% 55% at 75% 30%, rgba(3,148,215,0.72) 0%, transparent 65%)",
              animation: "ctaBlob2 11s ease-in-out infinite alternate",
            }}
          />
          {/* Subtle shimmer */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)" }}
          />
          <div className="footer-cta-content relative mx-auto max-w-2xl">
            <p className="footer-cta-item font-heading text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white/60">
              Ready to begin?
            </p>
            <h2 className="footer-cta-item mt-4 font-heading text-[2rem] font-bold leading-tight text-white sm:text-[2.5rem] lg:text-[3rem]">
              Take the Next Step<br />Toward Your Purpose
            </h2>
            <p className="footer-cta-item mx-auto mt-5 max-w-lg font-body text-[0.95rem] leading-7 text-white/70">
              Explore Dr. TEA's programs, book a consultation, or join the Inner Circle — your transformation starts with one decision.
            </p>
            <div className="footer-cta-item mt-8 flex justify-center">
              <Link
                href="/programs"
                className="inline-flex cursor-pointer items-center gap-2 bg-brand-green px-8 py-4 font-heading text-[0.9rem] font-semibold text-black transition duration-150 hover:bg-white"
              >
                Explore Programs <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer body ── */}
      <footer className="bg-[#111111] px-8 py-12 lg:px-16 lg:py-14">
        <div>

          {/* Brand block — full width on mobile */}
          <div className="mb-10 max-w-xs">
            <Link href="/" aria-label="Dr. TEA home" className="inline-flex">
              <Image
                src="/images/logo-symbol-white.png"
                alt="Dr. TEA"
                width={220}
                height={96}
                className="h-16 w-auto object-contain object-left"
              />
            </Link>
            <p className="mt-4 font-body text-[0.9rem] leading-7 text-white/45">
              Helping purpose-driven leaders discover clarity, grow intentionally, and lead with lasting impact.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/15 text-white/40 transition duration-150 hover:border-white/40 hover:text-white"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1fr_1fr_1fr_1.5fr]">

            <nav aria-label="Company">
              <p className="font-heading text-[1.05rem] font-bold text-white">
                Company
              </p>
              <ul className="mt-5 grid gap-4 lg:gap-3">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="font-body text-[0.9rem] text-white/55 transition duration-150 hover:text-white lg:text-[0.85rem]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Programs">
              <p className="font-heading text-[1.05rem] font-bold text-white">
                Programs
              </p>
              <ul className="mt-5 grid gap-4 lg:gap-3">
                {programLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="font-body text-[0.9rem] text-white/55 transition duration-150 hover:text-white lg:text-[0.85rem]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect */}
            <nav aria-label="Connect" className="hidden lg:block">
              <p className="font-heading text-[1.05rem] font-bold text-white">
                Connect
              </p>
              <ul className="mt-5 grid gap-3">
                {connectLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="font-body text-[0.85rem] text-white/55 transition duration-150 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter */}
            <div className="col-span-2 lg:col-span-1">
              <p className="font-heading text-[1.05rem] font-bold text-white">
                Newsletter
              </p>
              <p className="mt-4 font-body text-[0.9rem] leading-6 text-white/45 lg:text-[0.85rem]">
                Weekly clarity on purpose, growth, and leadership. No noise, just what you need to keep moving.
              </p>
              <NewsletterForm />
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-body text-[0.78rem] text-white/30">
                &copy; 2026 Dr. Temitope Ebenezer Arowele. All rights reserved.
              </p>
              <div className="flex gap-5">
                <Link href="/privacy-policy" className="font-body text-[0.78rem] text-white/30 transition hover:text-white">Privacy Policy</Link>
                <Link href="/terms-of-service" className="font-body text-[0.78rem] text-white/30 transition hover:text-white">Terms of Service</Link>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
