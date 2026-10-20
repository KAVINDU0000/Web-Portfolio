"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { mainNav } from "@/data/navigation";
import { company } from "@/lib/site";

type MobileNavigationProps = {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
  onEscape: () => void;
};

// Full-screen menu. Links rise in one after another when it opens, and the closed state is hidden from
// assistive tech and removed from the tab order via `inert`.
export function MobileNavigation({ open, pathname, onNavigate, onEscape }: MobileNavigationProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onEscape]);

  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-40 overflow-y-auto bg-bg/95 backdrop-blur-2xl transition duration-500 ease-out-soft lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="mesh-blob -right-24 top-1/4 h-72 w-72 bg-violet/30" />
        <div className="mesh-blob -left-24 bottom-10 h-72 w-72 bg-cyan/20 [animation-delay:-9s]" />
      </div>

      <div className="relative flex min-h-full flex-col px-6 pb-10 pt-32 sm:px-10">
        <nav aria-label="Mobile">
          <ul>
            {mainNav.map((link, index) => {
              const active = pathname === link.href;
              return (
                <li
                  key={link.href}
                  className={`border-b border-line transition duration-500 ease-out-soft ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: open ? `${80 + index * 60}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`group flex min-h-16 items-center justify-between gap-4 py-3 text-3xl font-semibold tracking-tight transition-colors hover:text-cyan sm:text-4xl ${
                      active ? "text-cyan" : "text-text"
                    }`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span aria-hidden="true" className="font-mono text-xs text-muted">
                        0{index + 1}
                      </span>
                      {link.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-6 w-6 text-muted transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-12">
          <Link
            href="/contact"
            onClick={onNavigate}
            className="group flex items-center justify-between gap-4 rounded-full bg-cyan py-2 pl-7 pr-2 text-base font-semibold text-bg"
          >
            Let&apos;s Discuss Your Project
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-bg text-cyan">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
          <p className="mt-5 text-sm text-muted">{company.email}</p>
        </div>
      </div>
    </div>
  );
}
