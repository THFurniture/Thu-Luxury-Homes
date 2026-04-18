import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type UseScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

type UseParallaxOptions = {
  offset?: UseScrollOptions["offset"];
  disabled?: boolean;
};

export function useParallax<T extends HTMLElement>(
  output: [string, string],
  options: UseParallaxOptions = {},
) {
  const { offset = ["start end", "end start"], disabled = false } = options;
  const ref = useRef<T | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || disabled ? ["0%", "0%"] : output,
  );

  return { ref, y, prefersReducedMotion };
}
