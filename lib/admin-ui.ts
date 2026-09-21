import { cn } from "@/lib/utils";

/**
 * Shared button styling for the admin CMS. Keeping the variants here means the
 * dashboard stays visually consistent and a change to the shape or spacing only
 * has to happen once.
 */
export type AdminButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "muted"
  | "danger";

export type AdminButtonSize = "compact" | "default" | "large";

const adminButtonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold uppercase transition";

const adminButtonSizes: Record<AdminButtonSize, string> = {
  compact: "min-h-10 px-4 text-xs tracking-[0.14em]",
  default: "min-h-11 px-5 text-xs tracking-[0.16em]",
  large: "min-h-12 px-7 text-sm tracking-[0.16em]",
};

const adminButtonVariants: Record<AdminButtonVariant, string> = {
  primary:
    "border border-primary-navy bg-primary-navy text-white shadow-sm shadow-deep-navy/10 hover:border-steel-blue hover:bg-steel-blue",
  secondary:
    "border border-border-gray bg-white text-primary-navy hover:border-primary-navy hover:bg-cool-mist",
  outline:
    "border border-primary-navy bg-white text-primary-navy hover:bg-primary-navy hover:text-white",
  muted:
    "border border-border-gray bg-white text-slate-gray hover:border-primary-navy hover:text-primary-navy",
  danger:
    "border border-border-gray bg-white text-slate-gray hover:border-red-700 hover:text-red-700",
};

export function adminButton(
  variant: AdminButtonVariant = "secondary",
  size: AdminButtonSize = "default",
  className?: string,
) {
  return cn(
    adminButtonBase,
    adminButtonSizes[size],
    adminButtonVariants[variant],
    className,
  );
}

/** Small status pill used in tables and cards. */
export const adminBadge =
  "inline-flex items-center rounded-full border border-border-gray px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-navy";
