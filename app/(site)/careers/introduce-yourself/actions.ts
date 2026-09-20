"use server";

import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { submitCareerApplication } from "@/lib/careers";
import { formText, isValidEmail, wordCount } from "@/lib/forms";
import { careerResumesBucket, createStorageObjectName } from "@/lib/storage";

export type CareerApplicationActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
  values?: {
    candidateName?: string;
    email?: string;
    phone?: string;
    roleTitle?: string;
    expectedSalary?: string;
    portfolioUrl?: string;
    message?: string;
  };
};

async function uploadResume(file: File, candidateName: string) {
  if (!hasSupabaseEnv()) {
    return "local-development-resume";
  }

  const supabase = await createSupabaseServerClient();
  const path = `${new Date().getFullYear()}/${createStorageObjectName(
    file.name,
    candidateName || "resume",
  )}`;

  const { data, error } = await supabase.storage
    .from(careerResumesBucket)
    .upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data.path;
}

export async function submitCareerApplicationAction(
  _previousState: CareerApplicationActionState,
  formData: FormData,
): Promise<CareerApplicationActionState> {
  const candidateName = formText(formData, "candidateName");
  const email = formText(formData, "email");
  const phone = formText(formData, "phone").replace(/\D/g, "");
  const roleTitle = formText(formData, "roleTitle");
  const roleId = formText(formData, "roleId");
  const expectedSalary = formText(formData, "expectedSalary");
  const portfolioUrl = formText(formData, "portfolioUrl");
  const message = formText(formData, "message");
  const resume = formData.get("resume");
  const resumeFile = resume instanceof File ? resume : null;
  const values = {
    candidateName,
    email,
    phone,
    roleTitle,
    expectedSalary,
    portfolioUrl,
    message,
  };
  const fieldErrors: Record<string, string> = {};

  if (!candidateName) {
    fieldErrors.candidateName = "Name is required.";
  }

  if (!email) {
    fieldErrors.email = "Email is required.";
  }

  if (!phone) {
    fieldErrors.phone = "Phone is required.";
  }

  if (!roleTitle) {
    fieldErrors.roleTitle = "Role is required.";
  }

  if (!message) {
    fieldErrors.message = "Introduce yourself is required.";
  }

  if (!isValidEmail(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!/^\d{10}$/.test(phone)) {
    fieldErrors.phone = "Phone number must be exactly 10 digits.";
  }

  if (wordCount(message) > 200) {
    fieldErrors.message = "Introduce yourself must be 200 words or fewer.";
  }

  if (!resumeFile || resumeFile.size === 0) {
    fieldErrors.resume = "Resume is required.";
  } else if (resumeFile.size > 10 * 1024 * 1024) {
    fieldErrors.resume = "Resume must be 10MB or smaller.";
  }

  const firstError = Object.values(fieldErrors)[0];

  if (firstError) {
    return {
      error: firstError,
      fieldErrors,
      values,
    };
  }

  try {
    const resumeUrl = await uploadResume(resumeFile as File, candidateName);
    await submitCareerApplication({
      roleId,
      roleTitle,
      candidateName,
      email,
      phone,
      city: "Not provided",
      experience: "Not provided",
      expectedSalary,
      resumeUrl,
      portfolioUrl,
      message,
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Unable to submit your application.",
      values,
    };
  }

  return {
    success:
      "Your application has been received. Our team will review it and get back to you if there is a fit.",
  };
}
