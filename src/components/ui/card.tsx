import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

// Shared surface for content cards. Interactive cards get a subtle border and lift on hover.
export function Card({ children, className = "", interactive = false }: CardProps) {
  const base = "rounded-[var(--radius-card)] border border-line bg-bg-2/80 shadow-card";
  const hover = interactive ? "card-glow hover:-translate-y-1" : "";

  return <div className={`${base} ${hover} ${className}`}>{children}</div>;
}
