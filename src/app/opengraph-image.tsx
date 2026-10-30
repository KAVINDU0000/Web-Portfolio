import { ImageResponse } from "next/og";
import { company } from "@/lib/site";

// Share card used when the site link is posted on WhatsApp, LinkedIn, Facebook and similar. Text only, so it needs no external files.
export const alt = "GENMEDIA: websites, business software and AI solutions in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #080810 0%, #151522 60%, #1d1530 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#20d9f4" }}>{company.name}</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Websites, business software and AI solutions.
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#a6a6b8" }}>
            Built for businesses across Sri Lanka
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#e65dca" }}>{company.tagline}</div>
      </div>
    ),
    size,
  );
}
