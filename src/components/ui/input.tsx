import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-slate-400",
        "hover:border-brand-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-100/70 outline-none transition-all duration-200",
        "disabled:bg-slate-50 disabled:text-slate-400 disabled:hover:border-line",
        className,
      )}
      {...props}
    />
  );
}
