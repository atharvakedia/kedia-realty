import { AdminShell } from "@/components/admin/AdminShell";
import { LeadsBoard } from "@/components/admin/leads/LeadsBoard";
import { getAdminLeads } from "@/lib/leads";
import { requireAdmin } from "@/lib/projects";
import { leadStatuses, type LeadStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

type AdminLeadsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminLeadsPage({
  searchParams,
}: AdminLeadsPageProps) {
  const [{ status }, profile] = await Promise.all([searchParams, requireAdmin()]);
  const activeStatus = leadStatuses.includes(status as LeadStatus)
    ? (status as LeadStatus)
    : "new";

  const [newLeads, activeLeads, archivedLeads] = await Promise.all([
    getAdminLeads("new"),
    getAdminLeads("active"),
    getAdminLeads("archived"),
  ]);

  const leadsByStatus = {
    new: newLeads,
    active: activeLeads,
    archived: archivedLeads,
  };

  return (
    <AdminShell profile={profile} title="Leads">
      <LeadsBoard
        leads={leadsByStatus[activeStatus]}
        activeStatus={activeStatus}
        counts={{
          new: newLeads.length,
          active: activeLeads.length,
          archived: archivedLeads.length,
        }}
      />
    </AdminShell>
  );
}
