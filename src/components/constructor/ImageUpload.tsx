"use client";

import { labels } from "@/data/labels";
import type { ConstructorState } from "@/hooks/useConstructorState";
import { useRef, useState } from "react";

type ImageUploadProps = Pick<
  ConstructorState,
  "config" | "uploadError" | "uploadImage" | "removeImage"
>;

export function ImageUpload({
  config,
  uploadError,
  uploadImage,
  removeImage,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (file) uploadImage(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {config.imageUrl ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div
            className="relative mx-auto aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-xl sm:mx-0 sm:max-w-[140px] sm:shrink-0 lg:max-w-[160px]"
            style={{
              border: "1px solid var(--constructor-border)",
              background: "var(--constructor-surface)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={config.imageUrl}
              src={config.imageUrl}
              alt="Завантажене зображення"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm"
            >
              <UploadIcon />
              <span className="truncate">{labels.uploadImage}</span>
            </button>
            <button
              type="button"
              onClick={removeImage}
              className="btn-secondary px-4 py-2 text-xs sm:text-sm"
            >
              {labels.removeImage}
            </button>
            <p
              className="text-center text-[11px] sm:text-left sm:text-xs"
              style={{ color: "var(--constructor-text-light)" }}
            >
              {labels.uploadHint}
            </p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 transition-colors sm:gap-3 sm:px-6 sm:py-8"
          style={{
            borderColor: isDragging
              ? "var(--constructor-accent)"
              : "var(--constructor-border)",
            background: isDragging
              ? "var(--constructor-accent-light)"
              : "var(--constructor-surface)",
          }}
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full shadow-sm sm:h-12 sm:w-12"
            style={{
              background: "var(--constructor-panel)",
              color: "var(--constructor-accent)",
            }}
          >
            <UploadIcon className="sm:h-6 sm:w-6" />
          </span>
          <span
            className="text-center text-sm font-medium"
            style={{ color: "var(--constructor-text)" }}
          >
            {labels.uploadImage}
          </span>
          <span
            className="hidden text-center text-xs sm:block"
            style={{ color: "var(--constructor-text-light)" }}
          >
            {labels.uploadHint}
          </span>
          <span
            className="text-center text-[11px] sm:hidden"
            style={{ color: "var(--constructor-text-light)" }}
          >
            JPG, PNG, WEBP
          </span>
        </button>
      )}

      {uploadError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
          {uploadError}
        </p>
      )}
    </div>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-5 w-5 ${className ?? ""}`}
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  );
}
