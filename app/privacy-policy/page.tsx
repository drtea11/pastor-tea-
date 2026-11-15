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
  title: "Privacy Policy | Dr. TEA",
  description:
    "Privacy Policy for Dr. Temitope Ebenezer Arowele's website, programs, and services.",
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
          </div>
        </section>

        <section className="bg-white py-20">
          <Container>
            <div className="mx-auto max-w-3xl space-y-10 font-body text-[0.95rem] leading-8 text-brand-muted lg:text-[1rem] lg:leading-9">

              <div>
                <p className="text-brand-ink/40 text-[0.8rem] uppercase tracking-[0.14em] font-heading font-semibold">Last updated: June 2026</p>
                <p className="mt-4">
                  Dr. Temitope Ebenezer Arowele ("Dr. TEA", "we", "us", or "our") is committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information
                  when you visit our website, enroll in programs, or engage with our services.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  1. Information We Collect
                </h2>
                <p className="mt-4">
                  We may collect the following types of personal information:
                </p>
                <ul className="mt-4 space-y-2 pl-5 list-disc">
                  <li><strong className="text-brand-ink font-semibold">Contact information</strong> — name, email address, phone number, and any details you submit through our contact or booking forms.</li>
                  <li><strong className="text-brand-ink font-semibold">Newsletter subscriptions</strong> — your email address when you subscribe to our mailing list.</li>
                  <li><strong className="text-brand-ink font-semibold">Program enrollment data</strong> — information provided when registering for coaching, mentoring, or certification programs.</li>
                  <li><strong className="text-brand-ink font-semibold">Usage data</strong> — browser type, pages visited, time on site, and other analytics collected through standard tools such as Google Analytics.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  2. How We Use Your Information
                </h2>
                <p className="mt-4">We use your information to:</p>
                <ul className="mt-4 space-y-2 pl-5 list-disc">
                  <li>Respond to inquiries and provide support</li>
                  <li>Send program updates, newsletters, and resources you have opted into</li>
                  <li>Process bookings, consultations, and program enrollments</li>
                  <li>Improve the quality and content of our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <p className="mt-4">
                  We will never sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  3. Cookies
                </h2>
                <p className="mt-4">
                  Our website uses cookies to enhance your browsing experience and gather anonymised analytics data.
                  You may disable cookies through your browser settings; however, some features of the site may not
                  function correctly as a result.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  4. Third-Party Services
                </h2>
                <p className="mt-4">
                  We use trusted third-party services to operate our website and programs, including:
                </p>
                <ul className="mt-4 space-y-2 pl-5 list-disc">
                  <li><strong className="text-brand-ink font-semibold">Cal.com</strong> — for booking and consultation scheduling</li>
                  <li><strong className="text-brand-ink font-semibold">Formspree</strong> — for processing contact form submissions</li>
                  <li><strong className="text-brand-ink font-semibold">Google Analytics</strong> — for website traffic and usage analytics</li>
                  <li><strong className="text-brand-ink font-semibold">Sanity.io</strong> — for content management</li>
                </ul>
                <p className="mt-4">
                  Each of these services operates under their own privacy policies. We encourage you to review them
                  independently.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  5. Data Security
                </h2>
                <p className="mt-4">
                  We take reasonable technical and organisational measures to protect your personal data against
                  unauthorised access, loss, or misuse. However, no method of transmission over the internet is
                  completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  6. Your Rights
                </h2>
                <p className="mt-4">You have the right to:</p>
                <ul className="mt-4 space-y-2 pl-5 list-disc">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Withdraw consent for marketing communications at any time</li>
                  <li>Lodge a complaint with a relevant data protection authority</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us at the address below.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-[1.2rem] font-bold text-brand-ink lg:text-[1.4rem]">
                  7. Contact Us
                </h2>
                <p className="mt-4">
                  If you have any questions about this Privacy Policy or how we handle your data, please reach out:
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
