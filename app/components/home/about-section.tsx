import { m, useReducedMotion } from "motion/react";

import { useParallax } from "../../lib/use-parallax";

const mutedText = "text-[rgba(229,229,229,0.78)]";
const serifDisplay =
  'font-["Cormorant_Garamond",Georgia,serif] font-medium tracking-[-0.03em] text-[#f5f5f5]';

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const { ref: imageWrapperRef, y: imageWrapperY } =
    useParallax<HTMLDivElement>(["0%", "-8%"]);

  return (
    <section
      id="about"
      className="section about-section relative overflow-hidden bg-[linear-gradient(180deg,rgba(8,8,8,0.98)_0%,rgba(16,16,16,0.98)_100%)] px-5 pt-32 pb-24 max-[560px]:px-4 max-[560px]:pb-20"
      data-section
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(255,255,255,0.08),transparent_52%),linear-gradient(180deg,rgba(8,8,8,0.94)_0%,rgba(16,16,16,0.98)_100%)]" />

      <div className="relative mx-auto max-w-[90rem]">
        <h2 className={`${serifDisplay} mb-12 text-[clamp(2.4rem,5vw,4rem)] leading-[0.96]`}>
          Vancouver's premier home staging company
        </h2>

        <div className="mt-12 grid grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] gap-10 max-[1180px]:gap-8 max-[980px]:grid-cols-1">
          <div className="relative min-h-[46rem] max-[980px]:min-h-[36rem] max-[640px]:min-h-[31rem]">
            <m.div
              className="about-main-visual absolute inset-y-0 left-0 w-[78%] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.14)] max-[640px]:w-[84%]"
              initial={
                prefersReducedMotion
                  ? false
                  : { clipPath: "inset(18% 0% 0% 0%)" }
              }
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <m.div
                ref={imageWrapperRef}
                className="about-img-wrapper absolute inset-[-8%] overflow-hidden"
                style={{
                  y: imageWrapperY,
                  willChange: prefersReducedMotion ? undefined : "transform",
                }}
              >
                <img
                  className="h-full w-full scale-[1.08] object-cover"
                  src="/projects-imgs/w_georgia_st_1128/w-georgia-st-1128-4903-vancouver-6.avif"
                  alt="Professionally staged Vancouver living space with layered neutral furniture"
                />
              </m.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.22)_100%)]" />
            </m.div>

            <m.figure
              className="about-detail-visual absolute bottom-[8%] right-0 z-[2] w-[44%] overflow-hidden border border-white/14 bg-[rgba(20,20,20,0.92)] shadow-[0_26px_70px_rgba(0,0,0,0.22)] max-[980px]:bottom-[4%] max-[640px]:w-[48%]"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 52, rotate: -4 }
              }
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            >
              <img
                className="aspect-[0.82] w-full object-cover"
                src="/projects-imgs/alberni_st_1568/alberni-st-1568-4001-vancouver-3.avif"
                alt="Styled Vancouver bedroom with warm textures and refined staging"
              />
            </m.figure>
          </div>

          <div className="grid content-start gap-6 self-center border border-white/10 bg-[rgba(18,18,18,0.78)] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-[10px] max-[640px]:p-6">
            <m.div
              className="about-copy-block"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            >
              <div className="mb-5 h-px w-16 bg-white/18" />
              <p
                className={`m-0 max-w-[39rem] text-[1.02rem] leading-[1.9] ${mutedText}`}
              >
                We deliver professional home staging and interior design services across Greater Vancouver. Our approach transforms empty properties and lived-in homes into emotionally compelling spaces that help buyers envision their future and drive faster, higher-value sales.
              </p>
            </m.div>

            <div className="grid gap-4">
              <m.div
                className="border border-white/10 bg-[rgba(255,255,255,0.04)] p-5"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              >
                <h3 className={`${serifDisplay} text-[1.95rem] leading-[0.96]`}>Mission</h3>
                <p className={`mt-3 max-w-[26rem] text-[0.95rem] leading-[1.82] ${mutedText}`}>
                  We transform spaces into attractive, functional environments that emotionally connect with buyers, increasing property value and speeding up sales.
                </p>
              </m.div>
              <m.div
                className="border border-white/10 bg-[rgba(255,255,255,0.04)] p-5"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
              >
                <h3 className={`${serifDisplay} text-[1.95rem] leading-[0.96]`}>Vision</h3>
                <p className={`mt-3 max-w-[26rem] text-[0.95rem] leading-[1.82] ${mutedText}`}>
                  To be a leading home staging company recognized for creativity, quality, and the ability to turn every property into a unique, standout market experience.
                </p>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
