import { m, useReducedMotion } from "motion/react";

import { aboutEaseOutExpo, aboutSerifDisplay } from "./about-styles";

const legacyDetails = [
  "Our success is rooted not only in the spaces we transform, but in the talented team behind every project. Designers, project managers, logistics specialists, installers, art consultants, and stylists work together seamlessly to ensure every detail is executed with precision. From the initial consultation to the final styling touches, our team approaches each property with the same level of care, professionalism, and dedication.",
  "What sets us apart is our collaborative approach. Every project benefits from the collective experience of a team that understands both exceptional design and the expectations of today’s luxury real estate market. We carefully consider the architecture, location, target audience, and lifestyle aspirations associated with each home, creating environments that feel sophisticated, authentic, and memorable.",
  "Over the years, we have had the privilege of partnering with leading realtors, developers, builders, and homeowners, helping showcase properties ranging from contemporary urban residences to extraordinary waterfront estates. This experience has given us a deep understanding of how thoughtful presentation can elevate a property’s perceived value and create an immediate emotional connection with prospective buyers.",
  "At The One Home Staging, we believe that true luxury is found in the details. It is reflected in the craftsmanship of our work, the quality of our furnishings, the expertise of our team, and the trust we have earned through consistently delivering exceptional results.",
  "Our legacy continues to be defined by one simple principle: creating extraordinary spaces through experience, passion, and an uncompromising pursuit of excellence.",
];

const stats = [
  { value: "500+", label: "Luxury Properties Staged" },
  { value: "Millions", label: "in Real Estate Value Enhanced" },
  { value: "Thousands", label: "of Rooms Professionally Styled" },
  {
    value: "Trusted by",
    label: "Leading Realtors, Developers, and Homeowners",
  },
];

export function AboutLegacySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section
        id="about"
        className="relative overflow-hidden bg-[#080808] px-5 py-32 max-[560px]:px-4 max-[560px]:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.055),transparent_34%)]"
        />

        <div className="relative mx-auto flex max-w-[72rem] flex-col items-center gap-16 text-center max-[560px]:gap-12">
          <m.header
            className="flex flex-col items-center text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: aboutEaseOutExpo }}
          >
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.26em] text-white/42">
              Our story
            </p>
            <h2
              className={`${aboutSerifDisplay} mt-6 max-w-[28rem] text-[clamp(2.75rem,5.2vw,5.25rem)] leading-[0.92] text-white`}
            >
              A Legacy of Excellence
            </h2>
            <div className="mt-10 h-px w-16 bg-white/24 max-[980px]:hidden" />
          </m.header>

          <div className="flex w-full min-w-0 flex-col items-center text-center">
            <m.p
              className="max-w-[44rem] text-[clamp(1.2rem,1.7vw,1.6rem)] font-light leading-[1.55] tracking-[-0.015em] text-white/88"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: aboutEaseOutExpo }}
            >
              For over a decade, The One Home Staging has been entrusted with
              presenting some of the region’s most distinctive residences.
              Throughout the years, we have built a reputation for excellence by
              combining design expertise, market insight, and an unwavering
              commitment to quality.
            </m.p>

            <div className="mt-14 w-full max-[560px]:mt-10">
              {legacyDetails.map((paragraph, index) => (
                <m.div
                  key={paragraph}
                  className="flex flex-col items-center gap-4 border-t border-white/12 py-9 text-center max-[560px]:gap-3 max-[560px]:py-7"
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 24 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.7,
                    ease: aboutEaseOutExpo,
                    delay: index * 0.04,
                  }}
                >
                  <span
                    className={`${aboutSerifDisplay} text-[1.6rem] leading-none text-white/28 max-[560px]:text-[1.05rem] max-[560px]:tracking-[0.18em]`}
                  >
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <p className="max-w-[44rem] text-[1.02rem] leading-[1.85] text-white/70">
                    {paragraph}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="stats"
        className="bg-[#080808] px-5 pb-32 max-[560px]:px-4 max-[560px]:pb-20"
      >
        <div className="mx-auto max-w-[88rem] border-y border-white/12">
          <div className="grid grid-cols-4 max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1">
            {stats.map((stat, index) => (
              <m.article
                key={stat.label}
                className="flex min-w-0 flex-col items-center text-center border-l border-white/10 p-8 first:border-l-0 max-[1100px]:p-7 max-[1100px]:[&:nth-child(odd)]:border-l-0 max-[1100px]:[&:nth-child(n+3)]:border-t max-[1100px]:[&:nth-child(n+3)]:border-white/10 max-[560px]:border-l-0 max-[560px]:border-t max-[560px]:first:border-t-0 max-[560px]:px-0 max-[560px]:py-7"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 22 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 0.65,
                  ease: aboutEaseOutExpo,
                  delay: index * 0.08,
                }}
              >
                <h3
                  className={`${aboutSerifDisplay} text-[clamp(1.85rem,2.6vw,3.1rem)] leading-[1] tracking-[-0.01em] text-white [hyphens:auto] [overflow-wrap:anywhere]`}
                >
                  {stat.value}
                </h3>
                <p className="mt-5 max-w-[16rem] text-[0.72rem] font-bold uppercase leading-[1.6] tracking-[0.16em] text-white/46 text-center [overflow-wrap:anywhere]">
                  {stat.label}
                </p>
              </m.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
