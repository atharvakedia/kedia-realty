"use client";

import { useFormStatus } from "react-dom";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type AdminSubmitButtonProps = {
  className: string;
  label: string;
  pendingLabel: string;
};

export function AdminSubmitButton({
  className,
  label,
  pendingLabel,
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`${className} disabled:cursor-wait disabled:opacity-60`}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {pending ? <LoadingSpinner /> : null}
        {pending ? pendingLabel : label}
      </span>
    </button>
  );
}
