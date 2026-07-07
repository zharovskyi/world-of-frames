export type FrameMaterial = "plastic" | "wood";

export type FrameProfile = {
  id: string;
  name: string;
  material: FrameMaterial;
  color: string;
  colorLabel: string;
  widthMm: number;
  pricePerMeter: number;
  previewColor: string;
};

export type PaspartuOption = {
  id: string;
  name: string;
  color: string;
};

export type GlassOption = {
  id: string;
  name: string;
  fixedPrice: number;
};

export type WallOption = {
  id: string;
  name: string;
  color: string;
  texture?: string;
  textureRepeat?: boolean;
};

export type PaspartuConfig = {
  enabled: boolean;
  optionId: string;
  widthMm: number;
};

export type ConstructorConfig = {
  widthCm: number;
  heightCm: number;
  imageUrl: string | null;
  frameId: string;
  paspartu: PaspartuConfig;
  glassId: string;
  wallId: string;
};

export type FrameLayout = {
  photoWidthPx: number;
  photoHeightPx: number;
  frameWidthPx: number;
  paspartuWidthPx: number;
  scaleFactor: number;
};
