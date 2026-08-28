"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const revealCallbacks = new WeakMap<Element, () => void>();
let revealObserver: IntersectionObserver | null = null;

function getRevealObserver() {
  revealObserver ??= new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealCallbacks.get(entry.target)?.();
        revealCallbacks.delete(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  return revealObserver;
}

/**
 * Scroll-reveal wrapper: fades + slides its children in when they enter the viewport.
 * Lightweight (IntersectionObserver, no animation library). Respects reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transitionDelay = `${delay}ms`;

    const observer = getRevealObserver();
    revealCallbacks.set(el, () => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    observer.observe(el);

    return () => {
      revealCallbacks.delete(el);
      observer.unobserve(el);
    };
  }, [delay, y]);

  return (
    <Tag
      ref={ref}
      className={cn("transition-all duration-700 ease-out", className)}
    >
      {children}
    </Tag>
  );
}
