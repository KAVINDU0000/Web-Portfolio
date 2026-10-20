// Soft luminous sphere with a specular highlight. Decorative only, hidden from assistive tech.
type GlowOrbProps = {
  className?: string;
};

export function GlowOrb({ className = "" }: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.85), rgba(136,114,255,0.7) 22%, rgba(230,93,202,0.45) 48%, rgba(32,217,244,0.18) 70%, transparent 74%)",
        boxShadow: "0 0 60px rgba(230,93,202,0.35), inset -10px -14px 30px rgba(8,8,16,0.45)",
      }}
    />
  );
}
