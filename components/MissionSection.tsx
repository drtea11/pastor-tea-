import { Button } from "./Button";
import { Container } from "./Container";

export function MissionSection() {
  return (
    <section id="mission" className="scroll-mt-24 bg-white py-20 text-black lg:py-28">
      <Container>
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="font-body text-sm italic text-brand-blue">Our Mission</p>
          <h2 className="mt-3 font-heading font-medium capitalize leading-tight text-black">
            Faith-Based Coaching For Purposeful Growth
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-brand-muted lg:text-[1.05rem] lg:leading-8">
            Discover purpose, gain direction, and grow through Spirit-led coaching
            built for clarity, discipline, and impact.
          </p>

          <div className="mt-10 flex justify-center">
            <Button href="/book-a-call" variant="secondary">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
