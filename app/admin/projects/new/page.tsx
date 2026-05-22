import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProjectAction } from "@/app/admin/projects/actions";
import { requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const profile = await requireAdmin();

  return (
    <AdminShell profile={profile} title="New project" eyebrow="Project management">
      <div className="mb-6">
        <AdminBackLink href="/admin/projects" label="Back to projects" />
      </div>
      <ProjectForm action={createProjectAction} submitLabel="Create project" />
    </AdminShell>
  );
}
