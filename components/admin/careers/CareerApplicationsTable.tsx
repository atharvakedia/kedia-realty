import { deleteCareerApplicationAction } from "@/app/admin/careers/actions";
import type { CareerApplication } from "@/lib/types";

export function CareerApplicationsTable({
  applications,
}: {
  applications: CareerApplication[];
}) {
  if (applications.length === 0) {
    return (
      <div className="border border-border-gray bg-white p-8 text-sm leading-7 text-slate-gray">
        No applications have been submitted yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {applications.map((application) => (
        <article key={application.id} className="border border-border-gray bg-white p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl text-charcoal-text">
                  {application.candidateName}
                </h2>
                <span className="border border-border-gray px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-navy">
                  {application.status}
                </span>
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
                className="inline-flex min-h-11 items-center justify-center border border-primary-navy px-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-navy transition hover:bg-primary-navy hover:text-white"
              >
                View resume
              </a>
              {application.portfolioUrl ? (
                <a
                  href={application.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-border-gray px-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-gray transition hover:border-primary-navy hover:text-primary-navy"
                >
                  Portfolio
                </a>
              ) : null}
              <form action={deleteCareerApplicationAction}>
                <input type="hidden" name="id" value={application.id} />
                <button
                  type="submit"
                  className="inline-flex min-h-11 w-full items-center justify-center border border-border-gray px-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-gray transition hover:border-red-700 hover:text-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
