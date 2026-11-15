import Image from "next/image";
import { Button } from "./Button";
import { Container } from "./Container";

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-black py-20 text-white">
      <Image
        src="/images/pastor tea footer image .png"
        alt=""
        fill
        sizes="100vw"
        className="parallax-media object-cover object-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/72" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,148,215,0.35),rgba(0,0,0,0.65)_42%,rgba(0,0,0,0.82)),radial-gradient(circle_at_70%_40%,rgba(165,205,57,0.22),transparent_34%)]" />
      <Container className="relative z-10">
        <div className="reveal mx-auto grid max-w-4xl justify-items-center text-center">
          <span className="mb-5 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-white/68">
            Start Your Journey Today
          </span>
          <h2 className="font-heading text-[1.5rem] font-extrabold capitalize leading-tight tracking-tight lg:text-[3rem]">
            You Do Not Have To Remain Confused, Stuck, Or Underutilised.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/70">
            The next version of your life requires guidance, structure, and action.
            Your purpose can become clearer, your growth intentional, and your
            leadership stronger.
          </p>
          <Button href="/book-a-call" className="mt-8">
            Schedule a Free Consultation
          </Button>
        </div>
      </Container>
    </section>
  );
}
