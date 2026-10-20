import Image from "next/image";

// Laptop display. The screen itself is still; only the logo moves. It fades in once on load, its halo breathes,
// and a sheen passes over the logo. A static vignette makes the screen read as glass.
// All motion stops under prefers-reduced-motion, and the logo is shown fully visible in that case.
export function Screensaver() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="ss-reveal relative w-[42%]">
          {/* Soft halo behind the logo. It is a plain gradient, not a CSS filter, so it cannot be clipped to a box. */}
          <div aria-hidden="true" className="ss-halo pointer-events-none absolute -inset-[8%] rounded-full" />
          <div className="relative">
            <Image
              src="/brand/logo-screensaver.webp"
              alt="GENMEDIA logo artwork"
              width={1024}
              height={683}
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="block h-auto w-full max-w-none"
            />
            <div aria-hidden="true" className="ss-shine absolute inset-0" />
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]"
      />
    </div>
  );
}
