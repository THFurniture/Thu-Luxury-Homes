import { m, useReducedMotion } from "motion/react";
import { SectionIntro } from "./section-intro";

const serifDisplay =
  'font-["Roboto",ui-sans-serif,system-ui,sans-serif] font-thin tracking-[-0.03em] text-[#f5f5f5]';

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="section services-section px-5 pt-32 pb-12 max-[560px]:px-4"
      data-section
    >
      <div className="mx-auto max-w-[90rem]">
        <SectionIntro
          tag="What we do"
          title="Our services"
          className="grid-cols-1 gap-4 max-w-[42rem] [&_.section-copy]:text-left"
        />

        <div className="mt-14 grid grid-cols-2 gap-8 max-[980px]:gap-6 max-[820px]:grid-cols-1">
          <article className="services-card-1 overflow-hidden rounded-none">
            <m.div
              className="services-card-visual relative flex min-h-[32rem] flex-col justify-end overflow-hidden rounded-none border border-white/10 max-[640px]:min-h-[26rem]"
              initial={
                prefersReducedMotion
                  ? false
                  : { clipPath: "inset(8% 0% 8% 0%)" }
              }
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                className="absolute inset-0 h-full w-full rounded-none object-cover"
                src="/projects-imgs/w26_residence/w26-residence-4.avif"
                alt="Luxuriously staged living room with designer furniture and warm lighting"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.66)_100%)]" />
              <m.div
                className="services-card-content relative z-10 p-8 max-[640px]:p-6"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.18,
                }}
              >
                <div className="mb-4 inline-block text-[0.75rem] font-extrabold uppercase tracking-[0.18em] text-white/85">
                  01
                </div>
                <h2
                  className={`${serifDisplay} mb-4 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] text-white max-[640px]:text-[clamp(1.8rem,10vw,2.6rem)]`}
                >
                  Vacant Staging
                </h2>
                <p className="m-0 max-w-[32rem] text-[0.95rem] leading-[1.7] text-white/90">
                  Full furnishing of empty properties using our designer inventory.
                  Ideal for sellers who want maximum visual impact in listings and
                  open houses.
                </p>
                <ul className="mt-4 space-y-2 text-[0.88rem] text-white/85">
                  <li>+ Designer furniture & accessories</li>
                  <li>+ Professional styling & arrangement</li>
                </ul>
              </m.div>
            </m.div>
          </article>

          <article className="services-card-2 overflow-hidden rounded-none">
            <m.div
              className="services-card-visual relative flex min-h-[32rem] flex-col justify-end overflow-hidden rounded-none border border-white/10 max-[640px]:min-h-[26rem]"
              initial={
                prefersReducedMotion
                  ? false
                  : { clipPath: "inset(8% 0% 8% 0%)" }
              }
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15,
              }}
            >
              <img
                className="absolute inset-0 h-full w-full rounded-none object-cover"
                src="/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-5.avif"
                alt="Beautifully refreshed home with layered styling"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.66)_100%)]" />
              <m.div
                className="services-card-content relative z-10 p-8 max-[640px]:p-6"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.33,
                }}
              >
                <div className="mb-4 inline-block text-[0.75rem] font-extrabold uppercase tracking-[0.18em] text-white/85">
                  02
                </div>
                <h2
                  className={`${serifDisplay} mb-4 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] text-white max-[640px]:text-[clamp(1.8rem,10vw,2.6rem)]`}
                >
                  Design for Living
                </h2>
                <p className="m-0 max-w-[32rem] text-[0.95rem] leading-[1.7] text-white/90">
                  Interior design services for homeowners and investors looking to
                  create lasting, personalized environments beyond the sale.
                </p>
                <ul className="mt-4 space-y-2 text-[0.88rem] text-white/85">
                  <li>+ Personalized design consultation</li>
                  <li>+ Curated furniture & decor selection</li>
                </ul>
              </m.div>
            </m.div>
          </article>
        </div>
      </div>
    </section>
  );
}
