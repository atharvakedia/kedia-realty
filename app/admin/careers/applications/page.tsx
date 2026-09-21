import { redirect } from "next/navigation";

/**
 * Applications now live in a tab on /admin/careers, where both datasets load
 * together. This route is kept so existing links and bookmarks still work.
 */
export default function AdminCareerApplicationsPage() {
  redirect("/admin/careers?tab=applications");
}
