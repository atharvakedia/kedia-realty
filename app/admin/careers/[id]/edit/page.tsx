import { notFound } from "next/navigation";

import { updateCareerRoleAction } from "@/app/admin/careers/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { CareerRoleForm } from "@/components/admin/careers/CareerRoleForm";
import { getAdminCareerRoleById } from "@/lib/careers";
import { requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

type EditCareerRolePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCareerRolePage({
  params,
}: EditCareerRolePageProps) {
  const [{ id }, profile] = await Promise.all([params, requireAdmin()]);
  const role = await getAdminCareerRoleById(id);

  if (!role) {
    notFound();
  }

  return (
    <AdminShell profile={profile} title="Edit career role">
      <CareerRoleForm
        action={updateCareerRoleAction.bind(null, id)}
        role={role}
        submitLabel="Save role"
      />
    </AdminShell>
  );
}
