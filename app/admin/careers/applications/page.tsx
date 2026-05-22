import { AdminShell } from "@/components/admin/AdminShell";
import { CareersAdminTabs } from "@/components/admin/careers/CareersAdminTabs";
import { CareerApplicationsTable } from "@/components/admin/careers/CareerApplicationsTable";
import { getAdminCareerApplications, getAdminCareerRoles } from "@/lib/careers";
import { requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminCareerApplicationsPage() {
  const profile = await requireAdmin();
  const [roles, applications] = await Promise.all([
    getAdminCareerRoles(),
    getAdminCareerApplications(),
  ]);

  return (
    <AdminShell profile={profile} title="Career applications">
      <div className="mb-6">
        <CareersAdminTabs
          activeId="applications"
          rolesCount={roles.length}
          applicationsCount={applications.length}
        />
      </div>
      <CareerApplicationsTable applications={applications} />
    </AdminShell>
  );
}
