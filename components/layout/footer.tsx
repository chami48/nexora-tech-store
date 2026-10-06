import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const shopLinks = [
  {
    label: "All Products",
    href: "/shop",
  },
  {
    label: "Laptops",
    href: "/shop?category=laptops",
  },
  {
    label: "Smartphones",
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
];

const companyLinks = [
  {
    label: "About NEXORA",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const supportLinks = [
  {
    label: "Contact Support",
    href: "/contact",
  },
  {
    label: "Delivery Information",
    href: "/contact",
  },
  {
    label: "Returns & Warranty",
    href: "/contact",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0B0B0F] text-white">
      <div className="nexora-container">
        {/* Main footer */}
        <div
          className="
            grid
            gap-12
            border-b
            border-white/10
            py-14
            sm:py-16
            lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr]
            lg:gap-10
            lg:py-20
          "
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="NEXORA home"
              className="
                inline-block
                text-[19px]
                font-semibold
                tracking-[0.18em]
                text-white
                transition-opacity
                hover:opacity-70
              "
            >
              NEXORA
            </Link>

            <p
              className="
                mt-5
                max-w-[340px]
                text-sm
                leading-6
                text-white/45
              "
            >
              Premium technology, thoughtfully selected for the way you work,
              create and play.
            </p>

            <Link
              href="/shop"
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-white
              "
            >
              Explore the collection
              <ArrowUpRight
                size={15}
                strokeWidth={1.7}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          </div>

          {/* Shop */}
          <div>
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white/35
              "
            >
              Shop
            </p>

            <nav
              aria-label="Footer shop navigation"
              className="mt-5 flex flex-col gap-3"
            >
              {shopLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-white/55
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white/35
              "
            >
              Company
            </p>

            <nav
              aria-label="Footer company navigation"
              className="mt-5 flex flex-col gap-3"
            >
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-white/55
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white/35
              "
            >
              Support
            </p>

            <nav
              aria-label="Footer support navigation"
              className="mt-5 flex flex-col gap-3"
            >
              {supportLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-white/55
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-1.5
                text-sm
                font-medium
                text-white
              "
            >
              Get in touch
              <ArrowUpRight
                size={14}
                strokeWidth={1.7}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          </div>
        </div>

        {/* Bottom footer */}
        <div
          className="
            flex
            flex-col
            gap-3
            py-6
            text-[11px]
            text-white/30
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>© {new Date().getFullYear()} NEXORA. All rights reserved.</p>

          <p>Technology, beautifully selected.</p>
        </div>
      </div>
    </footer>
  );
}
