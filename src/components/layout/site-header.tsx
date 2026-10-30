"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { MobileNavigation } from "./mobile-navigation";

// Floating glass capsule. The outer header is transparent and click-through, so only the capsule takes pointer input.
// The .site-header class is on the capsule: its surface becomes more solid on scroll (see globals.css).
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = (returnFocus: boolean) => {
    setMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  };

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="site-header pointer-events-auto relative mx-auto flex h-16 max-w-[calc(var(--container-page)-4rem)] items-center justify-between gap-4 rounded-full border border-line-strong bg-bg/60 pl-3 pr-2 shadow-[0_24px_60px_-32px_rgba(136,114,255,0.45)] sm:h-[4.25rem] sm:pl-4">
          {/* Gradient rim along the bottom edge of the capsule. */}
          <span aria-hidden="true" className="hairline pointer-events-none absolute inset-x-12 -bottom-px h-px" />

          <Link
            href="/"
            aria-label="GENMEDIA home"
            onClick={() => closeMenu(false)}
            className="group flex shrink-0 items-center rounded-full py-1 pl-1 pr-3 transition hover:bg-white/[0.04]"
          >
            {/* Official logo, used unchanged. */}
            <Image src="/brand/genmedia-logo-transparent.png" alt="" width={975} height={545} priority className="h-10 w-auto sm:h-11" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex min-h-10 items-center gap-2 rounded-full px-4 text-sm transition-colors duration-300 hover:text-text ${
                        active ? "bg-white/[0.07] text-text" : "text-muted"
                      }`}
                    >
                      {link.label}
                      {/* Gradient underline that grows in on hover and stays on the active page. */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-4 bottom-1.5 h-px origin-left bg-linear-to-r from-cyan via-violet to-pink transition duration-500 ease-out-soft ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              onClick={() => closeMenu(false)}
              className="group hidden items-center gap-3 rounded-full bg-cyan py-1.5 pl-5 pr-1.5 text-sm font-semibold text-bg transition duration-300 hover:bg-cyan/90 hover:shadow-glow-cyan lg:inline-flex"
            >
              Let&apos;s Discuss Your Project
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-bg text-cyan transition duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/contact"
              onClick={() => closeMenu(false)}
              className="inline-flex min-h-10 items-center rounded-full bg-cyan px-4 text-xs font-semibold text-bg lg:hidden"
            >
              Enquire
            </Link>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg/60 text-text transition hover:border-cyan lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside the header: the header's backdrop-blur would otherwise trap the fixed panel inside it. */}
      <MobileNavigation
        open={menuOpen}
        pathname={pathname}
        onNavigate={() => closeMenu(false)}
        onEscape={() => closeMenu(true)}
      />
    </>
  );
}
