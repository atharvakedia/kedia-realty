"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import {
  createSupabaseBrowserClient,
  hasSupabaseEnv,
} from "@/lib/supabase/client";

type ProjectImageManagerProps = {
  initialImages?: string[];
  slug: string;
};

const bucketName = "project-images";

function uniqueImages(images: string[]) {
  return Array.from(
    new Set(images.map((image) => image.trim()).filter(Boolean)),
  );
}

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

  return `${name || "project-image"}.${extension}`;
}

export function ProjectImageManager({
  initialImages = [],
  slug,
}: ProjectImageManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState(() => uniqueImages(initialImages));
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const canUpload = hasSupabaseEnv();

  const galleryValue = useMemo(() => images.slice(1).join("\n"), [images]);

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) {
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
      const projectFolder = slug || "draft-project";
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          continue;
        }

        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.round(Math.random() * 100000)}`;
        const path = `projects/${projectFolder}/${id}-${safeFileName(file.name)}`;
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
        uploadedUrls.push(data.publicUrl);
      }

      setImages((current) => uniqueImages([...current, ...uploadedUrls]));
      setMessage(
        uploadedUrls.length
          ? `${uploadedUrls.length} image${uploadedUrls.length === 1 ? "" : "s"} uploaded.`
          : "No valid image files were selected.",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to upload images.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const removeImage = async (image: string) => {
    setImages((current) => current.filter((item) => item !== image));

    if (!canUpload) {
      return;
    }

    const path = storagePathFromPublicUrl(image);

    if (!path) {
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.storage.from(bucketName).remove([path]);
    } catch {
      setMessage("The image was removed from this project, but storage deletion failed.");
    }
  };

  const makeCover = (image: string) => {
    setImages((current) => [image, ...current.filter((item) => item !== image)]);
  };

  return (
    <div className="grid gap-5">
      <input type="hidden" name="mainImage" value={images[0] ?? ""} />
      <input type="hidden" name="gallery" value={galleryValue} />

      <div className="border border-dashed border-border-gray bg-cool-mist p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
              Project images
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-gray">
              Upload multiple images. The first image becomes the card and carousel
              cover.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading || !canUpload}
            className="min-h-11 border border-primary-navy bg-primary-navy px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-steel-blue disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload images"}
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => uploadFiles(event.target.files)}
        />
        {!canUpload ? (
          <p className="mt-4 text-xs leading-6 text-red-700">
            Configure Supabase environment variables before uploading images.
          </p>
        ) : null}
        {message ? (
          <p className="mt-4 text-xs leading-6 text-slate-gray">{message}</p>
        ) : null}
      </div>

      {images.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={image} className="border border-border-gray bg-white p-3">
              <div className="relative aspect-[16/10] overflow-hidden bg-cool-mist">
                <Image
                  src={image}
                  alt={`Project image ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                {index === 0 ? (
                  <span className="absolute left-3 top-3 bg-primary-navy px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white">
                    Cover
                  </span>
                ) : null}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {index !== 0 ? (
                  <button
                    type="button"
                    onClick={() => makeCover(image)}
                    className="min-h-9 border border-border-gray px-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary-navy transition hover:border-primary-navy"
                  >
                    Make cover
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => removeImage(image)}
                  className="min-h-9 border border-border-gray px-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-gray transition hover:border-red-300 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-border-gray bg-white p-6 text-sm leading-7 text-slate-gray">
          No project images uploaded yet. Add at least one image before saving.
        </div>
      )}
    </div>
  );
}
