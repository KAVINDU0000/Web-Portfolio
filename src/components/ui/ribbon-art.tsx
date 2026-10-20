// Abstract ribbon artwork inspired by the GENMEDIA mark. Decorative only, so it is hidden from assistive tech.
// Pure SVG and CSS: no images, scripts or WebGL.
type RibbonArtProps = {
  className?: string;
  // Gives each instance its own gradient ids when more than one is on the page.
  id?: string;
};

export function RibbonArt({ className = "", id = "ribbon" }: RibbonArtProps) {
  const gradient = `${id}-gradient`;
  const glow = `${id}-glow`;
  const sheen = `${id}-sheen`;

  return (
    <svg aria-hidden="true" viewBox="0 0 600 600" fill="none" overflow="visible" className={className}>
      <defs>
        <linearGradient id={gradient} x1="40" y1="540" x2="580" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#20D9F4" />
          <stop offset="0.5" stopColor="#8872FF" />
          <stop offset="1" stopColor="#E65DCA" />
        </linearGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* Bloom behind the main ribbon. */}
      <path
        d="M-20 430 C 140 160, 330 540, 620 150"
        stroke={`url(#${gradient})`}
        strokeWidth="64"
        strokeLinecap="round"
        opacity="0.45"
        filter={`url(#${glow})`}
      />

      {/* Main ribbon: a solid body, a moving highlight, and a faint edge line. */}
      <path d="M-20 430 C 140 160, 330 540, 620 150" stroke={`url(#${gradient})`} strokeWidth="36" strokeLinecap="round" opacity="0.92" />
      <path
        className="ribbon-flow"
        d="M-20 430 C 140 160, 330 540, 620 150"
        stroke={`url(#${sheen})`}
        strokeWidth="5"
        strokeLinecap="round"
        style={{ animationDelay: "0s" }}
      />

      {/* Secondary ribbons travel at different speeds so the motion never looks repeated. */}
      <path d="M-20 300 C 170 60, 400 300, 620 40" stroke={`url(#${gradient})`} strokeWidth="14" strokeLinecap="round" opacity="0.7" />
      <path
        className="ribbon-flow"
        d="M-20 300 C 170 60, 400 300, 620 40"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ animationDelay: "-3s", animationDuration: "7s" }}
      />

      <path d="M40 600 C 230 400, 380 520, 620 360" stroke={`url(#${gradient})`} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <path d="M120 -20 C 260 180, 340 60, 500 620" stroke={`url(#${gradient})`} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
