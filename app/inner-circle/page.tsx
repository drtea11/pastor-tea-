import { notFound } from "next/navigation";
import localFont from "next/font/local";

import { AssessmentForm } from "@/components/AssessmentForm";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealProvider } from "@/components/RevealProvider";
import { type PaymentPlan } from "@/lib/payment";
import { getProgramBySlug } from "@/lib/programs";

const garton = localFont({
  src: "../../public/fonts/gartonpro-bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "Join The Inner Circle | Dr. TEA",
  description:
    "Join The Inner Circle — a private community for mentorship, teachings, and accountability. Pick a plan, share your details, then pay by bank transfer.",
};

type JoinPageProps = {
  searchParams: Promise<{ plan?: string }>;
};

export default async function InnerCircleJoinPage({ searchParams }: JoinPageProps) {
  const { plan } = await searchParams;

  // Prices live in one place (lib/programs.ts). Build the plan cards from the
  // Inner Circle pricing so the join flow never drifts from the program page.
  const program = getProgramBySlug("inner-circle");
  const pricing = program?.pricing;
  if (!pricing?.monthly || !pricing?.annual) notFound();

  const plans: PaymentPlan[] = [pricing.monthly, pricing.annual].map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    period: item.period,
    blurb: item.description,
    badge: item.badge,
  }));

  const defaultPlanId = plan === "monthly" ? pricing.monthly.id : pricing.annual.id;

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
              Join The Inner Circle
            </h1>
          </div>
        </section>

        <section className="bg-white py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="reveal text-left">
                <p className="font-body text-[0.7rem] uppercase tracking-[0.22em] text-brand-blue">
                  Step 1 of 2 · Your details
                </p>
                <p className="mt-4 text-base leading-8 text-brand-muted lg:text-[1.2rem]">
                  The Inner Circle is a private community built for consistent
                  growth — mentorship, live teachings, and accountability with
                  people serious about becoming who they&apos;re called to be.
                  Choose your plan, share a few details, then continue to the
                  payment step.
                </p>
              </div>

              <div className="mt-12">
                <AssessmentForm
                  programTitle="The Inner Circle"
                  storageKey="enroll:inner-circle"
                  payHref="/inner-circle/pay"
                  plans={plans}
                  defaultPlanId={defaultPlanId}
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
