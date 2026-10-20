import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-cyan text-bg hover:bg-cyan/90 hover:shadow-glow-cyan",
  secondary: "border border-line-strong text-text hover:border-cyan hover:text-cyan",
  ghost: "text-text underline underline-offset-4 hover:text-cyan",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

// Internal routes use next/link. External links open in a new tab with safe rel attributes.
export function ButtonLink({ href, children, variant = "primary", className = "", external = false, onClick }: ButtonLinkProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-300 ease-out-soft ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
