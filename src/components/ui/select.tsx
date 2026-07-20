import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink cursor-pointer",
        "hover:border-brand-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-100/70 outline-none transition-all duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
