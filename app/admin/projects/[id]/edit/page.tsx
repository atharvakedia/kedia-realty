import { notFound } from "next/navigation";

import { updateProjectAction } from "@/app/admin/projects/actions";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getAdminProjectById, requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const [profile, project] = await Promise.all([
    requireAdmin(),
    getAdminProjectById(id),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <AdminShell profile={profile} title={`Edit ${project.title}`} eyebrow="Project management">
      <div className="mb-6">
        <AdminBackLink href="/admin/projects" label="Back to projects" />
      </div>
      <ProjectForm
        action={updateProjectAction.bind(null, id)}
        project={project}
        submitLabel="Save project"
      />
    </AdminShell>
  );
}
