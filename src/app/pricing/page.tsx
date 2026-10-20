import type { Metadata } from "next";
import { pricingNote } from "@/data/pricing";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { PricingExplorer } from "@/components/pricing/pricing-explorer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "GENMEDIA pricing for websites, e-commerce, business systems, AI solutions, mobile apps and ongoing support. Request a tailored quote.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="The right solution starts with the right scope."
        description="Choose a service category to see the packages we offer. Every package is priced after a short conversation, so the quote matches your requirements."
      />

      <section aria-label="Pricing packages" className="py-16 sm:py-20">
        <Container>
          <div className="rounded-[var(--radius-card)] border border-violet/40 bg-violet/5 p-6 text-sm leading-relaxed sm:p-8">
            <p className="font-semibold">About these quotes</p>
            <p className="mt-2 text-muted">{pricingNote}</p>
          </div>

          <div className="mt-12">
            <PricingExplorer />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Not sure which package fits?"
        description="Send us a short description of your business and what you need. We will recommend a scope and a quote."
      />
    </>
  );
}
