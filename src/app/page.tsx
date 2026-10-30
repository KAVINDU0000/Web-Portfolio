import type { Metadata } from "next";
import { AboutPreview } from "@/components/home/about-preview";
import { Capabilities } from "@/components/home/capabilities";
import { ContactCta } from "@/components/home/contact-cta";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { HomeFaq } from "@/components/home/home-faq";
import { InteractiveShowcase } from "@/components/home/interactive-showcase";
import { PricingPreview } from "@/components/home/pricing-preview";
import { Process } from "@/components/home/process";
import { ServicesPreview } from "@/components/home/services-preview";
import { StatsStrip } from "@/components/home/stats-strip";
import { SectionBackdrop } from "@/components/layout/section-backdrop";

export const metadata: Metadata = {
  title: "Websites, Business Software and AI Solutions in Sri Lanka",
  description:
    "GENMEDIA designs and builds websites, business management systems, e-commerce, AI solutions and mobile apps for businesses across Sri Lanka.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <div className="relative isolate">
        <SectionBackdrop variant="code" />
        <ServicesPreview />
      </div>
      <div className="relative isolate">
        <SectionBackdrop variant="circuit" />
        <Process />
      </div>
      <div className="relative isolate">
        <SectionBackdrop variant="wireframe" />
        <InteractiveShowcase />
      </div>
      <div className="relative isolate">
        <SectionBackdrop variant="devices" />
        <FeaturedProjects />
      </div>
      <div className="relative isolate">
        <SectionBackdrop variant="nodes" />
        <Capabilities />
      </div>
      <PricingPreview />
      <AboutPreview />
      <HomeFaq />
      <ContactCta />
    </>
  );
}
