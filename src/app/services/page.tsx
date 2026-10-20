import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/services/service-card";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, business management systems, e-commerce, AI solutions, booking platforms and industry software built by GENMEDIA.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Technology built around your business."
        description="From your first digital presence to complex business systems, every solution starts with your goals, your workflows and your customers."
      />

      <section aria-label="All services" className="py-24 sm:py-32">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Not sure which service fits? Describe the problem."
        description="We will help you work out the right approach before anything is built."
      />
    </>
  );
}
