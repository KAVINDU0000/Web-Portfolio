import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { processSteps } from "@/data/home";
import { services } from "@/data/services";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger } from "@/components/motion/scroll-motion";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, business management systems, e-commerce, AI solutions, booking platforms and industry software built by GENMEDIA.",
  alternates: { canonical: "/services" },
};

// Accent colours cycle across the cards so the grid has rhythm, using only the logo colours.
const accents = [
  { text: "text-cyan", tile: "from-cyan/25 via-indigo-500/15 to-cyan/10 ring-cyan/30", dot: "bg-cyan" },
  { text: "text-indigo-300", tile: "from-indigo-500/25 via-violet-600/15 to-indigo-500/10 ring-indigo-400/30", dot: "bg-indigo-400" },
  { text: "text-violet-300", tile: "from-violet-600/25 via-cyan/10 to-violet-600/10 ring-violet-400/30", dot: "bg-violet-400" },
];

export default function ServicesPage() {
  return (
    // One navy background for the whole page, matching the other inner pages.
    <div className="relative isolate overflow-hidden bg-[#02031a]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,240,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,240,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_25%,transparent_75%,black)]" />
        <div className="absolute -left-40 top-[6%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.14),transparent)]" />
        <div className="absolute -right-40 top-[40%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.18),transparent)]" />
        <div className="absolute -left-40 bottom-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,120,240,0.14),transparent)]" />
      </div>

      {/* Hero */}
      <section className="pb-16 pt-32 sm:pb-24 sm:pt-40">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="inline-flex items-center gap-3 rounded-full border border-cyan/20 bg-cyan/[0.06] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cyan/90">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              Services
            </p>
            <h1 className="mt-7 text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
              Technology built around{" "}
              <span className="bg-[linear-gradient(90deg,#00C8F0,#0078F0_50%,#5028F0)] bg-clip-text text-transparent">your business.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-white/60">
              From your first digital presence to complex business systems, every solution starts with your goals, your workflows and your
              customers.
            </p>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600" />
              <p className="font-mono text-5xl font-semibold text-white">{String(services.length).padStart(2, "0")}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">service areas, from websites to AI and industry software.</p>
              <Link href="#all-services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-cyan">
                Browse the services <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Service cards */}
      <section id="all-services" aria-label="All services" className="scroll-mt-28 pb-24 sm:pb-32">
        <Container>
          <Stagger targets="li">
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                const accent = accents[index % accents.length];
                return (
                  <li key={service.slug} className="flex">
                    <SpotlightCard className="flex w-full">
                      <article className="group relative flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:border-white/20 sm:p-8">
                        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600 opacity-40 transition duration-500 group-hover:opacity-100" />

                        <div className="flex items-center justify-between">
                          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ring-1 ring-inset ${accent.tile} ${accent.text}`}>
                            <Icon aria-hidden="true" className="h-6 w-6" />
                          </span>
                          <span className="font-mono text-xs tracking-widest text-white/60">{service.number}</span>
                        </div>

                        <h2 className="mt-7 text-xl font-semibold tracking-tight text-white">{service.title}</h2>
                        <p className="mt-3 flex-1 leading-relaxed text-white/60">{service.cardText}</p>

                        <ul className="mt-6 space-y-2.5 text-sm text-white/70">
                          {service.capabilities.slice(0, 3).map((capability) => (
                            <li key={capability} className="flex items-start gap-3">
                              <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
                              {capability}
                            </li>
                          ))}
                        </ul>

                        <p className="mt-8">
                          <Link
                            href={`/services/${service.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white after:absolute after:inset-0 hover:text-cyan"
                          >
                            Explore service <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </Link>
                        </p>
                      </article>
                    </SpotlightCard>
                  </li>
                );
              })}
            </ul>
          </Stagger>
        </Container>
      </section>

      {/* How every service is delivered */}
      <section aria-labelledby="delivery-heading" className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">How we deliver</p>
            <h2 id="delivery-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Four stages, whichever service you choose.
            </h2>
          </Reveal>
          <Stagger>
            <ol className="mt-12 grid gap-5 md:grid-cols-4">
              {processSteps.map((step) => (
                <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="font-mono text-xs text-cyan">{step.number}</p>
                  <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{step.text}</p>
                </li>
              ))}
            </ol>
          </Stagger>
        </Container>
      </section>

      {/* Closing call to action */}
      <section aria-labelledby="services-cta-heading" className="pb-24 sm:pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 sm:p-12">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600" />
            <div aria-hidden="true" className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.15),transparent)]" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 id="services-cta-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Not sure which service fits? Describe the problem.
                </h2>
                <p className="mt-3 leading-relaxed text-white/60">
                  We will help you work out the right approach before anything is built.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
                <ButtonLink href="/contact">Let&apos;s Discuss Your Project ↗</ButtonLink>
                <ButtonLink href="/pricing" variant="secondary">
                  View Pricing
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
