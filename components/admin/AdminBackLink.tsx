import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
      className={`inline-flex min-h-11 items-center gap-2 border border-border-gray bg-white px-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy transition hover:border-primary-navy hover:bg-cool-mist ${className}`}
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
