"use server";

import { createContactLead } from "@/lib/leads";
import { formText, isValidEmail } from "@/lib/forms";

export type ContactActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
  values?: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
};

export async function submitContactLeadAction(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = formText(formData, "name");
  const email = formText(formData, "email");
  const phone = formText(formData, "phone").replace(/\D/g, "");
  const message = formText(formData, "message");
  const values = { name, email, phone, message };
  const fieldErrors: Record<string, string> = {};

  if (!name) {
    fieldErrors.name = "Name is required.";
  }

  if (!phone) {
    fieldErrors.phone = "Phone is required.";
  } else if (!/^\d{10}$/.test(phone)) {
    fieldErrors.phone = "Phone number must be exactly 10 digits.";
  }

  if (email && !isValidEmail(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!message) {
    fieldErrors.message = "Please tell us how we can help.";
  }

  const firstError = Object.values(fieldErrors)[0];

  if (firstError) {
    return { error: firstError, fieldErrors, values };
  }

  try {
    await createContactLead({ name, email, phone, message });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Unable to submit your inquiry.",
      values,
    };
  }

  return {
    success:
      "Your inquiry has been received. Our team will get back to you shortly.",
  };
}
