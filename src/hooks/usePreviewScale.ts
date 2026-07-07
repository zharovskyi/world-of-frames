"use client";

import { useEffect, useRef, useState } from "react";

export function usePreviewScale(contentWidth: number, contentHeight: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const padding = 32;
      const availableW = Math.max(0, width - padding);
      const availableH = Math.max(0, height - padding);

      if (contentWidth === 0 || contentHeight === 0 || availableH < 50) {
        return;
      }

      const next = Math.min(
        1,
        availableW / contentWidth,
        availableH / contentHeight,
      );
      setScale(Math.max(0.2, next));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);

    const timer = window.setTimeout(update, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.clearTimeout(timer);
    };
  }, [contentWidth, contentHeight]);

  return { containerRef, scale };
}
