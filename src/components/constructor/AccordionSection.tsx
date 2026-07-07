"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type AccordionSectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function AccordionSection({
  title,
  defaultOpen = true,
  children,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className="min-w-0 rounded-2xl shadow-sm"
      style={{
        background: "var(--constructor-panel)",
        border: "1px solid var(--constructor-border)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#faf5ee]"
      >
        <span
          className="min-w-0 text-sm font-semibold leading-snug"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
          style={{
            background: open
              ? "var(--constructor-accent)"
              : "var(--constructor-border)",
            color: open ? "#fff" : "var(--constructor-muted)",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div
          className="min-w-0 px-4 pb-4 pt-3"
          style={{ borderTop: "1px solid var(--constructor-border)" }}
        >
          {children}
        </div>
      )}
    </section>
  );
}
