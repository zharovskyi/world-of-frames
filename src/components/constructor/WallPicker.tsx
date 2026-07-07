"use client";

import { wallOptions } from "@/data/catalog";
import type { ConstructorState } from "@/hooks/useConstructorState";

type WallPickerProps = Pick<ConstructorState, "config" | "setWallId">;

export function WallPicker({ config, setWallId }: WallPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-2.5">
      {wallOptions.map((wall) => (
        <button
          key={wall.id}
          type="button"
          onClick={() => setWallId(wall.id)}
          title={wall.name}
          className={`h-14 min-w-[5rem] flex-1 rounded-xl transition-all duration-200 sm:h-16 ${
            config.wallId === wall.id
              ? "scale-[1.02] ring-2 ring-[#c17f59] ring-offset-2"
              : "ring-1 ring-[#e5d9c8] hover:ring-[#d4c4b0]"
          }`}
          style={{ backgroundColor: wall.color }}
        />
      ))}
    </div>
  );
}
