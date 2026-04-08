import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lenis from "lenis";
import { useEffect } from "react";
import type { RefObject } from "react";

import { loadScrollTrigger } from "../../lib/gsap-client";

gsap.registerPlugin(useGSAP);

export function useHomeAnimations(
  pageRef: RefObject<HTMLDivElement | null>,
  isReady: boolean,
) {
  useEffect(() => {
    if (!isReady) return;

    let isCancelled = false;
    let cleanup: (() => void) | undefined;

    void loadScrollTrigger().then((ScrollTrigger) => {
      if (isCancelled) return;

      const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
      });

      const update = (time: number) => {
        lenis.raf(time * 1000);
      };

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      cleanup = () => {
        lenis.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(update);
        lenis.destroy();
      };
    });

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, [isReady]);

  useGSAP(
    (_, contextSafe) => {
      if (!isReady) return;

      let isCancelled = false;
      const withContext =
        contextSafe ?? ((fn: () => void | Promise<void>) => fn);

      const initAnimations = withContext(async () => {
        const ScrollTrigger = await loadScrollTrigger();
        if (isCancelled) return;

        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        gsap.set(".hero-copy .line-inner", { yPercent: 115 });
        gsap.set(
          ".hero-meta, .hero-intro, .hero-actions, .hero-marquee, .site-header",
          { autoAlpha: 0, y: 24 },
        );
        gsap.set(".hero-secondary-visual", {
          clipPath: "inset(100% 0% 0% 0% round 1.5rem)",
        });
        gsap.set(".reveal-fade", { autoAlpha: 0, y: 42 });
        gsap.set(".section-copy .line-inner, .section-tag .line-inner", {
          yPercent: 110,
        });
        gsap.set(".reveal-clip", {
          clipPath: "inset(12% 0% 0% 0% round 2rem)",
        });

        heroTimeline
          .to(".site-header", {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          })
          .to(
            ".hero-title",
            {
              autoAlpha: 1,
              duration: 0.01,
            },
            "-=0.2",
          )
          .to(
            ".hero-copy .line-inner",
            {
              yPercent: 0,
              duration: 1,
              stagger: 0.12,
            },
            "-=0.35",
          )
          .to(
            ".hero-meta, .hero-intro, .hero-actions, .hero-marquee",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
            },
            "-=0.9",
          )
          .to(
            ".hero-secondary-visual",
            {
              clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
              duration: 1,
              stagger: 0.12,
            },
            "-=1",
          );

        gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
          const lines = section.querySelectorAll<HTMLElement>(
            ".section-tag .line-inner, .section-copy .line-inner",
          );
          const fades = section.querySelectorAll<HTMLElement>(".reveal-fade");
          const clips = section.querySelectorAll<HTMLElement>(".reveal-clip");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              once: true,
            },
          });

          if (lines.length) {
            tl.to(lines, {
              yPercent: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
            });
          }

          if (fades.length) {
            tl.to(
              fades,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
              },
              lines.length ? "-=0.55" : 0,
            );
          }

          if (clips.length) {
            tl.to(
              clips,
              {
                clipPath: "inset(0% 0% 0% 0% round 2rem)",
                duration: 1,
                stagger: 0.12,
                ease: "power4.out",
              },
              "-=0.7",
            );
          }
        });

        gsap.utils
          .toArray<HTMLElement>("[data-parallax='soft']")
          .forEach((element) => {
            gsap.to(element, {
              yPercent: -14,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          });

        gsap.utils
          .toArray<HTMLElement>("[data-parallax='deep']")
          .forEach((element) => {
            gsap.to(element, {
              yPercent: -24,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            });
          });

        if (document.querySelector(".portfolio-track")) {
          gsap.to(".portfolio-track", {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: ".portfolio-shell",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        ScrollTrigger.refresh();
      });

      void initAnimations();

      return () => {
        isCancelled = true;
      };
    },
    {
      scope: pageRef,
      dependencies: [isReady],
      revertOnUpdate: true,
    },
  );
}
