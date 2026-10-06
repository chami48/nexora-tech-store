"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const brands = [
  { name: "Apple", icon: "apple", size: "size-10" },
  { name: "Samsung", icon: "samsung", size: "h-20 w-32" },
  { name: "Sony", icon: "sony", size: "h-20 w-28" },
  { name: "ASUS", icon: "asus", size: "h-20 w-28" },
  { name: "Lenovo", icon: "lenovo", size: "h-20 w-28" },
  { name: "MSI", icon: "msi", size: "h-20 w-28" },
];

export function BrandStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="brands-heading"
      className="
        border-y
        border-black/[0.06]
        bg-white
        py-16
        sm:py-20
      "
    >
      <div className="nexora-container">
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p
            id="brands-heading"
            className="
              text-center
              text-[11px]
              font-semibold
              uppercase
              tracking-normal
              text-[#86868B]
            "
          >
            Technology from leading brands
          </p>

          <div
            className="
              mt-10
              grid
              grid-cols-2
              items-center
              gap-x-6
              gap-y-6
              sm:grid-cols-3
              lg:grid-cols-6
            "
          >
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                animate={shouldReduceMotion ? { y: 0 } : { y: [0, -5, 0] }}
                transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                className={`
                  flex
                  min-h-16
                  items-center
                  justify-center
                  text-center
                  text-[24px]
                  tracking-normal
                  text-[#6E6E73]
                  opacity-75
                  transition-[color,opacity]
                  duration-300
                  hover:text-[#1D1D1F]
                  hover:opacity-100
                `}
              >
                {brand.name === "MSI" ? (
                  <span className="text-3xl font-bold italic text-[#1D1D1F]">MSI</span>
                ) : (
                  <Image src={`/images/brands/${brand.icon}.svg`} alt={brand.name} width={128} height={128} className={`${brand.size} object-contain dark:brightness-0 dark:invert`} />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
