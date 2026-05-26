export function formText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function wordCount(value: string) {
  return value.split(/\s+/).filter(Boolean).length;
}
