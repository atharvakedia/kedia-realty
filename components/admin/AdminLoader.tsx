import { cn } from "@/lib/utils";

/** Three-bar activity indicator. Admin-only; the public site uses LoadingSpinner. */
export function AdminLoader({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("admin-loader", className)} />;
}

/**
 * Full-screen loading state for admin route transitions, so navigating between
 * dashboard pages shows an intentional loader rather than an empty screen.
 */
export function AdminLoadingOverlay({ message = "Loading" }: { message?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 bg-soft-white px-6"
    >
      <AdminLoader />
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-navy">
        {message}
      </p>
      <span className="sr-only">Loading, please wait.</span>
    </div>
  );
}
