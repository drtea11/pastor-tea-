import localFont from "next/font/local";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PaymentConfirm } from "@/components/PaymentConfirm";
import { RevealProvider } from "@/components/RevealProvider";
import { paymentDetails } from "@/lib/payment";

const garton = localFont({
  src: "../../../public/fonts/gartonpro-bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "Complete Payment · The Inner Circle | Dr. TEA",
  description:
    "Complete your Inner Circle membership payment via bank transfer, then confirm on WhatsApp.",
};

export default function InnerCirclePayPage() {
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
              Complete Your Payment
            </h1>
          </div>
        </section>

        <section className="bg-white py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="reveal text-center font-body text-[0.7rem] uppercase tracking-[0.22em] text-brand-blue">
                Step 2 of 2 · Payment
              </p>
              <div className="mt-10">
                <PaymentConfirm
                  programTitle="The Inner Circle"
                  storageKey="enroll:inner-circle"
                  assessmentHref="/inner-circle"
                  bankName={paymentDetails.bankName}
                  accountName={paymentDetails.accountName}
                  accountNumber={paymentDetails.accountNumber}
                />
              </div>
            </div>
          </Container>
        </section>

        <Footer />
      </main>
    </>
  );
}
