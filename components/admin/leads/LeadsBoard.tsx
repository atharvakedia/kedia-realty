import { updateLeadStatusAction } from "@/app/admin/leads/actions";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { adminBadge, adminButton } from "@/lib/admin-ui";
import { leadStatuses, type Lead, type LeadStatus } from "@/lib/types";

function labelForStatus(status: LeadStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

/** Renders the leads for a single status. Tab switching lives in AdminTabs. */
export function LeadsBoard({
  leads,
  status,
}: {
  leads: Lead[];
  status: LeadStatus;
}) {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-border-gray bg-white p-8 text-sm leading-7 text-slate-gray">
        No {status} leads yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {leads.map((lead) => (
        <article key={lead.id} className="rounded-lg border border-border-gray bg-white p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl text-charcoal-text">
                  {lead.name}
                </h2>
                <span className={adminBadge}>{labelForStatus(lead.status)}</span>
              </div>
              <dl className="mt-5 grid gap-3 text-sm text-slate-gray md:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                    Phone
                  </dt>
                  <dd className="mt-1">{lead.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                    Email
                  </dt>
                  <dd className="mt-1">{lead.email || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                    Received
                  </dt>
                  <dd className="mt-1">
                    {new Intl.DateTimeFormat("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(lead.createdAt))}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-sm leading-7 text-charcoal-text">
                {lead.message}
              </p>
            </div>

            <div className="grid content-start gap-3 lg:min-w-48">
              {leadStatuses
                .filter((target) => target !== lead.status)
                .map((target) => (
                  <form key={target} action={updateLeadStatusAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="status" value={target} />
                    <input type="hidden" name="currentStatus" value={status} />
                    <AdminSubmitButton
                      label={`Move to ${labelForStatus(target)}`}
                      pendingLabel="Moving"
                      className={adminButton("muted", "default", "w-full")}
                    />
                  </form>
                ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
