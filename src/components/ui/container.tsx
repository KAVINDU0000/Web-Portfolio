import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: "div" | "section" | "header" | "footer";
  className?: string;
};

export function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-[var(--container-page)] px-5 sm:px-8 ${className}`}>{children}</Tag>;
}
