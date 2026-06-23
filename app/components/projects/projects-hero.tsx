import { m, useReducedMotion } from "motion/react";

import { projectsEaseOutExpo, projectsSerifDisplay } from "./projects-styles";

export function ProjectsHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[94svh] overflow-hidden pt-[7rem] max-[820px]:pt-[6.4rem]">
      <img
        src="/projects-imgs/Not%20shown/w26_residence/w26-residence-4.avif"
        alt="Featured staged Vancouver residence"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.5)_44%,rgba(0,0,0,0.16)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.06)_46%,#080808_100%)]" />

      <div className="relative z-[1] mx-auto grid min-h-[calc(94svh-7rem)] max-w-[90rem] items-center px-5 py-14 max-[560px]:px-4">
        <m.div
          className="max-w-[44rem]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: projectsEaseOutExpo }}
        >
          <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-white/72">
            Projects
          </p>
          <h1
            className={`${projectsSerifDisplay} mt-5 text-[clamp(3.2rem,4.3vw,5.2rem)] leading-[0.9] text-white max-[560px]:text-[clamp(2.5rem,12vw,3.6rem)]`}
          >
            Discover exceptional residences.
          </h1>
          <p className="mt-6 max-w-[40rem] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.7] text-white/75">
            Thoughtfully transformed to reveal their character, architecture,
            and market potential.
          </p>
        </m.div>
      </div>
    </section>
  );
}
