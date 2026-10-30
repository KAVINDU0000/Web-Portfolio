import { Nebula } from "@/components/layout/nebula";
import { ArrowUpRight } from "lucide-react";
import { pricingCategories } from "@/data/pricing";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function PricingPreview() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative isolate scroll-mt-16 py-24 sm:py-32">
      <Nebula tone="violet" className="-left-48 top-0 h-[32rem] w-[32rem]" />
      <Nebula tone="cyan" className="-right-44 bottom-0 h-[26rem] w-[26rem]" />
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Invest in your next step"
            title="The Right Solution Starts With the Right Scope."
            description="Every business is different. Our pricing helps you understand possible starting points, with the final proposal tailored to your requirements."
          />
          <ButtonLink href="/pricing" variant="secondary" className="shrink-0">
            Explore Pricing <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingCategories.map((category) => (
            <li key={category.slug} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-bg-2 p-6 transition duration-500 hover:border-line-strong">
              <h3 className="text-base font-semibold">{category.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{category.description}</p>
              <p className="mt-6 text-sm font-semibold text-cyan">Request a Quote</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
