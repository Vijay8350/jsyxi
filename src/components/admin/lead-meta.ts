import type { LeadStage } from "@/generated/prisma";

type BadgeTone = "brand" | "green" | "amber" | "red" | "slate" | "blue";

export const LEAD_STAGES: LeadStage[] = ["new", "contacted", "proposal", "won", "lost"];

export const LEAD_STAGE_LABEL: Record<LeadStage, string> = {
  new: "New",
  contacted: "Contacted",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

export const LEAD_STAGE_TONE: Record<LeadStage, BadgeTone> = {
  new: "blue",
  contacted: "amber",
  proposal: "brand",
  won: "green",
  lost: "red",
};

/** Allowed forward transitions (§ CRM): new → contacted → proposal → won | lost. */
export const LEAD_NEXT_STAGES: Record<LeadStage, LeadStage[]> = {
  new: ["contacted", "lost"],
  contacted: ["proposal", "lost"],
  proposal: ["won", "lost"],
  won: [],
  lost: [],
};
