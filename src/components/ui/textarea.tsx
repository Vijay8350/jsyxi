import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400",
        "focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition min-h-20",
        className,
      )}
      {...props}
    />
  );
}
