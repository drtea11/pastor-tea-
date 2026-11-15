import Image from "next/image";
import { Button } from "./Button";

const focusAreas = [
  {
    label: "Purpose",
    description: "clarity for identity, calling, and direction"
  },
  {
    label: "Impact",
    description: "growth through speaking, coaching, and training"
  }
];

export function AboutSection() {
  return (
    <section id="about-dr-tea" className="tea-about-section bg-black py-12 text-white lg:py-16">
      <div className="tea-about-shell reveal">
        <div className="tea-about-connector" aria-hidden="true" />

        <div className="tea-about-heading">
          <span className="tea-about-kicker">About Dr. TEA</span>
          <h2 className="font-heading font-extrabold capitalize">
            Hi, I Am Dr. Temitope Ebenezer Arowele
          </h2>
        </div>

        <div className="tea-about-brand-card">
          <span className="tea-about-brand-subtitle">Purpose. Clarity. Impact.</span>
          <strong className="tea-about-brand-title">DR. TEA</strong>
        </div>

        <div className="tea-about-mobile-seam" aria-hidden="true" />

        <div className="tea-about-photo-card about-image-reveal">
          <Image
            src="/images/pastor-tea-real-cleaned.png"
            alt="Dr. Temitope Ebenezer Arowele speaking on stage"
            fill
            priority={false}
            sizes="(max-width: 899px) 95vw, 62vw"
            className="tea-about-desktop-photo object-cover object-top"
          />
          <Image
            src="/images/pastor-tea-real-cleaned.png"
            alt="Dr. Temitope Ebenezer Arowele"
            fill
            priority={false}
            sizes="95vw"
            className="tea-about-mobile-photo object-cover object-top"
          />
          <div className="tea-about-photo-overlay" aria-hidden="true" />
        </div>

        <div className="tea-about-copy-card">
          <div className="tea-about-stats" aria-label="Dr. TEA focus areas">
            {focusAreas.map((area) => (
              <div key={area.label} className="tea-about-stat">
                <h3 className="font-heading font-extrabold">{area.label}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>

          <div className="tea-about-copy">
            <p>
              Through speaking, coaching, mentoring, and structured training, Dr. TEA
              helps individuals gain clarity, build capacity, and live with purpose
              and impact. Whether you&apos;re seeking to inspire an audience, grow as
              a leader, or take meaningful action in your life, his programs provide
              the guidance and structure to make it happen.
            </p>
          </div>

          <Button href="/speaking" variant="light">
            Book Me to Speak
          </Button>
        </div>
      </div>
    </section>
  );
}
