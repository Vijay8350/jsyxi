import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/", light = false }: { className?: string; href?: string; light?: boolean }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 font-bold tracking-tight", className)}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
      <span className={cn("text-lg", light ? "text-white" : "text-ink")}>jsyxi</span>
    </Link>
  );
}
