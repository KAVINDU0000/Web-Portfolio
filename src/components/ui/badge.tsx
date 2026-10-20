import type { ProjectStatus } from "@/data/projects";

const tones: Record<ProjectStatus, string> = {
  "In Development": "border-violet/50 text-violet",
  Completed: "border-cyan/50 text-cyan",
  Live: "border-cyan/50 text-cyan",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${tones[status]}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function TagBadge({ children }: { children: string }) {
  return <span className="rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-xs text-muted">{children}</span>;
}
