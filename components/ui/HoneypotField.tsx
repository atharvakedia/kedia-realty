import { HONEYPOT_FIELD } from "@/lib/forms";

/**
 * Invisible anti-spam field. Real users never see or fill it; bots that
 * auto-complete every input do, and the server action silently drops those
 * submissions. Kept out of the tab order and hidden from assistive tech.
 */
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
    >
      <label>
        Company website
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
    </div>
  );
}
