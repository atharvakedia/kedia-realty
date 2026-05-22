"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateLeadStatus } from "@/lib/leads";
import { leadStatuses, type LeadStatus } from "@/lib/types";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateLeadStatusAction(formData: FormData) {
  const id = text(formData, "id");
  const status = text(formData, "status");
  const currentStatus = text(formData, "currentStatus");
  const nextStatus = leadStatuses.includes(status as LeadStatus)
    ? (status as LeadStatus)
    : "active";

  await updateLeadStatus(id, nextStatus);
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect(`/admin/leads?status=${currentStatus || nextStatus}`);
}
