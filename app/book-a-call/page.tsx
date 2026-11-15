import type { Metadata } from "next";
import { CalBookingEmbed } from "@/components/CalBookingEmbed";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Book A Clarity Call | Dr. TEA",
  description:
    "Schedule a private clarity call with Dr. Temitope Ebenezer Arowele for Spirit-led guidance, structure, and next-step direction."
};

export default function BookACallPage() {
  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <main>
        {/* ── Hero — mirrors program detail page style ── */}
        <section className="flex h-svh flex-col bg-brand-ink text-white">
          <Header transparent />
          <div className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <h1 className="hero-title font-heading font-bold uppercase leading-[0.9] text-white">
                Book A Clarity Call
              </h1>
              <p className="hero-reveal mx-auto mt-6 max-w-xs font-body text-sm leading-7 text-white/55 sm:max-w-xl sm:text-base">
                A private conversation to explore where you are, what God is building in your life, and your next structured step.
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center pb-7">
            <a
              href="#booking"
              aria-label="Scroll to booking"
              className="flex flex-col items-center gap-2 text-white/80 transition hover:text-white"
            >
              <span className="flex h-9 w-[1.45rem] items-start justify-center rounded-full border-2 border-white/70 p-1.5">
                <span className="hero-scroll-wheel h-2 w-1.5 rounded-full bg-white/90" />
              </span>
            </a>
          </div>
        </section>

        {/* ── Booking embed ── */}
        <section id="booking" className="bg-white py-16">
          <Container>
            <div className="booking-cal-frame relative left-1/2 h-[82vh] min-h-[48rem] w-[97vw] -translate-x-1/2 overflow-visible">
              <CalBookingEmbed />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
