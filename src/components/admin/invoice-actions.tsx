"use client";

import { useActionState } from "react";
import { Printer, Ban } from "lucide-react";
import { voidInvoiceAction } from "@/lib/actions/admin/billing";
import { initialActionState } from "@/lib/actions/result";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export function PrintButton() {
  return (
    <Button type="button" variant="secondary" onClick={() => window.print()}>
      <Printer className="h-4 w-4" /> Print
    </Button>
  );
}

export function VoidInvoiceButton({ invoiceId, disabled }: { invoiceId: string; disabled?: boolean }) {
  const [state, action] = useActionState(voidInvoiceAction, initialActionState);
  return (
    <div className="space-y-2">
      {state.error && <Alert tone="error">{state.error}</Alert>}
      {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
      <form
        action={action}
        onSubmit={(e) => {
          if (!confirm("Void this invoice? This cannot be undone.")) e.preventDefault();
        }}
      >
        <input type="hidden" name="invoiceId" value={invoiceId} />
        <SubmitButton variant="outlineDanger" pendingText="Voiding…" disabled={disabled}>
          <Ban className="h-4 w-4" /> Void invoice
        </SubmitButton>
      </form>
    </div>
  );
}
