"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function RevealProvider() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      document
        .querySelectorAll(".reveal, .reveal-card, .image-reveal, .why-work-pillar-item, .split-word")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {

      /* ── Hero: Ken Burns zoom + drift ── */
      gsap.to(".hero-zoom", {
        scale: 1.12,
        xPercent: -4,
        yPercent: -3,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center center",
      });

      /* ── Hero: word-split headline stagger (text-nodes only) ── */
      document.querySelectorAll<HTMLElement>(".hero-title").forEach((headline) => {
        // Walk only TEXT nodes to avoid corrupting element tags/attributes
        const walk = (node: Node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent ?? "";
            if (!text.trim()) return;
            const frag = document.createDocumentFragment();
            text.split(/(\s+)/).forEach((chunk) => {
              if (/^\s+$/.test(chunk)) {
                frag.appendChild(document.createTextNode(chunk));
              } else if (chunk) {
                const outer = document.createElement("span");
                outer.className = "split-word inline-block overflow-hidden";
                const inner = document.createElement("span");
                inner.className = "split-word-inner inline-block";
                inner.style.transform = "translateY(110%)";
                inner.textContent = chunk;
                outer.appendChild(inner);
                frag.appendChild(outer);
              }
            });
            node.parentNode?.replaceChild(frag, node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            Array.from(node.childNodes).forEach(walk);
          }
        };
        Array.from(headline.childNodes).forEach(walk);

        const inners = headline.querySelectorAll<HTMLElement>(".split-word-inner");
        gsap.to(inners, {
          y: 0,
          duration: 0.85,
          stagger: 0.055,
          ease: "power4.out",
          delay: 0.15,
          clearProps: "transform",
        });
      });

      /* ── Hero: remaining hero-reveal items ── */
      gsap.fromTo(
        ".hero-reveal:not(.hero-title)",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.5,
          clearProps: "transform,opacity,visibility",
        }
      );

      /* ── Hero scroll-wheel pulse ── */
      gsap.to(".hero-scroll-wheel", {
        y: 6,
        duration: 0.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* ── Generic .reveal blocks ── */
      gsap.utils.toArray<HTMLElement>(".reveal:not(.reveal-card)").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%", once: true },
            clearProps: "transform,opacity,visibility",
          }
        );
      });

      /* ── Section headings: line-wipe reveal ── */
      gsap.utils.toArray<HTMLElement>(".section-heading-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: -24 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            clearProps: "transform,opacity,visibility",
          }
        );
      });

      /* ── Pillar words: scrub color reveal on scroll ── */
      gsap.utils.toArray<HTMLElement>(".pillar-word").forEach((el) => {
        gsap.to(el, {
          color: "#0b0d10",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.6,
          },
        });
      });

      /* ── Benefits cards: stagger rise + icon breathe ── */
      ScrollTrigger.batch(".benefits-card", {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 60 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              onComplete() {
                (batch as HTMLElement[]).forEach((card) => {
                  const iconArea = card.querySelector<HTMLElement>(".benefits-icon-area");
                  if (!iconArea) return;
                  gsap.fromTo(
                    iconArea,
                    { scale: 0.88, autoAlpha: 0 },
                    { scale: 1, autoAlpha: 1, duration: 0.55, ease: "back.out(1.4)", clearProps: "transform,opacity,visibility" }
                  );
                });
              },
            }
          );
        },
      });

      /* ── Cards: batch stagger ── */
      ScrollTrigger.batch(".reveal-card", {
        start: "top 86%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            }
          );
        },
      });

      /* ── FAQ items: stagger slide-in on scroll ── */
      gsap.utils.toArray<HTMLElement>(".faq-list").forEach((list) => {
        const items = list.querySelectorAll<HTMLElement>(".faq-item");
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: list, start: "top 85%", once: true },
            clearProps: "transform,opacity,visibility",
          }
        );
      });

      /* ── Features checklist: stagger tick-in ── */
      gsap.utils.toArray<HTMLElement>(".features-list").forEach((list) => {
        const items = list.querySelectorAll<HTMLElement>(".feature-item");
        gsap.fromTo(
          items,
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: list, start: "top 85%", once: true },
            clearProps: "transform,opacity,visibility",
          }
        );
      });

      /* ── Footer CTA: sequential heading + body + button ── */
      gsap.utils.toArray<HTMLElement>(".footer-cta-content").forEach((el) => {
        const children = el.querySelectorAll<HTMLElement>(".footer-cta-item");
        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
            clearProps: "transform,opacity,visibility",
          }
        );
      });

      /* ── Pricing cards: stagger with featured first ── */
      gsap.utils.toArray<HTMLElement>(".pricing-grid").forEach((grid) => {
        const cards = grid.querySelectorAll<HTMLElement>(".pricing-card");
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: grid, start: "top 85%", once: true },
            clearProps: "transform,opacity,visibility",
          }
        );
      });

      /* ── WhyWork pillar list ── */
      gsap.utils.toArray<HTMLElement>(".why-work-pillar-list").forEach((list) => {
        const items = list.querySelectorAll<HTMLElement>(".why-work-pillar-item");
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: list, start: "top 82%", once: true },
            clearProps: "transform,opacity,visibility",
          }
        );
      });

      /* ── About section: clipPath left-to-right image wipe ── */
      gsap.utils.toArray<HTMLElement>(".about-image-reveal").forEach((el) => {
        const img = el.querySelector("img");
        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 80%", once: true },
            }
          );
        }
      });

      /* ── About copy: stagger lines from left ── */
      gsap.utils.toArray<HTMLElement>(".about-copy-reveal").forEach((el) => {
        const lines = el.querySelectorAll<HTMLElement>(".about-line");
        if (!lines.length) return;
        gsap.fromTo(
          lines,
          { autoAlpha: 0, x: -28 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            clearProps: "transform,opacity,visibility",
          }
        );
      });

      /* ── image-reveal: bottom clip ── */
      gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((el) => {
        const img = el.querySelector("img");
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 18% 0 round 0.76rem)" },
          {
            clipPath: "inset(0 0 0% 0 round 0.76rem)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 82%", once: true },
            }
          );
        }
      });

      /* ── Parallax media ── */
      gsap.utils.toArray<HTMLElement>(".parallax-media").forEach((el) => {
        gsap.set(el, { scale: 1.06, transformOrigin: "center" });
        gsap.to(el, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      /* ── CTA / Footer card: scale lift on enter ── */
      gsap.utils.toArray<HTMLElement>(".cta-card-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, scale: 0.94, y: 32 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            clearProps: "transform,opacity,visibility",
          }
        );
      });

      /* ── Testimonials GSAP marquee ── */
      gsap.utils.toArray<HTMLElement>(".gsap-marquee-track").forEach((track) => {
        const width = track.scrollWidth / 2; // cloned content = 2x
        gsap.to(track, {
          x: -width,
          duration: 30,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % width),
          },
        });

        const pause = () => gsap.globalTimeline.pause();
        const resume = () => gsap.globalTimeline.resume();
        const parent = track.parentElement;
        if (parent) {
          parent.addEventListener("mouseenter", pause);
          parent.addEventListener("mouseleave", resume);
          cleanupFns.push(() => {
            parent.removeEventListener("mouseenter", pause);
            parent.removeEventListener("mouseleave", resume);
          });
        }
      });

      /* ── Mega menu panel + items ── */
      gsap.utils.toArray<HTMLElement>(".mega-menu-trigger").forEach((trigger) => {
        const panel = trigger.querySelector<HTMLElement>(".mega-menu-panel");
        const items = trigger.querySelectorAll<HTMLElement>(".mega-menu-item");
        if (!panel || !items.length) return;

        const show = () => {
          gsap.killTweensOf([panel, items]);
          gsap.fromTo(panel, { y: 8 }, { y: 0, duration: 0.28, ease: "power2.out" });
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.035, ease: "power2.out", clearProps: "transform,opacity,visibility" }
          );
        };

        trigger.addEventListener("mouseenter", show);
        trigger.addEventListener("focusin", show);
        cleanupFns.push(() => {
          trigger.removeEventListener("mouseenter", show);
          trigger.removeEventListener("focusin", show);
        });
      });

      /* ── Generic hover float ── */
      gsap.utils.toArray<HTMLElement>(".gsap-hover").forEach((el) => {
        const enter = () => gsap.to(el, { y: -2, duration: 0.2, ease: "power2.out" });
        const leave = () => gsap.to(el, { y: 0, duration: 0.24, ease: "power2.out" });
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        el.addEventListener("focus", enter);
        el.addEventListener("blur", leave);
        cleanupFns.push(() => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
          el.removeEventListener("focus", enter);
          el.removeEventListener("blur", leave);
        });
      });

      /* ── Counter numbers ── */
      gsap.utils.toArray<HTMLElement>(".count-up").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") ?? "0");
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => { el.textContent = Math.round(proxy.val).toString(); },
        });
      });

    });

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return null;
}
