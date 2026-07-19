import { z } from "zod";
import { LIMITS } from "@/lib/settings";

export const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email");
export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters")
  .max(200, "Password too long");

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(LIMITS.NAME_MAX),
  email: emailSchema,
  password: passwordSchema,
  workspaceName: z.string().trim().min(1, "Enter a workspace name").max(LIMITS.NAME_MAX).optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password"),
});

export const forgotSchema = z.object({ email: emailSchema });

export const resetSchema = z.object({
  token: z.string().min(10),
  password: passwordSchema,
});

export const totpSchema = z.object({ code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code") });

// Lead / contact capture (public forms)
export const leadSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(LIMITS.NAME_MAX),
  email: emailSchema,
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(LIMITS.LONG_MAX).optional().or(z.literal("")),
  serviceTopic: z.string().trim().max(80).optional().or(z.literal("")),
  source: z.enum(["quote", "consultation", "chat", "whatsapp", "lead_magnet", "request_upgrade"]).default("quote"),
  scheduledSlot: z.string().datetime().optional().or(z.literal("")),
  requestKey: z.string().min(6).max(120),
});

export const widgetCreateSchema = z.object({
  toolKey: z.string().min(1),
  name: z.string().trim().min(1).max(LIMITS.NAME_MAX),
  templateId: z.string().optional(),
});

export const widgetRenameSchema = z.object({
  widgetId: z.string().min(1),
  name: z.string().trim().min(1).max(LIMITS.NAME_MAX),
});

export const ticketSchema = z.object({
  subject: z.string().trim().min(1, "Enter a subject").max(LIMITS.NAME_MAX),
  body: z.string().trim().min(1, "Describe your issue").max(LIMITS.LONG_MAX),
});

export const ticketReplySchema = z.object({
  ticketId: z.string().min(1),
  body: z.string().trim().min(1, "Enter a message").max(LIMITS.LONG_MAX),
});

// Profile & security (E1)
export const profileNameSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(LIMITS.NAME_MAX),
});

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password"),
  newPassword: passwordSchema,
});

export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
