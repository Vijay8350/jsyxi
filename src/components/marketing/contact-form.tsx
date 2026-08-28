"use client";

import { useActionState, useEffect, useState } from "react";
import { CalendarClock, MessageSquare, CheckCircle2, Clock } from "lucide-react";
import { submitLeadAction } from "@/lib/actions/lead";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Mode = "enquiry" | "consultation";

const TOPICS = [
  { value: "quote", label: "General enquiry / quote" },
  { value: "store-design", label: "Store & landing-page design" },
  { value: "widget-setup", label: "Widget setup & installation" },
  { value: "lead-gen", label: "Lead-gen & CRM automation" },
  { value: "cro", label: "Conversion optimization" },
  { value: "shopify", label: "Shopify help" },
  { value: "support", label: "Product support" },
];

const SLOT_HOURS = [10, 12, 15, 17];
const IST_OFFSET_MS = (5 * 60 + 30) * 60000;

type Day = { key: string; label: string; slots: { iso: string; time: string }[] };

function istDateKey(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function buildSlots(): Day[] {
  const days: Day[] = [];
  for (let offset = 1, added = 0; added < 7 && offset < 21; offset++) {
    const key = istDateKey(new Date(Date.now() + offset * 86400000));
    const [y, m, d] = key.split("-").map(Number);
    const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
    if (dow === 0 || dow === 6) continue; // skip weekends
    const slots = SLOT_HOURS.map((h) => {
      const iso = new Date(Date.UTC(y, m - 1, d, h, 0) - IST_OFFSET_MS).toISOString();
      const time = `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? "PM" : "AM"}`;
      return { iso, time };
    });
    const label = new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });
    days.push({ key, label, slots });
    added++;
  }
  return days;
}

export function ContactForm() {
  const [state, action] = useActionState(submitLeadAction, initialActionState);
  const [mode, setMode] = useState<Mode>("enquiry");
  const [requestKey, setRequestKey] = useState("");
  const [topic, setTopic] = useState("quote");
  const [days, setDays] = useState<Day[]>([]);
  const [slot, setSlot] = useState("");

  // Generate idempotency key and slot list client-side to avoid hydration drift.
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setRequestKey(crypto.randomUUID());
      setDays(buildSlots());
    });

    return () => {
      active = false;
    };
  }, []);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-xl font-bold text-ink">Thank you!</h2>
        <p className="mx-auto mt-2 max-w-md text-slate-600">
          {state.message ?? "We've received your message and will be in touch soon."}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/tools"
            variant="secondary"
            className="w-full motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
          >
            Browse tools
          </ButtonLink>
          <ButtonLink
            href="/signup"
            className="w-full motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
          >
            Start free
          </ButtonLink>
        </div>
      </div>
    );
  }

  const chosenSlotLabel = (() => {
    for (const day of days) {
      const s = day.slots.find((x) => x.iso === slot);
      if (s) return `${day.label}, ${s.time} IST`;
    }
    return "";
  })();

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md motion-reduce:transition-none sm:p-8">
      {/* Tabs */}
      <div
        className="mb-6 grid grid-cols-1 gap-2 rounded-xl bg-slate-100 p-1 sm:grid-cols-2"
        role="group"
        aria-label="Contact form type"
      >
        <TabButton
          active={mode === "enquiry"}
          onClick={() => setMode("enquiry")}
          icon={<MessageSquare className="h-4 w-4" aria-hidden="true" />}
        >
          Send an enquiry
        </TabButton>
        <TabButton
          active={mode === "consultation"}
          onClick={() => setMode("consultation")}
          icon={<CalendarClock className="h-4 w-4" aria-hidden="true" />}
        >
          Book a consultation
        </TabButton>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {mode === "enquiry" ? "Enquiry form selected." : "Consultation booking form selected."}
      </p>

      {state.error && (
        <Alert tone="error" className="mb-4">
          {state.error}
        </Alert>
      )}

      <form action={action} className="space-y-1">
        <input type="hidden" name="requestKey" value={requestKey} />
        <input type="hidden" name="source" value={mode === "consultation" ? "consultation" : "quote"} />

        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Your name" htmlFor="name" error={state.fieldErrors?.name}>
            <Input id="name" name="name" autoComplete="name" placeholder="Asha Rao" required />
          </Field>
          <Field label="Email" htmlFor="email" error={state.fieldErrors?.email}>
            <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </Field>
        </div>

        <Field label="Phone (optional)" htmlFor="phone" error={state.fieldErrors?.phone}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
        </Field>

        {mode === "enquiry" ? (
          <>
            <Field label="What can we help with?" htmlFor="serviceTopic">
              <Select id="serviceTopic" name="serviceTopic" value={topic} onChange={(e) => setTopic(e.target.value)}>
                {TOPICS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Message" htmlFor="message" error={state.fieldErrors?.message}>
              <Textarea id="message" name="message" placeholder="Tell us a bit about your business and goals…" />
            </Field>
            <input type="hidden" name="scheduledSlot" value="" />
            <SubmitButton className="mt-2 w-full" pendingText="Sending…">
              Send message
            </SubmitButton>
          </>
        ) : (
          <>
            <input type="hidden" name="serviceTopic" value="consultation" />
            <input type="hidden" name="scheduledSlot" value={slot} />

            <p className="mb-2 mt-1 text-sm font-medium text-slate-700">Pick a slot (times in IST)</p>
            {days.length === 0 ? (
              <p
                className="flex items-center gap-2 rounded-lg border border-line bg-slate-50 px-3 py-3 text-sm text-slate-500"
                role="status"
              >
                <Clock className="h-4 w-4" aria-hidden="true" /> Loading available slots…
              </p>
            ) : (
              <div className="max-h-64 space-y-3 overflow-y-auto rounded-xl border border-line bg-slate-50/60 p-3">
                {days.map((day) => (
                  <div key={day.key}>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">{day.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {day.slots.map((s) => (
                        <button
                          key={s.iso}
                          type="button"
                          onClick={() => setSlot(s.iso)}
                          aria-label={`${day.label}, ${s.time} IST`}
                          aria-pressed={slot === s.iso}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 motion-reduce:transform-none motion-reduce:transition-none",
                            slot === s.iso
                              ? "border-brand-600 bg-brand-600 text-white shadow-sm shadow-brand-600/20"
                              : "border-line bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700",
                          )}
                        >
                          {s.time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {chosenSlotLabel && (
              <p className="mt-2 text-sm text-brand-700" role="status" aria-live="polite">
                Selected: <span className="font-semibold">{chosenSlotLabel}</span>
              </p>
            )}

            <Field label="Anything we should prepare? (optional)" htmlFor="message" className="mt-4">
              <Textarea id="message" name="message" placeholder="Your goals, current setup, questions…" />
            </Field>

            <SubmitButton className="mt-2 w-full" pendingText="Requesting…" disabled={!slot}>
              Request this slot
            </SubmitButton>
            {!slot && <p className="mt-2 text-center text-xs text-slate-400">Select a time slot to continue.</p>}
          </>
        )}
      </form>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-[color,background-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 motion-reduce:transform-none motion-reduce:transition-none",
        active
          ? "bg-white text-ink shadow-sm"
          : "text-slate-500 hover:bg-white/60 hover:text-ink active:scale-[0.98]",
      )}
    >
      {icon}
      {children}
    </button>
  );
}
