"use client";

import { wallOptions } from "@/data/catalog";
import type { ConstructorState } from "@/hooks/useConstructorState";
import { wallBackgroundStyle } from "@/lib/wallBackground";

type WallPickerProps = Pick<ConstructorState, "config" | "setWallId">;

export function WallPicker({ config, setWallId }: WallPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
      {wallOptions.map((wall) => (
        <button
          key={wall.id}
          type="button"
          onClick={() => setWallId(wall.id)}
          title={wall.name}
          className={`group flex flex-col overflow-hidden rounded-xl transition-all duration-200 ${
            config.wallId === wall.id
              ? "scale-[1.02] ring-2 ring-[#c17f59] ring-offset-2"
              : "ring-1 ring-[#e5d9c8] hover:ring-[#d4c4b0]"
          }`}
        >
          <span
            className="block h-14 w-full sm:h-16"
            style={wallBackgroundStyle(wall)}
          />
          <span className="truncate bg-[#faf6f0] px-2 py-1.5 text-left text-xs text-[#5c4a3d]">
            {wall.name}
          </span>
        </button>
      ))}
    </div>
  );
}
