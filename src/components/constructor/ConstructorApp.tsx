"use client";

import { useConstructorState } from "@/hooks/useConstructorState";
import { ControlsPanel } from "./ControlsPanel";
import { Header } from "./Header";
import { PreviewPanel } from "./PreviewPanel";

export function ConstructorApp() {
  const state = useConstructorState();

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "var(--constructor-bg)" }}
    >
      <Header />
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 p-3 sm:p-4 lg:flex-row lg:items-start lg:gap-5 lg:p-6 xl:gap-6">
        <div className="order-2 min-w-0 flex-1 lg:order-2">
          <PreviewPanel
            config={state.config}
            selectedFrame={state.selectedFrame}
            selectedPaspartu={state.selectedPaspartu}
            selectedWall={state.selectedWall}
            layout={state.layout}
            uploadImage={state.uploadImage}
          />
        </div>

        <div className="order-1 w-full shrink-0 lg:order-1 lg:w-[min(100%,28rem)] xl:w-[30rem]">
          <ControlsPanel state={state} />
        </div>
      </div>
    </div>
  );
}
