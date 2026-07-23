"use client";

import { useCallback, useMemo, useState } from "react";
import {
  defaultFrameId,
  defaultGlassId,
  defaultPaspartuId,
  defaultWallId,
  frames,
  glassOptions,
  paspartuOptions,
  wallOptions,
} from "@/data/catalog";
import { labels } from "@/data/labels";
import { calculateFrameLayout, clampSize, isValidSize } from "@/lib/frameGeometry";
import { calculatePrice } from "@/lib/price";
import type { ConstructorConfig, FrameMaterial } from "@/types/constructor";

const initialConfig: ConstructorConfig = {
  widthCm: 40,
  heightCm: 50,
  imageUrl: null,
  frameId: defaultFrameId,
  paspartu: {
    enabled: false,
    optionId: defaultPaspartuId,
    widthMm: 40,
  },
  glassId: defaultGlassId,
  wallId: defaultWallId,
};

export function useConstructorState() {
  const [config, setConfig] = useState<ConstructorConfig>(initialConfig);
  const [materialFilter, setMaterialFilter] = useState<FrameMaterial | "all">(
    "all",
  );
  const [colorFilter, setColorFilter] = useState<string>("all");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const selectedFrame = useMemo(
    () => frames.find((f) => f.id === config.frameId) ?? frames[0],
    [config.frameId],
  );

  const selectedGlass = useMemo(
    () => glassOptions.find((g) => g.id === config.glassId) ?? glassOptions[0],
    [config.glassId],
  );

  const selectedPaspartu = useMemo(
    () =>
      paspartuOptions.find((p) => p.id === config.paspartu.optionId) ??
      paspartuOptions[0],
    [config.paspartu.optionId],
  );

  const selectedWall = useMemo(
    () => wallOptions.find((w) => w.id === config.wallId) ?? wallOptions[0],
    [config.wallId],
  );

  const availableColors = useMemo(() => {
    const filtered =
      materialFilter === "all"
        ? frames
        : frames.filter((f) => f.material === materialFilter);
    const colors = [...new Set(filtered.map((f) => f.color))];
    return colors;
  }, [materialFilter]);

  const filteredFrames = useMemo(() => {
    return frames.filter((f) => {
      if (materialFilter !== "all" && f.material !== materialFilter) return false;
      if (colorFilter !== "all" && f.color !== colorFilter) return false;
      return true;
    });
  }, [materialFilter, colorFilter]);

  const layout = useMemo(
    () =>
      calculateFrameLayout(
        config.widthCm,
        config.heightCm,
        selectedFrame.widthMm,
        config.paspartu.enabled,
        config.paspartu.widthMm,
      ),
    [config, selectedFrame.widthMm],
  );

  const price = useMemo(
    () => calculatePrice(config, selectedFrame, selectedGlass),
    [config, selectedFrame, selectedGlass],
  );

  const setWidth = useCallback((widthCm: number) => {
    setConfig((prev) => ({ ...prev, widthCm }));
  }, []);

  const setHeight = useCallback((heightCm: number) => {
    setConfig((prev) => ({ ...prev, heightCm }));
  }, []);

  const setFrameId = useCallback((frameId: string) => {
    setConfig((prev) => ({ ...prev, frameId }));
  }, []);

  const setGlassId = useCallback((glassId: string) => {
    setConfig((prev) => ({ ...prev, glassId }));
  }, []);

  const setWallId = useCallback((wallId: string) => {
    setConfig((prev) => ({ ...prev, wallId }));
  }, []);

  const togglePaspartu = useCallback((enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      paspartu: { ...prev.paspartu, enabled },
    }));
  }, []);

  const setPaspartuOption = useCallback((optionId: string) => {
    setConfig((prev) => ({
      ...prev,
      paspartu: { ...prev.paspartu, optionId },
    }));
  }, []);

  const setPaspartuWidth = useCallback((widthMm: number) => {
    setConfig((prev) => ({
      ...prev,
      paspartu: { ...prev.paspartu, widthMm },
    }));
  }, []);

  const uploadImage = useCallback((file: File) => {
    setUploadError(null);
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setUploadError(labels.errorFileType);
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const aspect = img.naturalWidth / img.naturalHeight;
      setConfig((prev) => {
        if (prev.imageUrl) URL.revokeObjectURL(prev.imageUrl);
        // Match canvas size to photo proportions so preview shows the same crop-free image
        const maxSide = Math.max(prev.widthCm, prev.heightCm);
        let widthCm: number;
        let heightCm: number;
        if (aspect >= 1) {
          widthCm = clampSize(maxSide);
          heightCm = clampSize(Math.round(widthCm / aspect));
        } else {
          heightCm = clampSize(maxSide);
          widthCm = clampSize(Math.round(heightCm * aspect));
        }
        return { ...prev, imageUrl: url, widthCm, heightCm };
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setUploadError(labels.errorUpload);
    };
    img.src = url;
  }, []);

  const removeImage = useCallback(() => {
    setConfig((prev) => {
      if (prev.imageUrl) URL.revokeObjectURL(prev.imageUrl);
      return { ...prev, imageUrl: null };
    });
    setUploadError(null);
  }, []);

  const sizeValid =
    isValidSize(config.widthCm) && isValidSize(config.heightCm);

  return {
    config,
    materialFilter,
    colorFilter,
    uploadError,
    selectedFrame,
    selectedGlass,
    selectedPaspartu,
    selectedWall,
    availableColors,
    filteredFrames,
    layout,
    price,
    sizeValid,
    setWidth,
    setHeight,
    setFrameId,
    setGlassId,
    setWallId,
    togglePaspartu,
    setPaspartuOption,
    setPaspartuWidth,
    setMaterialFilter,
    setColorFilter,
    uploadImage,
    removeImage,
  };
}

export type ConstructorState = ReturnType<typeof useConstructorState>;
