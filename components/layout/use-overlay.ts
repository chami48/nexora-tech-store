"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";

let locks = 0;
let previousOverflow = "";
const overlays: HTMLElement[] = [];

export function useOverlay(ref: RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
  const close = useEffectEvent(onClose);
  useEffect(() => {
    const element = ref.current;
    if (!open || !element) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (locks++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    overlays.push(element);
    const native = element instanceof HTMLDialogElement;
    if (native) element.showModal();
    const focusable = () => Array.from(element.querySelectorAll<HTMLElement>(
      'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
    )).filter((node) => node.getClientRects().length > 0);
    (element.querySelector<HTMLElement>("[autofocus]") ?? focusable()[0] ?? element).focus();
    const keydown = (event: KeyboardEvent) => {
      if (overlays.at(-1) !== element) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
      if (event.key === "Tab") {
        const nodes = focusable();
        const first = nodes[0];
        const last = nodes.at(-1);
        if (!first) { event.preventDefault(); element.focus(); }
        else if (event.shiftKey && (document.activeElement === first || !element.contains(document.activeElement))) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !element.contains(document.activeElement))) {
          event.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener("keydown", keydown, true);
    const resize = () => { if (!native && !element.getClientRects().length) close(); };
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", keydown, true);
      window.removeEventListener("resize", resize);
      if (native) element.close();
      overlays.splice(overlays.indexOf(element), 1);
      if (--locks === 0) document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected && (!overlays.length || overlays.at(-1)?.contains(previousFocus))) previousFocus.focus();
    };
  }, [open, ref]);
}
