"use client";

import { frames, materialLabels } from "@/data/catalog";
import { labels } from "@/data/labels";
import type { ConstructorState } from "@/hooks/useConstructorState";
import { assetPath } from "@/lib/assetPath";
import type { FrameMaterial } from "@/types/constructor";

type FrameSelectorProps = Pick<
  ConstructorState,
  | "config"
  | "filteredFrames"
  | "availableColors"
  | "materialFilter"
  | "colorFilter"
  | "setFrameId"
  | "setMaterialFilter"
  | "setColorFilter"
>;

const materials: Array<FrameMaterial | "all"> = ["all", "plastic", "wood"];

export function FrameSelector({
  config,
  filteredFrames,
  availableColors,
  materialFilter,
  colorFilter,
  setFrameId,
  setMaterialFilter,
  setColorFilter,
}: FrameSelectorProps) {
  const colorLabels: Record<string, string> = {};
  for (const f of frames) {
    colorLabels[f.color] = f.colorLabel;
  }

  return (
    <div className="min-w-0 space-y-4">
      <div className="min-w-0">
        <span className="label-text">{labels.material}</span>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {materials.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMaterialFilter(m);
                setColorFilter("all");
              }}
              className={`chip ${materialFilter === m ? "chip-active" : ""}`}
            >
              {materialLabels[m]}
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <span className="label-text">{labels.color}</span>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setColorFilter("all")}
            className={`chip ${colorFilter === "all" ? "chip-active" : ""}`}
          >
            {labels.colorAll}
          </button>
          {availableColors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColorFilter(c)}
              className={`chip ${colorFilter === c ? "chip-active" : ""}`}
            >
              {colorLabels[c] ?? c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {filteredFrames.map((frame) => (
          <button
            key={frame.id}
            type="button"
            onClick={() => setFrameId(frame.id)}
            className={`select-card min-w-0 ${
              config.frameId === frame.id ? "select-card-active" : ""
            }`}
          >
            {frame.image ? (
              <div className="mb-2 overflow-hidden rounded-lg bg-[#f5efe6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetPath(frame.image)}
                  alt={frame.name}
                  className="h-20 w-full object-cover object-left-top sm:h-24"
                />
              </div>
            ) : (
              <div
                className="mb-2 h-7 w-full rounded-lg shadow-inner"
                style={{
                  background: `linear-gradient(135deg, ${frame.previewColor}, color-mix(in srgb, ${frame.previewColor} 70%, #000))`,
                }}
              />
            )}
            <p className="text-xs font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
              {frame.name}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug sm:text-xs" style={{ color: "var(--constructor-text-light)" }}>
              {frame.colorLabel} · {frame.widthMm} мм
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
