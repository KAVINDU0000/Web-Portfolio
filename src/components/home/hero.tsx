import Image from "next/image";
import { ArrowUpRight, Mouse } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { DeviceMockup } from "@/components/ui/device-mockup";
import { Screensaver } from "@/components/ui/screensaver";
import { HeroForms } from "./hero-forms";

export function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden">
      {/* Colour field: slow blobs and a faint grid. Purely decorative. */}
      <div aria-hidden="true" className="hero-parallax absolute inset-0 -z-10 overflow-hidden">
        <div className="mesh-blob -left-40 top-0 h-[36rem] w-[36rem] bg-cyan/30" />
        <div className="mesh-blob -right-32 top-16 h-[42rem] w-[42rem] bg-violet/40 [animation-delay:-8s]" />
        <div className="mesh-blob bottom-0 left-1/3 h-[24rem] w-[24rem] bg-pink/25 [animation-delay:-14s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      </div>

      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-16 py-14 sm:min-h-[calc(100svh-5rem)] sm:py-20 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16 lg:py-24">
        <div className="relative lg:col-span-7">
          <HeroForms />

          <p className="rise text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:text-sm">
            GENMEDIA · Digital Solutions &amp; Software Development
          </p>

          <h1 className="rise hero-title mt-6 font-semibold leading-[0.98] tracking-tight [--delay:90ms]">
            Your Business Has Potential.{" "}
            <span className="text-accent lg:whitespace-nowrap">Let&apos;s Unlock It.</span>
          </h1>

          <p className="rise mt-7 text-lg font-medium sm:text-xl [--delay:170ms]">
            Intelligent Software. Seamless Experiences. Smarter Growth.
          </p>

          <p className="rise mt-4 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted [--delay:240ms]">
            We help your business overcome challenges, streamline operations, and unlock new opportunities with
            intelligent technology and digital solutions tailored to your goals.
          </p>

          <div className="rise mt-10 flex flex-col gap-4 [--delay:320ms] sm:flex-row">
            <ButtonLink href="/projects" className="group">
              Explore Our Projects
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Let&apos;s Discuss Your Project
            </ButtonLink>
          </div>
        </div>

        <div className="rise relative lg:col-span-5 [--delay:200ms]">
          {/* Glow behind the devices. */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(32,217,244,0.35),rgba(136,114,255,0.35),rgba(230,93,202,0.3),rgba(32,217,244,0.35))] opacity-60 blur-3xl" />

          <div className="hero-device relative pb-16">
            <DeviceMockup>
              <Screensaver />
            </DeviceMockup>

            <div className="absolute -bottom-4 -right-[4%] hidden w-[30%] sm:block">
              <DeviceMockup variant="phone">
                <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-bg-2 p-6 text-center">
                  {/* The official logo, unchanged. */}
                  <Image src="/brand/genmedia-logo-transparent.png" alt="GENMEDIA logo" width={975} height={545} className="w-full" />
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">Create. Connect. Influence.</p>
                </div>
              </DeviceMockup>
            </div>
          </div>
        </div>
      </Container>

      <a
        href="#stats"
        className="relative z-10 mx-auto mb-10 hidden flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-text lg:flex"
      >
        <Mouse aria-hidden="true" className="h-5 w-5" />
        Scroll to explore
      </a>
    </section>
  );
}
