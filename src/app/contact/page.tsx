import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckCircle2, ClipboardList, Mail, MessageCircle, Phone, MapPin, Send, FileText } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { company, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact GENMEDIA to start a website, business software, AI or mobile app project. Share your goals and we will reply with next steps.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    label: "Project enquiry",
    value: "Use the form to share your project",
    note: "Best for new projects. You get a considered reply with next steps.",
    href: "#enquiry",
    icon: ClipboardList,
  },
  {
    label: "Email",
    value: company.email,
    note: "For documents, briefs and longer questions.",
    href: `mailto:${company.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: company.phoneDisplay,
    note: "For a quick question you would rather ask out loud.",
    href: `tel:${company.phoneInternational}`,
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: "Message us directly",
    note: "Good for short questions and sharing a few photos or files.",
    href: whatsappLink("Hello GENMEDIA, I would like to discuss a project."),
    icon: MessageCircle,
    external: true,
  },
];

const steps = [
  { title: "Tell us about you and your business", icon: ClipboardList },
  { title: "Describe what you want to build", icon: FileText },
  { title: "We reply with next steps and a written quote", icon: Send },
];

const includeList = [
  "What your business does and who your customers are",
  "The problem you want solved, or the goal you want to reach",
  "Any existing website, system or designs we should know about",
  "Your rough timeline and the budget range you have in mind",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project."
        description="Tell us what you are planning and where your business wants to go. We will review your details and reply with clear next steps."
      >
        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ title, icon: Icon }, index) => (
            <li key={title} className="flex items-start gap-4 rounded-[var(--radius-card)] border border-line bg-bg-2/70 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-cyan/10 text-cyan">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="text-sm leading-relaxed">
                <span className="block font-mono text-xs text-muted">0{index + 1}</span>
                <span className="mt-1 block font-medium text-text">{title}</span>
              </span>
            </li>
          ))}
        </ol>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside aria-label="Ways to contact us" className="space-y-10 lg:col-span-5">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Ways to reach us</h2>
              <ul className="mt-6 divide-y divide-line rounded-[var(--radius-card)] border border-line bg-bg-2/80">
                {channels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="relative">
                      <a
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-start gap-4 p-5 transition-colors hover:bg-white/[0.03] after:absolute after:inset-0"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-line-strong text-cyan">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs uppercase tracking-[0.18em] text-muted">{item.label}</span>
                          <span className="mt-1 block break-all font-medium text-text group-hover:text-cyan">{item.value}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">{item.note}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan" />
                {company.serviceArea}
              </p>
            </div>

            <Card className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold">What to include in your enquiry</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                You do not need every answer. These details help us reply with a useful first response.
              </p>
              <ul className="mt-5 space-y-3">
                {includeList.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </aside>

          {/* No card around the form: it reads as a form, not another package or pricing tile. */}
          <div id="enquiry" className="scroll-mt-28 lg:col-span-6 lg:col-start-7">
            <h2 id="enquiry-heading" className="text-[length:var(--text-headline)] font-semibold leading-tight tracking-tight">
              Project enquiry
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Three short steps. Pricing is confirmed in a written quote after we understand your requirements.
            </p>
            <span aria-hidden="true" className="hairline mt-8 block h-px w-full" />
            <div className="mt-10">
              {/* The form reads ?service= and ?package= from the URL, so it sits behind a Suspense boundary. */}
              <Suspense fallback={<p className="text-sm text-muted">Loading enquiry form…</p>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="quick-chat-heading" className="pb-20 sm:pb-28">
        <Container>
          <Card className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div>
              <h2 id="quick-chat-heading" className="text-[length:var(--text-title)] font-semibold tracking-tight">
                Prefer a quick chat?
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">
                Send us a WhatsApp message with a short description of what you need. We will take it from there.
              </p>
            </div>
            <ButtonLink href={whatsappLink("Hello GENMEDIA, I would like to discuss a project.")} external className="shrink-0">
              Message on WhatsApp
            </ButtonLink>
          </Card>
        </Container>
      </section>
    </>
  );
}
