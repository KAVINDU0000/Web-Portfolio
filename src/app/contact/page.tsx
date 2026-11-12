import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckCircle2, ClipboardList, Mail, MessageCircle, Phone, MapPin, Send, FileText, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
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
    // One navy background for the whole page, matching the other inner pages. It replaces the site's purple backdrop here.
    <div className="relative isolate overflow-hidden bg-[#02031a]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,240,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,240,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_25%,transparent_75%,black)]" />
        <div className="absolute -left-40 top-[6%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.14),transparent)]" />
        <div className="absolute -right-40 top-[40%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.18),transparent)]" />
        <div className="absolute -left-40 bottom-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,120,240,0.14),transparent)]" />
      </div>
      {/* Hero: gradient headline, a short promise, and the three steps as a timeline. */}
      <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.18),transparent)]" />
        <div aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.22),transparent)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(0,200,240,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,240,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />

        <Container>
          <p className="inline-flex items-center gap-3 rounded-full border border-cyan/20 bg-cyan/[0.06] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cyan/90">
            <span className="relative flex h-2 w-2">
              <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-cyan" />
            </span>
            Contact
          </p>

          <h1 className="mt-7 max-w-4xl text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            Let&apos;s talk about your{" "}
            <span className="bg-[linear-gradient(90deg,#00C8F0,#0078F0_50%,#5028F0)] bg-clip-text text-transparent">project.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-white/60">
            Tell us what you are planning and where your business wants to go. We will review your details and reply with clear
            next steps.
          </p>

          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {steps.map(({ title, icon: Icon }, index) => (
              <li
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-500 hover:border-cyan/30 hover:bg-white/[0.05]"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600 opacity-50 transition duration-500 group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-cyan/20 via-indigo-500/15 to-violet-600/20 text-cyan ring-1 ring-inset ring-white/10">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-white/60">0{index + 1}</span>
                </div>
                <p className="mt-6 text-sm font-medium leading-relaxed text-white/90">{title}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside aria-label="Ways to contact us" className="space-y-8 lg:col-span-5">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Ways to reach us</h2>
              <ul className="mt-6 divide-y divide-white/10 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                {channels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="relative">
                      <a
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-start gap-4 p-5 transition-colors duration-300 hover:bg-white/[0.04] after:absolute after:inset-0"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan/20 via-indigo-500/15 to-violet-600/20 text-cyan ring-1 ring-inset ring-white/10 transition duration-300 group-hover:ring-cyan/40">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-white/60">{item.label}</span>
                          <span className="mt-1 flex items-center gap-2 break-all font-medium text-white group-hover:text-cyan">
                            {item.value}
                            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-0 transition duration-300 group-hover:opacity-100" />
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-white/65">{item.note}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/65">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan" />
                {company.serviceArea}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <h2 className="text-lg font-semibold text-white">What to include in your enquiry</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                You do not need every answer. These details help us reply with a useful first response.
              </p>
              <ul className="mt-6 space-y-4">
                {includeList.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/85">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Glass panel with a gradient top edge, so the form reads as the main action on the page. */}
          <div id="enquiry" className="scroll-mt-28 lg:col-span-7">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_60px_120px_-50px_rgba(0,200,240,0.3)] backdrop-blur-xl sm:p-10">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600" />
              <h2 id="enquiry-heading" className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Project enquiry
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                Three short steps. Pricing is confirmed in a written quote after we understand your requirements.
              </p>
              <div className="mt-10">
                {/* The form reads ?service= and ?package= from the URL, so it sits behind a Suspense boundary. */}
                <Suspense fallback={<p className="text-sm text-muted">Loading enquiry form…</p>}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="quick-chat-heading" className="pb-20 sm:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-12">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600" />
            <div aria-hidden="true" className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.15),transparent)]" />
            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 id="quick-chat-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Prefer a quick chat?
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-white/60">
                  Send us a WhatsApp message with a short description of what you need. We will take it from there.
                </p>
              </div>
              <ButtonLink href={whatsappLink("Hello GENMEDIA, I would like to discuss a project.")} external className="shrink-0">
                Message on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
