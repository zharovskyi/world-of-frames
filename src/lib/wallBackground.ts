import type { CSSProperties } from "react";

import type { WallOption } from "@/types/constructor";

import { assetPath } from "./assetPath";

export function wallBackgroundStyle(wall: WallOption): CSSProperties {
  const style: CSSProperties = {
    backgroundColor: wall.color,
  };

  if (wall.texture) {
    style.backgroundImage = `url(${assetPath(wall.texture)})`;
    style.backgroundPosition = "center";

    if (wall.textureRepeat) {
      style.backgroundRepeat = "repeat";
      style.backgroundSize = "auto";
    } else {
      style.backgroundSize = "cover";
    }
  }

  return style;
}
