type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  light?: boolean;
  showEyebrowLine?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
  light = false,
  showEyebrowLine = true
}: SectionHeadingProps) {
  return (
    <div
      className={`reveal mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "mx-0 text-left"
      }`}
    >
      {eyebrow ? (
        <span
          className={`mb-4 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] ${
            light ? "text-white/68" : "text-brand-blue"
          }`}
        >
          {showEyebrowLine ? <span className="h-px w-7 bg-current" /> : null}
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`font-heading text-[1.5rem] font-extrabold capitalize leading-tight tracking-tight lg:text-[3rem] ${
          light ? "text-white" : "text-brand-ink"
        }`}
      >
        {title}
      </h2>
      {copy ? (
        <p className={`mt-5 text-base ${light ? "text-white/70" : "text-brand-muted"}`}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}
