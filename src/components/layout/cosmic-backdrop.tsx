// Seeded random numbers, so the star field is the same on every render and on the server and in the browser.
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const random = seeded(42);
const stars = Array.from({ length: 90 }, () => ({
  x: Math.round(random() * 1000),
  y: Math.round(random() * 1000),
  r: 0.6 + random() * 1.4,
  o: 0.35 + random() * 0.6,
}));

// Fixed background behind the whole page: a blurred nebula of pink, violet and cyan clouds, a faint star field,
// signal rings and a dot grid. It is decorative, so it is hidden from assistive technology and needs no JavaScript.
export function CosmicBackdrop() {
  return (
    <div aria-hidden="true" className="cosmic-backdrop">
      <div className="cosmic-nebula">
        <svg className="cosmic-cloud" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            {/* Each cloud is noise turned into a soft, coloured shape, then blurred so the edges melt into the background. */}
            <filter id="cosmic-cloud-pink" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.0032 0.0045" numOctaves="4" seed="11" result="noise" />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0.90  0 0 0 0 0.36  0 0 0 0 0.79  7 0 0 0 -4.1"
                result="tint"
              />
              <feGaussianBlur in="tint" stdDeviation="16" />
            </filter>
            <filter id="cosmic-cloud-violet" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.0026 0.0038" numOctaves="4" seed="27" result="noise" />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0.53  0 0 0 0 0.45  0 0 0 0 1  7 0 0 0 -3.9"
                result="tint"
              />
              <feGaussianBlur in="tint" stdDeviation="20" />
            </filter>
            <filter id="cosmic-cloud-cyan" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.004 0.0055" numOctaves="3" seed="53" result="noise" />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0.13  0 0 0 0 0.85  0 0 0 0 0.96  6 0 0 0 -3.5"
                result="tint"
              />
              <feGaussianBlur in="tint" stdDeviation="14" />
            </filter>
          </defs>
          <rect width="1000" height="1000" filter="url(#cosmic-cloud-violet)" opacity="0.6" />
          <rect width="1000" height="1000" filter="url(#cosmic-cloud-pink)" opacity="0.45" />
          <rect width="1000" height="1000" filter="url(#cosmic-cloud-cyan)" opacity="0.3" />

          <g className="cosmic-stars">
            {stars.map((star, index) => (
              <circle key={index} cx={star.x} cy={star.y} r={star.r} fill="#ffffff" opacity={star.o} />
            ))}
          </g>
        </svg>

        <div className="cosmic-glow cosmic-glow-a" />
        <div className="cosmic-glow cosmic-glow-b" />
        <div className="cosmic-glow cosmic-glow-c" />
      </div>
      <div className="cosmic-dots" />
      <svg className="cosmic-signal" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="cosmic-signal-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#20D9F4" />
            <stop offset="0.55" stopColor="#8872FF" />
            <stop offset="1" stopColor="#E65DCA" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="34" stroke="url(#cosmic-signal-grad)" strokeWidth="1" />
        <circle cx="200" cy="200" r="72" stroke="url(#cosmic-signal-grad)" strokeWidth="1" strokeDasharray="2 10" />
        <circle cx="200" cy="200" r="118" stroke="url(#cosmic-signal-grad)" strokeWidth="1" />
        <circle cx="200" cy="200" r="168" stroke="url(#cosmic-signal-grad)" strokeWidth="1" strokeDasharray="60 14" />
        <circle cx="200" cy="200" r="196" stroke="url(#cosmic-signal-grad)" strokeWidth="0.6" strokeDasharray="1 8" />
      </svg>
    </div>
  );
}
