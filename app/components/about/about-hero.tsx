import { m, useReducedMotion } from "motion/react";

import { aboutEaseOutExpo, aboutSerifDisplay } from "./about-styles";

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92svh] overflow-hidden pt-[7rem] max-[820px]:pt-[6.4rem]">
      <img
        src="/projects-imgs/Shown/w_georgia_st_1128/w-georgia-st-1128-4903-vancouver-6.avif"
        alt="Professionally staged Vancouver residence with refined living space"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.58)_42%,rgba(0,0,0,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.1)_42%,#080808_100%)]" />

      <div className="relative z-[1] mx-auto grid min-h-[calc(92svh-7rem)] max-w-[90rem] items-center px-5 py-14 max-[560px]:px-4">
        <m.div
          className="flex max-w-[58rem] flex-col justify-center gap-5"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: aboutEaseOutExpo }}
        >
          <h1
            className={`${aboutSerifDisplay} max-w-[58rem] text-[clamp(3.2rem,4vw,6.2rem)] leading-[0.92] text-white max-[820px]:max-w-[42rem] max-[560px]:max-w-[28rem] max-[560px]:text-[clamp(2.2rem,9vw,3.5rem)]`}
          >
            We turn spaces into
            <br />
            homes people fall in
            <br />
            love with.
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-[1.35rem] py-[0.8rem] text-[0.92rem] font-bold text-black transition duration-200 hover:-translate-y-px"
              href="mailto:theonehomestaging@gmail.com"
            >
              Get a quote
            </a>
            <a
              className="inline-flex items-center border-b border-current pb-1 text-[0.95rem] font-bold text-white transition duration-200 hover:-translate-y-px"
              href="/projects"
            >
              View our work
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}
