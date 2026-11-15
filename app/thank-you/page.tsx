import localFont from "next/font/local";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealProvider } from "@/components/RevealProvider";

const garton = localFont({
  src: "../../public/fonts/gartonpro-bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "Thank You | Dr. TEA",
  description:
    "Thank you for contacting Dr. TEA. We will get back to you shortly.",
};

export default function ThankYouPage() {
  return (
    <>
      <RevealProvider />
      <main className="min-h-screen bg-white text-black">
        <Header />

        <section className="bg-brand-green text-white">
          <div className="grid min-h-[15rem] place-items-center px-[5vw] py-12 sm:min-h-[18rem] lg:min-h-[18rem] lg:py-14">
            <h1 className={`${garton.className} hero-reveal mx-auto w-full text-center text-[2rem] font-bold leading-[1.12] tracking-normal text-white lg:w-[40vw] lg:text-[3rem]`}>
              Thank You
            </h1>
          </div>
        </section>

        <section className="bg-white py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="reveal text-left">
                <p className="text-base leading-8 text-brand-muted lg:text-[1.2rem]">
                  We have received your message and appreciate you reaching out.
                  The team will review your inquiry and follow up with the
                  next best step shortly.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <Footer />
      </main>
    </>
  );
}