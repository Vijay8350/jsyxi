"use client";

import { useActionState } from "react";
import { CreditCard, ArrowDownCircle } from "lucide-react";
import { assignPlanAction, downgradeToFreeAction } from "@/lib/actions/admin/billing";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/misc";

type PlanOption = { id: string; name: string; priceLabel: string };

export function WorkspaceBilling({
  workspaceId,
  paidPlans,
  isFree,
  canManage,
}: {
  workspaceId: string;
  paidPlans: PlanOption[];
  isFree: boolean;
  canManage: boolean;
}) {
  const [assignState, assignAction] = useActionState(assignPlanAction, initialActionState);
  const [downgradeState, downgradeAction] = useActionState(downgradeToFreeAction, initialActionState);

  if (!canManage) {
    return (
      <Alert tone="info">Plan assignment is restricted to Finance and Owner/Admin staff.</Alert>
    );
  }

  return (
    <div className="space-y-5">
      <form action={assignAction} className="space-y-1">
        <input type="hidden" name="workspaceId" value={workspaceId} />
        {assignState.error && <Alert tone="error" className="mb-3">{assignState.error}</Alert>}
        {assignState.ok && assignState.message && <Alert tone="success" className="mb-3">{assignState.message}</Alert>}
        <Field label="Assign paid plan" htmlFor="planId" error={assignState.fieldErrors?.planId}>
          <Select id="planId" name="planId" required defaultValue="">
            <option value="" disabled>Select a plan…</option>
            {paidPlans.map((p) => (
              <option key={p.id} value={p.id}>{p.name} — {p.priceLabel}</option>
            ))}
          </Select>
        </Field>
        <Field label="Manual payment reference" htmlFor="manualPaymentRef" hint="e.g. NEFT / UPI txn id — recorded on the subscription (INV-10)." error={assignState.fieldErrors?.manualPaymentRef}>
          <Input id="manualPaymentRef" name="manualPaymentRef" placeholder="NEFT-2026-00123" required />
        </Field>
        <SubmitButton className="w-full" pendingText="Assigning…">
          <CreditCard className="h-4 w-4" /> Assign plan &amp; issue GST invoice
        </SubmitButton>
      </form>

      <div className="h-px bg-line" />

      <div>
        {downgradeState.error && <Alert tone="error" className="mb-3">{downgradeState.error}</Alert>}
        {downgradeState.ok && downgradeState.message && <Alert tone="success" className="mb-3">{downgradeState.message}</Alert>}
        <form
          action={downgradeAction}
          onSubmit={(e) => {
            if (!confirm("Downgrade this workspace to Free? Live widgets over the Free limit will be suspended, newest first.")) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <SubmitButton variant="outlineDanger" className="w-full" pendingText="Downgrading…" disabled={isFree}>
            <ArrowDownCircle className="h-4 w-4" /> Downgrade to Free
          </SubmitButton>
        </form>
        {isFree && <p className="mt-2 text-xs text-slate-400">Already on the Free plan.</p>}
      </div>

      <div className="h-px bg-line" />

      <div>
        <Button type="button" variant="secondary" className="w-full" disabled title="Not available in INC-1">
          Assist / impersonate <span className="text-xs text-slate-400">[stub]</span>
        </Button>
      </div>
    </div>
  );
}
