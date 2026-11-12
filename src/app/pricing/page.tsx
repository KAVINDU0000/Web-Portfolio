import type { Metadata } from "next";
import { Info, Sparkles } from "lucide-react";
import { pricingNote } from "@/data/pricing";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { PricingExplorer } from "@/components/pricing/pricing-explorer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "GENMEDIA pricing for websites, e-commerce, business systems, AI solutions, mobile apps and ongoing support. Request a tailored quote.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    // One navy background for the whole page, matching the About page. It replaces the site's purple backdrop here.
    <div className="relative isolate overflow-hidden bg-[#02031a]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,240,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,240,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_25%,transparent_75%,black)]" />
        <div className="absolute -left-40 top-[6%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.14),transparent)]" />
        <div className="absolute -right-40 top-[40%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.18),transparent)]" />
        <div className="absolute -left-40 bottom-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,120,240,0.14),transparent)]" />
      </div>

      {/* Hero */}
      <section className="pb-14 pt-32 sm:pb-20 sm:pt-40">
        <Container>
          <p className="inline-flex items-center gap-3 rounded-full border border-cyan/20 bg-cyan/[0.06] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cyan/90">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            Pricing
          </p>

          <h1 className="mt-7 max-w-4xl text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            The right solution starts with the{" "}
            <span className="bg-[linear-gradient(90deg,#00C8F0,#0078F0_50%,#5028F0)] bg-clip-text text-transparent">right scope.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-white/60">
            Choose a service category to see the packages we offer. Every package is priced after a short conversation, so the quote
            matches your requirements.
          </p>
        </Container>
      </section>

      {/* Packages */}
      <section aria-label="Pricing packages" className="pb-20 sm:pb-28">
        <Container>
          <div className="flex gap-4 rounded-2xl border border-violet-500/25 bg-violet-500/[0.06] p-6 text-sm leading-relaxed sm:p-7">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <Info aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-white">About these quotes</p>
              <p className="mt-2 text-white/60">{pricingNote}</p>
            </div>
          </div>

          <div className="mt-12">
            <PricingExplorer />
          </div>
        </Container>
      </section>

      {/* Closing call to action */}
      <section aria-labelledby="pricing-cta-heading" className="pb-24 sm:pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 sm:p-12">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600" />
            <div aria-hidden="true" className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.15),transparent)]" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 id="pricing-cta-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Not sure which package fits?
                </h2>
                <p className="mt-3 leading-relaxed text-white/60">
                  Send us a short description of your business and what you need. We will recommend a scope and a quote.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
                <ButtonLink href="/contact">Let&apos;s Discuss Your Project ↗</ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Explore Our Services
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
