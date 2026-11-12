"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Mail, X, type LucideIcon } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { company } from "@/lib/site";

export type ResultStatus = "sent" | "error" | "not-connected";

const content: Record<ResultStatus, { title: string; text: string; icon: LucideIcon; tone: string; tile: string }> = {
  sent: {
    title: "Enquiry sent",
    text: "Thank you. We have received your enquiry and will reply using the email address you provided.",
    icon: CheckCircle2,
    tone: "text-cyan",
    tile: "from-cyan/25 via-indigo-500/20 to-violet-600/25 ring-cyan/30",
  },
  error: {
    title: "Something went wrong",
    text: `Your answers are still here. Please try again, or email ${company.email} directly.`,
    icon: AlertTriangle,
    tone: "text-pink",
    tile: "from-pink/25 via-violet-600/15 to-indigo-500/20 ring-pink/30",
  },
  "not-connected": {
    title: "Enquiries are not available yet",
    text: `Your enquiry has not been sent. Please email ${company.email} or call ${company.phoneDisplay} to reach us now.`,
    icon: Mail,
    tone: "text-violet-400",
    tile: "from-violet-600/25 via-indigo-500/20 to-cyan/15 ring-violet-500/30",
  },
};

const primaryClass =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-cyan px-6 text-sm font-semibold text-[#02031a] transition hover:shadow-[0_0_30px_-6px_rgba(0,200,240,0.7)]";
const secondaryClass =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-cyan hover:text-cyan";

type EnquiryResultDialogProps = {
  status: ResultStatus;
  onClose: () => void;
};

// Popup shown in the centre of the screen after an enquiry is sent, fails, or cannot be sent yet.
// It fades and rises in, the icon pops, and Escape or a click outside closes it.
export function EnquiryResultDialog({ status, onClose }: EnquiryResultDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = content[status];
  const Icon = item.icon;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
      gsap.from(panelRef.current, { y: 24, scale: 0.96, opacity: 0, duration: 0.55, ease: "power3.out" });
      gsap.from(iconRef.current, { scale: 0.4, rotate: -20, opacity: 0, duration: 0.7, delay: 0.15, ease: "back.out(1.7)" });
    },
    { scope: overlayRef },
  );

  useEffect(() => {
    closeRef.current?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[80] flex items-center justify-center bg-[#02031a]/80 p-4 backdrop-blur-md" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
        aria-describedby="result-text"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070920]/95 p-8 text-center shadow-[0_80px_160px_-40px_rgba(0,200,240,0.35)]"
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan via-indigo-500 to-violet-600" />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-cyan hover:text-cyan"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>

        <span
          ref={iconRef}
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ring-1 ring-inset ${item.tile}`}
        >
          <Icon aria-hidden="true" className={`h-8 w-8 ${item.tone}`} />
        </span>

        <h2 id="result-title" className="mt-6 text-2xl font-semibold tracking-tight text-white">
          {item.title}
        </h2>
        <p id="result-text" className="mt-3 text-sm leading-relaxed text-white/60">
          {item.text}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {status === "sent" ? (
            <>
              <button type="button" onClick={onClose} className={primaryClass}>
                Done
              </button>
              <Link href="/" className={secondaryClass}>
                Back to home
              </Link>
            </>
          ) : (
            <>
              <button type="button" onClick={onClose} className={primaryClass}>
                {status === "error" ? "Try again" : "Close"}
              </button>
              <a href={`mailto:${company.email}`} className={secondaryClass}>
                Email us
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
