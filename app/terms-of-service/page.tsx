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
  title: "Terms of Service | Dr. TEA",
  description:
    "Terms of Service governing the use of Dr. TEA's website, programs, and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <RevealProvider />
      <main className="min-h-screen bg-white text-black">
        <Header />

        <section className="bg-brand-green text-white">
          <div className="grid min-h-[15rem] place-items-center px-[5vw] py-12 sm:min-h-[18rem] lg:min-h-[18rem] lg:py-14">
            <h1
              className={`${garton.className} hero-reveal text-center text-[2rem] font-bold leading-[1.12] tracking-normal text-white lg:text-[3rem]`}
            >
              Terms of Service
            </h1>
          </div>
        </section>

        <section className="bg-white py-20">
          <Container>
            <div className="mx-auto max-w-3xl space-y-10 font-body text-[0.95rem] leading-8 text-brand-muted lg:text-[1rem] lg:leading-9">

              <div>
                <p className="text-brand-ink/40 text-[0.8rem] uppercase tracking-[0.14em] font-heading font-semibold">Last updated: June 2026</p>
                <p className="mt-4">
                  By accessing or using the website and services of Dr. Temitope Ebenezer Arowele ("Dr. TEA", "we",
                  "us", or "our"), you agree to be bound by these Terms of Service. Please read them carefully before
                  engaging with any content, programs, or offerings.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  1. Acceptance of Terms
                </h2>
                <p className="mt-4">
                  By using this website, enrolling in a program, or engaging with any service provided by Dr. TEA,
                  you confirm that you are at least 18 years of age and have the legal capacity to enter into a
                  binding agreement. If you do not agree to these terms, please discontinue use immediately.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  2. Services Offered
                </h2>
                <p className="mt-4">
                  Dr. TEA provides coaching, mentoring, leadership development, writing programs, speaking engagements,
                  and related educational resources. These services are designed for personal and professional growth
                  and do not constitute psychological, legal, financial, or medical advice.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  3. Program Enrollment and Payments
                </h2>
                <p className="mt-4">
                  Enrollment in any program is subject to availability and acceptance. Payment terms, schedules, and
                  refund policies will be communicated at the point of enrollment. All fees are stated in the
                  applicable program agreement and are non-refundable unless otherwise specified in writing.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  4. Intellectual Property
                </h2>
                <p className="mt-4">
                  All content on this website — including text, graphics, logos, videos, course materials, and
                  downloadable resources — is the exclusive intellectual property of Dr. Temitope Ebenezer Arowele
                  unless otherwise stated. You may not reproduce, distribute, modify, or create derivative works
                  without prior written consent.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  5. User Conduct
                </h2>
                <p className="mt-4">When using our website or participating in our programs, you agree not to:</p>
                <ul className="mt-4 space-y-2 pl-5 list-disc">
                  <li>Share, reproduce, or resell program content without authorisation</li>
                  <li>Disrupt or interfere with the experience of other participants</li>
                  <li>Provide false information during enrollment or communication</li>
                  <li>Use our platform or content for any unlawful purpose</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  6. Disclaimer of Warranties
                </h2>
                <p className="mt-4">
                  Our website and services are provided on an "as is" and "as available" basis. While we strive
                  for accuracy and quality, we make no guarantees regarding specific outcomes from participation
                  in any program or engagement with any content. Results will vary based on individual effort,
                  circumstances, and commitment.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  7. Limitation of Liability
                </h2>
                <p className="mt-4">
                  To the fullest extent permitted by applicable law, Dr. TEA shall not be liable for any indirect,
                  incidental, or consequential damages arising out of your use of our website or services, including
                  but not limited to loss of income, data, or opportunity.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  8. Confidentiality
                </h2>
                <p className="mt-4">
                  Information shared within coaching or mentoring sessions is treated with the highest level of
                  confidentiality. We will not disclose personal details shared in a coaching context without your
                  explicit consent, except where required by law.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  9. Modifications to Terms
                </h2>
                <p className="mt-4">
                  We reserve the right to update these Terms of Service at any time. Changes will be reflected by
                  the "Last updated" date at the top of this page. Continued use of the website or services after
                  changes are posted constitutes your acceptance of the revised terms.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  10. Governing Law
                </h2>
                <p className="mt-4">
                  These Terms shall be governed by and construed in accordance with applicable laws. Any disputes
                  arising in connection with these Terms shall be resolved through good-faith negotiation in the
                  first instance.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  11. Contact Us
                </h2>
                <p className="mt-4">
                  For questions or concerns regarding these Terms of Service, please contact us:
                </p>
                <p className="mt-4">
                  <strong className="text-brand-ink font-semibold">Dr. Temitope Ebenezer Arowele</strong><br />
                  Email: <a href="mailto:hello@drteaarowele.com" className="text-brand-blue underline underline-offset-2 hover:text-brand-ink transition">hello@drteaarowele.com</a>
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
