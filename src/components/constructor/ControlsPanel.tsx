"use client";

import { labels } from "@/data/labels";
import type { ConstructorState } from "@/hooks/useConstructorState";
import { AccordionSection } from "./AccordionSection";
import { FrameSelector } from "./FrameSelector";
import { GlassSelector } from "./GlassSelector";
import { ImageUpload } from "./ImageUpload";
import { PaspartuSelector } from "./PaspartuSelector";
import { PriceSummary } from "./PriceSummary";
import { SizeInputs } from "./SizeInputs";
import { WallPicker } from "./WallPicker";

type ControlsPanelProps = {
  state: ConstructorState;
};

export function ControlsPanel({ state }: ControlsPanelProps) {
  return (
    <aside className="flex w-full min-w-0 flex-col gap-3 lg:sticky lg:top-[4.5rem] lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto lg:pr-1">
      <AccordionSection title={labels.sectionSize}>
        <SizeInputs
          config={state.config}
          sizeValid={state.sizeValid}
          setWidth={state.setWidth}
          setHeight={state.setHeight}
        />
      </AccordionSection>

      <AccordionSection title={labels.sectionImage}>
        <ImageUpload
          config={state.config}
          uploadError={state.uploadError}
          uploadImage={state.uploadImage}
          removeImage={state.removeImage}
        />
      </AccordionSection>

      <AccordionSection title={labels.sectionFrame}>
        <FrameSelector
          config={state.config}
          filteredFrames={state.filteredFrames}
          availableColors={state.availableColors}
          materialFilter={state.materialFilter}
          colorFilter={state.colorFilter}
          setFrameId={state.setFrameId}
          setMaterialFilter={state.setMaterialFilter}
          setColorFilter={state.setColorFilter}
        />
      </AccordionSection>

      <AccordionSection title={labels.sectionPaspartu} defaultOpen={false}>
        <PaspartuSelector
          config={state.config}
          togglePaspartu={state.togglePaspartu}
          setPaspartuOption={state.setPaspartuOption}
          setPaspartuWidth={state.setPaspartuWidth}
        />
      </AccordionSection>

      <AccordionSection title={labels.sectionGlass} defaultOpen={false}>
        <GlassSelector config={state.config} setGlassId={state.setGlassId} />
      </AccordionSection>

      <AccordionSection title={labels.sectionWall} defaultOpen={false}>
        <WallPicker config={state.config} setWallId={state.setWallId} />
      </AccordionSection>

      <PriceSummary price={state.price} />
    </aside>
  );
}
