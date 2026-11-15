import localFont from "next/font/local";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealProvider } from "@/components/RevealProvider";
import { SpeakingBookingForm } from "@/components/SpeakingBookingForm";

const garton = localFont({
  src: "../../public/fonts/gartonpro-bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "Book Dr. TEA To Speak | Dr. TEA",
  description:
    "Invite Dr. Temitope Ebenezer Arowele to speak at your event, conference, church, or organization. Share your event details and the team will follow up.",
};

export default function SpeakingPage() {
  return (
    <>
      <RevealProvider />
      <main className="min-h-screen bg-white text-black">
        <Header />

        <section className="bg-brand-green text-white">
          <div className="grid min-h-[15rem] place-items-center px-[5vw] py-12 sm:min-h-[18rem] lg:min-h-[18rem] lg:py-14">
            <h1
              className={`${garton.className} hero-reveal mx-auto w-full text-center text-[2rem] font-bold leading-[1.12] tracking-normal text-white lg:w-[44vw] lg:text-[3rem]`}
            >
              Book Dr. TEA To Speak
            </h1>
          </div>
        </section>

        <section className="bg-white py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="reveal text-left">
                <p className="text-base leading-8 text-brand-muted lg:text-[1.2rem]">
                  Invite Dr. TEA to bring purpose, clarity, and impact to your event,
                  conference, church, or organization. Share the details below, and the
                  team will follow up to confirm availability and next steps.
                </p>
              </div>

              <SpeakingBookingForm />
            </div>
          </Container>
        </section>

        <Footer />
      </main>
    </>
  );
}
