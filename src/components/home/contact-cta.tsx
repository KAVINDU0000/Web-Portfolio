import { Nebula } from "@/components/layout/nebula";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

// Closing call to action: a slowly moving gradient ring around a solid panel, so the text stays readable.
export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="cta-heading" className="relative isolate scroll-mt-16 pb-24 sm:pb-32">
      <Nebula tone="violet" className="left-1/2 -bottom-40 h-[30rem] w-[30rem] -translate-x-1/2" />
      <Container>
        <div className="reveal-up sheen rounded-[calc(var(--radius-card)*1.6)] bg-[linear-gradient(120deg,#20D9F4,#8872FF,#E65DCA,#20D9F4)] p-px">
          <div className="relative isolate grid gap-8 overflow-hidden rounded-[calc(var(--radius-card)*1.6-1px)] bg-bg px-6 py-12 sm:px-12 sm:py-14 md:grid-cols-[1fr_auto] md:items-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(45%_80%_at_0%_50%,rgba(32,217,244,0.16),transparent),radial-gradient(45%_80%_at_100%_50%,rgba(136,114,255,0.2),transparent)]"
            />
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-2/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                Let&apos;s work together
              </p>
              <h2 id="cta-heading" className="mt-5 text-[length:var(--text-headline)] font-semibold leading-[1.08] tracking-tight text-balance">
                Have an Idea <span className="text-accent">Worth Building?</span>
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                Tell us what you are planning, what challenge you are facing, or where your business wants to go next.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row md:flex-col">
              <ButtonLink href="/contact">Let&apos;s Discuss Your Project ↗</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore Our Services
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
