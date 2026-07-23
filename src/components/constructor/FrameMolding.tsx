"use client";

import { assetPath } from "@/lib/assetPath";
import type { CSSProperties } from "react";
import type { FrameProfile } from "@/types/constructor";

type FrameMoldingProps = {
  frame: FrameProfile;
  frameWidthPx: number;
  totalWidth: number;
  totalHeight: number;
};

type Side = "top" | "bottom" | "left" | "right";

function miterClip(side: Side, w: number): string {
  switch (side) {
    case "top":
      return `polygon(0 0, 100% 0, calc(100% - ${w}px) 100%, ${w}px 100%)`;
    case "bottom":
      return `polygon(${w}px 0, calc(100% - ${w}px) 0, 100% 100%, 0 100%)`;
    case "left":
      return `polygon(0 0, 100% ${w}px, 100% calc(100% - ${w}px), 0 100%)`;
    case "right":
      return `polygon(0 ${w}px, 100% 0, 100% 100%, 0 calc(100% - ${w}px))`;
  }
}

function solidFill(color: string, side: Side): string {
  switch (side) {
    case "top":
      return `linear-gradient(180deg, ${color}, color-mix(in srgb, ${color} 85%, black))`;
    case "bottom":
      return `linear-gradient(0deg, ${color}, color-mix(in srgb, ${color} 85%, black))`;
    case "left":
      return `linear-gradient(90deg, color-mix(in srgb, ${color} 90%, black), ${color})`;
    case "right":
      return `linear-gradient(270deg, color-mix(in srgb, ${color} 90%, black), ${color})`;
  }
}

function sideBox(
  side: Side,
  frameWidthPx: number,
): Pick<CSSProperties, "top" | "right" | "bottom" | "left" | "width" | "height"> {
  switch (side) {
    case "top":
      return { top: 0, left: 0, width: "100%", height: frameWidthPx };
    case "bottom":
      return { bottom: 0, left: 0, width: "100%", height: frameWidthPx };
    case "left":
      return { top: 0, left: 0, width: frameWidthPx, height: "100%" };
    case "right":
      return { top: 0, right: 0, width: frameWidthPx, height: "100%" };
  }
}

function TexturedSide({
  side,
  frameWidthPx,
  totalWidth,
  totalHeight,
  stripUrl,
  previewColor,
}: {
  side: Side;
  frameWidthPx: number;
  totalWidth: number;
  totalHeight: number;
  stripUrl: string;
  previewColor: string;
}) {
  const isHorizontal = side === "top" || side === "bottom";
  const runLength = isHorizontal ? totalWidth : totalHeight;

  // Tile at natural ornament scale (height = molding width), no squash
  const fillStyle: CSSProperties = {
    position: "absolute",
    backgroundColor: previewColor,
    backgroundImage: `url(${stripUrl})`,
    backgroundSize: "auto 100%",
    backgroundRepeat: "repeat-x",
  };

  if (isHorizontal) {
    fillStyle.inset = 0;
    if (side === "bottom") {
      fillStyle.transform = "scaleY(-1)";
    }
  } else {
    fillStyle.top = 0;
    fillStyle.width = runLength;
    fillStyle.height = frameWidthPx;
    fillStyle.transformOrigin = "top left";
    if (side === "left") {
      fillStyle.left = 0;
      fillStyle.transform = "rotate(-90deg) translateX(-100%)";
    } else {
      fillStyle.left = frameWidthPx;
      fillStyle.transform = "rotate(90deg)";
    }
  }

  return (
    <div
      className="absolute"
      style={{
        ...sideBox(side, frameWidthPx),
        clipPath: miterClip(side, frameWidthPx),
        WebkitClipPath: miterClip(side, frameWidthPx),
      }}
    >
      <div style={fillStyle} />
    </div>
  );
}

export function FrameMolding({
  frame,
  frameWidthPx,
  totalWidth,
  totalHeight,
}: FrameMoldingProps) {
  const stripUrl = frame.strip ? assetPath(frame.strip) : null;
  const sides: Side[] = ["top", "right", "bottom", "left"];

  if (!stripUrl) {
    return (
      <>
        {sides.map((side) => (
          <div
            key={side}
            className="absolute"
            style={{
              ...sideBox(side, frameWidthPx),
              clipPath: miterClip(side, frameWidthPx),
              WebkitClipPath: miterClip(side, frameWidthPx),
              background: solidFill(frame.previewColor, side),
            }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {sides.map((side) => (
        <TexturedSide
          key={side}
          side={side}
          frameWidthPx={frameWidthPx}
          totalWidth={totalWidth}
          totalHeight={totalHeight}
          stripUrl={stripUrl}
          previewColor={frame.previewColor}
        />
      ))}
    </>
  );
}
