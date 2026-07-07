"use client";

import { glassOptions } from "@/data/catalog";
import type { ConstructorState } from "@/hooks/useConstructorState";

type GlassSelectorProps = Pick<ConstructorState, "config" | "setGlassId">;

export function GlassSelector({ config, setGlassId }: GlassSelectorProps) {
  return (
    <div className="min-w-0 space-y-2">
      {glassOptions.map((glass) => (
        <label
          key={glass.id}
          className={`select-card flex min-w-0 cursor-pointer items-start gap-3 ${
            config.glassId === glass.id ? "select-card-active" : ""
          }`}
        >
          <input
            type="radio"
            name="glass"
            checked={config.glassId === glass.id}
            onChange={() => setGlassId(glass.id)}
            className="mt-0.5 shrink-0"
            style={{ accentColor: "var(--constructor-accent)" }}
          />
          <span className="min-w-0 text-sm font-medium leading-snug" style={{ color: "var(--constructor-text)" }}>
            {glass.name}
          </span>
        </label>
      ))}
    </div>
  );
}
