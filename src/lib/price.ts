import type { ConstructorConfig, FrameProfile, GlassOption } from "@/types/constructor";

const PASPARTU_RATE_PER_SQ_M = 180;
const BASE_WORK_FEE = 250;

export function calculatePrice(
  config: ConstructorConfig,
  frame: FrameProfile,
  glass: GlassOption,
): number {
  const perimeter = (2 * (config.widthCm + config.heightCm)) / 100;
  const frameCost = perimeter * frame.pricePerMeter;

  const areaSqM = (config.widthCm * config.heightCm) / 10000;
  const paspartuCost = config.paspartu.enabled
    ? areaSqM * PASPARTU_RATE_PER_SQ_M
    : 0;

  const glassCost = glass.fixedPrice;
  const total = frameCost + paspartuCost + glassCost + BASE_WORK_FEE;

  return Math.round(total);
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString("uk-UA");
}
