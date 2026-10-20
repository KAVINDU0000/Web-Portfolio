import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { mainNav } from "@/data/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <section className="relative isolate flex flex-1 items-center overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_30%_30%,rgba(136,114,255,0.18),transparent),radial-gradient(40%_40%_at_75%_70%,rgba(32,217,244,0.12),transparent)]"
      />
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">Error 404</p>
        <h1 className="mt-5 text-[length:var(--text-display)] font-semibold leading-none tracking-tight">Page not found</h1>
        <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted">
          The page may have moved, or the address may be mistyped. Try one of the pages below, or contact us directly.
        </p>

        <nav aria-label="Helpful links" className="mt-12">
          <ul className="flex flex-wrap gap-3">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-sm font-medium transition hover:border-cyan hover:text-cyan"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
