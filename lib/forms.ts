export const HONEYPOT_FIELD = "company_website";

export const FIELD_LIMITS = {
  name: 120,
  email: 254,
  phone: 20,
  shortText: 200,
  url: 500,
  message: 3000,
} as const;

export function formText(formData: FormData, key: string, maxLength = 1000) {
  const value = formData.get(key);
  const text = typeof value === "string" ? value : "";

  return text.replace(/\0/g, "").trim().slice(0, maxLength);
}

/**
 * Honeypot check. The field is hidden from humans via CSS and has autocomplete
 * disabled, so anything that fills it in is automated. Return a fake success
 * to the caller so the bot cannot tell it was caught.
 */
export function isHoneypotTripped(formData: FormData) {
  const value = formData.get(HONEYPOT_FIELD);
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidEmail(value: string) {
  return (
    value.length <= FIELD_LIMITS.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

export function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function wordCount(value: string) {
  return value.split(/\s+/).filter(Boolean).length;
}
