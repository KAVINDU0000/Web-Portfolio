// Translucent cyan-violet ring built from tilted discs in CSS 3D. Decorative: it has no content and is hidden from assistive tech.
// Costs no JavaScript and no WebGL, so it works everywhere CSS 3D is supported.
type GlassRingProps = {
  className?: string;
};

const DISCS = 8;

export function GlassRing({ className = "" }: GlassRingProps) {
  return (
    <div aria-hidden="true" className={`relative h-full w-full [transform-style:preserve-3d] ${className}`}>
      {Array.from({ length: DISCS }, (_, i) => {
        const hue = i % 2 === 0 ? "rgba(32,217,244,0.55)" : "rgba(136,114,255,0.5)";
        return (
          <span
            key={i}
            className="absolute inset-[6%] rounded-full"
            style={{
              transform: `rotateY(${(i * 180) / DISCS}deg)`,
              border: `1.5px solid ${hue}`,
              background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.07), transparent 60%)",
              boxShadow: `0 0 18px ${i % 2 === 0 ? "rgba(32,217,244,0.22)" : "rgba(136,114,255,0.22)"}`,
            }}
          />
        );
      })}
    </div>
  );
}
