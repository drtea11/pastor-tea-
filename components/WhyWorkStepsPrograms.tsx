"use client";

import { Compass, BookOpen, BarChart3 } from "lucide-react";
import { Container } from "./Container";

const cards = [
  {
    Icon: Compass,
    title: "Purpose With Clarity",
    body: "Every program is built to help you discover, define, and walk boldly in your God-given purpose.",
  },
  {
    Icon: BookOpen,
    title: "Wisdom, Not Just Motivation",
    body: "Grounded in scripture and real-world experience — not hype, trends, or empty inspiration.",
  },
  {
    Icon: BarChart3,
    title: "Structure That Produces Results",
    body: "Clear pathways, accountability, and mentoring so your growth is intentional and measurable.",
  },
];

export function WhyWorkStepsPrograms() {
  return (
    <section
      id="why-work"
      style={{ backgroundColor: "#F2F2F2" }}
      className="py-[60px] lg:py-[100px]"
    >
      <Container>
        <div className="reveal text-center" style={{ marginBottom: "clamp(36px, 5vw, 56px)" }}>
          <h2 className="font-heading" style={{ lineHeight: 1.18, letterSpacing: "-0.01em" }}>
            <span className="block font-light" style={{ color: "#AAAAAA", fontSize: "clamp(36px, 5vw, 56px)", marginBottom: "6px" }}>
              Why Leaders Keep
            </span>
            <span className="block font-extrabold" style={{ color: "#111111", fontSize: "clamp(36px, 5vw, 56px)" }}>
              Coming Back.
            </span>
          </h2>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ maxWidth: "1150px" }}>
          {cards.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="why-card reveal-card flex flex-col transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] motion-reduce:hover:translate-y-0"
              style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", boxShadow: "0 4px 32px rgba(0,0,0,0.07)", overflow: "hidden" }}
            >
              <div style={{ padding: "10px 10px 0 10px" }}>
                <div
                  className="flex items-center justify-center"
                  style={{ backgroundColor: "#F7F7F7", borderRadius: "12px", height: "clamp(200px, 18vw, 240px)" }}
                >
                  <Icon size={52} strokeWidth={1.4} className="text-brand-ink" />
                </div>
              </div>
              <div style={{ padding: "20px 24px 28px" }}>
                <h3 className="font-heading" style={{ fontWeight: 700, fontSize: "19px", color: "#111111", marginBottom: "8px" }}>
                  {title}
                </h3>
                <p className="font-body" style={{ fontWeight: 400, fontSize: "15px", color: "#555555", lineHeight: 1.65, margin: 0 }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
