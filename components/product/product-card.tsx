"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, ShoppingCart, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import type { Product } from "@/types/product";
import { ProductQuickView } from "./product-quick-view";
import { useCart } from "@/components/cart/cart-provider";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <article className="group relative">
      {/* =====================================================
          PRODUCT IMAGE CARD
      ====================================================== */}
      <div
        className="
          relative
          aspect-[1/1.02]
          overflow-hidden
          rounded-[26px]
          border
          border-black/[0.045]
          bg-[linear-gradient(145deg,#F7F8F9_0%,#EEF1F4_52%,#E5E9ED_100%)]
          transition-all
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
          group-hover:-translate-y-1
          group-hover:border-black/[0.07]
          group-hover:shadow-[0_24px_55px_rgba(31,45,61,0.10)]
        "
      >
        {/* Soft ambient light */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[20%]
            -top-[20%]
            h-[65%]
            w-[65%]
            rounded-full
            bg-white/90
            blur-[70px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-[18%]
            left-[8%]
            h-[45%]
            w-[70%]
            rounded-full
            bg-[#C8DAE8]/30
            blur-[60px]
          "
        />

        {/* ===================================================
            BADGE
        ==================================================== */}
        {product.badge && (
          <div
            className="
              absolute
              left-5
              top-5
              z-30
              rounded-full
              border
              border-black/[0.06]
              bg-white/90
              px-4
              py-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.11em]
              text-[#2D2D2F]
              shadow-[0_2px_8px_rgba(0,0,0,0.05)]
              backdrop-blur-md
            "
          >
            {product.badge}
          </div>
        )}

        {/* ===================================================
            WISHLIST
        ==================================================== */}
        <button
          type="button"
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsWishlisted((current) => !current);
          }}
          className="
            absolute
            right-5
            top-5
            z-40
            flex
            size-12
            items-center
            justify-center
            rounded-full
            border
            border-black/[0.05]
            bg-white/90
            text-[#1D1D1F]
            shadow-[0_4px_14px_rgba(0,0,0,0.06)]
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-105
            hover:bg-white
          "
        >
          <Heart
            size={19}
            strokeWidth={1.6}
            className={isWishlisted ? "fill-[#1D1D1F]" : ""}
          />
        </button>

        {/* ===================================================
            PRODUCT LINK + IMAGE
        ==================================================== */}
        <button
          type="button"
          onClick={() => setQuickViewOpen(true)}
          aria-label={`Quick view ${product.name}`}
          aria-haspopup="dialog"
          className="absolute inset-0 z-10"
        >
          {/* Product floor shadow */}
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-[13%]
              left-1/2
              h-[7%]
              w-[58%]
              -translate-x-1/2
              rounded-full
              bg-[#506478]/15
              blur-[18px]
            "
          />

          {/* Product glow */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              h-[62%]
              w-[70%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/80
              blur-[45px]
            "
          />

          <motion.div
            className="
              absolute
              inset-x-[7%]
              bottom-[7%]
              top-[13%]
              z-10
            "
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.045,
                    y: -5,
                  }
            }
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="
                (max-width: 640px) 92vw,
                (max-width: 1024px) 46vw,
                25vw
              "
              className="
                object-contain
                object-center
                drop-shadow-[0_25px_24px_rgba(31,45,61,0.16)]
                transition-transform
                duration-700
                ease-[cubic-bezier(.22,1,.36,1)]
                group-hover:scale-[1.025]
              "
            />
          </motion.div>
        </button>

        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          title={product.inStock ? "Add to cart" : "Out of stock"}
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
          className="absolute bottom-5 left-5 z-40 flex size-12 items-center justify-center rounded-full border border-black/[0.05] bg-white/90 text-[#1D1D1F] shadow-[0_4px_14px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingCart size={19} strokeWidth={1.6} />
        </button>

        {/* ===================================================
            HOVER ARROW
        ==================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-5
            right-5
            z-30
            flex
            size-12
            translate-y-2
            items-center
            justify-center
            rounded-full
            bg-[#1D1D1F]
            text-white
            opacity-0
            shadow-[0_8px_20px_rgba(0,0,0,0.16)]
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowUpRight size={18} strokeWidth={1.6} />
        </div>

        {/* Fine premium inner border */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            rounded-[26px]
            ring-1
            ring-inset
            ring-white/65
          "
        />
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}
      <div className="px-1 pb-2 pt-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[#86868B]
            "
          >
            {product.brand}
          </p>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              text-xs
              text-[#6E6E73]
            "
          >
            <Star
              size={13}
              strokeWidth={1.5}
              className="fill-[#6E6E73]"
            />

            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="inline-block"
        >
          <h3
            className="
              text-[18px]
              font-semibold
              leading-tight
              tracking-[-0.025em]
              text-[#1D1D1F]
              transition-colors
              duration-300
              hover:text-[#0066CC]
              sm:text-[19px]
            "
          >
            {product.name}
          </h3>
        </Link>

        <p
          className="
            mt-3
            line-clamp-1
            text-[14px]
            leading-6
            text-[#86868B]
          "
        >
          {product.tagline}
        </p>

        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="
              text-[17px]
              font-semibold
              tracking-[-0.02em]
              text-[#1D1D1F]
            "
          >
            {formatPrice(product.price)}
          </span>

          {product.originalPrice &&
            product.originalPrice > product.price && (
              <span
                className="
                  text-[13px]
                  text-[#86868B]
                  line-through
                "
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
        </div>
      </div>
      {quickViewOpen && <ProductQuickView product={product} onClose={() => setQuickViewOpen(false)} />}
    </article>
  );
}
