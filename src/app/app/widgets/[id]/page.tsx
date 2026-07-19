import { notFound } from "next/navigation";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { Builder } from "@/components/builder/builder";
import type { ToolConfigSchema } from "@/lib/tools/types";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

export default async function BuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const ctx = await requireWorkspaceContext();
  const { id } = await params;
  const widget = await prisma.widget.findUnique({ where: { id }, include: { tool: true } });
  if (!widget || widget.workspaceId !== ctx.workspace.id || widget.lifecycleState === "purged") notFound();

  return (
    <Builder
      widgetId={widget.id}
      initialName={widget.name}
      toolKey={widget.tool.key}
      toolName={widget.tool.name}
      schema={widget.tool.configSchema as unknown as ToolConfigSchema}
      initialConfig={widget.draftConfig as Record<string, unknown>}
      initialVersion={widget.configVersion}
      initialStatus={widget.lifecycleState}
      embedKey={widget.embedKey}
      allowedDomains={widget.allowedDomains}
      appUrl={APP_URL}
    />
  );
}
