"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    initial: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
          y: 22,
        },

    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F5F5F7]
        pt-16
        lg:pt-[72px]
      "
    >
      {/* Main ambient background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[62%]
          top-[42%]
          h-[620px]
          w-[820px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/90
          blur-[120px]
        "
      />

      {/* Soft blue ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-12%]
          top-[5%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#D8EAF9]/60
          blur-[120px]
        "
      />

      {/* Bottom blue atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-35%]
          left-[35%]
          h-[500px]
          w-[700px]
          rounded-full
          bg-[#DDECF8]/45
          blur-[120px]
        "
      />

      <div
        className="
          nexora-container
          relative
          grid
          items-center
          gap-6
          py-8
          sm:gap-12
          sm:py-16
          lg:min-h-[calc(100vh-72px)]
          lg:grid-cols-[0.88fr_1.12fr]
          lg:gap-6
          lg:py-14
        "
      >
        {/* =========================================================
            LEFT CONTENT
        ========================================================== */}
        <div className="relative z-20 max-w-[650px]">
          {/* Eyebrow */}
          <motion.p
            {...reveal}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mb-5
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#7D8791]
              sm:text-[12px]
            "
          >
            Next generation tech
          </motion.p>

          {/* Main heading */}
          <motion.h1
            {...reveal}
            transition={{
              duration: 0.7,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-[700px]
              text-[43px]
              font-semibold
              leading-[0.98]
              tracking-[-0.052em]
              text-[#1D1D1F]
              sm:text-[55px]
              md:text-[63px]
              lg:text-[66px]
              xl:text-[76px]
            "
          >
            Technology,
            <br />
            beautifully selected.
          </motion.h1>

          {/* Description */}
          <motion.p
            {...reveal}
            transition={{
              duration: 0.7,
              delay: shouldReduceMotion ? 0 : 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-7
              max-w-[520px]
              text-[16px]
              leading-7
              text-[#6E6E73]
              sm:text-[17px]
              sm:leading-8
              lg:text-[18px]
            "
          >
            Powerful devices. Thoughtfully curated for the way you work, create
            and play.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...reveal}
            transition={{
              duration: 0.7,
              delay: shouldReduceMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
            "
          >
            {/* Primary CTA */}
            <Link
              href="/shop"
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#1D1D1F]
                px-6
                text-sm
                font-medium
                text-white
                shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-black
                hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)]
                active:translate-y-0
                active:scale-[0.98]
              "
            >
              Shop Collection
              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/shop"
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-black/[0.08]
                bg-white/65
                px-6
                text-sm
                font-medium
                text-[#1D1D1F]
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-black/[0.12]
                hover:bg-white
                hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                active:translate-y-0
                active:scale-[0.98]
              "
            >
              Explore New Arrivals
              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="
                  text-[#86868B]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: shouldReduceMotion ? 0 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-6
              sm:mt-10
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              text-[12px]
              text-[#86868B]
            "
          >
            <span>Premium technology</span>

            <span className="hidden text-black/20 sm:inline">•</span>

            <span>Thoughtfully curated</span>

            <span className="hidden text-black/20 sm:inline">•</span>

            <span>Designed for everyday life</span>
          </motion.div>
        </div>

        {/* =========================================================
            RIGHT PRODUCT VISUAL
        ========================================================== */}
        <motion.div
          initial={
            shouldReduceMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                  scale: 0.96,
                  x: 28,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            delay: shouldReduceMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mx-auto
            flex
            w-full
            max-w-[760px]
            items-center
            justify-center
            lg:mx-0
            lg:max-w-[820px]
          "
        >
          {/* Large soft white glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[76%]
              w-[82%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/90
              blur-[90px]
            "
          />

          {/* Icy blue glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[56%]
              top-[52%]
              h-[68%]
              w-[72%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#BBD9F1]/40
              blur-[100px]
            "
          />

          {/* Product floor shadow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-[12%]
              left-1/2
              h-[7%]
              w-[64%]
              -translate-x-1/2
              rounded-full
              bg-[#5B7790]/15
              blur-[30px]
            "
          />

          {/* Hero product image */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -6, 0],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              z-10
              aspect-[16/9]
              w-full
              sm:aspect-[1.28/1]
              sm:w-[112%]
              lg:w-[118%]
              xl:w-[124%]
            "
          >
            <Image
              src="/images/hero/hero.png"
              alt="Premium laptop, smartphone and wireless headphones"
              fill
              priority
              quality={100}
               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 58vw"
              className="
                object-contain
                object-center
                drop-shadow-[0_32px_42px_rgba(52,76,98,0.16)]
              "
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom subtle divider */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-black/[0.05]
        "
      />
    </section>
  );
}
