import type { Metadata } from "next";
import { principles, processSteps } from "@/data/home";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "GENMEDIA is a digital solutions and software development agency helping businesses across Sri Lanka turn ideas into practical digital solutions.",
  alternates: { canonical: "/about" },
};

const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.22em] text-cyan";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About GENMEDIA"
        title="We build technology around possibility."
        description="GENMEDIA is a digital solutions and software development agency focused on helping businesses turn ideas into practical, user-focused digital experiences."
      />

      <section aria-labelledby="who-heading" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={eyebrowClass}>Who we are</p>
            <h2 id="who-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
              Thoughtful design and modern engineering
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7 lg:col-start-6">
            <p>
              We combine thoughtful design, modern engineering and emerging technologies to create solutions that simplify
              work and support sustainable growth. Whether the need is a website, a business system or an AI-assisted
              workflow, we begin with the people who will use it.
            </p>
            <p>
              Our work is shaped by the sectors and businesses we serve across Sri Lanka, from startups and small
              businesses to established organisations with specific operational needs.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-heading" className="border-t border-line bg-bg-2 py-20 sm:py-28">
        <Container>
          <p className={eyebrowClass}>Our principles</p>
          <h2 id="principles-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
            How we approach every project
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((principle, index) => (
              <li key={principle.title} className="rounded-[var(--radius-card)] border border-line bg-bg p-8">
                <p className="font-mono text-xs text-cyan">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-semibold">{principle.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{principle.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="border-t border-line py-20 sm:py-28">
        <Container>
          <p className={eyebrowClass}>How we work</p>
          <h2 id="process-heading" className="mt-4 text-[length:var(--text-title)] font-semibold tracking-tight">
            Four stages, agreed scope at each step
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.title} className="rounded-[var(--radius-card)] border border-line p-6">
                <p className="font-mono text-xs text-cyan">{step.number}</p>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand title="Ready to explore what we can build together?" description="Start with a conversation. We will help you define the next step." />
    </>
  );
}
