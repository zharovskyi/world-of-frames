import type { FrameLayout } from "@/types/constructor";

const MIN_SIZE_CM = 10;
const MAX_SIZE_CM = 120;
const MAX_PREVIEW_WIDTH = 480;
const MAX_PREVIEW_HEIGHT = 560;

export function clampSize(cm: number): number {
  return Math.min(MAX_SIZE_CM, Math.max(MIN_SIZE_CM, cm));
}

export function isValidSize(cm: number): boolean {
  return cm >= MIN_SIZE_CM && cm <= MAX_SIZE_CM;
}

export function calculateFrameLayout(
  widthCm: number,
  heightCm: number,
  frameWidthMm: number,
  paspartuEnabled: boolean,
  paspartuWidthMm: number,
): FrameLayout {
  const w = clampSize(widthCm);
  const h = clampSize(heightCm);
  const aspect = w / h;

  let photoWidthPx: number;
  let photoHeightPx: number;

  if (aspect >= MAX_PREVIEW_WIDTH / MAX_PREVIEW_HEIGHT) {
    photoWidthPx = MAX_PREVIEW_WIDTH;
    photoHeightPx = MAX_PREVIEW_WIDTH / aspect;
  } else {
    photoHeightPx = MAX_PREVIEW_HEIGHT;
    photoWidthPx = MAX_PREVIEW_HEIGHT * aspect;
  }

  const scaleFactor = photoWidthPx / w;
  const frameWidthPx = (frameWidthMm / 10) * scaleFactor;
  const paspartuWidthPx = paspartuEnabled
    ? (paspartuWidthMm / 10) * scaleFactor
    : 0;

  return {
    photoWidthPx,
    photoHeightPx,
    frameWidthPx,
    paspartuWidthPx,
    scaleFactor,
  };
}
