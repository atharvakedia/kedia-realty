import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { CareersAdminTabs } from "@/components/admin/careers/CareersAdminTabs";
import { CareerRoleTable } from "@/components/admin/careers/CareerRoleTable";
import { getAdminCareerApplications, getAdminCareerRoles } from "@/lib/careers";
import { requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const profile = await requireAdmin();
  const [roles, applications] = await Promise.all([
    getAdminCareerRoles(),
    getAdminCareerApplications(),
  ]);

  return (
    <AdminShell profile={profile} title="Careers">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <CareersAdminTabs
          activeId="roles"
          rolesCount={roles.length}
          applicationsCount={applications.length}
        />
        <Link
          href="/admin/careers/new"
          className="inline-flex min-h-11 shrink-0 items-center justify-center bg-primary-navy px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-steel-blue"
        >
          New Role
        </Link>
      </div>
      <CareerRoleTable roles={roles} />
    </AdminShell>
  );
}
