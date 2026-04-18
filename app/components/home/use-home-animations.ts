import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import type { RefObject } from "react";

export function useHomeAnimations(
  _pageRef: RefObject<HTMLDivElement | null>,
  isReady: boolean,
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isReady || prefersReducedMotion || typeof window === "undefined") {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
    });

    let frameId = 0;

    const update = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(update);
    };

    frameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [isReady, prefersReducedMotion]);
}
