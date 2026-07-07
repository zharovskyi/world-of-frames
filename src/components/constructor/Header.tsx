import { labels } from "@/data/labels";
import Link from "next/link";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b px-3 py-3 backdrop-blur-xl sm:px-4 lg:px-8"
      style={{
        background: "var(--constructor-header)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-2">
        <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white shadow-lg sm:h-9 sm:w-9 sm:text-sm"
            style={{
              background: "linear-gradient(135deg, #c17f59, #d4a574)",
              boxShadow: "0 4px 14px var(--constructor-accent-glow)",
            }}
          >
            СР
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-white sm:text-base">
            {labels.siteName}
          </span>
        </Link>

        <span className="hidden rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 md:block">
          {labels.pageTitle}
        </span>

        <Link
          href="/"
          className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/90 transition-all duration-200 hover:border-white/30 hover:bg-white/10 sm:px-4 sm:text-sm"
        >
          {labels.backToHome}
        </Link>
      </div>
    </header>
  );
}
