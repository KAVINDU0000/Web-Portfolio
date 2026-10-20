import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

// Shared layout for the policy and terms drafts. The draft notice stays visible until the text is reviewed.
export function LegalDocument({ eyebrow, title, description, sections }: LegalDocumentProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p role="note" className="rounded-[var(--radius-card)] border border-violet/50 bg-violet/5 p-5 text-sm leading-relaxed text-muted">
              <span className="font-semibold text-text">Draft.</span> This text is pending review and will be finalised before the website is published.
            </p>
          </div>

          <div className="space-y-12 lg:col-span-8 lg:col-start-5">
            {sections.map((section) => (
              <section key={section.title} aria-labelledby={`legal-${section.title.replace(/\W+/g, "-").toLowerCase()}`}>
                <h2
                  id={`legal-${section.title.replace(/\W+/g, "-").toLowerCase()}`}
                  className="text-xl font-semibold tracking-tight"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
