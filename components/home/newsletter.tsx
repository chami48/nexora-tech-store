"use client";

import { ArrowRight, Info } from "lucide-react";
import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Newsletter() {
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = email.trim();

    if (!value) {
      setError("Enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);
  }

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
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            max-w-[760px]
            text-center
          "
        >
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#86868B]
            "
          >
            Stay in the loop
          </p>

          <h2
            className="
              mt-4
              text-[36px]
              font-semibold
              leading-[1.02]
              tracking-[-0.045em]
              text-[#1D1D1F]
              sm:text-[44px]
              lg:text-[52px]
            "
          >
            The best of tech,
            <br className="hidden sm:block" /> straight to your inbox.
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[520px]
              text-[15px]
              leading-7
              text-[#6E6E73]
              sm:text-base
            "
          >
            Newsletter signup is not connected yet. This demo validates your
            email but does not subscribe you or store it.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto mt-8 max-w-[520px]"
            >
              <div
                className="
                  flex
                  items-center
                  rounded-full
                  border
                  border-black/[0.08]
                  bg-white
                  p-1.5
                  shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                  transition
                  focus-within:border-black/20
                "
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>

                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="Email address"
                  aria-describedby={error ? "newsletter-error" : undefined}
                  aria-invalid={Boolean(error)}
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-4
                    py-3
                    text-[16px]
                    text-[#1D1D1F]
                    outline-none
                    placeholder:text-[#86868B]
                  "
                />

                <button
                  type="submit"
                  aria-label="Check email address (demo only)"
                  className="
                    group
                    flex
                    size-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1D1D1F]
                    text-white
                    transition-all
                    duration-300
                    hover:bg-black
                    active:scale-95
                  "
                >
                  <ArrowRight
                    size={17}
                    strokeWidth={1.8}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />
                </button>
              </div>

              <div
                className="
                  mt-3
                  min-h-5
                  text-left
                  sm:px-4
                "
              >
                {error && (
                  <p
                    id="newsletter-error"
                    role="alert"
                    className="text-xs text-red-600"
                  >
                    {error}
                  </p>
                )}
              </div>
            </form>
          ) : (
            <motion.div
              role="status"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mx-auto
                mt-8
                flex
                w-fit
                items-center
                gap-3
                rounded-full
                border
                border-black/[0.07]
                bg-white
                px-5
                py-3
                text-sm
                font-medium
                text-[#1D1D1F]
                shadow-sm
              "
            >
              <span
                className="
                  flex
                  size-6
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1D1D1F]
                  text-white
                "
              >
                <Info size={13} strokeWidth={2} />
              </span>
              Signup is unavailable. Your email was not saved or subscribed.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
