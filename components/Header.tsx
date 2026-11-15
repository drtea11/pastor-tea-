"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Container } from "./Container";
import { NewsletterForm } from "./NewsletterForm";
import { books } from "@/lib/books";
import { programPages } from "@/lib/programs";
import {
  searchEntries,
  staticSearchIndex,
  type SearchEntry
} from "@/lib/searchIndex";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/programs", mega: true },
  { label: "Books", href: "/books", mega: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

const leftNavItems = navItems.slice(0, 3);
const rightNavItems = navItems.slice(3);

const megaMenuPrograms = programPages.slice(0, 3);
const megaMenuBooks = books.filter(
  (book): book is typeof book & { image: string } => Boolean(book.image)
).slice(0, 3);
const featuredProgram =
  programPages.find((program) => program.slug === "certified-professional-coach-program") ??
  programPages[0];
const featuredBook =
  books.find((book): book is typeof book & { image: string } =>
    book.title === "The Force of Advancement" && Boolean(book.image)
  ) ??
  books.find((book): book is typeof book & { image: string } => Boolean(book.image));

const mobileNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/programs" },
  { label: "Books", href: "/books" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

function renderNavItem(item: (typeof navItems)[number]) {
  return (
    <div key={item.label} className="mega-menu-trigger group relative flex h-20 items-center">
      <Link
        href={item.href}
        className="inline-flex h-full items-center gap-1.5 whitespace-nowrap text-current transition duration-300 hover:text-brand-green group-focus-within:text-brand-green"
      >
        {item.label}
        {item.mega ? (
          <ChevronDown
            size={17}
            strokeWidth={2.4}
            aria-hidden="true"
            className="transition duration-300 ease-out group-focus-within:-rotate-180 group-focus-within:text-brand-green"
          />
        ) : null}
      </Link>
      {item.label === "Programs" ? (
        <div className="mega-menu-panel invisible pointer-events-none fixed left-1/2 top-20 z-50 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 opacity-0 transition group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
          <div className="grid max-h-[calc(100vh-6rem)] gap-5 overflow-y-auto rounded-[0.76rem] border border-white/10 bg-[#101010] p-5 shadow-premium lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="font-heading text-[0.75rem] uppercase tracking-[0.18em] text-white/55">
                Programs
              </p>
              <div className="mt-5 grid gap-3">
                {megaMenuPrograms.map((program) => (
                  <Link
                    key={program.slug}
                    href={`/programs/${program.slug}`}
                    className="mega-menu-item group/program grid grid-cols-[5.4rem_minmax(0,1fr)] gap-3 rounded-[0.76rem] p-1.5 transition hover:bg-white/[0.04]"
                  >
                    <span className="relative block h-[3.2rem] overflow-hidden rounded-[0.55rem] bg-white/8">
                      <Image
                        src={program.heroImage}
                        alt={program.heroImageAlt}
                        fill
                        sizes="86px"
                        className="object-cover transition duration-500 group-hover/program:scale-105"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading text-[0.95rem] leading-tight text-white transition group-hover/program:text-brand-green">
                        {program.shortTitle}
                      </span>
                      <span className="mega-menu-summary mt-1 block max-w-[18rem] font-body text-[0.75rem] leading-4 text-white/55">
                        {program.summary}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/programs"
                className="mega-menu-item mt-5 flex min-h-11 items-center justify-center rounded-[0.76rem] bg-black px-5 font-body text-[0.95rem] text-white transition hover:bg-brand-blue"
              >
                See All Programs
              </Link>
            </div>

            <div>
              <p className="font-heading text-[0.75rem] uppercase tracking-[0.18em] text-white/55">
                Featured
              </p>
              <Link
                href={`/programs/${featuredProgram.slug}`}
                className="mega-menu-item group/featured mt-5 block"
              >
                <span className="relative block aspect-[2.35/1] overflow-hidden rounded-[0.76rem] bg-white/8">
                  <Image
                    src={featuredProgram.heroImage}
                    alt={featuredProgram.heroImageAlt}
                    fill
                    sizes="460px"
                    className="object-cover transition duration-500 group-hover/featured:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </span>
                <span className="mt-5 flex items-start justify-between gap-4">
                  <span>
                    <span className="block max-w-[23rem] font-heading text-[1.15rem] uppercase leading-tight text-white">
                      {featuredProgram.title}
                    </span>
                    <span className="mega-menu-feature mt-3 block max-w-[24rem] font-body text-[0.875rem] leading-5 text-white/58">
                      {featuredProgram.summary}
                    </span>
                  </span>
                  <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-white text-black transition group-hover/featured:bg-brand-green">
                    <ArrowRight size={17} />
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      ) : item.label === "Books" ? (
        <div className="mega-menu-panel invisible pointer-events-none fixed left-1/2 top-20 z-50 w-[min(39rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 opacity-0 transition group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
          <div className="grid max-h-[calc(100vh-6rem)] gap-5 overflow-y-auto rounded-[0.76rem] border border-white/10 bg-[#101010] p-5 shadow-premium lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="font-heading text-[0.75rem] uppercase tracking-[0.18em] text-white/55">
                Books
              </p>
              <div className="mt-5 grid gap-3">
                {megaMenuBooks.map((book) => (
                  <Link
                    key={book.title}
                    href={book.href}
                    className="mega-menu-item group/book grid grid-cols-[4.2rem_minmax(0,1fr)] gap-3 rounded-[0.76rem] p-1.5 transition hover:bg-white/[0.04]"
                  >
                    <span className="relative block h-[4.8rem] overflow-hidden rounded-[0.55rem] bg-white">
                      <Image
                        src={book.image}
                        alt={`${book.title} book cover`}
                        fill
                        sizes="68px"
                        className="object-cover transition duration-500 group-hover/book:scale-105"
                      />
                    </span>
                    <span className="min-w-0 pt-1">
                      <span className="block font-heading text-[0.95rem] leading-tight text-white transition group-hover/book:text-brand-green">
                        {book.title}
                      </span>
                      <span className="mega-menu-summary mt-1 block max-w-[18rem] font-body text-[0.75rem] leading-4 text-white/55">
                        {book.summary}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/books"
                className="mega-menu-item mt-5 flex min-h-11 items-center justify-center rounded-[0.76rem] bg-black px-5 font-body text-[0.95rem] text-white transition hover:bg-brand-blue"
              >
                See All Books
              </Link>
            </div>

            {featuredBook ? (
              <Link href={featuredBook.href} className="mega-menu-item group/featured-book block">
                <p className="font-heading text-[0.75rem] uppercase tracking-[0.18em] text-white/55">
                  Featured
                </p>
                <span className="mt-5 block">
                  <span className="relative block aspect-[2.35/1] overflow-hidden rounded-[0.76rem] bg-white/[0.08]">
                    <Image
                      src={featuredBook.image}
                      alt={`${featuredBook.title} book cover`}
                      fill
                      sizes="300px"
                      className="object-cover transition duration-500 group-hover/featured-book:scale-105"
                    />
                  </span>
                  <span className="mt-5 flex items-start justify-between gap-4">
                    <span>
                      <span className="block max-w-[18rem] font-heading text-[1.05rem] uppercase leading-tight text-white">
                        {featuredBook.title}
                      </span>
                      <span className="mega-menu-feature mt-3 block max-w-[18rem] font-body text-[0.875rem] leading-5 text-white/58">
                        {featuredBook.summary}
                      </span>
                    </span>
                    <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-white text-black transition group-hover/featured-book:bg-brand-green">
                      <ArrowRight size={17} />
                    </span>
                  </span>
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Header({ transparent = false, embedded = false }: { transparent?: boolean; embedded?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileItemsRef = useRef<HTMLAnchorElement[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [articleEntries, setArticleEntries] = useState<SearchEntry[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const drawerOverlayRef = useRef<HTMLButtonElement>(null);
  const drawerItemsRef = useRef<HTMLDivElement[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const searchResults = useMemo(() => {
    return searchEntries(searchQuery, [...staticSearchIndex, ...articleEntries]);
  }, [searchQuery, articleEntries]);

  function openSearch() {
    setOpen(false);
    setDrawerOpen(false);
    setSearchQuery("");
    setActiveIndex(0);
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchVisible(false);
    window.setTimeout(() => {
      setSearchOpen(false);
      setSearchQuery("");
      setActiveIndex(0);
    }, 250);
  }

  function openDrawer() {
    setOpen(false);
    setSearchOpen(false);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    closeDrawerAnimated();
  }
  const lockedScrollYRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open && !drawerOpen && !searchOpen) {
      return;
    }

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;
    const originalBodyOverscrollBehavior = document.body.style.overscrollBehavior;

    lockedScrollYRef.current = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollYRef.current}px`;
    document.body.style.width = "100%";

    const preventScroll = (event: Event) => event.preventDefault();
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.overscrollBehavior = originalHtmlOverscrollBehavior;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      window.scrollTo(0, lockedScrollYRef.current);
    };
  }, [open, drawerOpen, searchOpen]);

  // Animate the search overlay in, fetch blog articles once, and wire Escape.
  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const frame = requestAnimationFrame(() => setSearchVisible(true));

    let cancelled = false;
    if (articleEntries.length === 0) {
      fetch("/api/search")
        .then((response) => (response.ok ? response.json() : { articles: [] }))
        .then((data: { articles?: SearchEntry[] }) => {
          if (!cancelled && Array.isArray(data.articles)) {
            setArticleEntries(data.articles);
          }
        })
        .catch(() => {
          /* search still works on static content */
        });
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeSearch();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKey);
    };
  }, [searchOpen, articleEntries.length]);

  // Escape closes mobile menu too
  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobileMenu();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // Keep the highlighted suggestion in range as results change (derived, not stored).
  const safeActiveIndex =
    searchResults.length === 0 ? 0 : Math.min(activeIndex, searchResults.length - 1);

  // GSAP mobile menu animation
  useEffect(() => {
    const panel = mobileMenuRef.current;
    const items = mobileItemsRef.current.filter(Boolean);
    if (!panel) return;

    if (open) {
      gsap.set(panel, { y: "100%" });
      gsap.to(panel, { y: "0%", duration: 0.55, ease: "power4.out" });
      gsap.fromTo(
        items,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out", delay: 0.18 }
      );
    }
  }, [open]);

  function closeMobileMenu() {
    const panel = mobileMenuRef.current;
    const items = mobileItemsRef.current.filter(Boolean);
    if (!panel) { setOpen(false); return; }

    gsap.to(items, { y: 24, opacity: 0, duration: 0.25, stagger: 0.04, ease: "power2.in" });
    gsap.to(panel, {
      y: "100%",
      duration: 0.45,
      ease: "power4.in",
      delay: 0.1,
      onComplete: () => setOpen(false),
    });
  }

  // GSAP drawer entrance / exit
  useEffect(() => {
    if (!drawerOpen) return;

    const panel = drawerRef.current;
    const overlay = drawerOverlayRef.current;
    const items = drawerItemsRef.current.filter(Boolean);

    if (panel) {
      gsap.fromTo(panel, { x: "100%" }, { x: "0%", duration: 0.5, ease: "power4.out" });
    }
    if (overlay) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    }
    if (items.length) {
      gsap.fromTo(items, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power3.out", delay: 0.15 });
    }

    setDrawerVisible(true);

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeDrawer();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [drawerOpen]);

  function closeDrawerAnimated() {
    const panel = drawerRef.current;
    const overlay = drawerOverlayRef.current;
    const items = drawerItemsRef.current.filter(Boolean);

    if (items.length) {
      gsap.to(items, { y: 16, opacity: 0, duration: 0.2, stagger: 0.04, ease: "power2.in" });
    }
    if (overlay) {
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in" });
    }
    if (panel) {
      gsap.to(panel, { x: "100%", duration: 0.4, ease: "power4.in", delay: 0.08, onComplete: () => { setDrawerVisible(false); setDrawerOpen(false); } });
    } else {
      setDrawerVisible(false);
      setDrawerOpen(false);
    }
  }

  const overHero = transparent && !scrolled;

  return (
    <>
      <header
        className={`relative z-50 flex h-[4.5rem] items-center transition-all duration-300 lg:h-20 ${
          embedded
            ? "border-b border-black/8 bg-transparent text-brand-ink"
            : overHero
            ? "border-b border-black/8 bg-white text-black lg:border-transparent lg:bg-transparent lg:text-white lg:shadow-none"
            : scrolled
            ? "border-b border-black/10 bg-white/95 text-black shadow-[0_14px_44px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "border-b border-black/8 bg-white text-black"
        }`}
      >
      <Container>
        <div className="relative flex min-h-14 items-center justify-between gap-3 px-0 lg:justify-center lg:px-4">
          {/* Mobile logo — black variant */}
          <Link href="/" aria-label="Dr. TEA home" className="flex shrink-0 items-center lg:hidden">
            <Image
              src="/images/logo black vairant.png"
              alt="Dr. TEA logo"
              width={236}
              height={206}
              className="h-14 w-40 object-contain object-left"
              priority
            />
          </Link>

          {/* Book a call — sits at the left edge on desktop */}
          <Link
            href="/book-a-call"
            className="absolute left-0 hidden items-center gap-2 border-2 border-brand-green bg-brand-green px-5 py-2.5 font-body text-sm font-semibold leading-none text-black transition duration-200 hover:bg-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green lg:inline-flex"
          >
            Book Call
          </Link>

          {/* Desktop nav — centered links with the logo given extra breathing room */}
          <nav className="hidden items-center justify-center gap-7 font-body text-base font-medium xl:gap-9 lg:flex">
            {leftNavItems.map(renderNavItem)}

            <Link
              href="/"
              aria-label="Dr. TEA home"
              className="mx-5 flex shrink-0 items-center xl:mx-8"
            >
              <Image
                src={overHero ? "/images/logo-symbol-white.png" : "/images/logo black vairant.png"}
                alt="Dr. TEA logo"
                width={236}
                height={206}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>

            {rightNavItems.map(renderNavItem)}
          </nav>

          {/* Desktop utilities — search + menu on the right edge */}
          <div className="absolute right-0 hidden items-center gap-1.5 lg:flex">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => (searchOpen ? closeSearch() : openSearch())}
              className="grid size-11 place-items-center rounded-full text-current transition duration-300 hover:text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
            >
              <Search size={22} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              onClick={() => (drawerOpen ? closeDrawer() : openDrawer())}
              className="grid size-11 place-items-center text-current transition duration-300 hover:text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
            >
              <span className="relative block h-7 w-7" aria-hidden="true">
                <span
                  className={`absolute left-0 top-1.5 h-[3px] w-7 bg-current transition duration-300 ease-out ${
                    drawerOpen ? "translate-y-[0.42rem] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-1.5 left-0 h-[3px] w-7 bg-current transition duration-300 ease-out ${
                    drawerOpen ? "-translate-y-[0.42rem] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => searchOpen ? closeSearch() : openSearch()}
              className="grid size-10 place-items-center text-current transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
            >
              <Search size={20} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => open ? closeMobileMenu() : setOpen(true)}
              className="grid size-10 place-items-center text-current transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
            >
              <span className="relative block h-7 w-7" aria-hidden="true">
                <span
                  className={`absolute left-0 top-1.5 h-[3px] w-7 bg-current transition duration-300 ease-out ${
                    open ? "translate-y-[0.42rem] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-1.5 left-0 h-[3px] w-7 bg-current transition duration-300 ease-out ${
                    open ? "-translate-y-[0.42rem] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <div
            ref={mobileMenuRef}
            className="fixed inset-0 z-[999] flex h-[100dvh] flex-col overflow-hidden bg-brand-ink text-white overscroll-none lg:hidden"
            style={{ transform: "translateY(100%)" }}
          >
            {/* Top bar */}
            <div className="flex min-h-[4.5rem] shrink-0 items-center justify-end border-b border-white/10 px-[6vw]">
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMobileMenu}
                className="grid size-10 place-items-center text-white/70 transition hover:text-white"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col justify-start px-[6vw] pt-6">
              {mobileNavItems.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  ref={(el) => { if (el) mobileItemsRef.current[i] = el; }}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-5 font-heading text-[1.6rem] font-semibold leading-none text-white opacity-0 transition-colors duration-150 hover:text-brand-green"
                  style={{ opacity: 0 }}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={20} className="text-white/30" aria-hidden="true" />
                </Link>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div
              ref={(el) => { if (el) mobileItemsRef.current[mobileNavItems.length] = el as unknown as HTMLAnchorElement; }}
              className="shrink-0 px-[6vw] pb-10 pt-6 opacity-0"
              style={{ opacity: 0 }}
            >
              <Link
                href="/book-a-call"
                onClick={closeMobileMenu}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 border-2 border-brand-green bg-brand-green px-6 font-body text-sm font-semibold uppercase leading-none text-black transition hover:bg-white hover:border-white"
              >
                Book a Clarity Call
              </Link>
            </div>
          </div>
        ) : null}
      </Container>

      {searchOpen ? (
        <div
          className="fixed inset-0 z-[1000] block"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={closeSearch}
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
              searchVisible ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-x-0 top-0 flex justify-center px-6 pt-[12vh]">
            <div
              className={`w-full max-w-2xl transition-all duration-300 ease-out ${
                searchVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const target = searchResults[safeActiveIndex];
                  if (target) {
                    closeSearch();
                    router.push(target.href);
                  }
                }}
                className="relative"
              >
                <Search
                  size={22}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-brand-muted"
                />
                <input
                  type="search"
                  autoFocus
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setActiveIndex((index) =>
                        searchResults.length ? (index + 1) % searchResults.length : 0
                      );
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setActiveIndex((index) =>
                        searchResults.length
                          ? (index - 1 + searchResults.length) % searchResults.length
                          : 0
                      );
                    }
                  }}
                  placeholder="Search programs, books, articles…"
                  aria-label="Search programs, books, and articles"
                  className="h-16 w-full rounded-full border border-black/5 bg-white pl-14 pr-14 font-body text-lg text-brand-ink shadow-premium placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeSearch}
                  className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-brand-muted transition hover:bg-black/5 hover:text-brand-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
                >
                  <X size={22} aria-hidden="true" />
                </button>
              </form>

              {searchQuery.trim() ? (
                <div className="mt-3 max-h-[60vh] overflow-y-auto rounded-3xl border border-black/5 bg-white py-2 shadow-premium">
                  {searchResults.length ? (
                    searchResults.map((result, index) => (
                      <Link
                        key={`${result.type}-${result.href}-${result.title}`}
                        href={result.href}
                        onClick={closeSearch}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex items-center gap-4 px-5 py-3 transition ${
                          index === safeActiveIndex ? "bg-brand-green/10" : "hover:bg-black/[0.03]"
                        }`}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="font-heading text-base leading-tight text-brand-ink">
                              {result.title}
                            </span>
                            <span className="rounded-full bg-black/5 px-2 py-0.5 font-body text-[0.65rem] uppercase tracking-[0.12em] text-brand-muted">
                              {result.type}
                            </span>
                          </span>
                          <span className="mt-0.5 line-clamp-1 block font-body text-sm text-brand-muted">
                            {result.description}
                          </span>
                        </span>
                        <ArrowRight
                          size={18}
                          aria-hidden="true"
                          className={`shrink-0 transition ${
                            index === safeActiveIndex ? "text-brand-green" : "text-brand-muted"
                          }`}
                        />
                      </Link>
                    ))
                  ) : (
                    <p className="px-5 py-6 text-center font-body text-sm text-brand-muted">
                      No results for &ldquo;{searchQuery.trim()}&rdquo;.
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-center font-body text-sm text-white/70">
                  Search programs, books, and articles. Press{" "}
                  <kbd className="rounded bg-white/15 px-1.5 py-0.5 font-body text-xs text-white">Esc</kbd>{" "}
                  to close.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {drawerOpen ? (
        <div
          className="fixed inset-0 z-[1000] hidden lg:block"
          role="dialog"
          aria-modal="true"
          aria-label="Subscribe to Dr. TEA"
        >
          {/* Overlay */}
          <button
            ref={drawerOverlayRef}
            type="button"
            aria-label="Close"
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/55"
            style={{ opacity: 0 }}
          />

          {/* Panel */}
          <aside
            ref={drawerRef}
            className="absolute right-0 top-0 flex h-full w-[min(28rem,100vw)] flex-col overflow-y-auto bg-white text-brand-ink shadow-premium"
            style={{ transform: "translateX(100%)" }}
          >
            {/* Header */}
            <div
              ref={(el) => { if (el) drawerItemsRef.current[0] = el; }}
              className="flex items-center justify-between px-8 pt-8"
            >
              <Link href="/" aria-label="Dr. TEA home" onClick={closeDrawer}>
                <Image
                  src="/images/logo black vairant.png"
                  alt="Dr. TEA logo"
                  width={236}
                  height={206}
                  className="h-11 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                aria-label="Close"
                onClick={closeDrawer}
                className="grid size-10 place-items-center rounded-full text-brand-muted transition hover:text-brand-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Newsletter content */}
            <div
              ref={(el) => { if (el) drawerItemsRef.current[1] = el; }}
              className="px-8 pt-10"
            >
              <p className="font-heading text-[0.8rem] uppercase tracking-[0.22em] text-brand-blue">
                Stay Connected
              </p>
              <h2 className="mt-4 font-heading text-[2rem] font-medium capitalize leading-tight text-brand-ink">
                Join The Journey
              </h2>
            </div>

            <div
              ref={(el) => { if (el) drawerItemsRef.current[2] = el; }}
              className="px-8 pt-5"
            >
              <p className="max-w-sm font-body text-base leading-7 text-brand-muted">
                Get weekly purpose-driven insights to strengthen your spirit, sharpen your thinking, and walk out your God-given assignment.
              </p>
            </div>

            <div
              ref={(el) => { if (el) drawerItemsRef.current[3] = el; }}
              className="px-8 pt-7"
            >
              <NewsletterForm />
            </div>
          </aside>
        </div>
      ) : null}

      </header>
    </>
  );
}
