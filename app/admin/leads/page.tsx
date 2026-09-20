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
  const [{ status }, profile, leads] = await Promise.all([
    searchParams,
    requireAdmin(),
    getAdminLeads(),
  ]);
  const activeStatus = leadStatuses.includes(status as LeadStatus)
    ? (status as LeadStatus)
    : "new";

  const leadsByStatus = {
    new: leads.filter((lead) => lead.status === "new"),
    active: leads.filter((lead) => lead.status === "active"),
    archived: leads.filter((lead) => lead.status === "archived"),
  };

  return (
    <AdminShell profile={profile} title="Leads">
      <LeadsBoard
        leads={leadsByStatus[activeStatus]}
        activeStatus={activeStatus}
        counts={{
          new: leadsByStatus.new.length,
          active: leadsByStatus.active.length,
          archived: leadsByStatus.archived.length,
        }}
      />
    </AdminShell>
  );
}
