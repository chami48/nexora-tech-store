import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Truck,
} from "lucide-react";

const benefits = [
  {
    title: "Free Delivery",
    description: "On selected orders",
    icon: Truck,
  },
  {
    title: "Genuine Products",
    description: "Quality you can trust",
    icon: BadgeCheck,
  },
  {
    title: "Secure Payments",
    description: "Safe & protected checkout",
    icon: ShieldCheck,
  },
  {
    title: "Expert Support",
    description: "Help when you need it",
    icon: Headphones,
  },
];

export function Benefits() {
  return (
    <section
      aria-label="Shopping benefits"
      className="border-y border-black/[0.06] bg-white"
    >
      <div className="nexora-container">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className={`
                  flex items-start gap-3 py-7
                  sm:items-center sm:gap-4 sm:py-8
                  lg:px-8 lg:py-9

                  ${index % 2 === 0 ? "pr-4" : "pl-4"}

                  ${index === 0 ? "lg:pl-0" : ""}
                  ${index === benefits.length - 1 ? "lg:pr-0" : ""}

                  ${
                    index !== benefits.length - 1
                      ? "lg:border-r lg:border-black/[0.06]"
                      : ""
                  }
                `}
              >
                <div
                  className="
                    flex size-10 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-[#F5F5F7]
                    text-[#1D1D1F]
                    sm:size-11
                  "
                >
                  <Icon
                    size={19}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <h2
                    className="
                      text-[13px]
                      font-semibold
                      text-[#1D1D1F]
                      sm:text-sm
                    "
                  >
                    {benefit.title}
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      leading-4
                      text-[#86868B]
                      sm:text-xs
                    "
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}