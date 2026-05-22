import { createCareerRoleAction } from "@/app/admin/careers/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CareerRoleForm } from "@/components/admin/careers/CareerRoleForm";
import { requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function NewCareerRolePage() {
  const profile = await requireAdmin();

  return (
    <AdminShell profile={profile} title="New career role">
      <CareerRoleForm action={createCareerRoleAction} submitLabel="Create role" />
    </AdminShell>
  );
}
