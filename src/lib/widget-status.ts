import type { WidgetLifecycle } from "@/generated/prisma";

type Tone = "brand" | "green" | "amber" | "red" | "slate" | "blue";

export const WIDGET_STATUS: Record<WidgetLifecycle, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "slate" },
  published_active: { label: "Live", tone: "green" },
  published_suspended: { label: "Suspended", tone: "amber" },
  unpublished: { label: "Unpublished", tone: "slate" },
  soft_deleted: { label: "In trash", tone: "red" },
  purged: { label: "Deleted", tone: "red" },
};

export function widgetStatus(state: WidgetLifecycle) {
  return WIDGET_STATUS[state] ?? { label: state, tone: "slate" as Tone };
}
