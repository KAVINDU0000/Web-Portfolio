import { ButtonLink } from "./button-link";
import { Container } from "./container";

type CtaBandProps = {
  title: string;
  description?: string;
};

// Reusable enquiry call to action used at the end of inner pages.
export function CtaBand({ title, description }: CtaBandProps) {
  return (
    <section aria-labelledby="page-cta-heading" className="border-t border-line bg-bg-2 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="page-cta-heading" className="text-[length:var(--text-headline)] font-semibold leading-[1.1] tracking-tight text-balance">
              {title}
            </h2>
            {description ? <p className="mt-4 leading-relaxed text-muted">{description}</p> : null}
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contact">Let&apos;s Discuss Your Project ↗</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
