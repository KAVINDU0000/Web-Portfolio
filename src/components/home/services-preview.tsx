import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "@/components/services/service-card";

const accentCycle = ["cyan", "violet", "pink"] as const;

export function ServicesPreview() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-16 py-24 sm:py-32">
      <Container>
        <div className="reveal-up flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-2/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Our services
            </p>
            <h2 id="services-heading" className="mt-6 text-[length:var(--text-headline)] font-semibold leading-[1.06] tracking-tight text-balance">
              Technology Built Around Your Business.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-6 lg:max-w-sm lg:items-end">
            <p className="leading-relaxed text-muted lg:text-right">
              From your first digital presence to complex business systems, we create solutions designed around your goals,
              your workflows and your customers.
            </p>
            <ButtonLink href="/services" variant="secondary">
              Explore All Services <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.slug} className={`reveal-up flex ${index % 3 === 1 ? "reveal-up-s1" : index % 3 === 2 ? "reveal-up-s2" : ""}`}>
              <ServiceCard service={service} accent={accentCycle[index % accentCycle.length]} />
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted">
          Prefer to see everything at once?{" "}
          <Link href="/services" className="text-text underline underline-offset-4 hover:text-cyan">
            Browse all services
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
