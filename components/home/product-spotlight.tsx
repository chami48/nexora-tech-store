"use client";

import Link from "next/link";
import { ArrowRight, Battery, Cpu, Laptop } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const specs = [
  {
    label: "Performance",
    value: "M4",
    icon: Cpu,
  },
  {
    label: "Display",
    value: '13.6"',
    icon: Laptop,
  },
  {
    label: "Battery",
    value: "18 hrs",
    icon: Battery,
  },
];

export function ProductSpotlight() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#EEF4FA]
        text-[#1D1D1F]
      "
    >
      {/* Main soft blue atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-10%]
          top-[-40%]
          size-[720px]
          rounded-full
          bg-[#BBD8F4]/65
          blur-[130px]
        "
      />

      {/* Soft white lighting */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-18%]
          top-[-25%]
          size-[620px]
          rounded-full
          bg-white/90
          blur-[120px]
        "
      />

      {/* Bottom icy glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-55%]
          right-[15%]
          size-[620px]
          rounded-full
          bg-[#A9CBEA]/55
          blur-[130px]
        "
      />

      {/* Very subtle center wash */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[35%]
          top-[15%]
          size-[420px]
          rounded-full
          bg-white/55
          blur-[100px]
        "
      />

      {/* Top divider */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-black/[0.05]
        "
      />

      <div
        className="
          nexora-container
          relative
          z-10
          py-16
          sm:py-20
          lg:py-[88px]
        "
      >
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[0.88fr_1.12fr]
            lg:gap-8
          "
        >
          {/* LEFT CONTENT */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20"
          >
            {/* Eyebrow */}
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#65788A]
              "
            >
              Performance, refined
            </p>

            {/* Heading */}
            <h2
              className="
                mt-5
                max-w-[520px]
                text-[38px]
                font-semibold
                leading-[0.98]
                tracking-[-0.045em]
                text-[#16181B]
                sm:text-[46px]
                lg:text-[54px]
              "
            >
              Power for the ideas that move you forward.
            </h2>

            {/* Description */}
            <p
              className="
                mt-6
                max-w-[460px]
                text-[15px]
                leading-7
                text-[#68727C]
                sm:text-base
              "
            >
              Remarkably thin. Seriously capable. A premium everyday machine
              designed for work, creativity and everything in between.
            </p>

            {/* Specifications */}
            <div
              className="
                mt-8
                grid
                max-w-[455px]
                grid-cols-3
                border-y
                border-black/[0.08]
                py-5
              "
            >
              {specs.map((spec, index) => {
                const Icon = spec.icon;

                return (
                  <div
                    key={spec.label}
                    className={
                      index !== 0
                        ? "border-l border-black/[0.08] pl-4 sm:pl-6"
                        : ""
                    }
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.4}
                      className="mb-3 text-[#66798A]"
                      aria-hidden="true"
                    />

                    <p
                      className="
                        text-[17px]
                        font-semibold
                        tracking-[-0.025em]
                        text-[#16181B]
                        sm:text-[19px]
                      "
                    >
                      {spec.value}
                    </p>

                    <p
                      className="
                        mt-1
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.14em]
                        text-[#7B8792]
                        sm:text-[10px]
                      "
                    >
                      {spec.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              href="/product/macbook-air-m4"
              className="
                group
                mt-8
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
                shadow-[0_10px_30px_rgba(29,29,31,0.12)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-black
                hover:shadow-[0_14px_38px_rgba(29,29,31,0.18)]
                active:translate-y-0
                active:scale-[0.98]
              "
            >
              Explore MacBook Air
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
          </motion.div>

          {/* RIGHT PRODUCT VISUAL */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 30,
                    scale: 0.97,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.85,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              flex
              aspect-[1.45/1]
              w-full
              max-w-[620px]
              items-center
              justify-center
            "
          >
            {/* Product background halo */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-1/2
                h-[68%]
                w-[72%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white/80
                blur-[70px]
              "
            />

            {/* Blue product glow */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-[54%]
                top-[48%]
                h-[55%]
                w-[60%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#8DB8DE]/30
                blur-[75px]
              "
            />

            {/* Floor shadow */}
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-[15%]
                left-1/2
                h-[8%]
                w-[68%]
                -translate-x-1/2
                rounded-full
                bg-[#57728B]/20
                blur-[22px]
              "
            />

            {/* Premium MacBook product image */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -4, 0],
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
    h-[330px]
    w-[115%]
    sm:h-[390px]
    sm:w-[120%]
    lg:h-[470px]
    lg:w-[125%]
  "
            >
              {/* Ambient glow behind product */}
              <div
                aria-hidden="true"
                className="
      absolute
      left-1/2
      top-1/2
      h-[72%]
      w-[82%]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-[#A8CBE7]/25
      blur-[80px]
    "
              />

              {/* Product image */}
              <Image
                src="/images/spotlight/macbook13.png"
                alt="MacBook Air"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                className="
      object-contain
      object-center
      mix-blend-multiply dark:mix-blend-normal
    "
              />

              {/* Soft left blend */}
              <div
                aria-hidden="true"
                className="
      pointer-events-none
      absolute
      inset-y-[-10%]
      left-[-3%]
      z-20
      w-[16%]
      bg-[#EEF4FA]
      blur-[28px]
    "
              />

              {/* Soft right blend */}
              <div
                aria-hidden="true"
                className="
      pointer-events-none
      absolute
      inset-y-[-10%]
      right-[-3%]
      z-20
      w-[16%]
      bg-[#E8F2FA]
      blur-[28px]
    "
              />

              {/* Soft top blend */}
              <div
                aria-hidden="true"
                className="
      pointer-events-none
      absolute
      inset-x-[-5%]
      top-[-5%]
      z-20
      h-[17%]
      bg-[#EEF4FA]
      blur-[30px]
    "
              />

              {/* Soft bottom blend */}
              <div
                aria-hidden="true"
                className="
      pointer-events-none
      absolute
      inset-x-[-5%]
      bottom-[-5%]
      z-20
      h-[18%]
      bg-[#EAF3FA]
      blur-[30px]
    "
              />

              {/* Ground shadow */}
              <div
                aria-hidden="true"
                className="
      absolute
      bottom-[12%]
      left-1/2
      -z-10
      h-[7%]
      w-[64%]
      -translate-x-1/2
      rounded-full
      bg-[#52728D]/15
      blur-[32px]
    "
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        aria-hidden="true"
        className="
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
