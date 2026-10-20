import type { ReactNode } from "react";
import { Container } from "./container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

// Shared intro for inner pages. The h1 sits here so every page has one clear top-level heading.
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pb-20 pt-20 sm:pb-28 sm:pt-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_10%_0%,rgba(32,217,244,0.14),transparent),radial-gradient(45%_50%_at_90%_10%,rgba(136,114,255,0.16),transparent)]"
      />
      <Container>
        <p className="rise text-xs font-semibold uppercase tracking-[0.22em] text-cyan sm:text-sm">{eyebrow}</p>
        <h1 className="rise mt-5 max-w-4xl text-[length:var(--text-headline)] font-semibold leading-[1.05] tracking-tight text-balance [--delay:80ms]">
          {title}
        </h1>
        {description ? (
          <p className="rise mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted [--delay:160ms]">{description}</p>
        ) : null}
        {children ? <div className="rise mt-10 [--delay:240ms]">{children}</div> : null}
      </Container>
    </section>
  );
}
