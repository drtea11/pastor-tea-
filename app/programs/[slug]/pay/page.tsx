import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PaymentConfirm } from "@/components/PaymentConfirm";
import { paymentDetails } from "@/lib/payment";
import { getProgramBySlug, programPages } from "@/lib/programs";

// Payment pages only exist for single-price (bank transfer) programs.
export function generateStaticParams() {
  return programPages
    .filter((program) => program.pricing?.single)
    .map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program?.pricing?.single) return {};
  return {
    title: `Complete Payment · ${program.title} | Dr. TEA`,
    description: `Complete your payment for ${program.title} via bank transfer.`,
  };
}

type PayPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PayPage({ params }: PayPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  const plan = program?.pricing?.single;
  if (!program || !plan) notFound();

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <main>
        {/* ── Hero ── */}
        <section className="flex min-h-[58svh] flex-col bg-brand-ink text-white">
          <Header transparent />
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-10">
            <div className="max-w-2xl">
              <p className="font-body text-[0.7rem] uppercase tracking-[0.22em] text-brand-green">
                Step 2 of 2 · Payment
              </p>
              <h1 className="hero-title mt-4 font-heading font-bold uppercase leading-[0.9] text-white">
                Complete Your Payment
              </h1>
              <p className="mx-auto mt-6 max-w-md font-body text-sm leading-7 text-white/60 sm:text-base">
                Pay for{" "}
                <span className="font-semibold text-white">{program.title}</span> by bank
                transfer, then confirm your payment on WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* ── Payment ── */}
        <section className="bg-brand-soft py-16 lg:py-24">
          <Container>
            <PaymentConfirm
              programTitle={program.title}
              storageKey={`enroll:${slug}`}
              assessmentHref={`/programs/${slug}/enroll`}
              amount={plan.price}
              bankName={paymentDetails.bankName}
              accountName={paymentDetails.accountName}
              accountNumber={paymentDetails.accountNumber}
            />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
