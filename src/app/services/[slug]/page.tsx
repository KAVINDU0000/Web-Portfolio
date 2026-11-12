import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Plus } from "lucide-react";
import { getProject } from "@/data/projects";
import { getService, services } from "@/data/services";
import { ProcessRail } from "@/components/about/about-sections";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal, Stagger } from "@/components/motion/scroll-motion";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found", robots: { index: false, follow: false } };

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

const eyebrow = "text-xs font-semibold uppercase tracking-[0.22em] text-cyan";
const heading = "mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl";
const glassCard = "group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition duration-500 hover:border-cyan/30 sm:p-8";
const topEdge = "absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600 opacity-50 transition duration-500 group-hover:opacity-100";

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const relatedProjects = service.relatedProjects.map(getProject).filter((project) => project !== undefined);
  const processSteps = service.process.map((step, index) => ({ number: `0${index + 1}`, ...step }));

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
      <section className="pb-20 pt-32 sm:pb-28 sm:pt-40">
        <Container className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-cyan">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All services
            </Link>

            <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-cyan/20 bg-cyan/[0.06] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cyan/90">
              Service {service.number}
            </p>

            <h1 className="mt-6 text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
              {service.title}
            </h1>

            <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-white/60">{service.summary}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact">
                Let&apos;s Discuss Your Project <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                All services
              </ButtonLink>
            </div>
          </div>

          {/* Service icon in a glass medallion with a soft glow. */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
              <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.25),rgba(80,40,240,0.12)_55%,transparent)] blur-2xl" />
              <div aria-hidden="true" className="absolute inset-6 rounded-full border border-dashed border-cyan/30" />
              <div className="relative flex h-40 w-40 items-center justify-center rounded-[2rem] border border-white/10 bg-[#070920]/80 text-cyan shadow-[0_40px_90px_-30px_rgba(0,200,240,0.5)] backdrop-blur-xl">
                <Icon aria-hidden="true" className="h-16 w-16" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Challenges */}
      <section aria-labelledby="challenges-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className={eyebrow}>The challenge</p>
            <h2 id="challenges-heading" className={heading}>
              Business challenges we address
            </h2>
          </Reveal>
          <Stagger className="lg:col-span-8">
            <ul className="grid gap-4">
              {service.challenges.map((challenge, index) => (
                <li key={challenge} className={`${glassCard} flex gap-5 leading-relaxed text-white/75`}>
                  <span aria-hidden="true" className={topEdge} />
                  <span className="font-mono text-sm text-cyan">0{index + 1}</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </Stagger>
        </Container>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="capabilities-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className={eyebrow}>What we can build</p>
            <h2 id="capabilities-heading" className={heading}>
              Solutions within this service
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Scope is agreed for each project. Listed items describe what we can build, not products already in use.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10 lg:col-span-7">
            <span aria-hidden="true" className={topEdge} />
            <ul className="space-y-5">
              {service.capabilities.map((item) => (
                <li key={item} className="flex items-center gap-4 text-white/85">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan ring-1 ring-inset ring-cyan/20">
                    <Check aria-hidden="true" className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading" className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <p className={eyebrow}>Key features</p>
            <h2 id="features-heading" className={heading}>
              Built into every project
            </h2>
          </Reveal>
          <Stagger>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2">
              {service.features.map((feature, index) => (
                <li key={feature} className={`${glassCard} flex gap-5 leading-relaxed text-white/85`}>
                  <span aria-hidden="true" className={topEdge} />
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan/20 via-indigo-500/15 to-violet-600/20 font-mono text-sm text-cyan ring-1 ring-inset ring-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </Stagger>
        </Container>
      </section>

      {/* Delivery process */}
      <section aria-labelledby="process-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className={eyebrow}>Our implementation process</p>
              <h2 id="process-heading" className={heading}>
                How this service is delivered
              </h2>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ProcessRail steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* Related work */}
      {relatedProjects.length > 0 ? (
        <section aria-labelledby="related-heading" className="pb-24 sm:pb-32">
          <Container>
            <Reveal>
              <p className={eyebrow}>Related work</p>
              <h2 id="related-heading" className={heading}>
                Projects that use this approach
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {relatedProjects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className={eyebrow}>FAQ</p>
            <h2 id="faq-heading" className={heading}>
              Frequently asked questions
            </h2>
            <p className="mt-5 text-sm text-white/65">
              Have another question?{" "}
              <Link href="/contact" className="text-white underline-offset-4 transition hover:text-cyan hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl open:border-cyan/30">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 p-6 text-left font-semibold text-white">
                  {faq.question}
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-cyan transition group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-white/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing call to action */}
      <section aria-labelledby="service-cta-heading" className="pb-24 sm:pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12">
            <span aria-hidden="true" className={topEdge} />
            <div aria-hidden="true" className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.15),transparent)]" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 id="service-cta-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Planning a {service.title.toLowerCase()} project?
                </h2>
                <p className="mt-3 leading-relaxed text-white/60">Share your goals and we will suggest a practical starting point.</p>
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
