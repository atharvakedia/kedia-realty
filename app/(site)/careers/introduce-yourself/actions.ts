"use server";

import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { submitCareerApplication } from "@/lib/careers";
import {
  FIELD_LIMITS,
  formText,
  isHoneypotTripped,
  isValidEmail,
  isValidHttpUrl,
  wordCount,
} from "@/lib/forms";
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

const SUCCESS_MESSAGE =
  "Your application has been received. Our team will review it and get back to you if there is a fit.";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;

// Must stay in sync with the `career-resumes` bucket's allowed_mime_types in
// supabase/schema.sql. Extension + MIME are both checked because browsers set
// the MIME from the extension and attackers set it to whatever they like.
const ALLOWED_RESUME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function resumeContentType(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const expected = ALLOWED_RESUME_TYPES[extension];

  if (!expected) {
    return null;
  }

  // Some browsers send an empty or generic type for .doc/.docx; trust the
  // extension in that case, but reject a declared type that contradicts it.
  const declared = file.type.toLowerCase();
  if (declared && declared !== "application/octet-stream" && declared !== expected) {
    return null;
  }

  return expected;
}

async function uploadResume(file: File, contentType: string, candidateName: string) {
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
      contentType,
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
  if (isHoneypotTripped(formData)) {
    return { success: SUCCESS_MESSAGE };
  }

  const candidateName = formText(formData, "candidateName", FIELD_LIMITS.name);
  const email = formText(formData, "email", FIELD_LIMITS.email);
  const phone = formText(formData, "phone", FIELD_LIMITS.phone).replace(/\D/g, "");
  const roleTitle = formText(formData, "roleTitle", FIELD_LIMITS.shortText);
  const roleId = formText(formData, "roleId", 64);
  const expectedSalary = formText(formData, "expectedSalary", FIELD_LIMITS.shortText);
  const portfolioUrl = formText(formData, "portfolioUrl", FIELD_LIMITS.url);
  const message = formText(formData, "message", FIELD_LIMITS.message);
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
  } else if (!isValidEmail(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!phone) {
    fieldErrors.phone = "Phone is required.";
  } else if (!/^\d{10}$/.test(phone)) {
    fieldErrors.phone = "Phone number must be exactly 10 digits.";
  }

  if (!roleTitle) {
    fieldErrors.roleTitle = "Role is required.";
  }

  if (roleId && !/^[0-9a-f-]{36}$/i.test(roleId)) {
    fieldErrors.roleTitle = "Please choose a valid role.";
  }

  if (portfolioUrl && !isValidHttpUrl(portfolioUrl)) {
    fieldErrors.portfolioUrl = "Portfolio must be a valid http(s) link.";
  }

  if (!message) {
    fieldErrors.message = "Introduce yourself is required.";
  } else if (wordCount(message) > 200) {
    fieldErrors.message = "Introduce yourself must be 200 words or fewer.";
  }

  let contentType: string | null = null;

  if (!resumeFile || resumeFile.size === 0) {
    fieldErrors.resume = "Resume is required.";
  } else if (resumeFile.size > MAX_RESUME_BYTES) {
    fieldErrors.resume = "Resume must be 10MB or smaller.";
  } else {
    contentType = resumeContentType(resumeFile);
    if (!contentType) {
      fieldErrors.resume = "Resume must be a PDF, DOC, or DOCX file.";
    }
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
    const resumeUrl = await uploadResume(
      resumeFile as File,
      contentType as string,
      candidateName,
    );
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
    console.error("Career application submission failed", error);
    return {
      error:
        "Unable to submit your application right now. Please try again shortly.",
      values,
    };
  }

  return { success: SUCCESS_MESSAGE };
}
