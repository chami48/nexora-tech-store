"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { categories } from "@/data/categories";
import type { ProductCategory } from "@/types/product";

/* =========================================================
   CATEGORY IMAGE CONFIG
========================================================= */

const categoryImages: Record<ProductCategory, string> = {
  laptops: "/images/categories/laptops.png",
  phones: "/images/categories/iphone.png",
  audio: "/images/categories/audio.png",
  gaming: "/images/categories/gaming.png",
  accessories: "/images/categories/accessories.png",
};

/* =========================================================
   CATEGORY CARD STYLES
========================================================= */

const categoryStyles: Record<
  ProductCategory,
  {
    background: string;
    imageClass: string;
  }
> = {
  laptops: {
    background:
      "bg-[linear-gradient(145deg,#F2F5F8_0%,#E5EBF1_48%,#DCE5ED_100%)]",
    imageClass: "right-[1%] bottom-[3%] h-[75%] w-[72%] lg:h-[79%] lg:w-[74%]",
  },

  phones: {
    background:
      "bg-[linear-gradient(145deg,#F4F6F8_0%,#E8EDF2_48%,#DDE5EC_100%)]",
    imageClass: "right-[2%] bottom-[3%] h-[77%] w-[66%] lg:h-[81%] lg:w-[69%]",
  },

  audio: {
    background:
      "bg-[linear-gradient(145deg,#F5F4F2_0%,#ECE9E5_50%,#E2DEDA_100%)]",
    imageClass: "right-[1%] bottom-[3%] h-[71%] w-[70%] lg:h-[75%] lg:w-[74%]",
  },

  gaming: {
    background:
      "bg-[linear-gradient(145deg,#F1F3F5_0%,#E5E8EC_50%,#DDE1E6_100%)]",
    imageClass: "right-[1%] bottom-[3%] h-[70%] w-[71%] lg:h-[74%] lg:w-[75%]",
  },

  accessories: {
    background:
      "bg-[linear-gradient(145deg,#F4F5F5_0%,#E9EBEC_50%,#E0E3E5_100%)]",
    imageClass: "right-[1%] bottom-[3%] h-[70%] w-[70%] lg:h-[74%] lg:w-[74%]",
  },
};

export function Categories() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F5F5F7] py-20 sm:py-24 lg:py-28">
      <div className="nexora-container">
        {/* =====================================================
            SECTION HEADING
        ====================================================== */}
        <div
          className="
            mb-10
            flex
            flex-col
            gap-5
            sm:mb-12
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                mb-3
                text-[12px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#86868B]
              "
            >
              Find your technology
            </p>

            <h2
              className="
                max-w-xl
                text-[34px]
                font-semibold
                leading-[1.05]
                tracking-[-0.04em]
                text-[#1D1D1F]
                sm:text-[40px]
                lg:text-[48px]
              "
            >
              Shop by category.
            </h2>

            <p
              className="
                mt-4
                max-w-lg
                text-[15px]
                leading-7
                text-[#6E6E73]
                sm:text-base
              "
            >
              Explore technology selected for work, creativity, entertainment
              and everyday life.
            </p>
          </div>

          <Link
            href="/shop"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              text-sm
              font-medium
              text-[#1D1D1F]
            "
          >
            Explore all products
            <ArrowRight
              size={16}
              strokeWidth={1.7}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* =====================================================
            CATEGORY GRID
        ====================================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-12
            lg:gap-5
          "
        >
          {categories.map((category, index) => {
            const style = categoryStyles[category.slug];
            const image = categoryImages[category.slug];

            const gridClass =
              index === 0
                ? "lg:col-span-7 lg:min-h-[460px]"
                : index === 1
                  ? "lg:col-span-5 lg:min-h-[460px]"
                  : "lg:col-span-4 lg:min-h-[330px]";

            return (
              <motion.div
                key={category.slug}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 24,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.65,
                  delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={gridClass}
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className={`
                    group
                    relative
                    block
                    h-full
                    min-h-[310px]
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-black/[0.045]
                    ${style.background}
                    shadow-[0_1px_2px_rgba(0,0,0,0.02)]
                    transition-all
                    duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    hover:-translate-y-1
                    hover:border-black/[0.07]
                    hover:shadow-[0_24px_60px_rgba(31,45,61,0.09)]
                    sm:min-h-[350px]
                  `}
                >
                  {/* ===========================================
                      AMBIENT LIGHTING
                  ============================================ */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-[12%]
                      -top-[22%]
                      size-[72%]
                      rounded-full
                      bg-white/70
                      blur-[80px]
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-[-25%]
                      right-[5%]
                      h-[55%]
                      w-[65%]
                      rounded-full
                      bg-[#C9DBEA]/25
                      blur-[70px]
                    "
                  />

                  {/* ===========================================
                      CATEGORY INFORMATION
                  ============================================ */}

                  <div
                    className="
                      absolute
                      left-6
                      top-6
                      z-30
                      max-w-[55%]
                      sm:left-8
                      sm:top-8
                    "
                  >
                    <p
                      className="
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-[0.15em]
                        text-[#86868B]
                        sm:text-[12px]
                      "
                    >
                      {category.tagline}
                    </p>

                    <h3
                      className="
                        mt-2
                        text-[28px]
                        font-semibold
                        tracking-[-0.035em]
                        text-[#1D1D1F]
                        sm:text-[32px]
                      "
                    >
                      {category.name}
                    </h3>
                  </div>

                  {/* ===========================================
                      REAL CATEGORY IMAGE
                  ============================================ */}

                  <motion.div
                    aria-hidden="true"
                    className={`
                      absolute
                      z-10
                      ${style.imageClass}
                    `}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.035,
                            y: -4,
                          }
                    }
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* Soft product halo */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        h-[65%]
                        w-[72%]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-white/65
                        blur-[45px]
                      "
                    />

                    <Image
                      src={image}
                      alt=""
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : undefined}
                      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 32vw"
                      className={`
                        relative
                        z-10
                        object-contain
                        object-center
                        drop-shadow-[0_24px_28px_rgba(40,55,70,0.12)]
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(.22,1,.36,1)]
                        group-hover:scale-[1.025]
                      `}
                    />
                  </motion.div>

                  {/* ===========================================
                      PRODUCT FLOOR SHADOW
                  ============================================ */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-[8%]
                      right-[7%]
                      z-[5]
                      h-[6%]
                      w-[48%]
                      rounded-full
                      bg-[#506478]/10
                      blur-[18px]
                    "
                  />

                  {/* ===========================================
                      CTA
                  ============================================ */}

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      z-30
                      sm:bottom-8
                      sm:left-8
                    "
                  >
                    <div
                      className="
                        flex
                        size-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-black/[0.04]
                        bg-white/85
                        text-[#1D1D1F]
                        shadow-[0_5px_20px_rgba(0,0,0,0.06)]
                        backdrop-blur-md
                        transition-all
                        duration-300
                        group-hover:scale-105
                        group-hover:bg-[#1D1D1F]
                        group-hover:text-white
                      "
                    >
                      <ArrowRight
                        size={17}
                        strokeWidth={1.7}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                        "
                      />
                    </div>
                  </div>

                  {/* ===========================================
                      TOP LIGHT REFLECTION
                  ============================================ */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-x-[8%]
                      top-0
                      z-20
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-white/90
                      to-transparent
                    "
                  />

                  {/* ===========================================
                      FINE INNER BORDER
                  ============================================ */}

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
                      ring-white/55
                    "
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
