import { deleteCareerApplicationAction } from "@/app/admin/careers/actions";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import type { CareerApplication } from "@/lib/types";
import { adminBadge, adminButton } from "@/lib/admin-ui";

export function CareerApplicationsTable({
  applications,
}: {
  applications: CareerApplication[];
}) {
  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-border-gray bg-white p-8 text-sm leading-7 text-slate-gray">
        No applications have been submitted yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {applications.map((application) => (
        <article key={application.id} className="rounded-lg border border-border-gray bg-white p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl text-charcoal-text">
                  {application.candidateName}
                </h2>
                <span className={adminBadge}>{application.status}</span>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-gray">
                Applying for {application.roleTitle}
              </p>
              <dl className="mt-5 grid gap-3 text-sm text-slate-gray md:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                    Email
                  </dt>
                  <dd className="mt-1">{application.email}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                    Phone
                  </dt>
                  <dd className="mt-1">{application.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                    Expected Salary
                  </dt>
                  <dd className="mt-1">{application.expectedSalary || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                    Submitted
                  </dt>
                  <dd className="mt-1">
                    {new Intl.DateTimeFormat("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(application.createdAt))}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-sm leading-7 text-charcoal-text">
                {application.message}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:min-w-52">
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className={adminButton("outline")}
              >
                View resume
              </a>
              {application.portfolioUrl ? (
                <a
                  href={application.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={adminButton("muted")}
                >
                  Portfolio
                </a>
              ) : null}
              <form action={deleteCareerApplicationAction}>
                <input type="hidden" name="id" value={application.id} />
                <AdminSubmitButton
                  label="Delete"
                  pendingLabel="Deleting"
                  className={adminButton("danger", "default", "w-full")}
                />
              </form>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
