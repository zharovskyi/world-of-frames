import { labels } from "@/data/labels";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "var(--background)" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#e8c4a8]/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#d4a574]/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0dcc8]/40 blur-3xl" />
      </div>

      <main className="relative max-w-xl text-center animate-fade-in">
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm"
          style={{
            border: "1px solid var(--constructor-border)",
            background: "var(--constructor-panel)",
            color: "var(--constructor-text)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--constructor-accent)" }}
          />
          Онлайн-конструктор
        </span>

        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: "var(--foreground)" }}
        >
          {labels.homeTitle}
        </h1>
        <p
          className="mt-5 text-lg leading-relaxed"
          style={{ color: "var(--constructor-text-light)" }}
        >
          {labels.homeDescription}
        </p>

        <Link
          href="/constructor"
          className="btn-primary mt-10 inline-flex w-auto items-center gap-2 px-10"
        >
          {labels.openConstructor}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </main>
    </div>
  );
}
