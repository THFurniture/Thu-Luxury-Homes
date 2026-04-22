import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

let lenisInstance: Lenis | null = null;

export const getLenisInstance = (): Lenis | null => lenisInstance;

const useSmoothScroll = (shouldEnable: boolean = true) => {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!shouldEnable || prefersReducedMotion || typeof window === "undefined") {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;

      if (lenisInstance === lenis) {
        lenisInstance = null;
      }
    };
  }, [prefersReducedMotion, shouldEnable]);

  return lenisRef;
};

export default useSmoothScroll;
