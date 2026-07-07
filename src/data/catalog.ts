import type {
  FrameProfile,
  GlassOption,
  PaspartuOption,
  WallOption,
} from "@/types/constructor";

export const frames: FrameProfile[] = [
  {
    id: "f1",
    name: "1405-270",
    material: "wood",
    color: "gold",
    colorLabel: "Золотий",
    widthMm: 45,
    pricePerMeter: 320,
    previewColor: "#c9a227",
  },
  {
    id: "f2",
    name: "1405-233",
    material: "wood",
    color: "brown",
    colorLabel: "Коричневий",
    widthMm: 38,
    pricePerMeter: 280,
    previewColor: "#6b4423",
  },
  {
    id: "f3",
    name: "1405-03",
    material: "wood",
    color: "black",
    colorLabel: "Чорний",
    widthMm: 32,
    pricePerMeter: 250,
    previewColor: "#1a1a1a",
  },
  {
    id: "f4",
    name: "2108-112",
    material: "plastic",
    color: "white",
    colorLabel: "Білий",
    widthMm: 28,
    pricePerMeter: 120,
    previewColor: "#f5f5f0",
  },
  {
    id: "f5",
    name: "2108-445",
    material: "plastic",
    color: "silver",
    colorLabel: "Срібний",
    widthMm: 35,
    pricePerMeter: 140,
    previewColor: "#b0b0b0",
  },
  {
    id: "f6",
    name: "2108-778",
    material: "plastic",
    color: "black",
    colorLabel: "Чорний",
    widthMm: 22,
    pricePerMeter: 100,
    previewColor: "#2d2d2d",
  },
  {
    id: "f7",
    name: "3012-015",
    material: "wood",
    color: "beige",
    colorLabel: "Бежевий",
    widthMm: 55,
    pricePerMeter: 380,
    previewColor: "#d4c4a8",
  },
  {
    id: "f8",
    name: "3012-042",
    material: "plastic",
    color: "red",
    colorLabel: "Червоний",
    widthMm: 30,
    pricePerMeter: 130,
    previewColor: "#8b1a1a",
  },
];

export const paspartuOptions: PaspartuOption[] = [
  { id: "p1", name: "Білий А 148", color: "#f8f6f0" },
  { id: "p2", name: "Кремовий B 210", color: "#f0e6d3" },
  { id: "p3", name: "Сірий C 305", color: "#c8c8c8" },
  { id: "p4", name: "Чорний D 401", color: "#1c1c1c" },
];

export const glassOptions: GlassOption[] = [
  { id: "g1", name: "Акрилове скло", fixedPrice: 150 },
  { id: "g2", name: "Звичайне скло", fixedPrice: 200 },
  { id: "g3", name: "Без скла", fixedPrice: 0 },
];

export const wallOptions: WallOption[] = [
  { id: "w1", name: "Світла стіна", color: "#f0e6d8" },
  { id: "w2", name: "Бежева стіна", color: "#d9cbb8" },
  { id: "w3", name: "Темна стіна", color: "#5c4a3d" },
  {
    id: "w4",
    name: "Цегляна стіна",
    color: "#b85c42",
    texture: "/catalog/walls/brick.webp",
    textureRepeat: true,
  },
  {
    id: "w5",
    name: "Шпалери",
    color: "#e8dce8",
    texture: "/catalog/walls/wallpaper.svg",
  },
  {
    id: "w6",
    name: "Бетон",
    color: "#c5c5c5",
    texture: "/catalog/walls/concrete.svg",
  },
  {
    id: "w7",
    name: "Дерев'яна панель",
    color: "#d4b888",
    texture: "/catalog/walls/wood.webp",
  },
];

export const paspartuWidths = [20, 40, 60] as const;

export const defaultFrameId = frames[0].id;
export const defaultGlassId = glassOptions[0].id;
export const defaultWallId = wallOptions[0].id;
export const defaultPaspartuId = paspartuOptions[0].id;

export const materialLabels: Record<string, string> = {
  all: "Усі",
  plastic: "Пластик",
  wood: "Дерево",
};
