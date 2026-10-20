type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  headingLevel?: 1 | 2;
};

// Pill label above a large heading. Used by every homepage section.
export function SectionHeading({ eyebrow, title, description, align = "left", headingLevel = 2 }: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-2/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan" />
        {eyebrow}
      </p>
      <Heading className="mt-6 text-[length:var(--text-headline)] font-semibold leading-[1.06] tracking-tight text-balance">
        {title}
      </Heading>
      {description ? <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-muted">{description}</p> : null}
    </div>
  );
}
