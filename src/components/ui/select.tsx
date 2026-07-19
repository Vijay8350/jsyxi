import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink",
        "focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
