"use client";

import Image from "next/image";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { ArrowUpRight, Mouse } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/magnetic";
import { QuickStart } from "@/components/home/quick-start";

type TiltSetters = {
  rx: ReturnType<typeof gsap.quickTo>;
  ry: ReturnType<typeof gsap.quickTo>;
};

// Hero palette, taken from the logo: deep navy, cyan, azure and indigo.
// Hero: headline on the left, a laptop and a phone on the right, both showing the GENMEDIA logo.
// Effects: headline lines rise from a mask, the devices settle in, the laptop tilts toward the pointer,
// a light follows the cursor, and the headline gradient shimmers.
// On scroll the copy recedes and the phone drifts up faster than the laptop.
// Without JavaScript, or with reduced motion, everything sits in its final position.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const tilt = useRef<TiltSetters | null>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section || prefersReducedMotion()) return;
      const q = gsap.utils.selector(section);

      const laptop = q("[data-tilt]")[0];
      if (laptop) {
        tilt.current = {
          rx: gsap.quickTo(laptop, "rotationX", { duration: 0.8, ease: "power3.out" }),
          ry: gsap.quickTo(laptop, "rotationY", { duration: 0.8, ease: "power3.out" }),
        };
      }

      // Intro.
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(q("[data-line-inner]"), { yPercent: 110, duration: 1.2, stagger: 0.12 })
        .from(q("[data-hero-fade]"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.5)
        .from(q("[data-device-laptop]"), { y: 80, opacity: 0, duration: 1.4 }, 0.2)
        .from(q("[data-device-phone]"), { y: 120, opacity: 0, duration: 1.2 }, 0.5);

      // Ambient motion: orbit rings, a float on the phone, a sheen across the screens, a shimmering headline.
      gsap.to(q("[data-orbit]"), { rotate: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(q("[data-glow]"), { rotate: 360, duration: 60, repeat: -1, ease: "none" });
      gsap.to(q("[data-float]"), { y: -12, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(q("[data-shimmer]"), { backgroundPosition: "200% center", duration: 6, repeat: -1, ease: "none" });

      // Scroll: the copy recedes, the laptop moves slowly, the phone rises faster for a layered feel.
      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } })
        .to(q("[data-hero-copy]"), { yPercent: -8, opacity: 0.3, ease: "none" }, 0)
        .to(q("[data-parallax-laptop]"), { yPercent: -6, ease: "none" }, 0)
        .to(q("[data-parallax-phone]"), { yPercent: -24, ease: "none" }, 0);
    },
    { scope: ref },
  );

  // Pointer position drives a light (CSS variables, no React state) and the laptop tilt.
  function handlePointer(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty("--mx", `${x}px`);
    event.currentTarget.style.setProperty("--my", `${y}px`);
    if (!tilt.current) return;
    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;
    tilt.current.ry(nx * 10);
    tilt.current.rx(-ny * 6);
  }

  function resetTilt() {
    tilt.current?.rx(0);
    tilt.current?.ry(0);
  }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      onPointerMove={handlePointer}
      onPointerLeave={resetTilt}
      className="relative isolate overflow-hidden bg-[#02031a]"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "40%" }}
    >
      {/* Navy field with two light sources from the logo, a fine grid, and a cursor light. Decorative only. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.22),transparent)]" />
        <div className="absolute -right-40 top-0 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.30),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,240,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,240,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(420px_circle_at_var(--mx)_var(--my),rgba(0,200,240,0.10),transparent_70%)]" />
      </div>

      <Container className="grid min-h-svh items-center gap-14 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:grid-cols-12 lg:gap-x-10 lg:pb-24 lg:pt-36">
        <div data-hero-copy className="lg:col-span-6">
          <p
            data-hero-fade
            className="inline-flex items-center gap-3 rounded-full border border-cyan/20 bg-cyan/[0.06] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cyan/90"
          >
            <span className="relative flex h-2 w-2">
              <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-cyan" />
            </span>
            GENMEDIA · Digital Solutions &amp; Software
          </p>

          <h1
            id="hero-heading"
            className="mt-7 text-[clamp(2.75rem,5.4vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white"
          >
            <LineMask>Your Business</LineMask>
            <LineMask>Has Potential.</LineMask>
            <LineMask>
              <span
                data-shimmer
                className="bg-[linear-gradient(90deg,#00C8F0,#0078F0_50%,#5028F0)] bg-[length:200%_auto] bg-clip-text pr-[0.08em] text-transparent [-webkit-background-clip:text] lg:whitespace-nowrap"
              >
                Let&apos;s Unlock It.
              </span>
            </LineMask>
          </h1>

          <p data-hero-fade className="mt-7 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-white/60">
            We build websites, business software and AI tools that help your business run smoother and grow faster.
          </p>

          <div data-hero-fade className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Magnetic>
              <ButtonLink href="/projects" className="group !bg-cyan !text-[#02031a] hover:!shadow-[0_0_40px_-8px_rgba(0,200,240,0.7)]">
                Explore Our Projects
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/contact" variant="secondary" className="!border-white/15 !text-white hover:!border-cyan hover:!text-cyan">
              Discuss Your Project
            </ButtonLink>
          </div>

          <div data-hero-fade>
            <QuickStart />
          </div>
        </div>

        <div className="relative lg:col-span-6" style={{ perspective: 1400 }}>
          {/* Rotating light behind the devices, in the logo colours. */}
          <div
            aria-hidden="true"
            data-glow
            className="pointer-events-none absolute left-1/2 top-[45%] aspect-square w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(0,200,240,0.5),rgba(0,120,240,0.35),rgba(80,40,240,0.45),rgba(0,200,240,0.5))] opacity-30 blur-3xl"
          />

          {/* Laptop, tilting toward the pointer. */}
          <div data-device-laptop className="relative w-[90%]">
            <div data-parallax-laptop>
              <div data-tilt className="will-change-transform">
                <Laptop>
                  <LogoScreen />
                </Laptop>
              </div>
            </div>
          </div>

          {/* Phone, low on the right so it does not cover the laptop logo. */}
          <div data-device-phone className="absolute bottom-[-6%] right-0 w-[32%] min-w-[8.5rem] max-w-[12.5rem]">
            <div data-parallax-phone>
              <div data-float>
                <Phone>
                  <LogoScreen decorative />
                </Phone>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <a
        href="#tech"
        className="relative z-10 mx-auto mb-10 hidden flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-cyan lg:flex"
      >
        <Mouse aria-hidden="true" className="h-5 w-5" />
        Scroll to explore
      </a>
    </section>
  );
}

// Each headline line rises out of its own mask, so the text reads as a clean reveal and never overflows.
function LineMask({ children }: { children: ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span data-line-inner className="block">
        {children}
      </span>
    </span>
  );
}

// Laptop: a metal-look lid with a camera dot, a screen, and a base with a thin cyan light underneath.
function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full">
      <div className="relative rounded-[1.1rem] bg-linear-to-b from-[#20254a] to-[#0a0c24] p-[2.2%] ring-1 ring-white/10 shadow-[0_50px_120px_-40px_rgba(0,200,240,0.45)]">
        <span aria-hidden="true" className="absolute left-1/2 top-[1.1%] h-1 w-1 -translate-x-1/2 rounded-full bg-white/30" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.6rem] bg-[#03041a] ring-1 ring-black">{children}</div>
      </div>
      <div aria-hidden="true" className="relative mx-auto h-2.5 w-[112%] -translate-x-[6%] rounded-b-xl bg-linear-to-b from-[#1d2247] to-[#070816]" />
      <div aria-hidden="true" className="mx-auto h-px w-[70%] bg-linear-to-r from-transparent via-cyan/70 to-transparent" />
    </div>
  );
}

// Phone: a slim frame with a dynamic-island notch.
function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[9/19] w-full rounded-[2.3rem] bg-linear-to-b from-[#20254a] to-[#080a20] p-[3%] ring-1 ring-white/12 shadow-[0_40px_90px_-30px_rgba(80,40,240,0.6)]">
      <span aria-hidden="true" className="absolute left-1/2 top-[3.5%] z-10 h-[3.2%] w-[34%] -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-[#03041a]">{children}</div>
    </div>
  );
}

// The logo on a navy screen: a soft cyan and indigo light and a dashed orbit.
// The phone repeats the laptop's logo, so it is hidden from assistive tech.
function LogoScreen({ decorative = false }: { decorative?: boolean }) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(60%_60%_at_50%_45%,rgba(0,200,240,0.22),rgba(80,40,240,0.14)_45%,transparent_75%)]"
    >
      <div aria-hidden="true" data-orbit className="absolute aspect-square w-[68%] rounded-full border border-dashed border-cyan/25" />
      <Image
        src="/brand/genmedia-logo-transparent.png"
        alt={decorative ? "" : "GENMEDIA logo"}
        width={975}
        height={545}
        sizes="(min-width: 1024px) 28vw, 70vw"
        className="relative h-auto w-[52%]"
      />
    </div>
  );
}
