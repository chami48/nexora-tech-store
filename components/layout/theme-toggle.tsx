"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const key = "nexora-theme";
const eventName = "nexora-theme-change";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#111113" : "#F5F5F7");
  window.dispatchEvent(new Event(eventName));
}

function subscribe(listener: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(key); } catch { /* Use the system preference if storage is blocked. */ }
    applyTheme(saved === "dark" || (saved !== "light" && media.matches));
  };
  window.addEventListener(eventName, listener);
  window.addEventListener("storage", sync);
  media.addEventListener("change", sync);
  return () => {
    window.removeEventListener(eventName, listener);
    window.removeEventListener("storage", sync);
    media.removeEventListener("change", sync);
  };
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.classList.contains("dark"), () => false);
  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return <button type="button" aria-label={label} title={label} onClick={() => {
    try { localStorage.setItem(key, dark ? "light" : "dark"); } catch { /* Theme switching still works for this visit. */ }
    applyTheme(!dark);
  }} className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#1D1D1F] transition-colors hover:bg-black/[0.04] sm:size-10">{dark ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}</button>;
}
