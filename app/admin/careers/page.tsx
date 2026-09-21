import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { CareerApplicationsTable } from "@/components/admin/careers/CareerApplicationsTable";
import { CareerRoleTable } from "@/components/admin/careers/CareerRoleTable";
import { getAdminCareerApplications, getAdminCareerRoles } from "@/lib/careers";
import { adminButton } from "@/lib/admin-ui";
import { requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

type AdminCareersPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function AdminCareersPage({
  searchParams,
}: AdminCareersPageProps) {
  // Roles and applications are fetched together so switching tabs needs no
  // second request.
  const [{ tab }, profile, roles, applications] = await Promise.all([
    searchParams,
    requireAdmin(),
    getAdminCareerRoles(),
    getAdminCareerApplications(),
  ]);

  return (
    <AdminShell profile={profile} title="Careers">
      <AdminTabs
        label="Careers sections"
        queryKey="tab"
        initialTabId={tab === "applications" ? "applications" : "roles"}
        items={[
          {
            id: "roles",
            title: "Open Roles",
            count: roles.length,
            action: (
              <Link
                href="/admin/careers/new"
                className={adminButton("primary", "large")}
              >
                New Role
              </Link>
            ),
            panel: <CareerRoleTable roles={roles} />,
          },
          {
            id: "applications",
            title: "Applications",
            count: applications.length,
            panel: <CareerApplicationsTable applications={applications} />,
          },
        ]}
      />
    </AdminShell>
  );
}
