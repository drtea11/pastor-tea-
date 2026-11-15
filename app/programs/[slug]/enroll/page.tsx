import { notFound } from "next/navigation";

import { AssessmentForm } from "@/components/AssessmentForm";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getProgramBySlug, programPages } from "@/lib/programs";

// Enrollment pages only exist for single-price (bank transfer) programs.
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
    title: `Enroll in ${program.title} | Dr. TEA`,
    description: `Start your enrollment for ${program.title}.`,
  };
}

type EnrollPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EnrollPage({ params }: EnrollPageProps) {
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
                Step 1 of 2 · Your details
              </p>
              <h1 className="hero-title mt-4 font-heading font-bold uppercase leading-[0.9] text-white">
                Tell Us About You
              </h1>
              <p className="mx-auto mt-6 max-w-md font-body text-sm leading-7 text-white/60 sm:text-base">
                You&apos;re enrolling in{" "}
                <span className="font-semibold text-white">{program.title}</span>. Share a few
                details, then continue to the payment step.
              </p>
            </div>
          </div>
        </section>

        {/* ── Assessment form ── */}
        <section className="bg-brand-soft py-16 lg:py-24">
          <Container>
            <AssessmentForm
              programTitle={program.title}
              storageKey={`enroll:${slug}`}
              payHref={`/programs/${slug}/pay`}
            />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
