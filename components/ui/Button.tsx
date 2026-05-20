import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "text";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-navy text-white hover:bg-steel-blue focus-visible:outline-primary-navy",
  secondary:
    "border border-border-gray text-charcoal-text hover:border-primary-navy hover:text-primary-navy focus-visible:outline-primary-navy",
  text: "px-0 text-primary-navy underline-offset-8 hover:text-steel-blue hover:underline focus-visible:outline-primary-navy",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-medium tracking-[0.08em] uppercase transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
