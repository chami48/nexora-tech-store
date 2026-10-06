"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useRef } from "react";
import { useOverlay } from "./use-overlay";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Laptops",
    href: "/shop?category=laptops",
  },
  {
    label: "Phones",
    href: "/shop?category=phones",
  },
  {
    label: "Audio",
    href: "/shop?category=audio",
  },
  {
    label: "Gaming",
    href: "/shop?category=gaming",
  },
  {
    label: "Accessories",
    href: "/shop?category=accessories",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLElement>(null);
  useOverlay(panelRef, open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed inset-0 z-[60]
              bg-black/20
              backdrop-blur-[2px]
              lg:hidden
            "
          />

          <motion.aside
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed inset-y-0 left-0 z-[70]
              flex w-[88%] max-w-[390px]
              flex-col
              bg-white
              px-6 pb-8 pt-5
              shadow-2xl
              lg:hidden
            "
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={onClose}
                className="
                  text-[18px]
                  font-semibold
                  tracking-[0.18em]
                "
              >
                NEXORA
              </Link>

              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="
                  flex size-10
                  items-center justify-center
                  rounded-full
                  bg-black/[0.04]
                  transition-colors
                  hover:bg-black/[0.08]
                "
              >
                <X size={19} strokeWidth={1.8} />
              </button>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="mt-14"
            >
              {links.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{
                    opacity: 0,
                    y: 14,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.05 + index * 0.035,
                    duration: 0.4,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="
                      group
                      flex items-center justify-between
                      border-b border-black/[0.06]
                      py-4
                      text-[24px]
                      font-medium
                      tracking-[-0.025em]
                      text-[#1D1D1F]
                    "
                  >
                    {link.label}

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.6}
                      className="
                        text-[#86868B]
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-10">
              <p className="text-sm text-[#86868B]">
                Technology, beautifully selected.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
