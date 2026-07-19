import Link from "next/link";
import type { Metadata } from "next";
import { Search } from "lucide-react";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import type { Prisma } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/misc";
import { PageHeader, TableCard, AccessDenied } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Workspaces" };

export default async function WorkspacesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "workspaces")) return <AccessDenied section="workspaces" />;

  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const where: Prisma.WorkspaceWhereInput = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
          { owner: { email: { contains: query, mode: "insensitive" } } },
        ],
      }
    : {};

  const workspaces = await prisma.workspace.findMany({
    where,
    include: { owner: true, plan: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Workspaces" description="All tenant workspaces across the platform." />

      <form method="get" className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input name="q" defaultValue={query} placeholder="Search by name, slug or owner email…" className="pl-9" />
        </div>
        <Button type="submit" variant="secondary">Search</Button>
      </form>

      {workspaces.length === 0 ? (
        <TableCard>
          <EmptyState title="No workspaces found" description={query ? `Nothing matched “${query}”.` : "Workspaces will appear here."} />
        </TableCard>
      ) : (
        <TableCard>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Workspace</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Plan</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {workspaces.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/workspaces/${w.id}`} className="font-medium text-brand-600 hover:text-brand-700">
                      {w.name}
                    </Link>
                    <div className="text-xs text-slate-400">/{w.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{w.owner.email}</td>
                  <td className="px-4 py-3">
                    <Badge tone={w.plan.isFree ? "slate" : "brand"}>{w.plan.name}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={w.status === "active" ? "green" : "amber"}>{w.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatInTz(w.createdAt, w.timezone, "dd LLL yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      )}
    </div>
  );
}
