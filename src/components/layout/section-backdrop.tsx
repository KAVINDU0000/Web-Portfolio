// Decorative background art for home sections. Each variant is a light, static SVG drawn in the brand colours.
// Kept faint with low opacity rather than a CSS mask, because masks add work on every scroll frame.
// Purely decorative, so it is hidden from assistive technology.

type Variant = "code" | "circuit" | "wireframe" | "devices" | "nodes";

const tileIds = {
  code: "sb-code",
  circuit: "sb-circuit",
  nodes: "sb-nodes",
} as const;

// Tile-based patterns repeat across the whole section.
function Pattern({ variant }: { variant: keyof typeof tileIds }) {
  switch (variant) {
    case "code":
      return (
        <pattern id={tileIds.code} width="320" height="140" patternUnits="userSpaceOnUse">
          <g fill="currentColor" fontFamily="var(--font-geist-mono), monospace" fontSize="15">
            <text x="20" y="34">{"{ }"}</text>
            <text x="150" y="70">{"</>"}</text>
            <text x="58" y="112">{"=> {"}</text>
            <text x="200" y="124">{"const"}</text>
          </g>
        </pattern>
      );
    case "circuit":
      return (
        <pattern id={tileIds.circuit} width="240" height="160" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40 H60 V80 H140 V20 H240" />
            <path d="M0 120 H90 V140 H180 V100 H240" />
          </g>
          <g fill="currentColor">
            <circle cx="60" cy="40" r="2.5" />
            <circle cx="140" cy="80" r="2.5" />
            <circle cx="140" cy="20" r="2.5" />
            <circle cx="90" cy="120" r="2.5" />
            <circle cx="180" cy="140" r="2.5" />
          </g>
        </pattern>
      );
    case "nodes":
      return (
        <pattern id={tileIds.nodes} width="300" height="220" patternUnits="userSpaceOnUse">
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <path d="M40 40 L130 110 L230 50" />
            <path d="M130 110 L200 190 L40 170" />
          </g>
          <g fill="currentColor">
            <circle cx="40" cy="40" r="4" />
            <circle cx="130" cy="110" r="5" />
            <circle cx="230" cy="50" r="3.5" />
            <circle cx="200" cy="190" r="3.5" />
            <circle cx="40" cy="170" r="4" />
          </g>
        </pattern>
      );
  }
}

// Large single drawings, placed toward one side of the section.
function Drawing({ variant }: { variant: "wireframe" | "devices" }) {
  if (variant === "wireframe") {
    return (
      <svg viewBox="0 0 800 520" className="absolute -right-24 top-10 w-[46rem] text-cyan opacity-[0.1]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="20" y="20" width="760" height="480" rx="18" />
        <line x1="20" y1="70" x2="780" y2="70" />
        <circle cx="46" cy="45" r="5" />
        <circle cx="66" cy="45" r="5" />
        <circle cx="86" cy="45" r="5" />
        <line x1="220" y1="70" x2="220" y2="500" />
        <rect x="244" y="98" width="500" height="130" rx="10" />
        <rect x="244" y="250" width="236" height="220" rx="10" />
        <rect x="508" y="250" width="236" height="220" rx="10" />
        <line x1="44" y1="110" x2="180" y2="110" />
        <line x1="44" y1="140" x2="160" y2="140" />
        <line x1="44" y1="170" x2="190" y2="170" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 800 520" className="absolute -left-32 bottom-0 w-[44rem] text-violet opacity-[0.1]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="120" y="80" width="460" height="290" rx="16" />
      <rect x="150" y="110" width="400" height="230" rx="6" />
      <path d="M60 370 H640 L680 410 H20 Z" />
      <rect x="620" y="200" width="130" height="250" rx="22" />
      <line x1="655" y1="222" x2="715" y2="222" />
      <circle cx="685" cy="425" r="8" />
    </svg>
  );
}

const tones = { code: "text-cyan", circuit: "text-violet", nodes: "text-pink" } as const;

type SectionBackdropProps = {
  variant: Variant;
};

export function SectionBackdrop({ variant }: SectionBackdropProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {variant === "wireframe" || variant === "devices" ? (
        <Drawing variant={variant} />
      ) : (
        <svg className={`absolute inset-0 h-full w-full opacity-[0.12] ${tones[variant]}`}>
          <defs>
            <Pattern variant={variant} />
          </defs>
          <rect width="100%" height="100%" fill={`url(#${tileIds[variant]})`} />
        </svg>
      )}
    </div>
  );
}
