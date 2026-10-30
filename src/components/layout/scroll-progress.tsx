// A thin brand-coloured bar across the top of the viewport that fills as the visitor scrolls.
// It is driven by CSS scroll timelines, so it needs no JavaScript. Browsers without that support simply show no bar.
export function ScrollProgress() {
  return <div aria-hidden="true" className="scroll-progress" />;
}
