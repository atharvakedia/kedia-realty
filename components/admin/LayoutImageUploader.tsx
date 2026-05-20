"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import {
  createSupabaseBrowserClient,
  hasSupabaseEnv,
} from "@/lib/supabase/client";

type LayoutImageUploaderProps = {
  value: string;
  onChange: (value: string) => void;
  projectSlug: string;
  layoutIndex: number;
};

const bucketName = "project-images";

function storagePathFromPublicUrl(url: string) {
  const marker = `/storage/v1/object/public/${bucketName}/`;
  const markerIndex = url.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return decodeURIComponent(url.slice(markerIndex + marker.length));
}

function safeFileName(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";
  const name = fileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);

  return `${name || "layout-plan"}.${extension}`;
}

export function LayoutImageUploader({
  value,
  onChange,
  projectSlug,
  layoutIndex,
}: LayoutImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const canUpload = hasSupabaseEnv();

  const uploadFile = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      return;
    }

    if (!canUpload) {
      setMessage("Supabase environment variables are required for uploads.");
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.round(Math.random() * 100000)}`;
      const projectFolder = projectSlug || "draft-project";
      const path = `layouts/${projectFolder}/layout-${layoutIndex + 1}/${id}-${safeFileName(file.name)}`;
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(path, file, {
          cacheControl: "31536000",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
      onChange(data.publicUrl);
      setMessage("Layout image uploaded.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to upload layout image.",
      );
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const removeImage = async () => {
    const previousValue = value;
    onChange("");

    if (!canUpload) {
      return;
    }

    const path = storagePathFromPublicUrl(previousValue);

    if (!path) {
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.storage.from(bucketName).remove([path]);
    } catch {
      setMessage("The layout image was removed here, but storage deletion failed.");
    }
  };

  return (
    <div className="grid gap-3 md:col-span-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
            Layout image
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-gray">
            Upload a plan image. No image URL is needed.
          </p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading || !canUpload}
          className="min-h-10 border border-primary-navy bg-primary-navy px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-steel-blue disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => uploadFile(event.target.files?.[0])}
      />

      {value ? (
        <div className="border border-border-gray bg-white p-3">
          <div className="relative aspect-[16/10] overflow-hidden bg-cool-mist">
            <Image
              src={value}
              alt={`Layout ${layoutIndex + 1} image preview`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="mt-3 min-h-9 border border-border-gray px-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-gray transition hover:border-red-300 hover:text-red-700"
          >
            Delete image
          </button>
        </div>
      ) : (
        <div className="border border-dashed border-border-gray bg-white p-5 text-sm leading-7 text-slate-gray">
          No layout image uploaded yet.
        </div>
      )}

      {!canUpload ? (
        <p className="text-xs leading-6 text-red-700">
          Configure Supabase environment variables before uploading layout images.
        </p>
      ) : null}
      {message ? (
        <p className="text-xs leading-6 text-slate-gray">{message}</p>
      ) : null}
    </div>
  );
}
