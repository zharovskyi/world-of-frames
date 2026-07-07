"use client";

import { labels } from "@/data/labels";
import type { ConstructorState } from "@/hooks/useConstructorState";
import { usePreviewScale } from "@/hooks/usePreviewScale";
import { useRef } from "react";

type PreviewPanelProps = Pick<
  ConstructorState,
  | "config"
  | "selectedFrame"
  | "selectedPaspartu"
  | "selectedWall"
  | "layout"
  | "uploadImage"
>;

export function PreviewPanel({
  config,
  selectedFrame,
  selectedPaspartu,
  selectedWall,
  layout,
  uploadImage,
}: PreviewPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    photoWidthPx,
    photoHeightPx,
    frameWidthPx,
    paspartuWidthPx,
  } = layout;

  const totalWidth = photoWidthPx + 2 * (frameWidthPx + paspartuWidthPx);
  const totalHeight = photoHeightPx + 2 * (frameWidthPx + paspartuWidthPx);

  const { containerRef, scale } = usePreviewScale(totalWidth, totalHeight);

  const handleFile = (file: File | undefined) => {
    if (file) uploadImage(file);
  };

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl shadow-lg lg:sticky lg:top-[4.5rem]">
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

      <div
        ref={containerRef}
        className="relative flex h-[min(50vh,400px)] w-full items-center justify-center p-4 sm:h-[min(55vh,480px)] sm:p-6 lg:h-[min(72dvh,680px)]"
        style={{ backgroundColor: selectedWall.color }}
      >
        <div
          className="relative shrink-0 transition-transform duration-300 ease-out"
          style={{
            width: totalWidth,
            height: totalHeight,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            filter: "drop-shadow(0 20px 40px rgba(61,46,39,0.3))",
          }}
        >
          <div
            className="absolute left-0 right-0 top-0"
            style={{
              height: frameWidthPx,
              background: `linear-gradient(180deg, ${selectedFrame.previewColor}, color-mix(in srgb, ${selectedFrame.previewColor} 85%, black))`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: frameWidthPx,
              background: `linear-gradient(0deg, ${selectedFrame.previewColor}, color-mix(in srgb, ${selectedFrame.previewColor} 85%, black))`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 top-0"
            style={{
              width: frameWidthPx,
              background: `linear-gradient(90deg, color-mix(in srgb, ${selectedFrame.previewColor} 90%, black), ${selectedFrame.previewColor})`,
            }}
          />
          <div
            className="absolute bottom-0 right-0 top-0"
            style={{
              width: frameWidthPx,
              background: `linear-gradient(270deg, color-mix(in srgb, ${selectedFrame.previewColor} 90%, black), ${selectedFrame.previewColor})`,
            }}
          />

          <div
            className="absolute"
            style={{
              top: frameWidthPx,
              left: frameWidthPx,
              width: photoWidthPx + 2 * paspartuWidthPx,
              height: photoHeightPx + 2 * paspartuWidthPx,
              backgroundColor: config.paspartu.enabled
                ? selectedPaspartu.color
                : "transparent",
              padding: paspartuWidthPx,
            }}
          >
            <div
              className="relative overflow-hidden bg-white"
              style={{
                width: photoWidthPx,
                height: photoHeightPx,
              }}
            >
              {config.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={config.imageUrl}
                  src={config.imageUrl}
                  alt="Превʼю зображення"
                  className="block h-full w-full object-cover"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center transition-colors hover:bg-black/5"
                  style={{ background: "var(--constructor-surface)" }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full shadow-sm"
                    style={{
                      background: "var(--constructor-panel)",
                      color: "var(--constructor-accent)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                  </span>
                  <span
                    className="px-2 text-xs leading-snug underline-offset-2 hover:underline"
                    style={{ color: "var(--constructor-text)" }}
                  >
                    {labels.previewEmpty}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-center gap-2 px-4 py-3 sm:gap-3 sm:px-5"
        style={{
          background: "var(--constructor-panel)",
          borderTop: "1px solid var(--constructor-border)",
        }}
      >
        <span
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: "rgba(61,46,39,0.06)",
            color: "var(--constructor-text)",
          }}
        >
          {labels.previewSize(config.widthCm, config.heightCm)}
        </span>
        <span
          className="hidden h-1 w-1 rounded-full sm:block"
          style={{ background: "var(--constructor-border)" }}
        />
        <span
          className="text-center text-sm font-medium"
          style={{ color: "var(--constructor-text)" }}
        >
          {selectedFrame.name}
        </span>
      </div>
    </div>
  );
}
