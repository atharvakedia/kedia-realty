import Link from "next/link";

import { deleteCareerRoleAction } from "@/app/admin/careers/actions";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import type { CareerRole } from "@/lib/types";
import { adminBadge, adminButton } from "@/lib/admin-ui";

export function CareerRoleTable({ roles }: { roles: CareerRole[] }) {
  if (roles.length === 0) {
    return (
      <div className="rounded-lg border border-border-gray bg-white p-8 text-sm leading-7 text-slate-gray">
        No career roles have been created yet.
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border-gray bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-gray text-left text-sm">
          <thead className="bg-cool-mist text-xs uppercase tracking-[0.16em] text-primary-navy">
            <tr>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Department</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {roles.map((role) => (
              <tr key={role.id} className="align-top">
                <td className="px-5 py-5">
                  <p className="font-semibold text-charcoal-text">{role.title}</p>
                  <p className="mt-1 text-xs text-slate-gray">{role.employmentType}</p>
                </td>
                <td className="px-5 py-5 text-slate-gray">{role.department}</td>
                <td className="px-5 py-5 text-slate-gray">{role.location}</td>
                <td className="px-5 py-5">
                  <span className={adminBadge}>
                    {role.isOpen ? "Open" : "Closed"}
                  </span>
                </td>
                <td className="px-5 py-5 text-slate-gray">
                  {role.createdAt
                    ? new Intl.DateTimeFormat("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        timeZone: "Asia/Kolkata",
                      }).format(new Date(role.createdAt))
                    : "New"}
                </td>
                <td className="px-5 py-5">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/careers/${role.id}/edit`}
                      className={adminButton("outline", "compact")}
                    >
                      Edit
                    </Link>
                    <form action={deleteCareerRoleAction}>
                      <input type="hidden" name="id" value={role.id} />
                      <AdminSubmitButton
                        label="Delete"
                        pendingLabel="Deleting"
                        className={adminButton("danger", "compact")}
                      />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
