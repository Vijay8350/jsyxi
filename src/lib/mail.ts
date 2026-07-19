import { prisma } from "@/lib/db";
import type { NotificationChannel } from "@/generated/prisma";

// Transactional email (§8). INC-1 dev transport = "log": prints to console and, when a
// recipient user is known, records an in-app Notification with an email channel marker.
// Non-blocking (A1-15): failures never block the primary action.

type SendInput = {
  to: string;
  subject: string;
  body: string;
  templateKey: string;
  recipientUserId?: string;
  channels?: NotificationChannel[];
  linkHref?: string;
  blocking?: boolean;
};

export async function sendMail(input: SendInput): Promise<void> {
  const transport = process.env.MAIL_TRANSPORT ?? "log";
  try {
    if (transport === "log") {
      // eslint-disable-next-line no-console
      console.log(
        `\n[mail:${input.templateKey}] → ${input.to}\n  subject: ${input.subject}\n  ${input.body.replace(/\n/g, "\n  ")}\n`,
      );
    }
    if (input.recipientUserId) {
      await prisma.notification.create({
        data: {
          recipientUserId: input.recipientUserId,
          kind: input.templateKey,
          channelSet: input.channels ?? ["in_app", "email"],
          subject: input.subject,
          body: input.body,
          linkHref: input.linkHref,
          blocking: input.blocking ?? false,
          emailSentAt: new Date(),
        },
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[mail] send failed (non-blocking):", err);
  }
}

/** In-app-only notification (no email leg). */
export async function notify(input: {
  recipientUserId: string;
  kind: string;
  subject?: string;
  body: string;
  linkHref?: string;
  blocking?: boolean;
}): Promise<void> {
  try {
    await prisma.notification.create({
      data: {
        recipientUserId: input.recipientUserId,
        kind: input.kind,
        channelSet: ["in_app"],
        subject: input.subject,
        body: input.body,
        linkHref: input.linkHref,
        blocking: input.blocking ?? false,
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[notify] failed (non-blocking):", err);
  }
}
