type Tone = "cyan" | "violet" | "pink";

const gradients: Record<Tone, string> = {
  cyan: "radial-gradient(closest-side, rgb(32 217 244 / 0.55), rgb(32 217 244 / 0.08) 70%, transparent)",
  violet: "radial-gradient(closest-side, rgb(136 114 255 / 0.6), rgb(136 114 255 / 0.08) 70%, transparent)",
  pink: "radial-gradient(closest-side, rgb(230 93 202 / 0.5), rgb(230 93 202 / 0.06) 70%, transparent)",
};

// A soft, blurred colour glow for a section. It sits behind the content and is hidden from assistive technology.
// Place it inside a section that has "relative isolate overflow-hidden".
export function Nebula({ tone, className }: { tone: Tone; className: string }) {
  return <div aria-hidden="true" className={`nebula-glow pointer-events-none absolute -z-10 rounded-full ${className}`} style={{ background: gradients[tone] }} />;
}
