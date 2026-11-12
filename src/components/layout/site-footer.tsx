import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { ArrowUp, ArrowUpRight, Mail, Phone, type LucideIcon } from "lucide-react";
import { legalNav, mainNav } from "@/data/navigation";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { company } from "@/lib/site";

// The year is read at request time so it stays current. The static year is the fallback while streaming.
async function CopyrightYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

const linkClass =
  "group inline-flex items-center gap-2 text-sm text-white/60 transition duration-300 hover:translate-x-1 hover:text-cyan";

// Column heading with a small index number, in the same style as the section labels on the home page.
function ColumnHeading({ index, children }: { index: string; children: string }) {
  return (
    <h2 className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white">
      <span className="font-mono text-cyan">{index}</span>
      <span aria-hidden="true" className="h-px w-6 bg-linear-to-r from-cyan to-violet-600" />
      {children}
    </h2>
  );
}

function ContactRow({ href, icon: Icon, label, value }: { href: string; icon: LucideIcon; label: string; value: string }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition duration-300 hover:border-cyan/40 hover:bg-cyan/[0.05]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
        <Icon aria-hidden="true" className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-white/40">{label}</span>
        <span className="block truncate text-sm text-white/90 transition group-hover:text-cyan">{value}</span>
      </span>
      <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan" />
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#02031a]">
      {/* Gradient edge and two soft light sources from the logo. Decorative only. */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan to-transparent" />
      <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,240,0.14),transparent)]" />
      <div aria-hidden="true" className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(80,40,240,0.18),transparent)]" />

      <div className="mx-auto grid w-full max-w-[var(--container-page)] gap-14 px-5 pb-12 pt-20 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          {/* Official logo, used unchanged, on a glass tile. */}
          <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
            <Image src="/brand/genmedia-logo-transparent.png" alt="GENMEDIA" width={975} height={545} className="h-12 w-auto" />
          </div>
          <p className="mt-7 bg-linear-to-r from-cyan via-violet-500 to-indigo-500 bg-clip-text text-sm font-semibold tracking-[0.2em] text-transparent">
            {company.tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">{company.description}</p>
        </div>

        <nav aria-label="Footer: site" className="lg:col-span-2">
          <ColumnHeading index="01">Explore</ColumnHeading>
          <ul className="mt-6 space-y-3.5">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer: services" className="lg:col-span-3">
          <ColumnHeading index="02">Services</ColumnHeading>
          <ul className="mt-6 space-y-3.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <ColumnHeading index="03">Projects</ColumnHeading>
          <ul className="mt-6 space-y-3.5">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`} className={linkClass}>
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ColumnHeading index="04">Contact</ColumnHeading>
            <div className="mt-6 space-y-3">
              <ContactRow href={`mailto:${company.email}`} icon={Mail} label="Email" value={company.email} />
              <ContactRow href={`tel:${company.phoneInternational}`} icon={Phone} label="Phone" value={company.phoneDisplay} />
            </div>
          </div>
        </div>
      </div>

      {/* Oversized outlined wordmark. Decorative only, so it is hidden from assistive tech. */}
      <p
        aria-hidden="true"
        className="pointer-events-none mx-auto max-w-[var(--container-page)] select-none overflow-hidden px-5 text-center text-[clamp(3.5rem,15vw,12rem)] font-semibold uppercase leading-[0.85] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)] sm:px-8"
      >
        {company.name}
      </p>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[var(--container-page)] flex-col gap-4 px-5 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © <Suspense fallback={company.copyrightYear}><CopyrightYear /></Suspense> {company.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <ul className="flex gap-6">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-cyan">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-white/70 transition hover:border-cyan hover:text-cyan"
            >
              Back to top
              <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
