import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { principles, processSteps } from "@/data/home";
import { AboutHero } from "@/components/about/about-hero";
import { PrincipleRows, ProcessRail, StoryReveal } from "@/components/about/about-sections";
import { Container } from "@/components/ui/container";
import { RibbonArt } from "@/components/ui/ribbon-art";
import { Reveal } from "@/components/motion/scroll-motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "GENMEDIA is a digital solutions and software development agency helping businesses across Sri Lanka turn ideas into practical digital solutions.",
  alternates: { canonical: "/about" },
};

const heroDescription =
  "GENMEDIA is a digital solutions and software development agency focused on helping businesses turn ideas into practical, user-focused digital experiences.";

const storyParagraphs = [
  "We combine thoughtful design, modern engineering and emerging technologies to create solutions that simplify work and support sustainable growth. Whether the need is a website, a business system or an AI-assisted workflow, we begin with the people who will use it.",
  "Our work is shaped by the sectors and businesses we serve across Sri Lanka, from startups and small businesses to established organisations with specific operational needs.",
];

const sectionLabel = "text-xs font-semibold uppercase tracking-[0.22em] text-cyan";

export default function AboutPage() {
  return (
    // One navy background for the whole page, with the same light and grid throughout. It replaces the site's purple backdrop here.
    <div className="relative isolate overflow-hidden bg-[#02031a]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,240,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,240,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_25%,transparent_75%,black)]" />
        <div className="absolute -left-40 top-[8%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.14),transparent)]" />
        <div className="absolute -right-40 top-[42%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.18),transparent)]" />
        <div className="absolute -left-40 bottom-[6%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,120,240,0.14),transparent)]" />
      </div>

      <AboutHero description={heroDescription} />

      {/* Story: a sticky heading on the left, and the text lights up word by word on the right as you scroll. */}
      <section aria-labelledby="who-heading" className="relative isolate overflow-hidden py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className={sectionLabel}>Who we are</p>
              <h2 id="who-heading" className="mt-5 text-[length:var(--text-headline)] font-semibold leading-[1.04] tracking-tight text-balance text-white">
                Thoughtful design and modern engineering.
              </h2>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <StoryReveal paragraphs={storyParagraphs} />
          </div>
        </Container>
      </section>

      {/* Principles: full-width rows with outlined numerals that slide in as you scroll. */}
      <section aria-labelledby="principles-heading" className="relative isolate overflow-hidden pb-24 sm:pb-32">
        <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-px w-[80%] -translate-x-1/2 bg-linear-to-r from-transparent via-cyan/40 to-transparent" />
        <Container>
          <Reveal>
            <p className={sectionLabel}>Our principles</p>
            <h2 id="principles-heading" className="mt-5 max-w-3xl text-[length:var(--text-headline)] font-semibold leading-[1.04] tracking-tight text-balance text-white">
              How we approach every project.
            </h2>
          </Reveal>
          <div className="mt-14">
            <PrincipleRows items={principles} />
          </div>
        </Container>
      </section>

      {/* Process: a vertical rail that fills as you scroll. */}
      <section aria-labelledby="process-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className={sectionLabel}>How we work</p>
              <h2 id="process-heading" className="mt-5 text-[length:var(--text-headline)] font-semibold leading-[1.04] tracking-tight text-balance text-white">
                Four stages, agreed scope at each step.
              </h2>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ProcessRail steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* Closing call to action, with a faint ribbon artwork in the corner. */}
      <section aria-labelledby="about-cta-heading" className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600" />
              <RibbonArt id="about-cta" className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 opacity-30" />
              <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 id="about-cta-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Ready to explore what we can build together?
                  </h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-white/60">Start with a conversation. We will help you define the next step.</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-cyan px-7 text-sm font-semibold text-[#02031a] transition hover:shadow-[0_0_30px_-6px_rgba(0,200,240,0.7)]"
                >
                  Let&apos;s Discuss Your Project
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
