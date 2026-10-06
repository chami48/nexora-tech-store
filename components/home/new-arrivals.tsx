"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { ProductGrid } from "@/components/product/product-grid";
import { newArrivalProducts } from "@/data/products";

export function NewArrivals() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F5F5F7] py-20 sm:py-24 lg:py-28">
      <div className="nexora-container">
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
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
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
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
              Just landed
            </p>

            <h2
              className="
                text-[34px]
                font-semibold
                leading-[1.05]
                tracking-[-0.04em]
                text-[#1D1D1F]
                sm:text-[40px]
                lg:text-[48px]
              "
            >
              New arrivals.
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-[15px]
                leading-7
                text-[#6E6E73]
                sm:text-base
              "
            >
              Discover the latest additions to our collection of thoughtfully
              selected technology.
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
            Shop new arrivals
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

        <motion.div
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
            amount: 0.08,
          }}
          transition={{
            duration: 0.7,
            delay: shouldReduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ProductGrid products={newArrivalProducts.slice(0, 4)} />
        </motion.div>
      </div>
    </section>
  );
}
