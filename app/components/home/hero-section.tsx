import { stagger } from "motion";
import { m, useReducedMotion } from "motion/react";

import { useParallax } from "../../lib/use-parallax";
import { RevealLine } from "./reveal-line";

const serifDisplay =
  'font-["Roboto",ui-sans-serif,system-ui,sans-serif] font-thin tracking-[-0.03em] text-[#f5f5f5]';
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const heroContentVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.08,
    },
  },
};

const heroFadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

const heroTitleVariants = {
  hidden: { opacity: 0.001 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.01,
      delayChildren: stagger(0.12),
    },
  },
};

const heroLineVariants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 1, ease: easeOutExpo },
  },
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { ref: heroImageRef, y: heroImageY } =
    useParallax<HTMLImageElement>(["0%", "-14%"]);

  return (
    <section className="hero relative min-h-svh overflow-hidden pt-[7rem] text-white max-[820px]:pt-[6.4rem]">
      <div className="hero-visuals absolute inset-0">
        <figure className="hero-visual-frame absolute inset-0 overflow-hidden">
          <m.img
            className="absolute inset-x-0 top-[-20%] h-[140%] w-full object-cover"
            data-parallax="soft"
            src="/home-imgs/home-hero.avif"
            alt="Luxury staged home interior with soft daylight and refined contemporary furniture"
            loading="eager"
            fetchPriority="high"
            ref={heroImageRef}
            style={{
              y: heroImageY,
              willChange: prefersReducedMotion ? undefined : "transform",
            }}
          />
        </figure>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.56)_38%,rgba(0,0,0,0.22)_72%,rgba(0,0,0,0.1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.01)_38%,rgba(0,0,0,0.34)_100%)]" />
      </div>

      <div className="hero-grid relative z-[1] mx-auto grid min-h-[calc(100svh-8.25rem)] max-w-[90rem] items-center px-5 max-[560px]:px-4">
        <m.div
          className="hero-copy flex max-w-[58rem] flex-col justify-center gap-5 py-8"
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={heroContentVariants}
        >
        

          <m.h1
            className={`hero-title ${serifDisplay} max-w-[58rem] text-[clamp(3.2rem,4vw,6.2rem)] leading-[0.92] text-white max-[820px]:max-w-[42rem] max-[560px]:max-w-[28rem] max-[560px]:text-[clamp(2.2rem,9vw,3.5rem)]`}
            variants={heroTitleVariants}
          >
            <RevealLine allowDescenders lineProps={{ variants: heroLineVariants }}>
              We turn spaces into
            </RevealLine>
            <RevealLine allowDescenders lineProps={{ variants: heroLineVariants }}>
              homes people fall in
            </RevealLine>
            <RevealLine allowDescenders lineProps={{ variants: heroLineVariants }}>
              love with.
            </RevealLine>
          </m.h1>

        

          <m.div
            className="hero-actions flex flex-wrap items-center gap-4"
            variants={heroFadeUpVariants}
          >
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-[1.35rem] py-[0.8rem] text-[0.92rem] font-bold text-black transition duration-200 hover:-translate-y-px"
              href="/contact"
            >
              Get a quote
            </a>
            <a
              className="inline-flex items-center border-b border-current pb-1 text-[0.95rem] font-bold text-white transition duration-200 hover:-translate-y-px"
              href="/projects"
            >
              View our work
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
