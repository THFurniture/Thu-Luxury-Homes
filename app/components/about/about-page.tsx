import { m, useReducedMotion } from "motion/react";
import { Link } from "react-router";

import { SectionIntro } from "../home/section-intro";

const serifDisplay =
  'font-["Cormorant_Garamond",Georgia,serif] font-medium tracking-[-0.03em]';
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const processSteps = [
  {
    label: "Consultation",
    text: "We review the property, timeline, buyer profile, and visual priorities.",
  },
  {
    label: "Staging plan",
    text: "A focused furnishing and styling direction is built around the listing.",
  },
  {
    label: "Install",
    text: "Our team stages the home with furniture, art, lighting, and finishing layers.",
  },
  {
    label: "Market ready",
    text: "The property is composed for photography, showings, and first impressions.",
  },
];

export function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main id="top" className="bg-[#080808] text-white">
      <section className="relative min-h-[92svh] overflow-hidden pt-[7rem] max-[820px]:pt-[6.4rem]">
        <img
          src="/projects-imgs/w_georgia_st_1128/w-georgia-st-1128-4903-vancouver-6.avif"
          alt="Professionally staged Vancouver residence with refined living space"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.58)_42%,rgba(0,0,0,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.1)_42%,#080808_100%)]" />

        <div className="relative z-[1] mx-auto grid min-h-[calc(92svh-7rem)] max-w-[90rem] items-center px-5 py-14 max-[560px]:px-4">
          <m.div
            className="max-w-[58rem]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-white/72">
              About The One Home Staging
            </p>
            <h1
              className={`${serifDisplay} mt-5 text-[clamp(3.4rem,7vw,7rem)] leading-[0.88] text-white max-[560px]:text-[clamp(2.5rem,14vw,4rem)]`}
            >
              Vancouver spaces staged for stronger first impressions.
            </h1>
            <p className="mt-7 max-w-[36rem] text-[1rem] leading-[1.8] text-white/82">
              The One Home Staging is a home staging and interior design firm
              serving homeowners, real estate agents, and developers across the
              Greater Vancouver Area.
            </p>
          </m.div>
        </div>
      </section>

      <section className="relative px-5 py-28 max-[560px]:px-4 max-[560px]:py-20">
        <div className="mx-auto grid max-w-[90rem] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-14 max-[980px]:grid-cols-1">
          <SectionIntro
            tag="Our approach"
            title="Every room is composed to help buyers see themselves at home."
            className="max-w-[42rem] [&_.section-copy]:text-left"
          />

          <div className="grid content-start gap-8">
            <p className="max-w-[42rem] text-[1.02rem] leading-[1.95] text-white/72">
              We transform empty properties and lived-in homes into emotionally
              compelling spaces that sharpen listing photography, guide buyer
              attention, and support faster, higher-value sales.
            </p>

            <div className="grid grid-cols-2 gap-px bg-white/12 max-[700px]:grid-cols-1">
              {[
                {
                  title: "Mission",
                  body: "We transform spaces into attractive, functional environments that emotionally connect with buyers, increasing property value and speeding up sales.",
                },
                {
                  title: "Vision",
                  body: "To be a leading home staging company recognized for creativity, quality, and the ability to turn every property into a standout market experience.",
                },
              ].map((item) => (
                <m.article
                  key={item.title}
                  className="bg-[#101010] p-7"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.75, ease: easeOutExpo }}
                >
                  <h2 className={`${serifDisplay} text-[2.3rem] leading-[0.94]`}>
                    {item.title}
                  </h2>
                  <p className="mt-4 text-[0.96rem] leading-[1.82] text-white/70">
                    {item.body}
                  </p>
                </m.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 max-[560px]:px-4 max-[560px]:pb-20">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-10 max-[980px]:grid-cols-1">
            <m.figure
              className="min-h-[42rem] overflow-hidden max-[640px]:min-h-[28rem]"
              initial={prefersReducedMotion ? false : { clipPath: "inset(10% 0 10% 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 1, ease: easeOutExpo }}
            >
              <img
                src="/projects-imgs/balfour_ave_1263/balfour-ave-1263-vancouver-4.avif"
                alt="Layered staged family home interior in Vancouver"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </m.figure>

            <div className="grid content-center gap-5">
              {processSteps.map((step, index) => (
                <m.article
                  key={step.label}
                  className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-5 border-t border-white/12 py-5"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.7,
                    ease: easeOutExpo,
                    delay: index * 0.06,
                  }}
                >
                  <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-white/42">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={`${serifDisplay} text-[2rem] leading-[0.96]`}>
                      {step.label}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-[1.75] text-white/68">
                      {step.text}
                    </p>
                  </div>
                </m.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-24 max-[560px]:px-4">
        <div className="mx-auto flex max-w-[90rem] items-end justify-between gap-8 max-[760px]:flex-col max-[760px]:items-start">
          <h2 className={`${serifDisplay} max-w-[48rem] text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.9]`}>
            Ready to shape a stronger listing presence?
          </h2>
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-[0.92rem] font-bold text-[#111111] transition duration-200 hover:-translate-y-px"
          >
            Start a project
          </Link>
        </div>
      </section>
    </main>
  );
}
