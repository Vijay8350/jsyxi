"use client";

import { useFormStatus } from "react-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/misc";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { pendingText?: string };

export function SubmitButton({ children, pendingText, className, disabled, ...props }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} className={cn(className)} {...props}>
      {pending ? (
        <>
          <Spinner /> {pendingText ?? "Working…"}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
