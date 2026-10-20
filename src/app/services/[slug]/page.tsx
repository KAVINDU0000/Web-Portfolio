import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { getProject } from "@/data/projects";
import { getService, services } from "@/data/services";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { ProjectCard } from "@/components/projects/project-card";

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

const sectionClass = "border-t border-line py-20 sm:py-28";
const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.22em] text-cyan";

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const relatedProjects = service.relatedProjects.map(getProject).filter((project) => project !== undefined);

  return (
    <>
      <PageHero eyebrow={`Service ${service.number}`} title={service.title} description={service.summary}>
        <div className="flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/contact">
            Let&apos;s Discuss Your Project <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            All services
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="challenges-heading" className={sectionClass}>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={eyebrowClass}>The challenge</p>
            <h2 id="challenges-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
              Business challenges we address
            </h2>
          </div>
          <ul className="space-y-4 lg:col-span-7 lg:col-start-6">
            {service.challenges.map((challenge) => (
              <li key={challenge} className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-bg-2 p-6 leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                {challenge}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="capabilities-heading" className={`${sectionClass} bg-bg-2`}>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={eyebrowClass}>What we can build</p>
            <h2 id="capabilities-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
              Solutions within this service
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Scope is agreed for each project. Listed items describe what we can build, not products already in use.
            </p>
          </div>
          <Card className="flex items-start gap-6 p-8 lg:col-span-7 lg:col-start-6">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-line-strong text-cyan sm:flex">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <ul className="grid flex-1 gap-3 sm:grid-cols-1">
              {service.capabilities.map((item) => (
                <li key={item} className="flex gap-3 text-text">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </section>

      <section aria-labelledby="features-heading" className={sectionClass}>
        <Container>
          <p className={eyebrowClass}>Key features</p>
          <h2 id="features-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
            Built into every project
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
            {service.features.map((feature) => (
              <li key={feature} className="flex gap-4 bg-bg p-7 leading-relaxed">
                <span aria-hidden="true" className="font-mono text-sm text-violet">
                  /
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className={`${sectionClass} bg-bg-2`}>
        <Container>
          <p className={eyebrowClass}>Our implementation process</p>
          <h2 id="process-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
            How this service is delivered
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {service.process.map((step, index) => (
              <li key={step.title} className="rounded-[var(--radius-card)] border border-line bg-bg p-6">
                <p className="font-mono text-xs text-cyan">0{index + 1}</p>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {relatedProjects.length > 0 ? (
        <section aria-labelledby="related-heading" className={sectionClass}>
          <Container>
            <p className={eyebrowClass}>Related work</p>
            <h2 id="related-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
              Projects that use this approach
            </h2>
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

      <section aria-labelledby="faq-heading" className={`${sectionClass} bg-bg-2`}>
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={eyebrowClass}>FAQ</p>
            <h2 id="faq-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-sm text-muted">
              Have another question?{" "}
              <Link href="/contact" className="text-text underline-offset-4 hover:text-cyan hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold">
                  {faq.question}
                  <span aria-hidden="true" className="text-xl text-cyan transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={`Planning a ${service.title.toLowerCase()} project?`}
        description="Share your goals and we will suggest a practical starting point."
      />
    </>
  );
}
