"use client";

import { labels } from "@/data/labels";
import type { ConstructorState } from "@/hooks/useConstructorState";

type SizeInputsProps = Pick<
  ConstructorState,
  "config" | "sizeValid" | "setWidth" | "setHeight"
>;

export function SizeInputs({
  config,
  sizeValid,
  setWidth,
  setHeight,
}: SizeInputsProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="label-text">{labels.widthCm}</span>
          <input
            type="number"
            min={10}
            max={120}
            value={config.widthCm}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="input-field bg-white text-slate-900"
          />
        </label>
        <label className="block">
          <span className="label-text">{labels.heightCm}</span>
          <input
            type="number"
            min={10}
            max={120}
            value={config.heightCm}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="input-field bg-white text-slate-900"
          />
        </label>
      </div>
      {!sizeValid && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
          {labels.errorSize}
        </p>
      )}
    </div>
  );
}
