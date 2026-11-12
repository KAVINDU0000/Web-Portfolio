"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// A dot with a trailing ring replaces the system cursor on fine-pointer screens. The ring grows over links and buttons,
// and the native cursor returns over text fields. Off on touch screens and for reduced-motion visitors.
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;
    const enabled = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!enabled.matches) return;

    const html = document.documentElement;
    const previousCursor = html.style.cursor;
    html.style.cursor = "none";
    d.style.display = "block";
    r.style.display = "block";

    const dotX = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });

    const onMove = (event: PointerEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const field = target?.closest("input,textarea,select,[contenteditable]");
      if (field) {
        html.style.cursor = previousCursor;
        gsap.to([d, r], { opacity: 0, duration: 0.2 });
        return;
      }
      gsap.to([d, r], { opacity: 1, duration: 0.2 });
      html.style.cursor = "none";
      const interactive = target?.closest("a,button,[data-cursor]");
      gsap.to(r, { scale: interactive ? 2.4 : 1, duration: 0.35, ease: "power3.out" });
      gsap.to(d, { scale: interactive ? 0 : 1, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      html.style.cursor = previousCursor;
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/70 mix-blend-difference"
        style={{ display: "none" }}
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[71] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan mix-blend-difference"
        style={{ display: "none" }}
      />
    </>
  );
}
