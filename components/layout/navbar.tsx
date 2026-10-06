"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { useCart } from "@/components/cart/cart-provider";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
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
    label: "Accessories",
    href: "/shop?category=accessories",
  },
  {
    label: "About",
    href: "/about",
  },
];

export function Navbar() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`
          fixed inset-x-0 z-50 mx-auto
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none
          ${
            scrolled
              ? "top-2 w-[calc(100%-24px)] sm:w-[calc(100%-40px)] max-w-[840px] rounded-[32px] border border-[#CBD5E1] bg-white/95 shadow-[0_12px_32px_rgba(15,23,42,0.14)] backdrop-blur-xl"
              : "top-0 w-full max-w-[1440px] rounded-none border border-transparent bg-transparent"
          }
        `}
      >
        <div className={`mx-auto w-full transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${scrolled ? "px-4 sm:px-6" : "px-5 sm:px-8 lg:px-12"}`}>
          <div className={`flex items-center justify-between transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${scrolled ? "h-14 lg:h-[60px]" : "h-16 lg:h-[72px]"}`}>
            {/* Mobile menu */}
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className="
                flex size-10 items-center justify-center
                rounded-full
                transition-colors
                hover:bg-black/[0.04]
                lg:hidden
              "
            >
              <Menu size={20} strokeWidth={1.8} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              aria-label="NEXORA home"
              className={`
                ${scrolled ? "text-[14px] sm:text-[17px]" : "text-[16px] sm:text-[20px]"}
                font-semibold
                tracking-[0.18em]
                text-[#1D1D1F]
                transition-all duration-500 motion-reduce:transition-none
                hover:opacity-70
              `}
            >
              NEXORA
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Primary navigation"
              className={`hidden items-center transition-[gap] duration-500 motion-reduce:transition-none lg:flex ${scrolled ? "gap-4" : "gap-5"}`}
            >
              {navigation.map((item) => {
                const [itemPath, itemQuery] = item.href.split("?");
                const itemCategory = new URLSearchParams(itemQuery).get("category");
                const isActive =
                  pathname === itemPath &&
                  (itemPath !== "/shop" || activeCategory === itemCategory);
                const dropdownItems = itemPath === "/shop"
                  ? itemCategory
                    ? products
                        .filter((product) => product.category === itemCategory)
                        .map((product) => ({ label: product.name, href: `/product/${product.slug}` }))
                    : categories.map((category) => ({
                        label: category.name,
                        href: `/shop?category=${category.slug}`,
                      }))
                  : [];

                return (
                  <div
                    key={item.label}
                    className="group/nav relative py-3"
                    onMouseEnter={() => setOpenDropdown(dropdownItems.length > 0 ? item.label : null)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onFocus={() => setOpenDropdown(dropdownItems.length > 0 ? item.label : null)}
                    onClick={() => setOpenDropdown(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") setOpenDropdown(null);
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                      relative
                      py-2
                      ${scrolled ? "text-[13px]" : "text-[14px]"}
                      font-medium
                      transition-[color,font-size]
                      duration-700
                      ${
                        isActive
                          ? "text-[#1D1D1F]"
                          : "text-[#6E6E73] hover:text-[#1D1D1F]"
                      }
                    `}
                  >
                    {item.label}

                    {isActive && (
                      <span
                        className="
                          absolute
                          inset-x-0
                          -bottom-[2px]
                          mx-auto
                          h-px
                          bg-[#1D1D1F]
                        "
                      />
                    )}
                  </Link>
                  {dropdownItems.length > 0 && (
                    <div className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-1 ${openDropdown === item.label ? "block" : "hidden"}`}>
                      <nav
                        aria-label={`${item.label} navigation`}
                        className="rounded-lg border border-black/[0.08] bg-white/95 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl"
                      >
                        {dropdownItems.map((entry) => (
                          <Link
                            key={entry.href}
                            href={entry.href}
                            className="block rounded px-3 py-3 text-sm text-[#1D1D1F] transition-colors hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none"
                          >
                            {entry.label}
                          </Link>
                        ))}
                        {itemCategory && (
                          <Link
                            href={item.href}
                            className="mt-1 block border-t border-black/[0.06] px-3 py-3 text-sm font-medium text-[#1D1D1F] hover:bg-black/[0.04]"
                          >
                            View all {item.label.toLowerCase()}
                          </Link>
                        )}
                      </nav>
                    </div>
                  )}
                  </div>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                type="button"
                aria-label="Search"
                className="
                  flex size-10 items-center justify-center
                  rounded-full
                  text-[#1D1D1F]
                  transition-all duration-300
                  hover:bg-black/[0.04]
                  active:scale-95
                "
              >
                <Search size={18} strokeWidth={1.8} />
              </button>

              <button
                type="button"
                aria-label="Account"
                className="
                  hidden size-10 items-center justify-center
                  rounded-full
                  text-[#1D1D1F]
                  transition-all duration-300
                  hover:bg-black/[0.04]
                  active:scale-95
                  sm:flex
                "
              >
                <UserRound size={18} strokeWidth={1.8} />
              </button>

              <button
                type="button"
                aria-label={`Shopping bag, ${count} items`}
                onClick={openCart}
                className="
                  relative
                  flex size-10 items-center justify-center
                  rounded-full
                  text-[#1D1D1F]
                  transition-all duration-300
                  hover:bg-black/[0.04]
                  active:scale-95
                "
              >
                <ShoppingBag size={18} strokeWidth={1.8} />

                <span
                  className="
                    absolute
                    right-0.5
                    top-0.5
                    flex size-[16px]
                    items-center justify-center
                    rounded-full
                    bg-[#1D1D1F]
                    text-[9px]
                    font-semibold
                    text-white
                  "
                >
                  {count}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-40 hidden bg-black/[0.025] backdrop-blur-[5px] transition-opacity duration-300 motion-reduce:transition-none lg:block ${openDropdown ? "opacity-100" : "opacity-0"}`}
      />

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
