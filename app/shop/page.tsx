import type { Metadata } from "next";
import { Suspense } from "react";

import { ShopContent } from "@/components/shop/shop-content";

export const metadata: Metadata = {
  title: "Shop Technology | NEXORA",
  description:
    "Explore premium laptops, smartphones, audio, gaming gear and accessories at NEXORA.",
};

function ShopLoading() {
  return (
    <main className="min-h-screen bg-[#F7F7F8]">
      <section className="border-b border-black/[0.06] bg-white pb-12 pt-36">
        <div className="nexora-container">
          <div className="h-3 w-36 animate-pulse rounded-full bg-black/[0.06]" />

          <div className="mt-5 h-14 w-full max-w-[420px] animate-pulse rounded-2xl bg-black/[0.06]" />

          <div className="mt-5 h-5 w-full max-w-[560px] animate-pulse rounded-full bg-black/[0.05]" />

          <div className="mt-10 h-13 w-full max-w-2xl animate-pulse rounded-full bg-black/[0.05]" />
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="nexora-container">
          <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)]">
            <div className="hidden lg:block">
              <div className="h-[420px] animate-pulse rounded-[24px] bg-black/[0.04]" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <div className="aspect-square animate-pulse rounded-[26px] bg-black/[0.05]" />
                  <div className="mt-5 h-4 w-20 animate-pulse rounded-full bg-black/[0.05]" />
                  <div className="mt-3 h-5 w-3/4 animate-pulse rounded-full bg-black/[0.06]" />
                  <div className="mt-4 h-4 w-1/2 animate-pulse rounded-full bg-black/[0.04]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  );
}
