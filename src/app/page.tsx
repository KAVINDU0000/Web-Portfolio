import type { Metadata } from "next";
import { AboutPreview } from "@/components/home/about-preview";
import { ContactCta } from "@/components/home/contact-cta";
import { Hero } from "@/components/home/hero";
import { HomeFaq } from "@/components/home/home-faq";
import { Manifesto } from "@/components/home/manifesto";
import { PricingPreview } from "@/components/home/pricing-preview";
import { Process } from "@/components/home/process";
import { RibbonDivider } from "@/components/home/ribbon-divider";
import { ServicesPreview } from "@/components/home/services-preview";
import { TaglineBand } from "@/components/home/tagline-band";
import { TechStrip } from "@/components/home/tech-strip";
import { WorkPlayground } from "@/components/home/work-playground";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { ScrollRibbon } from "@/components/motion/scroll-ribbon";
import { technologies } from "@/data/home";

export const metadata: Metadata = {
  title: "Websites, Business Software and AI Solutions in Sri Lanka",
  description:
    "GENMEDIA designs and builds websites, business management systems, e-commerce, AI solutions and mobile apps for businesses across Sri Lanka.",
  alternates: { canonical: "/" },
};

// Home page, themed on the GENMEDIA logo: cyan, violet and pink. All content is server-rendered;
// the motion is GSAP ScrollTrigger and pointer effects, kept in small client components.
export default function HomePage() {
  return (
    // One navy background for the whole page, matching the other pages. The hero already uses this colour.
    <div className="relative isolate overflow-hidden bg-[#02031a]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,240,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,240,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_25%,transparent_75%,black)]" />
        <div className="absolute -left-40 top-[12%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.14),transparent)]" />
        <div className="absolute -right-40 top-[46%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.18),transparent)]" />
        <div className="absolute -left-40 bottom-[10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,120,240,0.14),transparent)]" />
      </div>

      <ScrollRibbon />
      <CustomCursor />
      <Hero />
      <TechStrip items={technologies} />
      <TaglineBand />
      <ServicesPreview />
      <Manifesto />
      <RibbonDivider />
      <Process />
      <WorkPlayground />
      <PricingPreview />
      <AboutPreview />
      <HomeFaq />
      <ContactCta />
    </div>
  );
}
