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
    <>
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
    </>
  );
}
