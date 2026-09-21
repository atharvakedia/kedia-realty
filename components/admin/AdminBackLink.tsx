import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { adminButton } from "@/lib/admin-ui";

export function AdminBackLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={adminButton("secondary", "default", className)}
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
