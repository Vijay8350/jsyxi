import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

// Server-safe presentational helpers shared across admin pages.

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export function AccessDenied({ section }: { section?: string }) {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-line bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Lock className="h-6 w-6" />
      </div>
      <h2 className="text-base font-semibold text-ink">Access denied</h2>
      <p className="mt-1 text-sm text-slate-500">
        Your staff role can&apos;t view {section ? `the ${section} section` : "this section"}.
      </p>
    </div>
  );
}

/** A bordered, horizontally-scrollable table wrapper. */
export function TableCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-white shadow-sm", className)}>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function KeyValue({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink">{children}</dd>
    </div>
  );
}
