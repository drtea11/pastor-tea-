import { Container } from "./Container";

const stats = [
  { value: "500+", label: "Leaders Transformed" },
  { value: "7+",   label: "Programs Available"  },
  { value: "3",    label: "Published Books"      },
  { value: "10+",  label: "Years of Impact"      },
];

export function StatsStrip() {
  return (
    <section className="bg-white border-b border-black/8">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-black/8 lg:grid-cols-4 lg:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="reveal flex flex-col items-center justify-center px-6 py-10 text-center"
            >
              <span className="font-heading text-[3rem] font-bold leading-none text-brand-ink lg:text-[3.5rem]">
                {stat.value}
              </span>
              <span className="mt-2 font-body text-[0.85rem] uppercase tracking-[0.12em] text-brand-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
