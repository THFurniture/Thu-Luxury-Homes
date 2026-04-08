import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { loadScrollTrigger } from "~/lib/gsap.client";
import { mutedText, serifDisplay } from "./content";
import { SectionIntro } from "./section-intro";

gsap.registerPlugin(useGSAP);

export function ServicesSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      let isCancelled = false;

      void loadScrollTrigger().then(() => {
        if (isCancelled) return;

        gsap.set(".services-card-visual", {
          clipPath: "inset(8% 0% 8% 0% round 1.5rem)",
        });
        gsap.set(".services-card-content", {
          autoAlpha: 0,
          y: 28,
        });

        const servicesTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
            once: true,
          },
        });

        servicesTimeline
          .to(".services-card-visual", {
            clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
            duration: 0.95,
            stagger: 0.15,
            ease: "power4.out",
          })
          .to(
            ".services-card-content",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.6",
          );
      });

      return () => {
        isCancelled = true;
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      id="services"
      ref={rootRef}
      className="section services-section px-5 pt-32 pb-12 max-[560px]:px-4"
      data-section
    >
      <SectionIntro tag="What we do" title="Our services" />

      <div className="mt-14 grid grid-cols-2 gap-8 max-[980px]:gap-6 max-[820px]:grid-cols-1">
        {/* Card 1: Vacant Staging - Full-bleed image with overlay */}
        <article className="services-card-1 overflow-hidden rounded-[1.5rem]">
          <div className="services-card-visual relative flex min-h-[32rem] flex-col justify-end overflow-hidden max-[640px]:min-h-[26rem]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="/projects-imgs/w26_residence/w26-residence-4.avif"
              alt="Luxuriously staged living room with designer furniture and warm lighting"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,23,18,0.12)_0%,rgba(31,23,18,0.54)_100%)]" />
            <div className="relative z-10 p-8 max-[640px]:p-6">
              <div className="mb-4 inline-block text-[0.75rem] font-extrabold uppercase tracking-[0.18em] text-white/85">
                01
              </div>
              <h2
                className={`${serifDisplay} mb-4 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] text-white max-[640px]:text-[clamp(1.8rem,10vw,2.6rem)]`}
              >
                Vacant Staging
              </h2>
              <p className="m-0 max-w-[32rem] text-[0.95rem] leading-[1.7] text-white/90">
                Full furnishing of empty properties using our designer inventory. Ideal for sellers who want maximum visual impact in listings and open houses.
              </p>
              <ul className="mt-4 space-y-2 text-[0.88rem] text-white/85">
                <li>✓ Designer furniture & accessories</li>
                <li>✓ Professional styling & arrangement</li>
              </ul>
            </div>
          </div>
        </article>

        {/* Card 2: Design for Living - Full-bleed image with overlay */}
        <article className="services-card-2 overflow-hidden rounded-[1.5rem]">
          <div className="services-card-visual relative flex min-h-[32rem] flex-col justify-end overflow-hidden max-[640px]:min-h-[26rem]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-5.avif"
              alt="Beautifully refreshed occupied home with layered styling"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,23,18,0.12)_0%,rgba(31,23,18,0.54)_100%)]" />
            <div className="relative z-10 p-8 max-[640px]:p-6">
              <div className="mb-4 inline-block text-[0.75rem] font-extrabold uppercase tracking-[0.18em] text-white/85">
                02
              </div>
              <h2
                className={`${serifDisplay} mb-4 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] text-white max-[640px]:text-[clamp(1.8rem,10vw,2.6rem)]`}
              >
                Design for Living
              </h2>
              <p className="m-0 max-w-[32rem] text-[0.95rem] leading-[1.7] text-white/90">
                Interior design services for homeowners and investors looking to create lasting, personalized environments beyond the sale.
              </p>
              <ul className="mt-4 space-y-2 text-[0.88rem] text-white/85">
                <li>✓ Personalized design consultation</li>
                <li>✓ Curated furniture & decor selection</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
