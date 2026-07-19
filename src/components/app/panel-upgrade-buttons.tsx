"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { requestUpgradeAction } from "@/lib/actions/upgrade";
import { cn } from "@/lib/utils";

export function PlanUpgradeButton({ planSlug, label = "Request upgrade" }: { planSlug: string; label?: string }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = () => {
    start(async () => {
      const res = await requestUpgradeAction(planSlug);
      setMsg({ ok: res.ok, text: res.ok ? res.message ?? "Requested." : res.error ?? "Something went wrong." });
    });
  };

  return (
    <div>
      <Button className="w-full" onClick={submit} disabled={pending || msg?.ok}>
        {pending ? "Sending…" : msg?.ok ? "Request sent" : label}
      </Button>
      {msg && <p className={cn("mt-2 text-xs", msg.ok ? "text-emerald-600" : "text-red-600")}>{msg.text}</p>}
    </div>
  );
}
