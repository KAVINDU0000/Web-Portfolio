import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { company, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with GENMEDIA. Share your goals and challenges, and tell us which service you are interested in.",
  alternates: { canonical: "/contact" },
};

const contactItems = [
  {
    label: "Email",
    value: company.email,
    href: `mailto:${company.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: company.phoneDisplay,
    href: `tel:${company.phoneInternational}`,
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: "Message us on WhatsApp",
    href: whatsappLink("Hello GENMEDIA, I would like to discuss a project."),
    icon: MessageCircle,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Have an idea worth building?"
        description="Tell us what you are planning, what challenge you are facing, or where your business wants to go next. The more detail you share, the more useful our first reply will be."
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside aria-label="Contact details" className="space-y-4 lg:col-span-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} interactive className="relative p-6">
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-5 after:absolute after:inset-0"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-line-strong text-cyan">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.18em] text-muted">{item.label}</span>
                      <span className="mt-1 block break-all font-medium text-text">{item.value}</span>
                    </span>
                  </a>
                </Card>
              );
            })}

            <Card className="flex items-start gap-5 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-line-strong text-cyan">
                <MapPin aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="text-sm leading-relaxed text-muted">{company.serviceArea}</p>
            </Card>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <Card className="p-6 sm:p-10">
              <h2 id="enquiry-heading" className="text-[length:var(--text-title)] font-semibold tracking-tight">
                Project enquiry
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Share the details in three short steps. Pricing is confirmed in a written quote after we understand your
                requirements.
              </p>
              <div className="mt-10">
                {/* The form reads ?service= and ?package= from the URL, so it sits behind a Suspense boundary. */}
                <Suspense fallback={<p className="text-sm text-muted">Loading enquiry form…</p>}>
                  <ContactForm />
                </Suspense>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
