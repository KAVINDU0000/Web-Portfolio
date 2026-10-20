import type { ReactNode } from "react";

type DeviceMockupProps = {
  children: ReactNode;
  variant?: "laptop" | "phone";
  className?: string;
};

// Device frames for showing work. The screen holds whatever is passed in: brand art, or a real screenshot once one is approved.
export function DeviceMockup({ children, variant = "laptop", className = "" }: DeviceMockupProps) {
  if (variant === "phone") {
    return (
      <div className={`relative aspect-[9/19] w-full max-w-[15rem] rounded-[2.2rem] border border-line-strong bg-bg-2 p-2.5 shadow-[0_40px_80px_-30px_rgba(136,114,255,0.55)] ${className}`}>
        <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-bg">{children}</div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className="rounded-[1.4rem] border border-line-strong bg-bg-2 p-2.5 shadow-[0_50px_90px_-40px_rgba(136,114,255,0.5)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.9rem] bg-bg">{children}</div>
      </div>
      <div aria-hidden="true" className="mx-auto h-3 w-[108%] -translate-x-[4%] rounded-b-2xl bg-linear-to-b from-line-strong to-bg-2" />
    </div>
  );
}
