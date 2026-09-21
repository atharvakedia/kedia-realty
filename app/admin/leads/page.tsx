import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { LeadsBoard } from "@/components/admin/leads/LeadsBoard";
import { getAdminLeads } from "@/lib/leads";
import { requireAdmin } from "@/lib/projects";
import { leadStatuses, type LeadStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

type AdminLeadsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

function labelForStatus(status: LeadStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default async function AdminLeadsPage({
  searchParams,
}: AdminLeadsPageProps) {
  // One query returns every lead; the three status panels are built from it so
  // switching tabs never hits the server again.
  const [{ status }, profile, leads] = await Promise.all([
    searchParams,
    requireAdmin(),
    getAdminLeads(),
  ]);

  const leadsByStatus = {
    new: leads.filter((lead) => lead.status === "new"),
    active: leads.filter((lead) => lead.status === "active"),
    archived: leads.filter((lead) => lead.status === "archived"),
  } satisfies Record<LeadStatus, typeof leads>;

  return (
    <AdminShell profile={profile} title="Leads">
      <AdminTabs
        label="Lead statuses"
        queryKey="status"
        initialTabId={
          leadStatuses.includes(status as LeadStatus) ? (status as string) : "new"
        }
        items={leadStatuses.map((leadStatus) => ({
          id: leadStatus,
          title: labelForStatus(leadStatus),
          count: leadsByStatus[leadStatus].length,
          panel: (
            <LeadsBoard leads={leadsByStatus[leadStatus]} status={leadStatus} />
          ),
        }))}
      />
    </AdminShell>
  );
}
