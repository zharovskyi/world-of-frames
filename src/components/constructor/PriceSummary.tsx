"use client";

import { labels } from "@/data/labels";
import { formatPrice } from "@/lib/price";

type PriceSummaryProps = {
  price: number;
};

export function PriceSummary({ price }: PriceSummaryProps) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "var(--constructor-price-bg)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-[#d4c4b0]">
        {labels.sectionPrice}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-[#faf5ee]">
        {formatPrice(price)}
        <span className="ml-1.5 text-base font-normal text-[#c4b09a]">
          {labels.currency}
        </span>
      </p>
      <p className="mt-3 text-xs leading-relaxed text-[#a8907a]">
        {labels.priceNote}
      </p>
    </div>
  );
}
