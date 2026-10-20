import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { legalNav, mainNav } from "@/data/navigation";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { company } from "@/lib/site";

// The year is read at request time so it stays current. The static year is the fallback while streaming.
async function CopyrightYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

const linkClass = "text-muted transition-colors hover:text-text";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="mx-auto grid w-full max-w-[var(--container-page)] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {/* Official logo, used unchanged. */}
          <Image src="/brand/genmedia-logo-transparent.png" alt="GENMEDIA" width={975} height={545} className="h-12 w-auto" />
          <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-text">{company.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{company.description}</p>
        </div>

        <nav aria-label="Footer: site" className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-text">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
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
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-text">Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
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
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-text">Projects</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`} className={linkClass}>
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-text">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={`mailto:${company.email}`} className="break-all text-text underline underline-offset-4 hover:text-cyan">
                {company.email}
              </a>
            </li>
            <li>
              <a href={`tel:${company.phoneInternational}`} className="text-text underline underline-offset-4 hover:text-cyan">
                {company.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[var(--container-page)] flex-col gap-4 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © <Suspense fallback={company.copyrightYear}><CopyrightYear /></Suspense> {company.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
