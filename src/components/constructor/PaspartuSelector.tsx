"use client";

import { paspartuOptions, paspartuWidths } from "@/data/catalog";
import { labels } from "@/data/labels";
import type { ConstructorState } from "@/hooks/useConstructorState";

type PaspartuSelectorProps = Pick<
  ConstructorState,
  | "config"
  | "togglePaspartu"
  | "setPaspartuOption"
  | "setPaspartuWidth"
>;

export function PaspartuSelector({
  config,
  togglePaspartu,
  setPaspartuOption,
  setPaspartuWidth,
}: PaspartuSelectorProps) {
  return (
    <div className="min-w-0 space-y-4">
      <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#faf5ee]" style={{ background: "var(--constructor-surface)" }}>
        <input
          type="checkbox"
          checked={config.paspartu.enabled}
          onChange={(e) => togglePaspartu(e.target.checked)}
          className="h-4 w-4 shrink-0 rounded"
          style={{ accentColor: "var(--constructor-accent)" }}
        />
        <span className="min-w-0 text-sm font-medium leading-snug" style={{ color: "var(--constructor-text)" }}>
          {labels.addPaspartu}
        </span>
      </label>

      {config.paspartu.enabled && (
        <>
          <div className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {paspartuOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setPaspartuOption(option.id)}
                className={`select-card flex min-w-0 items-center gap-2.5 text-left text-xs ${
                  config.paspartu.optionId === option.id
                    ? "select-card-active"
                    : ""
                }`}
              >
                <span
                  className="h-6 w-6 shrink-0 rounded-md shadow-sm ring-1 ring-black/5"
                  style={{ backgroundColor: option.color }}
                />
                <span className="min-w-0 font-medium leading-snug" style={{ color: "var(--constructor-text)" }}>
                  {option.name}
                </span>
              </button>
            ))}
          </div>

          <div>
            <span className="label-text">{labels.paspartuWidth}</span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {paspartuWidths.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setPaspartuWidth(w)}
                  className={`chip min-w-[4.5rem] flex-1 ${config.paspartu.widthMm === w ? "chip-active" : ""}`}
                >
                  {w} мм
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
