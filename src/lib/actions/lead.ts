"use server";

import { createLead } from "@/lib/leads";
import { sendMail } from "@/lib/mail";
import { leadSchema, fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";

// Public lead-capture action (agency lead engine §9.5, RW-11). Used by the contact,
// consultation, tool-demo, and Shopify install-help forms. Idempotent on requestKey
// (INV-12) via createLead. Confirmation email is non-blocking (A1-15).

export async function submitLeadAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));

  const d = parsed.data;
  const scheduledSlot = d.scheduledSlot ? new Date(d.scheduledSlot) : null;
  if (scheduledSlot && Number.isNaN(scheduledSlot.getTime())) {
    return fail("Please pick a valid time slot.", { scheduledSlot: "Invalid slot" });
  }

  await createLead({
    source: d.source,
    serviceTopic: d.serviceTopic || null,
    name: d.name,
    email: d.email,
    phone: d.phone || null,
    message: d.message || null,
    scheduledSlot,
    requestKey: d.requestKey,
  });

  const isBooking = d.source === "consultation" && scheduledSlot;
  const when = isBooking
    ? scheduledSlot!.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" })
    : null;

  await sendMail({
    to: d.email,
    templateKey: "lead_confirmation",
    subject: isBooking ? "Your consultation request is in — jsyxi" : "Thanks for reaching out — jsyxi",
    body: isBooking
      ? `Hi ${d.name},\n\nThanks for booking a consultation with jsyxi. We've noted your preferred slot:\n${when} (IST)\n\nA member of our team will confirm shortly. Reply to this email if anything changes.\n\n— Team jsyxi`
      : `Hi ${d.name},\n\nThanks for getting in touch with jsyxi. We've received your enquiry and a member of our team will reply within one business day.\n\n${d.message ? `Your message:\n"${d.message}"\n\n` : ""}— Team jsyxi`,
  });

  return succeed(
    isBooking
      ? "Your consultation request is in — we'll confirm your slot by email shortly."
      : "Thanks! We've received your message and will reply within one business day.",
  );
}
