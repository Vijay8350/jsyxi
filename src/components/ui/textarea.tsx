import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400",
        "hover:border-brand-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-100/70 outline-none transition-all duration-200 min-h-20",
        className,
      )}
      {...props}
    />
  );
}
